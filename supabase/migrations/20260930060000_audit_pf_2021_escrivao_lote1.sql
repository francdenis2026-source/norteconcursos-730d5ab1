-- Auditoria PF 2021 Escrivão de Polícia Federal — lote 1 (8 itens
-- autossuficientes de Redação Oficial e Direito Constitucional). Itens 1-18
-- (Língua Portuguesa) são questões de interpretação de texto ligadas a uma
-- passagem literária/jornalística específica não capturada na importação
-- verbatim — não auditáveis sem o texto-base. Itens 25-27 (Direito
-- Administrativo) dependem de um caso hipotético ("o servidor", "o
-- processo aberto contra o servidor") também não capturado. Item 28 já
-- está anulado no gabarito oficial.

update public.official_exam_questions
set review_note=$q$Correto. O Manual de Redação da Presidência da República (MRPR) orienta que e-mails que tenham caráter de comunicação oficial sigam os mesmos padrões de formalidade, impessoalidade e clareza exigidos dos demais documentos oficiais — a praticidade do meio eletrônico não dispensa a linguagem adequada ao padrão oficial.
Fonte oficial: Manual de Redação da Presidência da República (3ª ed.), capítulo sobre comunicações oficiais eletrônicas.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=19;

update public.official_exam_questions
set review_note=$q$Correto. A exposição de motivos é o expediente dirigido pelos ministros de Estado ao Presidente da República para informá-lo de determinado assunto, propor alguma medida ou submeter a sua consideração projeto de ato normativo; em certas situações (por exemplo, quando acompanha mensagem ao Congresso Nacional ou projeto de lei), cópia do documento pode ser encaminhada a outros Poderes.
Fonte oficial: Manual de Redação da Presidência da República (3ª ed.), seção sobre exposição de motivos.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=20;

update public.official_exam_questions
set review_note=$q$Errado. Segundo a tabela de pronomes de tratamento do Manual de Redação da Presidência da República, o ENDEREÇAMENTO das comunicações dirigidas a autoridades tratadas por "Vossa Excelência" usa a forma "A Sua Excelência o Senhor" (ou "a Senhora") — e não "A Vossa Excelência". O pronome "Vossa Excelência" é reservado ao vocativo e ao corpo do texto (quando se fala diretamente COM a autoridade); no envelope/endereçamento, fala-se SOBRE ela, na terceira pessoa ("Sua Excelência").
Fonte oficial: Manual de Redação da Presidência da República (3ª ed.), item 4.1 (tabela de pronomes de tratamento).
Exemplo: é a diferença entre dizer "Vossa Excelência decidiu..." (falando diretamente com a pessoa) e escrever no envelope "A Sua Excelência o Senhor Fulano" (falando sobre ela, endereçando a carta) — no endereçamento usa-se sempre a forma de terceira pessoa.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=21;

update public.official_exam_questions
set review_note=$q$Errado. O Manual de Redação da Presidência da República orienta que, em documentos oficiais, as datas sejam grafadas por extenso (dia, mês por extenso e ano) — por exemplo, "Brasília, 2 de abril de 2021" — e não no formato numérico abreviado "02/04/2021".
Fonte oficial: Manual de Redação da Presidência da República (3ª ed.); Manual de Revisão da FUNAG (convenção de datas em textos oficiais).
Exemplo: um ofício oficial escreve "15 de março de 2024" por extenso, do mesmo jeito que se escreve numa carta formal — não "15/03/2024", que é mais informal/numérico.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=22;

update public.official_exam_questions
set review_note=$q$Correto. O Manual de Redação da Presidência da República aboliu o uso dos vocativos "Digníssimo" (DD) e "Ilustríssimo" (Ilmo.) para autoridades, por entender que a dignidade e a ilustríssima condição já são pressupostas pelo exercício do próprio cargo público, sendo redundante reafirmá-las no tratamento formal.
Fonte oficial: Manual de Redação da Presidência da República (3ª ed.), seção de pronomes de tratamento.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=23;

update public.official_exam_questions
set review_note=$q$Errado. No padrão ofício, o cabeçalho (timbre/identificação do órgão) deve constar apenas na PRIMEIRA página do documento — as páginas seguintes dispensam a repetição do cabeçalho completo, levando apenas elementos de identificação e numeração.
Fonte oficial: Manual de Redação da Presidência da República (3ª ed.), seção sobre o padrão ofício.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=24;

update public.official_exam_questions
set review_note=$q$Correto. O tráfico ilícito de entorpecentes e drogas afins é expressamente classificado pela Constituição Federal como crime inafiançável (e também insuscetível de graça ou anistia).
Fonte oficial: art. 5º, XLIII, CF/1988 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 5º, XLIII, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=29;

update public.official_exam_questions
set review_note=$q$Errado. O art. 5º, LI, da Constituição Federal permite a extradição do brasileiro naturalizado em duas hipóteses: crime comum praticado ANTES da naturalização, ou comprovado envolvimento em tráfico ilícito de entorpecentes e drogas afins — nesta segunda hipótese, a Constituição não exige que o envolvimento seja anterior à naturalização, podendo ocorrer antes ou depois dela.
Fonte oficial: art. 5º, LI, CF/1988 (planalto.gov.br).
Exemplo: para crimes comuns "normais", só pode extraditar o naturalizado se o crime foi antes de ele se naturalizar; já para tráfico de drogas, essa restrição de tempo não existe — pode ser antes ou depois, que ainda cabe extradição.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 5º, LI, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=30;
