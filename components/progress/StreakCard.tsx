import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StreakCard() {
    return (
    <View style={styles.card}>
        <Text style={styles.text}>Racha actual</Text>
        <View style={styles.row}>
        <Text style={styles.days}>3 días</Text>
        <Ionicons name="flame-outline" size={24} color="white" />
        </View>
    </View>
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
