import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import HabitCard from '@components/home/HabitCard';
import { getHabits, Habit } from '@services/habitStorage';

export default function HabitCardList() {
    const router = useRouter();
    const [habits, setHabits] = useState<Habit[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHabits();
    }, []);

    const loadHabits = async () => {
        try {
            setLoading(true);
            const savedHabits = await getHabits();
            setHabits(savedHabits);
        } catch (error) {
            console.error('Error loading habits:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#94A9FF" />
            </View>
        );
    }

    if (habits.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No tienes hábitos guardados</Text>
                <Text style={styles.emptySuggestion}>
                    Agrega uno nuevo desde la pestaña "Agregar"
                </Text>
            </View>
        );
    }

    return (
        <FlatList
            data={habits}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <HabitCard 
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                    color={item.color}
                    goalValue={item.goalValue}
                    goalUnit={item.goalUnit}
                    completed={item.completed || 0}
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
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    emptySuggestion: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    }
});
