import { PoliceInsignia } from "@/components/brand/PoliceInsignia";

/** Decorative depth stays away from the form's focus and pointer targets. */
export function AuthInsignia() {
  return (
    <div className="auth-insignia" aria-hidden="true">
      <div className="auth-insignia__relief">
        <PoliceInsignia className="auth-insignia__edge" alt="" width={768} height={811} />
        <PoliceInsignia alt="" width={768} height={811} decoding="async" />
        <span className="auth-insignia__reflection" />
      </div>
    </div>
  );
}
