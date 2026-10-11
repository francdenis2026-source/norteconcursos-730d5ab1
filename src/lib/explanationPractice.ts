/** Authored question/answer pairs only; never manufacture answers from the legal text. */
export function explanationPractice(text: string): { question: string; answer: string } | null {
  const end = text.indexOf("?");
  if (end < 0) return null;
  const question = text.slice(0, end + 1).trim(), answer = text.slice(end + 1).trim();
  return question && answer ? { question, answer } : null;
}

export function explanationExample(text: string): { scenario: string; variation: string | null } {
  const marker = text.indexOf("Variação:");
  return marker < 0 ? { scenario: text, variation: null } : {
    scenario: text.slice(0, marker).trim(), variation: text.slice(marker + "Variação:".length).trim(),
  };
}
