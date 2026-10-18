import { useState, useEffect } from "react";
import { MockService } from "../services/mockService";
import { Contest, PerformanceStats, UserResponse } from "../types";

export function useDashboardData() {
  const [stats, setStats] = useState<PerformanceStats | null>(null);
  const [focusedContest, setFocusedContest] = useState<Contest | undefined>(undefined);
  const [contests, setContests] = useState<Contest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const [performance, contest, allContests] = await Promise.all([
        MockService.getPerformanceStats(),
        MockService.getFocusedContest().catch(() => undefined),
        MockService.getContests().catch(() => []),
      ]);
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

export { useAuthStatus } from "@/components/auth/AuthStatusProvider";
