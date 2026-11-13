import { useCallback, useEffect, useState } from "react";
import { BellRing, Check, Loader2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const VAPID_PUBLIC_KEY = "BF5LkSoZ0JBV2MtH-35WSL2vfltAe7w8gV8NUeL9ezpwU5_IvSBDo1RJnODKUFLRrhABkJ19oVGvs3q-UicIKS0";

function decodeBase64Url(value: string): Uint8Array {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  return Uint8Array.from(raw, (character) => character.charCodeAt(0));
}

function isIosDevice() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isStandaloneApp() {
  return window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
}

export function PushNotificationSettings() {
  const [userId, setUserId] = useState<string | null>(null);
  const [supported, setSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [enabled, setEnabled] = useState(false);
  const [updates, setUpdates] = useState(true);
  const [announcements, setAnnouncements] = useState(true);
  const [busy, setBusy] = useState(false);
  const [iosInstallRequired, setIosInstallRequired] = useState(false);

  const load = useCallback(async () => {
    const { data: authData } = await supabase.auth.getUser();
    const id = authData.user && !authData.user.is_anonymous ? authData.user.id : null;
    setUserId(id);
    const canPush = typeof window !== "undefined" &&
      "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
    setSupported(canPush);
    if (!canPush || !id) return;
    setPermission(Notification.permission);
    setIosInstallRequired(isIosDevice() && !isStandaloneApp());
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (!subscription) return;
      const { data } = await supabase.from("push_subscriptions")
        .select("enabled, updates_enabled, announcements_enabled")
        .eq("user_id", id)
        .eq("endpoint", subscription.endpoint)
        .maybeSingle();
      if (data) {
        setEnabled(Boolean(data.enabled));
        setUpdates(Boolean(data.updates_enabled));
        setAnnouncements(Boolean(data.announcements_enabled));
      }
    } catch {
      // Unsupported or not-yet-subscribed devices remain in the inactive state.
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const enable = async () => {
    if (!userId) {
      toast.error("Entre na sua conta para ativar as notificações.");
      return;
    }
    if (!supported || iosInstallRequired) return;
    setBusy(true);
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result !== "granted") throw new Error("Permissão de notificação não concedida.");
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription() ?? await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: decodeBase64Url(VAPID_PUBLIC_KEY) as BufferSource,
      });
      const json = subscription.toJSON();
      const p256dh = json.keys?.p256dh;
      const auth = json.keys?.auth;
      if (!p256dh || !auth) throw new Error("O navegador não forneceu as chaves da assinatura.");
      const { error } = await supabase.from("push_subscriptions").upsert({
        user_id: userId,
        endpoint: subscription.endpoint,
        p256dh,
        auth,
        user_agent: navigator.userAgent.slice(0, 500),
        enabled: true,
        updates_enabled: updates,
        announcements_enabled: announcements,
        updated_at: new Date().toISOString(),
        last_seen_at: new Date().toISOString(),
      }, { onConflict: "endpoint" });
      if (error) throw error;
      setEnabled(true);
      toast.success("Notificações ativadas neste dispositivo.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível ativar as notificações.");
    } finally {
      setBusy(false);
    }
  };

  const updatePreference = async (field: "updates_enabled" | "announcements_enabled", value: boolean) => {
    if (!userId) return;
    setBusy(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (!subscription) throw new Error("Ative as notificações neste dispositivo primeiro.");
      const { error } = await supabase.from("push_subscriptions")
        .update({ [field]: value, updated_at: new Date().toISOString() })
        .eq("user_id", userId)
        .eq("endpoint", subscription.endpoint);
      if (error) throw error;
      if (field === "updates_enabled") setUpdates(value);
      else setAnnouncements(value);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível salvar a preferência.");
    } finally {
      setBusy(false);
    }
  };

  const disable = async () => {
    setBusy(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        const { error } = await supabase.from("push_subscriptions")
          .update({ enabled: false, updated_at: new Date().toISOString() })
          .eq("user_id", userId)
          .eq("endpoint", subscription.endpoint);
        if (error) throw error;
        await subscription.unsubscribe();
      }
      setEnabled(false);
      toast.success("Notificações desativadas neste dispositivo.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível desativar.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BellRing className="h-5 w-5 text-primary" /> Notificações
        </CardTitle>
        <CardDescription>
          Receba avisos discretos sobre novidades da plataforma e comunicados importantes dos concursos.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!supported ? (
          <p className="text-sm text-muted-foreground">Este navegador não oferece suporte a notificações push.</p>
        ) : iosInstallRequired ? (
          <div className="flex items-start gap-3 rounded-lg border p-3 text-sm">
            <Smartphone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p>No iPhone ou iPad, adicione o Norte Concursos à Tela de Início e abra o aplicativo instalado para ativar notificações.</p>
          </div>
        ) : permission === "denied" ? (
          <p className="text-sm text-muted-foreground">As notificações estão bloqueadas nas configurações deste navegador. Altere a permissão do site para ativá-las.</p>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium">{enabled ? "Notificações ativadas neste dispositivo" : "Notificações desativadas"}</p>
                <p className="text-xs text-muted-foreground">A autorização é individual para cada aparelho e navegador.</p>
              </div>
              <Button size="sm" onClick={enabled ? disable : enable} disabled={busy || !userId}>
                {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {enabled ? "Desativar" : "Ativar notificações"}
              </Button>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between gap-3 text-sm">
                <span><strong className="block font-medium">Atualizações da plataforma</strong><span className="text-xs text-muted-foreground">Novas versões, melhorias e correções.</span></span>
                <input type="checkbox" className="h-4 w-4 accent-primary" checked={updates} disabled={!enabled || busy} onChange={(event) => void updatePreference("updates_enabled", event.target.checked)} />
              </label>
              <label className="flex items-center justify-between gap-3 text-sm">
                <span><strong className="block font-medium">Comunicados importantes</strong><span className="text-xs text-muted-foreground">Editais, inscrições, datas de prova e avisos oficiais.</span></span>
                <input type="checkbox" className="h-4 w-4 accent-primary" checked={announcements} disabled={!enabled || busy} onChange={(event) => void updatePreference("announcements_enabled", event.target.checked)} />
              </label>
            </div>
            {enabled && <p className="flex items-center gap-2 text-xs text-muted-foreground"><Check className="h-3.5 w-3.5 text-emerald-600" /> Preferências salvas neste dispositivo.</p>}
          </>
        )}
      </CardContent>
    </Card>
  );
}
