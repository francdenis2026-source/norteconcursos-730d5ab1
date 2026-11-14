-- Importa em paráfrase os 8 itens de Contabilidade Geral da prova PC-SE 2021 (CEBRASPE).
-- Fonte consultada: QConcursos, página da prova PC-SE 2021 — Agente de Polícia Judiciária.
-- Gabarito da página: E, C, C, E, E, E, C, E.
-- Os enunciados foram reescritos em paráfrase; não reproduzem integralmente o texto protegido.

do $$
declare
  v_source uuid;
begin
  select id into v_source
  from public.content_sources
  where url='https://www.qconcursos.com/questoes-de-concursos/provas/cespe-cebraspe-2021-pc-se-agente-de-policia-judiciaria/questoes?discipline_ids%5B%5D=35'
  limit 1;

  if v_source is null then
    insert into public.content_sources(source_type,title,issuer,url,published_on,checked_at,status,is_official,notes)
    values(
      'outro',
      'PC-SE 2021 — CEBRASPE — Agente de Polícia Judiciária — Contabilidade Geral (8 itens)',
      'QConcursos — indexação de prova CEBRASPE',
      'https://www.qconcursos.com/questoes-de-concursos/provas/cespe-cebraspe-2021-pc-se-agente-de-policia-judiciaria/questoes?discipline_ids%5B%5D=35',
      '2021-04-04',now(),'vigente',false,
      'Página consultada em 14/11/2026. Prova com 8 itens de Contabilidade Geral. Gabarito na ordem: E, C, C, E, E, E, C, E. Enunciados cadastrados em paráfrase.'
    ) returning id into v_source;
  end if;

  with items as (
    select * from jsonb_to_recordset($items$
    [
      {"external_item_key":"Q1847175","subtopic":"Escrituração — fórmulas de lançamento","question_text":"Na compra de um equipamento, parte do preço é paga imediatamente e o restante fica para pagamento futuro. O lançamento precisa, obrigatoriamente, usar a terceira fórmula de partida dobrada?","official_answer":"E","explanation":"A operação exige um débito no imobilizado e dois créditos: caixa/bancos pela parcela paga e fornecedores pela parcela a prazo. É lançamento de segunda fórmula (um débito e mais de um crédito), não de terceira fórmula.","difficulty":"média","tested_topic":"Partidas dobradas e fórmulas de lançamento","legal_basis":["Método das partidas dobradas","Fórmulas de lançamento contábil"]},
      {"external_item_key":"Q1847176","subtopic":"Conceito e objeto da Contabilidade","question_text":"A Contabilidade estuda, interpreta e registra as variações patrimoniais da entidade, inclusive aquelas que alteram sua situação líquida?","official_answer":"C","explanation":"A assertiva está correta: a Contabilidade tem por objeto o patrimônio e suas variações. A situação líquida patrimonial corresponde à diferença entre ativo e passivo exigível.","difficulty":"média","tested_topic":"Objeto da Contabilidade e patrimônio","legal_basis":["Objeto da Contabilidade","Equação patrimonial: Ativo = Passivo + Patrimônio Líquido"]},
      {"external_item_key":"Q1847177","subtopic":"Natureza das contas e depreciação acumulada","question_text":"O aumento da depreciação acumulada reduz o patrimônio líquido, e um lançamento a débito, por si só, não garante melhora da situação líquida patrimonial?","official_answer":"C","explanation":"A assertiva está correta. A depreciação acumulada é conta retificadora do ativo; seu aumento reduz o valor contábil do imobilizado e, indiretamente, o patrimônio líquido. Débito é apenas o lado do lançamento: seu efeito depende da natureza da conta debitada.","difficulty":"média","tested_topic":"Natureza das contas e efeitos patrimoniais","legal_basis":["Natureza devedora e credora das contas","Depreciação acumulada — conta retificadora do ativo","Patrimônio líquido"]},
      {"external_item_key":"Q1847178","subtopic":"Fatos contábeis — modificativos e permutativos","question_text":"Os fatos modificativos e os fatos permutativos sempre exigem quantidades mínimas diferentes de contas para serem registrados?","official_answer":"E","explanation":"A assertiva está errada. Ambos podem ser registrados com duas contas. A diferença está no efeito patrimonial: o permutativo altera a composição do patrimônio sem modificar o PL; o modificativo altera o patrimônio líquido.","difficulty":"média","tested_topic":"Classificação dos fatos contábeis","legal_basis":["Fatos contábeis permutativos","Fatos contábeis modificativos","Método das partidas dobradas"]},
      {"external_item_key":"Q1847179","subtopic":"Ativo imobilizado — aquisição no exterior e câmbio","question_text":"Na aquisição de um equipamento produtivo no exterior, o custo inicial em reais deve ser convertido pela taxa de câmbio vigente na data em que o bem começa a operar, somando-se depois os custos necessários para colocá-lo em funcionamento?","official_answer":"E","explanation":"A assertiva está errada. A transação em moeda estrangeira é reconhecida inicialmente pela taxa de câmbio à vista da data da transação, e não pela taxa da data em que o bem entra em operação. Os custos diretamente atribuíveis à colocação do ativo em condições de uso integram seu custo, observados os critérios aplicáveis.","difficulty":"difícil","tested_topic":"Conversão cambial e custo do imobilizado","legal_basis":["CPC 02 — Efeitos das mudanças nas taxas de câmbio","CPC 27 — Ativo Imobilizado"]},
      {"external_item_key":"Q1847180","subtopic":"Balancete de verificação","question_text":"Para identificar se os saldos iniciais e finais das contas são devedores ou credores, é indispensável utilizar um balancete de oito colunas?","official_answer":"E","explanation":"A assertiva está errada. Um balancete de seis colunas pode apresentar saldos iniciais devedores e credores, movimentos de débito e crédito e saldos finais devedores e credores. Oito colunas não são indispensáveis para essa finalidade.","difficulty":"média","tested_topic":"Balancete de verificação e colunas","legal_basis":["Balancete de verificação","Escrituração contábil"]},
      {"external_item_key":"Q1847181","subtopic":"Bases de mensuração — passivos atuariais","question_text":"O custo histórico pode ser útil para passivos liquidados conforme contrato, mas tende a ser de difícil aplicação na mensuração de passivos atuariais?","official_answer":"C","explanation":"A assertiva está correta. Passivos atuariais dependem de estimativas que variam com premissas demográficas, financeiras e temporais. Por isso, o valor histórico da transação normalmente não representa adequadamente a obrigação presente.","difficulty":"difícil","tested_topic":"Mensuração de passivos atuariais","legal_basis":["NBC TSP — Estrutura Conceitual: bases de mensuração de passivos","Passivos atuariais e previdenciários"]},
      {"external_item_key":"Q1847182","subtopic":"Demonstração do Resultado do Exercício","question_text":"A DRE apresenta todas as contas que alteram diretamente a situação patrimonial líquida, incluindo contas patrimoniais, aumentando ou reduzindo o patrimônio líquido?","official_answer":"E","explanation":"A assertiva está errada. A DRE evidencia receitas, custos e despesas do período e apura lucro ou prejuízo. Ela não é uma relação de todas as contas patrimoniais que alteram o PL; o resultado apurado é que repercute no patrimônio líquido.","difficulty":"média","tested_topic":"DRE e contas de resultado","legal_basis":["Lei nº 6.404/1976, art. 187","Demonstração do Resultado do Exercício"]}
    ]$items$::jsonb) as x(
      external_item_key text,subtopic text,question_text text,official_answer text,
      explanation text,difficulty text,tested_topic text,legal_basis jsonb
    )
  )
  insert into public.curated_question_catalog
  (source_id,syllabus_topic_id,external_item_key,contest_name,contest_year,career_name,exam_board,subject,subtopic,question_text,official_answer,explanation,legal_basis,difficulty,content_status,is_original,verified_at,state,career_category,role_type,tested_topic,import_content_key,import_unique_key,didactic_provenance)
  select
    v_source,
    '9a3535c6-f720-472a-9138-8acf5f212b31'::uuid,
    x.external_item_key,
    'PC-SE 2021',2021,'Agente de Polícia Judiciária','CEBRASPE','Contabilidade Geral',
    x.subtopic,x.question_text,x.official_answer,x.explanation,x.legal_basis,x.difficulty,'active',false,now(),'SE','policial',
    'Agente de Polícia Judiciária',x.tested_topic,'pcse-2021-cebraspe-contabilidade',
    'pcse-2021-cebraspe-agente-'||lower(x.external_item_key),
    jsonb_build_object(
      'source_url','https://www.qconcursos.com/questoes-de-concursos/provas/cespe-cebraspe-2021-pc-se-agente-de-policia-judiciaria/questoes?discipline_ids%5B%5D=35',
      'source_item',x.external_item_key,'paraphrased',true,
      'source_exam','PC-SE 2021 — Agente de Polícia Judiciária','answer_key_checked',true
    )
  from items x
  on conflict do nothing;
end $$;
