UPDATE study_materials SET body_md=body_md || '

## Acesso remoto seguro: cenário de prova

Uma servidora acessa de casa um sistema interno da instituição. A **intranet** é o ambiente de acesso restrito; a **VPN** pode oferecer um túnel protegido entre o dispositivo e a rede. Ainda assim, o sistema pode exigir login e autenticação multifator. A **extranet** permite acesso controlado a determinados recursos por parceiros autorizados.

**Cuidado:** VPN não é sinônimo de anonimato absoluto; o provedor, o destino e outros mecanismos podem permitir identificação. Também não torna confiável qualquer site acessado.

**Dica:** diferencie o tipo de rede (internet, intranet, extranet) da tecnologia de conexão (VPN).
',quiz=quiz || '[{"q":"Uma intranet pode ser acessada remotamente por usuários autorizados mediante VPN e autenticação.","a":true,"why":"Certo. Intranet é rede de acesso restrito, mas isso não exige que o usuário esteja fisicamente no prédio. VPN e autenticação podem permitir acesso remoto seguro."},{"q":"A VPN transforma automaticamente qualquer serviço interno em uma página pública acessível sem credenciais.","a":false,"why":"Errado. A VPN fornece uma conexão protegida conforme sua configuração, mas não elimina controles de acesso nem torna o serviço público."}]'::jsonb,updated_at=now() WHERE slug='informatica-03-04' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Acesso remoto seguro: cenário de prova%';
UPDATE study_materials SET body_md=body_md || '

## Encapsulamento e camadas: exemplo completo

Ao acessar um site, a aplicação prepara a requisição HTTP; o transporte (por exemplo, TCP, ou QUIC sobre UDP no HTTP/3) fornece os mecanismos correspondentes; IP realiza endereçamento e encaminhamento entre redes; e as tecnologias de enlace e física cuidam da comunicação no meio local.

**TCP versus UDP:** TCP é orientado a conexão e oferece entrega confiável e ordenada de bytes; UDP é não orientado a conexão e não oferece essas garantias por si só. Não confunda o protocolo de transporte com o protocolo de rede IP.

**Macete:** OSI 3 = rede/IP; OSI 4 = transporte/TCP ou UDP; OSI 7 = aplicação/HTTP ou DNS. O modelo TCP/IP agrupa funções de modo diferente do OSI de sete camadas.
',quiz=quiz || '[{"q":"No modelo OSI, o protocolo IP está associado à camada 3 e o TCP à camada 4.","a":true,"why":"Certo. IP pertence à camada de rede, relacionada ao endereçamento e encaminhamento; TCP pertence à camada de transporte, oferecendo conexão e confiabilidade."},{"q":"O UDP, por si só, garante entrega confiável e ordenada de todos os dados transmitidos.","a":false,"why":"Errado. UDP é um protocolo de transporte não orientado a conexão e não fornece, sozinho, garantia de entrega ou ordenação. Aplicações podem implementar mecanismos adicionais."}]'::jsonb,updated_at=now() WHERE slug='informatica-05-05' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Encapsulamento e camadas: exemplo completo%';
UPDATE study_materials SET body_md=replace(body_md,'## Busca, fontes e certificados\\n\\n## Complemento','## Busca, fontes e certificados'||chr(10)||chr(10)||'## Complemento'),updated_at=now() WHERE slug='informatica-03-04' AND strpos(body_md,'## Busca, fontes e certificados\\n\\n## Complemento')>0;
UPDATE study_materials SET quiz=jsonb_set(quiz,'{1,why}',to_jsonb('Errado. VPN protege a comunicação conforme a configuração, mas não elimina rastros de autenticação, cookies, registros de conexão nem outras formas de identificação.'::text)),updated_at=now() WHERE slug='informatica-03-04' AND quiz->1->>'why'='VPN não elimina todas as formas de identificação.';
UPDATE study_materials SET quiz=jsonb_set(quiz,'{1,why}',to_jsonb('Certo. TCP é orientado a conexão e oferece mecanismos de confirmação, retransmissão e ordenação dos bytes. Não confunda com UDP, que não oferece essas garantias por si só.'::text)),updated_at=now() WHERE slug='informatica-05-05' AND quiz->1->>'why'='Estabelece conexão e mecanismos de confiabilidade.';