UPDATE study_materials SET body_md=body_md || '

## Laboratório prático: comandos que a banca confunde

Imagine que você abriu o terminal na pasta `/home/aluno`. O comando `pwd` informa onde você está; `ls` mostra os itens presentes; `cd Documentos` entra em uma pasta existente; `mkdir revisao` cria a pasta `revisao` dentro do diretório atual. **Criar** e **entrar** são ações diferentes: após `mkdir revisao`, você ainda precisa de `cd revisao` para acessá-la.

| Comando | Função | Armadilha frequente |
|---|---|---|
| `pwd` | Exibe o diretório de trabalho atual | Não cria nem lista arquivos |
| `ls -a` | Lista também nomes ocultos iniciados por ponto | Arquivo oculto não significa arquivo criptografado |
| `cd ..` | Vai ao diretório pai | Não exclui pastas |
| `cd ~` | Vai ao diretório pessoal do usuário | `~` não significa diretório raiz |
| `mkdir -p a/b` | Cria diretórios intermediários quando necessário | Sem `-p`, o pai ausente pode causar erro |
| `cp origem destino` | Copia arquivo | Não é o mesmo que mover |
| `mv origem destino` | Move ou renomeia | Pode alterar o nome sem trocar de pasta |
| `rm arquivo` | Remove arquivo | Não é comando de restauração; exige cautela |

### Caminhos absolutos e relativos

Um caminho absoluto começa com `/`, como `/home/aluno/Documentos`. Um relativo depende de onde você está, como `../Downloads`. O símbolo `.` representa o diretório atual, enquanto `..` representa o diretório pai. Em sistemas Linux comuns, `Relatorio.txt` e `relatorio.txt` podem ser nomes distintos: diferenciar maiúsculas de minúsculas é uma pegadinha recorrente.

### Técnica de resolução

Em questões sobre terminal, sublinhe o **verbo** (listar, criar, copiar, mover, remover ou navegar), identifique o **alvo** (arquivo ou diretório) e confira se o comando realmente executa aquela ação. Nunca suponha que um comando muda o diretório atual apenas porque criou uma pasta.
',quiz=quiz || '[{"q":"Após executar mkdir estudos, o terminal passa automaticamente a trabalhar dentro da nova pasta.","a":false,"why":"Errado. mkdir cria a pasta, mas não altera o diretório de trabalho. Para entrar nela, use cd estudos. A banca explora a diferença entre criar e navegar.","difficulty":"médio","tip":"Compare as funções de mkdir e cd."},{"q":"No Linux, o comando ls -a pode mostrar arquivos cujo nome começa com ponto.","a":true,"why":"Certo. Em sistemas Linux, nomes iniciados por ponto são normalmente ocultados pela listagem simples; a opção -a inclui esses itens. Isso não implica criptografia.","difficulty":"médio","tip":"Lembre-se de que -a significa all."}]'::jsonb,updated_at=now() WHERE slug='informatica-03-02' AND content_status='active' AND body_md NOT LIKE '%## Laboratório prático: comandos que a banca confunde%' AND jsonb_array_length(quiz)=2;