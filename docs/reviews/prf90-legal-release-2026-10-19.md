# PRF 2021 — questão 90 revisada e liberada

A questão `8fd7fd64-a6ef-416d-b92a-426091e3cc13`, item 90 da PRF 2021, foi revisada e passou a `active` no Supabase em 19/10/2026. O gabarito oficial definitivo **Certo (C)** foi preservado, assim como o enunciado original e o texto de apoio compartilhado.

## Conferência documental

O catálogo oficial do Cebraspe voltou a responder. Foram obtidos diretamente do domínio oficial e conferidos visualmente:

- Caderno `578_PRF_001_01.PDF`, página PDF 5: cenário de contrato de treinamento, multa por inexecução, mandado de segurança e item 90.
- Gabarito oficial definitivo `GAB_DEFINITIVO_578_PRF_001_01.PDF`, página 1: item 90 = C.
- Edital de abertura `ED_1_PRF_2021_ABERTURA.PDF`, página 39: Direito Administrativo, item 6 — controle da Administração, especialmente 6.2 — controle judicial.
- Retificação nº 2: seu trecho de alteração do conteúdo programático é de Trânsito e Penal; não substitui o recorte de controle judicial do edital.

Os arquivos são listados no catálogo oficial `https://apis.cebraspe.org.br/cebraspe/eventos/PRF_21`. Os hashes do catálogo e dos PDFs foram verificados pelo fluxo de cadastro existente.

## Correções efetivas no banco

Foram cadastradas as três fontes específicas, e somente o campo `source_id` da edição histórica PRF 2021 foi corrigido da listagem genérica para o edital oficial. A fonte genérica anterior foi preservada, sem alterar seus metadados. Um tópico específico de controle judicial foi acrescentado, preservando o tópico histórico anterior.

Na questão 90 foram substituídas as referências genéricas por caderno e gabarito exatos, corrigida a página de 6 para **5**, conferido o contexto e concluída a revisão jurídica. A marcação de contexto pendente foi retirada somente após confronto com o PDF e com a linha integral do texto de apoio já existente.

O contexto não foi copiado novamente para o enunciado: o leitor já o apresenta por meio de `question_support_texts`. O reparador foi ampliado para reconhecer esse caso, exigir identidade de questão/concurso/ano/banca, contexto integral individualmente conferido e comparação da linha compartilhada, inclusive imediatamente antes da escrita. Nenhum texto de apoio foi alterado, e a proteção contra mudanças concorrentes foi mantida.

## Explicação pedagógica

Sindicabilidade significa possibilidade de submeter a atuação administrativa a controle. No aspecto judicial cobrado, o fundamento é a garantia do **art. 5º, XXXV, da Constituição**, que abrange lesão ou ameaça a direito. A expressão doutrinária não precisa constar literalmente da Constituição para que esse fundamento exista.

O comentário distingue acesso ao controle judicial, resultado da ação e substituição indevida de escolhas administrativas. Há exemplo da empresa multada, variação sobre ameaça ainda não consumada, contraste com a ausência de vitória automática e três perguntas respondidas. O cenário licitatório é identificado como histórico de 2021; não se ensina automaticamente seu regime como legislação licitatória atual.

Foi usada a cópia oficial do Planalto capturada em **16/10/2026**, com hash reconferido. As novas tentativas retornaram HTTP 503 e foram registradas; não se atribuiu captura nova nem precedente judicial não consultado.

## Validação e resultado

Todos os estágios passaram por dry-run e gravação protegida: fontes/edição, tópico, proveniência, contexto e revisão. A leitura independente de **220 registros PRF 2021** confirmou somente a questão 90 alterada, com os outros **219 preservados**, além de confirmação separada do texto compartilhado.

Passaram **42 testes direcionados**. A linha real salva também passou pelo filtro de elegibilidade do treinador: formato Certo/Errado, gabarito C e contexto apresentado uma vez. Não houve alteração de aplicação nesta revisão; novo build não era necessário.

| Pendência | Antes | Depois |
|---|---:|---:|
| Direito Administrativo | 73 | **72** |
| Todas as disciplinas | 397 | **396** |

A correção do edital e das referências não declara revisão integral dos demais registros ou do concurso. [Relatório com gravação, comentário, fontes, hashes e contagens](prf90-legal-release-2026-10-19.json). Evidências brutas, PDFs, imagens e snapshots continuam em outputs ignorados.
