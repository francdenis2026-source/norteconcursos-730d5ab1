import * as React from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { emailStatusLabel, type CancellationRecord } from "@/lib/cancellation";

export const Route = createFileRoute("/dashboard/cancellation-receipt/$id")({
  component: CancellationReceipt,
  head: () => ({ meta: [{ title: "Recibo de cancelamento | Norte Concurso" }] }),
});

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Rio_Branco",
  });

function CancellationReceipt() {
  const { id } = useParams({ from: "/dashboard/cancellation-receipt/$id" });
  const [record, setRecord] = React.useState<CancellationRecord | null | undefined>(undefined);
  React.useEffect(() => {
    void supabase
      .from("subscription_cancellations")
      .select("*")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => setRecord((data as CancellationRecord | null) ?? null));
  }, [id]);

  if (record === undefined) return <p className="p-8 text-sm">Carregando recibo…</p>;
  if (record === null)
    return (
      <div className="mx-auto max-w-xl p-8 text-sm">
        Recibo não encontrado ou sem permissão para vê-lo.{" "}
        <Link to="/dashboard/profile" className="font-bold underline">
          Voltar ao perfil
        </Link>
      </div>
    );
  const lines: [string, string][] = [
    ["Número do recibo", record.receipt_number],
    ["Aluno", record.user_name ?? "—"],
    ["E-mail", record.user_email ?? "—"],
    ["Plano cancelado", record.plan_name],
    ["Cancelamento solicitado em", fmt(record.requested_at)],
    ["Plano vale até", fmt(record.effective_until)],
    ["Motivo informado", record.reason ?? "Não informado"],
    ["E-mail de confirmação", emailStatusLabel[record.email_status]],
  ];
  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4 md:p-8">
      <div className="no-print flex flex-wrap items-center justify-between gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link to="/dashboard/profile">
            <ArrowLeft className="mr-1 h-4 w-4" /> Voltar
          </Link>
        </Button>
        <Button size="sm" onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" /> Imprimir / salvar em PDF
        </Button>
      </div>
      <article className="rounded-2xl border bg-card p-6 shadow-sm print:border-0 print:shadow-none">
        <header className="border-b pb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Norte Concurso
          </p>
          <h1 className="mt-1 text-2xl font-black">Recibo de cancelamento de assinatura</h1>
        </header>
        <dl className="mt-4 divide-y text-sm">
          {lines.map(([label, value]) => (
            <div key={label} className="grid gap-1 py-2 sm:grid-cols-[14rem_1fr]">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-xs text-muted-foreground">
          O acesso ao plano {record.plan_name} continua até a data acima. Depois dela, a conta volta
          ao plano Gratuito. Este recibo comprova o pedido de cancelamento e não é nota fiscal.
        </p>
      </article>
    </div>
  );
}
