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

// Helper function to get storage key for a specific date
const getStorageKeyForDate = (date: string): string => {
  return `${DAILY_COMPLETIONS_STORAGE_KEY_PREFIX}${date}`;
};


export const fetchDailyCompletionsFromBackend = async (targetDate?: string): Promise<DailyCompletions> => {
  try {
    // If no date is provided, use today's date
    let date = targetDate;
    if (!date) {
      const now = new Date();
      const offset = now.getTimezoneOffset();
      const localDate = new Date(now.getTime() - (offset * 60 * 1000));
      date = localDate.toISOString().split('T')[0];
    }
    
    console.log(`� Obteniendo daily completions del backend para fecha ${date}...`);
    console.log(`�📅 Fecha para obtener daily completions: ${date}`);
    const response = await api.post('/daily-completions/', date);
    
    const daily_completions: DailyCompletions = response.data;

    console.log(`✅ Obtenidos daily completions del backend para ${date}: ${JSON.stringify(daily_completions)}`);
    
    // Store with date-specific key
    const storageKey = getStorageKeyForDate(date);
    await AsyncStorage.setItem(storageKey, JSON.stringify(daily_completions));
    
    return daily_completions;
  } catch (error) {
    console.error('❌ Error al obtener daily completions del backend:', error);
    throw error;
  }
};

export const getDailyCompletions = async (targetDate?: string): Promise<DailyCompletions | null> => {
  try {
    // If no date is provided, use today's date
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
      // If no data for this date, fetch from backend
      return await fetchDailyCompletionsFromBackend(date);
    }
    
    return JSON.parse(storedData);
  } catch (error) {
    console.error(`❌ Error al obtener daily completions del almacenamiento para fecha ${targetDate || 'hoy'}:`, error);
    return null;
  }
};

export const updateHabitCompletion = async (
  habitId: string, 
  progress: number,
  targetDate?: string
): Promise<DailyCompletions | null> => {
  try {
    // If no date is provided, use today's date
    let date = targetDate;
    if (!date) {
      const now = new Date();
      const offset = now.getTimezoneOffset();
      const localDate = new Date(now.getTime() - (offset * 60 * 1000));
      date = localDate.toISOString().split('T')[0];
    }
    
    // Get completions for the specific date
    let dailyCompletions = await getDailyCompletions(date);
    
    if (!dailyCompletions) {
      dailyCompletions = await fetchDailyCompletionsFromBackend(date);
    }
    
    if (!dailyCompletions) {
      throw new Error(`No se pudo obtener daily completions para fecha ${date}`);
    }
    
    try {
      console.log(`🔄 Actualizando progreso para hábito ${habitId} a ${progress} en fecha ${date}...`);
      
      const payload = {
        habit_id: habitId,
        date: date,
        progress: progress
      };
      
      console.log('📤 Enviando payload:', payload);
      await api.patch('/daily-completions/update-progress', payload);
      console.log('✅ Progreso actualizado en el backend');
      
      // Get fresh data from backend for this specific date
      const updatedCompletions = await fetchDailyCompletionsFromBackend(date);
      return updatedCompletions;
    } catch (error) {
      console.error(`❌ Error al actualizar progreso en el backend para fecha ${date}:`, error);

      const habitIndex = dailyCompletions.completions.findIndex(
        completion => completion.habit_id === habitId
      );
      
      if (habitIndex === -1) {
        console.warn(`Hábito con ID ${habitId} no encontrado en daily completions para fecha ${date}`);
        return dailyCompletions;
      }
      
      // Update local data if backend update fails
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
      
      // Save to date-specific storage key
      const storageKey = getStorageKeyForDate(date);
      await AsyncStorage.setItem(
        storageKey, 
        JSON.stringify(dailyCompletions)
      );
      
      return dailyCompletions;
    }
  } catch (error) {
    console.error('❌ Error al actualizar completion del hábito:', error);
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
    // If no date is provided, use today's date
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
    console.error(`❌ Error al obtener completion del hábito para fecha ${targetDate || 'hoy'}:`, error);
    return null;
  }
};

// Function to preload completions for multiple days
export const preloadCompletionsForDateRange = async (dates: string[]): Promise<void> => {
  try {
    console.log(`🔄 Preloading completions for ${dates.length} days...`);
    
    // Create an array of promises to fetch all dates in parallel
    const fetchPromises = dates.map(date => {
      return getDailyCompletions(date)
        .then(completions => {
          if (!completions) {
            // If not in storage, fetch from backend
            return fetchDailyCompletionsFromBackend(date);
          }
          return completions;
        })
        .catch(error => {
          console.error(`❌ Error preloading completions for date ${date}:`, error);
          return null;
        });
    });
    
    // Wait for all fetches to complete
    await Promise.all(fetchPromises);
    
    console.log('✅ Preloaded completions for all dates');
  } catch (error) {
    console.error('❌ Error preloading completions:', error);
  }
};

export const clearAllDailyCompletions = async (): Promise<void> => {
  try {
    console.log('🔄 Limpiando todos los daily completions...');
    
    const allKeys = await AsyncStorage.getAllKeys();
    
    const completionsKeys = allKeys.filter(key => 
      key.startsWith(DAILY_COMPLETIONS_STORAGE_KEY_PREFIX)
    );
    
    if (completionsKeys.length > 0) {
      await AsyncStorage.multiRemove(completionsKeys);
      console.log(`✅ Eliminados ${completionsKeys.length} registros de daily completions`);
    } else {
      console.log('ℹ️ No se encontraron datos de daily completions para eliminar');
    }
  } catch (error) {
    console.error('❌ Error al limpiar daily completions:', error);
    throw error;
  }
};
