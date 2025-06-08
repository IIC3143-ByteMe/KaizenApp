import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IkigaiDiagram from '@components/ikigai/IkigaiDiagram';
import IkigaiEditModal, { Descriptions } from '@components/ikigai/IkigaiEditModal';

export default function IkigaiScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSaveDescriptions = async (newValues: Descriptions) => {
    console.log('Saved:', newValues);
    setRefreshKey(prev => prev + 1);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="create-outline" size={24} color="#555" />
      </TouchableOpacity>

      <IkigaiDiagram refreshKey={refreshKey} />

      <IkigaiEditModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveDescriptions}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  editButton: {
    position: 'absolute',
    top: 60,
    right: 30,
    zIndex: 10,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 3,
  },
});
