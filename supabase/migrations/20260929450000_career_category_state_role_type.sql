-- Adds filterable "career category" (institution type), "role type" (function
-- within the institution) and "state" (UF) metadata to the question bank /
-- question trainer UI.
--
-- Columns are added, nullable, to all three question source tables so the
-- frontend can query a uniform shape across official_exam_questions,
-- question_bank (personal) and curated_question_catalog (curated). Only
-- official_exam_questions is backfilled here, since it is the only one of
-- the three with rows today; question_bank and curated_question_catalog get
-- the columns for shape consistency and stay NULL until content is added to
-- them.
--
-- Taxonomy (career_category, the INSTITUTION type):
--   'Polícia Federal', 'Polícia Rodoviária Federal', 'Polícia Civil',
--   'Polícia Militar', 'Polícia Penal', 'Corpo de Bombeiros Militar',
--   'Guarda Civil Municipal', 'Fiscal/Tributário', 'Controladoria/Auditoria',
--   'Legislativo', 'Administrativo/Outros'
--
-- Taxonomy (role_type, the FUNCTION within the career):
--   'Delegado', 'Perito Criminal', 'Escrivão', 'Agente', 'Papiloscopista',
--   'Investigador', 'Oficial', 'Praça/Soldado', 'Datiloscopista', 'Auditor',
--   'Técnico', 'Analista', 'Outro'
--
-- state is the Brazilian UF (2-letter), NULL for federal-scope contests.

alter table public.official_exam_questions
  add column if not exists state varchar(2),
  add column if not exists career_category text,
  add column if not exists role_type text;

alter table public.question_bank
  add column if not exists state varchar(2),
  add column if not exists career_category text,
  add column if not exists role_type text;

alter table public.curated_question_catalog
  add column if not exists state varchar(2),
  add column if not exists career_category text,
  add column if not exists role_type text;

-- Backfill official_exam_questions, one UPDATE per distinct
-- (contest_name, career_name) combination that exists in the table today.

-- Polícia Federal (federal, state = NULL)
update public.official_exam_questions
  set state = null, career_category = 'Polícia Federal', role_type = 'Agente'
  where contest_name = 'Polícia Federal' and career_name = 'Agente de Polícia Federal';

update public.official_exam_questions
  set state = null, career_category = 'Polícia Federal', role_type = 'Delegado'
  where contest_name = 'Polícia Federal' and career_name = 'Delegado de Polícia Federal';

update public.official_exam_questions
  set state = null, career_category = 'Polícia Federal', role_type = 'Escrivão'
  where contest_name = 'Polícia Federal' and career_name = 'Escrivão de Polícia Federal';

update public.official_exam_questions
  set state = null, career_category = 'Polícia Federal', role_type = 'Papiloscopista'
  where contest_name = 'Polícia Federal' and career_name = 'Papiloscopista Policial Federal';

-- Polícia Rodoviária Federal (federal, state = NULL)
update public.official_exam_questions
  set state = null, career_category = 'Polícia Rodoviária Federal', role_type = 'Agente'
  where contest_name = 'Polícia Rodoviária Federal' and career_name = 'Policial Rodoviário Federal';

-- Departamento Penitenciário Nacional (federal, state = NULL)
update public.official_exam_questions
  set state = null, career_category = 'Polícia Penal', role_type = 'Agente'
  where contest_name = 'Departamento Penitenciário Nacional' and career_name = 'Departamento Penitenciário Nacional';

-- Polícia Penal do Acre
update public.official_exam_questions
  set state = 'AC', career_category = 'Polícia Penal', role_type = 'Agente'
  where contest_name = 'Polícia Penal do Acre' and career_name = 'Agente de Polícia Penal';

-- Polícia Civil do Acre
update public.official_exam_questions
  set state = 'AC', career_category = 'Polícia Civil', role_type = 'Agente'
  where contest_name = 'Polícia Civil do Acre' and career_name = 'Agente de Polícia Civil';

-- Prefeitura de Feijó (AC), municipal teaching role
update public.official_exam_questions
  set state = 'AC', career_category = 'Administrativo/Outros', role_type = 'Outro'
  where contest_name = 'Prefeitura de Feijó' and career_name = 'Professor - Licenciatura Plena - Pedagogo';

-- SEFAZ/AC
update public.official_exam_questions
  set state = 'AC', career_category = 'Fiscal/Tributário', role_type = 'Auditor'
  where contest_name = 'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre' and career_name = 'Especialista da Fazenda Estadual';

-- Polícia Civil de Santa Catarina
update public.official_exam_questions
  set state = 'SC', career_category = 'Polícia Civil', role_type = 'Delegado'
  where contest_name = 'Polícia Civil de Santa Catarina – Delegado de Polícia' and career_name = 'Delegado de Polícia';

-- Polícia Civil de Minas Gerais (multiple cargos, each with its own composed contest_name)
update public.official_exam_questions
  set state = 'MG', career_category = 'Polícia Civil', role_type = 'Delegado'
  where contest_name = 'Polícia Civil de Minas Gerais – Delegado de Polícia Substituto' and career_name = 'Delegado de Polícia Substituto';

update public.official_exam_questions
  set state = 'MG', career_category = 'Polícia Civil', role_type = 'Outro'
  where contest_name = 'Polícia Civil de Minas Gerais – Médico-Legista' and career_name = 'Médico-Legista';

update public.official_exam_questions
  set state = 'MG', career_category = 'Polícia Civil', role_type = 'Perito Criminal'
  where contest_name = 'Polícia Civil de Minas Gerais – Perito Criminal – Área I' and career_name = 'Perito Criminal – Área I';

update public.official_exam_questions
  set state = 'MG', career_category = 'Polícia Civil', role_type = 'Perito Criminal'
  where contest_name = 'Polícia Civil de Minas Gerais – Perito Criminal – Área II' and career_name = 'Perito Criminal – Área II';

update public.official_exam_questions
  set state = 'MG', career_category = 'Polícia Civil', role_type = 'Investigador'
  where contest_name = 'Polícia Civil de Minas Gerais – Investigador de Polícia I' and career_name = 'Investigador de Polícia I';

update public.official_exam_questions
  set state = 'MG', career_category = 'Polícia Civil', role_type = 'Técnico'
  where contest_name = 'Polícia Civil de Minas Gerais – Técnico-Assistente – Auxiliar de Perícia (TPAG)' and career_name = 'Técnico-Assistente – Auxiliar de Perícia (TPAG)';

update public.official_exam_questions
  set state = 'MG', career_category = 'Polícia Civil', role_type = 'Técnico'
  where contest_name = 'Polícia Civil de Minas Gerais' and career_name = 'Técnico-Assistente da Polícia Civil e de Atividades Governamentais (TPAG) - Auxiliar de Perícia';

-- Polícia Civil do Piauí
update public.official_exam_questions
  set state = 'PI', career_category = 'Polícia Civil', role_type = 'Delegado'
  where contest_name = 'Polícia Civil do Piauí – Delegado de Polícia Civil' and career_name = 'Delegado de Polícia Civil';

update public.official_exam_questions
  set state = 'PI', career_category = 'Polícia Civil', role_type = 'Investigador'
  where contest_name = 'Polícia Civil do Piauí – Oficial Investigador' and career_name = 'Oficial Investigador';

-- Polícia Civil do Ceará
update public.official_exam_questions
  set state = 'CE', career_category = 'Polícia Civil', role_type = 'Delegado'
  where contest_name = 'Polícia Civil do Ceará – Delegado de Polícia Civil' and career_name = 'Delegado de Polícia Civil';

update public.official_exam_questions
  set state = 'CE', career_category = 'Polícia Civil', role_type = 'Investigador'
  where contest_name = 'Polícia Civil do Ceará – Oficial Investigador de Polícia' and career_name = 'Oficial Investigador de Polícia';

-- Polícia Civil do Distrito Federal (two distinct contest_name spellings exist: a
-- composed "contest – cargo" string from the batch import and a plain one from
-- the later dedicated import; both are backfilled independently)
update public.official_exam_questions
  set state = 'DF', career_category = 'Polícia Civil', role_type = 'Delegado'
  where contest_name = 'Polícia Civil do Distrito Federal – Delegado de Polícia' and career_name = 'Delegado de Polícia';

update public.official_exam_questions
  set state = 'DF', career_category = 'Polícia Civil', role_type = 'Delegado'
  where contest_name = 'Polícia Civil do Distrito Federal' and career_name = 'Delegado de Polícia';

-- Polícia Civil do Estado de Rondônia (four cargos, composed contest_name)
update public.official_exam_questions
  set state = 'RO', career_category = 'Polícia Civil', role_type = 'Agente'
  where contest_name = 'Polícia Civil do Estado de Rondônia - Agente de Polícia Civil' and career_name = 'Agente de Polícia Civil';

update public.official_exam_questions
  set state = 'RO', career_category = 'Polícia Civil', role_type = 'Datiloscopista'
  where contest_name = 'Polícia Civil do Estado de Rondônia - Datiloscopista Policial' and career_name = 'Datiloscopista Policial';

update public.official_exam_questions
  set state = 'RO', career_category = 'Polícia Civil', role_type = 'Delegado'
  where contest_name = 'Polícia Civil do Estado de Rondônia - Delegado de Polícia' and career_name = 'Delegado de Polícia';

update public.official_exam_questions
  set state = 'RO', career_category = 'Polícia Civil', role_type = 'Escrivão'
  where contest_name = 'Polícia Civil do Estado de Rondônia - Escrivão de Polícia Civil' and career_name = 'Escrivão de Polícia Civil';

-- Polícia Civil do Estado do Espírito Santo
update public.official_exam_questions
  set state = 'ES', career_category = 'Polícia Civil', role_type = 'Delegado'
  where contest_name = 'Polícia Civil do Estado do Espírito Santo' and career_name = 'Delegado de Polícia';

-- Polícia Militar do Distrito Federal
update public.official_exam_questions
  set state = 'DF', career_category = 'Polícia Militar', role_type = 'Oficial'
  where contest_name = 'Polícia Militar do Distrito Federal' and career_name = 'Oficial Policial Militar – 2º Tenente';

-- Controladoria-Geral do Município de Porto Velho (RO)
update public.official_exam_questions
  set state = 'RO', career_category = 'Controladoria/Auditoria', role_type = 'Auditor'
  where contest_name = 'Controladoria-Geral do Município de Porto Velho (CGM/RO)' and career_name = 'Auditor';
