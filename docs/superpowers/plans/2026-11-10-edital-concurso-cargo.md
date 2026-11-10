# Edital concurso e cargo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fazer o Edital eletrônico seguir o fluxo concurso ativo → cargo → edição → disciplinas e assuntos.

**Architecture:** Manter a consulta de `syllabus_editions` como fonte única, derivar opções dependentes em memória e usar o `edition_id` somente depois que concurso, cargo e ano estiverem definidos. A consulta de tópicos e contagens permanece a mesma.

**Tech Stack:** React 19, TanStack Router, Supabase, componentes Radix Select/Card.

**Spec:** `docs/superpowers/specs/2026-11-10-edital-concurso-cargo-design.md`

## Global Constraints

- Consultar apenas edições com `status = active`.
- Não alterar schema, políticas ou dados do Supabase.
- Limpar seleções dependentes e tópicos ao trocar a seleção pai.

## Review Focus

- Concurso com vários cargos: cargo deve mostrar todas as opções, sem escolher a primeira linha silenciosamente.
- Cargo com vários anos: ano/edição deve ser escolhido antes dos tópicos.
- Troca de concurso após tópicos carregados: tópicos antigos não podem permanecer visíveis.
- Seleção incompleta: não deve disparar consulta de tópicos nem mostrar disciplinas de outra edição.
- Edição sem tópicos: deve preservar a mensagem de estado vazio.

### Task 1: Separar concurso, cargo e edição na rota do edital

**Files:**
- Modify: `src/routes/dashboard/edital.index.tsx`

**Interfaces:**
- Consumes: `Edition[]` retornado pela consulta atual.
- Produces: estados `selectedContest`, `selectedRole`, `selectedEdition` e derivados para renderização e carregamento de tópicos.

- [ ] **Step 1: Implementar os derivados de opções**

  Agrupar edições ativas por `contest_name`, filtrar cargos pelo concurso selecionado e filtrar anos pelo par concurso/cargo. Ordenar rótulos de forma estável e selecionar automaticamente o único cargo/ano quando houver apenas uma opção.

- [ ] **Step 2: Atualizar os seletores e resetar dependências**

  Renderizar três seletores dependentes: concurso, cargo e edição/ano. Ao mudar concurso, limpar cargo, edição e tópicos; ao mudar cargo, limpar edição e tópicos; desabilitar seletores sem opções pai. Exibir a identificação do concurso/cargo/ano selecionados antes da lista.

- [ ] **Step 3: Fazer o carregamento depender da edição exata**

  Trocar `currentEdition` para usar `selectedEdition`; manter a consulta de `syllabus_topics` e contagem de questões, mas garantir que ela só execute quando houver `edition_id` válido e que o estado de carregamento seja limpo em seleções incompletas.

- [ ] **Step 4: Verificar tipos e build**

  Run: `npm run typecheck`

  Expected: exit 0, sem erros TypeScript.

  Run: `npm run build`

  Expected: exit 0, bundle de produção gerado.

### Task 2: Validar o fluxo dependente no navegador

**Files:**
- Test: fluxo manual na rota `/dashboard/edital/`

**Interfaces:**
- Consumes: build da Task 1 e dados ativos do Supabase.
- Produces: evidência de que as opções e tópicos seguem a seleção.

- [ ] **Step 1: Abrir a rota autenticada**

  Confirmar que o seletor de concurso aparece sem cargos misturados na primeira lista.

- [ ] **Step 2: Selecionar concurso e cargo**

  Confirmar que o cargo correspondente aparece e que a edição/ano fica habilitada antes do carregamento dos assuntos.

- [ ] **Step 3: Selecionar a edição**

  Confirmar que as disciplinas e assuntos exibidos pertencem ao `edition_id` escolhido.

- [ ] **Step 4: Trocar concurso**

  Confirmar que cargo, edição e tópicos anteriores são limpos imediatamente.
