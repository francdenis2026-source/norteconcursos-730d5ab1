-- Explicações do dia a dia: DEPEN 2021 (Departamento Penitenciário Nacional /
-- Agente Federal de Execução Penal, CEBRASPE) — lote 1: Raciocínio Lógico
-- (itens 20-24) e Microsoft Office/Informática (itens 25-30) do caderno.
--
-- Fonte: supabase/migrations/20260927003000_depen_2021_reimport_fixed.sql
-- (versão final e corrigida da reimportação; a de 20260927001000 foi a
-- primeira tentativa, substituída por esta). question_text ali é a
-- transcrição verbatim do caderno de provas fornecido pelo candidato, já
-- confirmada como texto real (não placeholder) por leitura direta das
-- 120 linhas da tabela `imported`. official_answer também já veio
-- conferido no gabarito definitivo (MATRIZ_541_DEPEN_008_00, CB2 e CG2).
--
-- NOTA: nesta base, career_name para DEPEN 2021 está gravado como
-- 'Departamento Penitenciário Nacional' (igual a contest_name), não como
-- 'Agente Federal de Execução Penal' — confirmado tanto na migração de
-- reimportação quanto na correção de gabarito
-- 20260927420100_fix_official_answer_keys_prf_depen.sql, que já usa
-- career_name=$q$Departamento Penitenciário Nacional$q$ para este concurso.
-- As cláusulas WHERE abaixo copiam esse valor literalmente.
--
-- Este lote foi escolhido por ser autossuficiente: cada item de Raciocínio
-- Lógico e de Informática traz todo o enunciado necessário para verificação
-- (proposições lógicas completas, ou afirmações de informática que não
-- dependem de texto-base/figura). Nenhum item jurídico foi incluído neste
-- lote (fica para um lote seguinte, com verificação em fonte oficial).
-- Nenhum item deste intervalo (20-30) tem official_answer='X' (anulado), então
-- todos os 11 itens são cobertos e viram content_status='active'.

-- 20: p^q <-> ~(p -> ~q) é tautologia. p->~q equivale a ~(p^q); logo
-- ~(p->~q) equivale a p^q. A bicondicional fica "p^q <-> p^q", que é sempre
-- verdadeira — tautologia confirmada.
update public.official_exam_questions set review_note=$q$Certo. Para resolver, vale lembrar que "p -> ~q" (se p, então não q) é logicamente igual a "~(p^q)" (não é verdade que p e q ao mesmo tempo) — são duas formas de dizer a mesma coisa. Então "~(p -> ~q)", que é a negação disso, fica igual a "p^q". A proposição do item vira, na prática, "p^q <-> p^q" — uma bicondicional de uma frase com ela mesma, que é sempre verdadeira, não importa se p e q são verdadeiros ou falsos. Por isso é mesmo uma tautologia.
Exemplo: é como perguntar "está chovendo se e somente se está chovendo?" — a resposta é sempre sim, porque os dois lados da comparação são exatamente a mesma coisa, só escritos de formas diferentes.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=20 and content_status='under_review';

-- 21: "Paola é feliz apenas se ela pinta um quadro" = p->q (condição
-- necessária), que equivale a ~(p^~q).
update public.official_exam_questions set review_note=$q$Certo. "Paola é feliz APENAS SE ela pinta um quadro" é uma condicional do tipo p -> q: pintar o quadro é condição necessária para ela ser feliz (não dá para ela ser feliz sem pintar). E "p -> q" é logicamente equivalente a "~(p^~q)", ou seja, "não é o caso de p ser verdadeiro e q ser falso ao mesmo tempo" — não dá para Paola ser feliz (p verdadeiro) sem pintar um quadro (q falso). É exatamente essa a leitura que o item propõe.
Exemplo: "você passa de ano apenas se estudar" quer dizer que não existe passar de ano sem estudar — é impossível "passar" (p verdadeiro) e "não estudar" (q falso) ao mesmo tempo, que é a mesma ideia de "~(p^~q)".$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=21 and content_status='under_review';

-- 22: soma total das fichas 1..20 = 210; dividida em 4 linhas, cada linha
-- precisaria somar 52,5 — número não inteiro, logo impossível.
update public.official_exam_questions set review_note=$q$Errado. A soma de todas as fichas de 1 a 20 é 210 (metade de 20 vezes 21, pela fórmula da soma dos primeiros números naturais). Se o tabuleiro tem 4 linhas e cada ficha entra em exatamente uma linha, para todas as linhas somarem o mesmo valor esse total (210) precisaria ser dividido em 4 partes iguais: 210 ÷ 4 = 52,5. Como não existe soma "meia unidade" de números inteiros, é impossível que as quatro linhas tenham exatamente a mesma soma — por isso o item está errado ao afirmar que essa distribuição é possível.
Exemplo: é como tentar dividir 7 balas igualmente entre 2 crianças sem partir nenhuma — não dá, porque 7 não é divisível por 2; aqui é a mesma ideia, só que com 210 fichas divididas por 4 linhas.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=22 and content_status='under_review';

-- 23: taxas de trabalho 1/15 e 1/25 por mês, trabalhando simultaneamente de
-- pontas opostas; tempo conjunto = 1/(1/15+1/25) = 75/8 = 9,375 meses < 10.
update public.official_exam_questions set review_note=$q$Errado. A construtora Gama faz 1/15 da estrada por mês, e a Delta faz 1/25 por mês. Trabalhando ao mesmo tempo, cada uma a partir de uma ponta, juntas elas fazem 1/15 + 1/25 = 5/75 + 3/75 = 8/75 da estrada por mês. Para terminar a estrada inteira (1 estrada completa), o tempo necessário é 1 ÷ (8/75) = 75/8 = 9,375 meses — ou seja, menos de 10 meses, e não mais de 10 meses como afirma o item.
Exemplo: é como duas pessoas pintando um muro em ritmos diferentes, cada uma de uma ponta: juntas elas terminam mais rápido do que qualquer uma sozinha, e o cálculo de "quanto cada uma faz por período" somado dá o ritmo conjunto — aqui esse ritmo conjunto termina o serviço antes dos 10 meses.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=23 and content_status='under_review';

-- 24: sim = 50% de não; logo não = 2/3 do total ≈ 66,7% > 60%.
update public.official_exam_questions set review_note=$q$Certo. Se a quantidade de respostas "sim" é igual a 50% da quantidade de respostas "não", pode-se chamar "não" de n e "sim" de 0,5n. O total de respostas é n + 0,5n = 1,5n. A proporção de respostas "não" no total é n ÷ 1,5n = 2/3, que é aproximadamente 66,7% — e isso é, de fato, mais do que 60% do total, confirmando o que o item afirma.
Exemplo: se 20 pessoas responderam "não" e 10 responderam "sim" (10 é metade de 20), o total é 30 respostas, e 20 de 30 é 66,7% — mais de 60%, na mesma proporção do item.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=24 and content_status='under_review';

-- 25: no MS Word em português, Ctrl+S é o atalho de "Sublinhado", não de
-- "Salvar" — pegadinha clássica de prova sobre atalhos localizados.
update public.official_exam_questions set review_note=$q$Certo. No MS Word instalado em português, o atalho de teclado Ctrl+S corresponde a "Sublinhado" (não a "Salvar", como muita gente pensa por costume com outros programas) — é um atalho localizado para o idioma do menu. Por isso, selecionar a palavra e, em seguida, clicar o botão de sublinhado na barra de ferramentas ou pressionar Ctrl+S produzem o mesmo resultado: a palavra fica sublinhada.
Exemplo: é como decorar que, em um teclado brasileiro configurado para o Word em português, Ctrl+S sublinha o texto — quem está acostumado com o inglês (onde Ctrl+U sublinha e Ctrl+S salva) costuma errar essa pegadinha, mas no Word em português o "S" é de "Sublinhado".$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=25 and content_status='under_review';

-- 26: Pincel de Formatação fica na aba "Página Inicial" (não "Arquivo") e
-- serve para copiar formatação, não para colorir/realçar palavras.
update public.official_exam_questions set review_note=$q$Errado. O botão Pincel de Formatação (Format Painter) fica na aba "Página Inicial" do MS Word, e não na aba "Arquivo". Além disso, sua função não é colorir ou realçar palavras: ele serve para copiar a formatação de um trecho de texto (fonte, tamanho, negrito, cor etc.) e aplicá-la a outro trecho, economizando o trabalho de formatar manualmente de novo. Para colorir ou realçar texto, o recurso certo é o botão de "Cor do Realce do Texto" ou "Cor da Fonte", também na aba Página Inicial.
Exemplo: é como usar um "copia e cola" só de estilo: se um título está em azul, negrito e tamanho 16, o Pincel de Formatação copia esse "visual" e aplica em outro texto — ele não pinta nada por conta própria, só repete uma formatação já existente.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=26 and content_status='under_review';

-- 27: é possível inserir uma planilha/tabela .xls como objeto OLE em um
-- documento Word e editá-la com a própria barra de ferramentas do Excel.
update public.official_exam_questions set review_note=$q$Certo. O Word permite inserir uma planilha do Excel (formato .xls) dentro de um documento como um objeto incorporado (via Inserir > Objeto > Planilha do Microsoft Excel, ou colando com a opção adequada). Ao clicar duas vezes nesse objeto, o próprio documento Word "empresta" temporariamente a barra de ferramentas e os comandos do Excel, permitindo editar a tabela com fórmulas, formatação de células etc., sem precisar abrir o Excel separadamente.
Exemplo: é parecido com colar um vídeo dentro de uma apresentação de slides — o vídeo continua "sendo" um vídeo, com seus próprios controles, mesmo estando dentro de outro programa; aqui a planilha continua "sendo" uma planilha do Excel, com os comandos do Excel, mesmo estando dentro de um documento do Word.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=27 and content_status='under_review';

-- 28: essa descrição (conectar empresa a clientes/fornecedores externos via
-- VPN) é de extranet, não de intranet (que é uso interno da organização).
update public.official_exam_questions set review_note=$q$Errado. O item descreve, na verdade, o conceito de extranet, não de intranet. Intranet é uma rede que usa as tecnologias da internet, mas de uso restrito e interno a uma organização (só funcionários acessam). Extranet é a extensão controlada dessa rede interna para incluir parceiros externos — como clientes ou fornecedores —, muitas vezes por meio de VPNs, justamente para permitir esse acesso externo de forma segura.
Exemplo: pense na intranet como o escritório de uma empresa, onde só os funcionários entram; a extranet seria como abrir uma sala de reuniões desse escritório para receber visitantes específicos (clientes, fornecedores) com uma "chave" própria (a VPN) — mas ainda assim, controlado e diferente do acesso público.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=28 and content_status='under_review';

-- 29: Power BI é ferramenta de dashboards/BI que integra dados de fontes e
-- formatos diferentes — descrição correta.
update public.official_exam_questions set review_note=$q$Certo. O Power BI é uma ferramenta de business intelligence (BI) da Microsoft usada para criar dashboards e visualizações de dados. Um de seus pontos fortes é justamente conseguir puxar dados de fontes separadas (planilhas, bancos de dados, serviços web etc.) e em formatos diferentes, integrando tudo em um único painel visual interativo — exatamente como o item descreve.
Exemplo: é como montar um painel único de controle de uma empresa juntando, numa mesma tela, números de vendas que estão numa planilha Excel, dados de estoque que estão num banco de dados e informações de um site — o Power BI puxa tudo isso e organiza em gráficos e indicadores num só lugar.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=29 and content_status='under_review';

-- 30: trojans (cavalos de Troia) podem ser instalados por outros
-- vírus/programas e também se espalhar por links/e-mails de phishing.
update public.official_exam_questions set review_note=$q$Certo. Os vírus do tipo cavalo de Troia (trojans) recebem esse nome porque se disfarçam de programas legítimos ou úteis para enganar o usuário. Eles podem, de fato, ser instalados por outros vírus ou programas maliciosos que já estejam no computador, mas também podem chegar de outras formas: por meio de links clicados durante a navegação na internet ou por e-mails falsos que tentam parecer confiáveis (phishing), induzindo a vítima a baixar ou executar o arquivo infectado.
Exemplo: é como o cavalo de Troia da lenda grega — parecia um presente inofensivo (o cavalo de madeira), mas escondia soldados dentro; da mesma forma, um trojan pode chegar disfarçado de anexo de e-mail "importante" ou de um link "interessante", e só depois de executado revela sua real função maliciosa.$q$, content_status='active'
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=30 and content_status='under_review';
