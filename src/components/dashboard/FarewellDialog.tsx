import { Flame, LogOut, Medal, MoonStar, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { fmtHuman } from "@/lib/studyClock";

interface Props {
  open: boolean;
  name: string;
  /** Segundos na plataforma hoje. */
  spent: number;
  streak: number;
  medals: number;
  onStay: () => void;
  onLeave: () => void;
}

/** Despedida ao sair: resumo do dia numa caixa com imagem de fundo. */
export function FarewellDialog({ open, name, spent, streak, medals, onStay, onLeave }: Props) {
  const first = name.trim().split(/\s+/)[0] ?? "";
  const tiles = [
    { icon: Timer, hue: "oklch(0.75 0.15 160)", label: "Hoje na plataforma", value: spent >= 60 ? fmtHuman(spent) : "< 1 min" },
    { icon: Flame, hue: "oklch(0.74 0.17 50)", label: "Ofensiva", value: `${streak} ${streak === 1 ? "dia" : "dias"}` },
    { icon: Medal, hue: "oklch(0.82 0.14 80)", label: "Medalhas", value: String(medals) },
  ];
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onStay()}>
      <DialogContent className="dark max-w-md gap-0 overflow-hidden border-white/10 bg-[oklch(0.15_0.03_262)] p-0 text-foreground">
        <div
          className="relative flex h-40 items-end bg-cover bg-center p-5"
          style={{ backgroundImage: "url('/media/hero/dashboard.webp')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.03_262)] via-[oklch(0.15_0.03_262/0.4)] to-[oklch(0.15_0.03_262/0.05)]" aria-hidden />
          <div className="absolute inset-0" style={{ background: "radial-gradient(70% 120% at 100% 0%, oklch(0.8 0.13 78 / 0.25), transparent 70%)" }} aria-hidden />
          <span className="relative inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300 backdrop-blur">
            <MoonStar className="h-3.5 w-3.5" aria-hidden /> Sessão encerrada
          </span>
        </div>
        <div className="space-y-5 p-6 pt-4">
          <div>
            <DialogTitle className="font-display text-3xl font-extrabold leading-tight text-white">
              Até logo{first ? <>, <span className="text-amber-300">{first}</span></> : ""}!
            </DialogTitle>
            <DialogDescription className="mt-1.5 text-sm text-white/65">
              Aprovação é constância. Descanse, e amanhã a gente continua de onde você parou.
            </DialogDescription>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {tiles.map(({ icon: Icon, hue, label, value }) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: `color-mix(in oklab, ${hue} 18%, transparent)`, color: hue }}>
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <p className="mt-2.5 text-[10px] font-medium uppercase tracking-wide text-white/50">{label}</p>
                <p className="mt-0.5 text-base font-bold tabular-nums text-white">{value}</p>
              </div>
            ))}
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="ghost" onClick={onStay} className="text-white/80 hover:bg-white/10 hover:text-white" autoFocus>
              Continuar estudando
            </Button>
            <Button onClick={onLeave} className="gap-2 bg-amber-400 text-slate-900 hover:bg-amber-300">
              <LogOut className="h-4 w-4" aria-hidden /> Sair
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
