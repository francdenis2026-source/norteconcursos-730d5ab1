-- Norte Concurso — Conteúdo didático pertence à PLATAFORMA (administrador), não à conta do aluno
--
-- COMO USAR (SQL Editor do Supabase): rode o PASSO 1 sozinho, leia o resultado, e só depois o PASSO 2.
-- Nada aqui apaga conteúdo. Provas e dados de estudo do aluno 69598193268 NÃO são tocados.
--
-- O que o código mostra: as tabelas de conteúdo (materiais, editais/tópicos, questões oficiais,
-- concursos, fontes) NÃO têm "dono" — são da plataforma e só o administrador as gerencia.
-- A única marca de conta nelas é study_materials.reviewed_by (quem revisou/publicou o material).
-- Se algum material foi publicado enquanto você estava logado na conta do aluno, é isso que
-- precisa passar para o administrador.

-- ===== PASSO 1 — DIAGNÓSTICO (só leitura) =====

-- 1a) Quem aparece como revisor dos materiais, por situação do material
select coalesce(u.email, '(sem revisor)') as revisor,
       m.content_status,
       count(*) as materiais
from public.study_materials m
left join auth.users u on u.id = m.reviewed_by
group by 1, 2
order by 1, 2;

-- 1b) Papéis das duas contas (o administrador precisa ter 'admin'; o aluno só 'user')
select u.email, string_agg(r.role::text, ', ') as papeis
from auth.users u
left join public.user_roles r on r.user_id = u.id
where u.email in ('francdenisbr@gmail.com', '69598193268@norteconcurso.local')
group by 1;

-- 1c) Arquivos enviados ao armazenamento, por dono (espera-se só o bucket das provas do aluno)
select o.bucket_id, coalesce(u.email, '(sem dono)') as dono, count(*) as arquivos
from storage.objects o
left join auth.users u on u.id = o.owner
group by 1, 2
order by 1, 2;

-- ===== PASSO 2 — REATRIBUIÇÃO (rode só se o 1a mostrou materiais do aluno como revisor) =====

-- Só muda o campo "revisor" dos materiais revisados pela conta do aluno. Pode ser repetido sem efeito extra.
update public.study_materials
set reviewed_by = (select id from auth.users where email = 'francdenisbr@gmail.com')
where reviewed_by = (select id from auth.users where email = '69598193268@norteconcurso.local');

-- Conferência: não deve sobrar nenhum material revisado pelo aluno.
select coalesce(u.email, '(sem revisor)') as revisor, count(*) as materiais
from public.study_materials m
left join auth.users u on u.id = m.reviewed_by
group by 1;
