/** Identidade visual por disciplina: cor e foto próprias, estáveis em toda a plataforma. */
export type DisciplineTheme = { tone: string; image: string };

const img = (name: string) => `/media/hero/${name}.webp`;
const RULES: Array<[RegExp, DisciplineTheme]> = [
  [/portugu|redac|gramat|interpreta/, { tone: "oklch(0.74 0.17 15)", image: img("painel-aluno-estudo") }],
  [/matemat|logic|estatist|financeir/, { tone: "oklch(0.72 0.15 255)", image: img("exam-simulator") }],
  [/informat|tecnolog|cibern|digita/, { tone: "oklch(0.74 0.16 300)", image: img("dashboard") }],
  [/processual penal|processo penal/, { tone: "oklch(0.76 0.16 55)", image: img("pcpr-investigacao") }],
  [/penal|crimin/, { tone: "oklch(0.7 0.19 28)", image: img("plano-plus-carreira") }],
  [/constituc/, { tone: "oklch(0.76 0.16 150)", image: img("exam-hall") }],
  [/administrat/, { tone: "oklch(0.8 0.14 82)", image: img("study-assistant") }],
  [/human|etica|cidadan/, { tone: "oklch(0.74 0.15 340)", image: img("careers-team") }],
  [/medicina legal|pericia|investiga/, { tone: "oklch(0.74 0.13 230)", image: img("field-map") }],
  [/acre|histor|geograf|atualidade/, { tone: "oklch(0.78 0.15 130)", image: img("landing-pcac") }],
  [/contab|econom|auditor/, { tone: "oklch(0.78 0.13 110)", image: img("trainer-study") }],
  [/ingles|espanhol|lingua estrangeira/, { tone: "oklch(0.74 0.14 200)", image: img("trainer") }],
  [/legisla|lei |estatuto|transito|ctb/, { tone: "oklch(0.78 0.15 70)", image: img("study-desk") }],
  [/fisic|quimic|biolog/, { tone: "oklch(0.75 0.15 175)", image: img("painel-aluno-direcao-estudos") }],
];
const FALLBACK: DisciplineTheme[] = [
  { tone: "oklch(0.8 0.14 82)", image: img("study-desk") },
  { tone: "oklch(0.72 0.15 255)", image: img("trainer") },
  { tone: "oklch(0.76 0.16 150)", image: img("exam-hall") },
  { tone: "oklch(0.74 0.16 300)", image: img("study-assistant") },
  { tone: "oklch(0.76 0.16 55)", image: img("painel-aluno-direcao-estudos") },
  { tone: "oklch(0.72 0.19 15)", image: img("trainer-study") },
];

export function disciplineTheme(name: string): DisciplineTheme {
  const key = name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
  for (const [pattern, theme] of RULES) if (pattern.test(key)) return theme;
  let hash = 0;
  for (const char of key) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return FALLBACK[hash % FALLBACK.length] ?? FALLBACK[0]!;
}
