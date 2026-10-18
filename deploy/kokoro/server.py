"""Small CPU-only Kokoro API. One inference at a time, bounded chunks/cache."""
import hashlib
import io
import json
import os
from pathlib import Path
import re
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


def chunks(text, limit=32):
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
    session = ort.InferenceSession(str(MODEL_DIR / "model.onnx"), sess_options=options,
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


@app.post("/v1/audio/speech")
def speech(body: SpeechRequest):
    text = body.input.strip()
    if not text or not re.search(r"\w", text):
        raise HTTPException(400, "Informe um texto para leitura.")
    if body.model not in ("kokoro", "kokoro-onnx") or body.voice not in VOICES:
        raise HTTPException(400, "Modelo ou voz inválida.")
    if body.language.lower() not in ("pt", "pt-br") or body.response_format != "wav":
        raise HTTPException(400, "Use português e formato WAV.")
    if engine is None:
        raise HTTPException(503, "A voz está carregando.")
    # Do not queue concurrent inference on the 512 MB free instance.
    if not lock.acquire(blocking=False):
        raise HTTPException(503, "A voz está ocupada. Tente novamente.", headers={"Retry-After": "10"})
    try:
        key = hashlib.sha256(json.dumps([text, body.voice, body.speed, "v1"], ensure_ascii=False).encode()).hexdigest()
        path = CACHE_DIR / (key + ".wav")
        if path.exists():
            return Response(path.read_bytes(), media_type="audio/wav", headers={"Cache-Control": "private, no-store"})
        start = time.monotonic()
        output = io.BytesIO()
        with wave.open(output, "wb") as wav:
            wav.setnchannels(1)
            wav.setsampwidth(2)
            wav.setframerate(24000)
            for part in chunks(text):
                if time.monotonic() - start > 75:
                    raise HTTPException(503, "O texto excedeu o tempo de geração disponível.")
                audio, rate = engine.create(part, voice=body.voice, lang="pt-br", speed=body.speed)
                if rate != 24000:
                    raise RuntimeError("Unexpected sample rate")
                wav.writeframes((np.clip(audio, -1, 1) * 32767).astype("<i2").tobytes())
                del audio
        data = output.getvalue()
        temp = path.with_suffix(".tmp")
        temp.write_bytes(data)
        temp.replace(path)
        trim_cache()
        return Response(data, media_type="audio/wav", headers={"Cache-Control": "private, no-store"})
    finally:
        lock.release()
