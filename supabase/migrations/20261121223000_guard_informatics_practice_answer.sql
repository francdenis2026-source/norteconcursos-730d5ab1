-- Protect reviewed legacy Informatics exercises at the database boundary.
-- This preserves existing recording behavior for other subjects.
CREATE OR REPLACE FUNCTION public.record_material_practice_answer(
 p_attempt_id uuid,p_material_id uuid,p_item_index integer,p_selected_answer text,p_response_seconds integer
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO '' AS $function$
DECLARE
 v_user_id uuid;
 v_quiz jsonb;
 v_question jsonb;
 v_review jsonb;
 v_review_item jsonb;
 v_slug text;
 v_correct_answer text;
BEGIN
 v_user_id := (SELECT auth.uid());
 IF v_user_id IS NULL THEN RAISE EXCEPTION 'Usuário não autenticado'; END IF;
 IF p_attempt_id IS NULL OR p_material_id IS NULL OR p_item_index IS NULL OR p_item_index < 0
    OR p_selected_answer IS NULL OR p_selected_answer NOT IN ('C','E')
    OR p_response_seconds IS NULL OR p_response_seconds NOT BETWEEN 0 AND 900
 THEN RAISE EXCEPTION 'Parâmetros inválidos'; END IF;
 SELECT slug,quiz,practice_review INTO v_slug,v_quiz,v_review
 FROM public.study_materials WHERE id=p_material_id AND content_status='active';
 IF NOT FOUND THEN RAISE EXCEPTION 'Material indisponível'; END IF;
 IF jsonb_typeof(v_quiz) IS DISTINCT FROM 'array' OR p_item_index >= jsonb_array_length(v_quiz)
 THEN RAISE EXCEPTION 'Questão inválida'; END IF;
 v_question := v_quiz -> p_item_index;
 IF jsonb_typeof(v_question -> 'a') IS DISTINCT FROM 'boolean'
 THEN RAISE EXCEPTION 'Gabarito inválido'; END IF;
 IF v_slug ~ '^informatica-(01|03|04|05)-' THEN
   IF v_review IS NULL
      OR v_review->>'version' <> '1'
      OR v_review->>'review_type' <> 'didactic_manual'
      OR v_review->>'status' <> 'reviewed'
      OR v_review->>'material_slug' IS DISTINCT FROM v_slug
      OR v_review->>'subject' NOT IN ('Informática','Noções de Informática','Tecnologia da Informação e Segurança da Informação')
      OR jsonb_typeof(v_review->'items') IS DISTINCT FROM 'array'
      OR jsonb_array_length(v_review->'items') <> jsonb_array_length(v_quiz)
   THEN RAISE EXCEPTION 'Questão sem revisão editorial válida'; END IF;
   v_review_item := v_review->'items'->p_item_index;
   IF v_review_item->>'q' IS DISTINCT FROM v_question->>'q'
      OR v_review_item->'a' IS DISTINCT FROM v_question->'a'
      OR v_review_item->>'why' IS DISTINCT FROM v_question->>'why'
   THEN RAISE EXCEPTION 'Questão alterada após revisão editorial'; END IF;
 END IF;
 v_correct_answer := CASE WHEN (v_question->>'a')::boolean THEN 'C' ELSE 'E' END;
 INSERT INTO public.material_practice_responses(id,user_id,material_id,item_index,selected_answer,is_correct,response_seconds)
 VALUES(p_attempt_id,v_user_id,p_material_id,p_item_index,p_selected_answer,p_selected_answer=v_correct_answer,p_response_seconds)
 ON CONFLICT(id) DO NOTHING;
END;
$function$;
