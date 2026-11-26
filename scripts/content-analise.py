#!/usr/bin/env python3
"""Análise de Dados e Informações: teoria didática e 50 questões novas. python3 scripts/content-analise.py"""
import sys, pathlib, random
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import qlib
from qlib import Q, teoria, salvar
rnd = random.Random(20261129)

teoria("ana_conc",
 """<p><b>Em uma frase:</b> dado é o fato bruto; informação é o dado com contexto; conhecimento é a informação interpretada e aplicada. Confiabilidade mede o quanto se pode confiar na fonte e no conteúdo.</p>
<div class="exemplo"><b>Analogia:</b> '14h20' é dado; 'o suspeito entrou no prédio às 14h20' é informação; concluir que ele estava no local do crime e agir com base nisso é conhecimento.</div>
<h3>Hierarquia</h3>
<ul><li><b>Dado</b> → <b>informação</b> → <b>conhecimento</b> → decisão.</li></ul>
<h3>Fontes</h3>
<ul><li><b>Primária:</b> origem direta (documento original, testemunha presencial). <b>Secundária:</b> relata ou interpreta a primária (notícia, resumo).</li><li><b>Confiabilidade da fonte × credibilidade da informação:</b> uma fonte confiável pode trazer dado errado; confira com outras fontes.</li></ul>
<h3>Fato, inferência e opinião</h3>
<ul><li><b>Fato:</b> pode ser verificado. <b>Inferência:</b> conclusão a partir de fatos. <b>Opinião:</b> avaliação pessoal.</li></ul>
<h3>Teste rápido</h3><p>'O suspeito parecia nervoso' é fato ou inferência? <b>Resposta:</b> inferência (impressão).</p>""",
 "Texto de um relatório: 'A câmera registrou um homem de boné às 22h12. Ele deve ser o autor.' Passo 1: 'A câmera registrou um homem de boné às 22h12' é <b>fato</b> (verificável no vídeo). Passo 2: 'Ele deve ser o autor' é <b>inferência</b>, não fato. Passo 3: para confirmar, é preciso outros elementos (identificação, vestígios).",
 "(1) Separe o que pode ser verificado (fato) do que é conclusão (inferência). (2) Identifique a fonte: primária ou secundária. (3) Avalie a confiabilidade e corrobore com outras fontes.",
 "Fato se verifica; inferência se conclui; opinião se defende.")
teoria("ana_met",
 """<p><b>Em uma frase:</b> o método de análise separa <b>fatos</b>, <b>inferências</b> e <b>hipóteses</b>, procura <b>contradições</b> e testa a <b>consistência</b> das informações.</p>
<div class="exemplo"><b>Analogia:</b> é como montar um quebra-cabeça: as peças certas (fatos) vêm primeiro; as ligações (inferências) são testadas; a imagem completa é a hipótese a confirmar.</div>
<h3>Conceitos</h3>
<ul><li><b>Fato:</b> verificável. <b>Inferência:</b> conclusão provável a partir dos fatos. <b>Hipótese:</b> explicação provisória que precisa ser testada.</li><li><b>Contradição:</b> duas informações não podem ser verdadeiras ao mesmo tempo (um diz que chegou às 20h, outro diz que ele estava em outra cidade às 20h).</li><li><b>Consistência:</b> as informações se sustentam entre si, sem conflito.</li></ul>
<h3>Passos</h3>
<ol><li>Listar os fatos e a fonte de cada um.</li><li>Separar o que é inferência e hipótese.</li><li>Procurar contradições e lacunas.</li><li>Testar a hipótese com novos dados.</li><li>Registrar o grau de confiança.</li></ol>
<h3>Armadilhas</h3>
<ul><li>Viés de confirmação: buscar só o que confirma a hipótese.</li><li>Tratar inferência como fato.</li></ul>
<h3>Teste rápido</h3><p>Duas testemunhas dão horários incompatíveis. Isso é: <b>Resposta:</b> contradição a esclarecer.</p>""",
 "Fatos: a loja foi arrombada entre 22h e 6h; o alarme não disparou. Hipótese: alguém conhecia o código do alarme. Passo 1: os dois primeiros itens são <b>fatos</b>. Passo 2: 'conhecia o código' é <b>hipótese</b>. Passo 3: teste: verificar quem tinha o código e se houve falha técnica no alarme. Passo 4: se houve falha, a hipótese é <b>enfraquecida</b>.",
 "(1) Fato: verificável. (2) Inferência e hipótese: dependem de teste. (3) Contradição: exige apuração. (4) Evite o viés de confirmação: procure também o que refuta a hipótese.",
 "Teste a hipótese tentando refutá-la, e não só confirmá-la.")
teoria("ana_vinc",
 """<p><b>Em uma frase:</b> análise de vínculos mostra como pessoas, empresas, telefones e lugares se relacionam, usando diagramas de redes.</p>
<div class="exemplo"><b>Analogia:</b> é o mapa de relações de um bairro: quem fala com quem, quem é vizinho de quem, quem intermedeia.</div>
<h3>Elementos</h3>
<ul><li><b>Nós (entidades):</b> pessoas, empresas, telefones, endereços. <b>Arestas (vínculos):</b> as relações (ligação, parentesco, sociedade, transferência).</li><li><b>Vínculo direto:</b> ligação imediata. <b>Indireto:</b> por meio de um intermediário.</li><li><b>Grau do nó:</b> número de ligações. Quem tem muitas ligações é um <b>centro</b>.</li><li><b>Ponte (intermediário):</b> nó que conecta grupos que, sem ele, ficariam separados.</li></ul>
<h3>Diagrama de vínculos</h3>
<ul><li>Cada símbolo representa uma entidade; as linhas mostram as relações. Setas indicam sentido (quem ligou para quem).</li></ul>
<h3>Cuidados</h3>
<ul><li>Vínculo não é prova de participação em crime. Confirme o tipo e a força da relação.</li><li>Homônimos: pessoas com o mesmo nome não são necessariamente a mesma pessoa.</li></ul>
<h3>Teste rápido</h3><p>O nó com mais ligações num diagrama é chamado de: <b>Resposta:</b> centro (de maior grau).</p>""",
 "Telefone A liga para B, C e D; B liga para E; D liga para F. Quem é o centro? Passo 1: A tem <b>3</b> ligações (B, C, D). Passo 2: B tem 2 (A, E); D tem 2 (A, F). Passo 3: A é o <b>centro</b>. Passo 4: B é <b>ponte</b> entre A e E; D é ponte entre A e F.",
 "(1) Liste nós e vínculos. (2) Conte as ligações de cada nó (grau). (3) Identifique pontes (sem elas, o grupo se divide). (4) Não confunda vínculo com culpa.",
 "Grau = número de ligações. Ponte conecta grupos.")
teoria("ana_tempo",
 """<p><b>Em uma frase:</b> análise temporal organiza os eventos em uma linha do tempo para ver a sequência, os intervalos e as coincidências.</p>
<div class="exemplo"><b>Analogia:</b> é a ficha de ocorrência colocada em ordem de relógio: o que veio antes, o que veio depois, e quanto tempo entre eles.</div>
<h3>Como trabalhar</h3>
<ol><li>Reúna os eventos com <b>data, hora e fonte</b>.</li><li><b>Padronize</b> o fuso e o formato.</li><li>Ordene cronologicamente.</li><li>Calcule <b>intervalos</b> (duração entre eventos).</li><li>Procure <b>coincidências</b> e <b>lacunas</b>.</li></ol>
<h3>Fuso horário</h3>
<ul><li>O Acre está <b>2 horas atrás</b> do horário de Brasília (UTC−5; Brasília é UTC−3). Se em Brasília são 15h, no Acre são 13h.</li><li>Registros de sistemas podem estar em <b>UTC</b>: converta antes de comparar.</li></ul>
<h3>Comparações</h3>
<ul><li><b>Sincronia:</b> eventos no mesmo horário. <b>Sequência:</b> A antes de B. <b>Duração</b> = fim − início.</li><li>Relógios de câmeras e celulares podem estar <b>desajustados</b>: confira com uma referência.</li></ul>
<h3>Teste rápido</h3><p>Em Brasília são 18h. Que horas são em Rio Branco? <b>Resposta:</b> 16h.</p>""",
 "Câmera A registrou o suspeito às 16h10 (horário de Brasília). Câmera B, em Rio Branco, às 14h25 (horário do Acre). Quanto tempo entre as duas? Passo 1: padronize: 14h25 no Acre = <b>16h25</b> em Brasília. Passo 2: diferença: 16h25 − 16h10 = <b>15 minutos</b>. Passo 3: a câmera B registrou depois.",
 "(1) Padronize o fuso antes de comparar. (2) Ordene. (3) Intervalo = fim − início. (4) Verifique se os relógios dos equipamentos estão ajustados.",
 "Acre = Brasília − 2 h. Converta antes de comparar.")
teoria("ana_com",
 """<p><b>Em uma frase:</b> registros de comunicação (ligações, mensagens) permitem estudar frequência, duração, sequência e padrões, sem examinar o conteúdo.</p>
<div class="exemplo"><b>Analogia:</b> é como a fatura do telefone detalhada: não mostra o que foi dito, mas mostra quem, quando e por quanto tempo.</div>
<h3>O que os registros trazem</h3>
<ul><li>Número de origem e destino, <b>data e hora</b>, <b>duração</b>, tipo (voz, SMS, dados) e, em operadoras, a <b>antena (ERB)</b> utilizada.</li></ul>
<h3>Indicadores</h3>
<ul><li><b>Frequência:</b> quantas comunicações por período. <b>Duração total e média:</b> soma e média dos tempos.</li><li><b>Sequência:</b> a ordem dos contatos (A liga para B e, em seguida, B liga para C).</li><li><b>Padrões:</b> horários repetidos, rotinas, picos antes e depois de um evento.</li></ul>
<h3>Cuidados</h3>
<ul><li>Dados de comunicação são <b>sigilosos</b>: a obtenção exige base legal e autorização.</li><li>Frequência alta não prova crime: pode ser vínculo comum (família, trabalho).</li></ul>
<h3>Teste rápido</h3><p>3 ligações de 2, 4 e 6 minutos. Duração média? <b>Resposta:</b> 4 minutos.</p>""",
 "Registros: A→B 09h05 (3 min); A→B 09h40 (5 min); B→C 09h50 (2 min). Passo 1: A ligou <b>2 vezes</b> para B. Passo 2: duração total A→B = 3 + 5 = <b>8 min</b>; média 4 min. Passo 3: logo após falar com A, B ligou para C: <b>sequência</b> A → B → C. Passo 4: é um padrão a investigar, e não prova de crime.",
 "(1) Conte, some e tire a média. (2) Ordene por hora para ver a sequência. (3) Procure repetições e picos. (4) Lembre-se do sigilo e da base legal.",
 "Frequência, duração, sequência e padrão: quem, quando, quanto e em que ordem.")
teoria("ana_cruz",
 """<p><b>Em uma frase:</b> cruzar é comparar bases ou registros para achar elementos em comum, diferenças e inconsistências.</p>
<div class="exemplo"><b>Analogia:</b> é colocar duas listas de presença lado a lado para ver quem aparece nas duas.</div>
<h3>Como cruzar</h3>
<ol><li>Defina o <b>campo-chave</b> (CPF, placa, telefone, data).</li><li><b>Padronize</b> os formatos antes.</li><li>Compare: o que aparece nas duas bases (<b>interseção</b>), só em uma (<b>diferença</b>).</li><li>Avalie as <b>coincidências</b>: são significativas ou casuais?</li></ol>
<h3>Cuidados</h3>
<ul><li><b>Homônimos:</b> mesmo nome, pessoas diferentes. Use mais de um campo.</li><li><b>Falso positivo:</b> coincidência que parece relação, mas não é. <b>Falso negativo:</b> relação real que não foi detectada por erro de grafia.</li><li>Datas e horários: confira o fuso e o formato.</li></ul>
<h3>Teste rápido</h3><p>Dois suspeitos com mesmo nome e CPF diferentes: são a mesma pessoa? <b>Resposta:</b> não necessariamente; o CPF diferente indica pessoas distintas.</p>""",
 "Base 1 (telefones de suspeitos): 68991, 68992, 68993. Base 2 (telefones que ligaram para a vítima): 68992, 68994. Passo 1: campo-chave: telefone. Passo 2: interseção: <b>68992</b>. Passo 3: esse número aparece nas duas bases: é a <b>coincidência</b>. Passo 4: a coincidência é um indício a confirmar.",
 "(1) Escolha o campo-chave. (2) Padronize. (3) Compare: interseção e diferença. (4) Confirme coincidências com outros dados.",
 "Cruzamento exige campo-chave e dados padronizados.")
teoria("ana_org",
 """<p><b>Em uma frase:</b> organizar e tratar dados é torná-los consistentes e utilizáveis: estruturar, padronizar, completar e limpar.</p>
<div class="exemplo"><b>Analogia:</b> é arrumar a mesa antes de trabalhar: cada coisa no seu lugar, sem papéis repetidos.</div>
<h3>Etapas</h3>
<ol><li><b>Estruturar</b> em tabela (uma linha por registro, uma coluna por atributo).</li><li><b>Padronizar</b> formatos (datas, telefones, nomes).</li><li><b>Completar</b> campos vazios quando possível.</li><li><b>Remover duplicidades.</b></li><li><b>Validar</b> (valores absurdos, datas impossíveis).</li></ol>
<h3>Qualidade dos dados</h3>
<ul><li><b>Completude, consistência, acurácia, atualidade e unicidade.</b></li></ul>
<h3>Registro das alterações</h3>
<ul><li>Documente o que foi alterado, para manter a <b>rastreabilidade</b>.</li><li>Preserve uma <b>cópia do original</b>.</li></ul>
<h3>Teste rápido</h3><p>Datas como '27/11/26' e '2026-11-27' na mesma coluna: qual problema? <b>Resposta:</b> falta de padronização.</p>""",
 "Lista com 'João da Silva', 'JOAO SILVA' e 'João da Silva ' (espaço final). Passo 1: padronize: caixa e espaços ('JOAO DA SILVA'). Passo 2: verifique se são o mesmo registro (CPF, data de nascimento). Passo 3: se forem, <b>remova a duplicidade</b>. Passo 4: registre a alteração e guarde o original.",
 "(1) Estruture. (2) Padronize. (3) Complete e valide. (4) Remova duplicidades. (5) Documente e guarde o original.",
 "Padronize antes de comparar; guarde o original.")
teoria("ana_prod",
 """<p><b>Em uma frase:</b> produzir informação analítica é transformar dados em quadros e relatórios claros, com conclusões fundamentadas e limitações declaradas.</p>
<div class="exemplo"><b>Analogia:</b> é o laudo do analista: o leitor deve entender o que foi visto, como se concluiu e o que não se sabe.</div>
<h3>Estrutura de um relatório analítico</h3>
<ol><li><b>Finalidade</b> (o que se quer responder).</li><li><b>Fontes e método.</b></li><li><b>Fatos</b> apurados.</li><li><b>Análise</b> (inferências e hipóteses).</li><li><b>Conclusão</b> e <b>recomendações</b>.</li><li><b>Limitações</b> (o que os dados não permitem concluir).</li></ol>
<h3>Quadros e gráficos</h3>
<ul><li>Tabelas resumem números. Gráfico de barras compara; de linhas mostra evolução; de setores mostra proporção.</li><li>Cada quadro deve ter <b>título, fonte e unidade</b>.</li></ul>
<h3>Linguagem</h3>
<ul><li>Clara, objetiva, sem opinião pessoal. Diferencie <b>fato</b> de <b>inferência</b> e indique o <b>grau de confiança</b>.</li></ul>
<h3>Limitações</h3>
<ul><li>Amostra pequena, dados incompletos, fontes únicas. Declarar limitações dá credibilidade.</li></ul>
<h3>Teste rápido</h3><p>Por que declarar limitações? <b>Resposta:</b> para que o leitor saiba até onde a conclusão vale.</p>""",
 "Você analisou 30 registros de ocorrências em um bairro, de apenas um mês. Passo 1: <b>finalidade</b>: identificar o horário de maior incidência. Passo 2: <b>fatos</b>: 18 de 30 (60%) entre 20h e 23h. Passo 3: <b>conclusão</b>: concentração à noite. Passo 4: <b>limitação</b>: amostra pequena (30 registros, 1 mês); a conclusão deve ser confirmada com mais dados.",
 "(1) Responda à finalidade. (2) Apresente fatos com fonte. (3) Distinga fato e inferência. (4) Conclua com cautela. (5) Declare limitações.",
 "Todo relatório diz o que sabe e o que não sabe.")
teoria("ana_geo",
 """<p><b>Em uma frase:</b> análise geográfica usa coordenadas, mapas e distâncias para ver onde as coisas acontecem e se há concentração.</p>
<div class="exemplo"><b>Analogia:</b> é colocar alfinetes num mapa: onde estão agrupados, aí há um padrão.</div>
<h3>Coordenadas</h3>
<ul><li><b>Latitude:</b> distância ao Equador (N positivo, S negativo). <b>Longitude:</b> distância ao meridiano de Greenwich (L positivo, O/W negativo).</li><li>Rio Branco (AC) fica, aproximadamente, em latitude <b>10° S</b> e longitude <b>67,8° O</b>: ambos negativos.</li></ul>
<h3>Distância em mapas</h3>
<ul><li><b>Escala:</b> relação entre a medida no mapa e a real. <b>Escala 1:100.000</b>: 1 cm no mapa = 100.000 cm (1 km) no terreno.</li><li><b>Distância real = distância no mapa × denominador da escala.</b></li></ul>
<h3>Padrões espaciais</h3>
<ul><li><b>Concentração</b> (<i>hot spot</i>): muitos eventos num mesmo local. <b>Dispersão</b>: eventos espalhados. <b>Corredor:</b> eventos ao longo de uma via.</li><li>Um mapa de pontos mostra cada ocorrência; um mapa de calor mostra densidade.</li></ul>
<h3>Cuidados</h3>
<ul><li>Confira a <b>precisão</b> da coordenada (GPS de celular, endereço aproximado).</li></ul>
<h3>Teste rápido</h3><p>Escala 1:50.000, 4 cm no mapa. Distância real? <b>Resposta:</b> 2 km.</p>""",
 "No mapa, dois pontos distam 6 cm; a escala é 1:25.000. Qual a distância real? Passo 1: 6 cm × 25.000 = <b>150.000 cm</b>. Passo 2: converta: 100.000 cm = 1 km, logo 150.000 cm = <b>1,5 km</b>.",
 "(1) Coordenadas: N/S e L/O definem o sinal. (2) Distância real = medida no mapa × escala. (3) Converta cm em m e km. (4) Muitos pontos juntos: concentração.",
 "1 cm no mapa 1:100.000 vale 1 km. Sul e oeste: coordenadas negativas.")
teoria("ana_prot",
 """<p><b>Em uma frase:</b> proteger e garantir a qualidade da informação é manter seu sigilo, sua origem rastreável e seus dados corretos.</p>
<div class="exemplo"><b>Analogia:</b> é a cadeia de custódia de uma prova: cada passagem é registrada, para provar que nada foi alterado.</div>
<h3>Proteção</h3>
<ul><li><b>Confidencialidade:</b> só acessa quem precisa ('necessidade de conhecer').</li><li><b>Rastreabilidade:</b> registrar quem acessou, quando e o que fez (<b>logs</b>).</li><li><b>Integridade:</b> impedir alteração indevida (hash, controle de versão).</li><li><b>Cópias e transmissão seguras.</b></li></ul>
<h3>Qualidade</h3>
<ul><li><b>Acurácia:</b> os dados estão corretos. <b>Completude:</b> nada essencial falta. <b>Consistência:</b> sem conflito entre campos. <b>Atualidade:</b> estão em dia. <b>Unicidade:</b> sem duplicidades.</li></ul>
<h3>Erros comuns em bases</h3>
<ul><li>Digitação (troca de dígitos), duplicidade, campo vazio, dado desatualizado, formatos mistos, homônimos.</li></ul>
<h3>Teste rápido</h3><p>Registrar quem acessou um documento sigiloso serve para: <b>Resposta:</b> rastreabilidade.</p>""",
 "Um analista percebe que o CPF de uma pessoa foi digitado com um dígito trocado e a base nega o cruzamento. Passo 1: tipo de erro: <b>acurácia</b> (digitação). Passo 2: validar o CPF pelos dígitos verificadores. Passo 3: corrigir com base no documento original e <b>registrar a alteração</b> (rastreabilidade). Passo 4: refazer o cruzamento.",
 "(1) Quem pode acessar? Confidencialidade. (2) O que foi feito e por quem? Rastreabilidade. (3) Os dados estão corretos, completos e atuais? Qualidade. (4) Todo ajuste deve ser registrado.",
 "Confidencialidade protege; rastreabilidade registra; qualidade valida.")

C, M, V, T, CM, CR, OR, PR, GE, PT = "ana_conc", "ana_met", "ana_vinc", "ana_tempo", "ana_com", "ana_cruz", "ana_org", "ana_prod", "ana_geo", "ana_prot"
# ---- Conceitos (5)
Q(C, "Na hierarquia entre dado, informação e conhecimento, ‘o suspeito entrou no prédio às 14h20’ é um exemplo de:", "informação, pois o dado (14h20) ganhou contexto.",
  [("dado bruto, sem contexto.", "o dado bruto seria apenas '14h20'."), ("conhecimento aplicado a uma decisão.", "conhecimento exige interpretação e uso."), ("opinião do analista.", "é um fato registrado."), ("hipótese a ser testada.", "não é uma conclusão provisória.")],
  ["'14h20' sozinho é dado.", "'O suspeito entrou no prédio às 14h20' dá contexto ao dado.", "Dado com contexto é informação."], "Dado + contexto = informação.", "Distinguir dado e informação.")
Q(C, "Um documento original, produzido no momento do fato, é uma fonte:", "primária.",
  [("secundária.", "a secundária relata ou interpreta a primária."), ("terciária.", "compila fontes secundárias."), ("duvidosa por definição.", "a fonte primária não é duvidosa por definição."), ("irrelevante para a análise.", "é a mais valiosa.")],
  ["Primária é a que vem direto do fato.", "Documento original e testemunha presencial são fontes primárias.", "Notícias e resumos são secundárias."], "Primária = direto do fato.", "Tipos de fonte.")
Q(C, "A frase ‘o suspeito pareceu nervoso durante a abordagem’, em um relatório, é melhor classificada como:", "inferência (impressão do observador).",
  [("fato verificável.", "'parecer nervoso' é interpretação."), ("dado bruto.", "dado bruto seria, por exemplo, a frequência cardíaca."), ("conhecimento científico.", "não é conhecimento comprovado."), ("prova pericial.", "não é prova técnica.")],
  ["Fato é o que se pode verificar.", "'Pareceu nervoso' depende da percepção de quem observa.", "É uma inferência, e não um fato."], "Impressão = inferência.", "Fato versus inferência.")
Q(C, "Uma informação vinda de uma única fonte, não confirmada por outras, deve ser:", "tratada com cautela e corroborada antes de ser considerada confiável.",
  [("aceita como verdadeira sem verificação.", "uma única fonte pode errar."), ("descartada automaticamente.", "pode ter valor; precisa de checagem."), ("divulgada imediatamente.", "divulgar sem checar é arriscado."), ("considerada sempre falsa.", "não há essa regra.")],
  ["Uma só fonte pode estar errada ou ter interesse.", "É preciso corroborar com outras fontes.", "Só então ganha confiabilidade."], "Corrobore com outras fontes.", "Confiabilidade de fonte única.")
Q(C, "Conhecimento, no contexto da análise de informações, é:", "a informação interpretada e relacionada, que permite compreender uma situação e decidir.",
  [("o dado bruto coletado.", "é o dado."), ("o arquivo que guarda a informação.", "é o suporte."), ("a opinião sem fundamento.", "não é conhecimento."), ("a repetição da mesma informação.", "repetir não gera conhecimento.")],
  ["Dado é o fato bruto; informação é o dado com contexto.", "Conhecimento é a informação interpretada e aplicada.", "Apoia a decisão."], "Dado → informação → conhecimento.", "Conceito de conhecimento.")
# ---- Métodos (5)
Q(M, "Em uma análise, o que diferencia uma hipótese de um fato é que a hipótese:", "é uma explicação provisória, que ainda precisa ser testada.",
  [("já está comprovada.", "se está comprovada, é fato."), ("independe de dados.", "deve ser testada com dados."), ("é sempre verdadeira.", "pode ser refutada."), ("não pode ser alterada.", "pode ser revista.")],
  ["Fato é verificável.", "A hipótese é uma explicação a ser testada.", "Se os dados a contrariam, ela é revista."], "Hipótese: provisória e testável.", "Hipótese versus fato.")
Q(M, "Duas testemunhas oculares afirmam coisas incompatíveis sobre a cor do veículo. Essa situação configura:", "uma contradição, que deve ser apurada.",
  [("uma confirmação entre as fontes.", "elas discordam."), ("uma prova definitiva.", "a divergência impede conclusão imediata."), ("um dado desnecessário.", "o conflito importa."), ("uma hipótese comprovada.", "não há comprovação.")],
  ["As informações não podem ser ambas verdadeiras.", "Isso é uma contradição.", "É preciso apurar com outras fontes (imagens, perícia)."], "Contradição exige apuração.", "Reconhecer contradição.")
Q(M, "O ‘viés de confirmação’ na análise ocorre quando o analista:", "procura e valoriza apenas as informações que confirmam sua hipótese inicial.",
  [("testa a hipótese contra evidências contrárias.", "isso evita o viés."), ("revisa suas conclusões com colegas.", "isso reduz o viés."), ("considera hipóteses alternativas.", "isso reduz o viés."), ("registra a fonte de cada informação.", "isso é boa prática.")],
  ["O viés é uma tendência a confirmar a ideia que já se tem.", "O analista ignora o que a contraria.", "Para evitá-lo, procure também o que refuta a hipótese."], "Evite o viés: busque refutação.", "Viés de confirmação.")
Q(M, "Ao analisar um conjunto de informações, verificar a consistência significa:", "conferir se as informações se sustentam entre si, sem conflitos.",
  [("aumentar o número de informações.", "não é o sentido de consistência."), ("apagar as informações que não agradam.", "isso é manipulação."), ("repetir a mesma informação várias vezes.", "não é conferir."), ("traduzir as informações para outro idioma.", "não é o objetivo.")],
  ["Consistência é coerência interna.", "As informações não devem se contradizer.", "Conflitos precisam ser esclarecidos."], "Consistência = coerência.", "Consistência da informação.")
Q(M, "Em um relatório, é correto tratar uma inferência como:", "uma conclusão provável, apoiada em fatos, mas ainda não confirmada.",
  [("um fato comprovado.", "não é comprovada."), ("uma verdade absoluta.", "pode ser refutada."), ("um dado bruto.", "é uma conclusão."), ("uma informação irrelevante.", "pode ser relevante.")],
  ["Inferência parte de fatos e chega a uma conclusão provável.", "Não equivale ao fato.", "Deve ser identificada como tal no relatório."], "Inferência ≠ fato.", "Tratamento da inferência.")
# ---- Vínculos (5)
Q(V, "Em um diagrama de vínculos, os círculos que representam pessoas e empresas são chamados de:", "nós (entidades).",
  [("arestas.", "são as linhas que representam as relações."), ("setas.", "indicam o sentido das relações."), ("escalas.", "são conceitos de mapas."), ("legendas.", "explicam os símbolos.")],
  ["Um diagrama de vínculos é uma rede.", "Os elementos (pessoas, empresas) são nós.", "As relações são as arestas."], "Nós = entidades; arestas = vínculos.", "Elementos do diagrama.")
Q(V, "Em uma rede, o telefone A liga para B, C e D; B liga para E; D liga para F. O nó com maior número de ligações (maior grau) é:", "A.",
  [("B.", "tem 2 ligações (A e E)."), ("D.", "tem 2 ligações (A e F)."), ("E.", "tem 1 ligação."), ("F.", "tem 1 ligação.")],
  ["Conte as ligações de cada nó.", "A: 3 (B, C, D). B: 2. D: 2. C, E, F: 1.", "O maior grau é de A."], "Grau = nº de ligações.", "Calcular o grau dos nós.")
Q(V, "Um nó que, se retirado da rede, separa dois grupos que antes estavam conectados é chamado de:", "ponte (intermediário).",
  [("nó isolado.", "é o que não tem ligações."), ("centro de maior grau.", "pode ou não ser ponte."), ("duplicidade.", "é registro repetido."), ("homônimo.", "é nome igual de pessoas distintas.")],
  ["O nó conecta dois grupos.", "Sem ele, eles se separam.", "É a ponte, ou intermediário."], "Ponte conecta grupos.", "Conceito de ponte.")
Q(V, "Ao analisar vínculos entre pessoas, a existência de uma ligação entre duas delas, por si só:", "não prova participação conjunta em crime; é um indício a ser confirmado.",
  [("prova a participação conjunta em crime.", "o vínculo pode ser familiar ou profissional."), ("é sempre irrelevante.", "pode ser relevante."), ("comprova que são parentes.", "não indica o tipo de relação."), ("dispensa outras investigações.", "o vínculo exige confirmação.")],
  ["Vínculo mostra relação, mas não o tipo nem a finalidade.", "Pode ser família, trabalho ou vizinhança.", "É um indício que precisa de confirmação."], "Vínculo ≠ culpa.", "Cuidado na análise de vínculos.")
Q(V, "Duas pessoas distintas com o mesmo nome, em bases diferentes, devem ser tratadas como:", "possíveis homônimos, a serem diferenciadas por outros dados, como CPF e data de nascimento.",
  [("a mesma pessoa, necessariamente.", "nome igual não garante identidade."), ("pessoas sem relação alguma, sempre.", "podem ser a mesma pessoa."), ("duplicidade a ser apagada.", "apagar pode eliminar uma pessoa."), ("uma única pessoa com dois nomes.", "não se pode afirmar sem outros dados.")],
  ["Nome igual não prova identidade.", "Use outros campos para distinguir.", "CPF e data de nascimento ajudam."], "Homônimos: confirme por outros campos.", "Tratar homônimos.")
# ---- Análise temporal (5, parte calculada)
def tz():
    h = rnd.randint(8, 20); m = rnd.choice([0, 15, 30, 45])
    t = lambda hh, mm: f"{hh % 24:02d}h{mm:02d}"
    Q(T, f"Um registro marca {t(h, m)} no horário de Brasília. O horário correspondente no Acre (UTC−5, duas horas atrás de Brasília) é:", t(h - 2, m),
      [(t(h + 2, m), "somou duas horas; o Acre está atrás de Brasília."), (t(h - 1, m), "subtraiu só uma hora."), (t(h, m), "não converteu o fuso."), (t(h - 3, m), "subtraiu três horas.")],
      ["O Acre está duas horas atrás de Brasília.", f"Subtraia 2 horas de {t(h, m)}.", f"<b>{t(h - 2, m)}</b>."], "Acre = Brasília − 2 h.", "Converter fuso horário.")
for _ in range(10):
    n0 = len([x for x in qlib.NEW if x["t"] == T])
    try: tz()
    except AssertionError: continue
    k = qlib.NEW[-1]["q"]
    if sum(1 for x in qlib.NEW if x["q"] == k) > 1: qlib.NEW.pop(); continue
    if len([x for x in qlib.NEW if x["t"] == T]) == 2: break
def dur():
    h1, m1 = rnd.randint(8, 12), rnd.choice([5, 10, 20, 35, 50]); dm = rnd.choice([25, 40, 75, 95, 130]); tot = h1 * 60 + m1 + dm
    f = lambda x: f"{(x // 60) % 24:02d}h{x % 60:02d}"
    Q(T, f"Uma câmera registrou a saída de um veículo às {f(h1 * 60 + m1)} e outra, a chegada ao destino às {f(tot)}, ambas no mesmo fuso. O tempo de deslocamento foi de:", f"{dm // 60}h{dm % 60:02d}min" if dm >= 60 else f"{dm} minutos",
      [(f"{(dm + 60) // 60}h{(dm + 60) % 60:02d}min", "somou uma hora indevidamente."), (f"{dm // 2} minutos", "dividiu a diferença por dois."), (f"{(dm - 20) // 60}h{(dm - 20) % 60:02d}min" if dm - 20 >= 60 else f"{dm - 20} minutos", "errou na subtração dos minutos."), (f"{dm + 30} minutos", "somou 30 minutos sem motivo.")],
      ["Duração = hora final − hora inicial.", f"{f(tot)} − {f(h1 * 60 + m1)}.", f"<b>{dm} minutos</b>."], "Duração = fim − início.", "Calcular intervalo de tempo.")
n_before = len([x for x in qlib.NEW if x["t"] == T])
for _ in range(10):
    try: dur()
    except AssertionError: continue
    k = qlib.NEW[-1]["q"]
    if sum(1 for x in qlib.NEW if x["q"] == k) > 1: qlib.NEW.pop(); continue
    if len([x for x in qlib.NEW if x["t"] == T]) >= 4: break
Q(T, "Ao montar uma linha do tempo com registros de sistemas diferentes, o primeiro cuidado deve ser:", "padronizar o fuso horário e o formato de data e hora.",
  [("ordenar pelos nomes dos arquivos.", "a ordem deve ser cronológica."), ("descartar os registros mais antigos.", "eles podem ser essenciais."), ("usar apenas o primeiro registro.", "perde-se informação."), ("converter tudo para texto sem data.", "isso destruiria a cronologia.")],
  ["Sistemas diferentes podem usar fusos e formatos diferentes.", "Sem padronizar, a ordem fica errada.", "Padronize e, depois, ordene."], "Padronize o fuso, depois ordene.", "Cuidado com registros de várias fontes.")
# ---- Registros de comunicação (5, parte calculada)
def media():
    d = sorted(rnd.sample(range(1, 15), 3)); tot = sum(d)
    assert tot % 3 == 0
    Q(CM, f"Três ligações de um mesmo número tiveram duração de {d[0]}, {d[1]} e {d[2]} minutos. A duração média por ligação foi de:", f"{tot // 3} minutos",
      [(f"{tot} minutos", "é a duração total."), (f"{d[1]} minutos", "é o valor central, não a média."), (f"{d[2]} minutos", "é a maior duração."), (f"{tot // 3 + 2} minutos", "erro de conta.")],
      [f"Some as durações: {d[0]} + {d[1]} + {d[2]} = {tot}.", "Divida pelo número de ligações (3).", f"<b>{tot // 3} minutos</b>."], "Média = soma ÷ quantidade.", "Calcular duração média.")
c = 0
for _ in range(60):
    try: media()
    except AssertionError: continue
    k = qlib.NEW[-1]["q"]
    if sum(1 for x in qlib.NEW if x["q"] == k) > 1: qlib.NEW.pop(); continue
    c += 1
    if c == 2: break
Q(CM, "Em um registro de ligações, a sequência ‘A liga para B às 09h05; B liga para C às 09h10’ sugere:", "uma possível relação de repasse de informação entre A, B e C, a ser confirmada.",
  [("que A e C se conhecem diretamente.", "o registro não mostra contato direto entre A e C."), ("que houve crime.", "a sequência é um padrão, não prova."), ("que B é o único envolvido.", "A e C também aparecem."), ("que as ligações não têm relação.", "a proximidade temporal merece atenção.")],
  ["A ligação de B para C ocorre logo após a de A para B.", "Isso sugere possível repasse.", "É um padrão a investigar, não prova."], "Sequência: padrão, não prova.", "Interpretar sequência de ligações.")
Q(CM, "Os registros de comunicação (data, hora, duração e números envolvidos) permitem analisar:", "frequência, duração, sequência e padrões de contato, sem revelar o conteúdo das conversas.",
  [("o conteúdo das conversas, palavra por palavra.", "o registro não traz o conteúdo."), ("a identidade verdadeira de todos os envolvidos.", "números não provam a identidade do usuário."), ("a localização exata, sempre, no centímetro.", "a localização depende de antenas e tem imprecisão."), ("a intenção criminosa das pessoas.", "intenção não consta no registro.")],
  ["O registro mostra metadados da comunicação.", "Não mostra o que foi dito.", "Permite ver quando, quanto e quem."], "Registro mostra o 'quem, quando e quanto'.", "O que os registros de comunicação mostram.")
Q(CM, "Um pico de ligações entre dois números logo antes e logo depois de um crime, em horários incomuns, é:", "um padrão relevante, que deve ser analisado com outras evidências.",
  [("uma prova definitiva de autoria.", "é indício, não prova."), ("um fato irrelevante.", "merece análise."), ("um erro do sistema, sempre.", "não se pode presumir."), ("uma comprovação de que os números pertencem ao mesmo dono.", "não prova a titularidade.")],
  ["Picos antes e depois de um evento merecem atenção.", "Isso é um padrão a ser analisado.", "Deve ser confirmado por outras evidências."], "Pico antes e depois: indício.", "Interpretação de picos de contato.")
# ---- Cruzamento (5)
Q(CR, "Para cruzar duas bases de dados, o primeiro passo é definir:", "o campo-chave comum às duas bases, como CPF, placa ou telefone.",
  [("o tamanho do arquivo de cada base.", "não identifica registros."), ("a cor de fundo da planilha.", "não influencia o cruzamento."), ("o nome do analista.", "não influencia o cruzamento."), ("a data de criação da pasta.", "não identifica registros.")],
  ["Cruzar é ligar registros que se referem ao mesmo elemento.", "Isso exige um campo em comum.", "Defina o campo-chave."], "Cruzamento exige campo-chave.", "Primeiro passo do cruzamento.")
Q(CR, "Na base 1 constam os telefones 68991, 68992 e 68993; na base 2, os telefones 68992 e 68994. O resultado do cruzamento, isto é, a interseção entre as duas bases, é:", "68992.",
  [("68991 e 68993.", "aparecem só na base 1."), ("68994.", "aparece só na base 2."), ("68991, 68992, 68993 e 68994.", "é a união."), ("nenhum telefone.", "o 68992 aparece nas duas.")],
  ["Interseção: o que aparece nas duas bases.", "Base 1: 68991, 68992, 68993. Base 2: 68992, 68994.", "Coincidência: 68992."], "Interseção = aparece nas duas.", "Resultado do cruzamento.")
Q(CR, "Um ‘falso positivo’, em um cruzamento de bases, é:", "uma coincidência que parece indicar relação, mas não corresponde a uma relação real.",
  [("uma relação real que não foi encontrada.", "isso é falso negativo."), ("um registro duplicado.", "é duplicidade."), ("um erro de digitação em um campo.", "é erro de dado."), ("uma base sem nenhum registro.", "não é o conceito.")],
  ["Positivo: o cruzamento encontrou coincidência.", "Falso: a coincidência não é relação real.", "Exemplo: homônimos."], "Falso positivo: coincidência sem relação real.", "Falso positivo.")
Q(CR, "Antes de comparar duas bases com formatos de telefone diferentes ((68) 99999-0000 e 68999990000), é necessário:", "padronizar o formato dos dados.",
  [("excluir uma das bases.", "não é necessário."), ("trocar o computador.", "não resolve."), ("imprimir as bases.", "não resolve."), ("ordenar apenas pela primeira coluna.", "não resolve o formato.")],
  ["Formatos diferentes impedem a comparação.", "Padronize (por exemplo, só números).", "Depois, compare."], "Padronize antes de comparar.", "Preparar bases para cruzamento.")
Q(CR, "Uma coincidência entre duas bases deve ser tratada como:", "um indício que precisa ser confirmado por outras informações.",
  [("prova definitiva da ligação.", "a coincidência pode ser casual."), ("dado sem importância.", "pode ser relevante."), ("erro do sistema.", "não se presume."), ("confirmação de culpa.", "não é prova de culpa.")],
  ["Coincidências podem ser casuais.", "Por isso são indícios.", "Confirme com mais dados."], "Coincidência = indício.", "Valor da coincidência.")
# ---- Organização e tratamento (5)
Q(OR, "Os registros ‘Maria de Souza’ e ‘MARIA DE SOUZA ’ (com espaço no final) podem se referir ao mesmo registro. O procedimento correto é:", "padronizar a grafia e verificar, com outros campos, se são o mesmo registro antes de remover a duplicidade.",
  [("apagar um dos dois sem verificar.", "pode apagar registro distinto."), ("manter os dois, sem padronizar.", "mantém a duplicidade e prejudica contagens."), ("alterar o nome para ‘Maria’.", "descaracteriza o dado."), ("ignorar as diferenças.", "gera erro nas contagens.")],
  ["As diferenças são de caixa e de espaço.", "Padronize e confirme com outro campo (CPF, nascimento).", "Se forem iguais, remova a duplicidade."], "Padronize, confirme, remova duplicidade.", "Tratar registros duplicados.")
Q(OR, "Ao tratar uma base, antes de qualquer alteração, é recomendável:", "guardar uma cópia do original e registrar as alterações feitas.",
  [("apagar a base original.", "perde-se a referência."), ("alterar sem registrar.", "perde-se a rastreabilidade."), ("misturar todas as bases em uma só.", "pode causar confusão."), ("evitar documentar o que foi feito.", "dificulta a conferência.")],
  ["Alterações podem conter erros.", "O original permite refazer o trabalho.", "O registro garante rastreabilidade."], "Guarde o original e registre as mudanças.", "Cuidados no tratamento de dados.")
Q(OR, "Em uma tabela bem estruturada para análise, cada linha deve representar:", "um registro (por exemplo, uma ocorrência) e cada coluna, um atributo (como data, local e tipo).",
  [("vários registros misturados numa mesma célula.", "dificulta a análise."), ("apenas títulos, sem dados.", "não organiza dados."), ("um parágrafo de texto livre.", "não é estrutura de tabela."), ("imagens de documentos.", "não é estrutura de tabela.")],
  ["Tabela organizada: uma linha por registro.", "Uma coluna por atributo.", "Isso facilita filtros e cruzamentos."], "Linha = registro; coluna = atributo.", "Estrutura da tabela.")
Q(OR, "Uma coluna de datas com os formatos ‘27/11/2026’, ‘2026-11-27’ e ‘27-nov-26’ apresenta problema de:", "padronização.",
  [("duplicidade.", "duplicidade é registro repetido."), ("criptografia.", "não é o caso."), ("compactação.", "não é o caso."), ("segurança de rede.", "não é o caso.")],
  ["As datas estão escritas de modos diferentes.", "Isso dificulta ordenar e comparar.", "O problema é de padronização."], "Formatos diferentes: padronize.", "Identificar problema de padronização.")
Q(OR, "Um campo ‘telefone’ vazio em muitos registros caracteriza problema de qualidade relacionado a:", "completude.",
  [("unicidade.", "unicidade trata de repetição."), ("atualidade.", "trata de dados desatualizados."), ("consistência entre campos.", "trata de conflito entre campos."), ("criptografia.", "não é o caso.")],
  ["Faltam valores em um campo importante.", "Isso reduz a completude da base.", "Resposta: completude."], "Campo vazio: completude.", "Dimensão de qualidade.")
# ---- Produção de informações (5)
Q(PR, "Em um relatório analítico, a seção de ‘limitações’ serve para:", "indicar até onde as conclusões são válidas, considerando falhas e lacunas nos dados.",
  [("esconder pontos fracos da análise.", "o objetivo é declará-los."), ("aumentar o tamanho do relatório.", "não é a finalidade."), ("substituir a conclusão.", "complementa a conclusão."), ("incluir opiniões pessoais.", "o relatório deve ser objetivo.")],
  ["Todo conjunto de dados tem limites.", "Declarar as limitações dá transparência.", "O leitor sabe até onde a conclusão vale."], "Limitações: até onde vale a conclusão.", "Função das limitações.")
Q(PR, "Em um quadro que apresenta números de ocorrências por bairro, é obrigatório informar:", "título, fonte dos dados e unidade de medida.",
  [("apenas a cor do quadro.", "cor não é essencial."), ("o nome do autor do software.", "não é essencial."), ("a data de criação do computador.", "não é essencial."), ("somente o rodapé da página.", "insuficiente.")],
  ["Todo quadro precisa ser compreendido sozinho.", "Título diz o assunto; fonte dá a origem; unidade mostra o que se mede.", "São os elementos essenciais."], "Título, fonte e unidade.", "Elementos de um quadro.")
Q(PR, "A conclusão de um relatório analítico deve:", "responder à finalidade da análise, com base nos fatos apurados e indicando o grau de confiança.",
  [("introduzir assuntos novos, sem relação com o trabalho.", "a conclusão fecha o raciocínio."), ("conter apenas opiniões pessoais do autor.", "deve ter base nos fatos."), ("repetir a introdução palavra por palavra.", "deve sintetizar o resultado."), ("ocultar as limitações.", "as limitações devem ser declaradas.")],
  ["A análise tem uma finalidade.", "A conclusão deve respondê-la com base nos fatos.", "Indica o grau de confiança e as limitações."], "Conclusão responde à finalidade.", "Conclusão do relatório.")
Q(PR, "Para mostrar a evolução do número de ocorrências ao longo dos meses de um ano, o gráfico mais adequado é o de:", "linhas.",
  [("setores (pizza).", "mostra proporção, e não evolução."), ("organograma.", "mostra estrutura hierárquica."), ("dispersão.", "relaciona duas variáveis."), ("fluxograma.", "mostra um processo.")],
  ["O objetivo é mostrar evolução no tempo.", "O gráfico de linhas acompanha a série.", "Pizza serve para proporções."], "Tempo: linhas.", "Escolher o gráfico.")
Q(PR, "No relatório analítico, a linguagem adequada é:", "clara e objetiva, distinguindo fatos de inferências.",
  [("subjetiva, com opiniões pessoais.", "o relatório deve ser objetivo."), ("vaga, para evitar compromisso.", "a clareza é essencial."), ("técnica e incompreensível ao leitor.", "o texto deve ser compreensível."), ("sem referências às fontes.", "as fontes devem ser indicadas.")],
  ["O leitor precisa entender e confiar.", "Linguagem clara e objetiva.", "Fatos e inferências aparecem separados."], "Clareza e objetividade.", "Linguagem do relatório.")
# ---- Análise geográfica (5, parte calculada)
def escala():
    cm, den = rnd.choice([2, 3, 4, 5, 6, 8]), rnd.choice([25000, 50000, 100000]); real_cm = cm * den; km = real_cm / 100000
    assert km == int(km) or (km * 2) == int(km * 2)
    fm = lambda x: (str(int(x)) if x == int(x) else str(x).replace(".", ","))
    Q(GE, f"No mapa, dois pontos estão a {cm} cm um do outro e a escala é 1:" + f"{den:,}".replace(",", ".") + ". A distância real entre eles é:", f"{fm(km)} km",
      [(f"{fm(km * 10)} km", "errou a conversão de cm para km."), (f"{fm(km / 10)} km", "errou a conversão de cm para km."), (f"{cm} km", "ignorou a escala."), (f"{fm(cm * den / 1000)} km", "converteu em metros e não em km.")],
      [f"Distância real = {cm} cm × {den:,} = {real_cm:,} cm.".replace(",", "."), "Converta: 100.000 cm = 1 km.", f"<b>{fm(km)} km</b>."], "Distância real = medida × escala.", "Calcular distância pela escala.")
c = 0
for _ in range(60):
    try: escala()
    except AssertionError: continue
    k = qlib.NEW[-1]["q"]
    if sum(1 for x in qlib.NEW if x["q"] == k) > 1: qlib.NEW.pop(); continue
    c += 1
    if c == 2: break
Q(GE, "O sinal das coordenadas geográficas de Rio Branco (AC), que se localiza ao sul do Equador e a oeste do meridiano de Greenwich, é:", "latitude negativa (S) e longitude negativa (O).",
  [("latitude positiva e longitude positiva.", "valeria para norte e leste."), ("latitude positiva e longitude negativa.", "valeria para norte e oeste."), ("latitude negativa e longitude positiva.", "valeria para sul e leste."), ("ambas nulas.", "só ocorre na intersecção do Equador e Greenwich.")],
  ["Sul do Equador: latitude negativa.", "Oeste de Greenwich: longitude negativa.", "Rio Branco: latitude e longitude negativas."], "Sul e oeste: negativos.", "Sinais das coordenadas.")
Q(GE, "Em um mapa de pontos, vários eventos concentrados em uma mesma região indicam:", "uma concentração espacial (hot spot), que merece análise.",
  [("dispersão uniforme dos eventos.", "a dispersão mostraria pontos espalhados."), ("erro de impressão do mapa.", "não se presume erro."), ("ausência de eventos.", "há muitos eventos."), ("inexistência de padrão.", "há padrão de concentração.")],
  ["Pontos agrupados mostram concentração.", "Essa concentração é chamada de hot spot.", "Indica um local a analisar."], "Pontos juntos: concentração.", "Padrão espacial.")
Q(GE, "Ao usar coordenadas de GPS de um celular em uma análise, deve-se considerar que:", "a precisão pode variar e deve ser confirmada, pois erros de alguns metros ou mais podem ocorrer.",
  [("a coordenada é sempre exata ao centímetro.", "o GPS tem margem de erro."), ("a coordenada nunca pode ser usada.", "pode ser usada com cautela."), ("a coordenada independe do sinal de satélite.", "depende de sinal."), ("o erro nunca é relevante.", "pode ser relevante.")],
  ["O GPS tem margem de erro.", "Prédios, árvores e sinal afetam a precisão.", "A coordenada é um indício a confirmar."], "GPS tem margem de erro.", "Precisão de coordenadas.")
# ---- Proteção e qualidade (5)
Q(PT, "A rastreabilidade das informações, em uma base sigilosa, é garantida principalmente por:", "registros de acesso (logs) que mostram quem acessou, quando e o que fez.",
  [("compartilhamento livre da senha.", "enfraquece a segurança."), ("exclusão dos registros de acesso.", "destrói a rastreabilidade."), ("acesso sem identificação.", "impede saber quem acessou."), ("cópias sem controle.", "enfraquecem a proteção.")],
  ["Rastrear é reconstruir o caminho.", "Os logs registram usuário, data, hora e ação.", "Assim se identifica quem fez o quê."], "Logs: quem, quando e o quê.", "Rastreabilidade de acesso.")
Q(PT, "O princípio da ‘necessidade de conhecer’ determina que:", "somente deve acessar a informação sigilosa quem precisa dela para cumprir sua função.",
  [("todos os servidores devem ter acesso a todas as informações.", "contraria o princípio."), ("a informação deve ser divulgada a qualquer interessado.", "contraria o sigilo."), ("o acesso deve ser dado por amizade.", "o acesso é por necessidade funcional."), ("o chefe pode compartilhar livremente com quem desejar.", "o acesso segue a necessidade e as normas.")],
  ["O sigilo é protegido restringindo o acesso.", "Só acessa quem precisa para o trabalho.", "É o princípio da necessidade de conhecer."], "Acesso só a quem precisa.", "Necessidade de conhecer.")
Q(PT, "Um CPF digitado com um dígito trocado em uma base representa falha de qualidade na dimensão:", "acurácia (exatidão do dado).",
  [("completude.", "trata de campos vazios."), ("atualidade.", "trata de dados desatualizados."), ("unicidade.", "trata de duplicidades."), ("confidencialidade.", "trata de acesso restrito.")],
  ["O dado existe, mas está errado.", "Isso é falha de acurácia.", "Pode ser corrigido pelo documento original."], "Dado errado: acurácia.", "Dimensão de qualidade.")
Q(PT, "A cadeia de custódia de uma evidência digital tem por finalidade:", "documentar quem manteve a evidência sob guarda, quando e em que condições, comprovando que não foi alterada.",
  [("aumentar o tamanho do arquivo.", "não é o objetivo."), ("apagar as provas após a análise.", "não é o objetivo."), ("permitir o acesso livre de qualquer pessoa.", "contraria a custódia."), ("transformar o arquivo em outro formato.", "não é o objetivo.")],
  ["A prova precisa ser confiável.", "A cadeia documenta cada passagem.", "Assim se garante a integridade e a autenticidade."], "Cadeia de custódia: quem, quando, como.", "Cadeia de custódia.")
Q(PT, "Uma base de dados com registros desatualizados, como endereços antigos, apresenta falha de qualidade na dimensão:", "atualidade.",
  [("completude.", "trata de campos vazios."), ("unicidade.", "trata de duplicidade."), ("acurácia nos dígitos.", "trata de erros de digitação."), ("confidencialidade.", "trata de acesso.")],
  ["Os dados já não refletem a realidade atual.", "Isso é falta de atualidade.", "Devem ser revisados periodicamente."], "Desatualizado: atualidade.", "Dimensão de atualidade.")
salvar()
