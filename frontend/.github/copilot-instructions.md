<!-- Copilot instructions tailored for the `todo` frontend Next.js app -->
# Repository overview

This repository is a small Next.js (App Router) frontend that uses Mantine for UI. Key facts:
- Framework: `next` (app directory style).
- UI: `@mantine/core` and `@mantine/hooks`.
- Runtime: default Next server in development; project is configured for a static export (`next.config.ts` uses `output: 'export'`).
- Entry: start reading at `app/page.tsx`.

# Architecture & important patterns (what to know before editing)
- App folder: components and pages live in `app/`. Files here are Server Components by default — add `'use client'` at the top of a file to enable client-side hooks/state (e.g. `app/list.tsx` uses `use client`).
- Client state: `app/list.tsx` persists todos to `window.localStorage` using the key `todo-items`. When updating data flow, keep the localStorage contract in mind.
- Styling: global/third-party styles are imported in `app/layout.tsx` (`@mantine/core/styles.css`). Keep imports here for theme fonts and provider setup.
- Theme/provider: `MantineProvider` and a small theme are configured in `app/layout.tsx`. Prefer using Mantine primitives (Container, Stack, Table, TextInput) for UI consistency.

# Developer workflows (commands you will use)
- Install deps: `npm ci`
- Dev (with HMR): `npm run dev` (runs `next dev`).
- Build (static export): `npm run build` (runs `next build`) then `npm run start` to serve `./out` (`start` runs `npx serve ./out`).
- Lint: `npm run lint` (project uses `eslint` — adjust args if you want to target files: `npm run lint -- .`).
- Clean: `npm run clean` (removes `.next`, `out`, `node_modules`, `next-env.d.ts`).

# Project-specific conventions
- Place new UI components under `app/` (co-locate with pages when small). Example components: `app/list.tsx` and `app/input.tsx`.
- Server vs client: default is server component. If you use React hooks (`useState`, `useEffect`), add the literal top-line `'use client';` like `app/list.tsx`.
- Local persistence: use `localStorage` key `todo-items` for todos. Multiple components reading/writing this key must stay compatible.
- Export target: Because `next.config.ts` sets `output: 'export'`, avoid relying on server-only runtime APIs (no API routes expected). Prefer browser-safe code for runtime features.

# Integration points & external deps
- Mantine: UI components and theme provider in `app/layout.tsx`.
- Fonts: Google fonts are loaded with `next/font/google` in `app/layout.tsx`.
- Static serving: production start uses `serve` to serve the `out` directory — changes that require runtime server behavior are not supported by current config.

# Code examples & quick recipes
- Make a client component that reads/writes todos (pattern used in `app/list.tsx`):
  - Add `'use client';` at top
  - Use `useState` and `useEffect` to read `localStorage.getItem('todo-items')` and persist on updates

- Add new page or UI block:
  - Place JSX in `app/<name>.tsx` or create a subfolder `app/<name>/page.tsx` for nested routes
  - Use Mantine components and import styles only in `app/layout.tsx`

# What to avoid / limitations discovered in the codebase
- Do not add server-only APIs or expect server runtime when running production build because project is configured as a static export.
- There are no automated tests in the repo — do not assume existing test harness.

# When to ask the repo owner before large changes
- Changing persistence (replacing `localStorage` with a backend) — ask first because the app and README assume client-side storage.
- Changing build output from static export to server rendering — impacts deployment and start script (`serve ./out`).

# If you need more context
- Start reading `app/page.tsx`, then `app/layout.tsx`, `app/list.tsx`, `app/input.tsx`.
- Check `package.json` for scripts and `next.config.ts` for export behavior.

If anything here is unclear or you'd like more detail (examples for adding routes, wiring input to add todos, or converting localStorage to a simple API), tell me which area to expand.
