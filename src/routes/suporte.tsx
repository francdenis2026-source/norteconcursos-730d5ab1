import { acreDate } from "@/lib/acreTime";
import { SHARE_IMAGE_META } from "@/lib/shareImage";
import { Input } from "@/components/ui/input";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Copy,
  Download,
  ArrowUpRight,
  ArrowRight,
  Send,
  Search,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  FileText,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { InstitutionalWindow, WindowSections } from "@/components/landing/InstitutionalWindow";
import "@/styles/support-center.css";

export const Route = createFileRoute("/suporte")({
  component: Support,
  head: () => ({
    meta: [{ title: "Central de suporte | Norte Concursos" }, ...SHARE_IMAGE_META],
  }),
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
    "Na aba Enviar pedido, selecione ‘Conteúdo ou gabarito’. Inclua o identificador da questão, a alternativa ou trecho questionado e uma fonte oficial, quando houver. Para legislação, informe também a data da consulta.",
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
  const [supportTab, setSupportTab] = useState("duvidas");
  const [search, setSearch] = useState("");
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
    `Norte Concursos — ${topic}\n\n${description.trim()}\n\nData: ${acreDate().toLocaleDateString("pt-BR", { timeZone: "America/Rio_Branco" })}`;
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
  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const matchingFaq = FAQ.filter((item) =>
    normalize(item.join(" ")).includes(normalize(search.trim())),
  );
  const canSend =
    !sending &&
    !protocol &&
    description.trim().length >= 10 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyEmail.trim());
  return (
    <InstitutionalWindow
      page="/suporte"
      title="Como podemos ajudar?"
      description="Consulte as orientações ou envie um pedido à equipe. Seu relato continua disponível ao trocar de aba."
      image="/media/hero/auth-carreiras-composicao.webp"
    >
      <WindowSections
        label="Opções de suporte"
        value={supportTab}
        onValueChange={setSupportTab}
        sections={[
          {
            id: "duvidas",
            label: "Dúvidas frequentes",
            content: (
              <div>
                {" "}
                <section className="sc-help" aria-labelledby="support-faq-title">
                  <span className="sc-eyebrow">Orientação rápida</span>
                  <h2 id="support-faq-title">Talvez a resposta esteja aqui.</h2>
                  <p className="sc-section-intro">
                    Consulte as dúvidas mais comuns antes de preparar seu pedido.
                  </p>
                  <label className="sc-search" htmlFor="support-search">
                    <Search size={17} aria-hidden="true" />
                    <span className="sr-only">Buscar nas perguntas frequentes</span>
                    <input
                      id="support-search"
                      type="search"
                      placeholder="Busque por acesso, plano, questões…"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      aria-controls="support-faq-list"
                    />
                  </label>
                  <div className="sc-faq" id="support-faq-list">
                    {matchingFaq.map(([question, answer]) => (
                      <details key={question}>
                        <summary>
                          {question}
                          <ChevronDown size={16} aria-hidden="true" />
                        </summary>
                        <p>{answer}</p>
                      </details>
                    ))}
                    {matchingFaq.length === 0 && (
                      <p className="sc-empty" role="status">
                        Não encontramos uma resposta para essa busca. Você pode descrever sua dúvida
                        no formulário.
                      </p>
                    )}
                  </div>
                  <aside className="sc-note">
                    <ShieldCheck size={21} aria-hidden="true" />
                    <div>
                      <h3>Seu relato, com segurança.</h3>
                      <p>
                        Compartilhe apenas o necessário. Senhas e dados de cartão nunca devem fazer
                        parte de um pedido de suporte.
                      </p>
                      <Link to="/privacy">
                        Conheça nossa política de privacidade{" "}
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </Link>
                    </div>
                  </aside>
                  <div className="sc-help-links">
                    <Link to="/auth">
                      Recuperar meu acesso <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                    <Link to="/desafio-diario">
                      Conhecer o desafio diário <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </section>
                <button
                  type="button"
                  className="iw-about-cta"
                  onClick={() => setSupportTab("support-request")}
                >
                  Não encontrei a resposta · Enviar pedido{" "}
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            ),
          },
          {
            id: "support-request",
            label: "Enviar pedido",
            content: (
              <div>
                <h2>Fale com a equipe.</h2>
                <div className="iw-support-topics">
                  {["Acesso à conta", "Conteúdo ou gabarito", "Plano e assinatura"].map((item) => (
                    <button
                      type="button"
                      key={item}
                      aria-pressed={topic === item}
                      disabled={sending || !!protocol}
                      onClick={() => setTopic(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>{" "}
                <section
                  id="support-request"
                  className="sc-request"
                  aria-labelledby="support-request-title"
                >
                  <div className="sc-request__heading">
                    <span className="sc-topic-icon">
                      <FileText size={21} aria-hidden="true" />
                    </span>
                    <div>
                      <span className="sc-eyebrow">Fale com a equipe</span>
                      <h2 id="support-request-title">Como podemos ajudar?</h2>
                    </div>
                  </div>
                  <p className="sc-section-intro">
                    Conte o que aconteceu. Após o envio, guarde o protocolo do seu pedido.
                  </p>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      if (canSend) void send();
                    }}
                    aria-busy={sending}
                  >
                    <fieldset disabled={sending || !!protocol}>
                      <legend className="sr-only">Dados do pedido de suporte</legend>
                      <div className="sc-form-row">
                        <div>
                          <label htmlFor="support-topic">Assunto</label>
                          <select
                            id="support-topic"
                            value={topic}
                            onChange={(event) => {
                              setTopic(event.target.value);
                              setStatus("");
                            }}
                          >
                            {[
                              "Acesso à conta",
                              "Conteúdo ou gabarito",
                              "Plano e assinatura",
                              "Privacidade e dados",
                              "Sugestão de melhoria",
                            ].map((item) => (
                              <option key={item}>{item}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="support-email">E-mail para retorno</label>
                          <Input
                            id="support-email"
                            type="email"
                            autoComplete="email"
                            maxLength={254}
                            required
                            value={replyEmail}
                            onChange={(event) => setReplyEmail(event.target.value)}
                            placeholder="voce@exemplo.com"
                          />
                        </div>
                      </div>
                      <label htmlFor="support-description">O que aconteceu?</label>
                      <textarea
                        id="support-description"
                        rows={6}
                        minLength={10}
                        maxLength={5000}
                        required
                        value={description}
                        onChange={(event) => {
                          setDescription(event.target.value);
                          setStatus("");
                        }}
                        placeholder="Informe a tela, o que tentou fazer e o resultado. Se for uma questão, inclua o identificador e a fonte consultada."
                        aria-describedby="support-description-help"
                      />
                      <div className="sc-field-hint" id="support-description-help">
                        <span>De 10 a 5.000 caracteres. Não inclua senhas.</span>
                        <span>{description.length.toLocaleString("pt-BR")}/5.000</span>
                      </div>
                    </fieldset>
                    <button
                      type="submit"
                      className="sc-button sc-button--gold sc-submit"
                      disabled={!canSend}
                    >
                      {sending ? (
                        <Loader2 className="sc-spinner" size={16} aria-hidden="true" />
                      ) : protocol ? (
                        <CheckCircle2 size={16} aria-hidden="true" />
                      ) : (
                        <Send size={16} aria-hidden="true" />
                      )}
                      {protocol
                        ? "Pedido enviado"
                        : sending
                          ? "Enviando pedido…"
                          : "Enviar pedido de suporte"}
                    </button>
                  </form>
                  <div className="sc-export">
                    <span>Prefere guardar uma cópia?</span>
                    <div>
                      <button type="button" disabled={!description.trim()} onClick={copy}>
                        <Copy size={14} aria-hidden="true" /> Copiar
                      </button>
                      <button type="button" disabled={!description.trim()} onClick={download}>
                        <Download size={14} aria-hidden="true" /> Baixar relato
                      </button>
                    </div>
                  </div>
                  <div className="sc-feedback" role="status" aria-atomic="true">
                    {status && <p>{status}</p>}
                    {protocol && (
                      <p className="sc-protocol">
                        Protocolo <strong>{protocol}</strong>
                      </p>
                    )}
                  </div>
                  {sendError && (
                    <p className="sc-error" role="alert">
                      {sendError}
                    </p>
                  )}
                  {email ? (
                    <a
                      className="sc-email"
                      href={`mailto:${email}?subject=${encodeURIComponent(`Norte Concursos — ${topic}`)}&body=${encodeURIComponent(description)}`}
                    >
                      Abrir e-mail para o suporte <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  ) : (
                    <p className="sc-channel">
                      Seu pedido é encaminhado à administração da Norte Concursos por esta página.
                    </p>
                  )}
                </section>
              </div>
            ),
          },
        ]}
      />
    </InstitutionalWindow>
  );
}
