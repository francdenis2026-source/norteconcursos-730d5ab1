import { Contest, Question, Discipline, Subject } from "../../types";

export const disciplines: Discipline[] = [
  { id: '1', name: 'Língua Portuguesa' },
  { id: '2', name: 'Raciocínio Lógico' },
  { id: '3', name: 'Informática' },
  { id: '4', name: 'Direito Constitucional' },
  { id: '5', name: 'Direito Administrativo' },
  { id: '6', name: 'Administração Pública' },
  { id: '7', name: 'Atualidades' },
];

export const contests: Contest[] = [
  {
    id: 'demo-1',
    name: 'Polícia Federal - Agente (Fictício)',
    agency: 'Polícia Federal',
    career: 'Policial',
    role: 'Agente',
    examBoard: 'Cebraspe',
    educationLevel: 'Superior',
    location: 'Nacional',
    status: 'Edital Publicado',
    vacancies: 500,
    salary: 12522.50,
    examDate: '2026-10-15',
    isDemo: true,
  },
  {
    id: 'demo-2',
    name: 'TJ-AC - Técnico Judiciário (Fictício)',
    agency: 'Tribunal de Justiça do Acre',
    career: 'Tribunal',
    role: 'Técnico Judiciário',
    examBoard: 'FGV',
    educationLevel: 'Médio',
    location: 'Rio Branco - AC',
    status: 'Previsto',
    vacancies: 50,
    salary: 5600.00,
    isDemo: true,
  },
  {
    id: 'demo-3',
    name: 'Receita Federal - Auditor (Fictício)',
    agency: 'Receita Federal',
    career: 'Fiscal',
    role: 'Auditor Fiscal',
    examBoard: 'FGV',
    educationLevel: 'Superior',
    location: 'Nacional',
    status: 'Autorizado',
    vacancies: 200,
    salary: 21029.09,
    isDemo: true,
  }
];

export const questions: Question[] = [
  // Língua Portuguesa
  {
    id: 'q1',
    text: 'Em relação à concordância nominal, assinale a alternativa correta:',
    type: 'Múltipla Escolha',
    options: [
      { id: 'a', text: 'Seguem anexo os documentos solicitados.', isCorrect: false },
      { id: 'b', text: 'É proibido a entrada de estranhos.', isCorrect: false },
      { id: 'c', text: 'As janelas estavam meio abertas.', isCorrect: true },
      { id: 'd', text: 'Elas mesmas fizeram o trabalho.', isCorrect: false },
      { id: 'e', text: 'Enviei inclusos as faturas.', isCorrect: false },
    ],
    explanation: '"Meio", quando advérbio (sentido de "um pouco"), é invariável. "Mesmas" concorda com "elas". "Anexo" deve concordar com "documentos" (anexos). "Proibido" sem artigo é invariável.',
    disciplineId: '1',
    subjectId: 's1',
    difficulty: 'Média',
    isDemo: true
  },
  // Direito Constitucional
  {
    id: 'q2',
    text: 'A República Federativa do Brasil tem como fundamento a dignidade da pessoa humana.',
    type: 'Certo ou Errado',
    correctAnswer: true,
    explanation: 'Conforme o Art. 1º, inciso III da CF/88, a dignidade da pessoa humana é um dos fundamentos da República.',
    disciplineId: '4',
    subjectId: 's2',
    difficulty: 'Fácil',
    isDemo: true
  },
  // Adding more mock questions as needed...
];

// Preencher com 40 questões conforme solicitado
for (let i = 3; i <= 42; i++) {
  const disc = disciplines[i % disciplines.length];
  questions.push({
    id: `q${i}`,
    text: `Questão demonstrativa ${i} sobre ${disc.name}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    type: i % 3 === 0 ? 'Certo ou Errado' : 'Múltipla Escolha',
    options: i % 3 === 0 ? undefined : [
      { id: 'a', text: 'Alternativa A', isCorrect: true },
      { id: 'b', text: 'Alternativa B', isCorrect: false },
      { id: 'c', text: 'Alternativa C', isCorrect: false },
      { id: 'd', text: 'Alternativa D', isCorrect: false },
      { id: 'e', text: 'Alternativa E', isCorrect: false },
    ],
    correctAnswer: i % 3 === 0 ? true : undefined,
    explanation: `Explicação detalhada da questão ${i}. Esta é uma questão de demonstração.`,
    disciplineId: disc.id,
    subjectId: `s${i}`,
    difficulty: i % 2 === 0 ? 'Média' : 'Difícil',
    isDemo: true
  });
}
