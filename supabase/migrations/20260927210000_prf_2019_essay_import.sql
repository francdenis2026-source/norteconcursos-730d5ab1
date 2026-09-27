-- The candidate had NOT registered an essay for PRF 2019 yet (essay_submissions
-- had zero rows for this contest/year, unlike PF 2014/2018/2021/2025 and PRF
-- 2021, which were already imported). The handwritten "RASCUNHO" page exists
-- in the candidate's own booklet — pagina-11.jpg of prf-2019-agente, already
-- in the student-exams bucket as part of the 11-page set — it was just never
-- linked to an essay_submissions row.
--
-- IMPORTANT: unlike the other essays already imported, this booklet does NOT
-- contain the discursive prompt/enunciado page (only Bloco I/II/III objective
-- pages + this rascunho page were captured), so the required tópicos and
-- their point values are unknown here — topicos is left empty rather than
-- guessed, per the project rule of never inventing content without an
-- official source. If the candidate has the missing enunciado page, resending
-- it lets this be refined with an actual tópico-by-tópico breakdown.
insert into public.essay_submissions
  (user_id, contest_name, contest_year, exam_board, tema, topicos, nota_maxima,
   valor_apresentacao, status, transcricao, storage_paths, correcao)
select
  u.id,
  'Polícia Rodoviária Federal',
  '2019',
  'CEBRASPE',
  'Tema não identificado nas fotos (texto sobre a Lei Seca — Lei nº 11.705/2008 — e o combate a infrações de trânsito pela PRF)',
  '[]'::jsonb,
  null,
  null,
  'rascunho_incompleto',
  E'A lei mais temida pelos motoristas, a lei 11.705/08, popularmente conhecida como Lei Seca, recentemente completou 27 anos de vigência, um avanço na legislação de trânsito do país. Contudo, percebe-se que o aumento de infrações ainda figura nas trágicas estatísticas de acidentes com vítimas fatais. Na linha de frente a Polícia Rodoviária Federal não mede esforços em combater motoristas transgressores nas rodovias federais, autuando, fiscalizando e aplicando as regras do Código de Trânsito Brasileiro - CTB.\n\nSabe-se que por mais que as autoridades, a PRF, sobretudo a PRF, diuturnamente no combate contra motoristas flagrados bêbados ou cometendo ilícitos, o cidadão deve-se conscientizar da sua responsabilidade no trânsito. Dessa forma, procuram conhecer o CTB e suas resoluções, incentivar crianças a conhecê-lo e além disso, por em prática as regras de trânsito.\n\nQuanto à sociedade, deve-se cobrar das autoridades regras mais punitivas mais severas; exigir do poder público que proporcione um trânsito seguro, infraestrutura adequada, que garantam o direito de não correr em um trânsito hostil e nas mãos de motoristas irresponsáveis.\n\nEnfim, não adianta criarem leis duras, é preciso que todos tenham consciência de sua responsabilidade no trânsito para que vidas possam ser poupadas.',
  '["f4326343-dd3a-46cf-b5e6-e6194abb31e5/prf-2019-agente/pagina-11.jpg"]'::jsonb,
  jsonb_build_object(
    'confianca', 'baixa',
    'comentario', 'Estimativa educacional interna da plataforma, não é correção oficial CEBRASPE. Sem a página do enunciado/tópicos exigidos, não é possível avaliar aderência a critérios específicos da banca — a leitura abaixo é apenas estrutural, a partir do rascunho.',
    'nota_estimada', null,
    'pontos_fortes', jsonb_build_array(
      'Tema desenvolvido do início ao fim, com introdução, desenvolvimento em 3 parágrafos e conclusão',
      'Cita corretamente a base legal (Lei nº 11.705/2008 — Lei Seca) e o CTB',
      'Estabelece uma divisão clara de responsabilidades: atuação da PRF, conscientização do cidadão e cobrança da sociedade ao poder público'
    ),
    'pontos_fracos', jsonb_build_array(
      'Erro factual: a Lei Seca é de 2008, não teria completado "27 anos" até 2019 (o rascunho está com rasuras nesse trecho, típico de insegurança na hora da prova)',
      'Vários trechos rasurados/reescritos indicam dificuldade de articulação sob pressão de tempo',
      'Falta dados ou exemplos concretos (estatísticas, casos) para sustentar os argumentos',
      'Conclusão genérica, sem retomar de forma explícita os pontos levantados nos parágrafos anteriores'
    )
  )
from auth.users u
where u.email = '69598193268@norteconcurso.local'
on conflict do nothing;
