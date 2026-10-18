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
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const play = async () => {
    setError(null);
    if (browserSpeechRef.current) {
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
      else window.speechSynthesis.pause();
      setPlaying(window.speechSynthesis.paused);
      return;
    }
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
      }
      return;
    }

    setLoading(true);
    try {
      const response = naturalVoiceEnabled
        ? await fetch("/api/voice-speech", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
          })
        : new Response(null, { status: 503 });
      if (!response.ok) {
        // The browser voice is an immediate, license-safe fallback while the
        // optional VoiceStudio service is being provisioned.
        if (response.status === 503 && "speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = "pt-BR";
          const ptVoice = window.speechSynthesis
            .getVoices()
            .find((voice) => /^pt(-BR)?$/i.test(voice.lang));
          if (ptVoice) utterance.voice = ptVoice;
          utterance.onend = () => {
            browserSpeechRef.current = null;
            setPlaying(false);
          };
          utterance.onerror = () => {
            browserSpeechRef.current = null;
            setPlaying(false);
            setError("A voz do navegador não pôde ser iniciada.");
          };
          browserSpeechRef.current = utterance;
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utterance);
          setPlaying(true);
          return;
        }
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "A leitura em voz alta não está disponível.");
      }
      const nextUrl = URL.createObjectURL(await response.blob());
      setAudioUrl(nextUrl);
      const audio = new Audio(nextUrl);
      audioRef.current = audio;
      audio.addEventListener("ended", () => setPlaying(false));
      await audio.play();
      setPlaying(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível iniciar a leitura.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(
    () => () => {
      audioRef.current?.pause();
      window.speechSynthesis?.cancel();
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    },
    [audioUrl],
  );

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
        ) : audioUrl ? (
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
