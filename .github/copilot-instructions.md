# Copilot / AI Agent Instructions for homehealth-hero

This file gives concise, actionable guidance to AI coding agents working in this workspace.

High-level overview
- Main app: `homehealth-hero` (TypeScript + Refine + Vite + Tailwind). Entry: `src/index.tsx` -> `src/App.tsx`.
- Secondary legacy/demo app: `homehealthhero` (plain Vite React). Treat separately unless asked to modify both.

Key architecture facts
- Uses Refine framework: routing/resources are declared in `src/App.tsx` (see `resources` array). Admin pages live under `/admin` routes.
- Data layer: a mock `DataProvider` is implemented in `src/providers/data.ts` and uses `src/mocks.json` as the canonical in-repo data source. Edit `mocks.json` to change mock data.
- Auth: `src/providers/auth.ts` contains a minimal AuthProvider stub; it intentionally returns authenticated in `check()` and `getIdentity()` — do not assume full auth flows exist.
- UI patterns: components follow shadcn-style structure. Reusable primitives live in `src/components/ui/` and Refine-specific wrappers live under `src/components/refine-ui/`.
- Layout and admin wrappers: see `src/components/refine-ui/layout/layout` used by admin routes.

Developer workflows (commands)
- Install: repository has `pnpm-lock.yaml` so prefer `pnpm install`. `npm install` or `yarn` may also work.
- Dev (main TS app): from `homehealth-hero` run `pnpm dev` (runs `refine dev`). Equivalent: `npm run dev`.
- Build: `pnpm build` (runs `tsc && refine build`). Keep `tsc` step intact when editing build behavior.
- Legacy app (homehealthhero): run `pnpm --filter homehealthhero dev` or cd into `homehealthhero` and run `pnpm dev` (runs `vite`).

Project-specific conventions and patterns
- Prefer editing or adding components under `src/components/ui` for primitive UI changes, and `src/components/refine-ui` for Refine screens and notifications (e.g., `use-notification-provider`, `toaster`).
- Pages and admin views live in `src/pages/`. Examples: `src/pages/services/*`, `src/pages/testimonials/*`.
- Data flows: `src/providers/data.ts` is the single source of truth for mock data access. The Refine `dataProvider` functions (getList/getOne/create/update/deleteOne) implement filtering, sorting, and pagination — keep changes consistent with those signatures.
- Routing: Admin routes are nested inside `/admin` with `Outlet` and `Layout` in `src/App.tsx`. Use the same `NavigateToResource` pattern when adding new admin list/create/edit pages.

Integration points and external deps to be aware of
- Refine core and `@refinedev/react-router` (see `package.json`). Avoid switching router implementations without coordinated changes in `App.tsx`.
- Tailwind + Vite + TypeScript. Styles are in `src/App.css` and Tailwind config at repository root.
- Mock API: `src/mocks.json` and the in-memory `dataProvider` mean changes to data do not require network calls.

What NOT to change without asking
- The `dataProvider` contract in `src/providers/data.ts` (method names/signatures). Refine expects these exact methods.
- The `resources` layout in `src/App.tsx`—changing resource names or routes affects the admin navigation.
- Top-level scripts in `package.json` (they integrate with `refine` CLI).

If you need to make code changes
- Always run `pnpm dev` locally (or the equivalent `npm run dev`) to validate UI behavior.
- When adding pages follow the existing pattern: create folder in `src/pages/<resource>/` with `list.tsx`, `create.tsx`, `edit.tsx` as appropriate and register resource in `src/App.tsx`.
- Update `src/mocks.json` to add seeded data for new resources, and ensure `src/providers/data.ts` handles the shape.

Notes found during scan
- No existing `.github/copilot-instructions.md` or AGENT.md files were present.
- Tests are sparse; main project relies on manual dev checks. Simple unit tests (if added) should live alongside components or under a `__tests__` folder.

If something is unclear
- Ask specific questions and point to the file you want to change (use workspace paths). Example: "Change admin `services` resource to include a `status` field — update `src/mocks.json` and `src/pages/services/*`?"

End of instructions.
