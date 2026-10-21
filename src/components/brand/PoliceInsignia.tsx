import type { ImgHTMLAttributes } from "react";
import { usePoliceInsigniaSource } from "@/hooks/usePoliceInsignia";

/** Theme-aware transparent artwork; preserve the sizing and behavior of the existing image. */
export function PoliceInsignia({ alt = "", className, ...props }: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet">) {
  const src = usePoliceInsigniaSource();
  return <img {...props} src={src} alt={alt} className={["police-insignia", className].filter(Boolean).join(" ")} />;
}
