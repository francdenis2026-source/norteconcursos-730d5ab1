import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import offlineDocument from "../../public/offline.html?raw";
import { createConnectionMonitor } from "@/lib/networkConnection";
import "@/styles/offline-connection.css";

/** Keep the complete offline screen ready before losing the network. The shared
 * document needs no additional fetch to appear and never navigates the host app. */
export function OfflineConnectionGuard() {
  const [mounted, setMounted] = useState(false);
  const [offline, setOffline] = useState(false);
  // Deixa o aluno fechar a tela quando a sondagem for um falso positivo (rede do
  // próprio dispositivo instável, mas o site continua funcionando) sem travar ele lá.
  // É esquecido de novo assim que a conexão é confirmada de volta.
  const [dismissed, setDismissed] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setMounted(true);
    let active = true;
    const monitor = createConnectionMonitor({
      probe: async signal => {
        // HEAD is deliberately excluded from the service worker's GET cache.
        const response = await fetch("/favicon.svg", { method: "HEAD", cache: "no-store", signal });
        return response.ok;
      },
      // 6s em vez de 3s: tolera a latência normal de uma conexão móvel 3G/4G fraca sem marcar
      // como "sem conexão" só porque uma resposta demorou um pouco mais que o usual.
      timeoutMs: 6000,
      publish: reachable => {
        setOffline(!reachable);
        if (reachable) {
          setDismissed(false);
          window.dispatchEvent(new Event("norte:connection-restored"));
        }
      },
    });
    const check = () => monitor.check();
    const lost = () => monitor.offline();
    const resumed = () => { void check(); };
    const visible = () => { if (document.visibilityState === "visible") void check(); };
    const onMessage = async (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== frame.current?.contentWindow || !event.data) return;
      if (event.data.type === "norte:dismiss-offline") {
        setDismissed(true);
        return;
      }
      if (event.data.type !== "norte:retry-connection") return;
      frame.current?.contentWindow?.postMessage({ type: "norte:connection-status", checking: true }, location.origin);
      const reachable = await check();
      if (active) frame.current?.contentWindow?.postMessage({ type: "norte:connection-status", checking: false, reachable }, location.origin);
    };
    window.addEventListener("offline", lost);
    window.addEventListener("online", resumed);
    window.addEventListener("focus", resumed);
    window.addEventListener("pageshow", resumed);
    window.addEventListener("message", onMessage);
    document.addEventListener("visibilitychange", visible);
    // 20s em vez de 5s: a cada aba aberta isso faz uma requisição HEAD para a própria origem,
    // o tempo todo. Em 5s isso é +700 reqs/h por aba — volume alto o bastante para disparar
    // proteção anti-bot do CDN para aquele visitante, que então passa a falhar essa mesma sondagem
    // e o app mostra "sem conexão" com a internet normal. Eventos de rede reais (offline/online/
    // focus/visibilitychange) continuam disparando a verificação na hora, sem depender do intervalo.
    const timer = window.setInterval(visible, 20000);
    if (!navigator.onLine) monitor.offline();
    // A sondagem inicial espera a página terminar de carregar (ou 4s, o que vier primeiro)
    // em vez de disparar no mount: nessa hora o navegador ainda está ocupado baixando o bundle,
    // CSS e imagens do hero, e numa conexão móvel mais fraca a requisição HEAD pode ficar na
    // fila da própria aba e expirar sem que a internet do usuário tenha caído — mostrando
    // "sem conexão" logo ao abrir o site mesmo com a rede normal.
    let initialTimer: number | undefined;
    const runInitialCheck = () => {
      if (initialTimer) window.clearTimeout(initialTimer);
      window.removeEventListener("load", runInitialCheck);
      void check();
    };
    if (document.readyState === "complete") {
      void check();
    } else {
      window.addEventListener("load", runInitialCheck, { once: true });
      initialTimer = window.setTimeout(runInitialCheck, 4000);
    }
    return () => {
      active = false;
      monitor.dispose();
      window.clearInterval(timer);
      if (initialTimer) window.clearTimeout(initialTimer);
      window.removeEventListener("load", runInitialCheck);
      window.removeEventListener("offline", lost);
      window.removeEventListener("online", resumed);
      window.removeEventListener("focus", resumed);
      window.removeEventListener("pageshow", resumed);
      window.removeEventListener("message", onMessage);
      document.removeEventListener("visibilitychange", visible);
    };
  }, []);
  useEffect(() => {
    if (!mounted) return;
    const visible = offline && !dismissed;
    frame.current?.contentWindow?.postMessage({ type: "norte:offline-visibility", visible }, location.origin);
    if (!visible) return;
    const previousFocus = document.activeElement;
    const siblings = Array.from(document.body.children).filter((node): node is HTMLElement => node instanceof HTMLElement && node !== layer.current);
    const previous = siblings.map(node => ({ node, inert: node.inert }));
    previous.forEach(({ node }) => { node.inert = true; });
    document.documentElement.dataset["norteOffline"] = "true";
    frame.current?.contentWindow?.postMessage({ type: "norte:connection-status", checking: false }, location.origin);
    frame.current?.focus();
    return () => {
      previous.forEach(({ node, inert }) => { node.inert = inert; });
      delete document.documentElement.dataset["norteOffline"];
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [offline, dismissed, mounted]);
  if (!mounted) return null;
  return createPortal(<div ref={layer} className="offline-connection" hidden={!offline || dismissed} role="dialog" aria-modal={offline && !dismissed ? true : undefined} aria-label="Você está sem conexão">
    <iframe ref={frame} data-norte-offline="" title="Sem conexão — Norte Concursos" srcDoc={offlineDocument} onLoad={() => frame.current?.contentWindow?.postMessage({ type: "norte:offline-visibility", visible: offline && !dismissed }, location.origin)} tabIndex={offline && !dismissed ? 0 : -1} />
  </div>, document.body);
}
