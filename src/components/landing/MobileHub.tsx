import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarClock,
  Check,
  Compass,
  Layers,
  Minus,
  Sparkles,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { PAYMENTS_ENABLED, TESTING_DAYS, TESTING_PHASE } from "@/lib/launch.config";
import { PLAN_ROWS, planValue } from "@/lib/planPresentation";
import { cn } from "@/lib/utils";

type Tab = "metodo" | "recursos" | "carreiras" | "pcac" | "planos";

const TABS: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: "metodo", label: "Método", icon: Compass },
  { id: "recursos", label: "Recursos", icon: Layers },
  { id: "carreiras", label: "Carreiras", icon: Target },
  { id: "pcac", label: "PCAC 2026", icon: CalendarClock },
  { id: "planos", label: "Planos", icon: Sparkles },
];

/** Âncoras do menu → aba correspondente. */
const HASH: Record<string, Tab> = {
  "#metodo": "metodo",
  "#plataforma": "recursos",
  "#carreiras": "carreiras",
  "#pcac": "pcac",
  "#planos": "planos",
};

interface Props {
  steps: [string, string][];
  tools: { icon: LucideIcon; title: string; text: string }[];
  careers: [string, string][];
  pillars: { icon: LucideIcon; title: string; text: string }[];
}

/**
 * Versão compacta da página inicial para celular: tudo o que na tela grande ocupa várias
 * seções fica numa única área com abas. Só aparece em telas estreitas (o CSS esconde as
 * seções longas nesse breakpoint).
 */
export function MobileHub({ steps, tools, careers, pillars }: Props) {
  const [tab, setTab] = useState<Tab>("metodo");
  useEffect(() => {
    const narrow = () => window.matchMedia("(max-width: 767px)").matches;
    const go = (hash: string) => {
      const t = HASH[hash];
      if (!t || !narrow()) return false;
      setTab(t);
      document.getElementById("hub")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.(
        "a[href^='#']",
      ) as HTMLAnchorElement | null;
      if (a && go(a.getAttribute("href") ?? "")) e.preventDefault();
    };
    document.addEventListener("click", onClick);
    if (window.location.hash) go(window.location.hash);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return (
    <section id="hub" className="mh" aria-label="Conheça a plataforma">
      <div className="mh__tabs" role="tablist" aria-label="Seções">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={cn("mh__tab", tab === id && "is-on")}
          >
            <Icon aria-hidden /> {label}
          </button>
        ))}
      </div>
      <div className="mh__panel" role="tabpanel">
        {tab === "metodo" && (
          <>
            <p className="mh__lead">
              Preparação é estratégia, não improviso: um ciclo objetivo até a prova.
            </p>
            <ol className="mh__grid mh__grid--steps">
              {steps.map(([title, text], i) => (
                <li key={title}>
                  <b>0{i + 1}</b>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
          </>
        )}
        {tab === "recursos" && (
          <>
            <ul className="mh__grid">
              {tools.map(({ icon: Icon, title, text }) => (
                <li key={title}>
                  <Icon aria-hidden />
                  <strong>{title}</strong>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <ul className="mh__pills" aria-label="Garantias de conteúdo">
              {pillars.map(({ icon: Icon, title }) => (
                <li key={title}>
                  <Icon aria-hidden /> {title}
                </li>
              ))}
            </ul>
          </>
        )}
        {tab === "carreiras" && (
          <>
            <p className="mh__lead">
              Foco total em segurança pública: escolha a sua carreira e estude pelo edital.
            </p>
            <ul className="mh__grid mh__grid--careers">
              {careers.map(([name, roles]) => (
                <li key={name}>
                  <strong>{name}</strong>
                  <span>{roles}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        {tab === "pcac" && (
          <div className="mh__pcac">
            <div className="mh__emblems">
              <img src="/media/brasao-acre-oficial.svg" alt="Brasão do Estado do Acre" />
              <img src="/media/brasao-pcac-oficial.jpg" alt="Brasão da Polícia Civil do Acre" />
            </div>
            <strong>PCAC: sua próxima missão começa agora.</strong>
            <p>
              O novo concurso da Polícia Civil do Acre foi anunciado. Prepare-se para Delegado,
              Oficial Investigador de Polícia e Perito, com treino direcionado e simulados.
            </p>
            <ul className="mh__pills">
              {["Delegado de Polícia", "Oficial Investigador", "Perito"].map((r) => (
                <li key={r}>
                  <Check aria-hidden /> {r}
                </li>
              ))}
            </ul>
            <Link to="/auth" search={{ mode: "register" }} className="btn-brass">
              Quero me preparar <ArrowRight />
            </Link>
            <small>
              Edital ainda não publicado. Campanha educacional independente, sem vínculo com o
              Governo do Acre ou a Polícia Civil.
            </small>
          </div>
        )}
        {tab === "planos" && (
          <>
            <p className="mh__lead">
              {TESTING_PHASE
                ? `Fase de testes: ${TESTING_DAYS} dias grátis com os recursos do plano Essencial.`
                : "Escolha o plano que acompanha o seu ritmo."}
            </p>
            <div className="mh__plans">
              {SUBSCRIPTION_PLANS.map((plan) => {
                const testing = TESTING_PHASE && plan.id === "essential";
                return (
                  <article
                    key={plan.id}
                    className={cn("mh__plan", (plan.isPopular || testing) && "is-hot")}
                  >
                    <h3>
                      {plan.name}
                      {testing && <em>Grátis no teste</em>}
                    </h3>
                    <p className="mh__price">
                      {plan.price === 0
                        ? "Grátis"
                        : `R$ ${plan.price.toFixed(2).replace(".", ",")}`}
                      {plan.price > 0 && (
                        <small>/mês{!PAYMENTS_ENABLED ? " · em breve" : ""}</small>
                      )}
                    </p>
                    <ul>
                      {PLAN_ROWS.slice(0, 5).map(([key, label]) => {
                        const v = planValue(key, plan.features[key]);
                        return (
                          <li key={key} className={v ? "" : "is-off"}>
                            {v ? <Check aria-hidden /> : <Minus aria-hidden />} {label}
                            {v ? ` · ${v}` : ""}
                          </li>
                        );
                      })}
                    </ul>
                    <Link
                      to="/auth"
                      search={{ mode: "register" }}
                      className={plan.price === 0 || testing ? "btn-brass" : "btn-glass"}
                    >
                      {plan.price === 0 ? "Criar conta" : "Testar grátis"}
                    </Link>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className="mh__cta">
        <Link to="/auth" search={{ mode: "register" }} className="btn-brass">
          Começar gratuitamente <ArrowRight />
        </Link>
        <Link to="/desafio-diario" className="btn-glass">
          <BookOpenCheck /> Desafio diário
        </Link>
      </div>
    </section>
  );
}
