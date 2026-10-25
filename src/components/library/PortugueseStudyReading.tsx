import { useId, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Markdown } from "./Markdown";

/** The original Markdown stays intact within each topic, including tables and source links. */
export function portugueseSections(source: string) {
  const sections: { title: string; body: string }[] = [];
  for (const part of source.replace(/\r\n/g, "\n").split(/(?=^## )/m)) {
    if (!part.trim()) continue;
    const heading = /^## (.+)\n?/.exec(part);
    sections.push({
      title: heading?.[1]?.trim() ?? "Apresentação",
      body: heading ? part.slice(heading[0].length).trim() : part.trim(),
    });
  }
  return sections;
}

export function PortugueseStudyReading({
  source,
  renderSection = (body) => <Markdown source={body} />,
}: {
  source: string;
  renderSection?: (body: string) => ReactNode;
}) {
  const prefix = useId();
  const sections = portugueseSections(source);
  return (
    <div className="portuguese-reader">
      <nav className="portuguese-reader__index" aria-label="Assuntos deste material">
        <h2>O que estudar neste material</h2>
        <p>Escolha um assunto. Cada bloco reúne os conceitos e suas aplicações.</p>
        <ol>
          {sections.map((section, index) => (
            <li key={index}>
              <a
                href={`#${prefix}-${index}`}
                onClick={() => {
                  const target = document.getElementById(`${prefix}-${index}`);
                  if (target instanceof HTMLDetailsElement) target.open = true;
                }}
              >
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      {sections.map((section, index) => (
        <details
          key={index}
          id={`${prefix}-${index}`}
          open={index === 0}
          className="portuguese-reader__topic"
        >
          <summary>
            <span className="portuguese-reader__number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2>{section.title}</h2>
            <ChevronDown size={18} aria-hidden="true" />
          </summary>
          <div className="portuguese-reader__body">{renderSection(section.body)}</div>
        </details>
      ))}
    </div>
  );
}
