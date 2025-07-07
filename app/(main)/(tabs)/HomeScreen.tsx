import React, { useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useFocusEffect } from 'expo-router';
import HomeHeader from '@components/home/HomeHeader';
import DailyGoalsCard from '@components/home/DailyGoalsCard';
import WeekdaySelector from '@components/home/WeekdaySelector';
import HabitTypeCarousel from '@components/utils/HabitTypeCarousel';
import HabitCardList from '@components/home/HabitCardList';
import { getHabits, Habit } from '@services/habitStorage';
import { getDailyCompletions } from '@services/dailyCompletionsService';


export default function HomeScreen() {
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().split('T')[0]
    );
    const [selectedDayCode, setSelectedDayCode] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    const [goalsData, setGoalsData] = useState({
        totalHabits: 0,
        completedHabits: 0
    });
    const [availableCategories, setAvailableCategories] = useState<string[]>([]);
    const [allHabits, setAllHabits] = useState<Habit[]>([]);

    const loadHabitsAndCalculateGoals = async (date: string = selectedDate, dayCode: string = selectedDayCode) => {
        try {
            const habits = await getHabits();
            setAllHabits(habits);
            
            const uniqueCategories = [...new Set(habits.map(habit => habit.group))].filter(Boolean);
            setAvailableCategories(uniqueCategories);
            
            const habitsForDay = habits.filter(habit => 
                habit.taskDays && habit.taskDays.includes(dayCode)
            );
            
            if (!habitsForDay.length) {
                setGoalsData({ totalHabits: 0, completedHabits: 0 });
                return;
            }
            
            const dailyCompletions = await getDailyCompletions();
            if (dailyCompletions) {
                const completedCount = dailyCompletions.completions.filter(
                    completion => completion.completed
                ).length;
                
                setGoalsData({
                    totalHabits: habitsForDay.length,
                    completedHabits: completedCount
                });
                
                if (completedCount === habitsForDay.length && completedCount > 0) {
                    console.log('🎯 Todos los hábitos del día completados!');
                }
            } else {
                setGoalsData({
                    totalHabits: habitsForDay.length,
                    completedHabits: 0
                });
            }
        } catch (error) {
            console.error('Error loading habits and calculating goals:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (selectedDayCode) {
                loadHabitsAndCalculateGoals();
            }
            return () => {};
        }, [selectedDayCode])
    );

    const handleDateChange = (date: string, dayCode: string) => {
        setSelectedDate(date);
        setSelectedDayCode(dayCode);
        loadHabitsAndCalculateGoals(date, dayCode);
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
                    selectedDayCode={selectedDayCode}
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
