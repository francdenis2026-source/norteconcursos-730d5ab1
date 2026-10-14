# Simulador e videoaulas do ENEM — 14/10/2026

O botão da área ENEM abre o Simulador em um modo dedicado (`mode=enem`). Links antigos com `contest=ENEM` também ativam esse modo. O usuário escolhe área do conhecimento, disciplina, ano, origem, comentário, quantidade e tempo; não aparecem filtros de banca, cargo, concurso, estado ou carreira.

As consultas de questões são limitadas a ENEM. Uma segunda seleção local exige a identificação ENEM e uma disciplina reconhecida nas quatro áreas do exame. Parâmetros externos de banca/cargo/estado/categoria não influenciam esse modo. A troca de origem mantém o escopo ENEM. Combinações vazias não recebem questões de outros concursos. O acervo e o histórico mostrados são restritos ao ENEM; o ranking geral do simulador permanece na experiência geral. Elegibilidade, assinatura, cobrança, pontuação e histórico persistido não foram modificados.

Na área de videoaulas, uma disciplina sem conteúdo deixa de selecionar a primeira matéria disponível. Artes, Educação Física e Tecnologias ganhou sua própria chave de catálogo; o atalho que apontava para Língua Portuguesa foi removido. A troca de disciplina reinicia o assunto e o player, e vídeos repetidos dentro da mesma seleção aparecem uma única vez. Vídeos que não permitem incorporação oferecem o link externo.

## Conferência do catálogo atual

Leitura do Supabase: 90 registros de mídia do ENEM, com 89 IDs distintos; o vídeo de Geografia e História está cadastrado em ambas as disciplinas. Não houve alteração de registros ou exclusão de vídeos no banco. O snapshot está em `outputs/enem-media/catalog-2026-10-14.json`, fora do Git.

Também foram encontrados 53 registros ativos de questões ENEM nas seguintes disciplinas: Matemática (14), Biologia (7), Física (2), Química (3), Artes e Educação Física (4), Língua Portuguesa (4), Geografia (7), História (6), Sociologia (2), Filosofia (4). Esses números são registros ativos e não certificação de elegibilidade de todos os itens.

A leitura verificou o cadastro e os vínculos de navegação. A consulta de metadados diretamente ao YouTube não foi acessível nesta sessão; não se declara revisão integral do conteúdo audiovisual. Foi solicitada a identificação de aulas específicas que o usuário encontrou fora da disciplina para permitir conferência adicional sem excluir conteúdo por suposição.

## Validação

- 480 testes passaram, incluindo isolamento ENEM, áreas/disciplinas, combinação sem resultados e ausência de empréstimo de vídeos entre disciplinas.
- Checagem de tipos e build passaram.
- Conferência no Chromium com sessão e catálogo simulados: filtros dedicados, troca de origem, links antigos, consultas ao catálogo, troca de matéria e mensagem de ausência de aulas. A conferência não representa teste com sessão real de produção.
