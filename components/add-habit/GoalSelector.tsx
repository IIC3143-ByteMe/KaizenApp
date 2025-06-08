import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, FlatList, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export const UNITS = [
    { id: 'times', label: 'veces', icon: 'redo' },
    { id: 'minutes', label: 'minutos', icon: 'clock' },
    { id: 'hours', label: 'horas', icon: 'hourglass' },
    { id: 'steps', label: 'pasos', icon: 'shoe-prints' },
    { id: 'ml', label: 'ml', icon: 'tint' },
    { id: 'km', label: 'km', icon: 'road' },
    { id: 'g', label: 'gr', icon: 'weight' },
];

interface GoalSelectorProps {
    initialValue?: number;
    initialUnit?: string;
    onValueChange?: (value: number) => void;
    onUnitChange?: (unit: string) => void;
}

export default function GoalSelector({
    initialValue = 0,
    initialUnit = '',
    onValueChange,
    onUnitChange
}: GoalSelectorProps) {
    const [goalValue, setGoalValue] = useState(initialValue?.toString() || '');
    const [selectedUnit, setSelectedUnit] = useState(initialUnit);
    const [unitsModalVisible, setUnitsModalVisible] = useState(false);
    
    const selectedUnitData = UNITS.find(unit => unit.id === selectedUnit);

    const handleValueChange = (value: string) => {
        if (/^\d*$/.test(value)) {
            setGoalValue(value);
            if (onValueChange) {
                const numValue = value === '' ? 0 : parseInt(value, 10);
                onValueChange(numValue);
            }
        }
    };

    const handleUnitSelect = (unitId: string) => {
        setSelectedUnit(unitId);
        if (onUnitChange) onUnitChange(unitId);
        setUnitsModalVisible(false);
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Meta diaria</Text>
        <View style={styles.inputRow}>
            <TextInput
                style={styles.valueInput}
                placeholder="0"
                keyboardType="number-pad"
                value={goalValue}
                onChangeText={handleValueChange}
                placeholderTextColor="#999"
            />
            
            <TouchableOpacity 
                style={styles.unitSelector}
                onPress={() => setUnitsModalVisible(true)}
            >
            {selectedUnitData ? (
                <View style={styles.selectedUnitContainer}>
                <FontAwesome5 name={selectedUnitData.icon as any} size={14} color="#555" style={styles.unitIcon} />
                <Text style={styles.unitLabel}>{selectedUnitData.label}</Text>
                </View>
            ) : (
                <Text style={styles.unitPlaceholder}>Seleccionar unidad</Text>
            )}
            <FontAwesome5 name="chevron-down" size={12} color="#777" />
            </TouchableOpacity>
        </View>

        <Modal
            visible={unitsModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setUnitsModalVisible(false)}
        >
            <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Seleccionar unidad</Text>
                <TouchableOpacity onPress={() => setUnitsModalVisible(false)}>
                    <FontAwesome5 name="times" size={20} color="#333" />
                </TouchableOpacity>
                </View>
                
                <FlatList
                data={UNITS}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                    style={[
                        styles.unitItem,
                        selectedUnit === item.id && styles.selectedUnitItem
                    ]} 
                    onPress={() => handleUnitSelect(item.id)}
                    >
                    <FontAwesome5 
                        name={item.icon as any} 
                        size={16} 
                        color={selectedUnit === item.id ? "#fff" : "#555"} 
                        style={styles.unitItemIcon}
                    />
                    <Text 
                        style={[
                        styles.unitItemText,
                        selectedUnit === item.id && styles.selectedUnitItemText
                        ]}
                    >
                        {item.label}
                    </Text>
                    </TouchableOpacity>
                )}
                />
            </View>
            </SafeAreaView>
        </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: '#444',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    valueInput: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        marginRight: 10,
    },
    unitSelector: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    unitPlaceholder: {
        color: '#999',
        fontSize: 16,
    },
    selectedUnitContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    unitIcon: {
        marginRight: 8,
    },
    unitLabel: {
        fontSize: 16,
        color: '#444',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 16,
        width: '80%',
        maxHeight: '70%',
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    unitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginBottom: 8,
    },
    selectedUnitItem: {
        backgroundColor: '#94A9FF',
    },
    unitItemIcon: {
        marginRight: 12,
    },
    unitItemText: {
        fontSize: 16,
        color: '#444',
    },
    selectedUnitItemText: {
        color: '#fff',
        fontWeight: '500',
    },
});