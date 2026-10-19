# Auditoria e reformulação da homepage

## Problemas encontrados e solução

| Antes | Depois | Motivo |
|---|---|---|
| Sete recursos com descrições recolhidas em caixas visualmente semelhantes | Treinador, edital e desempenho visíveis; quatro recursos complementares expansíveis | Explicar o produto antes de pedir mais cliques |
| Chamada de voz separada repetindo um dos recursos | Leitura pelo navegador no conjunto de ferramentas | Reduzir repetição e preservar a informação |
| Fluxo de preparação em mais uma grade de cartões | Quatro etapas numeradas com divisórias discretas | Criar uma sequência de leitura |
| Tabela completa de planos sempre ocupando a página | Preços e condições visíveis; comparação completa expansível | Encurtar a rolagem sem retirar recursos da comparação |
| Links institucionais dentro de grupos recolhidos | Links do rodapé visíveis, incluindo privacidade e termos | Facilitar acesso a informações importantes |
| Folha de estilos com sucessivas versões e overrides da homepage | Estilos consolidados e componentes públicos isolados de antigas regras globais | Evitar conflitos de cor, tamanho e alinhamento |

Mantidos: paleta branca/cinza/dourado, imagens, texto e comportamento do hero, componente HeroVideo sem alteração, regras do Desafio diário, origem dos números do acervo, destinos de cadastro e provas, condições e preços dos planos. A imagem adicional da seção de produto vem do acervo local e carrega de forma diferida.

## Validação

- `npm run typecheck` e build de produção aprovados.
- 20 testes de planos, quotas de simulados e progresso do visitante aprovados.
- `python3 scripts/qa/homepage-redesign.py`: desktop 1440, tablet 768 e celulares 390/320; claro e escuro; navegação mobile, âncoras, abertura das ferramentas e tabela, imagens carregadas, ausência de erros de página e largura sem transbordamento.
- Vídeo testado em navegador: botão de pular, remoção do overlay e liberação do conteúdo. Eventos de mídia controlados confirmaram a fase de fade e a imagem após o fim; vídeo não é iniciado no mobile, preservando a regra já existente.
- Verificação final focada repetida em 1440/390 após isolar as chamadas públicas de antigas regras globais.

Medições com backend simulado, mesma viewport e comparação recolhida: desktop 4823 → 4312 px; mobile 390 px 7025 → 6182 px. Conteúdo de rede, fontes e detalhes abertos podem alterar as medidas. Não são números de produção. O rodapé ficou maior que a versão anterior recolhida porque agora exibe os links institucionais, mantendo a área de navegação compacta e os alvos de toque acessíveis.

Nenhum dado do banco, regra de cobrança ou questão foi alterado.
