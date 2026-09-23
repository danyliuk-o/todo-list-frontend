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

- `src/app/layout.tsx` — root layout: wraps everything in `<Providers>` (TanStack Query's `QueryClientProvider`), renders `<Header/>` once (shared across all routes), and imports `globals.css`.
- `src/app/providers.tsx` — `"use client"`; creates the `QueryClient` inside `useState` (not a module constant) so each session gets its own — required for SSR safety, even though this app doesn't do server-side fetching yet.
- Routes are folders under `src/app/`: `/` → `src/app/page.tsx`, `/about` → `src/app/about/page.tsx`. Add new routes by adding folders with a `page.tsx`.
- Reusable UI lives under `src/components/<Name>/`. Only components using hooks/state get `"use client"` (currently `Todo.tsx` and `TodoForm.tsx`); everything else is a Server Component by default.
- Shared types live in `src/types/app.ts` — `TodoListItem` mirrors the shape `PProject-backend`'s `/api/todos` returns (field names must match; there's no shared-types package between the two repos).
- `src/lib/api.ts` centralizes the raw `fetch` calls to the backend (`fetchTodos`/`createTodo`/`deleteTodo`), mirroring the repository-layer pattern used on the backend. `src/components/Todo/useTodos.ts` wraps those in TanStack Query (`useTodosQuery`, `useCreateTodo`, `useDeleteTodo`) — components use the hooks, never `@/lib/api` or `fetch` directly. Data fetching for a new feature should follow the same split: plain fetch functions in `lib/api.ts`, a `useTanStack`-hooks file next to the feature's components.
- `src/app/globals.css`: Tailwind v4 is CSS-first (no `tailwind.config.js`). Design tokens (light/dark colors, driven by `prefers-color-scheme`) are defined as plain CSS custom properties in `:root`, then re-exposed to Tailwind via an `@theme inline` block (e.g. `--text` → `text-text`, `--header` → `bg-header`). Base typography (`h1`/`h2`) and list resets live in `@layer base`; everything else uses Tailwind utility classes directly in components.
- Path alias `@/*` → `./src/*` (see `tsconfig.json`).

The `Todo` feature (`src/components/Todo/`) loads its list from `PProject-backend` on mount and calls it for add/delete — **the backend must be running on `http://localhost:4000` (see `PProject-backend/CLAUDE.md`) for the Todo page to work in dev.** Override the API origin via `NEXT_PUBLIC_API_URL` if the backend runs elsewhere.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
