export interface Habit {
  id: string;
  name: string;
  emoji: string;
  completions: CompletionMap;
}

export interface CompletionMap {
  [date: string]: boolean;
}

export type DateString = string; // YYYY-MM-DD format