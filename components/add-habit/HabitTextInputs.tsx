import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function HabitTextInputs() {
    return (
    <View style={styles.container}>
        <TextInput
            placeholder="Nombre"
            style={styles.name_input}
            placeholderTextColor="#999"
        />
        <TextInput
            placeholder="Descripción"
            style={styles.description_input}
            multiline
            placeholderTextColor="#999"
        />
    </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: 20 },
    name_input: {
        backgroundColor: 'white',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        marginBottom: 12,
        elevation: 2,
    },
    description_input: {
        backgroundColor: 'white',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        elevation: 2,
        height: 80,
    },
});
