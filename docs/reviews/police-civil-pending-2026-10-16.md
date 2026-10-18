# Continuação da fila de questões das Polícias Civis — 16/10/2026

## Primeiro lote: Rondônia, 59 pendências resolvidas

Foram revisadas individualmente e publicadas como ativas **59 questões do concurso PC/RO 2022**: delegado 19, agente 17, escrivão 15 e datiloscopista oito. Cada comentário inclui explicação, exemplo e exercício respondido. Enunciados, cinco alternativas, gabaritos definitivos, extrações, disciplinas e referências originais foram preservados. As URLs históricas do Drive continuam nos identificadores de origem; a evidência desta revisão usa os PDFs oficiais do Cebraspe e seus hashes, sem alegar reparo integral de toda a proveniência antiga.

O catálogo oficial `PC_RO_22` foi consultado na API do Cebraspe e foram recuperados 19 PDFs, incluindo abertura, duas retificações consultadas, cadernos e gabaritos definitivos dos quatro cargos. O concurso de 2022 permanece com publicações de fases posteriores em 2026: não é anunciado como concurso novo de 2026. As retificações 5/2022 e 1/2023 consultadas não alteram os recortes programáticos usados no lote. Essa análise não certifica cada detalhe dos 98 documentos do catálogo.

Os quatro registros de edição apontavam para cadernos em vez de edital. Foram corrigidos para a abertura oficial, preservando as fontes antigas e os tópicos provisórios. Foram registrados **nove fontes oficiais e 17 recortes de tópicos**, normalizados por disciplina e extraídos do programa do próprio cargo. São metadados de pertinência; não novas questões ou materiais redundantes, nem aprovação em massa dos demais itens.

O confronto automatizado examinou 385 registros de Rondônia: 240 comparações de texto e alternativas ficaram completas com o extrator utilizado; 118 desses registros estavam pendentes. Os outros resultados exigem reconciliação da extração, especialmente comandos, cabeçalhos, fórmulas e imagens, e não significam automaticamente divergência com a prova. As 59 questões publicadas pertencem ao subconjunto com enunciado, cinco alternativas e letra definitiva correspondentes, além da conferência jurídica individual. Os 385 gabaritos registrados correspondem às letras dos respectivos definitivos recuperados.

Foram consultados novamente CF, CP, CPP, LINDB, CC, Lei 9.784/1999, prisão temporária, Lei 12.830/2013 e Lei 13.848/2019 no Planalto. Os comentários distinguem, entre outros pontos, flagrante ilegal de eventual novo título preventivo; ausência de vínculo subjetivo na autoria colateral; os requisitos da embriaguez fortuita; promessa de cura infalível; exceção da escusa familiar para vítima de 60 anos ou mais; a capacidade da pessoa de testemunhar e o regime específico de compromisso; e proibição de transformar regra federal de agência reguladora em aplicação automática de todos os detalhes a entes locais.

A referência de autotutela foi acompanhada do devido processo, conforme a fonte institucional do STF sobre o RE 594.296, sem apresentar a Súmula 473 como autorização irrestrita para retirar vantagens. A fonte da Lei 13.848/2019 estava `em_revisao`; a primeira validação bloqueou a publicação. Após conferência expressa do art. 3º e captura oficial com hash, sua vigência foi registrada pelo fluxo próprio, preservando metadados e notas anteriores. A vigência da fonte não certifica revisão editorial de todos os dispositivos ou comentários.

As salvaguardas foram reforçadas: catálogo da API só é aceito com captura e hash, mesmo evento e nome exato do PDF; `--dry-run` de questões pendentes agora consulta o banco e os vínculos sem escrever; transição de fonte em revisão exige captura e compara todos os campos anteriores na gravação. **71 testes passaram**, sem falhas ou ignorados. Não houve alteração de aplicação neste lote e não foi executado build para as mudanças de scripts/dados.

A leitura posterior confirmou **59 itens ativos e elegíveis**, com os **outros 2.909 registros de Polícia Civil preservados**, sem desaparecimentos ou alterações concorrentes. Foram conferidos também as quatro edições, as nove fontes criadas, a transição de uma fonte e os 17 tópicos, sem alterações nos demais metadados comparados.

Restam **175 questões `under_review`**: RO 97, PE 39, MT 20, MG seis, AM cinco, PI quatro, RJ duas e SE duas. O conjunto atual da PCDF permanece concluído com 111 itens. Essa redução não significa auditoria completa das demais provas ativas.

## Fontes estaduais e acesso

Os portais legislativos necessários a algumas questões estaduais não estão liberados na rede atual. A chamada ao SAPL/RO teve erro de proxy `CONNECT 403`. Um rascunho aditivo preservou os 42 domínios existentes e acrescentou 13 destinos de fontes estaduais, Senado, IBGE e STF. É necessário revisar/aplicar e publicar a configuração do ambiente; salvar o rascunho não aplica a liberação em execução. A tarefa prossegue com as fontes disponíveis, sem substituir norma estadual por lei federal apenas para liberar questões.

Snapshots, PDFs, capturas e pacotes completos permanecem em `outputs/pc-pending-review-2026-10-16/`, fora do Git. O relatório JSON versiona comentários, escopo e hashes, sem credenciais.

## Continuação — mais dez questões publicadas

Foram conferidas visualmente e publicadas outras dez questões: delegado 15, 33 e 95; agente 66, 71, 75 e 85; escrivão 75, 82 e 85. Os falsos sinais de divergência do extrator foram confrontados com as páginas oficiais, sem alterar enunciados, alternativas ou letras definitivas. Cada item recebeu comentário, exemplo e exercício respondido, com referência normativa atual.

A questão 71 de agente distingue expressamente o feminicídio como qualificadora histórica de 2022 e como crime autônomo atual do art. 121-A, com a mudança da Lei 14.994/2024 e vedação de retroatividade mais gravosa. A causa de aumento relativa ao pós-parto não foi confundida com presença de descendente. Os demais comentários abordam limites do estado de defesa, erro de proibição inevitável, bens inconsumíveis, suspensão de direitos políticos, ingresso domiciliar, embriaguez culposa, identificação civil na preventiva, elegibilidade militar e legalidade estrita na autoacusação falsa de contravenção.

Os dois pacotes passaram por pré-validação integral no banco sem escrita e publicação com comparação de todos os campos anteriores. O snapshot posterior confirmou os dez ativos e elegíveis e a preservação dos outros 2.958 registros de Polícia Civil, sem alterações nos metadados. Não houve mudanças de aplicação nem necessidade de build adicional.

**Resultado acumulado desta etapa: 69 questões de RO publicadas; pendências de Polícia Civil reduzidas de 234 para 165.** Restam RO 87, PE 39, MT 20, MG seis, AM cinco, PI quatro, RJ duas e SE duas. O conjunto tem 2.968 registros físicos: 2.550 ativos (2.120 elegíveis pelo filtro atual da aplicação), 165 em revisão, 210 arquivados, seis obsoletos e 37 anulados. Ativo não significa integralmente auditado nesta campanha.

## Continuação — 30 decisões individuais adicionais

Foram publicadas mais 30 decisões de revisão de RO: 28 questões ativadas e duas arquivadas editorialmente por ambiguidade, sem alterar gabaritos oficiais nem afirmar anulação pela banca. Delegado 58 (CDC): a alternativa sobre pessoa acima de 70 anos também está dentro do critério legal maior de 60. Datiloscopista 81 (CADH): não se deve ensinar que é proibida toda declaração voluntária de culpa para defender uma resposta exclusiva. Os comentários expõem os problemas e preservam o histórico.

O lote conferiu depoimento especial, investigação por delegado, colaboração premiada, direitos da pessoa idosa, Direito Ambiental, PPP, capacidade de saneamento da CDA, substituição tributária, classificações doutrinárias e Direitos Humanos. O art. 99 do Estatuto da Pessoa Idosa foi atualizado com as penas da Lei 15.163/2025, sem retroatividade mais gravosa. A explicação ambiental distingue a pena inferior a quatro anos da hipótese alternativa de crime culposo e dos demais requisitos para substituição.

Foram consultados textos oficiais atuais do Planalto e informativos do STJ: suspeição policial (REsp 1.942.942/RO), busca pessoal (RHC 158.580/BA), domicílio (HC 762.932/SP) e limites do trancamento, incluindo REsp 2.213.678/MG de 2026. A ADI 3454 foi conferida em publicação institucional do STF para os limites da requisição entre entes federativos. As classificações doutrinárias foram identificadas como tais, sem atribuí-las literalmente a artigos legais.

Registrados cinco recortes de fontes federais e seis recortes programáticos: três blocos adicionais de delegado e Direitos Humanos de agente, escrivão e delegado. Os tópicos provisórios anteriores foram mantidos. O snapshot posterior confirmou as 30 decisões e a preservação dos outros 2.938 registros PC e dos metadados preexistentes. As 28 novas ativas são elegíveis na aplicação. Pré-validação e gravações mantiveram comparação integral do estado anterior; não houve alterações de aplicação ou build adicional.

**Acumulado RO: 99 decisões (97 ativações e dois arquivamentos editoriais). Pendências: 135 — RO 57, PE 39, MT 20, MG seis, AM cinco, PI quatro, RJ duas e SE duas.** Acervo físico PC: 2.968 registros, sendo 2.578 ativos (2.148 elegíveis), 212 arquivados, 135 em revisão, 37 anulados e seis obsoletos. Os estados ativo e elegível não equivalem a certificação integral de auditoria editorial.

O portal executivo de RO encontrado na pesquisa oferece compilação da LC 68 somente até 2014; isso não foi aceito como prova de vigência integral em 2026. A necessidade de acesso legislativo permanece. O domínio oficial da ALEPE foi acrescentado ao rascunho, preservando os 55 anteriores; aplicar/publicar a configuração segue sendo ação do ambiente. A continuação em PE já localizou o catálogo oficial PC_PE_23 e os PDFs de edital atualizado e chaves definitivas, sem considerar sua mera recuperação como revisão concluída.

## Pernambuco — primeiro lote de 12 decisões

Foram publicadas 11 ativações (agente 36, 39, 41 a 45; escrivão 39; delegado 2, 20 e 22) e uma retirada como obsoleta para o treino atual (delegado 60), preservando as letras definitivas. Onze comandos/contextos foram restaurados em fluxo separado; extrações brutas, disciplinas e fontes originais não foram substituídas. Os exercícios de lógica foram resolvidos independentemente: 63 dias no mutirão, 70/90 remanescentes, quatro linhas da tabela-verdade, negação e equivalência da condicional, distinção entre validade formal e verdade dos fatos, e 4/52 para tentativas distintas da senha.

O catálogo PC_PE_23 forneceu a abertura atualizada conforme Edital 4, matrizes e chaves definitivas. Foram recuperados 11 PDFs; nenhuma matriz preliminar substituiu a resposta definitiva. A versão de delegado já registrada é a atualizada, enquanto o catálogo também conserva a versão anterior sem efeito; não se afirma que todos os registros usavam a anterior. Seis fontes existentes receberam somente notas adicionais de evidência e data de conferência, preservando toda identidade documental. A abertura passou a ser a fonte de três edições que apontavam para cadernos.

Foram registrados seis recortes programáticos e reutilizados os dois tópicos correntes já existentes de Direito Constitucional e Administrativo do delegado. A primeira validação impediu duplicação dos tópicos existentes; a comparação identificou apenas cabeçalhos e números de página no texto anterior, sem substituir seu conteúdo.

A questão 60 preserva D como gabarito histórico e a informação de que o art. 112, § 3º, III, prevê um oitavo com requisitos cumulativos. Sua justificativa sobre perfil genético, porém, usa suporte substituído pela Lei 15.295/2025, publicada no DOU de 22/12/2025 com vacância de 30 dias. O § 5º atual não reproduz a antiga vedação expressa de busca familiar. O item fica fora do treino atual; não se declara B correta nem se altera a letra oficial por inferência. A restauração de ADPF usa os requisitos da Lei 9.882/1999; autotutela preserva o devido processo e os limites legais.

O fluxo específico de revisão de evidência de fonte existente compara todos os campos anteriores, exige PDF/catálogo com hashes e permite apenas acrescentar notas e avançar a conferência; não altera URL, título, emissor, situação ou vínculos. **32 testes passaram**, sem falhas ou ignorados. O snapshot confirmou as 12 decisões, 11 elegíveis e os outros 2.956 registros de Polícia Civil preservados. Houve 41 mudanças externas em texto/situação de tópicos, observadas separadamente; não foram sobrescritas. Os metadados planejados do lote coincidem com a gravação.

**Pendências atuais: 123 — RO 57, PE 27, MT 20, MG seis, AM cinco, PI quatro, RJ duas e SE duas.** Desde as 234 iniciais, 111 decisões em RO/PE foram concluídas: 108 ativações, dois arquivamentos editoriais e uma obsolescência. Acervo físico: 2.968 registros, com 2.589 ativos (2.159 elegíveis), 212 arquivados, 123 em revisão, 37 anulados e sete obsoletos. A continuidade gráfica depende também de garantir exibição das figuras antes de ativar os itens correspondentes.

## Pernambuco — nove ativações adicionais e recuperação de figuras

Publicados agente 21, 27, 28, 37, 55, 56, 57 e 59, e escrivão 30. Oito contextos foram restaurados em operação separada; letras oficiais, extrações brutas, disciplinas e vínculos de origem foram preservados. A questão 30 já continha o trecho suficiente para resolver o item; a nota anterior de falta de suporte não justificava mantê-la retida após o cotejo visual.

Português recebeu interpretação contextual, concessão, significado de panorâmica e distinção entre correção gramatical e preservação de sentido ao retirar o pronome. Probabilidade foi resolvida por condicionais e união (resultado 0,6), e independência coletiva (0,0024 = 0,24%). Excel trata de transposição; Estatística distingue amplitude (57 − 34 = 23) e alocação de Neyman (maior produto N × desvio padrão no estrato III). Todos receberam exemplo e teste respondido. Um recorte de Estatística do edital oficial, página 62, foi registrado sem substituir o tópico histórico.

As três figuras foram recortadas das páginas oficiais 8, 16 e 17, inspecionadas visualmente e publicadas em armazenamento público com nomes vinculados ao hash, sem sobrescrita. As capturas contêm somente os elementos necessários, sem respostas ou justificativas. O fluxo de restauração agora exige evidência individual de cada imagem, valida endereço e formato e compara os bytes públicos ao hash do arquivo revisado antes de escrever qualquer questão. O texto inclui descrição acessível.

As pré-validações no banco não fizeram escrita; publicações usaram comparação integral e leitura de retorno. O snapshot confirmou nove ativas elegíveis e os outros 2.959 registros PC preservados; nenhum metadado preexistente mudou entre os snapshots. Os 26 testes pertinentes passaram, sem falhas ou ignorados. Não houve alteração de aplicação; o build anterior permanece a última verificação de aplicação.

**Pendências: 114 — RO 57, PE 18, MT 20, MG seis, AM cinco, PI quatro, RJ duas e SE duas.** Acervo físico PC: 2.968 registros, com 2.598 ativos (2.168 elegíveis), 212 arquivados, 114 em revisão, 37 anulados e sete obsoletos. A campanha registra 231 decisões PCDF/RO/PE; os estados ativo e elegível não certificam auditoria integral de todos os registros.

## Pernambuco — Arquivologia e responsabilidade da concessionária

Publicadas escrivão 53 e 10. A primeira teve comando restaurado e comparação individual com o e-ARQ Brasil versão 2, aprovado pela Resolução CONARQ 50/2022: acessibilidade exige transmissão para outros sistemas sem perda de informação e funcionalidade (PDF, página 30; página impressa 29). O comentário diferencia confiabilidade, unicidade, relação orgânica e autenticidade, com exemplo e exercício respondido. Registrado apenas o recorte de gestão de documentos do programa de escrivão, página 68, sem substituir o tópico histórico nem certificar toda a legislação arquivística.

A questão 10 apontava para caderno e gabarito do bloco específico PE002, embora pertença ao bloco básico PECB2. Foram registrados os dois documentos oficiais básicos, cotejados com o catálogo, página 6 do caderno e chave definitiva B. O fluxo de proveniência conferiu ausência de duplicata e comparou todos os campos anteriores antes de corrigir os vínculos; a letra e a extração bruta foram preservadas. O comando foi restaurado em fluxo separado. A revisão jurídica usa o art. 37, § 6º, da CF e o programa do próprio cargo: responsabilidade objetiva, risco administrativo, conduta/dano/nexo e distinção da ação regressiva por dolo ou culpa. Não se afirma que os demais itens básicos já tenham sua proveniência auditada.

Após integração das alterações remotas de página inicial, **599 testes da aplicação e o build passaram**. Os 26 testes de publicação, contexto, tópico e mídia e nove testes de fontes/proveniência também passaram. Arquivos de versão gerados pelo build foram restaurados, sem inclusão no commit. Não houve nova mudança de aplicação após essa validação.

A retomada soma **11 novas ativações, dez contextos recuperados e três figuras originais publicadas**. O snapshot final confirmou as 11 elegíveis, os outros 2.957 registros PC preservados e nenhum metadado preexistente alterado; criados dois recortes programáticos e duas fontes de prova. As edições existentes foram preservadas.

**Pendências atuais: 112 — RO 57, PE 16, MT 20, MG seis, AM cinco, PI quatro, RJ duas e SE duas.** Acervo físico PC: 2.968 registros, com 2.600 ativos (2.170 elegíveis), 212 arquivados, 112 em revisão, 37 anulados e sete obsoletos. A campanha PCDF/RO/PE soma 233 decisões; ativo/elegível não é certificação editorial de todo o acervo. As 16 pendências PE restantes exigem conferência da legislação estadual/Constituição estadual; não foram liberadas por analogia com normas federais.

## Conferência das 112 pendências — legislação estadual de Pernambuco

Um snapshot novo confirmou as 112 pendências. O acesso à ALEPE passou a funcionar; foram recuperados os textos atualizados de Constituição estadual, leis 6.123/1968, 6.425/1972 e 14.804/2012, LC 137/2008 e Decreto 38.787/2012. Para LC 317/2015 e Lei 15.529/2015, o portal oferece texto original; as páginas referenciais oficiais informam que não consta atualização. A coleta preserva HTML, histórico e hashes fora do Git. O registro de fontes ganhou escopo PE explícito, rotas exatas da ALEPE, corpo normativo e histórico para textos originais, sem ampliar a regra federal do Planalto nem substituir fontes existentes.

Publicados: agente 2 e 3; escrivão 1, 3, 4, 7, 52 e 58; delegado 12, 63 a 67. Os comentários distinguem literalidade do recorte e interpretação/aplicação constitucional, e incluem exemplo e exercício respondido. As EC estaduais 70/2026 e 71/2026 ampliaram o art. 101; as notas não repetem a lista de órgãos de 2024 como se fosse completa hoje. O art. 102 mantém a distinção entre a Secretaria de defesa social e a vinculação da Polícia Penal.

Agente 1 foi retirado do treino atual como obsoleto, preservando E como chave histórica. O texto do art. 105-A não se confunde com uma proibição atual de policiamento urbano por guardas: o STF, Tema 656 (RE 608588, 20/02/2025), admite ações de segurança urbana, inclusive policiamento ostensivo comunitário, excluída polícia judiciária e respeitadas as demais atribuições. Não se inventa nova chave D nem anulação da banca. Escrivão 2 permanece retida: a punição por manifestação de desapreço precisa de controle constitucional específico; o simples ajuizamento da ADPF 353 sobre outra norma não é decisão aplicável automaticamente a Pernambuco.

Sete itens tinham vínculo com o bloco específico, apesar de pertencerem ao básico. Cadernos e chaves PECB1/PECB2 foram conferidos visualmente e a proveniência foi corrigida com CAS integral, sem alterar texto, letra ou extração bruta. Registradas duas fontes básicas de agente e quatro recortes programáticos; tópicos provisórios foram preservados.

A verificação de elegibilidade encontrou que o aplicativo rejeitava a ALEPE. A correção aceita apenas HTTPS no host exato e na rota de norma com identificador e modalidade válidos; não libera pesquisas ou domínios genéricos. A checagem de data e aprovação jurídica permanece. **600 testes da aplicação, 42 testes dos fluxos de revisão e build passaram**. O build ocorreu em cópia temporária. As 14 novas ativas passam pelo filtro corrigido; a exibição em produção depende da implantação dessa correção enviada ao repositório. O snapshot confirmou as 15 decisões, os outros 2.953 registros PC preservados e nenhum metadado preexistente alterado.

**Restam 97 pendências: RO 57, PE uma, MT 20, MG seis, AM cinco, PI quatro, RJ duas e SE duas.** Acervo PC: 2.968 registros, 2.614 ativos (2.184 elegíveis no código corrigido), 212 arquivados, 97 em revisão, 37 anulados e oito obsoletos. A campanha soma 248 decisões PCDF/RO/PE. Esta etapa não conclui a auditoria dos 97 restantes.


## Retomada com fontes públicas — 17/10/2026

Documentadas 22 decisões que ainda não estavam no relatório da main: 15 de Rondônia publicadas na continuação anterior e sete desta retomada, totalizando 19 ativações e três arquivamentos. O lote anterior RO abrange 11 ativações administrativas e um arquivamento (agente 55): o caderno realmente cita Judiciário de municípios, e o gabarito D não deve ser defendido inventando a troca de Judiciário por Legislativo. Não se afirma anulação oficial. Mais três ativações confrontaram a Constituição de RO compilada até a EC 179/2026, exclusivamente arts. 1º, 22 e 144. O art. 146 invalidado não foi usado. Na jornada de servidor com dependente com deficiência, a explicação ressalva o Tema 1097 do STF, sem transformar a dependência econômica da norma estadual em requisito universal.

Nesta retomada foram publicadas sete decisões com documentação disponível na internet:

- RO Delegado 47, B: CPP arts. 563 e 565 e STJ, AgRg no HC 732.642/SP, Informativo 741; boa-fé e nulidade de algibeira, com ressalva de natureza do vício e prejuízo.
- RO Delegado 68, B: três itens cotejados nos Temas STF 784, 667 e 454; novas vagas não geram automaticamente nomeação, aglutinação vedada na hipótese específica de mudança de atribuições e ausência de progressões fictícias por nomeação judicial tardia.
- MG TPAG 44, A: fixação para histopatologia, com POP oficial MJ/SENASP, seção 5.3, páginas PDF 158 e 160. O manual de 2013 é fonte técnica e não foi apresentado como atualização normativa de 2026 nem integralmente certificado.
- MG TPAG 51, D: avaliação de risco com o Laboratory Biosafety Manual, quarta edição, OMS. A explicação distingue redução de risco de risco zero e não reduz biossegurança ao EPI.
- MG TPAG 56, A: segregação, acondicionamento e local de tratamento dos RSS, recortes dos arts. 11, 13 e 43 da RDC 222/2018 na BVS/MS; programa oficial do cargo, página 30. A fonte ganhou registro com hash e aprovação delimitada; não se certifica todo o regulamento. A URL do DOU retornou 403 e não foi apresentada como captura bem-sucedida.
- MG importações legadas 12 e 13: arquivadas por letras armazenadas divergentes da chave oficial (respectivamente C versus B e B versus A). Preservados os registros relacionados: item 12 correto continua arquivado por imprecisão; item 13 correto continua ativo, com 13 horas. Nenhuma resposta foi trocada em segredo ou duplicata criada.

As quatro proveniências de MG já haviam sido reparadas nesta sessão; outra sessão restaurou os comandos enquanto o trabalho estava interrompido. Esses textos e as alterações concorrentes foram preservados. Apenas três dessas quatro questões foram ativadas: a 48 continua pendente de fonte técnica suficiente para a afirmação sobre refrigeração. O vínculo ao edital atualizado e os tópicos existentes foram reutilizados; não foram criados tópicos redundantes.

Foram recuperados por navegação no portal oficial da UFMT o edital de abertura, retificação, Anexo III com programa comum aos cargos, caderno, gabarito preliminar e comunicado de 02/03/2022. O comunicado anula 2 e 10 e determina compor o gabarito definitivo com o preliminar. Downloads e confronto desse comunicado não representam revisão concluída das 20 pendências MT. Não é necessário pedir esses arquivos ao usuário.

A nova contagem anterior à retomada encontrou 53 pendências: outra sessão havia ativado 29 desde a contagem de 82. As sete decisões desta retomada reduziram para **46**: **MT 20, RO 12, AM cinco, PI três, RJ duas, SE duas, PE uma e MG uma**. As 29 ativações externas foram preservadas e não atribuídas à nossa revisão. O acervo físico permanece em 2.968 registros: **2.662 ativos, 215 arquivados, 46 em revisão, 37 anulados e oito obsoletos**. Ativo/elegível não significa certificação integral.

Validação: readback dos 22 itens documentados, 19 novas ativas elegíveis e explicações visíveis; preservados os outros 2.961 registros PC durante esta retomada, inclusive as duas versões relacionadas de matemática. Nenhum metadado preexistente foi alterado nesta retomada; inserido somente o recorte da RDC. **602 testes da aplicação, 43 testes dos fluxos de revisão, 20 testes de fontes/filtro e build passaram**, após integrar a paleta enviada pela outra sessão. O build ocorreu em cópia temporária. O filtro aceita apenas os endereços exatos conferidos da Constituição de RO e da RDC na BVS, mantendo datas, aprovação jurídica e demais bloqueios. A disponibilidade desse ajuste em produção depende da implantação da main; não houve verificação visual em produção.


## Mato Grosso — três questões comuns, seis registros — 17/10/2026

Publicados seis registros ativos: questões 7, 19 e 45 do caderno comum de Escrivão e Investigador, uma ocorrência por carreira. **São três questões físicas, não seis questões distintas.** O gabarito oficial foi preservado: C, C e A. Caderno e chave foram cotejados visualmente; o comunicado de 02/03/2022 confirma que o definitivo resulta do preliminar com anulação de 2 e 10, sem alterar estes três itens.

As duas edições ativas apontavam para a prova em vez do edital. Passaram a apontar para o PDF oficial de abertura, que contém o Anexo III; a retificação 001/2022 também foi examinada, inclusive seu item 1.27, que altera Legislação Penal Especial, sem mudar os recortes aqui usados. Foram inseridos seis recortes programáticos, três por carreira, preservando todos os tópicos preexistentes. O edital é fonte documental histórica do programa; não é prova de vigência atual de toda a legislação. O ajuste de vínculo não certifica as outras questões do concurso.

- Questão 7: recuperada a charge original da página PDF 5; explicação sobre a dupla leitura de “rede social” e a ambiguidade de “sua casa”, com duas formas de reescrita e exercício respondido.
- Questão 19: recuperados os cinco diagramas originais da página PDF 10, com suas letras. A explicação demonstra a inclusão dos delegados entre os bacharéis e a interseção com políticos. “Alguns” significa pelo menos um e não obriga existir alguém na região de delegados não políticos. Nenhum diagrama foi redesenhado ou substituído por uma descrição inventada.
- Questão 45: página PDF 19, resposta A confrontada com art. 216-A do CP e REsp 1.759.135/SP, STJ, Informativo 658, julgado em 13/08/2019. O texto distingue ascendência docente de relação de emprego e não presume idade inferior a 14 anos a partir do termo adolescente. O antigo delito de sedução aparece como alternativa histórica revogada, com ressalva expressa.

As duas figuras originais estão no armazenamento público e seus bytes foram conferidos com as capturas locais; são reutilizadas entre os cargos. Foram reparadas seis referências de página e quatro contextos visuais antes da publicação editorial. Os fluxos mantiveram pré-validação do lote e comparação integral dos registros, sem alterar respostas, extrações brutas ou carreira. O suporte de registro de fontes foi ampliado somente para os PDFs PJC2022 vinculados em aviso oficial UFMT com hash; a validação do gabarito exige também o comunicado separado, com hash e cotejo visual. Outros provedores mantiveram as salvaguardas anteriores.

O STJ foi recapturado nesta retomada. O Planalto retornou 503 na nova tentativa; foi utilizada e relida a captura oficial do CP de 16/10, com hash preservado. Não se declara captura nova bem-sucedida nem revisão integral do Código. Não houve alteração de aplicação: **602 testes da aplicação e 44 testes dos fluxos passaram**, incluindo dez de preparação/atualização de fontes. O build aprovado no envio anterior não foi apresentado como nova execução deste lote.

O snapshot posterior confirmou as seis ativações elegíveis, cinco alternativas por item e figuras públicas idênticas. **Os outros 2.962 registros PC foram preservados**, sem alterações concorrentes observadas. Metadados: uma fonte de edital criada, notas/data de duas fontes atualizadas em fluxo próprio, duas edições corrigidas e seis tópicos inseridos; nenhum outro metadado foi alterado.

**Restam 40 pendências: MT 14, RO 12, AM cinco, PI três, RJ duas, SE duas, PE uma e MG uma.** Acervo físico: **2.968 registros — 2.668 ativos, 215 arquivados, 40 em revisão, 37 anulados e oito obsoletos**. Ativo/elegível continua distinto de certificação integral do acervo. Não houve teste visual da página de produção nesta etapa.


## Rondônia — habeas data e controle externo — 17/10/2026

Publicadas duas ativações de Delegado, mantendo as letras oficiais: **20, E; 41, D**. Caderno 732_PCRO_002_01, páginas físicas PDF 2 e 5, e chave definitiva do próprio cargo foram cotejados visualmente. Os vínculos de cópias do Drive foram substituídos pelos documentos oficiais CDN já registrados, com comparação integral de todos os campos. Texto, extração bruta, resposta, matéria e carreira foram preservados. Os tópicos existentes de Direito Constitucional e Direito Processual Penal foram reutilizados, sem duplicar programa.

Na questão 20, o REsp 904.447/RJ (STJ, Informativo 319) distingue simples cópia integral de processo administrativo do conhecimento/retificação de dados pessoais. HD 147/DF (Informativo 342) demonstra a legitimidade da viúva no caso julgado, sem presumir acesso irrestrito de todo herdeiro a dados de terceiros. RE 673.707, Tema 582 do STF, confirma acesso do próprio contribuinte aos seus dados tributários. O comentário distingue gratuidade da ação de honorários contratuais particulares e não transplanta automaticamente regras do mandado de injunção coletivo ao HD. Há exemplo contrastante e teste respondido.

Na questão 41, o REsp 1.365.910/RS (Informativo 590) confirma o controle posterior sobre ordens de missão em cooperação internacional exclusiva da PF sob acordo de sigilo. O REsp 1.439.193/RJ (Informativo 587) limita o acesso irrestrito a relatórios de inteligência; isso não equivale a excluir do controle do MP a atividade policial ostensiva. O comentário distingue ouvir o MP de exigir sua concordância na colaboração negociada pelo delegado (Lei 12.850, art. 4º, § 6º), e acesso posterior de proibição permanente. Não foi repetida como fundamento a referência equivocada à LC 73 no resumo antigo, nem certificada como vigente a Resolução CNMP 20/2007 mencionada historicamente pelo julgamento. A regulamentação atual do CNMP não foi integralmente auditada.

Foram recapturadas quatro notas específicas do STJ e a publicação institucional do STF sobre dados tributários. Novas tentativas da CF e Leis 12.850 e 9.507 no Planalto retornaram 503; a conferência da CF e Lei 12.850 utilizou releitura dos recortes nas capturas oficiais preservadas de 16/10, com hashes registrados. Não se declara captura federal nova bem-sucedida. A questão 40 de preventiva permanece retida, porque ainda falta cotejo do precedente específico sobre contemporaneidade; os outros itens não foram liberados por analogia.

Pré-validação real no banco, CAS e readback passaram. **15 testes de publicação/proveniência passaram**, e ambas as ativas têm cinco alternativas, explicações visíveis, exemplos e exercícios respondidos. Sem alterações de aplicação; não foi necessário novo build. O snapshot posterior confirmou **os outros 2.966 registros PC preservados**. Nenhum metadado foi modificado por esta operação; uma fonte inserida por outra sessão foi identificada e preservada.

**Restam 38 pendências: MT 14, RO dez, AM cinco, PI três, RJ duas, SE duas, PE uma e MG uma.** Acervo físico de 2.968 registros: **2.670 ativos, 215 arquivados, 38 em revisão, 37 anulados e oito obsoletos**. Esses estados não equivalem à certificação integral do acervo; não houve teste visual em produção nesta etapa.


## Sergipe — justificativa oficial do item 14 — 17/10/2026

Resolvidas as duas pendências listadas de Sergipe: **um mesmo item histórico, 14, nos cargos de Agente e Escrivão**. Não são duas questões físicas distintas nem certificação de toda a prova. O enunciado, o comando e o excerto atribuído a Manuel Curvelo foram cotejados com a página 1 do caderno comum. A chave definitiva E foi conferida no PDF próprio.

A consulta ao catálogo oficial PC_SE_21 recuperou o documento de justificativas de alteração. Na página 1, a banca registra expressamente mudança de C para E e explica: “A coroa portuguesa comandada por Filipe II, em 1590, foi quem criou A Capitania de Sergipe del-Rei.” A explicação publicada informa esse critério — autoria formal atribuída à Coroa — e não inventa erro de data no trecho sobre subordinação à Bahia, nem nega toda participação de Cristóvão de Barros. Distingue criação formal, atuação local e possíveis alcances historiográficos dos termos. O texto não declara consenso absoluto sobre qualquer narrativa histórica de fundação. Inclui exemplo hipotético contrastante e exercício respondido sobre a alteração do gabarito, que não foi anulação.

O programa foi conferido no edital oficial, página 38: pontos 3 (ocupação e povoamento) e 6 (estrutura do poder e sociedade colonial). Os editais 2 e 4 foram lidos: retificam outros subitens. Inserido um recorte por edição/cargo, preservando os tópicos provisórios anteriores e todos os metadados existentes. O livro completo do Senado não foi obtido — o portal retornou verificação de segurança — e não é apresentado como evidência recuperada. A fonte que explica a resposta é o documento primário de julgamento do recurso da banca.

Pré-validações reais, CAS e readback passaram; **13 testes de publicação/tópicos passaram**. Formato C/E, letra E, comandos, extrações brutas e páginas originais foram preservados; as explicações são visíveis no filtro da aplicação. Nenhuma mudança de aplicação ou build adicional. O snapshot confirmou os outros **2.966 registros PC preservados**, nenhuma alteração em metadados preexistentes e somente dois tópicos inseridos. Não houve teste visual em produção.

**Restam 36 pendências: MT 14, RO dez, AM cinco, PI três, RJ duas, PE uma e MG uma.** Não há item SE em under_review neste inventário, o que não implica auditoria integral das questões ativas. Acervo PC: **2.968 registros — 2.672 ativos, 215 arquivados, 36 em revisão, 37 anulados e oito obsoletos**.


## Amazonas — Delegado, item 25 — 17/10/2026

**Uma questão ativada**, preservada a letra E. Caderno oficial Tipo 1 (página 8), gabarito definitivo (página 1) e edital atualizado em 30/09/2022 (página 44) cotejados visualmente. O programa contempla prescrição e causas interruptivas. A edição apontava para o caderno; foi vinculada ao edital oficial, preservados os tópicos anteriores e inserido somente o recorte de prescrição ausente.

O Informativo 744 do STJ, consultado diretamente em 17/10, registra o Tema 1100 (REsp 1.930.130/MG, julgamento em 10/08/2022): o acórdão confirmatório interrompe a prescrição, mantendo, reduzindo ou aumentando a pena. O comentário trata das alternativas, inclui exemplos contrastantes e exercício respondido, ressalvando a irretroatividade gravosa da inovação de 2007 e a impossibilidade de ressuscitar prescrição consumada. Corrige a indicação do precedente: o informativo refere HC 176.473/RR, embora a alternativa D traga PR. O Código Penal foi relido na captura oficial de 16/10; novas consultas ao Planalto retornaram 503, sem alegação de nova captura bem-sucedida.

**Item 44 não liberado.** A letra A foi confirmada no gabarito. O Tema 1347 distingue regressão cautelar e definitiva, mas não encerra por si só a dúvida sobre a redação absoluta da alternativa. Não foram alterados seu comentário ou seu status. A questão contábil do Investigador também segue retida: cálculo revisitado, mas as tentativas de obter a norma contábil primária não tiveram sucesso.

Foram executadas pré-validações reais, escritas com comparação integral e leitura posterior. **24 testes de fontes, atualização de evidências, tópicos e publicação passaram.** Questão aprovada pelo filtro da aplicação, com cinco alternativas e comentário sem marcador provisório. Os outros **2.967 registros PC** permaneceram idênticos. As cinco mudanças de metadados corresponderam exatamente ao plano: dois acréscimos de evidências em fontes existentes, um edital inserido, um vínculo de edição corrigido e um tópico inserido. Sem mudança de aplicação, build adicional ou teste visual em produção. Integrado o commit remoto 9bc7a3a da outra conta, sem substituir seu lote CPC.

**Restam 35 pendências: MT 14, RO dez, AM quatro, PI três, RJ duas, PE uma e MG uma.** Acervo PC: 2.968 registros — 2.673 ativos, 215 arquivados, 35 em revisão, 37 anulados e oito obsoletos. O inventário estrutural conta 2.233 ativos elegíveis pelo filtro; não declara todos eles integralmente auditados.


## Fechamento por saldo informado de 9% — PCRO item 29 — 17/10/2026

**Uma ativação adicional:** Delegado de Rondônia, item 29, letra D preservada. O bloqueio por suposta ausência da LEP no programa era indevido: a página 59 do edital prevê expressamente “8.13 Execução penal”. Reutilizado o tópico real de Direito Penal, sem novo material ou tópico. Caderno específico do cargo (página 3) e chave definitiva (página 1) cotejados visualmente. Proveniência corrigida das cópias Drive para as fontes oficiais já registradas, com página física correta; texto, resposta e extração bruta preservados.

A explicação diferencia falta grave (art. 50, III), isolamento na própria cela (53, IV), competência motivada do diretor (54), individualização (57), limite de trinta dias e comunicação ao juiz (58) e procedimento com defesa (59). Não confunde isolamento comum com RDD nem permite sanção automática. Inclui exemplo, variação contrastante e exercício respondido. Recortes lidos na captura oficial do Planalto de 16/10, excluídas as versões históricas riscadas; não se alega nova captura bem-sucedida em 17/10.

Pré-validações reais, comparação integral, gravação e leitura posterior concluídas. **15 testes de proveniência/publicação passaram.** O filtro da aplicação admite a questão e suas cinco alternativas. Os outros **2.967 registros PC** e todos os metadados permaneceram idênticos. Sem mudança de aplicação ou build adicional.

**Saldo final: 34 pendências — MT 14, RO nove, AM quatro, PI três, RJ duas, PE uma e MG uma.** Acervo PC: 2.968 registros; 2.674 ativos, 215 arquivados, 34 em revisão, 37 anulados e oito obsoletos. Elegíveis pelo filtro da aplicação: 2.234. Elegibilidade estrutural não certifica auditoria jurídica/pedagógica integral.

### Ponto exato para retomar

- Nenhuma outra pendência foi liberada nesta rodada. O usuário informou 9% de crédito e solicitou fechamento antes do esgotamento; o saldo não é visível via ferramenta e não há mecanismo de retomada automática contratado.
- PI: recuperados com sucesso o catálogo FGV `https://conhecimento.fgv.br/concursos/pcpi25/1` e a compilação SAPL `https://sapl.al.pi.leg.br/ta/59/text`. A compilação contém redações anteriores e atuais; filtrar versões antes de usar. Item 1 contém capa/instruções incorporadas, exigindo restauração individual do contexto. Itens 2 e 4 ainda precisam de cotejo completo e fontes cadastradas; nada foi publicado por mera recuperação da página.
- AM: a ficha da Lei 2.271/1994 foi recuperada em `https://sapl.al.am.leg.br/norma/6725`, com cinco normas relacionadas: IDs 7733 (3.278/2008), 8176 (3.721/2012), 8303 (3.848/2012), 10489 (4.866/2019) e 11612 (5.694/2021). Suas fichas foram obtidas; falta confrontar as alterações com os recortes de revisão do PAD e insubordinação. A ficha da norma ou o original isolado não certificam texto consolidado atual.
- RO: os originais mostram que a questão tributária 78 realmente emprega “incapazes”; não foi simples erro de extração. A questão 79 usa “anterioridade” e “anualidade”, exigindo explicar precisamente o sentido tributário adotado. A pesquisa STJ por anualidade retornou apenas temas distintos, não foi usada como fundamento da resposta. Originais e chaves da história regional ainda precisam de confronto de identidade/número/alternativas antes de qualquer correção.
- MT: o portal da ALMT exibe compilação com data atual mas sua linha do tempo para a LC 407 só mostra marco original. Não presumir integração de todas as alterações. A tentativa de URN da LC 803 com data presumida retornou 404 e não é evidência normativa. Obter a data exata e o ato modificador antes de certificar os recortes.
- CVM, CPC, CFC e CICV: tentativas neste ambiente não recuperaram as fontes técnicas necessárias. O acesso direto ao domínio `conteudo.cvm.gov.br` retornou 403 no CONNECT do proxy; não é prova de inexistência da norma. Nenhuma restrição foi contornada e nenhum texto não obtido foi apresentado como conferido.

Capturas brutas, PDFs e snapshots completos continuam apenas em outputs ignorados. O novo relatório guarda decisões, hashes e escopo, sem credenciais.


## Retomada das 32 pendências — PCPI e LC 803/2024 MT — 17/10/2026

Snapshot novo confirmou 32 pendências. Os dois itens 31 de MT já haviam sido ativados pela outra conta: preservados. Integrada a main até 7ee78a0 antes das alterações.

**PCPI, itens 2 (E) e 4 (D), ativados:** página 3 do Tipo 1 e chaves definitivas da página 1 cotejadas visualmente. Edital retificado em 01/10/2026, Anexo I, página 41, confirma LC 37/2004, LC 318/2025 e processo disciplinar. Corrigido o vínculo da edição, que apontava para a prova, para o edital oficial. Reutilizado o tópico real existente. A compilação oficial SAPL foi lida distinguindo versões históricas e atuais: art. 71 (redação do caput e membros natos conforme LC 277/2023; membros eleitos e perda por faltas injustificadas); arts. 62–63 (controle finalístico da PGE e exceção do §2º). Comentários incluem exemplos contrastantes e exercícios respondidos, sem ensinar a antiga presidência do Secretário como atual ou confundir parecer com julgamento. O cabeçalho do gabarito informa 25/01/2025, inconsistente com a edição/catalogação; preservado e explicitamente não certificado como data correta. Letras e identidade do Tipo 1 foram conferidas.

O registro da fonte e sua aceitação no filtro da aplicação foram ampliados somente para a rota SAPL PI /ta/59/text e recortes revistos. Incluídas rejeições de host semelhante, outra norma, query histórica, hash alterado e ausência de revisão. O importador FGV admite agora o catálogo específico PCPI25/1, exigindo o PDF efetivamente listado e captura íntegra. A entrega depende do deploy do código da main para que a produção reconheça a fonte nova; elegibilidade foi verificada com o código atualizado, sem alegação de teste visual autenticado em produção.

**MT, item 59 (dois cargos), obsoleto:** encontrada a data correta da LC 803, **19/12/2024**, no mecanismo oficial de busca; URN anterior com data presumida estava errada. A compilação do próprio ato modificador mostra arts. 3–5 alterando as atribuições da LC407 e art.9 com vigência na publicação. O art.117,III, passa a classificar cumprimento de mandados como atribuição COMUM a Escrivão e Investigador, enquanto o item4 da questão o chama PRIVATIVO do Investigador. Letra A histórica preservada, sem inventar resposta vigente. Página PDF23 (impressa21) e chave A cotejadas; chave rotulada preliminar lida em conjunto com comunicado final de02/03/2022 que só anula2/10. Os registros saíram do treino atual por superação normativa específica, não por dificuldade de pesquisa.

**Validação:** 603 testes da aplicação e 21 testes específicos de fontes/formatação passaram; build completo passou. Dry-runs reais, CAS e readback concluídos. Os outros2.964 registros PC permaneceram idênticos. Cinco mudanças de metadados corresponderam exatamente ao plano: duas atualizações aditivas de evidências, fonte do edital inserida, fonte estadual inserida e vínculo de edição corrigido. Nenhum tópico duplicado ou alterado.

**Restam28: MT10, RO9, AM4, RJ2, PI1, PE1, MG1.** Acervo PC atual:2.968 registros —2.614 ativos,279 arquivados,28 em revisão,37 anulados e10 obsoletos.2.172 ativos passam pelo filtro da aplicação; sem certificação integral. Alterações de outras contas anteriores ao snapshot explicam diferenças em relação ao inventário de34, além deste lote.


## Segundo lote da retomada das32 — seis decisões —17/10/2026

**Quatro ativações:**
- PCPI1(B): capa/instruções removidas por restauração auditada do comando, preservadas as alternativas e a extração bruta. O bloqueio era uma classificação equivocada: o comando usa EstadoAlfa e a competência de cooperação está na Lei Orgânica Nacional das Polícias Civis, art6º,X. O Planalto foi recuperado com sucesso pela URL oficial com capitalização _Ato2023-2026/2023/Lei/L14735.htm, após503 na outra grafia. Inciso lido diretamente: cooperação com Judiciário/MP, nos limites legais, sem subordinação hierárquica. ChaveB preservada; programa página41.
- MT14(A), dois cargos: gráfico da páginaPDF8/impressa6 transcrito integralmente em texto acessível, com título,27UFs e Brasil, taxas e fonte indicada. Título2010–2022 é estimativa acumulada; texto menciona separadamente projeção2021 de4,97%. A explicação distingue os41,1% do gráfico da taxa anual e não os apresenta como dados atuais ou resultados efetivos certificados. Inclui exemplo hipotético de preço versus volume. Página e proveniência conferidas, chaveA mantida com comunicado final; criados somente dois recortes de programa ausentes, um por edição. O programa econômico consta da página37 do edital e também da página1 da retificação posterior recuperada.
- PCRO Delegado79(B): CF195§6º conferido diretamente na captura oficial: noventena e dispensa da anterioridade de exercício. Comentário explicita o vocabulário do caderno (“anualidade” no sentido de espera pelo exercício seguinte), distingue anualidade orçamentária e limita a resposta às contribuições de seguridade, sem generalizar para qualquer contribuição. Caderno específico página11 e chaveB confirmados; fonte Drive substituída pela oficial em operação separada; tópico tributário real reutilizado.

**Duas obsolescências:** AM Delegado65(B) e Investigador80(E). O PDF oficial ALEAM da Lei3278/2008, página32, revoga EXPRESSAMENTE os arts36–91 da Lei2271/1994(art159), com vigência sessenta dias após publicação(art161). Os comandos cobram justamente o antigo art81(revisão) e art47VI(demissão por insubordinação), vistos no original oficial. Não se declara todo Estatuto revogado nem se afirma resultado material necessariamente oposto no novo regime: o que fica inativo é o exercício ancorado no dispositivo revogado. As alterações relacionadas de2012,2019 e2021 foram lidas e não restauram esses artigos. Cadernos páginas16/17 e letrasB/E conferidos; chave do InvestigadorTipo1 está na página5 do PDF multicargos, não na página1(Escrivão).

19 testes de contexto/publicação passaram; não houve nova mudança de aplicação após o lote anterior, cujos603 testes e build passaram. Dry-runs reais, CAS, readback e filtro da aplicação confirmaram as quatro ativações. Os outros2.962 registros PC permaneceram idênticos; somente os dois tópicos planejados foram inseridos, sem alterações de metadados preexistentes.

**Acumulado desta retomada:10 dos32 resolvidos —6ativos e4obsoletos. Restam22: MT8, RO8, AM2, RJ2, PE1 eMG1.** Acervo PC:2.968 —2.618ativos,279arquivados,22em revisão,37anulados e12obsoletos;2.176ativos passam pelo filtro da aplicação. Não é certificação integral dos demais ativos.

### Novas evidências ainda sem decisão publicada

- RO14: páginas oficiais do STF sobre bloqueadores e Tema1019 foram obtidas. A primeira confirma a inconstitucionalidade de imposição estadual às operadoras. A segunda, de22/09/2023, admite integralidade e paridade sob condições, incluindo previsão complementar anterior à EC103/2019; não tratar a alternativaE abstrata como resolvida sem confrontar seus limites. Item permanece retido.
- HistóriaRO: recuperada https://rondonia.ro.gov.br/rondonia/historia/, que contextualiza BR364 e ciclos migratórios, mas não basta para certificar cada alternativa. Confirmado que Delegado9 trocaA/B em relação ao Datiloscopista29. O gabarito definitivo de Datiloscopista realmente mostra29D; não trocar porA por mera suposição. Falta esclarecer a divergência material com fonte específica/justificativa. Sem publicação ou adulteração de chave.
- MG48: API oficial WHOIRIS passou a responder; o handle10665/43402 pertence a documento cardiovascular, não ao manual de cadáveres e não foi usado como fundamento. Pesquisa de título ainda não recuperou o manual específico em inglês. Não confundir simples retornoHTTP200 com fonte adequada.


## Matriz das 32 e conferência adicional — 17/10/2026

O arquivo `docs/question-review-pc32-dispositions-2026-10-17.json` identifica individualmente os 32 registros iniciais: **dez decisões concluídas e publicadas (seis ativos, quatro obsoletos) e 22 ainda retidos por validação incompleta**. A triagem dos 32 não equivale a concluir a revisão substantiva dos 32. Cada retenção aponta o ponto ainda não comprovado; nenhuma foi arquivada por mera dificuldade de obter fonte.

Foi obtido e examinado adicionalmente o ato relacionado de 2009: **Lei 3.374/2009**, ficha ALEAM `/norma/7829` e PDF oficial vinculado. Altera a Lei 3.278/2008, inclusive o procedimento de revisão do art. 125, § 1º (art. 37 do modificador); não altera o art. 159 nem restaura os arts. 36–91 do Estatuto de 1994. Mantida a conclusão dos dois itens históricos obsoletos. A busca de notícias do STF sem resultados não é apresentada como prova de inexistência de controle judicial. Hash e URL do ato adicional constam da matriz; nenhum dado do banco foi alterado nessa conferência adicional.

A página PAHO tentada para o manual de gestão de cadáveres devolveu um catálogo genérico de documentos, apesar do HTTP 200; não foi apresentada como manual obtido. A pesquisa WHOIRIS por título não recuperou fonte específica suficiente. Esses retornos não fundamentam a liberação de MG48.


## Mato Grosso — organização e estágio probatório — 17/10/2026

**Seis registros ativados:** questões 56 (D), 57 (D, INCORRETA) e 58 (B), para Escrivão e Investigador. Não são seis itens físicos diferentes: são três itens comuns em dois cargos. Caderno, páginas PDF 22/23 (impressas 20/21), e letras foram cotejados visualmente com a chave composta UFMT e comunicado final de 02/03/2022, que anula somente 2 e 10. Seis páginas de proveniência corrigidas; dois cabeçalhos estranhos foram retirados do fim da alternativa E do item 57, sem alterar as alternativas ou extrações brutas.

O índice oficial da ALMT foi consultado com filtro específico de ementa e paginação. Recuperados e confrontados **17 atos modificadores**: LCs 464, 494, 540, 565, 575, 597, 679, 691, 694, 702, 736, 737, 787, 803, 831, 851 e 853. A consulta inicial livre também retornava números de outras normas contendo 407: esses resultados não foram tratados como modificadores. A página-base da LC 407 não foi considerada consolidação suficiente. Foram conferidos os recortes com seus modificadores, incluindo LC 464/2012 (estrutura e art. 140), LC 575/2016 (art. 144), LC 803/2024 e as LCs 851/853 de julho de 2026. A Diretoria da Mulher e Vulneráveis foi acrescentada em 2026, mas não elimina as quatro associações de unidades e missões efetivamente cobradas no item 58. Não se certifica o organograma inteiro ou todo artigo da lei.

- **56:** F, V, F, F. Livre escolha pelo Governador não equivale a eleição obrigatória; art. 3º trata da unidade gestora e ordenador; art. 7º, XI, usa policiamento repressivo/especializado; art. 7º, VIII, inclui os que cumprem pena. Não se afirma ausência de qualquer atribuição preventiva da Polícia Civil.
- **57:** art. 157, § 1º, admite remoção somente de ofício durante o estágio, afastando a alternativa D. Conferidos art. 141, § 4º (avaliação), 142 (exoneração governamental), 143 (efetivo exercício) e 144 na redação da LC 575 (classe A). Não se confunde remoção com colocação à disposição; o art. 140 sofreu alteração e sua antiga proibição absoluta não foi ensinada como atual. Exoneração não dispensa as garantias do processo.
- **58:** Corregedoria, Diretoria Geral, Execução Estratégica e Academia: 2, 1, 4, 3. Confrontados os arts. 8º, 10, 16, 19–20 e 63 e as mudanças pertinentes da estrutura.

Cada comentário contém exemplos contrastantes e exercício respondido. Inseridos somente dois tópicos reais ausentes, um por edição, vinculados ao programa do edital, página 39: LC 407/2010 e alterações. Os tópicos provisórios anteriores foram preservados. A fonte primária foi cadastrada com escopo expresso de recortes: o importador verifica o hash da captura e os 17 modificadores individualmente, bloqueando alteração de evidência, omissão ou outra rota. A aplicação aceita somente a rota e data de compilação efetivamente conferidas, sem liberação genérica do domínio ALMT.

**604 testes da aplicação, 34 testes de revisão e build completo passaram.** Dry-runs reais, CAS e readback confirmaram as seis ativações e suas cinco alternativas. Os outros **2.962 registros PC** ficaram idênticos; nenhuma alteração concorrente detectada no intervalo. Metadados: somente uma fonte inserida e dois tópicos inseridos, exatamente os planejados. Não houve teste visual autenticado em produção; a aceitação da nova fonte na plataforma depende do deploy do código enviado à main.

**Restam 16 pendências: RO oito, MT duas (item 60 nos dois cargos), AM duas, RJ duas, PE uma e MG uma.** Acervo PC: 2.968 registros — 2.624 ativos, 279 arquivados, 37 anulados, 12 obsoletos e 16 em revisão. Ativos elegíveis pelo filtro da aplicação: 2.182, sem certificação integral de todos. Das 32 pendências da retomada anterior, 16 têm decisão concluída (12 ativos e quatro obsoletos); a matriz individual foi atualizada.

O item 60 continua retido: o caderno restringe a exceção do art. 120 a ensino, enquanto o texto legal consultado usa casos previstos em lei. O confronto dos modificadores não demonstrou alteração desse artigo que esclarecesse integralmente a formulação; não foi inventada resposta nem descartada a controvérsia por analogia.


### Rechecagem das 16 pendências — 17/10/2026

Main integrada até `f68ddb0`, preservando publicação da outra conta. Novo snapshot confirmou 2.968 registros PC sem alterações desde a publicação anterior: 2.624 ativos, 279 arquivados, 37 anulados, 12 obsoletos e 16 em revisão. Nenhuma gravação no banco nesta rechecagem.

MT60 (dois cargos): a revogação do art.119 pela LC803/2024 não alcança a devolução de equipamentos, prevista no art.301, parágrafo único. Não usar essa revogação como motivo para retirar as questões. Mantida pendência relativa à assertiva I/art.120.

MG48: localizada página correta do manual OPAS, com link para biblioteca bloqueada pelo proxy. Obtida edição árabe OMS2007, digitalizada sem texto extraível; ainda não comprova a proposição técnica. Evidências e hashes no relatório `pc-remaining16-recheck-2026-10-17.json`; PDFs e snapshots ignorados em outputs.


### Nova análise e correção de transcrição — 17/10/2026, 19h54 (Brasília)

Conferência visual da questão60 no caderno UFMT/PJC2022, página física24 (impressa22), confirmou que REDAÇÃO não integra a alternativa E. Corrigidos os dois registros (Investigador e Escrivão), incluindo a página, usando dry-run com banco, comparação de todos os campos antes da gravação e leitura posterior. Gabarito B, extração bruta, fontes e status under_review preservados. Isso é correção de transcrição, não conclusão da revisão jurídica.

O snapshot posterior confirmou preservação dos outros2.966 registros PC e de todas as fontes, edições e tópicos. Oito testes do mecanismo de reparo passaram. Nenhuma mudança de aplicação nesta rodada.

Situação:2.624 ativos,279 arquivados,37 anulados,12 obsoletos e16 em revisão. Pendentes:RO8,MT2,AM2,RJ2,PE1,MG1. Cadastro oficial LC68/1992 localizado no SAPL/ALERO; rota de texto compilado exige login, sem validar o recorte atual. Detalhes e evidências em `pc-remaining16-context-reanalysis-2026-10-17.json`.


## Pernambuco2 e Mato Grosso60 — 17/10/2026

Ativados três registros: PE Escrivão2(E), MT Escrivão60(B) e MT Investigador60(B). Rondônia não foi alterada, conforme pedido do usuário.

**PE2:** a compilação atualizada ALEPE e a justificativa oficial da banca confirmam a classificação literal: art.31I/VIII remetem à demissão (art.49XII); art.31IV integra o rol de suspensão (art.37, parágrafo único). Não se inventou jurisprudência: o comentário ressalva a liberdade de expressão, o devido processo e que o enquadramento literal não certifica a recepção constitucional de toda punição concreta. Fonte de prova/key corrigida separadamente: o item pertence ao bloco básico PECB2 (página1), não ao específico PE002. Letra E conferida visualmente no definitivo. Tópico real de Legislação Estadual já existente foi reutilizado.

**MT60:** a pendência de leitura foi resolvida pelo confronto sistemático com dispositivo não considerado nas tentativas anteriores: art.220, item2, XXXII, prevê expressamente a exceção de ensino, em conjunto com a ressalva geral do art.120. Não há necessidade de inventar versão anterior do art.120. Art.164 proíbe mais de DUAS unidades, tornando III falsa; art.301, parágrafo único, exige devolução na publicação, confirmando IV. Conferidos os17 modificadores já capturados, que não alteram esses recortes. Comentário diferencia transcrição literal e combinação dos dispositivos e preserva as demais ressalvas legais/constitucionais. Chave B composta com comunicado final UFMT02/03/2022 e caderno página24 foram conferidos visualmente; usados os dois tópicos reais já registrados, um por cargo.

Dry-run real, CAS, readback e gate da aplicação passaram para os três. Quinze testes do publicador e de proveniência passaram. Outros2.965 registros PC e todos os metadados ficaram iguais. Sem alteração de aplicação/build nesta rodada. Atual:2.627 ativos,279 arquivados,37 anulados,12 obsoletos,13 em revisão; elegíveis no filtro da aplicação2.185 (não certificação editorial de todos). Restam RO8,AM2,RJ2,MG1; cinco no escopo atual que exclui Rondônia. Na campanha de32:19 concluídas(15ativas,4obsoletas),13 retidas. Relatório `docs/question-review-pe2-mt60-2026-10-17.json`.


### Correção do vínculo de edital AM Investigador e limites das cinco restantes

A edição de Investigador AM apontava para uma prova. Corrigida para o edital02/2021 retificado em30/09/2022, listado no catálogo oficial FGV PCAM21/02. PDF, capa e programa de Noções de Contabilidade das páginas48–49 conferidos visualmente; recorte inclui depreciação, baixa de bens e pronunciamentos CPC. Inseridos uma fonte de edital e um tópico real ausente, preservando o tópico provisório anterior. Duas fontes de prova/definitivo receberam evidência documental adicional, sem substituir identidade ou notas anteriores. Caderno do item40 página8 e definitivo multicargos página5 confirmam A,19.000. O cálculo se reproduz:40.000/60×15=10.000; após revisão(30.000−9.000)/21×9=9.000; total19.000. A trava normativa foi preservada, pois o acesso direto ao CPC27/CPC23 continuou bloqueado neste ambiente; a correção do edital não substitui essa conferência.

Readback completo confirmou somente cinco alterações planejadas de metadados: duas fontes atualizadas, uma fonte inserida, uma edição corrigida e um tópico inserido. Os2.968 registros de questão ficaram iguais ao snapshot após as três ativações. Quatorze testes de fontes/tópicos passaram; somados aos quinze de publicação/proveniência,29 testes pertinentes passaram nesta execução. Sem alteração de aplicação; build não necessário.

Rechecados visualmente RJ48(caderno14,A) e75(caderno23,D), mantendo o texto original, inclusive a redação imprecisa da alternativaD do75. As decisões oficiais das ADIs5824/5825 comprovam a simetria das imunidades, mas não foram apresentadas como comprovação bastante do cabimento de reclamação na hipótese. RJ48 ainda exige fundamentação primária específica sobre requisição ao TCE-RJ. AM44(caderno11,A) também confirmado; Tema1347 trata da regressão cautelar e não foi extrapolado para validar a afirmativa absoluta sobre regressão definitiva. MG48 permanece sem fonte técnica específica bastante; não foi liberada apenas pela chaveB.

Restam13 PC em revisão: oito de Rondônia fora do escopo, duas AM, duas RJ e uma MG. Nenhum registro RO alterado. As três ativações PE/MT já foram enviadas à main em7aaf132, integradas no merge e8f0499. Evidências da correção e da pesquisa complementar: `docs/reviews/pcam-investigador-edital-contabilidade-2026-10-17.json`. Não se declara que as cinco restantes estão concluídas.


## AM Delegado44 — disposição editorial — 17/10/2026

**Um arquivamento editorial; nenhuma nova ativação.** A questão44 conserva caderno, extração, letraA e vínculos originais. O arquivamento não foi apresentado como anulação da FGV nem troca de gabarito. O enunciado não delimita o regime do apenado e a alternativaA formula a regressão de modo absoluto após PAD, inadequado ao treino automático sem ressalvas.

Fontes STJ efetivamente consultadas: Informativo351/HC92.175-SP (não há regressão de quem já está no fechado, por impossibilidade); Informativo532/REsp1.378.557-RS (distinção entre PAD e competência/procedimento judicial, sem adotar como atual toda a tese antiga de imprescindibilidade de PAD); Informativo872/Tema1347 (regressão cautelar provisória e fundamentada, distinta da definitiva com procedimento e oitiva). Não se reproduziu a fração antiga de progressão do julgado2008 como regra vigente; não se usou Tema1347 para inventar resposta à questão sobre regressão definitiva. Fundamentação, ressalvas, hashes e capturas constam de `docs/question-review-am44-editorial-disposition-2026-10-17.json`.

Dry-run real, CAS e readback passaram; outros2.967 registros PC preservados e11 testes do publicador passaram. Metadados preexistentes ficaram iguais. Três fontes novas de provasSTF2008 foram inseridas concorrentemente e preservadas, sem atribuir essas inclusões a esta revisão. Rondônia permaneceu intacta. Sem alteração de aplicação ou build nesta rodada.

Restam12 questões PC em revisão: RO8 fora do escopo, AM Investigador40, RJ Delegado48/75 e MG TPAG48. Total:2.627 ativas,280 arquivadas,37 anuladas,12 obsoletas e12 em revisão;2.185 elegíveis no filtro, sem certificação editorial integral. Campanha32:20 disposições concluídas(15ativas,4obsoletas,1arquivada editorialmente),12 pendentes.

Limitações verificadas nesta rodada: Planalto503 para leis8625/12830; CPC/CFC e destinos técnicos bloqueados; NCBI retornou tela de verificação de navegador, sem acessar publicação ou contornar verificação. Consulta SCON redirecionou à página inicial inclusive para furto usado como controle: ausência de resultado não foi tratada como ausência de jurisprudência. As quatro pendências restantes não foram arquivadas por mera dificuldade de acesso a fontes.


## Rondônia — história, transcrição e divergência de chaves — 17/10/2026 (Brasília)

Duas disposições das12 pendências foram concluídas: **Delegado9(CG2) ativo, letraB; Datiloscopista29(CG1) arquivado editorialmente, letraD preservada.** O arquivo não é anulação oficial da banca nem troca de resposta.

Novas evidências primárias: Governo de Rondônia, “História de Rondônia: governador Paulo Leal inspirou JK para abrir a rodovia BR-29, depois364” (17/12/2018) e “Estado de Rondônia completa39 anos concretizando sonhos acalentados desde1960” (04/01/2021). Fontes documentam a abertura no períodoJK, a Caravana Ford de1960 e o processo posterior de ocupação/agropecuária. Os números demográficos históricos não foram ensinados como atuais.

Cotejo visual confirmou que **as alternativasA/B do Delegado9 estavam invertidas na importação**: o próprio cadernoCG2 coloca na letraB a proposição da BR-029/fronteira agrícola, exatamente a letra do definitivo. Registrados dois documentos oficiaisCG2 ausentes, preservando os links antigos; reparada a proveniência para página2 e restaurada a ordenação em operações separadas com CAS. Texto bruto e letraB preservados. Inserido somente um tópico real ausente do item23.2.3 do edital, página54, para História e Geografia de Rondônia; tópico provisório anterior preservado. Comentário inclui explicação, exemplo e exercício respondido.

No Datiloscopista29, a proposição da BR-029 é alternativaA, mas o definitivoCG1 registraD. O conteúdo das proposições é o mesmo no cadernoCG2, cuja chaveB corresponde à proposição histórica corroborada pelas fontes. Essa divergência documental concreta inviabiliza apresentar a chaveD como solução única confiável. Não se transferiu a letra do outro cargo nem se atribuiu anulação à banca; mantidos todos os campos originais além do status editorial, nota e data de revisão.

Dry-runs reais, CAS e readback passaram. O primeiro preflight de publicação exigiu declaração explícita da reclassificação para História e Geografia, então foi incluída a evidência do programa já conferido antes da gravação de status; a salvaguarda não foi removida. **33 testes pertinentes passaram.** Outros2.966 registros PC e todos os metadados preexistentes permaneceram iguais. Somente duas fontes e um tópico foram inseridos por este lote;25 inclusões concorrentes de metadados foram preservadas e separadas no relatório. Sem alteração de aplicação; build não necessário.

Atual:2.628 ativos,281 arquivados,37 anulados,12 obsoletos e10 em revisão;2.186 elegíveis no filtro, sem certificação editorial integral de todos. Restam RO6,RJ2,AM1 eMG1. Na campanha32:22 disposições concluídas(16ativas,4obsoletas,2arquivadas editorialmente),10 retidas. Não foram declaradas concluídas as demais questões das12 solicitadas.

Os acessos CPC e pesquisa STF continuaram bloqueados; a biblioteca OPAS retornou erro de servidor e o endereço original do manual excedeu o tempo da consulta. A liberação de rede permanece preparada conforme relatório `docs/reviews/pc-four-pending-access-2026-10-17.md`; não foi presumida aplicada. Não houve novos arquivamentos por mera indisponibilidade de fonte.


## AM Investigador40 — publicação individual — 18/10/2026

Uma questão ativada, gabaritoA preservado, com explicação passo a passo, exemplo e exercício respondido. Base de R$40.000; primeira depreciação acumulada R$10.000 em15meses; revisão prospectiva sobre R$21.000 em21meses; nove meses adicionais de R$1.000 resultam em R$19.000 acumulados. Antivírus separado do equipamento. O total pedido é dos dez computadores.

Fontes efetivamente lidas: PDFs consolidados oficiais CFC NBC TG27(R4), revisão18, itens50/51/53, página11; NBC TG23(R2), revisão13, itens36/38, página8; histórico SRE de ambas e Revisão NBC31. A norma de2025 foi publicada em25/02/2026, com aplicação das alterações aos exercícios iniciados em ou após01/01/2027. Conferidos os recortes de NBC23 e27 e a cláusula final da revisão; não certificação integral das normas. Fonte antiga sem as revisões não foi usada para decidir vigência. Edital, caderno e definitivo específicos do Investigador já conferidos e preservados.

Publicação passou por dry-run real, comparação de versão original, gravação e leitura posterior. Os demais2.967 registros PC e todos os metadados preexistentes ficaram iguais. Duas fontes CFC foram adicionadas. O filtro da aplicação foi ajustado para reconhecer exclusivamente os dois PDFs contábeis conferidos, sem liberar outros documentos do domínio. Evidências e hashes: `docs/question-review-am40-2026-10-18.json`; PDFs e snapshots privados permanecem em outputs ignorados.

Inventário atualizado:2.968 registros PC —2.629 ativos,281 arquivados,37 anulados,12 obsoletos e9 pendentes. Há2.187 elegíveis no filtro, sem equivaler a certificação editorial integral. Campanha32:23 disposições concluídas, das quais17ativas,4obsoletas e2arquivadas editorialmente;9 pendentes: RO6,RJ2,MG1.

Limitações atuais: STF jurisprudência ainda403; compilação SAPL de LC68 redireciona para login; duas rotas oficiais do manual PAHO excederam o tempo de acesso. Nenhum controle de acesso foi contornado, nenhuma busca sem resultado foi tratada como inexistência de jurisprudência e nenhum dos nove itens foi liberado sem fundamento suficiente. A liberação de fontes no ambiente, quando necessária, continua sendo um requisito técnico separado da validação de conteúdo.

Validação final:616 testes da aplicação e23 testes das salvaguardas passaram; build de produção concluído com sucesso. Arquivos de versão gerados no build não incluídos no commit.


## RO Delegado14 — disposição editorial — 18/10/2026

Um arquivamento editorial, sem nova ativação, troca da letraA ou anulação atribuída à banca. Conferidas diretamente as publicações STF da ADI5039 (16/11/2020), Tema1019/RE1.162.672 (22/09/2023), ADI4924 (04/11/2021) e bloqueadores de celular. A alternativaA continua amparada; a alternativaE genérica sobre integralidade/paridade deixa de ser segura como distrator atual após o Tema1019, que admite a hipótese mediante condicionantes. Não se declarou constitucional qualquer lei estadual nem restauração dos dispositivos invalidados na ADI5039. O comentário preserva a cronologia, diferencia regimes e inclui exemplo e exercício respondido. Evidência: `docs/question-review-ro14-2026-10-18.json`.

Dry-run real, CAS e leitura posterior passaram; preservados outros2.967 registros PC e todos os metadados preexistentes. Onze testes do publicador passaram. Sem alteração de aplicação; build anterior segue registrado no lote AM40, sem atribuí-lo a este lote.

Total atual:2.968 PC,2.629 ativas,282 arquivadas,37 anuladas,12 obsoletas,8 em revisão (RO5,RJ2,MG1). Campanha32:24 disposições concluídas,17ativas/4obsoletas/3arquivadas editorialmente;8 pendentes. Elegíveis no filtro:2.187, sem certificação integral.

Tentativas adicionais sem evidência suficiente: CTN compilado no Planalto excedeu o tempo; API pública BioC do NCBI retornou429 para os dois artigos identificados, sem insistência ou contorno; pesquisa WHO não trouxe material específico suficiente. Ausência de acesso ou de resultado não foi usada para decidir os demais itens. Permanecem pendentes RO92(apuração administrativa),78(capacidade tributária),40(prisão preventiva),60(contravenções),80(falsa perícia); RJ48(requisições ao TCE)/75(reclamação); MG48(refrigeração/autólise/putrefação).

## Oito pendências — nova investigação e três disposições — 18/10/2026

Publicadas duas ativas (RO Datiloscopista92 e MG TPAG48) e um arquivamento editorial (RO Delegado78, sem anulação da banca ou troca de letra). Explicações, fontes e limites em `docs/reviews/eight-pc-source-review-2026-10-18.md`; patches, hashes, leitura posterior e concorrência em `docs/question-review-eight-pc-2026-10-18.json`.

Restam5 em revisão: RO Delegado40/60, Datiloscopista80 e RJ Delegado48/75. Não se apresentou a análise parcial dessas cinco como aprovação. Inventário atual inclui quatro adições PC ativas pela outra conta:2.972 registros,2.635 ativos,283 arquivados,37 anulados,12 obsoletos,5 em revisão. Campanha32:27 disposições concluídas,5 pendentes. Preservados os demais2.965 PC preexistentes e todos os metadados preexistentes. Passaram617 testes da aplicação,24 das salvaguardas e build.


## RJ Delegado75 — 18/10/2026

Questão75 ativa, letraD e texto original preservados, com exemplo e exercício. Conferência de finalidade constitucional da reclamação e do controle parlamentar das cautelares (ADI5526), conjugada à extensão das imunidades (ADIs5824/5825). A revogação regular descrita não implica automaticamente violação de competência ou decisão do STF; não foi ensinada impossibilidade absoluta de reclamação contra ato legislativo. Esclarecida a expressão problemática “autoridade do parlamentar”: o fundamento constitucional da reclamação se refere à competência/autoridade do STF.

Fonte constitucional lida em captura oficial de16/10, sem trocar sua data por uma suposta captura nova; ADIs e edital obtidos diretamente nesta rodada. Corrigido o vínculo da edição, que apontava para caderno de prova, para o edital oficial histórico de origem; programa real de Direito Constitucional nas páginas74–75. Tópico já existente reutilizado, sem duplicação. Acrescentadas evidências/hash aos dois metadados de prova/definitivo por atualização protegida, preservando notas anteriores. Isso não certifica revisão de todo o edital ou dos demais itens da edição.

Dry-runs reais, CAS e leitura posterior passaram; preservados os demais2.971 PC e todas as identidades. Uma fonte de edital criada, duas evidências atualizadas e uma edição vinculada ao edital correto. Passaram23 testes pertinentes; sem alteração de aplicação, não se repetiu build. Relatório: `docs/question-review-rj75-2026-10-18.json`.

Restam4: RO Delegado40/60, Datiloscopista80 e RJ Delegado48. Pesquisa adicional de MPRJ bloqueada403; LCP não respondeu no prazo; resultado STJ sobre contravenção/dolo trouxe temas diversos, sem resolver a proposição específica. Não se tratou ausência de resultado como validação. Campanha32:28 disposições concluídas (20ativas,4obsoletas,4arquivadas editorialmente),4 pendentes. Total PC atual:2.972,2.636 ativas,283 arquivadas,37 anuladas,12 obsoletas,4 em revisão.

## Três disposições editoriais e uma pendência estadual — 18/10/2026

RO Delegado40/60 e Datiloscopista80 foram arquivadas editorialmente, sem trocar gabaritos, sem atribuir anulação à banca e sem apresentá-las como novas questões aprovadas. Não se considera o arquivamento como certificação de que todas as controvérsias jurídicas foram resolvidas. Fundamentação individual, comentários, capturas e hashes: `docs/question-review-last-four-dispositions-2026-10-18.json`.

- **RO40:** não é seguro descartarC de modo que ensine preventiva automática por descumprimento. CPP arts282§§4º/6º e312§§1º/2º/4º exigem distinguir permissão, necessidade, adequação e risco concreto à instrução. A persistência de risco pode fundamentarD. Identificada a inclusão do §4º pela Lei15.272/2025 como posterior à prova, sem invalidar retroativamente o exame2022 por essa alteração.
- **RO60:** a aplicação subsidiária do CP (LCP1º) não permite ensinar, para rejeitarB, responsabilidade penal objetiva. LCP3º não torna voluntariedade/dolo/culpa/culpabilidade conceitos idênticos. CP26 e Tema857/STF, cujo alcance é o porte de arma branca e a análise de circunstâncias/elemento subjetivo, foram usados com delimitação expressa; não se inventou tese geral do Tema857 sobre todas as contravenções. A conversão antiga de multa em prisão simples foi identificada como revogada.
- **RO80:** CP342§1º e CPP157 foram obtidos. A formulaçãoA/E não é segura para resposta única: ausência da palavra recebimento no tipo não prova que suborno pago não majore, e recebimento posterior também não cria automaticamente novo aumento autônomo. Não se inventou regra universal sobre vantagem não pecuniária nem equiparação automática de simples suspeita de falsidade a prova ilícita. Reativação exige fundamento específico para o contraste, além da letra oficialA.

As três páginas de caderno foram novamente cotejadas visualmente, sem divergência textual; não houve correção silenciosa de alternativas. As fontes do Planalto estão acessíveis e foram efetivamente consultadas; esses arquivamentos decorreram da análise pedagógica das formulações, não de falta de acesso aos textos federais.

**Permanece RJ Delegado48.** Lei8625/1993 art26§1º enumera destinatários de encaminhamento via PGJ, e Lei12830/2013 art2§2º prevê requisições policiais. Esses textos não bastam para equiparar automaticamente o TCE como órgão a cada um de seus membros ou para confirmar toda a generalidade deA. Falta conferir o regime estadual específico e/ou precedente diretamente aplicável. ALERJ e TCE-RJ retornaram503; MPRJ teve CONNECT403. A pesquisa STJ por requisições/TCE trouxe prerrogativas do Ministério Público de Contas, que não foram confundidas com a regra aplicável ao Ministério Público comum nesta questão.

Foi preparado no rascunho de configuração o acesso a www.mprj.mp.br e mprj.mp.br, preservando os domínios personalizados já existentes. Retorno explícito: saved, requires_publish=true. Salvar não aplica a mudança ao ambiente em execução. A [skill cloud-environment-onboarding:setup](skill://plugin_connector_1p_ed5feb9070a08191b08c81c47947bc16/setup/SKILL.md) estabelece: “Saving persists configuration; it does not execute scripts, apply runtime changes, or publish.” É preciso revisar e publicar o rascunho nas configurações do ambiente para testar o acesso; não se presume que isso resolverá a questão jurídica ou as falhas503 dos outros servidores. Não se solicita novamente autorização para banco/main, já concedida.

Publicação com dry-run real, CAS e leitura posterior; hashes das capturas conferidos; outros2.969 registros PC e todos os metadados preexistentes preservados. Onze testes do publicador passaram. Sem mudança de aplicação, não se repetiu build. Inventário:2.972 PC —2.636 ativas,286 arquivadas,37 anuladas,12 obsoletas e1 em revisão. Campanha32:31 disposições editoriais (20ativas,4obsoletas,7arquivadas),1 em revisão; não são31 aprovações jurídicas.
