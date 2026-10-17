# Publicação de 10 versões adaptadas — CPC/2015

Foram publicadas 10 questões de treino em `curated_question_catalog`, com status
`active`, comentários e exemplos autorais, em 17/10/2026. A leitura posterior
confirmou os campos completos das dez questões e a preservação dos dez registros
privados de origem. O manifesto JSON ao lado contém o conteúdo publicado, a
correspondência com os candidatos da apostila e o resultado verificado.

## Natureza do conteúdo publicado

São novas formulações didáticas a partir de temas dos candidatos da apostila,
adaptadas para o CPC/2015. Não são reproduções certificadas das provas históricas
nem aprovação dos gabaritos da editora. O enunciado começa com “Treino adaptado e
atualizado — CPC/2015” e a banca aparece como “Autoral (adaptação)”. A explicação
identifica que a resposta pertence à versão adaptada. `is_original=true` indica
redação autoral de treino, sem atribuir a nova formulação à CESPE/CEBRASPE.

Nenhuma questão histórica foi liberada e nenhum candidato privado foi alterado.
A confirmação de gabarito definitivo, numeração original e eventuais anulações
das provas antigas continua pendente. A publicação destas adaptações não reduz
os 2.986 registros da apostila que estavam em `under_review`.

## Fundamentação e edital

Os temas são indeclinabilidade, duração razoável, aquisição da prova, convenção
sobre ônus probatório, prova emprestada, efeitos das decisões do juízo
incompetente, requisitos da tutela de urgência, revogação da tutela provisória,
irreversibilidade da tutela antecipada e iniciativa probatória do juiz.

Dispositivos conferidos: arts. 4º, 64, § 4º, 139, II, 140, 296, 300, 370, 371,
372 e 373 do CPC. Utilizou-se o texto oficial do Planalto capturado em
17/10/2026 às 17:43:25 UTC, com integridade SHA-256 verificada. Uma nova tentativa
de acesso ao Planalto expirou; não foi apresentada como captura bem-sucedida.
URL e hash da captura utilizada estão no manifesto.

O edital oficial da PC-CE para Delegado de 2025 foi obtido novamente da CEBRASPE,
com SHA-256 `af5cd9c5b324c6abc53954bc43c313b056cdf53b0e48257b9a8089bea0020f40`.
O conteúdo foi confrontado com os tópicos de normas fundamentais, competência,
provas e tutela provisória. Antes da gravação, o banco confirmou os tópicos
`current`, a edição `active` e o edital oficial cadastrado como `vigente`.

## Comparação, gravação e testes

Comparação com 7.934 registros atuais dos três catálogos de questões publicados
ou em revisão: 4.888 oficiais, 1.054 de bancas e 1.992 curados. Não houve cópia
exata de texto; a análise de proximidade dos itens classificados em Processo
Civil também não encontrou reprodução das formulações existentes. Questões de
um mesmo tema podem naturalmente avaliar regras relacionadas.

O publicador realiza todas as verificações antes da primeira escrita, limita o
lote a 100 itens, usa IDs determinísticos, não sobrescreve conflitos e confere
os dados após gravar. O backup privado dos registros originais e da verificação
prévia permanece fora do Git. Não houve gravação de credenciais.

Cinco testes Python passaram para identificação autoral, impedimento de liberação
de originais, comentário substancial, conferência de respostas e bloqueio de
todas as escritas quando um candidato posterior falha na verificação. Dois testes
Node passaram com as funções reais da interface: elegibilidade jurídica,
formato Certo/Errado, exemplo separado, fontes e rótulos de adaptação.

Uso: `python scripts/review/publish-corpus-adaptations.py PACK REPORT [--apply]`.
Sem `--apply`, apenas verifica. A credencial é lida sem eco e mantida em memória.
Os arquivos oficiais referenciados no manifesto devem existir nos caminhos locais
e corresponder aos hashes registrados. O relatório privado deve ficar fora do
repositório. A gravação real deste lote foi confirmada no manifesto.
