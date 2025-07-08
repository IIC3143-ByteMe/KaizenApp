import { useState, useEffect, useCallback } from 'react';
import { 
  getStreakLocal, 
  fetchStreakFromBackend
} from '@services/streakService';

export default function useStreak(refreshOnMount: boolean = true) {
  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshStreak = useCallback(async (forceBackendRefresh: boolean = false) => {
    try {
      setLoading(true);
      
      if (forceBackendRefresh) {
        const backendData = await fetchStreakFromBackend();
        if (backendData) {
          setStreak(backendData.streak);
          setLoading(false);
          return;
        }
      }
      
      const currentStreak = await getStreakLocal();
      setStreak(currentStreak);
    } catch (error) {
      console.error('Error loading streak:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (refreshOnMount) {
      refreshStreak();
    }
  }, [refreshOnMount, refreshStreak]);

  return { streak, loading, refreshStreak };
}