# Biblioteca: revisão do texto oficial e aplicação por artigo

## Evidência e escopo

As fontes oficiais dos 42 percursos foram obtidas em 11/10/2026. A comparação inicial encontrou correspondência de texto/hash nos 3.509 dispositivos cadastrados usando o mesmo parser da importação. **Esse resultado não comprova integridade da extração:** uma segunda auditoria com reparação HTML5 encontrou omissões, inclusive os arts. 1º, 43, 172 e 184 do Código Penal. O inventário inicial `article-source-audit-2026-10-11.json` conserva a evidência histórica desse método, mas não deve ser usado como declaração de que todos os artigos estavam completos. Os HTMLs e snapshots integrais ficam em outputs locais ignorados pelo Git.

Essa comparação confere a redação cadastrada; não certifica a aplicabilidade isolada de cada norma nem uma auditoria integral de toda jurisprudência. Particularmente em diplomas antigos, a compatibilidade com normas posteriores e decisões judiciais deve ser examinada na explicação do dispositivo.

## Publicação confirmada

Durante o trabalho, outro lote entrou na main e no banco, passando de 1.775 para 2.163 explicações publicadas. O primeiro preflight recusou qualquer sobrescrita e não gravou registros. A atualização remota foi integrada por fast-forward, preservando a história do projeto.

Foram então aprimoradas e publicadas 94 explicações existentes: todos os dispositivos vigentes de ICN (13), CIN, incluindo os três anexos (30), Serviço de Identificação do Cidadão (29) e regulamento da pensão por feminicídio (22). Cada explicação contém caso próprio, variação dos fatos e pergunta com resposta comentada. As versões anteriores completas estão no campo `expected` do lote versionado, permitindo cotejo e recuperação. O importador exige correspondência da versão anterior, texto oficial, fonte cadastrada e tópico/edição ativos antes de gravar.

No exemplo de perda da nacionalidade, também foi conferido o art. 12, §4º, da [Constituição Federal](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm), com redação da EC 131/2023. Os metadados da evidência adicional constam do pacote da CIN. As demais fontes oficiais e seus hashes constam de `laws` no pacote.

Os novos casos destacam diferenças de competência, quóruns, acesso à biometria, validade da CIN e do modelo antigo, vigência e adaptação. Na pensão, diferenciam o valor total do rateio, documentos alternativos à condenação definitiva, BPC no cálculo de renda, bloqueio, suspensão e cessação. O art. 15 do decreto da pensão conserva a remissão literal do §2º ao §1º, sem substituir silenciosamente o prazo.

## Experiência de estudo

O caso aparece em bloco verde, a variação em violeta e a fixação em rosa, com variantes para tema escuro. Perguntas explicitamente redigidas com resposta comentada apresentam campo de tentativa e resposta em detalhe fechado. As notas anteriores sem pergunta continuam disponíveis; o sistema não inventa gabaritos para elas. Os exercícios são autorais e não são apresentados como questões oficiais de banca.

## Conferência independente e pendências

O read-back confirmou as 94 revisões, o revisor e as datas; 2.069 explicações não alvo e os registros de materiais, enriquecimentos, cursos, dispositivos, fontes e editais permaneceram inalterados. O relatório `article-explanations-applied-2026-10-11.json` identifica todos os artigos ainda sem explicação.

Neste marco, 35 dos 42 percursos têm explicação publicada para todos os dispositivos cadastrados como vigentes. Faltam 1.346 explicações em sete percursos: Segurança Privada (72), LEP (216), Estatuto da Pessoa Idosa (117), ECA (326), Migração (123), Pessoa com Deficiência (127) e CTB (365). O trabalho completo não está encerrado. A enumeração integral impede confundir exercícios literais gerais com exemplos individuais já concluídos.

Validação deste lote: 77 testes passaram, incluindo conflitos concorrentes, texto alterado, edital inativo, cobertura integral do lote, preservação de revisões e renderização da resposta fechada. A compilação de produção da interface foi concluída. Nenhuma questão do treinador foi criada ou alterada neste lote.

## Reexecução

`node scripts/import-article-explanations.mjs LOTE_JSON RELATORIO_JSON --dry-run` valida o arquivo sem acessar o banco. Para aplicação, use apenas variáveis de ambiente da sessão: `TASK_SUPABASE_PROJECT`, `TASK_SUPABASE_KEY` e `TASK_LIBRARY_REVIEWER`. Não gravar credenciais em código ou arquivos versionados. Reexecução de conteúdo já aplicado preserva os registros; conflito com uma revisão posterior interrompe o lote antes das escritas.

## Correção posterior: integridade da extração

Uma auditoria com HTML5 revelou que marcação antiga do Planalto cruzava limites de parágrafos e fazia o extrator anterior perder conteúdo. O novo extrator repara a árvore antes de ler os artigos e também trata padding fora do HTML UTF-16 sem aceitar corrupção dentro da lei. Foram aplicadas 36 correções de texto e recuperados os arts. 1º, 43, 172 e 184 do Código Penal. Os IDs dos registros existentes e o progresso associado foram preservados. O Código Penal passou de 397 para 401 dispositivos vigentes cadastrados.

Também foi retirada da leitura ativa a unidade do art. 182 da LEP, expressamente revogado pela Lei 9.268/1996. O registro foi preservado como excluído; não houve exclusão física de histórico. A LEP passa a 215 dispositivos vigentes.

Foram escritas e publicadas 40 explicações específicas para os dispositivos corrigidos: 22 substituem revisões anteriores conservadas no lote, e 18 são novas. Cada uma tem caso, variação e pergunta com resposta fechada. A conferência independente confirmou 2.141 explicações não alvo preservadas. O banco tem, neste marco, 2.181 explicações publicadas; faltam 1.331 em sete percursos. Não são 40 novas questões do treinador.

Os pacotes `html5-extraction-corrections-2026-10-11.json` e `html5-extraction-corrections-plus-revocation-2026-10-11.json` conservam as precondições das correções. `article-explanations-extraction-repair-2026-10-11.json` e `article-explanations-repair-applied-2026-10-11.json` documentam a revisão pedagógica. `article-html5-audit-2026-10-11.json` aponta sete diferenças editoriais de delimitação no CP que ainda precisam de tratamento, envolvendo títulos descritivos e agrupamento de dispositivos revogados; elas não foram silenciosamente substituídas. A auditoria registra zero artigos vigentes faltantes em relação a esta extração reparada; isso não certifica toda jurisprudência nem elimina a necessidade de novas verificações de fonte.

Validação posterior: 194 testes da aplicação e dez testes do extrator passaram; o build de produção passou. A paginação dos dispositivos ganhou desempate estável, e artigos recuperados são ordenados pelo número sem renumerar IDs. Snapshots e HTMLs integrais continuam fora do Git.

## Continuação: Segurança Privada concluída por dispositivo

Os 72 dispositivos vigentes da Lei 14.967/2024, incluindo o anexo, receberam explicação individual, caso, variação e exercício de resposta fechada. O preflight encontrou 71 rascunhos de outra rotina ainda em revisão; suas versões completas foram conservadas no campo `expected` e a publicação aplicou a revisão explícita com revisor/data. A leitura posterior confirmou os 72 publicados e 2.181 outras explicações preservadas.

O lote `article-explanations-security-2026-10-11.json` inclui evidência de três fontes tributárias oficiais adicionais registradas, além da lei principal. `security-future-effects-review-2026-10-11.json` aplica ao guia e percurso um aviso de efeito futuro: a LC 214/2025, art. 542, XVIII, b, e XXI, a, prevê a revogação dos dispositivos tributários alterados nos arts. 67 e 68 para 01/01/2027. O art. 544, III, foi conferido no texto compilado, inclusive a LC 227/2026. Não confundir a publicação da lei complementar com a produção de todos os seus efeitos. O aviso é destacado por estado temporal e conserva link externo à fonte oficial.

Neste marco, são 2.253 explicações publicadas e 36 percursos com todos os dispositivos vigentes explicados. Restam 1.259 explicações: LEP (207), Pessoa Idosa (117), ECA (325), Migração (123), Pessoa com Deficiência (127) e CTB (360). O relatório de leitura independente é `article-explanations-security-applied-2026-10-11.json`. Esses totais descrevem a cobertura dos dispositivos cadastrados; não são contagem de questões do treinador nem certificação de toda jurisprudência.

## Correção de parágrafos órfãos e proteção dos rascunhos

A revisão de fronteiras identificou notas de artigos revogados anexadas ao dispositivo anterior. Foram corrigidos 14 textos em CIN, LEP, Pessoa Idosa, Contravenções, ECA, RIC e Lavagem, mantendo os IDs, posições, recuperação ativa e vínculos. Outros 3.656 dispositivos permaneceram iguais. O art. 16 da Lei 9.613 foi retirado da leitura ativa, preservando seu registro e histórico: a revogação é expressa no art. 14 da Lei 13.974/2020. O art. 232 do ECA continua vigente; o art. 4º da Lei de Tortura revogou o art. 233. Também foi corrigido o rascunho que afirmava a revogação incorreta do art. 232.

As 14 explicações específicas foram revisadas e publicadas: oito revisões anteriores ficam conservadas em `expected` e seis explicações são novas. Foram removidos avisos indevidos de vigência encerrada, diferenciadas penas e incluídos caso, variação e recuperação com resposta. A lei-fonte do RIC permanece identificada como parcialmente revogada; isso permite revisar seus artigos remanescentes sem declarar todo o diploma vigente ou todo ele revogado. A verificação confirmou as 14 publicações e preservou 2.245 explicações não alvo. A auditoria reparada registra zero artigos faltantes e zero unidades inesperadamente ativas, permanecendo sete diferenças de títulos/delimitação no CP já registradas; isso não certifica a completude de toda jurisprudência.

Os 19 arquivos de rascunhos incorporados remotamente continham `ON CONFLICT DO UPDATE`, que poderia sobrescrever explicações publicadas mantendo indevidamente seu estado de revisão. Foram alterados para `DO NOTHING`, com precondições de hash exato, unidade vigente, curso e edital ativos e fonte oficial registrada. Dois comandos relativos ao art. 182 revogado da LEP foram removidos. Não houve publicação automática desses rascunhos; sua revisão jurídica continua necessária. A proteção se aplica aos scripts versionados, não é uma afirmação de bloqueio universal de qualquer cliente do banco.

Neste marco, **2.258 explicações vigentes publicadas**, **36 percursos completos por dispositivo cadastrado** e **1.253 explicações pendentes**. Os relatórios `article-boundary-verification-2026-10-11.json` e `article-boundary-audit-2026-10-11.json` conservam o inventário exato. Passaram 211 testes da aplicação, 12 testes do extrator e o build de produção. Nenhuma questão do treinador foi inserida ou alterada nesta etapa.
