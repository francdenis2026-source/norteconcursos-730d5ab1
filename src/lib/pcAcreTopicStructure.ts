export interface PcAcTopicGroup {
  title: string;
  subtopics: string[];
}

export interface PcAcTopicSource {
  id?: string;
  topics?: string[];
}

const clean = (value: string) => value.replace(/\s+/g, " ").trim();

function capitalizeFirst(value: string) {
  return value ? value[0]!.toLocaleUpperCase("pt-BR") + value.slice(1) : value;
}

function splitFirstConjunction(value: string) {
  const match = value.match(/^(.+?)\s+e\s+(.+)$/u);
  return match ? [match[1]!, match[2]!] : [value];
}

function commaItems(value: string) {
  return value
    .replace(/[.;]\s*$/u, "")
    .split(/,\s*/u)
    .map(clean)
    .filter(Boolean);
}

function splitAcreRealitySection(raw: string): PcAcTopicGroup | null {
  const section = clean(raw).replace(/[.]$/u, "");

  if (section.startsWith("Movimento dos seringueiros,")) {
    const remainder = clean(section.slice("Movimento dos seringueiros,".length));
    return {
      title: section,
      subtopics: [
        "Movimento dos seringueiros",
        ...splitFirstConjunction(remainder).map(capitalizeFirst),
      ],
    };
  }

  const match = section.match(
    /^(Formação histórica do Acre|Geografia|Aspectos étnicos e culturais|Aspectos políticos|Aspectos sociais e econômicos|Segurança pública no Acre):\s*(.*)$/u,
  );
  if (!match) return null;

  const title = match[1]!;
  const body = match[2]!;
  let items = commaItems(body);

  if (
    title === "Formação histórica do Acre" ||
    title === "Geografia" ||
    title === "Aspectos políticos" ||
    title === "Aspectos sociais e econômicos"
  ) {
    items = [...items.slice(0, -1), ...splitFirstConjunction(items.at(-1) ?? "")];
  } else if (title === "Aspectos étnicos e culturais") {
    const indigenous = [items[0], items[1]].filter(Boolean).join(", ");
    const remaining = items.slice(2);
    const last = remaining.pop() ?? "";
    items = [indigenous, ...remaining, ...splitFirstConjunction(last)].filter(Boolean);
  } else if (title === "Segurança pública no Acre") {
    items = splitFirstConjunction(body.replace(/[.]\s*$/u, "").trim());
  }

  return { title, subtopics: items.map(capitalizeFirst) };
}

/**
 * O edital publica Realidade do Acre em um bloco textual. Esta divisão editorial
 * organiza os mesmos itens em grupos e subtópicos, sem acrescentar conteúdo ao programa.
 * Aceita tanto o texto integral quanto os sete trechos já separados na fonte local.
 */
function splitAcreRealityTopics(topics: string[]): PcAcTopicGroup[] {
  const text = clean(topics.join(" "));
  if (!text) return [];

  const sections = text
    .split(
      /(?<=\.)\s+(?=(?:Movimento dos seringueiros|Geografia:|Aspectos étnicos e culturais:|Aspectos políticos:|Aspectos sociais e econômicos:|Segurança pública no Acre:))/u,
    )
    .map(clean)
    .filter(Boolean);

  const groups = sections
    .map(splitAcreRealitySection)
    .filter((group): group is PcAcTopicGroup => group !== null);

  return groups.length === 7 ? groups : [];
}

/**
 * Turns long strings used by the official edital into a navigable parent topic plus
 * independent subtopics. The wording is preserved; only editorial separators already
 * present in the edital are used.
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

  const colon = text.indexOf(":");
  if (colon > 0) {
    const commaParts = text
      .slice(colon + 1)
      .split(/,\s*/)
      .map(clean)
      .filter(Boolean);
    if (commaParts.length >= 4) {
      return { title: clean(text.slice(0, colon)), subtopics: commaParts };
    }
  }

  const dashParts = text.split(/\s+–\s+/).map(clean).filter(Boolean);
  if (dashParts.length >= 3) {
    return { title: dashParts[0]!, subtopics: dashParts.slice(1) };
  }

  return { title: text, subtopics: [] };
}

export function pcAcVerticalTopicGroups(discipline: PcAcTopicSource): PcAcTopicGroup[] {
  if (discipline.id === "realidade-acre" && (discipline.topics?.length ?? 0) > 0) {
    const acreGroups = splitAcreRealityTopics(discipline.topics ?? []);
    if (acreGroups.length) return acreGroups;
  }
  return (discipline.topics ?? []).map(splitPcAcTopic);
}
