import React from 'react';
import { 
    Modal, 
    View, 
    ScrollView, 
    StyleSheet, 
    TouchableOpacity, 
    SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HabitFormHeader from './HabitFormHeader';
import HabitTextInputs from './HabitTextInputs';
import IconColorSelectors from './IconColorSelectors';
import HabitScheduleCard from './HabitScheduleCard';
import AddButton from './AddButton';

interface AddHabitModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function AddHabitModal({ visible, onClose }: AddHabitModalProps) {
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
                    <HabitFormHeader />
                    <HabitTextInputs />
                    <IconColorSelectors />
                    <HabitScheduleCard />
                    <AddButton />
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