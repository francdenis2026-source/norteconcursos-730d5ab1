import { canonicalSubject, canonicalTopic, topicIdentity } from "./subjects";
import { classifyTopic } from "./questionTopics";
import type { Question } from "./questionFormat";

export function questionTopic(question: Pick<Question, "subject" | "subtopic" | "text">) {
  return canonicalTopic(question.subtopic) ?? classifyTopic(question.subject, question.text);
}
export function scopedTopic(subject: string, topic: string) {
  return `${canonicalSubject(subject)}::${canonicalTopic(topic) ?? topic}`;
}
export function topicFilterLabel(value: string) {
  return value.replace("::", " · ");
}
export function filterTopicIdentity(value: string) {
  const separator = value.indexOf("::");
  return separator < 0
    ? topicIdentity(value)
    : `${topicIdentity(canonicalSubject(value.slice(0, separator)))}::${topicIdentity(value.slice(separator + 2))}`;
}
export function matchesTopicFilter(
  subject: string,
  topic: string | null | undefined,
  filter: string,
) {
  if (filter === "all") return true;
  if (!topic) return false;
  const separator = filter.indexOf("::");
  if (separator < 0)
    return (
      topicIdentity(topic) === topicIdentity(filter) ||
      topicIdentity(classifyTopic(subject, topic)) === topicIdentity(filter)
    );
  return (
    topicIdentity(canonicalSubject(subject)) ===
      topicIdentity(canonicalSubject(filter.slice(0, separator))) &&
    topicIdentity(topic) === topicIdentity(filter.slice(separator + 2))
  );
}
/** One stable spelling per scoped filter; detailed article topics remain separate. */
export function topicLabels(values: string[]) {
  const grouped = new Map<string, string>();
  for (const value of [...values].sort((a, b) => a.localeCompare(b, "pt-BR"))) {
    const key = filterTopicIdentity(value);
    if (!grouped.has(key)) grouped.set(key, value);
  }
  return [...grouped.values()];
}
