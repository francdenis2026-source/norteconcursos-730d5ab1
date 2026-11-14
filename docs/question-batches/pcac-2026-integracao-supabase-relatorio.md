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

- `study_materials`: **167 materiais ativos** associados a PC-AC 2026 — 160 nas 14 disciplinas oficiais (incluída a nova aula de TI) e 7 complementares de Administração Pública. Todos os 167 têm ao menos 5 flashcards e 5 itens de quiz.
- `curated_question_catalog`, registros de 2026 relacionados ao PC-AC: **274 no total**, sendo **201 ativos** e **73 em rascunho**. Não há registros em revisão neste recorte após a expansão.
- Os 201 ativos estão distribuídos por 14 disciplinas: Análise de Dados 6; Arquivologia 24; Contabilidade 15; Estatística 13; Legislação Institucional 10; Língua Portuguesa 16; Noções de Administração 22; Direito Administrativo 12; Direito Constitucional 7; Direito Penal e Processual Penal 22; Informática 7; Raciocínio Lógico 16; Realidade do Acre 16; TI e Segurança da Informação 15.
- Separação de proveniência: 160 questões IDECAN autorais no cadastro do concurso, 10 questões autorais de outra fonte e 31 questões autorais de treino separadas do cadastro do concurso. O total de 201 não deve ser interpretado como 201 itens oficiais aplicados pela banca.
- Qualidade automatizada após inserção: zero questões ativas de 2026 sem subassunto, zero sem explicação de pelo menos 60 caracteres, zero sem gabarito A–E e zero sem vínculo de tópico.

### Pontos de cobertura ainda a revisar manualmente

1. Confirmar, no texto integral de cada aula, todos os subitens específicos de Estatística (amostragem, variáveis, distribuições, decis/percentis) e de Arquivologia (SIGAD, classificação, temporalidade e gestão da informação).
2. Revisar o conteúdo de Direito Penal/Processual Penal, em especial os arts. 275 a 281 do CPP (peritos e intérpretes), e conferir a cobertura literal de todos os intervalos indicados no edital.
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
