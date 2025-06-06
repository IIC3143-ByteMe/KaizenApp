import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
    label: string;
    onPress: () => void;
};

export default function SecondaryButton( { label, onPress }: Props ){
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        paddingVertical: 14,
        width: '100%',
        borderRadius: 25,
        alignItems: 'center',
        elevation: 2,
    },
    label: {
        color: '#5A6EF7',
        fontSize: 16,
        fontWeight: 'bold',
    },
});