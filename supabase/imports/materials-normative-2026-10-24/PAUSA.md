# Ponto de retomada — pausa solicitada pelo usuário

Operações concluídas no Supabase em 24/10/2026:
- Coluna `study_materials.practice_review` criada (01-schema.sql).
- 28 materiais: 318 exercícios reaproveitados de explicações já revisadas (02).
- 14 materiais: 170 exercícios adicionais, incluindo 81 autorais e 89 reaproveitados (03).
- 18 materiais de Contabilidade: 304 exercícios autorais (04).
- Total desta etapa: 60 materiais com 20 exercícios; 792 itens adicionais. Os relatórios de publicação contêm confirmação transacional do banco.

Pendente:
- Completar os 23 materiais em pending-materials.json: faltam 351 exercícios para chegar a 20 por material.
- Validar e cadastrar em content_sources as URLs oficiais novas, sem substituir datas de revisão dos textos antigos. A evidência das consultas está em consulted-source-manifest.json e nas revisões por item.
- Conferir separadamente o estado final de cobertura no banco e fazer verificação visual completa da interface.
- Direito Processual Civil possui vínculos de edital insuficientes: localizar tópico efetivamente pertinente; não usar automaticamente qualquer tópico apenas porque tem a mesma disciplina/ordem. Edital oficial PCDF foi baixado, mas não confirma cobertura geral de Processo Civil.
- Notícias STJ de 615 bytes eram páginas de rejeição: não usar como fonte. Tema 1194, Informativo 863 e PDF de súmulas oficiais foram efetivamente acessados.
- Parser auxiliar do Código Civil não extrai corretamente todos os artigos com separador de milhar: para novos itens conferir o HTML oficial diretamente ou corrigir parser antes de utilizar artigos 1.694 e seguintes.

As questões são exercícios autorais de materiais; não foram inseridas como questões IDECAN nem somadas aos totais públicos do acervo. Nenhum token foi gravado nos arquivos.

Verificação antes da pausa: build de produção aprovado e 12 testes de escopo/revisão de exercícios aprovados.
