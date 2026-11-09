-- Store the student's personal exam-date override on their own profile.
-- If null, the dashboard falls back to the official date of the focused contest.
alter table public.profiles
  add column if not exists personal_exam_date date;
