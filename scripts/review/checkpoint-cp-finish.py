"""Record a verified batch; never imports or changes the database."""
import json,sys,datetime
from pathlib import Path
folder=Path(sys.argv[1]);stage=sys.argv[2];pack=Path(sys.argv[3]);prefix=sys.argv[4]
read=lambda t:json.loads((folder/stage/(t+'.json')).read_text())
v=json.loads(Path('docs/library/review-coverage-2026-10-12.json').read_text());c=next(r for r in v['courses'] if r['slug']=='codigo-penal');course=next(r for r in read('legal_courses') if r['slug']=='codigo-penal');es={r['unit_id']:r for r in read('legal_unit_explanations')};dt=lambda x:datetime.datetime.fromisoformat(x.replace('Z','+00:00'));pending=[]
for u in sorted(read('legal_course_units'),key=lambda u:u['position']):
 if u['course_id']!=course['id'] or u['content_status']!='current':continue
 e=es.get(u['id'],{});ok=e.get('status')=='published' and e.get('reviewed_by') and e.get('reviewed_at') and dt(e['reviewed_at'])+datetime.timedelta(seconds=1)>=dt(e['updated_at']) and e.get('content_sha256')==u['content_sha256']
 if not ok:pending.append(u['unit_key'])
assert len(pending)==c['pending'];p=json.loads(pack.read_text());r=json.loads(Path('docs/library/'+prefix+'-readback-2026-10-12.json').read_text());assert r['authored_explanations_confirmed']==len(p['units']) and not r['timestamp_only_changes'];cp=Path('docs/library/cp-checkpoint-2026-10-12.json');out=json.loads(cp.read_text());out.update(checked_at=v['checked_at'],reviewed=c['review_metadata'],pending=c['pending'],next_candidate_keys=pending[:40],global_reviewed=v['current_review_metadata'],global_pending=v['pending_current_review_metadata'],last_reviewed_scope=p['laws'][0]['target_unit_keys'],last_batch_count=len(p['units']));cp.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
qa=sum(len(u['prova']) for u in p['units']);report=Path('docs/library/'+prefix+'-review-2026-10-12.md');report.write_text(f'''# Código Penal — {prefix}

{len(p['units'])} pendências revisadas individualmente após comparar texto e explicações
existentes com o compilado oficial. Preservados os campos válidos da explicação;
casos, variações e exercícios foram escritos explicitamente por artigo, sem
criar questão do treinador ou gerar respostas por regra genérica do texto.

Alvos: {', '.join(p['laws'][0]['target_unit_keys'])}.
{len(p['units'])} casos, {len(p['units'])} variações e {qa} perguntas respondidas.

Dry-run e publicação com preflight/estado anterior esperado concluídos.
Readback confirmou {r['authored_explanations_confirmed']} gravações e preservou
{r['untargeted_explanations_preserved']} explicações alheias e {len(r['protected_tables_unchanged'])} tabelas imutáveis, sem exclusões
ou alteração de timestamps alheios. Fontes brutas/snapshots ficam em outputs
ignorados; pacote conserva versões anteriores, hashes e escopo explícito.

CP: {c['review_metadata']}/{c['current']} com revisão atual, {c['pending']} pendentes.
Biblioteca: {v['current_review_metadata']}/{v['current_units']},
{v['pending_current_review_metadata']} pendentes. Próximo: {pending[0] if pending else 'nenhum item atual pendente'}.

Revisão textual/pedagógica dos itens listados não certifica toda jurisprudência,
regulamentação ou constitucionalidade. Trechos históricos/residuais e pontos
não certificados permanecem ressalvados, sem treino literal automático indevido.
Push não comprova implantação dos alertas no domínio; banco tem leitura própria.
Saldo de créditos não é acessível automaticamente nesta sessão.
''');
if r.get('concurrent_other_course_changes'):
 with report.open('a') as f:f.write('\nAlterações concorrentes fora do CP: '+str(len(r['concurrent_other_course_changes']))+' registros, detalhados no readback. Todos os artigos do CP permaneceram iguais; não foi declarada imutabilidade global da tabela de artigos. As salvaguardas de publicação continuam inalteradas.\n')
print('CP',c,'Next',pending[:3])
