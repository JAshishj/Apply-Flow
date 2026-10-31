# ApplyFlow

A job application tracker built with React. Add the roles you apply to, move them through each stage, and see your whole search at a glance. Everything is saved in the browser, so there is no backend and no account.

## Features

- **Dashboard** with a pipeline breakdown, days since your last application, activity over 30 days, 6 months, and 12 months, plus recent applications
- **Add, edit, and delete** applications, with a two-step delete confirmation
- **Four stages**: Applied, Interview, Offer, Rejected
- **Search, filter, and sort** by company or role, stage, and newest, oldest, or company
- **Sample data preview** so you can look around before adding anything, without touching your own records
- **Light and dark theme**, following the system setting by default
- **Saved locally** in `localStorage`, so a refresh keeps your data
- **Responsive and keyboard accessible**, with focus trapping and Escape to close dialogs

## Tech stack

| Area | Choice |
| --- | --- |
| UI | React 19, Vite 7 |
| Styling | Tailwind CSS 4, custom CSS variables |
| Routing | React Router 7 |
| Animation | Motion |
| Icons | Phosphor Icons |
| Fonts | Bricolage Grotesque, Instrument Sans, JetBrains Mono (self-hosted) |

## Getting started

You need Node.js 20.19 or newer.

```bash
git clone https://github.com/JAshishj/Apply-Flow.git
cd Apply-Flow
npm install
npm run dev
```

Open the URL printed in the terminal, usually `http://localhost:5173`.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint over the project |

## Routes

| Path | Page |
| --- | --- |
| `/` | Dashboard |
| `/Applications` | Applications list |
| `*` | Not found |

## How data works

Applications are kept in `localStorage` under `applyflow_applications`, and the theme choice under `applyflow_theme`. Nothing is sent to a server.

Sample data is a read-only preview. While it is on, the app shows example records and hides the add, edit, and delete actions. Your own data is never modified, and the samples are never written to storage.

## Project structure

```text
src/
  Components/
    Application_UI/   application row, form, detail view, and dialog
    Dashboard_UI/     pipeline, momentum, cadence, recent applications
    Layout/           app shell, theme toggle, wordmark
    UI/               reusable button, dialog, field, badge, and empty state
  Context/            application state and localStorage persistence
  Data/               sample applications
  Pages/              dashboard, applications, not found
  lib/                small helpers for status, dates, and class names
  index.css           design tokens and base styles
  main.jsx            app entry and routes
```

## Notes

Built as a personal project to practise component structure, shared state with Context, browser storage, accessible dialogs, and a consistent design system instead of one-off styles.

Ideas for later: exporting applications to CSV, follow-up reminders, and an optional backend for syncing across devices.
