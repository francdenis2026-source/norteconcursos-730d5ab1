import { createContext, useContext } from "react";
import { Link } from "@tanstack/react-router";
import { splitRefs, type RefIndex } from "@/lib/legalRefs";

const Ctx = createContext<{ slug: string; index: RefIndex | null } | null>(null);
export const LegalRefProvider = Ctx.Provider;

/** Texto com citações de artigo viradas em link para o ponto exato (artigo e parágrafo) da lei citada. */
export function LegalRefText({ text }: { text: string }) {
  const ctx = useContext(Ctx);
  if (!ctx?.index) return <>{text}</>;
  return (
    <>
      {splitRefs(text, ctx.slug, ctx.index).map((p, i) =>
        p.href ? (
          <Link key={i} to="/dashboard/legal-course/$slug" params={{ slug: p.href.slug }}
            search={{ art: p.href.art, ...(p.href.par ? { par: p.href.par } : {}) } as never}
            title="Abrir este dispositivo" className="font-semibold text-indigo-700 underline decoration-dotted underline-offset-2 hover:decoration-solid dark:text-indigo-300">
            {p.text}
          </Link>
        ) : (
          p.text
        ),
      )}
    </>
  );
}
