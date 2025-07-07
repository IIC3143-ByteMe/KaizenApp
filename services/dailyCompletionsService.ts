import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

interface Goal {
  period: string;  // daily, weekly, monthly
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

    const date = new Date().toISOString().split('T')[0];
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
