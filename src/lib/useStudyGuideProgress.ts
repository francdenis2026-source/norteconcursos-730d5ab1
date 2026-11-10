import * as React from "react";
import { supabase } from "@/integrations/supabase/client";

/** Syncs checklist progress to Supabase with RLS; local storage is only an offline cache. */
export function useStudyGuideProgress(userId: string) {
  const storageKey = `norte-study-guides:v1:${userId}`;
  const migratedKey = `norte-study-guides:migrated:${userId}`;
  const [completed, setCompleted] = React.useState<Record<string, boolean>>({});
  const [syncState, setSyncState] = React.useState<"loading" | "synced" | "offline">("loading");
  const [syncError, setSyncError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    const local = (): Record<string, boolean> => {
      try {
        const parsed: unknown = JSON.parse(localStorage.getItem(storageKey) || "{}");
        return parsed && typeof parsed === "object" && !Array.isArray(parsed)
          ? Object.fromEntries(Object.entries(parsed).filter(([key, value]) => typeof key === "string" && value === true))
          : {};
      } catch { return {}; }
    };
    const cached = local();
    setCompleted(cached);
    if (!userId || userId === "anonymous" || userId === "public") {
      setSyncState("offline");
      return () => { cancelled = true; };
    }
    setSyncState("loading");
    setSyncError(null);
    const hydrate = async () => {
      const { data, error } = await supabase.from("study_guide_progress")
        .select("guide_id,lesson_key").eq("user_id",userId);
      if (cancelled) return;
      if (error) { setSyncState("offline"); setSyncError("Sem conexão com o progresso na nuvem. As alterações serão mantidas apenas neste navegador."); return; }
      let remote = Object.fromEntries((data || []).map(row => [`${row.guide_id}:${row.lesson_key}`,true])) as Record<string,boolean>;
      let alreadyMigrated = false;
      try { alreadyMigrated = localStorage.getItem(migratedKey) === "yes"; } catch {}
      if (!alreadyMigrated) {
        const onlyLocal = Object.keys(cached).filter(key => cached[key] && !remote[key] && key.includes(":"));
        if (onlyLocal.length) {
          const rows = onlyLocal.map(key => {
            const split = key.indexOf(":");
            return {user_id:userId,guide_id:key.slice(0,split),lesson_key:key.slice(split+1)};
          });
          const imported = await supabase.from("study_guide_progress").upsert(rows,{onConflict:"user_id,guide_id,lesson_key"});
          if (cancelled) return;
          if (imported.error) {setSyncState("offline");setSyncError("Falha ao importar marcações anteriores para a nuvem.");return;}
          remote = {...remote,...Object.fromEntries(onlyLocal.map(key=>[key,true]))};
        }
        try {localStorage.setItem(migratedKey,"yes");}catch{}
      }
      if (cancelled) return;
      setCompleted(remote);
      try {localStorage.setItem(storageKey,JSON.stringify(remote));}catch{}
      setSyncState("synced");
    };
    void hydrate();
    return () => {cancelled = true;};
  },[userId,storageKey,migratedKey]);

  const toggleCompleted = React.useCallback(async (guideId:string, lessonKey:string) => {
    const key = `${guideId}:${lessonKey}`;
    const wasCompleted = !!completed[key];
    const next = {...completed};
    if (wasCompleted) delete next[key]; else next[key] = true;
    setCompleted(next);
    try {localStorage.setItem(storageKey,JSON.stringify(next));}catch{}
    if (!userId || userId === "anonymous" || userId === "public") return;
    setSyncState("loading");
    const result = wasCompleted
      ? await supabase.from("study_guide_progress").delete().eq("user_id",userId).eq("guide_id",guideId).eq("lesson_key",lessonKey)
      : await supabase.from("study_guide_progress").upsert({user_id:userId,guide_id:guideId,lesson_key:lessonKey},{onConflict:"user_id,guide_id,lesson_key"});
    if (result.error) {
      setSyncState("offline");
      setSyncError("Não foi possível sincronizar esta alteração. Ela foi salva apenas neste navegador.");
    } else {
      setSyncState("synced");
      setSyncError(null);
    }
  },[completed,userId,storageKey]);

  return { completed,toggleCompleted,syncState,syncError };
}
