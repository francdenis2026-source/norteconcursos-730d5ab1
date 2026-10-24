"""Render a concrete, transactional publication SQL with conflict and syllabus guards."""
import pathlib,json,sys,hashlib
package=json.loads(pathlib.Path(sys.argv[1]).read_text());rows=package['rows'];assert rows
for r in rows:
 assert len(r['quiz'])==20 and r['review']['status']=='reviewed' and r['review']['material_slug']==r['slug']
 assert all(all(i[k]==q[k] for k in ['q','a','why']) for q,i in zip(r['quiz'],r['review']['items']))
payload=json.dumps(rows,ensure_ascii=False,separators=(',',':'));tag='$material_practice_'+hashlib.sha256(payload.encode()).hexdigest()[:16]+'$';assert tag not in payload
sql='''begin;
create temp table material_practice_patch on commit drop as
select * from jsonb_to_recordset(PAYLOAD::jsonb) as x(id uuid,slug text,subject text,expected_updated_at timestamptz,expected_quiz jsonb,quiz jsonb,review jsonb);
do $guard$
begin
 if exists (
  select 1 from material_practice_patch p left join public.study_materials m on m.id=p.id
  where m.id is null or m.slug<>p.slug or m.content_status<>'active' or not (
    (m.quiz=p.quiz and m.practice_review=p.review) or
    (m.quiz=p.expected_quiz and m.updated_at=p.expected_updated_at and m.practice_review is null)
  )
 ) then raise exception 'Material changed after review. No content was overwritten.'; end if;
 if exists (
  select 1 from material_practice_patch p
  left join public.syllabus_topics t on t.id=(p.review->>'syllabus_topic_id')::uuid
  left join public.syllabus_editions e on e.id=t.edition_id
  where t.id is null or t.content_status<>'current' or e.status<>'active'
 ) then raise exception 'Syllabus reference is no longer current. Nothing applied.'; end if;
 if exists (select 1 from material_practice_patch p where jsonb_array_length(p.quiz)<>20 or jsonb_array_length(p.review->'items')<>20) then
  raise exception 'Incomplete practice snapshot. Nothing applied.';
 end if;
end $guard$;
update public.study_materials m
set quiz=p.quiz, practice_review=p.review
from material_practice_patch p
where m.id=p.id and (m.quiz is distinct from p.quiz or m.practice_review is distinct from p.review);
do $verify$
begin
 if exists (select 1 from material_practice_patch p join public.study_materials m on m.id=p.id where m.quiz is distinct from p.quiz or m.practice_review is distinct from p.review) then
  raise exception 'Readback mismatch. Transaction rolled back.';
 end if;
end $verify$;
select count(*) as confirmed_materials, sum(jsonb_array_length(p.quiz)-jsonb_array_length(p.expected_quiz)) as additional_exercises
from material_practice_patch p join public.study_materials m on m.id=p.id where m.quiz=p.quiz and m.practice_review=p.review;
commit;
'''.replace('PAYLOAD',tag+payload+tag)
pathlib.Path(sys.argv[2]).write_text(sql);print('rendered',len(rows),'materials',len(sql.encode()),'SQL bytes')
