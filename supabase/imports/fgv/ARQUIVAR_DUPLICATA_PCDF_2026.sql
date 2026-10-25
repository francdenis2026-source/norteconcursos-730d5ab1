-- PC-DF 2026 foi importada duas vezes (mesmos 111 itens, gabaritos idênticos).
-- Mantém a cópia 'Polícia Civil do Distrito Federal' e arquiva a duplicata, preservando o status anterior na nota.
update public.official_exam_questions
set content_status = 'archived',
    review_note = concat_ws('; ', review_note,
      'Duplicata da mesma prova (PC-DF 2026); cópia canônica: contest_name = ''Polícia Civil do Distrito Federal''. Arquivada em 15/10/2026 (status anterior: ' || content_status || '); gabaritos conferidos e idênticos.')
where contest_name = 'Polícia Civil do Distrito Federal – Delegado de Polícia'
  and exam_year = 2026
  and content_status <> 'archived';
