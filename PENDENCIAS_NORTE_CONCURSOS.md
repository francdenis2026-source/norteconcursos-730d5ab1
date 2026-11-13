# Pendências — Norte Concursos (13/11/2026)

Baseado em `AUDITORIA_COMPLETA_NORTE_CONCURSOS.md`. Nada abaixo foi implementado; é a lista do que falta.

## P0 — Crítico
- [ ] Nenhum problema crítico reproduzido. Confirmar no banco ao vivo que não há falha de RLS (ver P1-3) antes de afirmar isso.

## P1 — Alto
- [ ] **P1-1 Material de Direito Processual Penal** (hoje 1 material para 211 questões) e **Direito Penal** (6 para 223). Prioridade para Delegado e Investigador. *Arquivos:* `study_materials` (banco), `src/data/pcAcCoreStudyCourses.ts`.
- [ ] **P1-2 Materiais fora do ar sem explicação:** Legislação Penal Especial (25 de 26 não ativos) e Legislação Específica da PF (10 de 10 não ativos). Consultar o `content_status` real e decidir reativar, revisar ou descartar.
- [ ] **P1-3 Verificar RLS e permissões no banco ao vivo** (somente leitura): Security Advisor do Supabase + `scripts/audit-public-table-security.sql` (já existe).
- [ ] **P1-4 Questões não disponíveis (3.605 de 10.390):** levantar o motivo (revisão jurídica, contexto, gabarito `X`, base legal sem fonte oficial) e tratar os maiores grupos.

## P2 — Médio
- [ ] **P2-1 Taxonomia de disciplinas:** 100+ nomes de disciplina em questões; conferir `canonicalSubject` (`src/lib/subjects.ts`) contra a lista real e normalizar.
- [ ] **P2-2 Gerar `package-lock.json`** e rodar `npm audit` (hoje impossível: ENOLOCK).
- [ ] **P2-3 Testes de ponta a ponta mínimos:** login, resolver questão, simulado completo, cronograma, redação, flashcard, atualização de perfil.
- [ ] **P2-4 Validar com conta real** (acompanhado): Dashboard, Study Coach, Cronograma, Flashcards, Redação, Área do aluno, Administração.
- [ ] **P2-5 Dividir componentes grandes:** `mock-exams.tsx` (2.758 linhas), `question-trainer.tsx` (2.255), `student-exams.tsx` (1.480), `calculadora-penal.tsx` (1.375).
- [ ] **P2-6 CSS:** `src/styles.css` com 17.301 linhas, 167 arquivos de estilo, ~4.930 `!important`. Consolidar tokens e remover camadas mortas, com captura visual antes/depois.
- [x] **P2-7 Edital PC-AC — conferido (13/11/2026):** os 8 itens "não localizados" existem no PDF; o texto foi apenas quebrado por página ou linha (ex.: "Peritos e intérpretes (arts. 275 a 281 do CPP)", "Atribuições do delegado (Lei 12.830/2013)", "Crimes contra o SFN (Lei 7.492/1986)", "Gestão documental"). Não há item ausente nessa comparação. Pendente: a checagem no sentido edital → plataforma, não feita.
- [ ] **P2-8 Questões de disciplinas obrigatórias:** Realidade do Acre tem 11 questões (mais 24 em "História e Geografia do Acre"); Economia e Legislação Específica do DF têm 0 ativas.
- [ ] **P2-9 Responsividade:** inspecionar em aparelho real `/dashboard/material`, `/dashboard/media`, `/dashboard/question-trainer` e `/dashboard/study-plan` (elementos além da largura em 390/768 px).
- [ ] **P2-10 Acessibilidade na área logada** (axe/Lighthouse, teclado, leitor de tela).
- [ ] **P2-11 Desempenho:** Lighthouse em produção; dividir chunks > 500 kB.
- [ ] **P2-12 Administração:** auditar com conta admin e testar permissões negativas (aluno não acessa `admin-*`).

## P3 — Baixo
- [ ] Homepage: unificar para 1 `<h1>`; adicionar `link rel="canonical"`.
- [ ] Zerar os 33 avisos do eslint (16 `exhaustive-deps`, 16 `only-export-components`).
- [ ] Atualizar `HANDOFF.md` (caminho local, remoto obsoleto `platforma`, Lovable).
- [ ] Decidir sobre "Study Guide", "Simplify", "Compare", "Quiz Me": não existem com esses nomes; confirmar se são desejados.
- [ ] Mapas jurídicos para Direito Administrativo e demais disciplinas (mesmo molde de `src/data/legalMaps.ts`).
- [ ] Revisão jurídica humana dos mapas e das aulas autorais (Estatuto do Desarmamento está com fonte secundária).
- [ ] Cadastrar vídeos de Raciocínio Lógico, Contabilidade e Arquivologia (agora liberado o YouTube).

## Pendências antigas do `roadmap.md` ainda abertas
- [ ] Validar a atualização do perfil com uma sessão real do banco.
- [ ] Teste ponta a ponta do Treinador com uma conta real.

## Segurança operacional
- [ ] A senha de uma conta foi colada no chat durante esta sessão. **Trocar a senha** dessa conta.
