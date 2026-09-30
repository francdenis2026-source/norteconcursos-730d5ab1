begin;

-- Quarantine the confirmed incomplete item without changing the historical key.
update public.official_exam_questions
set content_status = 'under_review', context_review_required = true,
    review_note = 'Texto-base ausente; recuperar e conferir no caderno oficial antes de liberar o treino.'
where id = '7eb19554-2285-443e-b21a-18530970d2e8';

-- A transcription/import note is not an individual legal audit.
update public.official_exam_questions
set content_status = 'under_review', legal_audit_completed = false,
    law_version_checked_at = null
where content_status = 'active'
  and subject ~* '(direito|legisla)'
  and (jsonb_array_length(legal_basis) = 0
       or review_note ~* '(aguardando revis[ãa]o|transcri[çc][ãa]o verbatim)');

update public.curated_question_catalog
set content_status = 'under_review'
where content_status = 'active' and subject ~* '(direito|legisla)'
  and (jsonb_array_length(legal_basis) = 0 or law_version_checked_at is null);

-- This explanation needs syllabus/source/jurisprudence review before publication.
update public.curated_question_catalog
set content_status = 'under_review'
where external_item_key = 'pfesc25-leg-03';

update public.curated_question_catalog
set explanation = replace(explanation,
  'de terceira fórmula, que exige múltiplas contas debitadas e múltiplas contas creditadas simultaneamente.',
  'de terceira fórmula, que envolve mais de uma conta debitada e uma única conta creditada. A quarta fórmula envolve múltiplas contas debitadas e múltiplas contas creditadas.')
where external_item_key = 'pfesc25-contab-05';

update public.curated_question_catalog
set explanation = replace(explanation,
  'um documento salvo em um serviço de nuvem só pode ser acessado, editado ou sincronizado enquanto o dispositivo do usuário estiver conectado à Internet.',
  'um documento previamente disponibilizado offline pode ser acessado e editado localmente sem Internet; o acesso aos recursos remotos e a sincronização das alterações dependem de conectividade com o serviço.')
where external_item_key = 'pfesc25-info-03';

update public.curated_question_catalog
set explanation = replace(replace(explanation,
  'o modelo mais adequado para quem deseja controle total sobre hardware e sistema operacional é o IaaS (Infraestrutura como Serviço).',
  'o IaaS (Infraestrutura como Serviço) permite gerenciar o sistema operacional, o armazenamento e as aplicações provisionadas, mas não confere controle sobre o hardware físico subjacente.'),
  'se deseja controlar totalmente a infraestrutura, deve optar por IaaS.',
  'se deseja administrar o sistema operacional e suas aplicações, pode optar por IaaS, mantendo a infraestrutura física sob responsabilidade do provedor.')
where external_item_key = 'pfesc25-info-08';

-- Distinguish authorship of commentary from original wording.
update public.curated_question_catalog set is_original = false
where external_item_key like 'pfesc25-%';

-- Shared eligibility for counts and guest content. Do not fabricate audit dates.
create or replace function public.has_verified_question_basis(
  p_subject text, p_basis jsonb, p_checked timestamptz
) returns boolean language sql stable set search_path = '' as $$
  select case
    when p_basis is null or jsonb_typeof(p_basis) <> 'array' then false
    when jsonb_array_length(p_basis) = 0 then not (coalesce(p_subject, '') ~* '(direito|legisla)')
    else p_checked is not null and p_checked <= now() and not exists (
      select 1 from jsonb_array_elements(p_basis) as b
      where coalesce(b->>'url', '') !~* '^https?://([a-z0-9-]+\.)*(planalto\.gov\.br|stf\.jus\.br|stj\.jus\.br|tst\.jus\.br|tse\.jus\.br|ohchr\.org|unodc\.org|un\.org)(/|$)'
    )
  end;
$$;

create or replace function public.get_daily_guest_questions(p_limit integer default 10)
returns setof public.official_exam_questions
language sql stable security definer set search_path = '' as $$
  select q.* from public.official_exam_questions q
  where q.content_status = 'active' and q.official_answer <> 'X'
    and not coalesce(q.context_review_required, false)
    and not (q.legal_review_required and not coalesce(q.legal_audit_completed, false))
    and public.has_verified_question_basis(q.subject, q.legal_basis, q.law_version_checked_at)
  order by md5(q.id::text || to_char(public.get_current_acre_date(), 'YYYY-MM-DD'))
  limit least(greatest(coalesce(p_limit, 10), 0), 10);
$$;
revoke all on function public.get_daily_guest_questions(integer) from public;
grant execute on function public.get_daily_guest_questions(integer) to anon, authenticated;

create or replace function public.get_public_question_count()
returns bigint language sql stable security definer set search_path = '' as $$
  select
    (select count(*) from public.official_exam_questions q
     where q.content_status = 'active' and q.official_answer <> 'X'
       and not coalesce(q.context_review_required, false)
       and not (q.legal_review_required and not coalesce(q.legal_audit_completed, false))
       and public.has_verified_question_basis(q.subject, q.legal_basis, q.law_version_checked_at))
    + (select count(*) from public.curated_question_catalog q
       where q.content_status = 'active'
         and public.has_verified_question_basis(q.subject, q.legal_basis, q.law_version_checked_at));
$$;
revoke all on function public.get_public_question_count() from public;
grant execute on function public.get_public_question_count() to anon, authenticated;

commit;
