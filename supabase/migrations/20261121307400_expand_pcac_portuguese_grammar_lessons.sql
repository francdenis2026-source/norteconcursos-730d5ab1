-- Ampliação didática de Língua Portuguesa — PC-AC 2026.
-- Atualiza cinco aulas existentes com explicações e resolução comentada.
update public.study_materials as m
set summary = v.summary, body_md = v.body_md, updated_at = now()
from (values
('pcac-2026-portugues-08-morfologia-formacao-palavras','Aprofunda estrutura mórfica, radical, afixos, desinências, vogal temática, derivação, composição, parassíntese, conversão e método de identificação em questões.','# Morfologia, estrutura e formação de palavras

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> A palavra “infeliz” foi formada por:
>
> A) composição por justaposição. B) derivação prefixal. C) derivação sufixal. D) derivação parassintética. E) abreviação.
>
> **Resolução:** a palavra “feliz” recebeu o prefixo “in-”, que indica negação. O acréscimo ocorre antes da base: derivação prefixal. Gabarito: **B**.

## 1. O que a Morfologia estuda?
A Morfologia analisa a estrutura, a formação e a classificação das palavras. Em concurso, a banca costuma pedir identificação de radical, prefixo, sufixo, desinência, derivação e composição.

Pense na palavra como uma construção: algumas partes carregam o sentido principal; outras acrescentam negação, intensidade, gênero, número, tempo ou pessoa.

## 2. Elementos mórficos
- **Radical:** núcleo de significado comum a palavras da mesma família. Ex.: pedr- em pedra, pedreiro, pedregulho.
- **Prefixo:** elemento antes do radical. Ex.: in-feliz, re-fazer.
- **Sufixo:** elemento depois do radical. Ex.: feliz-mente, pedr-eiro.
- **Desinência nominal:** marca flexões de gênero e número, conforme a palavra.
- **Desinência verbal:** marca pessoa, número, tempo e modo.
- **Vogal temática:** liga o radical às terminações verbais e ajuda a identificar a conjugação.

Exemplo: em “cantávamos”, cant- é o radical; -a- é vogal temática; -va- indica tempo/modo; -mos indica pessoa/número na análise tradicional.

## 3. Derivação
Derivação forma palavra a partir de outra base:
- **Prefixal:** acréscimo de prefixo: infeliz, refazer.
- **Sufixal:** acréscimo de sufixo: felizmente, pedreiro.
- **Prefixal e sufixal:** prefixo e sufixo podem ser acrescentados em etapas independentes: infelizmente (infeliz / felizmente).
- **Parassintética:** prefixo e sufixo entram simultaneamente: anoitecer, entristecer.
- **Regressiva:** redução formal, comum em substantivos derivados de verbos: pesca (de pescar), ataque (de atacar).
- **Imprópria ou conversão:** mudança de classe sem alteração da forma: “o jantar” (substantivo) / “vamos jantar” (verbo).

## 4. Como diferenciar parassíntese de prefixal e sufixal?
Esse é um ponto recorrente de pegadinha.

Na derivação prefixal e sufixal, os afixos podem ser acrescentados independentemente e as formas intermediárias existem: infelizmente → infeliz e felizmente.

Na parassíntese, a formação depende da entrada simultânea dos dois afixos na análise escolar: anoitecer não se forma, com o mesmo sentido, apenas por “anoite” ou “noitecer”.

**Teste:** retire mentalmente um dos afixos. Se a forma intermediária existe com sentido e uso próprios, a formação tende a ser prefixal e sufixal; se não, pode ser parassintética.

## 5. Composição
Une dois ou mais elementos:
- **Justaposição:** elementos se unem sem perda fonética relevante: passatempo, guarda-chuva, girassol.
- **Aglutinação:** ocorre alteração ou perda de elemento sonoro: planalto (plano + alto), aguardente (água + ardente).

A grafia com hífen não é o critério central para classificar; observe a formação e as alterações sonoras.

## 6. Família de palavras e cuidado com semelhanças
Palavras da mesma família compartilham radical e relação de sentido: pedra, pedreiro, pedregulho. Nem toda semelhança de letras prova parentesco morfológico. A análise deve considerar a origem e o sentido.

## 7. Método de resolução
1. Identifique a base ou radical.
2. Localize elementos antes e depois da base.
3. Verifique se houve união de duas bases ou acréscimo de afixos.
4. Se houver prefixo e sufixo, teste se podem existir separadamente.
5. Observe mudança de classe sem alteração formal.
6. Confirme a resposta pelo sentido da palavra.

## 8. Pegadinhas
- Prefixo vem antes; sufixo vem depois.
- Parassíntese exige acréscimo simultâneo na análise tradicional.
- Justaposição conserva os elementos sonoros; aglutinação apresenta alteração.
- Derivação imprópria muda a classe sem mudar a forma.
- Não classifique pela aparência gráfica apenas.

**Macete:** prefixo = antes; sufixo = depois; composição = união de bases; parassíntese = prefixo e sufixo simultâneos.'),
('pcac-2026-portugues-09-classes-de-palavras','Aprofunda classes variáveis e invariáveis, função contextual, pronomes relativos, advérbios, preposições, conjunções e palavras que mudam de classe.','# Classes de palavras e seus empregos

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Na frase “O documento que chegou ontem será analisado”, a palavra “que” é:
>
> A) conjunção coordenativa. B) pronome relativo, retomando “documento”. C) artigo definido. D) preposição. E) advérbio de tempo.
>
> **Resolução:** “que” retoma o antecedente “documento” e introduz oração subordinada adjetiva. É pronome relativo. Gabarito: **B**.

## 1. A classe depende do contexto
Uma palavra não deve ser classificada isoladamente. Observe o papel que exerce na frase.

- “O jantar atrasou”: jantar é substantivo.
- “Vamos jantar”: jantar é verbo.
- “O não foi definitivo”: não está substantivado.

A mesma forma pode pertencer a classes diferentes conforme o emprego.

## 2. Classes variáveis
- **Substantivo:** nomeia seres, objetos, lugares, sentimentos e conceitos.
- **Artigo:** acompanha o substantivo, definindo-o ou indeterminando-o.
- **Adjetivo:** caracteriza ou qualifica substantivo.
- **Numeral:** indica quantidade, ordem, multiplicação ou fração.
- **Pronome:** acompanha ou substitui nome e estabelece referência.
- **Verbo:** expressa ação, estado, processo ou fenômeno.

São chamadas variáveis porque podem apresentar flexões de gênero, número, pessoa, tempo ou modo, conforme a classe.

## 3. Classes invariáveis
- **Advérbio:** modifica verbo, adjetivo ou outro advérbio; em geral, não varia.
- **Preposição:** relaciona termos e pode ser exigida pela regência.
- **Conjunção:** liga termos ou orações e expressa relações de sentido.
- **Interjeição:** expressa reação, emoção ou chamado.

## 4. Substantivo e adjetivo
Substantivo nomeia: servidor, relatório, cidade, coragem. Adjetivo atribui característica: servidor atento, relatório completo, cidade movimentada.

Um adjetivo pode ser substantivado: “O responsável chegou”. A palavra responsável, nesse contexto, funciona como substantivo.

## 5. Advérbio: não confunda com adjetivo
Adjetivo caracteriza substantivo: “relatório claro”.
Advérbio modifica verbo, adjetivo ou advérbio: “explicou claramente”; “muito claro”; “bem rapidamente”.

“Meio” varia quando significa metade e acompanha substantivo: meia hora. Fica invariável quando significa um pouco: meio cansada. “Bastante” varia em “bastantes documentos”, mas fica invariável em “trabalhou bastante”.

## 6. Pronomes
- Pessoais: indicam pessoas do discurso (eu, tu, ele; me, te, lhe).
- Possessivos: indicam posse ou relação (meu, sua).
- Demonstrativos: situam no espaço, tempo ou texto (este, esse, aquele).
- Relativos: retomam antecedente e conectam orações (que, quem, cujo, onde).
- Indefinidos: referência vaga (alguém, nenhum, vários).
- Interrogativos: formulam perguntas (quem, qual, quanto).

**Teste do relativo:** tente substituir “que” por “o qual/a qual”. Se a frase mantiver a relação de retomada, pode ser pronome relativo: “o documento o qual chegou”.

## 7. Preposição e conjunção
Preposição relaciona termos: “necessidade de apoio”, “entrega a servidor”.
Conjunção articula termos ou orações: “estudou e trabalhou”; “saiu porque terminou”.

A preposição pode ser exigida por um nome ou verbo; a conjunção estabelece relação lógica entre partes do enunciado.

## 8. Conjunções e sentido
- adição: e, nem;
- oposição: mas, porém;
- causa/explicação: porque, visto que (a relação depende da construção);
- condição: se, caso;
- concessão: embora, ainda que;
- conclusão: portanto, logo;
- finalidade: para que, a fim de que;
- tempo: quando, assim que.

A banca frequentemente cobra o valor semântico do conectivo, não apenas seu nome.

## 9. Método de prova
1. Observe a palavra que ela acompanha ou modifica.
2. Verifique sua função na oração.
3. Analise o sentido no contexto.
4. Teste flexão de gênero e número, quando pertinente.
5. Compare usos diferentes da mesma palavra.
6. Para “que”, descubra se retoma um antecedente ou apenas conecta orações.

## 10. Pegadinhas
- Adjetivo caracteriza substantivo; advérbio modifica verbo, adjetivo ou advérbio.
- “Que” pode ser pronome relativo ou conjunção, conforme o contexto.
- Preposição relaciona termos; conjunção articula termos ou orações.
- Classe gramatical não é a mesma coisa que função sintática.
- Palavra invariável não muda de classe só porque aparece em outra posição.

**Macete:** classifique pelo trabalho que a palavra faz na frase, não pela aparência isolada.'),
('pcac-2026-portugues-colocacao-pronominal','Aprofunda próclise, ênclise e mesóclise, palavras atrativas, início de oração, imperativo, locuções verbais e estratégia para questões da norma-padrão.','# Colocação pronominal: próclise, ênclise e mesóclise

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Assinale a frase em que a colocação pronominal está adequada à norma-padrão:
>
> A) Não informou-me sobre a alteração. B) Não me informou sobre a alteração. C) Informaria-me não sobre a alteração. D) Me informou não sobre a alteração. E) Não informou sobre a alteração-me.
>
> **Resolução:** “não” é palavra negativa que atrai o pronome para antes do verbo: “Não me informou”. Gabarito: **B**.

## 1. O que é colocação pronominal?
É a posição dos pronomes oblíquos átonos em relação ao verbo. Os principais são me, te, se, o(s), a(s), lhe(s), nos e vos.

Há três posições:
- **Próclise:** antes do verbo — “Não me avisaram”.
- **Ênclise:** depois do verbo, com hífen — “Avisaram-me”.
- **Mesóclise:** no interior do verbo — “Avisar-me-ão”.

## 2. Próclise: palavras atrativas
A próclise ocorre quando há elemento que atrai o pronome:
- palavras negativas: não, nunca, jamais, ninguém;
- pronomes relativos: que, quem, cujo, onde;
- conjunções subordinativas: quando, porque, embora, se;
- pronomes indefinidos: alguém me chamou;
- advérbios sem pausa: aqui se trabalha; talvez me chamem;
- frases interrogativas, exclamativas e optativas: Quem te contou? Como se enganou! Deus o acompanhe!

Exemplo: “Ninguém me avisou.” O pronome vem antes do verbo por atração de “ninguém”.

## 3. Ênclise
Na norma-padrão tradicional, evita-se iniciar oração formal com pronome átono. Assim: “Informaram-me o resultado”. Também aparece com imperativo afirmativo: “Apresente-se”.

A ênclise não deve ser aplicada mecanicamente: verifique se existe palavra atrativa que exige próclise.

## 4. Mesóclise
Ocorre com futuro do presente ou futuro do pretérito quando não há fator de próclise:
- Dar-lhe-ei resposta.
- Convidar-me-iam para a reunião.

Havendo atrator, a próclise prevalece: “Não lhe darei resposta”. A mesóclise é formal e aparece especialmente em questões de norma-padrão.

## 5. Locuções verbais
Em locuções, a posição depende da estrutura e dos fatores de atração:
- “Quero apresentar-lhe o relatório.”
- “Não lhe quero apresentar o relatório.”
- “Vou-me preparar” / “Vou preparar-me”, conforme a construção e a norma adotada.

Em prova, observe se há palavra atrativa e a relação entre auxiliar e verbo principal. Evite decorar uma única posição como regra universal.

## 6. Passo a passo para resolver
1. Localize o pronome átono.
2. Identifique o verbo e sua forma.
3. Procure palavra atrativa antes do verbo.
4. Se houver atrator, avalie próclise.
5. Se houver futuro sem atrator, avalie mesóclise.
6. Na ausência de atração, verifique início de oração e possibilidade de ênclise.
7. Em locução verbal, analise a construção completa.

## 7. Pegadinhas frequentes
- “Não se esqueça”: próclise por palavra negativa.
- “Quem te avisou?”: próclise por pronome interrogativo.
- “Apresente-se”: ênclise com imperativo afirmativo.
- “Dar-lhe-ei”: mesóclise no futuro sem atrator.
- “Nunca dir-lhe-ei”: inadequado na norma-padrão; “nunca” atrai: “Nunca lhe direi”.
- Não confunda pronome átono com pronome tônico: “a mim” não é caso de colocação pronominal.

**Macete:** antes = próclise; depois = ênclise; no meio = mesóclise. Primeiro procure o atrator.'),
('pcac-2026-portugues-crase-emprego-casos','Aprofunda fusão de preposição e artigo, regência, teste do masculino, locuções femininas, horas, demonstrativos, proibições, facultatividade e sentido.','# Crase: regra geral, casos obrigatórios, proibidos e facultativos

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Assinale a frase em que a crase está corretamente empregada:
>
> A) O relatório foi enviado à prazo. B) A equipe permaneceu à disposição. C) O servidor começou à revisar. D) A reunião será à cada semana. E) O documento foi entregue à ele.
>
> **Resolução:** “à disposição” é locução feminina que recebe acento grave. Não há crase antes de verbo, pronome pessoal ou em “a prazo”. Gabarito: **B**.

## 1. O que é crase?
Crase é a fusão da preposição a com artigo feminino a/as ou com certos pronomes demonstrativos iniciados por a. O acento grave marca a fusão: à, às, àquele, àquela, àquilo.

Não basta a palavra seguinte ser feminina. É preciso verificar se o termo anterior exige preposição a e se o termo seguinte admite artigo feminino.

## 2. Regra geral
Exemplo: “O servidor obedeceu à norma.”
- obedecer exige preposição a;
- “a norma” admite artigo feminino;
- a + a = à.

**Teste do masculino:** substitua a palavra feminina por uma masculina equivalente. Se aparecer “ao”, normalmente haverá crase no feminino:
- obedeceu ao regulamento;
- obedeceu à norma.

O teste ajuda, mas a análise da regência e do contexto continua necessária.

## 3. Casos comuns de crase obrigatória
- Locuções femininas: à noite, às pressas, à medida que, à procura de, à disposição.
- Horas determinadas: às 8h, à uma hora (conforme o contexto).
- Antes de aquele(s), aquela(s), aquilo, quando há preposição: referiu-se àquele fato.
- Expressões com “à moda de”, mesmo com nome masculino subentendido: bife à Oswaldo Aranha.

## 4. Casos em que não ocorre
- Antes de verbo: começou a estudar.
- Antes de palavra masculina: a prazo, a pé.
- Antes de pronome pessoal: a ela, a mim.
- Antes de artigo indefinido: a uma pessoa.
- Entre palavras repetidas: cara a cara, frente a frente.
- Em regra, antes de nome de cidade que não admite artigo: vou a Brasília. Compare: vou à Bahia.

## 5. Casos facultativos
Pode ser facultativa:
- antes de pronome possessivo feminino singular: entreguei a/à minha colega;
- antes de nome próprio feminino, conforme o uso do artigo: referi-me a/à Ana;
- depois da preposição até: fui até a/à escola.

A facultatividade não significa que se possa usar o acento em qualquer situação: depende da construção.

## 6. Crase e sentido
- “À medida que” = locução conjuntiva proporcional.
- “A princípio” = inicialmente.
- “Em princípio” = em tese.
- “Daqui a duas horas” = tempo futuro, sem crase.
- “Às duas horas” = horário determinado.

## 7. Método de prova
1. Descubra se o termo anterior exige preposição a.
2. Verifique se o termo seguinte admite artigo feminino.
3. Faça o teste do masculino (ao).
4. Confira se existe caso proibido ou facultativo.
5. Só então use o acento grave.

## 8. Pegadinhas
- Palavra feminina não significa crase automática.
- Antes de verbo, não há crase.
- Horas determinadas normalmente recebem crase; “daqui a” indica tempo futuro sem acento.
- “Àquele” pode receber crase pela fusão da preposição com o a inicial do demonstrativo.
- “A prazo” não recebe crase porque prazo é masculino.

**Macete:** crase = preposição exigida + artigo/pronome compatível. Regência primeiro, acento depois.'),
('pcac-2026-portugues-figuras-linguagem','Aprofunda figuras de palavra, pensamento, sintaxe e som, com exemplos, contrastes entre figuras semelhantes e método de interpretação contextual.','# Figuras de linguagem: sentido figurado e efeitos expressivos

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Na frase “A cidade acordou assustada com a notícia”, atribui-se à cidade uma ação ou sentimento humano. A figura de linguagem é:
>
> A) comparação. B) personificação ou prosopopeia. C) metonímia. D) antítese. E) ironia.
>
> **Resolução:** personificação atribui características ou ações humanas a seres não humanos ou ideias abstratas. Gabarito: **B**.

## 1. Para que servem as figuras?
São recursos que produzem efeitos expressivos, sonoros ou de organização. A interpretação depende do contexto: uma expressão pode ser literal em uma situação e figurada em outra.

A banca costuma apresentar um trecho e perguntar qual recurso cria determinado efeito. Por isso, explique o sentido produzido, em vez de apenas decorar nomes.

## 2. Figuras de palavra ou sentido
- **Metáfora:** aproximação implícita: “A investigação é um labirinto”.
- **Comparação:** aproximação explícita: “A equipe avançou como uma máquina”.
- **Metonímia:** substituição por relação de proximidade: “Li Machado de Assis” (a obra do autor).
- **Catacrese:** expressão incorporada ao uso por falta de termo específico: “pé da mesa”.
- **Sinestesia:** mistura de sensações: “voz doce”, combinando audição e paladar.

**Metáfora × comparação:** a comparação costuma apresentar conectivo como “como”, “tal qual” ou “feito”; a metáfora aproxima diretamente.

## 3. Figuras de pensamento
- **Personificação/prosopopeia:** atribui ação humana a ser não humano: “A cidade acordou”.
- **Hipérbole:** exagero intencional: “Esperei uma eternidade”.
- **Eufemismo:** suaviza expressão: “Faltou com a verdade”.
- **Ironia:** o sentido pretendido contrasta com o literal: “Que pontualidade!” para quem chegou muito atrasado.
- **Antítese:** aproxima ideias opostas: claro/escuro.
- **Paradoxo:** reúne ideias aparentemente incompatíveis: “silêncio ensurdecedor”.
- **Gradação:** sequência crescente ou decrescente: “sussurrou, falou, gritou”.

**Antítese × paradoxo:** antítese coloca termos opostos lado a lado; paradoxo cria uma combinação que parece contraditória.

## 4. Figuras de construção ou sintaxe
- **Elipse:** omite termo recuperável pelo contexto.
- **Zeugma:** omite termo já mencionado.
- **Anáfora:** repete palavra ou expressão no início de segmentos.
- **Hipérbato:** altera a ordem direta da frase.
- **Pleonasmo:** repetição expressiva ou redundante.
- **Assíndeto:** ausência de conjunções em sequência.
- **Polissíndeto:** repetição de conjunções.

Elipse é mais ampla; zeugma é um caso em que o termo omitido já apareceu antes.

## 5. Figuras sonoras
- **Aliteração:** repetição de sons consonantais.
- **Assonância:** repetição de sons vocálicos.
- **Onomatopeia:** representação de ruídos por palavras, como “tic-tac” e “bum”.

## 6. Como a banca tenta confundir
Uma frase com “como” pode apresentar comparação, mas nem toda ocorrência de “como” é figura de linguagem: pode ter função gramatical de modo ou causa. Uma oposição entre palavras não é automaticamente paradoxo. Uma repetição pode ser anáfora se ocorrer no início de segmentos; em outra posição, pode ter outro efeito.

## 7. Estratégia de resolução
1. Leia a frase dentro do texto.
2. Identifique o efeito: aproximação, exagero, suavização, oposição, repetição, omissão ou inversão.
3. Explique o sentido literal e o pretendido.
4. Compare as alternativas próximas.
5. Escolha a figura que explica o efeito principal no contexto.

## 8. Pegadinhas
- Metáfora não exige conectivo comparativo explícito.
- Antítese aproxima opostos; paradoxo combina ideias aparentemente contraditórias.
- Personificação atribui ação ou característica humana.
- Elipse omite termo recuperável; zeugma omite termo já mencionado.
- Ironia depende do contexto e da intenção.
- Não classifique uma figura por uma palavra isolada.

**Macete:** pergunte qual efeito a frase produz. O efeito conduz à figura.')
) as v(slug, summary, body_md)
where m.slug = v.slug;