import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface IconSelectorProps {
  icon: string;
  color: string;
  onPress: () => void;
}

export default function IconSelector({ icon, color, onPress }: IconSelectorProps) {
  const hasIcon = icon && icon.trim().length > 0;
  
  return (
    <TouchableOpacity style={styles.box} onPress={onPress}>
      {hasIcon ? (
        <View style={styles.iconPreview}>
          <View style={[styles.iconContainer, { backgroundColor: color }]}>
            <FontAwesome5 name={icon as any} size={20} color="#fff" />
          </View>
          <Text style={styles.label}>Cambiar ícono</Text>
        </View>
      ) : (
        <View style={styles.noIconPreview}>
          <View style={styles.placeholderCircle}>
            <FontAwesome5 name="plus" size={16} color="#999" />
          </View>
          <Text style={styles.label}>Seleccionar ícono</Text>
        </View>
      )}
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
    justifyContent: 'center',
  },
  iconPreview: {
    alignItems: 'center',
  },
  noIconPreview: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  label: {
    fontWeight: '600',
    color: '#555',
    marginTop: 8,
  },
});