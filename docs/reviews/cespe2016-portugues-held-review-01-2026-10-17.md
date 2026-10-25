# Português: início da análise do lote de 100

Foram realizadas verificações estruturais e de escopo dos primeiros 100 itens
de Português e revisão técnica individual com comentário e exemplo próprios
dos primeiros 20. As 20 revisões foram persistidas no banco privado e conferidas
por leitura posterior. Não houve publicação de originais nem criação de novas
adaptações neste lote. Os outros 80 itens não receberam revisão técnica individual.

## Resultado e limite da revisão

Os 20 registros passaram de `under_review` a `reviewed` **com aprovação de
publicação falsa**. Esse status registra a análise técnica retida, não uma
liberação aos alunos. Os textos e respostas originais da extração foram mantidos.
O comentário e o exemplo foram acrescentados separadamente no payload privado.

Há conclusões técnicas provisórias para 17 dos 20 itens, sem certificação da
resposta definitiva da prova. Três itens ficaram sem conclusão técnica de
gabarito neste lote: dependem de dados educacionais históricos ou verificação
jurídica. Nenhum dos 20 possui confirmação de gabarito definitivo, associação
com numeração original e eventuais anulações, vínculo individual confirmado ao edital
atual e verificação atual completa de duplicatas para aprovação de publicação.

Nos 100 itens triados, registraram-se:

- 19 contextos anteriores ausentes na exportação, sem presumir que todos sejam
  necessariamente defeitos fatais: alguns podem reutilizar textos de outros itens;
- 2 contextos com nota editorial misturada ao texto-base;
- 5 itens cujo comando cobra o cenário educacional atual na época da prova de 2008;
- 3 itens que demandam conferência jurídica e possível reclassificação, apesar
  de constarem na seção de Português;
- 5 possíveis fragmentos de enunciado, sinalizados pela forma de início do texto
  e ainda dependentes de inspeção individual.

As contagens se sobrepõem e não equivalem a 34 questões diferentes defeituosas.
Nenhum item foi declarado obsoleto apenas por ser antigo. Perguntas de
interpretação podem continuar úteis com texto e data completos; perguntas sobre
situação atual exigem delimitação histórica. Uma alternativa errada sobre lei
também não se torna automaticamente obsoleta se a resposta continuar falsa.

## Texto-base e evidência

A página 7 do PDF foi inspecionada visualmente. Confirmou-se que os cinco itens
sobre educação reutilizam o texto-base do candidato anterior sobre as escolas
pernambucanas. A referência proposta e a página estão registradas nas cinco
revisões, preservando a extração original. Essa ligação não foi apresentada como
uma confirmação geral do cenário educacional atual.

Foram lidos os enunciados e contextos dos primeiros 20 itens e produzidos os
comentários individuais que constam no JSON ao lado. A apostila é evidência do
texto e do gabarito editorial; não foi tratada como gabarito definitivo oficial.

Tentativas de consulta aos portais do STF, TSE e à página antiga da CESPE não
produziram gabarito definitivo verificável para os itens correspondentes. Uma
resposta HTTP 204 do TSE veio sem conteúdo. Os outros dois endereços retornaram
erro HTTP. Isso não comprova indisponibilidade dos documentos em todas as fontes:
registra apenas que a confirmação não foi obtida nessas tentativas.

Também foi feita comparação exata normalizada dos 100 enunciados com cópias
locais anteriores: 4.888 registros oficiais, 1.054 de bancas, 1.992 curados e
1.503 candidatos de outras apostilas. Não houve coincidência exata. Essa
comparação não é uma consulta atual completa nem uma aprovação de identidade
semântica; a pendência de duplicatas para publicação continua registrada.

## Persistência e validação

`scripts/review/apply-held-language-review.py` aceita até 100 análises retidas.
Verifica fonte, disciplina, página e hash do texto original; impede sobrescrever
decisões existentes ou registros publicados; prepara toda a verificação antes da
primeira escrita; e usa o RPC auditado com comparação do status e payload anterior.
Ele não contém caminho para publicar questões. A cópia privada anterior à
alteração e o relatório de execução ficam fora do Git.

Quatro testes passaram: preservação do texto/gabarito e da retenção, bloqueio de
todas as escritas quando uma revisão posterior é protegida, repetição idempotente
e rejeição de publicação neste fluxo. A gravação real e a leitura posterior dos
20 payloads foram concluídas. O resultado consta no manifesto JSON ao lado.
