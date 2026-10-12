# CONTRAN — lote inicial de consulta e aprendizagem

Conferência em 12/10/2026. Foram consultados o catálogo oficial da Senatran,
50 PDFs de resoluções e quatro documentos complementares (deliberação,
retificações e circular). O catálogo retornou 1.033 registros; isso não é
uma contagem de resoluções vigentes.

## Entrega e limites

- 50 atos examinados no escopo de seus objetos, temas e principais mudanças.
- 42 guias de consulta atual, com 42 casos respondidos e 42 variações comentadas.
- Oito guias excluídos da consulta atual: 1029, 1014, 1011, 1002, 992, 981,
  979 e 972. Há calendários encerrados, transições antigas e norma-base
  substituída; não se afirma que todos os oito atos foram formalmente revogados.
- Entrada na biblioteca, área Legislação / Trânsito, abrindo o painel CTB na
  mesma aba. As fontes oficiais externas abrem em outra aba.
- 42 textos de PDFs oficiais disponíveis para leitura dentro do painel.
  São edições originais, identificadas como tal, com links para modificações;
  não são compilações integrais de todas as alterações.
- Ordenação pelo último ato relacionado identificado, seguida da publicação.
  Conferência editorial e publicação não são tratadas como a mesma data.

Não houve revisão integral de cada anexo, ficha técnica ou jurisprudência,
nem certificação de todas as resoluções do catálogo. Não foram criadas
questões do treinador, índices de incidência em provas ou vinculações
fictícias ao edital PF 2025. A consulta do banco identificou dois materiais
CTB existentes; foi reutilizado o painel de trânsito, sem duplicá-los.

## Alertas preservados

- 1031/2026: parte das mudanças do MBFT tem produção de efeitos em 60 dias
  após a publicação de 18/08/2026; a data de conferência não antecipa efeitos.
- 1028/2026: transição do free-flow vinculada à publicação da deliberação
  ratificada, sem reiniciar o prazo na publicação da resolução.
- 1026/2026: retificação e circular de implementação consideradas. Divergência
  entre data do índice e PDF registrada; integração futura não é regra atual.
- 1007/2024: requisitos com marcos de janeiro/licenciamento de 2027 separados
  do regime aplicável em outubro de 2026.
- 1009 e 998: revogação de dispositivos específicos não exclui todo o ato.
- Resoluções que alteram outras, ou revogam predecessoras, não são automaticamente
  classificadas como integralmente revogadas.

## Preservação e validação

O Supabase foi consultado antes e depois: oito tabelas comparadas sem alterações.
Este lote não escreveu no banco; publica o catálogo editorial e os textos públicos
como conteúdo da aplicação. Snapshots e PDFs de evidência ficam em outputs ignorados.
Hashes e fontes constam do relatório JSON adjacente.

281 testes, verificação TypeScript e build passaram. A leitura HTTP de um texto
de consulta foi verificada no ambiente. A implantação no domínio de produção
não foi confirmada: a consulta externa retornou bloqueio de saída do ambiente.
Enviar à main não constitui evidência de implantação concluída.

A biblioteca anterior permanece com 3.511 unidades atuais, 879 com metadados
de revisão e 2.632 pendentes; os guias CONTRAN não são somados a essas unidades.
Há 983 registros do catálogo fora deste lote, sujeitos a triagem de vigência,
duplicatas e escopo. O checkpoint lista candidatos, sem declarar todos vigentes.

Não foi configurado um trabalhador persistente em segundo plano. Este ambiente
não fornece monitor de percentual de créditos nem retomada automática na renovação.
O checkpoint permite continuar sem duplicar o lote já examinado.
