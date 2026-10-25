# PC-AC 2017 — fontes oficiais e encerramento solicitado

Conferência final: 15/10/2026, 19:27 UTC (14:27 no Acre). Trabalho interrompido por solicitação expressa do usuário; nenhum publicador de questões permaneceu em execução.

## Efetivamente gravado e conferido no Supabase

- Cadastradas três fontes distintas da própria IBADE: edital consolidado, caderno S01 de Agente na versão V e gabarito definitivo.
- Corrigida a fonte da edição histórica `59a6294e-7f50-441d-a718-6ffbc02d90ec`, que apontava para um espelho de gabarito como se fosse o edital.
- Corrigidos os vínculos de prova, gabarito e página de 79 registros canônicos em `official_exam_questions`. Todos os números e letras foram cotejados com o gabarito definitivo S01-V, página 2.
- A questão 26 foi anulada e não integra os 79 registros; não foi criada nem ativada.
- Preservados gabaritos, extração original, status, disciplinas e os 79 registros duplicados já arquivados. A fonte legada também foi preservada porque há outras referências a ela.

O caderno oficial está em <https://ibade.org.br/wp-content/uploads/2026/05/V-4.pdf>. O catálogo da banca vincula esse PDF ao cargo e à versão: <https://ibade.org.br/concursos-anteriores/policia-civil-ac/provas-e-gabaritos/>. A pasta de upload de 2026 é resultado da migração do portal; a prova é de 07/05/2017.

## Preparado, sem publicação

Foi preparado e validado em simulação um pacote de recuperação do texto e das cinco alternativas de 69 itens, números 11–80, exceto o 26. Foram conferidos visualmente os símbolos e as frações, incluindo **7/(3⁶)** na alternativa C da questão 18. Os dez itens de Português continuam dependentes de tratamento próprio do texto de apoio.

A execução da recuperação de contexto foi encerrada antes da primeira escrita. A leitura final confirmou **zero textos recuperados no banco e zero novas questões ativas**. As decisões pedagógicas e de vigência em preparação não foram publicadas. Recuperar a fonte não equivale a concluir a revisão jurídica. Devem ser retomados os alertas sobre improbidade (reforma de 2021), foro parlamentar (AP 937 e orientação de 2025), progressão de regime (inclusive alterações de 2026) e a questão médico-legal sobre o hímen, sem ensinar o gabarito histórico como regra científica atual.

## Contagem na parada

Consulta nova ao banco em 15/10/2026, 19:27:40 UTC:

| Origem | Registros `under_review` |
| --- | ---: |
| Questões oficiais | 651 |
| Questões de bancas | 300 |
| Catálogo curado | 0 |
| Banco pessoal | 0 |
| **Total** | **951** |

Dentro desse total, os **79 itens canônicos da PC-AC 2017 continuam pendentes**. São contagens de registros de questões, não de unidades da biblioteca, nem de questões únicas após eventual deduplicação entre tabelas.

## Ferramentas e salvaguardas

- Novo preparador de fontes: valida domínio oficial, tipo, data, evidência visual, assinatura PDF e SHA-256; não sobrescreve fonte existente; corrige a edição comparando todos os campos anteriores.
- Reparadores existentes de proveniência e contexto receberam simulação contra o banco por opção explícita `{dryRun:true}`, preservando suas assinaturas anteriores e conferência completa antes de gravar.
- Normalização de `checked_at` aceita apenas diferenças de representação do mesmo instante, mantendo a precisão de microssegundos para detectar concorrência.
- Authoring de recuperação vinculado aos hashes dos PDFs e da extração conferida. Deve ser executado por etapas, com novo snapshot entre proveniência e contexto, mantendo os pacotes anteriores para retomada idempotente. Não regenerar pacotes por cima dos já aplicados sem conferir o estado atual.
- **21 testes pertinentes passaram**, além de `git diff --check`. Não houve mudança de aplicação nesta etapa; não foi necessário executar novo build.

PDFs, OCR, snapshots completos, pacotes e readbacks permanecem em `outputs/question-review-2026-10-15/`, ignorado pelo Git. O manifesto público `docs/question-review-pcac-v-provenance-2026-10-15.json` registra escopo, contagens, fontes e hashes, sem credenciais. Uma nova conta deve obter credenciais na sessão autorizada, consultar novamente o banco e baixar os mesmos PDFs oficiais; os arquivos privados locais não são presumidos disponíveis.
