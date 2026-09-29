-- Explicações do dia a dia: Informática, lote 4 — PF 2021, itens 69-82
-- (segurança, nuvem, teoria de sistemas, hierarquia DIKW, redes).

-- 69: IDS detecta intrusões, não remove malware de arquivos — pra limpeza usa-se antivírus/anti-malware.
update public.official_exam_questions set review_note=$q$Errado. IDS (sistema de detecção de intrusão) serve pra perceber quando algo suspeito está acontecendo numa rede ou sistema — ele não é uma ferramenta de limpeza de arquivos infectados. Pra remover um trojan de arquivos já infectados, a ferramenta certa é um antivírus ou software anti-malware.
Exemplo: IDS é como um alarme que avisa quando alguém invadiu a casa — ele não limpa a bagunça depois, só avisa que aconteceu. Quem "limpa a bagunça" é outra ferramenta (o antivírus), especializada nisso.$q$
where exam_year=2021 and item_number=69 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 70: essa descrição (criptografar dados e exigir resgate) é RANSOMWARE, não backdoor.
update public.official_exam_questions set review_note=$q$Errado. O que o item descreve — criptografar os dados da vítima e exigir pagamento pra liberar o acesso — é a definição de RANSOMWARE, não de backdoor. Backdoor é outra coisa: uma "porta dos fundos" escondida que permite acesso não autorizado a um sistema, sem necessariamente envolver criptografia ou resgate.
Exemplo: backdoor é como uma chave escondida debaixo do tapete que um invasor conhece e usa pra entrar sem forçar a porta da frente — ransomware é sequestrar o que está dentro da casa e cobrar resgate pra devolver. São ameaças bem diferentes.$q$
where exam_year=2021 and item_number=70 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 71: "mais alto nível de flexibilidade/controle sobre componentes básicos de TI" descreve IaaS, não PaaS.
update public.official_exam_questions set review_note=$q$Errado. A descrição do item ("contém os componentes básicos de TI e oferece o mais alto nível de flexibilidade e controle") é de IaaS (Infraestrutura como Serviço), não de PaaS. A PaaS entrega uma plataforma já mais pronta pra desenvolver aplicações — com MENOS controle sobre a infraestrutura por baixo, já que boa parte disso fica escondida/gerenciada pelo provedor.
Exemplo: IaaS é alugar um terreno vazio (controle total sobre o que construir); PaaS é alugar uma casa pré-fabricada só pra você decorar por dentro — menos trabalho, mas também bem menos controle sobre a estrutura.$q$
where exam_year=2021 and item_number=71 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 72: uma das principais VANTAGENS da nuvem é justamente a elasticidade — poder ajustar recursos conforme a necessidade muda, sem esperar um novo contrato.
update public.official_exam_questions set review_note=$q$Errado. O item descreve o oposto da realidade: uma das grandes vantagens da computação em nuvem é justamente a elasticidade — dá pra aumentar ou diminuir os recursos contratados conforme a demanda muda, sem precisar negociar um contrato novo do zero. Essa rigidez que o item descreve é característica de infraestrutura tradicional (própria, fora da nuvem), não da nuvem em si.
Exemplo: é como alugar mais cadeiras pra uma festa só quando sabe que vai ter mais gente, e devolver depois — a nuvem funciona assim, ajustando os "recursos alugados" conforme a necessidade sobe ou desce.$q$
where exam_year=2021 and item_number=72 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 73: entropia (tendência à desordem) e homeostasia (autorregulação/equilíbrio) são fenômenos clássicos da teoria geral de sistemas, ligados ao ajuste contínuo dos sistemas.
update public.official_exam_questions set review_note=$q$Correto. À medida que um sistema se ajusta continuamente às mudanças, dois fenômenos clássicos da teoria dos sistemas aparecem: entropia (a tendência natural de um sistema se desorganizar com o tempo, se nada o mantiver ajustado) e homeostasia (a capacidade do sistema de se autorregular e manter o equilíbrio apesar das mudanças).
Exemplo: o corpo humano é um sistema clássico que ilustra os dois — sem cuidados, ele tende à desordem (entropia, como o envelhecimento das células), mas mecanismos como suar quando está calor mostram a homeostasia (o corpo se ajustando pra manter a temperatura estável).$q$
where exam_year=2021 and item_number=73 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 74: sistemas abertos trocam continuamente informação/energia com o ambiente — definição padrão da teoria de sistemas.
update public.official_exam_questions set review_note=$q$Correto. Um sistema aberto não existe isolado — ele está sempre trocando alguma coisa (informação, energia, recursos) com o ambiente ao redor, de forma contínua e sem um ponto final definido. Essa troca constante é justamente o que diferencia um sistema aberto de um sistema fechado.
Exemplo: uma empresa é um sistema aberto — ela recebe insumos e informações do mercado o tempo todo, e devolve produtos e serviços em troca, numa relação contínua com o ambiente externo, sem "pausa".$q$
where exam_year=2021 and item_number=74 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 75: o modelo espiral de Boehm é, por definição, DIRIGIDO A RISCOS — a premissa do item já nasce errada.
update public.official_exam_questions set review_note=$q$Errado. O modelo espiral de Boehm é justamente conhecido por ser DIRIGIDO A RISCOS — a análise de riscos é uma das etapas centrais repetidas em cada volta da espiral. O item já erra na largada ao afirmar que esse modelo "não é dirigido a riscos" — essa é exatamente sua característica mais marcante.
Exemplo: é como descrever um carro de corrida dizendo que ele "não é feito pra velocidade" — a característica que o item nega é justamente o que define a coisa descrita.$q$
where exam_year=2021 and item_number=75 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 76: etapa clássica de "análise e definição de requisitos" no desenvolvimento de sistemas — consulta a usuários pra especificar metas e restrições.
update public.official_exam_questions set review_note=$q$Correto. É uma das primeiras e mais importantes etapas de qualquer método clássico de desenvolvimento de sistemas: conversar com os usuários pra entender o que eles realmente precisam, quais restrições existem e quais metas o sistema deve alcançar — tudo isso vira a "especificação" que guia o resto do projeto.
Exemplo: antes de construir uma casa, o arquiteto conversa com o cliente pra entender quantos quartos ele precisa, qual o orçamento e o terreno disponível — sem essa conversa inicial, o projeto corre o risco de não atender a necessidade real.$q$
where exam_year=2021 and item_number=76 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 77: um gráfico organizando números é INFORMAÇÃO (dado organizado), não "inteligência" — inteligência exige análise/contexto mais profundo, aplicado à tomada de decisão.
update public.official_exam_questions set review_note=$q$Errado. Na hierarquia dados→informação→conhecimento→inteligência, um gráfico que apenas organiza números por faixa etária é INFORMAÇÃO (dado bruto organizado de um jeito visual) — ainda não chegou ao nível de "inteligência", que exigiria uma análise mais profunda, cruzando esse dado com outros contextos, pra gerar uma orientação real de ação (por exemplo, pra decisões de política de segurança pública).
Exemplo: ver um gráfico de idades de presos é só "organizar os números visualmente" — virar inteligência exigiria cruzar isso com outros dados (locais, horários, reincidência) pra gerar uma estratégia de ação concreta.$q$
where exam_year=2021 and item_number=77 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 78: um número isolado, sem contexto, é DADO — só vira informação quando ganha um contexto/significado.
update public.official_exam_questions set review_note=$q$Errado. Um número sozinho, sem nenhum contexto que explique o que ele representa, é apenas um DADO — a definição de "informação" exige que esse dado ganhe um significado, um contexto (por exemplo, "1.789 traficantes presos nesse período"). O item afirma o contrário, que o número "por si só, independente de contexto" já seria informação.
Exemplo: o número "37" sozinho não significa nada — só vira informação quando você sabe que é "a idade de alguém" ou "a temperatura de hoje". Sem esse contexto, é só um número solto.$q$
where exam_year=2021 and item_number=78 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 79: roteadores operam na camada de REDE do modelo OSI — fato padrão de redes.
update public.official_exam_questions set review_note=$q$Correto. Roteadores tomam decisões de encaminhamento com base em endereços de REDE (endereços IP) — por isso são classificados como equipamentos da camada de rede (a terceira camada) do modelo OSI, diferente de um switch comum, que opera na camada de enlace.
Exemplo: o roteador é como um despachante que decide o caminho de uma encomenda olhando o endereço completo (rede) — diferente de um funcionário que só decide pra qual mesa do mesmo prédio entregar (enlace, um nível "mais local").$q$
where exam_year=2021 and item_number=79 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 80: TCP e UDP são protocolos da camada de TRANSPORTE — fato básico de redes.
update public.official_exam_questions set review_note=$q$Correto. TCP e UDP são os dois protocolos mais conhecidos da camada de transporte — a diferença entre eles é que o TCP garante entrega confiável (com confirmação), enquanto o UDP é mais rápido, mas sem garantias de entrega. Os dois, porém, pertencem à mesma camada.
Exemplo: é como duas formas de entregar uma encomenda — uma com aviso de recebimento e rastreamento (TCP) e outra mais rápida, mas sem garantia de chegada (UDP) — ambas continuam sendo "serviços de entrega" (camada de transporte).$q$
where exam_year=2021 and item_number=80 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 81: bits viram quadros na camada de ENLACE, não de transporte.
update public.official_exam_questions set review_note=$q$Errado. O empacotamento de bits em quadros (frames) acontece na camada de ENLACE de dados, não na camada de transporte. A camada de transporte trabalha com segmentos (no caso do TCP) ou datagramas (no caso do UDP) — "quadro" é terminologia específica de uma camada mais baixa, mais próxima do meio físico.
Exemplo: pense em camadas como etapas de embalagem de uma encomenda — "quadro" é a caixa mais próxima do transporte físico em si (enlace), enquanto a camada de transporte lida com outro tipo de "pacote" lógico, mais acima na cadeia.$q$
where exam_year=2021 and item_number=81 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 82: LAN é uma rede LOCAL (conecta dispositivos próximos entre si); "fornecer conectividade pra internet em tempo integral" não é a característica que define uma LAN.
update public.official_exam_questions set review_note=$q$Errado. Uma LAN existe pra conectar dispositivos que estão fisicamente perto uns dos outros (uma casa, um escritório) — ela não é, por definição, o serviço que garante "conectividade em tempo integral com a internet". Esse papel de conexão externa contínua está mais ligado ao provedor de internet (ISP) ou a uma WAN, não à natureza da LAN em si.
Exemplo: a rede Wi-Fi da sua casa (LAN) conecta seus dispositivos entre si — quem garante que ela "puxa" internet de fora é o provedor contratado, uma coisa separada da LAN local.$q$
where exam_year=2021 and item_number=82 and career_name='Agente de Polícia Federal' and official_answer='E';
