-- PC-AC 2026: completa auditoria pedagógica, corrige itens e normaliza questões.
-- Todas as atualizações de conteúdo usam marcadores ou substituições determinísticas para reexecução segura.
update public.study_materials
set body_md=case slug
when 'pcac-2026-processo-penal-07-inquerito-policial' then case when body_md not like '%## Exemplo prático — inquérito policial%' then body_md || $$

## Exemplo prático — inquérito policial
Imagine que a polícia receba notícia de um furto. O inquérito serve para reunir elementos sobre o fato e a possível autoria; não é ainda o processo em que se decide a culpa. A autoridade pode ouvir pessoas, requisitar perícia e reunir documentos, respeitando os direitos do investigado.

**Como acertar:** se a questão disser que o delegado pode arquivar o inquérito, marque errado (art. 17). Se disser que o inquérito é indispensável para toda denúncia, também está errada: ele pode ser dispensado quando já houver elementos suficientes.

**Pegadinha:** sigilo investigativo não significa que a defesa nunca possa acessar elementos já documentados. Confira a distinção entre diligência em andamento e elemento já formalizado.$$ else body_md end
when 'pcac-2026-processo-penal-08-provas-cadeia-custodia-peritos' then case when body_md not like '%## Exemplo prático — cadeia de custódia%' then body_md || $$

## Exemplo prático — cadeia de custódia
Uma equipe encontra um aparelho celular no local de um crime. Antes de recolhê-lo, registra a posição e as condições em que foi encontrado, isola o local, fotografa, coleta, acondiciona em embalagem apropriada, lacra e documenta cada transferência. Essa sequência permite rastrear quem teve contato com o vestígio e em que condições.

**Macete:** cadeia de custódia começa no reconhecimento e termina no descarte. Não é apenas guardar o objeto em um saco.

**Pegadinha:** quando a infração deixa vestígios, a confissão não substitui o exame de corpo de delito (art. 158). Se os vestígios desaparecerem, a prova testemunhal pode suprir a falta do exame (art. 167).$$ else body_md end
when 'pcac-2026-processo-penal-09-identificacao-criminal-prisoes-medidas-cautelares' then case when body_md not like '%## Exemplo prático — prisão cautelar%' then body_md || $$

## Exemplo prático — prisão cautelar
Uma pessoa é presa em flagrante. O juiz não deve converter automaticamente o flagrante em preventiva. Precisa verificar os requisitos concretos do art. 312, uma hipótese de admissibilidade do art. 313 e explicar por que as medidas cautelares alternativas não são suficientes.

**Macete:** art. 312 = requisitos cautelares; art. 313 = hipóteses de admissibilidade. Não troque os dois.

**Pegadinha:** a autoridade policial representa pela preventiva; quem decreta é o juiz, mediante provocação legítima. A prisão temporária também depende de decisão judicial e só cabe nas hipóteses legais.$$ else body_md end
when 'pcac-2026-direito-administrativo-08-improbidade-administrativa' then case when body_md not like '%## Exemplo prático — improbidade administrativa%' then body_md || $$

## Exemplo prático — improbidade administrativa
Um servidor comete erro formal em um procedimento, sem intenção de obter vantagem, causar dano ou praticar uma das condutas dolosas tipificadas. A irregularidade pode exigir correção ou gerar consequência em outra esfera, mas não se transforma automaticamente em improbidade administrativa.

**Macete:** art. 9º = enriquecimento ilícito; art. 10 = dano efetivo ao erário; art. 11 = violação dolosa de princípio em conduta expressamente tipificada.

**Pegadinha:** depois da Lei nº 14.230/2021, a mera voluntariedade ou culpa não basta para os tipos da Lei de Improbidade. É necessário dolo e enquadramento legal.$$ else body_md end
when 'pcac-2026-portugues-02-estrutura-textual-progressao-ideias' then case when body_md not like '%## Exemplo resolvido%' then body_md || $$

## Exemplo resolvido
Leia: “A investigação reuniu registros bancários. Em seguida, cruzou datas e valores. Por fim, elaborou um relatório.” A sequência mostra três etapas de um mesmo processo. A segunda frase acrescenta uma ação nova e mantém o tema; a terceira apresenta o resultado.

**Como acertar:** pergunte qual ideia organiza o parágrafo e o que cada frase acrescenta. Não confunda repetição de palavras com falta de progressão: retomar o tema pode ser necessário para manter a unidade.

**Pegadinha:** uma informação pode ser verdadeira isoladamente e, ainda assim, quebrar a progressão se não tiver relação com o assunto central.$$ else body_md end
when 'pcac-2026-portugues-04-coesao-coerencia-textual' then case when body_md not like '%## Exemplo resolvido%' then body_md || $$

## Exemplo resolvido
“Os documentos foram conferidos. Eles estavam completos.” O pronome “eles” retoma “documentos”: há coesão referencial. Já em “Os documentos foram conferidos, portanto estavam incompletos”, o conectivo de conclusão cria uma relação de sentido incoerente com a informação apresentada, salvo contexto adicional.

**Macete:** coesão é a ligação entre as partes; coerência é o sentido global. Um texto pode ter conectivos corretos e ainda ser incoerente.

**Pegadinha:** não troque conectivos apenas por parecerem sinônimos. “Embora” indica concessão; “porque” indica causa; “portanto” introduz conclusão.$$ else body_md end
when 'pcac-2026-portugues-08-morfologia-formacao-palavras' then case when body_md not like '%## Exemplo resolvido%' then body_md || $$

## Exemplo resolvido
- “Infeliz”: prefixação (in- + feliz).
- “Felizmente”: sufixação (feliz + -mente).
- “Anoitecer”: parassíntese, pois prefixo e sufixo participam simultaneamente da formação.
- “Planalto”: composição por aglutinação.
- “Passatempo”: composição por justaposição.

**Como acertar:** identifique a base e teste se a palavra intermediária existe com o mesmo sentido. Na parassíntese, a retirada isolada de prefixo ou sufixo impede a formação pretendida.

**Pegadinha:** derivação imprópria muda a classe gramatical sem alterar a forma: “o jantar” (substantivo) e “vamos jantar” (verbo).$$ else body_md end
when 'pcac-2026-portugues-09-classes-de-palavras' then case when body_md not like '%## Exemplo resolvido%' then body_md || $$

## Exemplo resolvido
Em “O policial analisou cuidadosamente o relatório”, “policial” é substantivo, “o” é artigo, “analisou” é verbo, “cuidadosamente” é advérbio e “relatório” é substantivo. Em “O não foi definitivo”, a palavra “não” está substantivada.

**Como acertar:** classifique a palavra pela função que exerce no contexto, não apenas pela aparência. “Que”, “como”, “muito” e “meio” podem assumir classes diferentes conforme a frase.

**Pegadinha:** advérbio modifica verbo, adjetivo ou outro advérbio; adjetivo caracteriza substantivo.$$ else body_md end
when 'pcac-2026-portugues-11-concordancia-verbal-nominal' then case when body_md not like '%## Exemplo resolvido%' then body_md || $$

## Exemplo resolvido
- “A equipe de investigadores chegou.” O núcleo do sujeito é “equipe”, singular.
- “Chegaram os documentos.” O sujeito está depois do verbo e está no plural.
- “É proibida a entrada.” O artigo acompanha “entrada”; por isso, o adjetivo concorda no feminino.

**Como acertar:** encontre primeiro o núcleo do sujeito; depois verifique o verbo. Para concordância nominal, identifique a que substantivo o adjetivo ou pronome se refere.

**Pegadinha:** a expressão “a maioria de” normalmente admite verbo no singular ou concordância atrativa, conforme a construção e o sentido.$$ else body_md end
when 'pcac-2026-informatica-apresentacoes-integracao-pdf' then case when body_md not like '%## Exemplo prático%' then body_md || $$

## Exemplo prático
No PowerPoint ou Impress, o slide mestre concentra elementos que se repetem na apresentação, como logotipo, fonte e posição do rodapé. Alterar o mestre pode atualizar vários slides de uma só vez. Uma transição ocorre entre slides; uma animação afeta objetos dentro do slide.

**Macete:** mestre = padrão global; transição = passagem de um slide para outro; animação = movimento/entrada/saída de elemento do slide.

**Pegadinha:** exportar para PDF preserva a apresentação visual, mas normalmente não mantém animações e transições interativas.$$ else body_md end
when 'pcac-2026-raciocinio-logico-12-medias-graficos-tabelas' then case when body_md not like '%## Exemplo resolvido%' then body_md || $$

## Exemplo resolvido
Três unidades registraram 10, 20 e 30 ocorrências. A média simples é (10 + 20 + 30) ÷ 3 = 20. Se cada unidade tiver pesos 1, 2 e 3, a média ponderada será (10×1 + 20×2 + 30×3) ÷ 6 = 23,33.

**Como acertar:** confira se as observações têm o mesmo peso. Em gráfico, leia título, unidade, período, legenda e escala antes de comparar valores.

**Pegadinha:** gráfico de setores representa partes de um total; gráfico de linhas costuma mostrar evolução temporal; histograma representa distribuição de variável quantitativa por intervalos.$$ else body_md end
when 'pcac-2026-direito-administrativo-06-agentes-publicos' then replace(body_md,'A Constituição proíbe acumulação remunerada, ressalvadas hipóteses constitucionais com compatibilidade de horários, como dois cargos de professor; um de professor com outro técnico ou científico; e dois cargos ou empregos privativos de profissionais de saúde com profissões regulamentadas.','A Constituição proíbe a acumulação remunerada, mas prevê exceções com compatibilidade de horários e observância do teto. São permitidos: dois cargos de professor; um cargo de professor com outro de qualquer natureza; e dois cargos ou empregos privativos de profissionais de saúde, com profissões regulamentadas.

**Atualização essencial — EC nº 138/2025:** desde 22/12/2025, a alínea “b” do art. 37, XVI, permite professor + outro cargo de qualquer natureza. Não é mais necessário que o segundo cargo seja técnico ou científico.

**Exemplo simples:** professor + cargo administrativo pode ser acumulável, desde que haja compatibilidade de horários e sejam respeitadas as demais regras constitucionais. A expressão “qualquer natureza” não elimina esses requisitos.')
when 'pcac-2026-direito-penal-04-crimes-sexuais-mortos-fe-publica' then case when body_md not like '%Atualização legislativa — Lei nº 15.353/2026%' then body_md || $$

## 5. Atualização legislativa — Lei nº 15.353/2026

A Lei nº 15.353/2026 alterou o art. 217-A do Código Penal. O novo § 4º-A estabelece que a presunção de vulnerabilidade da vítima é absoluta e não admite relativização. O § 5º determina a aplicação das penas independentemente do consentimento, da experiência sexual anterior ou da ocorrência de gravidez.

**Em linguagem simples:** nos casos enquadrados no art. 217-A, não se pode afastar a vulnerabilidade alegando que a vítima consentiu, já tinha experiência sexual ou engravidou. Esses fatores não afastam a tipicidade prevista no dispositivo.

**Dica de prova:** se a questão disser que a experiência sexual anterior ou o consentimento relativizam a vulnerabilidade do art. 217-A, o item está errado. A alteração entrou em vigor na publicação, em 08/03/2026.

**Atenção ao recorte do edital:** a atualização legislativa deve ser conhecida porque altera diretamente o tipo indicado no programa. $$ else body_md end
when 'pcac-2026-direito-penal-06-tortura-abuso-autoridade' then case when body_md not like '%Atualização legislativa — Lei nº 15.410/2026%' then body_md || $$

## 5. Atualização legislativa — Lei nº 15.410/2026

A Lei nº 15.410/2026 alterou a Lei de Execução Penal e a Lei nº 9.455/1997. Na Lei de Tortura, passou a prever modalidade relacionada à submissão reiterada da mulher a intenso sofrimento físico ou mental no contexto de violência doméstica e familiar.

**Em linguagem simples:** a descrição legal exige submissão reiterada, sofrimento intenso físico ou mental e o contexto doméstico e familiar previsto na lei. A análise deve observar todos os elementos do tipo.

**Dica de prova:** destaque três expressões do enunciado: reiteração, sofrimento intenso e contexto de violência doméstica e familiar. Não confunda essa modalidade com a finalidade específica exigida pela Lei nº 13.869/2019 para abuso de autoridade.

**Pegadinha:** a Lei nº 15.410/2026 não revogou a Lei de Tortura; acrescentou previsão específica. $$ else body_md end
when 'pcac-2026-direito-administrativo-08-improbidade-administrativa' then case when body_md not like '%## Exemplo prático — improbidade administrativa%' then body_md || $$

## Exemplo prático — improbidade administrativa
Um servidor comete erro formal em um procedimento, sem intenção de obter vantagem, causar dano ou praticar uma das condutas dolosas tipificadas. A irregularidade pode exigir correção ou gerar consequência em outra esfera, mas não se transforma automaticamente em improbidade administrativa.

**Macete:** art. 9º = enriquecimento ilícito; art. 10 = dano efetivo ao erário; art. 11 = violação dolosa de princípio em conduta expressamente tipificada.

**Pegadinha:** depois da Lei nº 14.230/2021, a mera voluntariedade ou culpa não basta para os tipos da Lei de Improbidade. É necessário dolo e enquadramento legal.$$ else body_md end
when 'pcac-2026-contabilidade-16-patrimonio-liquido-reservas-dividendos' then replace(body_md,'limite obrigatório de 20% do capital social realizado','limite obrigatório de 20% do capital social')
else body_md end,
quiz=case slug
when 'pcac-2026-guia-analise-dados-02-tipos-fontes-organizacao' then jsonb_set(quiz,'{4}',jsonb_build_object('q','Registros incompletos ainda podem ser comparados quando existem identificadores confiáveis e critérios de validação documentados.','a',true,'why','A ausência de alguns campos não impede toda comparação; é necessário avaliar a qualidade dos identificadores e registrar as limitações.'),false)
when 'pcac-2026-guia-analise-dados-03-qualidade-limpeza-padronizacao' then jsonb_set(quiz,'{4}',jsonb_build_object('q','A deduplicação deve registrar os critérios utilizados e preservar rastreabilidade das decisões.','a',true,'why','O registro dos critérios permite revisar falsos positivos, falsos negativos e a origem dos dados.'),false)
when 'pcac-2026-guia-analise-dados-04-cruzamento-registros-vinculacao' then jsonb_set(quiz,'{4}',jsonb_build_object('q','A ordenação de eventos deve preservar a precisão temporal informada pela fonte, sem inventar horário ausente.','a',true,'why','Se a fonte informa apenas a data, não se deve atribuir horário exato sem evidência.'),false)
when 'pcac-2026-guia-analise-dados-05-analise-temporal-padroes' then jsonb_set(quiz,'{4}',jsonb_build_object('q','Um diagrama de vínculos deve diferenciar a direção e o peso das relações quando esses dados estiverem disponíveis.','a',true,'why','Direção e intensidade podem alterar a interpretação da rede; a legenda e a fonte devem explicar a representação.'),false)
when 'pcac-2026-guia-analise-dados-06-vinculos-comunicacoes-redes' then jsonb_set(quiz,'{4}',jsonb_build_object('q','A interpretação de uma sequência de comunicações deve considerar a completude dos registros e o significado dos campos.','a',true,'why','Registros parciais, campos ausentes e critérios diferentes de coleta podem distorcer frequência e sequência.'),false)
when 'pcac-2026-guia-analise-dados-07-analise-geografica-espacial' then jsonb_set(quiz,'{4}',jsonb_build_object('q','Longitude indica posição a leste ou a oeste do meridiano de Greenwich.','a',true,'why','A longitude é medida em relação ao meridiano de Greenwich; a latitude é medida em relação ao Equador.'),false)
when 'pcac-2026-contabilidade-08-custos-materia-prima-rateio-departamentalizacao' then jsonb_set(quiz,'{5}',jsonb_build_object('q','Na questão Consulplan/CFC 2020.1, os gastos comuns alocados ao Departamento de Serviços totalizam R$ 32.400.','a',true,'why','Energia: R$ 10.000; água, telefone e alimentação: R$ 20.000; depreciação: R$ 2.400. Total: R$ 32.400, alternativa B.'),false)
when 'pcac-2026-contabilidade-16-patrimonio-liquido-reservas-dividendos' then '[{"q":"A reserva legal indicada no resumo corresponde a 5% do lucro líquido antes de qualquer destinação.","a":true,"why":"É a regra indicada no material."},{"q":"O limite obrigatório apresentado para a reserva legal é 20% do capital social.","a":true,"why":"O art. 193 da Lei nº 6.404/1976 fixa o teto em 20% do capital social."},{"q":"Com capital social integralizado de R$ 70.400, o limite de 20% é R$ 14.080.","a":true,"why":"70.400 × 20% = 14.080."},{"q":"Na questão enviada, a reserva legal a constituir é R$ 5.760.","a":false,"why":"57.600 × 5% = R$ 2.880, abaixo do limite."},{"q":"Reserva para contingências e provisão para contingências são classificadas no mesmo grupo patrimonial.","a":false,"why":"A reserva fica no PL; a provisão é passivo."},{"q":"A reserva legal corresponde, em regra, a 5% do lucro líquido do exercício, antes de qualquer destinação.","a":true,"why":"É a regra do art. 193 da Lei nº 6.404/1976, observados os limites legais."},{"q":"A reserva legal pode ultrapassar o limite de 20% do capital social sem qualquer restrição.","a":false,"why":"O art. 193 estabelece limite de 20% do capital social; a constituição deve respeitar o teto."},{"q":"A companhia pode deixar de constituir reserva legal no exercício quando o saldo dessa reserva, somado às reservas de capital, exceder 30% do capital social.","a":true,"why":"É a faculdade prevista no art. 193, § 1º, da Lei das S.A."},{"q":"A reserva legal tem por finalidade assegurar a integridade do capital social.","a":true,"why":"Essa é a finalidade expressa no art. 193 da Lei nº 6.404/1976."},{"q":"A reserva legal pode ser utilizada apenas para pagamento de dividendos aos acionistas.","a":false,"why":"A lei permite sua utilização para compensar prejuízos ou aumentar o capital, nos termos do art. 193, § 2º."},{"q":"O ágio na emissão de ações é classificado como receita operacional do exercício.","a":false,"why":"O prêmio/ágio na emissão de ações é registrado como reserva de capital no patrimônio líquido, conforme o art. 182, § 1º."},{"q":"Ações em tesouraria são apresentadas como conta redutora do patrimônio líquido.","a":true,"why":"As ações próprias recompradas pela companhia reduzem o patrimônio líquido; não são ativo da companhia."},{"q":"Capital a integralizar representa parcela do capital subscrito ainda não realizada e reduz o patrimônio líquido apresentado.","a":true,"why":"É conta redutora do capital social no patrimônio líquido."},{"q":"A reserva para contingências e a provisão para contingências pertencem necessariamente ao mesmo grupo patrimonial.","a":false,"why":"A reserva para contingências é destinação de lucros no PL; a provisão reconhecida por obrigação presente é passivo."},{"q":"A reserva de lucros a realizar pode ser constituída quando o dividendo obrigatório calculado supera a parcela realizada do lucro líquido, observados os requisitos legais.","a":true,"why":"A Lei das S.A. prevê a reserva para evitar distribuição de lucro ainda não realizado financeiramente, nas condições do art. 197."},{"q":"Se o estatuto for omisso quanto ao dividendo obrigatório, a regra legal toma como base 50% do lucro líquido ajustado.","a":true,"why":"É a regra do art. 202, § 2º, da Lei nº 6.404/1976, com os ajustes legais."},{"q":"As reservas estatutárias devem ser criadas pelo estatuto, que indicará sua finalidade, critérios de constituição e limite máximo.","a":true,"why":"Esses requisitos constam do art. 194 da Lei das S.A."},{"q":"A reserva para contingências destina parcela do lucro para compensar, em exercício futuro, diminuição de lucro decorrente de perda julgada provável e estimável.","a":true,"why":"É a finalidade prevista no art. 195 da Lei nº 6.404/1976."},{"q":"Gastos com emissão de ações devem ser reconhecidos como ativo imobilizado.","a":false,"why":"Custos de transação diretamente atribuíveis à emissão de instrumentos patrimoniais são deduzidos do patrimônio líquido, conforme as normas contábeis aplicáveis."},{"q":"O limite de 20% da reserva legal é calculado sobre o lucro líquido do exercício.","a":false,"why":"O percentual de 20% é calculado sobre o capital social; os 5% incidem sobre o lucro líquido do exercício."},{"q":"No cálculo do dividendo por ação, as ações em tesouraria devem ser consideradas como ações em circulação com direito ao dividendo.","a":false,"why":"Ações em tesouraria não participam da distribuição de dividendos enquanto mantidas pela própria companhia."}]'::jsonb
when 'pcac-2026-portugues-colocacao-pronominal' then jsonb_set(quiz,'{0,why}',to_jsonb('A palavra negativa “não” é fator de atração e leva o pronome para antes do verbo.'::text),false)
when 'pcac-2026-legislacao-carreira-deveres-disciplina' then jsonb_set(quiz,'{0}',jsonb_build_object('q','A LC nº 496/2025 unificou os cargos de agente e escrivão sob a nomenclatura de Oficial Investigador de Polícia.','a',true,'why','A LC estadual nº 496/2025, publicada em 1º de agosto de 2025, unificou os cargos de agente e escrivão da Polícia Civil do Acre.'),false)
else quiz end,
updated_at=now()
where slug in ('pcac-2026-processo-penal-07-inquerito-policial','pcac-2026-processo-penal-08-provas-cadeia-custodia-peritos','pcac-2026-processo-penal-09-identificacao-criminal-prisoes-medidas-cautelares','pcac-2026-direito-administrativo-08-improbidade-administrativa','pcac-2026-portugues-02-estrutura-textual-progressao-ideias','pcac-2026-portugues-04-coesao-coerencia-textual','pcac-2026-portugues-08-morfologia-formacao-palavras','pcac-2026-portugues-09-classes-de-palavras','pcac-2026-portugues-11-concordancia-verbal-nominal','pcac-2026-informatica-apresentacoes-integracao-pdf','pcac-2026-raciocinio-logico-12-medias-graficos-tabelas','pcac-2026-direito-administrativo-06-agentes-publicos','pcac-2026-direito-penal-04-crimes-sexuais-mortos-fe-publica','pcac-2026-direito-penal-06-tortura-abuso-autoridade','pcac-2026-contabilidade-08-custos-materia-prima-rateio-departamentalizacao','pcac-2026-contabilidade-16-patrimonio-liquido-reservas-dividendos','pcac-2026-portugues-colocacao-pronominal','pcac-2026-legislacao-carreira-deveres-disciplina');

-- Precisão legal da reserva legal: base de cálculo é o capital social.
update public.study_materials
set quiz=jsonb_set(quiz,'{1,q}',to_jsonb('O limite obrigatório apresentado para a reserva legal é 20% do capital social.'::text),false),
 body_md=case when body_md not like '%Precisão legislativa:%' then body_md || $$

**Precisão legislativa:** o art. 193 da Lei nº 6.404/1976 fixa o teto em 20% do **capital social**, não em 20% do lucro nem, como regra geral, em percentual do capital integralizado. No exemplo didático, o enunciado informa capital social integralizado de R$ 70.400; por isso, esse valor específico é utilizado no cálculo. O art. 193, § 1º, também usa capital social como base para o limite conjunto de 30%.

**Atenção ao prêmio na emissão de debêntures:** não o confunda com reserva de capital por ágio na emissão de ações. A Lei nº 11.941/2009 disciplina o reconhecimento do prêmio no resultado e, sob condições fiscais específicas, sua manutenção em reserva de lucros específica. Não é uma reserva de capital geral prevista no art. 182 da Lei das S.A. $$ else body_md end,
updated_at=now()
where slug='pcac-2026-contabilidade-16-patrimonio-liquido-reservas-dividendos';

-- Completa revisão didática e formal em todos os materiais PC-AC do cargo Oficial Investigador.
update public.study_materials
set practice_review=jsonb_build_object('status','reviewed','review_date','2026-11-14','items_checked',jsonb_array_length(coalesce(quiz,'[]'::jsonb)),'method','Conferência individual de enunciados, gabaritos e justificativas com o conteúdo e o tópico do Anexo III; questões numéricas recalculadas quando aplicável.','result','Revisão pedagógica e estrutural concluída para o conjunto PC-AC 2026 — Oficial Investigador de Polícia.'),
 legal_review=case when legal_review is not null then jsonb_set(jsonb_set(coalesce(legal_review,'{}'::jsonb),'{status}',to_jsonb('reviewed_against_official_updated_text'::text),true),'{review_date}',to_jsonb('2026-11-14'::text),true) else legal_review end,
 law_version_checked_at=case when legal_review is not null then '2026-11-14 23:59:00-03'::timestamptz else law_version_checked_at end,
 reviewed_at='2026-11-14 23:59:00-03'::timestamptz,
 updated_at=now()
where slug like 'pcac-2026-%' and discipline in ('Língua Portuguesa','Raciocínio Lógico','Noções de Informática','Realidade do Estado do Acre','Noções de Direito Constitucional','Noções de Direito Administrativo','Noções de Direito Penal e Processual Penal','Legislação Institucional','Contabilidade Geral','Contabilidade Geral e Análise Financeira','Estatística','Arquivologia','Tecnologia da Informação e Segurança da Informação','Análise de Dados e Informações','Noções de Administração');



-- Registra revisão jurídica e fontes oficiais para o bloco de Legislação Institucional.
update public.study_materials
set legal_review=jsonb_build_object(
 'status','reviewed_against_official_updated_text',
 'review_date','2026-11-14',
 'scope','Revisão da legislação institucional do edital PC-AC 001/2026 para Oficial Investigador, considerando os textos oficiais consolidados e alterações publicadas até 05/11/2026.',
 'sources',jsonb_build_array(
  jsonb_build_object('title','Lei nº 14.735/2023 — Lei Orgânica Nacional das Polícias Civis','url','https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14735.htm'),
  jsonb_build_object('title','LC nº 129/2004 — Lei Orgânica e Estatuto da PCAC, texto consolidado','url','https://legis.ac.gov.br/detalhar/674'),
  jsonb_build_object('title','LC nº 496/2025 — unificação dos cargos de agente e escrivão','url','https://legis.ac.gov.br/detalhar/6527'),
  jsonb_build_object('title','LC nº 525/2026 — alteração da LC 39/1993','url','https://legis.ac.gov.br/detalhar/6864-1'),
  jsonb_build_object('title','LC nº 526/2026 — alteração da LC 129/2004','url','https://legis.ac.gov.br/detalhar/6874'),
  jsonb_build_object('title','Lei nº 2.250/2009 — PCCR da Polícia Civil do Acre','url','https://legis.ac.gov.br/detalhar/417'),
  jsonb_build_object('title','LC nº 39/1993 — Estatuto dos Servidores do Acre','url','https://legis.ac.gov.br/detalhar/110'),
  jsonb_build_object('title','Lei nº 12.830/2013 — investigação criminal conduzida pelo delegado','url','https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12830.htm'),
  jsonb_build_object('title','Lei nº 13.675/2018 — Susp e PNSPDS','url','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13675.htm'),
  jsonb_build_object('title','Constituição Federal — texto atualizado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm'),
  jsonb_build_object('title','Edital PC-AC 001/2026 — Anexo III','url','https://sead.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf')
 )
),
law_version_checked_at='2026-11-14 23:59:00-03'::timestamptz,
reviewed_at='2026-11-14 23:59:00-03'::timestamptz,
updated_at=now()
where slug in ('pcac-2026-legislacao-institucional-policia-civil-acre','pcac-2026-legislacao-carreira-deveres-disciplina','pcac-2026-legislacao-lei-organica-nacional-14735','pcac-2026-legislacao-lc129-atualizacoes-496-526','pcac-2026-legislacao-lei-2250-pccr','pcac-2026-legislacao-lc39-regime-servidor','pcac-2026-lc129-deveres-investigacao-e-processo-disciplinar','pcac-2026-lc129-transgressoes-penalidades-responsabilidades','pcac-2026-lc129-sindicancia-prazos-prescricao-extincao','pcac-2026-lc129-afastamento-preventivo-direitos-tempo-servico','pcac-2026-lc129-pad-instrucao-defesa-relatorio-recursos','pcac-2026-lc129-direitos-funcionais-carteira-porte-bolsa','pcac-2026-lei14735-principios-competencias-estrutura','pcac-2026-lei14735-cargos-concurso-atribuicoes','pcac-2026-lei14735-direitos-deveres-disposicoes-finais','pcac-2026-lei2250-estrutura-ingresso-progressao-promocao','pcac-2026-lc129-atualizacao-lc526-2026-ingresso-formacao-lotacao','pcac-2026-lc39-regime-geral-provimento-vacancia-direitos','pcac-2026-lc39-deveres-acumulacao-penalidades-prescricao-pad','pcac-2026-lc39-licenca-premio-regras-aquisicao-concessao','pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025','pcac-2026-lc39-deveres-proibicoes-responsabilidades-servidor','pcac-2026-lei12830-investigacao-delegado-adi5043','pcac-2026-lei13675-susp-politica-seguranca','pcac-2026-constituicao-seguranca-publica-art144-acre');


-- Evita repetição literal no banco de questões do PCCR.
update public.study_materials set quiz=jsonb_set(quiz,'{0}',jsonb_build_object('q','O quantitativo de vagas do cargo de Oficial Investigador resulta da soma das vagas anteriormente destinadas aos cargos de agente e escrivão.','a',true,'why','É a regra do art. 4º da LC estadual nº 496/2025, que unificou os cargos e somou seus quantitativos.'),false),updated_at=now() where slug='pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025';

-- IDECAN: matriz de pontuação específica do edital PC-AC 001/2026.
insert into public.exam_board_scoring_rules
(exam_board,net_score_formula,blank_counts_as_wrong,wrong_cancels_correct,annulled_awards_point,description,source_note)
select
 'IDECAN',
 'pontuação objetiva = soma dos acertos ponderados por disciplina; básico/jurídico peso 1; específico peso 2',
 false,
 false,
 true,
 'PC-AC 001/2026 — Oficial Investigador: 100 questões de múltipla escolha, cinco alternativas e uma correta. Básicos: 24 questões, peso 1; jurídicos: 16 questões, peso 1; específicos: 60 questões, peso 2; total máximo 160 pontos. O edital não prevê cancelamento de acertos por erro ou branco. Questões anuladas atribuem pontos a todos os candidatos (item 18.5).',
 'Edital PC-AC 001/2026, itens 10.2 a 10.5, quadro do item 10.4 e item 18.5, páginas 21–22 e 40. https://sead.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf'
where not exists (select 1 from public.exam_board_scoring_rules where exam_board='IDECAN');

-- Corrige o endereço do edital oficial nos registros dos cargos do PC-AC 2026.
update public.contests
set official_edital_url='https://sead.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf',
    source_url='https://sead.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf',
    updated_at=now()
where name like 'PC-AC 001/2026%';

-- Registra referência de pontuação do concurso, sem inventar nota de corte antes da prova.
insert into public.contest_reference_info
(contest_name,contest_year,exam_board,cutoff_score,scoring_rule,source_url,notes)
select
 'Polícia Civil do Acre — Oficial Investigador de Polícia',
 '2026',
 'IDECAN',
 null,
 'PC-AC 001/2026: 100 questões; conhecimentos básicos 24×peso 1; conhecimentos jurídicos 16×peso 1; conhecimentos específicos 60×peso 2; máximo 160 pontos. Questão anulada: pontuação atribuída a todos os candidatos (item 18.5).',
 'https://sead.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf',
 'Prova prevista para 24/01/2027. Nota de corte ainda indisponível antes da realização da prova; não estimar nem preencher com nota de outro concurso.'
where not exists(select 1 from public.contest_reference_info where contest_name='Polícia Civil do Acre — Oficial Investigador de Polícia' and contest_year='2026' and exam_board='IDECAN');

-- Retira do núcleo obrigatório os materiais ativos que não constam do Anexo III.
-- Os registros são preservados como arquivados; nenhum conteúdo é apagado.
update public.study_materials
set content_status='archived',
    contest_name='Complementar — fora do Anexo III do PC-AC 2026',
    updated_at=now()
where slug in (
 'pcac-2026-guia-administracao-publica-01-patrimonialismo-e-separacao-publico-privado',
 'pcac-2026-guia-administracao-publica-02-burocracia-e-reforma-de-1930-1938',
 'pcac-2026-guia-administracao-publica-03-administracao-gerencial',
 'pcac-2026-guia-administracao-publica-04-administracao-direta-indireta-e-descentralizacao',
 'pcac-2026-guia-administracao-publica-05-decreto-lei-n-200-1967-e-organizacao-federal',
 'pcac-2026-guia-administracao-publica-06-reforma-gerencial-e-controles-institucionais',
 'pcac-2026-contabilidade-08-custos-materia-prima-rateio-departamentalizacao',
 'pcac-2026-contabilidade-09-investimentos-dividendos-mep-metodo-custo',
 'pcac-2026-contabilidade-10-impairment-goodwill-reducao-valor-recuperavel',
 'pcac-2026-contabilidade-11-estoques-mensuracao-avp-inventarios',
 'pcac-2026-contabilidade-12-moeda-estrangeira-cpc02-moeda-funcional',
 'pcac-2026-contabilidade-13-custeio-rkw-variavel-ponto-equilibrio',
 'pcac-2026-contabilidade-14-imobilizado-depreciacao-provisoes-contingencias',
 'pcac-2026-contabilidade-15-dfc-dva-fluxos-caixa-demonstracoes',
 'pcac-2026-contabilidade-16-patrimonio-liquido-reservas-dividendos',
 'pcac-2026-contabilidade-18-folha-pagamento-encargos-inss-fgts'
);
-- Reclassifica a aula integradora de Administração para a disciplina prevista no edital.
update public.study_materials
set discipline='Noções de Administração',
    title='Revisão integradora de Administração',
    topic_label='Revisão integradora: funções administrativas, processos, equipes e recursos',
    contest_name='PC-AC 2026',
    content_status='active',
    syllabus_topic_order=1,
    sort_order=16,
    updated_at=now()
where slug='pcac-2026-administracao-publica-funcoes-processos-equipes-recursos';
-- A conciliação bancária integra o tópico de análise de movimentações financeiras do edital.
update public.study_materials
set discipline='Contabilidade Geral e Análise Financeira',
    title='Conciliação bancária: extrato e razão',
    topic_label='7.2 Conciliação de movimentações financeiras',
    contest_name='PC-AC 2026',
    content_status='active',
    syllabus_topic_order=7,
    sort_order=8,
    updated_at=now()
where slug='pcac-2026-contabilidade-17-sistema-bancario-conciliacao-extrato-razao';

-- A aula integradora reclassificada também recebe sua revisão formal.
update public.study_materials
set practice_review=jsonb_build_object('status','reviewed','review_date','2026-11-14','items_checked',jsonb_array_length(coalesce(quiz,'[]'::jsonb)),'method','Conferência individual de enunciados, gabaritos e justificativas com funções administrativas, processos, eficiência, eficácia, efetividade, equipes, recursos e atendimento previstos no Anexo III.','result','Aula integradora revisada e reclassificada em Noções de Administração.'),
    reviewed_at='2026-11-14 23:59:00-03'::timestamptz,
    updated_at=now()
where slug='pcac-2026-administracao-publica-funcoes-processos-equipes-recursos';

-- CI revalidation marker after final syllabus alignment and database verification.
