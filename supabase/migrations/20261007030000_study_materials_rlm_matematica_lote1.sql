-- Reforço de RLM/Matemática na Biblioteca: a disciplina "Raciocínio Lógico"
-- tinha só 3 materiais (proposições, conjuntos, contagem/probabilidade) contra
-- 41+ de Direito/Contabilidade. Cobre os tópicos do Bloco I do edital ainda
-- sem material: equivalências/Leis de Morgan, validade de argumentos,
-- porcentagem/razão/proporção, sequências e estatística básica.
-- Entra como `under_review`: só fica visível ao aluno depois que um admin
-- conferir e ativar (revisor + data de conferência), igual aos demais lotes.
begin;

insert into public.study_materials
  (slug, discipline, topic_label, sort_order, title, summary, body_md,
   contest_name, syllabus_topic_order, source_note, legal_basis)
values
('rlm-equivalencias-leis-morgan', 'Raciocínio Lógico', 'Lógica proposicional', 122,
 'Equivalências lógicas e Leis de Morgan',
 'Como trocar uma proposição por outra "disfarçada" sem mudar seu valor lógico — a base de boa parte das pegadinhas de prova.',
$md$## Por que equivalência importa

Duas proposições são **logicamente equivalentes** quando têm a mesma tabela-verdade: em todas as combinações de V/F, o resultado é idêntico. A banca adora reescrever uma afirmação de um jeito estranho só para testar se você reconhece que ela "é a mesma coisa".

## As equivalências mais cobradas

| Proposição original | Equivalente |
|---|---|
| p → q (se p, então q) | ¬p ∨ q |
| p → q | ¬q → ¬p (contrapositiva) |
| ¬(p → q) | p ∧ ¬q |
| p ↔ q | (p → q) ∧ (q → p) |

> **Cuidado:** a **recíproca** (q → p) e a **inversa** (¬p → ¬q) **não** são equivalentes a p → q. Só a contrapositiva (¬q → ¬p) é.

## Leis de De Morgan

Servem para negar "e" e "ou":

- **¬(p ∧ q) = ¬p ∨ ¬q** — negar "e" vira "ou" com os dois negados.
- **¬(p ∨ q) = ¬p ∧ ¬q** — negar "ou" vira "e" com os dois negados.

### Exemplo do dia a dia

Afirmação: "Hoje estudei Direito e fiz questões de RLM."

Negar essa afirmação **não** é "hoje não estudei Direito e não fiz questões de RLM" (erro clássico). Pela Lei de De Morgan, a negação correta é: **"hoje não estudei Direito OU não fiz questões de RLM"** — basta uma das duas partes falhar para a frase original ser falsa.

## Negando quantificadores

| Afirmação | Negação |
|---|---|
| Todo X é Y | Existe X que não é Y |
| Algum X é Y | Nenhum X é Y |
| Nenhum X é Y | Algum X é Y |

> **Cai em prova:** a negação de "todos" nunca é "nenhum" — é "existe pelo menos um que não". Esse é o erro mais cobrado em questões de equivalência com quantificadores.$md$,
 'Polícia Federal — Agente — Edital 1/2025 atualizado', 1,
 'Material original elaborado para o Bloco I do conteúdo programático vigente (equivalências, Leis de Morgan e diagramas), com exemplos e destaques de prova próprios. Aguardando conferência final de revisor.', '[]'::jsonb),

('rlm-argumentos-validade', 'Raciocínio Lógico', 'Lógica proposicional', 123,
 'Estruturas lógicas e validade de argumentos',
 'Como saber se uma conclusão realmente decorre das premissas — sem cair na pegadinha de confundir "verdadeiro" com "válido".',
$md$## Validade não é verdade

Um argumento tem **premissas** (afirmações dadas como ponto de partida) e uma **conclusão**. Ele é **válido** quando, SE todas as premissas forem verdadeiras, a conclusão é obrigatoriamente verdadeira — independente de as premissas serem verdadeiras na vida real ou não.

| Pergunta | O que avalia |
|---|---|
| "As premissas são verdadeiras?" | Fato, não lógica |
| "A conclusão decorre das premissas?" | **Validade** — é o que a prova cobra |

### Exemplo do dia a dia

- Premissa 1: Todo policial federal faz prova de RLM.
- Premissa 2: Carlos é policial federal.
- Conclusão: Carlos fez prova de RLM.

Esse argumento é **válido** (a conclusão decorre logicamente), mesmo que na vida real alguma premissa estivesse errada — a validade olha só para a estrutura.

## O silogismo clássico

A forma mais cobrada segue o padrão:

1. Todo A é B.
2. X é A.
3. Logo, X é B.

Troque as letras por qualquer conteúdo e a validade continua, porque ela depende da **forma**, não do assunto.

## O erro mais comum: inverter a implicação

- Premissa: "Se chove, a rua fica molhada."
- Observação: "A rua está molhada."
- Conclusão inválida: "Logo, choveu."

Isso é uma **falácia de afirmação do consequente** — a rua pode estar molhada por outro motivo (um carro lavando a calçada, por exemplo). Só é válido concluir "choveu" a partir de "a rua está molhada" se a implicação for de via dupla (↔).

> **Cai em prova:** reconhecer um argumento inválido escrito "ao contrário" (afirmando o consequente ou negando o antecedente) é um dos tipos de questão mais recorrentes de RLM em provas de nível médio e superior.$md$,
 'Polícia Federal — Agente — Edital 1/2025 atualizado', 1,
 'Material original elaborado para o Bloco I do conteúdo programático vigente (estruturas lógicas e argumentação), com exemplos e destaques de prova próprios. Aguardando conferência final de revisor.', '[]'::jsonb),

('rlm-porcentagem-razao-proporcao', 'Raciocínio Lógico', 'Matemática básica', 124,
 'Porcentagem, razão e proporção',
 'As três ferramentas que resolvem a maioria dos problemas aritméticos de concurso — com o truque de calcular porcentagem de cabeça.',
$md$## Razão e proporção

**Razão** é a comparação entre duas grandezas, escrita como fração: a razão entre 20 e 5 é 20/5 = 4. **Proporção** é a igualdade entre duas razões: a/b = c/d.

### Regra de três simples

Quando duas grandezas são diretamente ou inversamente proporcionais, monte a proporção e resolva por multiplicação cruzada.

**Exemplo do dia a dia (direta):** 3 funcionários produzem 60 relatórios em um dia. Quantos relatórios 5 funcionários produzem no mesmo dia, no mesmo ritmo?

| Funcionários | Relatórios |
|---|---|
| 3 | 60 |
| 5 | x |

3/5 = 60/x → 3x = 300 → x = **100 relatórios**.

**Exemplo do dia a dia (inversa):** 4 pedreiros terminam um muro em 12 dias. Em quantos dias 6 pedreiros terminam o mesmo muro (mesmo ritmo)?

Mais pedreiros, menos dias — grandezas inversamente proporcionais, então a proporção se monta invertendo uma das colunas:

4 × 12 = 6 × x → 48 = 6x → x = **8 dias**.

## Porcentagem

Porcentagem é só uma razão com denominador 100. "30% de 200" é 30/100 × 200 = **60**.

### O truque de calcular de cabeça

Para achar X% de um valor, pense em "pedaços de 10% e 1%":

- 10% de 200 = 20 (só anda a vírgula)
- 1% de 200 = 2
- Logo, 23% de 200 = 10% + 10% + 1% + 1% + 1% = 20+20+2+2+2 = **46**

### Aumento e desconto sucessivos

> **Cuidado, pegadinha clássica:** um aumento de 10% seguido de um desconto de 10% **não** volta ao valor original.

Exemplo: R$ 100 com aumento de 10% → R$ 110. Agora desconto de 10% sobre R$ 110 (não sobre os R$ 100 originais!) → R$ 110 − R$ 11 = **R$ 99**. O valor final é menor que o inicial, porque o desconto incidiu sobre uma base maior.

> **Cai em prova:** questões que combinam dois percentuais sucessivos quase sempre testam se você vai (erradamente) somar os percentuais direto (10% − 10% = 0%) em vez de aplicar cada um sobre a base correta.$md$,
 'Polícia Federal — Agente — Edital 1/2025 atualizado', 2,
 'Material original elaborado para o Bloco I do conteúdo programático vigente (problemas aritméticos), com exemplos e destaques de prova próprios. Aguardando conferência final de revisor.', '[]'::jsonb),

('rlm-sequencias-padroes', 'Raciocínio Lógico', 'Matemática básica', 125,
 'Sequências numéricas e padrões',
 'Como identificar a regra escondida numa sequência de números ou figuras — progressão aritmética, geométrica e padrões visuais.',
$md$## O primeiro passo: ache a regra

Toda questão de sequência pede para você descobrir **o que liga um termo ao próximo**. Comece comparando os termos vizinhos: a diferença é sempre a mesma? A razão (divisão) é sempre a mesma? Ou o padrão é outra coisa (quadrados, alternância, posição)?

## Progressão aritmética (PA)

Cada termo é o anterior **somado** a um valor fixo (a razão, r).

**Exemplo do dia a dia:** 2, 5, 8, 11, 14... → razão r = 3 (soma 3 a cada passo). O próximo termo é 14 + 3 = **17**.

Fórmula do termo geral: **aₙ = a₁ + (n−1) × r**

## Progressão geométrica (PG)

Cada termo é o anterior **multiplicado** por um valor fixo (a razão, q).

**Exemplo do dia a dia:** 3, 6, 12, 24, 48... → razão q = 2 (multiplica por 2 a cada passo). O próximo termo é 48 × 2 = **96**.

Fórmula do termo geral: **aₙ = a₁ × qⁿ⁻¹**

## Padrões que não são PA nem PG

Algumas sequências de prova misturam regras ou usam figuras:

| Sequência | Regra |
|---|---|
| 1, 4, 9, 16, 25... | Quadrados perfeitos (1², 2², 3²...) |
| 1, 1, 2, 3, 5, 8... | Cada termo é a soma dos dois anteriores (Fibonacci) |
| 2, 6, 12, 20, 30... | Diferença entre termos aumenta: +4, +6, +8, +10 (PA de 2ª ordem) |

> **Cuidado, pegadinha clássica:** quando a diferença entre os termos não é constante, calcule a diferença **das diferenças** antes de desistir — muitas sequências "difíceis" são PA de segunda ordem disfarçada.

> **Cai em prova:** sequências com figuras geométricas (triângulos de pontos, quadrados crescentes) geralmente escondem uma PA ou PG nos números de elementos — conte os elementos de cada figura antes de procurar o padrão visual.$md$,
 'Polícia Federal — Agente — Edital 1/2025 atualizado', 2,
 'Material original elaborado para o Bloco I do conteúdo programático vigente (problemas geométricos e matriciais), com exemplos e destaques de prova próprios. Aguardando conferência final de revisor.', '[]'::jsonb),

('rlm-estatistica-basica-medidas', 'Raciocínio Lógico', 'Estatística', 126,
 'Estatística básica: média, moda e mediana',
 'As três medidas que resumem um conjunto de dados em um único número — e por que cada uma conta uma história diferente.',
$md$## As três medidas de tendência central

| Medida | O que é | Quando usar |
|---|---|---|
| **Média** | Soma de todos os valores ÷ quantidade de valores | Dados sem valores muito fora da curva |
| **Moda** | O valor que mais se repete | Dados categóricos ou quando interessa "o mais comum" |
| **Mediana** | O valor do meio, com os dados ordenados | Dados com valores extremos (outliers) |

### Exemplo do dia a dia

Um grupo de 7 candidatos tirou estas notas em um simulado: 4, 5, 5, 6, 7, 8, 40 (o último, um erro de digitação que ninguém corrigiu).

- **Média:** (4+5+5+6+7+8+40) / 7 = 75/7 ≈ **10,7** — distorcida pelo valor fora da curva.
- **Moda:** **5** (é o valor que mais se repete).
- **Mediana:** ordenando os 7 valores (4, 5, 5, 6, 7, 8, 40), o do meio (4º valor) é **6**.

Repare: a média (10,7) não representa bem o grupo — está puxada pelo 40. A mediana (6) reflete melhor o desempenho típico.

## Como achar a mediana

1. **Ordene** os valores.
2. Se a quantidade for **ímpar**, a mediana é o valor central.
3. Se for **par**, a mediana é a **média dos dois valores centrais**.

**Exemplo (quantidade par):** 2, 4, 6, 8 → os dois centrais são 4 e 6 → mediana = (4+6)/2 = **5**.

> **Cuidado, pegadinha clássica:** a mediana exige que os dados estejam **ordenados** antes de contar a posição central — usar a ordem em que os dados foram coletados (não ordenados) é o erro mais comum.

> **Cai em prova:** "pode haver mais de uma moda" (dados bimodais) e "pode não haver moda nenhuma" (quando nenhum valor se repete) são duas pegadinhas clássicas sobre a moda.$md$,
 'Polícia Federal — Agente — Edital 1/2025 atualizado', 2,
 'Material original elaborado para o Bloco I do conteúdo programático vigente (estatística básica), com exemplos e destaques de prova próprios. Aguardando conferência final de revisor.', '[]'::jsonb)
on conflict (slug) do nothing;

commit;
