# Revisão aplicada: Antifacção e atendimento na Lei de Drogas

Publicadas e confirmadas 66 revisões de explicações existentes: 41 da Antifacção e 25 da Lei de Drogas. Os pacotes retêm as versões anteriores, hashes do texto oficial e escopo explícito. A conferência independente de oito tabelas confirmou os campos autorais e metadados, preservou as outras 3.447 explicações e não encontrou alterações nas sete tabelas protegidas. Não houve criação de material duplicado nem importação de questões ao treinador.

## Antifacção

Foram revisados os arts. 3–42 e 44, excluído o art. 43 vetado. Os arts. 1 e 2 conservaram a revisão anterior, limitada às definições/comparações. Os 43 itens atuais agora têm metadados de revisão, mas isso não certifica todos os parágrafos, toda a jurisprudência ou a constitucionalidade integral da lei.

- Inquérito e decisões: 90/270 dias; urgência em 24 horas simultâneas; revisão ministerial com marcos próprios. Prazo vencido não autoriza prisão indefinida.
- Medidas patrimoniais: contraditório, origem lícita, terceiros de boa-fé, administração, intervenção e destinações são hipóteses diferentes. Contas trimestrais do interventor não são prazo geral do administrador de bens.
- Direitos políticos, custódia, sigilo da defesa, cadastro, benefícios e perda civil: a literalidade não resolve as ADIs. Exercícios automáticos foram limitados nesses trechos; os exercícios autorais conservam ressalvas.
- Alterações em CP, CPP, LEP, Drogas, Armas, Lavagem, Código Eleitoral, FNSP e Apostas foram confrontadas com os diplomas compilados. A reprodução de março não é a redação integral atual de cada lei. O CP teve outras alterações em 2026; a LEP também recebeu mudanças posteriores. Não há revisão integral desses outros percursos por simples remissão.
- A MP 1.394, publicada em 25/09/2026, alterou o regime de apostas, inclusive art. 21-A, e prevê revogações e transição. O art. 42 da Antifacção não deve gerar exercícios que ensinem automaticamente as transcrições de março como regime geral atual.
- Assinatura em 24/03/2026, publicação/vigência em 25/03/2026, prazos de implementação e data desta conferência são marcos diferentes.

[Lei 15.358 no Planalto](https://www.planalto.gov.br/ccivil_03/_Ato2023-2026/2026/Lei/L15358.htm), [MP 1.394](https://www.planalto.gov.br/ccivil_03/_Ato2023-2026/2026/Mpv/mpv1394.htm), [STF: discussões sobre as ADIs](https://noticias.stf.jus.br/postsnoticias/stf-reune-ministerio-publico-e-defensorias-publicas-para-discutir-lei-antifaccao/). O pacote `article-explanations-antifaction-procedures-2026-10-12.json` registra hashes e datas das fontes adicionais efetivamente consultadas. A consulta do andamento processual completo no portal do STF retornou HTTP 403; não se afirma ausência de decisões posteriores nem solução definitiva das controvérsias.

## Lei de Drogas: escopo parcial

Revisados os arts. 1, 2, 3, 4, 5, 7, 8-A, 8-D, 8-E, 16, 17, 18, 19, 19-A, 20, 21, 22, 22-A, 23, 23-A, 23-B, 24, 25, 26 e 26-A. Os outros 59 itens atuais permanecem pendentes de revisão editorial.

- Princípios, prevenção, atenção e reinserção: funções distintas, proteção da identidade e integração SUS/SUAS.
- Plano Nacional: cinco anos desde a aprovação, não desde a lei. PIA: até 30 dias desde ingresso no atendimento e atualização nas fases posteriores.
- Internação: excepcional, decisão médica e insuficiência dos recursos extra-hospitalares; involuntária apenas pelo tempo necessário à desintoxicação, no máximo 90 dias. Comunicação de internações e altas em até 72 horas, com sigilo.
- Comunidade terapêutica: adesão e permanência voluntárias, avaliação prévia e PIA; não pode realizar internação ou isolamento físico. Necessidades graves de atendimento hospitalar devem ser encaminhadas à rede de saúde.

[Lei 11.343 compilada](https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm). Seus 84 textos atuais coincidiram com o banco, sem dispositivos ausentes, inesperados ou diferenças de hash. Isso mede integridade textual, não revisão editorial de todo o percurso.

## Alertas judiciais: não confundir com aprovação editorial

Foram consultadas fontes do STF para qualificar a prática literal, sem marcar os artigos correspondentes de Drogas como revisados:

- RE 635659: cannabis para consumo pessoal em procedimento não penal; 40 gramas ou seis plantas fêmeas são presunção relativa, não autorização de tráfico nem limite absoluto.
- HC 104339 e RE 1038925: vedação de liberdade provisória do art. 44 é inconstitucional. Inafiançabilidade não significa custódia automática.
- HC 97256 e ARE 663261: não há proibição absoluta de conversão em penas alternativas; requisitos devem ser examinados.
- SV 63: tráfico privilegiado não é hediondo; não copiar percentuais antigos de progressão das notícias históricas para a LEP atual.
- ARE 666334: quantidade/natureza não podem ser valoradas cumulativamente em duas fases da dosimetria.

Fontes e hashes estão em `drug-judicial-alert-evidence-2026-10-12.json`. Destinos do STJ devolveram HTTP 200 com **Request Rejected**, não conteúdo judicial. Essas respostas não foram consideradas evidência. A ressalva sobre estabilidade/permanência do art. 35 continua sendo requisito de revisão; não se certificou jurisprudência nova com uma página rejeitada.

## Estado e validação

A leitura atual aponta 3.511 unidades com explicação, 879 com metadados de revisão atual e 2.632 pendentes. São unidades da biblioteca, não questões do treinador. Completude estrutural de explicações publicadas não equivale a conclusão editorial.

O lote passou por `--dry-run`, preflight integral e verificações concorrentes do importador. A publicação foi lida novamente e conferida campo a campo. Snapshots, HTML bruto e logs permanecem em `outputs` ignorados; não há credenciais no Git.

278 testes, typecheck e build passaram. Durante o trabalho, o commit remoto `840f5da` (filtro de resoluções não atuais do CTB) foi integrado sem alteração do seu conteúdo; os 278 testes e o build foram repetidos e passaram após a integração. O build foi executado em cópia temporária para não modificar `public/version.json` ou `src/build-info.ts`.

Prioridade de continuidade: os 59 itens restantes de Drogas, Armas (41) e Maria da Penha (55), seguidos das outras leis especiais e CP/CPP/ECA/LEP/CTB. Repetir snapshot e preflight para não sobrescrever trabalho concorrente. Não aprovar outros artigos por proximidade ou pela presença de explicação antiga.
