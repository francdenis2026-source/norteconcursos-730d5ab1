# Homepage compacta — design

## Intenção

Tornar a homepage da Norte Concurso mais compacta, organizada e profissional, preservando a identidade “Midnight & Brass”, a narrativa de preparação para carreiras de segurança pública e os CTAs existentes.

## Metas

- Reduzir alturas e espaçamentos verticais no desktop.
- Dar ao hero uma hierarquia mais clara, com menos competição entre painel, selos e CTAs.
- Uniformizar cards da seção de plataforma e reduzir o peso visual do card de destaque.
- Manter no mobile uma sequência curta, porém compreensível, sem depender de ocultar blocos inteiros.
- Preservar acessibilidade, responsividade, links, conteúdo jurídico e comportamento existente.

## Fora de escopo

- Reescrever a copy, mudar a marca ou trocar a arquitetura de rotas.
- Alterar regras de autenticação, desafio diário, planos ou integrações.
- Criar novos assets ou mudar o público da publicação.

## Abordagens consideradas

1. Compactação conservadora: ajustar layout e espaçamento, preservando o conteúdo. Escolhida porque resolve o excesso sem apagar contexto.
2. Reorganização editorial em cinco blocos: mais simples, mas exige mover conteúdo institucional e pode reduzir descoberta.
3. Redesign SaaS radical: mais distante da identidade atual e com maior risco de regressão.

## Decisões de implementação

- Trabalhar nos estilos da homepage e em pequenos ajustes de composição, sem alterar contratos de componentes.
- Usar um grid de cards com alturas previsíveis e um card de destaque mais baixo.
- Reduzir padding de seções, rail e rodapé no desktop.
- No mobile, manter o hero, o hub móvel e o rodapé; transformar a densidade do hero e do hub com espaçamentos menores, sem remover conteúdo essencial por CSS quando possível.
- Validar com build, typecheck e inspeção visual em viewport desktop e mobile.

## Critérios de sucesso

- A homepage produz build sem erros.
- Os cards não apresentam alturas desnecessariamente grandes nem overflow horizontal.
- O primeiro viewport comunica proposta, CTA e prova de valor com leitura rápida.
- A experiência mobile continua navegável e mantém os principais caminhos para cadastro, desafio e exploração da plataforma.
