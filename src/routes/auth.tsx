import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { NorteBrand } from "@/components/brand/NorteBrand";
import { normalizeUppercase, validateCPF } from "@/lib/utils";

function friendlyAuthError(error: unknown) {
  const raw = error instanceof Error ? error.message : "";
  if (/invalid login credentials/i.test(raw))
    return "E-mail/CPF ou senha incorretos. Confira os dados e tente novamente.";
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
  validateSearch: (search: Record<string, unknown>): { mode?: "register" | undefined } => ({
    mode: search["mode"] === "register" ? "register" : undefined,
  }),
  component: AuthPage,
  head: () => ({
    title: "Acessar plataforma | Norte Concurso",
    meta: [{ name: "description", content: "Entre na sua central de preparação Norte Concurso." }],
  }),
});

function AuthPage() {
  const routeSearch = Route.useSearch();
  const [mode, setMode] = useState<"login" | "register">(routeSearch.mode || "login");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [login, setLogin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (formError) errorRef.current?.focus();
  }, [formError]);

  useEffect(() => {
    setFormError(null);
  }, [mode]);

  const normalizeCpf = (value: string) => value.replace(/\D/g, "").slice(0, 11);
  const formatCpf = (value: string) => {
    const digits = normalizeCpf(value);
    return digits
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  };

  const handleAuth = async (e: React.FormEvent) => {
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
          toast.success("Conta criada! Confirme seu e-mail pelo link que enviamos para entrar.");
          setMode("login");
        }
      } else {
        // Contas antigas entram pelo CPF (e-mail interno); contas novas, pelo e-mail real.
        const id = login.trim();
        let loginEmail = id.toLowerCase();
        if (!id.includes("@")) {
          const cpfDigits = normalizeCpf(id);
          if (!validateCPF(cpfDigits)) throw new Error("CPF inválido. Confira os números.");
          loginEmail = `${cpfDigits}@norteconcurso.local`;
        }
        const { error } = await supabase.auth.signInWithPassword({
          email: loginEmail,
          password: pin,
        });
        if (error) throw error;
        toast.success("Bem-vindo à sua preparação!");
        navigate({ to: "/dashboard" });
      }
    } catch (error: unknown) {
      setFormError(friendlyAuthError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth">
      <section className="auth-visual">
        <Link to="/" aria-label="Norte Concurso — início" className="w-fit">
          <NorteBrand light />
        </Link>
        <div>
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
            <span>Acesso individual por CPF.</span>
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <Link to="/" className="auth-back">
          <ArrowLeft /> Voltar para o início
        </Link>
        <div className="auth-card">
          <img src="/media/hero/auth-seguranca.jpg" alt="Policiais e bombeiro da segurança pública" className="auth-photo" width={1600} height={1200} />
          <div className="auth-mobile-brand">
            <NorteBrand />
          </div>
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
                ? "Entre com seu e-mail (ou CPF, em contas antigas) e continue de onde parou."
                : "Leva menos de dois minutos para começar."}
            </p>
          </div>
          <form onSubmit={handleAuth} className="auth-form">
            {mode === "register" && (
              <div className="auth-field">
                <Label htmlFor="name">Nome completo</Label>
                <div className="auth-field__control">
                  <UserRound />
                  <Input
                    id="name"
                    autoComplete="name"
                    placeholder="Como podemos chamar você?"
                    value={name}
                    onChange={(e) => setName(normalizeUppercase(e.target.value))}
                    className="uppercase"
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
              <Label htmlFor="cpf">{mode === "register" ? "CPF" : "E-mail ou CPF"}</Label>
              <div className="auth-field__control">
                <IdCard />
                <Input
                  id="cpf"
                  inputMode={mode === "register" ? "numeric" : "email"}
                  autoComplete="username"
                  {...(formError ? { "aria-invalid": true, "aria-describedby": "auth-error" } : {})}
                  placeholder={mode === "register" ? "000.000.000-00" : "seuemail@exemplo.com ou CPF"}
                  value={mode === "register" ? cpf : login}
                  onChange={(e) =>
                    mode === "register" ? setCpf(formatCpf(e.target.value)) : setLogin(e.target.value)
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
                    onClick={() =>
                      toast.info("Para redefinir sua senha, fale com o suporte da Norte Concurso.")
                    }
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
                  {...(formError ? { "aria-invalid": true, "aria-describedby": "auth-error" } : {})}
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
              <div ref={errorRef} id="auth-error" role="alert" tabIndex={-1} className="auth-error">
                <AlertCircle />
                <span>{formError}</span>
              </div>
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
          <div className="auth-security">
            <ShieldCheck />
            <span>Ambiente criptografado · seus dados não são compartilhados</span>
          </div>
          <p className="auth-dev-signature">Dev. Franc D'nis · Feijó-AC, Brasil</p>
        </div>
      </section>
    </main>
  );
}
