import { disciplines, questions } from "@/data/mock";
import { isSupabaseConfigured, requireSupabase } from "@/lib/supabase";
import { MockService } from "@/services/mockService";
import type { Contest, PerformanceStats, UserResponse } from "@/types";

type ContestRow = {
  id: string;
  name: string;
  status: string;
  education_level: string | null;
  state: string | null;
  city: string | null;
  vacancies: number | null;
  salary_cents: number | null;
  exam_date: string | null;
  is_demo: boolean;
  careers: { name: string } | null;
  organizations: { name: string; acronym: string | null } | null;
  exam_boards: { name: string; acronym: string | null } | null;
  contest_positions: Array<{ positions: { name: string } | null }>;
};

const statusLabels: Record<string, Contest["status"]> = {
  expected: "Previsto",
  requested: "Previsto",
  authorized: "Autorizado",
  board_defined: "Autorizado",
  notice_published: "Edital Publicado",
  registration_open: "Inscrições Abertas",
  registration_closed: "Encerrado",
  exam_scheduled: "Edital Publicado",
  in_progress: "Edital Publicado",
  finished: "Encerrado",
  suspended: "Encerrado",
};

function mapContest(row: ContestRow): Contest {
  const organization =
    row.organizations?.acronym || row.organizations?.name || "Órgão não informado";
  const careerName = row.careers?.name || "Administrativa";
  const supportedCareers: Contest["career"][] = [
    "Policial",
    "Administrativa",
    "Tribunal",
    "Fiscal",
    "Bancária",
    "Saúde",
    "Educação",
  ];
  const career = supportedCareers.find((item) => careerName.includes(item)) || "Administrativa";

  const contest: Contest = {
    id: row.id,
    name: row.name,
    agency: organization,
    career,
    role: row.contest_positions[0]?.positions?.name || "Diversos cargos",
    examBoard: row.exam_boards?.acronym || row.exam_boards?.name || "A definir",
    educationLevel: row.education_level === "middle" ? "Médio" : "Superior",
    location: row.city ? `${row.city} - ${row.state}` : row.state || "Nacional",
    status: statusLabels[row.status] || "Previsto",
    vacancies: row.vacancies || 0,
    salary: (row.salary_cents || 0) / 100,
    isDemo: row.is_demo,
  };
  if (row.exam_date) contest.examDate = row.exam_date;
  return contest;
}

export const DataService = {
  isRemote: isSupabaseConfigured,

  async getContests(): Promise<Contest[]> {
    if (!isSupabaseConfigured) return MockService.getContests();
    const client = requireSupabase();
    const { data, error } = await client
      .from("contests")
      .select(
        "id,name,status,education_level,state,city,vacancies,salary_cents,exam_date,is_demo,careers(name),organizations(name,acronym),exam_boards(name,acronym),contest_positions(positions(name))",
      )
      .eq("is_published", true)
      .order("exam_date", { ascending: true, nullsFirst: false });
    if (error) throw error;
    return ((data || []) as unknown as ContestRow[]).map(mapContest);
  },

  async getFocusedContest(): Promise<Contest | undefined> {
    if (!isSupabaseConfigured) return MockService.getFocusedContest();
    const client = requireSupabase();
    const {
      data: { user },
    } = await client.auth.getUser();
    if (!user) return undefined;
    const { data: profile, error } = await client
      .from("profiles")
      .select("focused_contest_id")
      .eq("id", user.id)
      .maybeSingle();
    if (error) throw error;
    if (!profile?.focused_contest_id) return undefined;
    const contests = await this.getContests();
    return contests.find((contest) => contest.id === profile.focused_contest_id);
  },

  async setFocusedContest(id: string) {
    if (!isSupabaseConfigured) return MockService.setFocusedContest(id);
    const { error } = await requireSupabase().rpc("set_primary_contest", {
      p_contest_id: id,
      p_weekly_goal_minutes: 600,
    });
    if (error) throw error;
  },

  async getPerformanceStats(): Promise<PerformanceStats> {
    if (!isSupabaseConfigured) return MockService.getPerformanceStats();
    const client = requireSupabase();
    const { data, error } = await client
      .from("user_answers")
      .select("question_id,is_correct,time_spent_seconds,questions(discipline_id)")
      .order("answered_at", { ascending: false })
      .limit(5000);
    if (error) throw error;
    const rows = (data || []) as unknown as Array<{
      question_id: string;
      is_correct: boolean;
      time_spent_seconds: number;
      questions: { discipline_id: string } | null;
    }>;
    const correct = rows.filter((row) => row.is_correct).length;
    const byDiscipline = disciplines.map((discipline) => {
      const matching = rows.filter((row) => row.questions?.discipline_id === discipline.id);
      return {
        disciplineId: discipline.id,
        total: matching.length,
        correct: matching.filter((row) => row.is_correct).length,
      };
    });
    return {
      totalQuestions: rows.length,
      correctAnswers: correct,
      timeSpent: rows.reduce((total, row) => total + row.time_spent_seconds, 0),
      accuracyRate: rows.length ? (correct / rows.length) * 100 : 0,
      byDiscipline,
    };
  },

  async saveResponse(response: UserResponse) {
    if (!isSupabaseConfigured) return MockService.saveResponse(response);
    const { data, error } = await requireSupabase().rpc("answer_question", {
      p_question_id: response.questionId,
      p_selected_option_id: response.selectedOptionId || null,
      p_boolean_answer: response.booleanAnswer ?? null,
      p_time_spent_seconds: response.timeSpent,
    });
    if (error) throw error;
    return data;
  },

  getDemoQuestions() {
    return questions;
  },
};
