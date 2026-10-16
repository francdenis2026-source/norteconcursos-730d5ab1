import { Info } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { GLOSSARY, normalize } from "@/lib/glossary";
import type { PenalRule } from "@/lib/penalPolicy";
const aliases: Record<string, string> = { Progressão: "Progressão de regime" };
const definitions: Record<string, string> = {
  Fiança:
    "Garantia prevista no processo penal, acompanhada de obrigações. Sua possibilidade e seu arbitramento dependem dos requisitos do CPP; não se confunde com liberdade automática.",
  Substituição:
    "Troca da pena privativa de liberdade por penas restritivas de direitos, quando satisfeitos os requisitos legais. Não é mudança de regime prisional.",
  "Saída temporária":
    "Autorização judicial de saída do estabelecimento nas hipóteses da LEP, sem vigilância direta, sujeita a requisitos e vedações. É diferente da permissão com escolta.",
};
export function PenalRuleHelp({ rule }: { rule: PenalRule }) {
  const entry = GLOSSARY.find(
    (e) => normalize(e.term) === normalize(aliases[rule.title] ?? rule.title),
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Entender ${rule.title}`}
          title={`Entender ${rule.title}`}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-current hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:bg-white/10"
        >
          <Info aria-hidden className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{rule.title}</DialogTitle>
          <DialogDescription>
            Conceito jurídico e aplicação ao exercício selecionado.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm leading-6">
          {definitions[rule.title] ?? entry?.meaning ?? rule.explanation}
        </p>
        <div className="rounded-xl border bg-muted/40 p-4">
          <p className="text-sm font-semibold">No seu exercício: {rule.label}</p>
          <p className="mt-2 text-sm leading-6">{rule.explanation}</p>
        </div>
        <p className="text-xs text-muted-foreground">
          Fundamento: {rule.reference}. Confira a modalidade e a lei aplicável ao fato.
        </p>
      </DialogContent>
    </Dialog>
  );
}
