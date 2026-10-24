-- PC-SC Agente, Tipo B, Redes de Computadores, itens 40–42.
-- Estado vivo fornecido pelo usuário: under_review, respostas B/A/D, sem vínculo curricular.
-- Fontes técnicas: RFC Editor/IETF (RFCs 6598, 6888, 3411, 3416 e 3417).
-- Este lote não atribui base jurídica a questões técnicas; guarda RFCs na trilha de auditoria.
begin;
do $review$
declare
 r record; q public.board_exam_questions; before_row jsonb; after_row jsonb;
 audit_row public.idecan_pedagogical_review_audit;
 v_source uuid; v_edition uuid; v_topic uuid;
 batch text := 'idecan-pcsc-agente-tipo-b-redes-40-42-v1';
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
    ($id$20d622a4-34f6-4ca9-8c51-16f641523079$id$::uuid, 40, $ans$B$ans$, $old$A alternativa B é a correta. A interligação de redes locais em localidades geograficamente separadas caracteriza uma WAN, ou rede de longa distância.$old$, $new$B é correta. WAN (Wide Area Network) conecta redes locais separadas por grandes distâncias, como filiais em cidades distintas por enlaces de operadoras.
A) descreve PAN, de alcance pessoal. C) anel é uma topologia, não a classificação pelo alcance. D) LAN tem alcance local. E) ponto a ponto descreve um tipo de enlace, não a rede geográfica descrita.
Base técnica: conteúdo de redes LAN, WAN e MAN do Anexo I do edital PCSC; distinção por abrangência geográfica.$new$, $topic$Redes de computadores: WAN e classificação de redes por abrangência geográfica; interligação de redes locais por enlaces de operadoras.$topic$, '[]'::jsonb),
    ($id$f7c2f911-adb5-4814-81a4-4382302dd218$id$::uuid, 41, $ans$A$ans$, $old$A alternativa A é a correta. O CGNAT, ou NAT em escala de operadora, permite que muitos clientes compartilhem endereços IPv4 públicos por meio do mapeamento de portas.$old$, $new$A é correta. CGNAT (Carrier-Grade NAT) é o NAT realizado na rede da operadora para compartilhar endereços IPv4 públicos entre muitos assinantes, usando mapeamento de endereços e portas. A RFC 6598 reserva 100.64.0.0/10 como espaço compartilhado para redes de provedores; a RFC 6888 descreve requisitos comuns de CGN.
B) GRE encapsula tráfego em túneis; C) roteamento hierárquico organiza rotas; D) proxy reverso atua na camada de aplicação; E) dual stack usa IPv4 e IPv6, não é o mecanismo descrito.
Em investigações, a atribuição confiável pode depender de endereço público, porta de origem, protocolo e horário, além dos registros de tradução da operadora.
Referência técnica: RFCs 6598 e 6888, RFC Editor/IETF.$new$, $topic$Redes de computadores: CGNAT, compartilhamento de IPv4 e mapeamento de portas; RFCs 6598 e 6888.$topic$, '["https://www.rfc-editor.org/rfc/rfc6598", "https://www.rfc-editor.org/rfc/rfc6888"]'::jsonb),
    ($id$ff0d209d-063c-402a-bfda-dedca67623ac$id$::uuid, 42, $ans$D$ans$, $old$A alternativa D é a correta. SNMP utiliza arquitetura gerente-agente para coletar e, conforme a configuração, alterar informações de dispositivos de rede.$old$, $new$D é correta. SNMP (Simple Network Management Protocol) usa uma arquitetura de gerente e agentes: o gerente consulta agentes nos dispositivos por objetos identificados em MIBs/OIDs. Operações GET consultam valores e SET pode alterá-los se houver autorização. Em geral, consultas usam UDP 161 e notificações SNMP usam UDP 162 (RFC 3417). SNMPv3 oferece mecanismos de autenticação e privacidade.
A) DHCP atribui configuração de rede; B) HTTP transfere recursos web; C) DNS resolve nomes; E) FTP transfere arquivos.
Referências técnicas: RFCs 3411 (arquitetura), 3416 (operações) e 3417 (mapeamento de transporte), RFC Editor/IETF.$new$, $topic$Redes de computadores: SNMP, arquitetura gerente-agente, operações e portas usuais; RFCs 3411, 3416 e 3417.$topic$, '["https://www.rfc-editor.org/rfc/rfc3411", "https://www.rfc-editor.org/rfc/rfc3416", "https://www.rfc-editor.org/rfc/rfc3417"]'::jsonb)
 ) as v(id,item_number,answer,old_explanation,new_explanation,tested_topic,technical_sources)) loop
   select * into q from public.board_exam_questions where id=r.id for update;
   if not found then raise exception 'Questão % ausente; transação cancelada',r.item_number; end if;
   before_row:=to_jsonb(q);
   select * into audit_row from public.idecan_pedagogical_review_audit where batch_key=batch and question_id=q.id;
   if found then if before_row is distinct from audit_row.after_data then raise exception 'Item % mudou após este lote; revisão posterior preservada',r.item_number; end if;
   else
    if q.board<>'IDECAN' or q.contest_name<>'PC SC - Agente de Polícia Civil 2026' or q.exam_type<>'Tipo B'
      or q.item_number<>r.item_number or q.official_answer<>r.answer or q.content_status<>'under_review'
      or q.syllabus_topic_id is not null
      or regexp_replace(regexp_replace(coalesce(q.explanation,''),'<br[[:space:]]*/?>',' ','gi'),'[[:space:]]+',' ','g')
         <> regexp_replace(regexp_replace(r.old_explanation,'<br[[:space:]]*/?>',' ','gi'),'[[:space:]]+',' ','g') then
      raise exception 'Item %, estado/gabarito/explicação diverge do resultado conferido; transação cancelada',r.item_number; end if;
    update public.board_exam_questions set explanation=r.new_explanation,content_status='active',syllabus_topic_id=v_topic,
      tested_topic=r.tested_topic,legal_basis='[]'::jsonb,law_version_checked_at=null,legal_review_required=false,
      verified_at=now(),review_note='Gabarito definitivo Tipo B conferido. Explicação técnica cotejada com referências RFC do IETF e conteúdo de Redes de Computadores do Anexo I do Edital PCSC nº 01/2025; sem base jurídica, por se tratar de questão técnica.'
    where id=q.id returning to_jsonb(board_exam_questions) into after_row;
    insert into public.idecan_pedagogical_review_audit(batch_key,question_id,before_data,after_data,evidence,reviewer_id)
    values(batch,q.id,before_row,after_row,jsonb_build_object('official_answer',r.answer,
      'official_answer_key_url','https://arquivos.qconcursos.com/prova/arquivo_gabarito/148842/idecan-2026-pc-sc-agente-de-policia-civil-gabarito.pdf',
      'official_answer_key_sha256','f470a95ec82c545e85859cd4ff10ae46eea8aea022761ef319c5be0b4297e432',
      'official_syllabus_url',edital_url,'official_syllabus_sha256','d7f9f37b5fc7ed09ec19360e998d2a07dc751260d3e59ce6f2623f50905d758a',
      'status_before','under_review','status_after','active','reviewed_at','2026-10-24','technical_sources',r.technical_sources),auth.uid());
   end if;
 end loop;
end
$review$;
commit;
select item_number,content_status,official_answer,explanation,syllabus_topic_id,tested_topic,legal_basis,law_version_checked_at
from public.board_exam_questions where id in ($qid$20d622a4-34f6-4ca9-8c51-16f641523079$qid$::uuid,$qid$f7c2f911-adb5-4814-81a4-4382302dd218$qid$::uuid,$qid$ff0d209d-063c-402a-bfda-dedca67623ac$qid$::uuid) order by item_number;
