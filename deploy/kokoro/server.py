"""Small CPU-only Kokoro API. One inference at a time, bounded chunks/cache."""
import hashlib
import io
import json
import os
from pathlib import Path
import re
import secrets
import threading
import time
import wave
from contextlib import asynccontextmanager

import numpy as np
import onnxruntime as ort
from fastapi import FastAPI, HTTPException
from fastapi.responses import Response
from kokoro_onnx import Kokoro
from pydantic import BaseModel, Field

MODEL_DIR = Path(os.environ.get("KOKORO_MODEL_DIR", "models"))
CACHE_DIR = Path(os.environ.get("KOKORO_CACHE_DIR", "/tmp/kokoro-audio"))
VOICES = ("pf_dora", "pm_alex", "pm_santa")
engine = None
lock = threading.Lock()
MAX_CACHE_BYTES = 32 * 1024 * 1024


def chunks(text, limit=20):
    """Bound intermediate ONNX allocations, including long words and numbers."""
    words = re.findall(r"\S+", text)
    current = ""
    for word in words:
        while len(word) > limit:
            if current:
                yield current
                current = ""
            yield word[:limit]
            word = word[limit:]
        if current and len(current) + len(word) + 1 > limit:
            yield current
            current = ""
        current = (current + " " + word).strip()
    if current:
        yield current


@asynccontextmanager
async def lifespan(_app):
    global engine
    options = ort.SessionOptions()
    options.intra_op_num_threads = 1
    options.inter_op_num_threads = 1
    options.enable_cpu_mem_arena = False
    options.enable_mem_pattern = False
    options.graph_optimization_level = ort.GraphOptimizationLevel.ORT_DISABLE_ALL
    session = ort.InferenceSession(str(MODEL_DIR / os.environ.get("KOKORO_MODEL_FILE", "model.onnx")), sess_options=options,
                                   providers=["CPUExecutionProvider"])
    engine = Kokoro.from_session(session, str(MODEL_DIR / "voices.bin"))
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    yield
    engine = None


app = FastAPI(lifespan=lifespan, docs_url=None, redoc_url=None)


class SpeechRequest(BaseModel):
    input: str = Field(min_length=1, max_length=4096)
    model: str = "kokoro"
    voice: str = "pf_dora"
    language: str = "pt-br"
    response_format: str = "wav"
    speed: float = Field(default=1, ge=0.7, le=1.3)


@app.get("/health")
def health():
    return {"status": "ok" if engine else "loading", "device": "cpu", "version": "kokoro-onnx-0.6.1"}


@app.get("/v1/models")
@app.get("/models")
def models():
    return {"models": [{"id": "kokoro", "installed": engine is not None, "voices": list(VOICES)}]}


def trim_cache():
    files = sorted(CACHE_DIR.glob("*.wav"), key=lambda p: p.stat().st_mtime)
    total = sum(p.stat().st_size for p in files)
    for path in files:
        if total <= MAX_CACHE_BYTES:
            break
        total -= path.stat().st_size
        path.unlink(missing_ok=True)


def speech(body: SpeechRequest, *, budget=75, progress=None):
    text = body.input.strip()
    if not text or not re.search(r"\w", text):
        raise HTTPException(400, "Informe um texto para leitura.")
    if body.model not in ("kokoro", "kokoro-onnx") or body.voice not in VOICES:
        raise HTTPException(400, "Modelo ou voz inválida.")
    if body.language.lower() not in ("pt", "pt-br") or body.response_format != "wav":
        raise HTTPException(400, "Use português e formato WAV.")
    if engine is None:
        raise HTTPException(503, "A voz está carregando.")
    key = hashlib.sha256(json.dumps([text, body.voice, body.speed, "v1"], ensure_ascii=False).encode()).hexdigest()
    path = CACHE_DIR / (key + ".wav")
    # Cached audio remains available while a different question is synthesized.
    def cached():
        try:
            return Response(path.read_bytes(), media_type="audio/wav", headers={"Cache-Control": "private, no-store"})
        except FileNotFoundError:
            return None
    response = cached()
    if response is not None:
        return response
    # Do not queue concurrent inference on the 512 MB free instance.
    if not lock.acquire(blocking=False):
        raise HTTPException(503, "A voz está ocupada. Tente novamente.", headers={"Retry-After": "10"})
    try:
        response = cached()
        if response is not None:
            return response
        start = time.monotonic()
        output = io.BytesIO()
        with wave.open(output, "wb") as wav:
            wav.setnchannels(1)
            wav.setsampwidth(2)
            wav.setframerate(24000)
            parts = list(chunks(text))
            for index, part in enumerate(parts):
                if time.monotonic() - start > budget:
                    raise HTTPException(503, "O texto excedeu o tempo de geração disponível.")
                audio, rate = engine.create(part, voice=body.voice, lang="pt-br", speed=body.speed)
                if rate != 24000:
                    raise RuntimeError("Unexpected sample rate")
                wav.writeframes((np.clip(audio, -1, 1) * 32767).astype("<i2").tobytes())
                del audio
                if progress is not None:
                    progress((index + 1) / len(parts))
        data = output.getvalue()
        temp = path.with_suffix(".tmp")
        temp.write_bytes(data)
        temp.replace(path)
        trim_cache()
        return Response(data, media_type="audio/wav", headers={"Cache-Control": "private, no-store"})
    finally:
        lock.release()


@app.post("/v1/audio/speech")
def synchronous_speech(body: SpeechRequest):
    return speech(body)


jobs = {}
jobs_lock = threading.Lock()


def run_job(job_id, body):
    try:
        def progress(value):
            with jobs_lock:
                jobs[job_id]["progress"] = round(value * 100)
        speech(body, budget=600, progress=progress)
        with jobs_lock:
            jobs[job_id].update(status="ready", progress=100)
    except Exception:
        with jobs_lock:
            jobs[job_id].update(status="error", error="Não foi possível preparar o áudio. Tente novamente.")


@app.post("/v1/audio/jobs")
def start_job(body: SpeechRequest):
    if body.voice not in VOICES or body.model not in ("kokoro", "kokoro-onnx"):
        raise HTTPException(400, "Modelo ou voz inválida.")
    if not body.input.strip() or not re.search(r"\w", body.input):
        raise HTTPException(400, "Informe um texto para leitura.")
    key = hashlib.sha256(json.dumps([body.input.strip(), body.voice, body.speed, "v1"], ensure_ascii=False).encode()).hexdigest()
    with jobs_lock:
        # Retries for the same question join its existing generation.
        for job_id, job in jobs.items():
            if job["key"] == key and job["status"] == "pending":
                return {"job_id": job_id, "status": job["status"], "progress": job["progress"]}
        ready = (CACHE_DIR / (key + ".wav")).exists()
        if not ready and any(job["status"] == "pending" for job in jobs.values()):
            raise HTTPException(503, "A voz está ocupada. Tente novamente.")
        # Keep only a bounded amount of job metadata; no text is retained here.
        for job_id in list(jobs):
            if len(jobs) < 32:
                break
            if jobs[job_id]["status"] != "pending":
                del jobs[job_id]
        job_id = secrets.token_hex(16)
        jobs[job_id] = {"key": key, "status": "ready" if ready else "pending", "progress": 100 if ready else 0}
    if not ready:
        threading.Thread(target=run_job, args=(job_id, body), daemon=True).start()
    return {"job_id": job_id, "status": "ready" if ready else "pending", "progress": 100 if ready else 0}


@app.get("/v1/audio/jobs/{job_id}")
def job_status(job_id: str):
    with jobs_lock:
        job = jobs.get(job_id)
        if not job:
            raise HTTPException(404, "Geração não encontrada. Tente novamente.")
        return {"job_id": job_id, "status": job["status"], "progress": job["progress"], "error": job.get("error")}


@app.get("/v1/audio/jobs/{job_id}/audio")
def job_audio(job_id: str):
    with jobs_lock:
        job = jobs.get(job_id)
        if not job or job["status"] != "ready":
            raise HTTPException(404, "O áudio ainda não está disponível.")
        path = CACHE_DIR / (job["key"] + ".wav")
    try:
        return Response(path.read_bytes(), media_type="audio/wav", headers={"Cache-Control": "private, no-store"})
    except FileNotFoundError:
        raise HTTPException(404, "O áudio expirou. Gere novamente.")
