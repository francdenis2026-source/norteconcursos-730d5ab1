# Revisão integral IDECAN — trabalho interrompido a pedido do usuário

## Estado real ao interromper

A leitura administrativa do banco confirmou 273 registros IDECAN em `board_exam_questions`, todos ativos, sem explicação e sem tópico de edital. Foram lidas também as 200 posições privadas da PC-CE; nenhum registro IDECAN foi encontrado em `curated_question_catalog` ou `official_exam_questions` nessa leitura. Isso confirma 473 posições nesses acervos, sem transformar variantes de prova em concursos independentes.

**Nenhuma alteração foi aplicada ao banco nesta etapa.** A revisão integral, a certificação das explicações e a liberação ainda não foram concluídas. O usuário pediu para parar e enviar o trabalho à main antes do fim dos créditos.

## Material salvo

- `explicacoes-matematica-rascunho.json`: 38 resoluções individuais, com solução, erro comum e exemplo prático.
- `explicacoes-informatica-rascunho.json`: 43 comentários individuais, com ressalvas técnicas e problemas editoriais. Rascunhos não autorizam publicação.
- `cotejo-pdf-legado.json`: cotejo textual automatizado de cada um dos 273 itens com os quatro PDFs baixados. Resultado literal não certifica contexto, imagens, destaques nem vigência. Diferenças também podem ser artefatos do extrator; não são automaticamente erros da questão.
- `fontes-coletadas.json`: URLs, tamanhos e hashes dos cadernos e documentos de gabarito consultados. A página de concurso de Escrivão está registrada como HTML, não como PDF; o gabarito definitivo separado também foi coletado.
- `fontes-primarias-coletadas.json`: coleta de fontes primárias, inclusive o edital PF 2025 e textos do Planalto. HTTP 200 ou hash de arquivo não certifica revisão integral dos artigos: cada questão jurídica ainda exige análise individual. Planalto voltou a responder nesta sessão.
- `pareceres-matematica.json`: proposta de refinamento de 38 itens; 37 propostos como aptos no escopo não jurídico analisado, um retido por ambiguidade entre 7,5 jornadas e conclusão no oitavo dia. `remote_applied=false` permanece válido. A vinculação proposta ao edital PF 2025 não certifica o futuro edital PC-AC.
- `exportar-acervo.sql`: consulta somente de leitura para exportação administrativa de conteúdo educacional; não inclui contas ou respostas de alunos.

Problemas confirmados visualmente/textualmente: PMSC Tipo A itens 20, 21 e 22 têm alternativas ou trecho do enunciado contaminados na importação local; o item 22 recebeu alternativas da questão 19. PC-SC Agente Tipo B item 90 perdeu raízes, fração e potência, recuperadas na página 21. PC-SC Escrivão Tipo A item 94 teve raízes conferidas visualmente na página 21. Não modificar o gabarito histórico para encobrir erros de extração.

## Continuação

1. Fazer nova leitura administrativa antes de escrever: os snapshots desta sessão ficaram somente em `/tmp/idecan-full-review/live`, fora do Git, e podem não existir em outra sessão.
2. Revisar as 81 explicações como material editorial, concluir as demais questões e resolver integralmente texto, imagens, destaques, versão de software e ambiguidade de gabarito.
3. Conferir cada questão jurídica nos artigos vigentes do Planalto e, quando necessário, nos tribunais. Não promover os antigos metadados `sem_alteracao_localizada` a uma certificação.
4. Confirmar o tópico real de edital, sem confundir pertinência temática com previsão PC-AC. Não ativar anuladas ou conteúdo superado.
5. Só então aplicar alterações com comparação do estado anterior e leitura de confirmação. O gerador `scripts/idecan/prepare-pedagogical-batch.py` produz somente uma proposta local de matemática e filtros completos de concorrência; não faz chamadas de rede e não é um aplicador de liberação integral.

Os filtros PostgREST do gerador foram conferidos por uma consulta somente de leitura. Os testes verificam cálculos, lógica do culpado, separação dos rascunhos e retenção da questão ambígua; não substituem a revisão pedagógica de todos os itens.

Credenciais não foram adicionadas ao repositório. A sessão administrativa que as mantinha em memória foi encerrada ao interromper o trabalho.

## SQL de publicação solicitado na continuação

[aplicar-explicacoes-matematica.sql](aplicar-explicacoes-matematica.sql) está pronto para execução integral no SQL Editor como `postgres`. Tem cerca de 26 KB: aplica explicação, erro comum, exemplo e vínculo ao tópico para 37 questões de matemática já ativas; mantém uma questão ambígua em `under_review` e restaura o enunciado matemático incompleto do item 90 de Agente PC-SC. Não publica os 43 rascunhos de informática nem libera PC-CE ou legislação. Nenhum gabarito é alterado.

A consulta administrativa refeita antes da geração encontrou 273 questões, sendo 129 ativas e 144 em revisão; 144 já tinham explicação, e nenhuma tinha tópico. Essas mudanças posteriores à primeira leitura foram preservadas: o SQL se limita aos 38 IDs do parecer de matemática, que ainda correspondiam aos originais conferidos. Não reproduza a contagem histórica acima como estado atual.

O lote compara SHA-256 do registro completo (exceto datas de criação/verificação), valida tópico/edição/fonte no banco, bloqueia o registro durante a atualização e grava antes/depois em tabela privada de auditoria. Qualquer divergência reverte toda a transação. Reexecutar o mesmo lote não duplica a auditoria; alterações posteriores ao lote são protegidas.

**Geração e testes concluídos localmente; SQL ainda não aplicado remotamente por este assistente.** Ao executar, o resultado do lote deve mostrar `active=37`, `under_review=1`, ambos com explicação. As demais questões não são alteradas.

Reprodução com snapshots administrativos privados fora do Git:

```sh
node scripts/idecan/build-math-publication-sql.mjs DIRETORIO_PRIVADO CAMINHO_PGLITE
node scripts/idecan/test-math-publication-sql.mjs CAMINHO_PGLITE DIRETORIO_PRIVADO
```
