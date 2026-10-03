-- Conferência do material "NBC TSP Estrutura Conceitual" contra o texto da norma (23/09/2016).
-- Ajusta a definição de passivo para a redação da norma e acrescenta as restrições à informação
-- (materialidade, custo-benefício e equilíbrio entre as características), que o edital da PF 2025
-- cobra no item 12 do Bloco III. Só altera o material enquanto ele estiver sob revisão.
update public.study_materials
set
  body_md = replace(
    replace(
      body_md,
      '- **Passivo** é uma obrigação presente da entidade de transferir recursos como resultado de evento passado.',
      '- **Passivo** é uma obrigação presente, derivada de evento passado, cuja extinção deva resultar na saída de recursos da entidade.'
    ),
    '## Ativo e passivo no setor público',
    E'As **restrições** inerentes à informação são a **materialidade**, o **custo-benefício** e o **equilíbrio apropriado** entre as características qualitativas. No setor público a materialidade aparece como restrição, e não como característica.\n\n## Ativo e passivo no setor público'
  ),
  source_note = 'Material próprio, baseado na NBC TSP Estrutura Conceitual (23/09/2016) e no Resumão de Contabilidade Geral (Gran Cursos Online, prof. Feliphe Araújo). Conferido contra o texto da norma nos pontos: objetivos, usuários primários, seis características qualitativas, restrições, definições de recurso, ativo e passivo, bases de mensuração de passivos e custo de liberação. A lista das bases de mensuração de ativos ainda precisa de conferência. Falta incluir o link oficial da norma antes da publicação.'
where slug = 'contabilidade-nbc-tsp-estrutura-conceitual'
  and content_status = 'under_review';
