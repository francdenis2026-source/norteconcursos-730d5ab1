-- PC-AC 2026: amplia questões comentadas de ROI e patrimônio líquido (CFC 2020.1).
update public.study_materials set body_md=body_md||'

## 6. Questão original — Consulplan/CFC 2020.1, questão 26: ROI e retorno sobre vendas

A questão compara três divisões e informa vendas, lucro líquido e giro do ativo:

| Divisão | Vendas | Lucro líquido | Giro do ativo |
|---|---:|---:|---:|
| X | R$ 500.000 | R$ 100.000 | 1,25 |
| Y | R$ 600.000 | R$ 100.000 | 1,20 |
| Z | R$ 550.000 | R$ 100.000 | 1,22 |

**ROI (retorno sobre o investimento)** = lucro líquido ÷ ativo/investimento. Como o giro do ativo = vendas ÷ ativo, podemos calcular ROI = (lucro líquido ÷ vendas) × giro do ativo.

- X: (100.000 ÷ 500.000) × 1,25 = 25%.
- Y: (100.000 ÷ 600.000) × 1,20 = 20%.
- Z: (100.000 ÷ 550.000) × 1,22 ≈ 22,18%.

**Retorno sobre vendas** = lucro líquido ÷ vendas:
- Y: 100.000 ÷ 600.000 ≈ 16,67%.
- Z: 100.000 ÷ 550.000 ≈ 18,18%.

Assim, são verdadeiras as afirmações I, III e IV. A resposta é **alternativa B**.

**Jeito fácil:** ROI olha o lucro em relação ao investimento; margem/retorno sobre vendas olha o lucro em relação às vendas. O giro do ativo mostra quanto a empresa vende para cada R$ 1 investido em ativos.

**Pegadinha:** não confunda 18% de retorno sobre vendas com R$ 18 de lucro para cada R$ 100 investidos. São denominadores diferentes.',flashcards=flashcards||'[{"f":"Qual a fórmula do ROI que facilita a questão Consulplan 2020.1?","b":"ROI = (lucro líquido ÷ vendas) × giro do ativo."},{"f":"Qual a diferença entre ROI e retorno sobre vendas?","b":"ROI relaciona lucro ao investimento/ativo; retorno sobre vendas relaciona lucro à receita de vendas."},{"f":"Qual o ROI das divisões X, Y e Z na questão CFC 2020.1?","b":"X = 25%; Y = 20%; Z ≈ 22,18%."}]'::jsonb,quiz=quiz||'[{"q":"Na questão Consulplan/CFC 2020.1, o ROI da divisão X é 25%.","a":true,"why":"ROI = (lucro líquido/vendas) × giro do ativo = (100.000/500.000) × 1,25 = 25%."},{"q":"O retorno sobre vendas da divisão Y é aproximadamente 16,67%.","a":true,"why":"100.000 ÷ 600.000 = 16,67%."},{"q":"Na questão, as afirmações corretas são I, III e IV (alternativa B).","a":true,"why":"ROI: X 25%, Y 20%, Z aproximadamente 22,18%. Retorno sobre vendas: Y 16,67% e Z 18,18%; giro do ativo Z 1,22 e Y 1,20."},{"q":"O retorno sobre vendas de Y e Z é igual a 18%.","a":false,"why":"Y é aproximadamente 16,67%; Z é aproximadamente 18,18%."}]'::jsonb,updated_at=now() where slug='pcac-2026-contabilidade-13-custeio-rkw-variavel-ponto-equilibrio' and content_status='active'
and body_md not like '%Questão original — Consulplan/CFC 2020.1, questão 26%';
update public.study_materials set body_md=body_md||'

## 8. Questão original — Consulplan/CFC 2020.1, questão 28: reserva legal e dividendos por ação

Dados do enunciado: capital social integralizado de R$ 3.000.000; reserva legal existente de R$ 585.000; 3.000.000 ações emitidas; 250.000 ações em tesouraria; lucro líquido de R$ 320.000; dividendo obrigatório de 25% do lucro líquido ajustado.

**Passo 1 — limite da reserva legal.** O limite de 20% do capital social é 3.000.000 × 20% = R$ 600.000. Como já existem R$ 585.000, só cabem mais R$ 15.000 antes de atingir o limite.

**Passo 2 — reserva legal do exercício.** 5% de R$ 320.000 seriam R$ 16.000, mas o limite disponível é de apenas R$ 15.000. Portanto, a constituição fica limitada a **R$ 15.000**, e não R$ 16.000.

**Passo 3 — lucro líquido ajustado e dividendo obrigatório.** Considerando a dedução da reserva legal de R$ 15.000: 320.000 − 15.000 = R$ 305.000. O dividendo obrigatório é 25% × 305.000 = **R$ 76.250**.

**Passo 4 — dividendo por ação em circulação.** Ações em circulação = 3.000.000 − 250.000 em tesouraria = 2.750.000. Dividendo por ação = 76.250 ÷ 2.750.000 ≈ **R$ 0,02773**.

Logo, as três afirmações do enunciado (reserva de R$ 16.000; dividendos de R$ 76.000; dividendo por ação de R$ 0,0275) não correspondem aos cálculos acima. A alternativa é **A — todas as afirmativas estão incorretas**.

**Como acertar:** primeiro aplique o limite da reserva legal; depois calcule o dividendo sobre o lucro ajustado; por fim, divida pelas ações em circulação, excluindo as ações em tesouraria.',flashcards=flashcards||'[{"f":"Qual o limite de 20% da reserva legal na questão CFC 2020.1?","b":"R$ 600.000 (20% de R$ 3.000.000)."},{"f":"Com reserva legal de R$ 585.000 e limite de R$ 600.000, quanto ainda pode ser constituído?","b":"R$ 15.000."},{"f":"Como calcular ações em circulação quando existem ações em tesouraria?","b":"Ações emitidas menos ações em tesouraria."},{"f":"Qual o dividendo obrigatório calculado na questão CFC 2020.1?","b":"R$ 76.250: 25% de (R$ 320.000 − R$ 15.000)."}]'::jsonb,quiz=quiz||'[{"q":"Na questão Consulplan/CFC 2020.1, com capital social de R$ 3.000.000, o limite de 20% da reserva legal é R$ 600.000.","a":true,"why":"3.000.000 × 20% = R$ 600.000."},{"q":"Com reserva legal existente de R$ 585.000 e limite de R$ 600.000, ainda é possível constituir R$ 16.000 integralmente.","a":false,"why":"Só há espaço de R$ 15.000 até o limite."},{"q":"Na questão, as ações em circulação são 2.750.000.","a":true,"why":"3.000.000 ações emitidas menos 250.000 ações em tesouraria."},{"q":"Considerando reserva legal de R$ 15.000, o dividendo obrigatório de 25% do lucro ajustado é R$ 76.250.","a":true,"why":"(320.000 − 15.000) × 25% = R$ 76.250."},{"q":"Na questão CFC 2020.1, o dividendo por ação calculado sobre 2.750.000 ações em circulação é aproximadamente R$ 0,02773.","a":true,"why":"76.250 ÷ 2.750.000 ≈ R$ 0,02773."}]'::jsonb,updated_at=now() where slug='pcac-2026-contabilidade-16-patrimonio-liquido-reservas-dividendos' and content_status='active'
and body_md not like '%Questão original — Consulplan/CFC 2020.1, questão 28%';