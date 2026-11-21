-- Expand five verified, short explanations without changing their answer keys.
WITH revisions(slug,position,expected_q,explanation) AS (VALUES
('informatica-hardware-memorias-software',6,'Capacidade de armazenamento e velocidade de processamento medem a mesma coisa.','Errado. Armazenamento mede a quantidade de dados que podem ser guardados (por exemplo, GB ou TB); velocidade de processamento descreve desempenho em operações. Um SSD de 1 TB não torna automaticamente o processador mais rápido.'),
('informatica-linux-permissoes-rwx',5,'r-x corresponde ao valor octal 5.','Correto. Em permissões Linux, leitura (r) vale 4, escrita (w) vale 2 e execução (x) vale 1. Em r-x, a escrita está ausente: 4 + 0 + 1 = 5.'),
('portugues-classes-palavras-contexto',1,'Em ''um relatório claro'', ''claro'' caracteriza o nome relatório.','Correto. Na expressão “um relatório claro”, a palavra “claro” atribui uma característica ao substantivo “relatório”; por isso, exerce função de adjetivo no contexto.'),
('portugues-coesao-reescrita-sentido',6,'Ler apenas o pronome isolado basta para identificar sempre seu referente.','Errado. Para identificar a que termo um pronome se refere, normalmente é necessário observar o contexto anterior ou posterior. Por exemplo, em “Ana encontrou Beatriz e ela sorriu”, o referente de “ela” pode ser ambíguo sem mais informações.'),
('portugues-ortografia-acentuacao-atual',4,'A forma verbal plural ''leem'' exige o acento de ''lêem''.','Errado. Pela ortografia vigente, não se usa acento circunflexo nos hiatos “ee” de formas como “leem”, “veem”, “creem” e “deem”. A grafia “lêem” pertence à norma anterior.')
), updates AS (
SELECT sm.id,r.position,r.explanation
FROM public.study_materials sm JOIN revisions r ON sm.slug=r.slug
WHERE sm.content_status='active' AND sm.quiz->(r.position-1)->>'q'=r.expected_q
)
UPDATE public.study_materials sm SET quiz=(
 SELECT jsonb_agg(CASE WHEN e.ordinality=u.position THEN jsonb_set(e.value,'{why}',to_jsonb(u.explanation)) ELSE e.value END ORDER BY e.ordinality)
 FROM jsonb_array_elements(sm.quiz) WITH ORDINALITY e(value,ordinality)),
practice_review=jsonb_set(coalesce(sm.practice_review,'{}'::jsonb),'{explanation_quality_audit}',jsonb_build_object('status','targeted_explanation_expanded_pending_full_review','checked_at','2026-11-21'),true),updated_at=now()
FROM updates u WHERE sm.id=u.id;