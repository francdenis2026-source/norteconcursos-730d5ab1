import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MOBILE_APP_QUERY } from '@/lib/appScroll';

/** Native fullscreen where allowed; the same workspace layout works without it. */
export function useWorkspaceFullscreen() {
  const [active, setActive] = useState(false);
  const activeRef = useRef(false);
  const native = useRef(false);
  const pending = useRef(false);
  const mounted = useRef(true);
  const scroll = useRef<number | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const settleTimer = useRef<number | null>(null);
  // O navegador anima a entrada/saída da tela cheia nativa (redimensionando a janela aos poucos).
  // Enquanto isso, a troca de layout (fixed, 100dvh) e os painéis com desfoque (backdrop-filter)
  // seriam recalculados a cada quadro dessa animação, o que aparecia como um "piscar" de falha.
  // Este marcador congela transições e desfoque até a troca de tela cheia se acomodar.
  const beginTransition = useCallback(() => {
    document.documentElement.dataset['workspaceFocusTransition'] = 'true';
    if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      delete document.documentElement.dataset['workspaceFocusTransition'];
      settleTimer.current = null;
    }, 400);
  }, []);
  const endTransition = useCallback(() => {
    if (settleTimer.current !== null) {
      window.clearTimeout(settleTimer.current);
      settleTimer.current = null;
    }
    delete document.documentElement.dataset['workspaceFocusTransition'];
  }, []);
  const enter = useCallback(() => {
    if (activeRef.current) return;
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const content = document.getElementById('dashboard-content');
    scroll.current = window.matchMedia(MOBILE_APP_QUERY).matches ? content?.scrollTop ?? 0 : window.scrollY;
    beginTransition();
    activeRef.current = true;
    setActive(true);
    if (!document.fullscreenElement && document.fullscreenEnabled && document.documentElement.requestFullscreen) {
      pending.current = true;
      void document.documentElement.requestFullscreen().then(() => {
        pending.current = false;
        native.current = document.fullscreenElement === document.documentElement;
        if ((!mounted.current || !activeRef.current) && native.current) {
          native.current = false;
          void document.exitFullscreen().catch(() => {});
        }
      }).catch(() => { pending.current = false; });
    }
  }, [beginTransition]);
  const exit = useCallback(() => {
    if (!activeRef.current) return;
    scroll.current = document.getElementById('dashboard-content')?.scrollTop ?? 0;
    beginTransition();
    activeRef.current = false;
    setActive(false);
    if (native.current && document.fullscreenElement === document.documentElement) {
      native.current = false;
      void document.exitFullscreen().catch(() => {});
    }
  }, [beginTransition]);
  useLayoutEffect(() => {
    if (active) {
      document.documentElement.dataset['workspaceFocus'] = 'true';
      if (scroll.current !== null) document.getElementById('dashboard-content')?.scrollTo({ top: scroll.current, behavior: 'instant' });
    } else {
      delete document.documentElement.dataset['workspaceFocus'];
      if (scroll.current !== null) {
        if (window.matchMedia(MOBILE_APP_QUERY).matches) document.getElementById('dashboard-content')?.scrollTo({ top: scroll.current, behavior: 'instant' });
        else window.scrollTo({ top: scroll.current, behavior: 'instant' });
        const previous = returnFocus.current;
        const target = previous?.isConnected && previous.getClientRects().length ? previous
          : document.querySelector<HTMLElement>(window.matchMedia(MOBILE_APP_QUERY).matches ? '.app-mobile-bar button' : '.workspace-fullscreen-trigger');
        target?.focus({ preventScroll: true });
      }
    }
  }, [active]);
  useEffect(() => {
    mounted.current = true;
    const change = () => {
      if (document.fullscreenElement === document.documentElement && pending.current) native.current = true;
      else if (!document.fullscreenElement && native.current) { native.current = false; exit(); }
      // A troca de tela cheia nativa terminou: o layout pode voltar a animar normalmente.
      endTransition();
    };
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeRef.current && !document.querySelector('[role="dialog"], [role="menu"]')) exit();
    };
    document.addEventListener('fullscreenchange', change);
    window.addEventListener('keydown', key, true);
    return () => {
      mounted.current = false;
      activeRef.current = false;
      delete document.documentElement.dataset['workspaceFocus'];
      endTransition();
      document.removeEventListener('fullscreenchange', change);
      window.removeEventListener('keydown', key, true);
      if (native.current && document.fullscreenElement === document.documentElement) void document.exitFullscreen().catch(() => {});
    };
  }, [exit, endTransition]);
  return { active, enter, exit };
}
