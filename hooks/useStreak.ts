import { useState, useEffect } from 'react';
import { getStreakLocal } from '@services/streakService';

export default function useStreak() {
  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStreak = async () => {
      try {
        setLoading(true);
        const currentStreak = await getStreakLocal();
        setStreak(currentStreak);
      } catch (error) {
        console.error('Error loading streak:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStreak();
  }, []);

  return { streak, loading };
}