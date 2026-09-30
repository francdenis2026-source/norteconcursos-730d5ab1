-- Explicações do dia a dia: PRF 2019 (Policial Rodoviário Federal, CEBRASPE,
-- aplicação 3/2/2019) — lote 2.
--
-- Cobre 12 itens autossuficientes (question_text traz tudo que é preciso para
-- julgar o item, sem depender de texto-base ou figura ausente do banco):
--   * Itens 29, 30, 32, 34 — bloco rotulado "Raciocínio Lógico-Matemático" no
--     topic_map da importação (20260926070000), mas de conteúdo de
--     Informática (protocolos de Internet, acesso remoto, vírus de script,
--     SaaS); enunciados de conhecimento geral de informática, sem figura.
--   * Itens 41, 42, 43, 44 — Ética no Serviço Público; testam trechos do
--     Código de Ética Profissional do Servidor Público Civil do Poder
--     Executivo Federal (Decreto nº 1.171/1994, Anexo, Seção I itens I a III,
--     Seção II, Seção III alíneas c/j/n, e item XXII). Conferido diretamente
--     no texto vigente em planalto.gov.br/ccivil_03/decreto/d1171.htm nesta
--     sessão (27/09/2026): os dispositivos I, II, III, XIV, XV e XXII citados
--     aqui NÃO estão entre os revogados pelo Decreto nº 6.029/2007 (que
--     revogou apenas XVII, XIX, XX, XXI, XXIII e XXV) — seguem vigentes.
--   * Itens 45, 46, 47, 48 — Atualidades e Geografia; fatos gerais e
--     consolidados de geografia econômica brasileira (matriz de transporte
--     rodoviarista, custo-Brasil, terciarização/complexificação do
--     agronegócio, seletividade da globalização), sem exigir fonte jurídica
--     específica (não é conteúdo normativo).
--
-- Itens da Língua Portuguesa ainda pendentes (2, 3[anulado], 10, 11, 14, 17,
-- 18, 19, 20) foram reconferidos diretamente nesta sessão e permanecem fora:
-- todos dependem do texto-base que não está gravado em question_text (só a
-- afirmativa/assertiva foi importada), confirmando o que o lote 1 já
-- apontava.
--
-- Item 16 (Língua Portuguesa) foi reanalisado de forma independente nesta
-- sessão e A DIVERGÊNCIA PERSISTE: no trecho citado no próprio enunciado
-- ("Os processos de produção dos objetos que nos cercam movimentam relações
-- diversas entre os indivíduos"), a regra de proximidade e o uso idiomático
-- do português apontam "os objetos" (não "Os processos de produção dos
-- objetos") como antecedente mais natural de "que" em "que nos cercam" — é a
-- colocação comum "os objetos que nos cercam" (os objetos ao nosso redor).
-- Isso tornaria o item errado, mas o gabarito oficial definitivo registra
-- 'C'. Como as duas leituras (concordância número-pessoal não desambigua,
-- pois "processos" e "objetos" são ambos plurais) são defensáveis e a
-- divergência com o gabarito oficial permanece sem solução segura, o item 16
-- CONTINUA fora deste lote e mantém content_status='under_review', para
-- revisão humana.
--
-- Nenhum item deste lote é anulado (official_answer='X'); nenhum sobrepõe os
-- itens já cobertos pelo lote 1 (1,4,5,6,7,8,9,12,13,15). Apenas review_note
-- e content_status são alterados aqui — official_answer não é tocado.

-- 29: navegadores não suportam SMTP/NNTP nativamente (e o Chrome, à época já
-- vinha descontinuando o suporte a FTP); browsers não são clientes de e-mail
-- nem leitores de newsgroups.
update public.official_exam_questions set review_note=$q$Errado. Navegadores como Chrome, Firefox e Edge, em instalação padrão, não implementam os protocolos SMTP (envio de e-mail) nem NNTP (compartilhamento de notícias/Usenet) — essas tarefas exigem programas específicos, como um cliente de e-mail ou um leitor de newsgroups. O FTP até podia ser navegado de forma limitada (somente leitura) em versões mais antigas de alguns navegadores, mas isso não torna a afirmação correta, pois SMTP e NNTP simplesmente não são "reconhecidos e suportados" por navegadores comuns.
Exemplo: é como dizer que o aplicativo de fotos do celular também serve para fazer ligações — só porque um programa acessa a Internet, isso não significa que ele suporte qualquer protocolo que exista nela.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=29 and content_status='under_review';

-- 30: definição padrão de acesso remoto (ex.: TeamViewer, AnyDesk, RDP).
update public.official_exam_questions set review_note=$q$Certo. É exatamente essa a função de uma aplicação de acesso remoto (como TeamViewer, AnyDesk ou Área de Trabalho Remota do Windows): permitir que um computador acesse e controle outro à distância, contanto que os dois estejam conectados à Internet — a distância física entre eles não é um obstáculo, já que a comunicação acontece pela rede, não fisicamente.
Exemplo: um técnico de suporte em outra cidade consegue assumir o controle da tela do seu computador para resolver um problema, sem precisar estar presencialmente no local.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=30 and content_status='under_review';

-- 32: risco real de execução automática de script malicioso conforme
-- configurações do navegador (JavaScript, plugins etc.).
update public.official_exam_questions set review_note=$q$Certo. Uma página web pode conter um vírus de script (um código malicioso escrito em uma linguagem como JavaScript). Se o navegador estiver configurado para executar scripts automaticamente — o que é comum, já que a maioria dos sites depende de JavaScript para funcionar —, esse código malicioso pode rodar sem que o usuário precise clicar em nada, apenas por abrir a página. Por isso, a possibilidade de execução automática depende mesmo das configurações do navegador, como o item afirma.
Exemplo: é parecido com abrir um armadilha escondida dentro de uma página: se a "porta" (a execução automática de scripts) estiver destravada nas configurações, a armadilha dispara sozinha ao entrar na página.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=32 and content_status='under_review';

-- 34: definição padrão de SaaS.
update public.official_exam_questions set review_note=$q$Certo. SaaS (software as a service) é justamente o modelo de computação em nuvem em que o usuário acessa aplicativos e serviços prontos pela Internet, de qualquer lugar, usando qualquer computador conectado — sem precisar instalar o programa localmente. É o caso de serviços como Gmail, Google Docs ou Office 365: o "programa" roda nos servidores do provedor, e o usuário só precisa de um navegador e conexão à Internet para usá-lo.
Exemplo: usar o Gmail em um computador de um cibercafé, sem nunca ter instalado nada nele, é usar SaaS — o serviço está na nuvem, não na máquina.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=34 and content_status='under_review';

-- 41: Decreto 1.171/94, Anexo, Seção I, item III — "A moralidade da
-- Administração Pública NÃO SE LIMITA à distinção entre o bem e o mal" —
-- o item inverte esse texto.
update public.official_exam_questions set review_note=$q$Errado. O Código de Ética Profissional do Servidor Público Civil do Poder Executivo Federal (Decreto nº 1.171/1994, Anexo, Seção I, item III) diz exatamente o contrário do afirmado: "A moralidade da Administração Pública NÃO SE LIMITA à distinção entre o bem e o mal, devendo ser acrescida da ideia de que o fim é sempre o bem comum." Ou seja, moralidade administrativa é um conceito mais amplo do que simplesmente separar o "bem" do "mal" — envolve também o equilíbrio entre legalidade e finalidade pública. A segunda parte do item ("o servidor nunca poderá desprezar o elemento ético de sua conduta") até está correta e reflete o item II do mesmo Código, mas a primeira parte contraria o texto normativo, o que torna o item, como um todo, errado.
Exemplo: é como dizer que "ser um bom médico se restringe a saber diferenciar doença de saúde" — na verdade envolve muito mais (ética, cuidado, técnica); do mesmo jeito, moralidade administrativa é mais que só distinguir bem e mal.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=41 and content_status='under_review';

-- 42: Decreto 1.171/94, Anexo, Seção I, item I — os primados éticos valem
-- "no exercício do cargo ou função, ou fora dele".
update public.official_exam_questions set review_note=$q$Errado. O item I do Código de Ética (Decreto nº 1.171/1994, Anexo, Seção I) afirma que a dignidade, o decoro, o zelo, a eficácia e a consciência dos princípios morais "devem nortear o servidor público, seja no exercício do cargo ou função, OU FORA DELE". Ou seja, a exigência ética não se limita ao horário e ao ambiente de trabalho — ela acompanha o servidor também na vida privada, já que seus atos "refletirão o exercício da vocação do próprio poder estatal". O item erra ao dizer que, fora do exercício da função, o servidor "não está obrigado a agir conforme tais primados".
Exemplo: um policial fora de serviço, na vida particular, continua sendo cobrado por postura ética — não é como se o "crachá" fosse a única coisa que o obriga a agir com honestidade.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=42 and content_status='under_review';

-- 43: Decreto 1.171/94, Anexo, Seção III, alínea "n" (vedação) + item XXII
-- (pena de censura pela Comissão de Ética).
update public.official_exam_questions set review_note=$q$Certo. O Código de Ética (Decreto nº 1.171/1994, Anexo, Seção III, alínea "n") veda expressamente ao servidor público "apresentar-se embriagado no serviço ou fora dele habitualmente". Constatada essa conduta, ela pode ser levada à Comissão de Ética do órgão, e a única pena que essa Comissão pode aplicar, segundo o item XXII do mesmo Código, é a de censura (repreensão formal e registrada, sem efeito de demissão ou suspensão, que é da esfera disciplinar comum).
Exemplo: é como um "puxão de orelha" oficial e documentado — a Comissão de Ética não demite nem suspende ninguém, apenas registra formalmente a reprovação da conduta.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=43 and content_status='under_review';

-- 44: Decreto 1.171/94, Anexo, Seção III, alíneas "j" (desviar servidor
-- para interesse particular) e "c" (conivência por espírito de
-- solidariedade) + item XXII.
update public.official_exam_questions set review_note=$q$Certo. O Código de Ética (Decreto nº 1.171/1994, Anexo, Seção III) veda ao servidor público, na alínea "j", desviar outro servidor para atendimento de interesse particular, e, na alínea "c", ser conivente — por espírito de solidariedade — com erro ou infração a este mesmo Código. As duas condutas descritas no item se encaixam exatamente nessas duas vedações, e ambas podem levar à apuração pela Comissão de Ética, cuja única pena cabível é a censura (item XXII).
Exemplo: tanto "usar" o colega para resolver um problema pessoal quanto "fechar os olhos" para isso por lealdade ao colega são faltas éticas previstas no Código — a solidariedade mal direcionada não é desculpa.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=44 and content_status='under_review';

-- 45: custo Brasil / logística — fato consolidado de geografia econômica.
update public.official_exam_questions set review_note=$q$Certo. Distâncias grandes entre regiões produtoras, centros consumidores e portos, somadas a um sistema de transporte concentrado no modal rodoviário (mais caro por longas distâncias do que ferrovias ou hidrovias), elevam diretamente o custo do frete no Brasil. Esse custo é repassado ao preço final dos produtos agropecuários e industriais, encarecendo-os e reduzindo sua competitividade tanto no mercado interno quanto nas exportações — é o fenômeno conhecido como "Custo Brasil" logístico.
Exemplo: um produto agrícola colhido no interior do Mato Grosso, transportado de caminhão por milhares de quilômetros até um porto, chega mais caro ao comprador final do que um produto equivalente vindo de um país com ferrovias e hidrovias bem desenvolvidas ligando a produção ao porto.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=45 and content_status='under_review';

-- 46: matriz de transporte brasileira é rodoviarista (não cobre TODOS os
-- municípios em rede) e é uma vulnerabilidade PRÓPRIA do Brasil, não algo
-- compartilhado por países desenvolvidos.
update public.official_exam_questions set review_note=$q$Errado. O item erra em dois pontos. Primeiro, nem todos os municípios brasileiros — especialmente na região amazônica — estão conectados por uma rede rodoviária; muitos só são acessíveis por via fluvial ou aérea. Segundo, a forte dependência do modal rodoviário é apontada como uma vulnerabilidade justamente porque contrasta com países desenvolvidos, que costumam ter matrizes de transporte mais diversificadas, com maior peso de ferrovias e hidrovias (mais baratas para grandes distâncias e cargas pesadas) — ou seja, esses países não "também dependem" do modal rodoviário do mesmo jeito que o Brasil.
Exemplo: é como comparar um país que só tem estradas de carro com outro que tem estradas, trens de carga e hidrovias — o segundo tem mais opções e gasta menos para mover a mesma quantidade de carga; a dependência quase exclusiva de rodovias é uma fragilidade específica do Brasil, não uma característica dos países desenvolvidos.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=46 and content_status='under_review';

-- 47: leitura crítica da globalização — ela é seletiva e tende a acentuar
-- desigualdades regionais, não a reduzi-las automaticamente.
update public.official_exam_questions set review_note=$q$Errado. A globalização econômica é seletiva: o capital e os investimentos se concentram nas regiões que já oferecem melhor infraestrutura, mão de obra qualificada e retorno financeiro, aprofundando — e não diminuindo — as desigualdades entre regiões mais e menos favorecidas. A ideia de que a globalização busca, de forma deliberada, "diminuir as desigualdades regionais" e oferecer "uma economia justa e solidária" contraria o diagnóstico consolidado da geografia econômica sobre esse processo, muitas vezes descrito como uma globalização desigual ou "perversa" justamente por intensificar disparidades.
Exemplo: grandes empresas tendem a instalar fábricas e escritórios em regiões que já são ricas em infraestrutura (grandes centros urbanos), deixando regiões mais pobres ainda mais isoladas do fluxo de investimentos — o oposto de uma redução automática de desigualdades.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=47 and content_status='under_review';

-- 48: terciarização/complexificação da economia brasileira — fato
-- consolidado.
update public.official_exam_questions set review_note=$q$Certo. Nas últimas décadas, o setor de serviços passou a responder por parcela cada vez maior do PIB brasileiro. Ao mesmo tempo, o setor agropecuário — estratégico para a economia do país — tornou-se mais complexo e tecnológico (o chamado agronegócio), o que gerou demanda por diversos serviços ligados a essa cadeia produtiva, como transporte de cargas, tecnologia da informação aplicada ao campo e serviços financeiros (crédito rural, seguros agrícolas). Esses dois movimentos — crescimento dos serviços e complexificação do agro — caminham juntos, como descreve o item.
Exemplo: uma fazenda moderna hoje usa softwares de gestão, sensores, transporte especializado e financiamento bancário — cada um desses elementos é, na prática, um serviço que cresceu em torno da atividade agropecuária.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=48 and content_status='under_review';
