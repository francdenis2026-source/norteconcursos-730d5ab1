-- Lote 4 dos exemplos resolvidos (conferido no Planalto em 08/10/2026). Entra under_review.
begin;

insert into public.study_material_enrichments
  (id, material_slug, version, source_body_sha256, content, sources, checked_at, status)
select
  gen_random_uuid(),
  m.slug,
  '2026-10-08',
  encode(sha256(convert_to(m.body_md, 'UTF8')), 'hex'),
  $json${"illustrations": [{"kind": "flow", "title": "Como analisar um crime contra a pessoa idosa", "caption": "Siga a ordem; cada caso abaixo trabalha uma das perguntas.", "nodes": ["O crime é do Estatuto ou foi cometido com violência contra a pessoa idosa?", "Qual é o tipo e a pena atual?", "O caso pode ir ao Juizado Especial?"]}], "cases": [{"id": "idosa-1", "title": "Agressão leve contra pessoa idosa não vai ao Juizado", "scenario": "Um filho agride levemente a mãe, de 72 anos, causando uma lesão leve. A pena máxima do crime comum, isoladamente, caberia no Juizado Especial.", "question": "O caso é tratado como infração de menor potencial ofensivo?", "steps": ["A Lei 9.099/1995 trata como menor potencial ofensivo o crime cuja pena máxima não passa de 2 anos.", "O parágrafo único do art. 95 do Estatuto (incluído pela Lei 15.163/2025) afasta a Lei 9.099 dos crimes previstos no Estatuto e dos crimes praticados com violência contra a pessoa idosa, independentemente da pena prevista.", "Houve violência contra pessoa idosa. Logo, não cabem transação penal nem rito sumaríssimo."], "conclusion": "Não. Com violência contra pessoa idosa, a Lei 9.099 não se aplica, mesmo que a pena seja baixa.", "variation": {"scenario": "E se o crime fosse comum, sem violência, com pena máxima de 1 ano?", "answer": "O parágrafo único do art. 95 alcança os crimes do Estatuto e os cometidos com violência. Sem uma dessas situações, vale a regra geral da Lei 9.099."}, "pitfall": "Decidir só pela pena máxima. Para a pessoa idosa, a violência tira o caso do Juizado.", "articles": ["Art. 95"]}, {"id": "idosa-2", "title": "Privar a pessoa idosa de alimentos e cuidados", "scenario": "Uma cuidadora deixa uma idosa acamada sem alimentação adequada e sem os cuidados indispensáveis por vários dias.", "question": "Que crime é esse e qual é a pena atual?", "steps": ["O art. 99 pune expor a perigo a integridade e a saúde, física ou psíquica, da pessoa idosa, submetendo-a a condições desumanas ou degradantes ou privando-a de alimentos e cuidados indispensáveis.", "Conforme a conferência na fonte oficial, a pena hoje é reclusão de 2 a 5 anos (redação da Lei 15.163/2025). Antes era detenção de 2 meses a 1 ano.", "Como é crime do Estatuto, o parágrafo único do art. 95 afasta a Lei 9.099."], "conclusion": "Cuidadora responde pelo art. 99, com reclusão de 2 a 5 anos, e o caso não vai ao Juizado.", "variation": {"scenario": "E se um parente apenas usasse a aposentadoria da idosa para pagar contas dele?", "answer": "O fato se aproxima do art. 102, apropriação ou desvio de bens e proventos da pessoa idosa, com reclusão de 1 a 4 anos e multa."}, "pitfall": "Usar a pena antiga (detenção, 2 meses a 1 ano) do art. 99.", "articles": ["Art. 99", "Art. 102"]}]}$json$::jsonb,
  $json$[{"title": "Lei 10.741/2003 (Estatuto da Pessoa Idosa) — texto oficial (arts. 95, 99 e 102)", "url": "https://www.planalto.gov.br/ccivil_03/leis/2003/l10.741.htm", "checked_at": "2026-10-08T03:11:55Z"}]$json$::jsonb,
  '2026-10-08T03:11:55Z',
  'under_review'
from public.study_materials m
where m.slug = 'legislacao-idosa-revisao'
on conflict (material_slug, version) do nothing;

insert into public.study_material_enrichments
  (id, material_slug, version, source_body_sha256, content, sources, checked_at, status)
select
  gen_random_uuid(),
  m.slug,
  '2026-10-08',
  encode(sha256(convert_to(m.body_md, 'UTF8')), 'hex'),
  $json${"illustrations": [{"kind": "flow", "title": "Como analisar o Estatuto da Pessoa com Deficiência", "caption": "Siga a ordem; cada caso abaixo trabalha uma das perguntas.", "nodes": ["A pessoa tem impedimento de longo prazo e barreiras?", "Como a deficiência é avaliada?", "Qual crime está em jogo e qual pena?"]}], "cases": [{"id": "pcd-1", "title": "Laudo médico sozinho não basta", "scenario": "Um órgão público nega o enquadramento de uma pessoa com impedimento de longo prazo apenas com base em um laudo médico sobre o diagnóstico.", "question": "O critério usado está de acordo com o Estatuto?", "steps": ["O art. 2º considera pessoa com deficiência a que tem impedimento de longo prazo, de natureza física, mental, intelectual ou sensorial, que, em interação com uma ou mais barreiras, pode obstruir sua participação plena e efetiva na sociedade em igualdade de condições.", "O § 1º exige avaliação biopsicossocial, feita por equipe multiprofissional e interdisciplinar.", "Ela considera os impedimentos nas funções e estruturas do corpo, os fatores socioambientais, a limitação no desempenho de atividades e a restrição de participação."], "conclusion": "Não. A avaliação deve ser biopsicossocial, por equipe multiprofissional e interdisciplinar.", "variation": {"scenario": "E se não existisse nenhuma barreira para aquela pessoa?", "answer": "A definição legal depende da interação entre o impedimento e as barreiras. A avaliação examina essa interação no caso concreto."}, "pitfall": "Reduzir a deficiência ao diagnóstico médico.", "articles": ["Art. 2"]}, {"id": "pcd-2", "title": "Publicação que incita a discriminação", "scenario": "Um administrador de site publica texto que incita a discriminação de pessoas com deficiência.", "question": "Como o Estatuto trata esse fato?", "steps": ["O art. 88 pune praticar, induzir ou incitar discriminação em razão de deficiência, com reclusão de 1 a 3 anos e multa.", "O § 2º prevê reclusão de 2 a 5 anos e multa se a discriminação ocorre por meio de comunicação social ou publicação de qualquer natureza.", "Os §§ 3º e 4º permitem a busca e apreensão do material e a interdição das páginas na internet; a destruição do material ocorre após o trânsito em julgado."], "conclusion": "A pena é a do § 2º, reclusão de 2 a 5 anos e multa, com possibilidade de interdição das páginas.", "variation": {"scenario": "E se um curador se apropriasse dos proventos de quem está sob sua curatela?", "answer": "O art. 89 pune a apropriação de bens e proventos da pessoa com deficiência (reclusão de 1 a 4 anos e multa), com aumento de 1/3 se o autor é tutor, curador ou age em razão de ofício."}, "pitfall": "Aplicar a pena do caput (1 a 3 anos) quando há publicação ou meio de comunicação.", "articles": ["Art. 88", "Art. 89"]}]}$json$::jsonb,
  $json$[{"title": "Lei 13.146/2015 — texto oficial (arts. 2º, 88 e 89)", "url": "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm", "checked_at": "2026-10-08T03:11:55Z"}]$json$::jsonb,
  '2026-10-08T03:11:55Z',
  'under_review'
from public.study_materials m
where m.slug = 'legislacao-pcd-revisao'
on conflict (material_slug, version) do nothing;

insert into public.study_material_enrichments
  (id, material_slug, version, source_body_sha256, content, sources, checked_at, status)
select
  gen_random_uuid(),
  m.slug,
  '2026-10-08',
  encode(sha256(convert_to(m.body_md, 'UTF8')), 'hex'),
  $json${"illustrations": [{"kind": "flow", "title": "Como analisar um crime da Lei do Racismo", "caption": "Siga a ordem; cada caso abaixo trabalha uma das perguntas.", "nodes": ["A conduta é uma ofensa a alguém ou uma discriminação mais ampla?", "O motivo é raça, cor, etnia, religião ou procedência nacional?", "Há meio ou contexto que agrava?"]}], "cases": [{"id": "rac-1", "title": "Injúria racial agora está na Lei do Racismo", "scenario": "Durante uma partida, um torcedor ofende um jogador chamando-o por termo ofensivo ligado à cor da pele.", "question": "Que crime é esse e qual é a pena?", "steps": ["O art. 2º-A, incluído pela Lei 14.532/2023, pune injuriar alguém, ofendendo-lhe a dignidade ou o decoro, em razão de raça, cor, etnia ou procedência nacional.", "A pena é reclusão de 2 a 5 anos e multa. O parágrafo único aumenta a pena de metade se o crime é cometido por duas ou mais pessoas.", "Antes, a injúria racial ficava no art. 140, § 3º, do Código Penal, com pena menor. A mudança a aproximou do racismo."], "conclusion": "É crime do art. 2º-A da Lei 7.716, com reclusão de 2 a 5 anos e multa.", "variation": {"scenario": "E se a ofensa tivesse como alvo o peso da pessoa, sem relação com raça, cor, etnia ou procedência?", "answer": "Seria injúria comum (art. 140 do CP). A Lei 7.716 exige o motivo racial, étnico ou de procedência nacional."}, "pitfall": "Tratar a injúria racial como crime do Código Penal. Hoje a previsão específica está na Lei 7.716.", "articles": ["Art. 2-A"]}, {"id": "rac-2", "title": "Incitação em atividade esportiva", "scenario": "Em um estádio, um torcedor incita publicamente a discriminação de pessoas por causa da cor e da etnia.", "question": "O contexto muda a consequência?", "steps": ["O art. 1º abrange crimes resultantes de discriminação ou preconceito de raça, cor, etnia, religião ou procedência nacional (ampliação feita pela Lei 9.459/1997).", "O art. 20 pune praticar, induzir ou incitar a discriminação ou o preconceito.", "O § 2º-A (Lei 14.532/2023) trata do crime cometido no contexto de atividades esportivas, religiosas, artísticas ou culturais destinadas ao público: reclusão de 2 a 5 anos e proibição de frequentar, por 3 anos, os locais correspondentes."], "conclusion": "Além da reclusão, há a proibição de frequentar locais esportivos por 3 anos.", "variation": {"scenario": "E se a incitação ocorresse por meio de rede social ou internet?", "answer": "O § 2º do art. 20 trata dos meios de comunicação social e da internet, com pena própria. Confira o texto oficial."}, "pitfall": "Esquecer que o contexto esportivo, religioso, artístico ou cultural traz uma consequência própria.", "articles": ["Art. 20"]}]}$json$::jsonb,
  $json$[{"title": "Lei 7.716/1989 — texto oficial (arts. 1º, 2º-A e 20)", "url": "https://www.planalto.gov.br/ccivil_03/leis/l7716.htm", "checked_at": "2026-10-08T03:11:55Z"}]$json$::jsonb,
  '2026-10-08T03:11:55Z',
  'under_review'
from public.study_materials m
where m.slug = 'legislacao-racismo-revisao'
on conflict (material_slug, version) do nothing;

insert into public.study_material_enrichments
  (id, material_slug, version, source_body_sha256, content, sources, checked_at, status)
select
  gen_random_uuid(),
  m.slug,
  '2026-10-08',
  encode(sha256(convert_to(m.body_md, 'UTF8')), 'hex'),
  $json${"illustrations": [{"kind": "flow", "title": "Como analisar uma Contravenção Penal", "caption": "Siga a ordem; cada caso abaixo trabalha uma das perguntas.", "nodes": ["É crime ou contravenção?", "A tentativa é punível?", "Qual é a pena (prisão simples ou multa)?"]}], "cases": [{"id": "cont-1", "title": "Empurrão sem lesão", "scenario": "Durante uma discussão, Paulo empurra Rui, sem causar lesão corporal. Rui tem 65 anos.", "question": "Que infração é essa e como se aplica a pena?", "steps": ["O art. 21 pune praticar vias de fato contra alguém, se o fato não constitui crime. A pena é prisão simples de 15 dias a 3 meses, ou multa.", "Se houvesse lesão, o fato seria crime e a contravenção ficaria de fora. Aqui não houve lesão.", "Como Rui tem mais de 60 anos, a pena é aumentada de 1/3 até a metade (§ 1º, conforme a conferência na fonte oficial)."], "conclusion": "Vias de fato, com o aumento por a vítima ser maior de 60 anos.", "variation": {"scenario": "E se Paulo tentasse empurrar Rui e não conseguisse?", "answer": "O art. 4º não pune a tentativa de contravenção."}, "pitfall": "Aplicar o Código Penal à tentativa de contravenção. A tentativa não é punível.", "articles": ["Art. 4", "Art. 21"]}, {"id": "cont-2", "title": "Jogo de azar: quem explora e quem aposta", "scenario": "Um comerciante mantém máquinas de jogo de azar em seu bar. Um cliente apenas aposta.", "question": "Os dois respondem do mesmo modo?", "steps": ["O art. 50 pune estabelecer ou explorar jogo de azar em lugar público ou acessível ao público: prisão simples de 3 meses a 1 ano e multa, com perda dos móveis e objetos de decoração do local.", "Quem apenas joga ou aposta responde com multa (§ 2º).", "Ambos praticam contravenção, que é infração penal."], "conclusion": "Não. O comerciante responde com prisão simples e multa; o apostador, apenas com multa.", "variation": {"scenario": "E se o dinheiro do jogo fosse escondido em nome de terceiros?", "answer": "Pode ocorrer lavagem de dinheiro, pois a contravenção é infração penal antecedente (Lei 9.613, art. 1º)."}, "pitfall": "Pensar que contravenção não pode gerar outros crimes.", "articles": ["Art. 50"]}]}$json$::jsonb,
  $json$[{"title": "Decreto-Lei 3.688/1941 — texto oficial (arts. 4º, 21 e 50)", "url": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3688.htm", "checked_at": "2026-10-08T03:11:55Z"}]$json$::jsonb,
  '2026-10-08T03:11:55Z',
  'under_review'
from public.study_materials m
where m.slug = 'legislacao-contravencoes-revisao'
on conflict (material_slug, version) do nothing;

insert into public.study_material_enrichments
  (id, material_slug, version, source_body_sha256, content, sources, checked_at, status)
select
  gen_random_uuid(),
  m.slug,
  '2026-10-08',
  encode(sha256(convert_to(m.body_md, 'UTF8')), 'hex'),
  $json${"illustrations": [{"kind": "flow", "title": "Como analisar a Identificação Criminal", "caption": "Siga a ordem; cada caso abaixo trabalha uma das perguntas.", "nodes": ["A pessoa tem identificação civil?", "Há alguma hipótese do art. 3º?", "O caso está no novo inciso VII?"]}], "cases": [{"id": "ic-1", "title": "Quem tem RG regular", "scenario": "Ao ser preso em flagrante por furto, Carlos apresenta documento de identidade em bom estado e sem dúvida sobre sua identidade.", "question": "A polícia pode submetê-lo à identificação criminal?", "steps": ["O art. 1º diz que o civilmente identificado não será submetido a identificação criminal, salvo nos casos previstos na lei.", "O art. 3º traz as exceções: documento rasurado ou com indício de falsificação, insuficiente, conflitante, nomes diferentes em registros policiais, documento muito antigo, ou decisão judicial por essencialidade à investigação.", "Nenhuma exceção se aplica a Carlos."], "conclusion": "Não. Quem tem identificação civil regular não é submetido à identificação criminal.", "variation": {"scenario": "E se o documento estivesse rasurado?", "answer": "O art. 3º, I, permite a identificação criminal."}, "pitfall": "Achar que a prisão em flagrante autoriza identificação criminal automática.", "articles": ["Art. 1", "Art. 3"]}, {"id": "ic-2", "title": "Nova hipótese: recebimento da denúncia", "scenario": "Débora tem identificação civil regular. Ela é denunciada por crime com grave violência contra pessoa, e a denúncia é recebida.", "question": "A identificação civil impede a identificação criminal?", "steps": ["O inciso VII do art. 3º foi incluído pela Lei 15.295/2025, conforme a conferência na fonte oficial.", "Ele permite a identificação criminal, mesmo com identificação civil, quando houver o recebimento da denúncia por crime com grave violência contra pessoa, crimes sexuais (incluindo contra vulnerável), crimes do ECA e organização criminosa armada.", "Débora responde por crime com grave violência contra pessoa e já houve o recebimento da denúncia."], "conclusion": "Não impede. Nesses crimes, o recebimento da denúncia autoriza a identificação criminal.", "variation": {"scenario": "E se a denúncia ainda não tivesse sido recebida?", "answer": "A hipótese do inciso VII depende do recebimento da denúncia. Sem ele, vale a regra geral do art. 1º."}, "pitfall": "Ignorar a reforma de 2025 e achar que só as hipóteses antigas valem.", "articles": ["Art. 3"]}]}$json$::jsonb,
  $json$[{"title": "Lei 12.037/2009 — texto oficial (arts. 1º e 3º)", "url": "https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/lei/l12037.htm", "checked_at": "2026-10-08T03:11:55Z"}]$json$::jsonb,
  '2026-10-08T03:11:55Z',
  'under_review'
from public.study_materials m
where m.slug = 'legislacao-identificacao-criminal-revisao'
on conflict (material_slug, version) do nothing;

insert into public.study_material_enrichments
  (id, material_slug, version, source_body_sha256, content, sources, checked_at, status)
select
  gen_random_uuid(),
  m.slug,
  '2026-10-08',
  encode(sha256(convert_to(m.body_md, 'UTF8')), 'hex'),
  $json${"illustrations": [{"kind": "flow", "title": "Como analisar um crime de trânsito", "caption": "Siga a ordem; cada caso abaixo trabalha uma das perguntas.", "nodes": ["O fato é homicídio ou lesão culposa na direção?", "Houve álcool ou substância psicoativa?", "Qual é a pena e há vedação de substituição?"]}], "cases": [{"id": "tr-1", "title": "Homicídio culposo com embriaguez", "scenario": "Um motorista embriagado atropela e mata um pedestre, sem intenção de matar.", "question": "Qual pena se aplica, e a pena pode ser substituída por restritiva de direitos?", "steps": ["O caput do art. 302 pune o homicídio culposo na direção com detenção de 2 a 4 anos, além da suspensão ou proibição de habilitação.", "O § 3º, incluído pela Lei 13.546/2017, trata de quem conduz sob influência de álcool ou substância psicoativa: reclusão de 5 a 8 anos.", "O art. 312-B (Lei 14.071/2020) afasta o art. 44, I, do CP para o § 3º do art. 302 e o § 2º do art. 303: não cabe substituição por restritiva de direitos."], "conclusion": "Aplica-se o § 3º do art. 302, com reclusão de 5 a 8 anos, sem substituição por restritiva de direitos.", "variation": {"scenario": "E se ele apenas ferisse a vítima, também sob efeito de álcool?", "answer": "Aplica-se o art. 303, § 2º, e o art. 312-B também veda a substituição."}, "pitfall": "Aplicar a pena do caput (detenção de 2 a 4 anos) ao motorista embriagado.", "articles": ["Art. 302", "Art. 312-B"]}, {"id": "tr-2", "title": "Embriaguez ao volante sem bafômetro", "scenario": "Um motorista é parado com sinais de capacidade psicomotora alterada. Ele recusa o bafômetro, mas há vídeo da abordagem e testemunhas.", "question": "O crime do art. 306 pode ser provado?", "steps": ["O art. 306 pune conduzir veículo com capacidade psicomotora alterada em razão de álcool ou outra substância psicoativa que determine dependência. A pena é detenção de 6 meses a 3 anos, multa e suspensão ou proibição de habilitação.", "O § 1º permite a prova pela concentração de álcool (6 decigramas por litro de sangue ou 0,3 miligrama por litro de ar alveolar) ou por sinais de alteração da capacidade psicomotora.", "O § 2º admite exame clínico, perícia, vídeo, prova testemunhal e outros meios."], "conclusion": "Sim. A lei admite prova por sinais de alteração, vídeo e testemunhas, além do exame de alcoolemia.", "variation": {"scenario": "E se o motorista soprasse e o resultado fosse 0,5 g/L, sem sinais de alteração?", "answer": "Abaixo do limite legal e sem outros sinais de alteração psicomotora, falta o requisito do tipo."}, "pitfall": "Achar que sem bafômetro não há crime.", "articles": ["Art. 306"]}]}$json$::jsonb,
  $json$[{"title": "Lei 9.503/1997 (CTB) — texto oficial (arts. 302, 303, 306 e 312-B)", "url": "https://www.planalto.gov.br/ccivil_03/leis/l9503compilado.htm", "checked_at": "2026-10-08T03:11:55Z"}]$json$::jsonb,
  '2026-10-08T03:11:55Z',
  'under_review'
from public.study_materials m
where m.slug = 'legislacao-transito-revisao'
on conflict (material_slug, version) do nothing;

insert into public.study_material_enrichments
  (id, material_slug, version, source_body_sha256, content, sources, checked_at, status)
select
  gen_random_uuid(),
  m.slug,
  '2026-10-08',
  encode(sha256(convert_to(m.body_md, 'UTF8')), 'hex'),
  $json${"illustrations": [{"kind": "flow", "title": "Como analisar um crime ambiental", "caption": "Siga a ordem; cada caso abaixo trabalha uma das perguntas.", "nodes": ["Qual bem ambiental foi atingido?", "Há pena agravada por espécie, época ou meio?", "Quem responde: o autor direto ou também o gestor?"]}], "cases": [{"id": "amb-1", "title": "Caça de espécie ameaçada no período de defeso", "scenario": "Um caçador mata um animal silvestre de espécie ameaçada de extinção, em período de defeso, sem autorização.", "question": "Qual pena se aplica?", "steps": ["O art. 29 pune matar, perseguir, caçar, apanhar ou utilizar espécime da fauna silvestre sem permissão: detenção de 6 meses a 1 ano e multa.", "O § 4º aumenta a pena de metade se o crime atinge espécie ameaçada ou ocorre em período de defeso, entre outros casos.", "O § 5º prevê pena até o triplo se o crime decorre do exercício de caça profissional."], "conclusion": "Detenção de 6 meses a 1 ano e multa, com aumento de metade pela espécie ameaçada e pelo período de defeso.", "variation": {"scenario": "E se a caça fosse profissional?", "answer": "Aplica-se o § 5º: a pena pode ir até o triplo."}, "pitfall": "Aplicar só a pena do caput, esquecendo as causas de aumento do § 4º.", "articles": ["Art. 29"]}, {"id": "amb-2", "title": "O gerente que sabia e nada fez", "scenario": "Uma empresa lança resíduos tóxicos em um rio. O gerente sabe do lançamento, tem poder para impedi-lo e nada faz.", "question": "Só quem lançou os resíduos responde?", "steps": ["O art. 54 pune causar poluição que resulte ou possa resultar em danos à saúde humana, ou que provoque a mortandade de animais ou a destruição significativa da flora: reclusão de 1 a 4 anos e multa. A forma culposa é detenção de 6 meses a 1 ano.", "O art. 2º faz responder também o diretor, administrador, gerente ou outra pessoa que, sabendo da conduta criminosa de outro, deixa de impedi-la quando podia agir para evitá-la.", "O gerente sabia e podia agir."], "conclusion": "Não. O gerente também responde, na medida de sua culpabilidade (art. 2º).", "variation": {"scenario": "E se o gerente não soubesse de nada?", "answer": "Sem conhecimento da conduta, não se aplica a omissão do art. 2º, pois a lei exige que ele saiba."}, "pitfall": "Achar que só o executor direto responde.", "articles": ["Art. 2", "Art. 54"]}]}$json$::jsonb,
  $json$[{"title": "Lei 9.605/1998 — texto oficial (arts. 2º, 29 e 54)", "url": "https://www.planalto.gov.br/ccivil_03/leis/l9605.htm", "checked_at": "2026-10-08T03:11:55Z"}]$json$::jsonb,
  '2026-10-08T03:11:55Z',
  'under_review'
from public.study_materials m
where m.slug = 'legislacao-ambientais-revisao'
on conflict (material_slug, version) do nothing;

insert into public.study_material_enrichments
  (id, material_slug, version, source_body_sha256, content, sources, checked_at, status)
select
  gen_random_uuid(),
  m.slug,
  '2026-10-08',
  encode(sha256(convert_to(m.body_md, 'UTF8')), 'hex'),
  $json${"illustrations": [{"kind": "flow", "title": "Como analisar o Juizado Especial Criminal", "caption": "Siga a ordem; cada caso abaixo trabalha uma das perguntas.", "nodes": ["A infração é de menor potencial ofensivo? (art. 61)", "Cabe transação penal? (art. 76)", "Cabe suspensão do processo ou ANPP?"]}], "cases": [{"id": "jui-1", "title": "Transação penal depois de benefício recente", "scenario": "Marcos responde por infração de menor potencial ofensivo (pena máxima de 1 ano). Há 3 anos, ele foi beneficiado com transação penal em outro caso.", "question": "O Ministério Público pode propor nova transação?", "steps": ["O art. 61 define infração de menor potencial ofensivo como as contravenções e os crimes com pena máxima não superior a 2 anos, cumulada ou não com multa.", "O art. 76 permite ao MP propor pena restritiva de direitos ou multa antes da denúncia. A transação não gera reincidência.", "Não cabe se o autor foi condenado por pena privativa de liberdade ou beneficiado com a medida nos 5 anos anteriores."], "conclusion": "Não. O benefício anterior, dentro de 5 anos, impede nova transação.", "variation": {"scenario": "E se o benefício anterior tivesse ocorrido há 6 anos?", "answer": "Passado o prazo de 5 anos, o impedimento deixa de existir, e a transação pode ser proposta se os demais requisitos estiverem presentes."}, "pitfall": "Achar que o limite de 1 ano da regra antiga continua valendo. Desde a Lei 11.313/2006, o limite é de 2 anos.", "articles": ["Art. 61", "Art. 76"]}, {"id": "jui-2", "title": "Suspensão do processo ou ANPP?", "scenario": "Duas pessoas respondem por crimes sem violência ou grave ameaça. O crime de Ana tem pena mínima de 1 ano. O de Bia tem pena mínima de 2 anos.", "question": "Qual instituto cabe a cada uma?", "steps": ["O art. 89 da Lei 9.099 permite a suspensão condicional do processo, por 2 a 4 anos, em crimes com pena mínima igual ou inferior a 1 ano, com condições.", "O ANPP, previsto no art. 28-A do CPP, abrange crimes sem violência ou grave ameaça com pena mínima inferior a 4 anos, com outros requisitos.", "Ana pode ter a suspensão do processo. Bia, com pena mínima de 2 anos, não cabe no art. 89, mas pode ter o ANPP."], "conclusion": "Ana: suspensão condicional do processo. Bia: ANPP, se cumprir os requisitos.", "variation": {"scenario": "E se o crime de Bia tivesse sido cometido com violência?", "answer": "O ANPP exige que não haja violência ou grave ameaça. Não caberia."}, "pitfall": "Pensar que o ANPP revogou o art. 89. A suspensão do processo continua em vigor.", "articles": ["Art. 89"]}]}$json$::jsonb,
  $json$[{"title": "Lei 9.099/1995 — texto oficial (arts. 61, 76 e 89) e CPP art. 28-A", "url": "https://www.planalto.gov.br/ccivil_03/leis/l9099.htm", "checked_at": "2026-10-08T03:11:55Z"}]$json$::jsonb,
  '2026-10-08T03:11:55Z',
  'under_review'
from public.study_materials m
where m.slug = 'legislacao-juizados-revisao'
on conflict (material_slug, version) do nothing;

insert into public.study_material_enrichments
  (id, material_slug, version, source_body_sha256, content, sources, checked_at, status)
select
  gen_random_uuid(),
  m.slug,
  '2026-10-08',
  encode(sha256(convert_to(m.body_md, 'UTF8')), 'hex'),
  $json${"illustrations": [{"kind": "flow", "title": "Como analisar a colaboração premiada da Lei 9.807", "caption": "Siga a ordem; cada caso abaixo trabalha uma das perguntas.", "nodes": ["O colaborador é primário?", "A colaboração foi voluntária e efetiva?", "Qual resultado ela produziu?"]}], "cases": [{"id": "test-1", "title": "Perdão judicial ou redução de pena", "scenario": "Dois réus colaboram: Pedro, primário, ajuda a localizar a vítima com vida. Vítor, reincidente, ajuda a identificar os demais coautores.", "question": "Quem pode ter perdão judicial e quem tem redução de pena?", "steps": ["O art. 13 permite o perdão judicial, com extinção da punibilidade, ao réu primário que colabora de forma efetiva e voluntária e permite a identificação dos coautores, a localização da vítima com vida ou a recuperação do produto do crime.", "O art. 14 prevê redução de pena de 1/3 a 2/3 para o acusado que colabora voluntariamente na investigação e no processo.", "Pedro é primário e obteve a localização da vítima. Vítor não é primário."], "conclusion": "Pedro pode receber o perdão judicial. Vítor, não primário, pode ter a redução de pena do art. 14.", "variation": {"scenario": "E se Pedro fosse reincidente?", "answer": "Perderia a possibilidade de perdão do art. 13, mas poderia ter a redução do art. 14."}, "pitfall": "Confundir os dois benefícios. O perdão exige réu primário; a redução, não.", "articles": ["Art. 13", "Art. 14"]}]}$json$::jsonb,
  $json$[{"title": "Lei 9.807/1999 — texto oficial (arts. 1º, 13 e 14)", "url": "https://www.planalto.gov.br/ccivil_03/leis/l9807.htm", "checked_at": "2026-10-08T03:11:55Z"}]$json$::jsonb,
  '2026-10-08T03:11:55Z',
  'under_review'
from public.study_materials m
where m.slug = 'legislacao-testemunhas-revisao'
on conflict (material_slug, version) do nothing;

insert into public.study_material_enrichments
  (id, material_slug, version, source_body_sha256, content, sources, checked_at, status)
select
  gen_random_uuid(),
  m.slug,
  '2026-10-08',
  encode(sha256(convert_to(m.body_md, 'UTF8')), 'hex'),
  $json${"illustrations": [{"kind": "flow", "title": "Como analisar a atuação da PF em crimes interestaduais", "caption": "Siga a ordem; cada caso abaixo trabalha uma das perguntas.", "nodes": ["O crime está na lista do art. 1º?", "Há repercussão interestadual ou internacional?", "A repressão uniforme é necessária?"]}], "cases": [{"id": "pf-1", "title": "Furto de cargas em vários estados", "scenario": "Uma associação criminosa furta cargas de caminhões em três estados diferentes.", "question": "A Polícia Federal pode investigar?", "steps": ["O art. 1º da Lei 10.446 permite à PF investigar, sem prejuízo da atuação das polícias estaduais, infrações com repercussão interestadual ou internacional que exijam repressão uniforme.", "O inciso IV da lista inclui furto, roubo ou receptação de cargas transportadas em operação interestadual ou internacional, quando houver indícios da atuação de quadrilha ou bando em mais de um Estado (redação da Lei 14.967/2024).", "O caso envolve três estados e atuação organizada."], "conclusion": "Sim. A PF pode investigar, sem excluir a polícia estadual.", "variation": {"scenario": "E se o furto de carga ocorresse apenas em um estado, sem indícios de atuação em outros?", "answer": "Falta a repercussão interestadual. A atribuição é da polícia estadual."}, "pitfall": "Achar que a atuação da PF afasta a polícia estadual. A lei diz \"sem prejuízo\".", "articles": ["Art. 1"]}, {"id": "pf-2", "title": "Ataques a bancos em mais de um estado", "scenario": "Uma associação criminosa ataca agências bancárias em diferentes estados.", "question": "Esse caso está na lista?", "steps": ["O art. 1º inclui furto, roubo ou dano contra instituições financeiras, quando houver indícios de atuação de associação criminosa em mais de um estado (Lei 13.124/2015).", "Há atuação em mais de um estado e associação criminosa.", "Por isso, a PF pode investigar sem prejuízo da polícia estadual."], "conclusion": "Sim. É hipótese do art. 1º.", "variation": {"scenario": "E se um único assalto fosse cometido por alguém sozinho, em um só estado?", "answer": "Falta a atuação interestadual da associação criminosa."}, "pitfall": "Confundir a atribuição para investigar com a competência para julgar.", "articles": ["Art. 1"]}]}$json$::jsonb,
  $json$[{"title": "Lei 10.446/2002 — texto oficial (art. 1º)", "url": "https://www.planalto.gov.br/ccivil_03/leis/2002/l10446.htm", "checked_at": "2026-10-08T03:11:55Z"}]$json$::jsonb,
  '2026-10-08T03:11:55Z',
  'under_review'
from public.study_materials m
where m.slug = 'legislacao-pf-interestadual-revisao'
on conflict (material_slug, version) do nothing;

commit;
