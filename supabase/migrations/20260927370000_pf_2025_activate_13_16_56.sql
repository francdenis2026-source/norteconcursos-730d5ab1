-- Complemento da onda 1 (PF 2025): itens 13 e 16 (auditados no Planalto em 27/09/2026, ver
-- 20260927360000) e item 56 (lógica; enunciado completo, gabarito E/C conferido por dedução).
update public.official_exam_questions set context_review_required=false,
  review_note=case when item_number=56 then 'Item de lógica com enunciado completo. Se Aldo ou Bruno é filho de Carlos, Daniel é pai de Elza e Fernanda; contrapositiva leva à conclusão do item. Gabarito C confere.' else review_note end
where exam_year=2025 and career_name='Agente de Polícia Federal' and item_number in (13,16,56);
-- @@
update public.official_exam_questions set content_status='active'
where exam_year=2025 and career_name='Agente de Polícia Federal' and content_status='under_review' and item_number in (13,16,56);
