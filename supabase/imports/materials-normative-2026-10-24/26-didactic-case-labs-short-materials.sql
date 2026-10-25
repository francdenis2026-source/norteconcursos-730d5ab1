-- Lote didático aplicado em 2026-10-24: quatro laboratórios de casos.
-- Não altera enunciados, gabaritos ou o catálogo; apenas acrescenta explicações e exemplos.
-- Guards verificam o snapshot anterior e impedem reaplicação acidental.
begin;
do $guard$ begin
  if not exists(select 1 from public.study_materials where slug='constitucional-acumulacao-ec138-casos' and updated_at='2026-10-24 20:01:11.080476+00'::timestamptz and body_md not like '%## Casos guiados: aplique a redação da EC 138/2025%') then
    raise exception 'Material alterado ou seção já existe: constitucional-acumulacao-ec138-casos';
  end if;
end $guard$;
update public.study_materials
set body_md=body_md||E'\n\n'||'## Casos guiados: aplique a redação da EC 138/2025

**Caso 1 — professora e cargo administrativo.** Uma professora de escola pública também é aprovada para um cargo administrativo. A natureza administrativa do segundo cargo, por si só, não impede a acumulação: após a EC 138/2025, a Constituição admite professor com outro cargo público de qualquer natureza, desde que exista compatibilidade real de horários e sejam respeitadas as demais regras constitucionais.

**Caso 2 — horários incompatíveis.** Um professor pretende manter os dois vínculos, mas os turnos se sobrepõem. A hipótese abstrata de acumulação permitida não elimina a exigência de compatibilidade. Se os horários não puderem ser conciliados, a condição constitucional não está atendida.

**Caso 3 — três cargos remunerados.** A exceção para professor com outro cargo não autoriza automaticamente um terceiro vínculo remunerado. Primeiro identifique a hipótese constitucional; depois confira a quantidade de cargos e as condições aplicáveis.

### Método de resolução

1. Identifique se há cargo de professor.
2. Se houver outro cargo, não aplique a antiga limitação a cargo técnico ou científico.
3. Verifique compatibilidade de horários e teto constitucional.
4. Separe a regra vigente da data de corte de um edital histórico.

**Fonte oficial:** [Constituição Federal, art. 37, XVI e XVII](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm).',updated_at=now()
where slug='constitucional-acumulacao-ec138-casos' and updated_at='2026-10-24 20:01:11.080476+00'::timestamptz
  and body_md not like '%## Casos guiados: aplique a redação da EC 138/2025%';
do $guard$ begin
  if not exists(select 1 from public.study_materials where slug='penal-erros-tentativa-dolo-fixacao' and updated_at='2026-10-24 18:26:16.636221+00'::timestamptz and body_md not like '%## Casos resolvidos: qual elemento mudou?%') then
    raise exception 'Material alterado ou seção já existe: penal-erros-tentativa-dolo-fixacao';
  end if;
end $guard$;
update public.study_materials
set body_md=body_md||E'\n\n'||'## Casos resolvidos: qual elemento mudou?

**Caso 1 — erro sobre um fato.** Uma pessoa leva um objeto acreditando, por circunstâncias concretas, que é o seu. Se o erro recai sobre elemento constitutivo do tipo, analise o erro de tipo do art. 20: ele exclui o dolo; a responsabilização por culpa só é possível se houver previsão legal e se os requisitos culposos estiverem presentes.

**Caso 2 — desconhecimento da proibição.** O agente sabe exatamente o que fez, mas acredita que a conduta não é proibida. A questão é de erro de proibição (art. 21), não de erro de tipo. Se inevitável, isenta de pena; se evitável, pode reduzir a pena de um sexto a um terço.

**Caso 3 — execução interrompida.** O agente inicia atos executórios, mas não consuma o crime por intervenção externa. Em regra, avalia-se a tentativa (art. 14, II), com redução de um a dois terços. Se o próprio agente, voluntariamente, desiste de prosseguir, examine o art. 15 e responda pelos atos já praticados.

**Caso 4 — previsão não é aceitação.** Prever que um resultado pode ocorrer não basta, isoladamente, para concluir por dolo eventual. O enunciado deve trazer elementos que permitam avaliar se o agente assumiu o risco, distinguindo isso da culpa consciente.

### Perguntas de autocorreção

- O erro recai sobre os fatos ou sobre a ilicitude?
- A execução já começou?
- A interrupção veio de fora ou houve desistência voluntária?
- O agente apenas previu o risco ou assumiu sua ocorrência?

**Fonte oficial:** [Código Penal compilado, arts. 14 a 21](https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm).',updated_at=now()
where slug='penal-erros-tentativa-dolo-fixacao' and updated_at='2026-10-24 18:26:16.636221+00'::timestamptz
  and body_md not like '%## Casos resolvidos: qual elemento mudou?%';
do $guard$ begin
  if not exists(select 1 from public.study_materials where slug='penal-lei-no-espaco' and updated_at='2026-10-24 18:26:14.327914+00'::timestamptz and body_md not like '%## Laboratório de casos: lugar do crime e lei aplicável%') then
    raise exception 'Material alterado ou seção já existe: penal-lei-no-espaco';
  end if;
end $guard$;
update public.study_materials
set body_md=body_md||E'\n\n'||'## Laboratório de casos: lugar do crime e lei aplicável

**Caso 1 — conduta em um país, resultado em outro.** Para determinar o lugar do crime, aplique a teoria da ubiquidade do art. 6º do Código Penal: considera-se o lugar em que ocorreu a ação ou omissão, no todo ou em parte, bem como onde o resultado se produziu ou deveria produzir-se. Depois, em etapa separada, verifique se a lei brasileira é aplicável.

**Caso 2 — brasileiro pratica fato no exterior.** A nacionalidade do agente, sozinha, não torna toda conduta automaticamente punível pela lei brasileira. É necessário enquadrar o fato em uma hipótese do art. 7º e conferir as condições legais específicas daquela hipótese.

**Caso 3 — pena cumprida no estrangeiro.** Não responda automaticamente que a pena estrangeira elimina a brasileira. O art. 8º distingue penas idênticas, cuja execução é computada, e penas diversas, em que a pena cumprida fora pode atenuar a imposta no Brasil pelo mesmo crime.

### Sequência para prova

1. Fixe o lugar do crime (art. 6º).
2. Verifique a regra territorial do art. 5º e suas ressalvas.
3. Se o fato ocorreu fora do Brasil, identifique a hipótese de extraterritorialidade do art. 7º e suas condições.
4. Se houver pena cumprida no exterior, examine o art. 8º.

**Fonte oficial:** [Código Penal compilado, arts. 5º a 8º](https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm).',updated_at=now()
where slug='penal-lei-no-espaco' and updated_at='2026-10-24 18:26:14.327914+00'::timestamptz
  and body_md not like '%## Laboratório de casos: lugar do crime e lei aplicável%';
do $guard$ begin
  if not exists(select 1 from public.study_materials where slug='penal-lei-no-tempo' and updated_at='2026-10-24 18:21:33.992482+00'::timestamptz and body_md not like '%## Casos resolvidos: monte a linha do tempo%') then
    raise exception 'Material alterado ou seção já existe: penal-lei-no-tempo';
  end if;
end $guard$;
update public.study_materials
set body_md=body_md||E'\n\n'||'## Casos resolvidos: monte a linha do tempo

**Caso 1 — lei posterior mais severa.** A conduta ocorreu antes de uma lei que aumentou a pena. A lei mais grave posterior não retroage para prejudicar o agente. Comece pela data da ação ou omissão e compare a redação aplicável naquele momento.

**Caso 2 — lei posterior mais benéfica.** Depois do fato, uma lei passa a favorecer o agente. A lei penal mais benéfica retroage, inclusive após o trânsito em julgado, conforme o art. 2º do Código Penal. A data em que o processo terminou não bloqueia esse benefício.

**Caso 3 — abolitio criminis.** A lei nova deixa de considerar criminosa determinada conduta. Cessam a execução e os efeitos penais da condenação, sem que isso apague automaticamente efeitos civis eventualmente existentes.

**Caso 4 — lei temporária.** O fato foi praticado durante a vigência de lei temporária ou excepcional, que depois expirou. O art. 3º determina sua aplicação ao fato praticado durante sua vigência; o fim do prazo não elimina automaticamente sua incidência sobre esse fato.

### Linha de raciocínio

- **Quando ocorreu a conduta?** Art. 4º: teoria da atividade.
- **A lei posterior é mais grave ou mais benéfica?** Arts. 2º e 3º.
- **O fato deixou de ser crime?** Art. 2º, caput.
- **A norma era temporária ou excepcional?** Confira se o fato ocorreu durante sua vigência.

**Fonte oficial:** [Código Penal compilado, arts. 1º a 4º](https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm).',updated_at=now()
where slug='penal-lei-no-tempo' and updated_at='2026-10-24 18:21:33.992482+00'::timestamptz
  and body_md not like '%## Casos resolvidos: monte a linha do tempo%';
commit;
