-- Explicações do dia a dia: DEPEN 2021 (Departamento Penitenciário Nacional /
-- Agente Federal de Execução Penal, CEBRASPE) — lote 6: itens 103, 105, 107,
-- 108, 109, 110, 111, 112, 113, 115, 116, 117, 118 (bloco "Regulamento
-- Penitenciário Federal", topic_map 103-120).
--
-- Fonte: supabase/migrations/20260927003000_depen_2021_reimport_fixed.sql
-- (versão final e corrigida da reimportação). topic_map ali confirma:
--   103-120  Regulamento Penitenciário Federal
--
-- question_text é a transcrição verbatim do caderno de provas fornecido pelo
-- candidato; official_answer conferido no gabarito definitivo (MATRIZ_541_
-- DEPEN_008_00, CB2 e CG2).
--
-- AUTOSSUFICIÊNCIA: todos os itens deste lote trazem o enunciado completo
-- dentro do próprio question_text (declarações gerais, ou hipóteses fechadas
-- em que os personagens — ex.: Alberto/Bernardo no item 111, Manoel/Carlos no
-- item 112 — são apresentados no próprio item, sem depender de texto-base ou
-- de personagem introduzido em item anterior).
--
-- ESCOPO DESTE LOTE: itens 103,105,107,108,109,110,111,112,113,115,116,117,118
-- (13 itens). Nenhum tem official_answer='X' (nenhuma anulação neste
-- subconjunto).
--
-- Ficaram de fora deste lote, propositalmente (dentro do intervalo 103-120):
--   - item 104 (proteção de dados / "Coordenação de Aparelhamento e
--     Tecnologia"): o Decreto nº 6.049/2007 (Regulamento Penitenciário
--     Federal) não prevê órgão com esse nome entre os órgãos auxiliares
--     (art. 12) nem atribui essa competência especificamente a ele; não foi
--     possível localizar e conferir com segurança nesta sessão qual unidade
--     (se existente) tem essa atribuição. Fica em under_review.
--   - item 106 (interstício de doze meses entre progressões funcionais e
--     suspensão da contagem em afastamentos): depende de dispositivo
--     específico da lei de carreira (Lei nº 11.907/2009, com as alterações
--     da Lei nº 13.327/2016) sobre progressão funcional que não foi
--     localizado e conferido com o detalhe necessário (prazo exato e regra de
--     suspensão de contagem) nesta sessão. Fica em under_review.
--   - item 114 (competência para promover capacitação dos ocupantes do cargo
--     de agente federal de execução penal): a Lei nº 11.907/2009 (com
--     redação da Lei nº 13.327/2016) foi consultada nesta sessão, mas não
--     foi localizado nela o dispositivo que atribui (ou nega) essa
--     competência especificamente à Diretoria-Geral do DEPEN; sem essa
--     base exata, preferiu-se não arriscar. Fica em under_review.
--   - itens 119 e 120 (vedação a cirurgias estéticas eletivas fora do SUS;
--     requisitos para pesquisa científica com preso): não foi localizado,
--     com segurança, o dispositivo regulamentar/normativo específico que
--     ampara cada um desses itens nesta sessão. Ficam em under_review.
-- Nenhum item deste lote sobrepõe os itens já cobertos pelos lotes 1-5
-- (1-30 minus faltantes de lote 2, 45-62 minus 52/54/58, 63-74 minus 65/73,
-- 75-80, 88, 89, 93, 94).
--
-- VERIFICAÇÃO DE VIGÊNCIA (nesta sessão, 29/09/2026, via Firecrawl, pois o
-- WebFetch direto a planalto.gov.br está bloqueado pelo proxy de rede deste
-- ambiente — mesma situação relatada nos lotes 3, 4 e 5):
--   - Decreto nº 6.049/2007 (Regulamento Penitenciário Federal),
--     planalto.gov.br/ccivil_03/_ato2007-2010/2007/decreto/d6049.htm —
--     texto integral lido nesta sessão. Confirmados vigentes: art. 13
--     (Corregedoria-Geral: fiscalização/correição) e art. 14 (Ouvidoria:
--     recebe reclamações e denúncias); art. 22 (assistência à saúde,
--     inclusive hospitalar, "dentro do estabelecimento penal federal ou
--     instituição do sistema de saúde pública"); art. 30 (egresso: liberado
--     definitivo, um ano; liberado condicional, período de prova); arts. 44,
--     X e 45, VII (crime culposo = falta média; crime doloso = falta grave);
--     art. 44, V (divulgar notícia que perturbe a ordem/disciplina = falta
--     MÉDIA, não grave); art. 51 (tentativa pune-se com a sanção da falta
--     consumada).
--   - Lei nº 11.907/2009, art. 123 (redação dada pela Lei nº 13.327/2016),
--     planalto.gov.br/ccivil_03/_ato2007-2010/2009/lei/l11907.htm: compete
--     ao agente federal de execução penal o exercício de atividades de
--     atendimento, vigilância, custódia, guarda, escolta, assistência e
--     orientação de pessoas recolhidas aos estabelecimentos penais federais
--     — conferido vigente.
--   - Lei nº 11.671/2008 (transferência e inclusão de presos em
--     estabelecimentos penais federais de segurança máxima),
--     planalto.gov.br/ccivil_03/_ato2007-2010/2008/lei/l11671.htm: art. 3º,
--     §§2º e 3º (gravação de visitas em áreas comuns/parlatório permitida,
--     vedada nas celas e no atendimento advocatício; gravações não servem
--     de prova de infrações penais anteriores ao ingresso do preso); art. 5º
--     (legitimados a requerer a transferência: autoridade administrativa,
--     Ministério Público e o próprio preso); art. 6º (preso condenado: o
--     juízo de origem deve remeter os AUTOS DA EXECUÇÃO PENAL ao juízo
--     federal); art. 7º (preso provisório: basta a carta precatória) —
--     conferido vigente.
--   - Decreto nº 6.877/2009 (regulamenta a Lei nº 11.671/2008),
--     planalto.gov.br/ccivil_03/_ato2007-2010/2009/decreto/d6877.htm: art.
--     3º (rol de seis características alternativas — basta UMA — para
--     inclusão/transferência a estabelecimento federal, entre elas estar
--     submetido ao RDD, inciso III, e ser membro de quadrilha ou bando
--     envolvido em prática reiterada de crimes com violência, inciso IV);
--     art. 8º, I e II (repete a distinção autos da execução x carta
--     precatória); art. 11, caput (obtida a progressão de regime, cabe ao
--     DEPEN providenciar o retorno do preso ao local de origem ou sua
--     transferência ao estabelecimento indicado para o novo regime) —
--     conferido vigente.
--   - Lei nº 11.473/2007 (cooperação federativa / Força Nacional de
--     Segurança Pública), planalto.gov.br/ccivil_03/_ato2007-2010/2007/
--     lei/l11473.htm, art. 5º, §1º (redação atual): permite, em caráter
--     excepcional, o desempenho voluntário dessas atividades por militares,
--     policiais e servidores inativos/aposentados há menos de cinco anos e
--     por reservistas, quando os convênios forem insuficientes para suprir
--     o efetivo da FNSP — conferido vigente (não há vedação ao caráter
--     voluntário).

-- 103: Decreto 6.049/2007, art. 44, V — divulgar notícia que perturbe a
-- ordem/disciplina é falta MÉDIA, não grave.
update public.official_exam_questions set review_note=$q$Errado. O art. 44, inciso V, do Regulamento Penitenciário Federal (Decreto nº 6.049/2007) classifica "divulgar notícia que possa perturbar a ordem ou a disciplina" como falta disciplinar de natureza MÉDIA, e não grave. As faltas graves estão listadas à parte, no art. 45 (fugir, incitar movimento para subverter a ordem, portar arma etc.) — e essa conduta não está nesse rol.
Exemplo: é como separar infrações de trânsito em "leves, médias e graves" — espalhar um boato que atrapalha a rotina do presídio incomoda e é punido, mas o Regulamento não coloca essa conduta no mesmo patamar de gravidade de uma fuga ou de um motim; por isso a classificação correta é média, não grave.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=103 and content_status='under_review';

-- 105: Lei 11.907/2009, art. 123 (redação da Lei 13.327/2016) — atribuições
-- do agente federal de execução penal incluem vigilância e orientação.
update public.official_exam_questions set review_note=$q$Certo. O art. 123 da Lei nº 11.907/2009, na redação dada pela Lei nº 13.327/2016, diz textualmente que compete aos ocupantes do cargo de Agente Federal de Execução Penal "o exercício das atividades de atendimento, vigilância, custódia, guarda, escolta, assistência e orientação de pessoas recolhidas aos estabelecimentos penais e de internamento federais". Ou seja, vigiar e orientar a pessoa presa está expressamente entre as atribuições legais do cargo.
Exemplo: é a própria "ficha de função" do cargo, descrita em lei — assim como o edital de qualquer concurso lista as atribuições do cargo, a lei que estrutura a carreira já define, com todas as letras, que vigiar e orientar os presos faz parte do dia a dia do agente federal de execução penal.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=105 and content_status='under_review';

-- 107: Lei 11.671/2008, art. 3º, §§2º e 3º — gravações de visitas em
-- presídio federal de segurança máxima não valem como prova de fatos
-- anteriores ao ingresso do preso.
update public.official_exam_questions set review_note=$q$Certo. O art. 3º, §2º, da Lei nº 11.671/2008 autoriza o monitoramento de áudio e vídeo no parlatório e nas áreas comuns dos estabelecimentos penais federais de segurança máxima (vedado nas celas e no atendimento advocatício). Já o §3º do mesmo artigo é expresso: "As gravações das visitas não poderão ser utilizadas como meio de prova de infrações penais pretéritas ao ingresso do preso no estabelecimento." Ou seja, a gravação existe e é permitida, mas só serve para a segurança e a disciplina do presídio — não pode ser usada para incriminar o preso por fatos anteriores à sua chegada ali.
Exemplo: é como uma câmera de segurança de um prédio novo — ela grava o que acontece dali para frente, mas ninguém tentaria usar essa gravação para provar algo que o morador fez antes de se mudar para o prédio; a lei limita expressamente esse uso da gravação a fatos ocorridos dentro daquele estabelecimento.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=107 and content_status='under_review';

-- 108: Decreto 6.049/2007, art. 22 — assistência à saúde compreende
-- atendimento hospitalar dentro ou fora do estabelecimento.
update public.official_exam_questions set review_note=$q$Certo. O art. 22 do Regulamento Penitenciário Federal (Decreto nº 6.049/2007) prevê que a assistência à saúde do preso compreenderá os atendimentos médico, farmacêutico, odontológico, ambulatorial e hospitalar, "dentro do estabelecimento penal federal ou instituição do sistema de saúde pública". Ou seja, quando a gravidade do caso (como um surto psicótico) exigir, o preso pode, sim, ser encaminhado e internado em uma unidade de saúde fora do presídio.
Exemplo: é como qualquer serviço de saúde que atende dentro de casa até certo ponto, mas encaminha para o hospital quando o quadro exige mais estrutura — dentro do presídio há atendimento básico, mas o Regulamento já prevê a possibilidade de internação externa quando a gravidade do caso pedir.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=108 and content_status='under_review';

-- 109: Decreto 6.877/2009, art. 3º, III — RDD é uma das seis
-- características alternativas para inclusão/transferência a
-- estabelecimento penal federal.
update public.official_exam_questions set review_note=$q$Certo. O art. 3º do Decreto nº 6.877/2009 (que regulamenta a Lei nº 11.671/2008) lista seis características alternativas — basta o preso ter pelo menos uma delas — para justificar sua inclusão ou transferência para estabelecimento penal federal. O inciso III dessa lista é exatamente "estar submetido ao Regime Disciplinar Diferenciado – RDD". As outras hipóteses incluem, por exemplo, liderança em organização criminosa ou risco à integridade física no presídio de origem. Como o item apenas afirma que o RDD está "entre as características" que podem justificar a transferência (sem dizer que é a única ou que todas são exigidas juntas), ele está correto.
Exemplo: é como uma lista de critérios para entrar num programa especial — não é preciso cumprir todos ao mesmo tempo; basta se encaixar em um deles, e estar no regime disciplinar diferenciado é um desses critérios que, sozinho, já abre a porta para a transferência.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=109 and content_status='under_review';

-- 110: Decreto 6.049/2007, arts. 13 e 14 — reclamações/denúncias vão para a
-- Ouvidoria, não para a Corregedoria-Geral.
update public.official_exam_questions set review_note=$q$Errado. O Regulamento Penitenciário Federal separa as duas funções em órgãos diferentes. O art. 13 diz que a Corregedoria-Geral cuida da fiscalização e da correição dos atos de gestão dos administradores do sistema (ou seja, fiscaliza a própria administração). Já o art. 14 atribui à Ouvidoria, especificamente, o encargo de "receber, avaliar, sugerir e encaminhar propostas, reclamações e denúncias" recebidas pelo DEPEN. Uma reclamação de familiar sobre as condições de um preso deve, portanto, ser encaminhada à Ouvidoria, e não à Corregedoria-Geral.
Exemplo: é a diferença entre o setor de auditoria interna de uma empresa e o seu SAC — a auditoria (Corregedoria) fiscaliza se os gestores estão agindo dentro da lei; o SAC (Ouvidoria) é o canal aberto para o público registrar reclamações e denúncias. São portas diferentes para funções diferentes.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=110 and content_status='under_review';

-- 111: Decreto 6.049/2007, art. 30 — egresso: liberado definitivo, um ano;
-- liberado condicional, durante o período de prova.
update public.official_exam_questions set review_note=$q$Certo. O art. 30 do Regulamento Penitenciário Federal define, para efeitos de assistência ao egresso, duas situações com prazos diferentes: o inciso I considera egresso "o liberado definitivo, pelo prazo de um ano a contar da saída do estabelecimento penal"; o inciso II considera egresso "o liberado condicional, durante o período de prova". Isso bate exatamente com a situação de Alberto (liberado definitivo — um ano de assistência) e Bernardo (livramento condicional — assistência durante todo o período de prova).
Exemplo: pensa em dois "prazos de acompanhamento" diferentes — quem sai em definitivo tem um ano de suporte contado a partir da soltura, como uma espécie de "período de transição" fixo; já quem está em livramento condicional continua sendo acompanhado enquanto durar essa condição, que pode ser mais longa ou mais curta, dependendo do caso.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=111 and content_status='under_review';

-- 112: Decreto 6.049/2007, arts. 44, X e 45, VII — crime culposo é falta
-- média; crime doloso é falta grave.
update public.official_exam_questions set review_note=$q$Certo. O Regulamento Penitenciário Federal trata os dois casos de forma diferente conforme o elemento subjetivo do crime praticado pelo preso dentro do estabelecimento. O art. 44, inciso X, classifica como falta MÉDIA "praticar fato previsto como crime culposo ou contravenção" — é o caso de Carlos. Já o art. 45, inciso VII, classifica como falta GRAVE "praticar fato previsto como crime doloso" — é o caso de Manoel. Logo, dos dois, somente Manoel cometeu falta de natureza grave; a conduta de Carlos, por ser culposa, fica no patamar de falta média.
Exemplo: é como comparar um acidente de trânsito causado por descuido (culpa) com uma briga provocada de propósito (dolo) — as consequências disciplinares não são as mesmas, porque a intenção de quem agiu pesa na hora de classificar a gravidade da falta.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=112 and content_status='under_review';

-- 113: Decreto 6.049/2007, art. 51 — tentativa é punida com a sanção da
-- falta consumada.
update public.official_exam_questions set review_note=$q$Certo. O art. 51 do Regulamento Penitenciário Federal é direto: "Pune-se a tentativa com a sanção correspondente à falta consumada." Ou seja, para fins disciplinares dentro do presídio federal, não importa se Jonas efetivamente concluiu a falta média ou apenas tentou — a punição prevista é a mesma que seria aplicada se a falta tivesse sido consumada.
Exemplo: é diferente do que costuma acontecer no Direito Penal comum, em que a tentativa geralmente tem pena reduzida em relação ao crime consumado — aqui, no regime disciplinar do preso, o Regulamento optou por não fazer essa distinção: tentar já é tratado com o mesmo peso de ter feito.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=113 and content_status='under_review';

-- 115: Lei 11.473/2007, art. 5º, §1º — desempenho voluntário é permitido
-- sob certas condições, não vedado.
update public.official_exam_questions set review_note=$q$Errado. A Lei nº 11.473/2007, que trata da cooperação federativa em segurança pública (inclusive da Força Nacional de Segurança Pública), prevê no art. 5º, §1º, em sua redação atual, que — quando os convênios firmados entre a União e os entes federados forem insuficientes para suprir a previsão do efetivo da FNSP e diante de necessidade de excepcional interesse público — essas atividades PODERÃO ser desempenhadas em caráter voluntário, por militares e servidores inativos ou aposentados há menos de cinco anos, e por reservistas nas condições da lei. Ou seja, a lei permite expressamente o voluntariado nessas hipóteses, ao contrário do que afirma o item.
Exemplo: é como um "banco de reservistas" que a lei deixa disponível para emergências — quando o efetivo normal não é suficiente, em vez de proibir, a lei abre uma porta para que pessoas já aposentadas ou fora do serviço ativo, mas ainda dentro do prazo legal, possam ajudar voluntariamente a suprir a falta de gente.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=115 and content_status='under_review';

-- 116: Lei 11.671/2008, art. 6º + Decreto 6.877/2009, art. 8º, I — para
-- preso condenado, é preciso remeter também os autos da execução penal,
-- não basta a carta precatória.
update public.official_exam_questions set review_note=$q$Errado. A Lei nº 11.671/2008 distingue os dois casos. Para o preso PROVISÓRIO, o art. 7º diz que basta a carta precatória remetida pelo juízo de origem para que o juízo federal comece a fiscalizar a prisão. Já para o preso CONDENADO, o art. 6º exige que "o juízo de origem deverá encaminhar ao juízo federal os autos da execução penal" — e não apenas uma carta precatória. O Decreto nº 6.877/2009, que regulamenta essa lei, confirma isso no art. 8º, incisos I e II. Como o juiz de origem admitiu a transferência de um preso CONDENADO, o simples envio da carta precatória não é suficiente: os autos da execução penal também precisam ser remetidos.
Exemplo: é a diferença entre mandar só um bilhete avisando que alguém está preso (carta precatória, para quem ainda está sendo processado) e mandar o "processo inteiro" de quem já foi condenado (autos da execução) — quem já tem sentença definitiva leva junto todo o histórico da execução da pena, porque é esse histórico que vai orientar o cumprimento da pena no novo presídio.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=116 and content_status='under_review';

-- 117: Decreto 6.877/2009, art. 3º — as seis características são
-- alternativas (basta uma), não um teste cumulativo de três requisitos.
update public.official_exam_questions set review_note=$q$Errado. O art. 3º do Decreto nº 6.877/2009 lista seis características, bastando o preso apresentar UMA delas para justificar a inclusão ou transferência a estabelecimento penal federal de segurança máxima — entre elas, separadamente: ter desempenhado liderança em organização criminosa (inciso I) e ser membro de quadrilha ou bando envolvido na prática reiterada de crimes com violência ou grave ameaça (inciso IV). Não existe, na lei, a exigência cumulativa de comprovar ao mesmo tempo os três elementos citados no item (ser membro de quadrilha, praticar crimes reiteradamente com violência E exercer liderança) — qualquer um desses fatores, isoladamente, já pode fundamentar o pedido do Ministério Público.
Exemplo: é como uma lista de "sinais de alerta" independentes — não é preciso que o preso se encaixe em todos ao mesmo tempo para justificar a transferência; basta que se encaixe em um deles, já que cada critério, sozinho, é considerado suficientemente grave.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=117 and content_status='under_review';

-- 118: Decreto 6.877/2009, art. 11, caput — após progressão de regime,
-- cabe ao DEPEN providenciar o retorno ou a transferência do preso.
update public.official_exam_questions set review_note=$q$Certo. O art. 11, caput, do Decreto nº 6.877/2009 diz quase nas mesmas palavras do item: "Na hipótese de obtenção de liberdade ou progressão de regime de preso custodiado em estabelecimento penal federal, caberá ao Departamento Penitenciário Nacional providenciar o seu retorno ao local de origem ou a sua transferência ao estabelecimento penal indicado para cumprimento do novo regime." Ou seja, obtida a progressão, é o DEPEN quem organiza logisticamente o retorno do preso ao presídio de origem ou seu encaminhamento ao novo estabelecimento compatível com o regime mais brando.
Exemplo: é como a área de logística de uma empresa que, quando alguém muda de função, cuida da realocação da pessoa para o novo setor — aqui, quando o preso "muda de regime" e não precisa mais da segurança máxima do presídio federal, é o DEPEN quem organiza o transporte e o destino dele.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=118 and content_status='under_review';
