import { Pause, Play, Volume2 } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";

/** Reads directly with the browser voice; no generated audio or download. */
export function QuestionAudioButton({ text }: { text: string }) {
  const speech = React.useRef<SpeechSynthesisUtterance | null>(null);
  const [state, setState] = React.useState<"idle" | "playing" | "paused">("idle");
  const [error, setError] = React.useState<string | null>(null);

  const play = () => {
    setError(null);
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      setError("Este navegador não oferece leitura em voz alta.");
      return;
    }
    try {
      if (speech.current) {
        if (state === "playing") {
          window.speechSynthesis.pause();
          setState("paused");
        } else {
          window.speechSynthesis.resume();
          setState("playing");
        }
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "pt-BR";
      // Use the browser's default Portuguese voice when available.
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find((v) => v.default && /^pt(?:-|$)/i.test(v.lang)) ??
        voices.find((v) => /^pt-BR$/i.test(v.lang)) ??
        voices.find((v) => /^pt(?:-|$)/i.test(v.lang));
      if (voice) utterance.voice = voice;
      utterance.onend = () => {
        if (speech.current !== utterance) return;
        speech.current = null;
        setState("idle");
      };
      utterance.onerror = () => {
        if (speech.current !== utterance) return;
        speech.current = null;
        setState("idle");
        setError("Não foi possível iniciar a voz do navegador. Confira as vozes em português do dispositivo e tente novamente.");
      };
      window.speechSynthesis.cancel();
      speech.current = utterance;
      window.speechSynthesis.speak(utterance);
      setState("playing");
    } catch {
      speech.current = null;
      setState("idle");
      setError("Não foi possível iniciar a leitura neste navegador.");
    }
  };

  React.useEffect(() => {
    setState("idle");
    setError(null);
    return () => {
      if (!speech.current) return;
      speech.current.onend = null;
      speech.current.onerror = null;
      speech.current = null;
      window.speechSynthesis?.cancel();
    };
  }, [text]);

  const label = state === "playing" ? "Pausar leitura" : state === "paused" ? "Continuar leitura" : "Ler em voz alta";
  return (
    <div className="min-w-0">
      <Hint content="Leitura com a voz padrão do navegador">
        <Button type="button" variant="outline" size="sm" className="min-h-10 gap-2" onClick={play}
          disabled={!text.trim()} aria-label={label} aria-pressed={state === "playing"}>
          {state === "playing" ? <Pause className="h-4 w-4" aria-hidden="true" /> : state === "paused" ? <Play className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
          {label}
        </Button>
      </Hint>
      {error && <p role="status" className="mt-1 max-w-sm text-xs text-muted-foreground">{error}</p>}
    </div>
  );
}
