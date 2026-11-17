update public.question_bank
set explanation = 'A alternativa correta é D — X, Y e Z. O CPC 05 trata como partes relacionadas as entidades que possuem controle, controle conjunto ou influência significativa entre si. X está sob controle conjunto de Y, portanto X e Y são partes relacionadas. Z é coligada de Y, o que significa que Y exerce influência significativa sobre Z. Assim, Y e Z também são partes relacionadas. Como X e Y fazem parte da mesma estrutura de controle conjunto e Y possui relação de influência significativa com Z, o conjunto apresentado na questão envolve X, Y e Z. Pense em um grupo empresarial: Y participa do comando de X junto com outro participante e influencia as decisões de Z. Essas relações permitem que uma empresa influencie decisões ou condições de negócios das outras. Dica: controle conjunto e coligação são sinais de partes relacionadas no CPC 05. Não marque apenas o par que aparece na mesma frase; identifique todas as entidades conectadas pelas relações de controle, controle conjunto ou influência significativa.'
where id = '7cde0b47-74bf-4e41-995d-961a44386ba9';

update public.study_materials
set body_md = body_md || $cpc$

## CPC 05 — partes relacionadas

Partes relacionadas são pessoas ou entidades que possuem uma relação capaz de influenciar decisões, condições de negócios ou a forma como as operações são realizadas.

### Três relações importantes

- **Controle:** uma entidade consegue dirigir as principais decisões de outra.
- **Controle conjunto (joint venture):** duas ou mais partes compartilham o poder de decisão. Nenhuma decide sozinha, mas as decisões relevantes dependem do acordo conjunto.
- **Coligação:** existe influência significativa, mesmo sem controle. A investidora participa de decisões importantes, mas não comanda sozinha a outra entidade.

### Aplicação à questão

- A Cia X está sob controle conjunto da Cia Y. X e Y são partes relacionadas.
- A Cia Z é coligada da Cia Y. Y e Z são partes relacionadas.
- As três empresas estão conectadas por relações societárias relevantes apresentadas no enunciado.

Por isso, a resposta é **X, Y e Z**.

### Exemplo simples

Imagine três empresas:

- a Empresa Y divide com outro sócio o poder de decidir os assuntos importantes da Empresa X;
- a Empresa Y possui influência significativa sobre a Empresa Z.

Y está relacionada com X e Z. A questão quer que o candidato reconheça a rede de relações, e não apenas uma relação isolada.

### Como diferenciar

- Controle: “eu consigo comandar”.
- Controle conjunto: “eu e outro participante decidimos juntos”.
- Coligada: “eu não comando sozinho, mas consigo influenciar decisões importantes”.

**Dica de prova:** quando aparecerem as expressões “controle conjunto”, “joint venture”, “coligada” ou “influência significativa”, procure relações de partes relacionadas. O CPC 05 não exige que exista apenas participação majoritária para haver relação entre as entidades.

$cpc$,
updated_at = now()
where slug = 'contabilidade-gabriel-rabelo-fundamentos-classificacao-2026';
