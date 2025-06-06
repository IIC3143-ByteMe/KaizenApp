import React from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import ProgressHeader from '@components/progress/ProgressHeader';
import ProgressCalendar from '@components/progress/ProgressCalendar';
import StreakCard from '@components/progress/StreakCard';
import ArchetypeCard from '@components/progress/ArchetypeCard';
import RewardsGrid from '@components/progress/RewardsGrid';

export default function ProgressScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <ProgressHeader />
                    <ProgressCalendar />
                    <StreakCard />
                    <ArchetypeCard />
                    <RewardsGrid />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F6F6F6' },
    scrollContent: { padding: 20, paddingBottom: 100 },
});
