import { Link } from "@tanstack/react-router";
import { legalLibraryEntry } from "@/lib/legalLibrary";
import { Button } from "@/components/ui/button";

/**
 * Atalho para treinar questões desta lei. Não baixa o acervo para contar itens:
 * a contagem era feita aqui a cada abertura da página e puxava milhares de questões
 * (principal consumo de transferência de dados do site). O treinador já aplica o filtro.
 */
export function LawPracticeLink({ law }: { law: string; userId: string }) {
  const entry = legalLibraryEntry(law);
  if (!entry) return null;
  return (
    <section className="library-cta no-print" aria-label="Treino desta lei">
      <div>
        <strong>Treino específico: {entry.title}</strong>
        <span>
          O treinador abre só as questões com referência oficial a esta lei. Pratique com os casos e flashcards acima.
        </span>
      </div>
      <Button asChild>
        <Link to="/dashboard/question-trainer" search={{ law, go: "1", reinforce: "1" }}>
          Treinar questões desta lei
        </Link>
      </Button>
    </section>
  );
}
