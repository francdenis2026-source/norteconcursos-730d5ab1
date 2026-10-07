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
  return blocks;
}

export function Markdown({ source }: { source: string }) {
  const blocks = parse(source);
  return (
    <div className="study-prose">
      {blocks.map((block, index) => {
        const key = `b${index}`;
        switch (block.type) {
          case "h2":
            return <h2 key={key}>{inline(block.text, key)}</h2>;
          case "h3":
            return <h3 key={key}>{inline(block.text, key)}</h3>;
          case "p":
            return <p key={key}>{inline(block.text, key)}</p>;
          case "quote":
            return (
              <blockquote key={key}>
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
                  <li key={`${key}-${n}`}>
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
                        <th key={`${key}-h${n}`}>{inline(cell, `${key}-h${n}`)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={`${key}-r${r}`}>
                        {row.map((cell, n) => (
                          <td key={`${key}-r${r}c${n}`}>{inline(cell, `${key}-r${r}c${n}`)}</td>
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
      })}
    </div>
  );
}
