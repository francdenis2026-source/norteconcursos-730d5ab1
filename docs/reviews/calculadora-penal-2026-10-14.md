# Revisão da calculadora penal — 14/10/2026

A calculadora passa a apresentar simulações didáticas e vínculos de consulta, sem afirmar concessão de benefícios ou extinção da punibilidade.

## Correções

- A pena total continua sendo a base dos benefícios, sem corte pelo limite de cumprimento do CP, art. 75. A distinção é indicada com referência à Súmula 715/STF; o limite aplicável também depende da lei no tempo.
- Detenção não recebe fechado como indicação de regime inicial. Reincidente com reclusão de até quatro anos e circunstâncias favoráveis tem indicação de possibilidade de semiaberto, com Súmula 269/STJ. Circunstâncias desfavoráveis não produzem agravamento automático.
- Dosimetria valida inteiros, limites das oito circunstâncias, frações e penas. Despreza frações de dia. Identifica a compensação aritmética como simplificação, sem resolver preponderância, bis in idem ou cumulação jurídica de causas.
- Progressão exige confirmação da regra aplicável ao exercício. Há fração manual para não impor a redação cadastrada a fatos anteriores. Livramento pode ser marcado como vedado; perfil hediondo não apresenta a projeção comum de 1/3 ou 1/2.
- Datas vazias e inexistentes são rejeitadas. Datas civis são calculadas por calendário; inclui-se o primeiro dia. A data-base inicial sugerida vem do dia do Acre.
- Remição usa blocos de 12 horas previamente conferidos, cada bloco distribuído em pelo menos três dias, em vez de inferir a distribuição a partir de totais agregados. O resultado é transferido para Execução, sem reconhecimento judicial automático.

## Navegação e interface

As abas mantêm o estado. A interface usa controles de abas com navegação por teclado e layout responsivo. A referência do crime escolhido abre o diploma/artigo correspondente quando o percurso está disponível. A aba Execução inclui CP 42/75/83 e CPP 387. O catálogo permite pesquisar todos os percursos ativos vinculados a editais, inclusive legislação especial, e abrir sua fonte oficial. Referências de súmulas remetem aos portais competentes; notas jurídicas reutilizam as já revisadas na biblioteca.

## Evidência e limites jurídicos

A consulta direta a Planalto, STJ e STF não foi reconferida nesta sessão: as tentativas de acesso ao Planalto/STJ retornaram bloqueio de rede 403. Não se registra nova data de conferência jurídica nem se altera texto de lei, enunciado, banco de questões ou banco de dados. As penas/frações do catálogo já existente mantêm sua data registrada de 12/10/2026, apresentada ao usuário. Evidências históricas no repositório incluem `docs/library/cp-final-lote-2-sources-2026-10-12.json` e `docs/library/lep-lote-2-sources-2026-10-13.json`.

Links de acervo não significam que todas as leis e decisões foram incorporadas ao motor de cálculo. Não há enquadramento automático do fato, unificação, concurso de crimes, multa, interrupções da execução, análise completa de requisitos subjetivos ou declaração de prescrição. A prescrição exibida é hipótese simples, não cálculo retroativo/intercorrente; termo inicial e Tema 788/STF exigem consulta específica.

## Validação

505 testes passaram, incluindo regressões para base integral dos benefícios, regime de detenção, Súmula 269, frações de dia, referências do crime e datas inválidas/fim de mês. Typecheck e build de produção passaram. A interface foi exercitada em Chromium com autenticação e catálogo simulados, sem acesso a contas reais: troca de abas com preservação de estado, transferência de 42 dias de remição, confirmação de execução, validação de data vazia, referência da Lei de Drogas e ausência de overflow em 320/390 px. A verificação encontrou e corrigiu overflow no link do crime selecionado. Não foi validado o site publicado com uma conta real.

## Destaques e exemplos didáticos

A atualização seguinte acrescenta seleção do diploma do exemplo (CP, Drogas, Armas ou limites manuais), filtrando os crimes desse diploma. Ao trocar de crime, fases e reincidência são zeradas para evitar herdar o resultado de outro cenário. Um painel destaca mínimo, máximo, espécie e pena simulada, distinguindo intervalo previsto e pena final do exercício.

Os exemplos numéricos acompanham cada etapa da dosimetria, inclusive a terceira fase sem causas selecionadas; regime; progressão com abatimentos; livramento elegível, incompatível ou vedado; prescrição simples; e remição. Mostram cenário hipotético, conta, conclusão e limites, com links do CP/LEP. Reutilizam os resultados e regras existentes, sem criar novos crimes, questões ou afirmações de nova vigência. Não inventam um enquadramento fático nem uma decisão judicial.

Validação desta atualização: 507 testes passaram, typecheck e build passaram. Chromium, com dados simulados, confirmou a seleção da Lei de Drogas destacando 5/15 anos e reclusão, reinício das circunstâncias ao trocar a lei, identificação do crime nos exemplos, terceira fase sem causas, preservação entre abas, transferência da remição e ausência de overflow nas quatro abas em 320/390 px. O site publicado com conta real não foi verificado.

## Enquadramento, vedações e leitura compacta

O painel de penas e as três fases recebem cores próprias nos modos claro e escuro. Uma matriz por modalidade distingue hediondo, equiparado, modalidade comum e ausência de enquadramento. As indicações de progressão, livramento, fiança, indulto, graça, anistia, substituição, sursis, saída temporária e monitoração eletrônica ficam em resumos compactos; cada item abre condições e fundamento. Não há concessão automática, inferência de hediondez pelo número de anos ou presunção de decreto anual de indulto.

Homicídio simples exige indicação de atividade típica de grupo de extermínio para a classificação correspondente. Arma de uso restrito não é automaticamente a modalidade de uso proibido. O perfil de tráfico selecionado é o caput sem reconhecimento do privilégio do §4º; escolher uma fração de diminuição não reconhece os requisitos desse privilégio. Esses recortes são explícitos. As regras apresentadas são do perfil cadastrado, com ressalva da lei no tempo e das decisões pertinentes, não uma análise jurídica de qualquer fato histórico.

A execução mantém o vínculo com o crime selecionado e permite importar a pena simulada. Perfis de progressão incompatíveis com a modalidade ficam desabilitados. Perfis comuns de livramento não se misturam ao especial; reincidência específica e categorias que vedam livramento bloqueiam as opções numéricas pertinentes. Pena inferior a dois anos também desabilita os perfis numéricos. Limites objetivos de substituição e sursis atualizam os avisos da pena simulada. Causas manuais exigem habilitação após conferência do fundamento, sem presumir causa pelo crime selecionado.

Saída temporária é separada da permissão de saída com escolta. O recorte atual da LEP 122 é explicitado com as ressalvas de aplicação temporal; não se presume saída para visita familiar. No equiparado, a interface exige análise do alcance da regra, sem estender automaticamente a expressão legal. Monitoração é indicada como dependente das hipóteses legais e de determinação judicial; não substitui requisitos ou afasta vedação de benefício.

O dispositivo selecionado é lido de `legal_course_units`, apenas como `current`, dentro de percurso ativo vinculado a edital, com data de conferência e fonte cadastradas. Notas jurisprudenciais existentes são reutilizadas e deduplicadas. Há aviso antes do texto literal quando necessária leitura judicial, especialmente para armas, drogas e hediondos. Trechos sobre fiança/liberdade provisória afastados por decisões não são convertidos em bloqueio automático.

Foi realizada consulta somente de leitura no Supabase para CP, CPP, LEP, Hediondos, Drogas e Armas, incluindo LEP 120, 122, 146-B e 146-C. Nenhum dado foi alterado. Os registros consultados trazem conferência em 10/10/2026; as revisões editoriais do repositório também contêm evidências posteriores. As novas tentativas diretas ao Planalto e STJ em 14/10/2026 continuaram bloqueadas pela rede com 403. Não se registra nova conferência oficial de vigência, nem se certifica todo controle constitucional ou jurisprudência posterior. Permanecem relevantes as evidências e ressalvas já revisadas no repositório, como `docs/library/cp-final-lote-3-sources-2026-10-12.json`, `docs/library/arms-caption-corrections-2026-10-12.json` e `src/lib/legalStudyCaveats.ts`.

A barra compartilhada do modo foco passa a ocupar espaço no fluxo da leitura, usando posicionamento sticky e controles menores, sem o antigo espaçamento fixo de 96 px. A altura real é observada para posicionar ferramentas e compensar rolagem até artigos. O painel lateral conserva largura máxima de 384 px; o estilo dos filhos da leitura não amplia esse painel.

Validação: 511 testes passaram, incluindo enquadramento por modalidade, vedações, compatibilidade de progressão/livramento, requisitos quantitativos e saída/monitoração. Typecheck e build passaram. Chromium com autenticação/banco simulados verificou cores distintas das três fases nos dois temas, bloqueios de perfis, reincidência específica, leitura de artigo com ressalva da ADI 3112, ausência de overflow em 320/390 px e barra de foco compacta sem sobreposição, com ferramentas abaixo dela em 1280/390/320 px. Não foi validada uma conta real no site publicado.

## Perfil compartilhado de primariedade e reincidência

Foram incluídos botões Primário/Reincidente acima das abas, com antecedentes, natureza da condenação anterior e indicação específica para hediondo/equiparado. Os pressupostos de reincidência são remetidos aos arts. 63 e 64 do CP; a ferramenta recebe dados do exercício, sem verificar antecedentes reais ou presumir reincidência pela existência de processo.

O perfil compartilhado entra uma vez na segunda fase da dosimetria, separado de outras agravantes. A fração continua sendo um critério didático configurável, sem representar incremento legal obrigatório de 1/6. Não há valoração automática de maus antecedentes: o aviso exige conferir as circunstâncias do art. 59 e adverte contra usar a mesma condenação como fundamento duplicado. O regime considera o perfil e os fatores desfavoráveis informados, mantendo as ressalvas jurídicas existentes.

Progressão usa a sugestão correspondente ao perfil e à modalidade no catálogo revisado. Reincidência genérica em hediondo/equiparado não recebe automaticamente a fração do primário ou do reincidente específico: fica em fração manual, inicialmente inválida, exigindo análise e preenchimento. Livramento comum de 1/3 exige bons antecedentes informados e ausência de reincidência em crime doloso; a natureza da condenação anterior precisa ser informada para orientar o perfil reincidente. Dados insuficientes não são apresentados como vedação legal absoluta. A hipótese especial e suas vedações seguem a classificação selecionada e as ressalvas temporais.

A execução herda a pena da dosimetria por padrão; o aluno pode registrar uma pena fixada manualmente. O botão “Calcular marcos com este perfil” exige conferência da regra e dados válidos. Alterações de perfil ou dados invalidam a confirmação anterior. A prescrição em abstrato herda a máxima do crime selecionado; a executória herda a pena simulada, com opção manual. Reincidência altera o prazo apenas na executória, conforme CP 110, e não aumenta automaticamente a faixa em abstrato do CP 109.

O resultado distingue a duração integral do exercício de reconhecimento judicial de extinção e ordem de soltura. Remete ao juízo da execução (LEP 66, II), aos requisitos próprios do CPP e ao período depurador do CP 64, I. Nenhuma decisão judicial ou situação real do condenado é produzida pela ferramenta.

Validação: 514 testes passaram, typecheck e build passaram. Chromium com autenticação e dados legais simulados confirmou: perfil compartilhado; agravante única e pena ilustrativa de 6 para 7 anos pelo critério de 1/6; progressão comum com violência de 25% para 30% no recorte cadastrado; livramento de 1/3 para 1/2 com dados apropriados; botão de cálculo e invalidação da conferência; prescrição executória de 16 para 12 anos ao mudar o perfil e a pena vinculada, mantendo 16 anos na hipótese abstrata do mesmo crime; reincidente genérico em hediondo com fração manual inválida; reincidente específico com perfil de 80% e livramento não habilitado; ausência de overflow em 320/390 px. Não foi validada uma conta real no site publicado. Mantêm-se os limites de vigência e consulta oficial registrados acima.

## Reorganização do painel e catálogo conectado ao acervo

- Separação entre campos principais, ajustes avançados e consulta de impedimentos. Institutos sem aplicação confirmada saem da grade principal; motivos continuam disponíveis em uma seção recolhida.
- Ícones de informação são botões acessíveis que abrem conceito, situação do exercício e fundamento.
- Seletor consulta as leis ativas vinculadas ao conteúdo programático no Supabase, além dos três grupos com crimes parametrizados. Consulta de leitura em 14/10 encontrou 42 leis ativas e 44 dispositivos na Lei Antifacção. Isso verifica presença no acervo, não certifica nova atualização de vigência.
- Dispositivos com menção a pena privativa podem ser consultados e seus limites usados em um exercício após conferência explícita. Sugestão textual conservadora distingue unidades, rejeita alternativas, revogações e intervalos incoerentes; não interpreta qualificadoras ou remissões como enquadramento automático.
- Leis sem regras parametrizadas não geram automaticamente regime, progressão, livramento ou prescrição. Limites conferidos e identificação da fonte são preservados ao alternar abas; trocar lei, crime ou dispositivo limpa o exercício anterior.
- Retirada de controles genéricos de majorantes/minorantes: não havia vínculo com a modalidade escolhida. A interface informa falta de parametrização, sem afirmar inexistência de causas na lei. O cálculo principal mantém as três fases, sem aplicar frações especiais não conferidas.
- Livramento e suas projeções aparecem somente quando o perfil permite o cálculo; opções de progressão são filtradas pelo enquadramento e perfil compartilhado.

Escopo: os crimes anteriormente parametrizados mantêm suas regras; consultar uma nova lei não equivale a parametrizar todas suas modalidades. A consulta oficial atual permanece sujeita ao bloqueio de rede documentado anteriormente. Sem alteração de dados jurídicos no banco.

Validação: 517 testes passaram, incluindo regressões do reconhecimento textual conservador. Verificações de interface usam autenticação simulada e cópia de leitura do acervo, sem testar publicação em produção.

Verificação final: TypeScript e build de produção concluíram sem erro. No navegador isolado, passaram abertura/fechamento das explicações, consulta recolhida de impedimentos, seleção da Lei Antifacção com dados lidos do acervo, conferência explícita dos limites, preservação do exercício ao alternar abas, bloqueio dos cálculos não parametrizados e ausência de transbordamento nas quatro abas em 320 e 390 px. O fluxo de primariedade/reincidência também passou, incluindo invalidação da confirmação, frações compatíveis, prescrição executória e ocultação do livramento vedado. Sem erros de JavaScript nesse teste.
