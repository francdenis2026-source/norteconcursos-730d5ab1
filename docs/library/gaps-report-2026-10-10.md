# Lacunas de legislação — conclusão em 10/10/2026

## Escopo e resultado

A comparação encontrou as 35 normas da lista original já presentes nos 39 percursos anteriores. No programa retificado de Legislação Especial da PF 2025 para Agente, Escrivão e Papiloscopista, faltava um diploma próprio: **Lei 9.454/1997 — Registro de Identidade Civil**. O item 12 do programa contém lei e decreto, portanto os 15 itens correspondem a 16 diplomas. Os 16 agora têm percurso próprio no catálogo.

Também faltavam percursos próprios para os dois diplomas de uso da força expressamente cobrados em Direitos Humanos: **Lei 13.060/2014** e **Decreto 12.341/2024**. Foram incluídos em área separada de Direitos humanos — uso da força; não misturados à legislação penal.

- 42 percursos ativos após publicação no Supabase.
- 3 guias novos; 27 unidades novas: 26 atuais e 1 excluída (RIC art. 6º revogado).
- 14 casos resolvidos com variações, apresentados pelo componente de casos coloridos.
- 24 itens autorais comentados nos guias e 12 flashcards novos.
- Os totais do conjunto revisado passam a 210 casos, 694 cartões e 328 itens de guia.
- Preservados, por comparação posterior com o snapshot anterior, os 147 materiais e os 39 cursos preexistentes.
- Os exercícios dos guias não foram apresentados como questões oficiais de banca nem inseridos no banco compartilhado.

## Correção da matriz

O tópico de Legislação Especial do edital ativo de Agente PF estava cadastrado com Lei 9.455/1997 no bloco de identificação civil. A matriz agora aponta Lei 9.454/1997, conservando o ID do tópico e os vínculos existentes.

A abertura HTML antiga contém 9.545. O Edital nº 2, de 12/06/2025, corrigiu para 9.454; não para 9.455, que é a Lei de Tortura. O [edital retificado oficial](https://cdn.cebraspe.org.br/concursos/PF_25/arquivos/208B2F9CD7C49B6E7FF2FB6F027B9D7D7904F50E049EF749BD4C2DEA8ED30B3D.pdf) foi consultado. A migração 20261010040000 tem precondição para abortar se o tópico tiver sido alterado concorrentemente.

## Alertas incorporados

### Registro de Identidade Civil

[Texto compilado — Lei 9.454/1997](https://www.planalto.gov.br/ccivil_03/leis/l9454.htm).

- CPF nos documentos novos e número único e definitivo: Lei 14.534/2023.
- Cadastro, sistema, órgão central, documento e número não são tratados como sinônimos.
- Art. 6º revogado pela Lei 12.058/2009, sem ensinar uma suposta validade geral atual de cinco anos.
- O Planalto conserva uma redação anterior do art. 3º, § 2º ao lado da redação de 2009. A fonte foi preservada e recebeu aviso separado sobre qual redação estudar; essa unidade não gera exercício literal automático.
- Art. 5º possui prazos históricos de implementação, sem reinício a cada emissão. Também não gera lacunas automáticas de regra operacional atual.

### Uso da força

[Lei 13.060/2014](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l13060.htm) e [Decreto 12.341/2024](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/decreto/d12341.htm).

- Prioridade condicionada, risco, fuga, bloqueio, definição de menor potencial, formação, fornecimento, socorro e comunicação.
- Sete princípios do decreto, uso diferenciado, capacitação anual em serviço, equipamentos, implementação, registro, comitê e condição de repasse.
- [Portaria MJSP 1.121/2026](https://dspace.mj.gov.br/bitstream/1/16517/2/PRT_GM_2026_1121.pdf), publicada em 07/01/2026: alterou a Portaria 855/2025 nos arts. 3º, 11 e 16, § 1º. A qualificação para arma tem renovação trienal após exames; capacitação anual do decreto é outro instituto.
- A exceção justificada ao registro individualizado não foi convertida em dispensa geral dos relatórios de ferimento ou morte.
- Atualização da portaria foi identificada como posterior ao recorte PF 2025, sem retroagir sua cobrança.
- A cronologia do decreto conserva a data do próprio diploma: alteração de uma portaria relacionada não foi apresentada como alteração do decreto.

## Validação

62 testes passaram, TypeScript sem erros e build de produção concluído. Pacotes foram validados em dry-run sem credenciais. Publicação e leitura posterior conferiram status ativo, textos, hashes e casos. Reexecução preservou os três guias, cursos e enriquecimentos, sem duplicar unidades. Os importadores usados aceitam autenticação JWT legada com os dois cabeçalhos necessários; credenciais permanecem só no ambiente.

A inspeção visual autenticada em produção não foi executada nesta revisão. O commit contém pacotes, integração, testes, migração e este relatório. Snapshots, relatórios de execução e PDFs oficiais de evidência permanecem nos outputs locais.

## Limite da conclusão

Não há diploma faltante na lista original nem no bloco de Legislação Especial indicado da PF 2025, após estas inclusões. Isso não significa cobertura de todas as leis de qualquer carreira, de toda a disciplina de Direitos Humanos, de todos os editais de Perito/Delegado ou aplicação comentada de cada inciso dos grandes códigos. Os limites pedagógicos do relatório anterior continuam válidos: leitura integral e treino literal não equivalem a casos específicos para todo dispositivo. O catálogo indica as contagens reais de casos e questões; zero questões compartilhadas não é substituído por questões de outra lei.

## Reexecução

Aplicar a migração versionada; definir TASK_SUPABASE_PROJECT, TASK_SUPABASE_KEY e TASK_LIBRARY_REVIEWER na sessão. Nenhum segredo é parte dos pacotes.

```text
node scripts/import-library-sources.mjs docs/library/gaps-sources-2026-10-10.json RELATORIO_FONTES
node scripts/import-library-materials.mjs docs/library/gaps-materials-2026-10-10.json RELATORIO_GUIAS
node scripts/import-legal-paths.mjs docs/library/gaps-paths-2026-10-10.json RELATORIO_PERCURSOS
node scripts/import-study-enrichment.mjs docs/library/gaps-examples-2026-10-10.json RELATORIO_CASOS
```

Cada comando aceita --dry-run como terceiro argumento. Divergência em guia/curso preexistente interrompe a importação para revisão explícita, preservando conteúdo e progresso.
