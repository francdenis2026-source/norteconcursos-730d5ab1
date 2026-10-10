import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

/** Só aceita voltar para o próprio cronograma (evita redirecionar para endereço externo). */
export function safeBack(back: unknown): { path: string; search: Record<string, string> } | null {
  if (typeof back !== "string" || !back.startsWith("/dashboard/cronograma")) return null;
  try {
    const url = new URL(back, "http://local");
    return { path: url.pathname, search: Object.fromEntries(url.searchParams) };
  } catch {
    return null;
  }
}

/** Faixa colorida no topo de Biblioteca/Edital quando o aluno chegou pelo painel do dia. */
export function BackToPlan({ back, topic }: { back: unknown; topic?: string | undefined }) {
  const b = safeBack(back);
  if (!b) return null;
  return (
    <div className="sticky top-2 z-30 flex flex-wrap items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-3 text-white shadow-lg">
      <div className="min-w-0 flex-1 text-sm">
        <p className="font-black">📖 Estudando pelo seu cronograma</p>
        {topic && <p className="truncate text-xs text-white/85">{topic}</p>}
      </div>
      <Link to={b.path as never} search={b.search as never}
        className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-violet-700 shadow hover:bg-white/90">
        <ArrowLeft className="h-4 w-4" /> Voltar ao painel do dia
      </Link>
    </div>
  );
}
