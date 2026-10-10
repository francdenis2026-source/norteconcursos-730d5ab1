/** Legacy service JWTs require Authorization as well as apikey. New secret keys are not JWTs. */
export function sessionAuthHeaders(key) {
  if (typeof key !== 'string' || !key.trim()) throw Error('Chave de sessão ausente');
  return { apikey: key, ...(/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(key) ? { Authorization: `Bearer ${key}` } : {}) };
}
