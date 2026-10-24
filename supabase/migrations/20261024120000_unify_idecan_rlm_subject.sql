-- IDECAN questões: "Raciocínio Lógico-Matemático", "Matemática e Raciocínio Lógico" e
-- "Raciocínio Lógico e Matemático" são a mesma disciplina sob nomes diferentes do edital,
-- fragmentando a classificação em vez de agrupar (ver src/lib/subjects.ts, canonicalSubject).
-- Unifica para "Raciocínio Lógico" nas 38 questões da banca IDECAN afetadas.
update board_exam_questions
set subject = 'Raciocínio Lógico'
where board ilike '%IDECAN%'
  and subject in (
    'Raciocínio Lógico-Matemático',
    'Matemática e Raciocínio Lógico',
    'Raciocínio Lógico e Matemático'
  );
