import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { reviewChanges } from '../review-question-corpus.mjs';
const root = 'supabase/imports/idecan';
const directory = path.join(root, 'revisao-2026-10-23');

export function reviewSql(changes, label = 'Primeira revisão PC-CE 2021: 20 pareceres de Português e 3 anuladas.') {
  if (typeof label !== 'string' || /[\r\n]/.test(label)) throw Error('Título SQL inválido');
  if (!changes.length || changes.some((c) => c.next_payload.publication || c.next_payload.individual_review?.publication_approved !== false))
    throw Error('Este lote não autoriza publicação');
  const data = JSON.stringify(changes), delimiter = '$idecan_review_batch$';
  if (data.includes(delimiter) || data.includes('$review$')) throw Error('Delimitador no conteúdo');
  return `-- ${label}
-- Executar como administrador no SQL Editor. Não ativa questões.
-- Requer a migração existente 20261010110000_audited_corpus_reviews.sql.
-- Usa os mesmos estados, comparação de payload e histórico da revisão de acervo.
begin;
do $review$
declare
  change jsonb;
  stored public.question_corpus_candidates;
begin
  if current_user not in ('postgres','supabase_admin') then
    if coalesce(auth.role(),'') <> 'service_role' and not coalesce(public.has_role(auth.uid(),'admin'),false) then
      raise exception 'Administrator required';
    end if;
  end if;
  if to_regclass('public.question_corpus_review_audit') is null then
    raise exception 'Aplique antes a migração existente 20261010110000_audited_corpus_reviews.sql';
  end if;
  for change in select value from jsonb_array_elements(${delimiter}${data}${delimiter}::jsonb) loop
    select * into stored from public.question_corpus_candidates where id=change->>'candidate' for update;
    if not found then raise exception 'Candidato não encontrado; aplique antes o acervo de 200 itens'; end if;
    if stored.content_status=change->>'next_status' and stored.payload=change->'next_payload' then continue; end if;
    if stored.content_status is distinct from change->>'expected_status'
      or stored.payload is distinct from change->'expected_payload' then
      raise exception 'Revisão desatualizada: decisão existente preservada; recarregue o candidato';
    end if;
    if stored.content_status <> 'under_review' then raise exception 'Decisão anterior protegida'; end if;
    if change->'next_payload'->'raw_text' is distinct from stored.payload->'raw_text' then
      raise exception 'Extração original protegida';
    end if;
    if change->'next_payload' ? 'publication'
      or change#>>'{next_payload,individual_review,publication_approved}' is distinct from 'false' then
      raise exception 'Este lote não permite publicação';
    end if;
    insert into public.question_corpus_review_audit(candidate_id,previous_status,next_status,previous_payload,next_payload,reviewer_id)
    values(stored.id,stored.content_status,change->>'next_status',stored.payload,change->'next_payload',auth.uid());
    update public.question_corpus_candidates set content_status=change->>'next_status',payload=change->'next_payload' where id=stored.id;
  end loop;
end $review$;
commit;
-- reviewed significa parecer registrado, não autorização de publicação.
select s.title,c.content_status,count(*) as candidates
from public.question_corpus_sources s join public.question_corpus_candidates c on c.corpus_id=s.id
where s.id in ('56a363de9d9c7d346d116c9e4d86cd8f5d737222ea51595a906c8596813c6cfe','a835d92983601375c77355a50f68bdc77092e4fb88fdb9686ff453b8ed2fd57d')
group by s.title,c.content_status order by s.title,c.content_status;
`;
}

export function buildReview(original, role, notes, support) {
  const next = structuredClone(original), stamp = notes.reviewed_at;
  for (const note of notes[role]) {
    const c = next.candidates.find((candidate) => candidate.payload.item_number === note.item);
    if (!c || c.discipline !== 'LÍNGUA PORTUGUESA') throw Error('Item/disciplina divergente');
    const ambiguous = c.payload.answer_key_requires_clarification;
    const blockers = ['vinculo_a_topico_de_edital_ativo_nao_conferido'];
    if (ambiguous) blockers.push('cabecalho_preliminar_em_documento_listado_como_definitivo');
    if (note.extra_blocker) blockers.push(note.extra_blocker);
    c.content_status = 'reviewed';
    c.payload.individual_review = {
      review_stage: 'primeiro_parecer_pedagogico_com_publicacao_retida',
      reviewed_at: stamp, publication_approved: false,
      context_complete: true, visual_checked: true,
      answer_verified: !ambiguous,
      pedagogical_check_complete: note.pedagogical_check_complete !== false,
      legal_review_applicability: 'nao_juridica',
      question_format: 'multiple_choice',
      observed_topic: note.topic, observed_style: note.style,
      explanation: note.explanation,
      blockers,
      primary_evidence: [{ title: 'Gabarito PC-CE — seção do respectivo cargo, Tipo B', url: original.source.metadata.answer_key_url, page: role === 'escrivao' ? 1 : 3, verified: true, checked_at: stamp, sha256: original.source.metadata.answer_key_sha256, scope: ambiguous ? 'Documento e divergência do cabeçalho conferidos; resposta definitiva NÃO certificada' : 'Letra oficial da seção Escrivão B conferida visualmente' }],
      booklet_evidence: { url: original.source.metadata.booklet_url, host_type: 'mirror', sha256: original.source.id, source_pages: c.payload.source_pages, checked_at: stamp, pdf_visual_checked: true },
      restored_context: {
        support_passage: support[role],
        reference_segments: note.focus,
        original_underline_segments: (role === 'inspetor' ? [3, 4, 5, 7, 8, 10] : [7, 8, 10]).includes(note.item) ? note.focus : [],
        typography_note: 'Termos identificados visualmente na página; a extração original não foi reescrita.',
        original_exam_required_for_symbolic_notation: role === 'inspetor' && note.item === 7,
      },
    };
  }
  if (role === 'escrivao') {
    for (const number of [18, 43, 79]) {
      const c = next.candidates.find((candidate) => candidate.payload.item_number === number);
      if (!c.payload.annulled_in_document || c.payload.answer_in_official_document !== 'X') throw Error('Anulação divergente');
      c.content_status = 'rejected';
      c.payload.individual_review = {
        reviewed_at: stamp, review_stage: 'anulacao_confirmada_no_gabarito_definitivo',
        publication_approved: false, answer_verified: true, context_complete: false,
        exclusion_reason: 'annulled',
        explanation: `Escrivão Tipo B, questão ${number}: asterisco no gabarito definitivo da página 1; a legenda identifica questão anulada. Manter para rastreabilidade histórica, fora dos treinos. Não foi realizada revisão jurídica substantiva deste item.`,
        primary_evidence: [{ title: 'Gabarito definitivo PC-CE, Escrivão Tipo B', url: original.source.metadata.answer_key_url, page: 1, verified: true, checked_at: stamp, sha256: original.source.metadata.answer_key_sha256 }],
      };
    }
  }
  return { next, changes: reviewChanges(original, next) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const notes = JSON.parse(fs.readFileSync(path.join(directory, 'pareceres-portugues.json')));
  const support = JSON.parse(fs.readFileSync(path.join(directory, 'textos-apoio.json')));
  const changes = [], queue = [];
  for (const role of ['inspetor', 'escrivao']) {
    const original = JSON.parse(fs.readFileSync(path.join(root, `pcce_${role}_2021_corpus.json`)));
    const result = buildReview(original, role, notes, support);
    fs.writeFileSync(path.join(directory, `pcce_${role}_2021_revisado.json`), JSON.stringify(result.next, null, 2) + '\n');
    changes.push(...result.changes);
    for (const c of result.next.candidates) {
      const blockers = c.payload.individual_review?.blockers ?? [];
      if (c.content_status === 'under_review') {
        blockers.push('revisao_individual_pendente', 'contexto_e_formatacao_pendentes', 'vinculo_a_edital_ativo_nao_conferido');
        if (c.payload.answer_key_requires_clarification) blockers.push('gabarito_de_inspetor_pendente');
        if (c.payload.legal_review_required) blockers.push('fonte_juridica_oficial_e_vigencia_nao_conferidas');
        if (c.payload.local_legislation_review_required) blockers.push('legislacao_cearense_nao_transferir_ao_acre');
      }
      queue.push({ candidate_id: c.id, role, number: c.payload.item_number, discipline: c.discipline, proposed_status: c.content_status, publication_approved: false, blockers, triage_only: c.content_status === 'under_review' });
    }
  }
  fs.writeFileSync(path.join(directory, 'aplicar-primeira-revisao.sql'), reviewSql(changes));
  fs.writeFileSync(path.join(directory, 'fila-revisao.json'), JSON.stringify({ reviewed_at: notes.reviewed_at, remote_application_verified: false, items: queue }, null, 2) + '\n');
  console.log(JSON.stringify({ decisions: changes.length, reviewed_held: queue.filter((c) => c.proposed_status === 'reviewed').length, rejected_annulled: queue.filter((c) => c.proposed_status === 'rejected').length, remaining_under_review: queue.filter((c) => c.proposed_status === 'under_review').length, publication_approved: 0 }));
}
