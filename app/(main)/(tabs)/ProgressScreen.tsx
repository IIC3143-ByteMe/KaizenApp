import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import ProgressHeader from '@components/progress/ProgressHeader';
import ProgressCalendar from '@components/progress/ProgressCalendar';
import StreakCard from '@components/progress/StreakCard';
import DayDetails from '@components/progress/DayDetails';

export default function ProgressScreen() {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [showDayDetails, setShowDayDetails] = useState(false);

    const handleDaySelected = (date: string) => {
        setSelectedDate(date);
        setShowDayDetails(true);
    };

    const handleDetailsLoaded = (hasData: boolean) => {};

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <ProgressHeader />
                    <StreakCard />
                    <ProgressCalendar onDaySelected={handleDaySelected} />
                    
                    {selectedDate && showDayDetails && (
                        <View style={styles.dayDetailsCard}>
                            <DayDetails 
                                date={selectedDate} 
                                onDetailsLoaded={handleDetailsLoaded}
                            />
                        </View>
                    )}                    
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#F6F6F6' 
    },
    scrollContent: { 
        padding: 20, 
        paddingBottom: 100 
    },
    dayDetailsCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        marginBottom: 20,
    }
});
