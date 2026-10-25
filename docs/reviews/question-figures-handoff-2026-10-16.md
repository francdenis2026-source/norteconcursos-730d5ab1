# Exibição das figuras de questões

O treinador, simulador, revisão no caderno de erros e Desafio diário passam a mostrar as figuras cadastradas. A ampliação usa um diálogo na mesma página, com descrição acessível. O simulador também preserva o texto de apoio separado do enunciado.

O parser aceita imagens de provas registradas como linhas Markdown independentes, com descrição, somente em URLs HTTPS canônicas do bucket público `question-figures` do Supabase, sem credenciais, parâmetros ou travessia de diretórios. A extração preserva texto de apoio, alternativas e modo de resposta. Isso é suporte de exibição: não certifica a origem de uma imagem e não ativa automaticamente questões ainda pendentes de restauração ou auditoria.

A alteração remota `8a3a924`, que já mostrava figuras no treinador, foi integrada sem duplicar o componente. Os relatórios e revisões de RO e PE dos commits `6ef60c8` e `393a380` permanecem preservados. O último inventário editorial conferido nesta conta registra 123 pendências; essa contagem não é uma consulta ao banco em tempo real.

Validação: os 599 testes da suíte da aplicação passaram, sem falhas ou ignorados, após integrar a main. Os testes do parser cobrem preservação do contexto, alternativas, modos de resposta, deduplicação e rejeição de URLs indevidas. O teste de biblioteca passou a carregar a dependência real de mídia, preservando as verificações anteriores.

O build de produção também concluiu com sucesso no checkout integrado. Os arquivos de versão gerados pelo build local não foram incluídos no commit; a publicação da plataforma gerará sua própria versão.
