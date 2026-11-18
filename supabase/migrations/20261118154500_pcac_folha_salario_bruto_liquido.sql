update public.study_materials
set body_md=coalesce(body_md,'') || $md$

## Por que um salário combinado de R$ 1.000 custa R$ 1.200?

Exemplo hipotético e simplificado, sem outras rubricas: o patrão combina salário bruto de R$ 1.000. Retém R$ 100 de INSS do empregado e entrega R$ 900 ao trabalhador. Os R$ 100 retidos são repassados ao INSS. Até aqui, o gasto continua sendo R$ 1.000, apenas dividido entre dois destinatários.

A contribuição própria do patrão é R$ 200 adicionais. Assim, antes dos pagamentos, a empresa deve R$ 900 ao empregado e R$ 300 ao INSS (100 retidos + 200 patronais). Passivo total: R$ 1.200. Salário bruto não é salário líquido nem custo total da empresa. Não some a retenção novamente ao bruto.

Macete: bruto = líquido + retenções; neste exemplo, custo total = bruto + encargo patronal. Os valores são hipotéticos, não alíquotas legais.

$md$, updated_at=now()
where slug='pcac-2026-contabilidade-18-folha-pagamento-encargos-inss-fgts'
and coalesce(body_md,'') not like '%## Por que um salário combinado de R$ 1.000 custa R$ 1.200?%';
