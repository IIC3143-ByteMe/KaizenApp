import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { preloadCompletionsForDateRange } from '@services/dailyCompletionsService';

interface DayItem {
  label: string;
  value: number;
  dayCode: string;
  selected: boolean;
  date: Date;
  formattedDate: string;
}

interface WeekdaySelectorProps {
  onDateSelected?: (date: string, dayCode: string) => void;
}

export default function WeekdaySelector({ onDateSelected }: WeekdaySelectorProps) {
  const [days, setDays] = useState<DayItem[]>([]);
  
  useEffect(() => {
    const dayLabels = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const dayNameCodes = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const lastSevenDays: DayItem[] = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      const formattedDate = formatDate(date);
      const dayOfWeek = date.getDay();
      
      lastSevenDays.push({
        label: dayLabels[dayOfWeek],
        value: dayOfWeek,
        dayCode: dayNameCodes[dayOfWeek],
        date: date,
        formattedDate: formattedDate,
        selected: i === 0
      });
    }
    
    setDays(lastSevenDays);
    
    if (onDateSelected) {
      const todayDayCode = dayNameCodes[today.getDay()];
      onDateSelected(formatDate(today), todayDayCode);
    }
    
    // Preload data for all 7 days
    const allDates = lastSevenDays.map(day => day.formattedDate);
    preloadCompletionsForDateRange(allDates).catch(err => 
      console.error('Error preloading completions:', err)
    );
  }, []);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDayPress = (index: number) => {
    const selectedDay = days[index];
    console.log(`Día seleccionado: ${selectedDay.label} (fecha: ${selectedDay.formattedDate}, código: ${selectedDay.dayCode})`);
    
    setDays(days.map((day, idx) => ({
      ...day,
      selected: idx === index
    })));
    
    if (onDateSelected) {
      onDateSelected(selectedDay.formattedDate, selectedDay.dayCode);
    }
  };

  return (
    <View style={styles.row}>
      {days.map((day, idx) => (
        <TouchableOpacity 
          key={idx} 
          style={[styles.dayContainer, day.selected && styles.selectedDay]}
          onPress={() => handleDayPress(idx)}
          activeOpacity={0.7}
        >
          <Text style={[styles.label, day.selected && styles.selectedLabel]}>
            {day.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

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
    backgroundColor: '#94A9FF',
  },
  label: { 
    fontSize: 12,
    color: '#555'
  },
  selectedLabel: {
    color: 'white',
    fontWeight: '600'
  }
});
