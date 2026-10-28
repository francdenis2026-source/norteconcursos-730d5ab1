begin;
insert into public.study_materials (slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,syllabus_topic_order,source_note,legal_basis,flashcards,quiz,content_status,reviewed_by,reviewed_at,law_version_checked_at)
values ('redacao-dissertativa-argumentacao-conclusao','Redação','Dissertação, argumentação e conclusão',820,'Redação para concursos — tese, argumentos e conclusão','Como planejar uma dissertação argumentativa, desenvolver argumentos e concluir sem repetir ou introduzir ideias novas.',$md$## 1. O que a banca espera

A dissertação argumentativa apresenta um tema, formula uma **tese** e usa argumentos para sustentá-la. O texto precisa mostrar compreensão do recorte, organização lógica, progressão e domínio da norma-padrão.

## 2. Planejamento em quatro perguntas

1. Qual é exatamente o tema?
2. Qual posição ou resposta o texto defenderá?
3. Quais dois argumentos sustentam essa posição?
4. Que encaminhamento ou síntese fecha o raciocínio?

## 3. Estrutura prática

### Introdução

Apresente o assunto e delimite o recorte. Termine com uma tese clara.

### Desenvolvimento

Cada parágrafo deve conter uma ideia central, explicação e exemplo ou consequência pertinente.

### Conclusão

Retome a tese e feche o raciocínio. Não introduza argumento essencial novo.

## 4. Argumentação com lógica

**Indução** parte de evidências particulares para uma conclusão geral e pode produzir generalização apressada. **Dedução** parte de uma regra ou premissa geral e aplica-a a um caso. Causa, consequência e exemplo devem ser explicados, não apenas citados.

## 5. Checklist

- Respondi exatamente ao tema?
- Minha tese está identificável?
- Cada desenvolvimento tem uma ideia principal?
- Os exemplos explicam o argumento?
- A conclusão retoma a tese?
- Revisei concordância, regência, pontuação e repetição?

> **Método:** escreva primeiro o esqueleto com tese e três frases-guia. Só depois desenvolva os parágrafos.$md$,'Concursos públicos — Redação',1,'Conteúdo consolidado das apostilas enviadas pelo usuário em 28/10/2026. Marcas autorais e reprodução integral foram removidas; material reescrito como orientação didática própria.','[]'::jsonb,'[{"f":"O que diferencia uma dissertação argumentativa?","b":"Ela apresenta uma tese e argumentos organizados para sustentá-la."},{"f":"Qual é a função da conclusão?","b":"Retomar a tese e fechar o raciocínio; não introduzir argumento essencial novo."},{"f":"Qual é o risco da indução?","b":"Uma generalização que não é sustentada pelas evidências."}]'::jsonb,'[{"q":"A conclusão deve acrescentar o principal argumento que não apareceu no desenvolvimento.","a":false,"why":"Argumento essencial deve ser desenvolvido antes."},{"q":"Um exemplo ilustra o argumento, mas não substitui sua explicação.","a":true,"why":"O texto precisa mostrar a relação entre exemplo, tese e problema."}]'::jsonb,'active','3ec587f5-0bf5-458d-841e-a19ff9ebbbf6',now(),now())
on conflict (slug) do update set title=excluded.title,summary=excluded.summary,body_md=excluded.body_md,source_note=excluded.source_note,flashcards=excluded.flashcards,quiz=excluded.quiz,updated_at=now();
commit;
