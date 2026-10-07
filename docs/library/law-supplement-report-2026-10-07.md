# Complementos jurídicos da biblioteca — 07/10/2026

Os complementos foram publicados no Supabase do Norte Concursos e conferidos por leitura posterior de todos os campos previstos nos pacotes. A biblioteca passou de 143 para **147 materiais**, de 37 para **39 percursos jurídicos** e de 3.574 para **3.640 dispositivos**. Este incremento não representa novas questões inseridas no banco geral de questões.

## Conteúdo publicado

| Material | Conteúdo e prática |
| --- | --- |
| Lei antifacção — crimes, investigação e patrimônio | Conceitos, dois tipos penais, investigação, medidas patrimoniais, mapa completo, aplicação no tempo, quatro casos comentados e quatro cartões. Percurso dos 44 artigos externos da Lei 15.358/2026, com o art. 43 vetado excluído da leitura ativa. |
| Confissão — Súmulas 545 e 630 revisadas | Comparação de redações, retratação, confissão parcial e qualificada, modulação, três casos, oito itens de certo/errado de fixação e quatro cartões. |
| Pensão alimentícia — casos e atualização de 2026 | Distinção entre prestações, valor, desemprego, escritura vitalícia, execução, quatro casos, linha do tempo e quatro cartões. A Lei 15.479/2026 aparece como futura: entrada em vigor em 30/07/2027. |
| Pensão especial por feminicídio — requisitos e exemplos | Beneficiários, renda, rateio, documentação, tutela estatal e manutenção, quatro casos e quatro cartões. Percurso completo dos 22 artigos do Decreto 12.636/2025. |

Além dos novos materiais, foram complementados oito resumos existentes: princípios penais, dois materiais de drogas, organizações criminosas, Maria da Penha, dois materiais de processo civil e trânsito. Cinco percursos existentes receberam os avisos correspondentes. O CTB contém aviso explícito de que a MP 1.360/2026 teve vigência encerrada em 15/09/2026, conforme o Ato Declaratório 96/2026.

## Fontes e alcance

As normas foram conferidas no Planalto; a jurisprudência, nas publicações oficiais do STJ e do STF. Foram cadastradas onze fontes novas, preservadas quatro fontes existentes e mantidas as evidências de leitura locais. Cada material contém suas URLs e data de conferência. O pacote registra o texto do ato modificador junto ao respectivo artigo, sem transformar artigos citados de outros diplomas em artigos externos da nova lei.

O conteúdo complementar está associado ao tópico de legislação especial do edital PCDF Delegado 2026 cadastrado. A relação é de aprofundamento de organizações criminosas e proteção da mulher; não afirma que a Lei 15.358/2026, o benefício especial ou todo o Direito de Família constem expressamente no programa. Os três materiais complementares não publicam conjuntos de questões ativas. A fixação de confissão está ligada ao tópico cadastrado de Direito Penal da PF. Nenhuma questão foi criada em `question_bank`.

A pensão alimentícia, a pensão especial por feminicídio e a pensão previdenciária por morte são diferenciadas. O material não constitui um curso de todos os regimes previdenciários. A notícia sobre a ADI 7952 evidencia ajuizamento; não comprova suspensão ou decisão definitiva sobre a lei antifacção. O levantamento não declara cobertura de toda a jurisprudência recente.

## Publicação, preservação e testes

- Quatro materiais, dois percursos e 66 dispositivos inseridos; oito materiais e cinco percursos existentes atualizados.
- Todos os novos textos e campos conferidos por leitura posterior. Os 135 materiais não abrangidos pela alteração permaneceram iguais ao snapshot anterior; os 126 conjuntos de exemplos mantiveram seu conteúdo. Os dispositivos anteriores foram comparados sem divergência.
- Oito fingerprints de exemplos foram alinhados aos resumos acrescidos de links, sem reescrever os exemplos.
- Reexecução real: zero materiais, percursos ou dispositivos duplicados; oito revisões preservadas, com leitura posterior validada.
- `npm test`: 38 testes aprovados. `npm run typecheck` e `npm run build`: aprovados. A renderização dos links foi verificada em HTML de servidor; esta etapa não incluiu conferência visual em navegador autenticado.

O renderizador passa a aceitar links para materiais e percursos da biblioteca, além de fontes oficiais permitidas, recusando scripts e destinos enganosos. O quadro de atualização diferencia vigência encerrada de regra futura, norma vigente e referência jurisprudencial.

Os importadores existentes recebem os pacotes `law-supplement-sources`, `law-supplement-materials`, `law-supplement-paths` e `law-supplement-review`, nessa ordem. Todos aceitam `--dry-run`; as credenciais são fornecidas somente no ambiente da sessão. A revisão usa precondições de identidade, data e hash e aborta alterações concorrentes. Não foi necessária nova migração de esquema.

O Git contém materiais autorais, textos normativos públicos, metadados de fontes, testes, alterações de interface e este relatório. Snapshots do banco e HTML de evidência ficam em outputs locais; não há tokens nem PDFs privados no commit.
