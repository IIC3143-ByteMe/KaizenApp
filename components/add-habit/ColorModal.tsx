import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const COLORS = [
  '#A4B1FF', '#FFB6A4', '#A4FFDA', '#FFC8A4', '#A4D6FF', 
  '#D1A4FF', '#FFB4A4', '#A4FFB1', '#FFC5A4', '#A4FFF7',
  '#FFD84A', '#FF7070', '#70FF94', '#70C5FF', '#E870FF',
  '#B1B1B1', '#FFAA55', '#5E7CFF', '#55BDFF', '#FF55BD'
];

interface ColorModalProps {
  visible: boolean;
  selectedColor: string;
  onClose: () => void;
  onSelectColor: (color: string) => void;
}

export default function ColorModal({ visible, selectedColor, onClose, onSelectColor }: ColorModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Selecciona un color</Text>
            <TouchableOpacity onPress={onClose}>
              <FontAwesome5 name="times" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={COLORS}
            numColumns={5}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={[
                  styles.colorItem, 
                  { backgroundColor: item },
                  selectedColor === item && styles.selectedColorItem
                ]}
                onPress={() => onSelectColor(item)}
              >
                {selectedColor === item && (
                  <FontAwesome5 name="check" size={16} color="#fff" />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  colorItem: {
    width: '18%',
    aspectRatio: 1,
    borderRadius: 10,
    margin: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColorItem: {
    borderWidth: 2,
    borderColor: '#333',
  }
});

export { COLORS };