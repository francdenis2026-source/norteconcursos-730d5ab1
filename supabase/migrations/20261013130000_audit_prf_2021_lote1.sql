-- Auditoria PRF 2021 (Policial Rodoviário Federal) — lote 1 (18 itens
-- autossuficientes de Informática, Ética no Serviço Público e Direito de
-- Trânsito). Itens 1-26 (inglês/português, texto de apoio) e 27-32
-- (modelagem matemática com dados-base) dependem de texto não capturado.
-- Itens 40-44 (Física) dependem de figura ("o projétil"/"a mola"). Item 45
-- já está anulado. Item 48 (vista dos autos em comissão de ética) fica de
-- fora por depender de interpretação normativa que não consegui verificar
-- com segurança nesta rodada. Itens 63-65, 68, 70-72 (Direito de Trânsito)
-- dependem de resoluções técnicas específicas do Contran ou de referente
-- não capturado ("o equipamento em questão") — não auditáveis sem risco de
-- erro. Itens 67 e 69 já estão anulados.

update public.official_exam_questions
set review_note=$q$Errado. O autopreenchimento/sincronização de senhas salvas no navegador (Firefox/Chrome) funciona em sítios acessados pela Internet aberta, não apenas em ambientes de intranet — a exigência de HTTPS para login automático também não corresponde a uma limitação exclusiva de redes intranet.$q$
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=33;

update public.official_exam_questions
set review_note=$q$Correto. O Windows permite sincronizar certas configurações (como plano de fundo e histórico de navegação) entre dispositivos vinculados à mesma conta Microsoft, mas não expõe nem compartilha diretamente as senhas salvas de um usuário para outro, por razões de segurança.$q$
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=34;

update public.official_exam_questions
set review_note=$q$Errado. A sintaxe apresentada ("campanha PRF @twitter") não corresponde ao operador correto do Google para restringir a busca a uma rede social/site específico — o operador apropriado no Google é "site:" (ex.: campanha PRF site:twitter.com); "@" é sintaxe própria de menção dentro do próprio Twitter/X, não um operador de busca do Google.$q$
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=35;

update public.official_exam_questions
set review_note=$q$Correto. A Internet das Coisas (IoT) amplia a quantidade e a complexidade dos dados gerados por novas fontes conectadas, influenciando diretamente características clássicas do big data como volume, velocidade e variedade.$q$
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=36;

update public.official_exam_questions
set review_note=$q$Errado. A descrição apresentada (propagação por inserção de cópias de si mesmo em arquivos) é característica de VÍRUS de computador, não de ransomware — a característica definidora do ransomware é a criptografia dos dados da vítima seguida de exigência de resgate, não a autorreplicação por inserção em arquivos.$q$
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=37;

update public.official_exam_questions
set review_note=$q$Errado. A descrição apresentada (ambiente em nuvem no qual usuários podem construir e disponibilizar aplicativos) corresponde ao modelo PaaS (Platform as a Service), não ao SaaS (Software as a Service), em que o usuário apenas consome um software já pronto, sem construir aplicações sobre a plataforma.$q$
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=38;

update public.official_exam_questions
set review_note=$q$Correto. O Código de Ética Profissional do Servidor Público Civil do Poder Executivo Federal (Decreto nº 1.171/1994) trata a ausência injustificada do servidor de seu local de trabalho como fator de desmoralização da função pública, por poder gerar desordem nas relações humanas e prejuízo ao serviço.
Fonte oficial: Decreto nº 1.171/1994, Anexo I (Código de Ética), planalto.gov.br.$q$
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=46;

update public.official_exam_questions
set review_note=$q$Correto. Estratégia, como mecanismo de governança pública, compreende a definição de diretrizes, objetivos, planos e ações necessários para que a organização alcance os resultados pretendidos — conceito consolidado nos referenciais de governança pública (TCU, Decreto 9.203/2017).$q$
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=47;

update public.official_exam_questions
set review_note=$q$Errado. Pela Lei de Acesso à Informação (Lei 12.527/2011), pedidos informais ou simples (como uma solicitação telefônica) devem, sempre que possível, ser respondidos diretamente pelo servidor, sem exigência automática de preenchimento de formulário padrão — o formulário formal é instrumento para pedidos que exigem registro, não condição obrigatória para qualquer solicitação verbal simples.
Fonte oficial: Lei 12.527/2011 (Lei de Acesso à Informação), planalto.gov.br.$q$
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=49;

update public.official_exam_questions
set review_note=$q$Correto. As vedações de nepotismo/impedimento para contratação direta alcançam, em regra, parentes até o terceiro grau (cônjuge, companheiro, pais, filhos, irmãos, tios, sobrinhos) — o primo é parente de quarto grau, fora do alcance dessas vedações, de modo que a contratação, satisfeitos os demais requisitos legais de regularidade, não é vedada só por esse grau de parentesco.
Fonte oficial: Súmula Vinculante 13, STF; jurisprudência sobre nepotismo e grau de parentesco.$q$
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=50;

update public.official_exam_questions
set review_note=$q$Correto. Em rodovias de pista dupla de zonas rurais sem sinalização regulamentadora específica, aplica-se o mesmo limite máximo de velocidade a automóveis, camionetas e motocicletas, conforme a tabela de limites de velocidade do CTB/Contran para esse tipo de via.
Fonte oficial: art. 61, CTB (Lei 9.503/1997), planalto.gov.br.$q$
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=56;

update public.official_exam_questions
set review_note=$q$Correto. O CTB proíbe o uso de cortinas, películas ou outros artifícios que reduzam a visibilidade nas áreas envidraçadas do veículo, mas abre exceção para veículos equipados com dois espelhos retrovisores externos (um de cada lado), que compensam a redução de visibilidade interna.
Fonte oficial: art. 105, CTB (Lei 9.503/1997), planalto.gov.br.$q$
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=57;

update public.official_exam_questions
set review_note=$q$Errado. O dever de preservar o local do acidente, sob pena de responder por infração administrativa específica, está associado principalmente a acidentes com VÍTIMAS (para viabilizar perícia e socorro) — no cenário descrito (acidente sem vítimas, apenas dano patrimonial), a consequência jurídica para quem não preserva o local não é automaticamente essa mesma infração grave.
Fonte oficial: CTB (Lei 9.503/1997), capítulo sobre infrações de trânsito, planalto.gov.br.$q$
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=58;

update public.official_exam_questions
set review_note=$q$Errado. A remoção de veículos envolvidos em acidente com vítimas depende de o socorro já ter sido prestado, mas a realização de perícia no local nem sempre é condição prévia obrigatória para a remoção — a autoridade pode autorizar a remoção após o socorro, conforme as circunstâncias e a necessidade de desobstrução da via, sem que a perícia seja sempre um pré-requisito absoluto.
Fonte oficial: CTB (Lei 9.503/1997), disposições sobre remoção de veículos após acidente, planalto.gov.br.$q$
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=59;

update public.official_exam_questions
set review_note=$q$Correto. Para obter habilitação para conduzir veículo automotor, o candidato precisa, entre outros requisitos, ser penalmente imputável — o inimputável penal não pode obter CNH.
Fonte oficial: art. 140, I, CTB (Lei 9.503/1997), planalto.gov.br.$q$
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=60;

update public.official_exam_questions
set review_note=$q$Errado. A fiscalização de trânsito por videomonitoramento (equipamentos eletrônicos) NÃO independe de sinalização: a legislação exige sinalização específica informando a existência de fiscalização eletrônica de velocidade/trânsito na via, como condição para a validade das autuações.
Fonte oficial: CTB (Lei 9.503/1997) e resoluções do Contran sobre sinalização de fiscalização eletrônica.$q$
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=61;

update public.official_exam_questions
set review_note=$q$Errado. A emissão/atualização do CRLV-e é exigida não apenas em caso de transferência de propriedade, mas também em outras situações de alteração cadastral do veículo (como mudança de endereço/município de residência do proprietário) — não é dispensável nesse caso, como afirma o item.
Fonte oficial: CTB (Lei 9.503/1997) e normas do Renavam sobre atualização cadastral veicular.$q$
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=62;

update public.official_exam_questions
set review_note=$q$Errado. O Anexo I do CTB define como infração CONEXA (não "concomitante") aquela cujo cometimento tem como pressuposto o cometimento de outra infração — o item troca a terminologia correta ("conexa") por um termo que não corresponde à definição legal.
Fonte oficial: Anexo I, CTB (Lei 9.503/1997), planalto.gov.br.$q$
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=66;
