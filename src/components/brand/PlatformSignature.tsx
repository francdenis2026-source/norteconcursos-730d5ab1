/** One non-interactive ownership imprint shared by every route and status screen. */
export function PlatformSignature() {
  return (
    <div
      className="platform-signature"
      role="img"
      aria-label="Dev. Franc D'nis. Feijó-AC, Brasil."
    >
      <span aria-hidden="true">Dev.</span>
      <strong aria-hidden="true">Franc D'nis</strong>
      <span className="platform-signature__dot" aria-hidden="true">•</span>
      <span aria-hidden="true">Feijó-AC, Brasil</span>
    </div>
  );
}
