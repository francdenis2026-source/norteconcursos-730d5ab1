-- Amplia a seção didática sobre confiabilidade e qualidade dos dados no material PC-AC 2026.
-- Substitui somente a seção 4 e preserva a seção seguinte.
update public.study_materials
set body_md =
  left(body_md, strpos(body_md, '## 4. Confiabilidade e qualidade') - 1)
  || $section$## 4. Confiabilidade e qualidade

Ter uma fonte não significa que o dado esteja correto. **Confiabilidade** diz respeito ao quanto podemos confiar na origem e no processo de produção da informação. **Qualidade** diz respeito ao quanto o dado está adequado para a finalidade da análise.

Pense em um cadastro de pessoas: ele pode estar bem organizado, mas conter uma data de nascimento errada, endereço antigo ou registros duplicados. A aparência organizada não garante qualidade.

### 4.1 Confiabilidade da fonte

Antes de utilizar uma informação, avalie:

- **Proveniência:** é possível identificar de onde veio o dado?
- **Autoridade e competência:** quem produziu tinha atribuição ou conhecimento para registrar aquela informação?
- **Autenticidade:** há elementos para confirmar que o documento ou arquivo é o que afirma ser?
- **Integridade:** o conteúdo foi preservado ou pode ter sofrido alteração, corte ou adulteração?
- **Método de coleta:** como a informação foi obtida? Houve observação direta, declaração, medição ou coleta automática?
- **Rastreabilidade:** é possível reconstruir o caminho percorrido pelo dado, desde a origem até o uso?

**Exemplo:** um vídeo recebido por aplicativo de mensagens pode ser útil, mas, antes de tirar conclusões, é importante verificar sua origem, data, contexto, continuidade e se houve edição. O fato de o vídeo parecer convincente não comprova sua autenticidade.

### 4.2 Dimensões da qualidade dos dados

**Exatidão (acurácia):** o dado representa corretamente a realidade?

Exemplo: o sistema registra 18 anos para uma pessoa que tem 28. O dado está preenchido, mas não é exato.

**Completude:** os campos ou informações necessários estão presentes?

Exemplo: um cadastro de ocorrência contém data e natureza, mas não informa o município. Se o município é necessário para a análise, há falta de completude.

**Consistência:** os dados não apresentam contradições entre si ou entre sistemas?

Exemplo: o mesmo número de ocorrência aparece com duas datas diferentes em sistemas que deveriam estar sincronizados.

**Atualidade (tempestividade):** a informação está atualizada e disponível no momento adequado?

Exemplo: um endereço que era correto há três anos pode não representar o endereço atual. O dado pode ter sido exato quando coletado, mas estar desatualizado hoje.

**Validade:** o dado respeita regras, formatos e limites definidos?

Exemplo: um campo de data de nascimento recebe “45/19/2035”. O valor não respeita um formato de data válido. Um campo de idade não deveria aceitar números negativos.

**Unicidade:** cada entidade ou evento aparece uma única vez quando a regra do sistema exige ausência de duplicidade?

Exemplo: a mesma ocorrência foi cadastrada duas vezes com números diferentes, provocando contagem duplicada nas estatísticas.

**Adequação à finalidade:** o dado serve para responder à pergunta que está sendo investigada?

Exemplo: a quantidade total de ocorrências de um município pode ajudar a medir volume, mas não é suficiente, sozinha, para explicar as causas de cada ocorrência.

### 4.3 Não confunda as dimensões

| Dimensão | Pergunta de verificação | Problema típico |
|---|---|---|
| Exatidão | O valor está correto? | Idade errada |
| Completude | Falta informação necessária? | Município vazio |
| Consistência | Existem contradições? | Duas datas para o mesmo registro |
| Atualidade | Está atualizado? | Endereço antigo |
| Validade | Respeita formato e regra? | Data impossível |
| Unicidade | Há duplicidade indevida? | Ocorrência contada duas vezes |
| Adequação | Serve ao objetivo? | Dado que não responde à pergunta |

### 4.4 Um dado pode passar em um critério e falhar em outro

Imagine um cadastro com o endereço “Rua A, nº 10”:

- o endereço pode estar escrito corretamente (**validade**);
- pode ter sido informado pela própria pessoa (**proveniência identificável**);
- mas pode estar desatualizado porque a pessoa se mudou (**atualidade**);
- e pode aparecer repetido em dois cadastros (**unicidade**).

Por isso, não basta perguntar se o campo está preenchido. É necessário avaliar diferentes dimensões.

### 4.5 Como fazer uma verificação simples

1. **Defina a finalidade:** o que a análise precisa responder?
2. **Confira a origem:** quem gerou o dado e quando?
3. **Verifique regras:** formatos, intervalos e campos obrigatórios.
4. **Procure contradições:** compare registros e fontes.
5. **Identifique duplicidades:** veja se o mesmo evento aparece mais de uma vez.
6. **Avalie a atualização:** confirme se o período é adequado.
7. **Registre limitações:** indique o que não foi possível confirmar.

**Exemplo prático:** uma tabela informa 120 ocorrências em determinado mês. Antes de divulgar o número, confira se todas pertencem ao mesmo período, se não há duplicidades, se os registros foram classificados corretamente e se a base foi atualizada até o último dia do mês. Caso contrário, o total pode induzir a uma conclusão errada.

### 4.6 Pegadinhas frequentes em concursos

- Dado preenchido não significa dado completo: outros campos necessários podem estar ausentes.
- Formato válido não garante exatidão: uma data pode existir e ainda estar errada para aquela pessoa.
- Dado exato no passado pode estar desatualizado no presente.
- Duplicidade é problema de unicidade, não de confidencialidade.
- Contradição entre registros indica problema de consistência.
- Fonte oficial não significa informação infalível.
- Qualidade depende da finalidade: um dado adequado para uma análise pode ser insuficiente para outra.

### 4.7 Questões para fixação

**Questão 1.** Em uma base de ocorrências, o mesmo fato foi inserido duas vezes e, por isso, aparece duplicado no relatório estatístico. Qual dimensão da qualidade está diretamente comprometida?

A) Atualidade.
B) Unicidade.
C) Confidencialidade.
D) Disponibilidade.
E) Portabilidade.

**Gabarito: B.** A duplicação indevida viola a unicidade, pois o mesmo evento está sendo contado mais de uma vez. A questão não descreve dado antigo, indisponível ou sigiloso.

**Questão 2.** Um sistema aceita a data “31/02/2026” em um campo de nascimento. O problema está relacionado principalmente à:

A) validade.
B) atualidade.
C) unicidade.
D) confidencialidade.
E) disponibilidade.

**Gabarito: A.** A data não existe no calendário e viola uma regra de formato/validade. Mesmo que o campo esteja preenchido, o valor não é válido. A questão não permite concluir se a data real da pessoa está correta; mostra apenas que o valor informado não passa na validação.

## 5. Dado, inferência e conclusão$section$
  || substring(body_md from strpos(body_md, '## 5. Dado, inferência e conclusão')),
  updated_at = now()
where slug = 'pcac-2026-guia-analise-dados-01-fundamentos-ciclo-analitico'
  and strpos(body_md, '## 4. Confiabilidade e qualidade') > 0
  and strpos(body_md, '## 5. Dado, inferência e conclusão') > 0;
