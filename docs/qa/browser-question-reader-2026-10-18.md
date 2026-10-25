# Leitura das questões — voz do navegador

A leitura usa exclusivamente SpeechSynthesis, iniciada no clique. Foram removidos do controle os pedidos de geração, progresso, download e reprodução de arquivos. As URLs antigas de geração retornam 410, e a consulta administrativa não contata provedores externos. O serviço hospedado externamente não foi excluído.

O botão fica em uma faixa própria antes do enunciado, separado do título e cronômetro; oferece ler, pausar e continuar. A mudança de questão ou saída interrompe a fala. O administrador testa o mesmo leitor. Planos e homepage descrevem a voz do navegador, disponível para todos os planos quando suportada pelo dispositivo.

Validação: TypeScript, build de produção e 17 testes existentes de planos e utilitários legados de voz aprovados. `scripts/qa/browser-question-reader.py` testa o treinador com backend e SpeechSynthesis simulados: uma fala, pausa/continuação sem nova síntese, botão dentro da tela em 390 e 1280 pixels e ausência de chamadas ao serviço de voz. A qualidade e disponibilidade reais da fala dependem das vozes instaladas no aparelho; a simulação valida a integração, não a qualidade acústica.
