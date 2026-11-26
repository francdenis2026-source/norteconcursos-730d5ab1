#!/usr/bin/env python3
"""Noções de Administração: teoria didática e 36 questões novas. python3 scripts/content-adm.py"""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from qlib import Q, teoria, salvar

teoria("adm_funcoes",
 """<p><b>Em uma frase:</b> administrar é usar recursos (pessoas, dinheiro, materiais, informação) para atingir objetivos; as funções clássicas são <b>planejar, organizar, dirigir e controlar</b> (PODC).</p>
<div class="exemplo"><b>Analogia:</b> é dirigir uma viagem: planejar a rota, organizar o carro e os passageiros, conduzir o veículo e conferir o painel.</div>
<h3>As funções administrativas</h3>
<ul><li><b>Planejar:</b> definir objetivos e o caminho para alcançá-los.</li><li><b>Organizar:</b> dividir o trabalho, estruturar e distribuir recursos.</li><li><b>Dirigir:</b> liderar, motivar e comunicar para executar o plano.</li><li><b>Controlar:</b> comparar o realizado com o planejado e corrigir desvios.</li></ul>
<h3>Escolas clássicas</h3>
<ul><li><b>Taylor (administração científica):</b> foco na tarefa, tempos e métodos para aumentar a eficiência.</li><li><b>Fayol (teoria clássica):</b> foco na estrutura e nas funções do administrador (prever, organizar, comandar, coordenar, controlar).</li><li><b>Weber (burocracia):</b> regras formais, hierarquia, impessoalidade, divisão do trabalho.</li><li><b>Mayo (relações humanas):</b> importância do grupo e da satisfação do trabalhador.</li></ul>
<h3>Eficiência, eficácia e efetividade</h3>
<ul><li><b>Eficiência:</b> fazer certo, com bom uso de recursos. <b>Eficácia:</b> atingir o objetivo. <b>Efetividade:</b> o resultado gerou o impacto desejado.</li></ul>
<h3>Teste rápido</h3><p>Qual função compara o realizado com o planejado? <b>Resposta:</b> controlar.</p>""",
 "Uma delegacia quer reduzir o tempo de registro de ocorrências de 40 para 20 minutos. Passo 1 (<b>planejar</b>): define a meta e as ações. Passo 2 (<b>organizar</b>): redistribui atendentes e cria um fluxo. Passo 3 (<b>dirigir</b>): orienta e motiva a equipe. Passo 4 (<b>controlar</b>): mede o tempo semanal e corrige desvios.",
 "(1) Identifique o verbo da questão: definir objetivos (planejar), estruturar (organizar), liderar (dirigir), medir e corrigir (controlar). (2) Fayol = estrutura; Taylor = tarefa; Weber = burocracia; Mayo = pessoas.",
 "PODC: planejar, organizar, dirigir, controlar. Taylor tarefa, Fayol estrutura, Weber regras, Mayo pessoas.")
teoria("adm_plan",
 """<p><b>Em uma frase:</b> planejar é definir aonde se quer chegar e como; há três níveis: estratégico, tático e operacional.</p>
<div class="exemplo"><b>Analogia:</b> o estratégico escolhe o destino da viagem; o tático define as etapas e as paradas; o operacional dirige cada trecho.</div>
<h3>Níveis de planejamento</h3>
<ul><li><b>Estratégico:</b> longo prazo, alta direção, a organização como um todo; define missão, visão e objetivos.</li><li><b>Tático:</b> médio prazo, gerências, por área (departamento).</li><li><b>Operacional:</b> curto prazo, supervisão, tarefas e rotinas.</li></ul>
<h3>Missão, visão e valores</h3>
<ul><li><b>Missão:</b> razão de existir da organização. <b>Visão:</b> onde ela quer chegar no futuro. <b>Valores:</b> princípios que guiam a conduta.</li></ul>
<h3>Análise SWOT (FOFA)</h3>
<ul><li><b>Forças</b> e <b>Fraquezas</b>: fatores <b>internos</b>. <b>Oportunidades</b> e <b>Ameaças</b>: fatores <b>externos</b>.</li></ul>
<h3>Objetivos e metas</h3>
<ul><li>Bons objetivos são <b>específicos, mensuráveis, alcançáveis, relevantes e com prazo</b> (SMART).</li></ul>
<h3>Teste rápido</h3><p>Equipe desatualizada é força, fraqueza, oportunidade ou ameaça? <b>Resposta:</b> fraqueza (interna).</p>""",
 "Uma delegacia faz a análise SWOT. Itens: (a) equipe qualificada; (b) sistema antigo e lento; (c) nova lei que amplia o uso de tecnologia; (d) aumento de ocorrências na região. Passo 1: (a) é <b>força</b> (interna, positiva). Passo 2: (b) é <b>fraqueza</b> (interna, negativa). Passo 3: (c) é <b>oportunidade</b> (externa, positiva). Passo 4: (d) é <b>ameaça</b> (externa, negativa).",
 "(1) Interno ou externo? Interno: forças e fraquezas. Externo: oportunidades e ameaças. (2) Positivo ou negativo? (3) Nível do plano: longo prazo e alta cúpula é estratégico; por área é tático; tarefas diárias é operacional.",
 "Forças e fraquezas estão dentro; oportunidades e ameaças vêm de fora.")
teoria("adm_org",
 """<p><b>Em uma frase:</b> organizar é estruturar a instituição: dividir o trabalho, definir quem manda em quem e como as áreas se agrupam.</p>
<div class="exemplo"><b>Analogia:</b> o organograma é o mapa do quartel: mostra os cargos e a cadeia de comando.</div>
<h3>Conceitos de estrutura</h3>
<ul><li><b>Organograma:</b> representação gráfica da estrutura (níveis e departamentos).</li><li><b>Hierarquia:</b> cadeia de comando, do topo à base. <b>Unidade de comando:</b> cada pessoa recebe ordens de um único chefe.</li><li><b>Amplitude de controle</b> (ou de comando): número de subordinados diretos de um gerente. <b>Ampla:</b> estrutura achatada. <b>Estreita:</b> estrutura alta, com mais níveis.</li><li><b>Centralização:</b> decisões no topo. <b>Descentralização:</b> decisões delegadas.</li></ul>
<h3>Departamentalização</h3>
<ul><li><b>Funcional:</b> por função (finanças, pessoal, operações).</li><li><b>Por produto/serviço.</b></li><li><b>Geográfica:</b> por região.</li><li><b>Por clientela.</b></li><li><b>Por processo.</b></li></ul>
<h3>Delegação</h3>
<p>Delegar é transferir autoridade para decidir; a <b>responsabilidade final continua com quem delegou</b>.</p>
<h3>Teste rápido</h3><p>Dividir uma instituição em Regionais (Norte, Sul, Leste) é qual tipo de departamentalização? <b>Resposta:</b> geográfica.</p>""",
 "Uma superintendência tem 3 diretorias, cada uma com 6 gerentes, e cada gerente com 10 analistas. Passo 1: a amplitude de controle de cada diretor é <b>6</b>; a de cada gerente é <b>10</b>. Passo 2: se a organização passar a ter menos níveis, aumentando o número de subordinados por chefe, a estrutura ficará mais <b>achatada</b> (amplitude ampla). Passo 3: isso agiliza decisões, mas exige chefes mais preparados.",
 "(1) Quantos subordinados diretos? Amplitude de controle. (2) Agrupou por região? Geográfica. Por função? Funcional. (3) Decisão no topo? Centralização. (4) Delegar transfere autoridade, não a responsabilidade final.",
 "Muitos níveis = amplitude estreita; poucos níveis = amplitude ampla.")
teoria("adm_dir",
 """<p><b>Em uma frase:</b> dirigir é conduzir pessoas para realizar o plano: liderar, motivar e comunicar.</p>
<div class="exemplo"><b>Analogia:</b> o maestro não toca todos os instrumentos; coordena e inspira a orquestra.</div>
<h3>Liderança</h3>
<ul><li><b>Autocrática:</b> o líder decide sozinho. <b>Democrática:</b> decide com o grupo. <b>Liberal (laissez-faire):</b> o grupo decide sem direção do líder.</li><li><b>Líder</b> influencia pessoas; <b>chefe</b> tem poder formal.</li></ul>
<h3>Motivação (teorias que caem)</h3>
<ul><li><b>Maslow:</b> pirâmide de necessidades: fisiológicas, segurança, sociais, estima e autorrealização.</li><li><b>Herzberg (dois fatores):</b> <b>higiênicos</b> (salário, condições de trabalho: evitam insatisfação) e <b>motivacionais</b> (reconhecimento, desafio, crescimento: geram satisfação).</li><li><b>McGregor:</b> Teoria X (pessoas evitam o trabalho, exigem controle) e Teoria Y (pessoas se motivam, buscam responsabilidade).</li></ul>
<h3>Comunicação</h3>
<ul><li>Elementos: <b>emissor, mensagem, canal, receptor, feedback</b>. <b>Ruído</b> é tudo que distorce a mensagem.</li><li><b>Feedback</b> confirma o entendimento.</li></ul>
<h3>Teste rápido</h3><p>Salário, na teoria de Herzberg, é fator de qual tipo? <b>Resposta:</b> higiênico.</p>""",
 "Um comandante decide sozinho todas as escalas, sem ouvir a equipe. Passo 1: decisão centralizada no líder: estilo <b>autocrático</b>. Passo 2: se ele reunisse a equipe e decidisse junto, seria <b>democrático</b>. Passo 3: se deixasse a equipe decidir sem orientá-la, seria <b>liberal</b>.",
 "(1) Quem decide? Líder só: autocrático; grupo com líder: democrático; grupo sem líder: liberal. (2) Herzberg: higiênico evita insatisfação; motivacional gera satisfação. (3) Maslow: das necessidades básicas à autorrealização.",
 "Higiênicos evitam insatisfação; motivacionais geram satisfação.")
teoria("adm_ctrl",
 """<p><b>Em uma frase:</b> controle compara o que foi feito com o que foi planejado e corrige os desvios.</p>
<div class="exemplo"><b>Analogia:</b> é o painel do carro: mostra velocidade e combustível para você corrigir a rota.</div>
<h3>Etapas do controle</h3>
<ol><li>Estabelecer <b>padrões</b> e metas.</li><li><b>Medir</b> o desempenho.</li><li><b>Comparar</b> o realizado com o padrão.</li><li><b>Corrigir</b> os desvios.</li></ol>
<h3>Indicadores</h3>
<ul><li>Medidas que mostram o desempenho (tempo médio de atendimento, número de ocorrências resolvidas). Devem ser <b>claros, mensuráveis e confiáveis</b>.</li></ul>
<h3>PDCA (ciclo de melhoria)</h3>
<ul><li><b>P</b>lan (planejar), <b>D</b>o (executar), <b>C</b>heck (verificar), <b>A</b>ct (agir corretivamente).</li></ul>
<h3>Tipos de controle</h3>
<ul><li><b>Preventivo</b> (antes), <b>concomitante</b> (durante), <b>corretivo</b> (depois).</li></ul>
<h3>Balanced Scorecard (BSC)</h3>
<ul><li>Quatro perspectivas: financeira, clientes, processos internos e aprendizado e crescimento.</li></ul>
<h3>Teste rápido</h3><p>Qual etapa do PDCA verifica os resultados? <b>Resposta:</b> Check.</p>""",
 "Uma equipe quer reduzir o tempo de atendimento. Passo 1 (<b>Plan</b>): define a meta de 20 minutos e as ações. Passo 2 (<b>Do</b>): executa por um mês. Passo 3 (<b>Check</b>): mede e compara com a meta. Passo 4 (<b>Act</b>): corrige o que falhou e padroniza o que deu certo; o ciclo recomeça.",
 "(1) Padrão → medida → comparação → correção. (2) PDCA: planejar, fazer, verificar, agir. (3) Controle antes = preventivo; durante = concomitante; depois = corretivo.",
 "PDCA: Check mede; Act corrige. Controle compara realizado e planejado.")
teoria("adm_qual",
 """<p><b>Em uma frase:</b> qualidade no serviço é atender às necessidades do cliente (cidadão), de forma consistente; gestão por resultados orienta o trabalho por metas e indicadores.</p>
<div class="exemplo"><b>Analogia:</b> é medir a viagem pelo destino alcançado e pelo conforto do passageiro, e não só pela quilometragem rodada.</div>
<h3>Qualidade</h3>
<ul><li><b>Qualidade total (TQM):</b> toda a organização busca a melhoria contínua, com foco no cliente.</li><li><b>Melhoria contínua (kaizen)</b> e ferramentas: PDCA, diagrama de causa e efeito (Ishikawa), 5W2H (plano de ação).</li><li><b>ISO 9001:</b> norma de sistema de gestão da qualidade.</li><li>Dimensões do serviço: confiabilidade, presteza, segurança, empatia, aspectos tangíveis.</li></ul>
<h3>Gestão por resultados</h3>
<ul><li>Define <b>metas</b> e <b>indicadores</b> e avalia o desempenho por resultados alcançados.</li><li><b>Efetividade:</b> impacto real do resultado. <b>Eficiência:</b> uso dos recursos. <b>Eficácia:</b> meta atingida.</li></ul>
<h3>Administração pública: princípios</h3>
<ul><li>Legalidade, impessoalidade, moralidade, publicidade e <b>eficiência</b> (art. 37 da Constituição).</li></ul>
<h3>Teste rápido</h3><p>O diagrama de Ishikawa serve para: <b>Resposta:</b> investigar as causas de um problema.</p>""",
 "Uma delegacia recebe reclamações de demora. Passo 1: use o <b>Ishikawa</b> para listar as causas (pessoas, método, equipamento). Passo 2: monte um plano de ação com o <b>5W2H</b> (o quê, por quê, quem, onde, quando, como, quanto custa). Passo 3: defina um <b>indicador</b> (tempo médio de atendimento) e uma <b>meta</b>. Passo 4: acompanhe com <b>PDCA</b>.",
 "(1) Problema: busque a causa (Ishikawa). (2) Ação: monte o 5W2H. (3) Resultado: meça com indicador e meta. (4) Melhoria contínua: PDCA e kaizen.",
 "Ishikawa acha causas; 5W2H planeja ações; PDCA melhora sempre.")
F_, PL_, OR_, DI_, CT_, QL_ = "adm_funcoes", "adm_plan", "adm_org", "adm_dir", "adm_ctrl", "adm_qual"
# -------- funções
Q(F_, "As funções administrativas clássicas, na sequência do processo administrativo, são:", "planejar, organizar, dirigir e controlar.",
  [("comprar, vender, produzir e entregar.", "são atividades operacionais, não funções administrativas."), ("contratar, treinar, demitir e remunerar.", "são atividades de gestão de pessoas."), ("registrar, arquivar, protocolar e despachar.", "são rotinas de apoio."), ("pesquisar, desenvolver, testar e lançar.", "são etapas de desenvolvimento de produto.")],
  ["O processo administrativo tem quatro funções.", "Define-se o que fazer (planejar), estrutura-se (organizar), conduz-se (dirigir) e confere-se (controlar).", "Resposta: PODC."], "PODC.", "Funções do administrador.")
Q(F_, "A abordagem de Taylor, conhecida como administração científica, concentra-se principalmente:", "na racionalização da tarefa, com estudo de tempos e métodos para elevar a eficiência.",
  [("na estrutura e nas funções do administrador.", "isso caracteriza Fayol."), ("nos relacionamentos informais entre os trabalhadores.", "isso caracteriza a escola de relações humanas."), ("na burocracia e na impessoalidade.", "isso caracteriza Weber."), ("na satisfação dos clientes externos.", "isso caracteriza abordagens de qualidade.")],
  ["Taylor estudou a tarefa do operário.", "Buscava o melhor método e o tempo-padrão.", "Foco: eficiência da produção."], "Taylor = tarefa; Fayol = estrutura.", "Identificar a escola de Taylor.")
Q(F_, "Max Weber é associado ao modelo burocrático, cujas características incluem:", "regras formais, hierarquia, impessoalidade e divisão do trabalho.",
  [("informalidade e decisões sem regras.", "oposto da burocracia."), ("valorização exclusiva dos grupos informais.", "isso é das relações humanas."), ("ausência de hierarquia.", "a burocracia tem hierarquia clara."), ("planejamento sem registro formal.", "a burocracia valoriza o registro formal.")],
  ["Burocracia = organização racional e formal.", "Regras escritas, hierarquia e impessoalidade.", "Divisão do trabalho e carreiras."], "Burocracia: regras, hierarquia, impessoalidade.", "Características da burocracia.")
Q(F_, "Quando uma instituição alcança o objetivo desejado, mas gasta muito mais recursos do que o necessário, pode-se dizer que foi:", "eficaz, mas pouco eficiente.",
  [("eficiente, mas ineficaz.", "eficiente é usar bem os recursos; aqui houve desperdício."), ("ineficiente e ineficaz.", "o objetivo foi atingido: foi eficaz."), ("eficiente e eficaz.", "o gasto excessivo mostra pouca eficiência."), ("efetiva, apenas.", "efetividade trata de impacto, não de uso de recursos.")],
  ["Eficácia: atingir o objetivo (houve).", "Eficiência: usar bem os recursos (não houve).", "Logo: eficaz, mas pouco eficiente."], "Eficácia = resultado; eficiência = recursos.", "Distinguir eficiência e eficácia.")
Q(F_, "A escola das relações humanas, com Elton Mayo, destacou:", "a importância do grupo, da comunicação e da satisfação do trabalhador.",
  [("o tempo-padrão de cada tarefa.", "isso é Taylor."), ("a hierarquia rígida e as regras formais.", "isso é Weber."), ("a divisão da empresa em departamentos funcionais.", "isso é teoria clássica."), ("a automação completa das tarefas.", "não é o foco de Mayo.")],
  ["A experiência de Hawthorne mostrou o peso do fator humano.", "Grupo, comunicação e satisfação influenciam a produtividade.", "Daí o nome 'relações humanas'."], "Mayo = pessoas e grupos.", "Escola de relações humanas.")
Q(F_, "A função administrativa que consiste em comparar o desempenho realizado com o planejado e corrigir desvios é:", "o controle.",
  [("o planejamento.", "define objetivos e meios."), ("a organização.", "estrutura recursos e tarefas."), ("a direção.", "lidera e motiva."), ("a delegação.", "transfere autoridade.")],
  ["Comparar realizado e planejado é medir o resultado.", "Depois vem corrigir.", "Essa é a função de controle."], "Controle = comparar e corrigir.", "Função de controle.")
# -------- planejamento
Q(PL_, "O planejamento estratégico se caracteriza por:", "ser de longo prazo, definido pela alta direção e voltado à organização como um todo.",
  [("ser de curto prazo e voltado a tarefas diárias.", "isso descreve o operacional."), ("ser feito por cada operador, em cada tarefa.", "isso é operacional."), ("tratar apenas de um departamento.", "isso descreve o tático."), ("ser sempre improvisado.", "o planejamento é estruturado.")],
  ["O nível estratégico é o mais amplo.", "Cobre longo prazo e toda a organização.", "É definido pela cúpula."], "Estratégico: longo prazo e toda a organização.", "Planejamento estratégico.")
Q(PL_, "Na análise SWOT (FOFA), as ‘oportunidades’ e ‘ameaças’ referem-se:", "ao ambiente externo da organização.",
  [("ao ambiente interno da organização.", "forças e fraquezas são internas."), ("exclusivamente a fatores financeiros.", "podem ser de diversas naturezas."), ("apenas aos concorrentes.", "o ambiente externo inclui muito mais que concorrentes."), ("aos funcionários da organização.", "pessoas internas relacionam-se a forças e fraquezas.")],
  ["SWOT divide fatores em quatro grupos.", "Forças e fraquezas: internos. Oportunidades e ameaças: externos.", "Resposta: ambiente externo."], "Dentro: forças e fraquezas. Fora: oportunidades e ameaças.", "Ambiente da análise SWOT.")
Q(PL_, "A ‘missão’ de uma organização é:", "a razão de existir, ou seja, o seu propósito fundamental.",
  [("a situação futura que ela deseja alcançar.", "isso é a visão."), ("a lista de produtos que ela vende.", "é parte da operação, não a missão."), ("o conjunto de regras internas de conduta.", "isso se aproxima dos valores."), ("a análise de pontos fortes e fracos.", "isso é a análise SWOT.")],
  ["A missão responde: por que existimos?", "A visão responde: aonde queremos chegar?", "Valores guiam a conduta."], "Missão = razão de existir.", "Conceito de missão.")
Q(PL_, "Uma equipe percebe que seu sistema de informações é antigo e lento. Na análise SWOT, isso é:", "uma fraqueza.",
  [("uma força.", "força é um ponto positivo interno."), ("uma oportunidade.", "oportunidade é fator externo positivo."), ("uma ameaça.", "ameaça é fator externo negativo."), ("uma visão.", "visão é uma situação futura desejada.")],
  ["O sistema pertence à organização: fator interno.", "Ele prejudica o desempenho: ponto negativo.", "Interno e negativo: fraqueza."], "Interno negativo = fraqueza.", "Classificar um item na SWOT.")
Q(PL_, "Um planejamento que trata das tarefas e rotinas do dia a dia, com foco em curto prazo e execução, é o:", "planejamento operacional.",
  [("planejamento estratégico.", "é de longo prazo e toda a organização."), ("planejamento tático.", "é de médio prazo e por área."), ("planejamento político.", "não é nível de planejamento organizacional."), ("planejamento corporativo apenas.", "é termo associado ao estratégico.")],
  ["O nível mais detalhado e imediato é o operacional.", "Trata de tarefas e rotinas.", "Horizonte de curto prazo."], "Operacional = tarefas e rotinas.", "Níveis de planejamento.")
Q(PL_, "Um objetivo bem formulado deve ser, entre outras características:", "específico, mensurável e com prazo definido.",
  [("vago, para permitir várias interpretações.", "objetivos vagos não permitem medir."), ("impossível de medir, para evitar cobranças.", "o que não se mede, não se controla."), ("sem prazo, para dar liberdade à equipe.", "prazo é parte do objetivo."), ("sempre de longo prazo.", "podem ser de qualquer horizonte.")],
  ["Um bom objetivo diz o que, quanto e até quando.", "Isso o torna específico, mensurável e com prazo.", "Facilita o controle posterior."], "Objetivo: específico, mensurável, com prazo.", "Qualidade dos objetivos.")
# -------- organização
Q(OR_, "A representação gráfica da estrutura de uma organização, mostrando seus níveis hierárquicos e departamentos, chama-se:", "organograma.",
  [("fluxograma.", "mostra o fluxo de um processo."), ("cronograma.", "mostra prazos."), ("histograma.", "mostra distribuição de dados."), ("diagrama de Ishikawa.", "mostra causas de um problema.")],
  ["O desenho mostra cargos, setores e subordinações.", "Esse desenho é o organograma.", "Fluxograma mostra processos."], "Organograma = estrutura.", "Conceito de organograma.")
Q(OR_, "A amplitude de controle (ou de comando) refere-se:", "ao número de subordinados diretos que um gerente supervisiona.",
  [("à quantidade de níveis hierárquicos da organização.", "isso é a altura da estrutura."), ("ao total de funcionários da empresa.", "não é isso."), ("ao orçamento do departamento.", "não é isso."), ("ao tempo de trabalho do gerente.", "não é isso.")],
  ["Amplitude = quantas pessoas o chefe supervisiona diretamente.", "Muitos subordinados: amplitude ampla.", "Poucos: estreita."], "Amplitude = nº de subordinados diretos.", "Amplitude de controle.")
Q(OR_, "A divisão de uma instituição em regionais (Norte, Sul e Centro), cada uma com os seus serviços, é um exemplo de departamentalização:", "geográfica.",
  [("funcional.", "agrupa por função (pessoal, finanças)."), ("por produto.", "agrupa por tipo de serviço ou produto."), ("por processo.", "agrupa por etapas de um processo."), ("matricial.", "combina funcional e por projeto.")],
  ["O critério de agrupamento é o território.", "Departamentalização por território é geográfica.", "Funcional agrupa por especialidade."], "Região = geográfica.", "Tipo de departamentalização.")
Q(OR_, "A descentralização, em uma organização, significa que:", "parte da autoridade para decidir é delegada a níveis inferiores.",
  [("todas as decisões ficam no topo.", "isso é centralização."), ("não há hierarquia.", "a descentralização não elimina a hierarquia."), ("as decisões são tomadas por sorteio.", "não tem relação."), ("o poder é eliminado.", "o poder é redistribuído.")],
  ["Decisões no topo: centralização.", "Decisões distribuídas: descentralização.", "Delega-se autoridade aos níveis inferiores."], "Descentralizar = delegar decisão.", "Conceito de descentralização.")
Q(OR_, "Ao delegar uma tarefa a um subordinado, o gerente:", "transfere a autoridade para executá-la, mas permanece responsável pelo resultado final.",
  [("transfere também toda a responsabilidade final.", "a responsabilidade final permanece com quem delegou."), ("perde o direito de cobrar resultados.", "continua cobrando."), ("deve evitar acompanhar o trabalho.", "deve acompanhar."), ("elimina a necessidade de metas.", "metas continuam necessárias.")],
  ["Delegar passa a autoridade para fazer.", "A responsabilidade final continua com o gerente.", "Por isso há acompanhamento."], "Delega-se autoridade; a responsabilidade final fica.", "Delegação.")
Q(OR_, "O princípio da unidade de comando estabelece que:", "cada pessoa deve receber ordens de um único chefe.",
  [("cada chefe deve comandar apenas uma pessoa.", "isso confunde com amplitude."), ("todo funcionário deve ter dois chefes.", "isso contraria o princípio."), ("não deve haver chefes.", "o princípio é de hierarquia."), ("as ordens devem vir por escrito sempre.", "não é o princípio.")],
  ["Evita ordens conflitantes.", "Cada subordinado responde a um único superior.", "Princípio da teoria clássica."], "Unidade de comando: um chefe só.", "Princípio da unidade de comando.")
# -------- direção
Q(DI_, "No estilo de liderança autocrático, o líder:", "centraliza as decisões e dá as ordens, com pouca participação do grupo.",
  [("decide em conjunto com o grupo.", "isso é democrático."), ("deixa o grupo decidir sem orientá-lo.", "isso é liberal."), ("evita fazer qualquer cobrança.", "não é característica do autocrático."), ("delega todas as decisões.", "é característica do liberal.")],
  ["Autocrático = decisão centralizada.", "Democrático = decisão compartilhada.", "Liberal = decisão deixada ao grupo."], "Autocrático decide sozinho.", "Estilos de liderança.")
Q(DI_, "Na teoria dos dois fatores de Herzberg, o salário e as condições físicas de trabalho são exemplos de fatores:", "higiênicos, que evitam a insatisfação, mas não geram motivação duradoura.",
  [("motivacionais, que geram satisfação e crescimento.", "os motivacionais são reconhecimento, desafio e crescimento."), ("de autorrealização.", "autorrealização é conceito de Maslow."), ("de poder e influência.", "não é conceito de Herzberg."), ("de liderança liberal.", "é outro tema.")],
  ["Herzberg separa higiênicos e motivacionais.", "Salário e condições de trabalho evitam insatisfação.", "Reconhecimento e desafio geram satisfação."], "Higiênicos: evitam insatisfação.", "Teoria de Herzberg.")
Q(DI_, "Na hierarquia de necessidades de Maslow, o nível mais alto é o das necessidades de:", "autorrealização.",
  [("fisiológicas.", "são a base da pirâmide."), ("segurança.", "são o segundo nível."), ("sociais.", "são o terceiro nível."), ("estima.", "são o quarto nível.")],
  ["A pirâmide parte do básico.", "Ordem: fisiológicas, segurança, sociais, estima, autorrealização.", "O topo é autorrealização."], "Maslow: do básico à autorrealização.", "Pirâmide de Maslow.")
Q(DI_, "No processo de comunicação, o retorno dado pelo receptor ao emissor, confirmando o entendimento da mensagem, é chamado de:", "feedback.",
  [("ruído.", "é o que distorce a mensagem."), ("canal.", "é o meio pelo qual a mensagem trafega."), ("código.", "é o conjunto de signos usados."), ("emissor.", "é quem envia a mensagem.")],
  ["O receptor responde ao emissor.", "Essa resposta confirma se a mensagem foi entendida.", "Esse retorno é o feedback."], "Feedback = retorno do receptor.", "Elementos da comunicação.")
Q(DI_, "Segundo a Teoria Y de McGregor, as pessoas:", "podem gostar do trabalho, buscar responsabilidade e se autodirigir quando motivadas.",
  [("evitam o trabalho e precisam ser controladas rigidamente.", "isso é a Teoria X."), ("só trabalham por medo de punições.", "isso se associa à Teoria X."), ("não aceitam responsabilidade.", "isso se associa à Teoria X."), ("trabalham apenas por dinheiro.", "simplificação que não é a Teoria Y.")],
  ["McGregor apresentou duas visões: X e Y.", "A X é pessimista; a Y é otimista.", "Y: pessoas se motivam e assumem responsabilidades."], "Y = otimista; X = pessimista.", "Teoria Y.")
Q(DI_, "Na comunicação organizacional, o ‘ruído’ é:", "qualquer interferência que distorce ou dificulta a compreensão da mensagem.",
  [("a confirmação do entendimento pelo receptor.", "isso é feedback."), ("o meio usado para transmitir a mensagem.", "isso é o canal."), ("a pessoa que envia a mensagem.", "isso é o emissor."), ("o conteúdo da mensagem.", "isso é a mensagem.")],
  ["Ruído é tudo que atrapalha.", "Pode ser barulho, linguagem confusa, distração.", "Distorce a mensagem entre emissor e receptor."], "Ruído = interferência.", "Conceito de ruído.")
# -------- controle
Q(CT_, "No ciclo PDCA, a etapa ‘Check’ corresponde a:", "verificar os resultados, comparando-os com o planejado.",
  [("definir metas e planos de ação.", "isso é Plan."), ("executar o plano.", "isso é Do."), ("padronizar e agir corretivamente.", "isso é Act."), ("contratar a equipe.", "não é etapa do PDCA.")],
  ["PDCA: Plan, Do, Check, Act.", "Check significa conferir.", "Compara-se o resultado com o plano."], "Check = verificar.", "Etapa Check do PDCA.")
Q(CT_, "O controle realizado antes que a atividade ocorra, para evitar problemas, é denominado:", "preventivo.",
  [("concomitante.", "ocorre durante a atividade."), ("corretivo.", "ocorre depois, para corrigir."), ("posterior.", "ocorre depois da execução."), ("residual.", "não é classificação usual.")],
  ["O momento do controle define o tipo.", "Antes da atividade: preventivo.", "Durante: concomitante; depois: corretivo."], "Antes = preventivo.", "Tipos de controle.")
Q(CT_, "Os indicadores de desempenho são importantes no controle porque:", "permitem medir os resultados e compará-los com as metas.",
  [("substituem a necessidade de planejamento.", "o planejamento continua necessário."), ("tornam as metas desnecessárias.", "indicadores medem o alcance das metas."), ("eliminam a necessidade de correção.", "mostram onde corrigir."), ("servem apenas para decorar relatórios.", "têm função de gestão.")],
  ["Controlar exige medir.", "Indicadores quantificam o desempenho.", "Compara-se com a meta para decidir ações."], "Indicador = régua do desempenho.", "Função dos indicadores.")
Q(CT_, "Entre as etapas do controle, a ordem correta é:", "estabelecer padrões, medir o desempenho, comparar com o padrão e corrigir desvios.",
  [("corrigir desvios, medir, comparar e estabelecer padrões.", "inverte a ordem."), ("comparar, estabelecer padrões, corrigir e medir.", "compara antes de medir."), ("medir, corrigir, estabelecer padrões e comparar.", "corrige antes de comparar."), ("estabelecer padrões e corrigir, sem medir.", "falta medir e comparar.")],
  ["Sem padrão não há comparação.", "Primeiro o padrão, depois a medição, a comparação e a correção.", "Resposta: padrão, medida, comparação, correção."], "Padrão → medida → comparação → correção.", "Etapas do controle.")
Q(CT_, "O Balanced Scorecard (BSC) avalia o desempenho da organização por meio das perspectivas:", "financeira, clientes, processos internos e aprendizado e crescimento.",
  [("apenas financeira e contábil.", "o BSC é multidimensional."), ("política, econômica, social e tecnológica.", "isso é a análise PEST."), ("forças, fraquezas, oportunidades e ameaças.", "isso é a SWOT."), ("planejar, executar, verificar e agir.", "isso é o PDCA.")],
  ["O BSC traduz a estratégia em indicadores.", "Tem quatro perspectivas.", "Financeira, clientes, processos internos e aprendizado e crescimento."], "BSC: 4 perspectivas.", "Perspectivas do BSC.")
# -------- qualidade
Q(QL_, "A qualidade total (TQM) caracteriza-se por:", "envolver toda a organização na melhoria contínua, com foco no cliente.",
  [("restringir a qualidade ao setor de inspeção.", "TQM envolve toda a organização."), ("buscar apenas redução de custos.", "o foco é a satisfação do cliente."), ("evitar mudanças nos processos.", "busca melhoria contínua."), ("concentrar decisões na alta direção.", "valoriza a participação de todos.")],
  ["'Total' indica a participação de todos.", "O foco é o cliente.", "A melhoria é contínua."], "Qualidade total: todos, cliente, melhoria contínua.", "Conceito de TQM.")
Q(QL_, "O diagrama de causa e efeito (espinha de peixe, ou de Ishikawa) é utilizado para:", "identificar e organizar as possíveis causas de um problema.",
  [("planejar prazos de um projeto.", "isso é cronograma."), ("mostrar a hierarquia da organização.", "isso é organograma."), ("calcular o orçamento.", "não é sua função."), ("registrar o fluxo de um documento.", "isso é fluxograma.")],
  ["O problema fica na 'cabeça do peixe'.", "As espinhas mostram categorias de causas.", "Serve para investigar a origem do problema."], "Ishikawa = causas do problema.", "Função do diagrama de Ishikawa.")
Q(QL_, "A ferramenta 5W2H é utilizada para:", "elaborar um plano de ação, definindo o quê, por quê, quem, onde, quando, como e quanto custa.",
  [("analisar o ambiente interno e externo.", "isso é SWOT."), ("medir a satisfação do cliente.", "isso é pesquisa de satisfação."), ("desenhar a estrutura hierárquica.", "isso é organograma."), ("calcular o ponto de equilíbrio.", "não é sua função.")],
  ["5W2H lista 7 perguntas.", "What, Why, Who, Where, When, How, How much.", "Serve para detalhar o plano de ação."], "5W2H = plano de ação.", "Função do 5W2H.")
Q(QL_, "A gestão por resultados na administração pública orienta o trabalho:", "pela definição de metas e indicadores e pela avaliação do desempenho com base nos resultados.",
  [("pelo cumprimento formal de rotinas, sem metas.", "isso é burocracia sem foco em resultado."), ("pela ausência de avaliação.", "a gestão por resultados avalia."), ("pelo orçamento histórico, sem relação com resultados.", "não é o foco."), ("pela decisão exclusiva do chefe.", "o foco é o resultado, e não o centralismo.")],
  ["O foco é o que a organização entrega.", "Define-se meta e indicador.", "Avalia-se o desempenho pelos resultados."], "Gestão por resultados = metas e indicadores.", "Conceito de gestão por resultados.")
Q(QL_, "O princípio constitucional da eficiência, na administração pública, exige:", "que os serviços sejam prestados com bom desempenho, rapidez e uso racional dos recursos.",
  [("que as decisões sejam secretas.", "isso contraria a publicidade."), ("que se favoreçam amigos e parentes.", "isso contraria a impessoalidade."), ("que a lei seja ignorada quando conveniente.", "isso contraria a legalidade."), ("que o gestor decida sem prestar contas.", "isso contraria a transparência.")],
  ["O art. 37 da Constituição lista legalidade, impessoalidade, moralidade, publicidade e eficiência.", "Eficiência exige bom desempenho e resultados.", "Com uso racional dos recursos."], "Eficiência: desempenho e recursos.", "Princípio da eficiência.")
Q(QL_, "Melhoria contínua, ou ‘kaizen’, significa:", "buscar, de forma permanente, pequenas melhorias nos processos e serviços.",
  [("mudar os processos apenas uma vez por década.", "kaizen é permanente."), ("evitar qualquer alteração nos processos.", "kaizen valoriza mudanças."), ("concentrar a qualidade em um único setor.", "kaizen envolve todos."), ("substituir toda a equipe regularmente.", "não é o conceito.")],
  ["'Kaizen' vem do japonês: mudança para melhor.", "A ideia é fazer melhorias pequenas e constantes.", "Envolve todos os colaboradores."], "Kaizen = melhoria contínua.", "Conceito de kaizen.")
Q(QL_, "A efetividade de uma política ou serviço público refere-se:", "ao impacto real e duradouro que o resultado produz sobre a sociedade.",
  [("à rapidez da execução.", "isso se relaciona à eficiência."), ("ao cumprimento do cronograma.", "isso é eficácia/gestão de prazos."), ("ao menor custo possível.", "isso é economicidade."), ("à quantidade de documentos produzidos.", "volume de produção não mede impacto.")],
  ["Eficiência: como se faz (recursos).", "Eficácia: se o objetivo foi atingido.", "Efetividade: o impacto gerado na sociedade."], "Efetividade = impacto.", "Distinguir efetividade.")
salvar()
