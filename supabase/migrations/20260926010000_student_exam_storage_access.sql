-- Students may create signed URLs only for files linked to their own account.
create policy "Users can view own student exam files"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'student-exams'
    and exists (
      select 1
      from public.student_exam_documents document
      where document.user_id = auth.uid()
        and document.storage_path = name
    )
  );
