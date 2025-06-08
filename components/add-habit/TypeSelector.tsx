import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const habitGroups = [
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

interface TypeSelectorProps {
    selectedType: string;
    onTypeChange: (type: string) => void;
}

export default function TypeSelector({ selectedType, onTypeChange }: TypeSelectorProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Categoría</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {habitGroups.map((group) => (
                    <TouchableOpacity
                        key={group.name}
                        style={[
                            styles.typeItem,
                            selectedType === group.name && styles.selectedTypeItem
                        ]}
                        onPress={() => onTypeChange(group.name)}
                    >
                        <FontAwesome5
                            name={group.icon as any}
                            size={18}
                            color={selectedType === group.name ? '#fff' : '#333'}
                        />
                        <Text
                            style={[
                                styles.typeLabel,
                                selectedType === group.name && styles.selectedTypeLabel
                            ]}
                        >
                            {group.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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
    typeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginRight: 12,
        borderRadius: 12,
        elevation: 1,
    },
    selectedTypeItem: {
        backgroundColor: '#94A9FF',
    },
    typeLabel: {
        marginLeft: 8,
        fontSize: 14,
        color: '#444',
    },
    selectedTypeLabel: {
        color: '#fff',
        fontWeight: '500',
    },
});