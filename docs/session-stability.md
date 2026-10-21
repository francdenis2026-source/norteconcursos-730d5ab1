# Estabilidade da autenticação

A autenticação é mantida pelo cliente Supabase compartilhado, que persiste a sessão e renova
o token. Expiração, revogação pelo servidor e saída solicitada pelo usuário continuam válidas.

O antigo controle `active_user_sessions` identificava abas com `sessionStorage`: abrir outra
aba substituía o registro e provocava uma saída que também atingia o armazenamento compartilhado.
A aplicação deixou de usar essa tabela para encerrar sessões ou impedir respostas.
A tabela antiga fica preservada para evitar alterações desnecessárias nos dados existentes.

## Uma aba por sessão

O `SessionTabGuard` permite **uma única aba ativa por sessão no mesmo navegador e origem**.
A primeira aba adquire um Web Lock pelo `session_id`; as demais mostram uma tela de bloqueio,
sem montar o painel, os cronômetros ou o monitor de inatividade. A aba bloqueada não chama
`signOut`, não remove tokens e não renova o prazo de cinco minutos da aba original.

O bloqueio é atômico inclusive quando duas abas são abertas juntas. Não depende de um ID de
`sessionStorage` (que pode ser copiado ao duplicar a aba), de heartbeat, de visibilidade da aba
ou de consultas ao Supabase. Fechar a aba libera o lock pelo próprio navegador. A aba bloqueada
pode então usar **Tentar novamente**. A verificação aguarda até 150 ms para tolerar a limpeza
de uma instância anterior; depois de detectar outra aba ativa, cancela a espera e não permanece
na fila para tomar a sessão durante uma recarga posterior da aba original. Renovação de token preserva a mesma chave; um novo login usa outra.
Se o navegador não conseguir arbitrar o lock, a tela informa o problema e não libera acesso
sem confirmação. A regra não impede sessões independentes em outros aparelhos ou perfis de
navegador; essa política exigiria validação no servidor.

A contagem de estudo é pausada após dois minutos sem atividade. Separadamente, o
`SessionIdleGuard`, montado no provedor de autenticação, encerra a sessão após **cinco minutos
sem interação real**, com aviso no quarto minuto. A regra vale para aluno e administrador,
inclusive fora do painel. Reprodução de mídia continua válida para contabilização de estudo,
mas não renova o prazo de autenticação.

O prazo é persistido por usuário e pelo `session_id` do Supabase: uma interação em outra aba da
mesma sessão só renova o prazo se ela for a aba autorizada; recarga e renovação do token não o reiniciam. Um novo login tem
um novo prazo. Ao voltar de uma aba suspensa, a expiração é verificada antes de aceitar uma
nova interação. Eventos sintéticos, foco da janela e respostas da rede não contam como interação.

A saída usa escopo local, sem revogar sessões em outros aparelhos. Salvamento pendente não
bloqueia a saída: o backlog de estudo permanece no armazenamento para reenvio. Mesmo que a
requisição de saída ou o lock do SDK travem, em até 1,5 segundo os tokens locais são removidos
e a página é substituída por `/auth?reason=inactive`. Durante a saída há um diálogo bloqueando
interação. Isso é uma proteção do cliente; não altera a validade de JWTs no servidor.

O componente `ActivityTracker` mantém os eventos compartilhados de contagem de estudo. A verificação de papel
administrativo continua negando acesso quando a permissão não puder ser confirmada, mas não
revoga sessões válidas por falha de rede ou por uma conta comum abrir o login administrativo.

## Validação sem credenciais reais

Com o servidor local iniciado e Playwright/Chromium disponíveis:

```sh
PLAYWRIGHT_MODULE=/caminho/playwright-core/index.mjs node scripts/qa/session-tabs.mjs
PLAYWRIGHT_MODULE=/caminho/playwright-core/index.mjs node scripts/qa/auth-session-stability.mjs
```

O teste intercepta o Supabase e usa tokens fictícios: verifica administrador e aluno em duas abas,
bloqueio da segunda aba, recarga da primeira, abertura simultânea, liberação ao fechar a primeira,
aviso e saída após cinco minutos, retorno à aba e erros na consulta administrativa.
O cenário adicional de rede travada verifica a remoção local de tokens sem esperar o Supabase.
Não consulta nem escreve contas reais. A configuração de expiração/revogação no Supabase de
produção não é alterada por essas correções.

## Tipografia

Os títulos principais da homepage e das áreas autenticadas usam a fonte local Norte Insignia
(DejaVu Serif Condensed Bold, licença em `public/media/fonts/norte-insignia-LICENSE.txt`). É uma
aproximação do caráter do distintivo; a família exata não é identificável apenas pela imagem.
Textos de estudo, tabelas, controles e parágrafos mantêm Archivo para facilitar a leitura.
