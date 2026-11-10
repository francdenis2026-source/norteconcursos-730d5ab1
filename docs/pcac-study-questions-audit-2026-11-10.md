# Auditoria editorial — Administração e Arquivologia para PC-AC 2026

Data: 10/11/2026. Origem: três PDFs fornecidos pelo responsável da plataforma.

## Inventário dos arquivos

1. **Evolução da Administração Pública no Brasil – 1930** (Gran Cursos, 86 páginas de PDF): sumário aponta questões de concurso no bloco final (p. 64), gabarito (p. 75) e questões comentadas (p. 76). A licença impressa proíbe reprodução e distribuição. **Não importar enunciados nem comentários integrais.**
2. **Noções de Administração/Situações Gerenciais — Aula 00** (Direção Concursos, 123 páginas): possui questões comentadas (a partir da p. 47), lista de questões (a partir da p. 95) e gabarito (p. 116). Material de curso comercial. **Não importar reprodução literal sem autorização.**
3. **Arquivologia para Concursos Públicos** (Editora Áudio, edição 2011, 32 páginas): conteúdo predominantemente teórico, sem uma seção formal de questões identificada no sumário/texto. Antigo para temas normativos digitais.

## Implantação verificada no banco

- `study_materials`: 27 aulas autorais, todas em `under_review`, com fontes e exercícios simples de certo/errado (`quiz`).
- `curated_question_catalog`: 21 questões inéditas em `active`, com alternativas `(A) Certo` e `(B) Errado`, fonte não oficial e `is_original=true`: 11 de Arquivologia e 10 de Noções de Administração.
- Administração Pública: 6 exercícios complementares vinculados apenas às aulas, pois não foi constatado tópico equivalente específico da PC-AC na tabela `syllabus_topics` para estes materiais históricos.
- Os 21 itens ativos estão vinculados aos tópicos já cadastrados da PC-AC: Arquivologia e Noções de Administração para Oficial Investigador. Não atribuir outras carreiras sem tópico correspondente no edital.
- `study_guide_progress`: RLS por `auth.uid() = user_id`; sem token de aluno nenhuma linha de progresso é visível. Teste de leitura com `role authenticated` e sem identidade retornou 0 linhas.
- Simulação de leitura com `role authenticated` confirmou 21 questões visíveis e 0 aulas ainda pendentes de revisão na biblioteca nativa.
- Testes de regressão de conteúdo, deep links e sintaxe das alternativas adicionados em `scripts/library-materials.test.mjs`.

## Critérios de qualidade e pendências

- O aplicativo já usa o fluxo `LibraryAdmin` que exige usuário administrador autenticado, checagem de data e fontes oficiais para publicar materiais. Não falsificar `reviewed_by`, `reviewed_at` ou bypassar a restrição de publicação; homologar as 27 aulas por esse fluxo após revisão editorial.
- Conferir o programa exato do edital e retificações por cargo. Arquivologia e Noções de Administração para Oficial Investigador estão mapeadas; Noções de Arquivologia para Papiloscopista exige vínculo específico.
- **Fontes conferidas:** Resoluções CONARQ nº 50/2022, 51/2023, 54/2023; Portaria AN/MGI nº 174/2024; Decreto-Lei nº 579/1938 na Câmara dos Deputados; notícia oficial PC-AC de 06/11/2026.
- O Arquivo Nacional orienta que a Portaria AN/MGI nº 174/2024 se aplica ao Executivo **federal**; não aplicar tabelas federais à PC-AC estadual sem instrumentos locais.
- Para itens atualizáveis, rever base normativa na data da publicação e em futuras alterações.
- **Build/execução no navegador autenticado:** ainda não testados neste ambiente. O CI do repositório executa testes, typecheck, lint e build por push, mas o status do workflow não pôde ser consultado pelos conectores atuais.
- **Não reutilizar questões oficiais** por identificação presumida; as questões ora integradas são explicitamente didáticas e autorais.

## Fontes oficiais

- Edital/notícia da PC-AC: https://pc.ac.gov.br/governo-do-acre-lanca-edital-de-concurso-da-policia-civil-com-139-vagas/
- CONARQ: https://www.gov.br/conarq/pt-br/legislacao-arquivistica/resolucoes-do-conarq/resolucoes-do-conarq/
- Arquivo Nacional, Portaria 174: https://www.gov.br/arquivonacional/pt-br/servicos/gestao-de-documentos/orientacao-tecnica-1/codigo-de-classificacao-e-tabela-de-temporalidade-e-destinacao-de-documentos-de-arquivo/codigo-de-classificacao-e-tabela-de-temporalidade-e-destinacao-de-documentos-relativos-as-atividades-meio-do-poder-executivo-federal
- Decreto-Lei 579/1938: https://www2.camara.leg.br/legin/fed/declei/1930-1939/decreto-lei-579-30-julho-1938-350919-norma-pe.html
