-- Explicações do dia a dia: DEPEN 2021 (Departamento Penitenciário Nacional /
-- Agente Federal de Execução Penal, CEBRASPE) — lote 5: itens 75-80 (fim do
-- bloco "Regras da ONU e Legislação Especial", topic_map 71-80) e itens
-- 88, 89, 93, 94 (bloco "SUSP e Execução Penal", topic_map 86-94).
--
-- Fonte: supabase/migrations/20260927003000_depen_2021_reimport_fixed.sql
-- (versão final e corrigida da reimportação). topic_map ali confirma:
--   71-80  Regras da ONU e Legislação Especial
--   86-89  SUSP e Execução Penal
--   90-94  SUSP e Execução Penal
--
-- question_text é a transcrição verbatim do caderno de provas fornecido pelo
-- candidato; official_answer conferido no gabarito definitivo (MATRIZ_541_
-- DEPEN_008_00, CB2 e CG2).
--
-- AUTOSSUFICIÊNCIA: todos os itens deste lote trazem o enunciado completo
-- dentro do próprio question_text (declarações gerais ou hipóteses fechadas),
-- sem depender de texto-base externo não gravado.
--
-- ESCOPO DESTE LOTE: itens 75,76,77,78,79,80,88,89,93,94 (10 itens).
-- Ficaram de fora deste lote, propositalmente:
--   - itens 81-85 (Plano Nacional de Política Criminal e Penitenciária —
--     PNPCP 2020-2023): o conteúdo cobrado depende do texto integral desse
--     plano (uma resolução do CNPCP, não uma lei compilada no site do
--     Planalto), que não foi possível localizar e conferir com segurança
--     nesta sessão. Ficam em under_review.
--   - item 86 (força-tarefa de intervenção penitenciária — FTIP): depende de
--     norma específica sobre a composição da FTIP que não foi localizada e
--     conferida nesta sessão. Fica em under_review.
--   - item 87 (visitas sociais em parlatório — periodicidade, duração,
--     número de visitantes): depende do Regulamento Penitenciário Federal
--     (Decreto nº 6.049/2007) em dispositivo específico não conferido nesta
--     sessão. Fica em under_review.
--   - itens 90, 91, 92 (natureza jurisdicional da execução penal, execução
--     provisória por prisão temporária): dependem mais de construção
--     doutrinária/jurisprudencial do que de um dispositivo legal pontual e
--     facilmente verificável nesta sessão; preferiu-se não arriscar uma
--     citação legal imprecisa. Ficam em under_review.
-- Nenhum item deste lote sobrepõe os itens já cobertos pelos lotes 1-4
-- (1-30, 45-62 minus 52/54/58, 63-74 minus 65/73).
--
-- VERIFICAÇÃO DE VIGÊNCIA (nesta sessão, 29/09/2026, via Firecrawl, pois o
-- WebFetch direto a planalto.gov.br está bloqueado pelo proxy de rede deste
-- ambiente — mesma situação relatada nos lotes 3 e 4):
--   - Lei de Drogas (Lei nº 11.343/2006), art. 50, §2º,
--     planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm: o perito
--     que assina o laudo de constatação NÃO fica impedido de participar da
--     elaboração do laudo definitivo — conferido vigente.
--   - Lei de Tortura (Lei nº 9.455/1997), art. 1º, §§6º e 7º,
--     planalto.gov.br/ccivil_03/leis/l9455.htm: crime de tortura é
--     inafiançável e insuscetível de graça ou anistia (§6º); condenado
--     inicia o cumprimento da pena em regime fechado, salvo a hipótese do
--     §2º — conferido vigente.
--   - Lei de Abuso de Autoridade (Lei nº 13.869/2019), art. 3º, §1º,
--     planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13869.htm: os crimes
--     dessa lei são de ação penal pública incondicionada, mas admite-se ação
--     privada subsidiária se a ação pública não for intentada no prazo legal
--     — conferido vigente.
--   - Lei de Lavagem de Dinheiro (Lei nº 9.613/1998), art. 1º, caput
--     (redação da Lei nº 12.683/2012),
--     planalto.gov.br/ccivil_03/leis/l9613.htm: o crime de lavagem
--     pressupõe bens/valores provenientes, direta ou indiretamente, de uma
--     infração penal antecedente — conferido vigente. A autonomia entre o
--     crime de lavagem e o crime antecedente (aqui, integrar organização
--     criminosa) é consolidada na doutrina e na jurisprudência do STJ: são
--     crimes distintos, em concurso material, sem relação de absorção.
--   - Estatuto do Desarmamento (Lei nº 10.826/2003),
--     planalto.gov.br/ccivil_03/leis/2003/l10.826.htm: art. 6º, §1º —
--     apenas os incisos I, II, III, V e VI do art. 6º (Forças Armadas,
--     órgãos do art. 144 da CF/FNSP, guardas municipais, ABIN/GSI e
--     polícias legislativas) têm direito ao porte mesmo fora de serviço; o
--     inciso VII (agentes e guardas prisionais, escoltas de presos e
--     guardas portuárias) NÃO está nessa lista — conferido vigente. Art. 17,
--     caput (redação da Lei nº 13.964/2019) — comércio ilegal de arma de
--     fogo tem pena de reclusão de 6 a 12 anos — conferido vigente.
--   - Lei das Organizações Criminosas (Lei nº 12.850/2013), art. 1º, §1º,
--     planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12850.htm: só se
--     considera organização criminosa a associação de 4 ou mais pessoas
--     para a prática de infrações penais com pena máxima superior a 4 anos,
--     ou de caráter transnacional — conferido vigente. Como o comércio
--     ilegal de arma de fogo tem pena máxima de 12 anos, ele preenche esse
--     requisito objetivo.
--   - Lei do SUSP (Lei nº 13.675/2018),
--     planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13675.htm: art. 9º,
--     §2º — lista os integrantes operacionais do Susp, incluindo polícias
--     militares (V), corpos de bombeiros militares (VI), guardas
--     municipais (VII), agentes de trânsito (XV) e guarda portuária (XVI)
--     — conferido vigente. Art. 12, §2º — os Conselhos de Segurança Pública
--     e Defesa Social têm "competência consultiva, sugestiva e de
--     acompanhamento social", não vinculante — conferido vigente.
--   - Súmula 716 do STF, texto oficial em portal.stf.jus.br: "Admite-se a
--     progressão de regime de cumprimento da pena ou a aplicação imediata
--     de regime menos severo nela determinada, antes do trânsito em julgado
--     da sentença condenatória." — conferida vigente (sem cancelamento).
--   - Código Penal (Decreto-Lei nº 2.848/1940), art. 42,
--     planalto.gov.br/ccivil_03/Decreto-Lei/Del2848compilado.htm: computa-se
--     na pena privativa de liberdade o tempo de prisão provisória
--     (detração) — conferido vigente.

-- 75: Lei 11.343/2006, art. 50, §2º — perito da laudo de constatação NÃO
-- fica impedido de fazer o laudo definitivo.
update public.official_exam_questions set review_note=$q$Errado. O art. 50, §2º, da Lei nº 11.343/2006 (Lei de Drogas) diz exatamente o contrário do item: "O perito que subscrever o laudo a que se refere o §1º deste artigo não ficará impedido de participar da elaboração do laudo definitivo." Ou seja, o mesmo perito pode, sim, assinar tanto o laudo preliminar de constatação (usado para lavrar o flagrante) quanto o laudo definitivo (usado no processo) — não há impedimento entre as duas etapas.
Exemplo: é como um médico que faz um diagnóstico rápido na emergência e depois participa dos exames mais completos do mesmo paciente — não existe uma regra que o proíba de continuar cuidando do caso só porque fez a primeira avaliação.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=75 and content_status='under_review';

-- 76: Lei 9.455/1997, art. 1º, §§6º e 7º — tortura é inafiançável e regime
-- inicial fechado (salvo hipótese do §2º).
update public.official_exam_questions set review_note=$q$Certo. O art. 1º, §6º, da Lei nº 9.455/1997 (Lei de Tortura) determina que "o crime de tortura é inafiançável e insuscetível de graça ou anistia". E o §7º do mesmo artigo complementa: "o condenado por crime previsto nesta Lei, salvo a hipótese do §2º, iniciará o cumprimento da pena em regime fechado". Juntando os dois dispositivos, o item está certo nas duas partes: inafiançável e regime inicial fechado.
Exemplo: é um dos poucos crimes, ao lado do racismo e dos hediondos, que a própria Constituição já trata com mais rigor — não dá pra pagar fiança pra responder ao processo solto, e quem é condenado começa a cumprir a pena já no regime mais restritivo.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=76 and content_status='under_review';

-- 77: Lei 13.869/2019, art. 3º, §1º — ação privada subsidiária cabível se o
-- MP perder o prazo, mesmo sendo ação pública incondicionada.
update public.official_exam_questions set review_note=$q$Certo. O art. 3º da Lei nº 13.869/2019 (Lei de Abuso de Autoridade) diz que os crimes dessa lei são de ação penal pública incondicionada — ou seja, em regra, só o Ministério Público pode processar. Mas o §1º do mesmo artigo prevê a exceção: "será admitida ação privada se a ação penal pública não for intentada no prazo legal". Isso é justamente o que a Constituição já garante de forma geral (art. 5º, LIX, CF/1988) para qualquer crime de ação pública: se o MP "perde o prazo", a própria vítima pode entrar com a ação, de forma subsidiária.
Exemplo: é como uma trava de segurança contra a inércia do MP — o crime continua sendo, em regra, "de responsabilidade" do Ministério Público, mas se ele não age no prazo, a porta não fica fechada: a vítima pode assumir a ação, fiscalizada de perto pelo próprio MP durante todo o processo.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=77 and content_status='under_review';

-- 78: Lei 9.613/1998, art. 1º — lavagem de dinheiro é crime autônomo, não
-- absorve o crime de integrar organização criminosa (concurso material).
update public.official_exam_questions set review_note=$q$Errado. O crime de lavagem de dinheiro não absorve o crime de integrar organização criminosa — são infrações penais distintas e autônomas, respondidas em concurso material (soma de crimes, cada um com sua pena). O art. 1º da Lei nº 9.613/1998 já deixa isso implícito na própria definição: lavagem é ocultar ou dissimular a origem de bens provenientes de uma infração penal antecedente — nesse caso, o próprio crime de integrar a organização criminosa (Lei nº 12.850/2013) é o "crime-base" que gera o dinheiro sujo, e depois vem um segundo crime, autônomo, para escondê-lo. Um pressupõe o outro; não faz sentido dizer que um "engole" o outro.
Exemplo: é a diferença entre roubar um carro e depois trocar a placa e repintá-lo pra disfarçar a origem — são duas ações distintas (o roubo e a "lavagem" do carro), e ninguém diria que trocar a placa "absorve" o roubo. Cada conduta responde pelo seu próprio crime.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=78 and content_status='under_review';

-- 79: Lei 10.826/2003, art. 6º, §1º — o inciso VII (agentes e guardas
-- prisionais) não está entre os que podem portar arma fora de serviço.
update public.official_exam_questions set review_note=$q$Errado. O art. 6º, §1º, do Estatuto do Desarmamento (Lei nº 10.826/2003) só garante o direito de portar arma de fogo mesmo fora de serviço às pessoas previstas nos incisos I, II, III, V e VI do mesmo artigo (Forças Armadas, órgãos de segurança do art. 144 da CF e da Força Nacional, guardas municipais, ABIN/GSI e polícias legislativas). Os agentes e guardas prisionais estão no inciso VII — que NÃO está nessa lista do §1º. Ou seja, fora de serviço, eles não têm esse direito automático de portar arma particular ou da corporação, diferente de outras categorias de segurança pública.
Exemplo: é como um crachá que só abre certas portas em certos horários — dentro do expediente, o agente penitenciário pode portar a arma de função; fora dele, esse crachá simplesmente não vale pra abrir a porta do porte de arma, porque a lei não incluiu essa categoria na lista de quem tem esse privilégio permanente.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=79 and content_status='under_review';

-- 80: Lei 10.826/2003, art. 17 (pena 6-12 anos) + Lei 12.850/2013, art. 1º,
-- §1º (limiar de pena máxima > 4 anos) — comércio ilegal de arma preenche o
-- requisito objetivo.
update public.official_exam_questions set review_note=$q$Errado. O comércio ilegal de arma de fogo (art. 17 da Lei nº 10.826/2003) tem pena de reclusão de 6 a 12 anos — e o art. 1º, §1º, da Lei nº 12.850/2013 (Lei das Organizações Criminosas) exige, como um dos requisitos objetivos, que a infração praticada tenha pena máxima superior a 4 anos (ou seja de caráter transnacional). Como a pena máxima do comércio ilegal de arma (12 anos) é bem superior a esse limite de 4 anos, ele preenche, sim, esse requisito legal objetivo — ao contrário do que o item afirma.
Exemplo: é como uma régua de corte fixada em "pena máxima maior que 4 anos" — qualquer crime com pena que ultrapasse essa régua já entra na conta pra caracterizar organização criminosa (desde que praticado por 4 ou mais pessoas de forma estruturada); e o comércio ilegal de arma, com seus 12 anos de pena máxima, passa bem longe dessa régua.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=80 and content_status='under_review';

-- 88: Lei 13.675/2018, art. 9º, §2º — integrantes operacionais do Susp
-- incluem polícias militares, bombeiros militares, guardas municipais,
-- agentes de trânsito e guarda portuária.
update public.official_exam_questions set review_note=$q$Certo. O art. 9º, §2º, da Lei nº 13.675/2018 (Lei do SUSP) lista os integrantes operacionais do Sistema Único de Segurança Pública, entre eles: polícias militares (inciso V), corpos de bombeiros militares (inciso VI), guardas municipais (inciso VII), agentes de trânsito (inciso XV) e guarda portuária (inciso XVI) — exatamente as categorias citadas no item, todas presentes na lista legal.
Exemplo: pensa no SUSP como um "time" grande de segurança pública — cada integrante (polícia, bombeiro, guarda municipal, agente de trânsito etc.) entra em campo com uma função específica, mas todos fazem parte do mesmo sistema nacional coordenado por lei.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=88 and content_status='under_review';

-- 89: Lei 13.675/2018, art. 12, §2º — posicionamento do CNSP tem natureza
-- consultiva/sugestiva, não vinculante.
update public.official_exam_questions set review_note=$q$Errado. O §2º do art. 12 da Lei nº 13.675/2018 (Lei do SUSP) define que os Conselhos de Segurança Pública e Defesa Social — entre eles o Conselho Nacional de Segurança Pública e Defesa Social (CNSP) — "terão natureza de colegiado, com competência consultiva, sugestiva e de acompanhamento social das atividades de segurança pública e defesa social". Ou seja, o posicionamento desse conselho serve para opinar, sugerir e acompanhar, não para vincular ou obrigar as autoridades a segui-lo à risca, como o item afirma.
Exemplo: é como um conselho consultivo de uma empresa, que dá pareceres e recomendações para a diretoria — as opiniões pesam e devem ser ouvidas, mas a diretoria não é obrigada, por lei, a acatá-las ao pé da letra.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=89 and content_status='under_review';

-- 93: Súmula 716 do STF — progressão de regime antes do trânsito em julgado
-- é admitida.
update public.official_exam_questions set review_note=$q$Certo. A Súmula 716 do STF diz, em seu texto oficial: "Admite-se a progressão de regime de cumprimento da pena ou a aplicação imediata de regime menos severo nela determinada, antes do trânsito em julgado da sentença condenatória." Ou seja, mesmo que a condenação ainda não tenha se tornado definitiva (ainda cabendo recurso), já é possível o preso provisório progredir de regime, desde que preenchidos os demais requisitos da execução penal.
Exemplo: imagina alguém que já está preso preventivamente há bastante tempo e cumpre os requisitos para um regime mais brando — a Súmula 716 evita que essa pessoa fique "presa" num regime mais severo só porque o processo ainda não acabou de vez, quando na prática a situação dela já justificaria a progressão.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=93 and content_status='under_review';

-- 94: Código Penal, art. 42 (detração) — tempo de prisão preventiva é
-- computado na pena privativa de liberdade.
update public.official_exam_questions set review_note=$q$Certo. O art. 42 do Código Penal define a detração penal: "Computam-se, na pena privativa de liberdade e na medida de segurança, o tempo de prisão provisória, no Brasil ou no estrangeiro, o de prisão administrativa e o de internação em qualquer dos estabelecimentos referidos no artigo anterior." Ou seja, os dias que Elisa já passou presa preventivamente durante a investigação não são "tempo perdido": eles entram no cálculo e são abatidos de uma eventual pena privativa de liberdade que ela venha a receber depois.
Exemplo: é como um desconto automático — se alguém já ficou 30 dias detido antes do julgamento e depois é condenado a, digamos, 2 anos de prisão, esses 30 dias já contam como parte do tempo cumprido, sem precisar "recomeçar do zero".$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=94 and content_status='under_review';
