import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IkigaiEditModalProps {
  visible: boolean;
  onClose: () => void;
  onSave?: (descriptions: Descriptions) => void;
  initialValues?: Descriptions;
}

export interface Descriptions {
  pasion: string;
  mision: string;
  vocacion: string;
  profesion: string;
}

export default function IkigaiEditModal({
  visible,
  onClose,
  onSave,
  initialValues = { pasion: '', mision: '', vocacion: '', profesion: '' }
}: IkigaiEditModalProps) {
  const [descriptions, setDescriptions] = useState(initialValues);

  const handleChange = (field: keyof Descriptions, value: string) => {
    setDescriptions(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave?.(descriptions);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Editar tus descripciones</Text>

          <TextInput
            placeholder="Lo que AMAS"
            style={styles.input}
            value={descriptions.pasion}
            onChangeText={(text) => handleChange('pasion', text)}
          />
          <TextInput
            placeholder="En lo que eres BUENO"
            style={styles.input}
            value={descriptions.mision}
            onChangeText={(text) => handleChange('mision', text)}
          />
          <TextInput
            placeholder="Lo que el mundo NECESITA"
            style={styles.input}
            value={descriptions.vocacion}
            onChangeText={(text) => handleChange('vocacion', text)}
          />
          <TextInput
            placeholder="Por lo que te pueden PAGAR"
            style={styles.input}
            value={descriptions.profesion}
            onChangeText={(text) => handleChange('profesion', text)}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Guardar</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 12,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#94A9FF',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
