update public.curated_question_catalog
set explanation = 'O item está CERTO. CMV significa Custo das Mercadorias Vendidas, ou seja, quanto custaram as mercadorias que efetivamente foram vendidas no período. A fórmula é: CMV = Estoque inicial + Compras líquidas − Estoque final. Aplicando os dados: R$ 30.000 + R$ 80.000 − R$ 40.000 = R$ 70.000. A lógica é simples: a empresa tinha R$ 30.000 no começo, comprou mais R$ 80.000 e terminou com R$ 40.000 ainda em estoque. A diferença corresponde ao que saiu para venda. Exemplo: se você começa com dez produtos, compra mais vinte e termina com oito, vendeu vinte e dois. Na contabilidade, o CMV representa o custo desses produtos vendidos, e não o valor da receita obtida com a venda.'
where id = 'dd60fd4b-3aff-4f27-8e8c-47f0ffbac957';

update public.study_materials
set body_md = body_md || $cmv$

## CMV — Custo das Mercadorias Vendidas

O **CMV** mostra quanto custaram as mercadorias que foram efetivamente vendidas durante o período.

Ele não representa o preço pelo qual a empresa vendeu as mercadorias. O preço de venda gera receita. O CMV representa o custo que a empresa teve para adquirir aquilo que foi vendido.

### Fórmula básica

**CMV = Estoque inicial + Compras líquidas − Estoque final**

### O significado de cada parte

- **Estoque inicial:** mercadorias que a empresa possuía no começo do período.
- **Compras líquidas:** compras depois de descontar devoluções, abatimentos e descontos incondicionais, conforme os dados da questão.
- **Estoque final:** mercadorias que ainda permaneceram guardadas no fim do período.
- **CMV:** custo das mercadorias que saíram do estoque porque foram vendidas.

### Aplicação da questão

- Estoque inicial: R$ 30.000;
- Compras líquidas: R$ 80.000;
- Estoque final: R$ 40.000.

**CMV = 30.000 + 80.000 − 40.000**

**CMV = R$ 70.000.**

### Por que o estoque final é subtraído?

Porque o estoque final ainda não foi vendido. Ele continua sendo um ativo da empresa e não pode entrar como custo das mercadorias vendidas.

### Exemplo simples

Uma loja começa o mês com dez celulares avaliados em R$ 10.000. Compra mais vinte celulares por R$ 20.000 e termina o mês com oito celulares no estoque.

A mercadoria disponível foi:

**10 + 20 = 30 celulares.**

Como sobraram oito, foram vendidos:

**30 − 8 = 22 celulares.**

O CMV representa o custo dos 22 celulares que saíram do estoque.

### Relação com o resultado bruto

Na Demonstração do Resultado:

**Resultado bruto = Receita de vendas − CMV**

Exemplo:

- Receita de vendas: R$ 100.000;
- CMV: R$ 70.000;
- Resultado bruto: R$ 30.000.

### Como resolver na prova

1. Localize o estoque inicial.
2. Identifique as compras líquidas.
3. Encontre o estoque final.
4. Some estoque inicial e compras.
5. Subtraia o estoque final.
6. Não confunda CMV com receita de vendas.

**Dica:** tudo que ainda está no estoque final não foi vendido. Por isso, fica fora do CMV.

$cmv$,
updated_at = now()
where slug = 'contabilidade-mercadorias-cmv-resultado-bruto';
