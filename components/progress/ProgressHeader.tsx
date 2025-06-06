import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function ProgressHeader(){
    return (
        <Text style={styles.title}>Mi progreso</Text>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});
