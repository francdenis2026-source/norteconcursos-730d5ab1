import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

export const Route = createFileRoute('/dashboard')({
  component: DashboardComponent,
  loader: async () => {
    // In a real app, check auth here
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
