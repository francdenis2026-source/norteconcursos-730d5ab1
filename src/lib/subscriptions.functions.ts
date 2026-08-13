import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const getSubscriptionStatus = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return { tier: 'free', isActive: false };

    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_tier')
      .eq('id', session.user.id)
      .single();

    return {
      tier: profile?.subscription_tier || 'free',
      isActive: profile?.subscription_tier !== 'free'
    };
  });
