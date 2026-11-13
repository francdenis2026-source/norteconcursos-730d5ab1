# Auditoria completa — Norte Concursos

- **Data:** 13/11/2026
- **Repositório:** `francdenis2026-source/norteconcursos-730d5ab1` (branch `main`, commit `d8b7d0ee`)
- **Escopo:** somente leitura. Nenhuma correção foi implementada, nada foi publicado na `main`, o Supabase não foi alterado.
- **Ambiente da auditoria:** sessão em nuvem do Claude Code (Linux). A pasta `E:\norteconcursos-730d5ab1-main` **não é acessível** daqui; o clone usado foi o do GitHub.

## 0. Limitações (leia primeiro)

| Limite | Efeito na auditoria |
| --- | --- |
| Sem acesso ao banco real | Só vi os números que o proprietário colou no chat (totais e contagens por disciplina). RLS, políticas e funções foram lidas **nas migrations**, não no banco ao vivo. |
| Sem login real | A área logada foi renderizada com **sessão simulada e banco simulado (respostas vazias)**. Layout e largura foram medidos; conteúdo e dados reais **não** foram vistos. |
| Sem Lovable | Não consegui ver o estado do projeto no Lovable. |
| Histórico do Claude Code anterior | O histórico local não está acessível. A reconstrução vem do Git (commits, PRs, branches) e dos arquivos `HANDOFF.md` e `roadmap.md`. |
| Sem teste ponta a ponta | Não há suíte E2E no repositório; fluxos como simulado, flashcards e redação **não** foram executados. |
| Skills de design | A skill `impeccable` está instalada no projeto e foi usada em sessões anteriores para contraste/layout. Nesta auditoria **não** a executei; as verificações visuais foram feitas por renderização com Playwright. |

## 1. Estado real da `main` e do trabalho anterior

- `main` em `d8b7d0ee` (13/11/2026), 213 commits no histórico visível. Não há alterações locais pendentes no clone usado.
- Atividade recente: 48 commits em 11/11, 123 em 12/11, 42 em 13/11.
- 414 branches remotas (a maioria `claude/*`, já mescladas). Branches desta sessão sem PR aberto: `claude/auditoria-completa` (este relatório), `claude/mapas-juridicos-2` (só dados, já superada pelo PR 578).
- **Concluído e mesclado nesta sessão** (PRs 575–601): botões do resumo PC-AC; mapas jurídicos interativos (Penal, Processual, Extravagante, Constitucional); player de vídeo (tela cheia, barra de andamento, botões responsivos); biblioteca de vídeos; auditoria de contraste; Resex/indígenas/IBGE/linha do tempo do Acre; imagens dos atalhos restauradas; largura da janela em ~40 rotas; rolagem visível em tela cheia; barra de endereços só com a seção.
- **Concluído por outras sessões** (por mensagens de commit): persistência de respostas de exercícios da Biblioteca (`material_practice_responses`, PRs 589 e seguintes), revisão editorial de exercícios normativos, cronograma PC-AC em largura total (#590), unificação da trilha guiada e materiais (#598).
- **Planejado e não concluído** (de `roadmap.md`): validar atualização de perfil com sessão real; teste ponta a ponta do Treinador com conta real. `HANDOFF.md` está desatualizado (aponta caminho local `C:\Users\familia\...` e remoto `platforma` obsoleto).
- Marcadores `TODO/FIXME` reais no código: **nenhum relevante** (as ocorrências são texto jurídico).

## 2. Resultados técnicos (executados nesta sessão)

| Verificação | Resultado |
| --- | --- |
| `tsc --noEmit` | **Passou**, 0 erros |
| `npm test` | **932 testes, 932 aprovados, 0 falhas** |
| `vite build` | **Passou** (aviso: alguns chunks > 500 kB; maior no cliente: `index-*.js` 521 kB / 163 kB gzip) |
| `eslint src` | **0 erros, 33 avisos** (16 `react-hooks/exhaustive-deps`, 16 `react-refresh/only-export-components`, 1 sem regra) |
| `npm audit` | **Não executado com êxito**: o repositório não tem `package-lock.json` (erro ENOLOCK). Dependências **não auditadas**. |
| Testes E2E | **Inexistentes** |

Tamanho e complexidade: `src/styles.css` tem 17.301 linhas; 167 arquivos de estilo; ~4.930 ocorrências de `!important`. Arquivos TSX muito grandes: `mock-exams.tsx` (2.758 linhas), `question-trainer.tsx` (2.255), `student-exams.tsx` (1.480), `calculadora-penal.tsx` (1.375).

## 3. Supabase

**Dados reais informados pelo proprietário (13/11/2026):**

- `get_public_question_summary()`: **registradas 10.390; disponíveis para treinar 6.785 (65,3%)**.
- A tabela `official_exam_questions` por disciplina tem mais de 100 variações de nome (ver §6, item P2-1).
- `study_materials`: 35 disciplinas distintas; 1 a 39 materiais cada.

**Leitura estática das migrations (529 arquivos):**

- `material_practice_responses` (migration `20261113020000`): RLS ativada; `revoke all` de `anon` e `authenticated`; apenas `select` para `authenticated` com política `auth.uid() = user_id`; índices por usuário/data e por usuário/material/item; `selected_answer` e `official_answer` restritos a `C`/`E`; `on delete cascade` em `auth.users` e `study_materials`. **Sem política de escrita**: a escrita só ocorre pela função.
- `record_material_practice_answer(...)`: `security definer`, `search_path = ''`, exige `auth.uid()`, valida parâmetros, lê o gabarito **do servidor** (o cliente não envia a correção), exige revisão editorial para disciplinas jurídicas/contábeis (`practice_review` com versão, escopo, fontes com SHA-256 e tópico ativo), idempotente por `p_attempt_id`. `revoke` de `public, anon`; `grant` só para `authenticated`. **Bem construída.**
- Funções `security definer` sem `search_path`: 1 (`check_user_tier_limit`), **corrigida depois** pela migration `20261030070000` e restrita por `20261030100000`.
- Funções públicas para `anon` (intencionais): contagem pública, questões do Desafio diário, data do Acre, `login_email_for_cpf`.
- Políticas `using (true)`: concentradas no esquema base e restritas a `service_role` ou a leitura pública de catálogos (disciplinas, assuntos, conquistas, planos). Sem evidência de escrita aberta.
- Edge functions `fetch-contest-edital` e `analyze-exam-upload`: exigem JWT e papel `admin`; a primeira bloqueia destinos não HTTPS, com usuário/senha/porta e hosts locais (proteção contra SSRF). Usam `service_role` no servidor (correto), CORS `*` (aceitável com JWT).
- Chave publicável do Supabase no cliente (`client.ts`) é a de projeto público; o comentário proíbe `service_role` no front, e a busca por `service_role` em `src/` só achou esse comentário.

**Não verificado:** estado real de RLS no banco ao vivo; Security Advisor do Supabase; desempenho de consultas (`EXPLAIN`); presença de duplicidades em `official_exam_questions`; consistência das 529 migrations contra o banco em produção.

## 4. Conteúdos do edital (PC-AC, Edital nº 001/2026 SEAD/PCAC)

Baixei o PDF oficial (71 páginas) do portal `agencia.ac.gov.br` e comparei com `src/data/pcAcreVerticalizado.ts`:

- **139 vagas** no site oficial = 8 + 74 + 35 + 11 + 7 + 4 nos cargos modelados. ✔
- Itens do Anexo III: Língua Portuguesa 17, Raciocínio Lógico 15, Noções de Informática 10 — iguais aos do edital. ✔
- Verificação automática (texto do item da plataforma → procurado no Anexo III): Delegado 2 de 181 itens não localizados; Investigador 2 de 126; Papiloscopista 1 de 109; Perito Criminal 1 de 165; Auxiliar de Necropsia 1 de 90; Perito Médico-Legista 1 de 105. As poucas divergências são prováveis diferenças de quebra de linha/hifenização do PDF; **precisam de conferência manual**.
- **Limite:** a checagem foi num só sentido (plataforma → edital). Não verifiquei se há item do edital **ausente** na plataforma. Disciplinas de perícia aparecem com 1 item cada (provável agrupamento do bloco): **conferir**.
- Cobertura **de material** (não só de lista de tópicos): ver §5, item Biblioteca.

## 5. Auditoria por módulo

Legenda: **Concluída** = implementada e validada; **Parcial**; **Com defeito** = falha reproduzida; **Ausente**; **Não verificada**.

| Módulo | Situação | Evidência | Problema | Prioridade | Próxima ação |
| --- | --- | --- | --- | --- | --- |
| Homepage | **Concluída** | Produção, 4 larguras × 2 temas: sem rolagem horizontal, sem erro de página, sem imagem quebrada, `lang="pt-BR"`, meta description e OG presentes | 2 `<h1>`; sem `link rel=canonical`; carrossel de provas ultrapassa a largura em 390 px (provável rolagem interna intencional) | P3 | Unificar para 1 `<h1>`; adicionar canonical; confirmar carrossel |
| Dashboard (Área do aluno) | **Parcial** | Código usa RPCs reais (`my_subject_stats`, `my_study_hours`, resumo público); renderizado só com dados simulados | Gráficos e indicadores não vistos com dados reais | P2 | Validar com conta real em sessão acompanhada |
| Biblioteca / Material | **Parcial** | Dados reais do usuário (§6): 35 disciplinas, muitas com 1 material | Direito Processual Penal com **1** material (211 questões); Direito Penal 6; Constitucional 19; Estatística e Realidade do Acre **sem linha** em `study_materials` (existem só como trilha no código); Legislação Penal Especial 26 materiais, **1 publicado**; Legislação Específica da PF 10, **0 publicados** | P1 | Decidir destino dos materiais fora de "ativo"; produzir/importar material das disciplinas do edital |
| Edital PC-AC | **Concluída** (lista de tópicos) | Seção 4 | Conferência no outro sentido e dos itens não localizados | P2 | Conferir os 8 itens não localizados e as disciplinas de perícia |
| Cronograma personalizado | **Parcial** | `pcAcreMasterPlan.ts` (599 linhas): café, almoço, jantar, TAF (dias/horário/duração), compromissos como âncoras, revisões 24 h/1 semana/1 mês, blocos de teoria/vídeo/questões/redação/revisão/simulado; testes `cronograma*.test.mjs` aprovados | Distribuição **não validada** na interface com dados reais; sem E2E | P2 | Rodar o cronograma com perfil real e conferir distribuição por disponibilidade, datas e prioridades |
| Banco de questões | **Parcial** | 10.390 registradas / 6.785 disponíveis; teste `question-duplicates.test.mjs` existe | 3.605 questões (34,7%) não disponíveis; mais de 100 nomes de disciplina, muitos equivalentes (ex.: Direito Penal, Noções de Direito Penal, Direito Penal e Processual Penal, Legislação Penal Especial/Extravagante); disciplinas com 0 ativas (Economia 10/0; Legislação Específica do DF 7/0) | P1/P2 | Auditar motivos de bloqueio; normalizar taxonomia; verificar duplicidades no banco |
| Simulados | **Não verificada** | Código (`mock-exams.tsx`, 2.758 linhas); testes `exam-scoring`, `mock-quota` aprovados | Fluxo completo (gerar, executar, corrigir, persistir) não executado; arquivo muito grande | P2 | Teste manual acompanhado + dividir o componente |
| Study Coach | **Parcial** | Usa RPCs reais e `study_profiles`; `studyCoachSummary.ts` | Personalização não verificada com dados reais | P2 | Validar com conta real |
| Flashcards / revisões | **Parcial** | `flashcards.ts` com `ease` e `interval_days` (repetição espaçada); testes aprovados; revisão espaçada também no cronograma | Integração com o desempenho não verificada | P2 | Validar ciclo criar → revisar → reagendar |
| Redação | **Parcial** | `EssayWorkshop` grava/edita/exclui em `user_essays`; listagem de `essay_submissions`; bloqueia visitante | Avaliação automática não evidenciada; mobile não verificado | P2 | Testar salvamento e mobile com conta real |
| Área do aluno (concurso, cargo, perfil, metas) | **Parcial** | Rotas `my-contest`, `profile`, `study-plan`, `history` abrem sem erro de layout | Fluxos com dados reais não vistos | P2 | Validar atualização de perfil com sessão real (pendência antiga do roadmap) |
| Ferramentas educacionais | **Ausente** (nesses nomes) | Busca por "Study Guide", "Simplify", "Quiz Me" não encontrou recurso com esses nomes; existem Calculadora Penal, Dicionário, CTB, IA solver, Mapas jurídicos | Os recursos citados no pedido não existem como tal | P3 | Confirmar com o proprietário se são recursos desejados ou se equivalem a outros |
| Administração | **Parcial** | Edge functions exigem papel `admin`; `has_role` usado em 102 pontos das migrations; 12 rotas `admin-*` | Não exercitada (sem login admin) | P2 | Auditar com conta admin e testar permissões negativas |
| Supabase | **Parcial** | §3 | Banco ao vivo não verificado | P1 | Rodar Security Advisor e auditoria SQL de RLS (`audit-public-table-security.sql` já existe) |
| Responsividade | **Parcial** | 390/768 px em ~40 rotas, tema escuro: **0** rolagem horizontal da página | Elementos fora da tela em `/dashboard/material`, `/dashboard/media` (390 e 768), `/dashboard/question-trainer`, `/dashboard/study-plan` (390) — provavelmente rolagem interna; confirmar | P2 | Inspecionar esses quatro pontos em aparelho real |
| Acessibilidade | **Parcial** | Homepage: 0 controles sem nome acessível, 0 imagens sem `alt` | Área logada não auditada com leitor de tela; contraste foi tratado em sessões anteriores | P2 | Auditoria com axe/Lighthouse na área logada |
| Desempenho | **Parcial** | Carga da homepage de 8 a 19 s em ambiente automatizado; chunk de 521 kB | Medição não é de usuário real | P2 | Lighthouse em produção; dividir chunks |
| Qualidade técnica | **Concluída** | tsc, build, 932 testes, eslint sem erros | Sem lockfile; sem E2E; CSS muito grande e com muito `!important` | P2 | Criar lockfile e `npm audit`; plano de redução de CSS |

## 6. Problemas e evidências

### P0 — crítico
Nenhum problema crítico **reproduzido**. Ressalva: sem acesso ao banco ao vivo, não é possível descartar problemas de RLS em produção (ver P1-3).

### P1 — alto
1. **Materiais de Direito Processual Penal e Penal insuficientes para o edital.** Dados reais: Processual Penal 1 material, Penal 6, contra 211 e 223 questões. Impacto: o aluno pratica sem ter o texto de estudo. Solução: priorizar material dessas duas disciplinas (Delegado e Investigador).
2. **Materiais fora do estado "ativo" sem explicação.** Legislação Penal Especial (26 materiais, 1 publicado, 0 em revisão), Legislação Específica da PF (10, 0 publicados, 0 em revisão). Os outros 25 e 10 estão em estado diferente de `active`/`under_review` (provavelmente `obsolete`/`archived`). Impacto: conteúdo possivelmente útil fora do ar. Solução: consultar o estado real e decidir reativar ou descartar.
3. **RLS e políticas não verificados no banco ao vivo.** Arquivo: `supabase/migrations/*`. Solução: Security Advisor + `audit-public-table-security.sql`, em modo somente leitura.
4. **34,7% das questões não disponíveis** (3.605 de 10.390). Impacto: base subutilizada. Solução: listar por motivo (revisão jurídica, contexto, gabarito `X`, base legal sem URL oficial) e atacar os maiores grupos.

### P2 — médio
1. **Taxonomia de disciplinas fragmentada** (100+ nomes). Há `canonicalSubject` em `src/lib/subjects.ts`; confirmar se cobre as variações reais. Impacto: filtros e estatísticas dispersos.
2. **Sem `package-lock.json`**: impossível auditar dependências e garante builds menos reprodutíveis. Solução: gerar o lockfile.
3. **Componentes gigantes**: `mock-exams.tsx`, `question-trainer.tsx`, `student-exams.tsx`. Solução: dividir por responsabilidade, com testes.
4. **CSS acumulado**: 17.301 linhas em `styles.css`, 167 arquivos, ~4.930 `!important`; correções por camadas de alta especificidade. Impacto: regressões visuais. Solução: consolidar tokens e remover camadas mortas.
5. **Fluxos autenticados sem teste de ponta a ponta** (simulado, flashcards, redação, perfil, cronograma).
6. **Edital**: 8 itens não localizados no PDF e disciplinas de perícia com 1 item.
7. **Disciplinas com 0 questões ativas** (Economia, Legislação Específica do DF) e **Realidade do Acre com 11 questões** (mais 24 em "História e Geografia do Acre") para uma disciplina obrigatória a todos os cargos.

### P3 — baixo
1. Homepage com 2 `<h1>` e sem `canonical`.
2. 33 avisos de eslint.
3. Chunk de cliente de 521 kB.
4. `HANDOFF.md` desatualizado (caminho local e remoto obsoleto).
5. Aviso de `react-refresh/only-export-components` em 16 arquivos.

## 7. Percentual estimado de conclusão

**Critério:** 16 módulos com peso igual. Concluída = 1; Parcial = 0,5; Não verificada = 0,25; Ausente = 0.

| Situação | Módulos | Pontos |
| --- | --- | --- |
| Concluída | Homepage, Edital (lista), Qualidade técnica | 3 |
| Parcial | Dashboard, Biblioteca, Cronograma, Banco de questões, Study Coach, Flashcards, Redação, Área do aluno, Administração, Supabase, Responsividade, Acessibilidade, Desempenho | 6,5 |
| Não verificada | Simulados | 0,25 |
| Ausente | Ferramentas educacionais (nesses nomes) | 0 |

**Total: 9,75 de 16 ≈ 61%.** É uma estimativa conservadora: só marca como concluído o que tem evidência nesta auditoria. O código parece bem mais avançado do que a nota, mas a maior parte dos módulos autenticados não foi validada com dados reais.

## 8. Plano de execução por prioridade

1. **Fase 1 (verificação, sem mudar nada):** Security Advisor e auditoria SQL de RLS; consulta de estados dos materiais; motivos de bloqueio das questões; conferência manual dos 8 itens do edital.
2. **Fase 2 (P1):** produzir/importar material de Processual Penal, Penal e Legislação Penal Especial; decidir sobre os materiais arquivados; reduzir bloqueio de questões.
3. **Fase 3 (P2):** lockfile + `npm audit`; normalizar taxonomia; testes E2E mínimos (login, questão, simulado, cronograma, redação, flashcard); validar telas com conta real.
4. **Fase 4 (P2/P3):** dividir componentes grandes; consolidar CSS; SEO e acessibilidade; chunks.

Não iniciei nenhuma dessas fases. Aguardando autorização.
