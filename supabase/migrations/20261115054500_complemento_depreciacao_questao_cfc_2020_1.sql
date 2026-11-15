-- Complemento da aula 14 com a questão 21 do Exame CFC 2020.1.
update public.study_materials
set body_md = case when position('## Questão CFC 2020.1 — causas da depreciação' in body_md)=0 then body_md || '

## Questão CFC 2020.1 — causas da depreciação (questão 21)

O enunciado pergunta qual alternativa NÃO representa uma causa da depreciação de um bem do ativo imobilizado. As opções são: desgaste pelo uso; ação da natureza; amortização do intangível; obsolescência.

**Resposta: alternativa C — amortização do intangível.**

### Entenda sem decorar

Depreciação é a perda do valor depreciável de um bem tangível ao longo de sua vida útil. Pense em uma máquina, um veículo ou um equipamento: com o uso, com a ação do tempo/natureza ou porque fica ultrapassado, o benefício econômico que ainda pode gerar diminui.

- **Desgaste pelo uso:** a máquina trabalha, suas peças se desgastam e sua capacidade de uso é consumida.
- **Ação da natureza:** exposição ao tempo, chuva, sol, umidade e outros agentes naturais pode deteriorar o bem.
- **Obsolescência:** o bem fica ultrapassado, mesmo que ainda funcione. Exemplo: equipamento antigo que perde utilidade diante de tecnologia mais eficiente.
- **Amortização de intangível:** não é causa de depreciação. É outro processo contábil, aplicado ao valor amortizável de um ativo intangível com vida útil definida, como uma licença ou um direito de uso.

### Não confunda os três termos

| Termo | Aplica-se, em regra, a | Exemplo simples |
|---|---|---|
| Depreciação | Ativo imobilizado tangível | Veículo, máquina, computador |
| Amortização | Ativo intangível com vida útil definida | Licença, patente, direito contratual |
| Exaustão | Recursos naturais sujeitos à exploração | Mina, jazida, floresta explorada |

**Macete de prova:** bem físico que perde capacidade de serviço → depreciação; direito ou bem sem substância física → amortização; recurso natural explorado → exaustão.

Atenção: a questão original pede a alternativa EXCETO. Três alternativas descrevem causas de perda de utilidade do bem tangível; a alternativa C descreve outro procedimento contábil, aplicado a intangíveis.

### Treino autoral — fixação

1. O desgaste de uma máquina pelo uso é causa de depreciação. **Certo ou errado?**
2. A obsolescência pode justificar depreciação mesmo que o equipamento ainda funcione. **Certo ou errado?**
3. A amortização de uma patente é uma causa de depreciação de um veículo. **Certo ou errado?**
4. A exaustão é associada ao consumo de recursos naturais explorados. **Certo ou errado?**

**Gabarito comentado**
1. **Certo.** O uso consome a capacidade de serviço do bem.
2. **Certo.** O bem pode ficar ultrapassado antes de parar de funcionar.
3. **Errado.** Patente é intangível; sua alocação sistemática é amortização, não causa de depreciação do veículo.
4. **Certo.** Exaustão representa a alocação do custo de recursos naturais conforme sua exploração.
' else body_md end,
    flashcards = case when not coalesce(flashcards,'[]'::jsonb) @> '[{"f":"Qual alternativa é a exceção entre as causas da depreciação na questão CFC 2020.1, questão 21?"}]'::jsonb then coalesce(flashcards,'[]'::jsonb) || '[{"f":"Qual alternativa é a exceção entre as causas da depreciação na questão CFC 2020.1, questão 21?","b":"Alternativa C — amortização do intangível. É outro procedimento contábil, não uma causa de depreciação."},{"f":"Quais três causas de depreciação aparecem na questão CFC 2020.1?","b":"Desgaste pelo uso, ação da natureza e obsolescência."},{"f":"O que é obsolescência?","b":"Quando o bem fica ultrapassado e perde utilidade ou capacidade de gerar benefícios, mesmo que ainda funcione."},{"f":"Depreciação, amortização e exaustão: como diferenciar?","b":"Depreciação: bem tangível do imobilizado. Amortização: intangível com vida útil definida. Exaustão: recurso natural explorado."}]'::jsonb else flashcards end,
    quiz = case when not coalesce(quiz,'[]'::jsonb) @> '[{"q":"O desgaste pelo uso é uma causa de depreciação."}]'::jsonb then coalesce(quiz,'[]'::jsonb) || '[{"q":"O desgaste pelo uso é uma causa de depreciação.","a":true,"why":"O uso consome a capacidade de serviço do bem tangível."},{"q":"A ação da natureza pode contribuir para a depreciação de um bem.","a":true,"why":"Chuva, sol, umidade e outros agentes naturais podem deteriorar o bem."},{"q":"A amortização de um intangível é uma causa de depreciação de um item do imobilizado.","a":false,"why":"Amortização é procedimento distinto, aplicado ao ativo intangível."},{"q":"Um equipamento pode sofrer obsolescência mesmo que ainda funcione.","a":true,"why":"Ele pode ficar ultrapassado diante de novas tecnologias."},{"q":"Na questão 21 do CFC 2020.1, a alternativa EXCETO é a letra C.","a":true,"why":"Amortização do intangível não é causa de depreciação."}]'::jsonb else quiz end,
    source_note = concat_ws('; ', nullif(source_note,''), 'Questão 21, Consulplan/Exame CFC 2020.1, Prova 2020.1 - Resolvida - Parte 03.pdf, página 5; resposta explicada por distinção contábil entre depreciação e amortização.'),
    updated_at=now()
where slug='pcac-2026-contabilidade-14-imobilizado-depreciacao-provisoes-contingencias';
