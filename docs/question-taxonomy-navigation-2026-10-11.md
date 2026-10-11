# Correção de classificação e navegação — 11/10/2026

## Banco de questões

Escopo: os 755 registros sinalizados na auditoria anterior, identificados por UUID.
A classificação considera o comando e o objeto cobrado, o caderno de origem e,
nas autorais, o assunto já cadastrado. O texto de apoio não define a disciplina:
por exemplo, um texto sobre feminicídio usado numa pergunta de sintaxe é Português.

- 747 disciplinas corrigidas; 8 rótulos regionais do Piauí mantidos.
- 378 questões jurídicas sem evidência de vigência/fonte oficial ficaram em
  `under_review`. Correção de disciplina não equivale a revisão jurídica e não
  autoriza reativação. Essas questões precisam de conferência individual antes
  de voltar ao treino.
- 377 registros conservaram o estado `active`; a elegibilidade no aplicativo
  continua sujeita às verificações existentes de contexto, fonte e revisão.
- Conferência posterior de todos os 755 UUIDs: disciplinas e estados esperados;
  todos os demais campos preservados, incluindo texto, gabarito, vínculos,
  fontes, notas de revisão e datas.

As decisões estão em `question-taxonomy-review-2026-10-11.json`; o resumo de
aplicação está em `question-taxonomy-applied-2026-10-11.json`. As extrações e os
snapshots completos estão somente em `outputs/filter-audit`, ignorados pelo Git.

O caderno oficial IBFC esclareceu a classificação das questões 44, 45 e 50,
cujos comandos no banco não identificavam a matéria por si sós:
https://fs.ibfc.org.br/arquivos/2309/IAPEM_CADERNO/pdf/CADERNO_IBFC_02_VERSAO_B.pdf
Os dois primeiros tratam do Código Penal; o item 50, dos crimes hediondos.
Esta alteração não recupera alternativas ausentes nem altera gabaritos históricos.

`scripts/apply-taxonomy-review.py` valida por padrão; `--apply` grava somente os
campos aprovados, com comparação do enunciado, disciplina e estado anteriores,
e leitura posterior. As credenciais vêm apenas de `TASK_SUPABASE_URL` e
`TASK_SUPABASE_SECRET` no ambiente. Não há tokens nos arquivos.
A migração versionada oferece a mesma correção com conferência de MD5/UUID e
aborta se o texto ou a disciplina tiverem sido modificados; sua reaplicação
preserva decisões já aplicadas e nunca reativa questões.

## Navegação

- Treinador, caderno de erros e cronograma deixam de abrir abas ao navegar para
  seções internas. Links de materiais usam o roteador, inclusive referências
  Markdown para a biblioteca e cursos de leis.
- O painel oferece **Voltar à seção anterior**, usando exclusivamente entradas
  internas conhecidas do histórico. Não retorna automaticamente a sites externos.
- O treinador guarda uma sessão temporária por usuário nesta aba: IDs, ordem,
  posição, filtros, alternativas selecionadas/riscadas e resultados. Ao retornar,
  resolve os IDs no catálogo elegível atual; não restaura questões despublicadas.
  O bloqueio de respostas e o acesso ao apoio continuam baseados no banco.
  Uma outra lei/filtro não recupera a sessão anterior por engano.
- Os filtros da biblioteca são preservados por usuário e entrada de busca.
  O roteador já restaura a posição de rolagem no histórico.
- Imagens do caderno digitalizado abrem em diálogo dentro da plataforma.
- Consultas externas de fontes oficiais, inscrições e ações explícitas de abrir
  provedores externos, como YouTube, conservam seu comportamento externo.

## Validação

171 testes aprovados após incorporar a main atual, TypeScript e build de produção aprovados. Os testes incluem
retorno interno seguro, restauração de sessão, questões despublicadas, troca de
lei, resultados esparsos, unicidade das decisões e preservação de campos.
Conferência de dados feita diretamente no Supabase. Não havia uma sessão de aluno
aberta no navegador desta execução; a navegação autenticada foi verificada em
código/testes, sem afirmar um teste visual com conta real.
