import { useState, useEffect } from 'react';
import { MockService } from '../services/mockService';
import { Contest, PerformanceStats, UserResponse } from '../types';
import { supabase } from '@/integrations/supabase/client';

export function useDashboardData() {

  const [stats, setStats] = useState<PerformanceStats | null>(null);
  const [focusedContest, setFocusedContest] = useState<Contest | undefined>(undefined);
  const [contests, setContests] = useState<Contest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const performance = MockService.getPerformanceStats();
      const contest = await MockService.getFocusedContest();
      const allContests = await MockService.getContests();
      setStats(performance);
      setFocusedContest(contest);
      setContests(allContests);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const refreshStats = () => {
    setStats(MockService.getPerformanceStats());
  };

  return { stats, focusedContest, contests, isLoading, refreshStats };
}

import { SubscriptionTier } from '../types';

export function useAuthStatus() {
  const [user, setUser] = useState<{ 
    id: string;
    name: string; 
    email: string; 
    role: SubscriptionTier; 
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Buscando perfil para pegar o tier atual diretamente do banco
        const { data: profile } = await supabase
          .from('profiles')
          .select('subscription_tier')
          .eq('id', session.user.id)
          .single();

        setUser({
          id: session.user.id,
          name: session.user.user_metadata['full_name'] || 'Usuário',
          email: session.user.email || '',
          role: (profile?.subscription_tier as SubscriptionTier) || 
                (session.user.user_metadata['role'] as SubscriptionTier) || 
                'free'
        });
      } else {
        // Fallback para modo demo/visitante
        setUser({
          id: 'demo-user',
          name: 'João Silva (Demo)',
          email: 'joao.demo@norteconcurso.com.br',
          role: 'plus'
        });
      }
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        checkAuth(); 
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, isAuthenticated: !!user, isLoading };
}



