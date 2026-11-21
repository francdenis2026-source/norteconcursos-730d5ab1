-- Norte Concursos | PC-AC 2026 | Estatística
-- Conteúdo didático expandido e já aplicado no projeto Supabase gkwphadbveiyjcwiiizw.
-- Este arquivo registra a atualização para versionamento/reprodução manual.
-- Não é executado automaticamente pelo build da aplicação.

DO $pcac_statistics$
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
('pcac-2026-estatistica-01-fundamentos-populacao-amostra-variaveis','Aula aprofundada: população, amostra, censo, métodos de amostragem, representatividade, vieses e classificação de variáveis, com exemplos policiais, técnicas de resolução e exercícios comentados no padrão de concurso.','# Aula aprofundada — População, amostra e tipos de variáveis

## O que você precisa aprender nesta aula

Ao terminar, você deverá conseguir:
1. Identificar a população e a amostra de uma pesquisa.
2. Distinguir censo de pesquisa amostral.
3. Reconhecer os principais métodos de amostragem.
4. Perceber quando uma amostra pode estar enviesada.
5. Classificar variáveis qualitativas e quantitativas.
6. Diferenciar variáveis nominais, ordinais, discretas e contínuas.
7. Resolver questões de prova por meio de palavras-chave e eliminação de alternativas.

---

## 1. Primeiro: o que a Estatística estuda?

Imagine que uma delegacia queira conhecer as ocorrências registradas em determinado ano. Ela possui milhares de boletins. Ler um por um, sem organização, não facilita a identificação de padrões.

A Estatística oferece ferramentas para transformar esses registros em informação. Ela ajuda a:
- coletar dados;
- organizar informações;
- resumir grandes quantidades de registros;
- comparar grupos;
- identificar padrões;
- produzir estimativas e apoiar decisões.

**Dado** é o registro observado. **Informação** é o resultado da organização e interpretação desses dados.

Exemplo: os números 12, 18, 9 e 21, sozinhos, dizem pouco. Se descobrirmos que representam ocorrências registradas em quatro bairros durante uma semana, passam a ter significado.

### Estatística descritiva e inferencial: não confunda

**Estatística descritiva** descreve o conjunto que foi efetivamente observado. Utiliza tabelas, gráficos, percentuais, médias e outras medidas.

Exemplo: a equipe contou todos os 300 boletins de uma unidade e verificou que 90 eram de furto. Dizer que 30% dos boletins daquela base eram de furto é uma descrição dos dados examinados.

**Estatística inferencial** utiliza informações de uma amostra para estimar ou testar afirmações sobre uma população maior. Existe incerteza porque nem todos os elementos foram observados.

Exemplo: a equipe seleciona 300 boletins entre 3.000 e utiliza os resultados para estimar a proporção de furtos entre todos os boletins. Isso é inferência.

**Atalho de prova:**
- A questão fala em organizar, resumir, apresentar ou descrever os dados observados? Pense em estatística descritiva.
- A questão fala em estimar, generalizar ou tirar conclusões sobre uma população a partir de uma amostra? Pense em estatística inferencial.

A inferência não transforma uma estimativa em certeza absoluta.

---

## 2. População: o grupo inteiro que queremos estudar

População estatística é o conjunto completo de elementos que possuem a característica que a pesquisa deseja investigar.

A população não precisa ser formada por pessoas. Pode ser composta por:
- boletins de ocorrência;
- processos;
- inquéritos;
- municípios;
- delegacias;
- veículos;
- atendimentos;
- dias de determinado período.

**Exemplo 1 — investigação:** uma pesquisa pretende estudar todos os boletins registrados no Acre durante 2025. A população é o conjunto de todos esses boletins, conforme os critérios definidos na pesquisa.

**Exemplo 2 — atendimento:** uma unidade quer avaliar o tempo de atendimento de todos os cidadãos atendidos durante o mês. A população é o conjunto desses atendimentos.

**Exemplo 3 — candidatos:** uma análise pretende conhecer o desempenho de todos os 2.000 candidatos inscritos em um concurso. A população é formada pelos 2.000 candidatos.

### Como localizar a população no enunciado?

Procure expressões como:
- todos os registros;
- conjunto completo;
- total de candidatos;
- todos os atendimentos;
- universo da pesquisa;
- todos os elementos que se pretende estudar.

**Atenção:** população é definida pelo objetivo da pesquisa, não pelo número que aparece primeiro no enunciado.

---

## 3. Amostra: uma parte da população

Amostra é uma parte da população escolhida para ser examinada.

Imagine que existam 5.000 boletins e que a equipe selecione 200 para analisar com mais profundidade.

- População: 5.000 boletins.
- Amostra: 200 boletins.
- Unidade observada: cada boletim selecionado.

A amostra permite estudar uma parte do conjunto sem precisar examinar todos os elementos.

### Exemplo resolvido

Uma pesquisa deseja conhecer as características dos 1.200 atendimentos realizados em uma delegacia durante um semestre. Para isso, seleciona 120 atendimentos.

**Passo 1:** descubra o conjunto completo. São 1.200 atendimentos: população.

**Passo 2:** descubra o que foi efetivamente selecionado. São 120: amostra.

**Passo 3:** compare as duas quantidades. Os 120 selecionados fazem parte dos 1.200.

### População não é a mesma coisa que amostra

| População | Amostra |
|---|---|
| Conjunto completo de interesse | Parte selecionada |
| Universo investigado | Elementos efetivamente examinados |
| Pode conter milhares de elementos | Geralmente contém menos elementos |
| Representada frequentemente por N | Representada frequentemente por n |

É comum representar o tamanho da população por **N** e o tamanho da amostra por **n**.

### Parâmetro e estatística amostral

Outro par de conceitos que pode aparecer:
- **Parâmetro:** medida que descreve uma característica da população.
- **Estatística amostral:** medida calculada a partir da amostra.

Exemplo: a média do tempo de atendimento de todos os 1.200 atendimentos é um parâmetro. A média calculada com os 120 atendimentos selecionados é uma estatística amostral.

---

## 4. Censo e pesquisa por amostragem

**Censo** é a investigação que observa todos os elementos da população definida.

Exemplo: uma instituição possui 80 servidores e coleta a informação desejada de todos os 80. Foi realizado um censo.

**Pesquisa amostral** examina somente uma parte da população.

Exemplo: dos mesmos 80 servidores, são selecionados 20 para responder ao levantamento. É uma pesquisa amostral.

### Técnica para não errar

Pergunte: todos os elementos da população foram observados?

- Sim: censo.
- Não, apenas uma parte: pesquisa amostral.

**Pegadinha:** não confunda uma pesquisa com muitos participantes com um censo. Uma pesquisa com 9.000 pessoas ainda pode ser amostral se a população tiver 100.000.

---

## 5. Amostragem: como a amostra é escolhida?

Amostragem é o processo ou método utilizado para selecionar os elementos que farão parte da amostra.

A banca pode apresentar uma pequena história e pedir o nome da técnica. Em vez de decorar palavras isoladas, identifique como a seleção aconteceu.

### 5.1 Amostragem aleatória simples

É uma seleção por sorteio, em que os elementos têm a mesma probabilidade de seleção no plano amostral simples.

**Exemplo:** existem 500 boletins numerados. Um sistema sorteia 50 números, sem escolha pessoal dos pesquisadores.

**Palavras-chave:** sorteio, aleatório, mesma chance.

**Como reconhecer na prova:** se o enunciado disser que os elementos foram escolhidos por sorteio de uma lista completa, sem divisão em grupos, pense em amostragem aleatória simples.

### 5.2 Amostragem sistemática

Os elementos são selecionados em intervalos regulares, depois de definido um ponto inicial.

Exemplo: selecionar um boletim a cada 10 registros de uma lista.

Uma forma de calcular o intervalo é:

**k = N ÷ n**

Em que:
- N = tamanho da população;
- n = tamanho da amostra;
- k = intervalo de seleção.

**Exemplo resolvido:**

População de 1.000 registros; amostra desejada de 100.

k = 1.000 ÷ 100 = 10.

Depois de definir um início aleatório entre os primeiros 10 registros, seleciona-se aquele registro e, em seguida, cada décimo registro.

**Palavras-chave:** intervalo, sequência, a cada 5, a cada 10, a cada 20.

**Pegadinha:** sistemática não significa escolher os registros mais recentes. É necessário seguir um intervalo previamente definido.

### 5.3 Amostragem estratificada

A população é dividida em grupos chamados estratos. Depois, são selecionados elementos de cada estrato.

Os estratos são definidos por características relevantes para a pesquisa.

**Exemplo policial:**

Uma instituição possui:
- 600 servidores administrativos;
- 400 servidores operacionais.

A pesquisa quer garantir que os dois grupos estejam representados. Divide os servidores nessas categorias e seleciona participantes dentro de cada grupo.

Isso é amostragem estratificada.

#### Exemplo de seleção proporcional

A população tem 1.000 servidores:
- 60% administrativos;
- 40% operacionais.

Deseja-se uma amostra de 100:
- 60 administrativos;
- 40 operacionais.

A amostra mantém a proporção dos estratos na população.

**Palavras-chave:** divisão em estratos, grupos com características, elementos selecionados em cada grupo.

### 5.4 Amostragem por conglomerados

A população é dividida em grupos naturais, chamados conglomerados. Selecionam-se alguns desses grupos para a pesquisa.

**Exemplo:** existem 20 delegacias. Em vez de sortear servidores de todas as unidades, a equipe sorteia 4 delegacias e examina os servidores ou registros das unidades selecionadas, conforme o plano da pesquisa.

**Palavras-chave:** grupos naturais, sorteio de unidades, seleção de escolas, bairros, hospitais ou delegacias.

### Estratificada versus conglomerados: a diferença mais importante

- **Estratificada:** seleciona elementos de todos os estratos.
- **Conglomerados:** seleciona alguns conglomerados.

Imagine 10 delegacias:

Na estratificada, a pesquisa pode selecionar registros de todas as 10, respeitando grupos definidos.

Nos conglomerados, pode sortear 3 das 10 delegacias e concentrar a coleta nelas.

Essa distinção merece memorização.

### 5.5 Amostragem por conveniência

Os elementos são escolhidos pela facilidade de acesso.

**Exemplo:** o pesquisador entrevista apenas as pessoas que estão disponíveis na entrada de uma delegacia.

É simples e rápida, mas pode produzir uma amostra pouco representativa.

**Palavras-chave:** facilidade, disponibilidade, proximidade, acessibilidade.

### 5.6 Amostragem por julgamento ou intencional

O pesquisador escolhe os elementos com base em critérios próprios ou técnicos.

Exemplo: selecionar profissionais que possuam determinada experiência para uma entrevista especializada.

### 5.7 Amostragem por cotas

São estabelecidas quantidades para determinados grupos, mas a seleção dentro deles não necessariamente ocorre por sorteio.

Exemplo: entrevistar 50 homens e 50 mulheres, escolhidos conforme disponibilidade, até completar as quantidades previstas.

### Quadro de memorização das técnicas

| Técnica | Como funciona | Palavra que ajuda |
|---|---|---|
| Aleatória simples | Sorteia elementos | Sorteio |
| Sistemática | Seleciona em intervalos | A cada |
| Estratificada | Seleciona em cada estrato | Todos os grupos |
| Conglomerados | Sorteia alguns grupos | Grupos naturais |
| Conveniência | Escolhe os acessíveis | Facilidade |
| Julgamento | Escolha orientada por critério | Especialista |
| Cotas | Completa quantidades por grupo | Quantidade fixada |

---

## 6. Representatividade, viés e tamanho da amostra

Uma amostra precisa representar adequadamente a população para que as conclusões sejam úteis.

**Representatividade** significa que a amostra retrata, de maneira adequada, as características relevantes da população para o objetivo do estudo.

### Uma amostra grande pode ser ruim?

Sim!

Imagine que uma pesquisa queira conhecer a opinião de todos os moradores de uma cidade, mas entreviste 2.000 pessoas exclusivamente em um shopping.

Apesar de ter 2.000 participantes, pode deixar de fora pessoas que não frequentam aquele local.

O problema é a seleção, não simplesmente a quantidade.

### O que é viés de seleção?

É uma distorção produzida pelo modo como os participantes ou elementos foram selecionados.

Exemplo: entrevistar somente pessoas que comparecem voluntariamente a uma pesquisa pode favorecer a participação de quem possui opinião mais forte sobre o assunto.

### Erro amostral e viés não são sinônimos

- **Erro amostral:** diferença que pode surgir porque foi observada uma amostra, e não toda a população.
- **Viés:** distorção sistemática causada pelo método de seleção, coleta ou medição.

Aumentar a amostra pode reduzir parte da variabilidade amostral, mas não corrige automaticamente um método enviesado.

### Outros problemas que prejudicam a pesquisa

- Não resposta: pessoas selecionadas não participam.
- Cobertura incompleta: a lista utilizada deixa elementos de fora.
- Erro de registro: informação digitada incorretamente.
- Erro de medição: instrumento ou procedimento produz informação incorreta.

**Dica de prova:** se o enunciado destacar que a amostra é grande, mas foi escolhida de maneira inadequada, desconfie da afirmação de que ela é necessariamente representativa.

---

## 7. Variáveis: o que está sendo observado?

Variável é uma característica que pode apresentar valores ou categorias diferentes entre os elementos estudados.

Exemplos:
- idade;
- município;
- tipo de ocorrência;
- número de envolvidos;
- tempo de atendimento;
- escolaridade;
- quantidade de boletins.

A classificação das variáveis é uma das partes mais importantes desta aula.

Existem dois grandes grupos:

1. Variáveis qualitativas.
2. Variáveis quantitativas.

### 7.1 Variável qualitativa

Representa uma categoria, característica ou classificação. Não expressa uma quantidade numérica propriamente dita.

Exemplos:
- tipo de crime;
- município;
- estado civil;
- escolaridade;
- turno de atendimento;
- situação do processo.

Mesmo quando uma categoria recebe um código numérico, continua sendo qualitativa.

**Exemplo:** uma planilha usa:
- 1 = furto;
- 2 = roubo;
- 3 = homicídio.

Os números são códigos para identificar categorias. Não faz sentido somar 1 + 2 + 3 como se fossem quantidades de crimes.

Existem duas classificações importantes.

**Qualitativa nominal:** categorias sem ordem natural.

Exemplos:
- município;
- tipo de ocorrência;
- cor dos olhos;
- estado civil.

**Qualitativa ordinal:** categorias que possuem uma ordem ou hierarquia.

Exemplos:
- escolaridade (fundamental, médio, superior);
- gravidade (leve, moderada, grave);
- nível de satisfação (baixo, médio, alto).

**Como identificar?** Pergunte: é possível colocar as categorias em uma ordem lógica?

- Não: nominal.
- Sim: ordinal.

### 7.2 Variável quantitativa

Expressa uma quantidade numérica ou medida.

Exemplos:
- idade;
- número de ocorrências;
- tempo de atendimento;
- distância;
- quantidade de servidores;
- valor de apreensões.

As quantitativas são divididas em discretas e contínuas.

**Quantitativa discreta:** resulta de contagem. Em geral, assume valores separados, como números inteiros.

Exemplos:
- número de vítimas: 0, 1, 2, 3;
- quantidade de boletins;
- número de prisões;
- número de servidores.

Não existe 2,5 vítimas em uma contagem de pessoas.

**Quantitativa contínua:** resulta de medição e pode assumir valores em um intervalo, inclusive decimais.

Exemplos:
- tempo de atendimento: 12,5 minutos;
- distância percorrida: 4,7 km;
- peso: 75,4 kg;
- altura: 1,74 m.

### O truque para distinguir discreta e contínua

Pergunte:

**Estou contando ou medindo?**

- Contando objetos, pessoas, ocorrências ou processos: discreta.
- Medindo tempo, distância, peso ou altura: contínua.

Atenção: uma variável pode ser registrada em números inteiros por arredondamento e ainda representar uma medida contínua. Observe a natureza da característica, não apenas o formato da planilha.

---

## 8. Escalas de mensuração: nominal, ordinal, intervalar e razão

Além da classificação qualitativa/quantitativa, uma questão pode explorar a escala de mensuração.

### Nominal
Classifica em categorias sem ordem.

Exemplo: tipo de ocorrência.

### Ordinal
Classifica em categorias ordenadas, mas sem exigir que a distância entre categorias seja igual.

Exemplo: gravidade baixa, média e alta.

### Intervalar
Possui ordem e diferenças comparáveis, mas não apresenta zero absoluto.

Exemplo clássico: temperatura em graus Celsius. A diferença entre 10°C e 20°C é igual à diferença entre 20°C e 30°C, mas 20°C não significa o dobro de 10°C.

### Razão
Possui ordem, intervalos comparáveis e zero absoluto, permitindo comparar proporções.

Exemplos: duração, distância, peso e número de ocorrências.

**Memorização:**
- Nominal: nome.
- Ordinal: ordem.
- Intervalar: intervalos iguais, sem zero absoluto.
- Razão: zero absoluto.

---

## 9. Como resolver questões na prova: método em 5 passos

Quando a IDECAN apresentar um enunciado grande, não tente decorar tudo. Siga este roteiro.

### Passo 1 — Descubra o que a pesquisa quer estudar
Pergunte: qual é o conjunto completo de interesse?

Isso identifica a população.

### Passo 2 — Procure o que foi efetivamente selecionado
Veja se o enunciado menciona 50, 100, 200 registros ou participantes.

Essa parte geralmente é a amostra.

### Passo 3 — Identifique como ocorreu a seleção
- Sorteio individual? Aleatória simples.
- A cada 10 elementos? Sistemática.
- Participantes de todos os grupos? Estratificada.
- Alguns grupos naturais sorteados? Conglomerados.
- Escolhidos pela facilidade? Conveniência.

### Passo 4 — Descubra o que a pesquisa está medindo
- Categoria? Qualitativa.
- Contagem? Quantitativa discreta.
- Medida? Quantitativa contínua.

### Passo 5 — Verifique se a conclusão é válida
A questão afirma que a amostra é representativa só porque é grande? Cuidado.

A forma de seleção, a cobertura e os possíveis vieses também importam.

---

## 10. Questões resolvidas passo a passo

### Questão resolvida 1 — População e amostra

Uma pesquisa pretende estudar 2.500 boletins de ocorrência registrados durante determinado ano. Para isso, seleciona 250 boletins por sorteio.

**Pergunta:** qual é a população e qual é a amostra?

**Resolução:**
1. O total de interesse é 2.500.
2. Foram selecionados apenas 250.
3. Logo, população=2.500 e amostra=250.
4. Como a seleção ocorreu por sorteio individual, a técnica descrita é aleatória simples, considerando uma lista completa e probabilidades iguais.

**Como não cair na pegadinha:** não confunda o número selecionado com o total existente.

### Questão resolvida 2 — Tipo de variável

Uma planilha apresenta:
- tipo de ocorrência;
- número de envolvidos;
- tempo de atendimento;
- nível de gravidade.

**Resolução:**
- Tipo de ocorrência: qualitativa nominal.
- Número de envolvidos: quantitativa discreta.
- Tempo de atendimento: quantitativa contínua.
- Nível de gravidade: qualitativa ordinal.

**Técnica:** procure a natureza do dado, não apenas se ele aparece escrito em palavras ou números.

### Questão resolvida 3 — Estratificada ou conglomerados?

Uma pesquisa divide os servidores em administrativos e operacionais e sorteia participantes dentro dos dois grupos.

**Resolução:** amostragem estratificada, pois houve seleção de elementos dentro de cada estrato.

Se o pesquisador sorteasse quatro delegacias e examinasse os servidores dessas unidades, a descrição apontaria para conglomerados.

### Questão resolvida 4 — Amostragem sistemática

Uma lista possui 600 registros e a pesquisa precisa selecionar 60.

**Resolução:**
k=N÷n  
k=600÷60  
k=10.

O intervalo é 10. Definido um início aleatório entre 1 e 10, seleciona-se esse registro e depois cada décimo registro.

**Pegadinha:** não confunda intervalo sistemático com sorteio independente de cada elemento.

---

## 11. Pegadinhas que você precisa memorizar

1. Uma amostra grande não é necessariamente representativa.
2. Censo significa observar todos os elementos da população.
3. Amostra é uma parte da população.
4. Estatística descritiva resume os dados observados.
5. Estatística inferencial utiliza uma amostra para tirar conclusões sobre a população, considerando incerteza.
6. Código numérico não transforma categoria em variável quantitativa.
7. Número de ocorrências é quantitativa discreta.
8. Tempo de atendimento é quantitativa contínua.
9. Município é qualitativa nominal.
10. Gravidade baixa, média e alta é qualitativa ordinal.
11. Estratificada seleciona elementos de todos os estratos.
12. Conglomerados seleciona alguns grupos naturais.
13. Sistemática utiliza intervalos regulares.
14. Conveniência utiliza facilidade de acesso.
15. Uma amostra numerosa não elimina automaticamente o viés.

---

## 12. Estratégia de revisão antes da prova

**Primeira revisão:** explique em voz alta a diferença entre população, amostra e censo, sem consultar o material.

**Segunda revisão:** memorize as diferenças entre as cinco técnicas mais importantes de amostragem.

**Terceira revisão:** classifique 20 exemplos de variáveis em qualitativas nominais, qualitativas ordinais, quantitativas discretas e quantitativas contínuas.

**Quarta revisão:** resolva questões sem olhar os comentários. Depois, leia a justificativa inclusive das respostas que acertou por dúvida.

**Regra de ouro:** não memorize somente o nome da técnica. Aprenda a reconhecer a situação descrita no enunciado. É isso que permite resolver questões novas, mesmo quando a banca muda os exemplos.

---

## 13. Exercícios de fixação — estilo de cobrança de concurso

Marque Certo ou Errado. Tente resolver antes de consultar o comentário.

**1.** Uma pesquisa seleciona 150 dos 1.500 boletins registrados. Os 150 boletins representam a população, enquanto os 1.500 representam a amostra.

**2.** A seleção de participantes por sorteio, com probabilidades iguais de inclusão, caracteriza amostragem aleatória simples.

**3.** Dividir uma população em estratos e selecionar elementos de cada estrato caracteriza amostragem por conglomerados.

**4.** O número de vítimas de uma ocorrência é uma variável quantitativa discreta.

**5.** O tempo de atendimento, medido em minutos e segundos, é uma variável quantitativa contínua.

**6.** Uma variável qualitativa nominal apresenta categorias que podem ser organizadas em uma hierarquia natural.

**7.** Uma amostra de grande tamanho é necessariamente representativa da população, mesmo quando os participantes são escolhidos apenas por conveniência.

**8.** Selecionar um registro a cada 20 elementos de uma lista, após definir o início, é exemplo de amostragem sistemática.

**Gabarito comentado:**

1. **Errado.** Os 1.500 são a população; os 150 são a amostra.
2. **Certo.** O sorteio com probabilidades iguais caracteriza a amostragem aleatória simples.
3. **Errado.** Selecionar elementos de todos os estratos caracteriza amostragem estratificada.
4. **Certo.** Número de vítimas é uma contagem.
5. **Certo.** Tempo é uma medida que pode assumir valores fracionários.
6. **Errado.** A nominal não tem ordem natural. A ordinal possui.
7. **Errado.** Conveniência pode produzir viés, mesmo em amostras grandes.
8. **Certo.** A seleção ocorre em intervalos regulares.

**Meta de aprendizagem:** conseguir acertar pelo menos 7 dos 8 itens e explicar o motivo de cada resposta.
','[{"b":"Conjunto completo de elementos que se deseja estudar.","f":"O que é população estatística?"},{"b":"Parte da população selecionada para análise.","f":"O que é amostra?"},{"b":"Censo observa todos os elementos; pesquisa amostral observa apenas uma parte.","f":"Qual a diferença entre censo e pesquisa amostral?"},{"b":"Organiza, resume e apresenta os dados efetivamente observados.","f":"O que é estatística descritiva?"},{"b":"Usa dados de uma amostra para estimar ou testar afirmações sobre a população, considerando incerteza.","f":"O que é estatística inferencial?"},{"b":"Seleção por sorteio, com probabilidades iguais de inclusão no plano simples.","f":"O que é amostragem aleatória simples?"},{"b":"Seleção em intervalos regulares, após definição de um início.","f":"O que caracteriza amostragem sistemática?"},{"b":"k = N ÷ n, em que N é a população e n é o tamanho da amostra.","f":"Como calcular o intervalo da amostragem sistemática?"},{"b":"A população é dividida em estratos e são selecionados elementos de cada estrato.","f":"O que caracteriza amostragem estratificada?"},{"b":"A população é dividida em grupos naturais e alguns grupos são selecionados.","f":"O que caracteriza amostragem por conglomerados?"},{"b":"Estratificada seleciona elementos de todos os estratos; conglomerados seleciona alguns grupos naturais.","f":"Qual a diferença entre estratificada e conglomerados?"},{"b":"Seleção de elementos pela facilidade ou disponibilidade de acesso.","f":"O que é amostragem por conveniência?"},{"b":"Não. A forma de seleção, a cobertura e o viés também importam.","f":"Uma amostra grande garante representatividade?"},{"b":"Categoria sem ordem natural, como município ou tipo de ocorrência.","f":"O que é variável qualitativa nominal?"},{"b":"Categoria com ordem ou hierarquia, como gravidade baixa, média e alta.","f":"O que é variável qualitativa ordinal?"},{"b":"Variável de contagem, como número de vítimas ou boletins.","f":"O que é variável quantitativa discreta?"},{"b":"Variável de medida, como tempo, distância, peso ou altura.","f":"O que é variável quantitativa contínua?"},{"b":"Não. Códigos usados apenas para identificar categorias continuam sendo qualitativos.","f":"Código numérico transforma uma categoria em variável quantitativa?"},{"b":"Parâmetro descreve a população; estatística amostral é calculada a partir da amostra.","f":"Qual a diferença entre parâmetro e estatística amostral?"},{"b":"É categoria ou quantidade? Se categoria, tem ordem? Se quantidade, é contagem ou medida?","f":"Quais perguntas ajudam a classificar uma variável?"}]','[{"a":false,"q":"Uma pesquisa seleciona 150 dos 1.500 boletins registrados. Os 150 boletins representam a população, enquanto os 1.500 representam a amostra.","why":"Errado. Os 1.500 boletins formam a população de interesse; os 150 selecionados constituem a amostra."},{"a":true,"q":"A seleção de participantes por sorteio, com probabilidades iguais de inclusão, caracteriza amostragem aleatória simples.","why":"Certo. No plano aleatório simples, cada elemento tem a mesma probabilidade de ser selecionado."},{"a":false,"q":"Dividir uma população em estratos e selecionar elementos de cada estrato caracteriza amostragem por conglomerados.","why":"Errado. Isso é amostragem estratificada. Nos conglomerados, selecionam-se alguns grupos naturais."},{"a":true,"q":"O número de vítimas de uma ocorrência é uma variável quantitativa discreta.","why":"Certo. É uma contagem que assume valores inteiros não negativos."},{"a":true,"q":"O tempo de atendimento, medido em minutos e segundos, é uma variável quantitativa contínua.","why":"Certo. Tempo é uma medida e pode assumir valores fracionários."},{"a":false,"q":"Uma variável qualitativa nominal apresenta categorias que podem ser organizadas em uma hierarquia natural.","why":"Errado. A variável nominal não possui ordem natural. A ordinal apresenta categorias ordenáveis."},{"a":false,"q":"Uma amostra de grande tamanho é necessariamente representativa da população, mesmo quando os participantes são escolhidos apenas por conveniência.","why":"Errado. Uma amostra grande pode continuar enviesada se a seleção não representar adequadamente a população."},{"a":true,"q":"Selecionar um registro a cada 20 elementos de uma lista, após definir o início, é exemplo de amostragem sistemática.","why":"Certo. A característica central da amostragem sistemática é a seleção por intervalos regulares."},{"a":true,"q":"Uma lista usa os códigos 1 para furto, 2 para roubo e 3 para homicídio. A variável tipo de ocorrência continua sendo qualitativa nominal.","why":"Certo. Os números apenas identificam categorias sem significado quantitativo ou ordem natural."},{"a":true,"q":"Em uma população de 600 registros, selecionar 60 por amostragem sistemática resulta em intervalo k igual a 10.","why":"Certo. k=N÷n=600÷60=10."}]'),
('pcac-2026-estatistica-02-distribuicao-frequencias','Aula aprofundada de distribuição de frequências: contagem, proporção, percentual, frequências acumuladas, classes, tabelas e resolução de questões.','# Aula 2 — Distribuição de frequências: absoluta, relativa e acumulada

## 1. Por que organizar os dados?

Imagine que uma unidade registre 30 ocorrências. Uma lista com 30 linhas permite consultar cada registro, mas dificulta perceber rapidamente qual tipo aparece mais, qual representa maior percentual e quantos registros se acumulam até determinada faixa.

A distribuição de frequências organiza os dados em categorias ou classes e mostra quantas observações aparecem em cada uma.

Ela responde a três perguntas:
- Quantas vezes aconteceu? Frequência absoluta.
- Qual parte do total representa? Frequência relativa.
- Quantas observações foram acumuladas até aqui? Frequência acumulada.

## 2. Frequência absoluta (f)

É a quantidade de observações em uma categoria ou classe.

Exemplo: em 20 boletins, 8 foram classificados como furto. A frequência absoluta de furto é 8.

A frequência absoluta é uma contagem, não um percentual.

## 3. Frequência relativa (fr)

É a parte do total que corresponde à categoria.

**fr = f ÷ n**

Para transformar em percentual:

**fr% = (f ÷ n) × 100**

Exemplo: 8 furtos em 20 boletins.

8 ÷ 20 = 0,40.
0,40 × 100 = 40%.

Portanto:
- Absoluta: 8.
- Relativa: 0,40.
- Percentual: 40%.

**Dica:** a frequência relativa sempre depende do total usado como referência. Se o total mudar, o percentual pode mudar, mesmo que a contagem permaneça igual.

## 4. Frequência acumulada (F)

É a soma progressiva das frequências absolutas até uma categoria ou classe.

Exemplo:

| Dias para conclusão | f | F acumulada |
|---|---:|---:|
| 0 a 2 | 3 | 3 |
| 3 a 5 | 5 | 8 |
| 6 a 8 | 4 | 12 |

Cálculo:
- Primeira classe: 3.
- Segunda: 3 + 5 = 8.
- Terceira: 8 + 5? Não: use o acumulado anterior. 8 + 4 = 12.

A última frequência acumulada deve ser igual ao total de observações.

**Atenção:** a acumulação pressupõe uma ordem com significado. Em categorias nominais, como tipos de crime, não existe necessariamente uma ordem natural para somar progressivamente.

## 5. Frequência relativa acumulada (Fr)

É a soma progressiva das frequências relativas. Também pode ser calculada dividindo a frequência absoluta acumulada pelo total.

No exemplo anterior, com 12 registros:
- Primeira classe: 3/12 = 25%.
- Segunda: 8/12 = 66,67%.
- Terceira: 12/12 = 100%.

A última frequência relativa acumulada será 1 ou 100%, ressalvados arredondamentos.

## 6. Exemplo completo resolvido

Uma unidade registrou 40 atendimentos por faixa de duração:

| Duração | Frequência absoluta |
|---|---:|
| Até 10 min | 10 |
| 11 a 20 min | 18 |
| 21 a 30 min | 8 |
| Acima de 30 min | 4 |

**Passo 1 — Confira o total:** 10 + 18 + 8 + 4 = 40.

**Passo 2 — Calcule os percentuais:**
- Até 10 min: 10/40 × 100 = 25%.
- 11 a 20 min: 18/40 × 100 = 45%.
- 21 a 30 min: 8/40 × 100 = 20%.
- Acima de 30 min: 4/40 × 100 = 10%.

**Passo 3 — Calcule a frequência acumulada:**
- 10.
- 10 + 18 = 28.
- 28 + 8 = 36.
- 36 + 4 = 40.

**Passo 4 — Interprete:** 28 dos 40 atendimentos, ou 70%, duraram até 20 minutos, considerando as classes apresentadas.

## 7. Classes e intervalos

Quando a variável numérica possui muitos valores diferentes, podemos agrupá-los em intervalos, chamados classes.

Exemplo: idades 18, 19, 20, 21, 22, 23, 24, 25 podem ser agrupadas em:
- 18 a 20;
- 21 a 23;
- 24 a 26.

A classe precisa ter limites claros e não pode deixar dúvidas sobre em qual intervalo um valor será contado. Em dados contínuos, é comum adotar intervalos fechados em um limite e abertos no outro, conforme a convenção indicada.

**Cuidado:** não conte um mesmo valor em duas classes diferentes.

## 8. Como resolver questões de prova

1. Identifique o total de observações.
2. Se a pergunta pedir quantidade, procure f.
3. Se pedir proporção ou percentual, calcule f/n.
4. Se pedir “até”, “no máximo”, “acumulado” ou “abaixo de determinada classe”, some progressivamente.
5. Confira se a soma das frequências absolutas bate com o total.
6. Confira se as frequências relativas totalizam aproximadamente 100%.

## 9. Pegadinhas comuns

- 8 observações não significa 8%.
- 0,25 equivale a 25%, não a 0,25%.
- A última frequência acumulada deve corresponder ao total.
- A frequência relativa depende do denominador.
- Percentuais podem somar 99,9% ou 100,1% por arredondamento.
- Não se deve acumular categorias nominais sem uma ordem interpretável.
- Em uma tabela agrupada, confira os limites das classes.

## 10. Treino autoral comentado

**1.** Em 60 registros, 15 pertencem a uma categoria. A frequência relativa é 25%. **Certo.** 15/60 × 100 = 25%.

**2.** Frequências absolutas 4, 7 e 9 geram frequências acumuladas 4, 11 e 20. **Certo.** A soma é progressiva.

**3.** Se uma classe possui frequência absoluta 12, sua frequência relativa será sempre 12%. **Errado.** É preciso conhecer o total. Com 60 observações, seria 20%.

**4.** A última frequência absoluta acumulada deve ser igual à soma de todas as frequências absolutas. **Certo.** Ela reúne todas as observações.

**5.** Frequência relativa é uma contagem em números inteiros. **Errado.** É proporção ou percentual.

**6.** Em 80 registros, 20 correspondem a uma categoria. A frequência relativa é 0,25. **Certo.** 20/80 = 0,25 = 25%.

**7.** A frequência acumulada pode ser interpretada como quantidade até determinada classe, quando as classes estão ordenadas. **Certo.** Essa é sua finalidade.

**8.** Em uma tabela, frequências relativas de 20%, 30% e 50% somam 100%. **Certo.** O conjunto representa a totalidade.

**9.** Se as frequências forem 5, 8 e 7, o total é 20 e a acumulada final é 20. **Certo.** 5 + 8 + 7 = 20.

**10.** Em categorias sem ordem natural, a frequência acumulada sempre possui interpretação estatística natural. **Errado.** A acumulação exige uma ordenação significativa.

## 11. Revisão final

Absoluta = quantidade.
Relativa = parte do total.
Percentual = relativa × 100.
Acumulada = soma progressiva.
Relativa acumulada = percentual acumulado.
Última acumulada = total (ou 100%, na relativa).

Antes de marcar a alternativa, pergunte: a banca quer contagem, percentual ou total acumulado?','[{"b":"Quantidade de observações em uma categoria ou classe.","f":"O que é frequência absoluta?"},{"b":"Dividir a frequência absoluta pelo total de observações.","f":"Como calcular frequência relativa?"},{"b":"Multiplicar a proporção por 100.","f":"Como converter frequência relativa em percentual?"},{"b":"Soma progressiva das frequências absolutas.","f":"O que é frequência acumulada?"},{"b":"Soma progressiva das frequências relativas, ou frequência acumulada dividida pelo total.","f":"O que é frequência relativa acumulada?"},{"b":"40%.","f":"Se 8 de 20 registros pertencem a uma categoria, qual o percentual?"},{"b":"O total de observações.","f":"Qual deve ser a última frequência absoluta acumulada?"},{"b":"1 ou 100%, ressalvados arredondamentos.","f":"Qual deve ser a última frequência relativa acumulada?"},{"b":"Porque o percentual depende do total usado como referência.","f":"Por que o denominador é importante na frequência relativa?"},{"b":"Em regra, não há interpretação substantiva sem uma ordem significativa.","f":"É adequado acumular categorias nominais sem ordem?"}]','[{"a":true,"q":"Frequência absoluta corresponde à quantidade de observações de uma classe.","why":"É uma contagem."},{"a":true,"q":"Se 15 de 60 registros pertencem a uma categoria, a frequência relativa é 25%.","why":"15/60 × 100 = 25%."},{"a":false,"q":"Uma frequência absoluta de 12 significa necessariamente 12%.","why":"O percentual depende do total de observações."},{"a":true,"q":"A frequência acumulada é obtida pela soma progressiva das frequências.","why":"Cada classe incorpora a frequência anterior."},{"a":true,"q":"A última frequência absoluta acumulada deve ser igual ao total de observações.","why":"A última classe acumula todos os registros."},{"a":false,"q":"A frequência relativa acumulada final deve ser 50%.","why":"Ela deve alcançar 100%, salvo arredondamentos."},{"a":true,"q":"Uma frequência relativa de 0,25 equivale a 25%.","why":"Multiplica-se a proporção por 100."},{"a":false,"q":"É sempre adequado acumular tipos de ocorrência sem ordem natural.","why":"A acumulação exige ordem interpretável."},{"a":true,"q":"Frequências absolutas 4, 7 e 9 produzem acumuladas 4, 11 e 20.","why":"4; 4+7; 4+7+9."},{"a":true,"q":"Percentuais podem totalizar 99,9% por causa de arredondamentos.","why":"Pequenas diferenças de arredondamento podem ocorrer."}]'),
('pcac-2026-estatistica-03-tabelas-graficos-interpretacao','Aula aprofundada sobre tabelas, gráficos de barras, linhas, setores e histogramas, leitura de escalas, interpretação crítica e questões comentadas.','# Aula 3 — Tabelas e gráficos estatísticos

## 1. Para que servem tabelas e gráficos?

Tabelas e gráficos organizam dados para facilitar comparação, identificação de padrões e comunicação dos resultados.

Imagine que uma tabela tenha registros de ocorrências de 12 municípios durante um ano. Uma tabela permite consultar os números exatos; um gráfico pode facilitar a comparação visual.

A representação não substitui a interpretação. Antes de concluir, é preciso entender o que está sendo medido.

## 2. Como ler uma tabela corretamente

Antes de olhar os números, confira:
1. Título: qual assunto está sendo apresentado?
2. Período: qual mês, ano ou intervalo?
3. Unidade: pessoas, ocorrências, reais, minutos ou percentual?
4. Linhas e colunas: o que cada uma representa?
5. Fonte: de onde vieram os dados?
6. Universo: são todos os registros ou apenas uma amostra?

**Exemplo:** uma tabela mostra 120 ocorrências em uma cidade. Sem saber o período e a população de referência, não é possível comparar corretamente com outra cidade.

## 3. Gráfico de barras

Usa barras separadas para comparar categorias.

Exemplos:
- ocorrências por município;
- quantidade de atendimentos por turno;
- candidatos aprovados por modalidade.

**Como interpretar:**
- barra mais alta: maior valor, se o eixo estiver corretamente orientado;
- barras com alturas próximas: valores semelhantes;
- grande diferença de altura: diferença maior na escala apresentada.

**Cuidado com o eixo:** se o eixo vertical começar em 90 em vez de zero, uma diferença pequena pode parecer enorme. Leia sempre os valores da escala.

## 4. Gráfico de linhas

Mostra observações conectadas em uma sequência, normalmente ao longo do tempo.

Exemplo: número de ocorrências de janeiro a dezembro.

É útil para observar:
- tendência crescente;
- tendência decrescente;
- estabilidade;
- oscilações;
- picos e quedas.

Uma subida em um único mês não prova tendência de longo prazo. É necessário observar a sequência.

**Pegadinha:** a linha pode sugerir continuidade, mas confira se os períodos são igualmente espaçados e se não há meses ausentes.

## 5. Gráfico de setores

É um círculo dividido em partes proporcionais ao total.

Exemplo: 100 atendimentos:
- 50% no turno da manhã;
- 30% no turno da tarde;
- 20% no turno da noite.

O círculo representa 100% do conjunto. Cada setor representa uma parcela.

**Cálculo do ângulo**, quando necessário:

Ângulo = percentual × 360°.

Para 25%: 0,25 × 360° = 90°.

É adequado para mostrar composição, desde que as categorias representem partes do mesmo total e sejam mutuamente exclusivas na classificação usada.

## 6. Histograma

Representa a distribuição de uma variável quantitativa agrupada em intervalos de classe.

Exemplo: tempos de atendimento:
- 0 a 10 minutos;
- 10 a 20 minutos;
- 20 a 30 minutos.

As barras aparecem encostadas porque os intervalos representam uma escala numérica contínua.

**Diferença essencial:**
- Gráfico de barras: compara categorias separadas.
- Histograma: mostra distribuição de dados quantitativos por intervalos.

Em histogramas com larguras de classe diferentes, a interpretação da altura pode depender da densidade de frequência, não apenas da contagem bruta. Observe o que os eixos informam.

## 7. Como escolher o gráfico adequado

| Objetivo | Representação comum |
|---|---|
| Comparar categorias | Barras |
| Acompanhar evolução temporal | Linhas |
| Mostrar partes de um total | Setores |
| Ver distribuição por intervalos numéricos | Histograma |

A escolha depende do tipo de dado e da pergunta. Não existe um gráfico universalmente melhor.

## 8. Escala, distorção e leitura crítica

Um gráfico pode ser visualmente convincente e, ainda assim, induzir a uma conclusão errada.

Confira:
- eixo começa em zero ou foi truncado?
- os intervalos da escala são iguais?
- os gráficos usam a mesma unidade?
- o período é o mesmo?
- há categorias omitidas?
- o tamanho das figuras representa os valores corretamente?
- o gráfico mostra valores absolutos ou percentuais?

**Exemplo:** Município A tem 200 ocorrências e Município B tem 100. A possui o dobro em números absolutos. Mas, se A tem 200 mil habitantes e B tem 50 mil, as taxas por habitante podem contar outra história.

## 9. Exemplo resolvido

Uma pesquisa acompanha ocorrências mensais:
Janeiro 20, fevereiro 25, março 30, abril 18.

**Pergunta 1:** qual gráfico ajuda a visualizar a evolução ao longo dos meses?
Resposta: linhas, pois os meses formam uma sequência temporal.

**Pergunta 2:** qual mês teve maior valor?
Março, com 30.

**Pergunta 3:** houve crescimento contínuo?
Não. O valor subiu de janeiro a março e caiu em abril.

**Pergunta 4:** o gráfico prova por que houve queda?
Não. Ele apresenta os valores, mas não identifica sozinho a causa.

## 10. Método para questões

1. Leia o título e o período.
2. Descubra o que está em cada eixo.
3. Confira unidade e escala.
4. Identifique se os dados são categorias, tempo, partes de um todo ou intervalos numéricos.
5. Leia os valores antes de comparar.
6. Não confunda associação visual com explicação causal.

## 11. Pegadinhas comuns

- Histograma não é simplesmente gráfico de barras com outro nome.
- Barras de histograma normalmente ficam encostadas.
- Gráfico de linhas é apropriado para sequências temporais.
- Gráfico de setores representa composição de um total.
- Eixo truncado pode exagerar diferenças.
- Percentual precisa de denominador.
- Gráfico não prova causalidade.
- Uma tendência não deve ser concluída por um único ponto.

## 12. Treino autoral comentado

**1.** Comparar a quantidade de ocorrências em vários municípios é uma situação adequada para gráfico de barras. **Certo.** O objetivo é comparar categorias.

**2.** Acompanhar ocorrências mês a mês é uma situação adequada para gráfico de linhas. **Certo.** Os meses formam uma sequência temporal.

**3.** O histograma representa categorias nominais sem ordem. **Errado.** Representa distribuição de variável quantitativa por intervalos.

**4.** Em um gráfico de setores, as partes representam a composição de um total. **Certo.** Os setores correspondem às parcelas do todo.

**5.** Um eixo vertical truncado pode exagerar visualmente diferenças. **Certo.** O ponto de partida da escala altera a percepção visual.

**6.** Um gráfico de linhas que mostra aumento em um mês prova tendência crescente. **Errado.** É necessário observar vários períodos.

**7.** Se 25% de um total for representado em um círculo, o setor terá 90°. **Certo.** 0,25 × 360° = 90°.

**8.** Dois municípios com totais absolutos diferentes podem ter taxas por habitante em ordem diferente. **Certo.** Os denominadores podem alterar a comparação.

**9.** A legenda e a unidade são dispensáveis quando o gráfico é colorido. **Errado.** Cores não substituem informação sobre o que está sendo medido.

**10.** Um gráfico pode mostrar associação temporal, mas não provar sozinho a causa da mudança. **Certo.** Causalidade exige outras evidências.

## 13. Revisão final

Barras = comparação entre categorias.
Linhas = evolução em sequência.
Setores = composição percentual.
Histograma = distribuição por intervalos quantitativos.
Sempre confira título, fonte, período, unidade, legenda e escala.','[{"b":"Organizar dados em linhas e colunas para facilitar consulta e comparação.","f":"Para que serve uma tabela estatística?"},{"b":"Para comparar quantidades entre categorias.","f":"Quando usar gráfico de barras?"},{"b":"Para observar evolução e oscilações em uma sequência, frequentemente temporal.","f":"Quando usar gráfico de linhas?"},{"b":"A composição de um total em partes proporcionais.","f":"O que mostra um gráfico de setores?"},{"b":"A distribuição de uma variável quantitativa agrupada em intervalos.","f":"O que representa um histograma?"},{"b":"Porque representam intervalos contíguos de uma escala numérica.","f":"Por que as barras do histograma ficam encostadas?"},{"b":"Percentual em forma decimal multiplicado por 360 graus.","f":"Como calcular o ângulo de um setor?"},{"b":"Exagerar visualmente diferenças entre valores.","f":"O que um eixo truncado pode provocar?"},{"b":"Título, período, unidade, eixos, legenda, fonte e escala.","f":"Quais informações devem ser conferidas ao ler um gráfico?"},{"b":"Não. Ele mostra dados e padrões, mas não prova sozinho a causa.","f":"Um gráfico prova causalidade?"}]','[{"a":true,"q":"Gráfico de barras é adequado para comparar quantidades entre municípios.","why":"Municípios são categorias a comparar."},{"a":true,"q":"Gráfico de linhas é útil para acompanhar valores ao longo dos meses.","why":"A sequência temporal permite observar tendências e oscilações."},{"a":false,"q":"No histograma, as barras normalmente ficam separadas para indicar categorias nominais.","why":"No histograma, as barras ficam encostadas para representar intervalos contíguos."},{"a":true,"q":"Gráfico de setores representa partes de um total.","why":"Cada setor representa uma parcela da composição."},{"a":true,"q":"Um eixo vertical truncado pode fazer uma diferença pequena parecer muito grande.","why":"A escala visual pode distorcer a percepção."},{"a":false,"q":"Um único mês de aumento prova tendência crescente de longo prazo.","why":"Tendência exige observar vários períodos."},{"a":true,"q":"25% de um círculo correspondem a 90 graus.","why":"0,25 × 360 = 90."},{"a":true,"q":"Comparar taxas por habitante pode ser mais informativo do que comparar totais entre municípios de tamanhos diferentes.","why":"O denominador permite considerar o tamanho das populações."},{"a":false,"q":"A legenda pode ser ignorada se as barras tiverem cores diferentes.","why":"A legenda explica o significado das cores e séries."},{"a":true,"q":"Um gráfico não demonstra causalidade apenas por apresentar duas séries que se movem juntas.","why":"Associação visual não basta para estabelecer causa e efeito."}]'),
('pcac-2026-estatistica-04-medidas-tendencia-central-media','Aula aprofundada de média simples e ponderada, interpretação, efeitos de valores extremos, cálculo passo a passo e exercícios comentados.','# Aula 4 — Média aritmética simples e ponderada

## 1. O que é uma medida de tendência central?

Uma medida de tendência central tenta resumir um conjunto de dados por um valor que represente seu centro ou comportamento típico.

Nesta aula, o foco é a média aritmética simples e ponderada. Média, mediana e moda são medidas diferentes: não escolha uma sem observar o que o enunciado pede.

## 2. Média aritmética simples

É calculada somando todos os valores e dividindo pela quantidade de observações.

**Média = soma dos valores ÷ quantidade de valores**

Exemplo: notas 6, 7 e 8.

1. Some: 6 + 7 + 8 = 21.
2. Conte: são 3 notas.
3. Divida: 21 ÷ 3 = 7.

A média é 7.

**Dica mental:** a média é como repartir igualmente a soma entre todos os elementos.

## 3. Exemplo aplicado

Uma equipe realizou 5 atendimentos com durações de 10, 12, 14, 16 e 18 minutos.

Soma = 10 + 12 + 14 + 16 + 18 = 70.
Quantidade = 5.
Média = 70 ÷ 5 = 14 minutos.

Interpretação: se o tempo total fosse distribuído igualmente entre os cinco atendimentos, cada um corresponderia a 14 minutos.

A média não significa que todos os atendimentos duraram 14 minutos.

## 4. Média ponderada

Na média ponderada, cada valor tem um peso diferente. O peso informa quanto aquele valor participa do resultado.

**Média ponderada = Σ(valor × peso) ÷ Σ(pesos)**

Exemplo: uma avaliação possui:
- prova 1: nota 6, peso 2;
- prova 2: nota 8, peso 3.

Passo a passo:
1. Multiplique 6 × 2 = 12.
2. Multiplique 8 × 3 = 24.
3. Some os produtos: 12 + 24 = 36.
4. Some os pesos: 2 + 3 = 5.
5. Divida: 36 ÷ 5 = 7,2.

A média ponderada é 7,2.

**Pegadinha:** não divida por 2 (número de notas). Divida pela soma dos pesos, que é 5.

## 5. Quando uma média simples pode ser inadequada?

Imagine duas provas:
- prova A: 10 questões;
- prova B: 90 questões.

Se as duas notas tiverem pesos diferentes, não se deve tratar automaticamente cada uma como equivalente. O enunciado informa a ponderação a aplicar.

A média ponderada é útil quando as observações possuem pesos, frequências ou importância diferente, desde que o peso seja definido pelo problema.

## 6. Média e valores extremos

A média utiliza todos os valores. Por isso, um número muito alto ou muito baixo pode puxá-la.

Exemplo: 2, 2, 2, 2 e 12.

Soma = 20.
Quantidade = 5.
Média = 4.

Mas quatro dos cinco valores são 2. A média 4 não coincide com a maioria das observações.

Isso não significa que a média esteja matematicamente errada; significa que ela precisa ser interpretada com o contexto e, às vezes, comparada à mediana.

## 7. Como resolver sem se perder

1. Copie os valores e conte quantos são.
2. Se todos tiverem o mesmo peso, some e divida pela quantidade.
3. Se houver pesos, multiplique cada valor pelo respectivo peso.
4. Some os produtos.
5. Divida pela soma dos pesos.
6. Confira se o resultado faz sentido em relação aos valores observados.

**Teste de coerência:** a média simples deve ficar entre o menor e o maior valor. Se seu resultado ficar fora desse intervalo, revise a soma ou a divisão.

## 8. Exemplos resolvidos

**Exemplo A — média simples:** 4, 6, 8, 10.

Soma = 28; quantidade = 4; média = 7.

**Exemplo B — média ponderada:** nota 7 com peso 1 e nota 9 com peso 3.

(7×1 + 9×3) ÷ (1+3)
= (7+27) ÷ 4
= 34 ÷ 4
= 8,5.

**Exemplo C — descobrir um valor ausente:** a média de quatro números é 10. Três deles são 8, 9 e 11. Qual é o quarto?

A soma total deve ser 4 × 10 = 40.
Os conhecidos somam 8 + 9 + 11 = 28.
Valor ausente = 40 − 28 = 12.

**Exemplo D — efeito de valor extremo:** conjunto 4, 5, 5, 6, 40.

Soma = 60; quantidade = 5; média = 12.
O valor 40 elevou a média. A mediana é 5, mostrando um centro menos afetado pelo valor extremo.

## 9. Diferença entre média, mediana e moda

- Média: soma dividida pela quantidade.
- Mediana: valor central depois de ordenar.
- Moda: valor ou categoria mais frequente.

Exemplo: 2, 4, 4, 5, 15.
- Média: 30 ÷ 5 = 6.
- Mediana: 4.
- Moda: 4.

A média é 6, mas o valor central e o mais frequente são 4.

## 10. Pegadinhas de prova

- Média simples não usa pesos diferentes.
- Média ponderada divide pela soma dos pesos.
- Não confunda quantidade de valores com soma dos pesos.
- A média pode ser afetada por valores extremos.
- A média não precisa coincidir com um valor observado.
- Se a média de n valores é m, a soma é n×m.
- Para descobrir valor ausente, calcule primeiro a soma total.
- Confira se as unidades são comparáveis.

## 11. Treino autoral comentado

**1.** A média simples de 4, 6 e 8 é 6. **Certo.** (4+6+8)/3 = 6.

**2.** A média ponderada de 6 com peso 2 e 8 com peso 3 é 7,2. **Certo.** (12+24)/5 = 7,2.

**3.** Em uma média ponderada, divide-se pela quantidade de notas, independentemente dos pesos. **Errado.** Divide-se pela soma dos pesos.

**4.** A média de 2, 2, 2, 2 e 12 é 4. **Certo.** Soma 20 dividida por 5.

**5.** A média precisa ser um dos valores observados. **Errado.** Pode ser um valor que não aparece no conjunto.

**6.** Se a média de 5 observações é 8, a soma é 40. **Certo.** Soma = média × quantidade.

**7.** Se a média de quatro números é 10 e três somam 28, o quarto é 12. **Certo.** Soma total 40; 40−28=12.

**8.** A média é resistente a valores extremos. **Errado.** Ela pode ser bastante influenciada por valores extremos.

**9.** Para notas 7 (peso 1) e 9 (peso 3), a média ponderada é 8,5. **Certo.** (7+27)/4 = 8,5.

**10.** A mediana é obtida somando os valores e dividindo pela quantidade. **Errado.** Essa é a média; mediana exige ordenar e localizar o centro.

## 12. Revisão final

Média simples: soma ÷ quantidade.
Média ponderada: soma dos produtos ÷ soma dos pesos.
Soma total: média × quantidade.
Valor ausente: soma total − soma dos conhecidos.
Valor extremo pode puxar a média.

Na prova, destaque no enunciado as palavras “peso”, “ponderada”, “média” e “quantidade”.','[{"b":"Somar os valores e dividir pela quantidade de observações.","f":"Como calcular média aritmética simples?"},{"b":"Σ(valor × peso) ÷ Σ(pesos).","f":"Qual é a fórmula da média ponderada?"},{"b":"6.","f":"Qual é a média simples de 4, 6 e 8?"},{"b":"7,2.","f":"Qual é a média ponderada de 6 (peso 2) e 8 (peso 3)?"},{"b":"Porque valores extremos podem puxar o resultado.","f":"Por que a média pode não representar a maioria?"},{"b":"Soma = média × quantidade.","f":"Como encontrar a soma quando se conhece média e quantidade?"},{"b":"Calcule a soma total pela média e subtraia a soma dos valores conhecidos.","f":"Como encontrar um valor ausente?"},{"b":"Não. Pode ser um número que não aparece no conjunto.","f":"A média precisa ser um valor observado?"},{"b":"Média soma e divide; mediana é o valor central após ordenar.","f":"Qual a diferença entre média e mediana?"},{"b":"Porque é o denominador da média ponderada.","f":"Por que conferir a soma dos pesos?"}]','[{"a":true,"q":"A média simples de 4, 6 e 8 é 6.","why":"A soma é 18 e há três valores: 18/3=6."},{"a":true,"q":"A média ponderada de 6 com peso 2 e 8 com peso 3 é 7,2.","why":"(6×2+8×3)/(2+3)=36/5=7,2."},{"a":false,"q":"Na média ponderada, divide-se sempre pela quantidade de notas.","why":"Divide-se pela soma dos pesos."},{"a":true,"q":"A média de 2, 2, 2, 2 e 12 é 4.","why":"A soma 20 dividida por 5 resulta em 4."},{"a":false,"q":"A média precisa ser igual a um dos valores observados.","why":"A média pode não coincidir com nenhum valor do conjunto."},{"a":true,"q":"Se a média de cinco observações é 8, a soma dos valores é 40.","why":"Soma=média×quantidade=8×5."},{"a":true,"q":"Se a média de quatro valores é 10 e três somam 28, o quarto valor é 12.","why":"A soma total é 40; 40−28=12."},{"a":false,"q":"A média aritmética é pouco afetada por valores extremos.","why":"A média considera todos os valores e pode ser puxada pelos extremos."},{"a":true,"q":"Com notas 7 (peso 1) e 9 (peso 3), a média ponderada é 8,5.","why":"(7+27)/4=8,5."},{"a":false,"q":"Mediana é a soma dos valores dividida pela quantidade.","why":"Essa é a definição da média aritmética."}]'),
('pcac-2026-estatistica-05-dispersao-coeficiente-variacao','Aula aprofundada de amplitude, variância, desvio-padrão, coeficiente de variação e comparação de dispersões, com fórmulas e exemplos resolvidos.','# Aula 5 — Medidas de dispersão e coeficiente de variação

## 1. Centro não conta a história toda

Duas turmas podem ter a mesma média e desempenhos muito diferentes.

Turma A: 9, 10, 11.
Turma B: 2, 10, 18.

Média de A = 10.
Média de B = 10.

Mas os valores de B estão muito mais espalhados. As medidas de dispersão mostram o quanto os dados variam.

## 2. Amplitude total

É a diferença entre o maior e o menor valor:

**Amplitude = máximo − mínimo**

Turma A: 11−9=2.
Turma B: 18−2=16.

A turma B possui amplitude maior.

**Limitação:** a amplitude considera apenas dois valores, o máximo e o mínimo. Alterações nos valores intermediários não mudam a amplitude.

## 3. Variância: ideia central

A variância mede a dispersão em relação à média, utilizando os desvios elevados ao quadrado.

Passos intuitivos:
1. Calcule a média.
2. Subtraia a média de cada valor.
3. Eleve cada diferença ao quadrado.
4. Some os quadrados.
5. Divida pelo divisor adequado à população ou à amostra.

Por que elevar ao quadrado? Porque desvios positivos e negativos não devem se cancelar, e desvios maiores recebem peso maior.

### Variância populacional

Quando todos os elementos da população definida foram observados:

**σ² = Σ(x−μ)² ÷ N**

- μ: média populacional.
- N: número de elementos da população.

### Variância amostral

Na fórmula amostral usual para estimar a variância populacional:

**s² = Σ(x−x̄)² ÷ (n−1)**

- x̄: média amostral.
- n: tamanho da amostra.

**Atenção de prova:** observe se a questão pede variância populacional ou amostral e qual convenção de divisor foi indicada. Não troque N por n−1 sem ler o enunciado.

## 4. Exemplo de variância populacional

Considere todos os valores da população: 2, 4 e 6.

1. Média: (2+4+6)/3 = 4.
2. Desvios: −2, 0 e +2.
3. Quadrados: 4, 0 e 4.
4. Soma dos quadrados: 8.
5. Variância populacional: 8/3 ≈ 2,67.

O cálculo mostra a dispersão em torno da média.

## 5. Desvio-padrão

É a raiz quadrada da variância.

**Desvio-padrão = √variância**

No exemplo anterior:
DP = √(8/3) ≈ 1,63.

A variância fica em unidades ao quadrado. O desvio-padrão retorna à unidade original dos dados, o que facilita a interpretação.

Exemplo: se a variável é tempo em minutos, o desvio-padrão também é expresso em minutos.

**Interpretação geral:** quanto maior o desvio-padrão, maior tende a ser a dispersão em torno da média, dentro de conjuntos comparáveis.

## 6. Coeficiente de variação (CV)

O coeficiente de variação expressa o desvio-padrão como percentual da média:

**CV = (DP ÷ média) × 100%**

Exemplo:
- média = 20;
- desvio-padrão = 5.

CV = (5/20)×100 = 25%.

Interpretação: o desvio-padrão corresponde a 25% da média.

O CV ajuda a comparar dispersão relativa, especialmente quando as médias ou escalas diferem, desde que a comparação seja apropriada.

## 7. Comparando dois conjuntos pelo CV

Conjunto A:
- média = 50;
- DP = 5;
- CV = 5/50×100 = 10%.

Conjunto B:
- média = 20;
- DP = 4;
- CV = 4/20×100 = 20%.

O conjunto B apresenta maior dispersão relativa, embora seu desvio-padrão absoluto seja menor.

**Pegadinha:** não compare apenas os desvios-padrão quando a questão pede variabilidade relativa.

## 8. Quando o CV exige cuidado?

O CV pode ser inadequado ou instável quando:
- a média é zero: divisão indefinida;
- a média está muito próxima de zero: o resultado pode ficar exagerado;
- a escala não possui zero significativo;
- os conjuntos não são comparáveis em natureza.

Não conclua que todo CV maior é sempre melhor ou pior. Ele apenas indica maior dispersão relativa no contexto apropriado.

## 9. Como resolver questões

1. Se pedir amplitude, subtraia mínimo de máximo.
2. Se pedir variância, calcule desvios em relação à média, eleve ao quadrado e use o divisor indicado.
3. Se pedir desvio-padrão, tire a raiz da variância.
4. Se pedir CV, divida DP pela média e multiplique por 100.
5. Identifique se a questão trata de população ou amostra.
6. Confira unidades e comparabilidade.

## 10. Pegadinhas frequentes

- Média mede centro; variância e DP medem dispersão.
- Amplitude considera somente máximo e mínimo.
- Desvio-padrão é a raiz da variância.
- Variância usa desvios ao quadrado.
- DP fica na unidade original.
- CV é percentual relativo à média.
- DP menor não significa necessariamente CV menor.
- Fórmula amostral e populacional podem usar divisores diferentes.
- CV com média zero é indefinido.

## 11. Treino autoral comentado

**1.** A amplitude de 2, 10 e 18 é 16. **Certo.** 18−2=16.

**2.** Dois conjuntos com a mesma média necessariamente possuem a mesma dispersão. **Errado.** A distribuição pode ser diferente.

**3.** O desvio-padrão é a raiz quadrada da variância. **Certo.** Essa é a relação matemática.

**4.** Média 20 e DP 5 resultam em CV de 25%. **Certo.** 5/20×100=25%.

**5.** Média 50 e DP 5 resultam em CV de 20%. **Errado.** O CV é 10%.

**6.** A variância utiliza desvios elevados ao quadrado. **Certo.** Isso evita cancelamento entre desvios positivos e negativos.

**7.** O DP é expresso na unidade original dos dados. **Certo.** A raiz da variância retorna à unidade original.

**8.** A amplitude considera todos os valores com o mesmo peso. **Errado.** Ela depende apenas do máximo e do mínimo.

**9.** CV com média zero pode ser calculado normalmente. **Errado.** A divisão por zero é indefinida.

**10.** O CV de 20% indica que o desvio-padrão equivale a 20% da média. **Certo.** Essa é a interpretação da medida.

## 12. Revisão final

Amplitude = máximo−mínimo.
Variância = média dos desvios quadráticos, com divisor adequado.
Desvio-padrão = raiz da variância.
CV = DP/média × 100%.
Centro e dispersão são conceitos diferentes.

Quando o enunciado comparar grupos com médias distintas, observe se ele pede dispersão absoluta ou relativa.','[{"b":"O quanto os valores variam ou se espalham em torno de uma referência.","f":"O que medem as medidas de dispersão?"},{"b":"Maior valor menos menor valor.","f":"Como calcular amplitude?"},{"b":"Dispersão em relação à média por meio dos desvios ao quadrado.","f":"O que mede a variância?"},{"b":"σ² = Σ(x−μ)² ÷ N.","f":"Qual a fórmula da variância populacional?"},{"b":"s² = Σ(x−x̄)² ÷ (n−1), no estimador amostral usual.","f":"Qual a fórmula amostral usual da variância?"},{"b":"Extrair a raiz quadrada da variância.","f":"Como calcular desvio-padrão?"},{"b":"A mesma unidade original da variável.","f":"Qual a unidade do desvio-padrão?"},{"b":"CV = (DP ÷ média) × 100%.","f":"Qual a fórmula do coeficiente de variação?"},{"b":"Permite comparar dispersões relativas quando os conjuntos são comparáveis.","f":"Por que o CV é útil?"},{"b":"Quando a média é zero.","f":"Quando o CV é indefinido?"}]','[{"a":true,"q":"A amplitude é o maior valor menos o menor valor.","why":"Essa é a definição da amplitude total."},{"a":false,"q":"Conjuntos com a mesma média necessariamente têm a mesma dispersão.","why":"Os valores podem estar muito mais espalhados em um conjunto."},{"a":true,"q":"O desvio-padrão é a raiz quadrada da variância.","why":"É a relação entre as medidas."},{"a":true,"q":"Com média 20 e DP 5, o CV é 25%.","why":"5/20×100=25%."},{"a":false,"q":"Com média 50 e DP 5, o CV é 20%.","why":"5/50×100=10%."},{"a":true,"q":"A variância utiliza desvios em relação à média elevados ao quadrado.","why":"Os quadrados impedem cancelamento de desvios positivos e negativos."},{"a":true,"q":"O desvio-padrão retorna à unidade original dos dados.","why":"A raiz da unidade ao quadrado recupera a unidade original."},{"a":false,"q":"A amplitude depende de todos os valores intermediários.","why":"Ela considera apenas o maior e o menor valor."},{"a":false,"q":"O coeficiente de variação pode ser calculado normalmente quando a média é zero.","why":"A divisão por zero é indefinida."},{"a":true,"q":"Um CV de 20% indica que o desvio-padrão corresponde a 20% da média.","why":"Essa é a interpretação percentual do CV."}]'),
('pcac-2026-estatistica-06-probabilidade-eventos-condicional','Aula aprofundada de probabilidade: experimento, espaço amostral, eventos, complemento, união, interseção, probabilidade condicional e independência.','# Aula 6 — Probabilidade, eventos, espaço amostral e independência

## 1. O que é probabilidade?

Probabilidade é uma medida da chance de um evento ocorrer. Ela varia de 0 a 1, ou de 0% a 100%.

- 0: evento impossível.
- 1: evento certo.
- 0,5: chance de 50%.

Exemplo cotidiano: ao lançar uma moeda equilibrada, há duas possibilidades: cara ou coroa. A chance de cada resultado é 1/2, ou 50%.

## 2. Experimento aleatório, espaço amostral e evento

**Experimento aleatório:** procedimento cujo resultado não pode ser previsto com certeza antes da realização, mesmo conhecendo os resultados possíveis.

**Espaço amostral (Ω):** conjunto de todos os resultados possíveis.

**Evento:** conjunto de resultados de interesse dentro do espaço amostral.

Exemplo: lançar um dado comum.
Ω = {1,2,3,4,5,6}.
Evento A = sair número par = {2,4,6}.

O evento é parte do espaço amostral.

## 3. Probabilidade em resultados equiprováveis

Quando todos os resultados possíveis têm a mesma chance:

**P(A) = casos favoráveis ÷ casos possíveis**

No dado:
- Casos possíveis: 6.
- Casos favoráveis para número par: 3.
- P(A)=3/6=1/2=50%.

**Atenção:** essa fórmula simples exige resultados equiprováveis. Se os resultados não tiverem a mesma chance, não basta contar casos.

## 4. Evento complementar

O complemento de A é o evento “A não ocorre”.

**P(não A) = 1 − P(A)**

Exemplo: se a chance de um evento ocorrer é 30%, a chance de não ocorrer é 70%.

Por que funciona? Porque A e seu complemento cobrem todas as possibilidades e não acontecem juntos.

## 5. União e interseção

**União (A ∪ B):** ocorre A ou B, incluindo a possibilidade de ambos ocorrerem.

**Interseção (A ∩ B):** A e B ocorrem simultaneamente.

Exemplo com dado:
- A = sair número par = {2,4,6}.
- B = sair número maior que 4 = {5,6}.
- A ∩ B = {6}.
- A ∪ B = {2,4,5,6}.

### Regra geral da união

**P(A ∪ B) = P(A) + P(B) − P(A ∩ B)**

Subtrai-se a interseção porque ela foi contada duas vezes na soma inicial.

Se A e B forem mutuamente exclusivos, a interseção é vazia e a fórmula fica P(A∪B)=P(A)+P(B).

## 6. Eventos mutuamente exclusivos

São eventos que não podem ocorrer juntos na mesma realização.

Exemplo: em um único lançamento de dado, sair 2 e sair 5 são eventos mutuamente exclusivos.

Isso é diferente de independência.

- Mutuamente exclusivos: não ocorrem simultaneamente.
- Independentes: a ocorrência de um não altera a probabilidade do outro.

Se dois eventos mutuamente exclusivos têm probabilidades positivas, eles não são independentes, pois saber que um ocorreu torna impossível o outro naquela realização.

## 7. Probabilidade condicional

É a chance de A ocorrer sabendo que B já ocorreu.

**P(A|B) = P(A∩B) ÷ P(B)**, desde que P(B)>0.

A barra “|” deve ser lida como “dado que” ou “sabendo que”.

Exemplo: em uma caixa há 10 fichas:
- 6 azuis;
- 4 vermelhas.

Sabendo que a ficha retirada é azul, qual é a probabilidade de ela ter número par? Suponha que, entre as 6 azuis, 2 sejam pares.

A condição limita o universo às 6 fichas azuis.
Probabilidade = 2/6 = 1/3.

**Técnica:** quando aparecer “sabendo que”, “dado que” ou “entre os que”, reduza o universo ao grupo condicionado.

## 8. Independência

A e B são independentes quando a ocorrência de um não altera a chance do outro.

Uma condição matemática equivalente é:

**P(A∩B)=P(A)×P(B)**

Exemplo: lançar uma moeda e um dado equilibrados. O resultado da moeda não altera a chance de sair 6 no dado.

Se P(cara)=1/2 e P(seis)=1/6:
P(cara e seis)=1/2×1/6=1/12.

## 9. Como resolver questões

1. Escreva o espaço amostral.
2. Identifique o evento pedido.
3. Conte casos favoráveis e possíveis, se forem equiprováveis.
4. Se pedir “não”, use o complemento.
5. Se pedir “A ou B”, pense em união e verifique a interseção.
6. Se pedir “A e B”, pense em interseção.
7. Se disser “sabendo que”, use probabilidade condicional.
8. Se falar em independência, verifique se uma ocorrência altera a chance da outra.

## 10. Pegadinhas

- Probabilidade está entre 0 e 1.
- A fórmula favoráveis/possíveis exige equiprobabilidade.
- Complemento = 1−P(A).
- “Ou” inclui a possibilidade de ambos, salvo indicação contrária.
- “E” indica ocorrência conjunta.
- Mutuamente exclusivos não é sinônimo de independentes.
- Condicional restringe o universo.
- Independência pode ser verificada pelo produto.
- Correlação ou associação observada não substitui o conceito matemático de independência.

## 11. Treino autoral comentado

**1.** O espaço amostral de um dado comum é {1,2,3,4,5,6}. **Certo.** São todos os resultados possíveis.

**2.** A probabilidade de sair número par em dado justo é 1/2. **Certo.** Três resultados favoráveis em seis.

**3.** Se P(A)=0,3, então P(não A)=0,3. **Errado.** O complemento é 1−0,3=0,7.

**4.** A interseção representa a ocorrência de A ou B. **Errado.** Interseção significa A e B simultaneamente.

**5.** A união de A e B inclui os casos em que ambos acontecem. **Certo.** “Ou” inclusivo considera a interseção.

**6.** Eventos mutuamente exclusivos podem ocorrer juntos. **Errado.** Não podem ocorrer simultaneamente.

**7.** Se a questão diz “sabendo que B ocorreu”, a condição restringe o universo. **Certo.** É probabilidade condicional.

**8.** Para eventos independentes, P(A∩B)=P(A)×P(B). **Certo.** É uma condição de independência.

**9.** Lançar uma moeda e um dado equilibrados são experimentos independentes entre si. **Certo.** O resultado de um não altera o resultado do outro.

**10.** A fórmula casos favoráveis/casos possíveis pode ser aplicada sem verificar se os resultados são equiprováveis. **Errado.** A contagem simples exige chances iguais.

## 12. Revisão final

Espaço amostral = todos os resultados.
Evento = resultado ou conjunto de resultados de interesse.
Probabilidade = favoráveis/possíveis, se equiprováveis.
Complemento = 1−P(A).
União = A ou B.
Interseção = A e B.
Condicional = sabendo que.
Independência = um evento não altera a chance do outro.','[{"b":"Conjunto de todos os resultados possíveis de um experimento.","f":"O que é espaço amostral?"},{"b":"Subconjunto do espaço amostral que representa o resultado de interesse.","f":"O que é evento?"},{"b":"Quando os resultados elementares forem equiprováveis.","f":"Quando usar casos favoráveis dividido por casos possíveis?"},{"b":"1−P(A).","f":"Qual a probabilidade do complemento de A?"},{"b":"Ocorre A ou B, incluindo a ocorrência de ambos.","f":"O que significa união A∪B?"},{"b":"A e B ocorrem simultaneamente.","f":"O que significa interseção A∩B?"},{"b":"Eventos que não podem ocorrer juntos na mesma realização.","f":"O que são eventos mutuamente exclusivos?"},{"b":"P(A|B)=P(A∩B)/P(B), com P(B)>0.","f":"Qual a fórmula da probabilidade condicional?"},{"b":"Quando a ocorrência de um não altera a probabilidade do outro.","f":"Quando dois eventos são independentes?"},{"b":"P(A∩B)=P(A)×P(B).","f":"Qual a condição matemática de independência?"}]','[{"a":true,"q":"O espaço amostral contém todos os resultados possíveis do experimento.","why":"É a definição de espaço amostral."},{"a":true,"q":"Em um dado justo, a probabilidade de sair número par é 1/2.","why":"Há três números pares em seis resultados equiprováveis."},{"a":false,"q":"Se P(A)=0,3, então P(não A)=0,3.","why":"O complemento é 1−0,3=0,7."},{"a":false,"q":"Interseção A∩B significa que A ou B ocorre.","why":"Interseção significa ocorrência conjunta."},{"a":true,"q":"A união A∪B inclui os casos em que A e B ocorrem juntos.","why":"A união é inclusiva."},{"a":false,"q":"Eventos mutuamente exclusivos podem ocorrer simultaneamente.","why":"A definição exclui a ocorrência conjunta."},{"a":true,"q":"A expressão ''sabendo que B ocorreu'' indica probabilidade condicional.","why":"A condição restringe o universo considerado."},{"a":true,"q":"Para eventos independentes, P(A∩B)=P(A)×P(B).","why":"Essa é a relação matemática de independência."},{"a":true,"q":"O resultado de uma moeda não altera a chance de sair seis em um dado independente.","why":"Os experimentos são independentes."},{"a":false,"q":"A fórmula casos favoráveis/casos possíveis funciona mesmo quando os resultados não são equiprováveis.","why":"A contagem simples exige resultados equiprováveis."}]'),
('pcac-2026-estatistica-07-relacoes-variaveis-correlacao-regressao','Aula aprofundada de relações entre variáveis, correlação positiva e negativa, coeficiente r, regressão linear simples, inclinação e causalidade.','# Aula 7 — Correlação, regressão linear simples e causalidade

## 1. O que significa analisar relações entre variáveis?

Uma pesquisa pode querer saber se duas características variam juntas. Por exemplo:
- número de operações e quantidade de apreensões;
- horas de estudo e nota em um simulado;
- tempo de atendimento e quantidade de servidores disponíveis.

A análise procura identificar padrões de associação. Mas atenção: duas variáveis aparecerem juntas não significa automaticamente que uma provoque a outra.

## 2. Correlação: direção e intensidade

Correlação descreve a direção e a intensidade de uma associação entre variáveis. O coeficiente de correlação linear mais conhecido, r de Pearson, varia de −1 a +1.

**Correlação positiva:** valores maiores de X tendem a acompanhar valores maiores de Y.

Exemplo: em determinado conjunto de dados, mais horas de estudo tendem a aparecer associadas a notas maiores.

**Correlação negativa:** valores maiores de X tendem a acompanhar valores menores de Y.

Exemplo hipotético: quanto maior a distância de uma unidade, menor pode ser a frequência de visitas, em certo contexto.

**Correlação próxima de zero:** indica pouca ou nenhuma associação linear identificada pelo coeficiente. Isso não exclui uma relação não linear.

### O que o sinal e o tamanho significam?

- Sinal positivo: associação linear no mesmo sentido.
- Sinal negativo: associação linear em sentidos opostos.
- Valor absoluto próximo de 1: associação linear mais forte.
- Valor absoluto próximo de 0: associação linear mais fraca.

Exemplos:
- r=+0,90: associação linear positiva forte.
- r=−0,90: associação linear negativa forte.
- r=+0,10: associação linear positiva fraca.
- r=0: nenhuma associação linear indicada pelo coeficiente.

A classificação de fraca, moderada ou forte depende do contexto e da convenção usada. Não existe uma régua universal para todos os campos.

## 3. Correlação não é causalidade

Essa é uma das pegadinhas mais importantes.

**Correlação:** duas variáveis apresentam associação.
**Causalidade:** mudanças em uma variável produzem efeito na outra, em condições definidas.

Exemplo: em meses de maior fiscalização, podem aumentar tanto o número de operações quanto o número de apreensões. Isso não prova, sozinho, que o aumento de operações foi a única causa do aumento das apreensões.

Outras explicações podem existir:
- mudança no efetivo;
- mudança no registro dos dados;
- sazonalidade;
- aumento real das ocorrências;
- política pública simultânea;
- variável de confusão.

### Três situações que confundem

1. **Variável de confusão:** uma terceira variável influencia as duas observadas.
2. **Causalidade inversa:** talvez Y influencie X, e não o contrário.
3. **Coincidência ou tendência comum:** duas séries podem subir juntas sem relação causal direta.

Para sustentar causalidade, é preciso analisar temporalidade, desenho da pesquisa, explicações alternativas e evidências adicionais.

## 4. Regressão linear simples

A regressão linear simples modela a relação entre:
- X: variável explicativa ou independente;
- Y: variável resposta ou dependente.

A forma da reta é:

**Y = a + bX**

- a: intercepto, valor previsto de Y quando X=0.
- b: inclinação ou coeficiente angular.

### Como interpretar b?

Se b=2, o modelo estima que, para cada unidade adicional de X, Y aumenta em média 2 unidades, dentro do modelo ajustado.

Se b=−3, para cada unidade adicional de X, Y diminui em média 3 unidades, no modelo.

**Exemplo:** Y representa uma nota prevista e X representa horas de estudo. Se a reta estimada for Y=40+5X:
- a=40;
- b=5.
O modelo prevê aumento de 5 pontos para cada hora adicional de X, dentro das condições do modelo.

Não conclua que estudar uma hora causa necessariamente cinco pontos a mais. A regressão, isoladamente, não elimina fatores de confusão.

## 5. Intercepto e extrapolação

O intercepto a é o valor previsto de Y quando X=0. Ele pode não ter significado prático se X=0 estiver fora da realidade observada.

Também é preciso cuidado ao extrapolar: usar a reta para prever valores muito além da faixa dos dados observados pode produzir previsões pouco confiáveis.

## 6. Como interpretar um gráfico de dispersão

Cada ponto representa um par de valores (X,Y).

- Nuvem inclinada para cima: associação positiva.
- Nuvem inclinada para baixo: associação negativa.
- Nuvem sem direção linear clara: correlação linear fraca ou ausente.
- Ponto muito afastado: possível observação influente ou discrepante.

Um outlier pode alterar bastante a correlação. Por isso, observe o gráfico e não apenas o coeficiente.

## 7. Método de resolução na prova

1. Identifique quais variáveis estão sendo comparadas.
2. Veja se a questão pergunta direção, intensidade, previsão ou causa.
3. Para correlação, interprete o sinal e o valor absoluto.
4. Para regressão, localize a e b em Y=a+bX.
5. Se perguntar o significado de b, explique a variação estimada em Y para cada unidade adicional de X.
6. Se a alternativa disser que correlação prova causalidade, desconfie.
7. Verifique se a questão extrapola além dos dados.

## 8. Pegadinhas

- Correlação positiva não significa necessariamente causalidade.
- Correlação negativa não significa ausência de relação.
- r está entre −1 e +1.
- O sinal indica direção; o módulo indica intensidade linear.
- Correlação zero não descarta associação não linear.
- Em Y=a+bX, a é o intercepto e b é a inclinação.
- Regressão modela associação e permite estimativas dentro das condições do modelo.
- Extrapolação pode ser arriscada.
- Uma variável de confusão pode explicar associação observada.

## 9. Treino autoral comentado

**1.** Correlação positiva indica que valores maiores de uma variável tendem a acompanhar valores maiores da outra. **Certo.** Essa é a direção positiva.

**2.** O coeficiente de correlação linear usual varia de −1 a +1. **Certo.** Seus extremos representam associação linear perfeita negativa e positiva.

**3.** Em Y=10+4X, o intercepto é 4. **Errado.** O intercepto é 10; a inclinação é 4.

**4.** Em Y=10+4X, o modelo estima aumento de 4 unidades em Y para cada unidade adicional de X. **Certo.** Esse é o significado de b no modelo.

**5.** Correlação prova que uma variável causou a outra. **Errado.** Pode haver confusão, causalidade inversa ou coincidência.

**6.** Correlação próxima de zero prova que não existe qualquer relação entre as variáveis. **Errado.** Pode existir associação não linear.

**7.** Um ponto extremo pode influenciar a correlação. **Certo.** Por isso, examine também o gráfico de dispersão.

**8.** A regressão linear simples relaciona uma variável explicativa a uma variável resposta. **Certo.** É a estrutura do modelo simples.

**9.** É sempre seguro extrapolar uma reta muito além dos dados observados. **Errado.** A relação pode não se manter fora da faixa observada.

**10.** Duas séries que crescem simultaneamente podem estar sujeitas a uma terceira variável. **Certo.** Uma variável de confusão ou tendência comum pode explicar a associação.

## 10. Revisão final

Correlação = associação.
Positiva = tendem a subir juntas.
Negativa = uma sobe e a outra tende a cair.
r entre −1 e +1.
Regressão simples = Y=a+bX.
a = intercepto.
b = inclinação.
Correlação não prova causalidade.

Na prova, diferencie sempre descrever uma associação, prever um valor e afirmar uma causa.','[{"b":"Medida da direção e intensidade de associação entre variáveis.","f":"O que é correlação?"},{"b":"Valores maiores de uma variável tendem a acompanhar valores maiores da outra.","f":"O que indica correlação positiva?"},{"b":"Valores maiores de uma variável tendem a acompanhar valores menores da outra.","f":"O que indica correlação negativa?"},{"b":"De −1 a +1.","f":"Qual a faixa do coeficiente de correlação linear usual?"},{"b":"A direção da associação linear.","f":"O que indica o sinal do coeficiente de correlação?"},{"b":"A intensidade da associação linear.","f":"O que indica o valor absoluto do coeficiente?"},{"b":"Y=a+bX.","f":"Qual a forma da regressão linear simples?"},{"b":"Intercepto: valor previsto de Y quando X=0.","f":"O que representa a?"},{"b":"Inclinação: variação média estimada em Y por unidade adicional de X.","f":"O que representa b?"},{"b":"Não. Associação, isoladamente, não demonstra causa e efeito.","f":"Correlação prova causalidade?"}]','[{"a":true,"q":"Correlação positiva indica tendência de crescimento conjunto das variáveis.","why":"As variáveis tendem a variar no mesmo sentido."},{"a":true,"q":"O coeficiente de correlação linear usual varia de −1 a +1.","why":"Essa é a faixa do coeficiente."},{"a":false,"q":"Em Y=10+4X, o intercepto é 4.","why":"O intercepto é 10; 4 é a inclinação."},{"a":true,"q":"Em Y=10+4X, o modelo estima aumento de 4 unidades em Y por unidade adicional de X.","why":"O coeficiente angular é 4."},{"a":false,"q":"Correlação estatística demonstra necessariamente causalidade.","why":"Associação pode decorrer de confusão, causalidade inversa ou coincidência."},{"a":true,"q":"Correlação próxima de zero não exclui necessariamente uma relação não linear.","why":"O coeficiente mede associação linear."},{"a":true,"q":"Um ponto extremo pode influenciar o coeficiente de correlação.","why":"Valores extremos podem alterar a associação observada."},{"a":true,"q":"Regressão linear simples modela uma variável resposta em função de uma variável explicativa.","why":"Essa é a estrutura do modelo."},{"a":false,"q":"Extrapolar muito além dos dados observados é sempre seguro.","why":"A relação pode não se manter fora da faixa observada."},{"a":true,"q":"Uma terceira variável pode explicar a associação observada entre duas variáveis.","why":"É a possibilidade de variável de confusão."}]'),
('pcac-2026-estatistica-08-series-temporais-padroes-tendencias','Aula aprofundada de séries temporais, tendência, sazonalidade, ciclos, variações irregulares, comparação de períodos e taxas de variação.','# Aula 8 — Séries temporais: padrões, tendências e comparação de períodos

## 1. O que é uma série temporal?

É uma sequência de observações de uma variável registradas em ordem cronológica, em intervalos definidos.

Exemplos:
- ocorrências por mês;
- atendimentos por dia;
- quantidade de prisões por trimestre;
- despesas por ano;
- tempo médio de atendimento por semana.

A ordem do tempo é essencial. Não basta ter vários números: eles precisam estar associados a períodos.

## 2. Tendência: direção geral

Tendência é o movimento geral de longo prazo.

Pode ser:
- crescente: movimento geral de aumento;
- decrescente: movimento geral de redução;
- estável: sem direção persistente clara.

Exemplo:
Ano 1: 100 registros.
Ano 2: 110.
Ano 3: 120.
Ano 4: 130.

Há uma tendência crescente nesse exemplo simples.

**Pegadinha:** um único aumento não prova tendência. Uma série pode subir em um mês e cair no seguinte, sem trajetória duradoura.

## 3. Sazonalidade

É um padrão que se repete em períodos conhecidos, como meses, estações ou datas específicas.

Exemplo: atendimentos podem aumentar todo mês de dezembro e diminuir em fevereiro, repetindo esse comportamento em vários anos.

**Palavra-chave:** repetição periódica.

Não confunda sazonalidade com qualquer oscilação. Para reconhecer sazonalidade, procure repetição em períodos semelhantes.

## 4. Ciclos

São oscilações de maior duração que não precisam se repetir em intervalos fixos.

Exemplo: períodos de crescimento e redução que acompanham fases econômicas ou institucionais, sem duração exatamente igual.

**Diferença:**
- Sazonalidade: repetição em períodos conhecidos.
- Ciclo: oscilação de duração não necessariamente fixa.

## 5. Variações irregulares

São movimentos sem padrão claro, muitas vezes relacionados a acontecimentos inesperados.

Exemplo: um evento extraordinário provoca aumento temporário em determinado mês.

Uma variação irregular não deve ser confundida automaticamente com uma tendência.

## 6. Mudança de nível

Acontece quando a série passa a permanecer em um patamar diferente por um período.

Exemplo:
- antes de uma mudança operacional: média mensal em torno de 100;
- depois da mudança: registros passam a ficar perto de 150.

É uma alteração persistente no nível da série. Pode decorrer de mudança real, mas também de alteração no sistema de registro.

## 7. Comparar períodos corretamente

Antes de comparar duas épocas:
1. use intervalos equivalentes;
2. confira se a unidade é a mesma;
3. verifique se a cobertura da coleta mudou;
4. observe se houve alteração na classificação dos registros;
5. considere o tamanho da população ou exposição;
6. compare valores absolutos e percentuais conforme o objetivo.

Exemplo: comparar janeiro com dezembro pode ser inadequado se houver sazonalidade. Pode ser melhor comparar janeiro deste ano com janeiro do ano anterior.

## 8. Variação absoluta

É a diferença entre o valor final e o inicial.

**Variação absoluta = valor final − valor inicial**

Exemplo: registros passaram de 80 para 100.
Variação absoluta = 100−80 = +20.

Houve aumento de 20 registros.

## 9. Variação percentual

É a variação absoluta dividida pelo valor inicial, multiplicada por 100.

**Variação percentual = [(final−inicial) ÷ inicial] × 100%**

Exemplo: de 80 para 100:
- diferença = 20;
- 20/80 = 0,25;
- 0,25×100 = 25%.

O aumento foi de 25%.

**Cuidado:** se o valor inicial for zero, a variação percentual por essa fórmula é indefinida. Não divida por zero.

## 10. Exemplo resolvido com redução

Os registros caíram de 200 para 150.

Variação absoluta = 150−200 = −50.
Variação percentual = (−50/200)×100 = −25%.

Houve redução de 50 registros, equivalente a 25% do valor inicial.

**Dica:** resultado negativo indica redução; positivo indica aumento.

## 11. Série temporal não explica sozinha a causa

Se os registros diminuíram, isso pode representar:
- redução real do fenômeno;
- mudança no sistema de coleta;
- alteração na definição de ocorrência;
- redução da cobertura;
- subnotificação;
- mudança de fiscalização.

A série mostra a evolução observada, mas a explicação exige investigação adicional.

## 12. Método de resolução na prova

1. Identifique a variável e a unidade.
2. Organize os períodos em ordem cronológica.
3. Procure movimento geral (tendência).
4. Procure repetição em períodos semelhantes (sazonalidade).
5. Diferencie oscilação irregular e ciclo.
6. Para variação absoluta, subtraia inicial de final.
7. Para variação percentual, divida a diferença pelo valor inicial.
8. Se a questão atribuir causa, veja se há evidências além da série.

## 13. Pegadinhas

- Série temporal exige ordem cronológica.
- Uma alta isolada não prova tendência.
- Sazonalidade se repete em períodos conhecidos.
- Ciclos não precisam ter duração fixa.
- Variações irregulares não têm padrão claro.
- Variação absoluta é diferença em unidades.
- Variação percentual depende do valor inicial.
- Valor inicial zero impede o cálculo percentual pela fórmula usual.
- Mudança de método de registro pode comprometer comparação.
- Série temporal não prova causa sozinha.

## 14. Treino autoral comentado

**1.** Uma sequência de ocorrências por mês é uma série temporal. **Certo.** Os registros estão organizados no tempo.

**2.** Um aumento isolado em março prova tendência crescente. **Errado.** É necessário observar vários períodos.

**3.** Aumento que se repete todo mês de dezembro sugere sazonalidade. **Certo.** Há repetição em época conhecida.

**4.** Ciclos sempre possuem exatamente a mesma duração. **Errado.** Não precisam ter duração fixa.

**5.** De 80 para 100, a variação absoluta é +20. **Certo.** 100−80=20.

**6.** De 80 para 100, a variação percentual é 20%. **Errado.** 20/80×100=25%.

**7.** De 200 para 150, houve redução percentual de 25%. **Certo.** (150−200)/200×100=−25%.

**8.** Se o valor inicial é zero, a variação percentual pela fórmula usual é indefinida. **Certo.** Não é possível dividir por zero.

**9.** Mudança no método de registro pode afetar a comparação entre anos. **Certo.** A diferença pode refletir o processo de coleta.

**10.** Uma série temporal demonstra automaticamente a causa de uma variação. **Errado.** Ela descreve o comportamento, mas não estabelece causalidade sozinha.

## 15. Revisão final

Série temporal = dados em ordem no tempo.
Tendência = direção geral.
Sazonalidade = repetição periódica.
Ciclo = oscilação sem duração fixa.
Irregular = sem padrão claro.
Variação absoluta = final−inicial.
Variação percentual = (final−inicial)/inicial×100%.

Compare períodos equivalentes e sempre verifique se a forma de registro permaneceu igual.','[{"b":"Sequência de observações de uma variável registradas ao longo do tempo.","f":"O que é série temporal?"},{"b":"Movimento geral de longo prazo da série.","f":"O que é tendência?"},{"b":"Padrão que se repete em períodos conhecidos.","f":"O que é sazonalidade?"},{"b":"Oscilação cuja duração não precisa ser fixa.","f":"O que é ciclo?"},{"b":"Movimento sem padrão claro, muitas vezes associado a acontecimentos inesperados.","f":"O que é variação irregular?"},{"b":"Valor final menos valor inicial.","f":"Como calcular variação absoluta?"},{"b":"(Final−inicial) ÷ inicial × 100%, se o inicial for diferente de zero.","f":"Como calcular variação percentual?"},{"b":"Redução em relação ao valor inicial.","f":"O que significa variação percentual negativa?"},{"b":"Para reduzir distorções causadas por sazonalidade.","f":"Por que comparar meses equivalentes?"},{"b":"Não. Mostra evolução, mas não identifica sozinha a causa.","f":"Uma série temporal prova causalidade?"}]','[{"a":true,"q":"Uma sequência de registros mensais é uma série temporal.","why":"Os dados estão organizados cronologicamente."},{"a":false,"q":"Um aumento isolado em um mês prova tendência crescente.","why":"Tendência exige observar o comportamento em vários períodos."},{"a":true,"q":"Um aumento que se repete no mesmo período de vários anos sugere sazonalidade.","why":"A repetição periódica caracteriza sazonalidade."},{"a":false,"q":"Ciclos sempre possuem duração exatamente fixa.","why":"Ciclos não precisam ter duração fixa."},{"a":true,"q":"A variação absoluta de 80 para 100 é +20.","why":"100−80=20."},{"a":false,"q":"A variação percentual de 80 para 100 é 20%.","why":"20/80×100=25%."},{"a":true,"q":"A redução de 200 para 150 corresponde a −25%.","why":"(150−200)/200×100=−25%."},{"a":true,"q":"A variação percentual usual é indefinida quando o valor inicial é zero.","why":"A fórmula exigiria divisão por zero."},{"a":true,"q":"Mudanças no método de coleta podem prejudicar a comparação temporal.","why":"A diferença pode decorrer do processo de registro."},{"a":false,"q":"Uma série temporal identifica automaticamente a causa de uma mudança.","why":"É necessário investigar explicações alternativas."}]'),
('pcac-2026-estatistica-09-outliers-indicadores-limitacoes','Aula aprofundada de outliers, amplitude interquartil, indicadores, taxas, denominadores, comparabilidade, limitações e erros de interpretação.','# Aula 9 — Outliers, indicadores e limitações da análise estatística

## 1. O que é um outlier?

Outlier é uma observação muito distante do padrão geral dos dados. Também pode ser chamado de valor discrepante ou atípico.

Exemplo: tempos de atendimento:
8, 9, 10, 11 e 90 minutos.

O valor 90 chama atenção porque está muito distante dos demais.

Mas atenção: um outlier não é necessariamente erro. Pode ser:
- erro de digitação;
- falha de medição;
- erro de integração entre sistemas;
- evento raro e verdadeiro;
- característica legítima de um grupo;
- mudança real no processo observado.

A primeira atitude é investigar a origem.

## 2. Por que não remover automaticamente?

Imagine que um atendimento tenha durado 90 minutos porque envolveu uma situação complexa. Excluir esse registro apenas por ser alto apagaria um acontecimento real.

Por outro lado, se o valor 90 surgiu porque alguém digitou 900 em vez de 90, é necessário corrigir o erro conforme a fonte.

**Regra:** identificar, investigar, documentar e só então decidir o tratamento.

## 3. Média e mediana diante de outliers

Considere:
4, 5, 5, 6 e 40.

Média = (4+5+5+6+40)/5 = 60/5 = 12.
Mediana = 5.

O valor 40 puxou a média para cima. A mediana ficou no centro da lista ordenada e foi menos afetada.

Isso ajuda a explicar por que a mediana pode representar melhor o comportamento típico em distribuições muito assimétricas ou com extremos.

Não significa que a mediana seja sempre melhor. A medida depende da pergunta e da distribuição.

## 4. Identificação por amplitude interquartil

Uma regra comum para sinalizar possíveis outliers utiliza a amplitude interquartil:

**AIQ = Q3−Q1**

Limite inferior: Q1−1,5×AIQ.
Limite superior: Q3+1,5×AIQ.

Valores abaixo ou acima desses limites podem ser sinalizados como possíveis outliers.

**Exemplo:** Q1=10 e Q3=18.
AIQ=18−10=8.
1,5×8=12.
Limite inferior=10−12=−2.
Limite superior=18+12=30.

Um valor acima de 30 seria sinalizado como possível discrepante por essa regra.

**Importante:** é uma regra de sinalização, não uma ordem automática de exclusão. A convenção de quartis adotada interfere no cálculo.

## 5. O que é um indicador?

Indicador é uma medida resumida usada para acompanhar, descrever ou comparar uma característica.

Exemplos:
- quantidade de ocorrências;
- percentual de atendimentos concluídos;
- taxa por 100 mil habitantes;
- tempo médio de atendimento;
- variação mensal de registros.

Um indicador precisa ser definido com clareza. Verifique:
- o que está sendo contado (numerador);
- qual é a base de comparação (denominador);
- período de referência;
- unidade;
- população ou universo;
- fonte dos dados;
- regra de cálculo.

## 6. Numerador e denominador

Numerador é o valor que fica acima da linha de divisão; denominador é o valor que fica abaixo.

Exemplo: 30 atendimentos concluídos entre 40 atendimentos realizados.

Proporção = 30/40 = 0,75 = 75%.

O numerador é 30; o denominador é 40.

Se a questão disser “taxa por 100 mil habitantes”, a forma geral é:

**Taxa = (quantidade observada ÷ população de referência) × 100.000**

Exemplo: 50 registros em população de 25.000 habitantes.
Taxa = (50/25.000)×100.000 = 200 por 100 mil habitantes.

A taxa permite considerar o tamanho diferente das populações, desde que a definição e o período sejam comparáveis.

## 7. Por que comparar totais absolutos pode enganar?

Município A: 200 registros e 200 mil habitantes.
Município B: 100 registros e 50 mil habitantes.

Totais:
- A tem 200;
- B tem 100.

Taxas por 100 mil:
- A: (200/200.000)×100.000 = 100.
- B: (100/50.000)×100.000 = 200.

Embora A tenha o maior total, B tem taxa duas vezes maior por 100 mil habitantes.

**Dica de prova:** quando os grupos têm tamanhos diferentes, veja se a questão pede total, proporção ou taxa.

## 8. Comparabilidade dos dados

Antes de comparar dois indicadores, verifique:
1. mesma definição;
2. mesmo período ou períodos equivalentes;
3. mesma unidade;
4. mesmo denominador ou base comparável;
5. mesma cobertura;
6. método de coleta compatível;
7. dados ausentes;
8. mudanças de classificação.

Um indicador de 2025 pode não ser diretamente comparável ao de 2026 se o sistema passou a registrar novos tipos de ocorrência.

## 9. Limitações da análise estatística

Toda conclusão depende da qualidade e da cobertura dos dados.

Problemas comuns:
- amostra enviesada;
- dados ausentes;
- erros de registro;
- subnotificação;
- denominador inadequado;
- períodos incomparáveis;
- variável mal definida;
- correlação confundida com causalidade;
- estimativa apresentada como certeza.

Um relatório responsável informa o que foi analisado, como foi coletado e quais limitações existem.

## 10. Método para resolver questões

1. Se aparecer um valor muito distante, pense em outlier.
2. Não conclua que é erro sem investigar.
3. Se pedir AIQ, calcule Q3−Q1.
4. Se pedir limite de outlier, aplique a regra informada.
5. Se pedir indicador, identifique numerador, denominador, período e unidade.
6. Se comparar grupos diferentes, verifique se os totais absolutos são suficientes.
7. Se houver conclusão causal, procure evidências adicionais.
8. Se faltarem dados ou houver mudança de método, reconheça a limitação.

## 11. Pegadinhas

- Outlier não é automaticamente erro.
- A média é mais sensível a extremos que a mediana.
- AIQ = Q3−Q1.
- Regra de 1,5×AIQ sinaliza possíveis discrepantes.
- Indicador sem denominador pode ser enganoso.
- Taxa não é o mesmo que total absoluto.
- Comparações exigem critérios compatíveis.
- Correlação não prova causalidade.
- Dados ausentes podem distorcer conclusões.
- Relatório sério explicita limitações.

## 12. Treino autoral comentado

**1.** Outlier é uma observação discrepante em relação ao padrão geral. **Certo.** Essa é a definição.

**2.** Todo outlier deve ser removido. **Errado.** Pode ser um valor real e relevante.

**3.** A média de 4, 5, 5, 6 e 40 é 12. **Certo.** A soma é 60 e há cinco valores.

**4.** A mediana do mesmo conjunto é 12. **Errado.** O valor central é 5.

**5.** Se Q1=10 e Q3=18, a AIQ é 8. **Certo.** 18−10=8.

**6.** Pela regra de 1,5×AIQ, o limite superior no exemplo é 30. **Certo.** 18+1,5×8=30.

**7.** Um indicador deve informar numerador e denominador. **Certo.** Isso permite entender o que está sendo comparado.

**8.** Comparar totais entre municípios de tamanhos muito diferentes pode induzir a erro. **Certo.** Taxas podem oferecer comparação mais adequada.

**9.** Dados ausentes nunca afetam uma análise. **Errado.** Podem distorcer resultados, sobretudo quando a ausência não é aleatória.

**10.** Um relatório responsável deve apresentar limitações metodológicas. **Certo.** Isso permite avaliar o alcance da conclusão.

## 13. Revisão final

Outlier = valor discrepante.
Não excluir automaticamente.
AIQ = Q3−Q1.
Limites usuais = Q1−1,5×AIQ e Q3+1,5×AIQ.
Indicador = medida resumida.
Taxa = quantidade dividida pela base de referência, multiplicada pelo fator.
Comparar exige mesma definição, período, unidade e cobertura.

A pergunta mais importante antes de confiar em um resultado é: os dados realmente permitem chegar a essa conclusão?','[{"b":"Observação discrepante em relação ao padrão geral dos dados.","f":"O que é outlier?"},{"b":"Não. É preciso investigar se é erro ou observação válida.","f":"Um outlier deve ser excluído automaticamente?"},{"b":"AIQ=Q3−Q1.","f":"Como calcular amplitude interquartil?"},{"b":"Inferior Q1−1,5×AIQ; superior Q3+1,5×AIQ.","f":"Quais são os limites usuais da regra de 1,5×AIQ?"},{"b":"Medida resumida usada para descrever, acompanhar ou comparar uma característica.","f":"O que é indicador estatístico?"},{"b":"Numerador, denominador, período, unidade, universo e fonte.","f":"O que deve ser definido em um indicador?"},{"b":"(Quantidade observada ÷ população de referência) × 100.000.","f":"Como calcular taxa por 100 mil habitantes?"},{"b":"Porque os grupos podem ter tamanhos diferentes.","f":"Por que totais absolutos podem enganar?"},{"b":"Definição, período, unidade, denominador, cobertura e método.","f":"O que verificar para comparar indicadores?"},{"b":"Fontes, período, critérios, dados ausentes e limitações metodológicas.","f":"O que deve apresentar um relatório responsável?"}]','[{"a":true,"q":"Outlier é uma observação discrepante em relação ao padrão geral.","why":"Essa é a definição."},{"a":false,"q":"Todo outlier deve ser removido antes da análise.","why":"É necessário investigar a origem e a validade do valor."},{"a":true,"q":"A amplitude interquartil é Q3−Q1.","why":"Essa é a fórmula."},{"a":true,"q":"Com Q1=10 e Q3=18, a amplitude interquartil é 8.","why":"18−10=8."},{"a":true,"q":"A regra de 1,5×AIQ pode sinalizar possíveis valores discrepantes.","why":"É uma regra de identificação, não de exclusão automática."},{"a":true,"q":"Um indicador deve explicitar seu denominador e período de referência.","why":"Sem isso, a comparação pode ser enganosa."},{"a":true,"q":"Uma taxa por 100 mil habitantes considera o tamanho da população de referência.","why":"O denominador permite padronizar a comparação."},{"a":false,"q":"Comparar totais absolutos é sempre suficiente entre municípios de tamanhos diferentes.","why":"Taxas ou proporções podem ser mais adequadas."},{"a":true,"q":"Dados ausentes podem distorcer uma análise estatística.","why":"A ausência pode afetar a representatividade e os resultados."},{"a":true,"q":"Relatórios responsáveis devem explicitar limitações metodológicas.","why":"As limitações definem o alcance das conclusões."}]'),
('pcac-2026-estatistica-11-tecnicas-basicas-amostragem','Aprofundamento prático de amostragem: sorteio, intervalos, estratos, conglomerados, métodos não probabilísticos, vieses, cálculos e questões comentadas.','# Aula complementar — Técnicas básicas de amostragem

## 1. Antes de escolher a técnica: entenda o problema

Amostragem é o procedimento usado para escolher uma parte da população. A técnica correta depende de como os elementos estão organizados e do objetivo da pesquisa.

Exemplo: a Secretaria possui 1.000 servidores e deseja pesquisar 100. A pergunta não é apenas “quantos serão entrevistados?”, mas “como esses 100 serão escolhidos?”.

- População: 1.000 servidores.
- Amostra: 100 servidores.
- Plano amostral: regra usada para selecionar os 100.

Uma amostra pode ser pequena e bem selecionada ou grande e enviesada. Quantidade, sozinha, não garante qualidade.

## 2. Amostragem aleatória simples

Cada elemento tem a mesma probabilidade conhecida de ser selecionado, no desenho aleatório simples. A seleção pode ser feita por sorteio de números, sistema informatizado ou tabela de números aleatórios.

**Exemplo:** uma lista completa contém 500 boletins. Um programa sorteia 50 números diferentes, sem que o pesquisador escolha os boletins por preferência.

**Como identificar na prova:** palavras como sorteio, seleção aleatória, mesma chance e lista completa apontam para essa técnica.

**Cuidado:** escolher os primeiros 50 registros da lista não é sorteio. É uma seleção por posição, que pode introduzir viés.

## 3. Amostragem sistemática

Selecionam-se elementos em intervalos regulares, depois de escolher um ponto inicial adequado.

A fórmula usual do intervalo é:

**k = N ÷ n**

- N: tamanho da população.
- n: tamanho desejado da amostra.
- k: intervalo de seleção.

**Exemplo passo a passo:** há 600 registros e serão selecionados 60.

1. Calcule k = 600 ÷ 60 = 10.
2. Escolha aleatoriamente um início entre 1 e 10.
3. Se o início for 4, selecione 4, 14, 24, 34 e assim por diante.
4. Continue até completar a amostra.

**Pegadinha importante:** se a lista tiver um padrão periódico que coincida com o intervalo, a seleção pode ficar distorcida. Imagine que a cada décimo registro esteja sempre uma unidade específica. A amostragem sistemática pode selecionar repetidamente essa unidade.

## 4. Amostragem estratificada

A população é dividida em estratos, isto é, grupos definidos por uma característica relevante. Depois são selecionados elementos dentro de cada estrato.

Exemplo: 1.000 servidores, sendo 700 administrativos e 300 operacionais. A pesquisa quer representar os dois grupos.

Se a amostra tiver 100 participantes e for proporcional:
- Administrativos: 70.
- Operacionais: 30.

**Cálculo da alocação proporcional:**

n do estrato = (N do estrato ÷ N total) × n total.

Para administrativos: (700 ÷ 1.000) × 100 = 70.

Para operacionais: (300 ÷ 1.000) × 100 = 30.

A alocação também pode ser não proporcional, quando a pesquisa decide selecionar quantidades diferentes da proporção original por razões metodológicas.

**Como identificar:** a história diz que a população foi dividida por sexo, função, região ou faixa etária e houve seleção dentro de cada grupo? Pense em estratificada.

## 5. Amostragem por conglomerados

Conglomerados são grupos naturais já existentes, como escolas, bairros, hospitais ou delegacias. A pesquisa sorteia alguns grupos e coleta dados dos elementos desses grupos, de todos ou de uma parte, conforme o desenho.

Exemplo: existem 20 delegacias. A equipe sorteia 4 delegacias e analisa os boletins dessas unidades.

**Diferença decisiva:**
- Estratificada: seleciona elementos em todos os estratos.
- Conglomerados: seleciona alguns grupos naturais.

Uma forma de memorizar: na estratificada, queremos presença de cada estrato; nos conglomerados, sorteamos unidades agrupadas para realizar a coleta.

## 6. Métodos não probabilísticos

Nesses métodos, a probabilidade de inclusão de cada elemento não é conhecida pelo desenho de seleção. Eles podem ser úteis em pesquisas exploratórias, mas limitam a generalização estatística.

**Conveniência:** escolhe quem está mais acessível. Ex.: entrevistar quem está na recepção naquele momento.

**Julgamento ou intencional:** o pesquisador seleciona participantes por critérios técnicos. Ex.: ouvir profissionais com experiência específica.

**Cotas:** define quantidades por categoria e preenche essas quantidades, sem necessariamente sortear os participantes. Ex.: entrevistar 50 pessoas de cada grupo, escolhidas entre as disponíveis.

## 7. Representatividade, viés e não resposta

Uma amostra representativa precisa refletir as características relevantes da população para a pergunta investigada.

**Viés de seleção** ocorre quando o modo de escolher os elementos favorece determinados perfis ou exclui outros.

Exemplo: pesquisar a opinião de todos os moradores entrevistando apenas pessoas que frequentam um shopping. Moradores que não frequentam o local podem ficar sub-representados.

Outros problemas:
- Cobertura incompleta: a lista não contém todos os elementos.
- Não resposta: selecionados não respondem e os ausentes têm características diferentes.
- Autoseleção: participa quem decide espontaneamente.
- Erro de medição: instrumento registra mal a informação.
- Erro de digitação: dado é transcrito incorretamente.

**Não confunda:** aumentar o tamanho da amostra pode reduzir a variabilidade amostral em determinadas condições, mas não corrige automaticamente um viés de seleção.

## 8. Método para resolver questões

1. Descubra qual é a população.
2. Identifique quantos elementos foram selecionados.
3. Observe se houve sorteio individual, intervalo, divisão em grupos ou sorteio de grupos naturais.
4. Procure palavras-chave: “a cada” aponta para sistemática; “em cada grupo” para estratificada; “algumas escolas/unidades” para conglomerados.
5. Verifique se a questão afirma que a amostra é representativa apenas por ser grande. Essa conclusão é incorreta.

## 9. Exemplos resolvidos

**Exemplo A:** 800 servidores, 500 administrativos e 300 operacionais. Serão sorteados 80, mantendo a proporção.

Administrativos: 500/800 × 80 = 50.
Operacionais: 300/800 × 80 = 30.
Técnica: estratificada proporcional.

**Exemplo B:** 1.200 fichas, amostra de 120, seleção a cada 10 fichas após início aleatório.
k = 1.200/120 = 10.
Técnica: sistemática.

**Exemplo C:** sorteio de 3 das 15 unidades e análise dos registros das unidades sorteadas.
Técnica: conglomerados.

**Exemplo D:** entrevistar as primeiras 40 pessoas que chegam.
Técnica: conveniência, não probabilística.

## 10. Pegadinhas para memorizar

- Sorteio individual não é a mesma coisa que escolher os primeiros.
- Sistemática exige intervalo e ponto inicial.
- Estratificada seleciona dentro de cada estrato.
- Conglomerados seleciona alguns grupos naturais.
- Cotas não significam necessariamente sorteio.
- Conveniência é não probabilística.
- Amostra grande não elimina viés.
- A lista de seleção precisa cobrir adequadamente a população.

## 11. Treino autoral comentado

**1.** Uma instituição divide os servidores por função e sorteia participantes em todos os grupos, respeitando suas proporções. A técnica é estratificada proporcional. **Certo.** Há estratos e seleção em cada um, com alocação proporcional.

**2.** Uma pesquisa sorteia cinco escolas e analisa os alunos dessas escolas. A técnica descrita é por conglomerados. **Certo.** As escolas são grupos naturais sorteados.

**3.** Selecionar o 7º registro e depois cada 12º registro caracteriza amostragem sistemática. **Certo.** Há ponto inicial e intervalo fixo.

**4.** Entrevistar quem estiver disponível caracteriza amostragem aleatória simples. **Errado.** É conveniência; não há sorteio com probabilidades iguais.

**5.** Uma amostra de 5.000 pessoas é sempre representativa. **Errado.** O método de seleção continua sendo decisivo.

**6.** Na estratificada, é possível selecionar quantidades proporcionais ou não proporcionais dos estratos. **Certo.** A alocação depende do plano de pesquisa.

**7.** Se a lista tiver periodicidade alinhada ao intervalo sistemático, pode surgir viés. **Certo.** O padrão pode fazer a seleção privilegiar certos elementos.

**8.** Na amostragem por conglomerados, é obrigatório entrevistar todos os indivíduos da população. **Errado.** São selecionados alguns conglomerados; dentro deles pode-se pesquisar todos ou uma parte, conforme o desenho.

**9.** Uma amostra por conveniência permite sempre calcular a margem de erro probabilística tradicional. **Errado.** As probabilidades de inclusão não são conhecidas no desenho de conveniência.

**10.** Em uma população de 1.000 pessoas, 600 pertencem ao grupo A. Para uma amostra proporcional de 100, o grupo A terá 60 selecionados. **Certo.** 600/1.000 × 100 = 60.

## 12. Revisão final

Aleatória simples = sorteio de elementos.
Sistemática = intervalo regular.
Estratificada = seleção dentro de todos os estratos.
Conglomerados = sorteio de grupos naturais.
Conveniência = facilidade de acesso.
Julgamento = escolha por critério técnico.
Cotas = quantidades predefinidas por categoria.

Priorize a identificação da história descrita no enunciado. A banca pode mudar os nomes e os números, mas a lógica da técnica permanece.','[{"b":"É o conjunto de regras usado para selecionar os elementos da amostra.","f":"O que é plano amostral?"},{"b":"Sorteio de elementos com probabilidades iguais e conhecidas no desenho simples.","f":"Qual é a marca da amostragem aleatória simples?"},{"b":"k = N ÷ n.","f":"Como calcular o intervalo sistemático?"},{"b":"Para evitar escolha arbitrária e permitir seleção sistemática imparcial.","f":"Por que o início da amostragem sistemática deve ser definido adequadamente?"},{"b":"Dividir a população em estratos e selecionar elementos dentro de cada estrato.","f":"O que é amostragem estratificada?"},{"b":"n do estrato = (N do estrato ÷ N total) × n total.","f":"Como calcular a quantidade proporcional de um estrato?"},{"b":"Selecionar alguns grupos naturais e pesquisar seus elementos, conforme o plano.","f":"O que é amostragem por conglomerados?"},{"b":"Estratificada seleciona em todos os estratos; conglomerados seleciona alguns grupos.","f":"Qual a diferença entre estratificada e conglomerados?"},{"b":"Selecionar elementos pela facilidade ou disponibilidade de acesso.","f":"O que é amostragem por conveniência?"},{"b":"Não. O tamanho não corrige automaticamente falhas de seleção ou cobertura.","f":"Uma amostra grande elimina o viés?"}]','[{"a":true,"q":"Dividir servidores por função e selecionar participantes dentro de todos os grupos caracteriza amostragem estratificada.","why":"A seleção ocorre dentro de cada estrato."},{"a":true,"q":"Selecionar um registro a cada 10, após definir o início, caracteriza amostragem sistemática.","why":"A seleção segue intervalos regulares."},{"a":false,"q":"Sortear algumas escolas e pesquisar seus alunos é necessariamente amostragem estratificada.","why":"As escolas são grupos naturais; a situação descreve conglomerados."},{"a":true,"q":"Em uma amostra proporcional, um estrato que representa 60% da população deve representar 60% da amostra.","why":"A alocação proporcional mantém a participação relativa."},{"a":false,"q":"Amostragem por conveniência é probabilística porque os participantes estão disponíveis.","why":"Disponibilidade não equivale a sorteio com probabilidades conhecidas."},{"a":true,"q":"Uma lista com periodicidade coincidente com o intervalo sistemático pode produzir viés.","why":"A seleção pode repetir um padrão da lista."},{"a":true,"q":"Na amostragem por conglomerados, podem ser pesquisados todos ou parte dos integrantes dos grupos selecionados.","why":"O desenho pode prever uma ou outra estratégia."},{"a":false,"q":"Uma amostra muito grande é necessariamente representativa.","why":"Representatividade depende também da seleção e da cobertura."},{"a":true,"q":"A amostragem por cotas estabelece quantidades por categoria, sem exigir sorteio dos participantes.","why":"Cotas são metas de composição, não necessariamente seleção aleatória."},{"a":true,"q":"Com N=1.000, n=100 e estrato de 300 pessoas, a alocação proporcional desse estrato é 30.","why":"300/1.000 × 100 = 30."}]'),
('pcac-2026-estatistica-12-distribuicoes-probabilidade','Aula aprofundada de variáveis aleatórias, distribuições discretas e contínuas, valor esperado, Bernoulli, binomial e normal, com fórmulas e questões comentadas.','# Aula complementar — Noções de distribuições de probabilidade

## 1. O que é uma distribuição de probabilidade?

Uma distribuição de probabilidade descreve quais valores uma variável aleatória pode assumir e qual a chance associada a cada valor ou intervalo.

Imagine acompanhar o número de ocorrências registradas em um plantão. O resultado pode ser 0, 1, 2, 3 e assim por diante. A distribuição descreve a probabilidade de cada quantidade.

## 2. Variável aleatória

É uma variável numérica cujo valor depende do resultado de um experimento aleatório.

**Discreta:** assume valores isolados ou contáveis.
Exemplo: número de ocorrências em um plantão.

**Contínua:** pode assumir qualquer valor em um intervalo.
Exemplo: tempo de atendimento, que pode ser 12,1; 12,15; 12,153 minutos, conforme a precisão de medição.

Não confunda variável aleatória discreta com variável qualitativa. Discreta é numérica e contável; qualitativa representa categorias.

## 3. Distribuição discreta

Associa uma probabilidade a cada valor possível.

Condições:
- cada probabilidade deve ser maior ou igual a zero;
- a soma de todas as probabilidades deve ser 1.

Exemplo: lançar uma moeda justa duas vezes. X representa o número de caras.

Resultados possíveis:
- coroa/coroa: X=0;
- cara/coroa ou coroa/cara: X=1;
- cara/cara: X=2.

Probabilidades:
- P(X=0)=1/4;
- P(X=1)=2/4=1/2;
- P(X=2)=1/4.

Conferência: 1/4 + 1/2 + 1/4 = 1.

## 4. Distribuição contínua

Uma variável contínua é descrita por uma função densidade. A probabilidade de estar entre dois valores corresponde à área sob a curva naquele intervalo.

Em distribuições contínuas usuais:
- a probabilidade de um intervalo pode ser positiva;
- a probabilidade de um valor pontual exato é zero;
- a área total sob a curva é 1.

Isso não significa que o valor nunca possa ocorrer na medição; significa que, no modelo contínuo, a probabilidade de um ponto isolado é zero.

## 5. Valor esperado: média teórica

O valor esperado representa a média teórica de longo prazo de uma variável aleatória.

Para variável discreta:

**E(X)=Σ[x×P(X=x)]**

Ou seja:
1. multiplique cada valor pela sua probabilidade;
2. some os produtos.

Exemplo das duas moedas:
E(X)=0×1/4 + 1×1/2 + 2×1/4
=0 + 0,5 + 0,5
=1 cara.

Interpretação: em muitas repetições do experimento, o número médio de caras por dois lançamentos tende a 1.

**Atenção:** valor esperado não significa que o resultado de uma única realização será exatamente esse valor.

## 6. Distribuição de Bernoulli

Representa um único experimento com dois resultados possíveis, normalmente chamados sucesso e fracasso.

Exemplo: verificar se um atendimento foi concluído dentro do prazo:
- sucesso = sim;
- fracasso = não.

Se a chance de sucesso é p, a chance de fracasso é 1−p.

O resultado é codificado como 1 para sucesso e 0 para fracasso, conforme a convenção do modelo.

## 7. Distribuição binomial

É usada para contar o número de sucessos em um número fixo de tentativas independentes, com a mesma probabilidade de sucesso em cada tentativa.

Condições essenciais:
1. número fixo de tentativas (n);
2. cada tentativa tem dois resultados possíveis;
3. independência entre tentativas;
4. probabilidade de sucesso constante (p).

Exemplo: em 5 verificações independentes, cada uma com chance de 20% de encontrar uma irregularidade, X representa quantas verificações apontam irregularidade.

A variável X pode assumir 0, 1, 2, 3, 4 ou 5.

Fórmula, quando solicitada:

**P(X=k)=C(n,k)×p^k×(1−p)^(n−k)**

- n: número de tentativas;
- k: número de sucessos desejado;
- p: probabilidade de sucesso;
- C(n,k): quantidade de combinações de k sucessos em n tentativas.

**Dica:** a palavra “quantos sucessos em n tentativas” costuma indicar binomial, mas confirme independência e probabilidade constante.

## 8. Distribuição normal

É uma distribuição contínua, simétrica e em formato de sino.

Características:
- é centrada na média;
- a média coincide com a mediana e a moda no modelo normal;
- o desvio-padrão controla a dispersão;
- a área total sob a curva é 1.

A curva normal é determinada por dois parâmetros:
- média (μ): localização do centro;
- desvio-padrão (σ): espalhamento.

Uma distribuição normal com desvio-padrão maior é mais espalhada; com desvio-padrão menor é mais concentrada ao redor da média.

### Escore padronizado (z)

Quando a questão solicitar padronização:

**z=(x−μ)/σ**

O escore z indica quantos desvios-padrão o valor x está acima ou abaixo da média:
- z positivo: acima da média;
- z negativo: abaixo da média;
- z igual a zero: exatamente na média.

Não confunda z com percentual. Para transformar z em probabilidade, é necessário consultar a tabela ou ferramenta apropriada.

## 9. Como identificar o modelo no enunciado

- Um experimento com dois resultados: Bernoulli.
- Número de sucessos em n tentativas independentes e p constante: binomial.
- Variável contínua, simétrica e em sino: normal.
- Valores isolados e contáveis com probabilidades: distribuição discreta.
- Área sob uma densidade em intervalo: distribuição contínua.

## 10. Pegadinhas

- Discreta é contagem; contínua é medida.
- As probabilidades de uma distribuição discreta válida somam 1.
- Área total sob uma densidade válida é 1.
- Em variável contínua usual, P(X=a)=0.
- Valor esperado é média teórica, não resultado garantido.
- Bernoulli descreve um ensaio com dois resultados.
- Binomial exige n fixo, independência e p constante.
- Normal é contínua e simétrica.
- Desvio-padrão maior deixa a curva normal mais espalhada.
- Escore z não é, por si só, uma porcentagem.

## 11. Treino autoral comentado

**1.** O número de ocorrências em um plantão é variável aleatória discreta. **Certo.** É uma contagem.

**2.** O tempo de atendimento pode ser modelado como variável contínua. **Certo.** É uma medida.

**3.** As probabilidades de todos os resultados de uma distribuição discreta devem somar 1. **Certo.** É condição de validade.

**4.** Em uma distribuição contínua usual, a probabilidade de um valor pontual exato é zero. **Certo.** A probabilidade é calculada por áreas de intervalos.

**5.** Valor esperado é o resultado obrigatório de cada repetição. **Errado.** É a média teórica de longo prazo.

**6.** Bernoulli representa um experimento com dois resultados. **Certo.** Sucesso e fracasso.

**7.** Binomial exige número fixo de tentativas, independência e probabilidade constante. **Certo.** São as condições centrais do modelo.

**8.** A distribuição normal é assimétrica por definição. **Errado.** O modelo normal é simétrico.

**9.** Na normal, um desvio-padrão maior representa maior espalhamento. **Certo.** A curva fica mais larga.

**10.** Um escore z negativo indica que o valor está abaixo da média. **Certo.** O numerador x−μ é negativo.

## 12. Revisão final

Distribuição = valores possíveis e suas chances.
Discreta = valores contáveis.
Contínua = valores em intervalos.
Valor esperado = média teórica.
Bernoulli = dois resultados em um ensaio.
Binomial = número de sucessos em n tentativas independentes com p constante.
Normal = contínua, simétrica, em sino.
z = (x−μ)/σ.

Estude primeiro o reconhecimento dos modelos e suas condições. Só avance para cálculos mais longos quando souber identificar qual distribuição o enunciado descreve.','[{"b":"Variável numérica cujo valor depende do resultado de um experimento aleatório.","f":"O que é variável aleatória?"},{"b":"Assume valores isolados ou contáveis.","f":"O que caracteriza variável aleatória discreta?"},{"b":"Pode assumir qualquer valor em um intervalo.","f":"O que caracteriza variável aleatória contínua?"},{"b":"1.","f":"Quanto devem somar as probabilidades de uma distribuição discreta válida?"},{"b":"Como área sob a função densidade em um intervalo.","f":"Como interpretar probabilidade em uma distribuição contínua?"},{"b":"E(X)=Σ[x×P(X=x)].","f":"Como calcular o valor esperado discreto?"},{"b":"Modelo de um único experimento com dois resultados, sucesso ou fracasso.","f":"O que é distribuição de Bernoulli?"},{"b":"Número fixo de tentativas, dois resultados, independência e probabilidade de sucesso constante.","f":"Quais condições básicas da binomial?"},{"b":"Média e desvio-padrão.","f":"Quais parâmetros definem a distribuição normal?"},{"b":"z=(x−μ)/σ.","f":"Como calcular escore z?"}]','[{"a":true,"q":"O número de ocorrências em um plantão é exemplo de variável aleatória discreta.","why":"É uma contagem de valores inteiros."},{"a":true,"q":"O tempo de atendimento pode ser modelado como variável aleatória contínua.","why":"Tempo é uma medida que pode assumir valores fracionários."},{"a":true,"q":"As probabilidades de todos os resultados de uma distribuição discreta válida somam 1.","why":"A soma representa a certeza de algum resultado possível."},{"a":true,"q":"Em uma distribuição contínua usual, a probabilidade de um ponto isolado é zero.","why":"Probabilidades são calculadas por áreas em intervalos."},{"a":false,"q":"O valor esperado garante o resultado de uma única repetição.","why":"Ele representa uma média teórica de longo prazo."},{"a":true,"q":"Bernoulli modela um ensaio com dois resultados possíveis.","why":"Sucesso e fracasso."},{"a":true,"q":"A distribuição binomial exige tentativas independentes e probabilidade constante de sucesso.","why":"São hipóteses fundamentais do modelo."},{"a":false,"q":"A distribuição normal é assimétrica por definição.","why":"A distribuição normal é simétrica e tem formato de sino."},{"a":true,"q":"Na distribuição normal, um desvio-padrão maior indica maior dispersão.","why":"O parâmetro σ controla o espalhamento."},{"a":true,"q":"Um escore z negativo indica valor abaixo da média.","why":"x−μ é negativo quando x é menor que μ."}]'),
('pcac-2026-estatistica-mediana-moda-quartis-percentis','Aula aprofundada de mediana, moda, quartis, decis, percentis, amplitude interquartil e boxplot, com exemplos ordenados, convenções e questões comentadas.','# Aula complementar — Mediana, moda, quartis e medidas posicionais

## 1. Por que estudar medidas posicionais?

Média, mediana e moda resumem um conjunto de maneiras diferentes. As medidas posicionais indicam onde os dados ficam quando organizados em ordem.

Imagine as notas 2, 4, 4, 5 e 15. A média é 6, mas a mediana é 4 e a moda também é 4. O valor 15 puxa a média para cima. A mediana ajuda a localizar o centro sem ser tão afetada por esse extremo.

## 2. Mediana: o valor do meio

A mediana é o valor central depois de ordenar os dados em ordem crescente ou decrescente.

**Regra obrigatória:** primeiro ordene. Não procure o meio na lista original desorganizada.

### Quantidade ímpar

Exemplo: 3, 9, 4, 7, 10.

Ordenando: 3, 4, 7, 9, 10.
Há 5 valores. O valor central é o terceiro: mediana = 7.

A posição pode ser encontrada por (n+1)/2.
Para n=5: (5+1)/2 = 3ª posição.

### Quantidade par

Exemplo: 8, 2, 10, 4.

Ordenando: 2, 4, 8, 10.
Há 4 valores. Os dois centrais são 4 e 8.
Mediana = (4+8)/2 = 6.

**Pegadinha:** não escolha somente o maior ou o menor dos dois valores centrais. Faça a média entre eles.

## 3. Moda: o que mais aparece

Moda é o valor ou categoria de maior frequência.

Exemplo: 2, 3, 3, 3, 5, 8.
A moda é 3, porque aparece três vezes.

Uma distribuição pode ser:
- Amodal: não possui moda definida, conforme a convenção adotada.
- Unimodal: uma moda.
- Bimodal: duas modas.
- Multimodal: mais de duas modas.

Exemplo bimodal: 1, 1, 2, 3, 3, 4. As modas são 1 e 3.

**Atenção:** moda não é o maior número. É o mais frequente. Também pode ser usada para categorias, como o tipo de ocorrência mais registrado.

## 4. Quartis: dividir os dados em quatro partes

Quartis são medidas posicionais que dividem os dados ordenados em quatro partes.

- Q1: primeiro quartil, associado a 25%.
- Q2: segundo quartil, a mediana, associado a 50%.
- Q3: terceiro quartil, associado a 75%.

Interpretação intuitiva: Q1 marca uma posição abaixo da qual se encontra aproximadamente um quarto das observações; Q2 marca o meio; Q3 marca aproximadamente três quartos.

**Importante:** há diferentes convenções para calcular a posição dos quartis, especialmente em amostras pequenas. Se o enunciado informar método, siga-o. Se não informar, observe a convenção adotada no material ou na questão. Não misture métodos.

## 5. Exemplo de quartis

Considere os dados ordenados:
2, 4, 5, 7, 8, 10, 12, 14.

A mediana Q2 é a média entre o 4º e o 5º valores:
(7+8)/2 = 7,5.

Em uma convenção comum que divide os dados em duas metades:
- metade inferior: 2, 4, 5, 7; sua mediana é Q1=(4+5)/2=4,5.
- metade superior: 8, 10, 12, 14; sua mediana é Q3=(10+12)/2=11.

Esse exemplo ilustra um método. Outras convenções podem produzir posições ligeiramente diferentes. A banca pode especificar a regra.

## 6. Amplitude interquartil (AIQ)

É a diferença entre o terceiro e o primeiro quartil:

**AIQ = Q3 − Q1**

No exemplo anterior:
AIQ = 11 − 4,5 = 6,5.

Ela mede a amplitude dos 50% centrais dos dados e é menos sensível aos extremos do que a amplitude total.

## 7. Decis e percentis

**Decis:** dividem a distribuição ordenada em dez partes.
- D1: posição associada a 10%.
- D5: posição associada a 50%, equivalente à mediana.
- D9: posição associada a 90%.

**Percentis:** dividem a distribuição ordenada em cem partes.
- P25 corresponde à posição do primeiro quartil.
- P50 corresponde à mediana.
- P75 corresponde à posição do terceiro quartil.
- P90 indica o ponto abaixo do qual se encontra aproximadamente 90% das observações, segundo o método adotado.

**Exemplo cotidiano:** estar no percentil 90 de uma pontuação significa que a pontuação está acima ou igual à maior parte dos resultados, conforme a definição e o método usados. Não significa ter acertado 90% da prova.

## 8. Boxplot: leitura básica

O boxplot, ou diagrama de caixa, resume a distribuição usando:
- Q1;
- mediana;
- Q3;
- extremos ou limites dos bigodes, conforme a regra;
- possíveis pontos discrepantes.

A caixa vai de Q1 a Q3. A linha interna marca a mediana. Os bigodes mostram a extensão definida pelo método utilizado. Pontos fora dos limites podem ser sinalizados como possíveis outliers.

**Cuidado:** ponto fora do bigode é um possível valor discrepante, não prova automática de erro.

## 9. Qual medida escolher?

- Média: utiliza todos os valores, mas é sensível a extremos.
- Mediana: representa a posição central e é mais resistente a extremos.
- Moda: identifica o valor ou categoria mais frequente.
- Quartis e percentis: indicam posições relativas.
- AIQ: mede a dispersão dos 50% centrais.

## 10. Método de prova em cinco passos

1. Ordene os valores.
2. Conte quantas observações existem.
3. Se a questão pedir mediana, encontre o centro.
4. Se pedir moda, conte repetições.
5. Se pedir quartis/percentis, observe a convenção de posição indicada.

## 11. Pegadinhas

- Mediana exige ordenar os dados.
- Em quantidade par, use a média dos dois centrais.
- Moda não é o maior valor.
- Pode haver duas ou mais modas.
- Q2 é a mediana.
- AIQ é Q3−Q1.
- Percentil 90 não significa nota de 90%.
- Convenções de quartis podem variar.
- Outlier não deve ser excluído automaticamente.

## 12. Treino autoral comentado

**1.** A mediana de 3, 9, 4, 7, 10 é 7. **Certo.** Ordenando: 3, 4, 7, 9, 10.

**2.** A mediana de 2, 4, 8, 10 é 8. **Errado.** Os centrais são 4 e 8; a mediana é 6.

**3.** A moda de 1, 1, 2, 3, 3, 4 é 1 e 3. **Certo.** Ambos aparecem duas vezes.

**4.** Moda é sempre o maior valor. **Errado.** É o mais frequente.

**5.** Q2 corresponde à mediana. **Certo.** Ambos representam o ponto central.

**6.** Se Q1=10 e Q3=18, a AIQ é 8. **Certo.** 18−10=8.

**7.** Percentil 90 significa necessariamente acertar 90% das questões. **Errado.** Indica posição relativa na distribuição.

**8.** Para encontrar a mediana, os dados devem ser ordenados. **Certo.** A posição central depende da ordenação.

**9.** Um conjunto pode ser bimodal. **Certo.** Pode apresentar duas categorias ou valores com frequência máxima empatada.

**10.** Toda convenção de quartis produz exatamente os mesmos resultados em amostras pequenas. **Errado.** Métodos diferentes podem produzir posições distintas.

## 13. Revisão final

Mediana = valor central ordenado.
Moda = maior frequência.
Q1 = 25%; Q2 = 50%; Q3 = 75%.
Decis = dez partes.
Percentis = cem partes.
AIQ = Q3−Q1.
Boxplot = resumo visual da posição e dispersão.

O primeiro passo quase sempre é ordenar os dados.','[{"b":"Valor central de um conjunto de dados ordenado.","f":"O que é mediana?"},{"b":"Ordene e escolha a posição (n+1)/2.","f":"Como calcular mediana com quantidade ímpar?"},{"b":"Ordene e calcule a média dos dois valores centrais.","f":"Como calcular mediana com quantidade par?"},{"b":"Valor ou categoria com maior frequência.","f":"O que é moda?"},{"b":"Distribuição com duas modas.","f":"O que significa distribuição bimodal?"},{"b":"Primeiro quartil, associado a 25% da distribuição.","f":"O que representa Q1?"},{"b":"Segundo quartil, equivalente à mediana.","f":"O que representa Q2?"},{"b":"Q3−Q1.","f":"Como calcular a amplitude interquartil?"},{"b":"Medidas que dividem a distribuição ordenada em cem partes.","f":"O que são percentis?"},{"b":"Não. É uma posição relativa na distribuição dos resultados.","f":"Percentil 90 significa acertar 90% da prova?"}]','[{"a":true,"q":"A mediana é encontrada depois de ordenar os dados.","why":"A posição central depende da ordenação."},{"a":false,"q":"Em um conjunto par, a mediana é sempre o maior dos dois valores centrais.","why":"É a média dos dois valores centrais."},{"a":true,"q":"A moda é o valor ou categoria mais frequente.","why":"Moda corresponde à maior frequência."},{"a":true,"q":"Uma distribuição pode ter duas modas.","why":"Ela pode ser bimodal."},{"a":true,"q":"Q2 corresponde à mediana.","why":"O segundo quartil marca 50%."},{"a":true,"q":"Se Q1=10 e Q3=18, a amplitude interquartil é 8.","why":"AIQ=18−10=8."},{"a":false,"q":"Percentil 90 significa necessariamente que a pessoa acertou 90% das questões.","why":"Percentil indica posição relativa, não percentual de acertos."},{"a":true,"q":"O boxplot pode destacar possíveis observações discrepantes.","why":"Pontos fora dos limites dos bigodes podem ser sinalizados."},{"a":false,"q":"Todos os métodos de cálculo de quartis necessariamente dão o mesmo resultado em amostras pequenas.","why":"Há convenções distintas."},{"a":true,"q":"A mediana costuma ser menos sensível a valores extremos que a média.","why":"Ela depende da posição central, não da soma de todos os valores."}]')
  ) AS v(slug, summary, body_md, flashcards, quiz)
  WHERE m.slug = v.slug
    AND m.discipline = 'Estatística'
    AND m.content_status = 'active';

  GET DIAGNOSTICS changed_count = ROW_COUNT;
  IF changed_count <> 12 THEN
    RAISE EXCEPTION 'Esperadas 12 aulas ativas de Estatística; atualizadas: %', changed_count;
  END IF;
END
$pcac_statistics$;
