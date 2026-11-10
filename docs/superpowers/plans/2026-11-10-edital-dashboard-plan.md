# Edital Dashboard Oriented to Contest Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reorganize the selected edital view into a professional contest-focused dashboard without removing current study actions.

**Architecture:** Keep the existing data loading and topic filters, but add a contextual summary layer above them. Derive progress, discipline counts, and question coverage from the already loaded edition, topics, completion map, and exam question list.

**Tech Stack:** React, TypeScript, TanStack Router, existing Card/Badge/Button components, existing edital CSS.

**Spec:** `docs/superpowers/specs/2026-11-10-edital-dashboard-design.md`

## Global Constraints

- Do not alter official edital content.
- Do not remove questions, materials, or sources.
- Do not invent weights or priorities.
- Keep the specific PC-AC verticalized edital route.
- Preserve responsive behavior.

## Review Focus

- No edition selected: catalog remains the primary view.
- Archived edition: archive warning remains prominent.
- No questions available: coverage card explains the absence and keeps topic study available.
- Partial progress: percentages and counts remain accurate.
- Mobile width: summary cards and actions wrap without horizontal overflow.

### Task 1: Selected-edition summary model

**Files:**
- Modify: `src/routes/dashboard/edital.index.tsx`

- [ ] Derive selected-edition summary values from existing state: completion count/percentage, discipline count, topic count, completed disciplines, and eligible question count.
- [ ] Keep derivations pure and guard empty/archived/no-question states.
- [ ] Run `git diff --check`.
- [ ] Commit the summary model.

### Task 2: Professional selected-edition dashboard

**Files:**
- Modify: `src/routes/dashboard/edital.index.tsx`
- Modify: `src/styles/student-internal-workspace-system.css` if needed.

- [ ] Replace the flat selected-edition heading with a contextual header showing contest, role, year, board, source status, and primary actions.
- [ ] Add summary cards for progress, topics, disciplines, and eligible questions.
- [ ] Add a PC-AC visual accent when the selected contest is PC-AC, without changing data.
- [ ] Group document actions and practice actions clearly.
- [ ] Keep filters and topic accordion below the summary.
- [ ] Verify `git diff --check`.
- [ ] Commit the dashboard UI.

### Task 3: Verification and publish

- [ ] Run the available build/type check; if unavailable, record the environment limitation.
- [ ] Review all existing links and state transitions in the edited route.
- [ ] Publish the finished changes to `main`.
