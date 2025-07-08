import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeSessionToken } from '@hooks/useSessionToken';
import { clearStreakData } from './streakService';
import { clearAllHabits } from './habitStorage';
import { clearIkigaiData } from './ikigaiStorage';
import { clearUser } from './userStorage';
import { clearAllDailyCompletions } from './dailyCompletionsService';
import { cancelAllReminders } from './notificationService';

export const clearAllUserData = async (): Promise<void> => {
  try {
    await removeSessionToken();

    await Promise.all([
      cancelAllReminders(),
      clearStreakData(),
      clearAllHabits(),
      clearIkigaiData(),
      clearUser(),
      clearAllDailyCompletions()
    ]);

    console.log('Todos los datos del usuario han sido eliminados');
  } catch (error) {
    console.error('Error al limpiar datos del usuario:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await clearAllUserData();
  } catch (error) {
    console.error('Error durante el logout:', error);
    throw error;
  }
};
