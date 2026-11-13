import { SubjectIcon } from "@/components/ui/subject-icon";

const selectCls = "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm font-medium";

/** Seletor único de disciplina e assunto da Sala de estudo (usado também pelo cronômetro e pelos atalhos). */
export function StudySubjectPicker({
  subjects,
  suggested,
  subject,
  topic,
  topics,
  onChange,
}: {
  subjects: string[];
  suggested: string;
  subject: string;
  topic: string;
  topics: string[];
  onChange: (next: { subject: string; topic: string }) => void;
}) {
  return (
    <section aria-label="O que você vai estudar" className="grid gap-3 md:grid-cols-[1fr_1.4fr] md:items-end">
      <label className="block space-y-1.5">
        <span className="text-sm font-medium">Disciplina</span>
        <select className={selectCls} value={subject} onChange={(e) => onChange({ subject: e.target.value, topic: "" })}>
          {subjects.map((name) => (
            <option key={name} value={name}>
              {name === suggested ? `${name} · prioridade` : name}
            </option>
          ))}
        </select>
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm font-medium">Assunto</span>
        <select className={selectCls} value={topic} onChange={(e) => onChange({ subject, topic: e.target.value })}>
          {topics.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
      {subject && (
        <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground md:col-span-2">
          <SubjectIcon subject={subject} />
          <span className="font-medium text-foreground">{subject}</span>
          {topic && <><span aria-hidden="true">·</span><span>{topic}</span></>}
        </p>
      )}
    </section>
  );
}
