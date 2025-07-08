import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

const STREAK_KEY = 'kaizen_streak';
const LAST_CHECK_KEY = 'kaizen_last_check';

export interface StreakData {
  streak: number;
  lastTimestamp: string;
}

export async function fetchStreakFromBackend(): Promise<StreakData | null> {
  try {
    const response = await api.get<StreakData>('/user/streak');
    const { streak, last_timestamp } = response.data as any;
    const data: StreakData = {
      streak,
      lastTimestamp: last_timestamp,
    };
    await AsyncStorage.multiSet([
      [STREAK_KEY, data.streak.toString()],
      [LAST_CHECK_KEY, data.lastTimestamp],
    ]);
    return data;
  } catch (error) {
    console.error('❌ Error fetching streak from backend:', error);
    return null;
  }
}

export async function getStreakLocal(): Promise<number> {
  try {
    const stored = await AsyncStorage.getItem(STREAK_KEY);
    return stored ? parseInt(stored, 10) : 0;
  } catch (error) {
    console.error('❌ Error reading local streak:', error);
    return 0;
  }
}

export async function getLastCheckLocal(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(LAST_CHECK_KEY);
  } catch (error) {
    console.error('❌ Error reading last check timestamp:', error);
    return null;
  }
}

export async function clearStreakData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([STREAK_KEY, LAST_CHECK_KEY]);
    console.log('🗑️ Streak data cleared');
  } catch (error) {
    console.error('❌ Error clearing streak data:', error);
    throw error;
  }
}
