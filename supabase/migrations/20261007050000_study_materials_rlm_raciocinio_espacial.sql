-- Gap real identificado: o Bloco I do edital PF (Raciocínio Lógico, tópico 2) cita
-- explicitamente "problemas geométricos e matriciais", mas nenhum material da
-- Biblioteca cobria raciocínio espacial/matrizes de figuras — um dos tipos de questão
-- mais comuns em provas federais (PF, PRF, PC). Entra como `under_review`.
begin;

insert into public.study_materials
  (slug, discipline, topic_label, sort_order, title, summary, body_md,
   contest_name, syllabus_topic_order, source_note, legal_basis)
values
('rlm-sequencias-figuras-matrizes-raciocinio-espacial', 'Raciocínio Lógico', 'Raciocínio espacial', 127,
 'Sequências de figuras, matrizes e raciocínio espacial',
 'Como resolver a questão clássica "qual figura completa a sequência?" — rotação, reflexo, contagem de elementos e matrizes 3×3.',
$md$## Por que esse tipo de questão é diferente

Questões de figuras não têm uma "fórmula" única como PA ou PG — elas testam se você enxerga **o que muda** de uma figura para a próxima: posição, quantidade, rotação ou espelhamento. O primeiro passo é sempre o mesmo: escolher **um elemento de cada vez** e seguir só ele por todas as figuras.

## Os quatro tipos de transformação mais cobrados

| Transformação | O que observar | Pista visual |
|---|---|---|
| **Rotação** | O desenho gira um ângulo fixo (90°, 45°...) a cada passo | Um detalhe (ponta, marca) muda de posição no relógio |
| **Reflexo (espelho)** | A figura vira a imagem espelhada da anterior | Elementos trocam de lado (esquerda ↔ direita) |
| **Contagem** | O número de elementos (pontos, lados, traços) aumenta ou diminui num padrão | Conte os elementos de cada figura antes de olhar a forma |
| **Combinação/sobreposição** | A figura seguinte é a junção ou a diferença entre as duas anteriores | Compare pares: o que está nas duas, só numa, ou em nenhuma |

### Exemplo do dia a dia: rotação

Pense em um relógio analógico fotografado a cada 15 minutos: o ponteiro dos minutos gira 90° a cada foto. Se a 1ª foto mostra o ponteiro às 12h, a 2ª às 15h (3h), a 3ª às 18h (6h), a 4ª estará às 21h (9h) — sempre girando 90° no mesmo sentido. Uma questão de RLM troca o ponteiro por qualquer marca numa figura geométrica, mas a lógica é idêntica: **ache o ângulo fixo de giro e aplique de novo**.

### Exemplo do dia a dia: contagem

Uma pessoa empilha caixas: 1 caixa na primeira foto, 3 na segunda, 6 na terceira, 10 na quarta. A diferença entre as quantidades é 2, 3, 4 — não é constante, mas cresce de forma previsível (como nas sequências PA de 2ª ordem). A próxima foto teria 10 + 5 = **15 caixas**. Em prova, a figura muda de forma, mas o que importa é **contar os elementos**, não a aparência.

## Matrizes 3×3 (a "sudoku" de RLM)

A questão mostra uma grade de 3×3 figuras e pede a que falta no canto. Estratégia:

1. **Linha por linha**: a 3ª figura de cada linha é combinação/diferença das duas primeiras?
2. **Coluna por coluna**: o mesmo padrão se repete na vertical?
3. **Diagonal**: às vezes o padrão só aparece ao ler na diagonal.

> **Cai em prova:** teste linha, depois coluna, usando a mesma regra nas três — se a regra bate nas duas primeiras linhas/colunas, ela também tem que bater na terceira (que é onde está a resposta).

> **Cuidado, pegadinha clássica:** confundir "a figura ficou maior" com "a figura rotacionou" — compare o contorno (tamanho, número de lados) separado da orientação (ângulo) antes de decidir qual característica está mudando.$md$,
 'Polícia Federal — Agente — Edital 1/2025 atualizado', 2,
 'Material original elaborado para o Bloco I do conteúdo programático vigente (problemas geométricos e matriciais), com exemplos e destaques de prova próprios. Aguardando conferência final de revisor.', '[]'::jsonb)
on conflict (slug) do nothing;

commit;
