# Acervo PP-MG — catalogação e primeiro lote revisado (10/10/2026)

## Resultado confirmado no Supabase

- 123 páginas catalogadas integralmente, incluindo textos de apoio e gabaritos.
- 503 blocos de questões preservados no acervo privado de revisão: Português 166, RLM 120, Informática 100, Constitucional 80, Penal 22 e Direitos Humanos 15.
- Há duas questões diferentes numeradas 46 em Português, mas só uma entrada 46 no gabarito. Ambas ficam bloqueadas, com identificadores por ocorrência. O título comercial “500 questões” não corresponde à contagem dos blocos.
- 31 questões jurídicas revisadas individualmente, vinculadas a tópico de edital oficial e inseridas no catálogo ativo. Conferência por leitura posterior confirmou os registros.
- Quatro candidatos excluídos da publicação: uma questão superada e três com problemas jurídicos ou de integridade. Os originais ficam retidos para auditoria, sem exposição aos alunos.
- 468 candidatos continuam em revisão, incluindo 82 jurídicos. A revisão integral de todas as questões ainda NÃO está concluída.
- Comparação exata normalizada do lote aprovado com 5.078 registros distintos dos bancos existentes: nenhuma duplicata exata encontrada. Isso não certifica ausência de duplicatas semânticas entre as pendências.
- Dois guias autorais publicados após a catalogação, usando recuperação ativa da skill Tutor: erros/tentativa/dolo e acumulação de cargos. Incluem seis casos coloridos com variações, duas ilustrações, dezesseis itens comentados e oito flashcards.
- Reexecução: zero novas questões/candidatos; os dois guias e os dois conjuntos de exemplos foram preservados.

A apostila particular não foi cadastrada como prova oficial ou gabarito definitivo da SELECON. A origem da editora, o ano de publicação e a natureza das respostas estão registrados separadamente. Questões importadas são `is_original=false`; exercícios dos guias são autorais.

## Conferências que exigiram atenção

O item sobre alteração de data de concurso por crença religiosa não reflete a tese atual do [STF, Tema 386](https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=456125&tip=UN): adaptações razoáveis podem ser admitidas nas condições fixadas pelo tribunal. Ficou `obsolete`.

Dois itens penais não oferecem suporte suficiente ao gabarito da apostila: aeronave mercante brasileira em espaço aéreo estrangeiro não se equipara genericamente à extensão territorial do art. 5º, §1º, do CP; transportar/trazer consigo droga pode consumar o tráfico antes do ingresso no presídio. Ficaram `rejected`, com os fundamentos registrados.

A questão sobre moralidade administrativa contém “oralidade” na alternativa extraída. Ficou bloqueada para conferência visual; não se corrigiu silenciosamente uma alternativa para validar o gabarito antigo.

A [EC 138/2025](https://planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc138.htm) ampliou a acumulação de professor com outro cargo para qualquer natureza. Os exemplos de cargo técnico ainda podem ser válidos; a restrição exclusiva a técnico/científico precisa de atualização. A biblioteca identifica a mudança e separa a legislação atual da data de corte de uma prova histórica.

A matriz PP-MG cadastrada corresponde somente aos tópicos usados neste lote, extraídos do [Anexo II do Edital SEJUSP 01/2025](https://www.seguranca.mg.gov.br/images/0_planilhas-e-pdfs/Editais/Concurso%20Publico%20PP%2001%202025.pdf). Não é declaração de cobertura integral do edital. A regra temporal do item 1.6 permanece identificada; o treino atual não se apresenta como gabarito daquele certame.

## Retomada e limites

O PDF, a extração completa, os candidatos, as evidências de leitura e os relatórios do banco ficam nos outputs locais, fora do Git. As evidências oficiais incluem capturas textuais de consultas às fontes com hash; não devem ser confundidas com download integral do HTML. Nenhuma credencial faz parte deste commit.

1. Aplicar as migrações `20261010100000` e `20261010101000` em ordem. Ambas já foram aplicadas no projeto confirmado.
2. Catalogar esta edição com `python scripts/catalog-ppmg-pdf.py PDF_PATH PRIVATE_OUTPUT_DIRECTORY`. A etapa não verifica vigência nem publica questões.
3. Importar um acervo revisado com `node scripts/import-question-corpus.mjs ACERVO_JSON RELATORIO_JSON --dry-run`; retirar `--dry-run` para gravar, usando `TASK_SUPABASE_PROJECT` e `TASK_SUPABASE_KEY` somente no ambiente.
4. O importador preserva registros e revisões existentes. Revisões novas precisam de uma atualização explícita e auditada do candidato; reexecutar o importador não promove as pendências automaticamente.
5. Continuar as 468 revisões: resolver textos compartilhados de Português, recuperar ilustrações e expressões matemáticas, conferir versões de informática, comparar os 82 itens jurídicos restantes nas fontes oficiais e verificar pertinência ao edital antes de qualquer ativação.

## Validação

72 testes do projeto aprovados, incluindo sete testes do importador: alternativas incompletas, fonte falsa, conferência futura, revisão insuficiente, IDs duplicados e dry-run sem rede. Validações offline dos materiais e exemplos aprovadas. Gravação e reexecução confirmadas no Supabase.
