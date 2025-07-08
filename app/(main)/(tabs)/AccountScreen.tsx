import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import Settings from '@components/account/Settings';
import { Ionicons } from '@expo/vector-icons';
import { getUser, UserData } from '@services/userStorage';
import ArchetypeCard from '@components/progress/ArchetypeCard';
import NotificationsManager from '@components/account/NotificationsManager';
import { fetchNotificationsFromBackend } from '@services/notificationService';

export default function AccountScreen() {
  const [user, setUser] = useState<UserData | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const data = await getUser();
      setUser(data);
    };
    
    loadUser();
    
    fetchNotificationsFromBackend();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.configButton}>
          <Ionicons name="settings-outline" size={28} color="#555" />
        </TouchableOpacity>

        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle-outline" size={110} color="#B0B0B0" />
        </View>

        <Text style={styles.name}>{user?.full_name || 'Tu nombre'}</Text>
        <Text style={styles.info}>{user?.email || 'correo@ejemplo.com'}</Text>

        <ArchetypeCard />

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setShowNotifications(true)}
        >
          <View style={styles.actionButtonContent}>
            <Ionicons name="notifications-outline" size={22} color="#555" style={styles.actionIcon} />
            <Text style={styles.actionText}>Administrar notificaciones</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionButtonContent}>
            <Ionicons name="person-outline" size={22} color="#555" style={styles.actionIcon} />
            <Text style={styles.actionText}>Editar datos</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionButtonContent}>
            <Ionicons name="star-outline" size={22} color="#555" style={styles.actionIcon} />
            <Text style={styles.actionText}>Alguna otra acción increíble</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#999" />
        </TouchableOpacity>

        <Settings />

        <NotificationsManager
          visible={showNotifications}
          onClose={() => setShowNotifications(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F6F6F6' },
    scrollContent: {
        alignItems: 'center',
        padding: 24,
        paddingBottom: 100,
        position: 'relative',
    },
    configButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 2,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 6,
        elevation: 2,
    },
    avatarContainer: {
        marginTop: 32,
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center',
    },
    info: {
        fontSize: 15,
        color: '#555',
        marginBottom: 24,
        textAlign: 'center',
    },
    actionButton: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 14,
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
    },
    actionButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionIcon: {
        marginRight: 12,
    },
    actionText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#222',
    },
});
