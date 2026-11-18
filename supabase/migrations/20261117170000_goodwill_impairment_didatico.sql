update public.curated_question_catalog
set explanation = 'O item está CERTO. Goodwill é o ágio por expectativa de rentabilidade futura reconhecido em uma combinação de negócios. Ele não é um ativo separado que possa ser reavaliado livremente. Quando o teste de impairment mostra que o goodwill perdeu valor, a perda é reconhecida no resultado. Depois que essa perda foi reconhecida, o CPC 01 não permite sua reversão em período futuro. A razão é evitar que a empresa volte a aumentar artificialmente o valor do goodwill com base em uma recuperação posterior. Exemplo: uma aquisição gera goodwill de R$ 100.000 e, após o teste, é reconhecida perda de R$ 30.000. O saldo passa a ser R$ 70.000 e não pode retornar a R$ 100.000 por reversão dessa perda. Atenção: outros ativos podem admitir reversão dentro de limites, mas a perda de goodwill não.'
where id = 'cacef5c8-5408-431f-9a6d-db03e0f5067e';

update public.study_materials
set body_md = body_md || $goodwill$

## Goodwill e impairment — explicação didática

### O que é goodwill?

Goodwill é o valor pago em uma combinação de negócios que supera o valor justo dos ativos líquidos identificáveis adquiridos. Ele representa expectativas como:

- boa reputação;
- clientela fiel;
- equipe experiente;
- sinergias entre empresas;
- capacidade de gerar lucros futuros.

O goodwill não é uma máquina, um estoque ou um direito que possa ser separado facilmente. Ele está ligado à expectativa de rentabilidade futura do negócio adquirido.

### O que é impairment?

Impairment é a redução ao valor recuperável de um ativo. A empresa compara o valor contábil com o valor que espera recuperar pelo uso ou pela venda.

Se o valor contábil for maior do que o valor recuperável, existe perda por impairment.

### Por que a perda do goodwill não pode ser revertida?

Quando o goodwill sofre impairment, a perda é reconhecida no resultado e reduz seu valor contábil.

**Exemplo:**

- Goodwill registrado: R$ 100.000;
- Perda por impairment: R$ 30.000;
- Novo valor contábil: R$ 70.000.

Se a empresa melhorar no ano seguinte, ela não pode simplesmente registrar novamente os R$ 30.000. O CPC 01 proíbe essa reversão porque seria difícil separar uma recuperação real do goodwill de uma nova expectativa criada pela própria administração.

### Diferença em relação a outros ativos

Em alguns ativos, uma perda por impairment pode ser revertida quando há evidência de recuperação, respeitando os limites contábeis. Para o goodwill, a perda reconhecida não pode ser revertida.

### Exemplo do cotidiano

Uma empresa compra outra por causa de sua marca, clientela e capacidade de gerar lucros. Parte do preço pago é reconhecida como goodwill.

Se os clientes diminuem muito e a empresa deixa de gerar os lucros esperados, o goodwill pode perder valor. Essa redução é reconhecida como impairment.

Se o negócio melhorar depois, o goodwill não volta a ser aumentado pela reversão da perda.

### Como resolver questões

1. Identifique se o assunto é goodwill.
2. Verifique se ocorreu perda por impairment.
3. Lembre que a reversão da perda do goodwill é proibida.
4. Não confunda goodwill com outros ativos que podem admitir reversão dentro de limites.

**Dica:** “perda por impairment de goodwill não pode ser revertida” é uma regra direta do CPC 01 e costuma aparecer em itens de Certo ou Errado.

$goodwill$,
updated_at = now()
where slug = 'pcac-2026-contabilidade-10-impairment-goodwill-reducao-valor-recuperavel';
