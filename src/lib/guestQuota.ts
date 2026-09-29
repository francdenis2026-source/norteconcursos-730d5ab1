// Controle de degustação para visitantes não cadastrados no Treinador de Questões.
// Sem sessão Supabase não há user_id para gravar no banco, então a contagem
// diária fica só no localStorage do navegador (limite "de boa-fé": reinstalar
// o navegador ou limpar dados reseta a contagem, o que é aceitável para uma
// degustação gratuita — o controle "de verdade" é o limite do plano Free
// para quem já se cadastrou, aplicado no servidor via question_training_responses).

export const GUEST_DAILY_LIMIT = 10;

const STORAGE_PREFIX = "norteconcurso:guest-quota:";

function todayKey(): string {
  return `${STORAGE_PREFIX}${new Date().toISOString().slice(0, 10)}`;
}

export function getGuestUsedToday(): number {
  try {
    const raw = window.localStorage.getItem(todayKey());
    const value = raw ? Number.parseInt(raw, 10) : 0;
    return Number.isFinite(value) && value > 0 ? value : 0;
  } catch {
    return 0;
  }
}

export function getGuestRemainingToday(): number {
  return Math.max(0, GUEST_DAILY_LIMIT - getGuestUsedToday());
}

export function registerGuestAnswer(): number {
  try {
    const used = getGuestUsedToday() + 1;
    window.localStorage.setItem(todayKey(), String(used));
    return used;
  } catch {
    return getGuestUsedToday();
  }
}
