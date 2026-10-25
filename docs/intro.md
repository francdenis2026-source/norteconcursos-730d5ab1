# Introdução da homepage

A intro pertence ao documento que abriu a homepage, não à sessão da conta. O endereço
original vem da entrada `PerformanceNavigationTiming`; o marcador
`data-norte-intro-consumed` permanece no documento durante navegação e remontagens.
Um refresh ou uma nova janela cria outro documento. Entrar primeiro no login ou no painel
e depois navegar à homepage não inicia um vídeo atrasado.

O vídeo só começa após `norte:boot-ready`, para não tocar escondido pela abertura inicial.
Economia de dados, rede lenta e movimento reduzido preservam a imagem estática.
O botão de pular, o encerramento natural e os limites de carregamento/reprodução liberam
a homepage. A moldura usa os WebPs locais da identidade, sem alterar o vídeo ou adicionar
requisições ao Supabase. O carregamento inicial de SSR continua independente e só aparece
na abertura de um documento.

Validação local com Vite iniciado:

```sh
node --import ./scripts/alias.mjs --test scripts/document-intro.test.mjs
PLAYWRIGHT_MODULE=/caminho/playwright-core/index.mjs node scripts/qa/intro-navigation.mjs
PLAYWRIGHT_MODULE=/caminho/playwright-core/index.mjs node scripts/qa/initial-loading.mjs
```

Os testes de navegador usam respostas de API e contas fictícias. Verificam abertura,
retorno do login, navegação/volta, refresh, menus do painel, saída para a homepage,
preferência de movimento reduzido e ausência de repetição do carregamento inicial.
