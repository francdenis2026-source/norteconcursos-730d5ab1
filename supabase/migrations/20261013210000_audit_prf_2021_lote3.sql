-- Auditoria PRF 2021 — lote 3 (3 itens de Ética no Serviço Público, Direito
-- de Trânsito e Direito Administrativo). Itens 88 (depende de "essa
-- situação", cenário fático não capturado neste import), 94 (gabarito
-- "certo" contraria o STF, Tema 647/RE 638.491 — confisco de bem usado no
-- tráfico independe de habitualidade; mesmo conflito já identificado no
-- item 94 do PRF 2019), 100-110 (dependem de uma situação hipotética sobre
-- veículo com chassi adulterado, não capturada neste import) e 91 (exige
-- confirmação de um número de horas específico de curso de capacitação
-- para promoção que não consegui localizar com segurança) ficam de fora
-- desta rodada. Itens 1, 39, 45, 67, 69, 76, 83, 89, 97, 98 já estão
-- anulados. Os demais itens de Direito de Trânsito (63-65, 70-73, 75, 77-82,
-- 84-85) exigem verificação contra resoluções específicas do CONTRAN que
-- não confirmei individualmente nesta rodada.

update public.official_exam_questions
set review_note=$q$Correto. Pela Súmula Vinculante 14 do STF, o investigado (defensor) tem direito de amplo acesso aos elementos de prova já documentados em procedimento investigatório que digam respeito ao exercício do direito de defesa, incluindo direito a cópia, independentemente de notificação prévia da existência do procedimento.
Fonte oficial: Súmula Vinculante 14, STF.$q$
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=48;

update public.official_exam_questions
set review_note=$q$Errado. Pela Resolução CONTRAN nº 882/2021 (que disciplina pesos e dimensões para veículos de transporte de carga/passageiros), a largura máxima autorizada para circulação de veículos em via pública é de 2,60 m, e não 2,50 m.
Fonte oficial: Resolução CONTRAN nº 882/2021, art. 3º, I, "b".$q$
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=74;

update public.official_exam_questions
set review_note=$q$Correto. Pela Lei 11.095/2005 (que criou a carreira de Policial Rodoviário Federal e fixou a jornada de trabalho dos integrantes do Plano Especial de Cargos do DPRF), a jornada de trabalho é de 40 horas semanais para todos os integrantes da carreira, independentemente da classe — e entre as atribuições do cargo, em qualquer classe, está o patrulhamento e o policiamento ostensivo nas rodovias federais.
Fonte oficial: Lei 11.095/2005, planalto.gov.br.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"Lei 11.095/2005 (jornada de trabalho PRF)","url":"https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2005/lei/l11095.htm"}]'::jsonb
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=92;
