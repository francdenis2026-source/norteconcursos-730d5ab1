# Português — integração dos materiais enviados

## Resultado no Supabase

74 PDFs e 349 páginas; 73 documentos únicos e 344 páginas após deduplicação binária. O arquivo 03-01 é idêntico ao 01-01. As duas versões aparentes de 10-02 têm conteúdo distinto: uma trata de adjetivas e a outra de adverbiais; foram encaminhadas separadamente pelo conteúdo e SHA-256.

A base consultada tinha cinco materiais de Português, sendo um específico do ENEM. Também foram comparados 1.311 registros públicos de questões da disciplina, além das aulas resumidas do roteiro.

- **12 módulos novos e quatro existentes ampliados**, na disciplina Língua Portuguesa.
- **240 exercícios locais novos** e 80 preservados: 320 exercícios nas 16 áreas do lote. O guia ENEM e seus vinte exercícios permanecem na área própria.
- Quatro revisões de prática reconstruídas com fonte, hash, data, escopo e edital, sem afrouxar o validador. Os quatro quizzes publicados foram preservados integralmente.
- Dezesseis casos resolvidos novos; versões anteriores preservadas e arquivadas na publicação das novas versões.
- **105 questões novas ativas** no Treinador com origem Material didático catalogado, **três ocorrências repetidas reutilizadas** e **94 candidatos pendentes**, fora do treino.

Os exercícios locais e as questões catalogadas são conjuntos de estudo diferentes. Não somar esses números como total global de questões únicas. Nenhum contador público foi alterado manualmente.

## Onde encontrar

Materiais → Língua Portuguesa. Os nove passos do roteiro apontam para seus materiais principais, preservando IDs, URLs e marcações antigas. A aula curta de redação oficial também foi corrigida para não ensinar uma distinção antiga entre ofício e memorando como regra universal atual.

Treinador → disciplina Língua Portuguesa → origem Materiais didáticos catalogados. Documento, item, página quando identificada, hash, adaptação e procedência estão associados a cada nova questão. Não se atribui autoria original da plataforma nem banca oficial aos exercícios das apostilas.

## Áreas do lote

| Material | Operação | Exercícios locais |
| --- | --- | ---: |
| Leitura e tipologia: interpretação, inferência e gêneros textuais | Novo | 20 |
| Sentido e figuras de linguagem: contexto, palavras e efeitos | Novo | 20 |
| Ortografia e acentuação: regras atuais e dúvidas frequentes | Novo | 20 |
| Classes de palavras: nomes, determinantes e circunstâncias | Novo | 20 |
| Pronomes: referência, relativos e funções no período | Novo | 20 |
| Verbos: flexão, tempos, correlação e vozes | Novo | 20 |
| Sintaxe: sujeito, predicado, complementos e termos associados | Novo | 20 |
| Colocação pronominal: posição, atração e reescrita | Novo | 20 |
| Concordância verbal e nominal: núcleo, se e construções especiais | Novo | 20 |
| Regência e crase: relações, preposições e casos de prova | Novo | 20 |
| Pontuação: estrutura, vírgula e efeitos de sentido | Novo | 20 |
| Redação oficial atual: clareza, documentos e alcance das normas | Novo | 20 |
| Período composto: coordenação, subordinação e funções | Ampliado | 20 |
| Conectores: causa, consequência, concessão e condição | Ampliado | 20 |
| Orações adjetivas e substantivas: função e efeito das vírgulas | Ampliado | 20 |
| Coesão e reescrita: preserve referente, lógica e sentido | Ampliado | 20 |

## Elaboração e conferência

Os temas foram identificados nos PDFs e reorganizados com redação, exemplos e casos próprios. Não foram publicados integralmente os arquivos, a publicidade, a diagramação, os nomes de professores ou os comentários autorais originais. A procedência dos exercícios foi preservada, inclusive no registro administrativo; retirar publicidade não converte a questão em autoria da plataforma.

O edital PF 2025 e suas retificações foram consultados diretamente no PDF oficial cadastrado. A seção de Português contempla interpretação, tipos/gêneros, ortografia, morfossintaxe, reescrita e correspondência oficial. Cada material e questão tem vínculo ao tópico atual correspondente. O vínculo de programa não certifica que uma norma posterior ao corte de uma prova histórica seja cobrável naquela prova; esse limite está explicado em redação oficial.

Fontes efetivamente acessadas: Acordo Ortográfico promulgado pelo Decreto 6.583/2008, referências de uso formal do Senado (índice, concordância verbal, crase e vírgula), Decreto 9.758/2019 e Lei 15.263/2025. `sources.json` registra URL, SHA-256 e data da consulta. Conceitos e classificações gramaticais são análise didática assistida; não se afirma que toda explicação é transcrição literal de uma página do manual. A referência institucional de estilo não foi registrada como lei.

A URL do **MRPR integral apresentou indisponibilidade** nesta execução. Não se afirma nova consulta integral do manual. O módulo distingue a edição de 2018, o âmbito do Decreto 9.758 e as regras atuais de linguagem simples; as questões antigas de modelos, tratamentos, imagens e formatação que dependem de reconciliação adicional não foram liberadas. `source-availability.json` registra esse limite.

Na extração, foram restaurados apenas recortes verificáveis (por exemplo, a frase que preenchia lacunas e o nome do termo originalmente destacado). Alternativas permaneceram identificadas de A a E, ou A a D quando eram quatro. Um problema na leitura de uma preposição a no fim da alternativa foi corrigido antes da publicação. Destaques ou textos cuja restauração não era segura ficaram pendentes.

A deduplicação considera texto normalizado, texto-base, opções e figuras, além da versão original e da delimitada. Não é certificação de equivalência semântica de todas as paráfrases do acervo. O documento binariamente repetido não gerou uma segunda carga de exercícios.

## SQLs e comprovação

1. `01-publish-materials.sql`: materiais, fontes e exemplos. Protege versões anteriores e prática já publicada contra alteração concorrente.
2. `02-publish-questions.sql`: questões e auditoria; itens pendentes nunca entram no catálogo de treino.
3. `03-verify-publication.sql`: leitura independente dos materiais, questões, auditoria e três tópicos de edital.

Os SQLs 1 e 2 **já foram aplicados juntos numa transação no Supabase**. `publication-result.json` comprova a execução; `verification-result.json` confirma os dados gravados. Simulação e repetição após publicação também foram revertidas e conferidas, sem duplicar registros. Não é necessário reaplicar manualmente.

O administrador informado pelo usuário é o responsável pela publicação assistida. Não se atribui revisão humana independente a outra pessoa.

56 testes passaram, incluindo o validador real de prática, formatos e gabaritos, origem didática, reaproveitamento de repetições, exclusão das pendências e vínculos do roteiro. TypeScript e build de produção passaram. Não houve inspeção visual de navegador autenticado.

## Pendências individuais

- 01-01_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 01-01_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 01-03_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 01-03_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 01-03_lingua_portuguesa_giancarla_bombonato.pdf, item 3: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 01-03_lingua_portuguesa_giancarla_bombonato.pdf, item 4: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 01-02_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 01-02_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 02-01_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 02-01_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 01-04_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 01-04_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 02-02_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 03-02_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 03-03_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 03-04_lingua_portuguesa_giancarla_bombonato.pdf, item 4: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 03-04_lingua_portuguesa_giancarla_bombonato.pdf, item 5: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 04-02_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 04-02_lingua_portuguesa_giancarla_bombonato.pdf, item 3: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 04-04_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 04-04_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 04-04_lingua_portuguesa_giancarla_bombonato.pdf, item 3: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 04-04_lingua_portuguesa_giancarla_bombonato.pdf, item 4: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 04-05_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 05-05_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 06-04_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 07-01_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 07-01_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 07-03_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 07-04_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 07-05_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 08-05_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 09-04_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 10-01_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 10-05_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 11-02_lingua_portuguesa_giancarla_bombonato.pdf, item 1: A alternativa indicada como erro de concordância admite leitura que precisa ser conciliada com a imagem e a referência; não liberar a chave automaticamente.
- 12-01_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 12-02_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 12-02_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 12-03_lingua_portuguesa_giancarla_bombonato.pdf, item 1: O gabarito de crase ou o recorte extraído exige conciliação; não aceitar automaticamente a chave antiga sem o trecho e condições completos.
- 12-03_lingua_portuguesa_giancarla_bombonato.pdf, item 2: O gabarito de crase ou o recorte extraído exige conciliação; não aceitar automaticamente a chave antiga sem o trecho e condições completos.
- 13-02_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 13-03_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 14-01_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 14-01_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 14-01_lingua_portuguesa_giancarla_bombonato.pdf, item 3: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 14-03_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 14-03_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 14-03_lingua_portuguesa_giancarla_bombonato.pdf, item 3: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 14-03_lingua_portuguesa_giancarla_bombonato.pdf, item 4: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 14-02_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 14-02_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 14-02_lingua_portuguesa_giancarla_bombonato.pdf, item 3: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 14-02_lingua_portuguesa_giancarla_bombonato.pdf, item 4: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 14-02_lingua_portuguesa_giancarla_bombonato.pdf, item 5: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 14-02_lingua_portuguesa_giancarla_bombonato.pdf, item 6: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 14-04_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 14-04_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 14-04_lingua_portuguesa_giancarla_bombonato.pdf, item 3: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 14-04_lingua_portuguesa_giancarla_bombonato.pdf, item 4: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 14-04_lingua_portuguesa_giancarla_bombonato.pdf, item 5: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 14-04_lingua_portuguesa_giancarla_bombonato.pdf, item 6: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 14-05_lingua_portuguesa_giancarla_bombonato.pdf, item 1: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 14-05_lingua_portuguesa_giancarla_bombonato.pdf, item 2: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 14-05_lingua_portuguesa_giancarla_bombonato.pdf, item 3: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 14-05_lingua_portuguesa_giancarla_bombonato.pdf, item 4: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 14-05_lingua_portuguesa_giancarla_bombonato.pdf, item 5: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 14-05_lingua_portuguesa_giancarla_bombonato.pdf, item 6: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 14-05_lingua_portuguesa_giancarla_bombonato.pdf, item 7: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 14-05_lingua_portuguesa_giancarla_bombonato.pdf, item 8: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 15-01_gb_lin_por.pdf, item 1: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 15-01_gb_lin_por.pdf, item 2: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 15-01_gb_lin_por.pdf, item 3: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 15-01_gb_lin_por.pdf, item 4: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 15-01_gb_lin_por.pdf, item 5: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 15-01_gb_lin_por.pdf, item 6: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 15-02_gb_lin_por.pdf, item 1: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 15-02_gb_lin_por.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 15-02_gb_lin_por.pdf, item 3: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 15-02_gb_lin_por.pdf, item 4: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 15-02_gb_lin_por.pdf, item 5: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 15-02_gb_lin_por.pdf, item 6: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 15-03_gb_lin_por.pdf, item 2: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 15-03_gb_lin_por.pdf, item 3: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 15-03_gb_lin_por.pdf, item 4: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 15-03_gb_lin_por.pdf, item 5: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 15-04_gb_lin_por.pdf, item 1: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 15-04_gb_lin_por.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 15-04_gb_lin_por.pdf, item 3: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 15-04_gb_lin_por.pdf, item 4: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 15-04_gb_lin_por.pdf, item 5: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 15-04_gb_lin_por.pdf, item 6: Modelo ou tratamento de edição antiga: conferir MRPR integral, âmbito do órgão e norma posterior. Não liberado como orientação atual.
- 15-05_gb_lin_por.pdf, item 2: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.
- 15-05_gb_lin_por.pdf, item 3: Exige revisão individual da extração, destaques, texto-base, alternativas e gabarito; resposta da apostila não certifica atualização.

Na conciliação com a alteração simultânea da biblioteca, foram mantidos os filtros de coleção/disciplina/lei e a busca de artigos restrita à seleção. O índice amplo de leis fica oculto quando há filtro específico, preservando o isolamento dos resultados e o acesso ao roteiro da disciplina.
