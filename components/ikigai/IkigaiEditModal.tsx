import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getIkigai, saveIkigai } from '@services/ikigaiStorage';

interface IkigaiEditModalProps {
  visible: boolean;
  onClose: () => void;
  onSave?: (descriptions: Descriptions) => void;
  initialValues?: Descriptions;
}

export interface Descriptions {
  amas: string;
  bueno: string;
  necesita: string;
  pagar: string;
}

export default function IkigaiEditModal({
  visible,
  onClose,
  onSave,
  initialValues = { amas: '', bueno: '', necesita: '', pagar: '' }
}: IkigaiEditModalProps) {
  const [descriptions, setDescriptions] = useState(initialValues);

  const handleChange = (field: keyof Descriptions, value: string) => {
    setDescriptions(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const existing = await getIkigai();

      if (!existing) {
        console.warn("No hay datos previos de ikigai");
        return;
      }

      const updated = {
        arquetipo: existing.arquetipo,
        amas: descriptions.amas || existing.amas,
        bueno: descriptions.bueno || existing.bueno,
        necesita: descriptions.necesita || existing.necesita,
        pagar: descriptions.pagar || existing.pagar,
      };

      await saveIkigai(updated);
      onSave?.(descriptions);
      onClose();
    } catch (error) {
      console.error("Error al guardar descripciones:", error);
    }
  };

  useEffect(() => {
    if (!visible) {
      setDescriptions({ amas: '', bueno: '', necesita: '', pagar: '' });
    }
  }, [visible]);

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
            placeholderTextColor="#777"
            style={styles.input}
            value={descriptions.amas}
            onChangeText={(text) => handleChange('amas', text)}
          />
          <TextInput
            placeholder="En lo que eres BUENO"
            placeholderTextColor="#777"
            style={styles.input}
            value={descriptions.bueno}
            onChangeText={(text) => handleChange('bueno', text)}
          />
          <TextInput
            placeholder="Lo que el mundo NECESITA"
            placeholderTextColor="#777"
            style={styles.input}
            value={descriptions.necesita}
            onChangeText={(text) => handleChange('necesita', text)}
          />
          <TextInput
            placeholder="Por lo que te pueden PAGAR"
            placeholderTextColor="#777"
            style={styles.input}
            value={descriptions.pagar}
            onChangeText={(text) => handleChange('pagar', text)}
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
    color: '#333'
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
