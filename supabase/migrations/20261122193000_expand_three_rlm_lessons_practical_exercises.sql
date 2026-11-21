UPDATE study_materials SET body_md=body_md || '

## Método rápido para decidir a fórmula

**Pergunta 1 — Há etapas sucessivas?** Use o princípio multiplicativo: três opções de camisa e duas de calça produzem 3×2=6 combinações de roupas. **Pergunta 2 — A ordem muda o resultado?** Para escolher presidente e vice entre quatro pessoas, há 4×3=12 possibilidades (arranjo). Para escolher apenas uma dupla entre quatro, há C(4,2)=6 (combinação).

**Sem reposição:** uma urna contém 4 bolas verdes e 2 amarelas. Retirando duas sem devolver, a chance de ambas serem verdes é (4/6)×(3/5)=2/5. O segundo denominador diminui porque uma bola já saiu.

**Probabilidade condicional:** se 8 dos 20 candidatos são mulheres e 3 dessas 8 têm formação específica, a probabilidade de formação específica **sabendo que** a pessoa escolhida é mulher é 3/8, não 3/20. O universo foi restringido.

**Dica de prova:** ''e'' pode indicar interseção; ''ou'' exige atenção à sobreposição; ''sabendo que'' indica condição. A fórmula P(A∪B)=P(A)+P(B)−P(A∩B) evita contar a interseção duas vezes.
',quiz=quiz || '[{"q":"Entre seis pessoas, o número de duplas sem cargos distintos é 15.","a":true,"why":"Certo. Como trocar a ordem não cria dupla diferente, use combinação: C(6,2)=6×5/2=15. Arranjo contaria cada dupla duas vezes."},{"q":"Uma urna tem três bolas vermelhas e duas azuis. Sem reposição, a chance de retirar duas vermelhas seguidas é 3/5 × 3/5.","a":false,"why":"Errado. Sem reposição, após retirar uma vermelha restam duas vermelhas entre quatro bolas. A probabilidade é (3/5)×(2/4)=3/10."}]'::jsonb,updated_at=now() WHERE slug='rlm-acervo-combinatoria-probabilidade' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Método rápido para decidir a fórmula%';
UPDATE study_materials SET body_md=body_md || '

## Treino de identificação de padrões

**PA ou PG?** Na sequência 7, 11, 15, 19, a diferença entre termos é 4: PA. Na sequência 5, 15, 45, 135, cada termo é o anterior multiplicado por 3: PG. Não decida apenas pela aparência dos primeiros números; teste diferenças e razões.

**Termo geral:** se uma PA começa em 12 e cresce 7 por etapa, o oitavo termo é 12+(8−1)×7=61. Em uma PG que começa em 2 e triplica, o quinto termo é 2×3⁴=162.

**Soma de PA:** se uma pessoa deposita 20, 30, 40, 50 e 60 reais em cinco meses, a soma é 5×(20+60)/2=200 reais. O erro comum é multiplicar a última parcela pela quantidade de meses.

**Padrões alternados:** na sequência 2, 10, 4, 20, 6, 30, ... separe posições ímpares (2,4,6) e pares (10,20,30). O sétimo termo é 8. **Dica:** se não houver diferença ou razão constante, procure duas sequências intercaladas.
',quiz=quiz || '[{"q":"Em uma PA com primeiro termo 8 e razão 5, o sexto termo é 33.","a":true,"why":"Certo. Pela fórmula a_n=a_1+(n−1)r, temos a_6=8+5×5=33. Não multiplique a razão por 6: há cinco intervalos entre seis termos."},{"q":"A sequência 3, 9, 27, 81 é uma PA de razão 3.","a":false,"why":"Errado. Os termos são multiplicados por 3, logo é PG de razão 3. As diferenças 6,18,54 não são constantes."}]'::jsonb,updated_at=now() WHERE slug='rlm-acervo-sequencias-progressoes' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Treino de identificação de padrões%';
UPDATE study_materials SET body_md=body_md || '

## Exercícios de matrizes e sistemas

**Dimensões do produto:** se A tem 2 linhas e 3 colunas (2×3) e B tem 3 linhas e 4 colunas (3×4), AB existe e terá dimensão 2×4. Já BA não existe nesse exemplo, pois 4 colunas de B não correspondem às 2 linhas de A.

**Determinante 2×2:** para a matriz [[3,2],[5,4]], det=3×4−2×5=2. Se trocarmos suas duas linhas, o determinante muda de sinal e passa a −2.

**Sistema possível e determinado:** x+y=9 e x−y=3. Somando, 2x=12, então x=6 e y=3. **Sistema impossível:** x+y=5 e x+y=8 exigiria que a mesma soma fosse dois números distintos. **Sistema indeterminado:** x+y=5 e 2x+2y=10 são a mesma condição, permitindo infinitas soluções.

**Dica de prova:** determinante diferente de zero garante solução única em sistema quadrado. Determinante igual a zero exige investigar o sistema; não conclua automaticamente que não existe solução.
',quiz=quiz || '[{"q":"Se A é 2×3 e B é 3×4, o produto AB, quando calculado, tem dimensão 2×4.","a":true,"why":"Certo. As dimensões internas 3 e 3 coincidem, então o produto existe. As dimensões externas determinam o resultado: 2×4."},{"q":"O sistema x+y=4 e 2x+2y=8 é impossível porque as equações são proporcionais.","a":false,"why":"Errado. As equações representam a mesma reta, portanto há infinitas soluções. Proporcionalidade pode indicar sistema indeterminado, não necessariamente impossível."}]'::jsonb,updated_at=now() WHERE slug='rlm-acervo-matrizes-determinantes-sistemas' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Exercícios de matrizes e sistemas%';