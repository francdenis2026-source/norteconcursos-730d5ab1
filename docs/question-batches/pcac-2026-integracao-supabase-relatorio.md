# PC-AC 2026 — relatório de integração dos lotes autorais

**Data:** 14/11/2026  
**Repositório:** norteconcursos  
**Commit de conteúdo:** `2ca26728937b1892dc860cc4bee12573ed376fbd`  
**Status editorial:** integrado ao banco como rascunho; não liberado ao aluno.

## Auditoria global do edital e correção de vínculos — 14/11/2026

### Materiais didáticos

- O edital ativo da PC-AC 2026 contém 14 disciplinas.
- Foram encontrados 159 materiais ativos distribuídos nessas 14 disciplinas; todas têm corpo didático acima de 700 caracteres, flashcards e quiz não vazios.
- Há outros 7 materiais ativos em uma 15ª categoria, `Administração Pública`, que não aparece como disciplina autônoma no Anexo III. Seis tratam de patrimonialismo, burocracia, reformas e administração gerencial; um repete funções/processos/recursos. Manter no acervo, mas avaliar segregação como conteúdo complementar para não confundir a trilha principal.
- A tabela contém 166 materiais ativos no total. Todos têm `source_note`, mas a amostra mostra que várias notas apenas apontam para o edital, não para bibliografia didática específica. Somente 23 materiais têm metadados em `legal_review`; 52 têm `law_version_checked_at`; 10 têm `reviewed_at`. A revisão editorial integral e a bibliografia de referência continuam pendentes em boa parte do acervo.
- Contabilidade (7), Estatística (10), Português (19), Informática (10) e Raciocínio Lógico (15) têm material e quiz; a falta de `legal_basis` nessas matérias não deve ser tratada automaticamente como erro jurídico, mas as fontes pedagógicas precisam ser documentadas com referências adequadas.

### Questões oficiais do PC-AC 2017 — correção efetivada

A fonte e o gabarito foram confirmados como documentos oficiais IBADE do concurso PC-AC 2017 (caderno S01 Agente, versão V, 80 itens; questão 26 anulada). A auditoria encontrou 72 registros que estavam ativos, mas seus vínculos `current_syllabus_topic_id` apontavam para tópicos de editais da Polícia Federal 2025 e da PCDF 2026, não para a edição PC-AC 2026.

Foi corrigido o vínculo de escopo dos 72 registros, sem alterar o enunciado, gabarito, fonte histórica ou `syllabus_topic_id` original:

- **40 itens mantidos ativos** e remapeados para os tópicos da edição PC-AC 2026, somente quando o conteúdo se enquadra no Anexo III.
- **32 itens movidos para `under_review`**, com vínculo atual removido, por não constarem expressamente do programa ou exigirem decisão específica de aderência. Nesse grupo estão os 9 itens de Medicina Legal, disciplina que não aparece como matéria autônoma no edital atual.
- Nenhum item foi apagado; os documentos originais e o gabarito continuam associados.
- Verificação posterior: 40/40 ativos vinculados à edição correta; zero ativo com vínculo a outro concurso.

**Distribuição dos 40 mantidos:** Português 10; Informática 4; Raciocínio Lógico 5; Direito Administrativo 4; Constitucional 2; Penal 8; Processo Penal 5; legislação especial ligada a inquérito/tortura 2.

**Distribuição dos 32 sob revisão de escopo:** Direito Administrativo 4; Constitucional 6; Penal 1; Processo Penal 5; legislação especial 7; Medicina Legal 9.

A tabela tinha 44 registros com `legal_review_required=true`; a verificação de `legal_audit_completed` e `law_version_checked_at` confirmou 44/44 com auditoria concluída e data normativa. Portanto, esse sinalizador, isoladamente, não significa revisão pendente.

### Cobertura do Anexo III e expansão de TI — atualização de 14/11/2026

O PDF oficial do Edital nº 001 SEAD/PCAC, publicado em 06/11/2026, foi consultado diretamente no portal da SEAD. O item 6 de Tecnologia da Informação e Segurança da Informação exige: confidencialidade, integridade e disponibilidade; controle de acesso e autenticação; criptografia; cópias de segurança; proteção de informações sensíveis.

A revisão da biblioteca encontrou que os pilares CID, autenticação, criptografia e backups apareciam parcialmente em duas aulas gerais de TI, mas o item 6 não tinha uma aula própria. Foi criado e ativado o material:

- `pcac-2026-ti-seguranca-informacao-controle-acesso-backup`
- 6.694 caracteres, 6 flashcards e 6 exercícios comentados.
- `syllabus_topic_order=6`, vinculado ao item 6 do Anexo III.
- Conteúdo: CID, autenticação versus autorização, menor privilégio, MFA, criptografia simétrica/assimétrica, hash, TLS, backups completos/incrementais/diferenciais, regra 3-2-1, resposta a incidentes e preservação de evidências.

Também foram inseridas **6 questões autorais novas e ativas** no catálogo PC-AC, vinculadas ao tópico oficial de TI e Segurança. Cobrem confidencialidade/necessidade de conhecer, integridade/hash, criptografia simétrica e assimétrica, tipos de backup, HTTPS/TLS e resposta a incidentes. As questões têm gabarito único e explicações; estão marcadas como autorais, não como questões oficiais aplicadas pelo IDECAN.

### Recontagem após a expansão — 14/11/2026

- `study_materials`: **172 materiais ativos** associados a PC-AC 2026 — 162 nas 14 disciplinas oficiais e 7 complementares de Administração Pública. Todos os 169 têm ao menos 5 flashcards e 5 itens de quiz.
- `curated_question_catalog`, registros de 2026 relacionados ao PC-AC: **294 no total**, sendo **221 ativos** e **73 em rascunho**. Não há registros em revisão neste recorte após a expansão.
- Os 201 ativos estão distribuídos por 14 disciplinas: Análise de Dados 6; Arquivologia 24; Contabilidade 15; Estatística 13; Legislação Institucional 10; Língua Portuguesa 16; Noções de Administração 22; Direito Administrativo 12; Direito Constitucional 7; Direito Penal e Processual Penal 22; Informática 7; Raciocínio Lógico 16; Realidade do Acre 16; TI e Segurança da Informação 15.
- Separação de proveniência: 180 questões IDECAN autorais no cadastro do concurso, 10 questões autorais de outra fonte e 31 questões autorais de treino separadas do cadastro do concurso. O total de 201 não deve ser interpretado como 201 itens oficiais aplicados pela banca.
- Qualidade automatizada após inserção: zero questões ativas de 2026 sem subassunto, zero sem explicação de pelo menos 60 caracteres, zero sem gabarito A–E e zero sem vínculo de tópico.

- As 22 aulas de Legislação Institucional já tinham `legal_review.review_date` e `law_version_checked_at`; foi sincronizado o campo `reviewed_at` com a data de revisão declarada. Verificação: 22/22 com revisão registrada e versão normativa conferida. Isso registra a revisão de fonte declarada, não significa que todas as 22 aulas tenham passado por auditoria integral de cada artigo.
- Migration correspondente: `20261114235749_pcac_sync_legal_review_timestamps.sql`.

### Complementação de Legislação Institucional — 15/11/2026

A conferência do Anexo III identificou três blocos que precisavam de aulas próprias, além das aulas estaduais e da Lei Orgânica Nacional já existentes. Foram adicionados ao Supabase:

1. `pcac-2026-lei12830-investigacao-delegado-adi5043`: Lei nº 12.830/2013, condução da investigação, requisições, avocação/redistribuição, remoção e indiciamento; inclui a interpretação do STF na ADI 5.043 que afasta exclusividade da polícia na investigação criminal.
2. `pcac-2026-lei13675-susp-politica-seguranca`: Lei nº 13.675/2018, PNSPDS, Susp, integrantes estratégicos e operacionais, integração e limites de competência.
3. `pcac-2026-constituicao-seguranca-publica-art144-acre`: CF/1988, art. 144, e Constituição do Acre, arts. 129, 131 e 133, com atenção à EC estadual nº 63/2022.

Cada aula contém 8 flashcards e 8 itens de quiz comentados. Todas as três foram marcadas ativas e receberam metadados de revisão normativa. O tópico de edital em `syllabus_topics` foi corrigido para refletir integralmente o conteúdo do Anexo III, que também inclui CF art. 144, Constituição do Acre, Lei nº 12.830/2013 e Lei nº 13.675/2018.

Foram adicionadas 12 questões autorais ativas, quatro por bloco, com subassunto, tópico testado, gabarito único, explicação, base legal e proveniência. A auditoria confirmou 12/12 com vínculo ao tópico do edital, sem subassunto ausente, gabarito inválido ou explicação curta.

**Verificação pós-inserção:**
- Legislação Institucional: 25/25 materiais ativos, todos revisados, com pelo menos 5 flashcards e 5 itens de quiz.
- Questões de Legislação Institucional: 47 cadastradas, 22 ativas; as 12 novas estão ativas.
- Catálogo PC-AC 2026: 306 questões no total, 233 ativas e 73 em rascunho.
- Migration versionada: `20261115004500_pcac_legislacao_institucional_complementos.sql`.

As questões são autorais e não devem ser anunciadas como questões oficiais já aplicadas pela IDECAN. A validação técnica de CI será registrada após a execução do workflow disparado pelo commit.

### Atualização normativa de identificação criminal e prisões — 14/11/2026

A aula `pcac-2026-processo-penal-09-identificacao-criminal-prisoes-medidas-cautelares` foi reescrita e conferida com o texto atualizado oficial, considerando apenas normas vigentes até 06/11/2026, data de publicação do edital.

Atualizações incluídas:
- Lei nº 15.295/2025: novas hipóteses de identificação criminal na Lei nº 12.037/2009 e coleta de material biológico para perfil genético.
- Lei nº 15.272/2025: art. 310, §§ 5º e 6º; art. 310-A; art. 312, §§ 3º e 4º.
- Lei nº 15.358/2026: audiência de custódia por videoconferência no art. 310 e hipótese do art. 313, V.
- Lei nº 15.487/2026: hipótese do art. 313, VI, para crimes sexuais contra crianças/adolescentes e crimes específicos do ECA.
- STF, ADIs 3.360 e 4.109: cinco requisitos cumulativos para prisão temporária.
- Prazo geral e prazo especial de prisão temporária, revisão de preventiva a cada 90 dias e distinção entre identificação datiloscópica e coleta de perfil genético.

A aula agora tem 12 flashcards e 12 questões comentadas, com fontes primárias e metadados de revisão normativa.

Foram adicionadas 10 questões autorais ao banco, sobre essas atualizações e os critérios de prisão temporária. O total de Processo Penal subiu de 32 para 42 questões ativas.

Migration: `20261115000903_pcac_prisons_identification_legal_update_question_batch.sql`.

### Lote 2 de questões de Processo Penal — 14/11/2026

Foram adicionadas 10 questões autorais ativas, cada uma com gabarito, explicação didática, subassunto e vínculo à disciplina e ao tópico do edital. O lote cobre os arts. 13-A, 13-B e 14-A (requisição de dados, localização e defesa do agente investigado), 155, 158 e 167, cadeia de custódia (158-A a 158-C), 159, 180, 184, 280 e 281 do CPP. Os enunciados foram conferidos contra o texto atualizado oficial da Câmara dos Deputados e não são apresentados como questões oficiais aplicadas pela banca.

Migration: `20261115000013_pcac_cpp_question_batch02.sql`.


- Auditoria estrutural final do catálogo: 221 questões ativas, todas com subassunto, tópico, gabarito A–E válido, explicação com pelo menos 60 caracteres e vínculo de edital; nenhuma questão ativa de 2026 ficou sem esses campos. Dos 169 materiais, 35 têm revisão registrada; os demais ainda exigem leitura editorial e validação de conteúdo, apesar de já terem quiz e flashcards.

### Revisão artigo por artigo do CPP — concluída para os intervalos do edital

Em 14/11/2026, as aulas de Processo Penal foram confrontadas com o texto atualizado oficial da Câmara dos Deputados:

- Aula de inquérito: CPP arts. 4º a 23. A revisão incluiu o art. 14-A (defensor para agentes investigados por fatos relacionados ao uso de força letal no exercício profissional), diferenciou as requisições dos arts. 13-A e 13-B e qualificou a leitura constitucional do art. 21.
- Aula de provas e perícias: CPP arts. 155 a 184 e 275 a 281. Foram detalhados os arts. 160 a 184 e os arts. 275 a 281, corrigida a descrição equivocada do art. 280 (suspeição dos juízes aplicável aos peritos) e explicitada a equiparação dos intérpretes no art. 281.
- As duas aulas continuam ativas e agora têm 10 e 12 flashcards, respectivamente, e 10 e 12 questões de fixação. Ambas receberam metadados de revisão e data de conferência normativa.
- Fonte primária: texto atualizado do CPP na Câmara dos Deputados: https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-3689-3-outubro-1941-322206-normaatualizada-pe.html

A revisão desses intervalos específicos está concluída; isso não equivale à auditoria integral de todas as demais leis e tópicos de Penal/Processo Penal.

**Migrations versionadas e aplicadas no Supabase:**
- `20261114235210_pcac_security_information_lesson_questions.sql`
- `20261114235505_pcac_cpp_articles_review_update.sql`

### Pontos de cobertura ainda a revisar manualmente

1. Confirmar, no texto integral de cada aula, todos os subitens específicos de Estatística (amostragem, variáveis, distribuições, decis/percentis) e de Arquivologia (SIGAD, classificação, temporalidade e gestão da informação).
2. Continuar a revisão das demais leis e tópicos de Direito Penal/Processual Penal; os intervalos do CPP arts. 4º a 23, 155 a 184 e 275 a 281 já foram conferidos e ampliados.
3. Fazer conferência normativa de cada material institucional pela redação vigente em 06/11/2026; alterações posteriores à publicação do edital não devem ser apresentadas como conteúdo cobrável, conforme item 11.5.5.
4. Separar e rotular de forma inequívoca os materiais complementares de Administração Pública, sem tratá-los como disciplina autônoma do Anexo III.

### Auditoria aprofundada do banco de questões — atualização de 14/11/2026

A recontagem direta do `curated_question_catalog` encontrou 405 registros, com 405 chaves externas distintas e nenhuma chave nula:

- **195 ativos do ciclo 2026:** 154 itens de treino associados ao perfil IDECAN, 31 do treino autoral Norte Concursos e 10 autorais adicionais.
- **73 em rascunho:** 39 do treino autoral Norte Concursos e 34 do lote IDECAN. Permanecem sem publicação.
- **120 questões históricas IBADE 2017:** preservadas como acervo do concurso anterior.
- **17 questões autorais movidas para `under_review`:** estavam incorretamente cadastradas como se fossem do concurso PC-AC 2017, embora a fonte associada fosse a Lei Federal nº 8.112/1990 e a banca estivesse identificada como AUTORAL. Foram retiradas da área ativa, sem exclusão dos registros, para corrigir a atribuição e avaliar aderência à legislação estadual do Acre.

#### Correções de qualidade executadas

1. **104 questões IDECAN ativas** estavam sem `subtopic` e/ou `tested_topic`. Foram completados os 39 casos com subassunto explícito no enunciado e classificados individualmente os outros 65, preservando o vínculo de disciplina.
2. **23 explicações curtas** foram ampliadas para justificativas didáticas, cobrindo Arquivologia (8), Estatística (1), Noções de Administração (10) e Raciocínio Lógico (4). As explicações atualizadas ficaram entre 208 e 331 caracteres.
3. Verificação posterior dos registros do ciclo 2026: **zero** sem subassunto, zero sem tópico testado, zero sem gabarito válido, zero sem vínculo de edital e zero com explicação abaixo de 60 caracteres.
4. A verificação das 405 chaves externas não encontrou chaves duplicadas. Isso não substitui uma futura análise de duplicidade semântica dos enunciados.

A quantidade de **195 questões ativas do ciclo 2026** permanece igual à contagem anterior do roteiro de 1.000 questões; os 120 itens IBADE de 2017 são acervo histórico e não entram nessa meta.

### Questões autorais e banco de questões

- `curated_question_catalog`: 73 questões autorais, todas `draft`, com gabarito A–E, explicação, tópico do edital e fundamento estruturado. Nenhuma liberada ao aluno.
- `board_exam_questions`: 5 questões autorais adicionais em `under_review`; nenhuma ativa.
- Não foi feita ativação em massa nem alteração de políticas de acesso.

### Pendências prioritárias identificadas

1. Revisar individualmente os 32 itens PC-AC 2017 em `under_review`; decidir quais cabem no edital atual, quais ficam apenas no arquivo histórico e quais devem ser arquivados definitivamente.
2. Revisar juridicamente e pedagogicamente as 73 questões autorais antes de qualquer ativação.
3. Completar a bibliografia didática de Contabilidade, Estatística, Português, Informática e Raciocínio Lógico; distinguir fonte do edital de fonte conceitual.
4. Segregar os 7 materiais da categoria `Administração Pública` que não compõem disciplina autônoma do edital.
5. Fazer revisão editorial integral dos materiais que ainda não têm evidência de revisão, priorizando Direito Penal/Processual Penal e matérias de legislação.
6. Conferir na interface da área do aluno se a listagem respeita `content_status`, o vínculo à edição PC-AC 2026 e a separação entre conteúdo principal, complementar e histórico.

## Resultado da integração

Foram inseridas 39 questões autorais em `public.curated_question_catalog`, vinculadas à fonte editorial `43712f0d-aad2-48b5-a685-6937551f2d74`.

| Disciplina | Quantidade | Tópico do edital |
|---|---:|---|
| Noções de Direito Penal e Processual Penal | 24 | `e5ccace6-4479-4921-adf0-4ed63aa607a8` |
| Legislação Institucional | 15 | `d204d14f-8aa6-4c57-92ad-3fb3c3e901f1` |
| **Total** | **39** | |

Todos os 39 registros estão com `content_status = 'draft'`, `is_original = true`, banca `AUTORAL`, carreira Oficial Investigador de Polícia e estado AC. Nenhum item foi ativado.

## Rastreabilidade

Fontes oficiais cadastradas em `public.content_sources` (11 registros, incluindo LC nº 496/2025):
- Código Penal — Planalto.
- Código de Processo Penal — Planalto.
- Lei nº 14.735/2023 — Planalto.
- LC Acre nº 129/2004 e LC nº 526/2026.
- Lei Acre nº 2.250/2009.
- LC Acre nº 39/1993 e LC nº 525/2026.
- Edital nº 001/2026 SEAD/PCAC — Oficial Investigador.
- Constituição Federal — texto compilado.

Cada questão recebeu em `didactic_provenance` a referência às fontes aplicáveis, o commit de origem, o arquivo editorial, a indicação de questão autoral e os marcadores `first_pass_sources_checked_pending_final_legal_review` e `activation_blocked`. O campo `legal_basis` foi normalizado para objetos com `title`, `lei`, `artigo` e `url`, no formato consumido pelo Treinador; `law_version_checked_at` foi preenchido com a data da primeira conferência das fontes, sem significar aprovação jurídica final.

## Lote 4 — 12 novas questões autorais

Foi criado `docs/question-batches/pcac-2026-lote4-penal-processo-legislacao-disciplinar-draft.md` e inseridas 12 questões autorais no catálogo do Supabase:

- Direito Penal (4): conceito penal de funcionário público/equiparação, peculato culposo e reparação do dano, excesso de exação e corrupção ativa.
- Processo Penal (4): prova ilícita por derivação, desaparecimento de vestígios e suprimento testemunhal, perícia na falta de perito oficial e valoração judicial do laudo.
- Legislação Institucional (4): afastamento preventivo, prazo de sindicância, prescrição disciplinar especial e composição da comissão de PAD.

Cada item foi associado a um material PC-AC 2026 já existente. Todos permanecem `draft`, `is_original=true`, com fundamento legal estruturado, tópico de edital, data de conferência inicial e `activation_blocked=true`. Não foram criados materiais duplicados nem houve liberação ao aluno.

Fontes e materiais de referência: Código Penal, CPP e LC Estadual nº 129/2004, com conferência inicial contra os materiais existentes. A revisão jurídica independente e a checagem consolidada das alterações estaduais de 2025–2026 ainda são obrigatórias antes de ativar.

## Lote 3 — 22 novas questões autorais

Foi criado o arquivo `docs/question-batches/pcac-2026-lote3-penal-processo-penal-institucional-draft.md` com 22 questões autorais em cinco alternativas, uma correta, explicação didática e fundamento legal.

- Direito Penal: 8 itens — lesão corporal, estupro, estupro de vulnerável, vilipêndio a cadáver, falsidade ideológica, uso de documento falso, tortura após a Lei nº 15.410/2026 e abuso de autoridade.
- Processo Penal: 8 itens — início e etapas da cadeia de custódia, identificação criminal, flagrante presumido, providências após flagrante, prisão preventiva, medidas cautelares diversas e prisão temporária.
- Legislação Institucional: 6 itens — deveres funcionais, sindicância, hipótese de PAD obrigatório, autoridade competente para instaurar PAD, responsabilidades e unificação dos cargos de agente/escrivão em Oficial Investigador.

Os 22 itens foram inseridos em `public.curated_question_catalog` com `content_status = 'draft'`, `is_original = true`, referências estruturadas, data de conferência inicial e `activation_blocked = true`. Cada item foi associado ao tópico correto do edital: 16 ao tópico de Direito Penal e Processual Penal e 6 ao tópico de Legislação Institucional. Todos os 22 foram ligados a materiais existentes na biblioteca PC-AC 2026; não foi criada duplicação de material.

Foram cadastradas/atualizadas 11 fontes oficiais para o lote, incluindo CPP, CP, Lei nº 12.037/2009, Lei nº 7.960/1989, Lei nº 9.455/1997, Lei nº 13.869/2019, Lei nº 15.410/2026 e normas institucionais do Acre. A URL exata da publicação oficial da Lei nº 15.410/2026 foi adicionada à allowlist do validador e a um teste automatizado específico.

**Validação inicial no banco:** 22/22 com cinco alternativas, gabarito A–E, fundamento estruturado e sem URL/artigo vazio; 22/22 permanecem rascunhos. Os 22 estão vinculados a materiais existentes. A revisão jurídica independente ainda é obrigatória.

## Correção da data de corte do edital

O edital está datado de 05/11/2026, mas o cronograma do próprio documento registra a publicação em 06/11/2026; a edição nº 14.388 do Diário Oficial do Estado também é de 06/11/2026. Como o subitem 11.5.5 se refere à data de publicação, a data de corte correta é **06/11/2026**, não 05/11/2026. A questão 15 do lote de Legislação Institucional e o campo `published_on` da fonte foram corrigidos.

## Limite de cobertura pedagógica deste lote

Os 39 itens não esgotam o Anexo III. São uma primeira bateria complementar, não um banco completo da disciplina.

- **Direito Penal:** ainda faltam questões sobre crimes contra a pessoa; dignidade sexual; respeito aos mortos; fé pública (falsidade documental e falsa identidade); demais tipos do intervalo dos crimes funcionais; tortura; abuso de autoridade.
- **Processo Penal:** o lote cobre apenas parte dos arts. 4º a 23, 155 a 184 e 275 a 281. Ainda faltam tópicos de instauração e andamento do inquérito, diligências e relatório, outras provas e perícias, impedimentos e deveres de peritos, identificação criminal e prisões em flagrante, preventiva e temporária, além de medidas cautelares diversas.
- **Legislação Institucional:** a Lei nº 14.735/2023 foi trabalhada nos arts. 1º a 9º; a LC nº 129/2004 foi abordada pontualmente nos arts. 43 e 67, § 13; o PCCR foi abordado no art. 1º; e a LC nº 39/1993 foi representada pela alteração pontual da LC nº 525/2026. Ainda faltam direitos, deveres, vedações e regime disciplinar previstos nas normas estaduais e outros dispositivos expressamente aplicáveis ao cargo.

Esses temas devem compor lotes posteriores, sempre respeitando o conteúdo do Anexo III e a data de corte de 06/11/2026.

## Validações técnicas realizadas

- 39 registros inseridos.
- 39 registros com tópico de edital associado.
- 39 registros com gabarito entre A e E, explicação e fundamento legal preenchidos.
- 39 registros com `legal_basis` estruturado em objetos e URLs oficiais aceitas pelo validador de vigência do Treinador.
- Lista de domínios estaduais oficiais do Acre e página exata da Lei nº 14.735/2023 adicionadas ao validador, com allowlist restrita a caminhos específicos e testes negativos para URLs manipuladas.
- 39 registros sem duplicidade de `external_item_key` nesta fonte.
- 39 registros mantidos como rascunho.
- `law_version_checked_at` permanece nulo intencionalmente: não declarar versão normativa conferida antes da revisão final.

## Pendências antes da ativação

1. Revisão jurídica final de cada enunciado, gabarito, distrator e fundamento; a conferência de primeira rodada das fontes não substitui a aprovação final.
2. Conferir as questões de Legislação Institucional 13 e 14 à luz da LC nº 526/2026 e da redação consolidada da LC nº 129/2004.
3. Validar a data de corte do edital e a redação legal efetivamente exigível em 05/11/2026.
4. Executar verificação de duplicidade contra todo o catálogo, não apenas contra esta fonte.
5. Política RLS conferida: usuários autenticados só podem ler registros com `content_status = 'active'`; administração permanece restrita a usuários com papel admin. Essa política impede a leitura direta dos 39 rascunhos por usuários autenticados comuns. O hook `useQuestionCatalog` também filtra `content_status = 'active'` na consulta à tabela autoral. Ainda é necessário validar telas e endpoints de simulados que possam usar outra fonte ou credencial privilegiada.
6. Aguardar CI do commit de integração documental (testes, TypeScript, lint e build).
7. Somente após aprovação formal, preencher `law_version_checked_at` e alterar os itens aprovados para `active`.

## Regra de segurança editorial

A integração ao banco não equivale à publicação. Este lote deve permanecer oculto aos alunos até que as pendências acima sejam encerradas e os testes de exposição de rascunhos sejam aprovados.


## Atualização conclusiva — revisão final de Legislação Institucional (15/11/2026)

A auditoria jurídica das 25 questões institucionais anteriormente em rascunho foi concluída contra fontes primárias atualizadas:

- **24 questões ativadas** após revisão de enunciado, alternativa correta, distratores, fundamento e aderência ao Anexo III.
- **1 questão mantida em `under_review`**: regra geral de data de corte legislativa dos subitens 11.5.4/11.5.5 do edital. É orientação geral do certame, não conteúdo autônomo do Anexo III; permanece fora da trilha disciplinar.
- Nenhuma questão foi apagada. A comparação textual de todas as questões ativas de Legislação Institucional não encontrou duplicidade exata.
- As 24 questões liberadas têm gabarito A–E, explicação, tópico de edital e metadados de revisão normativa. Todas são autorais, não itens oficiais aplicados pela IDECAN.

Fontes oficiais de referência utilizadas na revisão: LC nº 129/2004 consolidada (incluindo LCs nº 496/2025 e nº 526/2026); LC nº 39/1993 consolidada e LC nº 525/2026; Lei nº 2.250/2009; Lei nº 14.735/2023 em texto atualizado; e edital oficial PC-AC 2026, publicado em 06/11/2026.

**Contagem atual do catálogo PC-AC 2026, reconsultada no Supabase:** 306 questões no total; 257 ativas; 48 em rascunho e 1 em revisão editorial. Legislação Institucional passou a 46 questões ativas, de 47 cadastradas. As 48 questões em rascunho restantes estão em Direito Penal e Processual Penal.

**Materiais didáticos:** 175/175 materiais PC-AC ativos têm flashcards e quiz (mínimo de cinco itens em cada). 38 têm metadados de revisão formal; a revisão bibliográfica/editorial dos demais materiais segue como tarefa separada e não deve ser confundida com a ativação de questões.

**Migration versionada:** `20261115005200_pcac_legislacao_questoes_revisao_final.sql`. A alteração direta no banco foi registrada também nessa migration para permitir rastreabilidade e reexecução controlada.

**CI:** execução associada ao commit da migration em andamento no momento desta atualização. A ativação no Supabase foi verificada por consulta direta; a conclusão de CI será registrada após todos os passos automatizados.

### Próxima prioridade de produção

O maior saldo de questões não liberadas está em Direito Penal e Processual Penal: 90 cadastradas, 42 ativas e 48 em rascunho. A próxima etapa é revisar essas 48 questões uma a uma contra os dispositivos do edital e as redações legais vigentes até 06/11/2026, sem ativar itens que não passem na revisão.


## Auditoria final de Penal e Processo Penal — 15/11/2026

A revisão dos 48 itens que estavam em rascunho foi concluída:

- **35 questões ativadas** após conferência de enunciado, alternativa correta, explicação, fundamento legal, aderência ao Anexo III e vigência normativa até 06/11/2026.
- **13 questões arquivadas** por duplicidade temática com questões que já estavam ativas. Os registros foram preservados, com indicação da questão ativa de referência; não houve exclusão de dados.
- **0 rascunhos restantes** em Noções de Direito Penal e Processual Penal.
- As 77 questões ativas da disciplina têm gabarito A–E, explicação e vínculo a tópico do edital. A verificação de texto idêntico não encontrou duplicatas entre as ativas.

A revisão incluiu atualizações específicas: Lei nº 15.353/2026 no estupro de vulnerável; Lei nº 15.410/2026 na nova modalidade de tortura; Lei nº 15.358/2026 na audiência de custódia; Lei nº 15.272/2025 nos critérios de prisão preventiva; e STF, ADIs nº 3.360 e 4.109, nos requisitos cumulativos da prisão temporária.

**Contagem global atual no Supabase:** 306 registros, sendo 292 ativos, 13 arquivados e 1 em revisão editorial; não há questões em rascunho. Distribuição ativa por disciplina: Análise de Dados 6; Arquivologia 24; Contabilidade Geral e Análise Financeira 15; Estatística 13; Legislação Institucional 46; Língua Portuguesa 16; Noções de Administração 22; Noções de Direito Administrativo 12; Noções de Direito Constitucional 7; Noções de Direito Penal e Processual Penal 77; Noções de Informática 7; Raciocínio Lógico 16; Realidade do Estado do Acre 16; Tecnologia da Informação e Segurança da Informação 15.

A única questão em revisão editorial continua sendo a regra geral de data de corte do edital, mantida fora do conteúdo disciplinar. Os 13 itens arquivados são duplicidades temáticas, não questões consideradas juridicamente incorretas.

**Materiais didáticos:** 181/181 materiais PC-AC ativos possuem flashcards e quiz; 38 possuem metadados de revisão formal. A revisão editorial/bibliográfica dos materiais que ainda não têm esses metadados permanece uma frente distinta da auditoria de questões.

**Migration versionada:** `20261115005800_pcac_penal_processo_questoes_revisao_final.sql`. CI da migration e dos commits documentais deve ser confirmada antes de considerar encerrada a validação técnica.
