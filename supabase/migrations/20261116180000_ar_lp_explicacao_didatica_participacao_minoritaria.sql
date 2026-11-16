update public.study_materials
set body_md = body_md || $didactic$

### Entenda de forma simples por que os R$ 600.000 ficaram fora

O ponto central é identificar **quem recebeu o empréstimo** e **qual era a relação dessa pessoa ou sociedade com a companhia que emprestou**.

Imagine que a Companhia Alfa empreste dinheiro:

- à Companhia Beta, que ela controla;
- à Companhia Gama, sobre a qual exerce influência significativa;
- à Companhia Delta, da qual possui apenas algumas ações, sem poder de decisão.

Beta é controlada. Gama é coligada. Delta é apenas uma participação minoritária.

#### 1. Ter ações não significa controlar

Comprar algumas ações de uma empresa é como possuir uma pequena parte de um negócio. Isso, sozinho, não permite dirigir a empresa nem participar de maneira relevante das decisões.

**Exemplo:** a Companhia Alfa possui 3% da Companhia Delta e não consegue indicar administradores, decidir sua política financeira ou influenciar suas deliberações. Nesse caso, Alfa é apenas acionista minoritária de Delta.

#### 2. Quando existe uma coligada

Há coligação quando a investidora possui **influência significativa**, mesmo sem controlar a sociedade.

Na prática, a investidora consegue participar das decisões importantes, acompanhar a gestão ou exercer influência relevante. A participação societária é apenas um indício; o que importa é a influência efetivamente exercida.

#### 3. Quando existe uma controlada

Há controle quando a investidora consegue dirigir as principais decisões da outra sociedade. Normalmente, isso ocorre porque possui a maioria dos votos ou outro mecanismo que lhe dá poder de comando.

#### 4. A confusão com a palavra “acionista”

A lei também menciona empréstimos feitos a **acionistas**. Nesse trecho, a ideia é o empréstimo concedido pela companhia ao seu próprio acionista, diretor ou participante no lucro.

Isso não significa que todo empréstimo feito a uma empresa da qual a companhia possui ações será automaticamente enquadrado nessa regra. É necessário verificar se essa empresa é realmente coligada ou controlada.

#### 5. Aplicando ao valor de R$ 600.000

O enunciado informa que:

- a companhia apenas possuía participação minoritária na sociedade;
- não havia influência significativa;
- não havia controle;
- o empréstimo não foi indicado como realizável após o exercício seguinte.

Portanto, esse crédito não se enquadra na regra especial do art. 179, II, e também não foi demonstrado como longo prazo pela regra geral.

Por isso, os **R$ 600.000 não são somados** aos demais valores do ARLP.

### Quadro para memorizar

| Situação | Entra no ARLP pela regra especial? |
|---|---|
| Empréstimo para sociedade controlada | Sim |
| Empréstimo para sociedade coligada | Sim |
| Empréstimo para acionista da própria companhia | Sim, se a operação não for usual |
| Empréstimo para sociedade em que há pequena participação, sem influência | Não automaticamente |
| Empréstimo para empresa externa com vencimento após o exercício seguinte | Sim, pela regra geral do prazo |

### Pergunta que você deve fazer na prova

Antes de somar qualquer valor, pergunte:

**“A empresa que recebeu o empréstimo é controlada, coligada ou apenas uma sociedade na qual a companhia possui algumas ações?”**

Se for apenas uma participação minoritária sem influência significativa, não inclua o valor pela regra especial. Depois, verifique separadamente se o vencimento permite classificá-lo como ARLP pela regra geral.

$didactic$,
    updated_at = now()
where slug = 'contabilidade-balanco-patrimonial-estrutura';
