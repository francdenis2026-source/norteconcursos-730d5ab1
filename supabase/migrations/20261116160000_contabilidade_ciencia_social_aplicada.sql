-- Complemento introdutório sobre a natureza científica da Contabilidade.

update public.study_materials
set body_md = body_md || $material$

## Contabilidade: ciência social aplicada, não ciência exata

A Contabilidade é classificada como uma **ciência social aplicada**. Ela estuda o patrimônio das entidades, suas variações e as informações usadas por pessoas e organizações para tomar decisões.

### Por que não é ciência exata?

Ciências exatas, como a Matemática, trabalham com relações formais e resultados determinados pelas regras do próprio sistema. Na Contabilidade, os números são muito importantes, mas eles são ferramentas para representar situações econômicas e patrimoniais que acontecem dentro de entidades reais.

O resultado contábil depende de fatos, critérios, estimativas, julgamentos profissionais, normas e do contexto da entidade. Por exemplo, calcular uma porcentagem é matemática. Decidir como reconhecer, mensurar e apresentar uma operação contábil envolve a realidade econômica, as normas aplicáveis e a finalidade da informação.

### O que significa “social aplicada”?

- **Social:** o objeto está ligado à vida econômica e organizacional das entidades, às pessoas que administram recursos e aos usuários que tomam decisões.
- **Aplicada:** o conhecimento é utilizado para resolver problemas concretos, como controlar patrimônio, avaliar resultados, prestar contas e apoiar decisões.
- **Científica:** a área possui objeto, conceitos, métodos, teorias e procedimentos próprios para estudar e explicar os fenômenos patrimoniais.

### Exemplo fácil

Uma loja tem estoque, dinheiro, dívidas, vendas e despesas. A Contabilidade registra esses fatos, calcula valores e apresenta relatórios. Mas o objetivo não é fazer contas por fazer. A informação será usada pelo administrador para decidir se pode comprar mais mercadorias, pelo banco para avaliar um empréstimo, pelo governo para verificar obrigações e pelos sócios para analisar o resultado.

### Como cai na prova

Se o enunciado disser que a Contabilidade é uma ciência exata apenas porque utiliza números, a afirmação está errada. O uso da Matemática é uma ferramenta. A classificação depende do objeto e da finalidade da Contabilidade.

**Macete:** números são a ferramenta; patrimônio, entidades, decisões e usuários explicam a natureza social aplicada.

### Treino autoral

1. A Contabilidade é uma ciência social aplicada. **Certo.** Ela estuda o patrimônio das entidades e produz informação para decisões práticas.
2. A Contabilidade é ciência exata porque todos os seus resultados são independentes de estimativas, normas e julgamentos. **Errado.** A área usa números, mas trabalha com fatos econômicos, normas, estimativas e decisões profissionais.
$material$,
flashcards = coalesce(flashcards, '[]'::jsonb) || '[
  {"f":"Como a Contabilidade é classificada?","b":"Como ciência social aplicada, com natureza factual e objeto patrimonial."},
  {"f":"Por que a Contabilidade não é ciência exata?","b":"Porque os números são ferramentas; seu objeto envolve patrimônio, entidades, decisões humanas, normas e contexto econômico."},
  {"f":"O que significa aplicada?","b":"Que o conhecimento é usado para resolver problemas práticos de controle, informação e decisão."}
]'::jsonb,
quiz = coalesce(quiz, '[]'::jsonb) || '[
  {"q":"A Contabilidade é uma ciência social aplicada.","a":true,"why":"Estuda o patrimônio das entidades em contexto econômico e produz informação para decisões."},
  {"q":"A Contabilidade é ciência exata porque utiliza números.","a":false,"why":"Os números são ferramentas; a classificação depende do objeto e da finalidade da área."}
]'::jsonb,
updated_at = now()
where slug = 'pcac-2026-contabilidade-01-fundamentos-patrimonio-ativo-passivo'
  and position('## Contabilidade: ciência social aplicada, não ciência exata' in body_md) = 0;

update public.study_materials
set body_md = body_md || $material$

## Natureza da Contabilidade

A Contabilidade é uma **ciência social aplicada**, e não uma ciência exata. Ela usa matemática e números para medir e comunicar informações, mas estuda o patrimônio das entidades dentro de relações econômicas, organizacionais e humanas.

**Resumo para prova:** objeto = patrimônio; classificação = ciência social aplicada; números = ferramenta; finalidade = informação útil para controle e decisão.
$material$
where slug = 'contabilidade-conceito-objeto-usuarios'
  and position('## Natureza da Contabilidade' in body_md) = 0;
