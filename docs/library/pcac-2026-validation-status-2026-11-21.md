# Verificação integral de estrutura — PC-AC 2026

**Data da extração:** 21/11/2026. **Concurso:** PC-AC 2026 — Oficial Investigador de Polícia.

## O que foi executado

- Ampliação de justificativas curtas em 15 disciplinas sem modificar os gabaritos durante a etapa de complementação temática.
- Verificação de **190 materiais ativos** e **1.474 exercícios do material didático**.
- Ao final dessa etapa, nenhuma justificativa possui menos de **80 caracteres**; nenhum enunciado está vazio e todos os gabaritos internos usam valores booleanos `true/false`.
- **Atenção:** o comprimento da justificativa é apenas uma métrica estrutural. A aprovação pedagógica e a fidelidade aos textos legais exigem verificação individual; a complementação por tópico **não equivale à homologação do gabarito**.
- **228 questões** seguem ativas no catálogo geral e quatro arquivadas por critérios editoriais, sem reativação automática.
- Cinco itens de análise de fluxo financeiro foram novamente conferidos individualmente, receberam justificativas próprias e revisão didática `version=1` com correspondência exata.
- Os outros módulos permanecem em processo de revalidação formal; não aprovar automaticamente revisões legadas.

## Conteúdo versionado na MAIN

As extrações JSON em `data/pcac-2026/2026-11-21` contêm, por disciplina, as chaves `slug`, `quiz`, `practice_review` e `topic_label`. O `manifest.json` permite conferir o total e a integridade de cada arquivo.

Os snapshots são **somente leitura** e **não** são migrações SQL aplicadas automaticamente. O banco de produção recebeu os complementos didáticos antes da exportação.

`node scripts/check-pcac-quiz-snapshot.mjs` valida formato, quantidade, ausência de enunciados vazios, integridade dos gabaritos e correspondência exata das revisões homologadas; é executado pela CI na MAIN.

## Pendências que não podem ser ocultadas

1. Revisão jurídica e normativa item a item contra leis consolidadas, alterações de 2025/2026 e fontes oficiais.
2. Homologação pedagógica da maioria dos materiais no formato exato exigido pelo treinador; não desbloquear registros legados apenas pelo campo `status`.
3. Testes de uso no navegador publicado e acompanhamento do contador/registro de desempenho do aluno.
4. Revisão qualitativa além do critério de 80 caracteres, pois algumas explicações permanecem genéricas para o item.
