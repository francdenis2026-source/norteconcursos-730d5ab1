-- Explicações do dia a dia: Informática, lote 6 — SEFAZ-AC 2023 (item 19,
-- LGPD) e PF 2025 (itens 61-75: ferramentas, redes, nuvem, biometria,
-- Python). Conteúdo técnico geral verificado por conhecimento de
-- domínio; item 19 cita definição estável da LGPD (Art. 5º, sem
-- alteração de redação desde 2018).

-- 19: LGPD Art. 5º define dado anonimizado como aquele que não permite identificar o titular com meios técnicos razoáveis disponíveis.
update public.official_exam_questions set review_note=$q$Correto. A LGPD (Lei nº 13.709/2018), no Art. 5º, define "dado anonimizado" exatamente assim: aquele que passou por um processo que faz com que não seja mais possível identificar a pessoa a quem ele se refere, usando os meios técnicos disponíveis na época. É diferente de "dado pessoal" (que ainda identifica alguém) ou "dado sensível" (categoria especial, como saúde ou religião).
Exemplo: uma pesquisa que divulga "60% dos entrevistados de 25 a 35 anos preferem X" usa dados anonimizados — não dá pra saber quem respondeu o quê, mesmo sabendo o resultado geral.$q$
where exam_year=2023 and item_number=19 and career_name='Especialista da Fazenda Estadual' and official_answer='E';

-- 61 (2025): descrição correta de ferramentas de acesso remoto (Remote Desktop/TeamViewer) e suítes de escritório (Office/LibreOffice).
update public.official_exam_questions set review_note=$q$Correto. Microsoft Remote Desktop e TeamViewer realmente permitem controlar outro computador à distância, inclusive transferindo arquivos entre as máquinas. E tanto o Microsoft Office quanto o LibreOffice oferecem editor de texto, planilha e apresentação, com boa compatibilidade entre os formatos de arquivo um do outro (.docx, .xlsx, .pptx e equivalentes).
Exemplo: um técnico de TI usando o TeamViewer pra acessar remotamente o computador de outra pessoa e resolver um problema sem precisar estar fisicamente lá é um uso comum dessas ferramentas de acesso remoto.$q$
where exam_year=2025 and item_number=61 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 63: os comandos estão TROCADOS — ifconfig é do Linux/Unix; ipconfig é do Windows.
update public.official_exam_questions set review_note=$q$Errado. O item inverteu os dois comandos: "ifconfig" é o comando usado em distribuições Linux/Unix pra ver e configurar interfaces de rede; "ipconfig" é o equivalente no Windows. O item descreve exatamente o contrário do que é verdade.
Exemplo: é como trocar o nome de dois softwares parecidos de sistemas diferentes — mesma função, nomes quase iguais, mas cada um pertence ao seu próprio sistema operacional.$q$
where exam_year=2025 and item_number=63 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 64: firewall controla tráfego de rede; antivírus detecta/remove/previne pragas — papéis complementares corretos.
update public.official_exam_questions set review_note=$q$Correto. São duas ferramentas de segurança com papéis diferentes e complementares: o firewall cuida do TRÁFEGO que entra e sai da rede (como um porteiro que decide quem passa), enquanto o antivírus cuida do que já está (ou tenta entrar) no próprio sistema, detectando e removendo vírus e outras pragas.
Exemplo: o firewall é o segurança na porta do prédio; o antivírus é como um sistema de vigilância dentro dos apartamentos — cada um cobre uma parte diferente da proteção.$q$
where exam_year=2025 and item_number=64 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 65: IPv6 tem 128 bits, não 256 — esse único erro numérico já invalida a afirmação.
update public.official_exam_questions set review_note=$q$Errado. O IPv6 usa endereços de 128 bits, não 256 como o item afirma — esse já é um erro que basta pra invalidar a afirmação inteira. (O IPv4, aliás, está certo no item: usa mesmo 32 bits.) O dobro de bits do IPv6 em relação ao IPv4 é justamente o que permite uma quantidade absurdamente maior de endereços disponíveis.
Exemplo: é fácil confundir "128" com "256" (o dobro), mas o número certo do IPv6 é 128 bits — decorar esse número específico evita cair em pegadinhas assim.$q$
where exam_year=2025 and item_number=65 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 66: separação frontend/backend reflete a ideia de sistemas organizados em partes interdependentes (teoria geral de sistemas) — analogia válida.
update public.official_exam_questions set review_note=$q$Correto. Dividir um sistema em frontend (o que o usuário vê e interage) e backend (o processamento por trás) é um exemplo prático da ideia central da teoria geral de sistemas: organizar algo complexo em partes menores e interdependentes deixa mais fácil entender, manter e evoluir cada parte separadamente.
Exemplo: um aplicativo de banco tem uma tela bonita e fácil de usar (frontend) enquanto, por trás, sistemas complexos calculam saldo, processam transferências e verificam segurança (backend) — cada parte pode mudar sem necessariamente afetar a outra.$q$
where exam_year=2025 and item_number=66 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 67: computação em nuvem exige conexão com a internet — dados ficam em servidores remotos, não armazenados localmente.
update public.official_exam_questions set review_note=$q$Errado. É justamente o oposto: a computação em nuvem depende de uma conexão com a internet, porque os dados e serviços ficam armazenados em servidores remotos (a "nuvem"), não no próprio dispositivo do usuário. Sem internet, você simplesmente não consegue acessar esses recursos remotos.
Exemplo: sem internet, você não consegue abrir seus arquivos do Google Drive — eles não estão guardados no seu computador, estão em servidores do Google em algum lugar do mundo.$q$
where exam_year=2025 and item_number=67 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 68: a etapa de especificação não pode ser pulada — ela é o que orienta o que vai ser testado, homologado e colocado em produção.
update public.official_exam_questions set review_note=$q$Errado. A especificação é a etapa que define exatamente O QUE vai ser construído — pular direto pros ambientes de teste, homologação e produção não faz sentido, porque essas etapas seguintes precisam de algo concreto e bem definido (a especificação) pra saber o que testar e validar. Documentar bem os requisitos não substitui essa etapa, ela é justamente onde essa documentação vira uma especificação formal.
Exemplo: é como tentar montar um móvel direto, pulando o manual de instruções — mesmo sabendo o que você quer no fim, sem o "mapa" de como fazer, o processo fica bagunçado e sujeito a erro.$q$
where exam_year=2025 and item_number=68 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 70: mineração de dados usa métodos variados (não só supervisionados); Big Data existe justamente porque bancos relacionais tradicionais NÃO bastam.
update public.official_exam_questions set review_note=$q$Errado. Duas afirmações erradas no mesmo item: mineração de dados usa vários tipos de algoritmo, incluindo os NÃO supervisionados (como clustering), não só os supervisionados. E o Big Data existe justamente porque bancos de dados relacionais tradicionais NÃO conseguem lidar bem com os desafios de volume, variedade e velocidade — é por isso que tecnologias alternativas (NoSQL, processamento distribuído) foram criadas.
Exemplo: descobrir grupos de clientes parecidos sem saber de antemão quais grupos existem (clustering, não supervisionado) é tão mineração de dados quanto prever se um cliente vai cancelar um serviço com base em exemplos já rotulados (supervisionado) — os dois fazem parte da mesma área.$q$
where exam_year=2025 and item_number=70 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 71: as definições estão INVERTIDAS — estruturados têm formato rígido/tabelas relacionais; não estruturados não têm formato fixo, frequentemente em NoSQL.
update public.official_exam_questions set review_note=$q$Errado. O item trocou as definições: dados ESTRUTURADOS são os que têm formato fixo e cabem bem em tabelas relacionais; dados NÃO ESTRUTURADOS são os que não seguem um formato rígido (texto livre, imagem, áudio), muitas vezes armazenados em bancos NoSQL por não se encaixarem bem numa tabela tradicional. O item descreveu exatamente o contrário.
Exemplo: uma planilha de vendas com colunas fixas é dado estruturado; um vídeo de câmera de segurança, sem "colunas" pra se encaixar, é dado não estruturado.$q$
where exam_year=2025 and item_number=71 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 72: dados organizados viram informação; segurança da informação protege confidencialidade, integridade e disponibilidade (tríade CIA) — descrição padrão correta.
update public.official_exam_questions set review_note=$q$Correto. Dados brutos (fatos soltos) viram informação quando são organizados e ganham um contexto que faz sentido pra alguém. E a segurança da informação existe pra proteger essa informação contra acesso indevido, garantindo os três pilares clássicos: confidencialidade (só quem deve ver, vê), integridade (a informação não é alterada indevidamente) e disponibilidade (está acessível quando necessário).
Exemplo: os dados médicos de um paciente só fazem sentido como "informação" quando organizados num prontuário — e a segurança da informação garante que só a equipe autorizada acesse (confidencialidade), que ninguém altere o histórico sem permissão (integridade), e que o prontuário esteja disponível quando precisar dele numa emergência (disponibilidade).$q$
where exam_year=2025 and item_number=72 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 73: em sistemas de ALTA SEGURANÇA, o mais crítico é reduzir o FPIR (aceitar impostor), não o FNIR (rejeitar legítimo) — o item inverte a prioridade certa.
update public.official_exam_questions set review_note=$q$Errado. Em sistemas biométricos de ALTA segurança, o erro mais perigoso é o CONTRÁRIO do que o item afirma: aceitar um impostor (FPIR alto) é um risco de segurança muito mais grave do que rejeitar por engano um usuário legítimo (FNIR), que na pior das hipóteses só causa um incômodo (a pessoa tenta de novo). Por isso, sistemas de alta segurança priorizam reduzir o FPIR, mesmo que isso aumente um pouco o FNIR.
Exemplo: é melhor um sistema de segurança de um cofre bancário barrar por engano o dono algumas vezes (incômodo, resolve tentando de novo) do que deixar um estranho entrar se passando por ele (risco grave de segurança).$q$
where exam_year=2025 and item_number=73 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 74: FPIR (falsa aceitação) sobe quando o limiar de decisão fica frouxo demais, permitindo entrada de usuários não autorizados.
update public.official_exam_questions set review_note=$q$Correto. Quando o limiar de decisão de um sistema biométrico é ajustado de forma frouxa demais (fácil demais de "passar"), aumenta a chance de aceitar por engano alguém que não deveria ser aceito — é exatamente isso que o FPIR (taxa de falsa aceitação) mede, e um limiar mal calibrado é uma das causas diretas desse problema.
Exemplo: é como um leitor de digital configurado "sensível demais", que às vezes libera o acesso mesmo com uma digital parecida, mas não idêntica — um ajuste mal feito que compromete a segurança.$q$
where exam_year=2025 and item_number=74 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 75: lambda em Python cria funções anônimas usáveis como argumento em funções de ordem superior — fato correto sobre a linguagem.
update public.official_exam_questions set review_note=$q$Correto. A palavra-chave "lambda" em Python cria uma função pequena e sem nome (anônima), útil quando você precisa de uma função rápida só pra usar uma vez, como argumento de outra função (como map, filter ou sorted) — um recurso típico de programação funcional.
Exemplo: usar "sorted(lista, key=lambda x: x[1])" pra ordenar uma lista pelo segundo valor de cada item é um uso clássico — não precisa criar uma função com nome só pra essa ordenação pontual.$q$
where exam_year=2025 and item_number=75 and career_name='Agente de Polícia Federal' and official_answer='C';
