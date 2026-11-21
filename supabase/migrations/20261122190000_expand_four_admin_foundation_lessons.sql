UPDATE study_materials SET body_md=body_md || '
## Como a banca diferencia os atos administrativos

**Situação prática:** a prefeitura concede licença a quem cumpriu todos os requisitos legais. A licença é tipicamente vinculada: preenchidas as condições, não se decide por simples preferência pessoal. Já a autorização administrativa, em muitas hipóteses, envolve avaliação discricionária prevista em lei. Discricionariedade não é liberdade para descumprir a norma.

**Cinco elementos:** competência (quem pode agir), finalidade (para quê), forma (como se exterioriza), motivo (fatos e fundamentos) e objeto (o efeito jurídico). Para memorizar, pergunte: quem, para quê, como, por quê e o quê?

**Atributos:** presunção de legitimidade é relativa, portanto admite prova em contrário; imperatividade não está em todos os atos; autoexecutoriedade depende de previsão legal ou urgência nos casos admitidos. Não confunda atributos com elementos.

**Anulação, revogação e convalidação:** anulação enfrenta ilegalidade; revogação aprecia conveniência e oportunidade de ato válido quando cabível; convalidação pode sanar vícios passíveis de correção, sem lesão ao interesse público ou prejuízo a terceiros (Lei 9.784/1999, art. 55). **Dica:** ao ver a palavra ''ilegal'', pense primeiro em anulação, não em revogação.
',quiz=quiz || '[{"q":"Um ato praticado por autoridade incompetente pode, em certas condições legais, ser convalidado se o vício for sanável e não houver prejuízo a terceiros.","a":true,"why":"Certo. A Lei 9.784/1999, art. 55, admite convalidação de defeitos sanáveis quando não houver lesão ao interesse público nem prejuízo a terceiros. Nem todo vício de competência é sanável."},{"q":"A presunção de legitimidade torna impossível ao interessado demonstrar que o ato administrativo é ilegal.","a":false,"why":"Errado. A presunção é relativa: o interessado pode produzir prova em contrário e questionar a legalidade do ato administrativa ou judicialmente."}]'::jsonb,updated_at=now() WHERE slug='administrativo-acervo-atos' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Como a banca diferencia os atos administrativos%';
UPDATE study_materials SET body_md=body_md || '
## Aplicação da Lei 9.784/1999 em situações concretas

**Exemplo:** um cidadão solicita providência a órgão federal. Concluída a instrução do processo, a Administração tem, em regra, até **30 dias para decidir**, salvo prorrogação por igual período expressamente motivada (art. 49). Não confunda esse prazo com o prazo para recorrer.

**Recurso administrativo:** salvo disposição legal específica, o prazo geral para interpor recurso é de **10 dias**, contados da ciência ou divulgação oficial da decisão (art. 59). Em regra, o recurso não tem efeito suspensivo automático (art. 61).

**Delegação:** permite transferir o exercício de atribuições quando admitido; não podem ser delegadas a edição de atos normativos, a decisão de recursos administrativos e as matérias de competência exclusiva (art. 13). **Avocação** é excepcional, temporária e justificada por motivos relevantes (art. 15).

**Impedimento e suspeição:** interesse direto ou indireto na matéria pode gerar impedimento; amizade íntima ou inimizade notória pode fundamentar suspeição. **Dica de prova:** identifique a causa e não troque os institutos.
',quiz=quiz || '[{"q":"Pela Lei 9.784/1999, após a conclusão da instrução, o prazo geral para decidir é de 30 dias, prorrogável por igual período mediante motivação expressa.","a":true,"why":"Certo. É a regra do art. 49 da Lei 9.784/1999. O marco é o encerramento da instrução, não necessariamente a data do protocolo."},{"q":"A decisão de recursos administrativos pode ser livremente delegada pela autoridade competente.","a":false,"why":"Errado. O art. 13, II, da Lei 9.784/1999 veda delegação da decisão de recursos administrativos. Não confunda delegação de tarefas com delegação dessa competência."}]'::jsonb,updated_at=now() WHERE slug='administrativo-acervo-lei-9784' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Aplicação da Lei 9.784/1999 em situações concretas%';
UPDATE study_materials SET body_md=body_md || '
## Controle da Administração: mapa de resolução

**Controle interno:** realizado no âmbito do próprio Poder; por exemplo, uma unidade de auditoria interna verifica procedimentos da organização. **Controle externo:** no plano federal, é exercido pelo Congresso Nacional com auxílio do Tribunal de Contas da União (CF, arts. 70 e 71). O auxílio técnico do TCU não significa que ele seja subordinado hierarquicamente ao Congresso.

**Controle judicial:** alcança legalidade, constitucionalidade e abusos. O Judiciário não substitui, como regra, a escolha administrativa legítima de conveniência e oportunidade, mas pode invalidar decisão arbitrária ou desproporcional.

**Momento:** prévio antes da decisão, concomitante durante a execução, posterior após o ato. **Exemplo:** fiscalização durante uma obra pública é controle concomitante; análise posterior das contas é controle posterior.

**Autotutela:** a Administração pode anular atos ilegais e revogar atos válidos por conveniência e oportunidade, observados limites jurídicos e direitos adquiridos (Súmula 473 do STF). A distinção entre ilegalidade e mérito costuma definir o gabarito.
',quiz=quiz || '[{"q":"No âmbito federal, o controle externo é exercido pelo Congresso Nacional com auxílio do Tribunal de Contas da União.","a":true,"why":"Certo. A Constituição, nos arts. 70 e 71, disciplina o controle externo e a atuação auxiliar do TCU. O tribunal possui competências próprias previstas na Constituição."},{"q":"A fiscalização realizada enquanto um contrato administrativo está sendo executado é necessariamente controle posterior.","a":false,"why":"Errado. Fiscalizar durante a execução caracteriza controle concomitante. Posterior é o controle realizado depois da prática ou conclusão do ato examinado."}]'::jsonb,updated_at=now() WHERE slug='administrativo-acervo-controle' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Controle da Administração: mapa de resolução%';
UPDATE study_materials SET body_md=body_md || '
## Casos comparativos para não confundir poderes

**Poder hierárquico:** um chefe distribui tarefas e supervisiona subordinados na estrutura administrativa. Não existe hierarquia entre Poderes independentes apenas por exercerem funções diferentes.

**Poder disciplinar:** uma autoridade apura falta funcional de servidor ou infração de particular submetido a vínculo especial com a Administração, respeitando devido processo. **Poder de polícia:** o órgão competente fiscaliza estabelecimento e, nos limites legais, condiciona atividade privada para proteger interesses coletivos.

**Poder regulamentar:** permite detalhar a execução da lei por atos normativos nos limites constitucionais e legais. Regulamento executivo não pode, como regra, criar obrigação sem fundamento legal.

**Abuso de poder:** excesso de poder ocorre quando o agente ultrapassa sua competência; desvio de finalidade ocorre quando usa competência para finalidade diversa da prevista. **Dica:** pergunte se o erro está no limite da competência ou no objetivo perseguido.
',quiz=quiz || '[{"q":"Quando um agente competente pratica ato para perseguir adversário pessoal, pode haver desvio de finalidade.","a":true,"why":"Certo. O desvio de finalidade ocorre quando a competência é exercida para finalidade distinta da prevista em lei, ainda que a autoridade tenha competência formal."},{"q":"A fiscalização sanitária de um estabelecimento privado é, em regra, exemplo de poder hierárquico.","a":false,"why":"Errado. A fiscalização de atividade privada por razões de interesse coletivo exemplifica poder de polícia. Poder hierárquico organiza relações internas de subordinação administrativa."}]'::jsonb,updated_at=now() WHERE slug='administrativo-acervo-poderes' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Casos comparativos para não confundir poderes%';