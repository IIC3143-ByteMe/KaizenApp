import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { UNITS } from '@components/add-habit/GoalSelector';

type Props = {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    goalValue: string;
    goalUnit: string;
    completed?: number;
    onPress?: () => void;
};

export default function HabitCard({ 
    title, 
    description, 
    icon, 
    color, 
    goalValue, 
    goalUnit, 
    completed = 0, 
    onPress 
}: Props) {
    const unitData = UNITS.find(unit => unit.id === goalUnit);
    
    const goalValueNum = parseInt(goalValue) || 1;
    const progress = Math.min(100, Math.max(0, (completed / goalValueNum) * 100));
    const isDone = completed >= goalValueNum;

    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={[styles.iconContainer, { backgroundColor: color }]}>
                <FontAwesome5 name={icon as any} size={22} color="#fff" />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description} numberOfLines={1}>{description}</Text>
                </View>
                
                <View style={styles.progressContainer}>
                    <View style={styles.progressBarContainer}>
                        <View 
                            style={[
                                styles.progressBar, 
                                { width: `${progress}%`, backgroundColor: color },
                                isDone && styles.completedProgress
                            ]} 
                        />
                    </View>
                    <Text style={styles.progressText}>
                        {completed}/{goalValue} {unitData?.label || goalUnit}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 2,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    contentContainer: {
        flex: 1,
    },
    textContainer: {
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    progressContainer: {
        marginTop: 4,
    },
    progressBarContainer: {
        height: 6,
        backgroundColor: '#F0F0F0',
        borderRadius: 3,
        marginBottom: 4,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 3,
    },
    progressText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'right',
    },
    completedProgress: {
        backgroundColor: '#4CAF50',
    }
});
