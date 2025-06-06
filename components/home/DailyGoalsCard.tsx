import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DailyGoalsCard(){
  return (
    <View style={styles.card}>
      <View style={styles.circle}>
        <View style={styles.progressStub} />
      </View>
      <View>
        <Text style={styles.title}>Metas diarias</Text>
        <Text style={styles.subtitle}>¡Sigue así!</Text>
        <Text style={styles.progress}>3/5 hábitos cumplidos</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressStub: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#CBD3FF',
  },
  title: { fontWeight: 'bold', fontSize: 16 },
  subtitle: { fontSize: 14, marginTop: 4 },
  progress: { marginTop: 4, color: '#777', fontWeight: '600' },
});