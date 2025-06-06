import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
    label: string;
    onPress: () => void;
};

export default function PrimaryButton( { label, onPress }: Props ){
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#94A9FF',
        paddingVertical: 14,
        width: '100%',
        borderRadius: 25,
        alignItems: 'center',
        elevation: 3,
    },
    label: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});