UPDATE study_materials SET body_md=body_md || '

## Resolução orientada: álgebra e gráficos

**Função afim:** uma corrida custa R$ 8 fixos mais R$ 3 por quilômetro. A função é f(x)=8+3x. Para 6 km, f(6)=26. O coeficiente 3 é a variação por quilômetro; 8 é o valor inicial.

**Inequação com número negativo:** -4x ≤ 20. Divida por -4 e inverta o sinal: x ≥ -5. Para conferir, x=0 produz 0≤20, uma afirmação verdadeira.

**Função quadrática:** f(x)=x²−6x+8 tem raízes 2 e 4, porque (x−2)(x−4)=0. O vértice está em x=3 e f(3)=-1. Como a>0, o gráfico abre para cima.

**Técnica de prova:** identifique se a pergunta pede valor, raiz, crescimento ou vértice; não aplique a fórmula de Bhaskara quando a fatoração simples resolve rapidamente.
',quiz=quiz || '[{"q":"Uma função f(x)=12+4x representa uma taxa fixa de 12 e acréscimo de 4 por unidade. Para x=5, f(x)=32.","a":true,"why":"Certo. Substitua x por 5: f(5)=12+4×5=32. O termo constante é a taxa fixa."},{"q":"Ao resolver -5x<15, obtém-se x<-3.","a":false,"why":"Errado. Dividir ambos os membros por -5 inverte a desigualdade. Portanto, x>-3."}]'::jsonb,updated_at=now() WHERE slug='rlm-acervo-algebra-funcoes' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Resolução orientada: álgebra e gráficos%';
UPDATE study_materials SET body_md=body_md || '

## Laboratório de negações e equivalências

**Condicional:** ''Se o candidato estudou, então acertou'' é falso apenas quando estudou e não acertou. A negação mantém a primeira parte afirmada e nega a segunda: ''estudou e não acertou''.

**Contrapositiva:** ''Se há flagrante, então há situação de urgência'' tem a mesma estrutura lógica de ''Se não há situação de urgência, então não há flagrante''. A equivalência formal não garante que a premissa descreva corretamente a realidade: lógica e veracidade factual são questões distintas.

**De Morgan:** negar ''Ana revisou e Bruno fez simulados'' produz ''Ana não revisou ou Bruno não fez simulados''. Negar ''Ana revisou ou Bruno fez simulados'' produz ''Ana não revisou e Bruno não fez simulados''.

**Quantificadores:** a negação de ''todos os relatórios estão completos'' é ''existe pelo menos um relatório incompleto''. Não é necessário afirmar que todos estão incompletos.

**Dica:** procure primeiro o conectivo principal; depois aplique a regra correspondente, sem trocar ''e'' por ''ou'' fora do contexto de negação.
',quiz=quiz || '[{"q":"A negação de ''Todos os servidores participaram'' é ''Pelo menos um servidor não participou''.","a":true,"why":"Certo. Negar uma afirmação universal exige apresentar ao menos um contraexemplo. Não é preciso que todos tenham faltado."},{"q":"A negação de p∨q é ¬p∨¬q.","a":false,"why":"Errado. Pela lei de De Morgan, a negação de p∨q é ¬p∧¬q. Para negar um ''ou'', ambas as alternativas devem ser falsas."}]'::jsonb,updated_at=now() WHERE slug='rlm-acervo-logica-proposicional' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Laboratório de negações e equivalências%';
UPDATE study_materials SET body_md=body_md || '

## Exercícios resolvidos de área, volume e trigonometria

**Área de triângulo:** uma placa triangular tem base 10 cm e altura 6 cm. Área =10×6/2=30 cm². Não use a medida do lado inclinado como altura sem verificar se ele é perpendicular à base.

**Volume de cilindro:** um reservatório cilíndrico de raio 2 m e altura 5 m tem volume V=π×2²×5=20π m³. O raio deve ser elevado ao quadrado; se o enunciado der diâmetro, divida-o por 2 antes de calcular.

**Semelhança:** dobrar todas as dimensões lineares de uma figura multiplica a área por 4 e o volume por 8. Essa diferença entre unidades quadradas e cúbicas é recorrente em questões.

**Trigonometria:** em um triângulo retângulo de lados 5,12,13, para o ângulo oposto ao lado 5, seno=5/13, cosseno=12/13 e tangente=5/12. Marque o ângulo antes de nomear os catetos.
',quiz=quiz || '[{"q":"Um triângulo com base de 12 cm e altura perpendicular de 5 cm tem área de 30 cm².","a":true,"why":"Certo. A área é base vezes altura dividida por dois: 12×5/2=30 cm²."},{"q":"Se o raio de um cilindro dobra e sua altura permanece constante, o volume também dobra.","a":false,"why":"Errado. O volume é V=πr²h. Dobrar o raio multiplica r² por quatro, então o volume quadruplica."}]'::jsonb,updated_at=now() WHERE slug='rlm-acervo-geometria-trigonometria' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Exercícios resolvidos de área, volume e trigonometria%';
UPDATE study_materials SET body_md=body_md || '

## Como testar argumentos sem decorar frases

**Modus ponens:** ''Se o documento é válido, então pode ser aceito. O documento é válido. Logo, pode ser aceito.'' A conclusão decorre da estrutura p→q; p; portanto q.

**Modus tollens:** ''Se o sistema está conectado, então recebe mensagens. O sistema não recebe mensagens. Logo, não está conectado.'' A estrutura p→q; ¬q; portanto ¬p é válida.

**Erro de afirmar o consequente:** ''Se estudo, então aprendo. Aprendi. Logo, estudei.'' A aprendizagem poderia ter outra origem; o argumento é inválido.

**Problemas de associação:** desenhe uma tabela com pessoas nas linhas e atributos nas colunas. Registre fatos positivos e negativos; só faça deduções quando uma possibilidade for eliminada. **Dica:** em questões de verdade e mentira, uma hipótese que contradiz qualquer pista deve ser descartada.
',quiz=quiz || '[{"q":"De ''Se P, então Q'' e ''Não Q'' é válido concluir ''Não P''.","a":true,"why":"Certo. É a forma válida modus tollens: p→q, ¬q, logo ¬p. Não confunda com afirmar o consequente."},{"q":"De ''Se P, então Q'' e ''Q'' é sempre válido concluir ''P''.","a":false,"why":"Errado. É a falácia de afirmar o consequente. Q pode ocorrer por outros motivos, mesmo quando P não ocorre."}]'::jsonb,updated_at=now() WHERE slug='rlm-acervo-argumentacao-associacao' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Como testar argumentos sem decorar frases%';