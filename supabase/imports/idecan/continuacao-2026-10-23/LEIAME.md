# Continuação individual PC-CE/IDECAN — 23/10/2026

Foram escritos **177 novos pareceres individuais**: os 90 itens restantes de Inspetor e os 87 de Escrivão. A primeira passagem cobre agora as 200 posições dos dois cadernos. Isso não significa certificação integral nem aprovação para treino: cada parecer registra os limites do cotejo e as verificações que ainda faltam.

As 23 decisões da etapa anterior foram preservadas sem alteração. A extração original, a letra histórica e os dados de origem também permanecem imutáveis.

## Estado proposto após aplicar a continuação

| Caderno Tipo B | Parecer com publicação retida (`reviewed`) | Superado para treino atual (`obsolete`) | Anulada confirmada (`rejected`) |
| --- | ---: | ---: | ---: |
| Inspetor | 97 | 3 | 0 |
| Escrivão | 95 | 2 | 3 |
| Total | 192 | 5 | 3 |

Nenhum payload de publicação foi criado. `reviewed` é um parecer privado com pendências, não um selo de questão juridicamente atual. Os novos pareceres mantêm `answer_verified=false`, `context_complete=false` e, quando jurídicos, `legal_current=false`, para impedir que uma primeira análise seja confundida com cumprimento de todos os critérios de `CONTENT_GOVERNANCE.md`.

## Achados de superação

- **Escrivão 66:** as sanções antigas por violação a princípios não reproduzem o art. 12, III, atualizado da Lei de Improbidade. O texto consultado prevê multa até 24 remunerações, não as sanções das afirmativas I e II.
- **Escrivão 74:** a exigência de dolo introduzida na LIA altera o julgamento da alternativa C; a alternativa E também não se torna falsa por isso. O conjunto de alternativa única de 2021 não conserva a mesma interpretação para legislação atual.
- **Inspetor 55:** a decisão do STF de 24/08/2023 nas ADIs do juiz das garantias altera o marco de competência, as exclusões e o tratamento da extrapolação do prazo. Não conservar o gabarito de 2021 como resposta atual.
- **Inspetor 56:** o art. 112, VI, c, no texto atualizado consultado da LEP, integra o patamar de 75% após a alteração de 2026. Os 50% da alternativa histórica não são a regra atual para um fato novo. A pergunta não fornece data do fato para impor aplicação de regra antiga.
- **Inspetor 68:** a premissa de afastamento por autoridade judicial **ou administrativa** não reproduz o art. 20 atualizado da LIA, que trata de autoridade judicial e prazo de até 90 dias prorrogável uma vez. A anotação X no quadro de Inspetor não foi promovida a anulação definitiva certificada.

Esses registros continuam preservados para análise histórica. O confronto foi feito em fontes alternativas oficiais e no STF; a certificação integral no Planalto permanece pendente. Não foram criados registros em `syllabus_exclusions` sem os IDs reais da edição/tópico de edital.

## Evidência efetivamente produzida

- [Parecer por item](pareceres.json): tema, forma de cobrança, conclusão qualificada, referências, dúvidas e decisão proposta. Nenhuma explicação foi preenchida por um texto genérico repetido.
- [Fontes e excertos](fontes-e-excertos.json): sete textos atualizados da Câmara, dispositivo de julgamento do STF e duas seções técnicas do FHS 3.0, com URL, hash e data. Os excertos legislativos foram capturados sem textos riscados; citações nos pareceres apontam para o trecho e seu hash.
- [Cotejo literal dos PDFs](cotejo-literal-pdf.json): todas as linhas textuais extraídas foram localizadas nas páginas indicadas dos PDFs com os hashes originais. Essa consistência não prova ausência de omissões, preservação de sublinhados ou integração de imagens.
- [Cotejo do gabarito](cotejo-gabarito.json): 100 posições de cada cargo conferidas novamente com o documento. A seção de Inspetor continua com a divergência de cabeçalho; não há certificação de gabarito definitivo para esse cargo.
- [Inspetor com os pareceres acumulados](pcce_inspetor_2021_revisado.json).
- [Escrivão com os pareceres acumulados](pcce_escrivao_2021_revisado.json).
- [Resumo e perfil histórico](resumo-e-perfil-observado.json).

As 14 consultas ao Planalto retornaram timeout, HTTP `000` e corpo vazio. Essas tentativas são registradas como **não verificadas**, sem data de vigência fictícia. O texto da Câmara é fonte oficial alternativa de confronto, mas não foi usado para contornar a exigência de publicação da plataforma. O dispositivo do STF foi lido na fonte oficial em RTF; ele não foi confundido com o despacho de admissão de amici curiae nem apresentado como acórdão integral.

## Pontos que seguem bloqueando publicação

1. Vínculo real a edição e tópico de edital ativo: nenhum ID foi inventado ou presumido.
2. Conferência de vigência no Planalto e das teses dependentes de jurisprudência, em toda a extensão necessária. Uma referência ao CP/CPP não certifica todas as cinco alternativas de uma questão jurisprudencial.
3. Gabarito de Inspetor: o quadro está num documento listado como definitivo, mas sua página tem cabeçalho preliminar. Os X desse quadro não foram certificados como anulações definitivas.
4. Material final: textos de apoio, figuras, sublinhados e diagramação precisam estar incorporados à questão de treino, não apenas acessíveis no PDF.
5. Legislação cearense: os dez itens específicos têm pertinência para PC-AC **não comprovada** e vigência estadual não certificada; não foram transferidos ao Acre.
6. Informática: versões e serviços digitais de 2021 precisam de delimitação temporal e documentação. As alternativas gráficas desaparecidas não foram substituídas por opções vazias.

Na questão **Escrivão 16**, o PDF imprime `$C$7:$C$8` no intervalo de soma de SOMASE, enquanto o intervalo de critério é `$B$7:$B$18`. Não se trata de um dígito perdido pela extração. O comportamento deve ser testado na versão de Calc citada ou confrontado com errata; não foi declarado erro de execução sem esse teste, nem alterado o texto original.

Na questão **Escrivão 52**, a classificação do sistema acusatório deve ser delimitada frente à permissão de diligência suplementar fixada pelo STF. Ela ficou retida para esse cotejo, sem declaração automática de anulação ou superação de todo o item.

## O que este recorte permite estudar para PC-AC

Os pareceres identificam casos práticos de lei no tempo, causalidade, imputação subjetiva, condições de procedibilidade e aplicação de regras a fatos; também há comparação literal de institutos e comandos que pedem exceção/incorreção. Isso orienta estudar a distinção que muda a solução, não apenas decorar a letra do gabarito antigo.

O perfil mantém os denominadores de **100 posições impressas por caderno**, incluindo itens históricos e excluídos, sem somar dois cargos do mesmo concurso como observações independentes da banca. A detecção automática de alguns comandos negativos é não exaustiva. Não foram calculadas probabilidades de cobrança na PC-AC, nem apresentada esta amostra como frequência de toda a IDECAN. Os totais não representam questões ativas na plataforma.

## Um único SQL para registrar a continuação

Execute [aplicar-continuacao.sql](aplicar-continuacao.sql) no SQL Editor como administrador, depois da carga e da primeira revisão já aplicadas. Ele atualiza apenas os 177 candidatos que estavam pendentes, com comparação do estado/payload esperado e auditoria de antes/depois. Não sobrescreve os 23 pareceres anteriores, mesmo se receberam notas posteriores.

A operação é transacional: um conflito desfaz todo o lote e preserva a decisão existente. Reexecutar a mesma decisão não duplica auditoria. Não modifica permissões, estudos dos alunos nem questões ativas.

**Este SQL foi preparado e testado localmente; não foi executado no Supabase remoto por esta sessão.** As contagens acima são propostas para a aplicação, não uma consulta ao estado atual da produção.

```sh
node scripts/idecan/build-continuation-review.mjs
node --import ./scripts/alias.mjs --test scripts/idecan/*.test.mjs scripts/question-corpus.test.mjs scripts/corpus-review.test.mjs
node scripts/idecan/test-continuation-review-sql.mjs /CAMINHO/DO/PGLITE/dist/index.js
```

O teste PostgreSQL/PGlite aplica a carga inicial, a primeira revisão e a continuação; verifica 200 registros de auditoria ao todo, preservação das 23 decisões anteriores, rollback por conflito concorrente, reexecução idempotente, recusa de usuário sem privilégio e zero publicações.
