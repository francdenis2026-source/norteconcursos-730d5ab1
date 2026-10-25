-- Somente leitura: resultado esperado 192 reviewed, 5 obsolete, 3 rejected.
select s.title, c.content_status, count(*) as candidates,
 count(*) filter (where c.payload ? 'publication' or c.payload#>>'{individual_review,publication_approved}' = 'true') as publicacoes_autorizadas
from public.question_corpus_sources s
join public.question_corpus_candidates c on c.corpus_id = s.id
where s.id in ('56a363de9d9c7d346d116c9e4d86cd8f5d737222ea51595a906c8596813c6cfe','a835d92983601375c77355a50f68bdc77092e4fb88fdb9686ff453b8ed2fd57d')
group by s.title,c.content_status order by s.title,c.content_status;
