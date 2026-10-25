# Materiais e trilhas: organização por disciplina

## Diagnóstico

Consulta de leitura ao projeto Supabase `gkwphadbveiyjcwiiizw`, seguida de inspeção das rotas e dos dados das trilhas. O inventário contém **139 materiais ativos, 12 trilhas e 98 aulas**. Não foram encontrados títulos exatamente iguais nem textos integrais iguais após normalizar espaços entre os materiais. Isso não certifica ausência de repetição de conceitos, paráfrases ou sobreposição parcial.

A redundância principal é de organização: Materiais abria um texto arbitrário da disciplina (primeiro não lido/ordem de revisão), o agrupamento de leis também podia pular direto para um guia, e um atalho independente oferecia novamente as trilhas. A disciplina já possuía uma tela capaz de reunir formatos, mas esses acessos a contornavam.

## Ajuste entregue

- Cartões de disciplinas abrem a visão da disciplina, reunindo materiais, roteiro/vídeos e prática. O cartão de trilhas separado da página inicial de Materiais foi removido.
- Grupos jurídicos abrem a lista de sua área; uma lei inequivocamente identificada conserva o acesso ao seu percurso de legislação. A seleção de disciplina na biblioteca expõe o roteiro correspondente.
- 51 passos apontam para o material principal (ou conjunto de materiais), sem apresentar em paralelo a versão curta da mesma matéria e seu outro teste rápido.
- Cinco passos têm cobertura parcial: as leituras complementam a aula, que permanece disponível. Exemplo: material de protocolos não substitui sozinho o tópico de SNMP da trilha.
- 42 aulas sem equivalente completo ficam independentes. Não se presume que material sobre Judiciário cubra controle de constitucionalidade, nem que lei de uso da força cubra toda teoria de direitos humanos.
- As abas do agrupamento de disciplina agora se chamam Materiais, Roteiro e vídeos e Praticar. Os rótulos padrão dos leitores individuais permanecem.
- O resumo inicial informa disciplinas com conteúdo, evitando somar materiais, aulas integradas e playlists como se fossem conteúdos distintos.

## Preservação e indisponibilidade

Nenhuma linha do banco, questão, material, aula ou conteúdo autoral foi excluído ou reescrito. São vínculos de navegação; os originais permanecem recuperáveis. Slugs, parâmetros de aula, chave `trilha-feitas:${slug}`, progresso de leitura e históricos de treino permanecem válidos. Concluir uma leitura não marca automaticamente um passo como concluído.

Os vínculos só usam materiais publicados que retornem do catálogo. Todos os destinos de um passo precisam estar disponíveis; se faltar uma parte ou for arquivada, a aula original continua acessível. Falha de rede na consulta apresenta nova tentativa em vez de exibir silenciosamente uma versão paralela desatualizada. Os leitores continuam usando seus próprios controles de revisão e elegibilidade.

Não foram fundidos materiais de concursos e ENEM apenas por compartilharem disciplina. Os percursos explicitamente baseados na matriz ENEM mantêm seus destinos e nomes de material ENEM. Há vínculos curriculares explícitos, não redirecionamentos inferidos automaticamente de palavras no título.

## Resultado por trilha

| Disciplina | Aulas | Integradas ao material | Complementares | Independentes |
| --- | ---: | ---: | ---: | ---: |
| Contabilidade Geral | 23 | 19 | 1 | 3 |
| Informática | 24 | 4 | 4 | 16 |
| Língua Portuguesa | 9 | 1 | 0 | 8 |
| Raciocínio Lógico | 7 | 5 | 0 | 2 |
| Direito Constitucional | 9 | 6 | 0 | 3 |
| Direito Administrativo | 8 | 8 | 0 | 0 |
| Direitos Humanos | 6 | 0 | 0 | 6 |
| Estatística | 4 | 0 | 0 | 4 |
| Matemática | 5 | 5 | 0 | 0 |
| Física | 1 | 1 | 0 | 0 |
| Química | 1 | 1 | 0 | 0 |
| Língua Inglesa | 1 | 1 | 0 | 0 |

## Todas as disciplinas do catálogo publicado

O levantamento também abrangeu os materiais sem trilha, sem presumir que precisem de um curso duplicado. A lista abaixo e `inventory.json` documentam o escopo exato da consulta.

| Disciplina | Materiais ativos |
| --- | ---: |
| Artes e Educação Física | 1 |
| Biologia | 1 |
| Contabilidade Geral | 18 |
| Direito Administrativo | 14 |
| Direito Constitucional | 17 |
| Direito Digital | 1 |
| Direito Penal | 5 |
| Direito Processual Civil | 1 |
| Direito Processual Penal | 1 |
| Direitos Humanos | 2 |
| Filosofia | 1 |
| Física | 1 |
| Geografia | 1 |
| História | 1 |
| Informática | 15 |
| Legislação Especial | 38 |
| Legislação Penal Especial | 1 |
| Língua Espanhola | 1 |
| Língua Inglesa | 1 |
| Língua Portuguesa | 5 |
| Literatura | 1 |
| Matemática | 5 |
| Proteção de Dados Pessoais (LGPD) | 1 |
| Química | 1 |
| Raciocínio Lógico | 3 |
| Redação | 1 |
| Sociologia | 1 |

## Verificação

48 testes passaram: vínculos/destinos, cobertura parcial, arquivamento/ausência de um destino, renderização real do leitor com React no servidor, preservação da aula independente, filtros e navegação da biblioteca, organização de disciplinas e prática. TypeScript e build de produção passaram. Não houve inspeção visual em navegador autenticado, nem nova auditoria jurídica ou semântica exaustiva do acervo.

A alteração é de interface e navegação: não há SQL a executar no Supabase.
