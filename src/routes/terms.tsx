import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: () => <div className="p-8">Termos de Uso - Em breve</div>,
});
