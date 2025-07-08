import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATION_PREFS_KEY = 'kaizen_notification_preferences';

export interface NotificationPreferences {
  habitNotifications: {
    [habitId: string]: boolean;
  };
  motivationalNotification: {
    enabled: boolean;
    time: string;
    message: string;
    notificationId?: string;
  };
}

export const getNotificationPreferences = async (): Promise<NotificationPreferences> => {
  try {
    const json = await AsyncStorage.getItem(NOTIFICATION_PREFS_KEY);
    if (json) {
      return JSON.parse(json);
    }
  } catch (error) {
    console.error('Error al obtener preferencias de notificaciones:', error);
  }
  
  return {
    habitNotifications: {},
    motivationalNotification: {
      enabled: false,
      time: '08:00',
      message: '¡Es un gran día para seguir tus hábitos!',
    }
  };
};

export const saveNotificationPreferences = async (preferences: NotificationPreferences): Promise<void> => {
  try {
    await AsyncStorage.setItem(NOTIFICATION_PREFS_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error('Error al guardar preferencias de notificaciones:', error);
  }
};


export const updateHabitNotificationPreference = async (habitId: string, enabled: boolean): Promise<void> => {
  try {
    const preferences = await getNotificationPreferences();
    preferences.habitNotifications[habitId] = enabled;
    await saveNotificationPreferences(preferences);
  } catch (error) {
    console.error('Error al actualizar preferencia de notificación de hábito:', error);
  }
};


export const updateMotivationalNotificationPreference = async (
  enabled: boolean,
  time?: string,
  message?: string,
  notificationId?: string
): Promise<void> => {
  try {
    const preferences = await getNotificationPreferences();
    
    preferences.motivationalNotification = {
      ...preferences.motivationalNotification,
      enabled,
      ...(time !== undefined && { time }),
      ...(message !== undefined && { message }),
      ...(notificationId !== undefined && { notificationId })
    };
    
    await saveNotificationPreferences(preferences);
  } catch (error) {
    console.error('Error al actualizar preferencia de notificación motivacional:', error);
  }
};
