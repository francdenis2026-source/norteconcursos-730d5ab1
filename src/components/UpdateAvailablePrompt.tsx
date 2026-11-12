import { useEffect, useRef, useState } from "react";
import { RefreshCw, ShieldCheck, Sparkles, X } from "lucide-react";
import { BUILD_ID } from "@/build-info";
import { ACRE_TZ } from "@/lib/acreTime";
import "@/styles/update-prompt.css";

const CHECK_INTERVAL_MS = 10 * 60 * 1000;
/** Depois de "Agora não", o aviso volta a aparecer passado este tempo. */
const SNOOZE_MS = 60 * 60 * 1000;

function publishedLabel(builtAt: string | null) {
  if (!builtAt) return null;
  const date = new Date(builtAt);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: ACRE_TZ,
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * Banner discreto de "nova versão disponível". Um SPA instalado como app
 * (sem barra de navegador, sem botão de recarregar) pode ficar aberto por
 * dias sem nunca buscar o HTML/bundle novo de um deploy mais recente — a
 * navegação é toda client-side, então nada força isso sozinho. Aqui a gente
 * compara periodicamente o BUILD_ID embutido neste bundle com o que está
 * publicado agora em /version.json; se mudou, oferece recarregar.
 */
export function UpdateAvailablePrompt() {
  const [visible, setVisible] = useState(false);
  const [builtAt, setBuiltAt] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const checkingRef = useRef(false);
  const snoozedUntil = useRef(0);

  useEffect(() => {
    // BUILD_ID "dev" é o placeholder usado fora de um build real (dev local,
    // sandbox) — nesse caso não há deploy pra detectar, então nem checa.
    if (BUILD_ID === "dev") return;

    const checkForUpdate = async () => {
      if (checkingRef.current || document.hidden) return;
      checkingRef.current = true;
      try {
        const res = await fetch(`/version.json?t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) {
          const data = (await res.json()) as { buildId?: string; builtAt?: string };
          if (data.buildId && data.buildId !== BUILD_ID) {
            setBuiltAt(data.builtAt ?? null);
            if (Date.now() >= snoozedUntil.current) setVisible(true);
          }
        }
      } catch {
        /* sem rede agora: tenta de novo no próximo ciclo */
      } finally {
        checkingRef.current = false;
      }
    };

    void checkForUpdate();
    const interval = window.setInterval(checkForUpdate, CHECK_INTERVAL_MS);
    const onVisible = () => {
      if (!document.hidden) void checkForUpdate();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
    };
  }, []);

  if (!visible) return null;

  const published = publishedLabel(builtAt);
  // Recarregar mantém o endereço atual e a sessão (o login fica guardado no aparelho):
  // o usuário volta para a mesma tela, já na versão nova.
  const update = () => {
    setUpdating(true);
    // Se uma prova em andamento pedir confirmação e o usuário cancelar, o botão volta ao normal.
    window.setTimeout(() => setUpdating(false), 4000);
    window.location.reload();
  };
  const later = () => {
    snoozedUntil.current = Date.now() + SNOOZE_MS;
    setVisible(false);
  };

  return (
    <aside className="update-prompt" role="status" aria-live="polite" aria-labelledby="update-prompt-title">
      <span className="update-prompt__icon" aria-hidden="true">
        <Sparkles />
      </span>
      <div className="update-prompt__copy">
        <strong id="update-prompt-title">Nova versão disponível</strong>
        <p>
          Publicamos melhorias na plataforma{published ? ` em ${published} (horário do Acre)` : ""}.
          Atualize para usar a versão mais recente.
        </p>
        <small>
          <ShieldCheck aria-hidden="true" /> Você continua conectado e volta para esta mesma tela.
        </small>
      </div>
      <div className="update-prompt__actions">
        <button type="button" className="update-prompt__primary" onClick={update} disabled={updating}>
          <RefreshCw aria-hidden="true" data-spin={updating || undefined} />
          {updating ? "Atualizando…" : "Atualizar agora"}
        </button>
        <button type="button" className="update-prompt__later" onClick={later} disabled={updating}>
          Agora não
        </button>
      </div>
      <button type="button" className="update-prompt__close" onClick={later} aria-label="Fechar aviso de atualização">
        <X aria-hidden="true" />
      </button>
    </aside>
  );
}
