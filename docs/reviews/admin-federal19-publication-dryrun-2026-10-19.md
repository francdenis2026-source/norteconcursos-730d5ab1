# Dry-run — vínculos de edital e comentários dos 19 itens federais (19/10/2026)

**Nada foi gravado.** Plano gerado a partir de leitura do banco, dos editais oficiais da FGV, dos gabaritos definitivos e do texto compilado do Planalto. O detalhe completo (trechos verbatim, comentários e `legal_basis`) está em [o JSON](admin-federal19-publication-dryrun-2026-10-19.json).

## O que seria criado

| Fonte (`content_sources`, tipo `edital`, oficial) | SHA256 do PDF |
|---|---|
| [Edital nº 01/2022 – Concurso Público TCE-TO (retificado em 02/09/2022)](https://conhecimento.fgv.br/sites/default/files/concursos/tce-to_-_edital_retificado_004_-_02092022.pdf) | `6b43ba67128780ec…` |
| [Edital – Concurso Público CGM-Rio 2023 (retificado em 30/01/2023)](https://conhecimento.fgv.br/sites/default/files/concursos/edital_cgm_-_retificado_2.pdf) | `328f186e5dfef1ed…` |
| [Edital SEF/CGE nº 01/2022 – 1ª retificação (06/10/2022)](https://conhecimento.fgv.br/sites/default/files/concursos/1a_retificacao_-_edital-cge_06.10.2022.pdf) | `e5d275067a2d7778…` |
| [Edital nº 01/2023 – Concurso Público ALEMA (retificado em 25/10/2023)](https://conhecimento.fgv.br/sites/default/files/concursos/edital-retificado-4-25.10.2023.pdf) | `c0282d1aba7a52d6…` |

| Edição (`syllabus_editions`) | Tópicos a inserir |
|---|---|
| Tribunal de Contas do Estado do Tocantins — Analista Técnico – Letras (2022) | Noções de Direito Constitucional; Noções de Direito Administrativo |
| Tribunal de Contas do Estado do Tocantins — Auditor de Controle Externo – Ciências Contábeis (2022) | Noções de Direito Constitucional |
| Tribunal de Contas do Estado do Tocantins — Auditor de Controle Externo – Direito (2022) | Direito Constitucional; Direito Administrativo |
| Controladoria Geral do Município do Rio de Janeiro — Técnico de Controle Interno (2023) | Direito Administrativo I; Direito Administrativo II |
| Controladoria Geral do Município do Rio de Janeiro — Contador (2023) | Direito Constitucional |
| Controladoria-Geral do Estado de Santa Catarina — Auditor do Estado – Direito (2022) | Direito Constitucional; Direito Administrativo; Direito Administrativo Sancionador |
| Assembleia Legislativa do Estado do Maranhão — Técnico de Gestão Administrativa – Contador (2023) | Contabilidade Pública (licitações e contratos) |

Os tópicos usam o texto do edital **verbatim**; só os tópicos efetivamente usados por estes 19 itens entram, não o edital inteiro. Nenhuma fonte ou edição já existe no banco (sem conflito de URL ou de chave única).

## Itens

| Item | Cargo | Chave banco = FGV definitivo | Tópico do edital | Situação |
|---|---|---|---|---|
| TCE-TO #21 (`033378c3`) | Analista Técnico – Letras | C = C | Noções de Direito Constitucional | pronto (coberto) |
| TCE-TO #27 (`04722ed5`) | Auditor de Controle Externo – Direito | B = B | Direito Constitucional | pronto (coberto) |
| TCE-TO #32 (`0660c154`) | Analista Técnico – Letras | D = D | Noções de Direito Administrativo | pronto (coberto) |
| CGM-Rio #29 (`18b947a7`) | Técnico de Controle Interno | E = E | Direito Administrativo I | pronto (coberto) |
| TCE-TO #28 (`1933bff6`) | Analista Técnico – Letras | B = B | Noções de Direito Administrativo | pronto (coberto) |
| TCE-TO #24 (`1a9f27c8`) | Auditor de Controle Externo – Ciências Contábeis | D = D | Noções de Direito Constitucional | pronto (coberto) |
| CGE-SC #44 (`2115e829`) | Auditor do Estado – Direito | E = E | Direito Constitucional | pronto (coberto_com_ressalva) |
| CGM-Rio #24 (`26b6b175`) | Contador | E = E | Direito Constitucional | pronto (coberto) |
| CGE-SC #39 (`39babbe1`) | Auditor do Estado – Direito | A = A | Direito Constitucional | pronto (coberto) |
| TCE-TO #26 (`3d17f139`) | Analista Técnico – Letras | E = E | Noções de Direito Constitucional | pronto (coberto) |
| TCE-TO #28 (`4558e3ef`) | Auditor de Controle Externo – Direito | A = A | Direito Administrativo | pronto (coberto) |
| TCE-TO #31 (`97f485d0`) | Analista Técnico – Letras | B = B | Noções de Direito Constitucional | pronto (coberto) |
| CGE-SC #43 (`aabd1019`) | Auditor do Estado – Direito | A = A | Direito Administrativo Sancionador | pronto (coberto) |
| CGM-Rio #47 (`ae444cda`) | Técnico de Controle Interno | B = B | Direito Administrativo II | pronto (coberto) |
| CGM-Rio #30 (`b0a7e713`) | Técnico de Controle Interno | A = A | Direito Administrativo II | pronto_com_pendencia (coberto) |
| ALEMA #45 (`c89b2e81`) | Técnico de Gestão Administrativa – Contador | C = C | Contabilidade Pública (licitações e contratos) | pronto (coberto_com_ressalva) |
| TCE-TO #34 (`d097fd39`) | Analista Técnico – Letras | E = E | Noções de Direito Constitucional | pronto (coberto) |
| CGM-Rio #25 (`da0d6c9d`) | Técnico de Controle Interno | C = C | — | bloqueado (fora_do_edital) |
| CGE-SC #45 (`e57176bb`) | Auditor do Estado – Direito | D = D | Direito Administrativo | pronto (coberto) |

## Não publicar sem decisão sua

- **#44** (2115e829): O edital da CGE-SC não lista regimes previdenciários; o tópico "Servidores públicos" (Direito Constitucional) é o mais próximo. Decisão editorial: aceitar o vínculo ou manter fora.
- **#30** (b0a7e713): Chave A e comentário A/B/C conferem com a Lei 8.429/1992 (Lei 14.230/2021). Alternativas D e E dependem de jurisprudência do STF (ADI 7042/7043) ainda não conferida no site do tribunal; publicar só após essa conferência.
- **#45** (c89b2e81): O edital ALEMA do Contador diz "licitações em todas as suas modalidades e contratos administrativos", sem citar a Lei 14.133; vínculo aceito por abranger o leilão como modalidade.
- **#25** (da0d6c9d): Enunciado e chave conferem com LGPD arts. 42 e 43 e com o gabarito definitivo, mas o edital CGM-Rio limita o tópico a "Capítulos II e IV da Lei nº 13.709/2018"; o art. 42 está no Capítulo VI. Sem tópico do edital que o abranja, o publicador deve continuar bloqueando; não há vínculo honesto a cadastrar.

## Limpeza de importação a fazer na gravação

- `04722ed5` alternativa E termina com "Tipo 1 – Branca – Página 8".
- `26b6b175` alternativa E termina com "Tipo 1 ̶ Branca – Página 8".
- `39babbe1` alternativa E termina com "Direito Administrativo" (título da disciplina seguinte).

## Resultado

- 19/19 chaves do banco coincidem com o gabarito definitivo (nenhuma anulada).
- 17 prontos para vínculo + comentário, 1 pronto com pendência de jurisprudência (`b0a7e713`), 1 bloqueado por estar fora do edital (`da0d6c9d`).
- Comentários e `legal_basis` já redigidos para 18 itens; `law_version_checked_at`/`verified_at` seriam gravados só na aplicação, depois da sua confirmação.

## Aplicação confirmada (19/10/2026)

Gravados 4 fontes de edital, 7 edições, 12 tópicos e 17 questões (`active`), com leitura de confirmação: enunciados, chaves e conjuntos de alternativas preservados, vínculo com edição ativa de fonte `edital` oficial, comentário e `legal_basis` gravados, resíduos de importação removidos nas três alternativas E. `b0a7e713` (jurisprudência STF) e `da0d6c9d` (fora do edital) permanecem `under_review`.
