import { contests, questions, disciplines } from "../data/mock";
import { Contest, Question, UserResponse, PerformanceStats, Notebook } from "../types";

const STORAGE_KEYS = {
  USER_RESPONSES: 'norte_user_responses',
  FOCUSED_CONTEST: 'norte_focused_contest',
  NOTEBOOKS: 'norte_notebooks',
  STUDY_PLAN: 'norte_study_plan',
  DEMO_DATA_LOADED: 'norte_demo_loaded'
};

export const MockService = {
  // Contests
  getContests: (): Contest[] => {
    return contests;
  },

  getContestById: (id: string): Contest | undefined => {
    return contests.find(c => c.id === id);
  },

  setFocusedContest: (id: string) => {
    localStorage.setItem(STORAGE_KEYS.FOCUSED_CONTEST, id);
  },

  getFocusedContest: (): Contest | undefined => {
    const id = localStorage.getItem(STORAGE_KEYS.FOCUSED_CONTEST);
    return id ? contests.find(c => c.id === id) : undefined;
  },

  // Questions
  getQuestions: (filters?: any): Question[] => {
    let filtered = [...questions];
    if (filters?.disciplineId) {
      filtered = filtered.filter(q => q.disciplineId === filters.disciplineId);
    }
    if (filters?.difficulty) {
      filtered = filtered.filter(q => q.difficulty === filters.difficulty);
    }
    return filtered;
  },

  saveResponse: (response: UserResponse) => {
    const responses = MockService.getUserResponses();
    responses.push(response);
    localStorage.setItem(STORAGE_KEYS.USER_RESPONSES, JSON.stringify(responses));
  },

  getUserResponses: (): UserResponse[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_RESPONSES);
    return stored ? JSON.parse(stored) : [];
  },

  // Stats
  getPerformanceStats: (): PerformanceStats => {
    const responses = MockService.getUserResponses();
    const correct = responses.filter(r => r.isCorrect).length;
    const total = responses.length;
    
    const byDiscipline = disciplines.map(d => {
      const discResponses = responses.filter(r => {
        const q = questions.find(question => question.id === r.questionId);
        return q?.disciplineId === d.id;
      });
      return {
        disciplineId: d.id,
        total: discResponses.length,
        correct: discResponses.filter(r => r.isCorrect).length
      };
    });

    return {
      totalQuestions: total,
      correctAnswers: correct,
      timeSpent: responses.reduce((acc, r) => acc + r.timeSpent, 0),
      accuracyRate: total > 0 ? (correct / total) * 100 : 0,
      byDiscipline
    };
  },

  // Utils
  clearProgress: () => {
    localStorage.removeItem(STORAGE_KEYS.USER_RESPONSES);
    localStorage.removeItem(STORAGE_KEYS.STUDY_PLAN);
  },

  resetDemo: () => {
    localStorage.clear();
    // Re-initialize any needed defaults
  }
};
