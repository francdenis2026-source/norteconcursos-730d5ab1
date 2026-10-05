import { isOfficialUrl } from "./questionFormat";

const technicalHosts = new Set([
  "www.rfc-editor.org", "rfc-editor.org", "www.gnu.org", "gnu.org",
  "www.nic.br", "nic.br", "cartilha.cert.br", "www.cert.br", "cert.br",
  "support.microsoft.com", "learn.microsoft.com", "help.libreoffice.org",
  "cdn.cebraspe.org.br",
]);

/** Library references include primary technical documentation as well as law. */
export function isStudySourceUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password &&
      (isOfficialUrl(value) || technicalHosts.has(url.hostname));
  } catch {
    return false;
  }
}
