# Homepage com organização de aplicativo no celular e tablet

| Antes | Depois | Motivo |
| --- | --- | --- |
| Fundo com blur de 3 px | Camada fixa com a imagem nítida novamente | Atender à preferência visual informada |
| Acesso às seções concentrado no cabeçalho | Barra inferior com Início, Preparação, Concursos, Planos e Entrar | Deixar os destinos principais próximos do toque |
| Rodapé de aproximadamente 561/395 px | Diretório recolhido de aproximadamente 257/185 px | Diminuir a altura inicial no celular/tablet |
| Listas de navegação sempre abertas | Grupos nativos expansíveis, com teclado e abertura exclusiva | Manter todos os links disponíveis sob demanda |
| Endereço sempre exposto | Endereço expansível e contatos diretos com nomes acessíveis | Reduzir texto repetido e preservar os canais de contato |
| Imagem da abertura em espaço separado no celular | Imagem integrada ao topo e descrição sobre superfície de leitura | Reduzir a altura sem retirar a composição |
| Grade de planos com duas linhas no tablet | Trilho horizontal nativo com botões equivalentes | Evitar que os cartões dominem o comprimento da página |
| Títulos editoriais na versão estreita | Tipografia de interface no celular/tablet | Harmonizar as seções com a navegação compacta |

## Escopo

A composição de desktop acima de 1100 px mantém sua navegação, tipografia e rodapé abertos. O novo componente acompanha a seção visível com IntersectionObserver, desconecta o observador no desktop e não usa rastreamento contínuo de scroll. Os atalhos são âncoras sem animação; o acesso à conta usa a rota existente. A barra respeita a área segura inferior, e o documento reserva espaço para ela.

A imagem de fundo permanece fixa e sem filtro. As superfícies de leitura continuam protegendo o texto; nenhuma regra de estudo, condição de plano, questão do Desafio diário ou regra de autenticação foi alterada. A imagem do FAQ e o distintivo interativo foram preservados.

## Validação

- TypeScript, ESLint dos arquivos TSX alterados (sem a regra de formatação preexistente da rota) e build de produção aprovados. Build em cópia temporária para não alterar arquivos de versão.
- Chromium em 320, 390, 600, 768, 1024, 1100 e 1440 px, nos temas claro/escuro: sem transbordamento horizontal e sem erros JavaScript.
- Destaque da seção ativa, navegação para Concursos/Planos, alternância das abas de preparação e trilho de planos no tablet verificados.
- Grupos do rodapé: links preservados, abertura exclusiva, fechamento por teclado e exibição do endereço aprovados. Alvos da barra inferior com pelo menos 44 px.
- Simulação de toque em 390×844, 768×1024 e 1024×768: atalhos, menu principal, fechamento por Escape e grupos do rodapé aprovados.
- Inspeção visual da abertura e do rodapé em celular, tablet e desktop. Medidas do rodapé com grupos recolhidos e viewport de 1000 px de altura: 390 px de largura → 257 px; 768/1024 px → 185 px.

**Approve:** implementação e verificações em navegador. Testes em aparelhos físicos continuam pendentes; a simulação não comprova o comportamento de áreas seguras ou da interface do Safari em hardware.
