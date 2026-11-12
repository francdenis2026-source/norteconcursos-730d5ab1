const LOGO_URL = "/media/brand/norte-identity/emblema.png";
const COVER_URL = "/media/hero/pcac-capa.webp";
const QR_URL = "/media/brand/platform-qr.svg";

async function fetchDataUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, { cache: "force-cache" });
    if (!response.ok) return null;
    const blob = await response.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : null);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

async function rasterize(dataUrl: string | null, format: "image/jpeg" | "image/png"): Promise<string | null> {
  if (!dataUrl) return null;
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      try {
        const naturalWidth = image.naturalWidth || image.width;
        const naturalHeight = image.naturalHeight || image.height;
        if (!naturalWidth || !naturalHeight) return resolve(null);
        const scale = Math.min(1, 1400 / Math.max(naturalWidth, naturalHeight));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(naturalHeight * scale));
        const context = canvas.getContext("2d");
        if (!context) return resolve(null);
        if (format === "image/jpeg") {
          context.fillStyle = "#ffffff";
          context.fillRect(0, 0, canvas.width, canvas.height);
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL(format, format === "image/jpeg" ? 0.9 : undefined));
      } catch {
        resolve(null);
      }
    };
    image.onerror = () => resolve(null);
    image.src = dataUrl;
  });
}

/** Browser-only assets for on-demand PDF exports; missing media never blocks document generation. */
export async function loadPcAcPdfAssets(): Promise<{ logo: string | null; cover: string | null; qr: string | null }> {
  const [logo, coverSource, qrSource] = await Promise.all([
    fetchDataUrl(LOGO_URL),
    fetchDataUrl(COVER_URL),
    fetchDataUrl(QR_URL),
  ]);
  const [cover, qr] = await Promise.all([
    rasterize(coverSource, "image/jpeg"),
    rasterize(qrSource, "image/png"),
  ]);
  return { logo, cover, qr };
}
