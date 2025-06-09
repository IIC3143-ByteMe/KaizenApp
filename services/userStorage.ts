import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

export interface UserData {
  full_name: string;
  email: string;
}

const USER_KEY = 'kaizen_user';

export const fetchUserFromBackend = async (): Promise<UserData | null> => {
  try {
    const response = await api.get('/user/');
    const user = response.data;

    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  } catch (error) {
    console.error('❌ Error al obtener usuario:', error);
    return null;
  }
};

export const getUser = async (): Promise<UserData | null> => {
  try {
    const json = await AsyncStorage.getItem(USER_KEY);
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error('Error al leer usuario del storage:', error);
    return null;
  }
};

export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Error al eliminar datos de usuario:', error);
  }
};
