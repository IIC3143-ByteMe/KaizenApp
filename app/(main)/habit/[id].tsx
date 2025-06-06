import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function HabitDetailScreen() {
    const { id } = useLocalSearchParams();
  
  return (
      <SafeAreaView style={styles.safeArea}>
          <Text>Habit Detail Screen for ID: {id}</Text>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F6F6F6' },

});