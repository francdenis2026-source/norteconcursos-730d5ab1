# CONTRAN — segundo lote de consulta

Conferência em 12/10/2026, retomada do checkpoint sem duplicar os 50 atos
anteriores. A main e o catálogo oficial foram atualizados antes da autoria;
o Supabase foi consultado antes e depois.

## Resultado

- 50 novos atos examinados, no escopo explícito de cada guia.
- 48 novos guias atuais, cada um com caso respondido e variação comentada:
  96 aplicações pedagógicas novas.
- 971/2022 e 962/2022 separados como calendários históricos da pandemia.
  Seus cronogramas encerrados não geram exercícios de prorrogação atual.
- Acumulado: 100 atos examinados, 90 guias atuais, 180 casos/variações e
  dez guias históricos excluídos da consulta atual.
- 48 novas edições de textos oficiais para leitura na aplicação. Não são
  compilações integrais: os PDFs originais conservam redações substituídas,
  que são expressamente alertadas e vinculadas aos atos modificadores.

Temas: placas, identificação e baixa, retrovisores, vidros, acessibilidade,
equipamentos de segurança, cargas, motofrete/mototáxi, transporte escolar,
vistoria, sistemas de infrações/notificação, exame médico e toxicológico.
Não foram criados materiais duplicados, questões do treinador ou alegações
de incidência em provas. O catálogo permanece dentro de Trânsito/CTB.

## Conferência jurídica e temporal

Foram obtidos 50 PDFs primários com integridade por hash e seis documentos
complementares: Deliberações 263 e 264 e retificações das Resoluções 949,
939, 936 e 924. Também foram confrontados os modificadores já obtidos no
lote anterior, como 989, 987, 997, 1009, 991, 977, 1012, 1021 e 1024.

Alertas de aplicação incluídos:

- 954: datas de projeto corrigidas pela Deliberação 264.
- 948: transição da descrição “APROVADO SENATRAN” encerrada em 2024.
- 949: retificação com marcos de 2020 e 2026; outubro de 2026 não é período
  anterior ao marco de janeiro de 2026.
- 939, 936 e 924: cronogramas retificados, sem copiar datas originais.
- 923: entrega do laudo toxicológico em até 30 dias pela 1009/2024; o PDF
  original conserva 15. Janela retrospectiva e validade não são prazo de entrega.
- 960: regras do conjunto vidro-película; não ensinar o antigo limite de 28%
  como regra geral atual sem a alteração 989.
- 953: dispensa de região do protetor lateral não equivale à retirada total.
- 957: diferença textual na fronteira de trinta anos registrada, sem exercício
  automático que a resolva artificialmente.
- 971: a data impossível “31 de setembro de 2022” do documento foi alertada,
  e o calendário histórico não entra no estudo atual.
- 937: índice traz “01.04.222”; adotada a publicação de 01/04/2022 confirmada
  no PDF oficial, com o valor do índice preservado para auditoria.

Cada novo guia mostra os dispositivos efetivamente examinados. Não se
declara revisão completa de todos os artigos, anexos, ensaios, tabelas,
normas técnicas referenciadas ou jurisprudência.

## Preservação, validação e implantação

Oito tabelas do Supabase ficaram idênticas nos snapshots antes/depois.
Não houve escrita no banco neste lote: o catálogo e os textos públicos
integram a aplicação. Snapshots e PDFs de evidência ficam em outputs
ignorados, sem credenciais no Git.

281 testes, verificação TypeScript e build passaram. A leitura HTTP do
texto 923/2022 foi verificada no ambiente. A tentativa de repetir o lote
foi rejeitada antes de modificar o catálogo e os 90 textos existentes.

O primeiro lote ainda retornou 404 no domínio público na consulta anterior
ao envio deste segundo lote. A integração à main sincroniza o código com
o editor Lovable, conforme README; não é confirmação de implantação pública.
Não há ferramenta de publicação Lovable disponível nesta sessão.

## Pendências

O catálogo possui 1.033 registros; 933 ficam fora dos dois lotes. A triagem
do índice identifica 163 números candidatos sem indicação de revogação
integral, após excluir os já tratados. Isso não certifica 163 atos vigentes:
restam calendários, transições, modificadores e eventuais duplicatas a conferir.
O checkpoint contém os próximos candidatos e os números já examinados.

A biblioteca anterior permanece com 3.511 unidades atuais, 879 com metadados
de revisão e 2.632 pendentes. Esses números não incluem os guias CONTRAN.
Não há monitor de percentual de créditos nem retomada automática configurada.
