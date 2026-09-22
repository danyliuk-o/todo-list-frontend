# Todo List Frontend

A Todo list UI built with Next.js 16 (App Router), React 19, and TypeScript, styled with Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` — start the dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Project structure

- `src/app/` — routes (App Router): `/` and `/about`
- `src/components/` — reusable UI, including the `Todo` feature
- `src/types/` — shared TypeScript types

See `CLAUDE.md` for more detailed architecture notes.

## Backend

The `Todo` feature currently manages its task list in local component state; it is not yet wired to the API in the sibling [`todo-list-backend`](https://github.com/danyliuk-o/todo-list-backend) repo.
