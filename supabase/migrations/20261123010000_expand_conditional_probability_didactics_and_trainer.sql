-- Expande a aula de probabilidade condicional e inclui quatro itens autorais no treinador.
do $$
declare
  v_material_id uuid := 'f73e3ed9-bcb0-42f8-bfcc-c5a7c3efb409';
  v_new_items jsonb := jsonb_build_array(
    jsonb_build_object(
      'q','Em 40 registros noturnos, 16 apresentam vestígios. Sabendo que o registro escolhido é noturno, a probabilidade de apresentar vestígios é 40%.',
      'a',true,'difficulty','fácil',
      'tip','A expressão “sabendo que é noturno” define o denominador: use somente os 40 registros noturnos.',
      'why','Certo. A condição restringe o universo aos 40 registros noturnos. Dentro desse grupo, 16 apresentam vestígios. Logo, P(vestígio | noturno)=16/40=0,4=40%. Não use o total geral de 120 registros, pois a pergunta não considera todos eles.',
      'resolution_steps',jsonb_build_array('Localize a condição: o registro escolhido é noturno.','Defina o novo universo: 40 registros noturnos.','Conte os casos favoráveis dentro desse grupo: 16 com vestígios.','Monte 16/40.','Simplifique dividindo por 8: 2/5=40%.')
    ),
    jsonb_build_object(
      'q','Entre 90 candidatos que participaram de um curso, 54 foram aprovados. Sabendo que o candidato participou do curso, a probabilidade de aprovação é 50%.',
      'a',false,'difficulty','média',
      'tip','Simplifique 54/90 dividindo numerador e denominador por 9.',
      'why','Errado. O grupo condicionado contém 90 candidatos, e 54 foram aprovados. A conta é 54/90=6/10=0,6=60%, não 50%. A condição “participou do curso” faz com que o denominador seja 90.',
      'resolution_steps',jsonb_build_array('Identifique a condição: participou do curso.','Use 90 como total do grupo condicionado.','Use 54 como casos favoráveis.','Calcule 54/90.','Divida ambos por 9: 6/10=60%.')
    ),
    jsonb_build_object(
      'q','Em 200 processos, 120 são criminais. Entre os processos criminais, 36 apresentam determinada característica. Escolhido um processo criminal, a probabilidade de ele apresentar essa característica é 30%.',
      'a',true,'difficulty','média',
      'tip','Leia com atenção: agora a condição é “processo criminal”. O total condicionado é 120.',
      'why','Certo. A pergunta foi formulada como “escolhido um processo criminal”. Portanto, o universo é formado pelos 120 processos criminais. Desses, 36 apresentam a característica: 36/120=0,3=30%. Esta formulação corrige a ambiguidade da versão anterior, que perguntava o inverso sem informar o total de processos com a característica.',
      'resolution_steps',jsonb_build_array('Circule a condição: processo criminal.','O denominador é 120, pois esse é o total de processos criminais.','O numerador é 36, pois são os criminais com a característica.','Calcule 36/120.','Simplifique para 3/10=30%.')
    ),
    jsonb_build_object(
      'q','Entre os registros que apresentam determinado vestígio, 12 são noturnos e 8 são diurnos. Escolhido um registro com vestígio, a probabilidade de ele ser noturno é 60%.',
      'a',true,'difficulty','difícil',
      'tip','A condição mudou! Some os registros com vestígio: 12 + 8. Esse total será o denominador.',
      'why','Certo. A condição agora é “registro com vestígio”, e não “registro noturno”. O grupo condicionado possui 12+8=20 registros. Desses, 12 são noturnos. Assim, P(noturno | vestígio)=12/20=3/5=60%. Essa questão mostra que P(vestígio | noturno) e P(noturno | vestígio) são perguntas diferentes.',
      'resolution_steps',jsonb_build_array('Identifique a condição: apresentar vestígio.','Some todos os registros com vestígio: 12 noturnos + 8 diurnos = 20.','Conte os favoráveis à pergunta: 12 noturnos.','Monte 12/20.','Simplifique para 3/5=60%.')
    )
  );
  v_new_body text := E'\n\n## 12. Treino guiado: entenda a condição antes de dividir\n\n### Exemplo 1 — registros policiais\n\nEm 120 registros, 40 são noturnos. Entre os noturnos, 16 apresentam vestígios. Se o registro escolhido já é conhecido como noturno, qual a chance de apresentar vestígios?\n\n- **Condição:** ser noturno.\n- **Universo condicionado:** 40 registros noturnos.\n- **Casos favoráveis:** 16 registros noturnos com vestígios.\n- **Conta:** 16 ÷ 40 = 0,4 = **40%**.\n\nNão use 120: esse é o total geral, mas a pergunta restringiu a análise aos registros noturnos.\n\n### Exemplo 2 — candidatos\n\nEntre 150 candidatos, 90 fizeram um curso e, desses, 54 foram aprovados. Sabendo que o candidato fez o curso, a chance de aprovação é 54/90 = 6/10 = **60%**. Simplifique a fração antes de dividir.\n\n### Exemplo 3 — processos\n\nHá 200 processos, dos quais 120 são criminais. Entre os criminais, 36 têm determinada característica. Escolhido um processo criminal, a chance de ele ter a característica é 36/120 = 3/10 = **30%**. A condição “processo criminal” determina o denominador.\n\n### Exemplo 4 — inversão da condição\n\nEntre os registros que apresentam um vestígio, 12 são noturnos e 8 são diurnos. Escolhido um registro com vestígio, a chance de ele ser noturno é 12/(12+8) = 12/20 = **60%**. O denominador é 20 porque a condição agora é apresentar vestígio.\n\n### Macetes de cálculo mental\n\n1. **Simplifique antes de dividir:** 12/30 ÷ 6 = 2/5 = 40%; 16/40 ÷ 8 = 2/5 = 40%; 54/90 ÷ 9 = 6/10 = 60%.\n2. **Decore frações úteis:** 1/2=50%; 1/3≈33,33%; 1/4=25%; 1/5=20%; 2/5=40%; 3/5=60%; 3/4=75%; 1/10=10%.\n3. **Transforme em décimos quando for fácil:** 6/10=60%; 3/10=30%.\n4. **Confira se o resultado faz sentido:** uma probabilidade deve ficar entre 0% e 100%. Se a divisão produzir 250%, provavelmente você inverteu numerador e denominador ou escolheu o grupo errado.\n5. **Regra de ouro:** numerador = parte que atende ao que foi pedido; denominador = total do grupo definido pela condição.\n\n### Como não confundir P(A|B) com P(B|A)\n\nP(vestígio | noturno) significa: entre os noturnos, quantos têm vestígio? P(noturno | vestígio) significa: entre os que têm vestígio, quantos são noturnos? A ordem importa. Não inverta os números sem reler a condição.\n\n### Pegadinhas frequentes\n\n- “Sabendo que”, “dado que”, “entre os que” e “considerando apenas” indicam o grupo condicionado.\n- Não use o total geral se a condição restringiu o universo.\n- Não confunda 12/30 com 30/12: probabilidade é a parte favorável dividida pelo total do grupo considerado.\n- Se a condição mudar, o denominador pode mudar.\n- Se o enunciado não informar o tamanho do grupo condicionado, talvez não haja dados suficientes para calcular a probabilidade.\n\n### Roteiro de prova em 10 segundos\n\n1. Leia a pergunta final. 2. Circule “sabendo que”. 3. Diga em voz baixa: “meu grupo agora é...”. 4. Coloque no denominador o total desse grupo. 5. Coloque no numerador a parte desse grupo que atende ao pedido. 6. Simplifique e converta para porcentagem.\n';
begin
  update public.study_materials
  set body_md = case
        when position('## 12. Treino guiado: entenda a condição antes de dividir' in coalesce(body_md,'')) > 0 then body_md
        else coalesce(body_md,'') || v_new_body
      end,
      quiz = coalesce(quiz,'[]'::jsonb) || coalesce((
        select jsonb_agg(item)
        from jsonb_array_elements(v_new_items) item
        where not exists (
          select 1 from jsonb_array_elements(coalesce(study_materials.quiz,'[]'::jsonb)) old_item
          where old_item->>'q' = item->>'q'
        )
      ),'[]'::jsonb),
      practice_review = jsonb_set(
        coalesce(practice_review,'{}'::jsonb),
        '{items}',
        coalesce(practice_review->'items','[]'::jsonb) || coalesce((
          select jsonb_agg(item)
          from jsonb_array_elements(v_new_items) item
          where not exists (
            select 1 from jsonb_array_elements(coalesce(study_materials.practice_review->'items','[]'::jsonb)) old_item
            where old_item->>'q' = item->>'q'
          )
        ),'[]'::jsonb),
        true
      ) || jsonb_build_object(
        'status','reviewed',
        'checked_at',now(),
        'method','Revisão didática: probabilidade condicional, escolha do denominador, inversão da condição e cálculo mental'
      ),
      updated_at = now()
  where id = v_material_id;
end $$;
