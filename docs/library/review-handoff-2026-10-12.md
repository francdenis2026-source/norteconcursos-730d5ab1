# Revisão editorial — continuidade de 12/10/2026

## Estado confirmado no banco

3.511 dispositivos ativos: 1.224 com metadados de aprovação editorial atual
(revisor, data e hash correspondente), 2.287 pendentes. São unidades da
biblioteca, não questões do treinador. Fonte: review-coverage-2026-10-12.json.

Drogas 84/84; Desarmamento 41/41; Maria da Penha 56/56;
Contravenções 66/66; Antifacção 43/43; **Crimes Ambientais 79/79**.
As demais leis anteriormente concluídas continuam preservadas.

Esta continuidade publicou 42 revisões ambientais em dois blocos (20 e 22),
com casos, variações, requisitos, alertas e perguntas respondidas. Primeiro
bloco enviado à main em 28ff810, com integração das alterações remotas.
A leitura completa confirmou os 42 itens e a preservação de outras 3.471
explicações e sete tabelas. Nenhum dispositivo excluído foi reativado.

A cobertura não certifica toda jurisprudência, regulamentação ou detalhe.
Nos arts. 60/67 foram conferidas as redações compiladas e Lei 15.190/2025.
A notícia do STF comprova ajuizamento; as consultas processuais falharam,
portanto **não foi certificado o estado decisório atual das ADIs**. Não
inferir julgamento concluído, constitucionalidade ou suspensão universal.
Os alertas de aplicação bloqueiam treino automático de literalidade nos
arts. 49, 60, 67, 71 e 79-A. A implantação desses alertas no domínio público
não se presume pelo push; publicação no banco tem readback independente.

## Código Penal — continuidade posterior

50 revisões novas em dois blocos: arts. 2–31 e 32–41/44–46/48–54.
CP chegou a 70/401, com 331 pendentes; fonte compilada comparada aos 401
ativos sem diferenças. 50 casos, 50 variações e 100 perguntas respondidas,
sem questões novas no treinador. A leitura completa preservou as outras
3.463 explicações e sete tabelas. Primeiro envio: 108cf1c.

Constituição, Lei 9.069, Lei 10.216, LEP e PDF oficial STJ consultados.
ADPF 779: publicação institucional confirma julgamento de 2023, sem alegar
leitura integral do acórdão; consulta processual retornou 403.
Regime inicial, substituição, saúde mental, multa e referência residual
do art. 54 têm qualificações; não se certifica toda política ou decisão
específica da execução penal. 321 testes, TypeScript e build passaram
antes da integração final das alterações remotas. Após integrar sessão e
inatividade do modo foco, 324 testes, TypeScript e build passaram.

Retomar CP nos arts. 55 e seguintes conforme cp-checkpoint-2026-10-12.json,
conferindo novamente banco e revisões concorrentes. Usuário informou 70%
do limite; isso não é leitura automática nem demonstra chegada aos 5%.

## Retomada

Consultar novamente remoto, alterações locais e banco antes de escrever.
Não duplicar revisões ambientais. Pendências registradas:

- CPP: 808.
- Código Penal: 331; prioridade atual por orientação expressa do usuário.
- CTB: 348.
- ECA: 322.
- LEP: 206.
- Migração: 123.
- Juizados: 98.
- Budapeste: 51.

Seguir as prioridades do usuário e trabalhar em blocos por assunto.
Não criar perguntas categóricas para trechos históricos, revogados ou
interpretações incertas. Reutilizar importador com dry-run, preflight,
estado anterior esperado, confirmação de gravação e comparação completa.

CONTRAN permanece com 90 guias atuais e 163 candidatos da triagem inicial,
separados das unidades jurídicas acima. Reconsultar catálogo oficial e
checkpoint antes de ampliar; não contar candidatos como atos certificados.

315 testes JavaScript, TypeScript e build passaram na continuidade. O
extrator não precisou de alteração. Fontes completas, snapshots e logs
ficam em outputs ignorados. Credenciais ficam somente no ambiente.

## Limites

A conta anterior informou parada com 95% consumidos; esse percentual não
foi herdado nem usado como saldo atual. Esta sessão não fornece ferramenta
de leitura dos créditos, portanto o corte exato em 5% **não foi medido**.
Não prometer monitoramento ou retomada automática. Guardar checkpoints e
finalizar a publicação verificada antes de interromper um bloco.
