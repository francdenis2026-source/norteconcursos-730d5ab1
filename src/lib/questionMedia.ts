/** Original exam illustrations restored from reviewed PDFs into public question storage. */
export type QuestionIllustration = { url: string; description: string };

export function isQuestionIllustrationUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      value === url.href &&
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.port &&
      !url.search &&
      !url.hash &&
      /^[a-z0-9]{20}\.supabase\.co$/.test(url.hostname) &&
      /^\/storage\/v1\/object\/public\/question-figures\/[a-zA-Z0-9/_-]+\.(png|jpe?g|webp)$/.test(
        url.pathname,
      )
    );
  } catch {
    return false;
  }
}

/** Only standalone, validated image lines are removed. All question/answer text stays intact. */
export function extractQuestionIllustrations(raw: string): {
  text: string;
  illustrations: QuestionIllustration[];
} {
  const illustrations: QuestionIllustration[] = [];
  const seen = new Set<string>();
  const text = raw.replace(
    /^[ \t]*!\[([^\]\n]{1,160})\]\((https:\/\/[^\s)]+)\)[ \t]*$/gm,
    (line, description: string, url: string) => {
      if (!isQuestionIllustrationUrl(url)) return line;
      if (!seen.has(url)) {
        illustrations.push({ url, description: description.trim() });
        seen.add(url);
      }
      return "";
    },
  );
  return { text, illustrations };
}
