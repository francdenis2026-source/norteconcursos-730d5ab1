"""Explicit care/prevention review; keep the accurate existing overview, author contrasting cases."""
import json
import sys
from pathlib import Path

rows = {}
def add(key, points, caution, example, practice, overview=None):
    rows[key] = dict(pontos=points, atencao=[caution], exemplo=example, prova=practice, overview=overview)

add('art-1', ['Sisnad combina prevenção, atenção/reinserção e repressão; não é apenas aparelho policial.', 'A definição exige especificação em lei ou lista atualizada pelo Executivo federal.'],
    'Capacidade de causar dependência, isoladamente, não transforma qualquer produto em droga para todo efeito penal. A lista normativa e o tempo do fato importam.',
    'Uma prova apresenta o Sisnad como sistema exclusivamente repressivo: faltam prevenção e atenção/reinserção. Variação: uma substância não vira automaticamente objeto de crime apenas porque pode causar dependência; conferir a especificação normativa.',
    ['O Sisnad tem finalidade exclusivamente policial? Não; também abrange prevenção, atenção e reinserção.', 'Basta causar dependência para preencher toda a definição legal? Não; o parágrafo exige especificação em lei ou lista do Executivo federal.'])
add('art-2', ['A proibição tem ressalvas legais/regulamentares e referência ritualístico-religiosa específica.', 'A autorização federal de cultivo medicinal/científico exige local e prazo predeterminados e fiscalização.'],
    'Não apresentar a ressalva como permissão geral de autocultivo. Decisões judiciais, normas sanitárias e limites da autorização devem ser conferidos no caso; este lote não revisa toda a regulamentação da cannabis.',
    'Um projeto científico solicita autorização ao órgão competente e é submetido a limites de local, prazo e fiscalização. Variação: alegar genericamente finalidade medicinal não equivale a possuir autorização irrestrita para cultivo.',
    ['A autorização prevista no parágrafo único dispensa delimitar local e prazo? Não; ambos são exigidos, além de fiscalização.', 'A lei só contempla finalidade comercial recreativa para esse cultivo? Não; o parágrafo especifica fins medicinais ou científicos.'])
add('art-3', ['Há articulação tanto com SUS quanto com SUAS.', 'Os sistemas dos outros entes integram o conjunto por adesão, nos termos do §1º.'],
    'Integração entre políticas não torna todo serviço social uma atividade de investigação criminal.',
    'Saúde e assistência coordenam atendimento e reinserção no território. Variação: excluir o SUAS porque a pessoa recebe atendimento médico reduz indevidamente a articulação prevista.',
    ['O Sisnad se articula apenas com SUS? Não; o §2º também menciona SUAS.', 'A repressão exclui a função de reinserção do sistema? Não; são eixos que a lei manda articular.'])
add('art-4', ['Direitos fundamentais, autonomia e diversidade orientam o sistema.', 'Responsabilidade é compartilhada entre Estado e sociedade.', 'Abordagem multidisciplinar e equilíbrio entre prevenção, atenção e repressão são diretrizes distintas.'],
    'Não confundir equilíbrio entre atividades com obrigação de gastar percentuais idênticos: o artigo não fixa essa regra.',
    'Uma ação territorial integra saúde, escola e assistência em vez de estigmatizar usuários. Variação: afirmar que responsabilidade social exonera o Estado inverte o princípio de responsabilidade compartilhada.',
    ['A responsabilidade compartilhada dispensa atuação estatal? Não; pressupõe participação de Estado e sociedade.', 'O princípio de equilíbrio fixa orçamento igual para cada eixo? Não; o artigo não estabelece essa fórmula.'])
add('art-5', ['Inclusão social busca reduzir vulnerabilidades e riscos.', 'Conhecimento, integração com políticas setoriais e coordenação compõem os objetivos.'],
    'Objetivos de inclusão e conhecimento não devem ser substituídos por uma promessa de erradicação absoluta que o dispositivo não formula.',
    'Uma política combina educação e assistência para reduzir vulnerabilidade. Variação: medir apenas número de prisões não representa todos os objetivos do artigo.',
    ['A inclusão social é objetivo expresso? Sim; busca reduzir a vulnerabilidade a comportamentos de risco.', 'Socializar conhecimento sobre drogas fica fora dos objetivos? Não; está no inciso II.'])
add('art-7', ['Orientação central convive com execução descentralizada.', 'A organização alcança as esferas federal, distrital, estadual e municipal e depende de regulamento.'],
    'Coordenar centralmente não significa que a União executará sozinha todo serviço local.',
    'Diretrizes nacionais orientam uma atividade executada no Município. Variação: centralizar todos os atendimentos na esfera federal contraria a execução descentralizada.',
    ['Orientação central e execução descentralizada são incompatíveis? Não; o artigo prevê as duas conjuntamente.', 'A descentralização exclui orientação nacional? Não; a orientação central continua prevista.'])
add('art-8-a', ['União coordena o Sisnad, formula política e elabora plano em parceria.', 'Publicidade dos repasses e divulgação de estatísticas são competências específicas.', 'Há financiamento e colaboração com os entes; incisos vetados não fornecem competências.'],
    'A parceria na elaboração do plano não elimina a competência federal; tampouco o veto permite reconstruir poderes inexistentes.',
    'A União publica informações de repasses e elabora o plano com entes e sociedade. Variação: excluir toda participação local por ser competência federal confunde coordenação com atuação isolada.',
    ['A elaboração do plano dispensa parceria com outros entes e sociedade? Não; o inciso II prevê essa parceria.', 'Publicidade de repasses está entre as competências? Sim; é prevista no inciso XI.'])
add('art-8-d', ['Plano Nacional: duração de 5 anos desde sua aprovação.', 'O poder público deve dar ampla divulgação ao conteúdo.', 'Integração de áreas, participação social, escolarização e trabalho são objetivos expressos.'],
    'Não contar os 5 anos desde a lei ou desde cada atendimento: o marco é a aprovação do plano.',
    'Um plano aprovado em determinado dia inicia nesse marco sua duração quinquenal. Variação: a data de publicação da Lei 13.840 não é automaticamente a aprovação de todos os planos seguintes.',
    ['Qual é o marco dos 5 anos? A aprovação do plano, conforme o §1º.', 'O plano pode ter seu conteúdo mantido sigiloso como regra geral? Não; o §2º exige ampla divulgação.'])
add('art-8-e', ['Conselhos locais auxiliam, colaboram, propõem cooperação e promovem estudos.', 'Os objetivos alcançam prevenção, tratamento, acolhimento, reinserção e repressão.'],
    'Propor instrumento de cooperação não é celebrar qualquer contrato automaticamente nem assumir competência policial.',
    'O conselho municipal propõe cooperação e produz estudo para subsidiar a política. Variação: emitir condenação criminal não está entre os objetivos deste artigo.',
    ['Os conselhos apenas tratam de repressão? Não; têm funções também de prevenção, atendimento e integração.', 'Propor cooperação equivale a julgar crimes? Não; são atribuições de naturezas distintas.'])
add('art-16', ['Comunicar casos atendidos e óbitos ao órgão competente do sistema municipal de saúde.', 'Preservar a identidade das pessoas conforme orientações da União.'],
    'O dever de comunicação não autoriza publicar nomes ou presumir denúncia criminal de todo paciente.',
    'Uma instituição comunica os eventos ao órgão municipal competente com preservação da identidade. Variação: divulgar em rede social a lista nominal dos atendidos viola a distinção entre comunicação institucional e exposição pública.',
    ['A lei manda publicar nomes dos usuários? Não; determina preservar a identidade.', 'A comunicação prevista inclui óbitos? Sim; inclui casos atendidos e óbitos ocorridos.'])
add('art-17', ['Dados estatísticos nacionais de repressão integram sistema de informações do Executivo.', 'Estatística não se confunde com prova individual de culpabilidade.'],
    'Não trocar estatísticas nacionais de repressão por exposição indiscriminada de prontuários de saúde.',
    'Um relatório agregado sobre repressão alimenta o sistema de informações. Variação: uma tabela estatística não prova por si a participação de uma pessoa em crime.',
    ['Os dados previstos integram sistema do Executivo? Sim; é o destino indicado no artigo.', 'Estatística nacional condena automaticamente um indivíduo? Não; informação agregada e prova individual são coisas distintas.'])
add('art-18', ['Prevenção reduz vulnerabilidades e riscos.', 'Também promove e fortalece fatores de proteção.'],
    'Não reduzir prevenção à repressão do tráfico ou à ameaça de punição; o artigo descreve outra dimensão da política.',
    'Projeto fortalece vínculos familiares e reduz exposição a riscos. Variação: somente apreender drogas não demonstra, por si, que o projeto executou as atividades preventivas definidas aqui.',
    ['Prevenção envolve apenas reduzir fatores de risco? Não; também fortalece fatores de proteção.', 'A lei define prevenção como simples condenação penal? Não; descreve redução de vulnerabilidade e fortalecimento de proteção.'])
add('art-19', ['Fundamentação científica e conceitos objetivos devem evitar preconceito e estigma.', 'Não uso, retardamento do uso e redução de riscos são resultados desejáveis distintos.', 'Prevenção para crianças/adolescentes deve observar também as diretrizes do Conanda.'],
    'A política não precisa tratar todas as populações e substâncias de forma idêntica; o inciso V manda adequar estratégias às especificidades.',
    'Uma equipe adapta ação à faixa etária e ao contexto sociocultural com fundamento científico. Variação: rejeitar redução de riscos como resultado preventivo contradiz o inciso VI.',
    ['A lei admite redução de riscos como resultado desejável? Sim; junto do não uso e do retardamento do uso.', 'Toda ação deve ignorar diferenças socioculturais? Não; a lei exige estratégias adequadas às especificidades.'])
add('art-19-a', ['Semana Nacional: quarta semana de junho, anualmente.', 'Intensificam-se informação, debate, boas práticas e mobilização da comunidade e ensino.'],
    'Uma semana de intensificação não suspende ações preventivas durante o resto do ano.',
    'Uma escola intensifica campanhas na quarta semana de junho. Variação: encerrar o trabalho preventivo nas demais semanas não é obrigação prevista pela norma.',
    ['A semana legal é a primeira de junho? Não; é a quarta semana de junho.', 'A criação da semana proíbe campanhas fora dela? Não; prevê intensificação anual, não exclusividade.'])
add('art-20', ['Atenção visa qualidade de vida e redução de riscos e danos.', 'A regra alcança usuários, dependentes e respectivos familiares.'],
    'Não confundir atenção com reinserção social do art. 21, embora possam atuar juntas.',
    'Um serviço atende a pessoa e orienta seus familiares para reduzir danos e melhorar qualidade de vida. Variação: excluir familiares de toda atividade de atenção contraria o público expresso do artigo.',
    ['A atenção inclui os familiares? Sim; o artigo os menciona expressamente.', 'O foco descrito é apenas elevar número de condenações? Não; é qualidade de vida e redução de riscos e danos.'])
add('art-21', ['Reinserção busca integrar ou reintegrar em redes sociais.', 'Usuários/dependentes e respectivos familiares são abrangidos.'],
    'Redes sociais aqui são redes de vínculos e integração; não apenas aplicativos ou plataformas digitais.',
    'A equipe apoia o retorno à convivência comunitária e a vínculos familiares. Variação: criar somente uma conta em aplicativo não demonstra a reinserção social definida pela lei.',
    ['Redes sociais significa apenas plataforma digital? Não; o contexto é integração e reintegração social.', 'A reinserção é definida como punição mais severa? Não; seu objeto é a integração nas redes sociais.'])
add('art-22', ['Projeto terapêutico deve ser individualizado e orientado à inclusão e redução de riscos/danos.', 'Sempre que possível, equipes multiprofissionais e abordagem multidisciplinar.', 'PIA, educação continuada, trabalho e orientação adequada integram as diretrizes.'],
    'Respeito independe das condições pessoais; tratamento padronizado que ignora peculiaridades não atende à individualização.',
    'A equipe adapta projeto à pessoa e seus vínculos, com metas de saúde e inclusão. Variação: impor um roteiro idêntico sem considerar peculiaridades socioculturais afasta a diretriz do inciso II.',
    ['O projeto terapêutico deve ignorar necessidades individuais? Não; o inciso III exige individualização.', 'A orientação só deve tratar do uso habitual? Não; o inciso X também menciona consequências do uso ocasional.'])
add('art-22-a', ['Atendidos por órgãos do Sisnad terão atendimento em educação profissional/tecnológica, EJA e alfabetização.'],
    'Não transformar atendimento nesses programas em diploma automático ou dispensa dos requisitos educacionais aplicáveis.',
    'A pessoa é encaminhada a programa de alfabetização e formação compatível com suas necessidades. Variação: participar do Sisnad não gera certificação profissional sem o percurso educativo.',
    ['A alfabetização é contemplada? Sim; junto de educação profissional/tecnológica e EJA.', 'O artigo concede diploma automático? Não; prevê atendimento em programas, não certificação sem aprendizagem.'])
add('art-23', ['Redes de saúde dos entes devem desenvolver programas com previsão orçamentária adequada.', 'O parágrafo único prevê estratégia específica para mulheres usuárias/dependentes de álcool, especialmente gestantes e puérperas.'],
    'O destaque a gestantes e puérperas não exclui todas as demais mulheres do grupo descrito. Não confundir previsão orçamentária com promessa de tratamento idêntico para qualquer caso.',
    'Uma rede planeja assistência multiprofissional às mulheres do público descrito, com atenção especial ao período gestacional e pós-parto. Variação: atender exclusivamente gestantes excluindo as demais mulheres inverte o uso de em especial.',
    ['A previsão orçamentária é obrigatória? Sim; o caput a exige para os programas.', 'O parágrafo único limita a estratégia somente a gestantes? Não; destaca gestantes e puérperas dentro do grupo das mulheres descrito.'])
add('art-23-a', ['Ambulatório tem prioridade; internação só quando recursos extra-hospitalares forem insuficientes.', 'Internação exige unidade de saúde/hospital geral com equipe e autorização de médico registrado no CRM do Estado.', 'Na involuntária, avaliar alternativas; apenas tempo necessário à desintoxicação, máximo de 90 dias. Internações e altas são informadas em até 72 horas aos órgãos indicados, com sigilo.', 'Na falta absoluta de familiar/responsável, a hipótese de solicitação por servidor exclui os da segurança pública; comunidade terapêutica não pode realizar internação.'],
    'Solicitar a medida não substitui decisão médica. Os 90 dias são limite da involuntária, não duração mínima ou prazo comum do PIA. A família pode requerer ao médico a interrupção a qualquer tempo; isso não equivale a determinar alta automaticamente.',
    'A equipe verifica insuficiência dos recursos extra-hospitalares e a decisão médica antes de internação involuntária. Variação: não se pode usar comunidade terapêutica para internar compulsoriamente alguém nem tratar o limite de 90 dias como permanência obrigatória.',
    ['O pedido da família sozinho substitui a decisão médica? Não; a internação exige autorização e formalização médica nas condições legais.', 'A internação involuntária deve durar obrigatoriamente 90 dias? Não; dura apenas o necessário à desintoxicação, com esse limite máximo.'],
    'O tratamento prioriza modalidades ambulatoriais. Internação é excepcional, em unidade de saúde ou hospital geral, com equipe multidisciplinar e autorização médica. A voluntária exige consentimento e declaração escrita; seu término decorre de decisão médica ou solicitação escrita da pessoa. A involuntária exige solicitação dos legitimados e decisão médica após avaliar drogas, padrão de uso e impossibilidade de alternativas. Não é prisão nem internação em comunidade terapêutica.')
add('art-23-b', ['PIA: até 30 dias desde ingresso no atendimento.', 'Avaliação prévia é multidisciplinar/multissetorial; o plano é elaborado pela equipe do primeiro projeto e atualizado nas fases posteriores.', 'Objetivos declarados pelo atendido, integração/capacitação, apoio e participação familiar e medidas de saúde constam do conteúdo mínimo.', 'Avaliação e plano são sigilosos.'],
    'Não contar prazo desde a lei, nem congelar o plano após a primeira elaboração. A responsabilização de familiares de crianças/adolescentes segue os termos do ECA, sem punição automática genérica.',
    'A pessoa ingressa no atendimento e a equipe organiza PIA no prazo de até 30 dias, com objetivos e necessidades individuais. Variação: ao mudar a fase de atendimento, manter plano desatualizado contraria o §4º.',
    ['O PIA é elaborado em até 30 dias desde qual marco? Desde o ingresso no atendimento.', 'O plano pode ser divulgado publicamente como regra? Não; as informações da avaliação e do plano são sigilosas.'])
add('art-24', ['Entes podem conceder benefícios a instituições privadas com programas de reinserção no mercado de trabalho.', 'O usuário/dependente deve ser encaminhado por órgão oficial na hipótese descrita.'],
    'Poderão conceder não equivale a benefício automático e incondicionado a toda empresa.',
    'Instituição mantém programa laboral para pessoas encaminhadas por órgão oficial e é avaliada para benefício. Variação: só contratar qualquer trabalhador não comprova os requisitos do programa previsto.',
    ['A lei impõe benefício automático a toda instituição privada? Não; prevê possibilidade na hipótese descrita.', 'O encaminhamento oficial integra essa hipótese? Sim; é condição expressa do texto.'])
add('art-25', ['Recursos do Funad podem atender instituições civis sem fins lucrativos nas áreas indicadas.', 'Disponibilidade orçamentária E financeira condiciona o repasse.'],
    'Não confundir Funad com FNSP nem prometer recursos independentemente de orçamento, caixa e regras de transferência.',
    'Uma instituição sem fins lucrativos atua em atenção à saúde/assistência de usuários e requer recursos do Funad. Variação: a mera existência de previsão no orçamento, sem disponibilidade financeira, não dispensa a condição cumulativa.',
    ['O artigo prevê repasse incondicional? Não; depende de disponibilidade orçamentária e financeira.', 'Funad e FNSP são o mesmo fundo neste dispositivo? Não; o artigo indica especificamente o Funad.'])
add('art-26', ['Condenado em pena privativa de liberdade e pessoa sob medida de segurança têm serviços de atenção à saúde garantidos.', 'A garantia não depende de se chamar a medida de prisão ou tratamento.'],
    'Cumprir pena não extingue o direito à atenção à saúde; o artigo não autoriza substituição automática da condenação por atendimento.',
    'Uma pessoa cumpre pena e necessita dos serviços de atenção definidos no sistema penitenciário. Variação: estar sob medida de segurança também está previsto, sem confundir a garantia de saúde com revisão automática da sanção.',
    ['A pessoa sob medida de segurança foi excluída? Não; o artigo a abrange expressamente.', 'Garantir atenção à saúde substitui automaticamente toda pena? Não; a garantia de atendimento não é essa regra de substituição.'])
add('art-26-a', ['Adesão E permanência voluntárias e escritas; acolhimento é etapa transitória de reinserção.', 'Avaliação médica prévia e PIA são requisitos; isolamento físico é vedado.', 'Comprometimentos graves que exijam atenção contínua ou de emergência devem ser encaminhados à rede de saúde.'],
    'Acolhimento residencial não se transforma em internação: o art. 23-A, §9º, veda internação em comunidades terapêuticas. Não criar conteúdo para parágrafos vetados.',
    'Uma pessoa adere voluntariamente por escrito ao acolhimento, depois de avaliação, com PIA e sem isolamento. Variação: necessidade grave de atenção médico-hospitalar contínua exige encaminhamento à rede de saúde, não permanência forçada na comunidade.',
    ['A voluntariedade vale somente para ingresso? Não; adesão e permanência devem ser voluntárias.', 'A comunidade pode substituir hospital numa necessidade grave e contínua? Não; o §1º prevê encaminhamento à rede de saúde e a lei veda internação ali.'])

if __name__ == '__main__':
    folder = Path(sys.argv[1])
    read = lambda table: json.loads((folder/'before'/f'{table}.json').read_text())
    course = next(c for c in read('legal_courses') if c['slug']=='drogas')
    units = {u['unit_key']:u for u in read('legal_course_units') if u['course_id']==course['id'] and u['content_status']=='current'}
    existing = {e['unit_id']:e for e in read('legal_unit_explanations')}
    authored = {}
    for key, data in rows.items():
        old = existing[units[key]['id']]
        authored[key] = dict(simples=data['overview'] or old['simples'], **{k:v for k,v in data.items() if k!='overview'},
                             termos=old['termos'], remissoes=old['remissoes'])
    Path('scripts/explicacoes/drogas-atencao-revisao-aplicada-2026-10-12.json').write_text(
        json.dumps(dict(course_slug='drogas',units=authored),ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(len(authored),'explicit prevention and care reviews; other units remain pending')
