# Legislação especial — revisão e publicação de 04/10/2026

Foram publicados 35 módulos autorais na biblioteca, correspondentes aos 35 diplomas indicados: 25 do núcleo policial e dez do bloco federal. Cada módulo contém comparação de conceitos, situação aplicada, alerta de vigência, roteiro de leitura, oito questões de julgamento comentadas e quatro cartões. Total: 280 questões de revisão e 140 cartões. Esses exercícios pertencem à prática da biblioteca; não são 280 novas entradas no banco geral de questões.

São revisões temáticas dos dispositivos explicitados em cada módulo, não cursos integrais de todos os artigos. Os textos vigentes foram consultados no Planalto; jurisprudência de prisão temporária foi confrontada com o STF. A data apresentada ao candidato é 04/10/2026; os timestamps UTC podem corresponder a 05/10, devido ao fuso. Fontes primárias, URLs sem rastreamento e data da conferência acompanham cada material. Os hashes de leitura dos 35 diplomas constam do manifesto público de fontes; textos extraídos e evidências detalhadas permanecem nos outputs locais.

## Classificação por edital

O edital PF Agente 2025 não é utilizado como justificativa universal para a lista. Os quinze diplomas expressamente pertinentes ao bloco de legislação especial desse cargo estão vinculados aos tópicos existentes. Os demais utilizam os programas oficiais de Delegado PCDF 2026 ou Delegado PF 2025 conforme os dispositivos estudados. Tráfico de pessoas é conteúdo correlato do tópico de crimes contra a pessoa/CP 149-A da PCDF: não se afirma que a Lei 13.344 esteja nominalmente listada naquele edital.

Foram registrados três tópicos complementares com evidência de páginas dos editais oficiais, preservando os tópicos anteriores. A revisão usa legislação vigente na data da consulta; não reproduz automaticamente a versão normativa aplicável à prova histórica de 2025. O candidato deve observar a data de corte do seu próprio edital.

## Alterações destacadas

- Drogas: art. 40-A incluído pela Lei 15.358/2026; não aplicado automaticamente a qualquer concurso de agentes. Consumo pessoal/cannabis não integra o escopo deste módulo.
- Tortura: modalidade do art. 1º, III, incluída pela Lei 15.410/2026. Regime inicial não é ensinado apenas pela literalidade do § 7º.
- Maria da Penha: violência vicária e alterações de 2026; pena atual do art. 24-A distinguida do crime da Lei Henry Borel.
- ECA, hediondos e organizações criminosas: alterações da Lei 15.487/2026; sua vigência imediata foi conferida no art. 7º, com publicação em 07/08/2026.
- Identificação criminal e LEP: alterações de coleta de perfil genético da Lei 15.295/2025, sem repetir indiscriminadamente redações anteriores.
- Segurança privada: Lei 14.967/2024 e revogação da Lei 7.102; transição não tratada como dispensa geral de autorização.
- CPF, ICN e CIN: alterações combinadas de 2023 e prazos por idade; CPF não tratado como senha nem obrigação universal de login de plataformas privadas.
- Prisão temporária: requisitos cumulativos do STF nas ADIs 3.360 e 4.109; ausência de residência não apresentada como justificativa suficiente isolada.

O módulo Sinarm complementa o material já existente de posse e porte; não o substitui. As referências de edital do Cebraspe passaram a ser links utilizáveis na biblioteca, com HTTPS e domínio exato, mantendo a validação das fontes jurídicas do banco de questões.

## Publicação e verificação

No Supabase do projeto, a leitura posterior confirmou os 35 registros completos, status ativo, revisão, data, fontes, exercícios e cartões. As 45 referências estão registradas em content_sources (31 novas, 14 preservadas). Os três tópicos complementares foram conferidos após gravação.

Biblioteca após publicação: **102 materiais, 96 ativos e seis em revisão**. Os 67 materiais da fotografia anterior foram comparados campo a campo e permaneceram idênticos. A reexecução dos importadores preserva registros existentes; não sobrescreve revisões nem dados de alunos. Não houve alteração de resultados, autenticação ou histórico de estudo.

Validação: 20 testes aprovados, TypeScript sem erros e build de produção concluído. Foram testadas validação local sem credenciais, rejeição de fontes com domínio enganoso e conferência do pacote de 35 módulos. Evidências de banco e relatórios de execução ficam nos outputs locais, fora do Git.

## Reexecução

Defina TASK_SUPABASE_PROJECT e TASK_SUPABASE_KEY no ambiente; para materiais, defina também TASK_LIBRARY_REVIEWER com o usuário revisor autorizado. Não grave credenciais no código ou relatórios. Execute na raiz do repositório, nesta ordem:

```sh
node scripts/import-library-sources.mjs docs/library/special-laws-sources-2026-10-04.json CAMINHO_RELATORIO_FONTES
node scripts/import-library-topics.mjs docs/library/special-laws-topics-2026-10-04.json CAMINHO_RELATORIO_TOPICOS
node scripts/import-library-materials.mjs docs/library/special-laws-2026-10-04.json CAMINHO_RELATORIO_MATERIAIS
```

Use `--dry-run` como terceiro argumento para validar os arquivos sem acessar o banco. Fontes e materiais usam inserção com preservação por URL/slug; tópicos verificam conflitos e exigem a mesma classificação existente, sem substituição automática.

## Cobertura dos módulos

| Diploma e fonte oficial | Vínculo do módulo |
|---|---|
| [Lei 11.343/2006 — tráfico e associação](https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm) | Polícia Federal — Agente — Edital 1/2025 atualizado |
| [Lei 9.455/1997 — modalidades e responsabilidades](https://www.planalto.gov.br/ccivil_03/leis/l9455.htm) | Polícia Federal — Agente — Edital 1/2025 atualizado |
| [Lei 13.869/2019 — finalidade e efeitos da condenação](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13869compilado.htm) | PCDF — Delegado — Edital 2026 |
| [Lei 12.850/2013 — organização e colaboração](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12850.htm) | PCDF — Delegado — Edital 2026 |
| [Lei 8.072/1990 — rol e consequências](https://www.planalto.gov.br/ccivil_03/leis/l8072.htm) | PCDF — Delegado — Edital 2026 |
| [Lei 11.340/2006 — violência e proteção](https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm) | PCDF — Delegado — Edital 2026 |
| [Lei 9.296/1996 — interceptação e captação ambiental](https://www.planalto.gov.br/ccivil_03/leis/l9296.htm) | PCDF — Delegado — Edital 2026 |
| [Lei 9.613/1998 — ocultação e infração antecedente](https://www.planalto.gov.br/ccivil_03/leis/l9613.htm) | PCDF — Delegado — Edital 2026 |
| [Lei 8.069/1990 — ato infracional e garantias](https://www.planalto.gov.br/ccivil_03/leis/l8069.htm) | Polícia Federal — Agente — Edital 1/2025 atualizado |
| [Lei 9.605/1998 — responsabilidade e sanções](https://www.planalto.gov.br/ccivil_03/leis/l9605.htm) | Polícia Federal — Agente — Edital 1/2025 atualizado |
| [Lei 7.960/1989 — prisão temporária e controle judicial](https://www.planalto.gov.br/ccivil_03/leis/l7960.htm) | PCDF — Delegado — Edital 2026 |
| [Lei 9.099/1995 — instrumentos do Juizado Criminal](https://www.planalto.gov.br/ccivil_03/leis/l9099.htm) | PCDF — Delegado — Edital 2026 |
| [Lei 12.830/2013 — investigação e indiciamento](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12830.htm) | Polícia Federal — Delegado — Edital 1/2025 atualizado |
| [Lei 12.037/2009 — identificação e perfil genético](https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/lei/l12037.htm) | PCDF — Delegado — Edital 2026 |
| [Lei 13.260/2016 — elementos e limites](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/lei/l13260.htm) | PCDF — Delegado — Edital 2026 |
| [Lei 13.344/2016 — tráfico de pessoas](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/lei/l13344.htm) | PCDF — Delegado — Edital 2026 — crimes contra a pessoa |
| [Lei 9.807/1999 — proteção de vítimas e testemunhas](https://www.planalto.gov.br/ccivil_03/leis/l9807.htm) | PCDF — Delegado — Edital 2026 |
| [Lei 7.716/1989 — discriminação e injúria racial](https://www.planalto.gov.br/ccivil_03/leis/l7716.htm) | PCDF — Delegado — Edital 2026 |
| [Lei 10.741/2003 — proteção penal da pessoa idosa](https://www.planalto.gov.br/ccivil_03/leis/2003/l10.741.htm) | PCDF — Delegado — Edital 2026 |
| [Lei 13.146/2015 — crimes contra pessoa com deficiência](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm) | PCDF — Delegado — Edital 2026 |
| [Lei 14.344/2022 — proteção contra violência doméstica](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14344.htm) | PCDF — Delegado — Edital 2026 |
| [Lei 9.503/1997 — leitura dos crimes de trânsito](https://www.planalto.gov.br/ccivil_03/leis/l9503compilado.htm) | PCDF — Delegado — Edital 2026 |
| [Lei 7.210/1984 — execução, assistência e identificação](https://www.planalto.gov.br/ccivil_03/leis/l7210.htm) | Polícia Federal — Delegado — Edital 1/2025 atualizado |
| [Decreto-Lei 3.688/1941 — regras gerais das contravenções](https://www.planalto.gov.br/ccivil_03/decreto-lei/del3688.htm) | PCDF — Delegado — Edital 2026 |
| [Lei 10.826/2003 — Sinarm, registro e segurança privada](https://www.planalto.gov.br/ccivil_03/leis/2003/l10.826compilado.htm) | Polícia Federal — Agente — Edital 1/2025 atualizado |
| [Lei 14.967/2024 — segurança privada e fiscalização](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14967.htm) | Polícia Federal — Agente — Edital 1/2025 atualizado |
| [Lei 10.357/2001 — controle de produtos químicos](https://www.planalto.gov.br/ccivil_03/leis/leis_2001/l10357.htm) | Polícia Federal — Agente — Edital 1/2025 atualizado |
| [Lei 13.445/2017 — retirada compulsória e garantias](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13445.htm) | Polícia Federal — Agente — Edital 1/2025 atualizado |
| [Lei 10.446/2002 — atribuição investigativa da PF](https://www.planalto.gov.br/ccivil_03/leis/2002/l10446.htm) | Polícia Federal — Agente — Edital 1/2025 atualizado |
| [Lei 13.444/2017 — Identificação Civil Nacional](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13444.htm) | Polícia Federal — Agente — Edital 1/2025 atualizado |
| [Lei 14.534/2023 — CPF como identificador](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14534.htm) | Polícia Federal — Agente — Edital 1/2025 atualizado |
| [Lei 7.116/1983 — carteira de identidade](https://www.planalto.gov.br/ccivil_03/leis/1980-1988/l7116.htm) | Polícia Federal — Agente — Edital 1/2025 atualizado |
| [Decreto 10.977/2022 — Carteira de Identidade Nacional](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/decreto/d10977.htm) | Polícia Federal — Agente — Edital 1/2025 atualizado |
| [Decreto 11.797/2023 — Serviço de Identificação do Cidadão](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/decreto/d11797.htm) | Polícia Federal — Agente — Edital 1/2025 atualizado |
| [Decreto 11.491/2023 — Convenção de Budapeste](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/decreto/d11491.htm) | Polícia Federal — Agente — Edital 1/2025 atualizado |
