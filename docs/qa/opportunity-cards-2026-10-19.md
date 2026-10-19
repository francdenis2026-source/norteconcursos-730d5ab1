# Cards de concursos e hero — 19/10/2026

## Cards

Os dois cards estavam alinhados por esticamento no grid. A área de conteúdo crescia com `flex: 1`, e `margin-top: auto` empurrava as ações do Acre até o rodapé da altura exigida pelo Paraná. O problema também aparecia ao expandir os detalhes da prova.

O grid agora alinha pelo topo, com alturas independentes e ações imediatamente após o conteúdo. Capas completas e menores ficam ao lado da identificação em telas maiores; em celulares estreitos ficam acima. Foram reduzidos os espaçamentos e mantidos os detalhes expansíveis e os destinos de cadastro/treino.

## Hero

Após o pedido para preservar o N com as cenas, foi criada uma nova ilustração `preparacao-n-cenas.webp` (1672 × 941, cerca de 119 KB). O monograma contém cenas de investigação e treinamento, sem os textos e selos promocionais. O véu branco foi removido; a hero usa grafite e texto claro em ambos os temas. A imagem é exibida inteira, à direita no desktop e acima do texto até 900 px. As imagens anteriores permanecem disponíveis.

## Verificação

- Typecheck e build.
- Chromium, claro/escuro, larguras 320, 390, 600, 640, 700, 768, 900, 1024 e 1440 px: capas carregadas e inteiras, sem rolagem horizontal; abrir o Paraná não aumenta a altura do Acre; ações próximas dos detalhes; links e alvos de toque preservados; navegação do carrossel por teclado.
- Hero: 320, 390, 768, 1024 e 1440 px, nos dois temas; imagem carregada, sem overflow, movimento reduzido respeitado. Pular e finalizar a introdução em vídeo continuam liberando o conteúdo.
- Dados do Supabase simulados localmente para conferência visual; nenhuma alteração no banco. Capturas em `outputs/qa/` ignorado pelo Git.
