-- Complementa a aula de fundamentos com a resolução completa da questão 24 do CFC 2020.1.
update public.study_materials
set body_md=body_md || $q$
## Questão original — Consulplan/CFC 2020.1, questão 24: composição do Ativo

Dois sócios contribuíram com R$ 25.000 cada. Compraram um escritório por R$ 100.000, pagando R$ 20.000 à vista e financiando R$ 80.000 a longo prazo. Também compraram móveis e utensílios por R$ 15.000 à vista. A questão pede o valor do Ativo.

**Resposta: alternativa A — R$ 130.000.**

### Resolução fácil

1. Capital colocado pelos sócios: 25.000 + 25.000 = R$ 50.000.
2. Pagamento do escritório: saem R$ 20.000 do caixa; o imóvel entra no Ativo por R$ 100.000; surge financiamento de R$ 80.000 no Passivo.
3. Compra dos móveis: saem R$ 15.000 do caixa e entram móveis de R$ 15.000 no Ativo.
4. Caixa restante: 50.000 − 20.000 − 15.000 = R$ 15.000.

Ativo = escritório 100.000 + móveis 15.000 + caixa 15.000 = **R$ 130.000**.

A dívida de R$ 80.000 não é abatida do valor do escritório: ela aparece separadamente no Passivo. Conferência: Ativo 130.000 = Passivo 80.000 + Patrimônio Líquido 50.000.

**Treino autoral:** (1) Imóvel de R$ 100.000 comprado com R$ 20.000 à vista e R$ 80.000 financiados entra no Ativo por R$ 100.000. **Certo.** (2) O financiamento deve ser subtraído do valor do imóvel para calcular o Ativo. **Errado.** É obrigação no Passivo, não redução do valor do bem.
$q$,
flashcards=coalesce(flashcards,'[]'::jsonb)||'[{"f":"Questão 24 CFC 2020.1: qual é o valor total do Ativo?","b":"R$ 130.000 — escritório 100.000 + móveis 15.000 + caixa restante 15.000."},{"f":"O financiamento do escritório reduz o valor do imóvel no Ativo?","b":"Não. O imóvel entra pelo valor integral; o financiamento é registrado no Passivo."}]'::jsonb,
quiz=coalesce(quiz,'[]'::jsonb)||'[{"q":"Na questão 24, o Ativo final é R$ 130.000.","a":true,"why":"100.000 de escritório + 15.000 de móveis + 15.000 de caixa."},{"q":"O financiamento de R$ 80.000 deve ser descontado do valor do escritório no Ativo.","a":false,"why":"O financiamento é obrigação no Passivo; o imóvel é reconhecido pelo valor integral."}]'::jsonb,
source_note=concat_ws('; ',nullif(source_note,''),'Questão 24, Consulplan/CFC 2020.1, PDF Parte 03, página 10.'),
updated_at=now()
where slug='pcac-2026-contabilidade-01-fundamentos-patrimonio-ativo-passivo'
and position('Questão original — Consulplan/CFC 2020.1, questão 24' in body_md)=0;
