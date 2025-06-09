import React from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const filters = [
    { id: 'all', name: 'Todos', icon: 'layer-group' },
    { id: 'Healthy', name: 'Healthy', icon: 'apple-alt' },
    { id: 'Fitness', name: 'Fitness', icon: 'dumbbell' },
    { id: 'Mental Health', name: 'Mental Health', icon: 'brain' },
    { id: 'Productivity', name: 'Productivity', icon: 'lightbulb' },
    { id: 'Sleep', name: 'Sleep', icon: 'bed' },
    { id: 'Social', name: 'Social', icon: 'users' },
    { id: 'Finance', name: 'Finance', icon: 'piggy-bank' },
    { id: 'Hobbies', name: 'Hobbies', icon: 'paint-brush' },
    { id: 'Reading', name: 'Reading', icon: 'book' },
    { id: 'Travel', name: 'Travel', icon: 'plane' },
];

interface HabitTypeCarouselProps {
    selectedFilter: string;
    onFilterChange: (filter: string) => void;
}

export default function HabitTypeCarousel({ selectedFilter = 'all', onFilterChange }: HabitTypeCarouselProps) {
    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
                {filters.map((item) => {
                    const isSelected = selectedFilter === item.id;
                    
                    return (
                        <TouchableOpacity 
                            key={item.id}
                            style={[
                                styles.item,
                                isSelected && styles.selectedItem
                            ]}
                            onPress={() => onFilterChange(item.id)}
                            activeOpacity={0.7}
                        >
                            <FontAwesome5 
                                name={item.icon as any} 
                                size={18} 
                                color={isSelected ? '#FFF' : '#333'} 
                            />
                            <Text style={[
                                styles.label,
                                isSelected && styles.selectedLabel
                            ]}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scroll: {
        marginBottom: 10,
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
    selectedItem: {
        backgroundColor: '#94A9FF',
    },
    label: {
        marginTop: 5,
        fontSize: 13,
        color: '#444',
    },
    selectedLabel: {
        color: '#FFF',
        fontWeight: '600',
    },
});
