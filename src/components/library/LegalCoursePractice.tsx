import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { StudyPractice } from "./StudyPractice";
import type { StudyMaterial } from "@/lib/studyMaterials";
import { Button } from "@/components/ui/button";

type Attempt = { correct_count: number; question_count: number; created_at: string };
export function LegalCoursePractice({ courseId, userId, material }: { courseId: string; userId: string; material: StudyMaterial }) {
  const cache = useQueryClient();
  const [pending, setPending] = useState<{ id: string; answers: boolean[] }>();
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [saved, setSaved] = useState(false);
  const history = useQuery({ queryKey: ["legal-assessments", userId, courseId], queryFn: async () => {
    const { data, error } = await supabase.from("legal_course_quiz_attempts").select("correct_count,question_count,created_at").eq("user_id", userId).eq("course_id", courseId).order("created_at", { ascending: false }).limit(20);
    if (error) throw error;
    return (data ?? []) as Attempt[];
  } });
  async function save(attempt: { id: string; answers: boolean[] }) {
    setBusy(true); setFailed(false); setSaved(false);
    try {
      const { error } = await supabase.rpc("record_legal_course_quiz", { p_course_id: courseId, p_answers: attempt.answers, p_request_id: attempt.id, p_expected_user_id: userId });
      if (error) throw error;
      setSaved(true); setPending(undefined);
      await cache.invalidateQueries({ queryKey: ["legal-assessments", userId, courseId] });
      toast.success("Resultado conferido e salvo no seu histórico.");
    } catch { setFailed(true); toast.error("Não foi possível salvar o resultado. Tente novamente."); }
    finally { setBusy(false); }
  }
  const latest = history.data?.[0];
  return <div className="space-y-3">
    {latest && <p className="rounded-xl border p-3 text-sm">Último resultado salvo: <strong>{latest.correct_count}/{latest.question_count}</strong> · {new Date(latest.created_at).toLocaleString("pt-BR", { timeZone: "America/Rio_Branco" })}. {history.data!.length} tentativas recentes disponíveis.</p>}
    {history.isError && <p role="alert" className="text-sm">Não foi possível carregar o histórico. <button className="underline" onClick={() => void history.refetch()}>Tentar novamente</button></p>}
    <fieldset disabled={busy}><StudyPractice quiz={material.quiz ?? []} flashcards={material.flashcards ?? []} slug={material.slug} subject={material.discipline} topic={material.topic_label} onQuizComplete={answers => { const attempt = { id: crypto.randomUUID(), answers }; setPending(attempt); void save(attempt); }} /></fieldset>
    {busy && <p role="status" className="text-sm">Salvando resultado…</p>}
    {saved && <p role="status" className="text-sm text-primary">Resultado salvo. O desempenho nestes itens não representa cobertura de todos os artigos.</p>}
    {failed && pending && <Button variant="outline" disabled={busy} onClick={() => void save(pending)}>Tentar salvar o resultado novamente</Button>}
  </div>;
}
