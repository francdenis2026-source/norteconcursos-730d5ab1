"""Verifica identidade, quarentena, extração e integridade do lote A."""
import json
from pathlib import Path
base=Path(__file__).parent
p=json.loads((base/'iapen-ac-2023-ibfc02-a.json').read_text())
rows=[i['row']for i in p['items']]
assert [r['item_number']for r in rows]==list(range(1,61))
assert len({r['id']for r in rows})==60
assert [r['item_number']for r in rows if r['official_answer']=='X']==[3]
# Matriz do gabarito pós-recurso, lida por linhas de cinco itens.
expected='CDXCABBADC'+'ABDADDACAA'+'CABDBCCADB'+'DCBACBDCCA'+'CDBDABCDDA'+'CBCACBCDDA'
assert ''.join(r['official_answer']for r in rows)==expected
for i in p['items']:
 r=i['row'];n=r['item_number']
 assert r['exam_type']=='IBFC_02 — Versão A'
 assert r['content_status']==('archived'if n==3 else'under_review')
 assert r['official_answer']in 'ABCDX'
 assert list(r['options'])==list('ABCD')and all(r['options'].values())
 assert bool(r['support_text'])==(n<=10)
 assert r['legal_review_required']==(n>=31)
 assert 3<=i['source_page']<=14
 text=r['stem']+' '.join(r['options'].values())
 assert 'PROVA DISCURSIVA'not in text and 'IBFC_02 - VERSÃO A'not in text
assert rows[-1]['options']['D']=='Praticar fato previsto como crime culposo'
sql=(base/'iapen-ac-2023-ibfc02-a.sql').read_text()
assert 'ALTER TABLE'not in sql.upper()and 'UPDATE public.official_exam_questions'not in sql
assert 'ON CONFLICT' in sql and 'DO NOTHING' in sql
assert len({r['syllabus_topic_id']for r in rows})==4
print('60 itens válidos; 59 retidos; 1 anulado arquivado; nenhuma ativação ou alteração na tabela legada.')
