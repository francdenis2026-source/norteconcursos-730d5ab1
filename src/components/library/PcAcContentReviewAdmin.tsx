import * as React from "react";
import { CheckCircle2, ExternalLink, RefreshCw, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { isPcAcOfficialStudySource } from "@/lib/pcAcStudySources";

type ReviewRow = {
 id:string;slug:string;title:string;discipline:string;body_md:string;source_note:string;
 legal_basis:Array<{title?:string;url?:string}>|null;content_status:string;reviewed_at:string|null;
};
const PREFIX="pcac-2026-guia-";
/** Editorial publication requires a real admin to read the full lesson and confirm its legal sources. */
export function PcAcContentReviewAdmin() {
 const {user,isAdmin}=useAuthStatus();
 const [rows,setRows]=React.useState<ReviewRow[]>([]);
 const [loading,setLoading]=React.useState(true);
 const [busy,setBusy]=React.useState<string|null>(null);
 const [checked,setChecked]=React.useState<Record<string,boolean>>({});
 const [error,setError]=React.useState<string|null>(null);
 const load=React.useCallback(async()=>{
  setLoading(true);setError(null);
  const result=await supabase.from("study_materials")
   .select("id,slug,title,discipline,body_md,source_note,legal_basis,content_status,reviewed_at")
   .like("slug",PREFIX+"%").order("discipline").order("sort_order");
  if(result.error)setError(result.error.message);
  else setRows((result.data??[]) as ReviewRow[]);
  setLoading(false);
 },[]);
 React.useEffect(()=>{if(isAdmin)void load();},[isAdmin,load]);
 const approve=async(row:ReviewRow)=>{
  if(!isAdmin||!user?.id||!checked[row.id]||busy)return;
  const sources=Array.isArray(row.legal_basis)?row.legal_basis:[];
  if(!sources.length||sources.some(source=>!source.url||!isPcAcOfficialStudySource(source.url))){
   toast.error("Material sem referência oficial verificável. Corrija antes de publicar.");return;
  }
  if(!row.body_md.trim()||!row.source_note.trim()){
   toast.error("Texto ou nota de proveniência incompletos.");return;
  }
  setBusy(row.id);
  const now=new Date().toISOString();
  const {error:failure}=await supabase.from("study_materials").update({
    content_status:"active",reviewed_by:user.id,reviewed_at:now,law_version_checked_at:now
  }).eq("id",row.id).eq("content_status","under_review");
  setBusy(null);
  if(failure){toast.error(failure.message);return;}
  toast.success("Aula homologada com identificação do revisor.");
  setChecked(previous=>({...previous,[row.id]:false}));
  void load();
 };
 if(!isAdmin)return null;
 const pending=rows.filter(row=>row.content_status==="under_review");
 return <section className="space-y-3 rounded-xl border border-amber-600/35 bg-card p-4" aria-labelledby="pcac-batch-review-heading">
   <div className="flex flex-wrap items-center justify-between gap-2">
    <div><h3 id="pcac-batch-review-heading" className="text-base font-extrabold">Revisão editorial · PC-AC 2026</h3>
    <p className="text-xs text-muted-foreground">{pending.length} aulas aguardando homologação · {rows.length-pending.length} já com outro status</p></div>
    <button type="button" onClick={()=>void load()} disabled={loading} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold hover:bg-muted"><RefreshCw className="h-4 w-4"/>Atualizar</button>
   </div>
   <p className="flex gap-2 rounded-lg bg-amber-500/10 p-3 text-xs leading-5"><ShieldAlert className="h-4 w-4 shrink-0 text-amber-600"/>Revise o texto completo e abra as fontes antes de assinar a aprovação. A data gravada será a da revisão humana; não é uma certificação automática de legislação.</p>
   {error&&<p role="alert" className="text-sm text-destructive">{error}</p>}
   {loading?<p className="text-sm text-muted-foreground">Carregando materiais…</p>:pending.length===0?<p className="text-sm text-emerald-600">Não há aulas pendentes neste lote.</p>:(
    <div className="grid max-h-[700px] gap-2 overflow-y-auto pr-1">
     {pending.map(row=><details key={row.id} className="rounded-lg border border-border bg-background open:border-amber-500/50">
      <summary className="cursor-pointer px-3 py-3 text-sm font-semibold">{row.discipline} · {row.title}</summary>
      <div className="space-y-3 border-t border-border p-3">
       <div className="max-h-[300px] overflow-y-auto whitespace-pre-wrap rounded-lg bg-muted/30 p-3 text-xs leading-relaxed">{row.body_md}</div>
       <p className="text-xs text-muted-foreground">Origem: {row.source_note}</p>
       <div className="flex flex-wrap gap-2">{(row.legal_basis??[]).map((source,i)=><a key={i} href={source.url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 text-xs font-semibold text-primary underline">{source.title||"Fonte institucional"} <ExternalLink className="h-3 w-3"/></a>)}</div>
       <label className="flex items-start gap-2 text-xs leading-5"><input type="checkbox" checked={!!checked[row.id]} onChange={event=>setChecked(prev=>({...prev,[row.id]:event.target.checked}))} className="mt-1 h-4 w-4 accent-emerald-600"/>Li integralmente a aula, conferi a fonte oficial, a atualização normativa e a compatibilidade com o edital do cargo.</label>
       <button type="button" disabled={!checked[row.id]||!!busy} onClick={()=>void approve(row)} className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"><CheckCircle2 className="h-4 w-4"/>Homologar e publicar esta aula</button>
      </div>
     </details>)}
    </div>
   )}
 </section>;
}
