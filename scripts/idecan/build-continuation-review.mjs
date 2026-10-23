import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { reviewChanges } from '../review-question-corpus.mjs';
import { digest } from '../import-question-corpus.mjs';
import { reviewSql } from './build-first-review.mjs';
export const reviewDirectory = 'supabase/imports/idecan/continuacao-2026-10-23';
const baselineDirectory = 'supabase/imports/idecan/revisao-2026-10-23';
const read = (file) => JSON.parse(fs.readFileSync(file));

export function buildContinuation(previous, role, notes, evidence, textChecks, keyChecks) {
  const next = structuredClone(previous), seen = new Set();
  const pending = previous.candidates.filter((c) => c.content_status === 'under_review');
  if (notes[role].length !== pending.length) throw Error('Cobertura incompleta da continuação');
  if (!Number.isFinite(Date.parse(notes.reviewed_at)) || Date.parse(notes.reviewed_at) > Date.now()) throw Error('Data inválida');
  const keyCheck = keyChecks[role];
  if (keyCheck.matches !== 100 || keyCheck.positions_checked !== 100 || keyCheck.document_sha256 !== previous.source.metadata.answer_key_sha256)
    throw Error('Gabarito sem cotejo integral do caderno');
  for (const note of notes[role]) {
    const c = next.candidates.find((x) => x.payload.item_number === note.item);
    if (!c || c.content_status !== 'under_review' || seen.has(c.id)) throw Error('Candidato repetido ou decisão anterior protegida');
    seen.add(c.id);
    if (!note.topic || note.explanation.length < 100 || !note.style || !['reviewed','obsolete'].includes(note.decision)) throw Error('Parecer incompleto');
    const check = textChecks[c.id];
    if (!check?.all_extracted_lines_found_in_pdf || check.booklet_sha256 !== previous.source.id) throw Error('Cotejo literal pendente');
    const primaryEvidence = note.references.map((ref) => {
      const [key, article = 'document'] = ref.split(':');
      const source = evidence.sources[key], quote = source?.excerpts[article];
      if (!source?.retrieval_verified || source.http_status !== 200 || !quote || !/^[a-f0-9]{64}$/.test(source.sha256)) throw Error(`Referência sem evidência: ${ref}`);
      return {
        reference: ref, title: source.title, url: source.url,
        checked_at: source.checked_at, verified: true, sha256: source.sha256,
        excerpt_sha256: digest(quote), excerpt_artifact: `fontes-e-excertos.json#/sources/${key}/excerpts/${article}`,
        scope: source.scope,
      };
    });
    if (note.decision === 'obsolete' && !primaryEvidence.length) throw Error('Superação sem fonte oficial');
    const legal = c.payload.legal_review_required === true;
    const blockers = ['vinculo_a_topico_de_edital_ativo_nao_conferido','revisao_final_de_contexto_e_formatacao'];
    if (legal) blockers.push('vigencia_integral_nao_certificada_no_planalto');
    if (keyCheck.section_heading_ambiguous) blockers.push('cabecalho_preliminar_em_documento_listado_como_definitivo');
    blockers.push(...note.flags);
    const sourceMeta = previous.source.metadata;
    c.content_status = note.decision;
    c.payload.individual_review = {
      review_stage: 'parecer_individual_de_continuacao_com_publicacao_retida', reviewed_at: notes.reviewed_at,
      publication_approved: false, answer_verified: false,
      historical_answer_letter_checked: !keyCheck.section_heading_ambiguous,
      historical_answer_letter: c.payload.answer_in_official_document,
      context_complete: false, visual_checked: false,
      literal_pdf_text_checked: true, literal_check_artifact: `cotejo-literal-pdf.json#/${c.id}`,
      ...(legal ? { legal_current: false, legal_review_status: 'certificacao_integral_pendente' } : { legal_review_applicability: 'nao_juridica' }),
      question_format: 'multiple_choice', observed_topic: note.topic, observed_style: note.style,
      explanation: note.explanation, blockers: [...new Set(blockers)],
      primary_evidence: primaryEvidence,
      answer_key_evidence: {
        url: sourceMeta.answer_key_url, sha256: sourceMeta.answer_key_sha256,
        page: role === 'escrivao' ? 1 : 3, checked_at: keyCheck.checked_at,
        section_heading_ambiguous: keyCheck.section_heading_ambiguous,
        scope: 'Letra transcrita conferida no documento; isso não certifica a validade jurídica atual.',
      },
      booklet_evidence: { url: sourceMeta.booklet_url, host_type: 'mirror', sha256: previous.source.id, source_pages: c.payload.source_pages },
      ...(note.decision === 'obsolete' ? { exclusion_reason: 'superseded_for_current_training', historical_retention: true } : {}),
      ...(c.discipline === 'INFORMÁTICA' ? { software_and_media_check: { findings: note.explanation, source_pdf_page: c.source_page, selected_page_visual_inspection: (role === 'escrivao' ? [5,6,7] : [4,5,6]).includes(c.source_page), media_integrated_for_training: false, product_version_certified: false } } : {}),
      ...(c.payload.local_legislation_review_required ? { target_scope: 'historico_ce', pcac_compatibility_verified: false, state_law_currentness_verified: false } : {}),
    };
  }
  return { next, changes: reviewChanges(previous, next) };
}

export function buildAll() {
  const notes = read(path.join(reviewDirectory,'pareceres.json'));
  const evidence = read(path.join(reviewDirectory,'fontes-e-excertos.json'));
  const textChecks = read(path.join(reviewDirectory,'cotejo-literal-pdf.json'));
  const keyChecks = read(path.join(reviewDirectory,'cotejo-gabarito.json'));
  const results = ['inspetor','escrivao'].map((role) => {
    const previous = read(path.join(baselineDirectory,`pcce_${role}_2021_revisado.json`));
    return { role, previous, ...buildContinuation(previous,role,notes,evidence,textChecks,keyChecks) };
  });
  const changes = results.flatMap((r) => r.changes);
  const all = results.flatMap((r) => r.next.candidates);
  const count = (state) => all.filter((c) => c.content_status === state).length;
  const summary = {
    reviewed_at: notes.reviewed_at, new_individual_decisions: changes.length,
    total_historical_positions: all.length,
    proposed_states: { reviewed_held: count('reviewed'), obsolete: count('obsolete'), rejected_annulled: count('rejected'), under_review: count('under_review') },
    publication_approved: 0, remote_application_verified: false,
    corpus_scope: 'Dois cargos do mesmo concurso PC-CE 2021; não amostra representativa de toda a IDECAN nem previsão PC-AC',
    official_and_primary_documents_consulted: Object.keys(evidence.sources).length,
    profile_methodology: 'Detecção textual não exaustiva de comandos de exceção/incorreção; temas atribuídos individualmente; não mede frequência de toda a banca.',
    failed_planalto_requests: evidence.failed_planalto_requests.length,
    observed_profile: results.map(({ role,next }) => ({
      role, denominator: '100 posições objetivas impressas, incluindo históricas/excluídas',
      printed_positions: next.candidates.length,
      command_requires_exception_or_incorrect_answer: next.candidates.filter((c) => /\bINCORRET[AO]\b|À EXCEÇÃO|EM DESACORDO|NÃO é correto/i.test(c.payload.raw_text.split(/^A\)/m)[0].replace(/\s+/g,' '))).length,
      disciplines: [...new Set(next.candidates.map((c) => c.discipline))].map((discipline) => ({ discipline, printed_items: next.candidates.filter((c) => c.discipline === discipline).length })),
      observed_topics: next.candidates.map((c) => ({ item: c.payload.item_number, topic: c.payload.individual_review?.observed_topic ?? 'Anulação confirmada', state: c.content_status })),
    })),
  };
  return { results, changes, summary };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { results,changes,summary } = buildAll();
  for (const { role,next } of results) fs.writeFileSync(path.join(reviewDirectory,`pcce_${role}_2021_revisado.json`),JSON.stringify(next,null,2)+'\n');
  fs.writeFileSync(path.join(reviewDirectory,'aplicar-continuacao.sql'),reviewSql(changes,'Continuação PC-CE 2021: 177 pareceres individuais; preservar as 23 decisões anteriores.'));
  fs.writeFileSync(path.join(reviewDirectory,'resumo-e-perfil-observado.json'),JSON.stringify(summary,null,2)+'\n');
  console.log(JSON.stringify({ decisions: changes.length, states: summary.proposed_states, publication_approved: 0, remote_application_verified: false }));
}
