import type { DateString, Habit } from '@/types';

export function getTodayUTC(): DateString {
  return new Date().toISOString().split('T')[0];
}

export function getDateUTC(daysAgo: number): DateString {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

export function getLast7Days(): DateString[] {
  const days: DateString[] = [];
  for (let i = 6; i >= 0; i--) {
    days.push(getDateUTC(i));
  }
  return days;
}

export function calculateStreak(habit: Habit): number {
  const today = getTodayUTC();
  let streak = 0;
  let currentDate = new Date(today);
  
  // Check if today is completed, if not, start from yesterday
  if (!habit.completions[today]) {
    currentDate.setUTCDate(currentDate.getUTCDate() - 1);
  }
  
  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0];
    if (habit.completions[dateStr]) {
      streak++;
      currentDate.setUTCDate(currentDate.getUTCDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
}

export function formatDate(dateStr: DateString): string {
  const date = new Date(dateStr + 'T00:00:00.000Z');
  return date.toLocaleDateString('en-US', { 
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

export function getDayOfWeek(dateStr: DateString): string {
  const date = new Date(dateStr + 'T00:00:00.000Z');
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}