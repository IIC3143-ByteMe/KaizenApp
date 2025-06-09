import React from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const categoryIcons: {[key: string]: string} = {
    'all': 'layer-group',
    'Healthy': 'apple-alt',
    'Fitness': 'dumbbell',
    'Mental Health': 'brain',
    'Productivity': 'lightbulb',
    'Sleep': 'bed',
    'Social': 'users',
    'Finance': 'piggy-bank',
    'Hobbies': 'paint-brush',
    'Reading': 'book',
    'Travel': 'plane',
    'default': 'tag'
};

interface HabitTypeCarouselProps {
    selectedFilter: string;
    onFilterChange: (filter: string) => void;
    availableCategories: string[];
}

export default function HabitTypeCarousel({ 
    selectedFilter = 'all', 
    onFilterChange,
    availableCategories = []
}: HabitTypeCarouselProps) {
    const filters = [
        { id: 'all', name: 'Todos', icon: categoryIcons['all'] },
        ...availableCategories.map(category => ({
            id: category,
            name: category,
            icon: categoryIcons[category] || categoryIcons['default']
        }))
    ];

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
