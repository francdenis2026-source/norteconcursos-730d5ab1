# PC-AC 2026 — relatório de integração dos lotes autorais

**Data:** 14/11/2026  
**Repositório:** norteconcursos  
**Commit de conteúdo:** `2ca26728937b1892dc860cc4bee12573ed376fbd`  
**Status editorial:** integrado ao banco como rascunho; não liberado ao aluno.

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
