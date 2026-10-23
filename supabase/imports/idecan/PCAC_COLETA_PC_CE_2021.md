# Coleta IDECAN para pesquisa da PC-AC — PC-CE 2021

Coleta de 22/10/2026: **200 questões objetivas de dois cadernos completos**, Inspetor e Escrivão, ambos Tipo B. Estes lotes são adicionais às 273 questões do JSON legado, que foi preservado. São 473 registros locais entre os dois formatos; isso não é contagem de questões ativas nem confirmação de importação no banco.

O portal moderno de editais retornou desafio Cloudflare; o [portal oficial antigo](https://antigo-concurso.idecan.org.br/SITE/Concursos.aspx) ficou acessível. Nele, foram localizados a PC-CE (ID 32), a PEFOCE (ID 33) e os gabaritos da PC-SC. A PEFOCE foi identificada como próxima fonte de pesquisa; não integra esta carga.

## Material efetivamente coletado

- [Inspetor — pacote privado de revisão](pcce_inspetor_2021_corpus.json): 100 itens, páginas de origem, textos extraídos, disciplinas e respostas transcritas do documento oficial.
- [Escrivão — pacote privado de revisão](pcce_escrivao_2021_corpus.json): 100 itens com a mesma rastreabilidade.
- [Resumo verificável da coleta](pcce_2021_coleta.json).
- [SQL de carga privada](pcce_2021_acervo_privado.sql): carrega apenas `question_corpus_sources` e `question_corpus_candidates`, em transação, com status `under_review`. Não escreve nas questões ativas, tentativas ou resultados dos alunos.

Os cadernos foram obtidos de espelho do Qconcursos; cargo, tipo e instituição foram conferidos nas capas. O gabarito veio da [publicação oficial da PC-CE](https://antigo-concurso.idecan.org.br/Concurso.aspx?ID=32). URLs, hashes SHA-256 dos PDFs, texto completo da fonte e texto do gabarito ficam nos metadados dos pacotes. Os PDFs não foram colocados na pasta pública do site.

## Pendências que bloqueiam publicação

**Inspetor B:** o link oficial se chama “GABARITO DEFINITIVO”, mas a página correspondente do PDF traz “GABARITO PRELIMINAR DAS QUESTÕES OBJETIVAS”. Todos os 100 itens desse caderno têm `answer_key_requires_clarification=true`. Os itens 17, 68, 76, 77 e 90 aparecem com asterisco; a divergência documental deve ser resolvida antes de certificar o gabarito.

**Escrivão B:** a seção do PDF traz cabeçalho definitivo. Os itens 18, 43 e 79 estão anulados e permanecem registrados para histórico, sem autorização de uso nos treinos.

**Ambos:** a extração preserva texto bruto, inclusive conteúdo discursivo no texto integral da fonte; somente os 100 itens objetivos de cada caderno viraram candidatos. Textos de apoio, grifos, fórmulas e figuras ainda precisam de revisão visual. Ter cinco rótulos de alternativas não comprova extração integral. A legislação é histórica de 2021: a vigência atual, a taxonomia de assuntos e o vínculo ao edital precisam ser conferidos individualmente conforme `CONTENT_GOVERNANCE.md`. Os cinco itens de legislação específica de cada caderno não devem transferir regras cearenses para o Acre.

## Distribuição observada

A identificação segue os títulos impressos nos dois cadernos. Em cada prova há 100 itens objetivos; portanto as quantidades coincidem com os percentuais de cada caderno completo, incluindo posições anuladas.

| Disciplina | Inspetor B | Escrivão B |
| --- | ---: | ---: |
| Língua Portuguesa | 10 | 10 |
| Informática | 10 | 10 |
| Noções de Direito Penal | 20 | 20 |
| Legislação Penal Extravagante | 10 | 10 |
| Noções de Direito Processual Penal | 15 | 15 |
| Noções de Direito Administrativo | 15 | 15 |
| Noções de Direito Constitucional | 15 | 15 |
| Legislação Específica | 5 | 5 |

Isso sustenta comparar a forma de cobrança do núcleo jurídico e de Português/Informática com as provas da PC-SC. São dois cargos do **mesmo concurso**, não duas observações independentes de diferentes concursos. Esses pesos não são previsão do edital da PC-AC. Incidência por tópico e classificação de estilo exigem revisão do enunciado; não foram inventadas a partir dos nomes das disciplinas.

## Aplicação e reprodução

O SQL está pronto para execução manual por administrador no SQL Editor do Supabase. Requer a estrutura da migração existente `20261010100000_private_question_corpora.sql`. A reexecução ignora IDs já presentes e preserva revisões; conteúdo divergente interrompe a transação. Ao final, uma consulta mostra o estado real das linhas. **Não foi executado no banco remoto**, pois esta sessão não dispõe de credencial administrativa configurada.

Também é possível usar o importador existente para cada pacote. O modo de validação não conecta ao banco:

```sh
node scripts/import-question-corpus.mjs supabase/imports/idecan/pcce_inspetor_2021_corpus.json /tmp/idecan-inspetor-check.json --dry-run
node scripts/import-question-corpus.mjs supabase/imports/idecan/pcce_escrivao_2021_corpus.json /tmp/idecan-escrivao-check.json --dry-run
node --import ./scripts/alias.mjs --test scripts/idecan/*.test.mjs
```

Para regenerar os pacotes, coloque os dois cadernos e o gabarito nos nomes indicados pelo extrator e execute com Python/PyMuPDF e `pdftotext` instalados:

```sh
python scripts/idecan/build-pcce-2021.py /tmp/idecan-coleta supabase/imports/idecan
node scripts/idecan/prepare-staging.mjs
```

O SQL também foi executado em PostgreSQL local via PGlite: carga de 200 candidatos, segunda execução sem duplicação, revisão posterior preservada e divergências de fonte/candidato bloqueadas. O teste reproduzível é `scripts/idecan/test-staging-sql.mjs`, recebendo o caminho do módulo PGlite instalado fora do projeto.
