# Organização dos materiais — 25/10/2026

Leitura direta dos metadados dos 151 materiais ativos no Supabase. `catalogue.json` registra todos os materiais, títulos, assuntos e grupos resultantes, sem copiar os corpos didáticos. A análise não altera textos ou questões publicados.

- Cada material pertence a uma coleção (jurídica, demais disciplinas ou ENEM) e uma disciplina. Os 32 grupos resultantes preservam a separação entre concursos e ENEM.
- Os 14 cartões de grupos jurídicos foram comparados à mesma função de seleção da biblioteca: contagens correspondem ao conjunto exato da disciplina, sem materiais de outros grupos.
- LGPD passa à coleção jurídica, mantendo seu nome próprio; não é misturada automaticamente com Informática ou Direito Digital.
- Normas relacionadas não deslocam aulas constitucionais, administrativas ou civis de sua disciplina principal.
- A disciplina selecionada recebe cabeçalho próprio e resultados por assunto. Recomendações gerais, coleções e índice completo de leis ficam fora dessa visão.
- Limpar busca e filtros preserva a disciplina; trocar disciplina limpa os filtros dependentes. O cache de filtros foi versionado para evitar carregar combinações antigas incompatíveis.
- Os cartões seguem a ordem publicada dos materiais, com título como desempate. Datas de atualização permanecem visíveis, sem reorganizar a sequência de estudo a cada revisão.

Validação: testes de renderização e navegação, compilação TypeScript e build de produção. Sem validação visual em navegador autenticado neste ambiente.
