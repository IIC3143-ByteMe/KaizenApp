import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function AuthHeader() {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>¡Hola!</Text>
            <Text style={styles.subtitle}>Inicia sesión o crea una{'\n'}cuenta para continuar</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width,
        alignItems: 'center',
        paddingVertical: 60,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginTop: 10,
    },
});