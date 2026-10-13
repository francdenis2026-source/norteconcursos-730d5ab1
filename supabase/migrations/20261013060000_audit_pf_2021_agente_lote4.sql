-- Auditoria PF 2021 Agente de Polícia Federal — lote 4 (11 itens de
-- Contabilidade Geral: teoria geral, CPC 00 - Estrutura Conceitual, PECLD
-- e classificação de passivos/intangíveis). Itens 108 e 119 já estão
-- anulados no gabarito oficial.

update public.official_exam_questions
set review_note=$q$Errado. Fornecedores e impostos a recolher são contas do PASSIVO, cuja natureza contábil é CREDORA — não devedora. Contas devedoras são, em regra, as do ativo e as de despesa.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=107;

update public.official_exam_questions
set review_note=$q$Errado. A classificação clássica das fórmulas de lançamento contábil é: 1ª fórmula (uma conta devedora, uma credora); 2ª fórmula (uma devedora e duas ou mais credoras, ou o inverso); 3ª fórmula/mista (duas ou mais contas devedoras E duas ou mais credoras simultaneamente). O item descreve a 2ª fórmula, não a 3ª ("fórmula complexa").$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=109;

update public.official_exam_questions
set review_note=$q$Correto. Pela Estrutura Conceitual (CPC 00), um ativo é um recurso controlado pela entidade capaz de gerar benefícios econômicos futuros; um bem sem potencial de serviços ou incapaz de gerar tais benefícios não atende à definição de ativo.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=110;

update public.official_exam_questions
set review_note=$q$Errado. "Custo de liberação" (ou valor de liquidação) é uma base de mensuração tipicamente associada a PASSIVOS (o montante necessário para liquidar uma obrigação), não a "ativos em geral" como afirma o item.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=111;

update public.official_exam_questions
set review_note=$q$Correto. Pela Estrutura Conceitual (CPC 00), a consistência (uniformidade de critérios contábeis ao longo do tempo e entre entidades) é uma condição que favorece a comparabilidade da informação contábil.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=112;

update public.official_exam_questions
set review_note=$q$Correto. Recebíveis cuja liquidação é duvidosa devem ser avaliados pelo valor líquido de realização, com os ajustes contábeis (perdas estimadas em créditos de liquidação duvidosa — PECLD) necessários para refletir essas perdas esperadas.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=113;

update public.official_exam_questions
set review_note=$q$Errado. As perdas estimadas com créditos de liquidação duvidosa (PECLD) são reconhecidas como despesa em contrapartida a uma conta REDUTORA do ativo (conta de provisão/ajuste, como "perdas estimadas em créditos de liquidação duvidosa"), não diretamente na própria conta do ativo que representa os recebíveis.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=114;

update public.official_exam_questions
set review_note=$q$Errado. Adiantamentos a empregados representam um direito da empresa a receber (ATIVO, geralmente circulante) — não uma despesa a ser apresentada na demonstração do resultado do exercício.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=115;

update public.official_exam_questions
set review_note=$q$Errado. Deduções sobre vendas (devoluções, abatimentos e tributos incidentes sobre vendas, como ICMS/ISS/PIS/COFINS) são itens que reduzem a RECEITA BRUTA para chegar à receita líquida — não são classificadas como "despesas" no sentido contábil do termo.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=116;

update public.official_exam_questions
set review_note=$q$Correto. Nas empresas industriais, o custo associado às vendas é denominado custo do produto vendido (CPV) — distinto do CMV (custo da mercadoria vendida, usado no comércio) e do CSP (custo do serviço prestado).$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=117;

update public.official_exam_questions
set review_note=$q$Correto. Uma dívida mantida com o intuito de negociação no mercado (ativo/passivo financeiro "para negociação", held for trading) é classificada como PASSIVO CIRCULANTE, independentemente do prazo original de vencimento, por sua natureza de curto prazo e liquidez esperada.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=118;

update public.official_exam_questions
set review_note=$q$Correto. Pelo CPC 27 (Ativo Imobilizado) / CPC 04 (Ativo Intangível), um ativo intangível com vida útil definida está sujeito à amortização, cujo início ocorre quando o ativo está disponível para uso — e não apenas quando efetivamente utilizado.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=120;
