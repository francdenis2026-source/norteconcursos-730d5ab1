"""Read-only triage. Never activates, edits or deletes educational content.
Requires snapshots of pending question tables, sources, topics and editions.
"""
import collections,csv,datetime,json,pathlib,re,sys
from audit_question_catalog import findings
root=pathlib.Path(sys.argv[1]);read=lambda name:json.loads((root/(name+'.json')).read_text())
sources={x['id']:x for x in read('content_sources')};topics={x['id']:x for x in read('syllabus_topics')};editions={x['id']:x for x in read('syllabus_editions')}
now=datetime.datetime.now(datetime.timezone.utc);rows=[]
for table in ['official_exam_questions','board_exam_questions']:
 for q in read(table):
  flags=findings(table,q,topics,editions,now)
  text=q.get('question_text') or q.get('stem') or ''
  if table=='official_exam_questions':
   proof=sources.get(q['question_source_id'],{}).get('url','');key=sources.get(q['answer_key_source_id'],{}).get('url','')
   if proof==key:flags.append('same_reference_for_exam_and_key')
   if '/concursos/encerrado' in proof:flags.append('generic_source_not_exam_document')
   if 'drive.google.com' in proof or 'drive.google.com' in key:flags.append('official_host_provenance_unverified')
   if 'gabarito' in proof.lower() or 'gaba_' in proof.lower():flags.append('exam_reference_points_to_answer_key')
   if re.search(r'assinale|alternativa|opção correta',text,re.I) and not all(re.search(r'\('+l+r'\)',text) for l in 'ABCD'):flags.append('multiple_choice_options_unconfirmed')
   if re.match(r'\s*\(A\)',text):flags.append('stem_embedded_in_option')
  else:proof=q.get('source_url','');key=q.get('answer_key_url','')
  if re.search(r'figura|gráfico|tabela|quadro',text,re.I):flags.append('visual_reference_requires_manual_check')
  if re.search(r'conforme o texto|de acordo com o texto|texto precedente|texto anterior|no texto',text,re.I) and not(q.get('support_text') or q.get('support_text_id') or text.startswith(('Texto-base','Comando:'))):flags.append('support_context_requires_manual_check')
  if re.search(r'disciplina atribuída pela ordem',q.get('review_note') or '',re.I):flags.append('subject_requires_individual_classification')
  # Legal changes are review candidates, never automatic obsolescence decisions.
  alltext=text+' '+json.dumps(q.get('options',{}),ensure_ascii=False)
  if re.search(r'feminic[ií]dio',alltext,re.I):flags.append('check_law_14994_2024_feminicide')
  if re.search(r'8[.,]?666|10[.,]?520|convite|tomada de preços',alltext,re.I):flags.append('check_procurement_temporal_regime')
  if re.search(r'progressão|saída temporária|remi[çs][ãa]o|livramento condicional',alltext,re.I):flags.append('check_execution_law_changes')
  rows.append({'table':table,'id':q['id'],'contest':q['contest_name'],'year':q['exam_year'],'subject':q['subject'],'item':q['item_number'],'status':q['content_status'],'proof_url':proof,'answer_key_url':key,'findings':list(dict.fromkeys(flags)),'decision':'retain_under_review','reason':'External official sources blocked; no current substantive approval performed.'})
counts=collections.Counter(f for r in rows for f in r['findings'])
report={'checked_at':now.isoformat(),'scope':'Structural triage, not substantive approval or current legal verification','total':len(rows),'published':0,'archived':0,'deleted':0,'finding_counts':dict(counts),'items':rows}
(root/'triage.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
with (root/'pendencias-por-questao.csv').open('w',newline='') as f:
 fields=['table','id','contest','year','subject','item','status','proof_url','answer_key_url','findings','decision'];w=csv.DictWriter(f,fieldnames=fields,extrasaction='ignore');w.writeheader()
 for r in rows:w.writerow({**r,'findings':'; '.join(r['findings'])})
print(json.dumps({k:v for k,v in report.items() if k!='items'},ensure_ascii=False,indent=2))
