import { GlossaryText } from "./GlossaryText";
import { Fragment, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { isStudySourceUrl } from "@/lib/studySourceUrl";
import { dashboardHref } from "@/lib/internalNavigation";
import { StudyPriorityBadges } from "@/components/library/StudyPriorityBadges";
import "./StudyQuestionCompact.css";

export function studyMarkdownHref(value: string): string | null {
  const internal = dashboardHref(value);
  if (
    internal &&
    /^\/dashboard\/(?:library|legal-course)\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(internal) &&
    !value.includes("..") &&
    !value.startsWith("//")
  )
    return internal;
  return isStudySourceUrl(value) ? value : null;
}

/**
 * Minimal, safe Markdown renderer for study materials.
 * Supports: ## / ### headings, paragraphs, bullet and numbered lists (one nested level),
 * pipe tables, blockquotes (callouts), safe study links, **bold**, *italic* and `code`.
 * It builds React nodes directly, so no HTML is ever injected.
 */

function renderInline(
  text: string,
  keyPrefix: string,
  renderText: (text: string) => ReactNode,
): ReactNode[] {
  const out: ReactNode[] = [];
  const pattern = /(\[[^\]\n]+\]\([^\s)]+\)|\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`)/g;
  let last = 0;
  let index = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > last)
      out.push(
        <Fragment key={`${keyPrefix}-plain-${index}`}>
          {renderText(text.slice(last, start))}
        </Fragment>,
      );
    const token = match[0];
    const key = `${keyPrefix}-${index++}`;
    if (token.startsWith("[")) {
      const separator = token.indexOf("](");
      const href = studyMarkdownHref(token.slice(separator + 2, -1));
      out.push(
        href ? (
          href.startsWith("/dashboard/") ? (
            <Link key={key} to={href as never} className="cursor-pointer underline">
              {token.slice(1, separator)}
            </Link>
          ) : (
            <a
              key={key}
              href={href}
              className="cursor-pointer underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {token.slice(1, separator)}
            </a>
          )
        ) : (
          token
        ),
      );
    } else if (token.startsWith("**"))
      out.push(<strong key={key}>{renderText(token.slice(2, -2))}</strong>);
    else if (token.startsWith("`")) out.push(<code key={key}>{token.slice(1, -1)}</code>);
    else out.push(<em key={key}>{renderText(token.slice(1, -1))}</em>);
    last = start + token.length;
  }
  if (last < text.length)
    out.push(<Fragment key={`${keyPrefix}-tail`}>{renderText(text.slice(last))}</Fragment>);
  return out;
}

type Block =
  | { type: "example"; blocks: Block[] }
  | { type: "interactive-question"; prompt: string; answer: string }
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
  const label = text
    .replace(/[*_`]/g, "")
    .replace(/^\s*\d+(?:\.\d+)*[.)-]?\s*/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
  return /^(?:exemplos?\b|casos?\s+(?:\d+|concretos?|praticos?|ilustrativos?)\b|situacao\s+(?:aplicada|hipotetica|pratica|problema)\b|primeira aplicacao\b|aplicacao (?:pratica|na prova)\b|na pratica\b|exercicio resolvido\b)/.test(
    label,
  );
}

/** Identifica blocos de questões e análise para dar hierarquia visual sem alterar o texto. */
function isQuestionStem(text: string): boolean {
  return /^\s*(?:quest[aã]o|quest[aã]o de concurso)\s*\d+\s*[.):—-]?/i.test(text);
}
function isQuestionOptions(text: string): boolean {
  return /(?:^|\s)[A-E][).]\s*\S/.test(text) && /(?:^|\s)[B-E][).]\s*\S/.test(text);
}

/** Uma alternativa pode estar sozinha em seu próprio parágrafo no conteúdo legado. */
function isSingleQuestionOption(text: string): boolean {
  return /^\s*[A-E][).]\s*\S/i.test(text);
}

function cleanQuestionStem(lines: string[]): string {
  // Preserve the complete situation and question; do not discard context
  // preceding the "Questão:" label.
  return lines
    .map((line) => line.replace(/^\s*>\s?/, "").replace(/\*\*/g, "").trim())
    .filter((line) => line && !/🎯?\s*DESAFIO DE PROVA/i.test(line))
    .map((line) => line.replace(/^(Situação|Questão)\s*:\s*/i, (_, label) => label + ": "))
    .join("\n\n")
    .trim();
}
function isAnswerAnalysis(text: string): boolean {
  return /^\s*(?:\*\*)?(?:gabarito|resposta correta|coment[aá]rio|resolu[cç][aã]o comentada|an[aá]lise da quest[aã]o|an[aá]lise das alternativas)\s*[:—-]?/i.test(text) || /^\s*#\s+resolu[cç][aã]o comentada\b/i.test(text);
}
function isAnalysisLabel(text: string): boolean {
  return /^\s*(?:an[aá]lise|racioc[ií]nio|resolu[cç][aã]o comentada|como resolver)\s*[:—-]/i.test(text);
}
function isTipLabel(text: string): boolean {
  return /^\s*(?:dica(?:\s+de\s+prova)?|macete|observa[cç][aã]o)\s*[:—-]/i.test(text);
}
function isWarningLabel(text: string): boolean {
  return /^\s*(?:aten[cç][aã]o|cuidado|pegadinha|erro\s+comum|armadilha)\s*[:—-]/i.test(text);
}
function isHowToAnswerLabel(text: string): boolean {
  return /^\s*(?:como\s+responder|estrat[eé]gia\s+de\s+resolu[cç][aã]o|passo\s+a\s+passo)\s*[:—-]/i.test(text);
}
type QuestionOption = { letter: string; text: string };
function parseQuestionOptions(text: string): { stem: string; options: QuestionOption[] } | null {
  // Materiais legados podem trazer "\n" literal e até a resolução anexada
  // ao fim da alternativa E. Normalize e separe esses trechos antes do parse.
  const normalized = text
    .replace(/\\+n/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\s+(?:gabarito|resolu[cç][aã]o|an[aá]lise das alternativas|coment[aá]rio das alternativas)\s*[:—-].*$/is, "")
    .trim();
  const matcher = /(?:^|\s)([A-E])[).]\s*/g;
  const matches = [...normalized.matchAll(matcher)];
  if (matches.length < 2) return null;
  const first = matches[0]!;
  const stem = normalized.slice(0, first.index ?? 0).trim();
  const options = matches.map((match, index) => {
    const contentStart = (match.index ?? 0) + match[0].length;
    const end = matches[index + 1]?.index ?? normalized.length;
    return { letter: match[1] ?? "", text: normalized.slice(contentStart, end).trim() };
  });
  return options.every((option) => option.text) ? { stem, options } : null;
}

function parseAlternativeFeedback(answer: string): {
  correct: string | null;
  explanation: string;
  alternatives: Record<string, string>;
} {
  const correct = answer.match(/(?:gabarito|resposta correta)\s*[:—-]\s*(?:\*\*)?([A-E])\b/i)?.[1]?.toUpperCase() ?? null;
  const marker = /(?:an[aá]lise|coment[aá]rio|justificativa)s?\s+das?\s+alternativas\s*[:—-]\s*/i.exec(answer);
  const before = marker?.index === undefined ? answer : answer.slice(0, marker.index);
  const explanation = before.replace(/^\s*(?:\*\*)?(?:gabarito|resposta correta)\s*[:—-]\s*(?:\*\*)?[A-E]\s*[.)—-]?\s*(?:\*\*)?/i, "").trim();
  const alternatives: Record<string, string> = {};
  if (marker && marker.index !== undefined) {
    const detailText = answer.slice(marker.index + marker[0].length);
    const matcher = /(?:^|\s)([A-E])[).:]\s*/g;
    const matches = [...detailText.matchAll(matcher)];
    matches.forEach((match, index) => {
      const begin = (match.index ?? 0) + match[0].length;
      const finish = matches[index + 1]?.index ?? detailText.length;
      const rationale = detailText.slice(begin, finish).trim().replace(/[;|]\s*$/, "");
      if (rationale) alternatives[(match[1] ?? "").toUpperCase()] = rationale;
    });
  }
  return { correct, explanation, alternatives };
}

function InteractiveQuestion({
  prompt,
  answer,
  render,
}: {
  prompt: string;
  answer: string;
  render: (text: string, key: string) => ReactNode;
}) {
  const parsed = parseQuestionOptions(prompt);
  const feedback = parseAlternativeFeedback(answer);
  const [selected, setSelected] = useState<string | null>(null);
  if (!parsed) return <>{render(prompt, "question-prompt")}{render(answer, "question-answer")}</>;
  if (!feedback.correct) {
    return (
      <section className="study-interactive-question">
        {parsed.stem && (
          <div className="study-question-stem">
            {parsed.stem.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => (
              <p key={index}>{render(paragraph, "question-stem-" + index)}</p>
            ))}
          </div>
        )}
        <div className="study-question-options-wrap">
          {parsed.options.map((option) => <div className="study-question-option" key={option.letter}><strong className="study-question-option__label">{option.letter}</strong><span>{render(option.text, "option-" + option.letter)}</span></div>)}
        </div>
        <RevealAnswer answer={answer} render={render} />
      </section>
    );
  }
  const answered = selected !== null;
  const isCorrect = answered && selected === feedback.correct;
  return (
    <section className="study-interactive-question" aria-label="Questão interativa">
      {parsed.stem && (
        <div className="study-question-stem">
          {parsed.stem.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => (
            <p key={index}>{render(paragraph, "question-stem-" + index)}</p>
          ))}
        </div>
      )}
      <p className="study-question-instruction">Escolha uma alternativa para conferir sua resposta.</p>
      <div className="study-question-options" role="group" aria-label="Alternativas da questão">
        {parsed.options.map((option) => {
          const isChosen = selected === option.letter;
          const isRight = answered && option.letter === feedback.correct;
          const isWrongChoice = isChosen && !isRight;
          return (
            <button
              type="button"
              key={option.letter}
              className="study-question-option"
              data-selected={isChosen || undefined}
              data-correct={isRight || undefined}
              data-incorrect={isWrongChoice || undefined}
              aria-pressed={isChosen}
              disabled={answered}
              onClick={() => setSelected(option.letter)}
            >
              <strong className="study-question-option__label">{option.letter}</strong>
              <span>{render(option.text, "option-" + option.letter)}</span>
              {isRight && <span className="study-question-option__status" aria-label="Resposta correta">✓</span>}
              {isWrongChoice && <span className="study-question-option__status" aria-label="Resposta selecionada incorreta">×</span>}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="study-question-feedback" role="region" aria-live="polite" aria-label="Correção da questão">
          <div className="study-question-feedback__result" data-correct={isCorrect || undefined} data-incorrect={!isCorrect || undefined}>
            <strong>{isCorrect ? "Você acertou!" : "Ainda não. Vamos entender."}</strong>
            {feedback.correct && <span> Gabarito: alternativa {feedback.correct}.</span>}
          </div>
          {feedback.explanation && <div className="study-question-feedback__general">{render(feedback.explanation, "general-explanation")}</div>}
          <details className="study-question-feedback__details">
            <summary>Ver análise de cada alternativa</summary>
            <div className="study-question-feedback__alternatives">
              {parsed.options.map((option) => {
                const rationale = feedback.alternatives[option.letter];
                return (
                  <div key={option.letter} className="study-question-feedback__alternative" data-correct={option.letter === feedback.correct || undefined}>
                    <strong>{option.letter} · {option.letter === feedback.correct ? "Correta" : "Incorreta"}</strong>
                    {rationale
                      ? <p>{render(rationale, "rationale-" + option.letter)}</p>
                      : <p className="study-question-feedback__missing">A justificativa individual desta alternativa ainda não foi cadastrada neste material.</p>}
                  </div>
                );
              })}
            </div>
          </details>
          <button type="button" className="study-question-feedback__retry" onClick={() => setSelected(null)}>Tentar novamente</button>
        </div>
      )}
    </section>
  );
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
        section.push(next);
        index++;
      }
      result.push({ type: "example", blocks: section });
    } else result.push(block);
  }
  return result;
}

function parse(markdown: string): Block[] {
  // Alguns materiais antigos receberam acidentalmente um trecho do script de
  // manutenção usado para corrigir títulos. Nunca o exiba como conteúdo de estudo.
  let cleaned = markdown
    .replace(/\r\n/g, "\n")
    // Registros antigos gravaram quebras de linha como o texto literal "\n".
    .replace(/\\+n/g, "\n")
    // Linha de "---" sozinha é separador, nunca conteúdo de estudo.
    .replace(/^[ \t]*(?:-{3,}|\*{3,}|_{3,})[ \t]*$/gm, "")
    .replace(/(?:^|\n)[^\n]*(?:trimDanglingNumber|document\.querySelectorAll)[^\n]*(?=\n|$)/gi, "")
    .replace(/\b(?:trimDanglingNumber|sciencesSummary|medicinePanel|heading\.remove\(\))\b[^\n]*/gi, "");
  // Alguns registros trazem o script começando no meio de um parágrafo. Nesse
  // formato não existe uma linha isolada para filtrar: corta-se o material no
  // primeiro marcador inequívoco, preservando somente o conteúdo anterior.
  const leakedScriptAt = cleaned.search(/trimDanglingNumber|document\.querySelectorAll|sciencesSummary|medicinePanel|heading\.remove\(\)|\}\)\(\);/i);
  if (leakedScriptAt >= 0) {
    const lineStart = cleaned.lastIndexOf("\n", leakedScriptAt);
    cleaned = cleaned.slice(0, lineStart >= 0 ? lineStart : 0);
  }
  // O título do material já aparece no cabeçalho: um "# Título" inicial no texto só duplicaria.
  cleaned = cleaned.replace(/^\s*#[ \t]+[^\n]*\n/, "");
  // Extrai desafios legados antes da divisão em parágrafos/blockquote.
  // Isso impede que o gabarito e a análise sejam anexados à alternativa E
  // quando o conteúdo foi salvo inteiro em um único bloco Markdown.
  let extractedChallenge: { prompt: string; answer: string } | null = null;
  const challengeStart = cleaned.search(/🎯?\s*DESAFIO DE PROVA/i);
  if (challengeStart >= 0) {
    const challengeText = cleaned.slice(challengeStart).replace(/^>\s?/gm, "");
    const answerMatch = /(?:^|\s)(?:\*\*)?Gabarito\s*[:—-]\s*(?:\*\*)?([A-E])\b/i.exec(challengeText);
    if (answerMatch && answerMatch.index !== undefined) {
      const answerStart = answerMatch.index + (answerMatch[0].startsWith(" ") ? 1 : 0);
      const nextSection = challengeText.slice(answerStart).search(/\n\s*(?=(?:#{1,3}\s+|\d+\.\s+(?:O que|Como|Por que|Exemplo|Questões|Fontes)\b))/i);
      const answerEnd = nextSection >= 0 ? answerStart + nextSection : challengeText.length;
      const promptText = challengeText.slice(0, answerStart)
        .replace(/^.*?DESAFIO DE PROVA[^\n]*\n?/i, "")
        .replace(/^\s*>\s?/gm, "")
        .trim();
      const answerText = challengeText.slice(answerStart, answerEnd).trim();
      const parsedPrompt = parseQuestionOptions(promptText);
      if (parsedPrompt && parsedPrompt.options.length === 5 &&
          parsedPrompt.options.map((option) => option.letter).join("") === "ABCDE" &&
          parseAlternativeFeedback(answerText).correct) {
        extractedChallenge = { prompt: promptText, answer: answerText };
        const originalStart = challengeStart;
        const originalEnd = originalStart + answerEnd;
        cleaned = cleaned.slice(0, originalStart) +
          "\n__NORTE_INTERACTIVE_CHALLENGE__\n" +
          cleaned.slice(originalEnd);
      }
    }
  }
  const lines = cleaned.split("\n");
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
    } else if (line.startsWith("# ")) {
      // Resoluções de desafios antigos foram gravadas como título, embora contenham o gabarito.
      // Mantê-las como parágrafo permite vinculá-las à questão sem revelar a resposta antes do clique.
      const headingText = line.slice(2).trim();
      if (/^resolu[cç][aã]o comentada\b/i.test(headingText) && /gabarito\s*[:—-]/i.test(headingText)) {
        blocks.push({ type: "p", text: headingText });
      } else {
        // "# Título" no meio do texto vira seção, sem sobrar o "#" como texto.
        blocks.push({ type: "h2", text: headingText });
      }
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
        !/^(#{1,3} |>|\s*([-*]|\d+\.)\s+|\s*\|)/.test(lines[i] ?? "")
      ) {
        paragraph.push((lines[i] ?? "").trim());
        i++;
      }
      const paragraphText = paragraph.join(" ");
      if (paragraphText.trim() === "__NORTE_INTERACTIVE_CHALLENGE__" && extractedChallenge) {
        blocks.push({ type: "interactive-question", prompt: extractedChallenge.prompt, answer: extractedChallenge.answer });
        continue;
      }
      // Conteúdo legado pode conter o script inteiro em uma única linha/parágrafo.
      // Nesse caso, remover apenas uma parte ainda deixaria código visível na página.
      if (
        /document\.querySelectorAll|querySelector\(['"]\.subject-|trimDanglingNumber|sciencesSummary|medicinePanel|heading\.remove\(\)/i.test(
          paragraphText,
        )
      ) {
        continue;
      }
      blocks.push({ type: "p", text: paragraphText });
    }
  }
  return highlightExampleSections(blocks);
}

function splitAnswerAndCommentary(text: string): { prompt: string; answer: string } | null {
  const match = /(?:^|\s|\*\*)(Gabarito|Resposta correta)\s*[:—-]/i.exec(text);
  if (!match || match.index === undefined) return null;
  const prompt = text.slice(0, match.index).trim();
  const answer = text.slice(match.index).trim();
  return prompt && answer ? { prompt, answer } : null;
}

function RevealAnswer({
  answer,
  render,
}: {
  answer: string;
  render: (text: string, key: string) => ReactNode;
}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <section className="study-answer-reveal" aria-label="Resposta e comentário">
      <button
        type="button"
        className="study-answer-reveal__trigger"
        aria-expanded={revealed}
        onClick={() => setRevealed((value) => !value)}
      >
        <span className="study-answer-reveal__icon" aria-hidden="true">{revealed ? "−" : "?"}</span>
        <span>{revealed ? "Ocultar resposta e comentário" : "Revelar gabarito e comentário"}</span>
        <span className="study-answer-reveal__chevron" aria-hidden="true">{revealed ? "⌃" : "⌄"}</span>
      </button>
      {revealed && (
        <div className="study-answer-reveal__content" role="region" aria-label="Gabarito e comentário">
          {render(answer, "revealed-answer")}
        </div>
      )}
    </section>
  );
}

function renderBlocks(
  blocks: Block[],
  renderText: (text: string) => ReactNode,
  priority?: { discipline: string; contestName: string },
): ReactNode[] {
  const inline = (text: string, key: string) => renderInline(text, key, renderText);
  const prepared: Block[] = [];
  const consumedAnswers = new Set<number>();
  for (let index = 0; index < blocks.length; index++) {
    if (consumedAnswers.has(index)) continue;
    const current = blocks[index]!;

    // Desafios legados podem estar inteiramente dentro de um blockquote.
    // Aceita tanto "Questão:" quanto "Pergunta:" e separa enunciado,
    // alternativas e gabarito antes de renderizar os botões.
    if (
      current.type === "quote" &&
      (parseQuestionOptions(current.lines.join("\n")) !== null ||
        (/desafio de prova/i.test(current.lines.join(" ")) &&
          current.lines.some((line) => /(?:quest[aã]o|pergunta)\s*:/i.test(line.replace(/\*/g, "")))))
    ) {
      const quoteText = current.lines.join("\n");
      const quoteParts = splitAnswerAndCommentary(quoteText);
      const quotePrompt = quoteParts?.prompt ?? quoteText;
      const embeddedOptions = parseQuestionOptions(quotePrompt);
      const optionBlocks: { index: number; text: string }[] = [];
      let cursor = index + 1;
      let prompt = "";
      let inlineOptionAnswer: string | null = null;

      if (embeddedOptions) {
        // Quando enunciado e alternativas vierem no mesmo destaque,
        // o parser separa tudo sem deixar a alternativa E colada ao gabarito.
        prompt = quotePrompt;
      } else {
        const stem = cleanQuestionStem(current.lines);
        while (cursor < blocks.length) {
          const candidate = blocks[cursor]!;
          if (candidate.type !== "p" || !isSingleQuestionOption(candidate.text)) break;
          optionBlocks.push({ index: cursor, text: candidate.text.trim() });
          cursor++;
        }
        const combinedOptions = optionBlocks.map((item) => item.text).join(" ");
        const separatedOptions = splitAnswerAndCommentary(combinedOptions);
        const cleanOptions = separatedOptions?.prompt ?? combinedOptions;
        inlineOptionAnswer = separatedOptions?.answer ?? null;
        if (optionBlocks.length >= 2 && parseQuestionOptions(cleanOptions)) {
          prompt = stem + "\n\n" + cleanOptions;
        }
      }

      if (prompt && parseQuestionOptions(prompt)) {
        const answerParts: string[] = quoteParts?.answer
          ? [quoteParts.answer]
          : inlineOptionAnswer
            ? [inlineOptionAnswer]
            : [];
        let answerIndex = -1;
        if (!answerParts.length) {
          for (let candidate = cursor; candidate < blocks.length; candidate++) {
            const next = blocks[candidate]!;
            if ((next.type === "p" || next.type === "h2" || next.type === "h3") && isAnswerAnalysis(next.text)) {
              answerIndex = candidate;
              break;
            }
            if (next.type === "h2" || next.type === "h3") break;
          }
        }

        if (answerIndex >= 0) {
          const answerBlock = blocks[answerIndex]!;
          if (answerBlock.type === "p" || answerBlock.type === "h2" || answerBlock.type === "h3") {
            answerParts.push(answerBlock.text);
            let answerEndIndex = answerIndex;
            while (answerEndIndex + 1 < blocks.length) {
              const following = blocks[answerEndIndex + 1]!;
              if (following.type !== "p" || !isAnswerAnalysis(following.text)) break;
              answerParts.push(following.text);
              answerEndIndex++;
            }
            for (let consumed = answerIndex; consumed <= answerEndIndex; consumed++) {
              consumedAnswers.add(consumed);
            }
          }
        }

        if (answerParts.length) {
          prepared.push({
            type: "interactive-question",
            prompt,
            answer: answerParts.join(" "),
          });
          for (const item of optionBlocks) consumedAnswers.add(item.index);
          continue;
        }
      }
    }

    if (current.type === "p" && isQuestionOptions(current.text)) {
      // Quando o material legado gravou o gabarito no mesmo parágrafo da
      // alternativa E, separe-o antes de criar a questão interativa.
      const inlineAnswer = splitAnswerAndCommentary(current.text);
      if (inlineAnswer && parseQuestionOptions(inlineAnswer.prompt)) {
        prepared.push({
          type: "interactive-question",
          prompt: inlineAnswer.prompt,
          answer: inlineAnswer.answer,
        });
        continue;
      }
      let answerIndex = -1;
      for (let candidate = index + 1; candidate < blocks.length; candidate++) {
        const next = blocks[candidate]!;
        if (
          (next.type === "p" && isQuestionOptions(next.text)) ||
          (next.type === "quote" && isQuestionOptions(next.lines.join("\\n")))
        ) break;
        if ((next.type === "p" || next.type === "h2" || next.type === "h3") && isAnswerAnalysis(next.text)) {
          answerIndex = candidate;
          break;
        }
      }
      if (answerIndex >= 0) {
        const answerBlock = blocks[answerIndex]!;
        if (answerBlock.type === "p" || answerBlock.type === "h2" || answerBlock.type === "h3") {
          // Gabarito e análise podem ter sido gravados em parágrafos separados.
          // Reúna todos os blocos de correção em um único feedback da questão.
          const answerParts = [answerBlock.text];
          let answerEndIndex = answerIndex;
          while (answerEndIndex + 1 < blocks.length) {
            const following = blocks[answerEndIndex + 1]!;
            if (following.type !== "p" || !isAnswerAnalysis(following.text)) break;
            answerParts.push(following.text);
            answerEndIndex++;
          }
          prepared.push({
            type: "interactive-question",
            prompt: current.text,
            answer: answerParts.join(" "),
          });
          for (let consumed = answerIndex; consumed <= answerEndIndex; consumed++) {
            consumedAnswers.add(consumed);
          }
          continue;
        }
      }
    }
    prepared.push(current);
  }
  return prepared.map((block, index) => {
    const key = `b${index}`;
    switch (block.type) {
      case "interactive-question":
        return <InteractiveQuestion key={key} prompt={block.prompt} answer={block.answer} render={inline} />;
      case "example":
        return (
          <section key={key} className="study-example" aria-label="Exemplo aplicado">
            {renderBlocks(block.blocks, renderText, priority)}
          </section>
        );
      case "h2":
      case "h3": {
        const Heading = block.type;
        return (
          <Fragment key={key}>
            <Heading>{inline(block.text, key)}</Heading>
            {priority && (
              <StudyPriorityBadges
                contestName={priority.contestName}
                discipline={priority.discipline}
                topic={block.text}
                className="mb-2"
              />
            )}
          </Fragment>
        );
      }
      case "p": {
        if (isAnswerAnalysis(block.text)) {
          return <RevealAnswer key={key} answer={block.text} render={inline} />;
        }
        const answerParts = splitAnswerAndCommentary(block.text);
        if (answerParts) {
          if (isQuestionOptions(answerParts.prompt)) {
            return <InteractiveQuestion key={key} prompt={answerParts.prompt} answer={answerParts.answer} render={inline} />;
          }
          return (
            <Fragment key={key}>
              <p className="study-question-stem">{inline(answerParts.prompt, key)}</p>
              <RevealAnswer answer={answerParts.answer} render={inline} />
            </Fragment>
          );
        }
        if (isQuestionOptions(block.text)) {
          const parsed = parseQuestionOptions(block.text);
          if (parsed) return <div key={key} className="study-question-options-wrap">{parsed.options.map((option) => <div className="study-question-option" key={option.letter}><strong className="study-question-option__label">{option.letter}</strong><span>{inline(option.text, key + "-option-" + option.letter)}</span></div>)}</div>;
        }
        const className = isQuestionStem(block.text)
          ? "study-question-stem"
          : isAnswerAnalysis(block.text)
            ? "study-answer-analysis"
            : isHowToAnswerLabel(block.text)
              ? "study-how-to-answer"
              : isWarningLabel(block.text)
                ? "study-warning"
                : isTipLabel(block.text)
                  ? "study-tip"
                  : isAnalysisLabel(block.text)
                    ? "study-analysis-note"
                    : isExampleLabel(block.text)
                      ? "study-example"
                      : undefined;
        return <p key={key} className={className}>{inline(block.text, key)}</p>;
      }
      case "quote": {
        const quoteText = block.lines.join("\\n");
        const answerParts = splitAnswerAndCommentary(quoteText);
        if (answerParts && isQuestionOptions(answerParts.prompt)) {
          return <InteractiveQuestion key={key} prompt={answerParts.prompt} answer={answerParts.answer} render={inline} />;
        }
        return (
          <blockquote
            key={key}
            className={isExampleLabel(block.lines[0] ?? "") ? "study-example" : undefined}
          >
            {block.lines.map((line, n) => (
              <p key={`${key}-${n}`}>{inline(line, `${key}-${n}`)}</p>
            ))}
          </blockquote>
        );
      }
      case "ul":
      case "ol": {
        const List = block.type === "ol" ? "ol" : "ul";
        return (
          <List key={key}>
            {block.items.map((item, n) => (
              <li
                key={`${key}-${n}`}
                className={isExampleLabel(item.text) ? "study-example" : undefined}
              >
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
                    <th
                      key={`${key}-h${n}`}
                      className={isExampleLabel(cell) ? "study-example-cell" : undefined}
                    >
                      {inline(cell, `${key}-h${n}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={`${key}-r${r}`}>
                    {row.map((cell, n) => (
                      <td
                        key={`${key}-r${r}c${n}`}
                        className={
                          isExampleLabel(block.header[n] ?? "") ? "study-example-cell" : undefined
                        }
                      >
                        {inline(cell, `${key}-r${r}c${n}`)}
                      </td>
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

export function Markdown({
  source,
  discipline,
  contestName,
  renderText = (text) => <GlossaryText text={text} />,
}: {
  source: string;
  discipline?: string;
  contestName?: string | null;
  renderText?: ((text: string) => ReactNode) | undefined;
}) {
  const rendered = renderBlocks(
    parse(source),
    renderText,
    discipline && contestName ? { discipline, contestName } : undefined,
  );
  return <div className="study-prose">{rendered}</div>;
}
