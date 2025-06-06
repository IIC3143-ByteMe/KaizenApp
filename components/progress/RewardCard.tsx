import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
    label: string;
    active: boolean;
};

export default function RewardCard( { label, active }: Props ) {
    return (
        <View style={[styles.card, active && styles.activeCard]}>
            <View style={styles.iconStub} />
            <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F0F0F0',
        borderRadius: 16,
        padding: 12,
        alignItems: 'center',
        width: '30%',
    },
    activeCard: {
        backgroundColor: '#DCE1FF',
    },
    iconStub: {
        width: 40,
        height: 40,
        backgroundColor: '#AAA',
        borderRadius: 20,
        marginBottom: 8,
    },
    label: {
        fontSize: 12,
        textAlign: 'center',
        color: '#888',
    },
    activeLabel: {
        fontWeight: 'bold',
        color: '#5A6EF7',
    },
});
