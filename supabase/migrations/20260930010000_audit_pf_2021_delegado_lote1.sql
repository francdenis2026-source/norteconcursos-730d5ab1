-- Auditoria PF 2021 Delegado de Polícia Federal — lote 1 (15 itens de Direito
-- Constitucional, Civil e Processual Civil que são afirmações autossuficientes,
-- sem depender de texto-base/enunciado de caso não capturado na importação).
-- Cada item teve sua base legal/jurisprudencial conferida em fonte oficial
-- (planalto.gov.br para leis/CF, portal STF para súmulas/precedentes) antes de
-- content_status ser promovido para 'active'.

update public.official_exam_questions set content_status='active', review_note=$q$Correto. A classificação tradicional do objeto das constituições (doutrina de José Afonso da Silva) aponta como núcleo comum a forma de Estado, a forma e o sistema de governo, o modo de aquisição e exercício do poder, a estrutura dos órgãos e a limitação do poder estatal.
Exemplo: é como o "estatuto fundador" de um país — ele sempre define quem manda, como chega ao poder e como esse poder é exercido, mesmo que o resto do texto varie de constituição para constituição.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=17 and content_status='under_review';

update public.official_exam_questions set content_status='active', review_note=$q$Correto. Constituição material é o conjunto de normas (escritas ou não, codificadas ou esparsas) que organizam o Estado e o poder político; já a constituição escrita é a positivada em documento único e solene. É perfeitamente possível ter uma sem a outra — o Reino Unido, por exemplo, tem Constituição material (convenções, leis esparsas, costumes) sem possuir uma Constituição escrita única.
Exemplo: é a diferença entre ter "regras de organização do poder" (que todo Estado tem, de um jeito ou de outro) e ter essas regras reunidas num único documento solene chamado "Constituição" — a primeira existe mesmo sem a segunda.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=18 and content_status='under_review';

update public.official_exam_questions set content_status='active', review_note=$q$Errado. A Súmula Vinculante 45 do STF é expressa em sentido contrário: "A competência constitucional do Tribunal do Júri prevalece sobre o foro por prerrogativa de função estabelecido exclusivamente pela Constituição Estadual." Só uma regra de foro especial prevista na própria Constituição Federal pode afastar a competência do júri para crimes dolosos contra a vida (CF, art. 5º, XXXVIII, "d").
Fonte oficial: Súmula Vinculante 45, STF (portal.stf.jus.br).
Exemplo: se uma Constituição estadual dá foro especial a um cargo, mas o crime é doloso contra a vida, quem julga continua sendo o júri popular — o foro estadual não tem força pra tirar essa competência do júri.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=20 and content_status='under_review';

update public.official_exam_questions set content_status='active', review_note=$q$Correto. No julgamento da ADPF 130 (que declarou a Lei de Imprensa não recepcionada pela CF/1988), o STF fixou que a liberdade de expressão não admite censura prévia (judicial ou administrativa); eventual abuso deve ser reparado depois, por meio de direito de resposta ou responsabilização civil/penal do autor — nunca por supressão antecipada do conteúdo.
Fonte oficial: ADPF 130, STF (stf.jus.br/arquivo/cms/publicacaoBOInternet).
Exemplo: é a diferença entre "impedir a notícia de sair" (censura prévia, vedada) e "responsabilizar depois, se a notícia abusou de algum direito" (direito de resposta/indenização, permitido) — a Constituição só autoriza o segundo caminho.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=21 and content_status='under_review';

update public.official_exam_questions set content_status='active', review_note=$q$Correto. O art. 144, § 1º, II, da Constituição Federal atribui à Polícia Federal, entre outras, a função de exercer as funções de polícia marítima, aeroportuária e de fronteiras.
Fonte oficial: art. 144, § 1º, II, CF/1988 (planalto.gov.br).
Exemplo: além de investigar crimes federais, a PF também fiscaliza portos, aeroportos e fronteiras — é a "polícia de trânsito internacional de pessoas e cargas" do Brasil.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=24 and content_status='under_review';

update public.official_exam_questions set content_status='active', review_note=$q$Errado. O art. 102, I, "d", da CF fixa em rol taxativo quem pode ser réu de habeas data de competência originária do STF: Presidente da República, Mesas da Câmara e do Senado, TCU, Procurador-Geral da República e o próprio STF. Ministro de Estado NÃO consta dessa lista — o STF já decidiu expressamente que não tem competência originária para habeas data contra ato de ministro de Estado.
Fonte oficial: art. 102, I, "d", CF/1988 (planalto.gov.br); jurisprudência do STF sobre o caráter taxativo desse rol.
Exemplo: é uma lista fechada de "VIPs" que, se praticarem o ato questionado, levam o caso direto ao STF — ministro de Estado não está nessa lista para habeas data, então o caso vai para outra instância (em regra, a Justiça Federal de 1º grau).$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=25 and content_status='under_review';

update public.official_exam_questions set content_status='active', review_note=$q$Correto. O art. 102, II, "a", da CF estabelece que compete ao STF julgar, em recurso ordinário, o habeas corpus decidido em única instância pelos tribunais superiores (STJ, TSE, STM, TST), quando a decisão for denegatória.
Fonte oficial: art. 102, II, "a", CF/1988 (planalto.gov.br).
Exemplo: se o TSE nega um habeas corpus e não há mais recurso dentro da própria Justiça Eleitoral, quem revisa essa decisão em grau de recurso é o STF.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=26 and content_status='under_review';

update public.official_exam_questions set content_status='active', review_note=$q$Correto. A Lei Complementar nº 73/1993 (Lei Orgânica da AGU) atribui à Advocacia-Geral da União a representação judicial e extrajudicial da União e a atividade de consultoria e assessoramento jurídico do Poder Executivo federal — o que inclui os órgãos da Administração direta, como a Polícia Federal.
Fonte oficial: art. 4º, LC 73/1993 (planalto.gov.br).
Exemplo: quando a Polícia Federal precisa de um parecer jurídico sobre um ato administrativo, quem presta essa consultoria é a AGU (ou seus órgãos vinculados), não um departamento jurídico próprio da PF.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=27 and content_status='under_review';

update public.official_exam_questions set content_status='active', review_note=$q$Correto. O "bloco de constitucionalidade" é a construção doutrinária e jurisprudencial segundo a qual normas formalmente fora do texto constitucional — como tratados internacionais de direitos humanos aprovados pelo rito do art. 5º, § 3º, da CF — podem servir de parâmetro (paradigma) para o controle de constitucionalidade, ampliando o que se considera "norma constitucional" para esse fim.
Exemplo: é como se a Constituição "emprestasse" força de parâmetro de controle a certas normas que não estão fisicamente no seu texto, mas que o próprio sistema constitucional reconhece como tendo o mesmo status.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=28 and content_status='under_review';

update public.official_exam_questions set content_status='active', review_note=$q$Errado. O STF não admite a "teoria da transcendência dos motivos determinantes" para fins de cabimento de reclamação constitucional: apenas o dispositivo (parte final) da decisão em controle concentrado tem efeito vinculante, e não os fundamentos (motivos) que levaram a ela. Logo, não cabe reclamação alegando violação apenas aos fundamentos de um julgado.
Fonte oficial: jurisprudência consolidada do STF (ex.: Rcl 2.126 e precedentes posteriores).
Exemplo: é a diferença entre vincular só a "resposta final" de uma decisão (o que o STF aceita) e vincular também toda a "explicação" por trás dela (o que o STF rejeita) — só a primeira parte obriga os demais órgãos.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=29 and content_status='under_review';

update public.official_exam_questions set content_status='active', review_note=$q$Errado. O Poder Legislativo pode, sim, exercer controle repressivo de constitucionalidade em abstrato, por via política: o art. 49, V, da CF autoriza o Congresso Nacional a sustar atos normativos do Poder Executivo que exorbitem do poder regulamentar ou dos limites de delegação legislativa — um controle repressivo, abstrato e político, exercido fora do Judiciário.
Fonte oficial: art. 49, V, CF/1988 (planalto.gov.br).
Exemplo: se o Executivo edita um decreto que extrapola o que a lei permitia, o Congresso pode simplesmente "derrubar" esse decreto por decreto legislativo — isso é controle de constitucionalidade feito pelo próprio Legislativo, não pelos tribunais.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=30 and content_status='under_review';

update public.official_exam_questions set content_status='active', review_note=$q$Correto. O art. 71 do Código Civil admite a pluralidade domiciliar: se a pessoa natural tiver diversas residências onde viva alternadamente, qualquer uma delas será considerada seu domicílio.
Fonte oficial: art. 71, Código Civil (Lei nº 10.406/2002, planalto.gov.br).
Exemplo: quem mora metade do ano numa cidade e metade em outra não precisa escolher "qual é o domicílio de verdade" — as duas contam, para efeitos legais, como domicílio dessa pessoa.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=31 and content_status='under_review';

update public.official_exam_questions set content_status='active', review_note=$q$Errado. A dissolução de sociedade limitada contratada por prazo indeterminado não exige consenso unânime: o art. 1.033, III, do Código Civil admite a dissolução por deliberação dos sócios, por maioria absoluta (mais da metade do capital social) — a unanimidade só é exigida como causa autônoma de dissolução pelo inciso II do mesmo artigo, aplicável independentemente do prazo.
Fonte oficial: art. 1.033, II e III, Código Civil (Lei nº 10.406/2002, planalto.gov.br).
Exemplo: numa sociedade sem prazo para acabar, não é preciso que todos os sócios concordem em fechar a empresa — basta que os donos de mais da metade das cotas decidam isso.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=33 and content_status='under_review';

update public.official_exam_questions set content_status='active', review_note=$q$Errado. Na teoria clássica (Chiovenda), a jurisdição se caracteriza por substituir a atividade das próprias partes por uma atividade estatal (do juiz), e não por "substituir a vontade das partes pela vontade do juiz" — o juiz não impõe sua vontade pessoal, mas aplica a lei ao caso concreto no lugar do que as partes fariam por conta própria caso pudessem resolver sozinhas (autotutela, vedada em regra).
Exemplo: o juiz não está dizendo "eu quero que seja assim"; ele está fazendo, oficialmente, o que a lei manda — no lugar das partes, que não podem mais "resolver na marra" sozinhas.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=34 and content_status='under_review';

update public.official_exam_questions set content_status='active', review_note=$q$Errado. O art. 109, I, da CF exclui expressamente as causas de acidente de trabalho da competência da Justiça Federal, mesmo quando a União intervém como interessada — essas ações continuam tramitando na Justiça Estadual.
Fonte oficial: art. 109, I, CF/1988 (planalto.gov.br).
Exemplo: é uma das poucas exceções em que, mesmo com a União "no processo", o caso não vai para a Justiça Federal — continua na Justiça Estadual porque a própria Constituição abriu essa exceção específica para acidente de trabalho.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=35 and content_status='under_review';
