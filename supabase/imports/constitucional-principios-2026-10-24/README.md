# Princípios fundamentais — complemento de Direito Constitucional

Material de entrada: `01-01_AlfaCon--principios-fundamentais-parte-1.pdf`, quatro páginas, três exercícios de certo/errado sem identificação de prova/banca. O arquivo enviado serviu para identificar os temas; não foi redistribuído, nem foram copiados a diagramação, os textos explicativos, os exercícios ou o gabarito da editora.

## Resultado

Novo módulo: **Princípios fundamentais: Federação, República e autonomia dos entes**.

Rota: `/dashboard/library/constitucional-principios-fundamentais-federacao-republica`.

- Texto-base com trechos constitucionais identificados e explicações de redação própria.
- Quatro casos resolvidos, cada um com etapas, conclusão, erro comum e variação.
- Vinte exercícios autorais comentados e seis flashcards.
- Fonte legal consultada: Constituição compilada do Planalto; art. 5º do Código Penal utilizado apenas para esclarecer os limites da extensão territorial penal.
- Vínculo: tópico atual cadastrado de Noções de Direito Constitucional, item 1.1 do edital oficial PMSC Soldado 2023. A conferência atual para estudo não modifica o corte de provas históricas nem presume cobrança em todos os concursos.
- Responsável pela publicação: conta administradora indicada pelo usuário e validada no banco. A elaboração e conferência foram feitas por assistência delegada; não se declara revisão humana independente.

## Deduplicação e integração

Foram comparados 740 registros de Direito Constitucional nas quatro tabelas de questões, inclusive estados não publicados e acervo privado apenas para deduplicação. A busca textual encontrou 57 registros relacionados, sem considerá-los todos elegíveis ou únicos. Nenhum registro privado foi reaproveitado.

Não havia módulo específico de princípios fundamentais nos materiais de Direito Constitucional consultados. Os módulos existentes de nacionalidade, direitos políticos, privacidade e acumulação foram preservados. O novo texto usa links para nacionalidade, direitos políticos e lei penal no espaço em vez de replicar esses conteúdos.

Os três exercícios da apostila não têm origem oficial identificada e não foram importados como questões de banca. Os vinte novos itens são fixação local do material; **zero questões foram inseridas no catálogo global**, evitando duplicar o acervo ou inflar suas contagens. O botão de explorar questões continua usando o filtro existente de Direito Constitucional / Princípios fundamentais.

## Ajustes conceituais

- Distinção entre autonomia dos entes e soberania do Estado brasileiro.
- Distinção entre Federação, República, presidencialismo e origem democrática do poder.
- Separação entre reorganização territorial interna e secessão.
- A proteção contra emenda tendente a abolir a forma federativa não significa imutabilidade de toda competência.
- A ausência literal da expressão “forma republicana” no art. 60, § 4º, não afasta outros limites constitucionais.
- Extensão do território para efeitos penais não equivale a anexação física de território estrangeiro.
- Classificações doutrinárias variáveis não foram apresentadas como comandos expressos da Constituição.

## Auditoria e SQLs

- `package.json`: conteúdo e metadados completos.
- `audit.json`: identificação do arquivo e comparação dos enunciados, sem reprodução da apostila.
- `sources.json`: URLs, datas e SHA-256 dos documentos efetivamente consultados.
- `01-publish-principios.sql`: transação idempotente, validação do responsável e do edital, proteção contra conteúdo concorrente e conferência interna.
- `publication-result.json`: resultado confirmado da aplicação no banco.
- `02-verify-publication.sql` e `verification-result.json`: consulta posterior independente e comparação exata com o pacote, incluindo integridade do texto, revisão, exercícios, casos e três fontes oficiais cadastradas.

As tentativas iniciais com caminhos em minúsculas do Planalto expiraram. Foram utilizados os documentos oficiais efetivamente obtidos nos endereços com a grafia registrada em `sources.json`. A publicação original de 1988 da Câmara não foi usada para atestar vigência.

Validação: 19 testes pertinentes aprovados; os vinte exercícios também foram conferidos pelo fluxo real `authoredMaterialPractice`, com correspondência de material, assunto e evidência. Esta etapa altera conteúdo e artefatos SQL, sem alterar componentes da interface. Não foi realizada uma nova inspeção visual autenticada.
