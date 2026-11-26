#!/usr/bin/env python3
"""TI e Segurança da Informação: teoria didática e 44 questões novas. python3 scripts/content-ti.py"""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from qlib import Q, teoria, salvar

teoria("ti_cripto",
 """<p><b>Em uma frase:</b> criptografia embaralha informações para que só quem tem a chave consiga lê-las; hash gera uma 'impressão digital' do dado, usada para provar que ele não foi alterado.</p>
<div class="exemplo"><b>Analogia:</b> criptografar é trancar a carta num cofre; o hash é o lacre numerado: se o lacre muda, alguém mexeu.</div>
<h3>Tipos de criptografia</h3>
<ul><li><b>Simétrica:</b> a <b>mesma chave</b> cifra e decifra. Rápida (ex.: AES). O desafio é compartilhar a chave com segurança.</li><li><b>Assimétrica:</b> <b>par de chaves</b>: pública (cifra) e privada (decifra). Resolve a troca de chaves (ex.: RSA).</li></ul>
<h3>Hash</h3>
<ul><li>Função de <b>mão única</b>: gera um resumo de tamanho fixo (ex.: SHA-256). Não se 'decifra' o hash.</li><li>Alterar <b>um bit</b> do arquivo muda totalmente o hash. Por isso o hash comprova <b>integridade</b>.</li><li>Em perícia digital, calcula-se o hash da cópia e do original: se forem iguais, a cópia é fiel.</li></ul>
<h3>Assinatura e certificado digital</h3>
<ul><li><b>Assinatura digital:</b> hash do documento cifrado com a chave <b>privada</b> do autor. Garante <b>autenticidade, integridade e não repúdio</b>.</li><li><b>Certificado digital:</b> documento eletrônico emitido por uma Autoridade Certificadora que liga uma chave pública a uma identidade (ICP-Brasil).</li></ul>
<h3>Blockchain e criptomoedas</h3>
<ul><li><b>Blockchain:</b> blocos de registros encadeados por hash, replicados em vários computadores; alterar um bloco quebra a cadeia.</li><li><b>Criptomoedas</b> (Bitcoin) usam blockchain, sem banco central; as transações são públicas, e a identidade, pseudônima.</li></ul>
<h3>Armadilhas</h3>
<ul><li>Hash não é criptografia: não se reverte.</li><li>A assinatura digital usa a chave <b>privada</b> do emissor; a verificação, a <b>pública</b>.</li></ul>
<h3>Teste rápido</h3><p>Qual técnica garante que um arquivo não foi alterado? <b>Resposta:</b> hash (e assinatura digital).</p>""",
 "Um perito copia o HD de um suspeito e precisa provar que a cópia é idêntica. Passo 1: calcula o <b>hash SHA-256</b> do HD original. Passo 2: calcula o hash da cópia. Passo 3: compara. Passo 4: se os dois hashes são <b>iguais</b>, a cópia é fiel (integridade comprovada); se diferem, algo foi alterado.",
 "(1) Quer sigilo? Criptografia. (2) Quer provar que não mudou? Hash. (3) Quer provar quem assinou? Assinatura digital. (4) Mesma chave nos dois lados: simétrica; par de chaves: assimétrica.",
 "Hash prova integridade; assinatura prova autoria; chave pública cifra, privada assina e decifra.")
teoria("ti_seg",
 """<p><b>Em uma frase:</b> segurança da informação protege a informação em três pilares: <b>confidencialidade, integridade e disponibilidade</b> (CID).</p>
<div class="exemplo"><b>Analogia:</b> um prontuário: só quem deve pode ler (confidencialidade), ninguém pode alterar escondido (integridade) e ele precisa estar à mão quando o médico precisa (disponibilidade).</div>
<h3>Pilares e extensões</h3>
<ul><li><b>Confidencialidade:</b> só acessa quem tem permissão.</li><li><b>Integridade:</b> a informação não é alterada indevidamente.</li><li><b>Disponibilidade:</b> a informação está acessível quando necessária.</li><li><b>Autenticidade:</b> a origem é verdadeira. <b>Não repúdio:</b> o autor não pode negar a autoria.</li></ul>
<h3>Autenticação</h3>
<ul><li><b>Algo que você sabe</b> (senha), <b>algo que você tem</b> (token, celular), <b>algo que você é</b> (biometria). <b>Autenticação multifator</b> combina categorias diferentes.</li><li><b>Autenticação</b> prova quem é; <b>autorização</b> define o que pode fazer.</li></ul>
<h3>Ameaças e controles</h3>
<ul><li>Ataque que derruba o serviço: ameaça à <b>disponibilidade</b> (DDoS).</li><li>Alteração indevida de dados: ameaça à <b>integridade</b>.</li><li>Vazamento: ameaça à <b>confidencialidade</b>.</li><li>Controles: backup, firewall, antivírus, criptografia, controle de acesso, política de segurança, treinamento.</li></ul>
<h3>Teste rápido</h3><p>Um ataque DDoS afeta principalmente qual pilar? <b>Resposta:</b> disponibilidade.</p>""",
 "Um servidor da delegacia fica fora do ar por causa de um ataque que o inunda com acessos. Qual pilar foi atingido? Passo 1: os dados não foram lidos por estranhos (confidencialidade preservada). Passo 2: os dados não foram alterados (integridade preservada). Passo 3: o serviço ficou <b>inacessível</b>: afetada a <b>disponibilidade</b>.",
 "(1) Identifique o que aconteceu com a informação: vazou, mudou ou ficou inacessível. (2) Vazou: confidencialidade. Mudou: integridade. Inacessível: disponibilidade. (3) Escolha o controle correspondente.",
 "Vazou = confidencialidade. Mudou = integridade. Caiu = disponibilidade.")
teoria("ti_redes",
 """<p><b>Em uma frase:</b> uma rede conecta computadores para trocar dados; protocolos são as 'regras de conversa' entre eles.</p>
<div class="exemplo"><b>Analogia:</b> a rede é uma rua; o endereço IP é o número da casa; o protocolo é o idioma que moradores e carteiro combinam usar.</div>
<h3>Tipos de rede</h3>
<ul><li><b>PAN:</b> pessoal (Bluetooth). <b>LAN:</b> local (um prédio). <b>MAN:</b> metropolitana. <b>WAN:</b> ampla (a internet é a maior).</li></ul>
<h3>Equipamentos</h3>
<ul><li><b>Switch:</b> liga dispositivos dentro de uma LAN. <b>Roteador:</b> liga <b>redes diferentes</b> (ex.: sua LAN à internet). <b>Modem:</b> converte o sinal do provedor. <b>Access point:</b> fornece Wi-Fi.</li></ul>
<h3>Endereços e serviços</h3>
<ul><li><b>IPv4:</b> 32 bits (ex.: 192.168.0.1). <b>IPv6:</b> 128 bits, mais endereços.</li><li><b>DHCP:</b> entrega IP automaticamente. <b>DNS:</b> traduz nome em IP.</li></ul>
<h3>Protocolos e portas</h3>
<ul><li><b>HTTP</b> (80) e <b>HTTPS</b> (443): web. <b>SMTP</b> (25): envio de e-mail. <b>POP3</b> e <b>IMAP</b>: recebimento. <b>FTP</b> (21): transferência de arquivos.</li><li><b>TCP:</b> confiável, confirma a entrega. <b>UDP:</b> rápido, sem confirmação (vídeo ao vivo).</li></ul>
<h3>Teste rápido</h3><p>Que equipamento liga a rede local à internet? <b>Resposta:</b> roteador.</p>""",
 "Você abre o site https://exemplo.gov.br. Passo 1: o navegador pede ao <b>DNS</b> o endereço IP do nome. Passo 2: o DNS devolve o IP. Passo 3: o navegador conecta por <b>TCP</b> à porta <b>443</b> (HTTPS). Passo 4: o servidor responde com a página, criptografada.",
 "(1) Nome → IP: DNS. (2) Entregar IP automaticamente: DHCP. (3) Ligar redes diferentes: roteador; ligar dispositivos da mesma rede: switch. (4) Web segura: HTTPS, porta 443.",
 "DNS traduz, DHCP entrega IP, roteador liga redes, switch liga aparelhos.")
teoria("ti_meta",
 """<p><b>Em uma frase:</b> metadados são <b>dados sobre dados</b>: informações que descrevem um arquivo, como autor, data e local.</p>
<div class="exemplo"><b>Analogia:</b> é a etiqueta de uma caixa de provas: não é o conteúdo, mas diz quem coletou, quando e onde.</div>
<h3>Exemplos</h3>
<ul><li><b>Documento:</b> autor, data de criação e de última modificação, tamanho, programa usado.</li><li><b>Foto (EXIF):</b> data e hora, modelo da câmera ou celular, <b>coordenadas GPS</b>, configurações.</li><li><b>E-mail:</b> cabeçalho com remetente, data, servidores pelos quais passou.</li></ul>
<h3>Importância na perícia</h3>
<ul><li>Ajudam a reconstruir <b>linha do tempo</b> e <b>autoria</b>.</li><li>Podem ser <b>alterados</b>: não são prova absoluta; é preciso conferir com outras fontes.</li><li>Antes de divulgar um arquivo, convém <b>remover metadados</b> sensíveis (local, autor).</li></ul>
<h3>Armadilha</h3><p>Metadados não são o conteúdo do arquivo: um arquivo pode ter o conteúdo igual e metadados diferentes.</p>
<h3>Teste rápido</h3><p>A data em que uma foto foi tirada está em qual tipo de informação? <b>Resposta:</b> nos metadados.</p>""",
 "Uma foto apreendida em um celular mostra um suspeito em um local. Para checar quando e onde foi tirada, analisa-se o <b>EXIF</b>. Passo 1: leia data e hora de captura nos metadados. Passo 2: leia as coordenadas GPS. Passo 3: compare com o álibi. Passo 4: lembre que metadados podem ser alterados e devem ser confirmados por outras evidências.",
 "(1) Pergunte: a informação descreve o arquivo (metadado) ou é o conteúdo? (2) Em perícia, trate metadados como indício e confirme por outra fonte. (3) Antes de publicar, remova metadados sensíveis.",
 "Metadado = dado sobre o dado. Útil, mas pode ser alterado.")
teoria("ti_bd",
 """<p><b>Em uma frase:</b> banco de dados é um conjunto organizado de dados; o SGBD (sistema gerenciador) permite guardar, consultar e proteger esses dados.</p>
<div class="exemplo"><b>Analogia:</b> um arquivo de fichas organizado: cada gaveta é uma tabela, cada ficha é um registro.</div>
<h3>Modelo relacional</h3>
<ul><li><b>Tabela:</b> conjunto de registros. <b>Linha (registro/tupla):</b> uma ocorrência. <b>Coluna (campo/atributo):</b> uma característica.</li><li><b>Chave primária:</b> campo que identifica cada registro de forma <b>única</b> (ex.: CPF, matrícula).</li><li><b>Chave estrangeira:</b> campo que referencia a chave primária de <b>outra tabela</b>, ligando as tabelas.</li></ul>
<h3>SQL (linguagem de consulta)</h3>
<ul><li><b>SELECT</b> consulta. <b>INSERT</b> inclui. <b>UPDATE</b> altera. <b>DELETE</b> exclui.</li><li><b>WHERE</b> filtra. <b>ORDER BY</b> ordena. <b>JOIN</b> combina tabelas.</li><li>Exemplo: <i>SELECT nome FROM suspeitos WHERE cidade = 'Rio Branco';</i></li></ul>
<h3>Outros conceitos</h3>
<ul><li><b>Integridade:</b> regras que mantêm os dados corretos (ex.: não repetir chave primária).</li><li><b>NoSQL:</b> bancos não relacionais (documentos, grafos), para grandes volumes e dados variados.</li></ul>
<h3>Teste rápido</h3><p>Qual comando SQL altera registros existentes? <b>Resposta:</b> UPDATE.</p>""",
 "Duas tabelas: <i>Pessoas</i> (id, nome) e <i>Ocorrencias</i> (id, tipo, id_pessoa). Como achar o nome de quem tem uma ocorrência de furto? Passo 1: <b>id</b> é a chave primária de Pessoas. Passo 2: <b>id_pessoa</b> em Ocorrencias é a chave estrangeira que aponta para Pessoas. Passo 3: use <b>JOIN</b> ligando id_pessoa a id e filtre com <b>WHERE tipo = 'furto'</b>.",
 "(1) Identifique tabelas e chaves. (2) Chave primária identifica; chave estrangeira liga. (3) Consultar: SELECT; filtrar: WHERE; juntar tabelas: JOIN.",
 "Primária identifica, estrangeira liga. SELECT consulta, UPDATE altera.")
teoria("ti_plan",
 """<p><b>Em uma frase:</b> planilhas são ferramentas de análise: ordenam, filtram, resumem e cruzam dados sem programar.</p>
<div class="exemplo"><b>Analogia:</b> é uma mesa de análise: você espalha os dados, agrupa, soma e vê o padrão.</div>
<h3>Recursos de análise</h3>
<ul><li><b>Classificar (ordenar)</b> e <b>filtrar</b> linhas por critérios.</li><li><b>Remover duplicatas</b> e padronizar formatos (datas, textos).</li><li><b>Tabela dinâmica:</b> resume grandes volumes por categorias (contar ocorrências por bairro).</li><li><b>Formatação condicional:</b> destaca células por regra (valores acima de 100 em vermelho).</li><li><b>Gráficos:</b> barras comparam categorias; linhas mostram evolução no tempo; setores mostram proporção do total.</li></ul>
<h3>Funções de busca e condição</h3>
<ul><li><b>PROCV</b> (busca vertical) e <b>PROCX</b>: procuram um valor numa tabela e devolvem outro da mesma linha.</li><li><b>SOMASE</b>, <b>CONT.SE</b>: somam ou contam só o que atende ao critério.</li><li><b>SE</b>: decisão.</li></ul>
<h3>Armadilhas</h3>
<ul><li>PROCV busca na <b>primeira coluna</b> do intervalo e precisa de correspondência exata (quarto argumento FALSO).</li><li>Dados mal padronizados (espaços, maiúsculas) atrapalham filtros e cruzamentos.</li></ul>
<h3>Teste rápido</h3><p>Que recurso resume dados por categoria sem fórmulas? <b>Resposta:</b> tabela dinâmica.</p>""",
 "Você tem uma lista de 500 ocorrências com bairro e tipo. Quer saber quantas por bairro. Passo 1: selecione a lista e insira uma <b>tabela dinâmica</b>. Passo 2: arraste <b>Bairro</b> para linhas e <b>Tipo</b> para valores (contagem). Passo 3: ordene do maior para o menor. Passo 4: gere um <b>gráfico de barras</b>.",
 "(1) Padronize os dados. (2) Remova duplicatas. (3) Filtre e ordene. (4) Resuma com tabela dinâmica. (5) Apresente em gráfico adequado.",
 "Resumir por categoria: tabela dinâmica. Buscar em outra tabela: PROCV/PROCX.")
teoria("ti_org",
 """<p><b>Em uma frase:</b> organizar e tratar dados é deixá-los limpos, padronizados e prontos para análise: padrão, duplicidades e cruzamentos.</p>
<div class="exemplo"><b>Analogia:</b> é arrumar a cena antes da perícia: sem organização, você perde pistas ou conta a mesma coisa duas vezes.</div>
<h3>Etapas do tratamento</h3>
<ol><li><b>Coleta e organização:</b> reunir os dados em tabelas com colunas bem definidas.</li><li><b>Padronização:</b> um só formato para datas (dd/mm/aaaa), nomes (sem espaços sobrando, maiúsculas e minúsculas) e códigos.</li><li><b>Limpeza:</b> corrigir erros, tratar valores vazios, <b>remover duplicidades</b>.</li><li><b>Cruzamento:</b> ligar bases por um campo comum (CPF, placa, telefone).</li><li><b>Apresentação:</b> tabelas e gráficos.</li></ol>
<h3>Duplicidade</h3>
<p>Mesmo registro repetido infla a contagem. Cuidado: 'João da Silva' e 'JOAO SILVA' podem ser a mesma pessoa; padronize antes.</p>
<h3>Escolha do gráfico</h3>
<ul><li>Comparar categorias: <b>barras</b>. Evolução no tempo: <b>linhas</b>. Proporção do total: <b>setores</b>. Relação entre duas variáveis: <b>dispersão</b>.</li></ul>
<h3>Teste rápido</h3><p>Para acompanhar o número de ocorrências mês a mês, qual gráfico? <b>Resposta:</b> de linhas.</p>""",
 "Duas listas de telefones suspeitos têm formatos diferentes: '(68) 99999-0000' e '68999990000'. Passo 1: padronize para só números (68999990000). Passo 2: remova duplicidades. Passo 3: cruze as listas pelo número padronizado. Passo 4: os números que aparecem nas duas listas são os coincidentes.",
 "(1) Padronize antes de cruzar. (2) Remova duplicidades. (3) Cruze por um campo único. (4) Escolha o gráfico pelo objetivo: comparar, evoluir, proporção.",
 "Padronize, limpe, cruze, apresente. Sem padrão, o cruzamento falha.")
teoria("ti_conc",
 """<p><b>Em uma frase:</b> dado é a matéria-prima; informação é o dado com significado; conhecimento é a informação interpretada. Um sistema de informação coleta, processa, armazena e distribui informação.</p>
<div class="exemplo"><b>Analogia:</b> '68' sozinho é dado; 'o prazo do inquérito é de 68 dias' é informação; saber que esse prazo exige antecipar a perícia é conhecimento.</div>
<h3>Hierarquia</h3>
<ul><li><b>Dado:</b> fato bruto (68, 'Silva').</li><li><b>Informação:</b> dado contextualizado e organizado.</li><li><b>Conhecimento:</b> informação analisada e aplicada para decidir.</li></ul>
<h3>Ciclo de processamento</h3>
<ul><li><b>Entrada → Processamento → Saída</b>, com <b>armazenamento</b> e retroalimentação.</li></ul>
<h3>Armazenamento</h3>
<ul><li><b>Memória RAM:</b> principal, <b>volátil</b> (perde dados ao desligar), rápida.</li><li><b>Armazenamento secundário:</b> HD e SSD, <b>não volátil</b>. SSD usa memória flash, sem partes móveis.</li><li><b>Bit</b> é a menor unidade; <b>1 byte = 8 bits</b>.</li></ul>
<h3>Tipos de dados</h3>
<ul><li><b>Estruturados:</b> em tabelas com campos definidos (cadastro).</li><li><b>Semiestruturados:</b> JSON, XML.</li><li><b>Não estruturados:</b> textos livres, imagens, áudios e vídeos.</li></ul>
<h3>Teste rápido</h3><p>Qual memória perde os dados ao desligar o computador? <b>Resposta:</b> a RAM.</p>""",
 "Registro: '27/11, 23h40, Rua X, furto'. Passo 1: como campos soltos, são <b>dados</b>. Passo 2: organizados numa tabela de ocorrências, viram <b>informação</b>. Passo 3: ao analisar que furtos ocorrem à noite naquela rua e reforçar a ronda, gera-se <b>conhecimento</b> aplicado.",
 "(1) Fato isolado: dado. (2) Dado com contexto e organização: informação. (3) Informação analisada para decidir: conhecimento. (4) Dados em tabela: estruturados; texto, imagem, vídeo: não estruturados.",
 "Dado → informação → conhecimento. RAM é volátil.")
teoria("ti_so",
 """<p><b>Em uma frase:</b> o sistema operacional gerencia o hardware e os programas e oferece o sistema de arquivos, que organiza dados em pastas (diretórios).</p>
<div class="exemplo"><b>Analogia:</b> é o síndico do computador: reparte memória e processador entre os 'moradores' (programas) e guarda os arquivos em seus lugares.</div>
<h3>Funções</h3>
<ul><li>Gerenciar processos, memória, arquivos e dispositivos.</li><li>Interface com o usuário (janelas, comandos).</li></ul>
<h3>Arquivos, formatos e extensões</h3>
<ul><li><b>Texto:</b> .txt, .docx, .pdf. <b>Planilha:</b> .xlsx, .csv. <b>Imagem:</b> .jpg, .png. <b>Áudio/vídeo:</b> .mp3, .mp4. <b>Compactado:</b> .zip, .rar.</li><li><b>Caminho (path):</b> localização completa (C:\\Casos\\2026\\laudo.pdf).</li></ul>
<h3>Compactação</h3>
<ul><li><b>Sem perda:</b> o arquivo original é recuperado integralmente (ZIP).</li><li><b>Com perda:</b> descarta informação para reduzir tamanho (JPEG, MP3).</li></ul>
<h3>Sistemas de arquivos e Linux</h3>
<ul><li>Windows: NTFS e FAT32; Linux: ext4. <b>Linux</b> é de <b>código aberto</b>, com várias distribuições. Comandos: <b>ls</b> lista, <b>cd</b> muda de pasta, <b>pwd</b> mostra a pasta atual, <b>cp</b> copia, <b>mv</b> move ou renomeia, <b>rm</b> remove.</li></ul>
<h3>Teste rápido</h3><p>Qual formato de compactação não perde dados? <b>Resposta:</b> ZIP.</p>""",
 "No Linux, você está na pasta /casos e quer copiar laudo.pdf para /backup. Passo 1: confirme onde está com <b>pwd</b>. Passo 2: liste os arquivos com <b>ls</b>. Passo 3: copie com <b>cp laudo.pdf /backup</b>. Passo 4: confira com <b>ls /backup</b>.",
 "(1) Descubra o formato pela extensão. (2) Compactação sem perda: ZIP; com perda: JPEG/MP3. (3) Linux: ls lista, cd entra, cp copia, mv move, rm remove, pwd mostra o local.",
 "ZIP não perde dados; JPEG e MP3 perdem. Linux: cp copia, mv move.")

CR, SE, RE, ME, BD, PL, OR, CO, SO = "ti_cripto", "ti_seg", "ti_redes", "ti_meta", "ti_bd", "ti_plan", "ti_org", "ti_conc", "ti_so"
# --- Criptografia/hash/blockchain
Q(CR, "Na criptografia assimétrica, para que apenas o destinatário consiga ler uma mensagem, o remetente deve cifrá-la com:", "a chave pública do destinatário.",
  [("a chave privada do remetente.", "isso comprova a autoria (assinatura), mas qualquer um com a chave pública leria."), ("a chave privada do destinatário.", "a privada deve permanecer secreta e é usada para decifrar."), ("uma senha enviada na própria mensagem.", "enviar a senha junto anula a proteção."), ("o hash da mensagem.", "hash não é cifra: não permite recuperar o texto.")],
  ["Quer-se sigilo: só o destinatário pode ler.", "Cifra-se com a chave pública do destinatário.", "Só a chave privada dele decifra."], "Pública cifra; privada decifra.", "Uso das chaves na criptografia assimétrica.")
Q(CR, "A função hash é considerada de ‘mão única’ porque:", "a partir do resumo gerado não é possível recuperar o conteúdo original.",
  [("só pode ser calculada uma vez.", "pode ser calculada quantas vezes se quiser."), ("exige duas chaves diferentes.", "hash não usa chaves."), ("gera um resumo maior que o arquivo.", "o resumo tem tamanho fixo e pequeno."), ("só funciona em redes locais.", "não depende de rede.")],
  ["O hash resume um dado em um valor de tamanho fixo.", "O caminho inverso (resumo → original) não é possível.", "Por isso ele não é criptografia."], "Hash não se reverte.", "Propriedade do hash.")
Q(CR, "Uma assinatura digital garante, entre outras propriedades:", "a autenticidade e a integridade do documento, com não repúdio.",
  [("o sigilo do conteúdo, mesmo sem cifrá-lo.", "assinar não esconde o conteúdo."), ("a disponibilidade permanente do documento.", "disponibilidade depende de infraestrutura e backup."), ("a velocidade de transmissão do arquivo.", "assinatura não acelera a transmissão."), ("a eliminação de vírus do arquivo.", "assinatura não faz limpeza de malware.")],
  ["A assinatura usa o hash do documento cifrado com a chave privada do autor.", "Isso comprova quem assinou e que o conteúdo não mudou.", "O autor não pode negar a autoria: não repúdio."], "Assinatura: autoria, integridade, não repúdio.", "Garantias da assinatura digital.")
Q(CR, "Em um blockchain, cada bloco contém o hash do bloco anterior. Isso faz com que:", "alterar um bloco antigo invalide os blocos seguintes, tornando a fraude evidente.",
  [("os dados sejam sempre confidenciais.", "blockchain públicos não garantem sigilo."), ("qualquer pessoa possa apagar registros antigos sem ser notada.", "o encadeamento por hash impede isso."), ("o sistema dependa de um banco central.", "blockchain é descentralizado."), ("as transações sejam instantâneas e sem custo.", "não é consequência do encadeamento.")],
  ["Cada bloco guarda o hash do anterior.", "Alterar um bloco muda seu hash e quebra o encadeamento.", "A fraude fica visível para a rede."], "Hash encadeado: alteração quebra a cadeia.", "Funcionamento do encadeamento do blockchain.")
# --- Segurança
Q(SE, "Um ataque de negação de serviço distribuído (DDoS) compromete principalmente qual pilar da segurança da informação?", "disponibilidade.",
  [("confidencialidade.", "ocorre quando dados são acessados por quem não deveria."), ("integridade.", "ocorre quando dados são alterados indevidamente."), ("autenticidade.", "trata da origem verdadeira."), ("não repúdio.", "trata da impossibilidade de negar a autoria.")],
  ["O DDoS sobrecarrega o serviço com acessos.", "O serviço fica inacessível para usuários legítimos.", "Pilar afetado: disponibilidade."], "DDoS = disponibilidade.", "Pilar afetado pelo DDoS.")
Q(SE, "O uso de senha e de um código enviado ao celular para acessar um sistema caracteriza:", "autenticação em dois fatores.",
  [("criptografia assimétrica.", "trata de cifrar dados com par de chaves."), ("controle de integridade.", "trata de detectar alterações."), ("backup incremental.", "trata de cópias de segurança."), ("assinatura digital.", "trata de autoria de documentos.")],
  ["A senha é algo que o usuário sabe.", "O celular é algo que o usuário tem.", "Dois fatores de categorias diferentes."], "Dois fatores de categorias distintas.", "Identificar a autenticação em dois fatores.")
Q(SE, "A diferença entre autenticação e autorização é que:", "autenticação comprova quem é o usuário; autorização define o que ele pode fazer.",
  [("autenticação define permissões; autorização comprova identidade.", "inverte os conceitos."), ("as duas significam a mesma coisa.", "são etapas distintas."), ("autenticação usa criptografia; autorização não.", "ambas podem usar criptografia."), ("autorização acontece antes da autenticação.", "primeiro se prova a identidade, depois se verificam as permissões.")],
  ["Primeiro o sistema confere quem você é: autenticação.", "Depois confere o que você pode acessar: autorização.", "A ordem é autenticar e depois autorizar."], "Autenticar = quem é; autorizar = o que pode.", "Distinguir autenticação e autorização.")
# --- Redes
Q(RE, "O equipamento responsável por interligar redes diferentes, como a rede local de uma delegacia e a internet, é o:", "roteador.",
  [("switch.", "interliga dispositivos dentro da mesma rede local."), ("hub.", "repete sinais entre dispositivos da mesma rede."), ("repetidor.", "amplia o alcance do sinal."), ("placa de rede.", "conecta um computador à rede.")],
  ["O equipamento faz a ligação entre redes distintas.", "Isso é função do roteador.", "O switch liga aparelhos dentro da mesma rede."], "Roteador liga redes.", "Função do roteador.")
Q(RE, "O protocolo que atribui automaticamente endereços IP aos dispositivos de uma rede é o:", "DHCP",
  [("DNS", "traduz nomes em IP."), ("FTP", "transfere arquivos."), ("SMTP", "envia e-mails."), ("HTTP", "transmite páginas web.")],
  ["A tarefa é entregar IPs automaticamente.", "O protocolo é o DHCP.", "O DNS apenas traduz nomes."], "DHCP entrega IP.", "Função do DHCP.")
Q(RE, "O protocolo IPv6, em comparação ao IPv4, caracteriza-se por:", "usar endereços de 128 bits, ampliando enormemente a quantidade de endereços.",
  [("usar endereços de 32 bits.", "esse é o IPv4."), ("ser exclusivo de redes locais.", "é usado também na internet."), ("substituir o protocolo HTTP.", "são protocolos de camadas diferentes."), ("criptografar sempre as conexões.", "não é característica automática do IPv6.")],
  ["IPv4 tem 32 bits; IPv6 tem 128 bits.", "Mais bits significam muito mais endereços possíveis.", "O IPv6 foi criado por causa do esgotamento de IPv4."], "IPv4: 32 bits; IPv6: 128 bits.", "Comparar IPv4 e IPv6.")
# --- Metadados (7)
Q(ME, "Os metadados de um arquivo são:", "dados que descrevem o arquivo, como autor, data de criação e tamanho.",
  [("o conteúdo principal do arquivo.", "o conteúdo é o dado em si."), ("uma cópia de segurança do arquivo.", "isso é backup."), ("o programa que abre o arquivo.", "isso é o aplicativo."), ("um vírus que se anexa ao arquivo.", "isso é malware.")],
  ["O prefixo 'meta' indica 'sobre'.", "Metadados são dados sobre os dados.", "Descrevem o arquivo, sem serem o conteúdo."], "Metadado = dado sobre dado.", "Conceito de metadados.")
Q(ME, "Em uma fotografia digital, o padrão de metadados EXIF pode conter:", "data e hora da captura, modelo do aparelho e, em alguns casos, coordenadas de GPS.",
  [("apenas o nome do arquivo.", "o EXIF contém muito mais que o nome."), ("a senha do dono do aparelho.", "senhas não ficam no EXIF."), ("o histórico de navegação do usuário.", "não faz parte da foto."), ("a lista de contatos do celular.", "não faz parte da foto.")],
  ["EXIF é o padrão de metadados de imagens.", "Guarda data, hora, aparelho e configurações.", "Pode incluir localização por GPS."], "EXIF: quando, com o quê e onde.", "Conteúdo do EXIF.")
Q(ME, "Do ponto de vista da perícia digital, os metadados de um arquivo:", "ajudam a reconstruir a linha do tempo, mas podem ser alterados e devem ser confirmados por outras evidências.",
  [("são prova absoluta e nunca podem ser alterados.", "podem ser editados com ferramentas simples."), ("não têm valor algum para a investigação.", "são úteis para linha do tempo e autoria."), ("garantem sempre a autoria do arquivo.", "não garantem autoria."), ("só existem em arquivos de áudio.", "existem em vários tipos de arquivo.")],
  ["Metadados dão pistas de autoria e tempo.", "Mas podem ser modificados.", "Por isso são indícios a confirmar por outras fontes."], "Metadado é indício, não prova isolada.", "Valor probatório dos metadados.")
Q(ME, "Antes de publicar uma foto na internet, a medida adequada para evitar a divulgação involuntária do local onde foi tirada é:", "remover os metadados de localização (GPS) da imagem.",
  [("renomear o arquivo.", "o nome não altera os metadados."), ("compactar o arquivo em .zip.", "a compactação preserva os metadados."), ("aumentar o brilho da imagem.", "não afeta os metadados."), ("imprimir a imagem antes.", "não resolve o envio digital.")],
  ["O GPS fica gravado nos metadados da foto.", "Mesmo sem aparecer na imagem, quem baixar o arquivo pode lê-lo.", "Remova os metadados antes de publicar."], "Foto publicada: tire o GPS dos metadados.", "Privacidade e metadados.")
Q(ME, "O cabeçalho de um e-mail, que mostra remetente, data e servidores pelos quais a mensagem passou, é um exemplo de:", "metadados.",
  [("conteúdo cifrado.", "o cabeçalho não é cifrado por definição."), ("anexo malicioso.", "não é anexo."), ("backup da mensagem.", "não é backup."), ("assinatura digital.", "assinatura é outro recurso.")],
  ["O cabeçalho descreve a mensagem: quem enviou, quando e por onde passou.", "Descreve, mas não é o conteúdo do texto.", "Logo, são metadados."], "Cabeçalho de e-mail: metadados.", "Metadados de e-mail.")
Q(ME, "Dois arquivos de texto têm conteúdo idêntico, mas datas de criação diferentes. Isso demonstra que:", "os metadados podem ser diferentes mesmo com conteúdo igual.",
  [("os arquivos são obrigatoriamente cópias fiéis um do outro.", "a data não prova isso."), ("o hash dos dois será diferente por causa da data.", "o hash do arquivo depende do conteúdo, não do metadado externo do sistema."), ("um dos arquivos está corrompido.", "não há indício de corrupção."), ("o conteúdo não importa para a perícia.", "o conteúdo importa muito.")],
  ["Conteúdo e metadados são coisas distintas.", "A data de criação está no metadado do arquivo.", "Dois arquivos iguais em conteúdo podem ter metadados diferentes."], "Conteúdo ≠ metadado.", "Diferença entre conteúdo e metadados.")
Q(ME, "A data de última modificação de um documento é:", "um metadado registrado pelo sistema ou pelo programa que o editou.",
  [("o conteúdo do documento.", "a data não está no corpo do texto."), ("uma assinatura digital.", "assinatura é outro mecanismo."), ("uma chave de criptografia.", "não é chave."), ("um tipo de malware.", "não é malware.")],
  ["A data de modificação descreve o arquivo.", "Ela é gravada pelo sistema ou pelo programa.", "Logo, é um metadado."], "Datas do arquivo = metadados.", "Identificar metadado.")
# --- Bancos de dados (5)
Q(BD, "Em um banco de dados relacional, a chave primária de uma tabela:", "identifica de forma única cada registro.",
  [("liga a tabela a uma tabela de outro banco.", "isso é função de chave estrangeira em relações entre tabelas."), ("permite valores repetidos.", "a chave primária não pode repetir."), ("serve para criptografar os dados.", "não é função de criptografia."), ("é sempre um campo de texto.", "pode ser número ou texto.")],
  ["Cada registro precisa ser distinguível.", "A chave primária garante essa unicidade.", "Não aceita repetição nem valor vazio."], "Chave primária: identificador único.", "Função da chave primária.")
Q(BD, "A chave estrangeira serve para:", "relacionar uma tabela a outra, referenciando a chave primária desta.",
  [("identificar de forma única cada registro da própria tabela.", "isso é a chave primária."), ("criptografar campos sensíveis.", "não é sua função."), ("excluir registros duplicados.", "não é sua função."), ("ordenar a tabela.", "ordenar é feito por ORDER BY.")],
  ["Tabelas se ligam por campos em comum.", "A chave estrangeira aponta para a chave primária de outra tabela.", "É assim que se criam relacionamentos."], "Estrangeira aponta para a primária de outra tabela.", "Função da chave estrangeira.")
Q(BD, "Em SQL, o comando usado para consultar dados de uma tabela é:", "SELECT",
  [("INSERT", "inclui novos registros."), ("UPDATE", "altera registros existentes."), ("DELETE", "exclui registros."), ("CREATE", "cria objetos, como tabelas.")],
  ["Consultar é ler dados.", "O comando de leitura é o SELECT.", "INSERT, UPDATE e DELETE modificam dados."], "SELECT consulta.", "Comando de consulta em SQL.")
Q(BD, "Na consulta SQL: SELECT nome FROM suspeitos WHERE cidade = 'Rio Branco'; o resultado trará:", "os nomes dos suspeitos cuja cidade é Rio Branco.",
  [("todos os suspeitos de todas as cidades.", "o WHERE filtra por cidade."), ("a cidade de cada suspeito.", "o SELECT pede o campo nome."), ("a quantidade de suspeitos.", "não há função de contagem."), ("a exclusão dos suspeitos de Rio Branco.", "SELECT não exclui.")],
  ["SELECT nome: escolhe a coluna nome.", "FROM suspeitos: tabela consultada.", "WHERE cidade = 'Rio Branco': filtra as linhas."], "WHERE filtra linhas.", "Interpretar uma consulta SQL.")
Q(BD, "O Sistema Gerenciador de Banco de Dados (SGBD) é:", "o software que permite criar, consultar, atualizar e proteger bancos de dados.",
  [("o conjunto de dados armazenados.", "os dados formam o banco; o SGBD os gerencia."), ("o computador onde os dados ficam.", "isso é o servidor."), ("uma linguagem de programação.", "SGBD é software; SQL é linguagem de consulta."), ("um antivírus para bancos.", "não é antivírus.")],
  ["O banco guarda os dados.", "O SGBD é o programa que gerencia o banco.", "Exemplos: MySQL, PostgreSQL, Oracle, SQL Server."], "SGBD gerencia o banco.", "Conceito de SGBD.")
# --- Planilhas aplicadas (3)
Q(PL, "Para resumir rapidamente uma lista com milhares de ocorrências, contando quantas há por bairro, o recurso mais adequado da planilha é:", "a tabela dinâmica.",
  [("a formatação condicional.", "destaca células por regra, não resume por categoria."), ("a validação de dados.", "restringe o que pode ser digitado."), ("o congelamento de painéis.", "fixa linhas ou colunas na tela."), ("a verificação ortográfica.", "corrige textos.")],
  ["O objetivo é agrupar e contar por categoria.", "A tabela dinâmica resume dados por categorias.", "Basta arrastar o campo bairro para linhas."], "Resumir por categoria: tabela dinâmica.", "Escolher o recurso de resumo.")
Q(PL, "A função PROCV de uma planilha é usada para:", "procurar um valor na primeira coluna de uma tabela e retornar um valor da mesma linha.",
  [("somar valores que atendem a um critério.", "isso é SOMASE."), ("contar células preenchidas.", "isso é CONT.VALORES."), ("arredondar números.", "isso é ARRED."), ("converter texto em maiúsculas.", "isso é MAIÚSCULA.")],
  ["PROCV = procura vertical.", "Ela procura o valor na primeira coluna do intervalo.", "Devolve o dado de outra coluna da mesma linha."], "PROCV busca na 1ª coluna.", "Função PROCV.")
Q(PL, "Para identificar visualmente, em uma planilha, todos os valores acima de 100, destacando-os em vermelho, usa-se:", "a formatação condicional.",
  [("a tabela dinâmica.", "resume dados, não destaca por regra."), ("a classificação de A a Z.", "só ordena."), ("a proteção de planilha.", "restringe edição."), ("o comentário em célula.", "adiciona notas.")],
  ["A necessidade é destacar células por uma regra.", "A formatação condicional aplica formato quando a regra é atendida.", "Regra: valor maior que 100."], "Formatação condicional destaca por regra.", "Escolher o recurso de destaque.")
# --- Organização e tratamento (8)
Q(OR, "Antes de cruzar duas listas de telefones em formatos diferentes, a primeira providência deve ser:", "padronizar o formato dos dados.",
  [("excluir a lista menor.", "não é necessário excluir listas."), ("criptografar as listas.", "não resolve diferenças de formato."), ("imprimir as duas listas.", "não resolve."), ("trocar o computador.", "não resolve.")],
  ["Formatos diferentes impedem o cruzamento correto.", "É preciso padronizar (ex.: só números).", "Depois o cruzamento funciona."], "Padronize antes de cruzar.", "Preparar dados para cruzamento.")
Q(OR, "A presença de registros duplicados em uma base de dados pode causar:", "contagens infladas e conclusões equivocadas.",
  [("aumento da velocidade de consulta.", "duplicidades geralmente atrapalham."), ("maior segurança da base.", "não tem relação."), ("melhoria na qualidade dos dados.", "reduz a qualidade."), ("redução do tamanho da base.", "aumenta o tamanho.")],
  ["O mesmo registro repetido é contado mais de uma vez.", "Isso infla totais e distorce análises.", "Por isso se remove duplicidades."], "Duplicidade distorce a contagem.", "Efeito das duplicidades.")
Q(OR, "Para acompanhar a evolução do número de ocorrências mês a mês durante um ano, o gráfico mais adequado é o de:", "linhas.",
  [("setores (pizza).", "mostra proporção de um total em um instante."), ("dispersão.", "relaciona duas variáveis numéricas."), ("barras empilhadas de categorias.", "compara categorias."), ("organograma.", "mostra hierarquia.")],
  ["O objetivo é ver a evolução ao longo do tempo.", "O gráfico de linhas mostra tendência no tempo.", "Pizza serve para proporções."], "Tempo: linhas.", "Escolher o gráfico.")
Q(OR, "Para mostrar a proporção de cada tipo de crime no total de ocorrências do mês, o gráfico mais adequado é o de:", "setores (pizza).",
  [("linhas.", "mostra evolução no tempo."), ("dispersão.", "relaciona duas variáveis."), ("histograma.", "mostra distribuição de uma variável contínua."), ("radar.", "compara várias variáveis de poucos itens.")],
  ["O objetivo é mostrar partes de um todo.", "O gráfico de setores mostra proporções.", "Use poucos setores para boa leitura."], "Partes de um todo: setores.", "Escolher o gráfico de proporção.")
Q(OR, "O cruzamento de duas bases de dados é feito, em geral, a partir:", "de um campo em comum, como CPF, placa ou número de telefone.",
  [("de campos totalmente diferentes.", "sem um campo comum, o cruzamento não é confiável."), ("do tamanho dos arquivos.", "o tamanho não identifica registros."), ("da data de criação do arquivo.", "metadado do arquivo, não dado do registro."), ("do nome do programa utilizado.", "não identifica registros.")],
  ["Cruzar é ligar registros que se referem ao mesmo elemento.", "Isso exige um campo comum.", "CPF, placa e telefone são exemplos."], "Cruzamento exige campo em comum.", "Base do cruzamento.")
Q(OR, "Os nomes ‘JOÃO DA SILVA’ e ‘João da Silva ’ (com espaço no final) em uma base:", "podem ser tratados como registros diferentes se não houver padronização.",
  [("são sempre reconhecidos como iguais pelos sistemas.", "diferenças de maiúsculas e espaços podem causar tratamento como distintos."), ("nunca podem se referir à mesma pessoa.", "podem, sim."), ("indicam erro grave de hardware.", "não há relação com hardware."), ("são automaticamente excluídos.", "não há exclusão automática.")],
  ["Pequenas diferenças de formato enganam o sistema.", "Maiúsculas e espaços extras criam registros aparentemente distintos.", "A padronização resolve."], "Padronizar: caixa e espaços.", "Importância da padronização de nomes.")
Q(OR, "Entre as etapas do tratamento de dados, a ordem lógica mais adequada é:", "coletar, padronizar, limpar, cruzar e apresentar.",
  [("apresentar, cruzar, limpar, padronizar e coletar.", "inverte a ordem lógica."), ("cruzar, coletar, apresentar e padronizar.", "cruza antes de padronizar."), ("limpar, apresentar, coletar e padronizar.", "apresenta antes de tratar."), ("padronizar, apresentar, coletar e cruzar.", "apresenta antes de coletar.")],
  ["Primeiro é preciso ter os dados: coletar.", "Depois deixá-los uniformes e corretos: padronizar e limpar.", "Então cruzar e, por fim, apresentar."], "Coleta → padrão → limpeza → cruzamento → apresentação.", "Ordem das etapas do tratamento.")
Q(OR, "Ao tratar uma base com datas em formatos variados (27/11/2026, 2026-11-27, 27-11-26), a medida correta é:", "converter todas para um único formato antes da análise.",
  [("excluir as datas.", "perde-se informação importante."), ("manter formatos diferentes para preservar o original.", "dificulta a ordenação e o cruzamento."), ("digitar as datas por extenso em cada linha.", "inviabiliza a análise."), ("ignorar as diferenças, pois o computador entende todas.", "formatos mistos podem gerar leitura errada.")],
  ["Datas em formatos diferentes podem ser lidas de modo errado.", "A solução é padronizar.", "Escolha um formato único, como dd/mm/aaaa."], "Um só formato de data.", "Padronização de datas.")
# --- Conceitos (6)
Q(CO, "Na hierarquia ‘dado, informação e conhecimento’, a informação é:", "o dado organizado e contextualizado, que passa a ter significado.",
  [("o dado bruto, sem contexto.", "isso é dado."), ("a decisão tomada com base na análise.", "isso se aproxima de conhecimento aplicado."), ("o equipamento que armazena os dados.", "isso é hardware."), ("o programa que processa os dados.", "isso é software.")],
  ["Dado é o fato bruto.", "Informação é o dado com contexto e organização.", "Conhecimento é a informação analisada e aplicada."], "Dado < informação < conhecimento.", "Diferenciar dado e informação.")
Q(CO, "A memória RAM de um computador é classificada como:", "volátil: perde o conteúdo quando o computador é desligado.",
  [("não volátil: mantém os dados sem energia.", "isso descreve HD, SSD e ROM."), ("de armazenamento permanente.", "RAM é temporária."), ("memória secundária.", "a secundária é HD/SSD."), ("memória de leitura apenas.", "isso descreve ROM.")],
  ["A RAM guarda os dados em uso.", "Ela precisa de energia para manter o conteúdo.", "Por isso é volátil."], "RAM: rápida e volátil.", "Classificação da RAM.")
Q(CO, "Dados organizados em tabelas, com campos e tipos definidos, como em um cadastro de pessoas, são classificados como:", "dados estruturados.",
  [("dados não estruturados.", "são textos livres, imagens, áudio e vídeo."), ("dados criptografados.", "criptografia é outro conceito."), ("dados voláteis.", "volatilidade trata da memória."), ("dados redundantes.", "redundância é repetição.")],
  ["A organização em tabelas com campos definidos é um modelo rígido.", "Esse modelo caracteriza dados estruturados.", "Textos livres e vídeos são não estruturados."], "Tabela com campos: estruturado.", "Classificação de dados.")
Q(CO, "Um arquivo de vídeo gravado por uma câmera de segurança é exemplo de dado:", "não estruturado.",
  [("estruturado.", "não tem campos e tipos definidos como em tabela."), ("relacional.", "não segue o modelo relacional."), ("criptográfico.", "criptografia é outro conceito."), ("volátil.", "volatilidade é característica de memória.")],
  ["Vídeos não seguem tabela com campos definidos.", "São dados sem estrutura rígida.", "Classificam-se como não estruturados."], "Vídeo, áudio, imagem, texto livre: não estruturados.", "Classificar dado multimídia.")
Q(CO, "A relação correta entre bit e byte é:", "1 byte equivale a 8 bits.",
  [("1 bit equivale a 8 bytes.", "inverte a relação."), ("1 byte equivale a 4 bits.", "a relação é 8, não 4."), ("1 byte equivale a 16 bits.", "a relação é 8, não 16."), ("1 bit equivale a 1.000 bytes.", "não há essa relação.")],
  ["O bit é a menor unidade de informação.", "Oito bits formam um byte.", "Um byte representa, por exemplo, um caractere."], "1 byte = 8 bits.", "Relação bit–byte.")
Q(CO, "Um SSD, em comparação a um HD tradicional, caracteriza-se por:", "usar memória flash, sem partes móveis, e ser em geral mais rápido.",
  [("usar discos magnéticos giratórios.", "isso descreve o HD."), ("ser memória volátil como a RAM.", "o SSD é não volátil."), ("ser sempre mais lento.", "em geral, é mais rápido."), ("não armazenar dados permanentemente.", "armazena de forma permanente.")],
  ["O HD tem discos giratórios e cabeça de leitura.", "O SSD usa memória flash, sem partes móveis.", "Por isso costuma ser mais rápido e silencioso."], "SSD: flash, sem partes móveis.", "Comparar SSD e HD.")
# --- Sistemas operacionais e aplicativos (5)
Q(SO, "Entre os formatos de compactação abaixo, o que NÃO descarta informações do arquivo original é o:", "ZIP.",
  [("JPEG.", "compressão com perda para imagens."), ("MP3.", "compressão com perda para áudio."), ("MP4 com compressão agressiva.", "vídeos usam compressão com perda."), ("GIF animado reduzido.", "reduções de qualidade descartam informação.")],
  ["Compactação sem perda recupera o original integralmente.", "ZIP é sem perda.", "JPEG e MP3 descartam informações."], "ZIP: sem perda; JPEG e MP3: com perda.", "Compactação sem perda.")
Q(SO, "No sistema operacional Linux, o comando que lista os arquivos de uma pasta é:", "ls",
  [("cd", "muda de pasta."), ("rm", "remove arquivos."), ("cp", "copia arquivos."), ("pwd", "mostra a pasta atual.")],
  ["Listar é mostrar o conteúdo da pasta.", "No Linux isso é feito com ls.", "cd muda de pasta; cp copia; rm remove."], "ls lista.", "Comando ls.")
Q(SO, "O Linux é um sistema operacional que se caracteriza por:", "ter código aberto e várias distribuições.",
  [("ser exclusivo de uma única empresa.", "tem várias distribuições."), ("não permitir alteração do código.", "o código é aberto."), ("ser usado apenas em celulares.", "é usado em servidores, desktops e celulares."), ("ser um programa de planilhas.", "é sistema operacional.")],
  ["O Linux é software livre.", "O código-fonte é aberto e pode ser modificado.", "Existem diversas distribuições, como Ubuntu e Debian."], "Linux: código aberto e distribuições.", "Características do Linux.")
Q(SO, "A extensão de arquivo .csv corresponde, em regra, a:", "dados em texto simples, separados por vírgulas ou ponto e vírgula, abríveis em planilhas.",
  [("uma imagem comprimida.", "imagens são .jpg ou .png."), ("um vídeo de alta resolução.", "vídeos são .mp4, por exemplo."), ("um programa executável.", "executáveis são .exe."), ("um arquivo compactado.", "compactados são .zip ou .rar.")],
  ["CSV vem de 'comma-separated values'.", "Guarda dados tabulares em texto simples.", "Planilhas abrem arquivos CSV."], "CSV: dados de tabela em texto.", "Extensão .csv.")
Q(SO, "No Linux, o comando que mostra o diretório (pasta) em que o usuário se encontra é:", "pwd",
  [("ls", "lista arquivos."), ("cp", "copia."), ("rm", "remove."), ("mv", "move ou renomeia.")],
  ["Precisa-se saber 'onde estou'.", "O comando que mostra o caminho atual é pwd.", "ls lista arquivos; cd muda de pasta."], "pwd = onde estou.", "Comando pwd.")
salvar()
