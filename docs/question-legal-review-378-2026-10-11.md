# Revisão oficial das 378 questões retidas — lote 01

Escopo fechado: os 378 IDs marcados como `quarantine` na revisão das 755 classificações. O manifesto individual contém 100 decisões; as outras 278 continuam sem conclusão individual nesta etapa. Encontrar uma URL não equivale a validar o gabarito.

## Resultado do lote

- 84 questões da PCDF: conferência individual de fundamento, gabarito definitivo e compatibilidade com o edital retificado de 2026; liberação com vínculo ao tópico atual.
- 2 questões da PCDF: fundamento jurídico confirmado, mas retenção por indicação de contexto/figura ainda pendente de conferência visual.
- 13 questões da PCRO de 2022: fundamento legal conferido; mantidas em revisão até confronto com edital atual.
- 1 questão de Regras de Mandela: fundamento confirmado na publicação oficial da ONU/UNODC; mantida em revisão por vínculo histórico/genérico.

O arquivo `question-legal-review-378-batch01-applied-2026-10-11.json` registra a leitura independente do banco e eventuais divergências. Não confundir as 294 questões ainda retidas com as 278 que ainda não têm decisão individual: as outras 16 têm fundamento conferido e uma pendência de publicação específica.

## Evidências e cuidados

O [edital retificado da PCDF](https://cdn.cebraspe.org.br/concursos/pc_df_26_delegado/arquivos/409522C3AA9E7D9736EC8A33888E0732BEE4FB07EABC75866BB311B2062C5FF9.pdf), o [caderno com justificativas preliminares](https://cdn.cebraspe.org.br/concursos/pc_df_26_delegado/arquivos/710BA7293977732DDD213CAE2E329E52507C348D3E446135F8978861CDA880F1.pdf) e o [gabarito definitivo](https://cdn.cebraspe.org.br/concursos/pc_df_26_delegado/arquivos/793E15AB2B5B357F2DD614A0ACAEE093B9DFE97618931164855D005CDFF89841.pdf) foram consultados. A justificativa preliminar não prevalece sobre o definitivo: no item 8, mantém-se **E**, distinguindo autorização legal e criação de empresa pública.

Referências oficiais de cada decisão constam em `legal_basis`, com data real de conferência e justificativa própria. Entre os pontos relevantes:

- [STF, Tema 1.260](https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?classeProcesso=ARE&incidente=6600698&numeroProcesso=1428742&numeroTema=1260): tese definitiva de 2026, não apenas o voto inicialmente proposto.
- [STJ, Tema 1.258](https://processo.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisar&aplicacao=informativo&livre=%40CNOT%3D%27021716%27): reconhecimento inválido não é corrigido automaticamente pela repetição judicial.
- [Código Penal](https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm), art. 122, §5º: a Lei 14.811/2024 passou a prever pena em dobro para liderança de grupo virtual. A alternativa correta da questão PCRO 77 permanece sustentada pelo §4º.
- [Lei Maria da Penha](https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm): foram considerados o regime de medidas protetivas, a pena atual do art. 24-A e a inclusão de violência vicária em 2026, distinguindo mudança da lei e mudança efetiva do gabarito.

Fontes federais foram confrontadas com o texto compilado do Planalto; jurisprudência, diretamente com STF/STJ; Regras de Mandela, com ONU/UNODC. A validade de dispositivos selecionados não significa auditoria integral de todo o diploma.

PDFs, extrações e fotografias do banco permanecem em `outputs/legal-review-378`, ignorado pelo Git. O caderno PCDF baixado tem SHA-256 `7cffe418e091007c1d3190a47775e67466b744293da54cee7b0942c3b899bd95`; a publicação Mandela, `5135d2b9c2ffb5d2bb5f48c17e4795f132b9aee860956d00e54994268f319abe`. Algumas tentativas de download direto do Planalto falharam; os dispositivos correspondentes foram consultados pelo navegador de pesquisa, sem inventar hashes de arquivos não obtidos.

## Aplicação e validação

`apply_378_review.py` é somente leitura por padrão. `--apply` registra as fontes consultadas e aplica exclusivamente as decisões explícitas, com filtros de concorrência, conferência de contexto/edital e leitura posterior. Credenciais são recebidas por `TASK_SUPABASE_URL` e `TASK_SUPABASE_SECRET`, somente no ambiente da sessão.

Os textos, gabaritos definitivos e vínculos históricos não são alterados. Revisões concorrentes bloqueiam a escrita; reexecuções reconhecem registros já aplicados. Falha de resposta a uma gravação exige nova conferência antes de repetir a operação.

Seis testes verificam preservação de texto/gabarito, concorrência, idempotência, bloqueio de contexto e edital, domínios semelhantes indevidos e filtros REST para valores nulos/JSON. A migração versionada reproduz o lote com transação e guardas de registro; a atualização desta sessão foi feita pelo aplicador REST, sem afirmar registro da migração no histórico remoto.

## Próxima etapa

Concluir as 278 decisões individuais restantes, com atenção a legislação estadual, alternativas incompletas, atualizações penais de 2026 e entendimento judicial superveniente. Uma questão histórica cujo gabarito tenha sido superado deve ser arquivada, preservando o original e a evidência; o gabarito oficial não deve ser reescrito.
