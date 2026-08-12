import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: () => <div className="p-8">Política de Privacidade - Em breve</div>,
});
