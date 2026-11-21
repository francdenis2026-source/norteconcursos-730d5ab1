-- Amplia a seção didática sobre fontes de informação no material PC-AC 2026.
-- Substitui somente a seção 3, preservando as seções anteriores e posteriores.
update public.study_materials
set body_md = regexp_replace(
  body_md,
  '## 3\\. Fontes de informação.*?## 4\\. Confiabilidade e qualidade',
  $replacement$## 3. Fontes de informação

Uma **fonte de informação** é a origem de onde um dado ou uma informação é obtido. Pode ser um documento, uma pessoa, um banco de dados, um sistema, uma gravação, uma publicação ou uma instituição.

A primeira pergunta ao analisar uma informação deve ser: **de onde ela veio e em que condições foi produzida?** Saber apenas o conteúdo não basta. É necessário conhecer a origem, o contexto e a forma de obtenção.

### 3.1 Fontes primárias e secundárias

A classificação depende da relação da fonte com o fato que está sendo estudado.

**Fonte primária:** apresenta registro direto, original ou produzido no contexto do próprio acontecimento, sem depender de uma interpretação posterior para transmitir o conteúdo principal.

Exemplos:
- um boletim de ocorrência original, considerado como registro do atendimento;
- uma gravação original de câmera de segurança;
- uma entrevista realizada diretamente com uma testemunha;
- um documento oficial emitido pela instituição responsável;
- uma base de dados que registra diretamente as operações realizadas.

**Fonte secundária:** reúne, comenta, resume, compila ou interpreta informações que vieram de outras fontes.

Exemplos:
- uma reportagem que resume informações de um boletim;
- um artigo que analisa dados de uma pesquisa anterior;
- um relatório que consolida vários documentos;
- um livro didático que explica acontecimentos com base em fontes anteriores.

**Exemplo do cotidiano:** imagine que você queira saber o que aconteceu em uma reunião. A gravação integral da reunião é uma fonte primária. O resumo feito por alguém depois da reunião é uma fonte secundária.

**Atenção:** primária não significa automaticamente verdadeira, correta ou superior. Um depoimento direto pode conter engano; um documento original pode ter erro de preenchimento. A classificação indica a relação da fonte com o fato, não garante sua qualidade.

### 3.2 Fontes internas e externas

Essa classificação considera a posição da fonte em relação à organização que está realizando a análise.

- **Interna:** produzida ou mantida dentro da própria organização. Ex.: cadastro institucional, relatório interno, sistema de atendimento ou registro administrativo.
- **Externa:** obtida fora da organização. Ex.: publicação de outro órgão, base pública, notícia, estudo acadêmico ou informação fornecida por outra instituição.

**Exemplo:** para uma delegacia, o registro feito em seu próprio sistema é uma fonte interna. Um relatório estatístico publicado por outro órgão é uma fonte externa.

Uma fonte externa não é necessariamente menos confiável; uma fonte interna também não está livre de falhas. É preciso avaliar cada uma.

### 3.3 Fontes oficiais e não oficiais

- **Oficial:** divulgada ou produzida por órgão ou entidade competente, no exercício de suas atribuições. Ex.: legislação publicada em diário oficial, estatística divulgada por órgão público e comunicado institucional.
- **Não oficial:** produzida por pessoa, empresa, veículo de comunicação ou entidade sem caráter de publicação oficial do órgão competente.

**Exemplo prático:** para confirmar o texto vigente de uma lei, a publicação oficial é a referência mais apropriada. Uma postagem em rede social pode ajudar a localizar o assunto, mas não substitui a conferência do texto oficial.

**Pegadinha:** uma fonte oficial pode estar desatualizada, conter erro material ou não responder exatamente à pergunta. O caráter oficial não dispensa a verificação de data, competência e contexto.

### 3.4 Fontes digitais e físicas

A classificação considera o suporte em que a informação está disponível.

- **Digital:** arquivo eletrônico, banco de dados, página institucional, e-mail, fotografia digital, áudio ou vídeo.
- **Física:** documento em papel, livro impresso, formulário preenchido à mão, fotografia impressa ou registro em suporte físico.

O suporte não determina sozinho se a fonte é primária ou secundária. Um documento em papel pode ser primário; um arquivo digital também pode ser primário. Da mesma forma, ambos podem ser secundários.

### 3.5 Como analisar uma fonte antes de utilizá-la

Antes de usar um dado em uma análise, procure responder:

1. **Origem:** quem produziu ou forneceu a informação?
2. **Responsável:** qual pessoa, órgão ou sistema responde pelo registro?
3. **Data e período:** quando foi produzido e a que período se refere?
4. **Método de obtenção:** foi observado diretamente, declarado por alguém, coletado automaticamente ou reproduzido de outra fonte?
5. **Finalidade:** por que a informação foi produzida originalmente?
6. **Integridade:** há sinais de edição, cortes, alteração ou perda de conteúdo?
7. **Limitações:** o que essa fonte não consegue demonstrar?

**Exemplo de investigação:** uma planilha informa que determinado evento ocorreu às 14h32. Antes de usar esse horário, verifique quem alimentou a planilha, se o relógio do sistema estava correto, se o horário é local ou UTC e se o registro foi posteriormente corrigido.

### 3.6 Fontes repetidas não significam confirmações independentes

Imagine que cinco sites publiquem a mesma notícia. Se todos copiaram o texto de uma única reportagem, você não tem cinco confirmações independentes: tem uma informação reproduzida cinco vezes.

Uma confirmação é mais forte quando fontes realmente independentes chegam ao mesmo resultado por caminhos distintos, com registros próprios e verificáveis.

**Dica de prova:** procure expressões como “origem original”, “registro direto”, “compilação”, “análise de estudo anterior”, “produzida dentro da organização” e “obtida de outra instituição”. Elas ajudam a identificar a classificação correta.

### 3.7 Quadro comparativo

| Classificação | Pergunta que responde | Exemplo |
|---|---|---|
| Primária | A fonte registra diretamente o fato? | Gravação original |
| Secundária | A fonte resume ou interpreta outra? | Relatório de análise |
| Interna | Foi produzida dentro da organização? | Sistema institucional |
| Externa | Veio de fora da organização? | Base de outro órgão |
| Oficial | Foi publicada por autoridade competente? | Diário oficial |
| Não oficial | Foi produzida fora da publicação oficial? | Postagem particular |
| Digital | Está em suporte eletrônico? | Arquivo de áudio |
| Física | Está em suporte material? | Formulário em papel |

Essas classificações podem se combinar. Uma gravação digital feita diretamente durante um atendimento pode ser, ao mesmo tempo, primária, interna e digital.

### 3.8 Questões para fixação

**Questão 1.** Um analista consulta a gravação original de uma câmera de segurança e, em seguida, lê um relatório elaborado por outro servidor que descreve o conteúdo do vídeo. Considerando a relação com o fato registrado, a gravação e o relatório são, respectivamente:

A) secundária e primária.
B) primária e secundária.
C) interna e externa.
D) oficial e não oficial.
E) física e digital.

**Gabarito: B.** A gravação original registra diretamente o acontecimento e é fonte primária. O relatório descreve ou interpreta o conteúdo da gravação, sendo fonte secundária em relação ao vídeo. Não confunda a classificação pela origem com a classificação pelo suporte.

**Questão 2.** Uma instituição utiliza um relatório publicado por outro órgão público. O documento foi produzido fora da instituição que realiza a análise e divulgado oficialmente pelo órgão responsável. Em relação à instituição que o consulta, ele é:

A) interno e não oficial.
B) interno e primário obrigatoriamente.
C) externo e oficial.
D) externo e não oficial obrigatoriamente.
E) físico e primário obrigatoriamente.

**Gabarito: C.** É externo porque veio de outra organização e oficial porque foi divulgado pelo órgão competente. Ser externo não significa ser não oficial. O suporte físico ou digital não foi informado e não pode ser presumido.

## 4. Confiabilidade e qualidade$replacement$,
  'gs'
),
updated_at = now()
where slug = 'pcac-2026-guia-analise-dados-01-fundamentos-ciclo-analitico'
  and body_md like '%## 3. Fontes de informação%'
  and body_md like '%## 4. Confiabilidade e qualidade%';
