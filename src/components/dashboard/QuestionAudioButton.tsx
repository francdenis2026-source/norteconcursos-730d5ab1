import { Loader2, Pause, Play, Volume2 } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";

type QuestionAudioButtonProps = {
  text: string;
  naturalVoiceEnabled?: boolean;
};

/** Optional VoiceStudio-powered reading control for a question. */
export function QuestionAudioButton({ text, naturalVoiceEnabled = false }: QuestionAudioButtonProps) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const browserSpeechRef = React.useRef<SpeechSynthesisUtterance | null>(null);
  const audioUrl = React.useRef<string | null>(null);
  const requestRef = React.useRef<AbortController | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const speakInBrowser = () => {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      throw new Error("Este navegador não oferece leitura em voz alta. Tente outro navegador.");
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((item) => /^pt-BR$/i.test(item.lang)) ??
      voices.find((item) => /^pt(?:-|$)/i.test(item.lang));
    if (voice) utterance.voice = voice;
    utterance.onend = () => {
      if (browserSpeechRef.current !== utterance) return;
      browserSpeechRef.current = null;
      setPlaying(false);
    };
    utterance.onerror = () => {
      if (browserSpeechRef.current !== utterance) return;
      browserSpeechRef.current = null;
      setPlaying(false);
      setError("A voz do aparelho não pôde ser iniciada. Verifique as vozes em português nas configurações do dispositivo e tente novamente.");
    };
    window.speechSynthesis.cancel();
    browserSpeechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setPlaying(true);
  };

  const play = async () => {
    setError(null);
    try {
      if (browserSpeechRef.current) {
        if (playing) window.speechSynthesis.pause();
        else window.speechSynthesis.resume();
        setPlaying(!playing);
        return;
      }
      if (audioRef.current) {
        if (playing) audioRef.current.pause();
        else await audioRef.current.play();
        setPlaying(!playing);
        return;
      }
      // Start device speech directly within the tap when no remote voice is used.
      if (!naturalVoiceEnabled) {
        speakInBrowser();
        return;
      }
      setLoading(true);
      const controller = new AbortController();
      requestRef.current = controller;
      const timeout = window.setTimeout(() => controller.abort(), 12000);
      try {
        const response = await fetch("/api/voice-speech", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Serviço de voz indisponível.");
        const blob = await response.blob();
        if (!blob.size || !blob.type.startsWith("audio/")) throw new Error("Áudio inválido.");
        if (requestRef.current !== controller) return;
        audioUrl.current = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl.current);
        audioRef.current = audio;
        audio.onended = () => setPlaying(false);
        audio.onerror = () => {
          audioRef.current = null;
          if (audioUrl.current) URL.revokeObjectURL(audioUrl.current);
          audioUrl.current = null;
          setPlaying(false);
          setError("Não foi possível reproduzir o áudio. Tente novamente.");
        };
        await audio.play();
        if (requestRef.current === controller) setPlaying(true);
      } catch {
        // An unavailable model, timeout or network error must not disable reading.
        // A changed question/unmount must never start stale speech.
        if (requestRef.current !== controller) return;
        audioRef.current?.pause();
        audioRef.current = null;
        if (audioUrl.current) URL.revokeObjectURL(audioUrl.current);
        audioUrl.current = null;
        speakInBrowser();
        setError("Usando a voz do aparelho; a voz natural está indisponível.");
      } finally {
        window.clearTimeout(timeout);
        if (requestRef.current === controller) {
          requestRef.current = null;
          setLoading(false);
        }
      }
    } catch (cause) {
      setPlaying(false);
      setError(cause instanceof Error ? cause.message : "Não foi possível iniciar a leitura.");
    }
  };

  React.useEffect(() => {
    setPlaying(false);
    setLoading(false);
    setError(null);
    return () => {
      const request = requestRef.current;
      requestRef.current = null;
      request?.abort();
      if (audioRef.current) {
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (browserSpeechRef.current) {
        browserSpeechRef.current.onend = null;
        browserSpeechRef.current.onerror = null;
        browserSpeechRef.current = null;
        window.speechSynthesis?.cancel();
      }
      if (audioUrl.current) URL.revokeObjectURL(audioUrl.current);
      audioUrl.current = null;
    };
  }, [text, naturalVoiceEnabled]);

  return (
    <div className="flex min-w-0 flex-col items-end gap-1">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => void play()}
        disabled={loading || !text.trim()}
        aria-label={playing ? "Pausar leitura da questão" : "Ouvir questão"}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : playing ? (
          <Pause className="h-4 w-4" aria-hidden="true" />
        ) : audioUrl.current ? (
          <Play className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Volume2 className="h-4 w-4" aria-hidden="true" />
        )}
        {loading ? "Preparando áudio…" : playing ? "Pausar leitura" : "Ouvir questão"}
      </Button>
      {error && (
        <p
          role="status"
          className="max-w-64 text-right text-[11px] leading-4 text-muted-foreground"
        >
          {error}
        </p>
      )}
    </div>
  );
}
