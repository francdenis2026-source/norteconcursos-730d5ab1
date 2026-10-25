-- Only original, reviewed Cebraspe/Cespe security questions with explanatory comments.
create or replace function public._guest_question_pool(p_ids uuid[] default null)
returns table(question_id uuid,exam_year integer,official_answer text,question_text text,content_key text,question_format text,police boolean,discipline text,career text)
language sql stable set search_path='' as $$
 with enriched as materialized (
  select q.id,q.exam_year,q.official_answer,q.exam_board,q.subject,q.contest_name,q.career_name,q.career_category,
   case when nullif(trim(s.body),'') is not null and q.question_text !~ '^Texto-base' then
    'Texto-base'||case when nullif(trim(s.label),'') is not null then ' ['||s.label||']' else '' end||E':\n'||s.body||E'\n\n[[/texto-base]]\n'||q.question_text
   else q.question_text end as text
  from public.official_exam_questions q
  join public.syllabus_topics t on t.id=coalesce(q.current_syllabus_topic_id,q.syllabus_topic_id) and t.content_status='current'
  join public.syllabus_editions e on e.id=t.edition_id and e.status='active'
  left join public.question_support_texts s on s.id=q.support_text_id
  where (p_ids is null or q.id=any(p_ids)) and q.content_status='active' and q.official_answer <> 'X'
   and not coalesce(q.context_review_required,false)
   and not (coalesce(q.legal_review_required,false) and not coalesce(q.legal_audit_completed,false))
   and public.has_verified_question_basis(q.subject,q.legal_basis,q.law_version_checked_at)
   and q.contest_name !~* '\mENEM\M'
   and q.official_answer in ('C','E') and q.exam_board ~* '(CEBRASPE|CESPE)'
   and concat_ws(' ',q.contest_name,q.career_name,q.career_category) ~* '(pol[ií]cia|policial|bombeir|penitenci|execu[çc][ãa]o penal|seguran[çc]a p[úu]blica|guarda (civil|municipal)|perito criminal|m[ée]dico legista|\m(PF|PRF|DEPEN|SENAPPEN|CBM)\M)'
   and length(trim(regexp_replace(coalesce(q.review_note,''),'(?is)[[:space:]]*Conferência individual em fontes oficiais em .*$', ''))) >= 80
   and q.review_note !~* '(transcri[çc][ãa]o verbatim|importad[ao] do caderno|aguardando revis|^[[:space:]]*(Revisad[ao]|Arquivad[ao]|Retid[ao])|alternativ|op[çc][ãa]o [A-E])'
   and q.question_text !~* '(assinale|alternativ|op[çc][ãa]o (correta|incorreta))'

 ), usable as (
  select enriched.*,public._guest_question_kind(regexp_replace(text,'(?s)^Texto-base.*\[\[/texto-base\]\][[:space:]]*',''),enriched.official_answer,exam_board) as kind
  from enriched where length(trim(text))>=30
  -- Shared support text is attached above, without opening its table to visitors.
  and not (subject ~* '(portugu|reda[çc][ãa]o|interpreta)'
   and text !~ '^(Texto-base|Comando)( \[[^]]+\])?:'
   and text ~* '((no|do|ao|pelo|neste|deste|nesse|desse|o) texto|par[áa]grafo|linhas? [0-9]|segundo o autor)')
 )
 select id,usable.exam_year,usable.official_answer,text,md5(regexp_replace(lower(text),'[[:space:][:punct:]]','','g')),kind,
  ((coalesce(career_category,'')||' '||contest_name||' '||career_name) ~* '(pol[ií]cia|policial|penitenci[aá]rio|bombeiro)'),
  lower(trim(regexp_replace(subject,'^Noções de ','','i'))),contest_name||' / '||career_name
 from usable where kind='true_false'
$$;
revoke all on function public._guest_question_pool(uuid[]) from public, anon, authenticated;

