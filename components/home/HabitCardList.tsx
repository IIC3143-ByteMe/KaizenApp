import React from 'react';
import { FlatList, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import HabitCard from '@components/home/HabitCard';

const habits = [
    { id: '1', title: "Estudiar", completed: 0, total: 60 },
    { id: '2', title: "Meditar", completed: 10, total: 10 },
    { id: '3', title: "Salir a caminar", completed: 20, total: 20 },
    { id: '4', title: "Hacer KaizenApp", completed: 10, total: 100 },
    { id: '5', title: "Entrega 2", completed: 100, total: 100 },
    { id: '6', title: "Leer un libro", completed: 30, total: 30 },
    { id: '7', title: "Practicar deporte", completed: 15, total: 15 },
    { id: '8', title: "Cocinar", completed: 5, total: 5 },
    { id: '9', title: "Aprender algo nuevo", completed: 25, total: 25 },
    { id: '10', title: "Hacer ejercicio", completed: 40, total: 40 }
];

export default function HabitCardContainer() {
    const router = useRouter();

    return (
        <FlatList
            data={habits}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <HabitCard 
                    title={item.title}
                    completed={item.completed}
                    total={item.total}
                    onPress={() => router.push(`/(main)/habit/${item.id}`)}
                />
            )}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: { 

    }
});
