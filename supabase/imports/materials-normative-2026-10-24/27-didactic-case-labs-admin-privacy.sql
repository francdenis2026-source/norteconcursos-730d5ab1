-- Lote didático aplicado em 2026-10-24: quatro estudos de caso com fontes oficiais.
-- Não altera questões nem gabaritos; acrescenta exemplos e métodos de resolução.
-- Guards verificam o snapshot anterior e impedem reaplicação acidental.
begin;
do $guard$ begin if not exists(select 1 from public.study_materials where slug='administrativo-controle-da-administracao-publica' and updated_at='2026-10-24 18:33:14.66997+00'::timestamptz and body_md not like '%## Casos guiados: identifique quem controla%') then raise exception 'Material alterado ou seção já existe: administrativo-controle-da-administracao-publica'; end if; end $guard$;
update public.study_materials set body_md=body_md||E'\n\n'||'## Casos guiados: identifique quem controla

**Caso 1 — irregularidade detectada antes da contratação.** A unidade de controle interno examina o procedimento e aponta uma falha antes da assinatura. É controle preventivo e interno. A classificação depende de quem atua e de quando o exame ocorre, não apenas do assunto fiscalizado.

**Caso 2 — ato administrativo ilegal.** Uma pessoa questiona judicialmente um ato por violação à lei. O Judiciário pode examinar legalidade, finalidade, motivação e limites jurídicos, mas não deve substituir uma escolha administrativa legítima apenas por preferir outra opção de conveniência.

**Caso 3 — lesão ao patrimônio público.** Um cidadão pretende contestar ato lesivo ao patrimônio público ou à moralidade administrativa. A ação popular é instrumento constitucional próprio e exige a condição de cidadão; não é correto afirmar que qualquer pessoa, sem requisito de cidadania, pode ajuizá-la.

### Quadro de decisão

- **Quem fiscaliza?** Administração, Legislativo/TCU, Judiciário ou cidadão.
- **Quando fiscaliza?** Antes, durante ou depois do ato.
- **O que examina?** Legalidade/legitimidade ou, nos limites próprios, mérito administrativo.
- **Qual instrumento?** Controle interno, externo, judicial, ação popular ou outro meio previsto em lei.

**Fontes oficiais:** [Constituição Federal, arts. 5º, LXXIII, 70, 71 e 74](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm).',updated_at=now() where slug='administrativo-controle-da-administracao-publica' and updated_at='2026-10-24 18:33:14.66997+00'::timestamptz and body_md not like '%## Casos guiados: identifique quem controla%';
do $guard$ begin if not exists(select 1 from public.study_materials where slug='administrativo-poder-de-policia-ciclo-prescricao' and updated_at='2026-10-24 18:43:23.507304+00'::timestamptz and body_md not like '%## Casos guiados: do licenciamento à sanção%') then raise exception 'Material alterado ou seção já existe: administrativo-poder-de-policia-ciclo-prescricao'; end if; end $guard$;
update public.study_materials set body_md=body_md||E'\n\n'||'## Casos guiados: do licenciamento à sanção

**Caso 1 — licença e fiscalização.** Um estabelecimento recebe licença para funcionar e, meses depois, é fiscalizado. A licença se relaciona ao consentimento de polícia; a inspeção integra a fiscalização. Se houver infração comprovada, a Administração deve observar competência, procedimento, defesa e proporcionalidade antes da sanção cabível.

**Caso 2 — multa não paga.** A Administração impõe multa administrativa, mas o particular não paga. A imposição da sanção não significa que qualquer agente possa retirar diretamente bens do devedor. Diferencie coercibilidade e autoexecutoriedade; a cobrança forçada deve seguir o meio legal adequado.

**Caso 3 — prescrição federal.** Um processo punitivo federal fica paralisado por período prolongado. Antes de concluir pela prescrição, identifique a Lei nº 9.873/1999, os marcos interruptivos e a incidência da prescrição intercorrente. Não aplique automaticamente essa lei a toda administração estadual ou municipal: seu âmbito é federal e há exclusões legais.

### Método de resolução

1. Identifique a ordem de polícia e a regra aplicável.
2. Verifique consentimento e fiscalização, quando existirem.
3. Confirme infração, competência e garantias do procedimento.
4. Só então analise sanção, execução e prazo prescricional.

**Fontes oficiais:** [CTN, art. 78](https://www.planalto.gov.br/ccivil_03/leis/l5172compilado.htm) e [Lei nº 9.873/1999](https://www.planalto.gov.br/ccivil_03/leis/l9873.htm).',updated_at=now() where slug='administrativo-poder-de-policia-ciclo-prescricao' and updated_at='2026-10-24 18:43:23.507304+00'::timestamptz and body_md not like '%## Casos guiados: do licenciamento à sanção%';
do $guard$ begin if not exists(select 1 from public.study_materials where slug='administrativo-poderes-vinculado-discricionario-hierarquico' and updated_at='2026-10-24 18:50:44.93652+00'::timestamptz and body_md not like '%## Casos guiados: delegação, avocação e ordem ilegal%') then raise exception 'Material alterado ou seção já existe: administrativo-poderes-vinculado-discricionario-hierarquico'; end if; end $guard$;
update public.study_materials set body_md=body_md||E'\n\n'||'## Casos guiados: delegação, avocação e ordem ilegal

**Caso 1 — delegação a órgão não subordinado.** Uma autoridade federal delega parte de sua competência a outra autoridade, sem relação hierárquica direta. A Lei nº 9.784/1999 admite delegação nos limites legais mesmo sem subordinação, desde que a matéria não seja exclusiva e não se trate de edição de ato normativo ou decisão de recurso administrativo.

**Caso 2 — avocação permanente.** Um superior decide assumir indefinidamente toda competência de um subordinado, sem justificativa específica. Isso não corresponde à avocação legal: ela é excepcional, temporária e deve ser motivada por razões relevantes.

**Caso 3 — ordem manifestamente ilegal.** Um servidor recebe ordem claramente contrária à lei. A hierarquia não transforma uma ordem manifestamente ilegal em obrigação legítima; a Lei nº 8.112/1990 prevê o dever de cumprir ordens superiores, exceto quando manifestamente ilegais.

### Lista de verificação

- A competência pode ser delegada?
- A decisão está entre as matérias indelegáveis?
- Há justificativa e caráter temporário para avocar?
- A ordem recebida é legal?
- O ato discricionário continua respeitando competência, finalidade e forma previstas em lei?

**Fontes oficiais:** [Lei nº 9.784/1999, arts. 11 a 15](https://www.planalto.gov.br/ccivil_03/leis/l9784.htm) e [Lei nº 8.112/1990, art. 116](https://www.planalto.gov.br/ccivil_03/leis/l8112compilado.htm).',updated_at=now() where slug='administrativo-poderes-vinculado-discricionario-hierarquico' and updated_at='2026-10-24 18:50:44.93652+00'::timestamptz and body_md not like '%## Casos guiados: delegação, avocação e ordem ilegal%';
do $guard$ begin if not exists(select 1 from public.study_materials where slug='constitucional-privacidade-dados' and updated_at='2026-10-24 18:32:41.825096+00'::timestamptz and body_md not like '%## Casos guiados: proteção de dados e competência%') then raise exception 'Material alterado ou seção já existe: constitucional-privacidade-dados'; end if; end $guard$;
update public.study_materials set body_md=body_md||E'\n\n'||'## Casos guiados: proteção de dados e competência

**Caso 1 — cadastro para prestar um serviço.** Um órgão solicita dados pessoais para executar um serviço público. A coleta, isoladamente, não prova violação constitucional; é necessário examinar finalidade, fundamento e garantias aplicáveis. Também é incorreto presumir que consentimento seja sempre a única base possível para qualquer tratamento de dados.

**Caso 2 — documento em papel.** Um arquivo físico contém dados pessoais e informações íntimas. A proteção constitucional não se limita a informações armazenadas em aplicativos ou computadores: a redação constitucional inclui dados pessoais e protege intimidade e vida privada em termos mais amplos.

**Caso 3 — quem legisla e quem fiscaliza?** Uma questão pergunta qual ente tem competência para legislar sobre proteção e tratamento de dados e qual organiza e fiscaliza essa atividade. Leia separadamente o art. 22, XXX, e o art. 21, XXVI; competência legislativa e competência material não são sinônimos.

### Como evitar a confusão

- **Direito protegido:** intimidade, vida privada e proteção de dados.
- **Objeto:** informação pessoal, não apenas informação digital.
- **Competência material:** organizar e fiscalizar.
- **Competência legislativa:** editar normas dentro da competência constitucional.

**Fonte oficial:** [Constituição Federal, arts. 5º, X e LXXIX, 21, XXVI, e 22, XXX](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm).',updated_at=now() where slug='constitucional-privacidade-dados' and updated_at='2026-10-24 18:32:41.825096+00'::timestamptz and body_md not like '%## Casos guiados: proteção de dados e competência%';
commit;
