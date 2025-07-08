import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getMonthCompletions } from '@services/dailyCompletionsService';

const DAYS_OF_WEEK = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

interface DayData {
  date: string;
  day: number;
  percentage: number;
  isCurrentMonth: boolean;
}

interface ProgressCalendarProps {
  onDaySelected?: (date: string) => void;
}

export default function ProgressCalendar({ onDaySelected }: ProgressCalendarProps) {
    const [selectedMonth, setSelectedMonth] = useState<string>(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    });
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [calendarDays, setCalendarDays] = useState<DayData[][]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [monthCompletions, setMonthCompletions] = useState<{[date: string]: number}>({});
    
    useEffect(() => {
        generateCalendarDays(selectedMonth);
    }, [selectedMonth]);
    
    useEffect(() => {
        loadMonthCompletions(selectedMonth);
    }, [selectedMonth]);
    
    const loadMonthCompletions = async (month: string) => {
        setIsLoading(true);
        try {
            const completions = await getMonthCompletions(month);
            
            const completionMap: {[date: string]: number} = {};
            completions.forEach(completion => {
                if (completion.date) {
                    completionMap[completion.date] = completion.overall_percentage;
                }
            });
            
            setMonthCompletions(completionMap);
        } catch (error) {
            console.error('Error al cargar completions del mes:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const generateCalendarDays = (monthStr: string) => {
        const [year, month] = monthStr.split('-').map(Number);
        
        const firstDay = new Date(year, month - 1, 1);
        const lastDay = new Date(year, month, 0);

        let firstDayOfWeek = firstDay.getDay() - 1;
        if (firstDayOfWeek < 0) firstDayOfWeek = 6;
        
        const daysInMonth = lastDay.getDate();
        
        const prevMonthLastDay = new Date(year, month - 1, 0).getDate();
        
        const weeks: DayData[][] = [];
        let currentWeek: DayData[] = [];
        
        for (let i = 0; i < firstDayOfWeek; i++) {
            const prevMonthDay = prevMonthLastDay - firstDayOfWeek + i + 1;
            const prevMonth = month === 1 ? 12 : month - 1;
            const prevYear = month === 1 ? year - 1 : year;
            const date = `${prevYear}-${String(prevMonth).padStart(2, '0')}-${String(prevMonthDay).padStart(2, '0')}`;
            
            currentWeek.push({
                date,
                day: prevMonthDay,
                percentage: 0,
                isCurrentMonth: false
            });
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            currentWeek.push({
                date,
                day,
                percentage: 0,
                isCurrentMonth: true
            });
            
            if (currentWeek.length === 7 || day === daysInMonth) {
                if (currentWeek.length < 7) {
                    const nextMonth = month === 12 ? 1 : month + 1;
                    const nextYear = month === 12 ? year + 1 : year;
                    
                    for (let i = 1; currentWeek.length < 7; i++) {
                        const nextMonthDate = `${nextYear}-${String(nextMonth).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
                        
                        currentWeek.push({
                            date: nextMonthDate,
                            day: i,
                            percentage: 0,
                            isCurrentMonth: false
                        });
                    }
                }
                
                weeks.push([...currentWeek]);
                currentWeek = [];
            }
        }
        
        setCalendarDays(weeks);
    };
    
    const handleDayPress = (day: DayData) => {
        if (day.isCurrentMonth) {
            setSelectedDay(day.date);
            if (onDaySelected) {
                onDaySelected(day.date);
            }
        }
    };
    
    const getCompletionColor = (date: string) => {
        if (!monthCompletions[date]) return '#DDD';
        
        const percentage = monthCompletions[date];
        
        if (percentage >= 1) return '#4CAF50';
        if (percentage >= 0.75) return '#8BC34A';
        if (percentage >= 0.5) return '#FFC107';
        if (percentage >= 0.25) return '#FF9800';
        return '#FF5252';
    };
    
    const getMonthName = (monthStr: string) => {
        const [year, month] = monthStr.split('-').map(Number);
        const date = new Date(year, month - 1, 1);
        return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    };
    
    const navigateMonth = (direction: 'prev' | 'next') => {
        const [year, month] = selectedMonth.split('-').map(Number);
        
        let newMonth: number, newYear: number;
        
        if (direction === 'prev') {
            newMonth = month === 1 ? 12 : month - 1;
            newYear = month === 1 ? year - 1 : year;
        } else {
            newMonth = month === 12 ? 1 : month + 1;
            newYear = month === 12 ? year + 1 : year;
        }
        
        setSelectedMonth(`${newYear}-${String(newMonth).padStart(2, '0')}`);
    };
    
    return (
        <View style={styles.card}>
            <View style={styles.monthSelector}>
                <TouchableOpacity onPress={() => navigateMonth('prev')} style={styles.monthButton}>
                    <Text style={styles.monthButtonText}>{'<'}</Text>
                </TouchableOpacity>
                
                <Text style={styles.monthTitle}>{getMonthName(selectedMonth)}</Text>
                
                <TouchableOpacity onPress={() => navigateMonth('next')} style={styles.monthButton}>
                    <Text style={styles.monthButtonText}>{'>'}</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.headerRow}>
                {DAYS_OF_WEEK.map((d, i) => (
                    <Text key={i} style={styles.dayLabel}>{d}</Text>
                ))}
            </View>
            
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#A4B1FF" />
                    <Text style={styles.loadingText}>Cargando datos...</Text>
                </View>
            ) : (
                calendarDays.map((week, weekIndex) => (
                    <View key={weekIndex} style={styles.weekRow}>
                        {week.map((day, dayIndex) => (
                            <TouchableOpacity
                                key={dayIndex}
                                onPress={() => handleDayPress(day)}
                                disabled={!day.isCurrentMonth}
                                style={[
                                    styles.dayCircle,
                                    !day.isCurrentMonth && styles.otherMonthDay,
                                    selectedDay === day.date && styles.selectedDay
                                ]}
                            >
                                <View 
                                    style={[
                                        styles.circle,
                                        { backgroundColor: day.isCurrentMonth ? getCompletionColor(day.date) : '#EEE' }
                                    ]}
                                />
                                <Text 
                                    style={[
                                        styles.dayNumber,
                                        !day.isCurrentMonth && styles.otherMonthDayText,
                                        selectedDay === day.date && styles.selectedDayText
                                    ]}
                                >
                                    {day.day}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        marginBottom: 20,
    },
    monthSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    monthButton: {
        padding: 8,
    },
    monthButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#A4B1FF',
    },
    monthTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textTransform: 'capitalize',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    weekRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    dayLabel: { 
        fontSize: 12, 
        fontWeight: '600', 
        color: '#888',
        width: 32,
        textAlign: 'center',
    },
    dayCircle: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    circle: {
        position: 'absolute',
        width: 28,
        height: 28,
        borderRadius: 14,
    },
    dayNumber: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
        zIndex: 1,
    },
    otherMonthDay: {
        opacity: 0.4,
        pointerEvents: 'none',
    },
    otherMonthDayText: {
        color: '#AAA',
    },
    selectedDay: {
        borderWidth: 2,
        borderColor: '#A4B1FF',
        borderRadius: 16,
    },
    selectedDayText: {
        fontWeight: 'bold',
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
    },
    loadingText: {
        marginTop: 8,
        color: '#666',
    },
});
