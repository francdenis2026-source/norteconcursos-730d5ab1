# Análise IDECAN para PC-AC 2026 — Oficial Investigador

**Status:** Fase 1 — análise documental e do acervo local  
**Atualização da base:** 7 de novembro de 2026  
**Escopo:** concurso PC-AC regido pelo Edital nº 001/2026 SEAD/PCAC, cargo Oficial Investigador/Investigador, e amostra IDECAN já catalogada na Norte Concursos.

## Diagnóstico executivo

O projeto contém uma fonte verticalizada do edital PC-AC 2026, com disciplinas e tópicos do Anexo III, além de plano de estudos, cronograma, links de materiais e exportação do edital. A data registrada para a prova objetiva é **24/01/2027** e a banca registrada é **IDECAN**.

A base IDECAN local contém **273 questões estruturadas**, mas elas não são uma prova PC-AC 2026. O acervo é formado por provas policiais e correlatas da IDECAN, incluindo PC-SC Agente e Escrivão, PMSC e CBMMG, conforme o status de importação. A PC-AC anterior localizada na auditoria é de 2017 e foi aplicada pela IBADE; portanto, não deve ser apresentada como evidência do estilo IDECAN.

A conclusão segura é: o edital PC-AC 2026 está confirmado dentro do projeto; os padrões de cobrança abaixo são indícios baseados em amostra IDECAN de concursos semelhantes; uma previsão específica da prova PC-AC permanece projeção.

## O que está confirmado no projeto

### Edital e prova

- Edital: nº 001/2026 SEAD/PCAC.
- Banca: IDECAN.
- Prova objetiva: 100 questões de cinco alternativas.
- Data registrada: 24/01/2027.
- Concurso: 139 vagas no total, conforme `docs/idecan-pc-ac-raio-x.md`.
- Cargo analisado: Oficial Investigador/Investigador.
- A plataforma mantém o edital verticalizado por cargo, progresso por tópico, cronograma específico, PDF do edital e links de estudo.

### Distribuição registrada para os cargos não Delegado

A fonte local registra a seguinte estrutura geral:

| Bloco | Questões | Peso registrado |
|---|---:|---:|
| Língua Portuguesa | 6 | não informado no resumo geral |
| Raciocínio Lógico | 6 | não informado no resumo geral |
| Informática | 8 | não informado no resumo geral |
| Realidade do Acre | 4 | não informado no resumo geral |
| Constitucional | 3 | não informado no resumo geral |
| Administrativo | 3 | não informado no resumo geral |
| Penal e Processo Penal | 6 | não informado no resumo geral |
| Legislação Institucional | 4 | não informado no resumo geral |
| Conhecimentos específicos | 60 | peso 2 registrado |

**Cuidado:** o resumo local não detalha, nessa tabela, a divisão interna de todas as disciplinas nem os critérios completos de eliminação. Esses itens devem ser conferidos diretamente no PDF oficial antes de serem usados como regra operacional.

### Disciplinas verticalizadas do Investigador

A fonte `src/data/pcAcreVerticalizado.ts` registra 14 disciplinas para o cargo, incluindo:

1. Língua Portuguesa;
2. Raciocínio Lógico;
3. Noções de Informática;
4. Realidade do Acre;
5. Noções de Direito Constitucional;
6. Noções de Direito Penal e Processual Penal;
7. Noções de Direito Administrativo;
8. Legislação Institucional;
9. Contabilidade e Análise Financeira;
10. Estatística;
11. Arquivologia;
12. Tecnologia da Informação e Segurança;
13. Análise de Dados;
14. Noções de Administração.

A lista acima é a estrutura de estudo do projeto. A quantidade exata de questões por cada uma dessas 14 disciplinas deve ser exibida a partir do edital oficial e não inferida apenas da lista de tópicos.

## Metodologia e fontes

A análise foi feita em quatro camadas:

1. **Fonte normativa local:** edital verticalizado, estrutura de cargos e tópicos cadastrados.
2. **Amostra IDECAN local:** 273 questões importadas com banca, concurso, cargo, ano, disciplina, gabarito e URLs de prova/gabarito.
3. **Auditorias de curadoria:** arquivos de revisão e proveniência em `docs/question-review-*` e `docs/police-civil-audit-2026-10-16.json`.
4. **Radar interno:** `src/data/pcAcreIdecanRadar.ts`, `docs/idecan-pcac-prioridades-estudo.md` e `docs/idecan-pc-ac-raio-x.md`.

Fontes públicas registradas:

- Portal IDECAN: https://portal.concursos.idecan.org.br/
- PC-SC Agente IDECAN: https://antigo-concurso.idecan.org.br/Concurso.aspx?ID=200
- PC-SC Escrivão IDECAN: https://antigo-concurso.idecan.org.br/Concurso.aspx?ID=201
- Notícia de distribuição do edital: https://folha.qconcursos.com/n/concurso-pc-ac-edital-2026
- Página de análise da prova PC-SC Escrivão: https://www.qconcursos.com/questoes-de-concursos/provas/idecan-2026-pc-sc-escrivao-de-policia-civil

A política registrada no repositório é não copiar texto integral de terceiros quando a licença não estiver confirmada; nesses casos, manter metadados e fonte e criar questão autoral equivalente.

## Tamanho e limites da amostra

| Medida | Valor | Interpretação |
|---|---:|---|
| Questões IDECAN catalogadas | 273 | amostra local para orientação |
| Provas PC-AC IDECAN confirmadas | 0 | não confirmado no acervo |
| Prova PC-AC anterior localizada | 2017 | IBADE; não serve como evidência do estilo IDECAN |
| Provas IDECAN policiais/correlatas | múltiplas | usar por proximidade de cargo e conteúdo |

A amostra não permite afirmar uma “fórmula” fixa de gabarito, nem prever questões individuais. Frequência de um assunto na amostra é evidência de recorrência observada, não garantia de cobrança.

## Frequência observada no acervo IDECAN

| Disciplina | Questões catalogadas |
|---|---:|
| Língua Portuguesa | 50 |
| Tecnologia da Informação, Segurança Cibernética e Crimes Digitais | 40 |
| Raciocínio Lógico-Matemático | 26 |
| Direito Penal | 20 |
| Direito Processual Penal | 16 |
| Direito Administrativo | 12 |
| Direito Constitucional | 11 |
| Direitos Humanos | 9 |
| Legislação Institucional | 6 |
| Contabilidade | 6 |
| Legislação Penal | 5 |
| Informática | 3 |

Esses números são contagens do acervo local e não a distribuição oficial da prova PC-AC.

## Padrões de cobrança observados

A análise local descreve os seguintes padrões, com força limitada pela amostra:

- múltipla escolha com cinco alternativas e uma única correta;
- literalidade legal combinada com aplicação prática;
- alternativas próximas, que trocam requisito, prazo, competência ou exceção;
- casos concretos em matérias jurídicas e de segurança da informação;
- cobrança de distinções entre institutos semelhantes;
- necessidade de conferir atualização legislativa, especialmente em trânsito, tecnologia, proteção de dados e legislação institucional;
- interpretação, sintaxe, reescrita e relações de sentido em Língua Portuguesa;
- proposições, equivalências, negações, conjuntos, porcentagem e probabilidade em Raciocínio Lógico.

Não foi encontrada base suficiente para afirmar um padrão confiável de distribuição de letras do gabarito. Isso não deve ser usado como estratégia de chute.

## Mapa de prioridades para Oficial Investigador

### Prioridade muito alta

**Direito Penal e Processo Penal** — teoria do crime, tentativa, concurso de pessoas, crimes contra pessoa, patrimônio e administração pública; inquérito, ação penal, provas, cadeia de custódia, prisões, cautelares e identificação criminal. Justificativa: peso específico do núcleo jurídico e recorrência na amostra policial IDECAN.

**Legislação Institucional** — Lei Orgânica Nacional das Polícias Civis, legislação orgânica da PC-AC, estatuto funcional, deveres, direitos e regime disciplinar. Justificativa: conteúdo próprio do edital, com baixa possibilidade de substituição por provas de outros estados.

### Prioridade alta

**Língua Portuguesa** — interpretação e inferência, coesão, coerência, sintaxe, concordância, regência, crase, pontuação e reescrita. Amostra: maior contagem local.

**Raciocínio Lógico** — proposições, conectivos, equivalências, negações, argumentação, conjuntos, porcentagem, combinatória, probabilidade e gráficos.

**Tecnologia da Informação e Segurança** — sistemas, arquivos, planilhas, bancos de dados, redes, autenticação, criptografia, backups, metadados, phishing, malware e proteção de informações.

**Contabilidade, Análise Financeira, Estatística e Análise de Dados** — patrimônio, escrituração, demonstrações, juros, conciliação, tabelas, medidas, probabilidade, correlação, outliers, cruzamentos e linhas do tempo.

### Prioridade média-alta

**Arquivologia** — teoria das três idades, classificação, avaliação, temporalidade, preservação, documentos digitais, metadados e autenticidade.

**Informática** — sistemas operacionais, editores, planilhas, internet, e-mail, nuvem e segurança básica. Deve ser separada de Tecnologia da Informação quando o tópico do edital exigir.

### Prioridade média

**Constitucional, Administrativo e Administração** — direitos fundamentais, segurança pública, organização do Estado, atos, poderes, agentes, responsabilidade, organização administrativa, eficiência, ética e sigilo.

**Realidade do Acre** — formação histórica, ciclos da borracha, Revolução Acreana, Tratado de Petrópolis, geografia, municípios, bacias, clima, povos indígenas, cultura, economia, infraestrutura e desenvolvimento sustentável. É essencial por estar expressamente no edital, mesmo sem amostra IDECAN específica do PC-AC.

## Plano de estudo baseado em incidência

1. Começar pelo núcleo jurídico e legislação institucional, sempre ligado ao texto legal vigente.
2. Alternar Português e Raciocínio Lógico para garantir base transversal.
3. Estudar Tecnologia, Análise de Dados, Contabilidade e Estatística com exercícios práticos.
4. Manter Informática e Arquivologia em ciclos semanais curtos, com revisão espaçada.
5. Reservar bloco fixo para Realidade do Acre e legislação estadual, sem tratar como conteúdo secundário.
6. A cada ciclo, resolver questões por disciplina e registrar o erro no assunto exato.
7. Nas últimas semanas, priorizar revisão de erros, prazos, requisitos, competências, exceções e legislação atualizada.

## Checklist de revisão

- [ ] Conferi o texto oficial do edital e a edição correta.
- [ ] Sei quais disciplinas pertencem ao meu cargo.
- [ ] Revisei teoria do crime, inquérito, provas, prisões e cadeia de custódia.
- [ ] Revisei a legislação institucional nacional e estadual indicada.
- [ ] Resolvi questões de Português por assunto, não apenas por disciplina.
- [ ] Treinei lógica com equivalências, negações, conjuntos e probabilidade.
- [ ] Estudei segurança da informação e proteção de dados.
- [ ] Revisei Contabilidade, Estatística e Análise de Dados.
- [ ] Estudei a formação histórica, geografia e realidade socioeconômica do Acre.
- [ ] Conferi atualização das leis antes de usar uma questão ou resumo.
- [ ] Separei fatos confirmados, padrões observados e projeções.

## Leis e fontes prioritárias registradas no projeto

- Lei nº 14.735/2023 — Lei Orgânica Nacional das Polícias Civis.
- Lei Complementar nº 129/2004 — Lei Orgânica da Polícia Civil do Acre, conforme referência do projeto.
- Lei nº 2.250/2009 — referência institucional estadual registrada no projeto.
- Lei Complementar nº 39/1993 — Estatuto dos Servidores Públicos Civis do Acre, conforme referência do projeto.
- Constituição Federal, especialmente direitos fundamentais, organização do Estado e segurança pública.
- Código Penal e Código de Processo Penal, sempre em versão oficial atualizada.
- Leis especiais expressamente incluídas no Anexo III do edital.

A confirmação de vigência e a redação aplicável devem ser feitas nas fontes oficiais antes da publicação de qualquer questão.

## O que ainda não está confirmado

- distribuição interna final das 100 questões por cada uma das 14 disciplinas;
- nota mínima detalhada por disciplina e por bloco para o cargo de Oficial Investigador;
- critérios completos de eliminação em todas as etapas;
- existência e formato final de prova discursiva, investigação social, TAF e demais fases para cada cargo, salvo o que estiver explicitamente no edital oficial;
- prova anterior da própria IDECAN para PC-AC;
- probabilidades numéricas de cobrança por tópico.

## Fase 2 — não iniciada

Nenhuma questão inédita foi gerada ou inserida no banco nesta etapa. A geração deve começar somente depois da revisão deste diagnóstico, usando apenas tópicos confirmados do edital e fundamentos verificáveis.
