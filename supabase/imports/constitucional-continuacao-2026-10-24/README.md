# Continuação de Direito Constitucional — 24/10/2026

## Publicação

Foram analisados 34 arquivos enviados pelo usuário, com 197 páginas. O resultado é redação própria baseada nos temas e nas fontes oficiais, não republicação das apostilas. Os exercícios dos arquivos não foram copiados ou atribuídos a banca sem origem oficial comprovada.

Foram publicados **12 módulos novos** e complementados **três módulos existentes**, em Direito Constitucional. Cada módulo final tem vinte exercícios de fixação. Os novos módulos contêm 240 exercícios, 24 casos resolvidos e 48 flashcards. Foram acrescentados outros seis casos aos módulos existentes, preservando seus casos anteriores.

| Módulo novo | Conteúdo principal |
| --- | --- |
| Direitos fundamentais: teoria, eficácia e tratados | Aplicação, garantias, integração normativa e tratados |
| Vida e igualdade | Proteções constitucionais, diferenciações e concurso |
| Liberdades constitucionais | Expressão, crença, reunião, associação e profissão |
| Propriedade e função social | Desapropriação, requisição e proteção patrimonial |
| Segurança jurídica e processo | Domicílio, defesa, prova, publicidade e sanções |
| Remédios constitucionais | Escolha do instrumento, requisitos e limites |
| Direitos sociais e trabalho | Arts. 6º a 11 e distinções de vínculos |
| Organização do Estado e competências | Entes, repartição de atribuições e intervenção |
| Administração pública na Constituição | Princípios, ingresso, vínculos e conexões aos módulos administrativos |
| Judiciário: garantias e carreira | Estrutura, garantias, quinto e reserva de plenário |
| Tribunais e CNJ | Composição atual, requisitos e competências |
| Funções essenciais à Justiça | MP, CNMP, advocacias e Defensoria |

As rotas seguem `/dashboard/library/` mais o `slug` registrado em `modules.json`. Os módulos de nacionalidade, direitos políticos e princípios fundamentais foram ampliados nas rotas existentes, sem criar cópias paralelas.

## Integração e correções

- Comparados 174 títulos de materiais e 740 registros de questões constitucionais, além das baterias já publicadas dos materiais consultados.
- Conteúdo detalhado de privacidade, acumulação de cargos, Lei 8.112, atos, controle, responsabilidade civil e improbidade foi referenciado por links, evitando duplicação de módulos.
- Na bateria de princípios, doze itens foram preservados e oito substituídos para incluir fundamentos, objetivos, relações internacionais e separação dos Poderes, mantendo vinte itens.
- Em nacionalidade, três itens foram revistos: uma generalização excessiva foi delimitada; um item de migração foi substituído por questão constitucional de símbolos; uma pergunta repetida sobre perda foi substituída por equiparação de portugueses.
- A bateria de direitos políticos foi preservada. As duas revisões antigas tinham metadados incompletos; foram reconstruídas com assunto, data, escopo, fonte oficial, hash e vínculo de edital. O validador da plataforma não foi afrouxado.
- Foram preservados os casos anteriores na nova versão de exemplos. As versões anteriores permanecem arquivadas; não foram apagadas.
- A comparação de redação dos novos exercícios não encontrou enunciados idênticos aos registros consultados. Isso não equivale a auditoria semântica de todo o acervo.
- Não houve inserção nas tabelas `question_bank`, `board_exam_questions`, `official_exam_questions` ou `curated_question_catalog`. A fixação é local dos materiais e não infla os totais públicos de questões.

## Vigência e fontes

As fontes efetivamente consultadas, com URL, data e SHA-256, estão em `sources.json`. A Constituição compilada oficial do Planalto é a base principal. Foram conferidas também as leis de mandado de segurança, habeas data e mandado de injunção e a página oficial da Súmula Vinculante 25, com seus precedentes.

Pontos de atenção tratados:

- EC 131/2023: não reintroduzida perda da nacionalidade por mera aquisição de outra nacionalidade.
- EC 138/2025: professor com outro cargo de qualquer natureza, observadas as condições constitucionais; aprofundamento no módulo já existente.
- EC 122/2022: limites atuais de ingresso nos tribunais, distinguindo-os da aposentadoria.
- Regime previdenciário: não reaproveitadas fórmulas históricas universais.
- Partidos: consideradas consultas locais e redações atuais do art. 17; percentuais têm bases e objetos próprios.
- Súmula Vinculante 25: não ensinada prisão civil do depositário infiel como hipótese aplicável.
- Mandado de injunção: não reduzido automaticamente a declaração sem efeitos concretizadores.
- Precatórios: não transplantados índices, valores ou prazos antigos; não foi elaborado manual de cálculo desse regime.

O paginador do RE 466.343 retornou 403. Não foi considerado documento consultado; foram usados os precedentes que constam na página oficial acessível da SV 25. Tentativas do documento próprio da EC 97 expiraram; não foram publicados patamares anuais de cláusula de desempenho com base nessas tentativas. A tentativa de consultar a Lei de Migração também expirou; esta etapa não declara nova revisão integral das medidas migratórias do material anterior.

Três arquivos predominantemente em imagens receberam OCR auxiliar. Essa transcrição não foi usada como fonte de vigência nem como texto a publicar.

## Edital e responsabilidade

Os novos exercícios estão vinculados ao tópico oficial cadastrado de Direito Constitucional do edital PCPI Delegado, cuja edição está ativa no banco e cujo PDF oficial foi efetivamente consultado. A prática já publicada de princípios mantém seu vínculo anterior de edital. Reutilização em outra carreira depende da pertinência e da data de corte; o texto atual de estudo não modifica provas históricas.

A conta administradora responsável foi indicada pelo usuário e validada. A elaboração e conferência foram feitas por assistência delegada; não se afirma revisão humana independente. Nenhum token ou e-mail foi salvo neste lote.

## SQL e validação

- `package.json`: estado final completo, snapshots anteriores dos três materiais e metadados dos exemplos.
- `input-routing.json`: associação única dos 34 arquivos aos módulos ou complementos.
- `01-publish-constitutional-continuation.sql`: transação com bloqueios, validação de edital e responsável, proteção contra concorrência e conferência de leitura interna.
- `dry-run-result.json`: execução de validação revertida por rollback.
- `publication-result.json`: publicação confirmada no banco.
- `02-verify-publication.sql` e `verification-result.json`: consulta posterior independente, comparação exata do conteúdo e dos hashes, fontes cadastradas e versão única de exemplos ativa.
- `03-verify-official-sv25-source.sql` e `sv25-source-result.json`: atualização pontual da fonte da SV 25, que ainda constava como em revisão, após consulta efetiva; preservadas as observações anteriores e protegida a alteração contra concorrência.

Foram aprovados 24 testes pertinentes, incluindo o desbloqueio real das quinze baterias pelo validador de material e assunto, e o build de produção foi concluído com sucesso após integrar a main remota. Esta etapa altera conteúdo e artefatos, sem modificar componentes visuais. Não foi feita uma nova inspeção visual autenticada.
