# Revisão cuidadosa IDECAN — fontes oficiais e aplicação delimitada

Esta etapa começou com **337 posições aguardando liberação**: 145 `under_review` no catálogo e 192 pareceres privados da PC-CE ainda retidos. Não equivale à conclusão de toda a revisão IDECAN. O inventário inicial está preservado em `inventario-pendente.json`; a contagem posterior está em `contagem-final.json`.

## O que efetivamente foi aplicado

- **10 questões de Língua Portuguesa da PC-CE 2021, Escrivão Tipo B, itens 1–10:** publicadas no catálogo, com gabarito definitivo reconferido, texto de apoio integral de 26 linhas, identificação acessível dos termos sublinhados, explicação, erro comum e exemplo. A matriz temática é o edital PF 2025 efetivamente conferido. O texto jornalístico é histórico: suas hipóteses científicas não são apresentadas como descobertas atuais. `portugues-publicado.json` registra as dez leituras de confirmação.
- **3 questões jurídicas sobre uso da força:** PC-SC Agente Tipo B itens 31 e 34 e Escrivão Tipo A item 34. Dispositivos da Lei 13.060/2014 e do Decreto 12.341/2024 foram cotejados no Planalto; o tópico real de edital foi confirmado, assim como texto e gabarito. São explicações aprovadas, com fontes, data da conferência e exemplo. A vinculação temática à PF 2025 não prevê o futuro edital PC-AC. `uso-forca-publicado.json` registra a aplicação.
- **PMSC Tipo A item 49:** passou de `under_review` para `obsolete`. A resposta histórica faz referência à dispensa antes prevista no §6º do art. 147 do CTB. Os §§6º e 7º foram revogados pelo art. 2º da Lei 15.428/2026, com vigência na publicação, em 05/06/2026, conforme o art. 3º. O gabarito da prova foi preservado. Não tratar a exceção revogada como norma atual.
- **Quatro itens continuaram retidos com comentários/fontes corrigidos:** PC-SC Agente Tipo B item 25 (ressalva ambígua sobre culpa na LIA); PC-SC Escrivão Tipo A itens 23 (veto parcial com enumeração sem inciso), 25 (benefício isolado e redação anterior do art. 3º da LIA) e 33 (referência ao art. 5º do Decreto 12.341/2024 para tema que exige confronto com o art. 7º). Não foram declarados oficialmente anulados e seus gabaritos não foram modificados.

Os cinco últimos ajustes e as três liberações jurídicas têm comparação do registro anterior, filtro de atualização que protege revisões concorrentes, backup de progresso e auditoria antes/depois na tabela existente `idecan_pedagogical_review_audit`. Aplicações REST são **por registro**, sem alegação de transação global. Interrupção entre atualização e auditoria pode ser retomada pelo relatório privado sem aplicar de novo a alteração. O lote de português usa a RPC de refinamento auditado do acervo e inserções públicas idempotentes, com confirmação de cada registro.

Os números desta pasta são o **recorte IDECAN**, não os totais globais da plataforma. Não substituem a RPC `get_public_question_summary`. A revisão integral continua pendente; não interpretar estes lotes como aprovação dos demais itens.

## Correção de transcrição PMSC — informática, itens 20–22

Conferência dos registros administrativos exportados em 23/10/2026 contra a página 7 do caderno Tipo A confirmou contaminações na importação: item 20, alternativa D; item 21, final do enunciado e alternativas A/B; item 22, todas as alternativas. O gabarito definitivo publicado pela IDECAN foi conferido separadamente: 20-E, 21-D e 22-B. Os hashes, excertos e estado exportado estão em `revisao-integral/revisao-pmsc-informatica.json`.

`revisao-integral/pmsc-informatica-correcao.sql` restaurou o texto comprovado e incluiu explicações, conforme a saída SQL recebida do usuário. O edital oficial PF 2025, atualizado pela Retificação nº 4, contém explicitamente os três tópicos: ambiente Linux (2.2/17.1), planilhas Microsoft Office/LibreOffice (2.4) e malware/anti-spyware (4.1/4.2). `revisao-integral/pmsc-informatica-vinculo-edital.sql` vincula os registros à matriz de Agente PF 2025, grava a evidência na auditoria e os torna `active` para estudo compatível com esse edital. O usuário confirmou que aplicou o lote. Essa compatibilidade não prevê o futuro edital PC-AC. A leitura pública não tem permissão para consultar linhas individuais de `board_exam_questions`; por isso não afirmo uma leitura independente dessas linhas.

## Próximo item existente: PMSC Tipo A, item 29

O snapshot administrativo disponível não contém os itens 23–28; o próximo registro encontrado é o item 29. O gabarito definitivo é E. A versão vigente do art. 2º da Lei 14.751/2023 confirma literalmente “permanentes, exclusivas e típicas de Estado”. O Anexo II do Edital PMSC nº 200/CCP/2025 inclui expressamente a Lei 14.751/2023 em Legislação Institucional (páginas impressas 51–52). PDFs oficiais, hashes, explicação individual e alternativas estão em `revisao-integral/revisao-pmsc-item29.json` e `fontes-coletadas.json`.

`revisao-integral/pmsc-item29-lonpm.sql` registra a edição e o tópico oficiais da própria seleção, a fonte legal do Planalto, a explicação das cinco alternativas e a auditoria antes/depois; promove somente o item 29. O lote ainda precisa ser aplicado no Supabase. A liberação se limita ao edital histórico PMSC 2026 e não sugere previsão para PC-AC.

## Próximo item existente: PMSC Tipo A, item 31

O item 30 não aparece no snapshot administrativo; o próximo registro após 29 é o 31. O gabarito definitivo IDECAN confirma A. O texto compilado oficial do Código Penal mantém no art. 218-C a conduta descrita na questão; a Lei 15.280/2025 alterou a pena do caput, mudança explicitada na explicação. O Anexo II do Edital PMSC nº 200/CCP/2025 inclui expressamente os arts. 213 a 218-C (página impressa 52). A conferência e os hashes estão em `revisao-integral/revisao-pmsc-item31.json` e `fontes-coletadas.json`.

`revisao-integral/pmsc-item31-art218c.sql` registra a redação atual, o edital PMSC, a explicação das alternativas e a auditoria antes/depois; promove somente o item 31. O lote ainda precisa ser aplicado no Supabase. A liberação se limita à edição PMSC 2026 e não constitui previsão para PC-AC.

## Próximo item: PMSC Tipo A, item 32

O gabarito definitivo IDECAN confirma D. O enunciado reproduz o art. 101 do Código Penal (“A ação penal no crime complexo”), abrangido pelo edital PMSC nº 200/CCP/2025, Anexo II, arts. 100 a 105. A fonte legal é o texto compilado do Planalto; a explicação distingue as alternativas pelos arts. 100 a 102 e pela regra do perdão na ação privada. A análise individual está em `revisao-integral/revisao-pmsc-item32.json`.

`revisao-integral/pmsc-item32-crime-complexo.sql` reutiliza o tópico PMSC de Legislação Penal conferido no item 31, sem criar duplicidade, e promove apenas o item 32 após comparar a questão e o estado esperados. O lote ainda precisa ser aplicado no Supabase; não é previsão para PC-AC.

## Próximo item: PMSC Tipo A, item 33

O gabarito definitivo IDECAN confirma B. A alternativa reúne os incisos I, IV e VIII do art. 121, § 2º, do Código Penal. A explicação coteja também as regras atuais e alterações posteriores sobre menor de 14 anos, homicídio em instituição de ensino e hipótese própria do § 2º-D, sem tratá-las como se fossem qualificadoras gerais intercambiáveis. O texto compilado do Planalto e o Anexo II do edital PMSC (art. 121, p. 52) foram conferidos; ver `revisao-integral/revisao-pmsc-item33.json`.

`revisao-integral/pmsc-item33-homicidio-qualificado.sql` reaproveita o tópico validado de Legislação Penal e libera apenas o item 33, com auditoria antes/depois e guarda de estado. A aplicação no Supabase ainda está pendente. A revisão vale para a prova histórica PMSC e não prevê PC-AC.

## Próximo item: PMSC Tipo A, item 34

O gabarito definitivo IDECAN confirma C. A apropriação indébita previdenciária (art. 168-A), o esbulho possessório (art. 161, § 1º, II) e o abuso de incapazes (art. 173) pertencem ao Título II do Código Penal. O texto vigente e a abrangência de arts. 121 a 180-A no Anexo II do edital PMSC, p. 52, foram conferidos. A análise individual está em `revisao-integral/revisao-pmsc-item34.json`.

`revisao-integral/pmsc-item34-crimes-patrimonio.sql` reaproveita o tópico validado de Legislação Penal e libera somente o item 34 com auditoria e conferência do estado anterior. Ainda precisa ser aplicado no Supabase; não constitui previsão PC-AC.

## Próximo item: PMSC Tipo A, item 35

O gabarito definitivo IDECAN confirma E; o edital inclui arts. 1º a 28 do Código Penal. A alternativa resume a hipótese do art. 28, § 1º, mas omite que a isenção exige incapacidade total no momento do fato. A explicação complementa esse requisito legal e distingue embriaguez voluntária/culposa, capacidade parcialmente reduzida e incapacidade total. Registro em `revisao-integral/revisao-pmsc-item35.json`.

`revisao-integral/pmsc-item35-embriaguez-involuntaria.sql` usa o tópico de Legislação Penal já validado, mantém o gabarito histórico E, substitui a explicação preliminar e libera apenas o item 35, com auditoria antes/depois. Aplicação no Supabase pendente; a revisão vale para a prova PMSC e não prevê PC-AC.

## Próximo item: PMSC Tipo A, item 36

O gabarito definitivo IDECAN confirma C. Comparei CP art. 24 e art. 14, parágrafo único, com CPM arts. 30, parágrafo único, 39 e 43 no texto compilado oficial, já após a Lei nº 14.688/2023. As diferenças cobradas são os regimes de estado de necessidade e a possibilidade expressa no CPM de, em excepcional gravidade, aplicar a pena do crime consumado na tentativa. O edital PMSC inclui CPM arts. 29 a 47 (Anexo II, p. 52). Evidências em `revisao-integral/revisao-pmsc-item36.json`.

`revisao-integral/pmsc-item36-diferencas-cp-cpm.sql` registra a fonte do CPM e um tópico de Legislação Penal Militar específico da edição PMSC, depois libera somente a questão 36 com auditoria. Ainda depende de aplicação no Supabase e não prevê PC-AC.

## Itens PMSC Tipo A, 37–40

Os quatro gabaritos definitivos foram conferidos: 37-E, 38-B, 39-A e 40-D. O CPM compilado no Planalto, já após a Lei 14.688/2023, foi cotejado com o caderno; o edital PMSC prevê CPM arts. 1º–9º, 29–47, 149–204 e 298–339 (Anexo II, p. 52). As explicações individualizam lugar do crime omissivo (art. 6º), omissão de lealdade militar (art. 151), crimes contra serviço/dever militar (arts. 194, 196 e 197) e inobservância de lei (art. 324). Evidências detalhadas: `revisao-integral/revisao-pmsc-itens37-40.json`.

`revisao-integral/pmsc-itens37-40-cpm.sql` é um lote transacional com quatro guardas individuais de identidade, texto, opções, gabarito e estado; audita cada alteração e cancela o lote inteiro se houver divergência. Ele cria/reutiliza o tópico militar próprio da edição PMSC e libera apenas esses quatro itens. Ainda precisa ser aplicado no Supabase; não constitui previsão PC-AC.

## Pareceres e evidências

`pareceres-juridicos-legado.json` contém **101 pareceres individuais iniciais**, com explicação, erro comum, exemplo, referências e impedimentos específicos. Esse arquivo de etapa inicial **não aprova os 101 para publicação**. O parecer preliminar é superado somente nos itens e campos expressamente documentados nos relatórios de aplicação acima. As outras decisões ainda dependem de contexto, gabarito, pertinência a edital, doutrina ou jurisprudência, conforme o caso.

`fontes-primarias.json` registra downloads, datas, SHA-256 e tratamento de codificação. `excertos-juridicos.json` arquiva os dispositivos selecionados. Foram consultados Planalto, ALESC e ONU/OHCHR, conforme a norma. Dispositivos riscados/revogados são excluídos do texto extraído; referências inline não podem substituir o cabeçalho do artigo. Artigos repetidos em partes diferentes, como Constituição/ADCT, permanecem separados para seleção contextual, sem fusão automática.

Um retorno HTTP 200 não certifica atualização ou aplicação de uma norma. A Lei Maria da Penha foi servida em UTF-16 com 1.559 bytes ASCII de espaço depois do fechamento do HTML; a normalização foi registrada, mantendo o hash dos bytes originais. Os testes impedem tratar texto truncado ou com NUL como dispositivo válido. A fonte do STF que retornou 404 é mantida como falha, nunca como evidência positiva. O PDF oficial de súmulas do STJ foi obtido e os excertos específicos arquivados; isso não substitui conferir eventuais julgamentos posteriores relevantes.

## Pendências que não podem desaparecer por importação

- O gabarito de Inspetor PC-CE contém cabeçalho preliminar em arquivo listado como definitivo. A dúvida não foi apagada.
- Conteúdo jurídico histórico precisa de vigência e aplicação temporal verificadas, não apenas de um link atual. Questões com fato datado podem exigir a redação anterior e comparação de leis.
- Parecer, fonte localizada e questão ativa são estados diferentes. Não remover bloqueios em lote nem alterar gabaritos históricos para fazer uma alternativa parecer correta.
- Há ainda questões já ativas sem explicação no catálogo antigo, além da fila de liberação. A contagem `active_board_without_explanation` permanece explícita no relatório: estar ativa não comprova revisão pedagógica completa.
- Não somar as dez publicações do acervo como dez questões históricas inéditas: são representações públicas de posições já incluídas no acervo de 473.

## Reprodução e continuação

Os scripts `publish-reviewed-portuguese.py`, `apply-retained-legal-corrections.py` e `publish-use-of-force.py` têm escopos delimitados; credenciais entram somente pelo processo e não ficam no repositório. Os relatórios completos de recuperação, com antes/depois, ficaram fora do Git; resumos sem credenciais estão nesta pasta. Não regenerar uma expectativa antiga para sobrescrever uma revisão atual: recarregar e conferir primeiro.

O lote de uso da força recusa nova execução com conferência antiga: revalidar as fontes antes de qualquer nova publicação. As aplicações existentes estão registradas nos relatórios e na auditoria do banco.

Validação desta etapa: testes do publicador (idempotência, revisão concorrente, fonte/tópico e contexto), retomada da auditoria, extração de fontes, regra de vigência, proteção de gabaritos e filtro real de elegibilidade das três questões jurídicas. A aprovação de um lote não certifica todos os itens da banca.
