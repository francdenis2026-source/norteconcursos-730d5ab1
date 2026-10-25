import { canonicalSubject } from './subjects';
import { materialTopic } from './materialPractice';
export function plannedPractice(subject: string, topic?: string) {
  return { planned: '1', go: '1', mode: 'catalog', subject: canonicalSubject(subject), studySubject: canonicalSubject(subject), ...(topic ? { materialTopic: materialTopic(subject, topic) } : {}), limit: '20' };
}
export function plannedAvailability(available: number, requested = 20) {
  return available === 0 ? 'Não há questões elegíveis para o assunto planejado. Nenhum outro assunto foi incluído.' : available < requested ? `Seu plano prevê ${requested} questões; há ${available} disponíveis neste recorte. A atividade usará somente essas ${available}, sem incluir outros assuntos.` : '';
}
