"""Integrate the reviewed complete path into both existing library guides.
Usage: python scripts/review/build-idosa-material-review.py EVIDENCE_FOLDER OUTPUT
Existing cases and quizzes remain preserved; new retrieval cards are appended.
"""
import json,hashlib,datetime,sys
from pathlib import Path
root=Path(__file__).resolve().parents[2];p=Path(sys.argv[1]);out=Path(sys.argv[2]);read=lambda t:json.loads((p/'after-idosa-cases'/f'{t}.json').read_text(encoding='utf-8'))
c=next(c for c in read('legal_courses') if c['slug']=='idosa');pack=json.loads((root/'docs/library/article-explanations-idosa-2026-10-11.json').read_text(encoding='utf-8'));now=datetime.datetime.now(datetime.timezone.utc).isoformat();law=pack['laws'][0];refs=law['additional_sources'];rows={r['unit_key']:r for r in pack['units']}
sources=[{'title':c['title'],'url':c['source_url'],'sha256':law['source_sha256']}]+[{'title':r.get('title',r.get('name','Constituição Federal — texto compilado')),'url':r['url'],'sha256':r['sha256']} for r in refs]
changes=[
 {'title':'Lei 15.163/2025 — penas e processo penal','url':'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15163.htm','state':'effective','articles':['Art. 94','Art. 99'],'summary':'Art. 94: Lei 9.099 não se aplica aos crimes do Estatuto nem aos crimes com violência contra pessoa idosa, independentemente da pena. Art. 99: reclusão de 2–5 anos; lesão grave 3–7; morte 8–14. Compare a lei penal no tempo; não copie penas antigas como atuais.','vigency':'Alteração de 2025 em vigor; art. 6º da lei alteradora prevê vigência na publicação.'},
 {'title':'STJ — Temas 952 e 1016: reajuste por faixa etária','url':refs[0]['url'],'state':'reference','articles':['Art. 15, §3º'],'summary':'Vedação de discriminação não invalida automaticamente todo reajuste etário. Exigem-se previsão contratual, normas regulatórias e base atuarial idônea, sem abuso ou discriminação. O Tema 1016 aplica as teses aos coletivos, ressalvando autogestão quanto ao CDC.','vigency':'Precedentes qualificados conferidos diretamente em 11/10/2026; não são alteração da redação legal.'},
 {'title':'CPC vigente: remissões e nulidades','url':'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm','state':'reference','articles':['Art. 69','Art. 77','Art. 83'],'summary':'O CPC de 1973 foi revogado. Confira correspondência e transição do art. 1.046. A nulidade por falta de intervenção do MP requer sua intimação para manifestação sobre prejuízo, conforme art. 279, §2º.','vigency':'Aplicar a disciplina processual vigente, com regras especiais e transitórias do caso.'},
 {'title':'Remissão histórica: antiga Lei de Drogas revogada','url':'https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm','state':'expired','articles':['Art. 113'],'summary':'A Lei 6.368/1976 citada no art. 113 foi revogada pelo art. 75 da Lei 11.343/2006. Para drogas, estudar a lei atual, sem copiar a antiga majorante de menores de 21 anos.','vigency':'Transcrição modificadora histórica; o diploma antigo não está vigente.'},
]
review={**c['legal_review'],'checked_at':now,'scope':'117 dispositivos vigentes cadastrados conferidos na fonte oficial, com explicação, caso, variação e resposta de fixação para cada um. Jurisprudência e remissões históricas identificadas; não certifica todas as decisões ou todos os editais.','sources':sources,'changes':changes,'corrections':['Completado o percurso por dispositivo, preservando o veto do art. 72 fora da leitura ativa.','Conferidos diretamente os Temas 952 e 1016 do STJ e remissões ao CPC vigente.','Destacadas penas de 2025 e exclusão da Lei 9.099; identificadas transcrições históricas substituídas.']}
materials=[];enrichments=[];selected=[1,3,15,19,23,27,34,35,39,40,69,77,94,99,110,113,114,115]
for m in read('study_materials'):
 if (m.get('legal_review') or {}).get('course_slug')!='idosa':continue
 cards=list(m['flashcards'])
 for n in selected:
  question,answer=rows[f'art-{n}']['prova'][0].split('?',1);card={'f':f'Art. {n} — '+question+'?','b':answer.strip()}
  if card not in cards:cards.append(card)
 body=m['body_md'].replace('Responda aos 16 flashcards.',f'Responda aos {len(cards)} flashcards.')
 body+='\n\n## Percurso completo e pontos de atualização\n\nOs 117 dispositivos vigentes cadastrados têm explicação individual, caso concreto, variação e exercício com resposta comentada. [Estudar o Estatuto por artigo](/dashboard/legal-course/idosa).\n\n- **Penas e processo — alteração de 2025:** consulte os arts. 94 e 99; compare penas atuais com antigas e a aplicação temporal.\n- **Planos de saúde:** leia o art. 15 com os Temas 952 e 1016 do STJ; vedação de discriminação não significa invalidade automática de todo reajuste.\n- **Remissões históricas:** arts. 69 e 83 citam o CPC antigo; o art. 113 cita a antiga Lei de Drogas revogada. Consulte os diplomas atuais e alertas do percurso.\n'
 materials.append({'slug':m['slug'],'expected':{'id':m['id'],'title':m['title'],'updated_at':m['updated_at'],'content_status':m['content_status'],'body_sha256':hashlib.sha256(m['body_md'].encode()).hexdigest(),'quiz':m['quiz'],'flashcards':m['flashcards'],'legal_review':m['legal_review']},'patch':{'body_md':body,'flashcards':cards,'law_version_checked_at':now,'legal_review':review}})
 for e in read('study_material_enrichments'):
  if e['material_slug']==m['slug'] and e['status']=='active':enrichments.append({'id':e['id'],'expected':e,'patch':{'source_body_sha256':hashlib.sha256(body.encode()).hexdigest()}})
assert len(materials)==2
out.write_text(json.dumps({'version':'2026-10-11','materials':materials,'courses':[{'id':c['id'],'expected':c,'patch':{'checked_at':now,'source_sha256':law['source_sha256'],'legal_review':review}}],'enrichments':enrichments},ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print(len(materials),'guides;',len(enrichments),'enrichments preserved')
