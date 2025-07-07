import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface JournalingModalProps {
  visible: boolean;
  onClose: () => void;
  date: string;
}

// Daily reflection questions
const journalPrompts = [
  "¿Cómo te sientes hoy?",
  "¿Qué te ha hecho sentir agradecido hoy?",
  "¿Qué obstáculo has superado hoy?",
  "¿Qué has aprendido de ti mismo hoy?",
  "¿Qué esperas del día de mañana?"
];

export default function JournalingModal({ visible, onClose, date }: JournalingModalProps) {
  const [journalEntry, setJournalEntry] = useState('');
  
  // Pick a random prompt each time the modal opens
  const randomPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
  
  const handleSave = () => {
    // For now, just mock saving the entry
    console.log('Guardando entrada de journal:', {
      date,
      entry: journalEntry,
      prompt: randomPrompt
    });
    
    // In a real implementation, you would save this to your backend
    
    // Reset the input and close the modal
    setJournalEntry('');
    onClose();
  };
  
  // Format the date to a more readable format
  const formattedDate = new Date(date).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.modalContent}>
          <View style={styles.headerRow}>
            <Text style={styles.modalTitle}>Reflexión diaria</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.dateText}>{formattedDate}</Text>
          
          <View style={styles.promptContainer}>
            <Text style={styles.promptText}>{randomPrompt}</Text>
          </View>
          
          <ScrollView style={styles.inputContainer}>
            <TextInput
              style={styles.journalInput}
              multiline
              placeholder="Escribe aquí tus pensamientos..."
              value={journalEntry}
              onChangeText={setJournalEntry}
              textAlignVertical="top"
            />
          </ScrollView>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
              disabled={!journalEntry.trim()}
            >
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxHeight: '80%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  dateText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  promptContainer: {
    backgroundColor: '#F3F8FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#94A9FF',
  },
  promptText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  inputContainer: {
    maxHeight: 250,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
  },
  journalInput: {
    padding: 12,
    fontSize: 16,
    color: '#333',
    minHeight: 150,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 12,
    padding: 14,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F2F2F2',
  },
  saveButton: {
    backgroundColor: '#94A9FF',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
