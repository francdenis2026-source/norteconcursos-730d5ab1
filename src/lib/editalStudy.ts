import type { Track } from "@/data/tracks/types";
import { buildTheoryIndex, findTheory, disciplinesMatch } from "./cronogramaTeoria";

/** Lesson suggestions must match both the discipline and enough of the topic. */
export function editalLessonLinks(discipline: string, topic: string, tracks: Track[]) {
  const related = tracks.filter((track) => disciplinesMatch(discipline, track.discipline));
  const docs = related.flatMap((track) =>
    track.lessons.map((lesson) => ({
      slug: `${track.slug}::${lesson.id}`,
      discipline: track.discipline,
      title: lesson.title,
      topic_label: lesson.edital,
    })),
  );
  const lessons = findTheory(buildTheoryIndex(docs, []), discipline, topic, 4).map((hit) => {
    const [track, lesson] = hit.id.split("::");
    return { track: track!, lesson: lesson!, title: hit.label };
  });
  return { lessons, tracks: related.map((track) => ({ slug: track.slug, title: track.title })) };
}
