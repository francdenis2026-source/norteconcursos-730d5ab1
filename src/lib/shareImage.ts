import shareImage from "@/assets/brand/norte-miniatura-1200x630.jpg.asset.json";

/**
 * Miniatura do site (1200x630), usada em og:image / twitter:image.
 *
 * O ponteiro de asset guarda uma URL relativa ao próprio site; redes sociais
 * exigem URL absoluta, por isso o domínio principal é prefixado aqui.
 */
export const SHARE_IMAGE_URL = `https://norteconcursos.xyz${shareImage.url}`;

export const SHARE_IMAGE_ALT =
  "Brasão Carreiras Policiais da Norte Concursos: escudo metálico dourado com metade crânio e metade pistola, sobre uma bancada de ferramentas de precisão.";

/** Conjunto de tags aplicado em toda página pública que abre a miniatura. */
export const SHARE_IMAGE_META = [
  { property: "og:image", content: SHARE_IMAGE_URL },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: SHARE_IMAGE_ALT },
  { name: "twitter:image", content: SHARE_IMAGE_URL },
  { name: "twitter:image:alt", content: SHARE_IMAGE_ALT },
] as const satisfies ReadonlyArray<Record<string, string>>;
