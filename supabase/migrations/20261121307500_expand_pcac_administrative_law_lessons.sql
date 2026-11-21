-- Ampliação didática de Direito Administrativo — PC-AC 2026.
-- Atualiza aulas existentes sem criar duplicatas.
update public.study_materials as m
set summary = v.summary, body_md = v.body_md, updated_at = now()
from (values
('pcac-2026-direito-administrativo-02-organizacao-direta-indireta','Aprofunda órgãos e entidades, Administração direta e indireta, autarquias, fundações, empresas públicas, sociedades de economia mista, outorga, delegação e desconcentração.','# Administração direta e indireta

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Uma entidade com personalidade jurídica de direito público é criada diretamente por lei para exercer atividade típica de Estado. Trata-se de:
>
> A) empresa pública. B) sociedade de economia mista. C) autarquia. D) órgão público sem personalidade. E) concessionária.
>
> **Resolução:** autarquia é pessoa jurídica de direito público criada diretamente por lei. Gabarito: **C**.

## 1. Administração direta
É formada pelos órgãos que integram as pessoas políticas: União, Estados, Distrito Federal e Municípios. Ministério, secretaria e departamento são exemplos de órgãos.

Órgão é centro de competências sem personalidade jurídica própria. Em regra, sua atuação é imputada à pessoa jurídica a que pertence. A secretaria estadual não é uma pessoa jurídica separada do Estado.

## 2. Administração indireta
É composta por entidades com personalidade jurídica própria, criadas ou autorizadas por lei para desempenhar atividades administrativas.

| Entidade | Personalidade | Característica central |
|---|---|---|
| Autarquia | Direito público | Criada diretamente por lei |
| Fundação pública | Direito público ou privado | Finalidade social definida na lei |
| Empresa pública | Direito privado | Capital integralmente público |
| Sociedade de economia mista | Direito privado | Forma de sociedade anônima e controle estatal |

A empresa pública pode adotar diferentes formas societárias admitidas em lei; a sociedade de economia mista é constituída como sociedade anônima.

## 3. Autarquia
É pessoa jurídica de direito público criada diretamente por lei, com patrimônio e atribuições próprias, para executar atividades típicas da Administração. Não é órgão e não se confunde com empresa pública.

## 4. Fundação pública
É instituída pelo poder público para finalidades de interesse social, como educação, pesquisa, cultura ou saúde. Conforme o modelo legal, pode ter personalidade de direito público ou privado. A banca pode cobrar essa distinção.

## 5. Empresa pública e sociedade de economia mista
Ambas têm personalidade de direito privado e integram a Administração indireta. A diferença clássica:
- empresa pública: capital integralmente público e forma jurídica admitida em lei;
- sociedade de economia mista: sociedade anônima, com controle acionário estatal e participação de capital privado.

Não significa que toda atividade de empresa estatal seja idêntica: observe finalidade, regime e legislação aplicável.

## 6. Centralização, descentralização e desconcentração
- **Centralização:** o próprio ente político executa atividade por seus órgãos.
- **Descentralização:** a execução é atribuída a outra pessoa jurídica ou delegada a particular, conforme a lei.
- **Desconcentração:** distribuição interna de competências dentro da mesma pessoa jurídica, com criação ou organização de órgãos.

**Exemplo:** criar uma coordenação dentro de uma secretaria é desconcentração. Criar uma autarquia é descentralização por outorga legal.

## 7. Outorga e delegação
Na linguagem administrativa tradicional, outorga transfere a titularidade e a execução de atividade a entidade da Administração indireta, nos limites da lei. Delegação transfere a execução a outra pessoa, frequentemente particular, sem transferir a titularidade do serviço público.

## 8. Como resolver questão
1. Pergunte se o enunciado descreve órgão ou entidade.
2. Verifique se há personalidade jurídica própria.
3. Se for entidade, identifique natureza e forma.
4. Observe se houve distribuição interna ou atribuição a outra pessoa.
5. Diferencie criação direta por lei de autorização legal para instituição.

## 9. Pegadinhas
- Órgão não é entidade.
- Autarquia tem personalidade de direito público.
- Empresa pública e sociedade de economia mista têm personalidade de direito privado.
- Desconcentração ocorre dentro da mesma pessoa jurídica.
- Descentralização envolve outra pessoa jurídica ou particular.
- Sociedade de economia mista é sociedade anônima; empresa pública não está limitada a essa forma.

**Macete:** órgão = parte da pessoa; entidade = pessoa jurídica própria; desconcentração = dentro; descentralização = fora.'),
('pcac-2026-direito-administrativo-03-poderes-administrativos','Aprofunda poderes vinculado e discricionário, hierárquico, disciplinar, regulamentar e de polícia, abuso de poder, excesso e desvio de finalidade.','# Poderes administrativos e abuso de poder

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Um superior distribui tarefas, orienta a equipe e fiscaliza a execução do serviço. Essa atuação decorre principalmente do poder:
>
> A) de polícia. B) hierárquico. C) regulamentar. D) disciplinar exclusivamente. E) constituinte.
>
> **Resolução:** o poder hierárquico organiza a estrutura, distribui tarefas e permite fiscalização interna. Gabarito: **B**.

## 1. Por que existem poderes administrativos?
São instrumentos jurídicos para que a Administração cumpra suas atribuições e atenda ao interesse público. Não são privilégios pessoais do agente. Devem ser exercidos dentro da competência, finalidade e limites legais.

## 2. Poder vinculado e discricionário
**Vinculado:** a lei define os requisitos e a consequência, reduzindo a margem de escolha. Se todos os requisitos legais estão presentes, a Administração deve agir conforme a lei.

**Discricionário:** a lei permite avaliação administrativa dentro dos limites jurídicos, especialmente quanto à conveniência e oportunidade. Não significa liberdade para agir como quiser.

Exemplo: quando a lei estabelece critérios objetivos para conceder uma licença, a análise tende a ser vinculada. A escolha entre alternativas administrativas legalmente permitidas pode envolver discricionariedade.

## 3. Poder hierárquico
Permite organizar a estrutura administrativa, distribuir funções, dar ordens, fiscalizar, revisar e, nos limites legais, delegar ou avocar competências no âmbito da estrutura.

Não autoriza um superior a ordenar prática ilegal. Hierarquia administrativa também não elimina competências legalmente atribuídas a órgãos ou autoridades.

## 4. Poder disciplinar
Permite apurar infrações e aplicar sanções a pessoas sujeitas à disciplina administrativa, como servidores e particulares que mantenham vínculo jurídico específico com a Administração.

A sanção exige fundamento, competência, procedimento e respeito ao contraditório e à ampla defesa, quando cabíveis.

## 5. Poder regulamentar
Permite expedir atos normativos para fiel execução da lei, nos limites constitucionais e legais. Regulamento não pode, como regra, criar obrigação ou proibição sem fundamento legal.

O ato regulamentar detalha como a lei será executada; não pode contrariá-la nem substituí-la.

## 6. Poder de polícia
Condiciona ou restringe o exercício de direitos, atividades e uso de bens em benefício do interesse público, dentro da lei. Exemplo: fiscalização sanitária, de trânsito ou de funcionamento de atividade econômica.

## 7. Abuso de poder
Pode ocorrer de duas formas:
- **Excesso de poder:** o agente ultrapassa os limites de sua competência.
- **Desvio de finalidade:** o agente atua dentro de sua competência formal, mas busca finalidade diversa da prevista em lei ou do interesse público.

Exemplo: autoridade aplica medida que não está entre suas atribuições: excesso. Usa uma atribuição existente para perseguir desafeto: desvio.

## 8. Como diferenciar em prova
| Situação | Poder ou vício |
|---|---|
| Chefe distribui tarefas | Hierárquico |
| Apuração de infração funcional | Disciplinar |
| Decreto detalha execução da lei | Regulamentar |
| Fiscalização de atividade | Polícia |
| Agente ultrapassa competência | Excesso |
| Agente persegue finalidade pessoal | Desvio |

## 9. Pegadinhas
- Discricionariedade não é arbitrariedade.
- Poder hierárquico não autoriza ordem ilegal.
- Poder disciplinar depende de vínculo e procedimento.
- Regulamento não pode contrariar ou substituir a lei.
- Excesso = limite de competência; desvio = finalidade errada.

**Macete:** hierárquico organiza; disciplinar sanciona; regulamentar detalha; polícia limita; excesso ultrapassa competência; desvio troca a finalidade.'),
('pcac-2026-direito-administrativo-04-poder-de-policia','Aprofunda conceito e ciclo de polícia, atributos, consentimento, fiscalização e sanção, polícia administrativa versus judiciária e limites legais.','# Poder de polícia e polícia administrativa e judiciária

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> A Administração determina a interdição imediata de estabelecimento que apresenta risco grave e atual à segurança, com fundamento legal e observância do devido processo cabível. A execução direta da medida, quando autorizada pela lei ou urgência, exemplifica:
>
> A) tipicidade penal. B) autoexecutoriedade. C) imperatividade legislativa. D) hierarquia judicial. E) presunção absoluta.
>
> **Resolução:** autoexecutoriedade permite executar diretamente certas medidas quando houver previsão legal ou situação urgente que justifique a atuação. Gabarito: **B**.

## 1. Conceito
Poder de polícia é a atividade administrativa que limita ou disciplina direito, interesse ou liberdade, regulando a prática de ato ou a abstenção de fato em razão do interesse público, nos termos da lei.

Pode envolver segurança, higiene, ordem, tranquilidade, disciplina de atividades econômicas e proteção de direitos coletivos.

## 2. Atributos tradicionais
- **Discricionariedade:** existe margem de escolha em determinadas situações; nem todo ato de polícia é discricionário.
- **Autoexecutoriedade:** possibilidade de executar diretamente certas medidas, quando houver previsão legal ou situação urgente que a justifique.
- **Coercibilidade:** imposição da medida ao administrado, nos limites legais.

Os atributos não estão presentes de modo idêntico em todos os atos. A cobrança costuma usar a expressão “nem todo ato de polícia possui todos os atributos”.

## 3. Ciclo de polícia
Em abordagem didática, pode envolver:
1. **Ordem de polícia:** norma que estabelece limitações.
2. **Consentimento:** autorização ou licença, quando exigida.
3. **Fiscalização:** verificação do cumprimento das regras.
4. **Sanção:** consequência pelo descumprimento.

Nem toda atividade percorre todas as fases. Uma fiscalização pode ocorrer sem consentimento prévio, por exemplo.

## 4. Polícia administrativa e polícia judiciária
**Polícia administrativa:** atua sobre bens, direitos e atividades, de modo preventivo ou fiscalizatório, para evitar infrações à ordem administrativa. Ex.: fiscalização sanitária e de trânsito.

**Polícia judiciária:** atua na apuração de infrações penais e na instrução da persecução penal, conforme competências legais.

A diferença principal é a finalidade e o objeto da atuação, não apenas o uniforme ou o órgão que aparece no enunciado.

## 5. Limites
O poder de polícia deve respeitar:
- competência;
- finalidade pública;
- legalidade;
- proporcionalidade;
- motivação;
- devido processo, quando exigido;
- direitos fundamentais.

Uma medida não pode ser mais intensa do que o necessário para alcançar objetivo legítimo. Urgência pode justificar providência imediata, mas não elimina controle posterior e garantias aplicáveis.

## 6. Exemplo prático
A vigilância sanitária fiscaliza um restaurante e identifica risco grave de contaminação. Conforme a lei e as circunstâncias, pode determinar interdição. Isso é polícia administrativa. A investigação de um crime ocorrido no local é atividade de polícia judiciária, com finalidade e regime próprios.

## 7. Como a banca confunde os atributos
- Coercibilidade: medida pode ser imposta ao destinatário.
- Autoexecutoriedade: Administração pode executar diretamente em hipóteses admitidas.
- Discricionariedade: existe margem de escolha permitida.
- Presunção de legitimidade: ato é presumido válido até prova em contrário, sem impedir controle.

Não confunda poder de polícia com atributo de ato administrativo.

## 8. Pegadinhas
- Nem todo ato de polícia é discricionário.
- Nem todo ato de polícia é autoexecutório.
- Polícia administrativa não se confunde com investigação criminal.
- Autoexecutoriedade não é autorização para ignorar a lei.
- Coercibilidade não significa força física irrestrita.

**Macete:** administrativa = regula atividades e direitos; judiciária = apura infrações penais; autoexecutoriedade = execução direta quando permitida.'),
('pcac-2026-direito-administrativo-05-atos-administrativos','Aprofunda conceito, cinco elementos, atributos, atos vinculados e discricionários, anulação, revogação, convalidação e controle judicial.','# Atos administrativos: elementos, atributos e espécies

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> A autoridade competente pratica um ato com finalidade pública, mas utiliza forma não prevista e essencial, contrariando exigência legal. Qual elemento do ato está diretamente relacionado ao modo de exteriorização?
>
> A) competência. B) finalidade. C) forma. D) motivo. E) objeto.
>
> **Resolução:** forma é o modo pelo qual o ato se exterioriza. Gabarito: **C**.

## 1. Conceito
Ato administrativo é manifestação unilateral da Administração, ou de quem exerça função administrativa, sob regime de direito público, destinada a produzir efeitos jurídicos.

Não confunda ato administrativo com fato administrativo: o ato contém manifestação de vontade; o fato é acontecimento ou execução material que produz efeitos no âmbito administrativo.

## 2. Os cinco elementos
A classificação tradicional reúne:
- **Competência:** atribuição legal do agente ou órgão.
- **Finalidade:** resultado de interesse público previsto no ordenamento.
- **Forma:** modo de exteriorização do ato.
- **Motivo:** pressupostos de fato e de direito que justificam a prática.
- **Objeto:** efeito jurídico imediato produzido.

Exemplo: na autorização administrativa, identifique quem pode autorizar (competência), para qual finalidade pública (finalidade), em qual forma (forma), com base em quais fatos e normas (motivo) e qual efeito será produzido (objeto).

## 3. Atributos
- **Presunção de legitimidade e veracidade:** o ato é considerado válido e verdadeiro até prova em contrário; admite controle.
- **Imperatividade:** pode impor obrigações independentemente da concordância do destinatário, quando cabível.
- **Autoexecutoriedade:** permite execução direta em hipóteses legais ou urgentes.
- **Tipicidade:** o ato deve corresponder a figuras admitidas pelo ordenamento.

Nem todo ato possui todos os atributos. Um ato que apenas concede benefício pode não ter imperatividade.

## 4. Vinculação e discricionariedade
Ato vinculado segue os requisitos definidos em lei. Ato discricionário admite escolha legítima nos limites legais. Competência, finalidade e forma, em regra, não ficam à livre escolha do agente.

Discricionariedade não afasta motivação, proporcionalidade nem controle de legalidade.

## 5. Anulação, revogação e convalidação
- **Anulação:** retira ato ilegal. Pode ser feita pela Administração e pelo Judiciário, quando provocado, respeitados os limites.
- **Revogação:** retira ato válido por razões de conveniência e oportunidade; é realizada pela própria Administração.
- **Convalidação:** corrige determinados vícios sanáveis, quando a lei permitir e sem prejuízo ao interesse público ou a terceiros.

Em regra, vícios de competência não exclusiva e de forma não essencial podem ser convalidáveis. Vícios de finalidade, motivo e objeto tendem a não ser convalidáveis.

## 6. Controle judicial
O Judiciário pode controlar legalidade e legitimidade do ato, inclusive aspectos vinculados e limites da discricionariedade. Não deve substituir a Administração na escolha legítima de conveniência e oportunidade, mas pode afastar abuso, desvio, desproporção ou ilegalidade.

## 7. Exemplo prático
Um ato é praticado por autoridade sem competência, mas a competência não é exclusiva e o vício pode ser sanado: pode haver convalidação, conforme a lei. Se o ato é ilegal e o vício não pode ser corrigido, a Administração deve avaliar sua anulação. Se o ato é legal, mas se tornou inconveniente, pode avaliar revogação.

## 8. Quadro comparativo
| Medida | Motivo | Quem pratica |
|---|---|---|
| Anulação | Ilegalidade | Administração ou Judiciário, quando provocado |
| Revogação | Mérito de ato válido | Administração |
| Convalidação | Corrigir vício sanável | Administração, conforme lei |

## 9. Pegadinhas
- Anulação = ilegalidade; revogação = conveniência/oportunidade.
- O Judiciário não revoga ato administrativo por mérito.
- Nem todo vício é convalidável.
- Presunção de legitimidade é relativa, não absoluta.
- Nem todo ato possui imperatividade e autoexecutoriedade.
- Motivo é pressuposto; objeto é efeito jurídico.

**Macete:** competência, finalidade, forma, motivo, objeto. Ilegal = anula; válido mas inconveniente = revoga; vício sanável = pode convalidar.'),
('pcac-2026-direito-administrativo-07-responsabilidade-civil-estado','Aprofunda art. 37, §6º, teoria do risco administrativo, dano e nexo causal, excludentes, omissão, prestadores de serviço público e direito de regresso.','# Responsabilidade civil do Estado

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Durante serviço, um agente público causa dano a terceiro atuando nessa qualidade. Estão demonstrados dano e nexo causal, sem excludente. Qual regra se aplica à responsabilidade da pessoa jurídica estatal perante a vítima?
>
> A) subjetiva, sempre exigindo prova de dolo do agente. B) objetiva, fundada no art. 37, §6º, da Constituição. C) inexistente, pois o agente responde sozinho. D) objetiva apenas se houver contrato. E) depende de condenação criminal prévia.
>
> **Resolução:** a regra constitucional é de responsabilidade objetiva da pessoa jurídica perante a vítima, demonstrados os pressupostos. Gabarito: **B**.

## 1. Fundamento constitucional
O art. 37, §6º, da Constituição estabelece que pessoas jurídicas de direito público e pessoas jurídicas de direito privado prestadoras de serviços públicos respondem pelos danos que seus agentes, nessa qualidade, causarem a terceiros.

A regra protege a vítima e permite posterior direito de regresso contra o agente quando houver dolo ou culpa.

## 2. Responsabilidade objetiva
A responsabilidade perante a vítima é, em regra, objetiva, com base na teoria do risco administrativo. Não é necessário provar culpa pessoal do agente, mas devem estar presentes:
- atuação do agente nessa qualidade;
- dano;
- nexo causal entre atuação e dano.

Responsabilidade objetiva não significa indenização automática por qualquer prejuízo: é necessário demonstrar os pressupostos e analisar eventual causa que rompa ou reduza o nexo.

## 3. Teoria do risco administrativo
A Administração assume os riscos da atuação estatal perante terceiros, mas admite causas de exclusão ou redução da responsabilidade, conforme o caso.

Não confunda risco administrativo com risco integral, que é excepcional e não admite as mesmas excludentes.

## 4. Excludentes e atenuantes
Conforme o caso concreto, podem afastar ou reduzir o dever de indenizar:
- culpa exclusiva da vítima;
- fato exclusivo de terceiro;
- caso fortuito ou força maior que rompa o nexo causal.

Se a vítima contribui parcialmente para o dano, a consequência pode ser redução, e não necessariamente exclusão total.

## 5. Direito de regresso
Depois de indenizar a vítima, a pessoa jurídica pode buscar ressarcimento do agente responsável quando demonstrar dolo ou culpa, conforme o texto constitucional.

Portanto:
- vítima contra Estado: regra objetiva;
- Estado contra agente: exige dolo ou culpa.

Não transfira automaticamente a exigência de culpa do regresso para a ação da vítima.

## 6. Omissão estatal
A responsabilidade por omissão exige análise específica do dever jurídico de agir, da possibilidade concreta de atuação e do nexo causal. A prova pode explorar situações em que havia dever específico de proteção ou custódia. Não se deve aplicar automaticamente a mesma conclusão a qualquer omissão.

## 7. Prestadores de serviço público
O texto constitucional inclui pessoas jurídicas de direito privado prestadoras de serviços públicos. A análise depende de o dano ter relação com a prestação e com a atuação do agente nessa qualidade.

Não basta ser uma empresa privada qualquer: é preciso verificar a natureza da atividade e a condição de prestadora de serviço público.

## 8. Exemplo resolvido
Um veículo oficial, conduzido por agente em serviço, causa dano a terceiro. A vítima demonstra o dano e o nexo com a atuação do agente nessa qualidade. Não precisa provar culpa pessoal do servidor para invocar a regra objetiva. Se o Estado indenizar, poderá buscar regresso se demonstrar dolo ou culpa do agente.

## 9. Pegadinhas
- Responsabilidade objetiva não dispensa dano e nexo causal.
- O agente precisa atuar nessa qualidade.
- O Estado pode exercer direito de regresso se houver dolo ou culpa.
- Risco administrativo admite excludentes.
- Omissão exige análise do dever de agir e do nexo.
- Nem toda empresa privada responde pelo art. 37, §6º: o dispositivo menciona prestadoras de serviços públicos.

**Macete:** vítima → Estado = objetiva; Estado → agente = dolo ou culpa.')
) as v(slug, summary, body_md)
where m.slug = v.slug;