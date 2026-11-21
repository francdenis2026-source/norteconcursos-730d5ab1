-- Correct ambiguity in the opening truth/liar exercise; the initial draft admitted two assignments.
update public.study_materials
set body_md=replace(
 body_md,
 $old$Ana e Bruno são pessoas: uma sempre diz a verdade e a outra sempre mente. Ana afirma: “Bruno mente”. O que se pode concluir?$old$,
 $new$Ana e Bruno são pessoas: uma sempre diz a verdade e a outra sempre mente. Ana afirma: “Bruno mente”. Bruno afirma: “Ana e eu mentimos”. Quem diz a verdade?$new$
),
updated_at=now()
where slug='pcac-2026-raciocinio-logico-07-verdades-mentiras';

update public.study_materials
set body_md=replace(
 body_md,
 $old$Se Ana diz a verdade, então sua afirmação “Bruno mente” é verdadeira, logo Bruno mente. Isso satisfaz a regra de que uma fala a verdade e a outra mente. Se Ana mentisse, a afirmação “Bruno mente” seria falsa e Bruno diria a verdade, mas então ambos seriam opostos também: essa configuração também é possível. Portanto o enunciado, como está, não determina uma única resposta. A questão é anulável por ambiguidade; o aluno deve reconhecer quando faltam condições.$old$,
 $new$Se Ana diz a verdade, Bruno mente. A afirmação de Bruno (“Ana e eu mentimos”) é falsa, pois Ana fala a verdade; portanto, a configuração é consistente. Se Ana mentisse, Bruno seria verdadeiro pela regra de que apenas um mente. Mas a frase de Bruno, que afirma que ambos mentem, seria falsa, criando contradição. Logo, somente Ana diz a verdade e Bruno mente. **Técnica:** teste as duas hipóteses e elimine a que produz contradição.$new$
),
updated_at=now()
where slug='pcac-2026-raciocinio-logico-07-verdades-mentiras';
