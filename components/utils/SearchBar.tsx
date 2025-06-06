import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function SearchBar() {
    return (
        <View style={styles.container}>
            <TextInput placeholder="Search..." style={styles.input} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 16,
    },
    input: {
        fontSize: 16,
    },
});
