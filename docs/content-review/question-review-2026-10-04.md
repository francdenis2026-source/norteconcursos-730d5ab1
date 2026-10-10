# Revisão das questões — 04/10/2026

## Resultado aplicado e confirmado

- Catálogo compartilhado: **5.771 registros**, triados integralmente quanto à estrutura e prontidão de publicação.
- **177 questões liberadas no Supabase:** 130 de Língua Portuguesa/FGV e 47 de Constitucional/curadoria.
- **53 registros de Português corrigidos** quanto a texto, alternativas ou textos-base necessários.
- **64 gabaritos corrigidos** no lote CGM-RJ, Técnico de Controle Interno, Tipo 1. O marcador `B**` no item 28 causava deslocamento na extração das respostas seguintes. Foram usados os gabaritos definitivos oficiais; os itens corrigidos estavam em revisão.
- **126 questões anteriormente ativas colocadas em revisão** por transcrição incompleta ou cópias com gabaritos divergentes. Nenhum gabarito histórico nem resposta de aluno foi modificado por essa etapa.
- **Sete anulações FGV confirmadas e arquivadas**, mantendo `official_answer = X`.
- Contador público após essas operações: **3.062 disponíveis**, entre os 5.771 registrados.

## Fontes e critérios

Foram baixados e conferidos 17 PDFs oficiais de cadernos/gabaritos da FGV, com hashes e URLs em `question-sources-2026-10-04.json`. Todos os 754 gabaritos registrados foram confrontados com a seção exata da prova/cargo/tipo; depois das correções, não restaram divergências de gabarito nesse lote. A conferência da versão preparada encontrou 724 itens com texto, alternativas, apoio e gabarito coincidentes com a fonte. Isso não equivale a aprovar vigência normativa nem a dispensar figuras ou sublinhados essenciais.

A coletânea de Constitucional foi confrontada com o PDF enviado pelo usuário: os 48 enunciados e gabaritos candidatos coincidem com o documento. Foram liberados 47 após confronto independente com a [Constituição compilada oficial](https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm), arts. 5º, 6º e 12. A atribuição das questões à banca continua identificada como **origem declarada pela coletânea**, sem alegar confirmação de um gabarito oficial da banca para esse documento. Um item que exige jurisprudência específica ficou pendente de confirmação em fonte primária do STF.

Os tópicos de Português foram alinhados ao [Edital 1 PF/2025 atualizado até a retificação 4](https://cdn.cebraspe.org.br/concursos/PF_25/arquivos/Ed_1_PF_25_Abertura_Atualizado_ate_ret_4.pdf), Cargo 16, Bloco I. Não foi alterada a identificação histórica das provas FGV. Questões com sublinhado indispensável, fórmula/figura, contexto não resolvido ou diferença de extração continuam em revisão.

O caderno CGM-RJ/TCI tem 100 entradas no gabarito; há 99 itens no lote registrado. O item 100 não foi incluído por esta revisão, e a cobertura dessa prova não deve ser anunciada como completa.

## Escopo e limites da revisão geral

`question-audit-2026-10-04.json` contém uma decisão de triagem por ID dos 5.771 registros, sem textos privados. `scripts/review/audit_question_catalog.py` reproduz essa conferência a partir dos exports locais. A triagem verifica conteúdo incompleto, resposta, alternativas, fonte normativa/data, tópico de edital e pendências de contexto; não representa nova aprovação jurídica e semântica individual de todo o acervo. Revisões existentes foram preservadas.

Também foram inspecionados 34 registros do banco pessoal, com ausência de textos-base e indícios de numeração/gabarito deslocados, e 37 registros da tabela legada `practice_questions`, que não é consultada pelo treino atual. A tabela legada `questions` está vazia. Não foram alterados resultados nem respostas pessoais.

## Etapa ampla ainda não aplicada

A reconciliação adicional proposta colocaria **2.938 registros ativos em revisão** (2.862 oficiais, 42 de curadoria e 34 pessoais) e adicionaria validações antes de futuras ativações. O contador compartilhado passaria de **3.062 para 1.494 disponíveis**; registros e histórico seriam preservados.

A revisão automática de aprovação rejeitou essa etapa por seu amplo impacto operacional. Ela depende de aprovação específica do usuário. A [proposta](question-review-proposal-2026-10-04.md) e a consulta somente de leitura `question-review-impact-2026-10-04.sql` descrevem o resultado concreto. Nenhum trigger persistente dessa proposta foi criado.

## Reexecução e validação

As liberações foram aplicadas em transações locais com condições de status, gabarito anterior e conteúdo original; divergências concorrentes interrompem o lote. O recibo `question-release-2026-10-04.json` registra IDs, hashes dos patches e leitura final confirmada. SQLs contendo enunciados, PDFs e extrações ficam nos outputs locais. Nenhuma credencial integra este commit.

A extração FGV passou a distinguir notas de rodapé de anulações, e o importador preserva registros existentes em reexecuções. Os arquivos públicos de importação receberam os 64 gabaritos corretos. A antiga ativação genérica por flags foi substituída por um bloqueio explícito, exigindo decisões individuais.

Validação: 11 testes Python de gabaritos/prontidão e 17 regressões da plataforma passaram; o novo leitor também confirmou 99 itens CGM-RJ contra as 100 entradas reais do gabarito, incluindo `28 = B`. Leitura final dos 177 patches confirmada no Supabase.
