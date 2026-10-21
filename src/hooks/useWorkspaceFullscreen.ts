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
  const enter = useCallback(() => {
    if (activeRef.current) return;
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const content = document.getElementById('dashboard-content');
    scroll.current = window.matchMedia(MOBILE_APP_QUERY).matches ? content?.scrollTop ?? 0 : window.scrollY;
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
  }, []);
  const exit = useCallback(() => {
    if (!activeRef.current) return;
    scroll.current = document.getElementById('dashboard-content')?.scrollTop ?? 0;
    activeRef.current = false;
    setActive(false);
    if (native.current && document.fullscreenElement === document.documentElement) {
      native.current = false;
      void document.exitFullscreen().catch(() => {});
    }
  }, []);
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
      document.removeEventListener('fullscreenchange', change);
      window.removeEventListener('keydown', key, true);
      if (native.current && document.fullscreenElement === document.documentElement) void document.exitFullscreen().catch(() => {});
    };
  }, [exit]);
  return { active, enter, exit };
}
