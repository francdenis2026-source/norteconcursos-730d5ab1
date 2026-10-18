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
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { THEME_INIT_SCRIPT } from "../lib/theme";
import { claimSingleDeviceSession, ownsSingleDeviceSession } from "../lib/singleDeviceSession";

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
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { title: "Norte Concurso" },
      {
        name: "description",
        content: "Preparação inteligente e personalizada para concursos públicos.",
      },
      { name: "author", content: "Norte Concurso" },
      { property: "og:title", content: "Norte Concurso" },
      { property: "og:description", content: "Estude com direção. Evolua com clareza." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0a0f1c" },
      // Meta tags de app-shell: no celular, adicionar à tela inicial abre em
      // modo standalone (sem barra de endereço do navegador), como um app nativo.
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Norte Concurso" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=JetBrains+Mono:wght@400..700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icons/apple-touch-180.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Aplica claro/escuro antes da primeira pintura, para não piscar. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
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
      if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && session) {
        void claimSingleDeviceSession(session.user.id);
      }
      if (event === "PASSWORD_RECOVERY" && !hasPendingEmailAuthCallback())
        void router.navigate({ to: "/auth", search: { recovery: true } });
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, [router, queryClient]);

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      const userId = data.session?.user.id;
      if (!userId || cancelled) return;
      if (!(await ownsSingleDeviceSession(userId)) && !cancelled) {
        await supabase.auth.signOut({ scope: "local" });
        window.location.assign("/auth?reason=another-device");
      }
    };
    // Dá tempo para a sessão recém-criada ser registrada antes da primeira
    // verificação, evitando logout durante o redirecionamento inicial.
    const first = window.setTimeout(check, 8000);
    const timer = window.setInterval(check, 30000);
    return () => {
      cancelled = true;
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    // Registra o service worker de app-shell (só ícone/manifesto em cache,
    // sem afetar dados ao vivo) — habilita "Adicionar à tela inicial" no celular.
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // instalação do app ainda funciona sem SW (só perde o cache do shell)
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-center" closeButton />
      <ConfirmHost />
      <InstallAppPrompt />
      <UpdateAvailablePrompt />
    </QueryClientProvider>
  );
}
