import "@/styles/auth-art.css";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PasswordRecovery } from "@/components/PasswordRecovery";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  IdCard,
  Loader2,
  Lock,
  Mail,
  UserRound,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { supabase, isEmailRecoveryPending, completeEmailAuthCallback } from "@/integrations/supabase/client";
import { callbackErrorMessage, type CallbackError } from "@/lib/authCallback";
import { toast } from "sonner";
import { NorteBrand } from "@/components/brand/NorteBrand";
import { normalizeUppercase, validateCPF } from "@/lib/utils";
import { TESTING_DAYS, TESTING_PHASE } from "@/lib/launch.config";

function friendlyAuthError(error: unknown) {
  const raw = error instanceof Error ? error.message : "";
  if (/invalid login credentials/i.test(raw))
    return "E-mail ou senha incorretos. Confira os dados e tente novamente.";
  if (/already registered|already been registered|database error/i.test(raw))
    return "CPF ou e-mail já cadastrado. Use a aba Entrar.";
  if (/email not confirmed/i.test(raw))
    return "Confirme seu e-mail pelo link que enviamos antes de entrar.";
  if (/password should be at least|weak/i.test(raw))
    return "Escolha uma senha mais forte, com pelo menos 6 caracteres.";
  if (/rate limit|too many/i.test(raw))
    return "Muitas tentativas seguidas. Aguarde um instante e tente de novo.";
  if (/failed to fetch|network/i.test(raw))
    return "Sem conexão com o servidor. Verifique sua internet e tente de novo.";
  return raw || "Não foi possível autenticar. Tente novamente.";
}

export const Route = createFileRoute("/auth")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { mode?: "register" | undefined; recovery?: boolean; callbackError?: CallbackError | undefined; reason?: "inactive" | "another-device" | undefined } => ({
    mode: search["mode"] === "register" ? "register" : undefined,
    recovery: search["recovery"] === true || search["recovery"] === "true",
    callbackError: ["expired", "invalid", "failed"].includes(String(search["callbackError"])) ? search["callbackError"] as CallbackError : undefined,
    reason: search["reason"] === "inactive" || search["reason"] === "another-device" ? search["reason"] : undefined,
  }),
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Acessar plataforma | Norte Concurso" },
      { name: "description", content: "Entre na sua central de preparação Norte Concurso." },
    ],
  }),
});

function AuthPage() {
  const routeSearch = Route.useSearch();
  const [mode, setMode] = useState<"login" | "register" | "reset">(routeSearch.mode || "login");
  const [recoverySession, setRecoverySession] = useState(false);
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [login, setLogin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  /** Login feito neste formulário: o próprio formulário avisa, o listener de sessão fica quieto. */
  const manualAuth = useRef(false);
  const navigate = useNavigate();
  /** E-mail aguardando confirmação (tela de boas-vindas após cadastro). */
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  /** E-mail de login recusado por falta de confirmação (mostra botão de reenvio). */
  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (formError) errorRef.current?.focus();
  }, [formError]);

  useEffect(() => {
    setFormError(null);
    setUnconfirmedEmail(null);
  }, [mode]);

  // Entrada automática: ao confirmar o e-mail (link volta para /auth ou outra aba confirma),
  // a sessão chega aqui e o aluno é levado direto ao painel.
  useEffect(() => {
    let active = true;
    void completeEmailAuthCallback().then(({ session, error, recovery }) => {
      if (!active) return;
      const failure = routeSearch.callbackError ?? error;
      if (failure) { setFormError(callbackErrorMessage(failure)); return; }
      if (routeSearch.recovery || recovery) {
        setMode("reset");
        setRecoverySession(!!session);
      } else if (session) navigate({ to: "/dashboard", replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) {
        setRecoverySession(true);
        setMode("reset");
        return;
      }
      if (routeSearch.recovery || isEmailRecoveryPending() || routeSearch.callbackError) return;
      if (event === "SIGNED_IN" && session) {
        // Entrada sem passar pelo formulário = clique no link de confirmação (outra aba ou e-mail).
        if (!manualAuth.current) {
          toast.success("E-mail confirmado com sucesso!", {
            id: "auth-welcome",
            description: "Seu acesso está liberado. Bem-vindo à sua área de estudos da Norte Concurso.",
            duration: 7000,
          });
        }
        navigate({ to: "/dashboard" });
      }
    });
    return () => { active = false; sub.subscription.unsubscribe(); };
  }, [navigate, routeSearch.recovery, routeSearch.callbackError]);
  useEffect(() => {
    if (routeSearch.reason === "inactive") toast.message("Sessão encerrada por inatividade", { id: "auth-reason", description: "Passaram-se mais de 5 minutos sem interação. Entre novamente para continuar de onde parou." });
    if (routeSearch.reason === "another-device") toast.message("Sessão encerrada", { id: "auth-reason", description: "Sua conta foi aberta em outro aparelho." });
  }, [routeSearch.reason]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const resendConfirmation = async (target: string) => {
    if (cooldown > 0 || resending) return;
    setResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: target,
        options: { emailRedirectTo: `${window.location.origin}/auth` },
      });
      if (error) throw error;
      toast.success(`Novo e-mail de confirmação enviado para ${target}.`);
      setCooldown(60);
    } catch (error: unknown) {
      toast.error(friendlyAuthError(error));
    } finally {
      setResending(false);
    }
  };

  const normalizeCpf = (value: string) => value.replace(/\D/g, "").slice(0, 11);
  const formatCpf = (value: string) => {
    const digits = normalizeCpf(value);
    return digits
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  };

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsLoading(true);
    try {
      if (mode === "register") {
        const cpfDigits = normalizeCpf(cpf);
        if (!validateCPF(cpfDigits)) throw new Error("CPF inválido. Confira os números.");
        const { data, error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password: pin,
          options: {
            data: { full_name: normalizeUppercase(name.trim()), cpf: cpfDigits },
            emailRedirectTo: `${window.location.origin}/auth`,
          },
        });
        if (error) throw error;
        if (data.session) {
          toast.success("Conta criada!");
          navigate({ to: "/dashboard" });
        } else {
          setPendingEmail(email.trim().toLowerCase());
          setCooldown(60);
        }
      } else {
        // Contas antigas entram pelo CPF (e-mail interno); contas novas, pelo e-mail real.
        const id = login.trim();
        let loginEmail = id.toLowerCase();
        if (!id.includes("@")) {
          const cpfDigits = normalizeCpf(id);
          if (!validateCPF(cpfDigits)) throw new Error("CPF inválido. Confira os números.");
          // CPF é compatibilidade com contas antigas; nunca resolve ou expõe o e-mail real.
          loginEmail = `${cpfDigits}@norteconcurso.local`;
        }
        manualAuth.current = true;
        const { error } = await supabase.auth.signInWithPassword({
          email: loginEmail,
          password: pin,
        });
        if (error) {
          if (
            /email not confirmed/i.test(error.message) &&
            loginEmail.includes("@") &&
            !loginEmail.endsWith(".local")
          ) {
            setUnconfirmedEmail(loginEmail);
          }
          manualAuth.current = false;
          throw error;
        }
        toast.success("Bem-vindo de volta", {
          id: "auth-welcome",
          description: "Sua preparação continua de onde parou.",
        });
        navigate({ to: "/dashboard" });
      }
    } catch (error: unknown) {
      setFormError(friendlyAuthError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth" data-auth-mode={mode}>
      <section className="auth-visual">
        <Link to="/" aria-label="Norte Concurso — início" className="w-fit">
          <NorteBrand light />
        </Link>
        <figure className="auth-artwork">
          <img src="/media/hero/auth-carreiras-composicao.webp" alt="Composição de carreiras policiais com distintivo, equipe tática e cão policial" width={1440} height={600} fetchPriority="high" />
        </figure>
        <div className="auth-visual-copy">
          <span className="chip-brass">
            <Sparkles /> Preparação para carreiras policiais
          </span>
          <h1>
            Entre em operação com <em>um plano claro.</em>
          </h1>
          <p>
            Acesse o ambiente que transforma questões, simulados e desempenho em decisões de estudo.
          </p>
        </div>
        <div className="auth-benefits">
          <div>
            <Target />
            <strong>Prioridades personalizadas</strong>
            <span>Rota ajustada ao seu cargo e banca.</span>
          </div>
          <div>
            <Trophy />
            <strong>Evolução mensurável</strong>
            <span>Precisão e ritmo em cada sessão.</span>
          </div>
          <div>
            <ShieldCheck />
            <strong>Dados protegidos</strong>
            <span>Acesso individual com e-mail e senha.</span>
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <Link to="/" className="auth-back">
          <ArrowLeft /> Voltar para o início
        </Link>
        <div className="auth-card">
          <div className="auth-identity">
            <img src="/media/brand/distintivo-carreiras-hd.webp" alt="Distintivo Carreiras Policiais" width={96} height={116} />
            <div><span>CARREIRAS POLICIAIS</span><strong>Sua próxima conquista começa aqui.</strong><p>Questões, simulados e evolução em um só lugar.</p></div>
          </div>
          <div className="auth-mobile-brand">
            <NorteBrand />
          </div>
          {mode === "reset" ? (
            <PasswordRecovery
              hasSession={recoverySession}
              onBack={() => {
                setMode("login");
                setRecoverySession(false);
                navigate({ to: "/auth", search: {} });
              }}
              onComplete={() => navigate({ to: "/dashboard" })}
            />
          ) : pendingEmail ? (
            <div className="space-y-5 text-center" role="status" aria-live="polite">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail className="h-7 w-7" />
              </div>
              <div className="auth-heading">
                <h2>Falta só confirmar seu e-mail</h2>
                <p>
                  Cadastro realizado! Enviamos as instruções para{" "}
                  <strong className="break-all text-foreground">{pendingEmail}</strong>.
                </p>
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-left text-sm text-foreground">
                <ol className="list-decimal space-y-3 pl-5">
                  <li>Abra sua <strong>caixa de entrada</strong> e procure o e-mail de confirmação da Norte Concurso.</li>
                  <li>Não encontrou? Confira também <strong>Spam, Lixo eletrônico e Promoções</strong>. A mensagem pode levar alguns minutos para chegar.</li>
                  <li>Clique no <strong>link de confirmação</strong> para ativar sua conta e acessar a plataforma.</li>
                </ol>
              </div>
              <p className="text-sm text-muted-foreground">
                Após confirmar, você será direcionado à sua área de estudos. Se o acesso não abrir automaticamente, volte aqui e entre com seu e-mail e senha.
              </p>
              <button
                type="button"
                className="btn-brass auth-submit"
                disabled={resending || cooldown > 0}
                onClick={() => resendConfirmation(pendingEmail)}
              >
                {resending ? (
                  <Loader2 className="animate-spin" />
                ) : cooldown > 0 ? (
                  `Reenviar em ${cooldown}s`
                ) : (
                  "Reenviar e-mail de confirmação"
                )}
              </button>
              <button
                type="button"
                className="auth-link"
                onClick={() => {
                  setPendingEmail(null);
                  setMode("login");
                }}
              >
                Já confirmei — ir para Entrar
              </button>
            </div>
          ) : (
            <>
              <div className="auth-tabs" role="tablist" aria-label="Tipo de acesso">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "login"}
                  onClick={() => setMode("login")}
                >
                  Entrar
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "register"}
                  onClick={() => setMode("register")}
                >
                  Criar conta
                </button>
              </div>
              <div className="auth-heading">
                <h2>{mode === "login" ? "Acesse sua preparação" : "Crie sua conta gratuita"}</h2>
                <p>
                  {mode === "login"
                    ? "Entre com seu e-mail e continue de onde parou."
                    : "Leva menos de dois minutos para começar."}
                </p>
              </div>
              {mode === "register" && TESTING_PHASE && (
                <p className="auth-trial" role="note">
                  <Sparkles aria-hidden="true" />
                  <span>
                    <strong>{TESTING_DAYS} dias com a plataforma liberada (plano Plus)</strong>, sem cartão.
                    Depois, sua conta segue no plano Gratuito.
                  </span>
                </p>
              )}
              <form onSubmit={handleAuth} className="auth-form">
                {mode === "register" && (
                  <div className="auth-field">
                    <Label htmlFor="name">Nome completo</Label>
                    <div className="auth-field__control">
                      <UserRound />
                      <Input
                        id="name"
                        autoComplete="name"
                        autoCapitalize="characters"
                        className="uppercase placeholder:normal-case"
                        placeholder="Como podemos chamar você?"
                        value={name}
                        onChange={(e) => setName(normalizeUppercase(e.target.value))}
                        required
                      />
                    </div>
                  </div>
                )}
                {mode === "register" && (
                  <div className="auth-field">
                    <Label htmlFor="email">E-mail</Label>
                    <div className="auth-field__control">
                      <Mail />
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="seuemail@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}
                <div className={mode === "register" ? "auth-row" : "contents"}>
                  <div className="auth-field">
                    <Label htmlFor="cpf">{mode === "register" ? "CPF" : "E-mail"}</Label>
                    <div className="auth-field__control">
                      {mode === "register" ? <IdCard /> : <Mail />}
                      <Input
                        id="cpf"
                        inputMode={mode === "register" ? "numeric" : "email"}
                        autoComplete="username"
                        {...(formError
                          ? { "aria-invalid": true, "aria-describedby": "auth-error" }
                          : {})}
                        placeholder={
                          mode === "register" ? "000.000.000-00" : "seuemail@exemplo.com"
                        }
                        value={mode === "register" ? cpf : login}
                        onChange={(e) =>
                          mode === "register"
                            ? setCpf(formatCpf(e.target.value))
                            : setLogin(e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="auth-field">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="pin">Senha de acesso</Label>
                      {mode === "login" && (
                        <button
                          type="button"
                          className="auth-link"
                          onClick={() => setMode("reset")}
                        >
                          Esqueci minha senha
                        </button>
                      )}
                    </div>
                    <div className="auth-field__control">
                      <Lock />
                      <Input
                        id="pin"
                        type={showPin ? "text" : "password"}
                        autoComplete={mode === "login" ? "current-password" : "new-password"}
                        {...(formError
                          ? { "aria-invalid": true, "aria-describedby": "auth-error" }
                          : {})}
                        placeholder="Digite sua senha"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="auth-field__toggle"
                        aria-label={showPin ? "Ocultar senha" : "Mostrar senha"}
                        onClick={() => setShowPin(!showPin)}
                      >
                        {showPin ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>
                </div>
                {mode === "register" && (
                  <label className="auth-terms">
                    <Checkbox required className="mt-0.5" />
                    <span>
                      Aceito os <Link to="/terms">termos de uso</Link> e a{" "}
                      <Link to="/privacy">política de privacidade</Link>.
                    </span>
                  </label>
                )}
                {formError && (
                  <div
                    ref={errorRef}
                    id="auth-error"
                    role="alert"
                    tabIndex={-1}
                    className="auth-error"
                  >
                    <AlertCircle />
                    <span>{formError}</span>
                  </div>
                )}
                {unconfirmedEmail && (
                  <button
                    type="button"
                    className="auth-link"
                    disabled={resending || cooldown > 0}
                    onClick={() => resendConfirmation(unconfirmedEmail)}
                  >
                    {resending
                      ? "Enviando…"
                      : cooldown > 0
                        ? `E-mail reenviado · novo envio em ${cooldown}s`
                        : "Reenviar e-mail de confirmação"}
                  </button>
                )}
                <button type="submit" className="btn-brass auth-submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      {mode === "login" ? "Entrar na plataforma" : "Criar minha conta"}
                      <ArrowRight />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
          <div className="auth-security">
            <ShieldCheck />
            <span>Conexão protegida · acesso individual à sua conta</span>
          </div>
          <p className="auth-dev-signature">Desenvolvido por Franc Denis · Feijó, Acre, Brasil</p>
        </div>
      </section>
    </main>
  );
}
