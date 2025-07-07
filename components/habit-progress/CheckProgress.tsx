import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HabitProgressProps } from './HabitProgress';

export default function CheckProgress({ 
  id,
  progress, 
  goalTarget, 
  color, 
  onProgressChange,
  isCompact = false
}: HabitProgressProps) {
  const isCompleted = progress >= goalTarget;

  const handleToggle = () => {
    if (onProgressChange) {
      onProgressChange(isCompleted ? 0 : 1);
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        isCompact ? styles.compactContainer : {},
        isCompleted ? { backgroundColor: color } : styles.uncheckedContainer,
        isCompleted ? {} : { borderColor: color }
      ]} 
      onPress={handleToggle}
      activeOpacity={0.7}
    >
      {isCompleted ? (
        <Ionicons name="checkmark" size={isCompact ? 16 : 24} color="#fff" />
      ) : (
        <View style={styles.emptyCheck} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  compactContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  uncheckedContainer: {
    backgroundColor: 'transparent',
  },
  emptyCheck: {
    width: '60%',
    height: '60%',
    borderRadius: 4,
  },
});
