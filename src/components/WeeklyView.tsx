import type { Habit } from '@/types';
import { getLast7Days, getDayOfWeek } from '@/utils/dateUtils';

interface WeeklyViewProps {
  habits: Habit[];
}

export function WeeklyView({ habits }: WeeklyViewProps): JSX.Element {
  const last7Days = getLast7Days();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Weekly Progress</h2>
      
      <div className="bg-secondary/10 rounded-lg border border-secondary/20 p-4">
        {/* Header with days */}
        <div className="grid grid-cols-8 gap-2 mb-4">
          <div className="text-sm font-medium text-muted">Habit</div>
          {last7Days.map(date => (
            <div key={date} className="text-center">
              <div className="text-xs text-muted">{getDayOfWeek(date)}</div>
              <div className="text-xs text-muted">{new Date(date + 'T00:00:00.000Z').getDate()}</div>
            </div>
          ))}
        </div>
        
        {/* Habit rows */}
        <div className="space-y-3">
          {habits.map(habit => (
            <div key={habit.id} className="grid grid-cols-8 gap-2 items-center">
              <div className="flex items-center gap-2 text-sm">
                <span>{habit.emoji}</span>
                <span className="truncate">{habit.name}</span>
              </div>
              
              {last7Days.map(date => {
                const isCompleted = habit.completions[date] || false;
                return (
                  <div key={date} className="flex justify-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      isCompleted 
                        ? 'bg-accent text-white' 
                        : 'bg-secondary/20 border border-secondary/40'
                    }`}>
                      {isCompleted ? '✓' : ''}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        {habits.length === 0 && (
          <div className="text-center text-muted py-8">
            No habits to display. Add your first habit to see weekly progress!
          </div>
        )}
      </div>
    </div>
  );
}