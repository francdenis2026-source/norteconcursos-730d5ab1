-- Auditoria PRF 2019 (career_name='Policial Rodoviário Federal') — lote 3
-- (13 itens autossuficientes de Direito de Trânsito e Direito
-- Administrativo). Itens 1,4-9,12,13,15 (Português) e 29,30,32,34,41-48
-- (Informática/Ética/Atualidades) já foram auditados em lotes anteriores
-- desta mesma sessão (migrations 20260929135000/20260929145000). Itens
-- 51-59 dependem de um cenário nomeado (Godofredo, Antônio, Luciano,
-- Felipe, Lucas, Sávio, Severino, Alfredo, Alessandro, Sandro, Wellington)
-- cujo texto-base não foi capturado na importação. Itens 73-87 dependem de
-- parâmetros técnicos de resoluções específicas do Contran (percentuais de
-- transmitância, distâncias entre radares, dimensões de transporte de
-- carga/bicicleta) que não consigo verificar com segurança nesta rodada.
-- Itens 61,62,71,72,76,83,91 já estão anulados.

update public.official_exam_questions
set review_note=$q$Correto. O condutor flagrado com CNH vencida há mais de trinta dias está sujeito a multa, recolhimento do documento de habilitação e remoção do veículo, pois a infração de dirigir com CNH vencida há mais de 30 dias é equiparada a dirigir sem habilitação.
Fonte oficial: art. 162, V c/c art. 165, CTB (Lei 9.503/1997), planalto.gov.br.$q$
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=60;

update public.official_exam_questions
set review_note=$q$Correto. Estacionar sem observar a distância máxima permitida de afastamento da guia da calçada é infração sujeita a multa, com remoção do veículo como medida administrativa associada.
Fonte oficial: art. 181, CTB (Lei 9.503/1997), planalto.gov.br.$q$
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=63;

update public.official_exam_questions
set review_note=$q$Correto. Conduzir veículo emitindo fumaça acima dos níveis legalmente permitidos pode configurar tanto infração administrativa de trânsito quanto, a depender da gravidade/intensidade, o crime ambiental de poluição previsto na legislação ambiental — as duas esferas de responsabilização não são mutuamente excludentes.
Fonte oficial: CTB (Lei 9.503/1997); Lei 9.605/1998 (crimes ambientais), planalto.gov.br.$q$
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=64;

update public.official_exam_questions
set review_note=$q$Errado. A informação sobre a pontuação de infrações de um motorista profissional vinculado a uma concessionária de serviço público de transporte, quando necessária para a gestão da atividade laboral e da segurança do serviço prestado, não depende de autorização individual do empregado para ser conhecida pelo empregador/órgão fiscalizador — não se trata de informação estritamente personalíssima nesse contexto profissional regulado.
Fonte oficial: CTB (Lei 9.503/1997), disposições sobre condutores profissionais.$q$
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=65;

update public.official_exam_questions
set review_note=$q$Errado. A multa por infração de trânsito cometida no Brasil por veículo licenciado no exterior deve ser paga no Brasil, conforme as normas do CTB aplicáveis — não há determinação de pagamento "no país de origem do licenciamento do automóvel".
Fonte oficial: CTB (Lei 9.503/1997), disposições sobre fiscalização de veículos estrangeiros em território nacional.$q$
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=66;

update public.official_exam_questions
set review_note=$q$Correto. Em rodovias de pista dupla de zonas rurais sem sinalização regulamentadora específica, aplica-se o mesmo limite máximo de velocidade a automóveis, camionetas e motocicletas.
Fonte oficial: art. 61, CTB (Lei 9.503/1997), planalto.gov.br.$q$
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=67;

update public.official_exam_questions
set review_note=$q$Correto. A ordem de prevalência da sinalização de trânsito, do CTB, é: primeiro as ordens do agente de trânsito, depois as indicações do semáforo, depois os demais sinais (placas, marcas viárias), e por último as demais normas gerais de circulação.
Fonte oficial: art. 89, CTB (Lei 9.503/1997), planalto.gov.br.$q$
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=68;

update public.official_exam_questions
set review_note=$q$Correto. A Polícia Rodoviária Federal integra o Sistema Nacional de Trânsito (SNT) e, no âmbito das rodovias e estradas federais, compete-lhe implementar as medidas da Política Nacional de Trânsito (e de Educação para o Trânsito).
Fonte oficial: art. 7º c/c art. 20, CTB (Lei 9.503/1997), planalto.gov.br.$q$
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=69;

update public.official_exam_questions
set review_note=$q$Errado. O CONTRAN é o órgão máximo NORMATIVO (não executivo) do Sistema Nacional de Trânsito; a coordenação máxima do SNT, por sua vez, cabe ao órgão máximo executivo de trânsito da União (atualmente SENATRAN, sucessora do DENATRAN) — o item inverte as funções normativa e executiva entre os dois órgãos.
Fonte oficial: art. 7º c/c art. 12, CTB (Lei 9.503/1997), planalto.gov.br.$q$
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=70;

update public.official_exam_questions
set review_note=$q$Correto. Quando o próprio proprietário do veículo é o condutor autuado e assina o auto de infração (que já especifica o prazo para apresentação de defesa), a ciência da autuação já ocorre no próprio ato, dispensando a PRF de expedir notificação posterior da autuação a esse mesmo proprietário.
Fonte oficial: art. 280, §4º, CTB (Lei 9.503/1997), planalto.gov.br.$q$
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=88;

update public.official_exam_questions
set review_note=$q$Errado. As receitas arrecadadas com multas de trânsito aplicadas pela PRF devem ser aplicadas EXCLUSIVAMENTE em sinalização, engenharia de tráfego, policiamento, fiscalização e educação de trânsito, pelo PRÓPRIO órgão ou entidade de trânsito que as arrecadou — não são repassadas ao DNIT.
Fonte oficial: art. 320, CTB (Lei 9.503/1997), planalto.gov.br.$q$
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=89;

update public.official_exam_questions
set review_note=$q$Errado. A penalidade de suspensão do direito de dirigir não é aplicada diretamente pela PRF no momento da autuação — ela é imposta pelo órgão executivo de trânsito com circunscrição sobre o condutor (em regra o Detran do estado de habilitação), mediante processo administrativo próprio que assegura ampla defesa e contraditório; a PRF apenas lavra o auto de infração e encaminha ao órgão competente.
Fonte oficial: CTB (Lei 9.503/1997), disposições sobre a penalidade de suspensão do direito de dirigir.$q$
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=90;

update public.official_exam_questions
set review_note=$q$Correto. Tanto a inexistência material do fato invocado quanto a sua inadequação/impropriedade jurídica (fato existente, mas que não autoriza legalmente o ato praticado) configuram vício de motivo do ato administrativo, tornando-o inválido.
Fonte oficial: doutrina consolidada de Direito Administrativo (teoria dos motivos determinantes e vícios do ato administrativo).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"doutrina consolidada - teoria dos motivos determinantes e vícios do ato administrativo"}]'::jsonb
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=92;
