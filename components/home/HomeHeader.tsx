import { useFocusEffect } from 'expo-router';
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { formatDateToSpanish } from '@utils/dateUtils';
import useStreak from '@hooks/useStreak';
import { Ionicons } from '@expo/vector-icons';

export default function HomeHeader() {
  const [currentDate, setCurrentDate] = useState<string>('');
  const { streak, loading, refreshStreak } = useStreak(false);

  useEffect(() => {
    const today = new Date();
    setCurrentDate(formatDateToSpanish(today));
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshStreak();
      return () => {};
    }, [refreshStreak])
  );

  const handleStreakBadgePress = () => {
    refreshStreak(true);
  };

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>¡Hola!</Text>
        <Text style={styles.date}>{currentDate}</Text>
      </View>
      <TouchableOpacity 
        style={styles.streakBadge} 
        onPress={handleStreakBadgePress}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <View style={styles.streakContent}>
            <Text style={styles.streakText}>{streak}</Text>
            <Ionicons name="flame" size={22} color="white" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#7D89FF' },
  date: { color: '#333', marginTop: 4, fontWeight: '600' },
  streakBadge: {
    backgroundColor: '#7D89FF',
    borderRadius: 40,
    padding: 12,
    elevation: 4,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 4,
  },
});
