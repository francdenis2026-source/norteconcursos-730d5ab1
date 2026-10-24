"""Generate concrete calculation and logic exercises; output directory is required."""
import json,math,fractions,itertools,pathlib,sys
P=pathlib.Path(sys.argv[1]);P.mkdir(parents=True,exist_ok=True);packs={}
def put(slug,items):
 assert len(items)==12,slug
 packs[slug]=items
def item(q,a,why,check=None):return dict(q=q,a=a,why=why,**({'_check':check} if check else {}))
def calc(q,claim,expected,why,expression):
 assert isinstance(claim,(int,float,fractions.Fraction)) and isinstance(expected,(int,float,fractions.Fraction))
 return item(q,math.isclose(float(claim),float(expected),rel_tol=1e-9,abs_tol=1e-9),why,dict(claim=float(claim),expected=float(expected),expression=expression))
put('enem-geometria-aplicacoes',[
 calc('Um terreno retangular de 12 m por 8 m possui área de 96 m².',96,12*8,'Área do retângulo: base × altura = 12 × 8 = 96 m². Exemplo: cercar o terreno exige perímetro, uma grandeza diferente.','12*8'),
 calc('O perímetro de um quadrado de lado 7 cm é 49 cm.',49,4*7,'Perímetro soma os quatro lados: 4 × 7 = 28 cm. Exemplo: 49 cm² seria a área desse quadrado, não seu perímetro.','4*7'),
 calc('Um triângulo com base de 10 cm e altura correspondente de 6 cm tem área de 30 cm².',30,10*6/2,'Área do triângulo: base × altura / 2 = 10 × 6 / 2 = 30 cm². Exemplo: usar 60 cm² trataria a figura como um retângulo.','10*6/2'),
 calc('O volume de uma caixa retangular com dimensões internas de 2 m, 3 m e 4 m é 24 m³.',24,2*3*4,'Volume do bloco retangular: 2 × 3 × 4 = 24 m³. Exemplo: as três dimensões precisam estar na mesma unidade.','2*3*4'),
 calc('Uma área de 3 m² equivale a 300 cm².',300,3*100**2,'Como 1 m = 100 cm, então 1 m² = 10.000 cm²; 3 m² = 30.000 cm². Exemplo: conversões de área elevam o fator linear ao quadrado.','3*100**2'),
 calc('Na escala 1:500, um segmento de 4 cm representa 20 m.',20,4*500/100,'A distância real é 4 × 500 = 2.000 cm = 20 m. Exemplo: a conversão final usa 100 cm em cada metro.','4*500/100'),
 calc('Um triângulo retângulo de catetos 6 cm e 8 cm tem hipotenusa de 10 cm.',10,math.sqrt(6**2+8**2),'Pelo teorema de Pitágoras, c² = 36 + 64 = 100, logo c = 10 cm. Exemplo: a hipotenusa é o lado oposto ao ângulo reto.','sqrt(6**2+8**2)'),
 calc('Se o lado de um quadrado é dobrado, sua área é multiplicada por 2.',2,2**2,'A área depende do quadrado do lado; dobrá-lo multiplica a área por 4. Exemplo: um lado de 3 cm produz 9 cm²; um de 6 cm produz 36 cm².','2**2'),
 calc('Adotando π = 3,14, um círculo de raio 5 cm tem área de 78,5 cm².',78.5,3.14*5**2,'Área do círculo: πr² = 3,14 × 25 = 78,5 cm². Exemplo: o raio não deve ser confundido com o diâmetro.','3.14*5**2'),
 calc('Adotando π = 3, um círculo de raio 4 cm tem comprimento de circunferência de 12 cm.',12,2*3*4,'O comprimento é 2πr = 2 × 3 × 4 = 24 cm. Exemplo: usar apenas πr omite o fator 2.','2*3*4'),
 calc('Um reservatório cúbico de aresta interna 1 m comporta geometricamente 1.000 litros.',1000,1**3*1000,'O volume é 1 m³, equivalente a 1.000 litros. Exemplo: a capacidade geométrica não desconta espaços reservados por segurança.','1**3*1000'),
 calc('Um retângulo de área 60 m² e base 12 m tem altura de 6 m.',6,60/12,'A altura é área / base = 60 / 12 = 5 m. Exemplo: conferir 12 × 5 = 60 evita aceitar uma altura incompatível.','60/12')])
put('enem-estatistica-aplicacoes',[
 calc('A média aritmética dos valores 4, 6 e 11 é 7.',7,(4+6+11)/3,'A soma é 21 e há três valores: 21 / 3 = 7. Exemplo: a média não é obtida dividindo pelo maior valor.','(4+6+11)/3'),
 calc('A mediana de 2, 5, 8 e 13 é 8.',8,(5+8)/2,'Com quatro valores ordenados, a mediana é a média dos dois centrais: (5+8)/2 = 6,5. Exemplo: não se escolhe apenas o maior dos centrais.','(5+8)/2'),
 calc('A amplitude dos dados 3, 9, 12 e 20 é 17.',17,20-3,'Amplitude é máximo menos mínimo: 20 − 3 = 17. Exemplo: somar os extremos não mede a amplitude.','20-3'),
 calc('Uma nota 6 com peso 2 e uma nota 9 com peso 1 produzem média ponderada 7.',7,(6*2+9)/3,'A média é (6×2 + 9×1)/(2+1) = 21/3 = 7. Exemplo: os pesos precisam aparecer no numerador e no denominador.','(6*2+9)/3'),
 calc('Em um grupo de 40 pessoas, 10 representam 40% do total.',40,10/40*100,'A fração é 10/40 = 0,25, correspondente a 25%. Exemplo: o denominador é o total do grupo.','10/40*100'),
 calc('A moda do conjunto 1, 2, 2, 4 e 5 é 2.',2,2,'O valor 2 aparece duas vezes e os demais uma vez. Exemplo: moda mede frequência, não a posição central.','2'),
 calc('Se todos os três dados forem aumentados em 5, a média também aumentará em 5.',5,((1+5)+(4+5)+(7+5))/3-(1+4+7)/3,'Somar a mesma constante a cada observação soma essa constante à média. Exemplo: a média de 1, 4 e 7 é 4; a de 6, 9 e 12 é 9.','((1+5)+(4+5)+(7+5))/3-(1+4+7)/3'),
 calc('A variância populacional dos valores 2 e 4 é 2.',2,((2-3)**2+(4-3)**2)/2,'A média é 3; os desvios quadráticos são 1 e 1. Dividindo por N=2, a variância populacional é 1. Exemplo: usar N−1 corresponderia a outro cálculo.','((2-3)**2+(4-3)**2)/2'),
 calc('Em uma tabela, frequências absolutas 8, 12 e 5 somam 25 observações.',25,8+12+5,'O total é 8 + 12 + 5 = 25. Exemplo: frequências absolutas representam contagens das classes consideradas.','8+12+5'),
 calc('Se uma frequência relativa é 0,18, sua representação percentual é 1,8%.',1.8,.18*100,'Para obter percentual, multiplica-se por 100: 0,18 = 18%. Exemplo: deslocar a vírgula apenas uma casa produz erro de fator 10.','.18*100'),
 calc('A mediana de 9, 1 e 5 é 5.',5,5,'Primeiro ordene: 1, 5, 9. O elemento central é 5. Exemplo: a posição na lista original não define a mediana.','5'),
 calc('Adicionar 100 ao conjunto 1, 2 e 3 mantém sua média aritmética em 2.',2,(1+2+3+100)/4,'A nova média é 106/4 = 26,5. Exemplo: valores extremos podem influenciar intensamente a média.','(1+2+3+100)/4')])
put('enem-probabilidade-aplicacoes',[
 calc('Ao lançar um dado honesto de seis faces, a probabilidade de resultado par é 1/2.',fractions.Fraction(1,2),fractions.Fraction(3,6),'Há três resultados pares em seis equiprováveis: 3/6 = 1/2. Exemplo: enumere 2, 4 e 6 antes de contar.','3/6'),
 calc('No lançamento de duas moedas honestas independentes, a probabilidade de duas caras é 1/2.',fractions.Fraction(1,2),fractions.Fraction(1,4),'Os quatro pares equiprováveis são CC, CK, KC e KK; só CC atende. Exemplo: contar apenas quantidades de caras não produz três casos equiprováveis.','1/4'),
 calc('Escolher uma pessoa entre cinco e outra entre quatro opções independentes permite 20 pares.',20,5*4,'Pelo princípio multiplicativo, 5 × 4 = 20. Exemplo: cada primeira escolha se combina com as quatro segundas.','5*4'),
 calc('Escolher dois representantes sem ordem entre cinco pessoas permite 10 duplas.',10,math.comb(5,2),'A combinação é 5×4/2 = 10. Exemplo: a dupla Ana–Bruno é a mesma que Bruno–Ana.','comb(5,2)'),
 calc('Uma urna com 3 bolas vermelhas e 2 azuis tem probabilidade de retirada de vermelha igual a 3/5.',fractions.Fraction(3,5),fractions.Fraction(3,5),'São três resultados favoráveis em cinco bolas equiprováveis. Exemplo: a probabilidade usa o total da urna como denominador.','3/5'),
 calc('Na mesma urna, retirar duas bolas sem reposição gera probabilidade de duas vermelhas de 9/25.',fractions.Fraction(9,25),fractions.Fraction(3,5)*fractions.Fraction(2,4),'Sem reposição, após uma vermelha restam duas em quatro bolas: 3/5 × 2/4 = 3/10. Exemplo: manter 3/5 no segundo sorteio ignoraria a mudança da urna.','3/5*2/4'),
 calc('Se a probabilidade de um evento é 0,35, a de seu complemento é 0,65.',.65,1-.35,'Evento e complemento somam probabilidade 1: 1 − 0,35 = 0,65. Exemplo: sucesso e ausência de sucesso são complementares quando cobrem todos os casos.','1-.35'),
 calc('Permutar três objetos distintos em uma fila permite 9 ordens.',9,math.factorial(3),'O número é 3! = 3 × 2 × 1 = 6. Exemplo: a quantidade de opções diminui após cada posição ocupada.','factorial(3)'),
 calc('Para eventos disjuntos A e B com probabilidades 0,2 e 0,3, a probabilidade da união é 0,5.',.5,.2+.3,'Como não há interseção, somam-se 0,2 + 0,3 = 0,5. Exemplo: não se subtrai uma sobreposição inexistente.','.2+.3'),
 calc('Uma senha de dois algarismos, permitindo zero inicial e repetição, possui 90 possibilidades.',90,10**2,'Cada posição tem dez opções: 10 × 10 = 100. Exemplo: excluir zero inicial ou repetição mudaria o problema.','10**2'),
 calc('Em um dado honesto, sabendo que o resultado foi par, a probabilidade de ele ser 6 é 1/3.',fractions.Fraction(1,3),fractions.Fraction(1,3),'O universo condicionado é {2,4,6}; um dos três casos é 6. Exemplo: a condição muda o denominador de seis para três.','1/3'),
 calc('Distribuir primeiro e segundo lugares entre quatro pessoas distintas permite seis resultados ordenados.',6,4*3,'A ordem importa: há quatro opções para primeiro e três para segundo, total 12. Exemplo: Ana em primeiro e Bruno em segundo difere da ordem inversa.','4*3')])
put('enem-funcoes-aplicacoes',[
 calc('Para f(x)=3x+2, o valor de f(4) é 14.',14,3*4+2,'Substitua x por 4: 3×4 + 2 = 14. Exemplo: multiplicação precede adição.','3*4+2'),
 calc('A raiz da função f(x)=2x−8 é x=8.',8,8/2,'Na raiz, 2x−8=0; portanto x=4. Exemplo: f(4)=0 confirma a solução.','8/2'),
 calc('Um produto de R$ 200 com desconto único de 15% passa a custar R$ 170.',170,200*(1-.15),'O desconto é 200×0,15=30; o preço final é 200−30=170. Exemplo: desconto incide sobre o preço de referência.','200*(1-.15)'),
 calc('Dois aumentos sucessivos de 10% sobre R$ 100 resultam em R$ 120.',120,100*1.1**2,'Os fatores se multiplicam: 100×1,1×1,1=121. Exemplo: a segunda taxa incide sobre R$ 110, não sobre R$ 100.','100*1.1**2'),
 calc('Juros simples de 2% ao mês sobre R$ 1.000 por três meses geram R$ 60 de juros.',60,1000*.02*3,'J=C×i×t=1.000×0,02×3=60. Exemplo: a unidade da taxa deve coincidir com a do tempo.','1000*.02*3'),
 calc('No regime composto, R$ 1.000 a 10% por período durante dois períodos produzem montante de R$ 1.210.',1210,1000*1.1**2,'M=C(1+i)^t=1.000×1,1²=1.210. Exemplo: o montante inclui capital e juros.','1000*1.1**2'),
 calc('Uma tarifa de R$ 8 fixos mais R$ 3 por unidade consumida custa R$ 23 para cinco unidades.',23,8+3*5,'O modelo é C(x)=8+3x; C(5)=8+15=23. Exemplo: o valor fixo não é multiplicado pelo consumo.','8+3*5'),
 item('Uma função afim com coeficiente angular −2 é crescente em todo o domínio real.',False,'A afirmação é falsa: coeficiente angular negativo indica função estritamente decrescente. Exemplo: f(2)−f(1)=−2 para qualquer intercepto.'),
 calc('A função f(x)=x² possui valor 9 quando x=−3.',9,(-3)**2,'O produto de dois números negativos é positivo: (−3)²=9. Exemplo: parênteses diferenciam (−3)² de −3².','(-3)**2'),
 calc('Um desconto de 20% seguido de aumento de 20% devolve um preço de R$ 100 exatamente a R$ 100.',100,100*.8*1.2,'O resultado é 100×0,8×1,2=96. Exemplo: as taxas atuam sobre bases diferentes.','100*.8*1.2'),
 calc('Para f(x)=x²−4, as raízes reais são −2 e 2, cuja soma é zero.',0,-2+2,'Resolver x²=4 fornece x=−2 ou x=2. Exemplo: omitir a raiz negativa perde uma solução real.','-2+2'),
 calc('Um valor que passa de 80 para 100 teve aumento percentual de 20%.',20,(100-80)/80*100,'O aumento foi 20 sobre a base inicial 80: 20/80=25%. Exemplo: dividir pela base final responde a outra comparação.','(100-80)/80*100')])
put('enem-matematica-fundamentos',[
 calc('Três cadernos de mesmo preço custam R$ 24; cinco desses cadernos custam R$ 40.',40,24/3*5,'O preço unitário é 24/3=8; cinco unidades custam 5×8=40. Exemplo: a razão preço por unidade permanece constante.','24/3*5'),
 calc('Mantidas as demais condições, quatro trabalhadores que concluem um serviço em seis dias indicam que oito trabalhadores o concluiriam em doze dias.',12,4*6/8,'No modelo inversamente proporcional, o esforço é 4×6=24 trabalhador-dias; 24/8=3 dias. Exemplo: dobrar a equipe reduz o tempo à metade nesse modelo.','4*6/8'),
 calc('Uma mistura que usa 2 partes de concentrado para 3 partes de água contém 40% de concentrado.',40,2/(2+3)*100,'São cinco partes no total e duas de concentrado: 2/5=40%. Exemplo: dividir apenas por três compara concentrado com água, não com a mistura.','2/(2+3)*100'),
 calc('Uma velocidade constante de 60 km/h durante 30 minutos corresponde a 30 km.',30,60*.5,'Trinta minutos são 0,5 hora; d=v×t=60×0,5=30 km. Exemplo: é necessário converter o tempo para a unidade da velocidade.','60*.5'),
 calc('Uma extensão de 2,5 km equivale a 250 m.',250,2.5*1000,'Cada quilômetro tem 1.000 metros; 2,5 km=2.500 m. Exemplo: multiplicar por 100 seria insuficiente para essa conversão.','2.5*1000'),
 calc('Dividir R$ 90 em partes proporcionais a 2 e 3 atribui R$ 36 à parte de peso 2.',36,90*2/5,'A soma dos pesos é 5; cada peso vale 18, e a parte de peso 2 vale 36. Exemplo: as duas parcelas somam 36+54=90.','90*2/5'),
 calc('O valor de 3/4 de 200 é 150.',150,3/4*200,'Multiplica-se 200 por 3/4: 200/4×3=150. Exemplo: calcular primeiro um quarto facilita o procedimento.','3/4*200'),
 calc('Um desconto de R$ 18 sobre R$ 120 representa redução de 18%.',18,18/120*100,'A taxa é 18/120=0,15=15%. Exemplo: o valor monetário do desconto não é automaticamente sua taxa percentual.','18/120*100'),
 calc('Na equação 3x+6=21, o valor de x é 5.',5,(21-6)/3,'Subtraia 6 dos dois lados: 3x=15; divida por 3: x=5. Exemplo: substituir 5 no original produz 21.','(21-6)/3'),
 calc('Um consumo de 12 litros em 180 km corresponde a rendimento de 15 km por litro.',15,180/12,'Rendimento em km/L é distância dividida pelo volume: 180/12=15. Exemplo: litros por quilômetro é a razão inversa.','180/12'),
 calc('Se uma quantidade de 50 unidades cresce 30%, o novo total é 80 unidades.',80,50*1.3,'O acréscimo é 50×0,30=15 e o total é 65. Exemplo: somar 30 unidades não equivale a somar 30%.','50*1.3'),
 calc('A razão entre 150 m e 0,5 km, expressa com unidades compatíveis, é 0,3.',.3,150/500,'Converta 0,5 km para 500 m; então 150/500=0,3. Exemplo: comparar números sem converter unidades pode produzir uma razão errada.','150/500')])
put('enem-fisica-fundamentos',[
 calc('Um corpo que percorre 120 m em 20 s tem velocidade escalar média de 6 m/s.',6,120/20,'Velocidade escalar média é distância percorrida pelo intervalo de tempo: 120/20=6 m/s. Exemplo: não é necessário que a velocidade tenha sido constante para calcular essa média.','120/20'),
 calc('Uma velocidade de 36 km/h equivale a 36 m/s.',36,36/3.6,'Para converter km/h em m/s, divide-se por 3,6; 36 km/h=10 m/s. Exemplo: as duas unidades usam escalas diferentes de comprimento e tempo.','36/3.6'),
 calc('No modelo F=ma, uma massa de 4 kg com aceleração de 3 m/s² sofre força resultante de 12 N.',12,4*3,'A força resultante é 4×3=12 N. Exemplo: usa-se a resultante das forças, não necessariamente uma única força isolada.','4*3'),
 calc('Uma força constante de 10 N paralela ao deslocamento de 5 m realiza trabalho de 50 J.',50,10*5,'W=F×d×cos(0)=10×5=50 J. Exemplo: o ângulo é relevante; uma força perpendicular não teria o mesmo trabalho.','10*5'),
 calc('A energia cinética de uma massa de 2 kg a 3 m/s é 18 J.',18,.5*2*3**2,'Ec=mv²/2=2×9/2=9 J. Exemplo: não se deve esquecer o fator 1/2.','.5*2*3**2'),
 calc('Adotando g=10 m/s², elevar uma massa de 3 kg em 2 m aumenta sua energia potencial gravitacional em 60 J.',60,3*10*2,'Próximo à superfície e no modelo considerado, ΔEp=mgΔh=3×10×2=60 J. Exemplo: a referência de altura pode variar, mas a diferença é a grandeza usada.','3*10*2'),
 calc('Transferir 600 J em 20 s corresponde a potência média de 30 W.',30,600/20,'Potência média é energia por tempo: 600/20=30 W. Exemplo: watt equivale a joule por segundo.','600/20'),
 calc('Um aparelho que recebe 200 J e fornece 150 J de energia útil tem rendimento de 75%.',75,150/200*100,'Rendimento é energia útil sobre recebida: 150/200=0,75=75%. Exemplo: os 50 J restantes não fazem parte da saída útil indicada.','150/200*100'),
 calc('Um resistor ôhmico de 6 Ω submetido a 12 V conduz corrente de 72 A.',72,12/6,'Pela relação V=RI, I=V/R=12/6=2 A. Exemplo: multiplicar tensão pela resistência não fornece corrente.','12/6'),
 calc('Dois resistores de 4 Ω e 6 Ω em série têm resistência equivalente de 10 Ω.',10,4+6,'Na associação em série, as resistências somam: 4+6=10 Ω. Exemplo: essa regra não é a da associação em paralelo.','4+6'),
 calc('Uma máquina de 1 kW ligada por duas horas consome 2 kWh de energia elétrica no modelo de potência constante.',2,1*2,'Energia=potência×tempo=1 kW×2 h=2 kWh. Exemplo: kWh é unidade de energia, não de potência.','1*2'),
 calc('Uma variação de velocidade de 4 m/s em 2 s corresponde a aceleração média de 8 m/s².',8,4/2,'Aceleração média é Δv/Δt=4/2=2 m/s². Exemplo: a razão, e não o produto, relaciona a mudança de velocidade ao tempo.','4/2')])
put('enem-quimica-fundamentos',[
 calc('Uma solução com 10 g de soluto em volume final de 2 L tem concentração comum de 5 g/L.',5,10/2,'Concentração comum é massa de soluto por volume da solução: 10/2=5 g/L. Exemplo: o volume usado é o volume final da solução.','10/2'),
 calc('Uma amostra de 36 g de água, adotando massa molar de 18 g/mol, corresponde a 3 mol.',3,36/18,'Quantidade de matéria é massa sobre massa molar: 36/18=2 mol. Exemplo: o resultado não é obtido somando os dois valores.','36/18'),
 calc('Ao diluir 100 mL de uma solução de 2 mol/L para volume final de 400 mL, a concentração passa a 0,5 mol/L, sem reação ou perda de soluto.',.5,2*100/400,'Na diluição, C1V1=C2V2; C2=2×100/400=0,5 mol/L. Exemplo: aumentar quatro vezes o volume reduz a concentração à quarta parte.','2*100/400'),
 calc('A massa molar de CO₂, adotando C=12 e O=16 g/mol, é 44 g/mol.',44,12+2*16,'Somam-se 12+2×16=44 g/mol. Exemplo: o índice 2 afeta o oxigênio, não o carbono.','12+2*16'),
 calc('Uma substância de massa 40 g e volume 20 mL tem densidade de 0,5 g/mL.',.5,40/20,'Densidade é massa dividida por volume: 40/20=2 g/mL. Exemplo: 0,5 mL/g seria a razão inversa.','40/20'),
 calc('Na reação balanceada 2 H₂ + O₂ → 2 H₂O, 4 mol de H₂ em excesso de O₂ podem formar teoricamente 4 mol de H₂O.',4,4*2/2,'A proporção molar H₂:H₂O é 2:2, isto é, 1:1. Exemplo: o rendimento real e reagentes limitantes podem alterar o resultado fora das condições indicadas.','4*2/2'),
 calc('Um átomo neutro de número atômico 11 possui 11 elétrons.',11,11,'O número atômico é a quantidade de prótons; no átomo neutro, elétrons e prótons têm a mesma quantidade. Exemplo: um íon exigiria considerar sua carga.','11'),
 calc('Um átomo com número de massa 23 e número atômico 11 possui 34 nêutrons.',34,23-11,'Nêutrons=A−Z=23−11=12. Exemplo: número de massa soma prótons e nêutrons.','23-11'),
 item('Na fusão de uma substância pura, a transformação de sólido para líquido não exige, por si só, formar uma nova substância.',True,'Fusão é uma mudança física de estado. Exemplo: gelo que derrete continua sendo água, nas condições usuais.'),
 item('Toda mistura homogênea é necessariamente uma substância pura.',False,'Uma mistura homogênea pode conter componentes diferentes em uma fase. Exemplo: água com sal dissolvido não é água pura.'),
 item('Separar areia de água por filtração explora a retenção de partículas sólidas em um meio filtrante apropriado.',True,'É uma técnica de separação de mistura heterogênea. Exemplo: o filtro retém a areia sem ser, em regra, uma técnica para retirar todo sal dissolvido.'),
 item('Na equação balanceada de uma reação química, a conservação dos átomos pode ser ignorada quando o produto tem aparência diferente.',False,'Os átomos dos elementos devem ser conservados na equação do modelo químico usual. Exemplo: mudar de cor não autoriza criar ou eliminar átomos no balanceamento.')])
# Concrete logical exercises with independently enumerable truth values.
logic=[]
for i,(p,q) in enumerate(itertools.product([False,True],repeat=2)):
 impl=(not p) or q;claim=[False,True,True,True][i]
 logic.append(item(f'Sendo P {"verdadeira" if p else "falsa"} e Q {"verdadeira" if q else "falsa"}, a condicional P → Q é {"verdadeira" if claim else "falsa"}.',impl==claim,f'A condicional só é falsa quando P é verdadeira e Q é falsa. Neste caso P={p} e Q={q}, logo P → Q é {"verdadeira" if impl else "falsa"}. Exemplo: hipótese falsa não torna a condicional material falsa.',dict(truth=dict(p=p,q=q,op='implies',claim=claim))))
logic += [
 item('A negação lógica de “P e Q” é equivalente a “não P ou não Q”.',True,'Pelas leis de De Morgan, ¬(P∧Q) equivale a ¬P∨¬Q. Exemplo: para negar que duas condições ocorram juntas, basta que ao menos uma delas falhe.'),
 item('A negação de “P ou Q”, no sentido inclusivo, é equivalente a “não P ou não Q”.',False,'A negação correta é ¬P∧¬Q. Exemplo: negar que pelo menos uma ocorra exige que nenhuma delas ocorra.'),
 item('Uma proposição composta com duas proposições simples distintas possui quatro combinações de valores na tabela-verdade.',True,'Há 2²=4 combinações. Exemplo: VV, VF, FV e FF cobrem os pares possíveis.'),
 item('A expressão P ou não P é uma contradição na lógica proposicional clássica.',False,'Ela é uma tautologia: ao menos uma das alternativas é verdadeira. Exemplo: se P é falsa, ¬P é verdadeira.'),
 item('A condicional P → Q é logicamente equivalente à contrapositiva ¬Q → ¬P.',True,'As duas fórmulas têm os mesmos valores em todas as linhas. Exemplo: a única linha falsa de ambas corresponde a P verdadeira e Q falsa.'),
 item('A condicional P → Q é sempre equivalente à sua recíproca Q → P.',False,'A recíproca não é equivalente em geral. Exemplo: com P falsa e Q verdadeira, P→Q é verdadeira e Q→P é falsa.'),
 item('Uma bicondicional P ↔ Q é verdadeira quando P e Q têm valores lógicos iguais.',True,'A bicondicional vale em VV e FF. Exemplo: valores diferentes tornam a bicondicional falsa.'),
 item('Para negar uma condicional P → Q, pode-se usar P e não Q.',True,'A negação identifica a situação que torna a condicional falsa. Exemplo: P verdadeira com Q falsa corresponde a P∧¬Q.')]
put('rlm-proposicoes-negacao-condicionais',logic)
put('rlm-conjuntos-quantificadores',[
 calc('Se A tem 12 elementos, B tem 9 e a interseção tem 4, a união tem 17 elementos.',17,12+9-4,'Pela inclusão-exclusão, |A∪B|=12+9−4=17. Exemplo: subtrair a interseção evita contá-la duas vezes.','12+9-4'),
 calc('Um conjunto de 4 elementos possui 8 subconjuntos.',8,2**4,'Um conjunto de n elementos tem 2^n subconjuntos; 2⁴=16. Exemplo: o vazio e o próprio conjunto também são subconjuntos.','2**4'),
 calc('Em uma turma de 30 pessoas, 18 pertencem a A; o complemento de A na turma tem 12 pessoas.',12,30-18,'O complemento tem 30−18=12 integrantes. Exemplo: o universo precisa ser o mesmo conjunto de 30 pessoas.','30-18'),
 item('A negação de “Todos os candidatos compareceram” é “Existe ao menos um candidato que não compareceu”.',True,'Negar uma afirmação universal exige um contraexemplo. Exemplo: uma única ausência já torna falsa a universal.'),
 item('A negação de “Existe servidor que lê o relatório” é “Todos os servidores leem o relatório”.',False,'A negação é “Nenhum servidor lê o relatório”. Exemplo: negar existência exige ausência de qualquer caso que satisfaça a propriedade.'),
 item('Se A é subconjunto de B, todo elemento de A também pertence a B.',True,'Essa é a definição de inclusão. Exemplo: o conjunto dos pares de uma lista está contido no conjunto de todos os números dessa lista.'),
 item('Se A e B são disjuntos, a interseção entre eles é vazia.',True,'Conjuntos disjuntos não compartilham elementos. Exemplo: pares e ímpares inteiros não têm elemento comum.'),
 item('Pertencer a um conjunto e ser subconjunto dele são a mesma relação.',False,'Pertinência relaciona elemento e conjunto; inclusão relaciona conjuntos. Exemplo: 2∈{1,2} e {2}⊆{1,2} expressam relações distintas.'),
 calc('Se 20 pessoas estudam A, 15 estudam B e 8 estudam ambas, exatamente 12 estudam A e não B.',12,20-8,'Os que estudam apenas A são 20−8=12. Exemplo: não se subtrai o total de B, pois ele inclui pessoas fora de A.','20-8'),
 calc('Em um universo de 50 pessoas, se a união de A e B tem 35, há 25 fora de ambos.',25,50-35,'Fora da união há 50−35=15. Exemplo: “fora de ambos” corresponde ao complemento da união.','50-35'),
 item('A interseção A∩B contém somente os elementos que pertencem simultaneamente a A e a B.',True,'A condição é cumulativa. Exemplo: quem estuda duas matérias pertence à interseção dos grupos correspondentes.'),
 item('A diferença A−B contém todos os elementos de B que não estão em A.',False,'A−B contém os elementos de A que não pertencem a B. Exemplo: inverter a ordem muda, em geral, o resultado.')])
put('rlm-contagem-probabilidade-basica',[
 calc('Uma escolha entre 3 camisas e 4 calças independentes permite 12 combinações de uma peça de cada tipo.',12,3*4,'Pelo princípio multiplicativo, 3×4=12. Exemplo: cada camisa pode ser combinada com cada calça.','3*4'),
 calc('Escolher um representante entre 6 pessoas e um suplente distinto permite 15 resultados ordenados.',15,6*5,'Os cargos são distintos: 6 opções para representante e 5 para suplente, total 30. Exemplo: trocar os ocupantes muda o resultado.','6*5'),
 calc('Um comitê de três pessoas escolhido entre seis, sem distinção de cargos, pode ser formado de 20 maneiras.',20,math.comb(6,3),'C(6,3)=6×5×4/(3×2×1)=20. Exemplo: não se contam novamente as permutações das mesmas três pessoas.','comb(6,3)'),
 calc('Uma fila de quatro pessoas distintas admite 24 ordenações.',24,math.factorial(4),'São 4!=4×3×2×1=24. Exemplo: a ordem de ocupação das posições importa.','factorial(4)'),
 calc('Uma moeda honesta lançada três vezes apresenta três caras com probabilidade 1/6.',fractions.Fraction(1,6),fractions.Fraction(1,8),'Os oito resultados ordenados são equiprováveis e apenas CCC atende. Exemplo: também se pode multiplicar 1/2 por si três vezes.','1/8'),
 calc('Ao retirar uma carta numerada de 1 a 10 com chances iguais, a probabilidade de número maior que 7 é 3/10.',fractions.Fraction(3,10),fractions.Fraction(3,10),'Os favoráveis são 8, 9 e 10: três de dez. Exemplo: “maior que 7” não inclui o próprio 7.','3/10'),
 calc('O complemento de um evento com probabilidade 0,72 tem probabilidade 0,28.',.28,1-.72,'As probabilidades de evento e complemento somam 1. Exemplo: 1−0,72=0,28.','1-.72'),
 calc('Uma senha de três letras escolhidas entre cinco opções, com repetição permitida, tem 15 possibilidades.',15,5**3,'São cinco escolhas em cada posição: 5³=125. Exemplo: somar 5+5+5 não conta combinações de três posições.','5**3'),
 calc('Sortear dois objetos sem reposição entre quatro distintos, considerando a ordem, permite 12 pares.',12,4*3,'Há quatro opções no primeiro sorteio e três no segundo. Exemplo: sem reposição, a segunda quantidade diminui.','4*3'),
 calc('Uma urna com 2 bolas verdes e 3 pretas, após retirada de uma verde sem reposição, passa a ter probabilidade 1/4 de verde no próximo sorteio.',fractions.Fraction(1,4),fractions.Fraction(1,4),'Restam uma verde e três pretas: uma em quatro. Exemplo: a condição informa a cor já retirada.','1/4'),
 calc('Se dois eventos independentes têm probabilidades 1/2 e 1/3, a interseção tem probabilidade 1/5.',fractions.Fraction(1,5),fractions.Fraction(1,6),'Na independência, multiplica-se: (1/2)×(1/3)=1/6. Exemplo: somar denominadores não é a operação da interseção.','1/2*1/3'),
 calc('Uma escolha entre dois caminhos alternativos exclusivos com 4 e 3 opções, respectivamente, oferece 7 opções totais.',7,4+3,'Pelo princípio aditivo, opções alternativas e disjuntas são somadas: 4+3=7. Exemplo: o produto seria adequado para etapas sucessivas combinadas.','4+3')])
(P/'calculation-exercises.json').write_text(json.dumps(packs,ensure_ascii=False,indent=2)+'\n');print({s:len(q) for s,q in packs.items()})
