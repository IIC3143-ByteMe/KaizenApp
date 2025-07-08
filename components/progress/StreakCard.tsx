import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useStreak from '@hooks/useStreak';
import { useFocusEffect } from 'expo-router';

export default function StreakCard() {
    const { streak, loading, refreshStreak } = useStreak(true);
    
    useFocusEffect(
        useCallback(() => {
            console.log('🔄 StreakCard recibió foco, actualizando streak...');
            refreshStreak(true);
            return () => {};
        }, [refreshStreak])
    );
    
    const handleCardPress = () => {
        refreshStreak(true);
    };
    
    return (
        <TouchableOpacity 
            style={styles.card}
            onPress={handleCardPress}
            activeOpacity={0.8}
        >
            <Text style={styles.text}>Racha actual</Text>
            <View style={styles.row}>
                {loading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <>
                        <Text style={styles.days}>{streak} {streak === 1 ? 'día' : 'días'}</Text>
                        <Ionicons name="flame" size={24} color="white" />
                    </>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#7D89FF',
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
    },
    text: {
        color: 'white',
        fontSize: 14,
    },
    days: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        marginRight: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
});
