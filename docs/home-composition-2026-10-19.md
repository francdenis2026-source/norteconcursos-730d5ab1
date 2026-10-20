# Homepage — composição Norte Concursos

- Fundo original gerado a partir das referências fornecidas pelo proprietário: grafite, dourado e bússola. Arquivo WebP de aproximadamente 267 kB; a mesma imagem serve à hero e ao fundo contínuo, reutilizando o cache.
- Nova mensagem: “Sua preparação tem um norte.” Textos e metadados alinhados à marca; o selo identifica fontes e revisões sem afirmar auditoria integral do acervo.
- Hero mais baixa; removidas a faixa promocional intermediária e a imagem repetida de “Como funciona”. Etapas, ferramentas e carreiras usam organização compacta no celular.
- Capas dos concursos ocupam a largura do card. Mantidos carrosséis, links de treino, planos, condições comerciais, desafio diário e regras de renovação.
- Rodapé menor, com navegação institucional, acesso e QR preservados. Cores da composição herdam os tokens semânticos; a imagem usa tokens de contraste próprios.

## Validação

Build de produção executado em cópia temporária para preservar os arquivos de versão do checkout. 42 testes de navegação, progresso de visitante, planos e cobertura de provas passaram. A verificação visual automatizada em `scripts/qa/home-composition.py` cobre 320, 390, 768 e 1440 px nos temas claro e escuro, ausência de rolagem horizontal, carregamento de imagens e abertura/fechamento do menu móvel. Requisições Supabase são simuladas nessa verificação; nenhum dado de aluno é alterado. Capturas ficam em `outputs/qa`, ignorado pelo Git.
