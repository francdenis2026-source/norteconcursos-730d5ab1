update public.curated_question_catalog
set explanation = 'O item está CERTO. O rateio distribui um custo comum entre os departamentos usando um critério de apropriação. Como o critério escolhido foi a área, primeiro encontramos a fração ocupada pelo departamento: 20 m² ÷ 100 m² = 0,20, ou 20%. Depois aplicamos essa fração ao custo total: R$ 50.000 × 0,20 = R$ 10.000. Portanto, o departamento recebe R$ 10.000. A parcela restante é de R$ 40.000 e corresponde aos outros 80 m². Conferência: R$ 10.000 + R$ 40.000 = R$ 50.000. Fórmula: custo atribuído = custo total × área do departamento ÷ área total. Se o departamento ocupasse 30 m², receberia R$ 15.000; se ocupasse 50 m², receberia R$ 25.000. A palavra “pela área” informa o critério do rateio. Não se deve dividir igualmente entre departamentos nem usar a área do departamento como se fosse o valor a apropriar.'
where id = '1ec54a21-d503-4216-95cc-597b24560e8b';

update public.study_materials
set body_md = body_md || $rateio$

## Rateio pela área — explicação passo a passo

**Rateio** é a distribuição de um custo comum entre departamentos, produtos ou setores usando um critério definido.

Neste exemplo, o custo de energia é de **R$ 50.000** e o critério escolhido é a **área ocupada**. Isso significa que quem ocupa mais espaço recebe uma parcela maior do custo.

### Dados do problema

- Custo total de energia: **R$ 50.000**
- Área do departamento: **20 m²**
- Área total: **100 m²**

### Passo 1 — descobrir a participação do departamento

Divida a área do departamento pela área total:

**20 ÷ 100 = 0,20**

O resultado também pode ser escrito como:

**0,20 = 20%**

O departamento ocupa 20% da área total.

### Passo 2 — aplicar o percentual ao custo

Multiplique o custo total pela participação encontrada:

**R$ 50.000 × 20%**

Transformando 20% em decimal:

**20% = 0,20**

Então:

**R$ 50.000 × 0,20 = R$ 10.000**

O departamento deve receber **R$ 10.000** do custo de energia.

### Passo 3 — conferir o resultado

A parte restante corresponde aos outros 80 m²:

- Outros departamentos: 80% da área;
- R$ 50.000 × 80% = R$ 40.000;
- R$ 10.000 + R$ 40.000 = R$ 50.000.

A soma das parcelas precisa ser igual ao custo total rateado.

### Fórmula para memorizar

**Custo atribuído = custo total × área do departamento ÷ área total**

Aplicando:

**Custo atribuído = 50.000 × 20 ÷ 100 = R$ 10.000**

### Exemplos rápidos

| Área do departamento | Participação | Valor rateado |
|---:|---:|---:|
| 10 m² | 10% | R$ 5.000 |
| 20 m² | 20% | R$ 10.000 |
| 30 m² | 30% | R$ 15.000 |
| 50 m² | 50% | R$ 25.000 |

### Como não errar

- “**Pela área**” indica que o critério é o espaço ocupado.
- Não divida o custo igualmente entre os departamentos, salvo se a questão disser isso.
- Não use apenas os 20 m². É preciso comparar 20 m² com os 100 m² totais.
- Depois do cálculo, confira se todas as parcelas somam R$ 50.000.

**Resumo:** o departamento ocupa **20% da área**, então recebe **20% do custo total**. Como 20% de R$ 50.000 é R$ 10.000, o item está correto.

$rateio$,
updated_at = now()
where slug = 'pcac-2026-contabilidade-08-custos-materia-prima-rateio-departamentalizacao';
