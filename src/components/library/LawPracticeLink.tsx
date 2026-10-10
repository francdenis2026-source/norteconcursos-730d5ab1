import { Link } from "@tanstack/react-router";
import { useQuestionCatalog } from "@/hooks/useQuestionCatalog";
import { legalLibraryEntry, questionMatchesLaw } from "@/lib/legalLibrary";
import { Button } from "@/components/ui/button";

export function LawPracticeLink({law,userId}:{law:string;userId:string}) {
  const entry = legalLibraryEntry(law);
  const { catalog, loading, error } = useQuestionCatalog(userId, !!entry && userId !== "demo-user");
  const count = catalog.filter(question => questionMatchesLaw(question, law)).length;
  if (!entry) return null;
  return <section className="library-cta no-print" aria-label="Treino desta lei">
    <div><strong>Treino específico: {entry.title}</strong>
      <span>{loading ? "Conferindo as questões disponíveis…" : error ? "Não foi possível conferir a quantidade de questões agora." : count ? `${count} questões com referência oficial a esta lei. O treino mantém esse filtro.` : "Ainda não há questões identificadas com referência oficial a esta lei no catálogo disponível. Pratique com os casos e flashcards acima."}</span>
    </div>
    {!loading && !error && count > 0 && <Button asChild><Link to="/dashboard/question-trainer" search={{law,go:"1",reinforce:"1"}}>Treinar questões desta lei</Link></Button>}
  </section>;
}
