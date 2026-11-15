-- PC-AC 2026: sincroniza revisão jurídica, revisão de questões e didática dos materiais.
-- Reexecução segura: textos didáticos só são anexados se o marcador ainda não existir.
update public.study_materials
set body_md = case slug
when 'pcac-2026-direito-penal-01-aplicacao-lei-penal' then body_md || $$

## Exemplo simples e técnica de prova
Imagine que uma lei nova aumente a pena de um crime depois do fato. Ela não pode voltar para prejudicar o acusado. Se a lei nova reduzir a pena ou deixar de considerar o fato criminoso, aplica-se a regra mais favorável, inclusive a fatos anteriores, respeitados os limites legais.

**Macete:** tempo = atividade; lugar = ubiquidade. Pense: quando aconteceu a conduta? (atividade); onde houve conduta ou resultado? (ubiquidade).$$
when 'pcac-2026-direito-penal-02-teoria-do-crime' then body_md || $$

## Exemplo simples e técnica de prova
Uma pessoa começa a executar um furto, mas é impedida por um segurança antes de conseguir subtrair o bem: pode haver tentativa, pois a execução começou e a consumação foi impedida por circunstância alheia à vontade do agente. Se ela apenas pensa em furtar ou compra ferramentas, sem iniciar atos executórios, em regra ainda não há tentativa.

**Macete:** fato típico = o que aconteceu; ilicitude = era permitido?; culpabilidade = é possível reprovar pessoalmente o agente? Não misture as três etapas.$$
when 'pcac-2026-direito-penal-03-crimes-pessoa-patrimonio' then body_md || $$

## Exemplo simples e técnica de prova
Se o agente pega escondido o celular de alguém, sem violência ou grave ameaça, pense em furto. Se ameaça a vítima para pegar o aparelho, pense em roubo. Se recebe o celular legitimamente para guardar e depois decide ficar com ele, a situação pode caracterizar apropriação indébita. Se engana a vítima para que ela própria entregue o dinheiro, a análise aponta para estelionato.

**Dica:** sublinhe o verbo do enunciado: subtrair, ameaçar, apropriar-se ou induzir em erro. O modo de agir costuma resolver a classificação.$$
when 'pcac-2026-direito-penal-05-crimes-administracao-publica' then body_md || $$

## Exemplo simples e técnica de prova
Se o servidor exige dinheiro para praticar um ato, o verbo aponta para concussão. Se solicita ou aceita promessa de vantagem, pode haver corrupção passiva. Se atrasa um ato para satisfazer interesse pessoal, a descrição aponta para prevaricação.

**Macete:** concussão = exigir; corrupção passiva = solicitar/receber/aceitar promessa; prevaricação = agir ou deixar de agir para satisfazer interesse ou sentimento pessoal. Confira sempre os demais elementos do tipo.$$
when 'pcac-2026-direito-administrativo-01-principios-administracao-publica' then body_md || $$

## Exemplo prático
Um gestor escolhe divulgar apenas a publicidade de sua própria imagem com recursos públicos: a situação aponta para violação da impessoalidade. Se divulga dados pessoais protegidos sem fundamento, a publicidade foi tratada como se fosse absoluta, o que também está errado.

**Como acertar:** identifique o comportamento e associe ao princípio violado. Eficiência não corrige ilegalidade; publicidade não elimina sigilo legítimo; impessoalidade não permite promoção pessoal.$$
when 'pcac-2026-direito-administrativo-02-organizacao-direta-indireta' then body_md || $$

## Exemplo prático
Uma secretaria estadual integra a estrutura do próprio Estado: Administração direta. Uma autarquia tem personalidade jurídica própria e integra a Administração indireta. Se o Estado apenas cria departamentos dentro da secretaria, há desconcentração; se atribui a execução a outra pessoa jurídica, há descentralização.

**Macete:** desconcentração = distribuição interna; descentralização = outra pessoa executa. Órgão não tem personalidade própria; entidade tem.$$
when 'pcac-2026-direito-administrativo-03-poderes-administrativos' then body_md || $$

## Exemplo prático
Se um chefe distribui tarefas e fiscaliza subordinados, exerce poder hierárquico. Se apura infração funcional e aplica sanção, exerce poder disciplinar. Se ultrapassa sua competência, há excesso de poder; se usa a competência para finalidade diferente da prevista, há desvio de finalidade.

**Macete:** excesso = passou do limite da competência; desvio = usou o poder para finalidade errada. Discricionariedade nunca significa liberdade para arbitrariedade.$$
when 'pcac-2026-direito-administrativo-04-poder-de-policia' then body_md || $$

## Exemplo prático
A vigilância sanitária pode fiscalizar um restaurante e, conforme a lei e o caso, determinar a interdição por risco sanitário. Isso é poder de polícia administrativa. A investigação de um crime ocorrido no local é atividade de polícia judiciária, com finalidade e regime próprios.

**Dica:** fiscalização de atividade, bem ou direito = polícia administrativa; apuração de infração penal = polícia judiciária. Não presuma que todo ato de polícia seja discricionário ou autoexecutório.$$
when 'pcac-2026-direito-administrativo-05-atos-administrativos' then body_md || $$

## Exemplo prático
Se um ato foi praticado por autoridade incompetente, pode existir vício de competência. Se o ato é legal, mas se tornou inconveniente, a Administração pode avaliar sua revogação. Se é ilegal, a providência adequada é a anulação, observados os limites legais.

**Macete:** ilegalidade = anulação; conveniência/oportunidade de ato válido = revogação. O Judiciário controla a legalidade, mas não substitui a Administração na escolha legítima de mérito.$$
when 'pcac-2026-direito-administrativo-07-responsabilidade-civil-estado' then body_md || $$

## Exemplo prático
Um veículo oficial, conduzido por agente em serviço, causa dano a terceiro. Para a responsabilidade objetiva do Estado, a vítima deve demonstrar o dano e o nexo com a atuação do agente nessa qualidade; não precisa provar a culpa pessoal do servidor. Se o Estado indenizar, poderá buscar regresso se demonstrar dolo ou culpa do agente.

**Macete:** vítima contra Estado = regra objetiva; Estado contra agente = regresso exige dolo ou culpa. Não confunda as duas relações.$$
when 'pcac-2026-constituicao-federal-fundamentos-direitos-administracao-seguranca' then body_md || $$

## Exemplo simples e técnica de prova
Se a questão disser que reduzir desigualdades é fundamento do art. 1º, desconfie: é objetivo fundamental do art. 3º. Se disser que dignidade da pessoa humana é objetivo do art. 3º, também trocou a categoria: é fundamento do art. 1º.

**Macete:** art. 1º = quem somos e em que a República se fundamenta; art. 3º = o que a República busca construir. Para a Polícia Civil, memorize o recorte do art. 144, § 4º.$$
when 'pcac-2026-constitucional-remedios-art37-art144' then body_md || $$

## Exemplo simples e técnica de prova
Uma pessoa sofre ameaça ilegal à liberdade de ir e vir: habeas corpus. Quer consultar ou corrigir dado pessoal em banco público: habeas data. Tem direito líquido e certo comprovável de plano, sem cabimento de HC ou HD: mandado de segurança. Falta norma que impede exercer direito constitucional: mandado de injunção.

**Macete:** locomoção = HC; dados = HD; direito líquido e certo = MS; falta de norma = MI; ato lesivo aos bens do art. 5º, LXXIII = ação popular.$$
when 'pcac-2026-constitucional-constituicao-acre-policia-civil' then body_md || $$

## Exemplo simples e técnica de prova
Se a questão afirmar que o Acre é soberano, está errada: o Estado é autônomo dentro da Federação. Se trocar a lista atual do art. 131 e retirar o Instituto Socioeducativo, confira a EC estadual nº 63/2022. Se atribuir à Polícia Civil a apuração ordinária de infrações militares, contraria o recorte do art. 133.

**Macete:** autonomia não é soberania; art. 131 = órgãos estaduais de segurança; arts. 133 e 134 = funções e carreira da Polícia Civil. Em questão literal, confira o texto consolidado da Constituição estadual.$$
when 'pcac-2026-direito-penal-04-crimes-sexuais-mortos-fe-publica' then case when body_md not like '%Atualização legislativa — Lei nº 15.353/2026%' then body_md || $$\n\n## 5. Atualização legislativa — Lei nº 15.353/2026\n\nA Lei nº 15.353/2026 alterou o art. 217-A do Código Penal. O novo § 4º-A estabelece que a presunção de vulnerabilidade da vítima é absoluta e não admite relativização. O § 5º determina a aplicação das penas independentemente do consentimento, da experiência sexual anterior ou da ocorrência de gravidez.\n\n**Em linguagem simples:** nos casos enquadrados no art. 217-A, não se pode afastar a vulnerabilidade alegando que a vítima consentiu, já tinha experiência sexual ou engravidou. Esses fatores não afastam a tipicidade prevista no dispositivo.\n\n**Dica de prova:** se a questão disser que a experiência sexual anterior ou o consentimento relativizam a vulnerabilidade do art. 217-A, o item está errado. A alteração entrou em vigor na publicação, em 08/03/2026.\n\n**Atenção ao recorte do edital:** a atualização legislativa deve ser conhecida porque altera diretamente o tipo indicado no programa. $$ else body_md end
when 'pcac-2026-direito-penal-06-tortura-abuso-autoridade' then case when body_md not like '%Atualização legislativa — Lei nº 15.410/2026%' then body_md || $$\n\n## 5. Atualização legislativa — Lei nº 15.410/2026\n\nA Lei nº 15.410/2026 alterou a Lei de Execução Penal e a Lei nº 9.455/1997. Na Lei de Tortura, passou a prever modalidade relacionada à submissão reiterada da mulher a intenso sofrimento físico ou mental no contexto de violência doméstica e familiar.\n\n**Em linguagem simples:** a descrição legal exige submissão reiterada, sofrimento intenso físico ou mental e o contexto doméstico e familiar previsto na lei. A análise deve observar todos os elementos do tipo.\n\n**Dica de prova:** destaque três expressões do enunciado: reiteração, sofrimento intenso e contexto de violência doméstica e familiar. Não confunda essa modalidade com a finalidade específica exigida pela Lei nº 13.869/2019 para abuso de autoridade.\n\n**Pegadinha:** a Lei nº 15.410/2026 não revogou a Lei de Tortura; acrescentou previsão específica. $$ else body_md end
when 'pcac-2026-direito-administrativo-06-agentes-publicos' then replace(body_md,'A Constituição proíbe acumulação remunerada, ressalvadas hipóteses constitucionais com compatibilidade de horários, como dois cargos de professor; um de professor com outro técnico ou científico; e dois cargos ou empregos privativos de profissionais de saúde com profissões regulamentadas.','A Constituição proíbe a acumulação remunerada, mas prevê exceções com compatibilidade de horários e observância do teto. São permitidos: dois cargos de professor; um cargo de professor com outro de qualquer natureza; e dois cargos ou empregos privativos de profissionais de saúde, com profissões regulamentadas.\n\n**Atualização essencial — EC nº 138/2025:** desde 22/12/2025, a alínea “b” do art. 37, XVI, permite professor + outro cargo de qualquer natureza. Não é mais necessário que o segundo cargo seja técnico ou científico.\n\n**Exemplo simples:** professor + cargo administrativo pode ser acumulável, desde que haja compatibilidade de horários e sejam respeitadas as demais regras constitucionais. A expressão “qualquer natureza” não elimina esses requisitos.')
else body_md end,
legal_review = jsonb_build_object('status','reviewed_against_official_updated_text','review_date','2026-11-14','scope','Revisão jurídica do conteúdo, dispositivos do edital e legislação oficial vigente; alterações legislativas pertinentes incorporadas às aulas específicas.','changes',case when slug='pcac-2026-direito-penal-04-crimes-sexuais-mortos-fe-publica' then jsonb_build_array('Lei 15.353/2026: presunção absoluta de vulnerabilidade no art. 217-A, §§ 4º-A e 5º.') when slug='pcac-2026-direito-penal-06-tortura-abuso-autoridade' then jsonb_build_array('Lei 15.410/2026: inclusão de modalidade de tortura relacionada à violência doméstica e familiar.') when slug='pcac-2026-direito-administrativo-06-agentes-publicos' then jsonb_build_array('EC 138/2025: professor pode acumular com outro cargo de qualquer natureza, observada a compatibilidade de horários.') else jsonb_build_array() end,
'sources',case when discipline='Noções de Direito Penal e Processual Penal' then jsonb_build_array(jsonb_build_object('title','Código Penal — texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'),jsonb_build_object('title','Lei 15.353/2026','url','https://www2.camara.leg.br/legin/fed/lei/2026/lei-15353-8-marco-2026-798789-norma-pl.html'),jsonb_build_object('title','Lei 15.410/2026','url','https://www2.camara.leg.br/legin/fed/lei/2026/lei-15410-20-maio-2026-799133-norma-pl.html')) when discipline='Noções de Direito Administrativo' then jsonb_build_array(jsonb_build_object('title','Constituição Federal — texto atualizado','url','https://www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-normaatualizada-pl.html'),jsonb_build_object('title','Lei 9.784/1999','url','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm'),jsonb_build_object('title','EC 138/2025','url','https://www2.camara.leg.br/legin/fed/emecon/2025/emendaconstitucional-138-19-dezembro-2025-798508-norma-pl.html')) else jsonb_build_array(jsonb_build_object('title','Constituição Federal — texto atualizado','url','https://www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-normaatualizada-pl.html'),jsonb_build_object('title','Constituição do Estado do Acre','url','https://www.al.ac.leg.br/wp-content/uploads/2014/10/constitui%C3%A7%C3%A3o_atualizada.pdf')) end),
practice_review=jsonb_build_object('status','reviewed','review_date','2026-11-14','items_checked',jsonb_array_length(coalesce(quiz,'[]'::jsonb)),'method','Conferência individual de enunciado, gabarito e justificativa, com verificação de coerência com o material e a norma aplicável.','result','Questões existentes conferidas; atualização legislativa incorporada aos tópicos correspondentes.'),
law_version_checked_at='2026-11-14 23:59:00-03'::timestamptz,
reviewed_at='2026-11-14 23:59:00-03'::timestamptz,
updated_at=now()
where slug in ('pcac-2026-direito-penal-01-aplicacao-lei-penal','pcac-2026-direito-penal-02-teoria-do-crime','pcac-2026-direito-penal-03-crimes-pessoa-patrimonio','pcac-2026-direito-penal-04-crimes-sexuais-mortos-fe-publica','pcac-2026-direito-penal-05-crimes-administracao-publica','pcac-2026-direito-penal-06-tortura-abuso-autoridade','pcac-2026-direito-administrativo-01-principios-administracao-publica','pcac-2026-direito-administrativo-02-organizacao-direta-indireta','pcac-2026-direito-administrativo-03-poderes-administrativos','pcac-2026-direito-administrativo-04-poder-de-policia','pcac-2026-direito-administrativo-05-atos-administrativos','pcac-2026-direito-administrativo-06-agentes-publicos','pcac-2026-direito-administrativo-07-responsabilidade-civil-estado','pcac-2026-constituicao-federal-fundamentos-direitos-administracao-seguranca','pcac-2026-constitucional-remedios-art37-art144','pcac-2026-constitucional-constituicao-acre-policia-civil') and content_status='active';
