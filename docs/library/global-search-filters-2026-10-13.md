# Busca de conteúdo com filtros da biblioteca

A busca nos artigos ignorava os filtros da biblioteca, limitava as consultas a 40 candidatos por fonte e exibia somente 12 resultados. Uma ocorrência em lei posterior ao corte podia desaparecer. Palavras presentes em títulos de leis também podiam restringir indevidamente a busca a esses títulos.

Agora termos gerais são pesquisados em todas as leis da seleção. Os resultados são agrupados por lei, com quantidade de artigos, origem do trecho e destaque dos termos. Todas as leis encontradas aparecem; artigos adicionais de uma lei podem ser abertos com “Mostrar mais artigos”. As consultas são paginadas até o fim, verificam as correspondências após normalização de acentos e propagam erros sem apresentá-los como ausência de resultados.

Foi acrescentado o filtro “Lei”, dependente da área, disciplina, assunto e concurso. Esses filtros são aplicados aos guias e aos artigos, na consulta e na composição dos resultados. A busca por uma sigla ou número identificador de lei continua reconhecendo o diploma correspondente; palavras gerais como “crimes”, “drogas” e “hediondos” pesquisam conteúdo, sem limitar a busca aos títulos.

O índice consultado abrange texto, rótulo e capítulo dos dispositivos atuais, explicação simples e exemplos publicados dos artigos, além dos metadados e corpos dos guias ativos. Unidades excluídas, cursos inativos e explicações não publicadas não aparecem nos resultados dos artigos. Não foram modificados conteúdos, aprovações editoriais ou dados do banco.

Abrir um resultado preserva o termo no endereço e mostra o trecho no artigo, distinguindo texto oficial de explicação. A navegação permanece na mesma aba. O filtro de lei é preservado na sessão e limpo com os demais filtros; resultados e erros de uma consulta anterior não aparecem durante a espera pela nova busca.

Validação em 13/10/2026: **417 testes, TypeScript e build de produção aprovados**. Testes de renderização cobrem a página da biblioteca, filtros, agrupamento de mais de 12 leis, localização de uma ocorrência na explicação e preservação do termo. Testes de consulta cobrem paginação com limite menor no servidor, erros, acentos, termos combinados e exclusão de conteúdo não publicado.

Consultas somente de leitura ao Supabase atual confirmaram:

- “estupro”: 15 artigos em cinco leis — CP, Hediondos, Prisão Temporária, CTB e LEP. Algumas ocorrências estão em explicações ou exemplos, identificadas dessa forma na tela.
- “estupro” com filtro Hediondos: três artigos, exatamente o subconjunto dessa lei no resultado geral.
- “lesao corporal” com filtro CP: 20 artigos, sem exigir acento.
- “Art.798-A” no CPP e “1” em Hediondos: identificação exata do dispositivo.

Essas contagens descrevem o banco no momento da consulta, não uma certificação jurídica nova nem uma inspeção visual autenticada de produção. Evidências e logs ficam em `outputs/global-library-search-2026-10-13/`, ignorados pelo Git.
