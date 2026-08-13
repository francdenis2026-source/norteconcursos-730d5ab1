export type Career = 'Policial' | 'Administrativa' | 'Tribunal' | 'Fiscal' | 'Bancária' | 'Saúde' | 'Educação';

export type ContestStatus = 'Previsto' | 'Autorizado' | 'Edital Publicado' | 'Inscrições Abertas' | 'Encerrado';

export type SubscriptionTier = 'free' | 'essential' | 'plus' | 'premium';


export interface Contest {
  id: string;
  name: string;
  agency: string;
  career: Career;
  role: string;
  examBoard: string;
  educationLevel: 'Médio' | 'Superior';
  location: string;
  status: ContestStatus;
  vacancies: number;
  salary: number;
  examDate?: string;
  startDate?: string;
  endDate?: string;
  isDemo?: boolean;
}

export interface Subject {
  id: string;
  name: string;
  disciplineId: string;
  parentId?: string; // For sub-subjects
}

export interface Discipline {
  id: string;
  name: string;
}

export type QuestionType = 'Múltipla Escolha' | 'Certo ou Errado';
export type Difficulty = 'Fácil' | 'Média' | 'Difícil';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  correctAnswer?: boolean; // For Certo/Errado
  explanation: string;
  teacherComment?: string;
  disciplineId: string;
  subjectId: string;
  difficulty: Difficulty;
  isDemo: boolean;
}

export interface UserResponse {
  questionId: string;
  selectedOptionId?: string;
  booleanAnswer?: boolean;
  isCorrect: boolean;
  timeSpent: number; // in seconds
  createdAt: string;
}

export interface Notebook {
  id: string;
  name: string;
  description?: string;
  questionIds: string[];
  contestId?: string;
  createdAt: string;
}

export interface StudyPlan {
  id: string;
  contestId: string;
  startDate: string;
  examDate: string;
  weeklyGoalHours: number;
  dailyBlocks: StudyBlock[];
}

export interface StudyBlock {
  id: string;
  dayOfWeek: number; // 0-6
  startTime: string;
  duration: number; // minutes
  disciplineId: string;
  type: 'Teoria' | 'Questões' | 'Revisão' | 'Simulado';
  status: 'Pendente' | 'Em andamento' | 'Concluído' | 'Adiado' | 'Vencido';
}

export interface PerformanceStats {
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  accuracyRate: number;
  byDiscipline: {
    disciplineId: string;
    total: number;
    correct: number;
  }[];
}
