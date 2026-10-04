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

import { supabase, passwordRecoveryPending } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import { ConfirmHost } from "@/components/ConfirmHost";
import { MobileNotice } from "@/components/MobileNotice";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { THEME_INIT_SCRIPT } from "../lib/theme";

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
    </StatusScreen>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
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
        href: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Inter:wght@400..800&family=JetBrains+Mono:wght@400..700&display=swap",
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
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  useEffect(() => {
    let previousUser: string | null = null;
    if (passwordRecoveryPending) void router.navigate({ to: "/auth", search: { recovery: true } });
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user.id ?? null;
      if (currentUser !== previousUser) queryClient.clear();
      previousUser = currentUser;
      if (event === "PASSWORD_RECOVERY")
        void router.navigate({ to: "/auth", search: { recovery: true } });
    });
    return () => data.subscription.unsubscribe();
  }, [router, queryClient]);

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
      <MobileNotice />
    </QueryClientProvider>
  );
}
