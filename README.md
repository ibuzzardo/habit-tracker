# Habit Tracker

A clean, modern daily habit tracker built with Next.js 15, TypeScript, and Tailwind CSS. Track your daily habits, build streaks, and visualize your progress with a weekly view.

## Features

- ✅ **Daily Habit Tracking** - Check off habits as you complete them each day
- 🔥 **Streak Counter** - See your current streak for each habit
- 📅 **Weekly View** - Visual 7-day grid showing completion patterns
- 💾 **Local Storage** - Data persists across browser sessions
- 🌙 **Dark Theme** - Clean, modern dark interface
- 📱 **Responsive Design** - Works on mobile and desktop
- ⚡ **Fast & Lightweight** - No external dependencies, pure localStorage

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ibuzzardo/habit-tracker.git
cd habit-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Add a Habit**: Click "Add Habit" to create a new habit with a name and emoji icon
2. **Complete Habits**: Check off habits as you complete them each day
3. **View Streaks**: See your current streak count next to each habit
4. **Weekly Progress**: Scroll down to see a 7-day completion grid
5. **Delete Habits**: Use the trash icon to remove habits (with confirmation)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: Browser localStorage
- **State Management**: React hooks

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with dark theme
│   ├── page.tsx            # Main page component
│   └── globals.css         # Tailwind imports
├── components/
│   ├── HabitList.tsx       # List of habits with empty state
│   ├── HabitItem.tsx       # Individual habit row
│   ├── AddHabitForm.tsx    # Modal form for adding habits
│   └── WeeklyView.tsx      # 7-day completion grid
├── hooks/
│   └── useLocalStorage.ts  # localStorage React hook
├── utils/
│   └── dateUtils.ts        # Date handling and streak calculation
└── types.ts                # TypeScript type definitions
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## Data Storage

Habits are stored in browser localStorage as JSON with the following structure:

```typescript
interface Habit {
  id: string;
  name: string;
  emoji: string;
  completions: { [date: string]: boolean };
}
```

Dates are stored in UTC format (YYYY-MM-DD) to avoid timezone issues.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm run type-check`
5. Commit your changes: `git commit -am 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).