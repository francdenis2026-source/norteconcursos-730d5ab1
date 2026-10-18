# Quatro pendências PC — fontes e pré-requisito de acesso

Conferência de 17/10/2026, horário de Brasília. Escopo: AM Investigador40, RJ Delegado48 e75 e MG TPAG48. As oito pendências de Rondônia permanecem fora deste lote.

O snapshot de2026-10-17T23:23:22.158Z confirmou quatro questões pendentes neste escopo. Nenhuma foi ativada, arquivada ou modificada nesta rodada. O total anteriormente verificado permanece12 PC em revisão, incluindo oito RO. Não se considera a preparação de acesso à internet como revisão editorial concluída.

## Resultado da investigação

| Questão | O que está comprovado | O que falta |
| --- | --- | --- |
| AM Investigador40 | Caderno página8, chaveA no definitivo multicargos página5, cálculo19.000 e programa de depreciação nas páginas48–49; edição já corrigida | Conferência direta da norma CPC27/CPC23 e aceitação da fonte contábil no sistema, se a revisão confirmar o conteúdo. Não retirar a base normativa para contornar o filtro. |
| RJ Delegado48 | Caderno página14 e chaveA | Texto primário aplicável à requisição ao TCE-RJ e ao encaminhamento pelo PGJ. A ALERJ está acessível, mas o texto de leis usa outro domínio; TCE-RJ retornou503. Não liberar somente por eliminação das demais alternativas. |
| RJ Delegado75 | Caderno página23, chaveD e existência de decisões sobre simetria das imunidades | Fundamento específico para o cabimento de reclamação na hipótese e alcance da redação da alternativaD. O próprio portal STF fornece link para serviço de jurisprudência cujo host não está liberado no ambiente atual. |
| MG TPAG48 | Caderno específico página3, quatro alternativas, chaveB e programa pertinente | Leitura de fonte técnica específica suficiente para a afirmação sobre refrigeração, autólise e putrefação. Os resumos indexados públicos do PMC foram consultados, mas as páginas dos artigos retornaram verificação de navegador; não houve tentativa de contornar a verificação ou alegação de leitura integral. |

O documento oficial Cebraspe `PC_RJ_JUSTIFICATIVAS_DE_ALTERAES_DE_GABARITO_VF.PDF` foi obtido. Trata apenas dos itens27,33,50 e72; não foi usado para atribuir fundamento ou alteração de chave aos itens48/75. Captura bruta e PDFs permanecem em outputs ignorados.

## Configuração preparada, ainda sem efeito no ambiente atual

A leitura da configuração mostrou política de rede restrita. A inclusão dos destinos abaixo foi salva no rascunho, preservando os hosts existentes e sem mudar segredos, repositórios ou scripts:

- `www.cpc.org.br`
- `cfc.org.br`
- `www.cfc.org.br`
- `www1.cfc.org.br`
- `conteudo.cvm.gov.br`
- `iris.paho.org`
- `applications.emro.who.int`
- `alerjln1.alerj.rj.gov.br`
- `jurisprudencia.stf.jus.br`

Último retorno de `update_environment_config_draft`: `status=saved`, `requires_publish=true`. Salvar o rascunho não aplica a configuração à máquina nem comprova que os servidores externos responderão. É necessário revisar e salvar nas configurações do ambiente e publicar o ambiente. Depois disso, repetir as requisições bloqueadas e retomar as verificações; não presumir resolução automática das dúvidas jurídicas.

A [skill cloud-environment-onboarding:setup](skill://plugin_connector_1p_ed5feb9070a08191b08c81c47947bc16/setup/SKILL.md) distingue expressamente essas etapas: “Saving persists configuration; it does not execute scripts, apply runtime changes, or publish.” O requisito de publicação também foi informado explicitamente pela ferramenta. Não é um pedido de nova autorização para atualizar banco ou main, já autorizados pelo usuário; é um pré-requisito técnico para acessar as fontes que faltam.

Não houve mudança de aplicação nesta rodada; não foi executado build nem criada validação fictícia para documentar acesso indisponível. As alterações remotas da outra conta foram integradas sem reescrever histórico.


## Atualização em18/10/2026

AM Investigador40 foi concluída e publicada: o domínio www1.cfc.org.br respondeu200 e permitiu consultar os PDFs consolidados, histórico SRE e Revisão NBC31. Não se presume publicação do rascunho de rede a partir desse resultado isolado. A aplicação passou a reconhecer somente os dois PDFs contábeis verificados. Evidência: `docs/question-review-am40-2026-10-18.json`.

Restam neste recorte RJ48/75 e MG48; somadas às seis pendências de Rondônia, são nove no banco atual. O teste do serviço jurisprudencia.stf.jus.br ainda retornou403, e iris.paho.org excedeu o tempo de resposta nas duas rotas já identificadas. A compilação SAPL da LC68 exige login. Esses resultados não autorizam presumir o conteúdo das fontes nem concluir divergências jurídicas ainda abertas.
