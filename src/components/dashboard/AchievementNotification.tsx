import { toast } from "sonner";
import { Award, ArrowUpRight, X } from "lucide-react";
import type { Achievement } from "@/types";

export function showAchievementNotification(achievement: Achievement) {
  toast.custom(
    (id) => (
      <div className="achievement-notice" role="status">
        <Award aria-hidden="true" />
        <div>
          <span>Medalha conquistada</span>
          <strong>{achievement.name}</strong>
          <p>Conquista registrada na sua coleção.</p>
          <a href="/dashboard/medals" onClick={() => toast.dismiss(id)}>
            Ver medalhas <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <button
          type="button"
          aria-label="Fechar aviso de medalha"
          onClick={() => toast.dismiss(id)}
        >
          <X aria-hidden="true" />
        </button>
      </div>
    ),
    { id: `achievement-${achievement.id}`, duration: 6000, position: "bottom-right" },
  );
}
