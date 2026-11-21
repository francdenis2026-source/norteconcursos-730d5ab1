# Auditoria de justificativas dos exercícios — PC-AC 2026

**Data:** 21/11/2026  
**Escopo:** materiais de estudo do concurso PC-AC 2026 / Oficial Investigador de Polícia.  
**Sistema:** `public.study_materials` no Supabase, projeto `gkwphadbveiyjcwiiizw`.

## Resultado aferido no banco

- 190 módulos ativos, 1.474 exercícios nos arrays `quiz`.
- **68 justificativas anteriormente inferiores a 25 caracteres foram ampliadas diretamente no banco**: 25 em Raciocínio Lógico, 15 em Língua Portuguesa, 3 em Tecnologia da Informação, uma em Noções de Administração, uma em Realidade do Estado do Acre e 23 em Legislação Institucional.
- Verificação após as correções: **0 justificativas inferiores a 25 caracteres**, 0 enunciados vazios e 0 gabaritos com tipos diferentes de `boolean`.
- Ainda há **870 justificativas com menos de 80 caracteres**. O limite de 25 caracteres é somente um sinalizador de qualidade, não uma certificação pedagógica.
- Em Contabilidade, o item 25 do material `pcac-2026-contabilidade-04-demonstracoes-balanco-dre-regimes` tinha resposta booleana incompatível com o enunciado sobre liquidez corrente: corrigido de `true` para `false`, com a frase afirmativa ajustada.
- No mesmo material, a justificativa do item 26 misturava um indicador 1,80 com exemplo de indicador 2,00: esclarecido.
- Na disciplina Contabilidade Geral, o item 9 de `pcac-2026-contabilidade-08-custos-materia-prima-rateio-departamentalizacao` foi transformado de pergunta aberta em assertiva verificável de Certo/Errado.
- Os 23 itens de Legislação Institucional tiveram **explicações ampliadas sem homologação do gabarito ou vigência da redação legal**. Revisão oficial permanece obrigatória.
- Baixo Acre: texto dos sete municípios ampliado com base na LC 126/2003 e dados estaduais.

## Segurança da liberação

As revisões antigas não são autorização suficiente para liberar exercícios normativos. As mudanças em enunciados ou justificativas invalidam a correspondência exata de revisões. **Não converter automaticamente** `practice_review` antigo em `version: 1 / reviewed`.

Após a auditoria:
- 82 materiais com status `needs_revalidation`;
- 12 sem registro de revisão;
- um material com revisão didática `version: 1` compatível com os cinco itens de análise de fluxos financeiros;
- demais materiais com registros legados, ainda sem migração segura.

## Critérios de revalidação por disciplina

1. Para legislação e direito, comparar cada gabarito com o texto oficial **vigente na data do concurso**, conferir artigos e alterações, registrar URLs oficiais, evidências por item e revisão completa.
2. Para contabilidade, verificar regras CPC/CFC aplicáveis, refazer cálculos e evitar perguntas abertas dentro de exercícios Certo/Errado.
3. Para exatas, testar fórmulas e limites do enunciado.
4. Para língua portuguesa, verificar norma-padrão, clareza e exemplos.
5. Validar o comportamento do treinador, contador e filtros na aplicação publicada.

**Nota sobre publicação:** esta documentação acompanha alterações aplicadas diretamente no Supabase. A gravação dos dados não depende de um novo deploy do frontend. Este relatório não é uma migração SQL e não afirma que os 190 materiais foram aprovados.


## Continuação — aprofundamento das justificativas de Língua Portuguesa

Execução em 21/11/2026, com gravação direta na tabela `study_materials` no Supabase.

- **63 justificativas aprimoradas individualmente** em sete módulos iniciais de Língua Portuguesa. Cada item recebeu explicação contextualizada e, quando apropriado, exemplo de interpretação, conectivos, semântica, reescrita ou pontuação.
- O número de explicações com menos de 80 caracteres caiu de **870 para 807**, sendo **111** em Língua Portuguesa (antes eram 174).
- Permanecem **zero** justificativas com menos de 25 caracteres, zero perguntas vazias, zero explicações vazias e zero gabaritos de tipo não booleano no escopo das **1.474 questões didáticas**.
- O conteúdo dos exercícios foi alterado, mas os módulos continuam com `practice_review.status = needs_revalidation`, conforme a existência do registro anterior. A mudança não constitui liberação automática do treinador.
- Não foram alterados gabaritos nesta rodada. Eventuais divergências pedagógicas precisam de revisão posterior.
- As disciplinas com maior número remanescente de justificativas curtas são Raciocínio Lógico (127), Legislação Institucional (121), Língua Portuguesa (111) e Noções de Administração (81).
- Os 190 módulos continuam ativos como material de leitura; **apenas um** possui revisão didática de formato atual, e **82** estão explicitamente marcados para revalidação.

**Nota:** a verificação por comprimento de texto é um indicador automatizado de concisão, não uma avaliação de correção ou qualidade da resposta. Não marcar materiais jurídicos como revisados sem verificar texto legal atual e cada enunciado.
