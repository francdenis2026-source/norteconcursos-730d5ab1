-- Tópicos cotejados com Edital 1 PF/2025 atualizado até a retificação 4,
-- https://cdn.cebraspe.org.br/concursos/PF_25/arquivos/Ed_1_PF_25_Abertura_Atualizado_ate_ret_4.pdf
-- Cargo 16, Bloco I, Língua Portuguesa, itens 1 a 7. Não altera gabaritos.
update public.syllabus_topics set topic_text=v.description
from (values
('2ab9d0f8-22f6-467b-bb30-cd0c5cff4b7f'::uuid,'Compreensão e interpretação de textos de gêneros variados; reconhecimento de tipos e gêneros textuais; domínio da ortografia oficial e dos mecanismos de coesão textual; referenciação, substituição, repetição, conectores e sequenciação; tempos e modos verbais.'),
('5873244d-48e6-4241-a474-b5db3317d27f'::uuid,'Estrutura morfossintática do período: classes de palavras; coordenação e subordinação entre orações e termos; pontuação; concordância verbal e nominal; regência verbal e nominal; crase; colocação dos pronomes átonos.'),
('13a80069-1852-447d-a71b-1c8f2489c487'::uuid,'Reescrita de frases e parágrafos: significação das palavras; substituição de palavras ou trechos; reorganização de orações e períodos; reescrita em diferentes gêneros e níveis de formalidade. Correspondência oficial conforme o Manual de Redação da Presidência: aspectos gerais, finalidades, linguagem e formato.')) v(id,description)
where syllabus_topics.id=v.id and syllabus_topics.content_status='current';
update public.content_sources set checked_at=now() where id='e48e61a0-ecf6-4140-b431-e9dba7b40b67'::uuid;
