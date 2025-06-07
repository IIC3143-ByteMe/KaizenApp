import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ColorSelectorProps {
  color: string;
  onPress: () => void;
}

export default function ColorSelector({ color, onPress }: ColorSelectorProps) {
  return (
    <TouchableOpacity style={styles.box} onPress={onPress}>
      <View style={styles.colorPreview}>
        <View style={[styles.colorSample, { backgroundColor: color }]} />
        <Text style={styles.label}>Cambiar color</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
  },
  colorPreview: {
    alignItems: 'center',
  },
  colorSample: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  label: {
    fontWeight: '600',
    color: '#555',
    marginTop: 8,
  },
});