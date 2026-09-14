# PAOS — Personal Academic Operating System

PAOS is a client-side personal academic management system designed to bring study planning, execution, testing, revision, mistakes, discipline, and analytics into one dashboard.

## Core Features

- **Dashboard**
  - Daily study hours
  - Discipline score
  - Attendance
  - Target progress
  - Backlog pressure
  - Risk score
  - Today's adaptive plan
  - Next-best-action recommendation
  - Study and upcoming-event charts

- **Academic**
  - Subjects
  - Topics
  - Topic progress
  - Goals
  - Academic overview table
  - Weak-area visibility

- **Planner**
  - Daily planner
  - Weekly planner
  - Calendar
  - Master timetable
  - Planned vs actual study gap
  - Adaptive planning

- **Study Tracker**
  - Study timer
  - Subject/topic selection
  - Planned duration
  - Automatic session logging
  - Daily/weekly/monthly study totals
  - Study distribution analytics

- **Tests**
  - Test recording
  - Marks and accuracy
  - Average and best score
  - Weak-area detection
  - Test trend analytics

- **Smart Revision**
  - Due revisions
  - Overdue revisions
  - Upcoming revisions
  - Spaced-repetition style scheduling

- **Mistake Bank**
  - Mistake records
  - Conceptual vs other errors
  - Open mistake tracking
  - Topic-wise mistake review

- **Intelligence**
  - Readiness score
  - Risk score
  - Forecast
  - Backlog pressure
  - Weak-topic ranking
  - Next-best-action engine

- **Discipline**
  - Habits
  - Plan adherence
  - Backlog control
  - Life/activity logs
  - Achievements

- **Analytics**
  - Readiness
  - Discipline
  - Attendance
  - Study hours
  - Planned-vs-actual gap
  - Backlog
  - Subject comparison
  - Attendance and backlog trends
  - Automatic progress narrative

- **Settings**
  - Student profile
  - Daily/weekly targets
  - Wake/sleep schedule
  - Adaptive planning
  - Smart revision
  - Risk engine
  - Appearance/theme

- **Data**
  - Browser-local persistence
  - JSON export
  - JSON import
  - Reset/demo data

## Tech Stack

PAOS is intentionally simple and deployable without a backend:

- HTML5
- CSS3
- Vanilla JavaScript
- SVG charts
- Browser `localStorage`
- No framework
- No database
- No API key
- No paid service required

## Project Structure

```text
PAOS/
├── index.html
├── style.css
├── app.js
└── README.md
```

## Run Locally

No build step is required.

1. Put `index.html`, `style.css`, and `app.js` in the same folder.
2. Open `index.html` in a modern browser.
3. PAOS will create its local data automatically.

For the best experience, use a current version of Chrome, Edge, Safari, or Firefox.

## Deploy on GitHub Pages

1. Create a new GitHub repository.
2. Upload:
   - `index.html`
   - `style.css`
   - `app.js`
   - `README.md`
3. Commit the files to the `main` branch.
4. Open the repository's **Settings**.
5. Open **Pages**.
6. Under the deployment/source option, choose:
   - Branch: `main`
   - Folder: `/ (root)`
7. Save.
8. GitHub will provide the public Pages URL.

The important requirement is that `index.html`, `style.css`, and `app.js` are in the same published directory.

## Data & Privacy

PAOS is designed as a browser-first application.

Your working data is stored in the browser using `localStorage`. There is no PAOS backend in this version.

Because the data is local:

- Clearing browser/site data can remove your PAOS data.
- Data does not automatically sync between devices.
- Private/incognito sessions may not preserve data after the session ends.
- Use **Export JSON** regularly to create a backup.
- Use **Import JSON** to restore a backup.

## Recommended Backup Routine

Before changing devices, clearing browser data, or making major changes:

1. Open **Settings**.
2. Export your PAOS data.
3. Keep the JSON backup somewhere safe.
4. On the new browser/device, open PAOS.
5. Import the JSON backup.

## Keyboard Shortcuts

- `Ctrl + K` / `Cmd + K` — quick-add workflow
- `Esc` — close the active modal/drawer

## Important Implementation Note

The JavaScript application expects the IDs, classes, navigation elements, forms, modal containers, dashboard cards, planner panels, charts, and action attributes defined by the PAOS `index.html`.

Therefore, use the matching PAOS HTML file with this `app.js` rather than mixing it with an older minimal HTML shell.

## Resetting the App

The Settings area provides a reset option for returning the application to its initial/demo state.

**Export your data before resetting.**

## Extending PAOS

The application is structured so additional academic workflows can be added later, including:

- More subjects and topics
- More exam targets
- Custom routines
- Additional habits
- More detailed test analysis
- Additional planner rules
- More revision intervals
- More analytics
- Custom dashboards

The goal is to keep PAOS customizable around the student's own schedule, targets, subjects, routines, and tracking system.

---

**PAOS — Plan. Study. Test. Revise. Improve.**
