-- Auditoria individual das marcações das provas realizadas pelo candidato.
-- O gabarito definitivo é sempre obtido de official_exam_questions. Uma
-- marcação ilegível nunca é convertida em acerto ou erro por inferência.

create table if not exists public.student_exam_item_audits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  contest_year text not null,
  item_number integer not null check (item_number between 1 and 120),
  official_question_id uuid references public.official_exam_questions(id) on delete set null,
  candidate_answer text check (candidate_answer in ('C', 'E')),
  official_answer text not null check (official_answer in ('C', 'E', 'X')),
  comparison_status text not null check (comparison_status in ('correct', 'wrong', 'annulled', 'blank', 'indeterminate')),
  reading_confidence text not null default 'indeterminate' check (reading_confidence in ('high', 'medium', 'low', 'indeterminate')),
  evidence_note text,
  audited_at timestamptz not null default now(),
  unique (user_id, contest_year, item_number)
);

alter table public.student_exam_item_audits enable row level security;

drop policy if exists "Students read own exam item audits" on public.student_exam_item_audits;
create policy "Students read own exam item audits"
  on public.student_exam_item_audits for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Admins manage exam item audits" on public.student_exam_item_audits;
create policy "Admins manage exam item audits"
  on public.student_exam_item_audits for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create index if not exists idx_student_exam_item_audits_user_year
  on public.student_exam_item_audits(user_id, contest_year, item_number);

-- Cria uma linha para cada item de cada prova enviada. Itens sem leitura
-- confiável permanecem indeterminados; anulações vêm do gabarito definitivo.
insert into public.student_exam_item_audits (
  user_id, contest_year, item_number, official_question_id,
  official_answer, comparison_status, reading_confidence, evidence_note
)
select distinct
  d.user_id,
  d.contest_year,
  q.item_number,
  q.id,
  q.official_answer,
  case when q.official_answer = 'X' then 'annulled' else 'indeterminate' end,
  case when q.official_answer = 'X' then 'high' else 'indeterminate' end,
  case
    when q.official_answer = 'X' then 'Item anulado no gabarito definitivo oficial.'
    else 'A marcação manuscrita ainda não possui leitura individual confiável.'
  end
from public.student_exam_documents d
join public.official_exam_questions q on q.exam_year::text = d.contest_year
where d.contest_name ilike '%Polícia Federal%'
on conflict (user_id, contest_year, item_number) do update set
  official_question_id = excluded.official_question_id,
  official_answer = excluded.official_answer,
  comparison_status = case
    when excluded.official_answer = 'X' then 'annulled'
    else public.student_exam_item_audits.comparison_status
  end,
  audited_at = now();

-- Aproveita somente transcrições individualizadas já existentes. A confiança
-- original é preservada para que a interface não apresente leitura incerta
-- como fato confirmado.
update public.student_exam_item_audits a
set
  candidate_answer = q.candidate_answer,
  comparison_status = case
    when a.official_answer = 'X' then 'annulled'
    when q.candidate_answer is null then 'indeterminate'
    when q.candidate_answer = a.official_answer then 'correct'
    else 'wrong'
  end,
  reading_confidence = case q.source_confidence
    when 'alta' then 'high'
    when 'media' then 'medium'
    when 'baixa' then 'low'
    else 'indeterminate'
  end,
  evidence_note = case
    when a.official_answer = 'X' then 'Item anulado no gabarito definitivo oficial.'
    when q.candidate_answer is null then 'Marcação não legível na imagem.'
    else 'Resposta manuscrita transcrita da imagem e comparada ao gabarito definitivo.'
  end,
  audited_at = now()
from public.question_bank q
where q.user_id = a.user_id
  and q.contest_year = a.contest_year
  and q.item_number = a.item_number;

-- Na prova de 2014, os X de correção estão nítidos nestes 16 itens. Somados
-- aos itens 59 e 60, já transcritos individualmente em question_bank, eles
-- reproduzem os 18 erros anotados na capa. A resposta escolhida é o inverso
-- do gabarito C/E, pois o próprio candidato marcou o item como erro.
update public.student_exam_item_audits
set
  candidate_answer = case official_answer when 'C' then 'E' else 'C' end,
  comparison_status = 'wrong',
  reading_confidence = 'high',
  evidence_note = 'Marcação manuscrita de erro legível na imagem, comparada ao gabarito definitivo.',
  audited_at = now()
where contest_year = '2014'
  and official_answer in ('C','E')
  and item_number in (3,5,8,15,19,26,33,40,43,47,54,101,108,112,113,117);

-- Registra, sem apagar a conferência anterior, o resultado da nova auditoria
-- baseada no gabarito definitivo. Os totais de 2014, 2018 e 2021 continuam
-- identificados como leitura manual; 2025 vem do BDI oficial do CEBRASPE.
update public.student_exam_documents d
set extracted_data = jsonb_set(
  coalesce(d.extracted_data, '{}'::jsonb),
  '{auditoria_gabarito_definitivo}',
  case d.contest_year
    when '2014' then jsonb_build_object(
      'fonte_resultado', 'resumo manuscrito da capa',
      'acertos', 51, 'erros', 18,
      'anuladas_oficiais', jsonb_build_array(21,46,57,61,77,84,111),
      'observacao', 'A conferência item a item permanece parcial onde a marcação não está legível.'
    )
    when '2018' then jsonb_build_object(
      'fonte_resultado', 'conferência manual das marcações',
      'acertos', 63, 'erros', 49, 'saldo_estimado', 14,
      'anuladas_oficiais', jsonb_build_array(29,30,51,78,91,117),
      'divergencia_corrigida', 'A lista anterior tratava 77, 92 e 115 como anuladas e omitia 91.'
    )
    when '2021' then jsonb_build_object(
      'fonte_resultado', 'conferência manual das marcações',
      'acertos_confirmados', 58, 'erros_confirmados', 17,
      'anuladas_oficiais', jsonb_build_array(28,92,106,108,119),
      'observacao', 'A auditoria anterior havia identificado apenas a anulação do item 28.'
    )
    when '2025' then jsonb_build_object(
      'fonte_resultado', 'Boletim de Desempenho Individual oficial CEBRASPE',
      'acertos', 82, 'erros', 26, 'nota_liquida', 56,
      'anuladas_oficiais', jsonb_build_array(37,52,62,69,85,91,94,111,112,117),
      'divergencia_corrigida', 'A leitura visual anterior (79 acertos e 22 erros) foi substituída pelos totais oficiais do BDI.'
    )
    else '{}'::jsonb
  end,
  true
)
where d.contest_name ilike '%Polícia Federal%'
  and d.contest_year in ('2014','2018','2021','2025')
on conflict (user_id, contest_year, item_number) do nothing;
