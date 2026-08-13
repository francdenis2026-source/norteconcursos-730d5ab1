-- Adicionar coluna de onboarding no profile
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS onboarding_steps jsonb DEFAULT '{"contest": false, "notebook": false, "plan": false}'::jsonb,
ADD COLUMN IF NOT EXISTS onboarding_done boolean DEFAULT false;

-- Garantir que a tabela profiles tenha RLS para o próprio usuário editar
CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = id);

-- Criar função para validar tier no backend (exemplo para ser usada em outras funções ou RLS)
CREATE OR REPLACE FUNCTION public.check_user_tier_limit(user_id uuid, feature_key text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    user_tier app_role; -- No nosso caso estamos usando role como tier por enquanto ou uma coluna específica
    current_count integer;
    tier_limit integer;
BEGIN
    -- Busca a role/tier do usuário
    SELECT role INTO user_tier FROM public.user_roles WHERE user_id = user_id LIMIT 1;
    
    -- Exemplo: limite de questões por dia
    IF feature_key = 'questions_daily' THEN
        SELECT count(*) INTO current_count 
        FROM public.user_responses 
        WHERE user_id = user_id AND created_at >= CURRENT_DATE;
        
        IF user_tier = 'user' THEN -- 'user' mapeia para 'free' no nosso config front
            tier_limit := 10;
        ELSIF user_tier = 'moderator' THEN -- 'moderator' mapeia para 'essential'
            tier_limit := 100;
        ELSE
            RETURN true; -- Admin ou plus/premium sem limite
        END IF;
        
        RETURN current_count < tier_limit;
    END IF;

    RETURN true;
END;
$$;
