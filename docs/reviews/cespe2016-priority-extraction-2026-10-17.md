# Extração original: Português, Contabilidade, CTB e Institucional

As quatro disciplinas foram lidas novamente do PDF original, com separação de
enunciados, alternativas, instruções compartilhadas, contexto anterior e dados
editoriais de gabarito e comentário. Não são novas adaptações autorais.

| Disciplina | Itens identificados | Na fila privada | Lotes de até 100 |
|---|---:|---:|---:|
| Língua Portuguesa | 357 | 357 | 4 |
| Contabilidade | 280 | 280 | 3 |
| Legislação de Trânsito | 136 | 134 | 2 |
| Legislação Institucional | 355 | 354 | 4 |
| **Total** | **1.128** | **1.125** | **13** |

Os últimos lotes têm, respectivamente, 57, 80, 34 e 54 itens. Todos os demais
têm 100. O manifesto JSON ao lado lista os IDs, os hashes e os arquivos de lote.
Textos integrais e o pacote ZIP ficam fora do Git, no diretório privado
`/workspace/cespe7000-audit/priority-subjects`.

## Preservação das decisões existentes

Dois itens de CTB com multas em UFIR haviam sido classificados como obsoletos e
removidos. Um item institucional já estava classificado como duplicado. Esses
três itens foram separados como histórico local, sem entrar nos lotes da fila
e sem reinserção no banco. O publicador de questões não foi acionado.

Os 284 registros anteriores de Contabilidade incluíam quatro registros de grupos
com tabelas, além dos itens individuais depois separados. A nova extração conta
280 itens, preservando os dados compartilhados nos itens correspondentes. Os
quatro registros antigos de grupo não foram apagados do banco nesta operação;
seus IDs ficam listados no manifesto para triagem da segmentação anterior.

Uma leitura administrativa atual do Supabase, paginada por ID e restrita a esta
fonte, confirmou que os 1.125 IDs da fila já existem como `under_review`. Não há
IDs novos a inserir. Essa conferência verifica identidade dos registros deste
PDF; não substitui a comparação semântica com outras questões da plataforma.

## Pendências documentadas

Foram registradas duas diferenças de texto frente ao inventário anterior: uma
em Português, na página 18 do PDF, e outra em Contabilidade, na página 451. Os
arquivos da reextração preservam a nova leitura; nenhum payload existente foi
sobrescrito no banco. Contextos e tabelas ainda requerem conferência visual.

Há 15 diagnósticos de resposta em Português e um em Contabilidade, incluindo
diferenças em relação à extração anterior, conflitos editoriais e alegações de
anulação. Não são 16 erros confirmados da banca. Seis itens ficaram sem resposta
segura na exportação: quatro de Português, um de Contabilidade e um institucional.
Gabaritos paralelos discordantes e alegações de anulação nunca são promovidos
automaticamente a resposta válida.

Comentários preservados nos arquivos são os da apostila e estão identificados
como não verificados. Não foram apresentados como comentários novos do assistente.
Antes de publicar, permanecem necessárias a conferência de prova/gabarito
definitivo, a classificação, a relação com edital atual e a auditoria em fontes
oficiais. O rótulo de uma disciplina não dispensa essa auditoria quando o item
envolve matéria jurídica ou normativa. Nenhum total desta entrega é certificado
como contagem definitiva de questões únicas ou cobertura completa do PDF.

## Reprodução e validação

`scripts/review/extract-cespe2016-priority-subjects.py` recebe PDF, inventário
original, suplemento e diretório externo de saída. `--decisions` recebe o pacote
anterior de estágio privado para preservar exclusões e duplicatas já conhecidas.
Os dois manifestos de remoção de obsoletos também são respeitados. O script
verifica o SHA-256 do PDF e não contém operações de banco ou publicação.

Seis testes passaram para conflitos de gabarito, gabaritos paralelos, anulações,
respostas únicas, limites de lote e divergência editorial sem alternativa correta.
Além disso, foram conferidos os hashes e tamanhos dos 13 lotes, a unicidade dos
1.125 IDs, a ausência dos três excluídos na fila e a existência dos IDs no banco.
Um teste adicional verifica que os manifestos não recolocam excluídos nos lotes.
As revisões de vigência e a inspeção visual individual não foram certificadas
como concluídas. Nenhuma questão foi publicada e nenhuma linha do banco foi
alterada nesta operação.
