import { usePoliceInsigniaSource } from "@/hooks/usePoliceInsignia";

/** Decorative depth stays away from the form's focus and pointer targets. */
export function AuthInsignia() {
  const src = usePoliceInsigniaSource();
  return (
    <div className="auth-insignia" aria-hidden="true">
      <div className="auth-insignia__relief">
        <img className="auth-insignia__edge" src={src} alt="" width={768} height={811} />
        <img src={src} alt="" width={768} height={811} decoding="async" />
        <span className="auth-insignia__reflection" />
      </div>
    </div>
  );
}
