-- Correção de digitação ("enquanot" -> "enquanto") no review_note do item 26
-- (PC-ES 2022 Delegado de Polícia), introduzida na migração do lote 2.

update public.official_exam_questions
set review_note=$q$Correto (opção C). Pelo art. 116, II, do Código Penal, não corre o prazo prescricional enquanto não transitar em julgado a decisão final nos casos de recurso pendente de julgamento perante tribunais superiores (causa impeditiva da prescrição).
Fonte oficial: art. 116, II, Código Penal (Decreto-Lei 2.848/1940), planalto.gov.br.$q$
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=26;
