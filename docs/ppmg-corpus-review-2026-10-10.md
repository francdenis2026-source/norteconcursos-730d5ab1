# Acervo PP-MG — catalogação e lote revisado finalizado (10/10/2026)

## Resultado confirmado no Supabase

- 123 páginas catalogadas integralmente, incluindo textos de apoio e gabaritos.
- 503 blocos de questões preservados no acervo privado de revisão: Português 166, RLM 120, Informática 100, Constitucional 80, Penal 22 e Direitos Humanos 15.
- Há duas questões diferentes numeradas 46 em Português, mas só uma entrada 46 no gabarito. Ambas ficam bloqueadas, com identificadores por ocorrência. O título comercial “500 questões” não corresponde à contagem dos blocos.
- 337 candidatos receberam decisões individuais: 235 aprovados e confirmados no catálogo ativo, 49 revisados mas retidos sem publicação e 53 excluídos (40 rejeitados, 11 duplicados e dois superados). Os originais permanecem privados para auditoria.
- O primeiro lote publicou 31 questões; as etapas seguintes acrescentaram 149 e 55. A retomada de Informática preservou 97 decisões já gravadas e concluiu as três restantes.
- 166 candidatos de Português continuam em revisão. A revisão integral de todas as questões ainda NÃO está concluída. Textos compartilhados, ilustrações, ambiguidades e a numeração repetida exigem conferência individual antes de publicar.
- Comparação exata normalizada dos 235 aprovados com 5.313 textos distintos dos bancos existentes: nenhuma duplicata externa exata encontrada, desconsiderando os próprios registros já importados. Isso não certifica ausência de duplicatas semânticas.
- Dois guias autorais publicados após a catalogação, usando recuperação ativa da skill Tutor: erros/tentativa/dolo e acumulação de cargos. Incluem seis casos coloridos com variações, duas ilustrações, dezesseis itens comentados e oito flashcards.
- A leitura posterior confirmou os 503 candidatos, seus estados e respectivos payloads, os 235 registros ativos e suas chaves de origem. As 302 decisões novas têm histórico individual de auditoria; as 35 anteriores foram preservadas. Todas as fontes jurídicas citadas no lote aprovado estão cadastradas como oficiais.
- Reexecução: zero novas questões/candidatos; os dois guias e os dois conjuntos de exemplos foram preservados. O total geral retornado pelo sistema ao fechar o lote foi de 6.006 registradas e 3.590 disponíveis para treino; essa contagem inclui outros acervos.

A apostila particular não foi cadastrada como prova oficial ou gabarito definitivo da SELECON. A origem da editora, o ano de publicação e a natureza das respostas estão registrados separadamente. Questões importadas são `is_original=false`; exercícios dos guias são autorais.

## Conferências que exigiram atenção

O item sobre alteração de data de concurso por crença religiosa não reflete a tese atual do [STF, Tema 386](https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=456125&tip=UN): adaptações razoáveis podem ser admitidas nas condições fixadas pelo tribunal. Ficou `obsolete`.

Dois itens penais não oferecem suporte suficiente ao gabarito da apostila: aeronave mercante brasileira em espaço aéreo estrangeiro não se equipara genericamente à extensão territorial do art. 5º, §1º, do CP; transportar/trazer consigo droga pode consumar o tráfico antes do ingresso no presídio. Ficaram `rejected`, com os fundamentos registrados.

A questão sobre moralidade administrativa contém “oralidade” na alternativa extraída. Ficou bloqueada para conferência visual; não se corrigiu silenciosamente uma alternativa para validar o gabarito antigo.

A [EC 138/2025](https://planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc138.htm) ampliou a acumulação de professor com outro cargo para qualquer natureza. Os exemplos de cargo técnico ainda podem ser válidos; a restrição exclusiva a técnico/científico precisa de atualização. A biblioteca identifica a mudança e separa a legislação atual da data de corte de uma prova histórica.

O item sobre exclusão automática de toda verba indenizatória do teto foi marcado como superado. Sua redação não contempla a EC 135/2024 e a [decisão do STF sobre teto e verbas indenizatórias](https://noticias.stf.jus.br/postsnoticias/stf-mantem-obrigatoriedade-de-respeito-ao-teto-remuneratorio-e-limitacao-sobre-o-pagamentos-de-verbas-indenizatorias/). Os limites específicos fixados para Judiciário e Ministério Público não foram generalizados a todos os servidores.

Em RLM, diagramas e tabelas recuperáveis receberam transcrição explícita; itens com fórmulas ilegíveis, respostas incompatíveis, premissas insuficientes ou repetição ficaram fora do treino. Em Informática, as 26 páginas foram conferidas visualmente. Alternativas baseadas em imagens só foram aprovadas após descrição de seu conteúdo. Itens que confundem janela com aba, formatos com suporte a macros ou contêm fórmulas inválidas foram rejeitados. Itens dependentes de versões fora do tópico de edital escolhido ou sem comprovação suficiente ficaram retidos.

As 49 retenções abrangem problemas de contexto, comprovação e enquadramento no edital. Incluem três questões de legislação municipal de Cuiabá: foram identificadas como municipais e continuam bloqueadas até conferência da fonte consolidada e pertinência ao edital. Nenhuma foi promovida artificialmente a legislação federal. Revisar um candidato não significa autorizar sua publicação.

A matriz PP-MG cadastrada corresponde somente aos tópicos usados neste lote, extraídos do [Anexo II do Edital SEJUSP 01/2025](https://www.seguranca.mg.gov.br/images/0_planilhas-e-pdfs/Editais/Concurso%20Publico%20PP%2001%202025.pdf). Não é declaração de cobertura integral do edital. A regra temporal do item 1.6 permanece identificada; o treino atual não se apresenta como gabarito daquele certame.

## Retomada e limites

O PDF, a extração completa, os candidatos, as evidências de leitura e os relatórios do banco ficam nos outputs locais, fora do Git. As evidências oficiais incluem capturas textuais de consultas às fontes com hash; não devem ser confundidas com download integral do HTML. Nenhuma credencial faz parte deste commit.

1. Aplicar as migrações `20261010100000`, `20261010101000` e `20261010110000` em ordem. As três já foram aplicadas e registradas no projeto confirmado.
2. Catalogar esta edição com `python scripts/catalog-ppmg-pdf.py PDF_PATH PRIVATE_OUTPUT_DIRECTORY`. A etapa não verifica vigência nem publica questões.
3. Importar um acervo revisado com `node scripts/import-question-corpus.mjs ACERVO_JSON RELATORIO_JSON --dry-run`; retirar `--dry-run` para gravar, usando `TASK_SUPABASE_PROJECT` e `TASK_SUPABASE_KEY` somente no ambiente.
4. Registrar decisões novas com `node scripts/review-question-corpus.mjs ANTERIOR_JSON NOVO_JSON RELATORIO_JSON [--dry-run]`. A RPC exige administrador ou service role, verifica o estado e payload anteriores, preserva a extração original e grava histórico na mesma transação. Repetir a mesma decisão retorna `unchanged`; revisões existentes não são substituídas.
5. O importador preserva registros e revisões existentes. Reexecutá-lo não promove pendências automaticamente. Credenciais permanecem apenas no ambiente da sessão; PDF, JSON privados e relatórios de execução não entram no Git.
6. Continuar as 166 revisões de Português e resolver as 49 retenções antes de qualquer nova ativação. Este fechamento abrange o lote concluído, sem declarar aprovação integral da apostila.

## Validação

77 testes do projeto aprovados. Cobrem alternativas incompletas ou vazias, fonte falsa, conferência futura, revisão insuficiente, IDs duplicados, proteção da extração e das decisões anteriores, e dry-run sem rede. Validações offline dos materiais e exemplos aprovadas. A RPC foi exercitada no banco em teste com rollback: autorização, rejeição de atualização desatualizada, imutabilidade, histórico, idempotência e proteção das decisões foram confirmados, sem deixar registros sintéticos. Gravação, leitura posterior e reexecução do lote confirmadas no Supabase.
