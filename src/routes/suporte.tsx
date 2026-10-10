import { Input } from "@/components/ui/input";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Download, ArrowUpRight, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { InstitutionalLayout } from "@/components/landing/InstitutionalLayout";

export const Route = createFileRoute("/suporte")({
  component: Support,
  head: () => ({ meta: [{ title: "Central de suporte | Norte Concursos" }] }),
});
const FAQ = [
  [
    "Por onde começo a estudar?",
    "Escolha a carreira e o edital, resolva um diagnóstico e priorize os assuntos em que precisa evoluir. Alterne treino de questões, revisão e simulados para acompanhar seu progresso.",
  ],
  [
    "Posso experimentar antes de criar uma conta?",
    "Sim. O desafio diário oferece uma primeira experiência de resolução. O acesso de visitante tem limites; uma conta permite acessar a sua área de estudos conforme os recursos disponíveis.",
  ],
  [
    "Encontrei uma questão com erro. Como relatar?",
    "Selecione ‘Conteúdo ou gabarito’ no relato abaixo. Inclua o identificador da questão, a alternativa ou trecho questionado e uma fonte oficial, quando houver. Para legislação, informe também a data da consulta.",
  ],
  [
    "Não consigo entrar na minha conta.",
    "Entre com o e-mail cadastrado e a senha. Contas antigas também aceitam CPF. Se esqueceu a senha, use “Esqueci minha senha” na tela de acesso. Tente novamente em uma janela privada para descartar uma sessão antiga. Nunca compartilhe sua senha no relato de suporte.",
  ],
  [
    "Meu acesso ao plano está diferente do esperado.",
    "Confira a conta usada na contratação e as informações do plano. Prepare um relato indicando o recurso esperado e o que aparece na tela. Não inclua dados de cartão ou senha.",
  ],
  [
    "Como trato uma solicitação sobre meus dados?",
    "Revise primeiro a página de Privacidade. Se precisar de orientação adicional, escolha ‘Privacidade e dados’ no relato e descreva a solicitação usando apenas as informações necessárias.",
  ],
];
function Support() {
  const [topic, setTopic] = useState("Acesso à conta");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [replyEmail, setReplyEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [protocol, setProtocol] = useState<string | null>(null);
  const [sendError, setSendError] = useState("");
  async function send() {
    if (sending || protocol) return;
    setSending(true);
    setSendError("");
    try {
      const { data, error } = await supabase.rpc("submit_support_request", {
        p_topic: topic,
        p_description: description.trim(),
        p_reply_email: replyEmail.trim().toLowerCase(),
      });
      if (error) throw error;
      setProtocol(String(data));
      setStatus("Pedido enviado à central de atendimento. Guarde o protocolo abaixo.");
    } catch {
      setSendError(
        "Não foi possível enviar. Confira os dados; se já enviou três pedidos nesta hora, aguarde. Seu relato continua disponível para copiar ou baixar.",
      );
    } finally {
      setSending(false);
    }
  }
  const email = import.meta.env["VITE_SUPPORT_EMAIL"] as string | undefined;
  const report = () =>
    `Norte Concursos — ${topic}\n\n${description.trim()}\n\nData: ${new Date().toLocaleDateString("pt-BR")}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(report());
      setStatus("Relato copiado. Ele ainda não foi enviado.");
    } catch {
      setStatus("Não foi possível copiar. Use a opção de baixar o relato.");
    }
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([report()], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "relato-norte-concursos.txt";
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("Relato baixado. Ele ainda não foi enviado.");
  };
  return (
    <InstitutionalLayout
      eyebrow="Central de ajuda"
      title="Seu estudo merece seguir em frente."
      intro="Encontre uma orientação rápida ou organize um relato claro para resolver um problema."
    >
      <div className="support-shortcuts lp-container">
        <Link to="/auth">
          <span>01 · ACESSO</span>
          <h2>
            Entrar na conta <ArrowUpRight />
          </h2>
          <p>Retome sua rotina de preparação.</p>
        </Link>
        <Link to="/desafio-diario">
          <span>02 · PRIMEIRO PASSO</span>
          <h2>
            Experimentar o treino <ArrowUpRight />
          </h2>
          <p>Conheça a experiência com uma questão.</p>
        </Link>
        <Link to="/privacy">
          <span>03 · TRANSPARÊNCIA</span>
          <h2>
            Entender meus dados <ArrowUpRight />
          </h2>
          <p>Consulte informações de privacidade.</p>
        </Link>
      </div>
      <div className="support-grid lp-container">
        <section className="support-faq">
          <span className="lp-kicker">Respostas que ajudam</span>
          <h2>Perguntas frequentes</h2>
          {FAQ.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </section>
        <section className="support-report">
          <span className="lp-kicker">Do problema ao próximo passo</span>
          <h2>Prepare seu relato</h2>
          <p>
            Descreva a tela, o que tentou fazer e o que aconteceu. Não inclua senhas ou dados de
            pagamento.
          </p>
          <label htmlFor="support-topic">Assunto</label>
          <select
            id="support-topic"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              setStatus("");
            }}
          >
            {[
              "Acesso à conta",
              "Conteúdo ou gabarito",
              "Plano e assinatura",
              "Privacidade e dados",
              "Sugestão de melhoria",
            ].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <label htmlFor="support-email">E-mail para retorno</label>
          <Input
            id="support-email"
            className="institutional-input"
            type="email"
            autoComplete="email"
            maxLength={254}
            value={replyEmail}
            onChange={(e) => setReplyEmail(e.target.value)}
            disabled={!!protocol}
          />
          <label htmlFor="support-description">O que aconteceu?</label>
          <textarea
            id="support-description"
            rows={6}
            maxLength={5000}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setStatus("");
            }}
            placeholder="Ex.: na questão…, encontrei o trecho… A fonte consultada foi…"
          />
          <div className="support-actions">
            <button
              className="btn-brass"
              disabled={
                sending ||
                !!protocol ||
                description.trim().length < 10 ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyEmail.trim())
              }
              onClick={send}
            >
              <Send size={16} /> {protocol ? "Enviado" : sending ? "Enviando…" : "Enviar pedido"}
            </button>
            <button className="btn-brass" disabled={!description.trim()} onClick={copy}>
              <Copy size={16} /> Copiar relato
            </button>
            <button className="btn-glass" disabled={!description.trim()} onClick={download}>
              <Download size={16} /> Baixar
            </button>
          </div>
          <p role="status" className="support-status">
            {status}
          </p>
          {protocol && (
            <p className="break-all">
              Protocolo: <strong>{protocol}</strong>
            </p>
          )}
          {sendError && <p role="alert">{sendError}</p>}
          {email ? (
            <a
              className="founder-link"
              href={`mailto:${email}?subject=${encodeURIComponent(`Norte Concursos — ${topic}`)}&body=${encodeURIComponent(description)}`}
            >
              Abrir e-mail para o suporte <ArrowUpRight size={16} />
            </a>
          ) : (
            <p className="support-channel">
              Seu pedido pode ser enviado por esta página e será recebido pela administração da
              Norte Concursos. Não inclua senhas ou dados de pagamento. Para recuperar a senha, use
              “Esqueci minha senha” na tela de acesso.
            </p>
          )}
        </section>
      </div>
    </InstitutionalLayout>
  );
}
