// Service worker mínimo de "app shell" — só para tornar o app instalável no
// celular (modo standalone, sem barra do navegador). Não faz cache agressivo
// nem funciona offline de verdade: o app depende de dados ao vivo do
// Supabase, então cachear respostas dinâmicas ou HTML do servidor (SSR)
// arriscaria mostrar dados velhos ou quebrar login/sessão. Só os arquivos
// estáticos do "shell" (ícone, manifesto) ficam em cache; todo o resto vai
// direto pra rede.
const SHELL_CACHE = "norte-app-shell-v1";
const SHELL_ASSETS = ["/manifest.webmanifest", "/icons/icon-256.png", "/favicon.svg"];

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
        Promise.all(keys.filter((key) => key !== SHELL_CACHE).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (!SHELL_ASSETS.includes(url.pathname)) return;
  event.respondWith(caches.match(request).then((cached) => cached || fetch(request)));
});
