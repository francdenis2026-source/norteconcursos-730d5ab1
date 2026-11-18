-- Questões autorais de análise financeira e índices de liquidez para PC-AC 2026.
insert into public.curated_question_catalog
(source_id,syllabus_topic_id,external_item_key,contest_name,contest_year,career_name,exam_board,subject,subtopic,tested_topic,question_text,official_answer,explanation,legal_basis,difficulty,content_status,is_original,state,career_category,role_type,didactic_provenance)
select 'b2a15f6c-7cad-417c-8407-67e33fc9dc47'::uuid,v.topic_id::uuid,v.item_key,'Polícia Civil do Acre',2026,'Oficial Investigador de Polícia','AUTORAL','Contabilidade Geral e Análise Financeira',v.subtopic,'Análise das demonstrações contábeis e índices de liquidez',v.question_text,v.answer,v.explanation,'[]'::jsonb,v.difficulty,'active',true,'AC','policial','Oficial Investigador de Polícia',v.provenance::jsonb
from (values
('9a3535c6-f720-472a-9138-8acf5f212b31','pcac26-liquidez-001','Índices de liquidez seca e corrente','Texto-base:
Uma empresa apresentou, em 31 de dezembro de 20X2, os seguintes saldos:
ATIVO CIRCULANTE
Disponível: R$ 20.000
Aplicações financeiras: R$ 288.000
Contas a receber: R$ 145.000
Estoques: R$ 260.000
Total do ativo circulante: R$ 713.000

PASSIVO CIRCULANTE
Obrigações sociais: R$ 51.000
Fornecedores: R$ 41.000
Empréstimos: R$ 70.000
Provisões: R$ 24.000
Total do passivo circulante: R$ 186.000

[[/texto-base]]
Com base exclusivamente nos dados apresentados, os índices de liquidez seca e liquidez corrente são, respectivamente:
(A) 0,11 e 3,85.
(B) 1,75 e 0,11.
(C) 2,44 e 3,83.
(D) 3,83 e 2,44.
(E) 3,83 e 4,40.','C','**1. Identifique o que a questão pede.**
Ela quer dois índices e nesta ordem: primeiro liquidez seca; depois liquidez corrente.

**2. Separe os valores.**
Ativo Circulante (AC) = R$ 713.000.
Estoques = R$ 260.000.
Passivo Circulante (PC) = R$ 186.000.

**3. Calcule a liquidez seca.**
A liquidez seca retira os estoques do ativo circulante:
LS = (AC − Estoques) ÷ PC
LS = (713.000 − 260.000) ÷ 186.000
LS = 453.000 ÷ 186.000 = 2,4354… ≈ **2,44**.

**4. Calcule a liquidez corrente.**
A liquidez corrente considera todo o ativo circulante, inclusive os estoques:
LC = AC ÷ PC
LC = 713.000 ÷ 186.000 = 3,8333… ≈ **3,83**.

**5. Interprete o resultado.**
Para cada R$ 1,00 de dívida de curto prazo, a empresa apresenta R$ 2,44 em ativos circulantes sem contar os estoques e R$ 3,83 quando os estoques também são considerados.

**Por que as demais alternativas estão erradas?**
A e B apresentam índices incompatíveis com as fórmulas e os valores fornecidos. D inverte a ordem solicitada. E não corresponde aos quocientes calculados.

**Dica de prova:** “seca” lembra retirar o estoque. “Corrente” usa o ativo circulante completo. Leia a ordem pedida no enunciado antes de marcar a alternativa.','média','{"kind":"original_question","authored":true,"source_board_style":"IDECAN","target_exam":"PC-AC 2026 — Oficial Investigador de Polícia","not_official_exam":true,"review_state":"editorial_review_passed","review_date":"2026-11-18","review_note":"Questão autoral inédita, revisada em cálculo, gabarito e explicação didática; alinhamento ao tópico de contabilidade/análise financeira do edital."}'),
('9a3535c6-f720-472a-9138-8acf5f212b31','pcac26-liquidez-002','Liquidez imediata','Uma entidade apresenta disponibilidades de R$ 36.000 e passivo circulante de R$ 120.000. O índice de liquidez imediata é:
(A) 0,20.
(B) 0,30.
(C) 0,60.
(D) 1,20.
(E) 3,33.','B','A liquidez imediata considera somente os recursos que já estão disponíveis para pagamento imediato, como caixa, bancos e equivalentes de caixa.
Fórmula: LI = Disponibilidades ÷ Passivo Circulante.
LI = 36.000 ÷ 120.000 = **0,30**.
Isso significa que há R$ 0,30 imediatamente disponível para cada R$ 1,00 de dívida de curto prazo.
As demais alternativas decorrem de divisões ou interpretações incorretas.
Dica: imediata = dinheiro disponível agora; não inclua estoques nem valores que ainda serão recebidos.','fácil','{"kind":"original_question","authored":true,"source_board_style":"IDECAN","target_exam":"PC-AC 2026 — Oficial Investigador de Polícia","not_official_exam":true,"review_state":"editorial_review_passed","review_date":"2026-11-18","review_note":"Questão autoral inédita, revisada em cálculo, gabarito e explicação didática; alinhamento ao tópico de contabilidade/análise financeira do edital."}'),
('9a3535c6-f720-472a-9138-8acf5f212b31','pcac26-liquidez-003','Liquidez geral','Uma empresa possui ativo circulante de R$ 300.000, realizável a longo prazo de R$ 100.000, passivo circulante de R$ 160.000 e passivo não circulante de R$ 40.000. A liquidez geral é:
(A) 0,80.
(B) 1,00.
(C) 1,20.
(D) 2,00.
(E) 2,50.','D','A liquidez geral considera recursos realizáveis no curto e no longo prazo em relação às obrigações também de curto e longo prazo.
Fórmula: LG = (AC + RLP) ÷ (PC + PNC).
Numerador: 300.000 + 100.000 = 400.000.
Denominador: 160.000 + 40.000 = 200.000.
LG = 400.000 ÷ 200.000 = **2,00**.
Interpretação: para cada R$ 1,00 de dívida total considerada na fórmula, existem R$ 2,00 em ativos realizáveis.
Dica: “geral” amplia os dois lados: inclui curto e longo prazo.','média','{"kind":"original_question","authored":true,"source_board_style":"IDECAN","target_exam":"PC-AC 2026 — Oficial Investigador de Polícia","not_official_exam":true,"review_state":"editorial_review_passed","review_date":"2026-11-18","review_note":"Questão autoral inédita, revisada em cálculo, gabarito e explicação didática; alinhamento ao tópico de contabilidade/análise financeira do edital."}'),
('9a3535c6-f720-472a-9138-8acf5f212b31','pcac26-liquidez-004','Capital circulante líquido','Uma sociedade apresenta ativo circulante de R$ 480.000 e passivo circulante de R$ 350.000. O capital circulante líquido corresponde a:
(A) R$ 130.000.
(B) R$ 350.000.
(C) R$ 480.000.
(D) R$ 830.000.
(E) R$ 1.370.000.','A','O capital circulante líquido mostra a diferença entre os recursos de curto prazo e as obrigações de curto prazo.
Fórmula: CCL = Ativo Circulante − Passivo Circulante.
CCL = 480.000 − 350.000 = **R$ 130.000**.
Como o resultado é positivo, o ativo circulante supera o passivo circulante em R$ 130.000.
Dica: CCL é diferença, não divisão. Se a questão pedir índice de liquidez, aí sim haverá divisão.','fácil','{"kind":"original_question","authored":true,"source_board_style":"IDECAN","target_exam":"PC-AC 2026 — Oficial Investigador de Polícia","not_official_exam":true,"review_state":"editorial_review_passed","review_date":"2026-11-18","review_note":"Questão autoral inédita, revisada em cálculo, gabarito e explicação didática; alinhamento ao tópico de contabilidade/análise financeira do edital."}'),
('9a3535c6-f720-472a-9138-8acf5f212b31','pcac26-liquidez-005','Efeito dos estoques nos índices de liquidez','Mantidos constantes o passivo circulante e os demais componentes do ativo circulante, o aumento do saldo de estoques, sem alteração dos demais ativos, provoca qual efeito nos índices de liquidez corrente e seca?
(A) Aumenta ambos os índices.
(B) Reduz ambos os índices.
(C) Aumenta a liquidez corrente e não altera a liquidez seca.
(D) Não altera a liquidez corrente e aumenta a liquidez seca.
(E) Reduz a liquidez corrente e aumenta a liquidez seca.','C','A liquidez corrente usa todo o ativo circulante. Portanto, se os estoques aumentam, o numerador da fórmula aumenta e a liquidez corrente tende a aumentar.
A liquidez seca desconta os estoques: (AC − Estoques) ÷ PC. Se o aumento do estoque também eleva o AC pelo mesmo valor, a subtração neutraliza esse aumento. Assim, a liquidez seca não muda.
Resposta: **C**.
Dica: quando a questão disser que só o estoque aumentou, pense que ele entra na corrente e é retirado da seca.','média','{"kind":"original_question","authored":true,"source_board_style":"IDECAN","target_exam":"PC-AC 2026 — Oficial Investigador de Polícia","not_official_exam":true,"review_state":"editorial_review_passed","review_date":"2026-11-18","review_note":"Questão autoral inédita, revisada em cálculo, gabarito e explicação didática; alinhamento ao tópico de contabilidade/análise financeira do edital."}'),
('9a3535c6-f720-472a-9138-8acf5f212b31','pcac26-liquidez-006','Classificação de contas no ativo circulante','Para fins de cálculo da liquidez corrente, considerando uma classificação contábil regular, devem compor o ativo circulante:
(A) somente caixa e bancos.
(B) apenas estoques e imobilizado.
(C) exclusivamente contas a receber de longo prazo.
(D) máquinas, veículos e marcas.
(E) disponibilidades, aplicações financeiras de curto prazo, contas a receber de curto prazo e estoques.','E','O ativo circulante reúne bens e direitos que se espera realizar, vender ou consumir no ciclo operacional ou no curto prazo, conforme os critérios contábeis aplicáveis.
Disponibilidades, aplicações de curto prazo, contas a receber de curto prazo e estoques são exemplos típicos.
Máquinas, veículos e marcas normalmente pertencem ao ativo não circulante.
Resposta: **E**.
Dica: circulante está ligado ao giro de curto prazo; imobilizado e intangível normalmente são não circulantes.','média','{"kind":"original_question","authored":true,"source_board_style":"IDECAN","target_exam":"PC-AC 2026 — Oficial Investigador de Polícia","not_official_exam":true,"review_state":"editorial_review_passed","review_date":"2026-11-18","review_note":"Questão autoral inédita, revisada em cálculo, gabarito e explicação didática; alinhamento ao tópico de contabilidade/análise financeira do edital."}'),
('9a3535c6-f720-472a-9138-8acf5f212b31','pcac26-liquidez-007','Interpretação da liquidez corrente','Uma empresa apresenta liquidez corrente igual a 1,50. A interpretação tecnicamente mais adequada é:
(A) a empresa possui lucro líquido de 50%.
(B) para cada R$ 1,00 de passivo circulante, possui R$ 1,50 de ativo circulante.
(C) todas as dívidas da empresa estão quitadas.
(D) a empresa não possui obrigações de longo prazo.
(E) 50% do ativo circulante é composto necessariamente por caixa.','B','Liquidez corrente = Ativo Circulante ÷ Passivo Circulante.
Um índice de 1,50 significa que, para cada R$ 1,00 de obrigação de curto prazo, existem R$ 1,50 em ativos classificados no circulante.
Isso não prova que a empresa teve lucro, que não possui dívidas longas ou que todo o ativo seja dinheiro.
Resposta: **B**.
Dica: índice de liquidez mede relação entre ativos e obrigações; não é percentual de lucro nem garantia absoluta de solvência.','média','{"kind":"original_question","authored":true,"source_board_style":"IDECAN","target_exam":"PC-AC 2026 — Oficial Investigador de Polícia","not_official_exam":true,"review_state":"editorial_review_passed","review_date":"2026-11-18","review_note":"Questão autoral inédita, revisada em cálculo, gabarito e explicação didática; alinhamento ao tópico de contabilidade/análise financeira do edital."}'),
('9a3535c6-f720-472a-9138-8acf5f212b31','pcac26-liquidez-008','Diferença entre ativo circulante e passivo circulante','Na estrutura do Balanço Patrimonial, o passivo circulante representa:
(A) bens destinados ao uso permanente da entidade.
(B) direitos que serão recebidos exclusivamente após cinco anos.
(C) o capital investido pelos sócios.
(D) obrigações exigíveis no curto prazo ou no ciclo operacional, conforme os critérios de classificação.
(E) receitas obtidas durante o exercício.','D','O passivo circulante reúne obrigações que devem ser liquidadas no curto prazo ou no ciclo operacional, observadas as regras de classificação contábil.
Fornecedores, salários e encargos a pagar e empréstimos de curto prazo são exemplos.
Resposta: **D**.
Dica: passivo representa obrigações; circulante indica o horizonte de curto prazo. Não confunda com patrimônio líquido, que representa a participação residual dos proprietários.','fácil','{"kind":"original_question","authored":true,"source_board_style":"IDECAN","target_exam":"PC-AC 2026 — Oficial Investigador de Polícia","not_official_exam":true,"review_state":"editorial_review_passed","review_date":"2026-11-18","review_note":"Questão autoral inédita, revisada em cálculo, gabarito e explicação didática; alinhamento ao tópico de contabilidade/análise financeira do edital."}'),
('9a3535c6-f720-472a-9138-8acf5f212b31','pcac26-liquidez-009','Análise conjunta dos índices de liquidez','Uma companhia apresenta liquidez corrente de 1,80 e liquidez seca de 0,90. Considerando que ambos os índices utilizam o passivo circulante como denominador, é correto afirmar que:
(A) os estoques têm participação relevante na cobertura das obrigações de curto prazo.
(B) a companhia não possui ativo circulante.
(C) a liquidez seca é necessariamente maior que a corrente.
(D) o passivo circulante é igual a zero.
(E) a empresa não possui estoques.','A','A liquidez corrente considera o ativo circulante completo; a liquidez seca exclui os estoques.
Como a corrente é 1,80 e a seca é 0,90, a diferença indica que a parcela retirada (estoques) tem peso relevante na cobertura das obrigações de curto prazo.
Isso não permite concluir, isoladamente, que a empresa esteja insolvente; é necessário analisar qualidade, prazos e realização dos ativos.
Resposta: **A**.
Dica: quando a liquidez corrente é muito superior à seca, investigue o peso dos estoques no ativo circulante.','difícil','{"kind":"original_question","authored":true,"source_board_style":"IDECAN","target_exam":"PC-AC 2026 — Oficial Investigador de Polícia","not_official_exam":true,"review_state":"editorial_review_passed","review_date":"2026-11-18","review_note":"Questão autoral inédita, revisada em cálculo, gabarito e explicação didática; alinhamento ao tópico de contabilidade/análise financeira do edital."}'),
('9a3535c6-f720-472a-9138-8acf5f212b31','pcac26-liquidez-010','Limitações dos índices de liquidez','Na análise de índices de liquidez, a conclusão de que um índice corrente superior a 1 garante, por si só, que a entidade pagará pontualmente todas as obrigações é:
(A) correta, pois o índice elimina riscos de inadimplência.
(B) correta, desde que existam estoques.
(C) incorreta, pois o índice não avalia sozinho prazos de vencimento, qualidade dos recebíveis e capacidade de conversão dos ativos em caixa.
(D) incorreta apenas quando o patrimônio líquido for negativo.
(E) correta quando a entidade apresenta lucro no exercício.','C','Um índice corrente superior a 1 indica que o ativo circulante supera o passivo circulante em valor contábil na data analisada.
Mas o índice não informa, sozinho, quando cada conta vence, se os clientes pagarão, se os estoques serão vendidos rapidamente ou se haverá caixa na data necessária.
Resposta: **C**.
Dica: indicadores ajudam a avaliar; não garantem o futuro. A banca pode trocar “indica” por “garante” para criar uma afirmação exagerada.','difícil','{"kind":"original_question","authored":true,"source_board_style":"IDECAN","target_exam":"PC-AC 2026 — Oficial Investigador de Polícia","not_official_exam":true,"review_state":"editorial_review_passed","review_date":"2026-11-18","review_note":"Questão autoral inédita, revisada em cálculo, gabarito e explicação didática; alinhamento ao tópico de contabilidade/análise financeira do edital."}'),
('9a3535c6-f720-472a-9138-8acf5f212b31','pcac26-liquidez-011','Composição do passivo circulante','Uma entidade possui as seguintes obrigações de curto prazo: fornecedores de R$ 45.000, salários e encargos a pagar de R$ 25.000, empréstimos de R$ 30.000 e tributos a recolher de R$ 10.000. O passivo circulante totaliza:
(A) R$ 70.000.
(B) R$ 80.000.
(C) R$ 90.000.
(D) R$ 110.000.
(E) R$ 120.000.','D','O passivo circulante reúne as obrigações de curto prazo informadas. Basta somá-las:
45.000 + 25.000 + 30.000 + 10.000 = **R$ 110.000**.
Resposta: **D**.
Dica: em questões de índices, antes de dividir, confira se o passivo circulante precisa ser calculado pela soma de suas contas.','média','{"kind":"original_question","authored":true,"source_board_style":"IDECAN","target_exam":"PC-AC 2026 — Oficial Investigador de Polícia","not_official_exam":true,"review_state":"editorial_review_passed","review_date":"2026-11-18","review_note":"Questão autoral inédita, revisada em cálculo, gabarito e explicação didática; alinhamento ao tópico de contabilidade/análise financeira do edital."}')
) as v(topic_id,item_key,subtopic,question_text,answer,explanation,difficulty,provenance)
on conflict (source_id,external_item_key) do nothing;