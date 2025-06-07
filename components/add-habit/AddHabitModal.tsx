import React, { useState } from 'react';
import { 
    Modal, 
    View, 
    ScrollView, 
    StyleSheet, 
    TouchableOpacity, 
    SafeAreaView,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HabitFormHeader from './HabitFormHeader';
import HabitTextInputs from './HabitTextInputs';
import IconColorSelectors from './IconColorSelectors';
import HabitScheduleCard from './HabitScheduleCard';
import AddButton from './AddButton';
import { saveHabit } from '@services/habitStorage';

export interface HabitTemplate {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
}

interface AddHabitModalProps {
    visible: boolean;
    onClose: () => void;
    selectedTemplate?: HabitTemplate;
    onHabitAdded?: () => void;
}

export default function AddHabitModal({ visible, onClose, selectedTemplate, onHabitAdded }: AddHabitModalProps) {
    const [title, setTitle] = useState(selectedTemplate?.title || '');
    const [description, setDescription] = useState(selectedTemplate?.description || '');
    const [icon, setIcon] = useState(selectedTemplate?.icon || '');
    const [color, setColor] = useState(selectedTemplate?.color || '#A4B1FF');
    const [goalValue, setGoalValue] = useState('');
    const [goalUnit, setGoalUnit] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddHabit = async () => {
        // Validación básica
        if (!title.trim()) {
            Alert.alert('Error', 'Por favor ingresa un nombre para el hábito');
            return;
        }

        if (!icon) {
            Alert.alert('Error', 'Por favor selecciona un ícono');
            return;
        }

        if (!goalValue || !goalUnit) {
            Alert.alert('Error', 'Por favor establece una meta para tu hábito');
            return;
        }

        try {
            setIsSubmitting(true);
            
            // Guardar el hábito
            await saveHabit({
                title,
                description,
                icon,
                color,
                goalValue,
                goalUnit
            });

            // Notificar que se ha añadido un hábito
            if (onHabitAdded) {
                onHabitAdded();
            }

            // Cerrar el modal
            onClose();
        } catch (error) {
            console.error('Error al guardar el hábito:', error);
            Alert.alert('Error', 'No se pudo guardar el hábito. Inténtalo de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#333" />
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <HabitFormHeader isTemplate={!!selectedTemplate} />
                    <HabitTextInputs 
                        initialTitle={selectedTemplate?.title}
                        initialDescription={selectedTemplate?.description}
                        onTitleChange={setTitle}
                        onDescriptionChange={setDescription}
                    />
                    <IconColorSelectors 
                        initialIcon={selectedTemplate?.icon}
                        initialColor={selectedTemplate?.color}
                        onIconChange={setIcon}
                        onColorChange={setColor}
                    />
                    <HabitScheduleCard 
                        onGoalValueChange={setGoalValue}
                        onGoalUnitChange={setGoalUnit}
                    />
                    <AddButton 
                        onPress={handleAddHabit}
                        disabled={isSubmitting}
                    />
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#F6F6F6' 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 16,
    },
    closeButton: {
        padding: 8,
    },
    scrollContent: { 
        padding: 20, 
        paddingBottom: 100 
    },
});