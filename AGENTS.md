<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

The block above is auto-managed: `next dev` only rewrites content between its markers, so anything you add outside them is safe.

## Commands

- `npm run dev` — Next.js dev server (Turbopack). npm is the package manager (`package-lock.json`); no lockfiles for other managers.
- `npm run lint` — ESLint 9 flat config (`eslint.config.mjs`). The script has no `--fix`.
- `npx tsc --noEmit` — typecheck; there is no `typecheck` script. `npm run build` also typechecks (but see below).
- `npm run build` — verified green. It does **not** fail on lint errors, so lint must be checked separately.
- There is **no test runner, no CI, no pre-commit hooks**. Don't search for them; verification is lint + `tsc --noEmit` (+ `build` when touching config/routing).

### Baseline lint is red

`npm run lint` currently reports 2 errors + 1 warning that predate any new work: `react-hooks/set-state-in-effect` in `src/components/ui/carousel.tsx:98` and `src/hooks/use-mobile.ts:14`, plus unused `Image` import in `src/app/page.tsx`. These are in scaffold/generated files — don't treat them as your regression.

## Stack quirks (things you'd guess wrong)

- Single Next.js 16 app (App Router) under `src/`; alias `@/*` → `./src/*`. Routes: `src/app/layout.tsx`, `src/app/page.tsx`.
- shadcn/ui with style **`base-nova`** (`components.json`): primitives come from **`@base-ui/react`, not Radix UI**. Don't convert imports to Radix; don't add Radix deps.
- `cn` is the npm `cn` package: `src/lib/utils.ts` only re-exports it and components import `{ cn } from "cn"` directly. It is *not* the usual `clsx` + `tailwind-merge` shim — don't "fix" it.
- Tailwind v4 is CSS-first: no `tailwind.config.*` or `postcss.config.*`. Theme/tokens live in `src/app/globals.css` (`@import "tailwindcss"`, `@import "shadcn/tailwind.css"`, `@theme inline`), wired to Turbopack via the `@tailwindcss/turbopack` rule in `next.config.ts`.
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`).
- New UI components: `npx shadcn add <component>` (CLI is a dependency, configured by `components.json`); output lands in `src/components/ui/`.
