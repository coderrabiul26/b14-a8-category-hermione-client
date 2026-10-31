<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project: b14-a8-category-hermione-client

A Next.js (App Router) client for a category-page assignment. Freshly scaffolded — app logic is yet to be built.

## Commands

- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run start` — serve production build

## Stack & Conventions

- **Next.js 16.4.3** App Router with **React 19.3** and **React Compiler enabled** (`reactCompiler: true` in `next.config.ts`). Do not add manual memoization (`useMemo`/`useCallback`/`memo`) — the compiler handles it.
- **Turbopack + Tailwind CSS v4** — no `tailwind.config`; theme/variables live in `src/app/globals.css`.
- **shadcn/ui (base-nova style, `@base-ui/react` primitives)** — generated components live in `src/components/ui/*`. Add new ones via shadcn rather than hand-writing.
- **TypeScript** with path alias `@/* -> ./src/*` (see `components.json` aliases: `@/components`, `@/lib`, `@/hooks`).
- **Fonts**: Geist / Geist Mono via `next/font` in `src/app/layout.tsx`.

## Structure

- `src/app/` — routes (`layout.tsx`, `page.tsx`, `globals.css`)
- `src/components/ui/` — shadcn UI primitives
- `src/lib/utils.ts` — `cn()` helper

## Before Writing Code

This Next.js version has breaking changes vs. training data. Read the relevant guide under `node_modules/next/dist/docs/` first, and heed deprecation notices.

## Notes

- The `<!-- BEGIN:nextjs-agent-rules -->` block at top is auto-managed by `next dev` — keep it committed and unchanged.
- Name suggests a category/page-rendering client (per-assignment repo); confirm API/data requirements with the user before adding data fetching.
