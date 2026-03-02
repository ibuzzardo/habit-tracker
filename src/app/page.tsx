'use client';

import { useState } from 'react';
import type { Habit } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { HabitList } from '@/components/HabitList';
import { AddHabitForm } from '@/components/AddHabitForm';
import { WeeklyView } from '@/components/WeeklyView';
import { getTodayUTC } from '@/utils/dateUtils';

export default function HomePage(): JSX.Element {
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits', []);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const addHabit = (name: string, emoji: string): void => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      emoji,
      completions: {},
    };
    setHabits(prev => [...prev, newHabit]);
    setShowAddForm(false);
  };

  const toggleHabit = (habitId: string): void => {
    const today = getTodayUTC();
    setHabits(prev => 
      prev.map(habit => 
        habit.id === habitId
          ? {
              ...habit,
              completions: {
                ...habit.completions,
                [today]: !habit.completions[today],
              },
            }
          : habit
      )
    );
  };

  const deleteHabit = (habitId: string): void => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      setHabits(prev => prev.filter(habit => habit.id !== habitId));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="border-b border-secondary/20 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Habit Tracker</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 transition-colors"
          >
            Add Habit
          </button>
        </div>
      </header>
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <HabitList
            habits={habits}
            onToggle={toggleHabit}
            onDelete={deleteHabit}
          />
          
          {habits.length > 0 && (
            <WeeklyView habits={habits} />
          )}
        </div>
      </main>

      {showAddForm && (
        <AddHabitForm
          onAdd={addHabit}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}