#!/usr/bin/env python3
"""Realidade do Acre: teoria didática e 32 questões novas, só com fatos amplamente documentados.
ATENÇÃO: confira datas e números com fonte oficial (IBGE, Governo do Acre) antes de usar em prova. python3 scripts/content-acre.py"""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from qlib import Q, teoria, salvar

teoria("acre_hist",
 """<p><b>Em uma frase:</b> o Acre nasceu de uma disputa por terras de seringais entre Bolívia e Brasil, vencida pelos brasileiros e fechada pelo Tratado de Petrópolis, em 1903.</p>
<div class="exemplo"><b>Analogia:</b> seringueiros nordestinos ocuparam, por conta própria, terras que mapas bolivianos diziam ser da Bolívia; a disputa virou guerra e depois tratado.</div>
<h3>Linha do tempo</h3>
<ul><li><b>Século XIX:</b> a <b>borracha</b> atrai milhares de migrantes, sobretudo <b>nordestinos</b>, para os seringais do alto Purus e do Juruá.</li><li><b>1899:</b> <b>Luis Gálvez</b> proclama o <b>Estado Independente do Acre</b> (episódio breve).</li><li><b>1899–1903:</b> <b>Revolução Acreana</b>. Em 1902–1903, <b>Plácido de Castro</b> lidera a luta armada dos seringueiros.</li><li><b>1903:</b> <b>Tratado de Petrópolis</b> incorpora o Acre ao Brasil; a Bolívia recebe indenização e compensações. A negociação teve papel do <b>Barão do Rio Branco</b>.</li><li><b>1904:</b> criação do <b>Território Federal do Acre</b>.</li><li><b>1962:</b> o Acre é elevado a <b>Estado</b>.</li><li><b>Século XX:</b> declínio e retomada da borracha (Batalha da Borracha, na Segunda Guerra), colonização e conflitos de terra.</li><li><b>1988:</b> assassinato de <b>Chico Mendes</b>, líder seringueiro e ambientalista, em Xapuri.</li></ul>
<h3>Armadilhas</h3>
<ul><li>Revolução Acreana × Tratado de Petrópolis: a luta (1899–1903) veio antes do tratado (1903).</li><li>Território (1904) × Estado (1962).</li></ul>
<h3>Teste rápido</h3><p>Quem liderou a luta armada dos seringueiros em 1902–1903? <b>Resposta:</b> Plácido de Castro.</p>""",
 "Ordene: Território Federal do Acre, Tratado de Petrópolis, elevação a Estado, assassinato de Chico Mendes. Passo 1: <b>Tratado de Petrópolis</b> (1903). Passo 2: <b>Território Federal do Acre</b> (1904). Passo 3: <b>elevação a Estado</b> (1962). Passo 4: <b>assassinato de Chico Mendes</b> (1988). Ordem: 1903 → 1904 → 1962 → 1988.",
 "(1) Fixe os marcos: 1899–1903 (revolução), 1903 (tratado), 1904 (território), 1962 (estado), 1988 (Chico Mendes). (2) Personagens: Plácido de Castro (luta), Barão do Rio Branco (diplomacia), Chico Mendes (seringueiros).",
 "Luta (1902–03), tratado (1903), território (1904), estado (1962).")
teoria("acre_geo",
 """<p><b>Em uma frase:</b> o Acre fica no extremo sudoeste da Amazônia brasileira, na fronteira com o Peru e a Bolívia, coberto em grande parte por floresta e cortado por rios.</p>
<div class="exemplo"><b>Analogia:</b> é a 'porta' do Brasil para o Pacífico: quem vai do Acre ao Peru e à Bolívia passa por poucas estradas e muitos rios.</div>
<h3>Localização e limites</h3>
<ul><li><b>Capital:</b> <b>Rio Branco</b>. <b>22 municípios</b>.</li><li><b>Limites:</b> Amazonas (norte), Rondônia (leste), <b>Bolívia</b> (sul e sudeste) e <b>Peru</b> (sul e oeste).</li><li><b>Fronteira:</b> Assis Brasil (tríplice fronteira Brasil, Peru e Bolívia), Brasileia/Epitaciolândia (com a Bolívia), Cruzeiro do Sul e Mâncio Lima (região oeste).</li></ul>
<h3>Relevo, clima e vegetação</h3>
<ul><li>Relevo de <b>planície e terras baixas</b>, com planalto na região oeste (Serra do Divisor).</li><li><b>Clima equatorial</b>: quente e úmido, com chuvas fortes e período mais seco (inverno amazônico).</li><li><b>Floresta amazônica</b> (floresta ombrófila), com trechos de bambu e palmeiras.</li></ul>
<h3>Hidrografia</h3>
<ul><li>Bacia do <b>Amazonas</b>. Rios principais: <b>Juruá</b>, <b>Purus</b>, <b>Acre</b>, <b>Tarauacá</b> e <b>Envira</b>. Muitos servem como vias de transporte.</li></ul>
<h3>Áreas protegidas</h3>
<ul><li><b>Parque Nacional da Serra do Divisor</b> (extremo oeste). <b>Reserva Extrativista Chico Mendes</b> (região de Xapuri, Brasileia e Assis Brasil).</li></ul>
<h3>Rodovias</h3>
<ul><li><b>BR-364:</b> liga Rio Branco a Porto Velho (RO) e ao oeste do Acre. <b>BR-317:</b> liga Rio Branco à fronteira com o Peru e a Bolívia (Rodovia Interoceânica/Estrada do Pacífico).</li></ul>
<h3>Teste rápido</h3><p>Em que cidade acreana fica a tríplice fronteira com o Peru e a Bolívia? <b>Resposta:</b> Assis Brasil.</p>""",
 "Quais países fazem fronteira com o Acre, e em qual direção? Passo 1: o Acre está no <b>sudoeste</b> da Amazônia brasileira. Passo 2: ao <b>sul e sudeste</b>, a <b>Bolívia</b>. Passo 3: ao <b>sul e oeste</b>, o <b>Peru</b>. Passo 4: internamente, faz limite com o <b>Amazonas</b> (norte) e <b>Rondônia</b> (leste).",
 "(1) Visualize o mapa: Acre no canto sudoeste. (2) Fronteiras internacionais: Peru e Bolívia. (3) Rios: Juruá, Purus, Acre. (4) Áreas protegidas: Serra do Divisor e Chico Mendes.",
 "Acre: Peru e Bolívia na fronteira; Amazonas e Rondônia de vizinhos.")
teoria("acre_soc",
 """<p><b>Em uma frase:</b> a sociedade acreana é formada por povos indígenas, seringueiros, ribeirinhos, descendentes de migrantes nordestinos e populações urbanas, com forte ligação com a floresta.</p>
<div class="exemplo"><b>Analogia:</b> é um mosaico: cada grupo traz uma forma de viver com a floresta e com os rios.</div>
<h3>Povos indígenas</h3>
<ul><li>O Acre abriga vários povos, como os <b>Huni Kuin (Kaxinawá)</b>, <b>Ashaninka</b>, <b>Yawanawá</b>, <b>Katukina</b>, <b>Jaminawa</b>, <b>Manchineri</b>, <b>Apurinã</b>, <b>Poyanawa</b>, <b>Nukini</b> e outros.</li><li>Terras indígenas são <b>bens da União</b>, de posse permanente dos povos indígenas (Constituição de 1988).</li></ul>
<h3>Seringueiros, ribeirinhos e extrativistas</h3>
<ul><li>Descendentes de migrantes nordestinos do ciclo da borracha. Vivem do <b>extrativismo</b> (látex, castanha, açaí) e das <b>reservas extrativistas</b>.</li><li><b>Chico Mendes</b> tornou-se símbolo da luta por direitos e pela floresta.</li></ul>
<h3>População e urbanização</h3>
<ul><li>População de pouco mais de 800 mil habitantes, <b>concentrada</b> em Rio Branco e nas principais cidades.</li><li>Alta presença de população que vive em áreas urbanas, mesmo no coração da floresta.</li></ul>
<h3>Questões sociais</h3>
<ul><li><b>Desafios:</b> acesso à saúde e à educação em áreas isoladas, transporte fluvial, fronteira com tráfico, pressão sobre a floresta.</li></ul>
<h3>Teste rápido</h3><p>Quem foi Chico Mendes? <b>Resposta:</b> líder seringueiro e ambientalista, assassinado em 1988.</p>""",
 "Classifique cada grupo: Huni Kuin; seringueiros; ribeirinhos; Ashaninka. Passo 1: <b>Huni Kuin</b> e <b>Ashaninka</b> são povos <b>indígenas</b>, com direito às terras tradicionais. Passo 2: <b>seringueiros</b> e <b>ribeirinhos</b> são populações tradicionais <b>não indígenas</b>, ligadas ao extrativismo e aos rios. Passo 3: ambos os grupos tradicionais têm papel na proteção da floresta.",
 "(1) Povos indígenas: Huni Kuin, Ashaninka, Yawanawá, Katukina, Jaminawa, Manchineri. (2) Populações tradicionais: seringueiros e ribeirinhos. (3) Símbolo da luta: Chico Mendes.",
 "Indígenas × seringueiros e ribeirinhos: grupos diferentes, ambos ligados à floresta.")
teoria("acre_eco",
 """<p><b>Em uma frase:</b> a economia do Acre combina extrativismo, agropecuária e serviços, com forte peso do setor público, e busca integração com o Pacífico pela Interoceânica.</p>
<div class="exemplo"><b>Analogia:</b> a floresta é, ao mesmo tempo, a fonte de renda (extrativismo) e o desafio (desmatar ou conservar).</div>
<h3>Atividades econômicas</h3>
<ul><li><b>Extrativismo vegetal:</b> borracha (látex), <b>castanha-do-brasil</b>, açaí, madeira manejada.</li><li><b>Agropecuária:</b> pecuária bovina (a atividade com maior área), mandioca, milho, banana.</li><li><b>Serviços e administração pública:</b> grande parte do PIB e do emprego, sobretudo em Rio Branco.</li><li><b>Indústria:</b> pequena, ligada à madeira, alimentos e construção.</li></ul>
<h3>Integração</h3>
<ul><li><b>Rodovia Interoceânica</b> (BR-317 até o Peru): liga o Brasil aos portos do Pacífico.</li><li><b>ZPE do Acre</b>, em Senador Guiomard: zona de processamento de exportações.</li><li><b>Comércio de fronteira</b> com Peru e Bolívia.</li></ul>
<h3>Desenvolvimento sustentável</h3>
<ul><li>Valorização de produtos da floresta, bioeconomia, manejo florestal e pagamento por serviços ambientais.</li></ul>
<h3>Desafios</h3>
<ul><li>Distância dos grandes centros, logística cara, dependência de poucas atividades, pressão por desmatamento.</li></ul>
<h3>Teste rápido</h3><p>Em que cidade fica a ZPE do Acre? <b>Resposta:</b> Senador Guiomard.</p>""",
 "Por que a Rodovia Interoceânica interessa ao Acre? Passo 1: ela liga o Acre ao <b>Peru</b>, com acesso a portos do <b>Pacífico</b>. Passo 2: encurta o caminho para exportar produtos como madeira manejada, castanha e carne para a Ásia. Passo 3: também facilita a importação. Passo 4: o desafio é a <b>logística</b> e a conservação da estrada.",
 "(1) Atividade tradicional: extrativismo. (2) Atividade de maior área: pecuária. (3) Maior fonte de emprego: serviços e setor público. (4) Integração: Interoceânica e ZPE.",
 "Extrativismo, pecuária e serviços; Interoceânica abre o Pacífico.")

H, GE, SO, EC = "acre_hist", "acre_geo", "acre_soc", "acre_eco"
# ---- História (7)
Q(H, "O Tratado de Petrópolis, assinado em 1903, teve como principal resultado:", "a incorporação do território acreano ao Brasil, com indenização à Bolívia.",
  [("a independência definitiva do Acre como país.", "o Acre foi incorporado ao Brasil."), ("a divisão do Acre entre o Brasil e o Peru.", "o tratado foi com a Bolívia."), ("a criação do Estado do Acre.", "o Acre virou estado só em 1962."), ("o fim do ciclo da borracha.", "o tratado não encerrou o ciclo.")],
  ["O Brasil e a Bolívia disputavam o Acre.", "Em 1903, o Tratado de Petrópolis resolveu a disputa.", "O Acre foi incorporado ao Brasil e a Bolívia recebeu compensações."], "Petrópolis (1903): Acre brasileiro.", "Resultado do Tratado de Petrópolis.")
Q(H, "Foi o principal líder da luta armada dos seringueiros acreanos na fase final da Revolução Acreana (1902–1903):", "José Plácido de Castro.",
  [("Chico Mendes.", "foi líder seringueiro e ambientalista, assassinado em 1988."), ("Luis Gálvez.", "proclamou o Estado Independente do Acre em 1899."), ("Barão do Rio Branco.", "conduziu a diplomacia, não a luta armada."), ("Marechal Rondon.", "atuou em outras frentes, como as linhas telegráficas.")],
  ["A luta de 1902–1903 foi liderada por um gaúcho que se tornou comandante dos seringueiros.", "Ele é José Plácido de Castro.", "Chico Mendes viveu quase um século depois."], "Plácido de Castro: luta armada.", "Líder da Revolução Acreana.")
Q(H, "A elevação do Acre à condição de Estado da federação ocorreu em:", "1962.",
  [("1903.", "ano do Tratado de Petrópolis."), ("1904.", "ano de criação do Território Federal."), ("1988.", "ano da Constituição e da morte de Chico Mendes."), ("1930.", "não é o ano.")],
  ["O Acre foi território federal desde 1904.", "A passagem a estado aconteceu mais de meio século depois.", "Resposta: 1962."], "Território: 1904. Estado: 1962.", "Data de criação do Estado.")
Q(H, "O Estado Independente do Acre foi proclamado, em 1899, por:", "Luis Gálvez.",
  [("José Plácido de Castro.", "liderou a luta armada em 1902–1903."), ("Barão do Rio Branco.", "foi o diplomata do tratado."), ("Chico Mendes.", "viveu no século XX, e lutou pelos seringueiros."), ("Rui Barbosa.", "não participou do episódio.")],
  ["Em 1899, houve uma proclamação de curta duração.", "Foi feita por um aventureiro de origem espanhola.", "Seu nome: Luis Gálvez."], "Gálvez (1899); Plácido (1902–03).", "Estado Independente do Acre.")
Q(H, "A atração de grande contingente de migrantes nordestinos para o Acre, no final do século XIX, esteve ligada principalmente:", "à exploração da borracha (látex) nos seringais.",
  [("à descoberta de ouro no rio Acre.", "o fator principal foi a borracha."), ("à construção da capital Brasília.", "ocorreu séculos depois."), ("à industrialização da cidade de Rio Branco.", "a atração foi a borracha."), ("à abertura da Rodovia Transamazônica.", "a rodovia é do século XX.")],
  ["A borracha era muito valorizada.", "Os seringais precisavam de mão de obra.", "Muitos nordestinos migraram, fugindo da seca."], "Borracha atraiu nordestinos.", "Causa da migração para o Acre.")
Q(H, "Chico Mendes, assassinado em 1988, ficou conhecido por:", "liderar seringueiros na defesa da floresta e dos modos de vida extrativistas.",
  [("comandar a Revolução Acreana de 1902.", "foi Plácido de Castro."), ("assinar o Tratado de Petrópolis.", "o tratado é de 1903."), ("fundar a cidade de Rio Branco.", "não foi fundador."), ("proclamar o Estado Independente do Acre.", "foi Luis Gálvez.")],
  ["Chico Mendes foi seringueiro e sindicalista.", "Defendeu a floresta e as reservas extrativistas.", "Foi assassinado em Xapuri, em 1988."], "Chico Mendes: seringueiros e floresta.", "Quem foi Chico Mendes.")
Q(H, "Entre os fatos históricos abaixo, o que ocorreu primeiro é:", "a Revolução Acreana (1899–1903).",
  [("a elevação do Acre a Estado.", "ocorreu em 1962."), ("a criação do Território Federal do Acre.", "ocorreu em 1904."), ("o assassinato de Chico Mendes.", "ocorreu em 1988."), ("a criação da Reserva Extrativista Chico Mendes.", "é posterior a 1988.")],
  ["A Revolução Acreana vai de 1899 a 1903.", "O território é de 1904; o estado, de 1962.", "Chico Mendes foi assassinado em 1988."], "Revolução → tratado → território → estado.", "Ordenar fatos históricos.")
# ---- Geografia (8)
Q(GE, "A capital do Estado do Acre é:", "Rio Branco.",
  [("Cruzeiro do Sul.", "é a segunda maior cidade."), ("Sena Madureira.", "é município no rio Purus."), ("Tarauacá.", "é município no oeste do estado."), ("Brasileia.", "é município da fronteira.")],
  ["A capital está às margens do rio Acre.", "É a maior cidade do estado.", "Resposta: Rio Branco."], "Capital: Rio Branco.", "Capital do Acre.")
Q(GE, "O Acre faz fronteira internacional com:", "o Peru e a Bolívia.",
  [("a Colômbia e a Venezuela.", "ficam mais ao norte."), ("o Paraguai e a Argentina.", "ficam mais ao sul."), ("o Equador e a Guiana.", "não fazem fronteira com o Acre."), ("o Uruguai e o Chile.", "ficam bem mais ao sul.")],
  ["O Acre está no sudoeste da Amazônia.", "Ao sul e ao oeste, encontram-se o Peru e a Bolívia.", "Resposta: Peru e Bolívia."], "Acre: Peru e Bolívia.", "Fronteiras do Acre.")
Q(GE, "Os estados brasileiros que fazem divisa com o Acre são:", "Amazonas e Rondônia.",
  [("Pará e Mato Grosso.", "não fazem divisa com o Acre."), ("Amapá e Roraima.", "ficam no norte do país."), ("Mato Grosso e Tocantins.", "não fazem divisa com o Acre."), ("Maranhão e Pará.", "ficam bem mais a leste.")],
  ["O Acre faz divisa a norte e leste com outros estados.", "Ao norte, o Amazonas; ao leste, Rondônia.", "Resposta: Amazonas e Rondônia."], "Acre: AM e RO.", "Divisas do Acre.")
Q(GE, "O clima predominante no Acre é o:", "equatorial, quente e úmido.",
  [("semiárido.", "ocorre no sertão nordestino."), ("subtropical.", "ocorre no sul do Brasil."), ("temperado.", "não ocorre no Brasil de forma predominante."), ("desértico.", "não ocorre no Acre.")],
  ["O Acre está na Amazônia.", "Temperaturas altas e chuvas abundantes.", "Clima equatorial."], "Amazônia: equatorial.", "Clima do Acre.")
Q(GE, "Entre os rios abaixo, o que tem o nome do estado e banha a capital é o:", "rio Acre.",
  [("rio Juruá.", "banha Cruzeiro do Sul."), ("rio Purus.", "banha Sena Madureira e Manoel Urbano."), ("rio Tarauacá.", "banha Tarauacá e Feijó."), ("rio Madeira.", "corta Rondônia.")],
  ["A capital se desenvolveu às margens de um rio.", "Esse rio tem o nome do estado.", "Resposta: rio Acre."], "Rio Acre: capital.", "Hidrografia do Acre.")
Q(GE, "O Parque Nacional da Serra do Divisor, no Acre, localiza-se:", "no extremo oeste do estado, na fronteira com o Peru.",
  [("no extremo leste do estado, na divisa com Rondônia.", "fica no oeste."), ("ao norte, na divisa com o Amazonas.", "fica no extremo oeste."), ("no centro de Rio Branco.", "é uma área afastada, na região oeste."), ("na fronteira com a Bolívia.", "fica na divisa com o Peru.")],
  ["A serra fica no limite do Brasil com o Peru.", "É uma unidade de conservação federal.", "Região de Cruzeiro do Sul e Mâncio Lima."], "Serra do Divisor: oeste, Peru.", "Localização do Parque Nacional.")
Q(GE, "A cidade acreana onde ocorre a tríplice fronteira entre Brasil, Peru e Bolívia é:", "Assis Brasil.",
  [("Rio Branco.", "é a capital, longe da tríplice fronteira."), ("Cruzeiro do Sul.", "fica no oeste, próximo ao Peru."), ("Feijó.", "fica no interior."), ("Plácido de Castro.", "fica próxima à Bolívia, sem ser a tríplice fronteira.")],
  ["A tríplice fronteira reúne três países.", "No Acre, ela fica no município de Assis Brasil.", "Do outro lado, Iñapari (Peru) e Bolpebra (Bolívia)."], "Assis Brasil = tríplice fronteira.", "Tríplice fronteira.")
Q(GE, "O número de municípios do Estado do Acre é:", "22.",
  [("12.", "é número menor."), ("45.", "é número maior."), ("52.", "é número maior."), ("8.", "é número menor.")],
  ["O Acre é um estado pequeno em população.", "Seus municípios são poucos em comparação a outros estados.", "São 22 municípios."], "Acre: 22 municípios.", "Quantidade de municípios.")
# ---- Povos e sociedade (9)
Q(SO, "Entre os povos indígenas abaixo, são presentes no Acre:", "os Huni Kuin (Kaxinawá) e os Ashaninka.",
  [("os Yanomami e os Ticuna.", "vivem principalmente em Roraima e no Amazonas."), ("os Guarani e os Kaingang.", "vivem principalmente no sul e sudeste."), ("os Bororo e os Xavante.", "vivem em Mato Grosso."), ("os Pataxó e os Tupinambá.", "vivem no litoral nordestino.")],
  ["O Acre tem vários povos indígenas.", "Entre eles estão os Huni Kuin (Kaxinawá) e os Ashaninka.", "As outras opções citam povos de outras regiões."], "Huni Kuin e Ashaninka: Acre.", "Povos indígenas do Acre.")
Q(SO, "A Constituição de 1988 estabelece que as terras tradicionalmente ocupadas pelos indígenas são:", "bens da União, de posse permanente dos povos indígenas.",
  [("propriedade privada dos povos que as ocupam.", "são bens da União."), ("áreas livres para qualquer ocupação.", "a Constituição protege essas terras."), ("propriedade dos estados.", "são bens da União."), ("terras sem proteção especial.", "têm proteção constitucional.")],
  ["O art. 231 trata dos direitos indígenas.", "As terras são bens da União.", "Os povos têm posse permanente e usufruto exclusivo."], "Terra indígena: bem da União, posse dos povos.", "Terras indígenas.")
Q(SO, "Os seringueiros acreanos são, em grande parte, descendentes:", "de migrantes nordestinos que vieram para os seringais.",
  [("de imigrantes japoneses.", "não é a origem principal."), ("de colonos alemães do sul do Brasil.", "não é a origem principal."), ("de povos africanos escravizados no Acre.", "não é a origem principal."), ("de bandeirantes paulistas.", "não é a origem.")],
  ["A borracha atraiu muita gente do Nordeste.", "Muitos migrantes se tornaram seringueiros.", "Seus descendentes vivem até hoje no Acre."], "Seringueiros: herança nordestina.", "Origem dos seringueiros.")
Q(SO, "A Reserva Extrativista (Resex) é uma unidade de conservação que:", "permite o uso sustentável dos recursos naturais por populações tradicionais.",
  [("proíbe totalmente a presença humana.", "isso descreve uma proteção integral."), ("é destinada exclusivamente à agricultura mecanizada.", "não é esse o objetivo."), ("é propriedade particular sem restrições.", "é área protegida."), ("destina-se apenas à mineração.", "não é o objetivo.")],
  ["As Resex surgiram da luta dos seringueiros.", "Elas conciliam uso e conservação.", "As populações tradicionais usam os recursos de forma sustentável."], "Resex: uso sustentável.", "Conceito de Resex.")
Q(SO, "A Reserva Extrativista Chico Mendes foi criada para:", "proteger a floresta e garantir o modo de vida das populações extrativistas.",
  [("promover a expansão de grandes pastagens.", "o objetivo é a conservação."), ("construir uma cidade planejada.", "não é seu objetivo."), ("abrir áreas para mineração.", "não é seu objetivo."), ("transferir os seringueiros para outros estados.", "o objetivo é mantê-los na floresta.")],
  ["Ela homenageia o líder seringueiro.", "Foi criada após sua morte, em 1990.", "Visa proteger a floresta e o modo de vida extrativista."], "Resex Chico Mendes: floresta e extrativistas.", "Objetivo da Resex Chico Mendes.")
Q(SO, "Uma característica da população do Acre é:", "a concentração da maior parte dos habitantes em áreas urbanas, sobretudo em Rio Branco.",
  [("a ausência de áreas urbanas.", "há cidades e a capital concentra grande parte da população."), ("a predominância absoluta de população indígena.", "a população indígena é minoritária."), ("a distribuição uniforme da população.", "há forte concentração em poucas cidades."), ("a inexistência de comunidades ribeirinhas.", "existem comunidades ribeirinhas.")],
  ["O Acre tem floresta extensa.", "Mesmo assim, a maioria da população vive em cidades.", "Rio Branco concentra grande parte dos habitantes."], "Acre urbano: Rio Branco concentra.", "Perfil da população.")
Q(SO, "O Estado do Acre é conhecido por abrigar:", "povos indígenas, seringueiros, ribeirinhos e população urbana, em uma sociedade multicultural.",
  [("apenas população urbana.", "há diversidade de grupos."), ("exclusivamente imigrantes europeus.", "não é o caso."), ("apenas comunidades indígenas.", "não é o caso."), ("somente empresas agropecuárias.", "não é o caso.")],
  ["A população tem várias origens e modos de vida.", "Reúne indígenas, seringueiros, ribeirinhos e habitantes urbanos.", "A sociedade é multicultural."], "Mosaico: indígenas, seringueiros, ribeirinhos, urbanos.", "Diversidade social do Acre.")
Q(SO, "Em relação ao transporte e ao acesso a serviços em áreas isoladas do Acre, é correto afirmar que:", "muitas comunidades dependem de rios e ramais, o que dificulta o acesso à saúde e à educação.",
  [("todas as comunidades são interligadas por ferrovias.", "o Acre não tem malha ferroviária."), ("todas as comunidades têm acesso por rodovias asfaltadas.", "há muitas áreas isoladas."), ("não há dificuldades de acesso.", "há dificuldades."), ("o transporte aéreo é a única opção em todo o estado.", "há transporte por rios e estradas.")],
  ["O Acre tem poucas rodovias e muitos rios.", "Em época de chuva, ramais ficam intransitáveis.", "Isso dificulta o acesso a serviços."], "Rios e ramais: acesso difícil.", "Acesso em áreas isoladas.")
Q(SO, "A Terra Indígena Kampa do Rio Amônia, no Acre, é habitada principalmente pelo povo:", "Ashaninka.",
  [("Yanomami.", "vive em Roraima e no Amazonas."), ("Guarani.", "vive no sul e sudeste."), ("Xavante.", "vive em Mato Grosso."), ("Kayapó.", "vive no Pará e Mato Grosso.")],
  ["A terra fica no oeste do Acre.", "É de um povo de língua aruaque.", "Os Ashaninka vivem ali."], "Kampa do Rio Amônia: Ashaninka.", "Povo da Terra Indígena Kampa do Rio Amônia.")
# ---- Economia (8)
Q(EC, "Entre os produtos do extrativismo vegetal importantes para a economia do Acre, destaca-se:", "a castanha-do-brasil.",
  [("o café.", "é cultivado em outras regiões."), ("a uva.", "é típica do sul."), ("o trigo.", "é típico do sul."), ("a cana-de-açúcar em grande escala.", "não é o destaque do extrativismo acreano.")],
  ["Extrativismo é a coleta de produtos da floresta.", "A castanha-do-brasil é um dos principais produtos.", "Também a borracha e o açaí."], "Castanha, borracha, açaí.", "Extrativismo no Acre.")
Q(EC, "A atividade agropecuária que ocupa a maior área no Acre é:", "a pecuária bovina.",
  [("a cultura de trigo.", "não é típica do Acre."), ("a produção de soja em larga escala.", "é pouco expressiva."), ("a cultura de uva.", "não é típica."), ("a pesca industrial marítima.", "o Acre não tem litoral.")],
  ["O Acre não tem litoral nem clima para trigo e uva.", "A pecuária bovina é a atividade de maior área.", "Também há agricultura de subsistência."], "Pecuária bovina domina a área agropecuária.", "Principal atividade agropecuária.")
Q(EC, "A Rodovia Interoceânica, que passa pelo Acre, tem importância porque:", "liga o Brasil aos portos do Pacífico, passando pelo Peru.",
  [("liga o Acre diretamente ao Oceano Atlântico.", "o Atlântico fica no extremo oposto do país."), ("liga o Acre ao Polo Norte.", "não tem sentido."), ("é uma ferrovia de alta velocidade.", "é uma rodovia."), ("liga apenas Rio Branco a Cruzeiro do Sul.", "ela liga o Acre ao Peru.")],
  ["O Acre fica no extremo oeste do Brasil.", "A estrada atravessa a fronteira com o Peru.", "Isso dá acesso aos portos do Pacífico."], "Interoceânica: caminho ao Pacífico.", "Importância da Interoceânica.")
Q(EC, "A Zona de Processamento de Exportação (ZPE) do Acre está localizada no município de:", "Senador Guiomard.",
  [("Cruzeiro do Sul.", "fica no oeste."), ("Assis Brasil.", "fica na tríplice fronteira."), ("Tarauacá.", "fica no oeste."), ("Feijó.", "fica no interior.")],
  ["A ZPE fica na região de Rio Branco.", "Está no município vizinho, na BR-364.", "É Senador Guiomard."], "ZPE: Senador Guiomard.", "Localização da ZPE.")
Q(EC, "O setor que mais emprega e contribui para o PIB do Acre, sobretudo em Rio Branco, é o de:", "serviços e administração pública.",
  [("indústria pesada.", "a indústria é pequena no estado."), ("mineração em larga escala.", "não é o setor principal."), ("pesca marítima.", "o Acre não tem mar."), ("exportação de petróleo.", "não é produtor de petróleo em larga escala.")],
  ["A economia acreana é pouco industrializada.", "O setor público e os serviços têm grande peso.", "Isso é visível na capital."], "Acre: serviços e setor público pesam.", "Setor principal da economia.")
Q(EC, "O manejo florestal sustentável tem como proposta:", "explorar produtos da floresta, como madeira, de modo planejado, mantendo a floresta em pé.",
  [("derrubar toda a floresta para criar pastagens.", "é o oposto do manejo sustentável."), ("proibir qualquer uso da floresta.", "o manejo permite uso planejado."), ("queimar a floresta para plantio rápido.", "é prática predatória."), ("substituir a floresta por áreas urbanas.", "não é manejo.")],
  ["Manejo é uso planejado.", "A floresta continua existindo e se regenerando.", "Isso concilia economia e conservação."], "Manejo: usar sem destruir.", "Manejo florestal sustentável.")
Q(EC, "O comércio de fronteira entre o Acre e países vizinhos envolve principalmente:", "o Peru e a Bolívia.",
  [("o Uruguai e a Argentina.", "ficam longe do Acre."), ("a Venezuela e a Colômbia.", "ficam mais ao norte."), ("o Paraguai e o Chile.", "não fazem fronteira com o Acre."), ("a Guiana e o Suriname.", "ficam no norte do continente.")],
  ["O Acre faz fronteira com dois países.", "Peru e Bolívia.", "O comércio de fronteira ocorre com eles."], "Fronteira: Peru e Bolívia.", "Comércio de fronteira.")
Q(EC, "A bioeconomia, no contexto amazônico, consiste em:", "gerar renda a partir de produtos da floresta, de forma sustentável, valorizando o conhecimento tradicional.",
  [("derrubar a floresta para vender madeira sem controle.", "isso é exploração predatória."), ("importar todos os insumos de outros países.", "não é bioeconomia."), ("abandonar qualquer atividade econômica.", "a bioeconomia gera renda."), ("construir apenas rodovias.", "não é o conceito.")],
  ["Bioeconomia usa recursos biológicos.", "Valoriza produtos como castanha, açaí e óleos.", "Gera renda sem destruir a floresta."], "Bioeconomia: renda com floresta em pé.", "Conceito de bioeconomia.")
salvar()
