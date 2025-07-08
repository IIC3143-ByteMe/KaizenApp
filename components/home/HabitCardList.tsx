import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import HabitCard from '@components/home/HabitCard';
import { getHabits, Habit, fetchHabitsFromBackend } from '@services/habitStorage';
import { fetchDailyCompletionsFromBackend } from '@services/dailyCompletionsService';

interface HabitCardListProps {
  selectedDate?: string;
  selectedDayCode?: string;
  selectedFilter?: string;
  onHabitsUpdate?: () => void;
}

export default function HabitCardList({ 
    selectedDate, 
    selectedDayCode,
    selectedFilter = 'all',
    onHabitsUpdate 
}: HabitCardListProps) {
    const router = useRouter();
    const [habits, setHabits] = useState<Habit[]>([]);
    const [filteredHabits, setFilteredHabits] = useState<Habit[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            loadHabits();
            return () => {};
        }, [selectedDate, selectedFilter])
    );

    useEffect(() => {
        filterHabits();
    }, [habits, selectedFilter, selectedDate]);

    const loadHabits = async () => {
        try {
            setLoading(true);
            const savedHabits = await getHabits();
            setHabits(savedHabits);
            
            if (onHabitsUpdate) {
                onHabitsUpdate();
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const filterHabits = () => {
        let filtered = habits;
        
        if (selectedDayCode) {
            filtered = filtered.filter(habit => 
                habit.taskDays && habit.taskDays.includes(selectedDayCode)
            );
        }
        
        if (selectedFilter !== 'all') {
            filtered = filtered.filter(habit => habit.group === selectedFilter);
        }
        
        setFilteredHabits(filtered);
        
    };

    const onRefresh = async () => {
        try {
            setRefreshing(true);
            
            await Promise.all([
                fetchHabitsFromBackend().then(backendHabits => {
                    setHabits(backendHabits);
                }),
                fetchDailyCompletionsFromBackend()
            ]);
            
            if (onHabitsUpdate) {
                onHabitsUpdate();
            }
            
        } catch (error) {
        } finally {
            setRefreshing(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#94A9FF" />
            </View>
        );
    }

    if (filteredHabits.length === 0) {
        return (
            <ScrollView 
                contentContainerStyle={styles.emptyScrollContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#94A9FF']}
                        tintColor="#94A9FF"
                    />
                }
            >
                <View style={styles.emptyContainer}>
                    {habits.length === 0 ? (
                        <>
                            <Text style={styles.emptyText}>No tienes hábitos guardados</Text>
                            <Text style={styles.emptySuggestion}>
                                Agrega uno nuevo desde la pestaña "Agregar"
                            </Text>
                        </>
                    ) : (
                        <>
                            <Text style={styles.emptyText}>
                                No hay hábitos en la categoría "{selectedFilter}"
                            </Text>
                            <Text style={styles.emptySuggestion}>
                                Selecciona otra categoría o agrega un nuevo hábito
                            </Text>
                        </>
                    )}
                    <Text style={styles.pullToRefreshHint}>
                        Desliza hacia abajo para buscar hábitos en la nube
                    </Text>
                </View>
            </ScrollView>
        );
    }

    return (
        <FlatList
            data={filteredHabits}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <HabitCard 
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                    color={item.color}
                    goalTarget={item.goalTarget}
                    goalUnit={item.goalUnit}
                    goalType={item.goalType}
                    date={selectedDate}
                    onPress={() => router.push(`/(main)/habit/${item.id}?date=${selectedDate || ''}`)}
                />
            )}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#94A9FF']}
                    tintColor="#94A9FF"
                />
            }
        />
    );
};

const styles = StyleSheet.create({
    listContainer: { 
        padding: 4,
        paddingBottom: 100,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyScrollContainer: {
        flexGrow: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        minHeight: 400,
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
        marginBottom: 24,
    },
    pullToRefreshHint: {
        fontSize: 14,
        color: '#94A9FF',
        textAlign: 'center',
        marginTop: 16,
        fontStyle: 'italic',
    }
});
