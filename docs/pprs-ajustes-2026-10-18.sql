-- Ajustes na PP-RS 2026 (Policial Penal), a pedido: gerado em 2026-10-18.
-- 1) Questões 44 e 53 arquivadas (não serão usadas).
-- 2) Questões 45 a 52 conferidas com o texto oficial (Estatuto e Instruções Normativas no site da Polícia Penal do RS e
--    Constituição do RS no site da Assembleia Legislativa) e liberadas; exige a migração 20261018000000_question_currency.sql
--    aplicada antes (inclui rs.gov.br como fonte oficial aceita).
-- 3) Questão 30 liberada e destacada como tendência de Informática (inteligência artificial generativa).
-- Aplicar DEPOIS da migração 20261018000000_question_currency.sql.
begin;

update public.official_exam_questions
set content_status = 'archived',
    review_note = 'Arquivada a pedido da administração em 2026-10-18; não usar em treino. ' || coalesce(review_note, '')
where contest_name = 'Polícia Penal do Estado do Rio Grande do Sul' and career_name = 'Policial Penal' and exam_year = 2026 and item_number in (44, 53);

update public.official_exam_questions
set legal_basis = '[{"title": "LC (RS) 16.449/2025, art. 32, caput e §§ 3º a 5º", "url": "https://policiapenal.rs.gov.br/upload/arquivos/202605/15102554-01-estatuto-da-policia-penal.pdf", "checked_at": "2026-10-18"}]'::jsonb, law_version_checked_at = now(), legal_audit_completed = true,
    content_status = 'active', review_note = 'Auditado em 2026-10-18 contra LC (RS) 16.449/2025, art. 32, caput e §§ 3º a 5º; chave confere com o gabarito definitivo. O curso de formação é organizado e ministrado exclusivamente pela Academia da Polícia Penal (caput); aprovação exige 70% em cada disciplina (§ 3º); a reprovação leva à exoneração (§ 5º), e não há segunda oportunidade prevista: só I e II estão corretas.'
where contest_name = 'Polícia Penal do Estado do Rio Grande do Sul' and career_name = 'Policial Penal' and exam_year = 2026 and item_number = 45;

update public.official_exam_questions
set legal_basis = '[{"title": "LC (RS) 16.449/2025, arts. 40 e 45 e art. 5º", "url": "https://policiapenal.rs.gov.br/upload/arquivos/202605/15102554-01-estatuto-da-policia-penal.pdf", "checked_at": "2026-10-18"}]'::jsonb, law_version_checked_at = now(), legal_audit_completed = true,
    content_status = 'active', review_note = 'Auditado em 2026-10-18 contra LC (RS) 16.449/2025, arts. 40 e 45 e art. 5º; chave confere com o gabarito definitivo. As carreiras têm cargos efetivos estruturados em cinco classes; as promoções ordinárias passam à classe imediatamente superior, por merecimento e antiguidade, alternadamente (art. 40); não pode ser promovido quem sofreu punição disciplinar nos últimos doze meses (art. 45, III): as três assertivas estão corretas.'
where contest_name = 'Polícia Penal do Estado do Rio Grande do Sul' and career_name = 'Policial Penal' and exam_year = 2026 and item_number = 46;

update public.official_exam_questions
set legal_basis = '[{"title": "IN 014/2023 GAB/SUP, arts. 4º, III, 5º, II, e 6º, III", "url": "https://policiapenal.rs.gov.br/upload/arquivos/202605/15102600-03-in-visitas-e-materiais.pdf", "checked_at": "2026-10-18"}]'::jsonb, law_version_checked_at = now(), legal_audit_completed = true,
    content_status = 'active', review_note = 'Auditado em 2026-10-18 contra IN 014/2023 GAB/SUP, arts. 4º, III, 5º, II, e 6º, III; chave confere com o gabarito definitivo. A DPR aprecia o credenciamento de organização religiosa (art. 4º, III); a Direção designa o supervisor da sala de revista (art. 5º, II); o supervisor proíbe o ingresso ou a permanência de visitante que descumprir os protocolos (art. 6º, III): todas as partes estão corretas.'
where contest_name = 'Polícia Penal do Estado do Rio Grande do Sul' and career_name = 'Policial Penal' and exam_year = 2026 and item_number = 47;

update public.official_exam_questions
set legal_basis = '[{"title": "IN 014/2023 GAB/SUP, arts. 2º (VII e XII), 34, II, e 55", "url": "https://policiapenal.rs.gov.br/upload/arquivos/202605/15102600-03-in-visitas-e-materiais.pdf", "checked_at": "2026-10-18"}]'::jsonb, law_version_checked_at = now(), legal_audit_completed = true,
    content_status = 'active', review_note = 'Auditado em 2026-10-18 contra IN 014/2023 GAB/SUP, arts. 2º (VII e XII), 34, II, e 55; chave confere com o gabarito definitivo. A revista íntima é vedada (art. 2º, VII, e art. 34, II); a visita conjugal com menor de 18 anos é vedada, salvo casamento ou união estável formalizados entre 16 e 18 anos (art. 55); a visita inicial é permitida sem Carteira de Visitante (art. 2º, XII): só I e II estão corretas.'
where contest_name = 'Polícia Penal do Estado do Rio Grande do Sul' and career_name = 'Policial Penal' and exam_year = 2026 and item_number = 48;

update public.official_exam_questions
set legal_basis = '[{"title": "IN 001/2025 GAB/SUP, art. 3º, III", "url": "https://policiapenal.rs.gov.br/upload/arquivos/202605/15102614-06-in-televisitas.pdf", "checked_at": "2026-10-18"}]'::jsonb, law_version_checked_at = now(), legal_audit_completed = true,
    content_status = 'active', review_note = 'Auditado em 2026-10-18 contra IN 001/2025 GAB/SUP, art. 3º, III; chave confere com o gabarito definitivo. A televisita pode ser solicitada por gestante a partir do sétimo mês e após o nascimento, até 6 meses de idade da criança.'
where contest_name = 'Polícia Penal do Estado do Rio Grande do Sul' and career_name = 'Policial Penal' and exam_year = 2026 and item_number = 49;

update public.official_exam_questions
set legal_basis = '[{"title": "IN 001/2025 GAB/SUP, arts. 5º e 6º", "url": "https://policiapenal.rs.gov.br/upload/arquivos/202605/15102614-06-in-televisitas.pdf", "checked_at": "2026-10-18"}]'::jsonb, law_version_checked_at = now(), legal_audit_completed = true,
    content_status = 'active', review_note = 'Auditado em 2026-10-18 contra IN 001/2025 GAB/SUP, arts. 5º e 6º; chave confere com o gabarito definitivo. A televisita ocorre sempre na presença de servidor penitenciário e na sala de videoconferência ou por telefone em viva-voz (art. 5º); é mensal, com duração máxima de 10 minutos (art. 6º): só a 1ª e a 2ª partes estão corretas.'
where contest_name = 'Polícia Penal do Estado do Rio Grande do Sul' and career_name = 'Policial Penal' and exam_year = 2026 and item_number = 50;

update public.official_exam_questions
set legal_basis = '[{"title": "Constituição do RS, arts. 137, caput e I, e 139", "url": "https://www2.al.rs.gov.br/dal/LinkClick.aspx?fileticket=WQdIfqNoXO4%3D&tabid=3683&mid=5359", "checked_at": "2026-10-18"}]'::jsonb, law_version_checked_at = now(), legal_audit_completed = true,
    content_status = 'active', review_note = 'Auditado em 2026-10-18 contra Constituição do RS, arts. 137, caput e I, e 139; chave confere com o gabarito definitivo. A política penitenciária visa à reintegração social das pessoas presas e prioriza a regionalização dos estabelecimentos penais (art. 137); todo estabelecimento prisional feminino terá creche anexa e independente para menores de até seis anos (art. 139).'
where contest_name = 'Polícia Penal do Estado do Rio Grande do Sul' and career_name = 'Policial Penal' and exam_year = 2026 and item_number = 51;

update public.official_exam_questions
set legal_basis = '[{"title": "Constituição do RS, arts. 124 a 128", "url": "https://www2.al.rs.gov.br/dal/LinkClick.aspx?fileticket=WQdIfqNoXO4%3D&tabid=3683&mid=5359", "checked_at": "2026-10-18"}]'::jsonb, law_version_checked_at = now(), legal_audit_completed = true,
    content_status = 'active', review_note = 'Auditado em 2026-10-18 contra Constituição do RS, arts. 124 a 128; chave confere com o gabarito definitivo. Os Conselhos de Defesa e Segurança da Comunidade são o meio de participação da sociedade (art. 126); os Municípios poderão constituir guardas municipais (art. 128); o Estado só opera serviços de informações sobre o que a lei define como delinquência (art. 125, parágrafo único); a segurança pública é exercida por mais órgãos do que os citados (art. 124): só a assertiva I está correta.'
where contest_name = 'Polícia Penal do Estado do Rio Grande do Sul' and career_name = 'Policial Penal' and exam_year = 2026 and item_number = 52;

update public.official_exam_questions
set content_status = 'active', review_note = 'Importada do caderno oficial e conferida com o gabarito definitivo (chave A). A alternativa A descreve a inteligência artificial preditiva (prever estado futuro para apoiar decisão), e não uma característica fundamental da IA generativa, que cria conteúdo por prompt em linguagem natural, aprende padrões em grandes volumes de dados e responde de forma probabilística. O documento citado (Guia de IA Generativa do Governo Federal, 2026) não foi localizado para conferência literal; a chave foi validada pelo conceito. Tema em alta em provas de Informática.'
where contest_name = 'Polícia Penal do Estado do Rio Grande do Sul' and career_name = 'Policial Penal' and exam_year = 2026 and item_number = 30;

insert into public.question_currency (question_table, question_id, tags, note, source, exam_year)
select 'official_exam_questions', id, array['IA e tecnologia', 'Prova recente'],
       'Inteligência artificial generativa (ChatGPT, Gemini, Copilot) é conteúdo novo e crescente em provas de Informática; cobrado na PP-RS 2026.',
       'manual', 2026
from public.official_exam_questions
where contest_name = 'Polícia Penal do Estado do Rio Grande do Sul' and career_name = 'Policial Penal' and exam_year = 2026 and item_number = 30
on conflict (question_table, question_id) do update
  set tags = excluded.tags, note = excluded.note, source = 'manual', exam_year = excluded.exam_year, updated_at = now();

commit;
