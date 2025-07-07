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
