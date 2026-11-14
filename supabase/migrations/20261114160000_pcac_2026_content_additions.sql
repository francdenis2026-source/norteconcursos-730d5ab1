-- Reproducible, idempotent seed for PC-AC 2026 additions (14/11/2026).
-- Source content is versioned from the same rows inserted in Supabase.
insert into public.study_materials
(slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,syllabus_topic_order,source_note,legal_basis,law_version_checked_at,legal_review,content_status,flashcards,quiz)
select slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,syllabus_topic_order,source_note,legal_basis,law_version_checked_at,legal_review,content_status,flashcards,quiz
from jsonb_to_recordset($pcac_seed$
[
  {
    "quiz": [
      {
        "a": false,
        "q": "A primeira lotação do Oficial Investigador é definida pela classificação final do concurso público.",
        "why": "A classificação do curso específico de formação define a primeira lotação (art. 67, § 13, e art. 79-C, § 1º)."
      },
      {
        "a": true,
        "q": "A regra de lotação inicial está no art. 67, § 13, da LC nº 129/2004, com redação da LC nº 526/2026.",
        "why": "O art. 67, § 13, determina que a lotação inicial observe exclusivamente a classificação obtida no curso."
      },
      {
        "a": true,
        "q": "O servidor deve permanecer cinco anos no município de lotação inicial, contados da entrada em exercício na unidade.",
        "why": "É a regra do art. 67, § 14."
      },
      {
        "a": false,
        "q": "Durante o quinquênio, não existe qualquer hipótese de remoção.",
        "why": "O art. 67, § 17, admite remoção excepcional para outro município da mesma regional, nas condições legais."
      },
      {
        "a": true,
        "q": "Após o quinquênio, cessão ou disposição pode durar até dois anos, prorrogáveis uma única vez por mais um ano.",
        "why": "É a regra do art. 67, § 15."
      },
      {
        "a": true,
        "q": "O estágio probatório dura três anos e o inciso II do art. 73 passou a prever produtividade.",
        "why": "A LC 526/2026 deu nova redação ao art. 73, II."
      },
      {
        "a": true,
        "q": "A conduta no estágio probatório é apurada pela comissão específica prevista no art. 73, § 1º.",
        "why": "A comissão inclui representantes da Corregedoria, gestão de pessoas e Departamento da Capital e Interior."
      },
      {
        "a": false,
        "q": "O recurso contra proposta de exoneração no estágio probatório deve ser apresentado em 15 dias.",
        "why": "O art. 73, § 7º, prevê cinco dias."
      },
      {
        "a": true,
        "q": "A posse ocorre no 30º dia subsequente à publicação do ato de provimento.",
        "why": "É a regra do art. 77."
      },
      {
        "a": true,
        "q": "A exigência médica pode suspender o prazo de posse por até 120 dias.",
        "why": "É a previsão do art. 78, a critério do órgão ou junta médica."
      },
      {
        "a": false,
        "q": "O efetivo exercício começa somente após a apresentação na primeira unidade de lotação.",
        "why": "Começa no início obrigatório do curso de formação (art. 79)."
      },
      {
        "a": true,
        "q": "O curso específico de formação policial é realizado em regime de internato.",
        "why": "É a regra do art. 79-A, § 3º."
      },
      {
        "a": true,
        "q": "Mais de 25% de faltas injustificadas em qualquer disciplina pode ensejar exoneração durante o curso.",
        "why": "É hipótese do art. 79-B, I, b."
      },
      {
        "a": true,
        "q": "O Termo de Ocorrência Escolar prevê defesa prévia de dois dias úteis.",
        "why": "É o art. 79-B, § 1º, III."
      },
      {
        "a": false,
        "q": "O período do curso de formação conta para o interstício necessário à promoção.",
        "why": "O art. 79-E exclui o interstício; ele começa no exercício na unidade de primeira lotação."
      },
      {
        "a": true,
        "q": "O pedido de exoneração antes de completar três anos pode gerar ressarcimento proporcional das despesas diretas e individualizadas de formação.",
        "why": "É a regra do art. 79-B, §§ 4º e 5º, com exceção de saúde incapacitante comprovada."
      },
      {
        "a": true,
        "q": "O art. 84-A prevê que remoção de ofício entre municípios tem prazo de apresentação contado do recebimento da ajuda de custo.",
        "why": "É o art. 84-A, I, a."
      }
    ],
    "slug": "pcac-2026-lc129-atualizacao-lc526-2026-ingresso-formacao-lotacao",
    "title": "LC nº 129/2004 após LC nº 526/2026: concurso, posse, formação e lotação",
    "body_md": "# LC nº 129/2004 após LC nº 526/2026 — ingresso, formação, estágio e lotação\n\n> **Texto de referência:** LC nº 129/2004 consolidada, lida em conjunto com a LC nº 526, de 23 de julho de 2026 (publicada em 29/07/2026).\n\n## 1. Ingresso e fases do concurso — arts. 64 a 67\nO ingresso ocorre na classe inicial de cada cargo, mediante concurso público de provas ou de provas e títulos, sob regime estatutário. O estágio probatório inicia-se com a investidura (art. 64).\n\nO art. 65 determina que o concurso seja estruturado em fases eliminatórias e classificatórias definidas em edital. São obrigatórias provas objetivas, subjetivas e de títulos; a prova oral é acrescida para Delegado. Também estão previstas prova de aptidão física, exames médico e toxicológico, exame psicotécnico e investigação criminal e social.\n\nO art. 67 prevê requisitos para investidura, incluindo idade mínima de 18 anos na data da posse, capacidade física e mental, ausência de antecedentes criminais, direitos políticos, quitação militar, escolaridade superior conforme o cargo e CNH até a posse. Para Oficial Investigador, exige-se graduação de nível superior em qualquer área, reconhecida pelo MEC. A CNH mínima é categoria AB para a carreira policial civil, exceto Delegado, para quem a exigência é categoria B.\n\n## 2. Classificação do concurso e lotação inicial — art. 67, §§ 13 a 17, e art. 79-C\nA classificação final do concurso destina-se à convocação, nomeação e posse (art. 71). **A primeira lotação não segue a classificação do concurso:** observa exclusivamente a ordem de classificação final obtida no curso específico de formação (art. 67, § 13, e art. 79-C, § 1º).\n\nA lotação deve ocorrer preferencialmente em municípios do interior, observada a opção prévia por vaga regionalizada e, na ausência dela, os critérios de oportunidade e conveniência administrativa.\n\nO servidor deve permanecer no município de sua lotação inicial por pelo menos cinco anos de efetivo exercício, contados da entrada em exercício na unidade. Nesse período, são vedadas remoção, permuta, cessão, disposição, requisição ou outra movimentação que implique afastamento territorial do município ou desvinculação das unidades policiais ali situadas (art. 67, § 14).\n\nDepois do quinquênio, cessões ou disposições podem ser deferidas por até dois anos, prorrogáveis uma única vez por mais um ano, ressalvadas as funções estratégicas ou de confiança expressamente indicadas no § 15. O § 16 prevê novo ciclo de cinco anos de efetivo exercício após o retorno para movimentações da mesma natureza.\n\n**Exceção:** o § 17 permite remoção durante o quinquênio para outro município da mesma regional administrativa, desde que haja vacância no destino capaz de comprometer a continuidade ou eficiência do serviço, mediante decisão fundamentada do Delegado-Geral.\n\n## 3. Estágio probatório e estabilidade — arts. 73 e 74\nO estágio probatório dura três anos. Após a LC nº 526/2026, os fatores de avaliação do art. 73 são:\n- I — conduta na vida pública e privada;\n- II — produtividade;\n- III — disciplina;\n- IV — assiduidade;\n- V — interesse e dedicação ao serviço;\n- VI — eficiência.\n\nA conduta é apurada por comissão específica com representantes da Corregedoria-Geral, da gestão de pessoas e do Departamento de Polícia da Capital e do Interior. Os demais fatores são apurados por relatórios circunstanciados das atividades, inclusive durante o curso de formação. O Departamento de Inteligência fornece subsídios e investigações relativos à conduta.\n\nQuatro meses antes do término do probatório, a avaliação é submetida à homologação do Delegado-Geral. Quem for considerado apto é confirmado automaticamente. Quem não for aprovado pode ser exonerado de ofício, com direito a recurso administrativo em cinco dias. O órgão técnico tem 30 dias para parecer; o Delegado-Geral tem 30 dias para julgar o recurso, recebido nos efeitos suspensivo e devolutivo. Mantida a exoneração, os autos seguem ao Governador para edição do decreto.\n\nA estabilidade é adquirida após três anos de efetivo exercício, com avaliação especial de desempenho por comissão, considerando os relatórios ordinários do probatório e o aproveitamento no curso de formação (art. 74).\n\n## 4. Posse, curso e exercício — arts. 75 a 79-A\nA posse ocorre no 30º dia subsequente à publicação do ato de provimento (art. 77). Se a data coincidir com sábado, domingo, feriado ou dia sem expediente ordinário, posse e início do curso são automaticamente prorrogados para o primeiro dia útil. O Delegado-Geral pode, por ato fundamentado, postergar o início das atividades do curso por até cinco dias, sem alterar a data da posse.\n\nO prazo de posse pode ser suspenso por até 120 dias, a critério do órgão ou junta médica, quando houver exigência para expedição do certificado de sanidade (art. 78). Se o candidato deixar de cumprir a exigência sem motivo justificado, o prazo recomeça a fluir.\n\nO exercício começa na data do início obrigatório das atividades do curso de formação (art. 79). Publicado o ato de lotação inicial, o servidor tem até três dias úteis, contados do primeiro dia útil subsequente, para se apresentar à unidade de destino.\n\nO curso é realizado na Escola Superior da Polícia Civil, em regime de internato. O servidor recebe, desde esse marco, vencimentos e vantagens da classe inicial. O curso conta como efetivo exercício para todos os efeitos legais, ressalvada a contagem do interstício para promoção (arts. 79-A e 79-E).\n\nDurante as aulas e nas dependências administrativas da Escola, é vedado portar ou conduzir arma de fogo, salvo nas atividades práticas de armamento e tiro, limitadas ao espaço e ao tempo necessários. A autorização funcional individual e definitiva para porte somente é concedida após conclusão regular e aprovação no curso.\n\n## 5. Reprovação, disciplina e ressarcimento — art. 79-B\nA reprovação em qualquer disciplina, mais de 25% de faltas injustificadas em qualquer disciplina ou penalidades que totalizem inaptidão disciplinar podem levar à exoneração por não preenchimento de requisito do estágio probatório. A Direção da Escola instrui o procedimento com boletim de avaliação ou registro de frequência, assegurando manifestação em cinco dias.\n\nInfrações sujeitas a demissão ou cassação de aposentadoria e omissão de fato impeditivo no momento da nomeação ou posse seguem a via de demissão, mediante devido processo administrativo disciplinar.\n\nInfrações às normas escolares no âmbito letivo são apuradas por Termo de Ocorrência Escolar (TOE), com defesa prévia em dois dias úteis e recurso ao Conselho Superior, recebido somente no efeito devolutivo.\n\nO policial que pedir exoneração antes de completar três anos de efetivo exercício deverá ressarcir, proporcionalmente ao tempo restante, as despesas diretas e individualizadas de custeio da formação. Não entram na base de cálculo parcelas remuneratórias ou vencimentos. A exceção é motivo de saúde incapacitante comprovado por junta médica oficial.\n\n## 6. Práticas durante o curso e movimentação — arts. 79-B, 79-C e 84-A\nDurante a formação, podem ser designadas atividades práticas em delegacias, unidades técnico-científicas e outras atividades típicas da Polícia Civil, respeitadas a pertinência temática e as atribuições do cargo, sob supervisão da Escola. O resultado integra a avaliação do estágio probatório.\n\nA Escola acompanha a conduta social durante o curso; o relatório integra obrigatoriamente a avaliação probatória (art. 79-C, § 2º).\n\nO art. 84-A disciplina a movimentação do policial já integrado à carreira. Na remoção entre municípios, o prazo de apresentação é de até 30 dias: na remoção de ofício, conta-se do recebimento da ajuda de custo; a pedido ou por permuta, da publicação do ato, sem ajuda de custo. Entre a publicação da remoção de ofício e o recebimento da ajuda, o servidor continua desempenhando as atribuições na unidade de origem.\n\n## 7. Pegadinhas IDECAN\n- Concurso: classificação final serve para convocação, nomeação e posse; lotação inicial segue a classificação do curso de formação.\n- A regra de lotação inicial está no art. 67, § 13, e no art. 79-C, § 1º — não no art. 65.\n- Permanência mínima: cinco anos no município inicial, com exceção restrita do art. 67, § 17.\n- Cessão/disposição após o quinquênio: até dois anos, prorrogável uma vez por mais um ano.\n- Probatório: três anos; fatores incluem produtividade (art. 73, II).\n- Recurso contra proposta de exoneração no probatório: cinco dias; análise técnica e julgamento: 30 dias cada.\n- Posse: 30º dia subsequente; suspensão médica: até 120 dias.\n- Curso: internato; reprovação em disciplina ou mais de 25% de faltas injustificadas por disciplina pode gerar exoneração.\n- TOE: defesa prévia em dois dias úteis; recurso apenas devolutivo.\n- Curso conta como efetivo exercício, mas o interstício promocional só começa na primeira unidade de lotação.\n- Remoção entre municípios após integração: art. 84-A, com regras distintas para remoção de ofício, a pedido e por permuta.\n",
    "summary": "Atualização legislativa indispensável de 2026: arts. 64 a 79-E, avaliação probatória, posse unificada, curso em internato e permanência territorial.",
    "discipline": "Legislação Institucional",
    "flashcards": [
      {
        "b": "Art. 67, §§ 13 a 17, em conjunto com o art. 79-C.",
        "f": "Qual artigo regula a lotação inicial e a permanência mínima de cinco anos?"
      },
      {
        "b": "A ordem de classificação final obtida no curso específico de formação, não a classificação do concurso.",
        "f": "Qual critério define a primeira lotação?"
      },
      {
        "b": "Cinco anos de efetivo exercício no município, contados da entrada em exercício na unidade.",
        "f": "Qual é a regra geral de permanência na lotação inicial?"
      },
      {
        "b": "Remoção para município da mesma regional, com vacância capaz de comprometer continuidade ou eficiência do serviço e decisão fundamentada do Delegado-Geral.",
        "f": "Qual exceção permite remoção antes do quinquênio?"
      },
      {
        "b": "Conduta na vida pública e privada; produtividade; disciplina; assiduidade; interesse e dedicação ao serviço; eficiência.",
        "f": "Quais são os fatores de avaliação do art. 73 após a LC 526/2026?"
      },
      {
        "b": "Três anos.",
        "f": "Qual é a duração do estágio probatório?"
      },
      {
        "b": "Cinco dias.",
        "f": "Qual prazo para recorrer da proposta de exoneração no estágio probatório?"
      },
      {
        "b": "30º dia subsequente à publicação; suspensão médica por até 120 dias, nas condições do art. 78.",
        "f": "Qual o prazo para posse e quando pode ser suspenso por exigência médica?"
      },
      {
        "b": "Na data do início obrigatório das atividades do curso específico de formação policial.",
        "f": "Quando começa o efetivo exercício do policial civil após a LC 526/2026?"
      },
      {
        "b": "Internato; é vedado portar ou conduzir arma nas salas de aula e dependências administrativas, ressalvadas práticas de tiro no espaço e tempo necessários.",
        "f": "Qual o regime do curso e qual a regra sobre armas?"
      },
      {
        "b": "Reprovação em disciplina, mais de 25% de faltas injustificadas em qualquer disciplina ou inaptidão disciplinar nos termos do regulamento.",
        "f": "O que pode levar à exoneração durante o curso de formação?"
      },
      {
        "b": "Não. O interstício começa na entrada em exercício na unidade da primeira lotação.",
        "f": "O curso conta para interstício de promoção?"
      },
      {
        "b": "Até três dias úteis, contados do primeiro dia útil subsequente à publicação.",
        "f": "Qual prazo de apresentação após a publicação do ato de lotação inicial?"
      },
      {
        "b": "Até dois anos, prorrogável uma única vez por mais um ano, ressalvadas as hipóteses legais.",
        "f": "Como funciona a cessão após o quinquênio?"
      },
      {
        "b": "Art. 84-A: até 30 dias; de ofício conta do recebimento da ajuda de custo, e a pedido/permuta da publicação do ato.",
        "f": "Qual regra se aplica à remoção entre municípios após integração à carreira?"
      }
    ],
    "sort_order": 17,
    "legal_basis": [
      "LC Estadual nº 129/2004",
      "LC Estadual nº 496/2025",
      "LC Estadual nº 526/2026",
      "LC Estadual nº 39/1993"
    ],
    "source_note": "Assembleia Legislativa do Acre: LC nº 526/2026 (PDF-texto, arts. 64–79-E, 84-A e art. 102, LV) e LC nº 129/2004 consolidada, consulta em 14/11/2026.",
    "topic_label": "LC nº 129/2004 — atualização LC nº 526/2026: ingresso, probatório e formação",
    "contest_name": "PC-AC 2026",
    "legal_review": {
      "source": "Assembleia Legislativa do Estado do Acre, LC 526/2026 PDF-texto e LC 129/2004 consolidada. Artigo 67 §§13-17 confirmado; fator II do art.73 é produtividade; art.77, art.79, internato e exceções conferidos.",
      "status": "reviewed_against_official_consolidated_text_and_amending_act",
      "articles": [
        64,
        65,
        67,
        70,
        71,
        73,
        74,
        75,
        76,
        77,
        78,
        79,
        "79-A",
        "79-B",
        "79-C",
        "79-D",
        "79-E",
        "84-A",
        102
      ],
      "review_date": "2026-11-14"
    },
    "content_status": "active",
    "syllabus_topic_order": 1,
    "law_version_checked_at": "2026-11-14T18:48:00+00:00"
  },
  {
    "quiz": [
      {
        "a": true,
        "q": "A LC 39 prevê prescrição de 180 dias para advertência.",
        "why": "É o art. 193, III."
      },
      {
        "a": false,
        "q": "A prescrição da suspensão é de cinco anos na LC 39.",
        "why": "O art. 193, II, prevê dois anos."
      },
      {
        "a": true,
        "q": "O prazo prescricional começa quando o fato se torna conhecido.",
        "why": "É o art. 193, § 1º."
      },
      {
        "a": true,
        "q": "A abertura de sindicância interrompe a prescrição disciplinar geral.",
        "why": "É o art. 193, § 3º."
      },
      {
        "a": true,
        "q": "A sindicância geral pode resultar em suspensão de até 30 dias.",
        "why": "É o art. 196, II."
      },
      {
        "a": false,
        "q": "A sindicância geral é conduzida necessariamente por comissão de três servidores.",
        "why": "O art. 200, na redação da LC 51/1996, prevê um servidor estável como sindicante."
      },
      {
        "a": true,
        "q": "O afastamento cautelar do art. 198 pode durar até 60 dias e ser prorrogado por igual período, sem prejuízo da remuneração.",
        "why": "É a regra do art. 198."
      },
      {
        "a": true,
        "q": "O PAD geral tem três fases: instauração; instrução, defesa e relatório; julgamento.",
        "why": "É a enumeração do art. 206."
      },
      {
        "a": false,
        "q": "O PAD geral deve ser concluído em até 30 dias, prorrogáveis por mais 30.",
        "why": "O art. 207 prevê 60 dias, prorrogáveis por igual período."
      }
    ],
    "slug": "pcac-2026-lc39-deveres-acumulacao-penalidades-prescricao-pad",
    "title": "LC nº 39/1993: deveres, acumulação, prescrição e processo disciplinar",
    "body_md": "\n# LC nº 39/1993 — deveres, penalidades e processo disciplinar\n\n## 1. Acumulação — arts. 168 a 170\nRessalvadas as hipóteses previstas nas Constituições Federal e Estadual, é vedada a acumulação remunerada de cargos públicos. A vedação estende-se a cargos, empregos e funções em autarquias, fundações públicas, empresas públicas e sociedades de economia mista de todos os entes federativos. Mesmo quando lícita, a acumulação depende de comprovação de compatibilidade de horários.\n\nO servidor não pode exercer mais de um cargo em comissão nem ser remunerado pela participação em órgão de deliberação coletiva. Se acumular licitamente dois cargos efetivos e for investido em cargo em comissão, fica afastado de ambos, salvo compatibilidade de horários em relação a um deles, conforme art. 170.\n\n## 2. Penalidades e dosimetria — arts. 177 a 179\nO art. 177 enumera: advertência, suspensão, demissão, cassação de aposentadoria ou disponibilidade, destituição de cargo em comissão e destituição de função gratificada.\n\nNa aplicação, consideram-se natureza e gravidade da infração, danos ao serviço, circunstâncias agravantes e atenuantes e antecedentes funcionais (art. 178). A advertência é escrita e se aplica às violações indicadas no art. 179 e à inobservância de dever funcional que não justifique penalidade mais grave.\n\n## 3. Prescrição disciplinar — art. 193\nA ação disciplinar prescreve em:\n- cinco anos para infrações puníveis com demissão, cassação de aposentadoria ou disponibilidade e destituição de cargo em comissão;\n- dois anos para suspensão;\n- 180 dias para advertência.\n\nO prazo começa quando o fato se torna conhecido. Aplicam-se os prazos prescricionais penais às infrações disciplinares também capituladas como crime. A abertura de sindicância ou instauração de PAD interrompe a prescrição até a decisão final da autoridade competente; cessada a interrupção, o prazo volta a correr.\n\n## 4. Apuração e sindicância — arts. 194 a 202\nA autoridade que conhece irregularidade deve promover apuração imediata por sindicância ou PAD, assegurada ampla defesa. A sindicância precede o PAD quando faltarem elementos para concluir pela existência da falta ou autoria.\n\nDenúncias devem identificar e indicar endereço do denunciante, ser escritas e ter autenticidade confirmada; fatos que não configurem infração disciplinar ou ilícito penal são arquivados por falta de objeto.\n\nDa sindicância pode resultar arquivamento, advertência, suspensão de até 30 dias ou instauração de PAD. O prazo não excede 30 dias, prorrogável por igual período. A sindicância é conduzida por servidor estável de hierarquia igual, equivalente ou superior à do sindicado, designado pela autoridade competente. O sindicante atua com independência e imparcialidade, com sigilo necessário.\n\n## 5. Afastamento cautelar — art. 198\nPara impedir que o servidor influencie a apuração, a autoridade instauradora do PAD pode afastá-lo do exercício por até 60 dias, sem prejuízo da remuneração. Pode haver prorrogação por igual período; ao fim, cessam os efeitos mesmo que o processo não tenha terminado.\n\n**Atenção:** este afastamento do estatuto geral (LC 39, art. 198) não deve ser confundido com o afastamento preventivo especial da LC 129/2004 (arts. 120 a 123), que possui disciplina e efeitos próprios para a Polícia Civil.\n\n## 6. PAD — arts. 203 a 208\nO PAD é conduzido por comissão de três servidores estáveis, de hierarquia igual, equivalente ou superior à do indiciado. Deve respeitar contraditório e ampla defesa. A sindicância integra os autos como peça informativa. Se o relatório apontar ilícito penal, cópia é encaminhada ao Ministério Público, independentemente de imediata instauração do PAD.\n\nO processo desenvolve-se em três fases: instauração, instrução/defesa/relatório e julgamento. O prazo de conclusão é de 60 dias, contados da publicação do ato de constituição da comissão, prorrogável por igual período. Na instrução, a comissão coleta depoimentos, acareações, investigações e diligências, podendo recorrer a técnicos e peritos.\n\n## 7. Pegadinhas\n- Prescrição da LC 39: 180 dias para advertência, 2 anos para suspensão e 5 anos para demissão e hipóteses equiparadas.\n- Na LC 129, o prazo de prescrição da advertência é diferente; para policial civil, verificar a norma especial.\n- A sindicância geral da LC 39 pode resultar em suspensão de até 30 dias.\n- Afastamento cautelar geral: 60 + 60 dias, sem prejuízo da remuneração.\n- PAD geral: 60 + 60 dias.\n- Comissão do PAD geral: três servidores estáveis; sindicância geral: um sindicante estável.\n",
    "summary": "Dispositivos confirmados sobre acumulação, penalidades, prescrição, sindicância, afastamento cautelar e fases do PAD.",
    "discipline": "Legislação Institucional",
    "flashcards": [
      {
        "b": "5 anos para demissão e hipóteses equiparadas; 2 anos para suspensão; 180 dias para advertência.",
        "f": "Quais são os prazos prescricionais do art. 193 da LC 39?"
      },
      {
        "b": "Na data em que o fato se tornou conhecido.",
        "f": "Quando começa a prescrição disciplinar geral?"
      },
      {
        "b": "A abertura de sindicância ou a instauração de PAD, até decisão final da autoridade competente.",
        "f": "O que interrompe a prescrição do art. 193?"
      },
      {
        "b": "Arquivamento, advertência, suspensão de até 30 dias ou instauração de PAD.",
        "f": "Quais resultados podem decorrer da sindicância geral?"
      },
      {
        "b": "Até 30 dias, prorrogável por igual período.",
        "f": "Qual o prazo da sindicância geral?"
      },
      {
        "b": "Até 60 dias, prorrogável por igual período, sem prejuízo da remuneração.",
        "f": "Qual o prazo do afastamento cautelar do art. 198?"
      },
      {
        "b": "Instauração; instrução, defesa e relatório; julgamento.",
        "f": "Quais são as fases do PAD geral?"
      },
      {
        "b": "Até 60 dias, prorrogável por igual período.",
        "f": "Qual o prazo de conclusão do PAD geral?"
      }
    ],
    "sort_order": 19,
    "legal_basis": [
      "LC Estadual do Acre nº 39/1993",
      "LC Estadual do Acre nº 51/1996",
      "LC Estadual do Acre nº 319/2016",
      "LC Estadual do Acre nº 350/2018",
      "LC Estadual do Acre nº 129/2004"
    ],
    "source_note": "Portal LEGIS do Acre, LC nº 39/1993 consolidada, arts. 168 a 208; alterações registradas no portal, consulta em 14/11/2026.",
    "topic_label": "LC nº 39/1993 — deveres, acumulação, penalidades e PAD",
    "contest_name": "PC-AC 2026",
    "legal_review": {
      "source": "Portal LEGIS do Acre, LC 39/1993 consolidada e alterações expressas. Dispositivos de defesa após art. 208 devem ser conferidos no texto integral antes de ampliar o conteúdo.",
      "status": "reviewed_against_official_legis_text",
      "articles": [
        168,
        169,
        170,
        177,
        178,
        179,
        193,
        194,
        195,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208
      ],
      "review_date": "2026-11-14"
    },
    "content_status": "active",
    "syllabus_topic_order": 1,
    "law_version_checked_at": "2026-11-14T17:25:00+00:00"
  },
  {
    "quiz": [
      {
        "a": true,
        "q": "O servidor efetivo em cargo de direção ou chefia fica afastado da função durante o gozo da licença-prêmio, com os direitos e vantagens inerentes ao cargo.",
        "why": "É a regra do art. 133."
      },
      {
        "a": false,
        "q": "Qualquer licença por doença em pessoa da família impede a licença-prêmio, mesmo remunerada.",
        "why": "O art. 134, II, a, refere-se à licença sem remuneração."
      },
      {
        "a": true,
        "q": "A suspensão disciplinar no período aquisitivo impede a concessão da licença-prêmio.",
        "why": "É a hipótese do art. 134, I."
      },
      {
        "a": true,
        "q": "Uma falta injustificada retarda a licença-prêmio em um mês.",
        "why": "É a proporção prevista no parágrafo único do art. 134."
      },
      {
        "a": false,
        "q": "O direito de requerer licença-prêmio está sujeito à prescrição quinquenal.",
        "why": "O art. 135 afirma que não prescreve nem está sujeito a caducidade."
      },
      {
        "a": true,
        "q": "A condenação a pena privativa de liberdade por sentença definitiva aparece entre as hipóteses do art. 134.",
        "why": "É o inciso II, alínea c."
      }
    ],
    "slug": "pcac-2026-lc39-licenca-premio-regras-aquisicao-concessao",
    "title": "LC nº 39/1993: licença-prêmio e hipóteses que afetam sua aquisição",
    "body_md": "\n# LC nº 39/1993 — licença-prêmio\n\n## 1. Servidor em cargo de direção ou chefia — art. 133\nO servidor efetivo que ocupar cargo em comissão ou função de direção ou chefia ficará afastado durante o gozo da licença-prêmio, com todos os direitos e vantagens inerentes ao cargo.\n\n## 2. Hipóteses que impedem a aquisição no período — art. 134\nNão se concede licença-prêmio ao servidor que, durante o período aquisitivo:\n- sofrer penalidade disciplinar de suspensão;\n- afastar-se do cargo em licença por motivo de doença em pessoa da família sem remuneração;\n- afastar-se para tratar de interesses particulares;\n- cumprir condenação a pena privativa de liberdade por sentença definitiva;\n- afastar-se para acompanhar cônjuge, companheiro ou companheira.\n\nAs faltas injustificadas retardam a concessão na proporção de um mês para cada falta.\n\n## 3. Requerimento — art. 135\nO direito de requerer licença-prêmio não prescreve nem está sujeito a caducidade.\n\n## 4. Pegadinhas\n- A penalidade disciplinar indicada no art. 134 é suspensão.\n- A licença por doença em pessoa da família só aparece como impedimento quando sem remuneração.\n- Cada falta injustificada retarda um mês a concessão.\n- O direito de requerer não prescreve nem caduca.\n- Não confundir direito de requerer com período aquisitivo e condições de concessão.\n",
    "summary": "Regras dos arts. 133 a 135 sobre gozo, impedimentos, faltas injustificadas e direito de requerer licença-prêmio.",
    "discipline": "Legislação Institucional",
    "flashcards": [
      {
        "b": "Fica afastado do cargo em comissão ou função de direção/chefia durante o gozo, mantendo direitos e vantagens inerentes ao cargo.",
        "f": "O que ocorre com servidor efetivo em cargo em comissão durante licença-prêmio?"
      },
      {
        "b": "Penalidade disciplinar de suspensão.",
        "f": "Quais penalidades interferem na aquisição da licença-prêmio conforme art. 134?"
      },
      {
        "b": "Não. O art. 134 menciona a licença sem remuneração.",
        "f": "A licença por doença em pessoa da família é impedimento em qualquer situação?"
      },
      {
        "b": "Retardam a concessão na proporção de um mês para cada falta.",
        "f": "Como as faltas injustificadas afetam a licença-prêmio?"
      },
      {
        "b": "Não. O art. 135 dispõe que não prescreve nem está sujeito a caducidade.",
        "f": "O direito de requerer licença-prêmio prescreve?"
      }
    ],
    "sort_order": 20,
    "legal_basis": [
      "LC Estadual do Acre nº 39/1993",
      "LC Estadual do Acre nº 51/1996"
    ],
    "source_note": "Portal LEGIS do Acre, LC nº 39/1993 consolidada, arts. 133 a 135, redação do art. 134 conforme texto atualizado; consulta em 14/11/2026.",
    "topic_label": "LC nº 39/1993 — licença-prêmio: aquisição, impedimentos e requerimento",
    "contest_name": "PC-AC 2026",
    "legal_review": {
      "source": "Portal LEGIS do Acre, texto consolidado da LC 39/1993. A aula não amplia o período aquisitivo, pois o trecho consultado não foi suficiente para confirmar sua regra atual.",
      "status": "reviewed_against_official_legis_text",
      "articles": [
        133,
        134,
        135
      ],
      "review_date": "2026-11-14"
    },
    "content_status": "active",
    "syllabus_topic_order": 1,
    "law_version_checked_at": "2026-11-14T17:25:00+00:00"
  },
  {
    "quiz": [
      {
        "a": true,
        "q": "A LC nº 39/1993 aplica-se aos servidores de qualquer dos Poderes do Estado do Acre.",
        "why": "É a regra do art. 1º, parágrafo único."
      },
      {
        "a": false,
        "q": "A prestação de serviços gratuitos é sempre permitida ao servidor público.",
        "why": "O art. 4º veda, salvo os casos previstos em lei."
      },
      {
        "a": true,
        "q": "A jornada geral do servidor efetivo é de 40 horas semanais, salvo duração diversa em lei.",
        "why": "É o art. 20."
      },
      {
        "a": false,
        "q": "O prazo de 30 dias para exercício após remoção a outra localidade exclui o tempo de deslocamento.",
        "why": "O art. 19 inclui o deslocamento."
      },
      {
        "a": true,
        "q": "Falecimento e posse em cargo inacumulável são hipóteses de vacância.",
        "why": "Ambas constam do art. 38."
      },
      {
        "a": true,
        "q": "A exoneração de ofício pode ocorrer quando o servidor não satisfaz as condições do estágio probatório.",
        "why": "É a hipótese do art. 39, parágrafo único, I."
      },
      {
        "a": false,
        "q": "O § 4º do art. 282 continua vigente após a LC nº 525/2026.",
        "why": "Foi expressamente revogado pelo art. 1º da LC 525/2026."
      }
    ],
    "slug": "pcac-2026-lc39-regime-geral-provimento-vacancia-direitos",
    "title": "LC nº 39/1993: disposições preliminares, provimento, jornada e vacância",
    "body_md": "\n# LC nº 39/1993 — regime jurídico geral do servidor civil\n\n## 1. Âmbito e conceitos — arts. 1º a 4º\nA LC nº 39/1993 institui o Estatuto dos servidores públicos civis da Administração Direta, das Autarquias e das Fundações Públicas estaduais. O parágrafo único do art. 1º estende sua aplicação aos servidores de qualquer dos Poderes do Estado.\n\nServidor é a pessoa legalmente investida em cargo público ou em comissão (art. 2º). Cargo público integrante de carreira é o conjunto de atribuições e responsabilidades cometidas a um servidor (art. 3º). Os cargos são criados por lei, têm denominação própria e vencimentos pagos pelos cofres públicos, para provimento efetivo ou em comissão.\n\nO art. 4º veda a prestação de serviços gratuitos, salvo os casos previstos em lei.\n\n## 2. Provimento — art. 5º\nO provimento de cargo de natureza permanente é o ato formal pelo qual se processa o ingresso do servidor mediante preenchimento de cargo na lotação do quadro de pessoal. Ao entrar em exercício, o servidor apresenta ao órgão competente os elementos necessários ao assentamento individual.\n\n## 3. Ascensão e mudança de localidade — arts. 18 e 19\nO art. 18 estabelece que a ascensão não interrompe o tempo de exercício, contado no novo posicionamento a partir da publicação do ato. O art. 19 concede ao servidor removido ou redistribuído para outra localidade 30 dias para entrar em exercício, incluído o tempo de deslocamento. Se estiver legalmente afastado, o prazo começa após o término do afastamento.\n\n## 4. Jornada — art. 20\nO ocupante de cargo efetivo fica sujeito a 40 horas semanais, salvo quando a lei estabelecer duração diversa. O exercício de cargo em comissão exige dedicação integral e pode gerar convocação sempre que houver interesse da Administração.\n\n## 5. Vacância — arts. 37 a 40\nO art. 38 enumera hipóteses de vacância: exoneração, demissão, ascensão, readaptação, aposentadoria, posse em outro cargo inacumulável, falecimento e recondução.\n\nA exoneração de cargo efetivo ocorre a pedido ou de ofício. A exoneração de ofício ocorre quando não satisfeitas as condições do estágio probatório ou quando, após a posse, o servidor não entra em exercício no prazo estabelecido (art. 39). A exoneração de cargo em comissão ocorre a juízo da autoridade competente ou a pedido do servidor (art. 40).\n\n## 6. Atualização de 2026 e especialidade\nA LC nº 525/2026 revogou o § 4º do art. 282, que tratava da não percepção de vantagens do plano de carreira pelos servidores do quadro provisório. Não reproduza esse parágrafo como vigente.\n\nPara o Oficial Investigador, a LC nº 129/2004 é o estatuto especial da carreira policial, e a LC nº 39/1993 aplica-se nos pontos pertinentes e subsidiários. A LC nº 526/2026 remete expressamente à LC nº 39/1993 quanto à recondução de servidor estável reprovado no estágio probatório.\n\n## 7. Pegadinhas\n- A jornada geral do art. 20 é 40 horas semanais, salvo duração diversa em lei.\n- O prazo do art. 19 é de 30 dias e inclui deslocamento.\n- Vacância não se limita à exoneração e à demissão.\n- Serviço gratuito é vedado, ressalvados casos legais.\n- O § 4º do art. 282 foi revogado pela LC nº 525/2026.\n",
    "summary": "Conteúdo confirmado dos arts. 1º a 5º, 18 a 20 e 37 a 40, com alerta sobre normas especiais da carreira policial.",
    "discipline": "Legislação Institucional",
    "flashcards": [
      {
        "b": "Aos servidores civis da Administração Direta, Autarquias e Fundações Públicas estaduais, de qualquer dos Poderes.",
        "f": "A quem se aplica a LC nº 39/1993?"
      },
      {
        "b": "Pessoa legalmente investida em cargo público ou em comissão.",
        "f": "Como o art. 2º define servidor?"
      },
      {
        "b": "É vedada a prestação de serviços gratuitos, salvo os casos previstos em lei.",
        "f": "Qual é a regra do art. 4º?"
      },
      {
        "b": "40 horas semanais, salvo quando a lei estabelecer duração diversa.",
        "f": "Qual é a jornada geral do art. 20?"
      },
      {
        "b": "30 dias, incluído o tempo de deslocamento; se estiver afastado legalmente, conta-se do término do afastamento.",
        "f": "Qual o prazo para entrar em exercício após remoção ou redistribuição para outra localidade?"
      },
      {
        "b": "Exoneração, demissão, ascensão, readaptação, aposentadoria, posse em cargo inacumulável, falecimento e recondução.",
        "f": "Cite hipóteses de vacância do art. 38."
      },
      {
        "b": "O § 4º do art. 282 da LC nº 39/1993.",
        "f": "Qual dispositivo foi revogado pela LC nº 525/2026?"
      }
    ],
    "sort_order": 18,
    "legal_basis": [
      "LC Estadual do Acre nº 39/1993",
      "LC Estadual do Acre nº 525/2026",
      "LC Estadual do Acre nº 129/2004",
      "LC Estadual do Acre nº 526/2026"
    ],
    "source_note": "Portal LEGIS do Acre, LC nº 39/1993 consolidada e LC nº 525/2026; consulta em 14/11/2026.",
    "topic_label": "LC nº 39/1993 — regime jurídico geral, provimento, vacância e direitos",
    "contest_name": "PC-AC 2026",
    "legal_review": {
      "source": "Portal LEGIS do Acre, LC 39/1993 e LC 525/2026. Conteúdo restrito aos dispositivos cujo texto foi conferido.",
      "status": "reviewed_against_official_legis_text",
      "articles": [
        1,
        2,
        3,
        4,
        5,
        18,
        19,
        20,
        37,
        38,
        39,
        40,
        282
      ],
      "review_date": "2026-11-14"
    },
    "content_status": "active",
    "syllabus_topic_order": 1,
    "law_version_checked_at": "2026-11-14T17:25:00+00:00"
  },
  {
    "quiz": [
      {
        "a": true,
        "q": "O slide mestre pode padronizar fontes, cores e rodapés.",
        "why": "O mestre define elementos comuns aos slides."
      },
      {
        "a": false,
        "q": "Transição e animação designam exatamente o mesmo recurso.",
        "why": "Transição muda de slide; animação afeta objetos do slide."
      },
      {
        "a": true,
        "q": "Um objeto vinculado pode depender da localização do arquivo original.",
        "why": "O vínculo pode quebrar se a origem for movida ou removida."
      },
      {
        "a": true,
        "q": "O modo apresentador pode exibir notas apenas ao apresentador.",
        "why": "É uma finalidade do recurso."
      },
      {
        "a": false,
        "q": "Exportar para PDF preserva integralmente todas as animações e interações.",
        "why": "O PDF não reproduz necessariamente esses recursos."
      }
    ],
    "slug": "pcac-2026-informatica-apresentacoes-integracao-pdf",
    "title": "PowerPoint e Impress: temas, slide mestre, animações e integração",
    "body_md": "\n# PowerPoint e LibreOffice Impress\n\n## Organização visual\nTemas reúnem cores, fontes e efeitos. Layouts organizam os espaços de conteúdo. O slide mestre define elementos comuns a vários slides, como logotipo, rodapé, tipografia e posicionamento.\n\n## Transições e animações\nTransição é o efeito de passagem de um slide para outro. Animação afeta objetos dentro do slide, como texto, imagem ou gráfico. O uso deve favorecer compreensão, sem excesso de movimento.\n\n## Modo apresentador\nPermite ao apresentador visualizar notas, tempo e próximo slide enquanto o público vê a apresentação. A configuração depende do sistema e das telas disponíveis.\n\n## Integração entre aplicativos\nDados de planilhas podem ser copiados, incorporados ou vinculados a apresentações e documentos. Objeto incorporado fica armazenado no arquivo de destino; objeto vinculado depende do arquivo de origem e pode deixar de atualizar se o caminho mudar.\n\n## Compatibilidade e PDF\nA conversão entre formatos pode alterar fontes, animações, macros e recursos específicos. PDF é adequado à distribuição de uma versão de leitura, mas não preserva todos os comportamentos interativos da apresentação.\n",
    "summary": "Temas, layouts, slide mestre, transições, animações, modo apresentador e intercâmbio de dados entre aplicativos.",
    "discipline": "Noções de Informática",
    "flashcards": [
      {
        "b": "Elementos e estilos comuns aplicados aos slides da apresentação.",
        "f": "O que define o slide mestre?"
      },
      {
        "b": "Transição ocorre entre slides; animação atua em objetos dentro do slide.",
        "f": "Qual a diferença entre transição e animação?"
      },
      {
        "b": "Objeto que mantém relação com arquivo de origem e pode atualizar seus dados.",
        "f": "O que é um objeto vinculado?"
      },
      {
        "b": "Permite consultar notas e controles sem exibi-los ao público.",
        "f": "Qual a vantagem do modo apresentador?"
      },
      {
        "b": "Não; o PDF não preserva todos os comportamentos interativos.",
        "f": "A conversão para PDF preserva todas as animações?"
      }
    ],
    "sort_order": 6,
    "legal_basis": [],
    "source_note": "Edital nº 001 SEAD/PCAC, Anexo III, Informática, item 5 (p. 47).",
    "topic_label": "5. Apresentações e integração entre aplicativos",
    "contest_name": "PC-AC 2026",
    "legal_review": {},
    "content_status": "active",
    "syllabus_topic_order": 6,
    "law_version_checked_at": null
  },
  {
    "quiz": [
      {
        "a": true,
        "q": "A referência relativa pode mudar quando uma fórmula é copiada para outra célula.",
        "why": "A referência relativa se ajusta à nova posição."
      },
      {
        "a": true,
        "q": "A referência $A$1 mantém linha e coluna fixas.",
        "why": "Os cifrões indicam referência absoluta."
      },
      {
        "a": false,
        "q": "Filtros apagam definitivamente as linhas que não correspondem ao critério.",
        "why": "Filtros apenas ocultam temporariamente registros fora do critério."
      },
      {
        "a": true,
        "q": "Tabelas dinâmicas podem agrupar e resumir grandes conjuntos de dados.",
        "why": "Esse é o objetivo central do recurso."
      },
      {
        "a": false,
        "q": "A proteção de planilha equivale à criptografia completa dos dados.",
        "why": "Proteção contra edição não substitui controles robustos de segurança."
      }
    ],
    "slug": "pcac-2026-informatica-excel-calc-funcoes-tabelas-graficos",
    "title": "Excel e Calc: fórmulas, funções, filtros, tabelas dinâmicas e gráficos",
    "body_md": "\n# Excel e LibreOffice Calc\n\n## Fórmulas e referências\nFórmulas começam pelo sinal de igual. Referência relativa muda ao copiar a fórmula; referência absoluta, marcada com cifrões (por exemplo, $A$1), permanece fixa. Referência mista fixa apenas linha ou coluna.\n\n## Funções\nFunções matemáticas e estatísticas calculam soma, média, contagem e dispersão; funções lógicas avaliam condições; funções de texto tratam cadeias; funções de data/hora operam períodos; funções de pesquisa localizam valores em tabelas. O nome e os separadores podem variar conforme idioma e aplicativo.\n\n## Organização e validação\nClassificação ordena registros; filtros exibem apenas linhas que atendem a critérios. Validação de dados restringe entradas, como listas, datas ou intervalos numéricos. Formatação condicional destaca valores conforme regras.\n\n## Tabelas dinâmicas e gráficos\nTabelas dinâmicas resumem grandes conjuntos por categorias, permitindo agrupar e agregar dados. Gráficos representam comparações e tendências. Escolha a visualização conforme a pergunta e confira escala, rótulos, fonte e unidade.\n\n## Proteção e erros\nProteção de planilha ou pasta de trabalho reduz alterações acidentais, mas não é mecanismo completo de segurança. Erros comuns incluem divisão por zero, referência inválida, valor incompatível e nome de função não reconhecido. Verifique referências, tipos e intervalos.\n",
    "summary": "Referências relativas e absolutas, funções, validação, classificação, filtros, formatação condicional, tabelas dinâmicas e erros.",
    "discipline": "Noções de Informática",
    "flashcards": [
      {
        "b": "Mantém linha e coluna fixas ao copiar a fórmula.",
        "f": "O que faz uma referência absoluta como $A$1?"
      },
      {
        "b": "Restringir ou orientar os valores que podem ser inseridos em uma célula.",
        "f": "Para que serve a validação de dados?"
      },
      {
        "b": "Exibir apenas registros que atendam aos critérios definidos.",
        "f": "Qual a função de um filtro?"
      },
      {
        "b": "Recurso para resumir e agregar dados por categorias e campos.",
        "f": "O que é uma tabela dinâmica?"
      },
      {
        "b": "Aplica destaque visual conforme regras baseadas nos valores.",
        "f": "O que a formatação condicional faz?"
      }
    ],
    "sort_order": 5,
    "legal_basis": [],
    "source_note": "Edital nº 001 SEAD/PCAC, Anexo III, Informática, item 4 (p. 47).",
    "topic_label": "4. Planilhas eletrônicas — Excel e Calc",
    "contest_name": "PC-AC 2026",
    "legal_review": {},
    "content_status": "active",
    "syllabus_topic_order": 5,
    "law_version_checked_at": null
  },
  {
    "quiz": [
      {
        "a": true,
        "q": "Aplicar estilos de título pode permitir a criação de sumário automático.",
        "why": "O sumário utiliza a hierarquia dos estilos de título."
      },
      {
        "a": false,
        "q": "Mala direta serve apenas para inserir imagens em um documento.",
        "why": "Combina documento-base e fonte de dados para gerar saídas personalizadas."
      },
      {
        "a": false,
        "q": "Comentários e controle de alterações são a mesma função.",
        "why": "Comentários registram observações; controle de alterações registra mudanças no documento."
      },
      {
        "a": true,
        "q": "Referências cruzadas podem apontar para figuras e tabelas numeradas.",
        "why": "São usadas para referenciar elementos internos do documento."
      },
      {
        "a": false,
        "q": "Exportar para PDF dispensa a revisão de links e acessibilidade.",
        "why": "O arquivo exportado ainda deve ser conferido."
      }
    ],
    "slug": "pcac-2026-informatica-word-writer-documentos-estilos-revisao",
    "title": "Word e Writer: estilos, documentos longos, revisão e proteção",
    "body_md": "\n# Word e LibreOffice Writer\n\n## Estruturação de documentos\nEstilos aplicam formatação padronizada a títulos, subtítulos e parágrafos. Em documentos extensos, a hierarquia de estilos permite gerar e atualizar sumário automático. Formatação direta altera apenas a seleção; estilos facilitam consistência e manutenção.\n\n## Recursos de navegação\nNotas de rodapé e de fim registram observações ou referências. Legendas identificam figuras e tabelas. Referências cruzadas apontam para elementos numerados do documento e podem ser atualizadas quando a estrutura muda.\n\n## Mala direta e modelos\nMala direta combina um documento-base com uma fonte de dados para gerar cartas, etiquetas ou mensagens personalizadas. Modelos guardam estrutura e formatação para reutilização.\n\n## Revisão colaborativa\nComentários permitem registrar observações sem alterar diretamente o texto. Controle de alterações registra inserções, exclusões e mudanças de formatação, que podem ser aceitas ou rejeitadas. Comparar documentos identifica diferenças entre versões.\n\n## Proteção e PDF\nProteção por senha ou restrições de edição podem limitar alterações, mas não substituem controles de acesso e gestão documental. Exportar para PDF preserva a apresentação e facilita compartilhamento; confira fontes, links e acessibilidade antes de distribuir.\n",
    "summary": "Ferramentas de edição, estruturação, sumário automático, referências, mala direta, revisão e exportação para PDF.",
    "discipline": "Noções de Informática",
    "flashcards": [
      {
        "b": "Padronizar a formatação e estruturar títulos, permitindo sumário automático.",
        "f": "Para que servem os estilos no Word/Writer?"
      },
      {
        "b": "Cria uma referência a outro elemento do documento, como figura, tabela ou título.",
        "f": "O que faz a referência cruzada?"
      },
      {
        "b": "Combina documento-base com fonte de dados para gerar documentos personalizados.",
        "f": "O que é mala direta?"
      },
      {
        "b": "Inserções, exclusões e modificações feitas durante a revisão.",
        "f": "O que registra o controle de alterações?"
      },
      {
        "b": "Identificar diferenças entre duas versões.",
        "f": "O que permite comparar documentos?"
      }
    ],
    "sort_order": 4,
    "legal_basis": [],
    "source_note": "Edital nº 001 SEAD/PCAC, Anexo III, Informática, item 3 (p. 47).",
    "topic_label": "3. Editores de texto — Word e Writer",
    "contest_name": "PC-AC 2026",
    "legal_review": {},
    "content_status": "active",
    "syllabus_topic_order": 4,
    "law_version_checked_at": null
  },
  {
    "quiz": [
      {
        "a": true,
        "q": "SMTP é utilizado para envio de mensagens eletrônicas.",
        "why": "É o protocolo de envio/transferência de e-mail."
      },
      {
        "a": false,
        "q": "IMAP é destinado exclusivamente ao envio de e-mails.",
        "why": "É usado para acesso e sincronização de mensagens no servidor."
      },
      {
        "a": true,
        "q": "POP3 pode ser configurado para baixar mensagens ao dispositivo.",
        "why": "Esse é seu comportamento tradicional."
      },
      {
        "a": false,
        "q": "O endereço exibido no campo remetente nunca pode ser falsificado.",
        "why": "A falsificação de remetente é uma técnica de ataque."
      },
      {
        "a": true,
        "q": "Solicitações urgentes de senha devem ser confirmadas por canal independente.",
        "why": "Isso reduz o risco de phishing e engenharia social."
      }
    ],
    "slug": "pcac-2026-informatica-email-protocolos-phishing",
    "title": "Correio eletrônico: SMTP, POP3, IMAP, webmail e segurança contra phishing",
    "body_md": "\n# Correio eletrônico corporativo\n\n## Webmail e clientes\nWebmail acessa o serviço de correio por navegador. Clientes como Outlook e Thunderbird conectam-se a servidores para enviar e receber mensagens, permitindo organização local e integração com calendários e contatos.\n\n## Protocolos\nSMTP é utilizado para envio e transferência de mensagens. POP3 é protocolo de recebimento que tradicionalmente baixa mensagens para o dispositivo, conforme configuração. IMAP mantém sincronização das mensagens e pastas com o servidor, facilitando uso em vários dispositivos.\n\n## Organização e colaboração\nListas de distribuição enviam mensagens a múltiplos destinatários. Regras automatizam classificação, encaminhamento ou sinalização. Calendários e convites ajudam a organizar compromissos, mas devem respeitar permissões e destinatários.\n\n## Phishing e falsificação\nPhishing tenta induzir o usuário a revelar credenciais, abrir anexos ou acessar links maliciosos. O remetente pode ser falsificado. Desconfie de urgência artificial, erros, anexos inesperados e URLs divergentes. Confirme solicitações sensíveis por canal independente.\n\n## Dados sigilosos\nConfira destinatários, anexos e classificação da informação antes do envio. Use criptografia e mecanismos institucionais quando exigidos. Não encaminhe credenciais ou dados pessoais para endereços não verificados.\n",
    "summary": "Protocolos de envio e recebimento, clientes de e-mail, regras, calendários, falsificação de remetente e proteção de dados.",
    "discipline": "Noções de Informática",
    "flashcards": [
      {
        "b": "SMTP.",
        "f": "Qual protocolo é usado para envio de e-mails?"
      },
      {
        "b": "Baixa mensagens para o dispositivo, conforme a configuração.",
        "f": "Qual a característica tradicional do POP3?"
      },
      {
        "b": "Sincroniza mensagens e pastas com o servidor entre dispositivos.",
        "f": "Qual a vantagem do IMAP?"
      },
      {
        "b": "Tentativa de obter dados ou induzir ações por meio de mensagens ou páginas fraudulentas.",
        "f": "O que é phishing?"
      },
      {
        "b": "Por canal independente e previamente conhecido, sem usar o link suspeito.",
        "f": "Como confirmar solicitação sensível recebida por e-mail?"
      }
    ],
    "sort_order": 8,
    "legal_basis": [],
    "source_note": "Edital nº 001 SEAD/PCAC, Anexo III, Informática, item 7 (p. 48).",
    "topic_label": "7. Correio eletrônico — SMTP, POP3, IMAP e phishing",
    "contest_name": "PC-AC 2026",
    "legal_review": {},
    "content_status": "active",
    "syllabus_topic_order": 8,
    "law_version_checked_at": null
  },
  {
    "quiz": [
      {
        "a": true,
        "q": "Uma intranet é uma rede privada que pode utilizar tecnologias da internet.",
        "why": "É a definição funcional de intranet."
      },
      {
        "a": false,
        "q": "Extranet é necessariamente aberta a qualquer pessoa na internet.",
        "why": "O acesso é controlado e destinado a usuários externos autorizados."
      },
      {
        "a": true,
        "q": "HTTPS utiliza TLS para proteger a comunicação em trânsito.",
        "why": "TLS fornece proteção criptográfica à conexão."
      },
      {
        "a": false,
        "q": "O cadeado HTTPS comprova que o conteúdo do site é verdadeiro.",
        "why": "O certificado não valida a veracidade das informações."
      },
      {
        "a": true,
        "q": "A data e a autoria devem ser consideradas na avaliação de fontes.",
        "why": "São critérios básicos de confiabilidade."
      }
    ],
    "slug": "pcac-2026-informatica-internet-busca-navegadores-https",
    "title": "Internet, intranet e pesquisa: navegadores, protocolos, HTTPS e avaliação de fontes",
    "body_md": "\n# Internet, intranet e pesquisa\n\n## Internet, intranet e extranet\nInternet é uma rede mundial de redes interconectadas. Intranet é uma rede privada que utiliza tecnologias de internet para acesso interno. Extranet permite acesso controlado a determinados recursos por pessoas ou organizações externas autorizadas.\n\n## Navegadores e protocolos\nChrome, Edge e Firefox são navegadores que interpretam e exibem recursos da web. HTTP é protocolo de transferência; HTTPS utiliza TLS para proteger a comunicação entre cliente e servidor, oferecendo confidencialidade e integridade em trânsito e autenticação do servidor conforme o certificado.\n\n## Certificados digitais\nO certificado vincula uma identidade a uma chave pública, dentro de uma infraestrutura de confiança. O cadeado/HTTPS não garante que o conteúdo seja verdadeiro, nem que o site seja legítimo em sua finalidade; indica uma conexão protegida com o domínio validado.\n\n## Pesquisa eficiente\nOperadores como aspas para expressão exata, sinal de menos para excluir termos e comandos de domínio podem refinar buscas, conforme o mecanismo. Avalie autoria, data, evidência, instituição responsável, URL e confirmação em fontes independentes.\n\n## Desinformação e conteúdo manipulado\nVerifique contexto, data, origem e correspondência entre título e conteúdo. Imagens e vídeos podem estar fora de contexto ou manipulados. Não compartilhe dados pessoais ou documentos sigilosos em serviços não autorizados.\n",
    "summary": "Conceitos de internet e intranet, navegadores, certificados, operadores de busca, avaliação de fontes e desinformação.",
    "discipline": "Noções de Informática",
    "flashcards": [
      {
        "b": "Rede privada que usa tecnologias de internet para comunicação e serviços internos.",
        "f": "O que é intranet?"
      },
      {
        "b": "Permite acesso controlado a usuários externos autorizados.",
        "f": "O que diferencia extranet?"
      },
      {
        "b": "A comunicação em trânsito por TLS, com confidencialidade, integridade e autenticação do servidor.",
        "f": "O que o HTTPS protege?"
      },
      {
        "b": "Não. Protege a conexão, não a veracidade do conteúdo.",
        "f": "HTTPS garante que a informação publicada seja verdadeira?"
      },
      {
        "b": "Autoria, data, evidências, instituição, URL, contexto e confirmação independente.",
        "f": "Quais critérios ajudam a avaliar uma fonte?"
      }
    ],
    "sort_order": 7,
    "legal_basis": [],
    "source_note": "Edital nº 001 SEAD/PCAC, Anexo III, Informática, item 6 (p. 47–48).",
    "topic_label": "6. Internet, intranet e pesquisa — navegadores e HTTPS",
    "contest_name": "PC-AC 2026",
    "legal_review": {},
    "content_status": "active",
    "syllabus_topic_order": 7,
    "law_version_checked_at": null
  },
  {
    "quiz": [
      {
        "a": true,
        "q": "Coautoria permite trabalho simultâneo no mesmo arquivo.",
        "why": "É uma funcionalidade central de colaboração em nuvem."
      },
      {
        "a": false,
        "q": "Permissão de edição deve ser concedida a todos os usuários por padrão.",
        "why": "O princípio do menor privilégio exige limitar o acesso."
      },
      {
        "a": false,
        "q": "Histórico de versões substitui qualquer política de backup.",
        "why": "Histórico e backup possuem finalidades diferentes."
      },
      {
        "a": true,
        "q": "Links públicos podem ampliar indevidamente a exposição de dados.",
        "why": "O acesso por link pode ultrapassar o grupo pretendido."
      },
      {
        "a": true,
        "q": "A revogação de acesso deve ocorrer quando a necessidade termina.",
        "why": "É parte da gestão do ciclo de acesso."
      }
    ],
    "slug": "pcac-2026-informatica-nuvem-colaboracao-permissoes",
    "title": "Nuvem e colaboração: Microsoft 365, Google Workspace, Teams, Meet e Zoom",
    "body_md": "\n# Computação em nuvem e trabalho colaborativo\n\n## Serviços e colaboração\nMicrosoft 365 e Google Workspace integram aplicativos de documentos, planilhas, apresentações, armazenamento e comunicação. Teams, Meet e Zoom oferecem reuniões e colaboração remota, com recursos que variam conforme plano e configuração.\n\n## Compartilhamento\nArquivos podem ser compartilhados com pessoas específicas, grupos ou por links. Links públicos ou amplamente acessíveis elevam o risco de exposição. Prefira o menor escopo de acesso necessário e confira destinatários antes de conceder permissão.\n\n## Permissões\nPermissões comuns incluem visualizar, comentar e editar. Conceder edição quando basta leitura viola o princípio do menor privilégio. Acesso deve ser revisto, transferido quando necessário e revogado quando deixar de ser justificável.\n\n## Coautoria e versões\nCoautoria permite que várias pessoas trabalhem no mesmo arquivo. Histórico de versões registra estados anteriores e pode permitir restauração. Não substitui backup independente nem trilha formal de auditoria quando exigida.\n\n## Riscos\nLinks encaminhados, contas comprometidas e permissões excessivas podem expor dados. Use autenticação forte, verifique atividade e evite armazenar informações sigilosas em espaços pessoais ou sem autorização institucional.\n",
    "summary": "Compartilhamento por links e grupos, coautoria, histórico de versões, transferência e revogação de acesso.",
    "discipline": "Noções de Informática",
    "flashcards": [
      {
        "b": "Edição colaborativa do mesmo documento por mais de uma pessoa.",
        "f": "O que é coautoria?"
      },
      {
        "b": "Visualizar, comentar e editar.",
        "f": "Quais permissões são comuns no compartilhamento?"
      },
      {
        "b": "Conceder somente o acesso necessário para a tarefa.",
        "f": "O que estabelece o princípio do menor privilégio?"
      },
      {
        "b": "Consultar estados anteriores e, quando permitido, restaurar uma versão.",
        "f": "Para que serve o histórico de versões?"
      },
      {
        "b": "Podem permitir acesso a pessoas não previstas ou fora do controle institucional.",
        "f": "Por que links públicos são arriscados?"
      }
    ],
    "sort_order": 9,
    "legal_basis": [],
    "source_note": "Edital nº 001 SEAD/PCAC, Anexo III, Informática, item 8 (p. 48).",
    "topic_label": "8. Computação em nuvem e trabalho colaborativo",
    "contest_name": "PC-AC 2026",
    "legal_review": {},
    "content_status": "active",
    "syllabus_topic_order": 9,
    "law_version_checked_at": null
  },
  {
    "quiz": [
      {
        "a": true,
        "q": "Autenticação verifica a identidade do usuário.",
        "why": "É o processo de confirmar quem está acessando."
      },
      {
        "a": true,
        "q": "Autorização define quais recursos o usuário pode acessar.",
        "why": "É a gestão de permissões após a identificação."
      },
      {
        "a": false,
        "q": "Segregação de funções procura concentrar todas as etapas em uma pessoa.",
        "why": "Busca reduzir concentração de poderes e riscos."
      },
      {
        "a": false,
        "q": "A publicidade administrativa impede qualquer restrição de acesso a dados pessoais.",
        "why": "A transparência deve conviver com sigilo legal e proteção de dados."
      },
      {
        "a": true,
        "q": "Uma trilha de auditoria pode registrar usuário, data e operação.",
        "why": "Esses dados apoiam rastreabilidade e responsabilização."
      }
    ],
    "slug": "pcac-2026-informatica-sistemas-informacao-governanca-publica",
    "title": "Sistemas de informação e Administração Pública: dados, acesso, auditoria e transparência",
    "body_md": "\n# Sistemas de informação e Administração Pública\n\n## Dado, informação e conhecimento\nDado é registro de um fato; informação é dado contextualizado e interpretado; conhecimento resulta da compreensão e aplicação da informação. Qualidade exige exatidão, completude, consistência, atualidade e rastreabilidade.\n\n## Banco de dados\nBanco de dados organiza registros estruturados. Tabela reúne registros (linhas) e campos (colunas). Chaves identificam registros e relacionamentos associam tabelas. Consultas recuperam e filtram dados conforme critérios.\n\n## Segurança e governança\nAutenticação verifica identidade; autorização define o que a identidade pode fazer; auditoria registra ações relevantes. Segregação de funções reduz concentração de poderes. O princípio do menor privilégio limita permissões ao necessário.\n\n## Disponibilidade e trilhas\nDisponibilidade busca manter sistemas acessíveis quando necessários. Trilhas de auditoria registram eventos, usuário, data, operação e resultado, conforme desenho do sistema. Controles devem proteger confidencialidade, integridade e disponibilidade.\n\n## Transparência e proteção\nA Administração Pública deve observar publicidade e transparência ativa e passiva, respeitando informações pessoais, sigilosas ou classificadas e restrições legais de acesso. A publicação de documentos deve evitar exposição indevida de dados pessoais e metadados sensíveis.\n",
    "summary": "Fundamentos de bancos de dados, qualidade, autenticação, autorização, auditoria, segregação de funções, transparência e sigilo.",
    "discipline": "Noções de Informática",
    "flashcards": [
      {
        "b": "Autenticação verifica identidade; autorização define permissões.",
        "f": "Qual a diferença entre autenticação e autorização?"
      },
      {
        "b": "Distribuir atividades e poderes para reduzir concentração e conflito de interesses.",
        "f": "O que é segregação de funções?"
      },
      {
        "b": "Registro rastreável de eventos e operações relevantes.",
        "f": "O que é trilha de auditoria?"
      },
      {
        "b": "Confidencialidade, integridade e disponibilidade.",
        "f": "Quais propriedades compõem a tríade clássica da segurança?"
      },
      {
        "b": "Não. Devem ser respeitadas restrições legais e proteção de dados pessoais.",
        "f": "Publicidade administrativa elimina toda hipótese de sigilo?"
      }
    ],
    "sort_order": 10,
    "legal_basis": [],
    "source_note": "Edital nº 001 SEAD/PCAC, Anexo III, Informática, itens 9 e 10 (p. 48).",
    "topic_label": "9–10. Sistemas de informação, governança, transparência e proteção",
    "contest_name": "PC-AC 2026",
    "legal_review": {},
    "content_status": "active",
    "syllabus_topic_order": 10,
    "law_version_checked_at": null
  }
]
$pcac_seed$::jsonb) as seed(
 slug text, discipline text, topic_label text, sort_order integer, title text, summary text, body_md text,
 contest_name text, syllabus_topic_order integer, source_note text, legal_basis jsonb, law_version_checked_at timestamptz,
 legal_review jsonb, content_status text, flashcards jsonb, quiz jsonb
)
on conflict (slug) do nothing;
