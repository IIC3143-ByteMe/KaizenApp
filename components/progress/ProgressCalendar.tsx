import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const days = ['L', 'M', 'W', 'J', 'V', 'S', 'D'];

export default function ProgressCalendar() {
    return (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                {days.map((d, i) => (
                    <Text key={i} style={styles.dayLabel}>{d}</Text>
                ))}
            </View>
            {[...Array(4)].map((_, rowIndex) => (
                <View key={rowIndex} style={styles.weekRow}>
                    {days.map((_, colIndex) => {
                        const checked = rowIndex === 0 && [2, 4, 5, 6].includes(colIndex);
                        return (
                            <View
                                key={colIndex}
                                style={[
                                    styles.circle,
                                    checked ? styles.checked : styles.unchecked,
                                ]}
                            />
                        );
                    })}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        marginBottom: 20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    weekRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    dayLabel: { fontSize: 12, fontWeight: '600', color: '#888' },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    checked: {
        backgroundColor: '#A4B1FF',
        borderWidth: 2,
        borderColor: 'white',
    },
    unchecked: {
        backgroundColor: '#DDD',
    },
});
