"""Explicit review of preliminary questions, exceptions and jurisdiction conflicts."""
import json,sys
from pathlib import Path
CPP='https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm'
CF='https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm'
STJ='https://scon.stj.jus.br/SCON/GetInteiroTeorDoAcordao?dt_publicacao=14%2F04%2F2026&num_registro=202600564943'
rows={}
def add(n,s,p,a,c,v,q,t,d,links=()):
 rows['art-'+str(n)]=dict(simples=s,pontos=p,atencao=[a],exemplo=c+' Variação: '+v,prova=q,termos=[dict(termo=t,significado=d)],remissoes=[CPP,*links])
add(92,'Questão séria e fundada sobre estado civil, indispensável à existência da infração, impõe suspensão da ação penal até decisão civil definitiva.',
 ['A dependência deve atingir a existência do crime, não mera conveniência.', 'Testemunhas e outras provas urgentes podem ser colhidas durante a suspensão.', 'Em ação pública, MP promove ou prossegue a causa civil quando necessário, citados os interessados.'],
 'Estado civil gera suspensão obrigatória apenas quando presentes os requisitos. Não esperar o trânsito civil para preservar prova urgente.',
 'Em acusação de bigamia, a existência do primeiro casamento depende de controvérsia civil séria: suspende-se a ação penal até solução civil definitiva.',
 'Se a controvérsia alegada é manifestamente infundada, não basta invocar casamento para suspender automaticamente.',
 ['A suspensão impede colher prova urgente? Não.', 'Basta qualquer alegação sobre estado civil? Não; deve ser séria, fundada e prejudicial à existência da infração.'],
 'Prejudicial obrigatória','Questão antecedente cuja solução civil condiciona a definição penal nos requisitos do art. 92.')
add(93,'Outra questão civil pode justificar suspensão facultativa se já houver ação civil, a solução for difícil e não envolver direito com prova civil legalmente limitada.',
 ['Colher testemunhas e outras provas urgentes antes da suspensão.', 'Juiz fixa prazo; prorrogação razoável se demora não imputável à parte.', 'Sem decisão civil ao fim do prazo, retoma-se o processo e resolve-se toda a matéria da acusação e defesa.', '§2º não prevê recurso contra a negativa; em ação pública suspensa, MP intervém para acelerar a causa civil.'],
 'Não transportar a espera obrigatória por trânsito do art. 92 para toda questão patrimonial. Ausência de recurso no §2º não é imunidade a qualquer controle excepcional.',
 'Questão dominial difícil, já discutida em ação civil, condiciona existência da infração: juiz avalia suspender por prazo e preserva provas urgentes.',
 'Expirado prazo sem decisão civil, a ação criminal prossegue; não fica indefinidamente paralisada.',
 ['A suspensão deste artigo é obrigatória? Não.', 'Precisa existir ação no juízo cível? Sim.'], 'Prejudicial facultativa','Questão civil distinta de estado civil cuja espera depende da avaliação judicial.')
add(94,'Nos casos dos arts. 92 e 93, a suspensão pode ser decretada por iniciativa judicial ou a pedido das partes.',
 ['A iniciativa não modifica os requisitos do artigo aplicável.', 'De ofício não significa suspensão arbitrária.', 'Separar quem provoca da natureza obrigatória ou facultativa.'],
 'Pedido da parte não transforma suspensão facultativa em obrigatória.',
 'Juiz identifica dependência séria de estado civil e suspende mesmo sem pedido.',
 'Parte pede espera por questão civil comum: o juiz verifica os requisitos do art. 93, sem aceitar automaticamente.',
 ['Só a defesa pode pedir suspensão? Não.', 'De ofício dispensa requisitos legais? Não.'], 'Iniciativa de ofício','Providência judicial sem requerimento, sujeita aos pressupostos legais.')
add(95,'Cinco exceções são enumeradas: suspeição, incompetência, litispendência, ilegitimidade de parte e coisa julgada.',
 ['Suspeição discute imparcialidade; incompetência, atribuição do órgão.', 'Litispendência aponta processo pendente duplicado; coisa julgada aponta decisão definitiva sobre o fato principal.', 'Ilegitimidade questiona a posição processual da parte, não prova automaticamente inocência.'],
 'Não confundir repetição de processo ainda pendente com fato definitivamente julgado.',
 'Defesa encontra duas ações pendentes contra a mesma pessoa pelo mesmo fato e suscita litispendência.',
 'Se o fato principal já recebeu decisão definitiva pertinente, examina-se coisa julgada, não simples litispendência.',
 ['Suspeição e incompetência são a mesma objeção? Não.', 'Processo ainda pendente corresponde sempre a coisa julgada? Não.'], 'Exceção processual','Incidente para suscitar uma das objeções enumeradas, conforme seu rito.')
add(96,'A suspeição deve ser arguida antes das outras exceções, ressalvado motivo surgido posteriormente.',
 ['Precedência protege a imparcialidade antes das demais decisões.', 'Motivo superveniente permite arguição posterior.', 'Não confundir superveniência com escolha de guardar motivo já conhecido.'],
 'A precedência não torna impossível suscitar suspeição surgida no curso posterior do processo.',
 'Parte conhece motivo de suspeição e também incompetência: apresenta primeiro a suspeição.',
 'O motivo de suspeição aparece depois da exceção de incompetência: a ressalva permite argui-lo então.',
 ['Motivo superveniente permite arguição posterior? Sim.', 'Regra de precedência significa proibição absoluta depois de outro incidente? Não.'], 'Superveniência','Surgimento posterior do motivo que fundamenta a objeção.')
add(97,'O juiz que reconhece espontaneamente suspeição declara por escrito o motivo legal, intima as partes e remete imediatamente ao substituto.',
 ['Declaração escrita e motivo legal.', 'Remessa imediata ao substituto.', 'Partes devem ser intimadas.'],
 'Não manter o processo com o juiz suspeito apenas porque ninguém pediu a recusa.',
 'Magistrado reconhece motivo legal de suspeição, registra-o e envia o processo ao substituto, intimadas as partes.',
 'A ausência de requerimento não impede a declaração espontânea exigida pelo artigo.',
 ['A declaração é apenas verbal neste artigo? Não; escrita.', 'A remessa exige concordância das partes? Não.'], 'Declaração espontânea','Reconhecimento de suspeição pelo próprio juiz.')
add(98,'A parte recusa o juiz por petição assinada pessoalmente ou por procurador com poderes especiais, com razões e documentos ou rol de testemunhas.',
 ['Parte pode assinar diretamente.', 'Procurador precisa de poderes especiais.', 'Indicar fundamentos e suporte documental ou testemunhal.'],
 'Não ensinar que procuração geral basta à recusa subscrita por procurador.',
 'Advogado munido de poderes especiais apresenta fundamentos e rol de testemunhas da suspeição.',
 'A própria parte pode assinar a petição; a exigência de poderes especiais é dirigida ao procurador.',
 ['Procuração geral é a exigência do art. 98? Não; poderes especiais.', 'Só documentos podem acompanhar? Não; também rol de testemunhas.'], 'Poderes especiais','Autorização específica do procurador para a recusa prevista no artigo.')
add(99,'Se aceita a suspeição, o juiz susta o processo, junta petição e documentos, declara-se suspeito por despacho e remete ao substituto.',
 ['Reconhecimento conduz à remessa, sem rito de resistência do art. 100.', 'Petição e documentos são juntados aos autos.', 'Marcha principal é sustada nessa hipótese.'],
 'Autos apartados com resposta do juiz são próprios da recusa não aceita; não confundir os dois caminhos.',
 'Juiz reconhece a suspeição arguida, interrompe a marcha e encaminha o processo ao substituto.',
 'Se discorda da recusa, passa-se ao art. 100 em vez de declarar-se suspeito por conveniência.',
 ['Reconhecimento mantém julgamento pelo recusado? Não.', 'Juntar os documentos é dispensável? Não; o artigo determina a juntada.'], 'Recusa aceita','Reconhecimento judicial da suspeição suscitada pela parte.')
add(100,'Se rejeita a suspeição, o juiz autua a petição em apartado, responde em três dias e remete o incidente em 24 horas ao órgão competente.',
 ['Resposta pode vir com documentos e testemunhas.', 'Relevância preliminar leva à oitiva, citadas as partes, e julgamento sem mais alegações.', 'Manifesta improcedência permite rejeição liminar pelo juiz ou relator competente.'],
 'Três dias correspondem à resposta; 24 horas à remessa subsequente. Não são o mesmo prazo.',
 'Juiz contesta a recusa em três dias e encaminha o incidente em 24 horas ao órgão competente.',
 'A arguição manifestamente improcedente pode ser rejeitada liminarmente no exame próprio, sem instrução inútil.',
 ['O juiz responde em 24 horas? Não; em três dias.', 'Há rejeição liminar de manifesta improcedência? Sim.'], 'Incidente apartado','Autuação separada para julgamento da objeção.')
add(101,'Suspeição procedente invalida os atos do processo principal nos termos do artigo; erro inescusável pode impor custas ao juiz. Rejeição maliciosa tem previsão sancionatória histórica.',
 ['Distinguir procedência e rejeição com malícia.', 'Custas ao juiz exigem erro inescusável.', 'O texto conserva moeda histórica: mil-réis e contos de réis; não inventar valor atual em reais.'],
 'Rejeição simples não prova malícia. A faixa monetária de 1941 não pode virar multa contemporânea calculada automaticamente sem base vigente.',
 'Reconhecida a suspeição, examinam-se os atos do processo principal atingidos; custas ao juiz dependem de erro inescusável.',
 'Arguição é rejeitada de boa-fé: não se presume malícia para sancionar quem a formulou.',
 ['Toda rejeição pressupõe malícia? Não.', 'A moeda histórica equivale a valor atual em reais definido pelo artigo? Não.'], 'Erro inescusável','Erro não justificável que condiciona a responsabilização por custas prevista no texto.')
add(102,'Reconhecida a procedência da arguição pela parte contrária, o processo principal pode ser sustado a seu requerimento até julgamento da suspeição.',
 ['Exige reconhecimento da parte contrária e requerimento.', 'Poderá: suspensão não é automática.', 'Dura até julgamento do incidente.'],
 'A concordância da parte contrária não substitui o julgamento da suspeição.',
 'Acusação concorda com a recusa da defesa e requer paralisação: juiz avalia sustar o principal até o incidente ser decidido.',
 'Sem reconhecimento ou pedido nessa hipótese, não aplicar o art. 102 como suspensão automática.',
 ['Concordância dispensa julgamento do incidente? Não.', 'O verbo legal impõe suspensão automática? Não; poderá.'], 'Suspensão incidental','Paralisação do principal nas condições expressas do art. 102.')
add(103,'A suspeição em tribunal exige substituição ou redistribuição conforme a função, registro nos autos ou ata e julgamento da arguição não reconhecida.',
 ['Relator: nova distribuição; revisor: substituto na precedência.', 'Outro julgador declara verbalmente na sessão, com registro em ata; presidente é substituído para designar e presidir.', 'Texto prevê pleno e relatoria do presidente; recusado o presidente, vice relata. Integrar regimento e organização atuais.', 'Arguição da parte segue arts. 98–101 no que aplicável.'],
 'Tribunais de Apelação é denominação histórica. Não presumir que toda corte atual mantém revisor ou idêntica organização sem seu regimento.',
 'Relator reconhece suspeição e encaminha para nova distribuição, em vez de escolher pessoalmente seu sucessor.',
 'Se a suspeição atinge o presidente, ele não preside nem relata o julgamento de sua própria recusa nos moldes do artigo.',
 ['Relator suspeito continua com a causa? Não.', 'Todo tribunal contemporâneo necessariamente tem revisor? Não; integrar o regimento atual.'], 'Substituição colegiada','Afastamento do integrante suspeito com observância das funções e normas do tribunal.',[CF])
add(104,'Suspeição do membro do MP é decidida pelo juiz depois de ouvi-lo; o artigo não prevê recurso e admite prova em três dias.',
 ['Ouvir o órgão do MP antes da decisão.', 'Prova pode ser admitida previamente por três dias.', 'Não usar automaticamente o rito de remessa da suspeição do juiz.'],
 'Sem recurso no texto não equivale a impedir todo controle excepcional constitucional de ilegalidade.',
 'Parte suscita suspeição do membro do MP; juiz ouve-o e admite provas por três dias antes de decidir.',
 'Alegação desacompanhada de fundamento não torna o promotor suspeito automaticamente.',
 ['O MP precisa ser ouvido? Sim.', 'O artigo prevê três dias para provas? Sim.'], 'Suspeição do MP','Objeção de imparcialidade ao membro ministerial atuante.')
add(105,'Peritos, intérpretes e servidores podem ser recusados por suspeição; juiz decide de plano pela alegação e prova imediata, sem recurso previsto neste rito.',
 ['Abrange peritos, intérpretes e serventuários ou funcionários de justiça.', 'Prova imediata e decisão de plano.', 'Não transportar automaticamente prazo de três dias do art. 104.'],
 'Discordar da conclusão técnica não prova por si suspeição do perito.',
 'Parte apresenta prova imediata de motivo legal de suspeição do intérprete; juiz decide de plano.',
 'Laudo desfavorável, sozinho, não justifica declarar o perito parcial.',
 ['Este artigo fixa três dias para provas? Não; prova imediata.', 'Perito também pode ser recusado? Sim.'], 'Decisão de plano','Decisão imediata com o suporte probatório exigido pelo rito.')
add(106,'Suspeição de jurado é arguida oralmente e decidida de plano pelo presidente do Júri; negativa do recusado exige comprovação imediata para acolhimento.',
 ['Arguição oral.', 'Presidente decide imediatamente.', 'Negativa sem prova imediata leva à rejeição; registrar tudo na ata.'],
 'Não confundir suspeição fundamentada com recusa imotivada de jurado, que possui disciplina própria.',
 'Defesa argui oralmente suspeição de jurado e apresenta prova imediata; presidente decide e registra na ata.',
 'Jurado nega o motivo e nenhuma prova imediata existe: a arguição é rejeitada nos termos do artigo.',
 ['Arguição precisa ser escrita? Não; oral.', 'O ocorrido deve constar da ata? Sim.'], 'Recusa motivada de jurado','Objeção fundada em suspeição, distinta da recusa sem motivação.')
add(107,'O CPP não prevê oposição formal da exceção de suspeição contra autoridade policial no inquérito, mas exige que ela se declare suspeita por motivo legal.',
 ['Inaplicabilidade da exceção formal não elimina o dever de abstenção.', 'Não confundir polícia com juiz ou membro do MP.', 'Eventuais irregularidades continuam sujeitas aos controles próprios.'],
 'Não ensinar que autoridade policial está dispensada de imparcialidade ou imune a controle de ilegalidade.',
 'Delegado identifica motivo legal de suspeição na investigação e deve declará-lo.',
 'A vedação da exceção formal não autoriza atuação pessoalmente interessada sem controle institucional.',
 ['O delegado deve declarar suspeição legal? Sim.', 'A vedação formal torna lícita qualquer parcialidade? Não.'], 'Abstenção policial','Dever de declarar suspeição legal apesar da ausência do rito formal da exceção.')
add(108,'A exceção de incompetência pode ser oral ou escrita no prazo de defesa. Aceita depois de ouvido o MP, remete-se ao órgão competente; rejeitada, prossegue o feito.',
 ['Declinatória oral deve ser tomada por termo quando recusada.', 'No destino, há exame e ratificação dos atos anteriores conforme a disciplina aplicável.', 'Competência territorial relativa exige oposição tempestiva, sob pena de preclusão e prorrogação.'],
 'Não prometer que qualquer alegação territorial tardia anula o processo. STJ, AgRg RHC 232412, publicado em 14/4/2026, reafirma a exigência de tempestividade.',
 'Defesa questiona o foro territorial na resposta à acusação; MP é ouvido e o juiz decide remeter ou manter o feito.',
 'Alegação territorial só depois de iniciada a instrução pode estar preclusa; não confundir com incompetência absoluta.',
 ['A exceção pode ser oral? Sim.', 'Toda objeção territorial pode ser apresentada a qualquer tempo? Não.'], 'Declinatória','Pedido de reconhecimento da incompetência e envio ao órgão competente.',[STJ])
add(109,'O reconhecimento judicial de incompetência deve ser integrado à natureza do vício. A expressão qualquer fase não reabre competência territorial relativa já preclusa.',
 ['O texto admite declaração judicial sem alegação da parte e remete ao art. 108.', 'STJ, AgRg RHC 232412, 14/4/2026: reconhecimento a qualquer tempo refere-se à incompetência absoluta.', 'Territorial relativa não arguida oportunamente pode prorrogar-se; não tratar como nulidade absoluta universal.'],
 'Distinguir texto literal e interpretação: não ensinar que o juiz afasta de ofício, em qualquer fase, todo foro territorial não impugnado tempestivamente.',
 'Identificada incompetência absoluta, juiz declara-a nos autos e observa o encaminhamento legal.',
 'Defesa deixou de impugnar o foro territorial no prazo: a invocação genérica do art. 109 não elimina a preclusão.',
 ['Qualquer fase elimina preclusão territorial relativa? Não.', 'Reconhecimento absoluto exige sempre pedido da parte? Não.'], 'Incompetência absoluta','Vício de atribuição distinta da competência territorial relativa sujeita à preclusão.',[STJ])
add(110,'Litispendência, ilegitimidade e coisa julgada seguem o rito da incompetência no que aplicável; várias dessas exceções devem ser reunidas em uma petição.',
 ['Reunião das exceções enumeradas em uma só petição ou articulado.', 'Coisa julgada refere-se ao fato principal objeto da sentença.', 'Decisão incidental não equivale automaticamente a julgamento definitivo do fato principal.'],
 'A aplicação do rito é no que couber, não identidade de fundamentos entre todas as exceções.',
 'Parte suscita ilegitimidade e litispendência na mesma petição, cada qual com fundamento próprio.',
 'Decisão incidental sobre documento não é, por si, coisa julgada sobre o crime principal.',
 ['Várias exceções deste artigo vão em uma petição? Sim.', 'Qualquer questão incidental fundamenta coisa julgada do fato principal? Não.'], 'Fato principal','Objeto fático da sentença relevante à exceção de coisa julgada.')
add(111,'Exceções tramitam em autos apartados e, em regra, não suspendem a ação penal.',
 ['Autuação apartada é a regra.', 'Não suspensão admite hipóteses legais próprias.', 'Integrar a suspensão prevista no art. 102 e o reconhecimento do art. 99.'],
 'Em regra não pode ser convertido em nunca: conferir a hipótese concreta e a decisão cabível.',
 'Exceção é autuada separadamente e o processo principal continua segundo a regra geral.',
 'Se a hipótese do art. 102 autoriza suspensão e ela é determinada, não aplicar a regra geral como proibição absoluta.',
 ['Toda exceção suspende automaticamente? Não.', 'Há hipóteses legais de suspensão? Sim.'], 'Regra de não suspensão','Continuidade ordinária do principal, ressalvadas hipóteses específicas.')
add(112,'Juiz, MP, servidores, peritos e intérpretes devem abster-se quando houver impedimento ou incompatibilidade legal; a parte pode arguir se não houver abstenção.',
 ['Motivo declarado nos autos.', 'Abrange sujeitos indicados além do juiz.', 'Arguição segue o processo da exceção de suspeição, sem tornar idênticas as causas.'],
 'Impedimento e suspeição não são sinônimos apenas porque compartilham rito de arguição.',
 'Perito identifica impedimento legal e declara-o, abstendo-se de atuar.',
 'Se não o declara, a parte pode provocar o reconhecimento pelo rito indicado, apresentando fundamento.',
 ['Só juiz está abrangido? Não.', 'Rito comum faz impedimento e suspeição serem a mesma causa? Não.'], 'Impedimento','Circunstância legal que impede atuação, distinta das causas de suspeição.')
add(113,'Competência pode ser resolvida pela exceção própria ou pelo conflito positivo ou negativo de jurisdição.',
 ['Exceção é via incidental perante o juízo.', 'Conflito envolve dissídio entre órgãos nas hipóteses legais.', 'Não confundir recurso contra decisão com conflito automaticamente formado.'],
 'Discordância da parte com um único juiz não basta, por si, para caracterizar conflito entre órgãos.',
 'Dois juízos recusam o mesmo processo: forma-se conflito negativo, resolvido pelo tribunal competente.',
 'Havendo apenas objeção da defesa ao juiz, examina-se a exceção própria sem inventar segundo órgão em conflito.',
 ['Só exceção resolve questão de competência? Não.', 'Conflito negativo pressupõe órgãos que recusam a atribuição? Sim.'], 'Conflito de jurisdição','Dissídio institucional sobre a competência ou unidade processual.')
add(114,'Conflito pode ser positivo, negativo ou envolver controvérsia entre órgãos sobre unidade, junção ou separação de processos.',
 ['Positivo: dois ou mais se consideram competentes para o mesmo fato.', 'Negativo: dois ou mais se consideram incompetentes.', 'Também cabe dissídio sobre unidade, reunião ou separação.'],
 'Não restringir o conflito apenas à dúvida territorial: o inciso II também trata da unidade processual.',
 'Dois órgãos querem processar o mesmo fato: conflito positivo.',
 'Ambos recusam a causa: negativo; discordância sobre reunião pode configurar a hipótese do inciso II.',
 ['Dois órgãos se dizem competentes: positivo ou negativo? Positivo.', 'O inciso II inclui separação de processos? Sim.'], 'Conflito positivo','Dissídio no qual órgãos afirmam competência para o mesmo fato.')
add(115,'Parte interessada, MP junto a qualquer juízo em dissídio e juízes ou tribunais envolvidos podem suscitar o conflito.',
 ['Legitimação não é exclusiva do MP.', 'Órgão ministerial de qualquer juízo em dissídio.', 'Também pode haver iniciativa judicial.'],
 'Ter legitimidade para suscitar não define qual tribunal julgará: essa competência exige Constituição e organização judiciária.',
 'Parte interessada documenta o dissídio e requer sua solução ao tribunal competente.',
 'Mesmo sem pedido da parte, um dos juízes envolvidos pode suscitar o conflito.',
 ['Apenas o MP pode suscitar? Não.', 'Juiz envolvido também pode? Sim.'], 'Legitimidade para o conflito','Autorização legal para provocar sua solução.',[CF])
add(116,'Conflito é apresentado por escrito, fundamentado e documentado ao tribunal competente; relator colhe informações e ouve o procurador-geral antes da decisão.',
 ['Juízes e tribunais representam; parte requer. Negativo pode ser suscitado nos próprios autos.', 'No positivo, relator pode suspender imediatamente o andamento; não é suspensão automática universal.', 'Informações têm prazo fixado pelo relator, independentemente da suspensão.', 'Decisão na primeira sessão depois das informações e oitiva, salvo diligências; cópias seguem às autoridades para execução.'],
 'Não inventar prazo fixo de três dias para informações: o artigo deixa sua fixação ao relator.',
 'Conflito positivo chega documentado; relator avalia suspensão e requisita informações em prazo por ele marcado.',
 'Se faltam diligências indispensáveis, a previsão da primeira sessão não impõe julgamento sem completar a instrução.',
 ['Informações dependem de suspensão prévia? Não.', 'O prazo das informações é fixado pelo relator? Sim.'], 'Representação no conflito','Forma escrita e circunstanciada utilizada pelos órgãos judiciais.')
add(117,'O texto histórico fala em avocatória para restaurar jurisdição do STF. O estudo atual deve usar os instrumentos constitucionais, especialmente reclamação para preservar competência.',
 ['CF 102, I, l: reclamação para preservar competência e garantir autoridade das decisões.', 'Não apresentar avocatória histórica como poder irrestrito de tomar qualquer processo inferior.', 'Conflito, reclamação e recurso têm pressupostos e competências próprios.'],
 'A manutenção da redação no compilado não autoriza exercício atual de uma avocatória genérica independente da Constituição.',
 'Alegada usurpação de competência do STF exige examinar cabimento da reclamação constitucional, com seus requisitos.',
 'Mera discordância com decisão inferior não permite ao STF avocar qualquer causa sem instrumento e competência próprios.',
 ['A literalidade permite tomar qualquer processo inferior? Não.', 'CF 102, I, l prevê reclamação para preservar competência? Sim.'], 'Reclamação constitucional','Instrumento constitucional para preservação de competência e autoridade de decisões.',[CF])
assert len(rows)==26
Path(sys.argv[1]).write_text(json.dumps({'course_slug':'codigo-processo-penal','units':rows},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(len(rows),'incidents explicitly reviewed')
