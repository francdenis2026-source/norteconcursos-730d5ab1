-- Complemento da aula 16 com a questão 22 do Exame CFC 2020.1.
update public.study_materials
set body_md = case when position('## Questão original — Consulplan/CFC 2020.1, questão 22: cálculo do Patrimônio Líquido' in body_md)=0 then body_md || '

## Questão original — Consulplan/CFC 2020.1, questão 22: cálculo do Patrimônio Líquido

O enunciado apresenta várias contas patrimoniais e pede o valor total do Patrimônio Líquido em 31/12/2016. A tabela inclui capital subscrito, reservas, ações em tesouraria, capital a integralizar, gastos com emissão de títulos patrimoniais e diversas contas do ativo e do passivo.

**Resposta: alternativa C — R$ 336.600,00.**

### Como separar as contas sem se perder

Para calcular o PL, não some tudo que aparece na tabela. Selecione apenas as contas que pertencem ao Patrimônio Líquido:

**Somam no PL:**
- Capital subscrito: R$ 250.000.
- Reserva de ágio na emissão de ações: R$ 12.000.
- Reserva de incentivos fiscais: R$ 45.000.
- Reserva legal: R$ 32.500.
- Reserva estatutária: R$ 42.100.

**Diminuem o PL:**
- Capital a integralizar: R$ 8.000.
- Ações em tesouraria: R$ 28.000.
- Gastos com emissão de títulos patrimoniais: R$ 9.000.

### Cálculo

250.000 + 12.000 + 45.000 + 32.500 + 42.100 − 8.000 − 28.000 − 9.000 = **R$ 336.600**.

### Por que as outras contas não entram?

- Fornecedores, salários a pagar, impostos a recolher, dividendos a pagar e empréstimo bancário são obrigações: ficam no passivo exigível.
- Caixa, terrenos, edificações, veículos, patentes, clientes, estoques e investimentos são contas do ativo.
- Depreciação acumulada e exaustão acumulada são contas redutoras do ativo, não componentes diretos do PL.
- Adiantamento de clientes é obrigação; adiantamento a fornecedores é ativo.

**Macete:** para achar o PL, procure capital e reservas; depois subtraia as contas redutoras do próprio patrimônio líquido. Não misture ativos e dívidas com as contas do PL.

### Treino autoral

1. Ações em tesouraria reduzem o Patrimônio Líquido. **Certo ou errado?**
2. Capital a integralizar deve ser somado ao capital subscrito para aumentar o PL. **Certo ou errado?**
3. Reserva legal, reserva estatutária e reserva de incentivos fiscais integram o PL. **Certo ou errado?**
4. Fornecedores e empréstimos bancários integram o PL. **Certo ou errado?**
5. O PL calculado na questão 22 é R$ 336.600. **Certo ou errado?**

**Gabarito comentado**
1. **Certo.** Ações em tesouraria são conta redutora do PL.
2. **Errado.** Capital a integralizar é parcela ainda não realizada e reduz o PL.
3. **Certo.** São reservas integrantes do PL.
4. **Errado.** São obrigações classificadas no passivo exigível.
5. **Certo.** A soma das contas do PL e deduções resulta em R$ 336.600.
' else body_md end,
flashcards=case when not coalesce(flashcards,'[]'::jsonb) @> '[{"f":"Na questão CFC 2020.1, qual é o PL total?"}]'::jsonb then coalesce(flashcards,'[]'::jsonb) || '[{"f":"Na questão CFC 2020.1, qual é o PL total?","b":"R$ 336.600 — alternativa C."},{"f":"Ações em tesouraria aumentam ou reduzem o PL?","b":"Reduzem o PL; são conta redutora do patrimônio líquido."},{"f":"Capital a integralizar aumenta ou reduz o PL?","b":"Reduz o PL, pois representa capital subscrito ainda não integralizado."},{"f":"Quais reservas entram no cálculo do PL da questão 22?","b":"Ágio na emissão de ações (12.000), incentivos fiscais (45.000), legal (32.500) e estatutária (42.100)."},{"f":"Fornecedores, salários a pagar e empréstimos entram no PL?","b":"Não. São obrigações classificadas no passivo exigível."}]'::jsonb else flashcards end,
quiz=case when not coalesce(quiz,'[]'::jsonb) @> '[{"q":"Ações em tesouraria são deduzidas do Patrimônio Líquido."}]'::jsonb then coalesce(quiz,'[]'::jsonb) || '[{"q":"Ações em tesouraria são deduzidas do Patrimônio Líquido.","a":true,"why":"São ações da própria companhia mantidas em tesouraria e aparecem como conta redutora do PL."},{"q":"Capital a integralizar deve ser somado ao capital subscrito para apurar o PL.","a":false,"why":"É uma dedução do PL, pois representa parcela ainda não integralizada."},{"q":"Reserva legal e reserva estatutária integram o Patrimônio Líquido.","a":true,"why":"São reservas de lucros."},{"q":"Fornecedores e empréstimos bancários são contas do Patrimônio Líquido.","a":false,"why":"Representam obrigações e ficam no passivo exigível."},{"q":"Na questão 22 do CFC 2020.1, o Patrimônio Líquido é R$ 336.600.","a":true,"why":"250.000 + 12.000 + 45.000 + 32.500 + 42.100 − 8.000 − 28.000 − 9.000 = 336.600."}]'::jsonb else quiz end,
source_note=concat_ws('; ',nullif(source_note,''),'Questão 22, Consulplan/Exame CFC 2020.1, Prova 2020.1 - Resolvida - Parte 03.pdf, páginas 7–8; cálculo refeito a partir da tabela original.'),
updated_at=now()
where slug='pcac-2026-contabilidade-16-patrimonio-liquido-reservas-dividendos';
