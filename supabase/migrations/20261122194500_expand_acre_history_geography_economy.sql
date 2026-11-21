UPDATE study_materials SET body_md=body_md || '

## Linha do tempo comentada

**Final do século XIX:** a expansão dos seringais atrai trabalhadores e amplia a presença brasileira em área então sob soberania boliviana. A ocupação não apagou a presença anterior dos povos indígenas, que deve ser considerada ao interpretar a formação regional.

**1899–1903:** os conflitos conhecidos como Revolução Acreana envolveram diferentes fases e lideranças; Plácido de Castro destacou-se na fase decisiva. **17 de novembro de 1903:** o Tratado de Petrópolis formalizou a incorporação do Acre ao Brasil mediante compensações e compromissos diplomáticos. **15 de junho de 1962:** a Lei 4.070 elevou o Acre à condição de estado.

**Como a banca cobra:** associe evento, data e consequência. O tratado é marco da incorporação territorial, enquanto a lei de 1962 é marco da transformação do território federal em estado. São fatos separados por décadas.
',quiz=quiz || '[{"q":"A Lei 4.070/1962 está relacionada à transformação do Acre de território federal em estado.","a":true,"why":"Certo. A Lei 4.070, de 15 de junho de 1962, elevou o Acre à categoria de estado. Não confunda esse marco com o Tratado de Petrópolis de 1903."},{"q":"A Revolução Acreana ocorreu depois da elevação do Acre à condição de estado em 1962.","a":false,"why":"Errado. Os conflitos da Revolução Acreana ocorreram entre 1899 e 1903, muito antes da transformação do território federal em estado em 1962."}]'::jsonb,updated_at=now() WHERE slug='acre-historia-formacao-territorio' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Linha do tempo comentada%';
UPDATE study_materials SET body_md=body_md || '

## Leitura de mapa e raciocínio territorial

**Fronteira internacional ou divisa estadual?** Peru e Bolívia são países limítrofes do Acre; Amazonas e Rondônia são estados brasileiros vizinhos. A banca pode misturar essas categorias em uma única alternativa.

**Rios e circulação:** as bacias do Purus e do Juruá ajudam a organizar a leitura do território. Rios são vias de transporte e também condicionam cheias, abastecimento e a localização de comunidades. A BR-364 conecta áreas do interior à capital e a outras regiões, mas não substitui integralmente a circulação fluvial.

**Clima:** a predominância de condições equatoriais quentes e úmidas não impede períodos relativamente mais secos nem episódios de friagem. Em questões, desconfie de afirmações que tratem o clima acreano como invariável ao longo do ano.

**Método de prova:** ao receber um mapa, identifique primeiro a posição do Acre no sudoeste da Região Norte; depois marque os limites internacionais, as divisas estaduais e os principais eixos hidrográficos.
',quiz=quiz || '[{"q":"Amazonas e Rondônia mantêm divisas estaduais com o Acre, enquanto Peru e Bolívia integram suas fronteiras internacionais.","a":true,"why":"Certo. Amazonas e Rondônia são unidades da Federação brasileira; Peru e Bolívia são países vizinhos. A distinção entre divisa e fronteira internacional é frequente em provas."},{"q":"O transporte fluvial deixou de ter importância no Acre porque a BR-364 substituiu todas as rotas por rios.","a":false,"why":"Errado. A rodovia é importante para integração regional, mas os rios continuam relevantes para transporte, abastecimento e acesso a comunidades em várias áreas do Acre."}]'::jsonb,updated_at=now() WHERE slug='acre-geografia-fisica-e-politica' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Leitura de mapa e raciocínio territorial%';
UPDATE study_materials SET body_md=body_md || '

## Economia acreana: como relacionar setores e território

**Extrativismo:** a borracha e a castanha têm importância histórica, social e ambiental. O extrativismo florestal pode integrar cadeias de produtos da sociobiodiversidade e estratégias de geração de renda associadas à conservação, sem representar sozinho toda a economia estadual.

**Agropecuária:** a expansão de atividades rurais deve ser analisada junto com uso da terra, logística, regularização fundiária e impactos socioambientais. **Serviços e administração pública:** são partes relevantes da estrutura econômica contemporânea e ajudam a explicar a concentração de atividades urbanas.

**Logística:** a BR-364 conecta polos urbanos e áreas do interior; em localidades com acesso rodoviário limitado, a navegação fluvial continua importante. Ao interpretar gráficos de PIB setorial, observe ano, unidade, fonte e diferença entre participação relativa e crescimento absoluto.

**Pegadinha:** uma atividade ser historicamente marcante não significa que seja hoje o único setor econômico. Não memorize números de PIB sem identificar o ano de referência e a fonte.
',quiz=quiz || '[{"q":"A importância histórica da borracha não significa que ela seja a única atividade econômica relevante do Acre atualmente.","a":true,"why":"Certo. A economia acreana inclui serviços, administração pública, comércio, agropecuária e outras atividades, além do extrativismo florestal."},{"q":"Para comparar a participação dos setores no PIB acreano, é desnecessário verificar o ano de referência dos dados.","a":false,"why":"Errado. Participações setoriais e valores do PIB variam ao longo do tempo. Comparações confiáveis exigem ano, fonte e unidade de medida compatíveis."}]'::jsonb,updated_at=now() WHERE slug='acre-economia-extrativismo-agropecuaria' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Economia acreana: como relacionar setores e território%';