# Habit Tracker

A responsive, modern habit tracking application built with React and Vite. Track your daily habits, maintain streaks, and visualize your progress across weeks.

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Running Locally

```bash
# Clone the repository (if applicable)
git clone <repository-url>
cd habittracker

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` (or `http://localhost:5174` if port 5173 is in use).

### Building for Production

```bash
# Build the app
npm run build

# Preview the production build
npm run preview
```

## Features

- **Daily Habit Tracking**: Add, rename, and delete habits easily
- **Weekly Grid View**: See all your habits and checkmarks in a clean 7-day grid
- **Streak Counter**: Track consecutive days of habit completion
- **Week Navigation**: Browse past weeks to see historical data, manage current week habits
- **Smart Editing**: Edit today and past days, view-only access to future days
- **Visual Feedback**: Today's column is highlighted, progress bars show completion rates
- **Empty State**: Friendly messaging when you haven't added any habits yet
- **Persistent Storage**: All habits and checkmarks are saved automatically to localStorage
- **Responsive Design**: Works seamlessly on phones (360px) and desktops (1440px+)
- **Accessibility**: Keyboard navigation, proper focus states, semantic HTML

## Technology Stack

- **Frontend Framework**: React 19.2.6
- **Build Tool**: Vite 8.0
- **Styling**: Tailwind CSS 4.3 with PostCSS
- **Icons**: React Icons 5.6
- **State Management**: React hooks (useState, useEffect)
- **Storage**: Browser localStorage API

## Project Structure

```
src/
├── App.jsx                 # Main app component with state management
├── App.css                 # App-level styles and responsive utilities
├── components/
│   ├── Hero.jsx           # Header with greeting and daily progress
│   └── Habit.jsx          # Weekly grid and habit management UI
├── index.css              # Tailwind CSS imports
└── main.jsx               # React entry point
```

## Information Architecture & Design

### Visual Hierarchy
- **Header Section**: Large greeting, current date, and motivational messaging
- **Stats Cards**: Three cards showing today's progress, current streak, and total active habits
- **Weekly Grid**: Habit names on the left (40% width), days of week as columns (60% width split 7 ways)
- **Action Section**: Add habit form, progress bar, and daily reminder

### Color Scheme
- **Primary**: Green (#22c55e) - representing growth and completion
- **Background**: Warm cream (#fffcf4) - reducing eye strain, friendly feel
- **Borders**: Light gray - subtle visual separation without harshness
- **Disabled State**: Reduced opacity (40%) - clear but not intrusive

### Responsive Scaling
- **360px (Mobile)**: Stacked layout, single-column cards, scrollable grid with minimum width
- **768px (Tablet)**: Two-column grid for stats, flexible spacing
- **1440px+ (Desktop)**: Three-column stats, optimized padding and typography

## Deployment

This app can be deployed to any static hosting service:

### Netlify
```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### Vercel
```bash
vercel
```

### GitHub Pages
```bash
# Configure vite.config.js with base path if needed
npm run build
# Deploy dist/ folder to gh-pages
```

## Usage Guide

### Adding a Habit
1. Type the habit name (e.g., "Read 30 min", "Exercise")
2. Click "Add" or press Enter
3. The habit will appear in the weekly grid with empty checkboxes

### Tracking Daily Progress
1. Check the box for today's column to mark the habit as complete
2. You can also check boxes for past days to mark them retroactively
3. Your progress updates in real-time in the stats cards

### Managing Habits
- **Rename**: Click "Rename" under any habit name to edit it
- **Delete**: Click "Delete" to permanently remove a habit from all weeks
- **View History**: Use week navigation arrows to browse past weeks
- **Streak**: The streak counter shows consecutive days ending today with at least one completed habit

### Week Navigation
- **Previous Week**: Click the left arrow to view past weeks (all days are fully editable)
- **Next Week**: Click the right arrow to move forward (future days are read-only)
- **Current Week**: Date range shows the Monday-Sunday scope

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Notes

- All data is stored locally in the browser
- No backend or server required
- Typical bundle size: ~60KB gzipped
- Fast performance with smooth animations and transitions

## Future Enhancements

- Habit categories/tags
- Export/import data (CSV, JSON)
- Dark mode support
- Custom week start day preference
- Statistics and analytics views
- Habit templates
- Push notifications for reminders

## License

MIT

## Author

Built as a frontend assessment project.
