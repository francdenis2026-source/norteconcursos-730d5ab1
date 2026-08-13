import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/public/stripe-webhook')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const signature = request.headers.get('stripe-signature');
        const body = await request.text();

        console.log("Stripe Webhook Received!");
        
        try {
          const event = JSON.parse(body);
          
          if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const userId = session.client_reference_id;
            const planId = session.metadata.planId;
            
            console.log(`Updating user ${userId} to plan ${planId}`);
            
            const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
            
            await supabaseAdmin
              .from('profiles')
              .update({ 
                subscription_tier: planId,
                stripe_subscription_id: session.subscription,
                stripe_customer_id: session.customer
              })
              .eq('id', userId);
          }
          
          if (event.type === 'customer.subscription.deleted') {
            const subscription = event.data.object;
            const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
            
            await supabaseAdmin
              .from('profiles')
              .update({ subscription_tier: 'free' })
              .eq('stripe_subscription_id', subscription.id);
          }

          return new Response(JSON.stringify({ received: true }), { status: 200 });
        } catch (err: any) {
          console.error(`Webhook Error: ${err.message}`);
          return new Response(`Webhook Error: ${err.message}`, { status: 400 });
        }
      }
    }
  }
});
