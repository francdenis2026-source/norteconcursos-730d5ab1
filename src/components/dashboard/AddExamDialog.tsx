import React from "react";
import { canonicalBoard } from "@/lib/subjects";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExamPhotoUploader } from "@/components/dashboard/ExamPhotoUploader";

const slugify = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const toCount = (value: string) => (value.trim() === "" ? 0 : Number(value));

interface Created {
  contest: string;
  year: string;
  board: string;
}

// Cadastro simples de uma prova que o aluno já fez: concurso, ano, banca e totais. As fotos são
// opcionais e vêm em seguida. Item a item e correção por questão ficam para uma próxima versão.
export function AddExamDialog({
  userId,
  contestSuggestions,
  onChanged,
}: {
  userId: string;
  contestSuggestions: string[];
  onChanged: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [contest, setContest] = React.useState("");
  const [year, setYear] = React.useState(String(new Date().getFullYear()));
  const [board, setBoard] = React.useState("");
  const [correct, setCorrect] = React.useState("");
  const [wrong, setWrong] = React.useState("");
  const [blank, setBlank] = React.useState("");
  const [score, setScore] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [created, setCreated] = React.useState<Created | null>(null);

  const reset = () => {
    setContest("");
    setYear(String(new Date().getFullYear()));
    setBoard("");
    setCorrect("");
    setWrong("");
    setBlank("");
    setScore("");
    setError(null);
    setCreated(null);
  };

  const close = (next: boolean) => {
    setOpen(next);
    if (!next) {
      if (created) onChanged();
      reset();
    }
  };

  const validate = () => {
    if (contest.trim().length < 3) return "Informe o nome do concurso.";
    const yearNumber = Number(year);
    if (
      !Number.isInteger(yearNumber) ||
      yearNumber < 1990 ||
      yearNumber > new Date().getFullYear() + 1
    )
      return "Informe um ano válido.";
    const counts = [correct, wrong, blank].map(toCount);
    if (counts.some((count) => !Number.isInteger(count) || count < 0 || count > 500))
      return "Acertos, erros e em branco devem ser números inteiros entre 0 e 500.";
    if (counts.reduce((sum, count) => sum + count, 0) === 0)
      return "Informe quantas questões você acertou, errou ou deixou em branco.";
    if (score.trim() !== "" && !Number.isFinite(Number(score.replace(",", "."))))
      return "A pontuação deve ser um número.";
    return null;
  };

  const save = async () => {
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const name = contest.trim();
      const duplicate = await supabase
        .from("student_exam_documents")
        .select("id")
        .eq("user_id", userId)
        .eq("contest_name", name)
        .eq("contest_year", year)
        .like("storage_path", "manual-entry/%")
        .limit(1);
      if (duplicate.error) throw duplicate.error;
      if ((duplicate.data ?? []).length) {
        setError("Você já cadastrou esta prova (mesmo concurso e ano).");
        return;
      }
      const scoreValue = score.trim() === "" ? null : Number(score.replace(",", "."));
      const insert = await supabase.from("student_exam_documents").insert({
        user_id: userId,
        contest_name: name,
        contest_year: year,
        exam_board: canonicalBoard(board) || null,
        doc_type: "resultado",
        file_name: `${slugify(name)}_${year}_resultado.txt`,
        storage_path: `manual-entry/${userId}/${slugify(name)}-${year}`,
        correct_count: toCount(correct),
        wrong_count: toCount(wrong),
        blank_count: toCount(blank),
        score_net: scoreValue,
        extracted_data: { method: "totais informados pelo próprio aluno", items: {} },
        notes: "Resultado informado pelo aluno (totais). Sem detalhamento por questão.",
      });
      if (insert.error) throw insert.error;
      setCreated({ contest: name, year, board: board.trim() });
      onChanged();
    } catch (saveError) {
      console.error("Falha ao cadastrar prova", saveError);
      const text = saveError instanceof Error ? saveError.message : String(saveError);
      setError(
        /row-level security|violates/i.test(text)
          ? "Seu plano não inclui o cadastro de provas."
          : "Não foi possível salvar agora. Tente novamente.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> Adicionar prova
      </Button>
      <Dialog open={open} onOpenChange={close}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {created ? "Prova cadastrada" : "Adicionar uma prova que você fez"}
            </DialogTitle>
            <DialogDescription>
              {created
                ? "Se quiser, envie agora as fotos das páginas. Dá para fazer depois, no card da prova."
                : "Informe os totais do seu resultado. Depois você pode enviar as fotos da prova."}
            </DialogDescription>
          </DialogHeader>
          {created ? (
            <div className="space-y-4">
              <ExamPhotoUploader
                contest={created.contest}
                year={created.year}
                board={created.board}
                existingPages={0}
                onUploaded={onChanged}
              />
              <div className="flex justify-end">
                <Button type="button" onClick={() => close(false)}>
                  Concluir
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="exam-contest">Concurso (nome como aparece no edital)</Label>
                <Input
                  id="exam-contest"
                  list="exam-contest-options"
                  value={contest}
                  onChange={(event) => setContest(event.target.value)}
                  placeholder="Ex.: Polícia Rodoviária Federal"
                />
                <datalist id="exam-contest-options">
                  {contestSuggestions.map((name) => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="exam-year">Ano da prova</Label>
                  <Input
                    id="exam-year"
                    inputMode="numeric"
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="exam-board">Banca (opcional)</Label>
                  <Input
                    id="exam-board"
                    value={board}
                    onChange={(event) => setBoard(event.target.value)}
                    placeholder="Ex.: Cebraspe, FGV, Fundape"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-4">
                <div className="space-y-1.5">
                  <Label htmlFor="exam-correct">Acertos</Label>
                  <Input
                    id="exam-correct"
                    inputMode="numeric"
                    value={correct}
                    onChange={(event) => setCorrect(event.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="exam-wrong">Erros</Label>
                  <Input
                    id="exam-wrong"
                    inputMode="numeric"
                    value={wrong}
                    onChange={(event) => setWrong(event.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="exam-blank">Em branco</Label>
                  <Input
                    id="exam-blank"
                    inputMode="numeric"
                    value={blank}
                    onChange={(event) => setBlank(event.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="exam-score">Pontuação</Label>
                  <Input
                    id="exam-score"
                    inputMode="decimal"
                    value={score}
                    onChange={(event) => setScore(event.target.value)}
                    placeholder="opcional"
                  />
                </div>
              </div>
              {error && <p className="text-sm font-bold text-rose-600">{error}</p>}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => close(false)}>
                  Cancelar
                </Button>
                <Button type="button" disabled={saving} onClick={() => void save()}>
                  {saving ? "Salvando..." : "Salvar prova"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
