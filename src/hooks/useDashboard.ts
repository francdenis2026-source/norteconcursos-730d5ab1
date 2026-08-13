import { useState, useEffect } from 'react';
import { MockService } from '../services/mockService';
import { Contest, PerformanceStats, UserResponse } from '../types';

export function useDashboardData() {
  const [stats, setStats] = useState<PerformanceStats | null>(null);
  const [focusedContest, setFocusedContest] = useState<Contest | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const performance = MockService.getPerformanceStats();
      const contest = await MockService.getFocusedContest();
      setStats(performance);
      setFocusedContest(contest);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const refreshStats = () => {
    setStats(MockService.getPerformanceStats());
  };

  return { stats, focusedContest, isLoading, refreshStats };
}

export function useAuthStatus() {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setUser({
          name: session.user.user_metadata.full_name || 'Usuário',
          email: session.user.email || '',
          role: session.user.user_metadata.role || 'Plus'
        });
      } else {
        // Fallback for demo mode if no session
        setUser({
          name: 'João Silva (Demo)',
          email: 'joao.demo@norteconcurso.com.br',
          role: 'Plus'
        });
      }
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser({
          name: session.user.user_metadata.full_name || 'Usuário',
          email: session.user.email || '',
          role: session.user.user_metadata.role || 'Plus'
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, isAuthenticated: !!user, isLoading };
}

