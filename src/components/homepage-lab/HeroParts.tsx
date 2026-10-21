import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpenCheck, FileSearch, ShieldCheck, Target } from "lucide-react";
import { useState } from "react";
import { DailyChallengeBadge } from "@/components/landing/DailyChallengeBadge";
import { QuestionCountBadge } from "@/components/landing/QuestionCountBadge";
import type { HeroFixture } from "./fixtures";

export function HeroImage({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="lab-art" data-failed={failed || undefined}>
      <img
        src={src}
        width={1440}
        height={600}
        alt="Composição Carreiras Policiais com distintivo e agentes"
        onError={() => setFailed(true)}
      />
      {failed && (
        <div className="lab-art-fallback">
          <ShieldCheck size={44} aria-hidden="true" />
          <span>Norte Concursos</span>
        </div>
      )}
    </div>
  );
}
export function Actions() {
  return (
    <div className="lab-actions">
      <Link to="/auth" search={{ mode: "register" }} className="lab-primary">
        Começar grátis <ArrowRight size={16} aria-hidden="true" />
      </Link>
      <a href="#plataforma" className="lab-secondary">
        Conhecer a plataforma <ArrowRight size={15} aria-hidden="true" />
      </a>
    </div>
  );
}
export function LiveEntry() {
  return (
    <div className="home lab-live">
      <div className="home-hero__study-links">
        <DailyChallengeBadge />
        <QuestionCountBadge />
      </div>
      <p className="lab-data-note">
        Contagem de questões demonstrativa nesta comparação. O desafio mantém suas regras reais.
      </p>
    </div>
  );
}
export function Intro({ fixture }: { fixture: HeroFixture }) {
  return (
    <div className="lab-intro">
      <span className="lab-eyebrow">Carreiras policiais · Segurança pública</span>
      <h1>{fixture.title}</h1>
      <p>{fixture.description}</p>
      <Actions />
    </div>
  );
}
export function Method() {
  return (
    <section id="plataforma" className="lab-method" aria-labelledby="lab-method-title">
      <div>
        <span className="lab-eyebrow">Da escolha à próxima sessão</span>
        <h2 id="lab-method-title">Um caminho claro para estudar.</h2>
      </div>
      <ol>
        {[
          [
            Target,
            "Escolha seu objetivo",
            "Defina a carreira e o edital que orientam sua preparação.",
          ],
          [
            BookOpenCheck,
            "Pratique com direção",
            "Resolva questões, consulte as fontes e revise seus erros.",
          ],
          [
            FileSearch,
            "Acompanhe sua evolução",
            "Use seu desempenho para decidir o próximo assunto.",
          ],
        ].map(([Icon, title, text]) => {
          const Component = Icon as typeof Target;
          return (
            <li key={String(title)}>
              <Component size={20} aria-hidden="true" />
              <div>
                <h3>{String(title)}</h3>
                <p>{String(text)}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
