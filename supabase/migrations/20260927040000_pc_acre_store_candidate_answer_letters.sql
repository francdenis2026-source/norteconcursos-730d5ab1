-- The candidate asked whether their literal marked answer per item (not
-- just the correct/wrong verdict) is stored. It wasn't — extracted_data.items
-- only ever held the comparison verdict. This adds a parallel
-- "candidate_answers" map (item_number -> the letter the candidate actually
-- marked) for Polícia Civil do Acre 2017, the one exam in this session whose
-- raw answer list is still available (pasted by the candidate earlier in
-- this conversation). The other graded contests (PF, PRF, DEPEN, PP-Acre)
-- were graded in earlier sessions whose raw letters are no longer in
-- context — adding them now would mean guessing, which is not acceptable
-- per CONTENT_GOVERNANCE's honesty rule. The candidate would need to
-- re-paste those gabaritos for the same treatment.
update public.student_exam_documents
set extracted_data = extracted_data || jsonb_build_object(
  'candidate_answers', jsonb_build_object(
    '1','C','2','C','3','D','4','E','5','C','6','C','7','D','8','C','9','D','10','D',
    '11','B','12','A','13','A','14','D','15','A','16','B','17','B','18','E','19','E','20','B',
    '21','A','22','B','23','B','24','C','25','B','26','A','27','C','28','C','29','C','30','B',
    '31','E','32','C','33','B','34','E','35','D','36','C','37','A','38','E','39','C','40','B',
    '41','E','42','A','43','C','44','E','45','C','46','C','47','C','48','D','49','E','50','C',
    '51','D','52','C','53','E','54','B','55','C','56','C','57','D','58','C','59','E','60','B',
    '61','C','62','B','63','A','64','E','65','B','66','C','67','B','68','B','69','A','70','B',
    '71','B','72','D','73','E','74','D','75','B','76','A','77','A','78','D','79','A','80','D'
  )
)
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Civil do Acre'
  and contest_year = '2017'
  and doc_type = 'resultado';
