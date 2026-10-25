# CESPE 2016 — auditoria de recursos no CPC, lote 01

Foram conferidos oito candidatos privados da apostila de 510 páginas com o CPC/2015 no Planalto. O banco recebeu oito comentários e oito exemplos autorais: quatro candidatos foram classificados como obsoletos e quatro ficaram revisados, porém retidos. Nenhuma questão foi publicada. Enunciados, extração e respostas editoriais foram preservados; as respostas não foram certificadas como gabaritos definitivos da banca.

| Página PDF | Tema | Decisão |
|---|---|---|
| 322 | Agravo retido e recebimento da apelação | Obsoleto |
| 326 | Embargos infringentes após apelação por maioria | Obsoleto |
| 326 | Agravo contra inadmissão de recurso especial em dez dias | Obsoleto |
| 329 | Recurso especial retido e destrancamento | Obsoleto |
| 333 | Retratação após distribuição do agravo | Revisado, retido |
| 333 | Comunicação do agravo e condições da inadmissibilidade | Revisado, retido |
| 333 | Rescisória improcedente por maioria | Revisado, retido |
| 333 | Formulação de cabimento de embargos infringentes | Revisado, retido |

A conferência individual distingue a técnica de julgamento do art. 942 de um recurso autônomo, a enumeração do art. 994, a apelação sem admissibilidade na origem e as condições dos §§ 1º a 3º do art. 1.018. Não se rejeitou automaticamente uma afirmação apenas porque menciona um instituto antigo: algumas proposições negativas continuam explicáveis pela lei atual e foram retidas por falta das demais evidências necessárias à publicação.

Fonte: [CPC/2015, texto oficial do Planalto](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm), coletado em 17/10/2026. O manifesto no pacote registra instante e SHA-256 do HTML efetivamente consultado. Foram lidos os dispositivos específicos usados nos comentários; o texto integral coletado permanece em arquivo local, fora do Git.

## Aplicação e validação

O pacote JSON deste lote contém IDs, hashes da extração e do payload esperado, decisão, comentário, exemplo e evidência por candidato. O aplicador faz a pré-validação do lote inteiro, usa a RPC de revisão com comparação do estado anterior e confere cada gravação. Apenas candidatos privados pendentes podem ser alterados; não há caminho de publicação. Credenciais são recebidas por variável segura ou entrada sem eco, sem persistência em arquivos.

Foram aprovados três testes do aplicador, cobrindo reexecução, preservação do texto e da resposta original, conflito concorrente, domínio oficial falso e rejeição de payload de publicação. Os 602 testes existentes do projeto passaram. A aplicação no Supabase confirmou as oito gravações por leitura de retorno.

O estado revisado deste lote significa conferência normativa limitada, sem aprovação editorial final: continuam pendentes contexto, imagens, prova e gabarito definitivo, e vínculo individual a edital vigente. O campo `publication_approved` permanece falso.

## Continuidade e envio à main

Por instrução do usuário, cada lote concluído que alterar questões, comentários ou exemplos deve ter seu pacote, resultado e código necessário versionados e enviados à `main`, sem force push e sem reescrever histórico publicado. Enviar o registro ao Git não publica candidatos privados para alunos nem substitui a aplicação verificada no banco. PDFs, extrações integrais, snapshots privados e credenciais permanecem fora do Git.

Este primeiro lote foi limitado a oito itens. As ferramentas disponíveis não informam o saldo de créditos do Codex; portanto, não foi possível medir ou garantir uma reserva de 5%. É necessário consultar o saldo no painel para ajustar um limite de consumo confiável antes de expandir o trabalho. Não há agente ou processo de auditoria executando em segundo plano.

Ponto de retomada: conferir o resultado deste lote antes de selecionar novos IDs. Restam 3.222 candidatos ainda sem revisão individual nesta fonte; há seis obsoletos, quatro revisados retidos e uma duplicata, considerando os três bloqueios anteriores à presente auditoria. Esses totais derivam do estado confirmado da importação acrescido das oito decisões deste lote; não representam aprovação integral da apostila.
