# PC-AC 2017 — retomada, textos recuperados e primeiro lote editorial

Ponto de conferência: 15/10/2026, 22:46 de Brasília (16/10, 01:46 UTC). Continua o trabalho encerrado no commit `97a2813`; as alterações posteriores da main foram integradas antes da retomada.

## Publicado e conferido no banco

Foram recuperados os enunciados e as cinco alternativas de **69 questões**, números 11–80, exceto a 26, anulada. As fórmulas foram conferidas na imagem, incluindo os operadores da questão 14 e os expoentes das alternativas da questão 18. Os gabaritos e `raw_extraction` foram preservados.

Houve **35 decisões editoriais individuais**:

- **32 questões ativas**, com explicação pedagógica e bloco `Exemplo:` compatível com o destaque existente no treinador: 11, 12, 14–22, 24, 27–30, 32, 36, 40, 41, 43, 47, 50–52, 55, 58, 59, 61, 62, 65 e 67.
- Questão **23 arquivada como repertório histórico**: redação anterior à reforma da improbidade de 2021. Não se afirma que toda situação material da alternativa deixou de ser abrangida; evita-se usar a transcrição revogada como descrição completa do regime atual.
- Questões **38 e 68 obsoletas para treino atual**: foro parlamentar anterior à AP 937 e antigas frações gerais de progressão, respectivamente. As letras originais permanecem inalteradas.
- Três registros correspondentes em `syllabus_exclusions`, sem sobrescrever exclusões existentes.

Os itens ativos foram cotejados com tópicos pertinentes da matriz oficial PF 2025. Eles continuam identificados como prova PC-AC 2017; isso não transforma o caderno em prova da PF nem comprova programa de um futuro concurso do Acre. Nos itens de servidor público, a Lei 8.112/1990 aparece como referência federal da matriz de cotejo, sem substituir o estatuto estadual.

## Fontes e datas

A prova IBADE e o edital PF 2025 foram baixados novamente e apresentaram os mesmos SHA-256 já conferidos. Os conteúdos do STF foram novamente consultados pela API oficial, com links para os artigos sobre RE 548181, ADI 7170, sigilo da fonte, Súmula 421/EXT 1784 e foro.

O Planalto retornou **503** nas tentativas desta retomada. Foram usadas as capturas oficiais bem-sucedidas desta mesma sessão, de 15/10, aproximadamente 16:05–16:09 de Brasília. Os respectivos bytes, hashes e datas foram preservados em `law_version_checked_at` e no manifesto de evidências. Não se registra a tentativa falha como consulta bem-sucedida mais recente. O escopo do cotejo é individual; não constitui certificação de toda a legislação ou jurisprudência.

## Preservação e validação

A leitura após a publicação foi comparada campo a campo com o estado esperado dos **158 registros da prova**. Permaneceram iguais os 79 aliases já arquivados e os dez itens de Português fora da recuperação. Não houve escrita nas outras três tabelas de questões, nem alteração das unidades da biblioteca.

Passaram **189 testes pertinentes** de formato, materiais, aprendizagem, explicações e publicadores. A verificação com o parser e a elegibilidade reais da aplicação confirmou cinco alternativas nos 69 textos e elegibilidade dos 32 itens liberados. Foram também conferidos os cálculos independentes das questões 16–18. Não houve mudança de aplicação; não foi executado novo build.

## Pendências neste ponto

Restam **44 itens PC-AC 2017 em revisão**: dez de Português dependem do tratamento completo do texto de apoio; nos demais, o contexto já foi recuperado, mas a decisão individual de conteúdo, fonte técnica, jurisprudência ou pertinência ao edital ainda está pendente. Recuperação textual não equivale a aprovação editorial.

A consulta global encontrou **1.216 registros `under_review`**: 616 oficiais e 600 de bancas. Durante esta execução, a segunda tabela passou de 300 para 600 pendentes, um acréscimo de 300 registros independente das operações deste lote. Assim, a fila passou de 951 para **951 − 35 + 300 = 1.216**. Os totais são de registros físicos, sem promessa de unicidade entre origens.

Os arquivos completos e readbacks ficam em `outputs/pcac-resume-2026-10-15/` e `outputs/question-review-2026-10-15/`, fora do Git. Manifestos públicos: `docs/question-review-pcac-v-applied-2026-10-15.json` e `docs/question-review-pcac-v-evidence-2026-10-15.json`. Não há credenciais nesses arquivos.
