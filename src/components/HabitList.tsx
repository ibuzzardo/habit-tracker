import type { Habit } from '@/types';
import { HabitItem } from './HabitItem';

interface HabitListProps {
  habits: Habit[];
  onToggle: (habitId: string) => void;
  onDelete: (habitId: string) => void;
}

export function HabitList({ habits, onToggle, onDelete }: HabitListProps): JSX.Element {
  if (habits.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎯</div>
        <h2 className="text-xl font-semibold mb-2">No habits yet</h2>
        <p className="text-muted mb-6">
          Start building better habits by adding your first one!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Today's Habits</h2>
      <div className="space-y-3">
        {habits.map(habit => (
          <HabitItem
            key={habit.id}
            habit={habit}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}