'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface AddHabitFormProps {
  onAdd: (name: string, emoji: string) => void;
  onClose: () => void;
}

const EMOJI_OPTIONS = [
  '💪', '🏃', '📚', '💧', '🧘', '🎯', '✍️', '🎵',
  '🥗', '😴', '🚫', '💊', '🧹', '📱', '🎨', '🌱'
];

export function AddHabitForm({ onAdd, onClose }: AddHabitFormProps): JSX.Element {
  const [name, setName] = useState<string>('');
  const [selectedEmoji, setSelectedEmoji] = useState<string>('💪');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Habit name is required');
      return;
    }
    
    if (name.trim().length > 50) {
      setError('Habit name must be 50 characters or less');
      return;
    }
    
    onAdd(name.trim(), selectedEmoji);
    setName('');
    setSelectedEmoji('💪');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background text-foreground p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Add New Habit</h2>
          <button
            onClick={onClose}
            className="p-1 text-muted hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="habit-name" className="block text-sm font-medium mb-2">
              Habit Name
            </label>
            <input
              id="habit-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="e.g., Drink 8 glasses of water"
              className="w-full px-3 py-2 bg-secondary/10 border border-secondary/20 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              maxLength={50}
            />
            {error && (
              <p className="text-destructive text-sm mt-1">{error}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Choose an Icon
            </label>
            <div className="grid grid-cols-8 gap-2">
              {EMOJI_OPTIONS.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`p-2 text-xl rounded-lg border-2 transition-colors ${
                    selectedEmoji === emoji
                      ? 'border-primary bg-primary/10'
                      : 'border-secondary/20 hover:border-secondary/40'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-secondary/20 text-foreground rounded-lg font-medium hover:bg-secondary/30 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 transition-colors"
            >
              Add Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}