# Distintivo e sala de videoaulas

Implementação enviada à main em `7ba535a9`, conforme solicitação de envio imediato.

| Antes | Depois | Por quê |
| --- | --- | --- |
| Distintivo sem interação | Inclinação com mouse, giro ao clicar ou usar teclado e reflexo discreto | Restaurar a interação solicitada com movimentos limitados |
| Efeitos decorativos sem relação com visibilidade | Animações pausadas fora da tela e na aba oculta; movimento reduzido respeitado | Evitar trabalho contínuo sem benefício visual |
| Listas de aulas com players distribuídos | Player principal com disciplina e conteúdo em destaque, fila pesquisável e modo foco | Priorizar o material em estudo e reduzir distrações |
| Reprodução com apresentação genérica | Composição existente no pôster e na moldura dos controles, sem cobrir o vídeo | Manter a identidade visual durante o estudo |
| Dependência dos controles originais | Comandos pela API oficial, com alternativa de controles do YouTube e abertura externa | Permitir navegação personalizada e recuperação de falhas |

## Verificação

- Build de produção concluído em cópia temporária, sem alterar arquivos de versão do checkout.
- TypeScript e ESLint dos arquivos TS/TSX alterados aprovados.
- Quatro testes do carregador da API: reutilização, concorrência, erro com nova tentativa e timeout.
- Onze testes existentes de atividade e ENEM aprovados.
- Chromium: reprodução/pausa, sequência, busca temporal, som, velocidade, troca de fonte, limpeza e nova tentativa, usando uma implementação simulada da API oficial.
- Busca e modo foco preservam o iframe em reprodução; atividade de mídia reconhecida pelo mecanismo existente.
- Falha de script, alternativa com iframe nativo, retorno aos controles personalizados e tela cheia verificados.
- Fonte marcada como não incorporável permanece externa. Rota continua protegida para visitante anônimo. Serviços de autenticação e catálogo simulados localmente nos testes, sem gravações remotas.
- Temas claro/escuro em larguras de 320, 390, 768 e 1440 px, sem transbordamento horizontal. Verificação visual dos tamanhos de 390 e 1440 px.
- Distintivo: inclinação, giro por mouse/teclado, pausa fora da tela e preferência de movimento reduzido aprovados, sem erros JavaScript.

## Limites e veredito

**Approve:** implementação, interações e integração local com API simulada. Os fundos das faixas da homepage e as demais seções foram preservados.

**Block para aprovação de reprodução real:** o ambiente retorna bloqueio de rede para `www.youtube.com/iframe_api`. Os testes simulados não comprovam reprodução real, disponibilidade das aulas ou comportamento de cada canal. A alternativa de iframe utiliza o player oficial, mas também depende da disponibilidade do YouTube. Falta validar reprodução em rede sem esse bloqueio e em celular físico; os testes móveis foram em navegador com telas simuladas.

O envio à main sincroniza o código; este registro não comprova publicação do site pelo provedor.
