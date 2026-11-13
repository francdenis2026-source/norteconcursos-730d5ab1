import { useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  Gauge,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { isPlaylistId } from "@/lib/arsenal";
import { loadYoutubePlayer, type LessonYoutubePlayer } from "@/lib/youtubePlayer";
import "./video-library.css";

export interface LessonSource {
  id: string;
  title: string;
  subject: string;
  topic?: string;
  channel?: string;
  embeddable?: false;
}
const time = (seconds: number) => {
  const s = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const rest = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${rest}` : `${m}:${rest}`;
};

type Status = "idle" | "loading" | "playing" | "paused" | "ended" | "error";
const STATUS_LABEL: Record<Status, string> = {
  idle: "Pronto para estudar",
  loading: "Carregando aula…",
  playing: "Em reprodução",
  paused: "Em pausa",
  ended: "Aula finalizada",
  error: "Não foi possível carregar",
};

/** Player da plataforma: palco 16:9, barra de progresso e botões coloridos, atalhos de teclado e velocidade. */
export function LessonPlayer({
  source,
  onPrevious,
  onNext,
  onEnded,
}: {
  source: LessonSource;
  onPrevious?: (() => void) | undefined;
  onNext?: (() => void) | undefined;
  onEnded?: (() => void) | undefined;
}) {
  const mount = useRef<HTMLDivElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const player = useRef<LessonYoutubePlayer | null>(null);
  const endedRef = useRef(onEnded);
  endedRef.current = onEnded;
  const [started, setStarted] = useState(false);
  const [native, setNative] = useState(false);
  const [retry, setRetry] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [ready, setReady] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [rate, setRate] = useState(1);
  const [rates, setRates] = useState<number[]>([1]);
  const [videoTitle, setVideoTitle] = useState("");
  const [fullscreen, setFullscreen] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);
  const [note, setNote] = useState("");
  const playlist = isPlaylistId(source.id);
  const external = `https://www.youtube.com/${playlist ? `playlist?list=${encodeURIComponent(source.id)}` : `watch?v=${encodeURIComponent(source.id)}`}`;

  useEffect(() => {
    setFullscreen(!!document.fullscreenEnabled && !!shell.current?.requestFullscreen);
  }, []);
  useEffect(() => setThumbFailed(false), [source.id]);

  useEffect(() => {
    if (!started || native || source.embeddable === false || !mount.current) {
      setReady(false);
      setPosition(0);
      setDuration(0);
      setVideoTitle("");
      setStatus("idle");
      return;
    }
    let cancelled = false;
    let failed = false;
    let instance: LessonYoutubePlayer | null = null;
    setReady(false);
    setStatus("loading");
    setPosition(0);
    setDuration(0);
    setVideoTitle("");
    setMuted(false);
    setRate(1);
    const node = document.createElement("div");
    mount.current.replaceChildren(node);
    const timeout = window.setTimeout(() => {
      if (!cancelled) {
        failed = true;
        setStatus("error");
        setReady(false);
        instance?.destroy();
        instance = null;
        player.current = null;
      }
    }, 18000);
    void loadYoutubePlayer()
      .then((api) => {
        if (cancelled || failed) return;
        instance = new api.Player(node, {
          host: "https://www.youtube-nocookie.com",
          ...(playlist ? {} : { videoId: source.id }),
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            enablejsapi: 1,
            origin: window.location.origin,
            ...(playlist ? { listType: "playlist", list: source.id } : {}),
          },
          events: {
            onReady: ({ target }) => {
              if (cancelled || failed) return;
              clearTimeout(timeout);
              player.current = target;
              target.getIframe().title = source.title;
              target
                .getIframe()
                .setAttribute("allow", "autoplay; encrypted-media; picture-in-picture; fullscreen");
              target.getIframe().setAttribute("allowfullscreen", "");
              setReady(true);
              setStatus("paused");
              setRates(target.getAvailablePlaybackRates() || [1]);
              target.playVideo();
            },
            onStateChange: ({ data, target }) => {
              if (cancelled || failed) return;
              setStatus(
                data === 1 ? "playing" : data === 0 ? "ended" : data === 3 ? "loading" : "paused",
              );
              if (data === 0) endedRef.current?.();
              setVideoTitle(target.getVideoData()?.title || "");
              setDuration(target.getDuration() || 0);
            },
            onError: () => {
              if (!cancelled) {
                failed = true;
                player.current?.pauseVideo();
                clearTimeout(timeout);
                setStatus("error");
                setReady(false);
              }
            },
            onPlaybackRateChange: ({ data }) => {
              if (!cancelled && !failed) setRate(data);
            },
          },
        });
        player.current = instance;
      })
      .catch(() => {
        if (!cancelled) {
          clearTimeout(timeout);
          setStatus("error");
        }
      });
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      instance?.destroy();
      player.current = null;
    };
  }, [started, native, source.id, source.title, source.embeddable, playlist, retry]);

  useEffect(() => {
    if (!ready || status !== "playing") return;
    const update = () => {
      const p = player.current;
      if (!p) return;
      setPosition(p.getCurrentTime() || 0);
      setDuration(p.getDuration() || 0);
      setMuted(p.isMuted());
    };
    update();
    const timer = window.setInterval(update, 500);
    return () => clearInterval(timer);
  }, [ready, status]);

  const start = () => {
    if (status === "error") setRetry((v) => v + 1);
    setStarted(true);
  };
  const toggle = () => {
    if (!ready) start();
    else if (status === "playing") player.current?.pauseVideo();
    else player.current?.playVideo();
  };
  const seekBy = (delta: number) => {
    const p = player.current;
    if (!p) return;
    const next = Math.min(Math.max(0, (p.getCurrentTime() || 0) + delta), p.getDuration() || Infinity);
    p.seekTo(next, true);
    setPosition(next);
  };
  const changeMute = () => {
    const p = player.current;
    if (!p) return;
    if (p.isMuted()) p.unMute();
    else p.mute();
    setMuted(p.isMuted());
  };
  const cycleRate = () => {
    const list = rates.length ? rates : [1];
    const next = list[(list.indexOf(rate) + 1) % list.length] ?? 1;
    player.current?.setPlaybackRate(next);
    setRate(next);
  };
  const full = async () => {
    try {
      if (document.fullscreenElement === shell.current) await document.exitFullscreen();
      else await shell.current?.requestFullscreen();
    } catch {
      setNote("O navegador não permitiu tela cheia.");
    }
  };
  const onKeyDown = (event: React.KeyboardEvent) => {
    const tag = (event.target as HTMLElement).tagName;
    if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA" || event.ctrlKey || event.metaKey || event.altKey) return;
    if (!ready && event.key !== " " && event.key.toLowerCase() !== "k") return;
    const key = event.key.toLowerCase();
    const run = (fn: () => void) => {
      event.preventDefault();
      fn();
    };
    if (key === " " || key === "k") {
      if (tag === "BUTTON") return;
      run(toggle);
    } else if (key === "j" || key === "arrowleft") run(() => seekBy(-10));
    else if (key === "l" || key === "arrowright") run(() => seekBy(10));
    else if (key === "m") run(changeMute);
    else if (key === "f") run(() => void full());
  };

  const unavailable = source.embeddable === false;
  const blocked = unavailable || status === "error";
  const showPoster = (!native && (!started || blocked)) || unavailable;
  const progress = duration > 0 ? Math.min(100, (position / duration) * 100) : 0;
  const poster = !playlist && !thumbFailed ? `https://i.ytimg.com/vi/${encodeURIComponent(source.id)}/hqdefault.jpg` : "";
  const playing = status === "playing";

  return (
    <div className="vp2" ref={shell} data-status={status} data-native={native || undefined} onKeyDown={onKeyDown}>
      <div className="vp2__stage">
        <div ref={mount} className="vp2__embed" />
        {native && !unavailable && (
          <iframe
            key={source.id}
            className="vp2__native"
            title={source.title}
            src={`https://www.youtube-nocookie.com/embed/${playlist ? `videoseries?list=${encodeURIComponent(source.id)}&` : `${encodeURIComponent(source.id)}?`}enablejsapi=1&controls=1&playsinline=1&rel=0&autoplay=1`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
        {!native && started && !blocked && ready && <button type="button" className="vp2__tap" tabIndex={-1} aria-label={playing ? "Pausar aula" : "Reproduzir aula"} onClick={toggle} />}
        {showPoster && (
          <div className="vp2__poster">
            {poster && <img src={poster} alt="" onError={() => setThumbFailed(true)} />}
            <div className="vp2__poster-copy">
              <span className="vp2__chip">{source.subject.replace(/^ENEM\s*[—-]\s*/, "")}</span>
              <h2>{source.title}</h2>
              {source.topic && <p>{source.topic === "*" ? "Revisões e aulas gerais" : source.topic}</p>}
              {unavailable ? (
                <a href={external} target="_blank" rel="noopener noreferrer" className="vp2__start">
                  <ExternalLink size={22} aria-hidden="true" /> Assistir no YouTube
                </a>
              ) : (
                <button type="button" onClick={start} className="vp2__start">
                  {status === "error" ? <RotateCcw size={22} aria-hidden="true" /> : <Play size={24} fill="currentColor" aria-hidden="true" />}
                  {status === "error" ? "Tentar novamente" : "Assistir aula"}
                </button>
              )}
              {status === "error" && !unavailable && (
                <button type="button" className="vp2__link" onClick={() => setNative(true)}>
                  Usar controles do YouTube aqui
                </button>
              )}
              {blocked && (
                <p role="alert" className="vp2__alert">
                  {unavailable
                    ? "O canal não permite reproduzir esta aula fora do YouTube."
                    : "Confira sua conexão ou abra a aula no YouTube."}
                </p>
              )}
            </div>
          </div>
        )}
        {started && !ready && !blocked && !native && <div className="vp2__loading" role="status">Carregando aula…</div>}
      </div>

      <div className="vp2__bar">
        <div className="vp2__timeline" style={{ "--p": `${progress}%` } as React.CSSProperties}>
          <span>{time(position)}</span>
          <input
            type="range"
            aria-label="Posição da aula"
            aria-valuetext={`${time(position)} de ${time(duration)}`}
            min={0}
            max={Math.max(duration, 1)}
            step={1}
            value={Math.min(position, Math.max(duration, 1))}
            disabled={!ready || duration <= 0}
            onChange={(e) => {
              const value = Number(e.target.value);
              player.current?.seekTo(value, true);
              setPosition(value);
            }}
          />
          <span>{duration ? time(duration) : "--:--"}</span>
        </div>
        <div className="vp2__buttons">
          <div className="vp2__group">
            <button type="button" className="vp2__btn vp2__btn--blue" aria-label="Aula anterior" title="Aula anterior" disabled={!onPrevious && (!playlist || !ready)} onClick={() => (onPrevious ? onPrevious() : player.current?.previousVideo())}>
              <SkipBack size={18} aria-hidden="true" />
            </button>
            <button type="button" className="vp2__btn vp2__btn--indigo" aria-label="Voltar 10 segundos" title="Voltar 10 s (J)" disabled={!ready} onClick={() => seekBy(-10)}>
              <RotateCcw size={18} aria-hidden="true" /> <b>10</b>
            </button>
            <button
              type="button"
              className="vp2__btn vp2__btn--play"
              aria-label={playing ? "Pausar aula" : "Reproduzir aula"}
              title={playing ? "Pausar (K)" : "Reproduzir (K)"}
              disabled={unavailable || (started && !ready && status !== "error")}
              onClick={toggle}
            >
              {playing ? <Pause size={22} fill="currentColor" aria-hidden="true" /> : <Play size={22} fill="currentColor" aria-hidden="true" />}
            </button>
            <button type="button" className="vp2__btn vp2__btn--indigo" aria-label="Avançar 10 segundos" title="Avançar 10 s (L)" disabled={!ready} onClick={() => seekBy(10)}>
              <b>10</b> <RotateCw size={18} aria-hidden="true" />
            </button>
            <button type="button" className="vp2__btn vp2__btn--blue" aria-label="Próxima aula" title="Próxima aula" disabled={!onNext && (!playlist || !ready)} onClick={() => (onNext ? onNext() : player.current?.nextVideo())}>
              <SkipForward size={18} aria-hidden="true" />
            </button>
          </div>
          <div className="vp2__group">
            <button type="button" className="vp2__btn vp2__btn--teal" aria-label={muted ? "Ativar som" : "Silenciar aula"} title="Som (M)" aria-pressed={muted} disabled={!ready} onClick={changeMute}>
              {muted ? <VolumeX size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}
            </button>
            <button type="button" className="vp2__btn vp2__btn--amber" aria-label={`Velocidade ${rate}×. Alterar`} title="Velocidade" disabled={!ready} onClick={cycleRate}>
              <Gauge size={18} aria-hidden="true" /> <b>{rate}×</b>
            </button>
            <a className="vp2__btn vp2__btn--red" href={external} target="_blank" rel="noopener noreferrer" aria-label="Abrir aula no YouTube" title="Abrir no YouTube">
              <ExternalLink size={18} aria-hidden="true" /> <span>YouTube</span>
            </a>
            <button type="button" className="vp2__btn vp2__btn--violet" aria-label="Tela cheia" title="Tela cheia (F)" disabled={!fullscreen} onClick={() => void full()}>
              <Maximize2 size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
        <p className="vp2__status" role="status">
          <i aria-hidden="true" /> {native ? "Controles no vídeo" : unavailable ? "Abrir no YouTube" : STATUS_LABEL[status]}
          <span>Atalhos: K pausa · J/L ±10 s · M som · F tela cheia</span>
          {note && <em>{note}</em>}
        </p>
        {native && (
          <button type="button" className="vp2__link" onClick={() => { setNative(false); setRetry((v) => v + 1); }}>
            Tentar controles personalizados
          </button>
        )}
      </div>
      <span className="sr-only">{videoTitle || source.title}</span>
    </div>
  );
}
