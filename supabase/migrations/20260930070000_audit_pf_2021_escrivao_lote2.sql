-- Auditoria PF 2021 Escrivão de Polícia Federal — lote 2 (3 itens
-- autossuficientes de Direito Penal e Processual Penal). Itens 34-36
-- (Legislação Penal Especial) dependem de cenários hipotéticos ("nessa
-- situação") não capturados. Itens 37-55 (Estatística/Probabilidade e
-- Raciocínio Lógico-Matemático) têm símbolos matemáticos/gregos corrompidos
-- na extração do PDF (caracteres ilegíveis no lugar de X, μ, etc.) e
-- dependem de dados numéricos de um enunciado-base não capturado —
-- integralmente não auditáveis nesse estado, não resolvidos por adivinhação.

update public.official_exam_questions
set review_note=$q$Errado. Na cadeia de custódia (CPP, arts. 158-A a 158-F, incluídos pelo "Pacote Anticrime"), ACONDICIONAMENTO (ou embalagem) e ARMAZENAMENTO são etapas distintas: o acondicionamento é o procedimento de embalar, de forma individualizada, cada vestígio coletado, de acordo com suas características físicas, químicas e biológicas; já o armazenamento é a etapa seguinte, de manutenção do vestígio já embalado em condições adequadas (local seguro, temperatura etc.) até sua destinação final. O item descreve corretamente o conceito de "acondicionamento", mas o atribui erradamente ao termo "armazenamento".
Fonte oficial: art. 158-A, CPP (planalto.gov.br); Manual de Cadeia de Custódia (etapas 2.5 Acondicionamento e 2.9 Armazenamento).
Exemplo: embalar cada vestígio separadamente na cena do crime é "acondicionamento"; guardar esses vestígios já embalados num depósito seguro da perícia é "armazenamento" — são dois passos diferentes da cadeia de custódia.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 158-A, CPP","url":"https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm"}]'::jsonb
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=31;

update public.official_exam_questions
set review_note=$q$Correto. O STF e o STJ (Terceira Seção, em julgamento uniformizador) entendem que o descaminho (CP, art. 334) é crime FORMAL: sua consumação ocorre com a própria entrada ilegal da mercadoria no território nacional, independentemente da apuração administrativa do valor exato do imposto devido ou do esgotamento da via administrativa-fiscal — diferentemente dos crimes tributários materiais da Lei nº 8.137/1990, que dependem do lançamento definitivo (Súmula Vinculante 24).
Fonte oficial: jurisprudência consolidada do STF/STJ sobre a natureza formal do crime de descaminho.
Exemplo: não é preciso esperar a Receita Federal terminar todo o processo administrativo de cálculo do imposto sonegado para já poder processar criminalmente alguém por descaminho — o crime já está consumado desde a entrada irregular da mercadoria.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"jurisprudência STF/STJ sobre descaminho como crime formal (art. 334 CP)"}]'::jsonb
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=32;

update public.official_exam_questions
set review_note=$q$Correto. Flagrante preparado é exatamente a situação em que a autoridade (ou terceiro a seu mando) provoca, induz ou instiga o agente a cometer o crime, criando previamente todas as condições para que ele seja surpreendido em flagrante — essa indução descaracteriza a espontaneidade da conduta criminosa e, pela Súmula 145 do STF, torna o crime impossível (quando o aparato de vigilância estatal torna impossível a consumação).
Fonte oficial: Súmula 145, STF.
Exemplo: um policial disfarçado oferece dinheiro insistentemente para alguém vender drogas, e só então prende essa pessoa — como foi o próprio policial quem induziu o crime a acontecer, isso é flagrante preparado, e não um flagrante "de verdade".$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"Súmula 145, STF"}]'::jsonb
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=33;
