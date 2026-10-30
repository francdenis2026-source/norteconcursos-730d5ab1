-- Attach a didactic explanation to CEBRASPE Câmara dos Deputados 2026 item 81.
-- The live database was updated and verified; this migration makes the change reproducible.
begin;
insert into public.question_support_texts (id,label,body,contest_name,exam_year,exam_board,source_note)
values (
  'c25d6596-5cfa-4ad9-ab1f-9eff2102a6f1',
  'Explicação — modo anônimo e dark web (item 81)',
  'GABARITO: ERRADO.

O item confunde navegação anônima com anonimato na internet. O modo anônimo do Google Chrome e a navegação InPrivate do Microsoft Edge reduzem principalmente os dados que ficam armazenados localmente após o encerramento da sessão, como histórico, cookies e dados de sites daquela sessão.

Isso não significa que a atividade fique impossível de rastrear. O modo anônimo não oculta automaticamente a atividade perante os sites visitados, o provedor de internet ou o administrador da rede. Também não impede a identificação decorrente de login em contas, downloads, extensões ou outros comportamentos.

A dark web é uma parte da internet que normalmente exige ferramentas específicas para acesso. Mesmo ferramentas voltadas à privacidade e ao anonimato não garantem proteção absoluta. Portanto, abrir uma janela anônima em um navegador comum não torna a navegação na dark web automaticamente anônima nem impede todo tipo de rastreamento.

DICA PARA A PROVA: modo anônimo = redução de registros locais; não significa anonimato total nem proteção contra rastreamento.

Atenção às expressões absolutas “nenhum registro” e “seja rastreável”: o modo anônimo não oferece essa garantia.',
  'Câmara dos Deputados', 2026, 'CEBRASPE',
  'Explicação didática redigida para o item 81 — Técnico Legislativo, Policial Legislativo Federal; gabarito oficial definitivo: E (errado).'
)
on conflict (id) do update set label=excluded.label, body=excluded.body, contest_name=excluded.contest_name, exam_year=excluded.exam_year, exam_board=excluded.exam_board, source_note=excluded.source_note;
update public.official_exam_questions
set support_text_id='c25d6596-5cfa-4ad9-ab1f-9eff2102a6f1',
    review_note=coalesce(review_note,'') || E'\nExplicação didática associada em 2026-10-30; gabarito oficial E (errado).'
where id='c25d6596-5cfa-4ad9-ab1f-9eff2102a6ff'
  and official_answer='E';
commit;