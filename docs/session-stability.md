# Estabilidade da autenticação

A autenticação é mantida pelo cliente Supabase compartilhado, que persiste a sessão e renova
o token. Expiração, revogação pelo servidor e saída solicitada pelo usuário continuam válidas.

O antigo controle `active_user_sessions` identificava abas com `sessionStorage`: abrir outra
aba substituía o registro e provocava uma saída que também atingia o armazenamento compartilhado.
A aplicação deixou de usar essa tabela para encerrar sessões ou impedir respostas. Isso também
permite sessões simultâneas: uma política de dispositivo único, se necessária no futuro, deve ser
implementada no serviço de autenticação, com identificação de sessões e revogação no servidor.
A tabela antiga fica preservada para evitar alterações desnecessárias nos dados existentes.

A inatividade pausa a contabilização do estudo após dois minutos, sem logout. O componente
`ActivityTracker` mantém os eventos compartilhados entre os consumidores. A verificação de papel
administrativo continua negando acesso quando a permissão não puder ser confirmada, mas não
revoga sessões válidas por falha de rede ou por uma conta comum abrir o login administrativo.

## Validação sem credenciais reais

Com o servidor local iniciado e Playwright/Chromium disponíveis:

```sh
PLAYWRIGHT_MODULE=/caminho/playwright-core/index.mjs node scripts/qa/auth-session-stability.mjs
```

O teste intercepta o Supabase e usa tokens fictícios: verifica administrador e aluno em duas abas,
16 minutos simulados sem interação, retorno à aba, recarga e erros na consulta administrativa.
Não consulta nem escreve contas reais. A configuração de expiração/revogação no Supabase de
produção não é alterada por essas correções.

## Tipografia

Os títulos principais da homepage e das áreas autenticadas usam a fonte local Norte Insignia
(DejaVu Serif Condensed Bold, licença em `public/media/fonts/norte-insignia-LICENSE.txt`). É uma
aproximação do caráter do distintivo; a família exata não é identificável apenas pela imagem.
Textos de estudo, tabelas, controles e parágrafos mantêm Archivo para facilitar a leitura.
