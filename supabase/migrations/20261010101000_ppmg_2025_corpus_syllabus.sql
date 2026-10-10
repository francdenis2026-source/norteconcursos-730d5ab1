insert into public.content_sources(source_type,title,issuer,url,status,is_official,notes)
values('edital','PP-MG — Edital SEJUSP 01/2025 — Anexo II','SEJUSP/MG','https://www.seguranca.mg.gov.br/images/0_planilhas-e-pdfs/Editais/Concurso%20Publico%20PP%2001%202025.pdf','vigente',true,'Matriz de pertinência do conteúdo. O item 1.6 fixa a legislação na publicação do edital; o treino reutilizável deve sinalizar a revisão da legislação atual, sem representar o gabarito deste concurso.') on conflict(url) do nothing;
insert into public.syllabus_editions(contest_name,role_name,contest_year,exam_board,source_id,status)
select 'Polícia Penal de Minas Gerais','Policial Penal',2025,'AOCP',id,'active' from public.content_sources where url='https://www.seguranca.mg.gov.br/images/0_planilhas-e-pdfs/Editais/Concurso%20Publico%20PP%2001%202025.pdf'
on conflict(contest_name,role_name,contest_year) do nothing;
insert into public.syllabus_topics(edition_id,block_name,discipline,topic_order,topic_text,content_status)
select e.id,'Anexo II — Edital SEJUSP 01/2025',v.discipline,v.topic_order,v.topic_text,'current'
from public.syllabus_editions e cross join (values
('Língua Portuguesa',1,'Interpretação de textos; ortografia; classes de palavras; sintaxe; pontuação; concordância; regência; crase; colocação pronominal; formação de palavras.'),
('Raciocínio Lógico',1,'Noções de lógica, conjuntos, conectivos, proposições, análise combinatória, probabilidade, frações, porcentagens, sequências e operações com números racionais.'),
('Informática Básica',1,'Hardware e software; armazenamento; Windows 7 e 10; Linux; Microsoft Office 2010, 2013 e 2016; LibreOffice 5 e 6; internet e segurança.'),
('Direito Constitucional',1,'Direitos e garantias fundamentais (art. 5º); Administração Pública (art. 37); estado de defesa e estado de sítio (arts. 136 a 141); segurança pública (art. 144).'),
('Direito Penal',1,'Do crime (arts. 13 a 25), imputabilidade (arts. 26 a 28), penas (arts. 32 a 52), crimes contra a pessoa (arts. 121 a 150), patrimônio (arts. 155 a 180), dignidade sexual (arts. 213 a 218-C) e Administração Pública (arts. 312 a 327).'),
('Direitos Humanos',1,'Teoria geral; sistemas internacionais; tratados; grupos vulneráveis; mecanismos constitucionais de proteção; direitos civis, políticos, sociais, econômicos, culturais e ambientais.'),
('Legislação Especial',1,'Lei Federal 11.343/2006 — Lei de Drogas.'),
('Legislação Especial',2,'Lei Federal 8.072/1990 — Crimes Hediondos.'),
('Legislação Especial',3,'Lei Federal 10.826/2003 — Estatuto do Desarmamento.')
) v(discipline,topic_order,topic_text)
where e.contest_name='Polícia Penal de Minas Gerais' and e.role_name='Policial Penal' and e.contest_year=2025
on conflict(edition_id,discipline,topic_order) do nothing;
