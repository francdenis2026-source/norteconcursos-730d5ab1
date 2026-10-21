import { createFileRoute } from "@tanstack/react-router";
import { HomepageLab } from "@/components/homepage-lab/HomepageLab";

export const Route = createFileRoute("/prototypes/homepage")({
  validateSearch: (search: Record<string, unknown>) => ({
    v: Math.max(1, Math.min(3, Math.trunc(Number(search["v"])) || 1)),
    data: typeof search["data"] === "string" ? search["data"] : "demo",
  }),
  head: () => ({
    meta: [
      { title: "Comparar aberturas | Norte Concursos" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PrototypePage,
});
function PrototypePage() {
  const { v, data } = Route.useSearch();
  return <HomepageLab initialVariant={v} initialData={data} />;
}
