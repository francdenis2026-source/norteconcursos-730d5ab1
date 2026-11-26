#!/usr/bin/env python3
"""Língua Portuguesa: teoria didática dos assuntos e 30 questões novas. python3 scripts/content-port.py"""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from qlib import Q, teoria, salvar

# ============================ TEORIA ============================
teoria("port_conc",
 """<p><b>Em uma frase:</b> concordância é ajustar o verbo (e os adjetivos) ao sujeito, em número e pessoa. Achou o sujeito, achou a resposta.</p>
<div class="exemplo"><b>Analogia:</b> o verbo é o reboque, o sujeito é o carro: onde o sujeito vai, o verbo acompanha.</div>
<h3>Concordância verbal: o essencial</h3>
<ul><li><b>Sujeito simples:</b> o verbo acompanha. <i>Os agentes chegaram.</i></li>
<li><b>Sujeito composto antes do verbo:</b> plural. <i>O delegado e o escrivão assinaram o termo.</i></li>
<li><b>Sujeito coletivo no singular:</b> verbo no singular. <i>A equipe chegou.</i></li>
<li><b>Haver com sentido de existir</b> e <b>fazer</b> indicando tempo são <b>impessoais</b>: ficam no singular. <i>Há provas. Faz dois anos. Deve haver testemunhas.</i></li>
<li><b>Existir, ocorrer e acontecer</b> não são impessoais: concordam. <i>Existem provas.</i></li>
<li><b>Se apassivador:</b> o verbo concorda com o sujeito paciente. <i>Vendem-se casas.</i> Com verbo que pede preposição, fica no singular: <i>Precisa-se de agentes.</i></li>
<li><b>Cerca de, perto de</b> + numeral: o verbo concorda com o numeral. <i>Cerca de vinte agentes participaram.</i></li></ul>
<h3>Concordância nominal</h3>
<ul><li>Adjetivo concorda com o substantivo: <i>laudos anexos</i>, <i>a própria testemunha</i>.</li>
<li><b>Meio</b> como advérbio (= um pouco) é invariável: <i>ela está meio cansada</i>. Como numeral varia: <i>meia hora</i>.</li>
<li><b>Obrigado</b> concorda com quem fala: homem diz <i>obrigado</i>; mulher diz <i>obrigada</i>.</li></ul>
<h3>Armadilhas</h3>
<ul><li>Sujeito longe do verbo ou depois dele. Ache o sujeito perguntando <b>'quem?'</b> ao verbo.</li>
<li><i>Haviam provas</i> e <i>fazem dois anos</i> estão <b>erradas</b>: haver e fazer são impessoais nesses sentidos.</li>
<li><i>Vende-se casas</i> está errado: o certo é <i>Vendem-se casas</i>.</li></ul>
<h3>Teste rápido</h3><p>Qual está certa: 'Fazem dois meses' ou 'Faz dois meses'? <b>Resposta:</b> Faz dois meses (fazer de tempo é impessoal).</p>""",
 "Corrija: 'Haviam muitas provas no inquérito e fazem três meses que ele foi aberto.' Passo 1: <b>Haver</b> no sentido de 'existir' é impessoal: fica na 3ª pessoa do singular. 'Haviam' vira <b>'Havia'</b>. Passo 2: <b>Fazer</b> indicando tempo decorrido também é impessoal: 'fazem' vira <b>'faz'</b>. Passo 3: Frase correta: <b>'Havia muitas provas no inquérito e faz três meses que ele foi aberto.'</b>",
 "Ache o verbo. (1) Pergunte 'quem?' ao verbo para achar o sujeito. (2) Confira número e pessoa. (3) Se o verbo for haver (existir) ou fazer (tempo), use a 3ª pessoa do singular. (4) Com 'se' e verbo transitivo direto, o verbo concorda com o sujeito paciente.",
 "Haver (existir) e fazer (tempo) não vão para o plural. Vendem-se casas, mas precisa-se de agentes.")
teoria("port_reg",
 """<p><b>Em uma frase:</b> regência é a relação entre o verbo (ou nome) e o complemento. <b>Crase</b> é a fusão da preposição <b>a</b> com o artigo <b>a(s)</b> ou com os pronomes <i>aquele, aquela, aquilo</i>.</p>
<div class="exemplo"><b>Analogia:</b> alguns verbos 'pedem' uma preposição como certos objetos pedem encaixe: <i>obedecer a</i>, <i>assistir a</i>, <i>chegar a</i>.</div>
<h3>Regência que cai</h3>
<ul><li><b>Assistir</b> (= ver): pede <b>a</b>. <i>Assisti ao depoimento.</i> Com sentido de 'ajudar', é direto: <i>O médico assistiu o ferido.</i></li>
<li><b>Obedecer / desobedecer:</b> pede <b>a</b>. <i>Obedeça às ordens.</i></li>
<li><b>Preferir:</b> <i>prefiro X <b>a</b> Y</i>. Não use 'do que'. <i>Prefiro estudar a dormir.</i></li>
<li><b>Chegar, ir:</b> pedem <b>a</b>. <i>Cheguei ao fórum.</i></li>
<li><b>Visar</b> (= ter como objetivo): pede <b>a</b>. <i>A medida visa à segurança.</i></li></ul>
<h3>Quando HÁ crase</h3>
<ul><li>Preposição <b>a</b> + palavra feminina que aceita artigo <b>a</b>: <i>Entreguei o laudo <b>à</b> delegada.</i></li>
<li>Horas determinadas: <i>às 6h</i>, <i>à 1h</i>.</li>
<li>Antes de <i>aquele, aquela, aquilo</i> quando o termo pede <b>a</b>: <i>Refiro-me <b>àquela</b> ocorrência.</i></li>
<li>Locuções femininas: <i>à noite, à vista, às pressas</i>.</li></ul>
<h3>Quando NÃO há crase</h3>
<ul><li>Antes de <b>masculino</b>: <i>a pé, a cavalo</i>.</li><li>Antes de <b>verbo</b>: <i>começou a falar</i>.</li><li>Antes de <b>pronomes</b> sem artigo (ele, ela, quem, você, alguém, todos).</li>
<li>Entre palavras repetidas: <i>frente a frente, gota a gota</i>.</li></ul>
<h3>Teste do 'volto da / vou à'</h3><p>Troque o verbo por <b>voltar</b>. Se vier 'volto <b>da</b>…', há crase com 'ir'. 'Volto <b>da</b> Bahia' → <i>vou <b>à</b> Bahia</i>. 'Volto <b>de</b> Brasília' → <i>vou <b>a</b> Brasília</i>.</p>
<h3>Teste rápido</h3><p>'Fui ___ Bahia.' <b>Resposta:</b> à (volto da Bahia).</p>""",
 "Complete: 'A equipe chegou ___ delegacia ___ 8h e entregou o relatório ___ delegada.' Passo 1: 'chegar' pede <b>a</b>; 'delegacia' é feminina com artigo ('chegou <b>à</b> delegacia'). Passo 2: hora determinada ('8h') pede crase: <b>às 8h</b>. Passo 3: 'entregou o relatório' + 'a' + 'a delegada' → <b>à delegada</b>. Frase: <b>'A equipe chegou à delegacia às 8h e entregou o relatório à delegada.'</b>",
 "(1) Ache o verbo e veja a preposição que ele pede. (2) Se vier <b>a</b> + palavra feminina com artigo, há crase. (3) Teste: troque por palavra masculina; se aparecer <b>ao</b>, a crase é obrigatória. (4) Nunca antes de verbo, masculino ou pronome sem artigo.",
 "Teste do ao: troque a palavra feminina por uma masculina. Se der 'ao', use crase.")
teoria("port_pont",
 """<p><b>Em uma frase:</b> a pontuação organiza o texto e muda o sentido. Vírgula separa partes que o leitor precisa ver divididas, nunca o que é indivisível (sujeito, verbo e complemento).</p>
<div class="exemplo"><b>Analogia:</b> a vírgula é a respiração da frase. Pausa no lugar errado muda a mensagem: 'Vamos comer, Ana' e 'Vamos comer Ana'.</div>
<h3>Vírgula: quando usar</h3>
<ul><li><b>Enumeração:</b> <i>celulares, armas, drogas e documentos.</i> Antes do último 'e' não se usa vírgula.</li>
<li><b>Vocativo:</b> <i>Agentes, atenção.</i></li>
<li><b>Aposto explicativo:</b> <i>João Silva, delegado da região, concedeu entrevista.</i></li>
<li><b>Adjunto adverbial deslocado:</b> <i>Na sexta-feira, a perícia foi concluída.</i></li>
<li><b>Expressões intercaladas</b> (porém, segundo, aliás): <i>O inquérito, segundo o delegado, será concluído.</i></li>
<li><b>Conjunção adversativa</b> (mas, porém, contudo): <i>Ele tentou, mas não conseguiu.</i></li>
<li><b>Orações adjetivas explicativas:</b> <i>O delegado, que assumiu ontem, convocou a equipe.</i></li></ul>
<h3>Vírgula: quando NÃO usar</h3>
<ul><li>Entre <b>sujeito e verbo</b>: ✗ <i>Os agentes, chegaram.</i></li><li>Entre <b>verbo e complemento</b>: ✗ <i>Entregou, o laudo.</i></li><li>Antes do último item de uma enumeração ligada por 'e'.</li></ul>
<h3>Outros sinais</h3>
<ul><li><b>Dois-pontos:</b> introduzem enumeração, explicação ou citação. <i>Levou três itens: lanterna, rádio e colete.</i></li>
<li><b>Ponto e vírgula:</b> separa itens longos de uma enumeração ou orações com ligação mais forte que a da vírgula.</li>
<li><b>Travessão:</b> destaca, indica fala ou isola explicação.</li></ul>
<h3>Teste rápido</h3><p>Qual está certa: 'O delegado, chegou cedo' ou 'O delegado chegou cedo'? <b>Resposta:</b> a segunda: não se separa sujeito de verbo.</p>""",
 "Pontue: 'Na quarta-feira o delegado que é muito experiente convocou os agentes mas poucos compareceram.' Passo 1: adjunto adverbial deslocado: <b>'Na quarta-feira,'</b>. Passo 2: oração explicativa: <b>', que é muito experiente,'</b>. Passo 3: conjunção adversativa 'mas': <b>', mas'</b>. Resultado: <b>'Na quarta-feira, o delegado, que é muito experiente, convocou os agentes, mas poucos compareceram.'</b> Note: não há vírgula entre 'o delegado' e 'convocou'.",
 "(1) Marque sujeito, verbo e complemento: não os separe. (2) Procure o que está 'solto' (adjunto deslocado, aposto, vocativo, intercalação): isole com vírgulas. (3) Se houver 'mas/porém/contudo', vírgula antes. (4) Na enumeração, vírgula entre itens e 'e' sem vírgula no final.",
 "Nunca separe sujeito de verbo nem verbo de complemento com vírgula única.")
teoria("port_interp",
 """<p><b>Em uma frase:</b> interpretar é entender o que o texto diz, o que ele sugere e para que serve, usando <b>só o que está no texto</b>.</p>
<div class="exemplo"><b>Analogia:</b> é como ler um boletim de ocorrência: você extrai fatos, não opiniões suas.</div>
<h3>Três níveis de leitura</h3>
<ul><li><b>Literal:</b> o que está escrito. A resposta aparece quase com as mesmas palavras.</li>
<li><b>Inferência:</b> o que se conclui do texto sem estar dito. 'Mesmo com todos os documentos assinados, recusou encerrar': infere-se que ele exige mais que a assinatura.</li>
<li><b>Crítica:</b> intenção do autor, ironia, ponto de vista.</li></ul>
<h3>Como achar a ideia central</h3>
<ul><li>Leia o <b>título</b>, o <b>primeiro</b> e o <b>último parágrafo</b>.</li><li>Procure a frase com <i>por isso, portanto, assim, em suma</i>: ela costuma trazer a conclusão.</li><li>Em 'não X, mas Y', a ideia defendida é <b>Y</b>.</li></ul>
<h3>Tipologia textual</h3>
<ul><li><b>Narrativa:</b> fatos no tempo, personagens.</li><li><b>Descritiva:</b> características de seres e lugares.</li><li><b>Dissertativa-argumentativa:</b> tese e argumentos.</li><li><b>Expositiva:</b> explica um assunto.</li><li><b>Injuntiva:</b> ordens e instruções (verbos no imperativo).</li></ul>
<h3>Relações entre as ideias (conectivos)</h3>
<ul><li><b>Oposição:</b> mas, porém, contudo, todavia.</li><li><b>Causa:</b> porque, pois, já que.</li><li><b>Consequência / conclusão:</b> por isso, logo, portanto.</li><li><b>Concessão:</b> embora, ainda que (admite algo, mas segue em outra direção).</li></ul>
<h3>Armadilhas</h3>
<ul><li>Opções com <b>sempre, nunca, apenas, todos</b> costumam ser exageros.</li><li>Alternativa verdadeira no mundo, mas <b>não dita no texto</b>: errada.</li><li>Inverter causa e consequência.</li></ul>
<h3>Teste rápido</h3><p>'O prazo foi prorrogado, mas o relatório continuou incompleto.' Que relação o 'mas' indica? <b>Resposta:</b> oposição (contrário ao esperado).</p>""",
 "Texto: 'Embora o número de câmeras tenha dobrado, os furtos na praça continuaram no mesmo patamar.' O que se infere? Passo 1: 'Embora' indica <b>concessão</b>: o fato 'câmeras dobraram' não levou ao resultado esperado. Passo 2: o resultado esperado era <b>diminuir</b> os furtos. Passo 3: os furtos <b>continuaram iguais</b>. Passo 4: infere-se que <b>as câmeras, sozinhas, não reduziram os furtos</b>.",
 "(1) Leia o enunciado antes do texto e sublinhe o que pede. (2) Volte ao texto e marque a frase que sustenta a resposta. (3) Descarte o que não está no texto. (4) Desconfie de exageros (sempre, nunca). (5) Confira se não inverteu causa e consequência.",
 "Resposta certa é a que o texto sustenta, não a que parece verdadeira no mundo.")
teoria("port_sem",
 """<p><b>Em uma frase:</b> semântica é o estudo do <b>sentido</b> das palavras; ortografia é a grafia correta; acentuação é o uso dos acentos gráficos.</p>
<div class="exemplo"><b>Analogia:</b> a palavra é uma ferramenta; escolher a errada (infringir ou infligir) muda o resultado.</div>
<h3>Sentido das palavras</h3>
<ul><li><b>Sinônimos:</b> sentido parecido (<i>meticuloso = minucioso</i>).</li><li><b>Antônimos:</b> sentido contrário (<i>efêmero × duradouro</i>).</li><li><b>Denotação:</b> sentido literal. <b>Conotação:</b> sentido figurado (<i>coração de pedra = insensível</i>).</li>
<li><b>Homônimos e parônimos:</b> <i>infringir</i> (violar) × <i>infligir</i> (aplicar); <i>emergir</i> × <i>imergir</i>; <i>descrição</i> × <i>discrição</i>.</li></ul>
<h3>Figuras de linguagem que mais caem</h3>
<ul><li><b>Metáfora:</b> comparação sem 'como'. <i>O delegado é uma muralha.</i></li><li><b>Metonímia:</b> troca por proximidade. <i>Li Machado de Assis</i> (a obra).</li><li><b>Hipérbole:</b> exagero. <b>Eufemismo:</b> suavização. <b>Antítese:</b> ideias opostas. <b>Ironia:</b> dizer o contrário do que se pensa.</li></ul>
<h3>Ortografia: dúvidas clássicas</h3>
<ul><li><b>Mau</b> (oposto de bom) × <b>mal</b> (oposto de bem). <i>Um mau motivo; mal avaliado.</i></li><li><b>Exceção</b> (de exceto), <b>excesso</b>, <b>expectativa</b>, <b>privilégio</b>.</li><li><b>Por que / porque / por quê / porquê:</b> pergunta com 'por que'; resposta com 'porque'; final de frase 'por quê'; substantivo 'o porquê'.</li></ul>
<h3>Acentuação: o básico</h3>
<ul><li><b>Proparoxítonas</b> levam acento sempre: <i>lâmpada, único, máximo</i>.</li>
<li><b>Oxítonas</b> terminadas em a, e, o (seguidas ou não de s) e em: <i>sofá, café, avô, também, armazém</i>.</li>
<li><b>Paroxítonas</b> terminadas em r, x, n, l, i, is, um, ps, ão: <i>açúcar, tórax, fórum, difícil, júri</i>.</li></ul>
<h3>Teste rápido</h3><p>'O réu ___ a lei' (violou). <b>Resposta:</b> infringiu.</p>""",
 "Escolha: 'O juiz ___ pena severa ao réu que ___ a lei.' (infringir × infligir). Passo 1: 'infligir' = aplicar pena ou castigo. Passo 2: 'infringir' = violar, desobedecer. Passo 3: 'o juiz aplicou a pena': <b>infligiu</b>. Passo 4: 'o réu violou a lei': <b>infringiu</b>. Frase: <b>'O juiz infligiu pena severa ao réu que infringiu a lei.'</b>",
 "Em dúvida de sentido: (1) troque por um sinônimo e veja se a frase continua certa. (2) Em mau/mal, teste a troca por bom/bem. (3) Em acentuação, descubra a sílaba tônica e classifique a palavra.",
 "Mal é oposto de bem; mau é oposto de bom. Infringir = violar; infligir = aplicar.")
teoria("port_sint",
 """<p><b>Em uma frase:</b> sintaxe estuda a função de cada termo na oração e a relação entre as orações do período.</p>
<div class="exemplo"><b>Analogia:</b> a oração é um time; cada termo joga numa posição: sujeito, verbo, complementos e acessórios.</div>
<h3>Termos essenciais</h3>
<ul><li><b>Sujeito:</b> de quem se fala. Ache perguntando <i>'quem?'</i> ao verbo. Pode ser simples, composto, oculto, indeterminado ou inexistente (<i>Choveu muito; Há provas</i>).</li>
<li><b>Predicado:</b> o que se diz do sujeito. Verbal (verbo de ação), nominal (verbo de ligação + predicativo: <i>A testemunha permaneceu calada</i>) ou verbo-nominal.</li></ul>
<h3>Termos integrantes (completam)</h3>
<ul><li><b>Objeto direto</b> (sem preposição): <i>entregou <b>o relatório</b></i>.</li><li><b>Objeto indireto</b> (com preposição): <i>entregou ao juiz</i>.</li><li><b>Complemento nominal:</b> completa nome abstrato: <i>necessidade <b>de provas</b></i>.</li><li><b>Agente da passiva:</b> <i>foi preso <b>pela polícia</b></i>.</li></ul>
<h3>Termos acessórios</h3>
<ul><li><b>Adjunto adnominal:</b> caracteriza o substantivo: <i>a viatura <b>da polícia</b></i>.</li><li><b>Adjunto adverbial:</b> circunstância: tempo, lugar, modo.</li><li><b>Aposto:</b> explica outro termo: <i>João Silva, <b>delegado da região</b>, ...</i></li><li><b>Vocativo:</b> chama alguém: <i><b>Agentes</b>, atenção.</i></li></ul>
<h3>Período composto</h3>
<ul><li><b>Coordenação:</b> orações independentes (aditiva: e; adversativa: mas; alternativa: ou; conclusiva: logo; explicativa: pois).</li>
<li><b>Subordinação:</b> uma oração depende da outra. <b>Substantivas</b> (funcionam como sujeito/objeto: <i>Espero <b>que ele chegue</b></i>), <b>adjetivas</b> (modificam um substantivo: <i>o agente <b>que chegou</b></i>) e <b>adverbiais</b> (circunstância: tempo, causa, condição, concessão...).</li></ul>
<h3>Armadilhas</h3>
<ul><li>Adjunto adnominal × complemento nominal: o complemento nominal completa nome <b>abstrato</b>, de ação ou sentimento (necessidade de, amor a).</li>
<li>Oração adjetiva restritiva (sem vírgula) × explicativa (com vírgula).</li></ul>
<h3>Teste rápido</h3><p>'Quando o alarme tocou, os agentes saíram.' A oração 'Quando o alarme tocou' é: <b>Resposta:</b> subordinada adverbial temporal.</p>""",
 "Analise: 'O delegado entregou o relatório ao juiz que chegou cedo.' Passo 1: verbo 'entregou'; sujeito (quem entregou?): <b>o delegado</b>. Passo 2: o que entregou? <b>o relatório</b> (objeto direto, sem preposição). Passo 3: a quem? <b>ao juiz</b> (objeto indireto, com preposição). Passo 4: 'que chegou cedo' qualifica 'juiz': <b>oração subordinada adjetiva restritiva</b>.",
 "(1) Marque os verbos: cada verbo é uma oração. (2) Ache o sujeito com 'quem?'. (3) Pergunte 'o quê?' (objeto direto) e 'a quem / de quê?' (objeto indireto). (4) Para classificar a oração, substitua-a por 'isso' (substantiva), por um adjetivo (adjetiva) ou por um advérbio (adverbial).",
 "Substitua a oração por 'isso': se funcionar como objeto ou sujeito, é substantiva.")

# ============================ QUESTÕES ============================
C, R, P, I, S, X = "port_conc", "port_reg", "port_pont", "port_interp", "port_sem", "port_sint"
# ---- Concordância
Q(C, "Complete corretamente: “Na operação, cerca de vinte agentes ______ do cerco.”", "participaram",
  [("participou", "o verbo concorda com o numeral ('vinte agentes'), que está no plural."), ("participava", "singular: não concorda com 'vinte agentes'."), ("participará", "singular e no futuro: não concorda e muda o tempo."), ("participaria", "singular: não concorda com o sujeito plural.")],
  ["Ache o sujeito: 'cerca de vinte agentes'.", "Com 'cerca de' + numeral, o verbo concorda com o numeral: 'vinte', plural.", "Verbo no plural: <b>participaram</b>."],
  "Cerca de + numeral: concorda com o numeral.", "Concordar o verbo com sujeito introduzido por 'cerca de'.")
Q(C, "Complete corretamente: “O delegado e o escrivão ______ o termo de declarações.”", "assinaram",
  [("assinou", "sujeito composto antes do verbo exige plural."), ("assinava", "singular: o sujeito tem dois núcleos."), ("assinará", "singular e no futuro."), ("assinaria", "singular: não concorda com 'o delegado e o escrivão'.")],
  ["Sujeito: 'O delegado e o escrivão', com dois núcleos ligados por 'e'.", "Sujeito composto antes do verbo: o verbo vai para o plural.", "<b>assinaram</b>."],
  "Sujeito composto antes do verbo: plural.", "Concordância com sujeito composto.")
Q(C, "Assinale a única frase que contém ERRO de concordância:", "Haviam muitos candidatos na fila do concurso.",
  [("Houve muitos candidatos na fila do concurso.", "correta: 'haver' (existir) é impessoal e fica no singular."), ("Os candidatos chegaram cedo à prova.", "correta: verbo concorda com o sujeito plural."), ("Faz anos que ele estuda para o concurso.", "correta: 'fazer' de tempo é impessoal."), ("Existem muitos candidatos na fila do concurso.", "correta: 'existir' concorda com o sujeito 'candidatos'.")],
  ["'Haver' no sentido de 'existir' é impessoal: fica na 3ª pessoa do singular.", "'Haviam muitos candidatos' usa plural: errado.", "A forma certa é 'Havia muitos candidatos'."],
  "Haver (existir) não vai ao plural.", "Identificar erro de concordância com 'haver'.")
Q(C, "Assinale a alternativa em que a concordância nominal está correta:", "Seguem anexos os laudos periciais.",
  [("Seguem anexo os laudos periciais.", "'anexo' é adjetivo e concorda com 'laudos': anexos."), ("Seguem anexa os laudos periciais.", "'anexa' é feminino singular; 'laudos' é masculino plural."), ("Seguem anexas os laudos periciais.", "'anexas' é feminino; 'laudos' é masculino."), ("Segue anexados os laudos periciais.", "'segue' (singular) não concorda com 'laudos'; e 'anexados' muda a forma.")],
  ["'Laudos periciais' é masculino plural.", "O adjetivo 'anexo' concorda com o substantivo: <b>anexos</b>.", "O verbo também concorda: 'seguem'."],
  "Anexo concorda com o substantivo.", "Concordância nominal com 'anexo'.")
Q(C, "Assinale a frase em que ‘meio’ está empregado de forma CORRETA:", "Elas estavam meio cansadas depois do plantão.",
  [("Elas estavam meias cansadas depois do plantão.", "'meio' = um pouco é advérbio: invariável."), ("Ela estava meia cansada depois do plantão.", "advérbio não varia em gênero."), ("Eles estavam meios cansados depois do plantão.", "advérbio não varia em número."), ("Elas estavam meias-cansadas depois do plantão.", "forma inexistente: advérbio não varia.")],
  ["Troque 'meio' por 'um pouco': 'um pouco cansadas'. A troca funciona.", "Então 'meio' é advérbio e fica invariável.", "Frase correta: <b>meio cansadas</b>."],
  "Meio = um pouco: nunca varia.", "Distinguir 'meio' advérbio de 'meio' numeral.")
Q(C, "Assinale a alternativa correta quanto à concordância com o pronome ‘se’:", "Vendem-se casas na região.",
  [("Vende-se casas na região.", "o sujeito é 'casas' (plural): o verbo vai ao plural."), ("Alugam-se uma sala comercial.", "o sujeito é singular ('uma sala'): 'aluga-se'."), ("Precisam-se de funcionários.", "verbo com preposição ('precisar de') fica no singular: 'precisa-se de'."), ("Vende-se casas e apartamentos.", "o sujeito é composto plural: 'vendem-se'.")],
  ["Com 'se' apassivador, o verbo concorda com o sujeito paciente.", "'casas' é o sujeito: plural.", "<b>Vendem-se</b> casas."],
  "Se apassivador: o verbo concorda com o que é vendido, alugado, etc.", "Concordância com o 'se' apassivador.")
Q(C, "A frase “Fazem três meses que o suspeito foi preso” está INCORRETA porque:", "‘fazer’, indicando tempo decorrido, é impessoal e fica na 3ª pessoa do singular.",
  [("‘fazer’ deve concordar com ‘meses’, no plural.", "quando indica tempo, 'fazer' é impessoal: não concorda com o termo que vem depois."), ("‘suspeito’ deveria estar no plural.", "o sujeito 'o suspeito' está certo no singular."), ("falta um artigo antes de ‘três meses’.", "o artigo não é o problema; é a flexão do verbo."), ("‘preso’ deveria concordar com ‘meses’.", "'preso' concorda com 'o suspeito'.")],
  ["'Fazer' + tempo decorrido (três meses) não tem sujeito: é impessoal.", "Verbo impessoal fica na 3ª pessoa do singular.", "A forma correta é <b>'Faz três meses'</b>."],
  "Fazer (tempo) e haver (existir): sempre singular.", "Entender por que 'fazem' está errado.")
Q(C, "Assinale a frase correta:", "Deve haver outras testemunhas no local.",
  [("Devem haver outras testemunhas no local.", "'haver' impessoal contagia o verbo auxiliar: 'deve haver'."), ("Devem existir outra testemunha no local.", "'devem existir' concorda com 'testemunha', que deveria estar no plural."), ("Podem haver novas provas no local.", "'haver' impessoal: 'pode haver'."), ("Existe-se outras provas no local.", "construção sem sentido: 'existem outras provas'.")],
  ["'Haver' no sentido de 'existir' é impessoal.", "Em locução verbal (deve haver), o auxiliar também fica no singular.", "<b>Deve haver</b> outras testemunhas."],
  "Deve haver, pode haver: singular.", "Concordância de locução verbal com 'haver'.")
# ---- Regência e crase
Q(R, "Assinale a frase em que o emprego da crase está correto:", "Entreguei o laudo à delegada.",
  [("Entreguei o laudo a delegada.", "falta a crase: a (preposição) + a (artigo) = à."), ("Fui à pé até a delegacia.", "'pé' é masculino: sem crase."), ("Estamos dispostos à colaborar.", "antes de verbo não há crase."), ("Ele disse à todos que viria.", "antes de 'todos' (pronome sem artigo feminino) não há crase.")],
  ["Verbo 'entregar' pede objeto indireto com 'a'.", "'a delegada' tem artigo feminino 'a'.", "Preposição + artigo = <b>à</b> delegada."],
  "Teste do 'ao': entreguei ao delegado → à delegada.", "Aplicar a crase em objeto indireto feminino.")
Q(R, "Assinale a frase em que há emprego correto da crase em indicação de horas:", "A operação começou às 6h.",
  [("A operação começou as 6h.", "hora determinada pede crase: 'às'."), ("A operação começou a 6h.", "falta a fusão com o artigo: 'às 6h'."), ("A operação começou à 6h.", "'6h' é plural: 'às'."), ("A operação começou á 6h.", "o acento agudo não indica crase.")],
  ["Horas determinadas pedem a + artigo 'as'.", "Seis horas é plural: a + as = <b>às</b>.", "À 1h (singular), às 2h, às 6h..."],
  "Hora determinada: às (plural) ou à (1h).", "Crase com horas.")
Q(R, "Assinale a frase com regência verbal correta, segundo a norma-padrão:", "O delegado assistiu ao depoimento da testemunha.",
  [("O delegado assistiu o depoimento da testemunha.", "'assistir' no sentido de ver é transitivo indireto: pede 'a'."), ("O delegado assistiu do depoimento da testemunha.", "a preposição 'de' não é a pedida."), ("O delegado assistiu no depoimento da testemunha.", "a preposição 'em' não é a pedida."), ("O delegado assistiu de o depoimento da testemunha.", "'de' não é a preposição do verbo.")],
  ["'Assistir' com sentido de 'ver' pede a preposição 'a'.", "a + o = <b>ao</b>.", "'assistiu ao depoimento'."],
  "Assistir (ver) pede a.", "Regência de 'assistir'.")
Q(R, "Assinale a frase em que a regência de ‘preferir’ está correta:", "Prefiro estudar a dormir.",
  [("Prefiro estudar do que dormir.", "'preferir' usa 'a'; não admite 'do que'."), ("Prefiro mais estudar do que dormir.", "reforço desnecessário: 'preferir' já indica preferência."), ("Prefiro estudar mais que dormir.", "'mais que' compara; não é a regência de 'preferir'."), ("Prefiro estudar de que dormir.", "preposição errada.")],
  ["'Preferir' pede a preposição 'a': preferir X <b>a</b> Y.", "Evite 'mais' e 'do que' com 'preferir'.", "<b>Prefiro estudar a dormir</b>."],
  "Preferir X a Y.", "Regência de 'preferir'.")
Q(R, "Assinale a frase em que há ERRO de regência ou de crase:", "Os agentes obedeceram as ordens do delegado.",
  [("Os agentes obedeceram às ordens do delegado.", "correta: 'obedecer' pede 'a' + artigo 'as' = às."), ("A decisão visa à segurança da população.", "correta: 'visar' com sentido de objetivo pede 'a'."), ("Cheguei ao fórum às 8h.", "correta: 'chegar' pede 'a' e hora determinada pede crase."), ("Refiro-me àquela ocorrência de ontem.", "correta: a + aquela = àquela.")],
  ["'Obedecer' é transitivo indireto: pede preposição 'a'.", "Antes de 'as ordens' ocorre a fusão a + as = 'às'.", "'obedeceram as ordens' não tem a preposição: errado."],
  "Obedecer a algo ou a alguém.", "Identificar erro de regência/crase.")
Q(R, "Assinale a frase em que a crase está correta:", "Os agentes viajaram à Bahia para a perícia.",
  [("Os agentes viajaram a Bahia para a perícia.", "'Bahia' aceita artigo (volto da Bahia): há crase."), ("Os agentes viajaram à Brasília para a perícia.", "'Brasília' não aceita artigo (volto de Brasília): sem crase."), ("Os agentes viajaram à Roma para a perícia.", "'Roma' não aceita artigo: sem crase."), ("Os agentes viajaram à Cruzeiro do Sul para a perícia.", "'Cruzeiro do Sul' não aceita artigo: sem crase.")],
  ["Use o teste: 'volto <b>da</b> Bahia' → há artigo → crase.", "'Volto <b>de</b> Brasília / Roma / Cruzeiro do Sul' → sem artigo → sem crase.", "<b>à Bahia</b>."],
  "Volto da → crase. Volto de → sem crase.", "Crase antes de nomes de lugares.")
Q(R, "Assinale a alternativa em que o termo está corretamente grafado:", "Refiro-me àquela ocorrência.",
  [("Refiro-me aquela ocorrência.", "'referir-se' pede 'a'; com 'aquela' ocorre a fusão: àquela."), ("Refiro-me à aquela ocorrência.", "a crase já vem na junção a + aquela: não há artigo para fundir."), ("Refiro-me á aquela ocorrência.", "o acento agudo não indica crase."), ("Refiro-me a-quela ocorrência.", "grafia inexistente.")],
  ["'Referir-se' pede preposição 'a'.", "Preposição 'a' + pronome 'aquela' → <b>àquela</b>.", "Crase obrigatória."],
  "a + aquele/aquela/aquilo = àquele/àquela/àquilo.", "Crase antes de pronome demonstrativo.")
Q(R, "Assinale a frase com regência correta do verbo ‘chegar’:", "Cheguei ao fórum antes do início da audiência.",
  [("Cheguei no fórum antes do início da audiência.", "norma-padrão: 'chegar' pede 'a'."), ("Cheguei do fórum antes do início da audiência.", "'do' indica origem, não destino."), ("Cheguei pelo fórum antes do início da audiência.", "muda o sentido: 'pelo' indica passagem."), ("Cheguei de o fórum antes do início da audiência.", "forma descontraída incorreta de 'do'.")],
  ["'Chegar' indica destino e pede a preposição 'a'.", "a + o = <b>ao</b>.", "'Cheguei ao fórum'."],
  "Chegar e ir: a (destino).", "Regência de 'chegar'.")
# ---- Pontuação
Q(P, "Assinale a alternativa corretamente pontuada:", "Agentes, atenção ao relatório de hoje.",
  [("Agentes atenção, ao relatório de hoje.", "a vírgula separa o verbo/termo do complemento e esquece o vocativo."), ("Agentes atenção ao relatório, de hoje.", "vírgula no meio de uma expressão contínua."), ("Agentes, atenção, ao relatório de hoje.", "vírgula separando termo e complemento."), ("Agentes atenção ao relatório de hoje,.", "vírgula antes do ponto final.")],
  ["'Agentes' chama os interlocutores: vocativo.", "Vocativo é isolado por vírgula.", "<b>Agentes, atenção ao relatório de hoje.</b>"],
  "Vocativo sempre isolado por vírgula.", "Pontuar o vocativo.")
Q(P, "Assinale a frase pontuada corretamente:", "Foram apreendidos celulares, armas, drogas e documentos.",
  [("Foram apreendidos celulares armas, drogas e documentos.", "falta a vírgula entre 'celulares' e 'armas'."), ("Foram apreendidos celulares, armas, drogas, e documentos.", "não se usa vírgula antes do 'e' que fecha a enumeração."), ("Foram apreendidos, celulares, armas, drogas e documentos.", "vírgula entre verbo e complemento."), ("Foram apreendidos celulares armas drogas e documentos.", "sem vírgulas na enumeração.")],
  ["É uma enumeração de itens.", "Itens separados por vírgula; o último liga-se por 'e', sem vírgula antes.", "Também não se separa verbo e complemento."],
  "Enumeração: vírgulas, e último item com 'e' sem vírgula.", "Pontuar uma enumeração.")
Q(P, "Assinale a frase em que o uso de dois-pontos está correto:", "A equipe levou três itens: lanterna, rádio e colete.",
  [("A equipe: levou três itens lanterna, rádio e colete.", "dois-pontos separando sujeito e verbo."), ("A equipe levou: três itens lanterna rádio e colete.", "dois-pontos entre verbo e complemento."), ("A equipe levou três itens lanterna: rádio e colete.", "dois-pontos no meio da enumeração."), ("A equipe levou três itens; lanterna: rádio e colete.", "mistura inadequada de sinais.")],
  ["Dois-pontos introduzem enumeração depois de uma frase completa.", "'A equipe levou três itens' já é completa.", "Depois vêm os itens: lanterna, rádio e colete."],
  "Frase completa + dois-pontos + enumeração.", "Usar dois-pontos para enumeração.")
Q(P, "Assinale a frase em que o uso da vírgula está CORRETO:", "Ele tentou, mas não conseguiu.",
  [("Ele tentou mas, não conseguiu.", "a vírgula vem antes da conjunção, não depois."), ("Ele, tentou mas não conseguiu.", "separa sujeito do verbo."), ("Ele tentou mas não, conseguiu.", "vírgula no meio da expressão 'não conseguiu'."), ("Ele tentou mas não conseguiu,.", "vírgula antes do ponto.")],
  ["'Mas' é conjunção adversativa.", "Coloca-se vírgula <b>antes</b> do 'mas'.", "Não se separa sujeito e verbo."],
  "Vírgula antes de mas, porém, contudo.", "Pontuar conjunção adversativa.")
Q(P, "Assinale a frase em que a vírgula foi usada corretamente para isolar um adjunto adverbial:", "Na sexta-feira, a perícia foi concluída.",
  [("Na sexta-feira a perícia, foi concluída.", "vírgula entre sujeito e verbo."), ("Na sexta-feira a perícia foi, concluída.", "vírgula entre verbo e complemento."), ("Na, sexta-feira a perícia foi concluída.", "vírgula no meio do adjunto."), ("Na sexta-feira a perícia foi concluída,.", "vírgula antes do ponto final.")],
  ["'Na sexta-feira' é adjunto adverbial de tempo, antes do sujeito.", "Adjunto deslocado para o início é seguido de vírgula.", "<b>Na sexta-feira, a perícia foi concluída.</b>"],
  "Adjunto no início: vírgula depois dele.", "Pontuar adjunto adverbial deslocado.")
Q(P, "Em qual frase a vírgula está usada INCORRETAMENTE?", "Os investigadores do caso, receberam o prêmio.",
  [("Os investigadores do caso, porém, receberam o prêmio.", "correta: 'porém' é intercalada e está isolada."), ("Em janeiro, os investigadores receberam o prêmio.", "correta: adjunto adverbial deslocado."), ("Os investigadores, cansados, receberam o prêmio.", "correta: o aposto/qualificativo é isolado."), ("Receberam o prêmio os investigadores Ana e Paulo.", "correta: sem vírgula incorreta.")],
  ["Procure vírgula entre sujeito e verbo.", "Em 'Os investigadores do caso, receberam', a vírgula separa o sujeito do verbo.", "Isso é erro de pontuação."],
  "Sujeito e verbo não se separam por vírgula única.", "Identificar vírgula incorreta.")
Q(P, "Assinale a frase pontuada corretamente:", "O inquérito, segundo o delegado, será concluído em maio.",
  [("O inquérito segundo o delegado, será concluído em maio.", "falta a vírgula antes de 'segundo' e há vírgula entre sujeito e verbo."), ("O inquérito, segundo o delegado será concluído em maio.", "a intercalada precisa ser fechada com vírgula."), ("O inquérito segundo, o delegado, será concluído em maio.", "vírgula separando termos ligados."), ("O inquérito, segundo o delegado, será, concluído em maio.", "vírgula dentro da locução verbal.")],
  ["'segundo o delegado' é expressão intercalada.", "Expressões intercaladas ficam entre vírgulas.", "<b>O inquérito, segundo o delegado, será concluído em maio.</b>"],
  "Intercalada: vírgula antes e depois.", "Isolar expressão intercalada.")
Q(P, "Em “O delegado que assumiu ontem convocou a equipe”, a ausência de vírgulas indica que a oração ‘que assumiu ontem’ é:", "restritiva: identifica de qual delegado se fala.",
  [("explicativa: acrescenta uma informação extra.", "a oração explicativa vem entre vírgulas."), ("coordenada: tem o mesmo nível da principal.", "tem 'que' relativo: é subordinada."), ("substantiva: funciona como sujeito.", "ela modifica 'delegado'; não é sujeito."), ("adverbial: indica o tempo da ação.", "'que' relativo liga à palavra 'delegado'; é adjetiva.")],
  ["Sem vírgulas, a oração adjetiva restringe o sentido.", "Ela escolhe o delegado entre vários: o que assumiu ontem.", "Oração adjetiva restritiva."],
  "Sem vírgula: restringe. Com vírgula: explica.", "Distinguir restritiva de explicativa pela pontuação.")
# ---- Interpretação, semântica e sintaxe (reforço)
Q(I, "“Embora o número de câmeras tenha dobrado, os furtos na praça continuaram no mesmo patamar.” Infere-se do trecho que:", "as câmeras, sozinhas, não reduziram os furtos.",
  [("as câmeras provocaram mais furtos.", "o texto diz que os furtos ficaram no mesmo patamar, não que aumentaram."), ("os furtos dobraram junto com as câmeras.", "'continuaram no mesmo patamar' nega o aumento."), ("a praça foi fechada ao público.", "nada no texto fala em fechamento."), ("não havia câmeras antes na praça.", "o texto diz que o número dobrou, o que indica que já havia.")],
  ["'Embora' indica concessão: o esperado era reduzir os furtos.", "O texto afirma que os furtos continuaram iguais.", "Logo, as câmeras não reduziram os furtos."],
  "Embora = concessão: o resultado foi diferente do esperado.", "Inferir pelo conectivo de concessão.")
Q(I, "“A confiança da população é o maior patrimônio da polícia; sem ela, nenhum equipamento basta.” A ideia central do texto é:", "a confiança da população é mais importante que os equipamentos.",
  [("os equipamentos são desnecessários.", "o texto diz que sozinhos não bastam, não que sejam desnecessários."), ("a polícia deve desconfiar da população.", "o texto defende a confiança."), ("o patrimônio da polícia são os prédios.", "o patrimônio citado é a confiança."), ("a população não precisa de equipamentos.", "o texto fala da polícia.")],
  ["Frase-chave: 'a confiança é o maior patrimônio'.", "'Nenhum equipamento basta' sem ela: confiança vale mais.", "Ideia central: confiança acima de equipamentos."],
  "Ideia central: a conclusão do autor.", "Identificar a ideia central.")
Q(S, "No trecho “O crime prescreveu”, a palavra ‘prescreveu’ significa que:", "o Estado perdeu o direito de punir pelo decurso do tempo.",
  [("o crime foi receitado por um juiz.", "confusão com 'prescrever' = receitar."), ("o crime foi esquecido pela vítima.", "não se trata de esquecimento da vítima."), ("o criminoso foi absolvido no julgamento.", "prescrição não é absolvição por mérito."), ("o crime passou a ser considerado mais grave.", "prescrição não agrava o crime.")],
  ["'Prescrever' tem sentido jurídico: extinguir-se por decurso do prazo.", "No crime, extingue a pretensão de punir.", "Significa perda do direito de punir pelo tempo."],
  "Prescrever (no direito) = perder a pretensão pelo tempo.", "Sentido jurídico de 'prescrever'.")
Q(S, "Em “O delegado tem coração de pedra”, a expressão ‘coração de pedra’ está empregada em sentido:", "figurado (conotativo), indicando insensibilidade.",
  [("literal (denotativo), indicando órgão de pedra.", "ninguém tem coração de pedra de fato."), ("científico, indicando uma doença.", "não há sentido médico."), ("técnico, de linguagem policial.", "não é termo técnico."), ("apenas ornamental, sem significado.", "a expressão carrega o sentido de insensibilidade.")],
  ["'Coração de pedra' não é um órgão mineral.", "A expressão compara o delegado a algo duro e frio.", "Sentido figurado: insensível."],
  "Se literalmente é impossível, é sentido figurado.", "Distinguir sentido literal e figurado.")
Q(X, "Em “Chegaram cedo os investigadores”, o sujeito da oração é:", "os investigadores (sujeito posposto ao verbo).",
  [("cedo.", "é adjunto adverbial de tempo."), ("chegaram.", "é o verbo."), ("oculto, 'eles'.", "o sujeito está explícito na frase."), ("indeterminado.", "o sujeito aparece: 'os investigadores'.")],
  ["Pergunte ao verbo: quem chegou?", "'Os investigadores'; o verbo concorda com ele no plural.", "O sujeito vem depois do verbo: posposto."],
  "Quem + verbo: ache o sujeito, esteja onde estiver.", "Identificar sujeito posposto.")
Q(X, "Em “Choveu muito ontem”, a oração tem:", "sujeito inexistente (verbo impessoal).",
  [("sujeito oculto.", "não há sujeito a recuperar."), ("sujeito indeterminado.", "indeterminado exige sujeito existente e não identificado."), ("sujeito simples 'muito'.", "'muito' é advérbio de intensidade."), ("sujeito composto.", "há só um verbo e nenhum sujeito.")],
  ["'Chover' é verbo de fenômeno natural.", "Verbos de fenômeno são impessoais: não têm sujeito.", "Oração sem sujeito."],
  "Fenômenos da natureza: oração sem sujeito.", "Reconhecer oração sem sujeito.")

salvar()
