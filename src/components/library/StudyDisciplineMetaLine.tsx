import { studyDisciplineMetaFor } from "@/lib/studyPriority";

export function StudyDisciplineMetaLine({
  contestName,
  discipline,
}: {
  contestName?: string | null;
  discipline: string;
}) {
  const meta = studyDisciplineMetaFor(contestName, discipline);
  if (!meta) return null;

  const blockText =
    meta.block === "Conhecimentos Específicos"
      ? `${meta.blockQuestions} questões no bloco · peso ${meta.blockWeight} · ${meta.blockPoints} pontos no bloco`
      : `${meta.questions} questões na disciplina · peso ${meta.weight} · ${meta.points} pontos`;

  return (
    <div
      className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium leading-5 text-white/85"
      aria-label={`${meta.block}. ${blockText}. Tempo recomendado: ${meta.timePercent}% do tempo de estudo.`}
    >
      <span className="rounded-md border border-white/25 bg-black/15 px-2 py-0.5">
        {meta.block}
      </span>
      <span>{blockText}</span>
      <span className="text-white/70">·</span>
      <span>Tempo recomendado: {meta.timePercent}%</span>
    </div>
  );
}
