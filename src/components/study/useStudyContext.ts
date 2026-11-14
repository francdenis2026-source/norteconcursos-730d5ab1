import React from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { platformDate } from "@/lib/platformClock";
import {
  CAREERS,
  buildPlan,
  type CareerId,
  type Experience,
  norm,
  type SubjectStat,
} from "@/lib/studyEngine";
import { topicsFor } from "@/data/studyTopics";
import { canonicalSubject } from "@/lib/subjects";

export const ALL_SUBJECTS = [
  "Língua Portuguesa", "Matemática e Raciocínio Lógico", "Informática",
  "Direito Constitucional", "Direito Administrativo", "Direito Penal", "Direito Processual Penal",
  "Legislação Especial", "Legislação de Trânsito", "Direitos Humanos", "Contabilidade",
  "Atualidades", "Ética", "Medicina Legal",
];

export interface StudyProfile {
  id: string;
  name: string | null;
  experience: Experience;
  career: CareerId;
  exam_date: string | null;
  hours_per_week: number;
  essay: boolean;
}
export interface DueCard {
  id: string;
  subject: string;
  topic: string | null;
  front: string;
  back: string;
}

/** Plano, disciplinas e revisões pendentes do aluno (mesma fonte usada antes na Central). */
export function useStudyContext() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const [profile, setProfile] = React.useState<StudyProfile | null>(null);
  const [stats, setStats] = React.useState<SubjectStat[]>([]);
  const [hours, setHours] = React.useState(0);
  const [due, setDue] = React.useState<DueCard[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (authLoading) return;
    if (!real || !user) {
      setLoading(false);
      return;
    }
    let alive = true;
    void (async () => {
      const [p, s, h, d] = await Promise.all([
        supabase
          .from("study_profiles")
          .select("id,name,experience,career,exam_date,hours_per_week,essay")
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false })
          .limit(1),
        supabase.rpc("my_subject_stats"),
        supabase.rpc("my_study_hours"),
        supabase
          .from("flashcards")
          .select("id,subject,topic,front,back")
          .eq("user_id", user.id)
          .lte("due_at", platformDate().toISOString())
          .order("due_at")
          .limit(300),
      ]);
      if (!alive) return;
      setProfile(((p.data as StudyProfile[] | null) ?? [])[0] ?? null);
      setStats((s.data as SubjectStat[] | null) ?? []);
      setHours(Number(h.data ?? 0));
      setDue((d.data as DueCard[] | null) ?? []);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [authLoading, real, user]);

  const career = CAREERS.find((c) => c.id === profile?.career) ?? CAREERS[CAREERS.length - 1]!;
  const plan = React.useMemo(
    () =>
      profile
        ? buildPlan({
            experience: profile.experience,
            career: profile.career,
            examDate: profile.exam_date,
            hoursPerWeek: profile.hours_per_week,
            stats,
            hoursStudied: hours,
          })
        : null,
    [profile, stats, hours],
  );
  // Disciplinas do plano primeiro; as demais da plataforma ficam disponíveis para estudo livre.
  const subjects = React.useMemo(() => {
    const own = (plan ? plan.subjects.map((s) => s.name) : career.subjects.map((s) => s.name))
      .map(canonicalSubject);
    const normalizedOwn = [...new Set(own)];
    const seen = new Set(normalizedOwn.map(norm));
    return [...normalizedOwn, ...ALL_SUBJECTS
      .map(canonicalSubject)
      .filter((n) => !seen.has(norm(n)) && topicsFor(n).length)
      .filter((n, index, all) => all.indexOf(n) === index)];
  }, [plan, career]);
  // Matéria mais urgente: pior aproveitamento (com amostra mínima); sem dados, a de maior peso no tempo.
  const suggested = React.useMemo(() => {
    if (!plan) return subjects[0] ?? "";
    const withData = plan.subjects
      .filter((s) => s.accuracy !== null && s.answered >= 10)
      .sort((a, b) => (a.accuracy ?? 100) - (b.accuracy ?? 100));
    return (
      (withData[0] ?? [...plan.subjects].sort((a, b) => b.share - a.share)[0])?.name ??
      subjects[0] ??
      ""
    );
  }, [plan, subjects]);
  const daysToExam = profile?.exam_date
    ? Math.ceil((new Date(`${profile.exam_date}T12:00:00-05:00`).getTime() - Date.now()) / 86_400_000)
    : null;
  return {
    real,
    loading: loading || authLoading,
    profile,
    career,
    plan,
    subjects,
    suggested,
    due,
    daysToExam,
  };
}
