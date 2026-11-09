import { ArrowRight, CalendarDays, MapPin, Users, Wallet, GraduationCap, Target } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Contest } from "@/types";

function contestArt(contest: Contest) {
  const value = `${contest.name} ${contest.agency} ${contest.location}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (value.includes("acre") && (value.includes("civil") || value.includes("pc-ac"))) return "/media/hero/pcac-capa.webp";
  if (value.includes("santa catarina") || value.includes("pc-sc") || value.includes("pcsc")) return "/media/hero/pcsc-capa.webp";
  if (value.includes("parana") || value.includes("pc-pr") || value.includes("pcpr")) return "/media/hero/pcpr-capa.webp";
  if (value.includes("federal") || value.includes("pf")) return "/media/hero/careers-team.webp";
  return "/media/hero/meu-concurso-seguranca-publica.webp";
}

function money(value: number) {
  return value > 0 ? value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }) : "Não informado";
}

function dateLabel(value?: string) {
  if (!value) return "Data não definida";
  const [year, month, day] = value.split("-");
  return year && month && day ? `${day}/${month}/${year}` : value;
}

function ContestFacts({ contest, compact = false }: { contest: Contest; compact?: boolean }) {
  const facts = [
    { icon: Users, label: "Vagas", value: contest.vacancies > 0 ? contest.vacancies.toLocaleString("pt-BR") : "A confirmar" },
    { icon: Wallet, label: "Remuneração", value: money(contest.salary) },
    { icon: GraduationCap, label: "Escolaridade", value: contest.educationLevel || "Não informada" },
  ];
  return (
    <div className={compact ? "contest-showcase__facts contest-showcase__facts--compact" : "contest-showcase__facts"}>
      {facts.map(({ icon: Icon, label, value }) => (
        <div className="contest-showcase__fact" key={label}>
          <Icon aria-hidden="true" />
          <span><small>{label}</small><strong>{value}</strong></span>
        </div>
      ))}
    </div>
  );
}

export function ContestObjectivesShowcase({
  focusedContest,
  contests,
  onSelect,
  savingId,
}: {
  focusedContest: Contest | undefined;
  contests: Contest[];
  onSelect: (contest: Contest) => void;
  savingId?: string | null;
}) {
  const featured = focusedContest ?? contests[0];
  const others = contests.filter((contest) => contest.id !== featured?.id).slice(0, 3);

  return (
    <section className="contest-showcase" aria-labelledby="contest-showcase-title">
      <div className="contest-showcase__backdrop" aria-hidden="true" />
      <div className="contest-showcase__inner">
        <div className="contest-showcase__lead">
          <div className="contest-showcase__intro">
            <span className="contest-showcase__eyebrow"><Target aria-hidden="true" /> PREPARAÇÃO COM DIREÇÃO</span>
            <h1 id="contest-showcase-title">{focusedContest ? "Seu próximo objetivo." : "Escolha seu próximo objetivo."}</h1>
            <p>Defina o concurso que orienta sua preparação e acompanhe as informações mais importantes em um só lugar.</p>
            <Link to="/dashboard/questions" className="contest-showcase__catalog-link">
              Explorar concursos <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          {featured ? (
            <article className="contest-showcase__featured">
              <div className="contest-showcase__featured-art">
                <img src={contestArt(featured)} alt={`Imagem ilustrativa de ${featured.agency || featured.name}`} loading="eager" decoding="async" />
                <span className="contest-showcase__art-caption">{featured.name}</span>
              </div>
              <div className="contest-showcase__featured-body">
                <div className="contest-showcase__featured-head">
                  <span className="contest-showcase__tag"><Target aria-hidden="true" /> {focusedContest ? "OBJETIVO PRINCIPAL" : "CONCURSO EM DESTAQUE"}</span>
                  <span className="contest-showcase__status">{featured.status}</span>
                </div>
                <div>
                  <h2>{featured.agency || featured.name}</h2>
                  <p className="contest-showcase__role">{featured.role} <span>·</span> {featured.examBoard || "Banca a confirmar"}</p>
                </div>
                <div className="contest-showcase__date"><CalendarDays aria-hidden="true" /><span><small>Data da prova</small><strong>{dateLabel(featured.examDate)}</strong></span></div>
                <ContestFacts contest={featured} />
                <div className="contest-showcase__featured-actions">
                  {focusedContest ? (
                    <Link to="/dashboard/edital" className="contest-showcase__primary-action">Estudar pelo edital <ArrowRight aria-hidden="true" /></Link>
                  ) : (
                    <button type="button" className="contest-showcase__primary-action" onClick={() => onSelect(featured)} disabled={savingId === featured.id}>
                      {savingId === featured.id ? "Salvando objetivo…" : "Definir como objetivo"} <ArrowRight aria-hidden="true" />
                    </button>
                  )}
                  {featured.officialEditalUrl && <a className="contest-showcase__secondary-action" href={featured.officialEditalUrl} target="_blank" rel="noreferrer">Edital oficial</a>}
                </div>
              </div>
            </article>
          ) : (
            <div className="contest-showcase__empty">
              <Target aria-hidden="true" />
              <div><strong>Nenhum concurso publicado no catálogo ainda.</strong><p>Consulte as opções disponíveis na área de concursos.</p></div>
              <Link to="/dashboard/questions">Explorar concursos <ArrowRight aria-hidden="true" /></Link>
            </div>
          )}
        </div>

        {others.length > 0 && (
          <div className="contest-showcase__others">
            <div className="contest-showcase__section-heading">
              <div><span>OUTRAS OPORTUNIDADES</span><h2>Outros concursos para acompanhar</h2></div>
              <span className="contest-showcase__count">{others.length} {others.length === 1 ? "opção" : "opções"}</span>
            </div>
            <div className="contest-showcase__grid">
              {others.map((contest) => (
                <article className="contest-showcase__card" key={contest.id}>
                  <div className="contest-showcase__card-art">
                    <img src={contestArt(contest)} alt="" loading="lazy" decoding="async" />
                    <span>{contest.name}</span>
                  </div>
                  <div className="contest-showcase__card-body">
                    <span className="contest-showcase__card-status">{contest.status}</span>
                    <h3>{contest.agency || contest.name}</h3>
                    <p>{contest.role} · {contest.examBoard || "Banca a confirmar"}</p>
                    <div className="contest-showcase__card-meta">
                      <span><CalendarDays aria-hidden="true" /> {dateLabel(contest.examDate)}</span>
                      <span><MapPin aria-hidden="true" /> {contest.location || "Local a confirmar"}</span>
                    </div>
                    <ContestFacts contest={contest} compact />
                    <button type="button" className="contest-showcase__choose" onClick={() => onSelect(contest)} disabled={savingId === contest.id}>
                      {savingId === contest.id ? "Salvando…" : "Definir como objetivo"} <ArrowRight aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
