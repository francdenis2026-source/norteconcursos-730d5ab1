-- Explicações do dia a dia: DEPEN 2021 (Departamento Penitenciário Nacional /
-- Agente Federal de Execução Penal, CEBRASPE) — lote 4: itens 63-74 do
-- caderno, blocos "Direitos Humanos e Política Penitenciária" (63-70) e
-- início de "Regras da ONU e Legislação Especial" (71-80) do topic_map.
--
-- Fonte: supabase/migrations/20260927003000_depen_2021_reimport_fixed.sql
-- (versão final e corrigida da reimportação). topic_map ali confirma:
--   63-67  Direitos Humanos e Política Penitenciária
--   68-70  Direitos Humanos e Política Penitenciária
--   71-80  Regras da ONU e Legislação Especial
--
-- question_text é a transcrição verbatim do caderno de provas fornecido pelo
-- candidato; official_answer conferido no gabarito definitivo (MATRIZ_541_
-- DEPEN_008_00, CB2 e CG2).
--
-- AUTOSSUFICIÊNCIA: os itens 63-74 trazem o enunciado completo dentro do
-- próprio question_text (declarações gerais ou hipóteses fechadas), sem
-- depender de texto-base externo não gravado.
--
-- ESCOPO DESTE LOTE: apenas itens 63,64,66,67,68,69,70,71,72,74 (10 itens).
-- Ficaram de fora, propositalmente:
--   - item 65 ("colegiado interministerial... por meio de portaria"): não
--     cita um dispositivo legal específico e verificável — é uma questão de
--     organização administrativa (se um colegiado interministerial pode ser
--     criado por portaria em vez de decreto/lei) sem uma norma pontual do
--     tema DEPEN a conferir com segurança nesta sessão. Fica em
--     under_review para revisão com acesso à norma exata que a banca tinha
--     em mente.
--   - item 73 (sigilo da infiltração de agentes — Lei 12.850/2013): exigiria
--     verificação de vigência de outra lei (Lei 12.850/2013, art. 12) ainda
--     não conferida nesta sessão; fica de fora para não publicar sem essa
--     checagem. Pode entrar em um próximo lote já com a Lei 12.850
--     verificada.
-- Nenhum item deste lote sobrepõe os itens já cobertos pelos lotes 1-3
-- (1-30, 45-62).
--
-- VERIFICAÇÃO DE VIGÊNCIA (nesta sessão, 29/09/2026, via Firecrawl, pois o
-- WebFetch direto a planalto.gov.br está bloqueado pelo proxy de rede deste
-- ambiente — mesma situação relatada no lote 3):
--   - Lei de Execução Penal (Lei nº 7.210/1984),
--     planalto.gov.br/ccivil_03/leis/l7210.htm:
--     art. 1º (objetivo da execução penal: efetivar a sentença e promover a
--     harmônica integração social — não "punir de forma justa e
--     proporcional"), art. 64, IV e VI (compete ao Conselho Nacional de
--     Política Criminal e Penitenciária — CNPCP — estimular a pesquisa
--     criminológica e estabelecer regras sobre arquitetura e construção de
--     estabelecimentos penais, e não aos "conselhos penitenciários"
--     estaduais) e art. 81, I (Conselho da Comunidade visita os
--     estabelecimentos penais da comarca ao menos mensalmente) conferidos —
--     vigentes, sem alteração que afete estas questões.
--   - Constituição Federal de 1988, art. 5º, §3º (redação da EC nº 45/2004),
--     planalto.gov.br/ccivil_03/constituicao/constituicao.htm: tratados e
--     convenções internacionais sobre direitos humanos só equivalem a
--     emenda constitucional quando aprovados em cada Casa do Congresso, em
--     dois turnos, por três quintos dos votos — não é um efeito automático
--     de todo tratado desde 1988 — conferido vigente.
--   - Estatuto do Desarmamento (Lei nº 10.826/2003), art. 25, caput,
--     planalto.gov.br/ccivil_03/leis/2003/l10.826.htm: armas de fogo
--     apreendidas que não mais interessarem à persecução penal são
--     encaminhadas pelo juiz ao Comando do Exército (órgão do Ministério da
--     Defesa) para destruição ou doação — não ao Ministério da Justiça —
--     conferido vigente (redação dada pela Lei nº 13.886/2019).
--   - Declaração Universal dos Direitos Humanos (ONU, 1948), art. 11.1,
--     texto oficial em português conferido via ACNUDH/ONU Brasil e Unicef
--     Brasil: consagra expressamente a presunção de inocência do acusado
--     até prova de culpa em julgamento público com garantias de defesa.
--   - CNPCP (fonte institucional gov.br/senappen — Secretaria Nacional de
--     Políticas Penais, sucessora do DEPEN): confirma que é o próprio CNPCP
--     quem elabora o Plano Nacional de Política Criminal e Penitenciária e
--     fixa suas diretrizes a cada 4 anos — não é atribuição exclusiva do
--     Ministério da Justiça e Segurança Pública.

-- 63: DUDH, art. 11.1 — presunção de inocência do acusado até prova de
-- culpa em julgamento com garantias de defesa.
update public.official_exam_questions set review_note=$q$Certo. O art. 11.1 da Declaração Universal dos Direitos Humanos (ONU, 1948) diz, em tradução oficial: "Todo ser humano acusado de um ato delituoso tem o direito de ser presumido inocente até que a sua culpabilidade tenha sido provada de acordo com a lei, em julgamento público no qual lhe tenham sido asseguradas todas as garantias necessárias à sua defesa." Ou seja, a presunção de inocência (também chamada de presunção de não culpabilidade) é, sim, um direito reconhecido desde a própria Declaração Universal — não é uma invenção só do direito brasileiro.
Exemplo: é o mesmo princípio por trás da ideia de que ninguém deve ser tratado como culpado nos jornais ou na opinião pública antes de um julgamento justo — a acusação, por si só, não tira de ninguém o direito de ser visto como inocente até prova em contrário.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=63 and content_status='under_review';

-- 64: CF/1988, art. 5º, §3º (EC 45/2004) — equivalência a emenda
-- constitucional não é automática, depende de aprovação qualificada.
update public.official_exam_questions set review_note=$q$Errado. Desde a Emenda Constitucional nº 45/2004, o art. 5º, §3º, da Constituição Federal prevê que "os tratados e convenções internacionais sobre direitos humanos que forem aprovados, em cada Casa do Congresso Nacional, em dois turnos, por três quintos dos votos dos respectivos membros, serão equivalentes às emendas constitucionais". Repare no "que forem aprovados" por esse rito especial: a equivalência a emenda constitucional não é um efeito automático de qualquer tratado de direitos humanos ratificado pelo Brasil desde 1988 — é preciso que o tratado passe por essa votação qualificada, igual à de uma emenda. Tratados aprovados pelo rito comum (maioria simples) continuam tendo apenas status supralegal, não de emenda constitucional.
Exemplo: é como a diferença entre uma lei comum e uma lei aprovada por quórum de emenda constitucional — o simples fato de ser uma "lei sobre direitos humanos" não a torna automaticamente do mesmo nível da Constituição; só o rito reforçado (dois turnos, três quintos) dá esse status especial, e nem todo tratado passa por ele.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=64 and content_status='under_review';

-- 66: LEP, art. 64 c/c fontes institucionais do CNPCP — fixação de
-- diretrizes da política penitenciária não é exclusiva do MJSP.
update public.official_exam_questions set review_note=$q$Errado. A fixação de diretrizes da política penitenciária nacional não é atribuição exclusiva do Ministério da Justiça e Segurança Pública. O art. 64 da Lei de Execução Penal (Lei nº 7.210/1984) atribui ao Conselho Nacional de Política Criminal e Penitenciária (CNPCP) — colegiado vinculado ao Ministério da Justiça, mas com competência própria — a incumbência de propor diretrizes da política criminal e elaborar o Plano Nacional de Política Criminal e Penitenciária, documento que fixa essas diretrizes a cada quatro anos. Ou seja, é o CNPCP quem concentra esse papel técnico-normativo, e não o Ministério isoladamente por ato próprio.
Exemplo: é como dizer que "só o prefeito" define as diretrizes de saúde de uma cidade, quando na verdade existe um Conselho Municipal de Saúde com essa atribuição específica — o órgão colegiado especializado é quem efetivamente fixa a diretriz, mesmo estando vinculado administrativamente a uma pasta do governo.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=66 and content_status='under_review';

-- 67: Lei 10.826/2003 (Estatuto do Desarmamento), art. 25 — destruição de
-- armas de fogo é feita pelo Comando do Exército, órgão do Min. da Defesa.
update public.official_exam_questions set review_note=$q$Certo. O art. 25, caput, da Lei nº 10.826/2003 (Estatuto do Desarmamento) determina que as armas de fogo apreendidas que não mais interessarem à persecução penal sejam encaminhadas pelo juiz competente ao Comando do Exército, no prazo de até 48 horas, para destruição ou doação. O Comando do Exército é um órgão do Ministério da Defesa — por isso, o controle e o registro relacionados à destruição dessas armas, dentro do Sistema Nacional de Armas (Sinarm), passam por esse órgão militar, e não pela Polícia Federal (responsável pelo Sinarm quanto a registro civil e porte) nem por qualquer outro ministério.
Exemplo: é uma divisão de tarefas dentro do mesmo sistema — a Polícia Federal cuida do registro e do porte de armas em circulação, mas quando a arma precisa ser destruída, quem executa e controla esse procedimento é o Exército, ligado à Defesa, porque envolve capacidade técnica e estrutura militar para o descarte seguro.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=67 and content_status='under_review';

-- 68: LEP, art. 64, IV — CNPCP estimula e promove a pesquisa criminológica.
update public.official_exam_questions set review_note=$q$Certo. O art. 64, IV, da Lei de Execução Penal (Lei nº 7.210/1984) inclui expressamente, entre as incumbências do Conselho Nacional de Política Criminal e Penitenciária (CNPCP), "estimular e promover a pesquisa criminológica". Ou seja, cabe a esse conselho não apenas propor diretrizes e fiscalizar o sistema penitenciário, mas também fomentar estudos científicos sobre criminalidade, penas e reintegração social — a pesquisa é vista como ferramenta para embasar política pública, não como algo acessório.
Exemplo: é como um conselho de saúde que não só define regras, mas também financia e incentiva pesquisas sobre novas doenças — sem esse incentivo, a política pública ficaria desatualizada e sem base em evidências.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=68 and content_status='under_review';

-- 69: LEP, art. 64, VI — regras sobre arquitetura/construção de
-- estabelecimentos penais são do CNPCP, não dos "conselhos penitenciários".
update public.official_exam_questions set review_note=$q$Errado. Quem estabelece as regras sobre arquitetura e construção de estabelecimentos penais e casas de albergados é o Conselho Nacional de Política Criminal e Penitenciária (CNPCP), conforme o art. 64, VI, da Lei de Execução Penal (Lei nº 7.210/1984) — e não os "conselhos penitenciários" estaduais, que são órgãos distintos, com atribuições ligadas principalmente ao acompanhamento da execução penal em cada estado (como opinar sobre indultos e livramento condicional), não à definição de padrões arquitetônicos nacionais.
Exemplo: é a diferença entre o órgão nacional que define o "projeto-padrão" de uma escola pública (currículo, estrutura mínima) e a secretaria estadual que administra o dia a dia de cada escola — são níveis e funções diferentes, mesmo estando ambos ligados ao mesmo sistema.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=69 and content_status='under_review';

-- 70: LEP, art. 81, I — Conselho da Comunidade visita mensalmente os
-- estabelecimentos penais da comarca.
update public.official_exam_questions set review_note=$q$Certo. O art. 81, I, da Lei de Execução Penal (Lei nº 7.210/1984) determina que incumbe ao Conselho da Comunidade "visitar, pelo menos mensalmente, os estabelecimentos penais existentes na comarca". "Pelo menos mensalmente" quer dizer que uma visita por mês é o mínimo exigido — o conselho pode visitar com mais frequência, mas nunca com menos do que essa periodicidade.
Exemplo: é como uma regra de manutenção que diz "revise o equipamento ao menos uma vez por mês" — pode revisar toda semana se quiser, mas deixar passar dois meses sem visita já descumpre o mínimo legal.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=70 and content_status='under_review';

-- 71: LEP, art. 1º — objetivo da execução penal é efetivar a sentença e
-- promover a integração social, não "punir de forma justa e proporcional".
update public.official_exam_questions set review_note=$q$Errado. O art. 1º da Lei de Execução Penal (Lei nº 7.210/1984) define o objetivo da execução penal como "efetivar as disposições de sentença ou decisão criminal e proporcionar condições para a harmônica integração social do condenado e do internado". Repare que a lei não fala em "ministrar punição justa e proporcional" como objetivo prioritário — a dosagem da pena (se é justa e proporcional ao crime) já foi decidida na sentença, na fase de conhecimento do processo; a execução penal vem depois, e seu foco declarado é cumprir o que a sentença determinou e, ao mesmo tempo, preparar o condenado para voltar a viver em sociedade.
Exemplo: é a diferença entre o julgamento (que decide "quanto" de pena é justo e proporcional para aquele crime) e o cumprimento da pena (que deve, além de executar essa decisão, também trabalhar a reintegração da pessoa à sociedade) — são dois momentos com finalidades diferentes, e a lei de execução penal fala do segundo.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=71 and content_status='under_review';

-- 72: mediação é meio alternativo de resolução de conflitos, não
-- instrumento de punição de faltas disciplinares.
update public.official_exam_questions set review_note=$q$Errado. A mediação e os demais meios alternativos de resolução de conflitos (como a conciliação e a justiça restaurativa) existem justamente para evitar ou resolver conflitos de forma dialogada, sem recorrer necessariamente à punição — eles buscam reparação, entendimento e pacificação entre as partes envolvidas. Usar a mediação "como meio para punir" contraria a própria natureza do instituto: punição é aplicação de sanção disciplinar (repreensão, suspensão, isolamento etc.), prevista em lei para faltas já cometidas, enquanto a mediação é uma ferramenta de gestão de conflitos, com lógica de resolução consensual, não de aplicação de pena.
Exemplo: é como confundir uma sessão de mediação de conflitos no trabalho com uma advertência formal do RH — a mediação tenta resolver o desentendimento entre as pessoas; a advertência é a punição pela falta. São ferramentas com propósitos opostos, mesmo que ambas lidem com "problemas de comportamento".$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=72 and content_status='under_review';

-- 74: Lei 10.826/2003, art. 25 — armas apreendidas vão ao Comando do
-- Exército (Min. da Defesa), não ao Ministério da Justiça.
update public.official_exam_questions set review_note=$q$Errado. Conforme o art. 25, caput, da Lei nº 10.826/2003 (Estatuto do Desarmamento), as armas de fogo apreendidas que não mais interessarem à investigação (persecução penal) são encaminhadas pelo juiz competente ao Comando do Exército — órgão do Ministério da Defesa — para destruição ou doação, e não ao Ministério da Justiça. É o mesmo dispositivo que explica por que o registro e o controle de armas destruídas também passam pelo Exército, e não por outra pasta do governo.
Exemplo: pense no Comando do Exército como o "destino final" logístico de qualquer arma apreendida que a polícia e a Justiça já não precisam mais guardar como prova — é para lá que ela vai, nunca para o Ministério da Justiça.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=74 and content_status='under_review';
