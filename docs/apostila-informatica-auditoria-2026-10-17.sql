-- Auditoria dos itens da apostila de informática (apostila_questoes_pendentes), 17/10/2026. Idempotente.
-- Critério: leitura item a item de enunciado e gabarito da apostila contra o conhecimento da matéria e consistência interna. NÃO é conferência com prova oficial (origem não identificada).
begin;
update public.apostila_questoes_pendentes set status='duplicada', note='Repete o item 21 (mesmo enunciado e gabarito).' where apostila='Questões de informática' and numero=22;
update public.apostila_questoes_pendentes set status='duplicada', note='Repete o item 59 (mesmo enunciado e gabarito).' where apostila='Questões de informática' and numero=113;
update public.apostila_questoes_pendentes set status='duplicada', note='Repete o item 99 (mesmo enunciado e gabarito).' where apostila='Questões de informática' and numero=116;
update public.apostila_questoes_pendentes set status='gabarito_conflitante', note='Mesmo enunciado do item 79 com gabarito oposto (Certo x Errado); o enunciado deve ter perdido um trecho na apostila. Conferir com a prova.' where apostila='Questões de informática' and numero=78;
update public.apostila_questoes_pendentes set status='gabarito_conflitante', note='Mesmo enunciado do item 78 com gabarito oposto (Certo x Errado); o enunciado deve ter perdido um trecho na apostila. Conferir com a prova.' where apostila='Questões de informática' and numero=79;
update public.apostila_questoes_pendentes set status='precisa_figura', note='Depende de tabela (imagem) que não está no PDF; alternativas vazias.' where apostila='Questões de informática' and numero=110;
update public.apostila_questoes_pendentes set status='texto_corrompido', note='Enunciado misturado de duas questões; reextrair do PDF.' where apostila='Questões de informática' and numero=166;
update public.apostila_questoes_pendentes set status='texto_corrompido', note='Situação sem a assertiva a ser julgada; reextrair do PDF.' where apostila='Questões de informática' and numero=171;
update public.apostila_questoes_pendentes set status='gabarito_duvidoso', note='Descreve não repúdio (irretratabilidade), não autenticação; o gabarito Certo parece errado.' where apostila='Questões de informática' and numero=26;
update public.apostila_questoes_pendentes set status='gabarito_duvidoso', note='Gabarito Errado discutível: os benefícios descritos são típicos de mecanismos de autenticação.' where apostila='Questões de informática' and numero=38;
update public.apostila_questoes_pendentes set status='gabarito_duvidoso', note='Alternativa C descreve o SSH, não o ssh-keygen (que gera chaves); gabarito discutível.' where apostila='Questões de informática' and numero=86;
update public.apostila_questoes_pendentes set status='gabarito_duvidoso', note='Uma VPN pode existir sem criptografia (só tunelamento); gabarito Errado depende da banca.' where apostila='Questões de informática' and numero=154;
update public.apostila_questoes_pendentes set status='gabarito_duvidoso', note='A definição de extranet está correta; o gabarito Errado parece incorreto.' where apostila='Questões de informática' and numero=174;
update public.apostila_questoes_pendentes set status='gabarito_duvidoso', note='Item IV diz que a velocidade via satélite é ''muito boa''; gabarito D discutível.' where apostila='Questões de informática' and numero=201;
update public.apostila_questoes_pendentes set status='desatualizada', note='Cita o Internet Explorer, descontinuado em 2022.' where apostila='Questões de informática' and numero=82;
update public.apostila_questoes_pendentes set status='desatualizada', note='Cita o Internet Explorer, descontinuado em 2022.' where apostila='Questões de informática' and numero=145;
update public.apostila_questoes_pendentes set status='desatualizada', note='Cita a NBR ISO/IEC 27001:2013, substituída pela edição 2022.' where apostila='Questões de informática' and numero=97;
update public.apostila_questoes_pendentes set status='desatualizada', note='Cita a NBR ISO/IEC 27001:2013, substituída pela edição 2022.' where apostila='Questões de informática' and numero=98;
update public.apostila_questoes_pendentes set status='desatualizada', note='Depende de recursos do Google Grupos, que mudam; sem fonte oficial.' where apostila='Questões de informática' and numero=179;
update public.apostila_questoes_pendentes set alternativas = replace(alternativas::text,' GABARITO','')::jsonb where apostila='Questões de informática' and numero=227;
update public.apostila_questoes_pendentes set status='conceito_coerente', note='Gabarito da apostila coerente com a matéria; origem da prova não identificada e gabarito oficial não conferido.' where apostila='Questões de informática' and status='origem_a_identificar' and numero not in (22,26,38,78,79,82,86,97,98,110,113,116,145,154,166,171,174,179,201);
commit;
