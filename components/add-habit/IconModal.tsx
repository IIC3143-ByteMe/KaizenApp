import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const ICONS = [
  'running', 'dumbbell', 'book', 'brain', 'bed', 'users', 
  'piggy-bank', 'paint-brush', 'plane', 'apple-alt', 
  'water', 'language', 'power-off', 'utensils', 'heart', 
  'music', 'code', 'coffee', 'pen', 'sun', 'moon', 
  'bicycle', 'medkit', 'graduation-cap', 'leaf'
];

interface IconModalProps {
  visible: boolean;
  selectedIcon: string;
  onClose: () => void;
  onSelectIcon: (icon: string) => void;
}

export default function IconModal({ visible, selectedIcon, onClose, onSelectIcon }: IconModalProps) {
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
            <Text style={styles.modalTitle}>Selecciona un ícono</Text>
            <TouchableOpacity onPress={onClose}>
              <FontAwesome5 name="times" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={ICONS}
            numColumns={5}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={[
                  styles.iconItem, 
                  selectedIcon === item && styles.selectedItem
                ]}
                onPress={() => onSelectIcon(item)}
              >
                <FontAwesome5 
                  name={item as any} 
                  size={24} 
                  color={selectedIcon === item ? "#fff" : "#333"} 
                />
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
  iconItem: {
    width: '20%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: '2%',
  },
  selectedItem: {
    backgroundColor: '#94A9FF',
  },
});

export { ICONS };