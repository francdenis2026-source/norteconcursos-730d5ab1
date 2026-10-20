# Identidade de questões, primeira tentativa e histórico de provas

Resumo técnico da entrega de 2026-10-20. Estado de cada parte está marcado como **no código** ou
**depende da migração** `20261020120000_first_attempt_identity_and_attempt_history.sql`
(criada no repositório; aplicar no Supabase é um passo separado).

## Código permanente da questão (no código, sem migração)

- `src/lib/questionIdentity.ts`: o código é `NC-<prefixo da tabela>-<UUID completo>`,
  por exemplo `NC-BA-<uuid>`. Prefixos: `OF` official_exam_questions, `BA` board_exam_questions,
  `AU` curated_question_catalog, `PE` question_bank (caderno pessoal).
- A identidade real é `(tabela física, id)` (`questionRef`). `source` = official cobre duas tabelas,
  então nunca basta o `id`. O mesmo cálculo existe no banco em `public.question_public_code()`.
- Nada é gravado nas questões: o código nasce da identidade existente, não muda com filtro, ordem,
  atualização ou nova sessão. Aparece no treinador, simulado, caderno de erros, Estudar depois e
  no painel de denúncias; `QuestionCode` copia com um toque. A denúncia guarda o código no
  `question_snapshot` e a tabela física em `question_table` (já existia).
- A busca do treinador/acervo (`catalogQuery`) aceita o código completo (`NC-…`) e encontra exatamente a questão.

## Itens repetidos na mesma prova (no código)

`scripts/review/build-pcpr-papiloscopista-restoration.mjs` documenta 64 itens da PC-PR 2026 comuns a
Agente e Papiloscopista, cada um com uma linha por cargo e conteúdo idêntico. Sem filtro de cargo o
treinador listava as duas. `src/lib/questionDuplicates.ts` une apenas linhas que concordam em
concurso + ano + banca + gabarito + texto completo (apoio, enunciado e alternativas). Textos de apoio
compartilhados entre itens diferentes não unem nada. A união vale no treinador (depois dos filtros,
para o cargo escolhido continuar com a sua linha), na montagem livre do simulador e na lista de
"já respondida". Provas oficiais completas do simulador mantêm todos os itens do caderno.

`scripts/db/audit-shared-exam-items.sql` (somente leitura) lista no banco os grupos duplicados.

## Primeira tentativa e ranking

A reserva da primeira resposta no banco vem de `20261020120000_cross_mode_question_identity.sql`
(ver `docs/releases/2026-10-20-cross-mode-history.md`): tabela `question_first_answers` com chave única
`(user_id, tabela, questão)`, gravada por gatilho na mesma transação; qualquer primeira tentativa, certa,
errada ou rápida, consome a questão, e repetições ficam com `ranking_first = false`.

Esta entrega acrescenta, em `20261020130000_attempt_results_and_study_later.sql`, só o que aquela não tem:
`question_public_code()` (mesmo código NC-…), `simulator_attempt_results` e `study_later_items`.

Limite conhecido: a reserva é por `(tabela, id)`. Dois cadastros idênticos da mesma prova (ex.: Agente e
Papiloscopista da PC-PR 2026) são ids diferentes e, no ranking, ainda contam como duas questões.
Na interface eles já são unidos (próxima seção). Unir também no ranking exige o gatilho de reserva
resolver o id canônico; não foi feito sem poder auditar os pares no banco real
(`scripts/db/audit-shared-exam-items.sql`).

**Estado em 2026-10-20:** as duas migrações (`20261020120000_cross_mode_question_identity.sql` e
`20261020130000_attempt_results_and_study_later.sql`) foram aplicadas no Supabase pelo responsável
do projeto. Conferido por consulta ao catálogo: as tabelas `question_first_answers`,
`simulator_attempt_results` e `study_later_items` e as funções `get_question_first_answers()`,
`get_simulator_ranking_result(uuid)` e `question_public_code(text,uuid)` existem; 224 respostas
já estão reservadas e `score_events()` responde (10 participantes). Isso confirma a existência dos objetos,
não um teste de ponta a ponta com duas sessões reais; a implantação do app é conferida à parte.

Antes de aplicar, o app funcionava assim: `useLockedAnswers` usa a leitura compatível das duas
modalidades e a pontuação do servidor segue a regra anterior.

## Nota, aproveitamento e ranking

Três medidas distintas (`src/lib/examScoring.ts`, `src/lib/attemptDetails.ts`):

- **Nota da prova**: regra da edição. Desconto "um erro anula um acerto" só quando
  `contest_reference_info.scoring_rule` da edição (concurso/cargo + ano + banca) diz "Nota líquida
  (corretas - erradas ...)". Qualquer outra situação (montagem livre, edição sem registro,
  registros divergentes) usa pontuação simples, e a tela diz isso. Em branco vale 0 em ambas.
- **Aproveitamento**: acertos / total e acertos / respondidas.
- **Ranking**: `get_simulator_ranking_result()`; repetidas não somam.

`simulator_attempt_results` (migração) guarda regra, nota e puladas por tentativa; sem ela a tela
recalcula a nota simples a partir de `simulator_attempts` e avisa que não há regra registrada.

## Pular e revisar

- Simulado: "Pular questão" e "Limpar resposta" deixam a questão em branco (nunca erro, nunca
  alternativa). O rascunho (`localStorage`, por conta) guarda `skipped` e a regra e sobrevive à
  atualização da página; o resumo de entrega lista as questões em branco e volta a cada uma.
- Treinador: "Pular questão" tem contagem própria, não responde, não pontua e fica em
  Estudar depois (`reason = skipped`). O mapa e o resultado oferecem voltar às puladas.
- Estudar depois usa a identidade por tabela (itens antigos `origem:id` continuam reconhecidos) e
  sincroniza com `study_later_items` (migração). Sem a tabela, continua só no navegador e a tela avisa.
  Assunto sugerido automaticamente é rotulado como sugestão; só assunto do cadastro ou editado pelo
  aluno é tratado como confirmado.

## Texto de questões

`questionTextLayout()` classifica o trecho (corrido, curto, poema, tabela/código/fórmula) e
`QuestionProse` aplica o estilo `.q-text`: justificado com hifenização de tablet para cima, à esquerda
no celular, poemas e tabelas preservados. Alternativas ficam sempre à esquerda.
