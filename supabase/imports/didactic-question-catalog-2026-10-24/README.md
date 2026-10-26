# Questões catalogadas de materiais didáticos — Direito Constitucional

Publicado em 24/10/2026. Os 35 PDFs fornecidos pelo usuário produziram 192 candidatos: **164 questões novas ativas, três ocorrências repetidas reutilizadas e 25 itens pendentes**. Os pendentes ficam somente no registro administrativo, fora do catálogo de treino.

## Identificação e utilização

No Treinador, selecione Origem → Materiais didáticos catalogados. A origem também acompanha as questões nos simulados, caderno de erros e prática de materiais. Cada nova questão contém editora, documento, SHA-256, item, página quando identificável e data de revisão. Não são questões oficiais de banca nem produção original da plataforma. O ano exibido corresponde à catalogação. A tabela física e a identidade de pontuação continuam `curated_question_catalog`/`curated`, preservando o histórico.

## Revisão e atualização

Enunciados adaptados, gabaritos e explicações foram confrontados com a Constituição compilada do Planalto e, quando aplicável, a Súmula Vinculante 25 no STF. Os endereços e artigos estão em `legal_basis`; as fontes oficiais, data da conferência e vínculo ao edital ativo constam no pacote e no banco. Atualizações consideradas incluem EC 131/2023 (nacionalidade), EC 138/2025 (acumulação por professor) e EC 122/2022 (limites etários de nomeação). Não se presumiu atualidade a partir do gabarito antigo da apostila.

A verificação de duplicidade compara texto normalizado no catálogo público de Direito Constitucional, sem confundir questões com textos de apoio/opções diferentes, e compara também os itens do lote. Isso não certifica inexistência de toda paráfrase semanticamente equivalente. Registros já existentes conservam sua origem; o vínculo à apostila fica na auditoria.

## Arquivos

- `01-schema.sql`: coluna de proveniência e auditoria com acesso administrativo protegido por RLS.
- `02-publish-reviewed-didactic-questions.sql`: transação idempotente com guardas de fonte, edital, duplicidade e leitura final. Já aplicada; não é necessário reaplicar.
- `dry-run-result.json`: simulação bem-sucedida, revertida antes da publicação.
- `02-publish-reviewed-didactic-questions-result.json`: publicação efetiva.
- `03-verify.sql` e `03-verification-result.json`: conferência independente das 164 questões e 192 classificações.
- `package.json`: conteúdo completo, origem, revisão e classificação de cada candidato.
- `reviewed-items.txt`: justificativas didáticas revisadas.

Validação de interface: 50 testes passaram, checagem TypeScript e build de produção concluídos. Sem inspeção visual de navegador nesta execução. A RPC de resumo global não pôde ser consultada pelo papel da API de gerenciamento; os registros foram conferidos diretamente, sem alterar contadores manualmente.

## Pendências individuais

- 01-02_AlfaCon--principios-fundamentais-parte-2.pdf, item 4: Delimitar titularidade do poder e exercício democrático; o enunciado mistura povo e cidadãos.
- 01-03_AlfaCon--principios-fundamentais-parte-3.pdf, item 8: Exige conferir a disciplina atual de asilo e os limites de discricionariedade em fonte oficial pertinente.
- 01-03_AlfaCon--principios-fundamentais-parte-3.pdf, item 9: Enunciado excessivamente aberto sobre condicionamento da livre iniciativa; delimitar e conferir o fundamento.
- 01-03_AlfaCon--principios-fundamentais-parte-3.pdf, item 10: Exige fonte jurisprudencial atual sobre limites da expressão e discurso de ódio.
- 02-01_AlfaCon--direitos-fundamentais-teoria-geral-parte-1.pdf, item 1: Delimitar alcance de núcleo essencial sem generalizar regime de toda restrição.
- 02-03_AlfaCon--direitos-fundamentais-individuais-e-coletivos-vida-igualdade.pdf, item 1: Exige acórdão oficial pertinente sobre células-tronco e delimitação da pesquisa.
- 02-03_AlfaCon--direitos-fundamentais-individuais-e-coletivos-vida-igualdade.pdf, item 2: Exige jurisprudência atual e contexto da promoção militar para avaliar a diferenciação.
- 02-03_AlfaCon--direitos-fundamentais-individuais-e-coletivos-vida-igualdade.pdf, item 3: A generalização a todos os direitos não permite gabarito seguro sem delimitar proteções e proibições.
- 02-04_AlfaCon--direitos-fundamentais-individuais-e-coletivos-liberdade-parte-1.pdf, item 4: Exige conferir o julgamento oficial específico sobre manifestação e defesa de mudança legislativa.
- 02-05_AlfaCon--direitos-fundamentais-individuais-e-coletivos-liberdade-parte-2.pdf, item 8: Exige precedente atual e legislação pertinente à profissão e inscrição em conselho.
- 03-02_AlfaCon--direitos-fundamentais-individuais-e-coletivos-seguranca-parte-1.pdf, item 2: Exige fonte atual sobre gravação por interlocutor e seu regime; não confundir com interceptação.
- 03-02_AlfaCon--direitos-fundamentais-individuais-e-coletivos-seguranca-parte-1.pdf, item 6: Risco de gabarito histórico superado sobre dados bancários e administração tributária. Não liberar sem julgado oficial atual e delimitação do compartilhamento.
- 03-05_AlfaCon--direitos-fundamentais-individuais-e-coletivos-remedios.pdf, item 1: Exige conferir requisitos processuais do habeas corpus na legislação oficial, além do recorte constitucional.
- 04-01_AlfaCon--direitos-sociais.pdf, item 5: Exige fonte judicial atual e delimitação do mínimo existencial e da reserva do possível.
- 05-01_AlfaCon--direitos-politicos-parte-2.pdf, item 1: Exige jurisprudência eleitoral oficial sobre dissolução conjugal e inelegibilidade reflexa.
- 05-01_AlfaCon--direitos-politicos-parte-2.pdf, item 5: Exige jurisprudência eleitoral oficial e contexto de substituição/sucessão pelo vice.
- 05-01_AlfaCon--direitos-politicos-parte-2.pdf, item 7: Exige precedente eleitoral atual e condições concretas após falecimento do titular.
- 05-03_AlfaCon--organizacao-do-estado.pdf, item 8: Classificação histórica não é comando literal da Constituição; exige referência independente.
- 07-01_AlfaCon--administracao-publica-principios-da-administracao-publica.pdf, item 2: Exige a fonte oficial da SV 13 e condições do caso de nepotismo.
- 07-02_AlfaCon--administracao-publica-disposicoes-gerais-parte-1.pdf, item 6: Delimitar ausência de enumeração no caput constitucional sem negar positivação em outras normas.
- 07-03_AlfaCon--administracao-publica-disposicoes-gerais-parte-2.pdf, item 1: Risco de generalização superada sobre imprescritibilidade de ressarcimento. Não liberar sem distinções e precedentes oficiais atuais.
- 08-02_AlfaCon--poder-judiciario-quinto-constitucional-garantias-e-impedimentos.pdf, item 2: Exige precedente oficial sobre inamovibilidade do juiz substituto.
- 08-03_AlfaCon--poder-judiciario-composicao-conselho-nacional-de-justica.pdf, item 5: Exige jurisprudência atual sobre controle de legalidade/constitucionalidade de atos pelo CNJ.
- 08-03_AlfaCon--poder-judiciario-composicao-conselho-nacional-de-justica.pdf, item 6: Exige precedente oficial atual sobre competência concorrente do CNJ.
- 08-03_AlfaCon--poder-judiciario-composicao-conselho-nacional-de-justica.pdf, item 9: Exige jurisprudência oficial sobre limites da atuação do CNJ em relação ao STF.
