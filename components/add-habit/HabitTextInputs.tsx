import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface HabitTextInputsProps {
    initialTitle?: string;
    initialDescription?: string;
    onTitleChange?: (title: string) => void;
    onDescriptionChange?: (description: string) => void;
}

export default function HabitTextInputs({ 
    initialTitle = '', 
    initialDescription = '',
    onTitleChange,
    onDescriptionChange
}: HabitTextInputsProps) {
    return (
    <View style={styles.container}>
        <TextInput
            placeholder="Nombre"
            style={styles.name_input}
            placeholderTextColor="#777"
            defaultValue={initialTitle}
            onChangeText={onTitleChange}
        />
        <TextInput
            placeholder="Descripción"
            style={styles.description_input}
            multiline
            placeholderTextColor="#777"
            defaultValue={initialDescription}
            onChangeText={onDescriptionChange}
        />
    </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: 20 },
    name_input: {
        backgroundColor: 'white',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        marginBottom: 12,
        elevation: 2,
    },
    description_input: {
        backgroundColor: 'white',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        elevation: 2,
        height: 80,
    },
});
