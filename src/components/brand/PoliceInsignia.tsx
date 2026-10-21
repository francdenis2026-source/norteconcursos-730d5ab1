import { useEffect, type ImgHTMLAttributes } from "react";
import { DARK_INSIGNIA, LIGHT_INSIGNIA, preparePoliceInsignia } from "@/lib/policeInsignia";

/** Both surfaces stay mounted; the root theme selects one in the same style update. */
export function PoliceInsignia({ alt = "", className, ...props }: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet">) {
  useEffect(preparePoliceInsignia, []);
  const classes = ["police-insignia", className].filter(Boolean).join(" ");
  return <>
    <img {...props} src={LIGHT_INSIGNIA} alt={alt} className={classes} data-insignia-theme="light" loading="eager" decoding="sync" />
    <img {...props} src={DARK_INSIGNIA} alt={alt} className={classes} data-insignia-theme="dark" loading="eager" decoding="sync" />
  </>;
}
