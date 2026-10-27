import { TooltipProvider } from "@/components/ui/tooltip";
import { DARK_INSIGNIA, LIGHT_INSIGNIA } from "@/lib/policeInsignia";
import { InitialLoadingScreen, InitialLoadingReady, INITIAL_LOADING_ART, INITIAL_LOADING_CSS, INITIAL_LOADING_WATCHDOG, finishInitialLoading } from "@/components/PlatformLoadingScreen";
import { startOnlinePresence } from "@/hooks/useOnlinePresence";
import { AuthStatusProvider } from "@/components/auth/AuthStatusProvider";
import { PlatformSignature } from "@/components/brand/PlatformSignature";
import { DevStrip } from "@/components/brand/DevStrip";
import { synchronizeClock } from "@/lib/platformClock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { supabase, hasPendingEmailAuthCallback, markEmailAuthCallbackHandled, completeEmailAuthCallback } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { ConfirmHost } from "@/components/ConfirmHost";
import { InstallAppPrompt } from "@/components/InstallAppPrompt";
import { UpdateAvailablePrompt } from "@/components/UpdateAvailablePrompt";
import { OfflineConnectionGuard } from "../components/OfflineConnectionGuard";
import appCss from "../styles.css?url";
import "@/styles/prose-justify.css";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { THEME_INIT_SCRIPT } from "../lib/theme";
import { CHUNK_RECOVERY_SCRIPT } from "../lib/chunkRecovery";
import { READING_SCALE_INIT_SCRIPT } from "../lib/readingScale";

function StatusScreen({
  code,
  title,
  description,
  children,
}: {
  code: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main
      className="page-hero flex min-h-svh items-center justify-center !rounded-none !border-0 px-6 text-center"
      data-hero="journey"
    >
      <div className="max-w-lg">
        <span className="hero-chip">Norte Concurso</span>
        <p className="font-display mt-6 text-8xl font-extrabold leading-none text-brass md:text-9xl">
          {code}
        </p>
        <h1 className="!mt-4">{title}</h1>
        <p className="page-hero__desc mx-auto">{description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>
      </div>
    </main>
  );
}

function NotFoundComponent() {
  useEffect(finishInitialLoading, []);
  return (
    <StatusScreen
      code="404"
      title="Rota fora do mapa"
      description="A página que você procura não existe ou foi movida. Retome a navegação a partir do início."
    >
      <Link to="/" className="btn-brass">
        Voltar ao início
      </Link>
      <Link to="/dashboard" className="btn-glass">
        Ir para o painel
      </Link>
    </StatusScreen>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  useEffect(finishInitialLoading, []);
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
    const message = String((error as Error | undefined)?.message ?? error);
    const staleChunk = /failed to fetch dynamically imported module|loading chunk|importing a module script failed/i.test(
      message,
    );
    if (staleChunk) {
      try {
        const key = "norte-stale-chunk-recovery";
        const previous = Number(sessionStorage.getItem(key) ?? 0);
        const now = Date.now();
        // Um único reload resolve chunks antigos após deploy, sem criar loop caso
        // o erro seja persistente ou a rede esteja indisponível.
        if (!previous || now - previous > 10_000) {
          sessionStorage.setItem(key, String(now));
          window.location.reload();
        }
      } catch {
        // Alguns modos privados bloqueiam sessionStorage; a tela de erro continua utilizável.
      }
    }
  }, [error]);

  return (
    <StatusScreen
      code="!"
      title="Esta página não carregou"
      description="Algo deu errado do nosso lado. Tente novamente ou volte ao início."
    >
      <button
        onClick={() => {
          router.invalidate();
          reset();
        }}
        className="btn-brass"
      >
        Tentar novamente
      </button>
      <a href="/" className="btn-glass">
        Voltar ao início
      </a>
      <details className="w-full max-w-xl text-left text-xs text-white/80">
        <summary className="cursor-pointer text-center">Detalhes técnicos (para o suporte)</summary>
        <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap rounded-lg bg-black/40 p-3">
          {String((error as Error | undefined)?.message ?? error).slice(0, 600)}
        </pre>
      </details>
    </StatusScreen>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content",
      },
      { title: "Norte Concursos" },
      {
        name: "description",
        content: "Preparação inteligente e personalizada para concursos públicos.",
      },
      { name: "author", content: "Norte Concursos" },
      { property: "og:title", content: "Norte Concursos" },
      { property: "og:description", content: "Estude com direção. Evolua com clareza." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:site_name", content: "Norte Concursos" },
      { property: "og:image", content: "https://norteconcursos.xyz/media/brand/norte-identity/compartilhamento.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Norte Concursos — Polícia, Carreiras e Segurança" },
      { name: "twitter:image", content: "https://norteconcursos.xyz/media/brand/norte-identity/compartilhamento.png" },
      { name: "twitter:image:alt", content: "Nova identidade Norte Concursos" },
      { name: "theme-color", content: "#f4f5f6" },
      // Meta tags de app-shell: no celular, adicionar à tela inicial abre em
      // modo standalone (sem barra de endereço do navegador), como um app nativo.
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Norte Concursos" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg?v=norte-2026", type: "image/svg+xml" },
      { rel: "icon", href: "/icons/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "shortcut icon", href: "/favicon.ico?v=norte-2026" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icons/apple-touch-norte-180.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Aplica claro/escuro antes da primeira pintura, para não piscar. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: READING_SCALE_INIT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: CHUNK_RECOVERY_SCRIPT }} />
        <style dangerouslySetInnerHTML={{ __html: INITIAL_LOADING_CSS }} />
        <link rel="preload" as="image" href={INITIAL_LOADING_ART} fetchPriority="high" type="image/webp" />
        <link rel="preload" as="image" href="/media/brand/norte-identity/emblema.svg" type="image/svg+xml" />
        <link rel="preload" as="image" href="/media/brand/norte-identity/logo-vertical-escuro.svg" type="image/svg+xml" />
        <link rel="preload" as="image" href={LIGHT_INSIGNIA} type="image/svg+xml" />
        <link rel="preload" as="image" href={DARK_INSIGNIA} type="image/webp" />
        <HeadContent />
      </head>
      <body>
        <InitialLoadingScreen />
        <script dangerouslySetInnerHTML={{ __html: INITIAL_LOADING_WATCHDOG }} />
        <noscript><style>{"#norte-initial-loading{display:none}html:not([data-norte-boot=ready]){overflow:auto}html:not([data-norte-boot=ready]) #norte-app-content{visibility:visible;opacity:1;pointer-events:auto}"}</style></noscript>
        <div id="norte-app-content">{children}</div>
        <PlatformSignature />
        <DevStrip />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useEffect(startOnlinePresence, []);
  useEffect(() => {
    // External typography must never block first paint or auth initialization.
    // Keep the shared system-font fallbacks until the optional sheet has loaded.
    const fonts = document.createElement("link");
    fonts.rel = "stylesheet";
    fonts.media = "print";
    fonts.href = "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=JetBrains+Mono:wght@400..700&display=swap";
    fonts.onload = () => { fonts.media = "all"; };
    document.head.appendChild(fonts);
    return () => { fonts.onload = null; fonts.remove(); };
  }, []);
  useEffect(() => {
    let active = true;
    let pending = false;
    const sync = async () => {
      if (pending) return;
      pending = true;
      const started = performance.now();
      try {
        const { data, error } = await supabase.rpc("server_now").abortSignal(AbortSignal.timeout(10000));
        if (!error && active && typeof data === "string") synchronizeClock(new Date(data).getTime(), performance.now() - started);
      } catch {
        // Keep the last server anchor when offline; the initial fallback uses the device instant.
      } finally { pending = false; }
    };
    void sync();
    const timer = window.setInterval(() => void sync(), 5 * 60_000);
    const visible = () => { if (document.visibilityState === "visible") void sync(); };
    document.addEventListener("visibilitychange", visible);
    return () => { active = false; window.clearInterval(timer); document.removeEventListener("visibilitychange", visible); };
  }, []);

  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  useEffect(() => {
    let previousUser: string | null = null;
    let active = true;
    // Supabase may fall back to the site's home URL. Finish verification before
    // navigating so the SDK can consume the original code/fragment first.
    if (hasPendingEmailAuthCallback()) void completeEmailAuthCallback().then((result) => {
      if (!active) return;
      markEmailAuthCallbackHandled();
      if (result.error) void router.navigate({ to: "/auth", search: { callbackError: result.error }, hash: "", replace: true });
      else if (result.session) {
        if (!result.recovery) toast.success("E-mail confirmado com sucesso!", {
          id: "auth-welcome",
          description: "Seu acesso está liberado. Bem-vindo à sua área de estudos da Norte Concurso.",
          duration: 7000,
        });
        void router.navigate(result.recovery
        ? { to: "/auth", search: { recovery: true }, hash: "", replace: true }
        : { to: "/dashboard", hash: "", replace: true });
      }
    });
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user.id ?? null;
      if (currentUser !== previousUser) queryClient.clear();
      previousUser = currentUser;
      if (event === "PASSWORD_RECOVERY" && !hasPendingEmailAuthCallback())
        void router.navigate({ to: "/auth", search: { recovery: true } });
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, [router, queryClient]);

  useEffect(() => {
    // Registra o service worker de app-shell (guarda o app para abrir offline;
    // dados ao vivo nunca ficam em cache) — habilita "Adicionar à tela inicial" no celular.
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // instalação do app ainda funciona sem SW (só perde o cache do shell)
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div id="norte-platform-surface" style={{ display: "contents" }}>
      <AuthStatusProvider statusObserver={<InitialLoadingReady />}>
        <TooltipProvider delayDuration={200}><Outlet /></TooltipProvider>
        <Toaster position="top-center" closeButton />
        <ConfirmHost />
        <InstallAppPrompt />
        <UpdateAvailablePrompt />
      </AuthStatusProvider>
      </div>
      <OfflineConnectionGuard />
    </QueryClientProvider>
  );
}
