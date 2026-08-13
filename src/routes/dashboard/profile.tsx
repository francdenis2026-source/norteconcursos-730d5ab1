import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/profile')({
  component: () => <Placeholder title="Meu Perfil" />
});

function Placeholder({ title }: { title: string }) {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold text-primary">{title}</h1>
      <p className="text-muted-foreground">Esta funcionalidade está sendo preparada para o ambiente demonstrativo.</p>
    </div>
  );
}
