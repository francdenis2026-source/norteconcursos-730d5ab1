# Área de materiais orientada ao PC-AC 2026 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (recommended) to implement this plan task-by-task.

**Goal:** Reorganizar `/dashboard/material` para destacar o PC-AC 2026, mantendo o catálogo geral de materiais.

**Architecture:** Criar um resumo visual do objetivo PC-AC usando os dados já existentes do edital verticalizado e do plano de estudos. Inserir esse resumo no topo do hub, com links para edital, cronograma e disciplinas; preservar as seções atuais abaixo.

**Tech Stack:** React, TanStack Router, TypeScript, Tailwind/CSS existente, dados locais do projeto.

**Spec:** `docs/superpowers/specs/2026-11-10-material-hub-pcac-design.md`

## Global Constraints

- Não alterar o conteúdo oficial do edital.
- Não remover materiais de outros concursos.
- Não inventar disciplinas, pesos ou tópicos.
- Manter a rota completa do edital PC-AC.
- Preservar responsividade em celular e desktop.

## Review Focus

- Usuário sem login: o hub continua exibindo o estado bloqueado existente.
- Dados do edital sem material correspondente: o destaque deve apontar para o edital, sem inventar disponibilidade.
- Progresso local ausente ou parcial: o resumo deve exibir estado neutro e continuar navegável.
- Usuário estudando outro concurso: o catálogo geral continua acessível e visualmente separado.
- Tela estreita: ações do PC-AC não podem causar rolagem horizontal.

### Task 1: Dados e resumo do PC-AC

**Files:**
- Modify: `src/routes/dashboard/material.tsx`
- Reference: `src/routes/dashboard/pc-acre-edital.tsx`, `src/lib/pcAcreMasterPlan.ts`

- [ ] **Step 1:** Importar somente os dados públicos já existentes necessários para identificar o cargo padrão, disciplinas e data do exame.
- [ ] **Step 2:** Criar o resumo derivado no componente do hub, calculando disciplinas do cargo com conteúdo disponível e evitando números inventados.
- [ ] **Step 3:** Verificar com `git diff --check` e revisão manual dos casos sem dados.
- [ ] **Step 4:** Commitar a unidade de dados e resumo.

### Task 2: Bloco visual PC-AC 2026

**Files:**
- Modify: `src/routes/dashboard/material.tsx`
- Modify: `src/styles/student-library-media-workspaces.css` (se necessário)

- [ ] **Step 1:** Adicionar bloco de destaque após o hero, com título PC-AC 2026, cargo, data, progresso neutro/real e três ações: edital, cronograma e materiais por disciplina.
- [ ] **Step 2:** Aplicar hierarquia visual consistente com os cartões existentes, estados claro/escuro e layout responsivo.
- [ ] **Step 3:** Garantir que o catálogo geral comece depois de uma separação clara.
- [ ] **Step 4:** Rodar `git diff --check` e revisar JSX/links.
- [ ] **Step 5:** Commitar o bloco visual.

### Task 3: Verificação final

**Files:**
- No new files.

- [ ] **Step 1:** Executar o verificador disponível no projeto (`bun run build` se Bun estiver disponível; caso contrário registrar o bloqueio).
- [ ] **Step 2:** Confirmar que nenhuma rota de leis, disciplinas, vídeos, edital ou questões foi removida.
- [ ] **Step 3:** Revisar o diff final e publicar na `main` após a validação.
