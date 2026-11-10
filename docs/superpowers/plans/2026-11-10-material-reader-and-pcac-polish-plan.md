# Material Reader and PC-AC Visual Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a spacious, standardized theory reader with manual highlights, notes, watermarked PDF export, then compact and professionalize the PC-AC materials banner.

**Architecture:** Keep the original Markdown immutable. Add a reusable reading annotation layer keyed by user and material slug, and a PDF export utility using the existing `jspdf` dependency. Refine the existing material and PC-AC CSS without removing study tabs or official sources.

**Tech Stack:** React, TypeScript, Tailwind/CSS, jsPDF, local persistence with Supabase-ready user keys.

**Spec:** `docs/superpowers/specs/2026-11-10-material-reader-design.md`

## Global Constraints

- Do not edit or replace official published text.
- Keep legal notices, source links, and study tabs.
- Every exported PDF includes site and developer watermark.
- Preserve responsive behavior and existing automatic highlights.

## Review Focus

- Selection with no text: no annotation is created.
- Multiple materials/users: notes and marks remain isolated by user/material.
- PDF export with no notes or marks: still exports readable source text with watermark.
- Long content: PDF paginates without clipping the footer watermark.
- PC-AC banner on narrow screens: actions wrap without overflow or excessive height.

### Task 1: Full theory reader

**Files:**
- Create: `src/components/library/ReadingAnnotations.tsx`
- Create: `src/lib/materialPdf.ts`
- Modify: `src/routes/dashboard/library.$slug.tsx`
- Modify: `src/styles/student-library-media-workspaces.css`

- [ ] Add persisted manual highlights and notes keyed by authenticated user and material slug.
- [ ] Add compact highlight toolbar with selectable colors and a notes panel.
- [ ] Add PDF export with material title, source text, notes, marks, site name and developer watermark.
- [ ] Expand the reader container and standardize prose typography and spacing for all disciplines.
- [ ] Preserve automatic `HighlightToggle`, sources and tabs.
- [ ] Run `git diff --check` and commit.

### Task 2: PC-AC materials banner polish

**Files:**
- Modify: `src/routes/dashboard/material.tsx`
- Modify: `src/styles/student-library-media-workspaces.css`
- Reuse: existing Acre/PC-AC assets already in `public`.

- [ ] Compact the banner so title, description, actions and discipline chips form clear groups.
- [ ] Add a subtle Acre identity treatment using existing project asset or color palette, without overpowering content.
- [ ] Standardize clickable controls and reduce unnecessary vertical height.
- [ ] Verify mobile wrapping and `git diff --check`.
- [ ] Commit.

### Task 3: Verification and publish

- [ ] Run the available build/type check; record the dependency limitation if unavailable.
- [ ] Review source links, legal notices, PDF watermark and persistence keys.
- [ ] Publish to `main`.
