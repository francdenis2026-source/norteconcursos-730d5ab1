-- The candidate had two essay photos ("REDAÇÃO ENUCIADO.jpg" and
-- "REDAÇÃO.jpg") sitting in his local "PC CIVEL DO ACRE 2017" folder that
-- were never uploaded to Supabase storage nor registered as an
-- essay_submissions row. Uploaded now to
-- {user}/policia-civil-ac-2017-agente/redacao-{enunciado,texto}.jpg.
--
-- IMPORTANT DATA CONFLICT, kept in `correcao.comentario` for transparency:
-- the essay prompt page is printed with the footer "FUNCAB - Fundação
-- Professor Carlos Augusto Bittencourt", a different exam board than IBADE
-- (the confirmed board for PC-AC 2017, per the exam cover page and the
-- official gabarito already in official_exam_questions). The candidate
-- explicitly confirmed (2026-09-27) this essay belongs to PC-AC 2017 despite
-- the FUNCAB imprint, so it is registered under that contest per his
-- instruction — but the discrepancy is left visible rather than silently
-- resolved, since it could not be independently verified.
insert into public.essay_submissions
  (user_id, contest_name, contest_year, exam_board, tema, topicos, nota_maxima,
   status, transcricao, storage_paths, correcao)
select
  u.id,
  'Polícia Civil do Acre',
  '2017',
  'IBADE',
  'A violência é fruto da desigualdade social (título do candidato: "Violência Urbana: viver ou morrer?!")',
  '[]'::jsonb,
  null,
  'texto_completo',
  E'Violência Urbana: viver ou morrer?!\n\nViver ou morrer?! Este é o dilema de milhares de pessoas, todos os dias, em muitas cidades do Brasil, vítimas de uma desenfreada onda de violência que parece não ter fim.\n\nNas ruas, olhares atentos, passos apressados, bolsas e carteiras bem protegidas, ritual comum indispensável para sobrevivência em ambientes hostis e perigosos dos centros urbanos.\n\nA violência instalada fez com que a sociedade, de certa forma, "acostumasse" com os horrores do cotidiano. Violência urbana é espécie do gênero desigualdade social. É a razão de existir desse mal enraizado. Para entender a essência do problema, é necessário encontrar seus "criadores", nos quais se pode atribuir a culpa.\n\nNão há sombra de dúvida que fatores como a falta de distribuição de renda e má administração política do país contribuem significadamente para a geração de muitos dos problemas da sociedade, que tem como, pobreza, a fome, a corrupção na adm. pública, má distribuição de renda, a precariedade da saúde e a segurança. Não basta apenas "esquivar-se" ou ficar exposto à violência. É imprescindível que a sociedade saiba escolher bons administradores, honestos e comprometidos a combater a violência e assim evitar outros males oriundos de suas políticas.\n\nPortanto, fico claro, com os fatos narrados, que a sociedade urbana vive refém da violência, e que esta é consequência de suas próprias escolhas, administradores corruptos que contribuem para o caos da violência e de outros males sociais.',
  '["f4326343-dd3a-46cf-b5e6-e6194abb31e5/policia-civil-ac-2017-agente/redacao-enunciado.jpg","f4326343-dd3a-46cf-b5e6-e6194abb31e5/policia-civil-ac-2017-agente/redacao-texto.jpg"]'::jsonb,
  jsonb_build_object(
    'confianca', 'baixa',
    'comentario', 'ATENÇÃO: a folha do enunciado desta redação traz o rodapé impresso "FUNCAB - Fundação Professor Carlos Augusto Bittencourt", banca diferente do IBADE confirmado para a PC-AC 2017 (capa da prova objetiva e gabarito oficial já cadastrados). O candidato confirmou explicitamente (2026-09-27) que esta redação pertence à PC-AC 2017 mesmo com essa divergência impressa, então foi registrada aqui por instrução dele — mas a banca real desta folha específica não pôde ser verificada de forma independente. Sem rubrica de tópicos oficial publicada (nenhuma das duas bancas citadas disponibiliza critério de correção detalhado publicamente), então nenhuma nota estimada foi atribuída.',
    'nota_estimada', null,
    'pontos_fortes', jsonb_build_array(
      'Título próprio e pertinente ao tema ("Violência Urbana: viver ou morrer?!")',
      'Estrutura dissertativo-argumentativa completa: introdução, dois parágrafos de desenvolvimento e conclusão',
      'Conecta violência urbana ao tema de desigualdade social pedido no enunciado, indo além da paráfrase dos textos motivadores'
    ),
    'pontos_fracos', jsonb_build_array(
      'Vários trechos rasurados/reescritos (ex.: linhas 7-8, 11-12, 16-18, 24), indicando insegurança na formulação',
      'Alguns problemas de concordância e ortografia (ex.: "significadamente", "instalado"/"instalada" rasurado)',
      'A causa apontada (má administração/corrupção) é ampla e pouco desenvolvida com exemplos concretos'
    )
  )
from auth.users u
where u.email = '69598193268@norteconcurso.local'
on conflict do nothing;
