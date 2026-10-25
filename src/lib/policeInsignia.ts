export const LIGHT_INSIGNIA = "/media/brand/norte-identity/emblema.svg";
export const DARK_INSIGNIA = "/media/brand/norte-identity/emblema-premium.webp";

// Retain both decoded surfaces so the first theme switch needs no image work.
let surfaces: HTMLImageElement[] | undefined;
export function preparePoliceInsignia() {
  if (surfaces || typeof Image === "undefined") return;
  surfaces = [LIGHT_INSIGNIA, DARK_INSIGNIA].map((src) => {
    const image = new Image();
    image.src = src;
    void image.decode().catch(() => { /* The rendered image can retry a transient failure. */ });
    return image;
  });
}
