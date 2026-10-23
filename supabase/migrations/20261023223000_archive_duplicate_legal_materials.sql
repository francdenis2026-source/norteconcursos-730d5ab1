-- Arquiva materiais jurídicos duplicados: "Legislação Especial" ganhou, a partir de
-- 07-11/10/2026, uma segunda leva de guias ("...-revisao", formato "guia de estudo e
-- aplicação", com a linha de conferência de fonte oficial), cobrindo as mesmas leis já
-- publicadas em "Legislação Penal Especial" e em "Legislação Específica da PF" (lote
-- mais antigo, de 07/10/2026, formato mais simples "## Objetivo do módulo").
--
-- Resultado: o aluno via a mesma lei duas vezes na Biblioteca — "Legislação Especial" e
-- "Legislação Penal Especial" ficam no mesmo grupo visual ("Legislação — outros temas"),
-- então as duplicatas apareciam lado a lado com títulos diferentes para a mesma norma.
--
-- Esta migration arquiva (nunca apaga) as 36 cópias mais antigas/mais simples,
-- mantendo ativa a versão "guia de estudo e aplicação" de cada lei em "Legislação
-- Especial". Conferido par a par (título, corpo e data de conferência) antes de aplicar;
-- nenhum slug arquivado é referenciado em código do repositório.
update study_materials
set content_status = 'archived'
where slug in (
  -- Legislação Penal Especial: cada uma tem par em Legislação Especial ("...-revisao")
  'legislacao-penal-especial-drogas',
  'legislacao-penal-especial-armas',
  'legislacao-penal-especial-tortura',
  'legislacao-penal-especial-abuso-autoridade',
  'legislacao-penal-especial-organizacao-criminosa',
  'legislacao-penal-especial-crimes-hediondos',
  'legislacao-penal-especial-maria-da-penha',
  'legislacao-penal-especial-interceptacao-telefonica',
  'legislacao-penal-especial-lavagem-dinheiro',
  'legislacao-penal-especial-eca',
  'legislacao-penal-especial-crimes-ambientais',
  'legislacao-penal-especial-prisao-temporaria',
  'legislacao-penal-especial-juizados-especiais',
  'legislacao-penal-especial-investigacao-delegado',
  'legislacao-penal-especial-identificacao-criminal',
  'legislacao-penal-especial-antiterrorismo',
  'legislacao-penal-especial-trafico-pessoas',
  'legislacao-penal-especial-protecao-testemunhas',
  'legislacao-penal-especial-racismo',
  'legislacao-penal-especial-estatuto-idoso',
  'legislacao-penal-especial-estatuto-pcd',
  'legislacao-penal-especial-henry-borel',
  'legislacao-penal-especial-ctb-crimes-transito',
  'legislacao-penal-especial-lep-execucao-penal',
  'legislacao-penal-especial-lcp-contravencoes',
  -- Legislação Específica da PF: cada uma tem par em Legislação Especial ("...-revisao")
  'legislacao-pf-seguranca-privada',
  'legislacao-pf-precursores-quimicos',
  'legislacao-pf-migracao',
  'legislacao-pf-repercussao-interestadual',
  'legislacao-pf-icn',
  'legislacao-pf-cpf-numero-unico',
  'legislacao-pf-carteira-identidade',
  'legislacao-pf-cin',
  'legislacao-pf-servico-identificacao',
  'legislacao-pf-budapeste',
  -- Duplicata dentro da própria Legislação Especial: par mais antigo de
  -- "legislacao-armas-revisao" (mesma lei, Estatuto do Desarmamento)
  'legislacao-armas-posse-porte'
)
and content_status = 'active';
