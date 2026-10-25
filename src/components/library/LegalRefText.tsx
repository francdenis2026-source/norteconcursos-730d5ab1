import { createContext, useContext } from "react";
import { Link } from "@tanstack/react-router";
import { splitRefs, type RefIndex } from "@/lib/legalRefs";
import { GlossaryText } from "./GlossaryText";

const Ctx = createContext<{ slug: string; index: RefIndex | null } | null>(null);
export const LegalRefProvider = Ctx.Provider;

/** Texto com citações de artigo viradas em link para o ponto exato (artigo e parágrafo) da lei citada. */
export function LegalRefText({ text }: { text: string }) {
  const ctx = useContext(Ctx);
  if (!ctx?.index) return <GlossaryText text={text} />;
  return (
    <>
      {splitRefs(text, ctx.slug, ctx.index).map((p, i) =>
        p.href ? (
          <Link key={i} to="/dashboard/legal-course/$slug" params={{ slug: p.href.slug }}
            search={{ art: p.href.art, ...(p.href.par ? { par: p.href.par } : {}) } as never}
            className="font-semibold text-amber-700 underline decoration-dotted underline-offset-2 hover:decoration-solid dark:text-amber-300">
            {p.text}
          </Link>
        ) : (
          <ReferenceText key={i} text={p.text} />
        ),
      )}
    </>
  );
}

function ReferenceText({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s)]+)/g);
  return <>{parts.map((part, index) => /^https?:\/\//.test(part)
    ? <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-md border border-current/20 px-1.5 py-0.5 font-semibold text-amber-700 underline-offset-2 hover:underline dark:text-amber-300" aria-label="Abrir fonte oficial">Fonte oficial ↗</a>
    : <GlossaryText key={index} text={part} />)}</>;
}
