import React, { useState, useEffect } from 'react';
import { 
    Modal, 
    View, 
    ScrollView, 
    StyleSheet, 
    TouchableOpacity, 
    SafeAreaView,
    Alert,
    Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HabitFormHeader from './HabitFormHeader';
import HabitTextInputs from './HabitTextInputs';
import IconColorSelectors from './IconColorSelectors';
import GoalSelector from './GoalSelector';
import TypeSelector from './TypeSelector';
import WeekdayPicker from './WeekdayPicker';
import ReminderPicker from './ReminderPicker';
import HabitTypeSelector from './HabitTypeSelector';
import AddButton from './AddButton';
import { saveHabit, updateHabit } from '@services/habitStorage';
import { HabitTemplate } from '@services/templateStorage';
import { scheduleHabitReminders } from '@services/notificationService';

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
    const [goalTarget, setGoalTarget] = useState<number>(0);
    const [goalType, setGoalType] = useState('Count');
    const [goalUnit, setGoalUnit] = useState('');
    const [group, setGroup] = useState('Healthy');
    const [habitType, setHabitType] = useState('Build');
    const [taskDays, setTaskDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
    const [reminders, setReminders] = useState<string[]>(['08:00']);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setTitle(selectedTemplate?.title || '');
        setDescription(selectedTemplate?.description || '');
        setIcon(selectedTemplate?.icon || '');
        setColor(selectedTemplate?.color || '#A4B1FF');
        setGroup(selectedTemplate?.group || 'General');
        setTaskDays(selectedTemplate?.task_days || []);
        setReminders(selectedTemplate?.reminders || []);
        setGoalTarget(0);
        setGoalUnit('');
    }, [selectedTemplate, visible]);

    useEffect(() => {
        if (goalTarget === 1) {
            setGoalType('Check');
        } else if (goalTarget >= 2 && goalTarget <= 5) {
            setGoalType('Sum');
        } else if (goalTarget > 5) {
            setGoalType('Slide');
        }
    }, [goalTarget]);

    const handleAddHabit = async () => {
        try {
            if (!title.trim()) {
                Alert.alert('Error', 'Por favor ingresa un nombre para el hábito');
                return;
            }

            if (!icon) {
                Alert.alert('Error', 'Por favor selecciona un ícono');
                return;
            }

            if (!goalTarget || !goalUnit) {
                Alert.alert('Error', 'Por favor establece una meta para tu hábito');
                return;
            }

            if (!reminders.length || !taskDays.length) {
                Alert.alert('Error', 'Selecciona días y horarios de recordatorio');
                return;
            }

            setIsSubmitting(true);
            
            const habitData = {
                title,
                description,
                icon,
                color,
                group,
                habitType,
                goalPeriod: 'daily',
                goalType,
                goalTarget,
                goalUnit,
                taskDays,
                reminders
            };
            
            const created = await saveHabit(habitData);

            const reminderIds = await scheduleHabitReminders({
                id: created.id,
                title: created.title,
                time: created.reminders,
                daysOfWeek: created.taskDays
            });

            await updateHabit({ ...created, reminderIds });

            if (onHabitAdded) {
                onHabitAdded();
            }

            onClose();
        } catch (error) {
            console.error('❌ ERROR en handleAddHabit:', error);
            let errorMessage = 'No se pudo guardar el hábito. Inténtalo de nuevo.';
            if (error instanceof Error) {
                errorMessage += ` (${error.message})`;
            }
            Alert.alert('Error', errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#333" />
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <HabitFormHeader isTemplate={!!selectedTemplate} />
                    
                    <HabitTypeSelector 
                        selectedType={habitType}
                        onTypeChange={setHabitType}
                    />
                    
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
                    
                    <TypeSelector 
                        selectedType={group}
                        onTypeChange={setGroup}
                    />
                    
                    <GoalSelector 
                        initialValue={goalTarget}
                        initialUnit={goalUnit}
                        onValueChange={setGoalTarget}
                        onUnitChange={setGoalUnit}
                    />
                    
                    <WeekdayPicker 
                        selectedDays={taskDays}
                        onDaysChange={setTaskDays}
                    />
                    
                    <ReminderPicker 
                        reminders={reminders}
                        onRemindersChange={setReminders}
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