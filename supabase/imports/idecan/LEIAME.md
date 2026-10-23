# Questões da IDECAN (importadas de PDFs oficiais)

Aplicar no SQL Editor do Supabase (a tabela `board_exam_questions` já existe), um arquivo por prova; podem ser rodados mais de uma vez:

- `pcsc_agente_2026.sql`: PC SC, Agente de Polícia Civil, caderno B (92 questões, gabarito definitivo)
- `pmsc_aluno_soldado_2026.sql`: PMSC (Polícia Militar de Santa Catarina), Aluno-Soldado Temporário (QPTPM), caderno A (37 questões, gabarito **definitivo** — conferido em antigo-concurso.idecan.org.br em 22/10/2026; itens 5 e 42 foram anulados no definitivo e ficaram fora da carga; item 6 teve a resposta corrigida de D para A). **Atenção**: `source_url`/parte do `review_note` ainda referenciam um mirror do qconcursos.com cujo nome de arquivo diz "cbm-sc" — isso é um erro de rotulagem do mirror, não deste banco: o conteúdo das questões foi confirmado como sendo do concurso **PMSC** (Polícia Militar, Edital nº 200/CCP/2025, concurso IDECAN ID 207), não do CBMSC (Corpo de Bombeiros, Edital 002/2025/DP/CBMSC, concurso ID 204, que é uma prova totalmente diferente, de 40 itens). Ver commit da conferência de 22/10/2026 para os detalhes.
- `cbmmg_cadete_2026.sql`: CBMMG, CFO BM 2027 Cadete, caderno A (46 questões, gabarito **definitivo** — conferido em antigo-concurso.idecan.org.br em 22/10/2026, 100% de correspondência; item 11, anulado no definitivo, já estava corretamente fora da carga)
- `pcsc_escrivao_2026.sql`: PC SC, Escrivão de Polícia Civil, caderno Tipo A (98 questões, gabarito **definitivo** — conferido em antigo-concurso.idecan.org.br em 22/10/2026; itens 24 e 96 foram anulados no definitivo e ficaram fora da carga)
- `corrigir_pmsc_gabarito_2026.sql`: script de correção idempotente para quem já aplicou uma versão anterior de `pmsc_aluno_soldado_2026.sql` (remove os itens 5 e 42, corrige a resposta do item 6)
- `ativar_pcsc_escrivao.sql`: ativa as 98 questões de Escrivão (revisão individual concluída em 22/10/2026 — texto completo em todas as linhas, gabarito definitivo conferido contra a fonte oficial, legislação de cada questão jurídica reconferida na importação)

`idecan_questions.json` traz as mesmas questões para a tela "Questões de bancas".

Todas entram como `under_review`. Fora desta carga, de propósito: legislação local (leis e decretos estaduais de SC e MG), questões anuladas, sem gabarito (CBMES), com figura ausente ou com extração incompleta.

Conferência legislativa de 22/10/2026: as questões de lei trazem a norma conferida em `legal_basis` e a data em `law_version_checked_at`. "Sem alteração localizada" significa que não achei mudança, sem reler todo o texto. Isso não substitui a decisão individual exigida em `CONTENT_GOVERNANCE.md`. Antes de ativar, confirme o gabarito definitivo (PMSC) e o vínculo ao edital.

Conferência de gabaritos definitivos (22/10/2026, via antigo-concurso.idecan.org.br): **PC SC Agente** — gabarito já importado batia 100% com o definitivo (92/92 itens conferidos, zero divergência); o item 60 (anulado) já estava corretamente fora da carga. **PC SC Escrivão** — 2 itens (24 e 96) mudaram de resposta válida (preliminar) para anulados (definitivo); removidos da carga e dos 98 itens restantes, zero divergência contra o definitivo.

Conferência de gabaritos definitivos (22/10/2026, continuação — CBMMG e "PMSC"): **CBMMG Cadete BM (CFO BM 2027, concurso IDECAN ID 224, Edital 09/2026)** — 46/46 itens carregados batem 100% com o gabarito oficial definitivo (Ato nº 12.448/2026); o único item anulado no definitivo (item 11) já não estava na carga. **PMSC Aluno-Soldado Temporário (concurso IDECAN ID 207, Edital nº 200/CCP/2025)** — 34 dos 37 itens batiam com o definitivo; os itens 5 e 42 foram anulados no definitivo (tinham resposta válida no preliminar) e foram removidos da carga; o item 6 teve a resposta corrigida de D (preliminar) para A (definitivo). Além da conferência de gabarito, foi identificado e corrigido um problema de **identificação do concurso**: o arquivo `pmsc_aluno_soldado_2026.sql` sempre foi, de fato, do concurso da PMSC (Polícia Militar de SC, Edital 200/CCP/2025) — confirmado pelo cabeçalho oficial do gabarito ("POLÍCIA MILITAR DO ESTADO DE SANTA CATARINA (PMSC)", cargo "01100 – ALUNO-SOLDADO TEMPORÁRIO (QPTPM)") e pela grade de disciplinas do edital (Língua Portuguesa, Raciocínio Lógico e Matemático, Geografia de SC, Informática, Legislação Institucional, Legislação Penal, Legislação Penal Militar, Constituição Federal, Código de Trânsito — 50 itens), que bate exatamente com as disciplinas e numeração das questões já carregadas. O `source_url`/`answer_key_url` originais (mirror qconcursos.com) é que estavam mal rotulados com o nome "cbm-sc" — provavelmente um erro do próprio mirror, não um problema de dados nosso — pois o concurso CBMSC real (Corpo de Bombeiros, Edital 002/2025/DP/CBMSC, concurso IDECAN ID 204) é uma prova totalmente diferente, de apenas 40 itens, com disciplinas de Língua Portuguesa, Informática, Legislação Institucional, Combate a Incêndio e Primeiros Socorros — nenhuma relação com o conteúdo carregado. Os campos `contest_name`/`career_name`/`state` já estavam corretos (PMSC); não foram alterados.

Revisão individual da PC SC Escrivão para ativação (22/10/2026, a pedido do Franc): confirmado que as 98 linhas têm texto completo (sem placeholder, figura ausente ou trecho pendente), o gabarito já é o definitivo (conferência acima) e a legislação de cada questão jurídica (Direito Penal, Processual Penal, Administrativo, Constitucional, Direitos Humanos, Legislação Institucional) já foi reconferida na importação original (`legal_basis`/`law_version_checked_at` por linha, 22/10/2026). `ativar_pcsc_escrivao.sql` ativa as 98 questões.

## Inventário para pesquisa da PC-AC

Consulte [auditoria-local.md](auditoria-local.md) e o correspondente JSON para o inventário reproduzível do arquivo local. Gere novamente com:

```sh
node --import ./scripts/alias.mjs scripts/idecan/audit-corpus.mjs
```

O relatório separa Polícia Civil de PM/bombeiros, usa apenas os itens retidos como denominador e identifica referências espelhadas, páginas de concurso e URL genérica de gabarito. Não certifica metadados anteriores, não consulta o banco e não importa nem ativa questões. A coleta adicional no portal de concursos concluídos depende de acesso de rede aos domínios oficiais. As pendências de fonte e de revisão devem ser resolvidas antes de produzir estatísticas de incidência ou publicar conteúdo.

## Nova coleta: PC-CE 2021

Foram preparados dois pacotes privados com 100 itens cada (Inspetor e Escrivão, Tipo B), separados do JSON legado. Leia [a coleta e suas pendências](PCAC_COLETA_PC_CE_2021.md) antes de usar o [SQL de carga privada](pcce_2021_acervo_privado.sql). O gabarito de Inspetor tem divergência entre o título do link e o cabeçalho interno; os textos jurídicos são históricos e nenhum dos 200 itens foi aprovado para publicação. A carga remota ainda não foi executada.

O nome genérico do arquivo do CBMMG foi validado pelo download: trata-se de um PDF oficial acessível, não de um placeholder. O inventário anterior foi corrigido para distinguir nome genérico de URL inválida; a evidência do download consta em `fontes_verificadas_2026-10-22.json`.

## Primeira revisão individual — 23/10/2026

Consulte [o resultado da primeira revisão](revisao-2026-10-23/LEIAME.md): 20 pareceres de Português com publicação retida, três anulações definitivas de Escrivão e 177 itens ainda pendentes. O [SQL de registro da revisão](revisao-2026-10-23/aplicar-primeira-revisao.sql) é separado da carga inicial e preserva a auditoria e decisões concorrentes. Nenhuma questão foi autorizada para publicação neste lote.

## Continuação individual — 23/10/2026

Os [177 pareceres de continuação](continuacao-2026-10-23/LEIAME.md) completam a primeira passagem das 200 posições. O estado proposto é 192 pareceres retidos, cinco itens superados para treino atual e três anulações confirmadas, sem aprovação para publicação. O [SQL único da continuação](continuacao-2026-10-23/aplicar-continuacao.sql) preserva as 23 decisões anteriores. Conferência integral no Planalto, jurisprudência, contexto final e vínculo ao edital permanecem explicitamente pendentes.
