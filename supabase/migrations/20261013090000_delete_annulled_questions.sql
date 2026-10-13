-- Remoção definitiva das questões com content_status='annulled' em
-- official_exam_questions, a pedido do usuário. Essas são questões cujo
-- próprio gabarito oficial da banca (CEBRASPE) marcou como anuladas (item
-- "X" no gabarito definitivo) — nunca foram exibidas aos estudantes
-- (content_status='annulled' já era filtrado em todas as telas), então a
-- remoção não afeta a experiência de nenhum usuário, apenas limpa o banco.

delete from public.official_exam_questions
where content_status = 'annulled';
