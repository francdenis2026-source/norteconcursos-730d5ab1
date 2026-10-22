-- IDECAN: ativa PC SC (Escrivão) com gabarito oficial definitivo (conferido em 22/10/2026
-- em antigo-concurso.idecan.org.br/Concurso.aspx?ID=201; itens 24 e 96, anulados no
-- definitivo, ja ficaram fora da carga). Revisao individual (CONTENT_GOVERNANCE.md):
-- texto completo presente em todas as 98 linhas (sem placeholder/figura ausente), gabarito
-- definitivo conferido contra a fonte oficial da banca (PR #252), legislacao de cada questao
-- juridica reconferida em 22/10/2026 (legal_basis/law_version_checked_at por linha).
update public.board_exam_questions
set content_status = 'active'
where board = 'IDECAN'
  and content_status = 'under_review'
  and contest_name = 'PC SC - Escrivão de Polícia Civil 2026'
  and career_name = 'Escrivão de Polícia Civil'
  and exam_type = 'Tipo A'
  and item_number in (1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,97,98,99,100);
