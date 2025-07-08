import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { getHabits, updateHabit } from "./habitStorage";
import { 
  getNotificationPreferences, 
  updateHabitNotificationPreference,
  updateMotivationalNotificationPreference 
} from "./notificationPreferencesStorage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function ensurePermissions() {
  const { granted } = await Notifications.getPermissionsAsync();
  if (!granted) {
    const { granted: asked } = await Notifications.requestPermissionsAsync();
    if (!asked) {
      console.warn("⚠️ Permisos de notificaciones no concedidos");
    }
  }
  return granted;
}

export async function initNotifications() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Canal por defecto",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
  await ensurePermissions();
}

export interface HabitReminderParams {
  id: string;
  title: string;
  time: string[];
  daysOfWeek: string[];
}

const WEEKDAY_MAP: Record<string, number> = {
  sun: 1,
  mon: 2,
  tue: 3,
  wed: 4,
  thu: 5,
  fri: 6,
  sat: 7,
};

export async function scheduleHabitReminders({
  id,
  title,
  time,
  daysOfWeek,
}: HabitReminderParams): Promise<string[]> {
  await initNotifications();

  const scheduledIds: string[] = [];

  for (let day of daysOfWeek) {
    const key = day.toLowerCase().slice(0, 3);
    const weekday = WEEKDAY_MAP[key];
    if (!weekday) continue;

    for (let t of time) {
      const [hour, minute] = t.split(":").map((v) => parseInt(v, 10));

      const nid = await Notifications.scheduleNotificationAsync({
        content: {
          title: `🕔 ¡Hora de: ${title}!`,
          body: "¿Ya completaste tu hábito hoy?",
          data: { habitId: id },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
          weekday: weekday,
          hour: hour,
          minute: minute,
          repeats: true,
        },
      });

      scheduledIds.push(nid);
    }
  }

  await updateHabitNotificationPreference(id, true);
  
  return scheduledIds;
}

export async function cancelHabitReminders(ids: string[]) {
  for (let nid of ids) {
    await Notifications.cancelScheduledNotificationAsync(nid);
  }
}

export async function disableHabitNotifications(habitId: string, reminderIds: string[] = []) {
  if (reminderIds && reminderIds.length > 0) {
    await cancelHabitReminders(reminderIds);
  }
  
  await updateHabitNotificationPreference(habitId, false);
}

export async function cancelAllReminders() {
  await Notifications.cancelAllScheduledNotificationsAsync();
  const habits = await getHabits();
  await Promise.all(
    habits.map(async (h) => {
      await updateHabit({ ...h, reminderIds: [] });
      await updateHabitNotificationPreference(h.id, false);
    })
  );
}

export async function fetchNotificationsFromBackend() {
  const allHabits = await getHabits();
  const preferences = await getNotificationPreferences();
  
  for (let h of allHabits) {
    if (preferences.habitNotifications[h.id]) {
      const reminderIds = await scheduleHabitReminders({
        id: h.id,
        title: h.title,
        time: h.reminders,
        daysOfWeek: h.taskDays,
      });
      await updateHabit({ ...h, reminderIds });
    }
  }
  
  const { motivationalNotification } = preferences;
  if (motivationalNotification && motivationalNotification.enabled) {
    const [hour, minute] = motivationalNotification.time.split(':').map(Number);
    await scheduleMotivationalNotification(
      motivationalNotification.message,
      hour,
      minute
    );
  }
}

export async function scheduleMotivationalNotification(
  message: string,
  hour: number,
  minute: number
): Promise<string> {
  await initNotifications();
  
  const allNotifications = await Notifications.getAllScheduledNotificationsAsync();
  const motivationNotifications = allNotifications.filter(
    n => n.content.data?.type === 'motivation'
  );
  
  for (let notification of motivationNotifications) {
    await Notifications.cancelScheduledNotificationAsync(notification.identifier);
  }
  
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: '✨ Mensaje de motivación',
      body: message,
      data: { type: 'motivation' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      hour: hour,
      minute: minute,
      repeats: true,
    },
  });
  
  await updateMotivationalNotificationPreference(
    true,
    `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
    message,
    id
  );
  
  return id;
}

export async function cancelMotivationalNotification(): Promise<void> {
  const allNotifications = await Notifications.getAllScheduledNotificationsAsync();
  const motivationNotifications = allNotifications.filter(
    n => n.content.data?.type === 'motivation'
  );
  
  for (let notification of motivationNotifications) {
    await Notifications.cancelScheduledNotificationAsync(notification.identifier);
  }
  
  await updateMotivationalNotificationPreference(false);
}