-- Explicações do dia a dia: Informática, lote 7 (FINAL) — PF 2025, itens
-- 76-96. Fecha as 104 questões da matéria.

-- 76: full-duplex não exige sincronismo de clock entre dispositivos — só exige canais/caminhos separados pros dois sentidos.
update public.official_exam_questions set review_note=$q$Errado. Full-duplex significa que dados podem trafegar nos dois sentidos AO MESMO TEMPO, geralmente porque existem canais separados pra cada direção — isso não tem relação com os dispositivos estarem "sincronizados no mesmo clock lógico de rede", um conceito diferente, de outra área da transmissão de dados.
Exemplo: é como uma rodovia com pistas separadas de ida e volta — os carros dos dois sentidos passam ao mesmo tempo sem precisar estar "sincronizados" um com o outro, só precisam ter pistas próprias.$q$
where exam_year=2025 and item_number=76 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 77: fragmentação/reconstrução de pacotes IP é função da camada de REDE, não da camada de sessão.
update public.official_exam_questions set review_note=$q$Errado. A camada de sessão do OSI cuida de abrir, gerenciar e encerrar "conversas" (sessões) entre aplicações — não tem nada a ver com fragmentar ou remontar pacotes IP. Essa tarefa é da camada de REDE, onde o protocolo IP realmente atua.
Exemplo: a camada de sessão é como controlar o início e fim de uma ligação telefônica; fragmentar e remontar pacotes é mais parecido com organizar como o som da ligação é dividido tecnicamente pra viajar pela rede — tarefas de "andares" bem diferentes.$q$
where exam_year=2025 and item_number=77 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 78: listas em Python são MUTÁVEIS — por isso NÃO podem ser chave de dicionário (chaves precisam ser imutáveis).
update public.official_exam_questions set review_note=$q$Errado. É o contrário: listas em Python são MUTÁVEIS (dá pra alterar seus itens depois de criadas) — e justamente por isso NÃO podem ser usadas como chave de dicionário, porque chaves de dict precisam ser imutáveis (como números, strings ou tuplas). Tentar usar uma lista como chave gera erro.
Exemplo: é como tentar usar um post-it que você pode apagar e reescrever como "etiqueta permanente" de uma gaveta — não funciona, porque a etiqueta (chave) precisa ser algo fixo, que não muda depois de colada.$q$
where exam_year=2025 and item_number=78 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 79: controlar totalmente hardware e SO é característica da IaaS, não da PaaS (PaaS abstrai justamente essa camada).
update public.official_exam_questions set review_note=$q$Errado. Quem quer controlar totalmente o hardware e o sistema operacional deve escolher IaaS, não PaaS. A PaaS existe justamente pra abstrair (esconder) essas camadas mais baixas, entregando uma plataforma pronta pra desenvolver aplicações sem se preocupar com o hardware ou o SO por trás.
Exemplo: quem quer "colocar a mão na massa" na configuração do computador escolhe IaaS (o terreno vazio); quem só quer construir a aplicação sem se preocupar com isso escolhe PaaS (a casa pré-fabricada).$q$
where exam_year=2025 and item_number=79 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 80: definição-padrão de aprendizado supervisionado (dados rotulados → previsões em dados novos).
update public.official_exam_questions set review_note=$q$Correto. Aprendizado supervisionado é treinar um algoritmo com exemplos já "respondidos" (rotulados) — tipo fotos já marcadas como "gato" ou "cachorro" — pra que ele aprenda o padrão e consiga classificar corretamente exemplos novos, nunca vistos antes.
Exemplo: é como ensinar alguém a reconhecer frutas mostrando várias fotos já identificadas ("isso é maçã", "isso é banana") até a pessoa conseguir identificar uma fruta nova sozinha.$q$
where exam_year=2025 and item_number=80 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 81: chmod 755 = dono(7=rwx), grupo(5=r-x), outros(5=r-x) — exatamente o que o item descreve.
update public.official_exam_questions set review_note=$q$Correto. Cada número do chmod representa um grupo de permissões: 7 (leitura+escrita+execução) pro dono do arquivo, 5 (leitura+execução, sem escrita) pro grupo, e 5 (leitura+execução) pros outros usuários. "755" bate exatamente com essa descrição.
Exemplo: é como dar a chave mestra de uma sala só pro dono (pode fazer tudo), e chaves mais limitadas (só entrar e usar, não modificar nada) pros demais.$q$
where exam_year=2025 and item_number=81 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 82: IaaS entrega recursos virtuais de infraestrutura, mas o gerenciamento do sistema operacional fica com o cliente — característica que a distingue de PaaS/SaaS.
update public.official_exam_questions set review_note=$q$Correto. Na IaaS, o provedor entrega a infraestrutura básica (servidores virtuais, armazenamento, rede), mas quem instala, configura e mantém o sistema operacional por cima disso é o próprio cliente — diferente da PaaS, onde o provedor também cuida do sistema operacional e da plataforma.
Exemplo: é como alugar um terreno com fundação pronta — você ainda precisa construir e cuidar da casa (o sistema operacional) por conta própria; o dono do terreno só garante a base.$q$
where exam_year=2025 and item_number=82 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 83: DNS tradicional NÃO tem criptografia embutida — é historicamente um protocolo em texto claro.
update public.official_exam_questions set review_note=$q$Errado. O DNS clássico não foi criado com criptografia embutida — as consultas tradicionalmente trafegam em texto claro, sem proteção de confidencialidade nativa. (Existem extensões mais modernas, como DNS sobre HTTPS, que adicionam criptografia, mas isso não é uma característica do protocolo DNS "desde a concepção" como o item afirma.)
Exemplo: é como enviar um cartão postal (visível pra quem interceptar no caminho) em vez de uma carta lacrada — o DNS tradicional funciona mais como o cartão postal, sem selo de sigilo embutido de fábrica.$q$
where exam_year=2025 and item_number=83 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 84: DNS usa UDP na maioria das consultas, mas TCP pra transferência de zona ou respostas grandes (>512 bytes) — comportamento real e documentado do protocolo.
update public.official_exam_questions set review_note=$q$Correto. O DNS prefere UDP por ser mais rápido pra consultas simples do dia a dia, mas troca pra TCP quando a resposta é grande demais pra caber no limite do UDP (tradicionalmente 512 bytes) ou quando é preciso transferir uma "zona" inteira (uma cópia completa de um conjunto de registros) entre servidores.
Exemplo: é como usar uma mensagem de texto rápida pra perguntas simples, mas trocar pra uma ligação telefônica quando o assunto é grande demais pra caber numa mensagem — cada meio serve melhor pra um tipo de situação.$q$
where exam_year=2025 and item_number=84 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 86: token de hardware = dispositivo físico gerador de código, ou autenticação via porta USB — definição padrão de MFA.
update public.official_exam_questions set review_note=$q$Correto. Hardware tokens são dispositivos físicos criados especificamente pra autenticação — podem gerar um código numérico que muda a cada minuto, ou se conectar direto numa porta USB pra provar que você tem aquele objeto físico em mãos. É o fator "algo que você TEM" na autenticação multifator.
Exemplo: aquele "chaveiro" que alguns bancos entregam, com um número que muda periodicamente na telinha, é um hardware token clássico.$q$
where exam_year=2025 and item_number=86 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 87: sandboxing existe justamente pra ISOLAR a execução — não altera o sistema principal, esse é o ponto central da técnica.
update public.official_exam_questions set review_note=$q$Errado. É o oposto do que o item afirma: o sandboxing cria um ambiente ISOLADO justamente pra que um programa suspeito rode sem conseguir afetar o sistema principal, mesmo que ele seja malicioso. Se o sandboxing "alterasse o sistema principal", ele perderia completamente sua utilidade como ferramenta de segurança.
Exemplo: é como testar uma receita nova numa cozinha separada, isolada da cozinha principal do restaurante — se der errado, não estraga nada do funcionamento normal do lugar.$q$
where exam_year=2025 and item_number=87 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 88: detecção heurística analisa comportamento/estrutura do código, identificando malware mesmo sem assinatura conhecida — definição padrão.
update public.official_exam_questions set review_note=$q$Correto. Diferente da detecção por assinatura (que só reconhece vírus já catalogados), a detecção heurística observa COMO o programa se comporta e como o código está estruturado, permitindo identificar ameaças novas, ainda desconhecidas, que se parecem com padrões suspeitos já vistos antes.
Exemplo: é como um segurança desconfiar de alguém pelo comportamento estranho (mexendo em fechaduras, olhando câmeras) mesmo sem ter uma foto dessa pessoa específica na lista de procurados — a suspeita vem do padrão de comportamento, não de um reconhecimento direto.$q$
where exam_year=2025 and item_number=88 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 89: a propriedade de consistência exige que a transação leve o banco de um estado CONSISTENTE pra outro estado CONSISTENTE — não parte de um estado inconsistente.
update public.official_exam_questions set review_note=$q$Errado. A propriedade de consistência (do ACID) diz que uma transação deve levar o banco de UM ESTADO CONSISTENTE pra OUTRO ESTADO CONSISTENTE — ela nunca deveria começar de um estado já inconsistente. O item inverte a lógica, sugerindo que a consistência "conserta" uma inconsistência prévia, o que não é a definição correta.
Exemplo: é como dizer que as regras de um jogo garantem que, partindo de um tabuleiro já montado corretamente, você termine a jogada com o tabuleiro ainda dentro das regras — as regras não existem pra "consertar" um tabuleiro que já começou bagunçado.$q$
where exam_year=2025 and item_number=89 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 90: atomicidade = "tudo ou nada"; a transação só é confirmada permanentemente depois que TODAS as operações tiverem sucesso.
update public.official_exam_questions set review_note=$q$Correto. Atomicidade significa que uma transação é tratada como uma unidade indivisível: ou todas as operações dela dão certo e são confirmadas juntas, ou nenhuma é aplicada (se algo falhar no meio do caminho, tudo é desfeito). Só depois que TUDO deu certo é que a transação vira permanente no banco.
Exemplo: uma transferência bancária só é "fechada" depois que o dinheiro sai de uma conta E entra na outra — se só uma das duas partes acontecer, o sistema desfaz tudo, pra não deixar dinheiro "sumindo" no meio do caminho.$q$
where exam_year=2025 and item_number=90 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 92: o SELECT só consulta os metadados já cadastrados (que dizem "valor_venda > 0"); não impõe nem sugere que os valores devam ser menores que zero.
update public.official_exam_questions set review_note=$q$Errado. Esse SELECT só está BUSCANDO a linha do catálogo referente à tabela "vendas" — ele não cria nem altera nenhuma regra. E mesmo olhando o que foi cadastrado nesse catálogo, a regra de negócio registrada diz "valor_venda > 0" (maior que zero), o exato oposto do que o item afirma.
Exemplo: consultar um cadastro que diz "idade mínima: 18 anos" não significa que o sistema está dizendo "a idade deve ser menor que 18" — é só uma leitura de uma informação já registrada, e nesse caso a informação diz o oposto do que o item afirmou.$q$
where exam_year=2025 and item_number=92 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 93: classificação e regressão são aplicações práticas clássicas de aprendizado de máquina.
update public.official_exam_questions set review_note=$q$Correto. Classificação (prever uma categoria, tipo "é spam ou não é spam") e regressão (prever um número, tipo "qual vai ser o preço de um imóvel") são dois dos usos mais comuns e práticos do aprendizado de máquina no mundo real.
Exemplo: um sistema que decide "esse email é spam" usa classificação; um que estima "quanto esse imóvel deveria custar" usa regressão — dois problemas do dia a dia resolvidos com a mesma área de tecnologia.$q$
where exam_year=2025 and item_number=93 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 95: overfitting é um problema real e bem documentado em aprendizado de máquina — o item nega algo que existe de fato.
update public.official_exam_questions set review_note=$q$Errado. Overfitting existe sim, e é um dos problemas mais conhecidos e estudados em aprendizado de máquina: acontece quando um modelo "decora" demais os dados de treino, indo tão bem neles que perde a capacidade de generalizar pra dados novos. Negar a existência do overfitting é negar um fenômeno amplamente documentado na área.
Exemplo: é como um aluno que decora as respostas exatas da prova de simulado, mas não entende o conteúdo de verdade — ele vai super bem no simulado (dados de treino) e mal na prova real (dados novos), exatamente o que overfitting descreve.$q$
where exam_year=2025 and item_number=95 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 96: APIs bem projetadas (especialmente REST) costumam ser STATELESS — cada requisição deve conter tudo que precisa, sem depender de estado de outras requisições.
update public.official_exam_questions set review_note=$q$Errado. Uma boa prática de design de API (principalmente as REST, muito usadas hoje) é justamente o CONTRÁRIO: ser "stateless" (sem estado) — cada requisição deve vir com todas as informações necessárias pra ser processada sozinha, sem depender de dados guardados de uma requisição anterior. Isso facilita a escalabilidade e a confiabilidade do sistema.
Exemplo: é como pedir um lanche já dizendo tudo que você quer numa única fala completa ("hambúrguer sem cebola, batata grande, refrigerante"), em vez de depender de o atendente lembrar detalhes que você mencionou numa visita anterior.$q$
where exam_year=2025 and item_number=96 and career_name='Agente de Polícia Federal' and official_answer='E';
