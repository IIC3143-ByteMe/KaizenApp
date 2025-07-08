import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, ActivityIndicator, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import IkigaiDiagram from '@components/ikigai/IkigaiDiagram';
import IkigaiEditModal, { Descriptions } from '@components/ikigai/IkigaiEditModal';
import { fetchIkigaiFromBackend } from '@services/ikigaiStorage';
import { useIkigai } from '@hooks/useIkigai';

export default function IkigaiScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { ikigaiData, loading, error } = useIkigai(refreshKey);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchIkigaiFromBackend();
      setRefreshKey(prev => prev + 1);
    } catch (err) {
    } finally {
      setIsRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleRefresh();
      return () => {};
    }, [])
  );

  const handleSaveDescriptions = async (newValues: Descriptions) => {
    setRefreshKey(prev => prev + 1);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Ikigai</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="create-outline" size={24} color="#555" />
        </TouchableOpacity>
      </View>

      {loading || isRefreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#94A9FF" />
          <Text style={styles.loadingText}>Cargando tu diagrama de Ikigai...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={50} color="#FF7070" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Text style={styles.refreshButtonText}>Intentar de nuevo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <IkigaiDiagram refreshKey={refreshKey} />
      )}

      <IkigaiEditModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveDescriptions}
        initialValues={{
          you_love: ikigaiData.you_love,
          good_at: ikigaiData.good_at,
          world_needs: ikigaiData.world_needs,
          is_profitable: ikigaiData.is_profitable
        }}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Encuentra tu propósito de vida explorando las intersecciones entre lo que amas,
          en lo que eres bueno, lo que el mundo necesita y por lo que te pueden pagar.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    color: '#666',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  refreshButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#94A9FF',
    borderRadius: 20,
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
