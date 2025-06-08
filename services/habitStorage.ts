import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Habit {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    goalValue: string;
    goalUnit: string;
    completed?: number;
}

const HABITS_STORAGE_KEY = 'kaizen_habits';

export const saveHabit = async (habit: Omit<Habit, 'id'>) => {
    try {
        const existingHabits = await getHabits();
        
        const newHabit: Habit = {
            ...habit,
            id: Date.now().toString(),
            completed: 0
        };
        
        const updatedHabits = [...existingHabits, newHabit];
        await AsyncStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(updatedHabits));
        
        return newHabit;
    } catch (error) {
        console.error('Error saving habit:', error);
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
        const updatedHabits = habits.filter(habit => habit.id !== id);
      
        await AsyncStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(updatedHabits));
    } catch (error) {
        console.error('Error deleting habit:', error);
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