-- INCIDENT FIX: at some point after the 2026-09-29/30 bulk import work, every
-- row in official_exam_questions with content_status='under_review' was
-- flipped to 'active' (apparently a broad, unscoped UPDATE run directly
-- against the live database, outside of any committed migration — no
-- migration file in this repo contains an unscoped
-- "set content_status='active'"). This made unreviewed, unverified legal
-- content visible to students, and conflated months of careful item-by-item
-- audit work (PRF 2019, DEPEN 2021, PRF 2021 "lote" reviews) with content
-- that was never reviewed at all.
--
-- This migration reverts ONLY the rows that were never actually reviewed.
-- Every import migration in this repo writes one of three boilerplate
-- review_note markers on freshly-imported, not-yet-audited rows:
--   "Transcrição verbatim", "aguardando revis[ãa]o", "gabarito conferido"
-- A genuine audit/lote migration always REPLACES review_note with a real
-- didactic explanation and never contains any of these three markers
-- (verified: zero overlap across every "everyday_explanations"/"review_wave"/
-- "legal_audit" migration in this repo's history). So any row currently
-- 'active' whose review_note still carries one of these markers was never
-- actually reviewed and must go back to 'under_review'. Annulled rows are
-- untouched (the incident only flipped 'under_review' rows, not 'annulled').

update public.official_exam_questions
set content_status = 'under_review'
where content_status = 'active'
  and (
    review_note ilike '%Transcrição verbatim%'
    or review_note ilike '%aguardando revis%'
    or review_note ilike '%gabarito conferido%'
  );
