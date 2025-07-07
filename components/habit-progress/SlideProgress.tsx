import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PanResponder, Animated, Vibration } from 'react-native';
import { HabitProgressProps } from './HabitProgress';

const FIXED_COLOR = "#5D7AF8";

export default function SlideProgress({ 
  id,
  progress, 
  goalTarget, 
  color,
  onProgressChange,
  isCompact = false
}: HabitProgressProps) {
  const [localProgress, setLocalProgress] = useState(progress);
  const [lastProgressSent, setLastProgressSent] = useState(progress);
  const progressPercentage = Math.min(100, (localProgress / goalTarget) * 100);
  const animatedWidth = useRef(new Animated.Value(progressPercentage)).current;
  const containerWidthRef = useRef(200);
  const trackRef = useRef<View>(null);
  
  useEffect(() => {
    if (progress !== localProgress) {
      setLocalProgress(progress);
      setLastProgressSent(progress);
      
      Animated.spring(animatedWidth, {
        toValue: Math.min(100, (progress / goalTarget) * 100),
        useNativeDriver: false,
        friction: 8,
        tension: 40
      }).start();
    }
  }, [progress, goalTarget]);

  
  const getProgressFromPosition = (positionX: number, width: number) => {
    const boundedX = Math.max(0, Math.min(positionX, width));
    const percentage = boundedX / width;
    return Math.round(percentage * goalTarget);
  };
  
  const updateProgressUI = (newProgress: number) => {
    if (newProgress !== localProgress) {
      setLocalProgress(newProgress);
      Animated.spring(animatedWidth, {
        toValue: Math.min(100, (newProgress / goalTarget) * 100),
        useNativeDriver: false,
        friction: 8,
        tension: 40
      }).start();
    }
  };
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        if (trackRef.current) {
          trackRef.current.measure((x, y, width, height, pageX, pageY) => {
            const touchX = evt.nativeEvent.pageX - pageX;
            const newProgress = getProgressFromPosition(touchX, width);
            
            updateProgressUI(newProgress);
          });
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        if (trackRef.current) {
          trackRef.current.measure((x, y, width, height, pageX, pageY) => {
            const touchX = evt.nativeEvent.pageX - pageX;
            const newProgress = getProgressFromPosition(touchX, width);
            
            updateProgressUI(newProgress);
          });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (trackRef.current) {
          trackRef.current.measure((x, y, width, height, pageX, pageY) => {
            const touchX = evt.nativeEvent.pageX - pageX;
            const finalProgress = getProgressFromPosition(touchX, width);
            
            updateProgressUI(finalProgress);
            
            if (onProgressChange) {
              onProgressChange(finalProgress);
            }
          });
        }
      }
    })
  ).current;
  
  const handleSliderPress = (event: any) => {
    if (trackRef.current) {
      trackRef.current.measure((x, y, width, height, pageX, pageY) => {
        const touchX = event.nativeEvent.pageX - pageX;
        const newProgress = getProgressFromPosition(touchX, width);
        
        updateProgressUI(newProgress);
        
        if (onProgressChange) {
          onProgressChange(newProgress);
        }
      });
    }
  };
  
  if (isCompact) {
    return (
      <View 
        style={styles.compactContainer} 
        onLayout={(e) => {
          containerWidthRef.current = e.nativeEvent.layout.width;
        }}
      >
        <TouchableOpacity 
          activeOpacity={0.7}
          style={styles.fullWidthTouchable}
          onPress={(e) => {
            handleSliderPress(e);
          }}
        >
          <View 
            style={styles.progressBarContainer}
            ref={trackRef}
            {...panResponder.panHandlers}
          >
            <Animated.View 
              style={[
                styles.progressBar, 
                { 
                  width: animatedWidth.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%']
                  }), 
                  backgroundColor: FIXED_COLOR 
                }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {localProgress}/{goalTarget}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View 
      style={styles.container}
      onLayout={(e) => {
        containerWidthRef.current = e.nativeEvent.layout.width - 32;
      }}
    >
      <Text style={styles.label}>Progreso: {localProgress}/{goalTarget}</Text>
      
      <TouchableOpacity 
        activeOpacity={0.7}
        style={styles.sliderContainer}
        onPress={(e) => {
          handleSliderPress(e);
        }}
      >
        <View 
          style={styles.sliderTrack}
          ref={trackRef}
          {...panResponder.panHandlers}
        >
          <Animated.View 
            style={[
              styles.sliderFill, 
              { 
                width: animatedWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%']
                }), 
                backgroundColor: FIXED_COLOR 
              }
            ]} 
          />
        </View>
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
  fullWidthTouchable: {
    width: '100%',
    minHeight: 40,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  sliderContainer: {
    height: 50,
    justifyContent: 'center',
    width: '100%',
  },
  sliderTrack: {
    height: 14,
    backgroundColor: '#F0F0F0',
    borderRadius: 7,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 7,
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
