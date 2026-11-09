-- PC-AC 2026: YouTube study videos for the edital discipline Realidade do Acre.
insert into public.media_videos (subject, topic, youtube_id, title, channel, embeddable, status, checked_at, active, sort_order)
values
  ('Realidade do Acre', 'Formação histórica e ciclos da borracha', 'c5aX4ZsPWeY', 'História do Acre para Concursos Públicos', 'Esparta Educacional', true, 'ok', timestamptz '2026-11-09 00:00:00-03', true, 10),
  ('Realidade do Acre', 'Formação histórica e ciclos da borracha', 'SH6gAz1N0Ww', 'História do Acre - História / Geografia', 'Como Foi', true, 'ok', timestamptz '2026-11-09 00:00:00-03', true, 11),
  ('Realidade do Acre', 'Formação histórica e ciclos da borracha', 'UYa-nUkStbU', 'História e Geografia do Acre | Concurso Público | Gabaritada | Parte 1', 'Português Simples Assim', true, 'ok', timestamptz '2026-11-09 00:00:00-03', true, 12),
  ('Realidade do Acre', 'Revolução Acreana e anexação ao Brasil', 'c5aX4ZsPWeY', 'História do Acre para Concursos Públicos', 'Esparta Educacional', true, 'ok', timestamptz '2026-11-09 00:00:00-03', true, 13),
  ('Realidade do Acre', 'Revolução Acreana e anexação ao Brasil', 'SH6gAz1N0Ww', 'História do Acre - História / Geografia', 'Como Foi', true, 'ok', timestamptz '2026-11-09 00:00:00-03', true, 14),
  ('Realidade do Acre', 'Geografia, limites, fronteiras e hidrografia', 'KRmY1odLVyg', 'Geografia do Acre - Parte II - Prof. Sérgio Henrique', 'Estratégia Concursos', true, 'ok', timestamptz '2026-11-09 00:00:00-03', true, 15),
  ('Realidade do Acre', 'Geografia, limites, fronteiras e hidrografia', 'UYa-nUkStbU', 'História e Geografia do Acre | Concurso Público | Gabaritada | Parte 1', 'Português Simples Assim', true, 'ok', timestamptz '2026-11-09 00:00:00-03', true, 16),
  ('Realidade do Acre', 'Geografia, limites, fronteiras e hidrografia', 'm7JbzmrLqUA', 'Agricultura das Colônias aos Projetos de Assentamento Dirigidos - Geo História Acre', 'Lac Concursos', true, 'ok', timestamptz '2026-11-09 00:00:00-03', true, 17),
  ('Realidade do Acre', 'Aspectos étnicos, culturais e populações tradicionais', 'SH6gAz1N0Ww', 'História do Acre - História / Geografia', 'Como Foi', true, 'ok', timestamptz '2026-11-09 00:00:00-03', true, 18),
  ('Realidade do Acre', 'Aspectos étnicos, culturais e populações tradicionais', 'c5aX4ZsPWeY', 'História do Acre para Concursos Públicos', 'Esparta Educacional', true, 'ok', timestamptz '2026-11-09 00:00:00-03', true, 19),
  ('Realidade do Acre', 'Aspectos sociais e econômicos', 'ed8bJQ9GxWE', 'Economia e espaço da cidade - Geo História', 'Lac Concursos', true, 'ok', timestamptz '2026-11-09 00:00:00-03', true, 20),
  ('Realidade do Acre', 'Aspectos sociais e econômicos', 'm7JbzmrLqUA', 'Agricultura das Colônias aos Projetos de Assentamento Dirigidos - Geo História Acre', 'Lac Concursos', true, 'ok', timestamptz '2026-11-09 00:00:00-03', true, 21),
  ('Realidade do Acre', 'Aspectos sociais e econômicos', 'KRmY1odLVyg', 'Geografia do Acre - Parte II - Prof. Sérgio Henrique', 'Estratégia Concursos', true, 'ok', timestamptz '2026-11-09 00:00:00-03', true, 22),
  ('Realidade do Acre', 'Segurança pública e regiões de fronteira', 'KRmY1odLVyg', 'Geografia do Acre - Parte II - Prof. Sérgio Henrique', 'Estratégia Concursos', true, 'ok', timestamptz '2026-11-09 00:00:00-03', true, 23),
  ('Realidade do Acre', 'Segurança pública e regiões de fronteira', 'UYa-nUkStbU', 'História e Geografia do Acre | Concurso Público | Gabaritada | Parte 1', 'Português Simples Assim', true, 'ok', timestamptz '2026-11-09 00:00:00-03', true, 24)
on conflict (subject, topic, youtube_id) do update
set title = excluded.title,
    channel = excluded.channel,
    embeddable = excluded.embeddable,
    status = excluded.status,
    checked_at = excluded.checked_at,
    active = true,
    sort_order = excluded.sort_order;
