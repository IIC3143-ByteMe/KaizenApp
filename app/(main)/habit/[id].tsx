import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { getHabitById, deleteHabit } from '@services/habitStorage';
import { cancelHabitReminders } from '@services/notificationService';
import { getHabitCompletion, updateHabitCompletion } from '@services/dailyCompletionsService';
import { UNITS } from '@components/add-habit/GoalSelector';
import CircularProgress from '@components/utils/CircularProgress';
import { fetchStreakFromBackend } from '@services/streakService';
import HabitProgressSelector from '@components/habit-progress/HabitProgressSelector';


export default function HabitDetailScreen() {
  const { id, date: selectedDate } = useLocalSearchParams();
  const router = useRouter();
  const [habit, setHabit] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadHabit();
  }, [id, selectedDate]);

  const loadHabit = async () => {
    if (!id || typeof id !== 'string') return;
    
    try {
      setLoading(true);
      const habitData = await getHabitById(id);
      
      if (habitData) {
        setHabit(habitData);
        
        const dateParam = typeof selectedDate === 'string' ? selectedDate : undefined;
        const completionData = await getHabitCompletion(id, dateParam);
        if (completionData) {
          setProgress(completionData.progress);
        } else {
          setProgress(0);
        }
      } else {
        Alert.alert('Error', 'No se encontró el hábito');
        router.back();
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar el hábito');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProgress = async (newValue: number) => {
    if (!id || typeof id !== 'string' || !habit) return;
    
    if (newValue < 0) newValue = 0;
    
    try {
      const previousProgress = progress;
      
      setProgress(newValue);
      
      const dateParam = typeof selectedDate === 'string' ? selectedDate : undefined;
      
      const updatedCompletions = await updateHabitCompletion(id, newValue, dateParam);
      
      if (updatedCompletions) {
        const habitCompletion = updatedCompletions.completions.find(c => c.habit_id === id);
        
        if (!selectedDate && 
            habitCompletion && 
            habitCompletion.completed && 
            previousProgress < habit.goalTarget && 
            newValue >= habit.goalTarget) {
          console.log('🎯 ¡Hábito completado! Incrementando racha...');
          await fetchStreakFromBackend();
        }
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el progreso');
      
      const dateParam = typeof selectedDate === 'string' ? selectedDate : undefined;
      const completionData = await getHabitCompletion(id, dateParam);
      if (completionData) {
        setProgress(completionData.progress);
      } else {
        setProgress(0);
      }
    }
  };

  const handleDeleteHabit = () => {
    Alert.alert(
      'Eliminar Hábito',
      '¿Estás seguro de que deseas eliminar este hábito? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: async () => {
            try {
              if (typeof id === 'string') {
                await cancelHabitReminders(habit.reminderIds || []);
                await deleteHabit(id);
                router.back();
              }
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el hábito');
            }
          }
        }
      ]
    );
  };

  const renderHabitDetails = () => {
    if (!habit) return null;

    return (
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Detalles del hábito</Text>
        
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Tipo</Text>
            <View style={[styles.tag, { backgroundColor: habit.habitType === 'Build' ? '#94A9FF' : '#FF9494' }]}>
              <Text style={styles.tagText}>
                {habit.habitType === 'Build' ? 'Construir' : 'Dejar'}
              </Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Categoría</Text>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{habit.group}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailLabel}>Días asignados</Text>
          <View style={styles.daysContainer}>
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, index) => {
              const isActive = habit.taskDays.includes(
                ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]
              );
              return (
                <View 
                  key={day} 
                  style={[styles.dayBadge, isActive && styles.activeDayBadge]}
                >
                  <Text style={[styles.dayText, isActive && styles.activeDayText]}>
                    {day}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {habit.reminders && habit.reminders.length > 0 && (
          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>Recordatorios</Text>
            <View style={styles.remindersContainer}>
              {habit.reminders.map((time: string, index: number) => (
                <View key={index} style={styles.reminderBadge}>
                  <Ionicons name="alarm-outline" size={14} color="#555" />
                  <Text style={styles.reminderText}>{time}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#94A9FF" />
        </View>
      </SafeAreaView>
    );
  }

  if (!habit) return null;

  const unitData = UNITS.find(unit => unit.id === habit.goalUnit);
  const unitLabel = unitData?.label || habit.goalUnit;
  const progressPercentage = Math.min(100, (progress / habit.goalTarget) * 100);
  const isCompleted = progress >= habit.goalTarget;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={handleDeleteHabit}
          >
            <Ionicons name="trash-outline" size={24} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.habitHeader}>
          <View style={[styles.iconContainer, { backgroundColor: habit.color }]}>
            <FontAwesome5 name={habit.icon} size={36} color="#fff" />
          </View>
          <Text style={styles.title}>{habit.title}</Text>
          <Text style={styles.description}>{habit.description}</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Meta diaria</Text>
          <Text style={styles.goalText}>
            {habit.goalTarget} {unitLabel}
          </Text>
          
          <View style={styles.progressSection}>
            {(() => {
              let goalType = habit.goalType;
              if (!goalType) {
                if (habit.goalTarget === 1) {
                  goalType = 'Check';
                } else if (habit.goalTarget >= 2 && habit.goalTarget <= 5) {
                  goalType = 'Sum';
                } else {
                  goalType = 'Slide';
                }
              }
              
              return (
                <HabitProgressSelector
                  id={habit.id}
                  goalType={goalType}
                  progress={progress}
                  goalTarget={habit.goalTarget}
                  color={habit.color}
                  onProgressChange={handleUpdateProgress}
                  isCompact={false}
                />
              );
            })()}
          </View>
        </View>
        
        {renderHabitDetails()}
        
        {isCompleted && (
          <View style={[styles.card, styles.completedCard]}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={styles.completedText}>¡Meta completada!</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#F6F6F6' 
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  deleteButton: {
    padding: 8,
  },
  habitHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  goalText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  progressSection: {
    alignItems: 'center',
  },
  progressValue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
  },
  progressLabel: {
    fontSize: 16,
    color: '#666',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  incrementButton: {
    backgroundColor: '#94A9FF',
  },
  completedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
  },
  completedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    marginLeft: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  tagText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  detailSection: {
    marginTop: 16,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDayBadge: {
    backgroundColor: '#94A9FF',
  },
  dayText: {
    fontSize: 12,
    color: '#666',
  },
  activeDayText: {
    color: '#FFF',
    fontWeight: '600',
  },
  remindersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  reminderBadge: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 4,
  },
  reminderText: {
    fontSize: 12,
    color: '#555',
  },
});