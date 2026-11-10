import * as React from "react";
import { supabase } from "@/integrations/supabase/client";

type Progress = Record<string, boolean>;
type SyncState = "loading" | "synced" | "offline";
const read = (key:string):Progress => {
  try {
    const parsed:unknown=JSON.parse(localStorage.getItem(key)||"{}");
    return parsed && typeof parsed==="object" && !Array.isArray(parsed)
      ? Object.fromEntries(Object.entries(parsed).filter(([key,value])=>typeof key==="string" && typeof value==="boolean"))
      : {};
  }catch{return {};}
};
const persist=(key:string,items:Progress)=>{try{localStorage.setItem(key,JSON.stringify(items));}catch{}};
const splitKey=(key:string)=>{const i=key.indexOf(":");return i>=0 ? [key.slice(0,i),key.slice(i+1)] as const : null;};

/** Offline-aware per-user progress; RLS on study_guide_progress enforces ownership. */
export function useStudyGuideProgress(userId:string){
  const [completed,setCompleted]=React.useState<Progress>({});
  const [syncState,setSyncState]=React.useState<SyncState>("loading");
  const [syncError,setSyncError]=React.useState<string|null>(null);
  const stateRef=React.useRef<Progress>({});
  const pendingRef=React.useRef<Progress>({});
  const storageKey=`norte-study-guides:v1:${userId}`;
  const pendingKey=`norte-study-guides:pending:v1:${userId}`;
  const migratedKey=`norte-study-guides:migrated:${userId}`;
  const apply=React.useCallback((next:Progress)=>{
    stateRef.current=next;setCompleted(next);persist(storageKey,next);
  },[storageKey]);

  React.useEffect(()=>{
    let cancelled=false;
    const cached=read(storageKey);
    const pending=read(pendingKey);
    stateRef.current=cached;
    pendingRef.current=pending;
    setCompleted(cached);
    const onlineUser=!!userId && userId!=="anonymous" && userId!=="public" && userId!=="demo-user";
    if(!onlineUser){setSyncState("offline");setSyncError(null);return()=>{cancelled=true;};}
    setSyncState("loading");setSyncError(null);
    const hydrate=async()=>{
      const response=await supabase.from("study_guide_progress").select("guide_id,lesson_key").eq("user_id",userId);
      if(cancelled)return;
      if(response.error){setSyncState("offline");setSyncError("Não foi possível carregar o progresso remoto. As marcações continuam neste navegador.");return;}
      const remote:Progress=Object.fromEntries((response.data||[]).map(row=>[`${row.guide_id}:${row.lesson_key}`,true]));
      let alreadyMigrated=false;
      try{alreadyMigrated=localStorage.getItem(migratedKey)==="yes";}catch{}
      const replay={...pending};
      if(!alreadyMigrated){
        for(const [key,value] of Object.entries(cached))if(value && replay[key]===undefined && !remote[key] && splitKey(key))replay[key]=true;
      }
      pendingRef.current=replay;persist(pendingKey,replay);
      const merged={...remote};
      for(const [key,value] of Object.entries(replay)){if(value)merged[key]=true;else delete merged[key];}
      if(cancelled)return;
      apply(merged);
      for(const [key,value] of Object.entries(replay)){
        const parts=splitKey(key);
        if(!parts)continue;
        const [guide_id,lesson_key]=parts;
        const result=value
          ? await supabase.from("study_guide_progress").upsert({user_id:userId,guide_id,lesson_key},{onConflict:"user_id,guide_id,lesson_key"})
          : await supabase.from("study_guide_progress").delete().eq("user_id",userId).eq("guide_id",guide_id).eq("lesson_key",lesson_key);
        if(cancelled)return;
        if(result.error){setSyncState("offline");setSyncError("Uma ou mais marcações não sincronizaram. Serão reenviadas no próximo acesso.");return;}
        if(pendingRef.current[key]===value){
          const next={...pendingRef.current};delete next[key];pendingRef.current=next;persist(pendingKey,next);
        }
      }
      try{localStorage.setItem(migratedKey,"yes");}catch{}
      if(cancelled)return;
      setSyncState("synced");setSyncError(null);
    };
    void hydrate();
    return()=>{cancelled=true;};
  },[userId,storageKey,pendingKey,migratedKey,apply]);

  const toggleCompleted=React.useCallback(async(guideId:string,lessonKey:string)=>{
    if(syncState==="loading")return;
    const key=`${guideId}:${lessonKey}`;
    const want=!stateRef.current[key];
    const next={...stateRef.current};
    if(want)next[key]=true;else delete next[key];
    apply(next);
    pendingRef.current={...pendingRef.current,[key]:want};persist(pendingKey,pendingRef.current);
    if(!userId||["anonymous","public","demo-user"].includes(userId))return;
    setSyncState("loading");setSyncError(null);
    const result=want
      ? await supabase.from("study_guide_progress").upsert({user_id:userId,guide_id:guideId,lesson_key:lessonKey},{onConflict:"user_id,guide_id,lesson_key"})
      : await supabase.from("study_guide_progress").delete().eq("user_id",userId).eq("guide_id",guideId).eq("lesson_key",lessonKey);
    if(result.error){setSyncState("offline");setSyncError("A alteração está salva neste navegador; a nuvem será atualizada na próxima conexão.");return;}
    if(pendingRef.current[key]===want){const p={...pendingRef.current};delete p[key];pendingRef.current=p;persist(pendingKey,p);}
    setSyncState("synced");
  },[apply,pendingKey,syncState,userId]);

  return {completed,toggleCompleted,syncState,syncError};
}
