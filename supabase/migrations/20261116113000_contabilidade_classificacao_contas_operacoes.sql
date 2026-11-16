-- Complemento didático sobre a classificação das contas nas operações básicas.

update public.study_materials
set body_md = body_md || $material$

## Classificação das contas nas operações do dia a dia

Para descobrir a que grupo pertence um termo, pergunte o que ele representa para a entidade:

| Termo | Classificação | Como entender |
|---|---|---|
| Integralização de capital | Ativo + Patrimônio Líquido | Entra dinheiro ou outro bem e aumenta o Capital Social |
| Equipamentos | Ativo não circulante — imobilizado | Bens usados nas atividades da entidade |
| Estoque ou mercadoria | Ativo circulante | Bens mantidos para venda, consumo ou transformação |
| Mercadoria a prazo | Estoque no Ativo + Fornecedores no Passivo | A mercadoria entra e nasce uma obrigação |
| Mercadoria à vista | Estoque no Ativo + redução de Caixa ou Bancos | A mercadoria entra e o pagamento ocorre imediatamente |
| Fornecedores | Passivo circulante | Dívidas por compras ou serviços ainda não pagos |
| Clientes | Ativo circulante | Direitos por vendas ou serviços feitos a prazo |
| Capital social | Patrimônio Líquido | Valor prometido ou entregue pelos sócios |

### Exemplos de lançamentos

1. **Integralização de capital de R$ 50.000:** débito em Caixa e crédito em Capital Social.
2. **Compra de mercadorias a prazo por R$ 10.000:** débito em Estoque e crédito em Fornecedores.
3. **Compra de mercadorias à vista por R$ 4.000:** débito em Estoque e crédito em Caixa.
4. **Compra de equipamento por R$ 8.000 à vista:** débito em Equipamentos e crédito em Caixa.

### Macete de prova

“A prazo” significa que nasce uma obrigação com fornecedores. “À vista” significa que o dinheiro sai imediatamente de Caixa ou Bancos. A dívida não é descontada do valor do estoque: o estoque fica no Ativo e a obrigação aparece separadamente no Passivo.

**Integralização de capital não é despesa nem receita.** É uma operação que aumenta o patrimônio da entidade e o Capital Social no Patrimônio Líquido.

### Treino autoral

1. Equipamentos usados pela empresa pertencem normalmente ao Ativo não circulante imobilizado. **Certo.** São bens corpóreos usados na atividade.
2. A compra de mercadorias a prazo aumenta Estoque e Fornecedores. **Certo.** A mercadoria entra no Ativo e a dívida nasce no Passivo.
3. A compra de mercadorias à vista cria Fornecedores. **Errado.** O pagamento é imediato; aumenta Estoque e reduz Caixa ou Bancos.
4. A integralização de capital é uma despesa. **Errado.** Ela aumenta o Ativo e o Capital Social no Patrimônio Líquido.
$material$,
flashcards = coalesce(flashcards, '[]'::jsonb) || '[
  {"f":"A que grupo pertencem os equipamentos?","b":"Ao Ativo não circulante, no grupo do imobilizado."},
  {"f":"O que acontece na compra de mercadorias a prazo?","b":"Aumenta Estoque no Ativo e Fornecedores no Passivo."},
  {"f":"O que acontece na compra de mercadorias à vista?","b":"Aumenta Estoque e diminui Caixa ou Bancos."},
  {"f":"A integralização de capital é despesa?","b":"Não. Ela aumenta o Ativo e o Capital Social no Patrimônio Líquido."}
]'::jsonb,
quiz = coalesce(quiz, '[]'::jsonb) || '[
  {"q":"Equipamentos usados pela entidade pertencem normalmente ao Ativo não circulante imobilizado.","a":true,"why":"São bens corpóreos usados nas atividades da entidade."},
  {"q":"A compra de mercadorias a prazo aumenta Estoque e Fornecedores.","a":true,"why":"A mercadoria entra no Ativo e nasce uma obrigação no Passivo."},
  {"q":"A compra de mercadorias à vista aumenta Estoque e Fornecedores.","a":false,"why":"O pagamento imediato reduz Caixa ou Bancos; não nasce obrigação com fornecedor."},
  {"q":"A integralização de capital é registrada como despesa.","a":false,"why":"É uma operação entre Ativo e Patrimônio Líquido."}
]'::jsonb,
updated_at = now()
where slug = 'pcac-2026-contabilidade-01-fundamentos-patrimonio-ativo-passivo'
  and position('## Classificação das contas nas operações do dia a dia' in body_md) = 0;
