-- PC-AC 2026: módulo de folha de pagamento baseado na questão 22 do Exame CFC 2020.1.
insert into public.study_materials (slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,source_note,content_status,flashcards,quiz,updated_at)
values (
'pcac-2026-contabilidade-18-folha-pagamento-encargos-inss-fgts',
'Contabilidade Geral',
'18. Folha de pagamento: remuneração, INSS retido, contribuição patronal e FGTS',
18,
'Folha de pagamento e encargos sociais',
'Lançamentos contábeis da folha, separação entre INSS do empregado e patronal, FGTS e aumento do passivo circulante.',
'# Aula 18 — Folha de pagamento e encargos sociais

## 1. O que a questão cobra?
A questão 22 da Consulplan/CFC 2020.1 pergunta quanto aumenta o Passivo Circulante quando a empresa reconhece a folha de pagamento e os encargos do mês, ainda não pagos.

**Ideia simples:** salário bruto é o valor total devido pelo trabalho. Uma parte é descontada do empregado (INSS retido), mas a empresa precisa repassar esse valor ao governo. Além disso, a empresa tem encargos próprios, como INSS patronal e FGTS.

## 2. Dados do enunciado
- Remuneração bruta dos funcionários: R$ 210.000.
- INSS retido dos funcionários: R$ 23.100.
- INSS patronal: R$ 42.000.
- FGTS calculado sobre o valor bruto: R$ 16.800.

A questão informa que a folha será paga até o quinto dia do mês seguinte e pede o aumento do Passivo Circulante.

## 3. Como entender cada valor
**Remuneração bruta — R$ 210.000:** é o total do salário antes dos descontos. A empresa não paga esse total diretamente ao trabalhador, pois retém a contribuição previdenciária do empregado.

**INSS retido — R$ 23.100:** não é um encargo adicional da empresa. É uma parte do salário bruto do empregado que a empresa desconta e fica obrigada a recolher. Continua sendo obrigação a pagar.

**INSS patronal — R$ 42.000:** é encargo da própria empresa, além da remuneração bruta.

**FGTS — R$ 16.800:** também é obrigação da empresa, calculada no enunciado sobre a remuneração bruta.

## 4. Resolução passo a passo
Primeiro, separe o salário líquido e o INSS retido:
- Salário líquido a pagar: 210.000 − 23.100 = **R$ 186.900**.
- INSS retido a recolher: **R$ 23.100**.

Somando as obrigações da folha:
- Salários líquidos a pagar: R$ 186.900.
- INSS retido dos empregados: R$ 23.100.
- INSS patronal: R$ 42.000.
- FGTS: R$ 16.800.

Total do aumento do Passivo Circulante:
R$ 186.900 + R$ 23.100 + R$ 42.000 + R$ 16.800 = **R$ 268.800**.

Outra forma de conferir:
R$ 210.000 de remuneração bruta + R$ 42.000 de INSS patronal + R$ 16.800 de FGTS = **R$ 268.800**.

**Resposta: alternativa A — R$ 268.800,00.**

## 5. Lançamentos para visualizar
- Débito: Despesa com salários — R$ 210.000.
- Crédito: Salários a pagar — R$ 186.900.
- Crédito: INSS retido a recolher — R$ 23.100.
- Débito: Despesa com INSS patronal — R$ 42.000.
- Crédito: INSS patronal a recolher — R$ 42.000.
- Débito: Despesa com FGTS — R$ 16.800.
- Crédito: FGTS a recolher — R$ 16.800.

Os créditos representam as obrigações que aumentam o Passivo Circulante.

## 6. Pegadinhas da banca
- O INSS retido do empregado não é somado por fora ao salário bruto: ele já está dentro dos R$ 210.000.
- O INSS patronal é encargo adicional da empresa.
- O FGTS é obrigação adicional da empresa.
- Não confunda salário bruto com salário líquido.
- Se a pergunta for o aumento do passivo, considere todas as obrigações ainda não pagas, inclusive valores retidos e a recolher.

## Treino autoral
1. O INSS retido dos empregados já está incluído na remuneração bruta. **Certo ou errado?**
2. O INSS patronal é encargo adicional da empresa. **Certo ou errado?**
3. O salário líquido a pagar, com os dados do enunciado, é R$ 186.900. **Certo ou errado?**
4. O aumento do Passivo Circulante na questão é R$ 268.800. **Certo ou errado?**
5. O FGTS de R$ 16.800 deve ser ignorado porque não é salário pago diretamente ao empregado. **Certo ou errado?**

**Gabarito comentado**
1. **Certo.** O desconto do empregado é parte da remuneração bruta; a empresa retém e recolhe.
2. **Certo.** A contribuição patronal é obrigação própria da empresa.
3. **Certo.** 210.000 − 23.100 = 186.900.
4. **Certo.** 186.900 + 23.100 + 42.000 + 16.800 = 268.800.
5. **Errado.** O FGTS é obrigação a recolher e aumenta o passivo.',
'PC-AC 2026',
'Questão 22, Consulplan/Exame CFC 2020.1, Prova 2020.1 - Resolvida - Parte 03.pdf, página 6. Valores e alternativas reproduzidos conforme o enunciado do arquivo.',
'active',
'[{"f":"O INSS retido do empregado é encargo adicional ao salário bruto?","b":"Não. Já está incluído na remuneração bruta; a empresa retém e recolhe."},{"f":"O INSS patronal é obrigação de quem?","b":"Da empresa. É encargo adicional à remuneração bruta."},{"f":"Como calcular o salário líquido a pagar na questão CFC 2020.1?","b":"R$ 210.000 − R$ 23.100 = R$ 186.900."},{"f":"Quais itens formam o aumento do passivo na questão da folha?","b":"Salários líquidos a pagar, INSS retido a recolher, INSS patronal a recolher e FGTS a recolher."},{"f":"Qual é o aumento do Passivo Circulante na questão 22 do CFC 2020.1?","b":"R$ 268.800 — alternativa A."}]'::jsonb,
'[{"q":"O INSS retido dos empregados já está incluído na remuneração bruta.","a":true,"why":"É uma parcela descontada do salário bruto, não um encargo adicional."},{"q":"O INSS patronal é encargo adicional da empresa.","a":true,"why":"É obrigação própria da empresa, além dos salários."},{"q":"Com remuneração bruta de R$ 210.000 e INSS retido de R$ 23.100, o salário líquido é R$ 186.900.","a":true,"why":"210.000 − 23.100 = 186.900."},{"q":"O FGTS a recolher aumenta o Passivo Circulante.","a":true,"why":"É obrigação da empresa ainda não paga."},{"q":"Na questão 22 da Consulplan/CFC 2020.1, o aumento do Passivo Circulante é R$ 268.800.","a":true,"why":"186.900 + 23.100 + 42.000 + 16.800 = 268.800."},{"q":"O INSS retido deve ser somado ao salário bruto como se fosse um encargo patronal adicional.","a":false,"why":"O INSS retido já integra os R$ 210.000 da remuneração bruta."}]'::jsonb,
now()
)
on conflict (slug) do update set discipline=excluded.discipline,topic_label=excluded.topic_label,sort_order=excluded.sort_order,title=excluded.title,summary=excluded.summary,body_md=excluded.body_md,source_note=excluded.source_note,content_status='active',flashcards=excluded.flashcards,quiz=excluded.quiz,updated_at=now();
