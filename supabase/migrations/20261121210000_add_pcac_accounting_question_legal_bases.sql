-- PC-AC 2026 — complete legal/normative traceability for original curated questions.
-- Does not alter question stems, answer keys, explanations or status.

update public.curated_question_catalog
set legal_basis = case external_item_key
 when 'pcac26-dre-001' then jsonb_build_array(
  jsonb_build_object('type','law','reference','Lei nº 6.404/1976, art. 187 — estrutura da Demonstração do Resultado do Exercício'),
  jsonb_build_object('type','standard','reference','CPC 26 (R1), itens 81A e 82 — apresentação do resultado do período')
 )
 when 'pcac26-dre-002' then jsonb_build_array(
  jsonb_build_object('type','law','reference','Lei nº 6.404/1976, art. 187 — confronto de receitas, custos e despesas'),
  jsonb_build_object('type','standard','reference','CPC 26 (R1), item 82 — resultado do período')
 )
 when 'pcac26-pecld-001' then jsonb_build_array(
  jsonb_build_object('type','standard','reference','CPC 48, itens 5.5.3 e 5.5.15 — reconhecimento de perdas de crédito esperadas e abordagem simplificada para contas a receber de clientes'),
  jsonb_build_object('type','standard','reference','CPC 48, item 5.5.17 — mensuração das perdas de crédito esperadas')
 )
 when 'pcac26-pecld-002' then jsonb_build_array(
  jsonb_build_object('type','standard','reference','CPC 48, itens 5.5.8 e 5.5.15 — reconhecimento e apresentação da provisão para perdas esperadas em recebíveis'),
  jsonb_build_object('type','reference','reference','Estrutura conceitual de apresentação: conta de perda esperada retifica o valor contábil dos recebíveis; saldo credor em razão da função redutora do ativo')
 )
 when 'pcac26-pecld-003' then jsonb_build_array(
  jsonb_build_object('type','standard','reference','CPC 48, itens 5.5.3 e 5.5.15 — reconhecimento de perdas de crédito esperadas'),
  jsonb_build_object('type','standard','reference','CPC 48, item 5.5.17 — mensuração da provisão para perdas')
 )
 when 'pcac26-pnc-001' then jsonb_build_array(
  jsonb_build_object('type','standard','reference','CPC 36 (R3), item 22 — atribuição do resultado e de cada componente de outros resultados abrangentes aos proprietários da controladora e às participações de não controladores')
 )
 when 'pcac26-pnc-002' then jsonb_build_array(
  jsonb_build_object('type','standard','reference','CPC 36 (R3), item 22 — apresentação separada das parcelas do resultado atribuíveis aos proprietários da controladora e aos não controladores')
 )
 else legal_basis end
where external_item_key in (
 'pcac26-dre-001','pcac26-dre-002','pcac26-pecld-001','pcac26-pecld-002',
 'pcac26-pecld-003','pcac26-pnc-001','pcac26-pnc-002'
);
