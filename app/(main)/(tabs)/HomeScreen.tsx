import React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import HomeHeader from '@components/home/HomeHeader';
import DailyGoalsCard from '@components/home/DailyGoalsCard';
import WeekdaySelector from '@components/home/WeekdaySelector';
import HabitTypeCarousel from '@components/utils/HabitTypeCarousel';
import HabitCardList from '@components/home/HabitCardList';


export default function HomeScreen(){    
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <HomeHeader />
                    <WeekdaySelector />
                    <DailyGoalsCard />
                    <HabitTypeCarousel />
                </View>
                <HabitCardList />
            </View>
        </SafeAreaView>
    );
};

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
        marginBottom: 10,
    },
});
