import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HabitTypeSelectorProps {
    selectedType: string;
    onTypeChange: (type: string) => void;
}

export default function HabitTypeSelector({ selectedType, onTypeChange }: HabitTypeSelectorProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tipo de hábito</Text>
            
            <View style={styles.typesContainer}>
                <TouchableOpacity 
                    style={[
                        styles.typeOption, 
                        selectedType === 'Build' && styles.selectedOption,
                        { backgroundColor: selectedType === 'Build' ? '#94A9FF' : '#F0F0F0' }
                    ]}
                    onPress={() => onTypeChange('Build')}
                >
                    <Ionicons 
                        name="add-circle-outline" 
                        size={20} 
                        color={selectedType === 'Build' ? 'white' : '#333'} 
                    />
                    <View style={styles.textContainer}>
                        <Text style={[
                            styles.typeText,
                            selectedType === 'Build' && styles.selectedText
                        ]}>
                            Construir
                        </Text>
                        <Text style={[
                            styles.typeDescription,
                            selectedType === 'Build' && styles.selectedText
                        ]}>
                            Crear un nuevo hábito positivo
                        </Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[
                        styles.typeOption, 
                        selectedType === 'Quit' && styles.selectedOption,
                        { backgroundColor: selectedType === 'Quit' ? '#FF9494' : '#F0F0F0' }
                    ]}
                    onPress={() => onTypeChange('Quit')}
                >
                    <Ionicons 
                        name="remove-circle-outline" 
                        size={20} 
                        color={selectedType === 'Quit' ? 'white' : '#333'} 
                    />
                    <View style={styles.textContainer}>
                        <Text style={[
                            styles.typeText,
                            selectedType === 'Quit' && styles.selectedText
                        ]}>
                            Dejar
                        </Text>
                        <Text style={[
                            styles.typeDescription,
                            selectedType === 'Quit' && styles.selectedText
                        ]}>
                            Eliminar un hábito negativo
                        </Text>
                    </View>
                </TouchableOpacity>
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
    typesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    typeOption: {
        flex: 1,
        flexDirection: 'row',
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    selectedOption: {
        elevation: 3,
    },
    textContainer: {
        marginLeft: 8,
        flex: 1,
    },
    typeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    typeDescription: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    selectedText: {
        color: 'white',
    }
});