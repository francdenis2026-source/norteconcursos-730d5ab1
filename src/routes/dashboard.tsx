import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/dashboard')({
  component: DashboardComponent,
  loader: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      // Forzar redirección si no hay sesión, pero permitimos demo por agora
      // throw redirect({ to: '/auth' });
    }
    return {};
  }
});


function DashboardComponent() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
