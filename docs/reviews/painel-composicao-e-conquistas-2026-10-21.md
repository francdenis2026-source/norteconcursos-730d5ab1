# Área do aluno: composição compacta e avisos de medalhas

| Antes | Depois | Motivo |
| --- | --- | --- |
| Imagem em uma faixa acima do texto | Imagem integrada ao mesmo retângulo, à direita, com transição para a superfície de leitura | Reduzir altura e preservar texto acessível |
| Fundo repetido no conteúdo que rola | Uma camada fixa na janela, sem repetição e sem blur | A imagem permanece parada durante a rolagem |
| Aviso baseado no aumento do número de medalhas e no último item de uma consulta sem ordenação | Aviso apenas para itens novos devolvidos por `award_achievements`, confirmados na coleção salva | Impedir destaque de medalha antiga, erro de leitura ou reordenação |
| Atualizações sobrepostas e estado ligado apenas ao papel do usuário | Monitor por conta, requisição compartilhada enquanto está em andamento e cancelamento ao sair/trocar de conta | Evitar corridas e atualização da conta anterior |
| Toast grande sobre o topo do painel, com instrução imperativa da meta | Aviso compacto na parte inferior, confirmação de registro, link para coleção e botão Fechar acessível | Não cobrir o cabeçalho e explicar o significado do aviso |

## Auditoria funcional

A implementação anterior ignorava o retorno de `award_achievements`, comparava apenas `latest.length` e usava `latest[latest.length - 1]`. A consulta de coleção não ordenava os registros. Além disso, a primeira leitura podia falhar/atrasar enquanto o temporizador já funcionava, deixando a referência inicial em zero. Esses fatores permitiam anunciar um item antigo como novo.

Agora o RPC continua sendo a autoridade de concessão. O monitor só anuncia IDs que o RPC acabou de devolver e que uma leitura posterior confirmou em `user_achievements`. A consulta explicita o usuário da sessão e mantém RLS; não existe concessão no cliente. Erros no modo estrito não são convertidos em lista vazia. Um prêmio já emitido fica pendente de confirmação se a leitura falhar, para uma nova tentativa. IDs já anunciados não repetem o aviso na mesma instância; uma conta nova recebe outro monitor.

O SQL versionado define `FIRST_10` com meta 10. `award_achievements()` compara a meta com `medal_metrics(auth.uid())`, insere com conflito ignorado por `(user_id, achievement_id)` e retorna somente inserções novas. A versão posterior de `medal_metrics` usa primeiras respostas do treinador, respostas preenchidas de simulados, sequência, simulados e redações. Esse é um exame do código e das migrações do repositório: **não comprova que a conta exibida na captura atingiu a meta, nem que essas versões estão implantadas no banco de produção**. Não foram usadas credenciais dessa conta nem alterados seus registros. Nenhuma migração foi necessária para a correção do cliente.

Medalhas históricas e concessões já existentes continuam disponíveis na coleção, sem novo aviso apenas pelo aumento/reordenação da lista. O registro da conquista, não a animação, determina o estado exibido.

## Verificação

- TypeScript e ESLint dos arquivos alterados aprovados (sem a regra de formatação preexistente nos arquivos legados). Build de produção concluído em cópia temporária.
- 26 testes passaram: seis do monitor e os existentes de atividade, presença, resumo e dias de estudo.
- Monitor: histórico/reordenação sem aviso; novas concessões confirmadas e deduplicadas; prêmio não confirmado sem sucesso; leitura com erro e recuperação; cancelamento e concorrência; erro do RPC sem publicação de coleção vazia.
- Chromium em 320, 390, 768, 1024 e 1440 px, claro/escuro: cabeçalho de aproximadamente 192–205 px; sem transbordamento; texto alinhado e transição de leitura ativa.
- A posição da camada fixa foi comparada antes/depois da rolagem da janela e do painel interno. A imagem não se repete.
- Backend simulado localmente: histórico `FIRST_10` sem toast; nova medalha `ANSWERED_100` confirmada, mesmo com lista fora de ordem; fechamento do aviso; erro do RPC sem falso sucesso. Sem gravações remotas e sem erros JavaScript.
- Administração e ENEM não recebem a camada de identidade policial. Homepage, autenticação e renovação do Desafio diário preservadas.

**Approve:** composição e fluxo do cliente no navegador. Conferência dos registros reais e do SQL implantado em produção, além de teste em aparelhos físicos, permanecem pendentes.
