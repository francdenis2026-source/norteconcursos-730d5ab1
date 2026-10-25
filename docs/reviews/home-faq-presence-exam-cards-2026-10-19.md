# Homepage: FAQ, presença e cards de provas

## Alterações

- Respostas do FAQ em verde-azulado próprio de cada tema, com fonte de 14 px, linha lateral e superfície de destaque ao expandir. Conteúdo comercial preservado.
- Cards de provas com capas completas na proporção original (sem cortes por `cover`), altura natural e três cards no desktop, dois no tablet e carrossel no celular. Removida a chamada repetida para o desafio no card do Paraná; o desafio continua acessível na homepage. Metadados e detalhes expansíveis preservados. Botões do Piauí compactados, com nomes acessíveis que identificam o cargo e os mesmos destinos de treino.
- Em 1440 px, os cards medidos têm aproximadamente 377 px de largura e 463–488 px de altura. Não há mais preenchimento para igualar as alturas. Em 390 px, ficam entre 435 e 485 px de altura.

## Presença online

O widget usa o canal público Realtime `norte-online-v1`. Conta navegadores visíveis, incluindo visitantes e a área autenticada; abas do mesmo navegador compartilham identificador aleatório e contam uma vez. Não representa a quantidade de alunos cadastrados ou pessoas efetivamente estudando.

O teste direto inicial falhou porque o Chromium desta nuvem não reconheceu a autoridade certificadora da rede (`ERR_CERT_AUTHORITY_INVALID`). A consulta HTTPS verificada ao agregado público do Supabase retornou HTTP 200. O agregado de estudo (`get_public_study_presence`, janela de 90 segundos) é diferente da contagem de visitantes do widget.

O teste com o Realtime real usa opcionalmente transporte WebSocket em Python com verificação de certificado e hostname habilitada. Não desativa TLS, não grava credenciais e não altera a aplicação. As sessões do painel são simuladas e suas chamadas REST são interceptadas; o canal público de presença conecta ao serviço real. O teste verificou navegador anônimo, deduplicação de abas, participação do painel, saída de um navegador, estado offline sem fabricar contagem zero e reconexão automática após interromper o WebSocket real do serviço.

Para repetir neste ambiente: `NORTE_PRESENCE_VERIFIED_BRIDGE=1 python3 scripts/qa/study-presence.py`. O caminho padrão usa o WebSocket do navegador; `NORTE_QA_BASE_URL` permite trocar a porta. O transporte opcional requer o pacote Python `websockets` e é exclusivo da verificação local.

## Validação

- Build de produção em cópia temporária, preservando os arquivos de versão do checkout.
- 46 testes de presença, navegação, progresso de visitante, planos e cobertura de provas passaram.
- FAQ conferido em seis combinações de tema e largura.
- Cards conferidos em dez combinações, com carregamento das imagens, proporção, tamanho, detalhes e ausência de rolagem horizontal.
- Evidências visuais e logs brutos permanecem fora do Git, em `outputs/qa` e arquivos temporários. Não houve alteração de questões, usuários ou dados persistentes do Supabase.
