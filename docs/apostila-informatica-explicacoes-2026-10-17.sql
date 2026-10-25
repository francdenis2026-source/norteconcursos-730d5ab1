-- Explicações com "Exemplo:" para os itens C/E da apostila de informática verificados em fonte (Cartilha CERT.br). Idempotente.
-- Formato do projeto: texto + linha 'Exemplo: ...' (ver splitExplanation em src/lib/questionFormat.ts).
begin;
alter table public.apostila_questoes_pendentes add column if not exists explicacao text;
update public.apostila_questoes_pendentes set explicacao='O hash é um "resumo" de tamanho fixo calculado sobre o arquivo. Se o arquivo mudar em qualquer detalhe durante a transmissão, o hash recalculado no destino será diferente, o que revela a perda de integridade.
Exemplo: ao baixar um programa, o site mostra o hash do arquivo original. Você calcula o hash do arquivo baixado; se os dois forem iguais, o arquivo chegou intacto.' where apostila='Questões de informática' and numero=23;
update public.apostila_questoes_pendentes set explicacao='Verificar a integridade de dados é uma das aplicações clássicas das funções hash, tanto em arquivos armazenados quanto em dados transmitidos (Cartilha do CERT.br, seção 9.2).
Exemplo: guardar à parte o hash de um backup permite saber, meses depois, se algum arquivo foi corrompido ou alterado.' where apostila='Questões de informática' and numero=24;
update public.apostila_questoes_pendentes set explicacao='A função hash aceita uma entrada de qualquer tamanho e sempre devolve um resultado de tamanho fixo (por exemplo, 256 bits no SHA-256). É isso que faz dela um "resumo".
Exemplo: um e-mail de uma linha e um vídeo de 2 GB geram, no SHA-256, hashes com exatamente o mesmo comprimento.' where apostila='Questões de informática' and numero=31;
update public.apostila_questoes_pendentes set explicacao='O worm não é um método para burlar autenticação; isso descreve o backdoor. O worm é um programa que se propaga sozinho pela rede, enviando cópias de si de computador para computador (Cartilha do CERT.br, seção 4.2).
Exemplo: um worm explora uma falha de um serviço de rede e se copia para todas as máquinas vulneráveis do escritório, sem que ninguém abra qualquer arquivo.' where apostila='Questões de informática' and numero=61;
update public.apostila_questoes_pendentes set explicacao='Definição da Cartilha do CERT.br: o worm é um programa capaz de se propagar automaticamente pelas redes, enviando cópias de si mesmo de computador para computador.
Exemplo: de repente a rede da empresa fica lenta porque milhares de cópias do mesmo programa se espalham entre os computadores.' where apostila='Questões de informática' and numero=62;
update public.apostila_questoes_pendentes set explicacao='O programa que aparenta ter uma finalidade atraente, mas esconde uma função maliciosa, é o cavalo de troia (trojan), e não o worm. O worm se espalha sozinho pela rede.
Exemplo: um "protetor de tela gratuito" que, ao ser instalado, também abre acesso remoto ao computador é um trojan.' where apostila='Questões de informática' and numero=63;
update public.apostila_questoes_pendentes set explicacao='O worm não precisa de hospedeiro: ele não se insere em outros programas ou arquivos. Quem depende de um programa hospedeiro é o vírus.
Exemplo: o vírus se anexa a uma planilha infectada e só age quando ela é aberta; o worm se copia sozinho pela rede, sem arquivo hospedeiro.' where apostila='Questões de informática' and numero=65;
update public.apostila_questoes_pendentes set explicacao='Worm é um tipo de código malicioso, e não um programa que combate vírus. Quem combate códigos maliciosos é o antimalware (antivírus).
Exemplo: o antivírus remove o worm do computador; o worm, por sua vez, só se copia e se espalha.' where apostila='Questões de informática' and numero=66;
update public.apostila_questoes_pendentes set explicacao='O bot é um programa parecido com o worm, com mecanismos de comunicação que permitem ao invasor controlá-lo remotamente. O conjunto de computadores infectados e controlados forma a botnet.
Exemplo: milhares de computadores domésticos infectados enviam requisições ao mesmo tempo a um site e o derrubam (ataque de negação de serviço distribuído).' where apostila='Questões de informática' and numero=67;
update public.apostila_questoes_pendentes set explicacao='Bots não ficam armazenados na área de boot do disco. São programas com comunicação remota com o invasor, que se propagam de forma semelhante ao worm, explorando vulnerabilidades.
Exemplo: um computador com sistema desatualizado é infectado pela rede por um bot e passa a receber comandos de um servidor do atacante.' where apostila='Questões de informática' and numero=69;
update public.apostila_questoes_pendentes set explicacao='A VPN cria uma rede privada sobre uma rede pública, como a Internet, e usa criptografia e outros mecanismos de segurança. Ela permite compartilhar arquivos, fazer videoconferência e usar serviços de rede por distâncias longas, de forma mais barata que um link dedicado.
Exemplo: uma funcionária em outra cidade acessa a pasta de rede do escritório como se estivesse lá, por meio da VPN da empresa.' where apostila='Questões de informática' and numero=158;
update public.apostila_questoes_pendentes set explicacao='As VPNs criam túneis em redes públicas e usam algoritmos criptográficos, com gerenciamento eficiente de chaves, para dar a esses túneis um nível de segurança equivalente ao de uma rede privada.
Exemplo: o tráfego entre o notebook de um analista em viagem e a sede da empresa viaja cifrado dentro do túnel, mesmo passando pela Internet comum.' where apostila='Questões de informática' and numero=175;
update public.apostila_questoes_pendentes set explicacao='Na VPN site-to-site, dois gateways de rede (por exemplo, o roteador da matriz e o da filial) mantêm entre si um canal de comunicação criptografado, ligando as duas redes locais.
Exemplo: a filial de Rio Branco e a matriz trocam dados do sistema interno por um túnel cifrado entre os roteadores, sem que cada computador precise de VPN própria.' where apostila='Questões de informática' and numero=180;
commit;
