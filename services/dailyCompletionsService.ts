import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

interface Goal {
  period: string;
  type: string;
  target: number;
  unit: string;
  progress?: number;
  percentage?: number;
  completed?: boolean;
}

interface CompletionEntry {
  habit_id: string;
  title: string;
  goal: Goal;
  progress?: number;
  percentage?: number;
  completed?: boolean;
}

export interface DailyCompletions {
  _id?: string;
  user_id: string;
  date: string;
  completions: CompletionEntry[];
  overall_percentage: number;
  day_completed: boolean;
}

const DAILY_COMPLETIONS_STORAGE_KEY = 'daily_completions';


export const fetchDailyCompletionsFromBackend = async (): Promise<DailyCompletions> => {
  try {
    console.log('🔄 Obteniendo daily completions del backend...');

    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - (offset * 60 * 1000));
    const date = localDate.toISOString().split('T')[0];
    console.log(`📅 Fecha para obtener daily completions: ${date}`);
    const response = await api.post('/daily-completions/', date);
    
    const daily_completions: DailyCompletions = response.data;

    console.log(`✅ Obtenidos daily completions del backend: ${JSON.stringify(daily_completions)}`);
    
    await AsyncStorage.setItem(DAILY_COMPLETIONS_STORAGE_KEY, JSON.stringify(daily_completions));
    
    return daily_completions;
  } catch (error) {
    console.error('❌ Error al obtener daily completions del backend:', error);
    throw error;
  }
};

export const getDailyCompletions = async (): Promise<DailyCompletions | null> => {
  try {
    const storedData = await AsyncStorage.getItem(DAILY_COMPLETIONS_STORAGE_KEY);
    if (!storedData) {
      return await fetchDailyCompletionsFromBackend();
    }
    return JSON.parse(storedData);
  } catch (error) {
    console.error('❌ Error al obtener daily completions del almacenamiento:', error);
    return null;
  }
};

export const updateHabitCompletion = async (
  habitId: string, 
  progress: number
): Promise<DailyCompletions | null> => {
  try {
    let dailyCompletions = await getDailyCompletions();
    
    if (!dailyCompletions) {
      dailyCompletions = await fetchDailyCompletionsFromBackend();
    }
    
    if (!dailyCompletions) {
      throw new Error('No se pudo obtener daily completions');
    }
    
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - (offset * 60 * 1000));
    const date = localDate.toISOString().split('T')[0];
    
    try {
      console.log(`🔄 Actualizando progreso para hábito ${habitId} a ${progress}...`);
      
      const payload = {
        habit_id: habitId,
        date: date,
        progress: progress
      };
      
      console.log('📤 Enviando payload:', payload);
      await api.patch('/daily-completions/update-progress', payload);
      console.log('✅ Progreso actualizado en el backend');
      
      const updatedCompletions = await fetchDailyCompletionsFromBackend();
      return updatedCompletions;
    } catch (error) {
      console.error('❌ Error al actualizar progreso en el backend:', error);

      const habitIndex = dailyCompletions.completions.findIndex(
        completion => completion.habit_id === habitId
      );
      
      if (habitIndex === -1) {
        console.warn(`Hábito con ID ${habitId} no encontrado en daily completions`);
        return dailyCompletions;
      }
      
      dailyCompletions.completions[habitIndex].progress = progress;
      
      const isCompleted = progress >= dailyCompletions.completions[habitIndex].goal.target;
      dailyCompletions.completions[habitIndex].completed = isCompleted;
      
      const percentage = Math.min(
        1, 
        progress / dailyCompletions.completions[habitIndex].goal.target
      );
      dailyCompletions.completions[habitIndex].percentage = percentage;
      
      dailyCompletions.completions[habitIndex].goal.progress = progress;
      dailyCompletions.completions[habitIndex].goal.percentage = percentage;
      dailyCompletions.completions[habitIndex].goal.completed = isCompleted;
      
      const totalCompletions = dailyCompletions.completions.length;
      const completedCount = dailyCompletions.completions.filter(c => c.completed).length;
      dailyCompletions.overall_percentage = totalCompletions > 0 
        ? completedCount / totalCompletions 
        : 0;
      
      dailyCompletions.day_completed = totalCompletions > 0 && 
        completedCount === totalCompletions;
      
      await AsyncStorage.setItem(
        DAILY_COMPLETIONS_STORAGE_KEY, 
        JSON.stringify(dailyCompletions)
      );
      
      return dailyCompletions;
    }
  } catch (error) {
    console.error('❌ Error al actualizar completion del hábito:', error);
    return null;
  }
};

export const getHabitCompletion = async (habitId: string): Promise<{
  progress: number;
  percentage: number;
  completed: boolean;
} | null> => {
  try {
    const dailyCompletions = await getDailyCompletions();
    
    if (!dailyCompletions) {
      return null;
    }
    
    const habitCompletion = dailyCompletions.completions.find(
      completion => completion.habit_id === habitId
    );
    
    if (!habitCompletion) {
      return null;
    }
    
    return {
      progress: habitCompletion.progress || 0,
      percentage: habitCompletion.percentage || 0,
      completed: habitCompletion.completed || false
    };
  } catch (error) {
    console.error('❌ Error al obtener completion del hábito:', error);
    return null;
  }
};
