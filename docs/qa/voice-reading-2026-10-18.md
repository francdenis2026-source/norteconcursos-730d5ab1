# Leitura de questões em voz alta

Diagnóstico em 18/10/2026: o endpoint público VoiceStudio `/health` respondeu 200 (`status: ok`, CPU, versão 0.5.6), mas `/models` informou zero bytes/modelos instalados. Uma frase de teste enviada para `/v1/audio/speech` com o modelo configurado `pockettts` respondeu 400, `model_not_available`, indicando ausência do pacote `pocket_tts`. Saúde do servidor não comprova disponibilidade da síntese.

Correções: fallback para voz do dispositivo também em erros 400/502/rede e timeout; limite de espera no cliente (12s) e servidor (15s); pausa/retomada com estado correto; limpeza do áudio apenas na troca de questão, configuração ou desmontagem (a criação da URL não interrompe mais o áudio); cancelamento de requisições antigas; captura de erros de reprodução e validação de resposta de áudio. O painel administrativo diferencia servidor online de modelo instalado. Não foram instalados modelos nem alteradas licenças/configuração do servidor VoiceStudio.

Validação: `npm run typecheck` e `npm run build` passaram. `python scripts/qa/voice-controls.py` passou com Vite em localhost:5173 e Chromium/Playwright: primeiro play sem pausa indevida, pausa/retomada, limpeza na troca de questão, fallback em 400/502/503/rede, pausa/retomada/fim da síntese local e cancelamento de requisição pendente ao mudar questão. Todas as vozes/áudios desse teste são simulados, sem contas reais ou geração paga. Isso valida o controle de reprodução, não qualidade sonora nem disponibilidade das vozes em aparelhos físicos. A voz nativa depende do suporte e das vozes instaladas no dispositivo.

## Tentativa via API do Render

Acesso administrativo ao serviço `norte-voicestudio` confirmado via API. Configuração observada: imagem `ghcr.io/debpalash/voicestudio:stable`, plano `free`, comando Docker original vazio; a variável `HF_TOKEN` já existe (valor não registrado).

Foi testado um comando de inicialização para executar o instalador local do MOSS-TTS-Nano mantendo a API em execução. O deploy `dep-dbajghijnfac73fv90k0` falhou com `earlyExit`; os registros não confirmaram início nem conclusão do instalador. O comando anterior foi restaurado e o deploy de recuperação é `dep-dbajh00m7kps7393kvu0`. O script experimental não foi mantido no repositório.

Além da falha de deploy, eventos anteriores à tentativa registram `server_failed` por `oomKilled`, com limite `512Mi` (evento em 18/10/2026 às 21:20:10 UTC). Portanto, não se deve tratar o bloqueio de instalação remota como o único problema: a imagem atual já excedeu a memória do plano gratuito. Nenhum upgrade, disco pago ou cobrança foi autorizado/acionado. Nenhuma instalação de modelo foi confirmada e a plataforma não deve anunciar voz natural operacional.
