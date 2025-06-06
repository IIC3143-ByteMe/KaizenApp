import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function HabitFormHeader() {
    return (
        <Text style={styles.title}>Agregar hábito</Text>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
