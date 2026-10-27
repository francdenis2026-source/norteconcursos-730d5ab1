/** One non-interactive ownership imprint shared by every route and status screen. */
export function PlatformSignature() {
  return (
    <div
      className="platform-signature"
      role="img"
      aria-label="Designed by Franc Denis · 2026. Feijó, Acre, Brasil."
    >
      <span className="platform-signature__mark" aria-hidden="true">FD</span>
      <span aria-hidden="true">Designed by Franc Denis · 2026</span>
      <span className="platform-signature__origin" aria-hidden="true">Feijó · Acre · Brasil</span>
    </div>
  );
}
