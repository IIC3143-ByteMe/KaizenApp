import React, { useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import HabitTemplateItem from '@components/add-habit/HabitTemplateItem';
import AddHabitModal, { HabitTemplate } from '@components/add-habit/AddHabitModal';
import HabitTypeCarousel from '@components/utils/HabitTypeCarousel';

const HABIT_TEMPLATES = [
    {
        id: '1',
        title: 'Ejercicio diario',
        description: 'Hacer ejercicio durante 30 minutos al día para mejorar tu salud',
        icon: 'running',
        color: '#A4B1FF',
    },
    {
        id: '2',
        title: 'Leer un libro',
        description: 'Leer por 20 minutos todos los días para expandir tu conocimiento',
        icon: 'book',
        color: '#FFB6A4',
    },
    {
        id: '3',
        title: 'Meditación',
        description: 'Meditar por 10 minutos cada mañana para mejorar tu bienestar mental',
        icon: 'brain',
        color: '#A4FFDA',
    },
    {
        id: '4',
        title: 'Escribir un diario',
        description: 'Reflexiona sobre tu día escribiendo en un diario',
        icon: 'pen',
        color: '#FFC8A4',
    },
    {
        id: '5',
        title: 'Beber agua',
        description: 'Beber 8 vasos de agua al día para mantenerte hidratado',
        icon: 'water',
        color: '#A4D6FF',
    },
    {
        id: '6',
        title: 'Aprender un idioma',
        description: 'Practicar un nuevo idioma durante 15 minutos',
        icon: 'language',
        color: '#D1A4FF',
    },
    {
        id: '7',
        title: 'Desconectar de pantallas',
        description: 'Pasar 1 hora sin dispositivos electrónicos antes de dormir',
        icon: 'power-off',
        color: '#FFB4A4',
    },
    {
        id: '8',
        title: 'Cocinar en casa',
        description: 'Preparar al menos una comida casera al día',
        icon: 'utensils',
        color: '#A4FFB1',
    },
];

export default function AddHabitScreen() {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<HabitTemplate | undefined>(undefined);

    const handleTemplatePress = (template: HabitTemplate) => {
        setSelectedTemplate(template);
        setModalVisible(true);
    };

    const handleCreateNew = () => {
        setSelectedTemplate(undefined);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setTimeout(() => setSelectedTemplate(undefined), 300);
    };

    const handleHabitAdded = () => {
        router.replace('/(main)/(tabs)');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Plantillas de hábitos</Text>
                    <Text style={styles.subtitle}>Selecciona un hábito para comenzar o crea uno nuevo</Text>
                </View>

                <HabitTypeCarousel />

                <FlatList
                    data={HABIT_TEMPLATES}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <HabitTemplateItem
                            title={item.title}
                            description={item.description}
                            icon={item.icon}
                            color={item.color}
                            onPress={() => handleTemplatePress(item)}
                        />
                    )}
                />

                <TouchableOpacity 
                    style={styles.floatingButton}
                    onPress={handleCreateNew}
                >
                    <Ionicons name="add" size={28} color="#fff" />
                </TouchableOpacity>
            </View>

            <AddHabitModal 
                visible={modalVisible} 
                onClose={handleCloseModal} 
                selectedTemplate={selectedTemplate}
                onHabitAdded={handleHabitAdded}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#F6F6F6' 
    },
    header: {
        padding: 20,
        paddingBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    listContent: { 
        padding: 20,
        paddingTop: 0,
        paddingBottom: 100,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#94A9FF',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
    },
});
