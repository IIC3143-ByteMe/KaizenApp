import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DAYS = [
    { id: 'Mon', label: 'L' },
    { id: 'Tue', label: 'M' },
    { id: 'Wed', label: 'X' },
    { id: 'Thu', label: 'J' },
    { id: 'Fri', label: 'V' },
    { id: 'Sat', label: 'S' },
    { id: 'Sun', label: 'D' },
];

interface WeekdayPickerProps {
    selectedDays: string[];
    onDaysChange: (days: string[]) => void;
}

export default function WeekdayPicker({ selectedDays, onDaysChange }: WeekdayPickerProps) {
    const [selectedDaysList, setSelectedDaysList] = useState<string[]>([]);

    useEffect(() => {
        if (selectedDays && Array.isArray(selectedDays)) {
            setSelectedDaysList(selectedDays);
        }
    }, [selectedDays]);

    const toggleDay = (dayId: string) => {
        let newSelectedDays;
        
        if (selectedDaysList.includes(dayId)) {
            newSelectedDays = selectedDaysList.filter(d => d !== dayId);
        } else {
            newSelectedDays = [...selectedDaysList, dayId];
        }
        
        setSelectedDaysList(newSelectedDays);
        onDaysChange(newSelectedDays);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Días de la semana</Text>
            <View style={styles.daysContainer}>
                {DAYS.map((day) => (
                    <TouchableOpacity
                        key={day.id}
                        style={[
                            styles.dayButton,
                            selectedDaysList.includes(day.id) && styles.selectedDayButton
                        ]}
                        onPress={() => toggleDay(day.id)}
                    >
                        <Text
                            style={[
                                styles.dayLabel,
                                selectedDaysList.includes(day.id) && styles.selectedDayLabel
                            ]}
                        >
                            {day.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
        color: '#444',
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedDayButton: {
        backgroundColor: '#94A9FF',
    },
    dayLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#444',
    },
    selectedDayLabel: {
        color: '#fff',
    },
});