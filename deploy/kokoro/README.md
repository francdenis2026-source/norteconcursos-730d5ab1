# Kokoro em português brasileiro

Serviço Python independente para leitura de questões com Kokoro ONNX INT8,
CPU e uma única inferência por vez. Não precisa de cartão, chave de modelo,
Hugging Face token, PyTorch ou GPU. A hospedagem tem seus próprios limites.

Vozes: `pf_dora`, `pm_alex`, `pm_santa`. Modelo/vozes oficiais: release
`model-files-v1.1` de thewh1teagle/kokoro-onnx, com SHA-256 verificado no build.
Código kokoro-onnx MIT; pesos Kokoro Apache-2.0. Preservar as licenças dos autores.

## Render gratuito

- Repositório da plataforma; branch `main`.
- Root Directory: `deploy/kokoro`.
- Runtime: Python, versão 3.12.
- Build: `pip install -r requirements.txt && python download_models.py`.
- Start: `uvicorn server:app --host 0.0.0.0 --port $PORT --workers 1`.
- Health: `/health`.
- Plano: `free`. Sem disco pago. Pesos fazem parte do build.

Não executar mais de um worker. Textos são divididos em trechos de até 32
caracteres para limitar alocações intermediárias. Texto máximo de 4096 caracteres;
o serviço interrompe a geração após o limite de tempo entre trechos. Uma
requisição concorrente recebe 503 em vez de enfileirar mais inferências.
O cache temporário em disco tem limite de 32 MB e é perdido em reinícios.
Não há garantia de latência ou disponibilidade no plano gratuito.

## API

`POST /v1/audio/speech` com `model: kokoro`, `voice: pf_dora`, `language: pt-br`,
`response_format: wav`, `input: texto`. Retorna WAV mono 24 kHz.
`GET /health` e `GET /v1/models` verificam o serviço e o modelo carregado.

## Verificação

`python -m unittest discover -s deploy/kokoro -p 'test_*.py'` testa o contrato com
motor simulado. Para validar síntese real, iniciar o serviço com os modelos
baixados e enviar uma frase em português; medir memória do processo e latência
separadamente. O tamanho do ONNX não representa o total de RAM.
