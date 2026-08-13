import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Compass, ShieldCheck, Mail, Lock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    title: "Entrar | Norte Concurso",
    meta: [
      { name: "description", content: "Acesse sua conta na Norte Concurso." }
    ]
  })
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-2xl border shadow-lg">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Compass className="h-8 w-8 text-secondary" />
            <span className="text-xl font-bold tracking-tight text-primary">Norte Concurso</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            {mode === "login" ? "Bem-vindo de volta" : "Crie sua conta"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "login" 
              ? "Insira suas credenciais para acessar a plataforma" 
              : "Preencha os dados abaixo para começar sua jornada"}
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" placeholder="Ex: João Silva" required />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="nome@exemplo.com" className="pl-10" required />
            </div>
          </div>

          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" placeholder="000.000.000-00" required />
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="pin">{mode === "login" ? "PIN de acesso" : "Escolha seu PIN"}</Label>
              {mode === "login" && (
                <button type="button" className="text-xs text-secondary hover:underline font-medium">
                  Esqueceu o PIN?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="pin" type="password" placeholder="6 dígitos numéricos" maxLength={6} className="pl-10" required />
            </div>
          </div>

          {mode === "register" && (
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                Aceito os <Link to="/terms" className="text-secondary hover:underline">termos de uso</Link> e a <Link to="/privacy" className="text-secondary hover:underline">política de privacidade</Link>.
              </Label>
            </div>
          )}

          <Button 
            type="button" 
            className="w-full h-11 bg-primary hover:bg-primary/90"
            onClick={() => window.location.href = '/dashboard'}
          >
            {mode === "login" ? "Entrar" : "Criar conta"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            {mode === "login" ? "Ainda não tem conta?" : "Já possui uma conta?"}{" "}
          </span>
          <button 
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-secondary font-bold hover:underline"
          >
            {mode === "login" ? "Cadastre-se" : "Entre aqui"}
          </button>
        </div>

        <div className="pt-4 border-t text-center">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Ambiente seguro e criptografado</span>
          </div>
        </div>
      </div>
    </div>
  );
}
