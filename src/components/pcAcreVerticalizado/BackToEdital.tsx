import { Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";

/** Só aceita voltar para o próprio edital verticalizado (evita redirecionar para endereço externo). */
export function safeBackToEdital(
  back: unknown,
): { path: string; search: Record<string, string> } | null {
  if (typeof back !== "string" || !back.startsWith("/dashboard/pc-acre-edital")) return null;
  try {
    const url = new URL(back, "http://local");
    return { path: url.pathname, search: Object.fromEntries(url.searchParams) };
  } catch {
    return null;
  }
}

/** Faixa no topo de Biblioteca/Treinador de questões quando o aluno chegou pelo edital
 * verticalizado da PC-AC, para voltar direto ao mesmo cargo que estava estudando. */
export function BackToEdital({
  back,
  cargoLabel,
}: {
  back: unknown;
  cargoLabel?: string | undefined;
}) {
  const b = safeBackToEdital(back);
  if (!b) return null;
  return (
    <div className="sticky top-2 z-30 flex flex-wrap items-center gap-3 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 p-3 text-white shadow-lg">
      <div className="flex min-w-0 flex-1 items-center gap-2 text-sm">
        <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
        <div className="min-w-0">
          <p className="font-black">Estudando pelo edital verticalizado</p>
          {cargoLabel && <p className="truncate text-xs text-white/85">{cargoLabel}</p>}
        </div>
      </div>
      <Link
        to={b.path as never}
        search={b.search as never}
        className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-emerald-900 shadow hover:bg-white/90"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar ao edital
      </Link>
    </div>
  );
}
