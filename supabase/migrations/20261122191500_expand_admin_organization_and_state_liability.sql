UPDATE study_materials SET body_md=body_md || '
## Organização administrativa na prática

**Desconcentração:** uma secretaria cria departamentos internos para dividir tarefas. Os departamentos integram a mesma pessoa jurídica; não nasce nova entidade. **Descentralização por outorga:** uma lei cria uma autarquia com personalidade jurídica própria para executar atividade administrativa. **Delegação:** a execução de serviço pode ser atribuída a particular conforme o regime legal, sem que ele se torne órgão da Administração Direta.

**Administração Direta:** União, estados, Distrito Federal e municípios, por seus órgãos. **Indireta:** autarquias, fundações públicas, empresas públicas e sociedades de economia mista. Empresa pública admite capital exclusivamente público; sociedade de economia mista tem forma de sociedade anônima e capital misto, com controle estatal, conforme regime aplicável.

**Pegadinha:** órgão não é sinônimo de entidade. O ministério é órgão da União; uma autarquia federal é pessoa jurídica distinta. Agente público é categoria ampla: não se restringe ao servidor estatutário.

### Como resolver questões

Primeiro identifique se houve criação de nova pessoa jurídica. Se não houve, investigue desconcentração. Se houve atribuição de atividade a outra pessoa, investigue descentralização e seu fundamento jurídico.
',quiz=quiz || '[{"q":"A criação de departamentos dentro de uma secretaria estadual, sem instituir nova pessoa jurídica, caracteriza desconcentração administrativa.","a":true,"why":"Certo. Desconcentração reparte competências internamente na mesma pessoa jurídica. A criação de entidade com personalidade própria é característica de descentralização por outorga."},{"q":"Uma autarquia federal é órgão sem personalidade jurídica da União.","a":false,"why":"Errado. Autarquia é entidade da Administração Indireta com personalidade jurídica própria, criada por lei específica. Órgãos integram a estrutura de uma pessoa jurídica."}]'::jsonb,updated_at=now() WHERE slug='administrativo-acervo-fundamentos-organizacao' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Organização administrativa na prática%';
UPDATE study_materials SET body_md=body_md || '
## Casos resolvidos: dano, nexo e regresso

**Caso 1:** viatura oficial, conduzida por agente em serviço, colide com veículo particular por conduta ligada à função. Para a responsabilidade objetiva estatal do art. 37, § 6º, da Constituição, o terceiro deve demonstrar dano, conduta imputável ao serviço e nexo causal; não precisa provar culpa do agente. O Estado pode depois buscar regresso contra o agente, se demonstrar dolo ou culpa.

**Caso 2:** motorista particular provoca sozinho o acidente e o veículo oficial não contribui para o resultado. A culpa exclusiva da vítima ou de terceiro pode romper o nexo causal, conforme os fatos comprovados. Não confunda responsabilidade objetiva com obrigação de indenizar qualquer dano ocorrido nas proximidades de um agente público.

**Omissões:** analise o dever jurídico específico de agir e o entendimento jurisprudencial aplicável. Evite afirmar que toda omissão estatal é automaticamente objetiva ou subjetiva: o enquadramento depende da situação, como dever específico de custódia ou proteção.

**Técnica de prova:** marque quatro perguntas: quem causou o dano? O agente agia nessa qualidade? Existe nexo causal? Há fato que exclui ou reduz a responsabilidade? Só depois examine eventual regresso.
',quiz=quiz || '[{"q":"Na responsabilidade objetiva do Estado por ato comissivo de agente nessa qualidade, a vítima deve necessariamente provar a culpa pessoal do servidor.","a":false,"why":"Errado. O art. 37, § 6º, da Constituição adota responsabilidade objetiva perante o terceiro, exigindo dano e nexo causal, mas não prova de culpa do agente para essa etapa."},{"q":"A ação regressiva do Estado contra o agente pressupõe demonstração de dolo ou culpa, diferentemente da responsabilidade objetiva perante o terceiro.","a":true,"why":"Certo. A Constituição distingue a responsabilidade da pessoa jurídica perante a vítima e o direito de regresso contra o agente responsável, quando demonstrados dolo ou culpa."}]'::jsonb,updated_at=now() WHERE slug='administrativo-acervo-responsabilidade' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Casos resolvidos: dano, nexo e regresso%';