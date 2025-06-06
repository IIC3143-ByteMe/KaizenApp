import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function AuthFooter() {
    return (
        <TouchableOpacity onPress={() => {}}>
            <Text style={styles.link}>Olvidé mi contraseña</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    link: {
        color: '#94A9FF',
        fontSize: 14,
        marginTop: 20,
    },
});