import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Modal, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

interface ReminderPickerProps {
    reminders: string[];
    onRemindersChange: (reminders: string[]) => void;
}

export default function ReminderPicker({ reminders, onRemindersChange }: ReminderPickerProps) {
    const [remindersList, setRemindersList] = useState<string[]>([]);
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date());
    
    useEffect(() => {
        if (reminders && Array.isArray(reminders)) {
            setRemindersList(reminders);
        }
    }, [reminders]);

    const formatTimeString = (date: Date): string => {
        return date.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
    };

    const showTimePicker = () => {
        if (Platform.OS === 'ios') {
            setIsModalVisible(true);
        } else {
            setIsPickerVisible(true);
        }
    };

    const hideTimePicker = () => {
        setIsPickerVisible(false);
        setIsModalVisible(false);
    };

    const handleTimeChange = (event: any, selected?: Date) => {
        if (Platform.OS === 'android') {
            hideTimePicker();
        }
        
        if (selected && event.type !== 'dismissed') {
            setSelectedTime(selected);
            
            if (Platform.OS === 'android') {
                const timeString = formatTimeString(selected);
                addReminder(timeString);
            }
        }
    };

    const confirmIOSTime = () => {
        const timeString = formatTimeString(selectedTime);
        addReminder(timeString);
        hideTimePicker();
    };

    const addReminder = (timeString: string) => {
        if (!remindersList.includes(timeString)) {
            const newList = [...remindersList, timeString].sort();
            setRemindersList(newList);
            onRemindersChange(newList);
        }
    };

    const removeReminder = (timeString: string) => {
        const newList = remindersList.filter(r => r !== timeString);
        setRemindersList(newList);
        onRemindersChange(newList);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Recordatorios</Text>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={showTimePicker}
                >
                    <Ionicons name="add" size={22} color="#fff" />
                </TouchableOpacity>
            </View>

            {remindersList.length > 0 ? (
                <View style={styles.remindersList}>
                    {remindersList.map((time) => (
                        <View key={time} style={styles.reminderItem}>
                            <Text style={styles.reminderTime}>{time}</Text>
                            <TouchableOpacity
                                onPress={() => removeReminder(time)}
                                style={styles.removeButton}
                            >
                                <Ionicons name="close" size={16} color="#666" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            ) : (
                <Text style={styles.emptyText}>Agrega recordatorios para este hábito</Text>
            )}

            {isPickerVisible && Platform.OS === 'android' && (
                <DateTimePicker
                    value={selectedTime}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={handleTimeChange}
                />
            )}

            {Platform.OS === 'ios' && (
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="slide"
                >
                    <SafeAreaView style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <TouchableOpacity onPress={hideTimePicker}>
                                    <Text style={styles.cancelButton}>Cancelar</Text>
                                </TouchableOpacity>
                                <Text style={styles.modalTitle}>Seleccionar hora</Text>
                                <TouchableOpacity onPress={confirmIOSTime}>
                                    <Text style={styles.confirmButton}>Aceptar</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={styles.pickerContainer}>
                                <DateTimePicker
                                    value={selectedTime}
                                    mode="time"
                                    display="spinner"
                                    onChange={handleTimeChange}
                                    style={styles.iosPicker}
                                    is24Hour={true}
                                    locale="es-ES"
                                    textColor="#000000"
                                    themeVariant="light"
                                />
                            </View>
                        </View>
                    </SafeAreaView>
                </Modal>
            )}
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
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#444',
    },
    addButton: {
        backgroundColor: '#94A9FF',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    remindersList: {
        gap: 10,
    },
    reminderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    reminderTime: {
        fontSize: 16,
        color: '#333',
    },
    removeButton: {
        padding: 4,
    },
    emptyText: {
        color: '#999',
        textAlign: 'center',
        paddingVertical: 12,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#f0f0f0',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    cancelButton: {
        color: '#999',
        fontSize: 16,
    },
    confirmButton: {
        color: '#94A9FF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pickerContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginHorizontal: -10,
    },
    iosPicker: {
        height: 200,
        color: '#000000',
    }
});