import { supabase } from "@/integrations/supabase/client";
import type { RadarEdition, RadarQuestion, RadarTopic } from "./editalRadar";

// Carregamento compartilhado para o Raio-X dos editais e o Panorama das provas: ambos cruzam
// questões oficiais ativas com o edital (syllabus_topics/syllabus_editions) usando analyzeEditals().

const PAGE = 1000;

export interface RadarData {
  questions: RadarQuestion[];
  topics: RadarTopic[];
  editions: RadarEdition[];
}

export async function loadRadarData(): Promise<RadarData> {
  const questions: RadarQuestion[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from("official_exam_questions")
      .select("contest_name,career_name,exam_board,exam_year,subject,syllabus_topic_id")
      .eq("content_status", "active")
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw error;
    for (const row of data ?? [])
      questions.push({
        contest: row.contest_name,
        career: row.career_name,
        board: row.exam_board,
        year: row.exam_year,
        subject: row.subject,
        topicId: row.syllabus_topic_id,
      });
    if ((data ?? []).length < PAGE) break;
  }
  const editionsResult = await supabase
    .from("syllabus_editions")
    .select("id,contest_name,role_name,contest_year,exam_board");
  if (editionsResult.error) throw editionsResult.error;
  const editions: RadarEdition[] = (editionsResult.data ?? []).map((row) => ({
    id: row.id,
    contest: row.contest_name,
    role: row.role_name,
    year: row.contest_year,
    board: row.exam_board,
  }));
  const topics: RadarTopic[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from("syllabus_topics")
      .select("id,edition_id,discipline,topic_text")
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw error;
    for (const row of data ?? [])
      topics.push({
        id: row.id,
        editionId: row.edition_id,
        discipline: row.discipline,
        text: row.topic_text,
      });
    if ((data ?? []).length < PAGE) break;
  }
  return { questions, topics, editions };
}
