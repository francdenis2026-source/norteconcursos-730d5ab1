# Norte Refino Visual Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refine homepage, authentication and mobile navigation with a shared visual system while preserving behavior.

**Architecture:** Add a scoped refinement layer using existing CSS tokens and component classes, then simplify only local overrides. Keep routes and auth logic unchanged.

**Tech Stack:** React 19, TanStack Router, Tailwind v4, Radix UI, Lucide, CSS custom properties.

**Spec:** `docs/superpowers/specs/2026-11-10-norte-refino-visual-design.md`

## Global Constraints

- Preserve authentication, Supabase, study rules and existing routes.
- Preserve keyboard focus, skip links, ARIA labels and responsive behavior.
- Use shared semantic tokens; do not introduce a competing palette.

## Review Focus

- Mobile widths must avoid horizontal overflow.
- Login errors and recovery states must remain readable without layout collapse.
- Dark/light theme contrast must remain sufficient.
- Menu focus and active states must remain visible.
- Existing homepage anchors and auth links must continue working.

### Task 1: Shared refinement tokens

**Files:**
- Modify: `src/styles.css`
- Create: `src/styles/norte-refinement-2026.css`

- [ ] Add a small token layer for surface, border, focus, text and action states and import it once from `src/styles.css`.
- [ ] Run `npm run typecheck`.
- [ ] Commit token layer.

### Task 2: Homepage and mobile navigation polish

**Files:**
- Create: `src/styles/home-professional-refinement.css`
- Modify: `src/routes/index.tsx`

- [ ] Add the stylesheet after existing homepage layers.
- [ ] Refine header density, active links, CTA hierarchy, menu cards, drawer spacing and footer rhythm using existing classes only.
- [ ] Add mobile overflow guards and focus-visible states.
- [ ] Run `npm run lint` and `npm run typecheck`.
- [ ] Commit homepage refinement.

### Task 3: Authentication polish

**Files:**
- Create: `src/styles/auth-professional-refinement.css`
- Modify: `src/routes/auth.tsx`

- [ ] Import the refinement layer after `auth-art.css`.
- [ ] Improve card hierarchy, tab contrast, field focus, error messaging and compact mobile spacing without changing form logic.
- [ ] Run `npm run lint` and `npm run typecheck`.
- [ ] Commit authentication refinement.

### Task 4: Verification

- [ ] Run `npm run build`.
- [ ] Review `git diff --check` and changed files.
- [ ] Report any environment limitation affecting visual browser verification.
