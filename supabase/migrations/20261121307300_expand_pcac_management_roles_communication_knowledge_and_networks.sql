-- Expansão didática de Administração e TI — PC-AC 2026.
-- Atualiza aulas existentes; não cria registros ou questões duplicados.
update public.study_materials as m
set summary = v.summary, body_md = v.body_md, updated_at = now()
from (values
('pcac-2026-guia-administracao-geral-06-papeis-do-administrador-e-situacoes-gerenciais','Explica os dez papéis de Mintzberg com situações práticas, diferenças entre papéis próximos, níveis gerenciais, habilidades de Katz e questões comentadas.','# Papéis do administrador e situações gerenciais

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Uma coordenadora acompanha relatórios de atendimento, identifica aumento de atrasos e procura informações de outras unidades para entender a causa. Segundo Mintzberg, exerce principalmente o papel de:
>
> A) representante. B) líder. C) monitor. D) negociador. E) alocador de recursos.
>
> **Resolução:** monitor é o papel informacional de buscar e receber informações para compreender o ambiente e a unidade. Gabarito: **C**.

## 1. O trabalho do administrador
Administrar é coordenar pessoas, recursos e processos para alcançar objetivos. O gestor não passa o dia apenas dando ordens: observa o que acontece, conversa, transmite informações, resolve problemas, decide prioridades e acompanha resultados.

Henry Mintzberg estudou o trabalho real dos gestores e organizou dez papéis gerenciais em três grupos: interpessoais, informacionais e decisionais.

## 2. Papéis interpessoais
São ligados à relação do gestor com pessoas e à representação da organização.

- **Representante (figura de proa):** cumpre deveres simbólicos e formais, como participar de uma cerimônia ou assinar ato institucional.
- **Líder:** orienta, motiva, desenvolve e acompanha a equipe.
- **Elemento de ligação:** mantém contatos e relações úteis com outras unidades, órgãos e parceiros.

**Como diferenciar:** representar é cumprir papel institucional; liderar é mobilizar pessoas; fazer ligação é construir e manter contatos.

## 3. Papéis informacionais
O gestor atua como centro de coleta e circulação de informações.

- **Monitor:** procura, recebe e analisa informações sobre o ambiente e o funcionamento da unidade.
- **Disseminador:** transmite informações relevantes aos integrantes da organização.
- **Porta-voz:** comunica informações da unidade a públicos externos.

**Exemplo:** a chefia recebe relatório sobre atrasos (monitor); informa a equipe sobre novo procedimento (disseminador); apresenta os resultados à direção de outro órgão (porta-voz).

## 4. Papéis decisionais
Relacionam-se a escolhas, mudanças e uso de recursos.

- **Empreendedor:** identifica oportunidades e promove melhorias ou mudanças.
- **Solucionador de distúrbios:** enfrenta crises, conflitos e problemas inesperados.
- **Alocador de recursos:** distribui orçamento, pessoal, equipamentos e tempo.
- **Negociador:** representa a unidade em negociações e acordos.

**Exemplo:** implantar fluxo novo é empreender; resolver pane que interrompe atendimento é solucionar distúrbio; redistribuir servidores é alocar recursos; negociar prazo com outro setor é negociar.

## 5. Quadro de memorização
| Categoria | Papel | Palavra-chave |
|---|---|---|
| Interpessoal | Representante | simbolismo |
| Interpessoal | Líder | pessoas |
| Interpessoal | Elemento de ligação | contatos |
| Informacional | Monitor | busca informação |
| Informacional | Disseminador | compartilha internamente |
| Informacional | Porta-voz | comunica externamente |
| Decisional | Empreendedor | mudança |
| Decisional | Solucionador de distúrbios | crise |
| Decisional | Alocador | distribui recursos |
| Decisional | Negociador | acordo |

## 6. Habilidades gerenciais — Katz
Outro tema associado à Administração são as habilidades:
- **Técnica:** domínio de métodos, ferramentas e conhecimentos específicos.
- **Humana:** capacidade de trabalhar com pessoas, comunicar, ouvir e cooperar.
- **Conceitual:** compreender a organização como um todo e perceber relações entre áreas e ambiente.

Em linhas gerais, habilidades técnicas tendem a ser muito exigidas na supervisão operacional; conceituais ganham importância nos níveis superiores; habilidades humanas são relevantes em todos os níveis. Não significa que uma habilidade desapareça em qualquer nível.

## 7. Exemplo de um dia de trabalho
Uma gestora chega e confere indicadores (monitor); recebe um servidor novo e o orienta (líder); conversa com outra unidade para organizar uma demanda (elemento de ligação); informa a equipe sobre mudança de horário (disseminador); participa de reunião externa para apresentar resultados (porta-voz); redistribui equipamentos (alocador); resolve uma falha imprevista (solucionador); negocia prazo de entrega (negociador); propõe um novo fluxo (empreendedor); representa formalmente o setor em solenidade (representante).

O mesmo gestor pode desempenhar vários papéis no mesmo dia.

## 8. Pegadinhas de prova
- Monitor coleta; disseminador compartilha dentro; porta-voz comunica fora.
- Representante não é sinônimo de líder.
- Empreendedor promove mudança; solucionador enfrenta distúrbio inesperado.
- Alocador distribui recursos; negociador conduz acordos.
- Os papéis são comportamentos gerenciais, não cargos separados.
- Habilidade humana é importante em todos os níveis.

**Macete:** interpessoal = pessoas; informacional = informação; decisional = escolhas e recursos.'),
('pcac-2026-guia-administracao-geral-08-estrutura-formal-informal-e-comunicacao','Aprofunda estruturas formal e informal, hierarquia, amplitude de controle, centralização, departamentalização, redes de comunicação, barreiras e fluxo de informação.','# Estrutura formal, informal e comunicação

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Uma orientação oficial é enviada pela chefia aos servidores para explicar novos procedimentos e prazos. O fluxo de comunicação é:
>
> A) ascendente. B) horizontal. C) diagonal. D) descendente. E) externo.
>
> **Resolução:** a mensagem parte da chefia para a equipe, portanto é descendente. Gabarito: **D**.

## 1. O que é estrutura organizacional?
É a maneira como atividades, autoridade, responsabilidades e comunicação são distribuídas e coordenadas. A estrutura define quem responde por quê, como as unidades se relacionam e por quais caminhos as decisões circulam.

O organograma representa relações formais, mas não mostra necessariamente todas as relações de confiança, influência e troca de informação existentes no cotidiano.

## 2. Estrutura formal e informal
**Formal:** criada oficialmente, com cargos, unidades, competências, hierarquia e procedimentos. Exemplo: organograma de uma secretaria.

**Informal:** surge espontaneamente das relações sociais, afinidades, confiança e cooperação. Exemplo: servidores de setores diferentes que se ajudam porque já trabalharam juntos.

A estrutura informal pode facilitar a circulação de conhecimento e resolver problemas rapidamente. Também pode gerar boatos, exclusões e resistência a mudanças. Não substitui a autoridade nem os canais oficiais.

## 3. Elementos da estrutura
- **Hierarquia:** níveis de autoridade e subordinação.
- **Amplitude de controle:** quantidade de pessoas que se reportam diretamente a um gestor.
- **Centralização:** decisões concentradas nos níveis superiores.
- **Descentralização:** autoridade decisória distribuída a níveis ou unidades.
- **Formalização:** grau de padronização por regras e procedimentos.
- **Especialização:** divisão do trabalho em atividades específicas.

Amplitude muito ampla pode dificultar acompanhamento; amplitude muito estreita pode criar excesso de níveis e custos. A adequação depende da complexidade das tarefas, autonomia e capacidade da equipe.

## 4. Departamentalização
É o agrupamento de atividades em unidades. Pode ocorrer:
- por função: pessoas, finanças, compras, TI;
- por território: unidades regionais;
- por processo: etapas de atendimento;
- por produto ou serviço;
- por público ou clientela.

Cada critério tem vantagens e limites. Agrupar por função favorece especialização, mas pode criar barreiras entre departamentos. Agrupar por território aproxima a gestão do público local, mas pode duplicar recursos.

## 5. Centralização e descentralização
Na centralização, decisões ficam concentradas em níveis superiores, favorecendo uniformidade e controle, mas podendo aumentar demora e sobrecarga.

Na descentralização, decisões são distribuídas, o que pode aproximar a resposta do problema e desenvolver autonomia, mas exige regras, capacitação e coordenação.

Descentralizar não significa ausência de controle, nem elimina a responsabilidade institucional.

## 6. Fluxos de comunicação
- **Descendente:** de níveis superiores para inferiores; ordens, metas, orientações.
- **Ascendente:** de níveis inferiores para superiores; relatórios, alertas, sugestões.
- **Horizontal:** entre pessoas ou setores de nível semelhante; coordenação e troca.
- **Diagonal:** cruza níveis hierárquicos e áreas diferentes.

A direção depende de quem envia e recebe, não do assunto. Um relatório enviado por servidor à chefia é ascendente; uma instrução da chefia é descendente.

## 7. Processo de comunicação e barreiras
O processo envolve emissor, codificação, mensagem, canal, receptor, decodificação e feedback. Ruído pode surgir por:
- linguagem ambígua ou excessivamente técnica;
- excesso de mensagens;
- falha de sistema ou canal;
- diferença cultural ou de interpretação;
- medo de comunicar problemas;
- ausência de confirmação de entendimento.

Feedback é o retorno que ajuda a verificar se a mensagem foi compreendida. Enviar uma mensagem não garante que ela foi entendida.

## 8. Redes de comunicação
Redes centralizadas concentram circulação em uma pessoa ou ponto; podem agilizar decisões simples, mas sobrecarregar o centro. Redes descentralizadas permitem comunicação entre vários integrantes, favorecendo participação e solução coletiva, mas podem exigir maior coordenação.

A escolha depende de urgência, complexidade, segurança e necessidade de participação.

## 9. Exemplo aplicado
A direção publica procedimento oficial (descendente). Uma equipe relata que o prazo é inviável (ascendente). Dois departamentos de mesmo nível combinam a transferência de documentos (horizontal). Um servidor de uma unidade regional conversa com gestor de outra área em nível hierárquico diferente, usando canal institucional (diagonal).

## 10. Pegadinhas
- Organograma representa a estrutura formal, não todas as relações informais.
- Comunicação horizontal pode ser oficial.
- Descentralização não significa ausência de hierarquia ou controle.
- Amplitude de controle é número de subordinados diretos.
- Formalização é intensidade de regras e procedimentos.
- O sentido do fluxo depende da posição relativa de emissor e receptor.

**Macete:** chefia → equipe = descendente; equipe → chefia = ascendente; mesmo nível = horizontal; níveis/áreas cruzados = diagonal.'),
('pcac-2026-guia-administracao-geral-13-gestao-da-informacao-e-do-conhecimento','Explica dado, informação e conhecimento; conhecimento tácito e explícito; ciclo de gestão, modelo SECI, memória institucional, qualidade, compartilhamento e proteção.','# Gestão da informação e do conhecimento

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Um sistema registra apenas “12”. Após associar esse número a processos pendentes há mais de 30 dias, a unidade interpreta as causas e reorganiza o trabalho. A sequência representa:
>
> A) conhecimento, dado e informação. B) dado, informação e aplicação do conhecimento. C) informação, conhecimento e dado. D) dado, conhecimento e ruído. E) arquivo, documento e protocolo.
>
> **Resolução:** “12” isolado é dado; “12 processos pendentes há mais de 30 dias” é informação contextualizada; interpretar causas e agir é aplicação do conhecimento. Gabarito: **B**.

## 1. Dado, informação e conhecimento
- **Dado:** registro bruto de fato ou atributo, ainda sem contexto suficiente.
- **Informação:** dado organizado e contextualizado, com significado para uma finalidade.
- **Conhecimento:** capacidade de interpretar informações, relacioná-las à experiência e aplicá-las na decisão ou ação.

Exemplo: “37” é dado; “37 atendimentos foram concluídos hoje” é informação; perceber que a demanda aumenta em determinado horário e ajustar escala é aplicação do conhecimento.

## 2. Gestão da informação
Abrange identificar necessidades, coletar, classificar, armazenar, proteger, recuperar, compartilhar e descartar informações conforme regras de retenção e acesso.

A informação útil precisa ser:
- precisa;
- completa o suficiente;
- atual;
- consistente;
- relevante;
- disponível a quem tem autorização.

Informação desatualizada pode levar a decisão errada, mesmo que esteja escrita corretamente.

## 3. Gestão do conhecimento
Busca criar, registrar, compartilhar e aplicar conhecimento organizacional. Inclui capacitação, comunidades de prática, manuais, lições aprendidas, mentoria, padronização e transferência de conhecimento quando há mudança de equipe.

Não é apenas instalar software ou criar um repositório. É necessário estimular pessoas a compartilhar experiências e transformar aprendizado em prática.

## 4. Conhecimento tácito e explícito
**Tácito:** pessoal, contextual e difícil de formalizar, desenvolvido pela experiência. Exemplo: a habilidade de um servidor experiente para perceber que determinado tipo de inconsistência costuma indicar falha no preenchimento.

**Explícito:** registrado em documentos, bases, procedimentos, vídeos, relatórios e manuais. Exemplo: checklist de conferência.

A organização reduz dependência de indivíduos quando registra parte do conhecimento tácito em procedimentos e promove troca de experiência, sem presumir que tudo pode ser totalmente escrito.

## 5. Modelo SECI
O modelo de Nonaka e Takeuchi descreve quatro modos de conversão do conhecimento:
1. **Socialização:** tácito para tácito, pela convivência e experiência compartilhada.
2. **Externalização:** tácito para explícito, ao explicar e registrar uma prática.
3. **Combinação:** explícito para explícito, reunindo documentos e dados em novo conjunto organizado.
4. **Internalização:** explícito para tácito, quando alguém aprende e incorpora a prática.

Exemplo: acompanhar colega experiente (socialização); registrar o passo a passo (externalização); reunir manuais e indicadores (combinação); executar até dominar a tarefa (internalização).

## 6. Memória institucional
É o conjunto de registros, experiências e conhecimentos que permite compreender decisões, procedimentos e evolução da organização. Documentos bem classificados e preservados evitam que a instituição perca histórico quando pessoas saem ou mudam de função.

## 7. Tecnologia e governança
Sistemas facilitam armazenamento e busca, mas precisam de:
- responsáveis pela qualidade;
- regras de acesso;
- padronização;
- metadados;
- atualização;
- cópias de segurança e preservação;
- proteção de dados;
- controle de versões.

Compartilhar informação deve respeitar finalidade, necessidade, autorização e proteção de dados pessoais.

## 8. Exemplo aplicado
Uma unidade percebe que novos servidores repetem erros já corrigidos no passado. A equipe entrevista servidores experientes, registra as causas frequentes, cria checklist, disponibiliza treinamento e atualiza o procedimento. A experiência individual passa a apoiar o trabalho coletivo.

## 9. Pegadinhas
- Dado não é sinônimo de informação.
- Conhecimento envolve interpretação e aplicação.
- Tácito é difícil de formalizar; explícito está registrado.
- Gestão do conhecimento não se limita à tecnologia.
- No SECI, externalização transforma tácito em explícito.
- Informação precisa ser compartilhada com autorização, não indiscriminadamente.

**Macete:** dado = registro; informação = dado com contexto; conhecimento = interpretação aplicada.'),
('pcac-2026-ti-metadados-propriedades-arquivos-rastreabilidade','Aprofunda metadados descritivos, estruturais, administrativos, técnicos e de preservação; datas de arquivos, hash, versões, cadeia de custódia e privacidade.','# Metadados, propriedades e rastreabilidade de arquivos digitais

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> A propriedade “data de modificação” de um arquivo digital comprova, sozinha, a data em que o conteúdo foi originalmente produzido?
>
> A) Sim, sempre. B) Não; cópia, sincronização, exportação e relógio do sistema podem alterar essa data. C) Sim, se for PDF. D) Não, pois arquivos digitais não possuem datas. E) Sim, se o nome do arquivo contiver uma data.
>
> **Resolução:** datas de propriedades têm significados diferentes e podem mudar durante operações técnicas. Gabarito: **B**.

## 1. O que são metadados?
São dados que descrevem, contextualizam, estruturam ou permitem gerenciar outros dados. Em um documento, podem informar título, autor, origem, data, formato, versão, permissões, relações com outros documentos e histórico de preservação.

Sem metadados, um arquivo pode continuar armazenado, mas ficar difícil de localizar, compreender, autenticar ou preservar.

## 2. Categorias de metadados
- **Descritivos:** título, assunto, autor e palavras-chave; ajudam a localizar.
- **Estruturais:** mostram relação entre partes, páginas, anexos e componentes.
- **Administrativos:** tratam de direitos, acesso, retenção e gestão.
- **Técnicos:** formato, tamanho, resolução, software e parâmetros.
- **De preservação:** registram eventos, migrações, verificações e histórico de integridade.

Um mesmo sistema pode reunir várias categorias.

## 3. Datas e propriedades de arquivos
É importante distinguir:
- data de criação no sistema de arquivos;
- data de modificação;
- data de último acesso;
- data de captura ou produção registrada no conteúdo;
- data de recebimento no sistema institucional.

Uma cópia pode receber nova data de criação; sincronização pode atualizar propriedades; exportação pode modificar metadados; relógio ou fuso incorretos podem gerar divergências.

Por isso, a propriedade exibida pelo sistema não comprova sozinha a data histórica de produção.

## 4. Origem, versão e histórico
Para rastreabilidade, registre:
- sistema ou fonte de origem;
- identificador do documento;
- responsável pela operação;
- data e hora com fuso, quando relevante;
- operação realizada;
- versão anterior e resultante;
- ferramenta ou procedimento usado;
- local de armazenamento e permissões.

Preserve o original conforme a política aplicável e documente transformações.

## 5. Hash e integridade
Hash é resultado de uma função matemática aplicada ao conteúdo. Se o arquivo mudar, o hash calculado tende a mudar. Comparar hashes ajuda a detectar alterações.

**Limite importante:** hash não prova autoria, data de produção, veracidade ou legalidade. Para ter valor de auditoria, o hash precisa estar associado a registro confiável, momento de cálculo, responsável e controle de acesso.

## 6. Cadeia de custódia digital
É o registro contínuo de quem teve contato com o arquivo, quais operações foram realizadas, quando ocorreram e como o documento foi mantido. O objetivo é permitir rastrear o percurso e avaliar se houve alteração ou quebra de controle.

Não basta dizer “o arquivo estava na pasta”. É preciso documentar eventos relevantes e restringir operações não autorizadas.

## 7. Privacidade nos metadados
Metadados podem revelar localização GPS, autor, dispositivo, histórico de edição, nomes de usuários ou informações internas. Antes de compartilhar arquivo, verifique propriedades e remova dados pessoais ou sensíveis quando houver fundamento e autorização para isso.

A remoção também deve ser registrada quando afetar a versão oficial ou a cadeia de custódia.

## 8. Exemplo prático
Uma fotografia apresenta data de captura e coordenadas. Esses metadados ajudam a contextualizar o registro, mas podem estar ausentes, alterados ou incorretos. A equipe compara com registros de recebimento, histórico do sistema e outras evidências. Não conclui autoria ou localização apenas pelo campo EXIF.

## 9. Pegadinhas
- Metadados são mais amplos que palavras-chave.
- Data de modificação não é necessariamente data de produção.
- Hash detecta alteração, mas não identifica autor.
- Cópia e sincronização podem mudar propriedades.
- Metadados também podem conter dados pessoais.
- Rastreabilidade exige histórico e controle, não apenas nome de arquivo.

**Macete:** metadados descrevem; hash ajuda a verificar integridade; trilha de auditoria registra o que aconteceu; nenhum desses elementos, isoladamente, prova tudo.'),
('pcac-2026-ti-redes-ip-protocolos-servicos','Aprofunda LAN/WAN/WLAN, IPv4/IPv6, máscara e gateway, switch/roteador, DNS/DHCP, TCP/UDP, HTTP(S), portas, Wi-Fi e segurança de rede.','# Redes de computadores: LAN, WAN, IP, protocolos e serviços

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Ao digitar o endereço de um site, o computador precisa descobrir o endereço IP associado ao nome de domínio. Qual serviço realiza essa resolução?
>
> A) DHCP. B) DNS. C) SMTP. D) FTP. E) IMAP.
>
> **Resolução:** DNS traduz/responde consultas sobre nomes de domínio, como exemplo.com, para registros como endereços IP. Gabarito: **B**.

## 1. O que é uma rede?
É um conjunto de dispositivos conectados para trocar dados e compartilhar recursos. Uma rede pode conectar computadores, impressoras, servidores, celulares e sistemas.

- **LAN:** rede local, como a rede de um prédio.
- **WLAN:** rede local sem fio, normalmente Wi-Fi.
- **WAN:** rede de longa distância, interligando redes geograficamente afastadas.
- **Internet:** rede mundial de redes.
- **Intranet:** ambiente privado de uma organização.

## 2. Endereço IP
IP identifica logicamente uma interface na rede e permite encaminhar pacotes.

**IPv4:** usa 32 bits, normalmente escrito em quatro números decimais separados por pontos, por exemplo, 192.168.1.10.

**IPv6:** usa 128 bits e representação hexadecimal, por exemplo, 2001:db8::1.

A máscara ou prefixo indica qual parte do endereço corresponde à rede. O gateway padrão é o equipamento para o qual o dispositivo encaminha tráfego destinado a outras redes.

Não confunda endereço IP com endereço físico MAC: IP é lógico e usado no encaminhamento entre redes; MAC identifica interface no contexto da camada de enlace.

## 3. Equipamentos de rede
- **Switch:** conecta dispositivos dentro de uma rede local e encaminha quadros com base em endereços MAC.
- **Roteador:** encaminha pacotes entre redes diferentes.
- **Ponto de acesso:** permite conexão sem fio à rede.
- **Firewall:** aplica regras para permitir ou bloquear tráfego.
- **Modem:** adapta sinais para o meio de comunicação usado pelo provedor, conforme a tecnologia.

Um roteador doméstico pode integrar várias funções, mas os conceitos não são sinônimos.

## 4. DNS e DHCP
**DNS (Domain Name System):** resolve nomes, como exemplo.com, em registros associados, incluindo endereços IP. Não transporta o conteúdo da página.

**DHCP (Dynamic Host Configuration Protocol):** distribui automaticamente parâmetros de rede, como endereço IP, máscara, gateway e DNS.

**Macete:** DNS encontra o endereço associado ao nome; DHCP entrega configuração ao dispositivo.

## 5. TCP e UDP
**TCP:** orientado à conexão, oferece mecanismos de confiabilidade, confirmação, retransmissão e ordenação dos dados. É adequado quando a entrega correta e ordenada é importante.

**UDP:** envia datagramas sem estabelecer conexão da mesma forma e não garante entrega ou ordem. Pode ser útil quando baixa latência e simplicidade são importantes, dependendo da aplicação.

UDP não significa necessariamente inseguro ou sempre mais rápido; o comportamento depende da aplicação e da rede.

## 6. Protocolos e portas usuais
| Serviço/protocolo | Porta comum | Função |
|---|---:|---|
| HTTP | 80/TCP | acesso web sem TLS |
| HTTPS | 443/TCP | acesso web protegido por TLS |
| DNS | 53/UDP e TCP | resolução de nomes |
| DHCP | 67/68 UDP | configuração automática |
| SSH | 22/TCP | acesso remoto seguro |
| SMTP | 25, 587 ou 465 | envio de e-mail, conforme uso |
| IMAP | 143 ou 993 | acesso/sincronização de e-mail |
| POP3 | 110 ou 995 | recebimento de e-mail |

Portas são valores convencionais; administradores podem configurar serviços em portas diferentes.

## 7. Como uma página chega ao navegador
1. O usuário digita um domínio.
2. O dispositivo consulta DNS se não tiver resposta em cache.
3. Obtém um endereço IP.
4. Encaminha pacotes pela rede e pelo gateway, se necessário.
5. Estabelece comunicação com o servidor usando o protocolo apropriado.
6. Recebe dados e apresenta o conteúdo.

DNS não é o navegador; IP não é o nome do site; DHCP não baixa a página.

## 8. Segurança de rede
- use criptografia moderna no Wi-Fi;
- troque senhas padrão;
- mantenha roteadores e sistemas atualizados;
- limite portas e serviços expostos;
- use firewall e segmentação quando apropriado;
- controle quem pode acessar sistemas;
- evite redes públicas sem proteção para operações sensíveis.

VPN cria um túnel protegido sobre uma rede não confiável, conforme a configuração. Não torna automaticamente seguro um dispositivo comprometido.

## 9. Exemplo resolvido
Um servidor recebe IP automaticamente ao entrar na rede: DHCP. Ao acessar portal.exemplo, consulta DNS para obter endereço IP. O roteador encaminha tráfego para outra rede. A conexão web usa HTTPS. Cada serviço cumpre função diferente.

## 10. Pegadinhas
- DNS resolve nomes; DHCP distribui parâmetros de rede.
- Switch conecta dispositivos em LAN; roteador interliga redes.
- IPv4 tem 32 bits; IPv6 tem 128 bits.
- TCP oferece confiabilidade e ordenação; UDP não as garante.
- HTTPS protege a comunicação com TLS, mas não prova que o site é honesto.
- VPN não substitui antivírus, atualizações ou controle de acesso.

**Macete:** DNS = nome; DHCP = configuração; IP = endereço lógico; roteador = caminho entre redes; switch = conexão local.')
) as v(slug, summary, body_md)
where m.slug = v.slug;