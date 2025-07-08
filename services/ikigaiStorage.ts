import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

export type IkigaiData = {
  _id?: string;
  arquetype: 'constante' | 'explorador' | 'social' | 'reflexivo';
  you_love: string;
  good_at: string;
  world_needs: string;
  is_profitable: string;
};

const IKIGAI_KEY = 'kaizen_ikigai';
const QUIZ_DONE_KEY = "kaizen_quiz_done";

export const saveIkigai = async (ikigai: IkigaiData) => {
  try {
    const response = await api.post('/ikigai/', ikigai);
    await AsyncStorage.setItem(IKIGAI_KEY, JSON.stringify(response.data));
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateIkigai = async (ikigai: Partial<IkigaiData>) => {
  try {
    const existing = await getIkigai();
    if (!existing) throw new Error('No hay Ikigai existente para actualizar');

    const updated = { ...existing, ...ikigai };
    const response = await api.put('/ikigai/', updated);
    await AsyncStorage.setItem(IKIGAI_KEY, JSON.stringify(response.data));
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const fetchIkigaiFromBackend = async (): Promise<IkigaiData | null> => {
  try {
    const response = await api.get('/ikigai/');
    const ikigai = response.data;

    if (!ikigai) {
      console.warn('⚠️ No se encontró Ikigai en el backend');
      return null;
    }

    await AsyncStorage.setItem(IKIGAI_KEY, JSON.stringify(ikigai));
    return ikigai;
  } catch (error) {
    return null;
  }
};

export const getIkigai = async (): Promise<IkigaiData | null> => {
  try {
    const stored = await AsyncStorage.getItem(IKIGAI_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    return null;
  }
};

export const setQuizDone = async () => {
  await AsyncStorage.setItem(QUIZ_DONE_KEY, "true");
};

export const hasDoneQuiz = async (): Promise<boolean> => {
  const flag = await AsyncStorage.getItem(QUIZ_DONE_KEY);
  return flag === "true";
};

export const clearIkigaiData = async (): Promise<void> => {
  try {
    await Promise.all([
      AsyncStorage.removeItem(IKIGAI_KEY),
      AsyncStorage.removeItem(QUIZ_DONE_KEY),
    ]);
  } catch (error) {
    throw error;
  }
};
