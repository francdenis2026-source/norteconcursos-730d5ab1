# Diferenciar cargos no showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tornar o cargo a identidade principal dos cartões de concurso, evitando que oportunidades do mesmo órgão pareçam duplicadas.

**Architecture:** Extrair uma pequena função de apresentação para compor o rótulo do concurso e o título do cargo. O componente continuará recebendo `Contest` e chamando `onSelect` com o mesmo objeto; apenas a hierarquia visual e os metadados serão ajustados.

**Tech Stack:** React, TypeScript, lucide-react e CSS escopado do showcase.

**Spec:** `docs/superpowers/specs/2026-11-10-diferenciar-cargos-showcase-design.md`

## Global Constraints

- Não alterar `Contest`, `MockService` ou o vínculo por `contest.id`.
- Preservar ações, links oficiais, imagens e fatos existentes.
- O cargo deve permanecer legível em cards pequenos e no destaque.

## Review Focus

- Dois cargos do mesmo concurso: títulos devem ser visualmente distintos.
- Cargo ausente: usar nome do concurso como fallback sem quebrar o layout.
- Concurso com órgão e nome diferentes: mostrar contexto sem duplicar texto desnecessário.
- Card em destaque e cards secundários: usar a mesma hierarquia cargo-primeiro.
- Textos longos: truncar/encolher apenas visualmente, mantendo acessibilidade.

### Task 1: Identidade cargo-primeiro e apresentação visual

**Files:**
- Create: `src/lib/contestDisplay.ts`
- Create: `scripts/contest-display.test.mjs`
- Modify: `src/components/dashboard/ContestObjectivesShowcase.tsx`
- Modify: `src/styles/contest-objectives-showcase.css`

**Interfaces:**
- Consumes: `Contest`.
- Produces: `contestDisplay(contest)` com `context`, `role`, `career` e `education` para o componente.

- [ ] **Step 1: Escrever teste para a identidade cargo-primeiro**

  Cobrir dois cargos do mesmo órgão, cargo ausente e escolaridade/carreira.

- [ ] **Step 2: Rodar o teste e observar a falha**

  Run: `node --import ./scripts/alias.mjs --test scripts/contest-display.test.mjs`

  Expected: falha por módulo ainda inexistente.

- [ ] **Step 3: Implementar `contestDisplay` e integrar o componente**

  Usar o cargo como `h2`/`h3`, adicionar uma etiqueta de contexto com concurso e agência, e mostrar carreira/escolaridade como metadados compactos. Preservar `onSelect(contest)` e todos os links atuais.

- [ ] **Step 4: Ajustar estilos responsivos**

  Dar contraste e altura estável ao cargo, diferenciar a etiqueta de contexto e garantir quebra de textos longos em destaque e cards.

- [ ] **Step 5: Rodar verificações**

  Run: `node --import ./scripts/alias.mjs --test scripts/contest-display.test.mjs`

  Expected: PASS.

  Run: `npm run typecheck`

  Expected: exit 0.

  Run: `npx eslint src/components/dashboard/ContestObjectivesShowcase.tsx src/lib/contestDisplay.ts scripts/contest-display.test.mjs`

  Expected: exit 0.
