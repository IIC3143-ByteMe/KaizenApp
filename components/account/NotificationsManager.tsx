import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Modal,
  ScrollView,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { getHabits, Habit, updateHabit } from '@services/habitStorage';
import { 
  scheduleHabitReminders, 
  cancelHabitReminders, 
  ensurePermissions,
  scheduleMotivationalNotification,
  cancelMotivationalNotification,
  disableHabitNotifications
} from '@services/notificationService';
import { 
  getNotificationPreferences, 
  updateMotivationalNotificationPreference 
} from '@services/notificationPreferencesStorage';
import ModalHeader, { LoadingState, PermissionState } from './NotificationsCommon';
import HabitNotifications from './HabitNotifications';
import MotivationalNotification from './MotivationalNotification';

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function NotificationsManager({ visible, onClose }: NotificationModalProps) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [motivationTime, setMotivationTime] = useState('08:00');
  const [motivationEnabled, setMotivationEnabled] = useState(false);
  const [motivationId, setMotivationId] = useState<string | null>(null);
  const [motivationText, setMotivationText] = useState('¡Es un gran día para seguir tus hábitos!');
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    if (visible) {
      loadData();
    }
  }, [visible]);

  const loadData = async () => {
    setLoading(true);
    try {
      const { granted } = await Notifications.getPermissionsAsync();
      setPermission(granted);
      
      const allHabits = await getHabits();
      setHabits(allHabits);
      
      const preferences = await getNotificationPreferences();
      
      const { motivationalNotification } = preferences;
      if (motivationalNotification) {
        setMotivationEnabled(motivationalNotification.enabled);
        setMotivationTime(motivationalNotification.time || '08:00');
        setMotivationText(motivationalNotification.message || '¡Es un gran día para seguir tus hábitos!');
        setMotivationId(motivationalNotification.notificationId || null);
      }
      
      const notifications = await Notifications.getAllScheduledNotificationsAsync();
      const motivationNotification = notifications.find(
        n => n.content.data?.type === 'motivation'
      );
      
      if (motivationNotification) {
        setMotivationEnabled(true);
        setMotivationId(motivationNotification.identifier);
        setMotivationText(motivationNotification.content.body || '');
        
        const trigger = motivationNotification.trigger as any;
        if (trigger && trigger.hour !== undefined && trigger.minute !== undefined) {
          setMotivationTime(`${trigger.hour.toString().padStart(2, '0')}:${trigger.minute.toString().padStart(2, '0')}`);
        }
      }
    } catch (error) {
      console.error("Error cargando datos de notificaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleHabitToggle = async (habit: Habit, enabled: boolean) => {
    try {
      if (enabled) {
        if (!permission) {
          const granted = await ensurePermissions();
          if (!granted) return;
          setPermission(granted);
        }
        
        const reminderIds = await scheduleHabitReminders({
          id: habit.id,
          title: habit.title,
          time: habit.reminders,
          daysOfWeek: habit.taskDays,
        });
        
        await updateHabit({ ...habit, reminderIds });
      } else {
        if (habit.reminderIds && habit.reminderIds.length > 0) {
          await disableHabitNotifications(habit.id, habit.reminderIds);
          await updateHabit({ ...habit, reminderIds: [] });
        }
      }
      
      loadData();
    } catch (error) {
      console.error("Error al cambiar notificaciones:", error);
    }
  };

  const handleMotivationToggle = async (enabled: boolean) => {
    setMotivationEnabled(enabled);
    
    try {
      if (enabled) {
        if (!permission) {
          const granted = await ensurePermissions();
          if (!granted) {
            setMotivationEnabled(false);
            return;
          }
          setPermission(granted);
        }
        
        const [hours, minutes] = motivationTime.split(':').map(Number);
        const newId = await scheduleMotivationalNotification(
          motivationText,
          hours,
          minutes
        );
        
        setMotivationId(newId);
      } else {
        await cancelMotivationalNotification();
        setMotivationId(null);
        
        await updateMotivationalNotificationPreference(false);
      }
    } catch (error) {
      console.error("Error al gestionar notificación de motivación:", error);
      setMotivationEnabled(!enabled);
    }
  };

  const handleSaveMotivationChanges = async (time: Date, message: string) => {
    try {
      const timeString = time.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
      
      setMotivationTime(timeString);
      setMotivationText(message);
      
      const newId = await scheduleMotivationalNotification(
        message,
        time.getHours(),
        time.getMinutes()
      );
      
      setMotivationId(newId);
    } catch (error) {
      console.error("Error al actualizar notificación de motivación:", error);
    }
  };

  const handleRequestPermission = async () => {
    const granted = await ensurePermissions();
    setPermission(granted);
    if (granted) loadData();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <ModalHeader title="Notificaciones" onClose={onClose} />
        
        {loading ? (
          <LoadingState />
        ) : !permission ? (
          <PermissionState onRequestPermission={handleRequestPermission} />
        ) : (
          <ScrollView style={styles.content}>
            <HabitNotifications 
              habits={habits}
              onToggleHabitNotification={handleHabitToggle}
            />
            
            <View style={styles.divider} />
            
            <MotivationalNotification
              enabled={motivationEnabled}
              time={motivationTime}
              message={motivationText}
              onToggleEnabled={handleMotivationToggle}
              onSaveChanges={handleSaveMotivationChanges}
            />
          </ScrollView>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 20,
  },
});