-- Explicações do dia a dia: DEPEN 2021 (Departamento Penitenciário Nacional /
-- Agente Federal de Execução Penal, CEBRASPE) — lote 2: itens 1-19 do
-- caderno (Língua Portuguesa, Lei 12.846/2013 e Ética/Sindicância).
--
-- Fonte: supabase/migrations/20260927003000_depen_2021_reimport_fixed.sql
-- (versão final e corrigida da reimportação). topic_map ali confirma:
--   1-13  Língua Portuguesa
--   14-15 Lei 12.846/2013
--   16-19 Ética, Moral e Sindicância
-- question_text é a transcrição verbatim do caderno de provas fornecido pelo
-- candidato; official_answer conferido no gabarito definitivo (MATRIZ_541_
-- DEPEN_008_00, CB2 e CG2).
--
-- career_name para DEPEN 2021 está gravado como 'Departamento Penitenciário
-- Nacional' (igual a contest_name), confirmado nas migrações anteriores; as
-- cláusulas WHERE abaixo copiam esse valor literalmente.
--
-- ITEM 6 (official_answer='X') é anulado e não é tocado aqui.
--
-- LÍNGUA PORTUGUESA (1-13): seguindo o mesmo critério do PRF 2019 lote 2,
-- só entram neste lote os itens autossuficientes, isto é, cujo enunciado
-- traz todo o trecho necessário para o julgamento gramatical/semântico sem
-- depender do texto-base (que não está gravado em question_text, apenas a
-- assertiva). Por essa razão, ficam de fora deste lote os itens 1, 2, 7, 8,
-- 10, 11 e 12 — todos dependem de trechos do texto-base (referências como
-- "segundo o autor", "infere-se do texto", "última ocorrência no parágrafo",
-- "os últimos parágrafos evidenciam") que não estão disponíveis na base.
-- Ficam CONTINUAM em content_status='under_review' para revisão humana com
-- acesso ao PDF completo da prova.
-- Entram: 3, 4, 5, 9, 13 — cada um traz o trecho completo necessário para
-- análise gramatical isolada.
--
-- LEI 12.846/2013 (14-15): texto vigente conferido nesta sessão diretamente
-- em planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12846.htm (29/09/2026).
-- Confirmado: (a) art. 1º e art. 2º estabelecem responsabilização OBJETIVA
-- (independe de dolo ou culpa) — nenhuma alteração posterior atingiu esses
-- artigos; (b) art. 8º, caput, atribui a instauração e o julgamento do PAR à
-- autoridade máxima de cada órgão/entidade, e o §2º dá à CGU competência
-- CONCORRENTE (não exclusiva) para instaurar ou avocar processos no âmbito
-- do Poder Executivo federal — também sem alteração superveniente. Os dois
-- itens são cobertos.
--
-- ÉTICA, MORAL E SINDICÂNCIA (16-19): itens 16 e 17 tratam de conceitos
-- gerais de ética/moral (autonomia do sujeito, natureza dos valores éticos)
-- sem vínculo a dispositivo legal específico — conteúdo doutrinário estável,
-- sem necessidade de conferência em fonte oficial. Itens 18 e 19 tratam de
-- sindicância disciplinar; texto vigente da Lei nº 8.112/1990 conferido
-- nesta sessão em planalto.gov.br/ccivil_03/leis/l8112cons.htm (29/09/2026):
-- confirmados os arts. 143 (apuração mediante sindicância ou PAD, assegurada
-- ampla defesa ao acusado), 145 (a sindicância só pode resultar em
-- arquivamento, aplicação de advertência/suspensão até 30 dias, ou
-- instauração de processo disciplinar) e 146 (destituição de cargo em
-- comissão exige obrigatoriamente processo disciplinar, não sindicância) —
-- nenhum desses dispositivos consta como revogado no texto vigente. Os
-- quatro itens (16-19) são cobertos.
--
-- Nenhum item deste lote sobrepõe os itens 20-30 já cobertos pelo lote 1.
-- Apenas review_note e content_status são alterados — official_answer não é
-- tocado.

-- 3: "que se criem" — o "se" está proclítico por atração da conjunção
-- subordinativa "que"; deslocá-lo para depois do verbo ("criem-se") violaria
-- a regra de proclisis obrigatória após palavra atrativa, tornando a frase
-- incorreta.
update public.official_exam_questions set review_note=$q$Errado. No trecho "que se criem ocasiões favoráveis", o "se" está antes do verbo (próclise) porque existe uma palavra atrativa logo antes dele: a conjunção subordinativa "que". Em português, sempre que há uma palavra atrativa desse tipo (conjunções subordinativas, pronomes relativos, advérbios seguidos de pausa, entre outras) antes do verbo, a próclise é obrigatória — não é permitido usar a ênclise (o pronome depois do verbo) nesses casos. Por isso, deslocar o "se" para depois do verbo ("criem-se") não manteria a correção gramatical: pelo contrário, tornaria a frase incorreta, já que a atração da conjunção "que" exige que o pronome fique antes do verbo.
Exemplo: dizemos "que se vejam" (próclise correta, por causa do "que"), e não "que vejam-se" — é a mesma lógica aqui: com "que" antes, o pronome tem que vir antes do verbo.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=3 and content_status='under_review';

-- 4: expressões explicativas/retificativas como "isto é" exigem vírgulas
-- obrigatórias, não facultativas.
update public.official_exam_questions set review_note=$q$Errado. Expressões explicativas ou retificativas — como "isto é", "ou seja", "a saber", "por exemplo" — funcionam como um adendo que esclarece ou reformula o que foi dito antes, e por isso são sempre isoladas por vírgulas (ou por vírgula e ponto final, travessões, parênteses etc.). O uso dessas vírgulas não é uma escolha estilística facultativa: é uma exigência da pontuação padrão sempre que esse tipo de expressão aparece no meio da frase. No trecho analisado, "isto é" cumpre exatamente esse papel explicativo, então as vírgulas que o isolam são obrigatórias, e não facultativas como afirma o item.
Exemplo: em "Ele chegou tarde, isto é, depois das dez horas", tirar as vírgulas ("Ele chegou tarde isto é depois das dez horas") deixaria a frase visivelmente errada — as vírgulas ali não são um enfeite opcional, são parte da pontuação correta.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=4 and content_status='under_review';

-- 5: "Respeitosamente" é o fecho para autoridades de hierarquia superior,
-- incluindo o presidente da República — não há exceção que o exclua.
update public.official_exam_questions set review_note=$q$Errado. Segundo o Manual de Redação da Presidência da República (MRPR), o fecho "Respeitosamente," é usado justamente nas comunicações dirigidas a autoridades de hierarquia superior à do remetente — e isso inclui o presidente da República, que está no topo dessa hierarquia, e não é uma exceção a essa regra. O item erra ao afirmar que existiria uma exceção para o presidente: na prática, é exatamente para autoridades no nível dele (ou superiores na cadeia de tratamento) que esse fecho é empregado.
Exemplo: um ofício de um servidor para o diretor do seu órgão (hierarquia superior) fecha com "Respeitosamente,"; se esse mesmo tipo de comunicação fosse endereçado ao presidente da República, autoridade máxima do Poder Executivo, o fecho continuaria sendo "Respeitosamente,", e não algo diferente.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=5 and content_status='under_review';

-- 9: "de milhares de prisioneiras" -> "dos milhares de prisioneiras";
-- contração "de"+"os"="dos", referindo-se de volta a "sapatos" no plural.
update public.official_exam_questions set review_note=$q$Certo. No trecho "a sujeira dos sapatos de milhares de prisioneiras", a primeira ocorrência de "de" (em "de milhares") pode ser substituída pela contração "dos" (de + os), formando "a sujeira dos sapatos dos milhares de prisioneiras". A troca é gramaticalmente correta: "dos" nada mais é do que a preposição "de" fundida com o artigo definido "os", e o sentido da frase — os sapatos pertencentes a um grande número de prisioneiras — permanece o mesmo, apenas com "milhares" passando a vir precedido de artigo definido.
Exemplo: é como a diferença entre "casa de pessoas" e "casa das pessoas" (de + as = das) — a contração troca o artigo indefinido implícito por um definido, sem quebrar a gramática da frase.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=9 and content_status='under_review';

-- 13: "lúgubre" e "fúnebre" são sinônimos (sombrio, associado à morte/luto).
update public.official_exam_questions set review_note=$q$Certo. "Lúgubre" e "fúnebre" são sinônimos: ambos qualificam algo sombrio, triste, associado a morte, luto ou desolação. Substituir uma palavra pela outra no trecho não muda o sentido original do texto, apenas troca uma palavra por outra de significado equivalente.
Exemplo: dizer que um ambiente é "lúgubre" ou "fúnebre" transmite a mesma ideia — um lugar escuro, silencioso e que causa uma sensação de tristeza ou mau presságio, como um cemitério à noite.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=13 and content_status='under_review';

-- 14: Lei 12.846/2013, art. 1º e art. 2º — responsabilização OBJETIVA,
-- independente de dolo ou culpa. Conferido vigente em planalto.gov.br
-- (29/09/2026), sem alteração posterior a esses artigos.
update public.official_exam_questions set review_note=$q$Errado. A Lei nº 12.846/2013 (Lei Anticorrupção) adota, no seu art. 1º, a responsabilização OBJETIVA — administrativa e civil — das pessoas jurídicas pela prática de atos contra a administração pública, e o art. 2º reforça isso ao dizer que as pessoas jurídicas "serão responsabilizadas objetivamente" pelos atos lesivos previstos na lei. Isso significa que não é preciso provar dolo (intenção) nem culpa da empresa: basta comprovar que o ato lesivo ocorreu em seu interesse ou benefício. O item erra ao condicionar a responsabilização à prática de "ato doloso" — essa exigência simplesmente não existe na lei.
Exemplo: é parecido com a responsabilidade objetiva no trânsito por acidente causado por defeito do veículo: não interessa se o dono "quis" causar o acidente, só interessa que o fato ocorreu e causou dano — aqui, para a empresa, basta o ato lesivo ter ocorrido em seu proveito, sem precisar provar intenção.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=14 and content_status='under_review';

-- 15: Lei 12.846/2013, art. 8º, caput e §2º — competência da autoridade
-- máxima de cada órgão/entidade; CGU tem competência CONCORRENTE, não
-- exclusiva. Conferido vigente em planalto.gov.br (29/09/2026).
update public.official_exam_questions set review_note=$q$Errado. Pelo art. 8º da Lei nº 12.846/2013, a instauração e o julgamento do processo administrativo de responsabilização cabem, em regra, à autoridade máxima de cada órgão ou entidade dos Poderes Executivo, Legislativo e Judiciário — não é uma exclusividade da Controladoria-Geral da União (CGU). O § 2º do mesmo artigo dá à CGU competência CONCORRENTE, no âmbito do Poder Executivo federal, para instaurar processos administrativos de responsabilização ou para avocar processos já instaurados por outros órgãos, quando quiser examinar sua regularidade ou corrigir seu andamento. Competência concorrente é bem diferente de competência exclusiva: significa que a CGU pode atuar ao lado das demais autoridades, não que só ela pode agir.
Exemplo: é como um órgão de auditoria central que pode tanto abrir seus próprios casos quanto "puxar" para si um caso que já está sendo apurado por outro setor — mas isso não impede que o setor original também tenha, originalmente, essa competência.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=15 and content_status='under_review';

-- 16: responsabilidade moral pressupõe autonomia/livre-arbítrio do sujeito
-- — conceito doutrinário geral de ética, sem vínculo a dispositivo legal.
update public.official_exam_questions set review_note=$q$Certo. A responsabilidade moral por uma conduta só existe quando o sujeito age de forma livre e consciente — ou seja, quando tem autonomia para escolher entre agir de um jeito ou de outro. Se a pessoa não tinha liberdade de escolha (por exemplo, foi coagida ou não tinha capacidade de discernimento sobre o ato), não há como atribuir a ela responsabilidade moral plena por aquela conduta. Por isso, autonomia do sujeito é pressuposto da responsabilidade moral.
Exemplo: não se considera moralmente responsável alguém que empurra outra pessoa porque foi empurrado antes por um terceiro — faltou autonomia (livre escolha) para aquele gesto; já quem decide, por vontade própria, ajudar ou prejudicar alguém, exerce sua autonomia e por isso pode ser moralmente responsabilizado pela escolha.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=16 and content_status='under_review';

-- 17: valores éticos não são meramente volitivos/individuais — são
-- compartilhados/objetivados por um grupo social, conceito doutrinário
-- geral, sem vínculo a dispositivo legal.
update public.official_exam_questions set review_note=$q$Errado. Valores éticos não são simplesmente "escolhidos" de forma livre e isolada por cada indivíduo, como se fossem uma preferência pessoal qualquer (isso seria mais próximo de um gosto subjetivo do que de ética). Eles são, em boa medida, compartilhados e construídos socialmente: fazem parte de um conjunto de referências que um grupo ou sociedade reconhece como importantes para orientar a conduta de todos, e por isso têm um caráter mais objetivo e coletivo do que puramente volitivo e individual.
Exemplo: honestidade e respeito ao próximo não são valores que cada pessoa "inventa" sozinha do zero — são padrões reconhecidos e cobrados por toda uma comunidade, e é justamente esse caráter compartilhado que dá força a esses valores como referência ética.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=17 and content_status='under_review';

-- 18: sindicância investigatória (mero apuratório de fatos, sem direcionar
-- desde logo a aplicação de penalidade) prescinde de contraditório/ampla
-- defesa prévios — distinção doutrinária/jurisprudencial apoiada no art. 143
-- da Lei 8.112/1990 (apuração mediante sindicância ou PAD, com ampla defesa
-- assegurada "ao acusado", isto é, quando já há alguém sendo apurado com
-- possibilidade de penalidade). Conferido vigente em planalto.gov.br
-- (29/09/2026).
update public.official_exam_questions set review_note=$q$Certo. A doutrina e a jurisprudência distinguem dois tipos de sindicância: a sindicância investigativa (ou de mero expediente), que serve só para apurar fatos e reunir elementos, sem apontar desde logo um responsável a ser punido, e a sindicância que já mira a aplicação de penalidade. Na primeira, por não haver ainda uma acusação formal contra alguém específico, não se exige contraditório e ampla defesa — essas garantias só se tornam obrigatórias quando a apuração passa a ter caráter punitivo/acusatório, com alguém na posição de acusado (é o que a Lei nº 8.112/1990, no art. 143, chama de "ampla defesa" assegurada "ao acusado", pressupondo que exista uma acusação formada). Por isso, uma sindicância puramente investigatória, sem esse direcionamento, pode dispensar contraditório e ampla defesa nessa fase inicial.
Exemplo: é como uma checagem preliminar de fatos antes de abrir um processo — enquanto ninguém está formalmente "no banco dos réus", não faz sentido exigir defesa prévia; a defesa entra em cena quando a apuração vira, de fato, uma acusação contra alguém.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=18 and content_status='under_review';

-- 19: destituição de cargo em comissão exige processo disciplinar (art. 146
-- da Lei 8.112/1990); a sindicância só pode resultar em arquivamento,
-- advertência ou suspensão de até 30 dias (art. 145) — nunca destituição.
-- Conferido vigente em planalto.gov.br (29/09/2026).
update public.official_exam_questions set review_note=$q$Errado. Pela Lei nº 8.112/1990, a sindicância tem alcance limitado: o art. 145 diz que dela só pode resultar arquivamento do processo, aplicação de penalidade de advertência ou suspensão de até 30 dias, ou a instauração de processo disciplinar. Já o art. 146 é expresso ao dizer que, sempre que o ilícito puder levar a suspensão por mais de 30 dias, demissão, cassação de aposentadoria/disponibilidade ou destituição de cargo em comissão, é obrigatória a instauração de processo disciplinar — não basta a sindicância. Ou seja, a destituição de cargo em comissão nunca pode ser aplicada apenas com base em sindicância (seja ela chamada de "acusatória" ou não): a lei exige processo disciplinar completo para essa penalidade mais grave.
Exemplo: é como a diferença entre uma advertência verbal rápida e um processo formal com direito à defesa completa — para penalidades leves (como suspensão curta), o procedimento simplificado da sindicância basta; para penalidades graves, como perder um cargo de confiança, a lei exige o rito mais completo do processo disciplinar.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=19 and content_status='under_review';
