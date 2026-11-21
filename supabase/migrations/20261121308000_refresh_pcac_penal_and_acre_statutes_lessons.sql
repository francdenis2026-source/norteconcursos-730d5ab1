-- Atualização legal e expansão didática de Direito Penal e Legislação Institucional — PC-AC 2026.
update public.study_materials as m
set summary = v.summary, body_md = v.body_md, updated_at = now()
from (values
('pcac-2026-direito-penal-01-aplicacao-lei-penal','Aprofunda legalidade, anterioridade, lei penal no tempo, abolitio criminis, novatio legis, leis temporárias, territorialidade, extraterritorialidade e teorias do tempo e lugar do crime.','# Aplicação da lei penal

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Uma lei nova deixa de considerar criminosa determinada conduta. Um fato idêntico foi praticado antes da lei nova e a pena ainda está em execução. Qual consequência decorre da abolitio criminis?
>
> A) a lei nova não alcança fatos anteriores. B) a lei nova retroage e cessam os efeitos penais da condenação. C) só alcança processos sem sentença. D) converte a pena em multa. E) só retroage se for mais grave.
>
> **Resolução:** a abolitio criminis é lei posterior mais benéfica: retroage e faz cessar a execução e os efeitos penais da condenação. Gabarito: **B**.

## 1. Princípio da legalidade
Não há crime sem lei anterior que o defina, nem pena sem prévia cominação legal (CF, art. 5º, XXXIX; CP, art. 1º). A lei penal deve existir antes do fato para fundamentar a punição.

A legalidade impede que costume, analogia prejudicial ou decisão isolada criem crime ou pena sem lei.

## 2. Lei penal no tempo
A regra é aplicar a lei vigente no momento da conduta. A lei posterior mais grave não retroage; a lei posterior mais benéfica retroage.

- **Abolitio criminis:** lei nova deixa de considerar o fato criminoso. Cessam execução e efeitos penais da condenação, mas não se apagam automaticamente efeitos civis.
- **Novatio legis in mellius:** lei nova mantém o crime, mas melhora a situação do agente; retroage.
- **Novatio legis in pejus:** lei nova prejudica; não retroage.
- **Lei temporária ou excepcional:** aplica-se ao fato praticado durante sua vigência, mesmo depois de encerrado o período ou a circunstância que a motivou (ultratividade).

## 3. Tempo do crime — teoria da atividade
Considera-se praticado o crime no momento da ação ou omissão, ainda que outro seja o momento do resultado (CP, art. 4º).

Exemplo: o agente pratica a conduta em um dia e o resultado ocorre depois. Para o tempo do crime, considera-se o momento da conduta.

## 4. Lugar do crime — teoria da ubiquidade
Considera-se praticado o crime onde ocorreu a ação ou omissão, no todo ou em parte, e onde se produziu ou deveria produzir-se o resultado (CP, art. 6º).

**Macete:** tempo = atividade; lugar = ubiquidade.

## 5. Territorialidade e extraterritorialidade
O CP adota territorialidade temperada: aplica-se a lei brasileira ao crime cometido no território nacional, sem prejuízo de convenções, tratados e regras de direito internacional.

A extraterritorialidade permite aplicação da lei brasileira a fatos ocorridos fora do país nas hipóteses do art. 7º. Algumas hipóteses são incondicionadas; outras dependem de requisitos como entrada do agente no Brasil, dupla tipicidade, possibilidade de extradição e ausência de absolvição/cumprimento de pena no exterior.

Não conclua que todo crime praticado no exterior pode ser julgado pela lei brasileira. Identifique o inciso e os requisitos.

## 6. Exemplo resolvido
Uma lei reduz a pena de determinado crime após a prática do fato. Mesmo que já exista condenação definitiva, a lei mais benéfica pode retroagir. Se a lei posterior deixa de considerar o fato criminoso, há abolitio criminis e cessam os efeitos penais nos termos do art. 2º.

## 7. Pegadinhas
- Lei benéfica retroage; lei mais grave não.
- Abolitio criminis cessa efeitos penais, não elimina automaticamente efeitos civis.
- Tempo do crime = atividade.
- Lugar do crime = ubiquidade.
- Lei temporária/excepcional pode ter ultratividade.
- Extraterritorialidade depende da hipótese e, em alguns casos, de condições.

## 8. Fonte legal para revisão
Código Penal consolidado no Portal da Legislação da Presidência da República: https://planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm

**Dica de prova:** antes de escolher, identifique se a questão pergunta quando o crime ocorreu, onde ocorreu ou qual lei é mais benéfica.'),
('pcac-2026-direito-penal-02-teoria-do-crime','Aprofunda fato típico, dolo e culpa, nexo causal, tentativa, desistência voluntária, arrependimento eficaz/posterior, ilicitude, culpabilidade e concurso de pessoas.','# Teoria do crime: tipicidade, ilicitude e culpabilidade

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Durante a execução de um furto, o agente começa a retirar o bem, mas é impedido por um segurança antes da subtração se completar. A não consumação ocorreu por circunstância alheia à vontade do agente. Em regra, trata-se de:
>
> A) crime impossível. B) desistência voluntária. C) tentativa. D) arrependimento eficaz. E) crime consumado.
>
> **Resolução:** houve início da execução e a consumação foi impedida por terceiro: tentativa. Gabarito: **C**.

## 1. Estrutura analítica
Na concepção tripartida mais utilizada em concursos, crime é fato típico, ilícito e culpável.

- **Fato típico:** conduta, resultado quando exigido, nexo causal e tipicidade.
- **Ilicitude:** contrariedade do fato típico ao ordenamento, salvo causa de justificação.
- **Culpabilidade:** juízo de reprovação pessoal, com imputabilidade, potencial consciência da ilicitude e exigibilidade de conduta diversa.

Faça as perguntas em ordem: o fato se encaixa no tipo? É contrário ao direito? O agente pode ser pessoalmente censurado?

## 2. Dolo e culpa
- Dolo: o agente quer o resultado ou assume o risco de produzi-lo (CP, art. 18, I).
- Culpa: o agente dá causa ao resultado por imprudência, negligência ou imperícia, quando a modalidade culposa está prevista em lei (art. 18, II).

A culpa não é presumida. Em regra, os crimes são punidos a título de dolo, salvo previsão expressa de modalidade culposa.

## 3. Nexo causal e omissão
Nos crimes materiais, o resultado deve ser ligado à conduta. A omissão é penalmente relevante quando o agente devia e podia agir para evitar o resultado. O art. 13, §2º, descreve situações de dever de agir: obrigação legal de cuidado, assunção de responsabilidade ou criação anterior do risco.

## 4. Consumação e tentativa
Crime consumado reúne todos os elementos da definição legal. Tentativa ocorre quando, iniciada a execução, o crime não se consuma por circunstâncias alheias à vontade do agente (art. 14, II).

A tentativa é punida, em regra, com a pena do crime consumado reduzida de um a dois terços, salvo disposição em contrário.

## 5. Institutos que a banca confunde
- **Desistência voluntária:** o agente, voluntariamente, para de prosseguir na execução.
- **Arrependimento eficaz:** depois de praticar os atos executórios, o agente impede que o resultado ocorra.
- **Arrependimento posterior:** em crime sem violência ou grave ameaça à pessoa, o agente repara o dano ou restitui a coisa, por ato voluntário, até o recebimento da denúncia/queixa; a pena pode ser reduzida de um a dois terços.
- **Crime impossível:** não se pune a tentativa quando a consumação é impossível por ineficácia absoluta do meio ou impropriedade absoluta do objeto.

## 6. Ilicitude e excludentes
O art. 23 prevê estado de necessidade, legítima defesa, estrito cumprimento do dever legal e exercício regular de direito.

A legítima defesa exige agressão injusta, atual ou iminente, a direito próprio ou de terceiro, repelida com uso moderado dos meios necessários. O excesso doloso ou culposo pode ser punido.

Estado de necessidade envolve perigo atual, não provocado voluntariamente pelo agente, que não podia ser evitado de outro modo, com sacrifício não razoável de exigir.

## 7. Culpabilidade
- Imputabilidade: capacidade de entender o caráter ilícito do fato e determinar-se conforme esse entendimento.
- Potencial consciência da ilicitude: possibilidade de compreender que a conduta é proibida.
- Exigibilidade de conduta diversa: possibilidade de agir conforme o direito.

Erro de proibição inevitável isenta de pena; se evitável, pode reduzir a pena (art. 21). Menores de 18 anos são penalmente inimputáveis, sujeitos à legislação especial.

## 8. Concurso de pessoas
Exige pluralidade de agentes e condutas, relevância causal, vínculo subjetivo e identidade de infração, observadas as regras do art. 29. Cada concorrente responde na medida de sua culpabilidade; participação de menor importância pode reduzir a pena.

## 9. Exemplo resolvido
Se o agente apenas pensa em furtar ou compra ferramentas, em regra ainda não iniciou a execução. Se começa a retirar o bem e é impedido por segurança, pode haver tentativa. Se decide parar espontaneamente antes de ser impedido, pode ocorrer desistência voluntária. Se já esgotou os atos executórios e impede o resultado, pode haver arrependimento eficaz.

## 10. Pegadinhas
- Tentativa exige início da execução.
- Desistência voluntária e arrependimento eficaz dependem de atuação voluntária do agente.
- Arrependimento posterior exige crime sem violência ou grave ameaça e reparação/restituição nos termos legais.
- Crime impossível exige ineficácia ou impropriedade absoluta.
- Excludente de ilicitude não se confunde com ausência de culpabilidade.

**Macete:** fato típico = encaixa no tipo; ilicitude = contraria o direito; culpabilidade = pode ser reprovado pessoalmente.'),
('pcac-2026-direito-penal-03-crimes-pessoa-patrimonio','Aprofunda crimes contra a pessoa e patrimônio, diferenciando homicídio, lesão, crimes contra honra, furto, roubo, extorsão, apropriação indébita e estelionato; alerta para alterações penais de 2026.','# Crimes contra a pessoa e contra o patrimônio

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Uma pessoa toma o celular de outra sem que ela perceba, sem violência ou grave ameaça. Em tese, a conduta corresponde a:
>
> A) roubo. B) extorsão. C) furto. D) apropriação indébita. E) estelionato.
>
> **Resolução:** a subtração sem violência ou grave ameaça caracteriza, em tese, furto. Gabarito: **C**.

## 1. Crimes contra a pessoa
O Título I da Parte Especial do CP reúne crimes que protegem bens jurídicos ligados à pessoa, como vida, integridade corporal, honra e liberdade individual.

Tópicos centrais:
- homicídio (art. 121);
- lesão corporal (art. 129);
- perigo para a vida ou saúde;
- crimes contra a honra: calúnia, difamação e injúria;
- crimes contra a liberdade individual, como constrangimento ilegal e ameaça.

Identifique o bem jurídico, a conduta, o elemento subjetivo e as circunstâncias qualificadoras ou causas de aumento previstas.

## 2. Homicídio e lesão corporal
Homicídio atinge a vida humana. Lesão corporal atinge a integridade corporal ou a saúde. A gravidade do resultado, a intenção, o contexto e as circunstâncias podem alterar a classificação e a pena.

Atenção: a legislação penal sofreu alterações em 2025 e 2026 em temas relacionados a homicídio, lesão corporal e proteção de vítimas vulneráveis. Para números de pena, qualificadoras e majorantes, consulte a redação consolidada do CP, não resumos antigos.

## 3. Crimes contra a honra
- **Calúnia:** imputar falsamente a alguém fato definido como crime.
- **Difamação:** imputar fato ofensivo à reputação.
- **Injúria:** ofender dignidade ou decoro.

A pista é o conteúdo: atribuição falsa de crime (calúnia), fato ofensivo à reputação (difamação), ofensa à dignidade/decoro (injúria). As regras e exceções legais devem ser observadas.

## 4. Crimes contra o patrimônio
O Título II protege o patrimônio. Os tipos mais cobrados exigem atenção ao modo de agir:
- **Furto (art. 155):** subtrair coisa alheia móvel, para si ou para outrem.
- **Roubo (art. 157):** subtrair mediante violência ou grave ameaça, ou após reduzir a vítima à impossibilidade de resistência.
- **Extorsão (art. 158):** constranger mediante violência ou grave ameaça para obter vantagem econômica indevida, fazendo a vítima agir, tolerar ou deixar de agir.
- **Apropriação indébita (art. 168):** apropriar-se de coisa alheia móvel de que já tem posse ou detenção.
- **Estelionato (art. 171):** obter vantagem ilícita, em prejuízo alheio, induzindo ou mantendo alguém em erro mediante fraude.

## 5. Diferenças essenciais
- Furto: subtração sem violência ou grave ameaça à pessoa.
- Roubo: subtração com violência ou grave ameaça ou redução da resistência.
- Extorsão: a vítima é constrangida a agir, tolerar ou deixar de agir para gerar vantagem indevida.
- Apropriação indébita: a posse ou detenção é inicialmente legítima; depois ocorre inversão do ânimo.
- Estelionato: fraude induz ou mantém a vítima em erro.

## 6. Alterações relevantes no Código Penal em 2026
A redação consolidada do CP registra mudanças recentes, inclusive pela Lei nº 15.397/2026, que alterou penas e hipóteses de furto, roubo e estelionato, além de incluir previsões específicas; e pela Lei nº 15.358/2026, que introduziu alterações relacionadas ao marco legal de combate ao crime organizado.

Por isso, não memorize pena de apostila antiga sem conferir a versão atual. O núcleo do tipo e as circunstâncias precisam ser lidos na redação vigente.

## 7. Exemplo prático
- Pegar escondido celular sem violência: em tese, furto.
- Ameaçar a vítima para tomar o celular: em tese, roubo.
- Obrigar a vítima, sob grave ameaça, a fazer transferência: pode configurar extorsão, conforme os fatos.
- Receber bem para guardar e depois decidir ficar com ele: pode configurar apropriação indébita.
- Enganar a vítima para que entregue dinheiro: pode configurar estelionato.

## 8. Como resolver
1. Identifique a conduta central: subtrair, constranger, apropriar-se ou enganar.
2. Verifique se houve violência ou grave ameaça.
3. Descubra se a vítima entregou/transferiu algo por erro ou constrangimento.
4. Observe se a posse inicial era legítima.
5. Só então confira qualificadoras, majorantes e pena na lei atualizada.

## 9. Pegadinhas
- Furto e roubo diferem pelo modo de execução.
- Apropriação indébita pressupõe posse/detenção prévia legítima.
- Estelionato envolve fraude e erro da vítima.
- Extorsão envolve constrangimento para obter vantagem indevida.
- Pena e qualificadoras devem ser conferidas no texto consolidado atualizado.

**Fonte oficial:** Código Penal consolidado — https://planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'),
('pcac-2026-direito-penal-05-crimes-administracao-publica','Aprofunda peculato, concussão, corrupção passiva, prevaricação, falsidade ideológica, falso testemunho e fraude processual com diferenças e verbos nucleares.','# Crimes contra a Administração Pública e a Justiça

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Um funcionário público, valendo-se do cargo, exige de um particular vantagem indevida para praticar ato relacionado à função. Em tese, qual crime está caracterizado?
>
> A) prevaricação. B) corrupção ativa praticada pelo funcionário. C) concussão. D) peculato culposo. E) advocacia administrativa.
>
> **Resolução:** o verbo “exigir” é o núcleo da concussão (art. 316). Gabarito: **C**.

## 1. Crimes funcionais
Os arts. 312 a 327 do CP reúnem crimes praticados por funcionário público contra a Administração em geral. O conceito penal de funcionário público está no art. 327 e pode alcançar quem exerce função pública mesmo transitoriamente ou sem remuneração, conforme a lei.

## 2. Peculato — art. 312
Peculato envolve apropriar-se ou desviar dinheiro, valor ou bem móvel, público ou particular, de que o funcionário tem posse em razão do cargo, em proveito próprio ou alheio.

O §1º também alcança a subtração ou contribuição para subtração por funcionário que, embora sem posse, utiliza facilidade proporcionada pelo cargo. Não confunda peculato com qualquer irregularidade administrativa: identifique a conduta e o vínculo funcional exigido.

## 3. Concussão, corrupção passiva e prevaricação
- **Concussão (art. 316):** exigir vantagem indevida em razão da função.
- **Corrupção passiva (art. 317):** solicitar ou receber vantagem indevida, ou aceitar promessa.
- **Prevaricação (art. 319):** retardar ou deixar de praticar ato de ofício, ou praticá-lo contra disposição expressa, para satisfazer interesse ou sentimento pessoal.

**Macete:** exigir = concussão; solicitar/receber/aceitar promessa = corrupção passiva; interesse ou sentimento pessoal = prevaricação.

Corrupção ativa (art. 333) é praticada por quem oferece ou promete vantagem indevida a funcionário público para determinar a prática, omissão ou retardamento de ato de ofício.

## 4. Falsidade ideológica — art. 299
Ocorre ao omitir em documento público ou particular declaração que dele devia constar, ou inserir/fazer inserir declaração falsa ou diversa da que devia ser escrita, com fim de prejudicar direito, criar obrigação ou alterar a verdade sobre fato juridicamente relevante.

Atenção à finalidade específica e ao conteúdo ideologicamente falso. Não confunda falsidade ideológica com falsificação material do documento.

## 5. Falso testemunho ou falsa perícia — art. 342
Consiste em fazer afirmação falsa, negar ou calar a verdade como testemunha, perito, contador, tradutor ou intérprete em processo judicial ou administrativo, inquérito policial ou juízo arbitral, nas condições legais.

O §2º prevê que o fato deixa de ser punível se, antes da sentença no processo em que ocorreu o ilícito, o agente se retrata ou declara a verdade.

## 6. Fraude processual — art. 347
Consiste em inovar artificiosamente, na pendência de processo civil ou administrativo, o estado de lugar, coisa ou pessoa, com o fim de induzir a erro o juiz ou perito.

Se a inovação se destina a produzir efeito em processo penal, ainda que não iniciado, as penas são aplicadas em dobro, conforme o parágrafo único.

## 7. Quadro comparativo
| Crime | Verbo ou elemento-chave |
|---|---|
| Peculato | apropriar-se/desviar ou subtrair com facilidade do cargo |
| Concussão | exigir vantagem |
| Corrupção passiva | solicitar/receber/aceitar promessa |
| Prevaricação | agir ou omitir para satisfazer interesse/sentimento pessoal |
| Falsidade ideológica | inserir/omitir declaração falsa com finalidade específica |
| Falso testemunho | afirmar falsamente, negar ou calar a verdade |
| Fraude processual | inovar artificiosamente para induzir juiz/perito em erro |

## 8. Exemplo de prova
Se o servidor exige dinheiro para praticar ato, a descrição aponta para concussão. Se solicita ou aceita promessa, pode haver corrupção passiva. Se atrasa ato para satisfazer interesse pessoal, a situação aponta para prevaricação. Se altera artificialmente local ou objeto para enganar juiz ou perito, examine fraude processual.

## 9. Pegadinhas
- Concussão não é sinônimo de corrupção passiva.
- Corrupção ativa é praticada por quem oferece ou promete; passiva, pelo funcionário nas condutas do tipo.
- Falsidade ideológica afeta o conteúdo da declaração; falsidade material afeta a autenticidade material.
- Falso testemunho tem sujeitos ativos especificados no tipo.
- Fraude processual exige inovação artificiosa e finalidade de induzir juiz/perito em erro.

**Fontes oficiais:** Código Penal consolidado — https://planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'),
('pcac-2026-lc129-afastamento-preventivo-direitos-tempo-servico','Confere os arts. 120 a 123 da LC 129/2004 em sua redação consultada, explica prazo, prorrogação, vencimentos, prerrogativas, cômputo e distingue a medida de suspensão disciplinar.','# LC nº 129/2004 — afastamento preventivo

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Durante procedimento disciplinar, o policial civil é afastado preventivamente por necessidade da apuração. Qual afirmação está correta segundo os arts. 120 a 123 da LC nº 129/2004?
>
> A) perde automaticamente vencimentos e prerrogativas. B) o afastamento pode durar até 30 dias, prorrogável por igual período, preservados vencimentos e prerrogativas. C) dura até o encerramento do procedimento, sem limite. D) é penalidade de suspensão. E) o período nunca é computado.
>
> **Resolução:** a medida é cautelar, tem prazo legal de até 30 dias, prorrogável por igual período, e preserva vencimentos e prerrogativas. Gabarito: **B**.

## 1. Hipóteses — art. 120
Quando o afastamento do policial civil for necessário à averiguação normal das faltas atribuídas, ou quando o exigir a moralidade administrativa ou a repercussão do fato, a autoridade que determinou a instauração do procedimento disciplinar poderá afastá-lo preventivamente.

A medida é cautelar e não constitui, por si só, penalidade disciplinar nem antecipação de culpa.

## 2. Prazo
O afastamento preventivo pode durar até 30 dias e ser prorrogado por igual período. Ao final do prazo máximo, cessam seus efeitos mesmo que o procedimento disciplinar ainda não tenha sido concluído.

**Atenção:** o processo continuar em andamento não autoriza manter automaticamente o afastamento além do limite previsto no artigo.

## 3. Vencimentos e prerrogativas — art. 121
Durante o afastamento preventivo, o policial civil não perde seus vencimentos nem suas prerrogativas.

Não confunda afastamento preventivo com suspensão disciplinar: a suspensão é penalidade e possui efeitos próprios.

## 4. Cômputo na pena — art. 122
O período de afastamento preventivo será computado no cumprimento da pena de suspensão que vier a ser efetivamente aplicada.

## 5. Contagem do tempo de serviço — art. 123
O policial terá direito à contagem integral do tempo de serviço correspondente ao afastamento preventivo quando o procedimento não resultar em punição ou quando resultar apenas em advertência.

## 6. Quadro de revisão
- Autoridade: aquela que determinou a instauração do procedimento disciplinar.
- Finalidade: averiguação normal, moralidade administrativa ou repercussão do fato.
- Duração: até 30 dias, prorrogável por mais 30.
- Remuneração: preservada.
- Prerrogativas: preservadas.
- Se houver suspensão: período preventivo é computado na pena.
- Sem punição ou apenas advertência: contagem integral do tempo de serviço.

## 7. Exemplo prático
Imagine que um servidor esteja sendo investigado por possível irregularidade e a autoridade competente entenda que sua permanência na unidade pode prejudicar a apuração. O afastamento preventivo pode ser determinado dentro das hipóteses legais. Isso não significa que ele já foi considerado culpado nem que recebeu suspensão disciplinar.

Se a medida durar 30 dias e for prorrogada regularmente por mais 30, não pode continuar indefinidamente só porque o procedimento ainda está em andamento.

## 8. Pegadinhas
- Afastamento preventivo não é suspensão disciplinar.
- O prazo máximo é de 60 dias, somados o período inicial e a prorrogação.
- Vencimentos e prerrogativas são preservados.
- O período é computado na pena de suspensão efetivamente aplicada.
- Sem punição ou apenas com advertência, há contagem integral do tempo de serviço.

## 9. Atualização e fonte oficial
A redação consultada dos arts. 120 a 123 mantém essas regras. A LC nº 129/2004 sofreu alterações pela LC nº 496/2025 e pela LC nº 526/2026 em outros dispositivos; por isso, a revisão do estatuto deve sempre utilizar a versão consolidada.

Fonte oficial: https://www.legis.ac.gov.br/detalhar/674

**Macete:** preventivo = cautelar; suspensão = penalidade. 30 + 30 dias; remuneração preservada.'),
('pcac-2026-lc39-regime-geral-provimento-vacancia-direitos','Atualiza o regime geral com jornada, provimento, vacância e prazo de exercício, destacando a LC 525/2026 e a aplicação subsidiária em relação ao estatuto policial especial.','# LC nº 39/1993: disposições preliminares, provimento, jornada e vacância

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Pela regra geral do art. 20 da LC nº 39/1993, o ocupante de cargo efetivo fica sujeito a:
>
> A) 30 horas semanais em qualquer situação. B) 36 horas semanais. C) 40 horas semanais, salvo duração diversa estabelecida em lei. D) 44 horas semanais. E) jornada livre.
>
> **Resolução:** a regra geral do art. 20 é 40 horas semanais, ressalvada duração diferente prevista em lei. Gabarito: **C**.

## 1. Âmbito e conceitos — arts. 1º a 4º
A LC nº 39/1993 institui o Estatuto dos servidores públicos civis da Administração Direta, das Autarquias e das Fundações Públicas estaduais. O parágrafo único do art. 1º estende sua aplicação aos servidores de qualquer dos Poderes do Estado.

Servidor é a pessoa legalmente investida em cargo público ou em comissão (art. 2º). Cargo público integrante de carreira é o conjunto de atribuições e responsabilidades cometidas a um servidor (art. 3º).

O art. 4º veda a prestação de serviços gratuitos, salvo os casos previstos em lei.

## 2. Provimento — art. 5º
O provimento de cargo de natureza permanente é o ato formal pelo qual se processa o ingresso do servidor mediante preenchimento de cargo na lotação do quadro de pessoal. Ao entrar em exercício, o servidor apresenta ao órgão competente os elementos necessários ao assentamento individual.

## 3. Ascensão e mudança de localidade — arts. 18 e 19
O art. 18 estabelece que a ascensão não interrompe o tempo de exercício, contado no novo posicionamento a partir da publicação do ato.

O art. 19 concede ao servidor removido ou redistribuído para outra localidade 30 dias para entrar em exercício, incluído o tempo de deslocamento. Se estiver legalmente afastado, o prazo começa após o término do afastamento.

## 4. Jornada — art. 20
O ocupante de cargo efetivo fica sujeito a 40 horas semanais, salvo quando a lei estabelecer duração diversa. O exercício de cargo em comissão exige dedicação integral e pode gerar convocação sempre que houver interesse da Administração.

A regra geral não deve ser aplicada automaticamente a carreira que possua lei especial com jornada própria.

## 5. Vacância — arts. 37 a 40
O art. 38 enumera hipóteses de vacância: exoneração, demissão, ascensão, readaptação, aposentadoria, posse em outro cargo inacumulável, falecimento e recondução.

A exoneração de cargo efetivo ocorre a pedido ou de ofício. A exoneração de ofício ocorre quando não satisfeitas as condições do estágio probatório ou quando, após a posse, o servidor não entra em exercício no prazo estabelecido (art. 39).

A exoneração de cargo em comissão ocorre a juízo da autoridade competente ou a pedido do servidor (art. 40).

## 6. Atualização legislativa de 2026
A LC nº 525, de 20 de julho de 2026, revogou o §4º do art. 282 da LC nº 39/1993. Não reproduza esse parágrafo como vigente.

A carreira de Oficial Investigador possui estatuto especial na LC nº 129/2004. A LC nº 496/2025 unificou os cargos de escrivão e agente de polícia sob a nomenclatura Oficial Investigador. A LC nº 526/2026 alterou dispositivos da LC nº 129, inclusive regras sobre estrutura, ingresso e concurso público.

Assim, para o Oficial Investigador, use a LC nº 129/2004 em sua redação atualizada e aplique a LC nº 39/1993 nos pontos pertinentes e subsidiários.

## 7. Pegadinhas
- Jornada geral do art. 20 = 40 horas, salvo duração diversa em lei.
- Prazo do art. 19 = 30 dias, incluído deslocamento.
- Vacância não se limita à exoneração e à demissão.
- Serviço gratuito é vedado, ressalvados casos legais.
- O §4º do art. 282 foi revogado pela LC nº 525/2026.
- A carreira policial possui estatuto especial e sofreu alterações em 2025 e 2026.

## 8. Fontes oficiais
- LC nº 39/1993: https://www.legis.ac.gov.br/detalhar/110
- LC nº 525/2026: https://www.legis.ac.gov.br/detalhar/6864-1
- LC nº 129/2004 e alterações: https://www.legis.ac.gov.br/detalhar/674
- LC nº 526/2026: https://www.legis.ac.gov.br/detalhar/6874

**Dica de prova:** identifique se a questão trata do estatuto geral do servidor civil ou do estatuto especial da Polícia Civil antes de aplicar a regra.')
) as v(slug, summary, body_md)
where m.slug = v.slug;