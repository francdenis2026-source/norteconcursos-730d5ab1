import "./ContestShowcase.css";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { usePcscAvailability } from "@/hooks/usePcscAvailability";
import { usePcprAvailability } from "@/hooks/usePcprAvailability";
import { usePcpiAvailability } from "@/hooks/usePcpiAvailability";
import { PCSC_EXAM, PCSC_TRAINER_SEARCH } from "@/lib/pcscExam";
import { PCPR_EXAM, PCPR_TRAINER_SEARCH } from "@/lib/pcprExam";
import { PCPI_EXAM, pcpiTrainerSearch } from "@/lib/pcpiExam";

const format = (value: number) => value.toLocaleString("pt-BR");

function Availability({
  count,
  label,
  loading,
}: {
  count: number | undefined;
  label: string;
  loading: boolean;
}) {
  return (
    <div className="contest-availability">
      <strong>{count === undefined ? "—" : format(count)}</strong>
      <span>
        {count === undefined
          ? loading
            ? "Conferindo questões…"
            : "Quantidade não confirmada"
          : count === 1
            ? "questão para treinar"
            : "questões para treinar"}
        <small>{label}</small>
      </span>
    </div>
  );
}
function CountReference({ date }: { date: string | null }) {
  return (
    <p className="contest-reference">
      {date
        ? `Conferido em ${date}. Confira a disponibilidade ao iniciar.`
        : "Disponibilidade desta sessão. Os limites do seu plano continuam valendo."}
    </p>
  );
}

/** Public references are dated; signed-in counts continue to use the eligible catalogue. */
export function ContestShowcase() {
  const { isAuthenticated } = useAuthStatus();
  const catalogRef = useRef<HTMLDivElement>(null);
  const [activeContest, setActiveContest] = useState(0);
  const contestTotal = 3;
  const moveContest = (index: number) => {
    const track = catalogRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".contest-card"));
    const next = Math.max(0, Math.min(cards.length - 1, index));
    const destination = cards[next];
    if (!destination) return;
    track.scrollTo({ left: destination.offsetLeft - (cards[0]?.offsetLeft ?? 0), behavior: "smooth" });
    setActiveContest(next);
  };
  const trackContestScroll = () => {
    const track = catalogRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".contest-card"));
    if (!cards.length) return;
    const first = cards[0]?.offsetLeft ?? 0;
    const closest = cards.reduce((best, card, i) =>
      Math.abs(card.offsetLeft - first - track.scrollLeft) <
      Math.abs((cards[best]?.offsetLeft ?? 0) - first - track.scrollLeft) ? i : best, 0);
    setActiveContest(closest);
  };
  const sc = usePcscAvailability();
  const pr = usePcprAvailability();
  const pi = usePcpiAvailability();
  const scCount = sc.counts?.[0];
  const prAgentIndex = PCPR_EXAM.roles.findIndex((role) => role === PCPR_TRAINER_SEARCH.career);
  const trainingLink = (search: Record<string, string>, label: string, primary = false) =>
    isAuthenticated ? (
      <Link
        to="/dashboard/question-trainer"
        search={search}
        className={`contest-action${primary ? " contest-action--gold" : ""}`}
      >
        {label}
        <ArrowRight aria-hidden="true" />
      </Link>
    ) : (
      <Link
        to="/auth"
        search={{ mode: "register" }}
        className={`contest-action${primary ? " contest-action--gold" : ""}`}
      >
        {label}
        <ArrowRight aria-hidden="true" />
      </Link>
    );

  return (
    <div className="contest-showcase">
      <article className="contest-spotlight" aria-labelledby="pcac-title">
        <div className="contest-spotlight__art">
          <img
            src="/media/hero/pcac-capa.webp"
            alt="PC-AC, Polícia Civil do Acre: composição com agente e viatura"
            width={1672}
            height={940}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="contest-spotlight__content">
          <div className="contest-kickers">
            <span>
              <ShieldCheck size={14} aria-hidden="true" /> PC-AC · PRÉ-EDITAL
            </span>
            <span>Banca definida · IDECAN</span>
          </div>
          <h3 id="pcac-title">
            Polícia Civil <em>do Acre.</em>
          </h3>
          <p className="contest-spotlight__copy">
            Comece pela banca: pratique com uma prova real da IDECAN enquanto acompanha o próximo
            edital da PC-AC.
          </p>
          <div className="contest-spotlight__training">
            <Availability
              count={scCount}
              label="PC-SC · Agente · banca IDECAN"
              loading={sc.loading}
            />
          </div>
          <div className="contest-spotlight__actions">
            {isAuthenticated ? (
              <Link
                to="/dashboard/inteligencia-idecan"
                className="contest-action contest-action--gold"
              >
                Preparar para a PC-AC
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ) : (
              <Link
                to="/auth"
                search={{ mode: "register" }}
                className="contest-action contest-action--gold"
              >
                Começar preparação
                <ArrowUpRight aria-hidden="true" />
              </Link>
            )}
            {trainingLink(PCSC_TRAINER_SEARCH, "Treinar com a IDECAN")}
          </div>
          <details className="contest-details">
            <summary>Sobre o concurso e a preparação</summary>
            <CountReference date={sc.checkedAt} />
            <p>
              A definição da IDECAN consta da dispensa de licitação e ratificação publicadas no
              Diário Oficial do Acre de 22/10/2026. O edital ainda não foi publicado. Este treino
              usa a prova de Agente da PC-SC de {PCSC_EXAM.year}; não garante questões idênticas na
              PC-AC.
            </p>
            <span className="contest-spotlight__signature">NORTE CONCURSOS · ACRE</span>
          </details>
        </div>
      </article>

      <div className="contest-catalog__heading">
        <div>
          <span className="contest-eyebrow">DA PREPARAÇÃO À PRÁTICA</span>
          <h3>Provas reais. Seu próximo treino.</h3>
        </div>
        <p>Escolha o concurso e veja quantas questões estão disponíveis. <span className="contest-swipe-hint">Deslize para ver outros concursos →</span></p>
      </div>
      <div className="contest-catalog" ref={catalogRef} onScroll={trackContestScroll} role="region" aria-roledescription="carrossel" aria-label="Provas disponíveis por concurso" tabIndex={0}>
        <article
          className="contest-card contest-card--idecan"
          id="prova-pcsc"
          aria-labelledby="pcsc-title"
        >
          <span className="contest-card__badge">
            <Sparkles size={11} aria-hidden="true" /> Novo
          </span>
          <div className="contest-card__art">
            <img
              src="/media/hero/pcsc-capa.webp"
              alt="Capa da Polícia Civil de Santa Catarina"
              width={1672}
              height={941}
              loading="lazy"
              decoding="async"
            />
            <span>MESMA BANCA DA PC-AC</span>
          </div>
          <div className="contest-card__content">
            <span className="contest-eyebrow">IDECAN · {PCSC_EXAM.year}</span>
            <h3 id="pcsc-title">Polícia Civil de Santa Catarina</h3>
            <p className="contest-card__role">Agente de Polícia Civil</p>
            <Availability
              count={scCount}
              label="Correção após cada resposta"
              loading={sc.loading}
            />
            {trainingLink(PCSC_TRAINER_SEARCH, "Treinar prova da PC-SC", true)}
            <CountReference date={sc.checkedAt} />
            <details className="contest-details">
              <summary>O que está disponível</summary>
              <p>
                {PCSC_EXAM.itemsOriginal} itens na prova original. A seleção elegível pode ser
                parcial; questões arquivadas não entram. Gabarito definitivo da IDECAN.
              </p>
            </details>
          </div>
        </article>
        <article className="contest-card" id="prova-pcpr" aria-labelledby="pcpr-title">
          <div className="contest-card__art">
            <img
              src="/media/hero/pcpr-capa.webp"
              alt="Capa da Polícia Civil do Paraná"
              width={1672}
              height={940}
              loading="lazy"
              decoding="async"
            />
            <span>PROVA PARA TREINAR</span>
          </div>
          <div className="contest-card__content">
            <span className="contest-eyebrow">FGV · {PCPR_EXAM.year}</span>
            <h3 id="pcpr-title">Polícia Civil do Paraná</h3>
            <p className="contest-card__role">Agente de Polícia Judiciária</p>
            <Availability
              count={pr.counts?.[prAgentIndex]}
              label="Questões do cargo de Agente"
              loading={pr.loading}
            />
            {trainingLink(PCPR_TRAINER_SEARCH, "Treinar prova de Agente", true)}
            <CountReference date={pr.checkedAt} />
            <details className="contest-details">
              <summary>Outros cargos e detalhes</summary>
              <ul className="contest-role-list">
                {PCPR_EXAM.roles.map((role, index) => (
                  <li key={role}>
                    <span>
                      {role}
                      <strong>
                        {pr.counts?.[index] === undefined
                          ? "Quantidade não confirmada"
                          : `${format(pr.counts[index]!)} questões disponíveis`}
                      </strong>
                    </span>
                    {trainingLink({ ...PCPR_TRAINER_SEARCH, career: role }, "Treinar")}
                  </li>
                ))}
              </ul>
              <p>
                Prova aplicada em {PCPR_EXAM.appliedOn}. Gabarito preliminar da FGV, sujeito a
                alterações após os recursos. A disponibilidade pode ser menor que os 100 itens
                originais de cada cargo.
              </p>
            </details>
          </div>
        </article>
        <article className="contest-card" id="prova-pcpi" aria-labelledby="pcpi-title">
          <div className="contest-card__art">
            <img
              src="/media/hero/pcpi-capa.webp"
              alt="Capa da Polícia Civil do Piauí"
              width={1672}
              height={941}
              loading="lazy"
              decoding="async"
            />
            <span>ESCOLHA SEU CARGO</span>
          </div>
          <div className="contest-card__content">
            <span className="contest-eyebrow">FGV · {PCPI_EXAM.year}</span>
            <h3 id="pcpi-title">Polícia Civil do Piauí</h3>
            <p className="contest-card__role">Treino com seleção por cargo</p>
            <div className="contest-pi-roles">
              {PCPI_EXAM.roles.map((role, index) => (
                <div key={role}>
                  <span className="contest-pi-roles__name">{role}</span>
                  <Availability
                    count={pi.counts?.[index]}
                    label="Disponíveis neste cargo"
                    loading={pi.loading}
                  />
                  {trainingLink(pcpiTrainerSearch(role), "Treinar", index === 0)}
                </div>
              ))}
            </div>
            <CountReference date={pi.checkedAt} />
            <details className="contest-details">
              <summary>Sobre a seleção de questões</summary>
              <p>
                As seleções dos cargos permanecem separadas. Questões arquivadas ou bloqueadas não
                entram no treino; a seleção pode ser parcial.
              </p>
            </details>
          </div>
        </article>
      </div>
      <div className="contest-carousel-controls" aria-label="Navegação entre concursos">
        <span className="contest-carousel-status" aria-live="polite">{activeContest + 1} de {contestTotal} concursos</span>
        <div className="contest-carousel-dots" aria-label="Selecionar concurso">
          {["PC-SC", "PC-PR", "PC-PI"].map((label, index) => (
            <button
              key={label}
              type="button"
              aria-label={`Ver concurso ${label}`}
              aria-current={activeContest === index ? "true" : undefined}
              onClick={() => moveContest(index)}
            />
          ))}
        </div>
        <div className="contest-carousel-arrows">
          <button type="button" aria-label="Concurso anterior" disabled={activeContest === 0} onClick={() => moveContest(activeContest - 1)}>
            <ArrowLeft aria-hidden="true" />
          </button>
          <button type="button" aria-label="Próximo concurso" disabled={activeContest === contestTotal - 1} onClick={() => moveContest(activeContest + 1)}>
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
      <p className="contest-independence">
        Iniciativa educacional independente, sem vínculo ou endosso das Polícias Civis, governos ou
        bancas. Artes ilustrativas. Consulte os documentos oficiais de cada concurso.
      </p>
    </div>
  );
}
