-- Refine seven Statistics trainer explanations after the 120-question content review.
-- Only explanation text is replaced; prompts, true/false keys, tips, steps and ordering remain unchanged.
with patches(slug,n,new_why) as (values ('pcac-2026-estatistica-01-fundamentos-populacao-amostra-variaveis',10,$why$O intervalo da amostragem sistemática é k=N÷n. Aqui, N=600 e n=60: k=600÷60=10. Depois de escolher um ponto inicial conforme o plano amostral, seleciona-se um registro a cada dez posições. Exemplo: se o início for 4, a sequência será 4, 14, 24, 34 e assim por diante. Antes, confira se a lista não possui uma periodicidade que coincida com o intervalo, pois isso pode enviesar a seleção.$why$),('pcac-2026-estatistica-mediana-moda-quartis-percentis',2,$why$Quando a quantidade de dados é par, ordene os valores e identifique os dois que ficam no centro. A mediana é a média desses dois valores. Exemplo: em 2, 4, 8 e 10, os centrais são 4 e 8; então (4+8)÷2=6. A mediana pode nem aparecer na lista original. A banca costuma tentar induzir o candidato a escolher apenas um dos dois valores centrais.$why$),('pcac-2026-estatistica-04-medidas-tendencia-central-media',6,$why$A relação é: soma dos valores = média × quantidade de observações. Se cinco observações têm média 8, a soma é 8×5=40. Essa relação também ajuda a descobrir um valor desconhecido: primeiro calcule a soma total esperada e depois subtraia os valores conhecidos.$why$),('pcac-2026-estatistica-04-medidas-tendencia-central-media',10,$why$A afirmação descreve a média, não a mediana. Mediana é o valor central depois de ordenar os dados. Exemplo: em 2, 5 e 20, a mediana é 5; a média é (2+5+20)÷3=9. Se a quantidade de observações for par, a mediana será a média dos dois valores centrais. Na prova, procure a palavra-chave: média usa soma e divisão; mediana usa posição.$why$),('pcac-2026-estatistica-06-probabilidade-eventos-condicional',3,$why$O evento complementar é tudo aquilo em que A não ocorre. A probabilidade de A somada à de seu complemento deve ser 1 (100%). Se P(A)=0,3, então P(não A)=1−0,3=0,7, ou 70%. Dica: quando o enunciado disser “não”, “nenhum” ou “pelo menos um” em certos contextos, verifique se o complemento simplifica a conta.$why$),('pcac-2026-estatistica-12-distribuicoes-probabilidade',10,$why$O escore z indica quantos desvios-padrão um valor está acima ou abaixo da média: z=(x−μ)÷σ. Como σ é positivo, o sinal depende de x−μ. Se x for menor que a média, z será negativo. Exemplo: média 50, desvio-padrão 10 e valor 40: z=(40−50)÷10=−1. Isso significa um desvio-padrão abaixo da média.$why$),('pcac-2026-estatistica-03-tabelas-graficos-interpretacao',7,$why$Um círculo completo tem 360°. Para transformar uma participação percentual em ângulo, converta o percentual em decimal e multiplique por 360°. Assim, 25%=0,25 e 0,25×360°=90°. O setor ocupa um quarto do círculo. Faça a conferência dividindo 90° por 360°: o resultado é 0,25, ou 25%.$why$)),
updated as (
 select m.slug,
 jsonb_agg(
  case when p.n is not null
   then jsonb_set(q.item,'{why}',to_jsonb(p.new_why),true)
   else q.item end
  order by q.ordinality
 ) as new_quiz
 from public.study_materials m
 cross join lateral jsonb_array_elements(m.quiz) with ordinality q(item,ordinality)
 left join patches p on p.slug=m.slug and p.n=q.ordinality
 where m.contest_name='PC-AC 2026' and m.discipline='Estatística'
 group by m.slug
)
update public.study_materials m
set quiz=u.new_quiz, updated_at=now()
from updated u
where m.slug=u.slug
  and m.slug in ('pcac-2026-estatistica-01-fundamentos-populacao-amostra-variaveis','pcac-2026-estatistica-mediana-moda-quartis-percentis','pcac-2026-estatistica-04-medidas-tendencia-central-media','pcac-2026-estatistica-06-probabilidade-eventos-condicional','pcac-2026-estatistica-12-distribuicoes-probabilidade','pcac-2026-estatistica-03-tabelas-graficos-interpretacao');
