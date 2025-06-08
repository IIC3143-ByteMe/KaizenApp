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
import { getHabitById, updateHabitProgress, deleteHabit } from '@services/habitStorage';
import { UNITS } from '@components/add-habit/GoalSelector';
import CircularProgress from '@components/utils/CircularProgress';
import { incrementStreak } from '@services/streakService';


export default function HabitDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [habit, setHabit] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadHabit();
  }, [id]);

  const loadHabit = async () => {
    if (!id || typeof id !== 'string') return;
    
    try {
      setLoading(true);
      const habitData = await getHabitById(id);
      
      if (habitData) {
        setHabit(habitData);
        setProgress(habitData.completed || 0);
      } else {
        Alert.alert('Error', 'No se encontró el hábito');
        router.back();
      }
    } catch (error) {
      console.error('Error loading habit:', error);
      Alert.alert('Error', 'No se pudo cargar el hábito');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProgress = async (newValue: number) => {
    if (!id || typeof id !== 'string' || !habit) return;
    
    if (newValue < 0) newValue = 0;
    
    try {
      setProgress(newValue);
      const updatedHabit = await updateHabitProgress(id, newValue);
      if (updatedHabit && newValue >= parseInt(updatedHabit.goalValue) && progress < parseInt(updatedHabit.goalValue)) {
        await incrementStreak();
      }
      if (updatedHabit) {
        setHabit(updatedHabit);
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      Alert.alert('Error', 'No se pudo actualizar el progreso');
      setProgress(habit.completed || 0);
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
                await deleteHabit(id);
                router.back();
              }
            } catch (error) {
              console.error('Error deleting habit:', error);
              Alert.alert('Error', 'No se pudo eliminar el hábito');
            }
          }
        }
      ]
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
  const progressPercentage = Math.min(100, (progress / parseInt(habit.goalValue)) * 100);
  const isCompleted = progress >= parseInt(habit.goalValue);

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
            {habit.goalValue} {unitLabel}
          </Text>
          
          <View style={styles.progressSection}>
            <CircularProgress 
              percentage={progressPercentage} 
              color={habit.color} 
              size={180}
              strokeWidth={15}
            >
              <Text style={styles.progressValue}>{progress}</Text>
              <Text style={styles.progressLabel}>de {habit.goalValue}</Text>
            </CircularProgress>
            
            <View style={styles.controlsContainer}>
              <TouchableOpacity 
                style={styles.controlButton}
                onPress={() => handleUpdateProgress(progress - 1)}
              >
                <Ionicons name="remove" size={24} color="#666" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.controlButton, styles.incrementButton]}
                onPress={() => handleUpdateProgress(progress + 1)}
              >
                <Ionicons name="add" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
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
});