import { PoliceInsignia } from "@/components/brand/PoliceInsignia";
import { Link, useRouter } from "@tanstack/react-router";
import * as Tabs from "@radix-ui/react-tabs";
import { ArrowLeft, ArrowRight, ArrowUpRight, Home, Printer, ShieldCheck } from "lucide-react";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { NorteBrand } from "@/components/brand/NorteBrand";
import "@/styles/institutional-window.css";

const PAGES = [
  ["/sobre", "Nossa história"],
  ["/privacy", "Privacidade"],
  ["/terms", "Termos de uso"],
  ["/suporte", "Suporte"],
] as const;

export function InstitutionalWindow({
  page,
  title,
  description,
  image,
  updatedAt,
  children,
}: {
  page: (typeof PAGES)[number][0];
  title: string;
  description: string;
  image: string;
  updatedAt?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.history.back();
    else void router.navigate({ to: "/" });
  };
  return (
    <div
      className={`institutional-window iw-${page.slice(1)}`}
      style={{ "--iw-image": `url("${image}")` } as CSSProperties}
    >
      <a className="iw-skip" href="#institutional-content">
        Pular para o conteúdo
      </a>
      <header className="iw-header">
        <Link to="/" aria-label="Norte Concursos — início">
          <NorteBrand light />
        </Link>
        <nav aria-label="Páginas institucionais">
          {PAGES.map(([to, label]) => (
            <Link key={to} to={to} aria-current={page === to ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="iw-actions">
          <button type="button" className="iw-back" onClick={goBack} aria-label="Voltar à tela anterior">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Voltar</span>
          </button>
          <Link className="iw-home" to="/" aria-label="Ir para a página inicial">
            <Home size={16} aria-hidden="true" />
            <span>Início</span>
          </Link>
        </div>
      </header>
      <section className="iw-hero" aria-labelledby="institutional-title">
        <div>
          <span className="iw-kicker">
            <ShieldCheck size={14} aria-hidden="true" /> Norte Concursos ·{" "}
            {page === "/sobre" ? "Feijó, Acre" : "Informação e confiança"}
          </span>
          <h1 id="institutional-title">{title}</h1>
          <p>{description}</p>
          {updatedAt && <p className="iw-print-date">Atualizado em {updatedAt}</p>}
        </div>
        <PoliceInsignia
          alt=""
          width={96}
          height={116}
          decoding="async"
        />
      </section>
      <main id="institutional-content" tabIndex={-1} className="iw-main">
        {children}
      </main>
      <footer className="iw-footer">
        <span>
          {updatedAt ? (
            <>
              Atualizado em{" "}
              <time dateTime={updatedAt.split("/").reverse().join("-")}>{updatedAt}</time>
            </>
          ) : (
            "De Feijó para todo o Brasil"
          )}
        </span>
        <div>
          {updatedAt && (
            <button type="button" onClick={() => window.print()}>
              <Printer size={13} aria-hidden="true" /> Imprimir documento
            </button>
          )}
          <Link to={page === "/suporte" ? "/auth" : "/suporte"}>
            {page === "/suporte" ? "Acessar minha conta" : "Precisa de ajuda?"}
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </footer>
    </div>
  );
}

export type WindowSection = { id: string; label: string; content: ReactNode };
export function WindowSections({
  sections,
  label,
  value,
  onValueChange,
  document = false,
}: {
  sections: WindowSection[];
  label: string;
  value?: string;
  onValueChange?: (value: string) => void;
  document?: boolean;
}) {
  const [selected, setSelected] = useState(sections[0]?.id ?? "");
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 600px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const active = value ?? selected;
  const ids = sections.map(({ id }) => id).join("|");
  useEffect(() => {
    const syncHash = () => {
      const id = window.location.hash.slice(1);
      if (ids.split("|").includes(id)) {
        setSelected(id);
        onValueChange?.(id);
      }
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [ids, onValueChange]);
  const select = (id: string) => {
    setSelected(id);
    onValueChange?.(id);
    window.history.replaceState(window.history.state, "", `#${id}`);
  };
  return (
    <Tabs.Root
      value={active}
      onValueChange={select}
      orientation={compact ? "horizontal" : "vertical"}
      className={`iw-sections${document ? " iw-document" : ""}`}
    >
      <Tabs.List aria-label={label} className="iw-tabs">
        {sections.map(({ id, label }, index) => (
          <Tabs.Trigger key={id} value={id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <div className="iw-reader">
        {sections.map(({ id, content }, index) => (
          <Tabs.Content forceMount key={id} value={id} className="iw-panel">
            {content}
            {document && (
              <div className="iw-chapter-footer">
                <span>
                  Seção {index + 1} de {sections.length}
                </span>
                <div>
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => select(sections[index - 1]!.id)}
                  >
                    <ArrowLeft size={14} aria-hidden="true" /> Anterior
                  </button>
                  <button
                    type="button"
                    disabled={index === sections.length - 1}
                    onClick={() => select(sections[index + 1]!.id)}
                  >
                    Próxima <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </Tabs.Content>
        ))}
      </div>
    </Tabs.Root>
  );
}
