-- Selos (badges) de aprovação em concursos, informados diretamente pelo
-- candidato Franc Denis (CPF 69598193268) em 28/09/2026:
-- - Feijó 2018 (Professor - Licenciatura Plena - Pedagogo): aprovado, EFETIVO.
-- - Agente Socioeducativo: aprovado, EFETIVO.
-- - Técnico de Informática (ISE 2021): aprovado, CADASTRO DE RESERVA.
-- - Polícia Penal do Acre 2023: aprovado, CADASTRO DE RESERVA.
--
-- Datas de nomeação/homologação não foram confirmadas contra edital/diário
-- oficial nesta importação (diferente da prova de Feijó, cuja nota já foi
-- conferida contra o gabarito oficial em migration anterior); attained_at
-- usa o momento do cadastro até que as datas oficiais sejam verificadas.

insert into public.achievements (code, name, description, icon_url) values
('feijo_2018_efetivo', 'Aprovado — Professor/Pedagogo, Feijó-AC 2018', 'Aprovado e nomeado EFETIVO no concurso da Prefeitura de Feijó-AC, Edital nº 006/2018, cargo Professor - Licenciatura Plena - Pedagogo.', null),
('socioeducativo_efetivo', 'Aprovado — Agente Socioeducativo', 'Aprovado e nomeado EFETIVO no concurso para Agente Socioeducativo.', null),
('ise_tec_informatica_cr', 'Aprovado — Técnico de Informática (ISE)', 'Aprovado no concurso ISE para Técnico de Informática 2021, classificado em cadastro de reserva.', null),
('policia_penal_ac_cr', 'Aprovado — Polícia Penal do Acre', 'Aprovado no concurso da Polícia Penal do Acre 2023, classificado em cadastro de reserva.', null)
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
where achievements.code in (
  'feijo_2018_efetivo',
  'socioeducativo_efetivo',
  'ise_tec_informatica_cr',
  'policia_penal_ac_cr'
)
on conflict (user_id, achievement_id) do nothing;
