import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const days = [
  { label: 'Vie', selected: true },
  { label: 'Sáb', checked: true },
  { label: 'Dom', checked: true },
  { label: 'Lun', checked: true },
  { label: 'Mar', checked: false },
  { label: 'Mié', checked: false },
  { label: 'Jue', checked: false },
];

export default function WeekdaySelector() {
  return (
    <View style={styles.row}>
      {days.map((day, idx) => (
        <View key={idx} style={[styles.dayContainer, day.selected && styles.selectedDay]}>
          <Text style={styles.label}>{day.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  dayContainer: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#EEE',
    borderRadius: 16,
    minWidth: 40,
  },
  selectedDay: {
    backgroundColor: '#CBD3FF',
  },
  label: { fontSize: 12 },
});
