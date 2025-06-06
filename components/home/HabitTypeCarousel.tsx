import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const filters = [
    { name: 'Healthy', icon: 'apple-alt' },
    { name: 'Fitness', icon: 'dumbbell' },
    { name: 'Mental Health', icon: 'brain' },
    { name: 'Productivity', icon: 'lightbulb' },
    { name: 'Sleep', icon: 'bed' },
    { name: 'Social', icon: 'users' },
    { name: 'Finance', icon: 'piggy-bank' },
    { name: 'Hobbies', icon: 'paint-brush' },
    { name: 'Reading', icon: 'book' },
    { name: 'Travel', icon: 'plane' },
];

export default function HabitTypeCarousel() {
    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
                {filters.map((item, idx) => (
                    <View key={idx} style={styles.item}>
                        <FontAwesome5 name={item.icon as any} size={18} color="#333" />
                        <Text style={styles.label}>{item.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
        
    );
}

const styles = StyleSheet.create({
    scroll: {
        marginBottom: 20,
    },
    item: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginRight: 12,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 1,
    },
    label: {
        marginTop: 5,
        fontSize: 13,
        color: '#444',
    },
});
