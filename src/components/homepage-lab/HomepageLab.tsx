import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Check, Copy, TriangleAlert, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { NorteBrand } from "@/components/brand/NorteBrand";
import { ThemeToggle } from "@/components/landing/ThemeToggle";
import { OperationalHero } from "./OperationalHero";
import { EditorialHero } from "./EditorialHero";
import { DirectHero } from "./DirectHero";
import { Method } from "./HeroParts";
import { DATASETS, getFixture, type Dataset } from "./fixtures";
import "@/styles/home.css";
import "./homepage-lab.css";
import "./picker.css";

const VARIANTS = [OperationalHero, EditorialHero, DirectHero];
const NAMES = ["Operacional", "Editorial", "Direta"];
const DATA_NAMES = ["Demo data", "Worst case", "Zero", "Um", "Indisponível"];
export function HomepageLab({
  initialVariant,
  initialData,
}: {
  initialVariant: number;
  initialData: string;
}) {
  const [variant, setVariant] = useState(initialVariant - 1);
  const [dataset, setDataset] = useState<Dataset>(
    import.meta.env.DEV && DATASETS.includes(initialData as Dataset)
      ? (initialData as Dataset)
      : "demo",
  );
  const [animateEntry, setAnimateEntry] = useState(true);
  const [replay, setReplay] = useState(0);
  const picker = useRef<HTMLElement>(null);
  const highlight = useRef<HTMLSpanElement>(null);
  const fixture = getFixture(dataset);
  const [client] = useState(() => {
    const isolated = new QueryClient();
    isolated.setQueryDefaults(["public-question-summary"], { enabled: false });
    isolated.setQueryData(["public-question-summary"], getFixture("demo").summary);
    return isolated;
  });
  useEffect(() => {
    client.setQueryData(["public-question-summary"], getFixture(dataset).summary);
  }, [client, dataset]);
  const setActive = (index: number, animate = false) => {
    setAnimateEntry(animate);
    const next = (index + VARIANTS.length) % VARIANTS.length;
    setVariant(next);
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(next + 1));
    window.history.replaceState(window.history.state, "", url);
  };
  useLayoutEffect(() => {
    const move = () => {
      const item = picker.current?.querySelector<HTMLElement>(".proto-picker-item[data-active]");
      if (item && highlight.current) {
        highlight.current.style.width = `${item.offsetWidth}px`;
        highlight.current.style.transform = `translateX(${item.offsetLeft}px)`;
      }
    };
    move();
    window.addEventListener("resize", move);
    const first = requestAnimationFrame(() =>
      requestAnimationFrame(() => picker.current?.setAttribute("data-ready", "")),
    );
    return () => {
      window.removeEventListener("resize", move);
      cancelAnimationFrame(first);
    };
  }, [variant]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        (target instanceof HTMLElement &&
          (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)))
      )
        return;
      // Component controls retain their own arrow-key behavior.
      if (target instanceof Element && target.closest('[role="tablist"]')) return;
      const number = Number.parseInt(event.key, 10);
      if (number >= 1 && number <= 3) {
        event.preventDefault();
        setActive(number - 1, false);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setActive(variant + 1, false);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActive(variant - 1, false);
      } else if (event.key.toLowerCase() === "r") {
        setAnimateEntry(true);
        setReplay((value) => value + 1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [variant]);
  const copyVersion = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.custom(
        (id) => (
          <div className="lab-toast">
            <Check size={18} aria-hidden="true" />
            <div>
              <strong>Link da versão copiado</strong>
              <p>{NAMES[variant]} · Compartilhe para comparar esta composição.</p>
            </div>
            <button type="button" onClick={() => toast.dismiss(id)} aria-label="Fechar confirmação">
              <X size={16} />
            </button>
          </div>
        ),
        { id: "homepage-lab-copy", closeButton: false, duration: 4000 },
      );
    } catch {
      toast.custom(
        (id) => (
          <div className="lab-toast" role="alert">
            <TriangleAlert size={18} aria-hidden="true" />
            <div>
              <strong>Não foi possível copiar o link</strong>
              <p>Você pode copiar o endereço na barra do navegador.</p>
            </div>
            <button type="button" onClick={() => toast.dismiss(id)} aria-label="Fechar aviso">
              <X size={16} />
            </button>
          </div>
        ),
        { id: "homepage-lab-copy", closeButton: false, duration: 6000 },
      );
    }
  };
  const Variant = VARIANTS[variant] ?? OperationalHero;
  return (
    <div className="homepage-lab" data-animate={String(animateEntry)}>
      <a href="#lab-main" className="lab-skip">
        Pular para a composição
      </a>
      <div className="lab-review-note">
        <span>Comparação visual · A homepage atual permanece preservada</span>
        <button type="button" onClick={copyVersion}>
          <Copy size={13} aria-hidden="true" /> Copiar versão
        </button>
      </div>
      <header className="lab-header">
        <Link to="/" aria-label="Norte Concursos — início">
          <NorteBrand light />
        </Link>
        <nav aria-label="Navegação da composição">
          <a href="#plataforma">Como funciona</a>
          <Link to="/auth">Entrar</Link>
          <Link to="/auth" search={{ mode: "register" }} className="lab-header-register">
            Começar grátis
          </Link>
          <ThemeToggle />
        </nav>
      </header>
      <main id="lab-main">
        <QueryClientProvider client={client}>
          <Variant key={`${variant}-${replay}`} fixture={fixture} />
        </QueryClientProvider>
        <Method />
      </main>
      <footer className="lab-footer">
        <span>Fontes identificadas. Treino por banca. Preparação com direção.</span>
        <Link to="/">Voltar à homepage atual</Link>
      </footer>
      {import.meta.env.DEV && (
        <div className="lab-stress" role="group" aria-label="Cenários de teste">
          <span>Dados:</span>
          {DATASETS.map((mode, index) => (
            <button
              key={mode}
              type="button"
              aria-pressed={dataset === mode}
              onClick={() => {
                setDataset(mode);
                const url = new URL(location.href);
                url.searchParams.set("data", mode);
                history.replaceState(history.state, "", url);
              }}
            >
              {DATA_NAMES[index]}
            </button>
          ))}
        </div>
      )}
      <nav ref={picker} className="proto-picker" aria-label="Prototype variants">
        <span ref={highlight} className="proto-picker-highlight" aria-hidden="true" />
        {NAMES.map((name, index) => (
          <button
            type="button"
            key={name}
            className="proto-picker-item"
            data-active={index === variant ? "" : undefined}
            aria-current={index === variant ? "true" : undefined}
            onClick={() => setActive(index)}
          >
            {name}
          </button>
        ))}
        <span className="proto-picker-divider" aria-hidden="true" />
        <button
          type="button"
          className="proto-picker-item proto-picker-replay"
          aria-label="Replay animation (R)"
          onClick={() => {
            setAnimateEntry(true);
            setReplay((value) => value + 1);
          }}
        >
          ↻
        </button>
      </nav>
    </div>
  );
}
