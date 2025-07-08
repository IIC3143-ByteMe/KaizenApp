import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getDailyCompletions, DailyCompletions } from '@services/dailyCompletionsService';
import { getJournalEntryForDate } from '@services/journalService';

interface DayDetailsProps {
  date: string;
  onDetailsLoaded?: (hasData: boolean) => void;
}

export default function DayDetails({ date, onDetailsLoaded }: DayDetailsProps) {
  const [dailyCompletions, setDailyCompletions] = useState<DailyCompletions | null>(null);
  const [journalEntry, setJournalEntry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDayDetails();
  }, [date]);

  const loadDayDetails = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const completions = await getDailyCompletions(date);
      setDailyCompletions(completions);
      
      try {
        const journalData = await getJournalEntryForDate(date);
        setJournalEntry(journalData ? journalData.entry : null);
      } catch (journalError) {
        setJournalEntry(null);
      }
      
      if (onDetailsLoaded) {
        const hasData = !!(completions?.completions.length || journalEntry);
        onDetailsLoaded(hasData);
      }
    } catch (error) {
      setError('No se pudieron cargar los datos para el día seleccionado');
      
      if (onDetailsLoaded) {
        onDetailsLoaded(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A4B1FF" />
        <Text style={styles.loadingText}>Cargando detalles...</Text>
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View>
      <Text style={styles.dayDetailsTitle}>
        {date}
      </Text>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Hábitos</Text>
        {dailyCompletions ? (
          <View>
            <Text style={styles.completionText}>
              Completitud: {Math.round(dailyCompletions.overall_percentage * 100)}%
            </Text>
            
            {dailyCompletions.completions.length > 0 ? (
              dailyCompletions.completions.map((completion, index) => (
                <View key={index} style={styles.habitItem}>
                  <Text style={styles.habitTitle}>{completion.title}</Text>
                  <Text style={[
                    styles.habitStatus,
                    completion.completed ? styles.completed : styles.incomplete
                  ]}>
                    {completion.completed ? 'Completado' : 'Incompleto'}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No hay hábitos registrados para este día</Text>
            )}
          </View>
        ) : (
          <Text style={styles.emptyText}>No hay datos de hábitos para este día</Text>
        )}
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Reflexión diaria</Text>
        {journalEntry ? (
          <Text style={styles.journalText}>{journalEntry}</Text>
        ) : (
          <Text style={styles.emptyText}>No hay entrada de diario para este día</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dayDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    padding: 10,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  completionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 12,
  },
  habitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  habitTitle: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  habitStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  completed: {
    color: '#4CAF50',
  },
  incomplete: {
    color: '#FF5252',
  },
  journalText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 10,
  },
});
