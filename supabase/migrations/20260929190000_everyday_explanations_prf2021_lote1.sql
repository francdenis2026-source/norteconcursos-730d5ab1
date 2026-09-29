-- PRF 2021 (Polícia Rodoviária Federal, CEBRASPE, "julgue o item") — lote 1:
-- revisão e explicação didática dos itens de Informática que são
-- assertivas verdadeiramente autocontidas (sem depender de texto motivador,
-- figura ou enunciado de cenário armazenados fora de question_text).
--
-- Fonte exata dos enunciados/gabarito: CTE `imported` de
-- 20260927080000_fix_pf_prf_2021_collision.sql (item_number, statement,
-- official_answer), com a correção posterior do item 34 aplicada em
-- 20260927420100_fix_official_answer_keys_prf_depen.sql (gabarito definitivo
-- corrigido de C para E) e o career_name já normalizado para
-- 'Polícia Rodoviária Federal' por 20260927350000_fix_prf_2021_career_name_again.sql.
--
-- Itens do bloco Informática (33-39 pelo topic_map) cobertos: 33-38.
-- Item 39 tem official_answer='X' (anulado) e nunca é tocado.
--
-- Itens explicitamente NÃO cobertos nesta lote, mesmo estando dentro da
-- faixa 10-15 sugerida, porque dependem de conteúdo motivador que não está
-- armazenado em question_text (mesma cautela das lotes de PC-AC/PP-Acre
-- abortadas):
--   - Língua Estrangeira-Inglês (1-8): remetem a "the text"/"the last
--     paragraph of the text", um texto em inglês não presente na coluna.
--   - Língua Portuguesa (9-26): remetem a "o texto", "o segundo parágrafo
--     do texto" etc. de uma coletânea de leitura não armazenada.
--   - Raciocínio Lógico-Matemático (27-32): remetem a "a modelagem
--     realizada", "o espalhamento de uma notícia" (função/gráfico de um
--     modelo matemático) e a uma "operação" de fiscalização com números que
--     não aparecem no enunciado — dependem de figura/tabela ausente.
--   - Física (40-44): remetem a "o projétil", "a mola", "o bloco de
--     madeira e a mesa horizontal", "a colisão" de um experimento cujo
--     desenho/dados (massas, velocidades, alturas, coeficientes) não estão
--     em question_text — impossível julgar com honestidade sem esse
--     contexto.
-- Ética no Serviço Público, Geografia dos Transportes, Direito de Trânsito,
-- Direito Administrativo, Direito Constitucional, Direito Penal e
-- Processual Penal e Direitos Humanos ficam para lotes futuras (a maioria
-- exige verificação de vigência legal, fora do escopo desta lote rápida de
-- itens não jurídicos).

-- 33: Errado. O recurso de salvar/sincronizar senhas e fazer login
-- automático em formulários funciona em qualquer site da Internet (não só
-- em intranet) e não depende de o site usar HTTPS para a sincronização em
-- si funcionar — HTTPS é recomendável por segurança, mas não é pré-requisito
-- do recurso do navegador.
update public.official_exam_questions set review_note=$q$Errado. O recurso de salvar e sincronizar senhas para fazer login automático em formulários — presente nas versões atuais do Mozilla Firefox e do Google Chrome — funciona em sites da Internet aberta normalmente, e não apenas em ambientes de intranet. Também não é verdade que só funcione em sites com HTTPS: o navegador consegue preencher o login em qualquer página com formulário de senha salva, embora seja mais seguro usar HTTPS. A afirmação erra ao criar essas duas restrições (só intranet e só HTTPS) que não existem de fato.
Exemplo: quando você salva a senha de um site de notícias qualquer (não é intranet de empresa nenhuma) e o Chrome depois preenche o login sozinho, isso já mostra que o recurso não é exclusivo de intranet nem depende de HTTPS para acontecer.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Polícia Rodoviária Federal$q$ and item_number=33 and content_status='under_review';

-- 34: Errado (gabarito definitivo corrigido de C para E — ver
-- 20260927420100_fix_official_answer_keys_prf_depen.sql). O recurso de
-- sincronização de configurações do Windows (mesma conta Microsoft em
-- várias máquinas) inclui, sim, a opção de sincronizar senhas salvas —
-- não é um compartilhamento vedado por segurança.
update public.official_exam_questions set review_note=$q$Errado. No Windows, o recurso de sincronização de configurações entre computadores que usam a mesma conta Microsoft inclui uma opção específica para sincronizar senhas salvas (ao lado de outras opções, como tema, favoritos e configurações de idioma). Ou seja, o compartilhamento de senhas entre as máquinas do mesmo usuário é, sim, permitido pelo próprio sistema — não existe uma vedação "por segurança" para esse item específico, como afirma a assertiva.
Exemplo: é como configurar a mesma conta de e-mail em dois celulares e ela vir com a senha salva nos dois — o Windows oferece esse mesmo tipo de conveniência entre PCs vinculados à mesma conta Microsoft, incluindo as senhas.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Polícia Rodoviária Federal$q$ and item_number=34 and content_status='under_review';

-- 35: Errado. O operador correto do Google para restringir a busca a um
-- domínio/site é "site:", não "@" seguido do nome da rede. O "@" no Google
-- é usado para buscar por menções/handles de rede social, não para
-- restringir a pesquisa à plataforma Twitter como um todo.
update public.official_exam_questions set review_note=$q$Errado. Para restringir uma busca do Google a um site ou domínio específico, o operador correto é "site:", como em site:twitter.com. O símbolo "@" antes do nome de uma rede social não funciona como filtro de "busque dentro dessa plataforma" — ele é usado para localizar perfis/menções (handles) daquele termo. Assim, digitar "campanha PRF @twitter" não faz o Google pesquisar exclusivamente publicações dentro do Twitter contendo "PRF" e "campanha"; a sintaxe descrita está incorreta para esse objetivo.
Exemplo: para achar posts sobre "campanha PRF" só dentro do Twitter, o jeito correto seria algo como campanha PRF site:twitter.com — não campanha PRF @twitter.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Polícia Rodoviária Federal$q$ and item_number=35 and content_status='under_review';

-- 36: Certo. Afirmação direta e correta sobre IoT aumentando volume,
-- velocidade e variedade de dados (características clássicas do big data).
update public.official_exam_questions set review_note=$q$Certo. A Internet das Coisas (IoT) conecta um número cada vez maior de sensores e dispositivos que geram dados o tempo todo, em formatos variados (temperatura, localização, imagens, sinais de sensores etc.) e em alta velocidade. Isso aumenta diretamente características clássicas do big data, como volume (mais dados), velocidade (dados chegando em tempo real) e variedade (tipos diferentes de dados) — por isso a afirmação está correta.
Exemplo: uma frota de caminhões com sensores de GPS e de temperatura de carga gera, a cada minuto, milhares de novos registros de dados variados — é exatamente esse tipo de crescimento que a IoT provoca sobre o big data.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Polícia Rodoviária Federal$q$ and item_number=36 and content_status='under_review';

-- 37: Errado. A definição descrita ("insere cópias de si mesmo em arquivos")
-- é a de vírus de computador, não a de ransomware, cujo comportamento
-- característico é sequestrar/criptografar os dados da vítima e exigir
-- resgate.
update public.official_exam_questions set review_note=$q$Errado. A definição apresentada — programa que se propaga inserindo cópias de si mesmo em outros arquivos — é a de um vírus de computador, e não a de um ransomware. O ransomware é o malware que, tipicamente, criptografa (torna inacessíveis) os arquivos da vítima e exige o pagamento de um resgate para restabelecer o acesso; seu traço definidor não é a autorreplicação por inserção em arquivos, e sim o sequestro de dados seguido de cobrança.
Exemplo: um vírus é como uma doença contagiosa que se copia de arquivo em arquivo; já o ransomware é mais parecido com um sequestro — ele tranca seus arquivos (como quem tranca um cofre) e só devolve a chave mediante pagamento.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Polícia Rodoviária Federal$q$ and item_number=37 and content_status='under_review';

-- 38: Errado. A descrição ("ambiente cloud onde o usuário constrói e
-- disponibiliza aplicativos") é a de PaaS, não de SaaS, que oferece
-- aplicativos prontos para uso, não uma plataforma de desenvolvimento.
update public.official_exam_questions set review_note=$q$Errado. A descrição do item — um provedor que oferece acesso a um ambiente em nuvem no qual os usuários podem construir e disponibilizar seus próprios aplicativos — corresponde ao modelo PaaS (Plataforma como Serviço), e não ao SaaS (Software como Serviço). No SaaS, o provedor entrega o próprio aplicativo já pronto para uso (como um webmail ou uma planilha online), e o usuário apenas o utiliza, sem precisar desenvolver nada.
Exemplo: usar o Gmail pronto é SaaS; já alugar uma plataforma na nuvem para você mesmo programar e publicar um aplicativo novo é PaaS — o item descreve esse segundo caso, mas o rotula (erradamente) como SaaS.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Polícia Rodoviária Federal$q$ and item_number=38 and content_status='under_review';
