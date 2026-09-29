-- Explicações do dia a dia (piloto): PF 2014 (Agente), Língua Portuguesa e Informática, itens 26-36.
-- Só atualiza se o gabarito gravado for o esperado; assim nunca sobrescreve item cujo gabarito foi corrigido depois.
-- O treinador mostra o trecho após 'Exemplo:' em um bloco próprio.
update public.official_exam_questions set review_note=$q$O item erra ao dizer que a comunicação pode ser feita em nome da pessoa. Pelo Manual de Redação da Presidência da República, toda comunicação oficial fala em nome do serviço público, nunca em nome pessoal de quem assina. Quem assina é só o representante do órgão.
Exemplo: quando o delegado assina um ofício, quem 'fala' é a Polícia Federal, não o Fulano. Por isso o texto é impessoal ('Informo que este órgão...') e não algo como 'eu acho que'.$q$
where exam_year=2014 and item_number=26 and career_name='Agente de Polícia Federal' and official_answer='E';
update public.official_exam_questions set review_note=$q$O que compartilha o padrão ofício são o aviso, o ofício e o memorando. A 'mensagem' não faz parte desse grupo: ela tem formato próprio, usada pelo Presidente da República para se comunicar com o Congresso. Trocar um item da lista é a pegadinha.
Exemplo: pense em três primos que usam o mesmo sobrenome (aviso, ofício, memorando). A 'mensagem' é um vizinho: mora perto, mas não é da família.$q$
where exam_year=2014 and item_number=27 and career_name='Agente de Polícia Federal' and official_answer='E';
update public.official_exam_questions set review_note=$q$Correto. O Manual manda identificar quem assina com nome e cargo, exceto nos expedientes do Presidente da República, que levam só o nome. Nos demais, o cargo mostra com que autoridade a pessoa assina.
Exemplo: ao pé de um ofício da delegacia aparece 'Maria Souza, Delegada de Polícia Federal'. Sem o cargo, ninguém saberia se ela tinha poder para determinar aquilo.$q$
where exam_year=2014 and item_number=28 and career_name='Agente de Polícia Federal' and official_answer='C';
update public.official_exam_questions set review_note=$q$Correto. 'Vossa Excelência' é o tratamento para as autoridades dos Poderes: Presidente, ministros, governadores, secretários de Estado, deputados, juízes e outros. Secretário de segurança pública estadual é secretário de Estado, então recebe 'Vossa Excelência'.
Exemplo: ao escrever para o Secretário de Segurança do seu estado, comece com 'Senhor Secretário,' e use 'Vossa Excelência' no corpo do texto.$q$
where exam_year=2014 and item_number=29 and career_name='Agente de Polícia Federal' and official_answer='C';
update public.official_exam_questions set review_note=$q$O erro está em 'qualquer tipo de expediente'. Os fechos variam conforme quem recebe: 'Respeitosamente' é para autoridades de hierarquia superior (inclusive o Presidente), e 'Atenciosamente' para as de mesma hierarquia ou inferior. Não dá para usar um fecho só em tudo.
Exemplo: é como a roupa: para falar com o chefe você usa 'Respeitosamente'; para um colega de mesma função, 'Atenciosamente'.$q$
where exam_year=2014 and item_number=30 and career_name='Agente de Polícia Federal' and official_answer='E';
update public.official_exam_questions set review_note=$q$O item promete uma vantagem que nenhum sistema operacional tem. Se a energia cai de repente, qualquer computador pode perder dados que ainda não foram gravados no disco, no Linux, no Windows ou em qualquer outro. Só nobreak ou salvar com frequência protege.
Exemplo: você digita um texto sem salvar e a luz acaba. O que estava só na memória some, seja qual for o sistema.$q$
where exam_year=2014 and item_number=31 and career_name='Agente de Polícia Federal' and official_answer='E';
update public.official_exam_questions set review_note=$q$Correto. No Word 2013, o menu Inserir tem 'Imagens' (arquivo do próprio computador ou de um local da rede) e 'Imagens Online' (busca na Web). Portanto dá para inserir figura de qualquer um desses lugares.
Exemplo: para colocar a foto de um suspeito no relatório, você clica em Inserir > Imagens e escolhe a foto salva na pasta da rede da delegacia.$q$
where exam_year=2014 and item_number=32 and career_name='Agente de Polícia Federal' and official_answer='C';
update public.official_exam_questions set review_note=$q$A Mala Direta fica na guia 'Correspondências', não em Inserir. O item troca a guia, e a banca costuma cobrar exatamente o lugar de cada comando.
Exemplo: mala direta serve para mandar a mesma carta a muitas pessoas trocando só o nome, como uma convocação. Você a encontra em Correspondências > Iniciar Mala Direta.$q$
where exam_year=2014 and item_number=33 and career_name='Agente de Polícia Federal' and official_answer='E';
update public.official_exam_questions set review_note=$q$Correto. GRUB e LILO são os gerenciadores de inicialização do Linux: são eles que mostram o menu para escolher o sistema quando o computador liga. Ambos permitem digitar comandos em uma linha de comando para ajustar a inicialização.
Exemplo: é como a recepção de um prédio com vários andares (sistemas). GRUB e LILO perguntam 'para qual andar você quer ir?' e ainda deixam você digitar o destino.$q$
where exam_year=2014 and item_number=35 and career_name='Agente de Polícia Federal' and official_answer='C';
update public.official_exam_questions set review_note=$q$Correto. O PuTTY é um programa para Windows que se conecta a outro computador, por exemplo um servidor Linux, por SSH ou Telnet. Depois de conectado, o usuário digita comandos que são executados lá, à distância.
Exemplo: um técnico em casa, no Windows, usa o PuTTY para entrar no servidor Linux da delegacia e reiniciar um serviço sem sair da mesa.$q$
where exam_year=2014 and item_number=36 and career_name='Agente de Polícia Federal' and official_answer='C';
