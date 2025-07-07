import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { fetchHabitsFromBackend, updateHabit } from "./habitStorage";

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

  return scheduledIds;
}

export async function cancelHabitReminders(ids: string[]) {
  for (let nid of ids) {
    await Notifications.cancelScheduledNotificationAsync(nid);
  }
}

export async function cancelAllReminders() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function fetchNotificationsFromBackend() {
  const allHabits = await fetchHabitsFromBackend();
  for (let h of allHabits) {
    const reminderIds = await scheduleHabitReminders({
      id: h.id,
      title: h.title,
      time: h.reminders,
      daysOfWeek: h.taskDays,
    });
    await updateHabit({ ...h, reminderIds });
  }
}