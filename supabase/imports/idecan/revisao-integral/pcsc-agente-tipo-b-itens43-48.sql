-- PC-SC Agente, Tipo B, Tecnologia da Informação, itens 43–48.
-- Revisão técnica baseada no edital e em fontes primárias/técnicas.
-- Itens 43 e 44 permanecem under_review por imprecisão técnica do enunciado.
begin;
do $review$
declare
 r record; q public.board_exam_questions; before_row jsonb; after_row jsonb;
 audit_row public.idecan_pedagogical_review_audit;
 v_source uuid; v_edition uuid; v_topic uuid;
 batch text := 'idecan-pcsc-agente-tipo-b-ti-43-48-v1';
 edital_url text := $edital$https://portal.doe.sea.sc.gov.br/repositorio/2025/20251212/Jornal/22660.pdf$edital$;
 program_text text := $program$TECNOLOGIA DA INFORMAÇÃO, SEGURANÇA CIBERNÉTICA E CRIMES DIGITAIS: Redes de Computadores: conceitos básicos, princípios de funcionamento e arquitetura de redes LAN, WAN e MAN; conceitos de endereço IP, CGNAT, porta lógica e redes P2P; protocolos de internet e intranet, IPv4 e IPv6, DNS, VPN, VoIP, DHCP, TCP, UDP, SNMP, HTTP, HTTPS, FTP e SFTP; computação em nuvem; navegadores; deep web e dark web; provedores de acesso e de aplicações; identificação de usuários. Telecomunicações: sistemas móveis, arquitetura de redes celulares, estações rádio base e identificação de usuários. Segurança da Informação e Ameaças: vírus, worms, ataques e programas maliciosos; proteção, segurança de dados e privacidade; antivírus, firewall, antispyware e autenticação multifator. Investigação e cadeia de custódia digital: hash, metadados, criptografia, mensageria, redes sociais, plataformas de conteúdo, celulares e tablets. Teoria da informação e sistemas de informação: dado, informação, conhecimento, inteligência e sistemas de informação. Inteligência artificial: machine learning, redes neurais, LLMs e tipos de IA.$program$;
begin
 select id into v_source from public.content_sources where url=edital_url and is_official and status='vigente';
 if not found then raise exception 'Edital oficial PCSC ausente ou não vigente'; end if;
 select id into v_edition from public.syllabus_editions where contest_name='PC SC - Agente de Polícia Civil 2026' and role_name='Agente de Polícia Civil' and contest_year=2026;
 if not found or not exists(select 1 from public.syllabus_editions where id=v_edition and source_id=v_source and exam_board='IDECAN' and status='active') then raise exception 'Edição PCSC não corresponde ao edital oficial'; end if;
 insert into public.syllabus_topics(edition_id,block_name,discipline,topic_order,topic_text,content_status)
 values(v_edition,'Prova Objetiva','Tecnologia da Informação, Segurança Cibernética e Crimes Digitais',1,program_text,'current') on conflict(edition_id,discipline,topic_order) do nothing;
 select id into v_topic from public.syllabus_topics where edition_id=v_edition and discipline='Tecnologia da Informação, Segurança Cibernética e Crimes Digitais' and topic_order=1;
 if not found or not exists(select 1 from public.syllabus_topics where id=v_topic and topic_text=program_text and content_status='current') then raise exception 'Tópico de TI do edital ausente/divergente'; end if;
 for r in (select * from (values
  ($id$6efce673-a679-473a-a598-22b066c3ad77$id$::uuid,43,$ans$C$ans$,
   $old$A alternativa C é a indicada pelo gabarito registrado. A descrição corresponde a recursos de privacidade associados ao DuckDuckGo Browser; como comportamentos podem variar por versão e configuração, a identificação deve ser confirmada na documentação oficial do produto.$old$,
   $new$MANTIDA EM REVISÃO. O gabarito indica C (DuckDuckGo), mas o enunciado afirma que, por padrão, o navegador apaga dados ao fechar cada aba e bloqueia identificadores de hardware/sensores. A documentação oficial descreve Fire Tabs (no celular) e Fire Windows (no computador) como sessões isoladas cujos dados são apagados ao fechá-las; a navegação comum não apaga automaticamente todos os dados ao fechar cada aba. A documentação de proteção contra rastreamento também não sustenta a afirmação ampla sobre todo acesso a identificadores de hardware ou sensores. É necessário corrigir o enunciado para limitar a afirmação às sessões Fire e especificar a proteção de rastreamento perguntada.$new$,
   $topic$Navegadores, privacidade, sessões Fire Tabs/Fire Windows e proteção contra rastreamento; conferência de afirmações sobre exclusão de dados por sessão.$topic$,
   'under_review',$json$["https://duckduckgo.com/duckduckgo-help-pages/privacy/fire-tabs/","https://duckduckgo.com/duckduckgo-help-pages/privacy/web-tracking-protections/"]$json$::jsonb),
  ($id$96f8e25c-9f14-4aef-9531-a76b6a43d651$id$::uuid,44,$ans$E$,
   $old$Explicação preliminar: a alternativa E é a registrada no gabarito oficial. O item permanece em revisão para conferência do edital, da fonte primária e da compatibilidade entre enunciado, alternativas e resposta.$old$,
   $new$MANTIDA EM REVISÃO. A alternativa E reúne características verdadeiras dos serviços onion: circuitos Tor e endereços .onion derivados de chaves públicas. Porém, o enunciado generaliza que os serviços acessíveis pela infraestrutura Tor usam .onion. O Tor também permite acessar serviços da internet convencional por circuitos com relé de saída; serviços onion usam circuitos próprios e não um relé de saída convencional. A questão mistura esses dois modelos e chama o conjunto de característica exclusiva. Requer ajuste do enunciado para não ensinar uma arquitetura imprecisa.$new$,
   $topic$Deep web e dark web: rede Tor, circuitos de relés, serviços onion, endereços .onion e distinção entre acesso à internet convencional e onion services.$topic$,
   'under_review',$json$["https://support.torproject.org/about-tor/how-tor-works/","https://support.torproject.org/tor-browser/features/onion-services/","https://www.rfc-editor.org/rfc/rfc7686"]$json$::jsonb),
  ($id$4574080f-fe7a-4fdf-bd4b-8eb60a00f25a$id$::uuid,45,$ans$B$ans$,
   $old$A alternativa B é a correta. Estações rádio-base fornecem a interface radioelétrica com os dispositivos móveis e participam da gestão de mobilidade entre células.$old$,
   $new$B é correta. Estações Rádio Base (ERBs) fornecem a interface de rádio entre os dispositivos móveis e a rede da operadora. Em redes celulares, a mobilidade e a transferência de conexão entre células envolvem procedimentos coordenados pela rede; a estação participa da comunicação, mas não se deve entender que cada ERB decide sozinha todos os handovers. Entre as opções, ERB é a unidade descrita como ponto de acesso rádio e cobertura celular. O assunto consta expressamente no tópico de Telecomunicações do edital PCSC.$new$,
   $topic$Telecomunicações: sistemas móveis, arquitetura de redes celulares, função das estações rádio base (ERBs), cobertura e mobilidade entre células.$topic$,
   'active',$json$["https://portal.doe.sea.sc.gov.br/repositorio/2025/20251212/Jornal/22660.pdf"]$json$::jsonb),
  ($id$f368c7bf-18ec-4d71-a587-430b03e3417f$id$::uuid,46,$ans$A$ans$,
   $old$A alternativa A é a correta. Ransomware bloqueia ou criptografa dados e exige pagamento para tentar restabelecer o acesso.$old$,
   $new$A é correta. Ransomware é um tipo de malware que impede o acesso a dados ou sistemas, frequentemente por criptografia, e exige resgate para tentar restaurar o acesso. Pagar não garante a recuperação dos arquivos e não é necessário para que a ameaça seja classificada como ransomware. Spyware coleta informações; adware exibe publicidade; rootkit oculta atividade maliciosa; worm se replica e se propaga.$new$,
   $topic$Segurança da informação e ameaças: malware, ransomware, criptografia maliciosa, indisponibilidade de dados e distinção de spyware, adware, rootkit e worm.$topic$,
   'active',$json$["https://www.cisa.gov/stopransomware/ransomware-guide"]$json$::jsonb),
  ($id$4ff7f5bd-3b3d-4114-8460-5f39fb49a8c3$id$::uuid,47,$ans$C$ans$,
   $old$A alternativa C é a correta. Autenticação verifica a identidade alegada; identificação apenas informa quem é o usuário.$old$,
   $new$C é correta. Identificação é a declaração de uma identidade (por exemplo, informar um nome de usuário); autenticação verifica essa alegação por um ou mais fatores, como algo que a pessoa sabe, possui ou é. O enunciado descreve a comprovação da identidade antes de conceder acesso. Não confundir autenticação com autorização, que define quais recursos a identidade autenticada pode usar.$new$,
   $topic$Segurança da informação: identificação, autenticação de usuários, fatores de autenticação e distinção entre autenticação e autorização.$topic$,
   'active',$json$["https://csrc.nist.gov/glossary/term/authentication","https://csrc.nist.gov/glossary/term/identification"]$json$::jsonb),
  ($id$b03d1912-616e-4963-8cec-c70fb476f735$id$::uuid,48,$ans$D$ans$,
   $old$A alternativa D é a correta. Anti-spyware detecta, bloqueia e remove programas destinados a monitorar o usuário sem consentimento.$old$,
   $new$D é correta. Anti-spyware é uma ferramenta de segurança voltada à detecção e ao bloqueio ou remoção de spyware, software que coleta ou monitora informações do usuário sem conhecimento adequado. A descrição é sobre a categoria do programa malicioso e sua proteção correspondente; firewall controla tráfego, MFA verifica identidade por fatores distintos, criptografia protege dados e IPS detecta ou bloqueia tráfego/atividade maliciosa.$new$,
   $topic$Segurança da informação e ameaças: spyware, proteção anti-spyware e distinção entre firewall, autenticação multifator, criptografia e prevenção de intrusão.$topic$,
   'active',$json$["https://csrc.nist.gov/glossary/term/spyware"]$json$::jsonb)
 ) as v(id,item_number,answer,old_explanation,new_explanation,tested_topic,target_status,technical_sources)) loop
   select * into q from public.board_exam_questions where id=r.id for update;
   if not found then raise exception 'Questão % ausente; transação cancelada',r.item_number; end if;
   before_row:=to_jsonb(q);
   select * into audit_row from public.idecan_pedagogical_review_audit where batch_key=batch and question_id=q.id;
   if found then
    if before_row is distinct from audit_row.after_data then raise exception 'Item % mudou após este lote; revisão posterior preservada',r.item_number; end if;
   else
    if q.board<>'IDECAN' or q.contest_name<>'PC SC - Agente de Polícia Civil 2026' or q.exam_type<>'Tipo B'
      or q.item_number<>r.item_number or q.official_answer<>r.answer or q.content_status<>'under_review'
      or q.syllabus_topic_id is not null
      or regexp_replace(regexp_replace(coalesce(q.explanation,''),'<br[[:space:]]*/?>',' ','gi'),'[[:space:]]+',' ','g')
         <> regexp_replace(regexp_replace(r.old_explanation,'<br[[:space:]]*/?>',' ','gi'),'[[:space:]]+',' ','g') then
      raise exception 'Item %, estado/gabarito/explicação diverge do resultado conferido; transação cancelada',r.item_number; end if;
    update public.board_exam_questions set explanation=r.new_explanation,content_status=r.target_status,syllabus_topic_id=v_topic,
      tested_topic=r.tested_topic,legal_basis='[]'::jsonb,law_version_checked_at=null,legal_review_required=false,
      verified_at=now(),review_note=case when r.target_status='active'
        then 'Gabarito Tipo B conferido; explicação didática e conteúdo cotejados com fontes técnicas e tópico de Tecnologia da Informação do Anexo I do Edital PCSC nº 01/2025. Questão técnica, sem base jurídica.'
        else 'Gabarito Tipo B conferido, mas item mantido em revisão porque o enunciado contém imprecisão técnica que pode induzir a erro. Não liberar até corrigir o enunciado e revisar a questão.' end
    where id=q.id returning to_jsonb(board_exam_questions) into after_row;
    insert into public.idecan_pedagogical_review_audit(batch_key,question_id,before_data,after_data,evidence,reviewer_id)
    values(batch,q.id,before_row,after_row,jsonb_build_object('official_answer',r.answer,
      'official_answer_key_url','https://arquivos.qconcursos.com/prova/arquivo_gabarito/148842/idecan-2026-pc-sc-agente-de-policia-civil-gabarito.pdf',
      'official_answer_key_sha256','f470a95ec82c545e85859cd4ff10ae46eea8aea022761ef319c5be0b4297e432',
      'official_syllabus_url',edital_url,'official_syllabus_sha256','d7f9f37b5fc7ed09ec19360e998d2a07dc751260d3e59ce6f2623f50905d758a',
      'status_before','under_review','status_after',r.target_status,'reviewed_at','2026-10-24','technical_sources',r.technical_sources,
      'release_decision',case when r.target_status='active' then 'released' else 'held_for_stem_correction' end),auth.uid());
   end if;
 end loop;
end
$review$;
commit;
select item_number,content_status,official_answer,explanation,syllabus_topic_id,tested_topic,legal_basis,law_version_checked_at
from public.board_exam_questions where id in (
 $qid$6efce673-a679-473a-a598-22b066c3ad77$qid$::uuid,$qid$96f8e25c-9f14-4aef-9531-a76b6a43d651$qid$::uuid,
 $qid$4574080f-fe7a-4fdf-bd4b-8eb60a00f25a$qid$::uuid,$qid$f368c7bf-18ec-4d71-a587-430b03e3417f$qid$::uuid,
 $qid$4ff7f5bd-3b3d-4114-8460-5f39fb49a8c3$qid$::uuid,$qid$b03d1912-616e-4963-8cec-c70fb476f735$qid$::uuid
) order by item_number;
