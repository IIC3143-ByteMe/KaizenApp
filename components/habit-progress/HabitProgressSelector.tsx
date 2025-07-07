import React from 'react';
import CheckProgress from './CheckProgress';
import SumProgress from './SumProgress';
import SlideProgress from './SlideProgress';
import { HabitProgressProps } from './HabitProgress';

interface HabitProgressSelectorProps extends HabitProgressProps {
  goalType: string;
}

export default function HabitProgressSelector({
  goalType,
  ...progressProps
}: HabitProgressSelectorProps) {
  switch (goalType) {
    case 'Check':
      return <CheckProgress {...progressProps} />;
    case 'Sum':
      return <SumProgress {...progressProps} />;
    case 'Slide':
      return <SlideProgress {...progressProps} />;
    default:
      return <SlideProgress {...progressProps} />;
  }
}
