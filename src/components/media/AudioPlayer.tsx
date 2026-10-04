import { useCallback, useEffect, useRef, useState } from "react";
import { Gauge, Headphones, Pause, Play, RotateCcw, RotateCw, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];
const BARS = 28;

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}` : `${m}:${String(sec).padStart(2, "0")}`;
};

interface Props {
  src: string;
  title: string;
  subtitle?: string;
  /** Chave para lembrar onde o aluno parou. */
  resumeKey?: string;
  className?: string;
}

/** Player de áudio próprio (sem a barra padrão do navegador): pausa, ±15 s, velocidade, volume e retomada. */
export function AudioPlayer({ src, title, subtitle, resumeKey, className }: Props) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(false);
  const key = resumeKey ? `norte_audio_${resumeKey}` : null;

  // Retoma de onde parou e informa o sistema operacional (tela de bloqueio/fones).
  useEffect(() => {
    setError(false);
    setTime(0);
    setPlaying(false);
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({ title, artist: subtitle ?? "Norte Concurso" });
    }
  }, [src, title, subtitle]);

  const onLoaded = () => {
    const a = audio.current;
    if (!a) return;
    setDuration(a.duration);
    try {
      const saved = key ? Number(localStorage.getItem(key)) : 0;
      if (saved > 5 && saved < a.duration - 5) a.currentTime = saved;
    } catch {
      /* storage indisponível */
    }
  };

  const onTime = () => {
    const a = audio.current;
    if (!a) return;
    setTime(a.currentTime);
    if (key && Math.round(a.currentTime) % 5 === 0) {
      try {
        localStorage.setItem(key, String(a.currentTime));
      } catch {
        /* ignora */
      }
    }
  };

  const toggle = useCallback(() => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) void a.play().catch(() => setError(true));
    else a.pause();
  }, []);

  const skip = (delta: number) => {
    const a = audio.current;
    if (a) a.currentTime = Math.min(Math.max(0, a.currentTime + delta), a.duration || Infinity);
  };

  const cycleSpeed = () => {
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length] ?? 1;
    setSpeed(next);
    if (audio.current) audio.current.playbackRate = next;
  };

  const pct = duration > 0 ? (time / duration) * 100 : 0;

  return (
    <div
      className={cn("rounded-2xl border border-border bg-gradient-to-br from-card to-muted/40 p-4 shadow-sm", className)}
      role="group"
      aria-label={`Player de áudio: ${title}`}
    >
      <audio
        ref={audio}
        src={src}
        preload="metadata"
        onLoadedMetadata={onLoaded}
        onTimeUpdate={onTime}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => setError(true)}
      />

      <div className="flex items-center gap-4">
        <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Headphones className="h-7 w-7" aria-hidden />
          <span className="absolute inset-x-2 bottom-1.5 flex h-3 items-end justify-center gap-[2px]" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <i
                key={i}
                className="w-[3px] rounded-full bg-primary"
                style={{ height: playing ? undefined : 3, animation: playing ? `eq-bar 0.9s ease-in-out ${i * 0.12}s infinite alternate` : undefined }}
              />
            ))}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-bold text-foreground">{title}</p>
          {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>

      {/* Linha do tempo com barras (estilo forma de onda) */}
      <div className="mt-4">
        <div className="relative h-8">
          <div className="absolute inset-0 flex items-center gap-[3px]" aria-hidden>
            {Array.from({ length: BARS * 2 }, (_, i) => {
              const h = 30 + ((i * 37) % 70); // altura determinística, parece forma de onda
              const done = (i / (BARS * 2)) * 100 < pct;
              return <i key={i} className={cn("flex-1 rounded-full", done ? "bg-primary" : "bg-muted-foreground/25")} style={{ height: `${h}%` }} />;
            })}
          </div>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.5}
            value={time}
            disabled={!duration}
            aria-label="Posição do áudio"
            onChange={(e) => {
              const v = Number(e.target.value);
              setTime(v);
              if (audio.current) audio.current.currentTime = v;
            }}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>
        <div className="mt-1 flex justify-between text-[0.7rem] tabular-nums text-muted-foreground">
          <span>{fmt(time)}</span>
          <span>{duration ? `-${fmt(duration - time)}` : "--:--"}</span>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => skip(-15)} aria-label="Voltar 15 segundos" className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground">
            <RotateCcw className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pausar" : "Reproduzir"}
            className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform hover:scale-105"
          >
            {playing ? <Pause className="h-6 w-6" /> : <Play className="ml-0.5 h-6 w-6" />}
          </button>
          <button type="button" onClick={() => skip(15)} aria-label="Avançar 15 segundos" className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground">
            <RotateCw className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" onClick={cycleSpeed} aria-label={`Velocidade ${speed}x`} className="flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold tabular-nums hover:border-primary">
            <Gauge className="h-3.5 w-3.5" /> {speed}x
          </button>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label={muted ? "Ativar som" : "Silenciar"}
              onClick={() => {
                setMuted(!muted);
                if (audio.current) audio.current.muted = !muted;
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              {muted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              aria-label="Volume"
              onChange={(e) => {
                const v = Number(e.target.value);
                setVolume(v);
                setMuted(false);
                if (audio.current) {
                  audio.current.volume = v;
                  audio.current.muted = false;
                }
              }}
              className="h-1 w-20 cursor-pointer accent-[var(--primary)]"
            />
          </div>
        </div>
      </div>

      {error && <p role="alert" className="mt-3 text-xs text-destructive">Não foi possível carregar este áudio.</p>}
      <style>{`@keyframes eq-bar { from { height: 3px } to { height: 14px } }`}</style>
    </div>
  );
}
