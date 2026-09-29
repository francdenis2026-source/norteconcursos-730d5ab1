-- Explicações do dia a dia: Informática, lote 1 — PF 2014 (itens 38, 39,
-- 41, 42, 47, 48) e PF 2018 (itens 61, 62, 64-69). Conteúdo técnico
-- (redes, nuvem, segurança) verificado por conhecimento de domínio —
-- não depende de legislação/Planalto.

-- 38: protocolos são PADRONIZADOS justamente pra funcionar entre sistemas operacionais diferentes, não específicos de cada um.
update public.official_exam_questions set review_note=$q$Errado. A própria função de um protocolo é permitir que computadores DIFERENTES (com sistemas operacionais diferentes) se comuniquem seguindo a mesma regra. Se cada sistema operacional tivesse seu próprio protocolo exclusivo, a internet simplesmente não funcionaria — é a padronização que permite Windows, Linux e Mac conversarem entre si.
Exemplo: é como o idioma dos aeroportos — pilotos de qualquer nacionalidade se comunicam em inglês na torre de controle. Se cada país usasse um "protocolo" de comunicação próprio, o tráfego aéreo internacional seria impossível.$q$
where exam_year=2014 and item_number=38 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 39: MAN pode sim usar tecnologia sem fio (ex.: WiMAX).
update public.official_exam_questions set review_note=$q$Errado. Redes MAN (metropolitanas, cobrindo uma cidade) podem perfeitamente usar tecnologia sem fio — o WiMAX, por exemplo, foi criado justamente pra cobrir áreas do tamanho de uma cidade sem precisar de cabos por toda parte.
Exemplo: uma prefeitura oferecendo internet Wi-Fi pública em vários bairros da cidade é um exemplo prático de rede metropolitana sem fio — nada impede essa combinação.$q$
where exam_year=2014 and item_number=39 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 41: computação em nuvem não impede a execução de aplicativos instalados localmente no computador.
update public.official_exam_questions set review_note=$q$Errado. A computação em nuvem oferece serviços rodando em servidores remotos, mas isso não "desliga" ou impede que programas já instalados no seu computador continuem rodando normalmente ali mesmo, localmente. As duas coisas coexistem sem problema.
Exemplo: você pode usar o Google Drive (nuvem) e, ao mesmo tempo, abrir o Bloco de Notas instalado no seu próprio computador — um não impede o outro.$q$
where exam_year=2014 and item_number=41 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 42: nuvem interliga máquinas com SOs diferentes trabalhando juntas — correto, é a proposta central do modelo.
update public.official_exam_questions set review_note=$q$Correto. Um dos pontos fortes da computação em nuvem é justamente não se importar com o sistema operacional de cada máquina envolvida — servidores Linux, Windows e outros podem trabalhar juntos por trás de uma mesma nuvem, de forma transparente pro usuário final.
Exemplo: quando você acessa o Gmail, não faz ideia (nem precisa) de quais sistemas operacionais rodam nos milhares de servidores do Google por trás daquele serviço — e provavelmente são vários tipos diferentes trabalhando juntos.$q$
where exam_year=2014 and item_number=42 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 47: firewall controla tráfego de rede, mas não protege contra ameaças que já estão DENTRO da rede.
update public.official_exam_questions set review_note=$q$Correto. O firewall funciona como um "porteiro" que filtra o que entra e sai pela borda da rede — mas se a ameaça já está por dentro (um funcionário mal-intencionado, um pen drive infectado plugado direto num computador interno), o firewall não tem como impedir, porque o ataque nunca passou pela porta que ele vigia.
Exemplo: um porteiro de prédio pode impedir estranhos de entrar, mas não consegue impedir um morador já de dentro de causar um problema — o controle dele é só na entrada.$q$
where exam_year=2014 and item_number=47 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 48: botnet = rede de máquinas "zumbis" controladas remotamente pelo invasor, sem o usuário perceber.
update public.official_exam_questions set review_note=$q$Correto. Um computador infectado por um bot vira parte de uma "botnet" — uma rede de máquinas "zumbis" que o invasor controla remotamente, usando-as, por exemplo, pra atacar outros alvos em massa. O dono do computador geralmente nem percebe que sua máquina está sendo usada assim.
Exemplo: é como um carro sendo "controlado a distância" sem o dono saber, usado numa fuga de assalto enquanto o dono pensa que o carro está parado garagem — a máquina infectada "trabalha" pro invasor sem o consentimento do usuário.$q$
where exam_year=2014 and item_number=48 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 61: 172.16.0.0-172.31.255.255 é faixa de IP PRIVADO (RFC 1918) — não é roteável na internet pública, então só pode ser um servidor da intranet.
update public.official_exam_questions set review_note=$q$Errado. O endereço 172.20.1.1 está dentro da faixa 172.16.0.0 a 172.31.255.255, reservada oficialmente para redes PRIVADAS/internas — esses endereços não existem "de verdade" na internet pública, só dentro de redes locais. Como Marta acessou esse endereço com sucesso, ele só pode ser um servidor da intranet da própria empresa, nunca da internet pública.
Exemplo: é como um ramal interno de telefone de uma empresa (tipo "ramal 1050") — funciona perfeitamente de dentro do prédio, mas não existe pra quem está ligando de fora; não é um número de telefone público.$q$
where exam_year=2018 and item_number=61 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 62: proxy pode intermediar tanto acesso à intranet quanto à internet pública.
update public.official_exam_questions set review_note=$q$Correto. Um servidor proxy funciona como um "intermediário" das conexões — ele pode ser configurado pra liberar acesso tanto aos sistemas internos da empresa (intranet) quanto a sites externos (internet pública), tudo passando por ele antes de chegar ao destino final.
Exemplo: é como uma recepção de prédio que direciona tanto visitantes pra salas internas quanto encaminha correspondências pra fora — o mesmo "ponto de passagem" serve pros dois sentidos.$q$
where exam_year=2018 and item_number=62 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 64: WHOIS consulta dados de REGISTRO de domínio (dono, data de registro), não faz tradução de URL pra IP — isso é função do DNS.
update public.official_exam_questions set review_note=$q$Errado. WHOIS é um serviço que mostra informações de REGISTRO de um domínio — quem é o dono, quando foi registrado, qual empresa administra. Ele não serve pra "traduzir" uma URL no endereço IP correspondente — essa tradução é trabalho do DNS (Sistema de Nomes de Domínio), um serviço completamente diferente.
Exemplo: WHOIS é como consultar o cartório de registro de imóveis pra saber quem é o dono de uma casa — não é o mesmo que usar o GPS pra descobrir o endereço físico dela (isso seria o papel do DNS).$q$
where exam_year=2018 and item_number=64 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 65: firewall e políticas de segurança PODEM bloquear a Área de Trabalho Remota — o item erra ao dizer que ela funcionaria "a despeito" dessas configurações.
update public.official_exam_questions set review_note=$q$Errado. As configurações de segurança e o firewall corporativo existem exatamente pra poder BLOQUEAR esse tipo de acesso remoto quando a empresa não quer permitir. Dizer que Marta vai conseguir acessar remotamente "a despeito" (independente) dessas configurações é o oposto da realidade — se o firewall bloquear a porta usada pela Conexão de Área de Trabalho Remota, o acesso simplesmente não vai funcionar.
Exemplo: é como dizer que você vai conseguir entrar num prédio "não importa o que o segurança da portaria decida" — não faz sentido, o segurança é justamente quem decide se você entra ou não.$q$
where exam_year=2018 and item_number=65 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 66: força bruta contra criptografia forte moderna é inviável na prática — a recomendação real é restaurar backups, não tentar quebrar a cifra.
update public.official_exam_questions set review_note=$q$Errado. Tentar "quebrar" por força bruta uma criptografia moderna e bem implementada levaria um tempo absurdamente longo (anos, séculos) mesmo com computadores potentes — não é uma solução prática pra recuperar dados sequestrados por ransomware. A forma recomendada de lidar com isso é ter backups atualizados e restaurá-los, evitando pagar resgate ou depender de quebrar a criptografia.
Exemplo: tentar "advinhar" a senha de um cofre bancário testando uma por uma levaria mais tempo que uma vida inteira — na prática, ninguém resolve um sequestro de cofre assim; a solução de verdade é ter uma cópia reserva do que estava guardado.$q$
where exam_year=2018 and item_number=66 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 67: descrição padrão dos vetores comuns de infecção por malware (anexos, mídias removíveis, páginas comprometidas, redes sociais, outros equipamentos).
update public.official_exam_questions set review_note=$q$Correto. Essa é uma lista bem completa (e real) dos principais jeitos de um vírus ou código malicioso entrar num sistema: um anexo infectado de email, um pen drive contaminado, um site comprometido, um link malicioso numa rede social, ou até vindo diretamente de outro equipamento já infectado na mesma rede.
Exemplo: é como listar todas as portas de entrada de uma casa que um ladrão poderia usar — porta da frente, janela, garagem, fundos — cada "porta" aqui é um jeito diferente do vírus entrar no sistema.$q$
where exam_year=2018 and item_number=67 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 68: 2FA pode combinar QUALQUER dois dos três fatores (algo que sabe, tem, ou é), em qualquer ordem — não há uma ordem obrigatória posse-depois-biometria.
update public.official_exam_questions set review_note=$q$Errado. A autenticação em dois fatores combina dois tipos diferentes de prova de identidade: algo que você SABE (senha), algo que você TEM (token, celular) ou algo que você É (biometria) — mas não existe uma ordem obrigatória de "primeiro posse, depois biometria". Pode ser senha + token, senha + biometria, token + biometria, em qualquer combinação e ordem que o sistema definir.
Exemplo: alguns bancos pedem senha + código por SMS (saber + ter); outros pedem senha + digital (saber + ser); nenhuma dessas combinações é "a única certa" — o importante é usar dois fatores DIFERENTES, não uma ordem fixa.$q$
where exam_year=2018 and item_number=68 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 69: exposição excessiva de dados pessoais facilita roubo/falsificação de identidade — afirmação padrão de conscientização em segurança.
update public.official_exam_questions set review_note=$q$Correto. Quanto mais dados pessoais uma pessoa expõe publicamente (data de nascimento, endereço, nome de familiares, rotina), mais fácil fica pra um criminoso montar um perfil falso em nome dela ou se passar por ela em golpes, fraudes financeiras e disseminação de mensagens falsas.
Exemplo: alguém que posta a rotina diária, o CPF em fotos de documentos e detalhes da família nas redes sociais está, sem perceber, entregando o "material bruto" que um golpista precisa pra se passar por ela.$q$
where exam_year=2018 and item_number=69 and career_name='Agente de Polícia Federal' and official_answer='C';
