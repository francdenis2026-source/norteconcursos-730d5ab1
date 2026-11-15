-- Auditoria de cobertura do Anexo III: reforço dos subitens 6.3–6.5 e 7.7–7.8.
-- Corrige cartões invertidos e retira repetição textual de uma questão já resolvida.

update public.study_materials
set quiz=jsonb_set(quiz,'{5}','{"a":true,"q":"Dois sócios integralizam R$ 25.000 cada em dinheiro, totalizando R$ 50.000 de capital social.","why":"Certo. 25.000 + 25.000 = R$ 50.000. O item agora segue o formato de julgamento certo/errado usado no restante do simulado."}'::jsonb),
flashcards=jsonb_set(
  jsonb_set(flashcards,'{10}','{"f":"Qual é o campo de aplicação da Contabilidade, conforme o resumo?","b":"Aziendas: patrimônio administrado."}'::jsonb),
  '{11}','{"f":"O que significa autonomia patrimonial?","b":"A pessoa jurídica possui patrimônio próprio, distinto do patrimônio particular dos sócios."}'::jsonb),
updated_at=now()
where slug='pcac-2026-contabilidade-01-fundamentos-patrimonio-ativo-passivo';

update public.study_materials
set quiz=quiz || '[
 {"a":true,"q":"Depósito e transferência recebida representam, em regra, entradas de recursos na conta do titular; saque e pagamento representam saídas.","why":"A questão exige identificar a direção do fluxo sob a perspectiva do titular da conta."},
 {"a":true,"q":"PIX e TED são modalidades de transferência; para identificar origem e destino, devem ser examinados os dados de identificação disponíveis na operação.","why":"A modalidade não substitui a identificação das contas, titulares, instituição, data, horário e beneficiário."},
 {"a":false,"q":"Se o extrato não apresentar o nome completo do beneficiário, é correto completar a informação por suposição.","why":"Não se deve inventar dado ausente. A limitação deve ser registrada e a informação confirmada por fonte legítima."}
]'::jsonb,
flashcards=flashcards || '[
 {"f":"Quais operações normalmente representam entrada e saída de recursos?","b":"Depósitos e transferências recebidas são entradas; saques e pagamentos são saídas."},
 {"f":"O que deve ser observado em uma operação PIX ou TED?","b":"Valor, data, horário, identificadores, instituição e contas de origem e destino, conforme disponíveis."},
 {"f":"Como tratar dado de beneficiário ausente no extrato?","b":"Registrar a limitação e buscar confirmação por fonte legítima; nunca presumir."}
]'::jsonb,
updated_at=now()
where slug='pcac-2026-contabilidade-06-sistema-bancario-extratos-pix-ted';

update public.study_materials
set quiz=quiz || '[
 {"a":true,"q":"Um demonstrativo financeiro simplificado pode apresentar saldo inicial, total de entradas, total de saídas, saldo final e principais origens e destinos dos recursos.","why":"Esses elementos resumem o fluxo financeiro e permitem visualizar a movimentação no período."},
 {"a":true,"q":"Um fluxo financeiro pode ser representado pela sequência de entradas, saídas e transferências entre contas, desde que os vínculos estejam apoiados em registros verificáveis.","why":"A representação organiza as relações entre transações sem substituir a comprovação documental."}
]'::jsonb,
flashcards=flashcards || '[
 {"f":"O que pode conter um demonstrativo financeiro simplificado?","b":"Saldo inicial e final, entradas, saídas, período, origens, destinos e divergências relevantes."},
 {"f":"O que representa um fluxo financeiro?","b":"A sequência de entradas, saídas e transferências entre contas e as relações verificáveis entre elas."}
]'::jsonb,
updated_at=now()
where slug='pcac-2026-contabilidade-07-analise-movimentacoes-financeiras-conciliacao';

update public.study_materials
set quiz=jsonb_set(quiz,'{4}','{"a":true,"q":"Na conciliação bancária, o razão apresenta R$ 10.750; há tarifa não contabilizada de R$ 300, débito de serviços de R$ 700, devolução de duplicata de R$ 1.500 e TED recebida não contabilizada de R$ 5.000. O saldo contábil ajustado é R$ 13.250.","why":"Certo. 10.750 − 300 − 700 − 1.500 + 5.000 = R$ 13.250. Cheques e depósitos já contabilizados, mas em trânsito, não são lançados novamente."}'::jsonb),
flashcards=jsonb_set(flashcards,'{0}','{"f":"O que é conciliação bancária?","b":"Comparação do extrato bancário com o razão contábil para identificar diferenças e ajustes necessários."}'::jsonb),
body_md=regexp_replace(body_md,E'\\n## Questão 20 — Conciliação bancária \\(Consulplan/CFC 2020\\.1\\)[\\s\\S]*$',''),
updated_at=now()
where slug='pcac-2026-contabilidade-17-sistema-bancario-conciliacao-extrato-razao';
