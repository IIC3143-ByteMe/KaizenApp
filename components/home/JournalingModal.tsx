import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { 
  getJournalQuestion, 
  getJournalEntryForDate, 
  saveJournalEntry 
} from '@services/journalService';
import { formatDateToSpanish } from '@utils/dateUtils';

interface JournalingModalProps {
  visible: boolean;
  onClose: () => void;
  date: string;
}

interface JournalEntry {
  date: string;
  entry: string;
}

export default function JournalingModal({ visible, onClose, date }: JournalingModalProps) {
  const [journalEntry, setJournalEntry] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(true);
  const [savingEntry, setSavingEntry] = useState(false);
  const [existingEntry, setExistingEntry] = useState<JournalEntry | null>(null);
  const [error, setError] = useState('');
  
  const apiDateFormat = date;
  
  useEffect(() => {
    if (visible) {
      loadJournalData();
    }
  }, [visible, date]);
  
  const loadJournalData = async () => {
    setLoading(true);
    setError('');
    
    try {
      const questionText = await getJournalQuestion();
      setQuestion(questionText);
      
      const existingEntryData = await getJournalEntryForDate(apiDateFormat);
      
      if (existingEntryData) {
        setExistingEntry(existingEntryData);
        setJournalEntry(existingEntryData.entry);
      } else {
        setExistingEntry(null);
        setJournalEntry('');
      }
    } catch (error) {
      console.error('Error al cargar datos del journal:', error);
      setError('No se pudieron cargar los datos. Intenta de nuevo más tarde.');
      setQuestion('¿Cómo te sientes hoy?');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSave = async () => {
    if (!journalEntry.trim()) return;
    
    try {
      setSavingEntry(true);
      
      const success = await saveJournalEntry(journalEntry);
      
      if (success) {
        console.log('✅ Entrada de journal guardada exitosamente');
        onClose();
      } else {
        setError('No se pudo guardar tu entrada. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('❌ Error al guardar la entrada de journal:', error);
      setError('No se pudo guardar tu entrada. Intenta de nuevo.');
    } finally {
      setSavingEntry(false);
    }
  };
  
  const formattedDate = formatDateToSpanish(new Date());
  
  if (!visible) return null;
  
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
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#94A9FF" />
              <Text style={styles.loadingText}>Cargando...</Text>
            </View>
          ) : (
            <>
              <View style={styles.promptContainer}>
                <Text style={styles.promptText}>{question}</Text>
              </View>
              
              {error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : null}
              
              <ScrollView style={styles.inputContainer}>
                <TextInput
                  style={styles.journalInput}
                  multiline
                  placeholder="Escribe aquí tus pensamientos..."
                  value={journalEntry}
                  onChangeText={setJournalEntry}
                  textAlignVertical="top"
                  editable={!savingEntry}
                />
              </ScrollView>
              
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]} 
                  onPress={onClose}
                  disabled={savingEntry}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                
                {existingEntry ? (
                  <TouchableOpacity 
                    style={[
                      styles.button, 
                      styles.saveButton,
                      journalEntry.trim() === existingEntry.entry.trim() && styles.disabledButton
                    ]}
                    onPress={handleSave}
                    disabled={savingEntry || journalEntry.trim() === existingEntry.entry.trim()}
                  >
                    {savingEntry ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <Text style={styles.saveButtonText}>Actualizar</Text>
                    )}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity 
                    style={[styles.button, styles.saveButton, !journalEntry.trim() && styles.disabledButton]}
                    onPress={handleSave}
                    disabled={savingEntry || !journalEntry.trim()}
                  >
                    {savingEntry ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <Text style={styles.saveButtonText}>Guardar</Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}
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
  disabledButton: {
    opacity: 0.5,
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    minHeight: 200,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  }
});
