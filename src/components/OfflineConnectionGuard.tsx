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
      publish: reachable => {
        setOffline(!reachable);
        if (reachable) window.dispatchEvent(new Event("norte:connection-restored"));
      },
    });
    const check = () => monitor.check();
    const lost = () => monitor.offline();
    const resumed = () => { void check(); };
    const visible = () => { if (document.visibilityState === "visible") void check(); };
    const retry = async (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== frame.current?.contentWindow || event.data?.type !== "norte:retry-connection") return;
      frame.current?.contentWindow?.postMessage({ type: "norte:connection-status", checking: true }, location.origin);
      const reachable = await check();
      if (active) frame.current?.contentWindow?.postMessage({ type: "norte:connection-status", checking: false, reachable }, location.origin);
    };
    window.addEventListener("offline", lost);
    window.addEventListener("online", resumed);
    window.addEventListener("focus", resumed);
    window.addEventListener("pageshow", resumed);
    window.addEventListener("message", retry);
    document.addEventListener("visibilitychange", visible);
    const timer = window.setInterval(visible, 5000);
    if (!navigator.onLine) monitor.offline();
    void check();
    return () => {
      active = false;
      monitor.dispose();
      window.clearInterval(timer);
      window.removeEventListener("offline", lost);
      window.removeEventListener("online", resumed);
      window.removeEventListener("focus", resumed);
      window.removeEventListener("pageshow", resumed);
      window.removeEventListener("message", retry);
      document.removeEventListener("visibilitychange", visible);
    };
  }, []);
  useEffect(() => {
    if (!mounted) return;
    frame.current?.contentWindow?.postMessage({ type: "norte:offline-visibility", visible: offline }, location.origin);
    if (!offline) return;
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
  }, [offline, mounted]);
  if (!mounted) return null;
  return createPortal(<div ref={layer} className="offline-connection" hidden={!offline} role="dialog" aria-modal={offline ? true : undefined} aria-label="Você está sem conexão">
    <iframe ref={frame} data-norte-offline="" title="Sem conexão — Norte Concursos" srcDoc={offlineDocument} onLoad={() => frame.current?.contentWindow?.postMessage({ type: "norte:offline-visibility", visible: offline }, location.origin)} tabIndex={offline ? 0 : -1} />
  </div>, document.body);
}
