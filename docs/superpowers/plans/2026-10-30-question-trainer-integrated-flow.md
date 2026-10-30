# Fluxo integrado do treinador de questões — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the question trainer advance on correct answers, explain incorrect answers clearly, and pause/resume time and session state during study consultations.

**Architecture:** Extend the existing `question-trainer.tsx` state machine instead of introducing a second modal flow. Reuse the current answer persistence, explanation panel, material links, filter state, and session restoration; add explicit pause metadata and a single integrated consultation state.

**Tech Stack:** React, TanStack Router, Supabase, existing shadcn/ui components, Vitest/Node test suite.

**Spec:** `docs/superpowers/specs/2026-10-30-question-trainer-integrated-flow-design.md`

## Global Constraints

- Do not alter stored answers, explanations, or legal sources.
- Do not count consultation time toward the question timer.
- Do not save the same response twice.
- Preserve filters, current index, answer state, and session when returning.
- Use existing safe internal links and validated official sources.

## Review Focus

- Correct-answer auto-advance must not skip persistence or double-submit.
- Incorrect-answer consultation must pause time and restore the exact question.
- Browser reload/back navigation must preserve the pending trainer state.
- Already answered questions must remain review-only and must not restart timing.
- Exit confirmation must distinguish returning to the session from ending it.

### Task 1: Model trainer timing and consultation state

**Files:** `src/routes/dashboard/question-trainer.tsx`; focused trainer state test.

- [ ] Write failing tests for pausing/resuming elapsed time, restoring a paused question, and excluding paused seconds.
- [ ] Run the focused tests and confirm failure.
- [ ] Implement `pausedAt`, `pausedReason`, `pauseTimer()`, `resumeTimer()`, and elapsed-time accumulation without resetting `startedAt`.
- [ ] Persist pause/session state through the existing trainer session mechanism.
- [ ] Run focused tests and typecheck.
- [ ] Commit `feat: preserve trainer pause state`.

### Task 2: Correct-answer feedback and automatic advance

**Files:** `src/routes/dashboard/question-trainer.tsx`; trainer feedback styles; focused trainer test.

- [ ] Test successful correct submission, failed save, duplicate clicks, and unmount cleanup.
- [ ] Add cancellation-safe auto-advance after successful correct submission.
- [ ] Render concise professional success feedback.
- [ ] Run focused tests and typecheck.
- [ ] Commit `feat: auto-advance correct trainer answers`.

### Task 3: Incorrect-answer explanation and consultation actions

**Files:** `src/routes/dashboard/question-trainer.tsx`; trainer stylesheet; focused trainer test.

- [ ] Test wrong-answer content and pause invocation for material, search, and source actions.
- [ ] Render sections for “Resposta correta”, “Por que”, “Exemplo” and “Erro comum”.
- [ ] Add consultation actions that pause before navigation and a compact paused-state indicator.
- [ ] Run focused tests and typecheck.
- [ ] Commit `feat: improve incorrect-answer review flow`.

### Task 4: Session restoration, exit behavior, and verification

**Files:** `src/routes/dashboard/question-trainer.tsx`; existing session helper if required; restore/navigation tests.

- [ ] Test reload restoration, filter preservation, answered-question review, and confirmed exit.
- [ ] Persist and restore the pending session without re-submitting answers.
- [ ] Clear the pending snapshot only after confirmed exit.
- [ ] Run typecheck, trainer tests, navigation tests, and the relevant full suite.
- [ ] Commit `feat: complete integrated trainer flow`.

### Task 5: Final review

- [ ] Run `npm run typecheck`.
- [ ] Run focused trainer/filter/navigation tests.
- [ ] Verify answer keys, counts, and legal explanations are unchanged.
- [ ] Confirm all commits are on `main`.
