// Service worker do Norte Concurso: deixa o app instalável e abrir sem conexão.
//
// O que fica guardado:
//  - ícone e manifesto (shell), sempre buscando a versão nova na rede primeiro;
//  - arquivos de /assets/ (JS, CSS, fontes): têm hash no nome, então nunca ficam "velhos";
//  - a última página aberta de cada rota, usada SÓ quando a rede falha, para o app abrir offline;
//  - /offline.html, mostrada quando não há nem página guardada.
// O que NUNCA é guardado: dados do Supabase e qualquer outro domínio, nem requisições que não sejam GET.
// Questões, respostas, ranking e login continuam sempre ao vivo.
const VERSION = "v9";
const SHELL_CACHE = `norte-app-shell-${VERSION}`;
const ASSET_CACHE = `norte-assets-${VERSION}`;
const PAGE_CACHE = `norte-pages-${VERSION}`;
const SHELL_ASSETS = [
  "/manifest.webmanifest",
  "/icons/icon-256.png",
  "/favicon.svg",
  "/favicon.ico",
  "/icons/favicon-32.png",
  "/icons/norte-192.png",
  "/icons/norte-512.png",
  "/icons/norte-maskable-512.png",
  "/icons/apple-touch-norte-180.png",
  "/media/brand/norte-identity/emblema.svg",
  "/offline.html",
  "/media/hero/hero-norte-impacto.webp",
  "/media/hero/home-bg-texture.webp",
  "/media/hero/norte-atmosphere.webp",
  "/media/brand/norte-identity/emblema-premium.webp",
];
const MAX_ASSETS = 220;
const MAX_PAGES = 25;
const KEEP = [SHELL_CACHE, ASSET_CACHE, PAGE_CACHE];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => !KEEP.includes(key)).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  // As chaves vêm na ordem de inserção: apaga as mais antigas.
  await Promise.all(keys.slice(0, Math.max(0, keys.length - max)).map((key) => cache.delete(key)));
}

async function remember(cacheName, request, response, max) {
  if (!response || !response.ok || response.type === "opaque") return;
  const cache = await caches.open(cacheName);
  await cache.put(request, response);
  await trim(cacheName, max);
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Arquivos com hash no nome: guardados na primeira vez e servidos do cache depois.
  if (url.pathname.startsWith("/assets/")) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ||
          fetch(request).then((response) => {
            event.waitUntil(remember(ASSET_CACHE, request, response.clone(), MAX_ASSETS));
            return response;
          }),
      ),
    );
    return;
  }

  // Páginas: rede primeiro (sempre a versão atual); sem rede, a última cópia ou a tela offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          event.waitUntil(remember(PAGE_CACHE, request, response.clone(), MAX_PAGES));
          return response;
        })
        .catch(async () => {
          const page = await caches.match(request, { ignoreSearch: true });
          const fallback = page || (await caches.match("/offline.html"));
          if (!fallback) return Response.error();
          // A cached /offline.html response carries its own URL. Return a fresh
          // response so reload/reconnect keeps the route the person requested.
          const headers = new Headers(fallback.headers);
          headers.delete("content-encoding");
          headers.delete("content-length");
          return new Response(fallback.body, {
            status: fallback.status,
            statusText: fallback.statusText,
            headers,
          });
        }),
    );
    return;
  }

  if (!SHELL_ASSETS.includes(url.pathname)) return;
  // Rede primeiro: um ícone/manifesto velho não fica preso para sempre.
  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        void caches.open(SHELL_CACHE).then((cache) => cache.put(request, copy));
        return response;
      })
      .catch(() => caches.match(request)),
  );
});
