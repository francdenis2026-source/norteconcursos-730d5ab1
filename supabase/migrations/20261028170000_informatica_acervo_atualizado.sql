begin;
insert into public.study_materials (slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,syllabus_topic_order,source_note,legal_basis,flashcards,quiz,content_status,reviewed_by,reviewed_at,law_version_checked_at)
values ('informatica-acervo-atualizado-2026','Informática','Trilha atualizada de Informática',900,'Informática para concursos — trilha consolidada e atualizada','Redes, segurança, sistemas, Office, internet, nuvem, bancos de dados, inteligência artificial e transformação digital, com controle de obsolescência.',$md$## Trilha atualizada

### Fundamentos e sistemas
Hardware, software, memória, armazenamento, sistemas operacionais, arquivos, permissões e comandos básicos. Windows 10, Internet Explorer e Outlook Express devem aparecer apenas quando o edital exigir expressamente a versão histórica; não são tratados como tecnologia atual.

### Redes e protocolos
Modelos OSI e TCP/IP, LAN/WAN, meios de transmissão, dispositivos, DNS, DHCP, HTTP/HTTPS, TCP/UDP, VPN, internet, intranet e extranet. Diferencie modelo conceitual, protocolo e equipamento.

### Segurança da informação
Confidencialidade, integridade, disponibilidade, autenticidade e não repúdio; malware, phishing, engenharia social, antivírus, firewall, backup, autenticação e resposta a incidentes.

### Nuvem, dados e IA
Modelos de nuvem, virtualização, bancos de dados, metadados, OLAP, big data e inteligência artificial. Diferencie dado, informação, conhecimento e decisão.

### Ferramentas de escritório
Word/Writer, Excel/Calc, PowerPoint/Impress, fórmulas, referências, estilos, apresentações e atalhos. A interface muda entre versões; sinalize quando o comando depende da edição do software.

### Navegação e pesquisa
Navegadores, cache, cookies, privacidade, mecanismos de busca, downloads e redes sociais. Priorize segurança, pesquisa e funcionamento dos protocolos.

## Critério de atualização

- Separar conceitos permanentes de menus específicos de uma versão.
- Marcar software sem suporte como histórico ou dependente de edital.
- Consolidar apostilas, slides e cópias repetidas.
- Usar exemplos próprios, sem reproduzir marcas autorais.
- Conferir conceitos técnicos em documentação oficial antes da publicação.$md$,'Concursos públicos — Informática',1,'Trilha consolidada a partir das apostilas de Informática enviadas pelo usuário em 28/10/2026. Duplicatas, slides e marcas autorais não são reproduzidos. Conteúdo antigo de software só deve ser usado quando o edital exigir a versão.','[]'::jsonb,'[{"f":"Quais são os pilares da segurança da informação?","b":"Confidencialidade, integridade e disponibilidade; autenticidade e não repúdio também aparecem conforme o contexto."},{"f":"Quando estudar Windows 10 ou Internet Explorer?","b":"Somente quando o edital exigir expressamente a versão histórica."},{"f":"Qual a diferença entre internet e intranet?","b":"Internet é uma rede pública global; intranet é uma rede privada de uma organização."}]'::jsonb,'[{"q":"Um menu de uma versão antiga do Office deve ser tratado como regra universal.","a":false,"why":"Interfaces mudam; o material deve sinalizar a versão e priorizar o conceito."},{"q":"VPN é sinônimo de internet pública.","a":false,"why":"VPN cria um túnel lógico protegido sobre uma rede, pública ou privada."}]'::jsonb,'active','3ec587f5-0bf5-458d-841e-a19ff9ebbbf6',now(),now())
on conflict (slug) do update set title=excluded.title,summary=excluded.summary,body_md=excluded.body_md,source_note=excluded.source_note,flashcards=excluded.flashcards,quiz=excluded.quiz,updated_at=now();
commit;
