-- Expansão didática de Administração e Língua Portuguesa — PC-AC 2026.
update public.study_materials as m
set summary = v.summary, body_md = v.body_md, updated_at = now()
from (values
('pcac-2026-guia-administracao-geral-03-eficiencia-eficacia-efetividade-e-economicidade','Diferencia eficiência, eficácia, efetividade e economicidade com situações de prova, indicadores, exemplos numéricos e avaliação integrada de resultados.','# Eficiência, eficácia, efetividade e economicidade

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Uma equipe reduziu pela metade o gasto de material por atendimento, mantendo a mesma qualidade e quantidade de serviços. Qual dimensão melhorou diretamente?
>
> A) eficácia. B) efetividade. C) eficiência. D) legitimidade. E) hierarquia.
>
> **Resolução:** produzir a mesma entrega com menor uso de recursos, sem perder qualidade, melhora a eficiência. Gabarito: **C**.

## 1. Por que os conceitos confundem?
Os quatro termos avaliam dimensões diferentes do desempenho. Uma organização pode cumprir a meta e gastar muito; pode gastar pouco e não alcançar o objetivo; pode entregar o serviço e não mudar a realidade do usuário.

A banca costuma apresentar uma situação e pedir qual dimensão aparece diretamente.

## 2. Eficiência: relação entre recursos e entregas
Eficiência relaciona os recursos utilizados aos produtos ou serviços entregues. Busca reduzir desperdício, retrabalho, tempo e custo desnecessário sem comprometer qualidade e legalidade.

Exemplo: duas equipes concluem 100 atendimentos com qualidade equivalente. A equipe A usa 10 horas e a equipe B usa 8 horas. A equipe B foi mais eficiente, se as condições e a qualidade forem comparáveis.

Indicadores: custo por atendimento, tempo médio por processo, consumo de material por entrega e retrabalho.

## 3. Eficácia: alcance da meta
Eficácia diz respeito ao cumprimento de objetivos estabelecidos. Pergunta: a meta foi alcançada?

Exemplo: a unidade tinha meta de concluir 500 análises no mês e concluiu 500. A meta quantitativa foi atingida. Isso não informa, por si só, se o trabalho foi econômico nem se gerou impacto social.

Indicadores: percentual de metas alcançadas, quantidade de entregas concluídas e cumprimento de prazos.

## 4. Efetividade: impacto na realidade
Efetividade considera os efeitos concretos da ação sobre a realidade ou o público destinatário. Pergunta: a intervenção produziu a mudança relevante pretendida?

Exemplo: uma ação de atendimento cumpre a meta de quantidade, mas a efetividade depende de verificar se melhorou o acesso e resolveu as necessidades dos usuários.

Indicadores podem envolver mudança no problema público, satisfação, redução de danos ou melhoria sustentada, conforme o objetivo.

## 5. Economicidade: aquisição vantajosa
Economicidade envolve obter bens e serviços em condições vantajosas, considerando preço, qualidade, adequação, durabilidade e custos relacionados. Não significa escolher sempre o menor preço nominal.

Exemplo: uma impressora mais barata pode ter custo de manutenção e cartuchos muito maior. A opção mais econômica considera o custo total ao longo do uso, além da qualidade e da adequação.

## 6. Quadro comparativo
| Dimensão | Pergunta | Exemplo |
|---|---|---|
| Eficiência | Usou bem os recursos? | Menos custo por atendimento |
| Eficácia | Alcançou a meta? | Entregou 500 análises |
| Efetividade | Mudou a realidade? | Melhorou acesso ao serviço |
| Economicidade | Obteve condições vantajosas? | Menor custo total com qualidade |

## 7. As dimensões podem coexistir?
Sim. Uma unidade pode comprar equipamento com boa relação custo-benefício (economicidade), organizar seu uso com menos desperdício (eficiência), cumprir a quantidade prevista de atendimentos (eficácia) e melhorar o acesso da população (efetividade).

Uma dimensão não comprova automaticamente as demais.

## 8. Indicadores e cuidado com comparações
Indicador precisa de definição, fórmula, fonte, periodicidade e responsável. Compare unidades com complexidade e condições semelhantes. Não reduza qualidade a quantidade.

Se uma equipe diminui o tempo por atendimento, mas aumenta erros, não se pode concluir automaticamente que houve ganho de eficiência: a qualidade foi comprometida.

## 9. Pegadinhas
- Eficiência = recursos e entregas.
- Eficácia = metas.
- Efetividade = impacto.
- Economicidade = aquisição vantajosa, considerando custo e qualidade.
- Menor preço não significa sempre maior economicidade.
- Cumprir a meta não prova impacto social.

**Macete:** eficiência faz bem; eficácia alcança; efetividade transforma; economicidade compra de forma vantajosa.'),
('pcac-2026-guia-administracao-geral-10-estoques-inventarios-e-controle-patrimonial','Aprofunda gestão de materiais, níveis de estoque, estoque de segurança, ponto de pedido, Curva ABC, inventário físico, tombamento e controles patrimoniais.','# Estoques, inventários e controle patrimonial

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Em um almoxarifado, poucos itens concentram a maior parte do valor financeiro total estocado. Pela Curva ABC, esses itens devem ser classificados, em regra, como:
>
> A) classe A, com controle mais rigoroso. B) classe C, com controle mínimo obrigatório. C) classe B, independentemente do valor. D) itens sem relevância econômica. E) materiais inservíveis.
>
> **Resolução:** a classe A reúne, em regra, poucos itens que concentram grande parcela do valor de consumo. Gabarito: **A**.

## 1. Para que serve a gestão de materiais?
Busca garantir que o material adequado esteja disponível na quantidade, qualidade, local e momento necessários, com custo total compatível e sem desperdício.

O fluxo costuma envolver previsão da demanda, compras, recebimento, armazenagem, distribuição, controle e destinação. Falha em uma etapa pode afetar as demais.

## 2. Por que manter estoque?
Estoque protege a operação contra variação de demanda e atraso no fornecimento. Porém, estoque excessivo imobiliza recursos, ocupa espaço e aumenta risco de perda, dano e obsolescência. Estoque insuficiente pode interromper atividades.

O gestor procura equilibrar custo de aquisição, armazenagem, pedido, falta e reposição.

## 3. Conceitos de níveis de estoque
- **Estoque mínimo:** nível de proteção para evitar falta.
- **Estoque máximo:** limite de planejamento para evitar excesso.
- **Estoque de segurança:** reserva contra variações de demanda ou atraso.
- **Ponto de pedido:** nível em que se inicia a reposição.
- **Tempo de reposição:** intervalo entre solicitação e disponibilidade do material.
- **Lote de compra:** quantidade adquirida por pedido.

Exemplo simples: uma unidade consome 10 caixas por dia e o fornecedor leva 5 dias para entregar. Durante o prazo de reposição, são esperadas 50 caixas de consumo. Se a unidade mantém 15 caixas de segurança, o ponto de pedido simplificado será 65 caixas (50 + 15), desde que as premissas sejam estáveis.

## 4. Curva ABC
Classifica itens segundo sua relevância econômica acumulada, frequentemente calculada pelo valor anual de consumo (quantidade consumida × preço unitário).

- **A:** poucos itens concentram grande parcela do valor; controle rigoroso e acompanhamento frequente.
- **B:** importância intermediária.
- **C:** muitos itens representam parcela menor do valor; controles podem ser simplificados, sem abandonar responsabilidade.

Percentuais como 80/20 são referências didáticas, não regras universais. O resultado depende da distribuição real dos itens.

## 5. Inventário
Inventário verifica fisicamente e documentalmente bens e materiais. Pode ser:
- inicial;
- periódico ou anual;
- rotativo, em contagens contínuas;
- eventual, em situações específicas;
- de transferência ou encerramento de responsabilidade.

A contagem deve ser conciliada com registros, identificando falta, sobra, dano, localização incorreta e providências.

## 6. Patrimônio e tombamento
Bens permanentes devem ser identificados, registrados, localizados, atribuídos a responsáveis e acompanhados durante sua vida útil.

**Tombamento** é o registro individual do bem para controle e rastreabilidade. Não é sinônimo de avaliação financeira, nem significa que o bem seja necessariamente imóvel.

A movimentação, transferência, manutenção e baixa devem ser registradas e autorizadas conforme regras institucionais.

## 7. Recebimento e armazenagem
No recebimento, confira quantidade, especificação, integridade e documentação. Divergências devem ser registradas antes de atestar recebimento definitivo, conforme o procedimento aplicável.

Na armazenagem, considere peso, fragilidade, validade, temperatura, risco de incêndio, compatibilidade química, segurança e facilidade de localização. O material precisa estar identificado e protegido.

## 8. Segregação de funções e rastreabilidade
Sempre que possível, separe solicitação, autorização, recebimento, guarda e registro. Isso reduz erro e fraude. Registre entradas, saídas, ajustes, perdas e baixas com responsável, data e justificativa.

## 9. Exemplo resolvido
Um item tem consumo médio de 8 unidades por dia, reposição em 6 dias e estoque de segurança de 12 unidades. Ponto de pedido simplificado = (8 × 6) + 12 = 60 unidades. Ao atingir esse nível, a unidade inicia a reposição, considerando as premissas do cálculo.

## 10. Pegadinhas
- Curva ABC considera relevância acumulada, não apenas quantidade.
- Ponto de pedido considera consumo no prazo de reposição e estoque de segurança.
- Inventário físico não é substituído por saldo contábil.
- Tombamento identifica e controla o bem; não é avaliação.
- Estoque de segurança protege contra incerteza, não é estoque máximo.

**Macete:** ABC = valor; inventário = conferir existência; tombamento = identificar patrimônio; ponto de pedido = quando repor.'),
('pcac-2026-guia-administracao-geral-15-atendimento-ao-publico-etica-e-sigilo','Aprofunda acolhimento, escuta ativa, linguagem simples, impessoalidade, acessibilidade, ética, conflito de interesses, sigilo e proteção de dados.','# Atendimento ao público, ética e sigilo

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Um cidadão solicita informação sobre procedimento que contém dados pessoais de terceiros protegidos por sigilo. O servidor deve:
>
> A) divulgar todo o conteúdo para demonstrar transparência. B) negar qualquer orientação, sem explicar motivo. C) orientar sobre o que pode ser informado e preservar os dados protegidos, conforme as regras aplicáveis. D) enviar os dados por aplicativo pessoal. E) compartilhar a senha do sistema.
>
> **Resolução:** o atendimento deve conciliar transparência, orientação e proteção legal de informações. Gabarito: **C**.

## 1. O que é atendimento público de qualidade?
É acolher a demanda, compreender a necessidade, orientar com clareza e encaminhar corretamente, respeitando competências e procedimentos. Deve ser impessoal, acessível, respeitoso, eficiente e compatível com os direitos do usuário.

Atender não significa prometer que tudo será resolvido imediatamente. Significa explicar o que pode ser feito, por quem, em qual prazo e por qual canal.

## 2. Escuta ativa e comunicação simples
- permita que a pessoa explique a demanda;
- faça perguntas objetivas para esclarecer;
- confirme o que entendeu;
- use linguagem simples e evite jargões;
- explique etapas e documentos necessários;
- informe prazos reais, sem promessas indevidas;
- registre a demanda quando o procedimento exigir.

Escuta ativa não é concordar com tudo: é compreender corretamente antes de orientar.

## 3. Impessoalidade e urbanidade
Impessoalidade significa tratar as pessoas sem favorecimento ou perseguição, conforme critérios públicos. Não significa frieza ou falta de empatia.

Urbanidade exige respeito, educação e postura profissional, inclusive em situações de tensão. O servidor deve evitar ironia, discriminação, exposição desnecessária e tratamento humilhante.

## 4. Acessibilidade
Considere barreiras físicas, comunicacionais, digitais e atitudinais. Quando necessário, adapte canal, linguagem e forma de comunicação às necessidades do usuário, respeitando dignidade e autonomia.

A acessibilidade não é favor: é condição para que pessoas possam exercer seus direitos e utilizar o serviço.

## 5. Ética no serviço público
A conduta deve observar legalidade, finalidade pública, honestidade, imparcialidade, responsabilidade, transparência e zelo pelo patrimônio.

São incompatíveis com a ética funcional:
- favorecimento pessoal;
- uso privado de recursos públicos;
- recebimento de vantagem indevida;
- divulgação irregular de informação;
- omissão deliberada de providência;
- utilização do cargo para benefício próprio ou de terceiros.

## 6. Conflito de interesses
Ocorre quando interesse privado pode influenciar indevidamente o exercício da função pública. Deve ser identificado e tratado conforme as regras aplicáveis, com comunicação pelos canais competentes e afastamento de decisões quando necessário.

Não é preciso que o favorecimento já tenha ocorrido para que uma situação de risco seja relevante.

## 7. Sigilo e proteção da informação
Nem toda informação estatal é pública sem restrição. O acesso observa a Lei de Acesso à Informação, a LGPD, normas de sigilo legal e necessidade funcional.

Dados pessoais e informações de investigação exigem proteção e compartilhamento limitado a quem tenha atribuição e autorização. O dever de sigilo não pode ser usado para ocultar ilegalidades nem para impedir acesso legalmente assegurado.

## 8. Como agir diante de conflito com usuário
1. mantenha a calma e postura respeitosa;
2. escute e identifique o pedido;
3. explique o limite legal ou operacional com clareza;
4. indique alternativa ou canal correto;
5. registre ameaça ou ocorrência conforme protocolo;
6. não exponha dados nem responda com provocação.

## 9. Exemplo aplicado
Uma pessoa pede cópia de processo que contém estatísticas públicas e dados pessoais de terceiros. O servidor verifica as regras de acesso, orienta sobre o procedimento, fornece o conteúdo acessível e protege os trechos legalmente restritos, registrando a decisão.

## 10. Pegadinhas
- Impessoalidade não significa atendimento frio.
- Transparência é regra, mas há restrições legais legítimas.
- Sigilo protege informação, não irregularidade.
- Acessibilidade envolve barreiras físicas, digitais e atitudinais.
- Ética exige finalidade pública e responsabilidade.
- Atendimento não autoriza compartilhar senha ou usar canal pessoal inseguro.

**Macete:** acolher, entender, orientar, encaminhar e proteger a informação.'),
('pcac-2026-portugues-colocacao-pronominal','Aprofunda próclise, ênclise e mesóclise, palavras atrativas, início de oração, imperativo, locuções verbais, casos especiais e questões de reescrita.','# Colocação pronominal: próclise, ênclise e mesóclise

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Assinale a frase adequada à norma-padrão:
>
> A) Não informou-me sobre a alteração. B) Não me informou sobre a alteração. C) Informaria-me não sobre a alteração. D) Me informou não sobre a alteração. E) Não informou sobre a alteração-me.
>
> **Resolução:** “não” é palavra negativa que atrai o pronome para antes do verbo. Gabarito: **B**.

## 1. O que é colocação pronominal?
É a posição dos pronomes oblíquos átonos em relação ao verbo. Os principais são me, te, se, o(s), a(s), lhe(s), nos e vos.

- Próclise: antes do verbo — “Não me avisaram”.
- Ênclise: depois do verbo — “Avisaram-me”.
- Mesóclise: no interior do verbo — “Avisar-me-ão”.

## 2. Próclise: fatores de atração
A próclise ocorre quando há elemento atrativo:
- palavras negativas: não, nunca, jamais, ninguém;
- pronomes relativos: que, quem, cujo, onde;
- conjunções subordinativas: quando, porque, embora, se;
- pronomes indefinidos: alguém me chamou;
- advérbios sem pausa: aqui se trabalha; talvez me chamem;
- frases interrogativas, exclamativas e optativas: Quem te contou? Como se enganou! Deus o acompanhe!

**Exemplo comentado:** “Nunca se divulgou o resultado.” O advérbio negativo nunca atrai o pronome se. A ênclise “nunca divulgou-se” não atende à norma-padrão tradicional.

## 3. Ênclise
Na norma-padrão tradicional, evita-se iniciar oração formal com pronome átono. Assim: “Informaram-me o resultado”. Também aparece com imperativo afirmativo: “Apresente-se”.

Não aplique a ênclise mecanicamente: palavra atrativa pode exigir próclise.

## 4. Mesóclise
Ocorre com futuro do presente ou futuro do pretérito quando não há fator de próclise:
- Dar-lhe-ei resposta.
- Convidar-me-iam para a reunião.

Havendo atrator, a próclise prevalece: “Não lhe darei resposta”. A mesóclise é formal e aparece em questões de norma-padrão.

## 5. Locuções verbais
Em locuções, a posição depende da estrutura e dos fatores de atração:
- “Quero apresentar-lhe o relatório.”
- “Não lhe quero apresentar o relatório.”
- “Vou preparar-me para a prova.”

Em construções com auxiliar e verbo principal, observe a norma cobrada e a presença de palavra atrativa. A banca pode pedir reescrita preservando sentido e correção.

## 6. Pronome átono × pronome tônico
“Me” é átono e participa da colocação pronominal: “Não me avisaram”.
“Mim” é tônico e normalmente vem após preposição: “Entregaram o documento a mim”.
Não se escreve “entre eu” quando o pronome funciona como complemento de preposição; a construção padrão é “entre mim”.

## 7. Estratégia para questões
1. Localize o pronome.
2. Identifique o verbo e sua forma.
3. Procure palavra atrativa.
4. Se houver atrator, avalie próclise.
5. Se houver futuro sem atrator, avalie mesóclise.
6. Na ausência de atração, verifique início de oração e possibilidade de ênclise.
7. Em locução verbal, analise o conjunto.

## 8. Pegadinhas
- “Não se esqueça”: próclise por palavra negativa.
- “Quem te avisou?”: próclise por pronome interrogativo.
- “Apresente-se”: ênclise com imperativo afirmativo.
- “Dar-lhe-ei”: mesóclise no futuro sem atrator.
- “Nunca dir-lhe-ei”: inadequado; “nunca” atrai: “Nunca lhe direi”.
- Pronome tônico “mim” não é colocado junto ao verbo como átono.

**Macete:** antes = próclise; depois = ênclise; no meio = mesóclise. Primeiro procure o atrator.'),
('pcac-2026-portugues-crase-emprego-casos','Aprofunda crase por regência, artigo feminino, teste do masculino, locuções, horas, demonstrativos, nomes de lugares, casos proibidos e facultativos.','# Crase: regra geral, casos obrigatórios, proibidos e facultativos

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Assinale a frase em que a crase está corretamente empregada:
>
> A) O relatório foi enviado à prazo. B) A equipe permaneceu à disposição. C) O servidor começou à revisar. D) A reunião será à cada semana. E) O documento foi entregue à ele.
>
> **Resolução:** “à disposição” é locução feminina que recebe acento grave. Gabarito: **B**.

## 1. O que é crase?
Crase é a fusão da preposição a com artigo feminino a/as ou com certos pronomes demonstrativos iniciados por a. O acento grave marca a fusão: à, às, àquele, àquela, àquilo.

Não basta a palavra seguinte ser feminina. É preciso verificar se o termo anterior exige preposição a e se o seguinte admite artigo feminino.

## 2. Regra geral e teste do masculino
Exemplo: “O servidor obedeceu à norma.”
- obedecer exige preposição a;
- “a norma” admite artigo feminino;
- a + a = à.

Teste: substitua o termo feminino por masculino equivalente. Se surgir “ao”, normalmente haverá crase no feminino:
- obedeceu ao regulamento;
- obedeceu à norma.

O teste é auxiliar; a regência e o contexto são decisivos.

## 3. Locuções femininas e horas
Locuções femininas frequentes: à noite, às pressas, à medida que, à procura de, à disposição, à direita, à esquerda.

Horas determinadas: às 8h, às 14h30, à uma hora, conforme o contexto. Compare:
- “A reunião começa às 9h.” (horário determinado)
- “Daqui a duas horas começa a reunião.” (tempo futuro, sem crase)

## 4. Pronomes demonstrativos
Pode ocorrer crase antes de aquele(s), aquela(s) e aquilo quando o termo anterior exige preposição a:
- referiu-se àquele fato;
- entregou o documento àquela servidora;
- não deu importância àquilo.

O acento representa a fusão da preposição com o a inicial do pronome.

## 5. Nomes de lugares
O uso do artigo varia:
- vou a Brasília;
- volto de Brasília;
- vou à Bahia;
- volto da Bahia.

Macete: se volto “da”, vou “à”; se volto “de”, vou “a”, em construções comuns de destino. Há exceções e nomes com uso variável, por isso confirme o uso consagrado.

## 6. Casos em que não ocorre
- antes de verbo: começou a estudar;
- antes de palavra masculina: a prazo, a pé;
- antes de pronome pessoal: a ela, a mim;
- antes de artigo indefinido: a uma pessoa;
- entre palavras repetidas: cara a cara, frente a frente;
- em construções com “a cada”: a cada semana.

## 7. Casos facultativos
Pode ser facultativa:
- antes de pronome possessivo feminino singular: entreguei a/à minha colega;
- antes de nome próprio feminino, conforme o uso do artigo: referi-me a/à Ana;
- depois da preposição até: fui até a/à escola.

A facultatividade depende da construção e do uso do artigo; não autoriza acento indiscriminado.

## 8. Crase muda o sentido?
Compare “à noite” (locução temporal) e “a noite” (artigo + substantivo, como em “a noite estava fria”). A presença do acento não é decoração: indica a estrutura da frase.

“A princípio” significa inicialmente; “em princípio” significa em tese. “À medida que” expressa proporção.

## 9. Método de prova
1. Identifique o termo regente.
2. Verifique se exige preposição a.
3. Observe se o termo seguinte admite artigo feminino.
4. Faça o teste do masculino.
5. Confira proibições e casos facultativos.
6. Só então use o acento grave.

## 10. Pegadinhas
- Palavra feminina não significa crase automática.
- Antes de verbo, não há crase.
- Horas determinadas normalmente recebem crase; “daqui a” indica futuro.
- “Àquele” pode receber crase.
- “A prazo” não recebe crase.
- A regência é o ponto de partida.

**Macete:** crase = preposição exigida + artigo/pronome compatível. Regência primeiro, acento depois.')
) as v(slug, summary, body_md)
where m.slug = v.slug;