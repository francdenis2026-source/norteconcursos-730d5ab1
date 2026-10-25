# Apostila CESPE: extração complementar de 17/10/2026

A segunda leitura das 510 páginas recuperou 64 candidatos ausentes da primeira
extração. Os 64 foram inseridos exclusivamente em `question_corpus_candidates`,
com status `under_review`, e conferidos por leitura posterior do payload completo.
Nenhum registro anterior foi alterado e nenhuma questão foi publicada.

O perfil de leitura distingue colunas de faixas que ocupam a largura da página,
separa questões numeradas que compartilham tabelas e preserva a identidade física
dos cabeçalhos da primeira extração. Cabeçalhos ausentes não recebem atribuição
de prova presumida. Comentários e gabaritos editoriais são dados não certificados.

## Comparação e resultado

Foram comparados 12.852 registros atuais: 4.888 de `official_exam_questions`,
1.054 de `board_exam_questions`, 1.992 de `curated_question_catalog` e 4.918 de
`question_corpus_candidates`. Não houve coincidências exatas de texto normalizado
para os 64 candidatos. A comparação não certifica identidade semântica nem resolve
diferenças de tabelas, imagens, instruções ou versões do enunciado.

O lote contém 24 candidatos de contabilidade, 20 de política internacional,
8 de português, 6 de inglês, 3 de economia e um de cada: história do Brasil,
história mundial e direito processual civil.

Após a inserção, esta fonte tem 2.986 registros `under_review`, 269 `reviewed`
retidos sem aprovação de publicação e 1 `duplicate`: 3.256 registros privados.
Os 41 obsoletos anteriormente excluídos não foram reinseridos. Registros não
equivalem necessariamente a questões únicas e completas.

## Pendências preservadas

- 8 diferenças de texto entre as duas leituras, sem sobrescrever registros.
- 52 ocorrências de gabarito para conferência: incluem respostas antes ausentes
  e alegações editoriais de anulação; não representam 52 erros confirmados.
- 6 registros antigos não reidentificados: quatro grupos com tabelas agora
  separados em itens e dois fragmentos de comentário. Foram preservados para
  triagem, portanto ainda pode haver sobreposição entre grupos e itens novos.
- Conferência visual individual, auditoria de gabaritos oficiais e de normas
  vigentes, comparação semântica, vínculo ao edital e comentários e exemplos
  autorais continuam obrigatórios antes de qualquer publicação.

O título “7.000 questões” não foi confirmado pela extração. A cobertura de
segmentação não está certificada como completa. Esta entrega é extração e
armazenamento privado para auditoria, sem nova aprovação normativa.

## Reprodução e validação

`scripts/review/extract-cespe2016-supplement.py` exige o SHA-256 do PDF inspecionado
e recebe PDF, JSON original e diretório externo de saída. Textos integrais e
snapshots ficam fora do Git. O manifesto JSON ao lado registra IDs, páginas,
diagnósticos e resultado da importação, sem credenciais.

`scripts/review/stage-cespe2016-supplement.py PACK REPORT` compara com os quatro
catálogos via paginação por ID. `--apply` habilita a inserção privada, limitada
a 100 candidatos por execução, sem atualizar conflitos existentes. A credencial
é solicitada sem eco e permanece em memória. O importador impede a reinserção dos
IDs dos dois manifestos de remoção de obsoletos e confere os dados após gravar.

Validação: 13 testes passaram para leitura, segmentação, normalização, proteção
de revisões, limites de lote e paginação; teste integrado sobre o PDF e conferência
real dos 64 registros inseridos. Nenhuma tabela pública de questões foi escrita.
