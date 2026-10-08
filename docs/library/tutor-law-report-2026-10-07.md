# Biblioteca jurídica: organização e prática por diploma

Conferência e publicação: 7 de outubro de 2026.

Os 39 diplomas que possuem percurso integral agora têm um guia próprio, com mapa de leitura, casos resolvidos, variações dos fatos e recuperação ativa. O catálogo começa pela legislação penal extravagante e separa Código Penal, CPP, CTB, proteção de pessoas, legislação específica da PF e pensões. Resumos relacionados ficam como aprofundamentos da respectiva lei. As outras disciplinas continuam em suas áreas; nenhuma foi apagada.

## Conteúdo publicado

| Entrega | Quantidade / resultado |
|---|---|
| Guias reorganizados | 39 |
| Casos fictícios com resolução e variação | 93 |
| Flashcards disponíveis nesses guias | 642 |
| Mínimo por diploma | 2 casos e 12 cartões |
| Casos do Código Penal / CPP | 8 / 8 |
| Avisos pertinentes de alteração e jurisprudência mantidos | 104 |
| Dispositivos comparados com as fontes oficiais | 3.640 registros, sem diferenças nesta conferência |
| Novas versões de exemplos publicadas | 39 |
| Materiais não abrangidos pela edição preservados | 108 |

A metodologia de `tutor` e `tutor-setup` foi adaptada à biblioteca da plataforma: recordar antes de consultar, justificar a regra, resolver situação concreta, variar um fato e revisar dificuldades. Não foi criado um StudyVault nem uma avaliação fictícia do aluno. O progresso por dispositivo, o histórico de exercícios e as versões anteriores de exemplos foram preservados.

Os cartões incluem conceitos, julgamentos comentados, aplicação e análise das variações. Podem ser salvos pelo aluno no baralho já existente. Não foram atribuídos à banca nem inseridos como questões oficiais. As leituras complementares antifacção e pensão especial mantêm a distinção de alcance em relação ao edital histórico; seus cartões não representam comprovação de cobrança no edital da PF de 2025.

Os guias continuam sendo revisões temáticas. A leitura integral está nos percursos vinculados, com dispositivos vigentes e excluídos identificados. Os exemplos selecionam problemas relevantes de cada diploma; não equivalem a um exemplo para cada artigo, nem garantem cobertura de todo edital de concurso.

## Fontes, vigência e classificação

Foram obtidos novamente os 39 textos oficiais do Planalto e comparados com os dispositivos armazenados. O manifesto registra URL, SHA-256, data, número de dispositivos e conjuntos de prática por norma. As referências dos novos casos foram conferidas no respectivo texto; o caso de tráfico de pessoas também referencia expressamente o art. 149-A do CP. Artigos do anexo da Convenção de Budapeste foram associados aos rótulos próprios do anexo.

Os avisos distinguem alteração vigente, vigência futura, referência jurisprudencial e ato que perdeu eficácia. As datas de conferência são registros de uma consulta, não atualização contínua automática. Os textos e avisos jurídicos previamente revisados foram preservados, com exceção de quatro avisos de emendas constitucionais sobre orçamento, tributos e cargos que estavam indevidamente no percurso do Código Penal. Os materiais constitucionais não foram alterados.

A associação dos guias de armas e repercussão interestadual ao percurso de segurança privada foi corrigida. Um material de nacionalidade permanece em Direito Constitucional, mesmo contendo referência à Lei de Migração. O aprofundamento sobre as Súmulas 545/630 permanece ligado ao CP.

## Treino por lei

O parâmetro `law` do treinador identifica o diploma pelo link oficial registrado na base legal da questão. Os filtros, contagens e seleção de treino trabalham dentro desse conjunto. CP, CPP, leis e decretos com números semelhantes não são confundidos; variações de URL compilada, pontos no número, parâmetros e âncoras são normalizadas.

O guia e a aba de aplicação do percurso mostram o botão de treino quando existem questões elegíveis com referência oficial à norma. Se não houver, orientam usar casos e cartões. Não há ampliação automática para outra lei quando o filtro retorna vazio. Questões relacionadas que ainda não tenham essa referência cadastrada podem ficar fora do resultado; não foi inferida classificação por palavra-chave.

## Publicação e validação

- Os 39 guias e metadados dos percursos foram publicados pelo RPC transacional existente. A leitura posterior confirmou todos os campos. Uma interrupção de rede na primeira leitura foi resolvida por reexecução, que preservou os 39 materiais já publicados.
- As 39 versões de exemplos foram inseridas e ativadas após conferência de conteúdo e fontes. A verificação posterior confirmou que são as versões ativas mais recentes e correspondem aos guias.
- A projeção `law_course_slug` usada pelo catálogo foi testada diretamente no Supabase. O banco mantém 136 materiais ativos e 39 percursos ativos nesta conferência.
- Testes automatizados: 43 aprovados, incluindo fontes, cobertura dos conjuntos, identidade dos filtros, separação das áreas e renderização do catálogo. TypeScript e build de produção aprovados.
- Uma atualização concorrente da `main` foi integrada sem reescrever histórico. Sua migração de revisão de cinco materiais PF tinha a mesma versão da migração de revisão jurídica existente; o arquivo foi renomeado para `20261007100000`, sem alterar seu SQL. Sua condição `under_review` preserva materiais já ativos.

Não foi feita validação visual em navegador autenticado nesta execução. A publicação do conteúdo no banco foi confirmada; a implantação do novo código de interface é uma etapa distinta do envio à `main`.

## Arquivos e reexecução

- `tutor-law-review-2026-10-07.json`: publicação com precondições e preservação em reexecuções.
- `tutor-law-examples-2026-10-07.json`: versões de exemplos e fontes.
- `tutor-law-manifest-2026-10-07.json`: rastreabilidade e contagens por diploma.

Use os importadores existentes, com `TASK_SUPABASE_PROJECT`, `TASK_SUPABASE_KEY` e `TASK_LIBRARY_REVIEWER` somente no ambiente:

```text
node scripts/apply-library-law-review.mjs docs/library/tutor-law-review-2026-10-07.json RELATORIO_REVISAO --dry-run
node scripts/import-study-enrichment.mjs docs/library/tutor-law-examples-2026-10-07.json RELATORIO_EXEMPLOS --dry-run
```

Para publicar, retire `--dry-run`. Publique primeiro a revisão dos guias e depois os exemplos. Relatórios operacionais, snapshots anteriores e HTML das fontes ficam nos outputs locais. Não integram o Git, assim como credenciais e PDFs privados.
