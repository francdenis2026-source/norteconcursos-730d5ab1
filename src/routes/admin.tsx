import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
const OWNER_EMAIL = "francdenisbr@gmail.com";
import { NorteBrand } from "@/components/brand/NorteBrand";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Área do administrador | Norte Concurso" },
      { name: "description", content: "Acesso restrito para administrar alunos, provas, planos e uso de IA do Norte Concurso." },
      { property: "og:title", content: "Área do administrador | Norte Concurso" },
      { property: "og:description", content: "Acesso restrito da administração do Norte Concurso." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLoginPage,
});

/** Login separado da administração: só deixa passar contas com papel de admin. */
function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const { data, error: sErr } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (sErr || !data.user) throw new Error("E-mail ou senha incorretos.");
      const isOwner = data.user.email?.toLowerCase() === OWNER_EMAIL.toLowerCase();
      const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: data.user.id, _role: "admin" });
      if (!isOwner && !isAdmin) {
        await supabase.auth.signOut();
        throw new Error("Esta conta não tem acesso de administrador.");
      }
      toast.success("Bem-vindo à administração.");
      navigate({ to: "/dashboard/admin-students" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível entrar.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-svh place-items-center bg-background px-4 py-10">
      <div className="w-full max-w-sm space-y-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Voltar ao site
        </Link>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
          <NorteBrand />
          <p className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
            <ShieldCheck className="h-4 w-4" aria-hidden /> Acesso restrito
          </p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Área do administrador</h1>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="adm-email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                <Input id="adm-email" type="email" required autoComplete="username" className="pl-9" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="adm-pass">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                <Input id="adm-pass" type="password" required autoComplete="current-password" className="pl-9" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            {error && <p role="alert" className="rounded-md bg-destructive/10 p-2 text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-label="Entrando" /> : "Entrar na administração"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
