begin;
update public.study_materials
set title='Constituição Federal — fundamentos, objetivos e princípios (arts. 1º a 4º)', summary='Leitura literal e atualizada dos arts. 1º a 4º da Constituição Federal, com distinção entre fundamentos, objetivos fundamentais, Poderes e relações internacionais.', body_md=$md$## Leitura literal dos arts. 1º a 4º

### Art. 1º — fundamentos da República

A República Federativa do Brasil, formada pela união indissolúvel dos Estados, Municípios e Distrito Federal, constitui-se em Estado Democrático de Direito e tem como fundamentos:

1. soberania;
2. cidadania;
3. dignidade da pessoa humana;
4. valores sociais do trabalho e da livre iniciativa;
5. pluralismo político.

O parágrafo único estabelece que todo o poder emana do povo, que o exerce por meio de representantes eleitos ou diretamente, nos termos da Constituição.

### Art. 2º — Poderes da União

São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário.

### Art. 3º — objetivos fundamentais

São objetivos fundamentais da República Federativa do Brasil:

1. construir uma sociedade livre, justa e solidária;
2. garantir o desenvolvimento nacional;
3. erradicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais;
4. promover o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação.

### Art. 4º — relações internacionais

A República rege-se por independência nacional, prevalência dos direitos humanos, autodeterminação dos povos, não intervenção, igualdade entre os Estados, defesa da paz, solução pacífica dos conflitos, repúdio ao terrorismo e ao racismo, cooperação entre os povos e concessão de asilo político.

O parágrafo único prevê a busca de integração econômica, política, social e cultural dos povos da América Latina.

## Como não confundir as listas

| Artigo | Conteúdo |
|---|---|
| Art. 1º | Fundamentos: soberania, cidadania, dignidade, valores sociais do trabalho e da livre iniciativa e pluralismo político |
| Art. 2º | Legislativo, Executivo e Judiciário, independentes e harmônicos |
| Art. 3º | Sociedade livre, justa e solidária; desenvolvimento; erradicação da pobreza e redução das desigualdades; bem de todos sem discriminação |
| Art. 4º | Princípios das relações internacionais |

> **Regra de prova:** não misture fundamentos do art. 1º com objetivos do art. 3º ou princípios do art. 4º.$md$,
source_note='Revisão integral em 28/10/2026 contra o texto compilado oficial da Constituição Federal e a versão de conferência do STF. A redação foi corrigida para reproduzir com precisão a separação dos arts. 1º a 4º.',
legal_basis='[{"title":"Constituição Federal compilada — Planalto","url":"https://www4.planalto.gov.br/legislacao/legis-federal/constituicao"},{"title":"Constituição Federal atualizada — Câmara dos Deputados","url":"https://www2.camara.leg.br/atividade-legislativa/legislacao/constituicao1988"},{"title":"Constituição no STF — art. 3º","url":"https://portal.stf.jus.br/constituicao-supremo/artigo.asp?abrirArtigo=3&abrirBase=CF"}]'::jsonb,
flashcards='[{"f":"Quais são os cinco fundamentos do art. 1º?","b":"Soberania, cidadania, dignidade da pessoa humana, valores sociais do trabalho e da livre iniciativa e pluralismo político."},{"f":"Quais são os quatro objetivos do art. 3º?","b":"Construir sociedade livre, justa e solidária; garantir o desenvolvimento nacional; erradicar pobreza e marginalização e reduzir desigualdades; promover o bem de todos sem discriminação."},{"f":"Onde aparece a concessão de asilo político?","b":"Entre os princípios das relações internacionais do art. 4º."}]'::jsonb,
quiz='[{"q":"Promover o bem de todos sem preconceitos é fundamento do art. 1º.","a":false,"why":"É objetivo fundamental do art. 3º, IV."},{"q":"Pluralismo político é fundamento da República.","a":true,"why":"Está no art. 1º, V."},{"q":"Concessão de asilo político aparece no art. 4º.","a":true,"why":"É princípio das relações internacionais."}]'::jsonb, updated_at=now()
where slug='direito-constitucional-cf';

update public.study_materials set body_md = body_md || $extra$

## Conferência literal obrigatória — art. 3º

A lista constitucional usa quatro objetivos específicos: construir sociedade livre, justa e solidária; garantir o desenvolvimento nacional; erradicar pobreza e marginalização e reduzir desigualdades; e promover o bem de todos sem discriminação.
$extra$, source_note='Revisão integral em 28/10/2026 contra o texto compilado oficial da Constituição Federal; a distinção entre arts. 1º, 3º e 4º foi reforçada para evitar mistura de listas.', updated_at=now()
where slug='constitucional-principios-fundamentais-federacao-republica';
commit;
