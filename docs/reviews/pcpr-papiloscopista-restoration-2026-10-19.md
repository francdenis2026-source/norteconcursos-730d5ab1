# Restauração do caderno de Papiloscopista — 19/10/2026

Por solicitação explícita do usuário, foram reativados os 64 registros compartilhados do caderno PCPR/2026 Papiloscopista que estavam arquivados. O publicador foi ampliado com uma finalidade restrita a esses números de item, cargo e concurso, permitindo alterar somente `content_status`. Cada item foi comparado ao correspondente ativo de Agente, incluindo enunciado, alternativas, gabarito, texto de apoio e metadados jurídicos.

Houve dry-run real, validação dos vínculos ao edital e fontes cadastradas, reconferência do correspondente ativo antes de gravar, comparação de todos os campos originais na condição de atualização e leitura posterior. Enunciados, alternativas, gabaritos, explicações, fontes e datas de auditoria não foram modificados. Esta é uma restauração de disponibilidade, não uma nova revisão jurídica integral.

Leitura independente após a publicação: Papiloscopista 100 ativos; Agente 100 ativos; Delegado 98 ativos e dois arquivados. Os outros 236 registros do snapshot do Paraná permaneceram iguais. IDs e hashes das 64 alterações estão no JSON adjacente; snapshots completos e pacote ficam em `outputs/audits/`, ignorado pelo Git.

Também foi corrigida a detecção de apoio ausente: dez itens de Português já contêm a passagem integral antes da citação no enunciado, e um traz a imagem de apoio cadastrada. A detecção agora reconhece esses formatos sem considerar alternativas longas como texto-base e sem liberar comandos que continuam sem apoio. A conferência com o snapshot publicado identifica os 100 números de item e 100 itens elegíveis no catálogo. A referência pública de disponibilidade foi atualizada para 100.

Os três cards de concursos agora usam carrossel também em desktop, mostrando dois por vez, com setas, contador, estados de início/fim e teclado. Em celular mantém deslize e botões. O card do Acre deixa de criar uma linha adicional no desktop.

Validação: 60 testes pertinentes passaram, typecheck e build. Conferência do carrossel nos temas claro e escuro em 320, 390, 768, 1024 e 1440 px; navegação de ida/volta e teclado sem overflow horizontal. A regra de limites dos planos permanece aplicável ao tamanho de cada sessão.

A conferência do navegador com o snapshot real pós-publicação confirmou 100 questões de Papiloscopista tanto no treinador quanto no seletor do simulador. O simulador passou também a carregar `figure_urls` e o número original dos itens de bancas; antes ele descartava a referência à figura ao verificar apoio ausente. Isso preserva as imagens já cadastradas e a ordem da prova.
