-- Conferência com a fonte oficial (não mais com o PDF/apostila do Drive) e
-- exemplos pedagógicos para os 5 materiais de Direito Constitucional/Administrativo/
-- Penal (PF) que entraram em 20261001080000_study_materials_direito_pf_under_review.sql.
--
-- Conferido direto no planalto.gov.br em 07/10/2026 (sessão com acesso à internet):
-- CF arts. 5º, 12, 14, 15, 17; Lei nº 13.445/2017; Lei nº 9.784/1999; Lei nº 9.873/1999;
-- Código Penal (DL 2.848/1940) arts. 1º e 2º. Nenhum dispositivo citado diverge da
-- redação vigente; a única alteração pós-2023 no bloco é a EC 131/2023 sobre a
-- CF art. 12, §§4º-5º, que o texto já registrava. Por isso o conteúdo jurídico não
-- foi alterado — só a observação de origem e a data de conferência, mais um exemplo
-- prático por tópico, pedido para facilitar o entendimento do aluno.
-- Continua `under_review`: a ativação depende do admin (CONTENT_GOVERNANCE.md).
begin;

update public.study_materials set
  source_note = 'Reescrito a partir dos mapas mentais da pasta Apostilas (100 mapas mentais gratuitos), com organização, exemplos e destaques de prova próprios. Conferido artigo por artigo direto no planalto.gov.br em 07/10/2026 (CF art. 12 e Lei nº 13.445/2017); sem divergência com o texto vigente.',
  law_version_checked_at = '2026-10-07T22:40:37Z',
  body_md = body_md || $extra$

## Exemplo para entender na prática

1. Um casal brasileiro mora em Lisboa a trabalho e tem uma filha lá. Se eles não a registram em repartição consular brasileira, ela ainda pode se tornar brasileira nata depois: basta vir residir no Brasil e, após atingir a maioridade, optar pela nacionalidade brasileira (art. 12, I, "c"). Não é naturalização: é nacionalidade originária, só exercida depois.
2. Marcos, brasileiro nato, naturaliza-se português para trabalhar na União Europeia, sem fazer qualquer pedido à autoridade brasileira. Pela redação da EC 131/2023, isso **não** basta para ele perder a nacionalidade brasileira: a mera aquisição de outra nacionalidade deixou de ser causa de perda. Só perderia se pedisse expressamente a perda (e isso não puder gerar apatridia) ou tivesse a naturalização cancelada por fraude ou atentado à ordem constitucional.
$extra$
where slug = 'constitucional-nacionalidade-medidas-retirada' and content_status = 'under_review';

update public.study_materials set
  source_note = 'Reescrito a partir dos mapas mentais da pasta Apostilas (100 mapas mentais gratuitos), com organização, exemplos e destaques de prova próprios. Conferido artigo por artigo direto no planalto.gov.br em 07/10/2026 (CF art. 14, 15 e 17, §1º, redação da EC 97/2017); sem divergência com o texto vigente.',
  law_version_checked_at = '2026-10-07T22:40:37Z',
  body_md = body_md || $extra$

## Exemplo para entender na prática

1. Felipe tem 17 anos. Ele pode votar, mas não é obrigado: entre 16 e 18 anos incompletos o voto é facultativo, assim como para analfabetos e maiores de 70 anos.
2. Antes de dividir um estado em dois, o Congresso convoca a população da área para um **plebiscito**: a consulta vem *antes* do ato, para aprovar ou denegar a divisão. Já depois de editar uma lei polêmica, o Congresso pode convocar um **referendo**, em que a população *ratifica ou rejeita* o que já foi decidido. A diferença é só o momento da consulta em relação ao ato.
$extra$
where slug = 'constitucional-direitos-politicos-elegibilidade' and content_status = 'under_review';

update public.study_materials set
  source_note = 'Reescrito a partir dos mapas mentais da pasta Apostilas (100 mapas mentais gratuitos), com organização, exemplos e destaques de prova próprios. Conferido artigo por artigo direto no planalto.gov.br em 07/10/2026 (Lei nº 9.784/1999, arts. 11 a 15); sem divergência com o texto vigente.',
  law_version_checked_at = '2026-10-07T22:40:37Z',
  body_md = body_md || $extra$

## Exemplo para entender na prática

1. Um Secretário de Estado **delega** a um servidor de outro órgão (sem relação hierárquica com ele) a competência para assinar portarias de rotina. É válido, porque a delegação não exige subordinação; mas o Secretário não pode delegar a edição de atos normativos nem a decisão de recursos administrativos, e pode revogar essa delegação a qualquer momento.
2. Durante uma greve que paralisa um setor, o diretor-geral **avoca** temporariamente uma atribuição desse setor (que não é privativa dele) para não travar o serviço. É excepcional e só se justifica enquanto durar o motivo relevante; terminada a greve, a atribuição volta ao órgão de origem.
$extra$
where slug = 'administrativo-poderes-vinculado-discricionario-hierarquico' and content_status = 'under_review';

update public.study_materials set
  source_note = 'Reescrito a partir dos mapas mentais da pasta Apostilas (100 mapas mentais gratuitos), com organização, exemplos e destaques de prova próprios. Conferido artigo por artigo direto no planalto.gov.br em 07/10/2026 (Lei nº 9.873/1999, arts. 1º, 1º-A e 5º); sem divergência com o texto vigente.',
  law_version_checked_at = '2026-10-07T22:40:37Z',
  body_md = body_md || $extra$

## Exemplo para entender na prática

1. Uma vigilância sanitária fiscaliza um restaurante: a **ordem de polícia** é a norma que exige condições de higiene; o **consentimento** é o alvará que autoriza o funcionamento; a **fiscalização** é a vistoria periódica; e a **sanção** é a multa ou a interdição, se a norma for descumprida. As quatro fases do ciclo de polícia aparecem nessa única rotina.
2. Um processo administrativo federal apurando uma infração fica parado, sem despacho ou julgamento, por mais de 3 anos. Mesmo sem completar o prazo de 5 anos do art. 1º, incide a **prescrição intercorrente** (art. 1º, §1º), porque o processo ficou paralisado além do limite legal por inércia da Administração.
$extra$
where slug = 'administrativo-poder-de-policia-ciclo-prescricao' and content_status = 'under_review';

update public.study_materials set
  source_note = 'Reescrito a partir dos mapas mentais da pasta Apostilas (100 mapas mentais gratuitos), com organização, exemplos e destaques de prova próprios. Conferido artigo por artigo direto no planalto.gov.br em 07/10/2026 (CF art. 5º e Código Penal arts. 1º e 2º); sem divergência com o texto vigente.',
  law_version_checked_at = '2026-10-07T22:40:37Z',
  body_md = body_md || $extra$

## Exemplo para entender na prática

1. Uma lei revoga o crime de adultério. Quem já tinha sido condenado por esse crime deixa de cumprir a pena e os efeitos penais da condenação cessam: é a **abolitio criminis** (art. 2º do CP), aplicação da regra de que a lei posterior que descriminaliza a conduta retroage, mesmo depois do trânsito em julgado.
2. João, sem antecedentes, furta um alicate de baixo valor de uma loja. Avaliando juntos os quatro vetores do mnemônico **MARI** (mínima ofensividade, ausência de periculosidade, reduzida reprovabilidade, lesão inexpressiva), a jurisprudência pode reconhecer a **insignificância** e trancar a ação penal — mas isso não está escrito em lei, é construção do STF, então não deve ser citado como dispositivo legal.
$extra$
where slug = 'penal-principios-direito-penal' and content_status = 'under_review';

commit;
