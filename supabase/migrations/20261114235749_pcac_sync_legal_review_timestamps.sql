-- Synchronize reviewed_at with explicit legal_review.review_date for reviewed PC-AC materials.
update public.study_materials
set reviewed_at=((legal_review->>'review_date')::date::timestamp at time zone 'UTC')
where contest_name='PC-AC 2026'
  and discipline='Legislação Institucional'
  and reviewed_at is null
  and legal_review->>'status' like 'reviewed%'
  and coalesce(legal_review->>'review_date','') ~ '^20[0-9]{2}-[0-9]{2}-[0-9]{2}$';
