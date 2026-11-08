# Homepage compacta Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deixar a homepage mais compacta, organizada e profissional, preservando identidade, conteúdo e fluxos atuais.

**Architecture:** Ajustar os overrides de landing page em `src/styles.css`, consolidando alturas, espaçamentos e grids responsivos. Manter os componentes React e as rotas existentes; validar o resultado por build, typecheck e inspeção visual em desktop/mobile.

**Tech Stack:** React 19, TanStack Router, Tailwind CSS v4, CSS customizado, Vite.

**Spec:** `docs/superpowers/specs/2026-11-08-homepage-compacta-design.md`

## Global Constraints

- Preservar a identidade “Midnight & Brass” e os assets existentes.
- Não alterar autenticação, desafio diário, planos, conteúdo jurídico ou integrações.
- Evitar mudanças de dependências.
- Manter acessibilidade, links e responsividade.

## Review Focus

- Hero com excesso de elementos: conferir hierarquia, legibilidade e altura do primeiro viewport.
- Card de destaque da plataforma: conferir que o mock não estoura nem cria uma seção desproporcional.
- Cards menores: conferir alturas alinhadas e texto sem cortes.
- Mobile: conferir que a sequência continua navegável e sem overflow horizontal.
- Alterações CSS: conferir que overrides antigos não causam regressão em outras páginas.

### Task 1: Compactar a composição desktop da homepage

**Files:**
- Modify: `src/styles.css` nas regras de landing page desktop e overrides finais.
- Test: validação via `npm run build` e inspeção visual local.

**Interfaces:**
- Consumes: classes existentes `.lp-hero`, `.lp-section`, `.lp-rail`, `.lp-bento`, `.lp-tile`, `.lp-footer`.
- Produces: uma homepage desktop com alturas e espaçamentos reduzidos, mantendo o mesmo markup.

- [ ] **Step 1: Ajustar o hero e as seções**

Reduzir `min-height`, padding vertical e margens de título/lead/CTAs no desktop; limitar a densidade do painel lateral sem remover os componentes.

- [ ] **Step 2: Ajustar rail, método, carreiras, confiança e rodapé**

Aplicar espaçamentos menores e alturas previsíveis nos blocos, mantendo os contrastes e estados de foco.

- [ ] **Step 3: Compactar o bento da plataforma**

Manter o card principal em duas colunas, reduzir sua altura máxima e alinhar os cards menores com `grid-auto-rows` e padding uniformes.

- [ ] **Step 4: Rodar build**

Run: `npm run build`
Expected: build concluído sem erros.

### Task 2: Melhorar a densidade e a leitura mobile

**Files:**
- Modify: `src/styles.css` nas regras `@media (max-width: 767px)` da homepage.
- Test: validação via `npm run typecheck` e inspeção em viewport mobile.

**Interfaces:**
- Consumes: `.lp-hero`, `.mh`, `.lp-footer`, `.lp-hero__ctas` e o conteúdo existente.
- Produces: mobile compacto, legível e navegável, sem overflow lateral.

- [ ] **Step 1: Simplificar a densidade do hero**

Reduzir padding, tamanho de chip/título e espaçamento de CTAs; manter CTA primário e secundário acessíveis.

- [ ] **Step 2: Ajustar hub móvel e rodapé**

Reduzir gaps e paddings sem ocultar caminhos essenciais; manter navegação, desafio diário e cadastro.

- [ ] **Step 3: Rodar typecheck**

Run: `npm run typecheck`
Expected: TypeScript sem erros.

### Task 3: Verificação final e revisão de regressões

**Files:**
- Verify: `src/routes/index.tsx`, `src/styles.css`.

- [ ] **Step 1: Conferir diff**

Run: `git diff --check && git diff --stat`
Expected: nenhum whitespace error; apenas arquivos da homepage e documentação planejada.

- [ ] **Step 2: Rodar build e typecheck finais**

Run: `npm run build && npm run typecheck`
Expected: ambos concluídos com sucesso.

- [ ] **Step 3: Inspecionar desktop e mobile**

Conferir hero, bento, planos, CTA final, rodapé e ausência de overflow em ambas as larguras.
