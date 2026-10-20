import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookmarkPlus, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Question } from "@/lib/questionFormat";
import { readStudyLater, saveStudyLater, studyLaterHas } from "@/lib/studyLater";
import { accountStudyLaterPort } from "@/lib/studyLaterAccount";
import { pushStudyLaterItem } from "@/lib/studyLaterSync";

export function SaveStudyLater({ userId, question }: { userId: string; question: Question }) {
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setSaved(false);
    try {
      setSaved(studyLaterHas(readStudyLater(localStorage, userId), question));
    } catch {
      /* Preserve unreadable storage; report on save. */
    }
  }, [userId, question.id, question.source, question.table]);
  const save = () => {
    try {
      const items = saveStudyLater(localStorage, userId, question);
      setSaved(true);
      const saved = items.find((item) => studyLaterHas([item], question));
      // A conta é um espelho: se a tabela ainda não existir, o caderno segue válido neste navegador.
      void (saved ? pushStudyLaterItem(userId, saved, accountStudyLaterPort(userId)) : Promise.resolve(false))
        .then((account) =>
          toast.success(
            account
              ? "Questão salva em Meus cadernos → Estudar depois, na sua conta."
              : "Questão salva em Meus cadernos → Estudar depois, neste navegador.",
          ),
        )
        .catch(() =>
          toast.message(
            "Questão salva neste navegador. Não foi possível copiá-la para a sua conta agora; ela será enviada na próxima vez que você abrir o caderno.",
          ),
        );
    } catch {
      toast.error(
        "Não foi possível salvar o caderno neste navegador. Os dados anteriores foram preservados.",
      );
    }
  };
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={save} disabled={saved}>
        {saved ? <Check className="mr-2 h-4 w-4" /> : <BookmarkPlus className="mr-2 h-4 w-4" />}
        {saved ? "Salva no caderno" : "Estudar depois"}
      </Button>
      <Button asChild variant="ghost">
        <Link to="/dashboard/notebooks">Meus cadernos</Link>
      </Button>
    </div>
  );
}
