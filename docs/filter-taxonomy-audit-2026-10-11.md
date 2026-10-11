# Auditoria dos filtros e da organização por disciplina

Foi realizada uma consulta somente de leitura ao Supabase do Norte Concursos. A fotografia consultada contém metadados de 6.695 questões nas três tabelas compartilhadas e 152 materiais da biblioteca, incluindo registros não publicados. Os registros com status ativo somam 5.639 questões e 141 materiais; status ativo não equivale, sozinho, a disponibilidade para o aluno, pois continuam valendo as exigências de gabarito, contexto visual e revisão legal. Nenhuma questão, resposta, explicação ou decisão editorial foi alterada no banco nesta entrega.

O relatório agregado está em `filter-taxonomy-audit-2026-10-11.json`. A coleta detalhada fica em `outputs/filter-audit`, ignorada pelo Git. A auditoria pode ser reproduzida sem acesso ao banco:

```sh
node --import ./scripts/alias.mjs scripts/audit-filter-taxonomy.mjs METADATA_JSON RELATORIO_JSON
```

## Problemas confirmados e corrigidos

- Foram identificados 15 grupos de grafias ou nomes equivalentes nos registros ativos. A leitura agora padroniza aliases explícitos de Português, Inglês, RLM, Informática, Penal, CPP, Administrativo, Constitucional, Contabilidade Geral, Estatística, Direitos Humanos, Medicina Legal, Criminalística e Criminologia. Não se aplica uma regra ampla de prefixo que reúna matérias compostas indevidamente.
- Legislação especial, legislação específica da PF, Direitos Humanos e Ética deixam de compartilhar a mesma classificação automática e lista do cronograma. Penal, CPP e as disciplinas militares permanecem separados; Contabilidade Pública, de Custos e Geral, assim como Matemática Financeira, Matemática, RLM e Estatística, preservam sua identidade.
- O treinador prioriza o assunto já registrado, em vez de substituí-lo pela primeira palavra encontrada no enunciado. A inferência por palavras continua apenas como reserva quando não há assunto cadastrado, e não atribui uma família única a disciplinas compostas.
- As opções, contagens e resultados do treinador e da Central de Questões passam a respeitar a mesma combinação de filtros. Assuntos iguais em áreas diferentes são apresentados com a disciplina. Grafias equivalentes são reunidas, mas artigos e tópicos específicos distintos não são fundidos.
- Trocar disciplina limpa o assunto subordinado. A biblioteca reúne diferentes guias da mesma lei em uma opção de assunto, preservando os materiais e suas datas. Flashcards e mídia recebem a mesma padronização de nomes na leitura.
- A Central de Questões e os simulados passam a consultar também `board_exam_questions`; antes, essa tabela era consultada pelo treinador, mas omitida nessas telas. Banca e cargo usam as mesmas normalizações, e o caderno pessoal mantém sua própria identificação.
- Os simulados tinham filtros de estado, categoria e revisão declarados no tipo de rota, mas descartados na leitura. Eles agora são aplicados e ficam visíveis na configuração. A leitura foi paginada e passou a aplicar os critérios de elegibilidade, incluindo contexto visual e comprovação legal, antes de disponibilizar os itens.
- Links antigos do cronograma continuam aceitos, inclusive quando indicam um tópico mais amplo. Uma seleção vazia não amplia automaticamente o assunto para a matéria inteira nem troca de banca.

## Classificação que ainda depende de leitura individual

Foram sinalizados 755 registros ativos distribuídos em 13 combinações de tabela e rótulo genérico ou suspeito, como “Conhecimentos específicos”, “Eixo geral”, “Conhecimentos do cargo de Delegado” e um endereço de site usado como disciplina. Essa lista é uma triagem, não uma declaração de que os 755 registros estejam incorretos. Inclui rótulos regionais que podem ser legítimos no edital de origem.

O domínio usado como nome de disciplina aparece na interface como “Disciplina não classificada”, mantendo o dado de origem no banco e no relatório. Não foi inventada uma disciplina para as questões genéricas. Para concluir sua reclassificação, é necessário ler o enunciado, seu contexto e a seção do edital correspondente. Esta auditoria de filtros não constitui revisão individual do conteúdo dessas 755 questões nem nova verificação de vigência das leis.

## Validação

Testes cobrem aliases, áreas distintas, contagens por combinação, assuntos homônimos, compatibilidade de links antigos, filtros dos simulados e integridade da auditoria sem mutação. A suíte completa passou com 140 testes, além de TypeScript e compilação de produção. As seleções de campos das três tabelas foram executadas com sucesso no Supabase por leitura privilegiada; isso confirma o esquema consultado, mas não substitui o teste de uma sessão autenticada de aluno em produção.

O modo de simulados mantém as fontes oficiais e autorais já previstas por suas tabelas de respostas; questões pessoais continuam destinadas ao treinador. Histórico e critérios de pontuação não foram modificados.
