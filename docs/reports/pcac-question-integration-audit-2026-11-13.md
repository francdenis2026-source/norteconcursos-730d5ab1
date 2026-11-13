# Auditoria de integração — Biblioteca, questões e desempenho PC-AC 2026

Data da verificação: 13/11/2026  
Base de código: `8647d2579373a9a9368b15029760d7ebac65adaa`  
Banco consultado: projeto Supabase NorteCorcurso Publico  
Branch de trabalho: `audit/integracao-questoes-desempenho`

## Resultado executivo

A plataforma já possui um banco de questões real e um fluxo de treinamento com contabilização. Entretanto, os exercícios embutidos nos materiais da Biblioteca ainda não são persistidos como tentativas nem entram no Banco de Questões. O componente os identifica corretamente como exercícios locais de fixação desta visita.

## 1. Biblioteca PC-AC 2026 — estado no banco

Consulta em `study_materials`, filtrada por `contest_name = 'PC-AC 2026'` e `content_status = 'active'`:

| Disciplina | Materiais ativos | Itens de quiz embutidos |
|---|---:|---:|
| Noções de Administração | 15 | 75 |
| Arquivologia | 16 | 80 |
| Administração Pública | 6 | 24 |
| Análise de Dados e Informações | 10 | 40 |
| Língua Portuguesa | 1 | 4 |
| **Total** | **48** | **223** |

Nenhum dos 48 materiais possui `practice_review` aprovado no estado atual do banco (0 materiais revisados; 0 itens de quiz aprovados por esse mecanismo).

## 2. Banco de Questões PC-AC 2026 — estado no banco

Consulta por relacionamento entre `syllabus_editions`, `syllabus_topics` e `curated_question_catalog`, filtrada por concurso Polícia Civil do Acre, ano 2026 e cargo Oficial Investigador de Polícia:

- **135 questões autorais ativas**, todas vinculadas a tópicos do edital.
- **10 questões autorais em revisão**, também vinculadas a tópicos, mas não elegíveis para treino enquanto permanecerem em `under_review`.
- As questões em revisão estão distribuídas em Arquivologia (2), Contabilidade (2), Estatística (2) e Realidade do Estado do Acre (4).

As questões ativas são servidas pelo catálogo do treinador; o código do catálogo filtra itens ativos e o fluxo de resposta do treinador grava `question_training_responses`. O painel de desempenho lê esse histórico, deduplicando por identidade da questão.

## 3. Caminho Biblioteca → Treinamento

Arquivos verificados:

- `src/routes/dashboard/library.$slug.tsx`: entrega `material.quiz` ao componente `MaterialPractice`.
- `src/components/library/MaterialPractice.tsx`: combina questões elegíveis do catálogo com exercícios autorais do material.
- `src/lib/materialPractice.ts`: filtra questões do catálogo e constrói questões autorais locais; para conteúdos normativos, exige aprovação compatível em `practice_review`.
- `src/components/library/MaterialPractice.tsx`: a bateria local mantém respostas apenas no estado React. Ao terminar, exibe “Exercício de fixação desta visita” e orienta usar o treinador completo para registrar tentativas.
- `src/hooks/usePerformanceOverview.ts`: o desempenho do treinador consulta `question_training_responses`; simulados consultam `simulator_attempts`. Não consulta as respostas locais de `MaterialPractice`.

**Conclusão:** os 223 itens de quiz dos materiais aparecem como exercícios locais de fixação, mas não são tentativas persistidas, não entram no histórico e não são contabilizados no desempenho. As 135 questões ativas do catálogo PC-AC 2026 são o conjunto que já está integrado ao fluxo de treino e métricas. As 10 em revisão ficam corretamente fora da prática pública.

## 4. Segurança editorial — decisão

Não importar automaticamente os 223 quizzes para `curated_question_catalog` nem ativá-los em massa. O banco não registra revisão editorial aprovada para esses quizzes. A aprovação existente é deliberadamente vinculada ao conteúdo, à disciplina, ao tópico do edital, às fontes e à versão exata de cada item.

A próxima implementação deve:

1. Revisar os 223 itens por material, verificando gabarito, explicação, duplicidade, tópico do edital e fonte.
2. Cadastrar no catálogo apenas os itens aprovados, com identidade estável e vínculo ao tópico correto.
3. Manter itens pendentes fora dos filtros de treino e das contagens públicas.
4. Para exercícios locais que não devam virar itens públicos, criar persistência de tentativas separada e explicitamente identificada, integrando-a ao histórico e ao desempenho sem duplicar a contagem das questões do catálogo.
5. Validar RLS, identidade de questão, primeira tentativa, filtros por cargo e contagens no Treinador, Simulados e Desempenho.

## 5. Escopo desta auditoria

- Foram realizadas consultas somente de leitura no Supabase.
- Nenhum registro de material, questão, tentativa ou status foi alterado.
- Nenhuma migration foi aplicada.
- Nenhuma alteração foi enviada à `main`.
- A branch isolada foi criada para continuar a implementação após esta auditoria.

