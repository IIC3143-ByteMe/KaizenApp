import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getIkigai, updateIkigai } from '@services/ikigaiStorage';

interface IkigaiEditModalProps {
  visible: boolean;
  onClose: () => void;
  onSave?: (descriptions: Descriptions) => void;
  initialValues?: Descriptions;
}

export interface Descriptions {
  you_love: string;
  good_at: string;
  world_needs: string;
  is_profitable: string;
}

export default function IkigaiEditModal({
  visible,
  onClose,
  onSave,
  initialValues = { you_love: '', good_at: '', world_needs: '', is_profitable: '' }
}: IkigaiEditModalProps) {
  const [descriptions, setDescriptions] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCurrentData = async () => {
      if (visible) {
        setIsLoading(true);
        try {
          const ikigai = await getIkigai();
          if (ikigai) {
            setDescriptions({
              you_love: ikigai.you_love || '',
              good_at: ikigai.good_at || '',
              world_needs: ikigai.world_needs || '',
              is_profitable: ikigai.is_profitable || ''
            });
          }
        } catch (error) {
          console.error('Error al cargar datos de ikigai:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    loadCurrentData();
  }, [visible]);

  const handleChange = (field: keyof Descriptions, value: string) => {
    setDescriptions(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    Keyboard.dismiss();
    try {
      const existing = await getIkigai();

      if (!existing) {
        console.warn("No hay datos previos de ikigai");
        return;
      }

      const updated = {
        arquetype: existing.arquetype,
        you_love: descriptions.you_love || existing.you_love,
        good_at: descriptions.good_at || existing.good_at,
        world_needs: descriptions.world_needs || existing.world_needs,
        is_profitable: descriptions.is_profitable || existing.is_profitable,
      };

      await updateIkigai(updated);
      onSave?.(descriptions);
      onClose();
    } catch (error) {
      console.error("Error al guardar ikigai:", error);
    }
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

          {isLoading ? (
            <Text style={styles.loadingText}>Cargando datos...</Text>
          ) : (
            <>
              <TextInput
                placeholder="Lo que AMAS"
                placeholderTextColor="#777"
                style={styles.input}
                value={descriptions.you_love}
                onChangeText={(text) => handleChange('you_love', text)}
              />
              <TextInput
                placeholder="En lo que eres BUENO"
                placeholderTextColor="#777"
                style={styles.input}
                value={descriptions.good_at}
                onChangeText={(text) => handleChange('good_at', text)}
              />
              <TextInput
                placeholder="Lo que el mundo NECESITA"
                placeholderTextColor="#777"
                style={styles.input}
                value={descriptions.world_needs}
                onChangeText={(text) => handleChange('world_needs', text)}
              />
              <TextInput
                placeholder="Por lo que te pueden PAGAR"
                placeholderTextColor="#777"
                style={styles.input}
                value={descriptions.is_profitable}
                onChangeText={(text) => handleChange('is_profitable', text)}
              />

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveText}>Guardar</Text>
              </TouchableOpacity>
            </>
          )}
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
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginTop: 20,
  }
});
