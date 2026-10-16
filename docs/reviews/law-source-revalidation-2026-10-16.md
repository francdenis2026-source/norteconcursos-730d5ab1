# Revalidação das fontes legais — 16/10/2026

Concluída a comparação do texto normativo dos 42 percursos ativos da biblioteca com as respectivas páginas oficiais do Planalto. Os 3.511 dispositivos em estado `current` coincidem exatamente com a nova extração oficial. Não foi detectada mudança textual a incorporar na leitura ativa.

## Alcance e limites

A conferência verifica o texto dos dispositivos e a cobertura da extração, incluindo anexos cadastrados. Não é uma nova auditoria integral da jurisprudência, da interpretação de cada artigo, dos casos, das questões ou dos exercícios. As datas gerais anteriores foram preservadas; a evidência nova fica em `legal_review.source_revalidation`, com data, URL, hash e alcance específico, nos 42 percursos e nos 42 materiais associados. Nenhum item pendente foi liberado.

Também foi verificado que todos os 3.511 dispositivos vigentes têm explicação publicada vinculada ao hash do respectivo texto-base. A existência de atividades genéricas em `recall` não indica ausência dessas explicações: elas estão em `legal_unit_explanations`. Essa verificação de vínculo não substitui nova avaliação jurídica de cada explicação.

## Diferenças analisadas

- Crimes Ambientais, art. 1º: marcador de veto presente no HTML e ausente do percurso; não há norma vigente omitida.
- Lei de Drogas, art. 65-A: marcador de veto presente no HTML e ausente do percurso; não há norma vigente omitida.
- Lavagem de Dinheiro, art. 16: mantida a exclusão e a anotação editorial da revogação pela Lei 13.974/2020.
- LEP, art. 182 e parágrafos: mantida a exclusão pela Lei 9.268/1996; não restaurada conversão de multa em detenção.

Os 40 arquivos com hash bruto diferente não geraram, por esse motivo isolado, alegação de nova lei ou alteração normativa: a comparação foi feita no texto extraído dos dispositivos, removendo as redações riscadas segundo o parser existente.

## Fontes e evidências

Os 42 textos públicos foram obtidos novamente e as mesmas páginas foram consultadas pela ferramenta web. Os downloads diretos com validação de certificado falharam; a coleta em lote foi restrita ao Planalto público, sem credenciais, com validação de certificado indisponível. A consulta web corroborou as fontes. Os hashes documentam reprodução dos arquivos e não constituem prova isolada de autenticidade. Fontes brutas e snapshots completos ficam somente nos outputs locais, ignorados pelo Git.

| Percurso | Dispositivos vigentes comparados | Fonte |
|---|---:|---|
| cin | 30 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/decreto/d10977.htm) |
| seguranca-privada | 72 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14967.htm) |
| codigo-penal | 401 | [Planalto](https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm) |
| armas | 41 | [Planalto](https://www.planalto.gov.br/ccivil_03/leis/2003/l10.826compilado.htm) |
| lep | 215 | [Planalto](https://www.planalto.gov.br/ccivil_03/leis/l7210.htm) |
| organizacoes | 37 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12850.htm) |
| terrorismo | 17 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/lei/l13260.htm) |
| idosa | 117 | [Planalto](https://www.planalto.gov.br/ccivil_03/leis/2003/l10.741.htm) |
| contravencoes | 66 | [Planalto](https://www.planalto.gov.br/ccivil_03/decreto-lei/del3688.htm) |
| identificacao-criminal | 13 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/lei/l12037.htm) |
| quimicos | 23 | [Planalto](https://www.planalto.gov.br/ccivil_03/leis/leis_2001/l10357.htm) |
| pf-interestadual | 2 | [Planalto](https://www.planalto.gov.br/ccivil_03/leis/2002/l10446.htm) |
| abuso | 40 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13869compilado.htm) |
| icn | 13 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13444.htm) |
| antifaccao | 43 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15358.htm) |
| eca | 326 | [Planalto](https://www.planalto.gov.br/ccivil_03/leis/l8069.htm) |
| migracao | 123 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13445.htm) |
| racismo | 23 | [Planalto](https://www.planalto.gov.br/ccivil_03/leis/l7716.htm) |
| ric | 7 | [Planalto](https://www.planalto.gov.br/ccivil_03/leis/l9454.htm) |
| pcd | 127 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm) |
| maria-penha | 56 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm) |
| hediondos | 17 | [Planalto](https://www.planalto.gov.br/ccivil_03/leis/l8072.htm) |
| lavagem | 24 | [Planalto](https://www.planalto.gov.br/ccivil_03/leis/l9613.htm) |
| trafico-pessoas | 18 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/lei/l13344.htm) |
| interceptacao | 14 | [Planalto](https://www.planalto.gov.br/ccivil_03/leis/l9296.htm) |
| transito | 365 | [Planalto](https://www.planalto.gov.br/ccivil_03/leis/l9503compilado.htm) |
| henry-borel | 34 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14344.htm) |
| sic | 29 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/decreto/d11797.htm) |
| delegado | 4 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12830.htm) |
| menor-potencial-ofensivo | 8 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l13060.htm) |
| tortura | 4 | [Planalto](https://www.planalto.gov.br/ccivil_03/leis/l9455.htm) |
| codigo-processo-penal | 808 | [Planalto](https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm) |
| pensao-regulamento | 22 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12636.htm) |
| uso-forca | 11 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/decreto/d12341.htm) |
| identidade | 13 | [Planalto](https://www.planalto.gov.br/ccivil_03/leis/1980-1988/l7116.htm) |
| ambientais | 79 | [Planalto](https://www.planalto.gov.br/ccivil_03/leis/l9605.htm) |
| testemunhas | 22 | [Planalto](https://www.planalto.gov.br/ccivil_03/leis/l9807.htm) |
| temporaria | 7 | [Planalto](https://www.planalto.gov.br/ccivil_03/leis/l7960.htm) |
| budapeste | 51 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/decreto/d11491.htm) |
| juizados | 98 | [Planalto](https://www.planalto.gov.br/ccivil_03/leis/l9099.htm) |
| cpf | 7 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14534.htm) |
| drogas | 84 | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm) |

## Publicação e preservação

A escrita usou uma transação com bloqueio e precondição de linha completa por hash para todos os 84 registros. O ensaio com rollback passou antes da execução definitiva. A leitura posterior confirmou cada patch e a preservação dos demais campos, exceto `updated_at` automático dos materiais quando aplicável.

Foram preservados integralmente: 3.671 unidades, 3.513 registros de explicação, 244 complementos, 406 fontes e os 128 materiais fora do alvo, inclusive os 11 pendentes. Nenhuma tabela de questões, usuário, progresso, autenticação ou permissão foi alterada por esta operação. Não houve mudança de código da aplicação; build não se aplica.

O relatório estruturado acompanha este documento. A outra conta continuou revisando questões durante esta atividade; essas alterações externas não integram a certificação desta revalidação.
