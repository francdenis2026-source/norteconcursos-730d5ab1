-- Auditoria de legislação, lote 1: Feijó 2018 (Professor-Pedagogo), itens
-- 26-28. São as 3 únicas questões do catálogo ainda marcadas
-- legal_review_required=true sem legal_audit_completed — hoje elas ficam
-- ocultas no treinador até essa verificação.
--
-- Conferência feita em 28/09/2026 direto no texto compilado do Planalto:
-- - ECA (Lei nº 8.069/1990), Art. 2º: comparado palavra por palavra com
--   https://www.planalto.gov.br/ccivil_03/leis/l8069.htm#art2 — idêntico
--   ao texto original de 1990, sem alteração.
-- - Constituição Federal de 1988, Art. 205 (caput): comparado com
--   https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm#art205
--   — idêntico, sem emenda.
-- - Constituição Federal de 1988, Art. 210 (caput): comparado com
--   https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm#art210
--   — idêntico, sem emenda (o artigo tem também §1º e §2º, não alterados
--   e não citados no enunciado da prova).
--
-- Marca legal_audit_completed=true e law_version_checked_at=now() pra essas
-- 3 questões saírem do bloqueio do treinador, e acrescenta explicação
-- didática com exemplo do dia a dia no review_note.

update public.official_exam_questions set
  review_note = $q$Correto. O Art. 2º do ECA divide as fases da infância/adolescência por idade: criança é quem tem até 12 anos incompletos; adolescente, entre 12 e 18 anos. A prova errou a numeração da lei (grafou "8.068" em vez de "8.069"), mas isso não muda a resposta — o conteúdo cobrado é mesmo esse. Redação conferida como ainda vigente no Planalto em 28/09/2026, sem qualquer emenda a este artigo.
Exemplo: é a mesma lógica usada pra saber se uma sala de aula é de "fundamental I" ou "fundamental II" — a idade da criança é o critério, não o tamanho ou a maturidade aparente dela.$q$,
  legal_audit_completed = true,
  law_version_checked_at = now()
where exam_year = 2018 and item_number = 26
  and career_name = 'Professor - Licenciatura Plena - Pedagogo'
  and official_answer = 'C';

update public.official_exam_questions set
  review_note = $q$Correto. O Art. 205 da Constituição Federal lista as três finalidades da educação: o pleno desenvolvimento da pessoa, o preparo para a cidadania e a qualificação para o trabalho — exatamente a alternativa cobrada. Redação conferida como ainda vigente no Planalto em 28/09/2026, sem qualquer emenda a este artigo.
Exemplo: é como pensar no "para que serve a escola" — não é só ensinar conteúdo, é formar a pessoa (desenvolvimento), prepará-la pra votar e participar da sociedade (cidadania) e dar ferramentas pra ela trabalhar (qualificação).$q$,
  legal_audit_completed = true,
  law_version_checked_at = now()
where exam_year = 2018 and item_number = 27
  and career_name = 'Professor - Licenciatura Plena - Pedagogo'
  and official_answer = 'A';

update public.official_exam_questions set
  review_note = $q$Correto. O Art. 210 da Constituição Federal manda fixar conteúdos mínimos pro ensino fundamental, garantindo uma formação básica comum e respeito aos valores culturais e artísticos — nacionais E regionais ao mesmo tempo, não um só dos dois. Redação conferida como ainda vigente no Planalto em 28/09/2026, sem qualquer emenda a este artigo (o artigo também tem §1º sobre ensino religioso e §2º sobre línguas indígenas, não cobrados nesta questão).
Exemplo: é por isso que um currículo escolar no Acre pode ensinar sobre a cultura amazônica ao lado do conteúdo "padrão" nacional — a Constituição garante espaço pros dois, o valor regional não substitui o nacional, ele convive com ele.$q$,
  legal_audit_completed = true,
  law_version_checked_at = now()
where exam_year = 2018 and item_number = 28
  and career_name = 'Professor - Licenciatura Plena - Pedagogo'
  and official_answer = 'E';
