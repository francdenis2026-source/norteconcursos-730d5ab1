UPDATE study_materials SET body_md=body_md || '

## Situações práticas: sociedade e ambiente no Acre

**Cheias:** a elevação do nível dos rios pode interromper acesso a comunidades, escolas e serviços de saúde. Uma questão de prova pode pedir que você relacione hidrografia, defesa civil, transporte e planejamento público. Não trate enchente como fenômeno exclusivamente natural: a vulnerabilidade depende também da ocupação e da infraestrutura.

**Secas e queimadas:** estiagens podem dificultar a navegação e o abastecimento; a fumaça de queimadas prejudica a qualidade do ar e a saúde. As respostas envolvem monitoramento, prevenção, fiscalização e atendimento à população.

**Povos indígenas e comunidades tradicionais:** estudar o território exige considerar direitos, formas de ocupação, proteção ambiental e acesso a políticas públicas. Terras indígenas e unidades de conservação possuem regimes jurídicos próprios: não são categorias idênticas.

**Dica de prova:** ao ler um problema ambiental, identifique o fenômeno, o impacto social e a resposta administrativa adequada. Evite alternativas que apresentem conservação e desenvolvimento como temas necessariamente incompatíveis.
',quiz=quiz || '[{"q":"A elevação do nível dos rios pode afetar o transporte e o acesso a serviços públicos em comunidades acreanas.","a":true,"why":"Certo. Cheias influenciam deslocamento, abastecimento e acesso a saúde e educação, exigindo medidas de defesa civil e planejamento."},{"q":"Terras indígenas e unidades de conservação são categorias jurídicas idênticas e sempre possuem o mesmo regime de gestão.","a":false,"why":"Errado. São instrumentos territoriais com fundamentos e regimes jurídicos próprios. Não se deve confundir proteção dos direitos indígenas com categorias de unidades de conservação."}]'::jsonb,updated_at=now() WHERE slug='acre-sociedade-povos-ambiental' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Situações práticas: sociedade e ambiente no Acre%';
UPDATE study_materials SET body_md=body_md || '

## Treino de porcentagem, proporção e medidas

**Porcentagem e pontos percentuais:** uma taxa que sobe de 10% para 15% aumenta **5 pontos percentuais**, mas cresce 50% em termos relativos, porque (15−10)/10=0,5. A banca frequentemente troca essas duas medidas.

**Regra de três direta:** três cadernos custam R$ 24; cinco cadernos de mesmo preço unitário custam R$ 40. Cada caderno custa 24/3=8 reais, então 5×8=40.

**Regra de três inversa:** seis pessoas concluem uma tarefa em dez dias, mantendo produtividade constante. Se forem quinze pessoas, o tempo estimado é 6×10/15=4 dias. Mais trabalhadores, menos tempo.

**Unidades:** 1 m² equivale a 10.000 cm², porque 1 m=100 cm e a conversão da área eleva o fator ao quadrado. Já 1 m³ equivale a 1.000 litros.

**Dica:** antes de calcular, escreva a unidade da resposta. Se o problema pede área, não entregue metros lineares; se pede volume, não entregue metros quadrados.
',quiz=quiz || '[{"q":"Uma taxa que passou de 20% para 25% aumentou cinco pontos percentuais.","a":true,"why":"Certo. Pontos percentuais correspondem à diferença direta entre taxas: 25−20=5. O aumento relativo, por outro lado, foi 25%."},{"q":"Se 1 metro corresponde a 100 centímetros, então 1 metro quadrado corresponde a 100 centímetros quadrados.","a":false,"why":"Errado. Em área, o fator de conversão é elevado ao quadrado: 1 m²=(100 cm)²=10.000 cm²."}]'::jsonb,updated_at=now() WHERE slug='rlm-acervo-matematica-basica' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Treino de porcentagem, proporção e medidas%';