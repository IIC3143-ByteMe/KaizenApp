import React from 'react';
import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Habit } from '@services/habitStorage';
import { SectionHeader } from './NotificationsCommon';

interface HabitNotificationsProps {
  habits: Habit[];
  onToggleHabitNotification: (habit: Habit, enabled: boolean) => Promise<void>;
}

export default function HabitNotifications({ habits, onToggleHabitNotification }: HabitNotificationsProps) {
  const renderHabitItem = ({ item }: { item: Habit }) => {
    const hasNotifications = item.reminderIds && item.reminderIds.length > 0;
    
    return (
      <View style={styles.habitItem}>
        <View style={styles.habitInfo}>
          <Ionicons 
            name={item.icon || 'checkmark-circle'} 
            size={24} 
            color={item.color || '#94A9FF'} 
            style={styles.habitIcon}
          />
          <View>
            <Text style={styles.habitTitle}>{item.title}</Text>
            <Text style={styles.habitSchedule}>
              {item.reminderIds && item.reminderIds.length > 0 ? 
                `${item.taskDays.join(', ')} a las ${item.reminders.join(', ')}` : 
                'Sin notificaciones programadas'
              }
            </Text>
          </View>
        </View>
        <Switch
          value={hasNotifications}
          onValueChange={(value) => onToggleHabitNotification(item, value)}
          trackColor={{ false: '#D1D1D6', true: '#BDC6FF' }}
          thumbColor={hasNotifications ? '#7D89FF' : '#F4F3F4'}
        />
      </View>
    );
  };

  return (
    <View style={styles.section}>
      <SectionHeader
        title="Notificaciones de hábitos"
        subtitle="Activa o desactiva las notificaciones de tus hábitos"
      />
      
      {habits.length > 0 ? (
        <FlatList
          data={habits}
          renderItem={renderHabitItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          nestedScrollEnabled={true}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No tienes hábitos con notificaciones configuradas
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  habitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  habitInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  habitIcon: {
    marginRight: 12,
  },
  habitTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  habitSchedule: {
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
