#!/usr/bin/env python3
"""Acrescenta 22 questões autorais de Língua Portuguesa (interpretação, semântica e sintaxe), os assuntos com
maior chance de cair e menos questões no banco. Idempotente. Depois: scripts/build-pcac-area-catalog.py"""
import json, pathlib

HTML = pathlib.Path(__file__).resolve().parent.parent / "src/estudo/estudo-pc-acre.html"
NEW = []

def Q(t, q, right, wrongs, steps, dica, pede):
    assert len(wrongs) == 4 and len({right, *[w[0] for w in wrongs]}) == 5
    pos = (len(NEW) * 2 + 1) % 5
    ops = [w[0] for w in wrongs]; ops.insert(pos, right); L = "ABCDE"[pos]
    why = " ".join(f"{'ABCDE'[k]} ({o}): {dict(wrongs)[o]}" for k, o in enumerate(ops) if k != pos)
    exp = " ".join(f"Passo {i+1}: {s}" for i, s in enumerate(steps)) + f" Resposta: <b>{L}</b>."
    NEW.append({"t": t, "q": q, "ops": ops, "c": pos, "exp": exp, "dica": dica, "ps": [pede, steps + [f"Resposta: <b>{L}</b>."], why]})

I, S, X = "port_interp", "port_sem", "port_sint"
# ---------------- Interpretação de texto ----------------
Q(I, "“O número de registros de ocorrência cresceu depois que a delegacia passou a atender também pelo aplicativo. Para a gestora, o aumento não indica mais crimes, mas mais pessoas dispostas a denunciar.” Segundo o texto, a gestora interpreta o aumento dos registros como sinal de:", "maior disposição da população em denunciar.",
  [("crescimento real da criminalidade.", "é exatamente a leitura que a gestora afasta ('não indica mais crimes')."), ("falha do aplicativo.", "o texto não fala em falha do aplicativo."), ("perda de confiança na polícia.", "o texto sugere o contrário: as pessoas denunciam mais."), ("mudança na legislação penal.", "nenhuma mudança legal é mencionada.")],
  ["Localize a opinião da gestora: ela diz que o aumento 'não indica mais crimes, mas mais pessoas dispostas a denunciar'.", "A estrutura 'não X, mas Y' nega X e afirma Y: o aumento mostra Y.", "Y = mais pessoas dispostas a denunciar."],
  "Em 'não X, mas Y', a ideia defendida é Y.", "Identificar a interpretação defendida no texto.")
Q(I, "“Mesmo com todos os documentos assinados, o perito se recusou a encerrar o laudo antes de conferir a cadeia de custódia do material.” Do trecho, infere-se que o perito:", "considera a cadeia de custódia condição para a validade do laudo.",
  [("desconfia da honestidade dos colegas que assinaram.", "o texto não fala em desconfiança pessoal."), ("tem pressa em concluir o laudo.", "a recusa em encerrar indica o contrário de pressa."), ("ignora as normas do órgão.", "ele recusa justamente por zelo com a verificação."), ("não sabe redigir laudos.", "nada no texto trata da sua capacidade de redação.")],
  ["O trecho mostra que há documentos assinados, mas ele recusa encerrar o laudo antes de conferir a cadeia de custódia.", "'Mesmo com' indica que a assinatura não bastava para ele.", "Infere-se que, para ele, conferir a cadeia de custódia é necessário para o laudo valer."],
  "Inferência: o que o texto sugere sem dizer claramente.", "Fazer inferência a partir de um trecho.")
Q(I, "“Reunir informações é só o começo do trabalho do analista. Dados dispersos pouco dizem; é a organização e o cruzamento entre eles que revelam padrões. Por isso, mais valioso do que acumular registros é saber relacioná-los.” A ideia central do texto é:", "o valor da informação está em organizá-la e relacioná-la.",
  [("quanto mais registros, melhor o trabalho do analista.", "o texto diz que acumular é menos valioso do que relacionar."), ("dados dispersos já revelam padrões.", "o texto afirma que dados dispersos pouco dizem."), ("o analista deve evitar coletar informações.", "ele diz que coletar é só o começo, não que se deva evitar."), ("o cruzamento de dados é tarefa de outro setor.", "o texto atribui a tarefa ao analista.")],
  ["Procure a conclusão do texto: 'mais valioso do que acumular registros é saber relacioná-los'.", "As frases anteriores preparam essa conclusão: dados dispersos pouco dizem.", "Ideia central: o valor está em organizar e relacionar a informação."],
  "Ideia central costuma estar na frase de conclusão ('Por isso...').", "Identificar a ideia central.")
Q(I, "“Primeiro, isole o local. Em seguida, fotografe os vestígios sem tocá-los. Por fim, registre em ata quem entrou.” A tipologia textual predominante é a:", "injuntiva (instrucional).",
  [("narrativa.", "não há personagens nem sequência de fatos passados."), ("descritiva.", "o texto não descreve características de um objeto ou lugar."), ("dissertativa-argumentativa.", "não há tese defendida com argumentos."), ("expositiva.", "o texto não explica um conceito: ele dá ordens.")],
  ["Observe os verbos: 'isole', 'fotografe', 'registre', todos no imperativo.", "O texto organiza uma sequência de ações a seguir ('primeiro', 'em seguida', 'por fim').", "Dar instruções é a função do texto injuntivo."],
  "Verbos no imperativo e passos em sequência: injuntivo.", "Identificar a tipologia textual.")
Q(I, "“O prazo foi prorrogado, mas o relatório continuou incompleto.” A conjunção ‘mas’ estabelece, entre as duas orações, uma relação de:", "oposição (ideia contrária ao esperado).",
  [("causa.", "a prorrogação não é causa do relatório incompleto."), ("conclusão.", "o segundo trecho não conclui o primeiro."), ("finalidade.", "a segunda oração não indica objetivo."), ("condição.", "não há 'se' implícito entre as orações.")],
  ["Esperava-se que, com mais prazo, o relatório ficasse pronto.", "O 'mas' introduz o contrário do esperado: continuou incompleto.", "Relação de oposição (adversidade)."],
  "'Mas', 'porém', 'contudo': oposição.", "Identificar a relação entre orações.")
Q(I, "“Que ótimo: mais um relatório para entregar até as 17h, e logo hoje, que o sistema está fora do ar.” No contexto, a expressão ‘Que ótimo’ expressa:", "ironia: o falante demonstra aborrecimento.",
  [("satisfação sincera com a tarefa.", "o contexto (sistema fora do ar) mostra aborrecimento, não satisfação."), ("elogio ao sistema.", "o sistema está fora do ar; não há elogio."), ("dúvida sobre o prazo.", "o prazo é afirmado, não questionado."), ("simples descrição de fato.", "o 'Que ótimo' carrega avaliação irônica, não neutra.")],
  ["Leia a expressão junto com o contexto: mais um relatório, em cima da hora, com o sistema fora do ar.", "Elogiar uma situação ruim é ironia.", "O falante quer dizer o contrário do que diz: está aborrecido."],
  "Elogio a uma situação ruim: ironia.", "Reconhecer ironia pelo contexto.")
Q(I, "“A prova digital é frágil, pois pode ser alterada sem deixar vestígio visível. Por isso, o perito precisa preservar o hash do arquivo desde a coleta.” No texto, o segundo período:", "apresenta uma medida que decorre do argumento anterior.",
  [("contradiz o primeiro período.", "os dois períodos seguem a mesma linha."), ("introduz um exemplo sem relação com a ideia anterior.", "a medida está ligada à fragilidade citada."), ("repete a mesma informação com outras palavras.", "ele acrescenta a medida (preservar o hash), não repete."), ("expressa uma dúvida do autor.", "o texto afirma uma necessidade, sem dúvida.")],
  ["O primeiro período afirma que a prova digital é frágil e explica o motivo ('pois...').", "O segundo começa com 'Por isso': indica consequência.", "Ele apresenta a medida que decorre da fragilidade: preservar o hash."],
  "'Por isso' introduz consequência do que foi dito.", "Reconhecer a função de um período no texto.")
# ---------------- Semântica, ortografia e acentuação ----------------
Q(S, "Assinale a alternativa em que a palavra está grafada corretamente:", "exceção",
  [("excessão", "troca 'ç' por 'ss': a palavra vem de 'exceto'."), ("exeção", "falta o 'c' de 'exceto'."), ("ecessão", "faltam letras: o correto é exceção."), ("exessão", "'ss' no lugar de 'ç'; o certo é exceção.")],
  ["Lembre da família da palavra: exceto, excepcional, <b>exceção</b>.", "A palavra mantém o 'xc' e termina em 'ção'.", "Grafia correta: exceção."],
  "Associe à família: exceto → exceção.", "Reconhecer a grafia correta.")
Q(S, "Assinale a frase em que ‘mau’ ou ‘mal’ está empregado corretamente:", "O agente foi mal avaliado por um mau motivo.",
  [("O agente foi mau avaliado por um mal motivo.", "'mau' e 'mal' estão trocados."), ("O mal agente foi avaliado mau.", "troca os dois: 'mau agente' e 'avaliado mal'."), ("Ele mau chegou e já saiu.", "o correto é 'mal chegou' (advérbio: quase não)."), ("Aquele foi um mal comportamento.", "'comportamento' pede 'mau' (adjetivo, oposto de bom).")],
  ["Teste a troca pelo oposto: 'mal' é oposto de 'bem' (advérbio); 'mau' é oposto de 'bom' (adjetivo).", "'mal avaliado' (avaliado de modo ruim, oposto de 'bem avaliado') e 'mau motivo' (motivo ruim, oposto de 'bom motivo').", "Só a primeira frase respeita as duas regras."],
  "Mal ↔ bem. Mau ↔ bom.", "Distinguir mau e mal.")
Q(S, "Em “O perito foi meticuloso na coleta dos vestígios”, a palavra ‘meticuloso’ pode ser substituída, sem alteração do sentido, por:", "minucioso.",
  [("apressado.", "é o oposto de meticuloso."), ("indeciso.", "indica hesitação, não cuidado."), ("irônico.", "não tem relação de sentido."), ("rude.", "indica grosseria, não cuidado.")],
  ["'Meticuloso' é quem faz as coisas com muito cuidado e atenção aos detalhes.", "Procure o sinônimo: quem age com atenção aos detalhes é minucioso.", "As demais opções têm sentido diferente ou oposto."],
  "Meticuloso = minucioso = cuidadoso.", "Reconhecer sinônimo.")
Q(S, "O antônimo de ‘efêmero’ é:", "duradouro.",
  [("passageiro.", "é sinônimo de efêmero."), ("breve.", "é sinônimo de efêmero."), ("fugaz.", "é sinônimo de efêmero."), ("instantâneo.", "é sinônimo de efêmero (dura um instante).")],
  ["'Efêmero' é o que dura pouco tempo.", "Quatro opções são sinônimos (passageiro, breve, fugaz, instantâneo).", "O antônimo é o que dura muito tempo: duradouro."],
  "Antônimo = sentido contrário.", "Reconhecer antônimo.")
Q(S, "Assinale a frase em que o verbo está empregado com o sentido adequado:", "O réu infringiu a lei de trânsito.",
  [("O réu infligiu a lei de trânsito.", "'infligir' é aplicar pena ou castigo; o correto aqui é 'infringir' (violar)."), ("O juiz infringiu a pena ao réu.", "'infringir' é violar; aplicar pena é 'infligir'."), ("O réu infligiu uma multa à lei.", "troca o sentido: multa é aplicada a alguém, não à lei."), ("O réu infrigiu a norma.", "grafia incorreta: o certo é 'infringiu'.")],
  ["'Infringir' = desobedecer, violar (infringir a lei).", "'Infligir' = aplicar (infligir uma pena ou castigo).", "Só a primeira frase usa o verbo certo."],
  "Infringir = violar; infligir = aplicar.", "Distinguir infringir e infligir.")
Q(S, "Assinale a palavra proparoxítona:", "lâmpada",
  [("caderno", "paroxítona: a sílaba tônica é 'der'."), ("armazém", "oxítona: a tônica é a última sílaba."), ("juiz", "oxítona."), ("açúcar", "paroxítona terminada em 'r' (acentuada).")],
  ["Proparoxítona é a palavra cuja sílaba tônica é a antepenúltima.", "Em lâm-pa-da, a tônica é 'lâm', a antepenúltima.", "As outras são paroxítonas ou oxítonas."],
  "Toda proparoxítona leva acento gráfico.", "Classificar a palavra quanto à sílaba tônica.")
Q(S, "Em “O delegado é uma muralha diante das pressões”, ocorre a figura de linguagem denominada:", "metáfora.",
  [("metonímia.", "troca o nome por outro relacionado (a parte pelo todo, o autor pela obra); aqui há comparação implícita."), ("hipérbole.", "é exagero; o trecho não exagera, compara."), ("eufemismo.", "suaviza uma ideia desagradável, o que não ocorre."), ("antítese.", "opõe ideias contrárias, o que não há no trecho.")],
  ["O delegado é comparado a uma muralha (algo firme, que protege), sem o conectivo 'como'.", "Comparação implícita, sem 'como', é metáfora.", "Não há troca por contiguidade nem exagero."],
  "'Como' implícito: metáfora.", "Reconhecer metáfora.")
# ---------------- Sintaxe ----------------
Q(X, "Em “Foram apreendidas armas ilegais na operação”, o sujeito da oração é:", "armas ilegais.",
  [("na operação.", "é adjunto adverbial de lugar."), ("foram apreendidas.", "é o verbo (locução verbal)."), ("oculto, 'eles'.", "o sujeito está claro na frase: 'armas ilegais'."), ("indeterminado.", "o sujeito aparece: não é indeterminado.")],
  ["Pergunte ao verbo: o que foi apreendido? <b>armas ilegais</b>.", "O verbo concorda com ele: 'foram' (plural).", "'na operação' diz onde: adjunto adverbial."],
  "Sujeito: quem pratica ou sofre a ação e concorda com o verbo.", "Identificar o sujeito.")
Q(X, "Em “O delegado entregou o relatório ao juiz”, o termo ‘ao juiz’ exerce a função sintática de:", "objeto indireto.",
  [("objeto direto.", "o objeto direto é 'o relatório', sem preposição."), ("adjunto adnominal.", "ele não completa o sentido de um nome."), ("complemento nominal.", "completa verbo, não substantivo."), ("predicativo do sujeito.", "não caracteriza o sujeito.")],
  ["Verbo 'entregar': entrega-se algo (objeto direto) a alguém (objeto indireto).", "'o relatório' é o objeto direto (sem preposição).", "'ao juiz' vem com a preposição 'a': objeto indireto."],
  "Objeto indireto é regido por preposição.", "Reconhecer objeto indireto.")
Q(X, "Em “Espero que a perícia termine hoje”, a oração destacada ‘que a perícia termine hoje’ é:", "subordinada substantiva objetiva direta.",
  [("subordinada adjetiva restritiva.", "não modifica um substantivo."), ("coordenada adversativa.", "não há ideia de oposição."), ("subordinada adverbial temporal.", "'hoje' é adjunto dentro da oração, que não é temporal."), ("subordinada substantiva subjetiva.", "ela é objeto de 'espero', não sujeito.")],
  ["Teste substituir a oração por 'isso': 'Espero isso'.", "Quem espera, espera <b>algo</b>: a oração funciona como objeto direto de 'espero'.", "Introduzida por 'que' e com função de objeto direto: substantiva objetiva direta."],
  "Substitua a oração por 'isso': se funcionar como objeto, é objetiva.", "Classificar a oração subordinada.")
Q(X, "Em “O suspeito negou o crime, mas as provas o contradisseram”, a oração iniciada por ‘mas’ é:", "coordenada sindética adversativa.",
  [("coordenada sindética aditiva.", "aditiva soma ideias (e, nem)."), ("subordinada adverbial causal.", "não há ideia de causa, e a oração é coordenada."), ("coordenada sindética conclusiva.", "não conclui a anterior."), ("coordenada assindética.", "assindética não tem conjunção, mas aqui há 'mas'.")],
  ["As duas orações têm sentido completo e independente: coordenação.", "A conjunção 'mas' liga as duas: sindética.", "'Mas' indica oposição: adversativa."],
  "Mas, porém, contudo, todavia: adversativa.", "Classificar oração coordenada.")
Q(X, "Em “A necessidade de provas atrasou o inquérito”, o termo ‘de provas’ exerce a função de:", "complemento nominal.",
  [("adjunto adnominal.", "o adjunto não completa o sentido de um nome de ação; só o especifica ou caracteriza."), ("objeto indireto.", "completa um substantivo, não um verbo."), ("aposto.", "não explica nem resume o substantivo."), ("adjunto adverbial.", "não modifica o verbo.")],
  ["'Necessidade' é substantivo abstrato que pede complemento: necessidade <b>de quê</b>?", "'de provas' completa o sentido desse nome, com preposição.", "Complemento do nome: complemento nominal."],
  "Nome abstrato + de + alvo: complemento nominal.", "Distinguir complemento nominal de adjunto adnominal.")
Q(X, "Em “João Silva, delegado da região, concedeu entrevista”, a expressão ‘delegado da região’ é:", "aposto explicativo.",
  [("vocativo.", "não chama o interlocutor."), ("predicativo do sujeito.", "não vem ligada ao verbo: está entre vírgulas, explicando o nome."), ("adjunto adverbial.", "não indica circunstância."), ("objeto direto.", "não completa o verbo 'concedeu'.")],
  ["A expressão está entre vírgulas e explica quem é João Silva.", "Termo que explica outro termo da oração: aposto.", "Como esclarece o nome, é aposto explicativo."],
  "Entre vírgulas, explicando outro termo: aposto.", "Identificar aposto.")
Q(X, "Em “A testemunha permaneceu calada”, o termo ‘calada’ funciona como:", "predicativo do sujeito.",
  [("adjunto adnominal.", "não está junto de um substantivo no sintagma: vem ligado ao verbo 'permaneceu'."), ("objeto direto.", "'permaneceu' é verbo de ligação e não pede objeto."), ("adjunto adverbial.", "não indica circunstância."), ("complemento nominal.", "não completa um nome.")],
  ["'Permanecer', aqui, liga o sujeito a uma característica: verbo de ligação.", "'Calada' diz como a testemunha ficou: característica do sujeito.", "Termo que caracteriza o sujeito pelo verbo de ligação: predicativo do sujeito."],
  "Verbo de ligação + característica do sujeito: predicativo.", "Identificar predicativo do sujeito.")
Q(X, "Em “Quando o alarme tocou, os agentes já haviam saído”, a oração ‘Quando o alarme tocou’ é:", "subordinada adverbial temporal.",
  [("subordinada adverbial causal.", "'quando' marca tempo, não causa."), ("subordinada substantiva objetiva direta.", "não funciona como objeto."), ("coordenada aditiva.", "não está no mesmo nível da outra: depende dela."), ("subordinada adjetiva explicativa.", "não explica um substantivo.")],
  ["A oração depende da principal 'os agentes já haviam saído': subordinação.", "'Quando' indica o momento em que a ação ocorreu: tempo.", "Subordinada adverbial temporal."],
  "Quando, enquanto, assim que: tempo.", "Classificar oração subordinada adverbial.")

def main():
    html = HTML.read_text(encoding="utf-8")
    a = html.index("const DATA = ") + len("const DATA = ")
    data, end = json.JSONDecoder().raw_decode(html[a:])
    have = {q["q"] for q in data["questions"]}
    sub = next(s for s in data["subjects"] if s["id"] == "port")
    added = 0
    for n in NEW:
        if n["q"] in have:
            continue
        have.add(n["q"]); data["questions"].append(n); sub["qs"].append(len(data["questions"]) - 1); added += 1
    HTML.write_text(html[:a] + json.dumps(data, ensure_ascii=False) + html[a + end:], encoding="utf-8")
    print("novas:", added, "| total:", len(data["questions"]))

if __name__ == "__main__":
    main()
