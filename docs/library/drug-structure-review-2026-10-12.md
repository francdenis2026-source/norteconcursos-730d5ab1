# Lei de Drogas — limites e estrutura do HTML oficial

A revisão estrutural identificou um problema independente do conteúdo pedagógico: a página oficial usa tanto parágrafos quanto `h4`/`h5` para capítulos e títulos. O parser anterior lia somente parágrafos e também confundia notas de alteração legislativa com o nome do capítulo.

Corrigidos no Supabase **84 vínculos de capítulo**, agrupados em **24 blocos oficiais**, e transferidas **11 rubricas finais** indevidamente anexadas aos artigos. Não houve supressão de regra normativa, inclusão ou exclusão de artigo atual, renumeração ou alteração de IDs. O resumo do percurso agora reflete esses blocos. Os 11 novos hashes tiveram suas explicações explicitamente relidas e reaprovadas; não houve reaproveitamento automático de selo antigo.

A leitura posterior confirmou exatamente o escopo autorizado: corpo somente nos 11 artigos indicados, capítulo nos 84, resumo de um curso e aprovação de fonte das 11 explicações. Preservados integralmente os outros 3.587 registros de unidades, 3.502 explicações, outros 41 cursos e cinco tabelas de materiais/fontes/editais. As palavras, casos, variações e respostas das 11 explicações foram preservados integralmente.

Três regressões em Python verificam títulos mistos, anotações entre título e nome e retomada de estrutura depois de artigo revogado. Passaram também os **285 testes** do projeto e a conferência sintática do importador. O último typecheck/build aprovado corresponde ao fechamento anterior; não houve mudança adicional no código de interface neste bloco.

Uma nova comparação dos 42 textos oficiais, após a correção, não encontrou diferenças restantes de corpos ou artigos atuais. A falha encontrada demonstra por que igualdade de hashes gerados pelo mesmo parser não basta como prova independente: a inspeção dos limites e as regressões complementam a conferência. A adaptação de headings desta etapa é específica à Lei de Drogas; não declara auditada toda estrutura de HTML de outras normas.

Cobertura permanece **84/84** no percurso de Drogas e **938/3.511** no conjunto; **2.573** dispositivos ainda demandam revisão editorial. Fontes brutas e snapshots ficam nos outputs locais; nenhuma credencial é gravada no código ou nos manifestos.
