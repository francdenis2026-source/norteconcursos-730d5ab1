import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStatus } from "@/hooks/useDashboard";
import { deleteResolution, listResolutions, type SavedResolution } from "@/lib/aiSolverStore";

/** Lista as resoluções geradas pela IA e salvas no caderno do aluno. */
export function AiResolutionsSection() {
  const { user } = useAuthStatus();
  const userId = user?.id ?? "demo-user";
  const [items, setItems] = useState<SavedResolution[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => setItems(listResolutions(userId)), [userId]);

  const remove = (id: string) => {
    deleteResolution(userId, id);
    setItems(listResolutions(userId));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-primary" aria-hidden /> Resoluções salvas pela IA
        </CardTitle>
        <CardDescription>
          Questões que você resolveu com IA, guardadas para revisar depois.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhuma resolução ainda.{" "}
            <Link to="/dashboard/ai-solver" className="font-medium text-primary underline">
              Resolver uma questão
            </Link>
          </p>
        ) : (
          items.map((r) => (
            <div key={r.id} className="rounded-lg border bg-background p-3">
              <div className="flex items-start justify-between gap-3">
                <button
                  type="button"
                  className="flex-1 text-left text-sm font-medium text-foreground line-clamp-2"
                  onClick={() => setOpen(open === r.id ? null : r.id)}
                  aria-expanded={open === r.id}
                >
                  {r.question}
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Excluir resolução"
                  onClick={() => remove(r.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {new Date(r.createdAt).toLocaleString("pt-BR")}
              </p>
              {open === r.id && (
                <div className="mt-3 whitespace-pre-wrap border-t pt-3 text-sm leading-relaxed text-foreground">
                  {r.answer}
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
