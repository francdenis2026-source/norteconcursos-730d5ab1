# Acervo PP-MG — catalogação e lote revisado finalizado (10/10/2026)

## Resultado confirmado no Supabase

- 123 páginas catalogadas; 503 blocos: Português 166, RLM 120, Informática 100, Constitucional 80, Penal 22 e Direitos Humanos 15. O título comercial “500 questões” não corresponde à contagem dos blocos.
- Todos os 503 candidatos receberam uma primeira decisão individual: 372 aprovados e confirmados no catálogo ativo, 76 retidos sem publicação e 55 excluídos (42 rejeitados, 11 duplicados e dois superados). Não há candidato sem primeira análise, mas as retenções ainda precisam de validação complementar.
- Publicação por etapas: 31, 149, 55, 13, 20, 18, 34 e 46 questões. A etapa final inseriu 46 e preservou os registros anteriores.
- Português: 134 aprovadas, 30 retidas e duas rejeitadas. As 132 questões antes pendentes receberam decisões nos três últimos lotes: 98 foram aprovadas, 33 retidas e uma rejeitada.
- Duas questões diferentes têm o número 46, mas só há uma chave 46 no gabarito. Ambas ficam bloqueadas com identificadores por ocorrência.
- Comparação normalizada dos 372 aprovados com 5.450 textos distintos: nenhuma duplicata externa exata, excluídos os próprios registros importados. Não certifica ausência de duplicatas semânticas.
- Leitura posterior confirmou os estados e payloads dos 503 candidatos, as 372 questões ativas e suas chaves de origem. Há 468 primeiras decisões novas e seis complementações auditadas (474 registros de histórico); 35 primeiras decisões anteriores foram preservadas. Todas as fontes jurídicas citadas nos aprovados estão cadastradas como oficiais.
- Dois guias autorais publicados após a catalogação, com recuperação ativa da skill Tutor: erros/tentativa/dolo e acumulação de cargos. Incluem seis casos coloridos, duas ilustrações, dezesseis itens comentados e oito flashcards; foram preservados.
- O resumo geral retornado pelo sistema nesta conferência foi de 6.143 questões registradas e 3.727 disponíveis para treino, incluindo outros acervos.

A apostila particular não foi cadastrada como prova oficial ou gabarito definitivo da SELECON. A origem da editora, o ano de publicação e a natureza das respostas estão registrados separadamente. Questões importadas são `is_original=false`; exercícios dos guias são autorais.

## Conferências que exigiram atenção

O item sobre alteração de data de concurso por crença religiosa não reflete a tese atual do [STF, Tema 386](https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=456125&tip=UN): adaptações razoáveis podem ser admitidas nas condições fixadas pelo tribunal. Ficou `obsolete`.

Dois itens penais não oferecem suporte suficiente ao gabarito da apostila: aeronave mercante brasileira em espaço aéreo estrangeiro não se equipara genericamente à extensão territorial do art. 5º, §1º, do CP; transportar/trazer consigo droga pode consumar o tráfico antes do ingresso no presídio. Ficaram `rejected`, com os fundamentos registrados.

A questão sobre moralidade administrativa contém “oralidade” na alternativa extraída. Ficou bloqueada para conferência visual; não se corrigiu silenciosamente uma alternativa para validar o gabarito antigo.

A [EC 138/2025](https://planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc138.htm) ampliou a acumulação de professor com outro cargo para qualquer natureza. Os exemplos de cargo técnico ainda podem ser válidos; a restrição exclusiva a técnico/científico precisa de atualização. A biblioteca identifica a mudança e separa a legislação atual da data de corte de uma prova histórica.

O item sobre exclusão automática de toda verba indenizatória do teto foi marcado como superado. Sua redação não contempla a EC 135/2024 e a [decisão do STF sobre teto e verbas indenizatórias](https://noticias.stf.jus.br/postsnoticias/stf-mantem-obrigatoriedade-de-respeito-ao-teto-remuneratorio-e-limitacao-sobre-o-pagamentos-de-verbas-indenizatorias/). Os limites específicos fixados para Judiciário e Ministério Público não foram generalizados a todos os servidores.

Em RLM, diagramas e tabelas recuperáveis receberam transcrição explícita; itens com fórmulas ilegíveis, respostas incompatíveis, premissas insuficientes ou repetição ficaram fora do treino. Em Informática, as 26 páginas foram conferidas visualmente. Alternativas baseadas em imagens só foram aprovadas após descrição de seu conteúdo. Itens que confundem janela com aba, formatos com suporte a macros ou contêm fórmulas inválidas foram rejeitados. Itens dependentes de versões fora do tópico de edital escolhido ou sem comprovação suficiente ficaram retidos.

As 76 retenções abrangem problemas de contexto, comprovação e enquadramento no edital. Incluem três questões de legislação municipal de Cuiabá: foram identificadas como municipais e continuam bloqueadas até conferência da fonte consolidada e pertinência ao edital. Nenhuma foi promovida artificialmente a legislação federal. Revisar um candidato não significa autorizar sua publicação.

A matriz PP-MG cadastrada corresponde somente aos tópicos usados neste lote, extraídos do [Anexo II do Edital SEJUSP 01/2025](https://www.seguranca.mg.gov.br/images/0_planilhas-e-pdfs/Editais/Concurso%20Publico%20PP%2001%202025.pdf). Não é declaração de cobertura integral do edital. A regra temporal do item 1.6 permanece identificada; o treino atual não se apresenta como gabarito daquele certame.

## Retomada e limites

O PDF, a extração completa, os candidatos, as evidências de leitura e os relatórios do banco ficam nos outputs locais, fora do Git. As evidências oficiais incluem capturas textuais de consultas às fontes com hash; não devem ser confundidas com download integral do HTML. Nenhuma credencial faz parte deste commit.

1. Aplicar as migrações `20261010100000`, `20261010101000` e `20261010110000` em ordem. As três já foram aplicadas e registradas no projeto confirmado.
2. Catalogar esta edição com `python scripts/catalog-ppmg-pdf.py PDF_PATH PRIVATE_OUTPUT_DIRECTORY`. A etapa não verifica vigência nem publica questões.
3. Importar um acervo revisado com `node scripts/import-question-corpus.mjs ACERVO_JSON RELATORIO_JSON --dry-run`; retirar `--dry-run` para gravar, usando `TASK_SUPABASE_PROJECT` e `TASK_SUPABASE_KEY` somente no ambiente.
4. Registrar decisões novas com `node scripts/review-question-corpus.mjs ANTERIOR_JSON NOVO_JSON RELATORIO_JSON [--dry-run]`. A RPC exige administrador ou service role, verifica o estado e payload anteriores, preserva a extração original e grava histórico na mesma transação. Repetir a mesma decisão retorna `unchanged`; revisões existentes não são substituídas.
5. O importador preserva registros e revisões existentes. Reexecutá-lo não promove pendências automaticamente. Credenciais permanecem apenas no ambiente da sessão; PDF, JSON privados e relatórios de execução não entram no Git.
6. Resolver as 76 retenções (30 de Português e 46 das outras disciplinas) antes de qualquer nova ativação. A primeira análise foi registrada para todo o acervo; isso não declara aprovação integral da apostila.

## Português — primeira análise registrada

As aprovadas têm comentários individuais de acentuação, formação de palavras, flexão, verbos, pronomes, conectivos, vocabulário, sintaxe, pontuação e concordância. Textos compartilhados necessários foram recuperados e duas tirinhas receberam transcrição textual com autoria identificada. Recortes editoriais e sínteses de contexto estão identificados; a extração original permanece imutável no acervo privado. Relatos de saúde e estatísticas são históricos, usados para análise linguística.

Uma questão de ortografia admite dois preenchimentos com s: esperto e espirou. Outra pede voz passiva, mas troca provocar por aprovar na alternativa indicada. Ambas foram rejeitadas. As duas ocorrências de número 46 continuam bloqueadas, pois a chave da apostila não certifica os dois itens.

As 30 retenções de Português têm motivo individual no relatório privado: destaques ou sublinhados ausentes, contexto a recuperar da prova e alternativas ou classificações discutíveis. Não se inferiu o trecho destacado apenas para justificar o gabarito. As três retenções de Português resolvidas foram liberadas apenas após recuperar o destaque na prova e confirmar o gabarito oficial. As demais permanecem fora do treino.

## Complementações verificadas em fontes primárias

- Informática 73, 84 e 86: conferência visual das figuras/alternativas e documentação oficial do LibreOffice. As versões 6.2 e 6.3 integram a série 6 prevista no tópico PP-MG; as alternativas gráficas foram descritas em texto acessível.
- Português 59, 107 e 108: provas originais e gabaritos oficiais da Selecon para Secretário Escolar, Motorista e Nutricionista de Sapezal, aplicação em 2019. Os destaques foram identificados diretamente nas provas. Links de prova e gabarito constam nos comentários publicados e no histórico privado.
- Seis novas publicações confirmadas em três etapas: três, uma e duas. O texto da extração e as primeiras decisões continuam preservados no histórico.
- Aplicada a migração `20261010150000_refine_held_corpus_reviews.sql`. Para complementar uma retenção: `node scripts/refine-held-question-corpus.mjs ANTERIOR_JSON NOVO_JSON RELATORIO_JSON [--dry-run]`. Exige evidência primária, motivo, correspondência do estado anterior e administrador/service role. Não substitui questões já publicadas nem exclusões anteriores.
- Teste transacional com rollback confirmou autorização, proteção de decisões, rejeição de estado anterior nulo/desatualizado, extração imutável, evidência obrigatória, histórico e reexecução sem duplicar auditoria. Não deixou dados sintéticos.
- A biblioteca publicada foi acessada, mas exigiu login nesta sessão. A visualização autenticada pelo aluno ainda não foi confirmada.

## Validação

83 testes do projeto aprovados. Cobrem alternativas incompletas ou vazias, fonte falsa, conferência futura, revisão insuficiente, IDs duplicados, proteção da extração e das decisões anteriores, e dry-run sem rede. Validações offline dos materiais e exemplos aprovadas. A RPC foi exercitada no banco em teste com rollback: autorização, rejeição de atualização desatualizada, imutabilidade, histórico, idempotência e proteção das decisões foram confirmados, sem deixar registros sintéticos. Gravação, leitura posterior e reexecução do lote confirmadas no Supabase.

