update public.board_exam_questions
set
  stem = 'Uma entidade possui contas bancárias em três diferentes instituições. Em 31/12/X0, os saldos eram os seguintes:\n\nBanco | Saldo da conta\nAlfa | R$ 20.000,00\nBeta | R$ 18.000,00\nGama | -R$ 10.000,00\n\nAssinale a opção que indica a contabilização da conta no banco Gama no balanço patrimonial da entidade.',
  options = jsonb_build_object(
    'A','Passivo circulante.',
    'B','Ativo circulante.',
    'C','Redutora do ativo circulante.',
    'D','Ativo realizável a longo prazo.',
    'E','Redutora do ativo realizável a longo prazo.'
  ),
  explanation = 'Gabarito: alternativa A — Passivo circulante.\n\n1. Primeiro, observe o sinal do saldo: Alfa e Beta têm saldos positivos, mas o Banco Gama apresenta saldo negativo de R$ 10.000,00.\n\n2. O que significa saldo bancário negativo? Significa que a entidade está com a conta a descoberto ou utilizou limite de crédito/cheque especial. Em vez de possuir dinheiro disponível no Banco Gama, ela tem uma obrigação a pagar à instituição financeira.\n\n3. Como classificar no Balanço Patrimonial? Uma obrigação financeira exigível no curto prazo é registrada no PASSIVO CIRCULANTE. Portanto, o saldo negativo do Banco Gama não é dinheiro no ativo e, nesta questão, também não deve ser tratado como conta redutora do ativo.\n\nExemplo do cotidiano: imagine que sua conta tenha R$ 500,00, mas você utilize R$ 800,00 do cheque especial. O saldo fica em -R$ 300,00. Você não tem um ativo de -R$ 300,00; você deve R$ 300,00 ao banco. Para a entidade, a lógica é a mesma.\n\nDica de prova: saldo bancário positivo representa disponibilidade (em regra, ativo circulante). Saldo bancário negativo representa dívida com o banco (em regra, passivo circulante).\n\nAtenção: a questão pergunta especificamente como contabilizar o saldo negativo do Banco Gama. Não confunda a classificação do saldo positivo das outras contas com a obrigação gerada pelo saldo negativo.',
  review_note = coalesce(review_note,'') || ' | Correção editorial 2026-11-18: tabela de saldos estava indevidamente anexada à alternativa E; tabela recolocada no enunciado, alternativas restauradas e explicação didática ampliada. Gabarito oficial A preservado.',
  verified_at = now()
where id = '06ea7c4e-725d-433c-a40a-b6eec4863d72';
