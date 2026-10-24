# Direito Administrativo — integração de materiais de 24/10/2026

## Resultado publicado no Supabase

26 PDFs, 166 páginas, confrontados com os 12 materiais já existentes de Direito Administrativo e 786 questões públicas da disciplina.

- Dois módulos novos: fundamentos/fontes/regime jurídico e organização administrativa/direta/indireta/órgãos.
- Sete módulos existentes ampliados: poderes, ingresso e vínculos de agentes, controle, licitações, responsabilidade civil, atos e processo administrativo federal.
- Quarenta exercícios locais novos, vinte em cada módulo novo. As nove áreas finais têm 180 exercícios locais.
- Sete revisões de prática reparadas: os registros anteriores não tinham hash, data e escopo completos e falhavam no validador real da plataforma. As baterias foram conferidas, oito itens/comentários delimitados e as demais questões preservadas. O validador não foi afrouxado.
- Nove casos resolvidos acrescentados; os casos anteriores foram preservados, com versões antigas arquivadas e hash associado ao novo texto.
- 69 questões catalogadas e ativas no Treinador como material didático, sem banca oficial ou alegação de autoria original.
- 78 candidatos pendentes de revisão individual de extração/fundamentação e 12 itens de regime revogado, ambos fora do treino. Os 159 candidatos de extração não representam uma certificação de quantidade de questões oficiais nos PDFs.

Os exercícios locais e os registros do catálogo são conjuntos diferentes; não somar esses números como total global de questões distintas. Nenhum contador foi alterado manualmente.

## Como encontrar

Materiais → Direito Administrativo. Novas rotas:

- `/dashboard/library/administrativo-fundamentos-fontes-regime-juridico`
- `/dashboard/library/administrativo-organizacao-direta-indireta-orgaos`

Treinador → disciplina Direito Administrativo → origem Materiais didáticos catalogados. As questões levam documento, editora/origem, item, página quando identificada, data de revisão e fundamento oficial.

## Atualização e limites

A redação incorporada é própria e não republica o texto integral, diagramação, propaganda, nomes de professores ou identidade visual das apostilas. A origem dos exercícios permanece registrada: retirar propaganda não significa declarar autoria original da plataforma.

Conferidos em fontes oficiais: Constituição compilada; Decreto-Lei 200; Leis 9.784, 8.112, 14.133, 13.303 e 8.987; edital PCPI cadastrado; notícia oficial do STF sobre a ADI 2.135. `sources.json` contém endereços, data e SHA-256 do conteúdo efetivamente consultado.

Correções centrais:

- Regime jurídico único: ADI 2.135, efeitos para contratações futuras, preservando os vínculos atuais. Sem conversão automática nem dispensa de concurso/lei.
- Acumulação por professor: CF, art. 37, XVI, “b”, após EC 138/2025, com outro cargo de qualquer natureza, respeitadas condições constitucionais.
- Licitações: Lei 14.133 como regime geral atual; Lei 8.666, Lei 10.520 e dispositivos do RDC revogados no marco legal, sem apagar contratos válidos do regime de transição. Não combinar regimes.
- Convite e tomada de preços não são modalidades do art. 28 atual; registro de preços é procedimento auxiliar. Atualizados edital, desempate e contratação direta.
- Fundação estatal, precatórios e regime de estatais não foram generalizados a partir de afirmações antigas. Distinguidos capital votante, personalidade, hierarquia e supervisão finalística.
- Lei 9.784: decisão coordenada, prazos e recurso/revisão sancionadora, em vez de usar a apostila anterior a 2021 como texto completo atual.

A revisão nova abrange complementos, exercícios locais e as 69 questões liberadas. Ela não certifica novamente toda jurisprudência preexistente dos módulos, nem todas as questões identificadas nos PDFs. Itens pendentes e histórico obsoleto ficam em auditoria administrativa protegida por RLS.

A comparação de duplicidade foi textual normalizada, considerando apoio/opções, no catálogo público da disciplina. Não é certificação de equivalência semântica de toda paráfrase. Nenhuma duplicata textual foi identificada entre os 69 itens efetivamente publicados e os registros comparados.

## SQLs e comprovação

1. `01-publish-materials.sql`: fontes, materiais e versões de casos, com bloqueio e guardas contra sobrescrita concorrente.
2. `02-publish-questions.sql`: questões e auditoria; itens pendentes/obsoletos nunca inseridos no catálogo público.
3. `03-verify-publication.sql`: conferência independente de materiais, questões, auditoria e edital.

Os dois SQLs de publicação já foram aplicados juntos numa transação. `publication-result.json` comprova a execução; `verification-result.json` contém a leitura independente. Não é necessário o usuário reaplicá-los. Os pacotes mantêm versões anteriores esperadas para auditoria e proteção de concorrência.

O administrador indicado pelo usuário foi usado como responsável pela publicação assistida. Não se atribui a terceiros aprovação humana independente.

A repetição simulada após a publicação também passou, sem duplicação (`idempotency-result.json`).

Oito testes passaram, incluindo o validador efetivo de práticas, parser de gabaritos, preservação de casos e exclusão de pendências. Alteração apenas de conteúdo/SQL e teste de integridade, sem mudança na interface; não houve inspeção visual de navegador nesta execução.

## Classificação individual das pendências

- **needs_review** — 01-04_AlfaCon--orgaos-publicos.pdf, item 2: A capacidade processual excepcional do órgão exige referência processual e jurisprudência específica, além da definição legal de órgão.
- **needs_review** — 01-04_AlfaCon--orgaos-publicos.pdf, item 3: Conferir precedente oficial sobre legitimidade na ação indenizatória e o alcance da formulação absoluta.
- **needs_review** — 01-04_AlfaCon--orgaos-publicos.pdf, item 5: Classificação doutrinária de posição estatal; exige delimitação independente antes de atribuir gabarito.
- **needs_review** — 02-02_AlfaCon--agentes-publicos-parte-2.pdf, item 2: A Súmula Vinculante 13 e seus recortes precisam ser verificados na página oficial do tribunal antes da liberação.
- **needs_review** — 02-03_AlfaCon--poderes-administrativos.pdf, item 4: A autoexecutoriedade de interdição exige hipótese e condições legais; o enunciado genérico não basta.
- **needs_review** — 03-01_AlfaCon--controle-da-administracao-publica-introducao-e-conceito-classificacoes-quanto-a-origem-controle-interno-controle-externo-controle-popular-exercicios-de-controle-da-administracao-publica.pdf, item 2: O gabarito depende do critério doutrinário adotado para controle interno/externo da supervisão da indireta; não ativar sem delimitação.
- **needs_review** — 03-05_AlfaCon--controle-da-administracao-publica-anulacao-e-revogacao-exercicios-de-controle-da-administracao-publica.pdf, item 1: O enunciado cita Súmula 473; conferir a fonte oficial e limites de efeitos da anulação antes de ativar.
- **needs_review** — 03-04_AlfaCon--controle-da-administracao-publica-especies-de-controle-controle-legislativo-controle-judicial-exercicios-de-controle-da-administracao-publica.pdf, item 3: Delimitar a sustação de contratos e as competências do art. 71, §§ 1º e 2º; redação abreviada pode induzir conclusão absoluta.
- **needs_review** — 03-04_AlfaCon--controle-da-administracao-publica-especies-de-controle-controle-legislativo-controle-judicial-exercicios-de-controle-da-administracao-publica.pdf, item 4: Alternativas sobre controle técnico/discricionário exigem delimitar o precedente e não confundir mérito e juridicidade.
- **obsolete** — 04-01_AlfaCon--licitacao-regime-juridico-prerrogativas-e-sujeicoes-competencia-legislativa-principios-lei-n-8-666-96.pdf, item 1: Exercício ancorado no regime licitatório revogado. Preservado apenas na auditoria; não liberado como regra vigente.
- **obsolete** — 04-01_AlfaCon--licitacao-regime-juridico-prerrogativas-e-sujeicoes-competencia-legislativa-principios-lei-n-8-666-96.pdf, item 2: Exercício ancorado no regime licitatório revogado. Preservado apenas na auditoria; não liberado como regra vigente.
- **obsolete** — 04-04_AlfaCon--licitacao-criterios-de-desempate-e-margem-de-preferencia.pdf, item 1: Exercício ancorado no regime licitatório revogado. Preservado apenas na auditoria; não liberado como regra vigente.
- **obsolete** — 04-04_AlfaCon--licitacao-criterios-de-desempate-e-margem-de-preferencia.pdf, item 2: Exercício ancorado no regime licitatório revogado. Preservado apenas na auditoria; não liberado como regra vigente.
- **obsolete** — 04-03_AlfaCon--licitacao-conceito-e-objetivos-e-disposicoes-constitucionais-artigos-37-173-e-175-da-cf.pdf, item 1: Exercício ancorado no regime licitatório revogado. Preservado apenas na auditoria; não liberado como regra vigente.
- **obsolete** — 05-01_AlfaCon--licitacao-modalidades-gerais.pdf, item 1: Exercício ancorado no regime licitatório revogado. Preservado apenas na auditoria; não liberado como regra vigente.
- **obsolete** — 05-01_AlfaCon--licitacao-modalidades-gerais.pdf, item 2: Exercício ancorado no regime licitatório revogado. Preservado apenas na auditoria; não liberado como regra vigente.
- **obsolete** — 05-03_AlfaCon--licitacao-licitacao-sistema-de-registro-de-precos-parte-1-hipoteses-de-contratacao-direta-licitacao-dispensada-licitacao-dispensavel-licitacao-inexigivel.pdf, item 1: Exercício ancorado no regime licitatório revogado. Preservado apenas na auditoria; não liberado como regra vigente.
- **obsolete** — 05-03_AlfaCon--licitacao-licitacao-sistema-de-registro-de-precos-parte-1-hipoteses-de-contratacao-direta-licitacao-dispensada-licitacao-dispensavel-licitacao-inexigivel.pdf, item 2: Exercício ancorado no regime licitatório revogado. Preservado apenas na auditoria; não liberado como regra vigente.
- **obsolete** — 05-03_AlfaCon--licitacao-licitacao-sistema-de-registro-de-precos-parte-1-hipoteses-de-contratacao-direta-licitacao-dispensada-licitacao-dispensavel-licitacao-inexigivel.pdf, item 3: Exercício ancorado no regime licitatório revogado. Preservado apenas na auditoria; não liberado como regra vigente.
- **needs_review** — 06-01_AlfaCon--parte-i-responsabilidade-civil-do-estado-responsabilidade-civil-do-estado-no-direito-brasileiro-responsabilidade-por-ato-comissivo-do-estado-responsabilidade-por-omissao-do-e.pdf, item 2: Caso de furto de veículo sob guarda estatal exige análise de dever de custódia, nexo e precedentes; gabarito antigo insuficiente.
- **needs_review** — 06-01_AlfaCon--parte-i-responsabilidade-civil-do-estado-responsabilidade-civil-do-estado-no-direito-brasileiro-responsabilidade-por-ato-comissivo-do-estado-responsabilidade-por-omissao-do-e.pdf, item 3: A combinação de omissão, atividade econômica e serviço público exige recorte jurídico e jurisprudencial mais preciso.
- **obsolete** — 05-02_AlfaCon--licitacao-modalidades-especificas.pdf, item 1: Exercício ancorado no regime licitatório revogado. Preservado apenas na auditoria; não liberado como regra vigente.
- **obsolete** — 05-02_AlfaCon--licitacao-modalidades-especificas.pdf, item 2: Exercício ancorado no regime licitatório revogado. Preservado apenas na auditoria; não liberado como regra vigente.
- **needs_review** — 06-04_AlfaCon--atos-administrativos-parte-ii-teoria-dos-atos-conceitos-classificacao-especies-elementos-requisitos-e-atributos-do-ato-administrativo-teoria-dos-motivo.pdf, item 3: Tipicidade como atributo é classificação doutrinária; explicitar alcance sem tratá-la como lista legal.
- **needs_review** — 06-03_AlfaCon--atos-administrativos-parte-i-teoria-dos-atos-conceitos-classificacao-especies-elementos-requisitos-e-atributos-do-ato-administrativo-teoria.pdf, item 1: A classificação dos elementos do ato exige explicação doutrinária e fonte legal pertinente ao recorte.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 1: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 2: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 3: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 4: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 5: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 6: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 7: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 10: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 11: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 12: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 13: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 14: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 15: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 16: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 17: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 18: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 19: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 20: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 21: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 22: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 23: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 25: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 26: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 27: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 28: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 29: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 30: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 31: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 32: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 33: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 34: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 35: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 36: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 37: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 38: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 40: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 41: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 42: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 43: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 44: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 45: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 46: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 48: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 49: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 50: Depósito prévio e caução exigem distinguir despesas, garantia e Súmula Vinculante 21, com fonte oficial específica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 52: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 53: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 54: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 55: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 56: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 57: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 59: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 60: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 61: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 62: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 63: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 64: Reclamação ao STF e esgotamento de vias administrativas exigem legislação e precedente oficial, além da questão antiga.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 65: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 66: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 67: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 68: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 69: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 70: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 72: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
- **needs_review** — Lei 9784 Atualizada e Esquematizada.pdf, item 73: Exige revisão individual da extração, alternativas e comentário contra o texto atual; gabarito da apostila não certifica revisão jurídica.
