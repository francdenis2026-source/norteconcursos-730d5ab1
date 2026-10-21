import { Flame, LogOut, Medal, MoonStar, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { fmtHuman } from "@/lib/studyClock";
import "@/styles/farewell-dialog.css";

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

/** A compact review before leaving; closing the dialog keeps the session active. */
export function FarewellDialog({ open, name, spent, streak, medals, onStay, onLeave }: Props) {
  const first = name.trim().split(/\s+/)[0] || "";
  const tiles = [
    { icon: Timer, label: "Hoje na plataforma", value: spent >= 60 ? fmtHuman(spent) : spent > 0 ? "< 1 min" : "0 min" },
    { icon: Flame, label: "Sequência", value: `${streak} ${streak === 1 ? "dia" : "dias"}` },
    { icon: Medal, label: "Medalhas", value: String(medals) },
  ];
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onStay()}>
      <DialogContent className="farewell-dialog">
        <div className="farewell-art" aria-hidden="true" />
        <div className="farewell-intro">
          <span className="farewell-kicker"><MoonStar aria-hidden="true" /> SUA PREPARAÇÃO CONTINUA</span>
          <DialogTitle className="farewell-title">
            Uma pausa{first && <>, <span>{first}</span></>}.
            <br />O objetivo permanece.
          </DialogTitle>
          <DialogDescription className="farewell-description">
            Cada dia de estudo conta. Confira seu ritmo antes de encerrar por hoje.
          </DialogDescription>
        </div>
        <dl className="farewell-metrics" aria-label="Resumo da sua preparação">
          {tiles.map(({ icon: Icon, label, value }) => (
            <div key={label}>
              <dt><Icon aria-hidden="true" /><span>{label}</span></dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <DialogFooter className="farewell-actions">
          <Button variant="outline" onClick={onStay} autoFocus className="farewell-stay">
            Continuar estudando
          </Button>
          <Button onClick={onLeave} className="farewell-leave">
            <LogOut aria-hidden="true" /> Encerrar sessão
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
