import { contests as mockContests, questions as mockQuestions, disciplines as mockDisciplines } from "../data/mock";
import { Contest, Question, UserResponse, PerformanceStats } from "../types";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEYS = {
  USER_RESPONSES: 'norte_user_responses',
  FOCUSED_CONTEST: 'norte_focused_contest',
  NOTEBOOKS: 'norte_notebooks',
  STUDY_PLAN: 'norte_study_plan',
  DEMO_DATA_LOADED: 'norte_demo_loaded',
  ONBOARDING: 'norte_onboarding'
};

export const MockService = {
  // Contests
  getContests: async (): Promise<Contest[]> => {
    try {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('contests')
        .select('*');
      
      let contests: Contest[] = [];
      if (error || !data || data.length === 0) {
        contests = mockContests;
      } else {
        contests = data as unknown as Contest[];
      }

      // Filter only active contests (if dates are provided)
      return contests.filter(c => {
        const start = c.startDate ? new Date(c.startDate).getTime() : 0;
        const end = c.endDate ? new Date(c.endDate).getTime() : Infinity;
        const currentTime = new Date().getTime();
        return currentTime >= start && currentTime <= end;
      });
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
  },

  // Subscription Plans Management
  getSubscriptionPlans: async () => {
    try {
      const { data, error } = await supabase.from('subscription_plans').select('*');
      if (error || !data || data.length === 0) return null;
      return data;
    } catch (e) {
      return null;
    }
  },

  updateSubscriptionPlan: async (id: string, updates: any, adminId?: string) => {
    try {
      // 1. Get current state for audit log
      const { data: oldPlan } = await supabase.from('subscription_plans').select('*').eq('id', id).single();
      
      // 2. Update the plan
      const { error } = await supabase.from('subscription_plans').update(updates).eq('id', id);
      if (error) throw error;

      // 3. Create audit log if we have the adminId
      if (adminId && oldPlan) {
        await supabase.from('admin_audit_logs').insert({
          admin_id: adminId,
          action: 'UPDATE_PLAN',
          entity_type: 'subscription_plan',
          entity_id: id,
          old_values: oldPlan,
          new_values: updates
        });
      }
      
      return true;
    } catch (e) {
      console.error('Error updating plan:', e);
      return false;
    }
  },

  getAdminAuditLogs: async () => {
    try {
      const { data, error } = await supabase
        .from('admin_audit_logs')
        .select(`
          *,
          admin:profiles(full_name, email)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (e) {
      console.error('Error fetching audit logs:', e);
      return [];
    }
  },

  // Access Logging
  logAccessAttempt: async (featureKey: string, tier: string, wasBlocked: boolean, metadata: any = {}) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await supabase.from('access_audit_logs').insert({
          user_id: session.user.id,
          feature_key: featureKey,
          tier,
          was_blocked: wasBlocked,
          metadata
        });
      }
    } catch (e) {
      console.error('Error logging access attempt:', e);
    }
  },

  getAccessAuditLogs: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];
      const { data, error } = await supabase
        .from('access_audit_logs')
        .select('*')
        .eq('user_id', session.user.id)
        .order('attempt_time', { ascending: false });
      if (error) throw error;
      return data;
    } catch (e) {
      console.error('Error fetching audit logs:', e);
      return [];
    }
  },

  // Onboarding
  getOnboardingStatus: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data, error } = await supabase
          .from('profiles')
          .select('onboarding_steps, onboarding_done')
          .eq('id', session.user.id)
          .single();
        if (!error && data) return data;
      }
      
      const local = localStorage.getItem(STORAGE_KEYS.ONBOARDING);
      return local ? JSON.parse(local) : { onboarding_steps: { contest: false, notebook: false, plan: false }, onboarding_done: false };
    } catch (e) {
      return { onboarding_steps: { contest: false, notebook: false, plan: false }, onboarding_done: false };
    }
  },

  updateOnboardingStatus: async (updates: { onboarding_steps?: any, onboarding_done?: boolean }) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await supabase
          .from('profiles')
          .update(updates)
          .eq('id', session.user.id);
      }
      
      const current = await MockService.getOnboardingStatus();
      const next = { ...current, ...updates };
      localStorage.setItem(STORAGE_KEYS.ONBOARDING, JSON.stringify(next));
      return true;
    } catch (e) {
      return false;
    }
  },

  // Mock Exam Logic
  getMockExams: async () => {
    const stored = localStorage.getItem('norte_mock_exams');
    return stored ? JSON.parse(stored) : [];
  },

  saveMockExam: async (exam: any) => {
    const exams = await MockService.getMockExams();
    const index = exams.findIndex((e: any) => e.id === exam.id);
    if (index >= 0) {
      exams[index] = exam;
    } else {
      exams.push(exam);
    }
    localStorage.setItem('norte_mock_exams', JSON.stringify(exams));
  },

  // Syllabus Logic
  getSyllabusProgress: async (contestId: string) => {
    const stored = localStorage.getItem(`norte_syllabus_${contestId}`);
    return stored ? JSON.parse(stored) : {};
  },

  updateSyllabusTopic: async (contestId: string, topicId: string, status: string) => {
    const progress = await MockService.getSyllabusProgress(contestId);
    progress[topicId] = status;
    localStorage.setItem(`norte_syllabus_${contestId}`, JSON.stringify(progress));
  },

  // Goals Logic
  getStudyGoals: async () => {
    const stored = localStorage.getItem('norte_study_goals');
    return stored ? JSON.parse(stored) : [];
  },

  updateGoal: async (goalId: string, current: number) => {
    const goals = await MockService.getStudyGoals();
    const index = goals.findIndex((g: any) => g.id === goalId);
    if (index >= 0) {
      goals[index].current = current;
      localStorage.setItem('norte_study_goals', JSON.stringify(goals));
    }
  }
};
