import { contests as mockContests, questions as mockQuestions, disciplines as mockDisciplines } from "../data/mock";
import { Contest, Question, UserResponse, PerformanceStats } from "../types";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEYS = {
  USER_RESPONSES: 'norte_user_responses',
  FOCUSED_CONTEST: 'norte_focused_contest',
  NOTEBOOKS: 'norte_notebooks',
  STUDY_PLAN: 'norte_study_plan',
  DEMO_DATA_LOADED: 'norte_demo_loaded'
};

export const MockService = {
  // Contests
  getContests: async (): Promise<Contest[]> => {
    try {
      const { data, error } = await supabase.from('contests').select('*');
      if (error || !data || data.length === 0) return mockContests;
      return data as unknown as Contest[];
    } catch (e) {
      return mockContests;
    }
  },

  getContestById: async (id: string): Promise<Contest | undefined> => {
    try {
      const { data, error } = await supabase.from('contests').select('*').eq('id', id).single();
      if (error || !data) return mockContests.find(c => c.id === id);
      return data as unknown as Contest;
    } catch (e) {
      return mockContests.find(c => c.id === id);
    }
  },

  setFocusedContest: (id: string) => {
    localStorage.setItem(STORAGE_KEYS.FOCUSED_CONTEST, id);
    // Posteriormente: sincronizar com profile no Supabase
  },

  getFocusedContest: async (): Promise<Contest | undefined> => {
    const id = localStorage.getItem(STORAGE_KEYS.FOCUSED_CONTEST);
    if (!id) return undefined;
    return MockService.getContestById(id);
  },

  // Questions
  getQuestions: async (filters?: any): Promise<Question[]> => {
    try {
      let query = supabase.from('questions').select('*');
      
      if (filters?.disciplineId) {
        query = query.eq('discipline_id', filters.disciplineId);
      }
      if (filters?.difficulty) {
        query = query.eq('difficulty', filters.difficulty);
      }

      const { data, error } = await query;
      if (error || !data || data.length === 0) {
        let filtered = [...mockQuestions];
        if (filters?.disciplineId) {
          filtered = filtered.filter(q => q.disciplineId === filters.disciplineId);
        }
        if (filters?.difficulty) {
          filtered = filtered.filter(q => q.difficulty === filters.difficulty);
        }
        return filtered;
      }
      return data as unknown as Question[];
    } catch (e) {
      return mockQuestions;
    }
  },

  saveResponse: async (response: UserResponse) => {
    const responses = MockService.getUserResponses();
    responses.push(response);
    localStorage.setItem(STORAGE_KEYS.USER_RESPONSES, JSON.stringify(responses));
    
    // Tenta salvar no Supabase se o usuário estiver logado
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await supabase.from('user_responses').insert({
        user_id: session.user.id,
        question_id: response.questionId,
        selected_option_id: response.selectedOptionId,
        is_correct: response.isCorrect,
        time_spent: response.timeSpent
      });
    }
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
    
    const byDiscipline = mockDisciplines.map(d => {
      const discResponses = responses.filter(r => {
        const q = mockQuestions.find(question => question.id === r.questionId);
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
  },

  // Admin CRUD operations
  createContest: async (contest: Omit<Contest, 'id'>): Promise<Contest | null> => {
    try {
      const { data, error } = await supabase
        .from('contests')
        .insert(contest)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Contest;
    } catch (e) {
      console.error('Error creating contest:', e);
      return null;
    }
  },

  updateContest: async (id: string, updates: Partial<Contest>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('contests')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error updating contest:', e);
      return false;
    }
  },

  deleteContest: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('contests')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error deleting contest:', e);
      return false;
    }
  },

  createQuestion: async (question: Omit<Question, 'id'>): Promise<Question | null> => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .insert(question)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Question;
    } catch (e) {
      console.error('Error creating question:', e);
      return null;
    }
  },

  updateQuestion: async (id: string, updates: Partial<Question>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('questions')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error updating question:', e);
      return false;
    }
  },

  deleteQuestion: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error deleting question:', e);
      return false;
    }
  }
};
