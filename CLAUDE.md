# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server (Turbopack, on by default in Next 16).
- `npm run build` — production build.
- `npm run start` — serve the production build.
- `npm run lint` — run ESLint directly (`eslint .`) — Next 16 removed the built-in `next lint` command.
- No test runner is configured.
- ESLint is pinned to `^9.39.5`: `eslint-config-next@16.3.5`'s bundled parser is not yet compatible with ESLint 10 (`scopeManager.addGlobals` was removed) — don't bump ESLint to 10 without re-checking this.

## Architecture

Next.js 16 (App Router) + React 19 + TypeScript, styled with Tailwind CSS v4. Migrated from a Vite + react-router-dom setup in September 2026 — see git history for the prior structure.

- `src/app/layout.tsx` — root layout: renders `<Header/>` once (shared across all routes) and imports `globals.css`.
- Routes are folders under `src/app/`: `/` → `src/app/page.tsx`, `/about` → `src/app/about/page.tsx`. Add new routes by adding folders with a `page.tsx`.
- Reusable UI lives under `src/components/<Name>/`. Only components using hooks/state get `"use client"` (currently `Todo.tsx` and `TodoForm.tsx`); everything else is a Server Component by default.
- Shared types live in `src/types/app.ts`.
- `src/app/globals.css`: Tailwind v4 is CSS-first (no `tailwind.config.js`). Design tokens (light/dark colors, driven by `prefers-color-scheme`) are defined as plain CSS custom properties in `:root`, then re-exposed to Tailwind via an `@theme inline` block (e.g. `--text` → `text-text`, `--header` → `bg-header`). Base typography (`h1`/`h2`) and list resets live in `@layer base`; everything else uses Tailwind utility classes directly in components.
- Path alias `@/*` → `./src/*` (see `tsconfig.json`).

The `Todo` feature (`src/components/Todo/`) currently manages its task list in local component state only; it is not yet wired to the backend API in the sibling `PProject-backend` repo.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
