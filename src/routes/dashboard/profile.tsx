import React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStatus } from "@/hooks/useDashboard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User, Mail, LogOut } from "lucide-react";
import { PageHero } from "@/components/dashboard/PageHero";
import { PlanStatusCard } from "@/components/dashboard/PlanStatusCard";
import { AvatarUploader } from "@/components/dashboard/AvatarUploader";
import { normalizeUppercase } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [{ title: "Meu Perfil | Norte Concurso" }],
  }),
});

function ProfilePage() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuthStatus();
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    newEmail: "",
  });

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        newEmail: "",
      });
    }
  }, [user]);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      if (!user) throw new Error("Entre novamente para atualizar seus dados.");
      const normalizedName = normalizeUppercase(formData.name.trim());
      const { error } = await supabase.auth.updateUser({
        data: { full_name: normalizedName, name: normalizedName },
      });
      if (error) throw error;
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ full_name: normalizedName })
        .eq("id", user.id);
      if (profileError) throw profileError;
      setFormData((previous) => ({ ...previous, name: normalizedName }));
      toast.success("Nome atualizado com sucesso!");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Erro ao atualizar nome");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newEmail === formData.email) {
      toast.error("O novo e-mail deve ser diferente do atual.");
      return;
    }
    setIsVerifying(true);
    try {
      const { error } = await supabase.auth.updateUser({
        email: formData.newEmail,
      });
      if (error) throw error;
      toast.info(
        "Um link de confirmação foi enviado para o novo e-mail. A alteração só será efetivada após a confirmação.",
      );
      setFormData((prev) => ({ ...prev, newEmail: "" }));
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Erro ao solicitar troca de e-mail");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut({ scope: "local" });
    await navigate({ to: "/", replace: true });
  };

  if (isLoading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHero
        image="auth"
        kicker="Conta"
        icon={User}
        title={
          <>
            Meu <em>perfil</em>
          </>
        }
        description="Atualize seus dados pessoais e de contato. Para cobrança e recibos, use Plano e assinatura."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="space-y-5 md:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Informações Pessoais
              </CardTitle>
              <CardDescription>Mantenha seus dados de contato atualizados.</CardDescription>
            </CardHeader>
            <CardContent>
              {user && (
                <AvatarUploader userId={user.id} name={user.full_name ?? ""} url={user.avatar_url} />
              )}
              <form onSubmit={handleUpdateName} className="space-y-4 pb-5 border-b">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: normalizeUppercase(e.target.value) })
                      }
                      className="pl-9 uppercase"
                    />
                  </div>
                </div>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? "Salvando..." : "Atualizar Nome"}
                </Button>
              </form>

              <form onSubmit={handleUpdateEmail} className="space-y-4 pt-5">
                <div className="space-y-2">
                  <Label>E-mail Atual</Label>
                  <div className="relative opacity-60">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input value={formData.email} readOnly disabled className="pl-9 bg-muted" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newEmail">Novo E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="newEmail"
                      type="email"
                      placeholder="Digite o novo e-mail"
                      value={formData.newEmail}
                      onChange={(e) => setFormData({ ...formData, newEmail: e.target.value })}
                      className="pl-9"
                      required
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    * Você receberá um e-mail de confirmação no novo endereço para validar a troca.
                  </p>
                </div>
                <Button type="submit" variant="secondary" disabled={isVerifying}>
                  {isVerifying ? "Processando..." : "Solicitar Troca de E-mail"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Acesso à conta</CardTitle>
              <CardDescription>
                Seus dados ficam aqui. Cobrança, cancelamentos e recibos ficam em Plano e
                assinatura.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Button asChild variant="outline">
                <Link to="/dashboard/subscriptions">Plano e assinatura</Link>
              </Button>
              <Button variant="ghost" className="gap-2 text-destructive" onClick={handleLogout}>
                <LogOut className="h-4 w-4" /> Sair da conta
              </Button>
            </CardContent>
          </Card>
        </div>

        <PlanStatusCard />
      </div>

    </div>
  );
}
