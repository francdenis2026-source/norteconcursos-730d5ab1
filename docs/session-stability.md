# Estabilidade da autenticação

A autenticação é mantida pelo cliente Supabase compartilhado, que persiste a sessão e renova
o token. Expiração, revogação pelo servidor e saída solicitada pelo usuário continuam válidas.

O antigo controle `active_user_sessions` identificava abas com `sessionStorage`: abrir outra
aba substituía o registro e provocava uma saída que também atingia o armazenamento compartilhado.
A aplicação deixou de usar essa tabela para encerrar sessões ou impedir respostas. Isso também
permite sessões simultâneas: uma política de dispositivo único, se necessária no futuro, deve ser
implementada no serviço de autenticação, com identificação de sessões e revogação no servidor.
A tabela antiga fica preservada para evitar alterações desnecessárias nos dados existentes.

A contagem de estudo é pausada após dois minutos sem atividade. Separadamente, o
`SessionIdleGuard`, montado no provedor de autenticação, encerra a sessão após **cinco minutos
sem interação real**, com aviso no quarto minuto. A regra vale para aluno e administrador,
inclusive fora do painel. Reprodução de mídia continua válida para contabilização de estudo,
mas não renova o prazo de autenticação.

O prazo é persistido por usuário e pelo `session_id` do Supabase: uma interação em outra aba da
mesma sessão renova o prazo, recarga e renovação do token não o reiniciam, e um novo login tem
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
PLAYWRIGHT_MODULE=/caminho/playwright-core/index.mjs node scripts/qa/auth-session-stability.mjs
```

O teste intercepta o Supabase e usa tokens fictícios: verifica administrador e aluno em duas abas,
atividade entre abas, aviso e saída após cinco minutos, retorno à aba, recarga e erros na consulta administrativa.
O cenário adicional de rede travada verifica a remoção local de tokens sem esperar o Supabase.
Não consulta nem escreve contas reais. A configuração de expiração/revogação no Supabase de
produção não é alterada por essas correções.

## Tipografia

Os títulos principais da homepage e das áreas autenticadas usam a fonte local Norte Insignia
(DejaVu Serif Condensed Bold, licença em `public/media/fonts/norte-insignia-LICENSE.txt`). É uma
aproximação do caráter do distintivo; a família exata não é identificável apenas pela imagem.
Textos de estudo, tabelas, controles e parágrafos mantêm Archivo para facilitar a leitura.
