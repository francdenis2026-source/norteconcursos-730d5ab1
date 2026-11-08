export interface PcAcTopicGroup {
  title: string;
  subtopics: string[];
}

export interface PcAcTopicSource {
  topics?: string[];
}

const clean = (value: string) => value.replace(/\s+/g, " ").trim();

/**
 * Turns the long strings used by the official edital into a navigable parent
 * topic plus independent subtopics. The wording is preserved; only the
 * editorial separators already present in the edital are used.
 */
export function splitPcAcTopic(raw: string): PcAcTopicGroup {
  const text = clean(raw);
  const numbered = [...text.matchAll(/\b\d+\.\d+\s+/g)];
  if (numbered.length >= 2 && numbered[0]?.index !== undefined && numbered[0].index > 0) {
    const title = clean(text.slice(0, numbered[0].index));
    const subtopics = numbered.map((match, index) => {
      const start = match.index ?? 0;
      const end = numbered[index + 1]?.index ?? text.length;
      return clean(text.slice(start, end));
    });
    return { title, subtopics };
  }

  const semicolonParts = text.split(/\s*;\s*/).map(clean).filter(Boolean);
  if (semicolonParts.length >= 3) {
    const colon = semicolonParts[0]!.indexOf(":");
    if (colon > 0) {
      const title = clean(semicolonParts[0]!.slice(0, colon));
      const firstSubtopic = clean(semicolonParts[0]!.slice(colon + 1));
      return { title, subtopics: [firstSubtopic, ...semicolonParts.slice(1)] };
    }
    return { title: semicolonParts[0]!, subtopics: semicolonParts.slice(1) };
  }

  const dashParts = text.split(/\s+–\s+/).map(clean).filter(Boolean);
  if (dashParts.length >= 3) {
    return { title: dashParts[0]!, subtopics: dashParts.slice(1) };
  }

  return { title: text, subtopics: [] };
}

export function pcAcVerticalTopicGroups(discipline: PcAcTopicSource): PcAcTopicGroup[] {
  return (discipline.topics ?? []).map(splitPcAcTopic);
}
