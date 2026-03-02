import type { Habit } from '@/types';
import { getTodayUTC, calculateStreak } from '@/utils/dateUtils';
import { Trash2 } from 'lucide-react';

interface HabitItemProps {
  habit: Habit;
  onToggle: (habitId: string) => void;
  onDelete: (habitId: string) => void;
}

export function HabitItem({ habit, onToggle, onDelete }: HabitItemProps): JSX.Element {
  const today = getTodayUTC();
  const isCompleted = habit.completions[today] || false;
  const streak = calculateStreak(habit);

  return (
    <div className="flex items-center gap-4 p-4 bg-secondary/10 rounded-lg border border-secondary/20 hover:border-secondary/40 transition-colors">
      <label className="flex items-center gap-3 flex-1 cursor-pointer">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle(habit.id)}
          className="h-5 w-5 text-primary rounded focus:ring-2 focus:ring-primary/50 bg-background border-secondary transition-colors"
        />
        <span className="text-2xl">{habit.emoji}</span>
        <span className={`text-lg font-medium transition-colors ${
          isCompleted ? 'text-foreground/70 line-through' : 'text-foreground'
        }`}>
          {habit.name}
        </span>
      </label>
      
      <div className="flex items-center gap-3">
        {streak > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 bg-accent/20 text-accent rounded-md text-sm font-medium">
            <span>🔥</span>
            <span>{streak}</span>
          </div>
        )}
        
        <button
          onClick={() => onDelete(habit.id)}
          className="p-2 text-muted hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
          aria-label="Delete habit"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}