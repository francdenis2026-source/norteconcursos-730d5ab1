# Percursos completos de leitura e revisão de legislação

Entrega de 05/10/2026. Fontes legislativas conferidas em 04/10/2026, com registro de data, URL e SHA-256. Consulta e interpretação jurídicas são delimitadas pela data da conferência, sem promessa de atualização automática permanente.

## Experiência disponível

Na Biblioteca, a seção **Legislação: da leitura à revisão → Explorar percursos** abre 35 percursos. Cada percurso apresenta índice por capítulo/seção, pesquisa no texto, leitura por dispositivo, objetivos, alertas de atualização, recuperação sem consulta, critérios de conferência e anotações privadas. A resposta livre é autoavaliada; a interface informa isso antes de registrar a revisão.

O próximo passo prioriza revisões vencidas, depois leitura pendente e recuperação ainda não praticada. O servidor agenda dificuldade em 10 minutos ou um dia e amplia intervalos de recuperação até 30/60 dias. Leitura, recuperação e desempenho objetivo são acompanhados separadamente. Abrir uma página não marca leitura automaticamente.

O modo de aplicação utiliza os **280 itens comentados e 140 cartões** dos 35 materiais já publicados. A pontuação é calculada no servidor, com histórico privado e repetição segura da mesma tentativa. São exercícios temáticos de aplicação, não 280 itens novos nem um item objetivo para cada artigo. Os 102 materiais anteriores foram preservados.

## Cobertura e limites editoriais

São **2.308 unidades**, sendo **2.213 para leitura ativa** e **95 excluídas** da prática de regras vigentes por veto, revogação ou redação suprimida. Incluem os artigos extraídos dos 35 textos oficiais e sete anexos normativos/documentais (armas, trânsito, segurança privada, migração e CIN). A Convenção de Budapeste mantém artigos próprios distintos dos artigos do decreto de promulgação. Capítulos mantêm seus níveis hierárquicos para evitar seções homônimas misturadas.

Os anexos preservam tabelas e referências oficiais dos modelos. Dez imagens documentais da CIN dependem do servidor do Planalto; se não carregarem, permanece o link à figura oficial. Sua disponibilidade remota não foi confirmada nesta verificação final. Não são imagens privadas copiadas para o Git.

A leitura é integral por dispositivo extraído, acompanhada de prompts e critérios de recuperação. Isso não equivale a comentário doutrinário específico de cada inciso ou a catálogo exaustivo de jurisprudência. Há sete alertas jurisprudenciais selecionados, com fontes STF/STJ e vínculos aos dispositivos pertinentes. A autoavaliação não certifica domínio, preparação integral para qualquer edital ou aprovação. O edital de referência é identificado, e o percurso avisa quando a leitura integral excede o programa do cargo.

A alteração do ECA pela Lei 15.450/2026 possui vacatio de 180 dias e foi destacada como futura na data da consulta; não foi convertida em regra já aplicável. Normas modificadoras orientam também consultar o diploma alterado em sua redação compilada atual.

| Diploma | Unidades ativas | Excluídas |
|---|---:|---:|
| Lei 11.343/2006 — Lei de Drogas | 84 | 15 |
| Lei 10.826/2003 — Estatuto do Desarmamento | 41 | 1 |
| Lei 9.455/1997 — Crimes de Tortura | 4 | 0 |
| Lei 13.869/2019 — Abuso de Autoridade | 40 | 6 |
| Lei 12.850/2013 — Organizações Criminosas | 37 | 0 |
| Lei 8.072/1990 — Crimes Hediondos | 17 | 2 |
| Lei 11.340/2006 — Lei Maria da Penha | 56 | 1 |
| Lei 9.296/1996 — Interceptação Telefônica | 14 | 0 |
| Lei 9.613/1998 — Lavagem de Dinheiro | 25 | 4 |
| Lei 8.069/1990 — Estatuto da Criança e do Adolescente | 326 | 3 |
| Lei 9.605/1998 — Crimes Ambientais | 79 | 7 |
| Lei 7.960/1989 — Prisão Temporária | 7 | 0 |
| Lei 9.099/1995 — Juizados Especiais Cíveis e Criminais | 98 | 1 |
| Lei 12.830/2013 — Investigação conduzida pelo Delegado | 4 | 0 |
| Lei 12.037/2009 — Identificação Criminal | 13 | 0 |
| Lei 13.260/2016 — Lei Antiterrorismo | 17 | 3 |
| Lei 13.344/2016 — Tráfico de Pessoas | 18 | 0 |
| Lei 9.807/1999 — Proteção a Vítimas e Testemunhas | 22 | 0 |
| Lei 7.716/1989 — Crimes de Racismo e Preconceito | 23 | 4 |
| Lei 10.741/2003 — Estatuto da Pessoa Idosa | 117 | 1 |
| Lei 13.146/2015 — Estatuto da Pessoa com Deficiência | 127 | 3 |
| Lei 14.344/2022 — Lei Henry Borel | 34 | 0 |
| Lei 9.503/1997 — Código de Trânsito Brasileiro | 365 | 27 |
| Lei 7.210/1984 — Lei de Execução Penal | 216 | 3 |
| Decreto-Lei 3.688/1941 — Lei das Contravenções Penais | 66 | 6 |
| Lei 14.967/2024 — Estatuto da Segurança Privada | 72 | 1 |
| Lei 10.357/2001 — Controle de Produtos Químicos | 23 | 0 |
| Lei 13.445/2017 — Lei de Migração | 123 | 4 |
| Lei 10.446/2002 — Investigações de repercussão interestadual ou internacional | 2 | 0 |
| Lei 13.444/2017 — Identificação Civil Nacional | 13 | 0 |
| Lei 14.534/2023 — CPF como identificador único | 7 | 2 |
| Lei 7.116/1983 — Carteira de Identidade | 13 | 0 |
| Decreto 10.977/2022 — Carteira de Identidade Nacional | 30 | 1 |
| Decreto 11.797/2023 — Serviço de Identificação do Cidadão | 29 | 0 |
| Decreto 11.491/2023 — Convenção de Budapeste | 51 | 0 |

## Banco, segurança e validação

Migrações aplicadas na ordem versionada: `20261005010000_legal_learning_paths.sql` e `20261005011000_legal_course_assessments.sql`. RLS restringe progresso, anotações e tentativas ao proprietário. Gravações usam funções autenticadas; conferência de usuário impede atribuir dados a uma conta diferente após troca de sessão. A nota objetiva é conferida contra o gabarito armazenado, sem aceitar pontuação enviada pelo navegador.

Validação: testes de motor de revisão, importador e parser; typecheck e build; teste SQL com rollback de agendamento, reexecução, gabarito no servidor, exclusão de texto revogado e isolamento entre alunos. O importador compara todos os campos após gravação e recusa divergências em cursos revisados. Os testes no banco não deixam resultados artificiais nem criam usuários. A validação não inclui navegação visual completa em uma sessão real do aluno.

## Reconstrução e publicação

Os HTMLs oficiais, os textos extraídos, o pacote com conteúdo e as evidências de conferência ficam em outputs locais. O Git contém código, migrações, testes, metadados, mapa de cobertura e este relatório, sem PDFs privados, acervo bruto ou credenciais.

```text
python scripts/build-legal-curriculum.py PASTA_FONTES PACOTE_JSON
node scripts/import-legal-paths.mjs PACOTE_JSON RELATORIO_JSON --dry-run
node scripts/import-legal-paths.mjs PACOTE_JSON RELATORIO_JSON
```

Para publicação, definir somente no ambiente da sessão `TASK_SUPABASE_PROJECT`, `TASK_SUPABASE_KEY` e `TASK_LIBRARY_REVIEWER`. As migrações e as fontes oficiais devem existir antes da importação. O dry-run valida sem acessar o banco. Mudanças no hash de uma fonte exigem nova revisão; não são aceitas silenciosamente. Reexecuções preservam cursos revisados, unidades existentes e históricos dos alunos.
