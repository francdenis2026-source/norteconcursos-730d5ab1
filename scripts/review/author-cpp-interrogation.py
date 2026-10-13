"""Interrogation and confessions with silence and temporal precedent safeguards."""
import json,sys
from pathlib import Path
CPP='https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm'
CF='https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm'
LBI='https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm'
SIL='https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=532401'
EXTRA='https://processo.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisar&aplicacao=informativo&livre=%40CNOT%3D%27020893%27'
MOD='https://scon.stj.jus.br/SCON/GetInteiroTeorDoAcordao?dt_publicacao=28%2F08%2F2025&num_registro=202501361800'
TEMA='https://processo.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisar&aplicacao=informativo&livre=%40CNOT%3D%27021819%27'
rows={}
def add(n,s,p,a,c,v,q,t,d,links=()):
 rows['art-'+str(n)]=dict(simples=s,pontos=p,atencao=[a],exemplo=c+' Variação: '+v,prova=q,termos=[dict(termo=t,significado=d)],remissoes=[CPP,*links])
add(185,'Interrogatório exige defensor e entrevista prévia reservada. Videoconferência de preso é excepcional, fundamentada e vinculada às finalidades legais.',
 ['No presídio: segurança, defesa e publicidade; fora das hipóteses legais, requisitar comparecimento.', 'Vídeo: risco de fuga/segurança, dificuldade pessoal relevante, influência sobre depoentes quando art. 217 inviável ou gravíssima ordem pública.', 'Intimar as partes da decisão de vídeo com dez dias de antecedência ao ato; acusado acompanha atos da audiência e tem canais reservados com defesa.', 'Fiscalização da sala: corregedores, juiz, MP e OAB; garantias adaptadas a outros atos com pessoa presa.', 'Informar filhos, idades, deficiência e contato do responsável por cuidados.'],
 'Economia administrativa genérica não substitui fundamento excepcional. Vídeo não elimina defensor ou conversa sigilosa.',
 'Risco de fuga fundamentado leva a vídeo, com intimação prévia, entrevista reservada e acompanhamento defensivo.',
 'Preferência do estabelecimento, sem finalidade legal demonstrada, não basta para restringir o comparecimento.',
 ['Vídeo dispensa entrevista reservada? Não.', 'Antecedência prevista é dez dias? Sim.'], 'Interrogatório remoto','Modalidade excepcional com motivação e garantias preservadas.')
add(186,'Antes de perguntar sobre a acusação, juiz informa direito ao silêncio; calar não é confessar e não pode prejudicar defesa.',
 ['Qualificação e ciência integral da acusação precedem advertência.', 'Silêncio total ou exercício parcial não autoriza presunção de culpa.', 'STF reconhece possibilidade de responder somente à defesa; não encerrar indevidamente a autodefesa.'],
 'Não transformar quem cala em culpado nem impedir esclarecimentos só porque recusou perguntas da acusação.',
 'Acusado prefere responder apenas ao defensor; ato deve respeitar exercício parcial da garantia.',
 'Silêncio integral tampouco permite acrescentar presunção incriminadora à sentença.',
 ['Silêncio é confissão? Não.', 'Pode ser interpretado contra defesa? Não.'], 'Direito ao silêncio','Garantia de não responder perguntas incriminadoras, sem inferência desfavorável.',[CF,SIL])
add(187,'Interrogatório tem duas partes: dados pessoais e fatos imputados, com oportunidade de apresentar defesa e esclarecer circunstâncias.',
 ['Primeira: residência, trabalho, oportunidades sociais, antecedentes e dados familiares.', 'Segunda: acusação, possível autoria diversa, localização, provas, vítimas/testemunhas, instrumentos e pormenores.', 'Pergunta final permite alegações defensivas; integrar advertência e silêncio.'],
 'A existência de perguntas legais não cria dever de provar inocência ou confessar.',
 'Após perguntas pessoais, acusado é informado das garantias e responde sobre onde estava no momento do fato.',
 'Se prefere calar sobre fatos, não inferir culpa nem impedir alegação defensiva voluntária.',
 ['Há duas partes previstas? Sim.', 'Roteiro impõe confissão obrigatória? Não.'], 'Autodefesa','Participação pessoal do acusado em seu favor, preservadas garantias.',[CF])
add(188,'Depois do interrogatório, partes indicam fatos que ainda precisam de esclarecimento e juiz formula perguntas pertinentes e relevantes.',
 ['Rito próprio de perguntas por intermédio do juiz.', 'Não confundir com perguntas diretas às testemunhas do art. 212.', 'Garantia de silêncio permanece.'],
 'Esclarecimento não pode virar coerção para responder nem bloqueio arbitrário de participação defensiva.',
 'Defesa indica dúvida sobre horário; juiz formula pergunta relevante ao acusado.',
 'Pergunta repetitiva sem pertinência pode ser afastada, com preservação da defesa efetiva.',
 ['Rito é idêntico ao das testemunhas? Não.', 'Silêncio deixa de valer nas perguntas complementares? Não.'], 'Esclarecimento do interrogatório','Perguntas adicionais sobre fato relevante indicado pelas partes.')
add(189,'Quem nega a acusação total ou parcialmente pode explicar sua versão e indicar provas.',
 ['Negativa pode ser parcial.', 'Esclarecimentos e provas são faculdades defensivas.', 'Ausência de prova indicada não desloca ônus de demonstrar a acusação.'],
 'Não confundir faculdade de indicar prova com obrigação de demonstrar inocência.',
 'Acusado nega estar no local e indica registro de trabalho como prova de sua versão.',
 'Prefere não responder ou não indica documento: isso não é confissão nem prova positiva de culpa.',
 ['Negativa parcial é permitida? Sim.', 'O acusado fica obrigado a provar inocência? Não.'], 'Versão defensiva','Explicação pessoal facultativa sobre a imputação.',[CF])
add(190,'Confessada autoria, perguntas esclarecem motivos, circunstâncias e participação de outras pessoas, sem eliminar direitos ou confronto probatório.',
 ['Investigar detalhes da narrativa, não presumir tudo demonstrado.', 'Confissão deve ser voluntária e confrontada com provas.', 'Indicação de terceiro não equivale a condenação automática desse terceiro.'],
 'Confissão não dispensa exame de corpo de delito exigível nem prova de autoria alheia.',
 'Acusado admite conduta e esclarece circunstâncias, que serão confrontadas com os elementos produzidos.',
 'Aponta outro participante: é necessária prova e defesa próprias, não culpa automática pela declaração.',
 ['Confissão elimina demais provas? Não.', 'Motivos e circunstâncias são objeto de perguntas? Sim.'], 'Confissão esclarecida','Admissão voluntária cuja narrativa e compatibilidade precisam ser examinadas.')
add(191,'Havendo vários acusados, cada um é interrogado separadamente.',
 ['Evitar interferência recíproca no relato.', 'Preservar defensor e garantias de cada acusado.', 'Não confundir separação de interrogatórios com separação obrigatória de processos.'],
 'Interrogatório coletivo em coro não atende à regra; a disciplina do contraditório sobre versões segue própria análise.',
 'Dois acusados da mesma ação prestam interrogatórios em momentos separados.',
 'Isso não exige automaticamente desmembrar a ação em dois processos.',
 ['Interrogatórios devem ser separados? Sim.', 'Separação implica sempre processos distintos? Não.'], 'Individualização do ato','Oitiva pessoal de cada acusado, sem interrogatório conjunto.')
add(192,'Comunicação no interrogatório exige meios acessíveis adequados; o roteiro escrito/oral histórico deve ser integrado à inclusão, Libras e necessidades concretas.',
 ['Texto prevê perguntas escritas a pessoa surda, respostas escritas a quem não fala e escrita em ambos os sentidos quando necessário.', 'Se não lê ou escreve, intérprete habilitado sob compromisso.', 'LBI 79–80 assegura recursos e adaptações para acesso efetivo à justiça; não presumir que toda pessoa surda usa a mesma comunicação.'],
 'Não equiparar deficiência a incapacidade civil ou de entendimento. Terminologia histórica não elimina tecnologia assistiva atual.',
 'Acusado usuário de Libras recebe interpretação adequada e acesso compreensível às perguntas e direitos.',
 'Quem não lê precisa recurso habilitado, em vez de receber perguntas escritas que não consegue compreender.',
 ['Toda deficiência significa incapacidade? Não.', 'Acessibilidade depende da necessidade concreta? Sim.'], 'Comunicação acessível','Adaptação que permite entender e participar do ato judicial.',[LBI])
add(193,'Acusado que não fala português é interrogado por meio de intérprete, preservados defesa e compreensão.',
 ['Tradução das perguntas e respostas.', 'Não se presume entendimento por estar no Brasil.', 'Intérprete não substitui defensor.'],
 'Não obrigar a responder idioma incompreensível nem tratar dificuldade linguística como silêncio culpável.',
 'Estrangeiro sem domínio do português recebe intérprete para acompanhar acusação e interrogatório.',
 'Presença de advogado não elimina necessidade de tradução efetiva.',
 ['Intérprete substitui defensor? Não.', 'É necessário compreender perguntas e respostas? Sim.'], 'Interpretação linguística','Tradução para participação compreensível no ato.')
add(195,'Impossibilidade ou recusa de assinatura do interrogado deve ser registrada no termo, sem inventar assinatura ou confessionar por omissão.',
 ['Não saber, não poder ou não querer assinar são hipóteses previstas.', 'Consignar a ocorrência.', 'Integrar registro e autenticidade aplicáveis.'],
 'Recusar assinatura não equivale a confissão nem torna automaticamente inexistente toda declaração regularmente documentada.',
 'Acusado não consegue assinar e a circunstância é consignada.',
 'Recusa voluntária também se registra, sem reproduzir assinatura fictícia.',
 ['Recusa deve ser registrada? Sim.', 'Ela equivale a confessar? Não.'], 'Registro da não assinatura','Documentação da hipótese concreta em lugar de assinatura inexistente.')
add(196,'Juiz pode realizar novo interrogatório ou acolher pedido fundamentado das partes, preservando defesa e o direito ao silêncio.',
 ['Possibilidade a todo tempo segundo o texto, integrada à fase e competência atuais.', 'Pedido da parte deve ser fundamentado.', 'Novo ato não serve para compelir confissão após exercício de garantia.'],
 'Não confundir possibilidade de repetição com licença para insistência intimidatória contra silêncio.',
 'Surge elemento relevante e defesa pede novo interrogatório para esclarecimento.',
 'Acusado mantém silêncio: repetição não elimina a garantia nem autoriza censura.',
 ['Parte pode pedir novo ato com fundamento? Sim.', 'Repetir elimina direito ao silêncio? Não.'], 'Novo interrogatório','Repetição juridicamente cabível com garantias preservadas.',[CF])
add(197,'Confissão é valorada em confronto com o conjunto, não como prova soberana. Admissibilidade, força probatória e atenuante são questões distintas.',
 ['Art. 158 mantém exame quando exigível.', 'Tema 1194/STJ de 2025 revisou Súmulas 545/630: atenuante não exige uso na convicção; retratação depende de utilidade à apuração.', 'Quando fato confessado tem pena menor ou excludente, atenuação menor e não preponderante; efeitos prejudiciais só para fatos após publicação do acórdão.'],
 'Não usar a redação antiga da Súmula 545 como requisito absoluto atual. Benefício de dosimetria não transforma declaração em prova suficiente de condenação.',
 'Confissão compatível é examinada com prova; mesmo não usada na convicção, pode gerar atenuante nos termos atuais.',
 'Retratação válida sem contribuição à apuração exige análise própria do Tema, sem afirmar benefício universal em toda fala informal.',
 ['Confissão é rainha das provas? Não.', 'Atenuante exige sempre uso na fundamentação? Não; observar Tema 1194.'], 'Valoração da confissão','Exame de compatibilidade e consequências, sem suficiência automática.',[TEMA])
add(198,'Silêncio não é confissão e não pode ser usado contra a defesa; a segunda parte histórica do artigo não prevalece sobre CF e CPP 186.',
 ['Preservar garantia total ou parcial.', 'Não inserir silêncio como indício incriminador.', 'Confrontar outras provas sem punir exercício de direito.'],
 'Não ensinar poderá constituir elemento como permissão atual para inferir culpa do silêncio.',
 'Juiz aprecia provas independentes e não atribui peso incriminador ao acusado que calou.',
 'Responder somente ao defensor não torna o silêncio diante da acusação elemento de culpa.',
 ['Silêncio pode prejudicar defesa? Não.', 'Redação histórica supera CPP 186 e CF? Não.'], 'Silêncio protegido','Exercício de garantia sem inferência penal adversa.',[CF,SIL])
add(199,'Confissão fora do interrogatório deve ser formalmente registrada. STJ de 2024 exige ato documentado em estabelecimento estatal oficial e limita seu uso incriminador.',
 ['Informar direitos; não admitir ingresso indireto da confissão inadmissível por relato de policial.', 'AREsp 2123334: confissão extrajudicial orienta fontes de prova; condenação precisa de provas judiciais próprias.', 'Aplicação prospectiva da vedação incriminadora a fatos desde 3/7/2024; não estender esse marco mecanicamente à atenuante, hoje integrada ao Tema 1194.', 'Observar art. 195 sobre ausência de assinatura.'],
 'Não transformar fala informal na rua em confissão judicial por mero testemunho policial; examinar data do fato e disciplina aplicável.',
 'Autoridade registra ato formal na delegacia, informa garantias e busca outras provas judiciais da imputação.',
 'Relato do agente sobre fala informal não contorna inadmissibilidade; modulação exige distinguir fatos anteriores e posteriores.',
 ['Registro formal dispensa todas as garantias? Não.', 'Marco de 3/7/2024 se aplica automaticamente à atenuante? Não.'], 'Confissão extrajudicial','Declaração formal fora do interrogatório judicial, com regime próprio.',[EXTRA,MOD,TEMA])
add(200,'Confissão pode ser dividida e retratada; juiz analisa o conjunto, e seus efeitos de atenuação seguem o Tema 1194 e a modulação pertinente.',
 ['Divisível: partes da declaração podem ter valor distinto fundamentado.', 'Retratação não apaga automaticamente fatos comprovados por outras provas.', 'Tema 1194: retratada só beneficia na hipótese em que serviu à apuração; nova tese prejudicial não retroage a fatos anteriores à publicação.'],
 'Não afirmar que toda retratação perde necessariamente atenuante, nem que toda confissão informal gera benefício. Separar prova e dosimetria.',
 'Réu retrata declaração inicial, mas ela contribuiu à apuração: examinar benefício segundo Tema 1194, sem depender de uso na convicção.',
 'Retratação válida sem utilidade exige análise distinta; aplicação prejudicial da nova tese respeita modulação.',
 ['Confissão é sempre indivisível? Não.', 'Retratação sempre elimina atenuante? Não; verificar utilidade, natureza e marco temporal.'], 'Retratação','Recuo da declaração confessória, com efeitos examinados no regime próprio.',[TEMA])
assert len(rows)==15 # art. 194 formally revoked: never restore it.
Path(sys.argv[1]).write_text(json.dumps({'course_slug':'codigo-processo-penal','units':rows},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(len(rows),'interrogation units reviewed')
