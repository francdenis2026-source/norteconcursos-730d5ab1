# Separação das coleções da biblioteca — 14/10/2026

A biblioteca identificada como “Biblioteca de leis” exibia todos os materiais ativos, inclusive Português, informática e ENEM. Agora abre somente a coleção de legislação e fundamentos jurídicos. A navegação no topo oferece **Leis e Direito**, **Demais disciplinas** e **Materiais do ENEM**; esta última abre diretamente a aba de materiais na área ENEM.

Cada coleção possui busca, opções, contagens e filtros salvos independentes. A coleção de demais disciplinas não mostra leis, atalhos de legislação, “Comece por aqui” de concursos policiais nem materiais ENEM. A coleção ENEM é identificada pelo destino do material (`contest_name=ENEM`), antes da classificação por disciplina. Não houve exclusão ou alteração de conteúdo no banco.

Os guias do ENEM voltam à área ENEM e mantêm o concurso no link de questões. A navegação anterior/próximo preserva a coleção e a disciplina, evitando passar de Português do ENEM para Português de concursos. As indicações de videoaulas passam a distinguir explicitamente o catálogo ENEM do catálogo de concursos. Os atalhos de ferramentas e do cronograma escolhem a coleção compatível com a disciplina.

## Inventário consultado

Leitura atual de 159 materiais ativos no Supabase: **101** na coleção de leis/fundamentos jurídicos, **40** nas demais disciplinas e **18** no ENEM. Os snapshots ficam em `outputs/library-collections`, ignorados pelo Git. Essa contagem representa materiais, não artigos legais nem questões, e não representa nova revisão editorial.

## Verificação

- 482 testes passaram, incluindo separação das coleções e indicação de vídeos por contexto.
- Chromium com sessão e dados simulados: biblioteca padrão, troca para demais disciplinas, entrada na aba de materiais ENEM, retorno dos guias, indicação de vídeos sem cruzar contextos, navegação por materiais e largura móvel.
- Sessão real em produção não foi testada.
