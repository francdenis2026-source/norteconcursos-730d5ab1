# Card PC-PI — 19/10/2026

Foi criado um card de provas da Polícia Civil do Piauí junto ao Paraná na seção de oportunidades da homepage. O Acre permanece como preparação antecipada, em uma faixa compacta abaixo das provas em telas maiores; o carrossel de celular preserva as três opções.

## Arte

Nova composição gerada a partir da referência enviada pelo usuário, com pessoas e enquadramento diferentes. A marca DSO e o slogan de terceiros não foram incorporados. A capa usa a assinatura Norte Concursos, sigla PC-PI e escudo ilustrativo de desenho próprio, sem reproduzir brasão oficial. A imagem não retrata equipe real da corporação.

`public/media/hero/pcpi-capa.webp`: 1672 × 941, cerca de 143 KB, carregamento lazy e exibição integral, sem recortar a tipografia. A geração original permanece fora do Git.

## Destinos e disponibilidade

Consulta atual ao Supabase: Delegado de Polícia Civil, 80 registros ativos; Oficial Investigador, 74 ativos, ambos FGV/2026. Para visitantes, os números são identificados como conferência de 19/10/2026. Na área logada, o cálculo vem do catálogo elegível compartilhado com o treinador, incluindo as mesmas exclusões de contexto ausente.

Cada botão autenticado leva diretamente ao treinador com concurso original específico do cargo, cargo, banca FGV, ano 2026, `mode=catalog`, `go=1` e `limit=all`. Não há mistura dos dois cadernos nem promessa de prova integral. Visitantes são encaminhados ao cadastro, seguindo o fluxo já usado na chamada do Paraná.

O cálculo de disponibilidade foi extraído para um helper e um hook compartilhados; a referência pública do Paraná foi preservada. Nenhuma questão foi criada, reativada ou alterada no banco.

## Verificação

40 testes de cobertura, disponibilidade, identidade de prova, filtros e edital passaram. Typecheck e build. Conferência em Chromium nos temas claro/escuro, larguras 320, 390, 600, 768, 1024 e 1440 px: três cards, capa inteira, ausência de overflow, detalhes e cadastro funcionais. Com catálogo autenticado simulado de dois itens de Delegado e três de Investigador, as quantidades acompanham o catálogo e ambos os atalhos iniciam o cargo correspondente. Capturas em `outputs/qa/`, ignorado pelo Git.
