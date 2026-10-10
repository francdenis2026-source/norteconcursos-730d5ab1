# Acervo de 17 apostilas — inventário e triagem em 10/10/2026

## Estado real da revisão

Foram abertos os 17 PDFs e extraído o texto das 9.792 páginas. Esta entrega é o inventário e a triagem inicial, não a aprovação de todo o acervo. Nenhuma questão destas fontes foi publicada ou inserida no banco ativo.

A extração encontrou 22,769 limites candidatos a questões. Esse número inclui ocorrências repetidas, comentários e trechos cuja delimitação ainda precisa de confirmação; não deve ser anunciado como quantidade de questões novas ou aprovadas.

O banco foi consultado em modo somente leitura: 6160 registros. A comparação conservadora encontrou 110 grupos de textos repetidos entre as apostilas e 0 correspondências integrais com o banco. Não foi concluída a comparação semântica nem feita exclusão automática.

## Fontes

| Apostila | Páginas |
|---|---|
| 500 Questoes PolíciaFederal.pdf | 341 |
| 900 questões Gran Concurso.pdf | 415 |
| 1500 questões RLM.pdf | 647 |
| Carreiras policiais - Questões Gabaritadas - Agora eu passo.pdf | 1005 |
| CESPE 7000 questoes comentadas.pdf | 510 |
| Concursos Públicos - 11 mil questões comentadas.pdf | 5805 |
| FGV simulado de português.pdf | 81 |
| Policua Penal Simulado.pdf | 12 |
| Portugues - Questoes Comentadas - Duda Nogueira.pdf | 257 |
| Questões de informática.pdf | 43 |
| Simulado do TJ 2019.pdf | 18 |
| Simulado.pdf | 17 |
| simulado_pf_-_agente_-_16-05-21.pdf | 17 |
| Simulado2.pdf | 49 |
| TJ_SP50877090-texto-em-exercicios-vunesp.pdf | 110 |
| 1.000 QUESTÕES COMENTADAS - PF.pdf | 279 |
| 1.200 questões do BancodoBrasil.pdf | 186 |

## Cuidados e achados

- A coletânea de 11 mil questões fecha sua edição em 2013 e é jurídica, com referência ao Exame de Ordem. A pertinência a cada concurso deve ser demonstrada, não presumida.
- O caderno de mil questões da PF é de 2012; o resumo de 500 questões foi preparado para a PF de 2021.
- Foram localizadas páginas com referências a Lei 8.666/1993, Lei 10.520/2002, Lei 4.898/1965, Lei 7.102/1983, CPC de 1973 e Resolução CFC 750/1993. A presença da referência é um alerta, não uma decisão automática de invalidade.
- Uma questão sobre tentativa de crime (caderno PF 2012, questão 37, página PDF 21) ficou retida por redação e gabarito que precisam de esclarecimento frente ao art. 14, II, do Código Penal. O gabarito original foi preservado.
- Imagens, palavras destacadas, textos compartilhados e marcas d’água exigem conferência visual. Dados pessoais de marcas d’água não podem integrar o conteúdo publicado.

## Fontes oficiais e método

Legislação federal: [Planalto — Código Penal compilado](https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm), [CPP](https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm), [CTB](https://www.planalto.gov.br/ccivil_03/leis/l9503compilado.htm) e diploma específico. Conferir dispositivos aplicáveis, redação vigente, data de efeitos e eventual contexto histórico.

Jurisprudência: tribunal competente, inclusive [pesquisa de jurisprudência do STJ](https://www.stj.jus.br/sites/portalp/paginas/Sob-medida/Advogado/Jurisprudencia/Pesquisa-de-Jurisprudencia.aspx). O acesso ao portal não substitui verificar o enunciado ou julgamento específico.

Contabilidade: [normas do CFC](https://cfc.org.br/tecnica/normas-brasileiras-de-contabilidade/normas-completas/), revisão pertinente e início de vigência. A norma correlata do CPC não dispensa conferir sua recepção normativa.

Redação oficial: [serviço oficial do Manual de Redação](https://www.gov.br/pt-br/servicos/consultar-o-manual-de-redacao-da-presidencia-da-republica) e atos aplicáveis, respeitando o órgão, o âmbito de aplicação e a data do documento.

## Implementação e preservação

O pré-catalogador conserva origem, hash SHA-256, página, coluna e texto. A classificação automática é provisória, com bloqueios explícitos e sem acesso ao banco. O importador passou a exigir evidência oficial individual também para contabilidade e redação oficial.

PDFs, textos, índice CSV, catálogo, achados e evidências ficam em outputs locais, fora do Git. O código e este relatório não contêm credenciais nem reproduzem as apostilas.

Validação: 85 testes da suíte oficial (`npm test`) e 3 testes Python do catálogo passaram. A leitura em duas colunas foi verificada com uma fixture sintética; isso não substitui a conferência visual das questões reais.

## Trabalho pendente

- Confirmar limites, contextos compartilhados e imagens em cada fonte.
- Separar perguntas dos comentários repetidos e recuperar gabaritos.
- Concluir classificação por assunto e vínculo com edital.
- Revisar individualmente enunciados e respostas.
- Conferir vigência e jurisprudência em fontes oficiais específicas.
- Comparar duplicatas com variações de redação.
- Importar somente questões efetivamente aprovadas.
