-- Auditoria PF 2021 Delegado de Polícia Federal — lote 2 (8 itens de
-- Legislação Penal Especial e Direito Penal, autossuficientes). Itens 36-46
-- (Direito Processual Civil / Direito Civil / Direito Internacional) ficaram
-- de fora deste lote: dependem de um texto-base/situação hipotética
-- (sociedade empresária "Geraldo", caso de extradição "Luigi") não capturado
-- na importação verbatim — mesmo critério de honestidade já usado para
-- PC-AC 2017/PP-Acre 2023. Nenhum desses itens tem subject nos valores
-- gated por official_exam_questions_active_legal_audit_check, então só
-- review_note é necessário.

update public.official_exam_questions
set review_note=$q$Correto. O STJ e o STF consideram atípica a importação de pequena quantidade de sementes de Cannabis sativa (maconha): a semente, por si só, não tem potencial para causar dependência (não é "droga" para fins da Lei 11.343/2006), e a conduta foi tratada pela jurisprudência como mero ato preparatório não puníve.
Fonte oficial: STJ, Terceira Seção, j. 14/10/2020 (notícia institucional stj.jus.br); STF, HC 144.161, rel. min. Gilmar Mendes.
Exemplo: trazer poucas sementes pelo correio para cultivo pessoal, sem qualquer indício de produção em escala, não é tratado pelos tribunais como o mesmo crime de tráfico — falta o "ato de executar" o tipo penal de droga propriamente dita.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=47;

update public.official_exam_questions
set review_note=$q$Errado. A teoria do domínio do fato (Welzel/Roxin) serve para identificar quem exerce o controle final sobre a execução do crime em casos de autoria mediata ou coautoria — ela não dispensa a descrição mínima da conduta de cada acusado. O STF, inclusive em críticas à sua aplicação isolada (ex.: julgamento da Ação Penal 470), reafirma que é indispensável individualizar a conduta imputada a cada réu, sob pena de responsabilidade penal objetiva, vedada no direito brasileiro.
Exemplo: não basta dizer "fulano era o chefe, então é automaticamente culpado" — é preciso apontar o que, concretamente, cada pessoa fez para contribuir com o crime.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=48;

update public.official_exam_questions
set review_note=$q$Errado. O STJ distingue posse (manter em casa/comércio) de porte (portar na rua) de arma de fogo: enquanto a posse de arma de uso permitido com registro vencido é mera irregularidade administrativa, o PORTE de arma de fogo — de uso permitido ou restrito — com registro de cautela vencido continua configurando o crime dos arts. 14 ou 16 da Lei nº 10.826/2003 (Estatuto do Desarmamento), por ser conduta de maior risco à segurança pública.
Fonte oficial: arts. 14 e 16, Lei nº 10.826/2003; jurisprudência do STJ (ex.: AREsp 885.281).
Exemplo: guardar em casa uma arma registrada, mas com o registro vencido, é só uma pendência administrativa — já andar na rua com essa mesma arma, mesmo registrada, mas com a autorização vencida, continua sendo crime.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=49;

update public.official_exam_questions
set review_note=$q$Correto. O crime do art. 48 da Lei nº 9.605/1998 (impedir ou dificultar a regeneração natural de florestas e demais formas de vegetação) é classificado pela doutrina e jurisprudência como delito de natureza permanente: a consumação se protrai no tempo enquanto persistir o impedimento à regeneração.
Fonte oficial: art. 48, Lei nº 9.605/1998 (planalto.gov.br).
Exemplo: enquanto a área continuar sendo mantida artificialmente sem vegetação (por exemplo, com uso constante de herbicida ou pastagem), o crime continua "acontecendo", dia após dia — por isso é permanente, não instantâneo.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=50;

update public.official_exam_questions
set review_note=$q$Correto. O art. 18 da Lei nº 13.869/2019 (Lei de Abuso de Autoridade) tipifica expressamente a conduta de "atribuir à vítima a prática de infração penal, sem justa causa", e a lei equipara a essa conduta a antecipação de culpa por qualquer meio de comunicação, inclusive rede social, antes de concluídas as apurações e formalizada a acusação.
Fonte oficial: art. 18, Lei nº 13.869/2019 (planalto.gov.br).
Exemplo: um delegado que posta nas redes sociais "o suspeito é o culpado" antes mesmo de terminar a investigação está cometendo abuso de autoridade — a lei quer que a atribuição de culpa só venha depois do processo (ou, na fase de inquérito, de forma tecnicamente adequada), não por antecipação midiática.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=51;

update public.official_exam_questions
set review_note=$q$Errado. A falsidade ideológica (art. 299 do Código Penal) é crime formal e, em regra, instantâneo de efeitos permanentes: a consumação ocorre no momento em que o documento falso é criado/inserido, e o prazo prescricional começa a correr dali — ele não se reinicia a cada vez que o documento continua produzindo efeitos (diferente dos crimes permanentes, em que a execução se prolonga no tempo).
Exemplo: assinar um documento com informação falsa consuma o crime naquele momento; o fato de esse documento continuar "valendo" depois não reabre o prazo de prescrição a cada novo uso.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=52;

update public.official_exam_questions
set review_note=$q$Correto. Segundo jurisprudência consolidada do STF e do STJ, a configuração do crime de redução a condição análoga à de escravo (art. 149 do Código Penal) não exige restrição à liberdade de locomoção da vítima: basta a submissão a trabalho forçado, jornada exaustiva ou condições degradantes de trabalho, que por si só já violam a dignidade da pessoa humana.
Fonte oficial: art. 149, Código Penal; STJ, notícia institucional de 01/10/2025 sobre jurisprudência consolidada; STF, Inq 3.412 e precedentes de repercussão geral.
Exemplo: um trabalhador pode estar "livre" para ir embora fisicamente, mas se é submetido a jornada exaustiva e condições degradantes, o crime já está configurado — não é preciso que ele esteja fisicamente trancado ou impedido de sair.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=54;

update public.official_exam_questions
set review_note=$q$Correto. A Súmula 567 do STJ estabelece que "o sistema de vigilância realizado por monitoramento eletrônico ou por existência de segurança no interior de estabelecimento comercial, por si só, não torna impossível a configuração do crime de furto". A presença de câmeras ou seguranças reduz o risco de sucesso do furto, mas não o torna absolutamente ineficaz (requisito do crime impossível, art. 17 do CP).
Fonte oficial: Súmula 567, STJ.
Exemplo: ter câmeras de segurança numa loja não impede, por si só, que um furto seja considerado "furto consumado" se o agente conseguir, ainda que momentaneamente, retirar a coisa da esfera de vigilância da vítima.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=55;
