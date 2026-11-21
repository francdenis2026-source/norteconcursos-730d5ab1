UPDATE study_materials SET body_md=body_md || '

## Quatro serviços em uma situação real

Ao conectar o notebook ao Wi-Fi, o **DHCP** pode fornecer endereço IP, máscara, gateway e servidor DNS. Ao digitar o endereço de um portal, o **DNS** consulta registros para resolver o nome. O navegador então troca mensagens HTTP com o servidor; se a conexão é HTTPS, o **TLS** protege a comunicação em trânsito.

**Cuidado:** HTTPS não garante que um site seja honesto; um golpista também pode usar HTTPS. DNS não atribui automaticamente o endereço IP do computador. DHCP não é o protocolo que criptografa páginas web.

**Macete:** DHCP configura a rede; DNS resolve nomes; HTTP troca mensagens web; HTTPS acrescenta proteção criptográfica à conexão.
',quiz=quiz || '[{"q":"Um computador pode receber automaticamente endereço IP e gateway por DHCP antes de consultar um domínio via DNS.","a":true,"why":"Certo. DHCP distribui configurações de rede; DNS resolve nomes de domínio em registros, como endereços IP. São funções diferentes e complementares."},{"q":"A presença de HTTPS garante que o conteúdo publicado em uma página seja verdadeiro e que o site não pratique fraudes.","a":false,"why":"Errado. HTTPS com TLS protege a conexão em trânsito e autentica o servidor conforme o certificado; não garante a honestidade do responsável nem a veracidade das informações."}]'::jsonb,updated_at=now() WHERE slug='informatica-03-041' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Quatro serviços em uma situação real%';
UPDATE study_materials SET body_md=body_md || '

## Três golpes e a resposta adequada

**Phishing:** chega um e-mail imitando o banco e solicitando senha em página falsa. A fraude pode ocorrer sem malware. **Ransomware:** programa malicioso pode criptografar arquivos e exigir pagamento; backups isolados e testados ajudam na recuperação. **Spyware:** software pode coletar informações sem autorização.

**Defesa em camadas:** confirme solicitações por canais oficiais, use autenticação multifator, atualize sistemas e mantenha cópias de segurança. Nenhuma medida isolada elimina todo risco.

**Pegadinha de prova:** engenharia social manipula pessoas; malware designa software malicioso. Um mesmo ataque pode combinar ambos, mas os conceitos não são sinônimos.
',quiz=quiz || '[{"q":"Uma página falsa de autenticação que coleta senhas pode caracterizar phishing mesmo sem instalar programa malicioso.","a":true,"why":"Certo. Phishing é fraude baseada em enganar a vítima para obter informações ou ações; a instalação de malware não é requisito."},{"q":"O uso de autenticação multifator torna impossível qualquer golpe de engenharia social.","a":false,"why":"Errado. A autenticação multifator reduz riscos, mas golpistas ainda podem tentar obter códigos, aprovações ou sessões por engenharia social."}]'::jsonb,updated_at=now() WHERE slug='informatica-04-01' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Três golpes e a resposta adequada%';
UPDATE study_materials SET body_md=body_md || '

## Exemplo completo de recuperação

Domingo: backup completo de 100 arquivos. Segunda: 5 arquivos mudam. Terça: outros 3 mudam. Um **incremental** de terça guarda alterações desde o backup de segunda; um **diferencial** de terça guarda alterações desde o completo de domingo, incluindo as mudanças acumuladas.

Para restaurar usando incrementais, em geral é necessário o backup completo e a sequência de incrementais até o ponto desejado. Com diferencial, em geral bastam o completo e o diferencial escolhido.

**Dica:** a política de retenção, a verificação de integridade e o teste de restauração são tão importantes quanto a criação da cópia. Sincronizar pastas não substitui automaticamente uma estratégia de backup.
',quiz=quiz || '[{"q":"Após um backup completo no domingo e incrementais na segunda e na terça, a restauração típica até terça utiliza o completo e os dois incrementais.","a":true,"why":"Certo. Cada incremental armazena alterações desde o backup anterior, de modo que a recuperação geralmente depende da cadeia completa."},{"q":"O backup diferencial de terça sempre exige aplicar antes o incremental de segunda para restaurar os arquivos.","a":false,"why":"Errado. O diferencial reúne alterações desde o último backup completo. Em regra, restauram-se o completo e o diferencial escolhido, sem precisar dos incrementais intermediários."}]'::jsonb,updated_at=now() WHERE slug='informatica-04-02' AND content_status='active' AND jsonb_array_length(quiz)=2 AND body_md NOT LIKE '%## Exemplo completo de recuperação%';
UPDATE study_materials SET quiz=jsonb_set(quiz,'{0,why}',to_jsonb('Errado. Phishing pode consistir em página falsa ou mensagem que induz a vítima a entregar credenciais; não exige instalação de vírus, embora possa ser combinado com malware.'::text)),updated_at=now() WHERE slug='informatica-04-01' AND quiz->0->>'why'='Pode ocorrer por engenharia social.';
UPDATE study_materials SET quiz=jsonb_set(jsonb_set(quiz,'{0,why}',to_jsonb('Errado. Backup diferencial usa como referência o último backup completo, não o último incremental. Para restaurar, em regra, utiliza-se o completo e o diferencial escolhido.'::text)),'{1,why}',to_jsonb('Certo. O incremental normalmente registra alterações desde o backup anterior, reduzindo o volume de dados por execução; a restauração pode exigir toda a cadeia de incrementais.'::text)),updated_at=now() WHERE slug='informatica-04-02' AND quiz->0->>'why'='Sua referência é o último completo.';