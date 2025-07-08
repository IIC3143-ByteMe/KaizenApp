import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import IkigaiDiagram from '@components/ikigai/IkigaiDiagram';
import IkigaiEditModal, { Descriptions } from '@components/ikigai/IkigaiEditModal';
import { getIkigai, fetchIkigaiFromBackend } from '@services/ikigaiStorage';

export default function IkigaiScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<Descriptions>({
    you_love: '',
    good_at: '',
    world_needs: '',
    is_profitable: ''
  });

  const loadIkigaiData = async (forceRefresh = false) => {
    setLoading(true);
    try {
      let ikigaiData;
      
      if (forceRefresh) {
        ikigaiData = await fetchIkigaiFromBackend();
      } else {
        ikigaiData = await getIkigai();
        if (!ikigaiData) {
          ikigaiData = await fetchIkigaiFromBackend();
        }
      }
      
      if (ikigaiData) {
        setInitialValues({
          you_love: ikigaiData.you_love || '',
          good_at: ikigaiData.good_at || '',
          world_needs: ikigaiData.world_needs || '',
          is_profitable: ikigaiData.is_profitable || ''
        });
      }
      
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Error al cargar datos de ikigai:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIkigaiData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadIkigaiData(true);
      return () => {};
    }, [])
  );

  const handleSaveDescriptions = async (newValues: Descriptions) => {
    setInitialValues(newValues);
    setRefreshKey(prev => prev + 1);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="create-outline" size={24} color="#555" />
      </TouchableOpacity>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#94A9FF" />
        </View>
      ) : (
        <IkigaiDiagram refreshKey={refreshKey} />
      )}

      <IkigaiEditModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveDescriptions}
        initialValues={initialValues}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
