begin;
insert into public.study_materials (slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,syllabus_topic_order,source_note,legal_basis,flashcards,quiz,content_status,reviewed_by,reviewed_at,law_version_checked_at)
values ('penal-acervo-consolidado-2026','Direito Penal','Trilha consolidada do acervo penal',700,'Direito Penal — trilha consolidada e atualizada','Roteiro integrado do acervo enviado: Parte Geral, teoria do crime, aplicação da lei penal e crimes em espécie, sem duplicar apostilas ou slides.',$md$## Como o acervo foi organizado

Os PDFs foram agrupados em uma trilha editorial única. Apostilas repetidas, slides e versões provisórias não viram materiais duplicados. O conteúdo publicado é uma síntese própria, sem marcas autorais, e cada tema deve ser conferido no texto legal vigente.

## Parte Geral

1. **Princípios e aplicação da lei penal:** legalidade, anterioridade, irretroatividade, lei mais benéfica, lei excepcional e temporária, tempo e lugar do crime, territorialidade e extraterritorialidade.
2. **Teoria do crime:** fato típico, conduta, resultado, nexo causal, tipicidade, dolo e culpa, tentativa, desistência voluntária, arrependimento eficaz e crime impossível.
3. **Ilicitude:** legítima defesa, estado de necessidade, estrito cumprimento do dever legal e exercício regular de direito; excesso doloso e culposo.
4. **Culpabilidade:** imputabilidade, potencial consciência da ilicitude, exigibilidade de conduta diversa, erro de tipo e erro de proibição.
5. **Concurso de pessoas, penas e extinção da punibilidade:** autoria, participação, concurso material e formal, crime continuado, prescrição e demais causas legais.

## Crimes em espécie

- Crimes contra a pessoa: homicídio, lesão corporal, abandono material e intelectual, maus-tratos, rixa, omissão de socorro, aborto e crimes contra a honra.
- Crimes contra o patrimônio: furto, roubo, extorsão, apropriação indébita, estelionato, dano e receptação.
- Crimes contra a liberdade individual: ameaça, constrangimento ilegal, sequestro e cárcere privado, perseguição e redução a condição análoga à de escravo.
- Crimes contra a dignidade sexual e crimes cibernéticos: conferir alterações legislativas e tipos específicos na redação atual.
- Crimes contra a Administração Pública: peculato, concussão, corrupção, prevaricação, resistência, desobediência, desacato quando aplicável e crimes licitatórios.
- Crimes contra a fé pública, paz pública e incolumidade pública: conferir elementos objetivos, sujeitos, consumação e causas de aumento.

## Revisão de vigência

- A redação do Código Penal deve ser consultada no texto compilado do Planalto.
- Materiais antigos devem ser comparados com leis posteriores, especialmente alterações em crimes contra a mulher, crimes patrimoniais, fraude eletrônica, crimes sexuais, crimes licitatórios e organizações criminosas.
- Jurisprudência e súmulas devem ser estudadas separadamente do texto legal, com indicação do tribunal e da data.
- Slides repetidos ou marcados como provisórios não devem ser publicados como novas matérias.

> **Cai em prova:** não basta memorizar o nome do crime. Identifique bem jurídico, verbo do tipo, sujeito ativo, dolo exigido, consumação, tentativa, majorantes, qualificadoras e ação penal.$md$,'Concursos públicos — Direito Penal',1,'Trilha editorial consolidada a partir dos PDFs de Direito Penal enviados pelo usuário em 28/10/2026. Duplicatas, slides e marcas autorais foram excluídos da apresentação. Conteúdo sujeito a conferência periódica de alterações legislativas e jurisprudência.','[{"title":"Código Penal compilado — Planalto","url":"https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"},{"title":"Legislação Federal — Câmara dos Deputados","url":"https://www.camara.leg.br/atividade-legislativa/legislacao/"},{"title":"Jurisprudência do STJ","url":"https://processo.stj.jus.br/jurisprudencia/"}]'::jsonb,'[{"f":"Como estudar apostilas repetidas e slides do mesmo tema?","b":"Consolidar em uma única trilha e aproveitar somente informações novas após conferência."},{"f":"Quais elementos devem ser identificados em cada crime?","b":"Bem jurídico, verbo do tipo, sujeitos, dolo ou culpa, consumação, tentativa, majorantes, qualificadoras e ação penal."},{"f":"Qual fonte deve prevalecer para a redação do Código Penal?","b":"O Código Penal compilado em fonte oficial, especialmente o Planalto."}]'::jsonb,'[{"q":"Slides repetidos devem aparecer como materiais independentes para o aluno.","a":false,"why":"Duplicatas devem ser consolidadas."},{"q":"A jurisprudência deve ser identificada separadamente do texto legal.","a":true,"why":"Lei e precedente têm naturezas diferentes e podem mudar em datas distintas."}]'::jsonb,'active','3ec587f5-0bf5-458d-841e-a19ff9ebbbf6',now(),now())
on conflict (slug) do update set title=excluded.title,summary=excluded.summary,body_md=excluded.body_md,source_note=excluded.source_note,legal_basis=excluded.legal_basis,flashcards=excluded.flashcards,quiz=excluded.quiz,updated_at=now();
commit;
