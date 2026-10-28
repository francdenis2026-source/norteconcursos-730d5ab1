import { useEffect } from "react";
import { Award, X } from "lucide-react";
import { toast } from "sonner";
import { createPublicPresenceClient } from "@/integrations/supabase/client";

/** Receives anonymized achievement signals for the public homepage. */
export function PublicAchievementSignal() {
  useEffect(() => {
    const client = createPublicPresenceClient();
    const channel = client
      .channel("norte-achievements-public-v1")
      .on("broadcast", { event: "achievement" }, ({ payload }) => {
        const name = typeof payload?.name === "string" ? payload.name : "Nova conquista";
        toast.custom(
          (id) => (
            <div className="achievement-notice achievement-notice--public" role="status">
              <Award aria-hidden="true" />
              <div>
                <span>Conquista da comunidade</span>
                <strong>{name}</strong>
                <p>Um aluno atingiu uma nova meta de estudo.</p>
              </div>
              <button type="button" aria-label="Fechar aviso" onClick={() => toast.dismiss(id)}>
                <X aria-hidden="true" />
              </button>
            </div>
          ),
          { id: `public-achievement-${String(payload?.id ?? name)}`, duration: 5000, position: "bottom-right" },
        );
      })
      .subscribe();
    return () => {
      void client.removeChannel(channel);
    };
  }, []);
  return null;
}
