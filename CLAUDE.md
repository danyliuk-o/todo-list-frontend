# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server.
- `npm run build` — type-check-free production build via Vite (`vite build`).
- `npm run preview` — preview the production build.
- `npm run lint` — run ESLint over the project.
- No test runner is configured.

## Architecture

React 19 + TypeScript app scaffolded with Vite, using `react-router-dom` for client-side routing.

- Entry point: `src/main.tsx` → mounts `src/app/App.tsx`.
- `App.tsx` sets up the router (`BrowserRouter`) with routes defined directly in JSX (`/` → `pages/home/Home`, `/about` → `pages/about/About`). Add new routes here.
- Pages live under `src/pages/<name>/`, reusable UI under `src/components/<Name>/`.
- Shared types live in `src/types/app.ts`.
- Global styles: `src/styles/index.css` and `src/styles/app.css`, imported from `App.tsx`.

Module resolution is `nodenext` (see `tsconfig.json`), so internal TS/TSX imports use explicit `.js` extensions (e.g. `import App from "./app/App.js"`) even though the source files are `.ts`/`.tsx` — keep this convention when adding imports.

The `Todo` feature (`src/components/Todo/`) currently manages its task list in local component state only; it is not yet wired to the backend API in the sibling `PProject-backend` repo.
