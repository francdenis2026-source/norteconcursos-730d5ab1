-- Corrige somente três transcrições da prova PMSC Tipo A, itens 20–22.
-- Mantém os itens em under_review: não há vínculo de edital aprovado nesta etapa.
-- Fonte do caderno: SHA-256 e60c319a40fb68f495555e7fad113bda8c9b109275000b0bd5c450fbd9ff24ec, página 7.
-- Gabarito oficial definitivo: SHA-256 f51d31107761b10a920b25f87b1848b9ef082fd5f659997d6e068c92ae4d01fd.
-- O bloco compara campos originais antes da escrita e grava o antes/depois na auditoria.

begin;

do $audit$
begin
  if to_regclass('public.idecan_pedagogical_review_audit') is null then
    create table public.idecan_pedagogical_review_audit (
      id bigint generated always as identity primary key,
      batch_key text not null,
      question_id uuid not null references public.board_exam_questions(id),
      before_data jsonb not null,
      after_data jsonb not null,
      evidence jsonb not null,
      reviewer_id uuid,
      reviewed_at timestamptz not null default now(),
      unique(batch_key, question_id)
    );
  end if;
end
$audit$;

do $review$
declare
  q public.board_exam_questions;
  old_data jsonb;
  new_data jsonb;
  corrected_options jsonb;
  corrected_stem text;
  corrected_explanation text;
  item integer;
  qid uuid;
  existing public.idecan_pedagogical_review_audit;
  batch constant text := 'idecan-pmsc-ti-transcription-v1';
  source_hash constant text := 'e60c319a40fb68f495555e7fad113bda8c9b109275000b0bd5c450fbd9ff24ec';
  key_hash constant text := 'f51d31107761b10a920b25f87b1848b9ef082fd5f659997d6e068c92ae4d01fd';
begin
  for item in 20..22 loop
    select id into qid
    from public.board_exam_questions
    where board = 'IDECAN'
      and contest_name = 'PMSC - Aluno-Soldado Temporário 2026'
      and exam_type = 'Tipo A'
      and item_number = item
    for update;

    if not found then raise exception 'Questão PMSC item % ausente; lote cancelado', item; end if;
    select * into q from public.board_exam_questions where id = qid;
    old_data := to_jsonb(q);

    select * into existing from public.idecan_pedagogical_review_audit
    where batch_key = batch and question_id = qid;
    if found then
      if old_data is distinct from existing.after_data then
        raise exception 'Questão % foi alterada depois do lote; revisão posterior preservada', item;
      end if;
      continue;
    end if;

    if q.content_status <> 'under_review'
      or q.official_answer <> (case item when 20 then 'E' when 21 then 'D' else 'B' end)
      or q.source_url <> 'https://arquivos.qconcursos.com/prova/arquivo_prova/147684/idecan-2026-cbm-sc-aluno-soldado-temporario-prova.pdf'
      or q.answer_key_url <> 'https://arquivos.qconcursos.com/prova/arquivo_gabarito/147684/idecan-2026-cbm-sc-aluno-soldado-temporario-gabarito.pdf'
    then raise exception 'Estado/gabarito/fonte divergente na questão %; lote cancelado', item; end if;

    if item = 20 then
      if q.stem <> 'Em uma distribuição Linux baseada no ambiente gráfico Xfce, o usuário interage com um gerenciador de arquivos leve, de código aberto, projetado para ser rápido e integrado ao próprio desktop, com suporte nativo a extensões como scripts e ações personalizadas. Esse software é conhecido como:'
        or q.options <> '{"A":"Firefox.","B":"Gedit.","C":"PulseAudio.","D":"Spam.","E":"Thunar."}'::jsonb
      then raise exception 'Transcrição atual da questão 20 diverge; lote cancelado'; end if;
      corrected_stem := q.stem;
      corrected_options := '{"A":"Firefox.","B":"Gedit.","C":"PulseAudio.","D":"File Explorer.","E":"Thunar."}'::jsonb;
      corrected_explanation := 'Thunar é o gerenciador de arquivos associado ao ambiente Xfce. A alternativa E corresponde ao gabarito definitivo. “File Explorer” é o nome de outro gerenciador; a alternativa D foi restaurada conforme o caderno. Exemplo: no Xfce, abrir uma pasta no gerenciador padrão normalmente inicia o Thunar.';
    elsif item = 21 then
      if q.stem <> 'Em uma planilha eletrônica, as células A4, B4 e C4 contêm, respectivamente, os valores 5, 6 e 35. Na célula D4, foi inserida a fórmula =SE(A4*B4<C4; “Válido”; “Inválido”). O resultado exibido em D4 será: plataforma é identificada como:'
        or q.options <> '{"A":"Zoom.","B":"Google Meet.","C":"FALSO.","D":"Válido.","E":"Erro."}'::jsonb
      then raise exception 'Transcrição atual da questão 21 diverge; lote cancelado'; end if;
      corrected_stem := 'Em uma planilha eletrônica, as células A4, B4 e C4 contêm, respectivamente, os valores 5, 6 e 35. Na célula D4, foi inserida a fórmula =SE(A4*B4<C4; “Válido”; “Inválido”). O resultado exibido em D4 será:';
      corrected_options := '{"A":"Inválido.","B":"VERDADEIRO.","C":"FALSO.","D":"Válido.","E":"Erro."}'::jsonb;
      corrected_explanation := 'Calcule primeiro o teste lógico: A4×B4 = 5×6 = 30. Como 30 é menor que 35, a condição é verdadeira e a função SE retorna o primeiro texto, “Válido”, alternativa D. Exemplo: SE(2<3; “Sim”; “Não”) retorna “Sim”.';
    else
      if q.stem <> 'Um software malicioso é instalado silenciosamente em um computador corporativo e, sem o consentimento do usuário, passa a registrar as teclas digitadas, capturar screenshots e exfiltrar credenciais de acesso a sistemas internos para um servidor controlado por atores maliciosos. Esse tipo de ameaça é classificado como:'
        or q.options <> '{"A":"Módulo de Plataforma Confiável (TPM).","B":"Unidade de Processamento Gráfico (GPU).","C":"Memória de Acesso Aleatório (RAM).","D":"Controlador de Disco Rígido (HDD Controller).","E":"Adaptador de Rede (NIC)."}'::jsonb
      then raise exception 'Transcrição atual da questão 22 diverge; lote cancelado'; end if;
      corrected_stem := q.stem;
      corrected_options := '{"A":"Ransomware.","B":"Spyware.","C":"Phishing.","D":"Spam.","E":"Firewall."}'::jsonb;
      corrected_explanation := 'O comportamento descrito — coleta oculta de teclas, capturas de tela e credenciais — caracteriza spyware, alternativa B, conforme o gabarito definitivo. Um keylogger é uma ferramenta de registro de teclas que pode integrar uma operação de spyware. Exemplo: um programa instalado sem consentimento que envia credenciais a terceiros.';
    end if;

    update public.board_exam_questions set
      stem = corrected_stem,
      options = corrected_options,
      explanation = corrected_explanation,
      content_status = 'under_review',
      verified_at = now(),
      review_note = 'Transcrição conferida com caderno IDECAN PMSC Tipo A, página 7; gabarito definitivo confirmado. Correção de extração auditada. Mantida sob revisão até validação de vínculo com edital vigente.'
    where id = qid returning to_jsonb(board_exam_questions) into new_data;

    insert into public.idecan_pedagogical_review_audit
      (batch_key, question_id, before_data, after_data, evidence, reviewer_id)
    values (batch, qid, old_data, new_data,
      jsonb_build_object(
        'booklet_sha256', source_hash,
        'answer_key_sha256', key_hash,
        'booklet_page', 7,
        'historical_answer_preserved', true,
        'publication_approved', false,
        'reason_held', 'vínculo de edital vigente não validado'
      ), auth.uid());
  end loop;
end
$review$;

commit;

select q.item_number, q.content_status, q.official_answer,
       q.stem, q.options, q.explanation, a.evidence
from public.board_exam_questions q
join public.idecan_pedagogical_review_audit a
  on a.question_id = q.id
where a.batch_key = 'idecan-pmsc-ti-transcription-v1'
order by q.item_number;
