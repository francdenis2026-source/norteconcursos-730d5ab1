# Direito Administrativo — triagem das 74 questões pendentes

Consulta ao Supabase em 19/10/2026: 5 itens em `official_exam_questions` e 69 em `board_exam_questions`, todos `under_review` e classificados no banco como Direito Administrativo. Não houve mutação no banco nem liberação de questões. Trata-se de triagem individual de impedimentos, não de auditoria jurídica integral concluída.

## Conferências necessárias

| Principal frente de conferência | Itens |
|---|---:|
| Normas estaduais, municipais, institucionais ou da carreira | 25 |
| Jurisprudência ou distinções doutrinárias a confirmar | 29 |
| Texto constitucional ou legislação federal | 19 |
| Regime histórico de contrato sob a Lei 8.666/1993 | 1 |
| **Total** | **74** |

Essa divisão indica a frente principal de cada questão; não significa que uma questão dependa de apenas uma fonte. A matriz JSON contém uma exigência individual por ID, cargo, concurso e número original, sem reproduzir os enunciados completos.

## Bloqueio de vínculo com edital

Todos os 74 itens falham hoje no vínculo exigido pelo publicador:

- 67 não têm tópico de edital atribuído.
- Um aponta para tópico ainda `under_review`.
- Seis têm tópico, mas a edição se liga a fonte de tipo `outro`, não a um edital oficial verificado. Não basta a fonte ter `is_official=true`.

Não se deve contornar essa proteção, atribuir um tópico aleatório ou renomear fonte de prova como edital. É necessário obter o edital correspondente, conferir o programa e cadastrar/regularizar fonte, edição e tópicos pertinentes. Questões constitucionais, tributárias e financeiras inseridas por ordem do caderno precisam também de classificação individual; as sugestões da matriz ainda não foram aplicadas ao banco.

## Outros impedimentos observados

- Quatro itens PRF têm as referências da prova e do gabarito apontando para uma página genérica de concursos encerrados; devem receber documentos oficiais exatos antes da liberação.
- Dez têm sinalização de contexto ou imagem. A sinalização deve ser confrontada com o caderno, mesmo quando o enunciado aparenta ser exclusivamente textual.
- O campo `explanation` está vazio nos 74 itens. As notas existentes de importação/retenção não substituem comentário pedagógico individual.
- Itens de LGPD exigem artigos específicos (dados sensíveis, bases legais e responsabilidade do operador); os de concessões exigem distinguir intervenção e extinção; o contrato de 2020 exige explicitar a aplicação histórica da Lei 8.666/1993. Não basta trocar toda referência antiga pela Lei 14.133/2021.

## Distribuição por concurso

| Concurso | Itens |
|---|---:|
| TCE Tocantins | 36 |
| CGM Rio de Janeiro | 26 |
| CGE Santa Catarina | 6 |
| PRF | 4 |
| PC Rio de Janeiro — Delegado | 1 |
| Assembleia Legislativa do Maranhão | 1 |

## Acesso às evidências e continuidade

Nova tentativa de acesso ao Planalto (Constituição, LGPD e concessões) e aos gabaritos definitivos da FGV (TCE-TO e CGM-RJ) retornou `Tunnel connection failed: 403 Forbidden`, inclusive em execução com escalonamento. Por isso não foi atribuída nova aprovação jurídica nem certificação de gabarito a partir de memória ou de meras notas de importação. URLs tentadas e resultados estão na matriz.

A ordem de continuação sugerida é regularizar os editais oficiais e conferir os 19 itens de legislação federal, depois os 29 de jurisprudência e os 25 de normas locais, mantendo o item histórico separado. Cada liberação deve incluir conferência do caderno/gabarito, comentário pedagógico, base legal cadastrada, dry-run, comparação integral contra alterações concorrentes e leitura após gravação.

[Ver matriz das 74 questões, exigências individuais e hashes](admin-pending-triage-2026-10-19.json).

Snapshots do Supabase e resultados brutos ficam em `outputs/audits/admin-74-2026-10-19/`, fora do Git. Os 74 IDs são únicos e a soma das frentes principais e dos bloqueios de edital foi validada contra a consulta atual. Não houve mudança de aplicação; build não se aplica a este relatório.
