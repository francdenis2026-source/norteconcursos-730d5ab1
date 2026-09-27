-- Cleanup: dozens of duplicate legacy rows exist in student_exam_documents under
-- contest_name='Polícia Federal' (score_net always null, stale unverified numbers
-- like 63/49 for 2018 or 58/17 for 2021 — the same figures HANDOFF.md flagged as
-- never having been confirmed item-by-item). These are distinct from, and were
-- causing a duplicate "Polícia Federal" tab alongside, the verified
-- 'Agente de Polícia Federal' rows inserted in this session's migrations
-- (20260926090000 through 20260926170000). Removes all of them for this
-- candidate, by explicit request, keeping only the verified career_name buckets
-- ('Agente de Polícia Federal' and 'Polícia Rodoviária Federal').
delete from public.student_exam_documents
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Federal';
