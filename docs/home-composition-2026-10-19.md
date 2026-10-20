# Homepage — composição Norte Concursos

- Fundo aprimorado a partir das referências fornecidas pelo proprietário, preservando o emblema “Carreiras Policiais”, o grafite e o metal envelhecido. O WebP decorativo é independente da fotografia oficial da hero, restaurada em `hero-norte-impacto.webp`.
- Nova mensagem: “Sua preparação tem um norte.” Textos e metadados alinhados à marca; o selo identifica fontes e revisões sem afirmar auditoria integral do acervo.
- Hero mais baixa; removidas a faixa promocional intermediária e a imagem repetida de “Como funciona”. Etapas, ferramentas e carreiras usam organização compacta no celular.
- Capas dos concursos ocupam a largura do card. Mantidos carrosséis, links de treino, planos, condições comerciais, desafio diário e regras de renovação.
- Rodapé menor, com navegação institucional, acesso e QR preservados. Cores da composição herdam os tokens semânticos; a imagem usa tokens de contraste próprios.

## Validação

Build de produção executado em cópia temporária para preservar os arquivos de versão do checkout. 42 testes de navegação, progresso de visitante, planos e cobertura de provas passaram. A verificação visual automatizada em `scripts/qa/home-composition.py` cobre 320, 390, 768 e 1440 px nos temas claro e escuro, ausência de rolagem horizontal, carregamento de imagens e abertura/fechamento do menu móvel. Requisições Supabase são simuladas nessa verificação; nenhum dado de aluno é alterado. Capturas ficam em `outputs/qa`, ignorado pelo Git.

## Correção solicitada pelo proprietário

A composição com bússola foi substituída por uma melhoria fiel das referências “Carreiras Policiais”, preservando o emblema e os textos enviados. `carreiras-background.webp` é usado apenas como fundo da homepage e da chamada final. A hero oficial foi restaurada para `hero-norte-impacto.webp`, sem alterar seus bytes, com enquadramento próprio. O teste visual agora exige explicitamente essa separação entre hero e fundo.

## Hierarquia, cor e vidro

As seções receberam tons de azul, verde-azulado e violeta a partir dos tokens compartilhados dos temas. Títulos têm ênfase colorida e sublinhado discreto; rótulos usam pequenas etiquetas. O texto de apresentação fica junto do título em telas de até 1000 px, e o método volta a uma coluna no celular. Parágrafos das ferramentas têm pelo menos 14 px.

O vidro é limitado aos painéis principais, aos selos de entrada e ao aviso do teste: transparência moderada, borda e desfoque estático. Há superfície sólida como alternativa sem suporte a blur e para a preferência de transparência reduzida. A hero oficial e a arte do fundo permanecem preservadas.

A verificação visual cobre agora cinco larguras (320, 390, 768, 1024 e 1440 px), nos dois temas, cores distintas por seção, efeito de vidro aplicado, leitura mínima dos parágrafos e contraste de quatro textos representativos em relação à superfície de leitura do tema. Essa medição pontual não certifica o contraste de todos os pixels sobre fotografias.
