-- PC-AC 2026: módulo de conciliação bancária baseado na questão 20 do Exame CFC 2020.1.
insert into public.study_materials (slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,source_note,content_status,flashcards,quiz,updated_at)
values ('pcac-2026-contabilidade-17-sistema-bancario-conciliacao-extrato-razao','Contabilidade Geral','17. Sistema bancário e operações financeiras: conciliação entre extrato e razão',17,'Sistema bancário e conciliação bancária','Conciliação bancária, identificação de lançamentos pendentes, tarifas, débitos, TED e cheques em trânsito.','# Aula 17 — Sistema bancário e conciliação bancária

## 1. O que é conciliação bancária?
É a comparação entre o saldo que aparece no extrato do banco e o saldo registrado na contabilidade da empresa (razão da conta Bancos). O objetivo é identificar por que os valores são diferentes e chegar ao saldo contábil correto.

**Jeito fácil:** o banco registra o que aconteceu na conta bancária; a empresa registra o que já lançou na contabilidade. Às vezes um lado já registrou e o outro ainda não.

## 2. Diferenças que exigem ajuste na contabilidade
Na questão 20 da Consulplan/CFC 2020.1, aparecem situações que ainda não tinham sido contabilizadas pela empresa:
- Despesas bancárias debitadas pelo banco: reduzem o saldo contábil.
- Débito bancário referente a luz e telefone: reduz o saldo contábil.
- Devolução de duplicata descontada por falta de pagamento: reduz o saldo bancário e exige registro contábil.
- TED recebida a favor da empresa, ainda não contabilizada: aumenta o saldo contábil.

## 3. Diferenças de tempo: não ajuste duas vezes
A mesma questão informa cheques emitidos e já contabilizados pela empresa, mas ainda não sacados pelos favorecidos. Também informa depósito em cheque já contabilizado pela empresa, mas ainda não creditado pelo banco.

Essas situações explicam a diferença entre extrato e razão, mas **não exigem novo lançamento na contabilidade** se a empresa já registrou corretamente a operação. São itens em trânsito.

- Cheque emitido e ainda não apresentado: já reduziu o razão; não subtraia novamente.
- Depósito ainda não creditado: já aumentou o razão; não some novamente.

## 4. Questão original — Consulplan/CFC 2020.1, questão 20
O enunciado informa:
- Saldo do extrato bancário: R$ 7.500.
- Saldo do razão contábil: R$ 10.750.
- Tarifas bancárias ainda não contabilizadas: R$ 300.
- Débito bancário de luz e telefone ainda não contabilizado: R$ 700.
- Cheques emitidos e contabilizados, ainda não sacados: R$ 6.000.
- Devolução de duplicata descontada, ainda não contabilizada: R$ 1.500.
- TED recebida, ainda não contabilizada: R$ 5.000.
- Depósito em cheque já contabilizado, ainda não creditado: R$ 1.000.

**Cálculo do saldo contábil correto:**
R$ 10.750 − R$ 300 − R$ 700 − R$ 1.500 + R$ 5.000 = **R$ 13.250**.

Resposta: **alternativa D — R$ 13.250**.

Por que não mexer nos R$ 6.000 de cheques e nos R$ 1.000 de depósito? Porque ambos já estão registrados no razão. São diferenças de compensação entre banco e empresa, não lançamentos que faltam na contabilidade.

## 5. Pegadinhas
- Não confunda saldo do extrato com saldo do razão.
- Tarifa bancária não contabilizada: diminui o razão.
- TED recebida não contabilizada: aumenta o razão.
- Cheque já contabilizado e ainda não sacado: não subtrair de novo.
- Depósito já contabilizado e ainda não creditado: não somar de novo.
- A devolução de duplicata descontada por falta de pagamento exige ajuste quando ainda não foi registrada.

## Treino autoral
1. Se o razão apresenta R$ 10.000 e há tarifa bancária de R$ 200 ainda não contabilizada, o ajuste reduz o saldo contábil para R$ 9.800. **Certo ou errado?**
2. Um depósito de R$ 900 já contabilizado pela empresa, mas ainda não creditado pelo banco, deve ser somado novamente ao razão. **Certo ou errado?**
3. Uma TED de R$ 2.000 recebida e ainda não contabilizada deve aumentar o saldo contábil. **Certo ou errado?**
4. Cheques de R$ 1.500 já emitidos e contabilizados, mas ainda não compensados, devem ser subtraídos novamente do razão. **Certo ou errado?**
5. Na questão 20 da Consulplan/CFC 2020.1, o saldo contábil correto é R$ 13.250. **Certo ou errado?**

**Gabarito comentado**
1. **Certo.** A tarifa já foi debitada no banco e faltava registrá-la na empresa: 10.000 − 200 = 9.800.
2. **Errado.** O depósito já foi registrado no razão; não some outra vez.
3. **Certo.** A entrada de dinheiro por TED aumenta o saldo bancário contábil.
4. **Errado.** O cheque já reduziu o razão; subtrair novamente duplicaria o efeito.
5. **Certo.** 10.750 − 300 − 700 − 1.500 + 5.000 = 13.250.','PC-AC 2026','Questão 20, Consulplan/Exame CFC 2020.1, Prova 2020.1 - Resolvida - Parte 03.pdf, páginas 3–4. Conteúdo restrito ao enunciado e aos dados apresentados no arquivo.','active','[{"f":"O que é conciliação bancária?","b":"Comparação do extrato bancário com o razão contábil para identificar diferenças e ajustes necessários."},{"f":"Tarifa bancária debitada e ainda não contabilizada: qual o efeito no razão?","b":"Diminui o saldo contábil."},{"f":"TED recebida e ainda não contabilizada: qual o efeito no razão?","b":"Aumenta o saldo contábil."},{"f":"Cheque já emitido e contabilizado, mas ainda não sacado: deve ser subtraído de novo?","b":"Não. Já reduziu o razão; é diferença de compensação."},{"f":"Depósito já contabilizado, mas ainda não creditado pelo banco: deve ser somado de novo?","b":"Não. Já aumentou o razão; é diferença de compensação."}]'::jsonb,'[{"q":"Tarifa bancária debitada no extrato e ainda não contabilizada reduz o saldo do razão.","a":true,"why":"A empresa precisa registrar a despesa bancária que o banco já debitou."},{"q":"Uma TED recebida e ainda não contabilizada deve reduzir o saldo contábil.","a":false,"why":"É entrada de recursos e aumenta o saldo contábil."},{"q":"Cheques já emitidos e contabilizados, mas ainda não sacados, devem ser subtraídos novamente do razão.","a":false,"why":"O efeito já foi reconhecido pela empresa; não se registra duas vezes."},{"q":"Depósito em cheque já contabilizado, mas ainda não creditado pelo banco, deve ser somado novamente ao razão.","a":false,"why":"O depósito já aumentou o razão; é uma diferença de tempo."},{"q":"Na questão Consulplan/CFC 2020.1, o saldo contábil correto após os ajustes é R$ 13.250.","a":true,"why":"10.750 − 300 − 700 − 1.500 + 5.000 = R$ 13.250."}]'::jsonb,now())
on conflict (slug) do update set discipline=excluded.discipline,topic_label=excluded.topic_label,sort_order=excluded.sort_order,title=excluded.title,summary=excluded.summary,body_md=excluded.body_md,source_note=excluded.source_note,content_status='active',flashcards=excluded.flashcards,quiz=excluded.quiz,updated_at=now();
