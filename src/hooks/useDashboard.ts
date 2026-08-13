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
      const performance = await MockService.getPerformanceStats();
      const contest = await MockService.getFocusedContest();
      const allContests = await MockService.getContests();
      setStats(performance);
      setFocusedContest(contest);
      setContests(allContests);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const refreshStats = async () => {
    setStats(await MockService.getPerformanceStats());
  };

  return { stats, focusedContest, contests, isLoading, refreshStats };
}

import { SubscriptionTier, UserProfile } from '../types';

export function useAuthStatus() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Buscando perfil e roles diretamente do banco
        const [profileRes, rolesRes] = await Promise.all([
          supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single(),
          supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .single()
        ]);

        const profile = profileRes.data;
        const roleData = rolesRes.data;

        // Lógica de data efetiva: se o plano expirou, volta para free
        let currentTier = (profile?.subscription_tier as SubscriptionTier) || 'free';
        let isActivated = !!profile?.is_activated;
        
        if (profile?.subscription_expires_at) {
          const expiryDate = new Date(profile.subscription_expires_at);
          if (expiryDate < new Date()) {
            currentTier = 'free';
            isActivated = false;
          }
        }

        setUser({
          id: session.user.id,
          full_name: profile?.full_name || session.user.user_metadata['full_name'] || 'Usuário',
          name: profile?.full_name || session.user.user_metadata['full_name'] || 'Usuário',
          email: session.user.email || '',
          subscription_tier: currentTier,
          subscription_expires_at: profile?.subscription_expires_at,
          onboarding_completed: !!profile?.onboarding_completed,
          onboarding_progress: profile?.onboarding_progress || {},
          is_activated: isActivated,
          role: (roleData?.role as 'admin' | 'moderator' | 'user') || 'user'
        });
      } else {
        // Fallback para modo demo/visitante
        setUser({
          id: 'demo-user',
          full_name: 'João Silva (Demo)',
          name: 'João Silva (Demo)',
          email: 'joao.demo@norteconcurso.com.br',
          subscription_tier: 'plus',
          onboarding_completed: false,
          onboarding_progress: {},
          is_activated: true,
          role: 'user'
        });
      }
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      checkAuth();
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, isAuthenticated: !!user && user.id !== 'demo-user', isLoading, isAdmin: user?.role === 'admin' };
}



