update public.study_materials
set body_md = body_md || $mat$
    
## 11. Questão comentada — empréstimos classificados no ARLP

### O que é o ativo realizável a longo prazo?

O **Ativo Realizável a Longo Prazo (ARLP)** reúne direitos que a entidade espera transformar em dinheiro **depois do término do exercício seguinte**. Entram nesse grupo, por exemplo, empréstimos concedidos, valores a receber e créditos com vencimento distante.

A regra geral considera o prazo. Porém, a Lei nº 6.404/1976 estabelece uma regra especial para determinados créditos concedidos a pessoas ligadas à companhia.

### Regra do art. 179, inciso II, da Lei nº 6.404/1976

São classificados no ARLP, **independentemente do vencimento**, os direitos derivados de:

- vendas;
- adiantamentos;
- empréstimos;

quando concedidos a:

- sociedades coligadas;
- sociedades controladas;
- diretores;
- acionistas;
- participantes no lucro;

desde que essas operações **não constituam negócios usuais da companhia**.

Em linguagem simples, se uma companhia empresta dinheiro a uma empresa do seu grupo, a um diretor ou a um acionista em uma operação fora da sua atividade normal, esse direito vai para o ARLP mesmo que o vencimento seja próximo.

### Aplicação prática da questão

| Operação | Relação ou prazo | Classificação | Valor |
|---|---|---:|---:|
| Empréstimo à sociedade coligada | Operação fora dos negócios usuais | ARLP, independentemente do vencimento | R$ 500.000 |
| Empréstimo à sociedade controlada | Operação fora dos negócios usuais | ARLP, independentemente do vencimento | R$ 700.000 |
| Empréstimo à sociedade em que há apenas participação minoritária, sem influência significativa | Não é automaticamente coligada nem controlada. O simples fato de ser acionista minoritária não aplica, por si só, a regra especial | Não entra nessa soma pela regra especial | R$ 600.000 |
| Empréstimo à sociedade externa com vencimento em 30/03/2027 | Vencimento depois do término do exercício seguinte indicado no enunciado | ARLP pela regra geral do prazo | R$ 800.000 |

**Cálculo do ARLP:**

**R$ 500.000 + R$ 700.000 + R$ 800.000 = R$ 2.000.000.**

Por isso, a alternativa correta é a que apresenta **R$ 2.000.000,00**.

### Como diferenciar coligada, controlada e participação minoritária

- **Controlada:** a investidora possui poder para dirigir as políticas financeiras e operacionais da outra sociedade, normalmente por meio do controle de votos.
- **Coligada:** a investidora possui **influência significativa**, podendo participar das decisões da investida, mas sem controlá-la.
- **Participação minoritária sem influência significativa:** a companhia possui ações, mas não consegue participar de forma relevante das decisões. Essa situação não transforma automaticamente a sociedade em coligada ou controlada.

### Exemplo do cotidiano

Imagine que uma loja tenha como atividade normal vender produtos. Ela empresta R$ 500.000 à empresa controlada pelo mesmo grupo, sem que emprestar dinheiro seja sua atividade habitual. Esse valor representa um direito contra uma parte ligada e deve ser apresentado no ARLP, ainda que o contrato determine pagamento em poucos meses.

Se a mesma loja emprestar R$ 800.000 a uma empresa sem relação especial e o contrato vencer somente depois do exercício seguinte, o valor também será ARLP, desta vez por causa do prazo.

### Roteiro para resolver questões semelhantes

1. Liste cada crédito separadamente.
2. Verifique se o devedor é coligado, controlado, diretor, acionista ou participante no lucro.
3. Confira se a operação é negócio usual da companhia.
4. Se houver parte ligada e operação não usual, classifique no ARLP independentemente do vencimento.
5. Para os demais devedores, compare o vencimento com o término do exercício seguinte.
6. Some somente os valores que satisfazem uma dessas regras.
7. Não confunda o valor do empréstimo com o valor do desconto, dos juros ou da parcela.

> **Dica de prova:** a expressão “independentemente do vencimento” é um sinal de que a questão está cobrando a regra especial do art. 179, II. A expressão “influência significativa” ajuda a identificar uma coligada. Participação minoritária, sozinha, não basta.

$mat$,
    updated_at = now()
where slug = 'contabilidade-balanco-patrimonial-estrutura';
