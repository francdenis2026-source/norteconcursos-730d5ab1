import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import {
  cancellationsCsv,
  downloadText,
  emailStatusLabel,
  type CancellationRecord,
} from "@/lib/cancellation";

const day = (iso: string) =>
  new Date(iso).toLocaleDateString("pt-BR", { timeZone: "America/Rio_Branco" });

/** Painel do administrador: todos os cancelamentos de assinatura, com recibo e exportação em CSV. */
export function AdminCancellations() {
  const [rows, setRows] = React.useState<CancellationRecord[] | null>(null);
  const [missing, setMissing] = React.useState(false);
  React.useEffect(() => {
    void supabase
      .from("subscription_cancellations")
      .select("*")
      .order("requested_at", { ascending: false })
      .limit(500)
      .then(({ data, error }) => {
        if (error) setMissing(true);
        setRows(((data ?? []) as CancellationRecord[]) || []);
      });
  }, []);

  const active = (rows ?? []).filter((r) => new Date(r.effective_until).getTime() > Date.now());
  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3">
        <div>
          <CardTitle>Cancelamentos de assinatura</CardTitle>
          <CardDescription>
            {rows === null
              ? "Carregando…"
              : missing
                ? "A tabela de cancelamentos ainda não foi criada: aplique a migração 20261016150000."
                : `${rows.length} no total · ${active.length} ainda com acesso até o vencimento.`}
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={!rows?.length}
          onClick={() =>
            downloadText(
              `cancelamentos-${new Date().toISOString().slice(0, 10)}.csv`,
              cancellationsCsv(rows ?? []),
            )
          }
        >
          <Download className="mr-2 h-4 w-4" /> Exportar CSV
        </Button>
      </CardHeader>
      {!!rows?.length && (
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr>
                <th className="py-1 pr-3">Recibo</th>
                <th className="py-1 pr-3">Aluno</th>
                <th className="py-1 pr-3">Plano</th>
                <th className="py-1 pr-3">Pedido em</th>
                <th className="py-1 pr-3">Vale até</th>
                <th className="py-1 pr-3">E-mail</th>
                <th className="py-1" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t align-top">
                  <td className="py-2 pr-3 font-mono text-xs">{r.receipt_number}</td>
                  <td className="py-2 pr-3">
                    <p className="font-semibold">{r.user_name ?? "—"}</p>
                    <p className="text-xs text-muted-foreground">{r.user_email}</p>
                  </td>
                  <td className="py-2 pr-3">{r.plan_name}</td>
                  <td className="py-2 pr-3">{day(r.requested_at)}</td>
                  <td className="py-2 pr-3">{day(r.effective_until)}</td>
                  <td className="py-2 pr-3">
                    <Badge variant="outline">{emailStatusLabel[r.email_status]}</Badge>
                  </td>
                  <td className="py-2 text-right">
                    <Link
                      to="/dashboard/cancellation-receipt/$id"
                      params={{ id: r.id }}
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      Recibo
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      )}
    </Card>
  );
}
