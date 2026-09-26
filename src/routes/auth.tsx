import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  UserRound,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    title: "Acessar plataforma | Norte Concurso",
    meta: [{ name: "description", content: "Entre na sua central de preparação Norte Concurso." }],
  }),
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    setIsLoading(true);
    try {
      if (mode === "register") {
        const cpfDigits = normalizeCpf(cpf);
        if (cpfDigits.length !== 11) throw new Error("Informe um CPF com 11 números.");
        const { error } = await supabase.auth.signUp({
          email: `${cpfDigits}@norteconcurso.local`,
          password: pin,
          options: { data: { full_name: name, cpf: cpfDigits, contact_email: email } },
        });
        if (error) throw error;
        toast.success("Conta criada! Agora você pode acessar com seu CPF.");
      } else {
        const cpfDigits = normalizeCpf(cpf);
        if (cpfDigits.length !== 11) throw new Error("Informe um CPF com 11 números.");
        const { error } = await supabase.auth.signInWithPassword({
          email: `${cpfDigits}@norteconcurso.local`,
          password: pin,
        });
        if (error) throw error;
        toast.success("Bem-vindo à sua preparação!");
        navigate({ to: "/dashboard" });
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Não foi possível autenticar");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-visual">
        <div className="auth-visual-image" />
        <div className="auth-visual-content">
          <Link to="/" className="brand-lockup">
            <span className="brand-mark">
              <Star aria-hidden="true" />
            </span>
            <span className="text-white">
              Norte<span>Concurso</span>
            </span>
          </Link>
          <div className="auth-message">
            <span className="eyebrow">
              <Sparkles /> Método, dados e direção
            </span>
            <h1>Sua aprovação começa com uma decisão clara.</h1>
            <p>
              Entre no ambiente que transforma seus resultados em um plano de estudo vivo e
              objetivo.
            </p>
          </div>
          <div className="auth-benefits">
            <span>
              <Target /> Prioridades personalizadas
            </span>
            <span>
              <Trophy /> Evolução mensurável
            </span>
            <span>
              <ShieldCheck /> Dados protegidos
            </span>
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <Link to="/" className="auth-back">
            <ArrowLeft /> Voltar para o início
          </Link>
          <div className="auth-mobile-brand">
            <span className="brand-mark">
              <Star aria-hidden="true" />
            </span>
            <strong>
              Norte<span>Concurso</span>
            </strong>
          </div>
          <div className="auth-heading">
            <span>{mode === "login" ? "BEM-VINDO DE VOLTA" : "COMECE SUA JORNADA"}</span>
            <h2>{mode === "login" ? "Acesse sua preparação" : "Crie sua conta gratuita"}</h2>
            <p>
              {mode === "login"
                ? "Entre com seu CPF e continue de onde parou."
                : "Leva menos de dois minutos para começar."}
            </p>
          </div>
          <form onSubmit={handleAuth} className="auth-form">
            {mode === "register" && (
              <div className="auth-field">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  placeholder="Como podemos chamar você?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            {mode === "register" && (
              <div className="auth-field">
                <Label htmlFor="email">E-mail para contato</Label>
                <div>
                  <Mail />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            <div className="auth-field">
              <Label htmlFor="cpf">CPF</Label>
              <div>
                <UserRound />
                <Input
                  id="cpf"
                  inputMode="numeric"
                  autoComplete="username"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(formatCpf(e.target.value))}
                  required
                />
              </div>
            </div>
            <div className="auth-field">
              <div className="flex items-center justify-between">
                <Label htmlFor="pin">Senha de acesso</Label>
                {mode === "login" && <button type="button">Esqueci minha senha</button>}
              </div>
              <div>
                <Lock />
                <Input
                  id="pin"
                  type={showPin ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
                <button
                  type="button"
                  aria-label="Mostrar senha"
                  onClick={() => setShowPin(!showPin)}
                >
                  {showPin ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            {mode === "register" && (
              <label className="auth-terms">
                <Checkbox required />
                <span>
                  Aceito os <Link to="/terms">termos de uso</Link> e a{" "}
                  <Link to="/privacy">política de privacidade</Link>.
                </span>
              </label>
            )}
            <Button type="submit" className="premium-button h-12 w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  {mode === "login" ? "Entrar na plataforma" : "Criar minha conta"}
                  <ArrowRight />
                </>
              )}
            </Button>
          </form>
          <div className="auth-switch">
            <span>{mode === "login" ? "Ainda não tem uma conta?" : "Já faz parte da Norte?"}</span>
            <button onClick={() => setMode(mode === "login" ? "register" : "login")}>
              {mode === "login" ? "Criar conta grátis" : "Fazer login"}
            </button>
          </div>
          <div className="auth-security">
            <ShieldCheck />
            <span>Ambiente criptografado e seguro</span>
            <Check />
          </div>
        </div>
      </section>
    </main>
  );
}
