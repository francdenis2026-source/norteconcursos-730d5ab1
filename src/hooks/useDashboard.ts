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
  // Simplified mock auth check
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    // Simulate getting user from session/storage
    setUser({
      name: 'João Silva (Demo)',
      email: 'joao.demo@norteconcurso.com.br',
      role: 'Plus'
    });
  }, []);

  return { user, isAuthenticated: !!user };
}
