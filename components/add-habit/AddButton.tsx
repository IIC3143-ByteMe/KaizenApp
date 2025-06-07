import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface AddButtonProps {
    onPress?: () => void;
    disabled?: boolean;
}

export default function AddButton({ onPress, disabled = false }: AddButtonProps) {
    return (
    <TouchableOpacity 
        style={[styles.button, disabled && styles.buttonDisabled]} 
        onPress={onPress}
        disabled={disabled}
    >
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
    buttonDisabled: {
        backgroundColor: '#C5CAE9',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
