# Carregamento dos painéis — 18/10/2026

## Correções

- Um provedor de autenticação compartilha perfil e permissões entre os componentes. Consultas simultâneas são agrupadas e resultados de contas anteriores são descartados. Revalidação ocorre em segundo plano, com identidade estável quando o perfil não mudou.
- O treinador mostra seu painel enquanto carrega questões; iniciar uma sessão exige concluir a conferência atualizada do histórico. Erros nessa conferência bloqueiam o início e oferecem nova tentativa.
- O catálogo já convertido fica em cache por conta por 60 segundos, mantendo os filtros de elegibilidade existentes. A consulta de vigência começa junto às fontes e a paginação solicita até 1.000 registros, respeitando limites menores do servidor.
- Consultas canceladas e falhas de rede não provocam uma segunda leitura do acervo como se fossem incompatibilidade de esquema.
- Rotas principais recebem pré-carregamento. O acervo mostra seu cabeçalho durante a primeira carga. Consultas independentes do painel passam a rodar em paralelo; a verificação de conquistas deixa de ocorrer a cada cinco segundos e pausa com a página oculta ou sem rede.

## Evidência

Teste reproduzível: `python3 scripts/qa/dashboard-loading.py`, com Vite na porta 5173 e Chromium/Playwright. Todas as requisições Supabase são interceptadas, sem dados reais. Latência simulada: 400 ms para perfil/permissões e 1.200 ms para fontes/histórico.

| Medida | Antes | Depois |
|---|---:|---:|
| Primeira abertura do painel do treinador | 5.121 ms | 480 ms |
| Segunda abertura | 981 ms | 341 ms |
| Pares de consultas perfil/permissões durante a navegação | 3 | 0 |

A primeira sessão ficou pronta em 2.881 ms e a segunda em 1.590 ms: o botão aguarda dados e histórico válidos. Esses números medem um cenário controlado em desenvolvimento, não garantem tempos de produção ou dados instantâneos em qualquer rede.

Validações concluídas: TypeScript, build de produção, sete arquivos de testes direcionados (autenticação, planos, progresso de visitante, navegação e governança do corpus), incluindo concorrência/troca de conta/logout e paginação limitada pelo servidor. Verificação mobile em navegador confirmou geometria estável, rolagem independente, navegação, restauração ao voltar, teclado e saída para página pública.

Nenhuma questão ou registro de produção foi alterado. Limites diários e verificações de elegibilidade foram preservados.
