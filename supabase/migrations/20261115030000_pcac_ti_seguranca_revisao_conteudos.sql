-- PC-AC 2026: revisão dos módulos de TI e Segurança da Informação.
update public.study_materials set title='Bancos de dados relacionais: tabelas, chaves, relacionamentos e SQL',topic_label='5. Bancos de dados',body_md='# Bancos de dados relacionais

## 1. Conceitos
Banco de dados é coleção organizada de dados. Em modelo relacional, tabelas representam entidades ou relações; colunas/campos representam atributos; linhas/registros representam ocorrências. SGBD permite criar, consultar, atualizar, controlar acesso e administrar os dados.

## 2. Chaves
Chave primária identifica unicamente cada registro e não deve ser nula. Chave estrangeira referencia chave de outra tabela, estabelecendo relação e integridade referencial. Chaves compostas usam mais de um campo. Chave candidata também pode identificar unicamente um registro.

## 3. Relacionamentos
- Um para um: um registro se relaciona com, no máximo, um registro de outra tabela.
- Um para muitos: um registro de uma tabela se relaciona com vários da outra.
- Muitos para muitos: normalmente exige tabela associativa.

**Exemplo:** uma pessoa pode possuir vários endereços (um-para-muitos); estudantes podem cursar várias disciplinas e cada disciplina ter vários estudantes (muitos-para-muitos).

## 4. Consultas SQL
SELECT escolhe colunas; FROM indica tabelas; WHERE filtra linhas; JOIN combina registros relacionados; GROUP BY agrupa; HAVING filtra grupos; ORDER BY ordena. COUNT, SUM e AVG são agregadores.

Exemplo: SELECT municipio, COUNT(*) FROM ocorrencias GROUP BY municipio; conta registros por município.

## 5. Integração de bases
Identifique campos correspondentes, tipos, chaves e critérios de correspondência. Diferenças de formato em CPF, datas ou nomes podem causar falhas. Verifique cardinalidade e registros sem correspondência. Documente origem, transformação e limitações.

## 6. Qualidade e segurança
Controle permissões, registre acessos e evite expor dados pessoais sem necessidade. Chaves repetidas e relações inconsistentes podem gerar duplicidade ou perda de informação em consultas.

## Pegadinhas
Chave primária identifica; estrangeira referencia. WHERE filtra linhas antes do agrupamento; HAVING filtra grupos. Muitos-para-muitos geralmente usa tabela associativa.',updated_at=now() where slug='pcac-2026-ti-bancos-dados-tabelas-chaves-consultas' and content_status='active';
update public.study_materials set title='Metadados, propriedades e rastreabilidade de arquivos digitais',topic_label='7. Metadados',body_md='# Metadados e propriedades de arquivos digitais

## 1. Conceito e finalidade
Metadados são dados que descrevem, contextualizam, estruturam ou permitem gerenciar outros dados. Podem informar conteúdo, autoria, origem, formato, datas, direitos, localização, relações e histórico. Apoiam organização, busca, autenticidade, preservação e auditoria.

## 2. Categorias
- Descritivos: título, assunto, autor e palavras-chave.
- Estruturais: relação entre partes, páginas, anexos ou componentes.
- Administrativos: direitos, acesso, retenção e gestão.
- Técnicos: formato, tamanho, resolução, software e parâmetros.
- De preservação: eventos, migrações, verificações e histórico de integridade.

## 3. Datas e propriedades
Data de criação, modificação, acesso e captura podem ter significados distintos. Relógio incorreto, fuso, cópia, sincronização ou exportação podem alterar metadados. A data exibida no sistema não comprova sozinha quando o conteúdo foi produzido.

## 4. Rastreabilidade
Registre origem, responsável, operação, data/hora, versão e hash quando apropriado. Hash permite verificar se o conteúdo mudou, mas não prova autoria ou veracidade. Preserve o original e documente transformações.

## 5. Privacidade
Metadados podem revelar localização, autor, dispositivo ou histórico. Antes de publicar arquivos, verifique propriedades e remova informações pessoais ou sensíveis quando necessário e autorizado.

## Exemplo resolvido
Uma fotografia pode conter data, modelo do dispositivo e coordenadas. Esses dados ajudam a contextualizar o arquivo, mas podem estar ausentes, alterados ou incorretos. Devem ser confrontados com outras fontes.

## Pegadinhas
Metadado não é apenas palavra-chave; data de modificação não prova data de criação; hash não identifica autor; metadados também podem conter dados pessoais.',updated_at=now() where slug='pcac-2026-ti-metadados-propriedades-arquivos-rastreabilidade' and content_status='active';
update public.study_materials set title='Organização e tratamento de informações digitais: padronização, validação e cruzamento',topic_label='8. Organização e tratamento de informações digitais',body_md='# Organização e tratamento de informações digitais

## 1. Padronização
Defina padrões para nomes, datas, identificadores, categorias, unidades e campos. Use formato consistente e mantenha dicionário de dados. Padronizar não significa apagar diferenças legítimas entre registros; preserve o valor original.

## 2. Classificação
Classifique por finalidade, assunto, tipo, origem ou sensibilidade. Categorias devem ser claras e aplicadas consistentemente. Registre regras e exceções.

## 3. Duplicidades e inconsistências
Procure duplicidades por identificadores e combinações de campos. Analise divergências de grafia, datas, campos vazios e valores impossíveis. Não una registros só porque nomes são iguais; verifique outros atributos e contexto.

## 4. Cruzamento
Defina chave e tipo de correspondência (exata ou aproximada), preserve identificadores originais e confira registros sem correspondência e múltiplas correspondências. Verifique cardinalidade para evitar multiplicação inesperada de linhas. Documente origem e transformações.

## 5. Validação
Compare totais antes e depois, confira amostras, valide domínio e formato, identifique valores ausentes e procure contradições. Correção deve seguir regra documentada, sem inventar dado.

## 6. Apresentação
Use tabelas para valores detalhados, gráficos para padrões e diagramas para relações. Informe fonte, período, unidade, critérios de inclusão e limitações. Diferencie fato observado, inferência e hipótese.

## 7. Proteção
Aplique controle de acesso e compartilhe apenas o necessário. Evite expor dados pessoais em relatórios e mantenha rastreabilidade de versões e operações.

## Exemplo resolvido
Duas planilhas usam formatos diferentes de data e grafia de município. A equipe mantém cópias originais, cria campos normalizados, documenta as regras e só então cruza por identificador apropriado. Registros não pareados são analisados, não descartados automaticamente.

## Pegadinhas
Semelhança não comprova identidade; dado ausente não é zero; padronização deve preservar original; coincidência não prova causalidade.',updated_at=now() where slug='pcac-2026-ti-organizacao-tratamento-dados-digitais' and content_status='active';
update public.study_materials set title='Planilhas eletrônicas: fórmulas, filtros, tabelas dinâmicas e importação',topic_label='4. Planilhas eletrônicas aplicadas à análise de dados',body_md='# Planilhas eletrônicas aplicadas à análise de dados

## 1. Estrutura e preparação
Planilhas organizam dados em células, linhas e colunas. Cada linha deve representar um registro e cada coluna uma variável. Use cabeçalhos claros, tipos consistentes e uma observação por linha. Evite células mescladas e subtotais dentro da base.

## 2. Fórmulas e referências
Fórmulas começam com =. Referência relativa muda ao copiar; absoluta ($A$1) permanece fixa; mista fixa linha ou coluna. Funções comuns incluem SOMA, MÉDIA, MÍNIMO, MÁXIMO, CONT.SE, SOMASE e funções lógicas. Confira idioma, separadores e tipos.

**Exemplo:** ao copiar =A2*$B$1 para a linha seguinte, a referência A2 muda para A3, enquanto $B$1 permanece fixa.

## 3. Classificação, filtros e agrupamentos
Classificar ordena registros; filtros exibem subconjuntos que atendem a critérios. Ao ordenar, expanda a seleção para manter cada linha íntegra. Filtros não apagam os registros ocultos; apenas controlam sua exibição.

## 4. Tabelas dinâmicas e gráficos
Tabelas dinâmicas resumem dados por categorias e medidas, permitindo contagem, soma e média. Gráficos apoiam comparação e identificação de padrões. Informe título, unidade, período, fonte e escala adequada.

## 5. Importação e exportação
CSV é formato textual tabular; delimitador, codificação e separador decimal podem variar. Na importação, confira acentos, datas, zeros à esquerda, separadores e tipos. Exportar para CSV pode perder fórmulas, formatação, múltiplas abas e recursos do arquivo original.

## 6. Duplicidades e inconsistências
Procure registros repetidos por chave ou combinação de campos. Não exclua automaticamente: registros semelhantes podem representar eventos diferentes. Padronize espaços, caixa, datas e identificadores; trate ausências sem inventar valores. Registre critérios e preserve cópia original.

## Exemplo resolvido
Uma planilha tem coluna de município e valores “Rio Branco”, “RIO BRANCO” e “Rio-Branco”. Crie coluna auxiliar normalizada, documente a regra e mantenha a grafia original para rastreabilidade.

## Pegadinhas
Ordenar apenas uma coluna pode desassociar os dados; filtro não exclui linha; CSV pode perder formatação e fórmulas; vazio não significa zero.',updated_at=now() where slug='pcac-2026-ti-planilhas-analise-dados-importacao-deduplicacao' and content_status='active';
update public.study_materials set title='Redes, protocolos, criptografia e preservação digital',topic_label='2. Redes, protocolos, criptografia, backup e evidências digitais',body_md='# Redes, protocolos, criptografia e preservação digital

## 1. Endereçamento e equipamentos
IPv4 utiliza 32 bits; IPv6 utiliza 128 bits. O IP identifica logicamente uma interface em rede IP. O MAC identifica a interface na camada de enlace. Switch conecta dispositivos na rede local; roteador encaminha pacotes entre redes; firewall permite ou bloqueia tráfego conforme regras.

**Exemplo:** um computador pode manter o mesmo endereço MAC na interface e receber endereço IP diferente ao conectar-se a outra rede. IP e MAC não são sinônimos.

## 2. Protocolos essenciais
DNS resolve nomes de domínio; DHCP distribui parâmetros de rede; HTTP/HTTPS são usados na web, sendo HTTPS protegido por TLS; TCP oferece transporte orientado à conexão, com mecanismos de confiabilidade e ordenação; UDP não estabelece conexão nem garante entrega pelo próprio protocolo. SMTP envia e-mails; IMAP e POP3 permitem acesso e recebimento de mensagens.

## 3. Criptografia e hash
Criptografia simétrica utiliza a mesma chave secreta para cifrar e decifrar. A assimétrica utiliza par de chaves pública e privada. Para confidencialidade, o remetente pode cifrar com a chave pública do destinatário; a chave privada correspondente permite decifrar. Assinaturas digitais são produzidas com a chave privada do signatário e verificadas com a chave pública.

Hash produz resumo dos dados e pode apoiar verificação de integridade. Não é criptografia reversível. Se o conteúdo muda, o resumo tende a mudar; hash isolado não comprova autoria.

## 4. Certificados e assinatura
Certificados digitais vinculam uma identidade a uma chave pública segundo uma infraestrutura de confiança. A assinatura digital permite verificar integridade e associação à chave do signatário, conforme o sistema. Não confunda assinatura digital com imagem de assinatura manuscrita.

## 5. Backup e recuperação
Backup é cópia destinada à recuperação. Cópias devem ter controle de acesso, proteção contra alteração, armazenamento separado e testes periódicos de restauração. Sincronização replica mudanças e não garante, sozinha, recuperação de versões antigas. Cópias offline ou imutáveis ajudam contra ransomware.

- Completo: copia o conjunto selecionado.
- Incremental: copia alterações desde o backup anterior.
- Diferencial: copia alterações desde o último backup completo.

## 6. Preservação de evidências digitais
Preserve o original, documente coleta, responsável, data, ferramenta, operações, transferências e acessos. Hash pode apoiar conferência de integridade. A cadeia de custódia deve seguir normas institucionais e legislação aplicável.

## Exemplo resolvido
Antes de analisar uma cópia de arquivo, a equipe calcula e registra seu hash. Após a transferência, calcula novamente. Se os valores coincidem, há evidência de que o conteúdo permaneceu igual durante esse procedimento; isso não prova, isoladamente, autoria ou veracidade.

## Pegadinhas
IP ≠ MAC; DNS ≠ DHCP; TCP ≠ UDP; hash ≠ criptografia reversível; backup ≠ sincronização; assinatura digital ≠ imagem de assinatura.',updated_at=now() where slug='pcac-2026-ti-protocolos-criptografia-backup-evidencias' and content_status='active';
update public.study_materials set title='Redes de computadores: LAN, WAN, IP, protocolos e serviços',topic_label='6. Redes de computadores',body_md='# Redes de computadores

## 1. Tipos e arquitetura
LAN conecta dispositivos em área local; WAN interliga redes em grandes distâncias; WLAN é rede local sem fio. Internet é rede global de redes; intranet é ambiente privado. Topologia descreve a organização das conexões.

## 2. Endereçamento IP
IP identifica logicamente uma interface em uma rede. IPv4 usa 32 bits, representados em quatro octetos decimais; IPv6 usa 128 bits e representação hexadecimal. Máscara ou prefixo identifica a parte de rede. Gateway padrão encaminha tráfego para outras redes.

## 3. Equipamentos
Switch conecta dispositivos em rede local; roteador encaminha pacotes entre redes; ponto de acesso conecta dispositivos sem fio; firewall controla tráfego conforme regras. Modem adapta sinais para acesso ao meio de comunicação, conforme tecnologia.

## 4. Protocolos
TCP oferece transporte orientado à conexão, com mecanismos de confiabilidade e ordenação. UDP usa datagramas e não garante entrega ou ordem. IP trata endereçamento e encaminhamento. DNS resolve nomes; DHCP distribui configurações automaticamente.

## 5. Serviços e portas usuais
HTTP (80) e HTTPS (443) acessam recursos web; SMTP (25/587, conforme uso) envia e-mail; DNS usa normalmente 53; SSH usa normalmente 22; FTP usa 21 para controle e pode usar canal de dados separado. Portas podem ser configuradas de modo diferente.

## 6. Segurança
VPN cria túnel protegido sobre rede não confiável, conforme configuração. Wi-Fi deve usar criptografia moderna e credenciais fortes. Firewall não substitui atualizações, autenticação e controle de acesso. Conectar-se à rede não significa ter autorização para acessar sistemas.

## Exemplo resolvido
Ao digitar um endereço de site, o dispositivo pode consultar DNS para obter o endereço IP e então estabelecer comunicação com o servidor usando protocolos adequados. DNS não transporta a página; resolve o nome.

## Pegadinhas
DNS resolve nomes; DHCP configura; roteador interliga redes; switch conecta dispositivos locais; TCP e UDP têm características diferentes.',updated_at=now() where slug='pcac-2026-ti-redes-ip-protocolos-servicos' and content_status='active';
update public.study_materials set title='Sistemas operacionais, arquivos, permissões e compactação',topic_label='3. Sistemas operacionais e aplicativos',body_md='# Sistemas operacionais, arquivos, permissões e compactação

## 1. Sistemas operacionais
O sistema operacional administra recursos do computador, como processador, memória, armazenamento, dispositivos e execução de programas. Também fornece interface para usuários e aplicativos. Windows e distribuições Linux são exemplos. Aplicativo é um programa que realiza tarefa específica e depende dos serviços do sistema operacional.

## 2. Arquivos, pastas e extensões
Arquivos armazenam dados; diretórios organizam arquivos e outros diretórios. Extensão costuma indicar formato e aplicativo associado, mas não garante que o conteúdo corresponda à extensão. Renomear .txt para .pdf não converte o conteúdo.

No Windows, caminhos normalmente usam letra de unidade e barra invertida. No Linux, a estrutura parte de / e usa barra normal. Linux diferencia maiúsculas e minúsculas em nomes de arquivos, em regra; Windows normalmente não.

## 3. Contas e permissões
Contas e grupos definem identidade e privilégios. No Windows, permissões NTFS incluem leitura, gravação, modificação e controle total. No Linux, permissões tradicionais separam proprietário, grupo e outros, com leitura (r), gravação (w) e execução (x). chmod altera permissões; chown altera proprietário.

**Exemplo:** um usuário pode ter permissão para ler um relatório, mas não para alterá-lo ou excluí-lo. Autenticação identifica o usuário; permissões determinam suas operações.

## 4. Menor privilégio e administração
Conceda somente os acessos necessários à função. Evite trabalhar continuamente como administrador/root. Revise contas, grupos e permissões, especialmente após mudança de função ou desligamento.

## 5. Recuperação e versões
Lixeira, histórico de versões, pontos de restauração e backups têm funções distintas. Histórico de versões pode recuperar versões anteriores de arquivo; ponto de restauração trata configurações do sistema; backup protege dados e deve manter cópia recuperável separada.

## 6. Atualizações e segurança
Atualizações corrigem vulnerabilidades e erros. Instale software de fontes confiáveis, mantenha proteção ativa e evite anexos e executáveis não verificados.

## 7. Compactação
ZIP e formatos equivalentes agrupam e podem comprimir arquivos. Compactação sem perda permite recuperar os dados originais; compressão com perda elimina informação. Arquivo compactado não é automaticamente seguro: pode conter malware e deve ser verificado antes da extração.

## Pegadinhas
Extensão não converte formato; leitura não significa permissão de gravação; lixeira não substitui backup; compactação não é criptografia.',updated_at=now() where slug='pcac-2026-ti-sistemas-operacionais-arquivos-permissoes' and content_status='active';