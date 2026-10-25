# Homepage — revisão visual e de navegação

- Corrigido o bloco do desafio diário: usava fundo escuro fixo com texto escuro no tema claro. Agora usa a superfície do tema. Texto informa as dez questões diárias; a lógica de cotas e renovação permanece intacta.
- Recursos, concursos e planos recebem identificação sequencial, títulos com escala consistente e superfícies com espaçamento interno adequado.
- A apresentação das ferramentas deixa de esconder o último recurso num painel com rolagem própria. Detalhes continuam expansíveis sem prender a rolagem da página.
- A navegação desktop e a navegação móvel compartilham a identificação da seção atual. O rótulo móvel “Estudo” cabe sem quebrar uma palavra no meio.
- Novos efeitos se limitam a feedback de hover e borda/ícones. Sem animações de entrada que atrasem o conteúdo; respeitada a preferência por movimento reduzido.
- Preços, disponibilidade de planos, autenticação, fontes, conteúdo e identidade fotográfica foram preservados.

Verificação no Chromium com API simulada: claro/escuro em 1440, 1024, 768, 390 e 320 px; abas e links funcionais, sem transbordamento horizontal. Nova rodada após a integração da navegação móvel em 1440, 390 e 320 px, nos dois temas. Contraste medido no texto do destaque diário: mínimo de 7,77:1. Oito testes de cotas de visitantes e sequência de abertura passaram. O script reproduzível está em `scripts/qa/home-editorial.mjs`.
