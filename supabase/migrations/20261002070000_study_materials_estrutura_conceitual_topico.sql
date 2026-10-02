-- O material "Estrutura conceitual" responde à terceira linha do edital da PF em Contabilidade
-- Geral ("Lei nº 6.404/1976, pronunciamentos CPC e NBC TSP Estrutura Conceitual"), e não à primeira.
-- Corrige o tópico para a biblioteca agrupar o material no lugar certo da trilha do edital.
update public.study_materials
set syllabus_topic_order = 3
where slug = 'contabilidade-estrutura-conceitual-informacao-util';
