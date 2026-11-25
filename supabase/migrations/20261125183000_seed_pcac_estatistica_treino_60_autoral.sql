-- Treino autoral de Estatística do PC-AC 2026: 60 questões no padrão IDECAN.
-- Questões autorais, geradas com cálculo automático e conferidas por código.
-- Não são itens oficiais da IDECAN; exam_board e didactic_provenance deixam isso explícito.
-- Vincula ao tópico Estatística do edital PC-AC 2026 (Oficial Investigador) e é idempotente.

do $$
declare
  v_source uuid := '43712f0d-aad2-48b5-a685-6937551f2d74';
  v_topic uuid;
begin
  select st.id into v_topic
  from public.syllabus_topics st
  join public.syllabus_editions se on se.id = st.edition_id
  where se.contest_name = 'Polícia Civil do Acre'
    and se.role_name = 'Oficial Investigador de Polícia'
    and se.contest_year = 2026
    and st.discipline = 'Estatística'
  limit 1;
  if v_topic is null then
    raise exception 'Tópico Estatística do edital PC-AC 2026 não encontrado';
  end if;

  insert into public.curated_question_catalog
    (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board,
     subject, subtopic, question_text, official_answer, explanation, difficulty, content_status, is_original,
     state, career_category, role_type, tested_topic, import_content_key, import_unique_key, didactic_provenance)
  select
    v_source, v_topic, v.k, 'Norte Concursos — treino autoral PC-AC 2026', 2026, 'Oficial Investigador de Polícia',
    'AUTORAL', 'Estatística', v.sub, v.txt, v.ans, v.expl, v.diff, 'active', true,
    'AC', 'Polícia Civil', 'Oficial Investigador de Polícia', v.sub, v.k, 'pcac-2026-' || v.k,
    jsonb_build_object('kind', 'didactic_original', 'authored', true,
      'target_exam', 'PC-AC 2026 — Oficial Investigador de Polícia', 'not_official_exam', true,
      'license_note', 'Questão autoral inédita; não é item oficial da IDECAN',
      'source_exam_reference', 'Edital nº 001 SEAD/PCAC, de 05/11/2026, Anexo III',
      'generation', 'modelos IDECAN de estatística com cálculo automático, conferidos por código')
  from (values
  ($q$pcac-treino-est-001$q$, $q$Medidas de tendência central$q$, $q$média$q$, $q$Em uma avaliação de desempenho, um servidor da PC-AC teve as notas 8,5 em casos solucionados, 6,5 em provas de tiro e 5,2 em relatórios de campo. Os pesos são 5, 4 e 2, nessa ordem. A média ponderada das notas é igual a:

A) 7,17
B) 6,27
C) 6,73
D) 26,3
E) 7,67$q$, $q$A$q$, $q$Passo 1: multiplique cada nota pelo seu peso. 8,5 × 5 = 42,5; 6,5 × 4 = 26; 5,2 × 2 = 10,4. Passo 2: some os produtos: 78,9. Passo 3: divida pela soma dos pesos, 11: 78,9 ÷ 11 = <b>7,17</b>. A média simples daria 6,73, mas ela ignora o peso de cada prova. Macete: Média ponderada = soma(nota × peso) ÷ soma dos pesos. Nunca divida por 3 quando os pesos não são iguais.$q$),
  ($q$pcac-treino-est-002$q$, $q$Medidas de tendência central$q$, $q$média$q$, $q$Em uma avaliação de desempenho, um servidor da PC-AC teve as notas 8,9 em engajamento comunitário, 7,8 em casos solucionados e 9,8 em relatórios de campo. Os pesos são 1, 5 e 3, nessa ordem. A média ponderada das notas é igual a:

A) 25,77
B) 8,59
C) 8,83
D) 8,39
E) 9,09$q$, $q$B$q$, $q$Passo 1: multiplique cada nota pelo seu peso. 8,9 × 1 = 8,9; 7,8 × 5 = 39; 9,8 × 3 = 29,4. Passo 2: some os produtos: 77,3. Passo 3: divida pela soma dos pesos, 9: 77,3 ÷ 9 = <b>8,59</b>. A média simples daria 8,83, mas ela ignora o peso de cada prova. Macete: Média ponderada = soma(nota × peso) ÷ soma dos pesos. Nunca divida por 3 quando os pesos não são iguais.$q$),
  ($q$pcac-treino-est-003$q$, $q$Medidas de tendência central$q$, $q$média$q$, $q$Em uma avaliação de desempenho, um servidor da PC-AC teve as notas 6,8 em casos solucionados, 9,6 em perícias concluídas e 9,1 em provas de tiro. Os pesos são 5, 2 e 1, nessa ordem. A média ponderada das notas é igual a:

A) 8,29
B) 20,77
C) 7,79
D) 8,5
E) 8,94$q$, $q$C$q$, $q$Passo 1: multiplique cada nota pelo seu peso. 6,8 × 5 = 34; 9,6 × 2 = 19,2; 9,1 × 1 = 9,1. Passo 2: some os produtos: 62,3. Passo 3: divida pela soma dos pesos, 8: 62,3 ÷ 8 = <b>7,79</b>. A média simples daria 8,5, mas ela ignora o peso de cada prova. Macete: Média ponderada = soma(nota × peso) ÷ soma dos pesos. Nunca divida por 3 quando os pesos não são iguais.$q$),
  ($q$pcac-treino-est-004$q$, $q$Medidas de tendência central$q$, $q$média$q$, $q$Em uma avaliação de desempenho, um servidor da PC-AC teve as notas 9,2 em relatórios de campo, 7 em provas de tiro e 9,9 em perícias concluídas. Os pesos são 2, 3 e 5, nessa ordem. A média ponderada das notas é igual a:

A) 8,7
B) 8,68
C) 29,63
D) 8,89
E) 9,39$q$, $q$D$q$, $q$Passo 1: multiplique cada nota pelo seu peso. 9,2 × 2 = 18,4; 7 × 3 = 21; 9,9 × 5 = 49,5. Passo 2: some os produtos: 88,9. Passo 3: divida pela soma dos pesos, 10: 88,9 ÷ 10 = <b>8,89</b>. A média simples daria 8,7, mas ela ignora o peso de cada prova. Macete: Média ponderada = soma(nota × peso) ÷ soma dos pesos. Nunca divida por 3 quando os pesos não são iguais.$q$),
  ($q$pcac-treino-est-005$q$, $q$Medidas de tendência central$q$, $q$média$q$, $q$Em uma avaliação de desempenho, um servidor da PC-AC teve as notas 9,8 em provas de tiro, 9,8 em perícias concluídas e 7 em casos solucionados. Os pesos são 6, 5 e 4, nessa ordem. A média ponderada das notas é igual a:

A) 9,55
B) 8,87
C) 45,27
D) 8,68
E) 9,05$q$, $q$E$q$, $q$Passo 1: multiplique cada nota pelo seu peso. 9,8 × 6 = 58,8; 9,8 × 5 = 49; 7 × 4 = 28. Passo 2: some os produtos: 135,8. Passo 3: divida pela soma dos pesos, 15: 135,8 ÷ 15 = <b>9,05</b>. A média simples daria 8,87, mas ela ignora o peso de cada prova. Macete: Média ponderada = soma(nota × peso) ÷ soma dos pesos. Nunca divida por 3 quando os pesos não são iguais.$q$),
  ($q$pcac-treino-est-006$q$, $q$Medidas de tendência central$q$, $q$média$q$, $q$Em uma avaliação de desempenho, um servidor da PC-AC teve as notas 9,5 em engajamento comunitário, 7,8 em perícias concluídas e 5,9 em casos solucionados. Os pesos são 2, 4 e 5, nessa ordem. A média ponderada das notas é igual a:

A) 7,25
B) 7,73
C) 7,75
D) 26,57
E) 8,23$q$, $q$A$q$, $q$Passo 1: multiplique cada nota pelo seu peso. 9,5 × 2 = 19; 7,8 × 4 = 31,2; 5,9 × 5 = 29,5. Passo 2: some os produtos: 79,7. Passo 3: divida pela soma dos pesos, 11: 79,7 ÷ 11 = <b>7,25</b>. A média simples daria 7,73, mas ela ignora o peso de cada prova. Macete: Média ponderada = soma(nota × peso) ÷ soma dos pesos. Nunca divida por 3 quando os pesos não são iguais.$q$),
  ($q$pcac-treino-est-007$q$, $q$Medidas de dispersão$q$, $q$média$q$, $q$Em um estande de tiro da Polícia Civil, uma amostra de 5 disparos de um agente teve as pontuações 8, 21, 16, 3 e 30. O desvio padrão amostral dessas pontuações é igual a, aproximadamente:

A) 21,29
B) 10,64
C) 9,52
D) 90,64
E) 113,3$q$, $q$B$q$, $q$Passo 1: média = 15,6. Passo 2: desvios: -7,6; 5,4; 0,4; -12,6; 14,4. Passo 3: quadrados: 57,76, 29,16, 0,16, 158,76, 207,36; soma = 453,2. Passo 4: amostra divide por n − 1 = 4: 453,2 ÷ 4 = 113,3 (variância amostral). Passo 5: raiz quadrada: √113,3 = <b>10,64</b>. Se dividir por 5, o resultado seria 9,52, que é o desvio populacional. Macete: Amostra: divida a soma dos quadrados por n − 1 e só depois tire a raiz. Esquecer o n − 1 é o erro mais comum.$q$),
  ($q$pcac-treino-est-008$q$, $q$Medidas de dispersão$q$, $q$média$q$, $q$Em um estande de tiro da Polícia Civil, uma amostra de 5 disparos de um agente teve as pontuações 25, 22, 8, 11 e 17. O desvio padrão amostral dessas pontuações é igual a, aproximadamente:

A) 41,04
B) 51,3
C) 7,16
D) 14,32
E) 6,41$q$, $q$C$q$, $q$Passo 1: média = 16,6. Passo 2: desvios: 8,4; 5,4; -8,6; -5,6; 0,4. Passo 3: quadrados: 70,56, 29,16, 73,96, 31,36, 0,16; soma = 205,2. Passo 4: amostra divide por n − 1 = 4: 205,2 ÷ 4 = 51,3 (variância amostral). Passo 5: raiz quadrada: √51,3 = <b>7,16</b>. Se dividir por 5, o resultado seria 6,41, que é o desvio populacional. Macete: Amostra: divida a soma dos quadrados por n − 1 e só depois tire a raiz. Esquecer o n − 1 é o erro mais comum.$q$),
  ($q$pcac-treino-est-009$q$, $q$Medidas de dispersão$q$, $q$média$q$, $q$Em um estande de tiro da Polícia Civil, uma amostra de 5 disparos de um agente teve as pontuações 4, 5, 19, 23 e 14. O desvio padrão amostral dessas pontuações é igual a, aproximadamente:

A) 70,5
B) 16,79
C) 7,51
D) 8,4
E) 56,4$q$, $q$D$q$, $q$Passo 1: média = 13. Passo 2: desvios: -9; -8; 6; 10; 1. Passo 3: quadrados: 81, 64, 36, 100, 1; soma = 282. Passo 4: amostra divide por n − 1 = 4: 282 ÷ 4 = 70,5 (variância amostral). Passo 5: raiz quadrada: √70,5 = <b>8,4</b>. Se dividir por 5, o resultado seria 7,51, que é o desvio populacional. Macete: Amostra: divida a soma dos quadrados por n − 1 e só depois tire a raiz. Esquecer o n − 1 é o erro mais comum.$q$),
  ($q$pcac-treino-est-010$q$, $q$Medidas de dispersão$q$, $q$média$q$, $q$Em um estande de tiro da Polícia Civil, uma amostra de 5 disparos de um agente teve as pontuações 30, 24, 28, 19 e 7. O desvio padrão amostral dessas pontuações é igual a, aproximadamente:

A) 8,21
B) 18,36
C) 67,44
D) 84,3
E) 9,18$q$, $q$E$q$, $q$Passo 1: média = 21,6. Passo 2: desvios: 8,4; 2,4; 6,4; -2,6; -14,6. Passo 3: quadrados: 70,56, 5,76, 40,96, 6,76, 213,16; soma = 337,2. Passo 4: amostra divide por n − 1 = 4: 337,2 ÷ 4 = 84,3 (variância amostral). Passo 5: raiz quadrada: √84,3 = <b>9,18</b>. Se dividir por 5, o resultado seria 8,21, que é o desvio populacional. Macete: Amostra: divida a soma dos quadrados por n − 1 e só depois tire a raiz. Esquecer o n − 1 é o erro mais comum.$q$),
  ($q$pcac-treino-est-011$q$, $q$Medidas de dispersão$q$, $q$média$q$, $q$Em um estande de tiro da Polícia Civil, uma amostra de 5 disparos de um agente teve as pontuações 20, 27, 12, 24 e 22. O desvio padrão amostral dessas pontuações é igual a, aproximadamente:

A) 5,66
B) 11,31
C) 25,6
D) 32
E) 5,06$q$, $q$A$q$, $q$Passo 1: média = 21. Passo 2: desvios: -1; 6; -9; 3; 1. Passo 3: quadrados: 1, 36, 81, 9, 1; soma = 128. Passo 4: amostra divide por n − 1 = 4: 128 ÷ 4 = 32 (variância amostral). Passo 5: raiz quadrada: √32 = <b>5,66</b>. Se dividir por 5, o resultado seria 5,06, que é o desvio populacional. Macete: Amostra: divida a soma dos quadrados por n − 1 e só depois tire a raiz. Esquecer o n − 1 é o erro mais comum.$q$),
  ($q$pcac-treino-est-012$q$, $q$Medidas de dispersão$q$, $q$média$q$, $q$Em um estande de tiro da Polícia Civil, uma amostra de 5 disparos de um agente teve as pontuações 16, 8, 20, 11 e 2. O desvio padrão amostral dessas pontuações é igual a, aproximadamente:

A) 6,25
B) 6,99
C) 39,04
D) 13,97
E) 48,8$q$, $q$B$q$, $q$Passo 1: média = 11,4. Passo 2: desvios: 4,6; -3,4; 8,6; -0,4; -9,4. Passo 3: quadrados: 21,16, 11,56, 73,96, 0,16, 88,36; soma = 195,2. Passo 4: amostra divide por n − 1 = 4: 195,2 ÷ 4 = 48,8 (variância amostral). Passo 5: raiz quadrada: √48,8 = <b>6,99</b>. Se dividir por 5, o resultado seria 6,25, que é o desvio populacional. Macete: Amostra: divida a soma dos quadrados por n − 1 e só depois tire a raiz. Esquecer o n − 1 é o erro mais comum.$q$),
  ($q$pcac-treino-est-013$q$, $q$Probabilidade$q$, $q$média$q$, $q$Em um lote de 19 celulares apreendidos, 3 têm IMEI adulterado. Dois aparelhos são sorteados, um após o outro, sem reposição. A probabilidade de os dois terem IMEI adulterado é igual a, aproximadamente:

A) 11,11%
B) 1,66%
C) 1,75%
D) 2,63%
E) 2,49%$q$, $q$C$q$, $q$Passo 1: na primeira retirada, a chance é 3/19. Passo 2: sem reposição, sobram 18 aparelhos e 2 adulterados, então a segunda chance é 2/18. Passo 3: multiplique: 3/19 × 2/18 = 1/57 = <b>1,75%</b>. Se a reposição fosse feita, o denominador não mudaria e a conta seria (3/19)² = 2,49%. Macete: Sem reposição: o denominador e o número de favoráveis diminuem juntos na segunda retirada.$q$),
  ($q$pcac-treino-est-014$q$, $q$Probabilidade$q$, $q$média$q$, $q$Em um lote de 10 celulares apreendidos, 3 têm IMEI adulterado. Dois aparelhos são sorteados, um após o outro, sem reposição. A probabilidade de os dois terem IMEI adulterado é igual a, aproximadamente:

A) 10%
B) 9%
C) 6%
D) 6,67%
E) 22,22%$q$, $q$D$q$, $q$Passo 1: na primeira retirada, a chance é 3/10. Passo 2: sem reposição, sobram 9 aparelhos e 2 adulterados, então a segunda chance é 2/9. Passo 3: multiplique: 3/10 × 2/9 = 1/15 = <b>6,67%</b>. Se a reposição fosse feita, o denominador não mudaria e a conta seria (3/10)² = 9%. Macete: Sem reposição: o denominador e o número de favoráveis diminuem juntos na segunda retirada.$q$),
  ($q$pcac-treino-est-015$q$, $q$Probabilidade$q$, $q$média$q$, $q$Em um lote de 13 celulares apreendidos, 4 têm IMEI adulterado. Dois aparelhos são sorteados, um após o outro, sem reposição. A probabilidade de os dois terem IMEI adulterado é igual a, aproximadamente:

A) 7,1%
B) 9,47%
C) 10,26%
D) 25%
E) 7,69%$q$, $q$E$q$, $q$Passo 1: na primeira retirada, a chance é 4/13. Passo 2: sem reposição, sobram 12 aparelhos e 3 adulterados, então a segunda chance é 3/12. Passo 3: multiplique: 4/13 × 3/12 = 1/13 = <b>7,69%</b>. Se a reposição fosse feita, o denominador não mudaria e a conta seria (4/13)² = 9,47%. Macete: Sem reposição: o denominador e o número de favoráveis diminuem juntos na segunda retirada.$q$),
  ($q$pcac-treino-est-016$q$, $q$Probabilidade$q$, $q$média$q$, $q$Em um lote de 20 celulares apreendidos, 7 têm IMEI adulterado. Dois aparelhos são sorteados, um após o outro, sem reposição. A probabilidade de os dois terem IMEI adulterado é igual a, aproximadamente:

A) 11,05%
B) 10,5%
C) 12,25%
D) 31,58%
E) 12,89%$q$, $q$A$q$, $q$Passo 1: na primeira retirada, a chance é 7/20. Passo 2: sem reposição, sobram 19 aparelhos e 6 adulterados, então a segunda chance é 6/19. Passo 3: multiplique: 7/20 × 6/19 = 21/190 = <b>11,05%</b>. Se a reposição fosse feita, o denominador não mudaria e a conta seria (7/20)² = 12,25%. Macete: Sem reposição: o denominador e o número de favoráveis diminuem juntos na segunda retirada.$q$),
  ($q$pcac-treino-est-017$q$, $q$Probabilidade$q$, $q$média$q$, $q$Em um lote de 16 celulares apreendidos, 8 têm IMEI adulterado. Dois aparelhos são sorteados, um após o outro, sem reposição. A probabilidade de os dois terem IMEI adulterado é igual a, aproximadamente:

A) 25%
B) 23,33%
C) 46,67%
D) 26,67%
E) 21,88%$q$, $q$B$q$, $q$Passo 1: na primeira retirada, a chance é 8/16. Passo 2: sem reposição, sobram 15 aparelhos e 7 adulterados, então a segunda chance é 7/15. Passo 3: multiplique: 8/16 × 7/15 = 7/30 = <b>23,33%</b>. Se a reposição fosse feita, o denominador não mudaria e a conta seria (8/16)² = 25%. Macete: Sem reposição: o denominador e o número de favoráveis diminuem juntos na segunda retirada.$q$),
  ($q$pcac-treino-est-018$q$, $q$Probabilidade$q$, $q$média$q$, $q$Em um lote de 12 celulares apreendidos, 9 têm IMEI adulterado. Dois aparelhos são sorteados, um após o outro, sem reposição. A probabilidade de os dois terem IMEI adulterado é igual a, aproximadamente:

A) 50%
B) 61,36%
C) 54,55%
D) 56,25%
E) 72,73%$q$, $q$C$q$, $q$Passo 1: na primeira retirada, a chance é 9/12. Passo 2: sem reposição, sobram 11 aparelhos e 8 adulterados, então a segunda chance é 8/11. Passo 3: multiplique: 9/12 × 8/11 = 6/11 = <b>54,55%</b>. Se a reposição fosse feita, o denominador não mudaria e a conta seria (9/12)² = 56,25%. Macete: Sem reposição: o denominador e o número de favoráveis diminuem juntos na segunda retirada.$q$),
  ($q$pcac-treino-est-019$q$, $q$Probabilidade$q$, $q$média$q$, $q$Em uma investigação, 14 suspeitos têm passagem por furto (F), 17 por estelionato (E) e 15 por receptação (R). Têm F e E, sem contar o caso dos três: 4; F e R: 1; E e R: 2; os três crimes: 4. O número de suspeitos com passagem por apenas um desses crimes é igual a:

A) 31
B) 7
C) 24
D) 20
E) 46$q$, $q$D$q$, $q$Passo 1: apenas F = total de F − (F e E) − (F e R) + (os três) = 14 − 8 − 5 + 4 = 5. Passo 2: pelo mesmo cálculo, apenas E = 7 e apenas R = 8. Passo 3: some: 5 + 7 + 8 = <b>20</b>. O total da união (31) inclui quem tem mais de um crime, então não serve para esta pergunta. Macete: Apenas um conjunto = total do conjunto − suas interseções + a interseção tripla (que foi subtraída duas vezes).$q$),
  ($q$pcac-treino-est-020$q$, $q$Probabilidade$q$, $q$média$q$, $q$Em uma investigação, 16 suspeitos têm passagem por furto (F), 15 por estelionato (E) e 25 por receptação (R). Têm F e E, sem contar o caso dos três: 4; F e R: 6; E e R: 5; os três crimes: 4. O número de suspeitos com passagem por apenas um desses crimes é igual a:

A) 18
B) 33
C) 56
D) 15
E) 14$q$, $q$E$q$, $q$Passo 1: apenas F = total de F − (F e E) − (F e R) + (os três) = 16 − 8 − 10 + 4 = 2. Passo 2: pelo mesmo cálculo, apenas E = 2 e apenas R = 10. Passo 3: some: 2 + 2 + 10 = <b>14</b>. O total da união (33) inclui quem tem mais de um crime, então não serve para esta pergunta. Macete: Apenas um conjunto = total do conjunto − suas interseções + a interseção tripla (que foi subtraída duas vezes).$q$),
  ($q$pcac-treino-est-021$q$, $q$Probabilidade$q$, $q$média$q$, $q$Em uma investigação, 17 suspeitos têm passagem por furto (F), 17 por estelionato (E) e 15 por receptação (R). Têm F e E, sem contar o caso dos três: 5; F e R: 6; E e R: 2; os três crimes: 1. O número de suspeitos com passagem por apenas um desses crimes é igual a:

A) 20
B) 21
C) 13
D) 49
E) 34$q$, $q$A$q$, $q$Passo 1: apenas F = total de F − (F e E) − (F e R) + (os três) = 17 − 6 − 7 + 1 = 5. Passo 2: pelo mesmo cálculo, apenas E = 9 e apenas R = 6. Passo 3: some: 5 + 9 + 6 = <b>20</b>. O total da união (34) inclui quem tem mais de um crime, então não serve para esta pergunta. Macete: Apenas um conjunto = total do conjunto − suas interseções + a interseção tripla (que foi subtraída duas vezes).$q$),
  ($q$pcac-treino-est-022$q$, $q$Probabilidade$q$, $q$média$q$, $q$Em uma investigação, 10 suspeitos têm passagem por furto (F), 13 por estelionato (E) e 13 por receptação (R). Têm F e E, sem contar o caso dos três: 1; F e R: 1; E e R: 4; os três crimes: 3. O número de suspeitos com passagem por apenas um desses crimes é igual a:

A) 18
B) 15
C) 6
D) 24
E) 36$q$, $q$B$q$, $q$Passo 1: apenas F = total de F − (F e E) − (F e R) + (os três) = 10 − 4 − 4 + 3 = 5. Passo 2: pelo mesmo cálculo, apenas E = 5 e apenas R = 5. Passo 3: some: 5 + 5 + 5 = <b>15</b>. O total da união (24) inclui quem tem mais de um crime, então não serve para esta pergunta. Macete: Apenas um conjunto = total do conjunto − suas interseções + a interseção tripla (que foi subtraída duas vezes).$q$),
  ($q$pcac-treino-est-023$q$, $q$Probabilidade$q$, $q$média$q$, $q$Em uma investigação, 11 suspeitos têm passagem por furto (F), 7 por estelionato (E) e 9 por receptação (R). Têm F e E, sem contar o caso dos três: 3; F e R: 5; E e R: 1; os três crimes: 1. O número de suspeitos com passagem por apenas um desses crimes é igual a:

A) 27
B) 16
C) 6
D) 9
E) 7$q$, $q$C$q$, $q$Passo 1: apenas F = total de F − (F e E) − (F e R) + (os três) = 11 − 4 − 6 + 1 = 2. Passo 2: pelo mesmo cálculo, apenas E = 2 e apenas R = 2. Passo 3: some: 2 + 2 + 2 = <b>6</b>. O total da união (16) inclui quem tem mais de um crime, então não serve para esta pergunta. Macete: Apenas um conjunto = total do conjunto − suas interseções + a interseção tripla (que foi subtraída duas vezes).$q$),
  ($q$pcac-treino-est-024$q$, $q$Probabilidade$q$, $q$média$q$, $q$Em uma investigação, 17 suspeitos têm passagem por furto (F), 15 por estelionato (E) e 13 por receptação (R). Têm F e E, sem contar o caso dos três: 3; F e R: 5; E e R: 3; os três crimes: 2. O número de suspeitos com passagem por apenas um desses crimes é igual a:

A) 11
B) 30
C) 19
D) 17
E) 45$q$, $q$D$q$, $q$Passo 1: apenas F = total de F − (F e E) − (F e R) + (os três) = 17 − 5 − 7 + 2 = 7. Passo 2: pelo mesmo cálculo, apenas E = 7 e apenas R = 3. Passo 3: some: 7 + 7 + 3 = <b>17</b>. O total da união (30) inclui quem tem mais de um crime, então não serve para esta pergunta. Macete: Apenas um conjunto = total do conjunto − suas interseções + a interseção tripla (que foi subtraída duas vezes).$q$),
  ($q$pcac-treino-est-025$q$, $q$Análise de séries temporais$q$, $q$fácil$q$, $q$O número de ocorrências registradas por uma delegacia foi 218 em 2023, 559 em 2024 e 299 em 2025. A variação percentual de 2025 em relação a 2024 é igual a, aproximadamente:

A) +37,2%
B) −119,3%
C) +46,5%
D) +87%
E) −46,5%$q$, $q$E$q$, $q$Passo 1: a base é 2024, o ano de comparação, então o valor de referência é 559. Passo 2: diferença = 299 − 559 = -260. Passo 3: variação = -260 ÷ 559 × 100 = <b>−46,5%</b>. Usar 218 (2023) como base dá outro resultado: essa base está errada. Macete: Variação percentual: (novo − antigo) ÷ antigo. O 'antigo' é sempre o ano de referência da comparação.$q$),
  ($q$pcac-treino-est-026$q$, $q$Análise de séries temporais$q$, $q$fácil$q$, $q$O número de ocorrências registradas por uma delegacia foi 399 em 2023, 532 em 2024 e 415 em 2025. A variação percentual de 2025 em relação a 2024 é igual a, aproximadamente:

A) −22%
B) +22%
C) +28,2%
D) −29,3%
E) +4%$q$, $q$A$q$, $q$Passo 1: a base é 2024, o ano de comparação, então o valor de referência é 532. Passo 2: diferença = 415 − 532 = -117. Passo 3: variação = -117 ÷ 532 × 100 = <b>−22%</b>. Usar 399 (2023) como base dá outro resultado: essa base está errada. Macete: Variação percentual: (novo − antigo) ÷ antigo. O 'antigo' é sempre o ano de referência da comparação.$q$),
  ($q$pcac-treino-est-027$q$, $q$Análise de séries temporais$q$, $q$fácil$q$, $q$O número de ocorrências registradas por uma delegacia foi 574 em 2023, 391 em 2024 e 563 em 2025. A variação percentual de 2025 em relação a 2024 é igual a, aproximadamente:

A) −30,6%
B) +44%
C) −44%
D) +30%
E) −1,9%$q$, $q$B$q$, $q$Passo 1: a base é 2024, o ano de comparação, então o valor de referência é 391. Passo 2: diferença = 563 − 391 = 172. Passo 3: variação = 172 ÷ 391 × 100 = <b>+44%</b>. Usar 574 (2023) como base dá outro resultado: essa base está errada. Macete: Variação percentual: (novo − antigo) ÷ antigo. O 'antigo' é sempre o ano de referência da comparação.$q$),
  ($q$pcac-treino-est-028$q$, $q$Análise de séries temporais$q$, $q$fácil$q$, $q$O número de ocorrências registradas por uma delegacia foi 213 em 2023, 540 em 2024 e 378 em 2025. A variação percentual de 2025 em relação a 2024 é igual a, aproximadamente:

A) +77,5%
B) +30%
C) −30%
D) +42,9%
E) −76,1%$q$, $q$C$q$, $q$Passo 1: a base é 2024, o ano de comparação, então o valor de referência é 540. Passo 2: diferença = 378 − 540 = -162. Passo 3: variação = -162 ÷ 540 × 100 = <b>−30%</b>. Usar 213 (2023) como base dá outro resultado: essa base está errada. Macete: Variação percentual: (novo − antigo) ÷ antigo. O 'antigo' é sempre o ano de referência da comparação.$q$),
  ($q$pcac-treino-est-029$q$, $q$Análise de séries temporais$q$, $q$fácil$q$, $q$O número de ocorrências registradas por uma delegacia foi 491 em 2023, 226 em 2024 e 401 em 2025. A variação percentual de 2025 em relação a 2024 é igual a, aproximadamente:

A) −18,3%
B) −43,6%
C) +35,6%
D) +77,4%
E) −77,4%$q$, $q$D$q$, $q$Passo 1: a base é 2024, o ano de comparação, então o valor de referência é 226. Passo 2: diferença = 401 − 226 = 175. Passo 3: variação = 175 ÷ 226 × 100 = <b>+77,4%</b>. Usar 491 (2023) como base dá outro resultado: essa base está errada. Macete: Variação percentual: (novo − antigo) ÷ antigo. O 'antigo' é sempre o ano de referência da comparação.$q$),
  ($q$pcac-treino-est-030$q$, $q$Análise de séries temporais$q$, $q$fácil$q$, $q$O número de ocorrências registradas por uma delegacia foi 492 em 2023, 424 em 2024 e 482 em 2025. A variação percentual de 2025 em relação a 2024 é igual a, aproximadamente:

A) −12%
B) −2%
C) +11,8%
D) −13,7%
E) +13,7%$q$, $q$E$q$, $q$Passo 1: a base é 2024, o ano de comparação, então o valor de referência é 424. Passo 2: diferença = 482 − 424 = 58. Passo 3: variação = 58 ÷ 424 × 100 = <b>+13,7%</b>. Usar 492 (2023) como base dá outro resultado: essa base está errada. Macete: Variação percentual: (novo − antigo) ÷ antigo. O 'antigo' é sempre o ano de referência da comparação.$q$),
  ($q$pcac-treino-est-031$q$, $q$Medidas de tendência central$q$, $q$média$q$, $q$O tempo de atendimento, em minutos, de seis ocorrências foi 15, 31, 60, 40, 29 e 37. A mediana desses tempos é igual a:

A) 34
B) 31
C) 35,3
D) 37
E) 50$q$, $q$A$q$, $q$Passo 1: coloque em ordem crescente: 15, 29, 31, 37, 40, 60. Passo 2: como são 6 valores (par), a mediana é a média dos dois centrais: o 3º (31) e o 4º (37). Passo 3: (31 + 37) ÷ 2 = <b>34</b>. A média seria 35,3, mas a pergunta pede a mediana. Macete: Mediana: ordene primeiro. Quantidade ímpar → valor do meio. Quantidade par → média dos dois do meio.$q$),
  ($q$pcac-treino-est-032$q$, $q$Medidas de tendência central$q$, $q$média$q$, $q$O tempo de atendimento, em minutos, de seis ocorrências foi 54, 58, 21, 27, 48 e 41. A mediana desses tempos é igual a:

A) 48
B) 44,5
C) 41,5
D) 24
E) 41$q$, $q$B$q$, $q$Passo 1: coloque em ordem crescente: 21, 27, 41, 48, 54, 58. Passo 2: como são 6 valores (par), a mediana é a média dos dois centrais: o 3º (41) e o 4º (48). Passo 3: (41 + 48) ÷ 2 = <b>44,5</b>. A média seria 41,5, mas a pergunta pede a mediana. Macete: Mediana: ordene primeiro. Quantidade ímpar → valor do meio. Quantidade par → média dos dois do meio.$q$),
  ($q$pcac-treino-est-033$q$, $q$Medidas de tendência central$q$, $q$média$q$, $q$O tempo de atendimento, em minutos, de seis ocorrências foi 16, 20, 37, 58, 13 e 36. A mediana desses tempos é igual a:

A) 20
B) 30
C) 28
D) 47,5
E) 36$q$, $q$C$q$, $q$Passo 1: coloque em ordem crescente: 13, 16, 20, 36, 37, 58. Passo 2: como são 6 valores (par), a mediana é a média dos dois centrais: o 3º (20) e o 4º (36). Passo 3: (20 + 36) ÷ 2 = <b>28</b>. A média seria 30, mas a pergunta pede a mediana. Macete: Mediana: ordene primeiro. Quantidade ímpar → valor do meio. Quantidade par → média dos dois do meio.$q$),
  ($q$pcac-treino-est-034$q$, $q$Medidas de tendência central$q$, $q$média$q$, $q$O tempo de atendimento, em minutos, de seis ocorrências foi 21, 25, 8, 52, 48 e 45. A mediana desses tempos é igual a:

A) 25
B) 30
C) 33,2
D) 35
E) 45$q$, $q$D$q$, $q$Passo 1: coloque em ordem crescente: 8, 21, 25, 45, 48, 52. Passo 2: como são 6 valores (par), a mediana é a média dos dois centrais: o 3º (25) e o 4º (45). Passo 3: (25 + 45) ÷ 2 = <b>35</b>. A média seria 33,2, mas a pergunta pede a mediana. Macete: Mediana: ordene primeiro. Quantidade ímpar → valor do meio. Quantidade par → média dos dois do meio.$q$),
  ($q$pcac-treino-est-035$q$, $q$Medidas de tendência central$q$, $q$média$q$, $q$O tempo de atendimento, em minutos, de seis ocorrências foi 30, 42, 20, 36, 33 e 52. A mediana desses tempos é igual a:

A) 33
B) 28
C) 35,5
D) 36
E) 34,5$q$, $q$E$q$, $q$Passo 1: coloque em ordem crescente: 20, 30, 33, 36, 42, 52. Passo 2: como são 6 valores (par), a mediana é a média dos dois centrais: o 3º (33) e o 4º (36). Passo 3: (33 + 36) ÷ 2 = <b>34,5</b>. A média seria 35,5, mas a pergunta pede a mediana. Macete: Mediana: ordene primeiro. Quantidade ímpar → valor do meio. Quantidade par → média dos dois do meio.$q$),
  ($q$pcac-treino-est-036$q$, $q$Medidas de tendência central$q$, $q$média$q$, $q$O tempo de atendimento, em minutos, de seis ocorrências foi 55, 29, 58, 25, 33 e 46. A mediana desses tempos é igual a:

A) 39,5
B) 33
C) 41,5
D) 46
E) 41$q$, $q$A$q$, $q$Passo 1: coloque em ordem crescente: 25, 29, 33, 46, 55, 58. Passo 2: como são 6 valores (par), a mediana é a média dos dois centrais: o 3º (33) e o 4º (46). Passo 3: (33 + 46) ÷ 2 = <b>39,5</b>. A média seria 41, mas a pergunta pede a mediana. Macete: Mediana: ordene primeiro. Quantidade ímpar → valor do meio. Quantidade par → média dos dois do meio.$q$),
  ($q$pcac-treino-est-037$q$, $q$Medidas de posição$q$, $q$alta$q$, $q$Em oito inquéritos de uma delegacia, o tempo de conclusão, em dias, foi 39, 15, 22, 3, 38, 31, 37 e 9. O intervalo interquartil desses tempos, pelo método da mediana das duas metades, é igual a:

A) 12
B) 25,5
C) 36
D) 37,5
E) 27$q$, $q$B$q$, $q$Passo 1: em ordem: 3, 9, 15, 22, 31, 37, 38, 39. Passo 2: metade inferior: 3, 9, 15, 22, Q1 = (9 + 15) ÷ 2 = 12. Passo 3: metade superior: 31, 37, 38, 39, Q3 = (37 + 38) ÷ 2 = 37,5. Passo 4: AIQ = Q3 − Q1 = 37,5 − 12 = <b>25,5</b>. A amplitude total (36) é outra medida; não confunda as duas. Macete: AIQ = Q3 − Q1. Com quantidade par, as metades têm o mesmo tamanho; ache a mediana de cada metade.$q$),
  ($q$pcac-treino-est-038$q$, $q$Medidas de posição$q$, $q$alta$q$, $q$Em oito inquéritos de uma delegacia, o tempo de conclusão, em dias, foi 36, 11, 18, 32, 20, 7, 27 e 5. O intervalo interquartil desses tempos, pelo método da mediana das duas metades, é igual a:

A) 27
B) 31
C) 20,5
D) 29,5
E) 9$q$, $q$C$q$, $q$Passo 1: em ordem: 5, 7, 11, 18, 20, 27, 32, 36. Passo 2: metade inferior: 5, 7, 11, 18, Q1 = (7 + 11) ÷ 2 = 9. Passo 3: metade superior: 20, 27, 32, 36, Q3 = (27 + 32) ÷ 2 = 29,5. Passo 4: AIQ = Q3 − Q1 = 29,5 − 9 = <b>20,5</b>. A amplitude total (31) é outra medida; não confunda as duas. Macete: AIQ = Q3 − Q1. Com quantidade par, as metades têm o mesmo tamanho; ache a mediana de cada metade.$q$),
  ($q$pcac-treino-est-039$q$, $q$Medidas de posição$q$, $q$alta$q$, $q$Em oito inquéritos de uma delegacia, o tempo de conclusão, em dias, foi 11, 2, 21, 32, 25, 23, 5 e 7. O intervalo interquartil desses tempos, pelo método da mediana das duas metades, é igual a:

A) 30
B) 6
C) 26
D) 18
E) 24$q$, $q$D$q$, $q$Passo 1: em ordem: 2, 5, 7, 11, 21, 23, 25, 32. Passo 2: metade inferior: 2, 5, 7, 11, Q1 = (5 + 7) ÷ 2 = 6. Passo 3: metade superior: 21, 23, 25, 32, Q3 = (23 + 25) ÷ 2 = 24. Passo 4: AIQ = Q3 − Q1 = 24 − 6 = <b>18</b>. A amplitude total (30) é outra medida; não confunda as duas. Macete: AIQ = Q3 − Q1. Com quantidade par, as metades têm o mesmo tamanho; ache a mediana de cada metade.$q$),
  ($q$pcac-treino-est-040$q$, $q$Medidas de posição$q$, $q$alta$q$, $q$Em oito inquéritos de uma delegacia, o tempo de conclusão, em dias, foi 25, 23, 14, 18, 33, 10, 38 e 28. O intervalo interquartil desses tempos, pelo método da mediana das duas metades, é igual a:

A) 22
B) 16
C) 30,5
D) 28
E) 14,5$q$, $q$E$q$, $q$Passo 1: em ordem: 10, 14, 18, 23, 25, 28, 33, 38. Passo 2: metade inferior: 10, 14, 18, 23, Q1 = (14 + 18) ÷ 2 = 16. Passo 3: metade superior: 25, 28, 33, 38, Q3 = (28 + 33) ÷ 2 = 30,5. Passo 4: AIQ = Q3 − Q1 = 30,5 − 16 = <b>14,5</b>. A amplitude total (28) é outra medida; não confunda as duas. Macete: AIQ = Q3 − Q1. Com quantidade par, as metades têm o mesmo tamanho; ache a mediana de cada metade.$q$),
  ($q$pcac-treino-est-041$q$, $q$Medidas de posição$q$, $q$alta$q$, $q$Em oito inquéritos de uma delegacia, o tempo de conclusão, em dias, foi 6, 37, 26, 10, 8, 33, 32 e 15. O intervalo interquartil desses tempos, pelo método da mediana das duas metades, é igual a:

A) 23,5
B) 28
C) 32,5
D) 31
E) 9$q$, $q$A$q$, $q$Passo 1: em ordem: 6, 8, 10, 15, 26, 32, 33, 37. Passo 2: metade inferior: 6, 8, 10, 15, Q1 = (8 + 10) ÷ 2 = 9. Passo 3: metade superior: 26, 32, 33, 37, Q3 = (32 + 33) ÷ 2 = 32,5. Passo 4: AIQ = Q3 − Q1 = 32,5 − 9 = <b>23,5</b>. A amplitude total (31) é outra medida; não confunda as duas. Macete: AIQ = Q3 − Q1. Com quantidade par, as metades têm o mesmo tamanho; ache a mediana de cada metade.$q$),
  ($q$pcac-treino-est-042$q$, $q$Medidas de posição$q$, $q$alta$q$, $q$Em oito inquéritos de uma delegacia, o tempo de conclusão, em dias, foi 27, 6, 11, 16, 37, 23, 14 e 8. O intervalo interquartil desses tempos, pelo método da mediana das duas metades, é igual a:

A) 25
B) 15,5
C) 27,5
D) 9,5
E) 31$q$, $q$B$q$, $q$Passo 1: em ordem: 6, 8, 11, 14, 16, 23, 27, 37. Passo 2: metade inferior: 6, 8, 11, 14, Q1 = (8 + 11) ÷ 2 = 9,5. Passo 3: metade superior: 16, 23, 27, 37, Q3 = (23 + 27) ÷ 2 = 25. Passo 4: AIQ = Q3 − Q1 = 25 − 9,5 = <b>15,5</b>. A amplitude total (31) é outra medida; não confunda as duas. Macete: AIQ = Q3 − Q1. Com quantidade par, as metades têm o mesmo tamanho; ache a mediana de cada metade.$q$),
  ($q$pcac-treino-est-043$q$, $q$Probabilidade$q$, $q$média$q$, $q$Em uma operação policial, a probabilidade de a equipe A localizar o alvo é 0,7, e a de a equipe B é 0,9. As equipes agem de forma independente. A probabilidade de pelo menos uma das equipes localizar o alvo é igual a:

A) 63%
B) 3%
C) 97%
D) 160%
E) 7%$q$, $q$C$q$, $q$Passo 1: a chance de nenhuma localizar é (1 − 0,7) × (1 − 0,9) = 0,3 × 0,1 = 0,03. Passo 2: pelo complementar, pelo menos uma = 1 − 0,03 = <b>97%</b>. Somar as duas probabilidades (1,6) conta duas vezes o caso em que as duas acertam. Macete: 'Pelo menos um' = 1 − P(nenhum). É quase sempre mais rápido que somar os casos.$q$),
  ($q$pcac-treino-est-044$q$, $q$Probabilidade$q$, $q$média$q$, $q$Em uma operação policial, a probabilidade de a equipe A localizar o alvo é 0,6, e a de a equipe B é 0,3. As equipes agem de forma independente. A probabilidade de pelo menos uma das equipes localizar o alvo é igual a:

A) 18%
B) 28%
C) 90%
D) 72%
E) 42%$q$, $q$D$q$, $q$Passo 1: a chance de nenhuma localizar é (1 − 0,6) × (1 − 0,3) = 0,4 × 0,7 = 0,28. Passo 2: pelo complementar, pelo menos uma = 1 − 0,28 = <b>72%</b>. Somar as duas probabilidades (0,9) conta duas vezes o caso em que as duas acertam. Macete: 'Pelo menos um' = 1 − P(nenhum). É quase sempre mais rápido que somar os casos.$q$),
  ($q$pcac-treino-est-045$q$, $q$Probabilidade$q$, $q$média$q$, $q$Em uma operação policial, a probabilidade de a equipe A localizar o alvo é 0,6, e a de a equipe B é 0,8. As equipes agem de forma independente. A probabilidade de pelo menos uma das equipes localizar o alvo é igual a:

A) 140%
B) 12%
C) 8%
D) 48%
E) 92%$q$, $q$E$q$, $q$Passo 1: a chance de nenhuma localizar é (1 − 0,6) × (1 − 0,8) = 0,4 × 0,2 = 0,08. Passo 2: pelo complementar, pelo menos uma = 1 − 0,08 = <b>92%</b>. Somar as duas probabilidades (1,4) conta duas vezes o caso em que as duas acertam. Macete: 'Pelo menos um' = 1 − P(nenhum). É quase sempre mais rápido que somar os casos.$q$),
  ($q$pcac-treino-est-046$q$, $q$Probabilidade$q$, $q$média$q$, $q$Em uma operação policial, a probabilidade de a equipe A localizar o alvo é 0,9, e a de a equipe B é 0,7. As equipes agem de forma independente. A probabilidade de pelo menos uma das equipes localizar o alvo é igual a:

A) 97%
B) 27%
C) 63%
D) 160%
E) 3%$q$, $q$A$q$, $q$Passo 1: a chance de nenhuma localizar é (1 − 0,9) × (1 − 0,7) = 0,1 × 0,3 = 0,03. Passo 2: pelo complementar, pelo menos uma = 1 − 0,03 = <b>97%</b>. Somar as duas probabilidades (1,6) conta duas vezes o caso em que as duas acertam. Macete: 'Pelo menos um' = 1 − P(nenhum). É quase sempre mais rápido que somar os casos.$q$),
  ($q$pcac-treino-est-047$q$, $q$Probabilidade$q$, $q$média$q$, $q$Em uma operação policial, a probabilidade de a equipe A localizar o alvo é 0,6, e a de a equipe B é 0,7. As equipes agem de forma independente. A probabilidade de pelo menos uma das equipes localizar o alvo é igual a:

A) 12%
B) 88%
C) 42%
D) 130%
E) 18%$q$, $q$B$q$, $q$Passo 1: a chance de nenhuma localizar é (1 − 0,6) × (1 − 0,7) = 0,4 × 0,3 = 0,12. Passo 2: pelo complementar, pelo menos uma = 1 − 0,12 = <b>88%</b>. Somar as duas probabilidades (1,3) conta duas vezes o caso em que as duas acertam. Macete: 'Pelo menos um' = 1 − P(nenhum). É quase sempre mais rápido que somar os casos.$q$),
  ($q$pcac-treino-est-048$q$, $q$Probabilidade$q$, $q$média$q$, $q$Em uma operação policial, a probabilidade de a equipe A localizar o alvo é 0,7, e a de a equipe B é 0,8. As equipes agem de forma independente. A probabilidade de pelo menos uma das equipes localizar o alvo é igual a:

A) 6%
B) 56%
C) 94%
D) 150%
E) 14%$q$, $q$C$q$, $q$Passo 1: a chance de nenhuma localizar é (1 − 0,7) × (1 − 0,8) = 0,3 × 0,2 = 0,06. Passo 2: pelo complementar, pelo menos uma = 1 − 0,06 = <b>94%</b>. Somar as duas probabilidades (1,5) conta duas vezes o caso em que as duas acertam. Macete: 'Pelo menos um' = 1 − P(nenhum). É quase sempre mais rápido que somar os casos.$q$),
  ($q$pcac-treino-est-049$q$, $q$Organização e apresentação de dados$q$, $q$média$q$, $q$Em 8 operações policiais, o número de veículos apreendidos por operação foi distribuído assim: 9 veículos em 5 operaçãoões; 7 veículos em 2 operaçãoões; 2 veículos em 1 operação. A média de veículos apreendidos por operação é igual a, aproximadamente:

A) 20,33
B) 6
C) 9
D) 7,63
E) 7$q$, $q$D$q$, $q$Passo 1: multiplique cada valor pela frequência: 9×5 + 7×2 + 2×1 = 45 + 14 + 2 = 61. Passo 2: divida pelo total de operações, 8: 61 ÷ 8 = <b>7,63</b>. A média simples dos valores (6) ignora que alguns valores aparecem mais vezes. Macete: Média com frequência = soma(valor × frequência) ÷ soma das frequências. Não faça a média só dos valores distintos.$q$),
  ($q$pcac-treino-est-050$q$, $q$Organização e apresentação de dados$q$, $q$média$q$, $q$Em 11 operações policiais, o número de veículos apreendidos por operação foi distribuído assim: 2 veículos em 5 operaçãoões; 7 veículos em 4 operaçãoões; 10 veículos em 2 operaçãoões. A média de veículos apreendidos por operação é igual a, aproximadamente:

A) 6,33
B) 19,33
C) 2
D) 7
E) 5,27$q$, $q$E$q$, $q$Passo 1: multiplique cada valor pela frequência: 2×5 + 7×4 + 10×2 = 10 + 28 + 20 = 58. Passo 2: divida pelo total de operações, 11: 58 ÷ 11 = <b>5,27</b>. A média simples dos valores (6,33) ignora que alguns valores aparecem mais vezes. Macete: Média com frequência = soma(valor × frequência) ÷ soma das frequências. Não faça a média só dos valores distintos.$q$),
  ($q$pcac-treino-est-051$q$, $q$Organização e apresentação de dados$q$, $q$média$q$, $q$Em 12 operações policiais, o número de veículos apreendidos por operação foi distribuído assim: 9 veículos em 5 operaçãoões; 5 veículos em 4 operaçãoões; 2 veículos em 3 operaçãoões. A média de veículos apreendidos por operação é igual a, aproximadamente:

A) 5,92
B) 23,67
C) 5
D) 9
E) 5,33$q$, $q$A$q$, $q$Passo 1: multiplique cada valor pela frequência: 9×5 + 5×4 + 2×3 = 45 + 20 + 6 = 71. Passo 2: divida pelo total de operações, 12: 71 ÷ 12 = <b>5,92</b>. A média simples dos valores (5,33) ignora que alguns valores aparecem mais vezes. Macete: Média com frequência = soma(valor × frequência) ÷ soma das frequências. Não faça a média só dos valores distintos.$q$),
  ($q$pcac-treino-est-052$q$, $q$Organização e apresentação de dados$q$, $q$média$q$, $q$Em 9 operações policiais, o número de veículos apreendidos por operação foi distribuído assim: 8 veículos em 2 operaçãoões; 9 veículos em 4 operaçãoões; 4 veículos em 3 operaçãoões. A média de veículos apreendidos por operação é igual a, aproximadamente:

A) 7
B) 7,11
C) 8
D) 21,33
E) 9$q$, $q$B$q$, $q$Passo 1: multiplique cada valor pela frequência: 8×2 + 9×4 + 4×3 = 16 + 36 + 12 = 64. Passo 2: divida pelo total de operações, 9: 64 ÷ 9 = <b>7,11</b>. A média simples dos valores (7) ignora que alguns valores aparecem mais vezes. Macete: Média com frequência = soma(valor × frequência) ÷ soma das frequências. Não faça a média só dos valores distintos.$q$),
  ($q$pcac-treino-est-053$q$, $q$Organização e apresentação de dados$q$, $q$média$q$, $q$Em 12 operações policiais, o número de veículos apreendidos por operação foi distribuído assim: 9 veículos em 5 operaçãoões; 6 veículos em 4 operaçãoões; 8 veículos em 3 operaçãoões. A média de veículos apreendidos por operação é igual a, aproximadamente:

A) 31
B) 8
C) 7,75
D) 9
E) 7,67$q$, $q$C$q$, $q$Passo 1: multiplique cada valor pela frequência: 9×5 + 6×4 + 8×3 = 45 + 24 + 24 = 93. Passo 2: divida pelo total de operações, 12: 93 ÷ 12 = <b>7,75</b>. A média simples dos valores (7,67) ignora que alguns valores aparecem mais vezes. Macete: Média com frequência = soma(valor × frequência) ÷ soma das frequências. Não faça a média só dos valores distintos.$q$),
  ($q$pcac-treino-est-054$q$, $q$Organização e apresentação de dados$q$, $q$média$q$, $q$Em 9 operações policiais, o número de veículos apreendidos por operação foi distribuído assim: 9 veículos em 4 operaçãoões; 4 veículos em 2 operaçãoões; 7 veículos em 3 operaçãoões. A média de veículos apreendidos por operação é igual a, aproximadamente:

A) 9
B) 21,67
C) 7
D) 7,22
E) 6,67$q$, $q$D$q$, $q$Passo 1: multiplique cada valor pela frequência: 9×4 + 4×2 + 7×3 = 36 + 8 + 21 = 65. Passo 2: divida pelo total de operações, 9: 65 ÷ 9 = <b>7,22</b>. A média simples dos valores (6,67) ignora que alguns valores aparecem mais vezes. Macete: Média com frequência = soma(valor × frequência) ÷ soma das frequências. Não faça a média só dos valores distintos.$q$),
  ($q$pcac-treino-est-055$q$, $q$Medidas de dispersão$q$, $q$média$q$, $q$O número diário de ocorrências de três delegacias tem as seguintes medidas: Delegacia X, média 115 e desvio padrão 14; Delegacia Y, média 105 e desvio padrão 15; Delegacia Z, média 23 e desvio padrão 8. Qual delegacia tem o maior coeficiente de variação, ou seja, a maior variação relativa?

A) Delegacia Y
B) Não é possível comparar, pois as médias são diferentes
C) As três têm o mesmo coeficiente de variação
D) Delegacia X
E) Delegacia Z$q$, $q$E$q$, $q$Passo 1: CV = desvio padrão ÷ média × 100. CV de Delegacia X = 14 ÷ 115 × 100 = 12,2%; CV de Delegacia Y = 15 ÷ 105 × 100 = 14,3%; CV de Delegacia Z = 8 ÷ 23 × 100 = 34,8%. Passo 2: o maior CV é o de <b>Delegacia Z</b> (34,8%). Ela não tem o maior desvio absoluto (Delegacia Y tem), mas, por ter a média menor, a variação em relação a ela é a maior. Macete: Para comparar grupos com médias diferentes, use o CV, não o desvio padrão.$q$),
  ($q$pcac-treino-est-056$q$, $q$Medidas de dispersão$q$, $q$média$q$, $q$O número diário de ocorrências de três delegacias tem as seguintes medidas: Delegacia X, média 64 e desvio padrão 8; Delegacia Y, média 108 e desvio padrão 9; Delegacia Z, média 63 e desvio padrão 5. Qual delegacia tem o maior coeficiente de variação, ou seja, a maior variação relativa?

A) Delegacia X
B) As três têm o mesmo coeficiente de variação
C) Delegacia Y
D) Não é possível comparar, pois as médias são diferentes
E) Delegacia Z$q$, $q$A$q$, $q$Passo 1: CV = desvio padrão ÷ média × 100. CV de Delegacia X = 8 ÷ 64 × 100 = 12,5%; CV de Delegacia Y = 9 ÷ 108 × 100 = 8,3%; CV de Delegacia Z = 5 ÷ 63 × 100 = 7,9%. Passo 2: o maior CV é o de <b>Delegacia X</b> (12,5%). Ela não tem o maior desvio absoluto (Delegacia Y tem), mas, por ter a média menor, a variação em relação a ela é a maior. Macete: Para comparar grupos com médias diferentes, use o CV, não o desvio padrão.$q$),
  ($q$pcac-treino-est-057$q$, $q$Medidas de dispersão$q$, $q$média$q$, $q$O número diário de ocorrências de três delegacias tem as seguintes medidas: Delegacia X, média 24 e desvio padrão 19; Delegacia Y, média 56 e desvio padrão 10; Delegacia Z, média 107 e desvio padrão 28. Qual delegacia tem o maior coeficiente de variação, ou seja, a maior variação relativa?

A) Não é possível comparar, pois as médias são diferentes
B) Delegacia X
C) Delegacia Z
D) As três têm o mesmo coeficiente de variação
E) Delegacia Y$q$, $q$B$q$, $q$Passo 1: CV = desvio padrão ÷ média × 100. CV de Delegacia X = 19 ÷ 24 × 100 = 79,2%; CV de Delegacia Y = 10 ÷ 56 × 100 = 17,9%; CV de Delegacia Z = 28 ÷ 107 × 100 = 26,2%. Passo 2: o maior CV é o de <b>Delegacia X</b> (79,2%). Ela não tem o maior desvio absoluto (Delegacia Z tem), mas, por ter a média menor, a variação em relação a ela é a maior. Macete: Para comparar grupos com médias diferentes, use o CV, não o desvio padrão.$q$),
  ($q$pcac-treino-est-058$q$, $q$Medidas de dispersão$q$, $q$média$q$, $q$O número diário de ocorrências de três delegacias tem as seguintes medidas: Delegacia X, média 32 e desvio padrão 23; Delegacia Y, média 107 e desvio padrão 20; Delegacia Z, média 90 e desvio padrão 28. Qual delegacia tem o maior coeficiente de variação, ou seja, a maior variação relativa?

A) Delegacia Y
B) As três têm o mesmo coeficiente de variação
C) Delegacia X
D) Delegacia Z
E) Não é possível comparar, pois as médias são diferentes$q$, $q$C$q$, $q$Passo 1: CV = desvio padrão ÷ média × 100. CV de Delegacia X = 23 ÷ 32 × 100 = 71,9%; CV de Delegacia Y = 20 ÷ 107 × 100 = 18,7%; CV de Delegacia Z = 28 ÷ 90 × 100 = 31,1%. Passo 2: o maior CV é o de <b>Delegacia X</b> (71,9%). Ela não tem o maior desvio absoluto (Delegacia Z tem), mas, por ter a média menor, a variação em relação a ela é a maior. Macete: Para comparar grupos com médias diferentes, use o CV, não o desvio padrão.$q$),
  ($q$pcac-treino-est-059$q$, $q$Medidas de dispersão$q$, $q$média$q$, $q$O número diário de ocorrências de três delegacias tem as seguintes medidas: Delegacia X, média 79 e desvio padrão 20; Delegacia Y, média 81 e desvio padrão 12; Delegacia Z, média 94 e desvio padrão 23. Qual delegacia tem o maior coeficiente de variação, ou seja, a maior variação relativa?

A) Delegacia Z
B) As três têm o mesmo coeficiente de variação
C) Não é possível comparar, pois as médias são diferentes
D) Delegacia X
E) Delegacia Y$q$, $q$D$q$, $q$Passo 1: CV = desvio padrão ÷ média × 100. CV de Delegacia X = 20 ÷ 79 × 100 = 25,3%; CV de Delegacia Y = 12 ÷ 81 × 100 = 14,8%; CV de Delegacia Z = 23 ÷ 94 × 100 = 24,5%. Passo 2: o maior CV é o de <b>Delegacia X</b> (25,3%). Ela não tem o maior desvio absoluto (Delegacia Z tem), mas, por ter a média menor, a variação em relação a ela é a maior. Macete: Para comparar grupos com médias diferentes, use o CV, não o desvio padrão.$q$),
  ($q$pcac-treino-est-060$q$, $q$Medidas de dispersão$q$, $q$média$q$, $q$O número diário de ocorrências de três delegacias tem as seguintes medidas: Delegacia X, média 39 e desvio padrão 8; Delegacia Y, média 34 e desvio padrão 16; Delegacia Z, média 110 e desvio padrão 24. Qual delegacia tem o maior coeficiente de variação, ou seja, a maior variação relativa?

A) As três têm o mesmo coeficiente de variação
B) Delegacia Z
C) Delegacia X
D) Não é possível comparar, pois as médias são diferentes
E) Delegacia Y$q$, $q$E$q$, $q$Passo 1: CV = desvio padrão ÷ média × 100. CV de Delegacia X = 8 ÷ 39 × 100 = 20,5%; CV de Delegacia Y = 16 ÷ 34 × 100 = 47,1%; CV de Delegacia Z = 24 ÷ 110 × 100 = 21,8%. Passo 2: o maior CV é o de <b>Delegacia Y</b> (47,1%). Ela não tem o maior desvio absoluto (Delegacia Z tem), mas, por ter a média menor, a variação em relação a ela é a maior. Macete: Para comparar grupos com médias diferentes, use o CV, não o desvio padrão.$q$)
  ) as v(k, sub, diff, txt, ans, expl)
  on conflict (source_id, external_item_key) do update set
    question_text = excluded.question_text,
    official_answer = excluded.official_answer,
    explanation = excluded.explanation,
    subtopic = excluded.subtopic,
    difficulty = excluded.difficulty,
    content_status = 'active',
    didactic_provenance = excluded.didactic_provenance;
end $$;
