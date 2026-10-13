"""Article-specific restitution and asset safeguards, preserving historic-text warnings."""
import json,sys
from pathlib import Path
CPP='https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm'
CP='https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'
CF='https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm'
CPC='https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm'
STJ='https://scon.stj.jus.br/SCON/GetInteiroTeorDoAcordao?dt_publicacao=14%2F06%2F2024&num_registro=202303951093'
DP='https://processo.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisarumaedicao&livre=%270592%27.cod.'
rows={}
def add(n,s,p,a,c,v,q,t,d,links=()):
 rows['art-'+str(n)]=dict(simples=s,pontos=p,atencao=[a],exemplo=c+' Variação: '+v,prova=q,termos=[dict(termo=t,significado=d)],remissoes=[CPP,*links])
add(118,'Antes da decisão final definitiva, a coisa apreendida não será devolvida enquanto interessar ao processo.',
 ['O impedimento depende de interesse processual.', 'Não impõe espera obrigatória pelo trânsito para toda restituição.', 'Mesmo sem interesse probatório, conferir impedimentos e titularidade dos artigos seguintes.'],
 'Não ensinar que toda apreensão só termina depois do trânsito. A restituição antecipada pode ser cabível sem interesse e sem outro impedimento.',
 'Celular apreendido ainda precisa de exame pertinente: mantém-se a apreensão enquanto houver interesse processual.',
 'Perícia acabou e o bem lícito não interessa mais: examinar restituição, titularidade e outros obstáculos, sem espera automática.',
 ['Restituição antes do trânsito é sempre proibida? Não.', 'Interesse atual ao processo impede devolução? Sim.'], 'Interesse processual','Necessidade da coisa para os fins legítimos do processo.')
add(119,'Bens sujeitos ao regime legal de perda não são restituídos apenas porque a sentença transitou; preservar o direito do lesado e do terceiro de boa-fé.',
 ['Arts. 74 e 100 do CP são remissões históricas; integrar CP 91 e hipóteses legais atuais.', 'Nem todo objeto usado no delito é instrumento confiscável: conferir requisitos legais.', 'Lesado e terceiro de boa-fé têm ressalva expressa.'],
 'Não usar a atual numeração do CP 74/100 como se fosse a disciplina antiga de confisco, nem equiparar todo bem apreendido a coisa perdida.',
 'Bem sujeito a perda é reivindicado por terceiro que demonstra boa-fé: sua ressalva deve ser examinada.',
 'Propriedade do acusado e utilização no fato, por si, não substituem os requisitos legais de perda do instrumento.',
 ['Trânsito elimina todo impedimento de restituição? Não.', 'Direito do terceiro de boa-fé é ressalvado? Sim.'], 'Perdimento','Perda juridicamente decretada nos pressupostos legais, distinta da mera apreensão.',[CP])
add(120,'Restituição sem dúvida sobre o direito pode ser ordenada por polícia ou juiz; controvérsia ou posse de terceiro de boa-fé exige incidente judicial.',
 ['Dúvida: apartado, cinco dias para provar o direito; decisão apenas judicial.', 'Terceiro de boa-fé: cinco dias sucessivos de prova e dois dias para cada um arrazoar.', 'MP sempre ouvido; dúvida sobre dono leva ao cível com depósito.', 'Perecíveis: avaliação e leilão com depósito ou entrega a terceiro idôneo com responsabilidade.'],
 'A polícia não decide disputa de titularidade no rito reservado ao juiz. Perecibilidade não autoriza doação informal.',
 'Dono documentado pede bem lícito sem disputa: examinam-se cabimento e termo de restituição, ouvido MP.',
 'Terceiro de boa-fé disputa propriedade: incidente separado, prova e decisão judicial; dúvida de dono pode ir ao cível.',
 ['MP deve ser ouvido em todo pedido? Sim.', 'Polícia pode decidir o incidente de titularidade duvidosa? Não.'], 'Restituição litigiosa','Pedido com controvérsia de direito que exige decisão judicial.')
add(121,'Coisa adquirida com proventos da infração segue a disciplina de avaliação e venda do art. 133, integrada à redação atual.',
 ['Apreensão não equivale por si a perdimento definitivo.', 'Art. 133 atual tem §§1º e 2º: lesado, terceiro de boa-fé e destinação.', 'Não confundir provento do crime com bem lícito sem esse vínculo.'],
 'A referência singular a parágrafo é histórica; usar os parágrafos atuais e requisitos da venda.',
 'Imóvel adquirido com ganho do delito é submetido à disciplina patrimonial própria, preservados direitos de terceiros.',
 'Bem de origem lícita não vira provento apenas por pertencer ao investigado.',
 ['Todo patrimônio do investigado é provento? Não.', 'É preciso integrar art. 133 atual? Sim.'], 'Provento da infração','Vantagem patrimonial originada do delito ou convertida em bens.')
add(122,'A alienação das coisas apreendidas remete ao art. 133 sem prejudicar restituição do art. 120; redação atual resulta do Pacote Anticrime.',
 ['Lei 13.964/2019 alterou o caput.', 'Parágrafo único foi revogado.', 'Aplicar requisitos atuais do art. 133 e preservar restituição cabível.'],
 'Não ressuscitar o parágrafo revogado ou vender toda apreensão imediatamente sem o regime legal.',
 'Decretado perdimento após condenação definitiva, a venda segue art. 133.',
 'Bem cuja restituição é devida deve ser examinado pelo art. 120, não vendido só porque foi apreendido.',
 ['O parágrafo antigo continua ativo? Não.', 'O art. 120 é preservado? Sim.'], 'Alienação','Venda conforme pressupostos legais, diferente da simples constrição.')
add(123,'Fora das hipóteses anteriores, o texto prevê leilão se em 90 dias do trânsito final os objetos não forem reclamados ou não pertencerem ao réu, com saldo ao juízo de ausentes.',
 ['Prazo contado do trânsito da sentença final, condenatória ou absolutória.', 'Regra residual; conferir primeiro arts. 118–122.', 'Saldo depositado à disposição do juízo de ausentes.'],
 'Não contar os 90 dias da apreensão, nem aplicar automaticamente a bem com restituição devida ou destinação especial.',
 'Objeto residual não reclamado depois de 90 dias do trânsito é avaliado para o leilão legal, com saldo depositado.',
 'Uma semana após apreensão ainda não há termo inicial deste artigo, mesmo se o bem não foi reclamado.',
 ['O prazo começa na apreensão? Não; no trânsito final.', 'Pode haver sentença absolutória como termo inicial? Sim.'], 'Destinação residual','Tratamento dos objetos fora das hipóteses patrimoniais anteriores.')
add(124,'Instrumentos com perda decretada e coisas confiscadas têm inutilização ou recolhimento a museu criminal quando houver interesse de conservação, observadas normas atuais e especiais.',
 ['Exige perda ou confisco legal, não mera apreensão.', 'Remissão ao CP 100 é histórica; integrar regime atual de efeitos da condenação.', 'Obras e bens culturais têm hipótese especial no art. 124-A.'],
 'Não destruir automaticamente qualquer objeto usado em crime nem ignorar destinação especial vigente.',
 'Objeto ilicitamente destinado ao delito tem perdimento decretado; autoridade observa a destinação legal.',
 'Obra de valor cultural pode receber destinação do art. 124-A quando preenchidos seus pressupostos.',
 ['Apreensão equivale a perda decretada? Não.', 'Bens culturais exigem verificar art. 124-A? Sim.'], 'Destinação do instrumento','Tratamento posterior ao perdimento juridicamente determinado.',[CP])
add('124-a','Obra de arte ou bem cultural de relevante valor, com perdimento decretado e crime sem vítima determinada, pode ser destinado a museu público.',
 ['Incluído pela Lei 13.964/2019.', 'Relevante valor cultural ou artístico e ausência de vítima determinada.', 'Destinação é possibilidade, não transferência automática de toda obra apreendida.'],
 'Não afastar direito de vítima identificada apenas para enriquecer acervo público.',
 'Obra com perda decretada em delito sem vítima determinada pode ir a museu público.',
 'Obra furtada de vítima identificada exige preservar sua restituição, em vez de aplicar esta hipótese como regra geral.',
 ['Toda obra apreendida vai a museu público? Não.', 'A ausência de vítima determinada é requisito? Sim.'], 'Valor cultural','Relevância artística ou cultural que fundamenta a destinação especial.')
add(125,'Sequestro de imóvel adquirido com proventos do delito pode alcançar bem já transferido a terceiro, com as defesas legais preservadas.',
 ['Vínculo de aquisição com proventos da infração.', 'Transferência posterior não impede por si a medida.', 'Defesas dos arts. 129–130 e direitos de terceiro de boa-fé.'],
 'Não confundir sequestro de origem ilícita com hipoteca para garantir reparação sobre patrimônio lícito.',
 'Investigado compra imóvel com ganho criminoso e depois transfere-o: o bem ainda pode sofrer sequestro.',
 'Imóvel comprado com renda lícita não satisfaz automaticamente este fundamento; outra garantia tem requisitos próprios.',
 ['Transferência a terceiro bloqueia sempre sequestro? Não.', 'Sequestro e hipoteca possuem idêntico fundamento? Não.'], 'Sequestro patrimonial','Constrição de bem ligado a proventos ilícitos, no regime legal.')
add(126,'Indícios veementes de origem ilícita dos bens bastam ao pressuposto probatório do sequestro; não se exige condenação definitiva nessa fase.',
 ['Intensidade dos indícios deve ser fundamentada.', 'Não basta suspeita vaga sobre riqueza.', 'Cautelar não é declaração definitiva de culpabilidade.'],
 'Indícios veementes não equivalem a qualquer rumor nem eliminam defesa e controle da medida.',
 'Rastreio documental liga aquisição do imóvel ao ganho do delito e fundamenta a medida cautelar.',
 'Patrimônio elevado sem demonstração de proveniência ilícita não substitui o pressuposto.',
 ['Condenação definitiva é requisito desta fase? Não.', 'Rumor sem suporte equivale a indícios veementes? Não.'], 'Indícios veementes','Elementos robustos que sustentam a origem ilícita alegada.')
add(127,'O juiz ordena sequestro por provocação do MP, ofendido ou representação policial; o texto também conserva iniciativa de ofício, que deve ser integrada ao sistema acusatório.',
 ['Pode ocorrer antes da denúncia ou queixa e durante o processo.', 'Indícios veementes do art. 126 continuam exigidos.', 'Art. 3º-A e imparcialidade impedem transformar o juiz em investigador da acusação.'],
 'Não afirmar revogação textual inexistente, mas também não tratar de ofício como licença irrestrita para investigação judicial. Cabimento concreto exige integração constitucional.',
 'Polícia representa com indícios de compra ilícita; juiz fundamenta a decisão sobre o sequestro.',
 'Ausência de denúncia não impede a medida; ausência de indícios não é suprida pela vontade do juiz.',
 ['Pode ocorrer antes da denúncia? Sim.', 'A iniciativa elimina necessidade de indícios? Não.'], 'Representação patrimonial','Provocação policial para decisão judicial cautelar.',[CF])
add(128,'Realizado sequestro de imóvel, juiz determina inscrição no Registro de Imóveis para dar publicidade à constrição.',
 ['Inscrição após a realização do sequestro.', 'Não transfere propriedade ao Estado.', 'Distinguir publicidade registral de condenação ou perdimento.'],
 'Registro da medida não equivale a confisco definitivo.',
 'Após sequestrar imóvel, juiz ordena inscrição da constrição na matrícula.',
 'A inscrição não autoriza vender como bem já definitivamente público sem requisitos posteriores.',
 ['Inscrição transfere domínio ao Estado? Não.', 'É determinada pelo juiz? Sim.'], 'Publicidade registral','Registro da restrição para conhecimento jurídico de terceiros.')
add(129,'Sequestro tramita em apartado e admite embargos de terceiro, garantindo via de defesa patrimonial.',
 ['Autuação separada.', 'Terceiro pode defender direito próprio.', 'Art. 130 disciplina fundamentos específicos adicionais; não confundir todos os incidentes.'],
 'Ser terceiro não torna a constrição incontestável nem garante sua retirada automática.',
 'Proprietário alheio à acusação apresenta embargos para provar direito sobre o bem constrito.',
 'A apresentação, por si, não elimina sequestro sem exame dos fundamentos e provas.',
 ['Admite defesa de terceiro? Sim.', 'Embargos levantam medida automaticamente? Não.'], 'Embargos de terceiro','Instrumento de defesa de direito patrimonial de terceiro.')
add(130,'Acusado pode embargar negando aquisição com proventos; terceiro adquirente oneroso pode invocar boa-fé. O texto limita decisão nesses embargos ao trânsito da condenação.',
 ['Acusado: contestação da origem em proventos.', 'Terceiro: transferência onerosa e aquisição de boa-fé.', 'Parágrafo refere-se a esses embargos; distinguir outras vias e pedidos de levantamento.'],
 'Não converter a regra do parágrafo em impossibilidade de todo controle cautelar antes da condenação, nem confundir com qualquer embargo do art. 129.',
 'Acusado mostra origem lícita da compra; adquirente oneroso apresenta elementos de boa-fé em sua defesa.',
 'Pedido de levantamento por pressuposto cautelar inexistente exige análise própria, sem dizer que toda defesa deve esperar condenação.',
 ['Boa-fé e onerosidade são fundamentos do terceiro no inciso II? Sim.', 'O artigo elimina todo controle cautelar anterior? Não.'], 'Aquisição onerosa de boa-fé','Transferência mediante contraprestação sem conhecimento da origem ilícita alegada.')
add(131,'O texto prevê levantamento por falta de ação em 60 dias da diligência concluída, caução de terceiro ou absolvição/extinção definitivas, com integração jurisprudencial do prazo.',
 ['Sessenta dias da conclusão da diligência, não da simples notícia do crime.', 'STJ, AgRg Pet 16291, 14/6/2024: prazo não peremptório, avaliado no caso concreto.', 'Absolvição ou extinção exige trânsito; caução assegura efeitos legais, com remissão histórica integrada ao CP atual.'],
 'Nem levantamento mecânico no 61º dia, nem retenção indefinida sem fundamento. O precedente não dispensa exame concreto de duração e necessidade.',
 'Defesa pede levantamento após 60 dias; juiz examina conclusão da diligência, duração e fundamentos conforme o caso concreto.',
 'Absolvição definitiva enquadra a hipótese legal de levantamento, sem exigir declaração de inocência em novo processo.',
 ['Os 60 dias são peremptórios segundo o STJ citado? Não.', 'O prazo autoriza retenção sem limites e sem fundamento? Não.'], 'Levantamento','Retirada da constrição patrimonial nas hipóteses legais.',[STJ,CP])
add(132,'Móveis podem sofrer sequestro com indícios veementes se não couber a medida do capítulo de restituição das coisas apreendidas.',
 ['Aplica requisitos do art. 126.', 'Subsidiariedade perante o regime de apreensão/restituição indicado.', 'Distinguir móvel ilícito de garantia reparatória sobre móvel lícito.'],
 'Não sequestrar qualquer móvel só porque o acusado não tem imóvel: esse é outro fundamento, do arresto.',
 'Bem móvel adquirido com ganho ilícito tem suporte probatório e hipótese adequada ao sequestro.',
 'Móvel lícito arrestado para reparação segue art. 137, não vira produto do crime por ficção.',
 ['Exige condições do art. 126? Sim.', 'Ausência de imóvel basta para este sequestro? Não.'], 'Sequestro de móvel','Constrição móvel vinculada à origem ilícita e à subsidiariedade legal.')
add(133,'Depois de condenação definitiva e perdimento decretado, juiz determina avaliação e leilão; preserva lesado/terceiro de boa-fé e destina saldo ao FUNPEN, salvo lei especial.',
 ['Não basta trânsito sem decreto de perdimento do bem.', 'Iniciativa judicial, interessado ou MP.', 'Direitos do lesado e terceiro precedem recolhimento público; FUNPEN ressalva lei especial.'],
 'Não confundir essa venda definitiva com alienação antecipada para preservar valor do art. 144-A.',
 'Bem perdido por condenação definitiva é leiloado e valores devidos à vítima são separados antes do saldo público.',
 'Se não houve perdimento decretado, não aplicar a venda deste artigo apenas pela condenação da pessoa.',
 ['Todo saldo vai sempre ao FUNPEN sem exceção? Não; lei especial pode dispor diferente.', 'É preciso perdimento decretado? Sim.'], 'Leilão após perdimento','Venda definitiva do bem legalmente perdido após o trânsito.')
add('133-a','Uso público de bem constrito exige interesse público e autorização judicial; transferência definitiva depende de condenação final com perdimento e direitos ressalvados.',
 ['Abrange segurança do CF 144, prisional, socioeducativo, Força Nacional e perícia; investigador tem prioridade.', 'Outros órgãos públicos podem receber uso com interesse demonstrado.', 'Veículo, embarcação e aeronave: registro provisório; débitos anteriores continuam exigíveis do responsável.', 'Transferência final pode ocorrer após condenação e perdimento, resguardados lesado e terceiro de boa-fé.'],
 'Uso cautelar não é domínio definitivo, e isenção do órgão usuário não apaga multas e tributos anteriores do antigo responsável.',
 'Juiz autoriza veículo à polícia com interesse público e prioridade da unidade investigadora, em licenciamento provisório.',
 'Se ainda não houve condenação definitiva com perdimento, não registrar transferência definitiva por simples utilização.',
 ['Uso autorizado equivale a propriedade definitiva? Não.', 'Débitos anteriores deixam de ser cobrados do responsável? Não.'], 'Uso cautelar público','Utilização institucional autorizada de bem ainda submetido à constrição.',[CF])
add(134,'Hipoteca legal garante reparação sobre imóveis do indiciado, por pedido do ofendido, com certeza da infração e indícios suficientes de autoria.',
 ['Qualquer fase do processo, conforme o artigo.', 'Não exige origem ilícita do imóvel.', 'Certeza da infração e indícios suficientes de autoria são distintos.'],
 'Sequestro olha proventos ilícitos; hipoteca pode garantir reparação com patrimônio lícito. Não trocar os requisitos.',
 'Ofendido pede hipoteca de imóvel licitamente adquirido para assegurar futura reparação, demonstrando pressupostos.',
 'Origem lícita impede chamá-lo de provento, mas não afasta por si esta garantia reparatória.',
 ['Hipoteca exige compra com dinheiro do crime? Não.', 'Só suspeita vaga da existência da infração basta? Não.'], 'Hipoteca legal','Garantia imobiliária de responsabilidade civil, com requisitos próprios.')
add(135,'Especialização define o valor reparatório e os imóveis necessários à hipoteca, com prova, avaliação, manifestação das partes e possibilidade de caução suficiente.',
 ['Pedido estima responsabilidade, imóveis e domínio; juntar prova ou sua indicação e relação patrimonial.', 'Perito avalia onde não houver avaliador judicial; partes ouvidas em dois dias permitem correção.', 'Inscrever apenas imóveis necessários; liquidação definitiva após condenação, com possível novo arbitramento.', 'Caução suficiente em dinheiro ou dívida pública pela cotação pode dispensar inscrição.'],
 'Não hipotecar todo patrimônio sem proporção ao valor estimado nem tratar avaliação inicial como liquidação definitiva imutável.',
 'Dano estimado em R$ 30 mil leva à avaliação de garantia suficiente, ouvindo-se as partes em dois dias.',
 'Caução suficiente oferecida nos termos do §6º pode evitar inscrição, sem supor aceitação automática de qualquer bem.',
 ['Partes são ouvidas em dois dias? Sim.', 'Devem ser hipotecados todos os imóveis independentemente do necessário? Não.'], 'Especialização','Individualização da responsabilidade e da garantia imobiliária correspondente.')
add(136,'Arresto inicial de imóvel antecede a hipoteca, mas deve ser revogado se sua inscrição não for promovida em 15 dias.',
 ['Redação da Lei 11.435/2006.', 'Arresto preparatório imobiliário.', 'Quinze dias para promover o processo de inscrição, não para concluir toda reparação.'],
 'Não confundir os 15 dias com prazo geral do sequestro de proventos.',
 'Imóvel é arrestado de início e a parte promove em 15 dias o processo de inscrição hipotecária.',
 'Sem promoção nesse prazo, aplica-se a revogação prevista, em vez de manter garantia preparatória sem providência.',
 ['Prazo é de 15 dias? Sim.', 'Exige conclusão de toda a indenização em 15 dias? Não.'], 'Arresto preparatório','Constrição inicial destinada à posterior inscrição da hipoteca.')
add(137,'Sem imóveis ou com imóveis insuficientes, arresto reparatório pode alcançar móveis penhoráveis; fungíveis deterioráveis e rendas têm tratamento próprio.',
 ['Móveis devem ser suscetíveis de penhora.', 'Fungíveis facilmente deterioráveis seguem art. 120, §5º.', 'Juiz pode arbitrar recursos das rendas à manutenção do indiciado e família.'],
 'Insuficiência de imóveis não autoriza ignorar impenhorabilidade nem presumir que móveis são ilícitos.',
 'Patrimônio imobiliário insuficiente justifica examinar móveis penhoráveis para garantir reparação.',
 'Rendas do bem podem sustentar indiciado e família em valor arbitrado, não confiscado automaticamente.',
 ['Todo móvel é arrestável sem verificar penhora? Não.', 'Rendas podem manter família por arbitramento judicial? Sim.'], 'Arresto reparatório','Constrição de patrimônio para assegurar responsabilidade, distinta de sequestro de proventos.',[CPC])
add(138,'Especialização da hipoteca e arresto tramitam em autos apartados, pela redação de 2006.',
 ['Autuação separada do principal.', 'Abrange ambas as garantias.', 'Separação organizacional não encerra a persecução penal.'],
 'Não confundir autos apartados com independência total dos pressupostos penais da medida.',
 'Pedido de especialização recebe autuação própria para prova e avaliação da garantia.',
 'O processo principal continua seu rito; o apartado não equivale a absolvição ou julgamento da reparação.',
 ['Hipoteca e arresto vão em apartado? Sim.', 'A autuação encerra o principal? Não.'], 'Autuação patrimonial apartada','Organização separada dos procedimentos de garantia.')
add(139,'Depósito e administração do bem arrestado seguem regime do processo civil, integrado ao CPC vigente.',
 ['Distinguir administração e destinação definitiva.', 'Responsabilidade do depositário segue normas aplicáveis.', 'Remissão é ao regime civil atual, não licença para gestão informal.'],
 'Depositário não se torna dono nem pode usar livremente o patrimônio.',
 'Bem arrestado é mantido sob depósito e administração conforme as normas civis aplicáveis.',
 'O administrador não pode vender para si por conveniência; alienação exige hipótese e procedimento legais.',
 ['Depositário adquire propriedade? Não.', 'Administração segue regime civil? Sim.'], 'Depósito judicial','Custódia juridicamente regulada, sem transferência de domínio.',[CPC])
add(140,'Garantias alcançam reparação, despesas processuais e penas pecuniárias; reparação ao ofendido tem preferência sobre estas.',
 ['Não se destinam exclusivamente à multa.', 'Preferência da reparação do dano.', 'Distinguir credor vítima e destinação estatal.'],
 'Não pagar multa prioritariamente ignorando a preferência reparatória expressa.',
 'Garantia insuficiente para todas as obrigações exige observar primeiro a preferência legal da vítima.',
 'Ausência de dano não cria reparação fictícia, mas as demais obrigações seguem seu fundamento.',
 ['A multa tem preferência sobre reparação? Não.', 'Despesas processuais também são abrangidas? Sim.'], 'Preferência reparatória','Prioridade da indenização ao ofendido perante as obrigações indicadas.')
add(141,'Absolvição ou extinção da punibilidade por sentença irrecorrível leva ao levantamento do arresto ou cancelamento da hipoteca, no regime deste artigo.',
 ['Exige decisão definitiva.', 'Distinguir arresto/hipoteca do sequestro com disciplina própria.', 'A retirada da garantia penal não decide automaticamente toda ação civil autônoma.'],
 'Não presumir que qualquer decisão recorrível cancela imediatamente a garantia ou que extinção penal elimina toda responsabilidade civil.',
 'Sentença absolutória torna-se irrecorrível e determina-se levantamento do arresto legal.',
 'A responsabilidade civil eventualmente subsistente é examinada na via e com os requisitos próprios.',
 ['Sentença recorrível já preenche o requisito? Não.', 'Cancelamento decide necessariamente toda obrigação civil? Não.'], 'Cancelamento da garantia','Retirada da garantia nas hipóteses definitivas do artigo.')
add(142,'MP promove as garantias indicadas se houver interesse da Fazenda Pública ou pedido do ofendido pobre; esta última hipótese exige integração com Defensoria e atribuições atuais.',
 ['Medidas referidas: arts. 134 e 137.', 'Interesse fazendário é hipótese distinta.', 'Não usar pobreza para tornar MP advogado reparatório universal; integrar a leitura institucional do art. 68.'],
 'Verificar organização e atribuição da Defensoria na assistência ao ofendido, sem negar o texto nem generalizar a substituição ministerial.',
 'Há interesse da Fazenda na garantia patrimonial e MP provoca as medidas cabíveis.',
 'Ofendido vulnerável pede atuação: verificar assistência e atribuições institucionais, sem afastar Defensoria organizada.',
 ['Interesse da Fazenda também é hipótese? Sim.', 'Pobreza torna MP advogado civil universal? Não.'], 'Provocação ministerial patrimonial','Atuação do MP nas hipóteses e limites institucionais pertinentes.',[CF,DP])
add(143,'Condenação transitada remete os autos de hipoteca ou arresto ao juízo cível para o desdobramento reparatório, integrado ao art. 63.',
 ['Remessa depois do trânsito condenatório.', 'Garantia não substitui liquidação e execução pertinentes.', 'Distinguir de venda criminal de bem perdido do art. 133.'],
 'Não tratar toda hipoteca reparatória como perdimento em favor do Estado.',
 'Condenação definitiva leva o apartado hipotecário ao juiz cível para a reparação.',
 'Bem de origem lícita garantidor não vira confiscado apenas porque houve condenação.',
 ['Autos seguem ao cível depois do trânsito? Sim.', 'Hipoteca equivale a perda estatal? Não.'], 'Remessa reparatória','Encaminhamento das garantias à esfera civil após a condenação.')
add(144,'Interessados, ou MP nas hipóteses do art. 142, podem pedir no cível as garantias indicadas contra responsável civil.',
 ['Medidas dos arts. 134, 136 e 137.', 'Responsabilidade civil do terceiro exige fundamento legal próprio.', 'Não confundir responsável civil com acusado penal obrigatório.'],
 'Parentesco ou vínculo empregatício mencionado sem pressupostos civis não basta para constrição automática de terceiro.',
 'Vítima formula no cível pedido fundamentado de garantia contra quem responde civilmente pelo dano.',
 'Mero conhecido do acusado não se torna responsável patrimonial por proximidade.',
 ['Responsável civil precisa sempre ser acusado penal? Não.', 'A obrigação do terceiro exige fundamento? Sim.'], 'Responsável civil','Sujeito obrigado ao ressarcimento por fundamento civil próprio.')
add('144-a','Alienação antecipada preserva valor diante de deterioração, depreciação ou dificuldade de manutenção; não representa condenação antecipada.',
 ['Leilão preferencialmente eletrônico; primeira venda pela avaliação ou valor maior.', 'Segundo leilão em até dez dias; piso de 80% da avaliação.', 'Produto em conta vinculada até decisão final; observar condenação/absolvição e direitos próprios.', 'Numerário convertido em moeda nacional; títulos negociados pela cotação oficial do dia.', 'Arrematante de veículo/embarcação/aeronave não paga encargos anteriores; cobrança fiscal pode alcançar antigo dono.', '§7º vetado não contém regra material vigente.'],
 'Não confundir preservação do valor com perda definitiva nem apagar dívidas anteriores do responsável. Garantir direitos de lesado e terceiro conforme regime pertinente.',
 'Veículo se deprecia e custa manter: venda judicial preserva valor em depósito, sem declarar culpabilidade.',
 'Primeiro leilão fracassa: novo em até dez dias pode alcançar 80% da avaliação, nunca valor inferior por simples conveniência.',
 ['Segunda venda pode ser inferior a 80% por este artigo? Não.', 'Venda antecipada equivale a condenação? Não.'], 'Alienação antecipada','Conversão cautelar do bem em valor depositado para evitar perda econômica.')
assert len(rows)==30
Path(sys.argv[1]).write_text(json.dumps({'course_slug':'codigo-processo-penal','units':rows},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(len(rows),'asset units explicitly reviewed')
