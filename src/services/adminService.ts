
import { supabase } from "@/integrations/supabase/client";

export const MockService = {
  // Existing methods...
  
  // Ranking
  getMockExamRanking: async (contestId?: string) => {
    try {
      // For demo/mock, if not connected or no data, we return generated mock ranking
      // In production, this would be a real query
      const { data: { session } } = await supabase.auth.getSession();
      
      const mockRanking = [
        { id: '1', name: 'AlphaStuder', score: 48, total: 50, avatar: 'AS' },
        { id: '2', name: 'Concurseiro01', score: 45, total: 50, avatar: 'C1' },
        { id: '3', name: 'EstudanteFocado', score: 42, total: 50, avatar: 'EF' },
        { id: '4', name: 'MestreDasProvas', score: 40, total: 50, avatar: 'MP' },
        { id: '5', name: 'RumoAposse', score: 38, total: 50, avatar: 'RP' },
      ];

      if (session) {
        // Find if user is in ranking or add them
        const userRanking = { id: session.user.id, name: 'Você', score: 35, total: 50, avatar: 'VC' };
        return [...mockRanking, userRanking].sort((a, b) => b.score - a.score);
      }

      return mockRanking;
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
  }
};
