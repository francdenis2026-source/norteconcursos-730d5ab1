-- Norte Concursos | PC-AC 2026 | Língua Portuguesa
-- Snapshot dos 19 materiais didáticos revisados em 20/11/2026.
-- Removeu-se o bloco de Contabilidade/CPC 26 que estava indevidamente anexado.
-- Cada material contém teoria, exemplos, estratégia de prova, revisão,
-- 10 flashcards e 10 questões autorais com gabarito e justificativa.

DO $pcac_portugues$
DECLARE
  changed_count integer;
BEGIN
  UPDATE public.study_materials AS m
  SET
    summary = v.summary,
    body_md = v.body_md,
    flashcards = v.flashcards::jsonb,
    quiz = v.quiz::jsonb,
    updated_at = now()
  FROM (VALUES
('pcac-2026-portugues-01-leitura-compreensao-interpretacao','Compreensão e interpretação, tema, ideia central, tese, argumentos, gênero, finalidade, inferência, pressupostos, fato e opinião.','# Língua Portuguesa — Aula 01: Leitura, compreensão e interpretação

## Objetivos
Identificar o que o texto afirma, distinguir assunto de mensagem principal, reconhecer tese e argumentos, interpretar informações explícitas e implícitas e evitar extrapolações.

## 1. Compreender não é adivinhar
Compreender é recuperar informações que o texto apresenta. Interpretar é relacionar essas informações e chegar a conclusões autorizadas pelas palavras, pela organização e pelo contexto. Em concurso, não basta uma alternativa parecer correta no mundo real: ela precisa ser sustentada pelo texto.

Exemplo cotidiano: se um aviso diz “o atendimento começa às 8h”, podemos compreender que o horário inicial é 8h. Não podemos inferir que todos serão atendidos exatamente às 8h, porque o aviso não afirma isso.

## 2. Tema, assunto, ideia central e tópico frasal
- **Tema/assunto:** campo geral de que o texto trata.
- **Ideia central:** mensagem principal que o texto desenvolve sobre o tema.
- **Tópico frasal:** ideia nuclear de um parágrafo; pode aparecer no início, no meio ou no fim.
- **Detalhe:** informação que explica, exemplifica ou complementa a ideia principal.

Exemplo: tema = atendimento digital; ideia central = o serviço digital reduziu filas, mas ainda exige apoio a parte dos usuários.

## 3. Tese e argumentos
A tese é a posição defendida pelo autor. Argumentos são razões, dados, exemplos, comparações e evidências que sustentam essa posição. A conclusão retoma ou decorre do raciocínio.

Dica: pergunte “o que o autor quer que eu aceite?” (tese) e “por que ele quer que eu aceite?” (argumentos). Um exemplo pode ilustrar um argumento sem ser a tese.

## 4. Gênero, tipologia e finalidade
Gênero é a forma social de comunicação: notícia, edital, relatório, e-mail, artigo de opinião, crônica, lei ou postagem. Tipologia textual é o modo de organização predominante: narração, descrição, exposição, argumentação ou injunção.

A finalidade pode ser informar, orientar, instruir, explicar, convencer, criticar ou registrar. Não identifique o gênero apenas pelo tema; observe estrutura, linguagem, suporte, público e objetivo.

## 5. Explícito, implícito, pressuposto e subentendido
Informação explícita está escrita diretamente. Informação implícita é recuperada por inferência.
- **Pressuposto:** conteúdo sugerido por uma expressão linguística. “Ela voltou a estudar” pressupõe que já estudava antes.
- **Subentendido:** sentido sugerido pela situação comunicativa, que depende mais do contexto e da intenção.
- **Inferência:** conclusão construída a partir de pistas textuais e conhecimentos pertinentes.

A inferência não pode contradizer o texto nem transformar possibilidade em certeza.

## 6. Fato, opinião e modalização
Fato é apresentado como verificável; opinião expressa avaliação ou julgamento. Palavras como “lamentavelmente”, “essencial”, “inaceitável” e “excelente” podem revelar posicionamento. Modalizadores como “talvez”, “provavelmente”, “certamente” e “pode” mostram grau de certeza ou possibilidade.

## 7. Método de prova
1. Leia o comando: ideia central, inferência, finalidade ou significado de expressão?
2. Localize o trecho relevante.
3. Reescreva mentalmente a informação sem exagerar.
4. Confira sujeito, tempo, negação, condição, quantidade e intensidade.
5. Desconfie de “sempre”, “nunca”, “todos” e “somente” quando o texto não usar alcance tão absoluto.
6. Elimine alternativas que acrescentem causa, intenção ou consequência não informada.

## Exemplo comentado
Texto: “Embora o atendimento digital tenha reduzido filas presenciais, parte dos usuários ainda necessita de orientação.”
- “Embora” introduz concessão.
- O texto afirma redução de filas, não eliminação.
- “Parte dos usuários” não significa todos.
- Inferência válida: a digitalização não resolveu todas as dificuldades.
- Inferência inválida: o atendimento presencial deixou de existir.

## Revisão
Compreensão recupera o que está dito; interpretação relaciona pistas. Tema é o assunto; ideia central é a mensagem; tese é a posição defendida; argumentos sustentam a tese. A resposta deve ter apoio textual.','[{"b":"Compreensão recupera informações expressas; interpretação relaciona pistas e constrói inferências autorizadas.","f":"Qual a diferença entre compreensão e interpretação?"},{"b":"O assunto geral tratado pelo texto.","f":"O que é tema?"},{"b":"A mensagem principal desenvolvida sobre o tema.","f":"O que é ideia central?"},{"b":"A posição ou proposição defendida pelo autor.","f":"O que é tese?"},{"b":"Razões, dados, exemplos ou evidências usados para sustentar a tese.","f":"O que são argumentos?"},{"b":"Conteúdo sugerido por uma expressão linguística, como “voltou” em “voltou a estudar”.","f":"O que é pressuposto?"},{"b":"Sentido sugerido pela situação comunicativa e pela intenção do falante.","f":"O que é subentendido?"},{"b":"Conclusão construída a partir de pistas textuais e contexto.","f":"O que é inferência?"},{"b":"Fato é apresentado como verificável; opinião expressa avaliação ou julgamento.","f":"Como diferenciar fato e opinião?"},{"b":"Verificar se o texto realmente autoriza uma afirmação tão absoluta.","f":"Qual o cuidado com palavras como “todos” e “nunca”?"}]','[{"a":true,"q":"A interpretação deve ser apoiada por pistas textuais e pelo contexto.","why":"A opinião pessoal não substitui a evidência textual."},{"a":false,"q":"Tema e ideia central são necessariamente a mesma coisa.","why":"Tema é o assunto; ideia central é a mensagem principal sobre ele."},{"a":true,"q":"A tese é a posição defendida em um texto argumentativo.","why":"Os argumentos sustentam essa posição."},{"a":false,"q":"Uma proposição falsa no mundo real nunca pode aparecer como informação explícita de um texto.","why":"A questão pode cobrar o que o texto afirma, sem validar externamente o fato."},{"a":true,"q":"A expressão “voltou a estudar” pressupõe que a pessoa já estudava anteriormente.","why":"O verbo “voltar” ativa essa informação pressuposta."},{"a":false,"q":"“Parte dos usuários” significa necessariamente todos os usuários.","why":"Parte indica apenas uma parcela, não a totalidade."},{"a":true,"q":"O conectivo “embora” normalmente introduz concessão.","why":"Apresenta uma circunstância que não impede o fato da oração principal."},{"a":true,"q":"Palavras como “talvez” e “provavelmente” podem funcionar como modalizadores.","why":"Elas indicam possibilidade ou grau de certeza."},{"a":false,"q":"Uma inferência pode contrariar uma informação expressa, desde que pareça lógica.","why":"A inferência deve ser compatível com o texto."},{"a":true,"q":"A finalidade de um texto deve ser identificada considerando gênero, público e situação comunicativa.","why":"A forma e o contexto ajudam a reconhecer o objetivo."}]'),
('pcac-2026-portugues-02-estrutura-textual-progressao-ideias','Organização textual, introdução, desenvolvimento, conclusão, parágrafo, tópico frasal, hierarquia, progressão temática e unidade.','# Aula 02 — Estrutura textual, parágrafos e progressão das ideias

## 1. Como um texto se organiza
O texto é uma unidade de comunicação. Em muitos textos expositivos e argumentativos, a organização apresenta introdução, desenvolvimento e conclusão:
- introdução: apresenta tema, problema ou tese;
- desenvolvimento: explica, descreve, compara, exemplifica ou argumenta;
- conclusão: retoma a ideia central, sintetiza ou apresenta consequência/proposta.

Essa estrutura é frequente, mas não obrigatória em todos os gêneros. Uma notícia, um diálogo, um edital e um relatório podem seguir organizações próprias.

## 2. Parágrafo e tópico frasal
O parágrafo desenvolve uma unidade de sentido. Pode conter tópico frasal, explicações, exemplos, dados e fechamento. O tópico frasal apresenta a ideia nuclear; nem sempre aparece na primeira frase.

Exemplo: “A preservação de provas exige organização. Os documentos devem ser identificados, acondicionados e registrados. Assim, reduz-se o risco de perda de informações.” A primeira frase apresenta o tópico; as seguintes explicam e concluem.

## 3. Ideias principais e secundárias
- principal: orienta o parágrafo;
- secundária: explica, justifica, exemplifica ou detalha a principal;
- detalhe: acrescenta dado específico, data, número ou circunstância.

Ao resumir, preserve a ideia principal e retire detalhes que não alteram a mensagem central.

## 4. Progressão temática
Progressão é o avanço das informações sem abandonar o tema. O texto retoma algo já conhecido e acrescenta informação nova. A retomada mantém continuidade; a informação nova faz o texto avançar.

Exemplo: “A equipe recebeu os depoimentos. Depois, comparou os horários informados. Por fim, elaborou uma linha do tempo.” Cada frase acrescenta uma etapa ligada ao mesmo assunto.

## 5. Unidade e ruptura temática
Há unidade quando as partes contribuem para o propósito central. Uma informação pode ser verdadeira isoladamente e ainda assim ser inadequada se não tiver relação com o assunto. Saltos bruscos, contradições sem explicação e repetições desnecessárias prejudicam a progressão.

## 6. Sequência lógica e cronológica
Marcadores como “primeiro”, “em seguida”, “posteriormente”, “por fim”, “antes” e “simultaneamente” organizam etapas. Em textos argumentativos, a sequência pode ser lógica, não temporal: afirmação, justificativa, exemplo e conclusão.

## 7. Estratégia para questões
1. Identifique o assunto do parágrafo.
2. Resuma sua ideia em uma frase.
3. Observe o que cada período acrescenta.
4. Verifique se há retomada, explicação, exemplo, oposição ou conclusão.
5. Elimine frases que desviam do tema ou repetem informação sem função.

## Exemplo resolvido
“Uma investigação eficiente depende de registros confiáveis. Por isso, cada documento deve receber identificação e data. Esse procedimento facilita a conferência posterior.”
A segunda frase detalha uma providência; “por isso” introduz consequência/encaminhamento explicativo. A terceira retoma “esse procedimento” e apresenta sua utilidade.

## Pegadinhas
- Nem todo parágrafo precisa ter três frases.
- O tópico frasal não precisa estar sempre no início.
- Repetição controlada pode garantir continuidade; repetição excessiva gera redundância.
- A conclusão não precisa apresentar uma solução em todos os gêneros.

## Revisão
Observe a ideia central, a função de cada frase e a relação entre informação conhecida e informação nova.','[{"b":"Ideia nuclear que orienta o desenvolvimento do parágrafo.","f":"O que é tópico frasal?"},{"b":"Introdução, desenvolvimento e conclusão.","f":"Quais são as partes frequentes de um texto argumentativo?"},{"b":"Avanço do texto com informações novas ligadas ao tema central.","f":"O que é progressão temática?"},{"b":"Informações que explicam, justificam ou exemplificam a ideia principal.","f":"O que são ideias secundárias?"},{"b":"Apresentar o tema, o problema ou a tese.","f":"Qual a função da introdução?"},{"b":"Desdobrar a ideia central por explicações, dados, exemplos ou argumentos.","f":"Qual a função do desenvolvimento?"},{"b":"Retomar, sintetizar ou encaminhar a ideia central.","f":"Qual a função da conclusão?"},{"b":"Coerência entre as partes em torno de um assunto ou propósito.","f":"O que é unidade temática?"},{"b":"Não. Retomadas controladas mantêm continuidade; excesso gera redundância.","f":"Repetição sempre prejudica o texto?"},{"b":"Verificar se apresenta, explica, exemplifica, contrasta, conclui ou acrescenta informação.","f":"Como identificar a função de uma frase no parágrafo?"}]','[{"a":true,"q":"A progressão textual acrescenta informações relacionadas ao tema.","why":"A informação nova deve manter a unidade temática."},{"a":false,"q":"Todo parágrafo precisa ter exatamente três frases.","why":"Não há número fixo de frases por parágrafo."},{"a":true,"q":"Uma ideia secundária pode exemplificar a ideia principal.","why":"Ela desenvolve ou sustenta o núcleo do parágrafo."},{"a":false,"q":"O tópico frasal aparece obrigatoriamente na primeira frase.","why":"Pode aparecer em outra posição ou estar implícito."},{"a":true,"q":"Marcadores como “em seguida” podem organizar uma sequência temporal.","why":"Eles indicam ordenação de etapas."},{"a":true,"q":"Uma informação verdadeira pode ser inadequada ao parágrafo se fugir do assunto.","why":"A pertinência depende da unidade temática."},{"a":false,"q":"Repetir a mesma informação várias vezes sempre melhora a coesão.","why":"A repetição excessiva pode gerar redundância."},{"a":true,"q":"A conclusão pode retomar a tese e sintetizar os argumentos.","why":"É uma função comum em textos argumentativos."},{"a":false,"q":"Todo gênero textual precisa seguir introdução, desenvolvimento e conclusão de forma rígida.","why":"A estrutura varia conforme o gênero e a finalidade."},{"a":true,"q":"Para resumir um parágrafo, é importante preservar sua ideia principal.","why":"Detalhes podem ser retirados se não forem essenciais."}]'),
('pcac-2026-portugues-03-articulacao-referencias-conectivos','Referenciação, anáfora, catáfora, pronomes, elipse, conectivos, relações lógico-discursivas e substituição de articuladores.','# Aula 03 — Articulação textual: referências e conectivos

## 1. Referenciação
A referenciação permite identificar de quem ou de que o texto fala. Pronomes e expressões nominais retomam ou antecipam elementos, evitando repetição e mantendo continuidade.

- **Anáfora:** retoma termo já mencionado. “A equipe recebeu o relatório. Ela o analisará.”
- **Catáfora:** anuncia termo que aparece depois. “Só desejo isto: que todos sejam ouvidos.”
- **Referente:** elemento a que a expressão remete.

O pronome deve ter referente identificável. Se houver dois possíveis antecedentes, pode surgir ambiguidade.

## 2. Pronomes e retomadas
Pronomes pessoais, demonstrativos e relativos podem estabelecer coesão. Exemplo: “Os documentos chegaram; esses serão conferidos hoje.” “Esses” retoma “documentos”. Em “O servidor que assinou o termo saiu”, “que” retoma “servidor”.

## 3. Elipse e substituição
Elipse é omissão de termo recuperável pelo contexto: “Ana conferiu os autos; Pedro, os anexos” (omitiu-se “conferiu”). A substituição usa expressão equivalente para evitar repetição: “o documento”, “o registro”, “esse procedimento”, conforme o referente.

## 4. Conectivos e relações
- adição: e, além disso, também;
- oposição/adversidade: mas, porém, contudo;
- causa: porque, visto que, já que;
- consequência/conclusão: por isso, portanto, logo;
- concessão: embora, ainda que, mesmo que;
- condição: se, caso, desde que;
- finalidade: para que, a fim de que;
- explicação: pois, porque, que, conforme a construção;
- comparação: como, tal qual, mais... que;
- proporção/tempo: à medida que, enquanto, quando.

A classificação depende da relação efetivamente construída no período.

## 5. Causa, consequência e explicação
“Não compareceu porque estava doente” apresenta causa. “Estava doente; por isso, não compareceu” apresenta consequência. “Feche a porta, porque está frio” pode ter valor explicativo. A palavra isolada não basta: observe a estrutura e o sentido.

## 6. Concessão e condição
“Embora estivesse cansado, continuou” = concessão: o cansaço não impediu a ação.
“Se estivesse descansado, continuaria” = condição: a realização depende de uma hipótese.

## 7. Troca de conectivos
Trocar “embora” por “porque” muda concessão para causa. Trocar “portanto” por “contudo” muda conclusão para oposição. Em reescrita, verifique se a substituição mantém a relação lógica e a correção sintática.

## Método de prova
1. Localize o conectivo ou pronome.
2. Descubra que ideias ele conecta ou que termo retoma.
3. Reescreva a relação em palavras simples.
4. Teste o substituto no período inteiro.
5. Confira se não surgiu ambiguidade.

## Revisão
Anáfora retoma; catáfora antecipa. Conectivos expressam relações semânticas. Não classifique apenas pela palavra: considere a frase e o contexto.','[{"b":"Retomada de elemento já mencionado no texto.","f":"O que é anáfora?"},{"b":"Antecipação de elemento que será apresentado depois.","f":"O que é catáfora?"},{"b":"Elemento a que um pronome ou expressão textual faz referência.","f":"O que é referente?"},{"b":"Omissão de termo que pode ser recuperado pelo contexto.","f":"O que é elipse?"},{"b":"Oposição ou adversidade.","f":"Qual relação “contudo” costuma indicar?"},{"b":"Concessão.","f":"Qual relação “embora” costuma indicar?"},{"b":"Conclusão ou consequência.","f":"Qual relação “portanto” costuma indicar?"},{"b":"Condição.","f":"Qual relação “caso” costuma introduzir?"},{"b":"Pode introduzir causa ou explicação conforme a estrutura.","f":"Por que “porque” exige atenção contextual?"},{"b":"Se a relação lógica e a correção gramatical permanecem.","f":"O que verificar ao substituir um conectivo?"}]','[{"a":true,"q":"Em “João chegou. Ele sentou”, “ele” retoma João por anáfora.","why":"O referente já havia sido mencionado."},{"a":false,"q":"Catáfora retoma necessariamente um termo anterior.","why":"Catáfora antecipa o termo que virá depois."},{"a":true,"q":"“Contudo” normalmente expressa oposição.","why":"É conectivo adversativo."},{"a":false,"q":"“Embora” normalmente introduz causa.","why":"Em regra, introduz concessão."},{"a":true,"q":"A elipse omite um termo recuperável pelo contexto.","why":"A omissão evita repetição sem prejudicar o sentido."},{"a":true,"q":"“Se houver autorização, o acesso será liberado” apresenta condição.","why":"A liberação depende da hipótese expressa."},{"a":false,"q":"“Portanto” e “contudo” expressam sempre a mesma relação.","why":"Portanto conclui; contudo opõe."},{"a":true,"q":"Um pronome com dois antecedentes possíveis pode gerar ambiguidade.","why":"O referente fica incerto."},{"a":true,"q":"A palavra “porque” pode assumir valor causal ou explicativo.","why":"A função depende da relação entre as orações."},{"a":false,"q":"A substituição de conectivos nunca altera o sentido.","why":"Conectivos diferentes podem expressar relações lógicas diferentes."}]'),
('pcac-2026-portugues-04-coesao-coerencia-textual','Coesão referencial, lexical e sequencial; coerência global; continuidade, progressão, contradição, elipse e mecanismos de textualidade.','# Aula 04 — Coesão e coerência textual

## 1. Coesão: ligação entre partes
Coesão é a ligação linguística que conecta palavras, orações, períodos e parágrafos. É construída por pronomes, substituições, elipses, conectivos e relações vocabulares.

Exemplo: “Os autos chegaram. Eles serão analisados.” O pronome “eles” retoma “os autos”, criando coesão referencial.

## 2. Tipos de coesão
- **Referencial:** retoma ou antecipa pessoas, objetos e ideias por pronomes ou expressões.
- **Lexical:** usa repetição controlada, sinônimos, hiperônimos e palavras do mesmo campo semântico.
- **Sequencial:** organiza a progressão por conectivos e marcadores como “primeiramente”, “depois” e “por fim”.
- **Por elipse:** omite termo que pode ser recuperado.

## 3. Coerência: sentido global
Coerência é a compatibilidade entre as ideias e a construção de um sentido compreensível. Depende do texto, do contexto, do conhecimento compartilhado e da progressão temática.

Exemplo incoerente sem contexto: “A sala estava vazia; por isso, todos os presentes ocuparam as cadeiras.” A segunda parte contradiz a primeira, salvo se o contexto explicar a mudança.

## 4. Coesão não garante coerência
Um texto pode usar pronomes e conectivos corretamente, mas apresentar ideias incompatíveis. Também pode haver coerência com poucas marcas explícitas de coesão, quando a relação é facilmente recuperada.

A pergunta-chave: as partes estão linguisticamente ligadas (coesão)? O conjunto produz sentido consistente (coerência)?

## 5. Continuidade, progressão e não contradição
A continuidade mantém o assunto; a progressão acrescenta informação nova; a não contradição evita afirmações incompatíveis sem explicação. Repetição excessiva pode gerar redundância, enquanto ausência de retomadas pode deixar o texto fragmentado.

## 6. Exemplo do cotidiano
“Maria recebeu o formulário. Depois, preencheu o documento e o entregou ao setor.” “O documento” substitui “formulário”; “o” retoma “documento”; “depois” organiza a sequência. Há coesão. O texto também é coerente porque as ações formam uma sequência possível.

## 7. Estratégia de prova
1. Identifique o referente de cada pronome.
2. Observe se os conectivos expressam a relação correta.
3. Verifique se a informação nova mantém o tema.
4. Procure contradições ou saltos injustificados.
5. Avalie se a retirada de uma frase quebra a continuidade ou apenas elimina detalhe.

## Pegadinhas
- Coesão e coerência não são sinônimos.
- Conectivo correto não salva contradição de conteúdo.
- Repetição pode ser recurso coesivo, mas excesso prejudica a fluidez.
- Nem toda frase verdadeira é pertinente ao texto.

## Revisão
Coesão é ligação linguística; coerência é consistência de sentido. Referencial retoma; lexical relaciona vocabulário; sequencial organiza o avanço do texto.','[{"b":"Ligação linguística entre partes do texto.","f":"O que é coesão?"},{"b":"Compatibilidade das ideias e consistência do sentido global.","f":"O que é coerência?"},{"b":"Ligação por retomada ou antecipação de referentes.","f":"O que é coesão referencial?"},{"b":"Continuidade por repetição controlada, sinonímia e associação vocabular.","f":"O que é coesão lexical?"},{"b":"Organização do texto por conectivos e operadores de progressão.","f":"O que é coesão sequencial?"},{"b":"Omite termo recuperável, evitando repetição.","f":"Como a elipse contribui para coesão?"},{"b":"Não. Pode ter ligações gramaticais e ideias incompatíveis.","f":"Um texto coeso é sempre coerente?"},{"b":"Acrescentar informações novas sem romper o tema.","f":"O que é progressão textual?"},{"b":"Redundância e perda de fluidez.","f":"Qual o risco da repetição excessiva?"},{"b":"Como as partes estão ligadas? (coesão); o conjunto faz sentido? (coerência).","f":"Qual a pergunta para diferenciar coesão e coerência?"}]','[{"a":false,"q":"Coesão e coerência são conceitos idênticos.","why":"Coesão trata de ligações linguísticas; coerência trata do sentido global."},{"a":true,"q":"Pronomes podem estabelecer coesão referencial.","why":"Eles retomam ou antecipam referentes."},{"a":true,"q":"Sinônimos e palavras do mesmo campo semântico podem contribuir para coesão lexical.","why":"Essas relações mantêm continuidade vocabular."},{"a":false,"q":"Um texto com conectivos corretos é necessariamente coerente.","why":"As ideias ainda podem ser contraditórias."},{"a":true,"q":"A elipse pode omitir um termo recuperável pelo contexto.","why":"É um mecanismo de coesão."},{"a":true,"q":"A progressão exige informação nova relacionada ao tema.","why":"O texto deve avançar mantendo unidade."},{"a":false,"q":"Toda repetição de palavras é erro textual.","why":"A repetição controlada pode garantir clareza e coesão."},{"a":true,"q":"Uma informação verdadeira pode ser impertinente ao assunto do parágrafo.","why":"Pertinência depende do tema e do propósito."},{"a":false,"q":"Coerência depende exclusivamente da presença de conectivos.","why":"Depende da compatibilidade e organização das ideias."},{"a":true,"q":"A ausência de referente claro pode prejudicar a compreensão.","why":"O leitor precisa identificar a que o pronome ou expressão se refere."}]'),
('pcac-2026-portugues-05-reescrita-equivalencia-paralelismo','Reescrita e equivalência semântica, voz ativa e passiva, ordem dos termos, paralelismo, conectivos, modalidade, negação e quantificadores.','# Aula 05 — Reescrita, equivalência e paralelismo

## 1. O que é reescrever?
Reescrever é alterar a forma de uma frase ou trecho. A questão pode exigir preservação do sentido, correção gramatical ou ambas. Uma frase pode continuar gramaticalmente correta e, mesmo assim, mudar a informação original.

Ao comparar versões, confira sujeito, agente, tempo, modo, negação, quantidade, intensidade, condição e relação lógica.

## 2. Equivalência de sentido
Duas construções são equivalentes quando preservam a informação essencial e as relações semânticas relevantes. Sinônimos não são sempre intercambiáveis: “reduzir” não equivale a “eliminar”; “pode” não equivale a “deve”; “alguns” não equivale a “todos”.

Exemplo: “A medida pode diminuir os atrasos” não equivale a “A medida eliminará os atrasos”. A segunda frase transforma possibilidade em certeza e redução em eliminação.

## 3. Voz ativa e voz passiva
Na voz ativa, o sujeito pratica a ação: “A equipe analisou o documento.”
Na passiva analítica, o sujeito recebe a ação: “O documento foi analisado pela equipe.”
O objeto direto da ativa pode tornar-se sujeito paciente da passiva. Preserve tempo e aspecto verbal. Nem todo verbo admite passiva; em regra, a transformação ocorre com verbo transitivo direto (ou construção com objeto direto).

## 4. Paralelismo sintático
É a manutenção de estruturas gramaticais equivalentes em termos coordenados ou comparados.
Inadequado: “A equipe pretende identificar falhas e a correção dos registros.”
Melhor: “A equipe pretende identificar falhas e corrigir os registros.”
Os verbos “identificar” e “corrigir” ficam em estruturas paralelas.

## 5. Paralelismo semântico
Além da forma, os elementos coordenados precisam manter relação lógica. Uma enumeração deve reunir elementos compatíveis: “planejar, executar e avaliar” são ações paralelas.

## 6. Ordem, pontuação e conectivos
Mudar a ordem pode deslocar o foco ou criar ambiguidade. Inserir ou retirar vírgulas pode alterar o alcance de uma oração adjetiva. Trocar “embora” por “porque” muda concessão para causa; trocar “portanto” por “contudo” muda conclusão para oposição.

## 7. Quantificadores, negação e modalidade
Atenção a:
- todos / alguns / nenhum;
- sempre / frequentemente / nunca;
- pode / deve / precisa;
- apenas / inclusive / também;
- não / jamais.
Essas palavras definem alcance e força da afirmação. A retirada de “não” pode inverter o sentido.

## 8. Método de prova
1. Leia a frase original e identifique a informação central.
2. Marque negação, quantificadores e modalizadores.
3. Confira quem pratica e quem recebe a ação.
4. Compare conectivos e relações entre orações.
5. Verifique pontuação e referente de pronomes.
6. Só declare equivalência se a versão nova preservar os elementos essenciais.

## Revisão
A forma pode mudar, mas sentido, alcance, tempo, modalidade e relações precisam ser preservados quando a questão exige equivalência.','[{"b":"Quando preservam a informação essencial e as relações de sentido relevantes.","f":"Quando duas frases são equivalentes?"},{"b":"Manutenção de estruturas gramaticais equivalentes em elementos coordenados.","f":"O que é paralelismo sintático?"},{"b":"Construção em que o sujeito pratica a ação verbal.","f":"O que é voz ativa?"},{"b":"Construção em que o sujeito recebe a ação, geralmente com ser + particípio.","f":"O que é voz passiva analítica?"},{"b":"Não. Possibilidade e obrigação são modalidades diferentes.","f":"Trocar “pode” por “deve” preserva o sentido?"},{"b":"O sentido pode ser invertido.","f":"O que ocorre ao retirar uma negação?"},{"b":"Porque possuem alcances quantitativos diferentes.","f":"Por que “alguns” e “todos” não são equivalentes?"},{"b":"O conteúdo, o tempo verbal e a relação entre agente e paciente.","f":"O que deve ser preservado ao transformar voz ativa em passiva?"},{"b":"Observe estruturas coordenadas com formas gramaticais incompatíveis ou assimétricas.","f":"Como reconhecer quebra de paralelismo?"},{"b":"Sujeito, verbo, complementos, negação, tempo, conectivos, pontuação e quantificadores.","f":"Quais elementos revisar em questão de reescrita?"}]','[{"a":true,"q":"Uma reescrita equivalente deve preservar as relações essenciais de sentido.","why":"A forma muda, mas o conteúdo relevante permanece."},{"a":false,"q":"Trocar “alguns” por “todos” sempre preserva o sentido.","why":"O alcance da afirmação é ampliado."},{"a":true,"q":"O paralelismo sintático busca manter estruturas gramaticais equivalentes.","why":"Isso melhora correção e clareza."},{"a":true,"q":"A voz passiva analítica costuma ser formada por ser mais particípio.","why":"Exemplo: foi analisado."},{"a":false,"q":"Qualquer verbo pode ser transformado em voz passiva analítica.","why":"A transformação depende da estrutura e da transitividade verbal."},{"a":true,"q":"Retirar uma negação pode inverter o sentido da frase.","why":"A negação altera o valor da afirmação."},{"a":true,"q":"Trocar “embora” por “porque” altera a relação lógico-semântica.","why":"Concessão passa a ser interpretada como causa."},{"a":false,"q":"A troca de “pode” por “deve” não altera a modalidade.","why":"Possibilidade e obrigação são diferentes."},{"a":true,"q":"A pontuação pode alterar o alcance de uma oração adjetiva.","why":"Vírgulas podem distinguir valor explicativo e restritivo."},{"a":true,"q":"Na reescrita, deve-se conferir quem pratica e quem recebe a ação.","why":"A transformação de voz pode mudar a função dos termos sem mudar o fato descrito."}]'),
('pcac-2026-portugues-06-semantica-sinonimia-ambiguidade','Semântica contextual, sinonímia, antonímia, polissemia, homonímia, denotação, conotação, ambiguidade, pressuposição e efeitos de sentido.','# Aula 06 — Semântica e significação das palavras

## 1. Sentido depende do contexto
Semântica estuda o significado. Uma palavra não deve ser interpretada isoladamente: o contexto seleciona o sentido adequado. Em prova, a substituição precisa preservar a ideia, a intensidade, o registro e a avaliação presentes no trecho.

Exemplo: “A testemunha prestou um depoimento claro.” Aqui, “claro” significa compreensível; em “o céu está claro”, refere-se à luminosidade.

## 2. Sinonímia e antonímia
Sinônimos apresentam sentidos próximos, mas raramente são idênticos em todos os contextos. “Iniciar” e “começar” podem ser equivalentes em muitos usos; “reduzir” e “eliminar” não são sinônimos, pois reduzir é diminuir e eliminar é fazer desaparecer.

Antônimos expressam oposição: legal/ilegal, quente/frio, presente/ausente. A oposição pode ser gradual (quente/frio admite morno) ou complementar em certos contextos (presente/ausente).

## 3. Polissemia e homonímia
Polissemia: uma palavra possui vários sentidos relacionados. “Cabeça” pode ser parte do corpo, liderança ou parte inicial de uma fila.
Homonímia: formas iguais ou semelhantes correspondem a palavras de sentidos distintos, sem a mesma relação semântica. A distinção pode depender da análise lexical e do contexto.

## 4. Denotação e conotação
Denotação é o sentido literal ou mais direto. Conotação é o sentido figurado ou expressivo.
- “A porta está aberta”: sentido denotativo.
- “Aquela atitude abriu portas”: sentido conotativo, indicando oportunidades.

A linguagem figurada não significa erro: é recurso expressivo.

## 5. Ambiguidade
Ambiguidade ocorre quando uma frase permite duas ou mais leituras.
- lexical: palavra com mais de um sentido;
- sintática/estrutural: organização dos termos permite interpretações distintas.

Exemplo: “Vi o investigador com o binóculo.” O observador usou o binóculo ou o investigador estava com ele? Para eliminar a dúvida, reescreva: “Com o binóculo, vi o investigador” ou “Vi o investigador que carregava o binóculo”.

## 6. Pressuposição e implícitos
Expressões podem carregar informações não afirmadas diretamente. “Pedro deixou de fumar” pressupõe que fumava antes. “Até Pedro compareceu” sugere que a presença de Pedro era inesperada. A questão pode cobrar o efeito produzido por essas escolhas.

## 7. Intensidade, ironia e avaliação
“Frio”, “gelado” e “congelante” apresentam graus diferentes. “Excelente” e “razoável” avaliam de modo distinto. Ironia pode ocorrer quando o sentido pretendido contrasta com o literal: dizer “Que pontualidade!” a alguém que chegou muito atrasado.

## Método de prova
1. Leia a frase e o parágrafo.
2. Identifique o sentido da palavra naquele contexto.
3. Teste a substituição.
4. Confira intensidade, formalidade, avaliação e relação lógica.
5. Se houver ambiguidade, formule as leituras possíveis.

## Revisão
Sinônimos são próximos, não necessariamente idênticos. Polissemia reúne sentidos relacionados; homonímia envolve formas coincidentes de palavras distintas. Denotação é literal; conotação é figurada. Contexto define o sentido.','[{"b":"Relação de proximidade de sentido entre palavras, sem exigir identidade absoluta.","f":"O que é sinonímia?"},{"b":"Relação de oposição entre sentidos.","f":"O que é antonímia?"},{"b":"Existência de vários sentidos relacionados para uma mesma palavra.","f":"O que é polissemia?"},{"b":"Coincidência de forma entre palavras de sentidos distintos.","f":"O que é homonímia?"},{"b":"Uso em sentido literal ou mais direto.","f":"O que é denotação?"},{"b":"Uso em sentido figurado ou expressivo.","f":"O que é conotação?"},{"b":"Dúvida de interpretação causada por palavra com mais de um sentido.","f":"O que é ambiguidade lexical?"},{"b":"Dúvida causada pela organização dos termos na frase.","f":"O que é ambiguidade sintática?"},{"b":"Que a pessoa fumava antes.","f":"O que “deixou de fumar” pressupõe?"},{"b":"Pelo contraste contextual entre o sentido literal e o sentido pretendido.","f":"Como reconhecer ironia?"}]','[{"a":false,"q":"Sinônimos são necessariamente intercambiáveis em qualquer frase.","why":"O contexto, a intensidade e o registro podem impedir a substituição."},{"a":true,"q":"A palavra “cabeça” pode ser polissêmica.","why":"Pode designar parte do corpo, liderança ou parte inicial."},{"a":false,"q":"Denotação é o sentido figurado.","why":"Denotação é literal; conotação é figurada."},{"a":true,"q":"“Aquela atitude abriu portas” pode ter sentido conotativo.","why":"A expressão indica criação de oportunidades."},{"a":true,"q":"“Vi o investigador com o binóculo” pode ser ambígua.","why":"Não fica claro quem estava com o binóculo."},{"a":false,"q":"Polissemia e homonímia são exatamente o mesmo fenômeno.","why":"Na polissemia, os sentidos são relacionados; na homonímia, são palavras distintas com formas coincidentes."},{"a":true,"q":"O contexto ajuda a selecionar o sentido de uma palavra polissêmica.","why":"A frase e a situação comunicativa delimitam a interpretação."},{"a":true,"q":"“Pedro deixou de fumar” pressupõe que Pedro fumava anteriormente.","why":"A expressão “deixar de” ativa essa pressuposição."},{"a":false,"q":"Ironia é identificada apenas pelo significado literal das palavras.","why":"É preciso considerar o contexto e o contraste entre literal e pretendido."},{"a":true,"q":"A substituição por sinônimo deve preservar a intensidade e a avaliação quando a questão exige equivalência.","why":"Palavras próximas podem produzir efeitos diferentes."}]'),
('pcac-2026-portugues-07-ortografia-acentuacao-pontuacao','Ortografia oficial, acentuação gráfica, tonicidade, hífen, acentos diferenciais, emprego da vírgula, dois-pontos, ponto e vírgula e efeitos de pontuação.','# Aula 07 — Ortografia, acentuação e pontuação

## 1. Ortografia oficial
Ortografia é o conjunto de convenções que define a escrita padrão. Em concurso, atenção a letras que representam sons semelhantes, como s/z, g/j, x/ch, além de parônimos e homônimos. Exemplos: descrição/discrição; cumprimento/comprimento; sessão/seção/cessão.

Não confunda grafia com pronúncia regional. Em dúvida, observe a forma oficial e o contexto da palavra.

## 2. Acentuação e sílaba tônica
A sílaba tônica é pronunciada com maior intensidade:
- oxítona: última sílaba (café, também);
- paroxítona: penúltima (fácil, caráter);
- proparoxítona: antepenúltima (público, lâmpada).

Regra segura: todas as proparoxítonas são acentuadas. Oxítonas são acentuadas em terminações previstas, como a(s), e(s), o(s), em(ens). Paroxítonas seguem regras próprias, com destaque para terminações como l, n, r, x, i(s), us, um/uns, ã(s), ão(s), ps e ditongo, entre outras previstas na norma.

## 3. Hiato e ditongo
O hiato separa vogais em sílabas diferentes: sa-ú-de, pa-ís. Acentuam-se i e u tônicos em hiato quando formam sílaba sozinhos ou acompanhados de s, observadas as exceções. Ditongo é encontro vocálico na mesma sílaba. Após o Acordo Ortográfico, perderam acento alguns ditongos abertos em paroxítonas, como ideia e assembleia.

## 4. Acentos diferenciais
Permanecem casos como pôde (pretérito) / pode (presente) e pôr (verbo) / por (preposição). O acento em têm/vêm distingue plural de tem/vem. O contexto e a classe gramatical ajudam a escolher.

## 5. Hífen
O hífen segue regras de prefixação e composição. Há regras envolvendo vogais iguais/diferentes, h inicial, r/s e palavras compostas. Como há exceções, não generalize uma regra sem observar o prefixo e a palavra seguinte. Em prova, memorize padrões recorrentes e confira a grafia oficial.

## 6. Vírgula: funções e proibições
A vírgula pode separar:
- itens de enumeração;
- vocativo: “Senhores, iniciem a reunião”;
- aposto explicativo;
- adjunto adverbial deslocado, conforme extensão e clareza;
- orações coordenadas e subordinadas, conforme a estrutura;
- expressão intercalada.

Não separe sujeito e verbo nem verbo e complemento por vírgula sem justificativa sintática. Exemplo inadequado: “A equipe, analisou os autos.” Correto: “A equipe analisou os autos.”

## 7. Outros sinais
- dois-pontos: introduzem explicação, enumeração, esclarecimento ou fala;
- ponto e vírgula: separa segmentos coordenados extensos ou itens complexos;
- travessão: pode marcar fala ou intercalação;
- parênteses: inserem informação acessória;
- reticências: indicam suspensão, hesitação ou continuidade, conforme o contexto.

## 8. Pontuação e sentido
“Os servidores que concluíram o curso serão convocados” restringe a convocação ao grupo que concluiu. “Os servidores, que concluíram o curso, serão convocados” apresenta a oração como explicativa e pode sugerir que todos os servidores mencionados concluíram. A vírgula altera o alcance.

## Estratégia de prova
Analise a estrutura sintática, não apenas a pausa respiratória. Em acentuação, identifique tonicidade e terminação. Em reescrita, confira se pontuação e acento mantêm o sentido.

## Revisão
Todas as proparoxítonas são acentuadas. Acentos diferenciais ajudam a distinguir formas. Vírgula não separa sujeito e verbo sem justificativa. Pontuação pode alterar sentido e alcance.','[{"b":"Palavra cuja sílaba tônica é a última.","f":"O que é oxítona?"},{"b":"Palavra cuja sílaba tônica é a penúltima.","f":"O que é paroxítona?"},{"b":"Palavra cuja sílaba tônica é a antepenúltima.","f":"O que é proparoxítona?"},{"b":"Todas são acentuadas.","f":"Qual a regra geral das proparoxítonas?"},{"b":"Pôde/pode; pôr/por; têm/tem; vêm/vem.","f":"Dê exemplos de acento diferencial."},{"b":"Encontro de vogais em sílabas diferentes.","f":"O que é hiato?"},{"b":"Não, salvo intercalação ou estrutura sintática que justifique a separação.","f":"A vírgula pode separar sujeito e verbo?"},{"b":"Introduzir explicação, enumeração, esclarecimento ou fala.","f":"Para que servem os dois-pontos?"},{"b":"O valor restritivo ou explicativo e o alcance da informação.","f":"O que a vírgula pode alterar em oração adjetiva?"},{"b":"A pontuação depende da estrutura sintática e das relações de sentido.","f":"Por que não se usa vírgula apenas pela pausa respiratória?"}]','[{"a":true,"q":"Todas as proparoxítonas são acentuadas.","why":"É a regra geral."},{"a":false,"q":"“Ideia” recebe acento por ser paroxítona com ditongo aberto.","why":"Após o Acordo Ortográfico, ditongos abertos em paroxítonas como ideia perderam o acento."},{"a":true,"q":"“Pôde” e “pode” são distinguidos por acento diferencial.","why":"O acento diferencia passado e presente."},{"a":false,"q":"A vírgula pode separar livremente o sujeito do verbo.","why":"A separação é inadequada sem justificativa sintática."},{"a":true,"q":"A pontuação pode alterar o alcance de uma oração adjetiva.","why":"A vírgula pode distinguir valor restritivo e explicativo."},{"a":true,"q":"“Senhores, iniciem a reunião” apresenta vírgula para isolar o vocativo.","why":"Vocativo chama o interlocutor."},{"a":false,"q":"Dois-pontos são usados exclusivamente antes de citações.","why":"Também introduzem explicações, enumerações e esclarecimentos."},{"a":true,"q":"O hiato separa vogais em sílabas diferentes.","why":"Exemplo: sa-ú-de."},{"a":false,"q":"Acentuação depende somente do número de letras da palavra.","why":"Depende da tonicidade e das regras de terminação e encontros vocálicos."},{"a":true,"q":"O ponto e vírgula pode separar itens complexos de uma enumeração.","why":"É útil quando os itens já contêm vírgulas ou são extensos."}]'),
('pcac-2026-portugues-08-morfologia-formacao-palavras','Estrutura e formação de palavras: radical, afixos, desinências, vogal temática, derivação, composição, parassíntese e mudança de classe.','# Aula 08 — Morfologia e formação de palavras

## 1. Morfologia
Morfologia estuda a estrutura, a formação e a classificação das palavras. Para analisar uma palavra, observe seus elementos e a função que ela assume no contexto.

## 2. Elementos mórficos
- **Radical:** núcleo de significado comum a palavras da mesma família.
- **Prefixo:** elemento acrescentado antes do radical.
- **Sufixo:** elemento acrescentado depois do radical.
- **Desinência nominal:** marca gênero e número, conforme a palavra.
- **Desinência verbal:** marca pessoa, número, tempo e modo.
- **Vogal temática:** liga o radical às terminações verbais ou nominais em certas formações.

Exemplo: em “infelizmente”, identifica-se o prefixo in-, a base feliz e o sufixo -mente. Em “cantávamos”, cant- é radical, -a- vogal temática, -va- marca de tempo/modo e -mos marca pessoa/número, conforme a análise tradicional.

## 3. Derivação
- **Prefixal:** acréscimo de prefixo: infeliz.
- **Sufixal:** acréscimo de sufixo: felizmente.
- **Prefixal e sufixal:** prefixo e sufixo são acrescentados em etapas independentes: infelizmente (infeliz / felizmente).
- **Parassintética:** prefixo e sufixo entram simultaneamente; a retirada isolada de um deles não gera a forma pretendida: anoitecer.
- **Regressiva:** redução formal, comum em substantivos formados de verbos: pesca (de pescar).
- **Imprópria/conversão:** mudança de classe sem alteração da forma: “o jantar” (substantivo) / “vamos jantar” (verbo).

## 4. Composição
- **Justaposição:** união de elementos sem perda fonética relevante: passatempo, guarda-chuva.
- **Aglutinação:** união com alteração ou perda de elemento sonoro: planalto (plano + alto), embora a formação histórica de algumas palavras exija análise etimológica.

## 5. Derivação prefixal e sufixal × parassintética
Na derivação prefixal e sufixal, os afixos podem ser acrescentados independentemente e as formas intermediárias existem com sentido: infelizmente → infeliz e felizmente. Na parassíntese, a formação depende da entrada simultânea: anoitecer não se forma, com o mesmo sentido, apenas por “anoite” ou “noitecer” na análise escolar.

## 6. Família de palavras
Palavras com radical comum podem formar família lexical: pedra, pedreiro, pedregulho, pedraria. Nem toda semelhança de letras indica mesma família; o radical e a história da formação importam.

## Método de prova
1. Identifique a base/radical.
2. Localize prefixos e sufixos.
3. Teste se os afixos entram independentemente.
4. Selecione derivação ou composição.
5. Confira a função contextual em caso de derivação imprópria.

## Revisão
Prefixo vem antes; sufixo depois. Parassíntese exige acréscimo simultâneo. Justaposição conserva os elementos; aglutinação altera ou perde elemento sonoro.','[{"b":"Elemento que concentra o núcleo de significado comum a palavras da mesma família.","f":"O que é radical?"},{"b":"Afixo colocado antes do radical.","f":"O que é prefixo?"},{"b":"Afixo colocado depois do radical.","f":"O que é sufixo?"},{"b":"Elemento que marca flexões como pessoa, número, tempo e modo.","f":"O que é desinência verbal?"},{"b":"Acréscimo de prefixo à base.","f":"O que caracteriza derivação prefixal?"},{"b":"Acréscimo de sufixo à base.","f":"O que caracteriza derivação sufixal?"},{"b":"Acréscimo simultâneo de prefixo e sufixo, necessário à formação.","f":"O que caracteriza parassíntese?"},{"b":"Na justaposição não há perda fonética relevante; na aglutinação há alteração ou perda sonora.","f":"Qual a diferença entre justaposição e aglutinação?"},{"b":"Mudança de classe gramatical sem alteração formal da palavra.","f":"O que é derivação imprópria?"},{"b":"Verificar se as formas intermediárias existem com o sentido pretendido; na parassíntese, os afixos são simultâneos.","f":"Como distinguir derivação prefixal e sufixal de parassíntese?"}]','[{"a":true,"q":"O prefixo aparece antes do radical.","why":"Essa é a posição do prefixo."},{"a":false,"q":"O sufixo aparece antes do radical.","why":"O sufixo aparece depois do radical."},{"a":true,"q":"Na derivação parassintética, prefixo e sufixo são acrescentados simultaneamente.","why":"A simultaneidade caracteriza o processo."},{"a":false,"q":"Na justaposição, necessariamente ocorre perda de som de um elemento.","why":"A perda ou alteração é típica da aglutinação."},{"a":true,"q":"A derivação imprópria pode transformar adjetivo em substantivo sem alterar sua forma.","why":"Exemplo: “o jantar”."},{"a":true,"q":"Em “infeliz”, há derivação prefixal.","why":"O prefixo in- foi acrescentado a feliz."},{"a":false,"q":"Em “felizmente”, o elemento -mente é prefixo.","why":"É sufixo, pois aparece depois da base."},{"a":true,"q":"“Planalto” é exemplo tradicional de composição por aglutinação.","why":"Ocorre alteração na união dos elementos."},{"a":true,"q":"A análise morfológica deve observar a estrutura e a formação da palavra.","why":"A aparência gráfica sozinha não basta."},{"a":false,"q":"Toda palavra com prefixo e sufixo é necessariamente parassintética.","why":"Os afixos podem ser acrescentados independentemente."}]'),
('pcac-2026-portugues-09-classes-de-palavras','Classes gramaticais variáveis e invariáveis, função contextual, substantivo, adjetivo, verbo, advérbio, pronomes, preposição e conjunção.','# Aula 09 — Classes de palavras e seus empregos

## 1. Classe gramatical depende do contexto
A classe é identificada pelo emprego da palavra na frase, não apenas pela forma isolada. “O jantar atrasou” usa jantar como substantivo; “vamos jantar” usa jantar como verbo. “O não foi definitivo” substantiva a palavra não.

## 2. Classes variáveis
- **Substantivo:** nomeia seres, objetos, lugares, sentimentos e conceitos.
- **Artigo:** acompanha o substantivo, definindo-o ou indeterminando-o.
- **Adjetivo:** caracteriza ou qualifica substantivo.
- **Numeral:** indica quantidade, ordem, multiplicação ou fração.
- **Pronome:** acompanha ou substitui nome e estabelece referência.
- **Verbo:** expressa ação, estado, processo ou fenômeno.
- **Alguns pronomes e numerais** variam em gênero e número, conforme a classe.

## 3. Classes invariáveis
- **Advérbio:** modifica verbo, adjetivo ou outro advérbio; em geral, é invariável.
- **Preposição:** relaciona termos e pode ser exigida pela regência.
- **Conjunção:** liga termos ou orações e expressa relações.
- **Interjeição:** expressa reação, emoção ou chamado.

## 4. Classes com atenção especial
“Meio” pode ser numeral/adjetivo variável em “meia hora” e advérbio invariável em “meio cansada” (um pouco cansada). “Bastante” pode variar quando acompanha substantivo (“bastantes documentos”) e ficar invariável como advérbio (“trabalhou bastante”). “Que” pode ser pronome relativo, conjunção, pronome interrogativo ou palavra exclamativa.

## 5. Pronomes
Pessoais indicam pessoas do discurso; possessivos indicam posse/relação; demonstrativos situam no espaço, tempo ou texto; relativos retomam antecedente; indefinidos indicam referência vaga; interrogativos formulam perguntas.

## 6. Advérbio e adjetivo
Adjetivo caracteriza substantivo: “relatório claro”. Advérbio modifica verbo, adjetivo ou outro advérbio: “explicou claramente”; “muito claro”; “bem rapidamente”. O sufixo -mente costuma formar advérbios de modo, mas não substitui a análise contextual.

## 7. Preposição e conjunção
Preposição relaciona termos: “necessidade de apoio”. Conjunção liga orações ou termos: “estudou e trabalhou”; “saiu porque terminou”. Não confunda a preposição que introduz complemento com o conectivo que articula orações.

## Método de prova
1. Observe o termo que a palavra acompanha ou modifica.
2. Verifique sua função sintática.
3. Analise o sentido no contexto.
4. Teste flexão de gênero e número quando pertinente.
5. Compare usos diferentes da mesma palavra.

## Revisão
Não classifique palavra isoladamente. Adjetivo caracteriza substantivo; advérbio modifica verbo, adjetivo ou advérbio. Preposição relaciona termos; conjunção articula termos ou orações.','[{"b":"Nomear seres, objetos, lugares, sentimentos e conceitos.","f":"Qual a função do substantivo?"},{"b":"Determinar ou indeterminar o substantivo.","f":"Qual a função do artigo?"},{"b":"Caracterizar ou qualificar o substantivo.","f":"Qual a função do adjetivo?"},{"b":"Verbo, adjetivo ou outro advérbio.","f":"O que o advérbio pode modificar?"},{"b":"Relacionar termos e introduzir complementos.","f":"Qual a função da preposição?"},{"b":"Ligar termos ou orações, estabelecendo relações.","f":"Qual a função da conjunção?"},{"b":"A mesma forma pode desempenhar funções gramaticais diferentes.","f":"Por que a classe de uma palavra depende do contexto?"},{"b":"Quando funciona como advérbio, com sentido de “um pouco”: meio cansada.","f":"Quando “meio” é invariável?"},{"b":"Quando acompanha substantivo como determinante: bastantes documentos.","f":"Quando “bastante” varia?"},{"b":"Pronome que retoma antecedente e introduz oração relativa.","f":"O que é pronome relativo?"}]','[{"a":true,"q":"O verbo pode expressar ação, estado, processo ou fenômeno.","why":"Esses são valores semânticos comuns do verbo."},{"a":false,"q":"A preposição liga necessariamente duas orações completas.","why":"A preposição relaciona termos; a conjunção pode ligar orações."},{"a":true,"q":"O advérbio pode modificar um adjetivo.","why":"Exemplo: muito importante."},{"a":true,"q":"A mesma palavra pode pertencer a classes diferentes conforme o contexto.","why":"O emprego determina a classificação."},{"a":true,"q":"O artigo acompanha o substantivo e pode determiná-lo.","why":"Essa é sua função típica."},{"a":false,"q":"Em “meio cansada”, a palavra “meio” deve obrigatoriamente ir para o feminino.","why":"Como advérbio com sentido de “um pouco”, permanece invariável."},{"a":true,"q":"Em “meia hora”, “meia” concorda com o substantivo feminino.","why":"É numeral/adjetivo com valor de metade."},{"a":false,"q":"Em “trabalhou bastante”, bastante funciona como adjetivo variável.","why":"Nesse contexto, modifica o verbo e é advérbio invariável."},{"a":true,"q":"Em “necessidade de apoio”, a palavra “de” é preposição.","why":"Relaciona o nome ao seu complemento."},{"a":true,"q":"“Que” pode exercer classes e funções diferentes conforme o contexto.","why":"Pode ser pronome relativo, interrogativo, conjunção, entre outros usos."}]'),
('pcac-2026-portugues-10-sintaxe-oracao-periodo','Sintaxe da oração e do período: sujeito, predicado, complementos, adjuntos, aposto, vocativo, coordenação, subordinação e pontuação.','# Aula 10 — Sintaxe: termos da oração e período simples e composto

## 1. Oração, frase e período
Frase é enunciado com sentido comunicativo, com ou sem verbo. Oração organiza-se em torno de verbo ou locução verbal. Período é frase organizada em uma ou mais orações:
- período simples: uma oração;
- período composto: duas ou mais orações.

Exemplo: “A equipe chegou.” (uma oração). “A equipe chegou e iniciou a análise.” (duas orações).

## 2. Sujeito e predicado
Sujeito é o termo com que o verbo concorda, em regra; predicado é aquilo que se declara sobre o sujeito.
- simples: um núcleo — “O investigador chegou”.
- composto: mais de um núcleo — “O investigador e a perita chegaram”.
- oculto/desinencial: identificado pela terminação ou contexto — “Chegamos cedo” (nós).
- indeterminado: não se identifica ou não se quer identificar — “Disseram que haverá mudança”; “Precisa-se de servidores”.
- inexistente: oração sem sujeito, como “Há documentos” (existir) e “Faz dois anos”.

## 3. Predicação verbal e complementos
Verbo intransitivo não exige complemento. Verbo transitivo direto exige objeto direto; transitivo indireto exige objeto indireto com preposição; transitivo direto e indireto admite dois complementos. Verbo de ligação conecta sujeito a predicativo.

Exemplos:
- “A equipe chegou.” — chegar, nesse uso, intransitivo.
- “A equipe analisou o relatório.” — objeto direto.
- “A equipe precisa de apoio.” — objeto indireto.
- “A equipe entregou o relatório ao delegado.” — objeto direto + indireto.
- “A equipe permaneceu atenta.” — verbo de ligação + predicativo.

## 4. Outros termos
- **Complemento nominal:** completa sentido de substantivo, adjetivo ou advérbio, normalmente com preposição.
- **Adjunto adnominal:** determina ou caracteriza substantivo.
- **Adjunto adverbial:** indica circunstância (tempo, lugar, modo, causa etc.).
- **Aposto:** explica, resume ou especifica outro termo.
- **Vocativo:** chama o interlocutor e não é sujeito.

Compare: “A análise do perito foi cuidadosa” (do perito pode indicar agente/adjunto adnominal conforme o contexto); “A análise dos documentos foi demorada” (dos documentos completa o nome análise, com valor de alvo/paciente, complemento nominal).

## 5. Coordenação e subordinação
Orações coordenadas são sintaticamente independentes, embora possam ter relação de sentido. Podem ser assindéticas (sem conjunção) ou sindéticas (com conjunção): aditivas, adversativas, alternativas, conclusivas e explicativas.

Orações subordinadas exercem função em relação a outra oração. Podem ser substantivas, adjetivas ou adverbiais. Adjetivas restritivas delimitam o antecedente sem vírgulas; explicativas acrescentam informação e são isoladas por vírgulas.

## 6. Pontuação e sintaxe
Não separe sujeito e verbo ou verbo e complemento por vírgula sem intercalação ou estrutura que justifique. Vocativo e aposto explicativo costumam ser isolados por vírgulas. Orações adjetivas podem mudar de sentido conforme a pontuação.

## 7. Método de análise
1. Localize os verbos e locuções.
2. Conte as orações.
3. Identifique sujeito e núcleo.
4. Examine a predicação e os complementos.
5. Separe termos integrantes e acessórios.
6. Classifique relações entre orações.
7. Confira pontuação e sentido.

## Revisão
Oração gira em torno de verbo. Sujeito e predicado formam a estrutura central. Objetos completam verbos; complemento nominal completa nome; adjuntos acrescentam circunstâncias ou características. Coordenação liga orações independentes; subordinação cria dependência sintática.','[{"b":"Enunciado organizado em torno de verbo ou locução verbal.","f":"O que é oração?"},{"b":"Período com uma única oração.","f":"O que é período simples?"},{"b":"Período com duas ou mais orações.","f":"O que é período composto?"},{"b":"Sujeito com um núcleo.","f":"O que é sujeito simples?"},{"b":"Sujeito com dois ou mais núcleos.","f":"O que é sujeito composto?"},{"b":"Complemento verbal sem preposição exigida.","f":"O que é objeto direto?"},{"b":"Complemento verbal introduzido por preposição exigida.","f":"O que é objeto indireto?"},{"b":"Termo que completa o sentido de substantivo, adjetivo ou advérbio.","f":"O que é complemento nominal?"},{"b":"Coordenadas são sintaticamente independentes; subordinadas exercem função em relação a outra oração.","f":"Qual a diferença entre coordenação e subordinação?"},{"b":"Termo usado para chamar o interlocutor, sem função de sujeito.","f":"O que é vocativo?"}]','[{"a":true,"q":"O número de orações relaciona-se à quantidade de verbos ou locuções verbais.","why":"Cada oração organiza-se em torno de verbo ou locução."},{"a":false,"q":"Período simples possui duas ou mais orações.","why":"Período simples tem uma oração."},{"a":true,"q":"Em “A equipe analisou o relatório”, “o relatório” é objeto direto.","why":"Completa o verbo sem preposição exigida."},{"a":true,"q":"Em “A equipe precisa de apoio”, “de apoio” é objeto indireto.","why":"O verbo precisar rege a preposição de."},{"a":false,"q":"Vocativo exerce a função de sujeito da oração.","why":"Vocativo chama o interlocutor e fica fora da estrutura sujeito-predicado."},{"a":true,"q":"Orações subordinadas exercem função sintática em relação a outra oração.","why":"Essa é a característica da subordinação."},{"a":false,"q":"Toda oração coordenada precisa ser introduzida por conjunção.","why":"Pode ser assindética, sem conjunção."},{"a":true,"q":"A oração adjetiva restritiva delimita o antecedente e normalmente não é isolada por vírgulas.","why":"A ausência de vírgulas marca a restrição."},{"a":true,"q":"Aposto pode explicar ou especificar outro termo.","why":"É uma função explicativa ou especificadora."},{"a":false,"q":"A vírgula pode separar livremente o sujeito do verbo.","why":"A separação é inadequada sem justificativa sintática."}]'),
('pcac-2026-portugues-11-concordancia-verbal-nominal','Concordância verbal e nominal, núcleo do sujeito, sujeito composto, verbos impessoais, expressões partitivas, porcentagem e casos especiais.','# Aula 11 — Concordância verbal e nominal

## 1. Regra geral da concordância verbal
O verbo concorda, em regra, com o núcleo do sujeito em pessoa e número. Não se deixe enganar por palavras entre o sujeito e o verbo.

Exemplo: “A equipe de investigadores chegou.” O núcleo é “equipe” (singular), não “investigadores”. Em “Os relatórios da equipe chegaram”, o núcleo é “relatórios” (plural).

## 2. Sujeito simples e composto
Com sujeito simples, o verbo concorda com seu núcleo. Com sujeito composto anteposto, normalmente vai ao plural: “O delegado e a perita chegaram”.

Com sujeito composto posposto, pode haver concordância com o conjunto ou com o núcleo mais próximo, conforme a estrutura e as regras normativas. Em prova, leia a frase inteira e identifique a posição do sujeito.

## 3. Verbos impessoais
Verbos impessoais ficam na terceira pessoa do singular:
- haver no sentido de existir: “Havia documentos”; “Pode haver provas”.
- fazer indicando tempo decorrido ou fenômeno climático: “Faz dois anos”; “Fazia dias frios”.
- verbos que indicam fenômenos da natureza em sentido próprio: “Choveu durante a noite”.

Atenção: “existir” é pessoal e concorda: “Existiam documentos”. Não transfira a impessoalidade de haver para existir.

## 4. Expressões partitivas e coletivas
Construções como “a maioria de”, “grande parte de” e “um grupo de” podem admitir concordância com o núcleo singular ou, em certos contextos, com o termo plural que especifica o conjunto. Observe a ênfase: conjunto ou indivíduos.

Exemplo: “A maioria dos servidores compareceu” (núcleo maioria) / “A maioria dos servidores compareceram” (concordância atrativa, conforme o contexto e a norma admitida).

## 5. Porcentagem e numerais
Com porcentagem, a concordância pode seguir o número percentual ou o termo especificador: “1% faltou”; “30% faltaram”. Se houver expressão especificadora, ela pode influenciar a concordância conforme a construção. Analise o enunciado específico.

## 6. Concordância nominal
Artigos, adjetivos, pronomes e numerais concordam com o substantivo a que se referem. Exemplo: “As diligências necessárias foram realizadas”.

Atenção a:
- anexo/incluso/obrigado: variam quando adjetivos (“documentos anexos”; “muito obrigada”);
- quite: “estou quite”; “estamos quites”;
- meio: numeral variável (“meia hora”); advérbio invariável (“meio cansada”);
- bastante: variável quando acompanha substantivo (“bastantes documentos”); invariável como advérbio (“trabalhou bastante”);
- é proibido/necessário/bom: sem artigo, pode ficar invariável (“É proibido entrada”); com artigo, concorda (“É proibida a entrada”).

## 7. Método de prova
1. Encontre o verbo.
2. Pergunte quem é o sujeito.
3. Localize o núcleo, não o termo mais próximo.
4. Identifique verbos impessoais.
5. Em concordância nominal, descubra qual substantivo o termo acompanha.
6. Confira se palavras como meio e bastante são adjetivos/numerais ou advérbios.

## Revisão
Verbo concorda com o núcleo do sujeito. Haver = existir e fazer = tempo são impessoais. Adjetivos e determinantes concordam com o substantivo, mas advérbios permanecem invariáveis.','[{"b":"Com o núcleo do sujeito em pessoa e número.","f":"Com quem o verbo concorda, em regra?"},{"b":"Na terceira pessoa do singular: havia documentos.","f":"Como fica haver no sentido de existir?"},{"b":"É pessoal e concorda: existiam documentos.","f":"Como fica existir?"},{"b":"Na terceira pessoa do singular: faz dois anos.","f":"Como fica fazer indicando tempo decorrido?"},{"b":"Singular, pois o núcleo do sujeito é equipe.","f":"Qual a concordância em “A equipe de investigadores chegou”?"},{"b":"Quando é advérbio com sentido de um pouco: meio cansada.","f":"Quando “meio” é invariável?"},{"b":"Quando acompanha substantivo: bastantes documentos.","f":"Quando “bastante” varia?"},{"b":"É proibida a entrada.","f":"Como se escreve com artigo em “entrada”?"},{"b":"Com o núcleo singular ou, em certos contextos, por atração com o termo plural.","f":"Como pode ocorrer concordância com expressão partitiva?"},{"b":"Identificar o núcleo do sujeito, sem concordar com um termo interveniente.","f":"Qual o cuidado com sujeito distante do verbo?"}]','[{"a":true,"q":"O verbo concorda, em regra, com o núcleo do sujeito.","why":"É a regra geral."},{"a":false,"q":"“Haviam muitos documentos” está correto quando haver significa existir.","why":"Haver impessoal permanece no singular: havia documentos."},{"a":true,"q":"“Existiam documentos” está correto.","why":"Existir é verbo pessoal e concorda com documentos."},{"a":true,"q":"“Faz dois anos” é a forma padrão para tempo decorrido.","why":"Fazer é impessoal nesse uso."},{"a":false,"q":"Em “A equipe de investigadores chegaram”, o verbo deve concordar obrigatoriamente com investigadores.","why":"O núcleo do sujeito é equipe; a concordância padrão é singular."},{"a":true,"q":"Em “meio cansada”, meio é advérbio e permanece invariável.","why":"Significa um pouco."},{"a":true,"q":"Em “bastantes documentos”, bastante acompanha substantivo e varia.","why":"É determinante/pronome indefinido com valor de quantidade."},{"a":false,"q":"“É proibida entrada” é a única forma correta, sem artigo.","why":"Sem artigo, a expressão pode ficar invariável: é proibido entrada."},{"a":true,"q":"Em “É proibida a entrada”, o adjetivo concorda com entrada.","why":"O artigo definido acompanha o substantivo."},{"a":false,"q":"Todo verbo impessoal concorda com o plural que aparece depois dele.","why":"Verbos impessoais ficam na terceira pessoa do singular."}]'),
('pcac-2026-portugues-12-regencia-pronomes-crase','Regência verbal e nominal, colocação pronominal, próclise, ênclise, mesóclise e crase: revisão integrada com exemplos e testes.','# Aula 12 — Regência, colocação pronominal e crase

## 1. Regência: termo regente e complemento
Regência é a relação entre um termo e seu complemento. O termo regente pode exigir preposição ou ligar-se diretamente ao complemento. A preposição depende do verbo, do nome e do sentido empregado.

Casos frequentes:
- assistir a = ver/presenciar: assistir ao filme; assistir à audiência;
- assistir alguém = prestar assistência: assistir o paciente;
- aspirar a = desejar: aspirar ao cargo; aspirar algo = sorver: aspirar o ar;
- visar a = almejar: visar ao cargo; visar algo = mirar ou pôr visto: visar o documento;
- obedecer/desobedecer a: obedecer à norma;
- preferir uma coisa a outra: prefiro café a chá;
- implicar algo = acarretar, sem preposição: a medida implica mudanças;
- gostar de, necessitar de, simpatizar com.

## 2. Regência nominal
Nomes também podem exigir preposição:
- favorável a; contrário a; apto a/para;
- compatível com; responsável por;
- necessidade de; respeito a/por;
- acesso a; obediência a.

Exemplo: “A medida é favorável à investigação”: favorável rege a e investigação admite artigo feminino.

## 3. Colocação pronominal
- **Próclise:** pronome antes do verbo: “Não me avisaram”.
- **Ênclise:** pronome depois do verbo: “Avisaram-me”.
- **Mesóclise:** pronome no interior da forma verbal: “Avisar-me-ão”.

Fatores de atração da próclise incluem palavras negativas (não, nunca), pronomes relativos (que, quem), conjunções subordinativas (quando, embora, se), advérbios sem pausa e expressões interrogativas. Havendo atrator, a próclise prevalece.

Na norma-padrão tradicional, evita-se iniciar oração formal com pronome átono: “Informaram-me”. A mesóclise aparece com futuro do presente ou futuro do pretérito, sem atrator: “Dar-lhe-ei resposta”. Com negação: “Não lhe darei resposta”.

## 4. Crase
Crase é a fusão da preposição a com artigo feminino a/as ou certos pronomes demonstrativos iniciados por a: à, às, àquele, àquela, àquilo.

Regra prática: confirme se o termo anterior exige preposição a e se o termo seguinte admite artigo feminino. Teste masculino: “obedeceu ao regulamento” → “obedeceu à norma”.

Não ocorre, em regra, antes de verbo, palavra masculina, pronomes pessoais e expressões repetidas: a estudar, a pé, a ela, frente a frente. Ocorre em locuções femininas e horas determinadas: à noite, às 8h. Pode ser facultativa antes de possessivo feminino singular e nome próprio feminino, conforme o uso do artigo.

## 5. Método integrado de prova
1. Identifique o termo regente e o sentido.
2. Determine a preposição exigida.
3. Verifique o fator de atração pronominal.
4. Se houver substantivo feminino iniciado por a, teste artigo e preposição.
5. Não confunda letra “a” com crase: o acento depende da fusão.

## Revisão
Regência define a preposição; colocação define a posição do pronome; crase marca a fusão de dois sons/letras a. Analise cada fenômeno na frase concreta.','[{"b":"Relação entre termo regente e complemento, com ou sem preposição.","f":"O que é regência?"},{"b":"Assistir a algo: assistir ao filme ou à audiência.","f":"No sentido de ver, qual a regência de assistir?"},{"b":"Preferir uma coisa a outra.","f":"Qual a construção padrão de preferir?"},{"b":"Pronome oblíquo átono antes do verbo.","f":"O que é próclise?"},{"b":"Pronome oblíquo átono depois do verbo.","f":"O que é ênclise?"},{"b":"Com futuro do presente ou do pretérito, sem fator de atração.","f":"Quando ocorre mesóclise?"},{"b":"Preposição a exigida pelo termo anterior mais artigo feminino ou pronome iniciado por a.","f":"Qual a condição básica para ocorrer crase?"},{"b":"Em regra, não.","f":"Há crase antes de verbo?"},{"b":"Substituir o termo feminino por masculino e verificar se aparece ao.","f":"Qual teste ajuda a verificar crase?"},{"b":"Identificar regência, procurar atrator e verificar a fusão de preposição com artigo/pronome.","f":"Qual a sequência para analisar regência, pronome e crase?"}]','[{"a":true,"q":"No sentido de presenciar, assistir rege a preposição a.","why":"Exemplo: assistir ao filme."},{"a":false,"q":"No sentido de prestar assistência, assistir é obrigatoriamente transitivo indireto.","why":"Nesse sentido, é transitivo direto: assistir o paciente."},{"a":true,"q":"“Prefiro café a chá” segue a construção padrão de preferir.","why":"Preferir uma coisa a outra."},{"a":false,"q":"Próclise é a colocação do pronome depois do verbo.","why":"Próclise é antes; ênclise é depois."},{"a":true,"q":"Palavra negativa como não favorece próclise.","why":"Exemplo: não me avisaram."},{"a":true,"q":"Mesóclise pode ocorrer em “dar-lhe-ei resposta”.","why":"Futuro sem fator de atração."},{"a":false,"q":"Em “não dir-lhe-ei”, a colocação é adequada.","why":"A palavra negativa atrai: não lhe direi."},{"a":true,"q":"Em “obedecer à norma”, a crase resulta de preposição e artigo.","why":"Obedecer rege a e norma admite artigo."},{"a":false,"q":"Há crase antes de qualquer verbo iniciado por a.","why":"Verbos não admitem artigo feminino nessa construção."},{"a":true,"q":"O teste do masculino pode ajudar a verificar crase.","why":"Se aparecer ao, normalmente haverá à no feminino."}]'),
('pcac-2026-portugues-13-variacao-figuras-linguagem-tecnologia','Variação linguística, norma-padrão, figuras de linguagem, gêneros digitais, multimodalidade, hipertexto e leitura crítica de IA.','# Aula 13 — Variação linguística, figuras de linguagem e linguagem digital

## 1. Variação linguística
A língua varia conforme região, grupo social, época, situação comunicativa e modalidade. Variação não significa automaticamente erro ou incapacidade.
- diatópica: geográfica/regional;
- diastrática: social;
- diacrônica: histórica;
- diafásica: situacional, conforme contexto e formalidade;
- diamésica: modalidade e meio, como fala e escrita.

A norma-padrão é referência para usos formais e institucionais, mas não representa todas as formas reais de falar. A adequação depende do gênero, interlocutor, objetivo e canal.

## 2. Preconceito linguístico
Ridicularizar uma pessoa ou comunidade por sua variedade linguística é preconceito linguístico. Em concurso, diferencie a exigência da norma-padrão em um ofício da avaliação científica de variedades: uma forma pode ser adequada em conversa informal e inadequada em documento oficial.

## 3. Figuras de linguagem
- metáfora: associação implícita — “a investigação é um labirinto”;
- comparação: aproximação explícita — “correu como o vento”;
- metonímia: substituição por proximidade — “li Machado de Assis” (a obra);
- personificação: característica humana a ser não humano — “a cidade acordou”;
- hipérbole: exagero — “esperei uma eternidade”;
- eufemismo: suavização — “faltou com a verdade”;
- ironia: sentido pretendido contrasta com o literal;
- antítese: aproximação de opostos — claro/escuro;
- paradoxo: associação aparentemente contraditória — “silêncio ensurdecedor”.

## 4. Gêneros digitais
E-mail, mensagem instantânea, comentário, postagem, fórum, formulário eletrônico e videoconferência têm propósitos e graus de formalidade diferentes. A escrita digital pode usar abreviações, emojis, hashtags, memes e links, mas a escolha depende do contexto. Em comunicação institucional, clareza, registro e segurança são essenciais.

## 5. Multimodalidade e hipertexto
Multimodalidade combina texto, imagem, áudio, vídeo, ícones e outros modos de expressão. Hipertexto organiza informações por links, permitindo percursos não lineares. Um link amplia a navegação, mas não comprova confiabilidade.

## 6. Linguagem e inteligência artificial
Ferramentas de IA podem apoiar revisão, tradução e síntese, mas o usuário deve conferir precisão, autoria, contexto, vieses, privacidade e fonte. Fluência textual não garante veracidade.

## Estratégia de prova
Identifique o efeito de sentido da figura, a variedade linguística e o contexto de comunicação. Em ambiente digital, observe multimodalidade, hipertexto e adequação ao gênero.

## Revisão
Variação é natural; adequação depende do contexto. Metáfora aproxima implicitamente; comparação explicita; hipérbole exagera; ironia depende do contexto. Hipertexto usa links; multimodalidade combina modos de expressão.','[{"b":"Variação geográfica ou regional.","f":"O que é variação diatópica?"},{"b":"Variação associada a grupos sociais.","f":"O que é variação diastrática?"},{"b":"Variação conforme situação, interlocutor e formalidade.","f":"O que é variação diafásica?"},{"b":"Desqualificar variedades e falantes por sua origem ou condição social.","f":"O que é preconceito linguístico?"},{"b":"Associação implícita entre sentidos.","f":"O que é metáfora?"},{"b":"Exagero intencional com efeito expressivo.","f":"O que é hipérbole?"},{"b":"Antítese aproxima ideias opostas; paradoxo combina ideias aparentemente contraditórias.","f":"Qual a diferença entre antítese e paradoxo?"},{"b":"Combinação de texto, imagem, áudio, vídeo e outros modos.","f":"O que é multimodalidade?"},{"b":"Organização não linear de informações conectadas por links.","f":"O que é hipertexto?"},{"b":"Não. É necessário conferir precisão, contexto, vieses, privacidade e fontes.","f":"O uso de IA dispensa revisão?"}]','[{"a":true,"q":"Diferenças regionais são exemplo de variação diatópica.","why":"Diatópica é geográfica."},{"a":true,"q":"Variação histórica é chamada de diacrônica.","why":"Refere-se a mudanças ao longo do tempo."},{"a":false,"q":"A norma-padrão representa todas as formas usadas pelos falantes.","why":"É referência convencional para determinados contextos."},{"a":true,"q":"Uma gíria pode ser adequada em conversa informal e inadequada em ofício.","why":"A adequação depende da situação."},{"a":true,"q":"“A cidade acordou” pode ser personificação.","why":"A cidade recebe ação humana."},{"a":false,"q":"Antítese e paradoxo são sinônimos perfeitos.","why":"Antítese aproxima opostos; paradoxo apresenta contradição aparente."},{"a":true,"q":"Hipertexto permite percursos não lineares por links.","why":"Os links conectam blocos de informação."},{"a":true,"q":"Multimodalidade combina diferentes modos de expressão.","why":"Pode combinar texto, imagem, áudio e vídeo."},{"a":false,"q":"A presença de link comprova a veracidade do conteúdo.","why":"É necessário avaliar autoria, fonte e evidências."},{"a":false,"q":"Texto produzido com apoio de IA dispensa verificação.","why":"A revisão crítica continua necessária."}]'),
('pcac-2026-portugues-colocacao-pronominal','Colocação pronominal: próclise, ênclise, mesóclise, fatores de atração, início de oração, locuções verbais, imperativo e pegadinhas.','# Aula complementar — Colocação pronominal

## 1. Os três posicionamentos
- **Próclise:** pronome antes do verbo — “Não me avisaram”.
- **Ênclise:** pronome depois do verbo, ligado por hífen — “Avisaram-me”.
- **Mesóclise:** pronome no interior do verbo — “Avisar-me-ão”.

Os pronomes oblíquos átonos incluem me, te, se, o(s), a(s), lhe(s), nos e vos.

## 2. Fatores de atração da próclise
A próclise é exigida ou favorecida por elementos atrativos:
- palavras negativas: não, nunca, jamais, ninguém;
- pronomes relativos: que, quem, cujo, onde;
- conjunções subordinativas: quando, porque, embora, se;
- pronomes indefinidos e demonstrativos, conforme o contexto;
- advérbios sem pausa: aqui se trabalha; talvez me chamem;
- frases interrogativas, exclamativas e optativas: Quem te contou? Como se enganou!

Exemplo: “Ninguém me informou.” O pronome vem antes do verbo por atração de “ninguém”.

## 3. Ênclise
Na norma-padrão tradicional, evita-se iniciar oração formal com pronome átono. Assim: “Informaram-me o resultado”. Também aparece com imperativo afirmativo: “Apresente-se”.

A ênclise não deve ser aplicada mecanicamente: verifique se existe palavra atrativa que exige próclise.

## 4. Mesóclise
Ocorre com futuro do presente ou futuro do pretérito quando não há fator de próclise: “Dar-lhe-ei resposta”; “Convidar-me-iam”. Havendo atrator, a próclise prevalece: “Não lhe darei resposta”.

## 5. Locuções verbais
Em locuções, a posição do pronome depende da estrutura e dos fatores de atração. Exemplos: “Quero apresentar-lhe o relatório” e “Não lhe quero apresentar o relatório”. Em prova, observe se o pronome está ligado ao auxiliar ou ao verbo principal e se há palavra atrativa.

## 6. Pegadinhas frequentes
- “Não se esqueça”: próclise por palavra negativa.
- “Quem te avisou?”: próclise por pronome interrogativo.
- “Apresente-se”: ênclise com imperativo afirmativo.
- “Dar-lhe-ei”: mesóclise no futuro sem atrator.
- “Nunca dir-lhe-ei”: inadequado na norma-padrão; “nunca” atrai: “Nunca lhe direi”.

## Método de resolução
1. Localize o pronome átono.
2. Identifique o verbo e a forma verbal.
3. Procure palavra atrativa.
4. Se houver futuro e nenhum atrator, avalie mesóclise.
5. Na ausência de atração, verifique a posição inicial da oração e a ênclise.
6. Confira a construção em locução verbal.

## Revisão
Próclise = antes; ênclise = depois; mesóclise = no meio. Palavra negativa, relativo, subordinativa e interrogativa costuma atrair próclise. Futuro sem atrator pode exigir mesóclise na norma tradicional.','[{"b":"Pronome oblíquo átono antes do verbo.","f":"O que é próclise?"},{"b":"Pronome oblíquo átono depois do verbo, ligado por hífen.","f":"O que é ênclise?"},{"b":"Pronome colocado no interior da forma verbal.","f":"O que é mesóclise?"},{"b":"A palavra negativa nunca.","f":"Qual elemento atrai em “Nunca me avisaram”?"},{"b":"Ênclise: “Informaram-me”.","f":"Qual colocação é tradicionalmente usada no início de oração formal sem atrator?"},{"b":"Com futuro do presente ou futuro do pretérito, sem fator de atração.","f":"Quando ocorre mesóclise?"},{"b":"A próclise prevalece: “Não lhe direi”.","f":"O que ocorre diante de palavra negativa?"},{"b":"Sim, em regra: “o documento que me enviaram”.","f":"Pronomes relativos atraem próclise?"},{"b":"Ênclise com imperativo afirmativo.","f":"Qual a colocação em “Apresente-se”?"},{"b":"A posição do pronome em relação ao auxiliar e ao verbo principal e a presença de atratores.","f":"O que verificar em locução verbal?"}]','[{"a":true,"q":"Em “Não se esqueça”, ocorre próclise por atração da palavra negativa.","why":"“Não” atrai o pronome."},{"a":true,"q":"“Apresente-se” exemplifica ênclise com imperativo afirmativo.","why":"O pronome vem depois do verbo."},{"a":false,"q":"A mesóclise é usada normalmente no presente do indicativo.","why":"É associada ao futuro do presente ou do pretérito, sem atrator."},{"a":false,"q":"Em “Nunca dir-lhe-ei”, a colocação está adequada.","why":"“Nunca” atrai: “Nunca lhe direi”."},{"a":true,"q":"Em “Quem te contou?”, o pronome interrogativo favorece próclise.","why":"A palavra interrogativa atrai o pronome."},{"a":true,"q":"“O relatório que me enviaram” apresenta próclise após pronome relativo.","why":"“Que” é fator atrativo."},{"a":false,"q":"A ênclise deve ser usada mesmo quando há palavra negativa antes do verbo.","why":"A palavra negativa favorece próclise."},{"a":true,"q":"“Dar-lhe-ei resposta” é exemplo de mesóclise.","why":"O pronome aparece no interior da forma verbal futura."},{"a":true,"q":"Na norma-padrão tradicional, evita-se iniciar oração formal com pronome átono.","why":"A construção costuma preferir ênclise nesse contexto."},{"a":false,"q":"Próclise significa colocar o pronome depois do verbo.","why":"Próclise é antes do verbo; ênclise é depois."}]'),
('pcac-2026-portugues-crase-emprego-casos','Crase: fusão de preposição e artigo/pronome, regra geral, locuções, horas, demonstrativos, proibições, facultatividade e testes.','# Aula complementar — Crase: emprego e casos especiais

## 1. Conceito
Crase é a fusão da preposição a com artigo feminino a/as ou com certos pronomes demonstrativos iniciados por a. O acento grave marca a fusão: à, às, àquele, àquela, àquilo.

## 2. Regra geral
Há crase quando:
1. o termo anterior exige preposição a; e
2. o termo seguinte admite artigo feminino a/as.

Exemplo: “O servidor obedeceu à norma.” Obedecer rege a; “a norma” admite artigo. Teste masculino: “obedeceu ao regulamento” → “obedeceu à norma”.

## 3. Casos comuns de crase obrigatória
- locuções femininas: à noite, às pressas, à medida que, à procura de;
- horas determinadas: às 8h, à uma hora (conforme o contexto);
- antes de aquele(s), aquela(s), aquilo, quando há preposição: referiu-se àquele fato;
- expressões com “à moda de”, mesmo com nome masculino subentendido: bife à Oswaldo Aranha.

## 4. Casos em que não ocorre
- antes de verbo: começou a estudar;
- antes de palavra masculina: a prazo, a pé;
- antes de pronome pessoal: a ela, a mim;
- antes de artigo indefinido: a uma pessoa;
- entre palavras repetidas: cara a cara, frente a frente;
- em regra, antes de nome de cidade que não admite artigo: vou a Brasília. Compare: vou à Bahia.

## 5. Casos facultativos
A crase pode ser facultativa:
- antes de pronome possessivo feminino singular: entreguei a/à minha colega;
- antes de nome próprio feminino, conforme o uso do artigo: referi-me a/à Ana;
- depois da preposição até: fui até a/à escola.

## 6. Crase e sentido
“À medida que” é locução conjuntiva proporcional. “A princípio” significa inicialmente; “em princípio” significa em tese. “Daqui a duas horas” indica tempo futuro e não leva crase. “Às duas horas” indica horário determinado.

## 7. Método prático
1. Descubra se o termo anterior exige preposição a.
2. Verifique se o termo seguinte admite artigo feminino.
3. Faça o teste do masculino (ao).
4. Confira se existe caso proibido ou facultativo.
5. Só então use o acento grave.

## Pegadinhas
- Palavra feminina não significa crase automática.
- Antes de verbo, não há crase.
- Horas determinadas normalmente recebem crase; tempo futuro com “daqui a” não.
- “Àquele” pode receber crase por fusão da preposição com o a inicial do demonstrativo.
- O teste do masculino é auxiliar; considere a regência e o contexto.

## Revisão
Crase depende de preposição mais artigo/pronome. Verifique regência, possibilidade de artigo e casos especiais.','[{"b":"Preposição a exigida pelo termo anterior + artigo feminino ou pronome demonstrativo iniciado por a.","f":"Qual é a condição básica para ocorrer crase?"},{"b":"Substituir por masculino e verificar se aparece ao.","f":"Qual teste ajuda a verificar crase antes de substantivo feminino?"},{"b":"Não, em regra: começou a estudar.","f":"Há crase antes de verbo?"},{"b":"Às 8h.","f":"Como se escreve a indicação de hora determinada?"},{"b":"Não, pode ser facultativa.","f":"A crase antes de possessivo feminino singular é obrigatória?"},{"b":"À noite, às pressas, à medida que.","f":"Cite uma locução feminina com crase."},{"b":"Quando o termo anterior exige preposição a, que se funde ao a inicial do demonstrativo.","f":"Quando ocorre crase em “àquele”?"},{"b":"Não; é indicação de tempo futuro.","f":"Há crase em “daqui a duas horas”?"},{"b":"Não: cara a cara, frente a frente.","f":"Há crase entre palavras repetidas?"},{"b":"O nome da cidade, nesse uso, não admite artigo feminino.","f":"Por que “vou a Brasília” não leva crase em regra?"}]','[{"a":true,"q":"Em “obedecer à norma”, a crase resulta de preposição e artigo.","why":"Obedecer rege a e norma admite artigo."},{"a":false,"q":"Há crase obrigatória antes de qualquer palavra feminina.","why":"É necessário verificar regência e artigo."},{"a":false,"q":"A forma “começou à estudar” está correta.","why":"Não ocorre crase antes de verbo."},{"a":true,"q":"A indicação “às 8 horas” normalmente recebe crase.","why":"Trata-se de hora determinada."},{"a":false,"q":"A crase antes de possessivo feminino singular é sempre obrigatória.","why":"Pode ser facultativa."},{"a":true,"q":"Em “referiu-se àquele fato”, pode ocorrer crase.","why":"A preposição a se une ao a inicial do demonstrativo."},{"a":false,"q":"“Daqui às duas horas” é a forma padrão para indicar tempo futuro.","why":"O correto é “daqui a duas horas”, sem crase."},{"a":true,"q":"“À noite” é locução feminina com crase.","why":"A locução adverbial feminina exige o acento."},{"a":false,"q":"Há crase na expressão “frente à frente”.","why":"Palavras repetidas ficam separadas por a sem crase."},{"a":true,"q":"O teste do masculino é auxiliar para verificar a ocorrência de crase.","why":"A presença de ao no masculino pode indicar à no feminino."}]'),
('pcac-2026-portugues-figuras-linguagem','Figuras de palavra, pensamento, construção e som: metáfora, comparação, metonímia, catacrese, sinestesia, ironia, antítese, paradoxo e repetição.','# Aula complementar — Figuras de linguagem

## 1. Para que servem?
Figuras de linguagem são recursos que produzem efeitos expressivos, sonoros ou de organização. A interpretação depende do contexto: uma expressão pode ser literal em uma situação e figurada em outra.

## 2. Figuras de palavra ou sentido
- **Metáfora:** aproximação implícita — “A investigação é um labirinto”.
- **Comparação:** aproximação explícita — “A equipe avançou como uma máquina”.
- **Metonímia:** substituição por relação de proximidade — “Li Machado de Assis” (a obra do autor).
- **Catacrese:** expressão figurada incorporada ao uso — “pé da mesa”.
- **Sinestesia:** mistura de sensações — “voz doce”, combinando audição e paladar.

## 3. Figuras de pensamento
- **Personificação/prosopopeia:** atribui ação humana a ser não humano — “A cidade acordou”.
- **Hipérbole:** exagero intencional — “Esperei uma eternidade”.
- **Eufemismo:** suaviza expressão — “Faltou com a verdade”.
- **Ironia:** sentido pretendido contrasta com o literal — dizer “Que pontualidade!” a quem chegou muito atrasado.
- **Antítese:** aproxima ideias opostas — claro/escuro.
- **Paradoxo:** combina ideias aparentemente contraditórias — “silêncio ensurdecedor”.
- **Gradação:** sequência crescente ou decrescente — “sussurrou, falou, gritou”.

## 4. Figuras de construção ou sintaxe
- **Elipse:** omite termo recuperável.
- **Zeugma:** omite termo já mencionado.
- **Anáfora:** repete palavra/expressão no início de segmentos.
- **Hipérbato:** inverte a ordem direta.
- **Pleonasmo:** repetição expressiva ou redundante.
- **Assíndeto:** ausência de conjunções em sequência.
- **Polissíndeto:** repetição de conjunções.

## 5. Figuras sonoras
- aliteração: repetição de sons consonantais;
- assonância: repetição de sons vocálicos;
- onomatopeia: representação de ruídos por palavras, como “tic-tac” e “bum”.

## 6. Como diferenciar figuras parecidas
Metáfora não apresenta conectivo comparativo explícito; comparação normalmente apresenta “como”, “tal qual” etc. Antítese aproxima opostos; paradoxo reúne ideias aparentemente incompatíveis. Elipse omite termo recuperável; zeugma omite termo que já apareceu. Ironia depende de contexto e intenção.

## 7. Estratégia de prova
1. Leia a frase dentro do texto.
2. Identifique o efeito: comparação, exagero, suavização, oposição, repetição, omissão ou inversão.
3. Explique o sentido literal e o pretendido.
4. Não confunda a figura com a simples presença de uma palavra.

## Revisão
Reconheça o efeito produzido no contexto. A figura não é classificada por uma palavra isolada, mas pelo modo como o sentido foi construído.','[{"b":"Associação implícita entre termos por semelhança.","f":"O que é metáfora?"},{"b":"A comparação explicita a aproximação; a metáfora a faz implicitamente.","f":"Qual a diferença entre metáfora e comparação?"},{"b":"Substituição por relação de proximidade, como autor pela obra.","f":"O que é metonímia?"},{"b":"Uso figurado já incorporado à língua, como “pé da mesa”.","f":"O que é catacrese?"},{"b":"Combinação de sensações de campos sensoriais diferentes.","f":"O que é sinestesia?"},{"b":"Atribuição de ação ou característica humana a ser não humano.","f":"O que é personificação?"},{"b":"Exagero intencional com efeito expressivo.","f":"O que é hipérbole?"},{"b":"Antítese aproxima opostos; paradoxo associa ideias aparentemente contraditórias.","f":"Qual a diferença entre antítese e paradoxo?"},{"b":"Omissão de termo já mencionado anteriormente.","f":"O que é zeugma?"},{"b":"Aliteração repete sons consonantais; assonância repete sons vocálicos.","f":"Qual a diferença entre aliteração e assonância?"}]','[{"a":true,"q":"“A cidade acordou cedo” pode ser personificação.","why":"A cidade recebe ação de ser animado."},{"a":true,"q":"“Li Machado de Assis” pode ser metonímia.","why":"O autor é usado no lugar da obra."},{"a":false,"q":"Antítese e paradoxo são sinônimos perfeitos.","why":"Antítese aproxima opostos; paradoxo apresenta contradição aparente."},{"a":true,"q":"“Esperei uma eternidade” é hipérbole.","why":"Há exagero intencional."},{"a":true,"q":"A anáfora pode consistir na repetição no início de segmentos.","why":"A repetição cria ritmo e ênfase."},{"a":false,"q":"Catacrese é sempre uma comparação explícita.","why":"É uso figurado já incorporado ao uso comum."},{"a":true,"q":"“Voz doce” pode ser sinestesia.","why":"Mistura sensação auditiva e gustativa."},{"a":true,"q":"Zeugma é omissão de termo anteriormente expresso.","why":"É uma forma específica de elipse."},{"a":false,"q":"Assonância é repetição de sons consonantais.","why":"Assonância repete sons vocálicos; aliteração repete consonantais."},{"a":true,"q":"A ironia depende do contexto para que o sentido pretendido seja reconhecido.","why":"O sentido literal pode contrastar com a intenção comunicativa."}]'),
('pcac-2026-portugues-linguagem-digital-tecnologia','Comunicação digital, multimodalidade, hipertexto, gêneros eletrônicos, oralidade escrita, emojis, links, confiabilidade e leitura crítica.','# Aula complementar — Linguagem, comunicação digital e gêneros tecnológicos

## 1. Comunicação digital
A comunicação digital ocorre em ambientes eletrônicos e pode combinar texto, imagem, áudio, vídeo, ícones, links e recursos interativos. O sentido não depende apenas das palavras: layout, imagem, som, sequência e interação também comunicam.

## 2. Multimodalidade
Multimodalidade é a combinação de diferentes modos semióticos. Um aviso pode conter texto, pictograma, cor e áudio; uma postagem pode reunir legenda, fotografia, vídeo e hashtag. Cada modo acrescenta informação ou orienta a interpretação.

## 3. Hipertexto e hiperlink
Hipertexto é uma organização não linear de informações conectadas por links. O leitor pode escolher caminhos diferentes. Hiperlink é o elemento clicável que direciona para outra página, arquivo ou seção. Um link facilita acesso, mas não garante que a informação seja verdadeira.

## 4. Gêneros digitais
E-mail, mensagem instantânea, postagem, comentário, fórum, blog, formulário, videoconferência e documento colaborativo têm objetivos e interlocutores próprios. A formalidade deve se adequar à situação. Um e-mail oficial exige clareza, identificação e registro; uma conversa privada pode admitir abreviações.

## 5. Marcas da escrita digital
Abreviações, emojis, hashtags, memes, repetição de letras, pontuação expressiva e marcas de oralidade podem indicar emoção, ironia, ênfase ou pertencimento. O sentido do emoji depende do contexto e do grupo; não existe interpretação universal para todo uso.

## 6. Leitura crítica e confiabilidade
Antes de compartilhar conteúdo, verifique autoria, data, domínio, contexto, finalidade e evidências. Observe se o título corresponde ao conteúdo, se a imagem está fora de contexto e se há fonte primária. Mensagem encaminhada sem origem não deve ser tratada como confirmação.

## 7. Inteligência artificial e linguagem
IA pode apoiar revisão, tradução, resumo e geração de texto. Entretanto, fluência não garante precisão. Confira nomes, datas, leis, fontes, vieses, privacidade e adequação do registro. Em contexto institucional, o responsável pelo texto deve revisar o conteúdo antes de divulgá-lo.

## 8. Estratégia de prova
1. Identifique o gênero e sua finalidade.
2. Observe público, canal e grau de formalidade.
3. Reconheça elementos multimodais.
4. Diferencie hipertexto de hiperlink.
5. Avalie criticamente fonte e evidências.
6. Não confunda linguagem informal com ausência de regras: há convenções próprias de cada gênero.

## Revisão
Multimodalidade combina modos; hipertexto conecta informações por links; gênero digital tem público e finalidade. Link, imagem e texto não comprovam, por si sós, confiabilidade.','[{"b":"Combinação de texto, imagem, áudio, vídeo e outros modos de expressão.","f":"O que é multimodalidade?"},{"b":"Organização não linear de informações conectadas por links.","f":"O que é hipertexto?"},{"b":"Elemento clicável que direciona a outra página, arquivo ou seção.","f":"O que é hiperlink?"},{"b":"Não. É necessário avaliar fonte, autoria, data e evidências.","f":"Um link garante confiabilidade?"},{"b":"Objetivo, interlocutores, suporte, convenções e grau de formalidade.","f":"O que caracteriza um gênero digital?"},{"b":"Emoção, ironia, ênfase ou organização, conforme o contexto.","f":"O que podem indicar emojis?"},{"b":"Autoria, data, contexto, domínio, finalidade e evidências.","f":"O que verificar antes de compartilhar uma informação?"},{"b":"Não. O conteúdo precisa ser conferido.","f":"A fluência de um texto gerado por IA garante precisão?"},{"b":"Marcas da fala representadas na escrita, comuns em mensagens informais.","f":"O que é oralidade escrita?"},{"b":"Porque público, finalidade, canal e formalidade são diferentes.","f":"Por que a linguagem de um e-mail oficial difere de uma mensagem privada?"}]','[{"a":true,"q":"Hipertexto permite percursos não lineares por links.","why":"Links conectam blocos de informação."},{"a":true,"q":"Multimodalidade combina diferentes modos de expressão.","why":"Pode combinar texto, imagem, áudio e vídeo."},{"a":false,"q":"A presença de um link comprova a veracidade do conteúdo.","why":"A confiabilidade depende de fonte e evidências."},{"a":true,"q":"Emojis podem influenciar o tom de uma mensagem.","why":"Podem sinalizar emoção, ironia ou ênfase."},{"a":false,"q":"A linguagem de mensagem instantânea deve ser idêntica à de um ofício.","why":"A adequação depende do gênero e contexto."},{"a":true,"q":"Um hiperlink pode direcionar para uma página ou arquivo.","why":"Essa é sua função de navegação."},{"a":false,"q":"Uma mensagem encaminhada sem autoria é fonte suficiente para confirmar um fato.","why":"É necessário verificar origem e evidências."},{"a":true,"q":"Texto produzido com apoio de IA deve passar por revisão crítica.","why":"A fluência não garante precisão."},{"a":true,"q":"Uma postagem pode ser multimodal quando combina legenda, imagem e vídeo.","why":"Há vários modos de expressão."},{"a":false,"q":"A linguagem digital não possui convenções próprias.","why":"Cada gênero digital possui convenções e expectativas."}]'),
('pcac-2026-portugues-regencia-verbal-nominal','Regência verbal e nominal: transitividade, preposições exigidas, mudança de sentido, verbos frequentes, nomes regentes e relação com crase.','# Aula complementar — Regência verbal e nominal

## 1. Conceito
Regência é a relação entre termo regente e complemento. O regente pode ser verbo, substantivo, adjetivo ou advérbio. A regência define se o complemento se liga diretamente ou por preposição.

- transitivo direto: complemento sem preposição exigida;
- transitivo indireto: complemento com preposição exigida;
- transitivo direto e indireto: dois complementos;
- intransitivo: não exige complemento verbal.

## 2. Verbos que mudam de regência conforme o sentido
- **Assistir:** ver/presenciar = assistir a algo (assistir ao filme); prestar assistência = assistir alguém (assistir o paciente).
- **Aspirar:** desejar = aspirar a algo (aspirar ao cargo); sorver = aspirar algo (aspirar o ar).
- **Visar:** almejar = visar a algo (visar ao cargo); mirar/pôr visto = visar algo (visar o alvo, visar o documento).
- **Implicar:** acarretar = implicar algo (implica mudanças); antipatizar = implicar com alguém.
- **Proceder:** ter fundamento = proceder; dar início/realizar = proceder a algo (proceder à análise), conforme o sentido e a construção.
- **Esquecer/lembrar:** esquecer algo / esquecer-se de algo; lembrar algo / lembrar-se de algo.

## 3. Verbos e construções frequentes
- obedecer/desobedecer a: obedecer à norma;
- gostar de, necessitar de, depender de;
- simpatizar com, concordar com;
- preferir uma coisa a outra (evite “preferir mais... do que”);
- informar alguém de algo / informar algo a alguém;
- pagar algo a alguém; perdoar algo a alguém, conforme o complemento.

## 4. Regência nominal
Nomes também exigem preposição:
- acesso a; obediência a; respeito a/por;
- favorável a; contrário a; apto a/para;
- compatível com; responsável por;
- necessidade de; preferência por;
- consciente de; próximo de.

Exemplo: “A equipe estava consciente do risco.” O adjetivo consciente rege de.

## 5. Regência e crase
A crase pode ocorrer quando o termo regente exige a preposição a e o termo seguinte admite artigo feminino. “Obedecer à regra”: obedecer a + a regra. “Assistir à audiência”: assistir a + a audiência, no sentido de presenciar.

Não conclua que há crase apenas porque a palavra seguinte é feminina. Primeiro identifique a regência; depois verifique o artigo.

## 6. Como resolver
1. Identifique o termo regente.
2. Determine o sentido no contexto.
3. Localize o complemento.
4. Verifique se a preposição é exigida.
5. Confira se a construção é padrão.
6. Se houver termo feminino, avalie a crase.

## Revisão
A mesma forma verbal pode ter regências diferentes conforme o sentido. Memorize os casos frequentes, mas resolva pela relação construída na frase.','[{"b":"Relação entre verbo e complemento, com ou sem preposição.","f":"O que é regência verbal?"},{"b":"Assistir a algo: assistir ao filme.","f":"No sentido de presenciar, qual a regência de assistir?"},{"b":"Aspirar a = desejar; aspirar algo = sorver.","f":"Qual a diferença entre aspirar ao cargo e aspirar o ar?"},{"b":"Não. É transitivo direto: implica mudanças.","f":"No sentido de acarretar, implicar exige preposição?"},{"b":"Preferir uma coisa a outra.","f":"Qual a construção padrão de preferir?"},{"b":"Esquecer-se de algo.","f":"Como se constrói esquecer-se?"},{"b":"Relação de dependência entre nome e complemento, com preposição exigida.","f":"O que é regência nominal?"},{"b":"Favorável a; compatível com; responsável por.","f":"Cite três regências nominais comuns."},{"b":"Obedecer rege a e norma admite artigo feminino.","f":"Por que ocorre crase em obedecer à norma?"},{"b":"Identificar regente, sentido, complemento e preposição exigida.","f":"Qual a sequência para analisar regência?"}]','[{"a":true,"q":"No sentido de presenciar, assistir rege a preposição a.","why":"Exemplo: assistir ao filme."},{"a":false,"q":"No sentido de prestar assistência, assistir é transitivo indireto.","why":"Nesse sentido, é transitivo direto: assistir o paciente."},{"a":true,"q":"“Aspirar ao cargo” significa desejar o cargo.","why":"O verbo aspirar rege a nesse sentido."},{"a":false,"q":"No sentido de acarretar, implicar exige a preposição em.","why":"É transitivo direto: implica mudanças."},{"a":true,"q":"Na norma-padrão, prefere-se “prefiro café a chá”.","why":"Preferir estabelece relação entre dois termos com a preposição a."},{"a":true,"q":"“Esquecer-se do documento” apresenta a preposição de exigida pela construção pronominal.","why":"Esquecer-se rege de."},{"a":false,"q":"Regência nominal diz respeito apenas a verbos.","why":"Também substantivos, adjetivos e advérbios podem reger complementos."},{"a":true,"q":"“Favorável à proposta” pode apresentar crase pela regência nominal.","why":"Favorável rege a e proposta admite artigo feminino."},{"a":false,"q":"A regência deve ser analisada sem considerar o sentido do verbo.","why":"O mesmo verbo pode apresentar regências distintas conforme o sentido."},{"a":true,"q":"A identificação da regência pode ajudar a decidir se há crase.","why":"A preposição exigida pelo termo regente é uma das condições para a fusão."}]'),
('pcac-2026-portugues-variacao-linguistica-registros','Variação diatópica, diastrática, diacrônica e diafásica; fala e escrita; norma-padrão; adequação, preconceito linguístico e registro formal.','# Aula complementar — Variação linguística, norma-padrão e adequação

## 1. Língua como fenômeno social
A língua é viva e varia conforme região, grupo social, época, situação comunicativa e modalidade. A variação não significa, por si só, erro ou incapacidade. Os falantes ajustam suas escolhas às comunidades e aos contextos em que interagem.

## 2. Tipos de variação
- **Diatópica/geográfica:** diferenças regionais de pronúncia, vocabulário e construções.
- **Diastrática/social:** diferenças associadas a grupos, profissão, escolaridade, idade e redes sociais.
- **Diacrônica/histórica:** mudanças ao longo do tempo.
- **Diafásica/situacional:** escolha do registro conforme interlocutor, finalidade e formalidade.
- **Diamésica/modalidade:** diferenças entre fala, escrita e meios de comunicação.

## 3. Norma-padrão e norma culta
A norma-padrão é uma referência convencional para usos formais e institucionais. A norma culta está relacionada a usos de falantes escolarizados em situações monitoradas. Os termos não devem ser tratados como sinônimos absolutos em toda abordagem. A prova pode exigir a norma-padrão em redação oficial, mas a análise linguística deve reconhecer a diversidade real.

## 4. Adequação linguística
A adequação considera:
- quem fala e para quem;
- qual é o objetivo;
- qual gênero está sendo produzido;
- qual canal será utilizado;
- qual grau de formalidade é esperado.

Uma gíria pode ser adequada entre amigos e inadequada em um relatório. Isso não significa que a gíria seja defeito em qualquer situação; significa que o registro deve corresponder ao contexto.

## 5. Oralidade e escrita
A fala costuma contar com entonação, gestos, pausas e interação imediata. A escrita exige maior explicitação de referências e organização, embora mensagens digitais aproximem recursos de fala e escrita. A diferença não é absoluta: há fala formal e escrita informal.

## 6. Preconceito linguístico
Ocorre quando uma variedade ou seus falantes são desqualificados por origem, região, classe ou grupo. A avaliação escolar da adequação à norma-padrão não autoriza discriminar pessoas por sua forma de falar.

## 7. Como cai em prova
- identificar regionalismos e gírias;
- reconhecer formalidade e informalidade;
- classificar tipos de variação;
- distinguir fala e escrita;
- avaliar adequação ao gênero e interlocutor;
- reconhecer preconceito linguístico.

## Revisão
Diatópica = região; diastrática = grupo social; diacrônica = tempo; diafásica = situação; diamésica = modalidade/meio. Norma-padrão é referência para contextos formais. Adequação depende do contexto, não de uma suposta superioridade de uma comunidade.','[{"b":"Variação geográfica ou regional.","f":"O que é variação diatópica?"},{"b":"Variação associada a grupos sociais, profissão, escolaridade ou idade.","f":"O que é variação diastrática?"},{"b":"Variação histórica, observada ao longo do tempo.","f":"O que é variação diacrônica?"},{"b":"Variação conforme situação, interlocutor e formalidade.","f":"O que é variação diafásica?"},{"b":"Diferença associada à modalidade ou meio, como fala e escrita.","f":"O que é variação diamésica?"},{"b":"Não. É referência convencional para determinados usos formais.","f":"Norma-padrão é sinônimo de toda a língua?"},{"b":"Escolha do registro conforme público, objetivo, gênero e canal.","f":"O que é adequação linguística?"},{"b":"Desqualificação de variedades e falantes por origem ou condição social.","f":"O que é preconceito linguístico?"},{"b":"Não. Há fala formal e escrita informal.","f":"Fala é sempre informal e escrita sempre formal?"},{"b":"Diafásica depende da situação; diastrática relaciona-se a grupos sociais.","f":"Como diferenciar variação diafásica e diastrática?"}]','[{"a":true,"q":"Diferenças regionais são exemplo de variação diatópica.","why":"Diatópica é geográfica."},{"a":true,"q":"Variação histórica é chamada de diacrônica.","why":"Refere-se a mudanças ao longo do tempo."},{"a":false,"q":"A norma-padrão representa todas as formas usadas pelos falantes.","why":"É referência convencional para usos formais."},{"a":true,"q":"Uma gíria pode ser adequada em conversa informal e inadequada em ofício.","why":"A adequação depende do contexto."},{"a":false,"q":"Toda variação linguística constitui erro gramatical.","why":"A variação é fenômeno natural da língua."},{"a":true,"q":"A variação diastrática pode estar associada a grupos profissionais.","why":"É variação social."},{"a":false,"q":"A variação diafásica é determinada exclusivamente pela região geográfica.","why":"Ela depende da situação comunicativa."},{"a":true,"q":"A fala pode ser formal, assim como a escrita pode ser informal.","why":"Modalidade não determina sozinha o grau de formalidade."},{"a":true,"q":"Preconceito linguístico ocorre quando falantes são desqualificados por sua variedade.","why":"É uma forma de discriminação social."},{"a":true,"q":"A adequação linguística considera interlocutor, objetivo e gênero textual.","why":"Esses fatores orientam a escolha do registro."}]')
  ) AS v(slug, summary, body_md, flashcards, quiz)
  WHERE m.slug = v.slug
    AND m.discipline = 'Língua Portuguesa'
    AND m.content_status = 'active';

  GET DIAGNOSTICS changed_count = ROW_COUNT;
  IF changed_count <> 19 THEN
    RAISE EXCEPTION 'Esperados 19 materiais ativos de Língua Portuguesa; atualizados: %', changed_count;
  END IF;
END
$pcac_portugues$;
