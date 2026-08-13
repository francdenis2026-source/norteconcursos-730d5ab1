import { useState, useEffect } from 'react';
import { MockService } from '../services/mockService';
import { Contest, PerformanceStats, UserResponse } from '../types';

export function useDashboardData() {
  const [stats, setStats] = useState<PerformanceStats | null>(null);
  const [focusedContest, setFocusedContest] = useState<Contest | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const performance = MockService.getPerformanceStats();
      const contest = MockService.getFocusedContest();
      setStats(performance);
      setFocusedContest(contest);
      setIsLoading(false);
    };

    loadData();
    // In a real app, we might listen to storage events or use a global state manager
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
