import React from 'react';
import { StyleSheet, View } from 'react-native';

export interface HabitProgressProps {
  id: string;
  progress: number;
  goalTarget: number;
  color: string;
  onProgressChange?: (newProgress: number) => void;
  isCompact?: boolean;
}

export default function HabitProgress({ 
  id,
  progress, 
  goalTarget, 
  color, 
  onProgressChange,
  isCompact = false
}: HabitProgressProps) {
  return null;
}
