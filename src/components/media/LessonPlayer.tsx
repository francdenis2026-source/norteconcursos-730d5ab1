import { useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { isPlaylistId } from "@/lib/arsenal";
import { loadYoutubePlayer, type LessonYoutubePlayer } from "@/lib/youtubePlayer";
import "./video-study.css";

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
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};
export function LessonPlayer({
  source,
  onPrevious,
  onNext,
}: {
  source: LessonSource;
  onPrevious?: (() => void) | undefined;
  onNext?: (() => void) | undefined;
}) {
  const mount = useRef<HTMLDivElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const player = useRef<LessonYoutubePlayer | null>(null);
  const [started, setStarted] = useState(false);
  const [native, setNative] = useState(false);
  const [retry, setRetry] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "loading" | "playing" | "paused" | "ended" | "error"
  >("idle");
  const [ready, setReady] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [rate, setRate] = useState(1);
  const [rates, setRates] = useState<number[]>([1]);
  const [videoTitle, setVideoTitle] = useState("");
  const [fullscreen, setFullscreen] = useState(false);
  const [note, setNote] = useState("");
  const playlist = isPlaylistId(source.id);
  const external = `https://www.youtube.com/${playlist ? `playlist?list=${encodeURIComponent(source.id)}` : `watch?v=${encodeURIComponent(source.id)}`}`;
  useEffect(() => {
    setFullscreen(!!document.fullscreenEnabled && !!shell.current?.requestFullscreen);
  }, []);
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
            controls: 1,
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
    const timer = window.setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [ready, status]);
  const start = () => {
    if (status === "error") setRetry((v) => v + 1);
    setStarted(true);
  };
  const changeMute = () => {
    const p = player.current;
    if (!p) return;
    if (p.isMuted()) p.unMute();
    else p.mute();
    setMuted(p.isMuted());
  };
  const full = async () => {
    try {
      if (document.fullscreenElement === shell.current) await document.exitFullscreen();
      else await shell.current?.requestFullscreen();
    } catch {
      setNote("O navegador não permitiu tela cheia. Use o controle do YouTube.");
    }
  };
  const unavailable = source.embeddable === false;
  const blocked = unavailable || status === "error";
  return (
    <div
      className="lesson-player"
      ref={shell}
      data-playing={status === "playing"}
      data-native={native}
    >
      <div className="lesson-player__heading">
        <span>{source.subject.replace(/^ENEM\s*[—-]\s*/, "")}</span>
        <span role="status">
          {unavailable
            ? "Abrir no YouTube"
            : native
              ? "Controles no vídeo"
              : status === "playing"
                ? "Em reprodução"
                : status === "loading"
                  ? "Carregando aula…"
                  : status === "error"
                    ? "Não foi possível carregar"
                    : status === "ended"
                      ? "Aula finalizada"
                      : ready
                        ? "Em pausa"
                        : "Pronto para estudar"}
        </span>
      </div>
      <div className="lesson-player__viewport">
        <div ref={mount} className="lesson-player__embed" />
        {native && !unavailable && (
          <iframe
            key={source.id}
            className="lesson-player__native"
            title={source.title}
            src={`https://www.youtube-nocookie.com/embed/${playlist ? `videoseries?list=${encodeURIComponent(source.id)}&` : `${encodeURIComponent(source.id)}?`}enablejsapi=1&controls=1&playsinline=1&rel=0&autoplay=1`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
        {((!native && (!started || blocked)) || unavailable) && (
          <div className="lesson-player__poster">
            <span className="lesson-player__eyebrow">Norte Concursos · Sala de estudo</span>
            <h2>{source.title}</h2>
            <p>{source.topic || "Sua próxima aula começa aqui."}</p>
            {unavailable ? (
              <a
                href={external}
                target="_blank"
                rel="noopener noreferrer"
                className="lesson-player__start"
              >
                <ExternalLink size={22} /> Assistir no YouTube
              </a>
            ) : (
              <button type="button" onClick={start} className="lesson-player__start">
                {status === "error" ? (
                  <RotateCcw size={23} />
                ) : (
                  <Play size={25} fill="currentColor" />
                )}{" "}
                {status === "error" ? "Tentar novamente" : "Iniciar aula"}
              </button>
            )}
            {status === "error" && !unavailable && (
              <button
                type="button"
                className="lesson-player__native-choice"
                onClick={() => setNative(true)}
              >
                Usar controles do YouTube aqui
              </button>
            )}
            {blocked && (
              <p role="alert">
                {unavailable
                  ? "O canal não permite reproduzir esta aula fora do YouTube."
                  : "Confira sua conexão ou abra a aula no YouTube."}
              </p>
            )}
          </div>
        )}
      </div>
      <div className="lesson-player__controls">
        <div className="lesson-player__timeline">
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
        <div className="lesson-player__buttons">
          <button
            type="button"
            aria-label="Aula anterior"
            disabled={!onPrevious && (!playlist || !ready)}
            onClick={() => (onPrevious ? onPrevious() : player.current?.previousVideo())}
          >
            <SkipBack size={19} />
          </button>
          <button
            type="button"
            className="lesson-player__play"
            aria-label={status === "playing" ? "Pausar aula" : "Reproduzir aula"}
            disabled={unavailable || (started && !ready && status !== "error")}
            onClick={() => {
              if (!ready) start();
              else if (status === "playing") player.current?.pauseVideo();
              else player.current?.playVideo();
            }}
          >
            {status === "playing" ? <Pause size={21} /> : <Play size={21} />}
          </button>
          <button
            type="button"
            aria-label="Próxima aula"
            disabled={!onNext && (!playlist || !ready)}
            onClick={() => (onNext ? onNext() : player.current?.nextVideo())}
          >
            <SkipForward size={19} />
          </button>
          <button
            type="button"
            aria-label={muted ? "Ativar som" : "Silenciar aula"}
            disabled={!ready}
            onClick={changeMute}
          >
            {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <label className="lesson-player__speed">
            <span className="sr-only">Velocidade da aula</span>
            <select
              aria-label="Velocidade da aula"
              value={rate}
              disabled={!ready}
              onChange={(e) => {
                const value = Number(e.target.value);
                player.current?.setPlaybackRate(value);
                setRate(value);
              }}
            >
              {(rates.length ? rates : [1]).map((value) => (
                <option value={value} key={value}>
                  {value}×
                </option>
              ))}
            </select>
          </label>
          <a
            className="lesson-player__external"
            href={external}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir aula no YouTube"
          >
            <ExternalLink size={18} />
            <span>YouTube</span>
          </a>
          <button
            type="button"
            aria-label="Tela cheia"
            data-fullscreen="true"
            disabled={!fullscreen}
            onClick={() => void full()}
          >
            <Maximize2 size={20} />
          </button>
        </div>
      </div>
      <div className="lesson-player__caption">
        <strong>{videoTitle || source.title}</strong>
        <span>
          {source.channel ||
            (playlist
              ? "Playlist · controles de sequência disponíveis ao iniciar"
              : source.topic || source.subject)}
        </span>
        {native && (
          <>
            <span>Use os controles do vídeo para reproduzir, ajustar o som e avançar.</span>
            <button
              type="button"
              className="lesson-player__native-choice"
              onClick={() => {
                setNative(false);
                setRetry((value) => value + 1);
              }}
            >
              Tentar controles personalizados
            </button>
          </>
        )}
        {note && <span role="status">{note}</span>}
      </div>
    </div>
  );
}
