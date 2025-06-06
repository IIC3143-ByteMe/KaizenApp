import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
    title: string;
    completed: number;
    total: number;
    onPress?: () => void;
};

export default function HabitCard({ title, completed, total, onPress }: Props) {
    const done = completed >= total;

    return (
        <TouchableOpacity 
              style={[styles.card, done && styles.cardDone]} 
              onPress={onPress}
              activeOpacity={0.7}
          >
            <Text style={styles.title}>{title}</Text>
            <Text style={[styles.progress, done && styles.progressDone]}>
                {completed}/{total} mins
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F0F0F0',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 2,
    },
    cardDone: {
        backgroundColor: '#E5E9FF',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    progress: {
        fontWeight: '600',
        color: '#555',
    },
    progressDone: {
        color: '#7D89FF',
    },
});
