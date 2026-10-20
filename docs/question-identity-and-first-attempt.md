# Identidade de questões, primeira tentativa e histórico de provas

Resumo técnico da entrega de 2026-10-20. Estado de cada parte está marcado como **no código** ou
**depende da migração** `20261020120000_first_attempt_identity_and_attempt_history.sql`
(criada no repositório; aplicar no Supabase é um passo separado).

## Código permanente da questão (no código, sem migração)

- `src/lib/questionIdentity.ts`: o código é `<prefixo da tabela>-<12 primeiros caracteres do UUID>`,
  por exemplo `BD-1A2B-3C4D-5E6F`. Prefixos: `OF` official_exam_questions, `BD` board_exam_questions,
  `CU` curated_question_catalog, `PE` question_bank (caderno pessoal).
- A identidade real é `(tabela física, id)` (`questionRef`). `source` = official cobre duas tabelas,
  então nunca basta o `id`. O mesmo cálculo existe no banco em `public.question_public_code()`.
- Nada é gravado nas questões: o código nasce da identidade existente, não muda com filtro, ordem,
  atualização ou nova sessão. Aparece no treinador, simulado, caderno de erros, Estudar depois e
  no painel de denúncias; `QuestionCode` copia com um toque. A denúncia guarda o código no
  `question_snapshot` e a tabela física em `question_table` (já existia).
- A busca do treinador/acervo (`catalogQuery`) aceita o código completo e encontra exatamente a questão.

## Itens repetidos na mesma prova (no código)

`scripts/review/build-pcpr-papiloscopista-restoration.mjs` documenta 64 itens da PC-PR 2026 comuns a
Agente e Papiloscopista, cada um com uma linha por cargo e conteúdo idêntico. Sem filtro de cargo o
treinador listava as duas. `src/lib/questionDuplicates.ts` une apenas linhas que concordam em
concurso + ano + banca + gabarito + texto completo (apoio, enunciado e alternativas). Textos de apoio
compartilhados entre itens diferentes não unem nada. A união vale no treinador (depois dos filtros,
para o cargo escolhido continuar com a sua linha), na montagem livre do simulador e na lista de
"já respondida". Provas oficiais completas do simulador mantêm todos os itens do caderno.

`scripts/db/audit-shared-exam-items.sql` (somente leitura) lista no banco os grupos duplicados.

## Primeira tentativa e ranking (depende da migração)

`score_events()` já contava só a 1ª resposta de cada questão, somando treinador e simulados. A migração:

1. faz **qualquer** primeira tentativa consumir a questão. Antes, uma resposta de treinador com menos de
   4 s era descartada e uma repetição posterior passava a valer como inédita; o mesmo valia para
   simulados com duração curta demais. Errar primeiro e repetir até acertar não rende ponto;
2. trata cadastros idênticos da mesma prova como uma questão (`question_canonical_map()`), e aceita
   aliases explícitos entre tabelas em `question_identity_aliases` (somente administrador);
3. expõe `my_answered_questions()` e `simulator_attempt_ranking()` para o aviso "você já respondeu"
   e para separar a pontuação elegível de cada tentativa.

Nada é apagado nem recalculado em massa: os pontos continuam derivados na leitura. Pontos de quem
repetiu uma questão que já tinha consumido com resposta rápida podem diminuir (efeito desejado).
Teste da lógica contra PostgreSQL descartável: `scripts/db/first-attempt/README.md`.

Sem a migração aplicada, o app continua funcionando: o aviso de repetição usa as respostas lidas pelo
cliente (`useLockedAnswers` agora inclui `simulator_responses`) e a pontuação do servidor segue a regra
anterior.

## Nota, aproveitamento e ranking

Três medidas distintas (`src/lib/examScoring.ts`, `src/lib/attemptDetails.ts`):

- **Nota da prova**: regra da edição. Desconto "um erro anula um acerto" só quando
  `contest_reference_info.scoring_rule` da edição (concurso/cargo + ano + banca) diz "Nota líquida
  (corretas - erradas ...)". Qualquer outra situação (montagem livre, edição sem registro,
  registros divergentes) usa pontuação simples, e a tela diz isso. Em branco vale 0 em ambas.
- **Aproveitamento**: acertos / total e acertos / respondidas.
- **Ranking**: `simulator_attempt_ranking()`; repetidas não somam.

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
