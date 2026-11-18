update public.question_bank
set explanation = 'A alternativa correta é E — propriedade para investimento, pelo valor justo. A entidade deixou de usar o prédio em suas atividades administrativas e passou a alugá-lo a terceiros. O imóvel, portanto, não está mais sendo mantido para uso próprio. Ele é mantido para obter aluguel, característica de propriedade para investimento segundo a NBC TSP 06. A mobília também acompanha esse conjunto quando está vinculada ao imóvel alugado e é necessária para gerar os aluguéis. Como o enunciado informa que a entidade utiliza o modelo do valor justo, a mobília deve ser classificada e mensurada como propriedade para investimento pelo valor justo. Exemplo: se uma entidade muda seus escritórios para outro prédio e aluga o antigo mobiliado, o prédio e os móveis destinados ao aluguel passam a ser tratados conforme o modelo de propriedade para investimento adotado.'
where id = 'cac7db9e-e395-4b9a-96a4-963796d7b4a3';

update public.study_materials
set body_md = body_md || $prop$

## Propriedade para investimento — NBC TSP 06

### O que é?

Propriedade para investimento é um imóvel mantido para:

- receber aluguéis;
- obter valorização do imóvel;
- ou as duas finalidades.

### Diferença para o imobilizado

- **Imobilizado:** imóvel usado pela própria entidade, como escritório, hospital ou almoxarifado.
- **Propriedade para investimento:** imóvel alugado a terceiros ou mantido para valorização.

### Aplicação na questão

A entidade mudou suas atividades administrativas para outro local. O prédio antigo passou a ser alugado a terceiros.

Assim, ele deixou de ser usado pela própria entidade e passou a gerar aluguel. Por isso, entra no conceito de propriedade para investimento.

A mobília também está vinculada ao imóvel alugado e é utilizada para gerar os aluguéis. Por isso, acompanha a classificação indicada no enunciado.

### Custo e valor justo

- **Modelo do custo:** o ativo é registrado pelo custo, reduzido por depreciação e perdas, quando aplicável.
- **Modelo do valor justo:** o ativo é mensurado pelo valor justo, conforme o modelo adotado pela entidade. As variações podem afetar o resultado.

Como a questão informa que foi adotado o modelo do valor justo, a resposta é:

**Propriedade para investimento, pelo valor justo.**

### Exemplo simples

Uma prefeitura muda seus servidores para um novo prédio e aluga o prédio antigo mobiliado.

- O prédio antigo não é mais usado pela prefeitura.
- O aluguel gera benefícios econômicos ou de serviços.
- O imóvel e os bens vinculados ao aluguel são analisados conforme a NBC TSP 06.
- Se o modelo adotado for o valor justo, a mensuração segue o valor justo.

**Dica:** pergunte sempre: a entidade usa o imóvel para suas próprias atividades ou para obter aluguel? Uso próprio indica imobilizado. Aluguel indica propriedade para investimento.

$prop$,
updated_at = now()
where slug = 'pcac-2026-contabilidade-14-imobilizado-depreciacao-provisoes-contingencias';
