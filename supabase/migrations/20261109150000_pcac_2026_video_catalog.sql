-- PC-AC 2026: current public edital analyses, checked on 2026-11-09.
-- The detailed discipline/topic mapping remains in the app catalog and the PC-AC verticalized links.
insert into public.media_videos (subject, topic, youtube_id, title, channel, embeddable, status, checked_at, active, sort_order)
values
  ('PC-AC 2026', 'Edital e estratégia', '0Ir0LnvMmKA', 'Atenção! Concurso PCAC publicado | Análise completa do edital - AO VIVO', 'Qconcursos', true, 'ok', timestamptz '2026-11-09 00:00:00-03', true, 1),
  ('PC-AC 2026', 'Edital e estratégia', 'iuUCugqtBGw', 'PC AC — análise completa do edital', 'Direito Simples e Objetivo', true, 'ok', timestamptz '2026-11-09 00:00:00-03', true, 2)
on conflict (subject, topic, youtube_id) do update
set title = excluded.title,
    channel = excluded.channel,
    embeddable = excluded.embeddable,
    status = excluded.status,
    checked_at = excluded.checked_at,
    active = true,
    sort_order = excluded.sort_order;
