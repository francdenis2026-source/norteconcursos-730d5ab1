-- PF Agente 2025, edital retificado em 12/06/2025: item 14 é Lei 9.454, não 9.455.
-- Evidência: https://cdn.cebraspe.org.br/concursos/PF_25/arquivos/208B2F9CD7C49B6E7FF2FB6F027B9D7D7904F50E049EF749BD4C2DEA8ED30B3D.pdf
-- Preserva ID, vínculos, questões e progresso; aborta se houver alteração concorrente.
DO $$
DECLARE old_text text := 'Decreto nº 11.797/2023; Lei nº 9.455/1997; Decreto nº 11.491/2023 – Convenção sobre Crime Cibernético.';
new_text text := 'Decreto nº 11.797/2023; Lei nº 9.454/1997 (Registro de Identidade Civil; número corrigido pelo Edital nº 2, de 12/06/2025); Decreto nº 11.491/2023 – Convenção sobre Crime Cibernético.';
actual text;
BEGIN
 SELECT topic_text INTO actual FROM public.syllabus_topics
 WHERE id = '82857c23-6112-48ab-a1b2-733c5595cab8'
 AND edition_id = 'a982e86c-f18a-47f5-9cf8-f1f8bd2a22ff'
 AND content_status = 'current' FOR UPDATE;
 IF actual IS DISTINCT FROM old_text AND actual IS DISTINCT FROM new_text THEN
  RAISE EXCEPTION 'Matriz divergiu: revisão manual necessária antes da correção';
 END IF;
 IF actual = old_text THEN
  UPDATE public.syllabus_topics SET topic_text = new_text
  WHERE id = '82857c23-6112-48ab-a1b2-733c5595cab8';
 END IF;
END $$;
