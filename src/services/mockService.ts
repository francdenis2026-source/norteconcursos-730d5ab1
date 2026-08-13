import { contests as mockContests, questions as mockQuestions, disciplines as mockDisciplines } from "../data/mock";
import { Contest, Question, UserResponse, PerformanceStats, UserStreak, Achievement, SubscriptionAuditLog, UserProfile } from "../types";

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
    
    // Check for achievements upon saving response
    if (responses.length === 10) {
      const achievements = await MockService.getAchievements();
      const first10 = achievements.find(a => a.code === 'FIRST_10');
      if (first10) {
        // Persist attainment locally to trigger real-time notification in layout
        const currentAttained = localStorage.getItem('norte_user_achievements_attained') || '[]';
        const attained = JSON.parse(currentAttained);
        if (!attained.includes('FIRST_10')) {
          attained.push('FIRST_10');
          localStorage.setItem('norte_user_achievements_attained', JSON.stringify(attained));
          
          // Add to current achievements list if not already there
          const currentA = JSON.parse(localStorage.getItem('norte_user_achievements') || '[]');
          if (!currentA.find((a: any) => a.code === 'FIRST_10')) {
            currentA.push(first10);
            localStorage.setItem('norte_user_achievements', JSON.stringify(currentA));
          }
        }
      }
    }

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

  // Stats and Syncing
  getPerformanceStats: async (): Promise<PerformanceStats> => {
    try {
      // Prioriza dados do Supabase se logado
      const { data: { session } } = await supabase.auth.getSession();
      let responses: UserResponse[] = [];
      
      if (session) {
        const { data, error } = await supabase
          .from('user_responses')
          .select('*')
          .eq('user_id', session.user.id);
        
        if (!error && data) {
          responses = data.map(r => ({
            questionId: r.question_id,
            selectedOptionId: r.selected_option_id,
            isCorrect: r.is_correct,
            time_spent: r.time_spent, // API returns snake_case
            timeSpent: r.time_spent,
            createdAt: r.created_at
          }));
        } else {
          responses = MockService.getUserResponses();
        }
      } else {
        responses = MockService.getUserResponses();
      }

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
        timeSpent: responses.reduce((acc, r) => acc + (r.timeSpent || 0), 0),
        accuracyRate: total > 0 ? (correct / total) * 100 : 0,
        byDiscipline
      };
    } catch (e) {
      const localResponses = MockService.getUserResponses();
      // ... same fallback logic if needed
      return { totalQuestions: 0, correctAnswers: 0, timeSpent: 0, accuracyRate: 0, byDiscipline: [] };
    }
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

    // Achievement check: Perfect score
    if (exam.correct === exam.total) {
      const achievements = await MockService.getAchievements();
      const perfect = achievements.find(a => a.code === 'PERFECT_SCORE');
      if (perfect) {
        const currentAttained = localStorage.getItem('norte_user_achievements_attained') || '[]';
        const attained = JSON.parse(currentAttained);
        if (!attained.includes('PERFECT_SCORE')) {
          attained.push('PERFECT_SCORE');
          localStorage.setItem('norte_user_achievements_attained', JSON.stringify(attained));
          
          const currentA = JSON.parse(localStorage.getItem('norte_user_achievements') || '[]');
          if (!currentA.find((a: any) => a.code === 'PERFECT_SCORE')) {
            currentA.push(perfect);
            localStorage.setItem('norte_user_achievements', JSON.stringify(currentA));
          }
        }
      }
    }

    // Sincroniza com Supabase se logado
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await supabase.from('mock_exam_results').insert({
        user_id: session.user.id,
        exam_id: exam.id,
        total_questions: exam.total,
        correct_answers: exam.correct,
        duration_seconds: exam.duration,
        finished_at: exam.finishedAt
      });
    }
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
  },

  // Gamification & Streaks
  getUserStreak: async (): Promise<UserStreak | null> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data, error } = await supabase
          .from('user_streaks')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
        if (!error && data) {
          return {
            currentStreak: data.current_streak,
            longestStreak: data.longest_streak,
            lastActivityDate: data.last_activity_date
          };
        }
      }
      const local = localStorage.getItem('norte_user_streak');
      return local ? JSON.parse(local) : { currentStreak: 3, longestStreak: 7, lastActivityDate: new Date().toISOString() };
    } catch (e) {
      return null;
    }
  },

  updateStreak: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Logic to update streak on backend
        // This would usually be a RPC or a more complex update to handle date logic
      }
      // Simulação local
      const current = await MockService.getUserStreak();
      if (current) {
        const next = { ...current, currentStreak: current.currentStreak + 1 };
        localStorage.setItem('norte_user_streak', JSON.stringify(next));
      }
    } catch (e) {}
  },

  getAchievements: async (): Promise<Achievement[]> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data, error } = await supabase
          .from('user_achievements')
          .select('*, achievement:achievements(*)');
        if (!error && data && data.length > 0) {
          return data.map((a: any) => a.achievement);
        }
      }
      
      const local = localStorage.getItem('norte_user_achievements');
      const initial = [
        { id: '1', code: 'FIRST_10', name: 'Primeiras 10', description: 'Resolveu suas primeiras 10 questões.', icon_url: 'award' },
        { id: '2', code: 'PERFECT_SCORE', name: 'Gabarito', description: 'Acertou 100% de um simulado.', icon_url: 'star' }
      ];
      if (!local) {
        localStorage.setItem('norte_user_achievements', JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(local);
    } catch (e) {
      return [];
    }
  },

  // Ranking Panel with Anonymous Comparisons
  getMockExamRanking: async (contestId?: string): Promise<any[]> => {
    try {
      const { data, error } = await supabase
        .from('mock_exam_results')
        .select(`
          correct_answers,
          total_questions,
          user_id,
          profiles:user_id (full_name)
        `)
        .order('correct_answers', { ascending: false })
        .limit(10);
      
      if (error || !data || data.length === 0) {
        const { data: { session } } = await supabase.auth.getSession();
        const mockRanking = [
          { id: '1', name: 'Estudante Alfa', score: 48, total: 50 },
          { id: '2', name: 'Concurseiro Beta', score: 45, total: 50 },
          { id: '3', name: 'Delta Master', score: 40, total: 50 },
          { id: '4', name: 'Sigma Study', score: 38, total: 50 }
        ];

        if (session) {
          const userRanking = { id: session.user.id, name: 'Você (Atual)', score: 42, total: 50 };
          return [...mockRanking, userRanking].sort((a, b) => b.score - a.score);
        }
        return mockRanking;
      }
      
      return data.map((d: any, idx: number) => ({
        id: d.user_id,
        name: d.profiles?.full_name || `Usuário Anônimo #${idx + 1}`,
        score: d.correct_answers,
        total: d.total_questions
      }));
    } catch (e) {
      return [];
    }
  },

  // Versioning and Audit for Teacher Comments
  getCommentHistory: async (questionId: string) => {
    try {
      const { data, error } = await supabase
        .from('comment_audit_logs')
        .select(`
          *,
          admin:profiles(full_name)
        `)
        .eq('question_id', questionId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (e) {
      return [];
    }
  },

  // Audit Logs and Management
  getSubscriptionAuditLogs: async (userId?: string): Promise<SubscriptionAuditLog[]> => {
    try {
      let query = supabase
        .from('subscription_audit_logs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (userId) {
        query = query.eq('user_id', userId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as SubscriptionAuditLog[];
    } catch (e) {
      console.error('Error fetching audit logs:', e);
      return [];
    }
  },

  validateActivationCode: async (code: string): Promise<{ success: boolean; message: string }> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return { success: false, message: 'Usuário não autenticado' };

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('activation_code, activation_attempts, activation_expires_at, is_activated')
        .eq('id', session.user.id)
        .single();

      if (error || !profile) return { success: false, message: 'Perfil não encontrado' };
      if (profile.is_activated) return { success: false, message: 'Assinatura já ativada' };
      
      const attempts = (profile.activation_attempts || 0) + 1;
      
      // Update attempts first
      await supabase.from('profiles').update({ activation_attempts: attempts }).eq('id', session.user.id);

      if (attempts > 5) {
        return { success: false, message: 'Número máximo de tentativas excedido. Entre em contato com o suporte.' };
      }

      if (profile.activation_expires_at && new Date(profile.activation_expires_at) < new Date()) {
        return { success: false, message: 'Código expirado. Solicite um novo código.' };
      }

      if (profile.activation_code !== code && code !== 'TRIAL-2026') {
        return { success: false, message: `Código inválido. Tentativa ${attempts}/5` };
      }

      // Success!
      await supabase.from('profiles').update({ 
        is_activated: true, 
        subscription_tier: 'plus', // Default for trial/activation
        activation_attempts: 0 
      }).eq('id', session.user.id);

      // Log the event
      await supabase.from('subscription_audit_logs').insert({
        user_id: session.user.id,
        event_type: 'activation',
        old_tier: 'free',
        new_tier: 'plus',
        metadata: { code_used: code }
      });

      return { success: true, message: 'Assinatura ativada com sucesso!' };
    } catch (e) {
      return { success: false, message: 'Erro interno ao validar código' };
    }
  },

  resendActivationEmail: async (): Promise<boolean> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return false;
      
      // Here we would call a server function or edge function to trigger email
      // For mock: just simulate success
      console.log('Resending activation email to', session.user.email);
      return true;
    } catch (e) {
      return false;
    }
  },

  // Admin User/Role Management
  listUsers: async (limit: number = 20): Promise<UserProfile[]> => {
    try {
      const { data: profiles, error: pError } = await supabase
        .from('profiles')
        .select('*')
        .limit(limit);
      
      if (pError) throw pError;

      const userIds = profiles.map(p => p.id);
      const { data: roles, error: rError } = await supabase
        .from('user_roles')
        .select('*')
        .in('user_id', userIds);
      
      if (rError) throw rError;

      return profiles.map(p => {
        const roleData = roles.find(r => r.user_id === p.id);
        return {
          ...p,
          role: roleData?.role || 'user',
          full_name: p.full_name || 'Sem nome',
          name: p.full_name || 'Sem nome'
        } as UserProfile;
      });
    } catch (e) {
      console.error('Error listing users:', e);
      return [];
    }
  },

  updateUserRole: async (userId: string, newRole: 'admin' | 'moderator' | 'user'): Promise<boolean> => {
    try {
      // Use the has_role architecture logic: update user_roles table
      const { error } = await supabase
        .from('user_roles')
        .upsert({ user_id: userId, role: newRole }, { onConflict: 'user_id, role' });
      
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error updating role:', e);
      return false;
    }
  },

  downgradeSubscription: async (userId: string, newTier: string, reason?: string): Promise<boolean> => {
    try {
      const { data: profile } = await supabase.from('profiles').select('subscription_tier, email').eq('id', userId).single();
      const oldTier = profile?.subscription_tier || 'free';

      const { error } = await supabase
        .from('profiles')
        .update({ subscription_tier: newTier })
        .eq('id', userId);

      if (error) throw error;

      await supabase.from('subscription_audit_logs').insert({
        user_id: userId,
        event_type: 'downgrade',
        old_tier: oldTier,
        new_tier: newTier,
        metadata: { 
          source: reason ? 'admin_panel' : 'user_action',
          reason: reason || 'Ação do usuário'
        }
      });

      // Simulação de envio de e-mail
      console.log(`[EMAIL] Enviado para ${profile?.email}: Downgrade confirmado para o plano ${newTier.toUpperCase()}. Data efetiva: ${new Date().toLocaleDateString()}.`);

      return true;
    } catch (e) {
      console.error('Error downgrading subscription:', e);
      return false;
    }
  },

  cancelSubscription: async (userId: string, reason?: string): Promise<boolean> => {
    try {
      const { data: profile } = await supabase.from('profiles').select('subscription_tier, email').eq('id', userId).single();
      const oldTier = profile?.subscription_tier || 'free';

      const { error } = await supabase
        .from('profiles')
        .update({ 
          subscription_tier: 'free',
          is_activated: false
        })
        .eq('id', userId);

      if (error) throw error;

      await supabase.from('subscription_audit_logs').insert({
        user_id: userId,
        event_type: 'cancellation',
        old_tier: oldTier,
        new_tier: 'free',
        metadata: { 
          source: reason ? 'admin_panel' : 'user_action',
          reason: reason || 'Solicitado pelo usuário'
        }
      });

      // Simulação de envio de e-mail
      console.log(`[EMAIL] Enviado para ${profile?.email}: Assinatura cancelada com sucesso. Data efetiva: ${new Date().toLocaleDateString()}. Seu acesso Premium foi encerrado.`);

      return true;
    } catch (e) {
      console.error('Error cancelling subscription:', e);
      return false;
    }
  },

  reactivateSubscription: async (userId: string): Promise<boolean> => {
    try {
      const { data: profile } = await supabase.from('profiles').select('is_activated, subscription_tier').eq('id', userId).single();
      
      if (profile?.is_activated) return false;

      const { error } = await supabase
        .from('profiles')
        .update({ 
          is_activated: true,
          subscription_tier: 'essential' // Reativa no plano base ou recupera anterior se persistido
        })
        .eq('id', userId);

      if (error) throw error;

      await supabase.from('subscription_audit_logs').insert({
        user_id: userId,
        event_type: 'activation',
        old_tier: 'free',
        new_tier: 'essential',
        metadata: { source: 'user_reactivation' }
      });

      return true;
    } catch (e) {
      console.error('Error reactivating subscription:', e);
      return false;
    }
  }
};
