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

const DAILY_COMPLETIONS_STORAGE_KEY_PREFIX = 'daily_completions_';

const getStorageKeyForDate = (date: string): string => {
  return `${DAILY_COMPLETIONS_STORAGE_KEY_PREFIX}${date}`;
};


export const fetchDailyCompletionsFromBackend = async (targetDate?: string): Promise<DailyCompletions> => {
  try {
    let date = targetDate;
    if (!date) {
      const now = new Date();
      const offset = now.getTimezoneOffset();
      const localDate = new Date(now.getTime() - (offset * 60 * 1000));
      date = localDate.toISOString().split('T')[0];
    }
    
    const response = await api.post('/daily-completions/', date);
    
    const daily_completions: DailyCompletions = response.data;
    
    const storageKey = getStorageKeyForDate(date);
    await AsyncStorage.setItem(storageKey, JSON.stringify(daily_completions));
    
    return daily_completions;
  } catch (error) {
    throw error;
  }
};

export const getDailyCompletions = async (targetDate?: string): Promise<DailyCompletions | null> => {
  try {
    let date = targetDate;
    if (!date) {
      const now = new Date();
      const offset = now.getTimezoneOffset();
      const localDate = new Date(now.getTime() - (offset * 60 * 1000));
      date = localDate.toISOString().split('T')[0];
    }
    
    const storageKey = getStorageKeyForDate(date);
    const storedData = await AsyncStorage.getItem(storageKey);
    
    if (!storedData) {
      return await fetchDailyCompletionsFromBackend(date);
    }
    
    return JSON.parse(storedData);
  } catch (error) {
    return null;
  }
};

export const updateHabitCompletion = async (
  habitId: string, 
  progress: number,
  targetDate?: string
): Promise<DailyCompletions | null> => {
  try {
    let date = targetDate;
    if (!date) {
      const now = new Date();
      const offset = now.getTimezoneOffset();
      const localDate = new Date(now.getTime() - (offset * 60 * 1000));
      date = localDate.toISOString().split('T')[0];
    }
    
    let dailyCompletions = await getDailyCompletions(date);
    
    if (!dailyCompletions) {
      dailyCompletions = await fetchDailyCompletionsFromBackend(date);
    }
    
    if (!dailyCompletions) {
      throw new Error(`No se pudo obtener daily completions para fecha ${date}`);
    }
    
    try {      
      const payload = {
        habit_id: habitId,
        date: date,
        progress: progress
      };
      
      await api.patch('/daily-completions/update-progress', payload);
      
      const updatedCompletions = await fetchDailyCompletionsFromBackend(date);
      return updatedCompletions;
    } catch (error) {

      const habitIndex = dailyCompletions.completions.findIndex(
        completion => completion.habit_id === habitId
      );
      
      if (habitIndex === -1) {
        console.warn(`Hábito con ID ${habitId} no encontrado en daily completions para fecha ${date}`);
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
      
      const storageKey = getStorageKeyForDate(date);
      await AsyncStorage.setItem(
        storageKey, 
        JSON.stringify(dailyCompletions)
      );
      
      return dailyCompletions;
    }
  } catch (error) {
    return null;
  }
};

export const getHabitCompletion = async (
  habitId: string,
  targetDate?: string
): Promise<{
  progress: number;
  percentage: number;
  completed: boolean;
} | null> => {
  try {
    let date = targetDate;
    if (!date) {
      const now = new Date();
      const offset = now.getTimezoneOffset();
      const localDate = new Date(now.getTime() - (offset * 60 * 1000));
      date = localDate.toISOString().split('T')[0];
    }
    
    const dailyCompletions = await getDailyCompletions(date);
    
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
    return null;
  }
};

export const preloadCompletionsForDateRange = async (dates: string[]): Promise<void> => {
  try {
    const fetchPromises = dates.map(date => {
      return getDailyCompletions(date)
        .then(completions => {
          if (!completions) {
            return fetchDailyCompletionsFromBackend(date);
          }
          return completions;
        })
        .catch(error => {
          return null;
        });
    });
    
    await Promise.all(fetchPromises);
    
  } catch (error) {}
};

export const clearAllDailyCompletions = async (): Promise<void> => {
  try {   
    const allKeys = await AsyncStorage.getAllKeys();
    
    const completionsKeys = allKeys.filter(key => 
      key.startsWith(DAILY_COMPLETIONS_STORAGE_KEY_PREFIX)
    );
    
    if (completionsKeys.length > 0) {
      await AsyncStorage.multiRemove(completionsKeys);
    }
  } catch (error) {
    throw error;
  }
};

export const getMonthCompletions = async (month: string): Promise<DailyCompletions[]> => {
  try {    
    const response = await api.get<DailyCompletions[]>(`/month-completions/${month}`);
    
    if (response.data && Array.isArray(response.data)) {
      
      for (const completion of response.data) {
        if (completion.date) {
          const storageKey = getStorageKeyForDate(completion.date);
          await AsyncStorage.setItem(storageKey, JSON.stringify(completion));
        }
      }
      
      return response.data;
    }
    return [];
  } catch (error) {
    return [];
  }
};
