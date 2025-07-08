import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Switch, 
  TextInput,
  Modal,
  Platform,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SectionHeader } from './NotificationsCommon';

interface MotivationalNotificationProps {
  enabled: boolean;
  time: string;
  message: string;
  onToggleEnabled: (enabled: boolean) => Promise<void>;
  onSaveChanges: (time: Date, message: string) => Promise<void>;
}

export default function MotivationalNotification({
  enabled,
  time,
  message,
  onToggleEnabled,
  onSaveChanges
}: MotivationalNotificationProps) {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(() => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
  });
  const [motivationText, setMotivationText] = useState(message);
  
  const handleShowTimePicker = () => {
    setShowTimePicker(true);
  };

  const hideTimePicker = () => {
    setShowTimePicker(false);
  };

  const handleTimeChange = (event: any, selected?: Date) => {
    if (Platform.OS === 'android') {
      hideTimePicker();
    }
    
    if (selected && event.type !== 'dismissed') {
      setSelectedTime(selected);
    }
  };

  const saveMotivationChanges = async () => {
    await onSaveChanges(selectedTime, motivationText);
    hideTimePicker();
  };

  const formatTimeString = (date: Date): string => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <View style={styles.section}>
      <SectionHeader
        title="Mensaje de motivación diario"
        subtitle="Recibe un mensaje de motivación todos los días"
      />
      
      <View style={styles.motivationContainer}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Activar mensaje diario</Text>
          <Switch
            value={enabled}
            onValueChange={onToggleEnabled}
            trackColor={{ false: '#D1D1D6', true: '#BDC6FF' }}
            thumbColor={enabled ? '#7D89FF' : '#F4F3F4'}
          />
        </View>
        
        <TouchableOpacity 
          style={[
            styles.timeSelector,
            !enabled && styles.disabledInput
          ]}
          onPress={() => enabled && handleShowTimePicker()}
          disabled={!enabled}
        >
          <Ionicons name="time-outline" size={20} color="#666" />
          <Text style={styles.timeText}>
            {formatTimeString(selectedTime)}
          </Text>
          <Ionicons name="chevron-down" size={16} color="#666" />
        </TouchableOpacity>
        
        <TextInput
          style={[
            styles.motivationInput,
            !enabled && styles.disabledInput
          ]}
          value={motivationText}
          onChangeText={setMotivationText}
          placeholder="Mensaje de motivación"
          placeholderTextColor="#999"
          multiline={true}
          numberOfLines={3}
          editable={enabled}
        />
        
        {enabled && (
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={saveMotivationChanges}
          >
            <Text style={styles.saveButtonText}>Guardar cambios</Text>
          </TouchableOpacity>
        )}
      </View>

      {showTimePicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}

      {Platform.OS === 'ios' && (
        <Modal
          visible={showTimePicker}
          transparent={true}
          animationType="slide"
        >
          <SafeAreaView style={styles.timePickerOverlay}>
            <View style={styles.timePickerContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={hideTimePicker}>
                  <Text style={styles.cancelButton}>Cancelar</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Seleccionar hora</Text>
                <TouchableOpacity onPress={saveMotivationChanges}>
                  <Text style={styles.confirmButton}>Guardar</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.pickerContainer}>
                <DateTimePicker
                  value={selectedTime}
                  mode="time"
                  display="spinner"
                  onChange={handleTimeChange}
                  style={styles.iosPicker}
                  is24Hour={true}
                  locale="es-ES"
                  textColor="#000000"
                  themeVariant="light"
                />
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  motivationContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
  },
  timeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  timeText: {
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
  },
  motivationInput: {
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  disabledInput: {
    opacity: 0.5,
  },
  saveButton: {
    backgroundColor: '#7D89FF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  timePickerOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  timePickerContent: {
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cancelButton: {
    color: '#999',
    fontSize: 16,
  },
  confirmButton: {
    color: '#94A9FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: -10,
  },
  iosPicker: {
    height: 200,
    color: '#000000',
  }
});
