import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function IconSoundSelectors() {
    return (
    <View style={styles.row}>
        <TouchableOpacity style={styles.box}>
            <Text style={styles.label}>Ícono</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
            <Text style={styles.label}>Sonido</Text>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    box: {
        backgroundColor: 'white',
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 5,
        elevation: 2,
    },
    label: {
        fontWeight: '600',
        color: '#555',
    },
});
