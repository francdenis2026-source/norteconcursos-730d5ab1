# Central de exercícios Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evoluir `/dashboard/exercicios` para filtrar por disciplina e assunto sobre todos os exercícios da plataforma, com resposta oculta e "Ver resposta e passo a passo" sempre disponível.

**Architecture:** Uma função pura (`exerciseCenter.ts`) unifica exercícios autorais e questões do catálogo e deriva disciplinas/assuntos. Um componente de apresentação (`ExerciseCard`) mostra um exercício com revelação sob demanda. A rota só orquestra dados e filtros.

**Tech Stack:** React, TanStack Router/Query, Tailwind, `node --test` com `scripts/alias.mjs`.

**Spec:** `docs/superpowers/specs/2026-11-21-central-exercicios-design.md`

## Global Constraints
- Sem mudança de servidor, tabelas ou regras de acesso; não altera ranking nem desempenho.
- Nunca inventar passo a passo: sem `resolutionSteps`, mostrar gabarito e explicação com aviso.
- Contraste AA, sem rolagem horizontal, alvos de toque ≥ 44 px, foco visível.
- Verificação final: `npx tsc --noEmit -p .`, `npm test`, `npx vite build` (depois reverter `public/version.json`, `src/build-info.ts`, `src/routeTree.gen.ts`).

## Review Focus
- Disciplina sem nenhum exercício: estado vazio com mensagem, sem erro.
- Assunto `null`/vazio nas questões do catálogo: agrupar em "Geral", nunca sumir.
- Questão duplicada entre autoral e catálogo (mesmo `id`): aparece uma vez.
- Catálogo com milhares de itens: lista de assuntos calculada sem travar (memoizada).
- Falha ao carregar o catálogo: tela mostra erro e "Tentar novamente", os autorais continuam disponíveis.

---

### Task 1: Unificação e filtros (lógica pura)

**Files:**
- Create: `src/lib/exerciseCenter.ts`
- Test: `scripts/exercise-center.test.mjs` (adicionar também ao script `test` do `package.json`)

**Interfaces:**
- Produces:
  - `mergeExercises(authored: Question[], catalog: Question[]): Question[]` — autorais primeiro, sem `id` repetido.
  - `exerciseDisciplines(items: Question[]): { name: string; count: number }[]` — por `subject`, ordem pt-BR.
  - `exerciseTopics(items: Question[], discipline: string): { name: string; count: number }[]` — por `subtopic`, `null`/vazio vira `"Geral"`.
  - `filterExercises(items: Question[], discipline: string, topic: string): Question[]`
  - `hasStepByStep(q: Question): boolean` — `resolutionSteps?.length > 0`.

- [ ] **Step 1: Write the failing tests** — `merge keeps authored first and drops duplicate ids`; `topics groups null subtopic as "Geral"`; `disciplines counts and sorts pt-BR`; `filter by discipline and topic`; `hasStepByStep false for empty or missing steps`.
- [ ] **Step 2: Run** `node --import ./scripts/alias.mjs --test scripts/exercise-center.test.mjs` — Expected: FAIL (module not found).
- [ ] **Step 3: Implement** as pure functions in `src/lib/exerciseCenter.ts`; usar `localeCompare(…, "pt-BR")` e `Map` para contagem.
- [ ] **Step 4: Run** the same command — Expected: PASS.
- [ ] **Step 5: Commit** `git add src/lib/exerciseCenter.ts scripts/exercise-center.test.mjs package.json && git commit -m "Central de exercícios: lógica de unificação e filtros"`.

### Task 2: Cartão de exercício com revelação

**Files:**
- Create: `src/components/library/ExerciseCard.tsx`

**Interfaces:**
- Consumes: `hasStepByStep` (Task 1); `Question`, `Answer` de `@/lib/questionFormat`; `QuestionText` já usado em `MaterialPractice.tsx`.
- Produces: `ExerciseCard({ question, position, total, onPrev, onNext }: { question: Question; position: number; total: number; onPrev: () => void; onNext: () => void })`.

- [ ] **Step 1: Implement** o componente: enunciado, botões de resposta (Certo/Errado quando `kind === "true_false"`, senão alternativas), botão **"Ver resposta e passo a passo"** (`aria-expanded`) que revela gabarito, `explanation`, `resolutionSteps` (lista numerada), `studyTip` e `legalBasis`. Sem passos: texto "Esta questão não tem resolução passo a passo cadastrada." O estado de revelação reinicia quando `question.id` muda.
- [ ] **Step 2: Verify** `npx tsc --noEmit -p . && npx eslint src/components/library/ExerciseCard.tsx` — Expected: sem erros.
- [ ] **Step 3: Commit** `git commit -m "Central de exercícios: cartão com revelação sob demanda"`.

### Task 3: Rota com filtros e fontes

**Files:**
- Modify: `src/routes/dashboard/exercicios.tsx`

**Interfaces:**
- Consumes: `mergeExercises`, `exerciseDisciplines`, `exerciseTopics`, `filterExercises` (Task 1); `ExerciseCard` (Task 2); `useQuestionCatalog(userId, enabled)` → `{ catalog: Question[], loading, error, reload }`; `useDisciplineExercises` já existente (autorais) — generalizar para todas as disciplinas dos materiais.

- [ ] **Step 1: Implement** seletores Disciplina → Assunto (com contagem; assunto reinicia ao trocar disciplina), um exercício por vez com `ExerciseCard` e contador, largura inteira no padrão de folha (`w-full`, sem `max-w-3xl`). Sem disciplina escolhida, nada carrega. Erro do catálogo: mensagem + "Tentar novamente", autorais continuam.
- [ ] **Step 2: Remove** o modo "bateria de 20" e o `PracticeSession` desta rota (não há mais lote).
- [ ] **Step 3: Verify** `npx tsc --noEmit -p . && npx eslint src/routes/dashboard/exercicios.tsx && npm test` — Expected: sem erros, 0 falhas.
- [ ] **Step 4: Commit** `git commit -m "Central de exercícios: filtros de disciplina e assunto sobre todas as fontes"`.

### Task 4: Verificação visual e PR

- [ ] **Step 1:** `npx vite build`; reverter os arquivos gerados.
- [ ] **Step 2:** Abrir `/dashboard/exercicios` no navegador embutido (desktop e celular): escolher disciplina e assunto, abrir/fechar a resposta, conferir questão sem passo a passo e disciplina vazia.
- [ ] **Step 3:** `git push -u origin feat/central-exercicios` e abrir PR via `gh api repos/.../pulls`; aguardar CI verde.
