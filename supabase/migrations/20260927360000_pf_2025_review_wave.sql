-- Onda 1 da revisão de conteúdo: PF 2025 (Agente). Gerado por scripts/gen_pf2025_review.py.
-- Textos-base recuperados do caderno oficial (Cebraspe, Edital 1/2025 PF). Itens jurídicos conferidos
-- no Planalto e no STF em 27/09/2026. Itens 11, 12 e 18 permanecem bloqueados (ver notas).

insert into public.content_sources (source_type,title,issuer,url,status,notes) values
('lei','Lei nº 13.303/2016 – Estatuto das Estatais','Presidência da República','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/lei/l13303.htm','vigente','Texto compilado conferido em 27/09/2026 (arts. 1º, 3º e 4º).'),
('outro','Manual de Redação da Presidência da República','Presidência da República','https://www4.planalto.gov.br/centrodeestudos/assuntos/manual-de-redacao-da-presidencia-da-republica/manual-de-redacao.pdf','vigente','Conferido em 27/09/2026: pronomes de tratamento no endereçamento, vocativo e corpo do texto.')
on conflict (url) do update set checked_at=now(), status=excluded.status, notes=excluded.notes;
-- @@
update public.official_exam_questions set question_text = $q$Texto-base:
Muitas obras cinematográficas e séries televisivas são inspiradas ou baseadas em obras literárias. Inúmeros filmes, desde o surgimento do cinema até a atualidade, seguem transpondo para a tela histórias relatadas nos livros, como atesta a crescente quantidade de best-sellers adaptados para o cinema.
Segundo Carlos Gerbase, cineasta e jornalista brasileiro, a prevalência do estilo narrativo é quase natural, visto que as histórias contadas nos livros e nos filmes são uma forma de compreender a vida como uma progressão de acontecimentos. O autor explica que as histórias têm começo, meio e fim e que, nelas, os acontecimentos levam a outros acontecimentos — assim como em nossas vidas. Logo, as narrativas aproximam o público porque este se identifica nelas. Além disso, livros e filmes permitem viagens por diversos mundos e possibilitam reflexões e compreensões, novos conhecimentos e novas experiências.
Ainda de acordo com Gerbase, quando nos identificamos com determinado personagem, aprendemos a como agir socialmente (ou antissocialmente). Nesse sentido, a literatura funciona como uma espécie de guia universal de boas maneiras para a convivência de comunidades às vezes muito diferentes culturalmente.
Histórias sobre a polícia, segundo Jonathan Nichols-Pethick, acadêmico especialista em mídia e cinema, representam mais do que uma disputa entre o bem e o mal. Elas responderiam a algumas das nossas mais prementes preocupações sociais: preocupações sobre como imaginamos e mantemos um senso de comunidade em uma sociedade vasta e muitas vezes alienante, e também sobre como enxergamos os nossos direitos e as nossas responsabilidades como cidadãos.
De acordo com Nichols-Pethick, o sucesso do gênero policial desde a literatura do século XIX, passando pelo cinema e pela televisão, se justificaria por essa relação estabelecida entre a narrativa policial e os indivíduos, que buscam nela sanar suas preocupações com a segurança ou buscar um senso de justiça.
(Camila Furuzawa. Séries policiais: características e particularidades das narrativas policiais televisivas. In: Vozes & Diálogo, v. 12, n.º 2. Itajaí, SC, jul.-dez./2013, com adaptações.)
Julgue os itens que se seguem, considerando as ideias, as propriedades linguísticas e o vocabulário do texto precedente.

Item: $q$ || question_text, context_review_required=false, review_note=$q$Texto-base recuperado do caderno oficial (Cebraspe, PF 2025, Bloco I). Gabarito definitivo conferido; resposta consistente com o texto.$q$ where exam_year=2025 and item_number=1 and career_name='Agente de Polícia Federal' and question_text not like 'Texto-base:%';
-- @@
update public.official_exam_questions set question_text = $q$Texto-base:
Muitas obras cinematográficas e séries televisivas são inspiradas ou baseadas em obras literárias. Inúmeros filmes, desde o surgimento do cinema até a atualidade, seguem transpondo para a tela histórias relatadas nos livros, como atesta a crescente quantidade de best-sellers adaptados para o cinema.
Segundo Carlos Gerbase, cineasta e jornalista brasileiro, a prevalência do estilo narrativo é quase natural, visto que as histórias contadas nos livros e nos filmes são uma forma de compreender a vida como uma progressão de acontecimentos. O autor explica que as histórias têm começo, meio e fim e que, nelas, os acontecimentos levam a outros acontecimentos — assim como em nossas vidas. Logo, as narrativas aproximam o público porque este se identifica nelas. Além disso, livros e filmes permitem viagens por diversos mundos e possibilitam reflexões e compreensões, novos conhecimentos e novas experiências.
Ainda de acordo com Gerbase, quando nos identificamos com determinado personagem, aprendemos a como agir socialmente (ou antissocialmente). Nesse sentido, a literatura funciona como uma espécie de guia universal de boas maneiras para a convivência de comunidades às vezes muito diferentes culturalmente.
Histórias sobre a polícia, segundo Jonathan Nichols-Pethick, acadêmico especialista em mídia e cinema, representam mais do que uma disputa entre o bem e o mal. Elas responderiam a algumas das nossas mais prementes preocupações sociais: preocupações sobre como imaginamos e mantemos um senso de comunidade em uma sociedade vasta e muitas vezes alienante, e também sobre como enxergamos os nossos direitos e as nossas responsabilidades como cidadãos.
De acordo com Nichols-Pethick, o sucesso do gênero policial desde a literatura do século XIX, passando pelo cinema e pela televisão, se justificaria por essa relação estabelecida entre a narrativa policial e os indivíduos, que buscam nela sanar suas preocupações com a segurança ou buscar um senso de justiça.
(Camila Furuzawa. Séries policiais: características e particularidades das narrativas policiais televisivas. In: Vozes & Diálogo, v. 12, n.º 2. Itajaí, SC, jul.-dez./2013, com adaptações.)
Julgue os itens que se seguem, considerando as ideias, as propriedades linguísticas e o vocabulário do texto precedente.

Item: $q$ || question_text, context_review_required=false, review_note=$q$Texto-base recuperado do caderno oficial (Cebraspe, PF 2025, Bloco I). Gabarito definitivo conferido; resposta consistente com o texto.$q$ where exam_year=2025 and item_number=2 and career_name='Agente de Polícia Federal' and question_text not like 'Texto-base:%';
-- @@
update public.official_exam_questions set question_text = $q$Texto-base:
Muitas obras cinematográficas e séries televisivas são inspiradas ou baseadas em obras literárias. Inúmeros filmes, desde o surgimento do cinema até a atualidade, seguem transpondo para a tela histórias relatadas nos livros, como atesta a crescente quantidade de best-sellers adaptados para o cinema.
Segundo Carlos Gerbase, cineasta e jornalista brasileiro, a prevalência do estilo narrativo é quase natural, visto que as histórias contadas nos livros e nos filmes são uma forma de compreender a vida como uma progressão de acontecimentos. O autor explica que as histórias têm começo, meio e fim e que, nelas, os acontecimentos levam a outros acontecimentos — assim como em nossas vidas. Logo, as narrativas aproximam o público porque este se identifica nelas. Além disso, livros e filmes permitem viagens por diversos mundos e possibilitam reflexões e compreensões, novos conhecimentos e novas experiências.
Ainda de acordo com Gerbase, quando nos identificamos com determinado personagem, aprendemos a como agir socialmente (ou antissocialmente). Nesse sentido, a literatura funciona como uma espécie de guia universal de boas maneiras para a convivência de comunidades às vezes muito diferentes culturalmente.
Histórias sobre a polícia, segundo Jonathan Nichols-Pethick, acadêmico especialista em mídia e cinema, representam mais do que uma disputa entre o bem e o mal. Elas responderiam a algumas das nossas mais prementes preocupações sociais: preocupações sobre como imaginamos e mantemos um senso de comunidade em uma sociedade vasta e muitas vezes alienante, e também sobre como enxergamos os nossos direitos e as nossas responsabilidades como cidadãos.
De acordo com Nichols-Pethick, o sucesso do gênero policial desde a literatura do século XIX, passando pelo cinema e pela televisão, se justificaria por essa relação estabelecida entre a narrativa policial e os indivíduos, que buscam nela sanar suas preocupações com a segurança ou buscar um senso de justiça.
(Camila Furuzawa. Séries policiais: características e particularidades das narrativas policiais televisivas. In: Vozes & Diálogo, v. 12, n.º 2. Itajaí, SC, jul.-dez./2013, com adaptações.)
Julgue os itens que se seguem, considerando as ideias, as propriedades linguísticas e o vocabulário do texto precedente.

Item: $q$ || question_text, context_review_required=false, review_note=$q$Texto-base recuperado do caderno oficial (Cebraspe, PF 2025, Bloco I). Gabarito definitivo conferido; resposta consistente com o texto.$q$ where exam_year=2025 and item_number=3 and career_name='Agente de Polícia Federal' and question_text not like 'Texto-base:%';
-- @@
update public.official_exam_questions set question_text = $q$Texto-base:
Muitas obras cinematográficas e séries televisivas são inspiradas ou baseadas em obras literárias. Inúmeros filmes, desde o surgimento do cinema até a atualidade, seguem transpondo para a tela histórias relatadas nos livros, como atesta a crescente quantidade de best-sellers adaptados para o cinema.
Segundo Carlos Gerbase, cineasta e jornalista brasileiro, a prevalência do estilo narrativo é quase natural, visto que as histórias contadas nos livros e nos filmes são uma forma de compreender a vida como uma progressão de acontecimentos. O autor explica que as histórias têm começo, meio e fim e que, nelas, os acontecimentos levam a outros acontecimentos — assim como em nossas vidas. Logo, as narrativas aproximam o público porque este se identifica nelas. Além disso, livros e filmes permitem viagens por diversos mundos e possibilitam reflexões e compreensões, novos conhecimentos e novas experiências.
Ainda de acordo com Gerbase, quando nos identificamos com determinado personagem, aprendemos a como agir socialmente (ou antissocialmente). Nesse sentido, a literatura funciona como uma espécie de guia universal de boas maneiras para a convivência de comunidades às vezes muito diferentes culturalmente.
Histórias sobre a polícia, segundo Jonathan Nichols-Pethick, acadêmico especialista em mídia e cinema, representam mais do que uma disputa entre o bem e o mal. Elas responderiam a algumas das nossas mais prementes preocupações sociais: preocupações sobre como imaginamos e mantemos um senso de comunidade em uma sociedade vasta e muitas vezes alienante, e também sobre como enxergamos os nossos direitos e as nossas responsabilidades como cidadãos.
De acordo com Nichols-Pethick, o sucesso do gênero policial desde a literatura do século XIX, passando pelo cinema e pela televisão, se justificaria por essa relação estabelecida entre a narrativa policial e os indivíduos, que buscam nela sanar suas preocupações com a segurança ou buscar um senso de justiça.
(Camila Furuzawa. Séries policiais: características e particularidades das narrativas policiais televisivas. In: Vozes & Diálogo, v. 12, n.º 2. Itajaí, SC, jul.-dez./2013, com adaptações.)
Julgue os itens que se seguem, considerando as ideias, as propriedades linguísticas e o vocabulário do texto precedente.

Item: $q$ || question_text, context_review_required=false, review_note=$q$Texto-base recuperado do caderno oficial (Cebraspe, PF 2025, Bloco I). Gabarito definitivo conferido; resposta consistente com o texto.$q$ where exam_year=2025 and item_number=4 and career_name='Agente de Polícia Federal' and question_text not like 'Texto-base:%';
-- @@
update public.official_exam_questions set question_text = $q$Texto-base:
Muitas obras cinematográficas e séries televisivas são inspiradas ou baseadas em obras literárias. Inúmeros filmes, desde o surgimento do cinema até a atualidade, seguem transpondo para a tela histórias relatadas nos livros, como atesta a crescente quantidade de best-sellers adaptados para o cinema.
Segundo Carlos Gerbase, cineasta e jornalista brasileiro, a prevalência do estilo narrativo é quase natural, visto que as histórias contadas nos livros e nos filmes são uma forma de compreender a vida como uma progressão de acontecimentos. O autor explica que as histórias têm começo, meio e fim e que, nelas, os acontecimentos levam a outros acontecimentos — assim como em nossas vidas. Logo, as narrativas aproximam o público porque este se identifica nelas. Além disso, livros e filmes permitem viagens por diversos mundos e possibilitam reflexões e compreensões, novos conhecimentos e novas experiências.
Ainda de acordo com Gerbase, quando nos identificamos com determinado personagem, aprendemos a como agir socialmente (ou antissocialmente). Nesse sentido, a literatura funciona como uma espécie de guia universal de boas maneiras para a convivência de comunidades às vezes muito diferentes culturalmente.
Histórias sobre a polícia, segundo Jonathan Nichols-Pethick, acadêmico especialista em mídia e cinema, representam mais do que uma disputa entre o bem e o mal. Elas responderiam a algumas das nossas mais prementes preocupações sociais: preocupações sobre como imaginamos e mantemos um senso de comunidade em uma sociedade vasta e muitas vezes alienante, e também sobre como enxergamos os nossos direitos e as nossas responsabilidades como cidadãos.
De acordo com Nichols-Pethick, o sucesso do gênero policial desde a literatura do século XIX, passando pelo cinema e pela televisão, se justificaria por essa relação estabelecida entre a narrativa policial e os indivíduos, que buscam nela sanar suas preocupações com a segurança ou buscar um senso de justiça.
(Camila Furuzawa. Séries policiais: características e particularidades das narrativas policiais televisivas. In: Vozes & Diálogo, v. 12, n.º 2. Itajaí, SC, jul.-dez./2013, com adaptações.)
Julgue os itens que se seguem, considerando as ideias, as propriedades linguísticas e o vocabulário do texto precedente.

Item: $q$ || question_text, context_review_required=false, review_note=$q$Texto-base recuperado do caderno oficial (Cebraspe, PF 2025, Bloco I). Gabarito definitivo conferido; resposta consistente com o texto.$q$ where exam_year=2025 and item_number=5 and career_name='Agente de Polícia Federal' and question_text not like 'Texto-base:%';
-- @@
update public.official_exam_questions set question_text = $q$Texto-base:
Muitas obras cinematográficas e séries televisivas são inspiradas ou baseadas em obras literárias. Inúmeros filmes, desde o surgimento do cinema até a atualidade, seguem transpondo para a tela histórias relatadas nos livros, como atesta a crescente quantidade de best-sellers adaptados para o cinema.
Segundo Carlos Gerbase, cineasta e jornalista brasileiro, a prevalência do estilo narrativo é quase natural, visto que as histórias contadas nos livros e nos filmes são uma forma de compreender a vida como uma progressão de acontecimentos. O autor explica que as histórias têm começo, meio e fim e que, nelas, os acontecimentos levam a outros acontecimentos — assim como em nossas vidas. Logo, as narrativas aproximam o público porque este se identifica nelas. Além disso, livros e filmes permitem viagens por diversos mundos e possibilitam reflexões e compreensões, novos conhecimentos e novas experiências.
Ainda de acordo com Gerbase, quando nos identificamos com determinado personagem, aprendemos a como agir socialmente (ou antissocialmente). Nesse sentido, a literatura funciona como uma espécie de guia universal de boas maneiras para a convivência de comunidades às vezes muito diferentes culturalmente.
Histórias sobre a polícia, segundo Jonathan Nichols-Pethick, acadêmico especialista em mídia e cinema, representam mais do que uma disputa entre o bem e o mal. Elas responderiam a algumas das nossas mais prementes preocupações sociais: preocupações sobre como imaginamos e mantemos um senso de comunidade em uma sociedade vasta e muitas vezes alienante, e também sobre como enxergamos os nossos direitos e as nossas responsabilidades como cidadãos.
De acordo com Nichols-Pethick, o sucesso do gênero policial desde a literatura do século XIX, passando pelo cinema e pela televisão, se justificaria por essa relação estabelecida entre a narrativa policial e os indivíduos, que buscam nela sanar suas preocupações com a segurança ou buscar um senso de justiça.
(Camila Furuzawa. Séries policiais: características e particularidades das narrativas policiais televisivas. In: Vozes & Diálogo, v. 12, n.º 2. Itajaí, SC, jul.-dez./2013, com adaptações.)
Julgue os itens que se seguem, considerando as ideias, as propriedades linguísticas e o vocabulário do texto precedente.

Item: $q$ || question_text, context_review_required=false, review_note=$q$Texto-base recuperado do caderno oficial (Cebraspe, PF 2025, Bloco I). Gabarito definitivo conferido; resposta consistente com o texto.$q$ where exam_year=2025 and item_number=6 and career_name='Agente de Polícia Federal' and question_text not like 'Texto-base:%';
-- @@
update public.official_exam_questions set question_text = $q$Texto-base:
Muitas obras cinematográficas e séries televisivas são inspiradas ou baseadas em obras literárias. Inúmeros filmes, desde o surgimento do cinema até a atualidade, seguem transpondo para a tela histórias relatadas nos livros, como atesta a crescente quantidade de best-sellers adaptados para o cinema.
Segundo Carlos Gerbase, cineasta e jornalista brasileiro, a prevalência do estilo narrativo é quase natural, visto que as histórias contadas nos livros e nos filmes são uma forma de compreender a vida como uma progressão de acontecimentos. O autor explica que as histórias têm começo, meio e fim e que, nelas, os acontecimentos levam a outros acontecimentos — assim como em nossas vidas. Logo, as narrativas aproximam o público porque este se identifica nelas. Além disso, livros e filmes permitem viagens por diversos mundos e possibilitam reflexões e compreensões, novos conhecimentos e novas experiências.
Ainda de acordo com Gerbase, quando nos identificamos com determinado personagem, aprendemos a como agir socialmente (ou antissocialmente). Nesse sentido, a literatura funciona como uma espécie de guia universal de boas maneiras para a convivência de comunidades às vezes muito diferentes culturalmente.
Histórias sobre a polícia, segundo Jonathan Nichols-Pethick, acadêmico especialista em mídia e cinema, representam mais do que uma disputa entre o bem e o mal. Elas responderiam a algumas das nossas mais prementes preocupações sociais: preocupações sobre como imaginamos e mantemos um senso de comunidade em uma sociedade vasta e muitas vezes alienante, e também sobre como enxergamos os nossos direitos e as nossas responsabilidades como cidadãos.
De acordo com Nichols-Pethick, o sucesso do gênero policial desde a literatura do século XIX, passando pelo cinema e pela televisão, se justificaria por essa relação estabelecida entre a narrativa policial e os indivíduos, que buscam nela sanar suas preocupações com a segurança ou buscar um senso de justiça.
(Camila Furuzawa. Séries policiais: características e particularidades das narrativas policiais televisivas. In: Vozes & Diálogo, v. 12, n.º 2. Itajaí, SC, jul.-dez./2013, com adaptações.)
Julgue os itens que se seguem, considerando as ideias, as propriedades linguísticas e o vocabulário do texto precedente.

Item: $q$ || question_text, context_review_required=false, review_note=$q$Texto-base recuperado do caderno oficial (Cebraspe, PF 2025, Bloco I). Gabarito definitivo conferido; resposta consistente com o texto.$q$ where exam_year=2025 and item_number=7 and career_name='Agente de Polícia Federal' and question_text not like 'Texto-base:%';
-- @@
update public.official_exam_questions set question_text = $q$Texto-base:
Muitas obras cinematográficas e séries televisivas são inspiradas ou baseadas em obras literárias. Inúmeros filmes, desde o surgimento do cinema até a atualidade, seguem transpondo para a tela histórias relatadas nos livros, como atesta a crescente quantidade de best-sellers adaptados para o cinema.
Segundo Carlos Gerbase, cineasta e jornalista brasileiro, a prevalência do estilo narrativo é quase natural, visto que as histórias contadas nos livros e nos filmes são uma forma de compreender a vida como uma progressão de acontecimentos. O autor explica que as histórias têm começo, meio e fim e que, nelas, os acontecimentos levam a outros acontecimentos — assim como em nossas vidas. Logo, as narrativas aproximam o público porque este se identifica nelas. Além disso, livros e filmes permitem viagens por diversos mundos e possibilitam reflexões e compreensões, novos conhecimentos e novas experiências.
Ainda de acordo com Gerbase, quando nos identificamos com determinado personagem, aprendemos a como agir socialmente (ou antissocialmente). Nesse sentido, a literatura funciona como uma espécie de guia universal de boas maneiras para a convivência de comunidades às vezes muito diferentes culturalmente.
Histórias sobre a polícia, segundo Jonathan Nichols-Pethick, acadêmico especialista em mídia e cinema, representam mais do que uma disputa entre o bem e o mal. Elas responderiam a algumas das nossas mais prementes preocupações sociais: preocupações sobre como imaginamos e mantemos um senso de comunidade em uma sociedade vasta e muitas vezes alienante, e também sobre como enxergamos os nossos direitos e as nossas responsabilidades como cidadãos.
De acordo com Nichols-Pethick, o sucesso do gênero policial desde a literatura do século XIX, passando pelo cinema e pela televisão, se justificaria por essa relação estabelecida entre a narrativa policial e os indivíduos, que buscam nela sanar suas preocupações com a segurança ou buscar um senso de justiça.
(Camila Furuzawa. Séries policiais: características e particularidades das narrativas policiais televisivas. In: Vozes & Diálogo, v. 12, n.º 2. Itajaí, SC, jul.-dez./2013, com adaptações.)
Julgue os itens que se seguem, considerando as ideias, as propriedades linguísticas e o vocabulário do texto precedente.

Item: $q$ || question_text, context_review_required=false, review_note=$q$Texto-base recuperado do caderno oficial (Cebraspe, PF 2025, Bloco I). Gabarito definitivo conferido; resposta consistente com o texto.$q$ where exam_year=2025 and item_number=8 and career_name='Agente de Polícia Federal' and question_text not like 'Texto-base:%';
-- @@
update public.official_exam_questions set question_text = $q$Texto-base:
Julgue os itens a seguir com base no Manual de Redação da Presidência da República.

Item: $q$ || question_text, context_review_required=false, review_note=$q$Gabarito C confere com o Manual de Redação da Presidência da República (Planalto): pronomes de tratamento no endereçamento, no vocativo e no corpo do texto.$q$ where exam_year=2025 and item_number=10 and career_name='Agente de Polícia Federal' and question_text not like 'Texto-base:%';
-- @@
update public.official_exam_questions set question_text = $q$Texto-base:
Durante operação de fiscalização em águas internacionais (alto-mar), uma embarcação brasileira de propriedade privada foi flagrada transportando substâncias entorpecentes. As autoridades estrangeiras permitiram que o Brasil conduzisse a investigação e eventual processo criminal, já que a embarcação estava registrada no Brasil.
Com base na situação hipotética precedente e no disposto no CP, julgue o item abaixo.

Item: $q$ || question_text, context_review_required=false, review_note=$q$Conferido no texto compilado do Código Penal (Planalto) em 27/09/2026: art. 5º, §1º, considera extensão do território nacional as embarcações brasileiras, mercantes ou de propriedade privada, em alto-mar; lei brasileira aplicável, item ERRADO. Gabarito E confere.$q$ where exam_year=2025 and item_number=28 and career_name='Agente de Polícia Federal' and question_text not like 'Texto-base:%';
-- @@
update public.official_exam_questions set question_text = $q$Considerando que de uma população X que se distribui conforme uma distribuição normal com média M e variância V foi retirada uma amostra aleatória simples de tamanho n = 4, denotada como X1, X2, X3, X4, julgue os itens a seguir, a respeito da soma S = X1 + X2 + X3 + X4.

Item: A mediana de S é igual a (X2 + X3)/2.$q$, context_review_required=false, review_note=$q$Base recuperada do caderno. S ~ N(4M, 4V): a mediana de S é 4M, não (X2+X3)/2. Gabarito E confere.$q$ where exam_year=2025 and item_number=45 and career_name='Agente de Polícia Federal';
-- @@
update public.official_exam_questions set question_text = $q$Considerando que de uma população X que se distribui conforme uma distribuição normal com média M e variância V foi retirada uma amostra aleatória simples de tamanho n = 4, denotada como X1, X2, X3, X4, julgue os itens a seguir, a respeito da soma S = X1 + X2 + X3 + X4.

Item: S segue uma distribuição binomial com parâmetro n = 4.$q$, context_review_required=false, review_note=$q$S é normal, não binomial. Gabarito E confere.$q$ where exam_year=2025 and item_number=46 and career_name='Agente de Polícia Federal';
-- @@
update public.official_exam_questions set question_text = $q$Considerando que de uma população X que se distribui conforme uma distribuição normal com média M e variância V foi retirada uma amostra aleatória simples de tamanho n = 4, denotada como X1, X2, X3, X4, julgue os itens a seguir, a respeito da soma S = X1 + X2 + X3 + X4.

Item: A probabilidade de S = 4 × M é zero.$q$, context_review_required=false, review_note=$q$S é variável contínua; P(S = valor pontual) = 0. Gabarito C confere.$q$ where exam_year=2025 and item_number=47 and career_name='Agente de Polícia Federal';
-- @@
update public.official_exam_questions set question_text = $q$Considerando que de uma população X que se distribui conforme uma distribuição normal com média M e variância V foi retirada uma amostra aleatória simples de tamanho n = 4, denotada como X1, X2, X3, X4, julgue os itens a seguir, a respeito da soma S = X1 + X2 + X3 + X4.

Item: O desvio padrão da razão S/√V é igual a 2.$q$, context_review_required=false, review_note=$q$dp(S) = 2√V, logo dp(S/√V) = 2. Gabarito C confere.$q$ where exam_year=2025 and item_number=48 and career_name='Agente de Polícia Federal';
-- @@
update public.official_exam_questions set question_text = $q$Em uma perícia sobre contratos licitatórios, foi analisada a diferença D entre os valores licitados (VL) e os valores efetivamente pagos (VP) para certo tipo de prestação de serviço. Para essa finalidade, selecionou-se uma amostra aleatória simples de 36 contratos, assumindo-se que a população seja descrita por uma distribuição normal. Os resultados mostram que, para a variável D = VL − VP, a média amostral foi R$ 5 mil e o desvio padrão amostral, R$ 3 mil. Além disso, a regressão linear simples da variável VL sobre VP, obtida pelo método de mínimos quadrados ordinários, foi VL = 0,5 + 1,1 × VP.
Com base nos dados apresentados na situação hipotética precedente, julgue os próximos itens.

Item: O coeficiente de correlação linear de Pearson entre as variáveis VL e VP foi igual a 1,1.$q$, context_review_required=false, review_note=$q$Correlação de Pearson não excede 1 em módulo. Gabarito E confere.$q$ where exam_year=2025 and item_number=49 and career_name='Agente de Polícia Federal';
-- @@
update public.official_exam_questions set question_text = $q$Em uma perícia sobre contratos licitatórios, foi analisada a diferença D entre os valores licitados (VL) e os valores efetivamente pagos (VP) para certo tipo de prestação de serviço. Para essa finalidade, selecionou-se uma amostra aleatória simples de 36 contratos, assumindo-se que a população seja descrita por uma distribuição normal. Os resultados mostram que, para a variável D = VL − VP, a média amostral foi R$ 5 mil e o desvio padrão amostral, R$ 3 mil. Além disso, a regressão linear simples da variável VL sobre VP, obtida pelo método de mínimos quadrados ordinários, foi VL = 0,5 + 1,1 × VP.
Com base nos dados apresentados na situação hipotética precedente, julgue os próximos itens.

Item: O intervalo de 95% confiança para a diferença entre as médias populacionais dos valores licitados e dos valores efetivamente pagos foi R$ 5 mil ± R$ 0,5 mil.$q$, context_review_required=false, review_note=$q$EP = 3/√36 = 0,5; com t(35; 95%) ≈ 2,03 a margem é ≈ R$ 1,0 mil, não 0,5. Gabarito E confere.$q$ where exam_year=2025 and item_number=50 and career_name='Agente de Polícia Federal';
-- @@
update public.official_exam_questions set question_text = $q$Em uma perícia sobre contratos licitatórios, foi analisada a diferença D entre os valores licitados (VL) e os valores efetivamente pagos (VP) para certo tipo de prestação de serviço. Para essa finalidade, selecionou-se uma amostra aleatória simples de 36 contratos, assumindo-se que a população seja descrita por uma distribuição normal. Os resultados mostram que, para a variável D = VL − VP, a média amostral foi R$ 5 mil e o desvio padrão amostral, R$ 3 mil. Além disso, a regressão linear simples da variável VL sobre VP, obtida pelo método de mínimos quadrados ordinários, foi VL = 0,5 + 1,1 × VP.
Com base nos dados apresentados na situação hipotética precedente, julgue os próximos itens.

Item: O desvio padrão da variável VL foi superior ao desvio padrão da variável VP.$q$, context_review_required=false, review_note=$q$Inclinação 1,1 = r × (dpVL/dpVP) com |r| ≤ 1, logo dpVL/dpVP ≥ 1,1 > 1. Gabarito C confere.$q$ where exam_year=2025 and item_number=51 and career_name='Agente de Polícia Federal';
-- @@
update public.official_exam_questions set question_text = $q$Julgue o item a seguir, relativo a estruturas lógicas, lógica de argumentação e lógica sentencial.
Considere que, na tabela-verdade a seguir, P, Q e R sejam proposições, → denote o condicional “se... então...”, ∨, o conectivo “ou”, e ~R, a negação da proposição R. Com base nessas considerações, conclui-se que, ao preencher corretamente a última coluna da tabela-verdade, ocorrerão 4 valores V (verdade) e 4 valores F (falso).
Tabela: colunas P, Q, R e P ∨ Q → ~R (última coluna a preencher); linhas (P, Q, R): VVV, VVF, VFV, VFF, FVV, FVF, FFV, FFF.$q$, context_review_required=false, review_note=$q$Tabela recuperada do caderno. (P∨Q)→~R é falsa em VVV, VFV e FVV: 5 V e 3 F. Gabarito E confere.$q$ where exam_year=2025 and item_number=53 and career_name='Agente de Polícia Federal';
-- @@
update public.official_exam_questions set question_text = $q$Considere que um crime foi cometido e três suspeitos desse crime, X, Y e Z, foram intimados e conduzidos a um interrogatório. Nessa ocasião, sobre o crime, X afirmou: “nem Y nem Z são culpados”; Z afirmou: “os culpados foram Y e X”; e Y afirmou: “o culpado foi Z ou X”.
Item: Nessa situação, sabendo-se que todos os suspeitos mentiram, é correto concluir que o culpado do crime é X.$q$, context_review_required=false, review_note=$q$Enunciado completado com o comando do caderno. Se todos mentiram, Z e X são inocentes e o culpado é Y. Gabarito E confere.$q$ where exam_year=2025 and item_number=54 and career_name='Agente de Polícia Federal';
-- @@
update public.official_exam_questions set question_text = $q$Considere que as seguintes proposições sejam verdadeiras.
P: “Se Paulo é parente da vítima, então ele é inocente e estava no exterior no dia do crime”.
Q: “Se Paulo tem o mesmo sobrenome da vítima ou tem o mesmo tipo sanguíneo, então ele é parente da vítima”.
Item: Com base nessas proposições, é correto afirmar que, se Paulo não estava no exterior no dia do crime, então ele não tem o mesmo tipo sanguíneo da vítima.$q$, context_review_required=false, review_note=$q$Enunciado completado. Contrapositiva de P e de Q leva à conclusão do item. Gabarito C confere.$q$ where exam_year=2025 and item_number=55 and career_name='Agente de Polícia Federal';
-- @@
update public.official_exam_questions set question_text = $q$Texto-base:
Em determinado dia, 1.000 veículos de carga, com seus respectivos condutores e cargas, passaram por um posto de fiscalização de fronteira. Desses, 800 estavam com a documentação em situação regular — o veículo, o condutor e a carga —, e 200 apresentavam alguma irregularidade na documentação — do veículo, do condutor ou da carga. Além disso, as placas de todos esses 1.000 veículos foram devidamente registradas.
Tendo como base a situação hipotética apresentada, julgue os itens seguintes.

Item: $q$ || question_text, context_review_required=false, review_note=$q$Base recuperada do caderno. Conferido por cálculo; gabarito oficial confere.$q$ where exam_year=2025 and item_number=57 and career_name='Agente de Polícia Federal' and question_text not like 'Texto-base:%';
-- @@
update public.official_exam_questions set question_text = $q$Texto-base:
Em determinado dia, 1.000 veículos de carga, com seus respectivos condutores e cargas, passaram por um posto de fiscalização de fronteira. Desses, 800 estavam com a documentação em situação regular — o veículo, o condutor e a carga —, e 200 apresentavam alguma irregularidade na documentação — do veículo, do condutor ou da carga. Além disso, as placas de todos esses 1.000 veículos foram devidamente registradas.
Tendo como base a situação hipotética apresentada, julgue os itens seguintes.

Item: $q$ || question_text, context_review_required=false, review_note=$q$Base recuperada do caderno. Conferido por cálculo; gabarito oficial confere.$q$ where exam_year=2025 and item_number=58 and career_name='Agente de Polícia Federal' and question_text not like 'Texto-base:%';
-- @@
update public.official_exam_questions set question_text = $q$Texto-base:
Em determinado dia, 1.000 veículos de carga, com seus respectivos condutores e cargas, passaram por um posto de fiscalização de fronteira. Desses, 800 estavam com a documentação em situação regular — o veículo, o condutor e a carga —, e 200 apresentavam alguma irregularidade na documentação — do veículo, do condutor ou da carga. Além disso, as placas de todos esses 1.000 veículos foram devidamente registradas.
Tendo como base a situação hipotética apresentada, julgue os itens seguintes.

Item: $q$ || question_text, context_review_required=false, review_note=$q$Base recuperada do caderno. Conferido por cálculo; gabarito oficial confere.$q$ where exam_year=2025 and item_number=59 and career_name='Agente de Polícia Federal' and question_text not like 'Texto-base:%';
-- @@
update public.official_exam_questions set question_text = $q$Em determinado dia, 1.000 veículos de carga, com seus respectivos condutores e cargas, passaram por um posto de fiscalização de fronteira. Desses, 800 estavam com a documentação em situação regular — o veículo, o condutor e a carga —, e 200 apresentavam alguma irregularidade na documentação — do veículo, do condutor ou da carga. Além disso, as placas de todos esses 1.000 veículos foram devidamente registradas.
Tendo como base a situação hipotética apresentada, julgue os itens seguintes.

Item: Considere que, entre os veículos em situação irregular, 120 apresentavam problemas na documentação do veículo; 85, na documentação do condutor; e 40, na documentação da carga transportada. Além disso, os veículos com problemas na documentação da carga não apresentavam problemas na documentação do veículo nem na documentação do condutor. Nessa situação, é inferior a 40 a quantidade de veículos que apresentavam, simultaneamente, irregularidades na documentação do veículo e do seu condutor.$q$, context_review_required=false, review_note=$q$Enunciado completado. Veículo ∪ condutor = 200 − 40 = 160; interseção = 120 + 85 − 160 = 45, que não é inferior a 40. Gabarito E confere.$q$ where exam_year=2025 and item_number=60 and career_name='Agente de Polícia Federal';
-- @@
update public.official_exam_questions set question_text = $q$Item: No ambiente Linux, a execução do comando apresentado a seguir atribuirá permissões de leitura, escrita e execução para o proprietário do arquivo policial.pdf, e atribuirá permissões de leitura e execução para grupo e outros usuários.
Comando: chmod 755 policial.pdf$q$, context_review_required=false, review_note=$q$Comando recuperado do caderno. 755 = rwx (dono), r-x (grupo), r-x (outros). Gabarito C confere.$q$ where exam_year=2025 and item_number=81 and career_name='Agente de Polícia Federal';
-- @@
update public.official_exam_questions set question_text = $q$Texto-base:
CREATE TABLE catalogo (
  id_tabela INT, nome_tabela VARCHAR(255), descricao TEXT, colunas TEXT,
  relacionamentos TEXT, regras_negocio TEXT, data_criacao DATE, data_ultima_atualizacao DATE
);
INSERT INTO catalogo VALUES (
  1, 'vendas', 'Registros de vendas realizadas',
  'id_venda INT, data_venda DATE, valor_venda DECIMAL, id_produto INT',
  'id_produto REFERENCES produtos(id)', 'valor_venda > 0', '2023-01-01', '2023-10-05'
);
SELECT * FROM catalogo WHERE nome_tabela = 'vendas';
Com base nas informações do código precedente, julgue os próximos itens.

Item: $q$ || question_text, context_review_required=false, review_note=$q$Código-base recuperado do caderno. A regra de negócio é 'valor_venda > 0' (maior que zero), não menor. Gabarito E confere.$q$ where exam_year=2025 and item_number=92 and career_name='Agente de Polícia Federal' and question_text not like 'Texto-base:%';
-- @@
update public.official_exam_questions set question_text = $q$Texto-base:
Balancete de verificação (saldos em R$) de uma empresa em 31/12 de determinado ano: bancos 95.000; materiais de consumo 4.000; máquinas 9.000; contas a pagar 5.700; capital 100.000; receita de serviços 7.000; despesas com taxas 1.500; despesa com pró-labore 2.000; despesa antecipada 1.200.
Com base nos dados precedentes, relativos ao conjunto completo de saldos contábeis extraídos do balancete de uma empresa em 31/12 de determinado ano, julgue os itens que se seguem.

Item: $q$ || question_text, context_review_required=false, review_note=$q$Balancete recuperado do caderno. Conferido por cálculo: ativo 109.200; passivo circulante 5.700; PL considerando o resultado = 103.500; lucro 3.500. Par enunciado/gabarito consistente. Atenção: a ordem 107–110 varia entre transcrições do caderno; a pontuação usa apenas a chave oficial por número.$q$ where exam_year=2025 and item_number=107 and career_name='Agente de Polícia Federal' and question_text not like 'Texto-base:%';
-- @@
update public.official_exam_questions set question_text = $q$Texto-base:
Balancete de verificação (saldos em R$) de uma empresa em 31/12 de determinado ano: bancos 95.000; materiais de consumo 4.000; máquinas 9.000; contas a pagar 5.700; capital 100.000; receita de serviços 7.000; despesas com taxas 1.500; despesa com pró-labore 2.000; despesa antecipada 1.200.
Com base nos dados precedentes, relativos ao conjunto completo de saldos contábeis extraídos do balancete de uma empresa em 31/12 de determinado ano, julgue os itens que se seguem.

Item: $q$ || question_text, context_review_required=false, review_note=$q$Balancete recuperado do caderno. Conferido por cálculo: ativo 109.200; passivo circulante 5.700; PL considerando o resultado = 103.500; lucro 3.500. Par enunciado/gabarito consistente. Atenção: a ordem 107–110 varia entre transcrições do caderno; a pontuação usa apenas a chave oficial por número.$q$ where exam_year=2025 and item_number=108 and career_name='Agente de Polícia Federal' and question_text not like 'Texto-base:%';
-- @@
update public.official_exam_questions set question_text = $q$Texto-base:
Balancete de verificação (saldos em R$) de uma empresa em 31/12 de determinado ano: bancos 95.000; materiais de consumo 4.000; máquinas 9.000; contas a pagar 5.700; capital 100.000; receita de serviços 7.000; despesas com taxas 1.500; despesa com pró-labore 2.000; despesa antecipada 1.200.
Com base nos dados precedentes, relativos ao conjunto completo de saldos contábeis extraídos do balancete de uma empresa em 31/12 de determinado ano, julgue os itens que se seguem.

Item: $q$ || question_text, context_review_required=false, review_note=$q$Balancete recuperado do caderno. Conferido por cálculo: ativo 109.200; passivo circulante 5.700; PL considerando o resultado = 103.500; lucro 3.500. Par enunciado/gabarito consistente. Atenção: a ordem 107–110 varia entre transcrições do caderno; a pontuação usa apenas a chave oficial por número.$q$ where exam_year=2025 and item_number=109 and career_name='Agente de Polícia Federal' and question_text not like 'Texto-base:%';
-- @@
update public.official_exam_questions set question_text = $q$Texto-base:
Balancete de verificação (saldos em R$) de uma empresa em 31/12 de determinado ano: bancos 95.000; materiais de consumo 4.000; máquinas 9.000; contas a pagar 5.700; capital 100.000; receita de serviços 7.000; despesas com taxas 1.500; despesa com pró-labore 2.000; despesa antecipada 1.200.
Com base nos dados precedentes, relativos ao conjunto completo de saldos contábeis extraídos do balancete de uma empresa em 31/12 de determinado ano, julgue os itens que se seguem.

Item: $q$ || question_text, context_review_required=false, review_note=$q$Balancete recuperado do caderno. Conferido por cálculo: ativo 109.200; passivo circulante 5.700; PL considerando o resultado = 103.500; lucro 3.500. Par enunciado/gabarito consistente. Atenção: a ordem 107–110 varia entre transcrições do caderno; a pontuação usa apenas a chave oficial por número.$q$ where exam_year=2025 and item_number=110 and career_name='Agente de Polícia Federal' and question_text not like 'Texto-base:%';
-- @@
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Lei nº 13.303/2016 – Estatuto das Estatais (arts. 1º, 3º e 4º)','url','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/lei/l13303.htm')), review_note=$q$Conferido no texto compilado da Lei 13.303/2016 (Planalto) em 27/09/2026: empresas públicas e sociedades de economia mista exploram atividade econômica e se distinguem pela forma (S.A. só na mista) e pela composição do capital (100% público na empresa pública). Gabarito C confere.$q$ where exam_year=2025 and item_number=13 and career_name='Agente de Polícia Federal';
-- @@
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Lei nº 9.784/1999, art. 2º','url','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm'),jsonb_build_object('title','Constituição Federal de 1988 – texto compilado (art. 37)','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')), review_note=$q$Conferido em 27/09/2026: o art. 37 da CF não enumera a razoabilidade (princípio implícito na Constituição); a Lei 9.784/1999, art. 2º, a prevê expressamente no processo administrativo federal. A afirmativa trata o princípio como implícito da administração pública, como na Constituição. Gabarito C mantido.$q$ where exam_year=2025 and item_number=16 and career_name='Agente de Polícia Federal';
-- @@
update public.official_exam_questions set legal_review_required=false, legal_audit_completed=true, law_version_checked_at=now(), verified_at=now() where exam_year=2025 and item_number in (13,16,28) and career_name='Agente de Polícia Federal';
-- @@
update public.official_exam_questions set content_status='active' where exam_year=2025 and career_name='Agente de Polícia Federal' and content_status='under_review' and item_number in (1,2,3,4,5,6,7,8,10,28,45,46,47,48,49,50,51,53,54,55,57,58,59,60,81,92,107,108,109,110);
-- @@
update public.official_exam_questions set review_note=$q$Bloqueado por decisão de revisão (27/09/2026): gabarito oficial E diverge da tese vigente do STF (Tema 940, RE 1.027.633: a ação por danos causados por agente público deve ser ajuizada contra o Estado, sendo parte ilegítima o agente). A chave oficial continua valendo para a pontuação, mas a questão não é publicada como treino.$q$ where exam_year=2025 and item_number=12 and career_name='Agente de Polícia Federal';
-- @@
update public.official_exam_questions set review_note=$q$Bloqueado por decisão de revisão (27/09/2026): item de doutrina (atributos do ato administrativo: autoexecutoriedade x imperatividade) sem texto legal que o fundamente; a governança exige fonte oficial vigente. Gabarito E é coerente com a doutrina majoritária, mas não é publicado como treino.$q$ where exam_year=2025 and item_number=11 and career_name='Agente de Polícia Federal';
-- @@
update public.official_exam_questions set review_note=$q$Bloqueado por decisão de revisão (27/09/2026): item de teoria do Estado (forma x sistema de governo) sem texto legal que defina os conceitos; a governança exige fonte oficial vigente. Gabarito E é coerente com a doutrina majoritária, mas não é publicado como treino.$q$ where exam_year=2025 and item_number=18 and career_name='Agente de Polícia Federal';
-- @@
