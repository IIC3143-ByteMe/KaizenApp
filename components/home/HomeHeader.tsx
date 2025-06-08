import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import useStreak from '@hooks/useStreak';
import { formatDateToSpanish } from '@utils/dateUtils';

export default function HomeHeader() {
  const { streak, loading } = useStreak();
  const [currentDate, setCurrentDate] = useState<string>('');
  
  useEffect(() => {
    const today = new Date();
    setCurrentDate(formatDateToSpanish(today));
  }, []);

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
