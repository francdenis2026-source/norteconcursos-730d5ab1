begin;
insert into public.study_materials (slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,syllabus_topic_order,source_note,legal_basis,flashcards,quiz,content_status,reviewed_by,reviewed_at,law_version_checked_at)
values ('constitucional-acervo-consolidado-2026','Direito Constitucional','Trilha consolidada do acervo constitucional',650,'Direito Constitucional — trilha consolidada e atualizada','Roteiro único para estudar o acervo enviado: fundamentos, direitos, organização do Estado, poderes, defesa, segurança pública, ordem social e jurisprudência.',$md$## Como o acervo foi organizado

Os arquivos enviados foram agrupados por assunto e os duplicados, slides e versões repetidas devem alimentar o mesmo módulo, sem criar cópias para o aluno. O texto de estudo da plataforma é uma síntese editorial própria; as marcas de cursos e autores não são reproduzidas.

## Trilha de estudo

1. **Constituição e princípios fundamentais:** fundamentos da República, objetivos, separação de Poderes, prevalência dos direitos humanos e princípios das relações internacionais.
2. **Direitos e garantias fundamentais:** vida, igualdade, liberdade, privacidade, propriedade, direitos sociais, nacionalidade, direitos políticos e remédios constitucionais.
3. **Organização do Estado:** União, Estados, Distrito Federal e Municípios; competências, bens públicos, intervenção e federalismo.
4. **Administração Pública:** princípios do art. 37, concurso, cargos e empregos, acumulação, agentes públicos, responsabilidade e controle.
5. **Poder Legislativo:** Congresso, Câmara, Senado, processo legislativo, fiscalização financeira e Tribunais de Contas.
6. **Poder Executivo:** Presidência, Vice-Presidência, Ministros, responsabilidade e competências.
7. **Poder Judiciário e funções essenciais:** garantias da magistratura, competências, CNJ, Ministério Público, Advocacia Pública e Defensoria.
8. **Defesa do Estado e segurança pública:** estado de defesa, estado de sítio, Forças Armadas e órgãos do art. 144.
9. **Ordem social:** seguridade, educação, cultura, meio ambiente, família, criança, adolescente, jovem, idoso, povos indígenas e reforma agrária.

## Controle de atualidade

- Conferir sempre o texto compilado da Constituição no Planalto.
- Separar redação constitucional de entendimento jurisprudencial do STF.
- Registrar em cada material a emenda constitucional ou decisão que alterou a leitura.
- Não tratar slides repetidos como novos conteúdos.
- Quando o PDF trouxer redação anterior, manter apenas como histórico claramente identificado.

> **Ponto de atenção:** o acervo contém temas sujeitos a alterações por emendas e decisões do STF. A versão publicada deve ser conferida na Constituição compilada e nas fontes oficiais antes de cada ciclo de prova.$md$,'Concursos públicos — Direito Constitucional',1,'Trilha editorial consolidada a partir dos arquivos constitucionais enviados pelo usuário em 28/10/2026. Duplicatas, slides e marcas autorais foram excluídos da apresentação. Conteúdo conferido contra fontes oficiais.','[{"title":"Constituição Federal compilada — Planalto","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"},{"title":"Jurisprudência do STF","url":"https://portal.stf.jus.br/jurisprudencia/"},{"title":"Legislação Federal — Câmara dos Deputados","url":"https://www.camara.leg.br/atividade-legislativa/legislacao/"}]'::jsonb,'[{"f":"Como estudar versões repetidas do mesmo PDF?","b":"Usar uma única trilha consolidada e aproveitar apenas informações novas após conferência."},{"f":"Qual fonte deve prevalecer para o texto constitucional?","b":"A Constituição Federal compilada em fonte oficial, especialmente o Planalto."},{"f":"Como tratar jurisprudência em prova?","b":"Separar o texto da Constituição da tese ou precedente do STF e conferir a data."}]'::jsonb,'[{"q":"Slides repetidos devem ser cadastrados como materiais independentes para o aluno.","a":false,"why":"A plataforma deve consolidar duplicatas e evitar repetição."},{"q":"A Constituição compilada e a jurisprudência oficial devem ser conferidas antes da publicação.","a":true,"why":"Emendas e precedentes podem alterar a leitura cobrada em prova."}]'::jsonb,'active','3ec587f5-0bf5-458d-841e-a19ff9ebbbf6',now(),now())
on conflict (slug) do update set title=excluded.title,summary=excluded.summary,body_md=excluded.body_md,source_note=excluded.source_note,legal_basis=excluded.legal_basis,flashcards=excluded.flashcards,quiz=excluded.quiz,updated_at=now();
commit;
