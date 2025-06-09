import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircularProgress from '@components/utils/CircularProgress';

interface DailyGoalsCardProps {
  totalHabits: number;
  completedHabits: number;
}

export default function DailyGoalsCard({ totalHabits, completedHabits }: DailyGoalsCardProps) {
  const progressPercentage = totalHabits > 0 
    ? Math.min(100, (completedHabits / totalHabits) * 100) 
    : 0;
  
  const getMessage = () => {
    if (totalHabits === 0) return '¡Añade tu primer hábito!';
    if (progressPercentage === 0) return '¡Comienza tu día!';
    if (progressPercentage < 50) return '¡Sigue adelante!';
    if (progressPercentage < 100) return '¡Casi lo logras!';
    return '¡Todo completado!';
  };

  return (
    <View style={styles.card}>
      <View style={styles.circle}>
        <CircularProgress 
          percentage={progressPercentage} 
          color="#94A9FF" 
          size={70}
          strokeWidth={8}
        >
          <Text style={styles.progressNumber}>
            {completedHabits}/{totalHabits}
          </Text>
        </CircularProgress>
      </View>
      <View>
        <Text style={styles.title}>Metas diarias</Text>
        <Text style={styles.subtitle}>{getMessage()}</Text>
        <Text style={styles.progress}>
          {completedHabits}/{totalHabits} hábitos cumplidos
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  title: { fontWeight: 'bold', fontSize: 16 },
  subtitle: { fontSize: 14, marginTop: 4 },
  progress: { marginTop: 4, color: '#777', fontWeight: '600' },
});