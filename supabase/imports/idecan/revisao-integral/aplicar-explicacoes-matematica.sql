-- IDECAN: 37 explicações aprovadas de matemática; 1 questão retida.
-- Execute inteiro no SQL Editor como postgres. Não libera informática, legislação ou PC-CE.
-- Todas as mudanças deste lote são atômicas; reexecução não duplica auditoria.
begin;
do $access$ begin
 if current_user not in ('postgres','supabase_admin') then
  raise exception 'Execute no SQL Editor como administrador postgres';
 end if;
end $access$;
create table if not exists public.idecan_pedagogical_review_audit (
 id bigint generated always as identity primary key,
 batch_key text not null,
 question_id uuid not null references public.board_exam_questions(id),
 before_data jsonb not null,
 after_data jsonb not null,
 evidence jsonb not null,
 reviewer_id uuid,
 reviewed_at timestamptz not null default now(),
 unique(batch_key,question_id)
);
alter table public.idecan_pedagogical_review_audit enable row level security;
revoke all on public.idecan_pedagogical_review_audit from anon,authenticated;
grant select on public.idecan_pedagogical_review_audit to authenticated;
drop policy if exists "Admins read IDECAN pedagogical audit" on public.idecan_pedagogical_review_audit;
create policy "Admins read IDECAN pedagogical audit" on public.idecan_pedagogical_review_audit
 for select to authenticated using (public.has_role(auth.uid(),'admin'));
do $review$
declare
 change jsonb;
 tuple jsonb;
 catalog jsonb := $catalog${"topics":{"3c989c30-37f2-41c5-84f0-65d9bf9e7a45":{"topic":"3c989c30-37f2-41c5-84f0-65d9bf9e7a45","edition":"a982e86c-f18a-47f5-9cf8-f1f8bd2a22ff","source_url":"https://cdn.cebraspe.org.br/concursos/PF_25/arquivos/Ed_1_PF_25_Abertura_Atualizado_ate_ret_4.pdf","topic_text":"Lógica de primeira ordem; contagem e probabilidade; conjuntos; problemas aritméticos, geométricos e matriciais."},"a7ae3924-db95-4f19-9d59-67f2c3011458":{"topic":"a7ae3924-db95-4f19-9d59-67f2c3011458","edition":"a982e86c-f18a-47f5-9cf8-f1f8bd2a22ff","source_url":"https://cdn.cebraspe.org.br/concursos/PF_25/arquivos/Ed_1_PF_25_Abertura_Atualizado_ate_ret_4.pdf","topic_text":"Estruturas lógicas; argumentação; lógica proposicional; tabelas-verdade; equivalências; Leis de Morgan e diagramas."},"e6591ae9-0b4e-4829-95cd-2c270b23346f":{"topic":"e6591ae9-0b4e-4829-95cd-2c270b23346f","edition":"a982e86c-f18a-47f5-9cf8-f1f8bd2a22ff","source_url":"https://cdn.cebraspe.org.br/concursos/PF_25/arquivos/Ed_1_PF_25_Abertura_Atualizado_ate_ret_4.pdf","topic_text":"Estatística descritiva e análise exploratória; tabelas, gráficos e medidas de posição, dispersão, assimetria e curtose."}},"books":["4c1aeba37bfed6e8c00aa0d42b6dbcf7de0dcc67a406f5b5cbc7e9136be0e147","e60c319a40fb68f495555e7fad113bda8c9b109275000b0bd5c450fbd9ff24ec","6cfa2f7760a08ba57e4f214ed54d16c5181e98e2ce1f26dc218bb527bae574fd","7d75eb4e9e447dae31b5a7f66cddd4a6bfde140dfbe54e1201f564017c5b8fa8"]}$catalog$::jsonb;
 stored public.board_exam_questions;
 previous_application public.idecan_pedagogical_review_audit;
 updated_row public.board_exam_questions;
 actual_hash text;
begin
 for tuple in select value from jsonb_array_elements($items$[
["2a88fa5b-14fe-432e-a6fa-7693629a1087","9f8643a762bb7890c49da6b40a566e67e92c3e1d96eb9b664b44f2fe84f838be","active","Em cada ronda, a chance de não encontrar veículo suspeito é 1−0,15=0,85. Como as rondas são independentes, multiplique: 0,85³=0,614125, aproximadamente 61,4%. Alternativa E.\n\nErro comum: Somar 85% três vezes ou calcular 0,15³ responde a eventos diferentes.\n\nExemplo prático: Em duas rondas independentes com chance de achado de 20%, a chance de nenhum achado é 0,8²=64%.",null,0,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["da56997b-0f1e-44c8-b2d1-284db561acca","b40e3763dbea1d826dcf1890b8842d6a70dcff0cabc144a60691f73912692f14","active","Os cargos são diferentes: há 8 escolhas para coordenador, 7 para relator e 6 para auxiliar. Logo, 8×7×6=336, alternativa B.\n\nErro comum: Usar C(8,3)=56 escolhe apenas o grupo, sem atribuir funções.\n\nExemplo prático: Com quatro pessoas e dois cargos distintos, há 4×3=12 designações.",null,0,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["b6b54a1b-ff1f-4ee0-8732-eb75e2deeead","5c4ad38c215cbbe0d3392859d8c10e06da43ecaa081dd07ddc21b02bb91e2234","active","Multiplique cada nota pelo peso: 8,5×4+9×3+7×1=68. A soma dos pesos é 8; a média é 68/8=8,5. Alternativa A.\n\nErro comum: Dividir por três ignora os pesos; o divisor correto é a soma dos pesos.\n\nExemplo prático: Notas 6 e 10, com pesos 3 e 1, dão média (18+10)/4=7.",null,0,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["a7a11304-4b4c-46b8-90f5-790d2efd5836","2dbef5933b0c942ea88483cf18f948cfb90ec27e0db1da18a24b5b2e36f31c91","active","Na PG, a5/a3=q²=320000/80000=4. Assim, a1=a3/q²=80000/4=20000 reais. Alternativa E. O crescimento anual permite adotar q=2.\n\nErro comum: Confundir a razão entre anos consecutivos com a razão entre o terceiro e o quinto ano.\n\nExemplo prático: Se o valor dobra por ano, 10, 20, 40 são os três primeiros valores.",null,0,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["0f6a2765-5399-4c65-8f1a-82b84612faef","dedce5fd52a7da662fb34aadb0e4bc7edff21bf9f0d315ed1159105352563c12","active","Após recuperar as expressões do PDF, os índices são A=0,85; B=√0,64=0,8; C=0,805; D=8/9≈0,8889; E=(√0,81)²=0,81. O menor é B, indicado na alternativa C.\n\nErro comum: 0,805 é maior que 0,800. Não compare apenas a quantidade de casas decimais.\n\nExemplo prático: Escrever 0,8 como 0,800 facilita compará-lo com 0,805.","Cinco delegacias foram avaliadas quanto à eficiência de resolução de crimes, apresentando os seguintes índices: Delegacia A: 0,85; Delegacia B: √0,64; Delegacia C: 0,805; Delegacia D: 8/9; e a Delegacia E: (√0,81)². Escrevendo todos os índices na forma decimal, temos que a delegacia com o menor índice de eficiência é a:",0,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["4fa3f579-cd4d-4f72-a221-ab5f0d3c99b9","2d9ac1e41c25f0742a83dbd973a2d77fd617d51b2a8f176214f8545f7077ff9d","active","“Existe” pede ∃x; o mesmo indivíduo deve ser suspeito e não ter antecedentes: ∃x(P(x)∧¬Q(x)). Alternativa C.\n\nErro comum: A negação de Q recai sobre ter antecedentes, não sobre a existência de suspeitos.\n\nExemplo prático: “Existe servidor que não dirige” vira ∃x(Servidor(x)∧¬Dirige(x)).",null,0,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["91437515-3c94-4490-9671-3d4c37cf157a","398e8dfe3bf1c2fcfb9a0c63d6f0d978c55f4ba07cfc15c315e25dc10d4602bd","active","As diferenças são 2, 4, 8, 16 e 32. Logo, X=23+16=39 e 39+32=71, confirmando o padrão proposto. Alternativa D.\n\nErro comum: Somar sempre o mesmo número não reproduz os termos dados.\n\nExemplo prático: Na sequência 3, 5, 9, 17, as diferenças 2,4,8 sugerem o próximo termo 33.",null,0,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["6b476100-959d-4703-b7cd-87a1e00e5837","b8b7963799f5d279f62b7498a08d888d3b9545e37e26733ad9ae71fdde25bd00","active","Se os lados medem x e x+3, então 2x+2(x+3)=30. Daí 4x=24, x=6 e o outro lado mede 9. A área é 6×9=54 m². Alternativa D.\n\nErro comum: Perímetro mede contorno; área é o produto dos lados, não 30².\n\nExemplo prático: Retângulo de lados 4 e 7 tem perímetro 22 e área 28.",null,0,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["b9039faa-0d99-47ed-ac97-4f8aac0352f6","f9b6ec3701e6b76914f3befc1f906a9562c9efa1be6b01deb7cd8c2ba27dca18","active","AGENTE tem seis letras, com dois E iguais. Há 6!/2!=360 anagramas. Com os E juntos, o bloco EE e as outras quatro letras geram 5!=120. Restam 360−120=240. Alternativa A.\n\nErro comum: Só os E são as duas vogais iguais; o A não entra no bloco de repetição.\n\nExemplo prático: Em AAB, há 3!/2!=3 palavras distintas: AAB, ABA e BAA.",null,0,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["3279170c-125e-4603-9407-e54742118dec","c334afa3ca6398e7943f5e639017107542b84494eadf130dff04d8730a4a2684","active","Suponha Alexandre culpado: sua acusação de Bruno é falsa; Bruno nega culpa corretamente; Cleber diz corretamente que Alexandre mente; Douglas e Edson também dizem a verdade. As cinco falas são compatíveis. Se Bruno fosse culpado, Alexandre diria a verdade, mas Cleber mentiria mesmo sendo inocente. As outras hipóteses igualmente deixam Alexandre mentir sendo inocente. Alternativa E.\n\nErro comum: Verificar só duas falas não basta: apenas o culpado pode mentir.\n\nExemplo prático: Teste cada suspeito como culpado e confira todas as falas, sem decidir por intuição.",null,0,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["86fa6b20-0ea4-4997-89f2-b1d75050391b","673e7425b86977afbdb6a5456428ed82bf88cfbde9668b2e955a6b5a36ba8524","active","Sem reposição: a chance de furtado no primeiro sorteio é 10/16 e, após esse sucesso, no segundo é 9/15. O produto é 90/240=37,5%. Alternativa B.\n\nErro comum: Usar 10/16 duas vezes ignora a retirada do primeiro veículo.\n\nExemplo prático: De três bolas vermelhas e duas azuis, tirar duas vermelhas sem reposição tem chance (3/5)(2/4)=30%.",null,0,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["5f51c2ec-48bb-43c9-8d15-df83e3ff9331","70060bdb0d99f4696bb06959fae0a92895919aebd07e807210ccc0dd079bf23f","active","A primeira tarefa usa 4×6×10=240 horas de trabalho de um analista para 120 GB: 0,5 GB por hora de analista. Na nova equipe, 3×9×0,5=13,5 GB/dia. Então 270/13,5=20 dias. Alternativa A.\n\nErro comum: Mais dados aumentam o prazo; mais analistas e mais horas diárias o reduzem.\n\nExemplo prático: Se uma equipe processa 10 GB/dia, 50 GB exigem cinco dias.",null,0,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["e711b5b0-de91-4f35-a4c4-b14b5d59429c","21edfd5b41c2ba33a25fed31f3f952a6a0ab323bfb4b51fda04847516c720857","active","Depreciação de 15% deixa 85% do valor a cada ano: 180000×0,85²=130050 reais. Alternativa B.\n\nErro comum: Subtrair 30% do preço inicial faz depreciação linear, diferente da redução composta pedida.\n\nExemplo prático: Um bem de 100 que cai 10% ao ano vale 90 após um ano e 81 após dois.",null,0,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["257aaf2d-b8b0-4eae-a2f1-3426955c1553","a98c8a9a0f63e359174ae2ddfcf826d35474c00ff04204f1aecbd59ba8a71157","active","Apenas AF: 47−10−8+3=32. Apenas PN: 30−10−5+3=18. Apenas AR: 20−8−5+3=10. A soma é 60. Alternativa D.\n\nErro comum: As interseções duplas incluem os três eventos. Some a interseção tripla ao recuperar cada região exclusiva.\n\nExemplo prático: Quem tem só A é |A|−|A∩B|−|A∩C|+|A∩B∩C|.",null,0,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["64c50acd-3a85-435d-8f2a-cd33a4519d06","d65ee64f0601396d07b58e24aad5b491b476d21935f6385f1a69e32008be54e1","active","Uma condicional P→Q é falsa apenas quando P é verdadeiro e Q é falso. Sua negação é P∧¬Q: o suspeito foi encontrado e não foi interrogado. Alternativa C.\n\nErro comum: Trocar antecedente e consequente produz a recíproca, não a negação.\n\nExemplo prático: Negar “se chover, levo guarda-chuva” é afirmar “choveu e não levei guarda-chuva”.",null,0,"a7ae3924-db95-4f19-9d59-67f2c3011458"],
["f6efd27b-7f06-47dd-9edf-4c580c95af4a","4fbd02e33a12799fc8f83e3b0809d3861b4f982e5d15780ed762968c57850b3b","active","O pronome “ele” não identifica uma pessoa no enunciado. Sem fixar esse referente, não se atribui um valor lógico à afirmação. É a interpretação de sentença aberta adotada na alternativa D.\n\nErro comum: Não ter conectivos não torna uma sentença aberta: “2 é par” é uma proposição fechada.\n\nExemplo prático: “x cometeu o fato” torna-se uma afirmação determinada quando se identifica x.",null,1,"a7ae3924-db95-4f19-9d59-67f2c3011458"],
["43c62846-6045-4a2e-a376-29a76f59eaf3","26c30aaee2029c061bcd437965af6e06d3d8c7fc817cbc37c74fd7c4a3100d31","active","Armas: 500×0,4=200. Com numeração raspada: 200×0,75=150. Não armas: 300; entorpecentes: 300×0,2=60. A diferença é 150−60=90. Alternativa A.\n\nErro comum: Os 20% têm como base os 300 itens que não são armas, não os 500 apreendidos.\n\nExemplo prático: 20% de uma metade de 100 corresponde a 10, não a 20.",null,1,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["f5d2924e-0e12-473e-8d83-4402516878b6","108a8afd3b1b2a99c772eebb3720cc3800cf4eaab3d72d675a58a92dbfa762bc","active","A união é 40%+30%+20%−10%−5%−8%+2%=69%. Fora dos três conjuntos ficam 31% dos 2000: 620 detentos. Alternativa B.\n\nErro comum: Somar as três porcentagens conta algumas pessoas repetidamente.\n\nExemplo prático: Se 60% estão em A ou B, os outros 40% não pertencem a nenhum dos dois.",null,1,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["6d593f0a-15a0-4f23-9a60-abc8100d23eb","b97a45a4569ea77c8eabbcfdb2ce77b8f2706c2ea936744acae147e8852d5d01","active","Cada uma das quatro proposições assume V ou F. Todas as combinações formam 2⁴=16 linhas. Alternativa E.\n\nErro comum: Quatro proposições não significam quatro linhas: a contagem é exponencial.\n\nExemplo prático: Com duas proposições, as linhas são VV, VF, FV e FF.",null,1,"a7ae3924-db95-4f19-9d59-67f2c3011458"],
["112db902-05a5-423c-9e08-2b30b909b6b4","d69295b60d0b03af032827a57aaa3e0d2587402f1077a348de834dacde6760a8","active","Os três postos são distintos: 10 opções para o primeiro, 9 para o segundo e 8 para o terceiro. Total: 10×9×8=720. Alternativa D.\n\nErro comum: Escolher só um conjunto de três militares não define quem ocupa cada posto.\n\nExemplo prático: Cinco pessoas para dois postos distintos geram 5×4=20 escalas.",null,2,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["806fbce0-09cc-4b8a-8c6e-b8a5b8facfbd","b49edfd3e5a756a7e15f6f1548d65a21a19286d4c5db2684e7d25d9a11752767","active","A PA tem primeiro termo 20, razão 5 e oitavo termo 20+7×5=55. A soma é 8(20+55)/2=300 kits. Alternativa A.\n\nErro comum: O oitavo termo tem sete incrementos, não oito.\n\nExemplo prático: Os termos 2,4,6,8 somam 4(2+8)/2=20.",null,2,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["c65e2f59-94d2-4300-b110-e22634f92a64","daf0d0c82afde0d968e7c0aa4c42d6215ba48969088c1979c8b00b5ffb40d9c7","active","Completando quadrados: (x−5)²−25+(y+2)²−4−20=0. Logo, (x−5)²+(y+2)²=49: centro (5,−2), raio 7. Alternativa B.\n\nErro comum: Na equação reduzida, o centro tem os sinais opostos aos que aparecem dentro dos parênteses.\n\nExemplo prático: (x−3)²+(y+1)²=16 tem centro (3,−1) e raio 4.",null,2,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["5a9c3f8a-51de-43ec-a7fe-095c9ca16cab","50507e709bfdb5218993a341eb6a1c7018d219ac86322475403385c7828fb881","active","O semiperímetro da base é (13+14+15)/2=21. Por Heron, área=√[21×8×7×6]=84 m². O prisma tem volume 84×10=840 m³. Alternativa B.\n\nErro comum: Não use 13×14/2 sem provar que esses lados são perpendiculares.\n\nExemplo prático: Prisma com base de 6 m² e altura 4 m tem volume 24 m³.",null,2,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["9f2b5e83-fac0-4a6e-b4c3-15c4a9f3bae5","d5997b1aa14d92702b7cf2a1dee83b5a86c8551e7d8374cb07652e4d1d5ba77f","active","Após o aumento: 2400×1,10=2640. O desconto de 12% incide sobre esse novo bruto: 2640×0,88=2323,20 reais. Alternativa C.\n\nErro comum: A base do desconto é o salário reajustado, não o salário antigo.\n\nExemplo prático: 100 com aumento de 10% e desconto de 10% resulta em 99, não em 100.",null,2,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["f90d20c6-8775-489a-9846-90dd46b3ee98","54a59fb91b544a4bdfcc999a96d235b53e818134b5c44ba323b6a532fcfd087f","active","O novo encontro ocorre no mínimo múltiplo comum: 12=2²×3 e 18=2×3². Assim, MMC=2²×3²=36 dias. Alternativa A.\n\nErro comum: O máximo divisor comum mede outra relação; não determina a primeira coincidência de ciclos.\n\nExemplo prático: Ciclos de quatro e seis dias coincidem novamente após 12 dias.",null,2,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["46669631-f81f-456e-90dd-ee07278c285c","d001fb8e9593676d53e2e79cdacf30f73fd1d93261fcc074b43bfe040583d3fb","active","Carlos deve estar imediatamente atrás de Bruno. O par pode ser BC nas posições 1 e 2 ou nas posições 2 e 3. A segunda hipótese põe Arthur em primeiro, o que é proibido. Portanto: Bruno, Carlos, Arthur. Alternativa C.\n\nErro comum: Estar atrás não basta; o enunciado exige posição imediatamente posterior.\n\nExemplo prático: Trate duas pessoas consecutivas como um bloco e depois aplique as demais restrições.",null,2,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["b0b322c8-a63c-4c08-925a-47ce0ad5fba5","649f14a9333065c8037d96ce4c88246bb0b3c5c725438d3b8512c8ca330e23ab","active","Como os alarmes são independentes, a chance de ambos funcionarem é 0,95×0,90=0,855, ou 85,5%. Alternativa D.\n\nErro comum: Somar probabilidades não calcula o evento simultâneo de dois sucessos independentes.\n\nExemplo prático: Dois equipamentos independentes com confiabilidade 0,8 têm chance conjunta de 0,64.",null,2,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["bc0316c9-908e-4bba-b434-4c936300a7e1","1b86af4c6e2a43cb71375505c5d8b333db87203037d82b6ac0ea2ad884dc9430","active","Resolver o primeiro tem chance 0,6; não resolver o segundo tem chance 1−0,8=0,2. Pela independência: 0,6×0,2=0,12=12%. Alternativa D.\n\nErro comum: Usar 0,6×0,8 calcula ambos solucionados, contrariando a segunda condição.\n\nExemplo prático: Para sucesso em A e falha em B, multiplique P(A) por 1−P(B), se independentes.",null,3,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["1dc08588-9600-4f3b-8421-8bff4c0bd25c","e542e769eeb7b6711a4a910839b3ca221ca006d825f1de75ed0192e868a5911d","active","As vagas dentro de cada categoria não têm funções distintas. Escolha 4 dos 10 agentes e 2 dos 7 escrivães: C(10,4)×C(7,2)=210×21=4410. Alternativa A.\n\nErro comum: Permutar as quatro vagas de agente conta repetidamente a mesma equipe.\n\nExemplo prático: Escolher duas pessoas entre cinco produz dez duplas; inverter a ordem não cria nova dupla.",null,3,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["2874dcdb-c415-4c13-9c1c-06f945f758d7","a97e099af8b755ad0ce7bfeff335f836f260b715044797d8fb6b7a642f792c58","active","A média é (5+5+10+15+15)/5=10. Os desvios quadráticos somam 25+25+0+25+25=100. Como o desvio é amostral, a variância é 100/(5−1)=25 e o desvio é √25=5. Alternativa B.\n\nErro comum: Dividir por cinco calcula variância populacional; a questão pede desvio amostral.\n\nExemplo prático: Uma amostra com três valores usa divisor dois na variância amostral.",null,3,"e6591ae9-0b4e-4829-95cd-2c270b23346f"],
["95a15cfd-acc9-466a-848f-911b2af6f306","cef7c4de799ceeddb453923815a83162b1b520bbc57fd432c6caf5bc92beb92b","active","As cinco parcelas são 160,180,200,220,240. Somando pela PA: 5(160+240)/2=1000 reais. Alternativa E.\n\nErro comum: O aumento de 20 ocorre quatro vezes entre a primeira e a quinta parcela.\n\nExemplo prático: Três parcelas de 100,120,140 custam 360 no total.",null,3,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["c81e07e7-9bfa-46e2-a09e-2f929e68ba0d","aa6e8066d51d49e8ab3b86f049e9903a4ada8d5ac3fb6141144daa8223acee76","active","Pela lei de De Morgan, ¬(P∧Q)=¬P∨¬Q. Basta faltar uma das duas condições para negar que rádio e bateria estejam simultaneamente em boas condições. Alternativa E.\n\nErro comum: Usar ¬P∧¬Q exige duas falhas e é uma condição mais restrita que a negação pedida.\n\nExemplo prático: Negar “tenho documento e ingresso” é “não tenho documento ou não tenho ingresso”.",null,3,"a7ae3924-db95-4f19-9d59-67f2c3011458"],
["3d581c4e-f5cc-4978-9fe1-7490102af1d1","298c05f08a894bbf3d83b90c50ffc5ca40b0bb935e2cb6eec6671d8966209bea","active","A área antiga é 9×4=36 m². Para o quadrado de igual área, l²=36, logo l=6 m. Alternativa D.\n\nErro comum: Não se conserva o perímetro: a grandeza mantida é a área.\n\nExemplo prático: Um quadrado de área 25 m² tem lado 5 m.",null,3,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["547726de-a0ba-4306-b17b-519f97ca8b65","68b525a3d567e8e6e319c3302a19c393abb82873f1d0f24cadef2fc715bfcb60","active","O ângulo interno regular é 180(n−2)/n. Igualando a 108: 180n−360=108n; 72n=360; n=5. Alternativa A.\n\nErro comum: 108° é um ângulo interno; o externo correspondente é 72°, e 360/72 também dá cinco.\n\nExemplo prático: Um hexágono regular tem ângulo externo de 60° e interno de 120°.",null,3,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["5fa2793b-06d9-4e5a-ae57-425a4e1e141c","d4d8361cb7b0b111a85050440a1109809a7a622bd9a20f90ff5a514d3c51dc32","active","Só D=30−10−12+5=13; só N=25−10−8+5=12; só C=35−12−8+5=20. Total com exatamente um indício: 13+12+20=45. Alternativa B.\n\nErro comum: A união contém também cenas com dois ou três indícios e não responde a “apenas um”.\n\nExemplo prático: Separe o diagrama em regiões exclusivas antes de somá-las.",null,3,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["e1ebfb85-d540-4809-9150-679b1f1a5436","1a68ad63a78b5509be8d40c680e64b6825928b932bfa4d8c1f00e1209ae3f009","under_review","A primeira tarefa usa 4×6×5=120 horas de perito para 50 amostras: 2,4 horas de perito por amostra. Para 150 amostras são 360 horas de perito. Seis peritos por oito horas fornecem 48 horas de perito/dia: 360/48=7,5 jornadas. O trabalho termina durante o oitavo dia; isso explica a alternativa A (8).\n\nErro comum: Não arredonde 7,5 para 8 sem explicar a unidade: o prazo exato são 7,5 jornadas, e a conclusão ocorre no oitavo dia de expediente.\n\nExemplo prático: Uma tarefa que exige 12 horas, em jornadas de oito horas, termina no segundo dia, após 1,5 jornada.",null,3,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["69765eed-e4ee-40bb-9634-af33cc296755","cee879d273b80d4b3eb5591d5b606dc869a3df16f31664644a328b6f216e3abd","active","As diferenças são 3,5,7; mantendo o padrão dos ímpares consecutivos, maio tem 27+9=36 e junho 36+11=47. Alternativa C.\n\nErro comum: Somar nove diretamente a abril responde a maio, não a junho.\n\nExemplo prático: Na sequência 1,4,9,16, as diferenças 3,5,7 levam a 25.",null,3,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"],
["a3ce0c71-05e5-45fd-a1ce-486d4f324027","12002f6e10b263965caa61c89ed520337a66a70f17f62d8b1bc9a9797f6f3a1f","active","A ordem ∃x∀y diz: há um mesmo agente x que interrogou todo suspeito y. Alternativa B.\n\nErro comum: ∀y∃x permitiria agentes diferentes para suspeitos diferentes; inverter quantificadores altera a afirmação.\n\nExemplo prático: “Há um professor que ensina todos os alunos” exige o mesmo professor para todos.",null,3,"3c989c30-37f2-41c5-84f0-65d9bf9e7a45"]
]$items$::jsonb) loop
  change := jsonb_build_object('id',tuple->0,'expected_hash',tuple->1,'status',tuple->2,
    'explanation',tuple->3,'stem',tuple->4,'booklet_sha256',catalog#>array['books',tuple->>5])
    || (catalog#>array['topics',tuple->>6]);
  select * into stored from public.board_exam_questions where id=(change->>'id')::uuid for update;
  if not found then raise exception 'Questão ausente: %',change->>'id'; end if;
  select * into previous_application from public.idecan_pedagogical_review_audit
   where batch_key='idecan-math-pedagogy-v1' and question_id=stored.id;
  if found then
   if to_jsonb(stored) is distinct from previous_application.after_data then
    raise exception 'Questão alterada após o lote: %; revisão preservada',stored.id;
   end if;
   continue;
  end if;
  select encode(sha256(convert_to((to_jsonb(stored)-array['created_at','verified_at'])::text,'UTF8')),'hex') into actual_hash;
  if actual_hash is distinct from change->>'expected_hash' then
   raise exception 'Questão modificada desde a conferência: %; lote revertido',stored.id;
  end if;
  perform 1 from public.syllabus_topics t
   join public.syllabus_editions e on e.id=t.edition_id
   join public.content_sources s on s.id=e.source_id
   where t.id=(change->>'topic')::uuid and t.content_status='current'
    and t.topic_text=change->>'topic_text'
    and e.id=(change->>'edition')::uuid and e.status='active'
    and s.url=change->>'source_url' and s.is_official and s.status='vigente'
   for share of t,e,s;
  if not found then raise exception 'Edital/tópico oficial divergente: %',stored.id; end if;
  if stored.board<>'IDECAN' or stored.official_answer='X' or stored.legal_review_required
    or change->>'status' not in ('active','under_review')
    or change->>'explanation' not like '%Exemplo prático:%' then
   raise exception 'Item fora do escopo não jurídico aprovado';
  end if;
  update public.board_exam_questions set
   explanation=change->>'explanation',
   syllabus_topic_id=(change->>'topic')::uuid,
   tested_topic=change->>'topic_text',
   stem=coalesce(change->>'stem',stored.stem),
   content_status=change->>'status',
   verified_at=now(),
   review_note=concat_ws('; ',stored.review_note,
    'Revisão matemática individual: gabarito definitivo, resolução, erro comum e exemplo; matriz PF 2025, sem previsão de edital PC-AC',
    case when change->>'status'='under_review' then 'Retida: 7,5 jornadas versus conclusão no oitavo dia exige decisão editorial' else 'Explicação pedagógica aprovada' end)
   where id=stored.id returning * into updated_row;
  insert into public.idecan_pedagogical_review_audit(batch_key,question_id,before_data,after_data,evidence,reviewer_id)
   values('idecan-math-pedagogy-v1',stored.id,to_jsonb(stored),to_jsonb(updated_row),
    jsonb_build_object('booklet_sha256',change->>'booklet_sha256','syllabus_url',change->>'source_url','historical_answer_preserved',true),auth.uid());
 end loop;
 if (select count(*) from public.idecan_pedagogical_review_audit where batch_key='idecan-math-pedagogy-v1')<>38 then
  raise exception 'Contagem divergente; lote revertido';
 end if;
end $review$;
commit;
-- Resultado esperado apenas neste lote: active=37; under_review=1; com_explicacao=quantidade.
select q.content_status,count(*) as quantidade,
 count(*) filter(where q.explanation like '%Exemplo prático:%') as com_explicacao
from public.board_exam_questions q
join public.idecan_pedagogical_review_audit a on a.question_id=q.id
where a.batch_key='idecan-math-pedagogy-v1' group by q.content_status order by q.content_status;
