import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import IconSelector from './IconSelector';
import ColorSelector from './ColorSelector';
import IconModal, { ICONS } from './IconModal';
import ColorModal, { COLORS } from './ColorModal';

interface IconColorSelectorsProps {
  initialIcon?: string;
  initialColor?: string;
  onIconChange?: (icon: string) => void;
  onColorChange?: (color: string) => void;
}

export default function IconColorSelectors({ 
  initialIcon = '', 
  initialColor = '#A4B1FF', 
  onIconChange, 
  onColorChange 
}: IconColorSelectorsProps) {
  const [selectedIcon, setSelectedIcon] = useState(initialIcon);
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [iconModalVisible, setIconModalVisible] = useState(false);
  const [colorModalVisible, setColorModalVisible] = useState(false);

  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon);
    if (onIconChange) onIconChange(icon);
    setIconModalVisible(false);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    if (onColorChange) onColorChange(color);
    setColorModalVisible(false);
  };

  return (
    <View style={styles.row}>
      <IconSelector 
        icon={selectedIcon} 
        color={selectedColor} 
        onPress={() => setIconModalVisible(true)} 
      />
      
      <ColorSelector 
        color={selectedColor} 
        onPress={() => setColorModalVisible(true)} 
      />

      <IconModal 
        visible={iconModalVisible}
        selectedIcon={selectedIcon}
        onClose={() => setIconModalVisible(false)}
        onSelectIcon={handleIconSelect}
      />
      
      <ColorModal 
        visible={colorModalVisible}
        selectedColor={selectedColor}
        onClose={() => setColorModalVisible(false)}
        onSelectColor={handleColorSelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20 
  },
});
