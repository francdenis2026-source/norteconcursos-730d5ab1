import { ENEM_AREAS, ENEM_VIDEO_SUBJECTS } from "@/data/enem";
import { canonicalSubject } from "./subjects";
import type { SimulatorFilters } from "./simulatorFilters";
import type { TopicVideo } from "@/data/topicVideos";

const fold = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
const subjects = new Map(
  ENEM_AREAS.flatMap((area) =>
    area.subjects.map((subject) => [fold(subject.name), area.id] as const),
  ),
);
for (const [name, area] of [
  ["Língua Inglesa", "linguagens"],
  ["Espanhol", "linguagens"],
  ["Língua Espanhola", "linguagens"],
  ["Artes", "linguagens"],
  ["Educação Física", "linguagens"],
  ["Artes e Educação Física", "linguagens"],
  ["Filosofia", "humanas"],
  ["Sociologia", "humanas"],
])
  subjects.set(fold(name!), area!);

export function enemQuestionArea(subject: string) {
  return subjects.get(fold(canonicalSubject(subject))) ?? null;
}
export function enemSimulatorCatalog<T extends { contest: string; subject: string }>(
  catalog: T[],
  area = "all",
) {
  return catalog.filter(
    (q) =>
      fold(q.contest) === "enem" &&
      enemQuestionArea(q.subject) !== null &&
      (area === "all" || enemQuestionArea(q.subject) === area),
  );
}
export function enemSimulatorFilters(filters: SimulatorFilters): SimulatorFilters {
  return {
    ...filters,
    contest: "ENEM",
    board: "all",
    career: "all",
    state: "all",
    category: "all",
  };
}
/** An absent subject never borrows videos from another subject. */
export function enemVideoSelection(
  topicVideos: Record<string, Record<string, TopicVideo[]>>,
  subject: string,
  topic = "all",
) {
  const current = ENEM_VIDEO_SUBJECTS.find((s) => s.name === subject);
  const byTopic = current ? (topicVideos[current.key] ?? {}) : {};
  const topics = Object.keys(byTopic).filter((key) => key !== "*" && byTopic[key]!.length > 0);
  const videos = topic === "all" ? Object.values(byTopic).flat() : (byTopic[topic] ?? []);
  return {
    current,
    topics,
    videos: [...new Map(videos.map((video) => [video.id, video])).values()],
  };
}
