update public.question_bank
set explanation = 'A alternativa correta é A — redutora da receita bruta. Tributos incidentes sobre vendas, como impostos sobre a receita, são descontados da receita bruta para chegar à receita líquida. Exemplo: se a entidade presta serviços por R$ 100.000 e possui R$ 20.000 de tributos incidentes sobre a receita, a receita líquida será R$ 80.000. Esses tributos não são despesa financeira, não são despesa operacional comum e não são CMV, porque a entidade presta serviços e não está calculando o custo de mercadorias vendidas. A sequência é: Receita bruta − tributos sobre vendas = Receita líquida.'
where id = '66f10f92-0357-4e78-8592-b98cffc0eaa3';

update public.study_materials
set body_md = body_md || $tax$

## Tributos incidentes sobre vendas e receita líquida

Tributos incidentes sobre vendas ou sobre a prestação de serviços são valores que reduzem a receita bruta para chegar à receita líquida.

### Exemplo

Uma empresa presta serviços no valor de R$ 100.000.

Tributos incidentes sobre a receita: R$ 20.000.

**Receita líquida = R$ 100.000 − R$ 20.000 = R$ 80.000.**

### Onde aparecem?

A sequência da Demonstração do Resultado é:

**Receita bruta**  
**− tributos e outras deduções sobre vendas**  
**= Receita líquida**

### O que eles não são?

- Não são despesa financeira, pois não representam juros de empréstimos.
- Não são despesa operacional comum, pois são deduções diretamente relacionadas à receita.
- Não são CMV, pois CMV representa o custo de mercadorias vendidas.
- São redutores da receita bruta.

**Dica:** quando o enunciado disser “tributos incidentes sobre vendas” ou “tributos sobre a receita”, pense em dedução da receita bruta para encontrar a receita líquida.

$tax$,
updated_at = now()
where slug = 'contabilidade-gabriel-rabelo-fundamentos-classificacao-2026';
