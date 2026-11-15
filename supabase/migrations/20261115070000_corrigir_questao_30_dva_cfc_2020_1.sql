-- Corrige e amplia a resolução da questão 30 (DVA) do CFC 2020.1 na aula 15.
do $$
declare
  v_slug text := 'pcac-2026-contabilidade-15-dfc-dva-fluxos-caixa-demonstracoes';
  v_marker text := '## Questão Consulplan/CFC 2020.1, questão 30';
  v_next text := '## Questão Consulplan/CFC 2020.1, questão 32';
  v_body text;
  v_pos integer;
  v_next_pos integer;
  v_section text := $lesson$## Questão original — Consulplan/CFC 2020.1, questão 30: DVA e valor adicionado a distribuir

A DRE de 31/12/2016 apresenta os seguintes dados:
- Receita bruta de vendas: R$ 328.000.
- ICMS/faturamento: R$ 59.040.
- Receita líquida de vendas: R$ 268.960.
- Custo das mercadorias vendidas (CMV): R$ 146.600.
- Lucro bruto: R$ 122.360.
- Salários e encargos: R$ 12.200.
- Depreciação: R$ 8.000.
- Aluguéis: R$ 14.000.
- Receita financeira: R$ 16.500.
- Despesas financeiras: R$ 6.400.
- Lucro líquido do exercício: R$ 73.760.

A pergunta é: qual é o **Valor Adicionado a Distribuir**?

**Resposta correta: alternativa A — R$ 130.860,00.**

### Resolução passo a passo — sem pular etapas

**1. Comece pela receita bruta e retire os tributos sobre vendas.**

R$ 328.000 − R$ 59.040 = **R$ 268.960 de receita líquida**.

O ICMS/faturamento não representa riqueza que fica com a empresa: é dedução da receita.

**2. Subtraia o CMV para encontrar o valor adicionado bruto.**

R$ 268.960 − R$ 146.600 = **R$ 122.360**.

Esse resultado coincide com o lucro bruto apresentado na DRE.

**3. Retire a depreciação para chegar ao valor adicionado líquido produzido.**

R$ 122.360 − R$ 8.000 = **R$ 114.360**.

A depreciação é uma retenção na estrutura da DVA.

**4. Some o valor adicionado recebido em transferência.**

A receita financeira de R$ 16.500 é valor adicionado recebido em transferência.

R$ 114.360 + R$ 16.500 = **R$ 130.860**.

**Gabarito: alternativa A — R$ 130.860,00.**

### Por que não subtrair aluguel e salários nessa conta?

Porque o objetivo agora é descobrir a riqueza gerada e disponível para distribuição. Salários e encargos são distribuição ao pessoal; aluguéis são remuneração de capitais de terceiros. Eles aparecem na etapa de distribuição do valor adicionado, não como deduções adicionais nessa sequência de cálculo.

As despesas financeiras de R$ 6.400 também não são subtraídas do valor adicionado recebido em transferência: a receita financeira de R$ 16.500 é apresentada como riqueza recebida em transferência.

### Macete para a prova

**Receita líquida − insumos/CMV − depreciação + valores recebidos em transferência = valor adicionado a distribuir.**

Atenção à ordem:
1. Retire os tributos/deduções da receita bruta.
2. Subtraia o CMV.
3. Subtraia depreciação, amortização e exaustão, quando informadas.
4. Some o valor adicionado recebido em transferência.

### Treino autoral

1. O ICMS sobre vendas informado na DRE deve ser considerado antes de calcular o valor adicionado bruto. **Certo ou errado?**
2. O CMV de R$ 146.600 deve ser deduzido da receita líquida. **Certo ou errado?**
3. A depreciação de R$ 8.000 é uma retenção na DVA. **Certo ou errado?**
4. A receita financeira de R$ 16.500 é valor adicionado recebido em transferência. **Certo ou errado?**
5. O valor adicionado a distribuir na questão é R$ 130.860. **Certo ou errado?**

**Gabarito comentado**
1. **Certo.** A receita líquida é R$ 328.000 − R$ 59.040 = R$ 268.960.
2. **Certo.** 268.960 − 146.600 = 122.360.
3. **Certo.** 122.360 − 8.000 = 114.360.
4. **Certo.** A receita financeira entra como valor recebido em transferência.
5. **Certo.** 114.360 + 16.500 = 130.860.
$lesson$;
begin
  select body_md into v_body from public.study_materials where slug=v_slug for update;
  if v_body is null then
    raise exception 'Aula não encontrada: %', v_slug;
  end if;
  v_pos := position(v_marker in v_body);
  if v_pos > 0 then
    v_next_pos := position(v_next in substring(v_body from v_pos));
    if v_next_pos > 0 then
      v_body := left(v_body, v_pos - 1) || v_section || E'\n\n' || substring(v_body from v_pos + v_next_pos - 1);
    else
      v_body := left(v_body, v_pos - 1) || v_section;
    end if;
    update public.study_materials set body_md=v_body, updated_at=now() where slug=v_slug;
  end if;
end $$;

update public.study_materials
set flashcards = case
  when coalesce(flashcards,'[]'::jsonb) @> '[{"f":"Na questão 30 do CFC 2020.1, qual é o valor adicionado a distribuir?"}]'::jsonb then flashcards
  else coalesce(flashcards,'[]'::jsonb) || '[
    {"f":"Na questão 30 do CFC 2020.1, qual é o valor adicionado a distribuir?","b":"R$ 130.860 — alternativa A."},
    {"f":"Na questão 30 da DVA, como calcular a receita líquida?","b":"R$ 328.000 de receita bruta menos R$ 59.040 de ICMS/faturamento = R$ 268.960."},
    {"f":"Qual é o valor adicionado bruto da questão 30?","b":"R$ 122.360 — receita líquida de R$ 268.960 menos CMV de R$ 146.600."},
    {"f":"Como calcular o valor adicionado líquido produzido na questão 30?","b":"R$ 114.360 — valor adicionado bruto de R$ 122.360 menos depreciação de R$ 8.000."},
    {"f":"Por que a receita financeira de R$ 16.500 entra na DVA da questão 30?","b":"É valor adicionado recebido em transferência e soma-se ao valor adicionado líquido produzido."}
  ]'::jsonb end,
quiz = case
  when coalesce(quiz,'[]'::jsonb) @> '[{"q":"Na questão 30 do CFC 2020.1, o ICMS/faturamento de R$ 59.040 é deduzido da receita bruta antes de calcular o valor adicionado bruto."}]'::jsonb then quiz
  else coalesce(quiz,'[]'::jsonb) || '[
    {"q":"Na questão 30 do CFC 2020.1, o ICMS/faturamento de R$ 59.040 é deduzido da receita bruta antes de calcular o valor adicionado bruto.","a":true,"why":"Receita líquida = 328.000 − 59.040 = 268.960."},
    {"q":"O valor adicionado bruto da questão 30 é R$ 181.400.","a":false,"why":"Esse cálculo esquece de deduzir o ICMS/faturamento. O correto é 268.960 − 146.600 = 122.360."},
    {"q":"A depreciação de R$ 8.000 é deduzida para chegar ao valor adicionado líquido produzido.","a":true,"why":"122.360 − 8.000 = 114.360."},
    {"q":"A receita financeira de R$ 16.500 é valor adicionado recebido em transferência.","a":true,"why":"Ela é somada ao valor adicionado líquido produzido."},
    {"q":"Na questão 30 do CFC 2020.1, o valor adicionado a distribuir é R$ 130.860, alternativa A.","a":true,"why":"114.360 + 16.500 = 130.860."}
  ]'::jsonb end,
source_note=concat_ws('; ',nullif(source_note,''),'Questão 30, Consulplan/Exame CFC 2020.1, Prova 2020.1 - Resolvida - Parte 03.pdf, páginas 21–22; resolução conferida com a DRE original.'),
updated_at=now()
where slug='pcac-2026-contabilidade-15-dfc-dva-fluxos-caixa-demonstracoes';
