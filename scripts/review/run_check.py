import json, sys
sys.path.insert(0, '.')
from check_gabaritos import parse_combined_gabarito, find_career_block

PROVAS = {
    ('Assembleia Legislativa do Estado do Maranhão', 'Assistente Legislativo – Agente Legislativo'):
        ('/mnt/user-data/uploads/PROVAS/alema-2023-gabarito-final-para-publicacao-retificado-04.10.2023.pdf', 'AGENTE LEGISLATIVO'),
    ('Assembleia Legislativa do Estado do Maranhão', 'Consultor Legislativo Especial – Direito Constitucional'):
        ('/mnt/user-data/uploads/PROVAS/alema-2023-gabarito-final-para-publicacao-retificado-04.10.2023.pdf', 'CONSULTOR LEGISLATIVO ESPECIAL - DIREITO CONSTITUCIONAL'),
    ('Assembleia Legislativa do Estado do Maranhão', 'Técnico de Gestão Administrativa – Contador'):
        ('/mnt/user-data/uploads/PROVAS/alema-2023-gabarito-final-para-publicacao-retificado-04.10.2023.pdf', 'TECNICO DE GESTAO ADMINISTRATIVA - CONTADOR'),
    ('Controladoria-Geral do Estado de Santa Catarina', 'Auditor do Estado – Direito'):
        ('/mnt/user-data/uploads/PROVAS/cgesc2022_gabarito_definitivo_retificado_20230327.pdf', 'AUDITOR DIREITO MANHA'),
    ('Controladoria Geral do Município do Rio de Janeiro', 'Contador'):
        ('/mnt/user-data/uploads/PROVAS/edital-cgm-gabarito-definitivo.pdf', 'CONTADOR'),
    ('Controladoria Geral do Município do Rio de Janeiro', 'Técnico de Controle Interno'):
        ('/mnt/user-data/uploads/PROVAS/edital-cgm-gabarito-definitivo.pdf', 'TECNICO DE CONTROLE INTERNO'),
    ('Tribunal de Contas do Estado do Tocantins', 'Auditor de Controle Externo – Direito'):
        ('/mnt/user-data/uploads/PROVAS/tceto2022_gabarito_definitivo_164151578464.pdf', 'AUDITOR DE CONTROLE EXTERNO - DIREITO'),
    ('Tribunal de Contas do Estado do Tocantins', 'Auditor de Controle Externo – Ciências Contábeis'):
        ('/mnt/user-data/uploads/PROVAS/tceto2022_gabarito_definitivo_164151578464.pdf', 'AUDITOR DE CONTROLE EXTERNO - CIENCIAS CONTABEIS'),
    ('Tribunal de Contas do Estado do Tocantins', 'Analista Técnico – Letras'):
        ('/mnt/user-data/uploads/PROVAS/tceto2022_gabarito_definitivo_164151578464.pdf', 'ANALISTA TECNICO - LETRAS'),
}

d = json.load(open('/home/user/norteconcursos-730d5ab1/supabase/imports/fgv/fgv_questions.json'))

cache = {}
report = []
for (contest, career), q in [((q['contest_name'], q['career_name']), q) for q in d]:
    key = (contest, career)
    if key not in PROVAS:
        continue
    pdf, hint = PROVAS[key]
    if pdf not in cache:
        cache[pdf] = parse_combined_gabarito(pdf)
    blocks = cache[pdf]
    found = find_career_block(blocks, hint, tipo=1)
    if not found:
        report.append(f"NAO ACHOU BLOCO: {career} (hint={hint})")
        continue
    career_pdf, tipo, ans = found
    n = q['item_number']
    official = ans.get(n)
    stored = q['official_answer']
    status = 'OK' if official == stored else 'DIVERGE'
    if status == 'DIVERGE':
        report.append(f"{status} {contest[:20]} / {career[:40]} Q{n}: banco={stored} pdf={official}")

print(f"Total questoes checadas nas {len(PROVAS)} provas com PDF disponivel")
diverge = [r for r in report if r.startswith('DIVERGE')]
naobloco = [r for r in report if r.startswith('NAO')]
print(f"Divergencias: {len(diverge)}")
print(f"Blocos nao encontrados: {len(naobloco)}")
for r in report:
    print(r)
