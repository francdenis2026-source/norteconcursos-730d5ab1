# Exemplos resolvidos e ilustrações — entrega parcial

Ampliação pausada por solicitação do usuário em 05/10/2026. Esta entrega contém os complementos concluídos para 121 materiais, em dez disciplinas, com 132 casos resolvidos e 132 variações. Alguns casos são compartilhados entre módulos da mesma lei; os números representam ocorrências nos materiais, não questões inéditas do treinador.

Cada caso apresenta fatos, pergunta, etapas de resolução, conclusão, erro comum e uma variação com resposta recolhível. O rascunho é local à tela, não é enviado para correção automática nem gera pontuação. Os conteúdos e exercícios originais são preservados. Duas alterações concorrentes nos textos de hediondos e LEP foram lidas antes de atualizar os respectivos fingerprints; não foram sobrescritas.

RLM recebe três diagramas interativos: tabela-verdade, diagrama de Venn com operações selecionáveis e árvore de probabilidades com/sem reposição. Outros materiais recebem mapas de raciocínio, incluindo cálculos de patrimônio, estoque, depreciação, impairment, referências de planilha, backup e fases da dosimetria. Diagramas são feitos em HTML/SVG, com descrição textual e tabelas, sem imagens decorativas geradas.

Nos exemplos jurídicos são explicitadas as condições do caso e os dispositivos pertinentes. Entre os recortes: posse/porte de arma e aumento de dois terços; tráfico e requisitos da redução; tortura ativa/omissiva; prazo geral/especial de temporária; remição por trabalho/estudo; tentativa e dosimetria; idade na emissão da CIN. O exemplo de furto usa a alteração do art. 155 pela Lei 15.397/2026 e distingue pena abstrata, pena concreta e irretroatividade gravosa.

Os exemplos não são um comentário exaustivo de cada artigo, não acrescentam 132 questões ao catálogo e não constituem correção integral dos resumos antigos. Novos materiais publicados depois do snapshot inicial ficam fora deste lote pausado. Não se reivindica cobertura de todos os artigos nem atualização automática contínua.

Fontes legislativas e técnicas têm URLs primárias, data de conferência e SHA-256. As evidências de leitura e documentos oficiais estão em outputs locais, fora do Git. Os complementos autorais, referências e código estão versionados. Os links técnicos do CPC e Linux man-pages foram adicionados à lista de fontes permitidas; não se permite domínio parecido ou credencial em URL.

Migração: `20261005020000_study_worked_examples.sql`. Os complementos ficam separados dos materiais, ligados por slug e versão. RLS permite ao aluno apenas ler revisão ativa cujo material esteja publicado. Não há política de edição para alunos. O importador valida o lote inteiro antes de gravar, exige o fingerprint do corpo atual, recusa divergência em revisão existente, confere os campos após gravação e só então publica. Reexecuções preservam versões revisadas.

```text
node scripts/import-study-enrichment.mjs ARQUIVO_JSON RELATORIO_JSON --dry-run
node scripts/import-study-enrichment.mjs ARQUIVO_JSON RELATORIO_JSON
```

Definir `TASK_SUPABASE_PROJECT`, `TASK_SUPABASE_KEY` e `TASK_LIBRARY_REVIEWER` exclusivamente no ambiente da sessão. Nenhuma credencial é incluída nos arquivos.

Validação: 27 testes Node, typecheck e build. Os novos testes verificam quatro linhas da lógica, partição do universo em conjuntos, soma das probabilidades e mudança por reposição, resoluções/variações obrigatórias e rejeição offline de fonte falsa, publicação forjada e duplicidade. O teste SQL usa rollback para leitura publicada, restrição de edição, ocultação de rascunhos e de material pai despublicado. A navegação autenticada completa e a revisão visual em celular não foram concluídas antes da pausa.
