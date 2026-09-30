-- Curated (authored) questions, Direito lote 53: mais Direito Penal e
-- Legislação Especial. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-031',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes praticados por funcionário público — prevaricação',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de prevaricação, previsto no art. 319 do Código Penal, consiste em retardar ou deixar de praticar, indevidamente, ato de ofício, ou praticá-lo contra disposição expressa de lei, para satisfazer interesse ou sentimento pessoal, sendo esse interesse ou sentimento pessoal elemento subjetivo essencial que diferencia esse crime da simples negligência funcional.$q$,
  'C',
  $q$Certo. O art. 319, caput, do Código Penal tipifica a prevaricação como "retardar ou deixar de praticar, indevidamente, ato de ofício, ou praticá-lo contra disposição expressa de lei, para satisfazer interesse ou sentimento pessoal". O elemento subjetivo específico — "para satisfazer interesse ou sentimento pessoal" — é justamente o que diferencia a prevaricação de uma mera negligência ou desídia funcional (que, isoladamente, poderia configurar apenas infração administrativa, sem necessariamente constituir crime): é preciso que o funcionário público tenha agido movido por um interesse próprio (financeiro, afetivo, de vingança, favorecimento a alguém) ao retardar, omitir ou praticar irregularmente o ato de ofício, e não apenas por incompetência, desorganização ou simples erro.
Exemplo: um fiscal que deliberadamente atrasa a análise de um processo para favorecer um conhecido seu, que se beneficiaria desse atraso, pratica prevaricação; já um fiscal que atrasa o mesmo processo por simples acúmulo de trabalho e desorganização, sem qualquer interesse pessoal específico envolvido, tende a responder apenas administrativamente, sem configurar o crime de prevaricação, justamente pela ausência do elemento subjetivo específico exigido pelo tipo penal.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'cbe51652-703c-468d-a370-58100d8ef40c', 'auth-leg-031',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Crimes Cibernéticos (Lei Carolina Dieckmann)',
  $q$Julgue o item a seguir, com base no Código Penal, com as alterações da Lei nº 12.737/2012.
O crime de invasão de dispositivo informático, previsto no art. 154-A do Código Penal, consiste em invadir dispositivo informático alheio, conectado ou não à rede de computadores, mediante violação indevida de mecanismo de segurança, com o fim de obter, adulterar ou destruir dados ou informações sem autorização expressa ou tácita do titular do dispositivo.$q$,
  'C',
  $q$Certo. O art. 154-A, caput, do Código Penal, introduzido pela Lei nº 12.737/2012 (conhecida como "Lei Carolina Dieckmann"), tipifica a invasão de dispositivo informático nesses termos: "invadir dispositivo informático alheio, conectado ou não à rede de computadores, mediante violação indevida de mecanismo de segurança e com o fim de obter, adulterar ou destruir dados ou informações sem autorização expressa ou tácita do titular do dispositivo ou instalar vulnerabilidades para obter vantagem ilícita". Um elemento importante do tipo é a exigência de violação de mecanismo de segurança — a simples entrada em um dispositivo desprotegido, sem qualquer barreira de segurança a ser rompida, não configura necessariamente esse crime específico, o que gerou debates doutrinários sobre os limites exatos de aplicação da norma.
Exemplo: acessar o e-mail de outra pessoa quebrando ou driblando indevidamente sua senha de proteção, com o objetivo de ler mensagens privadas sem autorização, pode configurar o crime de invasão de dispositivo informático, especialmente se houver adulteração ou obtenção indevida de dados protegidos por essa barreira de segurança rompida.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, com alterações da Lei nº 12.737/2012','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
);
