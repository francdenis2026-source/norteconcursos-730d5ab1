"""Append reviewed practice to four existing paths, preserving decks and cases."""
import copy
import datetime
import hashlib
import json
import re
import uuid
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'outputs/library-continuation-2026-10-11'
DOC=ROOT/'docs/library'
def read(path):return json.loads(path.read_text(encoding='utf-8'))
def sha(text):return hashlib.sha256(text.encode()).hexdigest()
def main():
    additions=read(DOC/'continuation-cases-2026-10-11.json')
    materials=read(OUT/'study_materials-before.json')
    courses=read(OUT/'legal_courses-before.json')
    examples=read(OUT/'study_material_enrichments-before.json')
    topics=read(OUT/'syllabus_topics-before.json')
    editions=read(OUT/'syllabus_editions-before.json')
    source_catalog=read(OUT/'content_sources-before.json')
    evidence={e['slug']:e for e in read(OUT/'source-index.json')}
    checked=datetime.datetime.now(datetime.timezone.utc).isoformat()
    pack={'version':'2026-10-11','materials':[],'courses':[],'enrichments':[]}
    enrichments=[];review=[]
    alerts={
      'interceptacao':'Diferencie o prazo e os pressupostos da captação ambiental (art. 8º-A) dos da interceptação telefônica. Pedido verbal não é autorização tácita; não se promete monitoramento automático da lei.',
      'juizados':'No art. 83, §2º, estude a interrupção do prazo recursal, introduzida em 2015, e não a antiga suspensão. Não use composição civil ou transação para hipóteses excluídas da Lei 9.099, como violência doméstica e familiar contra a mulher.',
      'lep':'Atualização posterior aos editais de 2025: a Lei 15.407/2026, vigente desde 12/05/2026, alterou a decisão sobre RDD no art. 54, §§2º e 3º. Separe pedido administrativo, decisão liminar e decisão final. A revogação de hipóteses de saída temporária em 2024 não elimina a permissão com escolta do art. 120. Fatos anteriores exigem análise intertemporal própria.',
      'codigo-processo-penal':'Atualização posterior aos editais de 2025: a Lei 15.438/2026, vigente desde 19/06/2026, prevê doze meses no art. 38, §2º para queixa ou representação em violência doméstica e familiar contra a mulher, sem criar representação para ação incondicionada. O art. 584, §4º, incluído pela Lei 15.358/2026, disciplina pedido de efeito suspensivo ou ativo no caso do art. 581, V; não o torna automático.'
    }
    changes={
      'lep':[{'title':'Lei 15.407/2026 — procedimento do RDD','url':'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15407.htm','articles':['Art. 52, §10','Art. 54, §§2 e 3'],'summary':'Requerimento desde o recolhimento quando presentes os pressupostos; decisão liminar judicial e decisão final em até quinze dias, com a disciplina da manifestação do MP e defesa.','vigency':'Publicação em 12/05/2026; art. 4º: vigência na publicação. Retificação oficial em 22/05/2026.','state':'effective'}],
      'codigo-processo-penal':[{'title':'Lei 15.438/2026 — decadência em violência doméstica','url':'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15438.htm','articles':['Art. 38, §2'],'summary':'Prazo especial de doze meses para queixa ou representação na hipótese legal, distinto da regra geral de seis meses; não altera por si a natureza da ação.','vigency':'Publicação em 19/06/2026; art. 5º: vigência na publicação. Fatos anteriores exigem análise intertemporal própria.','state':'effective'}]
    }
    for slug,new in additions.items():
        course=next(c for c in courses if c['slug']==slug and c['status']=='active')
        topic=next(t for t in topics if t['id']==course['syllabus_topic_id'])
        edition=next(e for e in editions if e['id']==topic['edition_id'])
        assert topic['content_status']=='current' and edition['status']=='active'
        assert any(s['url']==course['source_url'] and s['is_official'] for s in source_catalog)
        material=next(m for m in materials if m['slug']==course['material_slug'])
        assert material['content_status']=='active'
        old=max((e for e in examples if e['material_slug']==material['slug'] and e['status']=='active'),key=lambda e:e['checked_at'])
        ev=evidence[slug]
        assert ev['url']==course['source_url'] and 'error' not in ev
        assert hashlib.sha256((OUT/'sources'/(slug+'.html')).read_bytes()).hexdigest()==ev['sha256']
        old_ids={c['id'] for c in old['content']['cases']}
        assert not old_ids.intersection(c['id'] for c in new['cases'])
        cards=copy.deepcopy(material['flashcards'])
        cards += [{'f':c['scenario']+'\n\n'+c['question'],
                   'b':'\n'.join(c['steps'])+'\n\nConclusão: '+c['conclusion']+'\n\nVariação: '+c['variation']['scenario']+'\n'+c['variation']['answer']+'\n\nBase: '+', '.join(c['articles'])} for c in new['cases']]
        quiz=copy.deepcopy(material['quiz'])+new['quiz']
        case_count=len(old['content']['cases'])+len(new['cases'])
        body=material['body_md']
        body=re.sub(r'Resolva os \d+ casos',f'Resolva os {case_count} casos',body)
        body=re.sub(r'Responda aos \d+ flashcards',f'Responda aos {len(cards)} flashcards',body)
        body+='\n\n## Aplicação guiada — ampliação de 11/10/2026\n\n'+alerts[slug]+'\n\n'
        body+='Este complemento acrescenta seis casos resolvidos, seis cartões de aplicação e seis itens de julgamento autorais. Antes de abrir a resolução, decida o caso; depois altere o fato indicado e explique por que a conclusão muda ou permanece.\n\n'
        body+='| Tema de aplicação | Dispositivos |\n|---|---|\n'
        body+='\n'.join('| '+c['title']+' | '+', '.join(c['articles'])+' |' for c in new['cases'])
        body+='\n\nOs exercícios deste guia não são questões oficiais de banca. As atualizações posteriores ao edital são identificadas para estudo da legislação vigente; não se afirma que já integravam a cobrança histórica.\n'
        legal=copy.deepcopy(material['legal_review'])
        legal['checked_at']=checked
        legal['scope']='Conferência pontual em 11/10/2026 dos dispositivos dos seis novos casos e exercícios deste complemento. A revisão integral anterior e os alertas preexistentes foram preservados; esta ampliação não certifica nova auditoria integral de todos os dispositivos ou da jurisprudência.'
        legal['sources']=[{'title':course['title']+' — fonte oficial dos novos casos','url':ev['url'],'sha256':ev['sha256']}]+[s for s in legal['sources'] if s['url']!=ev['url']]
        legal['corrections']=legal.get('corrections',[])+['Seis casos com variações e seis itens de julgamento adicionados; seis flashcards anexados sem alterar índices ou conteúdo dos anteriores.']
        by_url={c['url']:c for c in legal['changes']}
        for change in changes.get(slug,[]):by_url[change['url']]=change
        legal['changes']=list(by_url.values())
        pack['materials'].append({'slug':material['slug'],'expected':{'id':material['id'],'title':material['title'],'content_status':'active','updated_at':material['updated_at'],'body_sha256':sha(material['body_md'])},
                                 'patch':{'body_md':body,'flashcards':cards,'quiz':quiz,'legal_review':legal,'law_version_checked_at':checked}})
        content=copy.deepcopy(old['content']);content['cases']+=new['cases'];content['illustrations'].append(new['flow'])
        # The newest visible revision includes every prior case and illustration.
        enrichment={'id':str(uuid.uuid5(uuid.NAMESPACE_URL,material['slug']+'/2026-10-11')),'material_slug':material['slug'],'version':'2026-10-11','source_body_sha256':sha(body),'content':content,
                    'sources':[{'title':course['title'],'url':ev['url'],'sha256':ev['sha256'],'checked_at':ev['checked_at']}]+[s for s in old['sources'] if s['url']!=ev['url']],
                    'checked_at':checked}
        enrichments.append(enrichment)
        review.append({'law':slug,'material_slug':material['slug'],'course_id':course['id'],'syllabus_topic_id':topic['id'],'edition_id':edition['id'],'source_url':ev['url'],'source_sha256':ev['sha256'],
                       'cases_before':len(old['content']['cases']),'cases_after':case_count,'flashcards_before':len(material['flashcards']),'flashcards_after':len(cards),'quiz_before':len(material['quiz']),'quiz_after':len(quiz),
                       'added_cases':[c['id'] for c in new['cases']],'scope':'Dispositivos dos novos casos; não nova auditoria integral da norma.'})
    (DOC/'continuation-review-2026-10-11.json').write_text(json.dumps(pack,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    (DOC/'continuation-examples-2026-10-11.json').write_text(json.dumps(enrichments,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    (DOC/'continuation-coverage-2026-10-11.json').write_text(json.dumps({'checked_at':checked,'rows':review},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('4 paths; +24 cases, +24 flashcards, +24 judgment items; all prior cases/decks preserved')
if __name__=='__main__':main()
