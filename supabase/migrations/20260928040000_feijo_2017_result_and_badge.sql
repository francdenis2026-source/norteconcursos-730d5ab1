-- Resultado e selo do concurso da Prefeitura de Feijó-AC 2017 (Edital 005/2017,
-- FUNDAPE), cargo Professor - Licenciatura Plena - Pedagogo, para o candidato
-- Franc Denis (CPF 69598193268). Aprovado e efetivado, conforme informado
-- pelo candidato em 28/09/2026.
--
-- Nota registrada é parcial: cobre apenas os itens 1-34 da prova objetiva
-- (34 de 40 questões), conferidos contra o gabarito oficial da FUNDAPE
-- (coluna Nível Superior para 1-25, coluna Professor-Pedagogo para 26-40).
-- Os itens 35-40 nao tem resposta do candidato registrada (nem no gabarito
-- pessoal da planilha, nem nas fotos da prova) e nao entram na contagem.
-- 22 corretas + 2 anuladas (itens 10 e 24, contam como acerto) = 24 net.

insert into public.mock_exam_results (user_id, exam_id, total_questions, correct_answers, finished_at)
select id, 'feijo-2017-professor-pedagogo', 40, 24, '2017-12-10T00:00:00Z'
from public.profiles where cpf = '69598193268';

insert into public.achievements (code, name, description, icon_url) values
('feijo_2017_efetivo', 'Aprovado — Professor/Pedagogo, Feijó-AC 2017', 'Aprovado e nomeado EFETIVO no concurso da Prefeitura de Feijó-AC, Edital nº 005/2017, cargo Professor - Licenciatura Plena - Pedagogo.', null)
on conflict (code) do update set
  name = excluded.name,
  description = excluded.description;

with candidate as (
  select id from public.profiles where cpf = '69598193268'
)
insert into public.user_achievements (user_id, achievement_id, attained_at)
select candidate.id, achievements.id, now()
from candidate
cross join public.achievements
where achievements.code = 'feijo_2017_efetivo'
on conflict (user_id, achievement_id) do nothing;
