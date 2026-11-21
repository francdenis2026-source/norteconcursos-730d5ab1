-- PC-AC 2026 — correct and deepen the investments / MEP lesson.
-- The live study_materials record was updated and verified directly.
-- This migration makes the same content corrections reproducible in other environments.

update public.study_materials
set body_md = '# Aula 9 — Investimentos, participação societária e dividendos

## 1. Antes de escolher o método: qual é a relação entre as empresas?

Quando uma empresa compra participação em outra, não basta olhar apenas o percentual de ações. É necessário identificar o poder de decisão e o tipo de demonstração contábil.

- **Controle:** a investidora tem poder para dirigir as atividades relevantes da investida. Em regra, há relação de controladora e controlada.
- **Influência significativa:** a investidora participa das decisões financeiras e operacionais, mas não controla essas decisões. A investida é chamada de coligada.
- **Controle conjunto:** decisões sobre atividades relevantes exigem consentimento unânime das partes que compartilham o controle.

### A regra dos 20%

O CPC 18 presume influência significativa quando o investidor possui, direta ou indiretamente, **20% ou mais do poder de voto**, salvo prova clara em contrário. Com menos de 20%, presume-se ausência de influência significativa, mas ela pode ser demonstrada por fatos concretos.

Exemplos de influência significativa:
- ter representante no conselho de administração;
- participar das decisões sobre políticas e dividendos;
- realizar operações relevantes entre as empresas;
- trocar diretores ou gestores;
- fornecer informação técnica essencial.

**Atenção para a prova:** 20% é presunção, não regra absoluta. E o texto fala em poder de voto, não simplesmente em qualquer percentual do capital total.

## 2. O que é Método da Equivalência Patrimonial (MEP)?

Pense em duas empresas: a empresa A compra 30% da empresa B. Se B obtém lucro, a participação de A nesse resultado aumenta o valor contábil do investimento de A. Se B tem prejuízo, a participação de A no prejuízo reduz o investimento.

No MEP, o investimento começa reconhecido pelo custo de aquisição e depois é ajustado pela participação do investidor nos resultados e em determinadas variações do patrimônio líquido da investida.

### Exemplo simples de lucro

A empresa A possui 30% da empresa B. B apurou lucro de R$ 100.000 após a aquisição.

Participação de A no lucro:
R$ 100.000 × 30% = **R$ 30.000**.

Lançamento simplificado na investidora:
- Débito: Investimento avaliado pelo MEP — R$ 30.000.
- Crédito: Resultado de Equivalência Patrimonial — R$ 30.000.

O investimento aumenta porque a investida ficou mais valiosa pelo lucro obtido. A investidora reconhece sua parcela do resultado mesmo que B ainda não tenha distribuído dividendos.

### E se a investida tiver prejuízo?

Se B apresentar prejuízo de R$ 40.000 e A possuir 30%, a parcela de A será:
R$ 40.000 × 30% = **R$ 12.000**.

Lançamento simplificado:
- Débito: Resultado de Equivalência Patrimonial — R$ 12.000.
- Crédito: Investimento avaliado pelo MEP — R$ 12.000.

**Macete:** lucro da investida aumenta o investimento; prejuízo da investida diminui o investimento.

## 3. Dividendos: o que acontece no MEP?

Aqui está uma das pegadinhas mais importantes: no MEP, o lucro já foi reconhecido quando a investida apurou o resultado. Quando ela posteriormente declara/distribui dividendos, não se reconhece novamente aquela parcela como receita. O dividendo reduz o valor contábil do investimento e gera um direito a receber.

### Exemplo dos 12%

A investida apurou lucro de R$ 36.000 e decidiu distribuir 50%.

1. Total de dividendos: R$ 36.000 × 50% = R$ 18.000.
2. Participação da investidora: R$ 18.000 × 12% = **R$ 2.160**.

Lançamento simplificado no MEP:
- Débito: Dividendos a Receber — R$ 2.160.
- Crédito: Investimento — MEP — R$ 2.160.

Observe a sequência: primeiro a investidora reconhece sua parcela do lucro; depois, quando os dividendos são declarados, registra o recebível e reduz o investimento.

## 4. Método de custo, MEP e demonstrações separadas: não misture os contextos

O tratamento depende do tipo de investimento e do conjunto de demonstrações contábeis analisado.

- Nas demonstrações individuais brasileiras, investimentos em controladas são avaliados pelo MEP conforme a legislação e a orientação aplicável.
- O CPC 18 disciplina o MEP para coligadas e empreendimentos controlados em conjunto (joint ventures).
- Nas demonstrações separadas, o CPC 35 permite, conforme seus requisitos, contabilizar investimentos em controladas, coligadas e empreendimentos controlados em conjunto pelo custo, conforme CPC 27, ou de acordo com o CPC 48; investimentos em categorias específicas também podem ter tratamento próprio.
- Participações sem controle, controle conjunto ou influência significativa não devem ser automaticamente classificadas como “método de custo” em qualquer demonstração: é preciso observar o CPC 48 e o contexto contábil.

**Correção importante de regra antiga:** não memorize como regra geral atual que dividendos recebidos até seis meses da aquisição sempre reduzem o investimento. Essa referência aparece em materiais e questões de regras anteriores. Para a prova, identifique o contexto normativo e a demonstração contábil descrita no enunciado. No MEP, a regra é clara: distribuições recebidas reduzem o valor contábil do investimento.

## 5. Comparação rápida: MEP x custo em demonstrações separadas

| Situação | MEP | Custo em demonstrações separadas, quando permitido |
|---|---|---|
| Investida tem lucro | Reconhece a participação no lucro | Não reconhece automaticamente a participação no lucro apenas porque foi apurado |
| Investida tem prejuízo | Reconhece a participação no prejuízo, observadas as regras do método | Não reconhece automaticamente a participação no prejuízo apenas porque foi apurado |
| Dividendos declarados | Reduzem o investimento e geram recebível | Em regra, são reconhecidos como receita quando surge o direito, observadas as regras aplicáveis |
| Variações em outros resultados abrangentes da investida | Reconhece participação proporcional conforme CPC 18 | Não se aplica o MEP; observar a norma de instrumentos financeiros e a política permitida |

## 6. Consolidação: empresas do mesmo grupo como uma única entidade

Imagine que a empresa A controla a empresa B. A vende mercadorias para B por R$ 150.000. Para o grupo econômico, essa venda interna não representa receita obtida de um cliente externo. Na consolidação, saldos e transações intragrupo são eliminados conforme o CPC 36.

**Exemplo:** se B revende as mercadorias a clientes externos por R$ 250.000, é essa venda externa que aparece como receita do grupo. O faturamento interno de A para B não pode ser somado como se fosse uma segunda venda.

Atenção: se ainda houver mercadorias no estoque no encerramento, pode existir lucro não realizado intragrupo que também deve ser eliminado, conforme as regras de consolidação.

### Questão Consulplan/CFC 2020.2 — resultado consolidado

O exercício informa estoque inicial de mercadorias de B de R$ 150.000, metade transferida a A, venda externa por A de R$ 250.000 e operação intragrupo de R$ 150.000.

O custo de grupo das mercadorias transferidas que vieram do estoque inicial é metade de R$ 150.000 = R$ 75.000. Resultado indicado pelo exercício: R$ 250.000 − R$ 75.000 = **R$ 175.000**.

**Como pensar:** elimine o que ocorreu entre empresas do mesmo grupo e mantenha o que ocorreu com terceiros. Em questões reais, confira também se há estoque final e lucro não realizado.

## 7. Questões resolvidas e dicas de prova

### Participação de 12% nos dividendos

A empresa distribuiu R$ 18.000 e a investidora possui 12%.

R$ 18.000 × 0,12 = **R$ 2.160**.

Se o enunciado disser que apenas 50% do lucro de R$ 36.000 foi distribuído, faça duas contas:
- R$ 36.000 × 50% = R$ 18.000 distribuídos.
- R$ 18.000 × 12% = R$ 2.160 para a investidora.

### Checklist para resolver questões

1. Identifique se há controle, influência significativa ou controle conjunto.
2. Veja se a questão trata de demonstrações individuais, consolidadas ou separadas.
3. Se for MEP, reconheça a participação no lucro/prejuízo da investida.
4. Se houver dividendos no MEP, reduza o investimento; não reconheça a mesma parcela como nova receita.
5. Em consolidação, elimine operações e saldos intragrupo.
6. Confira se a questão apresenta estoque final com lucro não realizado.

## Pegadinhas frequentes

- **12% do lucro não é necessariamente 12% dos dividendos:** primeiro descubra quanto foi efetivamente distribuído.
- **20% não é certeza absoluta de influência significativa:** é presunção relativa sobre o poder de voto.
- **MEP não espera o pagamento dos dividendos para reconhecer o lucro:** reconhece a participação no resultado quando a investida o apura.
- **Dividendos no MEP não são uma segunda receita:** reduzem o investimento.
- **Consolidação não soma vendas entre empresas do grupo:** elimina transações intragrupo.
- **Não aplique regra antiga dos seis meses sem verificar o contexto normativo.**

## Base normativa para estudo

- CPC 18 (R3): influência significativa, método da equivalência patrimonial e distribuições recebidas; aprovado pela Resolução CVM nº 211/2024, vigente desde 1º de janeiro de 2025.
- Lei nº 6.404/1976, art. 248: avaliação de investimentos pelo MEP nas hipóteses legais.
- CPC 35: demonstrações separadas.
- CPC 36: demonstrações consolidadas.
- CPC 48: instrumentos financeiros, quando aplicável.'
where contest_name='PC-AC 2026'
and slug='pcac-2026-contabilidade-09-investimentos-dividendos-mep-metodo-custo';

-- Keep all eight original quiz statements and answer keys. Enrich feedback,
-- add an exam tip and stepwise solution to each item.
with qdata(n,why,tip,steps) as (
 values
 (1,'O cálculo usa o total efetivamente distribuído, R$ 18.000. A investidora possui 12%, então sua parcela é 18.000 × 0,12 = R$ 2.160. Não se aplica 12% sobre o patrimônio líquido nem sobre um lucro que não foi integralmente distribuído. O percentual de 12% deve ser aplicado somente depois de identificar a distribuição total. A conta pode ser conferida dividindo R$ 18.000 por 100 e multiplicando por 12, chegando aos mesmos R$ 2.160.','Transforme o percentual em decimal: 12% = 0,12. Depois multiplique pelo valor distribuído.','["Identifique o total de dividendos: R$ 18.000.","Converta 12% em 0,12.","Multiplique 18.000 × 0,12.","Resultado: R$ 2.160."]'::jsonb),
 (2,'A investida apurou lucro de R$ 36.000, mas distribuiu somente 50%. Primeiro calcule os dividendos: 36.000 × 0,50 = R$ 18.000. Depois aplique a participação de 12%: 18.000 × 0,12 = R$ 2.160. A afirmação está errada porque aplica 12% ao lucro integral, ignorando que metade não foi distribuída.','Duas etapas: percentual distribuído primeiro; participação do investidor depois.','["Calcule a parcela distribuída: 36.000 × 50% = R$ 18.000.","Aplique a participação: 18.000 × 12% = R$ 2.160.","Compare com a afirmação, que usou o lucro integral.","Conclusão: afirmação errada."]'::jsonb),
 (3,'No MEP, a investidora reconhece sua participação no lucro ou prejuízo da investida após a aquisição, sem esperar a distribuição de dividendos. Exemplo: 30% de lucro de R$ 100.000 gera resultado de equivalência patrimonial de R$ 30.000 e aumenta o investimento.','MEP acompanha o desempenho da investida: lucro aumenta investimento; prejuízo diminui.','["Identifique o lucro ou prejuízo apurado após a aquisição.","Multiplique pelo percentual de participação.","Reconheça a parcela no resultado da investidora.","Ajuste o valor contábil do investimento."]'::jsonb),
 (4,'No MEP, o lucro já foi reconhecido pela participação no resultado da investida. Quando os dividendos são declarados, a investidora registra um direito a receber e reduz o investimento. O crédito, portanto, é em Investimento — MEP, e não em Receita de Dividendos.','No MEP: Débito em Dividendos a Receber; Crédito em Investimento. Não conte o mesmo lucro duas vezes.','["Verifique que a questão está tratando de MEP.","Reconheça o direito: débito em Dividendos a Receber.","Reduza o investimento: crédito em Investimento — MEP.","Não credite Receita de Dividendos nesse lançamento."]'::jsonb),
 (5,'O CPC 18 presume influência significativa quando o investidor possui 20% ou mais do poder de voto, salvo demonstração clara em contrário. A presunção também funciona no sentido oposto: menos de 20% presume ausência de influência, mas fatos concretos podem demonstrá-la. Não é um limite absoluto nem se refere automaticamente a qualquer percentual do capital total.','Memorize: 20% ou mais do poder de voto = presunção relativa de influência significativa.','["Localize o percentual do poder de voto, não apenas o capital total.","Com 20% ou mais, aplique a presunção de influência significativa.","Confira se há fatos que afastam a presunção.","Lembre que participação inferior a 20% também pode demonstrar influência por outros elementos."]'::jsonb),
 (6,'Na consolidação, controladora e controlada são apresentadas como se fossem uma única entidade econômica. Por isso, a venda entre elas não representa receita obtida de terceiros e deve ser eliminada. Permanecem as operações com clientes e fornecedores externos, observados também os ajustes de saldos e lucros não realizados.','Pergunte: o dinheiro veio de alguém de fora do grupo? Venda intragrupo é eliminada na consolidação.','["Identifique se comprador e vendedor pertencem ao mesmo grupo consolidado.","Se for operação intragrupo, elimine receita e despesa correspondentes.","Mantenha a venda efetivamente realizada a terceiros.","Verifique se existe lucro não realizado em estoque final."]'::jsonb),
 (7,'O resultado indicado pelo enunciado é a receita externa de R$ 250.000 menos o custo de grupo de R$ 75.000, que corresponde à metade do estoque inicial de R$ 150.000 transferida. Assim: 250.000 − 75.000 = R$ 175.000. A operação intragrupo de R$ 150.000 não é uma segunda receita externa.','Na consolidação, não some a venda interna à venda externa. Acompanhe a mercadoria até a venda ao cliente de fora do grupo.','["Calcule o custo da parcela transferida: 150.000 × 50% = R$ 75.000.","Identifique a receita externa: R$ 250.000.","Subtraia o custo do grupo: 250.000 − 75.000.","Resultado: R$ 175.000."]'::jsonb),
 (8,'A investida apurou lucro de R$ 36.000 e decidiu distribuir 50%, totalizando R$ 18.000. A participação de 12% equivale a R$ 2.160. A questão informa método de custo e o contexto da distribuição após seis meses; não transforme essa regra temporal antiga em regra geral atual para qualquer investimento ou demonstração.','Faça a conta em duas etapas: lucro × percentual distribuído × participação. Identifique também o método e o tipo de demonstração descritos no enunciado.','["Calcule o total distribuído: 36.000 × 50% = R$ 18.000.","Calcule a participação: 18.000 × 12% = R$ 2.160.","Confira o método contábil e o contexto temporal do enunciado original.","Não generalize a referência dos seis meses para todos os casos atuais."]'::jsonb)
),
rebuilt as (
 select m.id,
        jsonb_agg(
          jsonb_set(
            jsonb_set(
              jsonb_set(x.value,'{why}',to_jsonb(q.why::text),true),
              '{tip}',to_jsonb(q.tip::text),true),
            '{resolution_steps}',q.steps,true
          ) order by x.ordinality
        ) quiz
 from public.study_materials m
 cross join lateral jsonb_array_elements(m.quiz) with ordinality x(value,ordinality)
 join qdata q on q.n=x.ordinality
 where m.contest_name='PC-AC 2026'
 and m.slug='pcac-2026-contabilidade-09-investimentos-dividendos-mep-metodo-custo'
 group by m.id
)
update public.study_materials m
set quiz=rebuilt.quiz,updated_at=now()
from rebuilt
where m.id=rebuilt.id;
