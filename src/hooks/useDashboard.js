import { useState, useEffect } from 'react';
import { MockService } from '../services/mockService';
export function useDashboardData() {
    const [stats, setStats] = useState(null);
    const [focusedContest, setFocusedContest] = useState(undefined);
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
    const [user, setUser] = useState(null);
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
