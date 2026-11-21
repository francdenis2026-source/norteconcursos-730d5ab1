-- Ampliação didática de TI, Informática e Arquivologia — PC-AC 2026.
update public.study_materials as m
set summary = v.summary, body_md = v.body_md, updated_at = now()
from (values
('pcac-2026-guia-arquivologia-13-acondicionamento-e-conservacao-preventiva','Aprofunda conservação preventiva, agentes de deterioração, acondicionamento, armazenamento, manuseio, controle biológico e plano de emergência.','# Acondicionamento e conservação preventiva

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Qual medida é compatível com a conservação preventiva de documentos em papel?
>
> A) armazenar caixas diretamente no chão. B) expor documentos à luz solar. C) controlar umidade, temperatura, limpeza, pragas e acondicionamento adequado. D) usar fita adesiva comum em documentos históricos. E) comprimir excessivamente documentos.
>
> **Resolução:** conservação preventiva reduz riscos antes que ocorram danos, controlando ambiente, manuseio e armazenamento. Gabarito: **C**.

## 1. Conservação preventiva e restauração
Conservação preventiva reúne medidas para reduzir riscos e prolongar a vida útil dos documentos, atuando sobre ambiente, manuseio, armazenamento, segurança e acondicionamento.

Restauração envolve intervenção direta em documento já danificado. A prevenção procura evitar que o dano aconteça ou se agrave.

## 2. Agentes de deterioração
Entre os riscos estão temperatura e umidade inadequadas ou instáveis, luz excessiva, poeira, poluentes, fungos, insetos, roedores, água, fogo, manuseio incorreto e acondicionamento inadequado.

O controle deve ser contínuo, com inspeção e registro. Mudanças bruscas de temperatura e umidade também podem causar danos.

## 3. Acondicionamento
Consiste em colocar documentos em embalagens e invólucros apropriados, estáveis e compatíveis com o material. Caixas e pastas devem ter dimensões adequadas, sem comprimir ou deixar documentos soltos em excesso.

Materiais de baixa qualidade, ácidos ou instáveis podem acelerar a deterioração. Documentos especiais, como fotografias, mapas e mídias, podem exigir materiais e condições próprios.

## 4. Armazenamento e mobiliário
Estantes devem permitir circulação, inspeção e acesso seguro. Documentos não devem ficar diretamente no chão, encostados em paredes úmidas ou expostos à luz solar.

Áreas de guarda precisam de limpeza, monitoramento, segurança contra água e fogo e plano para emergências.

## 5. Manuseio
Mãos limpas e secas, apoio adequado e retirada cuidadosa reduzem danos. Não force lombadas, dobre folhas, use clipes enferrujados, fitas adesivas comuns ou escreva sobre originais.

Para documentos frágeis, fotografias e mídias, siga procedimento específico e orientação técnica.

## 6. Higienização e controle biológico
A limpeza deve evitar espalhar poeira ou agentes biológicos. Documentos com suspeita de fungos ou infestação devem ser isolados e avaliados por equipe capacitada.

Não faça intervenção improvisada que exponha pessoas ou acervos a produtos químicos inadequados. A prioridade é proteger pessoas e impedir a propagação do agente.

## 7. Plano de prevenção e emergência
Inclui inspeção periódica, registro de ocorrências, monitoramento ambiental, controle integrado de pragas, treinamento, segurança contra incêndio e água e plano de resposta a desastres.

O plano deve indicar responsáveis, rotas de comunicação, prioridades de salvamento, locais seguros e procedimentos de recuperação. Não espere ocorrer uma inundação para definir como agir.

## 8. Exemplo prático
Uma caixa de documentos armazenada no chão, junto a parede úmida, corre risco de absorver água e desenvolver fungos. A medida preventiva é elevar o material, corrigir a fonte de umidade, acondicionar adequadamente e monitorar a área, não simplesmente aplicar produto químico sobre os documentos.

## 9. Pegadinhas
- Conservação preventiva reduz riscos; restauração trata danos existentes.
- Acondicionamento inadequado também deteriora.
- Fungos exigem isolamento e avaliação técnica, não limpeza improvisada.
- Luz solar direta não é método de prevenção de umidade.
- Caixas não devem comprimir o acervo.
- O plano de emergência deve existir antes do desastre.

**Macete:** ambiente controlado + embalagem adequada + manuseio correto + monitoramento = conservação preventiva.'),
('pcac-2026-informatica-nuvem-colaboracao-permissoes','Aprofunda nuvem, SaaS, PaaS, IaaS, armazenamento, compartilhamento, menor privilégio, coautoria, versões, propriedade, revogação e riscos de links públicos.','# Nuvem e colaboração: Microsoft 365, Google Workspace, Teams, Meet e Zoom

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Um servidor precisa apenas consultar um documento compartilhado. Qual permissão deve receber?
>
> A) proprietário. B) editor. C) administrador. D) visualizador/leitor. E) acesso público irrestrito.
>
> **Resolução:** deve receber apenas visualização/leitura, conforme o princípio do menor privilégio. Gabarito: **D**.

## 1. Computação em nuvem
É o fornecimento de recursos computacionais por rede, como armazenamento, aplicativos, processamento e bancos de dados. O usuário acessa serviços sem necessariamente administrar a infraestrutura física.

Modelos de serviço:
- **SaaS:** aplicativo pronto, como correio ou editor online.
- **PaaS:** ambiente para desenvolver e executar aplicações.
- **IaaS:** recursos básicos de infraestrutura, como máquinas virtuais, redes e armazenamento.

## 2. Modelos de implantação
- Nuvem pública: infraestrutura oferecida a vários clientes pelo provedor.
- Nuvem privada: ambiente destinado a uma organização.
- Nuvem híbrida: combinação de ambientes distintos, com integração entre eles.

A expressão “nuvem pública” não significa que os arquivos do cliente estejam automaticamente disponíveis ao público. O acesso depende de configuração e permissão.

## 3. Ferramentas colaborativas
Microsoft 365 e Google Workspace integram documentos, planilhas, apresentações, armazenamento e comunicação. Teams, Meet e Zoom oferecem reuniões e colaboração remota, com recursos que variam por plano e configuração.

Coautoria permite que várias pessoas trabalhem no mesmo arquivo, conforme permissões e recursos disponíveis.

## 4. Compartilhamento
Arquivos podem ser compartilhados:
- com pessoas específicas;
- com grupos institucionais;
- por link restrito;
- por link amplo ou público, quando a política permite.

Links amplos podem ser encaminhados e alcançar pessoas fora do grupo original. Prefira o menor escopo de acesso necessário e confira destinatários.

## 5. Permissões
Permissões comuns incluem visualizar, comentar, editar e administrar/compartilhar.

Conceder edição quando basta leitura viola o princípio do menor privilégio. Acesso deve ser revisto, transferido quando necessário e revogado quando deixar de ser justificável.

## 6. Coautoria e histórico de versões
Coautoria permite edição simultânea. Histórico de versões registra estados anteriores e pode permitir restauração.

Isso não substitui necessariamente backup independente: uma exclusão ou corrupção pode ser sincronizada, e o histórico pode ter limites de retenção.

## 7. Transferência e revogação
Quando um servidor muda de função, a permissão deve ser revista. Se a necessidade termina, o acesso deve ser revogado. Transferir a propriedade de arquivo exige conferir se o novo responsável tem autorização e se links antigos continuam válidos.

## 8. Segurança
- use autenticação multifator quando disponível;
- não compartilhe senhas;
- restrinja links e permissões;
- verifique destinatários antes de compartilhar;
- mantenha dispositivos atualizados;
- evite sincronizar dados institucionais em contas pessoais sem autorização;
- registre acessos e incidentes conforme a política.

## 9. Exemplo prático
Uma planilha de diligências compartilhada por link público pode ser acessada por quem receber o endereço. O ideal é compartilhar apenas com integrantes autorizados, conceder leitura a quem só consulta e retirar acesso ao fim da atividade.

## 10. Pegadinhas
- SaaS entrega aplicativo pronto; PaaS oferece plataforma; IaaS oferece infraestrutura.
- Visualizar, comentar e editar são permissões diferentes.
- Histórico de versões não é sinônimo de backup.
- Link público pode ser encaminhado.
- Nuvem pública não significa dados publicamente acessíveis.
- Revogar acesso faz parte do ciclo de vida da informação.

**Macete:** nuvem = serviço pela rede; menor privilégio = acesso mínimo; versão = histórico; backup = recuperação independente.'),
('pcac-2026-ti-redes-ip-dns-dhcp-tcp-udp-servicos','Aprofunda LAN/WAN/WLAN, IPv4/IPv6, máscara e gateway, switch/roteador, DNS/DHCP, TCP/UDP, HTTP(S), portas, Wi-Fi e segurança de rede.','# Redes, endereçamento IP, DNS, DHCP e protocolos de comunicação

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Ao digitar o endereço de um site, o computador precisa descobrir o endereço IP associado ao nome de domínio. Qual serviço realiza essa resolução?
>
> A) DHCP. B) DNS. C) SMTP. D) FTP. E) IMAP.
>
> **Resolução:** DNS traduz/responde consultas sobre nomes de domínio para registros associados, incluindo endereços IP. Gabarito: **B**.

## 1. O que é uma rede?
É um conjunto de dispositivos conectados para trocar dados e compartilhar recursos. Uma rede pode conectar computadores, impressoras, servidores, celulares e sistemas.

- LAN: rede local, como a rede de um prédio.
- WLAN: rede local sem fio, normalmente Wi-Fi.
- WAN: rede de longa distância, interligando redes geograficamente afastadas.
- Internet: rede mundial de redes.
- Intranet: ambiente privado de uma organização.

## 2. Endereço IP
IP identifica logicamente uma interface na rede e permite encaminhar pacotes.

**IPv4:** usa 32 bits, normalmente escrito em quatro números decimais separados por pontos, por exemplo, 192.168.1.10.

**IPv6:** usa 128 bits e representação hexadecimal, por exemplo, 2001:db8::1.

A máscara ou prefixo indica qual parte do endereço corresponde à rede. O gateway padrão é o equipamento para o qual o dispositivo encaminha tráfego destinado a outras redes.

Não confunda endereço IP com endereço físico MAC: IP é lógico e usado no encaminhamento entre redes; MAC identifica interface no contexto da camada de enlace.

## 3. Endereços privados e públicos
Endereço público é roteável na Internet. Endereços privados são utilizados em redes internas e normalmente precisam de tradução de endereços (NAT) para comunicação externa.

Faixas privadas IPv4 mais conhecidas:
- 10.0.0.0/8;
- 172.16.0.0/12;
- 192.168.0.0/16.

Endereço privado não é, por si só, garantia de segurança. Firewall, segmentação e controle de acesso continuam necessários.

## 4. Equipamentos de rede
- Switch: conecta dispositivos dentro de uma rede local e encaminha quadros com base em endereços MAC.
- Roteador: encaminha pacotes entre redes diferentes.
- Ponto de acesso: permite conexão sem fio à rede.
- Firewall: aplica regras para permitir ou bloquear tráfego.
- Modem: adapta sinais para o meio de comunicação usado pelo provedor, conforme a tecnologia.

Um roteador doméstico pode integrar várias funções, mas os conceitos não são sinônimos.

## 5. DNS e DHCP
**DNS (Domain Name System):** resolve nomes, como exemplo.com, em registros associados, incluindo endereços IP. Não transporta o conteúdo da página.

**DHCP (Dynamic Host Configuration Protocol):** distribui automaticamente parâmetros de rede, como endereço IP, máscara, gateway e DNS.

**Macete:** DNS encontra o endereço associado ao nome; DHCP entrega configuração ao dispositivo.

## 6. TCP e UDP
**TCP:** orientado à conexão, oferece mecanismos de confiabilidade, confirmação, retransmissão e ordenação dos dados. É adequado quando a entrega correta e ordenada é importante.

**UDP:** envia datagramas sem estabelecer conexão da mesma forma e não garante entrega ou ordem. Pode ser útil quando baixa latência e simplicidade são importantes, dependendo da aplicação.

UDP não significa necessariamente inseguro ou sempre mais rápido; o comportamento depende da aplicação e da rede.

## 7. Protocolos e portas usuais
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

## 8. Como uma página chega ao navegador
1. O usuário digita um domínio.
2. O dispositivo consulta DNS se não tiver resposta em cache.
3. Obtém um endereço IP.
4. Encaminha pacotes pela rede e pelo gateway, se necessário.
5. Estabelece comunicação com o servidor usando o protocolo apropriado.
6. Recebe dados e apresenta o conteúdo.

DNS não é o navegador; IP não é o nome do site; DHCP não baixa a página.

## 9. Segurança de rede
Use criptografia moderna no Wi-Fi, troque senhas padrão, mantenha roteadores e sistemas atualizados, limite portas expostas, use firewall e segmentação quando apropriado e controle quem pode acessar sistemas.

VPN cria um túnel protegido sobre uma rede não confiável, conforme a configuração. Não torna automaticamente seguro um dispositivo comprometido.

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