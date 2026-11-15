-- Synchronize the PC-AC Contabilidade content corrections made directly in Supabase.
-- Idempotent data migration: preserves existing questions and cards except the explicitly corrected entries.

-- Keep the ten complementary Contabilidade modules available, matching the current reviewed catalog.
update public.study_materials
set content_status='active',
    contest_name='PC-AC 2026',
    updated_at=now()
where slug in (
  'pcac-2026-contabilidade-08-custos-materia-prima-rateio-departamentalizacao',
  'pcac-2026-contabilidade-09-investimentos-dividendos-mep-metodo-custo',
  'pcac-2026-contabilidade-10-impairment-goodwill-reducao-valor-recuperavel',
  'pcac-2026-contabilidade-11-estoques-mensuracao-avp-inventarios',
  'pcac-2026-contabilidade-12-moeda-estrangeira-cpc02-moeda-funcional',
  'pcac-2026-contabilidade-13-custeio-rkw-variavel-ponto-equilibrio',
  'pcac-2026-contabilidade-14-imobilizado-depreciacao-provisoes-contingencias',
  'pcac-2026-contabilidade-15-dfc-dva-fluxos-caixa-demonstracoes',
  'pcac-2026-contabilidade-16-patrimonio-liquido-reservas-dividendos',
  'pcac-2026-contabilidade-18-folha-pagamento-encargos-inss-fgts'
)
and content_status <> 'active';

-- AVP: correct the displayed present values and explain rounding only at the final result.
update public.study_materials
set body_md = replace(
  replace(
    replace(
      replace(body_md,
        '2ª parcela: 20.000 ÷ 1,15² = R$ 15.123,74.',
        '2ª parcela: 20.000 ÷ 1,15² = aproximadamente R$ 15.122,87.'),
      '3ª parcela: 20.000 ÷ 1,15³ = R$ 13.151,08.',
      '3ª parcela: 20.000 ÷ 1,15³ = aproximadamente R$ 13.150,32.'),
    'Valor presente aproximado: R$ 45.664,49. Ajuste aproximado: R$ 14.335,51.',
    'Valor presente (com arredondamento apenas no resultado final): **R$ 45.664,50**. AVP: **R$ 14.335,50**.'),
  'Valor presente = soma das parcelas descontadas = **R$ 45.664,50**. Ajuste a valor presente = 60.000 − 45.664,50 = **R$ 14.335,50**.',
  'Somando os valores exatos antes do arredondamento, o valor presente é **R$ 45.664,50**. O AVP é 60.000 − 45.664,50 = **R$ 14.335,50**. As parcelas exibidas foram arredondadas individualmente; por isso, a soma dos números já arredondados pode diferir em R$ 0,01.')
where slug='pcac-2026-contabilidade-11-estoques-mensuracao-avp-inventarios';

-- Investments: remove a confusing self-correction from the worked example.
update public.study_materials
set body_md=replace(body_md,
  'Como o enunciado informa método de custo e a distribuição ocorre em 31/12/2019, mais de seis meses após a aquisição em 15/03/2019? Não: o intervalo é inferior a seis meses? De 15/03 a 31/12 são mais de seis meses. Portanto, aplica-se o tratamento de receita de dividendos indicado no material.',
  'Como a aquisição ocorreu em 15/03/2019 e a distribuição foi aprovada em 31/12/2019, passaram-se mais de seis meses. Portanto, aplica-se o tratamento de receita de dividendos indicado no material para o método de custo.')
where slug='pcac-2026-contabilidade-09-investimentos-dividendos-mep-metodo-custo';

-- Remove duplicated trailing worked-question sections while preserving the first complete resolution.
update public.study_materials
set body_md=regexp_replace(body_md,
  E'\n## Questão 25 — Rateio departamental \\(Consulplan/CFC 2020\\.1\\)[\\s\\S]*$','')
where slug='pcac-2026-contabilidade-08-custos-materia-prima-rateio-departamentalizacao'
  and body_md like '%## Questão 25 — Rateio departamental (Consulplan/CFC 2020.1)%';

update public.study_materials
set body_md=regexp_replace(body_md,
  E'\n## Questão 26 — ROI, margem sobre vendas e giro do ativo \\(Consulplan/CFC 2020\\.1\\)[\\s\\S]*$','')
where slug='pcac-2026-contabilidade-13-custeio-rkw-variavel-ponto-equilibrio'
  and body_md like '%## Questão 26 — ROI, margem sobre vendas e giro do ativo (Consulplan/CFC 2020.1)%';

update public.study_materials
set body_md=regexp_replace(body_md,
  E'\n## Questão original — Consulplan/CFC 2020\\.1, questão 22 \\(segunda questão\\): composição do Patrimônio Líquido[\\s\\S]*$','')
where slug='pcac-2026-contabilidade-16-patrimonio-liquido-reservas-dividendos'
  and body_md like '%## Questão original — Consulplan/CFC 2020.1, questão 22 (segunda questão): composição do Patrimônio Líquido%';

-- Normalize the first five Patrimônio Líquido flashcards to the UI's {f,b} shape.
update public.study_materials
set flashcards=jsonb_set(
  jsonb_set(
    jsonb_set(
      jsonb_set(
        jsonb_set(flashcards,
          '{0}', '{"f":"Qual o percentual da reserva legal indicado no resumo?","b":"5% do lucro líquido do exercício, antes de qualquer destinação."}'::jsonb),
        '{1}', '{"f":"Qual o limite obrigatório da reserva legal?","b":"20% do capital social realizado."}'::jsonb),
      '{2}', '{"f":"Quais exemplos de reservas de capital o resumo apresenta?","b":"Ágio na emissão de ações; alienação de partes beneficiárias; alienação de bônus de subscrição."}'::jsonb),
    '{3}', '{"f":"Onde fica a reserva para contingências?","b":"No Patrimônio Líquido, como reserva de lucros."}'::jsonb),
  '{4}', '{"f":"Qual foi a reserva legal a constituir na questão CFC 2020.2?","b":"R$ 2.880,00."}'::jsonb),
  updated_at=now()
where slug='pcac-2026-contabilidade-16-patrimonio-liquido-reservas-dividendos'
  and jsonb_typeof(flashcards)='array'
  and jsonb_array_length(flashcards)>=5;

-- DVA: correct the value-added calculation using gross revenue, and retain the original DRE figures.
update public.study_materials
set body_md=replace(
  replace(
    replace(
      replace(
        replace(
          replace(
            replace(
              replace(body_md,
                'R$ 328.000 − R$ 59.040 = **R$ 268.960 de receita líquida**.',
                'Para a DVA, comece pela receita bruta de vendas: **R$ 328.000**. Não retire os R$ 59.040 de ICMS/faturamento nessa etapa. Na DVA, esse tributo integra a riqueza gerada e será apresentado na distribuição do valor adicionado ao governo.'),
              'R$ 268.960 − R$ 146.600 = **R$ 122.360**.',
              'R$ 328.000 − R$ 146.600 = **R$ 181.400 de valor adicionado bruto**.'),
            'R$ 122.360 − R$ 8.000 = **R$ 114.360**.',
            'R$ 181.400 − R$ 8.000 = **R$ 173.400 de valor adicionado líquido produzido**.'),
          'R$ 114.360 + R$ 16.500 = **R$ 130.860**.',
          'R$ 173.400 + R$ 16.500 = **R$ 189.900 de valor adicionado total a distribuir**.'),
        'Resposta correta: alternativa A — R$ 130.860,00.',
        'Resposta correta: alternativa D — R$ 189.900,00.'),
      'R$ 268.960 − R$ 146.600 = **R$ 122.360**.',
      'R$ 328.000 − R$ 146.600 = **R$ 181.400 de valor adicionado bruto**.'),
    'R$ 122.360 − R$ 8.000 = **R$ 114.360**.',
    'R$ 181.400 − R$ 8.000 = **R$ 173.400 de valor adicionado líquido produzido**.'),
  'R$ 114.360 + R$ 16.500 = **R$ 130.860**.',
  'R$ 173.400 + R$ 16.500 = **R$ 189.900 de valor adicionado total a distribuir**.'),
  updated_at=now()
where slug='pcac-2026-contabilidade-15-dfc-dva-fluxos-caixa-demonstracoes';

update public.study_materials
set body_md=replace(
  replace(
    replace(
      replace(
        replace(body_md,
          '<text>**Gabarito: alternativa A — R$ 130.860,00.**</text>',
          '<text>**Gabarito: alternativa D — R$ 189.900,00.**</text>'),
        '1. Retire os tributos/deduções da receita bruta.',
        '1. Comece pela receita bruta; na DVA, os tributos sobre vendas são apresentados na distribuição ao governo, não abatidos nessa etapa.'),
      '1. **Certo.** A receita líquida é R$ 328.000 − R$ 59.040 = R$ 268.960.',
      '1. **Errado.** Na DVA, a base é a receita bruta de R$ 328.000; o ICMS/faturamento é distribuído ao governo.'),
    '2. **Certo.** 268.960 − 146.600 = 122.360.',
    '2. **Certo.** 328.000 − 146.600 = R$ 181.400.'),
  '5. **Certo.** 114.360 + 16.500 = 130.860.',
  '5. **Certo.** 181.400 − 8.000 + 16.500 = R$ 189.900.')
where slug='pcac-2026-contabilidade-15-dfc-dva-fluxos-caixa-demonstracoes';

-- Keep the DVA quiz aligned with the corrected resolution and add the didactic MEP item.
update public.study_materials
set quiz=jsonb_set(
  jsonb_set(
    jsonb_set(
      jsonb_set(
        jsonb_set(
          jsonb_set(quiz,
            '{11}', '{"a":false,"q":"Na questão 30 do CFC 2020.1, o ICMS/faturamento de R$ 59.040 é deduzido da receita bruta antes de calcular o valor adicionado bruto.","why":"Errado. Na DVA, a receita bruta de R$ 328.000 é a base. O ICMS/faturamento integra a distribuição ao governo; não é subtraído nessa etapa."}'::jsonb),
          '{12}', '{"a":true,"q":"O valor adicionado bruto da questão 30 é R$ 181.400.","why":"328.000 de receita bruta − 146.600 de CMV = R$ 181.400. O ICMS/faturamento não é deduzido nessa etapa da DVA."}'::jsonb),
        '{13}', '{"a":true,"q":"A depreciação de R$ 8.000 é deduzida para chegar ao valor adicionado líquido produzido.","why":"181.400 − 8.000 = R$ 173.400."}'::jsonb),
      '{14}', '{"a":true,"q":"A receita financeira de R$ 16.500 é valor adicionado recebido em transferência.","why":"A receita financeira é apresentada no grupo de valores adicionados recebidos em transferência."}'::jsonb),
    '{15}', '{"a":false,"q":"Na questão 30 do CFC 2020.1, o valor adicionado a distribuir é R$ 130.860, alternativa A.","why":"Errado. O cálculo correto é 181.400 − 8.000 + 16.500 = R$ 189.900, alternativa D."}'::jsonb),
  '{20}', '{"a":true,"q":"Na DVA, o resultado positivo de equivalência patrimonial é classificado como valor adicionado recebido em transferência.","why":"O resultado foi gerado pela investida, não diretamente pelas operações próprias da investidora. A participação reconhecida pelo MEP entra na DVA como valor recebido em transferência, mesmo que não tenha havido recebimento de dinheiro ou dividendos."}'::jsonb),
updated_at=now()
where slug='pcac-2026-contabilidade-15-dfc-dva-fluxos-caixa-demonstracoes'
  and jsonb_typeof(quiz)='array'
  and jsonb_array_length(quiz)>=21;

-- Normalize the affected DVA flashcards and append the equivalence-patrimonial explanation.
update public.study_materials
set flashcards=(
  jsonb_set(
    jsonb_set(
      jsonb_set(
        jsonb_set(flashcards,
          '{12}', '{"f":"Na questão 30 do CFC 2020.1, qual é o valor adicionado a distribuir?","b":"R$ 189.900 — alternativa D: 328.000 − 146.600 − 8.000 + 16.500."}'::jsonb),
        '{13}', '{"f":"Na questão 30 da DVA, qual valor usar como receita de vendas na geração do valor adicionado?","b":"R$ 328.000 de receita bruta. O ICMS/faturamento de R$ 59.040 será apresentado na distribuição ao governo; não é abatido nessa etapa."}'::jsonb),
      '{14}', '{"f":"Qual é o valor adicionado bruto da questão 30?","b":"R$ 181.400 — receita bruta de R$ 328.000 menos CMV de R$ 146.600."}'::jsonb),
    '{15}', '{"f":"Como calcular o valor adicionado líquido produzido na questão 30?","b":"R$ 173.400 — valor adicionado bruto de R$ 181.400 menos depreciação de R$ 8.000."}'::jsonb)
  || '[{"f":"Por que o resultado de equivalência patrimonial aparece como valor adicionado recebido em transferência na DVA?","b":"Porque o resultado foi gerado pela investida, não pelas operações próprias da investidora. É a participação no lucro de outra entidade, reconhecida pelo MEP; não significa necessariamente recebimento de dinheiro ou dividendos."}]'::jsonb
),
updated_at=now()
where slug='pcac-2026-contabilidade-15-dfc-dva-fluxos-caixa-demonstracoes'
  and jsonb_typeof(flashcards)='array'
  and jsonb_array_length(flashcards)>=16;

-- Record the didactic review for the corrected DVA exercise set.
update public.study_materials
set practice_review=jsonb_set(
  jsonb_set(coalesce(practice_review,'{}'::jsonb),'{items_checked}',
    to_jsonb(jsonb_array_length(coalesce(quiz,'[]'::jsonb))),true),
  '{checked_at}',to_jsonb(now()),true),
updated_at=now()
where slug='pcac-2026-contabilidade-15-dfc-dva-fluxos-caixa-demonstracoes';

-- Normalize the module 16 cards without changing their learning content.
update public.study_materials
set updated_at=now()
where slug='pcac-2026-contabilidade-16-patrimonio-liquido-reservas-dividendos';
