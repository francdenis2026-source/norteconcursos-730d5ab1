import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookmarkPlus, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Question } from "@/lib/questionFormat";
import { readStudyLater, saveStudyLater, studyLaterIdentity } from "@/lib/studyLater";

export function SaveStudyLater({ userId, question }: { userId: string; question: Question }) {
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setSaved(false);
    try {
      setSaved(
        readStudyLater(localStorage, userId).some(
          (item) => item.key === studyLaterIdentity(question),
        ),
      );
    } catch {
      /* Preserve unreadable storage; report on save. */
    }
  }, [userId, question.id, question.source]);
  const save = () => {
    try {
      saveStudyLater(localStorage, userId, question);
      setSaved(true);
      toast.success("Questão salva em Meus cadernos → Estudar depois, neste navegador.");
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
