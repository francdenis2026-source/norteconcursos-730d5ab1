"""Explicit individual decisions; searching or finding a URL never approves an item."""
import datetime
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'outputs/legal-review-378'
BASE = json.loads((OUT / 'baseline.json').read_text(encoding='utf-8'))
P = 'https://www.planalto.gov.br/ccivil_03/'
SOURCES = {
    'cf': ('Constituição Federal', P+'constituicao/constituicao.htm'),
    'cc': ('Código Civil', P+'leis/2002/l10406compilada.htm'),
    'cp': ('Código Penal', P+'decreto-lei/del2848compilado.htm'),
    'cpp': ('Código de Processo Penal', P+'decreto-lei/del3689compilado.htm'),
    'licitacoes': ('Lei 14.133/2021', P+'_ato2019-2022/2021/lei/l14133.htm'),
    'processoadm': ('Lei 9.784/1999', P+'leis/l9784.htm'),
    'servidores': ('Lei 8.112/1990', P+'leis/l8112cons.htm'),
    'estatais': ('Lei 13.303/2016', P+'_ato2015-2018/2016/lei/l13303.htm'),
    'lin': ('LINDB', P+'decreto-lei/del4657compilado.htm'),
    'linreg': ('Decreto 9.830/2019', P+'_ato2019-2022/2019/decreto/d9830.htm'),
    'pc': ('Lei 14.735/2023', P+'_ato2023-2026/2023/lei/l14735.htm'),
    'falencia': ('Lei 11.101/2005', P+'_ato2004-2006/2005/lei/l11101.htm'),
    'liberdade': ('Lei 13.874/2019', P+'_ato2019-2022/2019/lei/l13874.htm'),
    'mp': ('Lei Maria da Penha', P+'_ato2004-2006/2006/lei/l11340.htm'),
    'armas': ('Estatuto do Desarmamento', P+'leis/2003/l10.826.htm'),
    'drogas': ('Lei de Drogas', P+'_ato2004-2006/2006/lei/l11343.htm'),
    'abuso': ('Lei 13.869/2019', P+'_ato2019-2022/2019/lei/l13869.htm'),
    'tortura': ('Lei 9.455/1997', P+'leis/l9455.htm'),
    'henry': ('Lei Henry Borel', P+'_ato2019-2022/2022/lei/l14344.htm'),
    'org': ('Lei 12.850/2013', P+'_ato2011-2014/2013/lei/l12850.htm'),
    'lavagem': ('Lei 9.613/1998', P+'leis/l9613.htm'),
    'temporaria': ('Lei 7.960/1989', P+'leis/l7960.htm'),
    'ctn': ('Código Tributário Nacional', P+'leis/l5172compilado.htm'),
    'bancario': ('LC 105/2001', P+'leis/lcp/lcp105.htm'),
    'snuc': ('Lei 9.985/2000', P+'leis/l9985.htm'),
    'sisnama': ('Lei 6.938/1981', P+'leis/l6938.htm'),
    'multa': ('Decreto 6.514/2008', P+'_ato2007-2010/2008/decreto/d6514.htm'),
    'ride': ('Decreto 7.469/2011', P+'_ato2011-2014/2011/decreto/d7469.htm'),
    'lc94': ('LC 94/1998', P+'leis/lcp/lcp94.htm'),
    'disciplina': ('Lei 15.047/2024', P+'_ato2023-2026/2024/lei/l15047.htm'),
    'nepotismo': ('STF: SV 13 e Tema 66', 'https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=26&sumula=1227'),
    'oab': ('STF: Tema 1054 / ADI 3026', 'https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=506212&tip=UN'),
    'motivos': ('STJ: Informativo 505', 'https://processo.stj.jus.br/jurisprudencia/externo/informativo/?livre=%40CNOT%3D013499'),
    'imagem': ('STJ: Súmula 403', 'https://scon.stj.jus.br/SCON/pesquisar.jsp?b=SUMU&livre=%22403%22+INPATH%28NUM%29'),
    'orgaos': ('STJ: Súmula 525', 'https://processo.stj.jus.br/SCON/sumstj/toc.jsp?l=100&livre=%28%40NUM+%3E%3D+%22501%22+E+%40NUM+%3C%3D+%22600%22%29+OU+%28%40SUB+%3E%3D+%22501%22+E+%40SUB+%3C%3D+%22600%22%29&ordenacao=%40NUM&tipo=%28SUMULA+OU+SU%29'),
    'arrependimento': ('STJ: Informativo 531', 'https://processo.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisar&aplicacao=informativo&livre=%40cnot%3D014502'),
    'perdacargo': ('STJ: perda automática do cargo por tortura', 'https://www.stj.jus.br/sites/portalp/Paginas/Comunicacao/Noticias-antigas/2019/Restabelecida-perda-de-cargo-publico-a-policial-condenado-por-tortura-em-Cuiaba.aspx'),
    'reconhecimento': ('STJ: Tema repetitivo 1258', "https://processo.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisar&aplicacao=informativo&livre=%40CNOT%3D%27021716%27"),
    'consentimento': ('STJ: consentimento domiciliar e controle posterior, 2026', 'https://scon.stj.jus.br/SCON/GetInteiroTeorDoAcordao?dt_publicacao=12%2F05%2F2026&num_registro=202600231811'),
    'mandela': ('ONU/UNODC: Regras de Nelson Mandela', 'https://www.unodc.org/documents/justice-and-prison-reform/Nelson_Mandela_Rules-P-ebook.pdf'),
    'caixa2': ('STF: tese definitiva do Tema 1260, julgada em 2026', 'https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?classeProcesso=ARE&incidente=6600698&numeroProcesso=1428742&numeroTema=1260'),
    'preventivo': ('STF: Constituição anotada, art. 59', 'https://portal.stf.jus.br/constituicao-supremo/artigo.asp?abrirArtigo=59&abrirBase=CF'),
    'hotel': ('STJ: Informativo 715, quarto de hotel ocupado', "https://processo.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisar&aplicacao=informativo&livre=%40CNOT%3D%27018613%27"),
    'tratados': ('STF: RE 466343, supralegalidade e art. 5, §3', 'https://noticias.stf.jus.br/postsnoticias/stf-restringe-a-prisao-civil-por-divida-a-inadimplente-de-pensao-alimenticia/'),
    'ec132': ('EC 132/2023: art. 156-A, §1, XI', P+'constituicao/emendas/emc/emc132.htm'),
    'dl200': ('Decreto-Lei 200/1967, texto compilado', P+'decreto-lei/del0200.htm'),
    'mar': ('STJ: crime ambiental em mar territorial, decisão de junho de 2025', 'https://scon.stj.jus.br/SCON/GetInteiroTeorDoAcordao?dt_publicacao=09%2F06%2F2025&num_registro=202300721460'),
}

RO_DAT = {
 76: ('D', ['cp','cpp'], 'CP, arts. 213, 225 e 226, II: empregador é causa de aumento nos crimes sexuais; ação pública é incondicionada e a falta de perícia não torna a confissão substituto do corpo de delito (CPP, art. 158).'),
 77: ('B', ['cp','cpp'], 'CP, art. 122, §4: transmissão em tempo real por rede/internet aumenta a pena até o dobro; §5 não prevê aumento de apenas um terço ao líder. CPP, arts. 17 e 186: delegado não arquiva e silêncio não fundamenta condenação.'),
 78: ('A', ['cpp'], 'CPP, art. 182: juiz pode aceitar ou rejeitar o laudo, total ou parcialmente, com motivação. Arts. 159 e 167 e 158-B distinguem perito, suprimento testemunhal e etapas da cadeia de custódia.'),
 79: ('E', ['cp'], 'CP, art. 24, §1: dever legal de enfrentar o perigo impede invocar estado de necessidade. Arts. 23, parágrafo único, 24, §2, 25 e 26 afastam as demais alternativas.'),
 80: ('A', ['cp','cpp'], 'CPP, art. 157: prova produzida em violação legal é inadmissível. CP, arts. 342 e 343: perícia falsa com suborno tem aumento, retratação tempestiva afasta a punição, e terceiro corruptor responde por tipo próprio.'),
 83: ('E', ['cf'], 'CF, art. 194: seguridade integra saúde, previdência e assistência social, confirmando os três itens.'),
 84: ('B', ['cf'], 'CF, art. 5, LXVIII: ameaça ou coação ilegal à liberdade de locomoção é protegida por habeas corpus, não por habeas data ou mandado de segurança.'),
 86: ('B', ['processoadm'], 'Lei 9.784, art. 53: revogação por conveniência/oportunidade decorre da autotutela; preservam-se direitos adquiridos e a revisão respeita o devido processo quando exigido.'),
 87: ('A', ['dl200'], 'Decreto-Lei 200, art. 5, IV e §3: definição literal de fundação pública de direito privado, cuja personalidade depende de inscrição; não corresponde à autarquia ou empresa estatal.'),
}
RO_AG_CF = {
 79: ('B', ['cf'], 'CF, art. 5, §1: direitos e garantias fundamentais têm aplicação imediata; a questão reproduz o texto vigente.'),
 81: ('B', ['cf'], 'CF, art. 7, XXXIII: trabalho em geral é vedado antes dos 16 anos, ressalvado aprendiz a partir de 14; trabalho noturno/perigoso/insalubre é vedado aos menores de 18.'),
 82: ('A', ['cf'], 'CF, art. 5, LXXVII: habeas corpus e habeas data são gratuitos; a isenção de ação popular não elimina as consequências da má-fé.'),
 83: ('C', ['cf'], 'CF, art. 7, XXIX: prescrição de cinco anos para créditos de trabalho urbanos/rurais, limitada a dois anos após o fim do contrato. Não confundir os dois prazos.'),
}
DF_EDITAL = 'https://cdn.cebraspe.org.br/concursos/pc_df_26_delegado/arquivos/409522C3AA9E7D9736EC8A33888E0732BEE4FB07EABC75866BB311B2062C5FF9.pdf'
# item: (expected historical key, sources, particular legal reason)
DF = {
 5: ('E', ['caixa2'], 'Tema 1260, mérito concluído em fevereiro e trânsito em julgado em março de 2026: a independência de instâncias permite responsabilização eleitoral e por improbidade. Não confundir o antigo voto/proposta de tese com o julgamento definitivo.'),
 20: ('E', ['preventivo'], 'STF, art. 59 anotado: parlamentar pode impetrar mandado de segurança para proteger o processo legislativo constitucional; o controle judicial não é exclusivamente repressivo.'),
 22: ('C', ['cf','hotel'], 'CF, art. 5, XI, e STJ, Informativo 715: quarto de hotel ocupado integra o conceito protegido de casa; isso não elimina as exceções constitucionais de ingresso.'),
 24: ('E', ['cf','tratados'], 'CF, art. 5, §3, e RE 466343: rito qualificado dá equivalência a emenda; tratados de direitos humanos aprovados pelo rito comum têm status supralegal. Não há constitucionalidade automática para todos.'),
 45: ('E', ['cc'], 'Art. 1.268: a boa-fé isolada não sana aquisição de veículo de pessoa física que não era proprietária. As exceções legais de aparência em leilão/estabelecimento comercial não correspondem ao caso narrado.'),
 63: ('C', ['cp'], 'Art. 21: erro de proibição inevitável isenta de pena; desconhecimento da lei continua inescusável. No erro evitável há redução, e não a mesma isenção.'),
 71: ('C', ['cf','ec132'], 'CF, art. 156-A, §1, XI, incluído pela EC 132/2023: IBS não incide sobre radiodifusão sonora e de sons/imagens de recepção livre e gratuita.'),
 76: ('C', ['bancario'], 'LC 105, art. 6: exame fiscal de dados bancários exige processo administrativo ou procedimento fiscal e indispensabilidade motivada. O resultado fica protegido por sigilo fiscal; não há autorização genérica para divulgar dados.'),
 104: ('E', ['mar'], 'STJ, decisão publicada em 09/06/2025: localização em mar territorial, por si só, não desloca o crime ambiental à Justiça Federal; exige-se interesse federal concreto, como repercussão regional ou nacional.'),
 1: ('E', ['licitacoes'], 'Art. 174, II: o PNCP atende todos os entes federativos, não exclusivamente a União.'),
 3: ('E', ['disciplina'], 'Art. 12: divulgar informação restrita em prejuízo do serviço sujeita o policial à suspensão de 31 a 45 dias, e não à demissão.'),
 6: ('C', ['nepotismo'], 'Tema 66 e SV 13: a vedação ao nepotismo decorre dos princípios do art. 37, sem depender de lei formal.'),
 7: ('E', ['orgaos'], 'Súmula 525: Câmara de Vereadores possui personalidade judiciária para direitos institucionais, não personalidade jurídica.'),
 8: ('E', ['cf','estatais'], 'CF, art. 37, XIX, e Lei 13.303, art. 3: a lei autoriza a instituição de empresa pública. O gabarito definitivo E substituiu o preliminar C; criar diretamente por lei não se confunde com autorizar sua instituição. Não reutilizar a justificativa preliminar como resposta vigente.'),
 9: ('E', ['cf'], 'Arts. 59, VII, e 84, IV: a distinção de decreto e resolução não decorre exclusivamente da finalidade; envolve competência e forma.'),
 10: ('C', ['motivos'], 'Informativo 505: a motivação vincula a administração tanto em atos vinculados quanto em discricionários.'),
 11: ('E', ['processoadm'], 'Arts. 13 e 15: avocação é temporária e excepcional; não se admite a avocação permanente descrita.'),
 12: ('C', ['cc'], 'Art. 100: bem de uso especial permanece inalienável enquanto conservar a afetação; não confundir com bem dominical.'),
 13: ('E', ['licitacoes'], 'Arts. 6, XXXIX, e 30: concurso seleciona trabalho técnico, científico ou artístico por melhor técnica ou conteúdo artístico, não menor preço.'),
 14: ('C', ['cf','processoadm'], 'CF, art. 74, e Lei 9.784, arts. 1, §1, e 53: cada Poder exerce controle administrativo interno e autotutela.'),
 15: ('E', ['servidores'], 'Arts. 24 e 25: o retorno do aposentado por invalidez após cessarem os motivos é reversão; readaptação é instituto distinto.'),
 16: ('C', ['oab'], 'ADI 3026 e Tema 1054: a OAB não integra a administração indireta da União nem se submete à tutela administrativa.'),
 25: ('E', ['cf'], 'Art. 24, §4: a lei federal superveniente suspende a eficácia da norma estadual incompatível; não a revoga.'),
 26: ('C', ['cf'], 'Art. 32, §1: o Distrito Federal acumula competências legislativas estaduais e municipais.'),
 27: ('E', ['cf'], 'Art. 40, §13: agente exclusivamente comissionado pertence ao RGPS, não ao RPPS estadual por simples opção legislativa.'),
 32: ('E', ['pc'], 'Art. 9: o Conselho Superior tem representantes de todos os cargos efetivos, não exclusivamente delegados.'),
 33: ('C', ['linreg'], 'Arts. 2 e 3: motivação de decisão em valores abstratos indica consequências, necessidade e adequação, com alternativas e proporcionalidade.'),
 34: ('E', ['lin','linreg'], 'LINDB, art. 21, e Decreto 9.830, art. 4: invalidar exige considerar e indicar consequências jurídicas e administrativas.'),
 35: ('C', ['lin','linreg'], 'LINDB, art. 21, parágrafo único, e Decreto 9.830, art. 4: regularização proporcional e equânime sem perdas anormais.'),
 36: ('C', ['cc'], 'Art. 6: a personalidade termina com a morte; a presunção do ausente segue hipóteses de sucessão definitiva.'),
 37: ('E', ['cc'], 'Art. 19: pseudônimo lícito recebe proteção do nome, não se equipara a anonimato sem proteção.'),
 38: ('E', ['cc'], 'Arts. 70 a 72: residências alternadas podem ser domicílios; a lei não impõe exclusivamente a residência mais habitual.'),
 39: ('C', ['cc'], 'Art. 111: silêncio importa anuência se circunstâncias/usos autorizarem e não se exigir manifestação expressa.'),
 40: ('E', ['cc'], 'Arts. 171, II, e 172: coação gera anulabilidade e admite confirmação, não nulidade absoluta.'),
 41: ('C', ['imagem'], 'Súmula 403: uso não autorizado da imagem para fins econômicos/comerciais dispensa prova de prejuízo para indenização.'),
 42: ('C', ['cc'], 'Art. 193: a parte beneficiada pode alegar prescrição em qualquer grau de jurisdição.'),
 43: ('E', ['cc'], 'Art. 209: renúncia à decadência legal é nula, não meramente anulável.'),
 44: ('C', ['cc'], 'Art. 1.218: possuidor de má-fé responde até por perda acidental, salvo a exceção relativa à posse do reivindicante.'),
 46: ('E', ['cc'], 'Art. 50: desconsideração alcança administradores/sócios beneficiados pelo abuso; não automaticamente todos os sócios.'),
 47: ('C', ['falencia'], 'Art. 181: inabilitação e impedimento decorrem de condenação motivada, não do simples recebimento de denúncia por crime falimentar.'),
 48: ('E', ['cc'], 'Arts. 991 e 993, parágrafo único: sócio participante que intervém perante terceiros responde solidariamente nas obrigações em que intervier; a ausência de registro não gera imunidade absoluta.'),
 49: ('C', ['cc'], 'Art. 1.039: responsabilidade solidária e ilimitada perante terceiros; limitação interna entre sócios é possível.'),
 50: ('C', ['cc'], 'Art. 1.142: estabelecimento é complexo de bens organizado para exercer a empresa.'),
 51: ('E', ['cc'], 'Art. 970: tratamento de inscrição favorecido refere-se ao empresário rural e ao pequeno empresário; não indistintamente a toda sociedade unipessoal.'),
 52: ('C', ['falencia'], 'Art. 5, II: despesas de participação dos credores não são exigíveis, ressalvadas custas de litígio com o devedor.'),
 53: ('E', ['falencia'], 'Arts. 60 e 94, III: alienação autorizada pelo plano de recuperação não é, por si, causa de falência; a lei excepciona essa hipótese.'),
 54: ('E', ['liberdade'], 'Art. 4, II: a administração deve evitar barreiras regulatórias à entrada de competidores nacionais ou estrangeiros.'),
 55: ('C', ['cp'], 'Art. 22: coação moral irresistível exclui culpabilidade de Mário; apenas o autor da coação é punível.'),
 56: ('E', ['cp'], 'Arts. 73 e 20, §3: erro de execução contra pessoa diversa mantém o dolo homicida; não transforma o fato em homicídio culposo.'),
 57: ('E', ['cp'], 'Art. 16: arrependimento posterior pressupõe crime sem violência ou grave ameaça à pessoa; não se aplica ao roubo narrado.'),
 58: ('C', ['cp'], 'Art. 44, I: violência ou grave ameaça impede substituição por restritivas, ainda que a pena seja até quatro anos.'),
 59: ('E', ['mp'], 'Art. 7, II e V: perseguição/controlar ações e dano emocional descrevem violência psicológica; não substituir a classificação por violência moral. A violência vicária foi incluída em 2026, mas não altera esse gabarito.'),
 60: ('E', ['armas'], 'Art. 16, §1, IV: arma com numeração suprimida tem tipo próprio, inclusive quando possuída dentro da residência.'),
 61: ('C', ['drogas'], 'Art. 40, II: aproveitamento de função pública é causa de aumento do tráfico; não basta apenas possuir uma função.'),
 64: ('E', ['abuso'], 'Art. 4, I: fixação do valor mínimo depende de requerimento do ofendido; não é determinação indenizatória de ofício.'),
 65: ('C', ['cp','arrependimento'], 'Art. 16 e Informativo 531: reparação integral voluntária e tempestiva comunica a minorante, observada a atuação individual na fração.'),
 66: ('C', ['cp'], 'Art. 72: multas no concurso de crimes aplicam-se distinta e integralmente.'),
 68: ('C', ['tortura','perdacargo'], 'Lei 9.455, art. 1, §5, e STJ: perda do cargo é efeito automático da condenação por tortura.'),
 70: ('C', ['cp'], 'Art. 297, §2: testamento particular, livros mercantis e títulos ao portador/endossáveis equiparam-se a documento público para esse crime.'),
 77: ('E', ['ctn'], 'Art. 167: há exceção para penalidades por infrações formais não prejudicadas pela restituição; a assertiva elimina indevidamente essa ressalva.'),
 78: ('E', ['cf','ctn'], 'CF, art. 146, III, b: prescrição tributária é norma geral de lei complementar nacional, não prazo diverso por LC estadual.'),
 81: ('E', ['cp'], 'Art. 213: estupro abrange conjunção carnal e outros atos libidinosos; o antigo art. 214 foi revogado pela Lei 12.015/2009.'),
 85: ('E', ['cp'], 'Art. 123: infanticídio é tipo autônomo sob estado puerperal, não mera redução de pena do homicídio por critério biopsicossocial.'),
 87: ('E', ['cpp','cf'], 'CPP, arts. 155 e 182, e CF, art. 93, IX: afastar perícia exige motivação adequada; fundamentação apenas implícita e parcial não satisfaz o dever.'),
 88: ('C', ['cpp'], 'Art. 157, §§1 e 2: prova por fonte independente rompe derivação ilícita, com demonstração concreta da descoberta independente pelos trâmites usuais.'),
 89: ('C', ['cf','consentimento'], 'CF, art. 5, XI: consentimento livre permite entrada noturna. STJ exige comprovação objetiva, verificável em controle judicial posterior; consentimento presumido não basta.'),
 90: ('E', ['cpp','reconhecimento'], 'Tema 1258/STJ (2025): reconhecimento inválido não é convalidado pela simples repetição em juízo; prova independente é questão diversa.'),
 92: ('E', ['mp'], 'Art. 19, §§4 a 6: medidas protetivas decorrem de cognição sumária e risco, sem exigir prova inequívoca de crime ou inquérito.'),
 93: ('C', ['mp'], 'Art. 19, §§2, 3 e 6: revisão das medidas é judicial e depende do risco; concordância da vítima não autoriza revogação pelo delegado.'),
 94: ('C', ['mp'], 'Art. 24-A combinado com art. 19, §5: descumprimento é crime autônomo, sem condição de representação ou dependência da investigação originária. A pena passou a reclusão de 2 a 5 anos e multa pela Lei 14.994/2024.'),
 95: ('C', ['henry'], 'Art. 14, II e §2: delegado em município sem sede de comarca afasta agressor e comunica o juiz em até 24 horas.'),
 96: ('E', ['henry'], 'Art. 16, §1: concessão imediata independe da audiência das partes e de manifestação prévia do MP, que deve ser prontamente comunicado.'),
 97: ('C', ['mp'], 'Art. 17: vedadas cesta básica/prestação pecuniária e substituição por pagamento isolado de multa.'),
 98: ('E', ['org'], 'Arts. 3 e 4, §6: colaboração premiada é admissível no curso da investigação; não apenas depois da denúncia.'),
 99: ('C', ['lavagem'], 'Art. 2, II e §1, e art. 4: autonomia da lavagem e medidas assecuratórias; não se exige condenação/prova prévia completa do antecedente para investigar. A denúncia deve indicar indícios suficientes da infração antecedente.'),
 100: ('C', ['drogas'], 'Art. 53, II: ação controlada exige autorização judicial e oitiva do MP; parágrafo único também exige itinerário provável e identificação dos agentes/colaboradores.'),
 101: ('C', ['cpp'], 'Arts. 312 e 321: inafiançabilidade não equivale a prisão preventiva obrigatória; ausentes seus requisitos, cabe liberdade provisória.'),
 102: ('E', ['temporaria'], 'Art. 2, §1: representação policial por prisão temporária exige oitiva prévia do MP.'),
 103: ('C', ['cpp'], 'Arts. 322 a 324: autoridade policial concede fiança para pena máxima até quatro anos, ressalvadas as hipóteses legais impeditivas.'),
 105: ('C', ['multa'], 'Art. 143, §2, III, na redação do Decreto 11.373/2023: conversão indireta requerida com a defesa admite desconto de 60%; conversão direta tem percentual distinto.'),
 110: ('C', ['snuc','sisnama'], 'Lei 9.985, art. 6, I, e Lei 6.938, art. 6, II: CONAMA é consultivo/deliberativo no SNUC e assessora/proporciona diretrizes no SISNAMA.'),
 111: ('C', ['snuc'], 'Art. 41, §1: reserva da biosfera compreende áreas-núcleo, amortecimento e transição sem limites rígidos, com manejo participativo e sustentável.'),
 112: ('C', ['lc94','ride'], 'LC 94, art. 3, e Decreto 7.469, art. 3: articulação interfederativa dos serviços comuns e desenvolvimento integrado da RIDE.'),
 113: ('C', ['ride'], 'Arts. 2 e 3: COARIDE coordena as atividades e ações da RIDE. O vínculo atual é ao Ministério da Integração e Desenvolvimento Regional, conforme Decreto 11.911/2024.'),
 114: ('E', ['ride'], 'Art. 8, III: isenções e incentivos fiscais do programa são temporários, não definitivos.'),
 115: ('C', ['ride'], 'Art. 9: financiamento prioritário da RIDE por União, DF, GO, MG, municípios integrantes e operações de crédito internas/externas.'),
}

def make_decisions():
    checked = datetime.datetime.now(datetime.timezone.utc).isoformat()
    decisions = []
    topics = {t['discipline']: t for t in BASE['syllabus_topics'] if t['edition_id']=='02caf358-7504-4e09-b4e7-fe04e6bfae44' and t['content_status']=='current'}
    for row in BASE['official_exam_questions']:
        if 'Distrito Federal' not in row['contest_name'] or row['item_number'] not in DF:
            continue
        answer, keys, reason = DF[row['item_number']]
        assert answer == row['official_answer'], row['id']
        context_pending = row['context_review_required']
        discipline = row['subject']
        if row['item_number'] == 32: discipline = 'Legislação de Segurança Pública'
        if discipline == 'Legislação Penal Extravagante': discipline = 'Direito Penal'
        if discipline == 'Legislação Específica do Distrito Federal': discipline = 'Administração Regional e Políticas Distritais'
        topic = topics[discipline]
        basis = [{'title': SOURCES[k][0], 'url': SOURCES[k][1]} for k in keys]
        decisions.append({'table': 'official_exam_questions', 'id': row['id'], 'exam': 'PCDF Delegado 2026', 'item': row['item_number'],
            'question_md5': hashlib.md5(row['question_text'].encode()).hexdigest(), 'expected_answer': answer,
            'expected_status': row['content_status'], 'expected_basis': row['legal_basis'], 'expected_checked_at': row['law_version_checked_at'],
            'expected_review_note': row['review_note'], 'expected_current_topic': row['current_syllabus_topic_id'],
            'decision': 'legally_verified_context_pending' if context_pending else 'verified', 'reason': reason, 'syllabus_source': DF_EDITAL,
            'patch': {'legal_basis': basis, 'law_version_checked_at': checked, 'legal_review_required': False,
                      'legal_audit_completed': True, 'current_syllabus_topic_id': topic['id'], 'content_status': 'under_review' if context_pending else 'active',
                      'review_note': reason + ' Conferência individual em fontes oficiais em 11/10/2026; gabarito definitivo preservado.'}})
    for row in BASE['official_exam_questions']:
        mapping = RO_DAT if row['career_name']=='Datiloscopista Policial' else RO_AG_CF if row['career_name']=='Agente de Polícia Civil' and 'Rondônia' in row['contest_name'] else {}
        if row['item_number'] not in mapping:
            continue
        answer, keys, reason = mapping[row['item_number']]
        assert row['official_answer'] == answer
        reason += ' Texto legal conferido; vínculo ao edital atual ainda pendente, sem liberação automática de edital histórico.'
        decisions.append({'table':'official_exam_questions', 'id':row['id'], 'exam':'PCRO '+row['career_name']+' 2022', 'item':row['item_number'],
            'question_md5':hashlib.md5(row['question_text'].encode()).hexdigest(), 'expected_answer':answer,
            'expected_status':row['content_status'], 'expected_basis':row['legal_basis'], 'expected_checked_at':row['law_version_checked_at'],
            'expected_review_note':row['review_note'], 'expected_current_topic':row['current_syllabus_topic_id'],
            'decision':'legally_verified_syllabus_pending', 'reason':reason,
            'patch':{'legal_basis':[{'title':SOURCES[k][0], 'url':SOURCES[k][1]} for k in keys],
                     'law_version_checked_at':checked, 'review_note':reason, 'content_status':'under_review'}})
    # Legal check complete, publication remains held: historical generic topic is not a current syllabus comparison.
    row = BASE['curated_question_catalog'][0]
    assert row['external_item_key']=='ppac23-esp-06' and row['official_answer']=='C'
    reason = 'Regras 1, 15 a 18, 22, 24 e 58 da ONU/UNODC confirmam dignidade, proibição de tortura, higiene, alimentação, assistência médica e contato familiar. Natureza de padrão internacional; não confundir com nova lei federal. Vínculo apenas histórico/genérico ainda exige confronto com edital atual antes de publicar.'
    decisions.append({'table': 'curated_question_catalog', 'id':row['id'], 'exam':'PPAC 2023', 'item':row['external_item_key'],
        'question_md5':hashlib.md5(row['question_text'].encode()).hexdigest(), 'expected_answer':'C', 'expected_status':row['content_status'],
        'expected_basis':row['legal_basis'], 'expected_checked_at':row['law_version_checked_at'], 'expected_explanation':row['explanation'],
        'decision':'legally_verified_syllabus_pending', 'reason':reason,
        'patch':{'legal_basis':[{'title':SOURCES['mandela'][0], 'url':SOURCES['mandela'][1]}],
                 'law_version_checked_at':checked, 'explanation':reason, 'content_status':'under_review'}})
    previous_path = ROOT/'docs/question-legal-review-378-2026-10-11.json'
    previous = {d['id']:d for d in json.loads(previous_path.read_text(encoding='utf-8'))['decisions']} if previous_path.exists() else {}
    for decision in decisions:
        prior = previous.get(decision['id'])
        if prior and prior['reason']==decision['reason'] and prior['decision']==decision['decision'] and prior['patch']['legal_basis']==decision['patch']['legal_basis']:
            decision['patch']['law_version_checked_at']=prior['patch']['law_version_checked_at']
        for field in ['review_note', 'explanation']:
            key = 'expected_' + field
            if key in decision:
                decision[key + '_md5'] = hashlib.md5((decision.pop(key) or '').encode()).hexdigest()
    return {'scope_total':378, 'checked_at':checked, 'decisions':decisions,
            'pending_individual_review':378-len(decisions)}

if __name__=='__main__':
    result=make_decisions()
    (ROOT/'docs/question-legal-review-378-2026-10-11.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Explicit reviewed decisions:',len(result['decisions']))
