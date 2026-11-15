-- PC-AC 2026: complementos de Estatística (amostragem e distribuições).
-- Idempotente por slug; mantém teoria, flashcards e questões alinhados ao catálogo study_materials.
insert into public.study_materials
(slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,syllabus_topic_order,source_note,legal_basis,content_status,flashcards,quiz)
values
(
'pcac-2026-estatistica-11-tecnicas-basicas-amostragem','Estatística','1.3 Técnicas básicas de amostragem',11,
'Técnicas básicas de amostragem','Complemento didático do edital PC-AC 2026: técnicas básicas de amostragem.',
'# Técnicas básicas de amostragem

## População e amostra
População é o conjunto completo de unidades que se deseja estudar. Amostra é uma parte da população escolhida para produzir informações sobre esse conjunto. A qualidade das conclusões depende de como a amostra foi selecionada.

## Amostragem aleatória simples
Cada elemento da população tem a mesma probabilidade conhecida de ser escolhido. Exemplo: sortear 50 nomes de uma lista completa, sem escolher pessoas por preferência.

## Amostragem sistemática
Escolhem-se elementos em intervalos regulares, depois de definir um primeiro elemento aleatoriamente. Exemplo: selecionar um registro a cada 10 da lista. Se houver repetição periódica relacionada ao intervalo, pode surgir viés.

## Amostragem estratificada
Divide-se a população em grupos (estratos) com características relevantes e selecionam-se elementos de todos os estratos. A seleção pode ser proporcional ou não proporcional.

## Amostragem por conglomerados
Divide-se a população em grupos naturais, sorteiam-se alguns grupos e pesquisam-se todos ou parte de seus integrantes. Exemplo: sortear escolas e pesquisar alunos das escolas sorteadas.

**Pegadinha:** estratificada seleciona elementos em todos os estratos; conglomerados seleciona alguns grupos.

## Amostragem não probabilística
Na seleção por conveniência, julgamento ou cotas, as probabilidades de inclusão não são conhecidas. Pode ser útil em estudos exploratórios, mas limita a generalização estatística.

## Erros e representatividade
Uma amostra grande não elimina automaticamente viés. Lista incompleta, não resposta, autoseleção e exclusão de grupos podem comprometer os resultados.

## Exemplo resolvido
Uma secretaria tem 1.000 servidores: 700 administrativos e 300 operacionais. O pesquisador sorteia servidores dos dois grupos, mantendo proporção 70/30. É amostragem estratificada proporcional, pois houve divisão em estratos e seleção dentro de cada um.

## Resumo
Aleatória simples = sorteio; sistemática = intervalo regular após início aleatório; estratificada = seleção em cada estrato; conglomerados = sorteio de grupos; conveniência = seleção não probabilística.',
'PC-AC 2026',1,'Edital nº 001 SEAD/PCAC, de 05/11/2026, Anexo III, Estatística, tópico 1.3. Material autoral complementar, não oficial da banca.',
jsonb_build_array(jsonb_build_object('title','Edital PC-AC 2026, Anexo III','url','https://sead.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf')),
'active',
'[{"f":"O que é população?","b":"Conjunto completo de unidades que se deseja estudar."},{"f":"O que é amostra?","b":"Parte da população selecionada para produzir informações."},{"f":"O que caracteriza a amostragem aleatória simples?","b":"Cada elemento tem a mesma probabilidade conhecida de seleção."},{"f":"Qual a diferença entre estratificada e conglomerados?","b":"Estratificada seleciona elementos em todos os estratos; conglomerados sorteia alguns grupos."},{"f":"Amostragem por conveniência é probabilística?","b":"Não. As probabilidades de inclusão não são conhecidas."}]'::jsonb,
'[{"q":"A amostragem aleatória simples dá a cada elemento a mesma probabilidade conhecida de seleção.","a":true,"why":"Essa é sua característica definidora."},{"q":"Na amostragem sistemática, os elementos são escolhidos em intervalos regulares após um início aleatório.","a":true,"why":"É necessário observar possível periodicidade da lista."},{"q":"Na amostragem estratificada, selecionam-se elementos de todos os estratos.","a":true,"why":"A seleção ocorre dentro de cada estrato."},{"q":"Na amostragem por conglomerados, sorteiam-se alguns grupos naturais.","a":true,"why":"Escolas ou bairros podem ser conglomerados."},{"q":"Uma amostra grande elimina qualquer viés de seleção.","a":false,"why":"Tamanho não corrige lista incompleta, autoseleção ou não resposta enviesada."}]'::jsonb
),
(
'pcac-2026-estatistica-12-distribuicoes-probabilidade','Estatística','6.5 Noções de distribuições de probabilidade',12,
'Noções de distribuições de probabilidade','Complemento didático do edital PC-AC 2026: distribuições de probabilidade.',
'# Noções de distribuições de probabilidade

## Variável aleatória
É uma variável numérica cujo valor depende do resultado de um experimento aleatório. Discreta assume valores isolados ou contáveis (número de ocorrências); contínua pode assumir qualquer valor em um intervalo (tempo de atendimento).

## Distribuição discreta
Atribui uma probabilidade a cada valor possível. As probabilidades devem ser não negativas e somar 1. Exemplo: ao lançar uma moeda justa duas vezes, o número de caras pode ser 0, 1 ou 2, com probabilidades 1/4, 1/2 e 1/4.

## Distribuição contínua
É descrita por uma função densidade. A probabilidade de a variável ficar entre dois valores é a área sob a curva nesse intervalo. Em distribuições contínuas usuais, a probabilidade de um valor pontual exato é zero.

## Valor esperado
É a média teórica de longo prazo. Para variável discreta: E(X) = Σ x · P(X=x). No exemplo das duas moedas: E(X) = 0×1/4 + 1×1/2 + 2×1/4 = 1 cara.

## Distribuições conhecidas
- Bernoulli: um experimento com dois resultados, como sucesso ou fracasso.
- Binomial: conta sucessos em n tentativas independentes, com probabilidade constante.
- Normal: distribuição contínua simétrica, em formato de sino, descrita pela média e pelo desvio-padrão.

## Como a banca pode cobrar
Identificar variável discreta ou contínua; verificar soma das probabilidades; interpretar área sob densidade; reconhecer valor esperado; identificar condições básicas da binomial.

## Resumo
Discreta = valores contáveis; contínua = intervalos; distribuição válida = probabilidades somam 1; valor esperado = média ponderada.',
'PC-AC 2026',1,'Edital nº 001 SEAD/PCAC, de 05/11/2026, Anexo III, Estatística, tópico 6.5. Material autoral complementar, não oficial da banca.',
jsonb_build_array(jsonb_build_object('title','Edital PC-AC 2026, Anexo III','url','https://sead.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf')),
'active',
'[{"f":"O que é variável aleatória discreta?","b":"Assume valores isolados ou contáveis."},{"f":"O que é variável aleatória contínua?","b":"Pode assumir qualquer valor em um intervalo."},{"f":"Quanto devem somar as probabilidades de uma distribuição discreta?","b":"Exatamente 1."},{"f":"Como calcular o valor esperado discreto?","b":"Somar cada valor multiplicado por sua probabilidade."},{"f":"Como se interpreta probabilidade em variável contínua?","b":"Como área sob a densidade em um intervalo."}]'::jsonb,
'[{"q":"O número de ocorrências em um plantão é exemplo de variável discreta.","a":true,"why":"É uma contagem."},{"q":"O tempo de atendimento pode ser variável contínua.","a":true,"why":"Pode assumir valores fracionários."},{"q":"As probabilidades de todos os resultados de uma distribuição discreta devem somar 1.","a":true,"why":"É uma condição de validade."},{"q":"Em uma distribuição contínua usual, a probabilidade de um valor pontual é zero.","a":true,"why":"A probabilidade é calculada em intervalos."},{"q":"A distribuição binomial conta sucessos em tentativas independentes com probabilidade constante.","a":true,"why":"Essas são as hipóteses básicas do modelo."}]'::jsonb
)
on conflict (slug) do update set
topic_label=excluded.topic_label,sort_order=excluded.sort_order,title=excluded.title,summary=excluded.summary,
body_md=excluded.body_md,source_note=excluded.source_note,legal_basis=excluded.legal_basis,
content_status='active',flashcards=excluded.flashcards,quiz=excluded.quiz,updated_at=now();
