-- Ampliação de Estatística, Raciocínio Lógico, Realidade do Acre e Administração — PC-AC 2026.
update public.study_materials as m
set summary = v.summary, body_md = v.body_md, updated_at = now()
from (values
('pcac-2026-administracao-publica-funcoes-processos-equipes-recursos','Revisão integradora com questões aplicadas sobre PODC, eficiência, eficácia, efetividade, processos, equipes, gestão de materiais, informação e atendimento.','# Revisão integradora de Administração Pública

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Uma unidade policial define a meta de reduzir o tempo de atendimento, distribui servidores por turnos, orienta a equipe e compara os resultados com a meta. A comparação dos resultados com o padrão esperado corresponde à função de:
>
> A) planejamento. B) organização. C) direção. D) controle. E) departamentalização.
>
> **Resolução:** controle compara o resultado realizado com metas e padrões, identifica desvios e orienta correções. Gabarito: **D**.

## 1. Funções administrativas — PODC
O processo administrativo é tradicionalmente descrito por quatro funções:
- **Planejamento:** define objetivos, prioridades, ações, recursos e indicadores.
- **Organização:** distribui tarefas, responsabilidades, autoridade e recursos.
- **Direção:** conduz pessoas, comunica, motiva e coordena a execução.
- **Controle:** compara resultados com padrões, identifica desvios e promove correções.

As funções são interdependentes e contínuas, não uma sequência rígida que termina após o controle.

## 2. Eficiência, eficácia, efetividade e economicidade
- Eficiência: relação entre recursos utilizados e entregas; reduzir desperdício sem perder qualidade.
- Eficácia: alcance das metas e objetivos.
- Efetividade: impacto concreto na realidade ou no público.
- Economicidade: obtenção vantajosa, considerando custo total, qualidade e adequação.

Exemplo: comprar equipamento com boa relação custo-benefício (economicidade), usá-lo sem desperdício (eficiência), cumprir a meta de atendimentos (eficácia) e melhorar o acesso da população (efetividade).

## 3. Estrutura e processos
Estrutura organizacional define unidades, autoridade, responsabilidades e comunicação. Organograma representa relações formais; não mostra necessariamente relações informais.

Processo é conjunto de atividades relacionadas que transforma entradas em resultados para usuário interno ou externo. Pode atravessar vários setores.

Mapear processos ajuda a identificar etapas, responsáveis, gargalos, retrabalho e controles. AS IS descreve como funciona hoje; TO BE descreve o fluxo futuro proposto.

## 4. Trabalho em equipe e liderança
Equipe exige objetivo compartilhado, papéis coordenados, comunicação, cooperação e responsabilidade pelo resultado. Grupo de pessoas no mesmo setor não é automaticamente equipe.

Liderança envolve influência e mobilização. Chefia é posição formal; liderança pode ser formal ou informal. Conflitos de tarefa podem ser construtivos se tratados com respeito e foco no resultado.

## 5. Gestão do tempo
Urgência não significa necessariamente importância. Na matriz de Eisenhower:
- importante e urgente: fazer;
- importante e não urgente: planejar;
- urgente e pouco importante: avaliar delegação;
- nem importante nem urgente: reduzir ou eliminar.

Delegar exige competência, clareza, recursos e acompanhamento.

## 6. Recursos materiais
Gestão de materiais envolve previsão, aquisição, recebimento, armazenamento, distribuição e controle. Curva ABC classifica itens por relevância econômica acumulada. Inventário verifica existência e condição; tombamento identifica e rastreia bens permanentes.

Ponto de pedido considera consumo durante prazo de reposição e estoque de segurança.

## 7. Informação e conhecimento
Dado é registro bruto; informação é dado contextualizado; conhecimento é interpretação aplicada à decisão.

Gestão da informação cuida de coleta, organização, acesso, segurança e recuperação. Gestão do conhecimento registra e compartilha experiências, procedimentos e lições aprendidas.

## 8. Atendimento, ética e sigilo
Atendimento público deve observar respeito, clareza, impessoalidade, acessibilidade e orientação adequada. Transparência é regra, mas dados pessoais e informações legalmente protegidas exigem controle de acesso.

O servidor não deve compartilhar senhas, favorecer pessoas ou utilizar informação institucional para benefício particular.

## 9. Como resolver questões integradoras
1. Identifique o verbo da situação: planejar, organizar, dirigir ou controlar.
2. Se a questão falar de recursos, compare custo e entrega.
3. Se falar de meta, pense em eficácia.
4. Se falar de impacto social, pense em efetividade.
5. Se falar de fluxo de ponta a ponta, pense em processo.
6. Se falar de coordenação e objetivo compartilhado, pense em equipe.
7. Se falar de informação protegida, verifique finalidade e autorização.

## 10. Pegadinhas
- PODC: controle = comparar e corrigir.
- Eficiência não é sinônimo de eficácia.
- Organograma não é fluxograma.
- Grupo não é necessariamente equipe.
- Urgência não é igual a importância.
- Inventário físico não é substituído por saldo contábil.
- Transparência não significa divulgação irrestrita.

**Macete:** planejar define; organizar distribui; dirigir conduz; controlar compara e corrige.'),
('pcac-2026-estatistica-probabilidade-condicional-distribuicoes-aplicacao','Aprofunda espaço amostral, eventos, união, interseção, complementar, probabilidade condicional, independência, distribuições discretas/contínuas e exercícios passo a passo.','# Probabilidade condicional, independência e distribuições

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Em um conjunto de 100 registros, 30 correspondem a ocorrências noturnas e 12 são ocorrências noturnas com determinado tipo de vestígio. Sabendo que o registro escolhido é noturno, qual a probabilidade de conter esse vestígio?
>
> A) 12%. B) 30%. C) 40%. D) 70%. E) 100%.
>
> **Resolução:** “sabendo que é noturno” reduz o universo aos 30 registros noturnos. Desses, 12 têm o vestígio: 12 ÷ 30 = 0,4 = **40%**.

## 1. Antes de calcular: entenda o universo
Probabilidade mede a chance de um evento ocorrer, considerando um conjunto de resultados possíveis.

- **Espaço amostral (Ω):** conjunto de resultados possíveis.
- **Evento:** subconjunto do espaço amostral.
- **Evento certo:** probabilidade 1.
- **Evento impossível:** probabilidade 0.

Se uma base tem 100 registros, esse é o universo inicial. Mas, quando a questão diz “entre os noturnos”, o universo deixa de ser 100 e passa a ser o conjunto dos registros noturnos.

## 2. Probabilidade simples
Quando os resultados são equiprováveis:

[
P(A)=rac{	ext{casos favoráveis}}{	ext{casos possíveis}}
]

Exemplo: em 20 relatórios, 5 apresentam determinada característica. A probabilidade de escolher um relatório com essa característica é 5/20 = 0,25 = 25%.

A probabilidade sempre fica entre 0 e 1, ou entre 0% e 100%.

## 3. União, interseção e complementar
- União A ∪ B: A ou B, incluindo a possibilidade de ambos.
- Interseção A ∩ B: A e B simultaneamente.
- Complementar Aᶜ: tudo o que não pertence a A.

Fórmula da união:

[
P(Acup B)=P(A)+P(B)-P(Acap B)
]

Por que subtrair a interseção? Porque, ao somar A e B, os casos que pertencem aos dois foram contados duas vezes.

**Exemplo:** 40% dos registros são noturnos, 30% têm determinado vestígio e 10% são ambos. A chance de ser noturno ou ter o vestígio é 40% + 30% − 10% = 60%.

## 4. Complementar
[
P(A^c)=1-P(A)
]

Se a chance de um registro apresentar erro é 8%, a chance de não apresentar erro é 92%.

Esse recurso é útil quando a questão pede “pelo menos um”. Às vezes é mais fácil calcular a chance de nenhum ocorrer e subtrair de 1.

## 5. Probabilidade condicional
A expressão “sabendo que”, “dado que” ou “entre os que” indica condição.

[
P(A|B)=rac{P(Acap B)}{P(B)}
]

Exemplo da abertura: 12 registros têm vestígio e são noturnos; existem 30 registros noturnos. Logo, P(vestígio | noturno) = 12/30 = 40%.

**Macete:** o grupo depois de “sabendo que” vira o novo denominador.

## 6. Regra da multiplicação
[
P(Acap B)=P(A|B)	imes P(B)
]

Se 30% dos registros são noturnos e, entre eles, 40% têm o vestígio, a chance de escolher um registro que seja noturno e tenha o vestígio é 0,30 × 0,40 = 0,12 = 12%.

## 7. Independência e exclusão
Eventos são independentes quando a ocorrência de um não altera a probabilidade do outro:

[
P(A|B)=P(A)
]

ou

[
P(Acap B)=P(A)	imes P(B)
]

Eventos mutuamente exclusivos não podem ocorrer juntos: A ∩ B = ∅. Se ambos têm probabilidade positiva, não são independentes, porque a ocorrência de um impede o outro.

**Pegadinha:** independência não significa “eventos diferentes”; exclusão significa que não podem acontecer simultaneamente.

## 8. Distribuições de probabilidade
Uma variável aleatória associa valores numéricos a resultados de um experimento.

- **Discreta:** assume valores contáveis, como número de chamadas em uma hora.
- **Contínua:** pode assumir qualquer valor em intervalo, como duração de atendimento.

Em distribuição discreta, a soma das probabilidades é 1. Em distribuição contínua, probabilidades são calculadas em intervalos; a probabilidade de um ponto isolado é zero no modelo contínuo.

## 9. Distribuição binomial
É usada para contar o número de sucessos em n tentativas, quando:
- o número de tentativas é fixo;
- cada tentativa tem dois resultados (sucesso/fracasso);
- a probabilidade de sucesso é constante;
- as tentativas são independentes.

Exemplo: verificar 5 registros, com probabilidade constante de 10% de erro em cada um, sob independência. A variável pode representar quantos registros apresentam erro.

Não use binomial se a probabilidade variar ou se as tentativas não forem independentes.

## 10. Roteiro para resolver questões
1. Identifique o universo total.
2. Traduza “e” como interseção; “ou” como união.
3. Se houver “sabendo que”, restrinja ao grupo condicionante.
4. Se disser independente, verifique a hipótese antes de multiplicar.
5. Se os eventos puderem coincidir, desconte a interseção na união.
6. Converta decimal para percentual no final.

## 11. Erros frequentes
- Dividir pelo total quando a questão pede probabilidade condicional.
- Somar probabilidades sem subtrair a interseção.
- Tratar independência como sinônimo de exclusão.
- Assumir distribuição binomial sem verificar requisitos.
- Confundir 0,4 com 4%; 0,4 = 40%.

**Macete final:** universo → evento → condição → fórmula → conta → interpretação.'),
('pcac-2026-lc39-licenca-premio-regras-aquisicao-concessao','Aprofunda arts. 133 a 135 da LC 39/1993, hipóteses que impedem aquisição, faltas injustificadas, gozo por servidor em chefia e direito de requerer; inclui cautela de atualização legal.','# LC nº 39/1993 — licença-prêmio e hipóteses que afetam sua aquisição

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Segundo o art. 134 da LC nº 39/1993, cada falta injustificada durante o período aquisitivo:
>
> A) extingue todo o direito. B) retarda a concessão em um mês. C) reduz a licença pela metade. D) gera advertência automática. E) não produz efeito.
>
> **Resolução:** o parágrafo único do art. 134 prevê retardamento de um mês para cada falta injustificada. Gabarito: **B**.

## 1. Servidor em cargo de direção ou chefia — art. 133
O servidor efetivo que ocupar cargo em comissão ou função de direção ou chefia ficará afastado durante o gozo da licença-prêmio, com todos os direitos e vantagens inerentes ao cargo.

Atenção à diferença: o dispositivo trata do afastamento do exercício da função de direção/chefia durante o gozo, preservando direitos e vantagens previstos no artigo.

## 2. Hipóteses que impedem a aquisição no período — art. 134
Não se concede licença-prêmio ao servidor que, durante o período aquisitivo:
- sofrer penalidade disciplinar de suspensão;
- afastar-se do cargo em licença por motivo de doença em pessoa da família sem remuneração;
- afastar-se para tratar de interesses particulares;
- cumprir condenação a pena privativa de liberdade por sentença definitiva;
- afastar-se para acompanhar cônjuge, companheiro ou companheira.

As faltas injustificadas retardam a concessão na proporção de um mês para cada falta.

## 3. Requerimento — art. 135
O direito de requerer licença-prêmio não prescreve nem está sujeito a caducidade.

Isso não significa que qualquer período aquisitivo esteja automaticamente completo: condições de aquisição e direito de requerer são questões distintas.

## 4. Entenda na prática
Pense no período aquisitivo como um caminho que o servidor precisa cumprir para adquirir o benefício. O art. 134 não diz que qualquer afastamento ou qualquer punição produz o mesmo efeito: ele enumera situações específicas.

Exemplo: se, durante o período aquisitivo, o servidor sofre suspensão disciplinar, incide a hipótese do art. 134. Se a licença por doença em pessoa da família for sem remuneração, também há impedimento; não amplie a regra para licença remunerada.

Se houver uma falta injustificada, o texto prevê retardamento de um mês para cada falta. Três faltas injustificadas retardam a concessão em três meses, conforme o dispositivo.

## 5. Como a banca pode cobrar
- trocar “sem remuneração” por “com remuneração”;
- substituir suspensão por advertência;
- dizer que o direito de requerer prescreve;
- inverter a proporção das faltas injustificadas;
- confundir impedimento de aquisição com atraso da concessão.

## 6. Roteiro de resolução
1. Localize o artigo citado.
2. Circule a condição exata: suspensão, licença sem remuneração, interesse particular, condenação definitiva ou acompanhamento de cônjuge/companheiro.
3. Separe impedimento de aquisição, atraso por falta injustificada e direito de requerer.
4. Desconfie de alternativas que generalizam “qualquer licença” ou “qualquer penalidade”.

## 7. Atualização legislativa e cautela
A LC nº 525/2026 alterou a LC nº 39/1993 e revogou o §4º do art. 282. Essa alteração deve ser considerada na leitura do Estatuto consolidado, embora não substitua as regras específicas dos arts. 133 a 135 aqui estudadas.

Fonte oficial da LC nº 39/1993: https://www.legis.ac.gov.br/detalhar/110
Alteração de 2026: https://www.legis.ac.gov.br/detalhar/6864-1

**Macete:** art. 134 enumera impedimentos; falta injustificada retarda um mês; art. 135 preserva o direito de requerer.'),
('pcac-2026-raciocinio-logico-proposicoes-negacao-equivalencias','Aprofunda proposições simples/compostas, conectivos, tabelas-verdade, negações, equivalências, condicional, contrapositiva e quantificadores com exemplos.','# Lógica proposicional: conectivos, negação e equivalências sem decorar fórmulas

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Considere: “Se o vestígio foi preservado, então poderá ser periciado”. Qual é a negação lógica dessa proposição?
>
> A) O vestígio não foi preservado e não poderá ser periciado. B) O vestígio foi preservado e não poderá ser periciado. C) O vestígio não foi preservado ou poderá ser periciado. D) Se não foi preservado, então não poderá ser periciado. E) O vestígio foi preservado ou poderá ser periciado.
>
> **Resolução:** a negação de “Se P, então Q” é “P e não Q”. Gabarito: **B**.

## 1. O que é proposição?
É uma frase declarativa à qual se pode atribuir valor verdadeiro (V) ou falso (F), mas não ambos simultaneamente.

- “O laudo foi juntado aos autos.” É proposição.
- “Junte o laudo!” É ordem, não proposição.
- “Qual foi o horário?” É pergunta, não proposição.

Proposição simples não contém conectivo lógico. Proposição composta combina proposições por conectivos.

## 2. Conectivos essenciais
- **Conjunção (P e Q):** verdadeira somente quando ambas são verdadeiras.
- **Disjunção inclusiva (P ou Q):** falsa somente quando ambas são falsas; admite que as duas sejam verdadeiras.
- **Condicional (se P, então Q):** falsa somente quando P é verdadeira e Q é falsa.
- **Bicondicional (P se e somente se Q):** verdadeira quando P e Q têm o mesmo valor lógico.
- **Negação (não P):** inverte o valor lógico.

## 3. Tabela-verdade da condicional
| P | Q | P → Q |
|---|---|---|
| V | V | V |
| V | F | F |
| F | V | V |
| F | F | V |

Macete: a condicional só falha quando a promessa “se P, então Q” é quebrada: P acontece e Q não.

Exemplo: “Se o sistema está conectado, o registro será enviado.” A única situação que torna a frase falsa é o sistema estar conectado e o registro não ser enviado.

## 4. Negação sem erro
- Negação de P: não P.
- Negação de “P e Q”: não P ou não Q.
- Negação de “P ou Q”: não P e não Q.
- Negação de “Se P, então Q”: P e não Q.
- Negação de “P se e somente se Q”: (P e não Q) ou (não P e Q).

**Exemplo cotidiano:** “O sistema está ligado e conectado.” Negar não é “está desligado e desconectado”; basta que uma das partes falhe: “não está ligado ou não está conectado”.

## 5. Equivalências importantes
- P → Q equivale a não P ou Q.
- P → Q equivale à contrapositiva: não Q → não P.
- Dupla negação: não (não P) equivale a P.
- Leis de De Morgan: negue cada parte e troque “e” por “ou”, ou vice-versa.

A recíproca Q → P não é equivalente à condicional P → Q. A inversa não P → não Q também não é equivalente em geral. A contrapositiva, sim.

## 6. “Se”, “somente se” e “se e somente se”
- “P se Q” normalmente expressa Q → P.
- “P somente se Q” expressa P → Q.
- “P se e somente se Q” expressa P ↔ Q.

Exemplo: “O servidor será promovido somente se cumprir os requisitos” significa: se for promovido, então cumpriu os requisitos. Não afirma que todo aquele que cumpre os requisitos será promovido.

## 7. Quantificadores
- “Todos os relatórios foram revisados” → negação: “Pelo menos um relatório não foi revisado”.
- “Algum relatório foi revisado” → negação: “Nenhum relatório foi revisado”.
- “Nenhum relatório foi revisado” → negação: “Pelo menos um foi revisado”.

**Macete:** negar “todo” vira “existe pelo menos um que não”; negar “algum” vira “nenhum”.

## 8. Como resolver
1. Separe as proposições simples e atribua letras.
2. Identifique o conectivo principal.
3. Se pedirem negação, negue a estrutura inteira.
4. Se pedirem equivalência, procure contrapositiva ou eliminação da condicional.
5. Confira com um caso que torne a frase falsa.

## 9. Pegadinhas
- “Ou” lógico geralmente é inclusivo, salvo indicação de exclusividade.
- Condicional não é falsa quando o antecedente é falso.
- Recíproca não é contrapositiva.
- Negar “todos” não é dizer “nenhum”.
- “Somente se” indica condição necessária, não suficiente.

**Macete final:** descubra a estrutura, identifique o conectivo e só depois aplique a regra.'),
('pcac-2026-realidade-acre-constituicao-indigenas-indicadores','Aprofunda Constituição Estadual do Acre, organização dos Poderes, capital, limites históricos, povos indígenas, proteção de isolados e leitura correta de indicadores por ano de referência.','# Acre: Constituição Estadual, povos indígenas e indicadores sociais

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Segundo a organização constitucional do Estado do Acre, os Poderes estaduais são:
>
> A) Executivo, Ministério Público e Tribunal de Contas. B) Legislativo, Executivo e Judiciário. C) Legislativo, Judiciário e Polícia Civil. D) Executivo, Judiciário e municípios. E) Legislativo, Executivo e União.
>
> **Resolução:** o art. 6º da Constituição Estadual estabelece Legislativo, Executivo e Judiciário, independentes e harmônicos entre si. Gabarito: **B**.

## 1. Constituição do Estado do Acre
O art. 1º define o Acre como parte integrante da República Federativa do Brasil, com autonomia e organização regidas pela Constituição Estadual e pelas leis que adotar.

O art. 2º remete aos limites definidos pelo Tratado de Petrópolis (1903), pelo Tratado do Rio de Janeiro (1909) e pelo art. 12, §5º, do ADCT da Constituição Federal.

## 2. Poderes estaduais e capital
O art. 6º estabelece três Poderes estaduais — Legislativo, Executivo e Judiciário — independentes e harmônicos entre si. Em regra, é vedada a delegação de atribuições entre Poderes e quem exerce função de um Poder não pode exercer a de outro.

O art. 7º estabelece Rio Branco como capital, admitindo transferência temporária nas condições constitucionais.

O art. 45 trata de matérias sobre as quais a Assembleia Legislativa legisla com sanção do Governador, incluindo matérias de competência estadual, criação de cargos, tributos, orçamento e efetivos das forças de segurança, nos termos da redação vigente.

## 3. Povos indígenas no Acre
O Acre abriga povos indígenas com diferentes histórias de contato, línguas, formas de organização e territórios tradicionais. A presença indígena é parte central da formação histórica e social do estado.

É importante distinguir:
- povos indígenas em contato permanente;
- povos de recente contato, que mantêm relações intermitentes ou recentes com a sociedade nacional;
- povos isolados, que evitam ou não mantêm contato regular.

As categorias não são intercambiáveis.

## 4. Proteção de povos isolados e de recente contato
A Fundação Nacional dos Povos Indígenas (FUNAI) atua no monitoramento e proteção territorial de povos isolados e de recente contato. A proteção respeita a decisão de permanecer em isolamento e evita promover contato forçado.

A Frente de Proteção Etnoambiental Envira realiza ações de monitoramento no Acre por meios terrestres, aéreos e sensoriamento remoto. Em notícia publicada em 05/11/2026, a FUNAI informou que a FPE Envira acompanhava oito registros: seis referências confirmadas e duas em estudo. Esse número é um recorte temporal e pode mudar.

## 5. Indicadores demográficos e sociais
Segundo o IBGE Cidades e Estados:
- Acre possui 22 municípios.
- Área territorial: 164.064,761 km² (referência 2025).
- Censo 2022: 830.018 habitantes.
- Densidade demográfica no Censo 2022: 5,06 hab./km².
- Estimativa populacional 2026: 887.794 habitantes.
- IDH informado na página estadual: 0,71 (2021).

**Atenção à data:** população censitária, estimativa, área, renda e IDH têm anos de referência diferentes. Não trate estimativa como resultado censitário.

## 6. Como interpretar indicadores
- População: quantidade de habitantes em determinado ano ou levantamento.
- Densidade demográfica: população dividida pela área.
- IDH: indicador sintético que considera dimensões de saúde, educação e renda.
- Taxa: relação entre ocorrências e população/exposição de referência.

Uma contagem absoluta não é automaticamente uma taxa. Ao comparar municípios, observe população, área, período e fonte.

## 7. Pegadinhas
- Os Poderes estaduais são Legislativo, Executivo e Judiciário.
- Rio Branco é a capital do Acre.
- Os limites estaduais remetem a Petrópolis (1903) e ao Tratado do Rio de Janeiro (1909).
- Povos isolados e povos de recente contato são categorias diferentes.
- A contagem de registros monitorados pela FUNAI é dinâmica.
- População do Censo 2022 (830.018) não é a estimativa de 2026 (887.794).

**Macete:** Constituição = Poderes e capital; história = tratados; realidade indígena = proteção e autonomia; indicadores = sempre confira o ano.')
) as v(slug, summary, body_md)
where m.slug = v.slug;