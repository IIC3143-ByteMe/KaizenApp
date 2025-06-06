import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const days = ['L', 'M', 'W', 'J', 'V', 'S', 'D'];

export default function RepeatDaySelector() {
    return (
        <View style={styles.container}>
            {days.map((day, index) => (
                <View
                    key={index}
                    style={[
                        styles.circle,
                        index < 5 ? styles.selected : styles.unselected,
                    ]}
                >
                    <Text style={index < 5 ? styles.selectedText : styles.unselectedText}>
                        {day}
                    </Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    circle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selected: {
        backgroundColor: '#A4B1FF',
    },
    unselected: {
        backgroundColor: '#DDD',
    },
    selectedText: {
        color: 'white',
        fontWeight: 'bold',
    },
    unselectedText: {
        color: '#999',
        fontWeight: 'bold',
    },
});
