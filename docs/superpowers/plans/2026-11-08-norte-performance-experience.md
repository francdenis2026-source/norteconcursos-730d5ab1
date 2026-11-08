# Norte Performance Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Consolidate the existing student dashboard around a reliable next-study action while preserving current study data and navigation.

**Architecture:** Reuse `useStudentDashboard`, `studentDashboard` summaries, existing dashboard route components, and current navigation. Add only focused presentation or decision logic where the audit identifies a real gap; do not add database entities for the first increment.

**Tech Stack:** React 19, TypeScript, TanStack Router, TanStack Query, Tailwind/CSS, Supabase.

**Spec:** `docs/superpowers/specs/2026-11-08-norte-experience-design.md`

## Global Constraints

- Preserve existing content, scoring, quotas, authentication, RLS, and accessibility rules.
- Keep the welcome strip in the student area.
- Work one area at a time and keep the UI compact and responsive.
- Reuse existing hooks and real data before creating new data models.

## Review Focus

- A student without an objective must receive a useful training action.
- A student with an active schedule must be sent to the correct plan and day.
- A student with pending reinforcement must see review as a higher priority than generic training.
- Missing Supabase data must produce a recoverable state rather than a broken dashboard.
- Mobile layouts must keep the primary action visible without horizontal overflow.

### Task 1: Dashboard baseline audit

**Files:**
- Inspect: `src/routes/dashboard/index.tsx`
- Inspect: `src/hooks/useStudentDashboard.ts`
- Inspect: `src/lib/studentDashboard.ts`

- [ ] Verify the current priority order against the design spec.
- [ ] Verify links carry the required plan, article, and reinforcement search values.
- [ ] Run targeted typecheck and existing dashboard tests after dependencies are installed.

### Task 2: Next-action presentation refinement

**Files:**
- Modify: `src/routes/dashboard/index.tsx`
- Modify: relevant `src/styles/student-*.css`
- Test: add a focused pure-function test only if priority logic is extracted.

- [ ] Extract priority selection only if the current inline logic prevents reliable testing.
- [ ] Preserve the current schedule, reading, reinforcement, objective, strategy, and fallback order.
- [ ] Keep one primary action and a short reason visible on mobile and desktop.
- [ ] Verify typecheck, lint, and focused tests.

### Task 3: Trainer, review, and performance follow-through

**Files:**
- Inspect and modify only the selected destination route after Task 2 validation.

- [ ] Map the next action from the dashboard to the trainer/review destination.
- [ ] Ensure completion returns the student to an updated progress view.
- [ ] Validate the destination before moving to the next journey.
