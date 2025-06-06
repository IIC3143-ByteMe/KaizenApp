import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AddButton() {
    return (
    <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Agregar</Text>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#94A9FF',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
