import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface HabitFormHeaderProps {
    isTemplate?: boolean;
}

export default function HabitFormHeader({ isTemplate = false }: HabitFormHeaderProps) {
    return (
        <Text style={styles.title}>
            {isTemplate ? 'Personalizar hábito' : 'Agregar hábito'}
        </Text>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
