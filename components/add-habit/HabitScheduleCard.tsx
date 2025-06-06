import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RepeatDaySelector from '@components/add-habit/RepeatDaySelector';

export default function HabitScheduleCard() {
    return (
    <View style={styles.card}>
        <View style={styles.row}>
            <Text style={styles.label}>Duración</Text>
            <Text style={styles.value}>30 minutos</Text>
        </View>
        <Text style={[styles.label, { marginTop: 16 }]}>Repetir</Text>
        <RepeatDaySelector />
    </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        elevation: 2,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        color: '#999',
        fontSize: 14,
    },
    value: {
        color: '#7D89FF',
        fontWeight: '600',
    },
});
