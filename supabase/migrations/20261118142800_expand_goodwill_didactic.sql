-- Complemento didático idempotente; preserva conteúdo existente.
update public.study_materials
set body_md=coalesce(body_md,'') || E'\n\n' || $lesson$## Goodwill na prática — a padaria

Imagine a aquisição integral de uma padaria por R$ 150 mil, cujos ativos líquidos identificáveis, avaliados a valor justo, somam R$ 100 mil. Nesse exemplo simplificado, o goodwill é R$ 50 mil: o preço adicional reflete expectativas de rentabilidade, clientela e reputação.

Se o teste de recuperabilidade da unidade geradora de caixa indicar uma perda de R$ 20 mil atribuída ao goodwill, seu saldo cai para R$ 30 mil. Mesmo que o negócio volte a prosperar, essa perda não pode ser revertida.

O CPC 01 (R1), itens 124 e 125, proíbe a reversão da perda do goodwill, pois uma recuperação posterior provavelmente representa goodwill gerado internamente, cujo reconhecimento é proibido. Para outros ativos, como máquinas, pode haver reversão nas condições da norma, respeitado o limite do valor contábil que existiria sem a perda.

**Dica de prova:** goodwill perdeu, não recupera contabilmente aquela perda. A afirmação de que uma perda anteriormente reconhecida sobre goodwill não pode ser revertida em exercício futuro está CERTA.$lesson$,
updated_at=now()
where slug='pcac-2026-contabilidade-10-impairment-goodwill-reducao-valor-recuperavel'
and coalesce(body_md,'') not like '%## Goodwill na prática — a padaria%';

update public.study_materials
set quiz=coalesce(quiz,'[]'::jsonb) || $quiz$[{"q":"Uma empresa poderá reverter uma perda reconhecida sobre goodwill caso volte a apresentar lucros elevados.","a":false,"why":"O CPC 01, item 124, proíbe a reversão, mesmo se a rentabilidade melhorar."}]$quiz$::jsonb, updated_at=now()
where slug='pcac-2026-contabilidade-10-impairment-goodwill-reducao-valor-recuperavel'
and (quiz is null or jsonb_typeof(quiz)='array')
and not exists(select 1 from jsonb_array_elements(case when jsonb_typeof(quiz)='array' then quiz else '[]'::jsonb end) x where x->>'q'=$question$Uma empresa poderá reverter uma perda reconhecida sobre goodwill caso volte a apresentar lucros elevados.$question$);

update public.study_materials
set quiz=coalesce(quiz,'[]'::jsonb) || $quiz$[{"q":"A perda por impairment de uma máquina poderá ser revertida, desde que sejam atendidos os requisitos contábeis.","a":true,"why":"A reversão é possível para ativos distintos do goodwill, respeitando as condições e limites do CPC 01."}]$quiz$::jsonb, updated_at=now()
where slug='pcac-2026-contabilidade-10-impairment-goodwill-reducao-valor-recuperavel'
and (quiz is null or jsonb_typeof(quiz)='array')
and not exists(select 1 from jsonb_array_elements(case when jsonb_typeof(quiz)='array' then quiz else '[]'::jsonb end) x where x->>'q'=$question$A perda por impairment de uma máquina poderá ser revertida, desde que sejam atendidos os requisitos contábeis.$question$);
