import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Loader2, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";

export const Route = createFileRoute("/dashboard/admin-signups")({
  head: () => ({
    meta: [
      { title: "Cadastros por dia | Norte Concurso" },
      { name: "description", content: "Novos alunos cadastrados por dia nos últimos 30 dias." },
      { property: "og:title", content: "Cadastros por dia | Norte Concurso" },
      { property: "og:description", content: "Acompanhamento de novos cadastros." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignupsPage,
});

interface Row {
  id: string;
  full_name: string | null;
  email: string | null;
  subscription_tier: string | null;
  created_at: string;
}

function SignupsPage() {
  const { isAdmin } = useAuthStatus();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const since = new Date();
    since.setDate(since.getDate() - 29);
    since.setHours(0, 0, 0, 0);
    supabase
      .from("profiles")
      .select("id, full_name, email, subscription_tier, created_at")
      .gte("created_at", since.toISOString())
      .order("created_at", { ascending: false })
      .then(({ data, error: e }) => {
        if (e) setError("Não foi possível carregar os cadastros.");
        else setRows((data as Row[]) ?? []);
      });
  }, []);

  const days = useMemo(() => {
    const out: { iso: string; people: Row[] }[] = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      out.push({ iso, people: (rows ?? []).filter((r) => r.created_at.slice(0, 10) === iso) });
    }
    return out;
  }, [rows]);
  const max = Math.max(1, ...days.map((d) => d.people.length));
  const planName = (id: string | null) =>
    SUBSCRIPTION_PLANS.find((p) => p.id === (id ?? "free"))?.name ?? "Gratuito";

  if (!isAdmin)
    return <p className="p-6 text-muted-foreground">Acesso restrito ao administrador.</p>;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHero
        image="command-room"
        size="sm"
        kicker="Administração"
        icon={CalendarDays}
        title={
          <>
            Cadastros <em>por dia</em>
          </>
        }
        description="Novos alunos dos últimos 30 dias, com nome e plano."
      >
        <div className="page-hero__stats">
          <HeroStat icon={UserPlus} label="Últimos 30 dias" value={rows?.length ?? 0} />
          <HeroStat
            icon={UserPlus}
            label="Últimos 7 dias"
            value={days.slice(0, 7).reduce((s, d) => s + d.people.length, 0)}
          />
          <HeroStat icon={UserPlus} label="Hoje" value={days[0]?.people.length ?? 0} />
        </div>
      </PageHero>
      {error && (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}
      {!rows && !error ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Dia a dia</CardTitle>
            <CardDescription>
              Do mais recente ao mais antigo. Clique no aluno para ver o progresso.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {days.map((d) => (
              <div key={d.iso} className="border-b border-border pb-2 last:border-0">
                <div className="flex items-center gap-3 text-xs">
                  <span className="w-14 shrink-0 text-muted-foreground">
                    {d.iso.slice(8, 10)}/{d.iso.slice(5, 7)}
                  </span>
                  <div className="h-3 flex-1 rounded bg-muted">
                    <div
                      className="h-3 rounded bg-primary"
                      style={{ width: `${(d.people.length / max) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 shrink-0 text-right font-medium text-foreground">
                    {d.people.length}
                  </span>
                </div>
                {d.people.length > 0 && (
                  <ul className="mt-1 space-y-0.5 pl-[68px] text-sm">
                    {d.people.map((p) => (
                      <li key={p.id}>
                        <Link
                          to="/dashboard/admin-student/$id"
                          params={{ id: p.id }}
                          className="text-foreground hover:underline"
                        >
                          {p.full_name || p.email || "Sem nome"}
                        </Link>
                        <span className="text-muted-foreground">
                          {" "}
                          · {planName(p.subscription_tier)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
