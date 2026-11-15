-- PC-AC 2026: duas questões adicionais da revisão CFC 2020.2.
update public.study_materials set body_md=body_md||'

## Questão CFC 2020.2 — ajuste a valor presente de três parcelas (alternativa B)

Compra a prazo de R$ 60.000, paga em três parcelas anuais de R$ 20.000, com taxa composta de 15% ao ano.

Traga cada parcela para a data da compra:
- 1ª parcela: 20.000 ÷ 1,15 = R$ 17.391,30.
- 2ª parcela: 20.000 ÷ 1,15² = R$ 15.123,74.
- 3ª parcela: 20.000 ÷ 1,15³ = R$ 13.151,08.

Valor presente = soma das parcelas descontadas = **R$ 45.664,50**. Ajuste a valor presente = 60.000 − 45.664,50 = **R$ 14.335,50**.

**Resposta: alternativa B.**

**Macete:** cada parcela é descontada pelo número de períodos até o vencimento. Não desconte as três parcelas pelo mesmo fator.
',quiz=quiz||'[{"q":"Na questão CFC 2020.2, o valor presente das três parcelas é R$ 45.664,50 e o AVP é R$ 14.335,50.","a":true,"why":"Somam-se 20.000/1,15 + 20.000/1,15² + 20.000/1,15³ = 45.664,50. AVP = 60.000 − 45.664,50."},{"q":"As três parcelas anuais devem ser descontadas pelo mesmo fator de 1,15.","a":false,"why":"A primeira é descontada por 1,15; a segunda por 1,15²; a terceira por 1,15³."}]'::jsonb,flashcards=flashcards||'[{"f":"Como calcular o valor presente de parcelas anuais iguais?","b":"Desconte cada parcela pelo fator (1 + taxa) elevado ao número de períodos até o vencimento e some os valores presentes."},{"f":"Qual a diferença entre valor nominal e AVP na questão CFC 2020.2?","b":"Nominal R$ 60.000; valor presente R$ 45.664,50; AVP R$ 14.335,50."}]'::jsonb,updated_at=now() where slug='pcac-2026-contabilidade-11-estoques-mensuracao-avp-inventarios' and content_status='active' and body_md not like '%## Questão CFC 2020.2 — ajuste a valor presente de três parcelas%';

update public.study_materials set body_md=body_md||'

## Questão CFC 2020.2 — provisões para processos judiciais (alternativa A)

Na data de 31/12/2019, aplique a probabilidade de perda e compare com a provisão já registrada:
- Processo 1: perda provável de R$ 35.000; já existe provisão de R$ 25.000. Complementar **R$ 10.000**.
- Processo 2: perda provável de R$ 20.000; não existe provisão. Constituir **R$ 20.000**.
- Processo 3: perda possível de R$ 40.000; não reconhecer provisão. Reverter os R$ 40.000 anteriormente registrados.
- Processo 4: perda remota de R$ 10.000; não reconhecer provisão.
- Processo 5: perda possível de R$ 12.000; não reconhecer provisão.

**Resposta: alternativa A.**

**Jeito fácil:** provável → reconhece provisão; possível → divulga como passivo contingente, sem reconhecer; remota → em regra, não reconhece nem divulga. Se a provisão antiga deixou de atender aos critérios, reverta-a.
',quiz=quiz||'[{"q":"Na questão CFC 2020.2, a provisão do processo 1 deve ser complementada em R$ 10.000.","a":true,"why":"Perda provável de 35.000 menos provisão já registrada de 25.000 = 10.000."},{"q":"Uma perda possível exige reconhecer provisão no passivo.","a":false,"why":"Perda possível é passivo contingente: divulga-se em notas, mas não se reconhece provisão."},{"q":"Na questão CFC 2020.2, o processo 3 deve ter sua provisão de R$ 40.000 revertida.","a":true,"why":"A perda passou a ser possível, não provável; a provisão deixa de atender ao critério de reconhecimento."}]'::jsonb,flashcards=flashcards||'[{"f":"Quando reconhecer provisão para contingência?","b":"Quando há obrigação presente, saída provável de recursos e estimativa confiável."},{"f":"Como tratar perda possível e perda remota?","b":"Possível: divulgar como passivo contingente, sem provisão. Remota: em regra, não reconhecer nem divulgar."},{"f":"O que fazer com provisão antiga quando a perda deixa de ser provável?","b":"Reverter a provisão, pois não atende mais ao critério de reconhecimento."}]'::jsonb,updated_at=now() where slug='pcac-2026-contabilidade-14-imobilizado-depreciacao-provisoes-contingencias' and content_status='active' and body_md not like '%## Questão CFC 2020.2 — provisões para processos judiciais%';