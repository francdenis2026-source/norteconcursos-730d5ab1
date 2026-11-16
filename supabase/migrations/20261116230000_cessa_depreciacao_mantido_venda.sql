update public.official_exam_questions
set review_note = 'A depreciação de um item do imobilizado normalmente continua mesmo quando o bem está temporariamente fora de uso. Ela deve cessar quando ocorrer a baixa do ativo ou quando ele for classificado como mantido para venda, conforme o CPC 27 e o CPC 31. O fato de a máquina estar parada não basta para interromper a depreciação. Também não se deprecia depois que o valor depreciável foi totalmente consumido. Como o enunciado informa que o bem ainda não foi baixado e não está totalmente depreciado, a situação que interrompe a depreciação é a classificação como mantido para venda. Exemplo: uma máquina parada por falta de demanda continua sendo depreciada; uma máquina cujo plano de venda atende aos critérios de ativo não circulante mantido para venda deixa de ser depreciada a partir dessa classificação. | Explicação didática revisada.'
where id = 'abb99601-dc32-41ca-af50-8f5dfc5c52d2';

update public.study_materials
set body_md = body_md || $dep$

## Quando a depreciação deve cessar?

A depreciação distribui o valor depreciável de um ativo ao longo de sua vida útil. Ela não depende apenas de o bem estar sendo usado naquele momento.

### Regra geral

A depreciação continua enquanto o ativo:

- permanece reconhecido no imobilizado;
- ainda possui valor depreciável;
- não foi classificado como mantido para venda.

Portanto, uma máquina temporariamente parada continua sendo depreciada. A empresa pode estar sem pedidos, aguardando manutenção ou com o setor fechado, mas o tempo e a obsolescência continuam afetando o bem.

### Situações que encerram a depreciação

A depreciação cessa na data que ocorrer primeiro entre:

1. a baixa do ativo; ou
2. a classificação do ativo como mantido para venda.

Ela também deixa naturalmente de gerar despesa quando o valor depreciável já foi totalmente consumido.

### O que significa “mantido para venda”?

Significa que a administração decidiu vender o bem e o ativo atende aos requisitos contábeis para ser apresentado separadamente como destinado à venda. A partir dessa classificação, o ativo deixa de ser depreciado, porque sua recuperação ocorrerá pela venda, e não pelo uso continuado.

### Exemplo prático

Uma máquina custou R$ 100.000, tem valor residual de R$ 10.000 e ainda não terminou sua vida útil.

- Se ficar parada por seis meses aguardando manutenção, continua sendo depreciada.
- Se for classificada como mantida para venda em 1º de julho, a depreciação cessa a partir dessa classificação.
- Se for vendida ou baixada antes disso, cessa na data da baixa.
- Se atingir o valor residual ao final da vida útil, não há mais valor depreciável.

### Como resolver a questão

O enunciado exclui duas possibilidades:

- o bem não foi baixado;
- o bem não está totalmente depreciado.

Assim, procure a alternativa que menciona a **classificação como mantido para venda**.

**Dica de prova:** “fora de uso” não significa automaticamente “sem depreciação”. Bem parado continua depreciando, salvo se houver classificação para venda, baixa ou esgotamento do valor depreciável.

$dep$,
updated_at = now()
where slug = 'pcac-2026-contabilidade-14-imobilizado-depreciacao-provisoes-contingencias';
