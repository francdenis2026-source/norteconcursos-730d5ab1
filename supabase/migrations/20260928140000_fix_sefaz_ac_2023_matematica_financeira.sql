-- CORREÇÃO DE DADOS (não é só explicação didática): os itens 8 e 9 de
-- Matemática Financeira do SEFAZ-AC 2023 (Especialista da Fazenda
-- Estadual) foram importados com erro. Conferido direto no gabarito
-- definitivo oficial da CEBRASPE:
-- https://cdn.cebraspe.org.br/concursos/sefaz_ac_23/arquivos/GAB_DEFINITIVO_946_SEFAZ_AC_CG2_01.PDF
-- e na prova original:
-- https://cdn.cebraspe.org.br/concursos/sefaz_ac_23/arquivos/946_SEFAZ_AC_CG2_01.PDF
--
-- Item 8: gabarito oficial é 'C' (R$ 9.100,00), estava cadastrado como 'D'.
-- Reconferido matematicamente: 3.600 (1ª prestação, vence no dia da
-- quitação) + 3.600/1,2 (2ª, um mês de desconto) + 3.600/1,2² (3ª, dois
-- meses de desconto) = 3.600 + 3.000 + 2.500 = R$ 9.100,00.
--
-- Item 9: além do gabarito estar errado ('C' em vez de 'D'), o ENUNCIADO
-- também tinha um erro de transcrição — a prova original diz
-- "1,04^12 = 1,6" (doze meses, um ano), não "1,04^24 = 1,6" como estava
-- cadastrado. Com o dado correto, dois anos = dois períodos de 12 meses,
-- então o fator de 2 anos é 1,6² = 2,56, e o valor pago é
-- 2.000 × 2,56 = R$ 5.120,00 (opção D) — bate com o gabarito oficial.

update public.official_exam_questions set
  official_answer = 'C',
  review_note = $q$Correto (gabarito oficial CEBRASPE conferido em 29/09/2026, corrigindo um erro de importação anterior que constava 'D'). Quitar a dívida no dia da 1ª prestação significa pagar a 1ª parcela inteira (ela vence agora) e trazer as outras duas a valor presente, descontando os juros compostos de 20% ao mês: 3.600 + 3.600/1,2 + 3.600/1,2² = 3.600 + 3.000 + 2.500 = R$ 9.100,00.
Exemplo: é como negociar quitar todas as parcelas de um financiamento de uma vez — quem ainda não venceu ganha um "desconto" pelo tempo que falta, exatamente na mesma taxa de juros que seria cobrada se você esperasse.$q$
where exam_year = 2023 and item_number = 8 and career_name = 'Especialista da Fazenda Estadual' and official_answer = 'D';

update public.official_exam_questions set
  official_answer = 'D',
  question_text = 'A quantia de R$ 2.000,00 foi emprestada a uma taxa de 4% ao mês no regime de juros compostos. Se a dívida total for paga em uma única parcela 2 anos após o empréstimo, então, considerando que 1,04^12 = 1,6, o valor pago será igual a: A) R$ 2.160,00; B) R$ 3.200,00; C) R$ 3.920,00; D) R$ 5.120,00; E) R$ 6.400,00.',
  review_note = $q$Correto (gabarito oficial CEBRASPE conferido em 29/09/2026 — este item tinha DOIS erros de importação: o enunciado estava com "1,04^24 = 1,6" em vez do "1,04^12 = 1,6" da prova original, e o gabarito estava como 'C' em vez de 'D'). Como o dado fornecido é o fator de UM ano (12 meses) e a dívida é paga após DOIS anos (24 meses), é preciso elevar o fator ao quadrado: 1,6² = 2,56. O valor pago é 2.000 × 2,56 = R$ 5.120,00.
Exemplo: é o mesmo truque de "juntar dois anos iguais" — se um ano multiplica a dívida por 1,6, dois anos seguidos multiplicam por 1,6 × 1,6 (não por 1,6 + 1,6), porque no ano 2 os juros incidem sobre o valor já maior do ano 1.$q$
where exam_year = 2023 and item_number = 9 and career_name = 'Especialista da Fazenda Estadual' and official_answer = 'C';

update public.official_exam_questions set
  review_note = $q$Correto. Desconto racional simples (também chamado "por dentro") calcula o desconto sobre o valor que seria necessário HOJE pra virar o valor nominal lá na frente, não direto sobre o valor nominal. A fórmula é: desconto = VN × i × n / (1 + i × n) = 3.500 × 0,05 × 8 / (1 + 0,05 × 8) = 1.400 / 1,4 = R$ 1.000,00. Valor pago = 3.500 − 1.000 = R$ 2.500,00.
Exemplo: é diferente de simplesmente "tirar 5% ao mês direto" do valor nominal (isso seria desconto comercial/"por fora") — o racional simples calcula de trás pra frente, perguntando "quanto eu precisaria ter hoje pra virar R$ 3.500 daqui a 8 meses, com essa taxa?"$q$
where exam_year = 2023 and item_number = 10 and career_name = 'Especialista da Fazenda Estadual' and official_answer = 'C';
