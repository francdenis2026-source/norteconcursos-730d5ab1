-- Cadastro da prova objetiva PM-SP 2026 (Aluno-Soldado PM, banca Vunesp, Edital DP-3/321/26, aplicada em 20/09/2026). Gerado em 2026-10-18.
-- Fontes: caderno 001 (publicado na pagina da Vunesp, PMES2601; copia publica conferida), gabarito DEFINITIVO (Comunicado DP-031/321/26, DOE de 13/10/2026) e edital.
-- O gabarito definitivo traz 4 versoes da prova; o caderno 001 corresponde a Versao 1 (conferido resolvendo as questoes 21 a 30, 34, 35, 52 e 55).
-- Versao 1 (1-60): CDCABDEACBBCADEDBDCEAEACBDAECBDBADEBCACEDEABEDCACBEAADECBDAC
-- Auditoria: itens de matematica, logica e informatica recalculados; CF conferida no texto compilado do Planalto (itens 57 e 58); itens que dependem de figura ou de legislacao estadual de SP ficam em under_review com o motivo no review_note.
-- Destaques em negrito do caderno aparecem entre aspas angulares.
begin;
insert into public.content_sources (source_type,title,issuer,url,status,notes) values
('outro','Prova objetiva PM-SP 2026 - Aluno-Soldado PM, caderno 001 (Vunesp)','Vunesp / PM-SP','https://www.vunesp.com.br/PMES2601','vigente','Caderno de prova objetiva (modelo 001), 60 questões; aplicação em 20/09/2026.'),
('outro','Gabarito definitivo PM-SP 2026 - Aluno-Soldado PM (Comunicado DP-031/321/26)','PM-SP','https://concursos.policiamilitar.sp.gov.br/wp-content/uploads/2026/10/COMUNICADO-No-DP-031_321_26-Gabarito-Definitivo-da-prova-escrita-Edital-3-321-26.pdf','vigente','Gabarito definitivo, 4 versões; o caderno 001 usa a Versão 1.'),
('outro','Edital DP-3/321/26 - Aluno-Soldado PM (PM-SP / Vunesp)','PM-SP / Vunesp','https://concursos.policiamilitar.sp.gov.br/wp-content/uploads/2026/06/PMES2601_306_20260602183524.pdf.pdf','vigente','Edital de abertura, conteúdo programático (Anexo B).')
on conflict (url) do update set checked_at=now(),status=excluded.status,notes=excluded.notes;
insert into public.syllabus_editions (contest_name,role_name,contest_year,exam_board,source_id)
select 'Polícia Militar do Estado de São Paulo','Aluno-Soldado PM',2026,'VUNESP',(select id from public.content_sources where url='https://concursos.policiamilitar.sp.gov.br/wp-content/uploads/2026/06/PMES2601_306_20260602183524.pdf.pdf')
where not exists (select 1 from public.syllabus_editions where contest_name='Polícia Militar do Estado de São Paulo' and role_name='Aluno-Soldado PM' and contest_year=2026);
with edition as (
  select id from public.syllabus_editions where contest_name='Polícia Militar do Estado de São Paulo' and role_name='Aluno-Soldado PM' and contest_year=2026
)
insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
select edition.id,'Prova objetiva',d.discipline,1,d.topic_text,'current'
from edition cross join (values
  ('Língua Portuguesa','Leitura e interpretação de textos literários e não literários; sinônimos e antônimos; sentido próprio e figurado; pontuação; classes de palavras; concordância verbal e nominal; regência verbal e nominal; colocação pronominal; crase.'),
  ('Matemática','Números inteiros e racionais; mínimo múltiplo comum; razão e proporção; porcentagem; regra de três; média aritmética; equações e sistemas do 1º grau; sistema métrico; tabelas e gráficos; noções de geometria; raciocínio lógico; situações-problema.'),
  ('Conhecimentos Gerais','História Geral (Primeira Guerra, nazifascismo e Segunda Guerra, Guerra Fria, globalização); História do Brasil (Era Vargas, Constituições republicanas, período militar, redemocratização); Geografia Geral e do Brasil; Atualidades.'),
  ('Noções Básicas de Informática','MS-Windows 10; MS-Word, Excel e PowerPoint 2016; correio eletrônico; internet; Google Workspace; Microsoft Teams.'),
  ('Noções de Administração Pública','Constituição Federal (direitos e deveres individuais e coletivos, direitos políticos, administração pública, militares dos Estados, segurança pública); Constituição do Estado de São Paulo; Lei 12.527/2011 (LAI) e Decreto estadual 68.155/2023.')
) as d(discipline,topic_text)
on conflict (edition_id,discipline,topic_order) do update set topic_text=excluded.topic_text;
with imported(item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,legal_basis,review_note,tested_topic) as (values
(1,$q$Língua Portuguesa$q$,$q$Para o cronista, a preparação do calulu desencadeou
(A) a sua história adormecida, com resgate de certas tristezas vividas na infância.
(B) a sua resistência às lembranças, com o evidente desconforto para cozinhar.
(C) a sua memória afetiva, com reminiscências da vida pregressa em Benguela.
(D) a sua fragilidade emocional, com saudade e tristeza ao pensar em Benguela.
(E) a sua alegria, por preparar uma comida diferente da sua tradição familiar.$q$,$q$Para o cronista, a preparação do calulu desencadeou
(A) a sua história adormecida, com resgate de certas tristezas vividas na infância.
(B) a sua resistência às lembranças, com o evidente desconforto para cozinhar.
(C) a sua memória afetiva, com reminiscências da vida pregressa em Benguela.
(D) a sua fragilidade emocional, com saudade e tristeza ao pensar em Benguela.
(E) a sua alegria, por preparar uma comida diferente da sua tradição familiar.$q$,'C',3,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave C); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Interpretação de texto: memória afetiva e identidade$q$),
(2,$q$Língua Portuguesa$q$,$q$Em seu relato, o cronista recorre a uma comparação para referir-se a uma ação na passagem:
(A) Começo por refogar metade de uma cebola picada em óleo de palma... (2o parágrafo)
(B) Não sei responder e foi preciso implorarem-me para cozinhar algo... (3o parágrafo)
(C) ... ainda ontem me perguntaram; deve ser por causa do sotaque, ou da falta dele. (1o parágrafo)
(D) ... tal qual um Avillez, manuseando a faca com a mestria de um samurai. (2o parágrafo)
(E) ... há quanto tempo não vais a Angola?, qual foi a última vez que lá foste? (1o parágrafo)$q$,$q$Em seu relato, o cronista recorre a uma comparação para referir-se a uma ação na passagem:
(A) Começo por refogar metade de uma cebola picada em óleo de palma... (2o parágrafo)
(B) Não sei responder e foi preciso implorarem-me para cozinhar algo... (3o parágrafo)
(C) ... ainda ontem me perguntaram; deve ser por causa do sotaque, ou da falta dele. (1o parágrafo)
(D) ... tal qual um Avillez, manuseando a faca com a mestria de um samurai. (2o parágrafo)
(E) ... há quanto tempo não vais a Angola?, qual foi a última vez que lá foste? (1o parágrafo)$q$,'D',3,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave D); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Figuras de linguagem: comparação$q$),
(3,$q$Língua Portuguesa$q$,$q$Na passagem “... «encerrando» em si histórias de refeições «memoráveis» que duravam tardes inteiras.” (2o parágrafo), os termos destacados significam, correta e respectivamente:
(A) agregando; fictícias.
(B) fechando; bem-humoradas.
(C) contendo; inesquecíveis.
(D) terminando; melancólicas.
(E) desvirtuando; saudosas.$q$,$q$Na passagem “... «encerrando» em si histórias de refeições «memoráveis» que duravam tardes inteiras.” (2o parágrafo), os termos destacados significam, correta e respectivamente:
(A) agregando; fictícias.
(B) fechando; bem-humoradas.
(C) contendo; inesquecíveis.
(D) terminando; melancólicas.
(E) desvirtuando; saudosas.$q$,'C',3,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave C); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Significação de palavras no contexto$q$),
(4,$q$Língua Portuguesa$q$,$q$Assinale a alternativa em que o termo destacado está empregado em sentido figurado.
(A) ... já consigo «viajar» até Benguela. (3o parágrafo)
(B) ... há quanto tempo não vais a «Angola»? (1o parágrafo)
(C) A «receita» nunca me foi ensinada... (2o parágrafo)
(D) Tenho o «tacho» de boca larga... (2o parágrafo)
(E) ... deve ser por causa do «sotaque», ou da falta dele. (1o parágrafo)$q$,$q$Assinale a alternativa em que o termo destacado está empregado em sentido figurado.
(A) ... já consigo «viajar» até Benguela. (3o parágrafo)
(B) ... há quanto tempo não vais a «Angola»? (1o parágrafo)
(C) A «receita» nunca me foi ensinada... (2o parágrafo)
(D) Tenho o «tacho» de boca larga... (2o parágrafo)
(E) ... deve ser por causa do «sotaque», ou da falta dele. (1o parágrafo)$q$,'A',3,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave A); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Sentido figurado$q$),
(5,$q$Língua Portuguesa$q$,$q$Considere as passagens: • A minha cultura! (1o parágrafo) • ... me trazem lugares, rostos, conversas que julgava perdidas. (3o parágrafo) O cronista recorre ao emprego do sinal de exclamação e ao emprego das vírgulas, correta e respectivamente, para
(A) questionar a própria cultura; fazer uma exemplificação.
(B) exaltar a cultura benguelense; fazer uma enumeração.
(C) indicar que busca uma nova cultura; fazer uma ressalva.
(D) ironizar a cultura benguelense; fazer uma explicação.
(E) mostrar-se distante da cultura de origem; fazer uma correção.$q$,$q$Considere as passagens: • A minha cultura! (1o parágrafo) • ... me trazem lugares, rostos, conversas que julgava perdidas. (3o parágrafo) O cronista recorre ao emprego do sinal de exclamação e ao emprego das vírgulas, correta e respectivamente, para
(A) questionar a própria cultura; fazer uma exemplificação.
(B) exaltar a cultura benguelense; fazer uma enumeração.
(C) indicar que busca uma nova cultura; fazer uma ressalva.
(D) ironizar a cultura benguelense; fazer uma explicação.
(E) mostrar-se distante da cultura de origem; fazer uma correção.$q$,'B',3,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave B); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Pontuação: exclamação e vírgulas$q$),
(6,$q$Língua Portuguesa$q$,$q$Sem prejuízo ao sentido do texto e em conformidade com a norma-padrão, na passagem “Afinal, de que sou feito?, «ainda ontem me perguntaram»; deve ser «por causa do» sotaque, ou «da» falta dele. Pode vos parecer disparatado e absurdo, «mas» a verdade é que me questionam várias vezes sobre a minha angolanidade...” (1o parágrafo), as expressões destacadas podem ser substituídas, respectivamente, por:
(A) perguntaram-me ainda ontem; pelo; pela; pois.
(B) me perguntaram ainda ontem; devido ao; a; porque.
(C) perguntaram-me ainda ontem; pelo; pela; segundo.
(D) perguntaram-me ainda ontem; devido ao; à; porém.
(E) me perguntaram ainda ontem; devido o; à; portanto.$q$,$q$Sem prejuízo ao sentido do texto e em conformidade com a norma-padrão, na passagem “Afinal, de que sou feito?, «ainda ontem me perguntaram»; deve ser «por causa do» sotaque, ou «da» falta dele. Pode vos parecer disparatado e absurdo, «mas» a verdade é que me questionam várias vezes sobre a minha angolanidade...” (1o parágrafo), as expressões destacadas podem ser substituídas, respectivamente, por:
(A) perguntaram-me ainda ontem; pelo; pela; pois.
(B) me perguntaram ainda ontem; devido ao; a; porque.
(C) perguntaram-me ainda ontem; pelo; pela; segundo.
(D) perguntaram-me ainda ontem; devido ao; à; porém.
(E) me perguntaram ainda ontem; devido o; à; portanto.$q$,'D',4,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave D); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Reescrita: colocação pronominal, locuções e conjunções$q$),
(7,$q$Língua Portuguesa$q$,$q$Considere as passagens: • ... a verdade é que me questionam várias vezes «sobre» a minha angolanidade: há quanto tempo não vais «a» Angola? (1o parágrafo) • ... comparando com aquelas velhas panelas pretas, calcinadas «de» tanto irem ao fogo... (2o parágrafo) • ... receitas familiares que agora, tal como um álbum «de» fotografias, me trazem lugares, rostos, conversas que julgava perdidas. (3o parágrafo) No contexto em que estão empregadas, as preposições destacadas expressam, correta e respectivamente, sentidos de:
(A) finalidade, origem, causa e modo.
(B) posição, meio, consequência e assunto.
(C) matéria, lugar, consequência e meio.
(D) lugar, origem, consequência e lugar.
(E) assunto, lugar, causa e especificação.$q$,$q$Considere as passagens: • ... a verdade é que me questionam várias vezes «sobre» a minha angolanidade: há quanto tempo não vais «a» Angola? (1o parágrafo) • ... comparando com aquelas velhas panelas pretas, calcinadas «de» tanto irem ao fogo... (2o parágrafo) • ... receitas familiares que agora, tal como um álbum «de» fotografias, me trazem lugares, rostos, conversas que julgava perdidas. (3o parágrafo) No contexto em que estão empregadas, as preposições destacadas expressam, correta e respectivamente, sentidos de:
(A) finalidade, origem, causa e modo.
(B) posição, meio, consequência e assunto.
(C) matéria, lugar, consequência e meio.
(D) lugar, origem, consequência e lugar.
(E) assunto, lugar, causa e especificação.$q$,'E',4,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave E); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Preposições: sentidos$q$),
(8,$q$Língua Portuguesa$q$,$q$O uso do acento indicativo da crase está em conformidade com a norma-padrão em:
(A) Sem sair do lugar, regressei à cidade de Benguela, através da cozinha.
(B) Começo à preparar o calulu refogando metade de uma cebola picada.
(C) Em relação à minhas velhas panelas pretas, meu tacho é bem reluzente.
(D) Pergunto-me como consigo ficar tão longe, eu que nem sinto à saudade.
(E) Não sabia responder direito à ninguém, até implorarem um prato angolano.$q$,$q$O uso do acento indicativo da crase está em conformidade com a norma-padrão em:
(A) Sem sair do lugar, regressei à cidade de Benguela, através da cozinha.
(B) Começo à preparar o calulu refogando metade de uma cebola picada.
(C) Em relação à minhas velhas panelas pretas, meu tacho é bem reluzente.
(D) Pergunto-me como consigo ficar tão longe, eu que nem sinto à saudade.
(E) Não sabia responder direito à ninguém, até implorarem um prato angolano.$q$,'A',4,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave A); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Crase$q$),
(9,$q$Língua Portuguesa$q$,$q$O efeito de humor da tira decorre do fato de
(A) o menino vivenciar na cena final exatamente o que ele já havia previsto que aconteceria.
(B) Haroldo consentir aos propósitos do menino, já que a tecnologia deste estava obsoleta.
(C) Haroldo não reconhecer a superioridade do menino e surpreendê-lo ao furar o balão.
(D) os dois amigos concordarem com a ideia de que entre eles ninguém tem mais poder.
(E) o menino declarar a sua superioridade, e Haroldo não entender o que ele queria dizer.$q$,$q$O efeito de humor da tira decorre do fato de
(A) o menino vivenciar na cena final exatamente o que ele já havia previsto que aconteceria.
(B) Haroldo consentir aos propósitos do menino, já que a tecnologia deste estava obsoleta.
(C) Haroldo não reconhecer a superioridade do menino e surpreendê-lo ao furar o balão.
(D) os dois amigos concordarem com a ideia de que entre eles ninguém tem mais poder.
(E) o menino declarar a sua superioridade, e Haroldo não entender o que ele queria dizer.$q$,'C',4,'under_review',false,true,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave C). Mantida em revisão: A questão depende de figura que não consta do caderno em texto (tira).$q$,$q$Interpretação de tira: efeito de humor$q$),
(10,$q$Língua Portuguesa$q$,$q$De acordo com a norma-padrão, as lacunas do 3o quadrinho devem ser preenchidas, respectivamente, com:
(A) esse ... furar-na
(B) este ... o seu balão
(C) aquele ... este balão
(D) esse ... furar ela
(E) este... furar-lhe$q$,$q$De acordo com a norma-padrão, as lacunas do 3o quadrinho devem ser preenchidas, respectivamente, com:
(A) esse ... furar-na
(B) este ... o seu balão
(C) aquele ... este balão
(D) esse ... furar ela
(E) este... furar-lhe$q$,'B',4,'under_review',false,true,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave B). Mantida em revisão: A questão depende de figura que não consta do caderno em texto (tira).$q$,$q$Pronomes demonstrativos e colocação pronominal em tira$q$),
(11,$q$Língua Portuguesa$q$,$q$As informações do texto permitem concluir corretamente que a Copa do Mundo
(A) incentiva a competitividade entre as diferentes nações, minando a oportunidade de que os povos se tratem com respeito, diálogo e paz.
(B) promove a aproximação entre diversos povos ao redor do planeta, apesar do espírito de competição e a despeito de disputas políticas.
(C) permite às pessoas de diferentes nacionalidades torcerem para times rivais, o que desencadeia crises diplomáticas entre os países.
(D) enaltece as diferenças culturais existentes ao redor do mundo, retificando a ideia de que as rivalidades são uma metáfora do mundo possível.
(E) globaliza a atenção das pessoas ao esporte alheia à atenção às emoções básicas, como alegria, frustração, esperança e orgulho.$q$,$q$As informações do texto permitem concluir corretamente que a Copa do Mundo
(A) incentiva a competitividade entre as diferentes nações, minando a oportunidade de que os povos se tratem com respeito, diálogo e paz.
(B) promove a aproximação entre diversos povos ao redor do planeta, apesar do espírito de competição e a despeito de disputas políticas.
(C) permite às pessoas de diferentes nacionalidades torcerem para times rivais, o que desencadeia crises diplomáticas entre os países.
(D) enaltece as diferenças culturais existentes ao redor do mundo, retificando a ideia de que as rivalidades são uma metáfora do mundo possível.
(E) globaliza a atenção das pessoas ao esporte alheia à atenção às emoções básicas, como alegria, frustração, esperança e orgulho.$q$,'B',5,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave B); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Interpretação de texto: Copa do Mundo e aproximação entre povos$q$),
(12,$q$Língua Portuguesa$q$,$q$No editorial, fica explícita a ideia de que
(A) a convivência solidária retira a essência do espetáculo que é o futebol.
(B) a intolerância no mundo vem amenizando graças ao domínio do futebol.
(C) o mundo está vivendo uma série de dissensões de naturezas diversas.
(D) os confrontos culturais vêm se impondo como maior problema do planeta.
(E) as rivalidades no campo acentuam as divergências existentes fora dele.$q$,$q$No editorial, fica explícita a ideia de que
(A) a convivência solidária retira a essência do espetáculo que é o futebol.
(B) a intolerância no mundo vem amenizando graças ao domínio do futebol.
(C) o mundo está vivendo uma série de dissensões de naturezas diversas.
(D) os confrontos culturais vêm se impondo como maior problema do planeta.
(E) as rivalidades no campo acentuam as divergências existentes fora dele.$q$,'C',5,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave C); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Ideia explícita no editorial$q$),
(13,$q$Língua Portuguesa$q$,$q$Assinale a alternativa em que a reescrita de passagem do texto afirma o contrário da versão original.
(A) ... a Copa do Mundo é feita de disputas intensas, vitórias inesquecíveis e derrotas dolorosas. (3o parágrafo) → ... a Copa do Mundo é isenta de disputas intensas, vitórias inesquecíveis e derrotas dolorosas.
(B) A Copa do Mundo é muito mais do que uma competição esportiva. (1o parágrafo) → A Copa do Mundo vai além de uma mera competição esportiva.
(C) ... a competição oferece uma rara oportunidade de encontro simbólico entre as nações. (1o parágrafo) → ... a competição oferece uma oportunidade incomum de encontro simbólico entre as nações.
(D) O futebol possui uma força especial porque combina simplicidade e emoção. (2o parágrafo) → O futebol possui uma força especial porque implica simplicidade com emoção.
(E) ... é possível competir sem destruir, defender a própria história sem negar a humanidade do adversário. (4o parágrafo) →... é possível rivalizar sem destruir, defender a própria história reconhecendo a humanidade do adversário.$q$,$q$Assinale a alternativa em que a reescrita de passagem do texto afirma o contrário da versão original.
(A) ... a Copa do Mundo é feita de disputas intensas, vitórias inesquecíveis e derrotas dolorosas. (3o parágrafo) → ... a Copa do Mundo é isenta de disputas intensas, vitórias inesquecíveis e derrotas dolorosas.
(B) A Copa do Mundo é muito mais do que uma competição esportiva. (1o parágrafo) → A Copa do Mundo vai além de uma mera competição esportiva.
(C) ... a competição oferece uma rara oportunidade de encontro simbólico entre as nações. (1o parágrafo) → ... a competição oferece uma oportunidade incomum de encontro simbólico entre as nações.
(D) O futebol possui uma força especial porque combina simplicidade e emoção. (2o parágrafo) → O futebol possui uma força especial porque implica simplicidade com emoção.
(E) ... é possível competir sem destruir, defender a própria história sem negar a humanidade do adversário. (4o parágrafo) →... é possível rivalizar sem destruir, defender a própria história reconhecendo a humanidade do adversário.$q$,'A',6,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave A); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Reescrita com sentido contrário$q$),
(14,$q$Língua Portuguesa$q$,$q$Sem prejuízo ao sentido original e em conformidade com a norma-padrão, na passagem “Suas regras básicas permitem que crianças, trabalhadores, estudantes e idosos acompanhem o jogo com a mesma intensidade, «ainda» «que vivam» em realidades «muito» distintas.” (2o parágrafo), as expressões destacadas podem ser substituídas, respectivamente, por:
(A) dado que vivem; bastantes.
(B) mesmo vivendo; minimamente.
(C) conforme vivessem; bem.
(D) apesar de viverem; grandemente.
(E) embora vivem; demais.$q$,$q$Sem prejuízo ao sentido original e em conformidade com a norma-padrão, na passagem “Suas regras básicas permitem que crianças, trabalhadores, estudantes e idosos acompanhem o jogo com a mesma intensidade, «ainda» «que vivam» em realidades «muito» distintas.” (2o parágrafo), as expressões destacadas podem ser substituídas, respectivamente, por:
(A) dado que vivem; bastantes.
(B) mesmo vivendo; minimamente.
(C) conforme vivessem; bem.
(D) apesar de viverem; grandemente.
(E) embora vivem; demais.$q$,'D',6,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave D); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Reescrita: conjunção concessiva e advérbios$q$),
(15,$q$Língua Portuguesa$q$,$q$A passagem “... o futebol recorda que o outro não é apenas rival, estrangeiro ou desconhecido...” (5o parágrafo) está reescrita em conformidade com a norma-padrão e sem prejuízo ao sentido original em:
(A) ... o futebol faz as pessoas esquecerem de que o outro não é apenas rival, estrangeiro ou desconhecido...
(B) ... o futebol não faz as pessoas lembrarem-se que o outro não é apenas rival, estrangeiro ou desconhecido...
(C) ... o futebol não deixa as pessoas esquecerem de que o outro não é apenas rival, estrangeiro ou desconhecido...
(D) ... o futebol faz as pessoas esquecerem-se que o outro não é apenas rival, estrangeiro ou desconhecido...
(E) ... o futebol faz as pessoas lembrarem-se de que o outro não é apenas rival, estrangeiro ou desconhecido...$q$,$q$A passagem “... o futebol recorda que o outro não é apenas rival, estrangeiro ou desconhecido...” (5o parágrafo) está reescrita em conformidade com a norma-padrão e sem prejuízo ao sentido original em:
(A) ... o futebol faz as pessoas esquecerem de que o outro não é apenas rival, estrangeiro ou desconhecido...
(B) ... o futebol não faz as pessoas lembrarem-se que o outro não é apenas rival, estrangeiro ou desconhecido...
(C) ... o futebol não deixa as pessoas esquecerem de que o outro não é apenas rival, estrangeiro ou desconhecido...
(D) ... o futebol faz as pessoas esquecerem-se que o outro não é apenas rival, estrangeiro ou desconhecido...
(E) ... o futebol faz as pessoas lembrarem-se de que o outro não é apenas rival, estrangeiro ou desconhecido...$q$,'E',6,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave E); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Regência de lembrar/esquecer e reescrita$q$),
(16,$q$Língua Portuguesa$q$,$q$Assinale a alternativa em que a forma verbal destacada flexiona no Presente do Indicativo do mesmo modo que a destacada em “Seleções se enfrentam segundo regras aceitas por todos, árbitros «medeiam» conflitos...” (4o parágrafo).
(A) As equipes em jogo «deverão» valorizar a posse de bola.
(B) «Elogiariam» alguns jogadores, se soubessem seus nomes.
(C) Terminada a Copa, as pessoas «avaliarão» como foi o evento.
(D) Os telespectadores «ansiavam» pelo início da Copa do Mundo.
(E) No telão do estádio, «anunciavam» a substituição do jogador.$q$,$q$Assinale a alternativa em que a forma verbal destacada flexiona no Presente do Indicativo do mesmo modo que a destacada em “Seleções se enfrentam segundo regras aceitas por todos, árbitros «medeiam» conflitos...” (4o parágrafo).
(A) As equipes em jogo «deverão» valorizar a posse de bola.
(B) «Elogiariam» alguns jogadores, se soubessem seus nomes.
(C) Terminada a Copa, as pessoas «avaliarão» como foi o evento.
(D) Os telespectadores «ansiavam» pelo início da Copa do Mundo.
(E) No telão do estádio, «anunciavam» a substituição do jogador.$q$,'D',6,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave D); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Flexão verbal: presente do indicativo$q$),
(17,$q$Língua Portuguesa$q$,$q$Nos versos lidos, constata-se que o eu lírico
(A) prefere observar o céu a amar Marília.
(B) exalta a beleza física da mulher amada.
(C) tece elogios à sua amada já morta.
(D) reclama à pastora pela desatenção a ele.
(E) recusa receber amor da gentil pastora.$q$,$q$Nos versos lidos, constata-se que o eu lírico
(A) prefere observar o céu a amar Marília.
(B) exalta a beleza física da mulher amada.
(C) tece elogios à sua amada já morta.
(D) reclama à pastora pela desatenção a ele.
(E) recusa receber amor da gentil pastora.$q$,'B',7,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave B); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Interpretação de poema: exaltação da amada$q$),
(18,$q$Língua Portuguesa$q$,$q$A leitura da primeira estrofe permite concluir corretamente que o eu lírico
(A) acredita ser pouco o que possui para que a gentil pastora Marília decida viver ao seu lado pela vida toda.
(B) abdicou de seu rebanho e de seu trono para poder ir em busca do amor verdadeiro da amada Marília.
(C) ficou tão feliz por receber um agrado de Marília que decidiu ofertar a ela tudo o que já tinha conquistado.
(D) reconhece o sentimento de amor de Marília como algo mais importante que a posse de bens materiais.
(E) deixou de ser feliz quando constatou que Marília estava de fato interessada nos seus bens e não no seu amor.$q$,$q$A leitura da primeira estrofe permite concluir corretamente que o eu lírico
(A) acredita ser pouco o que possui para que a gentil pastora Marília decida viver ao seu lado pela vida toda.
(B) abdicou de seu rebanho e de seu trono para poder ir em busca do amor verdadeiro da amada Marília.
(C) ficou tão feliz por receber um agrado de Marília que decidiu ofertar a ela tudo o que já tinha conquistado.
(D) reconhece o sentimento de amor de Marília como algo mais importante que a posse de bens materiais.
(E) deixou de ser feliz quando constatou que Marília estava de fato interessada nos seus bens e não no seu amor.$q$,'D',7,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave D); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Interpretação de poema: valor do afeto$q$),
(19,$q$Língua Portuguesa$q$,$q$Nos versos “Papoila ou rosa delicada e fina / Te «cobre» as faces, que são cor da neve.”, a forma verbal destacada deveria, obrigatoriamente, ser flexionada no plural se
(A) a expressão “cor da neve” antecedesse ao verbo “cobrir”.
(B) o substantivo “cor” fosse substituído por “cores”.
(C) a conjunção “ou” fosse substituída por “e”.
(D) a conjunção “e” fosse substituída por vírgula.
(E) a expressão “as faces” antecedesse o verbo “cobrir”.$q$,$q$Nos versos “Papoila ou rosa delicada e fina / Te «cobre» as faces, que são cor da neve.”, a forma verbal destacada deveria, obrigatoriamente, ser flexionada no plural se
(A) a expressão “cor da neve” antecedesse ao verbo “cobrir”.
(B) o substantivo “cor” fosse substituído por “cores”.
(C) a conjunção “ou” fosse substituída por “e”.
(D) a conjunção “e” fosse substituída por vírgula.
(E) a expressão “as faces” antecedesse o verbo “cobrir”.$q$,'C',7,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave C); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Concordância verbal com sujeito composto$q$),
(20,$q$Língua Portuguesa$q$,$q$Assinale a alternativa que apresenta informações de acordo com a norma-padrão e coerentes com a descrição feita de Marília pelo eu lírico.
(A) Marília, cuja a pele é macia, tem cútis brancos e cabelos escuros.
(B) Marília, que a pele é macia, tem cútis brancas e cabelos escuros.
(C) Marília, cuja a pele exala aroma suave, tem olhos e cútis brancas.
(D) Marília, cuja pele é bronzeada, tem olhos claro e cabelos louros.
(E) Marília, cuja pele é perfumada, tem cútis branca e cabelos louros.$q$,$q$Assinale a alternativa que apresenta informações de acordo com a norma-padrão e coerentes com a descrição feita de Marília pelo eu lírico.
(A) Marília, cuja a pele é macia, tem cútis brancos e cabelos escuros.
(B) Marília, que a pele é macia, tem cútis brancas e cabelos escuros.
(C) Marília, cuja a pele exala aroma suave, tem olhos e cútis brancas.
(D) Marília, cuja pele é bronzeada, tem olhos claro e cabelos louros.
(E) Marília, cuja pele é perfumada, tem cútis branca e cabelos louros.$q$,'E',7,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave E); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Pronome relativo "cuja" e concordância nominal$q$),
(21,$q$Matemática$q$,$q$O saldo da conta bancária de Gilberto era R$ 0,00 em 30 de março de 2026. Esse saldo foi modificado de acordo com as movimentações descritas a seguir: 1) Em 01.04.26, houve um depósito de R$ 1.800,00 a título de pagamento de salário, valor que corresponde a 2/3 do que Gilberto recebe mensalmente. 2) Em 02.04.26, Gilberto utilizou 3/10 do que havia na conta para pagar a mensalidade do financiamento de sua casa. 3) Em 15.04.26, houve o depósito da quantia restante que Gilberto recebe mensalmente como salário. 4) Em 16.04.26, Gilberto usou 3/5 do saldo da conta para pagar o cartão de crédito. O saldo da conta bancária de Gilberto, após essas movimentações, é um valor entre
(A) R$ 800,00 e R$ 900,00.
(B) R$ 400,00 e R$ 500,00.
(C) R$ 700,00 e R$ 800,00.
(D) R$ 600,00 e R$ 700,00.
(E) R$ 500,00 e R$ 600,00.$q$,$q$O saldo da conta bancária de Gilberto era R$ 0,00 em 30 de março de 2026. Esse saldo foi modificado de acordo com as movimentações descritas a seguir: 1) Em 01.04.26, houve um depósito de R$ 1.800,00 a título de pagamento de salário, valor que corresponde a 2/3 do que Gilberto recebe mensalmente. 2) Em 02.04.26, Gilberto utilizou 3/10 do que havia na conta para pagar a mensalidade do financiamento de sua casa. 3) Em 15.04.26, houve o depósito da quantia restante que Gilberto recebe mensalmente como salário. 4) Em 16.04.26, Gilberto usou 3/5 do saldo da conta para pagar o cartão de crédito. O saldo da conta bancária de Gilberto, após essas movimentações, é um valor entre
(A) R$ 800,00 e R$ 900,00.
(B) R$ 400,00 e R$ 500,00.
(C) R$ 700,00 e R$ 800,00.
(D) R$ 600,00 e R$ 700,00.
(E) R$ 500,00 e R$ 600,00.$q$,'A',8,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave A); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Frações e operações com saldo bancário$q$),
(22,$q$Matemática$q$,$q$Uma tia de Luciana a visita invariavelmente a cada 12 dias e sua sogra a visita, também invariavelmente, a cada 9 dias. No dia 1o de janeiro de 2026, tanto a tia de Luciana como a sua sogra a visitaram. A 5a vez, nesse ano, que a tia e a sogra de Luciana a visitaram no mesmo dia aconteceu
(A) na 2a quinzena de junho.
(B) na 1a quinzena de maio.
(C) na 1a quinzena de junho.
(D) na 2a quinzena de abril.
(E) na 2a quinzena de maio.$q$,$q$Uma tia de Luciana a visita invariavelmente a cada 12 dias e sua sogra a visita, também invariavelmente, a cada 9 dias. No dia 1o de janeiro de 2026, tanto a tia de Luciana como a sua sogra a visitaram. A 5a vez, nesse ano, que a tia e a sogra de Luciana a visitaram no mesmo dia aconteceu
(A) na 2a quinzena de junho.
(B) na 1a quinzena de maio.
(C) na 1a quinzena de junho.
(D) na 2a quinzena de abril.
(E) na 2a quinzena de maio.$q$,'E',8,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave E); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Mínimo múltiplo comum: calendário$q$),
(23,$q$Matemática$q$,$q$A razão entre o número de competidores do grupo A e o número de competidores do grupo B é 5/4. Essa razão, 5/4, também ocorre entre o número de competidores do grupo B e o número de competidores do grupo C e ocorre também entre o número de competidores do grupo C e o número de competidores do grupo D. São 128 os competidores do grupo D e, sendo assim, o número total de competidores desses quatro grupos é
(A) 738.
(B) 608.
(C) 610.
(D) 642.
(E) 746.$q$,$q$A razão entre o número de competidores do grupo A e o número de competidores do grupo B é 5/4. Essa razão, 5/4, também ocorre entre o número de competidores do grupo B e o número de competidores do grupo C e ocorre também entre o número de competidores do grupo C e o número de competidores do grupo D. São 128 os competidores do grupo D e, sendo assim, o número total de competidores desses quatro grupos é
(A) 738.
(B) 608.
(C) 610.
(D) 642.
(E) 746.$q$,'A',8,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave A); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Razão e proporção: grupos de competidores$q$),
(24,$q$Matemática$q$,$q$Uma loja de revenda de automóveis oferece um veículo com um desconto de R$ 18.000,00, desconto que equivale a 12% do preço original, se o pagamento for à vista. Se o veículo for pago em 3 parcelas iguais, a loja oferece um desconto de 5% sobre o preço original. A pessoa que comprar esse veículo, no plano de 3 parcelas iguais, pagará em cada parcela o valor de
(A) R$ 45.000,00.
(B) R$ 42.500,00.
(C) R$ 47.500,00.
(D) R$ 50.000,00.
(E) R$ 52.500,00.$q$,$q$Uma loja de revenda de automóveis oferece um veículo com um desconto de R$ 18.000,00, desconto que equivale a 12% do preço original, se o pagamento for à vista. Se o veículo for pago em 3 parcelas iguais, a loja oferece um desconto de 5% sobre o preço original. A pessoa que comprar esse veículo, no plano de 3 parcelas iguais, pagará em cada parcela o valor de
(A) R$ 45.000,00.
(B) R$ 42.500,00.
(C) R$ 47.500,00.
(D) R$ 50.000,00.
(E) R$ 52.500,00.$q$,'C',9,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave C); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Porcentagem: desconto sobre preço original$q$),
(25,$q$Matemática$q$,$q$Em uma fábrica de camisas, 3 funcionários qualificados já empacotaram 2.400 camisas de certo pedido. Para finalizar o pedido, outros 4 funcionários foram chamados para se juntarem aos 3 que tinham iniciado o serviço. Dentre esses 4 novos funcionários chamados, 3 também são funcionários qualificados e um deles é um aprendiz. Sabe-se que um funcionário qualificado empacota o mesmo número de camisas em um tempo determinado e o funcionário aprendiz empacota, nesse mesmo tempo, a metade desse número. Para finalizar o pedido, esses 7 funcionários trabalharam pelo mesmo tempo que os 3 primeiros trabalharam inicialmente. Nessa etapa de finalização, os 7 funcionários empacotaram um número de camisas igual a
(A) 5.230.
(B) 5.200.
(C) 5.220.
(D) 5.180.
(E) 5.250.$q$,$q$Em uma fábrica de camisas, 3 funcionários qualificados já empacotaram 2.400 camisas de certo pedido. Para finalizar o pedido, outros 4 funcionários foram chamados para se juntarem aos 3 que tinham iniciado o serviço. Dentre esses 4 novos funcionários chamados, 3 também são funcionários qualificados e um deles é um aprendiz. Sabe-se que um funcionário qualificado empacota o mesmo número de camisas em um tempo determinado e o funcionário aprendiz empacota, nesse mesmo tempo, a metade desse número. Para finalizar o pedido, esses 7 funcionários trabalharam pelo mesmo tempo que os 3 primeiros trabalharam inicialmente. Nessa etapa de finalização, os 7 funcionários empacotaram um número de camisas igual a
(A) 5.230.
(B) 5.200.
(C) 5.220.
(D) 5.180.
(E) 5.250.$q$,'B',9,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave B); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Regra de três composta: produtividade de funcionários$q$),
(26,$q$Matemática$q$,$q$Em 1990, o casal Nereu e Dilma tinha, respectivamente, 23 e 21 anos de idade. Em 1995, esse casal já possuía um filho com 3 anos de idade. Passados alguns anos, em 2003, além do casal e do filho, a família tinha mais um componente, uma filha, que nesse ano já tinha 7 anos de idade. A média aritmética simples das idades dos quatro membros da família em 2003 excede a média aritmética simples das idades dos três membros da família em 1995 em
(A) 1 ano.
(B) 2 anos.
(C) 4 anos.
(D) 3 anos.
(E) 0 anos.$q$,$q$Em 1990, o casal Nereu e Dilma tinha, respectivamente, 23 e 21 anos de idade. Em 1995, esse casal já possuía um filho com 3 anos de idade. Passados alguns anos, em 2003, além do casal e do filho, a família tinha mais um componente, uma filha, que nesse ano já tinha 7 anos de idade. A média aritmética simples das idades dos quatro membros da família em 2003 excede a média aritmética simples das idades dos três membros da família em 1995 em
(A) 1 ano.
(B) 2 anos.
(C) 4 anos.
(D) 3 anos.
(E) 0 anos.$q$,'D',9,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave D); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Média aritmética de idades$q$),
(27,$q$Matemática$q$,$q$Uma loja cobra um valor fixo de R$ 1.500,00 para a locação de uma van de turismo, acrescido de R$ 4,50 por quilômetro rodado. Um grupo alugou essa van e pagou pela locação R$ 2.332,50. O número de quilômetros rodados nessa locação é um número entre
(A) 182 e 186.
(B) 186 e 190.
(C) 178 e 182.
(D) 174 e 178.
(E) 170 e 174.$q$,$q$Uma loja cobra um valor fixo de R$ 1.500,00 para a locação de uma van de turismo, acrescido de R$ 4,50 por quilômetro rodado. Um grupo alugou essa van e pagou pela locação R$ 2.332,50. O número de quilômetros rodados nessa locação é um número entre
(A) 182 e 186.
(B) 186 e 190.
(C) 178 e 182.
(D) 174 e 178.
(E) 170 e 174.$q$,'A',10,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave A); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Equação do 1º grau: aluguel com valor fixo e variável$q$),
(28,$q$Matemática$q$,$q$Em uma mesma padaria, Fabiana comprou 2 empadas e 1 brigadeiro e pagou por eles R$ 31,00; Gilda comprou 3 empadas e 5 brigadeiros e pagou ao todo R$ 71,00; e Haroldo comprou 4 empadas e 16 brigadeiros e pagou por eles a quantia de
(A) R$ 158,00.
(B) R$ 151,00.
(C) R$ 155,00.
(D) R$ 149,00.
(E) R$ 160,00.$q$,$q$Em uma mesma padaria, Fabiana comprou 2 empadas e 1 brigadeiro e pagou por eles R$ 31,00; Gilda comprou 3 empadas e 5 brigadeiros e pagou ao todo R$ 71,00; e Haroldo comprou 4 empadas e 16 brigadeiros e pagou por eles a quantia de
(A) R$ 158,00.
(B) R$ 151,00.
(C) R$ 155,00.
(D) R$ 149,00.
(E) R$ 160,00.$q$,'E',10,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave E); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Sistema de equações do 1º grau: preços$q$),
(29,$q$Matemática$q$,$q$A duração de três partidas de tênis foram, respectivamente, 1 hora e 54 minutos, 2 horas e 32 minutos e 4 horas e 7 minutos. A partida mais longa superou a média aritmética simples dos tempos de duração das outras duas partidas em
(A) 1h 35min.
(B) 1h 47min.
(C) 1h 54min.
(D) 1h 13min.
(E) 1h 28min.$q$,$q$A duração de três partidas de tênis foram, respectivamente, 1 hora e 54 minutos, 2 horas e 32 minutos e 4 horas e 7 minutos. A partida mais longa superou a média aritmética simples dos tempos de duração das outras duas partidas em
(A) 1h 35min.
(B) 1h 47min.
(C) 1h 54min.
(D) 1h 13min.
(E) 1h 28min.$q$,'C',10,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave C); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Média aritmética e medidas de tempo$q$),
(30,$q$Matemática$q$,$q$Em um vasilhame cuja capacidade é de 3,2 L foram colocados meio litro de água comum, 350 mL de suco de laranja e ainda 1.250 mL de água gaseificada. A capacidade desse vasilhame não ocupada por essa mistura é igual a
(A) 10% menos do que um litro.
(B) 10% a mais do que um litro.
(C) 20% a mais do que um litro.
(D) exatamente um litro.
(E) 20% menos do que um litro.$q$,$q$Em um vasilhame cuja capacidade é de 3,2 L foram colocados meio litro de água comum, 350 mL de suco de laranja e ainda 1.250 mL de água gaseificada. A capacidade desse vasilhame não ocupada por essa mistura é igual a
(A) 10% menos do que um litro.
(B) 10% a mais do que um litro.
(C) 20% a mais do que um litro.
(D) exatamente um litro.
(E) 20% menos do que um litro.$q$,'B',10,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave B); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Medidas de capacidade e porcentagem$q$),
(31,$q$Matemática$q$,$q$A tabela a seguir mostra o número de veículos vendidos pelo vendedor Cristiano nos primeiros seis meses de 2026: «VENDAS MENSAIS DO CRISTIANO» «Meses» «Números de veículos» Janeiro Fevereiro Março Abril Maio Junho O gráfico de colunas que indica o número de vendas acumuladas, mês a mês, realizadas pelo vendedor Cristiano no primeiro semestre de 2026 é: (A) (B) (C) (D) (E)
(A) [alternativa em figura]
(B) [alternativa em figura]
(C) [alternativa em figura]
(D) [alternativa em figura]
(E) [alternativa em figura]$q$,$q$A tabela a seguir mostra o número de veículos vendidos pelo vendedor Cristiano nos primeiros seis meses de 2026: «VENDAS MENSAIS DO CRISTIANO» «Meses» «Números de veículos» Janeiro Fevereiro Março Abril Maio Junho O gráfico de colunas que indica o número de vendas acumuladas, mês a mês, realizadas pelo vendedor Cristiano no primeiro semestre de 2026 é: (A) (B) (C) (D) (E)
(A) [alternativa em figura]
(B) [alternativa em figura]
(C) [alternativa em figura]
(D) [alternativa em figura]
(E) [alternativa em figura]$q$,'D',11,'under_review',false,true,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave D). Mantida em revisão: A questão depende de figura que não consta do caderno em texto (gráficos de colunas).$q$,$q$Gráficos de colunas: vendas acumuladas$q$),
(32,$q$Matemática$q$,$q$O perímetro desse pátio, demarcado pelo polígono ABCFG, é igual a
(A) 82 m.
(B) 78 m.
(C) 86 m.
(D) 94 m.
(E) 98 m.$q$,$q$O perímetro desse pátio, demarcado pelo polígono ABCFG, é igual a
(A) 82 m.
(B) 78 m.
(C) 86 m.
(D) 94 m.
(E) 98 m.$q$,'B',12,'under_review',false,true,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave B). Mantida em revisão: A questão depende de figura que não consta do caderno em texto (pátio em forma de pentágono).$q$,$q$Geometria: perímetro de pentágono$q$),
(33,$q$Matemática$q$,$q$As regiões do pátio delimitadas pelos triângulos BCD e EFG são áreas cobertas e a região delimitada pelo retângulo ABDE é uma área descoberta. A razão entre o total dessas áreas cobertas e a área descoberta é igual a (A) (B) (C) (D) (E)
(A) [alternativa em figura]
(B) [alternativa em figura]
(C) [alternativa em figura]
(D) [alternativa em figura]
(E) [alternativa em figura]$q$,$q$As regiões do pátio delimitadas pelos triângulos BCD e EFG são áreas cobertas e a região delimitada pelo retângulo ABDE é uma área descoberta. A razão entre o total dessas áreas cobertas e a área descoberta é igual a (A) (B) (C) (D) (E)
(A) [alternativa em figura]
(B) [alternativa em figura]
(C) [alternativa em figura]
(D) [alternativa em figura]
(E) [alternativa em figura]$q$,'A',12,'under_review',false,true,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave A). Mantida em revisão: A questão depende de figura que não consta do caderno em texto (pátio e alternativas em figura).$q$,$q$Geometria: razão entre áreas de triângulos e retângulo$q$),
(34,$q$Matemática$q$,$q$Considere a sequência de números inteiros, criada com um padrão lógico matemático: 1; 4; – 2; – 8; 4; 16; – 8; – 32; 16; 64; … Sejam X o 11o e Y o 12o elementos dessa sequência, o resultado da expressão numérica: Y – X ÷ 2 é igual a
(A) – 48.
(B) – 80.
(C) – 32.
(D) – 112.
(E) – 144.$q$,$q$Considere a sequência de números inteiros, criada com um padrão lógico matemático: 1; 4; – 2; – 8; 4; 16; – 8; – 32; 16; 64; … Sejam X o 11o e Y o 12o elementos dessa sequência, o resultado da expressão numérica: Y – X ÷ 2 é igual a
(A) – 48.
(B) – 80.
(C) – 32.
(D) – 112.
(E) – 144.$q$,'D',12,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave D); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Sequência numérica e expressão numérica$q$),
(35,$q$Matemática$q$,$q$Foi feita uma enquete perguntando quem havia visto um ou mais de um desses três filmes clássicos: E o Vento Levou, O Poderoso Chefão e O Silêncio dos Inocentes. Nessa enquete, 93 pessoas haviam assistido ao filme E o Vento Levou, 72 pessoas haviam visto O Poderoso Chefão e 89 pessoas confirmaram ter visto o filme O Silêncio dos Inocentes. A enquete apurou também que 53 dessas pessoas haviam assistido aos três filmes, que 15 dessas pessoas assistiram apenas a E o Vento Levou e O Silêncio dos Inocentes, e que as demais pessoas assistiram apenas a um desses filmes. Com essas informações, é correto afirmar que o número de pessoas que assistiram apenas a um desses filmes é igual a
(A) 68.
(B) 133.
(C) 94.
(D) 180.
(E) 65.$q$,$q$Foi feita uma enquete perguntando quem havia visto um ou mais de um desses três filmes clássicos: E o Vento Levou, O Poderoso Chefão e O Silêncio dos Inocentes. Nessa enquete, 93 pessoas haviam assistido ao filme E o Vento Levou, 72 pessoas haviam visto O Poderoso Chefão e 89 pessoas confirmaram ter visto o filme O Silêncio dos Inocentes. A enquete apurou também que 53 dessas pessoas haviam assistido aos três filmes, que 15 dessas pessoas assistiram apenas a E o Vento Levou e O Silêncio dos Inocentes, e que as demais pessoas assistiram apenas a um desses filmes. Com essas informações, é correto afirmar que o número de pessoas que assistiram apenas a um desses filmes é igual a
(A) 68.
(B) 133.
(C) 94.
(D) 180.
(E) 65.$q$,'E',13,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave E); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Conjuntos: três filmes assistidos$q$),
(36,$q$Conhecimentos Gerais$q$,$q$Vencida a guerra, cabia agora aos aliados conquistar a paz. Os horrores da guerra tecnológica, então consubstanciada nos aviões de combate, na artilharia pesada e na guerra química, responsáveis por 8 milhões de mortos e 20 milhões de mutilados, fizeram com que os povos do mundo inteiro tivessem a esperança de que o primeiro conflito mundial fora “a guerra para acabar com todas as guerras”. Uma razão, pelo menos, existia para tal esperança: no dia 8 de janeiro de 1918, o presidente dos Estados Unidos Wilson, alegando que a participação norte-americana no conflito só se justificaria pela busca de uma paz justa que suprimisse para sempre as causas de novas guerras, enviou ao Congresso de seu país um programa constituído de catorze itens, os famosos 14 pontos de Wilson. (Luiz Cesar B. Rodrigues, A Primeira Guerra Mundial. Adaptado) É correto afirmar que os 14 pontos de Wilson
(A) incorporaram-se integralmente ao Tratado de Versalhes e aos acordos subsequentes, porque atendiam às principais demandas territoriais das nações vitoriosas, assim como das forças derrotadas, sobretudo dos Impérios Alemão e Turco.
(B) preconizavam a aplicação do “princípio das nacionalidades” em relação à autonomia dos povos da Áustria-Hungria e à criação de uma Polônia independente, habitada por uma população de origem indiscutivelmente polonesa e com pleno acesso ao mar.
(C) receberam a oposição italiana, mas o imediato apoio das diplomacias francesa e britânica, ambas preocupadas em estabelecer uma Europa com equilíbrio de poder, a partir da ideia de que a guerra deveria ser considerada sem vencidos e sem vencedores.
(D) significaram a primeira grande crise institucional na recém-criada Liga das Nações, porque a Alemanha e a França entendiam que a participação dos Estados Unidos nas discussões dos acordos de paz era ilegítima por ferir a soberania europeia.
(E) defendiam rigorosas punições militares, territoriais e financeiras a todas as nações envolvidas no conflito e não apenas à Alemanha e à Áustria-Hungria, conforme defesa intransigente dos diplomatas belgas, britânicos e franceses na Conferência de Paris.$q$,$q$Vencida a guerra, cabia agora aos aliados conquistar a paz. Os horrores da guerra tecnológica, então consubstanciada nos aviões de combate, na artilharia pesada e na guerra química, responsáveis por 8 milhões de mortos e 20 milhões de mutilados, fizeram com que os povos do mundo inteiro tivessem a esperança de que o primeiro conflito mundial fora “a guerra para acabar com todas as guerras”. Uma razão, pelo menos, existia para tal esperança: no dia 8 de janeiro de 1918, o presidente dos Estados Unidos Wilson, alegando que a participação norte-americana no conflito só se justificaria pela busca de uma paz justa que suprimisse para sempre as causas de novas guerras, enviou ao Congresso de seu país um programa constituído de catorze itens, os famosos 14 pontos de Wilson. (Luiz Cesar B. Rodrigues, A Primeira Guerra Mundial. Adaptado) É correto afirmar que os 14 pontos de Wilson
(A) incorporaram-se integralmente ao Tratado de Versalhes e aos acordos subsequentes, porque atendiam às principais demandas territoriais das nações vitoriosas, assim como das forças derrotadas, sobretudo dos Impérios Alemão e Turco.
(B) preconizavam a aplicação do “princípio das nacionalidades” em relação à autonomia dos povos da Áustria-Hungria e à criação de uma Polônia independente, habitada por uma população de origem indiscutivelmente polonesa e com pleno acesso ao mar.
(C) receberam a oposição italiana, mas o imediato apoio das diplomacias francesa e britânica, ambas preocupadas em estabelecer uma Europa com equilíbrio de poder, a partir da ideia de que a guerra deveria ser considerada sem vencidos e sem vencedores.
(D) significaram a primeira grande crise institucional na recém-criada Liga das Nações, porque a Alemanha e a França entendiam que a participação dos Estados Unidos nas discussões dos acordos de paz era ilegítima por ferir a soberania europeia.
(E) defendiam rigorosas punições militares, territoriais e financeiras a todas as nações envolvidas no conflito e não apenas à Alemanha e à Áustria-Hungria, conforme defesa intransigente dos diplomatas belgas, britânicos e franceses na Conferência de Paris.$q$,'B',13,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave B); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Primeira Guerra Mundial: os 14 pontos de Wilson$q$),
(37,$q$Conhecimentos Gerais$q$,$q$A situação internacional ficou mais tensa quando a Itália iniciou, em maio de 1936, a invasão da Etiópia. A Liga das Nações registrou um pálido protesto, enquanto a Alemanha deu total apoio a Mussolini. Dessa forma, começava-se a selar uma aliança entre a Itália fascista e a Alemanha nazista. Essa aliança se completou a partir de meados de 1936, durante a Guerra Civil Espanhola. (Pedro Tota, “Segunda Guerra Mundial”. Em: Demétrio Magnoli, História das guerras) Há historiadores que consideram a Guerra Civil Espanhola como uma espécie de ensaio da Segunda Guerra porque
(A) o governo republicano espanhol, comandado por liberais conservadores, contou com apoio militar e financeiro das forças nazifascistas para evitar o sucesso de uma revolução social no país, provocada por partidos progressistas e anarquistas.
(B) os exércitos britânico e francês organizaram a defesa da República espanhola, associados às Brigadas Internacionais e, dessa forma, foi possível conter o avanço nazifascista na Espanha, onde o franquismo foi derrotado.
(C) as forças conservadoras franquistas receberam o apoio militar da Alemanha e da Itália, enquanto os republicanos foram ajudados pela União Soviética, e as armas testadas no conflito espanhol foram utilizadas na Segunda Guerra.
(D) o conflito espanhol reproduziu as mesmas disputas que ocorreram na Segunda Guerra, na qual as forças do capitalismo liberal confrontaram-se com as nações praticantes do chamado socialismo real, caso da União Soviética.
(E) os acordos diplomáticos assinados entre as principais potências europeias, especialmente Alemanha e Grã-Bretanha, definiram que a Espanha era uma nação neutra e não poderia ser invadida, o que não foi respeitado pelos britânicos.$q$,$q$A situação internacional ficou mais tensa quando a Itália iniciou, em maio de 1936, a invasão da Etiópia. A Liga das Nações registrou um pálido protesto, enquanto a Alemanha deu total apoio a Mussolini. Dessa forma, começava-se a selar uma aliança entre a Itália fascista e a Alemanha nazista. Essa aliança se completou a partir de meados de 1936, durante a Guerra Civil Espanhola. (Pedro Tota, “Segunda Guerra Mundial”. Em: Demétrio Magnoli, História das guerras) Há historiadores que consideram a Guerra Civil Espanhola como uma espécie de ensaio da Segunda Guerra porque
(A) o governo republicano espanhol, comandado por liberais conservadores, contou com apoio militar e financeiro das forças nazifascistas para evitar o sucesso de uma revolução social no país, provocada por partidos progressistas e anarquistas.
(B) os exércitos britânico e francês organizaram a defesa da República espanhola, associados às Brigadas Internacionais e, dessa forma, foi possível conter o avanço nazifascista na Espanha, onde o franquismo foi derrotado.
(C) as forças conservadoras franquistas receberam o apoio militar da Alemanha e da Itália, enquanto os republicanos foram ajudados pela União Soviética, e as armas testadas no conflito espanhol foram utilizadas na Segunda Guerra.
(D) o conflito espanhol reproduziu as mesmas disputas que ocorreram na Segunda Guerra, na qual as forças do capitalismo liberal confrontaram-se com as nações praticantes do chamado socialismo real, caso da União Soviética.
(E) os acordos diplomáticos assinados entre as principais potências europeias, especialmente Alemanha e Grã-Bretanha, definiram que a Espanha era uma nação neutra e não poderia ser invadida, o que não foi respeitado pelos britânicos.$q$,'C',14,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave C); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Guerra Civil Espanhola e Segunda Guerra Mundial$q$),
(38,$q$Conhecimentos Gerais$q$,$q$A propaganda anticomunista foi produzida em muitos países alinhados aos Estados Unidos ou que estavam sob sua hegemonia. A propaganda capitalista e anticomunista exaltava a liberdade de expressão, as facilidades de consumo e as oportunidades de enriquecimento proporcionadas pelo capitalismo. Em contrapartida, denunciava que no comunismo não havia liberdade, o Estado comunista controlava tudo e tomava as terras e casas. (Joelza Ester Domingues, “A propaganda ideológica da Guerra Fria em 14 cartazes da época” . Blog: Ensinar História. Disponível em: https://ensinarhistoria.com.br/propaganda-ideologicada-guerra-fria/#fatos-rapidos. Acesso em 19.06.2026. Adaptado) A propaganda soviética, por sua vez,
(A) ressaltava que a economia comunista era planificada, condição que evitava crises econômicas e oscilações financeiras tão comuns nos países capitalistas.
(B) condenava as nações do Primeiro Mundo pela planificação estatal da economia, bem como pelo inchaço e uso abusivo da máquina do Estado.
(C) considerava que a liberdade econômica presente no capitalismo era ilusória porque os preços, em geral, eram determinados pelo próprio Estado burguês.
(D) apontava o capitalismo como responsável pelas graves crises econômicas, com dimensões globais, ocorridas ao longo dos anos 1950 e 1960.
(E) destacava o frágil desenvolvimento tecnológico dos países capitalistas, principalmente por estes estarem em desvantagem na corrida espacial.$q$,$q$A propaganda anticomunista foi produzida em muitos países alinhados aos Estados Unidos ou que estavam sob sua hegemonia. A propaganda capitalista e anticomunista exaltava a liberdade de expressão, as facilidades de consumo e as oportunidades de enriquecimento proporcionadas pelo capitalismo. Em contrapartida, denunciava que no comunismo não havia liberdade, o Estado comunista controlava tudo e tomava as terras e casas. (Joelza Ester Domingues, “A propaganda ideológica da Guerra Fria em 14 cartazes da época” . Blog: Ensinar História. Disponível em: https://ensinarhistoria.com.br/propaganda-ideologicada-guerra-fria/#fatos-rapidos. Acesso em 19.06.2026. Adaptado) A propaganda soviética, por sua vez,
(A) ressaltava que a economia comunista era planificada, condição que evitava crises econômicas e oscilações financeiras tão comuns nos países capitalistas.
(B) condenava as nações do Primeiro Mundo pela planificação estatal da economia, bem como pelo inchaço e uso abusivo da máquina do Estado.
(C) considerava que a liberdade econômica presente no capitalismo era ilusória porque os preços, em geral, eram determinados pelo próprio Estado burguês.
(D) apontava o capitalismo como responsável pelas graves crises econômicas, com dimensões globais, ocorridas ao longo dos anos 1950 e 1960.
(E) destacava o frágil desenvolvimento tecnológico dos países capitalistas, principalmente por estes estarem em desvantagem na corrida espacial.$q$,'A',14,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave A); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Guerra Fria: propaganda soviética$q$),
(39,$q$Conhecimentos Gerais$q$,$q$Em relação aos investimentos políticos mobilizados, pode-se ver que a figura de Vargas começa a ser mais sistematicamente trabalhada, como o modelo exemplar de presidente, quando ele é ainda o chefe do Governo Provisório (1930 – 1934) e o candidato à eleição indireta, realizada pela Assembleia Nacional Constituinte, em 1934. Foi nessa ocasião e com o objetivo de divulgar os feitos da Revolução de 1930 e de seu maior líder que foi criado o programa radiofônico A Voz do Brasil, existente até hoje. A partir daí, a propaganda em torno do nome de Vargas e das realizações de seu governo não pararam de aumentar, em quantidade e qualidade. Entretanto, foi só após o golpe do Estado Novo, em novembro de 1937, que a preocupação com a construção do mito Vargas chegou a seu auge. (Ângela de Castro Gomes, “Vargas exemplar”. Em: Luciano Figueiredo (org.), História do Brasil para ocupados) Tal construção mítica veio, entre outras formas, por meio
(A) da formação e atuação da Juventude Brasileira, movimento criado e dirigido pela Igreja Católica, que organizava eventos públicos de apoio aos princípios centrais do estadonovismo, como o culto à personalidade de Getúlio Vargas.
(B) do controle dos conteúdos escolares oferecidos para a Educação Básica, que deixou de ser uma atribuição do Ministério da Educação e Saúde, passando a ser uma atribuição exclusiva do Ministério da Justiça e do próprio presidente Vargas.
(C) da realização de grandes eventos nos quais Getúlio Vargas discursava para a população, tendo ampla cobertura da imprensa escrita e falada, como ocorria no Dia do Trabalho e no 10 de Novembro, quando se comemorava a instalação do Estado Novo.
(D) da fidelidade política que todos os funcionários públicos deveriam oferecer ao presidente Vargas, filiando-se ao partido fundado por ele, o PTB, participando ativamente da vida sindical e contribuindo para o fortalecimento da previdência oficial.
(E) da estatização generalizada dos meios de comunicação, que estabeleceu que as emissoras radiofônicas e a imprensa escrita passassem a ter suas administrações e produção de conteúdos sob o poder do Departamento de Imprensa e Propaganda.$q$,$q$Em relação aos investimentos políticos mobilizados, pode-se ver que a figura de Vargas começa a ser mais sistematicamente trabalhada, como o modelo exemplar de presidente, quando ele é ainda o chefe do Governo Provisório (1930 – 1934) e o candidato à eleição indireta, realizada pela Assembleia Nacional Constituinte, em 1934. Foi nessa ocasião e com o objetivo de divulgar os feitos da Revolução de 1930 e de seu maior líder que foi criado o programa radiofônico A Voz do Brasil, existente até hoje. A partir daí, a propaganda em torno do nome de Vargas e das realizações de seu governo não pararam de aumentar, em quantidade e qualidade. Entretanto, foi só após o golpe do Estado Novo, em novembro de 1937, que a preocupação com a construção do mito Vargas chegou a seu auge. (Ângela de Castro Gomes, “Vargas exemplar”. Em: Luciano Figueiredo (org.), História do Brasil para ocupados) Tal construção mítica veio, entre outras formas, por meio
(A) da formação e atuação da Juventude Brasileira, movimento criado e dirigido pela Igreja Católica, que organizava eventos públicos de apoio aos princípios centrais do estadonovismo, como o culto à personalidade de Getúlio Vargas.
(B) do controle dos conteúdos escolares oferecidos para a Educação Básica, que deixou de ser uma atribuição do Ministério da Educação e Saúde, passando a ser uma atribuição exclusiva do Ministério da Justiça e do próprio presidente Vargas.
(C) da realização de grandes eventos nos quais Getúlio Vargas discursava para a população, tendo ampla cobertura da imprensa escrita e falada, como ocorria no Dia do Trabalho e no 10 de Novembro, quando se comemorava a instalação do Estado Novo.
(D) da fidelidade política que todos os funcionários públicos deveriam oferecer ao presidente Vargas, filiando-se ao partido fundado por ele, o PTB, participando ativamente da vida sindical e contribuindo para o fortalecimento da previdência oficial.
(E) da estatização generalizada dos meios de comunicação, que estabeleceu que as emissoras radiofônicas e a imprensa escrita passassem a ter suas administrações e produção de conteúdos sob o poder do Departamento de Imprensa e Propaganda.$q$,'C',15,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave C); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Era Vargas: construção do mito$q$),
(40,$q$Conhecimentos Gerais$q$,$q$Em junho de 1890, foram convocadas as eleições para a Assembleia Constituinte, que, em poucos meses, elaborou uma nova Constituição, não sem debates e divisões internas. A primeira Constituição republicana do Brasil aboliu as “instituições monárquicas” criticadas por todas as correntes republicanas. Além disso, as províncias foram transformadas em estados, com maiores poderes administrativos, comparando-se ao período do regime deposto. Exemplo dessa autonomia estava na gestão tributária. (Marcos Napolitano, História do Brasil República: da queda da Monarquia ao fim do Estado Novo. Adaptado) Assinale a alternativa que exemplifica a citada autonomia com maiores poderes administrativos dos estados.
(A) A política fiscal precipitou uma grave crise econômico-financeira que atingiu, essencialmente, os estados mais ricos. Nesse processo, não existiam recursos por parte do governo federal. Dessa forma, a começar por São Paulo, muitos estados contraíram empréstimos externos.
(B) Os estados mais ricos da União – São Paulo, Minas Gerais e Bahia – eram responsáveis pelo custeio da administração federal. Essa dependência financeira gerava domínio político desses estados. No início dos anos 1910, foi necessária uma reforma fiscal.
(C) Os governos de São Paulo e Rio Grande do Sul não conseguiam arrecadar o suficiente para cobrir os seus custos de administração. Essa condição os obrigou a contrair empréstimos junto ao governo federal. Essa dependência econômica provocou intervenções federais nestes estados.
(D) Os estados da Bahia e de Pernambuco, os principais exportadores brasileiros, detinham importante prestígio político em nível federal. Essa condição aumentou a rivalidade com São Paulo. Este estado precisava de recursos federais para o seu incremento industrial.
(E) Os governos estaduais ficavam com as rendas geradas pelos impostos sobre a exportação de produtos, enquanto a União ficava com as rendas geradas pela importação. As primeiras eram maiores que as segundas. Esse arranjo fiscal favorecia os estados agroexportadores, como São Paulo.$q$,$q$Em junho de 1890, foram convocadas as eleições para a Assembleia Constituinte, que, em poucos meses, elaborou uma nova Constituição, não sem debates e divisões internas. A primeira Constituição republicana do Brasil aboliu as “instituições monárquicas” criticadas por todas as correntes republicanas. Além disso, as províncias foram transformadas em estados, com maiores poderes administrativos, comparando-se ao período do regime deposto. Exemplo dessa autonomia estava na gestão tributária. (Marcos Napolitano, História do Brasil República: da queda da Monarquia ao fim do Estado Novo. Adaptado) Assinale a alternativa que exemplifica a citada autonomia com maiores poderes administrativos dos estados.
(A) A política fiscal precipitou uma grave crise econômico-financeira que atingiu, essencialmente, os estados mais ricos. Nesse processo, não existiam recursos por parte do governo federal. Dessa forma, a começar por São Paulo, muitos estados contraíram empréstimos externos.
(B) Os estados mais ricos da União – São Paulo, Minas Gerais e Bahia – eram responsáveis pelo custeio da administração federal. Essa dependência financeira gerava domínio político desses estados. No início dos anos 1910, foi necessária uma reforma fiscal.
(C) Os governos de São Paulo e Rio Grande do Sul não conseguiam arrecadar o suficiente para cobrir os seus custos de administração. Essa condição os obrigou a contrair empréstimos junto ao governo federal. Essa dependência econômica provocou intervenções federais nestes estados.
(D) Os estados da Bahia e de Pernambuco, os principais exportadores brasileiros, detinham importante prestígio político em nível federal. Essa condição aumentou a rivalidade com São Paulo. Este estado precisava de recursos federais para o seu incremento industrial.
(E) Os governos estaduais ficavam com as rendas geradas pelos impostos sobre a exportação de produtos, enquanto a União ficava com as rendas geradas pela importação. As primeiras eram maiores que as segundas. Esse arranjo fiscal favorecia os estados agroexportadores, como São Paulo.$q$,'E',15,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave E); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Constituição de 1891: autonomia dos estados$q$),
(41,$q$Conhecimentos Gerais$q$,$q$Em outubro de 1965, realizaram-se eleições diretas em onze estados. A esta altura, grande parte do entusiasmo pela revolução, entre seus próprios adeptos, tinha declinado. Apesar do veto a determinados candidatos por parte da chamada linha-dura das Forças Armadas, a oposição triunfou em estados importantes, a exemplo da Guanabara, Minas Gerais, Mato Grosso e Santa Catarina. O resultado das urnas alarmou os meios militares. Os grupos de linha-dura, adversários dos castelistas, viram nele a prova de que o governo era muito complacente com seus inimigos. (Boris Fausto, História do Brasil. Adaptado) Pressionado pelos grupos de linha-dura, o presidente Castelo Branco decretou
(A) uma lei que oferecia anistia política aos presos políticos condenados por ações contra o regime instituído em 1964, desde que não se tratasse de crimes contra a vida ou da formação de partidos políticos extremistas.
(B) o Ato Institucional no 5 (AI–5), que possibilitou prerrogativas ao presidente da República, tais como cassar mandatos populares e influenciar na nomeação de bispos católicos.
(C) a Lei de Segurança Nacional, legislação que trouxe muitas barreiras para que houvesse manifestações públicas com críticas ao regime vigente, assim como a proibição de partidos políticos.
(D) o Ato Institucional no 2 (AI–2), que estabeleceu em definitivo que a eleição para presidente e vice-presidente da República seria realizada pela maioria absoluta do Congresso Nacional, em sessão pública e votação nominal.
(E) o Ato Institucional no 1 (AI–1), que permitia ao presidente da República elaborar e promulgar uma nova Carta Constitucional, além de extinguir todos os partidos políticos e substituí-los pelo bipartidarismo.$q$,$q$Em outubro de 1965, realizaram-se eleições diretas em onze estados. A esta altura, grande parte do entusiasmo pela revolução, entre seus próprios adeptos, tinha declinado. Apesar do veto a determinados candidatos por parte da chamada linha-dura das Forças Armadas, a oposição triunfou em estados importantes, a exemplo da Guanabara, Minas Gerais, Mato Grosso e Santa Catarina. O resultado das urnas alarmou os meios militares. Os grupos de linha-dura, adversários dos castelistas, viram nele a prova de que o governo era muito complacente com seus inimigos. (Boris Fausto, História do Brasil. Adaptado) Pressionado pelos grupos de linha-dura, o presidente Castelo Branco decretou
(A) uma lei que oferecia anistia política aos presos políticos condenados por ações contra o regime instituído em 1964, desde que não se tratasse de crimes contra a vida ou da formação de partidos políticos extremistas.
(B) o Ato Institucional no 5 (AI–5), que possibilitou prerrogativas ao presidente da República, tais como cassar mandatos populares e influenciar na nomeação de bispos católicos.
(C) a Lei de Segurança Nacional, legislação que trouxe muitas barreiras para que houvesse manifestações públicas com críticas ao regime vigente, assim como a proibição de partidos políticos.
(D) o Ato Institucional no 2 (AI–2), que estabeleceu em definitivo que a eleição para presidente e vice-presidente da República seria realizada pela maioria absoluta do Congresso Nacional, em sessão pública e votação nominal.
(E) o Ato Institucional no 1 (AI–1), que permitia ao presidente da República elaborar e promulgar uma nova Carta Constitucional, além de extinguir todos os partidos políticos e substituí-los pelo bipartidarismo.$q$,'D',16,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave D); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Ditadura militar: Ato Institucional nº 2$q$),
(42,$q$Conhecimentos Gerais$q$,$q$Os membros do BRICS desempenham um papel importante nas redes globais de comércio. Além de grandes exportadores e importadores, mantêm intenso intercâmbio entre si, o que evidencia a cooperação econômica entre esses membros. Com exceção da Índia, os países do BRICS são exportadores de recursos naturais e energéticos para a China. Todos os outros países que atualmente integram o grupo dependem do comércio com ela. (Alice Noujaim, Beatriz Kipnis, Isabel Penz (Orgs.). Cadernos Vale a Pena Perguntar: BRICS e a Nova Governança Global, 2025. Adaptado) No caso brasileiro, é preocupante que a nossa pauta exportadora seja tão concentrada em um único país e em um único produto, qual seja:
(A) o café.
(B) a carne.
(C) a madeira bruta.
(D) o petróleo bruto.
(E) a soja.$q$,$q$Os membros do BRICS desempenham um papel importante nas redes globais de comércio. Além de grandes exportadores e importadores, mantêm intenso intercâmbio entre si, o que evidencia a cooperação econômica entre esses membros. Com exceção da Índia, os países do BRICS são exportadores de recursos naturais e energéticos para a China. Todos os outros países que atualmente integram o grupo dependem do comércio com ela. (Alice Noujaim, Beatriz Kipnis, Isabel Penz (Orgs.). Cadernos Vale a Pena Perguntar: BRICS e a Nova Governança Global, 2025. Adaptado) No caso brasileiro, é preocupante que a nossa pauta exportadora seja tão concentrada em um único país e em um único produto, qual seja:
(A) o café.
(B) a carne.
(C) a madeira bruta.
(D) o petróleo bruto.
(E) a soja.$q$,'E',16,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave E); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Geopolítica: BRICS e exportações brasileiras$q$),
(43,$q$Conhecimentos Gerais$q$,$q$A globalização possibilitou um crescimento econômico em larga escala em vários países e intensificou a velocidade na transferência de capitais, decorrentes do advento das comunicações e da internet. Nesse contexto, surgiram empresas digitais, como as startups e plataformas de aplicativos, que criaram um novo modelo de negócios, impulsionando o desenvolvimento econômico e tecnológico, mas também ampliando desafios relacionados à precarização do trabalho. Uma das principais mudanças para o trabalhador é a possiblidade de utilização de plataformas digitais, via smartphones, como meio de realização do trabalho. Esse cenário evidencia um processo de flexibilização e precarização das condições de trabalho – características da chamada uberização –, decorrente da ausência de regulamentação específica dessa atividade. O problema é que os trabalhadores que atuam por meio dessas plataformas para exercer suas atividades, acabam renunciando aos direitos trabalhistas previstos no ordenamento jurídico brasileiro, para auferir renda e garantir sua sobrevivência e a de seus dependentes. (Celina Naconeski, Marco Antônio César Villatore, Thierry Gihachi Izuta. A globalização e a “uberização” do trabalho: reflexões sobre os trabalhadores de entregas de alimentos por aplicativos. Revista Humanidades e Inovação. Disponível em: https://revista.unitins.br/ index.php/humanidadeseinovacao/article/view/5689. Adaptado) O texto faz referência a um fenômeno diretamente relacionado à globalização e ao avanço tecnológico, que tem gerado mudanças nos modelos de negócios, nas formas de produção, nos padrões de crescimento, nos mercados de trabalho e no futuro do trabalho, conhecido como
(A) Quarta Revolução Industrial ou Indústria 4.0.
(B) Big data ou Revolução Técnico-Científico-Informacional.
(C) Inteligência Artificial ou Sociedade da Informação.
(D) Terceira Revolução Industrial ou Aprendizado de Máquina.
(E) Internet das Coisas ou Conexão em Rede.$q$,$q$A globalização possibilitou um crescimento econômico em larga escala em vários países e intensificou a velocidade na transferência de capitais, decorrentes do advento das comunicações e da internet. Nesse contexto, surgiram empresas digitais, como as startups e plataformas de aplicativos, que criaram um novo modelo de negócios, impulsionando o desenvolvimento econômico e tecnológico, mas também ampliando desafios relacionados à precarização do trabalho. Uma das principais mudanças para o trabalhador é a possiblidade de utilização de plataformas digitais, via smartphones, como meio de realização do trabalho. Esse cenário evidencia um processo de flexibilização e precarização das condições de trabalho – características da chamada uberização –, decorrente da ausência de regulamentação específica dessa atividade. O problema é que os trabalhadores que atuam por meio dessas plataformas para exercer suas atividades, acabam renunciando aos direitos trabalhistas previstos no ordenamento jurídico brasileiro, para auferir renda e garantir sua sobrevivência e a de seus dependentes. (Celina Naconeski, Marco Antônio César Villatore, Thierry Gihachi Izuta. A globalização e a “uberização” do trabalho: reflexões sobre os trabalhadores de entregas de alimentos por aplicativos. Revista Humanidades e Inovação. Disponível em: https://revista.unitins.br/ index.php/humanidadeseinovacao/article/view/5689. Adaptado) O texto faz referência a um fenômeno diretamente relacionado à globalização e ao avanço tecnológico, que tem gerado mudanças nos modelos de negócios, nas formas de produção, nos padrões de crescimento, nos mercados de trabalho e no futuro do trabalho, conhecido como
(A) Quarta Revolução Industrial ou Indústria 4.0.
(B) Big data ou Revolução Técnico-Científico-Informacional.
(C) Inteligência Artificial ou Sociedade da Informação.
(D) Terceira Revolução Industrial ou Aprendizado de Máquina.
(E) Internet das Coisas ou Conexão em Rede.$q$,'A',16,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave A); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Globalização: uberização do trabalho$q$),
(44,$q$Conhecimentos Gerais$q$,$q$Em regiões afetadas por intensa poluição atmosférica, como os grandes centros urbanos, a fuligem e os gases poluentes lançados pelas chaminés das fábricas e pelo escapamento dos veículos automotores tendem a se dispersar por meio de correntes de ar ascendentes. Em dias mais frios, com baixas temperaturas e pouco vento, típicos do outono e do inverno, a ausência de corrente de ar dificulta a dispersão dos poluentes atmosféricos. Nessa situação, o ar em contato com a superfície mais fria também se resfria, ficando aprisionado pela camada de ar mais quente acima, o que impede a dispersão dos poluentes atmosféricos. Esse processo caracteriza (Rogério Martinez, Wanessa Garcia. Contato Geografia, 2016. Adaptado)
(A) uma dinâmica climática.
(B) uma inversão térmica.
(C) um processo adiabático.
(D) um aquecimento global.
(E) uma radiação ultravioleta.$q$,$q$Em regiões afetadas por intensa poluição atmosférica, como os grandes centros urbanos, a fuligem e os gases poluentes lançados pelas chaminés das fábricas e pelo escapamento dos veículos automotores tendem a se dispersar por meio de correntes de ar ascendentes. Em dias mais frios, com baixas temperaturas e pouco vento, típicos do outono e do inverno, a ausência de corrente de ar dificulta a dispersão dos poluentes atmosféricos. Nessa situação, o ar em contato com a superfície mais fria também se resfria, ficando aprisionado pela camada de ar mais quente acima, o que impede a dispersão dos poluentes atmosféricos. Esse processo caracteriza (Rogério Martinez, Wanessa Garcia. Contato Geografia, 2016. Adaptado)
(A) uma dinâmica climática.
(B) uma inversão térmica.
(C) um processo adiabático.
(D) um aquecimento global.
(E) uma radiação ultravioleta.$q$,'B',17,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave B); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Problemas ambientais: inversão térmica$q$),
(45,$q$Conhecimentos Gerais$q$,$q$As formas de relevo criadas pelas forças do interior da Terra são constantemente modificadas pela atuação de (Lygia Terra, Raul Borges Guimarães, Regina Araújo. Moderna plus – Geografia, 2024)
(A) epirogenia ou orogenia.
(B) sismo ou abalos sísmicos.
(C) fraturamentos ou atividade vulcânica.
(D) movimentos tectônicos ou diastrofismo.
(E) agentes externos ou exógenos.$q$,$q$As formas de relevo criadas pelas forças do interior da Terra são constantemente modificadas pela atuação de (Lygia Terra, Raul Borges Guimarães, Regina Araújo. Moderna plus – Geografia, 2024)
(A) epirogenia ou orogenia.
(B) sismo ou abalos sísmicos.
(C) fraturamentos ou atividade vulcânica.
(D) movimentos tectônicos ou diastrofismo.
(E) agentes externos ou exógenos.$q$,'E',17,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave E); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Relevo: agentes externos$q$),
(46,$q$Conhecimentos Gerais$q$,$q$No ano de 2024, foram registradas anomalias de precipitação positivas de +400mm no leste do Brasil e no estado do Rio Grande do Sul. Entre abril e maio de 2024, esse excesso de chuva provocou inundações sem precedentes no Rio Grande do Sul, atingindo 478 dos 497 municípios do estado, afetando 2.398.255 pessoas e resultando em 183 mortes e 27 desaparecidos. As tempestades fizeram com que os rios afluentes do lago Guaíba (rios Taquari, Caí, Pardo, Jacuí, Sinos e Gravataí) transbordassem, ocasionando enchentes na Região Metropolitana da capital Porto Alegre e municípios próximos. (Jose A. Marengo et. al. Relatório Técnico: Estado do clima, extremos de clima e desastres no Brasil em 2024. In: INCT/MC2, 2024. Disponível em: https://inctmc2.cemaden.gov.br/wp-content/ uploads/2025/03/Relatorio_NT-Clima_Extremos_Desastres-2024Brasil-digital.pdf. Adaptado) Qual fator foi considerado importante para explicar a variabilidade nas chuvas observadas e a frente fria que trouxe chuvas, permanecendo estacionária no Sul do Brasil devido a um bloqueio atmosférico?
(A) Massa Tropical Continental (mTc), um sistema de ar quente e seco que se origina na Depressão do Chaco e atua no Centro-Oeste e interior do Sudeste, provocando elevação de temperatura e baixa umidade.
(B) Massa Polar Atlântica (mPa), uma massa de ar fria que se origina no Oceano Atlântico Sul e entra no território brasileiro pelo sul do país, provocando chuvas frontais principalmente nas regiões Sul, Sudeste e Litoral do Nordeste.
(C) La Niña-NOAA (LA-NOAA), um fenômeno climático caracterizado pelo resfriamento anormal das águas superficiais do Oceano Pacífico Equatorial, com tendência a maior regularidade de chuvas na região Centro-Oeste.
(D) El Niño-Oscilação Sul (ENSO), um fenômeno climático de escala global que aquece as águas do Pacífico Equatorial, associado ao aumento das temperaturas acima da média e aos elevados volumes de precipitação em determinadas regiões do país.
(E) Massa Equatorial Continental (mEc), que se origina na Amazônia e gera os chamados “Rios Voadores”, sendo responsável pelas altas temperaturas e chuvas abundantes (convectivas) no Brasil, sobretudo durante o verão.$q$,$q$No ano de 2024, foram registradas anomalias de precipitação positivas de +400mm no leste do Brasil e no estado do Rio Grande do Sul. Entre abril e maio de 2024, esse excesso de chuva provocou inundações sem precedentes no Rio Grande do Sul, atingindo 478 dos 497 municípios do estado, afetando 2.398.255 pessoas e resultando em 183 mortes e 27 desaparecidos. As tempestades fizeram com que os rios afluentes do lago Guaíba (rios Taquari, Caí, Pardo, Jacuí, Sinos e Gravataí) transbordassem, ocasionando enchentes na Região Metropolitana da capital Porto Alegre e municípios próximos. (Jose A. Marengo et. al. Relatório Técnico: Estado do clima, extremos de clima e desastres no Brasil em 2024. In: INCT/MC2, 2024. Disponível em: https://inctmc2.cemaden.gov.br/wp-content/ uploads/2025/03/Relatorio_NT-Clima_Extremos_Desastres-2024Brasil-digital.pdf. Adaptado) Qual fator foi considerado importante para explicar a variabilidade nas chuvas observadas e a frente fria que trouxe chuvas, permanecendo estacionária no Sul do Brasil devido a um bloqueio atmosférico?
(A) Massa Tropical Continental (mTc), um sistema de ar quente e seco que se origina na Depressão do Chaco e atua no Centro-Oeste e interior do Sudeste, provocando elevação de temperatura e baixa umidade.
(B) Massa Polar Atlântica (mPa), uma massa de ar fria que se origina no Oceano Atlântico Sul e entra no território brasileiro pelo sul do país, provocando chuvas frontais principalmente nas regiões Sul, Sudeste e Litoral do Nordeste.
(C) La Niña-NOAA (LA-NOAA), um fenômeno climático caracterizado pelo resfriamento anormal das águas superficiais do Oceano Pacífico Equatorial, com tendência a maior regularidade de chuvas na região Centro-Oeste.
(D) El Niño-Oscilação Sul (ENSO), um fenômeno climático de escala global que aquece as águas do Pacífico Equatorial, associado ao aumento das temperaturas acima da média e aos elevados volumes de precipitação em determinadas regiões do país.
(E) Massa Equatorial Continental (mEc), que se origina na Amazônia e gera os chamados “Rios Voadores”, sendo responsável pelas altas temperaturas e chuvas abundantes (convectivas) no Brasil, sobretudo durante o verão.$q$,'D',17,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave D); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Clima: enchentes de 2024 no Rio Grande do Sul$q$),
(47,$q$Conhecimentos Gerais$q$,$q$O município de São Paulo possui uma área territorial de 1.522,683 km2 e, de acordo com o Censo Demográfico de 2022, uma população de 11.451.999 habitantes. Dividindo o número total de habitantes de São Paulo pela área de seu território, em quilômetros quadrados (km2), encontramos a sua densidade demográfica (7.528,26 hab./km2), também denominada população (IBGE. Cidades e Estados – São Paulo. Disponível em: https://www.ibge.gov.br/cidades-e-estados/sp/sao-paulo.html)
(A) residente.
(B) vegetativa.
(C) relativa.
(D) absoluta.
(E) natural.$q$,$q$O município de São Paulo possui uma área territorial de 1.522,683 km2 e, de acordo com o Censo Demográfico de 2022, uma população de 11.451.999 habitantes. Dividindo o número total de habitantes de São Paulo pela área de seu território, em quilômetros quadrados (km2), encontramos a sua densidade demográfica (7.528,26 hab./km2), também denominada população (IBGE. Cidades e Estados – São Paulo. Disponível em: https://www.ibge.gov.br/cidades-e-estados/sp/sao-paulo.html)
(A) residente.
(B) vegetativa.
(C) relativa.
(D) absoluta.
(E) natural.$q$,'C',18,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave C); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$População: densidade demográfica$q$),
(48,$q$Conhecimentos Gerais$q$,$q$Os TRE (Tribunal Regional Eleitoral) de dois estados brasileiros foram mobilizados para realizar eleições suplementares para governador, porque ocorreram vacância dos cargos. Em um deles, o titular foi afastado por abuso de poder econômico e no outro, o governador eleito renunciou às vésperas do julgamento do TSE (Tribunal Superior Eleitoral) que resultou na sua condenação por abuso de poder econômico e político. Os fatos ocorreram, respectivamente, nos seguintes estados:
(A) Roraima e Rio de Janeiro.
(B) Pernambuco e Pará.
(C) Amapá e Rio Grande do Norte.
(D) Acre e Ceará.
(E) Sergipe e Tocantins.$q$,$q$Os TRE (Tribunal Regional Eleitoral) de dois estados brasileiros foram mobilizados para realizar eleições suplementares para governador, porque ocorreram vacância dos cargos. Em um deles, o titular foi afastado por abuso de poder econômico e no outro, o governador eleito renunciou às vésperas do julgamento do TSE (Tribunal Superior Eleitoral) que resultou na sua condenação por abuso de poder econômico e político. Os fatos ocorreram, respectivamente, nos seguintes estados:
(A) Roraima e Rio de Janeiro.
(B) Pernambuco e Pará.
(C) Amapá e Rio Grande do Norte.
(D) Acre e Ceará.
(E) Sergipe e Tocantins.$q$,'A',18,'under_review',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave A). Mantida em revisão: Atualidades: fatos recentes (eleições suplementares estaduais) sem fonte oficial verificada.$q$,$q$Atualidades: eleições suplementares para governador$q$),
(49,$q$Conhecimentos Gerais$q$,$q$As autoridades do _______ continuam a apuração do segundo turno da eleição presidencial, que foi realizado no domingo (7). O país enfrenta uma profunda divisão social, que é refletida em uma disputa acirrada pelo poder. A contagem continua de forma lenta. Até o momento, 99,688% das urnas foram apuradas. Keiko Fujimori, de direita, aparece com 50,111%, enquanto Roberto Sánchez, de esquerda, tem 49,889%. A diferença entre os dois candidatos é de 40.700 votos. (CNN Brasil. Disponível em: https://shre.ink/3QPe. Acesso em 21.06.2026. Adaptado) Assinale a alternativa que completa corretamente a lacuna.
(A) Chile
(B) Panamá
(C) Peru
(D) Equador
(E) Suriname$q$,$q$As autoridades do _______ continuam a apuração do segundo turno da eleição presidencial, que foi realizado no domingo (7). O país enfrenta uma profunda divisão social, que é refletida em uma disputa acirrada pelo poder. A contagem continua de forma lenta. Até o momento, 99,688% das urnas foram apuradas. Keiko Fujimori, de direita, aparece com 50,111%, enquanto Roberto Sánchez, de esquerda, tem 49,889%. A diferença entre os dois candidatos é de 40.700 votos. (CNN Brasil. Disponível em: https://shre.ink/3QPe. Acesso em 21.06.2026. Adaptado) Assinale a alternativa que completa corretamente a lacuna.
(A) Chile
(B) Panamá
(C) Peru
(D) Equador
(E) Suriname$q$,'C',18,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave C); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Atualidades: eleição presidencial no Peru$q$),
(50,$q$Conhecimentos Gerais$q$,$q$Desenvolvida por pesquisadores da Universidade Federal do Rio de Janeiro (UFRJ), a polilaminina passou a ser apontada como uma possível revolução científica brasileira. (Veja Saúde. Disponível em: https://shre.ink/32UB. Acesso em 21.06.2026. Adaptado) Em estudos iniciais, a molécula se mostrou capaz de tratar a paraplegia e a tetraplegia, causadas por lesões
(A) cerebrais.
(B) medulares.
(C) musculares.
(D) hormonais.
(E) coronárias.$q$,$q$Desenvolvida por pesquisadores da Universidade Federal do Rio de Janeiro (UFRJ), a polilaminina passou a ser apontada como uma possível revolução científica brasileira. (Veja Saúde. Disponível em: https://shre.ink/32UB. Acesso em 21.06.2026. Adaptado) Em estudos iniciais, a molécula se mostrou capaz de tratar a paraplegia e a tetraplegia, causadas por lesões
(A) cerebrais.
(B) medulares.
(C) musculares.
(D) hormonais.
(E) coronárias.$q$,'B',18,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave B); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Atualidades: polilaminina e lesões medulares$q$),
(51,$q$Noções Básicas de Informática$q$,$q$Um usuário do MS-Windows 10, em sua configuração padrão, possui uma pasta com 5 pequenos arquivos txt, nomeadamente, a.txt, b.txt, c.txt, d.txt e e.txt. Mas deseja copiar cada um deles em sua respectiva pasta, as pastas A, B, C, D e E, ficando cada pasta com apenas seu respectivo arquivo. Para copiar os arquivos de forma eficiente, o usuário pode _______ o Histórico da Área de Transferência, selecionar _______ para que todos estejam no Histórico, acessar a primeira pasta de destino, acionar o atalho por teclado _______ e escolher o arquivo a ser colado. Em seguida, passar para a próxima pasta de destino e repetir o procedimento de acionar o atalho por teclado e selecionar o arquivo a ser colado e, assim sucessivamente, até colar cada arquivo em sua pasta correspondente. Assinale a alternativa que preenche, correta e respectivamente, as lacunas do enunciado.
(A) ativar … cada arquivo na origem individualmente e acionar o atalho Ctrl + C entre cada arquivo selecionado … Ctrl + V
(B) desativar … todos os arquivos na origem ao mesmo tempo e acionar o atalho Ctrl + C … Windows + V
(C) desativar … todos os arquivos na origem ao mesmo tempo e acionar o atalho Ctrl + X … Windows + V
(D) ativar … todos os arquivos na origem ao mesmo tempo e acionar o atalho Ctrl + C … Ctrl + V
(E) ativar … cada arquivo na origem individualmente e acionar o atalho Ctrl + C entre cada arquivo selecionado … Windows + V$q$,$q$Um usuário do MS-Windows 10, em sua configuração padrão, possui uma pasta com 5 pequenos arquivos txt, nomeadamente, a.txt, b.txt, c.txt, d.txt e e.txt. Mas deseja copiar cada um deles em sua respectiva pasta, as pastas A, B, C, D e E, ficando cada pasta com apenas seu respectivo arquivo. Para copiar os arquivos de forma eficiente, o usuário pode _______ o Histórico da Área de Transferência, selecionar _______ para que todos estejam no Histórico, acessar a primeira pasta de destino, acionar o atalho por teclado _______ e escolher o arquivo a ser colado. Em seguida, passar para a próxima pasta de destino e repetir o procedimento de acionar o atalho por teclado e selecionar o arquivo a ser colado e, assim sucessivamente, até colar cada arquivo em sua pasta correspondente. Assinale a alternativa que preenche, correta e respectivamente, as lacunas do enunciado.
(A) ativar … cada arquivo na origem individualmente e acionar o atalho Ctrl + C entre cada arquivo selecionado … Ctrl + V
(B) desativar … todos os arquivos na origem ao mesmo tempo e acionar o atalho Ctrl + C … Windows + V
(C) desativar … todos os arquivos na origem ao mesmo tempo e acionar o atalho Ctrl + X … Windows + V
(D) ativar … todos os arquivos na origem ao mesmo tempo e acionar o atalho Ctrl + C … Ctrl + V
(E) ativar … cada arquivo na origem individualmente e acionar o atalho Ctrl + C entre cada arquivo selecionado … Windows + V$q$,'E',19,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave E); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Windows 10: histórico da área de transferência$q$),
(52,$q$Noções Básicas de Informática$q$,$q$Um usuário, por meio do MS-Word 2016, em sua configuração padrão, criou um novo documento vazio e inseriu uma tabela 2x2 vazia. Com o cursor na primeira célula, digitou A, depois pressionou Tab, digitou B, pressionou Tab, digitou C, pressionou Tab, digitou D, pressionou Tab, digitou E, pressionou Tab, digitou F, pressionou Enter, digitou G, pressionou Enter e, por fim, digitou H. Após todas as ações descritas no enunciado, a tabela possui quantas células?
(A) 6
(B) 5
(C) 4
(D) 7
(E) 8$q$,$q$Um usuário, por meio do MS-Word 2016, em sua configuração padrão, criou um novo documento vazio e inseriu uma tabela 2x2 vazia. Com o cursor na primeira célula, digitou A, depois pressionou Tab, digitou B, pressionou Tab, digitou C, pressionou Tab, digitou D, pressionou Tab, digitou E, pressionou Tab, digitou F, pressionou Enter, digitou G, pressionou Enter e, por fim, digitou H. Após todas as ações descritas no enunciado, a tabela possui quantas células?
(A) 6
(B) 5
(C) 4
(D) 7
(E) 8$q$,'A',19,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave A); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Word 2016: tabelas$q$),
(53,$q$Noções Básicas de Informática$q$,$q$A planilha a seguir foi elaborada por meio do MS-Excel 2016, em sua configuração padrão: Assinale a alternativa que apresenta o valor retornado pela fórmula =SE(MÉDIA(A1:C5)=20;MAIOR(A1:C5;10);MENOR(A1:C5;10)) após esta ser colocada na célula A6.
(A) 40
(B) 25
(C) 30
(D) 10
(E) 20$q$,$q$A planilha a seguir foi elaborada por meio do MS-Excel 2016, em sua configuração padrão: Assinale a alternativa que apresenta o valor retornado pela fórmula =SE(MÉDIA(A1:C5)=20;MAIOR(A1:C5;10);MENOR(A1:C5;10)) após esta ser colocada na célula A6.
(A) 40
(B) 25
(C) 30
(D) 10
(E) 20$q$,'A',19,'under_review',false,true,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave A). Mantida em revisão: A questão depende de figura que não consta do caderno em texto (planilha).$q$,$q$Excel 2016: funções SE, MÉDIA, MAIOR e MENOR$q$),
(54,$q$Noções Básicas de Informática$q$,$q$Um soldado elaborou uma apresentação por meio do MS-PowerPoint 2016, em sua configuração padrão, e colocou uma animação para destacar, no momento da apresentação, o nome da cidade relacionada com as ocorrências atendidas, de modo que tal nome, após acionar a animação, aumentaria de tamanho na tela, destacando-o. Esse tipo de animação é do tipo _______ e aparece, no Painel de Animação, com a cor _______. Assinale a alternativa que preenche, correta e respectivamente, as lacunas do enunciado.
(A) trajetória de movimento … azul
(B) entrada … azul
(C) saída … amarela
(D) ênfase … amarela
(E) saída … azul$q$,$q$Um soldado elaborou uma apresentação por meio do MS-PowerPoint 2016, em sua configuração padrão, e colocou uma animação para destacar, no momento da apresentação, o nome da cidade relacionada com as ocorrências atendidas, de modo que tal nome, após acionar a animação, aumentaria de tamanho na tela, destacando-o. Esse tipo de animação é do tipo _______ e aparece, no Painel de Animação, com a cor _______. Assinale a alternativa que preenche, correta e respectivamente, as lacunas do enunciado.
(A) trajetória de movimento … azul
(B) entrada … azul
(C) saída … amarela
(D) ênfase … amarela
(E) saída … azul$q$,'D',20,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave D); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$PowerPoint 2016: animações$q$),
(55,$q$Noções Básicas de Informática$q$,$q$Um soldado, por meio do Gmail, em sua configuração padrão, enviou a seguinte mensagem de e-mail: De: SoldadoA Para: SoldadoB Cc: TenenteA Cco: CoronelA Assunto: coronelB TenenteA ao receber a mensagem de SoldadoA, clicou em Responder e enviou sua mensagem. SoldadoB ao receber a mensagem de SoldadoA, clicou em Responder a Todos e enviou sua mensagem. CoronelA ao receber a mensagem de SoldadoA, clicou em Responder a Todos e enviou sua mensagem. Por fim, todos que receberam a mensagem de SoldadoB, clicaram em Responder e enviaram suas mensagens. Considerando que todos os e-mails foram enviados e recebidos com sucesso, assinale a alternativa com o total de e-mails recebidos, respectivamente, pelos usuários SoldadoA e SoldadoB.
(A) 3 e 3.
(B) 4 e 4.
(C) 4 e 5.
(D) 5 e 5.
(E) 3 e 4.$q$,$q$Um soldado, por meio do Gmail, em sua configuração padrão, enviou a seguinte mensagem de e-mail: De: SoldadoA Para: SoldadoB Cc: TenenteA Cco: CoronelA Assunto: coronelB TenenteA ao receber a mensagem de SoldadoA, clicou em Responder e enviou sua mensagem. SoldadoB ao receber a mensagem de SoldadoA, clicou em Responder a Todos e enviou sua mensagem. CoronelA ao receber a mensagem de SoldadoA, clicou em Responder a Todos e enviou sua mensagem. Por fim, todos que receberam a mensagem de SoldadoB, clicaram em Responder e enviaram suas mensagens. Considerando que todos os e-mails foram enviados e recebidos com sucesso, assinale a alternativa com o total de e-mails recebidos, respectivamente, pelos usuários SoldadoA e SoldadoB.
(A) 3 e 3.
(B) 4 e 4.
(C) 4 e 5.
(D) 5 e 5.
(E) 3 e 4.$q$,'E',20,'active',false,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave E); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Correio eletrônico: Cc, Cco e responder a todos$q$),
(56,$q$Noções de Administração Pública$q$,$q$Como dever estatal, a segurança pública é exercida para a preservação da ordem pública e incolumidade das pessoas e do patrimônio, mantendo-a por meio de sua polícia, subordinada ao Governador, que, no Estado de São Paulo, é integrada pela
(A) Polícia Civil, Polícia Militar e Polícia Penal, apenas.
(B) Polícia Civil, Polícia Militar e Corpo de Bombeiros, apenas.
(C) Polícia Civil, Polícia Militar, Polícia Penal e Corpo de Bombeiros, apenas.
(D) Polícia Civil e Polícia Militar, apenas.
(E) Polícia Civil, Polícia Militar, Polícia Penal, Polícia Ferroviária e Corpo de Bombeiros.$q$,$q$Como dever estatal, a segurança pública é exercida para a preservação da ordem pública e incolumidade das pessoas e do patrimônio, mantendo-a por meio de sua polícia, subordinada ao Governador, que, no Estado de São Paulo, é integrada pela
(A) Polícia Civil, Polícia Militar e Polícia Penal, apenas.
(B) Polícia Civil, Polícia Militar e Corpo de Bombeiros, apenas.
(C) Polícia Civil, Polícia Militar, Polícia Penal e Corpo de Bombeiros, apenas.
(D) Polícia Civil e Polícia Militar, apenas.
(E) Polícia Civil, Polícia Militar, Polícia Penal, Polícia Ferroviária e Corpo de Bombeiros.$q$,'C',20,'under_review',true,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave C). Mantida em revisão: Constituição do Estado de São Paulo: fonte oficial (ALESP) fora da lista de domínios aceitos; vigência não conferida.$q$,$q$Segurança pública: órgãos no Estado de São Paulo$q$),
(57,$q$Noções de Administração Pública$q$,$q$Leda é militar e pensa em se candidatar nas próximas eleições para o cargo de vereadora. Se Leda candidatar-se e tiver
(A) menos de 10 anos de serviço militar, deverá afastar- -se temporariamente da atividade, podendo retornar à carreira militar se não for eleita, por não ter perdido o vínculo.
(B) mais de 10 anos de serviço militar, será agregada pela autoridade superior e, se eleita, passará automaticamente, no ato da diplomação, para a inatividade.
(C) menos de 10 anos de serviço militar, e, se for eleita, havendo compatibilidade de horários, poderá acumular ambos os cargos.
(D) mais de 10 anos de serviço militar, deverá ser afastada imediatamente da atividade, podendo escolher se permanecerá com o vínculo militar ativo ou inativo.
(E) menos de 10 anos de serviço militar, terá a candidatura cassada, pois esse é um dos casos expressamente proibidos pela Constituição Federal brasileira de 1988.$q$,$q$Leda é militar e pensa em se candidatar nas próximas eleições para o cargo de vereadora. Se Leda candidatar-se e tiver
(A) menos de 10 anos de serviço militar, deverá afastar- -se temporariamente da atividade, podendo retornar à carreira militar se não for eleita, por não ter perdido o vínculo.
(B) mais de 10 anos de serviço militar, será agregada pela autoridade superior e, se eleita, passará automaticamente, no ato da diplomação, para a inatividade.
(C) menos de 10 anos de serviço militar, e, se for eleita, havendo compatibilidade de horários, poderá acumular ambos os cargos.
(D) mais de 10 anos de serviço militar, deverá ser afastada imediatamente da atividade, podendo escolher se permanecerá com o vínculo militar ativo ou inativo.
(E) menos de 10 anos de serviço militar, terá a candidatura cassada, pois esse é um dos casos expressamente proibidos pela Constituição Federal brasileira de 1988.$q$,'B',20,'active',true,false,'[{"title": "CF, art. 14, § 8º", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra CF, art. 14, § 8º; chave B confere com o gabarito definitivo. Militar com menos de dez anos afasta-se da atividade; com mais de dez anos é agregado e, se eleito, passa automaticamente para a inatividade no ato da diplomação.$q$,$q$Militar e candidatura a cargo eletivo$q$),
(58,$q$Noções de Administração Pública$q$,$q$Pedro é um militar estadual e vem conjecturando sobre o exercício de outra atividade pública remunerada. Frente a essa suposição de Pedro, é correto afirmar que é
(A) permitida a acumulação com um cargo privativo de profissional da saúde para militares estaduais, independentemente de compatibilidade de horário, desde que haja prevalência da atividade militar.
(B) permitida a acumulação, remunerada ou não remunerada, para militares estaduais, desde que expressamente autorizados pela chefia imediata.
(C) vedada toda e qualquer acumulação remunerada de cargos públicos, mas não de empregos e funções, para militares estaduais.
(D) permitida a acumulação com um cargo de professor, para militares estaduais, desde que haja compatibilidade de horário e com prevalência da atividade militar.
(E) vedada toda e qualquer acumulação remunerada de cargos públicos para militares estaduais.$q$,$q$Pedro é um militar estadual e vem conjecturando sobre o exercício de outra atividade pública remunerada. Frente a essa suposição de Pedro, é correto afirmar que é
(A) permitida a acumulação com um cargo privativo de profissional da saúde para militares estaduais, independentemente de compatibilidade de horário, desde que haja prevalência da atividade militar.
(B) permitida a acumulação, remunerada ou não remunerada, para militares estaduais, desde que expressamente autorizados pela chefia imediata.
(C) vedada toda e qualquer acumulação remunerada de cargos públicos, mas não de empregos e funções, para militares estaduais.
(D) permitida a acumulação com um cargo de professor, para militares estaduais, desde que haja compatibilidade de horário e com prevalência da atividade militar.
(E) vedada toda e qualquer acumulação remunerada de cargos públicos para militares estaduais.$q$,'D',21,'active',true,false,'[{"title": "CF, art. 42, § 3º, e art. 37, XVI", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra CF, art. 42, § 3º, e art. 37, XVI; chave D confere com o gabarito definitivo. Aplica-se aos militares dos Estados o art. 37, XVI (acumulação de cargos, com compatibilidade de horários, incluindo professor), com prevalência da atividade militar.$q$,$q$Militar estadual: acumulação de cargos$q$),
(59,$q$Noções de Administração Pública$q$,$q$Em caso de impedimento do Governador e do Vice-Governador do Estado de São Paulo ou vacância dos respectivos cargos, serão chamados para o cargo de Chefe do Poder Executivo estadual, de forma sucessiva, o
(A) Presidente da Assembleia Legislativa e o Presidente do Tribunal de Justiça, além da realização de eleições no caso de vacância dos cargos de Governador e Vice-Governador.
(B) Presidente do Tribunal de Justiça e o Presidente da Assembleia Legislativa, além da realização de eleições nos casos de impedimento ou vacância do Governador e do Vice-Governador.
(C) Presidente do Tribunal de Justiça e o Presidente da Assembleia Legislativa, além da realização de eleições no caso de vacância dos cargos de Governador e Vice-Governador.
(D) Presidente da Assembleia Legislativa e o Presidente do Tribunal de Justiça, além da realização de eleições nos casos de impedimento ou vacância do Governador e do Vice-Governador.
(E) Presidente da Assembleia Legislativa e o Presidente do Tribunal de Justiça, além da realização de eleições no caso de impedimento do Governador e do Vice-Governador.$q$,$q$Em caso de impedimento do Governador e do Vice-Governador do Estado de São Paulo ou vacância dos respectivos cargos, serão chamados para o cargo de Chefe do Poder Executivo estadual, de forma sucessiva, o
(A) Presidente da Assembleia Legislativa e o Presidente do Tribunal de Justiça, além da realização de eleições no caso de vacância dos cargos de Governador e Vice-Governador.
(B) Presidente do Tribunal de Justiça e o Presidente da Assembleia Legislativa, além da realização de eleições nos casos de impedimento ou vacância do Governador e do Vice-Governador.
(C) Presidente do Tribunal de Justiça e o Presidente da Assembleia Legislativa, além da realização de eleições no caso de vacância dos cargos de Governador e Vice-Governador.
(D) Presidente da Assembleia Legislativa e o Presidente do Tribunal de Justiça, além da realização de eleições nos casos de impedimento ou vacância do Governador e do Vice-Governador.
(E) Presidente da Assembleia Legislativa e o Presidente do Tribunal de Justiça, além da realização de eleições no caso de impedimento do Governador e do Vice-Governador.$q$,'A',21,'under_review',true,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave A). Mantida em revisão: Constituição do Estado de São Paulo: fonte oficial (ALESP) fora da lista de domínios aceitos; vigência não conferida.$q$,$q$Constituição de SP: substituição do Governador$q$),
(60,$q$Noções de Administração Pública$q$,$q$Um cidadão teve negado o acesso à informação por um órgão da Administração Pública do Estado de São Paulo. Mostrando-se em desacordo com a decisão exarada e com base no Decreto no 68.155/2023, o interessado recorreu, no prazo de dez dias,
(A) ao Tribunal de Justiça do Estado (TJ).
(B) à Procuradoria Geral do Estado (PGE).
(C) à Controladoria Geral do Estado (CGE).
(D) ao Ministério Público do Estado (MPE).
(E) ao Tribunal de Contas do Estado (TCE). «REDAÇÃO» Texto 1 A internet revolucionou as nossas vidas. A forma como nos comunicamos, acessamos informações e aprendemos transformou-se. Entre as muitas mudanças, as compras on-line ocupam um lugar de destaque, sobretudo pós-pandemia de covid-19. O que antes exigia sair de casa, procurar lojas e lidar com filas intermináveis, hoje está a um clique de distância. No entanto, se por um lado a facilidade de comprar on-line trouxe mais conforto e acessibilidade, por outro, aumentou as compras por impulso, o que acarreta vários riscos. No ambiente on-line, o vício em compras pode intensificar-se devido à facilidade e conveniência que a internet oferece. Qualquer pessoa com um smartphone ou computador pode acessar lojas virtuais a qualquer momento, em qualquer lugar. Nelas, não há a sensação de julgamento ou desconforto que pode ocorrer numa loja física. Não há um vendedor que observa ou o olhar de um desconhecido, o que cria uma sensação de privacidade, permitindo que o comprador se entregue mais facilmente ao impulso. (Filipa Jardim da Silva. Compras on-line: quando o hábito se transforma em vício e patologia compulsiva. https://saudebemestar.com.pt, 25.10.2024. Adaptado) Texto 2 Comprar pelo celular deixou de ser alternativa e virou hábito. Em um cenário de rotinas cada vez mais aceleradas, os aplicativos de lojas ganharam protagonismo ao oferecer uma experiência simples, rápida e acessível — exatamente o que o consumidor brasileiro busca. É o que revela a pesquisa “Compras por aplicativos e redes sociais — 2025”, realizada pela Confederação Nacional de Dirigentes Lojistas (CNDL). De acordo com o levantamento, 80% dos brasileiros utilizaram aplicativos de lojas para comprar produtos ou serviços nos últimos 12 meses. Esse dado confirma que o aplicativo deixou de ser apenas um canal complementar e passou a ocupar o centro da jornada digital, especialmente entre consumidores que valorizam conveniência e economia de tempo. A principal razão para a preferência pelos aplicativos é objetiva: praticidade e rapidez, citadas por 48% dos entrevistados. Em seguida, aparecem “melhores preços e ofertas” (44%), “não precisar sair de casa” (38%) e “facilidade de acesso” (28%). Esses fatores ajudam a explicar por que o aplicativo se tornou o ambiente preferido para compras recorrentes e de menor complexidade. Em poucos toques, o consumidor compara preços, finaliza o pagamento e acompanha a entrega, tudo com praticidade. Essa pesquisa revela que o consumidor brasileiro não escolheu os aplicativos por modismo, mas por eficiência. Eles oferecem exatamente o que se espera do consumo digital: rapidez, controle e conveniência. (Alex Akira. Praticidade vence: 80% dos brasileiros compraram por aplicativos no último ano. https://cndl.org.br, 03.06.2026. Adaptado) Texto 3 Atualmente, 80% das compras virtuais no Brasil são feitas pelo celular, em um mercado que movimenta R$ 258 bilhões por ano. Nesse cenário, a crise do endividamento no Brasil levanta a questão sobre o papel das compras por impulso no comércio on-line. “Antigamente, nos espaços em que eu frequentava, o problema das compras compulsivas era só meu. Hoje, já vejo como algo geral”, conta Camila Nunes, que alerta sobre o tema em suas redes sociais. Na visão de Nunes, o cenário atual on-line prejudica muito os compulsivos. Ela conta que seu cérebro só a deixava em paz depois de comprar, e que muitos dos itens adquiridos serviam para lidar com a ansiedade. A influenciadora diz que o tema é banalizado por varejistas, que divulgam conteúdos sugerindo que comprar é uma terapia. “Promoções, notificações e recomendações constantes aumentam a vontade de consumir o tempo todo, diminuindo o tempo de pensar antes de comprar. Quanto menor o tempo de análise, maior a chance de a decisão sair do controle e ir para a impulsividade”, pontua a educadora financeira e professora do Instituto de Desenvolvimento Educacional da Fundação Getulio Vargas (FGV-IDE) Ana Paula Hornos. “O ambiente on-line facilita muito a compra por impulso porque tudo é rápido e acessível. Com poucos cliques, a pessoa deixa de simplesmente desejar algo e parte para uma compra impensada”, explica. (Matheus Gouvea de Andrade. Comércio on-line facilita compras por impulso e endividamento. www.dw.com, 05.05.2026. Adaptado) Com base nos textos apresentados e em seus próprios conhecimentos, escreva um texto dissertativo-argumentativo, empregando a norma-padrão da língua portuguesa, sobre o tema: Compras on-line: entre a praticidade e o incentivo ao consumo compulsivo «NÃO ASSINE ESTA FOLHA» «RASCUNHO» «REDAÇÃO» Os rascunhos não serão considerados na correção.$q$,$q$Um cidadão teve negado o acesso à informação por um órgão da Administração Pública do Estado de São Paulo. Mostrando-se em desacordo com a decisão exarada e com base no Decreto no 68.155/2023, o interessado recorreu, no prazo de dez dias,
(A) ao Tribunal de Justiça do Estado (TJ).
(B) à Procuradoria Geral do Estado (PGE).
(C) à Controladoria Geral do Estado (CGE).
(D) ao Ministério Público do Estado (MPE).
(E) ao Tribunal de Contas do Estado (TCE). «REDAÇÃO» Texto 1 A internet revolucionou as nossas vidas. A forma como nos comunicamos, acessamos informações e aprendemos transformou-se. Entre as muitas mudanças, as compras on-line ocupam um lugar de destaque, sobretudo pós-pandemia de covid-19. O que antes exigia sair de casa, procurar lojas e lidar com filas intermináveis, hoje está a um clique de distância. No entanto, se por um lado a facilidade de comprar on-line trouxe mais conforto e acessibilidade, por outro, aumentou as compras por impulso, o que acarreta vários riscos. No ambiente on-line, o vício em compras pode intensificar-se devido à facilidade e conveniência que a internet oferece. Qualquer pessoa com um smartphone ou computador pode acessar lojas virtuais a qualquer momento, em qualquer lugar. Nelas, não há a sensação de julgamento ou desconforto que pode ocorrer numa loja física. Não há um vendedor que observa ou o olhar de um desconhecido, o que cria uma sensação de privacidade, permitindo que o comprador se entregue mais facilmente ao impulso. (Filipa Jardim da Silva. Compras on-line: quando o hábito se transforma em vício e patologia compulsiva. https://saudebemestar.com.pt, 25.10.2024. Adaptado) Texto 2 Comprar pelo celular deixou de ser alternativa e virou hábito. Em um cenário de rotinas cada vez mais aceleradas, os aplicativos de lojas ganharam protagonismo ao oferecer uma experiência simples, rápida e acessível — exatamente o que o consumidor brasileiro busca. É o que revela a pesquisa “Compras por aplicativos e redes sociais — 2025”, realizada pela Confederação Nacional de Dirigentes Lojistas (CNDL). De acordo com o levantamento, 80% dos brasileiros utilizaram aplicativos de lojas para comprar produtos ou serviços nos últimos 12 meses. Esse dado confirma que o aplicativo deixou de ser apenas um canal complementar e passou a ocupar o centro da jornada digital, especialmente entre consumidores que valorizam conveniência e economia de tempo. A principal razão para a preferência pelos aplicativos é objetiva: praticidade e rapidez, citadas por 48% dos entrevistados. Em seguida, aparecem “melhores preços e ofertas” (44%), “não precisar sair de casa” (38%) e “facilidade de acesso” (28%). Esses fatores ajudam a explicar por que o aplicativo se tornou o ambiente preferido para compras recorrentes e de menor complexidade. Em poucos toques, o consumidor compara preços, finaliza o pagamento e acompanha a entrega, tudo com praticidade. Essa pesquisa revela que o consumidor brasileiro não escolheu os aplicativos por modismo, mas por eficiência. Eles oferecem exatamente o que se espera do consumo digital: rapidez, controle e conveniência. (Alex Akira. Praticidade vence: 80% dos brasileiros compraram por aplicativos no último ano. https://cndl.org.br, 03.06.2026. Adaptado) Texto 3 Atualmente, 80% das compras virtuais no Brasil são feitas pelo celular, em um mercado que movimenta R$ 258 bilhões por ano. Nesse cenário, a crise do endividamento no Brasil levanta a questão sobre o papel das compras por impulso no comércio on-line. “Antigamente, nos espaços em que eu frequentava, o problema das compras compulsivas era só meu. Hoje, já vejo como algo geral”, conta Camila Nunes, que alerta sobre o tema em suas redes sociais. Na visão de Nunes, o cenário atual on-line prejudica muito os compulsivos. Ela conta que seu cérebro só a deixava em paz depois de comprar, e que muitos dos itens adquiridos serviam para lidar com a ansiedade. A influenciadora diz que o tema é banalizado por varejistas, que divulgam conteúdos sugerindo que comprar é uma terapia. “Promoções, notificações e recomendações constantes aumentam a vontade de consumir o tempo todo, diminuindo o tempo de pensar antes de comprar. Quanto menor o tempo de análise, maior a chance de a decisão sair do controle e ir para a impulsividade”, pontua a educadora financeira e professora do Instituto de Desenvolvimento Educacional da Fundação Getulio Vargas (FGV-IDE) Ana Paula Hornos. “O ambiente on-line facilita muito a compra por impulso porque tudo é rápido e acessível. Com poucos cliques, a pessoa deixa de simplesmente desejar algo e parte para uma compra impensada”, explica. (Matheus Gouvea de Andrade. Comércio on-line facilita compras por impulso e endividamento. www.dw.com, 05.05.2026. Adaptado) Com base nos textos apresentados e em seus próprios conhecimentos, escreva um texto dissertativo-argumentativo, empregando a norma-padrão da língua portuguesa, sobre o tema: Compras on-line: entre a praticidade e o incentivo ao consumo compulsivo «NÃO ASSINE ESTA FOLHA» «RASCUNHO» «REDAÇÃO» Os rascunhos não serão considerados na correção.$q$,'C',21,'under_review',true,false,null,$q$Importada do caderno 001 e conferida com o gabarito definitivo, Versão 1 (chave C). Mantida em revisão: Decreto estadual SP 68.155/2023: fonte oficial fora da lista de domínios aceitos; vigência não conferida.$q$,$q$Lei de Acesso à Informação: recurso (Decreto estadual 68.155/2023)$q$)
), resolved as (
  select imported.*, qsrc.id question_source_id, asrc.id answer_key_source_id, topic.id syllabus_topic_id
  from imported
  join public.syllabus_editions ed on ed.contest_name='Polícia Militar do Estado de São Paulo' and ed.role_name='Aluno-Soldado PM' and ed.contest_year=2026
  join public.syllabus_topics topic on topic.edition_id=ed.id and topic.discipline=imported.subject and topic.topic_order=1
  join public.content_sources qsrc on qsrc.url='https://www.vunesp.com.br/PMES2601'
  join public.content_sources asrc on asrc.url='https://concursos.policiamilitar.sp.gov.br/wp-content/uploads/2026/10/COMUNICADO-No-DP-031_321_26-Gabarito-Definitivo-da-prova-escrita-Edital-3-321-26.pdf'
)
insert into public.official_exam_questions (
  question_source_id,answer_key_source_id,syllabus_topic_id,current_syllabus_topic_id,contest_name,career_name,exam_board,exam_year,item_number,subject,
  question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,
  legal_basis,law_version_checked_at,legal_audit_completed,review_note,verified_at,tested_topic,state,career_category,role_type
)
select question_source_id,answer_key_source_id,syllabus_topic_id,
  case when legal_basis is not null then syllabus_topic_id end,
  'Polícia Militar do Estado de São Paulo','Aluno-Soldado PM','VUNESP',2026,item_number,subject,
  question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,
  coalesce(legal_basis,'[]'::jsonb),case when legal_basis is not null then now() end,legal_basis is not null,review_note,now(),tested_topic,'SP','Polícia Militar','Soldado'
from resolved
on conflict (contest_name,career_name,exam_year,item_number) do nothing;
insert into public.question_support_texts(id,label,body,contest_name,exam_year,exam_board,source_note) select 'a0331696-bf64-492f-96d6-e5bf738905c5','Texto — Domingo do calulu, Kalaf Epalanga (itens 1 a 8)','Domingo do calulu Há regressos assim. Sem sair do lugar, me dou por regressado a Benguela1 através da cozinha, juntando no refogado restos de uma identidade adormecida. A minha cultura! Afinal, de que sou feito?, ainda ontem me perguntaram; deve ser por causa do sotaque, ou da falta dele. Pode vos parecer disparatado e absurdo, mas a verdade é que me questionam várias vezes sobre a minha angolanidade: há quanto tempo não vais a Angola?, qual foi a última vez que lá foste? A receita nunca me foi ensinada, por isso vou acrescentando, improvisando, tal como o cozinhador João Carlos Silva, tal qual um Avillez, manuseando a faca com a mestria de um samurai. Tenho o tacho de boca larga, inoxidável e um tanto reluzente demais, comparando com aquelas velhas panelas pretas, calcinadas de tanto irem ao fogo, e que passavam de geração em geração, encerrando em si histórias de refeições memoráveis que duravam tardes inteiras. Começo por refogar metade de uma cebola picada em óleo de palma, depois o tomate maduro cortado aos cubos, as postas de corvina seca e fresca, as beringelas aos quadrados, a folha de louro. Deixo repousar sobre o lume brando alguns instantes antes de colocar o resto da cebola e do tomate, assim como os espinafres, que, apesar de aparecerem a substituir as folhas de rama (impossíveis de encontrar fora de Angola), ainda assim quebram o galho. Já cheira a calulu2, já consigo viajar até Benguela. Às vezes, pergunto-me como consigo resistir à distância, eu que nem sou de me entregar à saudade, que vivo bem sem o funge3, a bandeira gastronômica dos angolanos. Não sei responder e foi preciso implorarem-me para cozinhar algo tipicamente angolano para revisitar velhas receitas familiares que agora, tal como um álbum de fotografias, me trazem lugares, rostos, conversas que julgava perdidas. (Kalaf Epalanga. Minha pátria é a língua pretuguesa: Crônicas, 218. Adaptado) Vocabulário: 1 Benguela: província de Angola, na África. 2 calulu: espécie de ensopado de peixe preparado com quiabo, abóbora, beringela, temperos e azeite de dendê. 3 funge: pirão de farinha de mandioca ou milho com um caldo.','Polícia Militar do Estado de São Paulo',2026,'VUNESP','Caderno de prova objetiva PM-SP 2026 (Vunesp, modelo 001), https://www.vunesp.com.br/PMES2601' where not exists (select 1 from public.question_support_texts where label='Texto — Domingo do calulu, Kalaf Epalanga (itens 1 a 8)');
insert into public.question_support_texts(id,label,body,contest_name,exam_year,exam_board,source_note) select 'a2e84e85-3c99-4e18-969d-a7e2931e8b56','Texto — Respeito entre nações, editorial (itens 11 a 16)','Respeito entre nações A Copa do Mundo é muito mais do que uma competição esportiva. A cada quatro anos, ela transforma o futebol em uma linguagem comum, capaz de ser compreendida por pessoas de diferentes países, culturas, religiões e formas de vida. Em um mundo cada vez mais marcado por disputas políticas, desigualdades econômicas e demonstrações de preconceito e separatismo, a competição oferece uma rara oportunidade de encontro simbólico entre as nações. Dentro e fora dos estádios, povos que muitas vezes se conhecem apenas por estereótipos passam a se observar, torcer, admirar e reconhecer uns aos outros. O futebol possui uma força especial porque combina simplicidade e emoção. Suas regras básicas permitem que crianças, trabalhadores, estudantes e idosos acompanhem o jogo com a mesma intensidade, ainda que vivam em realidades muito distintas. Durante a Copa, bandeiras, hinos e camisas nacionais expressam orgulho e pertencimento, mas também revelam a diversidade do planeta. O torcedor celebra sua própria identidade ao mesmo tempo em que entra em contato com a identidade do outro. Assim, a competição ajuda a mostrar que a diferença não precisa ser vista como ameaça: pode ser motivo de curiosidade, respeito e aprendizado. Esse entendimento entre as nações não significa ausência de rivalidade. Pelo contrário, a Copa do Mundo é feita de disputas intensas, vitórias inesquecíveis e derrotas dolorosas. No entanto, quando a rivalidade permanece no campo do jogo, ela se converte em uma forma civilizada de coexistência entre povos geográfica, cultural, historicamente distantes. Onde mais, não sendo em uma competição assim, é possível encontrar tunisianos e japoneses, belgas e iranianos, espanhóis e árabes, uruguaios e cabo-verdianos dividindo um mesmo espaço público? E conhecer histórias de atletas de países com os quais temos pouquíssimo contato — Jordânia, Curaçao, Nova Zelândia —, e ainda torcer por eles? Seleções se enfrentam segundo regras aceitas por todos, árbitros medeiam conflitos, atletas se cumprimentam ao final das partidas e torcedores compartilham espaços públicos. A mensagem simbólica é poderosa: é possível competir sem destruir, defender a própria história sem negar a humanidade do adversário. Por isso, o torneio tem valor para o entendimento entre as nações: ele mostra que a humanidade compartilha emoções básicas, como alegria, frustração, esperança e orgulho. Mostra também que as diferenças culturais podem conviver em uma mesma celebração global. Em tempos de fronteiras rígidas, crises diplomáticas e discursos de intolerância, o futebol recorda que o outro não é apenas rival, estrangeiro ou desconhecido; é alguém que também sofre, vibra e sonha. Nesse sentido, a Copa é uma metáfora do mundo possível: plural, competitivo, imperfeito, mas capaz de reconhecer no encontro entre povos uma oportunidade de respeito, diálogo e paz. (Editorial. https://www.correiobraziliense.com.br/opiniao, 22.06.2026. Adaptado)','Polícia Militar do Estado de São Paulo',2026,'VUNESP','Caderno de prova objetiva PM-SP 2026 (Vunesp, modelo 001), https://www.vunesp.com.br/PMES2601' where not exists (select 1 from public.question_support_texts where label='Texto — Respeito entre nações, editorial (itens 11 a 16)');
insert into public.question_support_texts(id,label,body,contest_name,exam_year,exam_board,source_note) select 'b982b215-00e4-4130-b139-564b835b2acf','Versos — Marília de Dirceu, Tomás Antônio Gonzaga (itens 17 a 20)','Mas tendo tantos dotes de ventura, Só apreço lhes dou, gentil pastora, Depois que o teu afeto me assegura, Que queres do que tenho ser senhora; É bom, minha Marília, é bom ser dono De um rebanho que cubra monte e prado; Porém, gentil pastora, o teu agrado Vale mais que um rebanho e mais que um trono. Graças, Marília bela, Graças à minha estrela! Os teus olhos espalham luz divina, A quem a luz do sol em vão se atreve; Papoila ou rosa delicada e fina Te cobre as faces, que são cor da neve. Os teus cabelos são uns fios d’ouro; Teu lindo corpo bálsamo vapora. Ah! não, não fez o céu, gentil pastora, Para a glória de amor igual tesouro! Graças, Marília bela, Graças à minha estrela! (Tomás Antônio Gonzaga, Obras Completas)','Polícia Militar do Estado de São Paulo',2026,'VUNESP','Caderno de prova objetiva PM-SP 2026 (Vunesp, modelo 001), https://www.vunesp.com.br/PMES2601' where not exists (select 1 from public.question_support_texts where label='Versos — Marília de Dirceu, Tomás Antônio Gonzaga (itens 17 a 20)');
update public.official_exam_questions set support_text_id=(select id from public.question_support_texts where label='Texto — Domingo do calulu, Kalaf Epalanga (itens 1 a 8)' limit 1) where contest_name='Polícia Militar do Estado de São Paulo' and career_name='Aluno-Soldado PM' and exam_year=2026 and item_number in (1,2,3,4,5,6,7,8);
update public.official_exam_questions set support_text_id=(select id from public.question_support_texts where label='Texto — Respeito entre nações, editorial (itens 11 a 16)' limit 1) where contest_name='Polícia Militar do Estado de São Paulo' and career_name='Aluno-Soldado PM' and exam_year=2026 and item_number in (11,12,13,14,15,16);
update public.official_exam_questions set support_text_id=(select id from public.question_support_texts where label='Versos — Marília de Dirceu, Tomás Antônio Gonzaga (itens 17 a 20)' limit 1) where contest_name='Polícia Militar do Estado de São Paulo' and career_name='Aluno-Soldado PM' and exam_year=2026 and item_number in (17,18,19,20);
commit;
