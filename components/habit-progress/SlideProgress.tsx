import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { HabitProgressProps } from './HabitProgress';

export default function SlideProgress({ 
  id,
  progress, 
  goalTarget, 
  color, 
  onProgressChange,
  isCompact = false
}: HabitProgressProps) {
  const [localProgress, setLocalProgress] = useState(progress);
  const [isUpdating, setIsUpdating] = useState(false);
  const progressPercentage = Math.min(100, (localProgress / goalTarget) * 100);
  
  useEffect(() => {
    setLocalProgress(progress);
  }, [progress]);
  
  const updateProgressWithDelay = (newValue: number) => {
    if (onProgressChange && !isUpdating) {
      setIsUpdating(true);
      
      setTimeout(() => {
        onProgressChange(newValue);
        setIsUpdating(false);
      }, 500);
    }
  };
  
  const handleSliderPress = (event: any, containerWidth: number) => {
    const { locationX } = event.nativeEvent;
    const percentage = Math.min(Math.max(locationX / containerWidth, 0), 1);
    const newProgress = Math.round(percentage * goalTarget);
    
    setLocalProgress(newProgress);
    updateProgressWithDelay(newProgress);
  };
  
  if (isCompact) {
    return (
      <View style={styles.compactContainer}>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${progressPercentage}%`, backgroundColor: color }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {localProgress}/{goalTarget}
        </Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Progreso: {localProgress}/{goalTarget}</Text>
      
      <TouchableOpacity 
        style={styles.sliderContainer}
        activeOpacity={1}
        onPress={(e) => {
          handleSliderPress(e, 280);
        }}
      >
        <View style={styles.sliderTrack}>
          <View 
            style={[
              styles.sliderFill, 
              { width: `${progressPercentage}%`, backgroundColor: color }
            ]} 
          />
        </View>
        
        <View 
          style={[
            styles.sliderThumb, 
            { left: `${progressPercentage}%`, backgroundColor: color },
            progressPercentage === 0 && { left: 0 },
            progressPercentage === 100 && { right: 0 }
          ]} 
        />
      </TouchableOpacity>
      
      <View style={styles.markersContainer}>
        <Text style={styles.markerText}>0</Text>
        {goalTarget > 10 && <Text style={styles.markerText}>{Math.floor(goalTarget / 2)}</Text>}
        <Text style={styles.markerText}>{goalTarget}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
  },
  compactContainer: {
    width: '100%',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
    width: '100%',
  },
  sliderTrack: {
    height: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 6,
  },
  sliderThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#94A9FF',
    top: 8,
    marginLeft: -12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  markersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  markerText: {
    fontSize: 12,
    color: '#666',
  },
});
