"""Build the bounded classification correction from the locally inspected snapshot.

Private stems stay in ignored outputs. This is an explicit exam/item decision map,
not a keyword classifier or a legal-validity review. No credentials are used here.
"""
import collections
import hashlib
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
GROUPS = ROOT / 'outputs/filter-audit/groups.json'
P = 'Direito Penal'
CPP = 'Direito Processual Penal'
C = 'Direito Constitucional'
A = 'Direito Administrativo'
L = 'Legislação Penal Extravagante'
H = 'Direitos Humanos'
REG = 'Conhecimentos Regionais (Rondônia)'
# Each interval was checked against the question commands and subject matter.
BLOCKS = {
  0: [(21,22,'Atualidades'),(25,25,'História e Geografia do Acre')],
  1: [(21,21,'Cultura Geral'),(22,25,'História e Geografia do Acre')],
  2: [(1,8,REG),(11,20,C),(21,35,P),(36,50,CPP),(52,60,L),(61,75,A),
      (76,76,'Administração Financeira e Orçamentária'),(77,80,'Direito Tributário'),
      (81,85,'Direito Ambiental'),(86,90,'Medicina Legal'),(91,95,'Direito Civil'),(96,100,'Criminologia')],
  3: [(1,15,'Língua Portuguesa'),(16,20,'Raciocínio Lógico'),(21,30,REG),
      (31,35,'Estatística'),(36,45,'Informática'),(46,55,'Química'),(56,65,'Biologia'),
      (66,75,'Física'),(76,80,P),(81,82,H),(83,85,C),(86,95,A),(96,100,'Medicina Legal')],
  4: [(1,15,'Língua Portuguesa'),(16,20,'Raciocínio Lógico'),(21,30,REG),
      (31,35,'Estatística'),(36,45,'Informática'),(46,55,'Administração Pública'),
      (56,64,'Contabilidade Geral'),(65,65,'Administração Financeira e Orçamentária'),
      (66,75,CPP),(76,77,H),(78,85,C),(86,95,A),(96,100,'Medicina Legal')],
  5: [(1,15,'Língua Portuguesa'),(16,20,'Raciocínio Lógico'),(21,30,REG),
      (31,35,'Estatística'),(36,45,'Informática'),(46,55,'Administração Pública'),
      (56,64,'Contabilidade Geral'),(65,65,'Administração Financeira e Orçamentária'),
      (66,71,CPP),(72,75,P),(76,77,H),(78,85,C),(86,95,A),(96,100,'Medicina Legal')],
  6: [(31,32,'Legislação Específica do Acre'),(33,38,'Legislação Especial'),(39,40,L),
      (41,46,P),(47,60,L)],
  7: [(1,9,C),(10,20,A),(21,30,P),(31,40,CPP),(41,49,L),
      (50,57,'Medicina Legal'),(58,66,'Criminologia'),(67,71,'Direito Civil'),
      (72,75,'Direito Empresarial'),(76,84,'Direito Processual Civil'),
      (85,92,'Direito Tributário'),(93,100,'Direito Ambiental')],
  8: [(31,41,'Medicina Legal'),(42,42,'Biossegurança'),(43,44,'Medicina Legal'),
      (45,45,'Biossegurança'),(46,46,'Medicina Legal'),(47,47,'Biossegurança'),
      (48,48,'Medicina Legal'),(49,60,'Biossegurança')],
  9: [(1,2,'Legislação Específica do Piauí'),(3,3,A),(4,4,'Legislação Específica do Piauí'),
      (5,12,'Conhecimentos Regionais (Piauí)')],
  10: [(1,16,A),(17,30,C),(31,32,'Legislação Especial'),(33,35,A),
       (36,46,'Direito Civil'),(47,54,'Direito Empresarial'),(55,70,P),
       (71,78,'Direito Tributário'),(79,86,'Medicina Legal'),(87,90,CPP),
       (91,100,L),(101,103,CPP),(104,111,'Direito Ambiental'),
       (112,118,'Legislação Específica do Distrito Federal'),(119,120,'Primeiros Socorros')],
  11: [(1,10,'Língua Portuguesa'),(23,30,'Conhecimentos Regionais (Piauí)')],
  12: [(1,6,'Língua Portuguesa'),(7,11,'Informática'),(12,15,'Raciocínio Lógico'),
       (16,20,H),(21,22,C),(23,25,'Legislação Específica de Minas Gerais'),
       (26,26,'Ética no Serviço Público'),(27,30,'Legislação Específica de Minas Gerais')],
}
BLOCKS[12] += BLOCKS[8]
# Explicit departures from exam blocks: classify the object being tested, not
# incidental words in a reading passage or one distractor.
EXCEPTIONS = {
  (2,17):H,(2,29):L,(2,31):C,
  (3,78):CPP,
  (4,54):A,(4,55):A,(4,69):P,(4,70):P,(4,74):P,(4,75):P,
  (5,54):A,
  (6,32):'Ética no Serviço Público',
  (7,43):'Direito Eleitoral',
  (10,59):L,(10,60):L,(10,61):L,(10,64):L,(10,68):L,
  (10,73):L,(10,74):P,(10,75):L,(10,81):P,(10,85):P,
}

def classify(group, row):
    if group == 13:
        topic = row['subtopic']
        if topic.startswith('Código Penal'): return P
        if topic.startswith('LEP') or topic.startswith('Lei ') or topic.startswith('Porte de arma'): return L
        if topic.startswith('Direitos Humanos'): return H
        if topic.startswith('Vedação a penas'): return C
        raise ValueError(topic)
    item = row['item_number']
    if (group,item) in EXCEPTIONS: return EXCEPTIONS[group,item]
    matches = [subject for start,end,subject in BLOCKS[group] if start <= item <= end]
    if len(matches) != 1: raise ValueError((group,item,matches))
    return matches[0]

def sql_quote(value):
    return "'" + value.replace("'", "''") + "'"

def main():
    groups = json.loads(GROUPS.read_text(encoding='utf-8'))
    sources = json.loads((GROUPS.parent/'sources.json').read_text(encoding='utf-8'))
    sources = {s['id']:s for s in sources}
    decisions = []
    for group,g in enumerate(groups):
        for row in g['rows']:
            target = classify(group,row)
            lacks_legal_evidence = bool(re.search('direito|legisla', target, re.I)) and (
                not row['legal_basis'] or not row['law_version_checked_at'] or
                (g['key'][0] == 'official_exam_questions' and not row['legal_audit_completed']))
            source = sources[row.get('question_source_id',row.get('source_id'))]
            decisions.append(dict(table=g['key'][0],id=row['id'],item=row.get('item_number',row.get('external_item_key')),
                old_subject=row['subject'],new_subject=target,question_md5=hashlib.md5(row['question_text'].encode()).hexdigest(),
                quarantine=lacks_legal_evidence,
                evidence='Comando e objeto da questão no caderno de origem; assunto existente nas autorais.',
                source_url=source['url'],decision='retain' if target==row['subject'] else 'correct'))
    assert len(decisions)==755 and len({(d['table'],d['id']) for d in decisions})==755
    doc=ROOT/'docs/question-taxonomy-review-2026-10-11.json'
    doc.write_text(json.dumps({'scope':'classification_and_missing_evidence_quarantine','reviewed':755,'decisions':decisions},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    sql=['-- Bounded taxonomy correction; question/answer/legal evidence are preserved.',
         '-- Newly identified legal questions without evidence are held under_review, never approved.',
         '-- Includes 8 retained regional labels. Idempotent and atomic: abort on missing/changed stems.',
         'CREATE TEMP TABLE taxonomy_review_755 (source_table text, id uuid, old_subject text, new_subject text, question_md5 text, quarantine boolean) ON COMMIT DROP;',
         'INSERT INTO taxonomy_review_755 VALUES']
    sql.append(',\n'.join('('+','.join(sql_quote(str(d[k])) for k in ['table','id','old_subject','new_subject','question_md5'])+','+str(d['quarantine']).lower()+')' for d in decisions)+';')
    sql += ['DO $review$ DECLARE conflicts integer; BEGIN']
    for table in ['official_exam_questions','curated_question_catalog']:
        sql.append(f"SELECT count(*) INTO conflicts FROM taxonomy_review_755 r LEFT JOIN public.{table} q ON q.id=r.id WHERE r.source_table='{table}' AND (q.id IS NULL OR md5(q.question_text)<>r.question_md5 OR q.subject NOT IN (r.old_subject,r.new_subject));")
        sql.append(f"IF conflicts<>0 THEN RAISE EXCEPTION 'Taxonomy snapshot conflict in {table}: %',conflicts; END IF;")
        sql.append(f"UPDATE public.{table} q SET subject=r.new_subject, content_status=CASE WHEN r.quarantine AND q.content_status='active' THEN 'under_review' ELSE q.content_status END FROM taxonomy_review_755 r WHERE r.source_table='{table}' AND q.id=r.id AND (q.subject<>r.new_subject OR (r.quarantine AND q.content_status='active'));")
    sql += ['END $review$;']
    (ROOT/'supabase/migrations/20261011120000_question_taxonomy_review_755.sql').write_text('\n'.join(sql)+'\n',encoding='utf-8')
    print(collections.Counter(d['decision'] for d in decisions))
    print(collections.Counter(d['new_subject'] for d in decisions))
    print('Held for missing legal evidence:',sum(d['quarantine'] for d in decisions))

if __name__ == '__main__': main()
