-- Curated (authored) questions, Direito lote 37: mais Direito Penal e
-- Direito Processual Penal. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-025',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra o patrimônio — apropriação indébita',
  $q$Julgue o item a seguir, com base no Código Penal.
A apropriação indébita, prevista no art. 168 do Código Penal, distingue-se do furto porque, na apropriação indébita, o agente já tem a posse ou detenção lícita da coisa, que lhe foi entregue por outrem, e somente depois decide, indevidamente, apropriar-se dela, invertendo o título da posse.$q$,
  'C',
  $q$Certo. O art. 168, caput, do Código Penal tipifica "apropriar-se de coisa alheia móvel, de que tem a posse ou a detenção". O elemento distintivo em relação ao furto (art. 155, em que o agente subtrai a coisa, sem tê-la em sua posse lícita anteriormente) é justamente essa sequência temporal: na apropriação indébita, o agente recebeu licitamente a posse da coisa (por exemplo, por meio de um contrato, um depósito, um empréstimo), e só depois, num segundo momento, decide não devolvê-la e passa a agir como se fosse dono dela — invertendo o título de sua posse, que originalmente era lícita e temporária, para uma posse ilícita e definitiva.
Exemplo: quem recebe um bem emprestado (posse lícita, com a obrigação de devolvê-lo) e, posteriormente, decide vendê-lo como se fosse seu, sem intenção de devolvê-lo ao dono original, pratica apropriação indébita; já quem subtrai um bem sem nunca ter tido acesso lícito a ele, agindo às escondidas desde o início, pratica furto.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-026',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra o patrimônio — estelionato',
  $q$Julgue o item a seguir, com base no Código Penal.
O estelionato, previsto no art. 171 do Código Penal, exige, entre seus elementos, o emprego de artifício, ardil, ou qualquer outro meio fraudulento pelo agente, capaz de induzir ou manter a vítima em erro, obtendo-se, para si ou para outrem, vantagem ilícita em prejuízo alheio.$q$,
  'C',
  $q$Certo. O art. 171, caput, do Código Penal define o estelionato como "obter, para si ou para outrem, vantagem ilícita, em prejuízo alheio, induzindo ou mantendo alguém em erro, mediante artifício, ardil, ou qualquer outro meio fraudulento". A essência desse crime é a fraude usada para enganar a vítima, levando-a a agir de determinada forma (entregar dinheiro, assinar um documento, transferir um bem) por acreditar numa situação falsa criada ou mantida pelo agente. Diferente de crimes contra o patrimônio que envolvem violência ou simples subtração sem consentimento (como roubo ou furto), no estelionato a própria vítima, enganada, entrega ou dispõe de seu bem ou vantagem, acreditando estar agindo corretamente.
Exemplo: alguém que se passa por representante de uma instituição financeira, criando uma história falsa e convincente para induzir a vítima a transferir dinheiro voluntariamente, acreditando estar fazendo um pagamento legítimo, pratica estelionato — a vítima "entrega" o dinheiro por conta própria, mas enganada pela fraude empregada.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-021',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Sentença e coisa julgada',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
Transitada em julgado a sentença absolutória, o réu não poderá mais ser processado pelo mesmo fato, ainda que surjam novas provas de sua culpa, em razão da proteção conferida pela coisa julgada material, sem prejuízo da possibilidade de revisão criminal em favor do condenado, aplicável exclusivamente a sentenças condenatórias.$q$,
  'C',
  $q$Certo. Uma vez transitada em julgado a sentença absolutória (não cabendo mais recurso), forma-se a coisa julgada material, que impede, em regra, novo julgamento do réu pelo mesmo fato, mesmo diante do surgimento posterior de novas provas de culpa — princípio conhecido como vedação ao "bis in idem" (proibição de julgar duas vezes pelo mesmo fato). Essa proteção é assimétrica em relação ao instituto da revisão criminal, prevista nos arts. 621 e seguintes do CPP: esse instrumento processual serve exclusivamente para beneficiar o condenado, permitindo rever, a qualquer tempo (mesmo após o trânsito em julgado), uma sentença CONDENATÓRIA em seu favor (por exemplo, diante de novas provas de inocência); não existe, no sistema brasileiro, instrumento equivalente para rever uma absolvição já transitada em julgado em desfavor do absolvido, ainda que provas posteriores sugiram sua culpa.
Exemplo: se uma pessoa é definitivamente absolvida de um crime, e anos depois surgem provas que apontam fortemente para sua culpa, ela não pode, em regra, ser processada novamente pelo mesmo fato — a coisa julgada absolutória protege definitivamente o réu, diferente do que ocorreria se ele tivesse sido condenado e, posteriormente, surgissem provas de sua inocência, hipótese em que a revisão criminal poderia ser utilizada em seu favor.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
);
