import { useFocusEffect } from 'expo-router';
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { formatDateToSpanish } from '@utils/dateUtils';
import { getStreakLocal } from '@services/streakService';

export default function HomeHeader() {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const today = new Date();
    setCurrentDate(formatDateToSpanish(today));
  }, []);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      setLoading(true);
      getStreakLocal()
        .then((s) => {
          if (active) setStreak(s);
        })
        .catch(console.error)
        .finally(() => {
          if (active) setLoading(false);
        });
      return () => {
        active = false;
      };
    }, [])
  );

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>¡Hola!</Text>
        <Text style={styles.date}>{currentDate}</Text>
      </View>
      <View style={styles.streakBadge}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.streakText}>{streak}🔥</Text>
        )}
      </View>
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
    padding: 16,
    elevation: 4,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
