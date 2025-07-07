import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import HabitTemplateItem from '@components/add-habit/HabitTemplateItem';
import AddHabitModal from '@components/add-habit/AddHabitModal';
import { fetchHabitTemplates, HabitTemplate } from '@services/templateStorage';

export default function AddHabitScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<HabitTemplate>();
  const [templates, setTemplates] = useState<HabitTemplate[]>([]);

  useEffect(() => {
    fetchHabitTemplates().then(setTemplates);
  }, []);

  const handleTemplatePress = (tpl: HabitTemplate) => {
    setSelectedTemplate(tpl);
    setModalVisible(true);
  };
  const handleCreateNew = () => {
    setSelectedTemplate(undefined);
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedTemplate(undefined), 300);
  };
  const handleHabitAdded = () => {
    router.replace('/(main)/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Plantillas de hábitos</Text>
          <Text style={styles.subtitle}>
            Selecciona un hábito para comenzar o crea uno nuevo
          </Text>
        </View>

        <FlatList
          data={templates}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <HabitTemplateItem
              title={item.title}
              description={item.description || ''}
              icon={item.icon}
              color={item.color}
              onPress={() => handleTemplatePress(item)}
            />
          )}
        />

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handleCreateNew}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <AddHabitModal
        visible={modalVisible}
        onClose={handleCloseModal}
        selectedTemplate={selectedTemplate}
        onHabitAdded={handleHabitAdded}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    padding: 20,
  },
  header: {
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  listContent: {
    paddingTop: 4,
    paddingBottom: 60,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#94A9FF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
});
