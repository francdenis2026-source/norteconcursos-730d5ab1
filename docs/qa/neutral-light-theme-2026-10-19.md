# Modo claro neutro — 19/10/2026

A paleta azul acinzentada fazia o fundo, os cartões e a navegação parecerem pouco separados. O modo claro agora usa fundo #EFEFEF, cartões/popovers #FFFFFF, texto principal #262626, secundário #595959 e bordas #D6D6D6. A barra lateral usa #FAFAFA. O dourado da marca permanece #E3AD4C.

Os cabeçalhos da homepage, área autenticada e desafio diário passam a ter fundo branco quase opaco, borda neutra e sombra discreta. Os textos e ícones acompanham o tema claro, inclusive busca, atalhos e indicação do período de teste. O fundo dos heros internos foi neutralizado mantendo as fotografias e a camada de legibilidade. A hero pública preserva sua imagem, vídeo e transição.

Os textos explicativos, valores anuais, disponibilidade e detalhes dos planos têm fonte de 14 px. Cards de planos e oportunidades ganham sombras discretas. O menu compacto e o alinhamento entre cards são preservados; as cores do tema escuro permanecem definidas pelos tokens anteriores. A cor da interface do navegador acompanha o novo fundo claro, inclusive na inicialização anterior à hidratação.

## Validação

- `npm run typecheck`: passou.
- `npm run build`: passou; aviso de tamanho de chunks existente.
- `python scripts/qa/light-theme.py after`, servidor em localhost:8080: passou. Homepage, autenticação, painel, treinador, desempenho, biblioteca e cabeçalho somaram 646 trechos de texto medidos, sem falhas. Foram excluídos 52 trechos por imagem, gradiente, transparência ou opacidade; isso não é certificação integral WCAG. Capturas de homepage, painel e planos mobile também foram examinadas visualmente.
- Cabeçalhos internos: sem overflow em 320, 390, 768, 1024 e 1440 px; busca, alternância de tema e menu exercitados.
- `scripts/qa/home-mobile-layout.py` com a URL local ajustada de 5173 para 8080 em cópia temporária: passou em 320×568, 360×640, 390×844, 430×932, 600×960, 768×1024 e 844×390, nos dois temas. Verificados altura uniforme dos planos e imagens, expansão de detalhes, fonte legível, ausência de overflow, menu dentro do viewport, acesso aos dois botões e fechamento por Escape.
- Uma execução inicial do menu em 600 px foi interrompida durante a geração/recarga do build no servidor de desenvolvimento. Os tamanhos restantes foram repetidos após estabilização, passando sem alteração de implementação ou enfraquecimento das verificações.
- Testes no Chromium com dados autenticados simulados e requisições REST interceptadas; sem contas ou gravações no banco de produção. Emulação de viewport, sem validação em aparelhos físicos.

As mudanças não alteram conteúdo educacional, regras do desafio ou lógica de presença. Não houve troca de imagens nem instalação de dependências.
