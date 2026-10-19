# Evidência alternativa e correção efetiva — Direito Administrativo

Em 19/10/2026 houve uma correção no Supabase: cadastro de um tópico específico de controle externo/LRF do edital da PC-RJ e associação dele ao vínculo atual da questão 48 de Delegado. Não houve liberação jurídica da questão nem alteração de enunciado, gabarito, fonte, tópico histórico original ou data de conferência legal.

## Evidência oficial recuperada

Foi utilizada a cópia oficial do edital de abertura da PC-RJ Delegado, capturada em 18/10/2026, preservada em outputs. Seu SHA-256 é `2a850b854502276947bab5b712b51e9aaa72804bfee12b6540a7f5019fb8a2d8`, igual ao da fonte já cadastrada. A página PDF 73 foi extraída e conferida visualmente. No Ponto 5 de Direito Administrativo, constam gestão financeira, controle externo, Tribunais de Contas e responsabilidade fiscal.

O tópico genérico `under_review` foi preservado como origem histórica. O tópico atual de Administração já existente, ordem 20, tem texto parcial que termina no Ponto 3 e não registra esse recorte financeiro. Por isso foi acrescentado o tópico específico de ordem 22, sem substituir os tópicos existentes ou declarar todo o edital revisado.

## Gravação e proteção

- Tópico criado: `d46e9663-f7aa-5ccb-a571-894b924f919e`.
- Questão vinculada: `76a0df58-50ad-465e-af73-12763e76347f`, questão 48.
- Na questão mudaram somente `current_syllabus_topic_id` e uma nota acrescentada ao histórico de revisão.
- O status continua `under_review`, resposta A, sem certificação da norma estadual sobre requisições ao TCE-RJ.
- Não foram alterados ou convertidos os editais ou fontes dos demais concursos.

O reparador valida o PDF/hash, a referência específica do tópico e a fonte oficial de tipo edital; compara integralmente tópico, edição, fonte e questão antes da gravação; não aceita alterações de status, resposta, fonte original ou datas jurídicas; usa comparação integral na escrita e leitura independente após gravar. A criação do tópico reutiliza `register-verified-syllabus-topics.mjs`.

Os 22 testes direcionados passaram, incluindo concorrência, histórico preservado, arquivo divergente, fonte inadequada, disciplina incorreta, dry-run e repetição segura. Os dry-runs e a leitura real após gravação também passaram. Não houve mudança de aplicação, portanto não foi necessário novo build.

## Limites e contagem

As alternativas online Câmara, Senado, LexML, FGV, TCE-TO e Alerj retornaram 403, inclusive após repetição com escalonamento. O diagnóstico autorizado por conexão direta também falhou por DNS. Não se apresentou essas tentativas como consultas bem-sucedidas.

O bloqueio de vínculo da questão 48 foi resolvido; continuam 67 sem tópico e seis sem edital oficial adequado. A **pendência jurídica das 74 questões continua**, incluindo a norma estadual da questão 48. **Zero questões foram liberadas.** A última contagem geral segue em 398 `under_review`; os status não mudaram nesta execução.

[Relatório da gravação, fonte, hash, contagem e acessos tentados](admin-alternative-evidence-repair-2026-10-19.json). PDFs, imagem da página, pacotes e snapshots integrais ficam em outputs ignorados.
