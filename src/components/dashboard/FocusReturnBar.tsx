import { useSyncExternalStore } from "react";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeftCircle, X } from "lucide-react";
import { endFocus, getFocusSession, subscribeFocusSession } from "@/lib/focusSession";
import { hms } from "@/hooks/useFocusMode";

/**
 * Faixa fixa mostrada em Questões e Dicionário enquanto o relógio do modo foco está em pausa:
 * leva de volta à área de estudo, onde a contagem recomeça de onde parou.
 */
export function FocusReturnBar() {
  const router = useRouter();
  const session = useSyncExternalStore(subscribeFocusSession, getFocusSession, () => null);
  if (!session?.away) return null;
  return (
    <div className="no-print fixed inset-x-0 top-0 z-[70] flex flex-wrap items-center gap-3 bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-700 px-4 py-2 text-sm text-white shadow-lg" role="status">
      <p className="flex-1 basis-60">
        <strong>Relógio de estudo em pausa</strong> · parado em <span className="font-mono font-bold">{hms(session.elapsed)}</span>. Ele continua de onde parou quando você voltar.
      </p>
      <button type="button" onClick={() => router.history.push(session.returnTo)} className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 font-bold text-indigo-800 hover:bg-white/90">
        <ArrowLeftCircle className="h-4 w-4" /> Voltar à área de estudo
      </button>
      <button type="button" onClick={endFocus} aria-label="Encerrar a sessão de foco" className="grid h-8 w-8 place-items-center rounded-full bg-white/15 hover:bg-white/25">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
