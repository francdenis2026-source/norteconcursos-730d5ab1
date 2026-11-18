-- Complemento ao módulo goodwill, sem substituir conteúdo existente.
update public.study_materials
set body_md=coalesce(body_md,'') || $md$

## Compra vantajosa — CPC 15, itens 34–36

Imagine comprar 90% de uma empresa com ativos identificáveis de R$ 500 mil e passivos de R$ 100 mil, mensurados conforme CPC 15. Pagando R$ 300 mil e mensurando os não controladores proporcionalmente em R$ 40 mil, o ganho é 400 - 300 - 40 = R$ 60 mil. Antes de reconhecer o ganho no resultado, revise ativos e passivos, participação dos não controladores, contraprestação transferida e, em aquisição em etapas, participação anteriormente detida. Não controladores são os sócios restantes; contraprestação é aquilo que se entrega em troca do controle. Uma dívida esquecida pode eliminar o ganho. Dica: compra vantajosa exige conferência antes do reconhecimento.

## Goodwill — perda não reversível (CPC 01, itens 124–125)

Uma padaria adquirida por R$ 150 mil com ativos líquidos identificáveis a valor justo de R$ 100 mil gera goodwill de R$ 50 mil (aquisição integral simplificada). Se houver perda por impairment de R$ 20 mil atribuída ao goodwill, restam R$ 30 mil. Mesmo que o negócio prospere depois, não se reverte essa perda: a recuperação pode corresponder a goodwill gerado internamente, cujo reconhecimento é proibido. Outros ativos podem ter reversão sob condições e limites do CPC 01. Dica: goodwill perdeu, não reverte.
$md$,
quiz=coalesce(quiz,'[]'::jsonb) || '[{"q":"Antes de reconhecer ganho por compra vantajosa, deve-se revisar a contraprestação transferida e a participação de não controladores, além dos ativos e passivos identificáveis.","a":true,"why":"CPC 15 item 36: também se revisa participação anteriormente detida quando aplicável."},{"q":"Na compra de 90% por R$ 300 mil, com ativos líquidos de R$ 400 mil e não controladores de R$ 40 mil, o ganho é R$ 100 mil.","a":false,"why":"O ganho é 400 - 300 - 40 = R$ 60 mil."},{"q":"A recuperação dos lucros permite reverter perda anterior de goodwill.","a":false,"why":"CPC 01 item 124 proíbe a reversão."},{"q":"A perda por impairment de uma máquina pode ser revertida se satisfeitas as condições e limites do CPC 01.","a":true,"why":"A vedação específica de reversão se aplica ao goodwill."}]'::jsonb,
updated_at=now()
where slug='pcac-2026-contabilidade-10-impairment-goodwill-reducao-valor-recuperavel'
and coalesce(body_md,'') not like '%## Compra vantajosa — CPC 15, itens 34–36%';
