-- Norte Concursos | PC-AC 2026 | Raciocínio Lógico
-- Snapshot de 15 materiais didáticos expandidos, aplicado ao projeto Supabase.
-- Contém teoria, exemplos, revisão, 10 flashcards e 10 questões comentadas por material.

DO $pcac_raciocinio_logico$
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
('pcac-2026-raciocinio-logico-01-numeros-reais-problemas','Aula ampliada de números reais, operações, sinais, frações, potências, raízes, expressões e resolução de problemas contextualizados.','# Aula 1 — Números reais, operações e resolução de problemas

## 1. O que são números reais?

Os números reais reúnem os números que usamos para contar, medir, comparar e calcular. Incluem naturais (0, 1, 2...), inteiros (..., −2, −1, 0, 1...), racionais (frações e decimais finitos ou periódicos) e irracionais (como √2 e π). Todo número racional é real, mas nem todo real é racional.

Exemplos do cotidiano:
- 5 ocorrências: número natural.
- saldo de −R$ 30: número inteiro negativo.
- 0,5 hora: número racional.
- √2: número irracional.

## 2. Ordem das operações

Em expressões numéricas, respeite a ordem:
1. parênteses, colchetes e chaves, de dentro para fora;
2. potências e raízes;
3. multiplicações e divisões, da esquerda para a direita;
4. adições e subtrações, da esquerda para a direita.

Exemplo: 12 + 3 × 4 = 12 + 12 = 24. Não faça primeiro 12+3. Se houver (12+3)×4, o resultado será 60.

## 3. Regras de sinais

Na multiplicação e divisão:
- sinais iguais produzem resultado positivo;
- sinais diferentes produzem resultado negativo.

Exemplos: (−4)×(−3)=+12; (−12)÷3=−4.

Na adição:
- sinais iguais: some os módulos e mantenha o sinal;
- sinais diferentes: subtraia os módulos e mantenha o sinal do número de maior módulo.

Exemplo: −8+3=−5. O número negativo tem maior módulo. Já −8+12=4.

**Cuidado:** a regra de sinais da multiplicação não deve ser aplicada mecanicamente à adição.

## 4. Frações e decimais

Uma fração representa uma divisão. Em 3/4, o numerador é 3 e o denominador é 4. Para somar frações, use denominador comum: 1/2+1/4=2/4+1/4=3/4.

Para multiplicar, multiplique numeradores e denominadores: 2/3×3/5=6/15=2/5. Para dividir por uma fração, multiplique pela inversa: 2/3÷4/5=2/3×5/4=10/12=5/6.

Decimal finito pode ser convertido em fração: 0,25=25/100=1/4. Para comparar valores, alinhe casas decimais ou converta para uma forma comum.

## 5. Potências e raízes

Potência representa multiplicação repetida: 2³=2×2×2=8. Regras úteis:
- aᵐ×aⁿ=aᵐ⁺ⁿ;
- aᵐ÷aⁿ=aᵐ⁻ⁿ, para a≠0;
- (aᵐ)ⁿ=aᵐⁿ;
- a⁰=1, para a≠0.

Raiz quadrada é a operação inversa de elevar ao quadrado: √49=7. Não confunda √(a+b) com √a+√b: essa separação não é válida em geral.

## 6. Como traduzir um problema em conta

Leia o enunciado e identifique:
- o que é conhecido;
- o que se quer descobrir;
- quais operações conectam os dados;
- quais unidades estão sendo usadas.

Exemplo: uma equipe tinha 18 agentes e recebeu mais 7. Depois, 4 foram deslocados. Quantos ficaram? 18+7−4=21.

Se cada agente recebeu 3 formulários, a quantidade total é 21×3=63. Não misture quantidade de agentes com quantidade de formulários.

## 7. Erros frequentes em prova

- Ignorar a ordem das operações.
- Trocar regra de sinais da soma pela regra da multiplicação.
- Somar frações somando diretamente os denominadores.
- Dividir por fração sem inverter a segunda.
- Achar que todo decimal é irracional.
- Separar raiz de soma como se fosse distributiva.
- Não conferir a unidade do resultado.

## 8. Método de conferência

Depois de calcular, faça uma estimativa. Se 20 pessoas recebem 3 formulários cada, o resultado deve estar próximo de 60, não de 6 ou 600. Se calcular uma quantidade negativa de pessoas, provavelmente houve erro de interpretação ou operação.

## 9. Treino autoral comentado

1. 12+3×4=24. **Certo:** multiplicação antes da adição.
2. (12+3)×4=60. **Certo:** parênteses primeiro.
3. (−5)×(−2)=−10. **Errado:** sinais iguais dão +10.
4. −9+4=−5. **Certo:** módulos 9 e 4; prevalece o sinal negativo.
5. 1/2+1/4=2/6. **Errado:** use denominador comum; resultado 3/4.
6. 2/3÷4/5=5/6. **Errado:** 2/3×5/4=5/6? Simplificando 10/12=5/6. **Certo.**
7. 0,25=1/4. **Certo:** 25/100 simplifica para 1/4.
8. 2³=6. **Errado:** 2×2×2=8.
9. √49=7. **Certo:** 7²=49.
10. √(9+16)=√9+√16. **Errado:** √25=5, mas 3+4=7.

## 10. Revisão final

Ordem: agrupamento, potências/raízes, multiplicação/divisão, adição/subtração.
Sinais: iguais dão positivo na multiplicação; diferentes dão negativo.
Frações: denominador comum para somar; inversa para dividir.
Potência: multiplicação repetida.
Raiz: operação inversa da potência.
Sempre estime e confira a unidade.','[{"b":"Conjunto que reúne racionais e irracionais, incluindo naturais, inteiros, frações e decimais.","f":"O que são números reais?"},{"b":"Agrupamentos, potências e raízes, multiplicações e divisões, adições e subtrações.","f":"Qual a ordem básica das operações?"},{"b":"24, pois a multiplicação vem antes da adição.","f":"Quanto é 12+3×4?"},{"b":"Positivo.","f":"Qual o sinal do produto de dois números negativos?"},{"b":"Encontrar denominador comum e somar os numeradores equivalentes.","f":"Como somar frações com denominadores diferentes?"},{"b":"Multiplicar pela fração inversa.","f":"Como dividir por uma fração?"},{"b":"1/4.","f":"Quanto é 0,25 em fração simplificada?"},{"b":"8, pois 2×2×2=8.","f":"Quanto é 2³?"},{"b":"7.","f":"Quanto é √49?"},{"b":"Para detectar erros de ordem de grandeza, sinal ou unidade.","f":"Por que estimar o resultado?"}]','[{"a":true,"q":"Em 12+3×4, a multiplicação deve ser realizada antes da adição.","why":"A ordem das operações prioriza multiplicação e divisão sobre adição e subtração."},{"a":false,"q":"O resultado de (−5)×(−2) é −10.","why":"Sinais iguais na multiplicação produzem resultado positivo: +10."},{"a":true,"q":"A expressão −9+4 resulta em −5.","why":"Os módulos são subtraídos e prevalece o sinal do número de maior módulo."},{"a":false,"q":"Para somar 1/2 e 1/4, basta somar numeradores e denominadores.","why":"É necessário usar denominador comum: 2/4+1/4=3/4."},{"a":true,"q":"Dividir 2/3 por 4/5 equivale a multiplicar 2/3 por 5/4.","why":"A divisão por fração usa a inversa do divisor."},{"a":true,"q":"0,25 equivale a 1/4.","why":"25/100 simplifica para 1/4."},{"a":false,"q":"2³ é igual a 6.","why":"2³=2×2×2=8."},{"a":true,"q":"A raiz quadrada de 49 é 7.","why":"7 elevado ao quadrado é 49."},{"a":false,"q":"A raiz de uma soma pode sempre ser separada na soma das raízes.","why":"A propriedade não vale em geral; √25=5, enquanto √9+√16=7."},{"a":true,"q":"Estimar o resultado ajuda a perceber erros de cálculo e unidade.","why":"A estimativa funciona como conferência de coerência."}]'),
('pcac-2026-raciocinio-logico-02-proposicoes-simples-compostas','Aula ampliada sobre proposições, sentenças abertas, valores lógicos, proposições simples e compostas, tradução simbólica e classificação de frases.','# Aula 2 — Proposições simples e compostas

## 1. O que é proposição?

Proposição é uma sentença declarativa à qual se pode atribuir um valor lógico: verdadeiro (V) ou falso (F), mas não ambos ao mesmo tempo no mesmo contexto. Exemplo: “Brasília é a capital do Brasil”. É uma afirmação que pode ser verificada.

Uma proposição falsa continua sendo proposição. “2 é maior que 10” é uma declaração com valor lógico definido, embora falso. A definição exige possibilidade de classificação como V ou F, não que a frase seja verdadeira.

## 2. O que não é proposição?

Perguntas, ordens, exclamações sem conteúdo declarativo e frases sem sentido definido não são proposições:
- “Qual é o horário?” — pergunta.
- “Feche a porta.” — ordem.
- “Que relatório excelente!” — exclamação.
- “x é maior que 5” — depende do valor de x.

A última é uma sentença aberta. Se for informado x=8, a frase se torna verdadeira; se x=2, torna-se falsa. Sem valor ou quantificação que feche a sentença, não há valor lógico determinado.

## 3. Proposição simples

É uma declaração que não contém outra proposição como parte conectada por conectivo lógico. Pode ser representada por uma letra:
P: “O boletim foi registrado.”
Q: “O sistema está disponível.”

As letras são símbolos, não valores numéricos. A letra P não significa necessariamente verdadeiro; seu valor depende da situação descrita.

## 4. Proposição composta

É formada pela combinação de proposições simples por conectivos:
- P e Q;
- P ou Q;
- não P;
- se P, então Q;
- P se e somente se Q.

Exemplo: P = “o agente registrou a ocorrência”; Q = “a chefia recebeu o aviso”. A frase “o agente registrou a ocorrência e a chefia recebeu o aviso” é composta: P∧Q.

## 5. Como identificar a estrutura

Sublinhe os verbos declarativos e localize as palavras que conectam as afirmações. Uma frase longa pode conter várias proposições. Separe cada afirmação que pode ser julgada verdadeira ou falsa e depois identifique a relação entre elas.

Exemplo: “Se o documento foi assinado e conferido, então será arquivado”. Podemos definir P = documento assinado, Q = documento conferido e R = documento arquivado. A estrutura é (P∧Q)→R.

## 6. Quantificadores e sentenças abertas

Frases com variáveis podem ser fechadas por quantificadores:
- “Todo servidor possui matrícula” — afirmação universal.
- “Existe um servidor de plantão” — afirmação existencial.

A negação de “todo A é B” é “existe pelo menos um A que não é B”. A negação de “existe algum A que é B” é “nenhum A é B”. Essas regras serão retomadas em equivalências e negações.

## 7. Cuidado com linguagem natural

Palavras do cotidiano podem ter nuances, mas a prova costuma fornecer a estrutura lógica. “E” representa conjunção; “ou” geralmente representa disjunção inclusiva; “não” representa negação. Não acrescente exclusividade ao “ou” sem indicação do enunciado.

## 8. Treino autoral comentado

1. “O relatório foi protocolado” é proposição. **Certo:** é declaração verificável.
2. “Feche a porta!” é proposição. **Errado:** é ordem.
3. “2 é maior que 10” é proposição. **Certo:** é declaração falsa.
4. “x+2=7” sem valor para x é proposição fechada. **Errado:** é sentença aberta.
5. Uma proposição falsa deixa de ser proposição. **Errado:** continua tendo valor lógico.
6. P∧Q é composta. **Certo:** combina duas proposições.
7. P pode representar uma proposição verdadeira ou falsa. **Certo:** a letra é símbolo.
8. Perguntas são proposições. **Errado:** não são declarações com valor lógico.
9. “Todo agente foi identificado” é proposição. **Certo:** é afirmação declarativa universal.
10. (P∧Q)→R combina três proposições. **Certo:** duas na condição e uma na conclusão.

## 9. Revisão final

Proposição = sentença declarativa com valor V ou F.
Falsa continua sendo proposição.
Pergunta e ordem não são proposições.
Sentença aberta depende de variável.
Simples = uma afirmação.
Composta = combinação por conectivos.
Símbolos P, Q e R representam proposições, não seus valores.','[{"b":"Sentença declarativa à qual se pode atribuir valor lógico verdadeiro ou falso.","f":"O que é proposição?"},{"b":"Não. Continua sendo proposição porque possui valor lógico definido.","f":"Uma proposição falsa deixa de ser proposição?"},{"b":"Não, pois não é sentença declarativa com valor V ou F.","f":"Pergunta é proposição?"},{"b":"Sentença cujo valor lógico depende de uma variável ainda não definida.","f":"O que é sentença aberta?"},{"b":"Declaração que não é formada pela combinação de outras proposições por conectivos.","f":"O que é proposição simples?"},{"b":"Combinação de proposições simples por conectivos lógicos.","f":"O que é proposição composta?"},{"b":"Símbolos usados para representar proposições.","f":"O que as letras P e Q representam?"},{"b":"Não. É uma frase imperativa, não declarativa.","f":"Uma ordem é proposição?"},{"b":"Sim, é uma proposição falsa.","f":"A frase ''2 é maior que 10'' é proposição?"},{"b":"Existe pelo menos um A que não é B.","f":"Como negar ''todo A é B''?"}]','[{"a":true,"q":"A frase ''O relatório foi protocolado'' pode ser uma proposição.","why":"É uma declaração que pode ser julgada verdadeira ou falsa."},{"a":false,"q":"A frase ''Feche a porta!'' é uma proposição lógica.","why":"É uma ordem, não uma declaração."},{"a":true,"q":"Uma proposição falsa continua sendo proposição.","why":"O valor lógico pode ser verdadeiro ou falso."},{"a":false,"q":"A sentença ''x é maior que 5'', sem valor definido para x, é uma proposição fechada.","why":"É sentença aberta, pois depende do valor de x."},{"a":true,"q":"Uma proposição composta pode combinar proposições simples.","why":"Conectivos formam proposições compostas."},{"a":false,"q":"Toda pergunta possui valor lógico verdadeiro ou falso.","why":"Perguntas não são sentenças declarativas."},{"a":true,"q":"A frase ''2 é maior que 10'' é uma proposição falsa.","why":"É declarativa e tem valor lógico falso."},{"a":true,"q":"P e Q são letras usadas para simbolizar proposições.","why":"A simbologia representa afirmações."},{"a":false,"q":"Uma proposição simples necessariamente é verdadeira.","why":"Pode ser verdadeira ou falsa."},{"a":true,"q":"A frase ''Todo servidor possui matrícula'' é uma afirmação declarativa.","why":"É uma proposição universal que pode ser avaliada."}]'),
('pcac-2026-raciocinio-logico-03-conectivos-logicos','Aula ampliada sobre negação, conjunção, disjunção inclusiva e exclusiva, condicional e bicondicional, com tabelas e exemplos do cotidiano.','# Aula 3 — Conjunção, disjunção, condicional e bicondicional

## 1. Por que os conectivos são importantes?

Conectivos mostram como duas ou mais afirmações se relacionam. A banca pode apresentar uma frase cotidiana e pedir o valor lógico, a negação ou a equivalência. Por isso, é essencial conhecer a regra de cada conectivo, e não apenas decorar a tradução.

## 2. Negação (¬P)

A negação troca o valor lógico:
- se P é verdadeira, ¬P é falsa;
- se P é falsa, ¬P é verdadeira.

Exemplo: P = “o sistema está ativo”. ¬P = “o sistema não está ativo”. A negação não significa necessariamente afirmar o contrário absoluto; significa que a proposição original não ocorre.

## 3. Conjunção (P∧Q): o conectivo E

A conjunção só é verdadeira quando as duas proposições são verdadeiras. Nos demais casos, é falsa.

Pense em uma autorização que exige dois requisitos: documento válido E assinatura. Se um dos requisitos faltar, a condição conjunta não foi satisfeita.

Tabela resumida:
- V e V = V;
- V e F = F;
- F e V = F;
- F e F = F.

## 4. Disjunção inclusiva (P∨Q): o OU lógico

É verdadeira quando pelo menos uma proposição é verdadeira. Só é falsa quando ambas são falsas.

Exemplo: “o servidor está de plantão ou está em sobreaviso”. No sentido inclusivo, a frase é verdadeira se uma condição ocorrer ou se ambas ocorrerem.

Tabela:
- V ou V = V;
- V ou F = V;
- F ou V = V;
- F ou F = F.

**Atenção:** em linguagem cotidiana, “ou” às vezes significa uma opção exclusiva. Em lógica proposicional, o símbolo ∨ normalmente representa OU inclusivo. O OU exclusivo exige uma condição adicional: exatamente uma das duas é verdadeira.

## 5. Condicional (P→Q): SE... ENTÃO

É falsa somente quando P é verdadeira e Q é falsa. Nos outros três casos, é verdadeira.

P é antecedente; Q é consequente. Exemplo: “Se o pedido foi aprovado, então será emitida uma autorização”. A condicional é violada quando o pedido foi aprovado, mas a autorização não foi emitida.

Uma forma de memorizar: a condicional promete Q sempre que P acontecer. Ela falha apenas quando P acontece e Q não.

## 6. Bicondicional (P↔Q): SE E SOMENTE SE

É verdadeira quando P e Q têm o mesmo valor lógico:
- V e V = V;
- V e F = F;
- F e V = F;
- F e F = V.

Pode ser entendida como duas condicionais simultâneas: (P→Q)∧(Q→P). Exemplo: “o acesso é liberado se e somente se a credencial é válida” afirma que a validade da credencial é condição necessária e suficiente para liberar o acesso, dentro da regra apresentada.

## 7. Quadro de memorização

- NÃO: inverte.
- E: exige as duas verdadeiras.
- OU inclusivo: basta uma verdadeira.
- SE... ENTÃO: só falha em V→F.
- SE E SOMENTE SE: exige valores iguais.

## 8. Erros frequentes

- Tratar OU inclusivo como exclusivo.
- Achar que condicional é falsa quando o antecedente é falso.
- Confundir bicondicional com condicional.
- Negar apenas uma parte da frase composta.
- Usar o sentido cotidiano em vez da regra formal.

## 9. Treino autoral comentado

1. V∧V=V. **Certo:** as duas são verdadeiras.
2. V∧F=V. **Errado:** a conjunção exige ambas verdadeiras.
3. F∨V=V. **Certo:** pelo menos uma verdadeira.
4. F∨F=V. **Errado:** ambas falsas tornam o OU falso.
5. V→F=F. **Certo:** único caso falso da condicional.
6. F→V=F. **Errado:** antecedente falso torna a condicional verdadeira na lógica clássica.
7. V↔V=V. **Certo:** valores iguais.
8. V↔F=V. **Errado:** valores diferentes tornam o bicondicional falso.
9. ¬F=V. **Certo:** a negação inverte.
10. O OU inclusivo admite que ambas as partes sejam verdadeiras. **Certo:** basta pelo menos uma verdadeira.

## 10. Revisão final

Conjunção: verdadeira apenas em V/V.
Disjunção inclusiva: falsa apenas em F/F.
Condicional: falsa apenas em V/F.
Bicondicional: verdadeira quando os valores são iguais.
Negação: troca V por F e F por V.','[{"b":"Quando a proposição original é falsa.","f":"Quando a negação é verdadeira?"},{"b":"Somente quando P e Q são ambas verdadeiras.","f":"Quando P∧Q é verdadeira?"},{"b":"Somente quando P e Q são ambas falsas.","f":"Quando P∨Q é falsa?"},{"b":"P verdadeira e Q falsa.","f":"Qual é o único caso falso de P→Q?"},{"b":"A proposição P na condicional P→Q.","f":"O que é antecedente?"},{"b":"A proposição Q na condicional P→Q.","f":"O que é consequente?"},{"b":"Quando P e Q possuem o mesmo valor lógico.","f":"Quando P↔Q é verdadeira?"},{"b":"Sim. Basta pelo menos uma ser verdadeira.","f":"O OU lógico inclusivo permite ambas verdadeiras?"},{"b":"Inclusivo admite ambas verdadeiras; exclusivo exige exatamente uma verdadeira.","f":"Qual a diferença entre OU inclusivo e exclusivo?"},{"b":"Como duas condicionais: P→Q e Q→P.","f":"Como interpretar bicondicional?"}]','[{"a":true,"q":"A conjunção V∧V é verdadeira.","why":"A conjunção exige que ambas as partes sejam verdadeiras."},{"a":false,"q":"A conjunção V∧F é verdadeira.","why":"Uma parte falsa torna a conjunção falsa."},{"a":true,"q":"A disjunção inclusiva F∨V é verdadeira.","why":"Pelo menos uma parte é verdadeira."},{"a":false,"q":"A disjunção inclusiva F∨F é verdadeira.","why":"Ambas falsas tornam o OU inclusivo falso."},{"a":true,"q":"A condicional V→F é o único caso falso da condicional.","why":"A promessa falha quando P ocorre e Q não."},{"a":false,"q":"A condicional F→V é falsa.","why":"Na lógica clássica, antecedente falso torna a condicional verdadeira."},{"a":true,"q":"O bicondicional V↔V é verdadeiro.","why":"Os dois valores são iguais."},{"a":false,"q":"O bicondicional V↔F é verdadeiro.","why":"Valores diferentes tornam o bicondicional falso."},{"a":true,"q":"A negação de uma proposição falsa é verdadeira.","why":"A negação inverte o valor lógico."},{"a":true,"q":"O OU inclusivo admite que ambas as proposições sejam verdadeiras.","why":"Ele exige pelo menos uma verdadeira, não exatamente uma."}]'),
('pcac-2026-raciocinio-logico-04-tabelas-verdade','Aula ampliada de tabelas-verdade, número de linhas, construção passo a passo, precedência, tautologia, contradição e contingência.','# Aula 4 — Tabelas-verdade e classificação de proposições

## 1. Para que serve a tabela-verdade?

Tabela-verdade mostra o valor lógico de uma proposição composta em todas as combinações possíveis dos valores das proposições simples. É uma forma organizada de evitar conclusões por intuição.

Se uma expressão possui n proposições simples distintas, a tabela completa tem 2ⁿ linhas. Assim:
- 1 proposição: 2 linhas;
- 2 proposições: 4 linhas;
- 3 proposições: 8 linhas;
- 4 proposições: 16 linhas.

A quantidade cresce rapidamente. Por isso, conte as letras distintas antes de começar.

## 2. Montagem das colunas

Com duas proposições P e Q, escreva as quatro combinações:
P: V, V, F, F.
Q: V, F, V, F.

Essa ordem garante que todas as combinações apareçam uma vez. Depois crie colunas auxiliares para cada parte da expressão e aplique os conectivos de dentro para fora.

## 3. Construção de P∧Q

A conjunção exige ambas verdadeiras:
- P=V e Q=V → V;
- P=V e Q=F → F;
- P=F e Q=V → F;
- P=F e Q=F → F.

A coluna final será V, F, F, F.

## 4. Construção de P→Q

A condicional só é falsa quando P=V e Q=F:
- V→V = V;
- V→F = F;
- F→V = V;
- F→F = V.

A coluna final será V, F, V, V.

## 5. Expressões com mais de um conectivo

Resolva primeiro os parênteses. Depois, use colunas auxiliares. Exemplo: (P∧Q)→P.
1. Calcule P∧Q.
2. Use o resultado como antecedente da condicional.
3. Compare com P.
A expressão será verdadeira em todas as linhas, portanto é uma tautologia.

Uma expressão sem parênteses pode seguir a precedência convencional dos conectivos, mas a prova pode explicitar agrupamentos. Nunca ignore os parênteses apresentados.

## 6. Tautologia, contradição e contingência

Tautologia: expressão verdadeira em todas as linhas. Exemplo: P∨¬P.
Contradição: expressão falsa em todas as linhas. Exemplo: P∧¬P.
Contingência: expressão verdadeira em algumas linhas e falsa em outras. Exemplo: P∧Q.

Essas classificações descrevem a coluna final inteira, não apenas uma linha.

## 7. Como conferir uma tabela

- O número de linhas é 2ⁿ.
- Cada combinação aparece uma única vez.
- A negação inverte o valor.
- A conjunção só é verdadeira em V/V.
- A disjunção inclusiva só é falsa em F/F.
- A condicional só é falsa em V/F.
- O bicondicional é verdadeiro quando os valores coincidem.

## 8. Método para resolver na prova

1. Conte as proposições simples distintas.
2. Calcule 2ⁿ linhas.
3. Monte todas as combinações.
4. Crie colunas auxiliares para subexpressões.
5. Resolva do interior dos parênteses para fora.
6. Observe a coluna final para classificar.

## 9. Treino autoral comentado

1. Duas proposições geram 4 linhas. **Certo:** 2²=4.
2. Três proposições geram 6 linhas. **Errado:** 2³=8.
3. P∨¬P é tautologia. **Certo:** uma das partes sempre será verdadeira.
4. P∧¬P é contradição. **Certo:** P e não P não podem ser verdadeiras juntas.
5. P∧Q é contingência. **Certo:** há uma linha verdadeira e três falsas.
6. P→Q é falsa em V/F. **Certo:** único caso falso.
7. P↔Q é verdadeira quando os valores são diferentes. **Errado:** é verdadeira quando são iguais.
8. Parênteses devem ser resolvidos antes da estrutura externa. **Certo:** definem o agrupamento.
9. Uma tautologia é falsa em pelo menos uma linha. **Errado:** é verdadeira em todas.
10. A tabela completa de quatro proposições possui 16 linhas. **Certo:** 2⁴=16.

## 10. Revisão final

Número de linhas = 2ⁿ.
Tautologia = sempre V.
Contradição = sempre F.
Contingência = V e F em linhas diferentes.
Construa colunas auxiliares e respeite os parênteses.','[{"b":"2ⁿ linhas.","f":"Quantas linhas tem a tabela de n proposições distintas?"},{"b":"4 linhas.","f":"Quantas linhas são necessárias para duas proposições?"},{"b":"8 linhas.","f":"Quantas linhas são necessárias para três proposições?"},{"b":"Proposição composta verdadeira em todas as linhas da tabela.","f":"O que é tautologia?"},{"b":"Proposição composta falsa em todas as linhas.","f":"O que é contradição?"},{"b":"Expressão que apresenta valores verdadeiros e falsos em linhas diferentes.","f":"O que é contingência?"},{"b":"P∨¬P.","f":"Qual é um exemplo de tautologia?"},{"b":"P∧¬P.","f":"Qual é um exemplo de contradição?"},{"b":"Começar pelas subexpressões internas e avançar para fora.","f":"Como resolver expressões com parênteses?"},{"b":"P verdadeira e Q falsa.","f":"Qual o único caso falso de P→Q?"}]','[{"a":true,"q":"Uma tabela com duas proposições distintas possui quatro linhas.","why":"2²=4 combinações possíveis."},{"a":false,"q":"Uma tabela com três proposições distintas possui seis linhas.","why":"2³=8 linhas."},{"a":true,"q":"P∨¬P é uma tautologia.","why":"Ou P é verdadeira ou sua negação é verdadeira."},{"a":true,"q":"P∧¬P é uma contradição.","why":"Uma proposição e sua negação não podem ser verdadeiras simultaneamente."},{"a":true,"q":"P∧Q é uma contingência.","why":"A expressão é verdadeira em V/V e falsa nas demais combinações."},{"a":true,"q":"P→Q é falsa quando P é verdadeira e Q é falsa.","why":"É o único caso de falsidade da condicional."},{"a":false,"q":"P↔Q é verdadeira quando P e Q têm valores diferentes.","why":"O bicondicional é verdadeiro quando os valores são iguais."},{"a":true,"q":"Em expressões com parênteses, deve-se resolver primeiro a subexpressão interna.","why":"Os parênteses definem o agrupamento."},{"a":false,"q":"Uma tautologia pode apresentar uma linha falsa.","why":"Tautologia é verdadeira em todas as linhas."},{"a":true,"q":"Uma tabela de quatro proposições distintas possui 16 linhas.","why":"2⁴=16."}]'),
('pcac-2026-raciocinio-logico-05-equivalencias-negacoes-de-morgan','Aula ampliada de equivalências, contrapositiva, negação de condicionais e de proposições universais/existenciais, leis de De Morgan, quantificadores e tradução de frases.','# Aula 5 — Equivalências lógicas, negações e leis de De Morgan

## 1. O que é equivalência lógica?

Duas proposições são logicamente equivalentes quando possuem o mesmo valor lógico em todas as combinações possíveis. A equivalência pode ser demonstrada por tabela-verdade ou por regras conhecidas.

O símbolo ≡ indica equivalência lógica. Não significa que as frases tenham exatamente as mesmas palavras, mas que a estrutura produz os mesmos valores lógicos.

## 2. Condicional e disjunção

A equivalência fundamental:
P→Q ≡ ¬P∨Q.

Leia: “se P, então Q” equivale a “não P ou Q”. A expressão só é falsa quando P é verdadeira e Q é falsa, exatamente como a condicional.

Outra equivalência importante:
P→Q ≡ ¬Q→¬P.

Essa segunda forma é a contrapositiva. Não confunda com a recíproca Q→P, que não é equivalente em geral.

## 3. Leis de De Morgan

As leis de De Morgan tratam da negação de conjunção e disjunção:
- ¬(P∧Q) ≡ ¬P∨¬Q.
- ¬(P∨Q) ≡ ¬P∧¬Q.

A regra prática é: ao negar a expressão inteira, negue cada parte e troque o conectivo E pelo OU, ou OU pelo E.

Exemplo: negar “o agente registrou o fato e comunicou a chefia” resulta em “o agente não registrou o fato ou não comunicou a chefia”.

## 4. Negação da condicional

A negação de P→Q é P∧¬Q. Para provar que a condicional “se P, então Q” falhou, precisamos afirmar que P aconteceu e Q não aconteceu.

Exemplo: “Se houve autorização, o acesso foi liberado”. Negação: “Houve autorização e o acesso não foi liberado”.

## 5. Bicondicional

P↔Q equivale a (P→Q)∧(Q→P). Também pode ser escrita como (P∧Q)∨(¬P∧¬Q), pois é verdadeira quando as duas proposições são iguais em valor lógico.

## 6. Negação de quantificadores

- Negação de “todo A é B”: “existe pelo menos um A que não é B”.
- Negação de “existe A que é B”: “nenhum A é B”.
- Negação de “nenhum A é B”: “existe pelo menos um A que é B”.

Exemplo: “Todos os relatórios foram assinados” é negada por “pelo menos um relatório não foi assinado”. Não é necessário que nenhum relatório tenha sido assinado.

## 7. Como resolver sem decorar frases soltas

1. Identifique o conectivo principal.
2. Coloque a negação sobre a expressão inteira.
3. Aplique a regra correspondente.
4. Troque E por OU e OU por E nas leis de De Morgan.
5. Em condicional, use P∧¬Q para a negação.
6. Em quantificadores, troque todo por existe pelo menos um que não, e existe por nenhum.

## 8. Pegadinhas

- Contrapositiva é equivalente à condicional.
- Recíproca não é equivalente em geral.
- Negar uma conjunção produz disjunção.
- Negar uma disjunção produz conjunção.
- Negação de condicional não é ¬P→¬Q.
- Negar “todo” não significa “nenhum”; significa “existe ao menos um que não”.
- Negação de “existe” é “nenhum”.

## 9. Treino autoral comentado

1. P→Q ≡ ¬P∨Q. **Certo:** mesma condição de falsidade.
2. Contrapositiva de P→Q é ¬Q→¬P. **Certo:** equivalente.
3. Recíproca Q→P é sempre equivalente a P→Q. **Errado:** não em geral.
4. ¬(P∧Q) ≡ ¬P∨¬Q. **Certo:** De Morgan.
5. ¬(P∨Q) ≡ ¬P∧¬Q. **Certo:** De Morgan.
6. Negação de P→Q é ¬P∧Q. **Errado:** é P∧¬Q.
7. P↔Q equivale a duas condicionais simultâneas. **Certo:** (P→Q)∧(Q→P).
8. Negação de “todos foram aprovados” é “ninguém foi aprovado”. **Errado:** basta ao menos um não ter sido aprovado.
9. Negação de “existe alguém presente” é “ninguém está presente”. **Certo:** negação do existencial.
10. A negação da disjunção troca OU por E. **Certo:** conforme De Morgan.

## 10. Revisão final

P→Q ≡ ¬P∨Q.
Contrapositiva: ¬Q→¬P.
Negação de condicional: P∧¬Q.
¬(P∧Q) ≡ ¬P∨¬Q.
¬(P∨Q) ≡ ¬P∧¬Q.
Negar todo: existe ao menos um que não.
Negar existe: nenhum.','[{"b":"Quando possuem o mesmo valor lógico em todas as combinações possíveis.","f":"Quando duas proposições são logicamente equivalentes?"},{"b":"¬P∨Q.","f":"Qual a equivalência de P→Q?"},{"b":"¬Q→¬P.","f":"Qual é a contrapositiva de P→Q?"},{"b":"Não, em geral não é equivalente.","f":"A recíproca Q→P é sempre equivalente à condicional?"},{"b":"¬(P∧Q) ≡ ¬P∨¬Q.","f":"Qual é a lei de De Morgan para a conjunção?"},{"b":"¬(P∨Q) ≡ ¬P∧¬Q.","f":"Qual é a lei de De Morgan para a disjunção?"},{"b":"P∧¬Q.","f":"Qual é a negação de P→Q?"},{"b":"(P→Q)∧(Q→P).","f":"Como representar o bicondicional?"},{"b":"Existe pelo menos um A que não é B.","f":"Como negar ''todo A é B''?"},{"b":"Nenhum A é B.","f":"Como negar ''existe algum A que é B''?"}]','[{"a":true,"q":"P→Q é logicamente equivalente a ¬P∨Q.","why":"As duas expressões são falsas apenas quando P é verdadeira e Q é falsa."},{"a":true,"q":"A contrapositiva de P→Q é ¬Q→¬P.","why":"A contrapositiva mantém a equivalência lógica."},{"a":false,"q":"A recíproca Q→P é sempre equivalente a P→Q.","why":"A recíproca não é equivalente em geral."},{"a":true,"q":"A negação de P∧Q equivale a ¬P∨¬Q.","why":"É a primeira lei de De Morgan."},{"a":true,"q":"A negação de P∨Q equivale a ¬P∧¬Q.","why":"É a segunda lei de De Morgan."},{"a":false,"q":"A negação de P→Q é ¬P∧Q.","why":"A negação correta é P∧¬Q."},{"a":true,"q":"O bicondicional equivale à conjunção das duas condicionais recíprocas.","why":"P↔Q equivale a (P→Q)∧(Q→P)."},{"a":false,"q":"A negação de ''todos foram aprovados'' é ''ninguém foi aprovado''.","why":"Basta existir pelo menos um que não foi aprovado."},{"a":true,"q":"A negação de ''existe alguém presente'' é ''ninguém está presente''.","why":"A negação do existencial é universal negativa."},{"a":true,"q":"Ao negar uma disjunção, a lei de De Morgan troca OU por E.","why":"¬(P∨Q) equivale a ¬P∧¬Q."}]'),
('pcac-2026-raciocinio-logico-06-argumentacao-validade','Aula ampliada de argumentos, premissas, conclusão, validade, inferências, modus ponens, modus tollens e falácias formais.','# Aula 6 — Argumentação lógica e validade de argumentos

## 1. Estrutura de um argumento

Um argumento é um conjunto de afirmações em que algumas funcionam como premissas e outra como conclusão. Premissas são os pontos de partida; conclusão é aquilo que se pretende justificar.

Exemplo:
- Premissa 1: Se o documento foi aprovado, então será arquivado.
- Premissa 2: O documento foi aprovado.
- Conclusão: O documento será arquivado.

A conclusão é indicada por expressões como “logo”, “portanto”, “assim” ou “consequentemente”. As premissas podem aparecer antes ou depois dela; leia o raciocínio completo.

## 2. Validade não é a mesma coisa que verdade

Um argumento é válido quando não existe uma situação em que todas as premissas sejam verdadeiras e a conclusão seja falsa. A validade é uma propriedade da forma lógica.

Um argumento pode ter premissas factualmente falsas e ainda apresentar forma válida. Também pode ter conclusão verdadeira por coincidência, mas ser inválido. A prova costuma avaliar a ligação lógica, não se o tema da frase é real.

## 3. Modus ponens

Forma:
1. P→Q.
2. P.
3. Logo, Q.

Exemplo: se houve autorização, o acesso será liberado. Houve autorização. Logo, o acesso será liberado.

A afirmação do antecedente permite concluir o consequente.

## 4. Modus tollens

Forma:
1. P→Q.
2. ¬Q.
3. Logo, ¬P.

Exemplo: se o sistema registrou a operação, haverá protocolo. Não há protocolo. Logo, o sistema não registrou a operação, dentro das premissas do argumento.

A negação do consequente permite negar o antecedente.

## 5. Duas falácias formais comuns

**Afirmação do consequente:**
P→Q; Q; logo P.
É inválida, pois Q pode ocorrer por outra razão.

Exemplo: se chove, a rua fica molhada. A rua está molhada. Não se pode concluir que choveu: alguém pode ter lavado a rua.

**Negação do antecedente:**
P→Q; ¬P; logo ¬Q.
Também é inválida. A ausência de P não impede que Q ocorra por outra causa.

Exemplo: se o agente está de plantão, o prédio está aberto. O agente não está de plantão. Não se conclui que o prédio está fechado.

## 6. Silogismos e encadeamento

Se P→Q e Q→R, então P→R. Essa forma é chamada silogismo hipotético. Exemplo: se o documento é validado, será encaminhado; se for encaminhado, será arquivado; portanto, se for validado, será arquivado.

Organize as proposições por letras e procure se o consequente de uma premissa conecta com o antecedente da seguinte.

## 7. Como testar validade

Para verificar uma forma, tente encontrar um contraexemplo: uma combinação em que as premissas sejam verdadeiras e a conclusão falsa. Se conseguir, o argumento é inválido. Se nenhuma combinação permitir isso, a forma é válida.

Em prova, a tabela-verdade ajuda, mas muitas formas podem ser reconhecidas por regras. Não aceite uma conclusão só porque “parece fazer sentido”.

## 8. Treino autoral comentado

1. P→Q; P; logo Q é modus ponens. **Certo.**
2. P→Q; ¬Q; logo ¬P é modus tollens. **Certo.**
3. P→Q; Q; logo P é válido. **Errado:** afirmação do consequente.
4. P→Q; ¬P; logo ¬Q é válido. **Errado:** negação do antecedente.
5. Um argumento válido não pode ter premissas falsas. **Errado:** validade depende da forma.
6. Premissas verdadeiras com conclusão falsa tornam o argumento inválido. **Certo:** é exatamente o contraexemplo à validade.
7. P→Q e Q→R permitem concluir P→R. **Certo:** silogismo hipotético.
8. Conclusão verdadeira garante validade. **Errado:** pode ser verdadeira por coincidência.
9. “Logo” pode introduzir a conclusão. **Certo:** é indicador argumentativo.
10. Procurar contraexemplo ajuda a testar validade. **Certo:** uma situação com premissas V e conclusão F invalida a forma.

## 9. Revisão final

Modus ponens: P→Q; P; logo Q.
Modus tollens: P→Q; ¬Q; logo ¬P.
Afirmação do consequente: inválida.
Negação do antecedente: inválida.
Validade: não existe caso com premissas verdadeiras e conclusão falsa.','[{"b":"Afirmação usada como ponto de partida de um argumento.","f":"O que é premissa?"},{"b":"Afirmação que o argumento pretende justificar a partir das premissas.","f":"O que é conclusão?"},{"b":"Quando não há situação em que todas as premissas sejam verdadeiras e a conclusão falsa.","f":"Quando um argumento é válido?"},{"b":"P→Q; P; logo Q.","f":"Qual a forma do modus ponens?"},{"b":"P→Q; ¬Q; logo ¬P.","f":"Qual a forma do modus tollens?"},{"b":"P→Q; Q; logo P. É uma forma inválida.","f":"O que é afirmação do consequente?"},{"b":"P→Q; ¬P; logo ¬Q. É uma forma inválida.","f":"O que é negação do antecedente?"},{"b":"De P→Q e Q→R, conclui-se P→R.","f":"O que é silogismo hipotético?"},{"b":"Encontrar um caso com premissas verdadeiras e conclusão falsa.","f":"Como demonstrar invalidade?"},{"b":"Não. A conclusão pode ser verdadeira por coincidência.","f":"Conclusão verdadeira garante validade?"}]','[{"a":true,"q":"P→Q; P; logo Q é uma forma válida chamada modus ponens.","why":"A afirmação do antecedente permite concluir o consequente."},{"a":true,"q":"P→Q; ¬Q; logo ¬P é modus tollens.","why":"A negação do consequente permite negar o antecedente."},{"a":false,"q":"P→Q; Q; logo P é sempre válido.","why":"É a falácia da afirmação do consequente."},{"a":false,"q":"P→Q; ¬P; logo ¬Q é válido.","why":"É a falácia da negação do antecedente."},{"a":false,"q":"Um argumento válido necessariamente possui premissas verdadeiras.","why":"Validade diz respeito à estrutura, não à verdade factual das premissas."},{"a":true,"q":"Premissas verdadeiras e conclusão falsa constituem contraexemplo à validade.","why":"Essa situação demonstra invalidade."},{"a":true,"q":"De P→Q e Q→R pode-se inferir P→R.","why":"É o silogismo hipotético."},{"a":false,"q":"Uma conclusão verdadeira, sozinha, prova a validade do argumento.","why":"A validade depende da relação entre premissas e conclusão."},{"a":true,"q":"A expressão ''portanto'' pode introduzir a conclusão de um argumento.","why":"É um indicador linguístico de conclusão."},{"a":true,"q":"Encontrar uma linha com premissas verdadeiras e conclusão falsa demonstra invalidade.","why":"Essa é a definição operacional de contraexemplo."}]'),
('pcac-2026-raciocinio-logico-07-verdades-mentiras','Aula ampliada de problemas de verdades e mentiras, declarações condicionais, consistência, casos possíveis, tabelas e estratégias de resolução.','# Aula 7 — Problemas de verdades e mentiras

## 1. Qual é a estrutura desses problemas?

Questões de verdades e mentiras apresentam pessoas, declarações ou cenários em que se sabe que alguém sempre fala a verdade, sempre mente, ou que uma quantidade específica de afirmações é verdadeira.

O objetivo é encontrar uma configuração compatível com todas as regras. Não comece escolhendo intuitivamente quem mente. Transforme cada declaração em uma condição lógica.

## 2. Traduza as declarações

Exemplo:
- Ana diz: “Bruno está mentindo”.
- Bruno diz: “Ana e eu falamos a verdade”.

Defina T_A como “Ana fala a verdade” e T_B como “Bruno fala a verdade”. A declaração de Ana afirma ¬T_B. A declaração de Bruno afirma T_A∧T_B.

Agora teste as possibilidades:
- Se Ana diz a verdade, Bruno mente.
- Se Bruno diz a verdade, então Ana e Bruno dizem a verdade, o que contradiz a fala de Ana.
A estrutura permite eliminar combinações incompatíveis.

## 3. Método da hipótese

1. Escolha uma pessoa e suponha que fala a verdade.
2. Interprete literalmente o conteúdo da declaração.
3. Deduz a condição para as demais pessoas.
4. Verifique se surge contradição.
5. Se houver contradição, a hipótese inicial é falsa.
6. Teste a hipótese alternativa.

Esse método é especialmente útil quando o enunciado garante que cada pessoa é sempre verdadeira ou sempre mentirosa.

## 4. Declarações sobre o próprio falante

Frases como “eu sempre minto” exigem cuidado. Se o personagem é classificado como alguém que sempre diz a verdade ou sempre mente, a declaração pode gerar contradição. Não assuma que todo enigma possui solução: às vezes a conclusão correta é que as condições são inconsistentes.

## 5. Quantidade exata de verdades

Se o enunciado disser “exatamente uma das três afirmações é verdadeira”, monte uma tabela com as oito combinações possíveis de P, Q e R (2³=8) ou teste cada hipótese. Conte quantas afirmações ficam verdadeiras em cada linha.

“Pelo menos uma” significa uma ou mais. “No máximo uma” significa zero ou uma. “Exatamente uma” significa uma e somente uma. Essas expressões não são intercambiáveis.

## 6. Problemas com cartões, portas ou suspeitos

Quando declarações estiverem em cartões ou forem atribuídas a suspeitos, escreva cada frase de forma simbólica e marque quem poderia tê-la dito. Evite inferir culpa ou verdade com base em características irrelevantes da narrativa; use apenas as regras declaradas.

## 7. Exemplo resolvido

Há dois suspeitos. A diz: “B participou”. B diz: “A e eu não participamos”. Sabe-se que exatamente uma das declarações é verdadeira.

Defina A=participação de A e B=participação de B.
Declaração de A: B.
Declaração de B: ¬A∧¬B.
Teste as combinações de A e B e confira o número de declarações verdadeiras. A condição “exatamente uma” deve ser respeitada. Não confunda verdade da declaração com participação da pessoa: uma frase pode falar de um fato e seu valor depende do fato descrito.

## 8. Erros frequentes

- Supor que a primeira pessoa sempre diz a verdade sem testar.
- Confundir “pelo menos uma” com “exatamente uma”.
- Não verificar a hipótese contra todas as declarações.
- Confundir a verdade de uma frase com a identidade de quem a pronuncia.
- Ignorar a possibilidade de contradição ou ausência de solução.
- Tratar “sempre mente” como “toda frase isolada é falsa” sem considerar a regra exata do enunciado.

## 9. Treino autoral comentado

1. “Exatamente uma” permite duas afirmações verdadeiras. **Errado:** permite uma.
2. “Pelo menos uma” pode significar duas ou três verdadeiras. **Certo:** uma ou mais.
3. Uma hipótese deve ser conferida com todas as falas. **Certo:** basta uma contradição para eliminá-la.
4. Se uma hipótese gera contradição, ela deve ser descartada. **Certo:** não satisfaz as regras.
5. “No máximo uma” permite zero verdadeiras. **Certo:** zero ou uma.
6. A quantidade de combinações de três proposições é oito. **Certo:** 2³.
7. Uma narrativa garante sempre que exista solução. **Errado:** condições podem ser inconsistentes.
8. A fala de alguém deve ser traduzida como uma proposição. **Certo:** depois teste seu valor.
9. “Pelo menos uma” significa exatamente uma. **Errado:** significa uma ou mais.
10. Testar casos sistematicamente reduz erros. **Certo:** evita conclusões intuitivas.

## 10. Revisão final

Exatamente uma = 1.
Pelo menos uma = 1 ou mais.
No máximo uma = 0 ou 1.
Com n proposições, há 2ⁿ combinações.
Traduza, suponha, deduza e teste todas as condições.','[{"b":"Traduzir cada declaração em uma condição lógica e identificar as regras do enunciado.","f":"Como começar um problema de verdades e mentiras?"},{"b":"Uma e somente uma afirmação verdadeira.","f":"O que significa exatamente uma afirmação verdadeira?"},{"b":"Uma ou mais afirmações verdadeiras.","f":"O que significa pelo menos uma?"},{"b":"Zero ou uma afirmação verdadeira.","f":"O que significa no máximo uma?"},{"b":"2³=8 combinações.","f":"Quantas combinações existem para três proposições?"},{"b":"Descartá-la, pois não satisfaz as condições.","f":"O que fazer quando uma hipótese gera contradição?"},{"b":"Não. As condições podem ser inconsistentes.","f":"Toda questão de verdade e mentira tem solução?"},{"b":"Para garantir que a hipótese respeite todas as regras simultaneamente.","f":"Por que testar todas as declarações?"},{"b":"Ignorar uma condição ou confundir o conteúdo da fala com sua veracidade.","f":"Qual o risco de resolver por intuição?"},{"b":"Traduzir, supor, deduzir, verificar contradições e testar a hipótese alternativa.","f":"Qual a sequência recomendada?"}]','[{"a":false,"q":"A expressão ''exatamente uma'' permite duas afirmações verdadeiras.","why":"Exatamente uma significa uma e somente uma."},{"a":true,"q":"''Pelo menos uma'' pode admitir várias afirmações verdadeiras.","why":"Significa uma ou mais."},{"a":true,"q":"Uma hipótese em problema de mentirosos deve ser verificada contra todas as declarações.","why":"Uma única contradição já elimina a hipótese."},{"a":true,"q":"Se uma hipótese gera contradição, ela deve ser descartada.","why":"Ela não satisfaz as condições do enunciado."},{"a":true,"q":"''No máximo uma'' permite que nenhuma afirmação seja verdadeira.","why":"Zero ou uma é permitido."},{"a":true,"q":"Três proposições simples distintas geram oito combinações.","why":"2³=8."},{"a":false,"q":"Todo enigma de verdades e mentiras necessariamente possui uma solução.","why":"Pode haver condições incompatíveis."},{"a":true,"q":"A verdade de uma declaração depende do conteúdo afirmado e dos fatos do cenário.","why":"Não depende da aparência ou identidade do personagem."},{"a":false,"q":"''Pelo menos uma'' significa exatamente uma.","why":"Pelo menos uma pode incluir duas ou mais."},{"a":true,"q":"Testar as combinações de forma sistemática reduz erros de raciocínio.","why":"O método evita esquecer condições."}]'),
('pcac-2026-raciocinio-logico-08-sequencias-pa-pg','Aula ampliada de sequências numéricas, identificação de padrões, progressão aritmética e geométrica, termo geral e soma.','# Aula 8 — Sequências numéricas, padrões, PA e PG

## 1. O que é uma sequência?

Sequência é uma lista ordenada de números que segue uma regra. O desafio é descobrir como um termo se relaciona com o anterior ou com sua posição.

Exemplos:
- 2, 4, 6, 8... soma-se 2;
- 3, 6, 12, 24... multiplica-se por 2;
- 1, 4, 9, 16... são quadrados de 1, 2, 3, 4.

Não assuma que toda sequência é PA ou PG. Verifique a regra antes de aplicar uma fórmula.

## 2. Progressão aritmética (PA)

PA é uma sequência em que a diferença entre termos consecutivos é constante. Essa diferença é a razão r.

Exemplo: 5, 8, 11, 14...
r=8−5=3; 11−8=3; 14−11=3.

Se r>0, a PA é crescente; se r<0, decrescente; se r=0, constante.

## 3. Termo geral da PA

aₙ=a₁+(n−1)r.

- aₙ: termo que queremos encontrar;
- a₁: primeiro termo;
- n: posição;
- r: razão.

Exemplo: a₁=5, r=3. O 10º termo é a₁₀=5+(10−1)×3=5+27=32.

O erro comum é usar n×r em vez de (n−1)×r. O primeiro termo já está na posição 1, por isso são apenas n−1 intervalos.

## 4. Soma dos termos da PA

Sₙ=n(a₁+aₙ)/2.

Exemplo: PA 2, 4, 6, 8, 10. Há 5 termos; primeiro=2 e último=10. S₅=5×(2+10)/2=30.

A fórmula pode ser entendida como número de termos multiplicado pela média entre o primeiro e o último.

## 5. Progressão geométrica (PG)

PG é uma sequência em que a divisão entre termos consecutivos é constante, chamada razão q.

Exemplo: 3, 6, 12, 24...
q=6/3=2; 12/6=2; 24/12=2.

Se q>1 e primeiro termo positivo, os termos crescem em módulo; se 0<q<1, aproximam-se de zero. Com razões negativas, os sinais alternam, então observe os valores e não use apenas a palavra crescente ou decrescente sem analisar o caso.

## 6. Termo geral da PG

aₙ=a₁×q^(n−1).

Exemplo: a₁=3, q=2. O quinto termo é 3×2⁴=48.

Assim como na PA, o expoente é n−1 porque o primeiro termo não recebeu nenhuma multiplicação por q.

## 7. Soma da PG finita

Para q≠1:
Sₙ=a₁(qⁿ−1)/(q−1).

Também pode ser escrita com sinais equivalentes: a₁(1−qⁿ)/(1−q).

Exemplo: 2, 4, 8, 16. São 4 termos, a₁=2, q=2.
S₄=2(2⁴−1)/(2−1)=2×15=30.

Se q=1, todos os termos são iguais a a₁ e a soma é n×a₁.

## 8. Como identificar o padrão

1. Calcule diferenças entre termos consecutivos.
2. Se a diferença for constante, teste PA.
3. Se a razão entre termos for constante, teste PG.
4. Se não for, procure quadrados, cubos, alternância ou padrão intercalado.
5. Confira se a regra explica todos os termos apresentados.

## 9. Pegadinhas

- PA usa diferença; PG usa quociente.
- O termo geral usa n−1.
- Soma da PA usa primeiro e último termos.
- Soma da PG exige atenção a q=1.
- Uma sequência pode alternar duas regras.
- Um padrão que explica apenas os dois primeiros intervalos não basta; verifique todos.

## 10. Treino autoral comentado

1. 4, 7, 10, 13 é PA de razão 3. **Certo.**
2. 2, 6, 18, 54 é PG de razão 3. **Certo.**
3. Na PA com a₁=5 e r=3, a₁₀=35. **Errado:** 5+9×3=32.
4. A soma de 2, 4, 6, 8, 10 é 30. **Certo.**
5. Na PG 3, 6, 12, o quarto termo é 24. **Certo.**
6. A razão da PA é o quociente entre termos consecutivos. **Errado:** é a diferença.
7. A razão da PG é o quociente entre termos consecutivos. **Certo.**
8. Se q=1, a soma de n termos da PG é n×a₁. **Certo.**
9. Na PG com a₁=2 e q=2, o quinto termo é 32. **Certo:** 2×2⁴=32.
10. Toda sequência numérica é obrigatoriamente PA ou PG. **Errado:** pode seguir outros padrões.

## 11. Revisão final

PA: diferença constante; aₙ=a₁+(n−1)r.
Soma PA: Sₙ=n(a₁+aₙ)/2.
PG: razão constante; aₙ=a₁q^(n−1).
Soma PG finita, q≠1: Sₙ=a₁(qⁿ−1)/(q−1).
Sempre teste a regra em todos os termos.','[{"b":"Diferença constante entre termos consecutivos.","f":"O que caracteriza uma PA?"},{"b":"Diferença entre um termo e o anterior.","f":"O que é a razão da PA?"},{"b":"aₙ=a₁+(n−1)r.","f":"Qual a fórmula do termo geral da PA?"},{"b":"Sₙ=n(a₁+aₙ)/2.","f":"Qual a fórmula da soma da PA?"},{"b":"Quociente constante entre termos consecutivos.","f":"O que caracteriza uma PG?"},{"b":"Quociente entre um termo e o anterior.","f":"O que é a razão da PG?"},{"b":"aₙ=a₁×q^(n−1).","f":"Qual a fórmula do termo geral da PG?"},{"b":"Sₙ=a₁(qⁿ−1)/(q−1).","f":"Qual a fórmula da soma finita da PG para q≠1?"},{"b":"n×a₁.","f":"Quanto é a soma de uma PG de razão 1 com n termos?"},{"b":"Não. Pode seguir outros padrões numéricos.","f":"Toda sequência é PA ou PG?"}]','[{"a":true,"q":"A sequência 4, 7, 10, 13 é uma PA de razão 3.","why":"As diferenças consecutivas são iguais a 3."},{"a":true,"q":"A sequência 2, 6, 18, 54 é uma PG de razão 3.","why":"Cada termo é o anterior multiplicado por 3."},{"a":false,"q":"Na PA com primeiro termo 5 e razão 3, o décimo termo é 35.","why":"a₁₀=5+(10−1)×3=32."},{"a":true,"q":"A soma de 2, 4, 6, 8 e 10 é 30.","why":"A soma dos cinco termos é 30."},{"a":true,"q":"Na PG 3, 6, 12, o quarto termo é 24.","why":"Multiplica-se por 2 novamente."},{"a":false,"q":"A razão da PA é o quociente entre termos consecutivos.","why":"A razão da PA é a diferença constante."},{"a":true,"q":"A razão da PG é o quociente entre termos consecutivos.","why":"Essa é a definição da razão geométrica."},{"a":true,"q":"Se a razão da PG é 1, a soma de n termos é n vezes o primeiro termo.","why":"Todos os termos são iguais ao primeiro."},{"a":true,"q":"Na PG de primeiro termo 2 e razão 2, o quinto termo é 32.","why":"a₅=2×2⁴=32."},{"a":false,"q":"Toda sequência numérica precisa ser uma PA ou PG.","why":"Existem muitos outros padrões possíveis."}]'),
('pcac-2026-raciocinio-logico-09-conjuntos-relacoes-ordem-equivalencia','Aula ampliada de teoria dos conjuntos, pertinência, inclusão, operações, relações de ordem e equivalência, diagramas e inclusão-exclusão para dois e três conjuntos.','# Aula 9 — Relações de ordem, equivalência e operações com conjuntos

## 1. Elementos e conjuntos

Conjunto é uma coleção de elementos. A notação x∈A significa que x pertence ao conjunto A; x∉A significa que não pertence. A ordem dos elementos e repetições não alteram o conjunto: {1,2,2,3}={1,2,3}.

Conjunto vazio, representado por ∅, não possui elementos. O conjunto universo U é o universo de referência do problema. O complemento de A reúne os elementos de U que não estão em A.

## 2. Pertinência e inclusão

Pertinência relaciona elemento e conjunto: 2∈A. Inclusão relaciona conjunto com conjunto: A⊂B significa que todo elemento de A também pertence a B.

Exemplo: A={1,2} e B={1,2,3}. Então 1∈A e A⊂B. Não escreva 1⊂A, pois 1 é elemento, não conjunto.

Dois conjuntos são iguais quando possuem exatamente os mesmos elementos. A⊆B e B⊆A, simultaneamente, significam A=B.

## 3. União, interseção e diferença

União A∪B: elementos que pertencem a pelo menos um dos conjuntos.
Interseção A∩B: elementos comuns aos dois.
Diferença A−B: elementos de A que não estão em B.

Exemplo: A={1,2,3} e B={3,4}.
A∪B={1,2,3,4}.
A∩B={3}.
A−B={1,2}.
B−A={4}.

## 4. Relação de ordem

Uma relação de ordem permite comparar elementos segundo uma regra. Em uma ordem parcial, a relação é reflexiva, antissimétrica e transitiva:
- reflexiva: a≤a;
- antissimétrica: se a≤b e b≤a, então a=b;
- transitiva: se a≤b e b≤c, então a≤c.

A ordem total acrescenta comparabilidade: quaisquer dois elementos podem ser comparados. Nem toda relação de ordem é total.

## 5. Relação de equivalência

Uma relação é de equivalência quando é:
- reflexiva: a~a;
- simétrica: se a~b, então b~a;
- transitiva: se a~b e b~c, então a~c.

Exemplo intuitivo: ter o mesmo resto na divisão por 3. Os números 2 e 5 são equivalentes nesse critério porque ambos deixam resto 2; 5 e 8 também. A relação não exige que os números sejam iguais.

## 6. Inclusão-exclusão

Para dois conjuntos finitos:
n(A∪B)=n(A)+n(B)−n(A∩B).

Para três:
n(A∪B∪C)=n(A)+n(B)+n(C)−n(A∩B)−n(A∩C)−n(B∩C)+n(A∩B∩C).

A interseção é subtraída porque os elementos comuns foram contados repetidamente. No caso de três conjuntos, a interseção tripla volta a ser somada para corrigir a subtração em excesso.

## 7. Como resolver problemas de conjuntos

1. Defina o universo.
2. Identifique cada conjunto e seu significado.
3. Desenhe o diagrama de Venn se houver grupos sobrepostos.
4. Preencha primeiro as interseções mais específicas.
5. Use inclusão-exclusão para encontrar a união.
6. Confira se o total não supera o universo.

## 8. Pegadinhas

- Pertinência não é inclusão.
- União é “A ou B”; interseção é “A e B”.
- A−B não é igual a B−A.
- Elementos repetidos contam uma vez em um conjunto.
- Relação de equivalência exige reflexiva, simétrica e transitiva.
- Relação de ordem parcial exige reflexiva, antissimétrica e transitiva.
- A interseção tripla deve ser somada novamente na fórmula de três conjuntos.

## 9. Treino autoral comentado

1. Se 2 pertence a A, escrevemos 2∈A. **Certo.**
2. A⊂B indica que A é elemento de B. **Errado:** indica inclusão de conjuntos.
3. A∪B contém elementos de pelo menos um conjunto. **Certo.**
4. A∩B contém elementos comuns. **Certo.**
5. A−B sempre é igual a B−A. **Errado:** diferença depende da ordem.
6. Relação de equivalência é reflexiva, simétrica e transitiva. **Certo.**
7. Relação de ordem parcial é simétrica. **Errado:** é antissimétrica.
8. Em A={1,2,2,3}, há quatro elementos. **Errado:** há três elementos distintos.
9. Inclusão-exclusão subtrai a interseção para evitar dupla contagem. **Certo.**
10. Em três conjuntos, a interseção tripla é somada na fórmula final. **Certo.**

## 10. Revisão final

∈: elemento pertence.
⊂: conjunto incluído em outro.
∪: união.
∩: interseção.
A−B: diferença.
Equivalência: reflexiva, simétrica e transitiva.
Ordem parcial: reflexiva, antissimétrica e transitiva.
União de dois conjuntos = soma dos tamanhos menos interseção.','[{"b":"O elemento x pertence ao conjunto A.","f":"O que significa x∈A?"},{"b":"Todo elemento de A também pertence a B.","f":"O que significa A⊂B?"},{"b":"Pertinência relaciona elemento e conjunto; inclusão relaciona dois conjuntos.","f":"Qual a diferença entre pertinência e inclusão?"},{"b":"Conjunto dos elementos que pertencem a pelo menos um dos conjuntos.","f":"O que é união?"},{"b":"Conjunto dos elementos comuns aos conjuntos.","f":"O que é interseção?"},{"b":"Elementos que pertencem a A e não pertencem a B.","f":"O que é diferença A−B?"},{"b":"Reflexiva, simétrica e transitiva.","f":"Quais propriedades definem relação de equivalência?"},{"b":"Reflexiva, antissimétrica e transitiva.","f":"Quais propriedades definem ordem parcial?"},{"b":"n(A∪B)=n(A)+n(B)−n(A∩B).","f":"Qual a fórmula de inclusão-exclusão para dois conjuntos?"},{"b":"Para corrigir a subtração em excesso da interseção tripla.","f":"Por que a interseção tripla é somada na fórmula de três conjuntos?"}]','[{"a":true,"q":"A notação 2∈A indica que o elemento 2 pertence ao conjunto A.","why":"O símbolo de pertinência relaciona elemento e conjunto."},{"a":false,"q":"A⊂B significa que A é um elemento de B.","why":"A⊂B indica inclusão de conjuntos."},{"a":true,"q":"A união reúne os elementos que pertencem a pelo menos um dos conjuntos.","why":"A união corresponde ao OU."},{"a":true,"q":"A interseção contém os elementos comuns aos conjuntos.","why":"A interseção corresponde ao E."},{"a":false,"q":"A−B é sempre igual a B−A.","why":"A diferença depende da ordem dos conjuntos."},{"a":true,"q":"Uma relação de equivalência é reflexiva, simétrica e transitiva.","why":"Essas são as três propriedades exigidas."},{"a":false,"q":"Uma relação de ordem parcial precisa ser simétrica.","why":"A propriedade é antissimetria."},{"a":false,"q":"O conjunto {1,2,2,3} possui quatro elementos distintos.","why":"Repetições não criam novos elementos; são três."},{"a":true,"q":"A fórmula da união de dois conjuntos subtrai a interseção para evitar dupla contagem.","why":"Os elementos comuns foram contados duas vezes."},{"a":true,"q":"Na fórmula de inclusão-exclusão de três conjuntos, soma-se novamente a interseção tripla.","why":"A correção restaura a contagem dos elementos comuns aos três."}]'),
('pcac-2026-raciocinio-logico-10-porcentagem-juros-razao-proporcao-regra-tres','Aula ampliada de razão, proporção, porcentagem, variações sucessivas, regra de três direta e inversa, juros simples e compostos.','# Aula 10 — Porcentagem, juros, razão, proporção e regra de três

## 1. Razão e proporção

Razão compara duas grandezas por divisão. Se há 3 agentes para 12 viaturas, a razão agentes/viaturas é 3/12=1/4. A ordem importa: viaturas/agentes seria 12/3=4.

Proporção é igualdade entre duas razões: a/b=c/d. Pela propriedade fundamental, a×d=b×c, desde que os denominadores sejam diferentes de zero. Exemplo: 2/3=4/6, pois 2×6=3×4=12.

## 2. Porcentagem

Porcentagem é uma fração com denominador 100. Para calcular 18% de 250, transforme 18% em 0,18 e multiplique: 0,18×250=45.

Para descobrir que percentual 45 representa de 250: 45÷250×100=18%. Diferencie “quanto é x% de um valor” de “x é quantos por cento do total”.

## 3. Aumentos e descontos

Aumento de p%: valor final=valor inicial×(1+p/100).
Desconto de p%: valor final=valor inicial×(1−p/100).

Exemplo: um material custa R$ 200 e aumenta 10%. Novo preço=200×1,10=R$ 220. Um desconto de 10% sobre R$ 200 resulta em R$ 180.

Aumentos ou descontos sucessivos são multiplicativos. Um aumento de 10% seguido de desconto de 10% não retorna ao valor inicial: 200×1,10×0,90=198. O resultado final é 1% menor.

## 4. Regra de três simples direta

Duas grandezas são diretamente proporcionais quando, mantendo as demais condições, multiplicar uma por determinado fator multiplica a outra pelo mesmo fator.

Exemplo: 4 caixas custam R$ 60. Quanto custam 7 caixas ao mesmo preço unitário?
4/7=60/x, então 4x=420 e x=105.

É possível também calcular o preço unitário: 60÷4=15; 7×15=105.

## 5. Regra de três simples inversa

Duas grandezas são inversamente proporcionais quando, mantendo as condições, multiplicar uma por um fator divide a outra pelo mesmo fator.

Exemplo: 4 trabalhadores concluem uma tarefa em 12 dias. Com 8 trabalhadores, mesma produtividade e tarefa, o tempo esperado é 6 dias. O produto trabalhadores×dias permanece 48.

**Cuidado:** a relação só é inversa se produtividade, jornada, tarefa e demais condições forem mantidas.

## 6. Juros simples

Juros simples incidem sempre sobre o capital inicial:
J=C×i×t.
Montante: M=C+J.

C é capital; i é taxa por período; t é quantidade de períodos. A taxa e o tempo devem usar a mesma unidade.

Exemplo: R$ 1.000 a 2% ao mês por 3 meses:
J=1.000×0,02×3=R$ 60.
M=1.060.

## 7. Juros compostos

Juros compostos incidem sobre o montante acumulado:
M=C(1+i)^t.
J=M−C.

Com R$ 1.000 a 2% ao mês por 3 meses:
M=1.000×1,02³=1.061,208.
J≈R$ 61,21.

A diferença surge porque, a cada período, os juros passam a incidir também sobre os juros anteriores.

## 8. Erros frequentes

- Inverter a ordem das grandezas em uma razão.
- Somar percentuais sucessivos sem considerar a nova base.
- Tratar toda regra de três como direta.
- Aplicar regra inversa sem conferir as condições.
- Misturar taxa mensal com tempo anual.
- Confundir juros com montante.
- Usar 2 em vez de 0,02 para representar 2%.

## 9. Treino autoral comentado

1. 18% de 250 é 45. **Certo:** 0,18×250=45.
2. 45 representa 18% de 250. **Certo:** 45/250×100=18%.
3. Aumento de 10% e desconto de 10% sobre o novo valor se anulam. **Errado:** 1,10×0,90=0,99.
4. Quatro caixas custam 60; sete custam 105. **Certo:** custo unitário 15.
5. Duplicar trabalhadores sempre reduz o prazo pela metade. **Errado:** somente sob condições de produtividade e tarefa constantes.
6. Juros simples incidem sobre o capital inicial. **Certo.**
7. Juros compostos incidem sobre o montante acumulado. **Certo.**
8. R$ 1.000 a 2% ao mês por 3 meses gera R$ 60 de juros simples. **Certo.**
9. 2% deve ser usado como 2 na fórmula decimal. **Errado:** use 0,02.
10. Montante é capital mais juros. **Certo.**

## 10. Revisão final

Razão = divisão comparativa.
Proporção = igualdade entre razões.
Porcentagem = fração de denominador 100.
Regra direta: grandezas variam no mesmo sentido.
Regra inversa: variam em sentidos opostos.
Juros simples: J=C×i×t.
Juros compostos: M=C(1+i)^t.
Confira sempre a unidade da taxa e do tempo.','[{"b":"Comparação entre grandezas por meio de uma divisão.","f":"O que é razão?"},{"b":"Igualdade entre duas razões.","f":"O que é proporção?"},{"b":"Multiplicar o valor por x/100.","f":"Como calcular x% de um valor?"},{"b":"Dividir a diferença pelo valor inicial e multiplicar por 100.","f":"Como calcular a variação percentual?"},{"b":"Multiplicar o valor inicial por 1+p/100.","f":"Como calcular aumento de p%?"},{"b":"Multiplicar o valor inicial por 1−p/100.","f":"Como calcular desconto de p%?"},{"b":"Quando uma grandeza aumenta e a outra diminui na mesma proporção, mantidas as condições.","f":"Quando usar regra de três inversa?"},{"b":"J=C×i×t.","f":"Qual a fórmula dos juros simples?"},{"b":"M=C(1+i)^t.","f":"Qual a fórmula do montante composto?"},{"b":"Capital inicial acrescido dos juros.","f":"O que é montante?"}]','[{"a":true,"q":"18% de 250 corresponde a 45.","why":"0,18×250=45."},{"a":true,"q":"45 representa 18% de 250.","why":"45÷250×100=18%."},{"a":false,"q":"Um aumento de 10% seguido de desconto de 10% retorna sempre ao valor original.","why":"200×1,10×0,90=198; o efeito líquido é redução de 1%."},{"a":true,"q":"Se quatro caixas custam R$ 60, sete caixas custam R$ 105 pelo mesmo preço unitário.","why":"Cada caixa custa R$ 15; 7×15=105."},{"a":false,"q":"Dobrar trabalhadores sempre reduz pela metade o prazo, independentemente das condições.","why":"A proporcionalidade inversa exige produtividade e tarefa constantes."},{"a":true,"q":"Nos juros simples, a taxa incide sobre o capital inicial.","why":"A base de cálculo permanece constante."},{"a":true,"q":"Nos juros compostos, os juros incidem sobre o montante acumulado.","why":"Há capitalização dos juros."},{"a":true,"q":"R$ 1.000 a 2% ao mês por três meses gera R$ 60 de juros simples.","why":"1.000×0,02×3=60."},{"a":false,"q":"A taxa de 2% deve ser inserida como 2 na fórmula decimal.","why":"2% deve ser convertido em 0,02."},{"a":true,"q":"O montante é a soma do capital com os juros.","why":"M=C+J."}]'),
('pcac-2026-raciocinio-logico-11-combinatoria-probabilidade','Aula ampliada de princípio fundamental da contagem, fatorial, permutação, arranjo, combinação, espaço amostral e probabilidade.','# Aula 11 — Análise combinatória e probabilidade

## 1. Princípio fundamental da contagem

Quando uma atividade ocorre em etapas sucessivas, multiplique o número de possibilidades de cada etapa, desde que as escolhas sejam independentes no sentido combinatório ou que as quantidades já considerem as restrições.

Exemplo: uma identificação tem 2 letras possíveis e, depois, 3 algarismos possíveis em cada uma de duas posições. Total=2×3×3=18 combinações.

Se a segunda escolha depende da primeira, atualize a quantidade. Para formar uma dupla entre 5 pessoas sem repetir a pessoa, escolha a primeira de 5 maneiras e a segunda de 4: 5×4=20 duplas ordenadas.

## 2. Fatorial

Fatorial de n, indicado por n!, é o produto dos inteiros positivos de n até 1:
5!=5×4×3×2×1=120.
Por definição, 0!=1.

O fatorial aparece nas fórmulas de permutação, arranjo e combinação. Simplifique antes de multiplicar valores grandes.

## 3. Permutação simples

Permutação ordena todos os n elementos distintos:
Pₙ=n!.

Exemplo: de quantas formas 4 pessoas podem ficar em fila?
4!=4×3×2×1=24.

A ordem importa porque trocar duas pessoas de posição cria uma fila diferente.

## 4. Arranjo simples

Arranjo seleciona p elementos dentre n e considera a ordem:
A(n,p)=n!/(n−p)!.

Exemplo: escolher presidente e vice entre 5 pessoas:
A(5,2)=5×4=20.
Ana presidente e Bruno vice é diferente de Bruno presidente e Ana vice.

## 5. Combinação simples

Combinação seleciona p elementos dentre n sem considerar a ordem:
C(n,p)=n!/[p!(n−p)!].

Exemplo: selecionar 2 representantes entre 5 pessoas:
C(5,2)=5!/(2!3!)=10.
O grupo Ana e Bruno é o mesmo que Bruno e Ana.

**Pergunta-chave:** se trocar a ordem altera o resultado? Se sim, pense em arranjo; se não, combinação.

## 6. Probabilidade

Espaço amostral é o conjunto de resultados possíveis. Evento é o conjunto de resultados desejados. Em resultados equiprováveis:
P(A)=casos favoráveis/casos possíveis.

Exemplo: dado justo, chance de número par=3/6=1/2.

A probabilidade do complemento é 1−P(A). União:
P(A∪B)=P(A)+P(B)−P(A∩B).

## 7. Independência e condicional

Eventos independentes não alteram a probabilidade um do outro:
P(A∩B)=P(A)×P(B).

Probabilidade condicional:
P(A|B)=P(A∩B)/P(B), se P(B)>0.

A expressão “sabendo que B ocorreu” limita o universo ao evento B. Eventos mutuamente exclusivos não ocorrem juntos; isso é diferente de independência.

## 8. Como escolher a fórmula

- Organizar todos os elementos: permutação.
- Escolher alguns e atribuir cargos/ordem: arranjo.
- Escolher grupo sem cargos: combinação.
- Etapas sucessivas: princípio fundamental da contagem.
- Chance de evento em resultados equiprováveis: favoráveis/possíveis.
- “A ou B”: união.
- “A e B”: interseção.
- “Sabendo que”: condicional.

## 9. Treino autoral comentado

1. Quatro pessoas em fila: 4!=24. **Certo.**
2. Escolher presidente e vice entre 5: 10 maneiras. **Errado:** ordem importa; 5×4=20.
3. Escolher dupla entre 5: 10 maneiras. **Certo:** combinação.
4. 0!=1. **Certo:** definição.
5. Em combinação, trocar a ordem cria outro grupo. **Errado:** o grupo é o mesmo.
6. A probabilidade de número par em dado justo é 1/2. **Certo.**
7. Eventos independentes satisfazem P(A∩B)=P(A)P(B). **Certo.**
8. Eventos mutuamente exclusivos podem ocorrer juntos. **Errado.**
9. “Sabendo que B ocorreu” indica probabilidade condicional. **Certo.**
10. O princípio fundamental da contagem multiplica possibilidades de etapas sucessivas. **Certo.**

## 10. Revisão final

Permutação: todos, ordem importa.
Arranjo: parte, ordem importa.
Combinação: parte, ordem não importa.
Fatorial: n!.
Contagem: multiplique etapas.
Probabilidade: favoráveis/possíveis, se equiprováveis.
União: A ou B.
Interseção: A e B.
Condicional: sabendo que.
Independência: produto das probabilidades.','[{"b":"Multiplicar as possibilidades das etapas sucessivas de uma atividade.","f":"O que é princípio fundamental da contagem?"},{"b":"120.","f":"Quanto é 5!?"},{"b":"1.","f":"Quanto vale 0!?"},{"b":"Ordenação de todos os n elementos distintos; Pₙ=n!.","f":"O que é permutação simples?"},{"b":"Seleção de parte dos elementos considerando a ordem.","f":"O que é arranjo simples?"},{"b":"Seleção de parte dos elementos sem considerar a ordem.","f":"O que é combinação simples?"},{"b":"n!/(n−p)!.","f":"Qual a fórmula de A(n,p)?"},{"b":"n!/[p!(n−p)!].","f":"Qual a fórmula de C(n,p)?"},{"b":"Quando selecionar um grupo e a ordem não alterar o resultado.","f":"Quando usar combinação?"},{"b":"P(A|B)=P(A∩B)/P(B), com P(B)>0.","f":"Qual a fórmula da probabilidade condicional?"}]','[{"a":true,"q":"Quatro pessoas distintas podem formar 24 filas.","why":"4!=24."},{"a":false,"q":"Escolher presidente e vice entre cinco pessoas gera dez resultados ordenados.","why":"A ordem dos cargos importa: 5×4=20."},{"a":true,"q":"Escolher uma dupla entre cinco pessoas gera dez combinações.","why":"C(5,2)=10."},{"a":true,"q":"Por definição, 0! é igual a 1.","why":"É a convenção matemática usada nas fórmulas."},{"a":false,"q":"Em uma combinação, trocar a ordem dos escolhidos cria outro grupo.","why":"A ordem não altera a combinação."},{"a":true,"q":"Em um dado justo, a probabilidade de sair número par é 1/2.","why":"Há três resultados favoráveis em seis equiprováveis."},{"a":true,"q":"Eventos independentes satisfazem P(A∩B)=P(A)×P(B).","why":"A ocorrência de um não altera a chance do outro."},{"a":false,"q":"Eventos mutuamente exclusivos podem ocorrer juntos.","why":"Eles não podem ocorrer simultaneamente."},{"a":true,"q":"A expressão ''sabendo que B ocorreu'' indica probabilidade condicional.","why":"O universo é restringido ao evento B."},{"a":true,"q":"O princípio fundamental da contagem multiplica possibilidades de etapas sucessivas.","why":"A contagem combina as opções de cada etapa."}]'),
('pcac-2026-raciocinio-logico-12-medias-graficos-tabelas','Aula ampliada de médias simples e ponderadas, frequências, interpretação de tabelas e gráficos, escalas, taxas e comparação de dados.','# Aula 12 — Médias aritméticas e interpretação de gráficos e tabelas

## 1. Média aritmética simples

Média simples é a soma de todos os valores dividida pela quantidade de observações:
x̄=Σx/n.

Exemplo: atendimentos de 10, 12, 14 e 16 minutos.
Soma=52; quantidade=4; média=13 minutos.

A média é um resumo, não significa que todos os atendimentos duraram 13 minutos.

## 2. Média ponderada

Quando cada valor tem um peso, use:
x̄ₚ=Σ(x×peso)/Σ(pesos).

Exemplo: nota 6 com peso 2 e nota 8 com peso 3:
(6×2+8×3)/(2+3)=36/5=7,2.

Não divida pelo número de notas, mas pela soma dos pesos. O peso indica a participação de cada valor no resultado.

## 3. Efeito de valores extremos

A média utiliza todos os valores e pode ser puxada por valores muito altos ou baixos. Exemplo: 2, 2, 2, 2 e 12. A média é 4, embora quatro dos cinco valores sejam 2.

Por isso, compare média e mediana quando houver valores discrepantes. A mediana depende da posição central e costuma ser menos sensível a extremos.

## 4. Frequência absoluta e relativa

Frequência absoluta é a contagem de observações. Frequência relativa é a divisão dessa contagem pelo total. Para percentual, multiplique por 100.

Se 15 de 60 registros são de determinada categoria, a frequência relativa é 15/60=0,25=25%.

Frequência acumulada soma as frequências até a classe atual. Em classes ordenadas, ela responde perguntas como “quantos até 20 minutos?”.

## 5. Leitura de tabelas

Antes de comparar números, leia:
- título e assunto;
- período de referência;
- unidade de medida;
- linhas, colunas e legenda;
- fonte e universo;
- denominador, quando houver taxa ou percentual.

Sem período e unidade, um número isolado pode ser interpretado incorretamente. Compare períodos equivalentes e categorias com a mesma definição.

## 6. Leitura de gráficos

Barras comparam categorias; linhas mostram evolução temporal; setores mostram partes de um total; histogramas mostram distribuição por intervalos numéricos.

Verifique os eixos e a escala. Um eixo que começa em 90 pode exagerar a diferença entre 95 e 100. Em gráficos de setores, a soma das partes deve representar o total.

## 7. Taxas e comparação justa

Totais absolutos podem ser inadequados para comparar populações de tamanhos diferentes. Uma taxa por 100 mil habitantes é:
(quantidade/população)×100.000.

Exemplo: 50 registros em 25 mil habitantes correspondem a 200 por 100 mil. A taxa padroniza a comparação pelo tamanho da população, desde que as definições e períodos sejam compatíveis.

## 8. Como resolver na prova

1. Se pedir média, some e divida pela quantidade.
2. Se houver pesos, use média ponderada.
3. Se pedir percentual, identifique o total usado como denominador.
4. Se pedir acumulado, some progressivamente.
5. Se interpretar gráfico, confira eixos, escala e unidade.
6. Se comparar grupos, veja se o total absoluto ou a taxa responde melhor à pergunta.

## 9. Treino autoral comentado

1. Média de 10, 12, 14 e 16 é 13. **Certo.**
2. Média ponderada de 6 peso 2 e 8 peso 3 é 7,2. **Certo.**
3. Média simples de 2,2,2,2,12 é 2. **Errado:** soma 20 dividida por 5=4.
4. 15 de 60 equivalem a 25%. **Certo.**
5. Frequência acumulada é soma progressiva. **Certo.**
6. Gráfico de linhas é útil para evolução temporal. **Certo.**
7. Histograma é usado para categorias nominais sem ordem. **Errado:** distribuições quantitativas por intervalos.
8. Eixo truncado pode exagerar diferenças. **Certo.**
9. Totais absolutos sempre permitem comparar municípios. **Errado:** considere denominadores e taxas.
10. Percentual sem denominador pode ser enganoso. **Certo.**

## 10. Revisão final

Média simples = soma/quantidade.
Média ponderada = soma dos produtos/soma dos pesos.
Frequência absoluta = contagem.
Frequência relativa = contagem/total.
Barras = categorias; linhas = tempo; setores = composição; histograma = intervalos.
Taxa exige denominador claro.
Leia título, unidade, período, fonte e escala.','[{"b":"Somar os valores e dividir pela quantidade.","f":"Como calcular média simples?"},{"b":"Σ(valor×peso)/Σ(pesos).","f":"Qual a fórmula da média ponderada?"},{"b":"Porque utiliza todos os valores e os extremos podem puxar o resultado.","f":"Por que a média pode ser afetada por outliers?"},{"b":"Quantidade de observações em uma categoria ou classe.","f":"O que é frequência absoluta?"},{"b":"Frequência absoluta dividida pelo total.","f":"O que é frequência relativa?"},{"b":"Frequência relativa multiplicada por 100.","f":"Como calcular percentual?"},{"b":"Soma progressiva das frequências absolutas.","f":"O que é frequência acumulada?"},{"b":"Para acompanhar evolução ao longo do tempo.","f":"Quando usar gráfico de linhas?"},{"b":"Para representar distribuição quantitativa agrupada em intervalos.","f":"Quando usar histograma?"},{"b":"(Quantidade/população de referência)×100.000.","f":"Como calcular taxa por 100 mil habitantes?"}]','[{"a":true,"q":"A média simples de 10, 12, 14 e 16 é 13.","why":"A soma é 52 e há quatro observações."},{"a":true,"q":"A média ponderada de 6 com peso 2 e 8 com peso 3 é 7,2.","why":"(12+24)/(2+3)=7,2."},{"a":false,"q":"A média de 2, 2, 2, 2 e 12 é 2.","why":"A soma é 20; dividida por 5, resulta em 4."},{"a":true,"q":"Quinze registros em um total de 60 representam 25%.","why":"15/60×100=25%."},{"a":true,"q":"Frequência acumulada é a soma progressiva das frequências.","why":"Ela reúne as frequências até a classe atual."},{"a":true,"q":"Gráfico de linhas é apropriado para observar evolução temporal.","why":"A sequência de períodos permite visualizar tendências."},{"a":false,"q":"Histograma é usado principalmente para categorias nominais sem ordem.","why":"Histograma representa dados quantitativos agrupados em intervalos."},{"a":true,"q":"Um eixo truncado pode exagerar diferenças visuais.","why":"A escala pode distorcer a percepção."},{"a":false,"q":"Totais absolutos sempre são suficientes para comparar populações de tamanhos diferentes.","why":"Taxas e denominadores podem ser necessários para comparação justa."},{"a":true,"q":"Um percentual precisa de denominador e período claros para ser interpretado corretamente.","why":"A base de cálculo determina o significado do percentual."}]'),
('pcac-2026-rlm-medias-graficos-tabelas-interpretacao','Aula ampliada de médias simples e ponderadas, frequência, interpretação de tabelas, gráficos, escalas, taxas e comparação crítica.','# Aula complementar — Médias, gráficos e tabelas: interpretação

## 1. Média simples

Média aritmética simples é a soma dos valores dividida pela quantidade:
x̄=Σx/n.

Exemplo: 10, 12, 14 e 16 minutos. Soma=52; n=4; média=13 minutos.

A média resume o conjunto, mas não significa que cada observação tenha sido igual a 13. Valores extremos podem puxar o resultado.

## 2. Média ponderada

Quando os valores têm pesos diferentes:
x̄ₚ=Σ(x×peso)/Σ(pesos).

Exemplo: nota 6 com peso 2 e nota 8 com peso 3:
(6×2+8×3)/(2+3)=36/5=7,2.

O denominador é a soma dos pesos, não a quantidade de notas. Se os pesos forem frequências, a média ponderada equivale a considerar quantas vezes cada valor aparece.

## 3. Frequência e percentual

Frequência absoluta é contagem. Frequência relativa é frequência absoluta dividida pelo total. Percentual é a frequência relativa multiplicada por 100.

Exemplo: 18 de 60 atendimentos são noturnos:
18/60=0,30=30%.

Se o total mudar, o percentual também pode mudar, mesmo que a contagem permaneça igual. Por isso, sempre identifique o denominador.

## 4. Frequência acumulada

A frequência acumulada soma as frequências das classes até a classe atual. Se as frequências forem 4, 6 e 10, as acumuladas serão 4, 10 e 20.

Ela responde a perguntas como “quantos atendimentos duraram até 20 minutos?”. A frequência relativa acumulada final deve chegar a 100%, salvo arredondamento.

## 5. Como ler uma tabela

Confira título, fonte, período, unidade, linhas, colunas, legenda e universo. Um valor de 200 pode representar 200 pessoas, 200 mil reais ou 200 ocorrências; sem unidade, não é possível interpretar corretamente.

Verifique se a tabela apresenta totais absolutos, percentuais ou taxas. Percentuais precisam de base de comparação. Taxas precisam de denominador e fator de padronização.

## 6. Como interpretar gráficos

- Barras: comparação entre categorias.
- Linhas: evolução temporal.
- Setores: composição de um total.
- Histograma: distribuição de variável quantitativa por intervalos.

No histograma, barras encostadas representam intervalos contíguos. No gráfico de barras, categorias são normalmente separadas.

## 7. Escala e comparação

Eixo vertical truncado pode exagerar diferenças. Intervalos desiguais podem distorcer a leitura. Compare gráficos com a mesma unidade e período.

Exemplo: Município A tem 300 registros e 300 mil habitantes: 100 por 100 mil. Município B tem 120 registros e 60 mil habitantes: 200 por 100 mil. O total de A é maior, mas a taxa de B é maior.

## 8. Média não é mediana

Média soma e divide. Mediana ordena os dados e localiza o centro. Moda identifica o valor mais frequente. Se uma tabela apresenta salários muito assimétricos, a média pode ser elevada por poucos salários extremos; a mediana pode descrever melhor o valor central.

## 9. Treino autoral comentado

1. Média de 10,12,14,16 é 13. **Certo.**
2. Média ponderada de 6 peso 2 e 8 peso 3 é 7,2. **Certo.**
3. 18 de 60 representam 30%. **Certo.**
4. Frequências 4,6,10 geram acumuladas 4,10,20. **Certo.**
5. Gráfico de linhas é útil para acompanhar meses. **Certo.**
6. Histograma representa categorias nominais separadas. **Errado:** intervalos quantitativos.
7. Eixo truncado pode exagerar diferenças. **Certo.**
8. Total absoluto sempre é a melhor comparação entre cidades. **Errado:** taxas podem considerar a população.
9. Média é sempre igual à mediana. **Errado:** são medidas distintas.
10. Percentual sem denominador pode ser mal interpretado. **Certo.**

## 10. Revisão final

Média simples=soma/quantidade.
Média ponderada=soma dos produtos/soma dos pesos.
Frequência relativa=contagem/total.
Acumulada=soma progressiva.
Barras=comparar categorias; linhas=tempo; setores=composição; histograma=intervalos.
Sempre leia título, unidade, período, fonte, escala e denominador.','[{"b":"Soma dos valores dividida pela quantidade.","f":"Qual a fórmula da média simples?"},{"b":"Σ(valor×peso)/Σ(pesos).","f":"Qual a fórmula da média ponderada?"},{"b":"Quantidade de observações em uma categoria ou classe.","f":"O que é frequência absoluta?"},{"b":"Frequência absoluta dividida pelo total.","f":"Como calcular frequência relativa?"},{"b":"Soma progressiva das frequências absolutas.","f":"O que é frequência acumulada?"},{"b":"Gráfico de linhas.","f":"Qual gráfico acompanha evolução temporal?"},{"b":"Gráfico de barras.","f":"Qual gráfico compara categorias?"},{"b":"Histograma.","f":"Qual gráfico representa distribuição por intervalos quantitativos?"},{"b":"Eixo que não começa no zero ou omite parte da escala, podendo exagerar diferenças visuais.","f":"O que é eixo truncado?"},{"b":"Para considerar o tamanho diferente das populações ou grupos.","f":"Por que usar taxas em vez de totais absolutos?"}]','[{"a":true,"q":"A média simples de 10, 12, 14 e 16 é 13.","why":"A soma é 52 e a quantidade é 4."},{"a":true,"q":"A média ponderada de 6 com peso 2 e 8 com peso 3 é 7,2.","why":"(12+24)/(2+3)=7,2."},{"a":true,"q":"Dezoito atendimentos em um total de 60 representam 30%.","why":"18/60×100=30%."},{"a":true,"q":"Frequências 4, 6 e 10 produzem acumuladas 4, 10 e 20.","why":"A soma é progressiva."},{"a":true,"q":"Gráfico de linhas é adequado para acompanhar valores ao longo dos meses.","why":"A sequência temporal permite visualizar mudanças."},{"a":false,"q":"Histograma é usado principalmente para comparar categorias nominais separadas.","why":"Histograma representa distribuição quantitativa agrupada em intervalos."},{"a":true,"q":"Um eixo truncado pode exagerar visualmente diferenças.","why":"A escala altera a percepção do tamanho da diferença."},{"a":false,"q":"Totais absolutos são sempre suficientes para comparar municípios de populações diferentes.","why":"Taxas e denominadores podem ser necessários para uma comparação justa."},{"a":false,"q":"Média e mediana são sempre iguais.","why":"São medidas distintas e podem divergir, especialmente com assimetria e extremos."},{"a":true,"q":"Um percentual precisa de denominador claro para ser interpretado.","why":"A base de cálculo determina o significado do percentual."}]'),
('pcac-2026-rlm-probabilidade-uniao-condicional-independencia','Aula ampliada de probabilidade: espaço amostral, eventos, complemento, união, interseção, condicional, independência e eventos exclusivos.','# Aula complementar — Probabilidade: união, condição e independência

## 1. Espaço amostral e evento

Espaço amostral (Ω) é o conjunto de todos os resultados possíveis de um experimento. Evento é o resultado ou conjunto de resultados de interesse.

Exemplo: ao lançar um dado comum, Ω={1,2,3,4,5,6}. Evento A=sair número par={2,4,6}.

A probabilidade está entre 0 e 1. Zero representa evento impossível e 1 representa evento certo.

## 2. Probabilidade de resultados equiprováveis

Quando todos os resultados elementares têm a mesma chance:
P(A)=número de casos favoráveis/número de casos possíveis.

No dado justo, P(par)=3/6=1/2=50%.

Não use a contagem simples sem verificar equiprobabilidade. Se um resultado tiver mais chance que outro, a razão de quantidades não representa necessariamente a probabilidade.

## 3. Evento complementar

O complemento de A é “A não ocorre”:
P(Aᶜ)=1−P(A).

Se a chance de um atendimento atrasar é 15%, a chance de não atrasar é 85%, no mesmo universo e modelo.

O evento A e seu complemento são mutuamente exclusivos e cobrem todas as possibilidades.

## 4. União e interseção

União A∪B: ocorre A ou B, inclusive ambos.
Interseção A∩B: A e B ocorrem simultaneamente.

Regra geral:
P(A∪B)=P(A)+P(B)−P(A∩B).

A interseção é subtraída porque foi contada duas vezes na soma inicial.

Se A e B forem mutuamente exclusivos, P(A∩B)=0, então P(A∪B)=P(A)+P(B).

## 5. Probabilidade condicional

P(A|B)=P(A∩B)/P(B), desde que P(B)>0.

A leitura é “probabilidade de A sabendo que B ocorreu”. A condição B reduz o universo considerado.

Exemplo: em 100 registros, 40 são do turno noturno e 10 desses 40 apresentam determinada característica. Sabendo que o registro é noturno, a proporção é 10/40=25%, e não 10/100.

## 6. Independência

A e B são independentes quando saber que um ocorreu não altera a probabilidade do outro. Uma condição matemática é:
P(A∩B)=P(A)×P(B).

Exemplo: lançar uma moeda e um dado equilibrados. A chance de sair cara e seis é 1/2×1/6=1/12.

Independência não significa que os eventos não possam ocorrer juntos; significa que a ocorrência de um não altera a chance do outro.

## 7. Exclusividade não é independência

Eventos mutuamente exclusivos não podem ocorrer simultaneamente. Exemplo: em um único lançamento de dado, sair 2 e sair 5.

Se dois eventos exclusivos têm probabilidades positivas, eles não são independentes: saber que um ocorreu torna o outro impossível.

## 8. Como resolver questões

- “Não ocorrer” → complemento.
- “A ou B” → união.
- “A e B” → interseção.
- “Sabendo que” → condicional.
- “Não altera a chance” → independência.
- “Não podem ocorrer juntos” → exclusividade.

Desenhe um diagrama de Venn quando houver grupos sobrepostos e confira se a interseção está sendo contada uma ou duas vezes.

## 9. Treino autoral comentado

1. P(par em dado justo)=1/2. **Certo:** 3 favoráveis em 6.
2. Se P(A)=0,15, o complemento é 0,85. **Certo.**
3. União significa que A e B ocorrem simultaneamente. **Errado:** isso é interseção.
4. Interseção representa ocorrência conjunta. **Certo.**
5. A fórmula da união subtrai a interseção. **Certo:** evita dupla contagem.
6. Eventos mutuamente exclusivos podem ocorrer juntos. **Errado.**
7. “Sabendo que B ocorreu” indica condicional. **Certo.**
8. Eventos independentes satisfazem a regra do produto. **Certo.**
9. Independência significa que eventos não podem ocorrer juntos. **Errado:** podem ocorrer juntos.
10. A probabilidade condicional usa P(B) no denominador. **Certo**, quando P(B)>0.

## 10. Revisão final

Complemento: 1−P(A).
União: P(A)+P(B)−P(A∩B).
Interseção: ocorrência conjunta.
Condicional: P(A∩B)/P(B).
Independência: P(A∩B)=P(A)P(B).
Exclusividade: interseção vazia.','[{"b":"Conjunto de todos os resultados possíveis do experimento.","f":"O que é espaço amostral?"},{"b":"Conjunto de resultados de interesse dentro do espaço amostral.","f":"O que é evento?"},{"b":"P(Aᶜ)=1−P(A).","f":"Qual a fórmula do complemento?"},{"b":"P(A∪B)=P(A)+P(B)−P(A∩B).","f":"Qual a fórmula da união de dois eventos?"},{"b":"Ocorrência simultânea de A e B.","f":"O que representa interseção?"},{"b":"P(A|B)=P(A∩B)/P(B), com P(B)>0.","f":"Qual a fórmula da probabilidade condicional?"},{"b":"Quando a ocorrência de um não altera a probabilidade do outro.","f":"Quando dois eventos são independentes?"},{"b":"P(A∩B)=P(A)×P(B).","f":"Qual a condição matemática de independência?"},{"b":"Eventos que não podem ocorrer simultaneamente.","f":"O que são eventos mutuamente exclusivos?"},{"b":"Não. Exclusividade impede ocorrência conjunta; independência trata de influência probabilística.","f":"Exclusividade é sinônimo de independência?"}]','[{"a":true,"q":"Em um dado justo, a probabilidade de sair número par é 1/2.","why":"Há três resultados pares entre seis resultados equiprováveis."},{"a":true,"q":"Se P(A)=0,15, o complemento tem probabilidade 0,85.","why":"1−0,15=0,85."},{"a":false,"q":"A união A∪B representa somente a ocorrência simultânea de A e B.","why":"A união inclui A, B ou ambos; a simultaneidade é interseção."},{"a":true,"q":"A interseção representa ocorrência conjunta de dois eventos.","why":"É o significado de A∩B."},{"a":true,"q":"A fórmula da união subtrai a interseção para evitar dupla contagem.","why":"Os resultados comuns foram somados duas vezes."},{"a":false,"q":"Eventos mutuamente exclusivos podem ocorrer juntos.","why":"Eles não podem ocorrer simultaneamente."},{"a":true,"q":"A expressão ''sabendo que B ocorreu'' indica probabilidade condicional.","why":"O universo fica restrito aos casos em que B ocorreu."},{"a":true,"q":"Eventos independentes satisfazem P(A∩B)=P(A)×P(B).","why":"Essa é a condição matemática de independência."},{"a":false,"q":"Eventos independentes nunca podem ocorrer juntos.","why":"Eles podem ocorrer simultaneamente; a ocorrência de um não altera a chance do outro."},{"a":true,"q":"A probabilidade condicional P(A|B) utiliza P(B) no denominador.","why":"A condição exige P(B)>0."}]'),
('pcac-2026-rlm-progressao-aritmetica-geometrica','Aula ampliada de PA e PG: razão, classificação, termo geral, soma finita, crescimento, problemas e interpretação de sequências.','# Aula complementar — Progressões aritméticas e geométricas

## 1. Como reconhecer uma progressão?

Uma progressão é uma sequência numérica com uma regra constante entre termos. Antes de escolher uma fórmula, compare termos consecutivos. Se a diferença for constante, pode ser PA. Se o quociente for constante, pode ser PG.

Exemplo: 4, 7, 10, 13... Diferenças: +3, +3, +3. É PA de razão 3.
Exemplo: 2, 6, 18, 54... Quocientes: ×3, ×3, ×3. É PG de razão 3.

Não confunda diferença com razão geométrica: PA soma ou subtrai o mesmo valor; PG multiplica ou divide pelo mesmo fator.

## 2. Progressão aritmética

Na PA, a diferença entre um termo e o anterior é constante:
r=aₙ−aₙ₋₁.

- r>0: sequência crescente;
- r<0: sequência decrescente;
- r=0: sequência constante.

Termo geral:
aₙ=a₁+(n−1)r.

Exemplo: 7, 11, 15... a₁=7 e r=4. O 8º termo é 7+(8−1)×4=35.

## 3. Soma dos termos da PA

Sₙ=n(a₁+aₙ)/2.

A fórmula equivale a multiplicar a quantidade de termos pela média do primeiro e do último.

Exemplo: 2, 5, 8, 11, 14. São 5 termos:
S₅=5×(2+14)/2=40.

Se o último termo não estiver dado, calcule-o pelo termo geral antes de aplicar a soma.

## 4. Progressão geométrica

Na PG, o quociente entre termos consecutivos é constante:
q=aₙ/aₙ₋₁, quando o denominador não é zero.

Termo geral:
aₙ=a₁×q^(n−1).

Exemplo: 5, 10, 20, 40... a₁=5 e q=2. O 6º termo é 5×2⁵=160.

A razão pode ser fracionária ou negativa. Se q for negativo, os sinais alternam; observe a sequência antes de classificá-la como crescente ou decrescente.

## 5. Soma finita da PG

Para q≠1:
Sₙ=a₁(qⁿ−1)/(q−1).

Se q=1, todos os termos são iguais e Sₙ=n×a₁.

Exemplo: 3, 6, 12, 24. São 4 termos, a₁=3 e q=2:
S₄=3(2⁴−1)/(2−1)=3×15=45.

## 6. Aplicações práticas

PA aparece em acréscimos fixos: uma equipe registra 10, 13, 16, 19 tarefas por dia, aumentando 3 a cada dia.
PG aparece em crescimento multiplicativo: uma quantidade dobra a cada etapa, como 2, 4, 8, 16.

Uma sequência com aumento de 3 unidades por etapa não é o mesmo que aumento de 3%. A primeira é aditiva; a segunda é multiplicativa.

## 7. Como resolver questões

1. Calcule diferenças consecutivas.
2. Se forem iguais, teste PA.
3. Se não, calcule quocientes.
4. Se forem iguais, teste PG.
5. Identifique a₁, r ou q e n.
6. Escolha termo geral ou soma conforme a pergunta.
7. Confira se a resposta corresponde ao termo ou à soma solicitada.

## 8. Pegadinhas

- PA: diferença constante.
- PG: quociente constante.
- Termo geral usa n−1.
- Soma da PA usa primeiro e último termos.
- Soma da PG exige q≠1; se q=1, use n×a₁.
- Aumentar uma quantidade fixa não é igual a aumentar um percentual fixo.
- Razão negativa pode alternar sinais.

## 9. Treino autoral comentado

1. 4, 7, 10, 13 é PA de razão 3. **Certo.**
2. 2, 6, 18, 54 é PG de razão 3. **Certo.**
3. Na PA 7,11,15..., o 8º termo é 39. **Errado:** 7+7×4=35.
4. A soma de 2,5,8,11,14 é 40. **Certo.**
5. Na PG 5,10,20..., o sexto termo é 160. **Certo.**
6. PA é identificada pelo quociente constante. **Errado:** é pela diferença.
7. PG é identificada pelo quociente constante. **Certo.**
8. Se q=1, a soma de n termos é n×a₁. **Certo.**
9. Um aumento fixo de 3 unidades é equivalente a aumento de 3%. **Errado:** um é aditivo e o outro depende da base.
10. Com razão negativa, os sinais dos termos de uma PG podem alternar. **Certo.**

## 10. Revisão final

PA: diferença constante; aₙ=a₁+(n−1)r; Sₙ=n(a₁+aₙ)/2.
PG: quociente constante; aₙ=a₁q^(n−1); Sₙ=a₁(qⁿ−1)/(q−1), q≠1.
Descubra primeiro o padrão; depois escolha a fórmula.','[{"b":"As diferenças entre termos consecutivos são constantes.","f":"Como reconhecer uma PA?"},{"b":"Os quocientes entre termos consecutivos são constantes.","f":"Como reconhecer uma PG?"},{"b":"aₙ=a₁+(n−1)r.","f":"Qual a fórmula do termo geral da PA?"},{"b":"Sₙ=n(a₁+aₙ)/2.","f":"Qual a fórmula da soma da PA?"},{"b":"aₙ=a₁×q^(n−1).","f":"Qual a fórmula do termo geral da PG?"},{"b":"Sₙ=a₁(qⁿ−1)/(q−1).","f":"Qual a fórmula da soma finita da PG para q≠1?"},{"b":"Sₙ=n×a₁.","f":"Como calcular a soma de uma PG com q=1?"},{"b":"Os sinais dos termos podem alternar.","f":"O que significa razão negativa em PG?"},{"b":"Aumento fixo soma uma quantidade; percentual multiplica pela taxa sobre a base atual.","f":"Qual a diferença entre aumento fixo e aumento percentual?"},{"b":"Usar n em vez de n−1 no número de intervalos.","f":"Qual o erro comum no termo geral?"}]','[{"a":true,"q":"A sequência 4, 7, 10, 13 é uma PA de razão 3.","why":"As diferenças consecutivas são 3."},{"a":true,"q":"A sequência 2, 6, 18, 54 é uma PG de razão 3.","why":"Os quocientes consecutivos são 3."},{"a":false,"q":"Na PA 7, 11, 15..., o oitavo termo é 39.","why":"a₈=7+(8−1)×4=35."},{"a":true,"q":"A soma de 2, 5, 8, 11 e 14 é 40.","why":"A soma dos cinco termos é 40."},{"a":true,"q":"Na PG 5, 10, 20..., o sexto termo é 160.","why":"a₆=5×2⁵=160."},{"a":false,"q":"A PA é identificada pelo quociente constante entre termos.","why":"A PA é identificada pela diferença constante."},{"a":true,"q":"A PG é identificada pelo quociente constante entre termos.","why":"Essa é a característica da PG."},{"a":true,"q":"Se q=1, a soma de n termos da PG é n vezes o primeiro termo.","why":"Todos os termos são iguais a a₁."},{"a":false,"q":"Um aumento fixo de três unidades equivale sempre a um aumento de 3%.","why":"O percentual depende do valor-base."},{"a":true,"q":"Uma razão negativa em uma PG pode produzir alternância de sinais.","why":"Cada multiplicação por número negativo troca o sinal."}]')
  ) AS v(slug, summary, body_md, flashcards, quiz)
  WHERE m.slug = v.slug
    AND m.discipline = 'Raciocínio Lógico'
    AND m.content_status = 'active';

  GET DIAGNOSTICS changed_count = ROW_COUNT;
  IF changed_count <> 15 THEN
    RAISE EXCEPTION 'Esperados 15 materiais ativos de Raciocínio Lógico; atualizados: %', changed_count;
  END IF;
END
$pcac_raciocinio_logico$;
