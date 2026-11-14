// Comentários de alunos podem trazer fórmulas em LaTeX (\[ ... \], \( ... \), $$ ... $$). A plataforma
// não renderiza LaTeX nesse campo, então as marcações viram texto legível em vez de aparecerem cruas.
const SYMBOLS: [RegExp, string][] = [
  [/\\times|\\cdot/g, "×"],
  [/\\div/g, "÷"],
  [/\\pm/g, "±"],
  [/\\leq?\b/g, "≤"],
  [/\\geq?\b/g, "≥"],
  [/\\neq?\b/g, "≠"],
  [/\\approx/g, "≈"],
  [/\\%/g, "%"],
  [/\\\$/g, "$"],
  [/\\[,;!]|\\quad/g, " "],
];

export function readableComment(raw: string): string {
  let text = raw.replace(/\r\n?/g, "\n");
  // Delimitadores de fórmula: o conteúdo permanece, uma fórmula por linha.
  text = text.replace(/\\\[([\s\S]*?)\\\]/g, (_, body: string) => `\n${body.trim()}\n`);
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, (_, body: string) => `\n${body.trim()}\n`);
  text = text.replace(/\\\(([\s\S]*?)\\\)/g, (_, body: string) => body.trim());
  // \text{...}, \mathrm{...}, \textbf{...}: fica só o conteúdo.
  text = text.replace(/\\(?:text|mathrm|mathbf|textbf|mbox)\{([^{}]*)\}/g, "$1");
  // \frac{a}{b} → a/b
  for (let i = 0; i < 3; i++) text = text.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, "($1)/($2)");
  for (const [pattern, replacement] of SYMBOLS) text = text.replace(pattern, replacement);
  return text.replace(/\n{3,}/g, "\n\n").trim();
}
