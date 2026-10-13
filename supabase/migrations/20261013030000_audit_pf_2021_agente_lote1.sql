-- Auditoria PF 2021 Agente de Polícia Federal — lote 1 (9 itens
-- autossuficientes de Redação Oficial e Direito Constitucional/Penal e
-- Processual Penal). Conteúdo idêntico ao já verificado nos lotes de
-- Escrivão/Delegado/Papiloscopista PF 2021 (mesmo concurso, mesma banca).
--
-- Itens 1-18 (Língua Portuguesa) dependem de um texto de apoio não
-- capturado de forma limpa na importação (a extração mistura instruções da
-- capa do caderno com os itens reais). Itens 25-27 (Direito Administrativo)
-- e 34-36 (Direito Penal e Processual Penal / Legislação Especial)
-- dependem de cenários hipotéticos não capturados. Item 28 já está
-- anulado no gabarito oficial.

update public.official_exam_questions
set review_note=$q$Correto. O Manual de Redação da Presidência da República (MRPR) orienta que e-mails que tenham caráter de comunicação oficial sigam os mesmos padrões de formalidade, impessoalidade e clareza exigidos dos demais documentos oficiais — a praticidade do meio eletrônico não dispensa a linguagem adequada ao padrão oficial.
Fonte oficial: Manual de Redação da Presidência da República (3ª ed.), capítulo sobre comunicações oficiais eletrônicas.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=19;

update public.official_exam_questions
set review_note=$q$Correto. A exposição de motivos é o expediente dirigido pelos ministros de Estado ao Presidente da República para informá-lo de determinado assunto, propor alguma medida ou submeter a sua consideração projeto de ato normativo; em certas situações, cópia do documento pode ser encaminhada a outros Poderes.
Fonte oficial: Manual de Redação da Presidência da República (3ª ed.), seção sobre exposição de motivos.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=20;

update public.official_exam_questions
set review_note=$q$Errado. Segundo a tabela de pronomes de tratamento do Manual de Redação da Presidência da República, o ENDEREÇAMENTO das comunicações dirigidas a autoridades tratadas por "Vossa Excelência" usa a forma "A Sua Excelência o Senhor" (ou "a Senhora") — e não "A Vossa Excelência". O pronome "Vossa Excelência" é reservado ao vocativo e ao corpo do texto; no envelope/endereçamento, fala-se SOBRE a autoridade, na terceira pessoa.
Fonte oficial: Manual de Redação da Presidência da República (3ª ed.), item 4.1.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=21;

update public.official_exam_questions
set review_note=$q$Errado. O Manual de Redação da Presidência da República orienta que, em documentos oficiais, as datas sejam grafadas por extenso (dia, mês por extenso e ano) — por exemplo, "Brasília, 2 de abril de 2021" — e não no formato numérico abreviado "02/04/2021".
Fonte oficial: Manual de Redação da Presidência da República (3ª ed.); Manual de Revisão da FUNAG.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=22;

update public.official_exam_questions
set review_note=$q$Correto. O Manual de Redação da Presidência da República aboliu o uso dos vocativos "Digníssimo" (DD) e "Ilustríssimo" (Ilmo.) para autoridades, por entender que a dignidade e a ilustríssima condição já são pressupostas pelo exercício do próprio cargo público.
Fonte oficial: Manual de Redação da Presidência da República (3ª ed.), seção de pronomes de tratamento.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=23;

update public.official_exam_questions
set review_note=$q$Errado. No padrão ofício, o cabeçalho (timbre/identificação do órgão) deve constar apenas na PRIMEIRA página do documento, não centralizado "em todas as páginas" como afirma o item — as páginas seguintes dispensam a repetição do cabeçalho completo.
Fonte oficial: Manual de Redação da Presidência da República (3ª ed.), seção sobre o padrão ofício.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=24;

update public.official_exam_questions
set review_note=$q$Correto. O tráfico ilícito de entorpecentes e drogas afins é expressamente classificado pela Constituição Federal como crime inafiançável (e também insuscetível de graça ou anistia).
Fonte oficial: art. 5º, XLIII, CF/1988 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 5º, XLIII, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=29;

update public.official_exam_questions
set review_note=$q$Errado. O art. 5º, LI, da Constituição Federal permite a extradição do brasileiro naturalizado em duas hipóteses: crime comum praticado ANTES da naturalização, ou comprovado envolvimento em tráfico ilícito de entorpecentes e drogas afins — nesta segunda hipótese, a Constituição não exige que o envolvimento seja anterior à naturalização. O item afirma o contrário.
Fonte oficial: art. 5º, LI, CF/1988 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 5º, LI, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=30;

update public.official_exam_questions
set review_note=$q$Errado. Na cadeia de custódia (CPP, arts. 158-A a 158-F, incluídos pelo "Pacote Anticrime"), ACONDICIONAMENTO e ARMAZENAMENTO são etapas distintas: o acondicionamento é o procedimento de embalar, de forma individualizada, cada vestígio coletado; o armazenamento é a etapa seguinte, de manutenção do vestígio já embalado em condições adequadas até sua destinação final. O item descreve "acondicionamento" mas o atribui erradamente a "armazenamento".
Fonte oficial: art. 158-A, CPP (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 158-A, CPP","url":"https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm"}]'::jsonb
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=31;

update public.official_exam_questions
set review_note=$q$Correto. O STF e o STJ entendem que o descaminho (CP, art. 334) é crime FORMAL: sua consumação ocorre com a própria entrada ilegal da mercadoria no território nacional, independentemente do esgotamento da via administrativa-fiscal.
Fonte oficial: jurisprudência consolidada do STF/STJ sobre a natureza formal do crime de descaminho.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"jurisprudência STF/STJ sobre descaminho como crime formal (art. 334 CP)"}]'::jsonb
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=32;

update public.official_exam_questions
set review_note=$q$Correto. Flagrante preparado é a situação em que a autoridade (ou terceiro a seu mando) provoca, induz ou instiga o agente a cometer o crime, criando previamente as condições para que ele seja surpreendido em flagrante — pela Súmula 145 do STF, essa indução torna o crime impossível.
Fonte oficial: Súmula 145, STF.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"Súmula 145, STF"}]'::jsonb
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=33;
