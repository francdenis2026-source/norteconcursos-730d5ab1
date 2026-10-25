# Verificação da quantidade de questões do PDF CESPE

A capa anuncia **7.000 questões**, mas a conferência não comprovou esse total de
questões individualizadas no arquivo enviado. Também não comprovou que 3.703
questões tenham sido perdidas na extração. A diferença aritmética entre o título
e o inventário de registros não permite essa conclusão.

## O que foi efetivamente verificado

- SHA-256 do PDF: `cd1bd6a9eb5e62e0cf6b5ae0be4d5f332b968432c419733878d30956d45ec705`.
- Todas as **510 páginas** foram examinadas por censo automático do texto: capa,
  três páginas de sumário e 506 páginas de conteúdo.
- **491 páginas** apresentam no cabeçalho o número impresso esperado na sequência
  1–506; as 15 restantes coincidem exatamente com as aberturas dos 15 capítulos.
  Não foi detectado cabeçalho com número divergente da sequência esperada.
- A capa, o último trecho do sumário e a página final foram também inspecionados
  visualmente. A página final exibe o número 506 e termina com questão comentada
  e gabarito. Não se realizou revisão visual manual de todas as páginas.
- O sumário enumera as mesmas 15 matérias encontradas na extração.

Esses resultados não provam que o PDF corresponda a toda a edição comercial,
mas não mostram um salto na paginação do conteúdo presente. Não foi confirmado
qual critério editorial originou o número 7.000 da capa.

## Unidades diferentes não devem ser confundidas

| Observação | Quantidade |
|---|---:|
| Registros da primeira extração | 3.233 |
| Registros da extração complementar | 64 |
| Registros acumulados nos arquivos de extração | 3.297 |
| Identidades segmentadas pela leitura v2 | 3.291 |
| Linhas de gabarito no PDF | 1.655 |
| Referências brutas de resposta nessas linhas | 3.289 |
| Referências após eliminar rótulos repetidos na mesma linha | 3.285 |
| Referências após também descontar o par de gabaritos paralelos observado | 3.281 |

**3.281 não é uma contagem certificada de questões únicas.** É uma medida de
referências editoriais de resposta após ajustes específicos, independente da
segmentação por cabeçalho de prova. Enunciados sem gabarito, erros editoriais,
repetições entre provas, associações de contexto e limites de itens ainda exigem
conferência. Todos os gabaritos foram reconhecidos pelo parser, sem que isso
represente validação de suas respostas.

Os 3.297 registros de extração incluem quatro grupos antigos com tabelas agora
separados em itens e dois fragmentos de comentário não reidentificados na v2.
Isso explica a diferença de seis registros para as 3.291 identidades da v2,
sem certificar que estas últimas sejam questões únicas e completas. Esse
inventário histórico local também inclui itens posteriormente removidos do banco;
não é uma contagem atual de questões disponíveis aos alunos.

Foram observados 2.512 marcadores numéricos na fonte dos enunciados e 105 na fonte
usada pelos comentários. Também há 745 alternativas A, 745 B, 745 C, 744 D e 506 E.
**Alternativas A–E não foram somadas como questões independentes.** Há testes com
quatro opções, portanto a ausência de uma alternativa E não indica automaticamente
um item perdido. Os números de marcadores também não são totais de questões:
há enunciados sem marcador numérico e grupos com várias afirmações.

## Conferência por matéria

As referências são atribuídas à página onde o gabarito foi impresso; os registros
são atribuídos à página inicial informada pela extração. Diferenças entre as duas
colunas não comprovam faltas e não foram corrigidas com inserções automáticas.

| Matéria | Páginas do PDF | Registros extraídos | Referências brutas de resposta |
|---|---:|---:|---:|
| Língua Portuguesa | 5–52 | 357 | 363 |
| Geografia | 53–76 | 155 | 155 |
| História do Brasil | 77–116 | 245 | 246 |
| História Mundial | 117–166 | 239 | 238 |
| Política Internacional | 167–226 | 266 | 261 |
| Ética Profissional | 227–246 | 100 | 100 |
| Legislação da Pessoa Idosa | 247–254 | 44 | 44 |
| Legislação da Pessoa com Deficiência | 255–259 | 25 | 25 |
| Direito Processual Civil | 260–370 | 694 | 690 |
| Língua Inglesa | 371–389 | 260 | 260 |
| Língua Espanhola | 390–392 | 34 | 34 |
| Economia | 393–410 | 103 | 102 |
| Contabilidade | 411–460 | 284 | 280 |
| Legislação de Trânsito | 461–477 | 136 | 136 |
| Legislação Institucional | 478–510 | 355 | 355 |

## Limite da conclusão e reprodução

O censo aponta para a ordem de **3,3 mil registros/referências**, mas não fecha uma
contagem manual definitiva de questões únicas. Não há fundamento, nesta análise,
para anunciar 7.000 questões extraídas nem para dizer que faltam exatamente 3.703.
Ainda há correções pontuais de segmentação e texto, além da auditoria necessária
antes da publicação de questões históricas. As 30 adaptações publicadas são um
conjunto separado e não preenchem uma diferença para o título da capa.

O JSON ao lado registra métricas para cada uma das 510 páginas. O script
`scripts/review/audit-cespe2016-question-count.py` recebe PDF, inventário inicial,
suplemento, resumo v2 e caminho de saída. Ele verifica o hash, lê o texto de todas
as páginas e contabiliza gabaritos sem depender dos cabeçalhos usados para
segmentar questões. Reutiliza apenas a ordenação de linhas para identificar o
par de gabaritos oficial/editorial consecutivos. Quatro testes passaram para
repetições, anulações, gabaritos únicos e exclusão das alternativas dessa contagem.
Nenhum registro do banco foi alterado e nenhuma questão foi publicada nesta tarefa.
