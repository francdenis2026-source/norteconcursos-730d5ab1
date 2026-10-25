# Revisão dos menus — 14/10/2026

## Organização

O menu lateral tinha títulos de grupo abaixo de 10 px, uma lista extensa sempre aberta e regras específicas do aluno que voltavam a reduzir o tamanho dos itens. A navegação agora agrupa áreas por jornada, com uma seção aberta por vez. A seção da página atual abre automaticamente. O modo recolhido oferece um atalho por grupo, com identificação ao passar o mouse ou focar pelo teclado; o botão de expandir e a busca dão acesso ao restante.

ENEM fica em Objetivo, sem um grupo isolado de um único item. As jornadas do aluno e as ferramentas administrativas continuam separadas pelas mesmas permissões. A leitura de artigos mantém a Biblioteca identificada como área atual.

## Tamanhos e acesso

- Menu expandido de 304 px no computador; 280 px no tablet. Itens com texto de 15 px, quebra de linha e mínimo de 48 px de altura.
- Gaveta móvel adaptada à largura da tela, rolagem própria, busca de áreas e fechamento ao selecionar inclusive a página já aberta.
- Barra inferior com quatro atalhos e botão Menu, mantendo Perfil dentro de Conta e no menu do usuário. O rótulo Evolução abre o desempenho existente.
- Menus suspensos e itens de seleção compartilhados têm mínimo de 44 px. Abas compartilhadas acomodam rótulos em mais de uma linha e têm alvos de 44 px.
- Navegação pública, rodapé institucional, planejamento e índice de artigos receberam melhorias de tamanho e área de clique. A navegação pública troca para o menu móvel mais cedo para evitar comprimir os links.
- Destaque da página atual com aria-current, grupos operáveis por botão e foco visível. Removida a animação de largura que espremia textos durante a expansão.

## Remoções justificadas

- Entrada Resolver com IA quando desativada pela configuração: removida da navegação e da busca, sem excluir a rota ou mudar a disponibilidade do recurso.
- Indicadores de ofensiva/medalhas do rodapé lateral e janela duplicada de medalhas: ofensiva permanece no topo; medalhas e progresso continuam na página própria e no fluxo de conquistas.
- No menu de cadernos, Renomear e Excluir não tinham manipuladores; vídeo e PDF apontavam para conteúdo demonstrativo. Removidos esses itens, preservando Imprimir/PDF, que tem implementação.

Nenhum caderno, conteúdo de estudo, questão ou registro do banco foi excluído.

## Verificação

517 testes existentes passaram. TypeScript e build de produção foram executados. Teste de interface em Chromium usa o layout e os componentes reais com autenticação, relógio e serviço de conquistas simulados: grupos, links, busca, recolhimento, página ativa, separação aluno/admin, ausência de recurso indisponível, alvos de menus/seletores e fechamento da gaveta passaram. Sem transbordamento horizontal em 320, 390, 768 e 1024 px. Capturas locais revisadas no computador e em celular. Não equivale a testar o site publicado ou a autenticação de produção.

## Ajuste dos ícones e identificação da preparação

“Hoje” foi substituído por “Minha preparação” no grupo de navegação, busca, identificação da área e cabeçalhos de cronograma/foco. Os indicadores que representam o dia atual continuam com seus nomes temporais.

Ícones laterais passaram de 16 px para 24 px no menu expandido e 28 px no recolhido, com blocos de 38/44 px e contorno colorido. O menu recolhido tem 96 px, com legenda curta e ícones fixos por área: preparação, objetivo, conteúdo, questões, provas, desempenho e conta. A página ativa permanece identificada pela cor e pelo estado acessível, com descrição completa ao focar o atalho. A barra móvel também recebeu ícones maiores.

Verificados TypeScript, build e navegação em Chromium com serviços simulados, incluindo medidas dos ícones, identificação de preparação, busca, grupos, destaque da página e telas de 320, 390, 768 e 1024 px sem transbordamento horizontal.

## Fundo visual da barra lateral

Arte vertical exclusiva gerada para a navegação: relevo, rios e linhas de orientação em azul-marinho e dourado, inspirados no Acre. O original foi preservado fora do repositório e a versão de produção é `public/media/navigation/acre-topografia-sidebar.webp` (724 × 2172 px, 74.230 bytes). O fundo é decorativo em CSS, com camada escura e cor de reserva, sem inserir informação extra na leitura assistiva.

A imagem atende à barra lateral de aluno/administrador e ao menu móvel. No modo recolhido, o enquadramento destaca somente uma faixa de textura. Não há animação nem carregamento de fonte externa. Em cores forçadas, a decoração é retirada. Ajustado o seletor do botão de fechar a gaveta para não aplicar sua largura ao campo de busca.

Verificação em Chromium com serviços simulados: menu expandido/recolhido, busca, navegação, grupos e larguras 320/390/768/1024 px sem transbordamento. Campo de busca móvel ocupa a largura disponível. Capturas locais conferidas e build de produção executado. Sem alterações de permissões ou dados de alunos.
