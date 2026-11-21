-- PC-AC 2026 — accounting fundamentals and patrimonial equation.
-- Remove unrelated CPC 26 content and extend the basic patrimonial examples.

update public.study_materials
set body_md=split_part(body_md,E'\n## Classificação dos passivos financeiros — CPC 26',1)
|| E'\n\n## 8. Patrimônio líquido positivo, nulo ou negativo\n\nA equação fundamental é Ativo = Passivo exigível + Patrimônio Líquido. Reorganizando: PL = Ativo − Passivo.\n\n- Se Ativo > Passivo, o PL é positivo (situação líquida positiva).\n- Se Ativo = Passivo, o PL é zero (situação líquida nula).\n- Se Ativo < Passivo, o PL é negativo (situação líquida negativa; em abordagem tradicional, passivo a descoberto).\n\nExemplo: Ativo R$ 80.000 e Passivo R$ 95.000. PL = 80.000 − 95.000 = −R$ 15.000.\n\n## 9. Fatos que alteram o patrimônio\n\nUma operação pode alterar apenas a composição dos ativos, alterar o total do patrimônio ou modificar o PL. Compra de equipamento à vista aumenta imobilizado e reduz caixa pelo mesmo valor; compra de mercadoria a prazo aumenta estoque e fornecedores; pagamento de fornecedor reduz caixa e passivo; aporte de capital aumenta caixa e PL.\n\n## 10. Roteiro de prova\n\n1. Classifique cada elemento: bem/direito no Ativo; obrigação no Passivo.\n2. Some separadamente Ativo e Passivo.\n3. Calcule PL = Ativo − Passivo.\n4. Se houver financiamento, registre o bem pelo valor integral e a dívida separadamente.\n5. Confira a equação Ativo = Passivo + PL.\n6. Não confunda patrimônio em sentido amplo com patrimônio líquido.\n',
updated_at=now()
where contest_name='PC-AC 2026'
and slug='pcac-2026-contabilidade-01-fundamentos-patrimonio-ativo-passivo';

-- The 12 original trainer questions remain in order; each was enriched with
-- question-specific explanation, exam tip and resolution_steps in the live quiz.
