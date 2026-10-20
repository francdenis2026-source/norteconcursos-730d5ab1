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
