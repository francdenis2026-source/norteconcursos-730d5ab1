import { useState, type ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

/** Native tab keyboard navigation; each context has an independent, compact workspace. */
export function MaterialStudyTabs({
  text,
  explanation,
  practice,
  textLabel = "Texto-base",
}: {
  text: ReactNode;
  explanation: ReactNode;
  practice: ReactNode;
  textLabel?: string;
}) {
  const [tab, setTab] = useState("text");
  const [visited, setVisited] = useState(() => new Set(["text"]));
  return (
    <Tabs
      value={tab}
      onValueChange={(value) => {
        setTab(value);
        setVisited((previous) => new Set([...previous, value]));
      }}
      className="min-w-0 space-y-4"
    >
      <TabsList
        className="grid w-full grid-cols-3 gap-1 border bg-card p-1"
        aria-label="Etapas de estudo"
      >
        <TabsTrigger
          value="text"
          className="text-xs sm:text-sm data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-800 dark:data-[state=active]:text-emerald-300"
        >
          {textLabel}
        </TabsTrigger>
        <TabsTrigger
          value="explanation"
          className="text-xs sm:text-sm data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-800 dark:data-[state=active]:text-sky-300"
        >
          Explicação didática
        </TabsTrigger>
        <TabsTrigger
          value="practice"
          className="text-xs sm:text-sm data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-900 dark:data-[state=active]:text-amber-200"
        >
          Praticar · até 20
        </TabsTrigger>
      </TabsList>
      {visited.has("text") && (
        <TabsContent forceMount value="text" className="space-y-4 data-[state=inactive]:hidden">
          {text}
        </TabsContent>
      )}
      {visited.has("explanation") && (
        <TabsContent
          forceMount
          value="explanation"
          className="space-y-4 data-[state=inactive]:hidden"
        >
          {explanation}
        </TabsContent>
      )}
      {visited.has("practice") && (
        <TabsContent forceMount value="practice" className="space-y-4 data-[state=inactive]:hidden">
          {practice}
        </TabsContent>
      )}
    </Tabs>
  );
}
