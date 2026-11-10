import { ArrowRight, CalendarClock, CalendarDays, Fingerprint, FlaskConical, GraduationCap, HeartPulse, Lock, Scale, Search, Target, Users, Wallet } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Contest } from "@/types";
import { contestDisplay } from "@/lib/contestDisplay";

function contestArt(contest: Contest) {
  const value = `${contest.name} ${contest.agency} ${contest.location}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (value.includes("acre") && (value.includes("civil") || value.includes("pc-ac"))) return "/media/hero/pcac-capa.webp";
  if (value.includes("santa catarina") || value.includes("pc-sc") || value.includes("pcsc")) return "/media/hero/pcsc-capa.webp";
  if (value.includes("parana") || value.includes("pc-pr") || value.includes("pcpr")) return "/media/hero/pcpr-capa.webp";
  if (value.includes("federal") || value.includes("pf")) return "/media/hero/careers-team.webp";
  return "/media/hero/meu-concurso-seguranca-publica.webp";
}

function RoleMarker({ role }: { role: string }) {
  const normalized = role.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const [Icon, tone] = normalized.includes("delegado")
    ? [Scale, "gold"]
    : /medic|legista/.test(normalized)
      ? [HeartPulse, "rose"]
      : /papiloscop|identifica/.test(normalized)
        ? [Fingerprint, "blue"]
        : /perit/.test(normalized)
          ? [FlaskConical, "violet"]
          : /investig|agente/.test(normalized)
            ? [Search, "teal"]
            : [Target, "neutral"];
  return <span className="contest-showcase__role-marker" data-tone={tone}><Icon aria-hidden="true" /></span>;
}

function money(value: number) {
  return value > 0 ? value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }) : "Não informado";
}

function dateLabel(value?: string) {
  if (!value) return "A definir";
  const [year, month, day] = value.split("-");
  return year && month && day ? `${day}/${month}/${year}` : value;
}

function ContestFacts({ contest }: { contest: Contest }) {
  const facts = [
    { icon: Users, label: "Vagas", value: contest.vacancies > 0 ? contest.vacancies.toLocaleString("pt-BR") : "A confirmar" },
    { icon: Wallet, label: "Remuneração", value: money(contest.salary) },
    { icon: GraduationCap, label: "Escolaridade", value: contest.educationLevel || "Não informada" },
  ];
  return (
    <dl className="contest-showcase__facts">
      {facts.map(({ icon: Icon, label, value }) => (
        <div className="contest-showcase__fact" key={label}>
          <dt><Icon aria-hidden="true" />{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ContestObjectivesShowcase({
  focusedContest,
  contests,
  onSelect,
  savingId,
  onClear,
}: {
  focusedContest: Contest | undefined;
  contests: Contest[];
  onSelect: (contest: Contest) => void;
  savingId?: string | null;
  onClear?: () => void;
}) {
  const featured = focusedContest ?? contests[0];
  const others = contests
    .filter((contest) => contest.id !== featured?.id)
    .sort((a, b) => Number(b.agency === featured?.agency) - Number(a.agency === featured?.agency));
  const display = featured ? contestDisplay(featured) : null;
  const isLocked = !!focusedContest;

  return (
    <section className="contest-showcase" data-has-options={others.length > 0} aria-labelledby="contest-showcase-title">
      <header className="contest-showcase__heading">
        <div>
          <h1 id="contest-showcase-title">{isLocked ? "Seu objetivo em foco" : "Escolha seu objetivo"}</h1>
        </div>
        {isLocked && <span className="contest-showcase__active-state"><Target aria-hidden="true" /> Objetivo ativo</span>}
      </header>

      {featured ? (
        <article className="contest-showcase__featured">
          <div className="contest-showcase__featured-art">
            <img src={contestArt(featured)} alt={`Imagem ilustrativa de ${featured.agency || featured.name}`} loading="eager" decoding="async" />
          </div>
          <div className="contest-showcase__featured-body">
            <div className="contest-showcase__featured-topline">
              <span>{featured.agency || featured.name} · {featured.examBoard || "Banca a confirmar"}</span>
              <span className="contest-showcase__status">{featured.status}</span>
            </div>
            <div className="contest-showcase__title-group">
              <RoleMarker role={display?.role ?? ""} />
              <h2>{display?.role}</h2>
            </div>
            <div className="contest-showcase__summary">
              <span className="contest-showcase__exam-date"><CalendarDays aria-hidden="true" /> Prova: <strong>{dateLabel(featured.examDate)}</strong></span>
              <ContestFacts contest={featured} />
            </div>
            <div className="contest-showcase__actions">
              {!isLocked ? (
                <button
                  type="button"
                  className="contest-showcase__primary-action"
                  onClick={() => onSelect(featured)}
                  disabled={!!savingId}
                >
                  {savingId === featured.id ? "Salvando…" : "Definir como objetivo"}
                  <ArrowRight aria-hidden="true" />
                </button>
              ) : (
                <>
                  <Link to="/dashboard/cronograma" className="contest-showcase__secondary-action">
                    <CalendarClock aria-hidden="true" /> Abrir cronograma
                  </Link>
                  {onClear && (
                    <button type="button" className="contest-showcase__clear-action" onClick={onClear} disabled={!!savingId}>
                      Desmarcar objetivo
                    </button>
                  )}
                </>
              )}
              {featured.officialEditalUrl && (
                <a className="contest-showcase__official-link" href={featured.officialEditalUrl} target="_blank" rel="noreferrer">
                  Consultar edital oficial
                </a>
              )}
            </div>
          </div>
        </article>
      ) : (
        <div className="contest-showcase__empty">
          <Target aria-hidden="true" />
          <p>Nenhum concurso disponível no momento. Volte ao catálogo para consultar novas oportunidades.</p>
          <Link to="/dashboard/questions">Explorar concursos <ArrowRight aria-hidden="true" /></Link>
        </div>
      )}

      {others.length > 0 && (
        <section className="contest-showcase__others" aria-labelledby="contest-showcase-others">
          <div className="contest-showcase__section-heading">
            <h2 id="contest-showcase-others">{isLocked ? "Outros cargos" : "Outras opções"}</h2>
            <span>{isLocked ? "Desmarque o objetivo para trocar" : `${others.length} opções`}</span>
          </div>
          <ul className={`contest-showcase__list ${isLocked ? "is-locked" : ""}`} tabIndex={0} aria-labelledby="contest-showcase-others">
            {others.map((contest) => {
              const item = contestDisplay(contest);
              return (
                <li key={contest.id}>
                  <RoleMarker role={item.role} />
                  <div className="contest-showcase__list-copy">
                    <strong>{item.role}</strong>
                    <span>{contest.agency || contest.name} · {contest.examBoard || "Banca a confirmar"}</span>
                  </div>
                  {isLocked ? (
                    <span className="contest-showcase__lock-label"><Lock size={12} aria-hidden="true" /> Bloqueado</span>
                  ) : (
                    <button type="button" onClick={() => onSelect(contest)} disabled={!!savingId}>
                      {savingId === contest.id ? "Salvando…" : "Selecionar"} <ArrowRight aria-hidden="true" />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </section>
  );
}
