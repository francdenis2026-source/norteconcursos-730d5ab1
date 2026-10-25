# Indicador de presença — correção de visibilidade

A API pública respondeu HTTP 200 com `studying_now: 0` durante a conferência. A versão publicada exibia o indicador em um navegador com relógio correto, mas foi possível reproduzir seu desaparecimento adiantando `Date.now()` em três horas: a validação rejeitava o horário do servidor como inválido. Esse teste identifica uma causa reproduzível, sem presumir a configuração do aparelho do usuário.

A validade da resposta POST agora usa o tempo monotônico desde seu recebimento, com expiração em 60 segundos. Continua validando quantidade inteira não negativa, timestamp e janela de 90 segundos. A comparação com o relógio civil do aparelho foi retirada. Falhas não exibem zero fictício: mostram “Presença indisponível”. O carregamento tem texto próprio e todas as falhas voltam a consultar a cada 30 segundos, inclusive RPC ausente. A legibilidade do texto e do ponto dourado foi reforçada.

Verificação:

- TypeScript, build de produção e testes unitários de presença passaram.
- Chromium com RPCs simuladas: 320, 390, 600, 768, 1024, 1150, 1280 e 1440 px, relógio adiantado três horas; cabeçalho sem overflow; zero real, singular, contagens grandes, falha visível e recuperação sem recarregar após 30 segundos. Conferido tema escuro.
- Chromium com a API real, relógio adiantado e versão corrigida local: indicador visível em 1440, 768 e 390 px, recebendo zero real do servidor.
- Versão publicada anterior: bug reproduzido em 390 px com relógio adiantado.

Nenhuma alteração no banco ou exposição de sessões individuais. Os testes não foram feitos em aparelhos físicos.
