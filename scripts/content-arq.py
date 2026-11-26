#!/usr/bin/env python3
"""Arquivologia: teoria didática e 30 questões novas. python3 scripts/content-arq.py"""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from qlib import Q, teoria, salvar

teoria("arq_conc",
 """<p><b>Em uma frase:</b> arquivo é o conjunto de documentos produzidos ou recebidos por uma pessoa ou instituição no exercício de suas atividades, guardado por seu valor como prova ou informação.</p>
<div class="exemplo"><b>Analogia:</b> é a memória da instituição: cada documento prova o que ela fez, decidiu ou recebeu.</div>
<h3>Conceitos</h3>
<ul><li><b>Documento:</b> informação registrada em um suporte (papel, digital, filme). <b>Documento de arquivo</b> é o produzido ou recebido no curso de uma atividade.</li><li><b>Arquivo (a instituição ou o conjunto):</b> pode ser público ou privado.</li><li><b>Gênero:</b> forma de registro (textual, iconográfico, sonoro, audiovisual). <b>Espécie:</b> configuração da informação (ofício, ata, relatório). <b>Tipo documental:</b> espécie + atividade (relatório de fiscalização).</li></ul>
<h3>Princípios arquivísticos</h3>
<ul><li><b>Proveniência (respeito aos fundos):</b> os documentos de uma origem não se misturam com os de outra.</li><li><b>Organicidade:</b> o arquivo reflete a estrutura e as funções do produtor.</li><li><b>Unicidade:</b> cada documento é único no contexto em que foi produzido.</li><li><b>Indivisibilidade (integridade):</b> o fundo não deve ser dividido.</li><li><b>Cumulatividade:</b> o arquivo se forma de modo contínuo e progressivo.</li></ul>
<h3>Funções arquivísticas</h3>
<ul><li>Produção, classificação, avaliação, aquisição, conservação, descrição e difusão.</li></ul>
<h3>Teste rápido</h3><p>O princípio que impede misturar documentos de produtores diferentes é: <b>Resposta:</b> proveniência (respeito aos fundos).</p>""",
 "A Delegacia A e a Delegacia B enviam documentos ao mesmo arquivo central. Podem ser misturados por assunto? Passo 1: pelo princípio da <b>proveniência</b>, documentos de produtores diferentes não se misturam. Passo 2: mantêm-se dois <b>fundos</b> separados. Passo 3: dentro de cada fundo, organiza-se por assunto, número ou data, conforme a classificação adotada.",
 "(1) O documento é registro de uma atividade? Então é documento de arquivo. (2) Produtores diferentes: fundos diferentes. (3) Espécie: o formato (ofício, ata); tipo: espécie + atividade.",
 "Proveniência: cada produtor tem seu fundo. Espécie é o formato; tipo é espécie + atividade.")
teoria("arq_ciclo",
 """<p><b>Em uma frase:</b> a teoria das três idades diz que o documento passa por três fases: corrente, intermediária e permanente, conforme o uso e o valor.</p>
<div class="exemplo"><b>Analogia:</b> é como as fases da vida: o documento nasce e é muito usado (jovem), depois é consultado raramente (maturidade) e, se tiver valor histórico, é preservado para sempre (memória).</div>
<h3>As três idades</h3>
<ul><li><b>Corrente:</b> uso frequente, guarda no setor produtor, valor <b>primário</b> (administrativo, legal, fiscal).</li><li><b>Intermediária:</b> uso eventual, aguarda o prazo de guarda, em depósito ou central, ainda com valor primário.</li><li><b>Permanente:</b> valor <b>secundário</b> (histórico, probatório, informativo); guarda definitiva, em instituição arquivística.</li></ul>
<h3>Avaliação e destinação</h3>
<ul><li>A <b>avaliação</b> define o prazo de guarda e a destinação: <b>guarda permanente</b> ou <b>eliminação</b>.</li><li>A <b>tabela de temporalidade</b> registra, por tipo documental, os prazos nas fases corrente e intermediária e a destinação final.</li><li><b>Transferência:</b> do corrente para o intermediário. <b>Recolhimento:</b> do intermediário para o permanente.</li><li>A eliminação exige <b>autorização</b> e <b>registro</b>; não se elimina por conta própria.</li></ul>
<h3>Teste rápido</h3><p>Qual idade guarda documentos de valor histórico? <b>Resposta:</b> permanente.</p>""",
 "Um processo concluído há 3 anos tem prazo de 5 anos na fase corrente e 10 na intermediária, com destinação final de guarda permanente. Em que fase está? Passo 1: concluído há 3 anos: ainda está dentro dos 5 anos da fase <b>corrente</b>. Passo 2: aos 5 anos, será <b>transferido</b> ao arquivo intermediário. Passo 3: após mais 10 anos, será <b>recolhido</b> ao arquivo permanente.",
 "(1) Uso frequente no setor: corrente. (2) Uso eventual e aguardando prazo: intermediário. (3) Valor histórico, guarda definitiva: permanente. (4) A tabela de temporalidade define o destino.",
 "Transferência: corrente → intermediário. Recolhimento: intermediário → permanente.")
teoria("arq_desc",
 """<p><b>Em uma frase:</b> classificar organiza os documentos por função e atividade; avaliar decide o prazo de guarda; descrever cria instrumentos para localizá-los.</p>
<div class="exemplo"><b>Analogia:</b> classificar é montar as prateleiras; avaliar é decidir o que fica e por quanto tempo; descrever é fazer o catálogo.</div>
<h3>Classificação</h3>
<ul><li>Organiza o acervo pelas <b>funções e atividades</b> do produtor, com um <b>plano (ou código) de classificação</b>.</li><li>Em geral é <b>hierárquica</b>: classe, subclasse, grupo, subgrupo.</li></ul>
<h3>Avaliação</h3>
<ul><li>Define o <b>valor</b> dos documentos e os <b>prazos de guarda</b>, registrados na <b>tabela de temporalidade</b>. Resultado: guarda permanente ou eliminação.</li></ul>
<h3>Descrição</h3>
<ul><li>Cria instrumentos de pesquisa: guia, inventário, catálogo, índice.</li><li><b>NOBRADE:</b> Norma Brasileira de Descrição Arquivística. Baseia-se na ISAD(G) internacional.</li></ul>
<h3>SIGAD</h3>
<ul><li><b>Sistema Informatizado de Gestão Arquivística de Documentos:</b> controla o ciclo de vida de documentos digitais e convencionais (classificação, tramitação, temporalidade). O padrão de requisitos é o <b>e-ARQ Brasil</b>.</li></ul>
<h3>Microfilmagem</h3>
<ul><li>Reprodução de documentos em microfilme, para <b>preservação e redução de espaço</b>.</li></ul>
<h3>Teste rápido</h3><p>Norma brasileira de descrição arquivística: <b>Resposta:</b> NOBRADE.</p>""",
 "Você precisa organizar os documentos de uma delegacia. Passo 1 (<b>classificar</b>): agrupe por função e atividade conforme o plano de classificação. Passo 2 (<b>avaliar</b>): consulte a tabela de temporalidade para ver quanto tempo guardar cada tipo. Passo 3 (<b>descrever</b>): registre o acervo conforme a NOBRADE, produzindo inventário e índice.",
 "(1) Organizar por função: classificação. (2) Definir quanto guardar: avaliação. (3) Criar instrumentos de busca: descrição (NOBRADE). (4) Sistema que controla tudo digitalmente: SIGAD.",
 "Classificar organiza; avaliar decide a guarda; descrever cria o catálogo.")
teoria("arq_info",
 """<p><b>Em uma frase:</b> gestão da informação arquivística trata de organizar o acesso e proteger o sigilo, equilibrando transparência e segurança.</p>
<div class="exemplo"><b>Analogia:</b> é a portaria do arquivo: a regra é abrir, e o sigilo é a exceção, com motivo e prazo.</div>
<h3>Acesso à informação (Lei nº 12.527/2011, LAI)</h3>
<ul><li>A <b>publicidade é a regra</b> e o <b>sigilo é a exceção</b>.</li><li>O cidadão pode pedir informações a órgãos públicos <b>sem justificar o motivo</b>.</li><li>Informações classificadas como sigilosas por grau: <b>ultrassecreta</b> (prazo máximo de 25 anos), <b>secreta</b> (15 anos) e <b>reservada</b> (5 anos).</li><li>Informações pessoais têm restrição de acesso por 100 anos, em regra.</li></ul>
<h3>Proteção</h3>
<ul><li>Controle de acesso, registro de consultas, cópias autorizadas, cuidado com a cadeia de custódia.</li><li>Documento sigiloso: <b>marcação do grau</b>, tramitação controlada e armazenamento seguro.</li></ul>
<h3>Compartilhamento</h3>
<ul><li>Compartilhar informações entre órgãos exige base legal, finalidade definida e controle.</li></ul>
<h3>Teste rápido</h3><p>Prazo máximo de sigilo da informação ultrassecreta? <b>Resposta:</b> 25 anos.</p>""",
 "Um cidadão pede cópia de um contrato público. Passo 1: a regra é a <b>publicidade</b>. Passo 2: ele <b>não precisa justificar</b> o pedido. Passo 3: o órgão só nega se houver sigilo legal, com fundamento. Passo 4: se a informação for classificada, deve haver ato de classificação com grau e prazo.",
 "(1) Regra: acesso. Exceção: sigilo. (2) Sigilo tem grau e prazo (25, 15 e 5 anos). (3) Informação pessoal: restrição de acesso. (4) Documento sigiloso: controle de acesso e registro.",
 "Publicidade é a regra, sigilo é exceção. Prazos: 25, 15 e 5 anos.")
teoria("arq_gest",
 """<p><b>Em uma frase:</b> gestão documental é o conjunto de procedimentos para produzir, tramitar, usar, classificar, arquivar e eliminar documentos, de forma racional.</p>
<div class="exemplo"><b>Analogia:</b> é o fluxo de uma caixa de entrada bem cuidada: cada documento chega, é registrado, segue para quem deve, é guardado e, no tempo certo, é descartado ou preservado.</div>
<h3>Protocolo</h3>
<ul><li>Recebe, registra, classifica, distribui e controla a <b>tramitação</b> dos documentos. O registro dá um <b>número</b> e permite localizar.</li></ul>
<h3>Arquivamento</h3>
<ul><li><b>Métodos básicos:</b> alfabético, numérico, geográfico, por assunto, cronológico.</li><li><b>Alfabético:</b> por nome, em ordem alfabética. <b>Numérico:</b> por número de registro. <b>Geográfico:</b> por local. <b>Assunto:</b> por tema.</li></ul>
<h3>Documento original e cópia</h3>
<ul><li>Ao arquivar, preserve a <b>ordem original</b>: é ela que mostra o contexto.</li></ul>
<h3>Temporalidade</h3>
<ul><li>A tabela de temporalidade define prazos e destinação. Sem ela, documentos acumulam ou são descartados sem critério.</li></ul>
<h3>Teste rápido</h3><p>Qual método organiza por local de origem? <b>Resposta:</b> geográfico.</p>""",
 "Um ofício chega à delegacia. Passo 1: o <b>protocolo</b> registra, dá número e classifica. Passo 2: é <b>tramitado</b> ao setor responsável. Passo 3: após a resposta, é <b>arquivado</b> conforme o método (por assunto, por exemplo). Passo 4: a tabela de temporalidade define quando será eliminado ou recolhido.",
 "(1) Entrada: protocolo. (2) Rota: tramitação. (3) Guarda: método de arquivamento. (4) Destino final: tabela de temporalidade.",
 "Protocolo registra e tramita; temporalidade decide o fim.")
teoria("arq_dig",
 """<p><b>Em uma frase:</b> documento digital é o produzido ou convertido em formato eletrônico; seu valor de prova depende de autenticidade, integridade e preservação.</p>
<div class="exemplo"><b>Analogia:</b> é o mesmo documento, em outro suporte: precisa de selo de autenticidade e de cuidados com o 'envelhecimento' do formato.</div>
<h3>Conceitos</h3>
<ul><li><b>Nato digital:</b> já nasce digital. <b>Digitalizado:</b> convertido do papel para o digital.</li><li><b>Digitalização:</b> gera uma <b>representação digital</b>; observe resolução, formato adequado (ex.: PDF/A para preservação) e metadados.</li></ul>
<h3>Atributos do documento arquivístico digital</h3>
<ul><li><b>Autenticidade:</b> é o que diz ser. <b>Integridade:</b> não foi alterado. <b>Confiabilidade</b> e <b>acessibilidade</b> ao longo do tempo.</li><li>Ferramentas: <b>assinatura digital</b>, <b>hash</b>, <b>carimbo de tempo</b>.</li></ul>
<h3>Metadados e controle de versões</h3>
<ul><li><b>Metadados:</b> dados sobre o documento (autor, data, tipo). Essenciais para localizar e comprovar a origem.</li><li><b>Controle de versões:</b> registra as alterações sucessivas de um documento.</li></ul>
<h3>Desafios</h3>
<ul><li><b>Obsolescência</b> de formatos e equipamentos; por isso, <b>migração</b> de formatos e backups.</li></ul>
<h3>Teste rápido</h3><p>Formato indicado para preservação de longo prazo: <b>Resposta:</b> PDF/A.</p>""",
 "A delegacia digitaliza processos antigos. Passo 1: use resolução adequada e formato de preservação (PDF/A). Passo 2: registre <b>metadados</b> (tipo, data, responsável). Passo 3: aplique <b>assinatura digital</b> e carimbo de tempo para garantir autenticidade e integridade. Passo 4: guarde cópias de segurança e planeje a <b>migração</b> de formatos.",
 "(1) Autenticidade e integridade: assinatura digital e hash. (2) Localizar e provar origem: metadados. (3) Preservar: PDF/A, backups e migração.",
 "Digitalizar não basta: é preciso metadados, autenticidade e preservação.")
teoria("arq_pres",
 """<p><b>Em uma frase:</b> preservar é prevenir a deterioração dos documentos; conservar é aplicar medidas para manter o suporte em bom estado.</p>
<div class="exemplo"><b>Analogia:</b> é cuidar da saúde do acervo: ambiente saudável, higiene e acompanhamento.</div>
<h3>Agentes de deterioração</h3>
<ul><li><b>Físicos:</b> luz, calor, umidade excessiva. <b>Químicos:</b> acidez do papel e poluição. <b>Biológicos:</b> fungos, insetos (traças, cupins) e roedores. <b>Humanos:</b> manuseio inadequado, vandalismo.</li><li><b>Catástrofes:</b> incêndio, inundação.</li></ul>
<h3>Medidas</h3>
<ul><li><b>Ambiente:</b> temperatura e umidade controladas e estáveis, pouca luz, ventilação e limpeza.</li><li><b>Acondicionamento:</b> caixas e pastas de material neutro (livres de ácido); evitar clipes metálicos e fitas adesivas.</li><li><b>Manuseio:</b> mãos limpas, sem comer ou beber perto do acervo.</li><li><b>Plano de contingência:</b> contra incêndio e inundação.</li></ul>
<h3>Restauro × conservação</h3>
<ul><li><b>Conservação preventiva:</b> evita danos. <b>Restauração:</b> recupera o que já se danificou, com técnicas reversíveis.</li></ul>
<h3>Reprodução</h3>
<ul><li>Cópias (digitais ou em microfilme) reduzem o manuseio do original.</li></ul>
<h3>Teste rápido</h3><p>Fungos e insetos são agentes de deterioração de que tipo? <b>Resposta:</b> biológicos.</p>""",
 "Um acervo mostra manchas de mofo e papéis ressecados. Passo 1: identifique os <b>agentes</b>: umidade (mofo) e luz ou calor (ressecamento). Passo 2: controle a <b>umidade</b> e a <b>temperatura</b>, e reduza a luz. Passo 3: faça a <b>higienização</b> e troque o acondicionamento por material livre de ácido. Passo 4: digitalize os mais frágeis para reduzir o manuseio.",
 "(1) Identifique o agente (físico, químico, biológico, humano). (2) Corrija o ambiente. (3) Acondicione corretamente. (4) Reduza o manuseio com cópias.",
 "Prevenir é melhor que restaurar: controle de ambiente e manuseio.")

D, C, I, K, G, Dg, P = "arq_desc", "arq_ciclo", "arq_info", "arq_conc", "arq_gest", "arq_dig", "arq_pres"
# ---- Descrição, classificação e avaliação (7)
Q(D, "Na arquivística, a classificação dos documentos tem por finalidade:", "organizar os documentos de acordo com as funções e atividades do órgão que os produziu.",
  [("definir o prazo de guarda de cada documento.", "isso é a avaliação."), ("eliminar documentos sem valor.", "isso é eliminação, após avaliação."), ("descrever o acervo para pesquisadores.", "isso é a descrição."), ("digitalizar os documentos.", "isso é a reprodução digital.")],
  ["Classificar é organizar o acervo.", "O critério é o das funções e atividades do produtor.", "O instrumento é o plano de classificação."], "Classificação: por função e atividade.", "Finalidade da classificação.")
Q(D, "A tabela de temporalidade documental serve para:", "definir os prazos de guarda e a destinação final dos documentos.",
  [("indicar o local geográfico de cada arquivo.", "não é sua função."), ("substituir o plano de classificação.", "são instrumentos distintos."), ("registrar a tramitação diária dos processos.", "isso é função do protocolo."), ("descrever o conteúdo dos documentos.", "isso é a descrição.")],
  ["Ela vem da avaliação.", "Indica por quanto tempo guardar nas fases corrente e intermediária.", "Define a destinação final: guarda permanente ou eliminação."], "Temporalidade = prazos e destino.", "Função da tabela de temporalidade.")
Q(D, "A Norma Brasileira de Descrição Arquivística (NOBRADE) tem por objetivo:", "padronizar a descrição de documentos arquivísticos, facilitando o acesso e o intercâmbio de informações.",
  [("estabelecer prazos de guarda.", "isso é a tabela de temporalidade."), ("definir sistemas de gestão de documentos digitais.", "isso se relaciona ao SIGAD e ao e-ARQ."), ("regulamentar a digitalização de acervos.", "não é seu objeto."), ("proibir o acesso a documentos sigilosos.", "não é seu objeto.")],
  ["Descrever é criar instrumentos de pesquisa.", "A NOBRADE padroniza essa descrição no Brasil.", "Baseia-se na norma internacional ISAD(G)."], "NOBRADE = padrão de descrição.", "Objetivo da NOBRADE.")
Q(D, "O SIGAD (Sistema Informatizado de Gestão Arquivística de Documentos) caracteriza-se por:", "controlar o ciclo de vida de documentos, aplicando classificação, tramitação e tabela de temporalidade.",
  [("armazenar apenas imagens digitalizadas, sem controle.", "isso seria um repositório simples, sem gestão arquivística."), ("ser um programa de planilhas.", "não é esse o conceito."), ("substituir a necessidade de avaliação.", "não substitui."), ("eliminar documentos automaticamente, sem critério.", "a eliminação segue a temporalidade, com autorização.")],
  ["O SIGAD aplica a gestão arquivística em ambiente informatizado.", "Cuida de classificação, tramitação e temporalidade.", "Segue requisitos como os do e-ARQ Brasil."], "SIGAD gere o ciclo de vida de documentos.", "Conceito de SIGAD.")
Q(D, "A avaliação documental resulta, entre outros, em:", "definir quais documentos serão guardados permanentemente e quais poderão ser eliminados.",
  [("criar o catálogo do acervo.", "isso é a descrição."), ("organizar as pastas por assunto.", "isso é a classificação."), ("digitalizar todos os documentos.", "não é resultado da avaliação."), ("transferir documentos para outro setor.", "é uma etapa de destinação, após a avaliação.")],
  ["Avaliar é julgar o valor dos documentos.", "Isso define prazos e destino.", "Guarda permanente ou eliminação."], "Avaliação: valor e destino.", "Resultado da avaliação.")
Q(D, "A microfilmagem de documentos tem como principais finalidades:", "preservar os documentos e reduzir o espaço físico ocupado.",
  [("aumentar o espaço ocupado pelo acervo.", "o objetivo é reduzir."), ("substituir a necessidade de classificação.", "não substitui."), ("autorizar a eliminação imediata de todos os documentos.", "a eliminação segue critérios legais."), ("impedir qualquer consulta.", "o objetivo é facilitar a consulta.")],
  ["Microfilme é reprodução em escala reduzida.", "Permite guardar muita informação em pouco espaço.", "Também protege o original do manuseio."], "Microfilme: preservar e economizar espaço.", "Finalidade da microfilmagem.")
Q(D, "Em um plano de classificação, os documentos são agrupados em classes, subclasses e grupos. Esse tipo de organização é denominado:", "hierárquica.",
  [("aleatória.", "não segue critério."), ("cronológica apenas.", "a hierarquia se baseia nas funções."), ("alfabética simples.", "o plano usa níveis hierárquicos."), ("numérica sequencial.", "o plano usa níveis de classes.")],
  ["Das funções gerais às atividades específicas.", "Classe, subclasse, grupo e subgrupo.", "Isso é uma estrutura hierárquica."], "Plano de classificação: hierárquico.", "Estrutura do plano de classificação.")
# ---- Ciclo de vida (5)
Q(C, "Segundo a teoria das três idades, os documentos de uso frequente, mantidos no setor que os produziu, estão na fase:", "corrente.",
  [("intermediária.", "uso eventual."), ("permanente.", "valor histórico e guarda definitiva."), ("inativa.", "não é uma das três idades."), ("ocasional.", "não é uma das três idades.")],
  ["As três idades: corrente, intermediária e permanente.", "Uso frequente e no setor de origem: corrente.", "Resposta: fase corrente."], "Corrente = uso frequente, no setor.", "Idade corrente.")
Q(C, "O arquivo permanente é aquele que reúne documentos:", "com valor histórico, probatório ou informativo, de guarda definitiva.",
  [("de uso frequente no setor produtor.", "isso é o corrente."), ("à espera do prazo de eliminação.", "documentos com destinação de eliminação não são permanentes."), ("duplicados e sem valor.", "são candidatos à eliminação."), ("que ainda dependem de decisão administrativa.", "estão na fase corrente.")],
  ["O valor passou de primário (administrativo) para secundário (histórico e informativo).", "Esses documentos são guardados definitivamente.", "Ficam em instituições arquivísticas."], "Permanente: valor secundário.", "Arquivo permanente.")
Q(C, "A passagem dos documentos do arquivo corrente para o arquivo intermediário é chamada de:", "transferência.",
  [("recolhimento.", "é a passagem do intermediário para o permanente."), ("eliminação.", "é a destruição autorizada."), ("digitalização.", "é a conversão para formato digital."), ("migração.", "é a mudança de formato digital.")],
  ["Do corrente para o intermediário: transferência.", "Do intermediário para o permanente: recolhimento.", "Resposta: transferência."], "Transferência: corrente → intermediário.", "Transferência de documentos.")
Q(C, "O recolhimento de documentos ao arquivo permanente ocorre:", "após o fim do prazo de guarda na fase intermediária, quando a destinação é a guarda permanente.",
  [("logo após a produção do documento.", "o documento começa na fase corrente."), ("sempre que o documento é consultado.", "a consulta não define o recolhimento."), ("somente quando o documento é duplicado.", "não é o critério."), ("apenas por decisão do chefe de setor, sem tabela.", "é conforme a temporalidade.")],
  ["A tabela de temporalidade define os prazos.", "Terminado o prazo no intermediário, a destinação é cumprida.", "Se é guarda permanente, ocorre o recolhimento."], "Recolhimento: intermediário → permanente.", "Momento do recolhimento.")
Q(C, "A eliminação de documentos públicos:", "deve seguir a tabela de temporalidade, com autorização e registro, e não pode ser feita por decisão isolada.",
  [("pode ser feita por qualquer servidor, quando quiser.", "exige procedimento e autorização."), ("é proibida em qualquer hipótese.", "é possível, nos termos da lei e da tabela."), ("independe de qualquer registro.", "deve ser registrada."), ("só ocorre com o consentimento de quem produziu o documento.", "segue a legislação e a tabela, não a vontade individual.")],
  ["Documentos públicos têm regime legal.", "A eliminação segue a tabela de temporalidade.", "Exige autorização e registro em listagem."], "Eliminar: tabela, autorização e registro.", "Regras de eliminação.")
# ---- Acesso e sigilo (5)
Q(I, "De acordo com a Lei de Acesso à Informação (Lei nº 12.527/2011), em relação ao acesso às informações públicas:", "a publicidade é a regra e o sigilo é a exceção.",
  [("o sigilo é a regra e a publicidade é a exceção.", "é o inverso do que a lei estabelece."), ("o acesso depende sempre de justificativa do solicitante.", "o solicitante não precisa justificar."), ("todas as informações são públicas, sem qualquer exceção.", "há hipóteses de sigilo previstas em lei."), ("somente servidores podem solicitar informações.", "qualquer pessoa pode solicitar.")],
  ["A lei é voltada à transparência.", "A regra é o acesso.", "O sigilo só ocorre nas hipóteses legais."], "LAI: acesso é a regra.", "Princípio da LAI.")
Q(I, "Segundo a Lei de Acesso à Informação, o prazo máximo de restrição de acesso de uma informação classificada como ultrassecreta é de:", "25 anos.",
  [("5 anos.", "é o prazo máximo da reservada."), ("15 anos.", "é o prazo máximo da secreta."), ("50 anos.", "não corresponde à lei."), ("100 anos.", "é o prazo de restrição das informações pessoais.")],
  ["Graus: ultrassecreta, secreta e reservada.", "Prazos máximos: 25, 15 e 5 anos.", "Ultrassecreta: 25 anos."], "25 – 15 – 5.", "Prazo da classificação ultrassecreta.")
Q(I, "Em relação à classificação do grau de sigilo, é correto afirmar que a informação secreta tem prazo máximo de restrição de:", "15 anos.",
  [("5 anos.", "é o da reservada."), ("25 anos.", "é o da ultrassecreta."), ("30 anos.", "não corresponde à lei."), ("10 anos.", "não corresponde à lei.")],
  ["Prazos máximos: ultrassecreta 25, secreta 15, reservada 5.", "A questão trata da secreta.", "Resposta: 15 anos."], "Secreta: 15 anos.", "Prazo da classificação secreta.")
Q(I, "A pessoa que solicita acesso a uma informação pública, nos termos da LAI:", "não precisa justificar o motivo do pedido.",
  [("deve comprovar interesse jurídico no tema.", "a lei dispensa a justificativa."), ("deve ser servidor público.", "qualquer interessado pode pedir."), ("deve pagar sempre taxa de acesso.", "o acesso é gratuito, salvo custos de reprodução."), ("deve aguardar autorização do chefe do órgão.", "o procedimento é previsto em lei.")],
  ["A LAI facilita o acesso do cidadão.", "Não se exige justificativa.", "O pedido é feito ao órgão competente."], "Pedido de informação: sem justificar.", "Direito de pedir informações.")
Q(I, "O tratamento adequado de um documento classificado como sigiloso inclui:", "identificar o grau de sigilo, controlar o acesso e registrar a tramitação.",
  [("deixá-lo em local aberto, para facilitar a consulta.", "contraria o sigilo."), ("copiá-lo livremente para qualquer setor.", "a cópia exige autorização."), ("removê-lo do registro de tramitação.", "a tramitação deve ser controlada."), ("publicá-lo no site do órgão.", "contraria o sigilo.")],
  ["Documento sigiloso exige proteção.", "Marca-se o grau, controla-se o acesso e registra-se a tramitação.", "Isso garante rastreabilidade."], "Sigilo: marcar, controlar, registrar.", "Tratamento de documento sigiloso.")
# ---- Conceitos (2)
Q(K, "O princípio da proveniência (ou do respeito aos fundos) estabelece que:", "os documentos de um mesmo produtor não devem ser misturados com os de outro.",
  [("os documentos devem ser organizados apenas por assunto.", "o princípio trata da origem, não do assunto."), ("todos os documentos devem ficar em um único arquivo geral.", "contraria o princípio."), ("os documentos devem ser eliminados após cinco anos.", "o princípio não trata de prazos."), ("os documentos duplicados devem ser unidos.", "não trata de duplicidade.")],
  ["Proveniência significa origem.", "Documentos de produtores diferentes formam fundos diferentes.", "Eles não se misturam."], "Proveniência: cada produtor, um fundo.", "Princípio da proveniência.")
Q(K, "A espécie documental é:", "a configuração que assume um documento de acordo com a disposição e a natureza das informações (ofício, ata, relatório).",
  [("o suporte físico em que o documento é registrado.", "isso é o suporte."), ("o local onde o documento é guardado.", "isso é o arquivo."), ("a atividade que gerou o documento.", "isso compõe o tipo documental."), ("o prazo de guarda do documento.", "isso é a temporalidade.")],
  ["Espécie é o formato do documento.", "Exemplos: ofício, ata, relatório.", "Espécie + atividade = tipo documental."], "Espécie: formato; tipo: espécie + atividade.", "Conceito de espécie documental.")
# ---- Gestão documental (3)
Q(G, "O protocolo, em um órgão, é responsável por:", "receber, registrar, classificar, distribuir e controlar a tramitação dos documentos.",
  [("definir o prazo de guarda dos documentos.", "isso é feito pela avaliação."), ("eliminar documentos antigos.", "a eliminação segue a temporalidade."), ("descrever o acervo permanente.", "isso é função da descrição."), ("restaurar documentos danificados.", "isso é conservação ou restauro.")],
  ["O protocolo é a porta de entrada dos documentos.", "Ele registra e controla a tramitação.", "Dá número e permite localizar."], "Protocolo = registro e tramitação.", "Função do protocolo.")
Q(G, "O método de arquivamento em que os documentos são organizados em ordem alfabética pelo nome é o:", "alfabético.",
  [("numérico.", "por número de registro."), ("geográfico.", "por local."), ("cronológico.", "por data."), ("ideográfico.", "por assunto ou ideia.")],
  ["O critério é o nome em ordem alfabética.", "Esse é o método alfabético.", "Os demais usam outros critérios."], "Alfabético: pelo nome.", "Método de arquivamento.")
Q(G, "Ao arquivar documentos, deve-se preservar a ordem original, porque ela:", "revela o contexto de produção e o vínculo entre os documentos.",
  [("é sempre a ordem mais econômica.", "não é o critério."), ("elimina a necessidade de classificação.", "não elimina."), ("permite apagar os documentos duplicados.", "não tem essa função."), ("é exigida só para documentos digitais.", "vale para qualquer suporte.")],
  ["A ordem em que o produtor organizou os documentos mostra como ele trabalhava.", "Mudar essa ordem apaga o contexto.", "Por isso se preserva a ordem original."], "Ordem original = contexto.", "Princípio da ordem original.")
# ---- Documentos digitais (4)
Q(Dg, "Em um documento arquivístico digital, a integridade significa que:", "o documento não foi alterado de forma indevida desde que foi produzido.",
  [("o documento é muito leve.", "não tem relação com o tamanho do arquivo."), ("o documento é visível em qualquer aparelho.", "isso se relaciona à acessibilidade."), ("o documento foi escrito por vários autores.", "não é o conceito."), ("o documento foi impresso.", "não é o conceito.")],
  ["Integridade é a completude e a não alteração.", "Pode ser comprovada por hash e assinatura digital.", "Resposta: não foi alterado indevidamente."], "Integridade = não alterado.", "Conceito de integridade.")
Q(Dg, "Para o documento digital ser aceito como autêntico, é recomendável o uso de:", "assinatura digital e metadados que registrem sua origem.",
  [("compactação em arquivo .zip.", "reduz o tamanho, mas não prova autenticidade."), ("fonte de maior tamanho.", "não tem relação."), ("impressão colorida.", "não é recurso de autenticidade."), ("renomear o arquivo a cada acesso.", "mudar o nome prejudica o controle.")],
  ["Autenticidade é comprovar a origem.", "A assinatura digital e os metadados registram a origem e a autoria.", "O carimbo de tempo atesta quando foi feito."], "Assinatura digital + metadados.", "Garantias de autenticidade.")
Q(Dg, "A migração de formatos de arquivos digitais é uma estratégia de preservação que visa:", "evitar a obsolescência tecnológica, mantendo os documentos acessíveis.",
  [("destruir os documentos antigos.", "não é seu objetivo."), ("aumentar o tamanho dos arquivos.", "não é seu objetivo."), ("impedir qualquer cópia do documento.", "não é seu objetivo."), ("retirar os metadados dos arquivos.", "os metadados devem ser preservados.")],
  ["Formatos e equipamentos ficam obsoletos.", "A migração converte para formatos atuais.", "Assim os documentos continuam acessíveis."], "Migração evita obsolescência.", "Objetivo da migração de formatos.")
Q(Dg, "O controle de versões, em gestão de documentos digitais, tem como função:", "registrar as alterações sucessivas de um documento, permitindo identificar a versão vigente.",
  [("impedir toda e qualquer alteração.", "não impede; registra."), ("apagar as versões antigas automaticamente.", "o controle de versões mantém o histórico."), ("converter documentos para papel.", "não é sua função."), ("criptografar o conteúdo.", "criptografia é outro recurso.")],
  ["Documentos mudam ao longo do tempo.", "O controle de versões guarda o histórico de alterações.", "Mostra qual é a versão atual."], "Controle de versões: histórico e versão vigente.", "Função do controle de versões.")
# ---- Preservação e conservação (4)
Q(P, "Entre os agentes biológicos de deterioração de documentos em papel, incluem-se:", "fungos, insetos e roedores.",
  [("luz solar e calor.", "são agentes físicos."), ("acidez do papel.", "é agente químico."), ("manuseio inadequado.", "é agente humano."), ("incêndio e inundação.", "são catástrofes.")],
  ["Biológicos são seres vivos.", "Fungos, insetos e roedores atacam o papel.", "Os outros itens são agentes físicos, químicos ou humanos."], "Biológicos: fungos, insetos, roedores.", "Agentes biológicos de deterioração.")
Q(P, "Para a conservação de documentos em papel, o ambiente de guarda deve ter:", "temperatura e umidade controladas e estáveis, com pouca incidência de luz.",
  [("umidade alta, para evitar o ressecamento.", "umidade alta favorece fungos."), ("incidência direta de luz solar.", "a luz acelera a deterioração."), ("variações bruscas de temperatura.", "as oscilações danificam o papel."), ("ausência de limpeza, para não mexer nos documentos.", "a limpeza periódica é necessária.")],
  ["Calor, umidade e luz aceleram a deterioração.", "O ideal é um ambiente estável e controlado.", "Pouca luz e limpeza regular."], "Ambiente estável, fresco e seco.", "Condições de guarda.")
Q(P, "Na higienização e no acondicionamento de documentos, deve-se evitar:", "clipes metálicos e fitas adesivas, que danificam o papel.",
  [("caixas de material livre de ácido.", "são recomendadas."), ("pastas de papel neutro.", "são recomendadas."), ("limpeza com trincha macia.", "é técnica adequada."), ("mãos limpas ao manusear.", "é recomendação.")],
  ["Metais oxidam e marcam o papel.", "Fita adesiva deixa resíduos e mancha.", "Use materiais neutros."], "Evite clipes metálicos e fitas.", "Cuidados de acondicionamento.")
Q(P, "A diferença entre conservação preventiva e restauração é que:", "a conservação preventiva evita danos ao acervo; a restauração recupera o que já foi danificado.",
  [("a restauração evita danos; a conservação os recupera.", "inverte os conceitos."), ("as duas são exatamente a mesma coisa.", "são ações distintas."), ("a conservação só se aplica a documentos digitais.", "aplica-se a qualquer suporte."), ("a restauração dispensa técnicos especializados.", "exige profissionais capacitados.")],
  ["Conservação preventiva age antes do dano.", "Restauração age depois do dano.", "É preferível prevenir."], "Prevenir antes; restaurar depois.", "Conservação versus restauração.")
salvar()
