import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function HabitTextInputs() {
    return (
    <View style={styles.container}>
        <TextInput placeholder="Nombre" style={styles.input} />
        <TextInput
            placeholder="Descripción"
            style={[styles.input, { height: 80 }]}
            multiline
        />
    </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: 20 },
    input: {
        backgroundColor: 'white',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        marginBottom: 12,
        elevation: 2,
    },
});
