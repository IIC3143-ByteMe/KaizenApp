import React, { useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useFocusEffect } from 'expo-router';
import HomeHeader from '@components/home/HomeHeader';
import DailyGoalsCard from '@components/home/DailyGoalsCard';
import WeekdaySelector from '@components/home/WeekdaySelector';
import HabitTypeCarousel from '@components/utils/HabitTypeCarousel';
import HabitCardList from '@components/home/HabitCardList';
import { getHabits, Habit } from '@services/habitStorage';


export default function HomeScreen() {
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().split('T')[0]
    );
    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    const [goalsData, setGoalsData] = useState({
        totalHabits: 0,
        completedHabits: 0
    });
    const [availableCategories, setAvailableCategories] = useState<string[]>([]);
    const [allHabits, setAllHabits] = useState<Habit[]>([]);

    const loadHabitsAndCalculateGoals = async (date: string = selectedDate) => {
        try {
            const habits = await getHabits();
            setAllHabits(habits);
            
            const uniqueCategories = [...new Set(habits.map(habit => habit.group))].filter(Boolean);
            setAvailableCategories(uniqueCategories);
            
            if (!habits.length) {
                setGoalsData({ totalHabits: 0, completedHabits: 0 });
                return;
            }
            
            const completed = habits.filter(habit => 
                habit.completed && habit.completed >= habit.goalValue
            ).length;
            
            setGoalsData({
                totalHabits: habits.length,
                completedHabits: completed
            });
        } catch (error) {
            console.error('Error loading habits and calculating goals:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadHabitsAndCalculateGoals();
            return () => {};
        }, [])
    );

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
        loadHabitsAndCalculateGoals(date);
    };
    
    const handleFilterChange = (filter: string) => {
        console.log('Filtro seleccionado:', filter);
        setSelectedFilter(filter);
    };

    const handleHabitsUpdate = () => {
        loadHabitsAndCalculateGoals();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <HomeHeader />
                    <WeekdaySelector onDateSelected={handleDateChange} />
                    <DailyGoalsCard 
                        totalHabits={goalsData.totalHabits}
                        completedHabits={goalsData.completedHabits}
                    />
                    <HabitTypeCarousel 
                        selectedFilter={selectedFilter}
                        onFilterChange={handleFilterChange}
                        availableCategories={availableCategories}
                    />
                </View>
                <HabitCardList 
                    selectedDate={selectedDate}
                    selectedFilter={selectedFilter}
                    onHabitsUpdate={handleHabitsUpdate}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { 
        flex: 1, 
        backgroundColor: '#F6F6F6' 
    },
    container: {
        flex: 1,
        padding: 20,
    },
    headerContainer: {
    },
});
