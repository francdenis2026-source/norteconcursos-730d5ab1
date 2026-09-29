-- Curated (authored) questions, Direito lote 27: mais Direito Penal e
-- Direito Processual Penal. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-021',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Excesso punível',
  $q$Julgue o item a seguir, com base no Código Penal.
O excesso, doloso ou culposo, nas excludentes de ilicitude como a legítima defesa e o estado de necessidade, é punível, respondendo o agente pelo resultado excedente conforme a modalidade de sua conduta, o que significa que o excesso não afasta totalmente a excludente, mas limita seus efeitos ao que era estritamente necessário.$q$,
  'C',
  $q$Certo. O art. 23, parágrafo único, do Código Penal estabelece que "o agente, em qualquer das hipóteses deste artigo [excludentes de ilicitude], responderá pelo excesso doloso ou culposo". Isso significa que a excludente de ilicitude (como a legítima defesa) só cobre a parte da conduta que era efetivamente necessária e proporcional para repelir a agressão ou o perigo; qualquer atuação além desse limite necessário constitui excesso, e o agente responde por esse excesso, podendo ser doloso (quando ele quis ir além do necessário) ou culposo (quando, por imprudência ou negligência, acabou ultrapassando o limite necessário sem essa intenção específica).
Exemplo: se alguém, em legítima defesa, usa a força estritamente necessária para neutralizar um agressor já desarmado e imobilizado, mas continua agredindo-o desnecessariamente depois disso, essa parte adicional da conduta (o excesso) já não está mais protegida pela legítima defesa, podendo o agente responder criminalmente por esse excedente, conforme sua intenção ou negligência nesse momento posterior.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-022',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a paz pública — associação criminosa',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de associação criminosa, previsto no art. 288 do Código Penal, exige a associação de três ou mais pessoas, para o fim específico de cometer crimes, sendo instituto distinto do concurso eventual de pessoas, que não exige essa estabilidade e permanência associativa voltada à prática reiterada de delitos.$q$,
  'C',
  $q$Certo. O art. 288, caput, do Código Penal tipifica a associação criminosa como "associarem-se 3 (três) ou mais pessoas, para o fim específico de cometer crimes". O elemento central que distingue esse crime do simples concurso eventual de pessoas (em que várias pessoas se reúnem para praticar um crime específico, uma única vez) é justamente a estabilidade e a permanência da associação, com finalidade de praticar uma pluralidade indeterminada de crimes ao longo do tempo — não se trata de uma reunião ocasional e pontual para um único delito, mas de uma estrutura associativa voltada, desde sua formação, à prática reiterada de infrações penais.
Exemplo: três pessoas que se organizam de forma estável e duradoura, especificamente para praticar assaltos de forma reiterada ao longo do tempo, podem configurar associação criminosa; já três pessoas que se juntam uma única vez, sem qualquer estabilidade ou intenção de reiteração, para cometer um único crime específico, tendem a responder apenas pelo concurso eventual de pessoas naquele crime, sem a tipificação autônoma da associação criminosa.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-017',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Prova testemunhal',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
Toda pessoa poderá ser testemunha, ressalvadas as exceções previstas em lei, e as testemunhas não poderão eximir-se da obrigação de depor, salvo as pessoas que, em razão de função, ministério, ofício ou profissão, devam guardar segredo, quanto ao fato sobre o qual devam guardá-lo, e não desejarem prestar o depoimento.$q$,
  'C',
  $q$Certo. O art. 202 do Código de Processo Penal estabelece a regra geral: "toda pessoa poderá ser testemunha". Já o art. 207 prevê exceção específica: "são proibidas de depor as pessoas que, em razão de função, ministério, ofício ou profissão, devam guardar segredo, salvo se, desobrigadas pela parte interessada, quiserem dar o seu testemunho". Essa regra protege relações de confiança profissional que exigem sigilo — como a relação entre advogado e cliente, médico e paciente, padre e confessante — permitindo que essas pessoas se recusem a depor sobre fatos protegidos por esse dever de sigilo, salvo se a própria parte interessada as desobrigar expressamente desse segredo.
Exemplo: um advogado que soube de determinado fato apenas em razão de seu ofício profissional, no exercício da relação de confiança com seu cliente, pode legitimamente se recusar a depor sobre esse fato específico como testemunha, mesmo intimado, salvo se o próprio cliente o desobrigar expressamente desse dever de sigilo profissional.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
);
