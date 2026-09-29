-- Explicações do dia a dia: Matemática, Feijó 2018 (Professor-Pedagogo),
-- itens 16-20. Fecha a matéria "Matemática" (só tinha essas 5 questões).
-- Gabarito já conferido contra o PDF oficial da Fundape em migration
-- anterior (20260927320000); aqui só falta a explicação didática.

-- 16: arroz 3,00/kg, feijão 4,50/kg, calabresa 12,00/kg. Compra: 10×3+2×4,50+5×12=30+9+60=99. Sobra R$1.
update public.official_exam_questions set review_note=$q$Correto. Primeiro acha o preço por quilo: arroz R$ 15,00÷5kg = R$ 3,00/kg; feijão já está em R$ 4,50/kg; calabresa R$ 30,00÷2,5kg = R$ 12,00/kg. Agora a compra: 10kg de arroz (R$ 30,00) + 2kg de feijão (R$ 9,00) + 5kg de calabresa (R$ 60,00) = R$ 99,00. Com R$ 100,00 na mão, sobra exatamente R$ 1,00.
Exemplo: é a mesma conta que você faz na cabeça no mercado — descobrir o "preço por unidade" de cada produto antes de multiplicar pela quantidade que você realmente vai levar, pra não errar o total.$q$
where exam_year=2018 and item_number=16 and career_name='Professor - Licenciatura Plena - Pedagogo' and official_answer='D';

-- 17: descontos somados = 14%+10%+1%=25%. Líquido = 2000×0,75=1500.
update public.official_exam_questions set review_note=$q$Correto. Somando todos os descontos: 14% (INSS) + 10% (empréstimo) + 1% (sindicato) = 25% do salário bruto. Salário líquido = R$ 2.000,00 × (1 − 0,25) = R$ 2.000,00 × 0,75 = R$ 1.500,00.
Exemplo: é como somar todos os "pedaços" que saem do seu contracheque antes de descontar tudo de uma vez do salário total — mais fácil que descontar item por item, um de cada vez.$q$
where exam_year=2018 and item_number=17 and career_name='Professor - Licenciatura Plena - Pedagogo' and official_answer='B';

-- 18: probabilidade condicional (P(vôlei | masculino)) lida direto de uma tabela cruzada — resposta 20% conforme gabarito oficial.
update public.official_exam_questions set review_note=$q$Correto (conforme gabarito oficial da Fundape — a tabela original com os números por sexo e esporte não está disponível neste registro, mas o método de resolução é este). Quando a pergunta é "dado que o aluno é do sexo masculino, qual a chance de ele ter escolhido vôlei", você ignora TODAS as alunas da tabela e olha só a linha (ou coluna) dos meninos: divide quantos meninos escolheram vôlei pelo total de meninos — não pelo total geral da escola.
Exemplo: é como perguntar "dos homens que estão nessa sala, quantos torcem pro seu time?" — você só conta quem já está dentro do grupo "homens", ignora as mulheres da sala inteira, mesmo que elas também estejam lá.$q$
where exam_year=2018 and item_number=18 and career_name='Professor - Licenciatura Plena - Pedagogo' and official_answer='A';

-- 19: 363km=36.300.000cm ÷ 30cm = 1.210.000 medições.
update public.official_exam_questions set review_note=$q$Correto. Primeiro converte tudo pra centímetros (a unidade da régua): 363 km = 363.000 m = 36.300.000 cm. Agora divide pela régua de 30 cm: 36.300.000 ÷ 30 = 1.210.000 medições. O truque da questão é lembrar de converter TUDO pra mesma unidade antes de dividir.
Exemplo: é a mesma ideia de "quantos passos eu daria pra andar até a esquina" — primeiro converte a distância toda pra centímetros (ou pra tamanho do seu passo), senão a divisão não faz sentido.$q$
where exam_year=2018 and item_number=19 and career_name='Professor - Licenciatura Plena - Pedagogo' and official_answer='C';

-- 20: juros fixos de R$10/mês sobre saldo/empréstimo = progressão aritmética de razão 10 (característica de juros simples, diferente de juros compostos que cresceriam em progressão geométrica).
update public.official_exam_questions set review_note=$q$Correto. Como os juros são sempre R$ 10,00 fixos por mês (um valor igual se repetindo), o total acumulado ao longo dos meses cresce como uma progressão aritmética de razão R$ 10,00 — soma sempre a mesma quantia fixa a cada passo. Isso é a marca registrada dos juros SIMPLES; juros compostos cresceriam multiplicando por uma taxa fixa a cada mês (progressão geométrica), gerando valores crescentes cada vez maiores, não sempre iguais.
Exemplo: é a diferença entre economizar sempre R$ 10 por mês (soma fixa, PA) e deixar o dinheiro rendendo 1% ao mês sobre o que já tem (o valor que rende cresce a cada mês, PG) — no segundo caso, o "ganho mensal" aumenta com o tempo; no primeiro, é sempre igual.$q$
where exam_year=2018 and item_number=20 and career_name='Professor - Licenciatura Plena - Pedagogo' and official_answer='E';
