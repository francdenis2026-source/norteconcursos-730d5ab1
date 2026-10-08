import { Fragment, type ReactNode } from "react";
import { isStudySourceUrl } from "@/lib/studySourceUrl";

export function studyMarkdownHref(value: string): string | null {
  if (/^\/dashboard\/(?:library|legal-course)\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) return value;
  return isStudySourceUrl(value) ? value : null;
}

/**
 * Minimal, safe Markdown renderer for study materials.
 * Supports: ## / ### headings, paragraphs, bullet and numbered lists (one nested level),
 * pipe tables, blockquotes (callouts), safe study links, **bold**, *italic* and `code`.
 * It builds React nodes directly, so no HTML is ever injected.
 */

function inline(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  const pattern = /(\[[^\]\n]+\]\([^\s)]+\)|\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`)/g;
  let last = 0;
  let index = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > last) out.push(text.slice(last, start));
    const token = match[0];
    const key = `${keyPrefix}-${index++}`;
    if (token.startsWith("[")) {
      const separator = token.indexOf("](");
      const href = studyMarkdownHref(token.slice(separator + 2, -1));
      out.push(href ? <a key={key} href={href} className="cursor-pointer underline" {...(href.startsWith("https:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{token.slice(1, separator)}</a> : token);
    } else if (token.startsWith("**")) out.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    else if (token.startsWith("`")) out.push(<code key={key}>{token.slice(1, -1)}</code>);
    else out.push(<em key={key}>{token.slice(1, -1)}</em>);
    last = start + token.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

type Block =
  | { type: "example"; blocks: Block[] }
  | { type: "h2" | "h3" | "p"; text: string }
  | { type: "quote"; lines: string[] }
  | { type: "ul" | "ol"; items: { text: string; children: string[] }[] }
  | { type: "table"; header: string[]; rows: string[][] };

const cells = (line: string) =>
  line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());

/** Explicit pedagogical labels only: mentions inside a legal provision stay neutral. */
function isExampleLabel(text: string): boolean {
  const label = text.replace(/[*_`]/g, "").replace(/^\s*\d+(?:\.\d+)*[.)-]?\s*/, "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  return /^(?:exemplos?\b|casos?\s+(?:\d+|concretos?|praticos?|ilustrativos?)\b|situacao\s+(?:aplicada|hipotetica|pratica|problema)\b|primeira aplicacao\b|aplicacao (?:pratica|na prova)\b|na pratica\b|exercicio resolvido\b)/.test(label);
}

function highlightExampleSections(blocks: Block[]): Block[] {
  const result: Block[] = [];
  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index]!;
    if ((block.type === "h2" || block.type === "h3") && isExampleLabel(block.text)) {
      const section: Block[] = [block];
      while (index + 1 < blocks.length) {
        const next = blocks[index + 1]!;
        if (next.type === "h2" || (block.type === "h3" && next.type === "h3")) break;
        section.push(next); index++;
      }
      result.push({type: "example", blocks: section});
    } else result.push(block);
  }
  return result;
}

function parse(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i] ?? "";
    if (!line.trim()) {
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4).trim() });
      i++;
    } else if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3).trim() });
      i++;
    } else if (line.startsWith(">")) {
      const quote: string[] = [];
      while (i < lines.length && (lines[i] ?? "").startsWith(">")) {
        quote.push((lines[i] ?? "").replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ type: "quote", lines: quote });
    } else if (line.trim().startsWith("|") && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1] ?? "")) {
      const header = cells(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && (lines[i] ?? "").trim().startsWith("|")) {
        rows.push(cells(lines[i] ?? ""));
        i++;
      }
      blocks.push({ type: "table", header, rows });
    } else if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
      const ordered = /^\s*\d+\.\s+/.test(line);
      const items: { text: string; children: string[] }[] = [];
      while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i] ?? "")) {
        const current = lines[i] ?? "";
        const nested = /^\s{2,}/.test(current);
        const text = current.replace(/^\s*([-*]|\d+\.)\s+/, "");
        if (nested && items.length) items[items.length - 1]?.children.push(text);
        else items.push({ text, children: [] });
        i++;
      }
      blocks.push({ type: ordered ? "ol" : "ul", items });
    } else {
      const paragraph: string[] = [];
      while (
        i < lines.length &&
        (lines[i] ?? "").trim() &&
        !/^(#{2,3} |>|\s*([-*]|\d+\.)\s+|\s*\|)/.test(lines[i] ?? "")
      ) {
        paragraph.push((lines[i] ?? "").trim());
        i++;
      }
      blocks.push({ type: "p", text: paragraph.join(" ") });
    }
  }
  return highlightExampleSections(blocks);
}

function renderBlocks(blocks: Block[]): ReactNode[] {
  return blocks.map((block, index) => {
        const key = `b${index}`;
        switch (block.type) {
          case "example":
            return <section key={key} className="study-example" aria-label="Exemplo aplicado">{renderBlocks(block.blocks)}</section>;
          case "h2":
            return <h2 key={key}>{inline(block.text, key)}</h2>;
          case "h3":
            return <h3 key={key}>{inline(block.text, key)}</h3>;
          case "p":
            return <p key={key} className={isExampleLabel(block.text) ? "study-example" : undefined}>{inline(block.text, key)}</p>;
          case "quote":
            return (
              <blockquote key={key} className={isExampleLabel(block.lines[0] ?? "") ? "study-example" : undefined}>
                {block.lines.map((line, n) => (
                  <p key={`${key}-${n}`}>{inline(line, `${key}-${n}`)}</p>
                ))}
              </blockquote>
            );
          case "ul":
          case "ol": {
            const List = block.type === "ol" ? "ol" : "ul";
            return (
              <List key={key}>
                {block.items.map((item, n) => (
                  <li key={`${key}-${n}`} className={isExampleLabel(item.text) ? "study-example" : undefined}>
                    {inline(item.text, `${key}-${n}`)}
                    {item.children.length > 0 && (
                      <ul>
                        {item.children.map((child, c) => (
                          <li key={`${key}-${n}-${c}`}>{inline(child, `${key}-${n}-${c}`)}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </List>
            );
          }
          case "table":
            return (
              <div className="study-table" key={key} tabIndex={0} role="region" aria-label="Tabela">
                <table>
                  <thead>
                    <tr>
                      {block.header.map((cell, n) => (
                        <th key={`${key}-h${n}`} className={isExampleLabel(cell) ? "study-example-cell" : undefined}>{inline(cell, `${key}-h${n}`)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={`${key}-r${r}`}>
                        {row.map((cell, n) => (
                          <td key={`${key}-r${r}c${n}`} className={isExampleLabel(block.header[n] ?? "") ? "study-example-cell" : undefined}>{inline(cell, `${key}-r${r}c${n}`)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return <Fragment key={key} />;
        }
      });
}

export function Markdown({ source }: { source: string }) {
  return <div className="study-prose">{renderBlocks(parse(source))}</div>;
}
