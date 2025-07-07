import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HabitProgressProps } from './HabitProgress';

export default function SumProgress({ 
  id,
  progress, 
  goalTarget, 
  color, 
  onProgressChange,
  isCompact = false
}: HabitProgressProps) {
  const [localProgress, setLocalProgress] = useState(progress);
  const [isUpdating, setIsUpdating] = useState(false);
  
  useEffect(() => {
    setLocalProgress(progress);
  }, [progress]);
  
  const handleIncrement = () => {
    if (localProgress < goalTarget) {
      const newProgress = localProgress + 1;
      setLocalProgress(newProgress);
      
      if (onProgressChange) {
        if (isUpdating) return;
        
        setIsUpdating(true);
        setTimeout(() => {
          onProgressChange(newProgress);
          setIsUpdating(false);
        }, 500);
      }
    }
  };
  
  const handleDecrement = () => {
    if (localProgress > 0) {
      const newProgress = localProgress - 1;
      setLocalProgress(newProgress);
      
      if (onProgressChange) {
        if (isUpdating) return;
        
        setIsUpdating(true);
        setTimeout(() => {
          onProgressChange(newProgress);
          setIsUpdating(false);
        }, 500);
      }
    }
  };
  
  if (isCompact) {
    return (
      <View style={styles.compactContainer}>
        <View style={[styles.progressCircle, { borderColor: color }]}>
          <Text style={[styles.progressText, { color }]}>{localProgress}/{goalTarget}</Text>
        </View>
        {!isUpdating && (
          <TouchableOpacity 
            style={[styles.incrementButton, { backgroundColor: color }]} 
            onPress={handleIncrement}
            disabled={localProgress >= goalTarget}
          >
            <Ionicons name="add" size={18} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: color }]} 
        onPress={handleDecrement}
        disabled={localProgress <= 0 || isUpdating}
      >
        <Ionicons name="remove" size={24} color="#fff" />
      </TouchableOpacity>
      
      <View style={styles.progressContainer}>
        <Text style={styles.progressValue}>{localProgress}</Text>
        <Text style={styles.separator}>/</Text>
        <Text style={styles.goalValue}>{goalTarget}</Text>
      </View>
      
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: color }]} 
        onPress={handleIncrement}
        disabled={localProgress >= goalTarget || isUpdating}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#94A9FF',
  },
  incrementButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  progressValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  separator: {
    fontSize: 24,
    color: '#666',
    marginHorizontal: 4,
  },
  goalValue: {
    fontSize: 24,
    color: '#666',
  },
});
