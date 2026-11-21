-- Expande as aulas de Noções de Informática, revisa explicações de prova
-- e acrescenta questões autorais de Matemática Financeira alinhadas ao Anexo III PC-AC.
update public.study_materials
set body_md = left(body_md, strpos(body_md, E'\n\n## Classificação dos passivos financeiros — CPC 26\n') - 1),
    updated_at = now()
where slug = 'pcac-2026-contabilidade-05-matematica-financeira-juros-descontos'
  and strpos(body_md, E'\n\n## Classificação dos passivos financeiros — CPC 26\n') > 0;

update public.study_materials
set body_md = body_md || '
## Aprofundamento didático PC-AC 2026 — fundamentos, formatos e interoperabilidade

### Hardware, software e firmware
Hardware é a parte física: processador, memória RAM, teclado, monitor e disco. Software é o conjunto de programas e instruções: Windows, Ubuntu, navegador e editor de texto. Firmware é um programa gravado no próprio equipamento, usado para controlar funções básicas de dispositivos.

**Exemplo:** o computador é o equipamento (hardware); o Windows é o sistema que administra seus recursos (software); o firmware da impressora controla funções internas do aparelho.

### Formatos abertos e proprietários
Um formato aberto possui especificação pública e pode ser implementado por diferentes programas. ODT, ODS e ODP pertencem à família OpenDocument. DOCX, XLSX e PPTX são formatos do Office baseados em padrões publicados, mas ligados ao ecossistema Microsoft. Formato proprietário pode depender de decisões e recursos específicos de um fornecedor.

Interoperabilidade é a capacidade de sistemas diferentes trocarem e utilizarem informações. Um arquivo pode abrir em dois programas e, ainda assim, sofrer alteração de fontes, fórmulas, macros ou paginação.

### Armazenamento e versões
- **Local:** disco do próprio computador ou dispositivo.
- **Remoto:** servidor ou equipamento acessado pela rede.
- **Nuvem:** serviço remoto disponibilizado pela internet.
- **Sincronização:** replica alterações entre locais vinculados.
- **Controle de versões:** conserva estados diferentes de um arquivo, permitindo identificar ou recuperar alterações.

**Exemplo cotidiano:** um relatório salvo no computador é local; enviado para um servidor institucional é remoto; armazenado no OneDrive ou Google Drive está em nuvem. Se uma exclusão for sincronizada, ela também poderá chegar aos outros dispositivos. Por isso, sincronização não substitui backup independente.

### Software livre, licença e acessibilidade
Software livre respeita liberdades de executar, estudar, modificar e distribuir o programa, conforme a licença. Isso não significa necessariamente que seja gratuito. Software gratuito pode continuar fechado e restringir modificação ou redistribuição. Licença define direitos, condições e limites de uso.

Acessibilidade digital busca permitir o uso por pessoas com diferentes capacidades. Exemplos: texto alternativo em imagens, contraste adequado, navegação por teclado, títulos estruturados e legendas em vídeos.

**Como a IDECAN pode cobrar:** diferenciar hardware de software; formato de arquivo de extensão; software livre de software gratuito; sincronização de backup; compatibilidade de interoperabilidade; e acessibilidade de mera aparência visual.
',
    updated_at = now(),
    practice_review = jsonb_set(
      jsonb_set(coalesce(practice_review,'{}'::jsonb), '{review_date}', '"2026-11-20"'::jsonb),
      '{result}',
      to_jsonb('Revisão didática ampliada e conferência dos cinco itens de fixação, alinhadas ao Anexo III do Edital PC-AC 2026.'::text)
    )
where slug = 'pcac-2026-informatica-sistemas-arquivos-escritorio-internet'
  and position('Aprofundamento didático PC-AC 2026' in body_md) = 0;

update public.study_materials
set body_md = body_md || '
## Aprofundamento didático PC-AC 2026 — usuários, permissões e recuperação

### Contas e perfis de usuário
Uma conta identifica a pessoa que utiliza o sistema. O perfil reúne configurações e arquivos associados àquela conta. Contas comuns devem ser usadas nas tarefas diárias; privilégios administrativos ficam reservados a operações que realmente precisam deles.

No Windows, permissões podem ser atribuídas a usuários e grupos. No Ubuntu, as permissões tradicionais distinguem proprietário, grupo e outros, com leitura, escrita e execução. O comando `sudo` permite executar uma operação com privilégios elevados quando autorizado.

### Histórico de versões e recuperação
Histórico de versões conserva estados anteriores de documentos. A Lixeira permite recuperar determinados arquivos excluídos pela interface gráfica. Ferramentas de recuperação e cópias de segurança podem ser necessárias quando o arquivo não está mais na Lixeira.

**Exemplo:** um servidor substitui por engano uma planilha importante. Se o serviço ou sistema mantiver versões, poderá recuperar a versão anterior. Se houver apenas sincronização, a versão errada também poderá ser replicada.

### Atualizações, privacidade e segurança
Atualizações corrigem falhas, melhoram compatibilidade e podem incluir recursos. Adie ou interrompa atualizações somente conforme política institucional. Revise permissões de aplicativos, compartilhamento de localização, dados de diagnóstico e acesso a microfone, câmera e arquivos.

**Pegadinhas:** extensão não converte o conteúdo; `rm` não equivale necessariamente à Lixeira; permissão de execução em diretório Linux permite atravessá-lo; conta administrativa não deve ser usada sem necessidade; histórico de versões não substitui backup.
',
    updated_at = now(),
    practice_review = jsonb_set(
      jsonb_set(coalesce(practice_review,'{}'::jsonb), '{review_date}', '"2026-11-20"'::jsonb),
      '{result}',
      to_jsonb('Revisão didática ampliada e conferência dos cinco itens de fixação, alinhadas ao Anexo III do Edital PC-AC 2026.'::text)
    )
where slug = 'pcac-2026-informatica-windows-ubuntu-permissoes'
  and position('Aprofundamento didático PC-AC 2026' in body_md) = 0;

update public.study_materials
set body_md = body_md || '
## Aprofundamento didático PC-AC 2026 — integração de ferramentas

### Um fluxo de trabalho completo
Imagine que uma unidade receba registros de ocorrências em uma planilha. O servidor confere os dados no Excel ou Calc, aplica filtros, identifica inconsistências, prepara um resumo em Word ou Writer e apresenta os resultados em PowerPoint ou Impress.

Nesse fluxo, cada aplicativo tem função própria: a planilha organiza e calcula; o editor estrutura o relatório; a apresentação comunica os resultados. Copiar, incorporar ou vincular objetos produz efeitos diferentes e deve ser escolhido conforme a necessidade.

### Banco de dados em linguagem simples
- **Tabela:** conjunto organizado de dados sobre um assunto.
- **Registro ou linha:** uma ocorrência, pessoa, objeto ou evento.
- **Campo ou coluna:** uma característica, como data, número ou situação.
- **Chave primária:** identifica um registro sem duplicidade dentro da tabela.
- **Chave estrangeira:** relaciona um registro a outra tabela.
- **Consulta:** seleciona informações conforme critérios.

**Exemplo:** uma tabela de ocorrências pode ter número, data e local. Outra tabela contém servidores. Um identificador relaciona a ocorrência ao responsável sem precisar repetir todos os dados do servidor.

### Cuidados de interoperabilidade
Ao transferir dados entre aplicativos, confira separadores, datas, casas decimais, fórmulas, fontes e permissões. Um CSV pode transportar dados tabulares, mas não conserva fórmulas, cores ou gráficos como uma planilha nativa.

**Dica:** a extensão indica o formato esperado, mas não prova que o conteúdo esteja íntegro ou seguro.
',
    updated_at = now(),
    practice_review = jsonb_set(
      jsonb_set(coalesce(practice_review,'{}'::jsonb), '{review_date}', '"2026-11-20"'::jsonb),
      '{result}',
      to_jsonb('Revisão didática ampliada e conferência dos cinco itens de fixação, alinhadas ao Anexo III do Edital PC-AC 2026.'::text)
    )
where slug = 'pcac-2026-informatica-office-planilhas-nuvem-bancos-dados'
  and position('Aprofundamento didático PC-AC 2026' in body_md) = 0;

update public.study_materials
set body_md = body_md || '
## Aprofundamento didático PC-AC 2026 — recursos avançados de documentos

### Estilos e sumário automático
Estilo é um conjunto de propriedades aplicadas a um tipo de parágrafo ou caractere. Marcar um texto como “Título 1” ou “Título 2” cria uma estrutura lógica que o Word ou Writer pode utilizar para gerar um sumário automático. Apenas aumentar a fonte e colocar negrito não produz a mesma estrutura.

### Notas, legendas e referências
Notas de rodapé aparecem no fim da página; notas de fim ficam no final de uma seção ou documento. Legendas identificam figuras e tabelas. Referências cruzadas apontam para títulos, tabelas, figuras e outros elementos internos, podendo ser atualizadas quando a numeração muda.

### Mala direta e modelos
Mala direta combina um documento-base com uma fonte de dados, como uma planilha, para gerar cartas ou etiquetas personalizadas. Modelo é um arquivo-base que conserva estrutura, estilos e configurações para reutilização.

**Exemplo:** uma unidade precisa gerar 80 comunicados com nomes e endereços diferentes. Em vez de editar 80 arquivos, prepara um documento-base e uma planilha com os destinatários e utiliza mala direta.

### Revisão e proteção
Comentários registram observações; controle de alterações registra inserções e exclusões para aceitar ou rejeitar. Comparar documentos identifica diferenças entre versões. Proteção por senha ou restrição de edição reduz alterações não autorizadas, mas não substitui o controle institucional de acesso.

**Dica de prova:** comentário não é controle de alterações; sumário automático depende de estilos; PDF facilita distribuição, mas deve ser conferido quanto a links, fontes e acessibilidade.
',
    updated_at = now(),
    practice_review = jsonb_set(
      jsonb_set(coalesce(practice_review,'{}'::jsonb), '{review_date}', '"2026-11-20"'::jsonb),
      '{result}',
      to_jsonb('Revisão didática ampliada e conferência dos cinco itens de fixação, alinhadas ao Anexo III do Edital PC-AC 2026.'::text)
    )
where slug = 'pcac-2026-informatica-word-writer-documentos-estilos-revisao'
  and position('Aprofundamento didático PC-AC 2026' in body_md) = 0;

update public.study_materials
set body_md = body_md || '
## Aprofundamento didático PC-AC 2026 — fórmulas e funções

### Referências relativas, absolutas e mistas
Considere a fórmula `=B2*C2`. Ao copiá-la uma linha abaixo, ela normalmente vira `=B3*C3`: as referências são relativas. Em `=$B$2*C3`, a célula B2 permanece fixa e C3 muda para C4. Em `=$B2`, apenas a coluna fica fixa; em `=B$2`, apenas a linha fica fixa.

**Macete:** o cifrão fixa o elemento que vem logo depois dele.

### Funções por finalidade
- **Matemáticas:** SOMA, ABS, ARRED e outras operações numéricas.
- **Estatísticas:** MÉDIA, MED, MÍNIMO, MÁXIMO e CONT.VALORES.
- **Lógicas:** SE, E, OU e NÃO.
- **Texto:** ESQUERDA, DIREITA, EXT.TEXTO e CONCAT.
- **Data e hora:** HOJE, AGORA, DIA, MÊS e ANO.
- **Pesquisa:** PROCV e funções de pesquisa equivalentes, conforme a versão.

Exemplos ilustrativos:
- `=SOMA(B2:B6)` soma os valores do intervalo.
- `=SE(C2>=7;"Aprovado";"Revisar")` testa uma condição.
- `=CONT.SE(D2:D100;"Pendente")` conta células que atendem ao critério.

Nomes de funções, separadores e disponibilidade podem variar conforme idioma e versão do aplicativo.

### Ferramentas de organização
Classificação reorganiza os registros; filtro apenas exibe os que atendem ao critério. Validação de dados limita o que pode ser digitado. Formatação condicional altera a aparência conforme regras. Tabela dinâmica agrupa e resume dados. Gráfico representa padrões e comparações.

**Exemplo:** para impedir datas fora de um período, use validação de dados. Para destacar atrasos em vermelho, use formatação condicional. Para exibir somente os atrasados, use filtro.

### Erros e proteção
Erros podem decorrer de divisão por zero, referência inválida, tipo incompatível, nome de função ou intervalo incorreto. Proteção de planilha reduz alterações acidentais, mas não equivale a criptografia nem garante confidencialidade.

**Pegadinha:** filtro não apaga registros; formatação condicional não bloqueia entrada; validação não resume dados; tabela dinâmica não é um gráfico.
',
    updated_at = now(),
    practice_review = jsonb_set(
      jsonb_set(coalesce(practice_review,'{}'::jsonb), '{review_date}', '"2026-11-20"'::jsonb),
      '{result}',
      to_jsonb('Revisão didática ampliada e conferência dos cinco itens de fixação, alinhadas ao Anexo III do Edital PC-AC 2026.'::text)
    )
where slug = 'pcac-2026-informatica-excel-calc-funcoes-tabelas-graficos'
  and position('Aprofundamento didático PC-AC 2026' in body_md) = 0;

update public.study_materials
set body_md = body_md || '
## Aprofundamento didático PC-AC 2026 — integração e compatibilidade

### Incorporar ou vincular?
Ao **incorporar** uma planilha em uma apresentação, uma cópia do objeto fica armazenada no arquivo de destino. Ao **vincular**, a apresentação mantém uma ligação com o arquivo de origem; alterações na origem podem ser refletidas, mas o vínculo pode falhar se o arquivo for movido, renomeado ou ficar inacessível.

### Transferência entre aplicativos
Copiar uma tabela como imagem preserva a aparência, mas dificulta editar os dados. Incorporar conserva um objeto editável no arquivo de destino. Vincular pode manter atualização, desde que a origem permaneça acessível.

### Compatibilidade e PDF
Ao abrir uma apresentação em outra versão ou pacote, podem mudar fontes, efeitos, layouts e recursos específicos. Exportar para PDF é adequado para distribuir uma versão estática de leitura, mas animações, transições e outros comportamentos interativos podem não ser preservados.

**Exemplo:** uma apresentação vinculada a uma planilha de rede pode exibir dados atualizados quando a planilha muda. Se o arquivo de origem for removido, a atualização poderá falhar.

**Como a banca cobra:** mestre x layout; transição x animação; objeto incorporado x vinculado; apresentação editável x PDF de leitura.
',
    updated_at = now(),
    practice_review = jsonb_set(
      jsonb_set(coalesce(practice_review,'{}'::jsonb), '{review_date}', '"2026-11-20"'::jsonb),
      '{result}',
      to_jsonb('Revisão didática ampliada e conferência dos cinco itens de fixação, alinhadas ao Anexo III do Edital PC-AC 2026.'::text)
    )
where slug = 'pcac-2026-informatica-apresentacoes-integracao-pdf'
  and position('Aprofundamento didático PC-AC 2026' in body_md) = 0;

update public.study_materials
set body_md = body_md || '
## Aprofundamento didático PC-AC 2026 — protocolos e pesquisa

### Protocolos básicos
- **DNS:** consulta registros associados a nomes de domínio, como a resolução de um nome para endereço IP.
- **DHCP:** pode fornecer automaticamente endereço IP e outros parâmetros de rede ao dispositivo.
- **HTTP:** protocolo de comunicação utilizado por aplicações web.
- **HTTPS:** HTTP protegido por TLS, com proteção do canal de comunicação e validação do certificado do servidor.

O certificado digital associa uma identidade a uma chave pública dentro de uma infraestrutura de confiança. O cadeado indica uma conexão protegida com o domínio validado; não garante que a informação publicada seja verdadeira.

### Operadores de busca
Aspas podem procurar uma expressão exata; o sinal de menos pode excluir um termo; `site:` restringe resultados a um domínio; `filetype:` pode localizar determinado tipo de arquivo, conforme o buscador.

Exemplos:
- `"edital 001/2026" site:ac.gov.br`
- `PC-AC IDECAN filetype:pdf`
- `Windows 11 permissões -anúncio`

### Avaliação de fontes e desinformação
Confira autoria, instituição responsável, data, URL, documentos originais e confirmação em fontes independentes. Leia além do título. Imagens antigas podem ser apresentadas como atuais; vídeos podem ser recortados; um dado verdadeiro pode ser usado fora de contexto.

**Dica:** HTTPS protege a transmissão; não atesta a qualidade do conteúdo. Um resultado no topo da busca não é necessariamente oficial ou confiável.
',
    updated_at = now(),
    practice_review = jsonb_set(
      jsonb_set(coalesce(practice_review,'{}'::jsonb), '{review_date}', '"2026-11-20"'::jsonb),
      '{result}',
      to_jsonb('Revisão didática ampliada e conferência dos cinco itens de fixação, alinhadas ao Anexo III do Edital PC-AC 2026.'::text)
    )
where slug = 'pcac-2026-informatica-internet-busca-navegadores-https'
  and position('Aprofundamento didático PC-AC 2026' in body_md) = 0;

update public.study_materials
set body_md = body_md || '
## Aprofundamento didático PC-AC 2026 — organização e segurança do e-mail

### Envio, recebimento e clientes
SMTP participa do envio e encaminhamento de mensagens. POP3 recupera mensagens e pode baixá-las para o dispositivo conforme a configuração. IMAP sincroniza mensagens e pastas com o servidor, facilitando o uso em vários aparelhos. Outlook e Thunderbird são clientes; Gmail pode ser utilizado por webmail ou aplicativo.

### Destinatários e organização
- **Para:** destinatário principal.
- **Cc:** cópia visível aos demais destinatários.
- **Cco:** cópia oculta, sem exibir os endereços aos outros destinatários.
- **Lista de distribuição:** envia a mensagem a um grupo.
- **Regra:** automatiza ações, como mover mensagens ou sinalizar remetentes.
- **Convite de calendário:** organiza evento, horário, participantes e resposta.

### Phishing, spoofing e cuidados
Phishing tenta enganar o destinatário para obter credenciais, dados ou execução de ações. Spoofing é falsificação de identidade ou origem aparente, como o remetente exibido. As técnicas podem aparecer juntas, mas não são sinônimos perfeitos.

**Exemplo:** um e-mail parece vir do suporte e ameaça bloquear a conta. Antes de clicar, confira o endereço real do remetente, o domínio do link e a solicitação. Confirme por telefone ou canal institucional independente.

**Pegadinha:** o campo remetente pode ser falsificado; Cco oculta destinatários; SMTP envia; POP3 e IMAP são usados para recebimento/acesso.
',
    updated_at = now(),
    practice_review = jsonb_set(
      jsonb_set(coalesce(practice_review,'{}'::jsonb), '{review_date}', '"2026-11-20"'::jsonb),
      '{result}',
      to_jsonb('Revisão didática ampliada e conferência dos cinco itens de fixação, alinhadas ao Anexo III do Edital PC-AC 2026.'::text)
    )
where slug = 'pcac-2026-informatica-email-protocolos-phishing'
  and position('Aprofundamento didático PC-AC 2026' in body_md) = 0;

update public.study_materials
set body_md = body_md || '
## Aprofundamento didático PC-AC 2026 — permissões e ciclo de acesso

### Compartilhar com segurança
Um arquivo pode ser compartilhado com uma pessoa específica, grupo institucional ou qualquer pessoa que possua o link. Links amplos podem ser encaminhados e alcançar pessoas fora do grupo original. Sempre confira quem pode visualizar, comentar ou editar e, quando disponível, limite prazo e download.

### Coautoria e histórico de versões
Coautoria permite edição simultânea. Histórico de versões registra estados anteriores e pode permitir restauração. Isso não substitui necessariamente um backup independente, porque uma exclusão ou corrupção pode ser sincronizada.

### Transferência e revogação
Quando um servidor muda de função, a permissão deve ser revisada. Se a necessidade termina, o acesso deve ser revogado. Transferir a propriedade de um arquivo exige conferir se o novo responsável tem autorização e se os links antigos continuam válidos.

**Exemplo:** uma planilha de diligências compartilhada por link público pode ser acessada por quem receber o endereço. O ideal é compartilhar apenas com os integrantes autorizados e retirar o acesso ao fim da atividade.

**Dica de prova:** visualizar, comentar e editar são permissões diferentes; histórico de versões não é sinônimo de backup; revogar acesso é parte da gestão do ciclo de vida da informação.
',
    updated_at = now(),
    practice_review = jsonb_set(
      jsonb_set(coalesce(practice_review,'{}'::jsonb), '{review_date}', '"2026-11-20"'::jsonb),
      '{result}',
      to_jsonb('Revisão didática ampliada e conferência dos cinco itens de fixação, alinhadas ao Anexo III do Edital PC-AC 2026.'::text)
    )
where slug = 'pcac-2026-informatica-nuvem-colaboracao-permissoes'
  and position('Aprofundamento didático PC-AC 2026' in body_md) = 0;

update public.study_materials
set body_md = body_md || '
## Aprofundamento didático PC-AC 2026 — governança e Administração Pública

### Qualidade dos dados
Dados confiáveis devem ser exatos, completos, consistentes, atuais e rastreáveis. Um campo vazio não deve ser interpretado automaticamente como zero. Duplicidade não deve ser apagada sem verificar se os registros representam o mesmo fato.

### Autenticação, autorização e auditoria
Autenticação confirma quem está acessando; autorização define o que essa identidade pode fazer; auditoria registra operações relevantes. Segregação de funções evita que uma única pessoa concentre etapas incompatíveis. Menor privilégio limita permissões ao necessário.

### Transparência e restrição de acesso
Transparência ativa é a divulgação espontânea de informações públicas. Transparência passiva ocorre quando a Administração responde a pedidos de acesso. Publicidade não significa divulgar irrestritamente dados pessoais, informações legalmente sigilosas ou classificadas.

**Exemplo:** publicar estatísticas gerais de atendimentos pode promover transparência; divulgar CPF, endereço residencial ou dados médicos sem base legal pode expor pessoas indevidamente.

### Publicação segura
Antes de compartilhar documentos, revise destinatários, permissões, anexos, comentários, histórico de alterações e metadados. Remova dados pessoais que não sejam necessários à finalidade da publicação e siga os procedimentos institucionais.

**Pegadinha:** autenticação não concede acesso universal; publicidade não elimina sigilo legal; trilha de auditoria registra ações; disponibilidade significa acesso quando necessário por usuários autorizados.
',
    updated_at = now(),
    practice_review = jsonb_set(
      jsonb_set(coalesce(practice_review,'{}'::jsonb), '{review_date}', '"2026-11-20"'::jsonb),
      '{result}',
      to_jsonb('Revisão didática ampliada e conferência dos cinco itens de fixação, alinhadas ao Anexo III do Edital PC-AC 2026.'::text)
    )
where slug = 'pcac-2026-informatica-sistemas-informacao-governanca-publica'
  and position('Aprofundamento didático PC-AC 2026' in body_md) = 0;

update public.curated_question_catalog
set explanation = case id::text
when '624c4c6a-dc16-4fb5-a6fe-73861b3fcfb5' then 'A alternativa B é correta: sincronizar significa replicar alterações entre os dispositivos vinculados e autorizados. Exemplo: ao editar uma planilha no computador, a versão atualizada pode aparecer no celular. Isso não torna o arquivo público. Atenção: se uma exclusão ou corrupção for sincronizada, ela também pode atingir os outros dispositivos; por isso, mantenha backup independente e histórico de versões.'
when 'aa89ad68-0513-4011-86b8-731bf6374ce8' then 'A alternativa B é correta porque a autenticação multifator combina fatores de categorias diferentes: algo que a pessoa sabe (senha), algo que possui (token ou celular) ou algo que é (biometria). Duas senhas continuam sendo fatores de conhecimento e, sozinhas, não formam MFA. O recurso reduz riscos, mas não impede todo golpe ou roubo de sessão.'
when 'f3bb892e-6780-43d8-a441-306b19de2b90' then 'A alternativa B é correta: DNS resolve nomes de domínio para informações de rede, normalmente endereços IP. DHCP tem outra função: distribuir automaticamente parâmetros como IP, máscara, gateway e servidor DNS. Exemplo: ao conectar o notebook ao Wi-Fi, o DHCP pode entregar a configuração; quando você digita o endereço de um site, o DNS ajuda a localizar o servidor.'
when 'b52a1bb0-7bfa-41ad-9fcc-a2303a98342e' then 'A alternativa B é correta. Sincronização replica mudanças — inclusive exclusões e arquivos corrompidos — entre os locais conectados. Backup é uma cópia recuperável, preferencialmente versionada e protegida contra alteração. Exemplo: se um ransomware criptografar a pasta sincronizada, a alteração pode chegar à nuvem; uma cópia independente e testada pode permitir a recuperação.'
when '25e164e0-fa38-4b3c-a940-ab70c195df63' then 'A alternativa B é correta: a referência absoluta usa cifrões para fixar coluna, linha ou ambas. $A$1 fixa as duas; $A1 fixa a coluna; A$1 fixa a linha; A1 é relativa. Exemplo: ao copiar uma fórmula para várias linhas, uma alíquota armazenada em $B$1 permanece fixa, enquanto a referência da venda pode mudar.'
when '879e68ae-c72b-4fd2-914d-4ef7b096a57f' then 'A alternativa A é correta: em $B$4, o cifrão antes de B fixa a coluna e o cifrão antes de 4 fixa a linha. Ao copiar a fórmula para outra célula, a referência continua apontando para B4. Compare: B$4 fixa apenas a linha; $B4 fixa apenas a coluna.'
when '5d0c4c4a-5318-445d-b5c1-3217774b5914' then 'A alternativa B é correta em configurações usuais: sistemas Linux normalmente diferenciam maiúsculas e minúsculas nos nomes de arquivos; Windows normalmente não faz essa distinção no uso comum. Exemplo: no Linux, Relatorio.txt e relatorio.txt podem ser arquivos diferentes. Trocar a extensão de .jpg para .pdf não converte a imagem em PDF; apenas altera o nome/extensão.'
when '40a8c7d2-71a4-4e02-b216-33d157ceaf09' then 'A alternativa B é a pretendida, desde que os fatores sejam de categorias distintas. Exemplos: senha (conhecimento) + código em aplicativo autenticador ou token (posse); senha + biometria (conhecimento + inerência). Duas senhas ou duas perguntas secretas continuam na mesma categoria. MFA reduz o risco de uma credencial isolada ser suficiente, mas não elimina phishing ou outros ataques.'
when '2d2260ee-8e9f-4234-b8e9-0f01233e8406' then 'A alternativa B é correta. Autenticação responde “quem é você?”; autorização responde “o que você pode acessar ou fazer?”. Exemplo: o servidor entra na rede com senha e confirma sua identidade (autenticação), mas só pode consultar os procedimentos vinculados à sua função (autorização). Uma credencial válida não libera automaticamente todos os dados.'
when '3c93a60a-7857-4158-bc33-2267f9cf358a' then 'A alternativa A é correta. Disponibilidade significa que a informação e o sistema podem ser utilizados quando necessários por usuários autorizados. Exemplo: manter redundância e backups testados ajuda a recuperar um sistema após uma falha. Não significa acesso aberto a qualquer pessoa — isso contrariaria a confidencialidade.'
when '5b6d944c-b38b-4b6a-ba3f-e9700058931e' then 'A alternativa A é correta: phishing usa mensagens, páginas ou comunicações fraudulentas para induzir a vítima a revelar credenciais ou executar uma ação. Sinais comuns são urgência artificial, link com domínio estranho e pedido de senha. Exemplo: uma mensagem que imita o banco e ameaça bloquear a conta. Acesse o serviço pelo endereço oficial e confirme pedidos sensíveis por outro canal.'
when '594ea136-b0fb-4874-a5fe-998633e8de12' then 'A alternativa A é correta. Phishing é uma fraude de engenharia social que tenta capturar credenciais ou dados por meio de mensagens e páginas falsas. O fato de a página parecer institucional não comprova sua legitimidade. Confira o domínio, evite links inesperados e nunca informe senha em página acessada por mensagem suspeita.'
when 'cf9f3052-7984-471b-a137-3f617003f577' then 'A alternativa A é correta: o desvio-padrão é a raiz quadrada positiva da variância. Se a variância for 9, o desvio-padrão será 3. A raiz devolve a medida à unidade original dos dados; a variância fica em unidades ao quadrado. Dica: variância mede dispersão quadrática; desvio-padrão é sua raiz.'
when '8b5c23a4-fc15-48ef-bcd3-9f7e066e4fa1' then 'A alternativa B é correta. Frequência relativa é a parte do total representada por uma categoria. Para transformar em porcentagem, multiplique por 100: 0,25 × 100 = 25%. Exemplo: se 25 de 100 registros têm determinada característica, a frequência relativa é 25/100 = 0,25 = 25%.'
when 'cba84ca7-a501-47a2-b8f0-928ab6785db6' then 'A alternativa B é correta. Primeiro ordene os dados; com quantidade ímpar, a mediana é o elemento central. Exemplo: em 3, 5, 8, 9 e 10, o valor central é 8. Com quantidade par, calcula-se a média dos dois valores centrais. Não confunda mediana (posição central) com moda (valor mais frequente).'
when 'a8116f5f-d6de-40e5-aa74-f142e5c57f21' then 'A alternativa C é correta. Um evento e seu complemento cobrem todas as possibilidades e não acontecem simultaneamente; por isso, suas probabilidades somam 1. Se P(A)=0,7, então P(não A)=1−0,7=0,3, ou 30%. Dica: quando o enunciado disser “não ocorrer”, procure o complemento.'
when '5785836a-3dda-4e53-8882-f7c290ac355d' then 'A afirmação está correta (C). Nos juros simples, J = C × i × t. Substituindo: 2.000 × 0,02 × 5 = R$ 200. O montante é C + J = R$ 2.200. A taxa de 2% deve ser escrita como 0,02 e o prazo precisa estar na mesma unidade da taxa (meses).'
when '3a97d6cf-8525-44db-ae11-1ffcbe62884d' then 'A afirmação está correta (C). Há 5 bolas no total (3 vermelhas + 2 azuis). “Não sair azul” significa sair vermelha; portanto, são 3 resultados favoráveis em 5 possíveis: 3/5 = 0,6 = 60%. Em sorteio equiprovável, probabilidade = casos favoráveis ÷ casos possíveis.'
else explanation end,
verified_at = now(),
didactic_provenance = coalesce(didactic_provenance,'{}'::jsonb) ||
  jsonb_build_object('review_2026_11_20', jsonb_build_object(
    'status','approved',
    'scope','answer key and didactic explanation',
    'note','Gabarito recalculado/conferido e explicação ampliada com exemplo ou regra de prova.'
  ))
where id::text in ('624c4c6a-dc16-4fb5-a6fe-73861b3fcfb5','aa89ad68-0513-4011-86b8-731bf6374ce8','f3bb892e-6780-43d8-a441-306b19de2b90','b52a1bb0-7bfa-41ad-9fcc-a2303a98342e','25e164e0-fa38-4b3c-a940-ab70c195df63','879e68ae-c72b-4fd2-914d-4ef7b096a57f','5d0c4c4a-5318-445d-b5c1-3217774b5914','40a8c7d2-71a4-4e02-b216-33d157ceaf09','2d2260ee-8e9f-4234-b8e9-0f01233e8406','3c93a60a-7857-4158-bc33-2267f9cf358a','5b6d944c-b38b-4b6a-ba3f-e9700058931e','594ea136-b0fb-4874-a5fe-998633e8de12','cf9f3052-7984-471b-a137-3f617003f577','8b5c23a4-fc15-48ef-bcd3-9f7e066e4fa1','cba84ca7-a501-47a2-b8f0-928ab6785db6','a8116f5f-d6de-40e5-aa74-f142e5c57f21','5785836a-3dda-4e53-8882-f7c290ac355d','3a97d6cf-8525-44db-ae11-1ffcbe62884d');

update public.curated_question_catalog
set question_text = replace(
  question_text,
  'B) exige fatores independentes ou complementares para confirmar a identidade.',
  'B) combina fatores de categorias distintas, como conhecimento e posse.'
)
where id = '40a8c7d2-71a4-4e02-b216-33d157ceaf09';

insert into public.curated_question_catalog (
  source_id, syllabus_topic_id, external_item_key, contest_name, contest_year,
  career_name, exam_board, subject, subtopic, question_text, official_answer,
  explanation, difficulty, content_status, is_original, verified_at, state,
  career_category, role_type, tested_topic, import_content_key, import_unique_key,
  didactic_provenance
) values
(
  'b2a15f6c-7cad-417c-8407-67e33fc9dc47',
  '9a3535c6-f720-472a-9138-8acf5f212b31',
  'PCAC26-CONTAB-MF-001',
  'Polícia Civil do Acre', 2026,
  'Oficial Investigador de Polícia',
  'AUTORAL',
  'Contabilidade Geral e Análise Financeira',
  'Juros compostos',
  'Um capital de R$ 2.000,00 é aplicado a juros compostos de 10% ao mês durante dois meses. Qual é o montante ao final do período?

A) R$ 2.200,00.
B) R$ 2.400,00.
C) R$ 2.420,00.
D) R$ 2.440,00.
E) R$ 2.600,00.',
  'C',
  'A alternativa C é correta. Em juros compostos, M = C × (1+i)^n. Substituindo: M = 2.000 × (1,10)^2 = 2.000 × 1,21 = R$ 2.420,00. Os juros são 2.420 − 2.000 = R$ 420,00. Compare: em juros simples, seriam 2.000 × 0,10 × 2 = R$ 400,00. Dica: em compostos, os juros do primeiro período entram na base do segundo.',
  'média', 'active', true, now(), 'AC',
  'policial', 'Oficial Investigador de Polícia',
  'Juros compostos',
  'pcac2026-contabilidade-matematica-financeira',
  'pcac26-contab-mf-001',
  '{"kind":"original_question","authored":true,"source":"Norte Concursos — elaboração autoral para PC-AC 2026","source_basis":"Edital nº 001/2026 SEAD/PCAC — Anexo III, Contabilidade Geral e Análise Financeira, item 5 (matemática financeira)","target_exam":"PC-AC 2026 — Oficial Investigador de Polícia","target_style":"IDECAN","not_official_exam":true,"review_state":"editorial_review_passed","review_date":"2026-11-20"}'::jsonb
),
(
  'b2a15f6c-7cad-417c-8407-67e33fc9dc47',
  '9a3535c6-f720-472a-9138-8acf5f212b31',
  'PCAC26-CONTAB-MF-002',
  'Polícia Civil do Acre', 2026,
  'Oficial Investigador de Polícia',
  'AUTORAL',
  'Contabilidade Geral e Análise Financeira',
  'Taxas nominais e efetivas',
  'Uma instituição anuncia taxa nominal de 12% ao ano, com capitalização mensal. Considerando juros compostos, qual é a taxa efetiva anual aproximada?

A) 12,00%.
B) 12,12%.
C) 12,50%.
D) 12,68%.
E) 13,00%.',
  'D',
  'A alternativa D é correta. A taxa nominal de 12% ao ano com capitalização mensal corresponde a 12% ÷ 12 = 1% ao mês. A taxa efetiva anual é (1,01)^12 − 1 ≈ 0,1268, ou 12,68%. Não confunda a taxa proporcional de 12% com a taxa efetiva composta. Dica: quando a capitalização é mensal, primeiro encontre a taxa mensal e depois acumule os 12 períodos.',
  'média', 'active', true, now(), 'AC',
  'policial', 'Oficial Investigador de Polícia',
  'Taxas nominais e efetivas',
  'pcac2026-contabilidade-matematica-financeira',
  'pcac26-contab-mf-002',
  '{"kind":"original_question","authored":true,"source":"Norte Concursos — elaboração autoral para PC-AC 2026","source_basis":"Edital nº 001/2026 SEAD/PCAC — Anexo III, Contabilidade Geral e Análise Financeira, item 5 (matemática financeira)","target_exam":"PC-AC 2026 — Oficial Investigador de Polícia","target_style":"IDECAN","not_official_exam":true,"review_state":"editorial_review_passed","review_date":"2026-11-20"}'::jsonb
),
(
  'b2a15f6c-7cad-417c-8407-67e33fc9dc47',
  '9a3535c6-f720-472a-9138-8acf5f212b31',
  'PCAC26-CONTAB-MF-003',
  'Polícia Civil do Acre', 2026,
  'Oficial Investigador de Polícia',
  'AUTORAL',
  'Contabilidade Geral e Análise Financeira',
  'Desconto comercial simples',
  'Um título de valor nominal de R$ 5.000,00 é antecipado em dois meses, com desconto comercial simples de 1,5% ao mês. Qual é o valor do desconto?

A) R$ 100,00.
B) R$ 125,00.
C) R$ 150,00.
D) R$ 175,00.
E) R$ 200,00.',
  'C',
  'A alternativa C é correta. No desconto comercial simples, a taxa incide sobre o valor nominal: D = N × i × n. Assim, D = 5.000 × 0,015 × 2 = R$ 150,00. O valor atual recebido seria 5.000 − 150 = R$ 4.850,00. Dica: não confunda o desconto (diferença) com o valor líquido recebido.',
  'média', 'active', true, now(), 'AC',
  'policial', 'Oficial Investigador de Polícia',
  'Desconto comercial simples',
  'pcac2026-contabilidade-matematica-financeira',
  'pcac26-contab-mf-003',
  '{"kind":"original_question","authored":true,"source":"Norte Concursos — elaboração autoral para PC-AC 2026","source_basis":"Edital nº 001/2026 SEAD/PCAC — Anexo III, Contabilidade Geral e Análise Financeira, item 5 (matemática financeira)","target_exam":"PC-AC 2026 — Oficial Investigador de Polícia","target_style":"IDECAN","not_official_exam":true,"review_state":"editorial_review_passed","review_date":"2026-11-20"}'::jsonb
)
on conflict (source_id, external_item_key) do nothing;
