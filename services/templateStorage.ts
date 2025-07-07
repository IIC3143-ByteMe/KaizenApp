import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

export interface HabitTemplate {
  _id: string;
  title: string;
  description?: string;
  icon: string;
  color: string;
  group?: string;
  type: string;
  goal: {
    period: string;
    type: string;
    target: number;
    unit: string;
  };
  task_days: string[];
  reminders: string[];
}

const TEMPLATES_KEY = 'kaizen_habit_templates';

export const fetchHabitTemplates = async (): Promise<HabitTemplate[]> => {
  try {
    const res = await api.get<HabitTemplate[]>('/habits/templates');
    const templates = res.data;
    await AsyncStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
    return templates;
  } catch (e) {
    console.warn('No se pudo traer plantillas del backend, usando cache', e);
    return getCachedHabitTemplates();
  }
};

export const getCachedHabitTemplates = async (): Promise<HabitTemplate[]> => {
  try {
    const json = await AsyncStorage.getItem(TEMPLATES_KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
};
