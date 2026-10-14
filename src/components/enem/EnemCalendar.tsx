import * as React from "react";
import { CalendarDays, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const source =
  "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/orientacoes/cronograma";
const exams = [
  {
    date: "2026-11-08",
    end: "20261109",
    title: "1º dia",
    subjects: "Linguagens, Ciências Humanas e Redação",
  },
  {
    date: "2026-11-15",
    end: "20261116",
    title: "2º dia",
    subjects: "Ciências da Natureza e Matemática",
  },
];

function todayKey() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  return ["year", "month", "day"]
    .map((part) => parts.find((p) => p.type === part)!.value)
    .join("-");
}

function saveDates() {
  const foldLine = (line: string) => {
    let result = "",
      width = 0;
    for (const character of line) {
      const size = new TextEncoder().encode(character).length;
      if (width + size > 75) {
        result += "\r\n ";
        width = 1;
      }
      result += character;
      width += size;
    }
    return result;
  };
  // All-day reminders: the actual time and venue must be checked on the participant's card.
  const text = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Norte Concursos//ENEM//PT-BR",
    "CALSCALE:GREGORIAN",
    ...exams.flatMap((exam, index) => [
      "BEGIN:VEVENT",
      `UID:enem-2026-day-${index + 1}@norteconcursos.xyz`,
      "DTSTAMP:20261014T000000Z",
      `DTSTART;VALUE=DATE:${exam.date.replaceAll("-", "")}`,
      `DTEND;VALUE=DATE:${exam.end}`,
      `SUMMARY:ENEM 2026 — ${exam.title}`,
      `DESCRIPTION:${exam.subjects.replaceAll(",", "\\,")}. Confira horário e local na Página do Participante.`,
      `URL:${source}`,
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      "TRIGGER:-P1D",
      "DESCRIPTION:Prova do ENEM amanhã",
      "END:VALARM",
      "END:VEVENT",
    ]),
    "END:VCALENDAR",
    "",
  ]
    .map(foldLine)
    .join("\r\n");
  const url = URL.createObjectURL(new Blob([text], { type: "text/calendar;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "enem-2026.ics";
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function EnemCalendar() {
  const [today, setToday] = React.useState<string | null>(null);
  React.useEffect(() => {
    const refresh = () => setToday(todayKey());
    refresh();
    const interval = window.setInterval(refresh, 60_000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);
  return (
    <section
      aria-labelledby="enem-calendar-title"
      className="rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-500/10 to-violet-500/10 p-4 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="enem-calendar-title" className="flex items-center gap-2 text-xl font-bold">
          <CalendarDays className="h-5 w-5 text-sky-600 dark:text-sky-400" /> Programe-se para o
          Enem 2026
        </h2>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          Datas oficiais — Inep
        </span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {exams.map((exam) => {
          const days = today
            ? Math.round((Date.parse(exam.date) - Date.parse(today)) / 86_400_000)
            : null;
          return (
            <article key={exam.date} className="rounded-xl border bg-card p-4">
              <p className="text-sm font-semibold text-muted-foreground">{exam.title} · domingo</p>
              <time dateTime={exam.date} className="mt-1 block text-2xl font-black">
                {exam.date === "2026-11-08" ? "8" : "15"} de novembro de 2026
              </time>
              <p className="mt-2 text-sm">{exam.subjects}</p>
              {days !== null && (
                <p className="mt-3 text-sm font-bold text-sky-700 dark:text-sky-300">
                  {days < 0
                    ? "Data já passou"
                    : days === 0
                      ? "A prova é hoje"
                      : days === 1
                        ? "Falta 1 dia"
                        : `Faltam ${days} dias`}
                </p>
              )}
            </article>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Confira seu local, horário e eventuais orientações específicas na Página do Participante. O
        lembrete salva as datas; não informa o horário de entrada.
      </p>
      {today && today > exams[1]!.date && (
        <p className="mt-2 text-sm font-semibold">
          Estas datas são da edição de 2026. Para a próxima edição, acompanhe o novo cronograma do
          Inep.
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="outline" onClick={saveDates}>
          <Download className="mr-2 h-4 w-4" /> Salvar no meu calendário
        </Button>
        <Button asChild variant="outline">
          <a href={source} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" /> Calendário oficial do Inep
          </a>
        </Button>
        <Button asChild variant="outline">
          <a
            href="https://enem.inep.gov.br/participante/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Página do Participante
          </a>
        </Button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Fonte conferida em 14/10/2026. Contagem em dias pelo horário de Brasília. As datas de cada
        edição dependem da divulgação oficial do Inep.
      </p>
    </section>
  );
}
