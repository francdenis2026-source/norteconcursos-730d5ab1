// Sessão local de acesso (modo demonstração / offline).
// Não cria conteúdo: guarda apenas quem está logado no navegador.

import { OWNER_EMAIL } from '@/hooks/useDashboard.constants';

const KEY = 'nc_local_session';

export interface LocalSession {
  id: string;
  email: string;
  full_name: string;
}

export function getLocalSession(): LocalSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as LocalSession) : null;
  } catch {
    return null;
  }
}

export function setLocalSession(email: string, fullName?: string): LocalSession {
  const session: LocalSession = {
    id: `local-${email.toLowerCase()}`,
    email: email.toLowerCase(),
    full_name: fullName || email.split('@')[0] || 'Usuário',
  };
  window.localStorage.setItem(KEY, JSON.stringify(session));
  window.dispatchEvent(new Event('nc-local-session'));
  return session;
}

export function clearLocalSession() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event('nc-local-session'));
}

export function isOwnerEmail(email: string) {
  return email.toLowerCase() === OWNER_EMAIL;
}
