# PC-AC Material Shortcuts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add compact, availability-aware theory, video, questions, and mock-exam shortcuts to each PC-AC schedule subject row without changing row dimensions.

**Architecture:** Derive stable links from the activity subject/topic and render an inline Astryx action group in the discipline cell. Existing schedule generation and data remain unchanged; unavailable actions are omitted and links use existing library/trainer/mock-exam routes.

**Tech Stack:** React, TypeScript, Astryx Button, lucide-react SVG icons, TanStack Router links.

**Spec:** `docs/superpowers/specs/2026-11-10-pcac-design.md`

## Global Constraints

- Keep schedule rows compact and preserve their existing table dimensions.
- Use Astryx components and existing theme tokens.
- Render only actions with a valid target.
- Preserve all existing schedule calculations and persistence.

## Review Focus

- Empty subject/topic rows must render no shortcuts.
- Long topics must not force horizontal overflow.
- Links must encode the current subject/topic and open the intended platform area.
- Keyboard focus and accessible labels must remain usable.

### Task 1: Schedule material shortcut group

**Files:**
- Modify: `src/components/dashboard/PcAcCronogramaCard.tsx`
- Modify: `src/styles/pcac-schedule.css`
- Test: `scripts/cronograma.test.mjs`

- [ ] Add a pure shortcut resolver that returns theory, video, questions, and mock-exam targets only when subject/topic data exists.
- [ ] Render compact Astryx buttons with Lucide SVG icons and accessible labels in the discipline cell.
- [ ] Use existing routes: library search for theory/video, question trainer with subject/topic filters, and mock exams with subject/topic context.
- [ ] Add responsive inline styling that preserves table height and wraps actions within the cell.
- [ ] Run typecheck, focused cronograma tests, build, and `bunx astryx doctor --built dist`.
- [ ] Commit and push the implementation to `main`.
