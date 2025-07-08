import { useState, useEffect } from 'react';
import { getIkigai } from '@services/ikigaiStorage';
import { getHabits, Habit } from '@services/habitStorage';

export type IkigaiCategory = "passion" | "mission" | "vocation" | "profession" | null;

export interface IkigaiData {
  you_love: string;
  good_at: string;
  world_needs: string;
  is_profitable: string;
}

export function useIkigai(refreshKey?: number) {
  const [ikigaiData, setIkigaiData] = useState<IkigaiData>({
    you_love: "",
    good_at: "",
    world_needs: "",
    is_profitable: "",
  });
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const ikigai = await getIkigai();
        if (ikigai) {
          setIkigaiData({
            you_love: ikigai.you_love || "",
            good_at: ikigai.good_at || "",
            world_needs: ikigai.world_needs || "",
            is_profitable: ikigai.is_profitable || "",
          });
        }

        const habitData = await getHabits();
        setHabits(habitData);
      } catch (err) {
        setError('Error al cargar los datos de Ikigai');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [refreshKey]);

  const getHabitsByCategory = (category: IkigaiCategory) => {
    if (!category) return [];
    return habits.filter(h => h.ikigai_category?.toLowerCase() === category);
  };

  return {
    ikigaiData,
    habits,
    getHabitsByCategory,
    loading,
    error
  };
}