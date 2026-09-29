-- Explicações do dia a dia: Língua Portuguesa, lote 6 — PF 2021 (Agente),
-- resto do Texto 2A1-II (Zygmunt Bauman, itens 12-20; itens 19-20 já são
-- do bloco de Redação Oficial/Manual de Redação da Presidência, mas
-- seguem classificados como "Língua Portuguesa" no banco).
--
-- Gabarito reconferido em 29/09/2026: análise gramatical própria cruzada
-- com o gabarito extraoficial de fontes públicas. Todos os 8 itens deste
-- lote conferem com o official_answer já gravado no banco.
--
-- ATENÇÃO — item 15 (mesmo texto, "seria mantida a correção gramatical
-- caso 'esperam' fosse substituído por 'espera'") ficou de fora
-- deliberadamente: o gabarito preliminar da CEBRASPE foi Certo (valor
-- hoje gravado no banco), mas há registro de recurso de vários
-- professores pedindo a mudança para Errado (o "espera" no singular não
-- faria sentido, já que quem aguarda a sentença são as "pessoas", não o
-- "número"). Não encontrei confirmação do resultado definitivo desse
-- recurso nas fontes públicas consultadas — fica pendente de conferência
-- contra o gabarito DEFINITIVO oficial da CEBRASPE antes de escrever a
-- explicação, em vez de arriscar publicar um gabarito que pode ter sido
-- revertido.

-- 12: os grupos "a disciplinar" (encarcerados) não são de autoridade/prestígio — são o oposto do que o item afirma.
update public.official_exam_questions set review_note=$q$Errado. O texto fala do crescimento do encarceramento e da "necessidade de disciplinar importantes grupos e segmentos populacionais" — no contexto de prisão e controle penal, esses grupos são justamente os que estão em conflito com a lei, não pessoas "com autoridade e que gozam de prestígio na sociedade". O item inverte o sentido do texto.
Exemplo: um texto que fala em "necessidade de fiscalizar grupos de risco" não está se referindo a autoridades — é o oposto: fiscalizar geralmente mira quem tem menos poder, não quem tem mais.$q$
where exam_year=2021 and item_number=12 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 13: o sujeito real de "crescem" é só "os gastos orçamentários" — "efetivos policiais" e "serviços penitenciários" são exemplos introduzidos por "principalmente", não outros núcleos do sujeito.
update public.official_exam_questions set review_note=$q$Errado. Em "Os gastos orçamentários do Estado com as forças da lei e da ordem, principalmente os efetivos policiais e os serviços penitenciários, crescem em todo o planeta", o sujeito de "crescem" é só "Os gastos orçamentários do Estado" (que já é plural sozinho). "Os efetivos policiais e os serviços penitenciários" não são outros núcleos do sujeito — é um trecho intercalado, introduzido por "principalmente", que só dá exemplo de onde esses gastos são investidos.
Exemplo: em "As despesas da empresa, principalmente com energia e aluguel, aumentaram", o sujeito de "aumentaram" é só "As despesas" — "energia e aluguel" são só exemplos do tipo de despesa, não sujeitos extras.$q$
where exam_year=2021 and item_number=13 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 14: o travessão dá destaque ao trecho final, mas sua retirada não quebra a gramática (poderia ser vírgula ou nada).
update public.official_exam_questions set review_note=$q$Correto. O travessão antes de "e assinala, além disso, que muitos governos alimentam a pressuposição..." serve para destacar essa informação extra dentro do período — mas ele tem função parecida com a de uma vírgula aqui: pode ser retirado (ou trocado por vírgula) sem que a frase perca a correção gramatical, só perdendo aquele destaque visual.
Exemplo: "Ele fez tudo certo — e ainda ajudou os colegas" continua gramaticalmente correto sem o travessão: "Ele fez tudo certo, e ainda ajudou os colegas" — só muda o efeito de ênfase, não a correção.$q$
where exam_year=2021 and item_number=14 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 16: as duas informações citadas do texto (crescimento rápido do encarceramento; crescimento como fenômeno universal nos países desenvolvidos) se confirmam mutuamente — não há contradição.
update public.official_exam_questions set review_note=$q$Correto. As duas informações citadas do texto se completam: "cresce rapidamente... o número de pessoas na prisão" (início do texto) e "o rápido crescimento parece ser um fenômeno universal... na ponta mais desenvolvida do mundo" (final) contam a mesma história sob ângulos diferentes — não há contradição entre elas, uma reforça a outra.
Exemplo: dizer "as vendas cresceram em quase todo o país" e, mais adiante, "esse crescimento nas vendas é generalizado nas grandes cidades" são duas frases que se confirmam, não se contradizem — é esse tipo de coerência que o item descreve.$q$
where exam_year=2021 and item_number=16 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 17: "idiossincrasias" (particularidades/diferenças) tem sentido oposto a "compatibilidades" (semelhanças) — a troca muda o sentido do texto.
update public.official_exam_questions set review_note=$q$Errado. "Idiossincrasias" significa particularidades, características próprias que diferenciam cada país (tradições culturais e históricas diferentes). "Compatibilidades" tem o sentido quase oposto — sugere semelhança, coisas que combinam entre si. Trocar uma pela outra muda o sentido da frase, então a substituição não é livre de prejuízo.
Exemplo: dizer que cada família tem suas "particularidades" (idiossincrasias) é diferente de dizer que as famílias têm "compatibilidades" entre si — uma fala de diferenças, a outra de semelhanças.$q$
where exam_year=2021 and item_number=17 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 18: "intensamente" é advérbio (adjunto adverbial, modifica o verbo "ampliando"); "ampliada" é particípio/adjetivo (modifica o substantivo "significação") — funções sintáticas diferentes.
update public.official_exam_questions set review_note=$q$Errado. "Intensamente" é um advérbio que modifica o verbo "ampliando" (funciona como adjunto adverbial — diz COMO a rede está se ampliando). Já "ampliada" é um particípio usado como adjetivo, modificando o substantivo "significação" (funciona como adjunto adnominal — diz COMO É a significação). São classes gramaticais e funções sintáticas diferentes, mesmo as duas palavras vindo da mesma raiz "ampliar".
Exemplo: em "ele correu rapidamente" (advérbio, modifica o verbo) e "uma corrida ampliada" (adjetivo, modifica o substantivo), as duas palavras têm papéis diferentes na frase, mesmo parecidas.$q$
where exam_year=2021 and item_number=18 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 19: e-mail que funciona como documento oficial deve seguir os mesmos padrões de redação oficial dos demais documentos, incluindo linguagem adequada — conforme o Manual de Redação da Presidência da República.
update public.official_exam_questions set review_note=$q$Correto. O Manual de Redação da Presidência da República trata o e-mail como um meio válido de comunicação oficial quando usado nesse papel — e, sendo oficial, ele precisa seguir os mesmos parâmetros dos demais documentos oficiais: clareza, formalidade, impessoalidade e linguagem adequada. O meio (e-mail) muda, mas o padrão de redação exigido continua o mesmo.
Exemplo: um e-mail que substitui um ofício formal entre órgãos públicos não pode ter linguagem de conversa informal — precisa manter a mesma formalidade que teria em papel timbrado.$q$
where exam_year=2021 and item_number=19 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 20: exposição de motivos é comunicação de ministro pra o Presidente da República, podendo ter cópia encaminhada ao Congresso ou ao Judiciário em certos casos — definição correta pelo Manual de Redação.
update public.official_exam_questions set review_note=$q$Correto. A exposição de motivos é exatamente isso: um expediente dirigido por um ministro de Estado ao Presidente da República, usado para informar, propor uma medida ou submeter um projeto de ato normativo. Em situações específicas (como quando encaminha um projeto de lei), pode ter cópia enviada ao Congresso Nacional; em outras, ao Poder Judiciário — dependendo do assunto tratado.
Exemplo: quando um ministério propõe um novo decreto, o ministro explica a proposta numa exposição de motivos endereçada ao Presidente — é esse documento interno de comunicação entre ministro e presidente que o item descreve corretamente.$q$
where exam_year=2021 and item_number=20 and career_name='Agente de Polícia Federal' and official_answer='C';
