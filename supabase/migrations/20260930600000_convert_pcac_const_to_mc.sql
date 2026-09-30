-- Converte para multipla escolha (formato real da banca IBADE) as 12
-- questoes de Direito Constitucional do lote PC-AC.

update public.curated_question_catalog set
  question_text = 'Comando:
Com base na Constituição Federal de 1988, assinale a alternativa correta.

(A) Conceder-se-á mandado de segurança, e não habeas data, para assegurar o conhecimento de informações relativas à pessoa do impetrante constantes de bancos de dados de entidades governamentais.
(B) O habeas data somente pode ser impetrado após o esgotamento de processo administrativo específico perante o órgão detentor da informação.
(C) Conceder-se-á habeas data para assegurar o conhecimento de informações relativas à pessoa do impetrante, constantes de registros ou bancos de dados de entidades governamentais ou de caráter público, e para a retificação de dados, quando não se prefira fazê-lo por processo sigiloso, judicial ou administrativo.
(D) O habeas data destina-se exclusivamente à retificação de dados, não abrangendo o simples conhecimento de informações pessoais.
(E) O habeas data pode ser impetrado por qualquer pessoa para obter informações de terceiros constantes de bancos de dados públicos.',
  official_answer = 'C',
  explanation = 'A alternativa correta é a C. O art. 5º, inciso LXXII, da Constituição Federal prevê o habeas data como remédio constitucional destinado a garantir o acesso a informações pessoais mantidas em bancos de dados públicos, bem como sua retificação, ressalvada a preferência por processo sigiloso, judicial ou administrativo. A alternativa A troca o remédio cabível; a B exige um requisito inexistente; a D restringe indevidamente o cabimento apenas à retificação; e a E erra ao permitir a busca de dados de terceiros, quando o habeas data protege informações do próprio impetrante.
Exemplo: um cidadão pode impetrar habeas data para saber quais informações constam sobre ele em um cadastro de órgão público e corrigir dado incorreto.'
where external_item_key = 'pcac17-const-01';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base no art. 144 da Constituição Federal de 1988, assinale a alternativa correta.

(A) São órgãos da segurança pública a polícia federal, a polícia rodoviária federal, a polícia ferroviária federal, as polícias civis, as polícias militares e corpos de bombeiros militares, e as polícias penais federal, estaduais e distrital.
(B) A segurança pública é exercida exclusivamente pela polícia federal e pelas Forças Armadas, não competindo aos estados organizar corporações próprias.
(C) As guardas municipais integram o rol constitucional de órgãos de segurança pública em pé de igualdade com as polícias civis e militares.
(D) As polícias penais não integram o rol de órgãos de segurança pública previsto no art. 144 da Constituição Federal.
(E) Compete exclusivamente à União manter órgãos de segurança pública, cabendo aos estados apenas colaborar mediante convênio.',
  official_answer = 'A',
  explanation = 'A alternativa correta é a A. O art. 144 da Constituição Federal enumera os órgãos de segurança pública, entre eles as polícias civis, responsáveis, ressalvada a competência da União, pelas funções de polícia judiciária e pela apuração de infrações penais nos respectivos estados. A alternativa B nega a existência das polícias estaduais; a C equipara indevidamente as guardas municipais (que têm competência mais restrita, ligada à proteção de bens, serviços e instalações municipais); a D é falsa, pois as polícias penais foram incluídas no rol pela EC nº 104/2019; e a E contraria a própria estrutura federativa da segurança pública.
Exemplo: a Polícia Civil do Acre integra esse rol constitucional, exercendo função de polícia judiciária no âmbito estadual.'
where external_item_key = 'pcac17-const-02';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base no art. 5º, XVI, da Constituição Federal de 1988, assinale a alternativa correta.

(A) O direito de reunião pacífica depende de autorização prévia da autoridade competente, sob pena de dissolução imediata do ato.
(B) Todos podem reunir-se pacificamente, sem armas, em locais abertos ao público, independentemente de autorização, desde que não frustrem outra reunião anteriormente convocada para o mesmo local, sendo apenas exigido prévio aviso à autoridade competente.
(C) O direito de reunião somente pode ser exercido em locais fechados, sendo vedada sua realização em vias e praças públicas.
(D) O aviso prévio à autoridade competente é dispensado quando a reunião não envolver mais de cinquenta participantes.
(E) É permitido o uso de armas em reuniões pacíficas, desde que os participantes portem regularmente o registro correspondente.',
  official_answer = 'B',
  explanation = 'A alternativa correta é a B. O art. 5º, XVI, assegura o direito de reunião pacífica e sem armas, dispensando autorização prévia, mas exigindo aviso prévio à autoridade competente. A alternativa A exige indevidamente autorização, quando a Constituição exige apenas aviso; a C restringe o direito a locais fechados, quando a norma fala em locais abertos ao público; a D cria uma exceção numérica inexistente; e a E contraria a exigência constitucional de reunião "sem armas".
Exemplo: um grupo que deseja realizar uma manifestação em praça pública deve apenas avisar previamente a autoridade competente, sem necessidade de pedir autorização.'
where external_item_key = 'pcac17-const-03';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base no art. 6º da Constituição Federal de 1988, assinale a alternativa correta.

(A) São direitos sociais a educação, a saúde, a alimentação, o trabalho, a moradia, o transporte, o lazer, a segurança, a previdência social, a proteção à maternidade e à infância, e a assistência aos desamparados.
(B) A Constituição Federal não prevê rol de direitos sociais, deixando sua definição inteiramente a cargo da legislação infraconstitucional.
(C) O direito à moradia não integra o rol de direitos sociais previsto na Constituição Federal, tratando-se de direito meramente programático sem previsão expressa.
(D) A alimentação foi excluída do rol de direitos sociais pela Constituição Federal, sendo tratada apenas como política pública ordinária.
(E) Os direitos sociais elencados no art. 6º da Constituição Federal aplicam-se exclusivamente aos trabalhadores formalmente empregados.',
  official_answer = 'A',
  explanation = 'A alternativa correta é a A. O art. 6º da Constituição Federal enumera expressamente o rol de direitos sociais, que impõem ao Estado prestações positivas. A alternativa B nega a existência desse rol constitucional expresso; a C e a D negam a inclusão específica de direitos (moradia e alimentação) que estão expressamente previstos no dispositivo; e a E restringe indevidamente os direitos sociais apenas a trabalhadores formais, quando muitos deles (como saúde e educação) são de titularidade universal.
Exemplo: a construção de moradias populares por programas habitacionais concretiza o direito social à moradia previsto expressamente nesse dispositivo constitucional.'
where external_item_key = 'pcac17-const-04';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base no art. 136 da Constituição Federal de 1988, assinale a alternativa correta.

(A) O estado de defesa é decretado pelo Congresso Nacional, por iniciativa do Presidente da República, sem necessidade de oitiva de órgãos consultivos.
(B) O estado de defesa é decretado pelo Presidente da República, ouvidos o Conselho da República e o Conselho de Defesa Nacional, para preservar ou prontamente restabelecer, em locais restritos e determinados, a ordem pública ou a paz social ameaçadas por grave e iminente instabilidade institucional ou atingidas por calamidades de grandes proporções na natureza.
(C) O estado de defesa, uma vez decretado, aplica-se automaticamente a todo o território nacional, independentemente de delimitação de área específica.
(D) O estado de defesa dispensa qualquer controle posterior do Congresso Nacional sobre o ato de decretação presidencial.
(E) O estado de defesa é a única medida excepcional prevista na Constituição Federal para situações de grave instabilidade institucional, não havendo outras hipóteses correlatas.',
  official_answer = 'B',
  explanation = 'A alternativa correta é a B. O art. 136 da Constituição Federal disciplina o estado de defesa como medida excepcional de restrição de direitos em áreas específicas, exigindo a prévia oitiva do Conselho da República e do Conselho de Defesa Nacional antes de sua decretação pelo Presidente. A alternativa A erra ao atribuir a decretação ao Congresso; a C contraria a exigência de áreas restritas e determinadas; a D é falsa, pois o ato deve ser submetido ao Congresso Nacional em até 24 horas; e a E ignora a existência do estado de sítio, outra medida excepcional prevista na Constituição.
Exemplo: uma calamidade natural de grandes proporções em determinada região pode justificar a decretação do estado de defesa restrito àquela área.'
where external_item_key = 'pcac17-const-05';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base no art. 5º, LXIX, da Constituição Federal de 1988, assinale a alternativa correta.

(A) Conceder-se-á mandado de segurança para proteger direito líquido e certo, não amparado por habeas corpus ou habeas data, quando o responsável pela ilegalidade ou abuso de poder for autoridade pública ou agente de pessoa jurídica no exercício de atribuições do Poder Público.
(B) O mandado de segurança é cabível para a proteção de qualquer direito, líquido e certo ou não, desde que praticado por autoridade pública.
(C) O mandado de segurança substitui o habeas corpus sempre que a ilegalidade envolver, ainda que indiretamente, restrição à liberdade de locomoção.
(D) O mandado de segurança somente pode ser impetrado contra atos de autoridades federais, não alcançando autoridades estaduais ou municipais.
(E) O mandado de segurança dispensa a demonstração de liquidez e certeza do direito, bastando a mera alegação de ilegalidade pelo impetrante.',
  official_answer = 'A',
  explanation = 'A alternativa correta é a A. O art. 5º, LXIX, prevê o mandado de segurança como remédio residual, cabível diante de lesão a direito líquido e certo não amparado por habeas corpus ou habeas data. A alternativa B dispensa indevidamente a exigência de liquidez e certeza; a C erra ao pretender substituir o habeas corpus, que é o remédio próprio para liberdade de locomoção; a D restringe indevidamente a autoridades federais; e a E, assim como a B, dispensa a exigência de liquidez e certeza, essencial ao cabimento do remédio.
Exemplo: um candidato que tem seu direito líquido e certo de participar de concurso público negado por ato ilegal da banca examinadora pode impetrar mandado de segurança.'
where external_item_key = 'pcac17-const-06';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base no art. 5º, LI, da Constituição Federal de 1988, assinale a alternativa correta.

(A) Nenhum brasileiro será extraditado, salvo o naturalizado, em caso de crime comum, praticado antes da naturalização, ou de comprovado envolvimento em tráfico ilícito de entorpecentes e drogas afins, na forma da lei.
(B) Tanto o brasileiro nato quanto o naturalizado podem ser extraditados, desde que o crime tenha sido praticado antes da aquisição da nacionalidade brasileira.
(C) O brasileiro naturalizado jamais poderá ser extraditado, gozando da mesma proteção absoluta conferida ao brasileiro nato.
(D) A extradição do brasileiro naturalizado por tráfico de entorpecentes somente é admitida se o crime tiver sido praticado antes da naturalização.
(E) A Constituição Federal veda a extradição de qualquer pessoa, brasileira ou estrangeira, que se encontre em território nacional.',
  official_answer = 'A',
  explanation = 'A alternativa correta é a A. O art. 5º, LI, veda a extradição do brasileiro nato em qualquer hipótese, admitindo a do naturalizado apenas por crime comum praticado antes da naturalização, ou por envolvimento comprovado em tráfico de entorpecentes, independentemente de quando o crime ocorreu. A alternativa B erra ao igualar nato e naturalizado; a C nega a exceção constitucional expressa; a D restringe indevidamente a hipótese do tráfico de drogas ao momento anterior à naturalização, quando a Constituição não faz essa exigência temporal nesse caso; e a E é falsa, pois a vedação constitucional protege apenas o brasileiro (nato integralmente, naturalizado nas hipóteses excepcionadas), não estrangeiros em geral.
Exemplo: um brasileiro naturalizado que praticou crime comum em outro país antes de obter a nacionalidade brasileira pode, em tese, ser extraditado para responder por esse fato.'
where external_item_key = 'pcac17-const-07';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base no art. 5º, III, da Constituição Federal de 1988, assinale a alternativa correta.

(A) Ninguém será submetido a tortura nem a tratamento desumano ou degradante.
(B) A vedação à tortura admite exceção quando praticada por agente público no exercício de investigação criminal de crime grave.
(C) A Constituição Federal veda apenas a tortura física, não alcançando formas de tortura psicológica.
(D) A vedação a tratamento desumano ou degradante aplica-se somente a pessoas presas, não se estendendo aos demais cidadãos.
(E) A tortura é vedada pela Constituição Federal apenas quando praticada contra nacionais brasileiros, não se aplicando a estrangeiros em território nacional.',
  official_answer = 'A',
  explanation = 'A alternativa correta é a A. O art. 5º, III, consagra a vedação absoluta à tortura e a tratamentos desumanos ou degradantes, sem qualquer exceção. A alternativa B cria uma exceção inexistente, já que a vedação é absoluta; a C restringe indevidamente à tortura física; a D limita a proteção a pessoas presas, quando o dispositivo protege qualquer pessoa; e a E introduz uma distinção por nacionalidade inexistente na norma constitucional.
Exemplo: qualquer forma de agressão física ou psicológica utilizada para obter confissão de um preso viola esse dispositivo constitucional, independentemente da gravidade do crime investigado.'
where external_item_key = 'pcac17-const-08';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base no art. 5º, LVII, da Constituição Federal de 1988, assinale a alternativa correta.

(A) Ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória.
(B) A presunção de inocência é afastada a partir do recebimento da denúncia pelo juízo competente.
(C) A presunção de inocência cessa com a condenação em primeira instância, ainda que sujeita a recurso.
(D) A presunção de inocência aplica-se apenas na esfera penal, não produzindo qualquer efeito em processos administrativos disciplinares.
(E) A presunção de inocência é princípio de origem exclusivamente doutrinária, sem previsão expressa no texto constitucional.',
  official_answer = 'A',
  explanation = 'A alternativa correta é a A. O art. 5º, LVII, consagra a presunção de inocência, segundo a qual o acusado deve ser tratado como inocente até decisão condenatória definitiva, da qual não caiba mais recurso. A alternativa B antecipa indevidamente o marco para o recebimento da denúncia; a C antecipa o marco para a condenação em primeira instância, ainda sujeita a recurso; a D nega efeitos do princípio fora da esfera penal, quando a jurisprudência reconhece sua irradiação para outras esferas; e a E é falsa, pois o princípio está expressamente previsto no texto constitucional.
Exemplo: um investigado, ainda que denunciado pelo Ministério Público, não pode ser tratado publicamente como culpado antes do trânsito em julgado de eventual condenação.'
where external_item_key = 'pcac17-const-09';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base no art. 60, § 4º, da Constituição Federal de 1988, assinale a alternativa correta.

(A) Não será objeto de deliberação a proposta de emenda constitucional tendente a abolir a forma federativa de Estado, o voto direto, secreto, universal e periódico, a separação dos Poderes, e os direitos e garantias individuais.
(B) As cláusulas pétreas podem ser abolidas mediante emenda constitucional aprovada por três quintos dos votos em cada Casa do Congresso Nacional, em dois turnos.
(C) A separação dos Poderes não integra o rol de cláusulas pétreas previsto na Constituição Federal.
(D) As cláusulas pétreas podem ser suprimidas por meio de referendo popular, ainda que não por emenda constitucional.
(E) O rol de cláusulas pétreas pode ser ampliado ou reduzido livremente por lei complementar federal.',
  official_answer = 'A',
  explanation = 'A alternativa correta é a A. O art. 60, § 4º, elenca as cláusulas pétreas, núcleo imodificável da Constituição, que não pode ser suprimido nem mesmo por emenda constitucional, seja qual for o quórum de aprovação. A alternativa B admite indevidamente a abolição por emenda, ainda que qualificada; a C nega a inclusão da separação dos Poderes, que está expressamente prevista; a D admite supressão por referendo, o que também é vedado; e a E é falsa, pois o rol de cláusulas pétreas está na própria Constituição, não podendo ser alterado por lei complementar.
Exemplo: uma proposta de emenda constitucional que pretendesse transformar o Brasil em Estado unitário, abolindo a autonomia dos estados-membros, seria inconstitucional por violar cláusula pétrea.'
where external_item_key = 'pcac17-const-10';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base no art. 5º, LIV, da Constituição Federal de 1988, assinale a alternativa correta.

(A) Ninguém será privado da liberdade ou de seus bens sem o devido processo legal.
(B) O devido processo legal aplica-se apenas a processos judiciais, não alcançando procedimentos administrativos.
(C) A privação de bens de particulares pelo Poder Público prescinde de processo legal quando fundada em razões de urgência declaradas pela própria autoridade.
(D) O devido processo legal é garantia exclusiva de réus em processos criminais, não se estendendo a questões cíveis ou administrativas.
(E) A garantia do devido processo legal pode ser afastada por lei ordinária em hipóteses de relevante interesse público.',
  official_answer = 'A',
  explanation = 'A alternativa correta é a A. O art. 5º, LIV, consagra o devido processo legal como garantia fundamental, aplicável a qualquer restrição legítima à liberdade ou ao patrimônio. A alternativa B restringe indevidamente o alcance a processos judiciais; a C dispensa indevidamente o processo em razão de mera alegação de urgência da própria autoridade; a D restringe a garantia à esfera criminal; e a E é falsa, pois se trata de garantia constitucional que não pode ser afastada por lei ordinária.
Exemplo: a apreensão de bens de um investigado sem qualquer procedimento formal e sem oportunidade de manifestação viola o devido processo legal.'
where external_item_key = 'pcac17-const-11';

update public.curated_question_catalog set
  question_text = 'Comando:
Com base no art. 5º, XXXIV, "a", da Constituição Federal de 1988, assinale a alternativa correta.

(A) São a todos assegurados, independentemente do pagamento de taxas, o direito de petição aos Poderes Públicos em defesa de direitos ou contra ilegalidade ou abuso de poder.
(B) O direito de petição está condicionado ao pagamento de taxa administrativa fixada por cada órgão público destinatário.
(C) O direito de petição somente pode ser exercido por meio de advogado regularmente inscrito na Ordem dos Advogados do Brasil.
(D) O direito de petição restringe-se à defesa de direitos individuais próprios, não abrangendo denúncias de ilegalidade ou abuso de poder contra terceiros.
(E) O direito de petição é assegurado apenas a cidadãos brasileiros, não se estendendo a estrangeiros residentes no país.',
  official_answer = 'A',
  explanation = 'A alternativa correta é a A. O art. 5º, XXXIV, "a", garante o direito de petição, gratuito, como instrumento de participação direta perante o Poder Público. A alternativa B exige indevidamente pagamento de taxa, expressamente vedado pela norma; a C exige a intermediação de advogado, o que não é requisito constitucional para o exercício desse direito; a D restringe indevidamente o objeto do direito de petição; e a E limita a titularidade a brasileiros, quando o texto constitucional assegura o direito "a todos".
Exemplo: um cidadão pode dirigir petição gratuita a um órgão público denunciando conduta abusiva de um agente estatal, sem necessidade de contratar advogado ou pagar qualquer taxa.'
where external_item_key = 'pcac17-const-12';
