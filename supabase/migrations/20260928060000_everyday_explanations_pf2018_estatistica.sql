-- Explicações do dia a dia: PF 2018 (Agente), Estatística, itens 41-50.
-- Mesmo padrão das migrations anteriores (RLM, Português/Informática):
-- explicação com a conta refeita + bloco "Exemplo:" com analogia do
-- cotidiano. Cada conta foi reconferida do zero antes de escrever a
-- explicação (ver contas abaixo nos comentários).

-- Item 41: X~Binomial(n=4, p=0,25). P(exatamente 1 sucesso) = C(4,1)*0,25*0,75^3 = 4*0,25*0,421875 = 0,421875 > 0,4.
update public.official_exam_questions set review_note=$q$Correto. Com 4 pessoas e chance individual de 0,25 (25%) de reincidir, a chance de EXATAMENTE 1 delas reincidir é: C(4,1) × 0,25¹ × 0,75³ = 4 × 0,25 × 0,421875 = 0,421875 — passa de 0,4, como o item afirma.
Exemplo: é a mesma conta de "qual a chance de exatamente 1 em 4 apostas darem certo", quando cada aposta tem 25% de chance sozinha — você soma as 4 formas diferentes de só uma delas dar certo (a 1ª, a 2ª, a 3ª ou a 4ª) e multiplica pela chance de cada combinação.$q$
where exam_year=2018 and item_number=41 and career_name='Agente de Polícia Federal' and official_answer='C';

-- Item 42: erro padrão = sqrt(p(1-p)/n) = sqrt(0,25*0,75/1875) = sqrt(0,0001) = 0,01.
update public.official_exam_questions set review_note=$q$Correto. O erro padrão de uma proporção estimada é √(p×(1-p)/n). Aqui: √(0,25 × 0,75 / 1.875) = √0,0001 = 0,01 — bate exatamente com o item.
Exemplo: quanto maior a amostra (aqui, 1.875 processos), menor o "tremor" da estimativa — é a mesma lógica de uma pesquisa eleitoral: entrevistar mais gente deixa o resultado mais estável e o erro menor.$q$
where exam_year=2018 and item_number=42 and career_name='Agente de Polícia Federal' and official_answer='C';

-- Item 43: IC 95% = p ± z*erro padrão = 0,25 ± 2*0,01 = 0,25 ± 0,02 (não ±0,05).
update public.official_exam_questions set review_note=$q$Errado. O enunciado já deu a pista: P(Z<2)=0,975, ou seja, o "z" do intervalo de 95% de confiança aqui é 2. O intervalo correto é p ± z×erro padrão = 0,25 ± 2×0,01 = 0,25 ± 0,02 — não ±0,05 como o item diz.
Exemplo: é a margem de erro que aparece em pesquisa ("47%, com margem de erro de 2 pontos") — o item trocou essa margem por um valor maior do que a conta permite.$q$
where exam_year=2018 and item_number=43 and career_name='Agente de Polícia Federal' and official_answer='E';

-- Item 44: média da binomial(n=1000,p=0,25) = n*p = 250, não >300.
update public.official_exam_questions set review_note=$q$Errado. A média de uma distribuição binomial é sempre n×p. Aqui: 1.000 × 0,25 = 250 — não passa de 300 como o item afirma.
Exemplo: se 25% dos processos de uma vara realmente terminam em reincidência, em 1.000 processos o esperado é 250 reincidências, não mais que 300 — é só multiplicar o total pela taxa.$q$
where exam_year=2018 and item_number=44 and career_name='Agente de Polícia Federal' and official_answer='E';

-- Item 45: R² = SQmodelo/SQtotal = 225/400 = 0,5625; r = sqrt(R²) = 0,75 (b>0 então r positivo).
update public.official_exam_questions set review_note=$q$Correto. A tabela ANOVA dá SQ do modelo = 225 e SQ total = 400. A fração explicada pelo modelo (R²) é 225/400 = 0,5625, e a correlação de Pearson é a raiz quadrada disso: √0,5625 = 0,75. Como o enunciado avisa que b>0 (a reta sobe), a correlação também é positiva: 0,75.
Exemplo: R² é "quanto da variação em Y o modelo explica" — aqui 56,25% da variação na taxa de criminalidade é explicada pela taxa de desocupação. Tirar a raiz quadrada desse percentual (em fração) dá a força da correlação, de 0 a 1.$q$
where exam_year=2018 and item_number=45 and career_name='Agente de Polícia Federal' and official_answer='C';

-- Item 46: variância residual = QMerro = SQerro/gl_erro = 175/899 ≈ 0,1946, não >0,5.
update public.official_exam_questions set review_note=$q$Errado. A estimativa da variância do erro é a soma de quadrados do erro dividida pelos seus graus de liberdade: 175 / 899 ≈ 0,1946 — bem menor que 0,5, ao contrário do que o item afirma.
Exemplo: é a mesma ideia de calcular uma média (soma dividida pela quantidade), só que aqui a "soma" é o quanto o modelo errou ao todo (175) e a "quantidade" são os graus de liberdade que sobraram depois de ajustar a reta (899).$q$
where exam_year=2018 and item_number=46 and career_name='Agente de Polícia Federal' and official_answer='E';

-- Item 47: Sxx = (n-1)*var(x) = 900*4 = 3600; SQmodelo = b²*Sxx -> b² = 225/3600 = 0,0625 -> b=0,25 (b>0).
update public.official_exam_questions set review_note=$q$Correto. Com 900 graus de liberdade no total, a amostra tem 901 observações, então Sxx = 900 × (desvio padrão de X)² = 900 × 2² = 3.600. Como a soma de quadrados do modelo é b² × Sxx, temos 225 = b² × 3.600 → b² = 0,0625 → b = 0,25 (a raiz positiva, já que o enunciado garante b>0).
Exemplo: é encaixar as peças que já foram dadas na questão (SQ do modelo, desvio padrão de X, graus de liberdade) numa fórmula pronta — o "truque" é lembrar que graus de liberdade do total = n−1, pra achar o n certo primeiro.$q$
where exam_year=2018 and item_number=47 and career_name='Agente de Polícia Federal' and official_answer='C';

-- Item 48: soma de 2 normais independentes: var soma = var1+var2 = 16+16=32, sd=sqrt(32)≈5,66, não 8.
update public.official_exam_questions set review_note=$q$Errado. Quando duas variáveis normais independentes se somam, as VARIÂNCIAS se somam, não os desvios padrão. Aqui: variância de cada uma é 4²=16; a soma das variâncias é 32; o desvio padrão da soma é √32 ≈ 5,66 mil — não R$ 8 mil (que seria só somar 4+4, contra errada).
Exemplo: é um erro comum: juntar dois valores "incertos" não soma as incertezas direto, soma o quadrado delas e depois tira a raiz — como juntar dois erros de medição de uma trena, o erro total cresce menos do que a soma simples dos dois.$q$
where exam_year=2018 and item_number=48 and career_name='Agente de Polícia Federal' and official_answer='E';

-- Item 49: normal é simétrica em torno da média, P(W>media)=0,5 sempre.
update public.official_exam_questions set review_note=$q$Correto. Numa distribuição normal, a média fica exatamente no centro da curva, que é simétrica — metade dos valores fica acima da média, metade abaixo. Por isso P(W > R$ 10 mil) = 0,5 exatamente, sem precisar de nenhuma conta com desvio padrão.
Exemplo: é como a média de altura de uma sala bem misturada — metade das pessoas é mais alta que a média, metade é mais baixa, sempre, não importa o quanto elas variem entre si.$q$
where exam_year=2018 and item_number=49 and career_name='Agente de Polícia Federal' and official_answer='C';

-- Item 50: padronização correta é (W-10)/4, não (W-20)/raiz(4)=(W-20)/2.
update public.official_exam_questions set review_note=$q$Errado. Pra "padronizar" uma normal (transformar em Z, média 0 e desvio padrão 1), a fórmula é (valor − média) / desvio padrão. Aqui seria (W − 10) / 4. O item troca a média certa (10) por 20 e usa √4=2 no lugar do desvio padrão real (4) — dois erros na mesma fórmula.
Exemplo: é como converter Celsius pra outra escala usando a fórmula errada — se você troca os números da fórmula (mesmo que pareçam "parecidos"), o resultado sai todo torto, mesmo a ideia geral estando certa.$q$
where exam_year=2018 and item_number=50 and career_name='Agente de Polícia Federal' and official_answer='E';
