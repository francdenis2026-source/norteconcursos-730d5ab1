import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpenCheck, CheckCircle2, ChevronRight, ShieldCheck, Target } from "lucide-react";
import { DailyChallengeBadge } from "@/components/landing/DailyChallengeBadge";
import { ContestShowcase } from "@/components/landing/ContestShowcase";
import { HeroBadge } from "@/components/landing/HeroBadge";
import { TacticalClockBackdrop } from "@/components/brand/TacticalClockBackdrop";

export function MobileHomepage() {
  return (
    <div className="mobile-homepage" aria-label="Norte Concursos para celular">
      <section className="mobile-homepage__hero">
        <TacticalClockBackdrop />
        <img src="/media/hero/hero-norte-recorte.webp" alt="Agente de segurança pública" />
        <div className="mobile-homepage__hero-shade" />
        <HeroBadge />
        <div className="mobile-homepage__hero-copy">
          <span className="mobile-homepage__eyebrow"><span /> Preparação para carreiras policiais</span>
          <h1>Seu próximo passo começa <em>com direção.</em></h1>
          <p>Questões, editais e simulados para transformar seu estudo em preparação real.</p>
          <Link to="/auth" search={{ mode: "register" }} className="mobile-homepage__primary">Começar grátis <ArrowRight /></Link>
          <a href="#mobile-recursos" className="mobile-homepage__secondary">Ver como funciona <ChevronRight /></a>
        </div>
      </section>
      <section className="mobile-homepage__daily">
        <div><span className="mobile-homepage__eyebrow"><span /> Ritmo diário</span><h2>Estude um pouco hoje. Chegue mais forte na prova.</h2><p>10 questões oficiais por dia, sem cadastro, com comentários para você entender cada resposta.</p></div>
        <DailyChallengeBadge />
      </section>
      <section id="mobile-recursos" className="mobile-homepage__resources">
        <div className="mobile-homepage__section-head"><span>O que você encontra</span><h2>Uma rotina que cabe no seu objetivo.</h2></div>
        <div className="mobile-homepage__cards">
          <article><BookOpenCheck /><strong>Treinador de questões</strong><p>Pratique por banca, cargo e disciplina.</p></article>
          <article><Target /><strong>Plano de estudos</strong><p>Saiba o que revisar e qual é o próximo passo.</p></article>
          <article><ShieldCheck /><strong>Conteúdo confiável</strong><p>Fontes oficiais e revisões identificadas.</p></article>
        </div>
        <Link to="/auth" search={{ mode: "register" }} className="mobile-homepage__wide-link">Conhecer a plataforma <ArrowRight /></Link>
      </section>
      <section className="mobile-homepage__contests"><div className="mobile-homepage__section-head"><span>Concursos em foco</span><h2>Treine para a prova que importa.</h2></div><ContestShowcase /></section>
      <section className="mobile-homepage__closing"><CheckCircle2 /><div><strong>Preparação sem improviso.</strong><p>Escolha sua carreira e comece pelo diagnóstico.</p></div><Link to="/auth" search={{ mode: "register" }}>Criar conta</Link></section>
      <footer className="mobile-homepage__footer"><a className="mobile-homepage__qr" href="https://norteconcursos.xyz/" aria-label="Abrir a plataforma Norte Concursos"><img src="/media/brand/platform-qr.svg" alt="QR Code da plataforma Norte Concursos" /><span><strong>Acesse também pelo computador</strong><small>Aponte a câmera para abrir norteconcursos.xyz</small></span></a><strong>NORTE <span>CONCURSOS</span></strong><div><a href="/sobre">Sobre</a><a href="/suporte">Suporte</a><a href="/privacy">Privacidade</a><a href="/terms">Termos</a></div><small>© 2026 Norte Concursos · Feijó, Acre</small></footer>
    </div>
  );
}
