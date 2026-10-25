# Português — organização e exemplos — 25/10/2026

**Publicado no Supabase e conferido por leitura independente. Não é necessário aplicar novamente.**

Foram revisados 17 materiais: 16 de preparação para concursos e um do ENEM, mantido em sua coleção própria. Os temas originais foram preservados, com títulos mais identificáveis, conceitos destacados, parágrafos menores e complementos sobre os pontos que estavam apenas mencionados.

- 55 novos exemplos de concursos, cada um com situação, análise e conclusão, junto ao assunto estudado.
- Quatro exemplos de conceitos no material do ENEM, além dos dois exemplos que já existiam.
- Quadros adicionais para classes de palavras, formas verbais, hiatos, figuras de linguagem, crase, concordância, pontuação, conjunções e subordinadas substantivas.
- 17 novos casos na aba didática, com resolução e variação específicas. Todos os 20 casos anteriores foram preservados: 37 casos ativos ao final.
- 340 questões locais, flashcards, slugs, IDs, vínculos a editais, status e demais campos não editoriais mantidos exatamente como estavam. O lote não altera questões globais nem tabelas de progresso.

A interface de Português tem índice clicável e blocos recolhíveis por assunto, com o primeiro aberto. A apresentação tem estilos próprios para celular e desktop e mantém os exemplos na leitura e na aba didática. Termos jurídicos da interface de casos foram substituídos por rótulos gramaticais somente nesse contexto.

## Fontes e alcance

`source-checks.json` registra oito consultas bem-sucedidas a referências oficiais em 25/10/2026: Planalto (Acordo Ortográfico, Decreto 9.758/2019 e Lei 15.263/2025), Senado (concordância, crase, vírgula e referências de estilo) e edital PF/Cebraspe. O âmbito e as ressalvas das normas foram mantidos. Conceitos e exemplos gramaticais são elaboração didática assistida; não são alegados como transcrição integral dessas fontes.

O MRPR integral e o VOLP não foram reconsultados neste lote. Não se atribui a eles uma nova conferência integral nem se amplia a liberação de exercícios históricos ou pendentes. Mantida a distinção entre conteúdo atual de estudo e a data de corte de cada edital.

## Publicação e validação

`01-reorganize-portuguese.sql` contém transação com administrador responsável, guardas de concorrência, preservação dos demais campos e versões dos casos. Executado primeiro com rollback, depois publicado e reaplicado para conferir idempotência. `verification-result.json` confirma os textos, hashes, exemplos e campos preservados em nova consulta ao banco. `package.json` permite comparar a versão anterior e a nova.

21 testes específicos de leitura, exemplos, prática e Markdown passaram; TypeScript e build de produção também passaram. Uma execução adicional de `tutor-law-library.test.mjs` encontrou uma asserção antiga sobre a expressão de etapas da rota jurídica (`step === "texto" || (step === "fixar" && revealed)`), ausente também no HEAD anterior à alteração; essa rota não foi modificada neste trabalho. Os demais 12 testes desse arquivo passaram. Não houve conferência visual em sessão autenticada neste ambiente.
