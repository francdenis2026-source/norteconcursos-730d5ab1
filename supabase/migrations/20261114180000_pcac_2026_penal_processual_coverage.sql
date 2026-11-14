-- Revisão específica dos módulos de Processo Penal cobrados no Anexo III do PC-AC 2026.
insert into public.study_materials
(slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,syllabus_topic_order,source_note,legal_basis,law_version_checked_at,legal_review,content_status,flashcards,quiz)
select slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,syllabus_topic_order,source_note,legal_basis,law_version_checked_at,legal_review,content_status,flashcards,quiz
from jsonb_to_recordset($penal_seed$
[
  {
    "quiz": [
      {
        "a": false,
        "q": "A autoridade policial pode arquivar o inquérito.",
        "why": "O art. 17 do CPP proíbe."
      },
      {
        "a": true,
        "q": "O prazo geral do art. 10 é de 10 dias preso e 30 dias solto.",
        "why": "Regra geral, ressalvadas leis especiais."
      },
      {
        "a": false,
        "q": "O inquérito é condição indispensável para toda denúncia.",
        "why": "É dispensável se houver elementos suficientes."
      },
      {
        "a": false,
        "q": "A reprodução simulada pode contrariar a ordem pública.",
        "why": "O art. 7º estabelece essa limitação."
      },
      {
        "a": true,
        "q": "O MP pode requisitar diligências imprescindíveis à denúncia.",
        "why": "Previsão do art. 16."
      },
      {
        "a": false,
        "q": "O sigilo elimina qualquer acesso da defesa.",
        "why": "O sigilo respeita os direitos de acesso legal."
      },
      {
        "a": true,
        "q": "O inquérito é procedimento administrativo e informativo.",
        "why": "Não é processo judicial."
      },
      {
        "a": false,
        "q": "A representação é exigida em todos os crimes de ação pública.",
        "why": "Somente quando a lei a exigir."
      }
    ],
    "slug": "pcac-2026-processo-penal-07-inquerito-policial",
    "title": "Inquérito policial: natureza, finalidade e características",
    "body_md": "# Inquérito policial — CPP, arts. 4º a 23\n\n## 1. Conceito e instauração\nProcedimento administrativo e informativo conduzido pela autoridade policial para apurar circunstâncias, materialidade e autoria. O art. 4º atribui à polícia judiciária a apuração, ressalvadas competências de outras autoridades. O art. 5º prevê instauração de ofício nos crimes de ação pública incondicionada, por requisição, requerimento do ofendido e representação quando exigida.\n\n## 2. Diligências — arts. 6º a 8º\nPreservar local, apreender objetos relacionados, colher provas, ouvir ofendido e investigado, realizar reconhecimentos/acareações, determinar perícias e identificar o indiciado. O art. 7º admite reprodução simulada, desde que não contrarie a moralidade ou a ordem pública.\n\n## 3. Forma e prazo — arts. 9º a 12\nO inquérito é escrito. Como regra geral, art. 10: 10 dias se o indiciado estiver preso e 30 dias se estiver solto, ressalvadas leis especiais. O relatório final descreve o que foi apurado; instrumentos e objetos acompanham os autos conforme a lei. O inquérito acompanha denúncia ou queixa quando lhe servir de base.\n\n## 4. Atribuições — arts. 13 a 16\nA autoridade fornece informações necessárias e cumpre requisições legais. Ofendido e indiciado podem requerer diligências, sujeitas à avaliação da autoridade. O MP pode requisitar diligências imprescindíveis à denúncia. Arts. 13-A e 13-B tratam de requisições de dados e meios técnicos em hipóteses legais específicas, não de acesso irrestrito.\n\n## 5. Arquivamento, sigilo e relatório — arts. 17 a 23\nArt. 17: autoridade policial não arquiva. Art. 18: após arquivamento, novas pesquisas podem ocorrer diante de notícia de outras provas. Art. 19: disciplina os crimes de ação privada. Art. 20: sigilo quando necessário à elucidação ou ao interesse social, respeitados os direitos de acesso. Art. 21: a previsão histórica de incomunicabilidade não autoriza isolamento arbitrário, diante das garantias constitucionais. Arts. 22 e 23 tratam de organização territorial e remessa/relatório.\n\n## 6. Características e pegadinhas\nÉ escrito, oficial, informativo, dispensável e sigiloso quando necessário. Não há contraditório pleno como no processo, mas os direitos fundamentais devem ser respeitados. Não confunda prazo geral com prazos de leis especiais; a autoridade não arquiva; inquérito não é condição indispensável para toda ação penal.",
    "summary": "Aula ampliada com correspondência aos artigos e leis expressamente cobrados no Anexo III do PC-AC 2026.",
    "discipline": "Noções de Direito Penal e Processual Penal",
    "flashcards": [
      {
        "b": "Apurar circunstâncias, materialidade e autoria, reunindo elementos informativos.",
        "f": "Qual a finalidade do inquérito policial?"
      },
      {
        "b": "10 dias preso e 30 dias solto, ressalvadas leis especiais.",
        "f": "Qual o prazo geral do art. 10 do CPP?"
      },
      {
        "b": "Não. O art. 17 veda o arquivamento pela autoridade policial.",
        "f": "A autoridade policial pode arquivar o inquérito?"
      },
      {
        "b": "Novas pesquisas podem ocorrer se houver notícia de outras provas após o arquivamento.",
        "f": "O que prevê o art. 18 do CPP?"
      },
      {
        "b": "O MP pode requisitar diligências imprescindíveis ao oferecimento da denúncia.",
        "f": "Qual a regra do art. 16?"
      },
      {
        "b": "Não. É dispensável se já houver elementos suficientes.",
        "f": "O inquérito é indispensável à ação penal?"
      },
      {
        "b": "Reprodução simulada dos fatos, sem contrariar moralidade ou ordem pública.",
        "f": "O que permite o art. 7º?"
      },
      {
        "b": "Não. Devem ser respeitados os direitos de acesso legalmente assegurados.",
        "f": "O sigilo elimina o acesso da defesa a elementos já documentados?"
      }
    ],
    "sort_order": 7,
    "legal_basis": [],
    "source_note": "Edital PC-AC 2026, Anexo III, p. 48; Código de Processo Penal (texto atualizado até 2026); Lei nº 12.037/2009; Lei nº 7.960/1989.",
    "topic_label": "11. Inquérito policial",
    "contest_name": "PC-AC 2026",
    "legal_review": null,
    "content_status": "active",
    "syllabus_topic_order": 1,
    "law_version_checked_at": "2026-11-14T23:45:00+00:00"
  },
  {
    "quiz": [
      {
        "a": false,
        "q": "O juiz pode condenar só com elementos informativos do inquérito.",
        "why": "Art. 155 exige prova judicial, ressalvadas exceções."
      },
      {
        "a": true,
        "q": "Provas ilícitas são inadmissíveis e o art. 157 trata das derivadas.",
        "why": "É o conteúdo do art. 157."
      },
      {
        "a": false,
        "q": "Confissão substitui exame de corpo de delito quando há vestígios.",
        "why": "Art. 158 impede a substituição."
      },
      {
        "a": true,
        "q": "Se vestígios desaparecerem, prova testemunhal pode suprir a falta do exame.",
        "why": "Hipótese do art. 167."
      },
      {
        "a": true,
        "q": "Cadeia de custódia vai do reconhecimento ao descarte.",
        "why": "É o período definido no art. 158-A."
      },
      {
        "a": true,
        "q": "Na falta de perito oficial, a regra é duas pessoas com formação superior e habilitação técnica.",
        "why": "Art. 159, § 1º."
      },
      {
        "a": false,
        "q": "O juiz é obrigado a seguir integralmente o laudo.",
        "why": "Art. 182 permite rejeição total ou parcial."
      },
      {
        "a": true,
        "q": "O art. 281 estende aos intérpretes disposições relativas aos peritos.",
        "why": "É a regra expressa do art. 281."
      }
    ],
    "slug": "pcac-2026-processo-penal-08-provas-cadeia-custodia-peritos",
    "title": "Provas, exame de corpo de delito e cadeia de custódia",
    "body_md": "# Provas, corpo de delito, cadeia de custódia e perícias — CPP, arts. 155 a 184 e 275 a 281\n\n## 1. Disposições gerais — arts. 155 a 157\nArt. 155: convicção judicial baseada na prova produzida em contraditório; não se condena exclusivamente por elementos informativos da investigação, ressalvadas provas cautelares, não repetíveis e antecipadas. Art. 156: disciplina ônus da prova e produção antecipada/diligências, observado o sistema acusatório do art. 3º-A. Art. 157: provas ilícitas são inadmissíveis; provas derivadas também, salvo ausência de nexo causal ou fonte independente, conforme a lei.\n\n## 2. Corpo de delito — arts. 158 a 184\nQuando a infração deixar vestígios, o exame de corpo de delito direto ou indireto é indispensável e não pode ser substituído pela confissão (art. 158). Se os vestígios desaparecerem, a prova testemunhal pode suprir a falta do exame (art. 167). O CPP disciplina exame complementar, autópsia, exumação, laboratório, local de crime, avaliação, documentos, instrumentos e demais perícias.\n\n## 3. Cadeia de custódia — arts. 158-A a 158-F\nÉ o conjunto de procedimentos que documenta a história cronológica do vestígio, rastreando posse e manuseio do reconhecimento ao descarte. O agente público que reconhece vestígio de potencial interesse pericial deve preservá-lo. Etapas do art. 158-B: reconhecimento, isolamento, fixação, coleta, acondicionamento, transporte, recebimento, processamento, armazenamento e descarte. Registre responsáveis, horários, locais, lacres, embalagens e transferências.\n\n## 4. Perícias — arts. 159 a 184\nArt. 159: exame por perito oficial com diploma de curso superior. Na falta, duas pessoas idôneas com diploma superior, preferencialmente na área específica, e habilitação técnica relacionada ao exame. As partes podem formular quesitos e indicar assistentes técnicos nos momentos legais. O laudo descreve minuciosamente o exame e responde quesitos. Art. 182: o juiz não fica vinculado ao laudo e pode aceitá-lo ou rejeitá-lo no todo ou em parte.\n\n## 5. Peritos e intérpretes — arts. 275 a 281\nArt. 275: peritos oficiais sujeitos à disciplina judiciária. Art. 276: partes não intervêm na nomeação. Art. 277: nomeação pela autoridade competente. Arts. 278 a 280: regras de atuação, impedimentos e aplicação de disposições pertinentes aos auxiliares da Justiça/testemunhas. Art. 281: disposições relativas aos peritos aplicam-se aos intérpretes, no que couber.\n\n## 6. Pegadinhas\n- Art. 155: elementos do inquérito não sustentam sozinhos a condenação, ressalvadas exceções.\n- Art. 157: prova ilícita e derivada.\n- Art. 158: vestígios exigem exame; confissão não substitui.\n- Art. 167: vestígios desaparecidos permitem suprimento testemunhal.\n- Cadeia de custódia começa no reconhecimento e termina no descarte.\n- Juiz não está vinculado ao laudo.",
    "summary": "Aula ampliada com correspondência aos artigos e leis expressamente cobrados no Anexo III do PC-AC 2026.",
    "discipline": "Noções de Direito Penal e Processual Penal",
    "flashcards": [
      {
        "b": "Não; art. 155 exige prova judicial, ressalvadas cautelares, não repetíveis e antecipadas.",
        "f": "O juiz pode condenar exclusivamente com elementos informativos do inquérito?"
      },
      {
        "b": "Inadmissibilidade de provas ilícitas e disciplina das derivadas.",
        "f": "O que estabelece o art. 157?"
      },
      {
        "b": "Não. Art. 158 exige exame direto ou indireto.",
        "f": "A confissão substitui exame de corpo de delito com vestígios?"
      },
      {
        "b": "Quando os vestígios desaparecerem, conforme art. 167.",
        "f": "Quando a prova testemunhal pode suprir o exame?"
      },
      {
        "b": "Reconhecimento, isolamento, fixação, coleta, acondicionamento, transporte, recebimento, processamento, armazenamento e descarte.",
        "f": "Quais etapas da cadeia de custódia?"
      },
      {
        "b": "Perito oficial com diploma superior; na falta, duas pessoas idôneas qualificadas.",
        "f": "Quem realiza perícia segundo art. 159?"
      },
      {
        "b": "Não. Art. 182 permite aceitar ou rejeitar no todo ou em parte.",
        "f": "O juiz fica vinculado ao laudo?"
      },
      {
        "b": "Aplica-lhes, no que couber, as disposições relativas aos peritos.",
        "f": "O que diz o art. 281 sobre intérpretes?"
      }
    ],
    "sort_order": 8,
    "legal_basis": [],
    "source_note": "Edital PC-AC 2026, Anexo III, p. 48; Código de Processo Penal (texto atualizado até 2026); Lei nº 12.037/2009; Lei nº 7.960/1989.",
    "topic_label": "12. Provas, cadeia de custódia e perícias",
    "contest_name": "PC-AC 2026",
    "legal_review": null,
    "content_status": "active",
    "syllabus_topic_order": 1,
    "law_version_checked_at": "2026-11-14T23:45:00+00:00"
  },
  {
    "quiz": [
      {
        "a": false,
        "q": "A pessoa civilmente identificada pode ser identificada criminalmente sem hipótese legal.",
        "why": "A Lei 12.037/2009 estabelece regra e exceções."
      },
      {
        "a": true,
        "q": "O art. 302 contempla quem está cometendo ou acaba de cometer a infração.",
        "why": "São hipóteses de flagrante próprio."
      },
      {
        "a": false,
        "q": "A autoridade policial decreta prisão preventiva sem juiz.",
        "why": "A preventiva depende de decisão judicial."
      },
      {
        "a": true,
        "q": "O juiz pode relaxar prisão ilegal ao receber o auto de flagrante.",
        "why": "É uma das providências do art. 310."
      },
      {
        "a": true,
        "q": "A prisão temporária segue a Lei 7.960/1989 e tem prazo próprio.",
        "why": "Não se confunde com preventiva."
      },
      {
        "a": true,
        "q": "Monitoração eletrônica é medida do art. 319.",
        "why": "Está expressamente prevista."
      },
      {
        "a": false,
        "q": "A preventiva pode ser antecipação da pena.",
        "why": "É medida cautelar, não pena."
      },
      {
        "a": true,
        "q": "Medidas cautelares devem observar necessidade e adequação.",
        "why": "Critérios gerais do art. 282."
      }
    ],
    "slug": "pcac-2026-processo-penal-09-identificacao-criminal-prisoes-medidas-cautelares",
    "title": "Identificação criminal, prisões e medidas cautelares",
    "body_md": "# Identificação criminal, prisões e medidas cautelares\n\n## 1. Identificação criminal — Lei nº 12.037/2009\nA pessoa civilmente identificada não será submetida à identificação criminal, salvo hipóteses legais. As modalidades incluem identificação datiloscópica e fotográfica, observados requisitos, decisão fundamentada quando exigida e preservação dos registros. Identificação criminal não é punição.\n\n## 2. Flagrante — CPP, arts. 301 a 310\nArt. 302: flagrante próprio (cometendo ou acaba de cometer), impróprio (perseguido logo após em situação que faça presumir autoria) e presumido (encontrado logo depois com instrumentos/objetos que indiquem autoria). A captura exige formalidades, comunicação e lavratura do auto. Ao receber o auto, o juiz pode relaxar prisão ilegal, converter em preventiva se presentes requisitos e inadequadas cautelares, ou conceder liberdade provisória, conforme art. 310 e redação vigente.\n\n## 3. Preventiva — CPP, arts. 311 a 316\nÉ decretada pelo juiz mediante provocação legítima, presentes prova da existência do crime, indício suficiente de autoria e perigo decorrente do estado de liberdade, além das hipóteses de admissibilidade do art. 313. Exige fundamentação concreta, necessidade e adequação; não pode antecipar pena. Art. 316: revogação se desaparecem os motivos e nova decretação se surgirem razões, observada revisão periódica prevista na lei.\n\n## 4. Temporária — Lei nº 7.960/1989\nMedida cautelar investigativa decretada judicialmente, a requerimento do MP ou representação da autoridade policial, nas hipóteses legais e por prazo próprio. A autoridade policial não decreta temporária por conta própria. Não se confunde com preventiva.\n\n## 5. Medidas diversas — CPP, arts. 282 e 319\nDevem observar necessidade e adequação. Art. 319 inclui comparecimento periódico, proibição de acesso ou contato, proibição de ausentar-se da comarca, recolhimento domiciliar noturno e em dias de folga, suspensão de função/atividade, internação provisória nas hipóteses legais, fiança e monitoração eletrônica.\n\n## 6. Pegadinhas\n- Flagrante: art. 302; decisão judicial de controle: art. 310.\n- Preventiva: arts. 311–316; depende de decisão judicial e requisitos legais.\n- Temporária: Lei 7.960/1989, finalidade e prazo próprios.\n- Medidas do art. 319 são cautelares, não penas.\n- Identificação criminal é excepcional para quem já tem identificação civil.",
    "summary": "Aula ampliada com correspondência aos artigos e leis expressamente cobrados no Anexo III do PC-AC 2026.",
    "discipline": "Noções de Direito Penal e Processual Penal",
    "flashcards": [
      {
        "b": "Próprio, impróprio e presumido.",
        "f": "Quais são as modalidades clássicas de flagrante do art. 302?"
      },
      {
        "b": "Relaxar prisão ilegal, converter em preventiva se cabível, ou conceder liberdade provisória.",
        "f": "Quais providências o juiz pode adotar ao receber auto de flagrante?"
      },
      {
        "b": "Não. É medida decretada pelo juiz, mediante provocação legítima.",
        "f": "A autoridade policial pode decretar preventiva?"
      },
      {
        "b": "Temporária: Lei 7.960/1989 e prazo próprio; preventiva: CPP 311–316, com requisitos cautelares.",
        "f": "Qual a diferença entre temporária e preventiva?"
      },
      {
        "b": "Necessidade e adequação da medida cautelar.",
        "f": "O que exige o art. 282?"
      },
      {
        "b": "Comparecimento periódico, proibição de contato e monitoração eletrônica.",
        "f": "Cite três medidas do art. 319."
      },
      {
        "b": "Não. É cautelar excepcional e exige fundamentação concreta.",
        "f": "A preventiva pode antecipar pena?"
      },
      {
        "b": "Datiloscópica e fotográfica, nos limites legais.",
        "f": "Quais modalidades de identificação criminal a Lei 12.037/2009 contempla?"
      }
    ],
    "sort_order": 9,
    "legal_basis": [],
    "source_note": "Edital PC-AC 2026, Anexo III, p. 48; Código de Processo Penal (texto atualizado até 2026); Lei nº 12.037/2009; Lei nº 7.960/1989.",
    "topic_label": "13. Identificação criminal; 14. Prisões e medidas cautelares",
    "contest_name": "PC-AC 2026",
    "legal_review": null,
    "content_status": "active",
    "syllabus_topic_order": 1,
    "law_version_checked_at": "2026-11-14T23:45:00+00:00"
  }
]
$penal_seed$::jsonb) as seed(
 slug text, discipline text, topic_label text, sort_order integer, title text, summary text, body_md text,
 contest_name text, syllabus_topic_order integer, source_note text, legal_basis jsonb, law_version_checked_at timestamptz,
 legal_review jsonb, content_status text, flashcards jsonb, quiz jsonb
)
on conflict (slug) do update set body_md=excluded.body_md,summary=excluded.summary,source_note=excluded.source_note,law_version_checked_at=excluded.law_version_checked_at,flashcards=excluded.flashcards,quiz=excluded.quiz;
