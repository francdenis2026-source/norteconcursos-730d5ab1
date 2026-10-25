-- Auditoria PC-ES 2022 Delegado de Polícia — lote 1 (8 itens
-- autossuficientes de múltipla escolha, Noções de Informática e Direito
-- Penal). Itens 1-9 (Língua Portuguesa) dependem do texto-base "CG1A1-I"
-- não capturado. Item 10 depende do nome de um botão/ícone perdido na
-- extração do PDF ("clicar no botão , localizado..."). Itens 15-20
-- (Estatuto dos Policiais Civis do ES, LC 46/1994 — lei estadual
-- específica) ficam de fora por exigirem verificação contra uma norma
-- estadual que não consegui localizar/conferir com segurança nesta
-- rodada. Item 23 já está anulado.

update public.official_exam_questions
set review_note=$q$Correto (opção E). No Windows 10, ao selecionar múltiplos arquivos compactados (.rar) e escolher a opção "Extrair tudo..." no menu de contexto, o sistema abre uma caixa de diálogo que permite ao usuário escolher o caminho de destino da extração, entre outras opções — não há extração automática e silenciosa para a raiz do C:\, para a Área de Trabalho ou para a pasta Documentos.$q$
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=11;

update public.official_exam_questions
set review_note=$q$Correto (opção A). A memória ROM (Read-Only Memory) é integrada à placa-mãe e tem seu conteúdo gravado pelo fabricante, podendo apenas ser lida (não alterada) pelo usuário em uso normal — diferente de DRAM (memória volátil de trabalho), cache, SSD (armazenamento regravável) ou memória virtual.$q$
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=12;

update public.official_exam_questions
set review_note=$q$Correto (opção B). No MS Excel, a função DATADIF(data_inicial; data_final; "D") calcula a diferença em dias entre duas datas — a fórmula =(DATADIF(B3; HOJE();"D"))+1 calcula os dias decorridos desde a data em B3 até hoje, somando 1 (para incluir o dia inicial na contagem, prática comum na contagem de prazo processual penal).$q$
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=13;

update public.official_exam_questions
set review_note=$q$Correto (opção A — apenas o item II está certo). Item I é falso: e-mails solicitando dados pessoais são suspeitos mesmo quando aparentam vir de bancos ou da Receita Federal, pois o remetente pode ser facilmente falsificado (phishing). Item II é verdadeiro: manter sistema operacional e antivírus atualizados é medida reconhecida de prevenção a phishing/malware. Item III é falso: anexos de e-mail (sobretudo .exe e .bat) não são intrinsecamente seguros, e provedores não garantem proteção total contra pragas virtuais.$q$
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=14;

update public.official_exam_questions
set review_note=$q$Correto (opção B). Oferecer vantagem indevida (o celular) a funcionários públicos (policiais) para que deixem de praticar ato de ofício (a condução à delegacia) configura o crime de corrupção ativa (art. 333, Código Penal) — o oferecimento já consuma o crime, independentemente da aceitação pelos policiais.
Fonte oficial: art. 333, Código Penal (Decreto-Lei 2.848/1940), planalto.gov.br.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 333, Código Penal","url":"https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"}]'::jsonb
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=21;

update public.official_exam_questions
set review_note=$q$Correto (opção C). O art. 83, I, do Código Penal exige, entre os requisitos do livramento condicional, que o condenado tenha reparado o dano causado pela infração, salvo comprovada e efetiva impossibilidade de fazê-lo.
Fonte oficial: art. 83, I, Código Penal (Decreto-Lei 2.848/1940), planalto.gov.br.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 83, I, Código Penal","url":"https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"}]'::jsonb
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=22;

update public.official_exam_questions
set review_note=$q$Correto (opção A). Segundo entendimento do STJ, para a causa de aumento de pena do furto noturno (art. 155, §1º, CP), é irrelevante se a vítima estava ou não efetivamente dormindo no momento do crime — basta que o fato tenha ocorrido durante o período de repouso noturno, pois o fundamento da majorante é a maior vulnerabilidade/facilidade proporcionada pela noite, não o sono da vítima especificamente.
Fonte oficial: art. 155, §1º, Código Penal; jurisprudência do STJ sobre o furto noturno.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 155, §1º, CP; jurisprudência STJ sobre repouso noturno","url":"https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"}]'::jsonb
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=24;

update public.official_exam_questions
set review_note=$q$Correto (opção B). O crime de casa de prostituição (art. 229, CP, com redação da Lei 12.015/2009) exige, segundo a jurisprudência do STJ, a presença do elemento normativo "exploração sexual" — a mera manutenção de local destinado a encontros de natureza sexual, sem exploração de terceiros, não configura o tipo penal.
Fonte oficial: art. 229, Código Penal (redação da Lei 12.015/2009); jurisprudência do STJ sobre casa de prostituição.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 229, CP (red. Lei 12.015/2009); jurisprudência STJ","url":"https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"}]'::jsonb
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=25;
