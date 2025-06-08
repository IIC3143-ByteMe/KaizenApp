import AsyncStorage from '@react-native-async-storage/async-storage';

const STREAK_KEY = 'kaizen_streak';
const LAST_CHECK_KEY = 'kaizen_last_check';


export const getStreak = async (): Promise<number> => {
  try {
    const value = await AsyncStorage.getItem(STREAK_KEY);
    return value ? parseInt(value) : 0;
  } catch (error) {
    console.error('Error getting streak:', error);
    return 0;
  }
};


export const setStreak = async (value: number): Promise<void> => {
  try {
    await AsyncStorage.setItem(STREAK_KEY, value.toString());
  } catch (error) {
    console.error('Error setting streak:', error);
  }
};


export const incrementStreak = async (): Promise<number> => {
  try {
    const lastCheckStr = await AsyncStorage.getItem(LAST_CHECK_KEY);
    const today = new Date().toDateString();
    
    if (lastCheckStr === today) {
      return await getStreak();
    }
    
    await AsyncStorage.setItem(LAST_CHECK_KEY, today);
    
    const currentStreak = await getStreak();
    const newStreak = currentStreak + 1;
    await setStreak(newStreak);
    
    return newStreak;
  } catch (error) {
    console.error('Error incrementing streak:', error);
    return await getStreak();
  }
};


export const resetStreak = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(STREAK_KEY, '0');
  } catch (error) {
    console.error('Error resetting streak:', error);
    throw error;
  }
};


export const clearStreakData = async (): Promise<void> => {
  try {
    await Promise.all([
      AsyncStorage.removeItem(STREAK_KEY),
      AsyncStorage.removeItem(LAST_CHECK_KEY)
    ]);
    console.log('Datos de streak eliminados');
  } catch (error) {
    console.error('Error al eliminar datos de streak:', error);
    throw error;
  }
}


export const checkStreakContinuity = async (): Promise<number> => {
  try {
    const lastCheckStr = await AsyncStorage.getItem(LAST_CHECK_KEY);
    
    if (!lastCheckStr) {
      await AsyncStorage.setItem(LAST_CHECK_KEY, new Date().toDateString());
      return await getStreak();
    }
    
    const lastCheck = new Date(lastCheckStr);
    const today = new Date();
    
    lastCheck.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = Math.abs(today.getTime() - lastCheck.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) {
      await resetStreak();
      await AsyncStorage.setItem(LAST_CHECK_KEY, today.toDateString());
    }
    
    return await getStreak();
  } catch (error) {
    console.error('Error checking streak continuity:', error);
    return await getStreak();
  }
};