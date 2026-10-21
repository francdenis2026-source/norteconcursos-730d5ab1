# Comparação da abertura da homepage

Escopo: hero e entradas de estudo, com três direções isoladas em `/prototypes/homepage`. A homepage publicada não foi substituída. Todas as oito skills solicitadas foram consultadas e aplicadas dentro desse escopo. Não houve alteração das regras, consultas ou limites do desafio diário.

| Skill                 | Aplicação concreta                                                                                                                                                                |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| emil-design-eng       | Hierarquia tipográfica, um CTA principal, espaços consistentes, temas e contraste sobre a imagem existente.                                                                       |
| animate               | Entrada opcional da imagem em 200 ms, transform/opacity, curva compartilhada, pressão 100 ms e retorno 160 ms. Trocas frequentes sem animação.                                    |
| review-animations     | Revisão abaixo, com achados da homepage original e decisão sobre o novo movimento.                                                                                                |
| animation-performance | Sem listeners de ponteiro por cartão, sem animações decorativas contínuas, sem nova biblioteca. Inspeção de código e execução com CPU limitada.                                   |
| mobile-native         | Controles principais de 44 px ou mais, touch-action, hover condicionado, svh, safe-area do cabeçalho, zoom permitido e texto selecionável.                                        |
| break-ui              | Fixtures no limite do contrato do contador, textos longos, zero, um e ausência de imagem/dados. Controle apenas em desenvolvimento e cache separado. Achados antes das correções. |
| prototype             | Três componentes e seletor especificado pela skill. Integração depende da escolha do usuário.                                                                                     |
| ask-sonner            | Toaster existente na raiz, confirmação de cópia e erro headless, id estável, dispensa e tokens de tema.                                                                           |

## Direções

| Versão      | Eixo                                                      | Quando usar                                    | Custo                                                    |
| ----------- | --------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------- |
| Operacional | Texto e imagem lado a lado; entrada de estudo logo abaixo | Equilibrar identidade policial e conversão     | A imagem recebe menos largura no desktop                 |
| Editorial   | Panorama largo, seguido de mensagem e entrada de estudo   | Dar protagonismo à composição com o distintivo | Maior altura inicial                                     |
| Direta      | Objetivo à esquerda e caminhos por abas à direita         | Priorizar a decisão de por onde começar        | A imagem é textura de apoio e as opções exigem interação |

As contagens de questões estão identificadas como demonstrativas. O desafio diário usa o componente real. Cadastro, login, âncoras e abas funcionam. Seleção preservada na URL; teclas 1/2/3 e setas alternam versões; R reproduz a entrada. Setas nas abas continuam pertencendo às abas.

## Design e movimento — Before / After / Why

| Before                                                                                     | After                                                                                                              | Why                                                                                                      |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Abertura original acumula efeitos de imagem, conteúdo e entradas                           | Três hierarquias distintas, cada uma com um CTA principal                                                          | Comparar densidade e prioridade antes de trocar a homepage                                               |
| Imagem com entrada de 1,5 s e atraso de 350 ms (`src/styles/home.css:4544`)                | Entrada opcional de 200 ms; nenhum atraso no conteúdo (`src/components/homepage-lab/homepage-lab.css:174`)         | A informação e as ações ficam disponíveis imediatamente                                                  |
| Flutuação de 6,5 s e oscilação de 9 s infinitas (`src/styles/home.css:4508`)               | Imagem estática após a entrada                                                                                     | Movimento recorrente não ajuda a escolher ou estudar                                                     |
| Saída de menu em `ease-in` (`src/styles/home.css:3309`)                                    | Proposta: curva compartilhada `--ease-out`, preservando origem do gatilho                                          | A saída atual demora a responder visualmente; a proposta ainda não foi aplicada ao menu original         |
| Quatro propriedades CSS herdáveis atualizadas por pointermove (`src/routes/index.tsx:197`) | Novas composições sem tilt ou tracking do ponteiro                                                                 | Elimina esse trabalho das novas composições; o custo do código original precisa de perfil em dispositivo |
| Troca de composição com possível entrada a cada seleção                                    | Troca instantânea; entrada somente no primeiro acesso ou replay (`src/components/homepage-lab/HomepageLab.tsx:47`) | A comparação é uma ação frequente; teclado não dispara entrada                                           |
| Notificações com estilos padrão potencialmente independentes do tema                       | Toast headless com tokens e id estável (`src/components/homepage-lab/HomepageLab.tsx:104`)                         | Contraste coerente e sem notificações duplicadas                                                         |

**Verdict — Block para promover o movimento original sem revisão.** A entrada longa, os loops e o ease-in são achados de percepção. Prioridade: remover loops e reduzir entrada; depois revisar a saída dos menus e medir o tracking do ponteiro. Não foram alterados durante a exploração.

**Verdict — Approve para o movimento das três propostas, no ambiente testado.** Entrada transform/opacity em 200 ms, curva do projeto, sem loops, pressão assimétrica e movimento reduzido respeitado. A seleção não anima o conteúdo. Exceção explícita: o seletor copiado da skill usa largura animada e blur; é ferramenta de comparação, não será integrado à homepage. A regra global de movimento reduzido reduz transições a 0,01 ms. Desempenho e toque em hardware real permanecem sem certificação.

## Mapa de dados e testes de quebra

| Campo                            | Origem                                                         | Contrato/limite                                                                                              | Opcional                            |
| -------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| Título e descrição               | `HeroFixture`, `fixtures.ts`                                   | Strings de apresentação; sem limite no tipo. Teste com carreiras e cargos reais em frase longa               | Não                                 |
| Imagem                           | URL da composição existente                                    | Sem limite de comprimento no tipo; teste de arquivo ausente                                                  | A composição tem alternativa visual |
| Questões disponíveis/cadastradas | Mesmo queryKey de QuestionCountBadge, em QueryClient exclusivo | Inteiro seguro não negativo; maior aceito pelo frontend: 9.007.199.254.740.991 (`QuestionCountBadge.tsx:13`) | Pode estar indisponível             |
| Restantes e tempo do desafio     | DailyChallengeBadge, quota e relógio do servidor               | 0–10 questões; renovação no Acre. Consulta de data simulada apenas no navegador de teste, mantendo o fuso    | Sem alteração do componente         |
| Nomes de abas e ações            | Constantes dos componentes                                     | Três caminhos; rótulos fixos em português                                                                    | Não                                 |
| Métodos e navegação              | Arrays/links fixos                                             | Três passos; sem lista dinâmica                                                                              | Não                                 |

Os valores de teste entram por props e pelo cache local do laboratório, nunca por edição de markup ou CSS do contador. O cenário extremo é o limite aceito pelo renderer, não uma previsão de tamanho do acervo. Zero/um foram testados separadamente. O controle de dados é removido no build de produção. Não há suporte RTL declarado no produto em português, portanto RTL não foi certificado.

### Achados antes de corrigir

| Gravidade | Campo/valor                                         | Comportamento verificado                                                                                 | Correção proposta e local                                                                                                     |
| --------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Baixa     | `available=1`, `registered=1`                       | “1 questões disponíveis” e “1 cadastradas”                                                               | Singularizar os dois rótulos em `src/components/landing/QuestionCountBadge.tsx:37`                                            |
| Média     | Imagem ausente → imagem válida, sem alternar versão | A alternativa aparece no erro após interação, mas permanece na volta ao cenário Demo                     | Vincular o estado de erro à URL e conferir imagens já concluídas na montagem em `src/components/homepage-lab/HeroParts.tsx:8` |
| Média     | Imagem ausente antes da hidratação                  | O evento de erro pode ocorrer antes de o handler existir; não houve alternativa no acesso direto testado | Conferir `complete`/`naturalWidth` na montagem, no mesmo arquivo e linha                                                      |
| Baixa     | Controle de testes a 320 px                         | Última opção fica parcialmente fora da largura; não afeta a página pública nem causa scroll horizontal   | Permitir quebra ou scroll apenas no controle dev em `src/components/homepage-lab/homepage-lab.css:390`                        |

**Decisões a tomar:** escolher a direção; ao promovê-la, corrigir recuperação da imagem antes de integrar. Singularização pode ser corrigida junto. Se o laboratório for removido após a escolha, o problema do controle dev desaparece. Conforme break-ui, os achados foram relatados e não corrigidos nesta fase.

**Resistiram aos testes:** título/copy longos quebraram linhas; contagens no limite foram exibidas sem truncar; zero ficou explícito; ausência do resumo não produziu NaN; ícones, ações, cadastro e âncoras se mantiveram acessíveis nos casos normais. Fallback de imagem apareceu após falha disparada com a página já hidratada. Nenhum overflow horizontal nos 72 cenários básicos e de dados.

## Validação e limites

- Typecheck, ESLint direcionado e build de produção passaram. Build executado numa cópia temporária para preservar os arquivos de versão do repositório.
- Chromium: 3 versões × 4 larguras (1440/768/390/320) × 2 temas, além de 4 cenários de dados por largura: 72 verificações, sem exceções JavaScript.
- Casos adicionais em 2560 px e fonte raiz a 200% em 720 px, sem overflow. Isso não substitui zoom real do navegador nem garante ampliação de todos os tamanhos definidos em px.
- Teclado, URL após reload, abas, cópia repetida (um toast/um Toaster), dispensa, clipboard negado e movimento reduzido verificados.
- Execução com CPU 4x e 12 trocas: métricas agregadas registradas no JSON. Não é um teste de FPS nem uma comparação controlada com a homepage original; inclui o custo de remontagem e do seletor exigido pela skill. Nenhuma afirmação de 60 FPS.
- Build compilado não contém o controle “Cenários de teste” nem markup `lab-stress`. `vite preview` não iniciou a página: o adaptador Cloudflare gera `.output/server`, enquanto o preview do TanStack procura `dist/server/server.js`. Validação navegável foi feita no servidor de desenvolvimento; produção compilou, mas não foi validada em execução local.
- Sem celular físico: safe areas reais, Safari/iOS, barras móveis, toque e PWA instalado ainda precisam de aparelho. Nenhuma certificação de comportamento nativo.

Evidências: [resultados do navegador](homepage-lab/browser-results.json); capturas [Operacional desktop](homepage-lab/operacional-desktop.png), [mobile](homepage-lab/operacional-mobile.png), [Editorial desktop](homepage-lab/editorial-desktop.png), [mobile](homepage-lab/editorial-mobile.png), [Direta desktop](homepage-lab/direta-desktop.png), [mobile](homepage-lab/direta-mobile.png).

A skill [prototype](../../.agents/skills/prototype/SKILL.md) determina: “Integration happens only in Phase 6, only for the variant the user picked” e “the choice belongs to the user”. A homepage original permanece até essa escolha. A exploração será removida na promoção, salvo pedido para mantê-la.
