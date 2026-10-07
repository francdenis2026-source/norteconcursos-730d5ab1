# Revisão jurídica da biblioteca — 07/10/2026

Os 91 materiais inicialmente classificados em Direito e Legislação foram confrontados com suas fontes oficiais. Foram corrigidos resumos, questões de prática e cartões em 38 módulos; todos receberam data, fontes e quadro de atualização. Um material próprio de CPP foi acrescentado. A revisão foi publicada no Supabase Norte Concursos e conferida por leitura posterior de todos os campos do lote.

## Resultado publicado

| Medida | Resultado |
|---|---:|
| Materiais na biblioteca | 143 |
| Materiais jurídicos ativos conferidos | 92 |
| Percursos jurídicos ativos | 37 |
| Unidades de leitura | 3.574 |
| Unidades na leitura ativa | 3.418 |
| Dispositivos excluídos, fora da leitura ativa | 156 |
| Unidades anteriores preservadas | 2.308 |
| Unidades acrescentadas de CP e CPP | 1.266 |
| Conjuntos existentes de exemplos preservados | 126 |
| Outros materiais, com conteúdo e metadados anteriores preservados | 51 |

Os 35 percursos anteriores coincidem com a extração do texto compilado oficial consultado nesta revisão. Os percursos novos de CP e CPP incluem leitura e recuperação por dispositivo. Essa leitura integral é repertório adicional: não equivale a um exemplo comentado de cada artigo nem afirma que todo o código é exigido pelo tópico de edital associado.

## Correções principais

- Lei 8.112: promoção continua no rol de vacância; distinção entre art. 20, estabilidade constitucional e Decreto 12.374/2025; notícia anônima e prescrição conforme Súmulas 611 e 635 do STJ.
- Licitações: data efetiva de revogação em 30/12/2023, conforme LC 198/2023; valores de dispensa atualizados para 2026 pelo Decreto 12.807/2025; ressalvas do pregão.
- Improbidade: legitimidade concorrente nas ADIs 7042/7043; limite da imprescritibilidade do Tema 897; decisão da ADI 7236 sobre reinício do prazo prescricional, com referência ao andamento oficial de 2026.
- Poder de polícia: delegação delimitada pelo Tema 532; distinção entre coercibilidade e autoexecutoriedade.
- Leis especiais: retirada de antigas tabelas e afirmações incompatíveis com os textos atuais, incluindo contravenções, art. 28 da Lei de Drogas, crimes ambientais, racismo, Estatuto da Pessoa Idosa e identificação criminal.
- CPC: separação entre literalidade do art. 304 e interpretação registrada no Informativo 821/STJ sobre oposição e aditamento.
- CP: retirada de máximas absolutas sobre autolesão e consunção; leitura completa do código compilado.
- CPP: resumo com provas, cadeia de custódia, flagrante, exemplos e prática; leitura completa; mudanças de 2025/2026 e ressalvas de controle de constitucionalidade, incluindo art. 157, § 5º.
- Constituição: avisos das ECs 136, 137 e 138/2025 e 139/2026; marcos temporais próprios da EC 136 separados de aplicação imediata.

## Mudanças e vigência visíveis

O quadro de cada material mostra data da conferência, dispositivos relacionados, síntese da alteração, condições de vigência, correções editoriais e links oficiais. Os avisos aparecem abertos para o aluno. Existem 275 ocorrências de avisos, correspondentes a 60 URLs distintas de atos ou decisões; uma mesma alteração pode aparecer em vários módulos.

As mudanças de 2025 e 2026 foram identificadas nas remissões das fontes consultadas. A lista pertence ao diploma e pode exceder o tema do resumo. Ela não substitui a data de corte do edital nem constitui monitoramento automático de futuras publicações.

A Lei 15.450/2026, referente ao ECA, está marcada como vigência futura em 28/12/2026. A Lei 15.479/2026, referente ao CPC, está marcada como vigência futura em 30/07/2027. Suas novas regras não foram ensinadas como já vigentes em 07/10/2026. A EC 136 tem efeitos em fases e permanece com aviso para conferir o marco específico.

## Fontes e limites da conferência

Foram utilizados textos compilados do Planalto, os respectivos atos modificadores e fontes oficiais do STF/STJ. As evidências HTML/PDF e os snapshots de leitura ficam nos outputs locais, fora do Git. O pacote registra 74 URLs de fontes oficiais nos avisos; hashes de HTML são incluídos quando o arquivo foi obtido diretamente.

Algumas páginas do STF recusaram a obtenção direta com HTTP 403. Nesses casos, a conferência usou a decisão ou tese indexada da própria página oficial, sem atribuir um hash a arquivo não obtido. O relatório não afirma leitura integral de todos os acórdãos nem revisão exaustiva de toda a jurisprudência de cada artigo.

## Publicação e validação

A RPC `apply_library_law_review` publica o lote em uma transação, exige precondições de concorrência e só pode ser executada pelo papel de serviço. O importador valida o pacote antes de acessar o banco e confirma todos os campos por leitura posterior. Reexecução real: **zero materiais alterados e 92 preservados**. Os exemplos mantiveram seus conteúdos e revisões; 81 fingerprints foram alinhados aos textos revisados.

Validação: 33 testes Node, TypeScript e build passaram. O teste SQL com rollback confirmou privilégios, interrupção atômica por precondição inválida, idempotência e preservação de unidades/progresso. A comparação final confirmou também os 2.308 dispositivos anteriores e os 51 materiais de outras disciplinas. A automação do navegador não inicializou; não houve confirmação visual da implantação no site público.

## Arquivos e execução

- `law-review-2026-10-07.json`: lote de atualização de 92 materiais e 37 percursos.
- `core-law-materials-2026-10-07.json`: criação do material de CPP.
- `core-law-paths-2026-10-07.json`: leitura oficial de CP e CPP.
- `scripts/apply-library-law-review.mjs`: validação, publicação atômica e leitura posterior; aceita `--dry-run`.
- `20261007090000_library_legal_review.sql`: estrutura e RPC com versão exclusiva após as migrações concorrentes da main.

Credenciais são recebidas somente do ambiente: `TASK_SUPABASE_PROJECT`, `TASK_SUPABASE_KEY` e `TASK_LIBRARY_REVIEWER`. Nenhum token, PDF privado ou registro pessoal integra estes arquivos.

O primeiro registro da migração desta revisão foi aplicado como `20261007010000_library_legal_review`, antes da integração da main remota. A main recebeu uma migração diferente com o mesmo número. A estrutura e o conteúdo estão aplicados; a renumeração do registro remoto para `20261007090000` aguarda aprovação, pois a revisão automática bloqueou a alteração direta do histórico. Não executar um `db push` geral antes de resolver essa divergência de numeração.
