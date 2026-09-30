-- Curated (authored) questions, Direito lote 63: mais Direitos Humanos e
-- Legislação Especial. Same approach as prior lotes: original content
-- written from scratch, no reproduction of any third-party text.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-038',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Direito à liberdade religiosa',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
É inviolável a liberdade de consciência e de crença, sendo assegurado o livre exercício dos cultos religiosos e garantida, na forma da lei, a proteção aos locais de culto e a suas liturgias, o que não impede o Estado de regular aspectos que envolvam segurança, ordem pública ou outros direitos fundamentais de terceiros.$q$,
  'C',
  $q$Certo. O art. 5º, inciso VI, da CF/1988 assegura que "é inviolável a liberdade de consciência e de crença, sendo assegurado o livre exercício dos cultos religiosos e garantida, na forma da lei, a proteção aos locais de culto e a suas liturgias". Essa proteção constitucional à liberdade religiosa é ampla, mas, como todo direito fundamental, não é absoluta: o Estado pode regular aspectos correlatos, como segurança de edificações usadas para cultos, ou intervir em situações excepcionais que envolvam outros direitos fundamentais em conflito (como saúde pública, em contextos de emergência sanitária), desde que essa regulação seja proporcional e não configure, na prática, uma vedação arbitrária ao exercício religioso em si.
Exemplo: exigir que um templo religioso cumpra normas básicas de segurança contra incêndio, como qualquer outra edificação de uso coletivo, não viola a liberdade religiosa — a exigência recai sobre um aspecto de segurança geral, e não sobre o conteúdo ou a prática do culto em si.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '9dfc55b7-7ad4-4b76-9b5f-ea1a7a421254', 'auth-leg-034',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Intolerância Religiosa',
  $q$Julgue o item a seguir, com base na Lei nº 7.716/1989.
A Lei nº 7.716/1989, embora originalmente voltada a crimes resultantes de discriminação de raça ou cor, também prevê, em razão de alterações legislativas posteriores, a punição de condutas de discriminação ou preconceito de religião, ampliando o alcance da norma para além do critério estritamente racial previsto em sua redação original.$q$,
  'C',
  $q$Certo. A Lei nº 7.716/1989 foi originalmente concebida para regular crimes resultantes de discriminação ou preconceito de raça ou cor, mas alterações legislativas posteriores ampliaram seu alcance para abranger também discriminação ou preconceito de etnia, religião ou procedência nacional, reconhecendo que a intolerância pode se manifestar sob diferentes formas de discriminação estrutural, não apenas racial. Essa ampliação legislativa buscou dar tratamento penal mais robusto a fenômenos como a intolerância religiosa, que passou a ser objeto de crescente atenção pública e institucional no Brasil, especialmente diante de casos de perseguição a praticantes de religiões de matriz africana.
Exemplo: atos de discriminação e violência dirigidos especificamente contra praticantes de determinada religião, motivados pela intolerância religiosa em si, podem se enquadrar nas disposições penais da Lei nº 7.716/1989, na sua redação atual, e não apenas condutas estritamente motivadas por discriminação racial ou de cor, como na concepção original da lei.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 7.716/1989 – Lei do Racismo','url','https://www.planalto.gov.br/ccivil_03/leis/l7716.htm')),
  'média', now()
);
