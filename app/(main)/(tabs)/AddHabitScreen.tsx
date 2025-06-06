import React from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import HabitFormHeader from '@components/add-habit/HabitFormHeader';
import HabitTextInputs from '@components/add-habit/HabitTextInputs';
import IconSoundSelectors from '@components/add-habit/IconSoundSelectors';
import HabitScheduleCard from '@components/add-habit/HabitScheduleCard';
import AddButton from '@components/add-habit/AddButton';

export default function AddHabitScreen(){
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <HabitFormHeader />
                    <HabitTextInputs />
                    <IconSoundSelectors />
                    <HabitScheduleCard />
                    <AddButton />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F6F6F6' },
    scrollContent: { padding: 20, paddingBottom: 100 },
});
