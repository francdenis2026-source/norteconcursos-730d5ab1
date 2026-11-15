-- PC-AC 2026: aprofundamento da aula de cruzamento e relatórios analíticos.
update public.study_materials
set title='Cruzamento de registros e produção de relatórios analíticos',
topic_label='Cruzamento de registros, hipóteses, validação e relatórios',
body_md='# Cruzamento de registros e produção de relatórios analíticos

## 1. Objetivo e limites
O cruzamento compara bases para identificar correspondências, divergências e relações que mereçam análise. A coincidência é um indício para exame, não prova automática de identidade, autoria, causalidade ou irregularidade.

## 2. Preparação das bases
Confirme finalidade e autorização; identifique produtor, origem, período e cobertura; leia o dicionário de dados; preserve os originais; trabalhe em cópias identificadas; padronize datas, horários, unidades e identificadores sem apagar valores originais; documente regras de inclusão, exclusão e transformação.

## 3. Hipótese analítica
Hipótese é proposição delimitada e verificável. Exemplo: “há registros de eventos em comum entre duas bases no período analisado”. Defina entidades, período, critérios, resultados que podem confirmar ou enfraquecer a hipótese e explicações alternativas. Não formule hipótese que já pressuponha culpa ou causalidade.

## 4. Cruzamento e validação
Correspondência determinística utiliza regra exata, como identificador estável. Correspondência probabilística combina atributos e graus de semelhança. Verifique falsos positivos e falsos negativos. Após a junção, confira quantidades antes/depois, chaves sem correspondência, cardinalidade (um-para-um, um-para-muitos, muitos-para-muitos), duplicidades, campos ausentes e amostras de registros. Uma junção pode multiplicar linhas; total de linhas não equivale necessariamente a entidades ou eventos únicos.

## 5. Inconsistências
Divergências podem decorrer de erro de digitação, fuso, atraso de registro, atualização desigual, homônimos, compartilhamento de dispositivo ou critérios diferentes. Registre e investigue a divergência; não descarte automaticamente o registro contrário à hipótese.

## 6. Estrutura do relatório
1. Identificação: título, responsável, data e versão.
2. Objetivo/pergunta.
3. Escopo: período, universo, fontes e cobertura.
4. Método: critérios, filtros, correspondência e ferramentas.
5. Resultados: tabelas, gráficos, contagens e relações observadas.
6. Validação: conferências e inconsistências.
7. Limitações: dados ausentes, vieses e explicações alternativas.
8. Conclusão proporcional à evidência.
9. Fontes, versões e rastreabilidade.

## 7. Visualização
Tabelas apresentam valores exatos; barras comparam categorias; linhas mostram evolução temporal; mapas representam distribuição espacial quando a localização é confiável; diagramas mostram relações. Informe título, unidade, período, fonte e legenda. Evite escalas enganosas.

## 8. Proteção e rastreabilidade
Observe finalidade, necessidade, autorização, controle de acesso e proteção de dados pessoais. Registre bases utilizadas, acessos, transformações e operações. Compartilhe apenas o necessário, conforme normas institucionais.

## 9. Exemplo resolvido
Duas bases são cruzadas por chave comum. O resultado tem 120 linhas, mas 15 chaves aparecem repetidas. Antes de afirmar que existem 120 eventos únicos, a equipe examina a cardinalidade, identifica relações um-para-muitos e remove apenas duplicidades confirmadas segundo regra documentada. O relatório informa contagem inicial, regra aplicada, correspondências validadas e limitações.

## Pegadinhas
Cruzamento não prova identidade ou culpa; hipótese deve ser testável; linhas após junção não equivalem a entidades únicas; correlação não demonstra causalidade; relatório expõe método, fontes e limitações.',
flashcards='[{"f":"O que deve conter um relatório analítico?","b":"Objetivo, escopo, fontes, método, resultados, validação, limitações, conclusão e rastreabilidade."},{"f":"Uma correspondência entre duas bases prova identidade?","b":"Não. É necessário validar critérios, contexto e fontes."},{"f":"Por que uma junção pode multiplicar linhas?","b":"Porque uma chave pode encontrar várias correspondências na outra base."},{"f":"O que é uma hipótese analítica?","b":"Proposição delimitada e verificável que será examinada pelos dados."},{"f":"Por que registrar transformações e versões?","b":"Para permitir auditoria, reprodução e rastreabilidade da análise."}]'::jsonb,
quiz='[{"q":"O relatório deve descrever fontes, método e limitações.","a":true,"why":"Esses elementos permitem avaliar e reproduzir a análise."},{"q":"Uma correspondência entre registros comprova automaticamente identidade.","a":false,"why":"Correspondência exige validação e pode conter falsos positivos."},{"q":"Uma junção um-para-muitos pode multiplicar linhas.","a":true,"why":"Cada correspondência pode gerar uma linha no resultado."},{"q":"A hipótese analítica deve ser formulada de modo que não possa ser contrariada pelos dados.","a":false,"why":"Deve ser verificável e admitir resultados que a enfraqueçam."},{"q":"O relatório deve distinguir resultados observados de inferências e conclusões.","a":true,"why":"A conclusão precisa ser proporcional à evidência disponível."}]'::jsonb,
updated_at=now()
where slug='pcac-2026-analise-dados-cruzamento-hipoteses-relatorios'
and content_status='active';
