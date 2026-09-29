-- Curated (authored) questions, Direito lote 22: mais Direitos Humanos e
-- Legislação Especial. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '89f9d268-5925-40fd-b80e-30dc41723d21', 'auth-dh-017',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Vedação ao trabalho escravo',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de redução a condição análoga à de escravo, previsto no art. 149 do Código Penal, caracteriza-se não apenas pela restrição física da liberdade de locomoção, mas também por submeter a vítima a trabalhos forçados, jornada exaustiva ou condições degradantes de trabalho, ou restringir sua locomoção por dívida contraída em razão do trabalho.$q$,
  'C',
  $q$Certo. O art. 149, caput, do Código Penal define o crime de forma ampla, incluindo entre as condutas que caracterizam a redução a condição análoga à de escravo: submeter a vítima a trabalhos forçados ou jornada exaustiva; sujeitá-la a condições degradantes de trabalho; e restringir, por qualquer meio, sua locomoção em razão de dívida contraída com o empregador ou preposto (o chamado "sistema de dívidas" ou "servidão por dívida"). A jurisprudência brasileira, refletida na própria redação legal, reconhece que a escravidão contemporânea não exige necessariamente correntes ou celas — pode se manifestar por meio de mecanismos econômicos e sociais de sujeição da vítima, como dívidas artificialmente criadas para impedir sua saída do local de trabalho.
Exemplo: um trabalhador que é levado a um local isolado, submetido a jornadas extenuantes sem condições básicas de higiene e alimentação, e que se vê "endividado" com o empregador de forma a nunca conseguir sair daquela situação, pode configurar vítima do crime do art. 149, mesmo sem estar fisicamente acorrentado — a degradação das condições de trabalho e a restrição indireta de locomoção via dívida já preenchem o tipo penal.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-018',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Convenção sobre os Direitos das Pessoas com Deficiência',
  $q$Julgue o item a seguir.
A Convenção sobre os Direitos das Pessoas com Deficiência, incorporada ao ordenamento jurídico brasileiro com status de emenda constitucional, adota o modelo social de deficiência, segundo o qual a deficiência resulta da interação entre a limitação da pessoa e as barreiras existentes na sociedade, e não apenas de uma condição médica individual.$q$,
  'C',
  $q$Certo. A Convenção sobre os Direitos das Pessoas com Deficiência (Convenção de Nova York, 2007) foi o primeiro tratado internacional de direitos humanos aprovado pelo Congresso Nacional brasileiro segundo o procedimento especial previsto no art. 5º, § 3º, da Constituição Federal, o que lhe conferiu status de emenda constitucional. A Convenção adota o modelo social de deficiência, superando o antigo modelo estritamente médico: a deficiência não é vista apenas como uma limitação individual da pessoa, mas como resultado da interação entre essa limitação e barreiras (físicas, atitudinais, institucionais) impostas pela própria sociedade, que impedem a plena e efetiva participação da pessoa em igualdade de condições com as demais.
Exemplo: sob essa perspectiva, um prédio sem rampa de acesso não é apenas "azar" de quem usa cadeira de rodas — é a própria falta de acessibilidade do ambiente que produz a barreira e a exclusão, reforçando que a responsabilidade por incluir está tanto na sociedade e no Estado quanto associada apenas à condição individual da pessoa com deficiência.$q$,
  jsonb_build_array(jsonb_build_object('title','Convenção sobre os Direitos das Pessoas com Deficiência (ONU, 2007) – Decreto nº 6.949/2009','url','https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/decreto/d6949.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'afaf633e-5b3a-4ed9-96ae-a1a9a352c339', 'auth-dh-019',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Lei Brasileira de Inclusão',
  $q$Julgue o item a seguir, com base na Lei nº 13.146/2015.
A Lei Brasileira de Inclusão da Pessoa com Deficiência (Estatuto da Pessoa com Deficiência) estabelece que a deficiência não afeta a plena capacidade civil da pessoa, presumindo-se sua capacidade civil, e que o instituto da curatela, quando necessário, deve ser aplicado de forma proporcional às necessidades e circunstâncias de cada caso, e não de forma genérica e ampla.$q$,
  'C',
  $q$Certo. A Lei nº 13.146/2015, ao alterar significativamente o Código Civil, estabeleceu que a deficiência não afeta, por si só, a plena capacidade civil da pessoa para exercer atos da vida civil, superando o antigo regime que, em muitos casos, presumia automaticamente a incapacidade civil de pessoas com deficiência. Quando a curatela for excepcionalmente necessária, a lei determina que ela seja proporcional às necessidades e circunstâncias específicas de cada pessoa, e deve durar o menor tempo possível, restrita aos atos de natureza patrimonial e negocial — reforçando a ideia de que a curatela é uma medida excepcional e específica, não uma restrição genérica e ampla da capacidade civil da pessoa como um todo.
Exemplo: uma pessoa com deficiência intelectual pode ter uma curatela limitada apenas a determinados atos patrimoniais específicos (como administrar grandes investimentos), mantendo plena autonomia para outros aspectos de sua vida civil, como casar, votar ou decidir sobre seu próprio corpo — a curatela, sob a nova lógica da lei, não é mais um "apagamento total" da capacidade civil da pessoa.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 13.146/2015 – Lei Brasileira de Inclusão da Pessoa com Deficiência','url','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'cbe51652-703c-468d-a370-58100d8ef40c', 'auth-leg-020',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei do Estatuto do Idoso',
  $q$Julgue o item a seguir, com base na Lei nº 10.741/2003.
O Estatuto do Idoso considera idosa, para os efeitos da lei, a pessoa com idade igual ou superior a 60 anos, assegurando-lhe, entre outros direitos, prioridade na tramitação de processos e procedimentos judiciais e administrativos em que figure como parte ou interessado.$q$,
  'C',
  $q$Certo. O art. 1º da Lei nº 10.741/2003 estabelece que o Estatuto do Idoso destina-se a regular os direitos assegurados às pessoas com idade igual ou superior a 60 (sessenta) anos. Entre os direitos previstos, o art. 71, caput, assegura prioridade na tramitação de processos e procedimentos judiciais e administrativos em que a pessoa idosa figure como parte ou interessada, garantindo celeridade em razão da própria natureza e das necessidades específicas dessa fase da vida. Essa prioridade se soma a outras garantias previstas na lei, como atendimento preferencial em serviços públicos e privados, e diversas políticas voltadas à proteção da dignidade e do bem-estar da pessoa idosa.
Exemplo: um processo judicial em que uma pessoa de 65 anos figure como parte deve, em regra, tramitar com prioridade em relação a outros processos sem partes idosas, refletindo o reconhecimento legal de que o tempo processual tem um peso especial para essa faixa etária.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 10.741/2003 – Estatuto do Idoso','url','https://www.planalto.gov.br/ccivil_03/leis/2003/l10.741.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-021',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Prisão Temporária',
  $q$Julgue o item a seguir, com base na Lei nº 7.960/1989.
A prisão temporária caberá, entre outras hipóteses, quando imprescindível para as investigações do inquérito policial, ou quando houver fundadas razões de autoria ou participação do investigado nos crimes especificados em lei, tendo prazo de duração determinado, prorrogável uma única vez em caso de extrema e comprovada necessidade.$q$,
  'C',
  $q$Certo. A Lei nº 7.960/1989 disciplina a prisão temporária, modalidade de prisão cautelar destinada exclusivamente à fase de investigação policial (não se aplica durante a ação penal já em curso). O art. 1º da lei estabelece as hipóteses de cabimento, incluindo a imprescindibilidade para as investigações do inquérito policial e a existência de fundadas razões de autoria ou participação do indiciado em determinados crimes especificamente listados na lei. O art. 2º, caput, estabelece o prazo de duração de 5 dias (prorrogável por igual período em caso de extrema e comprovada necessidade), sendo esse prazo diferente (mais longo) para crimes hediondos e equiparados, conforme legislação específica.
Exemplo: durante uma investigação de um crime grave especificamente previsto na lei, se as autoridades entenderem que a presença do suspeito solto pode comprometer as diligências investigativas em curso (por exemplo, risco de destruição de provas), pode ser requerida judicialmente a prisão temporária, por prazo determinado e limitado, diferente da prisão preventiva, que pode se estender por prazo indeterminado enquanto durarem os motivos que a justificam.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 7.960/1989 – Lei da Prisão Temporária','url','https://www.planalto.gov.br/ccivil_03/leis/l7960.htm')),
  'difícil', now()
);
