-- PC-AC 2026 — journal entries, double-entry accounting and trial balance.
-- Removes the unrelated CPC 26 passage and expands practical examples.

update public.study_materials
set body_md=split_part(body_md,E'\n## Classificação dos passivos financeiros — CPC 26',1)
|| E'\n\n## 12. Como montar um lançamento sem decorar?\n\nUse quatro perguntas: (1) qual fato ocorreu e qual documento o comprova? (2) quais contas foram afetadas? (3) cada conta aumentou ou diminuiu? (4) qual é sua natureza? Depois aplique as regras de débito e crédito e confira a igualdade.\n\nExemplo: a empresa paga R$ 500 de aluguel em dinheiro. A despesa aumenta por débito; Caixa, que é ativo, diminui por crédito. Lançamento: Débito Despesa de Aluguel R$ 500; Crédito Caixa R$ 500.\n\nExemplo: compra de mercadorias a prazo por R$ 2.000. Estoques (ativo) aumenta por débito; Fornecedores (passivo) aumenta por crédito.\n\n## 13. As quatro fórmulas de lançamento\n\n- **1ª fórmula:** 1 débito e 1 crédito.\n- **2ª fórmula:** 1 débito e 2 ou mais créditos.\n- **3ª fórmula:** 2 ou mais débitos e 1 crédito.\n- **4ª fórmula:** 2 ou mais débitos e 2 ou mais créditos.\n\nA quantidade de contas em cada lado classifica a fórmula; a soma dos valores debitados e creditados deve permanecer igual.\n\n## 14. Retificação: estorno, transferência e complementação\n\n- **Estorno:** faz o lançamento inverso para anular o registro incorreto.\n- **Transferência:** desloca o valor da conta indevida para a conta correta.\n- **Complementação:** acrescenta ou reduz o valor para corrigir diferença de quantia.\n\nA retificação deve preservar histórico e rastreabilidade; não se apaga o registro original sem trilha de correção.\n\n## 15. Diário, Razão e balancete\n\nO Diário organiza os fatos em ordem cronológica; o Razão agrupa os movimentos por conta; o balancete reúne saldos devedores e credores para conferência. O balancete equilibrado não prova que tudo está correto: pode haver omissão integral, conta errada ou lançamento de valor errado com débitos e créditos iguais.\n',
updated_at=now()
where contest_name='PC-AC 2026'
and slug='pcac-2026-contabilidade-03-escrituracao-partidas-dobradas';

-- Ten original trainer questions and answer keys retained; detailed explanations,
-- exam tips and resolution_steps are in the live trainer record.
