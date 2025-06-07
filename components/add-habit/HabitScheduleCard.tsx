import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RepeatDaySelector from '@components/add-habit/RepeatDaySelector';
import GoalSelector from '@components/add-habit/GoalSelector';

interface HabitScheduleCardProps {
    initialGoalValue?: string;
    initialGoalUnit?: string;
    onGoalValueChange?: (value: string) => void;
    onGoalUnitChange?: (unit: string) => void;
}

export default function HabitScheduleCard({ 
    initialGoalValue,
    initialGoalUnit,
    onGoalValueChange,
    onGoalUnitChange
}: HabitScheduleCardProps) {
    return (
    <View>
        <View style={styles.card}>
            <Text style={[styles.label, { marginBottom: 16 }]}>Repetir</Text>
            <RepeatDaySelector />
        </View>
        
        <GoalSelector 
            initialValue={initialGoalValue}
            initialUnit={initialGoalUnit}
            onValueChange={onGoalValueChange}
            onUnitChange={onGoalUnitChange}
        />
    </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        elevation: 2,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        color: '#999',
        fontSize: 14,
    },
    value: {
        color: '#7D89FF',
        fontWeight: '600',
    },
});
