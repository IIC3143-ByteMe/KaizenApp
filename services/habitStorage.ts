import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

export interface Habit {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    goalValue: number;
    goalUnit: string;
    group: string;
    habitType: string;
    goalPeriod: string;
    taskDays: string;
    reminders: string;
    ikigaiCategory: string | null;
    completed?: number;
    syncedWithBackend?: boolean;
}

const HABITS_STORAGE_KEY = 'kaizen_habits';

export const saveHabitToBackend = async (habit: Omit<Habit, 'id' | 'completed' | 'syncedWithBackend'>) => {
    try {
        const backendHabit = {
            title: habit.title,
            description: habit.description,
            icon: habit.icon,
            color: habit.color,
            grupo: habit.group,
            type: habit.habitType,
            goal_period: habit.goalPeriod,
            goal_value: habit.goalValue,
            goal_value_unit: habit.goalUnit,
            task_days: habit.taskDays,
            reminders: habit.reminders,
            ikigai_category: habit.ikigaiCategory
        };
        
        const response = await api.post('/habits/', backendHabit);
        
        return response.data;
    } catch (error: any) {
        console.error('❌ ERROR en saveHabitToBackend:', error);
        console.error('📃 Detalle del error:', error.message);
        
        if (error.response) {
            console.error('🔄 Respuesta del servidor:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            });
        } else if (error.request) {
            console.error('🔄 Solicitud enviada pero sin respuesta:', error.request);
        }
        
        throw error;
    }
};

export const saveHabit = async (habit: Omit<Habit, 'id' | 'completed' | 'syncedWithBackend'>) => {
    
    try {
        const existingHabits = await getHabits();
        
        let syncedWithBackend = false;
        let backendId = null;

        try {
            const backendResponse = await saveHabitToBackend(habit);
            syncedWithBackend = true;
            backendId = backendResponse._id;
        } catch (error) {
            console.warn('⚠️ No se pudo guardar en el backend:', error);
            console.log('⚙️ Continuando con guardado local solamente');
        }
        
        const localId = Date.now().toString();
        const newHabit: Habit = {
            ...habit,
            id: backendId || localId,
            completed: 0,
            syncedWithBackend
        };
                
        const updatedHabits = [...existingHabits, newHabit];
        
        await AsyncStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(updatedHabits));
        
        return newHabit;
    } catch (error: any) {
        console.error('❌ ERROR en saveHabit:', error);
        console.error('📃 Detalle del error:', error.message);
        
        try {
            const storageContent = await AsyncStorage.getItem(HABITS_STORAGE_KEY);
        } catch (storageError) {
            console.error('❌ Error al intentar leer AsyncStorage para depuración:', storageError);
        }
        
        throw error;
    }
};

export const getHabits = async (): Promise<Habit[]> => {
    try {
        const habitsJSON = await AsyncStorage.getItem(HABITS_STORAGE_KEY);
        return habitsJSON ? JSON.parse(habitsJSON) : [];
    } catch (error) {
        console.error('Error getting habits:', error);
        return [];
    }
};

export const updateHabit = async (updatedHabit: Habit) => {
    try {
        const habits = await getHabits();
        const updatedHabits = habits.map(habit => 
            habit.id === updatedHabit.id ? updatedHabit : habit
        );
        
        await AsyncStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(updatedHabits));
        return updatedHabit;
    } catch (error) {
        console.error('Error updating habit:', error);
        throw error;
    }
};

export const deleteHabit = async (id: string) => {
    try {
        const habits = await getHabits();
        const habit = habits.find(h => h.id === id);
        
        if (habit?.syncedWithBackend) {
            try {
                await api.delete(`/habits/${id}`);
                console.log('✅ Hábito eliminado exitosamente del backend');
            } catch (backendError) {
                console.error('❌ Error al eliminar hábito del backend:', backendError);
            }
        }
      
        const updatedHabits = habits.filter(habit => habit.id !== id);
        await AsyncStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(updatedHabits));
        console.log('✅ Hábito eliminado exitosamente del almacenamiento local');
        
        return true;
    } catch (error) {
        console.error('❌ Error general al eliminar hábito:', error);
        throw error;
    }
};

export const getHabitById = async (id: string): Promise<Habit | null> => {
  try {
    const habits = await getHabits();
    const habit = habits.find(h => h.id === id);
    return habit || null;
  } catch (error) {
    console.error('Error getting habit by id:', error);
    return null;
  }
};

export const updateHabitProgress = async (id: string, newCompleted: number) => {
  try {
    const habit = await getHabitById(id);
    if (!habit) return null;
    
    const updatedHabit = {
      ...habit,
      completed: newCompleted
    };
    
    return await updateHabit(updatedHabit);
  } catch (error) {
    console.error('Error updating habit progress:', error);
    throw error;
  }
};


export const clearAllHabits = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(HABITS_STORAGE_KEY);
        console.log('Todos los hábitos han sido eliminados');
    } catch (error) {
        console.error('Error al eliminar hábitos:', error);
        throw error;
    }
};

export const fetchHabitsFromBackend = async (): Promise<Habit[]> => {
  try {
    console.log('🔄 Obteniendo hábitos del backend...');
    const response = await api.get('/habits/');
    
    const backendHabits = response.data.map((backendHabit: any) => ({
      id: backendHabit._id,
      title: backendHabit.title,
      description: backendHabit.description,
      icon: backendHabit.icon,
      color: backendHabit.color,
      group: backendHabit.grupo,
      habitType: backendHabit.type,
      goalPeriod: backendHabit.goal_period,
      goalValue: backendHabit.goal_value,
      goalUnit: backendHabit.goal_value_unit,
      taskDays: backendHabit.task_days,
      reminders: backendHabit.reminders,
      ikigaiCategory: backendHabit.ikigai_category,
      completed: backendHabit.progress || 0,
      syncedWithBackend: true
    }));

    console.log(`✅ Obtenidos ${backendHabits.length} hábitos del backend`);
    
    await AsyncStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(backendHabits));
    
    return backendHabits;
  } catch (error) {
    console.error('❌ Error al obtener hábitos del backend:', error);
    return getHabits();
  }
};
