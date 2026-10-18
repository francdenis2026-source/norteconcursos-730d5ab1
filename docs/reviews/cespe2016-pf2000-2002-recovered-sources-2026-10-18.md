# Recuperação de fontes PF/2000 e PF/2002

A pesquisa na internet recuperou diretamente do acervo oficial Cebraspe o caderno de Escrivão aplicado em 26/01/2002 e os gabaritos definitivos de PF/2002 e PF/2000. O caminho histórico correto está sob `_antigos/anteriores_2002/`; a prova de 2002 está na pasta do concurso de 2001. As buscas anteriores em pastas convencionais não bastavam para concluir ausência desses documentos.

## Acervo da plataforma

A consulta inicial por ano não encontrou documentos de 2000/2002. A consulta ampliada examinou os doze documentos cadastrados da PF, além de fontes, três catálogos públicos de questões e textos de apoio. Os documentos da PF encontrados eram de 2014, 2018 e 2021. Quatro resultados genéricos por expressão pertenciam a outros concursos e não correspondiam aos vinte enunciados. Não foram acessados documentos de alunos nem foi feita varredura de objetos órfãos no Storage. A conclusão é ausência no catálogo pesquisado, não uma garantia sobre todo arquivo não cadastrado.

Os documentos oficiais recuperados foram baixados e registrados em `content_sources` com URLs oficiais e hashes. Não foram criados registros fictícios de `official_exam_documents` ou caminhos de Storage sem um objeto real.

## Escrivão/2002 — quatro novos originais ativos

O texto V e a questão 32, com cinco subitens, estão na página física 13 do caderno. O definitivo contém matrizes distintas de Agente e Escrivão, com quarenta questões e cinco linhas de subitens cada. Foi usada a matriz de Escrivão; as cinco células da questão 32 são **C, C, C, E, C**, sem anulações nesses subitens. O caderno, o título/cargo, as duas matrizes e a legenda foram inspecionados visualmente, além da validação por extração e SHA256.

Foram publicados os subitens **2 C, 3 C, 4 E e 5 C**, correspondentes aos índices 77–80 da fila de Português da apostila. O subitem 1 (índice 76), sobre inferir defesa da censura, continua retido por ressalva técnica; encontrar o gabarito C não foi tratado como solução automática da ambiguidade.

Cada item publicado preserva questão e subitem em uma chave textual externa, sem criar números inteiros fictícios. O catálogo curado já oferece esse formato com controles Certo/Errado. O texto de apoio completo, o comando original, a identificação histórica de 2002 e os comentários e exemplos autorais acompanham cada item. A finalidade é leitura e interpretação; a opinião sociológica histórica não foi certificada como fato atual.

A matriz ativa, o tópico de interpretação da PF/2025 e o edital oficial foram reconferidos no banco. A comparação exata por texto normalizado percorreu 13.257 registros (5.126 oficiais, 1.118 de bancas, 2.031 curados e 4.982 candidatos privados), excluindo os próprios candidatos/IDs do lote; não encontrou correspondências exatas nas variantes comparadas. Isso não substitui comparação semântica exaustiva.

A escrita foi simulada antes de aplicada. Os registros públicos foram criados em revisão, seguidos da aprovação privada por RPC auditada e da ativação com filtros em todos os campos fornecidos. A leitura final confirmou as cinco decisões privadas e os quatro públicos. Os hashes dos brutos privados foram conferidos; o material editorial não foi alterado.

## Agente/2000 — quinze itens continuam retidos

O gabarito definitivo foi baixado do Cebraspe. A cópia do gabarito disponibilizada pelo Qconcursos tem exatamente o mesmo SHA256 do oficial, mas foi preferida a URL oficial. A página contém matrizes separadas de Papiloscopista e Agente; foi inspecionada a de Agente, inclusive a distinção entre célula alterada e anulada.

Foi localizada e baixada uma reprodução **digitada**, hospedada no Qconcursos, que contém os textos e identifica os grupos como questões 40, 41 e 43. Ela não foi declarada caderno original certificado, nem recebeu `is_official=true`. Há diferenças de apresentação, referências de linha e uma junção “delegitimação” que exige comparação com o original. O acervo oficial pesquisado contém o definitivo e editais; o caderno original de Agente não foi localizado nesta rodada.

As quinze células correspondentes foram verificadas na matriz oficial, mas a associação entre esses números e os candidatos permanece indicada como sugestão da reprodução secundária. Os quinze registros receberam complemento de pesquisa pela RPC auditada, preservando o bruto e a decisão de não publicação. `answer_verified` continua falso para a correspondência ao original; `official_matrix_cell_verified` registra apenas a conferência das células. Não se confundiu disponibilidade do gabarito com confirmação integral de enunciado e contexto.

As ressalvas técnicas sobre desenvolvimento/democracia (índice 83) e sobre condição necessária entre regras e mecanismos de reclamação (84) também permanecem registradas. Não houve remoção por idade nem classificação automática como revogado.

## Fontes e validação

- [Caderno oficial Escrivão/2002](https://cdn.cebraspe.org.br/concursos/_antigos/anteriores_2002/2001/pf2001/Arquivos/ESCRIVAO1.pdf).
- [Definitivo oficial PF/2002](https://cdn.cebraspe.org.br/concursos/_antigos/anteriores_2002/2001/pf2001/Arquivos/Gab_Def_Agente_Escrivao.pdf).
- [Definitivo oficial PF/2000](https://cdn.cebraspe.org.br/concursos/_antigos/anteriores_2002/2000/PF2000/Arquivos/Gab_Def_PF.PDF).
- [Reprodução secundária Agente/2000, não certificada como caderno original](https://arquivos.qconcursos.com/prova/arquivo_prova/281/cespe-2000-policia-federal-agente-federal-da-policia-federal-prova.pdf).

Passaram cinco testes Python específicos (matriz correta, identidade composta, retenção do item ambíguo, divergência de gabarito e contaminação pelo bloco seguinte) e dois arquivos de testes Node de apresentação de subitens. O comando Node inicial sem o carregador de aliases falhou por resolução de `@/lib`; o comando documentado do projeto com `--import ./scripts/alias.mjs` executou e passou. Não foi necessária alteração na aplicação.

No conjunto de vinte investigados, quatro foram liberados e dezesseis continuam retidos. O percurso dos primeiros cem de Português passa a ter **57 originais ativos e 43 retidos**. A contagem da apostila inteira, após esta aplicação, consta no JSON: 3.198 candidatos ainda sem aprovação final. Esses totais não certificam extração de todas as “7.000 questões” anunciadas.

Para conteúdo normativo, segue obrigatória a conferência do texto vigente no Planalto, órgão competente ou tribunal, com registro de fonte e data; encontrar um gabarito antigo não certifica vigência. Nenhum dos quatro itens aqui publicados foi usado para ensinar legislação atual.
