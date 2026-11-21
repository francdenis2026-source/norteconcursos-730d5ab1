UPDATE study_materials SET body_md=body_md || '

## Oficina de permissões: leitura, escrita e execução

**Como interpretar o número:** cada dígito soma leitura (4), escrita (2) e execução (1). Assim, `chmod 750 relatorio.sh` concede ao dono 7 (rwx), ao grupo 5 (r-x) e aos demais 0 (nenhuma dessas permissões). Não confunda 5 com escrita: 5=4+1.

**Arquivo e diretório não funcionam exatamente igual.** Em arquivo regular, x indica permissão de execução. Em diretório, x permite atravessar ou acessar entradas pelo caminho, enquanto r está relacionado a listar nomes; operações dependem também de outras permissões e condições.

**Exemplo cotidiano:** um script com `chmod 700 script.sh` concede ao proprietário leitura, escrita e execução e não concede essas permissões a grupo ou outros. O comando `chmod` altera modos de permissão; `chown` altera propriedade, quando autorizado.

**Dica de prova:** traduza cada dígito separadamente e associe o primeiro ao dono, o segundo ao grupo e o terceiro aos outros. Nunca suponha que o número representa quantidade de usuários.
',quiz=quiz || '[{"q":"Em permissões tradicionais do Linux, chmod 640 concede leitura e escrita ao dono, leitura ao grupo e nenhuma dessas permissões aos outros.","a":true,"why":"Certo. 6=4+2 (leitura e escrita), 4=leitura e 0=nenhuma permissão no trio r,w,x. A ordem dos dígitos é dono, grupo e outros."},{"q":"No comando chmod 751 arquivo, o dígito 5 representa leitura e escrita para o grupo.","a":false,"why":"Errado. O dígito 5 corresponde a 4+1, ou leitura e execução. Leitura e escrita somam 6."}]'::jsonb,updated_at=now() WHERE slug='informatica-03-03' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Oficina de permissões: leitura, escrita e execução%';
UPDATE study_materials SET body_md=body_md || '

## Prática guiada: Explorador de Arquivos e atalhos

**Copiar e mover:** ao selecionar um arquivo e usar `Ctrl+C`, a origem normalmente permanece após `Ctrl+V` no destino. Com `Ctrl+X` seguido de `Ctrl+V`, a intenção é mover o item. O resultado pode variar conforme permissões e contexto do aplicativo.

**Renomear:** no Explorador de Arquivos, `F2` costuma iniciar a alteração do nome do item selecionado. Isso não altera automaticamente o conteúdo do arquivo. **Desfazer:** `Ctrl+Z` pode desfazer a operação anterior em aplicativos compatíveis, mas não garante reversão de qualquer ação.

**Excluir:** a tecla `Delete` normalmente envia arquivos elegíveis para a Lixeira; `Shift+Delete` normalmente a ignora. Nem toda exclusão passa pela Lixeira, por exemplo em determinadas unidades, configurações ou operações.

**Pegadinha:** ''copiar'', ''recortar'', ''colar'', ''renomear'' e ''excluir'' são operações diferentes. Antes de responder, identifique se o enunciado pergunta sobre a origem, o destino ou a possibilidade de recuperação.
',quiz=quiz || '[{"q":"No Explorador de Arquivos do Windows, a tecla F2 normalmente permite renomear o item selecionado.","a":true,"why":"Certo. F2 é o atalho usual para iniciar a renomeação do arquivo ou pasta selecionado no Explorador. Renomear não significa alterar o conteúdo do arquivo."},{"q":"No Windows, Shift+Delete garante que um arquivo excluído ficará disponível na Lixeira.","a":false,"why":"Errado. Shift+Delete normalmente ignora a Lixeira. Uma eventual recuperação dependerá de outros recursos, como backups."}]'::jsonb,updated_at=now() WHERE slug='informatica-03-01' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Prática guiada: Explorador de Arquivos e atalhos%';