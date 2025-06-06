import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RewardCard from '@components/progress/RewardCard';

export default function RewardsGrid() {
    const rewards = [
        { label: '3 días de racha', active: true },
        { label: '10 días de racha', active: false },
        { label: '25 días de racha', active: false },
    ];

    return (
        <View>
            <Text style={styles.title}>Premios</Text>
            <View style={styles.row}>
                {rewards.map((reward, i) => (
                  <RewardCard key={i} label={reward.label} active={reward.active} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
